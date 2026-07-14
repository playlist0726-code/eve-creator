const CITABLE_IDS = Object.freeze([
  // knowledge/story_structures.json
  'three_act', 'hero_journey', 'save_the_cat', 'pixar_spine', 'kishotenketsu', 'freytag',
  // knowledge/cinematography.json — shot sizes
  'EWS', 'WS', 'MLS', 'MS', 'MCU', 'CU', 'ECU', 'INSERT',
  // angles
  'eye_level', 'high_angle', 'low_angle', 'overhead_topdown', 'dutch_tilt', 'over_the_shoulder', 'pov',
  // movement
  'static', 'pan', 'tilt', 'dolly_in', 'dolly_out', 'tracking', 'crane_boom', 'handheld', 'steadicam', 'whip_pan', 'crash_zoom', 'rack_focus',
  // lenses, composition, editing
  'wide_angle', 'normal', 'telephoto', 'macro', 'rule_of_thirds', 'central_symmetry', 'leading_lines', 'framing_within_frame', 'depth_layering', 'negative_space', 'headroom_leadroom', '180_degree_rule', 'shot_reverse_shot', 'long_take', 'slow_cutting', 'fast_cutting', 'match_cut', 'cross_cutting', 'montage',
  // knowledge/mise_en_scene.json
  'high_key', 'low_key', 'chiaroscuro', 'rembrandt', 'three_point', 'silhouette', 'backlight_rim', 'practical_motivated', 'golden_hour', 'top_light', 'underlight', 'complementary', 'analogous', 'triadic', 'monochrome', 'split_complementary', 'depth_staging', 'symmetrical_blocking', 'proxemics', 'negative_space_isolation', 'movement_toward_away', 'prop_as_symbol', 'setting_as_metaphor', 'wardrobe_signals', 'texture_materiality',
  // knowledge/director_styles.json
  'pixar', 'disney_animation', 'miyazaki', 'wes_anderson', 'bong_joon_ho', 'ridley_scott', 'james_cameron', 'tim_burton', 'denis_villeneuve',
  // knowledge/genres.json
  'animated_short', 'comedy', 'drama', 'thriller', 'sci_fi_fantasy', 'romance',
  // knowledge/success_factors.json
  'emotional_core', 'hook_strength', 'structural_completeness', 'originality_vs_familiarity', 'genre_fit', 'runtime_discipline', 'specificity', 'shareability',
  // knowledge/ai_toolchain.json
  'veo_3_1', 'kling_3_0', 'runway_gen_4_5', 'minimax_hailuo_2_3', 'luma_ray_3', 'seedance', 'sora_2', 'midjourney_v6', 'gpt_image_1', 'nano_banana_pro', 'stable_diffusion_xl'
]);

const CITABLE_ID_SET = new Set(CITABLE_IDS);

const CRAFT_PRINCIPLES = `
STRUCTURE
- pixar_spine: status quo -> routine -> disruption -> causal escalation -> climax -> changed normal.
- three_act: setup -> commitment -> midpoint reversal -> low point -> climax -> resolution.
- kishotenketsu: introduction -> development -> recontextualizing twist -> reconciliation.

CAMERA
- WS/EWS: environment and isolation; CU/ECU/INSERT: emotion, importance, or decisive detail.
- high_angle diminishes; low_angle empowers; eye_level equalizes; overhead_topdown suggests pattern/fate.
- static observes/control; dolly_in intensifies realization; dolly_out isolates/reveals context; tracking adds momentum; rack_focus connects planes.
- negative_space isolates; central_symmetry encodes order/duality; framing_within_frame can entrap; depth_layering creates hierarchy.

MISE-EN-SCENE
- low_key/chiaroscuro encode tension or moral duality; golden_hour/backlight_rim encode warmth, memory, transience.
- complementary creates tension/separation; analogous creates emotional unity; monochrome concentrates one emotion.
- proxemics encodes relationship/power; symmetrical_blocking encodes confrontation/duality; negative_space_isolation encodes loneliness.
- prop_as_symbol makes an object carry theme; setting_as_metaphor externalizes inner state; wardrobe_signals tracks identity/arc.

EDITING + SUCCESS
- slow_cutting gives contemplation/weight; fast_cutting gives urgency/comedy; match_cut creates poetic linkage; montage compresses change.
- emotional_core, hook_strength, structural_completeness, specificity, and shareability must be visible in concrete choices.
`.trim();

module.exports = { CITABLE_IDS, CITABLE_ID_SET, CRAFT_PRINCIPLES };
