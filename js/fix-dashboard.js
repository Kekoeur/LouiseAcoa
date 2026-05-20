/* =====================================================
   ACOA — Fix Dashboard  (outil de test, à retirer en prod)
   Panneau flottant pour activer/désactiver chaque fix
   ===================================================== */
(function () {
  'use strict';

  /* ─── Définition de chaque fix ─────────────────────────────────────────── */
  var FIXES = [
    {
      id: 1, cat: 'bug',
      name: '#1 — Cards image: background-size cover',
      where: 'index / expertises / discover-eric → cartes Challenge (fond jaune/image)',
      css: [
        '.layout423_image-wrapper.yellow{background-size:cover!important;background-position:50% 50%!important}',
        '@media(max-width:767px){.layout423_image-wrapper.yellow{background-size:cover!important;background-position:50% 50%!important}}',
        '@media(max-width:479px){.layout423_image-wrapper.yellow{background-size:cover!important;background-position:50% 50%!important}}'
      ].join('')
    },
    {
      id: 2, cat: 'bug',
      name: '#2 — Bug iOS: background-attachment fixed',
      where: 'Toutes pages → section hero image de fond (iPhone / Safari)',
      css: '@media(max-width:767px){.section.gradient{background-attachment:scroll!important;background-size:cover!important;background-position:50% 0%!important}.section.heading_phone{background-attachment:scroll!important;background-size:cover!important}}'
    },
    {
      id: 3, cat: 'bug',
      name: '#3 — Overflow-X horizontal mobile',
      where: 'Toutes pages → scroll horizontal parasite sur mobile',
      css: '@media(max-width:991px){html,body{overflow-x:hidden!important;max-width:100%!important}}'
    },
    {
      id: 4, cat: 'bug',
      name: '#4 — Tabs content: largeur fixe 720px',
      where: 'solutions.html → section onglets "Our approach"',
      css: '.services_stakes_tabs-content{width:auto!important;max-width:100%!important}'
    },
    {
      id: 5, cat: 'mobile',
      name: '#5 — .wrap: padding latéral tablette',
      where: 'Toutes pages → contenu touche les bords à ≤991px',
      css: '@media(max-width:991px){.wrap{padding-left:5%!important;padding-right:5%!important;box-sizing:border-box!important}}@media(max-width:479px){.wrap{padding-left:16px!important;padding-right:16px!important}}'
    },
    {
      id: 6, cat: 'mobile',
      name: '#6 — Logo: trop large à 767px',
      where: 'Toutes pages → navbar, logo texte jaune',
      css: '@media(max-width:767px){.image-2.logo-jaune{width:180px!important}}'
    },
    {
      id: 7, cat: 'mobile',
      name: '#7 — Button-group: 75% → 100% mobile',
      where: 'index / solutions → boutons CTA groupés coupés',
      css: '@media(max-width:767px){.button-group{width:100%!important}}'
    },
    {
      id: 8, cat: 'mobile',
      name: '#8 — Quick-stack-5: gap 150px → réduit',
      where: 'index → section logos / chiffres clés',
      css: '@media(max-width:767px){.quick-stack-5{grid-column-gap:60px!important;grid-row-gap:60px!important}}@media(max-width:479px){.quick-stack-5{grid-column-gap:24px!important;grid-row-gap:24px!important}}'
    },
    {
      id: 9, cat: 'mobile',
      name: '#9 — Marges de section: réduites mobile',
      where: 'Toutes pages → espaces vides trop grands entre sections',
      css: '@media(max-width:767px){.wrap.section_1_wrap{margin-top:60px!important;margin-bottom:60px!important}.section_services_testimonial{padding-top:50px!important}.quick-stack-11{padding-top:64px!important;padding-bottom:32px!important}.contact-us_features-list_tabs{padding-top:50px!important}.layout507_tabs{margin-top:50px!important}.quick-stack-3{padding-top:32px!important}.quick-stack-4{grid-column-gap:48px!important;grid-row-gap:48px!important;margin-bottom:64px!important}}@media(max-width:479px){.wrap.section_1_wrap{margin-top:48px!important;margin-bottom:48px!important}.section_services_testimonial{padding-top:40px!important}.quick-stack-11{padding-top:48px!important;padding-bottom:24px!important}.contact-us_features-list_tabs{padding-top:40px!important}.layout507_tabs{margin-top:40px!important}}'
    },
    {
      id: 10, cat: 'mobile',
      name: '#10 — Section blanche: padding latéral mobile',
      where: 'index / expertises → sections fond blanc, texte bord à bord',
      css: '@media(max-width:991px){.section-white-backgound,.section-white-backgound-footer{padding-left:4%!important;padding-right:4%!important}}@media(max-width:479px){.section-white-backgound,.section-white-backgound-footer{padding-left:16px!important;padding-right:16px!important}}'
    },
    {
      id: 11, cat: 'mobile',
      name: '#11 — Grid-2: wrap sur tablette',
      where: 'discover-eric / segments → 4 colonnes écrasées sur tablette',
      css: '@media(max-width:991px){.grid-2{flex-wrap:wrap!important}.grid-2>*{flex:1 1 calc(50% - 24px)!important;min-width:200px!important}}@media(max-width:479px){.grid-2>*{flex:1 1 100%!important}}'
    },
    {
      id: 12, cat: 'mobile',
      name: '#12 — Typographie h1/h3: scaling mobile',
      where: 'Toutes pages → h1 90px / h3 70px trop grands sur mobile',
      css: '@media(max-width:991px){h1{font-size:68px!important;line-height:76px!important;letter-spacing:-1.8px!important}h3{font-size:52px!important;line-height:60px!important}.home__hero-heading{font-size:60px!important;line-height:68px!important}}@media(max-width:767px){h1{font-size:52px!important;line-height:60px!important}h3{font-size:40px!important;line-height:48px!important}.home__hero-heading{font-size:48px!important;line-height:56px!important}}@media(max-width:479px){h1{font-size:40px!important;line-height:48px!important}h3{font-size:32px!important;line-height:40px!important}.home__hero-heading{font-size:36px!important;line-height:44px!important}}'
    },
    {
      id: 13, cat: 'style',
      name: '#13 — Nav: lien actif visible (jaune)',
      where: 'Toutes pages → navbar, page courante grise = invisible',
      css: '.nav__link.text-xs.w--current{color:#ffbd00!important;font-weight:500!important}'
    },
    {
      id: 14, cat: 'style',
      name: '#14 — Cards: hover effect + cursor pointer',
      where: 'index / expertises / discover-eric → cartes sans feedback hover',
      css: '.layout423_card[href],a.layout423_card{cursor:pointer!important;transition:transform .25s cubic-bezier(.165,.84,.44,1),box-shadow .25s cubic-bezier(.165,.84,.44,1)!important;will-change:transform!important;text-decoration:none!important}.layout423_card[href]:hover,a.layout423_card:hover{transform:translateY(-4px)!important;box-shadow:0 12px 32px rgba(0,0,0,.18)!important}.layout423_card[href]:active,a.layout423_card:active{transform:translateY(-1px) scale(.99)!important}'
    },
    {
      id: 15, cat: 'style',
      name: '#15 — Boutons is-link: hover jaune + underline animé',
      where: 'index / solutions → liens "Explore solutions", "Discover Éric"',
      css: '.button.is-link{transition:color .2s ease!important;position:relative!important;cursor:pointer!important}.button.is-link:hover{color:#ffbd00!important;text-decoration:none!important}.button.is-link::after{content:""!important;position:absolute!important;bottom:0!important;left:0!important;width:0!important;height:1.5px!important;background:#ffbd00!important;transition:width .25s ease!important}.button.is-link:hover::after{width:100%!important}.button.is-link.is-icon.is-alternate{color:rgba(255,255,255,.85)!important;gap:.4rem!important;border-bottom:1px solid rgba(255,255,255,.3)!important;transition:color .2s,border-color .2s,gap .2s!important}.button.is-link.is-icon.is-alternate::after{display:none!important}.button.is-link.is-icon.is-alternate:hover{color:#fff!important;border-color:#ffbd00!important;gap:.7rem!important}.button.is-link.is-icon.is-alternate .icon-embed-xxsmall{color:#ffbd00!important;transition:transform .2s!important}.button.is-link.is-icon.is-alternate:hover .icon-embed-xxsmall{transform:translateX(3px)!important}'
    }
  ];

  var CAT_META = {
    bug:    { label: 'BUG',    color: '#ef4444' },
    mobile: { label: 'MOBILE', color: '#f97316' },
    style:  { label: 'STYLE',  color: '#eab308' }
  };

  /* ─── State ─────────────────────────────────────────────────────────────── */
  var LS_KEY = 'acoa-fixes';
  var state = {};
  try { state = JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch(e) {}

  function saveState() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch(e) {}
  }

  /* ─── Style tags ────────────────────────────────────────────────────────── */
  var injected = {};

  function applyFix(id, active) {
    if (active) {
      if (!injected[id]) {
        var fix = null;
        for (var i = 0; i < FIXES.length; i++) { if (FIXES[i].id === id) { fix = FIXES[i]; break; } }
        if (!fix) return;
        var tag = document.createElement('style');
        tag.id = 'afd-style-' + id;
        tag.textContent = fix.css;
        document.head.appendChild(tag);
        injected[id] = tag;
      }
    } else {
      if (injected[id]) {
        injected[id].parentNode.removeChild(injected[id]);
        delete injected[id];
      }
    }
    state[id] = active;
    saveState();
  }

  /* ─── Helpers DOM ───────────────────────────────────────────────────────── */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(k) {
        if (k === 'style') {
          Object.keys(attrs.style).forEach(function(s) { node.style[s] = attrs.style[s]; });
        } else if (k === 'class') {
          node.className = attrs[k];
        } else {
          node.setAttribute(k, attrs[k]);
        }
      });
    }
    if (children) {
      children.forEach(function(c) {
        if (typeof c === 'string') node.appendChild(document.createTextNode(c));
        else if (c) node.appendChild(c);
      });
    }
    return node;
  }

  function txt(t) { return document.createTextNode(t); }

  /* ─── Construire le panel ───────────────────────────────────────────────── */
  function buildDashboard() {
    /* CSS du panel */
    var styleEl = document.createElement('style');
    styleEl.textContent = [
      '#afd{position:fixed;bottom:20px;right:20px;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:13px}',
      '#afd-fab{width:48px;height:48px;border-radius:50%;background:#25251e;border:2px solid #ffbd00;color:#ffbd00;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,.5);transition:transform .2s;position:relative;padding:0}',
      '#afd-fab:hover{transform:scale(1.08)}',
      '#afd-badge{position:absolute;top:-4px;right:-4px;background:#ffbd00;color:#25251e;font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;line-height:1}',
      '#afd-panel{position:absolute;bottom:60px;right:0;width:380px;max-height:82vh;background:#1a1a14;border:1px solid #2e2e22;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.7);display:none;flex-direction:column;overflow:hidden}',
      '#afd-panel.open{display:flex}',
      '#afd-head{padding:14px 16px 12px;border-bottom:1px solid #2e2e22;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-shrink:0}',
      '#afd-title{color:#e8e8d8;font-weight:700;font-size:13px;letter-spacing:.04em}',
      '#afd-sub{color:#555;font-size:10px;margin-top:2px}',
      '#afd-btns{display:flex;gap:6px;flex-shrink:0}',
      '.afd-btn{font-size:10px;padding:4px 9px;border-radius:5px;border:1px solid #2e2e22;background:transparent;color:#777;cursor:pointer;transition:border-color .15s,color .15s;font-family:inherit}',
      '.afd-btn:hover{border-color:#ffbd00;color:#ffbd00}',
      '#afd-body{overflow-y:auto;padding:6px 0 10px;flex:1}',
      '#afd-body::-webkit-scrollbar{width:4px}',
      '#afd-body::-webkit-scrollbar-thumb{background:#2e2e22;border-radius:2px}',
      '.afd-cat{font-size:9px;font-weight:700;letter-spacing:.15em;padding:10px 16px 5px;border-top:1px solid #2a2a1e;margin-top:6px}',
      '.afd-cat:first-child{border-top:none;margin-top:0;padding-top:4px}',
      '.afd-row{display:flex;align-items:flex-start;gap:10px;padding:7px 16px;transition:background .1s}',
      '.afd-row:hover{background:rgba(255,255,255,.03)}',
      '.afd-num{font-size:10px;font-weight:700;min-width:20px;padding-top:2px}',
      '.afd-info{flex:1;min-width:0}',
      '.afd-name{color:#ddd;font-size:11.5px;line-height:1.4}',
      '.afd-where{color:#484840;font-size:10px;margin-top:2px;line-height:1.3}',
      '.afd-tog{position:relative;width:36px;height:20px;flex-shrink:0;margin-top:2px}',
      '.afd-tog input{opacity:0;width:0;height:0;position:absolute}',
      '.afd-sl{position:absolute;inset:0;background:#252520;border-radius:20px;cursor:pointer;transition:background .2s}',
      '.afd-sl::before{content:"";position:absolute;left:3px;top:3px;width:14px;height:14px;background:#3a3a30;border-radius:50%;transition:transform .2s,background .2s}',
      '.afd-tog input:checked+.afd-sl{background:rgba(255,189,0,.2)}',
      '.afd-tog input:checked+.afd-sl::before{background:#ffbd00;transform:translateX(16px)}',
      '#afd-foot{padding:9px 16px;border-top:1px solid #2e2e22;color:#484840;font-size:10px;flex-shrink:0}',
      '#afd-foot b{color:#ffbd00}'
    ].join('');
    document.head.appendChild(styleEl);

    /* Root */
    var root = el('div', {id: 'afd'});

    /* FAB */
    var badge = el('span', {id: 'afd-badge'}, [countActive() + '']);
    var fab = el('button', {id: 'afd-fab', title: 'Fix Dashboard'}, [txt('⚙'), badge]);
    root.appendChild(fab);

    /* Panel */
    var panel = el('div', {id: 'afd-panel'});

    /* Header */
    var btnAll = el('button', {'class': 'afd-btn', id: 'afd-btn-on'}, [txt('Tout ON')]);
    var btnNone = el('button', {'class': 'afd-btn', id: 'afd-btn-off'}, [txt('Tout OFF')]);
    var btnBox = el('div', {id: 'afd-btns'}, [btnAll, btnNone]);
    var titleEl = el('div', {id: 'afd-title'}, [txt('ACOA — Fix Dashboard')]);
    var subEl = el('div', {id: 'afd-sub'}, [txt(FIXES.length + ' corrections disponibles')]);
    var titleBox = el('div', {}, [titleEl, subEl]);
    var head = el('div', {id: 'afd-head'}, [titleBox, btnBox]);
    panel.appendChild(head);

    /* Body */
    var body = el('div', {id: 'afd-body'});
    var currentCat = null;

    FIXES.forEach(function(fix) {
      if (fix.cat !== currentCat) {
        currentCat = fix.cat;
        var meta = CAT_META[currentCat];
        var catLabel = el('div', {'class': 'afd-cat', style: {color: meta.color, borderColor: meta.color + '25'}}, [txt(meta.label)]);
        body.appendChild(catLabel);
      }

      var meta = CAT_META[fix.cat];
      var isOn = !!state[fix.id];

      var numEl = el('span', {'class': 'afd-num', style: {color: meta.color}}, [txt('#' + fix.id)]);
      var nameEl = el('div', {'class': 'afd-name'}, [txt(fix.name.replace(/^#\d+ — /, ''))]);
      var whereEl = el('div', {'class': 'afd-where'}, [txt(fix.where)]);
      var infoEl = el('div', {'class': 'afd-info'}, [nameEl, whereEl]);

      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.setAttribute('data-fix', fix.id);
      if (isOn) cb.checked = true;

      var slider = el('span', {'class': 'afd-sl'});
      var tog = el('label', {'class': 'afd-tog'}, [cb, slider]);

      var row = el('div', {'class': 'afd-row'}, [numEl, infoEl, tog]);
      body.appendChild(row);
    });
    panel.appendChild(body);

    /* Footer */
    var countSpan = el('b', {id: 'afd-count'}, [txt(countActive() + '')]);
    var foot = el('div', {id: 'afd-foot'});
    foot.appendChild(document.createTextNode('Actifs : '));
    foot.appendChild(countSpan);
    foot.appendChild(document.createTextNode(' / ' + FIXES.length + ' — état sauvegardé automatiquement'));
    panel.appendChild(foot);

    root.appendChild(panel);
    document.body.appendChild(root);

    /* ─── Événements ────────────────────────────────────────────────────── */
    fab.addEventListener('click', function(e) {
      e.stopPropagation();
      panel.classList.toggle('open');
    });

    body.addEventListener('change', function(e) {
      if (e.target.tagName !== 'INPUT') return;
      var id = parseInt(e.target.getAttribute('data-fix'), 10);
      applyFix(id, e.target.checked);
      refreshBadge();
    });

    btnAll.addEventListener('click', function() {
      FIXES.forEach(function(f) {
        applyFix(f.id, true);
        var cb = body.querySelector('input[data-fix="' + f.id + '"]');
        if (cb) cb.checked = true;
      });
      refreshBadge();
    });

    btnNone.addEventListener('click', function() {
      FIXES.forEach(function(f) {
        applyFix(f.id, false);
        var cb = body.querySelector('input[data-fix="' + f.id + '"]');
        if (cb) cb.checked = false;
      });
      refreshBadge();
    });

    document.addEventListener('click', function(e) {
      if (!root.contains(e.target)) panel.classList.remove('open');
    });
  }

  function countActive() {
    return FIXES.filter(function(f) { return !!state[f.id]; }).length;
  }

  function refreshBadge() {
    var n = countActive();
    var badge = document.getElementById('afd-badge');
    var count = document.getElementById('afd-count');
    if (badge) badge.textContent = n;
    if (count) count.textContent = n;
  }

  /* ─── Boot ──────────────────────────────────────────────────────────────── */
  function boot() {
    buildDashboard();
    FIXES.forEach(function(f) { if (state[f.id]) applyFix(f.id, true); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
