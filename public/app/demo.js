/* ==========================================================================
   /app/ 界面预览 · 唯一的脚本
   --------------------------------------------------------------------------
   只做四件事：切屏、Chat 侧栏开合、转盘能转、开屏说明的开关。
   没有数据层、没有请求、没有依赖。整个文件几 KB。
   ========================================================================== */
(function () {
  'use strict';

  /** 设置屏的 12 个分页 ↔ 原应用 SettingsPage 的 TAB_LIST */
  var SETTINGS = {
    'AI 配置': 'ai',
    '待办配置': 'todo',
    '随机浏览': 'random',
    '数据管理': 'dataManager',
    '导入': 'import',
    '导出': 'export',
    '本地备份': 'backup',
    '数据恢复': 'restore',
    '云端备份': 'cloud',
    '设备互通': 'sync',
    '提示词': 'prompts',
    'GLM 配置': 'glm',
  };

  var NAV = { '录入': 'home', '随机': 'random', '待办': 'todo', 'Chat': 'chat', '设置': 'settings' };
  var QUICK = { '决定转盘': 'wheel', '备忘录': 'memo', '随机浏览': 'random' };
  var IDS = ['home', 'random', 'todo', 'chat', 'settings', 'wheel', 'memo'];

  var screens = {};
  for (var i = 0; i < IDS.length; i++) {
    screens[IDS[i]] = document.querySelector('[data-screen="' + IDS[i] + '"]');
  }

  /* ---------------------------------------------------------------- 切屏 */

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
    closeChatSidebar();
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------- Chat 侧栏（唯一出口）

     真机上 Chat 页没有底栏，返回路径是：左上角菜单 → 侧栏 → 底部「退出」。
     预览里必须把这条链补上，否则访客进 Chat 就出不来。 */

  function openChatSidebar() {
    var page = document.querySelector('.chat-page');
    if (!page || page.classList.contains('sidebar-open')) return;
    page.classList.add('sidebar-open');
    // 原应用只在 sidebarOpen 时才渲染这层遮罩，抓下来的静态 DOM 里没有，得自己补
    if (!document.getElementById('pvOverlay')) {
      var ov = document.createElement('div');
      ov.className = 'sidebar-overlay';
      ov.id = 'pvOverlay';
      page.insertBefore(ov, page.firstChild);
    }
    syncReopen();
  }

  function closeChatSidebar() {
    var page = document.querySelector('.chat-page');
    if (page) page.classList.remove('sidebar-open');
    var ov = document.getElementById('pvOverlay');
    if (ov && ov.parentNode) ov.parentNode.removeChild(ov);
    syncReopen();
  }

  /* -------------------------------------------------- 设置屏的 12 个分页

     原应用一屏只渲染当前分页。快照把 12 份面板都拼进了 main.settings-content，
     靠 [hidden] 控制谁露面 —— 点侧栏就切一份，和真机手感一致。 */

  function showSettingsPanel(key) {
    var items = document.querySelectorAll('.settings-nav-item');
    for (var i = 0; i < items.length; i++) {
      var k = SETTINGS[items[i].textContent.trim()];
      items[i].classList.toggle('active', k === key);
    }

    var panels = document.querySelectorAll('[data-pv-tab]');
    for (var j = 0; j < panels.length; j++) {
      panels[j].hidden = panels[j].getAttribute('data-pv-tab') !== key;
    }

    var box = document.querySelector('main.settings-content');
    if (box) box.scrollTop = 0;
  }

  /* ------------------------------------------------------------ 转盘会转 */

  function spin() {
    var g = document.querySelector('.wheel-canvas-svg > g');
    if (!g) return;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var deg = 1440 + Math.floor(Math.random() * 720);
    g.style.transition = reduce ? 'none' : 'transform 3800ms cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    g.style.transform = 'rotate(' + deg + 'deg)';
  }

  /* ------------------------------------------------------------------ 事件 */

  document.addEventListener('click', function (e) {
    var t = e.target;

    // 开屏说明
    if (t.closest && t.closest('#pvGo')) {
      e.preventDefault();
      return setNotice(false);
    }
    if (t.closest && t.closest('#pvReopen')) {
      e.preventDefault();
      return setNotice(true);
    }

    // Chat 侧栏
    if (t.closest && t.closest('.chat-menu-btn')) {
      e.preventDefault();
      return openChatSidebar();
    }
    if (t.closest && (t.closest('.sidebar-close') || t.closest('#pvOverlay'))) {
      e.preventDefault();
      return closeChatSidebar();
    }
    if (t.closest && t.closest('.sidebar-exit-btn')) {
      e.preventDefault();
      closeChatSidebar();
      return show('home');
    }

    // 设置屏的侧栏分页
    var sNav = t.closest && t.closest('.settings-nav-item');
    if (sNav) {
      var sKey = SETTINGS[sNav.textContent.trim()];
      if (sKey) {
        e.preventDefault();
        return showSettingsPanel(sKey);
      }
      return; // 没映射到的项就当没接线的按钮，别让它冒泡出去
    }

    // 底栏
    var nav = t.closest && t.closest('.nav-item');
    if (nav) {
      var labelEl = nav.querySelector('.nav-label');
      var label = (labelEl ? labelEl.textContent : nav.textContent).trim();
      if (NAV[label]) {
        e.preventDefault();
        return show(NAV[label]);
      }
    }

    // 首页快捷卡
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

    // 返回箭头（转盘 / 备忘录）
    if (t.closest && t.closest('[title="返回"]')) {
      e.preventDefault();
      return show('home');
    }

    // 转盘 GO
    if (t.closest && t.closest('.wheel-go-btn')) {
      e.preventDefault();
      return spin();
    }
  });

  window.addEventListener('hashchange', function () {
    show(currentId(), true);
  });

  /* ------------------------------------------------------------ 开屏说明 */

  var mask = document.getElementById('pvMask');
  var reopen = document.getElementById('pvReopen');

  /** 「?」只在说明关着、且 Chat 侧栏没展开时出现（展开时它会被压在遮罩上） */
  function syncReopen() {
    if (!reopen) return;
    var drawer = document.querySelector('.chat-page.sidebar-open');
    reopen.hidden = !(mask && mask.hidden) || !!drawer;
  }

  function setNotice(on) {
    if (mask) mask.hidden = !on;
    syncReopen();
  }

  // 默认就在，不自动消失；关掉后留个小「?」能叫回来
  setNotice(true);

  show(currentId(), true);
})();
