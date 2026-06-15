"""Standalone Tarot Oracle API — serves readings and the static demo UI."""

from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from tarot.reading import generate_reading
from tarot.schemas import ReadingRequest, ReadingResult

load_dotenv()

ROOT = Path(__file__).resolve().parent.parent

app = FastAPI(
    title="Tarot Oracle API",
    description="AI tarot readings grounded in the Rider-Waite Major Arcana knowledge base.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("TAROT_CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> JSONResponse:
    return JSONResponse(content={"status": "healthy"})


@app.get("/v1/public/tarot/health")
async def tarot_health() -> dict[str, str]:
    return {"status": "healthy"}


@app.post("/v1/public/tarot/reading", response_model=ReadingResult)
async def tarot_reading(payload: ReadingRequest) -> ReadingResult:
    return generate_reading(
        question=payload.question,
        category=payload.category,
        seeker_name=payload.seekerName,
        cards=payload.cards,
    )


app.mount("/", StaticFiles(directory=ROOT, html=True), name="static")
