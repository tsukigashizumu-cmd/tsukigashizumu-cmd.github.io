/* TSZ_VEKUNEL_R33_FREE_SHIPPING_COMPARISON: Static editorial illustration, NOT real checkout data. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6821840147') return;
  const id = 'tsz-vekunel-r33';
  const copy = {
    en: {
      kicker:'COST COMPARISON / EXAMPLE', heading:'Free shipping can still cost more.',
      sub:'One extra item may clear the shipping threshold without lowering your total.',
      cart:'Cart subtotal',shipping:'Ordinary shipping',threshold:'Free shipping from',item:'Added item',
      before:'Keep original cart',after:'Add one more item',difference:'+ $1.00 total',
      note:'Illustrative amounts in USD, not a real store offer or app screenshot. Assumes the threshold is based on the cart subtotal; tax, coupons and other fees are excluded.'
    },
    ja: {
      kicker:'支払額の比較 / 説明用', heading:'送料無料でも、合計は増えることがある。',
      sub:'商品をひとつ追加すると送料は0になっても、支払総額が下がるとは限りません。',
      cart:'元のカート',shipping:'通常送料',threshold:'送料無料の条件',item:'追加商品',
      before:'そのまま注文',after:'商品を追加して注文',difference:'合計 + $1.00',
      note:'USDによる説明用の数値です。実際の店舗価格やアプリ画面ではありません。カート小計で送料無料を判定し、税・クーポン・その他手数料は含めません。'
    }
  };
  function language() {
    const sel = document.getElementById('p199-language');
    const v = String(sel?.value || document.documentElement.lang || 'en-US');
    return /^ja(?:-|$)/i.test(v) ? 'ja' : 'en';
  }
  function update() {
    const root = document.getElementById(id);
    if (!root) return;
    const loc = language();
    root.lang = loc;
    const dict = copy[loc];
    root.querySelectorAll('[data-vk33]').forEach(node => {
      const key = node.getAttribute('data-vk33');
      if (Object.hasOwn(dict,key)) node.textContent = dict[key];
    });
  }
  function install() {
    const overview = document.getElementById('overview');
    if (!overview || document.getElementById(id)) return;
    const box = document.createElement('div');
    box.id = id;
    box.dataset.tszSource = 'independent-editorial-illustration';
    box.setAttribute('role','group');
    box.setAttribute('aria-label','Illustrative total cost comparison');
    box.innerHTML = `
      <p class="vk33-kicker" data-vk33="kicker"></p>
      <h3 data-vk33="heading"></h3>
      <p class="vk33-sub" data-vk33="sub"></p>
      <div class="vk33-params">
        <div class="vk33-param"><span data-vk33="cart"></span><strong>$44.00</strong></div>
        <div class="vk33-param"><span data-vk33="shipping"></span><strong>$7.00</strong></div>
        <div class="vk33-param"><span data-vk33="threshold"></span><strong>$50.00</strong></div>
        <div class="vk33-param"><span data-vk33="item"></span><strong>$8.00</strong></div>
      </div>
      <div class="vk33-columns">
        <div class="vk33-result"><p class="vk33-title" data-vk33="before"></p><span class="vk33-formula">$44 + $7</span><strong class="vk33-total">$51.00</strong></div>
        <div class="vk33-result vk33-extra"><p class="vk33-title" data-vk33="after"></p><span class="vk33-formula">$44 + $8 + $0</span><strong class="vk33-total">$52.00</strong><span class="vk33-badge" data-vk33="difference"></span></div>
      </div>
      <p class="vk33-note" data-vk33="note"></p>`;
    overview.append(box);
    update();
    const selection = document.getElementById('p199-language');
    if (selection) selection.addEventListener('change',update);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
