/* P9R1: typography-only fit for two editorial hero lines.
 * Measures actual rendered glyph widths, not character counts, across all locales.
 * Never removes text, inserts ellipses, affects analytics assignments or alters content.
 */
(() => {
  'use strict';
  let pending = false;
  const headline = () => document.getElementById('headline');
  const lines = () => [document.getElementById('hero-line1'), document.getElementById('hero-line2')];

  function fit() {
    const h = headline(), parts = lines();
    if (!h || parts.some(x => !x)) return;
    // Return to the true CSS layout for the current device and viewport before measuring.
    h.style.removeProperty('font-size');
    for (const el of parts) {
      el.style.removeProperty('white-space');
      el.style.removeProperty('display');
      el.style.removeProperty('overflow-wrap');
      el.style.removeProperty('word-break');
    }
    const maxFont = Number.parseFloat(getComputedStyle(h).fontSize);
    const width = h.getBoundingClientRect().width - 4;
    if (!(maxFont > 0 && width > 10)) return;
    // Determine text's intrinsic, unwrapped length in its actual family and weight.
    for (const el of parts) {
      el.style.whiteSpace = 'nowrap';
      el.style.display = 'inline-block';
      el.style.overflowWrap = 'normal';
      el.style.wordBreak = 'normal';
    }
    const measure = () => Math.max(...parts.map(x => x.getBoundingClientRect().width));
    const initial = measure();
    if (!(initial > 0)) return;
    const minPx = Math.min(maxFont, width < 430 ? 26 : width < 760 ? 30 : 34);
    let size = Math.min(maxFont, maxFont * width / initial * .985);
    size = Math.max(minPx, size);
    h.style.fontSize = `${size.toFixed(2)}px`;
    // Font fallback, kerning and inter-glyph spacing can be nonlinear: remeasure.
    for (let attempt = 0; attempt < 4 && measure() > width + .25 && size > minPx; attempt++) {
      const ratio = width / measure();
      size = Math.max(minPx, size * ratio * .992);
      h.style.fontSize = `${size.toFixed(2)}px`;
    }
    if (measure() > width + .75) {
      // Readability is more important than one-line purity. Never crop text.
      for (const el of parts) {
        el.style.whiteSpace = 'normal';
        el.style.display = 'inline';
        el.style.overflowWrap = 'anywhere';
        el.style.wordBreak = 'normal';
      }
      h.dataset.fitMode = 'readable-wrap';
    } else {
      h.dataset.fitMode = 'one-line-per-part';
    }
    h.dataset.fitFont = size.toFixed(2);
  }
  // Large promotional shelf labels can also overflow in long translations,
  // especially at 320px. Fit them independently; their prices/counts stay intact.
  function fitShelf(sectionId, titleId, rowClass, companionId) {
    const section = document.getElementById(sectionId);
    const title = document.getElementById(titleId);
    const companion = document.getElementById(companionId);
    const row = title?.closest(rowClass);
    if (!section || !title || !row) return;
    const headColumn = row.parentElement;
    if (headColumn) {headColumn.style.minWidth = '0';headColumn.style.maxWidth = '100%';}
    row.style.minWidth = '0';row.style.maxWidth = '100%';
    const eyebrow = headColumn?.querySelector('.eyebrow > span:last-child');
    if (eyebrow) {eyebrow.style.minWidth = '0';eyebrow.style.overflowWrap = 'anywhere';}
    title.style.removeProperty('font-size');
    title.style.whiteSpace = 'nowrap';
    title.style.display = 'inline-block';
    title.style.flexShrink = '0';
    title.style.overflowWrap = 'normal';
    const base = Number.parseFloat(getComputedStyle(title).fontSize);
    const containerWidth = section.getBoundingClientRect().width;
    const gap = Number.parseFloat(getComputedStyle(row).columnGap) || 0;
    // FREE count shares a line if legible; the paid price is already flex-wrapped.
    const reserved = titleId === 'free-title' ? (companion?.getBoundingClientRect().width || 0) + gap : 0;
    const available = Math.max(30,containerWidth - reserved - 4);
    const natural = Math.max(title.scrollWidth, title.getBoundingClientRect().width);
    if (!(base > 0 && natural > 0)) return;
    const minPx = Math.min(base, containerWidth < 430 ? 26 : containerWidth < 760 ? 30 : 34);
    let size = Math.max(minPx,Math.min(base,base * available / natural * .985));
    title.style.fontSize = `${size.toFixed(2)}px`;
    for (let i=0;i<4 && title.getBoundingClientRect().width>available+.25 && size>minPx;i++) {
      size=Math.max(minPx,size * available/title.getBoundingClientRect().width * .99);
      title.style.fontSize=`${size.toFixed(2)}px`;
    }
    if (title.getBoundingClientRect().width>available+.75) {
      title.style.whiteSpace = 'normal';
      title.style.display = 'block';
      title.style.flexShrink = '1';
      title.style.minWidth = '0';
      title.style.overflowWrap = 'anywhere';
      row.style.flexWrap = 'wrap';
      title.dataset.fitMode = 'readable-wrap';
    } else {
      row.style.removeProperty('flex-wrap');
      title.dataset.fitMode = 'one-line';
    }
  }
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      fit();
      fitShelf('free-now','free-title','.free-title-row','free-total');
      fitShelf('paid-now','paid-title','.paid-title-row','paid-floor');
    });
  }
  function init() {
    const h = headline(); if (!h) return;
    // Observe TEXT changes only: resizing the text must not cause a mutation loop.
    new MutationObserver(schedule).observe(h, {subtree:true,childList:true,characterData:true});
    // Shelf title/amount text changes after i18n or a price refresh.
    for (const id of ['free-title','paid-title','free-total','paid-floor']) {
      const el=document.getElementById(id);
      if (el) new MutationObserver(schedule).observe(el,{subtree:true,childList:true,characterData:true});
    }
    window.addEventListener('resize', schedule, {passive:true});
    window.addEventListener('orientationchange', schedule, {passive:true});
    document.addEventListener('tsz-locale-changed', schedule);
    let observedWidth = 0;
    if ('ResizeObserver' in window) {
      new ResizeObserver(entries => {
        const width = entries[0]?.contentRect?.width || 0;
        if (Math.abs(width - observedWidth) > .5) {observedWidth = width;schedule();}
      }).observe(h); // Width changes only, never height-only feedback.
    }
    if (document.fonts?.ready) document.fonts.ready.then(schedule).catch(() => {});
    schedule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
