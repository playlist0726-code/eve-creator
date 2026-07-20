# AI Art and AI Filmmaking Pain Points

Research date: 2026-07-20. This is a qualitative scan of community posts, open research, and official learning resources. “Frequency” is an ordinal judgment from recurrence across the cited sources—not a fabricated population statistic.

## Ranked findings

| Rank | Pain | Audiences | Frequency × severity | Evidence |
|---|---|---|---|---|
| 1 | Cross-shot character, setting, and style consistency | Beginners; film students | Very high × very high | Creators report faces, outfits, worlds, and tone drifting between clips even with reused prompts or seeds ([10+ clips](https://www.reddit.com/r/aivideomaking/comments/1t7h00s/how_do_you_keep_a_character_consistent_across_10/), [consistency workflow](https://www.reddit.com/r/aivideos/comments/1ubsrry/the_hardest_part_of_ai_video_is_not_quality/)). FilmWeaver calls character/background consistency across shots a critical multi-shot challenge ([AAAI](https://ojs.aaai.org/index.php/AAAI/article/view/37711)). |
| 2 | “Where do I start?” and fragmented workflows | Beginners; kids/learners | Very high × high | A beginner asks how separate image, video, and music tools become one structured film workflow and what budget is realistic ([AI filmmaking](https://www.reddit.com/r/aifilmmaking/comments/1srqtc4/complete_beginner_in_ai_filmmaking_how_did_you/)). Stable Diffusion beginners ask for a roadmap and report being overwhelmed by models, LoRAs, VAEs, and interfaces ([roadmap](https://www.reddit.com/r/StableDiffusion/comments/1c9aft1), [overwhelmed](https://www.reddit.com/r/StableDiffusion/comments/18u1cyl)). |
| 3 | Tool overload, jargon, and subscription/compute cost | Beginners; film students | High × high | A small studio wants stability without separate subscriptions for every model and a workflow a non-technical editor can run ([Reddit](https://www.reddit.com/r/aivideomaking/comments/1t7h00s/how_do_you_keep_a_character_consistent_across_10/)). Another beginner asks for an “ELI15” explanation after abandoning Stable Diffusion when overwhelmed ([Reddit](https://www.reddit.com/r/StableDiffusion/comments/1atsfuu)). LTX uses finite computing credits, illustrating that experimentation consumes paid resources ([TechRadar](https://www.techradar.com/pro/software-services/ltx-studio-ai-video-production-review)). |
| 4 | Prompt literacy without understanding visual craft | All three | High × high | Beginner threads focus on copied syntax and unfamiliar technical terms rather than why an image works ([Reddit](https://www.reddit.com/r/StableDiffusion/comments/18u1cyl)). A GenAI education review identifies AI literacy, critical thinking, ethical practice, and hands-on project work as core needs ([review](https://arxiv.org/abs/2504.19673)). |
| 5 | Temporal flicker and weak motion control | AI-video makers; film students | High × high | Frame-wise processing creates temporal inconsistencies ([ACM TOG](https://doi.org/10.1145/2816795.2818107)); character animation research calls detailed temporal consistency a continuing challenge ([CVPR 2024](https://openaccess.thecvf.com/content/CVPR2024/html/Hu_Animate_Anyone_Consistent_and_Controllable_Image-to-Video_Synthesis_for_Character_Animation_CVPR_2024_paper.html)). |
| 6 | Authorship, ethics, and fear that AI replaces learning | Kids/learners; film students | Medium-high × high | Filmmakers distinguish supportive pre-production use from replacing the human reason for creating ([Reddit](https://www.reddit.com/r/filmmaking/comments/1tsenhj/ai_in_filmmaking/)). A systematic review reports student concern about authorship, reduced creativity, over-reliance, trust, and ambiguous rules ([review](https://www.sciencedirect.com/science/article/pii/S2666920X25001274)). |
| 7 | No useful feedback loop | Beginners; kids/learners | Medium × high | Education research emphasizes critical evaluation and informed use rather than generation alone ([framework](https://arxiv.org/abs/2504.19038)). Runway’s separate tutorial library also indicates that creation tools do not eliminate the need for guided learning ([Runway Academy](https://academy.runwayml.com/)). |
| 8 | Inaccessible shots, VFX, locations, actors, and drawing skill | Film students; solo creators | Medium × medium-high | A filmmaker describes lacking VFX resources while debating AI’s proper role ([Reddit](https://www.reddit.com/r/filmmaking/comments/1tsenhj/ai_in_filmmaking/)). A solo-creator discussion identifies inability to draw the film in one’s head as a production barrier ([Reddit](https://www.reddit.com/r/u_AlternativeClassic29/comments/1utgefk/storyboarding_when_you_cant_draw_the_prep_that/)). |

## Audience synthesis

- **AI-video beginners:** need a first successful route, plain-language craft, and continuity instructions—not another model list ([beginner thread](https://www.reddit.com/r/aifilmmaking/comments/1srqtc4/complete_beginner_in_ai_filmmaking_how_did_you/)).
- **Kids and art learners:** need active, age-appropriate making plus ethical reflection. Constructionist activities with ages 10–12 addressed fairness, bias, and transparency ([AAAI](https://ojs.aaai.org/index.php/AAAI/article/view/35190)); an arts-based primary study supports creative transdisciplinary AI literacy ([Cambridge](https://www.repository.cam.ac.uk/items/2c9b043a-27d0-4bb0-af36-de6cd58f04fd)).
- **Film/media students:** need a bridge between film language and changing AI tools while preserving authorship. Runway’s education program explicitly combines filmmaking education with AI experimentation ([Runway](https://runwayml.com/solutions/industry/education)).

## Gap analysis

| Pain | Coverage | Product evidence | Gap |
|---|---|---|---|
| Starting from nothing | Partial | Intake and five-step Create pipeline | No one-click bounded practice project. |
| Prompt/craft literacy | Strong | Film School; 111 tap-to-learn citations; copyable prompts | Lessons are not sequenced into a course. |
| Feedback on quality | Strong | Creator’s Room critique, fixes, and re-score | No peer/teacher feedback or saved review history. |
| Tool overload | Partial | AI Tools routing and per-shot recommendations | Minimum viable three-tool path is not prominent. |
| Cross-shot consistency | Partial | Per-shot prompts and director lens | No explicit continuity bible/anchor checklist. |
| Flicker/motion failure | Partial | I2V prompts and model routing | No clip inspection or temporal checker. |
| Ethics/authorship | Partial | Footage Lab media-literacy checklist and “you make it” framing | No authorship reflection checkpoint in Create. |
| Cost/access | Partial | Routing and fallback demo | No budget estimator or credit-aware plan. |

## Priority gaps to close now

1. One-click beginner practice briefs that prefill Concept Lab.
2. A Storyboard Continuity Kit: reusable anchor prompt plus identity/wardrobe/prop/palette checklist.
3. An explicit minimum viable stack: one still model, one motion model, one editor.

Reference uploads, automated clip analysis, budgets, accounts, and peer review remain proposals in [win_audit.md](win_audit.md) because they add storage, media processing, privacy, or demo risk.
