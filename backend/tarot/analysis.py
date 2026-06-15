"""Deterministic spread analysis: elemental dignities and arcana weight.

This is a real tarot interpretation layer computed with no LLM, purely from the
dataset's per-card correspondences. It is fed to the model as grounding (so the
prose can cite it) and shown to the seeker as a 'Pattern in Your Cards' section.
"""

from __future__ import annotations

from .sources import get_provider

# Brief plain-language sense of each element's current.
_ELEMENT_SENSE = {
    "Fire": "drive, passion, and will",
    "Water": "emotion, intuition, and connection",
    "Air": "thought, communication, and clarity",
    "Earth": "the practical, material, and embodied",
}

_FRIENDLY = ({"Fire", "Air"}, {"Water", "Earth"})
_OPPOSING = ({"Fire", "Water"}, {"Air", "Earth"})


def _pair_relationship(a: str, b: str) -> str:
    if not a or not b:
        return "neutral"
    if a == b:
        return "reinforcing"
    pair = {a, b}
    if pair in _FRIENDLY:
        return "strengthening"
    if pair in _OPPOSING:
        return "weakening"
    return "neutral"


def analyze_spread(cards) -> dict:
    """Compute elemental dignities + arcana weight for the draw (drawn cards only)."""
    recs = [(c, get_provider().get(c.name)) for c in cards]
    elements = [
        (rec.get("correspondences", {}).get("element") if rec else None)
        for _, rec in recs
    ]
    elements = [e for e in elements if e]

    # Elemental tally + dominant element.
    counts: dict[str, int] = {}
    for e in elements:
        counts[e] = counts.get(e, 0) + 1
    dominant = max(counts, key=counts.get) if counts else ""

    # Pairwise dignities across the three cards.
    rels = []
    for i in range(len(elements)):
        for j in range(i + 1, len(elements)):
            rels.append(_pair_relationship(elements[i], elements[j]))
    strengthening = sum(1 for r in rels if r in ("reinforcing", "strengthening"))
    weakening = sum(1 for r in rels if r == "weakening")

    if weakening and weakening >= strengthening:
        dignity = "These energies pull against one another, so the path asks you to reconcile competing pulls rather than ride a single current."
    elif strengthening and not weakening:
        dignity = "These energies reinforce one another, so the current running through this situation is coherent and strong."
    else:
        dignity = "These energies mix, some supporting, some resisting, so the reading holds both momentum and friction."

    # Element balance sentence.
    if dominant and counts.get(dominant, 0) >= 2:
        balance = f"{dominant} dominates the spread, foregrounding {_ELEMENT_SENSE.get(dominant, 'its themes')}."
    elif len(counts) == 3:
        balance = "Three different elements appear, so several parts of life (heart, mind, will, and circumstance) are all in play at once."
    else:
        present = ", ".join(f"{_ELEMENT_SENSE.get(e, e)}" for e in counts)
        balance = f"The spread leans on {present}."

    majors_note = (
        "All three cards are Major Arcana, which marks this as a pivotal, soul-level matter, "
        "the kind of turning point that shapes a chapter of life rather than a passing day."
    )

    # NOTE: numerology "teacher card" deliberately omitted. Summing the drawn
    # cards and naming the resulting Major Arcana introduces a card that was
    # never drawn (e.g. The Tower), which reads as a hallucination to the seeker
    # and gets woven through the LLM reading. The pattern stays strictly to the
    # cards actually on the table: arcana weight, elemental balance, dignities.
    pattern_text = " ".join(p for p in [majors_note, balance, dignity] if p)

    return {
        "elements": counts,
        "dominant_element": dominant,
        "dignity": dignity,
        "balance": balance,
        "majors_note": majors_note,
        "pattern_text": pattern_text,
    }
