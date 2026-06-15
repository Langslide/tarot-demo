"""Major Arcana knowledge base loader — the grounded retrieval source for readings.

The substance lives in the curated dataset ``data/major_arcana.json`` (canonical
public-domain Waite meanings + Golden Dawn correspondences + authored per-position
and per-domain enrichment; see that file's ``_provenance`` and
``scripts/build_dataset.py``). This module loads and indexes it, preserving the
``MAJOR_ARCANA`` / ``get_card`` API used elsewhere.
"""

from __future__ import annotations

import json
from pathlib import Path

# Category keys mirror the frontend / STATE.categoryKey values.
CATEGORY_KEYS = [
    "relationship",
    "marriage",
    "career",
    "business",
    "family",
    "growth",
    "general",
]

_DATASET_PATH = Path(__file__).resolve().parent / "data" / "major_arcana.json"


def _load_dataset() -> tuple[list[dict], dict]:
    data = json.loads(_DATASET_PATH.read_text())
    cards = data.get("cards", [])
    provenance = data.get("_provenance", {})
    return cards, provenance


MAJOR_ARCANA, PROVENANCE = _load_dataset()

# Fast lookup by exact card name (the retrieval key).
_BY_NAME = {card["name"]: card for card in MAJOR_ARCANA}


def get_card(name: str) -> dict | None:
    """Retrieve a card's full knowledge-base entry by its canonical name."""
    return _BY_NAME.get((name or "").strip())
