const { CITABLE_IDS } = require('./craft-knowledge');

const TOOL_IDS=['veo_3_1','kling_3_0','runway_gen_4_5','minimax_hailuo_2_3','luma_ray_3','seedance','sora_2','midjourney_v6','gpt_image_1','nano_banana_pro','stable_diffusion_xl'];
const text=(max)=>({type:'string',minLength:1,maxLength:max});
const shot={
  type:'object',additionalProperties:false,
  required:['shot_number','name','story_action','duration_seconds','tension','framing','angle','movement','why_this_shot','mise_en_scene','twist_role','pacing_rationale','grounded_in','t2i_prompt','i2v_prompt','recommended_tool'],
  properties:{
    shot_number:{type:'integer',minimum:1,maximum:18},name:text(100),story_action:text(320),duration_seconds:{type:'integer',minimum:2,maximum:30},tension:{type:'number',minimum:0,maximum:1},
    framing:text(80),angle:text(80),movement:text(100),why_this_shot:text(500),
    mise_en_scene:{type:'object',additionalProperties:false,required:['staging','props','color','light','symbolic_meaning'],properties:{staging:text(500),props:text(500),color:text(500),light:text(500),symbolic_meaning:text(500)}},
    twist_role:{type:'object',additionalProperties:false,required:['type','mechanism'],properties:{type:{type:'string',enum:['setup','payoff','none']},mechanism:{type:'string',maxLength:320}}},
    pacing_rationale:text(400),grounded_in:{type:'array',minItems:0,maxItems:5,uniqueItems:true,items:{type:'string',enum:CITABLE_IDS}},
    t2i_prompt:text(700),i2v_prompt:text(600),
    recommended_tool:{type:'object',additionalProperties:false,required:['id','name','why'],properties:{id:{type:'string',enum:TOOL_IDS},name:text(80),why:text(240)}}
  }
};
const actIds=['setup','development','crisis','climax','resolution'];
const actNames=['Setup','Development','Crisis','Climax','Resolution'];
const act={
  type:'object',additionalProperties:false,
  required:['act_number','id','name','dramatic_function','target_duration_seconds','tension','shots'],
  properties:{act_number:{type:'integer',minimum:1,maximum:5},id:{type:'string',enum:actIds},name:{type:'string',enum:actNames},dramatic_function:text(320),target_duration_seconds:{type:'integer',minimum:1,maximum:300},tension:{type:'number',minimum:0,maximum:1},shots:{type:'array',minItems:2,maxItems:5,items:shot}}
};
const STORY_SCHEMA={
  type:'object',additionalProperties:false,
  required:['title','logline','theme','director_lens','structure','contest_fit','runtime','acts'],
  properties:{
    title:text(100),logline:text(320),theme:text(220),director_lens:text(300),
    structure:{type:'object',additionalProperties:false,required:['id','name','why'],properties:{id:{type:'string',enum:['five_act']},name:{type:'string',enum:['Five-Act Structure']},why:text(320)}},
    contest_fit:{type:'object',additionalProperties:false,required:['score','rationale','strengths','gaps'],properties:{score:{type:'integer',minimum:0,maximum:100},rationale:text(320),strengths:{type:'array',minItems:0,maxItems:3,items:{type:'string',maxLength:120}},gaps:{type:'array',minItems:0,maxItems:3,items:{type:'string',maxLength:120}}}},
    runtime:{type:'object',additionalProperties:false,required:['target_seconds','planned_seconds','total_shots'],properties:{target_seconds:{type:'integer',minimum:60,maximum:600},planned_seconds:{type:'integer',minimum:50,maximum:600},total_shots:{type:'integer',minimum:12,maximum:18}}},
    acts:{type:'array',minItems:5,maxItems:5,items:act}
  }
};
module.exports={STORY_SCHEMA,TOOL_IDS,actIds,actNames};
