const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

// Load the browser glossary into a sandbox.
const ctx = { window: {}, document: undefined, requestAnimationFrame: () => {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/eve-glossary.js'), 'utf8'), ctx);
const G = ctx.window.EVE_GLOSSARY;
const chip = ctx.window.EVE_GLOSSARY_CHIP;

// Every grounded citation ID must be teachable (education contract).
const { CITABLE_IDS } = require(path.join(root, 'lib/craft-knowledge'));
assert.equal(Object.keys(G).length, CITABLE_IDS.length, 'glossary must cover exactly the citable IDs');
for (const id of CITABLE_IDS) {
  assert.ok(G[id], `glossary missing term for ${id}`);
  assert.ok(G[id][0] && G[id][0].length > 1, `${id} needs a plain-language name`);
  assert.ok(G[id][1] && G[id][1].length > 20, `${id} needs a real explanation`);
}
// No stray IDs that aren't grounded.
for (const id of Object.keys(G)) assert.ok(CITABLE_IDS.includes(id), `glossary has non-citable ${id}`);

// chip() renders a learnable, accessible element.
const html = chip('low_angle', 'citation');
assert.match(html, /data-teach="low_angle"/);
assert.match(html, /Low Angle/);
assert.match(html, /tabindex="0"/);

// The education layer is wired into the pages that show citations.
for (const page of ['creators_room.html', 'concept_lab.html']) {
  const src = fs.readFileSync(path.join(root, page), 'utf8');
  assert.match(src, /js\/eve-glossary\.js/, `${page} must load the glossary`);
  assert.match(src, /EVE_GLOSSARY_CHIP/, `${page} must render learnable citation chips`);
}

console.log(`Glossary tests passed (${CITABLE_IDS.length} craft terms, all teachable).`);
