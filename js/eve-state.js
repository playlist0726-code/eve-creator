(function (global) {
  'use strict';
  const KEY = 'eve.storyBlueprint.v1';
  const INTAKE_KEY = 'eve.intake.v1';
  const SHOT_KEY = 'eve.shotDirection.v1';
  function valid(value) {
    return Boolean(value && value.version === 1 && value.story &&
      Array.isArray(value.story.beats) && value.story.beats.length &&
      value.story.beats.length <= 12 &&
      value.story.beats.every(beat => beat && typeof beat === 'object' && beat.shot && typeof beat.shot === 'object'));
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
  function saveJSON(key,value){try{global.sessionStorage.setItem(key,JSON.stringify(value));return true;}catch(_){return false;}}
  function loadJSON(key){try{const raw=global.sessionStorage.getItem(key);return raw?JSON.parse(raw):null;}catch(_){return null;}}
  function saveIntake(intake){if(!intake||!['animation','live_action'].includes(intake.production_type)||!['personal','contest'].includes(intake.target_type))return false;return saveJSON(INTAKE_KEY,{version:1,...intake});}
  function loadIntake(){const value=loadJSON(INTAKE_KEY);return value&&value.version===1?value:null;}
  function saveShotDirection(value){return saveJSON(SHOT_KEY,{version:1,...value});}
  function loadShotDirection(){const value=loadJSON(SHOT_KEY);return value&&value.version===1?value:null;}
  global.EVE_STATE={KEY,INTAKE_KEY,SHOT_KEY,saveBlueprint,loadBlueprint,saveIntake,loadIntake,saveShotDirection,loadShotDirection};
})(typeof window==='undefined'?globalThis:window);
