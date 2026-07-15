const { STORY_SCHEMA, TOOL_IDS, actIds, actNames } = require('../lib/story-schema');
const { SYSTEM_PROMPT } = require('../lib/system-prompt');
const { CITABLE_ID_SET } = require('../lib/craft-knowledge');
const TOOL_ID_SET=new Set(TOOL_IDS);

const MAX_IDEA_LENGTH = 1200;
const ALLOWED_GENRES = new Set(['animated_short', 'comedy', 'drama', 'thriller', 'sci_fi_fantasy', 'romance']);

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function extractOutputText(response) {
  for (const item of response.output || []) {
    for (const content of item.content || []) {
      if (content.type === 'output_text' && content.text) return content.text;
    }
  }
  return '';
}

function filterCitations(story) {
  const dropped = [];
  for (const act of story.acts || []) for (const shot of act.shots || []) {
    const citations = Array.isArray(shot.grounded_in) ? shot.grounded_in : [];
    shot.grounded_in = citations.filter((id) => {
      const allowed = CITABLE_ID_SET.has(id);
      if (!allowed) dropped.push(id);
      return allowed;
    });
  }
  return [...new Set(dropped)];
}
function validateAndRepair(story){
  if(!story||!Array.isArray(story.acts)||story.acts.length!==5)throw new Error('Invalid act structure');
  let number=1,total=0;
  story.acts.forEach((act,index)=>{
    if(act.id!==actIds[index]||act.name!==actNames[index]||act.act_number!==index+1||!Array.isArray(act.shots))throw new Error('Invalid act order');
    let actTotal=0;
    act.shots.forEach(shot=>{if(shot.shot_number!==number++)throw new Error('Invalid shot order');actTotal+=shot.duration_seconds;if(!TOOL_ID_SET.has(shot.recommended_tool?.id))shot.recommended_tool={id:'gpt_image_1',name:'GPT Image',why:'Reliable default for a compositionally controlled storyboard keyframe.'};});
    if(actTotal!==act.target_duration_seconds)throw new Error('Invalid act duration');
    total+=actTotal;
  });
  const count=number-1,target=story.runtime?.target_seconds;
  if(count<12||count>18||story.runtime.total_shots!==count||story.runtime.planned_seconds!==total||!target||Math.abs(total-target)/target>.1)throw new Error('Invalid runtime plan');
  return story;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed.' });
  if (!process.env.OPENAI_API_KEY) return send(res, 503, { error: 'Live director is not configured.' });

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return send(res, 400, { error: 'Invalid JSON body.' }); }
  }
  const idea = typeof body.idea === 'string' ? body.idea.trim() : '';
  const genre = ALLOWED_GENRES.has(body.genre) ? body.genre : 'animated_short';
  const runtime = Math.max(1, Math.min(10, Number(body.runtime) || 3));
  const intake = body.intake && typeof body.intake === 'object' ? body.intake : {};
  const rawContest = intake.target_type === 'contest' && intake.contest && typeof intake.contest === 'object' ? intake.contest : null;
  const cleanList = (value) => Array.isArray(value) ? value.slice(0, 8).map(item => String(item).slice(0, 160)) : [];
  const contest = rawContest ? {
    name: String(rawContest.name || '').slice(0, 120),
    focus: String(rawContest.focus || '').slice(0, 240),
    deadline: String(rawContest.deadline || '').slice(0, 40),
    requirements: cleanList(rawContest.requirements),
    judged_on: cleanList(rawContest.judged_on)
  } : null;
  if (!idea) return send(res, 400, { error: 'Please enter a concept.' });
  if (idea.length > MAX_IDEA_LENGTH) return send(res, 400, { error: `Keep the concept under ${MAX_IDEA_LENGTH} characters.` });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 40000);

  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'gpt-5.6',
        reasoning: { effort: 'low' },
        max_output_tokens: 12000,
        instructions: SYSTEM_PROMPT,
        input: `USER IDEA: ${idea}\nGENRE: ${genre}\nTARGET RUNTIME: ${runtime} minutes\nPRODUCTION TYPE: ${String(intake.production_type||'animation').slice(0,30)}\nCONTEST CONTEXT: ${contest?JSON.stringify(contest):'none'}`,
        text: {
          format: {
            type: 'json_schema',
            name: 'eve_director_blueprint',
            strict: true,
            schema: STORY_SCHEMA
          }
        }
      })
    });

    const payload = await openaiResponse.json();
    if (!openaiResponse.ok) {
      console.error('OpenAI API error', openaiResponse.status, payload?.error?.code || 'unknown');
      return send(res, 502, { error: 'The live director is temporarily unavailable.' });
    }

    const outputText = extractOutputText(payload);
    if (!outputText) return send(res, 502, { error: 'The live director returned no blueprint.' });

    const story = validateAndRepair(JSON.parse(outputText));
    const dropped_citations = filterCitations(story);
    return send(res, 200, {
      story,
      meta: { source: 'live', model: 'gpt-5.6', dropped_citations }
    });
  } catch (error) {
    console.error('Story generation failed', error?.name || 'Error');
    return send(res, error?.name === 'AbortError' ? 504 : 500, {
      error: error?.name === 'AbortError' ? 'The live director took too long.' : 'Could not generate the blueprint.'
    });
  } finally {
    clearTimeout(timeout);
  }
};

module.exports._test = { extractOutputText, filterCitations, validateAndRepair };
