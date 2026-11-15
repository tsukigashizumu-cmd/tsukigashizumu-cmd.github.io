/* TSZ LP R207 · UnitPrice Cost Compare / two successive discounts, fictional data. */
(() => {
  'use strict';
  if (!document.body || document.body.dataset.p199Id !== '6804760060') return;
  const id = 'tsz-unitprice-r207';
  if (document.getElementById(id)) return;
  const anchor = document.querySelector('.up45-bread') || document.querySelector('.up45-hero') || document.querySelector('main');
  if (!anchor || !anchor.parentNode) return;
  const root = document.createElement('section');
  root.id = id;
  root.setAttribute('aria-labelledby', 'tsz-up207-heading');
  root.setAttribute('dir', 'ltr');
  root.innerHTML = `
    <div class="up207-top"><span class="up207-mark">UNIT PRICE / LIVE COMPARISON LAB</span><span class="up207-demo" data-up207-t="demo">INTERACTIVE EXAMPLE · FICTIONAL PRICES</span></div>
    <div class="up207-titleline">
      <div><p class="up207-kicker" data-up207-t="kicker">TWO DISCOUNTS. ONE DIFFERENT ANSWER.</p>
        <h2 id="tsz-up207-heading"><span data-up207-t="heading1">One more discount.</span> <em data-up207-t="heading2">Different winner.</em></h2>
        <p class="up207-intro" data-up207-t="intro">A cheaper-looking pack can lose on price per kg. Add a second discount and watch the decision change.</p>
      </div>
      <div class="up207-switches">
        <label><span data-up207-t="language">LANGUAGE</span><select id="tsz-up207-language" aria-label="Demo language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label>
        <label><span data-up207-t="region">APP STORE REGION</span><select id="tsz-up207-country" aria-label="App Store region"><option value="us">US</option><option value="jp">JP</option></select></label>
      </div>
    </div>
    <div class="up207-layout">
      <div class="up207-cards" role="group" aria-label="Two example products">
        <article class="up207-product" id="tsz-up207-product-a" data-winner="false">
          <span class="up207-number">OPTION A / 01</span>
          <div class="up207-packart"><span class="up207-pouch"></span><i>750g</i></div>
          <h3 class="up207-cardhead" data-up207-t="aTitle">Smaller pack</h3><p class="up207-cardmeta">750 g</p>
          <div class="up207-priceline"><span data-up207-t="shelf">Shelf price</span> <b id="tsz-up207-shelf-a">$9.00</b></div>
          <div class="up207-priceline"><span data-up207-t="first">First discount</span> <span class="up207-tag">−10%</span></div>
          <div class="up207-priceline"><span data-up207-t="extra">Extra discount</span> <span class="up207-tag" id="tsz-up207-extra">0%</span></div>
          <div class="up207-pricelabel" data-up207-t="unit">Final price per kg · incl. 8% tax</div>
          <div class="up207-unitprice" aria-live="polite"><span id="tsz-up207-price-a">$11.66</span><small>/ kg</small></div>
          <div class="up207-winnerflag" id="tsz-up207-win-a"></div>
        </article>
        <article class="up207-product" id="tsz-up207-product-b" data-winner="true">
          <span class="up207-number">OPTION B / 02</span>
          <div class="up207-packart up207-packart--b"><span class="up207-pouch"></span><i>1kg</i></div>
          <h3 class="up207-cardhead" data-up207-t="bTitle">Larger pack</h3><p class="up207-cardmeta">1,000 g</p>
          <div class="up207-priceline"><span data-up207-t="shelf">Shelf price</span> <b id="tsz-up207-shelf-b">$10.50</b></div>
          <div class="up207-priceline"><span data-up207-t="first">First discount</span> <span class="up207-tag">0%</span></div>
          <div class="up207-priceline"><span data-up207-t="extra">Extra discount</span> <span class="up207-tag">0%</span></div>
          <div class="up207-pricelabel" data-up207-t="unit">Final price per kg · incl. 8% tax</div>
          <div class="up207-unitprice" aria-live="polite"><span id="tsz-up207-price-b">$11.34</span><small>/ kg</small></div>
          <div class="up207-winnerflag" id="tsz-up207-win-b"></div>
        </article>
      </div>
      <div class="up207-console">
        <div class="up207-consolelabel" data-up207-t="verdict">THE LOWER UNIT PRICE</div>
        <p class="up207-decision" id="tsz-up207-decision" aria-live="polite">Option B wins</p>
        <p class="up207-savings" id="tsz-up207-savings" aria-live="polite">Save $0.32 per kg with the larger pack.</p>
        <button type="button" class="up207-toggle" id="tsz-up207-toggle" aria-pressed="false">Apply another 10% to A</button>
        <button type="button" class="up207-reset" id="tsz-up207-reset" data-up207-t="reset">Reset the comparison</button>
        <div class="up207-formula"><div class="up207-formula-label" data-up207-t="formula">HOW A IS CALCULATED</div><div class="up207-math" id="tsz-up207-math">$9.00 × 0.90 × 1.00 × 1.08 ÷ 0.75 kg</div><div class="up207-explanation" id="tsz-up207-explanation">Two 10% discounts mean 19% off, not 20%.</div></div>
      </div>
    </div>
    <div class="up207-footer"><p class="up207-note" data-up207-t="disclaimer">Fictional prices and an illustrative calculation—not live offers or a screenshot of the app. Confirm tax and discount rules before buying.</p>
      <a class="up207-link" id="tsz-up207-store" href="https://apps.apple.com/us/app/id6804760060" target="_blank" rel="noopener noreferrer" data-up207-t="store">View UnitPrice on App Store ↗</a>
    </div>`;
  if (anchor.classList.contains('up45-bread')) anchor.after(root);
  else anchor.before(root);
  const q = (suffix) => root.querySelector('#tsz-up207-' + suffix);
  const text = {
    en: {demo:'INTERACTIVE EXAMPLE · FICTIONAL PRICES',kicker:'TWO DISCOUNTS. ONE DIFFERENT ANSWER.',heading1:'One more discount.',heading2:'Different winner.',intro:'A cheaper-looking pack can lose on price per kg. Add a second discount and watch the decision change.',language:'LANGUAGE',region:'APP STORE REGION',aTitle:'Smaller pack',bTitle:'Larger pack',shelf:'Shelf price',first:'First discount',extra:'Extra discount',unit:'Final price per kg · incl. 8% tax',verdict:'THE LOWER UNIT PRICE',awins:'Option A wins',bwins:'Option B wins',save:(amount,which)=>`Save ${amount} per kg with the ${which === 'a'?'smaller':'larger'} pack.`,apply:'Apply another 10% to A',remove:'Remove the extra 10%',reset:'Reset the comparison',formula:'HOW A IS CALCULATED',explainOff:'The second 10% discount is not applied yet.',explainOn:'Two 10% discounts mean 19% off, not 20%.',win:'BETTER PER KG',disclaimer:'Fictional prices and an illustrative calculation—not live offers or an app screenshot. Confirm tax and discount rules before buying.',store:'View UnitPrice on App Store ↗'},
    ja: {demo:'操作できるサンプル · 架空の価格',kicker:'割引を重ねると、答えが変わる。',heading1:'もう10%引くと、',heading2:'安い方が逆転する。',intro:'見た目の安さではなく、1kg当たりの実質価格で比較。追加割引を入れて結果の変化を確かめよう。',language:'言語',region:'APP STORE地域',aTitle:'小さめパック',bTitle:'大きめパック',shelf:'店頭価格',first:'1回目の割引',extra:'2回目の割引',unit:'税込・1kg当たりの実質価格（税8%）',verdict:'単価が安いのは',awins:'Aの方がお得',bwins:'Bの方がお得',save:(amount,which)=>`1kg当たり${amount}、${which === 'a'?'小さめ':'大きめ'}パックがお得。`,apply:'Aをさらに10%引きにする',remove:'追加の10%引きを外す',reset:'比較をリセット',formula:'Aの計算過程',explainOff:'2回目の10%引きは、まだ適用されていません。',explainOn:'10%引き×2回は、合計20%ではなく19%引き。',win:'1kg当たり最安',disclaimer:'価格は架空の例です。実際の販売価格・アプリ画面ではありません。割引条件や税額は購入前にご確認ください。',store:'App StoreでUnitPriceを見る ↗'},
    ar: {demo:'مثال تفاعلي · أسعار افتراضية',kicker:'خصمان يغيّران النتيجة.',heading1:'خصم إضافي.',heading2:'فائز مختلف.',intro:'قارن سعر الكيلوغرام الحقيقي، لا سعر العبوة وحده. أضف خصماً ثانياً لترى الفرق.',language:'اللغة',region:'منطقة المتجر',aTitle:'العبوة الأصغر',bTitle:'العبوة الأكبر',shelf:'سعر العبوة',first:'الخصم الأول',extra:'خصم إضافي',unit:'السعر لكل كغ · شامل ضريبة 8%',verdict:'السعر الأقل لكل كغ',awins:'الخيار A أوفر',bwins:'الخيار B أوفر',save:(amount,which)=>`وفّر ${amount} لكل كغ باختيار العبوة ${which === 'a'?'الأصغر':'الأكبر'}.`,apply:'أضف خصماً آخر 10% إلى A',remove:'أزل الخصم الإضافي',reset:'إعادة المقارنة',formula:'طريقة حساب A',explainOff:'الخصم الثاني 10% غير مطبّق بعد.',explainOn:'خصمان بنسبة 10% يساويان تخفيضاً 19%، وليس 20%.',win:'الأوفر لكل كغ',disclaimer:'أسعار افتراضية للشرح فقط، وليست عروضاً حقيقية أو صورة من التطبيق. تحقّق من الضرائب وشروط الخصم.',store:'عرض UnitPrice في App Store ↗'}
  };
  const state = { language:'en', region:'us', extra:false };
  const langControl = q('language');
  const countryControl = q('country');
  const sharedLang = document.getElementById('p199-language');
  const sharedCountry = document.getElementById('p199-country');
  function langValue(value){const v=String(value||'').toLowerCase();return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en';}
  function regionValue(value){return String(value||'').toLowerCase()==='jp'?'jp':'us';}
  state.language=langValue(sharedLang?.value);
  state.region=regionValue(sharedCountry?.value);
  const money = (value) => state.region === 'jp'
    ? '¥' + (value*100).toLocaleString('ja-JP',{minimumFractionDigits:2,maximumFractionDigits:2})
    : '$' + value.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  function render(){
    const t=text[state.language];root.setAttribute('dir',state.language==='ar'?'rtl':'ltr');root.setAttribute('lang',state.language);
    langControl.value=state.language;countryControl.value=state.region;
    root.querySelectorAll('[data-up207-t]').forEach(el=>{const key=el.getAttribute('data-up207-t');if(typeof t[key]==='string')el.textContent=t[key];});
    const priceA=9*.90*(state.extra?.90:1)*1.08/.75;
    const priceB=10.5*1.08;
    const winner=priceA < priceB?'a':'b';
    q('shelf-a').textContent=money(9);q('shelf-b').textContent=money(10.5);
    q('price-a').textContent=money(priceA);q('price-b').textContent=money(priceB);
    q('extra').textContent=state.extra?'−10%':'0%';
    q('product-a').dataset.winner=String(winner==='a');q('product-b').dataset.winner=String(winner==='b');
    q('win-a').textContent=winner==='a'?t.win:'';q('win-b').textContent=winner==='b'?t.win:'';
    q('decision').textContent=winner==='a'?t.awins:t.bwins;
    q('savings').textContent=t.save(money(Math.abs(priceA-priceB)),winner);
    q('toggle').setAttribute('aria-pressed',String(state.extra));q('toggle').textContent=state.extra?t.remove:t.apply;
    q('math').textContent=`${money(9)} × 0.90 × ${state.extra?'0.90':'1.00'} × 1.08 ÷ 0.75 kg`;
    q('explanation').textContent=state.extra?t.explainOn:t.explainOff;
    q('store').href=`https://apps.apple.com/${state.region}/app/id6804760060`;
  }
  langControl.addEventListener('change',()=>{
    state.language=langValue(langControl.value);
    if(sharedLang){
      const match=Array.from(sharedLang.options).find(option=>langValue(option.value)===state.language);
      if(match && sharedLang.value!==match.value){
        sharedLang.value=match.value;
        sharedLang.dispatchEvent(new Event('change',{bubbles:true}));
      }
    }
    render();
  });
  countryControl.addEventListener('change',()=>{
    state.region=regionValue(countryControl.value);
    if(sharedCountry){
      const match=Array.from(sharedCountry.options).find(option=>String(option.value).toLowerCase()===state.region);
      if(match && sharedCountry.value!==match.value){
        sharedCountry.value=match.value;
        sharedCountry.dispatchEvent(new Event('change',{bubbles:true}));
      }
    }
    render();
  });
  if(sharedLang)sharedLang.addEventListener('change',()=>{state.language=langValue(sharedLang.value);render();});
  if(sharedCountry)sharedCountry.addEventListener('change',()=>{state.region=regionValue(sharedCountry.value);render();});
  q('toggle').addEventListener('click',()=>{state.extra=!state.extra;render();});
  q('reset').addEventListener('click',()=>{state.extra=false;render();});
  render();
})();
