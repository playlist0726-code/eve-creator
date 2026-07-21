(function(global){
  'use strict';
  var KEY='ff.learner.v1';
  var EMPTY={track:null,modules_completed:[],lessons_read:[],artifacts:[],skills:{}};
  var courses=[];
  var SKILLS=['Story','Framing','Light & Colour','Editing','Prompting'];
  var GROUPS={
    Story:['three_act','hero_journey','save_the_cat','pixar_spine','kishotenketsu','freytag','emotional_core','hook_strength','structural_completeness','originality_vs_familiarity','genre_fit','specificity'],
    Framing:['EWS','WS','MLS','MS','MCU','CU','ECU','INSERT','eye_level','high_angle','low_angle','overhead_topdown','dutch_tilt','over_the_shoulder','pov','wide_angle','normal','telephoto','macro','rule_of_thirds','central_symmetry','leading_lines','framing_within_frame','depth_layering','negative_space','headroom_leadroom','180_degree_rule','depth_staging','symmetrical_blocking','proxemics','negative_space_isolation','movement_toward_away'],
    'Light & Colour':['high_key','low_key','chiaroscuro','rembrandt','three_point','silhouette','backlight_rim','practical_motivated','golden_hour','top_light','underlight','complementary','analogous','triadic','monochrome','split_complementary','texture_materiality'],
    Editing:['shot_reverse_shot','long_take','slow_cutting','fast_cutting','match_cut','cross_cutting','montage','static','pan','tilt','dolly_in','dolly_out','tracking','crane_boom','handheld','steadicam','whip_pan','crash_zoom','rack_focus','runtime_discipline'],
    Prompting:['veo_3_1','kling_3_0','runway_gen_4_5','minimax_hailuo_2_3','luma_ray_3','seedance','sora_2','midjourney_v6','gpt_image_1','nano_banana_pro','stable_diffusion_xl','shareability']
  };
  function unique(a){return [...new Set(Array.isArray(a)?a:[])];}
  function clean(v){
    v=v&&typeof v==='object'?v:{};
    return {track:['kids','beginner','student'].includes(v.track)?v.track:null,modules_completed:unique(v.modules_completed).filter(String),lessons_read:unique(v.lessons_read).filter(String),artifacts:Array.isArray(v.artifacts)?v.artifacts.slice(-40):[],skills:{}};
  }
  function load(){try{return clean(JSON.parse(global.localStorage.getItem(KEY)||'null'));}catch(_){return clean();}}
  function save(p){var next=clean(p);try{global.localStorage.setItem(KEY,JSON.stringify(next));return next;}catch(_){return next;}}
  function update(fn){var p=load();fn(p);return save(p);}
  function setTrack(track){return update(function(p){p.track=track;});}
  function completeModule(id,artifact){return update(function(p){p.modules_completed=unique(p.modules_completed.concat(id));if(artifact)p.artifacts.push(Object.assign({module_id:id,saved_at:new Date().toISOString()},artifact));});}
  function markLesson(id){return update(function(p){p.lessons_read=unique(p.lessons_read.concat(id));});}
  function addArtifact(artifact){return update(function(p){p.artifacts.push(Object.assign({saved_at:new Date().toISOString()},artifact));});}
  function reset(){try{global.localStorage.removeItem(KEY);}catch(_){}global.dispatchEvent&&global.dispatchEvent(new CustomEvent('ff-progress-change'));return clean();}
  function configure(data){courses=Array.isArray(data)?data:(data&&data.modules)||[];return api;}
  function scores(profile){
    var p=profile||load(),raw=Object.fromEntries(SKILLS.map(function(k){return[k,0];}));
    p.modules_completed.forEach(function(id){var m=courses.find(function(x){return x.id===id;});(m&&m.teaches||[]).forEach(function(craft){SKILLS.forEach(function(skill){if(GROUPS[skill].includes(craft))raw[skill]+=12;});});});
    p.lessons_read.forEach(function(craft){SKILLS.forEach(function(skill){if(GROUPS[skill].includes(craft))raw[skill]+=4;});});
    p.artifacts.forEach(function(a){(a.dimension_deltas||[]).forEach(function(d){var gain=Math.max(0,Number(d.after)-Number(d.before));var skill={emotional_core:'Story',hook_strength:'Story',structural_completeness:'Story',originality_vs_familiarity:'Story',genre_fit:'Story',runtime_discipline:'Editing',specificity:'Prompting',shareability:'Prompting'}[d.id];if(skill)raw[skill]+=Math.min(20,gain);});});
    return Object.fromEntries(SKILLS.map(function(k){return[k,Math.min(100,raw[k])];}));
  }
  function stripHTML(profile){var s=scores(profile);return '<section class="ff-profile" aria-label="Learning profile"><div><b>Learning profile</b><span>Saved on this device. No account needed.</span></div><div class="ff-skills">'+SKILLS.map(function(k){return '<div><label>'+k+' <span>'+s[k]+'%</span></label><meter min="0" max="100" value="'+s[k]+'">'+s[k]+'%</meter></div>';}).join('')+'</div><button type="button" data-ff-reset>Reset</button></section>';}
  function mount(selector){var host=typeof selector==='string'?document.querySelector(selector):selector;if(!host)return;host.innerHTML=stripHTML(load());var b=host.querySelector('[data-ff-reset]');if(b)b.addEventListener('click',function(){reset();mount(host);});}
  var api={KEY:KEY,load:load,save:save,setTrack:setTrack,completeModule:completeModule,markLesson:markLesson,addArtifact:addArtifact,reset:reset,configure:configure,scores:scores,mount:mount,stripHTML:stripHTML};
  global.FF_PROGRESS=api;
})(typeof window==='undefined'?globalThis:window);
