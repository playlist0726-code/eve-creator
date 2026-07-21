# First Frame — Feature Tour (seamless one-take)
**Runtime:** ~24s · **6 cuts joined by 5 bridges** · **16:9** · **Reads as one unbroken shot**

Companion to `OPENING_BRIEF.md`. The opening establishes the brand; this shows what the
product does. They can run back to back (14s + 24s) or ship separately.

---

# 1. THE BRIDGE SYSTEM — how the cuts actually overlap

This is the part that makes it seamless. Do not skip it.

You generate **5 bridge images (B1–B5)** — one for each junction. Each bridge image is
generated **once** and then used **twice**: as the END of the cut before it, and as the
START of the cut after it. The two clips therefore resolve to a **physically identical
frame**, which means you can overlap them and the join is invisible.

```
   B0        B1        B2        B3        B4        B5        B6
    |  CUT 1  |  CUT 2  |  CUT 3  |  CUT 4  |  CUT 5  |  CUT 6  |
    └─────────┴─────────┴─────────┴─────────┴─────────┴─────────┘
              ↑ same image ends cut 1 AND starts cut 2
```

**Generation:** use first-frame + last-frame conditioning (i2v with start and end image).
Cut N is generated with `start = B(n-1)`, `end = B(n)`.

**Editing:** at every junction, **overlap the two clips by 8–10 frames** and cross-dissolve
across the overlap. Because both clips land on the same still, the dissolve reads as a
continuous camera move, not a transition.

### Motion continuity — the other half of the trick

An identical still is not enough. The character must be travelling in the **same direction,
at the same speed, at the same size** on both sides of the bridge, or the overlap stutters.

| Bridge | Character is… | Direction | Screen size | Camera is… |
|---|---|---|---|---|
| **B1** | mid-leap, arms forward | → into frame depth | ~15% frame height | pushing in |
| **B2** | sliding, crouched low | ↘ down-right, fast | ~20% | tracking right |
| **B3** | lifted, spinning | ↑ upward | ~25% | craning up |
| **B4** | tumbling, reaching out | ↓ falling into frame | ~18% | settling |
| **B5** | mid-jump, arms spread | → forward, airborne | ~12% | pulling back |

**Rule:** if the character exits frame right at a given height, they enter the next cut
from frame left at that same height. Never let them stop moving at a bridge — a stationary
character at a junction kills the illusion instantly.

---

# 2. THE WORLD

The mascot moves through **floating panels of light** — abstracted versions of the real
product screens, suspended in near-black space. Warm amber and cool cyan. Panels have depth
and parallax so the camera can fly between and behind them.

> **Critical.** Video models cannot render legible UI text. Never ask for screenshots or
> readable labels — you will get garbled glyphs and it will look cheap. Ask for **abstract
> UI geometry**: bars, chips, panels, colour swatches, grids. Composite the real UI, text
> and callouts on top afterwards. **The generated video is the stage, not the interface.**

**Lock the character:** feed your mascot as a reference image on *every single* generation.

---

# 3. THE BRIDGE IMAGES (generate these first)

Generate all seven stills before you generate a single video clip. Everything depends on them.

### B0 — opening still (start of Cut 1)
```
A small round cartoon character with a hero cape, standing on a floating dark platform in a
vast near-black space, seen in a wide shot from the side. In front of them hovers a single
large softly glowing rectangular panel of pale light, empty except for one thin blinking
line suggesting a text cursor. No readable text anywhere. Warm amber light from the panel
falls on the character. Volumetric haze, deep negative space, cinematic wide composition,
matte black background, soft film grain. Character matched exactly to the reference image.
```

### B1 — the leap *(ends Cut 1 · starts Cut 2)*
```
The caped round cartoon character mid-leap, arms forward and cape streaming behind them,
launching toward a glowing rectangular panel whose centre has opened into a warm portal of
light. The character is silhouetted against the opening, roughly one sixth of the frame
height, travelling into the depth of the frame. Motion blur on the cape and trailing limbs.
Near-black space, volumetric haze, soft film grain. Character matched exactly to the
reference image.
```

### B2 — the slide *(ends Cut 2 · starts Cut 3)*
```
The caped round cartoon character sliding fast down a long glowing ribbon divided into five
coloured segments, curving down and to the right through near-black space like a slide. The
character is crouched low with one hand trailing on the ribbon, cape whipping behind, moving
at speed toward the lower right of frame. Small glowing card-shaped panels float alongside
the ribbon on both sides. Strong motion blur, dynamic diagonal composition, warm amber and
cyan light, volumetric haze, soft film grain. Character matched exactly to the reference image.
```

### B3 — the launch *(ends Cut 3 · starts Cut 4)*
```
Interior of a ring of five glowing panels in near-black space. Five identical caped cartoon
characters have raised their arms toward the centre, and beams of warm light converge on a
sixth identical character in the middle, who is lifted off the ground and spinning upward,
cape flaring outward. Behind them a tall vertical bar of light has risen high up the frame.
The central character is travelling upward, motion blurred. Dramatic upward light, strong rim
lighting, volumetric haze, soft film grain. All characters matched exactly to the reference image.
```

### B4 — the catch *(ends Cut 4 · starts Cut 5)*
```
The caped round cartoon character landing in a crouch, one hand down, on the edge of one
large glowing rectangular panel, while behind and around them dozens of similar panels have
arranged themselves into a clean receding grid stretching away into near-black space. Each
panel glows with its own soft colour field and a small row of coloured palette dots beneath
it. Thin bright connecting lines link a few panels to one another. Wide cinematic
composition with strong depth, volumetric haze, soft film grain. Character matched exactly
to the reference image.
```

### B5 — the jump *(ends Cut 5 · starts Cut 6)*
```
The caped round cartoon character at the end of a filmstrip path of glowing panels,
mid-jump off the final panel with arms spread wide, airborne and travelling forward,
silhouetted against a huge wall of warm light opening up in front of them. Motion blur on
the leap. Near-black surround, volumetric haze, soft film grain. Character matched exactly
to the reference image.
```

### B6 — final still (end of Cut 6)
```
A wide cinematic shot of a vast dark gallery space, its far wall covered edge to edge with a
grid of glowing rectangular panels, each showing a different soft abstract composition of
colour — like a wall of films playing. Several small caped cartoon characters stand scattered
across the dark floor, seen from behind, small against the enormous glowing wall, looking up
at it. Light spills warm across the floor and rims every silhouette. Extreme wide shot with
deep negative space, matte black surround, volumetric haze, soft film grain. Characters
matched exactly to the reference image.
```

---

# 4. THE CUTS

Each cut: `start image → end image` + the motion prompt.

## CUT 1 — The Idea (0.0–4.0s) · *Intake* · **B0 → B1**
```
The caped character stands before a single glowing empty panel. A thin line of light writes
itself across the panel from left to right, as if an idea is being typed. The panel pulses
warm and its centre opens into a portal of light. The character takes two running steps and
leaps toward the opening, cape streaming behind, still airborne as the shot ends. The camera
pushes in with the leap. One continuous move, no cuts, no readable text.
```

## CUT 2 — The Blueprint (4.0–8.0s) · *Concept Lab* · **B1 → B2**
```
The character flies through the portal and lands on a glowing ribbon. The ribbon immediately
builds outward from the landing point, unfolding into five distinct coloured segments that
stretch away into the distance while small glowing card panels rise alongside it. The
character straightens, drops into a crouch and slides forward down the ribbon as it curves
away to the lower right, still sliding at speed as the shot ends. The camera tracks alongside.
One continuous move, no cuts, no readable text.
```

## CUT 3 — The Crew (8.0–13.0s) · *The Creator's Room* · **B2 → B3** — the hero beat, longest cut
```
The character slides off the end of the ribbon and lands in the centre of a ring of five
glowing panels. Five identical caped characters step forward from the panels, one after
another in sequence, each raising an arm toward the centre. Beams of warm light converge on
the character in the middle, who is lifted off the ground and begins to spin. Behind them a
vertical bar of light climbs rapidly upward like a score rising. On the final beat the five
push, and the central character is launched upward, spinning and trailing light, still
rising as the shot ends. The camera cranes up to follow. Continuous, building, triumphant.
No cuts, no readable text.
```

## CUT 4 — The Reference Frames (13.0–17.0s) · *Shot Design* · **B3 → B4**
```
The character tumbles through space as glowing rectangular panels rush past at different
depths, each blooming with soft colour fields and a small row of palette dots as it passes.
The character reaches out, catches the edge of one large panel, and swings down into a crouch
landing on it. As they land, the surrounding panels snap into an ordered grid receding into
the distance, and thin lines of light draw themselves between related panels. The camera
settles from chaotic motion into a stable wide shot. Continuous, no cuts, no readable text.
```

## CUT 5 — The Storyboard (17.0–21.0s) · *Storyboard + prompts* · **B4 → B5**
```
The character rises from the crouch and starts to run forward. With each footfall a new
glowing rectangular panel snaps into existence beneath them, building a filmstrip path ahead
in real time. As they pass each panel, small abstract blocks of glowing lines peel off it and
drift upward like released prompts. At the end of the path the character launches off the
final panel with arms spread, airborne as the shot ends. The camera tracks alongside in a
fast smooth side-on move. Continuous, energetic, no cuts, no readable text.
```

## CUT 6 — The Audience (21.0–24.0s) · *Showcase* · **B5 → B6**
```
The character sails forward through the air. The camera pulls back rapidly and the space
opens out into a vast dark gallery, revealing an enormous wall filled with a grid of glowing
panels, each alive with soft moving colour. The character lands softly among several other
small caped characters standing on the dark floor, all looking up at the wall. The camera
comes to rest on the wide shot and holds. The motion decelerates and settles. Continuous,
no cuts, no readable text.
```

### Optional Cut 7 — resolve into the wordmark
Reuse **Cut 5 of `OPENING_BRIEF.md`**: the wall of panels compresses inward and locks into
the **FIRST FRAME** wordmark, one small caped character on the baseline.

---

# 5. SOUND DESIGN — cute, light, toy-like

**Palette:** soft mallet percussion (marimba, glockenspiel, kalimba), rounded synth pops,
tiny bells, gentle whooshes with no harshness, a small spring "boing". **No** metallic
clangs, no cinematic braams, no dubstep hits. Everything short, rounded, and a little
bouncy — like a well-made toy. Keep every effect **quiet under the music**; SFX should feel
like sparkle on top, not a competing layer.

**Every cue lands on the character's body, not on the edit.** The sound belongs to what the
mascot does — that is what sells the one-take feel.

| Time | Action | Sound |
|---|---|---|
| 0.4s | idea writes across the panel | light typewriter patter, soft and quick, ending on a tiny bell |
| 1.6s | panel opens into a portal | warm ascending whoosh with a shimmer tail |
| 2.6s | two running steps | two soft rounded footstep pops |
| **3.0s** | **the leap** | **springy "boing" + rising whoosh** |
| 4.2s | landing on the ribbon | soft cushioned thump, no impact crack |
| 4.6–6.0s | five segments unfold | **five ascending marimba notes**, one per segment |
| 6.4s | drops into the slide | playful descending glissando |
| 6.4–8.0s | sliding | gentle continuous whoosh, pitch drifting down |
| 8.4s | lands in the ring | soft thump + a small bell ring-out |
| 8.8–10.8s | five crew step forward | **five rounded synth pops rising in pitch**, evenly spaced |
| 11.0s | beams converge | warm harmonic swell, gathering |
| 11.6s | score bar climbs | quick ascending arpeggio, bright and bouncy |
| **12.4s** | **the launch** | **big springy boing + sparkle burst + upward whoosh** |
| 13.2–15.0s | panels rush past | soft airy flutters, several, panned across the stereo field |
| 15.4s | catches the panel | light grab "tick" |
| 15.8s | landing crouch | cushioned thump |
| 16.2s | grid snaps into place | **rapid cascade of tiny clicks**, settling |
| 16.6s | connecting lines draw | thin shimmering slide |
| 17.4–20.6s | running footsteps | **light rhythmic footstep pops in time with the music** |
| 17.4–20.6s | panels snap under each step | a soft "pop" per footfall, pitched slightly up each time |
| 18.0–20.6s | prompts peel off and float up | small airy sparkles drifting upward |
| **21.0s** | **the jump** | **boing + wide airy whoosh** |
| 21.4s | the gallery opens | big soft reveal swell, warm and welcoming |
| 22.4s | lands among the others | soft cushioned landing |
| 23.0s | wall of films settles | gentle glittering shimmer, fading out |
| 23.6s | final hold | one warm resolving chime |

### SFX generation prompts

Generate as separate one-shots (ElevenLabs Sound Effects or similar) and place them by hand.

```
A cute springy cartoon boing, soft and rounded, short, toy-like, warm and friendly, no
metallic ring, clean tail.

A light warm ascending whoosh with a soft shimmer tail, gentle and airy, like a friendly
portal opening, no harsh high frequencies.

A short soft cushioned cartoon landing thump, rounded and gentle, like landing on a
cushion, no impact crack.

Five ascending marimba notes, warm and wooden, evenly spaced, cheerful and bouncy, clean
short decay.

A rounded synth pop, soft and bubbly, short, like a friendly bubble bursting, warm and
toy-like.

A rapid cascade of tiny soft clicks settling into place, light and delicate, like small
tiles snapping into a grid, no harshness.

Light rhythmic cartoon footsteps on a soft surface, small and quick, rounded and bouncy,
no scuffing.

A small airy sparkle drifting upward, delicate glittering bells, soft and magical, gentle
decay.

One warm resolving chime, soft mallet struck bell, gentle and hopeful, long clean decay.
```

---

# 6. MUSIC

```
A 24-second cinematic build for a product demo. Opens sparse and curious — a single soft
piano note and a light synth pulse. A rhythmic element enters around 4 seconds and the
groove steadily builds. At 8 seconds it lifts into a warm, confident, forward-moving theme
with layered synths and light percussion that keeps accelerating. At 13 seconds a bright
swell peaks, then drops briefly to almost nothing for one beat before returning fuller. The
last four seconds open wide and resolve into one sustained hopeful chord that rings out.
Modern, clean, optimistic, tech-forward but human. No vocals, no heavy bass drops.
```

Duck the music ~2dB under the three big SFX moments (3.0s, 12.4s, 21.0s) so the boings
land clearly without fighting the mix.

---

# 7. POST CHECKLIST

- [ ] Generate **B0–B6 first**. Nothing else starts until the seven stills are locked.
- [ ] Generate each cut with first-frame + last-frame conditioning.
- [ ] **Overlap 8–10 frames at every junction** and cross-dissolve across the overlap.
- [ ] Check motion continuity at each bridge — same direction, speed, and character size.
- [ ] Composite the real UI, text and callouts on top of the floating panels.
- [ ] One feature name per cut: *Concept Lab · The Creator's Room · Shot Design ·
      Storyboard · Showcase*.
- [ ] Lay SFX to the character's actions, then nudge the picture so hits land on the beat.
- [ ] **Grade all six clips together at the end** — generated clips drift in colour
      temperature, and the amber must be identical across cuts or the joins reappear.
