(() => {
  const mount = document.querySelector('[data-live-page]');
  if (!mount) return;
  const slug = mount.dataset.livePage;
  const endpoint = `https://floreix.com/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=id,title,content,link`;

  const addCss = href => {
    if ([...document.styleSheets].some(s => s.href === href)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  fetch(endpoint, { mode: 'cors', credentials: 'omit' })
    .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
    .then(pages => {
      if (!pages?.length || !pages[0]?.content?.rendered?.trim()) return;
      const page = pages[0];
      addCss('https://floreix.com/wp-includes/css/dist/block-library/style.min.css');
      addCss('https://floreix.com/wp-content/themes/astra/assets/css/minified/main.min.css');
      addCss('https://floreix.com/wp-content/plugins/elementor/assets/css/frontend.min.css');
      addCss(`https://floreix.com/wp-content/uploads/elementor/css/post-${page.id}.css`);
      mount.innerHTML = page.content.rendered;
      mount.dataset.liveLoaded = 'true';

      // Keep navigation inside the replica instead of sending visitors back to
      // the source WordPress installation.
      mount.querySelectorAll('a[href^="https://floreix.com"]').forEach(a => {
        try {
          const u = new URL(a.href);
          a.href = u.pathname + u.search + u.hash;
        } catch (_) {}
      });
    })
    .catch(() => {
      // The static fallback remains visible. It is intentionally sourced only
      // from verified Floreix content, never from placeholder copy.
    });
})();
