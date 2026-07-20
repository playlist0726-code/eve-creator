# Evaluation Results — Grounded vs. Naive

> This is a single internal prompt comparison, not a benchmark or user study. See `EXPERIMENT.md` for the design and prompts. The source images referenced below are not currently included in the repository, so the numeric score is not yet independently auditable.

## Compared conditions

| | Condition A — Naive | Condition B — Grounded |
|---|---|---|
| Prompt | `an old man playing chess alone in an autumn park` | ShotSeed assembly specifying framing, lighting, palette, and style |
| Image | `images/naive_A.png` — **not committed** | `images/grounded_B.png` — **not committed** |
| Recorded observation | Photoreal, one person, medium shot, natural light | Stylized 3D, wide establishing shot, warm backlight, autumn palette |

## Internal rubric (1–5)

| Criterion | A (Naive) | B (Grounded) | Recorded observation |
|------|:---:|:---:|------|
| 1. Composition fidelity (wide establishing shot) | 2 | 5 | A was recorded as medium and asymmetric; B centered the table and used benches/trees to frame a wide establishing view. |
| 2. Lighting and mood (warm backlight) | 2 | 5 | A used diffuse natural light; B showed a warm rim and late-afternoon tone. |
| 3. Color consistency (autumn palette) | 3 | 5 | A used muted brown/olive; B followed amber, gold, red, green, and blue palette directions. |
| 4. Style consistency (stylized 3D) | 1 | 5 | A was photoreal; B followed the requested stylized 3D direction. |
| 5. Directorial intentionality | 2 | 5 | A read as a generic image; B read as a deliberately staged opening frame. |
| **Total** | **10 / 25** | **25 / 25** | |

## Qualitative notes

- **A (Naive):** The recorded output filled unspecified direction with common defaults: photorealism, medium framing, and natural light. It represented the subject but not a deliberate animation look, palette, or cinematic composition.
- **B (Grounded):** The recorded output followed more of the structured direction: wide framing, warm backlight, autumn colors, stylized 3D treatment, and staged environmental elements.

### Limitations

- The grounded prompt requested one person, but the recorded output rendered two. Structured direction improved composition, lighting, color, and style but did not guarantee subject count.
- This is one example, scored by the project author on a custom rubric. It does not establish general model performance or learning impact.
- Because the two source images are missing from the repository, judges cannot currently reproduce the visual scoring from the committed artifacts alone.

## Conclusion

The recorded result supports the narrow hypothesis that more explicit directorial constraints can improve adherence on the selected composition, light, color, style, and intentionality criteria. It should be presented as an internal case study, not as proof that First Frame improves every generation.

## Reproduction information

- Aspect ratio: 16:9
- Reference scenario: an establishing shot inspired by the analyzed chess-short dataset (shot id 9)
- Controlled variable: prompt wording; naive vs grounded
- Required next step: commit the original `naive_A.png` and `grounded_B.png`, record the generating model/settings/date, and have a second evaluator score blind.
