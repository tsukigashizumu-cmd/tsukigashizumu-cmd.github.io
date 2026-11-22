/* TSZ LP R538: App Store-approved creative assets. No network request to Apple from browsers.
   The optional static manifest is generated on the owner's Mac; no manifest = no DOM changes. */
(() => {
  'use strict';
  const script = document.currentScript;
  if (!script || !script.src) return;
  const rootURL = new URL('./assets/appstore-creatives/', script.src);
  const route = location.pathname.match(/\/apps\/(\d{8,15})(?:\/|$)/);
  if (!route) return;
  const appId = route[1];
  const localURL = new URL(appId + '/', rootURL);
  const langControl = () => document.querySelector('#p19-language, #p199-language, #locale-select');
  const locale = () => {
    const el = langControl();
    return (el && el.value) || document.documentElement.lang || 'en-US';
  };
  const mediaFor = (manifest, kind) => {
    const all = manifest && manifest.placements && manifest.placements[kind];
    if (!all || typeof all !== 'object') return null;
    const key = locale();
    const short = key.split('-')[0].toLowerCase();
    return all[key] || all[Object.keys(all).find(k => k.toLowerCase() === key.toLowerCase())] ||
      all[short] || all.default || null;
  };
  const safeMedia = (entry) => {
    if (!entry || typeof entry.file !== 'string' || !/^(?:header|search)-[0-9a-f-]{8,80}\.(?:png|jpe?g)$/.test(entry.file)) return null;
    if (!Number.isInteger(entry.width) || !Number.isInteger(entry.height) || entry.width <= 0 || entry.height <= 0) return null;
    return { url: new URL(entry.file, localURL).href, width: entry.width, height: entry.height, key: entry.file };
  };
  const makeImage = (media, eager) => {
    const img = document.createElement('img');
    img.src = media.url;
    img.alt = ''; // Decorative creative art; existing localized text describes the app.
    img.width = media.width;
    img.height = media.height;
    img.decoding = 'async';
    img.loading = eager ? 'eager' : 'lazy';
    img.draggable = false;
    img.className = eager ? 'tsz-ac-hero-img' : 'tsz-ac-showcase-img';
    return img;
  };
  const createFigure = (media, kind, anchor, position, slot) => {
    if (!anchor) return;
    const selector = '[data-tsz-ac-slot="' + slot + '"]';
    let fig = document.querySelector(selector);
    if (fig && fig.dataset.tszAcFile !== media.key) { fig.remove(); fig = null; }
    if (!fig) {
      fig = document.createElement('figure');
      fig.className = 'tsz-ac-showcase tsz-ac-showcase-' + kind;
      fig.setAttribute('aria-hidden', 'true');
      fig.dataset.tszAcKind = kind;
      fig.dataset.tszAcSlot = slot;
      fig.dataset.tszAcFile = media.key;
      const img = makeImage(media, kind === 'header');
      img.addEventListener('error', () => fig.remove(), { once: true });
      fig.append(img);
    }
    // For dynamically built LPs, keep the media next to the active hero.
    if (position === 'before' && fig.nextElementSibling !== anchor) anchor.before(fig);
    else if (position === 'after' && anchor.nextElementSibling !== fig) anchor.after(fig);
  };
  const render = manifest => {
    const header = safeMedia(mediaFor(manifest, 'header'));
    const search = safeMedia(mediaFor(manifest, 'search'));
    const unitVisual = document.querySelector('.up45-hero .up45-visual');
    if (unitVisual) {
      if (header && unitVisual.dataset.tszAcAsset !== header.key) {
        const img = makeImage(header, true);
        img.addEventListener('load', () => {
          unitVisual.querySelectorAll('.tsz-ac-hero-img').forEach(n => n.remove());
          unitVisual.prepend(img);
          unitVisual.dataset.tszAcAsset = header.key;
          unitVisual.classList.add('tsz-ac-visual-ready');
        }, { once: true });
      } else if (!header) {
        unitVisual.querySelectorAll('.tsz-ac-hero-img').forEach(n => n.remove());
        delete unitVisual.dataset.tszAcAsset;
        unitVisual.classList.remove('tsz-ac-visual-ready');
      }
    } else if (header) {
      const detail = document.querySelector('#p19-detail .p19-hero');
      const safe = document.querySelector('.tsz-promptdock-safe-hero');
      if (detail && safe) {
        // The detail and its fallback can toggle independently. Put a nonduplicated
        // figure in each branch; only the active branch is visible to the reader.
        createFigure(header, 'header', detail, 'after', 'header-detail');
        createFigure(header, 'header', safe, 'after', 'header-fallback');
        const detailVisible = !document.querySelector('#p19-detail')?.hidden;
        const detailArt = document.querySelector('[data-tsz-ac-slot="header-detail"]');
        const fallbackArt = document.querySelector('[data-tsz-ac-slot="header-fallback"]');
        if (detailArt) detailArt.hidden = !detailVisible;
        if (fallbackArt) fallbackArt.hidden = detailVisible;
      } else {
        const anchor = detail || safe || document.querySelector('main .hero, main .app-hero, main section:first-of-type');
        createFigure(header, 'header', anchor, 'after', 'header-generic');
      }
    } else {
      document.querySelectorAll('[data-tsz-ac-kind="header"]').forEach(el => el.remove());
    }
    if (search) {
      const anchor = document.querySelector('.up45-section .up45-features')?.closest('.up45-section') ||
        document.querySelector('#tsz-promptdock-feature') ||
        document.querySelector('#screens') ||
        document.querySelector('main section:nth-of-type(2)');
      if (anchor) createFigure(search, 'search', anchor, 'before', 'search');
    } else {
      document.querySelectorAll('[data-tsz-ac-kind="search"]').forEach(el => el.remove());
    }
  };
  const start = async () => {
    try {
      const response = await fetch(new URL('manifest.json', localURL), { cache: 'no-store', credentials: 'omit' });
      if (!response.ok) return;
      const manifest = await response.json();
      if (String(manifest.appId) !== appId || manifest.schema !== 1) return;
      const rerender = () => render(manifest);
      rerender();
      document.addEventListener('tsz-locale-changed', rerender);
      document.addEventListener('tsz:locale-change', rerender);
      window.addEventListener('tsz:locale-change', rerender);
      langControl()?.addEventListener('change', rerender);
      const detail = document.querySelector('#p19-detail');
      if (detail) {
        const observer = new MutationObserver(rerender);
        observer.observe(detail, { attributes: true, attributeFilter: ['hidden'] });
      }
    } catch (_) { /* Missing/bad media never blocks the existing LP. */ }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
