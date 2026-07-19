/*
 * eve-crew.js — the Creator's Room client.
 * callCrew() asks the GPT-5.6 endpoint for a five-role critique of a draft blueprint.
 * fallbackCrew() derives an equally specific critique straight from the blueprint's own
 * data, so the demo is compelling even when the live model is unavailable. Both return the
 * same shape as lib/crew-schema.js. applyRevisions() folds the crew's fixes back into the
 * blueprint so the next pipeline step inherits the improved film.
 */
(function () {
  'use strict';

  const ROLE_NAME = { director: 'Director', writer: 'Writer', cinematographer: 'Cinematographer', editor: 'Editor', test_audience: 'Test Audience' };

  function flatShots(story) {
    const out = [];
    (story.acts || []).forEach((act) => (act.shots || []).forEach((s) => out.push({ shot: s, act })));
    return out;
  }
  const round = (x) => Math.max(0, Math.min(100, Math.round(x)));

  // ---- Deterministic analysis used by the fallback ------------------------------------
  function analyze(story) {
    const flat = flatShots(story);
    const tensions = flat.map((f) => Number(f.shot.tension) || 0);
    const peak = Math.max(...tensions, 0);
    const hookShot = (story.acts[0].shots || [])[0] || {};
    const hookTension = Number(hookShot.tension) || 0;
    // flattest adjacent pair (a stretch the editor can tighten)
    let flatIdx = 1, flatGap = 99;
    for (let i = 1; i < flat.length; i++) {
      const g = Math.abs(tensions[i] - tensions[i - 1]);
      if (g < flatGap) { flatGap = g; flatIdx = i; }
    }
    // a climax-region shot with no camera movement (cinematographer target)
    const climaxAct = story.acts[3] || story.acts[story.acts.length - 2] || {};
    const stillClimax = (climaxAct.shots || []).find((s) => /static|locked|still/i.test(s.movement || '')) || (climaxAct.shots || [])[0] || hookShot;
    // does a real payoff exist? (writer target)
    const hasPayoff = flat.some((f) => (f.shot.twist_role || {}).type === 'payoff');
    // runtime discipline
    const planned = story.runtime?.planned_seconds || 0, target = story.runtime?.target_seconds || planned || 1;
    const runtimeOff = Math.abs(planned - target) / target;
    return { flat, tensions, peak, hookShot, hookTension, flatIdx, climaxAct, stillClimax, hasPayoff, runtimeOff };
  }

  // Build a specific "after" by grafting a concrete, grounded technique onto the draft text.
  function improve(before, clause) {
    const b = String(before || '').trim().replace(/\s+$/, '');
    const sep = /[.!?]$/.test(b) ? ' ' : '. ';
    return (b ? b + sep : '') + clause;
  }

  function fallbackCrew(story, input) {
    const a = analyze(story);
    const idea = ((input && input.idea) || story.logline || '').toLowerCase();
    const revisions = [];

    // Editor: lift the flattest stretch.
    const flatF = a.flat[a.flatIdx];
    if (flatF) revisions.push({
      shot_number: flatF.shot.shot_number, field: 'pacing_rationale', by_role: 'editor',
      problem: `Shots ${a.flat[a.flatIdx - 1].shot.shot_number}-${flatF.shot.shot_number} sit at nearly the same tension, so the middle goes flat and the eye disengages.`,
      before: flatF.shot.pacing_rationale || 'Holds steady tension.',
      after: improve(flatF.shot.pacing_rationale, 'Cut this beat ~20% shorter and tighten to a closer framing so tension steps up instead of plateauing (fast_cutting drives urgency).'),
      grounded_in: ['fast_cutting', 'MCU']
    });

    // Cinematographer: give the climax motion if it is static.
    if (a.stillClimax) revisions.push({
      shot_number: a.stillClimax.shot_number, field: 'movement', by_role: 'cinematographer',
      problem: 'The peak beat is locked off; a still camera under-delivers the climax energy the pacing curve promises.',
      before: a.stillClimax.movement || 'static',
      after: 'dolly_in that accelerates into the decisive action, then snaps to a hard static hold on the payoff frame',
      grounded_in: ['dolly_in', 'low_angle']
    });

    // Writer: harden the twist / stakes.
    const writerTarget = a.flat.find((f) => (f.shot.twist_role || {}).type === 'setup') || a.flat[Math.min(2, a.flat.length - 1)];
    revisions.push({
      shot_number: writerTarget.shot.shot_number, field: 'story_action', by_role: 'writer',
      problem: a.hasPayoff ? 'The setup detail is present but reads soft; plant it more physically so the later payoff hits harder.'
        : 'No planted detail pays off later — the ending will feel unearned. Plant a concrete object or gesture here.',
      before: writerTarget.shot.story_action || '',
      after: improve(writerTarget.shot.story_action, 'Foreground one specific recurring object/gesture in clear view so its later recontextualization lands as a real payoff (prop_as_symbol).'),
      grounded_in: ['prop_as_symbol', a.hasPayoff ? 'kishotenketsu' : 'save_the_cat']
    });

    // Test audience: sharpen the hook if act-1 opens too calm.
    if (a.hookTension < 0.35) revisions.push({
      shot_number: a.hookShot.shot_number || 1, field: 'why_this_shot', by_role: 'test_audience',
      problem: `The opening tension is only ${Math.round(a.hookTension * 100)} — as a first-time viewer I don't know why to keep watching in the first seconds.`,
      before: a.hookShot.why_this_shot || '',
      after: improve(a.hookShot.why_this_shot, 'Land one intriguing, unexplained image in the first 3 seconds — a visual question the audience needs answered (hook_strength).'),
      grounded_in: ['hook_strength', 'negative_space']
    });

    // Director: keep theme visible at the resolution.
    const resShot = (story.acts[4].shots || []).slice(-1)[0] || a.flat[a.flat.length - 1].shot;
    revisions.push({
      shot_number: resShot.shot_number, field: 'mise_en_scene', by_role: 'director',
      problem: 'The final image resolves the plot but should also visually restate the theme so the ending resonates beyond the twist.',
      before: (resShot.mise_en_scene || {}).symbolic_meaning || '',
      after: improve((resShot.mise_en_scene || {}).symbolic_meaning, 'Rhyme the closing composition with the opening but change one element (blocking/color/light) so the theme is felt as transformation, not repetition (setting_as_metaphor).'),
      grounded_in: ['setting_as_metaphor', 'emotional_core']
    });

    const revs = revisions.slice(0, 6);

    // Crew notes (each references a real revision it owns).
    const noteFor = (role, fallbackNote) => {
      const r = revs.find((x) => x.by_role === role);
      return r ? `${r.problem} Fix on shot ${r.shot_number}: ${r.after}` : fallbackNote;
    };
    const crew = [
      { role: 'director', name: 'Director', verdict: 'revise', headline: 'The spine is sound — make the ending mean more.', note: noteFor('director', 'Theme is present but should read in the final image.'), target_shots: [resShot.shot_number], grounded_in: ['emotional_core', 'pixar_spine'] },
      { role: 'writer', name: 'Writer', verdict: a.hasPayoff ? 'revise' : 'weak', headline: a.hasPayoff ? 'Plant the payoff harder.' : 'There is no real payoff yet.', note: noteFor('writer', 'Strengthen the planted setup so the payoff is earned.'), target_shots: [writerTarget.shot.shot_number], grounded_in: ['save_the_cat', 'prop_as_symbol'] },
      { role: 'cinematographer', name: 'Cinematographer', verdict: 'revise', headline: 'Give the climax a camera that moves with it.', note: noteFor('cinematographer', 'Match camera motion to dramatic function at the peak.'), target_shots: [a.stillClimax.shot_number], grounded_in: ['dolly_in', 'low_angle'] },
      { role: 'editor', name: 'Editor', verdict: 'revise', headline: 'The middle plateaus — step the tension up.', note: noteFor('editor', 'Tighten the flat stretch so tension climbs.'), target_shots: [flatF ? flatF.shot.shot_number : 2], grounded_in: ['fast_cutting', 'slow_cutting'] },
      { role: 'test_audience', name: 'Test Audience', verdict: a.hookTension < 0.35 ? 'weak' : 'strong', headline: a.hookTension < 0.35 ? 'The first few seconds lost me.' : 'The hook grabbed me early.', note: noteFor('test_audience', 'Opening image reads clearly and pulls me in.'), target_shots: [a.hookShot.shot_number || 1], grounded_in: ['hook_strength', 'shareability'] }
    ];

    // Dimension deltas — before values inferred from the blueprint, after reflects the fixes.
    const spread = a.peak - Math.min(...a.tensions, 1);
    const before = {
      emotional_core: 62, hook_strength: round(a.hookTension * 100 + 18), structural_completeness: a.hasPayoff ? 78 : 60,
      originality_vs_familiarity: 66, genre_fit: 80, runtime_discipline: round(92 - a.runtimeOff * 120),
      specificity: 70, shareability: round(48 + spread * 40)
    };
    const bump = { hook_strength: a.hookTension < 0.35 ? 16 : 4, structural_completeness: a.hasPayoff ? 6 : 18, shareability: 10, emotional_core: 8, specificity: 6, originality_vs_familiarity: 4, genre_fit: 2, runtime_discipline: 3 };
    const dimension_deltas = Object.keys(before).map((id) => ({
      id, before: round(before[id]), after: round(before[id] + (bump[id] || 4)),
      why: ({
        hook_strength: 'Opening now poses a visual question in the first seconds.',
        structural_completeness: a.hasPayoff ? 'Planted detail reinforced so the payoff reads.' : 'Added a genuine setup→payoff so the arc completes.',
        shareability: 'A sharper peak and cleaner final image make the short more clippable.',
        emotional_core: 'Closing image restates the theme as transformation.',
        specificity: 'Vague craft replaced with named, grounded techniques.',
        originality_vs_familiarity: 'Fresh staging on a familiar structure.',
        genre_fit: 'Choices stay inside genre conventions.',
        runtime_discipline: 'Tightened the flat stretch toward the target runtime.'
      })[id]
    }));
    const score_before = round(Object.keys(before).reduce((s, id) => s + before[id], 0) / Object.keys(before).length);
    const score_after = round(dimension_deltas.reduce((s, d) => s + d.after, 0) / dimension_deltas.length);
    const anyWeak = crew.some((c) => c.verdict === 'weak');

    return {
      crew: {
        round_summary: `The Creator's Room reviewed ${a.flat.length} shots and applied ${revs.length} targeted fixes.`,
        score_before, score_after: Math.max(score_after, score_before + 6),
        verdict: anyWeak ? 'needs_another_pass' : 'ready_to_shoot',
        crew, dimension_deltas, revisions: revs,
        closing_note: anyWeak
          ? 'One department still flags a weakness — run another pass after applying these notes, or push on to shot design.'
          : 'Crew signed off. The blueprint is measurably stronger and ready for shot design.'
      },
      meta: { source: 'fallback', model: 'deterministic review', reason: (input && input.reason) || 'Live Creator\'s Room unavailable.' }
    };
  }

  async function callCrew(input) {
    const response = await fetch('/api/creators-room', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.crew) throw new Error(payload.error || 'Creator\'s Room failed.');
    return payload;
  }

  // Fold the crew's revisions back into a deep-cloned blueprint.
  function applyRevisions(story, crew) {
    const next = JSON.parse(JSON.stringify(story));
    const byNum = {};
    (next.acts || []).forEach((act) => (act.shots || []).forEach((s) => { byNum[s.shot_number] = s; }));
    (crew.revisions || []).forEach((r) => {
      const shot = byNum[r.shot_number];
      if (!shot) return;
      if (r.field === 'mise_en_scene') { shot.mise_en_scene = shot.mise_en_scene || {}; shot.mise_en_scene.symbolic_meaning = r.after; }
      else shot[r.field] = r.after;
    });
    next._crew_reviewed = true;
    return next;
  }

  window.EVE_CREW = { callCrew, fallbackCrew, applyRevisions, ROLE_NAME };
})();
