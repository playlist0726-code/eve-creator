/*
 * eve-glossary.js — the education layer.
 * Every craft ID E.V.E cites is defined here in plain language: what it is, and what it
 * *does* to the audience. This is what turns the whole product into a teacher — a learner
 * building their film can tap any cited term and learn the film-craft principle behind it.
 * Keyed by the exact 111 IDs in lib/craft-knowledge.js (grounding stays consistent).
 */
(function (global) {
  'use strict';
  var G = {
    // Story structures
    three_act: ['Three-Act Structure', 'Setup, confrontation, resolution — the backbone of most films. It keeps a story from wandering by forcing a turn at the end of each act.'],
    hero_journey: ["Hero's Journey", 'A 12-stage adventure template (ordinary world → call → ordeal → return). Great for myth, fantasy, and coming-of-age arcs.'],
    save_the_cat: ['Save the Cat!', 'A 15-beat screenwriting map that times each story turn. Popular in comedy and mainstream features for reliable pacing.'],
    pixar_spine: ['Pixar Story Spine', '"Once upon a time… every day… until one day… because of that… until finally." A simple engine for causal, emotional shorts.'],
    kishotenketsu: ['Kishōtenketsu', 'A four-part East-Asian structure that turns on a surprising twist instead of conflict — introduction, development, twist, reconciliation.'],
    freytag: ["Freytag's Pyramid", 'Exposition → rising action → climax → falling action → dénouement. The classic dramatic arc.'],
    // Shot sizes
    EWS: ['Extreme Wide Shot', 'The subject is tiny in a vast space. Establishes place and makes a character feel small, lost, or free.'],
    WS: ['Wide Shot', 'Shows the whole figure and surroundings. Good for context, geography, and physical action.'],
    MLS: ['Medium Long Shot', 'Frames a person from about the knees up — between environment and intimacy.'],
    MS: ['Medium Shot', 'Waist up. The everyday conversational distance; neutral and readable.'],
    MCU: ['Medium Close-Up', 'Chest and head. Close enough for emotion, wide enough to keep some body language.'],
    CU: ['Close-Up', 'The face fills the frame. Forces the audience to read emotion and makes a moment important.'],
    ECU: ['Extreme Close-Up', 'A single detail — an eye, a hand, an object. Maximum intensity or significance.'],
    INSERT: ['Insert Shot', 'A quick cut to a specific detail (a note, a clock, a trigger). Directs attention to what matters.'],
    // Angles
    eye_level: ['Eye-Level Angle', 'Camera meets the subject as an equal. Neutral, honest, relatable.'],
    high_angle: ['High Angle', 'Looking down on the subject. Makes them feel smaller, weaker, or vulnerable.'],
    low_angle: ['Low Angle', 'Looking up at the subject. Makes them feel powerful, dominant, or heroic.'],
    overhead_topdown: ['Overhead / Top-Down', 'Straight down from above. Turns a scene into a pattern and suggests fate or control.'],
    dutch_tilt: ['Dutch Tilt', 'The camera is tilted off-level. Creates unease, tension, or a world out of balance.'],
    over_the_shoulder: ['Over-the-Shoulder', 'Shot from behind one person toward another. Builds connection and conversation geometry.'],
    pov: ['Point of View', "The camera becomes a character's eyes. Puts the audience directly inside their experience."],
    // Movement
    static: ['Static Camera', 'The camera holds still. Feels controlled, observational, or tense depending on what fills the frame.'],
    pan: ['Pan', 'The camera pivots left/right. Reveals space or follows action along a line.'],
    tilt: ['Tilt', 'The camera pivots up/down. Reveals height, scale, or a slow discovery.'],
    dolly_in: ['Dolly In', 'The camera physically moves toward the subject. Intensifies a realization or emotion.'],
    dolly_out: ['Dolly Out', 'The camera pulls back. Isolates a character or reveals a bigger, often lonelier, context.'],
    tracking: ['Tracking Shot', 'The camera travels alongside a moving subject. Adds momentum and keeps us with them.'],
    crane_boom: ['Crane / Boom', 'The camera sweeps up or down through space. Grand reveals and emotional lift.'],
    handheld: ['Handheld', 'Loose, human camera movement. Feels raw, urgent, immediate, documentary-like.'],
    steadicam: ['Steadicam', 'Smooth floating movement through space. Immersive without the shake of handheld.'],
    whip_pan: ['Whip Pan', 'A fast blur-pan between subjects. Energy, comedy, or a sudden connection.'],
    crash_zoom: ['Crash Zoom', 'A sudden fast zoom in. Shock, emphasis, or comic punctuation.'],
    rack_focus: ['Rack Focus', 'Shifting focus from one plane to another within a shot. Links two things or redirects attention.'],
    // Lenses, composition, editing
    wide_angle: ['Wide-Angle Lens', 'Exaggerates depth and space; can distort up close. Makes rooms feel big and gestures dramatic.'],
    normal: ['Normal Lens', 'Roughly how the human eye sees. Natural, undistorted perspective.'],
    telephoto: ['Telephoto Lens', 'Compresses distance and isolates the subject with a soft background. Intimate or voyeuristic.'],
    macro: ['Macro Lens', 'Extreme detail on tiny subjects. Turns a small object into a whole world.'],
    rule_of_thirds: ['Rule of Thirds', 'Place key elements on the thirds lines, not dead-center. Creates balanced, dynamic framing.'],
    central_symmetry: ['Central Symmetry', 'Perfectly centered, mirrored framing. Encodes order, duality, or unease (a Kubrick/Anderson look).'],
    leading_lines: ['Leading Lines', 'Lines in the frame guide the eye to the subject. Adds depth and direction.'],
    framing_within_frame: ['Frame Within a Frame', 'Using doorways/windows to frame the subject. Can trap, isolate, or focus them.'],
    depth_layering: ['Depth Layering', 'Foreground, midground, background stacked. Creates dimensionality and visual hierarchy.'],
    negative_space: ['Negative Space', 'Empty area around the subject. Creates loneliness, tension, or elegant focus.'],
    headroom_leadroom: ['Headroom & Lead Room', 'Space above the head and in the direction of a look/motion. Keeps framing comfortable and directional.'],
    '180_degree_rule': ['180° Rule', 'Keep the camera on one side of the action line so screen directions stay consistent and the audience never gets lost.'],
    shot_reverse_shot: ['Shot / Reverse Shot', 'Cutting between two people talking. The grammar of a conversation.'],
    long_take: ['Long Take', 'One unbroken shot held for a long time. Builds tension or immersion without cutting away.'],
    slow_cutting: ['Slow Cutting', 'Long-held shots, few cuts. Gives weight, calm, and contemplation.'],
    fast_cutting: ['Fast Cutting', 'Many quick cuts. Creates urgency, energy, or comedy.'],
    match_cut: ['Match Cut', 'Cutting on a matching shape or motion between scenes. Poetic, seamless linkage.'],
    cross_cutting: ['Cross-Cutting', 'Intercutting two parallel actions. Builds suspense or shows connection between events.'],
    montage: ['Montage', 'A sequence of short shots compressing time or change. Growth, training, passage of time.'],
    // Mise-en-scène — lighting
    high_key: ['High-Key Lighting', 'Bright, low-contrast, few shadows. Feels cheerful, safe, comedic, or clean.'],
    low_key: ['Low-Key Lighting', 'Dark, high-contrast, deep shadows. Feels tense, mysterious, or dangerous.'],
    chiaroscuro: ['Chiaroscuro', 'Bold light-vs-dark contrast. Encodes drama, moral duality, and danger.'],
    rembrandt: ['Rembrandt Lighting', 'A small triangle of light on the shadowed cheek. Classic, dimensional portrait mood.'],
    three_point: ['Three-Point Lighting', 'Key, fill, and back light — the standard setup that shapes a subject cleanly.'],
    silhouette: ['Silhouette', 'Subject dark against a bright background. Mystery, anonymity, or iconic shape.'],
    backlight_rim: ['Backlight / Rim Light', 'Light from behind edges the subject with a glow. Warmth, memory, or separation from the background.'],
    practical_motivated: ['Practical / Motivated Light', 'Light that comes from sources in the scene (lamps, windows). Feels real and grounded.'],
    golden_hour: ['Golden Hour', 'Warm, low sun light. Nostalgia, warmth, transience, romance.'],
    top_light: ['Top Light', 'Light straight from above. Can feel spiritual, oppressive, or isolating.'],
    underlight: ['Underlight', 'Light from below. Unnatural and unsettling — the campfire "horror" look.'],
    complementary: ['Complementary Colors', 'Opposite colors (e.g., teal/orange) side by side. Creates tension, contrast, and pop.'],
    analogous: ['Analogous Colors', 'Neighboring colors on the wheel. Creates harmony and emotional unity.'],
    triadic: ['Triadic Colors', 'Three evenly spaced colors. Vibrant yet balanced.'],
    monochrome: ['Monochrome', 'One color/hue throughout. Concentrates a single mood powerfully.'],
    split_complementary: ['Split-Complementary', 'A base color plus the two beside its opposite. Contrast with less tension than pure complementary.'],
    // Mise-en-scène — staging
    depth_staging: ['Depth Staging', 'Arranging actors across foreground/background. Shows relationships and hierarchy in one shot.'],
    symmetrical_blocking: ['Symmetrical Blocking', 'Mirrored placement of figures. Encodes confrontation, duality, or balance.'],
    proxemics: ['Proxemics', 'How close or far characters stand. Distance encodes power, intimacy, or conflict.'],
    negative_space_isolation: ['Isolation via Negative Space', 'Surrounding a character with emptiness to make them feel alone.'],
    movement_toward_away: ['Movement Toward / Away', 'Characters moving closer or apart. Externalizes connection or rejection.'],
    prop_as_symbol: ['Prop as Symbol', 'An object carries theme (a ring, a clock, a toy). Lets meaning live in a thing you can see.'],
    setting_as_metaphor: ['Setting as Metaphor', 'The location mirrors the inner state (a storm, an empty room). The world reflects the feeling.'],
    wardrobe_signals: ['Wardrobe Signals', 'Costume tracks identity and change. A shift in clothing shows a shift in the character.'],
    texture_materiality: ['Texture & Materiality', 'The tactile feel of surfaces. Adds believability and sensory mood.'],
    // Director styles
    pixar: ['Pixar', 'Emotion-first 3D animation: clear story spine, expressive characters, a single powerful feeling per beat.'],
    disney_animation: ['Disney Animation', 'Character-driven, musical, richly staged animation with strong silhouettes and appeal.'],
    miyazaki: ['Hayao Miyazaki', 'Hand-drawn wonder, quiet "ma" (pauses), nature, flight, and morally complex worlds.'],
    wes_anderson: ['Wes Anderson', 'Symmetry, centered framing, flat pastel palettes, and deadpan whimsy.'],
    bong_joon_ho: ['Bong Joon-ho', 'Genre-blending, sharp social contrast, staircases and levels as class metaphor.'],
    ridley_scott: ['Ridley Scott', 'Atmospheric worlds, heavy shadow and haze, epic scale and texture.'],
    james_cameron: ['James Cameron', 'Immersive spectacle, kinetic action, and pioneering visual technology.'],
    tim_burton: ['Tim Burton', 'Gothic-whimsical worlds, high contrast, expressionist shapes and outsider heroes.'],
    denis_villeneuve: ['Denis Villeneuve', 'Monumental scale, minimalist compositions, slow dread and awe.'],
    // Genres
    animated_short: ['Animated Short', 'A brief, self-contained animated film — usually one clear emotional idea told visually.'],
    comedy: ['Comedy', 'Structured around setups and payoffs; timing and reversal drive the laughs.'],
    drama: ['Drama', 'Character and emotional truth first; conflict comes from people and choices.'],
    thriller: ['Thriller', 'Built on suspense and a ticking clock; withholds information to keep tension high.'],
    sci_fi_fantasy: ['Sci-Fi / Fantasy', 'World-building genres where rules and wonder shape the story.'],
    romance: ['Romance', 'Structured around a relationship arc: meet, spark, obstacle, and resolution.'],
    // Success factors
    emotional_core: ['Emotional Core', 'The single feeling the film is really about. Without it, craft is empty.'],
    hook_strength: ['Hook Strength', 'How fast and hard the opening grabs attention. The first seconds decide if people keep watching.'],
    structural_completeness: ['Structural Completeness', 'Whether the story has a real setup, turn, and payoff — a whole arc, not fragments.'],
    originality_vs_familiarity: ['Originality vs Familiarity', 'The balance of fresh and recognizable. Too familiar bores; too strange loses people.'],
    genre_fit: ['Genre Fit', 'How well the film honors its genre’s conventions and audience expectations.'],
    runtime_discipline: ['Runtime Discipline', 'Telling the story in exactly the time it needs — no flabby stretches.'],
    specificity: ['Specificity', 'Concrete, particular details instead of vague generalities. Specific = memorable and believable.'],
    shareability: ['Shareability', 'How likely a viewer is to clip and share it — a clear peak and an unforgettable image.'],
    // AI toolchain
    veo_3_1: ['Veo 3.1', 'Google’s video model — strong at realistic motion and coherence for image-to-video shots.'],
    kling_3_0: ['Kling 3.0', 'Video model known for expressive character motion and dynamic camera moves.'],
    runway_gen_4_5: ['Runway Gen-4.5', 'Video generation with strong stylistic control and editing tools.'],
    minimax_hailuo_2_3: ['MiniMax Hailuo 2.3', 'Video model with fluid motion, good for lively action beats.'],
    luma_ray_3: ['Luma Ray 3', 'Video model with cinematic camera control and smooth movement.'],
    seedance: ['Seedance', 'Image-to-video model tuned for dance-like, rhythmic motion and continuity.'],
    sora_2: ['Sora 2', 'OpenAI’s video model — strong physical realism and longer coherent shots.'],
    midjourney_v6: ['Midjourney v6', 'Image model prized for painterly, stylized, high-aesthetic stills.'],
    gpt_image_1: ['GPT Image', 'OpenAI’s image model — reliable, controllable keyframes that follow instructions closely.'],
    nano_banana_pro: ['Nano Banana Pro', 'Image model good at fast, consistent character keyframes.'],
    stable_diffusion_xl: ['Stable Diffusion XL', 'Open image model — endlessly customizable with community styles and control.']
  };
  function get(id) { var e = G[id]; return e ? { t: e[0], d: e[1] } : { t: id, d: '' }; }
  function esc(v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // Render a citation as a learnable chip: shows the plain-language term, teaches on tap/hover.
  function chip(id, cls) {
    var e = get(id);
    return '<span class="' + (cls || 'citation') + ' teach" data-teach="' + esc(id) + '" tabindex="0" role="button" aria-label="Learn: ' + esc(e.t) + '">' + esc(e.t) + '</span>';
  }

  // One shared tooltip, delegated across the document. Hover on desktop, tap on touch.
  function initTips() {
    if (global.__eveTipReady || typeof document === 'undefined') return;
    global.__eveTipReady = true;
    var tip = document.createElement('div');
    tip.className = 'eve-tip';
    tip.style.cssText = 'position:fixed;z-index:9999;max-width:280px;background:#0b0b0b;border:1px solid #3a3320;border-radius:10px;padding:10px 12px;box-shadow:0 10px 30px rgba(0,0,0,.55);font:400 12px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#cfcfcf;opacity:0;transform:translateY(4px);transition:opacity .12s,transform .12s;pointer-events:none;display:none';
    document.addEventListener('DOMContentLoaded', function () { document.body.appendChild(tip); });
    if (document.body) document.body.appendChild(tip);
    var cur = null;
    function show(el) {
      var id = el.getAttribute('data-teach'); if (!id) return;
      var e = get(id);
      tip.innerHTML = '<b style="color:#e8bc3a;font-size:12.5px">' + esc(e.t) + '</b> <code style="color:#7a7a7a;font-size:10px">' + esc(id) + '</code><br><span>' + esc(e.d) + '</span>';
      tip.style.display = 'block';
      var r = el.getBoundingClientRect();
      tip.style.opacity = '0';
      var tw = Math.min(280, tip.offsetWidth || 280), th = tip.offsetHeight || 60;
      var left = Math.max(8, Math.min(r.left, global.innerWidth - tw - 8));
      var top = r.top - th - 8; if (top < 8) top = r.bottom + 8;
      tip.style.left = left + 'px'; tip.style.top = top + 'px';
      requestAnimationFrame(function () { tip.style.opacity = '1'; tip.style.transform = 'none'; });
      cur = el;
    }
    function hide() { tip.style.opacity = '0'; tip.style.transform = 'translateY(4px)'; cur = null; setTimeout(function () { if (!cur) tip.style.display = 'none'; }, 130); }
    document.addEventListener('mouseover', function (ev) { var el = ev.target.closest && ev.target.closest('.teach'); if (el) show(el); });
    document.addEventListener('mouseout', function (ev) { var el = ev.target.closest && ev.target.closest('.teach'); if (el && el === cur) hide(); });
    document.addEventListener('focusin', function (ev) { var el = ev.target.closest && ev.target.closest('.teach'); if (el) show(el); });
    document.addEventListener('focusout', function () { if (cur) hide(); });
    document.addEventListener('click', function (ev) { var el = ev.target.closest && ev.target.closest('.teach'); if (el) { ev.preventDefault(); if (cur === el) hide(); else show(el); } else if (cur) hide(); });
  }

  global.EVE_GLOSSARY = G;
  global.EVE_GLOSSARY_GET = get;
  global.EVE_GLOSSARY_CHIP = chip;
  global.EVE_GLOSSARY_TIP = initTips;
  if (typeof document !== 'undefined') initTips();
})(typeof window === 'undefined' ? globalThis : window);
