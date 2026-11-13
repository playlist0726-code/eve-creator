# First Frame

A filmmaking planning prototype that turns an idea into an inspectable blueprint, structured critique, shot choices, and storyboard prompts.

**[Project case study](https://playlist0726-code.github.io/projects/first-frame/)** · [Open app](https://eve-creator.vercel.app/) · [Recorded walkthrough](https://youtu.be/bDWb2VqcrDs) · [Portfolio](https://playlist0726-code.github.io/)

## Purpose and contribution

Built by Junsu (Michael) Kim to connect film-craft learning with an AI-assisted pre-production workflow. My work includes the product concept, research, interface, structured output design, and AI-assisted implementation.

The key question is whether a beginner can understand and revise a creative decision, rather than receive only a polished-looking plan.

## What is implemented

- Concept intake and a five-act story blueprint.
- A visible second-pass critique with director, writer, cinematographer, editor, and audience perspectives.
- Shot design, storyboard prompts, a continuity kit, and project JSON export.
- A glossary covering 111 craft terms.
- Server-side JSON validation and citation-ID filtering.
- A deterministic fallback for exploring the interface without configured live AI.

## Architecture

```text
Browser intake
  → /api/generate-story.js → structured blueprint
  → /api/creators-room.js  → five-perspective critique and revisions
  → shot design / storyboard / export
```

There are **two model calls**, not five autonomous agents. The five crew members are perspectives returned within the second response. Both endpoints use a server-side OpenAI Responses request; no API key belongs in the browser.

Live generation requires a configured server-side `OPENAI_API_KEY` and provider access to the model configured in the endpoints. Model access has not been verified by this documentation update. Without live configuration, explore the fallback and recorded walkthrough; do not treat a fallback result as a live model response.

An allowlist rejects unknown citation IDs, but does not establish the correctness of a valid citation or prevent every kind of hallucination. Internal planning scores are revision aids, not predictions of audience response, awards, or commercial success.

## Local preview and checks

Use Node.js 22 or later for the tests. The static interface can be served without installing packages:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. A static server does not run the `/api` endpoints.

```sh
npm test
```

The dependency-free test suite covers schemas, pipeline behavior, citation filtering, glossary coverage, and the interface. It does not prove live provider availability or user outcomes.

## Research and evaluation

- [`research/`](research/): beginner barriers and competitive research.
- [`knowledge/`](knowledge/): structured craft reference data.
- [`evaluation/`](evaluation/): a small internal grounded-versus-naive comparison, prompts, rubric, and limitations. Source images are incomplete, so the reported scores are not an independently auditable benchmark.
- [`SCHEMA_L2.md`](SCHEMA_L2.md): narrative and pacing structure.

Reference research is educational analysis; it does not imply affiliation with referenced studios. First Frame does not claim SceneForge’s Handshake × OpenAI Codex Creator Challenge recognition.

## Next product question

Can first-time filmmakers explain and improve a shot plan after using the critique? That is a more useful next evaluation than counting generated plans alone.

## How Codex built this

Codex assisted implementation of the two structured API endpoints, JSON schemas, citation filtering, the crew-review interface, connected browser state, glossary interactions, and contract tests. The human defined the filmmaking direction, curated the craft knowledge, and reviewed the product decisions. See [`CODEX_HANDOFF.md`](CODEX_HANDOFF.md), `api/`, `lib/`, `js/`, and the commit history for the implementation trail.
