(() => {
  if (!document.querySelector('link[data-floreix-typography]')) {
    const typography = document.createElement('link');
    typography.rel = 'stylesheet';
    typography.href = '/assets/typography.css';
    typography.dataset.floreixTypography = 'true';
    document.head.appendChild(typography);
  }

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
})();
