# First Frame — Engineering and Product Gap Sweep

Audit date: 2026-07-21  
Scope: all nine public pages; Intake → Concept → Creator's Room → Shot Design → Storyboard; Film School, AI Tools, Footage Lab, Community; shared CSS/JS; serverless routes; tests and setup docs. This pass starts from, and does not repeat, `research/win_audit.md` or `research/readiness_pass.md` unless a finding remains open or regressed after those audits.

## Executive verdict

First Frame has a credible educational core, a coherent visual system, and unusually honest model/evaluation disclaimers. The baseline six-suite test run is green and all nine pages load without console errors or horizontal overflow at 320, 768, and 1440 px. The latest three feature commits nevertheless introduced or exposed one security blocker and several product-integrity majors that the existing source-string tests do not catch. The Create pipeline is demoable, but its fallback and progress semantics can currently misrepresent what happened.

## Findings by walk-through persona

Each item includes severity, location, and the smallest root-cause fix.

### A. First-time visitor

| Severity | Gap | File | One-line fix |
|---|---|---|---|
| major | A selected practice brief can become an unrelated chess film when live generation fails; the disclosure is visible but the unrelated result still replaces the user's project downstream. | `js/eve-api.js`, `concept_lab.html` | Treat the curated story as an explicit reference demo and require a deliberate “use demo” action; never silently save it as the user's concept. |
| major | Merely opening a later Create page marks it complete, and an unconditional sticky Continue control permits skipping work. | inline pipeline scripts in `concept_lab.html`, `creators_room.html`, `shotseed.html`, `storyboard.html` | Derive completion from validated saved artifacts and show continuation only at the actual successful action point. |
| major | “Hit-potential” runtime scoring compares a 1–10 minute short-film input with 80–150 minute feature ranges for five genres. | `concept_lab.html` | Use one explicit short-film range consistent with the input and product promise. |
| minor | Home labels the workflow “five-step” but numbers it 01–05 while Create uses 0–4; understandable, but avoidable cognitive friction. | `index.html`, Create pages | Standardize either human ordinal steps or zero-based stage IDs everywhere. |
| minor | The hero's “25 vs 10” internal audit remains visually prominent despite missing source images; the limitations are disclosed but the number can dominate a first impression. | `index.html`, `evaluation/` | Add the source images/reproduction metadata or demote the number until independently auditable. |

### B. Film student doing real work

| Severity | Gap | File | One-line fix |
|---|---|---|---|
| major | Shot Design stores only the search query and recommendation IDs; Storyboard displays a match count but does not apply the chosen shot language, prompts, palette, or workflow to the actual board. | `js/eve-state.js`, `shotseed.html`, `storyboard.html` | Persist a compact recommendation snapshot and surface it as actionable direction in Storyboard. |
| major | ShotSeed has no explicit selection step; automatic top-three results are treated as “matches” even when the learner rejects them. | `shotseed.html` | Add a clear “Use this direction” action and gate Storyboard handoff on a selection. |
| major | Session-only state is honest but fragile: refresh survives, a closed tab/new session loses all work, and there is no export/import for a production document. | `js/eve-state.js`, `storyboard.html` | Add a dependency-free JSON export before considering accounts or databases. |
| major | Curated fallback output is a strong demo, not a usable offline plan for the learner's own input. | `js/eve-api.js`, `concept_lab.html` | Preserve authorship by separating reference-demo mode from user-project mode and provide retry/recovery. |
| minor | Footage Lab evaluates technical signals but is disconnected from the current storyboard/shot plan, so advice is generic rather than shot-aware. | `detector.html` | Future: optionally import the exported project JSON locally and compare intended vs observed motion/light. |
| minor | Tools and workflow strings include versioned model names that age quickly; the Tool Library documents an as-of date, but ShotSeed cards do not. | `shotseed.html`, `data/ai_tools.json` | Add an as-of label and route recommendations through maintained tool IDs rather than prose-only versions. |

### C. Senior engineer reading the repo

| Severity | Gap | File | One-line fix |
|---|---|---|---|
| **blocker** | ShotSeed interpolates raw user input into `innerHTML`, enabling DOM XSS. | `shotseed.html` | Escape the displayed query and every user-derived matched token before rendering. |
| major | Pipeline/progress code and CSS are duplicated across four HTML files, have already drifted, and encode false completion semantics. | four Create HTML files | Move flow rendering into one shared module and test artifact-derived states. |
| major | Tests mostly assert source substrings; they missed the runtime-unit bug, false progress, unrelated fallback handoff, and XSS sink. | `tests/*.test.js` | Add behavioral contract tests for scoring, fallback ownership, state transitions, and escaped rendering. |
| major | State validators are asymmetric: blueprints are validated, but intake and ShotSeed payloads accept weak shapes and stale/malicious values. | `js/eve-state.js` | Validate every stored object on both save and load and delete invalid state. |
| major | README claims “locked-route recovery” and a fallback where “the live demo never breaks,” but routes are not locked and fallback changes the user's story. | `README.md`, `SUBMISSION.md` | Replace absolute claims with the exact recovery behavior and its limitations. |
| minor | Package metadata still uses the retired `eve-creator` name. | `package.json` | Rename the package to `first-frame` without changing runtime behavior. |
| minor | `.gitignore` contains duplicated `.vercel`/`.env*` patterns in a pre-existing uncommitted user edit. | `.gitignore` | Leave untouched unless the owner asks; do not absorb unrelated dirty work. |

### D. Skeptical judge

| Severity | Gap | File | One-line fix |
|---|---|---|---|
| **blocker (external)** | The prior audit found the production URL serving an obsolete build; local code cannot prove deployment is now current. | Vercel project / `README.md` live link | Redeploy current `main`, disable protection, verify all routes and both APIs signed out. |
| **blocker (submission)** | Public narrated demo and real Codex feedback session ID are still absent. | `SUBMISSION.md` / Devpost | User must record/upload the demo and paste a genuine feedback ID; code must not fabricate either. |
| major | “Other tools” / “nobody else ships” language is broader than the competitive evidence supports. | `index.html`, `README.md`, `SUBMISSION.md` | Reframe as First Frame's differentiator without universal competitor claims. |
| major | “Measurably improve” and “hit-potential” can read as outcome evidence even though the score is an internal revision heuristic. | `README.md`, `SUBMISSION.md`, Create UI | Use “changes its internal rubric score” consistently and keep the non-prediction disclaimer adjacent. |
| major | Eight ShotSeed examples use studio/director names and “inspired/style” prompts without being frame-verified; only six records are marked verified. | `shotseed.html` | Label synthesized entries as “reference pattern,” reserve source tags for verified analysis, and avoid implying endorsement. |
| minor | Current pages pass basic 320/768/1440 overflow, alt-attribute, accessible-name, and console checks; these checks are not yet automated in CI. | `tests/`, CI | Add a lightweight static page-integrity suite now; defer browser CI if it adds a heavy dependency. |
| minor | The global nav intentionally scrolls horizontally on mobile; usable, but the current-tab context may start offscreen. | `js/eve-nav.js` | Future: scroll the active tab into view without animation under reduced motion. |

## Page-by-page integrity check

| Page | 320 / 768 / 1440 | Console | Empty/error/loading | Links and copy |
|---|---|---|---|---|
| Home / Intake | No document overflow | Clean | Contest fetch error exists | Local links resolve; evidence caveat present |
| Concept Lab | No document overflow | Clean in fallback flow | Empty, loading, fallback states exist | Short-film scoring fixed; reference fallback requires consent |
| Creator's Room | No document overflow | Clean in fallback flow | Empty, loading, deterministic fallback exist | Shared artifact-derived progress; no skip control |
| Shot Design | No document overflow | Clean | Empty and no-match states exist | User text escaped; explicit direction selection required |
| Storyboard | No document overflow | Clean with generated fallback data | Missing-blueprint recovery exists | Selected direction and portable export are available |
| Film School | No document overflow | Clean | Data-load error exists | 111 allowlisted lessons present |
| AI Tools | No document overflow | Clean | Load and no-filter-match states exist | External sources open safely; data is as-of dated |
| Footage Lab | No document overflow | Clean before upload | Codec, metadata, progress, and analysis errors exist | Local-only promise matches implementation |
| Community | No document overflow | Clean using curated fallback | Skeleton, no-result, and source failure states exist | No invented engagement; live/fallback status is explicit |

Static local `href`/`src` resolution found no missing project file. Browser checks found no image without an `alt` attribute and no unnamed button on the nine public pages. Dynamic third-party URLs and the production deployment remain external-state risks and must be rechecked immediately before submission.

## Impact vs effort and disposition

| Finding | Impact | Effort / risk | Decision |
|---|---:|---:|---|
| Escape ShotSeed user content | Critical | Low | **Fix now** — direct security defect. |
| Artifact-derived pipeline progress; remove skip controls | High | Medium | **Fix now** — restores truthful flow and removes duplication. |
| Separate reference fallback from user project | High | Medium | **Fix now** — authorship and trust issue. |
| Correct short-film runtime scoring | High | Low | **Fix now** — deterministic logic bug. |
| Persist selected ShotSeed direction into Storyboard | High | Medium | **Fix now** if it stays within existing state/UI patterns. |
| Harden all session-state validators | High | Low–medium | **Fix now** with unit coverage. |
| Honest claims and README/setup cleanup | High | Low | **Fix now**. |
| Automate page-integrity/source checks | Medium | Low | **Fix now** without adding browser dependencies. |
| JSON project export | High | Medium | **Fixed** — dependency-free, versioned export from Storyboard. |
| Accounts/cloud persistence/collaboration | High | Very high | **Do not build** — auth, privacy, storage, and moderation scope. |
| Storyboard-aware Footage Lab | Medium | High | **Do not build** — needs a designed comparison contract and real evaluation. |
| Redeploy production, record demo, obtain feedback ID | Critical | External/user action | **Cannot fix in repo**; report as explicit blockers and never invent completion. |
| Rewrite pre-existing `.gitignore` / hero asset changes | Low | Ownership risk | **Deliberately leave** to preserve unrelated user work. |

## Verification log

- Baseline: `npm test` passed all six suites before edits.
- Browser baseline: all nine pages loaded at 320, 768, and 1440 px with zero document overflow, console errors/warnings, missing `alt` attributes, unnamed buttons, or empty local links.
- Full baseline flow: Paper Boat → Concept fallback → Creator's Room fallback → ShotSeed reproduced the unrelated-story handoff and false progress state.

## Final disposition after two audit/fix loops

### Closed blockers and majors

| Original gap | Resolution | Commit |
|---|---|---|
| ShotSeed DOM XSS | Escaped the displayed query and user-derived match chips; added a regression contract. | `be488c2` |
| Incorrect 80–150 minute scoring bands | All genre scoring now uses the product's explicit 1–10 minute short-film unit. | `be488c2` |
| Unrelated fallback replaced learner work | Curated reference output now requires an explicit “Use this reference demo” choice; retry remains available and new-project state resets downstream artifacts. | `0b1a339`, `d8b6141` |
| False visit-based progress and skip controls | Replaced four copies with `js/eve-flow.js`; status derives from validated Intake, Blueprint, crew-reviewed, and selected-direction artifacts. | `c9831aa` |
| Weak stored-state shapes | Intake and ShotSeed state validate on save/load; invalid state is removed; selected direction uses a bounded schema. | `0b1a339`, `d8b6141` |
| ShotSeed dead-end / decorative handoff | Learner must select one recommendation; its prompts, camera/light language, palette, and workflow appear in Storyboard. | `d8b6141` |
| Session state produced no portable work product | Storyboard exports a versioned, dependency-free project JSON containing the blueprint and selected direction. | `46bb907` |
| Overbroad competitor/outcome claims | Replaced “nobody else” and “measurably better” claims with specific, inspectable differentiation and rubric limitations; synthesized ShotSeed records are labelled. | `d8b6141` |

### Deliberately left

1. **Production deployment verification — blocker, external.** This workspace cannot prove that Vercel now serves current `main`, that deployment protection is off, or that both GPT routes have a valid key. Redeploy and test signed out.
2. **Narrated demo and Codex feedback ID — blocker, user/submission action.** Neither can be truthfully created from repository code; `SUBMISSION.md` keeps both unchecked.
3. **Source images for the 25-vs-10 audit — major evidence weakness, artifact unavailable.** The UI and docs disclose the limitation. Add the original evaluation images plus reproduction metadata or remove the prominent number.
4. **Accounts/cloud collaboration — roadmap, intentionally out of scope.** The new JSON export makes the static product usable without introducing auth, privacy, storage, or moderation risk.
5. **Storyboard-aware Footage Lab — roadmap.** Connecting technical clip signals to intended shot language needs a designed comparison/evaluation contract; a rushed heuristic would overclaim.

### Final verification

- `npm test` passed after every one of five implementation commits; all six suites remain green.
- A fresh browser tab reloaded all nine public pages at 320, 768, and 1440 px after the final changes.
- Final browser result: zero document overflow, console errors/warnings, missing `alt` attributes, unnamed buttons, empty local links, retired sticky continuation controls, or non-English page declarations.
- Re-walked the changed path: new concept clears stale downstream status → failed live generation offers retry or explicit reference-demo consent → ShotSeed requires a choice → Storyboard displays that choice.
- Static local link resolution found no missing project target. The 111-ID allowlist was not edited and no dependency or build step was added.

No in-repository blocker or major remains after the second loop. The remaining blockers are external submission/deployment state, and the largest honest product weakness is still the missing independently reproducible evaluation imagery.
