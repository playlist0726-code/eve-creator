# CODEX MISSION BRIEF — help E.V.E Creator win OpenAI Build Week

> Codex: read this whole file, then execute the mission in §4. Work autonomously, verify
> meticulously, and keep the test suite green. Everything here is context you can trust
> except where it says "verify" — then actually verify.

---

## 0. How to use this brief
- Do research → gap analysis → self-audit → implement the safe high-value fixes → re-verify.
- Save all research as new Markdown files under `research/` with real source URLs.
- Never break: the 111-ID citation allowlist, English-only UI, `npm test` (6 suites), and the
  "no invented contest facts" rule. If unsure, propose instead of changing.
- Capture your `/feedback` session ID for the Devpost submission.

## 1. The vision
**E.V.E Creator** is a **learning platform for people who never studied film** but want to
make or understand AI film and AI art. Bring an idea → an AI film crew designs the story,
shots, and prompts **and teaches you why every choice works**, grounded in frame-level
analysis of master animation. Then the human generates the film themselves and keeps
authorship. Contest **track: Education**.

Three audiences:
1. **AI-video beginners** — want to make something but don't know how; need idea→plan→prompts.
2. **Kids & art learners** — a playground to create and learn craft by playing.
3. **Film / media students** — fill CG/VFX gaps they can't shoot, and learn the AI toolchain.

## 2. Current state (what's already built)
Static HTML/CSS/vanilla JS (no build step) + Vercel serverless (GPT-5.6, Responses API,
strict structured output). Global top nav: **Home · Create · Learn · AI Tools · Detector ·
Community**.
- **Create** pipeline: Intake → Concept Lab (grounded five-act blueprint) → **The Creator's
  Room** (5-role AI crew critiques, fixes, re-scores — the differentiator) → Shot Design →
  Storyboard.
- **Learn (Film School)**: searchable 111-term craft library.
- **AI Tools**: 2026 model routing guide (from `knowledge/ai_toolchain.json`).
- **Detector**: interactive AI-media-literacy checklist.
- **Community**: showcase of the reference build + the 25-vs-10 grounding evidence.
- Grounding: `knowledge/` (7 JSON), `lib/craft-knowledge.js` (111-ID allowlist),
  `js/eve-glossary.js` (all 111 defined in plain language).
- Tests: `tests/` (6 suites), CI in `.github/workflows/ci.yml`.
- Docs: `README.md`, `SUBMISSION.md`, `ARCHITECTURE.md`.

## 3. The contest (verify current details at https://openai.devpost.com/)
- Build **with Codex** using **GPT-5.6**. Deadline **Tue Jul 21, 5:00 PM PT**.
- Tracks: Apps for Your Life · Work & Productivity · Developer Tools · **Education (ours)**.
- **Judging criteria (4):**
  1. **Technological Implementation** — how thoroughly/skillfully it uses **Codex**; real,
     non-trivial working code.
  2. **Design** — a complete, coherent *product* experience, not a proof of concept.
  3. **Potential Impact** — a credible, specific real problem + audience it actually helps.
  4. **Quality of the Idea** — creative, novel, different from existing concepts.
- Judges: 4 product leaders + 1 technical (Peter Steinberger). → **Design polish and Codex
  depth carry the most weight.**
- Deliverables: working project, category, description, **public YouTube demo < 3 min whose
  audio explains how Codex AND GPT-5.6 were used**, public repo + README, and the **Codex
  `/feedback` session ID**.

## 4. YOUR MISSION (execute in order)

### A. Research the real pain points (save to `research/ai_pain_points.md`)
Search the web for what people actually struggle with in **AI art and AI filmmaking**, for
each of our three audiences. Look at Reddit (r/aivideo, r/StableDiffusion, r/filmmakers,
r/animation), YouTube tutorial comments, Discord/forum threads, blog posts, and news.
Gather concrete, recurring pains — e.g. character/consistency across shots, prompt literacy,
"where do I even start," tool overload, temporal flicker, ethics/authorship, cost, learning
curve, no feedback on whether their idea is any good. Cite every claim with a real URL.
Rank pains by frequency × severity.

### B. Gap analysis (append to the same file)
For each top pain, state whether E.V.E already addresses it, partially, or not at all — and
where in the product. Produce a short prioritized list of **gaps we should close**.

### C. Competitive scan (save to `research/competitive_scan.md`)
Find comparable tools (AI story/storyboard generators, LTX/Runway workflows, film-education
apps). For each: what it does, and **how E.V.E is different** (grounded craft, the arguing
crew, tap-to-learn education). Be honest about where they're ahead. Cite sources.

### D. Win-audit against the rubric (save to `research/win_audit.md`)
Score E.V.E honestly (1–5) on each of the 4 judging criteria, with specific evidence and
specific weaknesses. Check every submission requirement in §3 and mark done/missing.

### E. Prioritized recommendations + implement the safe wins
Turn the gaps + audit into an impact-vs-effort table. **Implement the high-impact, low-risk
items now** (with tests), for example: tightening copy, adding a missing empty/error state,
a "getting started" affordance for absolute beginners, or closing a top pain we already have
data for. Leave risky/large items as clearly written proposals in `research/win_audit.md`.
Do not add heavy dependencies or a build step.

### F. Verify meticulously
- `npm test` must stay green (all 6 suites). Add tests for anything you build.
- Keep the UI English; keep every craft citation inside the 111-ID allowlist.
- Don't fabricate contest facts; leave unconfirmed items marked "verify".
- Sanity-check each page opens and the global nav works.

### G. Submission readiness
- Update `README.md` / `SUBMISSION.md` if you added features.
- Get your Codex `/feedback` session ID and note it in `SUBMISSION.md`.

## 5. Guardrails
- Cite sources for every external claim; if you can't verify, say so.
- No invented statistics, no fake testimonials, no fabricated contest rules.
- Preserve authorship framing: E.V.E *designs and teaches*; the human generates the film.
- Small, reviewable commits with clear messages. Keep tests green at every commit.

## 6. Definition of done
1. `research/ai_pain_points.md`, `research/competitive_scan.md`, `research/win_audit.md`
   exist, with real sources and a prioritized action list.
2. The top 2–3 safe, high-impact improvements are implemented, tested, and committed.
3. `npm test` is green; the site works end to end.
4. `SUBMISSION.md` has the `/feedback` session ID and an honest criteria scorecard.
5. A short summary comment back to the team: what you found, what you changed, what's left.
