# Tarot Oracle — AI Reading Demo (PoC)

A generic landing page with an embedded AI tarot chatbot. The chatbot runs the
full 7-step reading flow client-side and calls the `tarot_reading_agent` backend
(GPT-4o, grounded in a Major Arcana knowledge base) to generate the actual
reading. If the backend is unavailable, it gracefully falls back to a local
template generator so the demo never breaks.

## Files
- `index.html` — landing page (hero + embedded chatbot)
- `styles.css` — dark-mystical theme
- `app.js` — conversation state machine + AI fetch + local fallback
- `config.js` — points the chatbot at the backend (`TAROT_API_BASE`)

## Run locally

1. Start the backend (in `../agents`), with `OPENAI_API_KEY` set:
   ```bash
   cd ../agents
   PYTHONPATH=src OPENAI_API_KEY=sk-... .venv/bin/uvicorn connektra_agents.api.main:app --port 8080
   ```
2. Serve this folder (any static server):
   ```bash
   python3 -m http.server 3000   # or: npx serve
   ```
3. Open http://localhost:3000

The AI endpoint is `POST {TAROT_API_BASE}/v1/public/tarot/reading` — public/unauthenticated for the demo.

## Configuration
Edit `config.js`:
```js
window.TAROT_API_BASE = "http://localhost:8080"; // backend base URL
window.TAROT_API_TIMEOUT_MS = 50000;             // fall back to local after this
```
Leave `TAROT_API_BASE` empty (`""`) to force the local fallback generator.

## Data & asset provenance
- **Card meanings**: A.E. Waite, *The Pictorial Key to the Tarot* (1910) — public domain; plus CC0 light/shadow facets + divinatory cues from [dariusk/corpora](https://github.com/dariusk/corpora). Curated in `agents/.../tarot_reading_agent/data/major_arcana.json` (see its `_provenance`).
- **Card art** (`assets/cards/00.jpg … 21.jpg`): the original 1909 Rider-Waite-Smith Major Arcana by Pamela Colman Smith — public domain in the US (via Wikimedia Commons).

## Scope (PoC)
- ✅ AI-powered, domain-aware readings + lead capture form (client-side).
- ⏳ Phase 2 (deferred): persist leads, email reading as PDF, calendar/consultation booking.

Lead capture currently validates and holds name/email/phone in browser state only.
Persisting leads is a Phase 2 backend hook.
