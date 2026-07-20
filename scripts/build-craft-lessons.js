const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'js/eve-glossary.js'),'utf8'),context);
const glossary=context.window.EVE_GLOSSARY_GET;

const categories={
 story:['three_act','hero_journey','save_the_cat','pixar_spine','kishotenketsu','freytag'],
 size:['EWS','WS','MLS','MS','MCU','CU','ECU','INSERT'],
 angle:['eye_level','high_angle','low_angle','overhead_topdown','dutch_tilt','over_the_shoulder','pov'],
 move:['static','pan','tilt','dolly_in','dolly_out','tracking','crane_boom','handheld','steadicam','whip_pan','crash_zoom','rack_focus'],
 lens:['wide_angle','normal','telephoto','macro'],
 comp:['rule_of_thirds','central_symmetry','leading_lines','framing_within_frame','depth_layering','negative_space','headroom_leadroom','180_degree_rule'],
 edit:['shot_reverse_shot','long_take','slow_cutting','fast_cutting','match_cut','cross_cutting','montage'],
 light:['high_key','low_key','chiaroscuro','rembrandt','three_point','silhouette','backlight_rim','practical_motivated','golden_hour','top_light','underlight'],
 color:['complementary','analogous','triadic','monochrome','split_complementary'],
 stage:['depth_staging','symmetrical_blocking','proxemics','negative_space_isolation','movement_toward_away','prop_as_symbol','setting_as_metaphor','wardrobe_signals','texture_materiality'],
 dir:['pixar','disney_animation','miyazaki','wes_anderson','bong_joon_ho','ridley_scott','james_cameron','tim_burton','denis_villeneuve'],
 genre:['animated_short','comedy','drama','thriller','sci_fi_fantasy','romance'],
 hit:['emotional_core','hook_strength','structural_completeness','originality_vs_familiarity','genre_fit','runtime_discipline','specificity','shareability'],
 ai:['veo_3_1','kling_3_0','runway_gen_4_5','minimax_hailuo_2_3','luma_ray_3','seedance','sora_2','midjourney_v6','gpt_image_1','nano_banana_pro','stable_diffusion_xl']
};
const meta={
 story:{craft:'story architecture',practice:'Write the protagonist’s want, obstacle, irreversible turn, and final change before you add shots.',tools:['openai-sora','ltx-studio'],caveat:'A structure is a diagnostic lens, not a formula. Preserve the idea’s cultural context and emotional logic.'},
 size:{craft:'shot scale',practice:'State the shot size, the subject, the readable action, and the emotional purpose in one prompt clause.',tools:['runway-gen4','google-veo'],caveat:'Models may drift toward a medium shot. Reinforce scale with subject-to-frame proportions and a reference image.'},
 angle:{craft:'camera viewpoint',practice:'Name camera height, tilt, subject eyeline, and the intended power relationship.',tools:['runway-gen4','higgsfield'],caveat:'An angle only has meaning in context; cutting to a contradictory eyeline can break spatial continuity.'},
 move:{craft:'camera movement',practice:'Describe one motivated move with a start frame, end frame, speed, and subject relationship.',tools:['runway-gen4','kling-ai'],caveat:'Generated motion can warp geometry or ignore a precise endpoint. Shorter clips and image-to-video references are easier to control.'},
 lens:{craft:'lens language',practice:'Specify focal-length character, camera distance, depth of field, and background behavior rather than naming a lens alone.',tools:['google-veo','runway-gen4'],caveat:'AI often imitates the look of a lens rather than consistent optics; check faces, edges, and depth across frames.'},
 comp:{craft:'composition',practice:'Describe subject placement, dominant lines, foreground/background layers, and where negative space should remain.',tools:['gpt-image','midjourney'],caveat:'Composition can drift during motion. Lock a strong still first, then animate it conservatively.'},
 edit:{craft:'editing rhythm',practice:'Generate coverage with clear entrances, exits, eyelines, and matchable actions; make the cut in an editor.',tools:['capcut','davinci-resolve'],caveat:'Generation does not replace editorial judgment. Assemble, trim, and test rhythm against the audience’s attention.'},
 light:{craft:'lighting',practice:'Name the motivated source, direction, softness, contrast ratio, color temperature, and protected shadow detail.',tools:['gpt-image','adobe-firefly-video'],caveat:'Lighting continuity is fragile across generated shots. Reuse a lighting anchor and compare adjacent frames.'},
 color:{craft:'color design',practice:'Name a restrained palette, its story meaning, dominant/accent ratio, and where the accent appears.',tools:['recraft','davinci-resolve'],caveat:'Prompted color is not a final grade. Normalize shots in an editor before applying a consistent look.'},
 stage:{craft:'mise-en-scène',practice:'Place characters, props, wardrobe, and set elements according to the beat’s conflict; state what each choice means.',tools:['gpt-image','midjourney'],caveat:'Generated props and spatial relationships can mutate. Maintain a continuity sheet and reference images.'},
 dir:{craft:'directorial pattern',practice:'Translate the influence into observable choices—framing, blocking, rhythm, palette—without asking for a living artist imitation.',tools:['gpt-image','google-veo'],caveat:'Study principles rather than copying a signature. Combine references and keep the result specific to your story.'},
 genre:{craft:'genre contract',practice:'Prompt the genre’s audience promise, visual grammar, and emotional turn, then add one specific reversal.',tools:['openai-sora','ltx-studio'],caveat:'Genre shorthand can create clichés. Ground every convention in a precise character objective and setting.'},
 hit:{craft:'audience design',practice:'Test the opening question, emotional stakes, clarity, specificity, and ending payoff with a real viewer.',tools:['ltx-studio','openai-sora'],caveat:'No model can guarantee popularity. Treat these dimensions as revision prompts, not a success score.'},
 ai:{craft:'AI production tool',practice:'Use it for the shot type it controls best, start with a small test, and keep continuity anchors outside the model.',tools:[],caveat:'Capabilities, access, and pricing change. Verify the current official product page before planning a production.'}
};
const examples={
 story:'Finding Nemo (2003) makes its major turns legible through Marlin’s changing goal: protect, pursue, then trust.',
 size:'The opening desert vistas of Lawrence of Arabia (1962) use scale to make a human figure feel vulnerable inside a vast environment.',
 angle:'Citizen Kane (1941) repeatedly uses low viewpoints and visible ceilings to make power feel imposing and unstable.',
 move:'The Copacabana tracking shot in Goodfellas (1990) turns camera movement into Henry’s intoxicating access to a hidden social world.',
 lens:'The Favourite (2018) uses conspicuously wide lenses to bend palace space and make court life feel comic and oppressive.',
 comp:'The Grand Budapest Hotel (2014) uses centered symmetry as both visual order and a clue to its protagonist’s need for control.',
 edit:'The bone-to-spacecraft match cut in 2001: A Space Odyssey (1968) compresses an immense leap in time into one visual idea.',
 light:'The Godfather (1972) uses controlled top light and deep eye shadows to make authority feel private, guarded, and morally opaque.',
 color:'Schindler’s List (1993) uses a largely monochrome design and a selective red accent to direct attention and memory.',
 stage:'Parasite (2019) turns the Park house’s stairs, windows, and levels into a readable map of class and access.',
 dir:'Spirited Away (2001) demonstrates how a director’s worldview can live in patient observation, environmental detail, and character action.',
 genre:'Toy Story (1995) fulfills the adventure-comedy contract while grounding every set piece in Woody’s fear of replacement.',
 hit:'Up (2009) earns emotion through specific shared rituals and visual callbacks rather than a generic claim that its relationship matters.',
 ai:'Blade Runner 2049 (2017) is a useful quality reference for controlled scale, light, and continuity; it was not made with this AI model.'
};
const specialExamples={
 CU:'The Passion of Joan of Arc (1928) uses close-ups to make tiny changes in Renée Jeanne Falconetti’s face carry the scene.',
 ECU:'Psycho (1960) uses extreme details in the shower sequence to fragment perception and intensify panic.',
 INSERT:'The spinning top insert in Inception (2010) turns a small prop into a question that outlives the final cut.',
 high_angle:'Psycho (1960) uses an overhead view on the staircase to reveal action while withholding the attacker’s identity.',
 dutch_tilt:'The Third Man (1949) uses canted frames to make postwar Vienna feel morally and physically unstable.',
 pov:'Jaws (1975) gives the unseen shark a moving point of view, converting ordinary swimming into threat.',
 static:'A Ghost Story (2017) holds static frames long enough for absence and duration to become the subject.',
 dolly_in:'The slow push toward Chief Brody in Jaws (1975) concentrates attention as he recognizes danger on the beach.',
 rack_focus:'Jaws (1975) shifts focus between foreground conversation and the vulnerable swimmer, redirecting attention without cutting.',
 steadicam:'The Shining (1980) follows Danny’s tricycle with a low Steadicam, turning corridors into a suspense machine.',
 whip_pan:'Whiplash (2014) uses fast pans and cuts between conductor and drummer to make tempo feel combative.',
 macro:'Microcosmos (1996) uses macro photography to turn insect-scale activity into monumental action.',
 central_symmetry:'The Shining (1980) uses centered corridors to create an order so rigid that every disturbance feels threatening.',
 negative_space:'Lost in Translation (2003) often leaves figures small within hotel and city spaces, externalizing disconnection.',
 long_take:'Children of Men (2006) sustains complex action in long takes so danger feels continuous rather than safely fragmented.',
 cross_cutting:'The baptism sequence in The Godfather (1972) cross-cuts ritual and murder to create an argument through juxtaposition.',
 montage:'Rocky (1976) compresses training into a montage whose escalating actions make improvement emotionally legible.',
 high_key:'Singin’ in the Rain (1952) uses bright, even musical lighting to support clarity, energy, and play.',
 chiaroscuro:'The Third Man (1949) uses hard light and deep shadow to turn faces and streets into moral uncertainty.',
 golden_hour:'Days of Heaven (1978) makes extensive use of low-angle natural light to give farm labor a fleeting, elegiac beauty.',
 complementary:'Mad Max: Fury Road (2015) contrasts warm desert oranges with blue night passages to separate heat, danger, and relief.',
 analogous:'Her (2013) builds related reds, oranges, and pinks into a warm world that still permits loneliness.',
 prop_as_symbol:'Citizen Kane (1941) makes the snow globe a material link between Kane’s final word, lost childhood, and the film’s investigation.',
 proxemics:'In the Mood for Love (2000) uses constrained distance in hallways and rooms to make restrained intimacy visible.',
 animated_short:'Geri’s Game (1997) builds a complete setup, escalation, reversal, and payoff around one character and one table.',
 comedy:'Airplane! (1980) treats absurd dialogue with straight performance and precise timing, letting contrast create the joke.',
 thriller:'Psycho (1960) repeatedly redirects identification and information, making uncertainty part of the genre promise.',
 romance:'Before Sunrise (1995) makes conversation, walking, and changing distance the action of the romance.',
 hook_strength:'Jaws (1975) opens with an unanswered threat whose consequences define the audience’s central question.',
 specificity:'Parasite (2019) grounds its class conflict in exact architecture, jobs, smells, objects, and routines.'
};
const aiToolById={veo_3_1:['google-veo'],kling_3_0:['kling-ai'],runway_gen_4_5:['runway-gen4'],minimax_hailuo_2_3:['hailuo-ai'],luma_ray_3:['luma-ray'],seedance:['seedance'],sora_2:['openai-sora'],midjourney_v6:['midjourney'],gpt_image_1:['gpt-image'],nano_banana_pro:['nano-banana'],stable_diffusion_xl:['stable-diffusion-35']};
const videoById={
 depth_staging:[{title:'The Bad Sleep Well — The Geometry of a Scene',youtube_id:'jGc-K7giqKM',channel:'Every Frame a Painting',source:'https://www.youtube.com/watch?v=jGc-K7giqKM'}],
 movement_toward_away:[{title:'The Bad Sleep Well — The Geometry of a Scene',youtube_id:'jGc-K7giqKM',channel:'Every Frame a Painting',source:'https://www.youtube.com/watch?v=jGc-K7giqKM'}],
 blocking:[{title:'The Bad Sleep Well — The Geometry of a Scene',youtube_id:'jGc-K7giqKM',channel:'Every Frame a Painting',source:'https://www.youtube.com/watch?v=jGc-K7giqKM'}],
 three_point:[{title:'How to Shoot a Scene!',youtube_id:'IK2IAEO-FUI',channel:'Film Riot',source:'https://www.youtube.com/watch?v=IK2IAEO-FUI'}]
};
const out={version:1,updated:'2026-07-20',note:'Original First Frame lessons. Film examples identify observable craft; AI availability must be checked on official tool pages.',lessons:{}};
for(const [cat,ids] of Object.entries(categories)){
 for(const id of ids){
  const g=glossary(id),m=meta[cat],title=g.t;
  const tools=cat==='ai'?(aiToolById[id]||[]):m.tools;
  out.lessons[id]={
   id,
   deep:`${title} is a practical form of ${m.craft}: ${g.d} The useful question is not “does this look cinematic?” but “what information or feeling changes because this choice is here?” Read it in sequence with the shot before and after it, then test whether the audience notices the intended shift without an explanation.`,
   traditional_example:specialExamples[id]||examples[cat],
   ai_howto:{prompt_tips:[m.practice,`Tie ${title.toLowerCase()} to the character’s immediate objective and the beat’s change; include observable visual evidence.`],tool_ids:tools,caveats:[m.caveat]},
   videos:videoById[id]||[]
  };
 }
}
fs.mkdirSync(path.join(root,'data'),{recursive:true});
fs.writeFileSync(path.join(root,'data/craft_lessons.json'),JSON.stringify(out,null,2)+'\n');
console.log(`Wrote ${Object.keys(out.lessons).length} lessons`);
