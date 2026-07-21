const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

// The global platform nav must point only to pages that exist.
const nav = fs.readFileSync(path.join(root, 'js/eve-nav.js'), 'utf8');
assert.match(nav, /First Frame/, 'global nav must carry the First Frame brand');
const navTargets = [...nav.matchAll(/f:\s*'([^']+\.html)'/g)].map((m) => m[1]);
const expectTabs = ['index.html', 'tracks.html', 'concept_lab.html', 'learn.html', 'showcase.html', 'toolkit.html', 'detector.html', 'community.html'];
for (const t of expectTabs) assert.ok(navTargets.includes(t), `nav missing tab target ${t}`);
for (const t of navTargets) assert.ok(fs.existsSync(path.join(root, t)), `nav links to missing ${t}`);
assert.match(nav,/l:\s*'Footage Lab',\s*f:\s*'detector\.html'/,'Detector route must be visibly renamed Footage Lab without changing its target');

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
  const pageSource = fs.readFileSync(path.join(root, page), 'utf8');
  assert.match(pageSource, /js\/eve-nav\.js/, `${page} must include the global nav`);
  assert.match(pageSource, /js\/eve-ui\.js/, `${page} must include the shared best-of UI layer`);
  assert.match(pageSource, /css\/eve-theme\.css/, `${page} must include the shared light theme`);
  assert.doesNotMatch(pageSource, /E\.V\.E Creator/, `${page} must not expose the retired brand`);
}

const theme=fs.readFileSync(path.join(root,'css/eve-theme.css'),'utf8');
for(const token of ['--bg:#eef0f4','--surface:#ffffff','--text:#14151a','--iris:#6c5ce7']) {
  assert.ok(theme.includes(token),`light theme missing ${token}`);
}
assert.match(theme,/Plus\+Jakarta\+Sans/,'light theme must load Plus Jakarta Sans');
assert.match(theme,/:focus-visible/,'shared theme must expose a keyboard focus indicator');
assert.match(theme,/min-height:\s*44px/,'shared controls must meet the 44px touch-target baseline');
const sharedUiPath=path.join(root,'js/eve-ui.js');
assert.ok(fs.existsSync(sharedUiPath),'shared command and feedback UI must exist');
const sharedUi=fs.readFileSync(sharedUiPath,'utf8');
new vm.Script(sharedUi,{filename:'js/eve-ui.js'});
assert.match(sharedUi,/e\.metaKey\|\|e\.ctrlKey/,'command palette must support Command/Ctrl shortcuts');
assert.match(sharedUi,/key\.toLowerCase\(\)==='k'/,'command palette must bind K');
assert.match(sharedUi,/ArrowDown.*ArrowUp/,'command palette must support arrow navigation');
assert.match(sharedUi,/window\.fftoast/,'shared UI must expose the toast helper');
assert.match(sharedUi,/ff-shortcuts/,'shared UI must provide the shortcuts overlay');
assert.match(sharedUi,/role="dialog"[^>]+aria-modal="true"/,'shared overlays must be accessible modal dialogs');
assert.match(sharedUi,/data\/craft_lessons\.json/,'palette must index all Film School lessons');
assert.match(sharedUi,/data\/ai_tools\.json/,'palette must index the tool catalogue');

// Film School must cover every craft ID exactly once across its categories.
const learn = fs.readFileSync(path.join(root, 'learn.html'), 'utf8');
const { CITABLE_IDS } = require(path.join(root, 'lib/craft-knowledge'));
const learnIds = [...learn.matchAll(/ids:\[([^\]]*)\]/g)]
  .flatMap((m) => m[1].split(',').map((s) => s.trim().replace(/^'|'$/g, '')).filter(Boolean));
assert.equal(learnIds.length, CITABLE_IDS.length, 'Film School must list every craft ID once');
for (const id of CITABLE_IDS) assert.ok(learnIds.includes(id), `Film School missing ${id}`);

// Film School deep-content layer: one complete, independently maintained lesson per allowlisted ID.
const lessonPath=path.join(root,'data/craft_lessons.json');
assert.ok(fs.existsSync(lessonPath),'Film School needs its independent craft lesson data');
const lessonData=JSON.parse(fs.readFileSync(lessonPath,'utf8'));
const lessonToolIds=new Set(JSON.parse(fs.readFileSync(path.join(root,'data/ai_tools.json'),'utf8')).tools.map((tool)=>tool.id));
assert.equal(Object.keys(lessonData.lessons).length,CITABLE_IDS.length,'Film School lesson data must cover all 111 IDs');
for(const id of CITABLE_IDS){
  const lesson=lessonData.lessons[id];
  assert.ok(lesson,`missing deep lesson ${id}`);
  assert.equal(lesson.id,id,`${id} lesson id must match its key`);
  assert.ok(lesson.deep.length>=180,`${id} needs an in-depth explanation`);
  assert.ok(lesson.traditional_example.length>=70,`${id} needs an honest traditional-film example`);
  assert.ok(Array.isArray(lesson.ai_howto.prompt_tips)&&lesson.ai_howto.prompt_tips.length,`${id} needs AI prompt guidance`);
  assert.ok(Array.isArray(lesson.ai_howto.tool_ids),`${id} needs a tool_ids array`);
  lesson.ai_howto.tool_ids.forEach((toolId)=>assert.ok(lessonToolIds.has(toolId),`${id} references missing AI tool ${toolId}`));
  assert.ok(Array.isArray(lesson.ai_howto.caveats)&&lesson.ai_howto.caveats.length,`${id} needs honest AI caveats`);
  assert.ok(Array.isArray(lesson.videos),`${id} videos must be an array`);
  for(const video of lesson.videos){assert.ok(video.title&&video.channel&&video.source,`${id} video metadata must be complete`);assert.match(video.source,/^https:\/\/(?:www\.)?youtube\.com\/watch\?v=/,`${id} video must use a real YouTube watch URL`);}
}
assert.doesNotMatch(JSON.stringify(lessonData),/[가-힣]/,'Film School lesson data must be English');
assert.match(learn,/class="sidebar"[^>]+aria-label="Film School syllabus"/,'Film School needs the category syllabus sidebar');
assert.match(learn,/#cat=/,'Film School must support #cat= deep links');
assert.match(learn,/#term=/,'Film School must support #term= deep links');
assert.match(learn,/In traditional film/,'Film School needs the traditional-film comparison');
assert.match(learn,/With AI video/,'Film School needs the AI-video comparison');
assert.match(learn,/Watch & Learn/,'Film School needs a verified video lesson row');
assert.match(learn,/No closely relevant public lesson has passed verification yet/,'Film School needs an honest video empty state');

// ShotSeed must remain an auditable source-frame dataset, not a set of untraceable examples.
const shotseed=fs.readFileSync(path.join(root,'shotseed.html'),'utf8');
const shotStart=shotseed.indexOf('const shots = '),shotEnd=shotseed.indexOf('\n];',shotStart);
assert.ok(shotStart>=0&&shotEnd>shotStart,'ShotSeed must expose its local shots array');
const shotContext={};vm.runInNewContext(shotseed.slice(shotStart,shotEnd+3).replace('const shots = ','shots = '),shotContext);
assert.ok(shotContext.shots.length>=55,'ShotSeed must carry at least 55 audited shots');
for(const shot of shotContext.shots){
  assert.ok(shot.source,`${shot.id} must carry a source`);
  assert.match(shot.timestamp,/^\d{2}:\d{2}$/,`${shot.id} must carry an auditable timestamp`);
  assert.ok(['2d','3d'].includes(shot.dimension),`${shot.id} must carry a 2d/3d dimension`);
}
assert.deepEqual([...new Set(shotContext.shots.map(s=>s.dimension))].sort(),['2d','3d'],'ShotSeed must represent both 2D and 3D work');
assert.match(shotseed,/id="sourceFilter"/,'ShotSeed browser must expose a studio/source filter');
assert.match(learn,/Learning Paths/,'Film School needs ordered learning paths');
assert.match(learn,/class="ff-breadcrumb"/,'Film School detail view needs breadcrumbs');
assert.match(learn,/id="lessonToc"[^>]+aria-label="On this page"/,'Film School detail view needs an on-this-page table of contents');

// Three audience tracks share one validated curriculum and device-local capability profile.
const coursePath=path.join(root,'data/courses.json');
const courseData=JSON.parse(fs.readFileSync(coursePath,'utf8'));
assert.ok(Array.isArray(courseData.modules),'courses.json must expose modules');
assert.equal(courseData.modules.length,19,'courses must contain 5 kids, 6 beginner, and 8 student modules');
for(const track of ['kids','beginner','student'])assert.ok(courseData.modules.some(m=>m.track===track),`missing ${track} curriculum`);
for(const module of courseData.modules){
  assert.ok(module.id&&module.title&&module.goal&&module.checkpoint&&module.output,`${module.id||'module'} needs complete learning-loop copy`);
  assert.ok(Number.isInteger(module.order)&&module.order>0,`${module.id} needs a valid order`);
  assert.ok(Number.isInteger(module.minutes)&&module.minutes>0,`${module.id} needs an honest time estimate`);
  assert.ok(Array.isArray(module.teaches)&&module.teaches.length,`${module.id} must teach allowlisted craft`);
  module.teaches.forEach(id=>assert.ok(CITABLE_IDS.includes(id),`${module.id} invents craft ID ${id}`));
  assert.ok(module.do&&fs.existsSync(path.join(root,module.do.page)),`${module.id} links to missing working page`);
  assert.equal(typeof module.do.params,'object',`${module.id} needs explicit handoff params`);
}
const trackPages=['kids.html','beginner.html','darkroom.html'];
for(const page of trackPages){
  const src=fs.readFileSync(path.join(root,page),'utf8');
  for(const asset of ['js/eve-nav.js','js/eve-ui.js','css/eve-theme.css'])assert.ok(src.includes(asset),`${page} must load ${asset}`);
  const visible=src.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'');
  assert.doesNotMatch(visible,/[가-힣]/,`${page} visible markup must be English`);
  [...src.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean).forEach(code=>new vm.Script(code,{filename:page}));
  assert.ok(/prefers-reduced-motion:\s*reduce/.test(src)||src.includes('css/courses.css'),`${page} must respect reduced motion`);
}
assert.match(fs.readFileSync(path.join(root,'css/courses.css'),'utf8'),/prefers-reduced-motion:\s*reduce/,'shared course motion must respect user preferences');
assert.match(fs.readFileSync(path.join(root,'darkroom.html'),'utf8'),/<html lang="en" data-surface="pro">/,'The Dark Room must declare the pro surface');
const progressSource=fs.readFileSync(path.join(root,'js/ff-progress.js'),'utf8');
const progressStore=new Map(),progressContext={localStorage:{getItem:k=>progressStore.get(k)||null,setItem:(k,v)=>progressStore.set(k,v),removeItem:k=>progressStore.delete(k)},dispatchEvent(){},CustomEvent:function(){}};
vm.runInNewContext(progressSource,progressContext,{filename:'js/ff-progress.js'});
assert.equal(progressContext.FF_PROGRESS.KEY,'ff.learner.v1','learner profile must use the documented key');
assert.equal(typeof progressContext.FF_PROGRESS.reset,'function','learner profile must expose reset');
progressContext.FF_PROGRESS.configure(courseData);
progressContext.FF_PROGRESS.completeModule('begin-intake',{type:'test-checkpoint'});
const derivedProfile=progressContext.FF_PROGRESS.load();
assert.ok(derivedProfile.skills.Story>0&&derivedProfile.skills.Editing>0,'skill meters must derive from completed module craft');
assert.equal(progressContext.FF_PROGRESS.reset().modules_completed.length,0,'reset must visibly clear device-local progress');
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html')).concat(fs.readdirSync(path.join(root,'js')).map(f=>'js/'+f))){
  const src=fs.readFileSync(path.join(root,file),'utf8');
  assert.doesNotMatch(src,/(?:login[_-]?streak|streak[_-]?(?:count|days)|daily[_-]?(?:login|attendance))/i,`${file} must measure capability, not attendance`);
}

// AI Showcase: only source-verifiable work, resolvable recipe IDs, and device-local social data.
const showcasePath=path.join(root,'data/showcase.json');
const showcaseData=JSON.parse(fs.readFileSync(showcasePath,'utf8'));
const showcasePage=fs.readFileSync(path.join(root,'showcase.html'),'utf8');
const showcaseJs=fs.readFileSync(path.join(root,'js/showcase.js'),'utf8');
assert.ok(Array.isArray(showcaseData.pieces)&&showcaseData.pieces.length,'Showcase needs at least one verified film');
for(const piece of showcaseData.pieces){
  assert.ok(piece.creator&&piece.creator.name,`${piece.id} needs a credited creator`);
  assert.match(piece.creator.url,/^https:\/\//,`${piece.id} creator link must use HTTPS`);
  assert.match(piece.source.url,/^https:\/\//,`${piece.id} source must use HTTPS`);
  assert.match(piece.verified_on,/^\d{4}-\d{2}-\d{2}$/,`${piece.id} needs a verification date`);
  assert.ok(piece.synopsis,`${piece.id} needs a text alternative/synopsis`);
  piece.recipe.tools.forEach(id=>assert.ok(lessonToolIds.has(id),`${piece.id} references missing tool ${id}`));
  piece.recipe.craft_ids.forEach(id=>assert.ok(CITABLE_IDS.includes(id),`${piece.id} invents craft ID ${id}`));
}
assert.match(showcasePage,/<html lang="en" data-surface="pro">/,'Showcase must declare the dark pro surface');
assert.match(showcasePage,/css\/eve-theme\.css/,'Showcase must reuse the shared dark tokens');
assert.doesNotMatch(showcasePage,/purple|glassmorphism|glass-|var\(--grad|#6c5ce7/i,'Showcase must not import purple-gradient or glass styling');
assert.doesNotMatch(showcasePage,/\b(?:likes?|views?|comments?)\s*[·:=-]?\s*\d+/i,'Showcase must not hardcode social-proof counts');
assert.match(showcasePage,/prefers-reduced-motion:\s*reduce/,'Showcase CSS needs a reduced-motion path');
assert.match(showcaseJs,/reduced\.matches/,'hover-to-play must honor the reduced-motion preference');
assert.match(showcaseJs,/function renderUser\(value\)\{return esc\(value\);\}/,'user content must pass through one escaping helper');
for(const expression of ['piece.title','piece.creator.name','piece.synopsis','p.shot','p.text','n'])assert.ok(showcaseJs.includes(`renderUser(${expression})`),`untrusted ${expression} must be escaped before insertion`);
assert.match(showcaseJs,/function cleanImport/,'imported JSON must be normalized before rendering');
assert.match(showcaseJs,/localStorage/,'submissions and responses must stay device-local');
assert.match(showcasePage,/Saved on this device/,'device-local persistence must be labelled honestly');
new vm.Script(showcaseJs,{filename:'js/showcase.js'});

// Research-backed safe wins: beginner launch, cross-shot continuity, minimal tool stack.
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const concept=fs.readFileSync(path.join(root,'concept_lab.html'),'utf8');
const storyboard=fs.readFileSync(path.join(root,'storyboard.html'),'utf8');
const toolkit=fs.readFileSync(path.join(root,'toolkit.html'),'utf8');
assert.match(home,/glass-stack/,'Home must include the CSS glass hero object');
assert.match(home,/social-proof/,'Home must include creator social proof');
assert.match(home,/startPractice\('paper_boat'\)/,'Home must offer a bounded beginner practice brief');
assert.match(home,/eve\.starter\.v1/,'Starter must carry context forward');
assert.match(concept,/loadStarter/,'Concept Lab must consume starter context');
assert.match(storyboard,/Continuity Kit/,'Storyboard must teach cross-shot continuity');
assert.match(storyboard,/Copy continuity anchor/,'Continuity anchor must be reusable');
assert.match(storyboard,/Export project JSON/,'Storyboard must let learners take their production plan out of session storage');
assert.match(storyboard,/format:'first-frame-project'/,'Project export must use a versioned portable envelope');
assert.match(toolkit,/minimum viable stack/i,'Toolkit must reduce model overload');
// Tool Study Library: independent, source-linked catalogue rendered at runtime.
const toolDataPath=path.join(root,'data/ai_tools.json');
assert.ok(fs.existsSync(toolDataPath),'Tool Study Library data must exist');
const toolData=JSON.parse(fs.readFileSync(toolDataPath,'utf8'));
assert.ok(Array.isArray(toolData.tools),'Tool Study Library must expose a tools array');
assert.ok(toolData.tools.length>=25,'Tool Study Library must cover at least 25 tools');
const requiredToolFields=['id','name','maker','category','type','what','strengths','weak_at','best_for','access','level','url','special','maker_company','founded_year','country_hq','key_people','overview','history','versions','pricing','access_how','notable_features','best_use_cases','compare','brand_color','sources','status','status_note'];
const toolTypes=new Set(['t2v','i2v','both','image','avatar','motion','editor']);
const accessTypes=new Set(['free','freemium','paid','open_source']);
const levels=new Set(['beginner','intermediate','advanced']);
const toolIds=new Set();
for(const tool of toolData.tools){
  for(const field of requiredToolFields) assert.ok(Object.hasOwn(tool,field),`${tool.id||'tool'} missing ${field}`);
  assert.ok(!toolIds.has(tool.id),`duplicate AI tool id ${tool.id}`);toolIds.add(tool.id);
  assert.ok(toolTypes.has(tool.type),`${tool.id} has invalid type`);
  assert.ok(accessTypes.has(tool.access),`${tool.id} has invalid access`);
  assert.ok(levels.has(tool.level),`${tool.id} has invalid level`);
  assert.ok(Array.isArray(tool.strengths)&&tool.strengths.length,`${tool.id} needs strengths`);
  assert.ok(Array.isArray(tool.weak_at)&&tool.weak_at.length,`${tool.id} needs weak_at`);
  assert.ok(Array.isArray(tool.key_people)&&tool.key_people.length,`${tool.id} needs key_people`);
  assert.ok(tool.key_people.every((p)=>p.name&&p.role),`${tool.id} key_people entries must have name and role`);
  assert.ok(tool.overview.length>=140,`${tool.id} needs a substantial overview`);
  assert.ok(Array.isArray(tool.history)&&tool.history.length,`${tool.id} needs history`);
  assert.ok(Array.isArray(tool.versions)&&tool.versions.length,`${tool.id} needs versions`);
  assert.ok(Array.isArray(tool.notable_features)&&tool.notable_features.length,`${tool.id} needs notable_features`);
  assert.ok(Array.isArray(tool.best_use_cases)&&tool.best_use_cases.length,`${tool.id} needs best_use_cases`);
  assert.match(tool.brand_color,/^#[0-9A-F]{6}$/i,`${tool.id} needs a hex brand_color`);
  assert.ok(Array.isArray(tool.sources)&&tool.sources.length,`${tool.id} needs cited sources`);
  tool.sources.forEach((source)=>assert.match(source,/^https:\/\//,`${tool.id} source must use HTTPS`));
  assert.ok(['active','deprecating','discontinued'].includes(tool.status),`${tool.id} has invalid status`);
  assert.match(tool.url,/^https:\/\//,`${tool.id} needs an official HTTPS source`);
}
assert.match(toolkit,/fetch\('data\/ai_tools\.json'\)/,'toolkit.html must render from the JSON catalogue');
assert.match(toolkit,/id="tool-profile"[^>]+role="dialog"/,'toolkit.html must include an accessible detail container');
assert.match(toolkit,/#tool=/,'toolkit.html must support #tool= deep links');
assert.match(toolkit,/\.profile\{width:100%;height:100%/,'tool profile must be a full-screen analysis view');
assert.match(toolkit,/class="ff-breadcrumb"/,'tool detail view needs breadcrumbs');
assert.match(toolkit,/class="ff-toc"[^>]+aria-label="On this page"/,'tool detail view needs an on-this-page table of contents');
assert.match(toolkit,/categoryGlyph/,'toolkit.html must render category glyphs in tool icons');
assert.match(toolkit,/aria-label="'\+esc\(t\.name\)\+' icon"/,'tool icons must be labelled');
assert.match(toolkit,/google\.com\/s2\/favicons\?domain=/,'tool cards must request real service favicons');
assert.match(toolkit,/onerror="this\.hidden=true"/,'tool favicons must fall back to monograms');
assert.match(toolkit,/e\.key==='Escape'/,'tool profile must close with Escape');
assert.match(toolkit,/prefers-reduced-motion:\s*reduce/,'toolkit motion must respect reduced-motion preferences');
assert.doesNotMatch(JSON.stringify(toolData),/[가-힣]/,'Tool Study Library data must be English');
// Footage Lab must remain private, local-only, and transparent about its limits.
const detector=fs.readFileSync(path.join(root,'detector.html'),'utf8');
assert.match(detector,/type="file"[^>]+accept="video\/\*"/,'Footage Lab needs a video file input');
assert.match(detector,/type="file"[^>]+aria-label=/,'Footage Lab file input needs an accessible name');
assert.match(detector,/role="progressbar"/,'Footage Lab progress needs an accessible role');
assert.match(detector,/<video[^>]+id="video"/,'Footage Lab needs a local analysis video element');
assert.match(detector,/<canvas[^>]+id="canvas"/,'Footage Lab needs a canvas for frame analysis');
assert.match(detector,/URL\.createObjectURL\(file\)/,'Footage Lab must keep video input local');
assert.match(detector,/getImageData\(/,'Footage Lab must analyze canvas pixels');
assert.match(detector,/decodeAudioData\(/,'Footage Lab must guard optional local WebAudio analysis');
assert.match(detector,/Your video never leaves your computer\./,'Footage Lab must show the privacy promise');
assert.match(detector,/fetch\('data\/ai_tools\.json'\)/,'Footage Lab suggestions must use the verified local catalogue');
assert.doesNotMatch(detector,/fetch\s*\(\s*['"]https?:\/\//,'Footage Lab must not call an external HTTP API');
assert.doesNotMatch(detector,/XMLHttpRequest|WebSocket|EventSource/,'Footage Lab must not use alternate network APIs');
assert.match(detector,/Media literacy: spot common AI-video tells/,'The previous detector lesson must remain as a secondary section');
assert.match(detector,/signals—not story, performance, intention, or meaning/i,'Footage Lab must not overclaim what it measures');
assert.match(concept,/<label[^>]+for="idea">/,'Concept idea input needs an associated label');
assert.match(concept,/id="out"[^>]+aria-live="polite"/,'Concept output status must be announced');
assert.match(concept,/<button[^>]+text-action[^>]+onclick="demo\(\)"/,'Concept demo affordance must be keyboard-operable');
assert.match(storyboard,/\(b\.citations\|\|\[\]\)/,'Storyboard must tolerate stale blueprints with missing citations');
assert.match(storyboard,/Array\.isArray\(candidate\.story\?\.acts\)/,'Storyboard must validate stored blueprint shape before rendering');

// Judge-facing claims must stay transparent and the product must not expose stale names.
const community=fs.readFileSync(path.join(root,'community.html'),'utf8');
for (const page of ['index.html','concept_lab.html','creators_room.html','shotseed.html','storyboard.html',...newPages]) {
  const visible=fs.readFileSync(path.join(root,page),'utf8').replace(/<script[\s\S]*?<\/script>/g,'');
  assert.doesNotMatch(visible,/SceneForge|E\.V\.E/ ,`${page} must not show a retired product name`);
}
assert.doesNotMatch(community,/coming soon/i,'Showcase must not contain a placeholder community CTA');
const communityData=JSON.parse(fs.readFileSync(path.join(root,'data/community.json'),'utf8'));
assert.ok(Array.isArray(communityData.entries)&&communityData.entries.length>=15,'Community Hub needs at least 15 sourced destinations');
assert.ok(Array.isArray(communityData.fallback_news)&&communityData.fallback_news.length>=3,'Community Hub needs an honest curated news fallback');
const communityKinds=new Set(['discord','news','subreddit','twitter','youtube','forum']);
const communityIds=new Set();
for(const entry of communityData.entries){
  for(const field of ['id','name','kind','url','blurb','brand_color','source']) assert.ok(entry[field],`${entry.id||'community entry'} missing ${field}`);
  assert.ok(!communityIds.has(entry.id),`duplicate community id ${entry.id}`);communityIds.add(entry.id);
  assert.ok(communityKinds.has(entry.kind),`${entry.id} has invalid kind`);
  assert.match(entry.url,/^https:\/\//,`${entry.id} needs an HTTPS destination`);
  assert.match(entry.source,/^https:\/\//,`${entry.id} needs an HTTPS verification source`);
  assert.match(entry.brand_color,/^#[0-9A-F]{6}$/i,`${entry.id} needs a hex brand color`);
  assert.doesNotMatch(JSON.stringify(entry),/[가-힣]/,`${entry.id} must be English`);
  if(entry.tool_id)assert.ok(toolIds.has(entry.tool_id),`${entry.id} references missing tool ${entry.tool_id}`);
}
assert.match(community,/fetch\('data\/community\.json'\)/,'Community Hub must render from its verified JSON directory');
for(const filter of ['all','discord','news','subreddit','social','clips'])assert.match(community,new RegExp(`data-filter="${filter}"`),`Community Hub missing ${filter} filter`);
assert.match(community,/ArrowLeft.*ArrowRight/,'Community filter tabs must support arrow-key navigation');
assert.match(community,/id="feed-sentinel"/,'Community Hub needs an infinite-scroll sentinel');
assert.match(community,/IntersectionObserver/,'Community Hub must progressively load feed items');
assert.match(community,/id="clips-section"/,'Community Hub needs a trending clips carousel');
assert.match(community,/Trending in AI video/,'Clips must be honestly labelled');
assert.match(community,/fetch\('\/api\/news'\)/,'Community Hub must request live normalized news');
assert.match(community,/news=community\.fallback_news\|\|\[\]/,'Live news failure must use curated local fallback data');
assert.match(community,/google\.com\/s2\/favicons\?domain=/,'Community cards must request source favicons');
assert.match(community,/onerror="this\.hidden=true"/,'Community favicons and thumbnails must retain fallbacks');
assert.match(community,/target="_blank" rel="noopener noreferrer"/,'External community links must open safely');
assert.match(community,/Native community: roadmap/,'Community Hub must keep the honest native-account roadmap note');
assert.doesNotMatch(community,/\b\d+[KM+]?\s+(followers|members|likes|comments|views)\b/i,'Community Hub must not invent engagement metrics');

// Live news parser is testable without the network and normalizes both RSS and Atom.
const newsHandler=require(path.join(root,'api/news'));
assert.equal(typeof newsHandler,'function','api/news.js must export a Vercel handler');
assert.equal(typeof newsHandler._test?.parseFeed,'function','news handler must expose its inline parser for deterministic tests');
const sampleRss=`<rss><channel><item><title>New &amp; real</title><link>https://example.com/post</link><pubDate>Sun, 19 Jul 2026 10:00:00 GMT</pubDate><media:thumbnail url="https://example.com/thumb.jpg"/></item></channel></rss>`;
const sampleAtom=`<feed><entry><title><![CDATA[Video update]]></title><link rel="alternate" href="https://youtube.com/watch?v=abc123"/><published>2026-07-20T10:00:00Z</published><yt:videoId>abc123</yt:videoId></entry></feed>`;
const parsedNews=[...newsHandler._test.parseFeed(sampleRss,{source:'Example',kind:'news'}),...newsHandler._test.parseFeed(sampleAtom,{source:'Example Video',kind:'youtube'})];
assert.equal(parsedNews.length,2,'inline feed parser must normalize RSS and Atom entries');
for(const item of parsedNews){for(const field of ['title','source','source_domain','url','published'])assert.equal(typeof item[field],'string',`normalized news ${field} must be a string`);assert.match(item.url,/^https:\/\//);}
assert.equal(parsedNews[0].title,'New & real','parser must decode XML entities');
assert.match(parsedNews[1].thumbnail,/i\.ytimg\.com\/vi\/abc123/,'YouTube entries must derive a real thumbnail URL');
assert.match(home,/Internal grounding audit:/,'Home must label the 25-vs-10 result as internal evidence');
assert.match(fs.readFileSync(path.join(root,'evaluation/RESULTS.md'),'utf8'),/source images[^\n]+not currently included/i,'Evaluation must disclose missing source artifacts');
const readme=fs.readFileSync(path.join(root,'README.md'),'utf8');
assert.doesNotMatch(readme,/\]\(https:\/\/youtube\.com\)/,'README must not ship a placeholder demo link');
assert.match(readme,/How Codex built this/,'README must explain concrete Codex implementation work');
for(const file of ['research/ai_pain_points.md','research/competitive_scan.md','research/win_audit.md']){
  const research=fs.readFileSync(path.join(root,file),'utf8');
  assert.match(research,/https:\/\//,`${file} must contain real source URLs`);
}

console.log(`Platform tests passed (6 nav tabs, ${newPages.length} new pages, Film School covers ${CITABLE_IDS.length} terms).`);
