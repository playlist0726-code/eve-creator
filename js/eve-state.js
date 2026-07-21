(function (global) {
  'use strict';
  const KEY = 'eve.storyBlueprint.v1';
  const INTAKE_KEY = 'eve.intake.v1';
  const SHOT_KEY = 'eve.shotDirection.v1';
  function valid(value) {
    return Boolean(value && value.version === 1 && value.story &&
      Array.isArray(value.story.acts) && value.story.acts.length===5 &&
      value.story.acts.every(act=>Array.isArray(act.shots)&&act.shots.length>=2));
  }
  function saveBlueprint(payload, input) {
    const value = {version:1,saved_at:new Date().toISOString(),input:input||{},story:payload&&payload.story,meta:payload&&payload.meta||{source:'fallback'}};
    if (!valid(value)) return false;
    try { global.sessionStorage.setItem(KEY, JSON.stringify(value)); return true; } catch (_) { return false; }
  }
  function loadBlueprint() {
    try {
      const raw=global.sessionStorage.getItem(KEY); if(!raw)return null;
      const value=JSON.parse(raw); if(!valid(value)){global.sessionStorage.removeItem(KEY);return null;} return value;
    } catch (_) { return null; }
  }
  function clearBlueprint(){try{global.sessionStorage.removeItem(KEY);return true;}catch(_){return false;}}
  function saveJSON(key,value){try{global.sessionStorage.setItem(key,JSON.stringify(value));return true;}catch(_){return false;}}
  function loadJSON(key){try{const raw=global.sessionStorage.getItem(key);return raw?JSON.parse(raw):null;}catch(_){return null;}}
  function forgetInvalid(key){try{global.sessionStorage.removeItem(key);}catch(_){}return null;}
  function validIntake(value){return Boolean(value&&value.version===1&&['animation','live_action'].includes(value.production_type)&&['personal','contest'].includes(value.target_type)&&(
    value.target_type!=='contest'||(value.contest&&typeof value.contest.id==='string'&&typeof value.contest.name==='string')));}
  function saveIntake(intake){const value={version:1,...intake};return validIntake(value)&&saveJSON(INTAKE_KEY,value);}
  function loadIntake(){const value=loadJSON(INTAKE_KEY);return validIntake(value)?value:forgetInvalid(INTAKE_KEY);}
  function validShotDirection(value){return Boolean(value&&value.version===1&&typeof value.query==='string'&&value.query.length<=2000&&
    Array.isArray(value.recommendation_ids)&&value.recommendation_ids.every(id=>Number.isInteger(id))&&
    (value.selected_id==null||value.recommendation_ids.includes(value.selected_id)));}
  function saveShotDirection(value){const next={version:1,...value};return validShotDirection(next)&&saveJSON(SHOT_KEY,next);}
  function loadShotDirection(){const value=loadJSON(SHOT_KEY);return validShotDirection(value)?value:forgetInvalid(SHOT_KEY);}
  global.EVE_STATE={KEY,INTAKE_KEY,SHOT_KEY,saveBlueprint,loadBlueprint,clearBlueprint,saveIntake,loadIntake,saveShotDirection,loadShotDirection};
})(typeof window==='undefined'?globalThis:window);
