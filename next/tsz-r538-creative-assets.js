/* TSZ LP R553: safe locale-selector discovery and synchronized artwork re-render; preserves R547 locale normalization and R546 recovery.
   The browser never calls Apple APIs. Manifests and approved artwork stay local. */
(() => {
  'use strict';
  const script = document.currentScript;
  if (!script || !script.src) return;
  const rootURL = new URL('./assets/appstore-creatives/', script.src);
  const route = location.pathname.match(/\/apps\/(\d{8,15})(?:\/|$)/);
  if (!route) return;
  const appId = route[1];
  const localURL = new URL(appId + '/', rootURL);
  // Match actual language controls, not an unrelated first <select> with language in its name.
  const LANGUAGE_SELECTOR = '#p19-language, #p199-language, #locale-select, select[name="locale"], select[name="language"], select[id*="locale" i], select[id*="language" i], select[data-locale-select]';
  const localeKey = value => String(value || '').trim().replace(/_/g, '-').toLowerCase();
  const isLocaleCode = value => /^[a-z]{2,3}(?:[-_][a-z0-9]{2,8}){0,2}$/i.test(String(value || '').trim());
  const candidateLocaleOptions = el => el && el.tagName === 'SELECT'
    ? Array.from(el.options).filter(o => isLocaleCode(o.value) && !o.disabled)
    : [];
  // R553: only a control that visitors can actually use may drive LP artwork.
  // Secondary hidden demo selectors must not silently change the main LP locale.
  // visibleTree is declared below and available by the time start() invokes this.
  const visibleLocaleControl = el => {
    if (!el || el.tagName !== 'SELECT' || !visibleTree(el)) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 1 && rect.height > 1;
  };
  const findLanguageControl = () => {
    const controls = Array.from(document.querySelectorAll(LANGUAGE_SELECTOR)).filter(visibleLocaleControl);
    // On mixed pages, #p199-language is the primary 50-locale art selector.
    // Do NOT promote a 2/3-locale demo selector into an invented 50-locale UI.
    const primary50 = controls.find(el => el.id === 'p199-language' && candidateLocaleOptions(el).length === 50);
    return primary50 || controls.find(el => candidateLocaleOptions(el).length >= 2) ||
      controls.find(el => candidateLocaleOptions(el).length === 1) || null;
  };
  const currentLocale = () => {
    const el = findLanguageControl();
    const value = el && isLocaleCode(el.value) ? el.value : '';
    return value || document.documentElement.lang || 'en-US';
  };
  const selectedMedia = (manifest, kind) => {
    const placements = manifest && manifest.placements && manifest.placements[kind];
    if (!placements || typeof placements !== 'object' || Array.isArray(placements)) return null;
    const normalized = localeKey(currentLocale());
    // Apple locales may use different casing or underscores. Exact locale first;
    // only then language-only fallback, and finally the verified default artwork.
    const localized = Object.keys(placements).find(key => localeKey(key) === normalized);
    if (localized) return placements[localized];
    const language = normalized.split('-')[0];
    const simple = Object.keys(placements).find(key => localeKey(key) === language);
    return (simple ? placements[simple] : null) || placements.default || null;
  };
  const safeMedia = entry => {
    if (!entry || typeof entry.file !== 'string' ||
        !/^(?:header|search)-[0-9a-f-]{8,80}\.(?:png|jpe?g)$/.test(entry.file)) return null;
    if (!Number.isInteger(entry.width) || !Number.isInteger(entry.height) ||
        entry.width <= 0 || entry.height <= 0) return null;
    return { url: new URL(entry.file, localURL).href, width: entry.width,
      height: entry.height, key: entry.file };
  };
  const visibleTree = node => {
    if (!(node instanceof Element) || !node.isConnected) return false;
    for (let el = node; el && el instanceof Element; el = el.parentElement) {
      if (el.hidden) return false;
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden' ||
          style.visibility === 'collapse' || style.contentVisibility === 'hidden' ||
          Number(style.opacity) === 0) return false;
    }
    return true;
  };
  const usableAnchor = el => !!el && visibleTree(el) &&
    el.getBoundingClientRect().width > 2;
  const makeImage = (media, className, kind) => {
    const img = document.createElement('img');
    img.src = media.url;
    img.alt = ''; // Decorative art: LP localized copy remains the accessible description.
    img.width = media.width;
    img.height = media.height;
    img.decoding = 'async';
    img.loading = kind === 'header' ? 'eager' : 'lazy';
    img.draggable = false;
    img.className = className;
    img.dataset.tszAcRole = kind;
    img.addEventListener('load', () => { img.dataset.tszAcLoaded = img.naturalWidth ? 'true' : 'false'; }, { once: true });
    img.addEventListener('error', () => { img.dataset.tszAcLoaded = 'error'; }, { once: true });
    return img;
  };
  const activeRoot = () => {
    const candidates = Array.from(document.querySelectorAll('main, [role="main"], #app, #content'));
    return candidates.find(usableAnchor) || (usableAnchor(document.body) ? document.body : null);
  };
  const anchorFor = (kind, root) => {
    if (!root) return null;
    const selectors = kind === 'header'
      ? ['.up45-hero', '.p19-hero', '.app-hero', '.hero', 'header', 'section:first-of-type']
      : ['.up45-features', '#tsz-promptdock-feature', '#screens', '#features', '.features', 'section:nth-of-type(2)'];
    for (const selector of selectors) {
      const candidates = Array.from(root.querySelectorAll(selector));
      const match = candidates.find(el => usableAnchor(el) && el.parentElement &&
        visibleTree(el.parentElement));
      if (match) return match;
    }
    return null;
  };
  const removeSlot = kind => {
    document.querySelectorAll('[data-tsz-ac-slot="' + kind + '"]').forEach(fig => fig.remove());
  };
  const placeFigure = (media, kind) => {
    const root = activeRoot();
    if (!root) return;
    const selector = '[data-tsz-ac-slot="' + kind + '"]';
    let fig = document.querySelector(selector);
    if (fig && (fig.dataset.tszAcFile !== media.key ||
        fig.querySelectorAll('img.tsz-ac-showcase-img').length !== 1)) {
      fig.remove(); fig = null;
    }
    if (!fig) {
      fig = document.createElement('figure');
      fig.className = 'tsz-ac-showcase tsz-ac-showcase-' + kind;
      fig.setAttribute('aria-hidden', 'true');
      fig.dataset.tszAcKind = kind;
      fig.dataset.tszAcSlot = kind;
      fig.dataset.tszAcFile = media.key;
      const img = makeImage(media, 'tsz-ac-showcase-img', kind);
      img.addEventListener('error', () => fig.remove(), { once: true });
      fig.append(img);
    }
    // If an older page version put the figure in a hidden tab/section, move it
    // outside the hidden ancestor. Never override that tab's own visibility.
    const anchor = anchorFor(kind, root);
    const targetParent = anchor ? anchor.parentElement : root;
    if (!visibleTree(targetParent)) return;
    const shouldReposition = !visibleTree(fig) || fig.parentElement !== targetParent ||
      (anchor && (kind === 'header' ? anchor.nextElementSibling !== fig : fig.nextElementSibling !== anchor));
    if (shouldReposition) {
      if (anchor && kind === 'header') anchor.after(fig);
      else if (anchor) anchor.before(fig);
      else if (kind === 'header') root.prepend(fig);
      else root.append(fig);
    }
  };
  const restoreUnitVisual = visual => {
    if (!visual) return;
    visual.querySelectorAll('.tsz-ac-hero-img').forEach(n => n.remove());
    visual.classList.remove('tsz-ac-visual-ready');
    delete visual.dataset.tszAcPending;
    delete visual.dataset.tszAcAsset;
    delete visual.dataset.tszAcDesired;
  };
  const updateUnitVisual = (visual, media) => {
    const desired = media ? media.key : '';
    if (visual.dataset.tszAcDesired !== desired) {
      restoreUnitVisual(visual);
      visual.dataset.tszAcDesired = desired;
    }
    if (!media || visual.dataset.tszAcAsset === desired || visual.dataset.tszAcPending === desired) return;
    visual.dataset.tszAcPending = desired;
    const img = makeImage(media, 'tsz-ac-hero-img', 'header');
    img.addEventListener('load', () => {
      if (visual.dataset.tszAcDesired !== desired || !img.naturalWidth) return;
      visual.querySelectorAll('.tsz-ac-hero-img').forEach(n => n.remove());
      visual.prepend(img);
      visual.dataset.tszAcAsset = desired;
      delete visual.dataset.tszAcPending;
      visual.classList.add('tsz-ac-visual-ready');
    }, { once: true });
    img.addEventListener('error', () => {
      if (visual.dataset.tszAcDesired === desired) delete visual.dataset.tszAcPending;
    }, { once: true });
  };

  // R558: display every proven, competing APPROVED+ACTIVE artwork in a separate
  // gallery. Do not arbitrarily promote any candidate into the single-image hero.
  // Legacy placements and all non-variant LPs retain their old rendering path.
  const variantMediaFor = (manifest, kind) => {
    const slots = manifest && manifest.approvedVariants && manifest.approvedVariants[kind];
    if (!slots || typeof slots !== 'object' || Array.isArray(slots)) return [];
    const lang = localeKey(currentLocale());
    let key = Object.keys(slots).find(k => localeKey(k) === lang);
    if (!key) {
      const group = lang.split('-')[0];
      const candidates = Object.keys(slots).filter(k => localeKey(k).split('-')[0] === group);
      // Regional alias is safe only when exactly one Apple locale is known.
      if (candidates.length === 1) key = candidates[0];
    }
    if (!key || !Array.isArray(slots[key]) || slots[key].length < 2 || slots[key].length > 8) return [];
    const entries = slots[key].map(safeMedia);
    if (entries.some(x => !x) || new Set(entries.map(x => x.key)).size !== entries.length) return [];
    return entries;
  };
  const removeVariantGallery = () => {
    document.querySelectorAll('[data-tsz-ac-variant-gallery]').forEach(node => node.remove());
  };
  const renderVariantGallery = manifest => {
    const rows = [];
    for (const kind of ['header', 'search']) {
      for (const media of variantMediaFor(manifest, kind)) rows.push({ kind, media });
    }
    if (!rows.length) { removeVariantGallery(); return; }
    const root = activeRoot();
    if (!root) return;
    const key = rows.map(x => x.kind + ':' + x.media.key).join('|');
    let fig = document.querySelector('[data-tsz-ac-variant-gallery]');
    if (fig && fig.dataset.tszAcVariantKey !== key) { fig.remove(); fig = null; }
    if (!fig) {
      fig = document.createElement('figure');
      fig.className = 'tsz-ac-variant-gallery';
      fig.dataset.tszAcVariantGallery = 'true';
      fig.dataset.tszAcVariantKey = key;
      // The Apple-approved header and search creative sets serve different
      // purposes. Group and label them instead of mixing all four as unnamed
      // decorative images. Labels are intentionally not product claims.
      fig.setAttribute('role', 'region');
      fig.setAttribute('aria-label', 'App Store creative previews');
      for (const kind of ['header', 'search']) {
        const groupRows = rows.filter(row => row.kind === kind);
        if (!groupRows.length) continue;
        const group = document.createElement('div');
        group.className = 'tsz-ac-variant-section';
        group.dataset.tszAcVariantSection = kind;
        const heading = document.createElement('p');
        heading.className = 'tsz-ac-variant-title';
        heading.textContent = kind === 'header' ? 'App Store header' : 'App Store search results';
        group.appendChild(heading);
        const grid = document.createElement('div');
        grid.className = 'tsz-ac-variant-grid';
        groupRows.forEach(({media}, index) => {
          const img = makeImage(media, 'tsz-ac-variant-image', 'search');
          // Independent QA role: do not confuse variants with canonical slots.
          delete img.dataset.tszAcRole;
          img.dataset.tszAcVariantRole = kind;
          img.dataset.tszAcVariantFile = media.key;
          img.alt = heading.textContent + ', option ' + (index + 1) + ' of ' + groupRows.length;
          grid.appendChild(img);
        });
        group.appendChild(grid);
        fig.appendChild(group);
      }
    }
    let style = document.getElementById('tsz-ac-variant-style');
    if (!style) {
      style = document.createElement('style');
      style.id = 'tsz-ac-variant-style';
      style.textContent = '.tsz-ac-variant-gallery{display:block;width:min(100%,980px);max-width:100%;margin:1.25rem auto;padding:0;box-sizing:border-box}' +
        '.tsz-ac-variant-section{margin:0 0 1.4rem;max-width:100%}' +
        '.tsz-ac-variant-title{font:600 clamp(.85rem,2.6vw,1rem)/1.4 system-ui,sans-serif;letter-spacing:.01em;margin:0 0 .55rem;color:inherit}' +
        '.tsz-ac-variant-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:12px;align-items:center;max-width:100%}' +
        '.tsz-ac-variant-image{display:block;width:100%;max-width:100%;height:auto;max-height:310px;object-fit:contain;border-radius:12px;box-sizing:border-box;box-shadow:0 2px 12px rgba(0,0,0,.11)}';
      document.head.appendChild(style);
    }
    const anchor = anchorFor('search', root) || anchorFor('header', root);
    const parent = anchor && visibleTree(anchor.parentElement) ? anchor.parentElement : root;
    if (visibleTree(parent) && fig.parentElement !== parent) {
      if (anchor && parent === anchor.parentElement) anchor.after(fig);
      else parent.appendChild(fig);
    }
  };

  const render = manifest => {
    // This metadata is diagnostic, not a claim that all 50 locales are supported.
    document.documentElement.dataset.tszAcLocale = currentLocale();
    const header = safeMedia(selectedMedia(manifest, 'header'));
    const search = safeMedia(selectedMedia(manifest, 'search'));
    const visual = document.querySelector('.up45-hero .up45-visual');
    if (header) {
      // Unit Price's native visual is preferred *only if actually displayed*.
      // On mobile, a responsive hidden visual must not swallow the header image.
      if (visual && usableAnchor(visual)) {
        updateUnitVisual(visual, header);
        removeSlot('header');
      } else {
        if (visual) restoreUnitVisual(visual);
        placeFigure(header, 'header');
      }
    } else {
      if (visual) restoreUnitVisual(visual);
      removeSlot('header');
    }
    if (search) placeFigure(search, 'search');
    else removeSlot('search');
    renderVariantGallery(manifest);
  };
  const start = async () => {
    // A single transient localhost/static-host failure must not permanently hide artwork.
    // A bounded retry never changes the manifest and never contacts Apple APIs.
    document.documentElement.dataset.tszAcState = 'loading';
    try {
      let manifest = null;
      const delays = [0, 350, 950, 1900];
      for (let attempt = 0; attempt < delays.length; attempt++) {
        if (delays[attempt]) await new Promise(resolve => setTimeout(resolve, delays[attempt]));
        try {
          const response = await fetch(new URL('manifest.json', localURL),
            { cache: 'no-store', credentials: 'omit' });
          if (!response.ok) continue;
          const candidate = await response.json();
          if (String(candidate.appId) === appId && candidate.schema === 1) {
            manifest = candidate; break;
          }
          // Invalid manifest must fail closed, not be repeatedly requested.
          document.documentElement.dataset.tszAcState = 'invalid-manifest';
          return;
        } catch (_) { /* Retry transient local/server fetch errors. */ }
      }
      if (!manifest) {
        document.documentElement.dataset.tszAcState = 'manifest-unavailable';
        return;
      }
      document.documentElement.dataset.tszAcState = 'ready';
      let scheduled = false;
      const rerender = () => {
        if (scheduled) return;
        scheduled = true;
        setTimeout(() => { scheduled = false; render(manifest); }, 60);
      };
      render(manifest);
      // Late story hydration can replace the whole main node without a mutation
      // useful to observers installed after initialization. Bounded recovery passes.
      for (const delay of [700, 1900, 4200, 8200]) setTimeout(rerender, delay);
      window.addEventListener('pageshow', rerender, { passive: true });
      window.addEventListener('load', rerender, { once: true });
      document.addEventListener('tsz-locale-changed', rerender);
      document.addEventListener('tsz:locale-change', rerender);
      window.addEventListener('tsz:locale-change', rerender);
      // Delegation survives a language selector being replaced during LP rerenders.
      document.addEventListener('change', event => {
        if (event.target?.matches?.(LANGUAGE_SELECTOR)) rerender();
      });
      document.addEventListener('input', event => {
        if (event.target?.matches?.(LANGUAGE_SELECTOR)) rerender();
      });
      window.addEventListener('resize', rerender, { passive: true });
      // Some LPs rebuild hero/feature DOM after initial page load or locale switch.
      // React only to external changes; mutations made by our figures are ignored.
      const observer = new MutationObserver(records => {
        const external = records.some(record => {
          if (record.type === 'attributes') {
            const target = record.target;
            return !(target instanceof Element &&
              (target.closest('.tsz-ac-showcase') || target.classList.contains('tsz-ac-hero-img')));
          }
          return Array.from(record.addedNodes).concat(Array.from(record.removedNodes)).some(node =>
            node.nodeType === 1 && !(node.matches?.('.tsz-ac-showcase, .tsz-ac-hero-img') ||
              node.closest?.('.tsz-ac-showcase')));
        });
        if (external) rerender();
      });
      observer.observe(document.documentElement, {subtree: true, childList: true,
        attributes: true, attributeFilter: ['hidden', 'class', 'style', 'lang']});
    } catch (_) { document.documentElement.dataset.tszAcState = 'boot-error'; /* Existing LP preserved. */ }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
