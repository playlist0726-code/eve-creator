(function(){
  'use strict';
  var root=document.querySelector('[data-course-track]');if(!root)return;
  var track=root.getAttribute('data-course-track'),list=document.getElementById('courseModules');
  function esc(v){return String(v==null?'':v).replace(/[&<>'"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]});}
  function href(d){var q=new URLSearchParams(d.params||{}).toString();return d.page+(q?'?'+q:'');}
  function render(data){
    var modules=data.modules.filter(function(m){return m.track===track;}).sort(function(a,b){return a.order-b.order;});
    FF_PROGRESS.configure(data);var profile=FF_PROGRESS.load();
    list.innerHTML=modules.map(function(m){var done=profile.modules_completed.includes(m.id);return '<article class="course-module'+(done?' complete':'')+'"><div class="module-index">'+String(m.order).padStart(2,'0')+' <span>'+m.minutes+' MIN</span></div><div><p class="phase">Learn</p><h2>'+esc(m.title)+'</h2><p>'+esc(m.goal)+'</p><div class="craft-links">'+m.teaches.map(function(id){return '<a href="learn.html#term='+encodeURIComponent(id)+'">'+esc(id)+'</a>';}).join('')+'</div><p class="phase">Do</p><a class="module-do" href="'+esc(href(m.do))+'">Open the working surface →</a><p class="phase">Get feedback</p><p class="checkpoint">'+esc(m.checkpoint)+'</p><p class="output"><b>Output:</b> '+esc(m.output)+'</p><button type="button" data-complete="'+esc(m.id)+'" aria-pressed="'+done+'">'+(done?'Completed · undo':'Mark checkpoint complete')+'</button></div></article>';}).join('');
    document.getElementById('courseCount').textContent=profile.modules_completed.filter(function(id){return modules.some(function(m){return m.id===id;});}).length+' / '+modules.length+' modules completed';
    FF_PROGRESS.mount('#profileStrip');
    list.querySelectorAll('[data-complete]').forEach(function(btn){btn.addEventListener('click',function(){var p=FF_PROGRESS.load(),id=btn.getAttribute('data-complete');if(p.modules_completed.includes(id)){p.modules_completed=p.modules_completed.filter(function(x){return x!==id;});FF_PROGRESS.save(p);}else FF_PROGRESS.completeModule(id,{type:'course-checkpoint',track:track});render(data);});});
  }
  fetch('data/courses.json').then(function(r){if(!r.ok)throw Error();return r.json();}).then(render).catch(function(){list.innerHTML='<div class="course-error" role="alert">The course could not load. Serve First Frame over HTTP, then try again.</div>';});
})();
