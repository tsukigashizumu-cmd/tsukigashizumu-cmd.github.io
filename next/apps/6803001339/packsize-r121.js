/* TSZ LP R121 — Pack Size Price Compare | website-only buying-quantity example.
 * Invented price units; no analytics, network calls, cookies, persistence or app data.
 * Existing R41 and R83 modules are not modified. */
(() => {
  'use strict';
  const APP_ID = '6803001339';
  const INITIAL = Object.freeze({ need: '350', smallG: '400', smallPrice: '2.50', bigG: '1000', bigPrice: '5.50' });
  const translations = {
    en: {
      eyebrow:'THE SECOND QUESTION', pill:'INTERACTIVE LP EXAMPLE', title:'Cheaper per gram. But cheaper for what you need?',
      lead:'Unit price tells one story. Change how much you actually need to see how many whole packs you would buy, what you would pay, and what would be left over.',
      amount:'How much do you need?', grams:'grams', regular:'REGULAR PACK', bulk:'BULK PACK', contents:'Contents (g)', price:'Price / pack',
      unit:'Price per 100g', quantity:'Whole packs to buy', total:'Checkout cost', left:'Left over',
      winnerUnit:'Lowest unit price', winnerTotal:'Lowest checkout cost', summary:'What changes?',
      less:'Need 350g', more:'Need 900g', reset:'Reset example', ties:'Tie',
      why:'The bulk pack is cheaper per gram, but the regular pack costs less when you only need a little.',
      smallWin:'The regular pack costs less to meet your requested amount.', bigWin:'The bulk pack costs less to meet your requested amount.', equal:'Both options cost the same for this amount.',
      error:'Enter positive amounts and prices. Keep amounts at or below 1,000,000 g and prices at or below 1,000,000.',
      note:'A website-only illustration, not an app screen or an extra app feature. All prices use invented currency units. Whole packs are rounded up; tax, discounts, spoilage, storage, and mixing packs are excluded. Nothing is saved or sent.'
    },
    ja: {
      eyebrow:'もうひとつの比較', pill:'LP専用・操作できる説明例', title:'単価が安い。でも、必要な量では？',
      lead:'100gあたりの単価だけでは、買うときの支払額は決まりません。必要量を変えて、買う袋数・支払額・余りを比べてみましょう。',
      amount:'必要な量', grams:'グラム', regular:'通常パック', bulk:'大容量パック', contents:'内容量 (g)', price:'1袋の価格',
      unit:'100gあたり', quantity:'必要な袋数', total:'購入額', left:'余る量',
      winnerUnit:'単価が安い方', winnerTotal:'購入額が安い方', summary:'どう違う？',
      less:'350g必要', more:'900g必要', reset:'初期値に戻す', ties:'同額',
      why:'大袋は100gあたりの単価が安くても、少量しか必要ないなら通常パックのほうが支払額は少なくなります。',
      smallWin:'必要量を満たす購入額は通常パックのほうが安くなります。', bigWin:'必要量を満たす購入額は大容量パックのほうが安くなります。', equal:'今回の必要量では購入額は同じです。',
      error:'必要量・内容量・価格には0より大きい数値を入力してください。量は100万g以下、価格は100万以下にしてください。',
      note:'LP専用の説明デモであり、アプリの実画面や追加機能ではありません。価格は架空の通貨単位です。袋数は切り上げ計算。税・割引・保存条件・廃棄・混合購入は考慮しません。入力は保存・送信されません。'
    },
    ar: {
      eyebrow:'السؤال الثاني', pill:'مثال تفاعلي للموقع فقط', title:'أرخص لكل غرام، لكن هل هو الأرخص لاحتياجك؟',
      lead:'سعر الوحدة لا يروي القصة كاملة. غيّر الكمية المطلوبة لمعرفة عدد العبوات الكاملة والتكلفة وما يتبقى.',
      amount:'الكمية المطلوبة', grams:'غرام', regular:'العبوة العادية', bulk:'العبوة الكبيرة', contents:'المحتوى (غ)', price:'سعر العبوة',
      unit:'السعر لكل 100 غ', quantity:'عدد العبوات', total:'تكلفة الشراء', left:'الكمية المتبقية',
      winnerUnit:'الأقل في سعر الوحدة', winnerTotal:'الأقل في تكلفة الشراء', summary:'ما الفرق؟',
      less:'أحتاج 350 غ', more:'أحتاج 900 غ', reset:'إعادة المثال', ties:'تعادل',
      why:'العبوة الكبيرة أرخص لكل غرام، لكن العادية تتطلب إنفاقاً أقل إذا احتجت كمية صغيرة.',
      smallWin:'العبوة العادية أقل تكلفة لتلبية حاجتك.', bigWin:'العبوة الكبيرة أقل تكلفة لتلبية حاجتك.', equal:'التكلفة متساوية لهذه الكمية.',
      error:'أدخل كميات وأسعاراً أكبر من الصفر. الحد الأقصى للكمية 1,000,000 غ وللسعر 1,000,000.',
      note:'مثال توضيحي للموقع فقط، وليس شاشة للتطبيق أو ميزة إضافية فيه. الأسعار بوحدات نقدية افتراضية. يتم تقريب عدد العبوات إلى الأعلى، من دون الضرائب أو الخصومات أو التلف أو خلط العبوات. لا تُحفظ البيانات أو تُرسل.'
    }
  };
  function locale() {
    const raw = document.getElementById('p199-language')?.value || document.documentElement.lang || 'en';
    const l = String(raw).toLowerCase().split(/[-_]/)[0];
    return Object.hasOwn(translations, l) ? l : 'en';
  }
  function mount() {
    const body = document.body;
    if (!body || (body.dataset.p199Id !== APP_ID && body.dataset.p19AppId !== APP_ID)) return;
    const anchor = document.getElementById('tsz-ps83') || document.getElementById('overview');
    if (!anchor || document.getElementById('tsz-ps121')) return;
    const root = document.createElement('section');
    root.id = 'tsz-ps121';
    root.dataset.illustration = 'website-only-not-app-feature';
    root.setAttribute('aria-label', 'Purchase-quantity comparison example');
    root.innerHTML = `
      <div class="ps121-headingline"><span data-t="eyebrow"></span><span class="ps121-pill" data-t="pill"></span></div>
      <div class="ps121-intro"><h2 data-t="title"></h2><p data-t="lead"></p></div>
      <div class="ps121-needs"><label for="ps121-need"><span data-t="amount"></span> <span class="ps121-micro" data-t="grams"></span></label>
        <div class="ps121-needline"><input id="ps121-need" data-field="need" inputmode="decimal" type="number" min="0.01" max="1000000" step="any" value="350">
          <div class="ps121-presets"><button type="button" data-preset="350" data-t="less"></button><button type="button" data-preset="900" data-t="more"></button></div>
        </div></div>
      <div class="ps121-cards">
        <article class="ps121-card" data-option="small"><div class="ps121-cardtitle"><span class="ps121-index">01</span><h3 data-t="regular"></h3></div>
          <div class="ps121-fields"><label><span data-t="contents"></span><input type="number" inputmode="decimal" min="0.01" max="1000000" step="any" data-field="smallG" value="400"></label>
          <label><span data-t="price"></span><input type="number" inputmode="decimal" min="0.01" max="1000000" step="any" data-field="smallPrice" value="2.50"></label></div>
          <div class="ps121-unit"><span data-t="unit"></span><strong data-out="smallUnit"></strong></div>
          <div class="ps121-facts"><div><span data-t="quantity"></span><strong data-out="smallPacks"></strong></div><div><span data-t="total"></span><strong data-out="smallTotal"></strong></div><div><span data-t="left"></span><strong data-out="smallLeft"></strong></div></div>
        </article>
        <article class="ps121-card" data-option="big"><div class="ps121-cardtitle"><span class="ps121-index">02</span><h3 data-t="bulk"></h3></div>
          <div class="ps121-fields"><label><span data-t="contents"></span><input type="number" inputmode="decimal" min="0.01" max="1000000" step="any" data-field="bigG" value="1000"></label>
          <label><span data-t="price"></span><input type="number" inputmode="decimal" min="0.01" max="1000000" step="any" data-field="bigPrice" value="5.50"></label></div>
          <div class="ps121-unit"><span data-t="unit"></span><strong data-out="bigUnit"></strong></div>
          <div class="ps121-facts"><div><span data-t="quantity"></span><strong data-out="bigPacks"></strong></div><div><span data-t="total"></span><strong data-out="bigTotal"></strong></div><div><span data-t="left"></span><strong data-out="bigLeft"></strong></div></div>
        </article>
      </div>
      <div class="ps121-verdict" data-winner="small"><div class="ps121-verdicthead"><div><span data-t="winnerUnit"></span><strong data-out="unitWinner"></strong></div><div><span data-t="winnerTotal"></span><strong data-out="totalWinner"></strong></div></div><div class="ps121-reason"><span data-t="summary"></span><p role="status" aria-live="polite" data-out="message"></p></div></div>
      <div class="ps121-actions"><button class="ps121-reset" type="button" data-reset data-t="reset"></button></div>
      <p class="ps121-footnote" data-t="note"></p>`;
    anchor.insertAdjacentElement('afterend', root);
    const field = name => root.querySelector(`[data-field="${name}"]`);
    const output = (name, val) => { root.querySelector(`[data-out="${name}"]`).textContent = val; };
    const fmt = (value, digits=2) => new Intl.NumberFormat(
      locale()==='ja'?'ja-JP':locale()==='ar'?'ar-EG':'en-US',
      {minimumFractionDigits:digits,maximumFractionDigits:digits,maximumSignificantDigits:undefined}
    ).format(value);
    const valid = n => Number.isFinite(n) && n>0 && n<=1e6;
    let prevLang = '';
    function translate() {
      const lang=locale(), t=translations[lang];
      root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.dataset.t]||'';});
      prevLang=lang;
    }
    function render() {
      translate();
      const t=translations[locale()];
      const n=Number(field('need').value), a=Number(field('smallG').value), b=Number(field('bigG').value), pa=Number(field('smallPrice').value), pb=Number(field('bigPrice').value);
      if (![n,a,b,pa,pb].every(valid) || [field('need'),field('smallG'),field('bigG'),field('smallPrice'),field('bigPrice')].some(el=>el.value.trim()==='')) {
        root.querySelector('.ps121-verdict').dataset.winner='error';
        for(const key of ['smallUnit','bigUnit','smallPacks','bigPacks','smallTotal','bigTotal','smallLeft','bigLeft','unitWinner','totalWinner']) output(key,'—');
        output('message',t.error);
        return;
      }
      const unitA=pa*100/a,unitB=pb*100/b;
      const countA=Math.ceil(n/a-1e-12),countB=Math.ceil(n/b-1e-12);
      const totalA=countA*pa,totalB=countB*pb;
      const remainA=Math.max(0,countA*a-n),remainB=Math.max(0,countB*b-n);
      const unitWinner=Math.abs(unitA-unitB)<1e-9?'equal':unitA<unitB?'small':'big';
      const totalWinner=Math.abs(totalA-totalB)<1e-9?'equal':totalA<totalB?'small':'big';
      const winLabel=v=>v==='small'?t.regular:v==='big'?t.bulk:t.ties;
      output('smallUnit',fmt(unitA));output('bigUnit',fmt(unitB));
      output('smallPacks',fmt(countA,0));output('bigPacks',fmt(countB,0));
      output('smallTotal',fmt(totalA));output('bigTotal',fmt(totalB));
      output('smallLeft',fmt(remainA,1)+' g');output('bigLeft',fmt(remainB,1)+' g');
      output('unitWinner',winLabel(unitWinner));output('totalWinner',winLabel(totalWinner));
      root.querySelector('.ps121-verdict').dataset.winner=totalWinner;
      const reason=totalWinner==='small'?t.smallWin:totalWinner==='big'?t.bigWin:t.equal;
      output('message',unitWinner!==totalWinner && unitWinner==='big' && totalWinner==='small'?t.why:reason);
    }
    root.querySelectorAll('input').forEach(el=>{el.addEventListener('input',render);el.addEventListener('change',render);});
    root.querySelectorAll('[data-preset]').forEach(button=>button.addEventListener('click',()=>{field('need').value=button.dataset.preset;render();}));
    root.querySelector('[data-reset]').addEventListener('click',()=>{Object.entries(INITIAL).forEach(([k,v])=>field(k).value=v);render();});
    document.getElementById('p199-language')?.addEventListener('change',render);
    new MutationObserver(()=>{if(locale()!==prevLang)render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
