/* TSZ LP R125 — Unit Price / sequential discount + tax flip.
 * Website-only calculator; independent of the iOS app. In-memory only; no requests/storage. */
(() => {
  'use strict';
  const APP_ID = '6804760060';
  const TEXT = {
    en: {
      eyebrow:'LOOK PAST THE STICKER PRICE',badge:'INTERACTIVE WEBSITE EXAMPLE',
      title:'Two discounts. Tax. One fair unit price.',
      lead:'A 10% discount followed by 5% is not one 15% discount. Try the second coupon, then compare both products per 100 g after discounts and tax.',
      a:'OPTION A · SMALL PACK',b:'OPTION B · LARGE PACK',price:'Shelf price',grams:'Pack weight (g)',first:'First discount (%)',second:'Second discount (%)',tax:'Sales tax (%)',
      promo:'Give B a 10% coupon',reset:'Reset example',summary:'THE REAL COMPARISON',adjusted:'After discounts + tax',per100:'Price per 100 g',
      winner:'Better unit price',savings:'Saved per 100 g',diff:'Difference',aWins:'A is cheaper per 100 g',bWins:'B is cheaper per 100 g',tie:'Equal unit price',
      invalid:'Enter valid prices, weights, discounts (0–100%) and tax (0–100%). A weight must be greater than zero.',
      explainer:'Calculation: shelf price × (1 − first discount) × (1 − second discount) × (1 + tax), then ÷ weight × 100. Discounts are sequential, not added.',
      note:'This is a simplified website-only illustration—not an app screen, tax advice, or a checkout quote. The app supports two percentage discounts, separate tax rates, and compatible-unit comparisons. Store rules and discount eligibility can differ. No information is saved or sent.'
    },
    ja: {
      eyebrow:'値札だけで、決めない',badge:'LP専用・操作デモ',
      title:'2回の割引と税金。最後は100g単価で比べる。',
      lead:'10%引きのあとに5%引きは、15%引きとは違います。大容量の方にクーポンを入れて、割引と税金のあとで勝つのはどちらか試してみてください。',
      a:'商品A · 小さいパック',b:'商品B · 大きいパック',price:'表示価格',grams:'内容量（g）',first:'1回目の割引（%）',second:'2回目の割引（%）',tax:'税率（%）',
      promo:'Bに10%クーポンを適用',reset:'初期値に戻す',summary:'会計条件を揃えて比較',adjusted:'割引・税込みの金額',per100:'100gあたり',
      winner:'どちらが割安？',savings:'100gあたりの差額',diff:'単価差',aWins:'商品Aの方が割安',bWins:'商品Bの方が割安',tie:'単価は同じ',
      invalid:'価格・内容量・割引・税率を確認してください。内容量は0より大きく、割引と税率は0〜100%で入力してください。',
      explainer:'計算方法：表示価格 ×（1−割引①）×（1−割引②）×（1＋税率）÷ 内容量 × 100。割引率は足し算しません。',
      note:'これはLP専用の説明用シミュレーションで、アプリの実画面・税務上の説明・店舗の会計金額ではありません。アプリ本体には2段階の割合割引、個別税率、対応単位での比較があります。店舗ごとの適用条件は確認してください。入力は保存・送信されません。'
    },
    ar: {
      eyebrow:'لا تحكم من بطاقة السعر وحدها',badge:'مثال تفاعلي على الموقع فقط',
      title:'خصمان وضريبة. قارن سعر كل 100 غرام.',
      lead:'خصم 10% ثم 5% لا يساوي خصماً واحداً بنسبة 15%. جرّب قسيمة للعبوة الأكبر، وقارن السعر النهائي لكل 100 غرام.',
      a:'الخيار أ · عبوة صغيرة',b:'الخيار ب · عبوة كبيرة',price:'السعر المعلن',grams:'الوزن (غرام)',first:'الخصم الأول (%)',second:'الخصم الثاني (%)',tax:'الضريبة (%)',
      promo:'أضف خصم 10% للخيار ب',reset:'إعادة المثال',summary:'مقارنة عادلة',adjusted:'السعر بعد الخصم والضريبة',per100:'السعر لكل 100 غرام',
      winner:'الأقل سعراً لكل وحدة',savings:'التوفير لكل 100 غرام',diff:'فرق السعر',aWins:'الخيار أ أوفر لكل 100 غرام',bWins:'الخيار ب أوفر لكل 100 غرام',tie:'السعر للوحدة متساوٍ',
      invalid:'أدخل أسعاراً وأوزاناً صالحة. يجب أن يزيد الوزن عن صفر وأن تكون الخصومات والضريبة من 0 إلى 100%.',
      explainer:'الحساب: السعر × (1−الخصم الأول) × (1−الخصم الثاني) × (1+الضريبة) ÷ الوزن × 100. الخصمان متتاليان ولا يُجمعان.',
      note:'هذا مثال توضيحي على الموقع، وليس شاشة التطبيق أو فاتورة حقيقية. يدعم التطبيق خصمين مئويين وضريبة منفصلة ومقارنة وحدات متوافقة. تحقق من شروط المتجر. لا يتم حفظ المدخلات أو إرسالها.'
    }
  };
  const INITIAL = {
    a: { price:4.8, grams:400, first:10, second:5, tax:8 },
    b: { price:8, grams:700, first:0, second:0, tax:0 }
  };
  function language(){
    const value=document.getElementById('p199-language')?.value || document.documentElement.lang || 'en';
    const lang=String(value).toLowerCase().split(/[-_]/)[0];
    return TEXT[lang] ? lang : 'en';
  }
  function money(n,locale){
    return new Intl.NumberFormat(locale==='ja'?'ja-JP':locale==='ar'?'ar-EG':'en-US', {maximumFractionDigits:3,minimumFractionDigits:2,useGrouping:true}).format(n);
  }
  function mount(){
    if (document.getElementById('tsz-up125')) return;
    const body=document.body;
    if(!body)return;
    const id=body.dataset.p199Id||body.dataset.p19AppId||'';
    if(id && id!==APP_ID)return;
    if(!id && !document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor=document.getElementById('tsz-up87')||document.getElementById('tsz-up45')||document.getElementById('overview');
    const main=document.querySelector('main');
    if(!anchor && !main)return;
    const root=document.createElement('section');
    root.id='tsz-up125';root.dataset.illustration='website-only-tax-and-discount-unit-price';
    root.setAttribute('aria-label','Two sequential discounts and tax: unit price comparison example');
    const fields=(option)=>`<div class="up125-fields">
      <label><span data-i="price"></span><input data-field="${option}-price" type="number" inputmode="decimal" min="0" max="10000000" step="0.01" required></label>
      <label><span data-i="grams"></span><input data-field="${option}-grams" type="number" inputmode="decimal" min="0.001" max="10000000" step="any" required></label>
      <label><span data-i="first"></span><input data-field="${option}-first" type="number" inputmode="decimal" min="0" max="100" step="any" required></label>
      <label><span data-i="second"></span><input data-field="${option}-second" type="number" inputmode="decimal" min="0" max="100" step="any" required></label>
      <label><span data-i="tax"></span><input data-field="${option}-tax" type="number" inputmode="decimal" min="0" max="100" step="any" required></label>
    </div>`;
    root.innerHTML=`<div class="up125-head"><span data-i="eyebrow"></span><span data-i="badge"></span></div>
      <h2 data-i="title"></h2><p class="up125-lead" data-i="lead"></p>
      <div class="up125-options">
        <div class="up125-card"><h3 data-i="a"></h3>${fields('a')}</div>
        <div class="up125-card"><h3 data-i="b"></h3>${fields('b')}</div>
      </div>
      <div class="up125-actions"><button type="button" data-promo data-i="promo"></button><button type="button" data-reset data-i="reset"></button></div>
      <div class="up125-result" aria-live="polite">
        <div class="up125-result-head" data-i="summary"></div>
        <div class="up125-totals"><div><span data-i="a"></span><span data-i="adjusted"></span><strong data-out="a-total"></strong><span data-i="per100"></span><b data-out="a-unit"></b></div>
        <div><span data-i="b"></span><span data-i="adjusted"></span><strong data-out="b-total"></strong><span data-i="per100"></span><b data-out="b-unit"></b></div></div>
        <div class="up125-winner"><span data-i="winner"></span><strong data-out="winner"></strong><span data-i="savings"></span><b data-out="delta"></b></div>
        <p data-out="error" class="up125-error" role="status" hidden></p>
      </div>
      <p class="up125-explainer" data-i="explainer"></p><p class="up125-note" data-i="note"></p>`;
    if(anchor)anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    const field=(id)=>root.querySelector(`[data-field="${id}"]`);
    const output=(id,text)=>{root.querySelector(`[data-out="${id}"]`).textContent=String(text);};
    const setDefaults=()=>{for(const group of ['a','b'])for(const [key,value] of Object.entries(INITIAL[group]))field(group+'-'+key).value=String(value);};
    function calc(group){
      const raw={};
      for(const part of ['price','grams','first','second','tax']){
        const input=field(group+'-'+part);const n=Number(input.value);
        if(input.value.trim()==='' || !Number.isFinite(n))return null;
        raw[part]=n;
      }
      if(raw.price<0||raw.price>1e7||raw.grams<=0||raw.grams>1e7||
         raw.first<0||raw.first>100||raw.second<0||raw.second>100||raw.tax<0||raw.tax>100)return null;
      const adjusted=raw.price*(1-raw.first/100)*(1-raw.second/100)*(1+raw.tax/100);
      const unit=adjusted/raw.grams*100;
      if(!Number.isFinite(unit))return null;
      return {adjusted,unit};
    }
    let lastLanguage='';
    function render(){
      const lang=language(),t=TEXT[lang];root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-i]').forEach(el=>{el.textContent=t[el.dataset.i]||'';});
      const a=calc('a'),b=calc('b'),error=root.querySelector('[data-out="error"]');
      if(!a||!b){
        for(const key of ['a-total','b-total','a-unit','b-unit','winner','delta'])output(key,'—');
        error.textContent=t.invalid;error.hidden=false;lastLanguage=lang;return;
      }
      error.hidden=true;error.textContent='';
      output('a-total',money(a.adjusted,lang));output('b-total',money(b.adjusted,lang));
      output('a-unit',money(a.unit,lang));output('b-unit',money(b.unit,lang));
      const difference=Math.abs(a.unit-b.unit);
      output('winner',difference<0.0000001?t.tie:a.unit<b.unit?t.aWins:t.bWins);
      output('delta',money(difference,lang));
      root.dataset.winner=difference<0.0000001?'tie':a.unit<b.unit?'a':'b';
      lastLanguage=lang;
    }
    root.querySelectorAll('[data-field]').forEach(el=>el.addEventListener('input',render));
    root.querySelector('[data-promo]').addEventListener('click',()=>{field('b-second').value='10';render();});
    root.querySelector('[data-reset]').addEventListener('click',()=>{setDefaults();render();});
    document.getElementById('p199-language')?.addEventListener('change',render);
    if(typeof MutationObserver==='function')new MutationObserver(()=>{if(language()!==lastLanguage)render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    setDefaults();render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
