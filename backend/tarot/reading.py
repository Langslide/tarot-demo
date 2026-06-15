"""Core reading logic, shared by the LangGraph node and the public endpoint.

Hybrid grounding: each drawn card gets exact, deterministic context (canonical
Waite meaning + positional framing + domain nuance + correspondences) from the
dataset, plus semantically retrieved interpretive guidance for the specific
question. GPT-4o then produces a structured reading (reliable parsing).
"""

from __future__ import annotations

import logging
import os

from langchain_openai import ChatOpenAI

from .analysis import analyze_spread
from .knowledge import POSITION_FRAME_LABEL, build_card_grounding
from .prompts import (
    FOLLOWUP_SYSTEM_PROMPT,
    SYSTEM_PROMPT,
    build_followup_prompt,
    build_user_prompt,
)
from .retriever import get_tarot_retriever
from .sources import get_provider
from .schemas import (
    CATEGORY_LABELS,
    CardInterpretation,
    Clarification,
    DrawnCard,
    FollowupResponse,
    ReadingLLMSchema,
    ReadingResult,
)

logger = logging.getLogger(__name__)

# Keyword fallback for domain deduction (used if the classifier call fails).
_CATEGORY_KEYWORDS: list[tuple[str, list[str]]] = [
    ("marriage", ["marry", "marriage", "married", "husband", "wife", "spouse", "wedding", "engaged", "engagement", "divorce"]),
    ("relationship", ["relationship", "partner", "boyfriend", "girlfriend", "love", "dating", "breakup", "break up", "crush", "ex ", "romance"]),
    ("career", ["job", "career", "promotion", "boss", "work", "interview", "resign", "fired", "role", "manager", "office", "salary", "raise"]),
    ("business", ["business", "startup", "start-up", "invest", "investment", "money", "finance", "financial", "client", "sales", "venture", "loan", "profit"]),
    ("family", ["mother", "father", "mom", "dad", "sister", "brother", "family", "parents", "son", "daughter", "relative", "sibling"]),
    ("growth", ["myself", "purpose", "spiritual", "growth", "anxiety", "healing", "self-worth", "meaning", "depress", "confidence", "identity"]),
]


def _strip_em_dashes(text: str) -> str:
    """Guarantee no em/en dashes reach the user, regardless of model output."""
    if not text:
        return text
    text = text.replace(" — ", ", ").replace(" – ", ", ")
    text = text.replace("—", ", ").replace("–", "-")
    text = text.replace(" ,", ",").replace("  ", " ")
    return text.strip()


def _heuristic_category(question: str) -> str:
    q = (question or "").lower()
    for key, keywords in _CATEGORY_KEYWORDS:
        if any(kw in q for kw in keywords):
            return key
    return "general"


def deduce_category(question: str) -> str:
    """Infer the seeker's domain from their question (LLM, heuristic fallback)."""
    try:
        clf = ChatOpenAI(
            model=os.getenv("TAROT_CLASSIFIER_MODEL", "gpt-4o-mini"),
            temperature=0,
            api_key=os.getenv("OPENAI_API_KEY"),
            timeout=float(os.getenv("TAROT_LLM_TIMEOUT", "45")),
        )
        instruction = (
            "Classify the seeker's tarot question into exactly one domain key from this list: "
            "relationship, marriage, career, business, family, growth, general. "
            "Reply with only the single key, nothing else.\n\nQuestion: " + (question or "")
        )
        resp = clf.invoke(instruction)
        key = str(resp.content).strip().lower().split()[0].strip('.,"\'')
        if key in CATEGORY_LABELS:
            return key
    except Exception as exc:  # noqa: BLE001
        logger.warning("Category deduction (LLM) failed, using heuristic: %s", exc)
    return _heuristic_category(question)


def _get_model() -> ChatOpenAI:
    """GPT-4o tuned for natural, human-voiced prose (a touch more variation)."""
    return ChatOpenAI(
        model=os.getenv("TAROT_MODEL", "gpt-4o"),
        temperature=float(os.getenv("TAROT_TEMPERATURE", "0.8")),
        api_key=os.getenv("OPENAI_API_KEY"),
        timeout=float(os.getenv("TAROT_LLM_TIMEOUT", "90")),
        max_tokens=int(os.getenv("TAROT_MAX_TOKENS", "3000")),
    )


def _format_clarifications(details: list[Clarification] | None) -> str:
    """Render the seeker's follow-up answers for the prompt (skip empty answers)."""
    if not details:
        return ""
    lines = []
    for d in details:
        q = (d.question or "").strip()
        a = (d.answer or "").strip()
        if a:
            lines.append(f"- You asked: {q}\n  They answered: {a}" if q else f"- {a}")
    return "\n".join(lines)


def generate_followups(*, question: str, category: str, seeker_name: str) -> FollowupResponse:
    """Generate 1-2 tailored clarifying questions before the reading."""
    if not (question or "").strip():
        return FollowupResponse(status="success", questions=[])
    category_key = category if category in CATEGORY_LABELS else deduce_category(question)
    category_label = CATEGORY_LABELS[category_key]
    first_name = (seeker_name or "Seeker").split(" ")[0]
    try:
        model = ChatOpenAI(
            model=os.getenv("TAROT_CLASSIFIER_MODEL", "gpt-4o-mini"),
            temperature=0.4,
            api_key=os.getenv("OPENAI_API_KEY"),
            timeout=float(os.getenv("TAROT_LLM_TIMEOUT", "60")),
        )
        resp = model.invoke([
            {"role": "system", "content": FOLLOWUP_SYSTEM_PROMPT},
            {"role": "user", "content": build_followup_prompt(
                seeker_name=first_name, question=question, category_label=category_label)},
        ])
        raw = str(resp.content)
        # Parse lines, stripping bullets/numbering; keep up to 2 real questions.
        questions = []
        for line in raw.splitlines():
            t = line.strip().lstrip("-*0123456789.) ").strip()
            t = _strip_em_dashes(t)
            if len(t) > 4:
                questions.append(t)
        return FollowupResponse(status="success", questions=questions[:2])
    except Exception as exc:  # noqa: BLE001 — non-fatal; reading proceeds without follow-ups
        logger.warning("Follow-up generation failed: %s", exc)
        return FollowupResponse(status="success", questions=[])


def _normalised_card(card: DrawnCard) -> dict:
    return {
        "position": POSITION_FRAME_LABEL.get(card.position, card.position),
        "name": card.name,
        "orientation": card.orientation,
    }


def _card_meta(card: DrawnCard) -> tuple[list[str], str]:
    """Deterministic display meta for a drawn card: keywords + a correspondence line."""
    rec = get_provider().get(card.name)
    if not rec:
        return [], ""
    is_rev = card.orientation == "reversed"
    keywords = (rec.get("keywords_reversed") if is_rev else rec.get("keywords_upright")) or []
    corr = rec.get("correspondences", {})
    parts = [corr.get("element"), corr.get("astrology"), corr.get("timing")]
    correspondence = " · ".join(p for p in parts if p)
    return keywords[:6], correspondence


def _overall_timing(cards: list[DrawnCard]) -> str:
    """Timing read from the Present card (falls back to the first card)."""
    present = next((c for c in cards if c.position == "present"), cards[0] if cards else None)
    if not present:
        return ""
    rec = get_provider().get(present.name)
    if not rec:
        return ""
    timing = rec.get("correspondences", {}).get("timing", "")
    return f"{present.name}: {timing}" if timing else ""


def _build_grounding(cards: list[DrawnCard], category_key: str) -> str:
    """Deterministic, exact grounding block for the drawn cards."""
    return "\n".join(
        build_card_grounding(c.name, c.orientation, c.position, category_key) for c in cards
    )


def _retrieve_guidance(cards: list[DrawnCard], question: str, category_key: str, k: int = 5) -> str:
    """Semantic RAG: pull question-relevant interpretive passages from the corpus."""
    card_phrase = ", ".join(f"{c.name} {c.orientation}" for c in cards)
    query = f"{category_key} reading. Question: {question}. Cards: {card_phrase}."
    docs = get_tarot_retriever().retrieve(query, k=k)
    seen, lines = set(), []
    for d in docs:
        text = d.page_content.strip()
        if text and text not in seen:
            seen.add(text)
            lines.append(f"- {text}")
    return "\n".join(lines)


def generate_reading(
    *,
    question: str,
    category: str,
    seeker_name: str,
    cards: list[DrawnCard],
    details: list[Clarification] | None = None,
) -> ReadingResult:
    """Produce an AI tarot reading grounded in the dataset + semantic guidance."""
    if not cards:
        return ReadingResult(status="error", message="No cards were provided for the reading.")

    # Deduce the domain from the question when the caller doesn't supply a valid one.
    category_key = category if category in CATEGORY_LABELS else deduce_category(question)
    category_label = CATEGORY_LABELS[category_key]
    first_name = (seeker_name or "Seeker").split(" ")[0]

    grounding = _build_grounding(cards, category_key)
    # Fold the seeker's own answers into the retrieval query for sharper guidance.
    clarifications = _format_clarifications(details)
    retrieved = _retrieve_guidance(cards, f"{question} {clarifications}", category_key)
    spread = analyze_spread(cards)   # deterministic elemental/numerology pattern
    normalised = [_normalised_card(c) for c in cards]

    user_prompt = build_user_prompt(
        seeker_name=first_name,
        question=question,
        category_label=category_label,
        cards_context=grounding,
        retrieved_guidance=retrieved,
        clarifications=clarifications,
        pattern_text=spread["pattern_text"],
    )

    try:
        model = _get_model().with_structured_output(ReadingLLMSchema)
        parsed = model.invoke(
            [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ]
        )
        # with_structured_output returns a ReadingLLMSchema instance (or dict).
        data = parsed if isinstance(parsed, ReadingLLMSchema) else ReadingLLMSchema(**parsed)

        interpretations = []
        for i, c in enumerate(data.cards):
            # Deterministic display meta comes from our dataset, not the model.
            src = cards[i] if i < len(cards) else None
            keywords, correspondence = _card_meta(src) if src else ([], "")
            interpretations.append(CardInterpretation(
                position=str(c.position or normalised[i]["position"]),
                name=str(c.name or normalised[i]["name"]),
                orientation=str(c.orientation or normalised[i]["orientation"]),
                interpretation=_strip_em_dashes(str(c.interpretation).strip()),
                keywords=keywords,
                correspondence=correspondence,
            ))
        synthesis = _strip_em_dashes(str(data.synthesis).strip())

        if not interpretations or not synthesis:
            raise ValueError("LLM response missing cards or synthesis")

        g = lambda f: _strip_em_dashes(str(getattr(data, f, "") or "").strip())  # noqa: E731
        return ReadingResult(
            status="success",
            category=category_key,
            category_label=category_label,
            opening=g("opening"),
            cards=interpretations,
            card_connections=g("card_connections"),
            pattern=_strip_em_dashes(spread["pattern_text"]),
            synthesis=synthesis,
            direct_answer=g("direct_answer"),
            strengths=g("strengths"),
            challenges=g("challenges"),
            embrace_release=g("embrace_release"),
            advice=g("advice"),
            reflection_question=g("reflection_question"),
            affirmation=g("affirmation"),
            timing=_overall_timing(cards),
        )

    except Exception as exc:  # noqa: BLE001 — degrade gracefully, frontend falls back locally
        logger.warning("Tarot reading generation failed: %s", exc)
        return ReadingResult(
            status="error",
            message="The oracle could not reach the cards just now.",
        )
