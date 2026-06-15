"""Self-contained semantic retriever for the tarot corpus.

Embeds the knowledge corpus once with OpenAI embeddings (the repo-standard
``text-embedding-3-small``), caches the vectors to disk keyed by a content hash,
and serves cosine top-k retrieval from an in-memory numpy matrix. No Postgres,
no FAISS. Degrades gracefully: with no API key or on any embedding error it
reports unavailable and callers fall back to deterministic grounding alone.
"""

from __future__ import annotations

import hashlib
import json
import logging
import os
from pathlib import Path

import numpy as np

from .knowledge import CORPUS, KBDocument

logger = logging.getLogger(__name__)

_EMBED_MODEL = os.getenv("TAROT_EMBED_MODEL", "text-embedding-3-small")
_CACHE_DIR = Path(__file__).resolve().parent / ".kb_cache"


def _corpus_hash(texts: list[str]) -> str:
    h = hashlib.sha256()
    h.update(_EMBED_MODEL.encode())
    for t in texts:
        h.update(b"\x00")
        h.update(t.encode("utf-8"))
    return h.hexdigest()[:16]


class TarotRetriever:
    """Cosine-similarity retriever over the tarot corpus (numpy-backed)."""

    def __init__(self, corpus: list[KBDocument] | None = None):
        self.docs: list[KBDocument] = corpus if corpus is not None else CORPUS
        self.matrix: np.ndarray | None = None      # (N, dim) L2-normalized
        self.available: bool = False

    # -- build / cache -------------------------------------------------
    def initialize(self) -> None:
        if self.available:
            return
        texts = [d.page_content for d in self.docs]
        key = _corpus_hash(texts)
        npz = _CACHE_DIR / f"{key}.npz"
        if npz.exists():
            try:
                self.matrix = np.load(npz)["m"]
                self.available = True
                logger.info("Tarot retriever loaded %d vectors from cache", len(self.docs))
                return
            except Exception as exc:  # noqa: BLE001
                logger.warning("Tarot retriever cache load failed (%s); rebuilding", exc)

        if not os.getenv("OPENAI_API_KEY"):
            logger.info("No OPENAI_API_KEY; tarot retriever disabled (deterministic grounding only)")
            return
        try:
            from langchain_openai import OpenAIEmbeddings  # local import keeps import-time light

            embedder = OpenAIEmbeddings(model=_EMBED_MODEL, api_key=os.getenv("OPENAI_API_KEY"))
            vectors = np.array(embedder.embed_documents(texts), dtype=np.float32)
            # L2-normalize rows so dot product == cosine similarity.
            norms = np.linalg.norm(vectors, axis=1, keepdims=True)
            norms[norms == 0] = 1.0
            self.matrix = vectors / norms
            self.available = True
            _CACHE_DIR.mkdir(exist_ok=True)
            np.savez_compressed(npz, m=self.matrix)
            logger.info("Tarot retriever embedded + cached %d docs", len(self.docs))
        except Exception as exc:  # noqa: BLE001
            logger.warning("Tarot retriever embedding failed (%s); deterministic grounding only", exc)
            self.matrix = None
            self.available = False

    # -- query ---------------------------------------------------------
    def retrieve(self, query: str, k: int = 5) -> list[KBDocument]:
        """Return the top-k corpus documents most similar to the query."""
        if not self.available:
            self.initialize()
        if not self.available or self.matrix is None or not query.strip():
            return []
        try:
            from langchain_openai import OpenAIEmbeddings

            embedder = OpenAIEmbeddings(model=_EMBED_MODEL, api_key=os.getenv("OPENAI_API_KEY"))
            q = np.array(embedder.embed_query(query), dtype=np.float32)
            n = np.linalg.norm(q) or 1.0
            q = q / n
            scores = self.matrix @ q
            top = np.argsort(scores)[::-1][:k]
            return [self.docs[i] for i in top]
        except Exception as exc:  # noqa: BLE001
            logger.warning("Tarot retrieval query failed (%s)", exc)
            return []


_retriever: TarotRetriever | None = None


def get_tarot_retriever() -> TarotRetriever:
    """Lazy module-level singleton."""
    global _retriever
    if _retriever is None:
        _retriever = TarotRetriever()
        _retriever.initialize()
    return _retriever
