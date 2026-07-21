/* First Frame Create-step status. Completion is derived from validated artifacts, never page visits. */
(function(){
  'use strict';
  var steps=[
    {n:0,l:'Intake',f:'index.html'},
    {n:1,l:'Concept',f:'concept_lab.html'},
    {n:2,l:"Creator's Room",f:'creators_room.html'},
    {n:3,l:'Shot Design',f:'shotseed.html'},
    {n:4,l:'Storyboard',f:'storyboard.html'}
  ];
  function read(key){try{return JSON.parse(sessionStorage.getItem(key)||'null')}catch(_){return null}}
  function completed(){
    var intake=read('eve.intake.v1'),blueprint=read('eve.storyBlueprint.v1'),direction=read('eve.shotDirection.v1');
    return [
      Boolean(intake&&intake.version===1),
      Boolean(blueprint&&blueprint.version===1&&blueprint.story),
      Boolean(blueprint&&blueprint.story&&blueprint.story._crew_reviewed),
      Boolean(direction&&direction.version===1&&Number.isInteger(direction.selected_id)),
      false
    ];
  }
  function mount(){
    var root=document.getElementById('eve-steps');if(!root)return;
    var file=(location.pathname.split('/').pop()||'index.html').toLowerCase(),done=completed();
    root.innerHTML=steps.map(function(step,index){
      var state=step.f===file?'cur':(done[index]?'done':'');
      return '<a class="ps '+state+'" href="'+step.f+'"'+(state==='cur'?' aria-current="step"':'')+'><span class="pn">'+(state==='done'?'✓':step.n)+'</span><span class="pl">'+step.l+'</span></a>'+(index<steps.length-1?'<span class="pline" aria-hidden="true"></span>':'');
    }).join('');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();
