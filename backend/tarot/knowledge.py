"""Grounding + corpus derived from the Major Arcana dataset.

Two responsibilities:
  * ``build_card_grounding`` — deterministic, exact context for a drawn card
    (canonical Waite meaning for its orientation + positional framing + domain
    nuance + correspondences). This is the "determined outcomes" lever.
  * ``build_corpus`` / ``CORPUS`` — the documents embedded by the semantic
    retriever: per card-orientation meanings, per-domain guidance, and authored
    interpretive-guidance passages (card combinations, positional & reversed
    theory). The retriever pulls question-relevant passages from here.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from .cards import MAJOR_ARCANA
from .sources import get_provider

POSITION_FRAME_LABEL = {
    "past": "Past / Foundation (root of the matter)",
    "present": "Present / Heart (current energy)",
    "future": "Future / Horizon (probable outcome)",
}


@dataclass
class KBDocument:
    """A retrievable passage with metadata (lightweight Document)."""
    page_content: str
    metadata: dict = field(default_factory=dict)


def build_card_grounding(name: str, orientation: str, position: str, domain: str) -> str:
    """Exact, deterministic grounding block for one drawn card."""
    card = get_provider().get(name)
    pos_label = POSITION_FRAME_LABEL.get(position, position)
    if not card:
        return f"- {pos_label}: {name} ({orientation}) [no canonical entry on file]"

    is_rev = orientation == "reversed"
    waite = card["waite_reversed"] if is_rev else card["waite_upright"]
    keywords = card["keywords_reversed"] if is_rev else card["keywords_upright"]
    essence = card["reversed_essence"] if is_rev else card["upright_essence"]
    pos_frame = card.get("positions", {}).get(position, "")
    domain_note = card.get("domain_notes", {}).get(domain, "")
    # Light facets read with the upright current; shadow facets with the reversed.
    facets = card.get("shadow_meanings" if is_rev else "light_meanings", [])[:3]
    fortune = card.get("fortune_telling", [])[:2]
    # The Waite imagery lets the reader describe what they literally see on the card.
    imagery = (card.get("waite_description") or "").strip()
    if len(imagery) > 320:
        imagery = imagery[:320].rsplit(" ", 1)[0] + "..."
    corr = card.get("correspondences", {})
    corr_line = ", ".join(
        f"{k}: {v}" for k, v in (
            ("element", corr.get("element")),
            ("astrology", corr.get("astrology")),
            ("numerology", corr.get("numerology")),
            ("timing", corr.get("timing")),
        ) if v
    )

    lines = [
        f"- {pos_label} -> {card['name']} {card['number']} ({orientation})",
        f"  Canonical (Waite) meaning: {waite}",
        f"  Essence: {essence}",
        f"  Themes: {', '.join(keywords)}",
        f"  Role in this position: {pos_frame}",
        f"  In this domain: {domain_note}",
    ]
    if imagery:
        lines.append(f"  Imagery on the card: {imagery}")
    if facets:
        lines.append(f"  {'Shadow' if is_rev else 'Light'} facets: {'; '.join(facets)}")
    if fortune:
        lines.append(f"  Divinatory cues: {'; '.join(fortune)}")
    lines.append(f"  Correspondences: {corr_line}")
    return "\n".join(lines)


# Authored interpretive-guidance passages (original content) for retrieval.
_POSITION_THEORY = [
    ("position-past", "Reading the Foundation (Past) position: this card shows the root of the matter, the energy or events that set the situation in motion. It is context and cause, not the present challenge or the outcome. Read it as 'where this comes from'."),
    ("position-present", "Reading the Heart (Present) position: this card is the live, current energy, the challenge or opportunity the seeker is sitting in right now. Read it honestly as the truth of the moment, without flinching and without rushing to resolution."),
    ("position-future", "Reading the Horizon (Future) position: this card is the most probable outcome of the current trajectory, not a fixed fate. Read it as a direction that remains, in meaningful ways, in the seeker's hands."),
]

_REVERSED_THEORY = [
    ("reversed-theory", "Reading reversed Major Arcana: a reversal usually softens, internalises, delays, or blocks the upright energy rather than flipping it to pure negativity. It often points to the lesson being unlearned, resisted, or still inward. Speak of blockage, delay, or misalignment, never doom."),
]

# Notable card-combination dynamics (how a pair colours the narrative).
_COMBINATIONS = [
    ("combo-tower-star", "The Tower followed by The Star: collapse precedes renewal. The shattering of The Tower clears false foundations, and only after it does its work can the genuine, earned hope of The Star arrive. One cannot skip to The Star without living through The Tower."),
    ("combo-death-world", "Death with The World: a true ending enables true completion. Death clears what must end; The World marks the cycle fulfilled. Together they describe a passage finished cleanly rather than abandoned midway."),
    ("combo-moon-sun", "The Moon moving toward The Sun: confusion and illusion give way to clarity. What was distorted by fear comes into the light. The fog of The Moon is temporary when The Sun follows."),
    ("combo-devil-star", "The Devil with The Star: recognising a chain of habit or fear (The Devil) is the doorway to renewal (The Star). Liberation begins with seeing the bondage clearly."),
    ("combo-tower-emperor", "The Tower with The Emperor: a rigid or over-controlled structure (Emperor) is exactly what The Tower shakes loose. Where control was brittle, the disruption exposes it."),
    ("combo-fool-wheel", "The Fool with the Wheel of Fortune: a new beginning meets a turning cycle. The leap is timely; events are already in motion to support a bold, well-aimed step."),
    ("combo-hermit-judgement", "The Hermit followed by Judgement: a period of solitude and soul-searching ripens into a clear inner calling. The reflection was preparation for the reckoning that follows."),
    ("combo-lovers-justice", "The Lovers with Justice: a values-based choice meets accountability. The decision must be both true to the heart and fair in its consequences."),
]

# Per-domain reading guidance (how to read for each life area).
_DOMAIN_GUIDANCE = {
    "relationship": "Reading for love and relationships: be especially empathetic. Speak to emotional truth and connection, not verdicts. Avoid prescriptive advice such as 'you should leave'. The real answer is usually about honesty, what the seeker is willing to offer, endure, or release.",
    "marriage": "Reading for marriage and commitment: focus on the architecture of a lasting bond, the daily choices that deepen or erode it, rather than a single dramatic moment. Be tender; avoid prescribing the relationship's fate.",
    "career": "Reading for career: be strategic and grounded. Speak of timing, preparation, alignment, and awareness. Avoid hallmark 'follow your dreams' platitudes; acknowledge real stakes.",
    "business": "Reading for business and finance: emphasise discernment, timing, and structures. Awareness is the asset. Be neither recklessly bold nor merely cautious, point to what is genuinely in motion.",
    "family": "Reading for family: illuminate underlying, often generational patterns without assigning blame. Understanding, honestly held, is the beginning of change. Honour the emotional weight.",
    "growth": "Reading for personal growth and spirituality: frame the work as inward and courageous. Let discomfort be the teacher; resist resolving it prematurely. The next honest step matters more than a final answer.",
    "general": "Reading for general life guidance: offer a compass rather than a map. Name the dominant current, what is moving, what is stalled, and point toward the seeker's most honest, courageous self.",
}

_WEAVING = [
    ("weaving-three-card", "Weaving a three-card spread: read the cards as one unified story across Past/Foundation -> Present/Heart -> Future/Horizon. The foundation explains origin, the heart names the present truth, the horizon shows the probable direction. End with agency: what the seeker can do or be aware of."),
]


def build_corpus() -> list[KBDocument]:
    """Generate the retrievable corpus from the dataset + authored guidance."""
    docs: list[KBDocument] = []

    # Per card-orientation canonical meaning docs.
    for card in MAJOR_ARCANA:
        for orientation in ("upright", "reversed"):
            is_rev = orientation == "reversed"
            waite = card["waite_reversed"] if is_rev else card["waite_upright"]
            keywords = card["keywords_reversed"] if is_rev else card["keywords_upright"]
            essence = card["reversed_essence"] if is_rev else card["upright_essence"]
            docs.append(KBDocument(
                page_content=(
                    f"{card['name']} ({orientation}). Themes: {', '.join(keywords)}. "
                    f"Canonical Waite meaning: {waite} {essence}"
                ),
                metadata={"type": "card_meaning", "card": card["name"], "orientation": orientation},
            ))
        # Per-domain nuance docs for this card.
        for domain, note in card.get("domain_notes", {}).items():
            docs.append(KBDocument(
                page_content=f"{card['name']} in the domain of {domain}: {note}",
                metadata={"type": "card_domain", "card": card["name"], "domain": domain},
            ))
        # Corpora light/shadow facets + divinatory cues (CC0) for richer retrieval.
        if card.get("light_meanings"):
            docs.append(KBDocument(
                page_content=f"{card['name']} light (upright) facets: {'; '.join(card['light_meanings'])}",
                metadata={"type": "card_facets", "card": card["name"], "orientation": "upright"},
            ))
        if card.get("shadow_meanings"):
            docs.append(KBDocument(
                page_content=f"{card['name']} shadow (reversed) facets: {'; '.join(card['shadow_meanings'])}",
                metadata={"type": "card_facets", "card": card["name"], "orientation": "reversed"},
            ))
        if card.get("fortune_telling"):
            docs.append(KBDocument(
                page_content=f"{card['name']} divinatory cues: {'; '.join(card['fortune_telling'])}",
                metadata={"type": "card_fortune", "card": card["name"]},
            ))

    # Authored guidance.
    for key, text in _POSITION_THEORY + _REVERSED_THEORY + _COMBINATIONS + _WEAVING:
        kind = key.split("-")[0]
        docs.append(KBDocument(page_content=text, metadata={"type": kind, "key": key}))
    for domain, text in _DOMAIN_GUIDANCE.items():
        docs.append(KBDocument(page_content=text, metadata={"type": "domain_guidance", "domain": domain}))

    return docs


CORPUS: list[KBDocument] = build_corpus()
