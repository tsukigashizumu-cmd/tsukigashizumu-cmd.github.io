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
  // R561: move between verified images of the SAME Apple artwork kind without
  // closing the native modal. Never mix header/search or invent a locale.
  let variantPreviewReturnFocus = null;
  const closeVariantPreview = () => {
    const dialog = document.getElementById('tsz-ac-variant-dialog');
    if (dialog && dialog.open) dialog.close();
    if (dialog) dialog.remove();
    const back = variantPreviewReturnFocus;
    variantPreviewReturnFocus = null;
    if (back && back.isConnected) back.focus({ preventScroll: true });
  };
  const openVariantPreview = (items, initialIndex, trigger) => {
    closeVariantPreview();
    // The immutable, validated media group comes from variantMediaFor().
    if (!Array.isArray(items) || items.length < 2 || items.length > 8 ||
        !Number.isInteger(initialIndex) || initialIndex < 0 || initialIndex >= items.length ||
        items.some(item => !item || !item.media || typeof item.label !== 'string')) return;
    const dialog = document.createElement('dialog');
    dialog.id = 'tsz-ac-variant-dialog';
    dialog.className = 'tsz-ac-variant-dialog';
    const heading = document.createElement('p');
    heading.className = 'tsz-ac-variant-preview-heading';
    heading.id = 'tsz-ac-variant-dialog-title';
    heading.setAttribute('aria-live', 'polite');
    dialog.setAttribute('aria-labelledby', heading.id);
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'tsz-ac-variant-close';
    close.textContent = 'Close preview';
    close.setAttribute('aria-label', 'Close image preview');
    close.addEventListener('click', () => closeVariantPreview());
    const image = document.createElement('img');
    image.className = 'tsz-ac-variant-enlarged';
    image.decoding = 'async';
    image.loading = 'eager';
    image.draggable = false;
    // Give visitors explicit feedback when a large approved artwork is still
    // decoding or genuinely failed to load; never silently show a broken IMG.
    const loadStatus = document.createElement('p');
    loadStatus.className = 'tsz-ac-variant-loadstatus';
    loadStatus.dataset.tszAcVariantLoadstatus = 'true';
    loadStatus.setAttribute('role', 'status');
    loadStatus.setAttribute('aria-live', 'polite');
    loadStatus.setAttribute('aria-atomic', 'true');
    loadStatus.hidden = true;
    // An unavailable preview must provide a recovery action. It reloads only
    // the currently selected, locally validated Apple artwork, not the page.
    const retry = document.createElement('button');
    retry.type = 'button';
    retry.className = 'tsz-ac-variant-retry';
    retry.dataset.tszAcVariantRetry = 'true';
    retry.textContent = 'Retry image';
    retry.setAttribute('aria-label', 'Retry loading this image');
    retry.hidden = true;
    // R566: inspect small text within the original, locally approved image.
    // The viewport scrolls at 2x; zoom never changes the image URL or group.
    const imageViewport = document.createElement('div');
    imageViewport.className = 'tsz-ac-variant-image-viewport';
    imageViewport.dataset.tszAcVariantZoom = '1';
    imageViewport.append(image);
    const zoom = document.createElement('button');
    zoom.type = 'button';
    zoom.className = 'tsz-ac-variant-zoom';
    zoom.dataset.tszAcVariantZoomButton = 'true';
    const resetZoom = () => {
      imageViewport.dataset.tszAcVariantZoom = '1';
      imageViewport.scrollLeft = 0;
      imageViewport.scrollTop = 0;
      zoom.setAttribute('aria-pressed', 'false');
      zoom.textContent = 'Zoom to 2×';
      zoom.setAttribute('aria-label', 'Zoom image to twice its fitted size');
    };
    zoom.addEventListener('click', () => {
      if (imageViewport.dataset.tszAcVariantZoom === '2') { resetZoom(); return; }
      imageViewport.dataset.tszAcVariantZoom = '2';
      imageViewport.scrollLeft = 0;
      imageViewport.scrollTop = 0;
      zoom.setAttribute('aria-pressed', 'true');
      zoom.textContent = 'Reset zoom';
      zoom.setAttribute('aria-label', 'Reset image zoom to fit');
    });
    resetZoom();
    // R567: two-finger pinch controls only the existing fit/2x detail mode.
    // No external image source, tracking, browser/page zoom or gallery change.
    // Gesture recognition is on the image viewport; single-touch navigation
    // continues to be handled by the R562 image-specific swipe recognizer.
    let pinchStart = null;
    const pinchDistance = touches => Math.hypot(
      touches[0].clientX - touches[1].clientX,
      touches[0].clientY - touches[1].clientY
    );
    imageViewport.addEventListener('touchstart', event => {
      if (event.touches.length !== 2) { pinchStart = null; return; }
      const distance = pinchDistance(event.touches);
      if (!Number.isFinite(distance) || distance < 20) { pinchStart = null; return; }
      pinchStart = { distance, zoom: imageViewport.dataset.tszAcVariantZoom, acted: false };
    }, { passive: true });
    imageViewport.addEventListener('touchmove', event => {
      if (!pinchStart) return;
      if (event.touches.length !== 2) { pinchStart = null; return; }
      if (event.cancelable) event.preventDefault();
      const ratio = pinchDistance(event.touches) / pinchStart.distance;
      if (pinchStart.acted) return;
      if (pinchStart.zoom === '1' && ratio >= 1.28) {
        zoom.click();
        pinchStart.acted = true;
      } else if (pinchStart.zoom === '2' && ratio <= 0.78) {
        zoom.click();
        pinchStart.acted = true;
      }
    }, { passive: false });
    imageViewport.addEventListener('touchend', event => {
      if (event.touches.length < 2) pinchStart = null;
    }, { passive: true });
    imageViewport.addEventListener('touchcancel', () => { pinchStart = null; }, { passive: true });
    let retrySerial = 0;
    const previewLoaded = () => {
      image.removeAttribute('aria-busy');
      loadStatus.hidden = true;
      loadStatus.textContent = '';
      retry.hidden = true;
    };
    image.addEventListener('load', () => {
      if (image.complete && image.naturalWidth > 0) previewLoaded();
    });
    image.addEventListener('error', () => {
      image.removeAttribute('aria-busy');
      loadStatus.hidden = false;
      loadStatus.textContent = 'Image unavailable';
      retry.hidden = false;
    });
    const nav = document.createElement('div');
    nav.className = 'tsz-ac-variant-nav';
    const previous = document.createElement('button');
    previous.type = 'button';
    previous.className = 'tsz-ac-variant-nav-button';
    previous.dataset.tszAcVariantPrevious = 'true';
    previous.textContent = 'Previous';
    previous.setAttribute('aria-label', 'Previous image in this section');
    const count = document.createElement('span');
    count.className = 'tsz-ac-variant-counter';
    count.dataset.tszAcVariantCounter = 'true';
    count.setAttribute('role', 'status');
    count.setAttribute('aria-live', 'polite');
    count.setAttribute('aria-atomic', 'true');
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'tsz-ac-variant-nav-button';
    next.dataset.tszAcVariantNext = 'true';
    next.textContent = 'Next';
    next.setAttribute('aria-label', 'Next image in this section');
    let selected = initialIndex;
    const show = newIndex => {
      resetZoom(); // A new approved image must start in the fitted, swipeable state.
      selected = (newIndex + items.length) % items.length;
      const item = items[selected];
      // Keep the same IMG element, allowing native focus/scroll restoration.
      heading.textContent = item.label;
      image.alt = item.label;
      image.width = item.media.width;
      image.height = item.media.height;
      image.setAttribute('aria-busy', 'true');
      loadStatus.hidden = false;
      loadStatus.textContent = 'Loading image…';
      retry.hidden = true;
      image.src = item.media.url;
      // A decoded cache hit is already usable; no artificial loading delay.
      if (image.complete && image.naturalWidth > 0) previewLoaded();
      count.textContent = String(selected + 1) + ' / ' + String(items.length);
      count.setAttribute('aria-label', 'Image ' + (selected + 1) + ' of ' + items.length);
      dialog.dataset.tszAcVariantIndex = String(selected);
    };
    retry.addEventListener('click', () => {
      // Never accept a user-provided URL: item.media.url comes from safeMedia().
      const item = items[selected];
      const url = new URL(item.media.url, document.baseURI);
      url.searchParams.set('tsz_preview_retry', String(++retrySerial));
      image.setAttribute('aria-busy', 'true');
      loadStatus.hidden = false;
      loadStatus.textContent = 'Loading image…';
      retry.hidden = true;
      image.src = url.href;
      if (image.complete && image.naturalWidth > 0) previewLoaded();
    });
    // R562: only a clear, single-finger, horizontal image gesture changes art.
    // Tap, short drags, vertical page scrolling and multi-touch never navigate.
    let swipeStart = null;
    image.addEventListener('touchstart', event => {
      if (imageViewport.dataset.tszAcVariantZoom === '2') { swipeStart = null; return; }
      if (event.touches.length !== 1) { swipeStart = null; return; }
      const touch = event.touches[0];
      swipeStart = { x: touch.clientX, y: touch.clientY,
        started: Date.now(), identifier: touch.identifier };
    }, { passive: true });
    image.addEventListener('touchmove', event => {
      if (!swipeStart) return;
      if (event.touches.length !== 1) { swipeStart = null; return; }
      const touch = event.touches[0];
      if (touch.identifier !== swipeStart.identifier) { swipeStart = null; return; }
      const dx = touch.clientX - swipeStart.x;
      const dy = touch.clientY - swipeStart.y;
      // Once vertical scrolling is dominant, ignore the entire gesture.
      if (Math.abs(dy) > 24 && Math.abs(dy) > Math.abs(dx) * 1.15)
        swipeStart = null;
    }, { passive: true });
    image.addEventListener('touchend', event => {
      const start = swipeStart;
      swipeStart = null;
      if (!start || event.changedTouches.length !== 1 || event.touches.length !== 0) return;
      const touch = event.changedTouches[0];
      if (touch.identifier !== start.identifier) return;
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Date.now() - start.started > 1500 ||
          Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
      show(selected + (dx < 0 ? 1 : -1));
    }, { passive: true });
    image.addEventListener('touchcancel', () => { swipeStart = null; }, { passive: true });
    previous.addEventListener('click', () => show(selected - 1));
    next.addEventListener('click', () => show(selected + 1));
    dialog.addEventListener('keydown', event => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        show(event.key === 'Home' ? 0 : items.length - 1);
      }
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
        const horizontal = event.key === 'ArrowLeft' || event.key === 'ArrowRight';
        if (imageViewport.dataset.tszAcVariantZoom === '2') {
          // R569: four-way keyboard pan inside the zoomed Apple-approved image.
          // No arrow may replace artwork while zoomed; PageUp/Down remain native.
          event.preventDefault();
          const extent = horizontal ? imageViewport.clientWidth : imageViewport.clientHeight;
          const step = Math.max(120, Math.round(extent * 0.6));
          if (horizontal) imageViewport.scrollLeft += event.key === 'ArrowRight' ? step : -step;
          else imageViewport.scrollTop += event.key === 'ArrowDown' ? step : -step;
        } else if (horizontal) {
          event.preventDefault();
          show(selected + (event.key === 'ArrowRight' ? 1 : -1));
        }
      }
    });
    nav.append(previous, count, next);
    dialog.append(close, heading, imageViewport, loadStatus, retry, zoom, nav);
    dialog.addEventListener('click', event => {
      if (event.target === dialog) closeVariantPreview();
    });
    dialog.addEventListener('close', () => {
      if (dialog.isConnected) dialog.remove();
      const back = variantPreviewReturnFocus;
      variantPreviewReturnFocus = null;
      if (back && back.isConnected) back.focus({ preventScroll: true });
    }, { once: true });
    document.body.append(dialog);
    variantPreviewReturnFocus = trigger;
    show(initialIndex);
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else { dialog.setAttribute('open', ''); dialog.setAttribute('aria-modal', 'true'); }
    close.focus({ preventScroll: true });
  };
  const removeVariantGallery = () => {
    closeVariantPreview();
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
    if (fig && fig.dataset.tszAcVariantKey !== key) { closeVariantPreview(); fig.remove(); fig = null; }
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
        const galleryItems = groupRows.map(({ media }, i) => ({
          media, label: heading.textContent + ', image ' + (i + 1) + ' of ' + groupRows.length
        }));
        groupRows.forEach(({media}, index) => {
          const img = makeImage(media, 'tsz-ac-variant-image', 'search');
          // Independent QA role: do not confuse variants with canonical slots.
          delete img.dataset.tszAcRole;
          img.dataset.tszAcVariantRole = kind;
          img.dataset.tszAcVariantFile = media.key;
          img.alt = galleryItems[index].label;
          const trigger = document.createElement('button');
          trigger.type = 'button';
          trigger.className = 'tsz-ac-variant-trigger';
          trigger.dataset.tszAcVariantTrigger = kind;
          trigger.setAttribute('aria-label', 'Enlarge ' + img.alt);
          trigger.title = 'View larger';
          const position = document.createElement('span');
          position.className = 'tsz-ac-variant-position';
          position.textContent = 'Image ' + (index + 1) + ' / ' + groupRows.length;
          position.setAttribute('aria-hidden', 'true');
          trigger.append(img, position);
          trigger.addEventListener('click', () => openVariantPreview(galleryItems, index, trigger));
          grid.appendChild(trigger);
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
        '.tsz-ac-variant-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,170px),1fr));gap:12px;align-items:center;max-width:100%}' +
        '.tsz-ac-variant-trigger{display:block;width:100%;border:0;padding:0;background:transparent;cursor:zoom-in;border-radius:12px;box-sizing:border-box}' +
        '.tsz-ac-variant-trigger:focus-visible,.tsz-ac-variant-close:focus-visible,.tsz-ac-variant-nav-button:focus-visible{outline:3px solid #3b82f6;outline-offset:3px}' +
        '.tsz-ac-variant-position{display:block;text-align:center;margin:.4rem 0 .12rem;font:500 12px/1.4 system-ui,sans-serif;color:inherit;opacity:.9}' +
        '.tsz-ac-variant-image{display:block;width:100%;max-width:100%;height:auto;max-height:310px;object-fit:contain;border-radius:12px;box-sizing:border-box;box-shadow:0 2px 12px rgba(0,0,0,.11)}' +
        '.tsz-ac-variant-dialog{position:fixed;inset:0;margin:auto;padding:44px 16px 16px;border:0;border-radius:14px;max-width:min(1040px,92vw);width:min(1040px,92vw);max-height:90vh;overflow:auto;box-sizing:border-box;background:#fff;color:#111}' +
        '.tsz-ac-variant-dialog::backdrop{background:rgba(0,0,0,.82)}' +
        '.tsz-ac-variant-close{position:absolute;right:12px;top:10px;border:1px solid #bbb;border-radius:6px;padding:6px 12px;font:600 14px system-ui,sans-serif;color:#111;background:#fff;cursor:pointer}' +
        '.tsz-ac-variant-image-viewport{display:block;width:100%;max-width:100%;max-height:69vh;overflow:auto;overscroll-behavior:contain;box-sizing:border-box}' +
        '.tsz-ac-variant-image-viewport[data-tsz-ac-variant-zoom="2"] .tsz-ac-variant-enlarged{width:200%;max-width:none;max-height:none;touch-action:pan-x pan-y}' +
        '.tsz-ac-variant-enlarged{display:block;max-width:100%;width:auto;height:auto;max-height:69vh;object-fit:contain;margin:auto;touch-action:pan-y;user-select:none;-webkit-user-select:none}' +
        '.tsz-ac-variant-loadstatus:not([hidden]){display:block;text-align:center;margin:.5rem 0;font:500 13px/1.5 system-ui,sans-serif;color:inherit}' +
        '.tsz-ac-variant-retry:not([hidden]){display:block;margin:.35rem auto .8rem;padding:9px 17px;font:600 14px/1.3 system-ui,sans-serif;border:1px solid #888;border-radius:8px;background:#fff;color:#111;cursor:pointer}' +
        '.tsz-ac-variant-retry:focus-visible,.tsz-ac-variant-zoom:focus-visible{outline:3px solid #146dcc;outline-offset:3px}' +
        '.tsz-ac-variant-zoom{display:block;margin:.35rem auto .55rem;padding:8px 14px;font:600 14px/1.3 system-ui,sans-serif;border:1px solid #888;border-radius:8px;background:#fff;color:#111;cursor:pointer;min-height:42px}' +
        '.tsz-ac-variant-preview-heading{margin:0 70px .6rem 0;font:600 15px/1.5 system-ui,sans-serif}' +
        '.tsz-ac-variant-nav{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:.75rem auto 0;max-width:460px}' +
        '.tsz-ac-variant-counter{font:500 14px system-ui,sans-serif;white-space:nowrap}' +
        '.tsz-ac-variant-nav-button{font:600 14px system-ui,sans-serif;border:1px solid #bbb;border-radius:8px;background:#fff;color:#111;padding:9px 14px;min-height:42px;cursor:pointer}';
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
