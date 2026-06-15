# Tarot Oracle — AI Reading Demo (Standalone)

A self-contained landing page with an embedded AI tarot chatbot. The frontend runs
the full 7-step reading flow in the browser; the bundled Python backend generates
readings with GPT-4o, grounded in a curated Major Arcana knowledge base and a
local semantic retriever (numpy + OpenAI embeddings). If the API is unavailable,
the UI falls back to a local template generator.

No Connektra Agents platform, database, or auth required — only `OPENAI_API_KEY`.

## Repository layout

```
tarot-demo/
├── index.html, styles.css, app.js, config.js   # static UI
├── assets/cards/                               # Rider-Waite Major Arcana (PD)
├── backend/
│   ├── main.py                                 # FastAPI: API + static UI
│   ├── requirements.txt
│   └── tarot/                                  # reading engine
│       ├── reading.py, retriever.py, knowledge.py, …
│       └── data/major_arcana.json
└── Dockerfile
```

## Quick start (single server)

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # add OPENAI_API_KEY
uvicorn main:app --reload --port 8000
```

Open **http://localhost:8000** — UI and API share the same origin.

## Split dev (optional)

Terminal 1 — API only:

```bash
cd backend && source .venv/bin/activate
uvicorn main:app --reload --port 8000
```

Terminal 2 — static UI only:

```bash
python3 -m http.server 3000
```

Set in `config.js`:

```js
window.TAROT_API_BASE = "http://localhost:8000";
```

## Docker

```bash
docker build -t tarot-oracle .
docker run --rm -p 8000:8000 -e OPENAI_API_KEY=sk-... tarot-oracle
```

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Service health |
| `GET` | `/v1/public/tarot/health` | Tarot module health |
| `POST` | `/v1/public/tarot/reading` | Generate a reading |

Request body:

```json
{
  "question": "Should I take the new role?",
  "category": "career",
  "seekerName": "Alex",
  "cards": [
    { "name": "The Fool", "orientation": "upright", "position": "past" },
    { "name": "The Tower", "orientation": "reversed", "position": "present" },
    { "name": "The Star", "orientation": "upright", "position": "future" }
  ]
}
```

## Configuration

**Frontend** (`config.js`):

| Variable | Default | Purpose |
|----------|---------|---------|
| `TAROT_FORCE_LOCAL` | `false` | Skip API; use local template only |
| `TAROT_API_BASE` | `""` | Empty = same-origin; or full backend URL |
| `TAROT_API_TIMEOUT_MS` | `50000` | Abort API call after this (ms) |

**Backend** (environment):

| Variable | Default | Purpose |
|----------|---------|---------|
| `OPENAI_API_KEY` | — | Required for AI readings and RAG embeddings |
| `TAROT_MODEL` | `gpt-4o` | Main reading model |
| `TAROT_CLASSIFIER_MODEL` | `gpt-4o-mini` | Question domain classifier |
| `TAROT_EMBED_MODEL` | `text-embedding-3-small` | Corpus embeddings |
| `TAROT_CORS_ORIGINS` | `*` | Comma-separated CORS origins |

Without `OPENAI_API_KEY`, the retriever runs in deterministic-only mode and LLM
calls fail gracefully (the frontend falls back locally).

## Data & asset provenance

- **Card meanings**: A.E. Waite, *The Pictorial Key to the Tarot* (1910) — public domain; plus CC0 light/shadow facets and divinatory cues from [dariusk/corpora](https://github.com/dariusk/corpora). Curated in `backend/tarot/data/major_arcana.json`.
- **Card art** (`assets/cards/00.jpg` … `21.jpg`): 1909 Rider-Waite-Smith Major Arcana by Pamela Colman Smith — public domain in the US (via Wikimedia Commons).

## Scope (PoC)

- ✅ Standalone deploy (UI + API + local RAG)
- ✅ AI-powered readings + client-side lead capture form
- ⏳ Phase 2: persist leads, email reading as PDF, calendar booking

Lead capture validates and holds name/email/phone in browser state only.
