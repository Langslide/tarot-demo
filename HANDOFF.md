# The Hope Tarot / Tarot Oracle — Project Handoff

Context document for continuing this work in a new chat. Read this first.

## What this is
A PoC/demo: an **AI tarot reading agent** with a branded landing page and an
embedded chatbot that delivers in-depth, human-sounding Major Arcana readings.
Originally built for client **The Hope Tarot (Dr. Sneha Jain)** but the demo is
currently **generic** (all "Hope Tarot" branding removed; titled "Tarot Oracle").

## Architecture (current)
Everything now lives in **one standalone folder**: `/Users/pronoypant/Connektra/tarot-demo/`
(the backend was moved here out of the `agents` repo; the `agents` copy is stale, ignore it).

- **Frontend** (static, vanilla JS, no build step): `index.html`, `app.js` (~1000 lines, the 7-step state machine), `styles.css`, `config.js`, `assets/cards/00.jpg…21.jpg` (public-domain Rider-Waite-Smith art).
- **Backend** (standalone FastAPI): `backend/main.py` + package `backend/tarot/`. It serves BOTH the API and the static UI (StaticFiles mounted at `/`).
  - `backend/tarot/`: `reading.py` (core), `prompts.py`, `schemas.py`, `analysis.py` (deterministic elemental-dignity + arcana-weight pattern, drawn cards only), `knowledge.py` (grounding + RAG corpus), `retriever.py` (numpy-cosine semantic RAG, disk-cached), `cards.py` (loads the dataset), `sources.py` (provider seam: local default + disabled RoxyAPI stub), `data/major_arcana.json` (the dataset).
  - `backend/scripts/build_dataset.py` (one-off dataset builder, not used at runtime).

## Endpoints (all public, no auth)
- `POST /v1/public/tarot/followups` → 1-2 tailored clarifying questions from the seeker's question.
- `POST /v1/public/tarot/reading` → the full in-depth reading.
- `GET /v1/public/tarot/health`, `GET /health`.

## The flow (frontend STATE machine in app.js)
0 welcome → 1 question → 2 category (pills, with deduced area **pre-highlighted**) → **2.5 follow-ups** (backend-generated, seeker answers, optional) → 3 lead capture (name/email/phone, client-side only) → 4 card pick (3 of 22, **deselectable**) → 5 reveal (real RWS art, reversed rotated) → 6 reading (AI, with graceful **local fallback** if backend down) → 7 close (Ask Again / Email Me, mailto).

## The reading (LLM = GPT-4o, structured output) — sections in order
opening → 3 card blocks (imagery-aware, 5-7 sentences each, keyword chips + correspondence) → **How Your Cards Speak to Each Other** → **The Pattern in Your Cards** (deterministic: elemental dignities + all-Majors note) → **The Synthesis** (8-10 sentences, centrepiece) → **The Heart of Your Answer** (direct response) → **What Is Working For You** → **What to Be Wary Of** → **What to Embrace, What to Release** → **Guidance** → **Timing** → **A Question to Sit With** → **Affirmation**.

How quality is achieved: hidden chain-of-thought `analysis` field (plan before prose, not displayed); few-shot exemplar in the system prompt; strict **anti-LLM-tell** rules + **no em dashes** (stripped server-side); the seeker's follow-up answers + the computed pattern woven in; `max_tokens=3000`, temperature 0.8. Per-card deterministic meta (keywords, correspondence) comes from the dataset, not the model.

**Anti-hallucination (cards only): a reading must reference ONLY the three drawn cards.** Three layers enforce this: (1) the numerology "teacher card" was removed from `analysis.py` (it summed the draw and named a 4th card, e.g. The Tower — the classic leak); (2) `_retrieve_guidance` in `reading.py` drops any RAG passage that names an undrawn card (the `_COMBINATIONS` corpus in `knowledge.py` names card pairs like Tower+Star); (3) the system prompt forbids naming any non-drawn card, and `_scrub_undrawn_cards` in `reading.py` deletes, as a final safety net, any output sentence naming a card outside the draw (case-sensitive whole-name match on canonical Title Case, so lowercase "death"/"the sun" prose is safe). Do NOT re-introduce numerology card-naming or unfiltered combination passages.

## Data & provenance (all legally clean, offline)
- Canonical meanings: **A.E. Waite, Pictorial Key to the Tarot (1910)** — public domain (via `ekelen/tarot-api`). Fields `waite_upright/reversed/description`.
- Light/shadow facets + fortune-telling + keywords: **dariusk/corpora** (CC0).
- Correspondences (element, astrology, Hebrew letter, numerology, Tree-of-Life, timing): Golden Dawn (public domain).
- Per-position framing + domain notes: authored for this project.
- Card art: 1909 RWS by Pamela Colman Smith — public domain (Wikimedia Commons).
- Evaluated paid APIs (RoxyAPI $39/mo, astrologyapi, vedika): **not used** — pre-written text our LLM out-writes; a disabled `RoxyProvider` stub in `sources.py` documents how to plug one in later.

## How to run
Backend needs `backend/.env` with `OPENAI_API_KEY` (the user maintains this; `.env.example` is the template).
The user typically runs: `cd tarot-demo/backend && source .venv/bin/activate && python -m dotenv -f .env run uvicorn main:app --host 0.0.0.0 --port 8001 --reload` → open http://localhost:8001/ (serves UI + API; `config.js` uses same-origin).
For a clean test server use a free IPv4 port, e.g. `PYTHONPATH=. .venv/bin/uvicorn main:app --host 127.0.0.1 --port 8077`.

## Gotchas / notes
- Backend `.venv` is **Python 3.14** → harmless Pydantic-v1 deprecation warning; `faiss` NOT installed (retriever uses numpy cosine, by design).
- **Port 8000** has another service on IPv6 `localhost` → use 8001/8077 and `127.0.0.1`.
- The preview tool (`preview_start`) launches the unrelated `qa-web` app; navigate it to the backend URL via `preview_eval` `window.location.href=...`.
- A `--reload` server may lag picking up edits; verify on a fresh port if in doubt.
- Readings now take ~20-35s (depth + tokens); covered by the typing indicator + `TAROT_API_TIMEOUT_MS`.
- Em dashes are forbidden in all output (prompt rule + `_strip_em_dashes`).

## Decisions locked in
GPT-4o (not Claude). One-shot reading (no post-reading Q&A — possible future enhancement). 22 Major Arcana only (matches the UI deck; full 78 is a future option). Zero-infra, offline, graceful-degrading. UI stays vanilla JS (port to React only if it scales past PoC).

## Plan / history
Full iteration plans: `~/.claude/plans/https-roxyapi-com-products-tarot-api-htt-sequential-sifakis.md` and `~/.claude/plans/users-pronoypant-downloads-message-txt-gleaming-jellyfish.md`.

## Likely next steps (not yet built)
Phase 2: persist leads, email reading as PDF, calendar/consultation booking. Re-brand to The Hope Tarot if approved. Optional: post-reading follow-up Q&A, full 78-card deck, port UI to React.
