const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { CITABLE_IDS, CITABLE_ID_SET } = require('../lib/craft-knowledge');
const { STORY_SCHEMA, TOOL_IDS } = require('../lib/story-schema');
const handler = require('../api/generate-story');
const apiSource = fs.readFileSync(path.join(__dirname,'..','api','generate-story.js'),'utf8');
assert.match(apiSource,/reasoning: \{ effort: 'low' \}/);
assert.match(apiSource,/setTimeout\(\(\) => controller\.abort\(\), 40000\)/);
assert.match(apiSource,/max_output_tokens: 12000/);

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

const groundedEnum = STORY_SCHEMA.properties.acts.items.properties.shots.items.properties.grounded_in.items.enum;
assert.deepEqual(groundedEnum, CITABLE_IDS, 'Structured-output citation enum must use the explicit allowlist');
assert.equal(STORY_SCHEMA.properties.acts.minItems, 5);
assert.equal(STORY_SCHEMA.properties.acts.maxItems, 5);
assert.ok(STORY_SCHEMA.required.includes('contest_fit'));
assert.equal(STORY_SCHEMA.properties.contest_fit.properties.score.maximum,100);

const clientCode = fs.readFileSync(path.join(root, 'js/eve-api.js'), 'utf8');
const context = { window: {}, fetch: async () => { throw new Error('offline'); } };
vm.runInNewContext(clientCode, context);
const fallback = context.window.EVE_API.fallback('test');
assert.equal(fallback.story.acts.length, 5, 'Fallback must contain five acts');
assert.equal(fallback.story.contest_fit.score,0);
assert.equal(fallback.story.runtime.total_shots,14);
assert.deepEqual(Array.from(fallback.story.acts,a=>a.name),['Setup','Development','Crisis','Climax','Resolution']);
assert.equal(fallback.story.acts.flatMap(a=>a.shots).reduce((n,s)=>n+s.duration_seconds,0),fallback.story.runtime.planned_seconds);
assert.doesNotThrow(()=>handler._test.validateAndRepair(JSON.parse(JSON.stringify(fallback.story))));
for (const act of fallback.story.acts) for (const shot of act.shots) {
  assert.ok(shot.pacing_rationale);
  assert.ok(shot.twist_role?.type);
  assert.ok(shot.why_this_shot);
  assert.ok(shot.mise_en_scene?.symbolic_meaning);
  assert.ok(shot.t2i_prompt);
  assert.ok(shot.i2v_prompt);
  assert.ok(shot.grounded_in.every((id) => CITABLE_ID_SET.has(id)));
  assert.ok(TOOL_IDS.includes(shot.recommended_tool.id));
}

const dirtyStory = { acts: [{ shots: [{ grounded_in: ['CU', 'invented_id', 'prop_as_symbol'] }] }] };
const dropped = handler._test.filterCitations(dirtyStory);
assert.deepEqual(dirtyStory.acts[0].shots[0].grounded_in, ['CU', 'prop_as_symbol']);
assert.deepEqual(dropped, ['invented_id']);

const inlineScripts = fs.readFileSync(path.join(root, 'concept_lab.html'), 'utf8')
  .match(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)
  .map((tag) => tag.replace(/^<script(?:\s[^>]*)?>/, '').replace(/<\/script>$/, ''))
  .filter((code) => code.trim());
inlineScripts.forEach((code) => new vm.Script(code));

console.log(`P1 contract tests passed (${CITABLE_IDS.length} citable IDs, ${fallback.story.runtime.total_shots} fallback shots).`);
