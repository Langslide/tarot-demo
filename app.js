// ============================================================
// THE MAJOR ARCANA DATA
// ============================================================
const MAJOR_ARCANA = [
  {
    id: 0, name: "The Fool", number: "0", symbol: "☀️",
    keywords_upright: ["new beginnings", "innocence", "spontaneity", "free spirit"],
    keywords_reversed: ["recklessness", "risk without reward", "naivety", "poor judgment"],
    upright_essence: "A leap of faith beckons. The universe invites you into the unknown with open arms, trust the journey over the destination.",
    reversed_essence: "Caution is warranted. Enthusiasm without grounding leads to stumbles. Pause before the leap."
  },
  {
    id: 1, name: "The Magician", number: "I", symbol: "⚡",
    keywords_upright: ["willpower", "skill", "manifestation", "resourcefulness"],
    keywords_reversed: ["manipulation", "untapped potential", "wasted talent", "deception"],
    upright_essence: "All tools needed are already in your hands. This is a moment of power, act with intention and clarity.",
    reversed_essence: "Skills exist but remain dormant. Self-doubt or misuse of ability is creating friction. Reclaim your agency."
  },
  {
    id: 2, name: "The High Priestess", number: "II", symbol: "🌙",
    keywords_upright: ["intuition", "sacred knowledge", "divine feminine", "the subconscious"],
    keywords_reversed: ["secrets", "disconnection from intuition", "information withheld", "surface-level understanding"],
    upright_essence: "The answer you seek lives within you. Be still. Listen to the voice beneath thought.",
    reversed_essence: "You may be ignoring your own inner knowing. Someone near you may not be revealing the full truth."
  },
  {
    id: 3, name: "The Empress", number: "III", symbol: "🌿",
    keywords_upright: ["abundance", "fertility", "nurturing", "creation", "nature"],
    keywords_reversed: ["creative block", "dependence", "smothering", "neglect of self"],
    upright_essence: "A season of abundance and creative fertility. What you nurture now will flourish. Tend to yourself and your relationships.",
    reversed_essence: "Creative energy is blocked or misdirected. You may be giving too much to others while depleting yourself."
  },
  {
    id: 4, name: "The Emperor", number: "IV", symbol: "👑",
    keywords_upright: ["authority", "structure", "stability", "father figure", "control"],
    keywords_reversed: ["domination", "rigidity", "inflexibility", "loss of control", "tyranny"],
    upright_essence: "Firm foundations and disciplined action will serve you. Structure is your ally, not your constraint.",
    reversed_essence: "Rigidity or an overreaching authority figure may be at the heart of this. Examine where power is being wielded, or abdicated."
  },
  {
    id: 5, name: "The Hierophant", number: "V", symbol: "⛪",
    keywords_upright: ["tradition", "conformity", "spiritual guidance", "institutions", "mentor"],
    keywords_reversed: ["rebellion", "subversiveness", "unconventional path", "dogma"],
    upright_essence: "Established wisdom and traditional structures hold value here. Seek counsel from those who have walked this road.",
    reversed_essence: "The conventional path may not serve you. Question inherited beliefs, your truth may lie outside tradition."
  },
  {
    id: 6, name: "The Lovers", number: "VI", symbol: "💞",
    keywords_upright: ["love", "union", "alignment", "choices", "values"],
    keywords_reversed: ["disharmony", "imbalance", "misaligned values", "poor choices"],
    upright_essence: "A significant choice stands before you, one that will define your path. Choose from your deepest values, not convenience.",
    reversed_essence: "Misalignment in values is creating discord. A relationship or partnership may be pulling in opposite directions."
  },
  {
    id: 7, name: "The Chariot", number: "VII", symbol: "🌟",
    keywords_upright: ["determination", "control", "willpower", "victory", "assertion"],
    keywords_reversed: ["aggression", "lack of direction", "opposition", "scattered energy"],
    upright_essence: "Victory is within reach, but only through focus and discipline. Hold the reins, not the sword.",
    reversed_essence: "Conflicting desires are pulling you off course. The will to act is there, but the direction needs clarity."
  },
  {
    id: 8, name: "Strength", number: "VIII", symbol: "🦁",
    keywords_upright: ["courage", "inner strength", "compassion", "patience", "taming impulses"],
    keywords_reversed: ["self-doubt", "weakness", "insecurity", "raw emotion"],
    upright_essence: "True power here is not force, it is grace under pressure. Your gentleness is your greatest weapon.",
    reversed_essence: "Self-doubt may be louder than it should be. The strength you seek already lives within you, it has been buried, not lost."
  },
  {
    id: 9, name: "The Hermit", number: "IX", symbol: "🕯️",
    keywords_upright: ["soul-searching", "introspection", "solitude", "guidance", "inner wisdom"],
    keywords_reversed: ["isolation", "loneliness", "withdrawal", "lost in thought", "rejection of help"],
    upright_essence: "A period of deep reflection is needed, or already underway. The answers do not come from outside. Go inward.",
    reversed_essence: "Isolation has become a hiding place rather than a sanctuary. Or you may be rejecting counsel that could genuinely help."
  },
  {
    id: 10, name: "Wheel of Fortune", number: "X", symbol: "☯️",
    keywords_upright: ["cycles", "fate", "turning point", "luck", "change"],
    keywords_reversed: ["bad luck", "resistance to change", "breaking cycles", "external forces"],
    upright_essence: "The wheel is turning. A significant cycle is completing or beginning. Align yourself with the current of change.",
    reversed_essence: "Resistance to inevitable change is causing suffering. You may be caught in a repeating pattern, one that requires conscious breaking."
  },
  {
    id: 11, name: "Justice", number: "XI", symbol: "⚖️",
    keywords_upright: ["fairness", "truth", "cause and effect", "law", "accountability"],
    keywords_reversed: ["unfairness", "dishonesty", "lack of accountability", "legal complications"],
    upright_essence: "Truth and fairness are the compass here. What is done in integrity will be upheld. An honest accounting is required.",
    reversed_essence: "Something is not being fairly dealt with, by you, by another, or by the system. Hidden dishonesty may surface."
  },
  {
    id: 12, name: "The Hanged Man", number: "XII", symbol: "🌀",
    keywords_upright: ["suspension", "surrender", "letting go", "new perspective", "pause"],
    keywords_reversed: ["stalling", "resistance", "indecision", "avoiding sacrifice"],
    upright_essence: "You are being asked to pause. Surrender the urge to force outcomes, the gift is in the waiting and the seeing.",
    reversed_essence: "A necessary sacrifice is being postponed. The limbo you feel comes from unwillingness to let go of what no longer serves."
  },
  {
    id: 13, name: "Death", number: "XIII", symbol: "🌹",
    keywords_upright: ["endings", "transformation", "transition", "letting go", "inevitable change"],
    keywords_reversed: ["resistance to change", "stagnation", "decay", "fear of the inevitable"],
    upright_essence: "This is not an ending, it is a transformation. Something must die so something truer can be born. Do not grieve the chrysalis.",
    reversed_essence: "You are holding on to something that has already ended. The rot beneath is a sign, not a challenge to endure."
  },
  {
    id: 14, name: "Temperance", number: "XIV", symbol: "🏔️",
    keywords_upright: ["balance", "moderation", "patience", "purpose", "alchemy"],
    keywords_reversed: ["imbalance", "excess", "lack of long-term vision", "discord"],
    upright_essence: "The art of this moment is balance, not extremes, not rushing. Patient, steady alchemy is at work. Trust the process.",
    reversed_essence: "Excess in some area, emotion, work, spending, expectation, is creating imbalance. Recalibrate before proceeding."
  },
  {
    id: 15, name: "The Devil", number: "XV", symbol: "🔗",
    keywords_upright: ["bondage", "addiction", "materialism", "shadow self", "unhealthy patterns"],
    keywords_reversed: ["release", "breaking free", "reclaiming power", "detachment"],
    upright_essence: "A chain binds you, but look closely. It was placed there by habit, fear, or illusion, not by fate. The lock is on your side.",
    reversed_essence: "The chains are loosening, you are beginning to see the patterns for what they are. Liberation is closer than it feels."
  },
  {
    id: 16, name: "The Tower", number: "XVI", symbol: "⚡",
    keywords_upright: ["sudden change", "upheaval", "chaos", "revelation", "awakening"],
    keywords_reversed: ["avoidance of disaster", "fear of change", "delayed collapse", "internalized upheaval"],
    upright_essence: "What is built on false foundations will fall, and that falling is mercy, not punishment. The Tower clears space for what is real.",
    reversed_essence: "A collapse is being delayed, through denial or avoidance. The internal reckoning being postponed will demand its dues."
  },
  {
    id: 17, name: "The Star", number: "XVII", symbol: "✨",
    keywords_upright: ["hope", "faith", "renewal", "serenity", "inspiration"],
    keywords_reversed: ["despair", "faithlessness", "discouragement", "disconnection from purpose"],
    upright_essence: "After the storm, the stars return. There is real reason for hope here, not wishful thinking, but earned renewal.",
    reversed_essence: "Hope feels distant right now. This is a season of spiritual drought, but drought ends. The well is not empty, only low."
  },
  {
    id: 18, name: "The Moon", number: "XVIII", symbol: "🌕",
    keywords_upright: ["illusion", "fear", "the unconscious", "confusion", "hidden truths"],
    keywords_reversed: ["confusion lifting", "releasing fear", "unhealthy fantasy", "clarity emerging"],
    upright_essence: "Not all is as it appears. The Moon illuminates but also distorts. Fear and illusion are shaping your perception, proceed with caution.",
    reversed_essence: "The fog is beginning to clear. A fear or false belief you have been carrying is starting to dissolve, let it."
  },
  {
    id: 19, name: "The Sun", number: "XIX", symbol: "☀️",
    keywords_upright: ["positivity", "success", "radiance", "clarity", "vitality"],
    keywords_reversed: ["ego", "overshadowed success", "temporary setback", "blocked joy"],
    upright_essence: "Warmth and clarity arrive. What has been uncertain comes into the light. Success here is earned and it is real.",
    reversed_essence: "Joy is present but something dims it, ego, comparison, or an external obstacle. The Sun still shines; find the angle."
  },
  {
    id: 20, name: "Judgement", number: "XX", symbol: "📯",
    keywords_upright: ["rebirth", "inner calling", "absolution", "awakening", "reckoning"],
    keywords_reversed: ["self-doubt", "refusal of self-examination", "ignoring a calling", "harsh self-judgment"],
    upright_essence: "A profound calling is sounding. This is a moment of reckoning and renewal, not judgment by others, but by your truest self.",
    reversed_essence: "You may be avoiding a deep reckoning or being excessively hard on yourself. Neither serves the path forward."
  },
  {
    id: 21, name: "The World", number: "XXI", symbol: "🌍",
    keywords_upright: ["completion", "integration", "accomplishment", "wholeness", "travel"],
    keywords_reversed: ["incompletion", "shortcuts", "carrying past baggage", "unfinished business"],
    upright_essence: "A cycle reaches its fullest expression. What was sought has been found, or is moments away. Integration and wholeness are the themes.",
    reversed_essence: "Something is preventing true completion, unfinished business, unhealed wounds, or the tendency to settle before the full journey is walked."
  }
];

// ============================================================
// STATE MACHINE
// ============================================================
const STATE = {
  step: 0,
  question: '',
  category: '',
  categoryKey: '',
  lead: { name: '', email: '', phone: '' },
  shuffledDeck: [],
  selectedPositions: [],   // indices 0-21 of grid positions chosen by user
  drawnCards: [],          // [{cardIndex, orientation, position}]
  aiReading: null,         // AI response from backend, or null when local fallback used
  fullReadingText: ''
};

// Fisher-Yates shuffle
function shuffleDeck() {
  const deck = [...Array(22).keys()];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// 38% reversed probability
function getOrientation() {
  return Math.random() < 0.38 ? 'reversed' : 'upright';
}

// ============================================================
// CATEGORY CONTEXT FUNCTION
// ============================================================
function getCategoryContext(card, categoryKey, isReversed, position) {
  const maps = {
    relationship: [
      "In matters of the heart, this energy suggests that the emotional foundation between two people carries the weight of this card's truth, whether that is clarity, confusion, or unspoken longing.",
      "Within your relationship dynamic, this card speaks to the current current of connection, or the widening distance, between you and the one you hold in mind.",
      "For love and its complexities, this card's energy is a mirror: what you seek from another may first need to be found within yourself."
    ],
    marriage: [
      "For a union or commitment, this card speaks directly to the enduring bond, what has been vowed, and whether the daily reality honours that vow.",
      "In the context of long-term commitment, this energy signals something about the architecture of the relationship itself, its foundations, its tensions, or its unexpressed potential.",
      "For a partnership built to last, this card's lesson is not about the dramatic moment but the quiet, consistent choices that either deepen or erode the bond over time."
    ],
    career: [
      "In your professional path, this card points to the energy you are currently projecting into your work, and whether it aligns with the direction you truly wish to grow.",
      "For your career and ambitions, this energy suggests that something about how you have been approaching opportunity, or resistance, needs honest examination.",
      "In the sphere of vocation, this card is a prompt: is what you are building an expression of your truest capabilities, or a comfortable avoidance of a greater call?"
    ],
    business: [
      "From a business perspective, this card reflects the energetic state of your venture or financial situation, where momentum is present, and where it is being blocked.",
      "In terms of ventures and finance, this energy asks you to look clearly at the structures you are operating within, are they serving growth, or quietly constraining it?",
      "For commercial and financial matters, this card counsels awareness of timing: not all opportunities are equal, and not all hesitations are fear."
    ],
    family: [
      "Within your family dynamic, this card's presence illuminates an underlying pattern, perhaps one that has persisted across generations without being named.",
      "For your relatives and home life, this energy speaks of the invisible threads that connect and sometimes entangle those who share blood or history.",
      "In the context of family, this card asks: what role have you been cast in, and is it still the role you choose to play?"
    ],
    growth: [
      "On your spiritual and personal journey, this card's energy is a threshold, an invitation to move through something that has been standing between you and a fuller version of yourself.",
      "For your inner development, this card is asking you to sit with what is uncomfortable rather than resolve it prematurely. The discomfort is the teacher.",
      "On the path of becoming, this card signals that the work being asked of you is not outward, it is the quiet, courageous labour of self-inquiry."
    ],
    general: [
      "Across the broad canvas of your life, this card signals a pivotal energy, one that is touching more than one area, even if the question feels specific.",
      "In the general flow of your path, this card reflects the dominant current right now: what is moving, what is stalled, and what requires your attention.",
      "Within the larger arc of where you are headed, this card's message is one of awareness, see clearly what is at work in your life before the next move is made."
    ]
  };
  const arr = maps[categoryKey] || maps['general'];
  return arr[position % arr.length];
}

// ============================================================
// SYNTHESIS BUILDER
// ============================================================
function buildSynthesis(drawnCards, question, categoryKey, seekerName) {
  const c1 = MAJOR_ARCANA[drawnCards[0].cardIndex];
  const c2 = MAJOR_ARCANA[drawnCards[1].cardIndex];
  const c3 = MAJOR_ARCANA[drawnCards[2].cardIndex];
  const r1 = drawnCards[0].orientation === 'reversed';
  const r2 = drawnCards[1].orientation === 'reversed';
  const r3 = drawnCards[2].orientation === 'reversed';

  const prefix1 = r1 ? 'the shadowed energy of ' : 'the presence of ';
  const prefix2 = r2 ? 'the tension carried by ' : 'the living force of ';
  const prefix3 = r3 ? 'the cautionary note of ' : 'the promise held within ';

  const categoryClosings = {
    relationship: `The question you carry about love is not asking for a verdict, it is asking you to be honest about what you are willing to offer, endure, and release. That honesty is where the real answer lives.`,
    marriage: `Commitment, at its deepest, is not a single vow but a thousand daily choices. What these cards ask is not whether the bond is real, it is whether both people are choosing it, consciously and fully, in this present moment.`,
    career: `Your path professionally is not separate from your inner life, it is an expression of it. The cards do not promise a specific outcome; they promise that clarity of purpose, honestly pursued, always finds its form.`,
    business: `In matters of commerce and livelihood, awareness is the most valuable asset you possess. What these cards ask of you is not bolder action or greater caution, it is sharper discernment about what is truly in motion around you.`,
    family: `Family patterns are among the most ancient energies a person carries. What these cards illuminate is not blame but understanding, and understanding, honestly held, is the beginning of change.`,
    growth: `The inner work is never finished, and these cards do not ask you to reach some final shore. They ask only that you take the next honest step, the one that only you, in this moment, know is waiting for you.`,
    general: `Life rarely moves in the straight lines we plan. What these cards offer is not a map but a compass, and the direction it points is always toward your most honest, most courageous self.`
  };

  const closing = categoryClosings[categoryKey] || categoryClosings['general'];

  return `${seekerName}, the thread connecting ${prefix1}${c1.name}, ${prefix2}${c2.name}, and ${prefix3}${c3.name} tells a story that speaks directly to what you have asked. The foundation reveals where this moment finds its roots, what energy, whether conscious or not, set this situation in motion. The heart of the matter asks you to sit with what is real right now, without flinching away from its full weight. And what lies on the horizon is not a fixed fate, it is the most probable expression of the trajectory you are currently on, which means it remains, in meaningful ways, in your hands. ${closing}`;
}

// ============================================================
// GENERATE READING
// ============================================================
function generateReading(drawnCards, question, category, categoryKey, seekerName) {
  const positions = [
    "CARD 1, THE FOUNDATION (Root of the Matter)",
    "CARD 2, THE HEART (Present Energy)",
    "CARD 3, THE HORIZON (Probable Outcome)"
  ];

  let html = `<div class="reading-container">`;
  html += `<p class="reading-intro">✦ ${seekerName}, the three cards that have come forward carry a unified message. Read each layer carefully, they speak together, not separately.</p>`;

  drawnCards.forEach((draw, index) => {
    const card = MAJOR_ARCANA[draw.cardIndex];
    const isReversed = draw.orientation === 'reversed';
    const essence = isReversed ? card.reversed_essence : card.upright_essence;
    const keywords = isReversed ? card.keywords_reversed : card.keywords_upright;
    const context = getCategoryContext(card, categoryKey, isReversed, index);
    const orientationLabel = isReversed
      ? '<span class="orientation-reversed">🔻 Reversed</span>'
      : '<span class="orientation-upright">⬆️ Upright</span>';
    const orientClass = isReversed ? 'reversed' : 'upright';

    html += `
      <div class="reading-card-block">
        <div class="reading-card-head">
          <img class="reading-card-thumb${isReversed ? ' reversed' : ''}" src="${cardImage(card)}" alt="${card.name}" loading="lazy" onerror="this.remove()">
          <div class="reading-card-headtext">
            <h3>✦ ${positions[index]}</h3>
            <h4>${card.name} ${card.number}, <span class="${orientClass}">${isReversed ? '🔻 Reversed' : '⬆️ Upright'}</span></h4>
            <p class="keywords-chips">${keywords.map(k => `<span class="kw-chip">${k}</span>`).join('')}</p>
          </div>
        </div>
        <p class="card-essence">${essence}</p>
        <p class="card-context">${context}</p>
      </div>`;
  });

  html += `
    <div class="synthesis">
      <h3>✦ THE SYNTHESIS, Reading Your Complete Journey</h3>
      <p>${buildSynthesis(drawnCards, question, categoryKey, seekerName)}</p>
    </div>
    <div class="reading-extra reading-extra-advice">
      <h3>✦ Guidance</h3>
      <p>Sit with what each card has stirred rather than rushing to resolve it. The cards illuminate a direction, but the next honest step is yours to choose.</p>
    </div>
    <div class="reading-extra reading-extra-affirmation">
      <h3>✦ Affirmation</h3>
      <p>I can meet what is true with honesty, and I hold the agency to shape what comes next.</p>
    </div>
  </div>`;

  return html;
}

// ============================================================
// DOM HELPERS
// ============================================================
const messagesEl = document.getElementById('chatMessages');
const inputAreaEl = document.getElementById('chatInputArea');

function addMessage(html, type = 'oracle', delay = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      const wrap = document.createElement('div');
      if (type === 'oracle') {
        wrap.className = 'msg-oracle-wrap';
        wrap.innerHTML = `<div class="oracle-dot" aria-hidden="true">✦</div><div class="msg msg-oracle">${html}</div>`;
      } else if (type === 'system') {
        wrap.className = 'msg msg-system';
        wrap.innerHTML = html;
      } else if (type === 'user') {
        wrap.className = 'msg msg-user';
        wrap.innerHTML = html;
      } else if (type === 'raw') {
        wrap.innerHTML = html;
      }
      messagesEl.appendChild(wrap);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      resolve();
    }, delay);
  });
}

function showTyping() {
  const wrap = document.createElement('div');
  wrap.className = 'msg-oracle-wrap';
  wrap.id = 'typing-indicator';
  wrap.innerHTML = `<div class="oracle-dot" aria-hidden="true">✦</div><div class="msg msg-oracle"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
  messagesEl.appendChild(wrap);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function clearInput() {
  inputAreaEl.innerHTML = '';
}

function scrollToBottom() {
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// ============================================================
// STEP RENDERERS
// ============================================================

// STEP 0, WELCOME
async function renderStep0() {
  STATE.step = 0;
  clearInput();
  showTyping();
  await delay(900);
  hideTyping();
  await addMessage(`
    <p style="font-family:var(--font-heading);font-size:var(--text-lg);color:var(--accent-gold-glow);margin-bottom:var(--space-3);">Welcome, Seeker.</p>
    <p>I am the Oracle of the Major Arcana, keeper of the 22 sacred archetypes that have mapped the human journey for centuries in the Rider-Waite tradition.</p>
    <p style="margin-top:var(--space-3);">What you carry here, your questions, your fears, your quiet hopes, will be met with honesty, not false comfort. The cards do not lie; nor do they condemn. They illuminate.</p>
    <p style="margin-top:var(--space-3);font-style:italic;color:var(--text-muted);">Before we begin: are you ready to hear what the cards may reveal?</p>
  `);
  inputAreaEl.innerHTML = `
    <div class="btn-wrap" style="justify-content:center">
      <button class="btn btn-primary" onclick="startReading()" aria-label="Begin your tarot reading">
        Begin My Reading →
      </button>
    </div>`;
}

function startReading() {
  addMessage('I am ready.', 'user');
  STATE.step = 1;
  setTimeout(renderStep1, 600);
}

// STEP 1, QUESTION COLLECTION
async function renderStep1() {
  clearInput();
  showTyping();
  await delay(800);
  hideTyping();
  await addMessage(`
    <p>The cards listen deeply. Speak your question fully, hold nothing back.</p>
    <p style="margin-top:var(--space-3);font-style:italic;color:var(--text-muted);">What weighs on your heart or mind right now?</p>
  `);
  inputAreaEl.innerHTML = `
    <div class="oracle-form">
      <div class="form-group">
        <label class="form-label" for="questionInput">Your Question</label>
        <textarea class="form-input" id="questionInput" rows="3" placeholder="Write your question here... speak freely..." aria-describedby="questionError"></textarea>
        <span class="form-error" id="questionError" role="alert">Please speak your question fully, at least three words.</span>
      </div>
      <button class="btn btn-primary" onclick="submitQuestion()" style="align-self:flex-start" aria-label="Submit your question">
        The Cards Have Heard Me.
      </button>
    </div>`;
  document.getElementById('questionInput').focus();
}

function submitQuestion() {
  const input = document.getElementById('questionInput');
  const error = document.getElementById('questionError');
  const val = input.value.trim();
  const wordCount = val.split(/\s+/).filter(w => w.length > 0).length;

  if (!val || wordCount < 3) {
    error.classList.add('visible');
    input.focus();
    return;
  }
  error.classList.remove('visible');
  STATE.question = val;
  addMessage(val.length > 120 ? val.substring(0, 120) + '…' : val, 'user');
  STATE.step = 2;
  setTimeout(renderStep2, 700);
}

// Category labels mirror the backend, used for display + offline fallback.
const CATEGORY_LABELS = {
  relationship: 'Relationships & Love',
  marriage: 'Marriage & Commitment',
  career: 'Career & Job',
  business: 'Business & Finance',
  family: 'Family & Relatives',
  growth: 'Personal Growth & Spirituality',
  general: 'General Life Guidance'
};

// STEP 2, CATEGORY SELECTION (the oracle suggests an area, the seeker confirms/changes)
async function renderStep2() {
  clearInput();
  showTyping();
  await delay(800);
  hideTyping();

  const suggested = deduceCategoryKeyLocal(STATE.question);
  await addMessage(`
    <p>Which domain of life does this question touch? Reading the threads of your words, this feels like a question of <strong style="color:var(--accent-gold)">${CATEGORY_LABELS[suggested]}</strong>.</p>
    <p style="margin-top:var(--space-3);font-style:italic;color:var(--text-muted);">Confirm the highlighted area, or choose another if it resonates more deeply.</p>
  `);

  const categories = [
    { label: '💕 Relationships & Love', key: 'relationship' },
    { label: '💍 Marriage & Commitment', key: 'marriage' },
    { label: '💼 Career & Job', key: 'career' },
    { label: '🏢 Business & Finance', key: 'business' },
    { label: '👨‍👩‍👧 Family & Relatives', key: 'family' },
    { label: '🌱 Personal Growth & Spirituality', key: 'growth' },
    { label: '🌐 General Life Guidance', key: 'general' }
  ];

  inputAreaEl.innerHTML = `
    <div class="category-pills" role="group" aria-label="Select a category">
      ${categories.map(c => `<button class="cat-pill${c.key === suggested ? ' suggested' : ''}" onclick="selectCategory('${c.label}','${c.key}')" aria-label="Select ${c.label}"${c.key === suggested ? ' aria-pressed="true"' : ''}>${c.label}</button>`).join('')}
    </div>`;
}

function selectCategory(label, key) {
  STATE.category = label;
  STATE.categoryKey = key;
  addMessage(label, 'user');
  STATE.step = 3;
  setTimeout(renderStep3, 700);
}

// Lightweight keyword deducer for the offline fallback (backend does the smart one).
function deduceCategoryKeyLocal(question) {
  const q = (question || '').toLowerCase();
  const rules = [
    ['marriage', ['marry', 'marriage', 'married', 'husband', 'wife', 'spouse', 'wedding', 'engaged', 'divorce']],
    ['relationship', ['relationship', 'partner', 'boyfriend', 'girlfriend', 'love', 'dating', 'breakup', 'break up', 'crush', 'romance']],
    ['career', ['job', 'career', 'promotion', 'boss', 'work', 'interview', 'resign', 'fired', 'role', 'manager', 'salary', 'raise']],
    ['business', ['business', 'startup', 'invest', 'investment', 'money', 'finance', 'financial', 'client', 'sales', 'venture', 'loan', 'profit']],
    ['family', ['mother', 'father', 'mom', 'dad', 'sister', 'brother', 'family', 'parents', 'son', 'daughter', 'relative', 'sibling']],
    ['growth', ['myself', 'purpose', 'spiritual', 'growth', 'anxiety', 'healing', 'meaning', 'confidence', 'identity']]
  ];
  for (const [key, kws] of rules) {
    if (kws.some(k => q.includes(k))) return key;
  }
  return 'general';
}

// STEP 3, LEAD CAPTURE
async function renderStep3() {
  clearInput();
  showTyping();
  await delay(1000);
  hideTyping();
  await addMessage(`
    <p>Before the veil is lifted, I need to know who seeks this wisdom.</p>
    <p style="margin-top:var(--space-3);font-style:italic;color:var(--text-muted);">Your reading will be held in sacred confidence.</p>
  `);

  inputAreaEl.innerHTML = `
    <form class="oracle-form" id="leadForm" onsubmit="submitLead(event)" novalidate>
      <div class="form-group">
        <label class="form-label" for="nameInput">Full Name</label>
        <input class="form-input" type="text" id="nameInput" placeholder="Your full name" autocomplete="name" aria-describedby="nameError" required>
        <span class="form-error" id="nameError" role="alert">Please enter your name (at least 2 characters).</span>
      </div>
      <div class="form-group">
        <label class="form-label" for="emailInput">Email Address</label>
        <input class="form-input" type="email" id="emailInput" placeholder="you@example.com" autocomplete="email" aria-describedby="emailError" required>
        <span class="form-error" id="emailError" role="alert">Please enter a valid email address.</span>
      </div>
      <div class="form-group">
        <label class="form-label" for="phoneInput">Phone Number</label>
        <input class="form-input" type="tel" id="phoneInput" placeholder="10-digit phone number" autocomplete="tel" aria-describedby="phoneError" required inputmode="numeric">
        <span class="form-error" id="phoneError" role="alert">Please enter a valid phone number (minimum 10 digits).</span>
      </div>
      <button type="submit" class="btn btn-primary" style="align-self:flex-start" aria-label="Reveal your destiny">
        Reveal My Destiny
      </button>
    </form>`;
  document.getElementById('nameInput').focus();
}

function submitLead(e) {
  e.preventDefault();
  const name = document.getElementById('nameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();
  const phone = document.getElementById('phoneInput').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneDigits = phone.replace(/\D/g,'');

  let valid = true;

  const nameError = document.getElementById('nameError');
  if (name.length < 2) { nameError.classList.add('visible'); valid = false; }
  else nameError.classList.remove('visible');

  const emailError = document.getElementById('emailError');
  if (!emailRegex.test(email)) { emailError.classList.add('visible'); valid = false; }
  else emailError.classList.remove('visible');

  const phoneError = document.getElementById('phoneError');
  if (phoneDigits.length < 10) { phoneError.classList.add('visible'); valid = false; }
  else phoneError.classList.remove('visible');

  if (!valid) return;

  STATE.lead = { name, email, phone };
  const firstName = name.split(' ')[0];

  clearInput();
  addMessage(`<em>Your essence has been noted, ${firstName}. The cards are now being summoned...</em>`, 'oracle');

  STATE.step = 4;
  STATE.shuffledDeck = shuffleDeck();

  setTimeout(renderStep4, 1800);
}

// STEP 4, CARD SELECTION
async function renderStep4() {
  clearInput();
  showTyping();
  await delay(1000);
  hideTyping();
  await addMessage(`
    <p>From the 22 sacred cards of the Major Arcana, you must choose <strong style="color:var(--accent-gold)">3</strong>.</p>
    <p style="margin-top:var(--space-3);">Trust your instincts, do not think. Let your hand be guided. Which cards call to you?</p>
  `);

  renderCardGrid();
}

function renderCardGrid() {
  STATE.selectedPositions = [];
  inputAreaEl.innerHTML = `
    <div class="card-selection-area">
      <p class="card-counter" id="cardCounter" aria-live="polite">0 of 3 chosen</p>
      <div class="card-grid" id="cardGrid" role="group" aria-label="22 face-down tarot cards, choose 3">
        ${Array.from({length:22}, (_, i) => `
          <div>
            <div class="tarot-card-back" id="card-pos-${i}" onclick="selectCard(${i})" role="button" tabindex="0" aria-label="Card ${i+1}" onkeydown="if(event.key==='Enter'||event.key===' ')selectCard(${i})">
              <span class="card-number">${i+1}</span>
            </div>
          </div>
        `).join('')}
        <div><div class="card-grid-placeholder" aria-hidden="true"></div></div>
      </div>
      <div id="fatesBtn" style="display:none;margin-top:var(--space-4);text-align:center">
        <button class="btn btn-primary" onclick="confirmCards()" aria-label="Confirm your 3 chosen cards">
          The Fates Are Set ✦
        </button>
      </div>
    </div>`;
}

function selectCard(posIndex) {
  const el = document.getElementById(`card-pos-${posIndex}`);
  if (!el) return;
  const alreadySelected = STATE.selectedPositions.includes(posIndex);

  if (alreadySelected) {
    // Toggle OFF — deselect this card.
    STATE.selectedPositions = STATE.selectedPositions.filter(p => p !== posIndex);
    el.classList.remove('selected');
    el.removeAttribute('aria-pressed');
  } else {
    if (STATE.selectedPositions.length >= 3) return; // can't pick a 4th
    STATE.selectedPositions.push(posIndex);
    el.classList.add('selected');
    el.setAttribute('aria-pressed', 'true');
  }

  refreshCardGridState();
}

// Reflect the current selection: counter, enabled/disabled cards, Fates button.
function refreshCardGridState() {
  const count = STATE.selectedPositions.length;
  document.getElementById('cardCounter').textContent = `${count} of 3 chosen`;

  const full = count === 3;
  for (let i = 0; i < 22; i++) {
    const card = document.getElementById(`card-pos-${i}`);
    if (!card) continue;
    const isSelected = STATE.selectedPositions.includes(i);
    // Disable only the UNSELECTED cards once 3 are chosen; otherwise all clickable.
    if (full && !isSelected) {
      card.classList.add('disabled');
      card.setAttribute('tabindex', '-1');
      card.setAttribute('aria-disabled', 'true');
    } else {
      card.classList.remove('disabled');
      card.setAttribute('tabindex', '0');
      card.removeAttribute('aria-disabled');
    }
  }
  document.getElementById('fatesBtn').style.display = full ? 'block' : 'none';
}

function confirmCards() {
  // Map user's picked grid positions to shuffled deck
  STATE.drawnCards = STATE.selectedPositions.map((posIndex, i) => ({
    cardIndex: STATE.shuffledDeck[posIndex],
    orientation: getOrientation(),
    position: ['past', 'present', 'future'][i]
  }));

  addMessage('The Fates Are Set, I have chosen my three cards.', 'user');
  STATE.step = 5;
  setTimeout(renderStep5, 800);
}

// Path to a card's public-domain Rider-Waite-Smith art (by id, 00..21).
function cardImage(card) {
  return `assets/cards/${String(card.id).padStart(2, '0')}.jpg`;
}

// STEP 5, CARD REVEAL
async function renderStep5() {
  clearInput();
  showTyping();
  await delay(800);
  hideTyping();
  await addMessage('The veil is lifting. Watch as your three cards reveal themselves...');

  const positionNames = ['THE FOUNDATION (Past)', 'THE HEART (Present)', 'THE HORIZON (Future)'];
  const revealContainer = document.createElement('div');
  revealContainer.className = 'msg-oracle-wrap';
  revealContainer.innerHTML = `<div class="oracle-dot" aria-hidden="true">✦</div><div class="msg msg-oracle"><div class="reveal-row" id="revealRow"></div></div>`;
  messagesEl.appendChild(revealContainer);

  const revealRow = document.getElementById('revealRow');

  for (let i = 0; i < 3; i++) {
    await delay(i === 0 ? 400 : 1400);
    const draw = STATE.drawnCards[i];
    const card = MAJOR_ARCANA[draw.cardIndex];
    const isReversed = draw.orientation === 'reversed';

    const wrapDiv = document.createElement('div');
    wrapDiv.className = 'reveal-card-wrap';
    wrapDiv.style.animationDelay = '0s';
    wrapDiv.innerHTML = `
      <div class="card-flip-container" aria-label="${card.name}">
        <div class="card-flip-inner" id="flip-${i}">
          <div class="card-back-face" aria-hidden="true">✦</div>
          <div class="card-face has-art">
            <img class="card-face-img${isReversed ? ' reversed' : ''}" src="${cardImage(card)}" alt="${card.name}" loading="lazy"
                 onerror="this.closest('.card-face').classList.add('art-failed'); this.remove()">
            <div class="card-face-symbol" aria-hidden="true">${card.symbol}</div>
            <div class="card-face-name">${card.name}</div>
            <div class="card-face-number">${card.number}</div>
          </div>
        </div>
      </div>
      <div class="reveal-card-info">
        <p class="reveal-card-position">${positionNames[i]}</p>
        <p class="reveal-card-name">${card.name}</p>
        <span class="reveal-card-orientation ${isReversed ? 'orientation-reversed' : 'orientation-upright'}">${isReversed ? '🔻 Reversed' : '⬆️ Upright'}</span>
        <p class="reveal-card-essence" style="margin-top:var(--space-2)">${isReversed ? card.reversed_essence : card.upright_essence}</p>
      </div>`;
    revealRow.appendChild(wrapDiv);
    scrollToBottom();

    // Trigger flip after a brief pause
    await delay(300);
    document.getElementById(`flip-${i}`).classList.add('flipped');
    scrollToBottom();
  }

  await delay(1800);
  await addMessage(`<em>The three cards have spoken. Now I shall read their counsel together...</em>`, 'system');
  STATE.step = 6;
  setTimeout(renderStep6, 1600);
}

// STEP 6, FULL READING DELIVERY (AI-powered, with graceful local fallback)
async function renderStep6() {
  clearInput();
  showTyping();

  const firstName = STATE.lead.name.split(' ')[0];
  let readingHtml = null;

  // Try the AI backend first; fall back to the local generator if it fails.
  try {
    const aiReading = await fetchAIReading();
    if (aiReading && aiReading.status === 'success' && Array.isArray(aiReading.cards) && aiReading.cards.length) {
      STATE.aiReading = aiReading;
      // Record the domain the backend deduced (for the emailed copy).
      STATE.categoryKey = aiReading.category || STATE.categoryKey;
      STATE.category = aiReading.category_label || CATEGORY_LABELS[STATE.categoryKey] || '';
      readingHtml = renderAIReading(aiReading, firstName);
    }
  } catch (err) {
    console.warn('AI reading unavailable, using local fallback:', err);
  }

  if (!readingHtml) {
    STATE.aiReading = null;
    // Deduce the domain locally for the offline fallback generator.
    STATE.categoryKey = deduceCategoryKeyLocal(STATE.question);
    STATE.category = CATEGORY_LABELS[STATE.categoryKey] || '';
    readingHtml = generateReading(STATE.drawnCards, STATE.question, STATE.category, STATE.categoryKey, firstName);
  }

  hideTyping();

  // Build plain text version for mailto
  STATE.fullReadingText = buildReadingPlainText();

  const wrap = document.createElement('div');
  wrap.className = 'msg-oracle-wrap';
  wrap.innerHTML = `<div class="oracle-dot" aria-hidden="true">✦</div><div class="msg msg-oracle" style="max-width:100%;width:100%">${readingHtml}</div>`;
  messagesEl.appendChild(wrap);
  scrollToBottom();

  STATE.step = 7;
  setTimeout(renderStep7, 1200);
}

// Call the backend AI tarot endpoint with the three drawn cards.
async function fetchAIReading() {
  const base = (window.TAROT_API_BASE || '').replace(/\/$/, '');
  if (!base) return null;

  const payload = {
    question: STATE.question,
    category: STATE.categoryKey,   // the area the seeker confirmed/chose
    seekerName: STATE.lead.name,
    cards: STATE.drawnCards.map(d => ({
      name: MAJOR_ARCANA[d.cardIndex].name,
      orientation: d.orientation,
      position: d.position
    }))
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), (window.TAROT_API_TIMEOUT_MS || 50000));
  try {
    const res = await fetch(`${base}/v1/public/tarot/reading`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    if (!res.ok) return null;
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

// Render the AI response into the existing reading CSS structure.
function renderAIReading(aiReading, seekerName) {
  let html = `<div class="reading-container">`;
  html += `<p class="reading-intro">✦ ${esc(seekerName)}, the three cards that have come forward carry a unified message. Read each layer carefully, they speak together, not separately.</p>`;

  aiReading.cards.forEach((c, index) => {
    const draw = STATE.drawnCards[index];
    const card = draw ? MAJOR_ARCANA[draw.cardIndex] : null;
    const isReversed = (c.orientation || '').toLowerCase() === 'reversed';
    // Prefer the server-provided keywords; fall back to local card data.
    const keywords = (c.keywords && c.keywords.length)
      ? c.keywords
      : (card ? (isReversed ? card.keywords_reversed : card.keywords_upright) : []);
    const orientClass = isReversed ? 'reversed' : 'upright';
    const number = card ? card.number : '';
    const imgSrc = card ? cardImage(card) : '';

    html += `
      <div class="reading-card-block">
        <div class="reading-card-head">
          ${card ? `<img class="reading-card-thumb${isReversed ? ' reversed' : ''}" src="${imgSrc}" alt="${esc(c.name)}" loading="lazy" onerror="this.remove()">` : ''}
          <div class="reading-card-headtext">
            <h3>✦ CARD ${index + 1}, ${esc(c.position || '')}</h3>
            <h4>${esc(card ? card.name : c.name)} ${number}, <span class="${orientClass}">${isReversed ? '🔻 Reversed' : '⬆️ Upright'}</span></h4>
            ${keywords.length ? `<p class="keywords-chips">${keywords.map(k => `<span class="kw-chip">${esc(k)}</span>`).join('')}</p>` : ''}
            ${c.correspondence ? `<p class="card-correspondence">✦ ${esc(c.correspondence)}</p>` : ''}
          </div>
        </div>
        <p class="card-essence">${esc(c.interpretation || '')}</p>
      </div>`;
  });

  html += `
    <div class="synthesis">
      <h3>✦ THE SYNTHESIS, Reading Your Complete Journey</h3>
      <p>${esc(aiReading.synthesis || '')}</p>
    </div>`;

  const extras = [
    ['Guidance', aiReading.advice, 'advice'],
    ['A Question to Sit With', aiReading.reflection_question, 'reflection'],
    ['Affirmation', aiReading.affirmation, 'affirmation'],
    ['Timing', aiReading.timing, 'timing']
  ].filter(([, val]) => val && String(val).trim());

  extras.forEach(([title, val, cls]) => {
    html += `
      <div class="reading-extra reading-extra-${cls}">
        <h3>✦ ${title}</h3>
        <p>${esc(val)}</p>
      </div>`;
  });

  html += `</div>`;
  return html;
}

// Minimal HTML escaping for model-generated text.
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildReadingPlainText() {
  const positions = ['THE FOUNDATION (Root of the Matter)', 'THE HEART (Present Energy)', 'THE HORIZON (Probable Outcome)'];
  let text = `TAROT ORACLE, Your Major Arcana Reading\n`;
  text += `Seeker: ${STATE.lead.name}\n`;
  text += `Question: "${STATE.question}"\n`;
  text += `Category: ${STATE.category}\n\n`;
  text += `${'='.repeat(50)}\n\n`;

  const ai = STATE.aiReading;
  STATE.drawnCards.forEach((draw, i) => {
    const card = MAJOR_ARCANA[draw.cardIndex];
    const isReversed = draw.orientation === 'reversed';
    text += `✦ CARD ${i+1}, ${positions[i]}\n`;
    text += `${card.name} ${card.number}, ${isReversed ? 'Reversed' : 'Upright'}\n`;
    text += `Themes: ${(isReversed ? card.keywords_reversed : card.keywords_upright).join(' · ')}\n`;
    // Prefer the AI interpretation when available; otherwise use local essence + context.
    if (ai && ai.cards && ai.cards[i] && ai.cards[i].interpretation) {
      text += `${ai.cards[i].interpretation}\n\n`;
    } else {
      text += `${isReversed ? card.reversed_essence : card.upright_essence}\n`;
      text += `${getCategoryContext(card, STATE.categoryKey, isReversed, i)}\n\n`;
    }
  });

  text += `✦ THE SYNTHESIS\n`;
  text += (ai && ai.synthesis)
    ? ai.synthesis
    : buildSynthesis(STATE.drawnCards, STATE.question, STATE.categoryKey, STATE.lead.name.split(' ')[0]);
  text += `\n`;

  if (ai) {
    if (ai.advice) text += `\n✦ GUIDANCE\n${ai.advice}\n`;
    if (ai.reflection_question) text += `\n✦ A QUESTION TO SIT WITH\n${ai.reflection_question}\n`;
    if (ai.affirmation) text += `\n✦ AFFIRMATION\n${ai.affirmation}\n`;
    if (ai.timing) text += `\n✦ TIMING\n${ai.timing}\n`;
  }

  text += `\n${'='.repeat(50)}\n`;
  text += `Reading delivered by the Tarot Oracle, Major Arcana, Rider-Waite tradition.`;
  return text;
}

// STEP 7, CLOSING + CTA
async function renderStep7() {
  clearInput();
  showTyping();
  await delay(1000);
  hideTyping();

  const firstName = STATE.lead.name.split(' ')[0];
  await addMessage(`
    <p style="font-family:var(--font-heading);color:var(--accent-gold-glow);margin-bottom:var(--space-3);">The reading is complete, ${firstName}.</p>
    <p>The oracle has offered what the cards chose to reveal. What you do with these reflections, how you hold them, question them, and move with or against them, is entirely your own sacred work.</p>
    <p style="margin-top:var(--space-3);font-style:italic;color:var(--text-muted);">May the light you have glimpsed here serve you well.</p>
    <div class="mystical-divider"><span>✦</span></div>
    <p style="font-size:var(--text-sm);color:var(--text-muted);">Would you like to ask another question, or receive your reading by email?</p>
  `);

  const mailSubject = encodeURIComponent(`My Tarot Reading, ${STATE.category}`);
  const mailBody = encodeURIComponent(STATE.fullReadingText);
  const mailHref = `mailto:${STATE.lead.email}?subject=${mailSubject}&body=${mailBody}`;

  inputAreaEl.innerHTML = `
    <div class="btn-wrap">
      <button class="btn btn-primary" onclick="resetReading()" aria-label="Ask another question and start a new reading">
        🔄 Ask Another Question
      </button>
      <a href="${mailHref}" class="btn btn-secondary" aria-label="Email yourself a copy of your reading" target="_blank" rel="noopener">
        📧 Email Me My Reading
      </a>
    </div>`;
}

// RESET (retain lead data)
function resetReading() {
  const savedLead = { ...STATE.lead };
  STATE.step = 0;
  STATE.question = '';
  STATE.category = '';
  STATE.categoryKey = '';
  STATE.shuffledDeck = [];
  STATE.selectedPositions = [];
  STATE.drawnCards = [];
  STATE.aiReading = null;
  STATE.fullReadingText = '';
  STATE.lead = savedLead;

  messagesEl.innerHTML = '';
  clearInput();

  // Go directly to step 1 since we have lead data
  addMessage(`<em>Welcome back, ${savedLead.name.split(' ')[0]}. The cards are ready for another question.</em>`, 'system');
  setTimeout(renderStep1, 800);
}

// Utility: delay promise
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderStep0();
});
