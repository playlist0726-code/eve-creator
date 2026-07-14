const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { CITABLE_IDS, CITABLE_ID_SET } = require('../lib/craft-knowledge');
const { STORY_SCHEMA } = require('../lib/story-schema');
const handler = require('../api/generate-story');

const root = path.resolve(__dirname, '..');

function collectIds(value, ids = []) {
  if (Array.isArray(value)) value.forEach((item) => collectIds(item, ids));
  else if (value && typeof value === 'object') {
    if (typeof value.id === 'string') ids.push(value.id);
    Object.values(value).forEach((item) => collectIds(item, ids));
  }
  return ids;
}

const knowledgeIds = [];
for (const file of fs.readdirSync(path.join(root, 'knowledge')).filter((name) => name.endsWith('.json'))) {
  const json = JSON.parse(fs.readFileSync(path.join(root, 'knowledge', file), 'utf8'));
  collectIds(json, knowledgeIds);
}

assert.deepEqual([...new Set(CITABLE_IDS)].sort(), [...new Set(knowledgeIds)].sort(), 'Citable allowlist must exactly match knowledge IDs');
assert.equal(CITABLE_IDS.length, CITABLE_ID_SET.size, 'Citable IDs must be unique');

const groundedEnum = STORY_SCHEMA.properties.beats.items.properties.shot.properties.grounded_in.items.enum;
assert.deepEqual(groundedEnum, CITABLE_IDS, 'Structured-output citation enum must use the explicit allowlist');
assert.equal(STORY_SCHEMA.properties.beats.minItems, 5);
assert.equal(STORY_SCHEMA.properties.beats.maxItems, 5);

const clientCode = fs.readFileSync(path.join(root, 'js/eve-api.js'), 'utf8');
const context = { window: {}, fetch: async () => { throw new Error('offline'); } };
vm.runInNewContext(clientCode, context);
const fallback = context.window.EVE_API.fallback('test');
assert.equal(fallback.story.beats.length, 5, 'Fallback must contain five beats');
for (const beat of fallback.story.beats) {
  assert.ok(beat.pacing_rationale);
  assert.ok(beat.twist_role?.type);
  assert.ok(beat.shot?.why_this_shot);
  assert.ok(beat.shot?.mise_en_scene?.symbolic_meaning);
  assert.ok(beat.shot?.t2i_prompt);
  assert.ok(beat.shot?.i2v_prompt);
  assert.ok(beat.shot.grounded_in.every((id) => CITABLE_ID_SET.has(id)));
}

const dirtyStory = { beats: [{ shot: { grounded_in: ['CU', 'invented_id', 'prop_as_symbol'] } }] };
const dropped = handler._test.filterCitations(dirtyStory);
assert.deepEqual(dirtyStory.beats[0].shot.grounded_in, ['CU', 'prop_as_symbol']);
assert.deepEqual(dropped, ['invented_id']);

const inlineScripts = fs.readFileSync(path.join(root, 'concept_lab.html'), 'utf8')
  .match(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)
  .map((tag) => tag.replace(/^<script(?:\s[^>]*)?>/, '').replace(/<\/script>$/, ''))
  .filter((code) => code.trim());
inlineScripts.forEach((code) => new vm.Script(code));

console.log(`P1 contract tests passed (${CITABLE_IDS.length} citable IDs, ${fallback.story.beats.length} fallback beats).`);
