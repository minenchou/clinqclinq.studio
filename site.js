window.SITE_ICONS = {
  nav:    '',
  emblem: '',
  work1:  '',
  work2:  '',
  work3:  ''
};

window.PALETTES = [
  { id: 'soda',     name: 'Sphere Soda', zh: '球形汽水' },
  // { id: 'flame-cs', name: 'Flame Test',  zh: '焰色反應' },
  // { id: 'ice',      name: 'Ice & Glass', zh: '冰晶玻璃' },
  // { id: 'clink',    name: 'Clink Hour',  zh: '乾杯時刻' },
  { id: 'specimen', name: 'Specimen',    zh: '礦物標本' },
  { id: 'classic',  name: 'Classic',     zh: '經典簡約' }
];

window.SITE_ZH = {
  nav_work:    '作品',
  nav_lab:     '互動知識',
  nav_series:  '創作系列',
  nav_about:   '關於',
  nav_contact: '聯絡'
};

(function () {
  var root = document.documentElement;
  var base = ((document.currentScript && document.currentScript.src) || location.href).replace(/[^\/]*$/, '');
  var list = window.PALETTES;

  var p = list[0].id;
  try { p = localStorage.getItem('palette') || p; } catch (e) {}
  if (!list.some(function (x) { return x.id === p; })) p = list[0].id;
  root.setAttribute('data-palette', p);

  // var t = 'light';
  // try { t = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch (e) {}
  // root.setAttribute('data-theme', t);

  function isZh() { return root.lang === 'zh-Hant'; }

  function pick(spec) {
    if (!spec) return '';
    if (typeof spec === 'string') return spec;
    // if (root.getAttribute('data-theme') === 'dark' && spec.dark) return spec.dark;
    return spec.light || spec.dark || '';
  }
  function setIcons() {
    var I = window.SITE_ICONS || {};
    document.querySelectorAll('[data-icon]').forEach(function (host) {
      var src = pick(I[host.getAttribute('data-icon')]);
      if (!src) return;
      src = new URL(src, base).href;
      var t = new Image();
      t.onload = function () {
        var img = host.querySelector('img.custom-icon');
        if (!img) {
          img = document.createElement('img');
          img.className = 'custom-icon'; img.alt = ''; img.decoding = 'async';
          host.appendChild(img);
        }
        img.src = src;
        host.classList.add('has-custom');
      };
      t.src = src;
    });
  }
  window.__setIcons = setIcons;

  function setMenu(open) {
    var btn = document.getElementById('menuToggle');
    if (!btn) return;
    document.getElementById('menuPanel').classList.toggle('open', open);
    document.getElementById('menuScrim').classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open && window.__updateNav) requestAnimationFrame(window.__updateNav);
  }
  window.__setMenu = setMenu;

  function initMenu() {
    var btn = document.getElementById('menuToggle');
    if (!btn) return;
    btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
    document.getElementById('menuScrim').addEventListener('click', function () { setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setMenu(false); btn.focus(); }
    });
  }

  function initPalette() {
    var btn = document.getElementById('paletteToggle');
    if (!btn) return;
    var turns = 0;
    function idx() {
      var cur = root.getAttribute('data-palette');
      for (var i = 0; i < list.length; i++) if (list[i].id === cur) return i;
      return 0;
    }
    function label() {
      var p = list[idx()];
      var t = isZh() ? '配色：' + p.zh + '（按下換色）' : 'Palette: ' + p.name + ' (click for next)';
      btn.setAttribute('aria-label', t);
      btn.title = t;
    }
    window.__updatePaletteLabel = label;
    btn.addEventListener('click', function () {
      var next = list[(idx() + 1) % list.length].id;
      root.setAttribute('data-palette', next);
      try { localStorage.setItem('palette', next); } catch (e) {}
      turns += 1;
      btn.querySelector('svg').style.transform = 'rotate(' + turns * 120 + 'deg)';
      label();
    });
    label();
  }

  function initTheme() {
    // var pal = document.getElementById('paletteToggle');
    // if (!pal) return;
    // var btn = document.createElement('button');
    // btn.className = 'fab theme-toggle'; btn.id = 'themeToggle'; btn.type = 'button';
    // btn.innerHTML = '<svg viewBox="0 0 18 18" aria-hidden="true"><path class="moon" d="M14.6 11.2A6.2 6.2 0 0 1 6.8 3.4a6.2 6.2 0 1 0 7.8 7.8z"/><g class="sun"><circle cx="9" cy="9" r="3.1"/><path d="M9 1.6v1.6M9 14.8v1.6M1.6 9h1.6M14.8 9h1.6M3.77 3.77l1.13 1.13M13.1 13.1l1.13 1.13M3.77 14.23l1.13-1.13M13.1 4.9l1.13-1.13"/></g></svg>';
    // pal.insertAdjacentElement('afterend', btn);
    // var turns = 0;
    // function label() {
    //   var dark = root.getAttribute('data-theme') === 'dark';
    //   var t = dark ? (isZh() ? '切換為淺色模式' : 'Switch to light mode') : (isZh() ? '切換為深色模式' : 'Switch to dark mode');
    //   btn.setAttribute('aria-label', t);
    //   btn.title = t;
    //   btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
    // }
    // window.__updateThemeLabel = label;
    // btn.addEventListener('click', function () {
    //   var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    //   root.setAttribute('data-theme', next);
    //   try { localStorage.setItem('theme', next); } catch (e) {}
    //   turns += 1;
    //   btn.querySelector('svg').style.transform = 'rotate(' + turns * 360 + 'deg)';
    //   setIcons();
    //   label();
    // });
    // label();
  }

  function initLang() {
    var btn = document.getElementById('langToggle');
    var ZH = Object.assign({}, window.SITE_ZH, window.PAGE_ZH || {});
    var nodes = document.querySelectorAll('[data-i18n]');
    var EN = [];
    nodes.forEach(function (el, i) { EN[i] = el.innerHTML; });

    function apply(lang) {
      var zh = lang === 'zh';
      nodes.forEach(function (el, i) {
        var k = el.getAttribute('data-i18n');
        el.innerHTML = zh && ZH[k] != null ? ZH[k] : EN[i];
      });
      root.lang = zh ? 'zh-Hant' : 'en';
      if (btn) {
        btn.textContent = zh ? 'EN' : '中';
        var label = zh ? 'Switch to English' : '切換為中文';
        btn.setAttribute('aria-label', label);
        btn.title = label;
      }
      var menuBtn = document.getElementById('menuToggle');
      if (menuBtn) menuBtn.setAttribute('aria-label', zh ? '選單' : 'Sections');
      if (window.__updatePaletteLabel) window.__updatePaletteLabel();
      if (window.__updateThemeLabel) window.__updateThemeLabel();
      try { localStorage.setItem('lang', lang); } catch (e) {}
      if (window.__renderWorks) window.__renderWorks();
      if (window.__updateNav) window.__updateNav();
    }

    if (!btn) return;
    var initial = 'en';
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'zh' || q === 'en') initial = q;
    else { try { initial = localStorage.getItem('lang') || 'en'; } catch (e) {} }
    if (initial === 'zh') apply('zh');

    btn.addEventListener('click', function () { apply(isZh() ? 'en' : 'zh'); });
  }

  function init() {
    setIcons();
    var y = document.getElementById('y');
    if (y) y.textContent = new Date().getFullYear();
    initMenu();
    initPalette();
    initTheme();
    initLang();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
