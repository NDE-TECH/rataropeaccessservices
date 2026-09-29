// ========================================
// IAIS STATIC SITE INTERACTIONS — V3
// Pure JavaScript. No framework/build step.
// ========================================
(() => {
  'use strict';

  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.menu');
  const links = document.querySelector('.links');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ========================================
  // STICKY NAVIGATION + MOBILE MENU
  // ========================================
  const syncNav = () => nav?.classList.toggle('is-scrolled', window.scrollY > 12);
  syncNav();
  window.addEventListener('scroll', syncNav, { passive: true });

  if (menu && links) {
    menu.removeAttribute('onclick');
    menu.setAttribute('aria-expanded', 'false');
    menu.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('is-open');
      menu.setAttribute('aria-expanded', 'false');
    }));
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        links.classList.remove('is-open');
        menu.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ========================================
  // REUSABLE INLINE ICON SYSTEM
  // ========================================
  const icons = {
    scan:'<svg viewBox="0 0 24 24"><path d="M3 17V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M6 14c2-5 4 4 7-2s4 3 5-1"/></svg>',
    structure:'<svg viewBox="0 0 24 24"><path d="M5 21 10 3h4l5 18M7 15h10M8.5 10h7M10 6h4"/><path d="m7 18 10-8M8 12l8 7"/></svg>',
    tank:'<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v14c0 1.7 14 1.7 14 0V5M5 12c0 1.7 14 1.7 14 0"/></svg>',
    offshore:'<svg viewBox="0 0 24 24"><path d="M9 3 5 18h8L11 3zM15 8h5v10h-5zM3 21c2-1.5 4 1.5 6 0s4 1.5 6 0 4 1.5 6 0"/></svg>',
    wrench:'<svg viewBox="0 0 24 24"><path d="M14.5 6.5a4 4 0 0 0-5-5L12 4 9 7 6.5 4.5a4 4 0 0 0 5 5L19 17l2-2z"/><path d="m5 19 5-5"/></svg>',
    coating:'<svg viewBox="0 0 24 24"><path d="m4 15 8-8 5 5-8 8H4zM10 9l5 5M18 7l3-3"/><path d="M19 11h2M18 14l2 1"/></svg>',
    cleaning:'<svg viewBox="0 0 24 24"><path d="m4 19 8-10M12 9l5-4M17 5c2 2 3 3 4 5M17 7c1 3 1.5 4 1.5 6"/><path d="M7 21h8"/></svg>',
    electrical:'<svg viewBox="0 0 24 24"><path d="m13 2-7 11h6l-1 9 7-12h-6z"/></svg>',
    wind:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="1.5"/><path d="M12 9.5V22M12 8 5 4M12 8l6-4M12 8l-1 7"/></svg>',
    facade:'<svg viewBox="0 0 24 24"><path d="M4 21V3h12v18M8 7h2M12 7h1M8 11h2M12 11h1M8 15h2M12 15h1M17 6h3v15"/></svg>',
    confined:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3"/></svg>',
    rescue:'<svg viewBox="0 0 24 24"><path d="M12 2 20 5v6c0 5-3.4 8.7-8 11-4.6-2.3-8-6-8-11V5z"/><path d="M12 7v8M8 11h8"/></svg>',
    factory:'<svg viewBox="0 0 24 24"><path d="M3 21V10l6 4v-4l6 4V6h4v15zM16 3h3v3M7 18h2M12 18h2"/></svg>',
    droplet:'<svg viewBox="0 0 24 24"><path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/></svg>',
    power:'<svg viewBox="0 0 24 24"><path d="M13 2 6 13h6l-1 9 7-12h-6z"/></svg>',
    ship:'<svg viewBox="0 0 24 24"><path d="m4 13 3-7h10l3 7-8 5zM9 6V3h6v3M3 20c2-1 4 1 6 0s4 1 6 0 4 1 6 0"/></svg>',
    leaf:'<svg viewBox="0 0 24 24"><path d="M20 4C11 4 5 8 5 14c0 3 2 5 5 5 6 0 10-7 10-15Z"/><path d="M4 21c3-6 7-9 12-12"/></svg>',
    gear:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/></svg>',
    bridge:'<svg viewBox="0 0 24 24"><path d="M3 18h18M5 18V8M19 18V8M5 10c4 0 5-5 7-5s3 5 7 5M8 18v-5M12 18v-7M16 18v-5"/></svg>',
    phone:'<svg viewBox="0 0 24 24"><path d="M7 3 4 5c0 8 7 15 15 15l2-3-5-3-2 2c-3-1-5-3-6-6l2-2z"/></svg>',
    mail:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    location:'<svg viewBox="0 0 24 24"><path d="M12 22s7-7 7-13a7 7 0 1 0-14 0c0 6 7 13 7 13Z"/><circle cx="12" cy="9" r="2"/></svg>',
    globe:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>',
    people:'<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 21c0-5 3-8 6-8s6 3 6 8M14 15c4-1 7 1 7 6"/></svg>',
    check:'<svg viewBox="0 0 24 24"><path d="m4 12 5 5L20 6"/></svg>',
    clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></svg>',
    map:'<svg viewBox="0 0 24 24"><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3zM9 3v15M15 6v15"/></svg>'
  };

  const iconForText = text => {
    const t = text.toLowerCase();
    // Industry/service identity first. Generic words such as “inspection” must not
    // make every card look identical.
    if (/oil|gas|upstream|midstream/.test(t)) return 'droplet';
    if (/refin|petrochemical|manufactur|process industr/.test(t)) return 'factory';
    if (/power generation|electrical|instrument/.test(t)) return 'electrical';
    if (/offshore|marine|ship|port|terminal|fps[oa]|rig/.test(t)) return 'offshore';
    if (/wind|renewable/.test(t)) return 'wind';
    if (/façade|facade|civil|building|infrastructure|bridge/.test(t)) return 'facade';
    if (/tank|vessel|piping|process asset/.test(t)) return 'tank';
    if (/structur|tower|chimney|stack/.test(t)) return 'structure';
    if (/maintenance|mechanical|repair|bolting/.test(t)) return 'wrench';
    if (/coat|surface preparation|paint/.test(t)) return 'coating';
    if (/clean|decontamination/.test(t)) return 'cleaning';
    if (/confined/.test(t)) return 'confined';
    if (/rescue|standby|safety|hse/.test(t)) return 'rescue';
    if (/email|mail/.test(t)) return 'mail';
    if (/phone|telephone|whatsapp|call/.test(t)) return 'phone';
    if (/location|address|office/.test(t)) return 'location';
    if (/website|global|world/.test(t)) return 'globe';
    if (/team|personnel|technician|competenc/.test(t)) return 'people';
    if (/ndt|ultrasonic|inspection|scan|testing/.test(t)) return 'scan';
    return 'gear';
  };

  const makeIcon = name => {
    const span = document.createElement('span');
    span.className = 'ui-icon';
    span.setAttribute('aria-hidden', 'true');
    span.innerHTML = icons[name] || icons.gear;
    return span;
  };

  // Headed cards / panels
  document.querySelectorAll('.card,.service,.method,.asset,.deliver,.qual,.detail,.benefit,.assurance-card').forEach(el => {
    const heading = el.querySelector('h3,strong');
    if (!heading || heading.closest('.icon-heading')) return;
    const wrap = document.createElement('div');
    wrap.className = 'icon-heading';
    heading.parentNode.insertBefore(wrap, heading);
    wrap.append(makeIcon(iconForText(heading.textContent)));
    wrap.append(heading);
    el.classList.add('has-ui-icon');
  });

  // Numbered homepage feature circles become semantic industrial icons
  document.querySelectorAll('.feature').forEach(el => {
    const h3 = el.querySelector('h3');
    const badge = el.querySelector('.icon');
    if (!h3 || !badge) return;
    badge.classList.add('ui-icon');
    badge.innerHTML = icons[iconForText(h3.textContent)] || icons.gear;
    badge.setAttribute('aria-hidden', 'true');
  });

  // Compact chips / industries / checklist items
  document.querySelectorAll('.industry,.sector,.check').forEach(el => {
    if (el.querySelector('.ui-icon')) return;
    el.prepend(makeIcon(iconForText(el.textContent)));
    el.classList.add('has-ui-icon');
  });

  // Contact items
  document.querySelectorAll('.contact-item').forEach(el => {
    if (el.querySelector('.ui-icon')) return;
    el.prepend(makeIcon(iconForText(el.textContent)));
    el.classList.add('has-ui-icon');
  });

  // Footer links
  document.querySelectorAll('.footer a').forEach(a => {
    if (a.querySelector('.ui-icon')) return;
    const href = a.getAttribute('href') || '';
    let type = '';
    if (href.startsWith('tel:')) type = 'phone';
    else if (href.startsWith('mailto:')) type = 'mail';
    else if (/maps|contact/.test(href)) type = 'location';
    else if (/^https?:/.test(href)) type = 'globe';
    if (type) {
      a.prepend(makeIcon(type));
      a.classList.add('footer-icon-link');
    }
  });

  // ========================================
  // HOME SERVICE CARD DEEP LINKS
  // ========================================
  const serviceRoutes = {
    'rope access ndt':'rope-access-ndt-inspection/',
    'structural inspection':'structural-inspection-rope-access/',
    'tanks, vessels & piping':'tanks-vessels-piping-inspection/',
    'offshore & marine':'offshore-marine-rope-access/',
    'mechanical maintenance':'industrial-maintenance-at-height/',
    'surface preparation & coating':'surface-preparation-protective-coating/',
    'cleaning & decontamination':'industrial-cleaning-rope-access/',
    'electrical & instrumentation':'electrical-instrumentation-rope-access/',
    'wind energy services':'wind-turbine-rope-access-services/',
    'civil & building access':'civil-facade-rope-access-services/',
    'confined space support':'confined-space-rope-access-support/',
    'rescue & standby teams':'rope-access-rescue-standby/'
  };
  if (document.body.dataset.page === 'home') {
    document.querySelectorAll('.services .card').forEach(card => {
      const h3 = card.querySelector('h3');
      if (!h3) return;
      const route = serviceRoutes[h3.textContent.trim().toLowerCase()];
      if (!route || card.querySelector('.service-more')) return;
      const a = document.createElement('a');
      a.className = 'service-more';
      a.href = route;
      a.textContent = 'Explore service →';
      a.style.cssText = 'display:inline-flex;margin-top:12px;font-weight:850;color:#07569f';
      card.append(a);
    });
  }

  // ========================================
  // SCROLL REVEAL — VARIED DIRECTIONS
  // ========================================
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const sections = [...document.querySelectorAll('main > section:not(.hero):not(.page-hero)')];
    const variants = ['reveal-up','reveal-left','reveal-scale','reveal-right'];
    sections.forEach((section, i) => section.classList.add('js-reveal', variants[i % variants.length]));
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -6% 0px' });
    sections.forEach(section => io.observe(section));
  }

  // ========================================
  // HERO PARALLAX + POINTER GLOW
  // ========================================
  const hero = document.querySelector('.hero,.page-hero');
  if (hero && !reduceMotion) {
    let ticking = false;
    const updateParallax = () => {
      const shift = Math.max(-26, Math.min(26, window.scrollY * 0.055));
      hero.style.setProperty('--hero-shift', `${shift}px`);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--hero-x', `${((e.clientX-r.left)/r.width)*100}%`);
      hero.style.setProperty('--hero-y', `${((e.clientY-r.top)/r.height)*100}%`);
    });
  }

  // ========================================
  // CARD SPOTLIGHT FOLLOWER
  // ========================================
  if (!reduceMotion) {
    document.querySelectorAll('.card,.service,.office-card,.method,.asset,.deliver').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${e.clientX-r.left}px`);
        card.style.setProperty('--spot-y', `${e.clientY-r.top}px`);
      });
    });
  }
})();
