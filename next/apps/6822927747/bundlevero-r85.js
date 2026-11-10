/* TSZ LP R85 — Bundlevero / owned items vs fixed-price bundle.
 * Standalone website illustration; NOT the real app optimizer or live pricing.
 * No analytics, network, storage, cookies or transmitted user data. */
(() => {
  'use strict';
  const APP = '6822927747';
  const copy = {
    en: {
      kicker: 'THE OWNERSHIP FLIP', badge: 'WEBSITE DEMO',
      title: 'A bundle is not always the cheaper way.',
      lead: 'You already own some items. Compare buying only the missing ones with paying the full bundle price.',
      line: 'YOUR COLLECTION', owned: 'Already owned', notOwned: 'Need to buy', itemPrice: 'Single price',
      bundle: 'FIXED-PRICE BUNDLE', bundlePrice: 'Bundle price', includes: 'Includes all three items',
      singleTotal: 'Buy missing items', bundleTotal: 'Buy full bundle', recommendation: 'LOWER TOTAL',
      winnerBundle: 'The bundle costs less', winnerSingle: 'The missing singles cost less',
      winnerTie: 'Both choices cost the same', winnerNone: 'Nothing left to buy',
      saving: 'Difference', ownedCount: 'Already owned', neededCount: 'Still needed',
      explanationBundle: 'This example treats the bundle as a fixed price even if you own part of it.',
      explanationSingle: 'Paying again for owned items does not help in this example.',
      explanationTie: 'Check what you already own before choosing.',
      explanationNone: 'All three example items are already in your collection.',
      invalid: 'Enter valid prices from 0 to 100,000. No result is shown until the values are valid.',
      scenario: 'Own two instead', reset: 'Reset example', each: ['Item A', 'Item B', 'Item C'],
      note: 'Illustrative website comparison of one fixed-price bundle and remaining singles only. Not an actual Bundlevero screen, an exhaustive optimization, a live offer or a price lookup. Numbers are examples. Nothing you enter is saved or sent.'
    },
    ja: {
      kicker: '所有済みで逆転する買い方', badge: 'LP専用デモ',
      title: 'セットが、いつも得とは限らない。',
      lead: 'すでに持っている品を考慮して、不足分だけを単品購入する場合と、セットを丸ごと買う場合を比較します。',
      line: '所有状況', owned: '所有済み', notOwned: '購入が必要', itemPrice: '単品価格',
      bundle: '固定価格のセット', bundlePrice: 'セット価格', includes: '3品すべてを含む',
      singleTotal: '不足分だけ単品購入', bundleTotal: 'セットを購入', recommendation: '支払額が少ない方',
      winnerBundle: 'セットの方が安い', winnerSingle: '単品購入の方が安い',
      winnerTie: 'どちらも同じ金額', winnerNone: '追加購入は不要',
      saving: '差額', ownedCount: '所有済み', neededCount: '不足分',
      explanationBundle: 'この例では、すでに所有していてもセット価格は変わりません。',
      explanationSingle: '持っている品に重ねて支払う必要はありません。',
      explanationTie: '買う前に、何を持っているか確認しましょう。',
      explanationNone: 'この例の3品は、すべて所有済みです。',
      invalid: '価格は0〜100,000で入力してください。有効な値になるまで結果は表示しません。',
      scenario: '2品所有の例', reset: '初期値に戻す', each: ['商品A', '商品B', '商品C'],
      note: '固定価格のセット1種類と、不足分の単品購入を比べるLP専用デモです。Bundleveroの実画面・全条件の最適化・実際の販売価格やオンライン価格取得ではありません。数値は例示です。入力内容は保存・送信しません。'
    },
    ar: {
      kicker: 'الفرق عندما تملك بعض العناصر', badge: 'عرض تجريبي للموقع',
      title: 'الحزمة ليست دائمًا الأرخص.',
      lead: 'قارن شراء العناصر الناقصة فقط مع شراء الحزمة كاملة، مع مراعاة ما تملكه بالفعل.',
      line: 'ما تملكه', owned: 'مملوك بالفعل', notOwned: 'تحتاج إلى شرائه', itemPrice: 'السعر الفردي',
      bundle: 'حزمة بسعر ثابت', bundlePrice: 'سعر الحزمة', includes: 'تحتوي العناصر الثلاثة',
      singleTotal: 'شراء العناصر الناقصة', bundleTotal: 'شراء الحزمة كاملة', recommendation: 'المبلغ الأقل',
      winnerBundle: 'الحزمة أقل تكلفة', winnerSingle: 'العناصر المنفردة أقل تكلفة',
      winnerTie: 'الخياران بالتكلفة نفسها', winnerNone: 'لا حاجة إلى شراء المزيد',
      saving: 'الفرق', ownedCount: 'المملوك', neededCount: 'الناقص',
      explanationBundle: 'في هذا المثال يبقى سعر الحزمة ثابتًا حتى إن كنت تملك بعض عناصرها.',
      explanationSingle: 'لا حاجة للدفع مجددًا مقابل عناصر تملكها.',
      explanationTie: 'راجع العناصر التي تملكها قبل الاختيار.',
      explanationNone: 'تملك العناصر الثلاثة بالفعل في هذا المثال.',
      invalid: 'أدخل أسعارًا صحيحة من 0 إلى 100,000. لن تظهر نتيجة قبل تصحيح القيم.',
      scenario: 'امتلاك عنصرين', reset: 'إعادة المثال', each: ['عنصر أ', 'عنصر ب', 'عنصر ج'],
      note: 'مقارنة توضيحية على الموقع بين حزمة واحدة بسعر ثابت وعناصر ناقصة تُشترى منفردة. ليست شاشة حقيقية من Bundlevero ولا بحثًا شاملًا عن أفضل سعر أو عرضًا مباشرًا. الأرقام أمثلة ولا يتم حفظ أو إرسال أي إدخال.'
    }
  };
  const initial = { prices: [12, 18, 14], owned: [true, false, false], bundle: 28 };
  const maxPrice = 100000;
  function locale() {
    const select = document.getElementById('p199-language');
    const raw = (select && select.value) || document.documentElement.lang || 'en';
    const code = String(raw).toLowerCase().split(/[-_]/)[0];
    return Object.prototype.hasOwnProperty.call(copy, code) ? code : 'en';
  }
  function mount() {
    if (!document.body || (document.body.dataset.p199Id !== APP && document.body.dataset.p19AppId !== APP)) return;
    const anchor = document.getElementById('overview');
    if (!anchor || document.getElementById('tsz-bv85')) return;
    const root = document.createElement('section');
    root.id = 'tsz-bv85';
    root.dataset.illustration = 'website-only-not-app-screen';
    root.setAttribute('aria-label', 'Bundlevero fixed-bundle ownership website demo');
    root.innerHTML = `
      <div class="bv85-overline"><span data-t="kicker"></span><span class="bv85-badge" data-t="badge"></span></div>
      <div class="bv85-heading"><h2 data-t="title"></h2><p data-t="lead"></p></div>
      <div class="bv85-grid">
        <div class="bv85-workspace">
          <div class="bv85-box-title"><span data-t="line"></span><span class="bv85-mini" data-out="owned-count"></span></div>
          <div class="bv85-products">
            <div class="bv85-item" data-item="0"><div class="bv85-mark">01</div><div class="bv85-item-name"><strong data-item-name="0"></strong><label class="bv85-own"><input type="checkbox" data-own="0" checked><span data-t="owned"></span></label></div><label class="bv85-price"><span data-t="itemPrice"></span><input type="number" data-price="0" min="0" max="100000" step="0.01" inputmode="decimal" value="12"></label></div>
            <div class="bv85-item" data-item="1"><div class="bv85-mark">02</div><div class="bv85-item-name"><strong data-item-name="1"></strong><label class="bv85-own"><input type="checkbox" data-own="1"><span data-t="owned"></span></label></div><label class="bv85-price"><span data-t="itemPrice"></span><input type="number" data-price="1" min="0" max="100000" step="0.01" inputmode="decimal" value="18"></label></div>
            <div class="bv85-item" data-item="2"><div class="bv85-mark">03</div><div class="bv85-item-name"><strong data-item-name="2"></strong><label class="bv85-own"><input type="checkbox" data-own="2"><span data-t="owned"></span></label></div><label class="bv85-price"><span data-t="itemPrice"></span><input type="number" data-price="2" min="0" max="100000" step="0.01" inputmode="decimal" value="14"></label></div>
          </div>
          <div class="bv85-bundle"><div class="bv85-bundle-icon" aria-hidden="true">▧</div><div class="bv85-bundle-label"><strong data-t="bundle"></strong><small data-t="includes"></small></div><label class="bv85-price"><span data-t="bundlePrice"></span><input type="number" data-bundle min="0" max="100000" step="0.01" inputmode="decimal" value="28"></label></div>
          <div class="bv85-actions"><button type="button" data-action="scenario" data-t="scenario"></button><button type="button" class="bv85-secondary" data-action="reset" data-t="reset"></button></div>
        </div>
        <div class="bv85-results"><div class="bv85-results-head"><span data-t="recommendation"></span><span class="bv85-result-pill" data-out="winner"></span></div>
          <div class="bv85-total-row"><div><span data-t="singleTotal"></span><small data-out="needed-count"></small></div><strong data-out="singles">32.00</strong></div>
          <div class="bv85-versus">VS</div>
          <div class="bv85-total-row"><div><span data-t="bundleTotal"></span><small data-t="includes"></small></div><strong data-out="bundle">28.00</strong></div>
          <div class="bv85-spotlight"><span data-t="saving"></span><strong data-out="difference">4.00</strong></div>
          <p class="bv85-reason" data-out="reason" aria-live="polite"></p>
        </div>
      </div>
      <p class="bv85-disclaimer" data-t="note"></p>`;
    anchor.insertAdjacentElement('afterend', root);
    const one = selector => root.querySelector(selector);
    const all = selector => Array.from(root.querySelectorAll(selector));
    let lastLang = locale();
    const format = value => Number(value).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    function readPrice(node) {
      if (node.value.trim() === '' || !node.validity.valid) return null;
      const n = Number(node.value);
      return Number.isFinite(n) && n >= 0 && n <= maxPrice ? n : null;
    }
    function render() {
      const lang = locale(), t = copy[lang];
      root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
      all('[data-t]').forEach(el => { el.textContent = t[el.dataset.t] || ''; });
      all('[data-item-name]').forEach(el => { el.textContent = t.each[Number(el.dataset.itemName)]; });
      const prices = [0, 1, 2].map(i => readPrice(one(`[data-price="${i}"]`)));
      const owned = [0, 1, 2].map(i => one(`[data-own="${i}"]`).checked);
      const bundle = readPrice(one('[data-bundle]'));
      all('[data-item]').forEach(el => { el.dataset.owned = owned[Number(el.dataset.item)] ? 'yes' : 'no'; });
      const ownedN = owned.filter(Boolean).length;
      const neededN = 3 - ownedN;
      one('[data-out="owned-count"]').textContent = `${t.ownedCount}: ${ownedN}/3`;
      one('[data-out="needed-count"]').textContent = `${t.neededCount}: ${neededN}`;
      const out = (key, value) => { one(`[data-out="${key}"]`).textContent = value; };
      if (bundle === null || prices.includes(null)) {
        out('singles', '—'); out('bundle', '—'); out('difference', '—'); out('winner', '—'); out('reason', t.invalid);
        root.dataset.winner = 'invalid'; return;
      }
      const singles = prices.reduce((sum, p, i) => sum + (owned[i] ? 0 : p), 0);
      // Round to cents to avoid floating-point ties changing the comparison.
      const s = Math.round(singles * 100), b = Math.round(bundle * 100);
      const winner = neededN === 0 ? 'none' : s < b ? 'singles' : b < s ? 'bundle' : 'tie';
      root.dataset.winner = winner;
      out('singles', format(s / 100)); out('bundle', format(b / 100));
      out('difference', format(Math.abs(s - b) / 100));
      const labels = {singles: t.winnerSingle, bundle: t.winnerBundle, tie: t.winnerTie, none: t.winnerNone};
      const reasons = {singles: t.explanationSingle, bundle: t.explanationBundle, tie: t.explanationTie, none: t.explanationNone};
      out('winner', labels[winner]); out('reason', reasons[winner]);
    }
    function setDefaults() {
      [0, 1, 2].forEach(i => { one(`[data-price="${i}"]`).value = String(initial.prices[i]); one(`[data-own="${i}"]`).checked = initial.owned[i]; });
      one('[data-bundle]').value = String(initial.bundle);
      render();
    }
    all('input').forEach(el => { el.addEventListener('input', render); el.addEventListener('change', render); });
    one('[data-action="scenario"]').addEventListener('click', () => { [true, true, false].forEach((v, i) => { one(`[data-own="${i}"]`).checked = v; }); render(); });
    one('[data-action="reset"]').addEventListener('click', setDefaults);
    document.getElementById('p199-language')?.addEventListener('change', render);
    new MutationObserver(() => { const current = locale(); if (current !== lastLang) { lastLang = current; render(); } })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, {once: true});
  else mount();
})();
