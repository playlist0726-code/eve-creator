const { CITABLE_IDS } = require('./craft-knowledge');

const stringField = { type: 'string', minLength: 1, maxLength: 700 };

const STORY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['title', 'logline', 'theme', 'structure', 'director_lens', 'contest_fit', 'beats'],
  properties: {
    title: { type: 'string', minLength: 1, maxLength: 100 },
    logline: { type: 'string', minLength: 1, maxLength: 320 },
    theme: { type: 'string', minLength: 1, maxLength: 220 },
    structure: {
      type: 'object', additionalProperties: false,
      required: ['id', 'name', 'why'],
      properties: {
        id: { type: 'string', enum: ['three_act', 'hero_journey', 'save_the_cat', 'pixar_spine', 'kishotenketsu', 'freytag'] },
        name: { type: 'string', minLength: 1, maxLength: 100 },
        why: { type: 'string', minLength: 1, maxLength: 320 }
      }
    },
    director_lens: { type: 'string', minLength: 1, maxLength: 240 },
    contest_fit: {
      type: 'object', additionalProperties: false,
      required: ['score', 'rationale', 'strengths', 'gaps'],
      properties: {
        score: { type: 'integer', minimum: 0, maximum: 100 },
        rationale: { type: 'string', minLength: 1, maxLength: 320 },
        strengths: { type: 'array', minItems: 0, maxItems: 3, items: { type: 'string', maxLength: 120 } },
        gaps: { type: 'array', minItems: 0, maxItems: 3, items: { type: 'string', maxLength: 120 } }
      }
    },
    beats: {
      type: 'array', minItems: 5, maxItems: 5,
      items: {
        type: 'object', additionalProperties: false,
        required: ['number', 'name', 'beat_function', 'story_action', 'tension', 'pacing_rationale', 'twist_role', 'shot'],
        properties: {
          number: { type: 'integer', minimum: 1, maximum: 5 },
          name: { type: 'string', minLength: 1, maxLength: 80 },
          beat_function: { type: 'string', minLength: 1, maxLength: 260 },
          story_action: { type: 'string', minLength: 1, maxLength: 320 },
          tension: { type: 'number', minimum: 0, maximum: 1 },
          pacing_rationale: { type: 'string', minLength: 1, maxLength: 320 },
          twist_role: {
            type: 'object', additionalProperties: false,
            required: ['type', 'mechanism'],
            properties: {
              type: { type: 'string', enum: ['setup', 'payoff', 'none'] },
              mechanism: { type: 'string', maxLength: 260 }
            }
          },
          shot: {
            type: 'object', additionalProperties: false,
            required: ['framing', 'angle', 'movement', 'why_this_shot', 'mise_en_scene', 'grounded_in', 't2i_prompt', 'i2v_prompt'],
            properties: {
              framing: { type: 'string', minLength: 1, maxLength: 80 },
              angle: { type: 'string', minLength: 1, maxLength: 80 },
              movement: { type: 'string', minLength: 1, maxLength: 100 },
              why_this_shot: stringField,
              mise_en_scene: {
                type: 'object', additionalProperties: false,
                required: ['staging', 'props', 'color', 'light', 'symbolic_meaning'],
                properties: {
                  staging: stringField,
                  props: stringField,
                  color: stringField,
                  light: stringField,
                  symbolic_meaning: stringField
                }
              },
              grounded_in: {
                type: 'array', minItems: 0, maxItems: 5, uniqueItems: true,
                items: { type: 'string', enum: CITABLE_IDS }
              },
              t2i_prompt: { type: 'string', minLength: 1, maxLength: 700 },
              i2v_prompt: { type: 'string', minLength: 1, maxLength: 600 }
            }
          }
        }
      }
    }
  }
};

module.exports = { STORY_SCHEMA };
