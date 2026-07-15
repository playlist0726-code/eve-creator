(function () {
  const demoStory = {
    title: "The Last Move",
    logline: "A lonely chess player in an autumn park battles the ruthless version of himself, then weaponizes apparent frailty to reclaim both the match and his capacity for play.",
    theme: "Winning matters less than integrating the vulnerable and competitive selves that loneliness split apart.",
    structure: { id: "pixar_spine", name: "Pixar Story Spine", why: "A ritualized daily match gives the short a legible normal, while one deceptive reversal can fracture and then renew that ritual within five visual beats." },
    director_lens: "Treat the two personas as opposing geometries inside one autumn world: rigid symmetry for rivalry, then shared space when the man becomes whole again.",
    contest_fit: { score: 0, rationale: "No contest selected.", strengths: [], gaps: [] },
    beats: [
      {
        number: 1, name: "An Opponent Made of Absence", beat_function: "Establish the man's isolation and the self-created ritual that disguises it as competition.",
        story_action: "He sets two chess clocks and moves between opposing seats, performing both players for an empty park.", tension: 0.18,
        pacing_rationale: "The opening holds low tension long enough for the audience to read the impossible two-seat ritual; unease comes from recognition, not speed.",
        twist_role: { type: "setup", mechanism: "The paired clocks, mirrored chairs, and his hand switching sides plant that both opponents are one body." },
        shot: { framing: "EWS to WS", angle: "eye_level", movement: "slow dolly_in", why_this_shot: "The extreme width lets the empty park dwarf him; the nearly imperceptible move inward turns detached observation into curiosity about the doubled ritual.",
          mise_en_scene: { staging: "Two chairs face each other on a strict axis while every other bench is empty, making conflict his only form of company.", props: "The twin clocks promise two players, while one worn hat migrating between seats exposes identity as performance.", color: "Muted amber leaves surround a small island of blue-gray stone, letting warmth exist everywhere except at the board.", light: "Late-afternoon backlight lengthens one body into two overlapping shadows.", symbolic_meaning: "The park offers communal warmth, but his symmetrical private arena converts solitude into a relationship he can control." },
          grounded_in: ["EWS","negative_space_isolation","symmetrical_blocking","setting_as_metaphor","pixar_spine"],
          t2i_prompt: "One elderly animated man alone at a chess table in an empty autumn park, exactly two opposing chairs and two chess clocks, extreme wide shot settling toward wide, eye-level 35mm perspective, strict central axis, amber leaves, blue-gray stone, long doubled shadow, warm backlight, tactile stylized 3D animation, no other people, no text.",
          i2v_prompt: "5 seconds: begin locked in the empty park, then execute a very slow dolly toward the table as the same man shifts his hat and changes seats; leaves drift gently, chess pieces and facial identity remain consistent, no new characters." }
      },
      {
        number: 2, name: "The Bully Takes the Board", beat_function: "Define the aggressive persona's control and make the timid persona's coming loss emotionally legible.",
        story_action: "In the dark coat and narrowed posture, he slams a piece forward; across the cut, his timid self shrinks behind a nearly trapped king.", tension: 0.42,
        pacing_rationale: "Tension rises through alternating compression: each cut removes environmental breathing room and makes the board feel less escapable.",
        twist_role: { type: "setup", mechanism: "The timid hand repeatedly touches his chest when pressured, establishing a gesture the payoff can weaponize." },
        shot: { framing: "MCU with board foreground", angle: "slight low_angle", movement: "static", why_this_shot: "The medium close-up preserves the dominating torso and slamming hand; a slight low angle enlarges this invented opponent while a static camera makes his control feel immovable.",
          mise_en_scene: { staging: "The bully leans through the board's centerline while the opposing chair is squeezed to the edge of frame.", props: "Captured white pieces accumulate beside his elbow like trophies; the isolated white king becomes the timid self's remaining dignity.", color: "His side is dense burgundy and black against the timid side's drained beige.", light: "A tree shadow cuts diagonally across his eyes, turning ordinary sunlight into a self-authored mask.", symbolic_meaning: "Power is staged as occupation: the aggressive self colonizes the shared board, color, and even the available light." },
          grounded_in: ["MCU","low_angle","static","proxemics","prop_as_symbol"],
          t2i_prompt: "Exactly one elderly animated man performing an aggressive chess persona, medium close-up behind a chessboard foreground, slight low angle, fist driving a black rook forward, captured white pieces as trophies, burgundy-black coat, diagonal branch shadow masking the eyes, shallow depth, tactile stylized 3D animation, no duplicate body, no text.",
          i2v_prompt: "4 seconds: keep camera static as he leans across the board and slams one rook, captured pieces rattle once; branch shadow flickers subtly, preserve face, costume, board layout, and single-character count." }
      },
      {
        number: 3, name: "A Defeat Rehearsed", beat_function: "Push the timid persona to an apparent physical and strategic low point while concealing the first active choice.",
        story_action: "Cornered, he clutches his chest, studies the bully's reflexive alarm, and lets his king slip from his fingers.", tension: 0.68,
        pacing_rationale: "The pace slows at high tension: holding on the hand, eye, and falling king makes the audience search for whether the crisis is real.",
        twist_role: { type: "setup", mechanism: "The chest clutch repeats the planted stress gesture, but one controlled sideways glance reveals it has become a deliberate feint." },
        shot: { framing: "ECU / INSERT", angle: "eye_level", movement: "rack_focus", why_this_shot: "An insert denies the audience a full performance to judge; rack focus from trembling fingers to the calculating eye converts weakness into concealed agency.",
          mise_en_scene: { staging: "Hand, fallen king, and one watching eye occupy three depth planes, turning a simple reaction into a decision diagram.", props: "The fallen king reads as defeat on first glance and bait once the eye sharpens.", color: "Warm park tones desaturate around the hand while a thin amber catchlight survives in the eye.", light: "Passing leaves briefly eclipse the face, then reveal the eye at the instant of calculation.", symbolic_meaning: "Mortality's gesture becomes authorship: the object of defeat is deliberately dropped so vulnerability can redirect power." },
          grounded_in: ["ECU","INSERT","rack_focus","depth_layering","prop_as_symbol"],
          t2i_prompt: "Extreme close insert in stylized 3D animation: one elderly man's trembling hand clutching chest at foreground, white chess king falling midair in midground, one calculating eye sharp in background, 100mm macro compression, muted autumn palette with tiny amber eye catchlight, leaf shadow crossing face, exact single subject, no text.",
          i2v_prompt: "4 seconds in one continuous rack focus: trembling fingers release the white king, focus follows its short fall, then shifts to the man's sideways calculating eye; minimal body motion, preserve hand anatomy, chess position, lighting direction, and single subject." }
      },
      {
        number: 4, name: "The Board Turns", beat_function: "Pay off the feint by converting the bully's certainty into panic and the timid persona's weakness into tactical control.",
        story_action: "The bully lunges to help; the timid persona snaps upright, spins the board, and completes the hidden winning line.", tension: 0.92,
        pacing_rationale: "This is the peak, so three crisp actions arrive without pause; speed releases the suspense accumulated in the previous held insert.",
        twist_role: { type: "payoff", mechanism: "The planted chest gesture becomes a feint, and the board rotation literalizes the reversal by swapping both tactical and visual power." },
        shot: { framing: "WS", angle: "overhead_topdown", movement: "whip_pan into static", why_this_shot: "The wide overhead proves both personas share one body and makes the rotating board readable; the whip supplies comic velocity, then the hard stop lets the winning geometry land.",
          mise_en_scene: { staging: "The man crosses the centerline for the first time as the board rotates beneath him, collapsing two territories into one action.", props: "The spinning board turns a game surface into the mechanism of authorship; the rescued white king ends upright nearest camera.", color: "Opposed burgundy and beige smear during motion, then resolve into a balanced amber-brown frame.", light: "Broken leaf shadows whirl with the board and settle into one unified pool of gold.", symbolic_meaning: "The reversal does not destroy the aggressive self; it recomposes both halves into a single, playful intelligence." },
          grounded_in: ["WS","overhead_topdown","whip_pan","symmetrical_blocking","pixar_spine"],
          t2i_prompt: "Overhead top-down wide shot of exactly one elderly animated man pivoting between two chairs while spinning a chessboard, white king upright nearest camera, pieces tracing a controlled circular blur, burgundy and beige costume elements resolving into amber-brown harmony, leaf-shadow pattern, tactile stylized 3D animation, readable board geometry, no extra people, no text.",
          i2v_prompt: "3 seconds: quick pan follows his lunge, camera rises to top-down as he rotates the board exactly 180 degrees and places one winning piece; motion stops sharply on checkmate, keep one body, stable face, coherent chess pieces, and no morphing." }
      },
      {
        number: 5, name: "A Prize Shared", beat_function: "Resolve the external match by revealing that play—not domination—restores companionship with himself.",
        story_action: "He awards himself the small prize, laughs at both performances, and resets the board with the chairs now side by side.", tension: 0.24,
        pacing_rationale: "Tension drops below the opening level because the same silence now reads as chosen peace; a longer final hold lets the changed spatial relationship register.",
        twist_role: { type: "payoff", mechanism: "The two-chair opposition from the opening returns as side-by-side seating, reframing the real victory as integration." },
        shot: { framing: "WS widening to EWS", angle: "eye_level", movement: "slow dolly_out", why_this_shot: "Returning to the opening scale creates a visual rhyme, but the dolly out no longer abandons him because the chairs and posture now form one relaxed unit.",
          mise_en_scene: { staging: "Both chairs angle toward the sunset rather than each other; he occupies the shared space between them.", props: "The tiny prize rests beside both kings, demoted from conquest to a souvenir of play.", color: "The earlier split palette merges into honeyed amber with a small green note of renewal.", light: "The doubled shadow has shortened into one broad silhouette as the sun lowers.", symbolic_meaning: "Nothing in the empty park changes except arrangement; integration transforms identical solitude from absence into self-companionship." },
          grounded_in: ["WS","dolly_out","analogous","movement_toward_away","emotional_core"],
          t2i_prompt: "Exactly one elderly animated man smiling between two chess chairs now angled side by side toward sunset, reset chessboard and tiny prize beside both kings, wide eye-level 40mm shot, honey-amber analogous palette with small green accent, one broad unified shadow, tactile stylized 3D animation, empty autumn park, no text.",
          i2v_prompt: "6 seconds: he places the prize between both kings, turns both chairs slightly toward the sunset, then sits centered and exhales; camera performs a gentle dolly out, leaves move softly, maintain one character, stable props, and unified warm light." }
      }
    ]
  };

  const ACT_SPECS=[
    {id:'setup',name:'Setup',fn:'Establish isolation, the two-seat ritual, and the visual rules that let one man perform a rivalry.',t:.22,d:36,shots:[
      ['An Empty Arena',12,'The autumn park sits empty around one chess table before the old man enters.','EWS','eye_level','slow dolly_in','The distant approach makes loneliness spatial before character psychology explains it.','veo_3_1'],
      ['Two Places Set',12,'He carefully sets two clocks, two cups, and opposing chairs for a match no one else attends.','WS','slight high_angle','static','The elevated locked frame exposes the ritual as deliberate design rather than accident.','gpt_image_1'],
      ['The Hat Crosses',12,'He moves the worn hat to the opposite chair, sits there, and changes posture.','MCU','eye_level','rack_focus','Focus traveling from hat to altered face turns one prop into the identity switch.','kling_3_0']]},
    {id:'development',name:'Development',fn:'Let the aggressive persona dominate while planting the timid persona’s stress gesture and tactical attention.',t:.48,d:36,shots:[
      ['Opening Attack',12,'The dark-coated persona drives a rook forward and starts the first clock.','MS','slight low_angle','static','Low, immovable coverage gives the invented bully control of body, board, and tempo.','runway_gen_4_5'],
      ['A Smaller Self',12,'Across the axis, the timid persona folds inward behind his nearly trapped king.','MCU','slight high_angle','slow dolly_in','Compression and diminishing angle make retreat visible without dialogue.','kling_3_0'],
      ['Pressure Pattern',12,'A short sequence of captures ends each time on his hand touching his chest.','INSERT montage','eye_level','fast cutting','Repeated inserts compress the game while planting the physical gesture that later becomes a weapon.','seedance']]},
    {id:'crisis',name:'Crisis',fn:'Bring strategic defeat and apparent physical collapse together, while hiding the first sign that weakness is becoming agency.',t:.76,d:36,shots:[
      ['King Cornered',12,'Black pieces surround the white king; the timid hand hovers with nowhere safe to move.','overhead WS','overhead_topdown','slow crane_down','The pattern view makes entrapment undeniable and fate-like.','veo_3_1'],
      ['The Collapse',12,'He clutches his chest, drops the king, and falls beyond the table edge.','CU to WS','dutch_tilt','handheld pullback','The frame loses balance with him, making the crisis feel uncontrolled.','runway_gen_4_5'],
      ['One Watching Eye',12,'Behind trembling fingers, one eye checks whether the bully has taken the bait.','ECU / INSERT','eye_level','rack_focus','Withholding the full face preserves doubt while the focus shift reveals calculation.','kling_3_0']]},
    {id:'climax',name:'Climax',fn:'Pay off the planted gesture through a fast physical reversal that reunites deception, board geometry, and character choice.',t:.96,d:30,shots:[
      ['Help Breaks the Axis',10,'The bully abandons his winning side and lunges across the table to help.','WS','eye_level','whip_pan','Crossing the centerline breaks the rigid rivalry at the exact instant compassion creates vulnerability.','seedance'],
      ['The Board Turns',10,'The timid persona snaps upright and rotates the chessboard exactly 180 degrees.','overhead WS','overhead_topdown','rapid orbit to static','The literal rotation makes the narrative reversal instantly readable.','veo_3_1'],
      ['Checkmate, One Body',10,'He lands the final piece, changes seats once more, and realizes both victory and defeat are his.','CU to two-chair WS','eye_level','dolly_out','The widening reveal converts triumph into comic self-recognition.','runway_gen_4_5']]},
    {id:'resolution',name:'Resolution',fn:'Transform the unchanged empty park by reorganizing its props and space into self-companionship rather than conflict.',t:.26,d:30,shots:[
      ['A Prize Between Kings',15,'Laughing, he places the humble prize between both kings and resets the board.','MCU','eye_level','static','The held frame lets a conquest object become a shared souvenir.','gpt_image_1'],
      ['Chairs Toward Sunset',15,'He turns both chairs side by side toward the sunset and rests between them as one silhouette.','WS widening to EWS','eye_level','slow dolly_out','The opening scale returns, but new blocking changes solitude into peace.','veo_3_1']]}
  ];
  function buildRichStory(){
    let number=1;
    const acts=ACT_SPECS.map((spec,index)=>{const base=demoStory.beats[index];return {act_number:index+1,id:spec.id,name:spec.name,dramatic_function:spec.fn,target_duration_seconds:spec.d,tension:spec.t,shots:spec.shots.map((s,j)=>({shot_number:number++,name:s[0],story_action:s[2],duration_seconds:s[1],tension:Math.min(1,spec.t+(j-1)*.05),framing:s[3],angle:s[4],movement:s[5],why_this_shot:s[6],mise_en_scene:JSON.parse(JSON.stringify(base.shot.mise_en_scene)),twist_role:JSON.parse(JSON.stringify(base.twist_role)),pacing_rationale:base.pacing_rationale,grounded_in:base.shot.grounded_in.slice(0,5),t2i_prompt:base.shot.t2i_prompt+' Shot action: '+s[2],i2v_prompt:base.shot.i2v_prompt+' Time this shot to '+s[1]+' seconds.',recommended_tool:{id:s[7],name:s[7].replaceAll('_',' '),why:'Selected for this shot’s specific camera motion, continuity, and visual-control needs.'}}))};});
    return {title:demoStory.title,logline:demoStory.logline,theme:demoStory.theme,director_lens:demoStory.director_lens,structure:{id:'five_act',name:'Five-Act Structure',why:'Five escalating acts distribute a complete visual arc across a dense three-minute short while protecting a clear crisis, payoff, and changed normal.'},contest_fit:JSON.parse(JSON.stringify(demoStory.contest_fit)),runtime:{target_seconds:180,planned_seconds:168,total_shots:14},acts};
  }
  function fallback(reason, input) {
    const story=buildRichStory();
    const contest=input&&input.intake&&input.intake.target_type==='contest'?input.intake.contest:null;
    if(contest){
      const text=((input.idea||'')+' '+(input.genre||'')).toLowerCase();
      const keywords=Array.isArray(contest.fit_keywords)?contest.fit_keywords:[];
      const matched=keywords.filter(word=>text.includes(String(word).toLowerCase()));
      const score=Math.min(92,62+matched.length*6);
      story.contest_fit={score,rationale:`The curated fallback estimates fit against ${contest.name}'s supplied focus and criteria; confirm current rules on the official site.`,strengths:(contest.judged_on||[]).slice(0,3).map(item=>`Blueprint supports ${item}`),gaps:(contest.requirements||[]).slice(0,2).map(item=>`Verify delivery requirement: ${item}`)};
    }
    return {
      story,
      meta: { source: 'fallback', model: 'curated demo', reason: reason || 'Live generation unavailable.' }
    };
  }

  async function generateStory(input) {
    const response = await fetch('/api/generate-story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok || !payload.story) throw new Error(payload.error || 'Live generation failed.');
    return payload;
  }

  window.EVE_API = { generateStory, fallback };
})();
