/*
 * eve-nav.js — the global platform navigation.
 * Injects one consistent top tab-bar on every page so E.V.E feels like a real
 * learning platform (Home · Create · Learn · AI Tools · Detector · Community),
 * not a single wizard. Self-mounts at the top of <body>; highlights the current tab.
 */
(function () {
  'use strict';
  var TABS = [
    { l: 'Home', f: 'index.html' },
    { l: 'Create', f: 'concept_lab.html', match: ['concept_lab.html', 'creators_room.html', 'shotseed.html', 'storyboard.html'] },
    { l: 'Learn', f: 'learn.html' },
    { l: 'AI Tools', f: 'toolkit.html' },
    { l: 'Detector', f: 'detector.html', badge: 'New' },
    { l: 'Community', f: 'community.html' }
  ];
  var CSS = '' +
    '.eve-gnav{display:flex;align-items:center;gap:18px;padding:12px 34px;background:rgba(12,10,20,.78);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--border,#2b2540);position:sticky;top:0;z-index:60;overflow-x:auto}' +
    '.eve-gnav .gbrand{font-family:"Fraunces",Georgia,serif;font-weight:900;font-size:18px;letter-spacing:-.3px;color:#fff;text-decoration:none;white-space:nowrap}' +
    '.eve-gnav .gbrand i{font-style:normal;background:linear-gradient(100deg,#8b7bff,#ff5da2 52%,#f2c14e);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}' +
    '.eve-gnav .gtabs{display:flex;align-items:center;gap:3px;margin-left:8px}' +
    '.eve-gnav .gt{position:relative;font:600 13.5px "Inter",sans-serif;color:#9a94ad;text-decoration:none;padding:8px 14px;border-radius:100px;white-space:nowrap;transition:color .14s,background .14s}' +
    '.eve-gnav .gt:hover{color:#fff;background:rgba(255,255,255,.05)}' +
    '.eve-gnav .gt.on{color:#fff;background:rgba(139,123,255,.16)}' +
    '.eve-gnav .gt .nb{font-size:8px;font-weight:800;letter-spacing:.4px;text-transform:uppercase;color:#ff5da2;border:1px solid rgba(255,93,162,.5);border-radius:100px;padding:1px 5px;margin-left:6px;vertical-align:middle}' +
    '.eve-gnav .gcta{margin-left:auto;font:800 13px "Inter",sans-serif;color:#120c1c;background:linear-gradient(100deg,#8b7bff,#ff5da2 55%,#f2c14e);border-radius:100px;padding:9px 18px;text-decoration:none;white-space:nowrap;box-shadow:0 6px 20px rgba(139,123,255,.3)}' +
    '@media(max-width:820px){.eve-gnav{padding:10px 16px;gap:10px}.eve-gnav .gcta{display:none}}';

  function currentFile() {
    var f = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return f === '' ? 'index.html' : f;
  }
  function build() {
    if (document.querySelector('.eve-gnav')) return;
    var cur = currentFile();
    var style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
    var bar = document.createElement('div'); bar.className = 'eve-gnav';
    var html = '<a class="gbrand" href="index.html">E.V.E <i>Creator</i></a><nav class="gtabs">';
    TABS.forEach(function (t) {
      var on = t.f === cur || (t.match && t.match.indexOf(cur) >= 0);
      html += '<a class="gt' + (on ? ' on' : '') + '" href="' + t.f + '">' + t.l + (t.badge ? '<span class="nb">' + t.badge + '</span>' : '') + '</a>';
    });
    html += '</nav><a class="gcta" href="index.html#start">Start free</a>';
    bar.innerHTML = html;
    document.body.insertBefore(bar, document.body.firstChild);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
