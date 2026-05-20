/* =====================================================
   ACOA — Fix Dashboard  (outil de test, à retirer en prod)
   ===================================================== */
(function () {
  'use strict';

  var FIXES = [

    /* ── BUG ───────────────────────────────────────────────────────────── */
    {
      id: 2, cat: 'bug',
      name: 'Bug iOS — background-attachment fixed',
      where: 'Toutes pages → section hero image de fond (iPhone/Safari)',
      css: '@media(max-width:767px){.section.gradient{background-attachment:scroll!important;background-size:cover!important;background-position:50% 0%!important}.section.heading_phone{background-attachment:scroll!important;background-size:cover!important}}'
    },
    {
      id: 3, cat: 'bug',
      name: 'Overflow-X horizontal mobile',
      where: 'Toutes pages → scroll horizontal parasite sur mobile',
      css: '@media(max-width:991px){html,body{overflow-x:hidden!important;max-width:100%!important}}'
    },
    {
      id: 4, cat: 'bug',
      name: 'Tabs content — largeur fixe 720px',
      where: 'solutions.html → section onglets "Our approach"',
      css: '.services_stakes_tabs-content{width:auto!important;max-width:100%!important}'
    },

    /* ── MOBILE ─────────────────────────────────────────────────────────── */
    {
      id: 6, cat: 'mobile',
      name: 'Logos décoratifs — trop larges sur mobile',
      where: 'index / contact / discover-eric → LOGO-MOUVEMENT dans les sections (pas la navbar)',
      /* AUDIT: .image-2.logo-jaune = logos décoratifs LOGO-MOUVEMENT dans le body
         (index ligne 423, contact 153, discover-eric 338) — width:22rem desktop.
         Le logo navbar utilise class="image" inside .brand — ciblé séparément. */
      css: [
        '@media(max-width:767px){',
          /* Logos décoratifs LOGO-MOUVEMENT dans les sections */
          '.image-2.logo-jaune{width:180px!important;max-width:100%!important}',
          /* Logo texte navbar (.brand .image) — height=40 = ~176px naturel, on contraint la largeur */
          '.brand .image{max-width:200px!important;height:auto!important}',
        '}',
        '@media(max-width:479px){',
          '.image-2.logo-jaune{width:140px!important}',
          '.brand .image{max-width:160px!important}',
        '}'
      ].join('')
    },
    {
      id: 7, cat: 'mobile',
      name: 'Boutons hero mobile — width 100%',
      where: 'index → bouton "Learn more about Éric" (.button-1)',
      /* AUDIT: .button-group n'existe pas dans index.html (divs vides dans segments.html).
         Les CTAs hero utilisent .button-1 (cercle) et .button-2.button-04 (Contact nav).
         Fix corrigé pour cibler les vrais éléments. */
      css: [
        '@media(max-width:479px){',
          '.button-1{width:100%!important;justify-content:flex-start!important}',
          '.button-text{flex:1!important}',
        '}'
      ].join('')
    },
    {
      id: 8, cat: 'mobile',
      name: 'Quick-stack-5 — gap 150px → réduit',
      where: 'index → section logos / chiffres clés',
      css: '@media(max-width:767px){.quick-stack-5{grid-column-gap:60px!important;grid-row-gap:60px!important}}@media(max-width:479px){.quick-stack-5{grid-column-gap:24px!important;grid-row-gap:24px!important}}'
    },
    {
      id: 9, cat: 'mobile',
      name: 'Marges de section — réduites mobile',
      where: 'Toutes pages → espaces vides trop grands entre sections',
      css: '@media(max-width:767px){.wrap.section_1_wrap{margin-top:60px!important;margin-bottom:60px!important}.section_services_testimonial{padding-top:50px!important}.quick-stack-11{padding-top:64px!important;padding-bottom:32px!important}.contact-us_features-list_tabs{padding-top:50px!important}.layout507_tabs{margin-top:50px!important}.quick-stack-3{padding-top:32px!important}.quick-stack-4{grid-column-gap:48px!important;grid-row-gap:48px!important;margin-bottom:64px!important}}@media(max-width:479px){.wrap.section_1_wrap{margin-top:48px!important;margin-bottom:48px!important}.section_services_testimonial{padding-top:40px!important}.quick-stack-11{padding-top:48px!important;padding-bottom:24px!important}.contact-us_features-list_tabs{padding-top:40px!important}.layout507_tabs{margin-top:40px!important}}'
    },
    {
      id: 10, cat: 'mobile',
      name: 'Section blanche — padding latéral mobile',
      where: 'index / expertises → sections fond blanc, texte bord à bord',
      css: '@media(max-width:991px){.section-white-backgound,.section-white-backgound-footer{padding-left:4%!important;padding-right:4%!important}}@media(max-width:479px){.section-white-backgound,.section-white-backgound-footer{padding-left:16px!important;padding-right:16px!important}}'
    },
    {
      id: 11, cat: 'mobile',
      name: 'Grid-2 — wrap sur tablette',
      where: 'discover-eric / segments → 4 colonnes écrasées sur tablette',
      css: '@media(max-width:991px){.grid-2{flex-wrap:wrap!important}.grid-2>*{flex:1 1 calc(50% - 24px)!important;min-width:200px!important}}@media(max-width:479px){.grid-2>*{flex:1 1 100%!important}}'
    },
    {
      id: 12, cat: 'mobile',
      name: 'Typographie h1/h3 — scaling mobile',
      where: 'Toutes pages → h1 90px / h3 70px trop grands sur mobile',
      css: '@media(max-width:991px){h1{font-size:68px!important;line-height:76px!important;letter-spacing:-1.8px!important}h3{font-size:52px!important;line-height:60px!important}.home__hero-heading{font-size:60px!important;line-height:68px!important}}@media(max-width:767px){h1{font-size:52px!important;line-height:60px!important}h3{font-size:40px!important;line-height:48px!important}.home__hero-heading{font-size:48px!important;line-height:56px!important}}@media(max-width:479px){h1{font-size:40px!important;line-height:48px!important}h3{font-size:32px!important;line-height:40px!important}.home__hero-heading{font-size:36px!important;line-height:44px!important}}'
    },

    /* ── STYLE ──────────────────────────────────────────────────────────── */
    {
      id: 13, cat: 'style',
      name: 'Nav — lien actif visible (jaune)',
      where: 'Toutes pages → navbar, page courante grise = invisible',
      css: '.nav__link.text-xs.w--current{color:#ffbd00!important;font-weight:500!important}'
    },
    {
      id: 14, cat: 'style',
      name: 'Cards — hover effect + cursor pointer',
      where: 'index / expertises / discover-eric → cartes sans feedback hover',
      css: '.layout423_card[href],a.layout423_card{cursor:pointer!important;transition:transform .25s cubic-bezier(.165,.84,.44,1),box-shadow .25s cubic-bezier(.165,.84,.44,1)!important;will-change:transform!important;text-decoration:none!important}.layout423_card[href]:hover,a.layout423_card:hover{transform:translateY(-4px)!important;box-shadow:0 12px 32px rgba(0,0,0,.18)!important}.layout423_card[href]:active,a.layout423_card:active{transform:translateY(-1px) scale(.99)!important}'
    },
    {
      id: 15, cat: 'style',
      name: 'Boutons is-link — hover jaune + underline animé',
      where: 'index / solutions → liens "Explore solutions", "Discover Éric"',
      css: '.button.is-link{transition:color .2s ease!important;position:relative!important;cursor:pointer!important}.button.is-link:hover{color:#ffbd00!important;text-decoration:none!important}.button.is-link::after{content:""!important;position:absolute!important;bottom:0!important;left:0!important;width:0!important;height:1.5px!important;background:#ffbd00!important;transition:width .25s ease!important}.button.is-link:hover::after{width:100%!important}.button.is-link.is-icon.is-alternate{color:rgba(255,255,255,.85)!important;gap:.4rem!important;border-bottom:1px solid rgba(255,255,255,.3)!important;transition:color .2s,border-color .2s,gap .2s!important}.button.is-link.is-icon.is-alternate::after{display:none!important}.button.is-link.is-icon.is-alternate:hover{color:#fff!important;border-color:#ffbd00!important;gap:.7rem!important}.button.is-link.is-icon.is-alternate .icon-embed-xxsmall{color:#ffbd00!important;transition:transform .2s!important}.button.is-link.is-icon.is-alternate:hover .icon-embed-xxsmall{transform:translateX(3px)!important}'
    },
    {
      id: 16, cat: 'style',
      name: 'FAQ accordion — marqueur visuel "+" contextuel',
      where: 'expertises.html → blanc sur fond sombre / jaune sur fond blanc',
      /* fond sombre (.section.gradient) → + blanc | fond blanc → + jaune */
      css: [
        /* fond sombre → + blanc */
        '.section.gradient .faq10_question{border-top:1px solid rgba(255,255,255,.18)!important;padding-top:14px!important;padding-bottom:14px!important}',
        '.section.gradient .faq10_question::after{content:"+"!important;color:#fff!important;font-size:20px!important;font-weight:300!important;line-height:1!important;flex-shrink:0!important;padding-left:20px!important}',
        /* fond blanc → + jaune */
        '.section-white-backgound .faq10_question{border-top:1px solid rgba(0,0,0,.1)!important;padding-top:14px!important;padding-bottom:14px!important}',
        '.section-white-backgound .faq10_question::after{content:"+"!important;color:#ffbd00!important;font-size:20px!important;font-weight:300!important;line-height:1!important;flex-shrink:0!important;padding-left:20px!important}'
      ].join('')
    },

    /* ── EXCLUSIFS — cards mobile (1 seul à la fois) ─────────────────────── */
    {
      id: 17, cat: 'exclusive',
      name: 'Cards mobile — réduire la police du contenu',
      where: 'index / expertises / discover-eric → texte dans les cartes sur mobile',
      mutex: 18,
      /*
        Problème : min-height: 50% (%) ne donne pas de hauteur réelle quand
        le parent flex est auto. Le texte réduit → carte rétrécit → image-wrapper
        (inset:0) rétrécit aussi → texte sort visuellement de la zone image.
        Solution :
        - min-height en px fixe sur la carte pour ancrer l'image-wrapper
        - overflow:hidden explicite pour contenir le texte dans la carte
        - clamp() pour lier la taille du texte à la largeur du viewport
        - line-height réduit pour limiter l'impact des <br> dans text-small-list
      */
      css: [
        '@media(max-width:767px){',
          /* Carte : ancrage px + confinement */
          '.layout423_card.text-color-white{min-height:300px!important;overflow:hidden!important}',
          '.layout423_card.text-color-white.home{min-height:280px!important;overflow:hidden!important}',
          '.layout423_card.text-color-white.expertises{min-height:300px!important;overflow:hidden!important}',
          /* Texte : taille liée au viewport via clamp */
          '.layout423_card-content .text-extra-large,',
          '.layout423_card-content-2 .text-extra-large{',
            'font-size:clamp(16px,4.5vw,22px)!important;',
            'line-height:1.25!important;letter-spacing:-.3px!important}',
          /* text-small-list : line-height réduit pour limiter l'impact des <br> */
          '.text-small-list{',
            'font-size:clamp(12px,3.2vw,14px)!important;',
            'line-height:1.45!important}',
        '}',
        '@media(max-width:479px){',
          '.layout423_card.text-color-white{min-height:260px!important}',
          '.layout423_card.text-color-white.expertises{min-height:260px!important}',
          '.layout423_card-content .text-extra-large,',
          '.layout423_card-content-2 .text-extra-large{',
            'font-size:clamp(14px,4vw,18px)!important}',
          '.text-small-list{',
            'font-size:clamp(11px,3vw,13px)!important}',
        '}'
      ].join('')
    },
    {
      id: 18, cat: 'exclusive',
      name: 'Cards mobile — agrandir la hauteur des cartes',
      where: 'index / expertises / discover-eric → image trop petite vs contenu',
      mutex: 17,
      css: [
        '@media(max-width:767px){',
          '.layout423_card.text-color-white{min-height:400px!important}',
          '.layout423_card.text-color-white.home{min-height:370px!important}',
          '.layout423_card.text-color-white.expertises{min-height:380px!important}',
        '}',
        '@media(max-width:479px){',
          '.layout423_card.text-color-white{min-height:340px!important}',
          '.layout423_card.text-color-white.expertises{min-height:320px!important}',
        '}'
      ].join('')
    },

    /* ── MOBILE (suite) ─────────────────────────────────────────────────── */
    {
      id: 19, cat: 'mobile',
      name: 'Footer — stacker verticalement sur mobile',
      where: 'Toutes pages → footer mobile : liens compactés à droite',
      /* AUDIT: webflow.js ne touche pas les grids (confirmé par grep). Les 2 colonnes
         viennent du grid implicite (grid-auto-flow). On force 1 colonne explicitement
         ET grid-auto-flow:row pour neutraliser le comportement par défaut. */
      css: [
        '@media(max-width:767px){',
          '.quick-stack-4{display:grid!important;grid-template-columns:1fr!important;grid-auto-flow:row!important;grid-row-gap:24px!important}',
          '.quick-stack-5{grid-template-columns:1fr!important;grid-auto-flow:row!important;grid-column-gap:0!important;grid-row-gap:4px!important}',
          '.cell-2{padding-left:0!important;width:100%!important}',
          '.w-layout-cell.cell,.w-layout-cell.cell-2{width:100%!important}',
          '.section-white-backgound-footer{padding-left:5%!important;padding-right:5%!important}',
        '}',
        '@media(max-width:479px){',
          '.quick-stack-4{grid-row-gap:20px!important}',
          '.section-white-backgound-footer{padding-left:16px!important;padding-right:16px!important}',
        '}'
      ].join('')
    },

    /* ── MANUEL (toggleables individuellement, exclus du "Tout ON") ──────── */
    {
      id: 1, cat: 'manual',
      name: 'Cards image — background-size cover',
      where: 'index / expertises / discover-eric → fond des cartes Challenge',
      css: [
        '.layout423_image-wrapper.yellow{background-size:cover!important;background-position:50% 50%!important}',
        '@media(max-width:767px){.layout423_image-wrapper.yellow{background-size:cover!important;background-position:50% 50%!important}}',
        '@media(max-width:479px){.layout423_image-wrapper.yellow{background-size:cover!important;background-position:50% 50%!important}}'
      ].join('')
    },
    {
      id: 5, cat: 'manual',
      name: '.wrap — padding latéral tablette',
      where: 'Toutes pages → contenu qui touche les bords à ≤991px',
      css: '@media(max-width:991px){.wrap{padding-left:5%!important;padding-right:5%!important;box-sizing:border-box!important}}@media(max-width:479px){.wrap{padding-left:16px!important;padding-right:16px!important}}'
    }
  ];

  /* ─── Catégories ────────────────────────────────────────────────────────── */
  var CAT_META = {
    bug:       { label: 'BUG',      color: '#ef4444' },
    mobile:    { label: 'MOBILE',   color: '#f97316' },
    style:     { label: 'STYLE',    color: '#eab308' },
    exclusive: { label: 'EXCLUSIFS — cards mobile (1 seul à la fois)', color: '#a78bfa' },
    manual:    { label: 'MANUEL — toggle individuel uniquement', color: '#64748b' }
  };

  /* ─── State ─────────────────────────────────────────────────────────────── */
  var LS_KEY = 'acoa-fixes-v3';
  var state = {};
  try { state = JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch(e) {}
  function saveState() { try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch(e) {} }

  var injected = {};

  function applyFix(id, active) {
    var fix = null;
    for (var i = 0; i < FIXES.length; i++) { if (FIXES[i].id === id) { fix = FIXES[i]; break; } }
    if (!fix) return;

    if (active) {
      if (fix.mutex) {
        applyFix(fix.mutex, false);
        var mcb = document.querySelector('input[data-fix="' + fix.mutex + '"]');
        if (mcb) mcb.checked = false;
      }
      if (!injected[id] && fix.css) {
        var tag = document.createElement('style');
        tag.id = 'afd-style-' + id;
        tag.textContent = fix.css;
        document.head.appendChild(tag);
        injected[id] = tag;
      }
    } else {
      if (injected[id]) { injected[id].parentNode.removeChild(injected[id]); delete injected[id]; }
    }
    state[id] = active;
    saveState();
  }

  /* ─── DOM helpers ───────────────────────────────────────────────────────── */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function(k) {
        if (k === 'style') { Object.keys(attrs.style).forEach(function(s) { node.style[s] = attrs.style[s]; }); }
        else if (k === 'class') { node.className = attrs[k]; }
        else { node.setAttribute(k, attrs[k]); }
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

  /* ─── Build ─────────────────────────────────────────────────────────────── */
  function buildDashboard() {
    var css = [
      '#afd{position:fixed;bottom:20px;right:20px;z-index:2147483647;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}',
      '#afd-fab{width:48px;height:48px;border-radius:50%;background:#25251e;border:2px solid #ffbd00;color:#ffbd00;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(0,0,0,.5);transition:transform .2s;position:relative;padding:0}',
      '#afd-fab:hover{transform:scale(1.08)}',
      '#afd-badge{position:absolute;top:-4px;right:-4px;background:#ffbd00;color:#25251e;font-size:10px;font-weight:700;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;line-height:1}',
      '#afd-panel{position:absolute;bottom:60px;right:0;width:390px;max-height:82vh;background:#1a1a14;border:1px solid #2e2e22;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,.7);display:none;flex-direction:column;overflow:hidden}',
      '#afd-panel.open{display:flex}',
      '#afd-head{padding:14px 16px 12px;border-bottom:1px solid #2e2e22;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-shrink:0}',
      '#afd-title{color:#e8e8d8;font-weight:700;font-size:13px;letter-spacing:.04em}',
      '#afd-sub{color:#555;font-size:10px;margin-top:2px}',
      '.afd-btn{font-size:10px;padding:4px 9px;border-radius:5px;border:1px solid #2e2e22;background:transparent;color:#777;cursor:pointer;font-family:inherit;transition:border-color .15s,color .15s}',
      '.afd-btn:hover{border-color:#ffbd00;color:#ffbd00}',
      '#afd-body{overflow-y:auto;padding:6px 0 10px;flex:1}',
      '#afd-body::-webkit-scrollbar{width:4px}',
      '#afd-body::-webkit-scrollbar-thumb{background:#2e2e22;border-radius:2px}',
      '.afd-cat{font-size:9px;font-weight:700;letter-spacing:.12em;padding:10px 16px 5px;border-top:1px solid #222;margin-top:4px}',
      '.afd-cat:first-child{border-top:none;margin-top:0;padding-top:4px}',
      '.afd-row{display:flex;align-items:flex-start;gap:10px;padding:7px 16px;transition:background .1s}',
      '.afd-row:hover{background:rgba(255,255,255,.03)}',
      '.afd-excl-row{border-left:2px solid #a78bfa22;padding-left:14px}',
      '.afd-manual-row{border-left:2px solid #64748b22;padding-left:14px}',
      '.afd-num{font-size:10px;font-weight:700;min-width:20px;padding-top:2px}',
      '.afd-info{flex:1;min-width:0}',
      '.afd-name{color:#ddd;font-size:11.5px;line-height:1.4}',
      '.afd-where{color:#444;font-size:10px;margin-top:2px;line-height:1.3}',
      '.afd-hint{font-size:9px;color:#a78bfa;margin-top:3px}',
      '.afd-manual-hint{font-size:9px;color:#64748b;margin-top:3px}',
      '.afd-tog{position:relative;width:36px;height:20px;flex-shrink:0;margin-top:2px}',
      '.afd-tog input{opacity:0;width:0;height:0;position:absolute}',
      '.afd-sl{position:absolute;inset:0;background:#252520;border-radius:20px;cursor:pointer;transition:background .2s}',
      '.afd-sl::before{content:"";position:absolute;left:3px;top:3px;width:14px;height:14px;background:#3a3a30;border-radius:50%;transition:transform .2s,background .2s}',
      '.afd-tog input:checked+.afd-sl{background:rgba(255,189,0,.2)}',
      '.afd-tog input:checked+.afd-sl::before{background:#ffbd00;transform:translateX(16px)}',
      '.afd-tog-excl input:checked+.afd-sl{background:rgba(167,139,250,.2)}',
      '.afd-tog-excl input:checked+.afd-sl::before{background:#a78bfa;transform:translateX(16px)}',
      '.afd-tog-manual input:checked+.afd-sl{background:rgba(100,116,139,.2)}',
      '.afd-tog-manual input:checked+.afd-sl::before{background:#94a3b8;transform:translateX(16px)}',
      '#afd-foot{padding:9px 16px;border-top:1px solid #2e2e22;color:#484840;font-size:10px;flex-shrink:0}',
      '#afd-foot b{color:#ffbd00}'
    ].join('');

    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    var root = el('div', {id: 'afd'});
    var badge = el('span', {id: 'afd-badge'}, [countActive() + '']);
    root.appendChild(el('button', {id: 'afd-fab', title: 'Fix Dashboard'}, [document.createTextNode('⚙'), badge]));

    var panel = el('div', {id: 'afd-panel'});

    panel.appendChild(el('div', {id: 'afd-head'}, [
      el('div', {}, [
        el('div', {id: 'afd-title'}, [document.createTextNode('ACOA — Fix Dashboard')]),
        el('div', {id: 'afd-sub'},   [document.createTextNode(FIXES.length + ' corrections')])
      ]),
      el('div', {style: {display:'flex', gap:'6px'}}, [
        el('button', {'class': 'afd-btn', id: 'afd-btn-on'},  [document.createTextNode('Tout ON')]),
        el('button', {'class': 'afd-btn', id: 'afd-btn-off'}, [document.createTextNode('Tout OFF')])
      ])
    ]));

    var body = el('div', {id: 'afd-body'});
    var currentCat = null;

    FIXES.forEach(function(fix) {
      if (fix.cat !== currentCat) {
        currentCat = fix.cat;
        var meta = CAT_META[currentCat];
        body.appendChild(el('div', {
          'class': 'afd-cat',
          style: { color: meta.color, borderColor: meta.color + '20' }
        }, [document.createTextNode(meta.label)]));
      }

      var meta = CAT_META[fix.cat];
      var isOn = !!state[fix.id];
      var isExcl = fix.cat === 'exclusive';
      var isManual = fix.cat === 'manual';

      var numEl   = el('span', {'class': 'afd-num',  style: {color: meta.color}}, [document.createTextNode('#' + fix.id)]);
      var nameEl  = el('div',  {'class': 'afd-name'}, [document.createTextNode(fix.name)]);
      var whereEl = el('div',  {'class': 'afd-where'}, [document.createTextNode(fix.where)]);
      var infoEl  = el('div',  {'class': 'afd-info'}, [nameEl, whereEl]);

      if (isExcl && fix.mutex) {
        infoEl.appendChild(el('div', {'class': 'afd-hint'}, [document.createTextNode('⇄ exclusif avec #' + fix.mutex)]));
      }
      if (isManual) {
        infoEl.appendChild(el('div', {'class': 'afd-manual-hint'}, [document.createTextNode('↑ toggle manuel uniquement — exclu du "Tout ON"')]));
      }

      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.setAttribute('data-fix', fix.id);
      if (isOn) cb.checked = true;

      var togClass = 'afd-tog' + (isExcl ? ' afd-tog-excl' : '') + (isManual ? ' afd-tog-manual' : '');
      var tog = el('label', {'class': togClass}, [cb, el('span', {'class': 'afd-sl'})]);

      var rowClass = 'afd-row' + (isExcl ? ' afd-excl-row' : '') + (isManual ? ' afd-manual-row' : '');
      body.appendChild(el('div', {'class': rowClass}, [numEl, infoEl, tog]));
    });

    panel.appendChild(body);

    var countSpan = el('b', {id: 'afd-count'}, [document.createTextNode(countActive() + '')]);
    var foot = el('div', {id: 'afd-foot'});
    foot.appendChild(document.createTextNode('Actifs : '));
    foot.appendChild(countSpan);
    foot.appendChild(document.createTextNode(' — état sauvegardé'));
    panel.appendChild(foot);

    root.appendChild(panel);
    document.body.appendChild(root);

    /* ── Events ── */
    root.querySelector('#afd-fab').addEventListener('click', function(e) {
      e.stopPropagation();
      panel.classList.toggle('open');
    });

    body.addEventListener('change', function(e) {
      if (e.target.tagName !== 'INPUT') return;
      var id = parseInt(e.target.getAttribute('data-fix'), 10);
      applyFix(id, e.target.checked);
      var fix = null;
      for (var i = 0; i < FIXES.length; i++) { if (FIXES[i].id === id) { fix = FIXES[i]; break; } }
      if (fix && fix.mutex) {
        var mcb = body.querySelector('input[data-fix="' + fix.mutex + '"]');
        if (mcb) mcb.checked = false;
      }
      refreshBadge();
    });

    root.querySelector('#afd-btn-on').addEventListener('click', function() {
      var usedMutex = {};
      FIXES.forEach(function(f) {
        if (f.cat === 'manual') return; /* skip manual */
        var activate = true;
        if (f.cat === 'exclusive' && f.mutex) {
          if (usedMutex[f.mutex]) { activate = false; }
          else { usedMutex[f.id] = true; }
        }
        applyFix(f.id, activate);
        var cb = body.querySelector('input[data-fix="' + f.id + '"]');
        if (cb) cb.checked = activate;
      });
      refreshBadge();
    });

    root.querySelector('#afd-btn-off').addEventListener('click', function() {
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
    var b = document.getElementById('afd-badge');
    var c = document.getElementById('afd-count');
    if (b) b.textContent = n;
    if (c) c.textContent = n;
  }

  function boot() {
    buildDashboard();
    FIXES.forEach(function(f) { if (state[f.id]) applyFix(f.id, true); });
  }

  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', boot); }
  else { boot(); }

})();
