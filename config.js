// Demo configuration
//
// TAROT_FORCE_LOCAL = true  → never call the API (offline template readings only)
// TAROT_API_BASE = ""       → same-origin API (single-server deploy, default)
// TAROT_API_BASE = "http://localhost:8000" → split dev (static server + API separately)
window.TAROT_FORCE_LOCAL = false;
window.TAROT_API_BASE = "";
window.TAROT_API_TIMEOUT_MS = 50000;
