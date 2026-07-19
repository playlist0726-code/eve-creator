const { CREW_SCHEMA, CREW_ROLES } = require('../lib/crew-schema');
const { CREW_SYSTEM_PROMPT } = require('../lib/crew-prompt');
const { CITABLE_ID_SET } = require('../lib/craft-knowledge');

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

// Compress the draft blueprint into a compact, model-friendly digest so we spend tokens
// on critique, not on echoing the full blueprint back.
function digestStory(story) {
  const acts = (story.acts || []).map((act) => {
    const shots = (act.shots || []).map((s) => {
      const m = s.mise_en_scene || {};
      return `  #${s.shot_number} "${s.name}" ${s.duration_seconds}s tension=${s.tension}\n` +
        `    action: ${s.story_action}\n` +
        `    craft: ${s.framing} / ${s.angle} / ${s.movement} — ${s.why_this_shot}\n` +
        `    mise: ${m.symbolic_meaning || ''}\n` +
        `    pacing: ${s.pacing_rationale}`;
    }).join('\n');
    return `ACT ${act.act_number} ${act.name} (fn: ${act.dramatic_function}; tension=${act.tension})\n${shots}`;
  }).join('\n');
  return `TITLE: ${story.title}\nLOGLINE: ${story.logline}\nTHEME: ${story.theme}\n` +
    `DIRECTOR LENS: ${story.director_lens}\nRUNTIME: ${story.runtime?.planned_seconds}s across ${story.runtime?.total_shots} shots\n${acts}`;
}

// Drop any hallucinated citation IDs; return the list of what was dropped for transparency.
function filterCitations(crew) {
  const dropped = [];
  const clean = (arr) => (Array.isArray(arr) ? arr : []).filter((id) => {
    const ok = CITABLE_ID_SET.has(id);
    if (!ok) dropped.push(id);
    return ok;
  });
  (crew.crew || []).forEach((c) => { c.grounded_in = clean(c.grounded_in); });
  (crew.revisions || []).forEach((r) => { r.grounded_in = clean(r.grounded_in); });
  return [...new Set(dropped)];
}

function validate(crew) {
  if (!crew || !Array.isArray(crew.crew) || crew.crew.length !== 5) throw new Error('Invalid crew');
  const roles = crew.crew.map((c) => c.role);
  if (CREW_ROLES.some((r) => !roles.includes(r))) throw new Error('Missing crew role');
  if (!Array.isArray(crew.revisions) || crew.revisions.length < 3) throw new Error('Too few revisions');
  const before = Number(crew.score_before), after = Number(crew.score_after);
  if (!(before >= 0 && before <= 100 && after >= 0 && after <= 100)) throw new Error('Invalid scores');
  // Guard against runaway self-congratulation: cap the claimed gain.
  if (after - before > 30) crew.score_after = before + 30;
  return crew;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed.' });
  if (!process.env.OPENAI_API_KEY) return send(res, 503, { error: 'Creator\'s Room is not configured.' });

  let body = req.body || {};
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return send(res, 400, { error: 'Invalid JSON body.' }); }
  }
  const story = body.story && typeof body.story === 'object' ? body.story : null;
  if (!story || !Array.isArray(story.acts) || story.acts.length !== 5) return send(res, 400, { error: 'A five-act draft blueprint is required.' });
  const idea = String(body.idea || '').slice(0, 1200);
  const genre = String(body.genre || 'animated_short').slice(0, 40);
  const contest = body.contest && typeof body.contest === 'object' ? {
    name: String(body.contest.name || '').slice(0, 120),
    judged_on: Array.isArray(body.contest.judged_on) ? body.contest.judged_on.slice(0, 6).map((x) => String(x).slice(0, 120)) : []
  } : null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 40000);
  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'gpt-5.6',
        reasoning: { effort: 'low' },
        max_output_tokens: 9000,
        instructions: CREW_SYSTEM_PROMPT,
        input: `IDEA: ${idea}\nGENRE: ${genre}\nCONTEST: ${contest ? JSON.stringify(contest) : 'none'}\n\nDRAFT BLUEPRINT TO REVIEW:\n${digestStory(story)}`,
        text: { format: { type: 'json_schema', name: 'eve_creators_room', strict: true, schema: CREW_SCHEMA } }
      })
    });
    const payload = await openaiResponse.json();
    if (!openaiResponse.ok) {
      console.error('Creators Room API error', openaiResponse.status, payload?.error?.code || 'unknown');
      return send(res, 502, { error: 'The Creator\'s Room is temporarily unavailable.' });
    }
    const outputText = extractOutputText(payload);
    if (!outputText) return send(res, 502, { error: 'The Creator\'s Room returned no review.' });
    const crew = validate(JSON.parse(outputText));
    const dropped_citations = filterCitations(crew);
    return send(res, 200, { crew, meta: { source: 'live', model: 'gpt-5.6', dropped_citations } });
  } catch (error) {
    console.error('Creators Room failed', error?.name || 'Error');
    return send(res, error?.name === 'AbortError' ? 504 : 500, {
      error: error?.name === 'AbortError' ? 'The Creator\'s Room took too long.' : 'Could not run the Creator\'s Room.'
    });
  } finally {
    clearTimeout(timeout);
  }
};

module.exports._test = { digestStory, filterCitations, validate };
