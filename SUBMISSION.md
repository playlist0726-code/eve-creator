# OpenAI Build Week Challenge — Submission

**Project:** E.V.E Creator — the one-person film studio with an AI film crew that argues
**Author:** Junsu (Michael) Kim
**Live demo:** https://eve-creator.vercel.app
**Repo:** https://github.com/playlist0726-code/eve-creator
**Demo video:** _(paste public YouTube link — must be < 3 min)_
**Built with:** Codex + GPT-5.6

---

## Devpost fields (copy-paste ready)

### Inspiration
Making even a 3-minute animated short takes weeks of pre-production most people never learn — story structure, shot grammar, pacing, symbolic staging — and, with AI generators, dozens of precise prompts. Generic "AI story" tools hand back a plausible draft with no craft behind it and no way to know if it's good. I wanted a tool that reasons like a real film crew and can prove its choices.

### What it does
You enter one idea (mood · genre · scene · premise). E.V.E designs the whole plan: story → five-act structure → storyboard → per-shot image (T2I) and video (I2V) prompts → recommended generation tools. It doesn't generate the film — it designs exactly *how* to make it, so you keep authorship. Every choice is grounded in a knowledge base built from frame-by-frame analysis of master animation.

Then the differentiator: **The Creator's Room**. GPT-5.6 role-plays a five-person crew (Director, Writer, Cinematographer, Editor, Test Audience) that critiques your draft against the craft data, applies concrete before/after fixes, and re-scores its hit-potential. You watch the film measurably improve.

### How we built it
Static HTML/CSS/vanilla JS front end (no build step), Vercel serverless functions calling **GPT-5.6** via the Responses API with strict JSON-schema structured output. Two agentic passes: one drafts a grounded five-act blueprint; a second convenes the Creator's Room for a self-critique loop. Citations are validated against a 111-ID craft allowlist so the model can't fabricate evidence. Built pair-programming with **Codex**, guarded by a Node test suite in CI.

### Challenges we ran into
Keeping the model honest (no hallucinated citations, no self-inflated scores — hence the allowlist + a +30 gain cap), fitting real agentic reasoning inside a serverless timeout, and making the "grounding" *visible* rather than just claimed.

### Accomplishments we're proud of
A grounded blueprint scored **25/25 vs a naive prompt's 10/25** in our evaluation. The Creator's Room turns a one-shot generator into a crew that argues and improves the work — and it degrades gracefully to a rich deterministic fallback so the demo never breaks.

### What we learned
Structured output + a citation allowlist turns an LLM from a "confident guesser" into a grounded reasoning system, and a second self-critique pass produces measurably better creative work.

### What's next
Reference-clip upload → on-the-fly shot analysis; generating the storyboard animatic in-app; expanding the ShotSeed dataset with 2D/3D tagging.

### Built with
`openai-gpt-5.6` · `codex` · `javascript` · `html` · `css` · `vercel` · `node`

---

## Judging-criteria map (what to look at)

| Criterion | Where it shows | One-liner |
|-----------|----------------|-----------|
| **Thoughtful use of GPT-5.6** | `api/generate-story.js`, `api/creators-room.js` | Two agentic passes + a self-critique loop, not a single prompt; strict structured output. |
| **Use of Codex** | [README → How Codex built this](README.md#-how-codex-built-this), `CODEX_HANDOFF.md` | Codex scaffolded the engine, tests, rebrand, and deploy config. |
| **Technical implementation** | `lib/*-schema.js`, `tests/`, CI badge | Strict schemas, citation validation, gain cap, green test suite. |
| **Quality of idea** | `creators_room.html` | "An AI film crew that argues," grounded in analyzed master craft. |
| **Design & UX** | the guided 5-step pipeline | Sequential crew debate, animated v1→v2 score, before/after diffs. |
| **Potential impact** | Home + `evaluation/` | Gives non-filmmakers a whole crew; grounding is measured (25 vs 10). |

---

## Demo video script (~2:40, for the < 3 min requirement)

1. **0:00–0:20 — Hook.** "Every AI tool hands you one draft and stops. Mine gives you a film crew." Show the Home differentiator band.
2. **0:20–0:50 — Intake + Concept.** Enter an idea; GPT-5.6 builds a grounded five-act blueprint. Point out the per-shot citations — "these aren't invented; they're from analyzed film craft."
3. **0:50–1:50 — The Creator's Room (the star).** Hit continue. The crew speaks in turn; the hit-score animates 61 → 78; show one before/after fix. "GPT-5.6 is critiquing its own draft as five specialists and improving it — measurably."
4. **1:50–2:15 — Payoff.** Apply crew notes → the improved blueprint flows into Shot Design + Storyboard with generation-ready prompts.
5. **2:15–2:40 — Proof + Codex.** Flash the 25-vs-10 evaluation and the green CI badge; "built with Codex and GPT-5.6." End on the live URL.

## Submission checklist

- [ ] Public YouTube demo video, under 3 minutes, explains Codex + GPT-5.6 use
- [x] Public repo with a strong README
- [x] Built with Codex
- [x] Uses GPT-5.6
- [x] Live, clickable demo (Vercel)
- [x] Tests + CI
- [ ] Devpost form filled from the fields above
- [ ] `OPENAI_API_KEY` set in Vercel; Deployment Protection off so judges can open it
