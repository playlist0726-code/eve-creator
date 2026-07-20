# Evaluation — Grounded vs. Naive Prompting

This small internal experiment tests a narrow First Frame claim: whether adding explicit directorial constraints produces an output that better follows those constraints.

> **Hypothesis:** for the same scene, a grounded prompt assembled from ShotSeed fields will follow the requested composition, lighting, color, and style more closely than a minimal descriptive prompt.

## Design

- **Scene:** an autumn-park establishing shot with an older chess player, based on analyzed shot id 9.
- **Controls intended:** same scene content, generating model, aspect ratio, and number of attempts.
- **Manipulated variable:** presence or absence of explicit directorial constraints in the prompt.

### Condition A — naive prompt

```text
an old man playing chess alone in an autumn park
```

This states the subject but leaves composition, lighting, palette, and style unspecified.

### Condition B — grounded prompt

```text
cozy autumn park, a lone elderly man at a green chess table between two park benches,
red and golden foliage, warm afternoon backlight, stylized 3D animation, wide establishing
shot, painterly bokeh — palette: warm amber #9B6226, gold #D5A058, red foliage #C0392B,
green table #6B7B3A, sky #A9C8E0
```

### Field-to-prompt mapping

| ShotSeed field | Prompt direction |
|---|---|
| Framing: Wide | “wide establishing shot” |
| Angle: Eye level / slightly high | implied by the composition direction |
| Lighting: warm backlight | “warm afternoon backlight” |
| Palette | named colors plus hex values |
| Source treatment | “stylized 3D animation” |

## Internal rubric

Each output was scored 1–5 on:

1. Composition fidelity to the requested wide establishing frame.
2. Lighting and mood fidelity to warm backlight and late-afternoon tone.
3. Color consistency with the requested autumn palette.
4. Style consistency with stylized 3D animation.
5. Directorial intentionality: generic result versus deliberately staged shot.

## Required artifacts

- `images/naive_A.png`
- `images/grounded_B.png`
- `RESULTS.md`

The original images are not currently committed. Until they are added with model/settings/date metadata, this remains a documented internal observation rather than independently auditable evidence.

## Limitations

- One scene is not a benchmark and cannot establish general performance.
- The author created the rubric and scored the outputs; a blind second evaluator was not used.
- Aesthetic judgment is subjective even with disclosed criteria.
- The grounded output reportedly failed the requested subject count, showing that detailed prompting does not guarantee every constraint.
