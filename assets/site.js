(() => {
  const ensureStylesheet = (href, marker) => {
    if (document.querySelector(`link[${marker}]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute(marker, 'true');
    document.head.appendChild(link);
  };

  ensureStylesheet('/assets/typography.css', 'data-floreix-typography');
  ensureStylesheet('/assets/brand.css', 'data-floreix-brand');

  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-main-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  document.querySelectorAll('[data-dropdown-toggle]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 900px)').matches) {
        e.preventDefault();
        btn.closest('.nav-item')?.classList.toggle('open');
      }
    });
  });

  document.querySelectorAll('[data-lang-target]').forEach(link => {
    link.addEventListener('click', () => localStorage.setItem('floreix-lang', link.dataset.lang));
  });

  const path = location.pathname.replace(/\/index\.html$/, '/');
  if (document.documentElement.lang === 'ca' && (path === '/' || path === '') && !document.querySelector('script[data-floreix-live]')) {
    const live = document.createElement('script');
    live.src = '/assets/live-page.js';
    live.dataset.floreixLive = 'true';
    document.body.appendChild(live);
  }
})();
