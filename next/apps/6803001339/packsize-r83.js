/* TSZ LP R83 — Pack Size Price Compare: website-only interactive example.
   All prices are invented. No network, localStorage, cookies, or user-data persistence. */
(() => {
  'use strict';
  const APP = '6803001339';
  const strings = {
    en: {
      eyebrow: 'THE BIG-PACK TRAP', badge: 'INTERACTIVE WEBSITE EXAMPLE', heading: 'Bigger does not always mean cheaper.',
      intro: 'Change the price or contents. Compare the real cost for the same 100 g — not the size of the package.',
      small: 'REGULAR PACK', bulk: 'BULK PACK', price: 'Package price', amount: 'Contents', unit: 'Unit',
      per: 'PRICE / 100 g', winner: 'BETTER PRICE', saving: 'Difference in unit price',
      action: 'Make bulk cheaper', reset: 'Reset example', equal: 'Both packs cost the same per 100 g.',
      smallWins: 'The regular pack is cheaper by {pct}% per 100 g.',
      bulkWins: 'The bulk pack is cheaper by {pct}% per 100 g.',
      error: 'Enter a positive price and a positive amount for both packages.',
      note: 'Website-only calculation example, not a screenshot or a saved comparison from the app. Prices are illustrative, in arbitrary price units. No inputs or results are stored or transmitted.'
    },
    ja: {
      eyebrow: '大容量の落とし穴', badge: 'LP専用・操作できる説明例', heading: '大袋が、安いとは限らない。',
      intro: '値段や内容量を変更すると、両方を100gあたりの単価に揃えて比較できます。',
      small: '通常パック', bulk: '大容量パック', price: '1パックの価格', amount: '内容量', unit: '単位',
      per: '100gあたり', winner: 'お得なのは', saving: '単価の差',
      action: '大袋を割安にする', reset: '最初に戻す', equal: 'どちらも100gあたりの価格は同じです。',
      smallWins: '通常パックの方が100gあたり {pct}% 割安です。',
      bulkWins: '大容量パックの方が100gあたり {pct}% 割安です。',
      error: '両方のパックに、0より大きい価格と内容量を入力してください。',
      note: 'これはLP専用の計算デモです。アプリの実画面や保存された比較結果ではありません。価格は架空の単位で示しています。入力内容の保存・送信は行いません。'
    },
    ar: {
      eyebrow: 'فخ العبوة الكبيرة', badge: 'مثال تفاعلي خاص بالموقع', heading: 'الأكبر ليس دائمًا الأرخص.',
      intro: 'غيّر السعر أو الكمية وقارن السعر لكل 100 غرام بدلًا من الاعتماد على حجم العبوة.',
      small: 'العبوة العادية', bulk: 'العبوة الكبيرة', price: 'سعر العبوة', amount: 'المحتوى', unit: 'الوحدة',
      per: 'السعر لكل 100 غ', winner: 'السعر الأفضل', saving: 'فرق سعر الوحدة',
      action: 'اجعل الكبيرة أرخص', reset: 'إعادة المثال', equal: 'السعر لكل 100 غرام متساوٍ.',
      smallWins: 'العبوة العادية أوفر بنسبة {pct}% لكل 100 غرام.',
      bulkWins: 'العبوة الكبيرة أوفر بنسبة {pct}% لكل 100 غرام.',
      error: 'أدخل سعرًا وكمية موجبين لكلتا العبوتين.',
      note: 'هذا مثال حسابي خاص بالموقع، وليس لقطة من التطبيق أو مقارنة محفوظة. الأسعار افتراضية وبوحدات غير محددة. لا تُحفظ المدخلات أو النتائج ولا تُرسل.'
    }
  };
  const initial = { aPrice: '3.50', aAmount: '500', aUnit: 'g', bPrice: '9.60', bAmount: '1.2', bUnit: 'kg' };
  function locale() {
    const raw = document.getElementById('p199-language')?.value || document.documentElement.lang || 'en';
    const base = String(raw).toLowerCase().split(/[-_]/)[0];
    return Object.prototype.hasOwnProperty.call(strings, base) ? base : 'en';
  }
  function showNumber(n, digits = 2) {
    return new Intl.NumberFormat(locale() === 'ja' ? 'ja-JP' : locale() === 'ar' ? 'ar-EG' : 'en-US',
      { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n);
  }
  function mount() {
    const body = document.body;
    if (!body || (body.dataset.p199Id !== APP && body.dataset.p19AppId !== APP)) return;
    const anchor = document.getElementById('overview');
    if (!anchor || document.getElementById('tsz-ps83')) return;
    const root = document.createElement('section');
    root.id = 'tsz-ps83';
    root.dataset.illustration = 'website-only-not-app-screen';
    root.setAttribute('aria-label', 'Pack Size Price Compare website example');
    root.innerHTML = `
      <div class="ps83-top"><span data-t="eyebrow"></span><span class="ps83-pill" data-t="badge"></span></div>
      <div class="ps83-title"><h2 data-t="heading"></h2><p data-t="intro"></p></div>
      <div class="ps83-cards">
        <div class="ps83-card" data-pack="a"><div class="ps83-cardtop"><span class="ps83-num">01</span><h3 data-t="small"></h3></div>
          <div class="ps83-package ps83-small" aria-hidden="true"><span>500g</span></div>
          <div class="ps83-fields"><label><span data-t="price"></span><input data-field="aPrice" inputmode="decimal" type="number" step="any" min="0.01" max="1000000000" value="3.50"></label>
            <label><span data-t="amount"></span><input data-field="aAmount" inputmode="decimal" type="number" step="any" min="0.01" max="1000000000" value="500"></label>
            <label><span data-t="unit"></span><select data-field="aUnit"><option value="g">g</option><option value="kg">kg</option></select></label></div>
          <div class="ps83-unitcost"><span data-t="per"></span><strong data-out="aUnitCost">0.70</strong></div>
        </div>
        <div class="ps83-card" data-pack="b"><div class="ps83-cardtop"><span class="ps83-num">02</span><h3 data-t="bulk"></h3></div>
          <div class="ps83-package ps83-bulk" aria-hidden="true"><span>1.2kg</span></div>
          <div class="ps83-fields"><label><span data-t="price"></span><input data-field="bPrice" inputmode="decimal" type="number" step="any" min="0.01" max="1000000000" value="9.60"></label>
            <label><span data-t="amount"></span><input data-field="bAmount" inputmode="decimal" type="number" step="any" min="0.01" max="1000000000" value="1.2"></label>
            <label><span data-t="unit"></span><select data-field="bUnit"><option value="g">g</option><option value="kg" selected>kg</option></select></label></div>
          <div class="ps83-unitcost"><span data-t="per"></span><strong data-out="bUnitCost">0.80</strong></div>
        </div>
      </div>
      <div class="ps83-result" data-state="a"><div class="ps83-resulthead"><span data-t="winner"></span><strong data-out="winner"></strong></div>
        <div class="ps83-bars" aria-hidden="true"><div><span>01</span><i data-bar="a"></i></div><div><span>02</span><i data-bar="b"></i></div></div>
        <p data-out="status" role="status" aria-live="polite"></p>
      </div>
      <div class="ps83-actions"><button type="button" class="ps83-primary" data-act="flip" data-t="action"></button><button type="button" class="ps83-reset" data-act="reset" data-t="reset"></button></div>
      <p class="ps83-footnote" data-t="note"></p>`;
    anchor.insertAdjacentElement('afterend', root);
    const $ = selector => root.querySelector(selector);
    const fields = Object.keys(initial);
    const reset = (data) => { fields.forEach(k => { $(`[data-field="${k}"]`).value = data[k]; }); };
    const out = (key, value) => { $(`[data-out="${key}"]`).textContent = value; };
    const price100 = (prefix) => {
      const price = Number($(`[data-field="${prefix}Price"]`).value);
      const amount = Number($(`[data-field="${prefix}Amount"]`).value);
      const unit = $(`[data-field="${prefix}Unit"]`).value;
      if (!Number.isFinite(price) || !Number.isFinite(amount) ||
          price <= 0 || amount <= 0 || price > 1e9 || amount > 1e9) return NaN;
      return 100 * price / (amount * (unit === 'kg' ? 1000 : 1));
    };
    let lastLanguage = locale();
    function render() {
      const current = locale(); const t = strings[current];
      root.lang = current; root.dir = current === 'ar' ? 'rtl' : 'ltr';
      root.querySelectorAll('[data-t]').forEach(el => { el.textContent = t[el.dataset.t] || ''; });
      const a = price100('a'), b = price100('b');
      const valid = Number.isFinite(a) && Number.isFinite(b) && a > 0 && b > 0;
      out('aUnitCost', valid ? showNumber(a) : '—');
      out('bUnitCost', valid ? showNumber(b) : '—');
      if (!valid) {
        root.querySelector('.ps83-result').dataset.state = 'invalid';
        out('winner', '—'); out('status', t.error);
        $('[data-bar="a"]').style.width = '0%'; $('[data-bar="b"]').style.width = '0%';
        return;
      }
      const smaller = Math.min(a, b); const bigger = Math.max(a, b);
      const ratio = Math.abs(a - b) / bigger * 100;
      const state = Math.abs(a - b) < 1e-10 ? 'equal' : a < b ? 'a' : 'b';
      root.querySelector('.ps83-result').dataset.state = state;
      out('winner', state === 'equal' ? '=' : state === 'a' ? t.small : t.bulk);
      out('status', state === 'equal' ? t.equal : (state === 'a' ? t.smallWins : t.bulkWins).replace('{pct}', showNumber(ratio, 1)));
      // Longer bar = more contents per price unit (higher value); cap ratio at 100%.
      $('[data-bar="a"]').style.width = `${Math.max(4, Math.min(100, 100 * smaller / a))}%`;
      $('[data-bar="b"]').style.width = `${Math.max(4, Math.min(100, 100 * smaller / b))}%`;
    }
    root.querySelectorAll('input,select').forEach(el => { el.addEventListener('input', render); el.addEventListener('change', render); });
    $('[data-act="flip"]').addEventListener('click', () => { $('[data-field="bPrice"]').value = '7.80'; render(); });
    $('[data-act="reset"]').addEventListener('click', () => { reset(initial); render(); });
    document.getElementById('p199-language')?.addEventListener('change', () => { lastLanguage = locale(); render(); });
    new MutationObserver(() => { const next = locale(); if (next !== lastLanguage) { lastLanguage = next; render(); } })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true });
  else mount();
})();
