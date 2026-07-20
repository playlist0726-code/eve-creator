# OpenAI Build Week Win Audit

Audit date: 2026-07-20. Requirements and criteria were verified against [OpenAI Build Week on Devpost](https://openai.devpost.com/).

## Honest scorecard

| Criterion | Score | Evidence | Weakness |
|---|---:|---|---|
| Technological Implementation | 4.5/5 | Two GPT-5.6 structured-output passes; schemas; server-only key; citation/tool validation; fallbacks; six-suite CI; Codex-authored history. | No streaming; evaluation is small; required feedback ID is missing. |
| Design | 4.0/5 | Coherent platform and Create pipeline, shared theme, loading/error/fallback states, responsive static UI. | Some pages are dense; no accounts/persistence; final media is external. |
| Potential Impact | 3.8/5 | Specific audiences and sourced pains; beginner-to-blueprint flow; contextual learning; human authorship. | No user study, learning outcome, classroom pilot, or quantified benefit. |
| Quality of the Idea | 4.5/5 | Five-role critique/fix/re-score plus allowlisted craft teaching differs from one-shot storyboard tools. | Competitors have stronger generation/control; the crew must visibly do more than role-play. |

**Overall: 4.2/5.** The largest remaining risk is submission evidence, not missing feature breadth.

## Submission requirements

| Requirement | Status | Note |
|---|---|---|
| Working Codex + GPT-5.6 project | Done | Live URL and repository exist. |
| Education track | Positioned; verify Devpost selection | Official track helps students, teachers, or educational organizations ([Devpost](https://openai.devpost.com/)). |
| Project description | Draft ready | SUBMISSION.md |
| Public YouTube demo under 3 minutes | **Missing** | Audio must explain Codex and GPT-5.6 ([Devpost](https://openai.devpost.com/)). |
| Repository and README | Done | Re-check public visibility. |
| Codex feedback session ID | **Missing / unavailable here** | Devpost requires it ([Devpost](https://openai.devpost.com/)); the user must run the feedback command in the core Codex session. |
| Live demo accessible | Verify | Confirm Vercel protection is off and the API key is configured. |
| Deadline | Verified | July 21, 2026 at 5:00 PM PDT ([Devpost](https://openai.devpost.com/)). |

## Impact vs effort

| Recommendation | Impact | Effort/risk | Decision |
|---|---|---|---|
| One-click beginner practice briefs | High | Low | Implement now |
| Storyboard Continuity Kit | High | Low | Implement now |
| Explicit minimum viable tool stack | Medium-high | Low | Implement now |
| Record narrated demo | Critical | Medium, no code | Do immediately |
| Run feedback command and add ID | Critical | Low, user action | Do immediately |
| Reference-image upload/persistent bible | Very high | High: storage/privacy | Proposal |
| Automated clip flicker/identity analysis | High | High: media/compute | Proposal |
| Accounts, saves, exports, collaboration | High | High: auth/database | Proposal |
| Classroom pilot and learning assessment | High evidence value | Medium/time | Proposal |
| Credit/budget estimator | Medium | Medium: unstable prices | Proposal |

## Safe wins in this mission

1. First Film starters remove blank-page anxiety and prefill Concept Lab.
2. Continuity Kit creates an anchor prompt plus identity/wardrobe/prop/palette checklist.
3. Minimum viable stack puts still → motion → edit before advanced routing.

## Do not build before deadline

Do not add uploads, databases, accounts, generation, or a framework now. They add privacy, reliability, and demo risk without solving the missing submission artifacts.

## Final sequence

1. Record/upload the narrated 2:45 demo.
2. Run the feedback command; paste the ID into SUBMISSION.md and Devpost.
3. Verify production API, fallback, mobile layout, repo visibility, and Vercel access signed out.
4. Submit early; use remaining time only for blockers.
