# knowledge/ — E.V.E Creator Knowledge Base (Layer 0)

Researched, film-agnostic craft data — the domain expertise the system reasons with.
All English, versioned JSON. (Layer 1 = specific film shot data in `../index.html`; Layer 2 = narrative structure in `../SCHEMA_L2.md`.)

| File | What it holds |
|------|----------------|
| `story_structures.json` | Three-Act, Hero's Journey (12), Save the Cat (15), Pixar Spine, Kishōtenketsu, Freytag + Pixar rules |
| `cinematography.json` | Shot sizes, angles, movements, lenses, composition, editing rhythm — each with emotional effect |
| `mise_en_scene.json` | Lighting styles, color schemes, color psychology, staging/blocking, production design |
| `genres.json` | Per-genre structure, pacing, tone, look, conventions, hit levers |
| `director_styles.json` | Abstracted signatures of master directors (narrative + visual) |
| `success_factors.json` | Researched box-office/retention predictors + Hit-Potential scoring dimensions |
| `ai_toolchain.json` | Current (2026) image/video models + routing rules per shot |

## How the system uses it
- **Structure Composer** ← story_structures + genres
- **Storyboard Designer** ← cinematography + mise_en_scene + director_styles
- **Hit-Potential Scorer** ← success_factors
- **Toolchain Router** ← ai_toolchain

Research sources are cited inline in `success_factors.json` and `ai_toolchain.json`. Canonical craft (structures, shot grammar, color theory) is standard film-theory, encoded for machine use.
