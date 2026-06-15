"""Card-data provider seam.

The reading logic resolves per-card data through a ``CardDataProvider`` so the
source can be swapped without touching callers. The only enabled provider is the
local curated dataset (offline, free). A disabled ``RoxyProvider`` stub documents
how a paid live API (RoxyAPI, https://roxyapi.com/products/tarot-api) would drop
in later behind ``TAROT_CARD_PROVIDER=roxy`` + ``ROXY_API_KEY``.
"""

from __future__ import annotations

import os
from typing import Protocol

from .cards import get_card


class CardDataProvider(Protocol):
    """Returns the knowledge-base record for a card by canonical name."""

    def get(self, name: str) -> dict | None: ...


class LocalDatasetProvider:
    """Default provider: the curated, in-repo ``major_arcana.json`` dataset."""

    name = "local"

    def get(self, name: str) -> dict | None:
        return get_card(name)


class RoxyProvider:
    """Disabled stub for the paid RoxyAPI (78 cards, per-area meanings, images).

    Enabling this would require a paid key and a network call per card; it is left
    unimplemented on purpose so the demo stays zero-cost and offline. To wire it
    later: fetch GET /tarot/cards/{slug} with header ``X-API-Key: $ROXY_API_KEY``
    and map its fields onto the local schema (waite_upright/reversed, keywords,
    per-area domain_notes, image).
    """

    name = "roxy"

    def __init__(self) -> None:
        self._key = os.getenv("ROXY_API_KEY")

    def get(self, name: str) -> dict | None:
        raise NotImplementedError(
            "RoxyProvider is not enabled. Set ROXY_API_KEY and implement the fetch/mapping, "
            "or use the default local provider."
        )


def get_provider() -> CardDataProvider:
    """Resolve the active provider (local by default)."""
    choice = (os.getenv("TAROT_CARD_PROVIDER") or "local").strip().lower()
    if choice == "roxy" and os.getenv("ROXY_API_KEY"):
        return RoxyProvider()
    return LocalDatasetProvider()
