const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

// The global platform nav must point only to pages that exist.
const nav = fs.readFileSync(path.join(root, 'js/eve-nav.js'), 'utf8');
const navTargets = [...nav.matchAll(/f:\s*'([^']+\.html)'/g)].map((m) => m[1]);
const expectTabs = ['index.html', 'concept_lab.html', 'learn.html', 'toolkit.html', 'detector.html', 'community.html'];
for (const t of expectTabs) assert.ok(navTargets.includes(t), `nav missing tab target ${t}`);
for (const t of navTargets) assert.ok(fs.existsSync(path.join(root, t)), `nav links to missing ${t}`);

// New platform pages: exist, English, valid scripts, load the shared nav + theme, links resolve.
const newPages = ['learn.html', 'toolkit.html', 'detector.html', 'community.html'];
for (const page of newPages) {
  const src = fs.readFileSync(path.join(root, page), 'utf8');
  assert.match(src, /<html lang="en">/, `${page} must declare English`);
  assert.match(src, /js\/eve-nav\.js/, `${page} must load the global nav`);
  assert.match(src, /css\/eve-theme\.css/, `${page} must load the shared theme`);
  [...src.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
    .map((m) => m[1]).filter((c) => c.trim())
    .forEach((code) => new vm.Script(code, { filename: page }));
  for (const target of [...src.matchAll(/href="([^"#]+\.html)"/g)].map((m) => m[1])) {
    assert.ok(fs.existsSync(path.resolve(root, target)), `${page} links to missing ${target}`);
  }
  assert.doesNotMatch(src.replace(/<script[\s\S]*?<\/script>/g, ''), /[가-힣]/, `${page} visible markup must be English`);
}

// Every page carries the global nav so the platform feels consistent.
for (const page of ['index.html', 'concept_lab.html', 'creators_room.html', 'shotseed.html', 'storyboard.html', ...newPages]) {
  assert.match(fs.readFileSync(path.join(root, page), 'utf8'), /js\/eve-nav\.js/, `${page} must include the global nav`);
}

// Film School must cover every craft ID exactly once across its categories.
const learn = fs.readFileSync(path.join(root, 'learn.html'), 'utf8');
const { CITABLE_IDS } = require(path.join(root, 'lib/craft-knowledge'));
const learnIds = [...learn.matchAll(/ids:\[([^\]]*)\]/g)]
  .flatMap((m) => m[1].split(',').map((s) => s.trim().replace(/^'|'$/g, '')).filter(Boolean));
assert.equal(learnIds.length, CITABLE_IDS.length, 'Film School must list every craft ID once');
for (const id of CITABLE_IDS) assert.ok(learnIds.includes(id), `Film School missing ${id}`);

// Research-backed safe wins: beginner launch, cross-shot continuity, minimal tool stack.
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const concept=fs.readFileSync(path.join(root,'concept_lab.html'),'utf8');
const storyboard=fs.readFileSync(path.join(root,'storyboard.html'),'utf8');
const toolkit=fs.readFileSync(path.join(root,'toolkit.html'),'utf8');
assert.match(home,/startPractice\('paper_boat'\)/,'Home must offer a bounded beginner practice brief');
assert.match(home,/eve\.starter\.v1/,'Starter must carry context forward');
assert.match(concept,/loadStarter/,'Concept Lab must consume starter context');
assert.match(storyboard,/Continuity Kit/,'Storyboard must teach cross-shot continuity');
assert.match(storyboard,/Copy continuity anchor/,'Continuity anchor must be reusable');
assert.match(toolkit,/minimum viable stack/i,'Toolkit must reduce model overload');
for(const file of ['research/ai_pain_points.md','research/competitive_scan.md','research/win_audit.md']){
  const research=fs.readFileSync(path.join(root,file),'utf8');
  assert.match(research,/https:\/\//,`${file} must contain real source URLs`);
}

console.log(`Platform tests passed (6 nav tabs, ${newPages.length} new pages, Film School covers ${CITABLE_IDS.length} terms).`);
