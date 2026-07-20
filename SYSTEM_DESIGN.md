# First Frame — System Design

Netflix-grade architecture for an idea-to-film preproduction engine and self-learning artist program.

---

## 1. High-Level Pipeline

```
IDEA  →  VALIDATE  →  STRUCTURE  →  STORYBOARD  →  PROMPTS  →  GENERATE  →  (LEARN)
(intake) (hit-score) (beats+pacing) (boards+MES)  (t2i/i2v)  (toolchain)   (feedback)
```

| Stage | Input | Output | Grounding |
|-------|-------|--------|-----------|
| **1. Idea Intake** | mood, genre, scene, content (plain text) | normalized brief (tokens) | synonym/keyword map |
| **2. Validation & Hit-Score** | brief | N candidate concepts, each scored for audience/commercial potential | `success_factors.json` |
| **3. Structure** | chosen concept | beat map + pacing curve + narrative structure | `story_structures.json`, Layer 2 (SCHEMA_L2) |
| **4. Storyboard** | structure | per-beat shots: framing, angle, movement, mise-en-scène, twist | `cinematography.json`, `mise_en_scene.json`, ShotSeed Layer 1 |
| **5. Prompts** | shots | t2i + i2v prompts + negative prompts | shot fields + color/lighting KBs |
| **6. Generate** | prompts | images/clips (external) + recommended tool per shot | `ai_toolchain.json` |
| **7. Learn** | outcomes, expert edits, new references | improved weights/data | self-learning loop (§4) |

## 2. Data Layers (the "brain")

- **Layer 0 — Knowledge base (`knowledge/`)** — researched, film-agnostic craft: story structures, cinematography grammar, mise-en-scène, color theory, genre conventions, director styles, success factors, AI toolchain. *This is the domain expertise.*
- **Layer 1 — Shot dataset (ShotSeed)** — frame-by-frame analysis of specific master films (framing/angle/movement/lighting/palette/prompts). *Concrete examples.*
- **Layer 2 — Narrative structure (SCHEMA_L2)** — per-film beats, pacing curve, twist mechanics, mise-en-scène motifs. *How masters handle time.*
- **Layer 3 — User/reference uploads** — on-the-fly analysis of references the user supplies.

## 3. Modules

### 3.1 Idea Validation & Hit-Potential Scoring
Generate many concepts fast; score each against researched predictors (emotional arc strength, hook timing, relatability, structural completeness, genre fit, runtime fit). Surface only high-potential concepts. *AI proposes many; human + score select.*

### 3.2 Cross-Pollination Engine
To keep ideas original and non-derivative, pull inspiration from **distant** categories/films (distance-weighted), never copying same-category references for the signature "wow" beats.

### 3.3 Structure Composer
Map the concept to a canonical structure (Three-Act / Hero's Journey / Save the Cat / Kishōtenketsu) + a pacing curve derived from analyzed films; place hook and climax.

### 3.4 Storyboard Designer
For each beat, select shot grammar + mise-en-scène that serves the beat's function and mood; emit t2i/i2v prompts; frames generated via external toolchain (`generate_frames.py`).

### 3.5 Toolchain Router
Recommend the best current AI model per shot (see `ai_toolchain.json`): e.g., cinematic realism vs. multi-shot narrative vs. precise camera control.

## 4. Self-Learning Loop

```
new references ─┐
expert edits  ──┼─► ingest → abstract → add to Layers 1/2/3 → re-weight matching
audience data ──┘                                   ▲
                                                    └── outcomes feed back
```
- Every analyzed reference and every expert correction becomes data.
- Matching weights adjust from what actually performed (grounded, not guessed).
- Over time the system's directorial judgment sharpens — the "artist program" matures.

## 5. Current Implementation Status

- ✅ ShotSeed app (recommender + browser, 14 shots, 2D/3D, verified badges)
- ✅ Layer 2 narrative schema + Geri's Game analysis (twist + mise-en-scène)
- ✅ Story Flow storyboard (pacing curve + boards + prompts)
- ✅ Auto image generation script (`generate_frames.py`)
- ✅ Evaluation (grounded 25 vs naive 10)
- ✅ Unified system shell (`eve.html` + cross-nav)
- ✅ Knowledge base v1 (`knowledge/`) — story, cinematography, mise-en-scène, genres, directors, success, toolchain
- ⏳ Next: hit-potential scoring module · idea→structure auto-composer · deploy · more film analyses

## 6. Tech

Client-side web (HTML/CSS/JS) for the tools; Python for analysis (ffmpeg, palette extraction) and generation (OpenAI image API). No backend yet (portfolio/demo tier); a thin API server is the path to the multi-user product.
