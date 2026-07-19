const { CITABLE_IDS } = require('./craft-knowledge');

// The five fixed crew roles of the Creator's Room. Order is stable so the UI can
// animate them deterministically. Each id maps to a specialist lens the model must adopt.
const CREW_ROLES = ['director', 'writer', 'cinematographer', 'editor', 'test_audience'];
const CREW_NAMES = ['Director', 'Writer', 'Cinematographer', 'Editor', 'Test Audience'];

// The eight hit-potential dimensions the crew re-scores (mirrors success_factors.json).
const DIMENSION_IDS = [
  'emotional_core', 'hook_strength', 'structural_completeness', 'originality_vs_familiarity',
  'genre_fit', 'runtime_discipline', 'specificity', 'shareability'
];

const text = (max) => ({ type: 'string', minLength: 1, maxLength: max });

// One specialist's critique of the draft blueprint.
const critique = {
  type: 'object', additionalProperties: false,
  required: ['role', 'name', 'verdict', 'headline', 'note', 'target_shots', 'grounded_in'],
  properties: {
    role: { type: 'string', enum: CREW_ROLES },
    name: { type: 'string', enum: CREW_NAMES },
    verdict: { type: 'string', enum: ['strong', 'revise', 'weak'] },
    headline: text(90),          // one punchy line shown as the crew member "speaks"
    note: text(420),             // the specific, idea-referencing critique
    target_shots: { type: 'array', minItems: 0, maxItems: 6, items: { type: 'integer', minimum: 1, maximum: 18 } },
    grounded_in: { type: 'array', minItems: 0, maxItems: 4, uniqueItems: true, items: { type: 'string', enum: CITABLE_IDS } }
  }
};

// A re-scored dimension (before -> after) with the reason the crew moved it.
const dimensionDelta = {
  type: 'object', additionalProperties: false,
  required: ['id', 'before', 'after', 'why'],
  properties: {
    id: { type: 'string', enum: DIMENSION_IDS },
    before: { type: 'integer', minimum: 0, maximum: 100 },
    after: { type: 'integer', minimum: 0, maximum: 100 },
    why: text(220)
  }
};

// A concrete, applied fix on one shot: what was wrong, the old text, the improved text.
const revision = {
  type: 'object', additionalProperties: false,
  required: ['shot_number', 'field', 'by_role', 'problem', 'before', 'after', 'grounded_in'],
  properties: {
    shot_number: { type: 'integer', minimum: 1, maximum: 18 },
    field: { type: 'string', enum: ['story_action', 'why_this_shot', 'framing', 'movement', 'mise_en_scene', 't2i_prompt', 'i2v_prompt', 'pacing_rationale'] },
    by_role: { type: 'string', enum: CREW_ROLES },
    problem: text(220),
    before: text(500),
    after: text(500),
    grounded_in: { type: 'array', minItems: 0, maxItems: 4, uniqueItems: true, items: { type: 'string', enum: CITABLE_IDS } }
  }
};

const CREW_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['round_summary', 'score_before', 'score_after', 'verdict', 'crew', 'dimension_deltas', 'revisions', 'closing_note'],
  properties: {
    round_summary: text(200),
    score_before: { type: 'integer', minimum: 0, maximum: 100 },
    score_after: { type: 'integer', minimum: 0, maximum: 100 },
    verdict: { type: 'string', enum: ['ready_to_shoot', 'needs_another_pass'] },
    crew: { type: 'array', minItems: 5, maxItems: 5, items: critique },
    dimension_deltas: { type: 'array', minItems: 4, maxItems: 8, items: dimensionDelta },
    revisions: { type: 'array', minItems: 3, maxItems: 6, items: revision },
    closing_note: text(300)
  }
};

module.exports = { CREW_SCHEMA, CREW_ROLES, CREW_NAMES, DIMENSION_IDS };
