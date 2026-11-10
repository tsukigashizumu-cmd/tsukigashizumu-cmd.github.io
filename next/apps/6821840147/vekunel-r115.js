/* TSZ LP R115 / Vekunel: compare three optional products, hypothetical same-currency checkout totals. */
(() => {
  'use strict';
  const ID='tsz-vekunel-r115';
  const APP_ID='6821840147';
  const DEFAULT={subtotal:47,shipping:6,threshold:50,extras:[2,4,9]};
  const WORDS={
    en:{eyebrow:'THE EXTRA ITEM DECISION',demo:'TRY 3 OPTIONS',headline:'One more item. Which total changes?',intro:'The item that unlocks free shipping is not always the lowest checkout total. Compare three options against your original cart.',yourCart:'Original cart',subtotal:'Cart subtotal',shipping:'Ordinary shipping',threshold:'Free-shipping threshold',missing:'Still needed to qualify',baseline:'Pay without another item',choices:'Compare optional extras',extraLabel:'Extra item',total:'Checkout total',shippingLine:'Shipping',delta:'Compared with original',cheaper:'LESS TO PAY',costlier:'MORE TO PAY',same:'SAME TOTAL',notFree:'Still pays shipping',free:'Qualifies for free shipping',originalFree:'Original cart already qualifies',best:'Lowest checkout total',reset:'Restore sample',invalid:'Enter valid non-negative amounts; the free-shipping threshold must be above zero.',note:'Illustration only, not an app screenshot or a shopping recommendation. All amounts use one currency; no currency conversion. Assumes the threshold applies to the entered cart subtotal. Taxes, coupons, excluded products, fees and rewards are not inferred. Choosing an extra item is your decision.',currency:'Sample figures: same currency (USD)',nameA:'Option A',nameB:'Option B',nameC:'Option C',saving:'Less to pay',added:'More to pay'},
    ja:{eyebrow:'もう1点追加する前に',demo:'3つの候補を比較',headline:'送料無料でも、総額は安くなる？',intro:'送料無料になっても、支払総額が一番安いとは限りません。元のかごと3つの追加候補を比べます。',yourCart:'元の買い物かご',subtotal:'元の商品合計',shipping:'通常送料',threshold:'送料無料になる金額',missing:'送料無料まで不足',baseline:'何も追加しない支払額',choices:'追加する商品の候補',extraLabel:'追加商品の価格',total:'レジで払う合計',shippingLine:'送料',delta:'元のかごとの差',cheaper:'支払額が減る',costlier:'支払額が増える',same:'支払額は同じ',notFree:'送料がかかる',free:'送料無料になる',originalFree:'追加前から送料無料',best:'最も低い支払総額',reset:'サンプルに戻す',invalid:'0以上の金額を入力してください。送料無料の基準額は0より大きくします。',note:'説明用の仮の計算で、アプリ実画面や購入のおすすめではありません。すべて同じ通貨で入力し、為替換算はしません。送料無料判定は入力した商品合計に適用されるものと仮定。税・クーポン・対象外商品・手数料・ポイントは推測しません。商品を追加する価値は自分で判断してください。',currency:'仮の金額（すべて米ドル）',nameA:'候補A',nameB:'候補B',nameC:'候補C',saving:'少なく払う',added:'多く払う'},
    ar:{eyebrow:'قبل إضافة منتج آخر',demo:'قارن ثلاثة خيارات',headline:'شحن مجاني، ولكن هل ستدفع أقل؟',intro:'الحصول على شحن مجاني لا يعني بالضرورة أقل إجمالي للدفع. قارن السلة الأصلية بثلاثة منتجات إضافية محتملة.',yourCart:'السلة الأصلية',subtotal:'إجمالي المنتجات',shipping:'رسوم الشحن المعتادة',threshold:'حد الشحن المجاني',missing:'المبلغ المتبقي للشحن المجاني',baseline:'الإجمالي دون إضافة',choices:'قارن منتجات إضافية',extraLabel:'سعر المنتج الإضافي',total:'إجمالي الدفع',shippingLine:'الشحن',delta:'الفرق عن السلة الأصلية',cheaper:'تدفع أقل',costlier:'تدفع أكثر',same:'الإجمالي متساوٍ',notFree:'لا يزال الشحن مدفوعًا',free:'يؤهل للشحن المجاني',originalFree:'السلة مؤهلة للشحن المجاني بالفعل',best:'أقل إجمالي للدفع',reset:'استعادة المثال',invalid:'أدخل مبالغ غير سالبة، ويجب أن يكون حد الشحن المجاني أكبر من الصفر.',note:'مثال توضيحي فقط، وليس شاشة فعلية من التطبيق أو توصية بالشراء. استخدم العملة نفسها لجميع القيم؛ لا يوجد تحويل عملات. يُفترض أن حد الشحن المجاني يعتمد على إجمالي السلة المُدخل. لا تُحسب الضرائب أو القسائم أو الاستثناءات أو الرسوم الأخرى أو النقاط. قرار إضافة المنتج يعود إليك.',currency:'مبالغ تجريبية بعملة واحدة (USD)',nameA:'الخيار أ',nameB:'الخيار ب',nameC:'الخيار ج',saving:'دفع أقل',added:'دفع أكثر'}
  };
  const pickLang=()=>{
    const menu=document.querySelector('#p199-language');
    const lang=String(menu?.value || document.documentElement.lang || 'en').toLowerCase().split(/[-_]/)[0];
    return Object.hasOwn(WORDS,lang)?lang:'en';
  };
  const money=(x,lang)=>x.toLocaleString(lang==='ja'?'ja-JP':lang==='ar'?'ar-EG':'en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  const valid=v=>Number.isFinite(v)&&v>=0&&v<=100000000;
  function calculate(subtotal,shipping,threshold,extras){
    if(!valid(subtotal)||!valid(shipping)||!valid(threshold)||threshold<=0||extras.some(x=>!valid(x)))return null;
    const originalShipping=subtotal>=threshold?0:shipping;
    const original=subtotal+originalShipping;
    const candidates=extras.map((extra,i)=>{
      const eligible=subtotal+extra>=threshold;
      const ship=eligible?0:shipping;
      const total=subtotal+extra+ship;
      const delta=total-original;
      return {index:i,extra,eligible,shipping:ship,total,delta};
    });
    const minimum=Math.min(original,...candidates.map(x=>x.total));
    return {original,originalShipping,missing:Math.max(0,threshold-subtotal),candidates,minimum};
  }
  function mount(){
    const body=document.body;
    if(!body||(body.dataset.p199Id!==APP_ID&&body.dataset.p19AppId!==APP_ID))return;
    const anchor=document.querySelector('#overview');
    if(!anchor||document.getElementById(ID))return;
    const root=document.createElement('section');root.id=ID;root.setAttribute('data-illustration','not-an-app-screenshot');
    root.innerHTML=`
      <div class="vk115-top"><span class="vk115-overline" data-copy="eyebrow"></span><span class="vk115-chip" data-copy="demo"></span></div>
      <h2 data-copy="headline"></h2><p class="vk115-lead" data-copy="intro"></p>
      <div class="vk115-layout">
        <div class="vk115-editor"><h3 data-copy="yourCart"></h3><div class="vk115-inputs">
          <label><span data-copy="subtotal"></span><input data-field="subtotal" type="number" inputmode="decimal" step="any" min="0" value="47"></label>
          <label><span data-copy="shipping"></span><input data-field="shipping" type="number" inputmode="decimal" step="any" min="0" value="6"></label>
          <label><span data-copy="threshold"></span><input data-field="threshold" type="number" inputmode="decimal" step="any" min="0.01" value="50"></label>
        </div><div class="vk115-original" aria-live="polite"><span data-copy="baseline"></span><strong data-out="original">—</strong><small><span data-copy="missing"></span> · <b data-out="missing">—</b></small></div>
          <button type="button" class="vk115-reset" data-action="reset" data-copy="reset"></button>
        </div>
        <div class="vk115-comparison"><h3 data-copy="choices"></h3><div class="vk115-choices">
          ${[0,1,2].map(i=>`<article class="vk115-card" data-index="${i}"><div class="vk115-card-head"><b data-name="${i}"></b><span data-state="${i}"></span></div>
            <label><span data-copy="extraLabel"></span><input data-extra="${i}" type="number" inputmode="decimal" step="any" min="0" value="${DEFAULT.extras[i]}"></label>
            <div class="vk115-pay"><span data-copy="total"></span><strong data-total="${i}">—</strong></div>
            <div class="vk115-detail"><span data-copy="shippingLine"></span><b data-shipping="${i}">—</b></div>
            <div class="vk115-delta"><span data-copy="delta"></span><strong data-delta="${i}">—</strong></div>
          </article>`).join('')}
        </div><p class="vk115-best" data-best-result aria-live="polite"></p><p class="vk115-error" data-error role="status" hidden></p></div>
      </div><p class="vk115-note" data-copy="note"></p><p class="vk115-currency" data-copy="currency"></p>`;
    anchor.insertAdjacentElement('afterend',root);
    const get=(sel)=>root.querySelector(sel);
    const keys=['subtotal','shipping','threshold'];
    function render(){
      const lang=pickLang(),t=WORDS[lang];root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-copy]').forEach(el=>{const k=el.dataset.copy;if(Object.hasOwn(t,k))el.textContent=t[k];});
      for(let i=0;i<3;i++)get(`[data-name="${i}"]`).textContent=t['name'+['A','B','C'][i]];
      const fields=keys.map(k=>get(`[data-field="${k}"]`).value);
      const extraFields=[0,1,2].map(i=>get(`[data-extra="${i}"]`).value);
      const numbers=[...fields,...extraFields].map(s=>s.trim()===''?NaN:Number(s));
      const result=calculate(numbers[0],numbers[1],numbers[2],numbers.slice(3));
      const error=get('[data-error]');error.hidden=Boolean(result);error.textContent=result?'':t.invalid;
      if(!result){root.dataset.valid='false';get('[data-out="original"]').textContent='—';get('[data-out="missing"]').textContent='—';get('[data-best-result]').textContent='';for(let i=0;i<3;i++){get(`[data-total="${i}"]`).textContent='—';get(`[data-delta="${i}"]`).textContent='—';get(`[data-shipping="${i}"]`).textContent='—';get(`[data-state="${i}"]`).textContent='';get(`[data-index="${i}"]`).dataset.outcome='invalid';}return;}
      root.dataset.valid='true';get('[data-out="original"]').textContent=money(result.original,lang);get('[data-out="missing"]').textContent=money(result.missing,lang);
      result.candidates.forEach((c,i)=>{
        const card=get(`[data-index="${i}"]`);
        const outcome=Math.abs(c.delta)<1e-8?'same':c.delta<0?'cheaper':'costlier';card.dataset.outcome=outcome;
        card.dataset.best=Math.abs(c.total-result.minimum)<1e-8?'true':'false';
        get(`[data-state="${i}"]`).textContent=numbers[0]>=numbers[2]?t.originalFree:c.eligible?t.free:t.notFree;
        get(`[data-total="${i}"]`).textContent=money(c.total,lang);
        get(`[data-shipping="${i}"]`).textContent=money(c.shipping,lang);
        get(`[data-delta="${i}"]`).textContent=(c.delta>0?'+':c.delta<0?'−':'')+money(Math.abs(c.delta),lang)+' · '+t[outcome];
      });
      const winners=result.candidates.filter(c=>Math.abs(c.total-result.minimum)<1e-8).map(c=>t['name'+['A','B','C'][c.index]]);
      const bottom=winners.length?winners.join(' / '):t.yourCart;
      get('[data-best-result]').textContent=t.best+'：'+bottom+' · '+money(result.minimum,lang);
    }
    root.querySelectorAll('input').forEach(e=>e.addEventListener('input',render));
    get('[data-action="reset"]').addEventListener('click',()=>{keys.forEach(k=>get(`[data-field="${k}"]`).value=DEFAULT[k]);for(let i=0;i<3;i++)get(`[data-extra="${i}"]`).value=DEFAULT.extras[i];render();});
    document.getElementById('p199-language')?.addEventListener('change',render);
    let lastLang=pickLang();new MutationObserver(()=>{const now=pickLang();if(now!==lastLang){lastLang=now;render();}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
