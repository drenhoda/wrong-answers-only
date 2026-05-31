# Wrong Answers Only 🚫✅

A quiz game where **every answer is wrong** — that's the whole joke. Pick a topic, get a real question, choose from four plausible-but-incorrect answers, and enjoy a witty explanation of why your pick was wrong. (They all were.)

**Live demo:** https://drenhoda.github.io/wrong-answers-only/

---

## What it does

- User enters any topic (or picks a quick chip: History, Dinosaurs, Cooking, etc.)
- Claude generates a genuine factual question with **four deliberately wrong answers**
- No correct answer exists — the prompt enforces this
- After picking, a witty explanation appears mocking your choice (and confirming all options were wrong)
- Score + streak counter stored in `localStorage`

---

## How to run

### Option 1 — Replit
1. Fork the Repl at `[your-replit-url]`
2. Click **Run** — it opens a static HTML page, no build step needed

### Option 2 — Local
```bash
git clone https://github.com/yourusername/wrong-answers-only
cd wrong-answers-only
# Open index.html in your browser — no server required
open index.html
```

That's it. Zero dependencies, zero build step, one HTML file.

---

## Architecture

Entirely client-side — a single `index.html` file that calls the Anthropic API directly from the browser. No backend, no build pipeline.

| Part | Decision |
|---|---|
| LLM | Claude Sonnet (`claude-sonnet-4-20250514`) via `fetch()` |
| UI | Vanilla HTML/CSS/JS — no framework |
| Persistence | `localStorage` for score/streak |
| Hosting | Replit static page |

---

## The prompt (and what I tried first)

### Final prompt

```
You are the host of "Wrong Answers Only" — a hilarious quiz game where EVERY answer is deliberately incorrect. There is NO correct answer; all four choices must be factually wrong.

Generate a quiz question about: ${topic}

Rules:
1. Ask a genuine factual question about the topic (something that has a real, well-known correct answer)
2. Provide EXACTLY 4 answers that are ALL wrong — the real correct answer must NOT appear
3. Make the wrong answers plausible-sounding, funny, or absurd — but factually incorrect
4. For each answer, write a witty 1-2 sentence explanation of why THAT specific answer is wrong
5. The explanation should be funny, reference the chosen answer, and remind the player all answers were wrong

Respond ONLY with valid JSON, no markdown fences, no extra text:
{
  "question": "string",
  "answers": ["wrong answer 1", "wrong answer 2", "wrong answer 3", "wrong answer 4"],
  "explanations": [
    "witty explanation for why answer[0] is wrong",
    ...
  ]
}
```

### What I tried first

My first attempt asked for "four funny wrong answers" without the explicit constraint that the correct answer must not appear. Claude kept sneaking in one real answer to be "helpful." Adding `the real correct answer must NOT appear` and `There is NO correct answer` to the rules fixed this.

I also initially asked for a single `explanation` field. Changing it to a per-answer `explanations` array let me show the specific explanation for whichever answer the user picked, which made the roast feel more personal.

---

## Thoughtful touches

- **Loading messages rotate** while the API call is in flight ("Consulting the Bureau of Wrong Facts...", "Fabricating plausible nonsense...")
- **Error state** is handled gracefully — network failures show a friendly message with a retry button
- **Quick-topic chips** let you jump in without typing
- **Dark mode** support via `prefers-color-scheme`
- **Streak counter** with 🔥 emoji at 3+ in a row (stored in localStorage)
- **Enter key** submits the topic input

---

## What I'd do with more time

1. **Leaderboard** — store top streaks to a small Replit DB or Supabase so scores persist across sessions and users can compete
2. **Difficulty picker** — easy (obvious wrong answers) vs hard (subtly wrong, plausible-sounding)
3. **Share button** — generate a shareable card image of the question + your pick for Twitter/WhatsApp
4. **Categories page** — pre-curated topic packs (Science, Pop Culture, Geography) so users don't need to think of a topic
5. **Sound effects** — a sad trombone for wrong picks (they're all wrong, so always sad trombone)

---

## Prompts used during development (Claude Code / Replit Agent)

```
Build a single-file HTML quiz game called "Wrong Answers Only".
The user picks a topic, clicks Generate, and the Anthropic API returns 
a question with four plausible-but-wrong multiple choice answers. 
No correct answer exists. After picking, show a witty explanation. 
Include a score+streak counter in localStorage. 
Use clean modern CSS with a red accent color, dark mode support, 
Syne font from Google Fonts, and no external JS dependencies.
```

---

## What surprised me

The model was surprisingly good at generating wrong answers that *felt* right — not random nonsense, but plausible-sounding incorrect facts. The hardest part of the prompt was preventing Claude from "helpfully" including the real answer. The explicit `There is NO correct answer` constraint in the system prompt was the key unlock.
