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


class ReadingRequest(BaseModel):
    question: str
    category: str = "general"
    seekerName: str = "Seeker"
    cards: list[DrawnCard] = Field(default_factory=list)


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
    cards: list[CardInterpretation] = Field(default_factory=list)
    synthesis: str = ""
    advice: str = ""
    reflection_question: str = ""
    affirmation: str = ""
    timing: str = ""


class LLMCardReading(BaseModel):
    position: str = Field(description="The position label exactly as given.")
    name: str = Field(description="The canonical card name exactly as given.")
    orientation: str = Field(description="'upright' or 'reversed', exactly as given.")
    interpretation: str = Field(description="3-4 sentences tying this card to the seeker's question. No em dashes.")


class ReadingLLMSchema(BaseModel):
    cards: list[LLMCardReading] = Field(description="One entry per drawn card, in the given order.")
    synthesis: str = Field(description="3-4 sentences weaving all cards into one narrative. No em dashes.")
    advice: str = Field(description="2-3 sentences of grounded, practical guidance. No em dashes.")
    reflection_question: str = Field(description="One short, open question for the seeker. No em dashes.")
    affirmation: str = Field(description="One short, grounding first-person affirmation. No em dashes.")
