# First Frame — Codex Handoff Brief

> Paste this into Codex/ChatGPT to continue the build. It contains the full project context, current state, architecture, and the prioritized next tasks for the OpenAI Build Week Challenge (submission deadline **July 21, 2026**).

---

## 0. TL;DR

**First Frame** is a 1-person film-preproduction copilot: give it an idea (mood, genre, scene, story) and it designs the whole plan — story → structure → storyboard → per-shot image (t2i) & video (i2v) prompts → recommended generation workflow. Every decision is **grounded** in frame-by-frame analysis of master animated films (Pixar/Disney) plus a researched knowledge base. It does not generate the film for you; it designs exactly *how* to make it, and the human runs the generation.

**Proven differentiator:** grounded prompts beat naive prompts **25 vs 10** in our evaluation (see `evaluation/`).

**Contest goal:** ship a clickable live demo + a 2–3 min video + clean repo, continuing the build **with Codex** to qualify.

---

## 1. Repository Map (all English, all working)

```
my-short-film/
├── eve.html            # System HOME — pipeline overview, tool cards, KB, status. START HERE.
├── index.html          # ShotSeed — shot recommender + dataset browser (14 shots, 2D/3D filter, verified badges)
├── storyboard.html     # Story Flow — storyboard sheet: pacing curve + per-beat shots + twist + mise-en-scène
├── concept_lab.html    # Concept Lab — idea validation + hit-potential scoring (8 research-backed dimensions)
├── generate_frames.py  # Auto-generates storyboard frames via OpenAI image API -> storyboard_frames/beatN.png
├── storyboard_data.json# Prompts + style_suffix shared by the script and storyboard.html
├── knowledge/          # Layer 0 knowledge base — 7 JSON datasets (see §3)
├── evaluation/         # Grounded-vs-Naive experiment (EXPERIMENT.md, RESULTS.md, images/)
├── storyboard_frames/  # Generated frames land here (currently empty; run generate_frames.py)
├── references/         # Reference media (mp4 shorts + storyboard style refs)
├── VISION.md           # Product vision
├── SYSTEM_DESIGN.md    # Architecture + pipeline + modules + self-learning loop
├── SCHEMA.md           # Layer 1 codebook (shot dataset schema + controlled vocab)
├── SCHEMA_L2.md        # Layer 2 codebook (narrative structure, twist, mise-en-scène) + Geri's Game analysis
├── RESEARCH_PLAN.md    # Research roadmap + paper outline
└── CLAUDE.md           # North-star spec
```

All four HTML tools are pure client-side (HTML/CSS/JS, no build step) and share a top nav: **Home · ShotSeed · Story Flow · Concept Lab**. Keep relative links intact.

---

## 2. Architecture (data layers + pipeline)

```
IDEA → VALIDATE → STRUCTURE → STORYBOARD → PROMPTS → GENERATE → (LEARN)
```

- **Layer 0 — `knowledge/`**: film-agnostic craft (story structures, cinematography, mise-en-scène, genres, director styles, success factors, AI toolchain).
- **Layer 1 — ShotSeed (`index.html` data)**: frame-by-frame shot analysis of specific films (framing/angle/movement/lighting/palette/t2i/i2v/workflow). 14 shots; 6 are real analyses (Geri's Game 3D, Paperman 2D), rest are seed samples.
- **Layer 2 — `SCHEMA_L2.md` + `storyboard.html`**: per-film beats, pacing curve (tension 0–1), twist mechanics, mise-en-scène motifs.
- **Layer 3**: user reference uploads → on-the-fly analysis (workflow: ffmpeg frame extract → palette extract → structure).

Matching engine (in `index.html`): KO/EN synonym map → keyword scoring over shot fields → top-N. Concept Lab (in `concept_lab.html`): transparent heuristic scoring across 8 weighted dimensions (v1, not ML).

---

## 3. Knowledge Base contents (`knowledge/*.json`, all validated)

| File | Contents |
|------|----------|
| `story_structures.json` | Three-Act, Hero's Journey (12), Save the Cat (15), Pixar Spine, Kishōtenketsu, Freytag + Pixar rules; each beat has position + function |
| `cinematography.json` | shot sizes, angles, movements, lenses, composition, editing rhythm — each with emotional effect |
| `mise_en_scene.json` | lighting styles, color schemes, color psychology, staging, production design |
| `genres.json` | 6 genres: structure, pacing, tone, look, conventions, hit levers |
| `director_styles.json` | 9 master directors' narrative + visual signatures (abstracted) |
| `success_factors.json` | researched box-office/retention predictors + hit-potential scoring dimensions/weights |
| `ai_toolchain.json` | 2026 image/video models (Veo 3.1, Kling 3.0, Runway Gen-4.5, gpt-image-1, etc.) + routing rules |

---

## 4. Evaluation (the proof)

`evaluation/RESULTS.md`: same scene, two prompts (naive vs ShotSeed-grounded), scored on 5 craft criteria. Grounded **25/25** vs naive **10/25**. Honest limitation logged (grounded steers craft strongly but subject count still needs explicit control). Images in `evaluation/images/`.

---

## 5. Prioritized Next Tasks (for Codex — 7-day plan)

**P0 — Deploy (live demo link).** Host the static site (GitHub Pages / Netlify / Vercel). Entry point `eve.html` (or rename to `index.html` for hosting and update nav). Verify all 4 tools + relative links work live.

**P1 — Fill storyboard frames.** Run `generate_frames.py` (needs `OPENAI_API_KEY`) to populate `storyboard_frames/beat1..6.png`; Story Flow then renders real boards. Consider a `style_suffix` that reads as a storyboard sketch.

**P2 — End-to-end wiring.** Connect Concept Lab → Story Flow: pass the validated concept + chosen structure so Story Flow assembles the beat sheet dynamically (currently it shows the fixed Geri's Game example). This is the "idea in → storyboard out" money demo.

**P3 — Hit-potential v1.1.** Optionally load `knowledge/success_factors.json` to drive Concept Lab dimensions/weights from data (note: local `fetch()` needs a served site, so this pairs with P0).

**P4 — Demo video (2–3 min).** Idea → validate → structure → storyboard → prompts → generated frame. Screen-record the live site.

**P5 — Repo polish + submission.** English README with architecture diagram, live link, video, "built with Codex" notes. Submit before **July 21**.

**Stretch — One real short clip.** Take one beat's t2i→i2v through the toolchain and embed the result.

---

## 6. Conventions (keep these)

- **English everywhere** (UI copy, filenames, docs).
- **Copyright-safe:** store abstractions (structure, palette, grammar), never copyrighted footage/frames in the repo. Reference videos in `references/` are local-only inputs, not shipped.
- **Verify each step** (the project was built with per-step validation: JSON validity, jsdom render checks, prompt dry-runs).
- **Keep relative links** between the 4 HTML tools intact when moving/renaming files.
- **Human-in-the-loop:** the system designs and scores; it does not claim to auto-generate finished films.
- Dark cinematic theme: bg `#0d0d0d`, gold accent `#c9a227`, rounded cards.

## 7. How to run / test

- Open `eve.html` in a browser (double-click) — the whole system works offline except image generation.
- `python generate_frames.py --dry-run` prints the 6 prompts without an API key.
- `python generate_frames.py` (with `OPENAI_API_KEY` set) generates the frames.
- Static site → deploy any static host.

---

*Author: Junsu (Michael) Kim — AI Filmmaker. Continue the build with Codex from the P0→P5 list above.*
