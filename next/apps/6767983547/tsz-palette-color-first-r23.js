/* TSZ Palette Spin R23: abstract palette swatches, not app screenshots. */
(() => {
  'use strict';
  const APP_ID = '6767983547';
  const CLASS = 'tsz-r23-color-first';
  const palettes = [
    ['#FCE3D9', '#F6A08E', '#D65D87', '#7356A5', '#343C73'],
    ['#E7F9E6', '#A6DABB', '#48AFB5', '#267AB1', '#243E77'],
    ['#FBEFBF', '#F9C966', '#F48B68', '#CA5A9E', '#6B4697']
  ];
  function mount() {
    if (document.body?.dataset.p199Id !== APP_ID) return;
    const hero = document.querySelector('.p19-hero-copy');
    if (!hero || hero.querySelector('.' + CLASS)) return;
    const swatches = document.createElement('div');
    swatches.className = CLASS;
    swatches.setAttribute('aria-hidden', 'true');
    swatches.dataset.tszPaletteSpin = 'r23-color-first';
    for (const colors of palettes) {
      const row = document.createElement('div');
      row.className = CLASS + '__row';
      for (const color of colors) {
        const chip = document.createElement('span');
        chip.className = CLASS + '__chip';
        chip.style.setProperty('--color', color);
        row.appendChild(chip);
      }
      swatches.appendChild(row);
    }
    const actions = hero.querySelector('.p19-actions');
    if (actions) actions.insertAdjacentElement('afterend', swatches);
    else hero.appendChild(swatches);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else mount();
})();
