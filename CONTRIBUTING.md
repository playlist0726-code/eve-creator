# Contributing

Thanks for your interest in First Frame.

## Getting started

```bash
git clone https://github.com/playlist0726-code/eve-creator.git
cd eve-creator
npm test            # must pass before you push
npx serve .         # preview the static pages locally
```

## Ground rules

- **No build step, no runtime dependencies.** Keep the front end plain HTML/CSS/JS and the
  serverless functions dependency-free.
- **The citation contract is sacred.** Any craft citation must be an exact ID from the
  111-ID allowlist in `lib/craft-knowledge.js`. Add new IDs to the knowledge base first.
- **Everything user-facing is in English.**
- **Don't invent contest facts.** `data/contests.json` holds real competitions; unconfirmed
  deadlines stay `see_site`.
- **Add a test** when you change the citation contract, runtime math, the pipeline hand-off,
  or the Creator's Room schema. Run `npm test` (CI runs it on every push).

## Commit style

Short imperative subject, then a body explaining the *why*. Example:

```
Add gain cap to the Creator's Room

Prevents the crew from inflating its own re-score beyond what the applied
revisions justify (+30 max).
```

## Pull requests

Keep them focused, describe the change and its rationale, and make sure CI is green.
