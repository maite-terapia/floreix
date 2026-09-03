(() => {
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

  const current = location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('[data-lang-target]').forEach(link => {
    link.addEventListener('click', () => localStorage.setItem('floreix-lang', link.dataset.lang));
  });

  // If a visitor explicitly selected a language previously and then lands on the
  // root, keep the preference without breaking equivalent-page navigation.
  if ((current === '/' || current === '') && localStorage.getItem('floreix-lang') === 'es') {
    const es = document.querySelector('[data-lang-target][data-lang="es"]');
    if (es && !document.documentElement.lang.startsWith('es')) {
      // Do not force a redirect during editing/preview. The selector remains the
      // source of truth, matching the behavior requested for the final site.
    }
  }
})();
