# OpenAI Build Week Challenge — Submission

**Project:** First Frame — the one-person film studio with an AI film crew that argues
**Author:** Junsu (Michael) Kim
**Track:** Education
**Live demo:** https://eve-creator.vercel.app
**Repo:** https://github.com/playlist0726-code/eve-creator (public, MIT)
**Demo video:** _(public YouTube, < 3 min, audio must explain how Codex AND GPT-5.6 were used)_
**Codex `/feedback` session ID:** _(run `/feedback` in the Codex session where you built the core; paste the ID into the Devpost form)_
**Built with:** Codex + GPT-5.6
**Deadline:** Tue Jul 21, 5:00 PM PT (= Wed Jul 22, 9:00 AM KST)

---

## Devpost fields (copy-paste ready)

### Inspiration
Making even a 3-minute animated short takes weeks of pre-production most people never learn — story structure, shot grammar, pacing, symbolic staging — and, with AI generators, dozens of precise prompts. Generic "AI story" tools hand back a plausible draft with no craft behind it and no way to know if it's good. I wanted a tool that reasons like a real film crew and can prove its choices.

### What it does
You enter one idea (mood · genre · scene · premise). First Frame designs the whole plan: story → five-act structure → storyboard → per-shot image (T2I) and video (I2V) prompts → recommended generation tools. It doesn't generate the film — it designs exactly *how* to make it, so you keep authorship. Every choice is grounded in a knowledge base built from frame-by-frame analysis of master animation.

Then the differentiator: **The Creator's Room**. GPT-5.6 role-plays a five-person crew (Director, Writer, Cinematographer, Editor, Test Audience) that critiques your draft against the craft data, applies concrete before/after fixes, and shows how those revisions change its transparent internal rubric score. The score is an explanation aid, not a prediction of audience response or contest success.

**It's built to teach.** Every technique First Frame cites (`low_angle`, `chiaroscuro`, `pixar_spine`, +108 more) is tap-to-learn with a plain-language explanation, and the crew explains *why* each fix works. A beginner finishes with a shootable film **and** a real understanding of the craft — then copies the generation prompts to make it themselves.

Research-backed onboarding now gives absolute beginners a bounded 60-second starter, a reusable cross-shot Continuity Kit, and a minimum viable still → motion → edit path. Sources and the honest rubric audit are in [research](research/).

### How we built it
Static HTML/CSS/vanilla JS front end (no build step), Vercel serverless functions calling **GPT-5.6** via the Responses API with strict JSON-schema structured output. Two agentic passes: one drafts a grounded five-act blueprint; a second convenes the Creator's Room for a self-critique loop. Citations are validated against a 111-ID craft allowlist so the model can't fabricate evidence. Built pair-programming with **Codex**, guarded by a Node test suite in CI.

### Challenges we ran into
Keeping the model honest (no hallucinated citations, no self-inflated scores — hence the allowlist + a +30 gain cap), fitting real agentic reasoning inside a serverless timeout, and making the "grounding" *visible* rather than just claimed.

### Accomplishments we're proud of
In one disclosed internal prompt comparison, a grounded output scored **25/25 vs a naive output's 10/25** on a five-part directorial rubric. This is directional evidence, not a user study; the prompts, rubric, observations, and limitations are public, and the source images still need to be added for independent audit. The Creator's Room turns a one-shot generator into a crew that critiques and revises the work—and degrades gracefully to a rich deterministic fallback.

### What we learned
Structured output + a citation allowlist turns an LLM from a "confident guesser" into a grounded reasoning system, and a second self-critique pass produces measurably better creative work.

### What's next
Reference-clip upload → on-the-fly shot analysis; generating the storyboard animatic in-app; expanding the ShotSeed dataset with 2D/3D tagging.

### Built with
`openai-gpt-5.6` · `codex` · `javascript` · `html` · `css` · `vercel` · `node`

---

## Tracks (pick one)

| Track | Fit for First Frame |
|-------|---------------|
| **Apps for Your Life** | Strong — a consumer *creativity* app that lets anyone design a film. |
| **Education** | Strong — teaches film craft; the Creator's Room shows *why* every choice, like sitting in a director's room. Judge Leah Belsky = VP of Education. |
| Work & Productivity | Weaker — not team/back-office focused. |
| Developer Tools | Weaker — not aimed at developers. |

## Judging-criteria map (official 4 criteria)

| Criterion | What judges ask | Where it shows |
|-----------|-----------------|----------------|
| **Technological Implementation** (Codex depth) | How thoroughly & skillfully does it use **Codex**? Real, non-trivial working code. | [README → How Codex built this](README.md#-how-codex-built-this), `CODEX_HANDOFF.md`, `tests/` + green CI, `/feedback` session ID. |
| **Design** | Complete, coherent *product* experience — not just a POC. | Guided 5-step pipeline; Creator's Room sequential debate, animated v1→v2 score, before/after diffs; graceful fallbacks so nothing breaks. |
| **Potential Impact** | Credible, specific real problem + audience the solution actually addresses. | Non-filmmakers get a full crew, contextual lessons, and a transparent internal grounding comparison; user-learning evidence remains future work. |
| **Quality of the Idea** | Creative, novel, different from existing concepts. | "An AI film crew that argues and improves your film," grounded in frame-analyzed master craft — a self-critique loop nobody else ships. |

> Note: 4 of the 5 judges are product people (Thibault Sottiaux, Kath Korevec, Tara Seshan, Leah Belsky) + 1 technical (Peter Steinberger). So **product completeness (Design)** and **Codex depth** carry the most weight. The demo video's **audio must explicitly explain how Codex AND GPT-5.6 were used.**

---

## Demo video script (~2:45, < 3 min · audio MUST explain Codex AND GPT-5.6)

Record with voice-over. The audio has to explicitly say *how GPT-5.6 and Codex were used* — that's a scored requirement.

1. **0:00–0:20 — Hook (Education).** *"Most people never get to learn filmmaking. First Frame lets anyone direct a film — and learn how while they do it."* Show the Home hero + differentiator band.
2. **0:20–0:50 — Intake + Concept.** Enter an idea. *"GPT-5.6, through the Responses API with strict structured output, drafts a grounded five-act blueprint."* Tap a citation chip → the plain-language lesson pops up. *"Every craft term is tap-to-learn — that's the education layer."*
3. **0:50–1:55 — The Creator's Room (the star).** Continue. The five-role crew speaks in turn; the hit-score animates up; show one before/after fix and tap a term in it. *"This is a second GPT-5.6 pass — the model critiques its own draft as five specialists and teaches why each fix is better."*
4. **1:55–2:20 — Make it yourself.** Copy a T2I prompt. *"First Frame hands you the plan and the vocabulary; you generate the film and keep authorship."* Flow into Shot Design + Storyboard.
5. **2:20–2:45 — Proof + Codex.** Flash 25-vs-10 evaluation and the green CI badge. *"I built this with Codex — it scaffolded the GPT-5.6 endpoints, the strict schemas, and the test suite you see passing in CI."* End on the live URL + `/feedback` session ID note.

## Submission checklist

- [x] Public repo with a strong README (setup instructions, sample data, how to run)
- [x] Built with Codex · [x] Uses GPT-5.6
- [x] Live, clickable demo (Vercel) — no rebuild needed for judges to test
- [x] Tests + CI (green badge)
- [x] Public repo with MIT license _(or share private repo with testing@devpost.com + build-week-event@openai.com)_
- [x] **Education track** selected in the submission materials; confirm it in Devpost
- [ ] **Public YouTube demo video < 3 min**, with **audio** covering how Codex AND GPT-5.6 were used
- [ ] **Codex `/feedback` session ID** obtained and pasted into the Devpost form
- [ ] Project description on Devpost (use the fields above)
- [ ] `OPENAI_API_KEY` set in Vercel; Deployment Protection **off** so judges can open the live demo
