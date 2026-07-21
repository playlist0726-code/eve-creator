# Codex task — fill the AI Showcase

The Showcase is correctly built but nearly empty: `data/showcase.json` holds 2 pieces, both
crediting `openai-sora` (which our own data marks discontinued), with 1 published prompt
each. An asymmetric editorial gallery needs a wall to be a wall, and the recipe layer must
not teach people to use a tool that no longer exists.

Fill it in three passes. Invent nothing at any point.

---

## Pass 1 — the maker's own films are the anchors

The person who built First Frame is an AI filmmaker. Their own work goes in the showcase as
the featured anchor pieces, because they are the only pieces whose recipe can be documented
*completely* — every tool, every prompt, every failed attempt. That completeness is the whole
point of the recipe layer.

Source films are in the repo:

- `references/slimetime/slimetime.mp4` — 1920×1080, 8:01
- `references/other_shorts/destiny.mp4` — 1920×1038, 5:25
- Ask whether there are others. Do not assume any file in `references/` is the maker's own
  work — `references/disney_pixar_shorts/` is third-party study material and must never
  appear in the showcase.

### 1a. Derive what a machine can derive

For each of the maker's films, compute from the file itself and record it — do not estimate:

- exact runtime, resolution, aspect ratio, frame rate
- shot count, via luma-histogram cut detection (the same technique already used in
  `detector.html`); record the detected cut timestamps
- a dominant colour palette per act or per major sequence, extracted from real frames
- a representative poster frame, exported and committed to `assets/showcase/`

Write these into the piece as `derived: { ..., method: "...", derived_on: "<ISO date>" }`
so it is clear which fields were measured rather than reported.

### 1b. Ask the maker for what only a human knows

Do **not** guess these. Emit a short filled-in-as-far-as-possible questionnaire per film and
ask for the rest:

- title, year, one-sentence synopsis
- every tool used, mapped to a step: image / motion / voice & sound / edit / other
- the workflow in the order it actually happened
- the real prompts they are willing to publish
- roughly how many attempts per usable shot
- **what went wrong and how they solved it** — this is the most valuable field on the page
- a public link if the film is online, and whether it may be listed publicly

### 1c. Hosting

The 60–90 MB source files must not be committed. Prefer a public or unlisted YouTube/Vimeo
embed. If the maker does not want the film hosted publicly, support a poster-plus-recipe
entry with no playable video and a clear label, rather than a broken player.

### 1d. Credit honestly

Credit the maker by name and mark these pieces as made by the First Frame maker. Do not
disguise them as community submissions.

---

## Pass 2 — unblock the tool catalogue

You excluded *The Frost* because DALL·E 2 was missing from `ai_tools.json`. Correct instinct,
wrong fix: **add the missing tool rather than dropping the film.**

Add any tool a verified showcase piece genuinely used but that we do not yet catalogue,
following the existing tool schema and the same verification rules — official sources,
`verified_on`, `null` wherever unverified, and an honest `status`. Historic and discontinued
tools are welcome and useful; they teach how the field moved.

---

## Pass 3 — widen the public set to 12–18 total

Sourcing net: AI film festival selections and winners (e.g. Runway's AI Film Festival),
pieces with published director interviews or making-of writeups, tool-maker showcase films,
documented music videos and commercials, and independent or student work whose process is
publicly documented.

Per piece, unchanged hard requirements:

1. a named creator
2. a working HTTPS source for the work itself
3. at least one independent source documenting how it was made

If you cannot meet all three, skip it and list it in your report.

**Diversity rules:**

- spread across jobs and tools — image models, video models, editors, voice — not one tool
  repeated
- at most 3 pieces may share a primary tool
- at least 2 pieces must use tools that are **currently available**, so a learner has a path
  they can follow today

---

## Recipes — deeper, and never fabricated

One prompt per film is too thin to teach from. For every piece capture what is genuinely
documented: the ordered workflow, the tool at each step, shot count where stated, prompts
the creator actually published, the problems they hit and how they solved them, and 3–6
`craft_ids` the work demonstrates.

**Never write a prompt the creator did not publish.** If prompts were not published, leave
the array empty and say so on the card — "prompts not published by the creator" is honest,
and the workflow is still the lesson.

## Mark what is historic

Where a piece used a now-discontinued tool, label it plainly on the card ("made with a tool
that is no longer available") and link the closest current alternative from `ai_tools.json`.
A dead end becomes a lesson.

## Layout

Re-check the asymmetric layout at 2, 6, 12 and 18 pieces. It must look composed at every
count, and the empty state must still look deliberate.

---

## Verify

`npm test` green. Extend the showcase tests to assert:

- a minimum piece count
- no single primary tool covers more than 3 pieces
- every `tool_id` resolves in `ai_tools.json`
- every `craft_id` is in `CITABLE_IDS`
- every piece carries a creator, a source URL, and a making-of source
- `derived` fields on the maker's films record their method and date
- no `references/disney_pixar_shorts/` file is referenced anywhere in the showcase

**Report:** every piece added with its sources, every tool added, the exact questions you
need the maker to answer for their own films, and everything you rejected and why.
