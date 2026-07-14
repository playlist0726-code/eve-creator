(function (global) {
  'use strict';
  const KEY = 'eve.storyBlueprint.v1';
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
  global.EVE_STATE={KEY,saveBlueprint,loadBlueprint};
})(typeof window==='undefined'?globalThis:window);
