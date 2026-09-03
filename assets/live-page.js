(() => {
  let mount = document.querySelector('[data-live-page]');
  let key = mount?.dataset.livePage || null;
  const path = location.pathname.replace(/\/index\.html$/, '/');
  if (!mount && document.documentElement.lang === 'ca' && (path === '/' || path === '')) {
    mount = document.querySelector('main');
    key = '__home__';
  }
  if (!mount || !key) return;

  const fields = '_fields=id,title,content,link';
  const endpoint = key === '__home__'
    ? `https://floreix.com/wp-json/wp/v2/pages?per_page=100&${fields}`
    : `https://floreix.com/wp-json/wp/v2/pages?slug=${encodeURIComponent(key)}&${fields}`;

  const addCss = href => {
    if ([...document.querySelectorAll('link[rel="stylesheet"]')].some(l => l.href === href)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  const pickPage = pages => {
    if (!Array.isArray(pages) || !pages.length) return null;
    if (key !== '__home__') return pages[0];
    return pages.find(page => {
      try {
        const u = new URL(page.link);
        return u.hostname.replace(/^www\./, '') === 'floreix.com' && u.pathname === '/';
      } catch (_) { return false; }
    }) || null;
  };

  fetch(endpoint, { mode: 'cors', credentials: 'omit' })
    .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
    .then(pages => {
      const page = pickPage(pages);
      if (!page?.content?.rendered?.trim()) return;
      addCss('https://floreix.com/wp-includes/css/dist/block-library/style.min.css');
      addCss('https://floreix.com/wp-content/themes/astra/assets/css/minified/main.min.css');
      addCss('https://floreix.com/wp-content/plugins/elementor/assets/css/frontend.min.css');
      addCss(`https://floreix.com/wp-content/uploads/elementor/css/post-${page.id}.css`);
      mount.innerHTML = page.content.rendered;
      mount.dataset.liveLoaded = 'true';
      mount.querySelectorAll('a[href^="https://floreix.com"]').forEach(a => {
        try {
          const u = new URL(a.href);
          a.href = u.pathname + u.search + u.hash;
        } catch (_) {}
      });
    })
    .catch(() => {});
})();
