/* TSZ LP R77: Vekunel free-shipping threshold demonstration. Not an actual app screen. */
(() => {
  'use strict';
  const APP_ID='6821840147';
  const DEFAULT={subtotal:44, shipping:8, threshold:50, extra:6};
  const WORDS={
    en:{eyebrow:'FREE SHIPPING IS NOT THE WHOLE STORY', demo:'INTERACTIVE EXAMPLE',
      heading:'Add one more item to save on shipping?',
      lead:'Free delivery can cost more than the shipping fee you avoid. Try four numbers to see the actual checkout difference.',
      compare:'TOTAL AT CHECKOUT', base:'Original cart', plus:'With extra item',
      outcomeSaving:'You pay less after adding it', outcomeCostlier:'You pay more after adding it',
      outcomeSame:'Your payment stays the same', outcomeInvalid:'Check the four amounts',
      badgeSaving:'LESS TO PAY', badgeCostlier:'MORE TO PAY', badgeSame:'NO CHANGE', badgeInvalid:'CHECK INPUT',
      deltaSaving:'Less to pay:', deltaCostlier:'Extra to pay:', deltaSame:'Payment difference:',
      noteFree:'Extra item reaches the free-shipping threshold.', noteNotFree:'Extra item does not reach free shipping.',
      noteAlreadyFree:'Your original cart already qualifies for free shipping.',
      editor:'Change the four amounts', subtotal:'Original cart subtotal', shipping:'Ordinary shipping fee',
      threshold:'Free-shipping threshold', extra:'Price of extra item',
      oldShipping:'Shipping on original cart', newShipping:'Shipping after adding item', gap:'Amount still needed for free shipping',
      reset:'Reset example', free:'FREE', amount:'Amount',
      caveat:'Illustrative calculator, not a Vekunel screenshot. All four amounts must use the same currency; no exchange conversion. Assumes the entered subtotal qualifies for the delivery threshold. Taxes, coupons, excluded products, points and other fees are not estimated. Entries are not saved.'},
    ja:{eyebrow:'送料無料でも、支払総額は安いとは限らない', demo:'操作できる計算例',
      heading:'もう1品足すと、本当に安くなる？',
      lead:'送料が無料になっても、追加で買った商品の分だけ高くなることがあります。4つの金額で支払総額を比較できます。',
      compare:'実際の支払額', base:'予定どおり購入', plus:'1品追加して購入',
      outcomeSaving:'追加した方が安くなります', outcomeCostlier:'追加した方が高くなります',
      outcomeSame:'支払総額は変わりません', outcomeInvalid:'4つの金額を確認してください',
      badgeSaving:'支払額が減る', badgeCostlier:'支払額が増える', badgeSame:'支払額は同じ', badgeInvalid:'入力を確認',
      deltaSaving:'減る金額：', deltaCostlier:'増える金額：', deltaSame:'差額：',
      noteFree:'追加すると送料無料の条件を満たします。', noteNotFree:'追加しても送料無料には届きません。',
      noteAlreadyFree:'もとのカートがすでに送料無料です。',
      editor:'4つの金額を変更', subtotal:'もとの商品合計', shipping:'通常送料',
      threshold:'送料無料になる金額', extra:'追加する商品の価格',
      oldShipping:'予定どおりの送料', newShipping:'追加後の送料', gap:'送料無料まで不足する金額',
      reset:'最初の例に戻す',free:'無料', amount:'金額',
      caveat:'これは計算例で、Vekunelの実際の画面ではありません。4つの金額はすべて同じ通貨で入力してください。為替換算はしません。入力した商品合計が送料無料判定の対象であると仮定し、税・クーポン・対象外商品・ポイントなどは推測しません。入力値は保存されません。'},
    ar:{eyebrow:'الشحن المجاني لا يعني دائمًا دفع مبلغ أقل',demo:'مثال تفاعلي',
      heading:'هل إضافة منتج آخر توفّر المال حقًا؟',
      lead:'قد تصبح رسوم الشحن مجانية ولكن المجموع النهائي يرتفع. جرّب أربعة مبالغ لتعرف الفرق.',
      compare:'الإجمالي عند الدفع',base:'السلة الأصلية',plus:'بعد إضافة المنتج',
      outcomeSaving:'ستدفع أقل بعد الإضافة',outcomeCostlier:'ستدفع أكثر بعد الإضافة',
      outcomeSame:'الإجمالي لم يتغير',outcomeInvalid:'تحقق من المبالغ الأربعة',
      badgeSaving:'تدفع أقل',badgeCostlier:'تدفع أكثر',badgeSame:'بلا فرق',badgeInvalid:'راجع الإدخال',
      deltaSaving:'المبلغ الموفّر: ',deltaCostlier:'المبلغ الإضافي: ',deltaSame:'الفرق: ',
      noteFree:'الإضافة تحقق حد الشحن المجاني.',noteNotFree:'الإضافة لا تحقق حد الشحن المجاني.',
      noteAlreadyFree:'سلتك الأصلية مؤهلة بالفعل للشحن المجاني.',
      editor:'غيّر المبالغ الأربعة',subtotal:'قيمة السلة الأصلية',shipping:'رسوم الشحن المعتادة',
      threshold:'حد الشحن المجاني',extra:'سعر المنتج المضاف',
      oldShipping:'الشحن قبل الإضافة',newShipping:'الشحن بعد الإضافة',gap:'المبلغ المتبقي للشحن المجاني',
      reset:'إعادة المثال',free:'مجاني',amount:'المبلغ',
      caveat:'هذه حاسبة توضيحية وليست شاشة فعلية من Vekunel. استخدم العملة نفسها للمبالغ الأربعة من دون تحويل عملات. نفترض أن مجموع السلة المدخل مؤهل لحساب حد الشحن المجاني. لا نقدّر الضرائب والقسائم والمنتجات المستثناة والنقاط أو الرسوم الأخرى. لا تُحفَظ القيم المدخلة.'}
  };
  function getLang(){
    const menu=document.getElementById('p199-language');
    return String(menu?.value || document.documentElement.lang || 'en').toLowerCase().split(/[-_]/)[0];
  }
  function currentLang(){return Object.prototype.hasOwnProperty.call(WORDS,getLang())?getLang():'en';}
  function label(){return WORDS[currentLang()];}
  function format(v){
    const language=currentLang()==='ja'?'ja-JP':currentLang()==='ar'?'ar-EG':'en-US';
    return Number(v).toLocaleString(language,{minimumFractionDigits:0,maximumFractionDigits:2});
  }
  function calculate({subtotal,shipping,threshold,extra}){
    if(![subtotal,shipping,threshold,extra].every(Number.isFinite) ||
       subtotal<0 || shipping<0 || threshold<=0 || extra<0 ||
       Math.max(subtotal,shipping,threshold,extra)>100000000) return null;
    const beforeShip=subtotal>=threshold?0:shipping;
    const afterShip=subtotal+extra>=threshold?0:shipping;
    const before=subtotal+beforeShip,after=subtotal+extra+afterShip;
    const difference=after-before;
    return {beforeShip,afterShip,before,after,difference,gap:Math.max(0,threshold-subtotal-extra),
      outcome:Math.abs(difference)<1e-9?'same':difference<0?'saving':'costlier',
      note:subtotal>=threshold?'noteAlreadyFree':afterShip===0?'noteFree':'noteNotFree'};
  }
  function mount(){
    const body=document.body;
    if(!body || (body.dataset.p199Id!==APP_ID && body.dataset.p19AppId!==APP_ID))return;
    const anchor=document.getElementById('overview');
    if(!anchor || document.getElementById('tsz-vk77'))return;
    const root=document.createElement('section');root.id='tsz-vk77';
    root.setAttribute('data-illustration','not-an-app-screenshot');
    root.innerHTML=`
      <div class="vk77-bar"><span class="vk77-eyebrow" data-copy="eyebrow"></span><span class="vk77-tag" data-copy="demo"></span></div>
      <div class="vk77-columns">
        <div class="vk77-intro"><h2 data-copy="heading"></h2><p class="vk77-lead" data-copy="lead"></p>
          <div class="vk77-results" aria-live="polite" aria-atomic="true">
            <div class="vk77-results-head"><span data-copy="compare"></span><b class="vk77-pill" data-out="badge"></b></div>
            <div class="vk77-totals"><div class="vk77-total"><small data-copy="base"></small><strong data-out="before"></strong></div>
              <span class="vk77-arrow" aria-hidden="true">→</span>
              <div class="vk77-total"><small data-copy="plus"></small><strong data-out="after"></strong></div></div>
            <p class="vk77-difference" data-out="difference"></p><p class="vk77-explain" data-out="explain"></p>
          </div>
        </div>
        <div class="vk77-editor"><h3 class="vk77-editor-title" data-copy="editor"></h3>
          <div class="vk77-fields">
            <label><span data-copy="subtotal"></span><input type="number" inputmode="decimal" min="0" step="any" data-field="subtotal" value="44"></label>
            <label><span data-copy="shipping"></span><input type="number" inputmode="decimal" min="0" step="any" data-field="shipping" value="8"></label>
            <label><span data-copy="threshold"></span><input type="number" inputmode="decimal" min="0.01" step="any" data-field="threshold" value="50"></label>
            <label><span data-copy="extra"></span><input type="number" inputmode="decimal" min="0" step="any" data-field="extra" value="6"></label>
          </div>
          <div class="vk77-breakdown"><div class="vk77-line"><span data-copy="oldShipping"></span><b data-out="oldShipping"></b></div>
          <div class="vk77-line"><span data-copy="newShipping"></span><b data-out="newShipping"></b></div>
          <div class="vk77-line"><span data-copy="gap"></span><b data-out="gap"></b></div></div>
          <button class="vk77-reset" type="button" data-act="reset" data-copy="reset"></button>
        </div>
      </div><p class="vk77-note" data-copy="caveat"></p>`;
    anchor.insertAdjacentElement('afterend',root);
    const fields=Object.keys(DEFAULT);
    function render(){
      const t=label();root.dir=currentLang()==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-copy]').forEach(e=>{
        const k=e.getAttribute('data-copy');if(Object.prototype.hasOwnProperty.call(t,k))e.textContent=t[k];
      });
      const values={};
      for(const k of fields){
        const element=root.querySelector(`[data-field="${k}"]`);
        values[k]=element.value.trim()===''?NaN:Number(element.value);
      }
      const result=calculate(values);
      if(!result){
        root.dataset.outcome='invalid';
        ['before','after','oldShipping','newShipping','gap'].forEach(k=>root.querySelector(`[data-out="${k}"]`).textContent='—');
        root.querySelector('[data-out="badge"]').textContent=t.badgeInvalid;
        root.querySelector('[data-out="difference"]').textContent=t.outcomeInvalid;
        root.querySelector('[data-out="explain"]').textContent='';
        return;
      }
      root.dataset.outcome=result.outcome;
      root.querySelector('[data-out="before"]').textContent=format(result.before);
      root.querySelector('[data-out="after"]').textContent=format(result.after);
      root.querySelector('[data-out="oldShipping"]').textContent=result.beforeShip===0?t.free:format(result.beforeShip);
      root.querySelector('[data-out="newShipping"]').textContent=result.afterShip===0?t.free:format(result.afterShip);
      root.querySelector('[data-out="gap"]').textContent=format(result.gap);
      const kind=result.outcome;
      root.querySelector('[data-out="badge"]').textContent=t['badge'+kind.charAt(0).toUpperCase()+kind.slice(1)];
      root.querySelector('[data-out="difference"]').textContent=t['delta'+kind.charAt(0).toUpperCase()+kind.slice(1)]+format(Math.abs(result.difference));
      root.querySelector('[data-out="explain"]').textContent=t[result.note];
    }
    root.querySelectorAll('input').forEach(e=>e.addEventListener('input',render));
    root.querySelector('[data-act="reset"]').addEventListener('click',()=>{
      for(const [key,val] of Object.entries(DEFAULT))root.querySelector(`[data-field="${key}"]`).value=String(val);
      render();
    });
    document.getElementById('p199-language')?.addEventListener('change',render);
    let lastLang=getLang();
    new MutationObserver(()=>{const now=getLang();if(now!==lastLang){lastLang=now;render();}})
      .observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
