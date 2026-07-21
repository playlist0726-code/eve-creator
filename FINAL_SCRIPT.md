# First Frame — final demo video script
**7 sections · 2:42 · under the 3:00 limit**

Assemble in this order. Each section has its clip, its in/out point, and the exact line to say.

---

## 1 · The problem — `1-home` — **0:18**
**Use:** 0:03 → 0:21

```
Two kinds of people ask me how to make video with AI, and they are stuck in opposite ways.
One studied film, and is watching the tools they trained on get replaced.
One never studied film, and has no idea why their four-second clip feels like nothing.
Neither problem is solved by a better model.
First Frame teaches both — the tools, and the craft.
```

---

## 2 · One idea becomes a film — `2-concept` — **0:20**
**Use:** the typing at **2× speed**, then cut to the blueprint at 0:36 → 0:47.
Delete every loading frame.

```
You bring one idea. Nothing else.
It goes to GPT-5.6 through the Responses API, under a strict JSON schema —
so what comes back is not an essay. It is a five-act plan.
Acts, shots, durations, camera and lighting, and a prompt for every single shot.
It also scores your concept honestly. This one came back weak, and said so.
```

---

## 3 · The Creator's Room — `3-crew` — **0:34** ⭐ the heart of the video
**Use:** the whole clip. Do not trim it.

```
Then the part I care about most.
That plan goes back to GPT-5.6 in a second pass — as a crew.
A Director, a Writer, a Cinematographer, an Editor, and a Test Audience.
```
**[ 4 seconds silent — let the crew cards be read ]**
```
Each one criticises the plan from its own discipline, cites the principle behind it,
and proposes a concrete fix. Seventy, to seventy-six.
A gain of six — and you can see exactly which change earned it.

This is the difference between a generator and a teacher.
A generator hands you an answer.
A teacher shows you a draft, tells you what is weak, fixes it in front of you,
and names the principle.
```

---

## 4 · Everything else — `4-tour` — **0:32**
**Use four short passages, 8 seconds each:**
`0:24→0:32` Learn · `0:54→1:02` Showcase · `1:42→1:50` AI Tools · `0:06→0:14` Storyboard

```
A hundred and eleven craft concepts, each written twice —
once for traditional filmmaking, once for AI video.

Real AI films by credited creators, each shown with the recipe that made it.
Ten of the twelve published no prompts, so those cards say so,
instead of inventing something plausible.

Fifty-three tools, with the questions nobody answers —
what it really costs, and whether you may use the output commercially.

And a storyboard where every panel carries its own prompt, ready to generate.
```

---

## 5 · Built with Codex — `6,7-github` — **0:34** ⭐⭐ the closer
**Use four passages:**
- `0:16→0:22` the README title and badges
- `0:34→0:40` the "How GPT-5.6 is used" section
- `0:58→1:08` `lib/craft-knowledge.js` — the 111 IDs scrolling
- `1:20→1:32` `api/generate-story.js` — the `filterCitations` function

```
Every line of this was built with Codex.
I directed it the way you direct a crew — I set the intent and the constraints,
Codex wrote the implementation.
```
**[ 3 seconds silent — let the code scroll ]**
```
And this is what makes it trustworthy.
The crew can only cite from an allowlist of a hundred and eleven craft concepts.
Anything the model invents is dropped server-side, before it ever reaches the page.
Its score gain is capped, so it cannot award itself a triumphant improvement.

I also had Codex audit its own work. That audit found a real cross-site scripting bug
in my shot recommender before launch. I did not find it. It did.
```

---

## 6 · The proof — `5-tests` — **0:12**
**Use:** 0:09 → 0:18 — hold on the six green lines.

```
It is now covered by a regression test. Six suites, running in CI.
No build step, no dependencies.
```

---

## 7 · The close — `1-home` again — **0:12**
**Use:** the last 12 seconds, or the opening hero again.

```
The gap is not capability. The tools are astonishing. The gap is confidence.
Nobody who wants to make something should have to stand
in front of an empty first frame alone.
```

---

# Assembly checklist

- [ ] Clips in the order above, trimmed to the in/out points
- [ ] `2-concept` typing set to **2× speed**
- [ ] Every loading spinner deleted
- [ ] Narration recorded as 7 files, slid to land on the right screen
- [ ] Section labels burned in bottom-left, ~2s each:
      *Concept Lab · The Creator's Room · Film School · Built with Codex*
- [ ] Hard cuts everywhere; one dissolve into the final shot
- [ ] Quiet music bed, ducked 6dB under speech
- [ ] Export 1080p
- [ ] **Repository set to Public** — required, and section 5 shows it on screen
- [ ] Uploaded to YouTube as **Public**
- [ ] Live URL and repo link in the description

## Both required words are spoken
- **GPT-5.6** — sections 2, 3, 5
- **Codex** — section 5

## The line that does the most work
> *"I did not find it. It did."*

Everyone will say they used Codex. Almost nobody will show it catching a real security bug
in their own code and admit the agent found it first. Say that line plainly, without hedging.
