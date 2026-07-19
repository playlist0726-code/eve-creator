const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const pages = ['index.html', 'shotseed.html', 'storyboard.html', 'concept_lab.html'];
const expectedNav = ['index.html','concept_lab.html','creators_room.html','shotseed.html','storyboard.html'];

for (const page of pages) {
  const source = fs.readFileSync(path.join(root, page), 'utf8');
  assert.match(source, /<html lang="en">/, `${page} must declare English`);

  const nav = source.match(/<nav class="site-nav">([\s\S]*?)<\/nav>/)?.[1] || '';
  const navLinks = [...nav.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(navLinks, expectedNav, `${page} must link to all four pages in order`);

  for (const target of [...source.matchAll(/href="([^"#]+\.html)"/g)].map((match) => match[1])) {
    assert.ok(fs.existsSync(path.resolve(root, target)), `${page} links to missing ${target}`);
  }

  const scripts = [...source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .map((match) => match[1]).filter((code) => code.trim());
  scripts.forEach((code) => new vm.Script(code, { filename: page }));

  const visibleMarkup = source.replace(/<script[\s\S]*?<\/script>/g, '');
  assert.doesNotMatch(visibleMarkup, /[가-힣]/, `${page} visible markup must be English`);
}

const shotseed = fs.readFileSync(path.join(root, 'shotseed.html'), 'utf8');
const matcherStart = shotseed.indexOf('const synonymMap = {');
const matcherEnd = shotseed.indexOf('// MATCHING ENGINE');
const runtimeWithoutAllowedKorean = shotseed
  .split('\n').filter((line) => !line.includes('mood:')).join('\n')
  .replace(shotseed.slice(matcherStart, matcherEnd), '')
  .replace('/[가-힣]/', '');
assert.doesNotMatch(runtimeWithoutAllowedKorean, /[가-힣]/, 'Korean may remain only in hidden matcher data');

for (const file of ['storyboard_data.json', ...fs.readdirSync(path.join(root, 'knowledge')).filter((name) => name.endsWith('.json')).map((name) => `knowledge/${name}`)]) {
  const data = fs.readFileSync(path.join(root, file), 'utf8');
  JSON.parse(data);
  assert.doesNotMatch(data, /[가-힣]/, `${file} must contain English display data`);
}

const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
assert.equal(vercel.rewrites[0].source, '/');
assert.equal(vercel.rewrites[0].destination, '/index.html');

// Creator's Room page: exists, English, valid scripts, links only to existing files.
const room = fs.readFileSync(path.join(root, 'creators_room.html'), 'utf8');
assert.match(room, /<html lang="en">/, 'creators_room must declare English');
assert.match(room, /The .*Creator's Room/, 'creators_room must present the hero title');
[...room.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
  .map((m) => m[1]).filter((c) => c.trim())
  .forEach((code) => new vm.Script(code, { filename: 'creators_room.html' }));
for (const target of [...room.matchAll(/href="([^"#]+\.html)"/g)].map((m) => m[1])) {
  assert.ok(fs.existsSync(path.resolve(root, target)), `creators_room links to missing ${target}`);
}
assert.doesNotMatch(room.replace(/<script[\s\S]*?<\/script>/g, ''), /[가-힣]/, 'creators_room visible markup must be English');

console.log('Site tests passed (English UI, five-step navigation incl. Creator\'s Room, root Home rewrite).');
