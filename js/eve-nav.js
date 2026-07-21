/*
 * eve-nav.js — the global platform navigation.
 * Injects one consistent top tab-bar on every page so First Frame feels like a real
 * learning platform (Home · Create · Learn · AI Tools · Footage Lab · Community),
 * not a single wizard. Self-mounts at the top of <body>; highlights the current tab.
 */
(function () {
  'use strict';
  var TABS = [
    { l: 'Home', f: 'index.html' },
    { l: 'Tracks', f: 'tracks.html', match: ['kids.html','beginner.html','darkroom.html'] },
    { l: 'Create', f: 'concept_lab.html', match: ['concept_lab.html', 'creators_room.html', 'shotseed.html', 'storyboard.html'] },
    { l: 'Learn', f: 'learn.html' },
    { l: 'Showcase', f: 'showcase.html' },
    { l: 'AI Tools', f: 'toolkit.html' },
    { l: 'Footage Lab', f: 'detector.html', badge: 'New' },
    { l: 'Community', f: 'community.html' }
  ];
  var CSS = '' +
    '.eve-gnav{display:flex;align-items:center;gap:18px;padding:14px 34px;background:rgba(255,255,255,.82);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border-bottom:1px solid var(--border,#e6e8ec);position:sticky;top:0;z-index:60;overflow-x:auto;box-shadow:0 1px 0 rgba(20,21,26,.03)}' +
    '.eve-gnav .gbrand{display:inline-flex;align-items:center;min-height:44px;gap:9px;font-family:"Plus Jakarta Sans","Inter",sans-serif;font-weight:800;font-size:17px;letter-spacing:-.5px;color:#14151a;text-decoration:none;white-space:nowrap}' +
    '.eve-gnav .gbrand i{display:grid;place-items:center;width:24px;height:24px;border-radius:8px;font-style:normal;color:#fff;background:linear-gradient(135deg,#6c5ce7,#8b7cff 55%,#4c9ffe);box-shadow:0 6px 16px rgba(108,92,231,.22)}' +
    '.eve-gnav .gtabs{display:flex;align-items:center;gap:3px;margin-left:8px}' +
    '.eve-gnav .gt{position:relative;display:inline-flex;align-items:center;min-height:44px;font:600 13px "Inter",sans-serif;color:#656b78;text-decoration:none;padding:8px 13px;border-radius:100px;white-space:nowrap;transition:color .14s,background .14s}' +
    '.eve-gnav .gt:hover{color:#14151a;background:#f3f4f7}' +
    '.eve-gnav .gt.on{color:#5b4bd8;background:#f0edff}' +
    '.eve-gnav .gt .nb{font-size:8px;font-weight:800;letter-spacing:.4px;text-transform:uppercase;color:#b83f70;border:1px solid #ffc2d8;background:#fff2f7;border-radius:100px;padding:1px 5px;margin-left:6px;vertical-align:middle}' +
    '.eve-gnav .gcta{display:inline-flex;align-items:center;min-height:44px;font:800 13px "Inter",sans-serif;color:#fff;background:#14151a;border-radius:100px;padding:10px 19px;text-decoration:none;white-space:nowrap}' +
    '@media(max-width:820px){.eve-gnav{padding:8px 16px;gap:10px;scrollbar-width:none;scroll-snap-type:x proximity}.eve-gnav::-webkit-scrollbar{display:none}.eve-gnav .gbrand,.eve-gnav .gt{scroll-snap-align:start}.eve-gnav .gcta{display:none}}';

  function currentFile() {
    var f = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return f === '' ? 'index.html' : f;
  }
  function build() {
    if (document.querySelector('.eve-gnav')) return;
    var cur = currentFile();
    var style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
    var bar = document.createElement('div'); bar.className = 'eve-gnav';
    var html = '<a class="gbrand" href="index.html"><i>F</i>First Frame</a><nav class="gtabs">';
    TABS.forEach(function (t) {
      var on = t.f === cur || (t.match && t.match.indexOf(cur) >= 0);
      html += '<a class="gt' + (on ? ' on' : '') + '" href="' + t.f + '">' + t.l + (t.badge ? '<span class="nb">' + t.badge + '</span>' : '') + '</a>';
    });
    var chosen=null;try{chosen=JSON.parse(localStorage.getItem('ff.learner.v1')||'null')?.track;}catch(_){}
    var trackLink={kids:['Story Playground','kids.html'],beginner:['Weekend Film','beginner.html'],student:['The Dark Room','darkroom.html']}[chosen];
    html += '</nav><a class="gcta" href="'+(trackLink?trackLink[1]:'tracks.html')+'">'+(trackLink?'Continue · '+trackLink[0]:'Choose a track')+'</a>';
    bar.innerHTML = html;
    document.body.insertBefore(bar, document.body.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
