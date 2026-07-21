const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const contests=JSON.parse(fs.readFileSync(path.join(root,'data/contests.json'),'utf8'));
assert.ok(contests.contests.length>=1,'Curated contest list must remain available');
assert.ok(contests.contests.some(c=>c.deadline==='see_site'),'Unconfirmed deadlines must remain see_site');
const data=new Map();
const context={sessionStorage:{setItem:(k,v)=>data.set(k,v),getItem:k=>data.get(k)||null,removeItem:k=>data.delete(k)}};
vm.runInNewContext(fs.readFileSync(path.join(root,'js/eve-state.js'),'utf8'),context);
const contest=contests.contests[0];
assert.equal(context.EVE_STATE.saveIntake({production_type:'animation',target_type:'contest',contest}),true);
assert.equal(context.EVE_STATE.loadIntake().contest.id,contest.id);
assert.equal(context.EVE_STATE.saveShotDirection({query:'warm close-up',recommendation_ids:[1]}),true);
assert.equal(context.EVE_STATE.loadShotDirection().recommendation_ids[0],1);
assert.equal(context.EVE_STATE.saveShotDirection({query:'bad',recommendation_ids:'1'}),false,'Shot direction rejects malformed IDs');
data.set(context.EVE_STATE.SHOT_KEY,JSON.stringify({version:1,query:'bad',recommendation_ids:['x']}));
assert.equal(context.EVE_STATE.loadShotDirection(),null,'Malformed stored shot direction is removed');
assert.equal(data.has(context.EVE_STATE.SHOT_KEY),false);
for(const [file,step] of [['index.html','0 · Intake'],['concept_lab.html','1 · Concept'],['index.html',"2 · Creator's Room"],['creators_room.html',"The Creator's Room"],['shotseed.html','3 · Shot Design'],['storyboard.html','4 · Storyboard']]){
  const source=fs.readFileSync(path.join(root,file),'utf8');assert.ok(source.includes(step),file+' missing pipeline step');
}
assert.ok(fs.readFileSync(path.join(root,'concept_lab.html'),'utf8').includes('Contest fit'));
const conceptSource=fs.readFileSync(path.join(root,'concept_lab.html'),'utf8');
for(const match of conceptSource.matchAll(/ideal:\[(\d+),(\d+)\]/g)){
  assert.ok(Number(match[1])>=1&&Number(match[2])<=10,'Concept runtime bands must use the 1–10 minute short-film input unit');
}
const shotseedSource=fs.readFileSync(path.join(root,'shotseed.html'),'utf8');
assert.match(shotseedSource,/results-meta\">\"\$\{esc\(input\)\}/,'ShotSeed must escape the displayed user query');
assert.match(shotseedSource,/kw-chip\">\$\{esc\(k\)\}/,'ShotSeed must escape user-derived match chips');
assert.match(conceptSource,/useReferenceDemo/,'Fallback reference must require an explicit user choice before handoff');

// Creator's Room: five-role critique loop wired end to end (fallback must be self-sufficient).
const api=new Map();
const ctx={window:{},fetch:()=>Promise.reject(new Error('offline'))};
vm.runInNewContext(fs.readFileSync(path.join(root,'js/eve-api.js'),'utf8'),ctx);
vm.runInNewContext(fs.readFileSync(path.join(root,'js/eve-crew.js'),'utf8'),ctx);
const {story}=ctx.window.EVE_API.fallback('t',{idea:'chess',genre:'animated_short'});
const {crew,meta}=ctx.window.EVE_CREW.fallbackCrew(story,{idea:'chess'});
assert.equal(meta.source,'fallback');
assert.equal(crew.crew.length,5,'crew must have five roles');
assert.equal(crew.crew.map(c=>c.role).sort().join(','),'cinematographer,director,editor,test_audience,writer');
assert.ok(crew.revisions.length>=3,'crew must apply at least three fixes');
assert.ok(crew.score_after>=crew.score_before,'score must not regress');
const {CITABLE_ID_SET}=require(path.join(root,'lib/craft-knowledge'));
crew.crew.concat(crew.revisions).forEach(x=>(x.grounded_in||[]).forEach(id=>assert.ok(CITABLE_ID_SET.has(id),'invalid citation '+id)));
const improved=ctx.window.EVE_CREW.applyRevisions(story,crew);
assert.ok(improved._crew_reviewed,'applyRevisions must flag the blueprint');
// server-side endpoint accepts the same shape
const {validate}=require(path.join(root,'api/creators-room'))._test;
assert.ok(validate(JSON.parse(JSON.stringify(crew))),'server validate must accept crew output');
console.log('Guided pipeline + Creator\'s Room tests passed.');
