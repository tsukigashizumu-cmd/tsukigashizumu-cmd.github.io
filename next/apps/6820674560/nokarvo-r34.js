/* TSZ_NOKARVO_R34_USABLE_AMOUNT_REVERSAL: editorial example, not real product data or app screenshot. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6820674560') return;
  const id = 'tsz-nokarvo-r34';
  const copy = {
    en: {
      kicker:'UNIT PRICE / WORKED EXAMPLE', heading:'The cheaper sticker price can lose.',
      lede:'Two 1 kg products. The part you can actually use changes the comparison.',
      price:'Total price', bought:'Purchased quantity', yield:'Usable amount', gross:'Price per purchased kg', actual:'Price per usable kg',
      badgeA:'Lower sticker unit price', badgeB:'Lower usable unit price',
      conclusion:'A looks cheaper at first. B wins after the unusable portion is removed.',
      note:'Illustrative figures in USD, not real store prices, an actual app result, or an app screenshot. Assumes all prices are final, comparable units and the stated usable quantities are accurate. 4.00 ÷ 0.50 = 8.00; 5.00 ÷ 0.80 = 6.25. The actual app uses user-entered values.'
    },
    ja: {
      kicker:'使える量での単価比較 / 説明例', heading:'安く見えたAが、逆転する。',
      lede:'購入量はどちらも1kg。使えない部分を差し引くと、結果が変わります。',
      price:'購入価格', bought:'購入量', yield:'使える量', gross:'購入量あたりの単価', actual:'使える量あたりの単価',
      badgeA:'表示単価ではAが安い', badgeB:'使える単価ではBが安い',
      conclusion:'表示単価ではAが有利。でも使える量で比べるとBが有利。',
      note:'USDで示した説明用の架空の数値です。実際の販売価格・アプリの計算結果・スクリーンショットではありません。価格と単位が比較可能で、使える量が入力どおりであると仮定します。4.00÷0.50＝8.00、5.00÷0.80＝6.25。実際のアプリは利用者の入力で計算します。'
    }
  };
  function language() {
    const select = document.getElementById('p199-language');
    const value = String(select?.value || document.documentElement.lang || 'en-US');
    return /^ja(?:-|$)/i.test(value) ? 'ja' : 'en';
  }
  function update() {
    const root = document.getElementById(id);
    if (!root) return;
    const loc = language(), dict = copy[loc];
    root.lang = loc;
    root.querySelectorAll('[data-nk34]').forEach(el => {
      const key = el.getAttribute('data-nk34');
      if (Object.prototype.hasOwnProperty.call(dict,key)) el.textContent = dict[key];
    });
  }
  function install() {
    const overview = document.getElementById('overview');
    if (!overview || document.getElementById(id)) return;
    const root = document.createElement('section');
    root.id = id;
    root.dataset.tszSource = 'independent-editorial-example';
    root.setAttribute('aria-label','Illustrative comparison of purchased and usable unit prices');
    root.innerHTML = `
      <p class="nk34-kicker" data-nk34="kicker"></p>
      <h3 data-nk34="heading"></h3>
      <p class="nk34-lede" data-nk34="lede"></p>
      <div class="nk34-grid">
        <div class="nk34-card nk34-card--a">
          <p class="nk34-product"><span>PRODUCT</span><span class="nk34-letter">A</span></p>
          <div class="nk34-line"><span data-nk34="price"></span><strong>$4.00</strong></div>
          <div class="nk34-line"><span data-nk34="bought"></span><strong>1.00 kg</strong></div>
          <div class="nk34-line"><span data-nk34="yield"></span><strong>0.50 kg</strong></div>
          <div class="nk34-unit"><span class="nk34-label" data-nk34="gross"></span><strong class="nk34-gross">$4.00/kg</strong><span class="nk34-label" data-nk34="actual"></span><strong class="nk34-usable">$8.00<span class="nk34-unitname">/kg</span></strong><span class="nk34-winner" data-nk34="badgeA"></span></div>
        </div>
        <div class="nk34-card nk34-card--b">
          <p class="nk34-product"><span>PRODUCT</span><span class="nk34-letter">B</span></p>
          <div class="nk34-line"><span data-nk34="price"></span><strong>$5.00</strong></div>
          <div class="nk34-line"><span data-nk34="bought"></span><strong>1.00 kg</strong></div>
          <div class="nk34-line"><span data-nk34="yield"></span><strong>0.80 kg</strong></div>
          <div class="nk34-unit"><span class="nk34-label" data-nk34="gross"></span><strong class="nk34-gross">$5.00/kg</strong><span class="nk34-label" data-nk34="actual"></span><strong class="nk34-usable">$6.25<span class="nk34-unitname">/kg</span></strong><span class="nk34-winner" data-nk34="badgeB"></span></div>
        </div>
      </div>
      <p class="nk34-conclusion" data-nk34="conclusion"></p>
      <p class="nk34-note" data-nk34="note"></p>`;
    overview.append(root);
    update();
    const select = document.getElementById('p199-language');
    if (select) select.addEventListener('change',update);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
