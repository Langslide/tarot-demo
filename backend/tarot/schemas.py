from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field


POSITION_LABELS = [
    "THE FOUNDATION (Root of the Matter)",
    "THE HEART (Present Energy)",
    "THE HORIZON (Probable Outcome)",
]

CATEGORY_LABELS = {
    "relationship": "Relationships & Love",
    "marriage": "Marriage & Commitment",
    "career": "Career & Job",
    "business": "Business & Finance",
    "family": "Family & Relatives",
    "growth": "Personal Growth & Spirituality",
    "general": "General Life Guidance",
}


class DrawnCard(BaseModel):
    name: str
    orientation: Literal["upright", "reversed"] = "upright"
    position: Literal["past", "present", "future"] = "past"


class Clarification(BaseModel):
    """A tailored follow-up question and the seeker's answer."""
    question: str = ""
    answer: str = ""


class ReadingRequest(BaseModel):
    question: str
    category: str = "general"
    seekerName: str = "Seeker"
    cards: list[DrawnCard] = Field(default_factory=list)
    details: list[Clarification] = Field(default_factory=list)  # seeker's follow-up answers


class FollowupRequest(BaseModel):
    """Generate tailored clarifying questions before the reading."""
    question: str
    category: str = "general"
    seekerName: str = "Seeker"


class FollowupResponse(BaseModel):
    status: str = "success"
    questions: list[str] = Field(default_factory=list)


class CardInterpretation(BaseModel):
    position: str
    name: str
    orientation: str
    interpretation: str
    keywords: list[str] = Field(default_factory=list)
    correspondence: str = ""


class ReadingResult(BaseModel):
    status: str = "success"
    message: str = ""
    category: str = ""
    category_label: str = ""
    opening: str = ""
    cards: list[CardInterpretation] = Field(default_factory=list)
    card_connections: str = ""   # how the three cards speak to each other
    pattern: str = ""            # deterministic elemental/numerology analysis
    synthesis: str = ""
    direct_answer: str = ""      # honest, direct response to the exact question
    strengths: str = ""          # what is working for / supporting the seeker
    challenges: str = ""         # what to be wary of (awareness, not doom)
    embrace_release: str = ""    # what to lean into, what to let go
    advice: str = ""
    reflection_question: str = ""
    affirmation: str = ""
    timing: str = ""


class LLMCardReading(BaseModel):
    position: str = Field(description="The position label exactly as given.")
    name: str = Field(description="The canonical card name exactly as given.")
    orientation: str = Field(description="'upright' or 'reversed', exactly as given.")
    interpretation: str = Field(description=(
        "A rich 5 to 7 sentence reading of THIS card in THIS position and orientation. "
        "Reference at least one concrete detail the seeker shared (their words, the specifics from their follow-up answers). "
        "Name something you literally see in the card's imagery and tie it to their situation. "
        "Honour the position (Past/Foundation, Present/Heart, Future/Horizon). Specific, not generic. No em dashes."
    ))


class ReadingLLMSchema(BaseModel):
    analysis: str = Field(description=(
        "PRIVATE planning notes, never shown to the seeker. In 4 to 6 sentences, think through how the three cards "
        "interact (which reinforces or undercuts which), how the elemental and arcana pattern colours the answer, "
        "and the specific details the seeker shared. Use this to make every later section concrete and connected."
    ))
    opening: str = Field(description=(
        "2 to 3 sentences in the reader's own voice, spoken directly to the seeker by first name, "
        "reflecting back the specific situation they described (in their own words) before interpreting the cards. "
        "Warm, human, not generic. No em dashes."
    ))
    cards: list[LLMCardReading] = Field(description="One entry per drawn card, in the given order.")
    card_connections: str = Field(description=(
        "4 to 5 sentences on how the three cards speak to each other as one story: what the Past sets up, "
        "how the Present answers or resists it, where the Future bends. Cite the actual cards by name. No em dashes."
    ))
    synthesis: str = Field(description=(
        "8 to 10 sentences weaving all three cards into one in-depth narrative that answers THIS seeker's specific "
        "question, naming them and their concrete details, integrating the pattern (elements/arcana weight), honest and "
        "non-prescriptive, ending with grounded agency. This is the centrepiece, make it substantial. No em dashes."
    ))
    direct_answer: str = Field(description=(
        "3 to 4 sentences giving an honest, direct response to exactly what the seeker asked, in plain words, "
        "neither falsely positive nor fatalistic. Name what the cards lean toward and what it depends on. No em dashes."
    ))
    strengths: str = Field(description="2 to 3 sentences on what is genuinely working in the seeker's favour right now, grounded in the cards and their situation. No em dashes.")
    challenges: str = Field(description="2 to 3 sentences on what to be wary of or watch, framed as awareness and not doom, specific to their situation. No em dashes.")
    embrace_release: str = Field(description="2 to 3 sentences naming what to lean into and what to let go of, concrete to this reading. No em dashes.")
    advice: str = Field(description="4 to 5 sentences of grounded, practical guidance specific to their situation (actions or awareness), non-prescriptive. No em dashes.")
    reflection_question: str = Field(description="One short, open question for the seeker to sit with, drawn from their specific situation. No em dashes.")
    affirmation: str = Field(description="One short, grounding first-person affirmation aligned with the energy, honest, not falsely positive. No em dashes.")
