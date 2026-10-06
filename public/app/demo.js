/* ==========================================================================
   /app/ 界面预览 · 唯一的脚本
   --------------------------------------------------------------------------
   只做三件事：切屏（走 hash，所以浏览器返回键能用）、转盘能转、首次提示一次。
   没有数据层、没有请求、没有依赖。整个文件不到 3 KB。
   ========================================================================== */
(function () {
  'use strict';

  var NAV = { '录入': 'home', '随机': 'random', '待办': 'todo', 'Chat': 'chat', '设置': 'settings' };
  var QUICK = { '决定转盘': 'wheel', '备忘录': 'memo', '随机浏览': 'random' };
  var IDS = ['home', 'random', 'todo', 'chat', 'settings', 'wheel', 'memo'];

  var screens = {};
  for (var i = 0; i < IDS.length; i++) {
    screens[IDS[i]] = document.querySelector('[data-screen="' + IDS[i] + '"]');
  }

  function currentId() {
    var h = (location.hash || '').replace(/^#\/?/, '');
    return screens[h] ? h : 'home';
  }

  function show(id, skipHash) {
    if (!screens[id]) id = 'home';
    for (var i = 0; i < IDS.length; i++) {
      var el = screens[IDS[i]];
      if (el) el.hidden = IDS[i] !== id;
    }
    if (!skipHash) {
      var want = id === 'home' ? '#/' : '#/' + id;
      if (location.hash !== want) location.hash = want;
    }
    window.scrollTo(0, 0);
  }

  /** 转盘能转：直接改那个 <g> 的内联 transform，和真机用的是同一套角度逻辑 */
  function spin() {
    var g = document.querySelector('.wheel-canvas-svg > g');
    if (!g) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var deg = 1440 + Math.floor(Math.random() * 720);
    g.style.transition = reduce ? 'none' : 'transform 3800ms cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    g.style.transform = 'rotate(' + deg + 'deg)';
  }

  document.addEventListener('click', function (e) {
    var t = e.target;

    var nav = t.closest && t.closest('.nav-item');
    if (nav) {
      var labelEl = nav.querySelector('.nav-label');
      var label = (labelEl ? labelEl.textContent : nav.textContent).trim();
      if (NAV[label]) {
        e.preventDefault();
        return show(NAV[label]);
      }
    }

    var quick = t.closest && t.closest('.quick-btn');
    if (quick) {
      var txt = quick.textContent.trim();
      for (var k in QUICK) {
        if (txt.indexOf(k) >= 0) {
          e.preventDefault();
          return show(QUICK[k]);
        }
      }
      return;
    }

    if (t.closest && t.closest('[title="返回"]')) {
      e.preventDefault();
      return show('home');
    }

    if (t.closest && t.closest('.wheel-go-btn')) {
      e.preventDefault();
      return spin();
    }
  });

  window.addEventListener('hashchange', function () {
    show(currentId(), true);
  });

  show(currentId(), true);

  /* 首次提示一次就自动退场，之后界面保持和真机一致 */
  var toast = document.getElementById('pvToast');
  if (toast) {
    var kill = function () {
      toast.classList.add('out');
    };
    setTimeout(kill, 5600);
    window.addEventListener('pointerdown', kill, { once: true });
  }
})();
