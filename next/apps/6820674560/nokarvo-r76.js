/* TSZ LP R76 Nokarvo / price-per-usable-amount illustration. Not an app screen. */
(() => {
  'use strict';
  const APP_ID = '6820674560';
  const STRINGS = {
    en: {
      eyebrow:'A BETTER PRICE IS NOT ALWAYS A BETTER DEAL', heading:'What if the cheaper pack gives you less?',
      lead:'Compare two purchases by the amount you can actually use. Change the numbers and watch the better deal flip.',
      demo:'LIVE EXAMPLE', a:'OPTION A', b:'OPTION B', price:'Pack price', amount:'Pack quantity (g)', loss:'Unused portion (%)',
      bought:'Shelf price / 100 g', usable:'Usable price / 100 g', usableAmount:'Actually usable', winnerShelf:'Shelf-price winner',
      winnerReal:'Usable-price winner', switch:'The better deal flips', stable:'Same winner before and after loss',
      tie:'These options are tied', invalid:'Enter valid prices, quantities and unused portions to compare.',
      savings:'Lower cost per usable 100 g', both:'Both options', reset:'Reset example',
      caveat:'Illustrative calculator, not an actual Nokarvo screen. Figures are examples in the same unnamed currency. Both products are compared in grams. Inputs are not stored, and this page does not estimate losses automatically.',
      aName:'A', bName:'B', none:'—', percent:'cheaper', number:'Price', unit:'per 100 g'
    },
    ja: {
      eyebrow:'表示単価が安くても、本当に得とは限らない', heading:'安い方ほど、捨てる量が多かったら？',
      lead:'買った量ではなく、実際に使える量で比較。数値を変えるとお得な方が逆転する様子を確かめられます。',
      demo:'操作サンプル', a:'商品 A', b:'商品 B', price:'購入価格', amount:'購入量（g）', loss:'使わない割合（%）',
      bought:'表示単価 / 100 g', usable:'可食・使用単価 / 100 g', usableAmount:'実際に使える量', winnerShelf:'表示単価で安い方',
      winnerReal:'使える量で安い方', switch:'安い方が逆転しました', stable:'比較結果は逆転していません',
      tie:'同じ単価です', invalid:'価格・購入量・使わない割合を正しく入力してください。',
      savings:'使える量100 gあたりの節約率', both:'両方', reset:'最初の例に戻す',
      caveat:'これは計算例であり、Nokarvoの実画面ではありません。金額は同じ通貨での例示です。両商品ともグラム単位で比較します。入力は保存されず、廃棄率の自動推定も行いません。',
      aName:'A', bName:'B', none:'—', percent:'お得', number:'価格', unit:'100 gあたり'
    },
    ar: {
      eyebrow:'السعر الظاهر الأقل ليس دائمًا الصفقة الأفضل', heading:'ماذا لو كان الجزء غير المستخدم أكبر؟',
      lead:'قارن ما تدفعه بما يمكنك استخدامه فعلًا. غيّر الأرقام وشاهد كيف تتبدل النتيجة.',
      demo:'مثال تفاعلي', a:'الخيار A', b:'الخيار B', price:'سعر العبوة', amount:'الكمية (غرام)', loss:'الجزء غير المستخدم (%)',
      bought:'سعر الرف لكل 100 غ', usable:'سعر القابل للاستخدام لكل 100 غ', usableAmount:'الكمية القابلة للاستخدام', winnerShelf:'الأرخص على الرف',
      winnerReal:'الأرخص بعد الفاقد', switch:'انقلبت الصفقة الأفضل', stable:'الاختيار الأفضل لم يتغير',
      tie:'السعر متساوٍ', invalid:'أدخل سعرًا وكمية ونسبة فاقد صالحة للمقارنة.',
      savings:'التوفير لكل 100 غ قابل للاستخدام', both:'كلاهما', reset:'إعادة المثال',
      caveat:'هذه حاسبة توضيحية وليست شاشة حقيقية من Nokarvo. الأسعار بعملة واحدة غير مسماة، والكميات بالغرام. لا تُحفَظ المدخلات، ولا يقدّر هذا المثال الفاقد تلقائيًا.',
      aName:'A', bName:'B', none:'—', percent:'أقل تكلفة', number:'سعر', unit:'لكل 100 غ'
    }
  };
  const DEFAULT = [{price:300,amount:1000,loss:40},{price:390,amount:1000,loss:10}];
  function lang(){
    const sel = document.getElementById('p199-language');
    return String(sel?.value || document.documentElement.lang || 'en').toLowerCase().split(/[-_]/)[0];
  }
  function locale(){return STRINGS[lang()] ? lang() : 'en';}
  function copy(){return STRINGS[locale()];}
  function choose(a,b){const epsilon = 1e-9; return Math.abs(a-b)<=epsilon ? '=' : a<b ? 'A':'B';}
  function fmt(value, digits=1){return Number(value).toLocaleString(locale()==='ja'?'ja-JP':locale()==='ar'?'ar-EG':'en-US', {minimumFractionDigits:digits, maximumFractionDigits:digits});}
  function mount(){
    const body=document.body;
    if(!body || (body.dataset.p199Id!==APP_ID && body.dataset.p19AppId!==APP_ID)) return;
    const overview=document.getElementById('overview');
    if(!overview || document.getElementById('tsz-nk76'))return;
    const root=document.createElement('section');root.id='tsz-nk76';root.className='tsz-nk76';
    root.setAttribute('data-illustration','not-an-app-screenshot');
    root.innerHTML=`
      <div class="nk76-top"><span class="nk76-eyebrow" data-copy="eyebrow"></span><span class="nk76-demo" data-copy="demo"></span></div>
      <div class="nk76-layout"><div class="nk76-intro"><h2 data-copy="heading"></h2><p data-copy="lead"></p>
      <div class="nk76-summary" aria-live="polite">
        <div class="nk76-tally"><div><span data-copy="winnerShelf"></span><strong data-out="shelfWinner">A</strong></div><div class="nk76-chevron" aria-hidden="true">→</div><div><span data-copy="winnerReal"></span><strong data-out="realWinner">B</strong></div></div>
        <p class="nk76-verdict" data-out="verdict"></p><p class="nk76-save" data-out="saving"></p>
      </div></div>
      <div class="nk76-panel"><div class="nk76-pair">
        <div class="nk76-product" data-option="0"><h3 data-copy="a"></h3><label><span data-copy="price"></span><input type="number" inputmode="decimal" min="0.01" max="10000000" step="any" data-field="price" value="300"></label><label><span data-copy="amount"></span><input type="number" inputmode="decimal" min="1" max="10000000" step="any" data-field="amount" value="1000"></label><label><span data-copy="loss"></span><input type="number" inputmode="decimal" min="0" max="99" step="1" data-field="loss" value="40"></label><div class="nk76-stats"><p><span data-copy="usableAmount"></span><b data-out="amount">600 g</b></p><p><span data-copy="bought"></span><b data-out="shelf">30.0</b></p><p class="nk76-usable"><span data-copy="usable"></span><b data-out="usable">50.0</b></p></div></div>
        <div class="nk76-product" data-option="1"><h3 data-copy="b"></h3><label><span data-copy="price"></span><input type="number" inputmode="decimal" min="0.01" max="10000000" step="any" data-field="price" value="390"></label><label><span data-copy="amount"></span><input type="number" inputmode="decimal" min="1" max="10000000" step="any" data-field="amount" value="1000"></label><label><span data-copy="loss"></span><input type="number" inputmode="decimal" min="0" max="99" step="1" data-field="loss" value="10"></label><div class="nk76-stats"><p><span data-copy="usableAmount"></span><b data-out="amount">900 g</b></p><p><span data-copy="bought"></span><b data-out="shelf">39.0</b></p><p class="nk76-usable"><span data-copy="usable"></span><b data-out="usable">43.3</b></p></div></div>
      </div><button type="button" class="nk76-reset" data-act="reset" data-copy="reset"></button></div></div>
      <p class="nk76-note" data-copy="caveat"></p>`;
    overview.insertAdjacentElement('afterend',root);
    const products=[...root.querySelectorAll('[data-option]')];
    function paint(){
      const t=copy(), l=locale();root.dir=l==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-copy]').forEach(el=>{const key=el.dataset.copy;if(Object.hasOwn(t,key))el.textContent=t[key];});
      const numbers=products.map(product=>{
        const read=(field)=>Number(product.querySelector(`[data-field="${field}"]`).value);
        const price=read('price'),amount=read('amount'),loss=read('loss');
        if(!Number.isFinite(price)||!Number.isFinite(amount)||!Number.isFinite(loss)||price<=0||price>1e7||amount<1||amount>1e7||loss<0||loss>99)return null;
        const qty=amount*(1-loss/100);
        return {qty,shelf:price*100/amount,usable:price*100/qty};
      });
      const outputs=root.querySelectorAll('[data-out]');
      if(numbers.includes(null)){
        products.forEach(p=>p.querySelectorAll('[data-out]').forEach(n=>n.textContent=t.none));
        root.querySelector('[data-out="shelfWinner"]').textContent=t.none;
        root.querySelector('[data-out="realWinner"]').textContent=t.none;
        root.querySelector('[data-out="verdict"]').textContent=t.invalid;
        root.querySelector('[data-out="saving"]').textContent='';root.dataset.flipped='false';return;
      }
      numbers.forEach((n,i)=>{
        const p=products[i];p.querySelector('[data-out="amount"]').textContent=`${fmt(n.qty,0)} g`;
        p.querySelector('[data-out="shelf"]').textContent=fmt(n.shelf);
        p.querySelector('[data-out="usable"]').textContent=fmt(n.usable);
      });
      const shelf=choose(numbers[0].shelf,numbers[1].shelf);
      const real=choose(numbers[0].usable,numbers[1].usable);
      const flip=shelf!==real && shelf!=='=' && real!=='=';
      root.dataset.flipped=flip?'true':'false';
      root.querySelector('[data-out="shelfWinner"]').textContent=shelf==='='?t.both:shelf;
      root.querySelector('[data-out="realWinner"]').textContent=real==='='?t.both:real;
      root.querySelector('[data-out="verdict"]').textContent=real==='='?t.tie:flip?t.switch:t.stable;
      const hi=Math.max(numbers[0].usable,numbers[1].usable),lo=Math.min(numbers[0].usable,numbers[1].usable);
      root.querySelector('[data-out="saving"]').textContent=real==='='?'':`${t.savings}: ${fmt((hi-lo)/hi*100)}% (${real})`;
    }
    products.forEach(p=>p.addEventListener('input',paint));
    root.querySelector('[data-act="reset"]').addEventListener('click',()=>{
      products.forEach((p,i)=>{for(const [key,v] of Object.entries(DEFAULT[i]))p.querySelector(`[data-field="${key}"]`).value=String(v);});paint();
    });
    document.getElementById('p199-language')?.addEventListener('change',paint);
    let previousLang=lang();
    new MutationObserver(()=>{const now=lang();if(previousLang!==now){previousLang=now;paint();}})
      .observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    paint();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
