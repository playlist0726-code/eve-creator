# First Frame — demo video production bible
**Final target: 2:55 · Hard limit: 3:00 · Public YouTube**

Everything below is decided. Record the three missing clips, then assemble in the order given.

---

## Why the structure is what it is

The contest is called **Build with Codex**, and criterion #1 is how thoroughly and skilfully
you used Codex. So the video is built to peak *twice*:

1. **The Creator's Room** — proves the product idea is not ordinary.
2. **The Codex conversation** — proves one person actually built it, and how.

Most entrants will show a product and *say* "built with Codex". Showing the real
conversation — a prompt, the agent working, a genuine bug it caught, the fix, the test that
now guards it — is the single most persuasive thing you can put on screen for this
particular jury. That is the climax, and it goes near the end.

---

# What still needs recording

## ⑥ The Codex conversation — 30 seconds — **the most important clip in the video**

**Yes, show the actual conversation. That is exactly what they want to see.**

Record your **real** Codex history, not a staged demo. A long scrollback of real work is
itself the evidence.

**Before recording:**
- Increase the font size until text is comfortably readable at 1080p (`Cmd +` several times).
- **Scan for secrets.** No API keys, tokens, `.env` contents, or personal paths on screen.
  If anything sensitive appears, blur it in the edit — this is non-negotiable.

**What to capture, in this order:**

1. **Scroll the history fast** (~5s) — many turns flying past. This alone says "months of
   real work", not a weekend prototype.
2. **Stop on one substantial prompt you actually wrote** (~7s). The best choice is the
   self-audit instruction — the one asking Codex to find what a senior engineer would call
   inadequate and fix it. Let it sit long enough to read a line or two.
3. **Codex working** (~8s) — reading files, editing, the tool calls streaming.
4. **The result** (~10s) — the changed-files list and a diff. Ideally scroll to the moment it
   reports the security finding.

If your history no longer shows the XSS discovery, run a fresh small task and record that
instead — but keep the narration honest about which one you are showing.

## ⑦ The enforcement code — 12 seconds

This turns a spoken claim into visible proof.

1. Open `lib/craft-knowledge.js` — scroll the **111 IDs** so the length is obvious (~6s).
2. Open `api/generate-story.js` — show the **`filterCitations`** function (~6s).

Large font. No cursor jitter. Just scroll and hold.

## ⑤ Re-record the terminal — 15 seconds

The existing take is unreadable at 1080p. Press `Cmd +` five or six times, shrink the window
to about half the screen, then run `npm test` and hold three seconds on the six green lines.

## ② Optional but high value — re-record with a live key

Right now `2-concept` falls back, and the film that follows is the chess demo rather than
your paper boat. In a GPT-5.6 contest, showing the model actually running is worth a lot.

```
cd ~/Desktop/my-short-film
npx vercel dev
```
with `OPENAI_API_KEY` in `.env.local`. Never paste the key anywhere but that file.

If it works, re-record `2-concept` only. Nothing else in this plan changes.

---

# The assembly — exact order and timings

| # | Section | Source | In→Out | Length |
|---|---|---|---|---|
| 1 | The problem | `1-home` | 0:03 → 0:21 | 0:18 |
| 2 | One idea → a plan | `2-concept` | typing at 2×, then 0:36→0:47 | 0:22 |
| 3 | **The Creator's Room** | `3-crew` | full clip | 0:34 |
| 4 | **The guarantee** | ⑦ new | full | 0:12 |
| 5 | The breadth | `4-tour` | four passages, see below | 0:34 |
| 6 | **Built with Codex** | ⑥ new | full | 0:30 |
| 7 | The proof | ⑤ new | full | 0:12 |
| 8 | The close | `1-home` tail | reuse | 0:13 |
| | | | **total** | **2:55** |

### Which four passages from `4-tour`
Trim hard — 8–9 seconds each, no more.

- **0:24 → 0:33** — Learn: "Learn film language. Then direct with AI." + a lesson
- **0:54 → 1:03** — Showcase: the dark wall, Air Head / The Hardest Part
- **1:42 → 1:51** — AI Tools: the Veo profile and the library grid
- **0:06 → 0:13** — Shot Design and the storyboard panels

---

# The narration, section by section

Record these as eight separate audio files, named to match. Speak slightly slower than feels
natural, and leave the marked pauses genuinely silent.

### 1 — The problem · over `1-home`
```
Two kinds of people ask me how to make video with AI, and they are stuck in opposite ways.
One studied film, and is watching the tools they trained on get replaced.
One never studied film, and has no idea why their four-second clip feels like nothing.
Neither problem is solved by a better model.
First Frame teaches both — the tools, and the craft.
```

### 2 — One idea → a plan · over `2-concept`
```
You bring one idea. Nothing else.
The idea goes to GPT-5.6 through the Responses API, under a strict JSON schema.
So what comes back is not an essay. It is a structured five-act plan —
acts, shots, durations, camera and lighting direction,
and an image and video prompt for every shot.
It also scores the concept honestly. This one came back weak, and said so.
```

### 3 — The Creator's Room · over `3-crew`
```
Then the part I care about most.
The plan is handed back to GPT-5.6 in a second, separate pass — as a crew.
A Director, a Writer, a Cinematographer, an Editor, and a Test Audience.
```
**[ 4 seconds of silence — let the crew cards be read ]**
```
Each one criticises the plan from its own discipline,
cites the craft principle it is invoking, and proposes a concrete fix.
Seventy, to seventy-six. A gain of six — and you can see exactly which change earned it.

This is the difference between a generator and a teacher.
A generator hands you an answer.
A teacher shows you a draft, tells you what is weak, fixes it in front of you,
and names the principle.
And it ends by telling you what you just learned.
```

### 4 — The guarantee · over ⑦ the code
```
Two things make that trustworthy.
The crew can only cite from an allowlist of a hundred and eleven craft concepts.
Anything the model invents is dropped server-side, before it ever reaches the page.
And because the crew grades its own work, the score gain is capped —
so it cannot award itself a triumphant improvement.
```

### 5 — The breadth · over `4-tour`
```
A hundred and eleven concepts, each written twice — once for traditional filmmaking,
once for AI video, with honest notes on where the AI route breaks.

Real AI films by credited creators, each shown with its recipe.
Ten of the twelve published no prompts, so those cards say so,
rather than inventing something plausible.

Fifty-three tools, catalogued around the questions nobody answers —
what it really costs, and whether you may use the output commercially.

And shot design grounded in analysed reference frames,
where every storyboard panel carries its own prompt.
```

### 6 — Built with Codex · over ⑥ the conversation · **[REQUIRED]**
```
Every line of this was built with Codex.
I directed it the way you direct a crew — I set the intent and the constraints,
Codex wrote the implementation.
```
**[ 3 seconds of silence — let the history scroll ]**
```
And then I asked it to audit its own work, as a senior engineer would.
That audit found a real cross-site scripting bug in my shot recommender before launch,
and a stale cached script that was silently hiding an entire section of the site.
I did not find those. It did.
```

### 7 — The proof · over ⑤ the terminal
```
Both are now covered by regression tests.
Six suites, running in CI. No build step, no dependencies.
```

### 8 — The close · over `1-home`
```
The gap is not capability. The tools are astonishing. The gap is confidence.
Nobody who wants to make something should have to stand
in front of an empty first frame alone.
```

---

# Editing

1. Lay the eight sections in order on the timeline.
2. Trim each to the in/out points in the table. **Delete every loading spinner.**
3. `2-concept`: select the typing → Speed → **2×**.
4. Drop the narration underneath and slide each file until it lands on the right screen.
5. **Burn in five small section labels**, bottom-left, ~2s each, then fade:
   *Concept Lab · The Creator's Room · Film School · AI Tools · Built with Codex*
   Many judges watch muted first. Labels do not replace the audio requirement.
6. **Cuts, not dissolves.** One exception: a short dissolve into the final home shot.
7. Music: quiet, single bed across the whole video, ducked 6dB under every narration line.
   It should build slightly into section 6 and resolve on the last line.
8. Export **1080p**.

## Before you upload — final check

- [ ] Under 3:00
- [ ] The words **Codex** and **GPT-5.6** are both clearly audible
- [ ] **No API key, token, or `.env` content visible in any frame**
- [ ] Text in the Codex, code, and terminal clips is readable at 1080p
- [ ] No loading spinners survive
- [ ] Uploaded as **Public**, not Unlisted
- [ ] Live URL and repo link in the YouTube description

---

## The one line that decides it

Section 6 ends with **"I did not find those. It did."**

Everyone will claim they used Codex. Almost nobody will show Codex catching a real security
bug in their own code and then admit the agent found it and they did not. That sentence, over
footage of the actual conversation, is what a technical judge remembers.
