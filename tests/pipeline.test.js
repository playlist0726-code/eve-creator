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
for(const [file,step] of [['index.html','0 · Intake'],['concept_lab.html','1 · Concept'],['shotseed.html','2 · Shot Design'],['storyboard.html','3 · Storyboard']]){
  const source=fs.readFileSync(path.join(root,file),'utf8');assert.ok(source.includes(step),file+' missing pipeline step');
}
assert.ok(fs.readFileSync(path.join(root,'concept_lab.html'),'utf8').includes('Contest fit'));
console.log('Guided pipeline tests passed.');
