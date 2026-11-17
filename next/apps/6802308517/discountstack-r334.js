/* R334 Discount Stack LP demo. Pure local, no storage, tracking, network or app integration. */
(()=>{
  'use strict';
  const ROOT='tsz-ds334';
  const T={
    en:{brand:'DISCOUNT STACK / TWO DISCOUNTS',over:'THE MATH BEHIND THE SALE',title:'30% off, then 20% off. Why is it not 50% off?',lead:'The second discount applies to what remains after the first—not the original price. Change the numbers and see the real checkout estimate.',try:'TRY A SHOPPING EXAMPLE',sneakers:'Sneakers',tech:'Electronics',grocery:'Household',price:'Original price',first:'First discount',second:'Second discount',tax:'Tax after discounts',note:'Percent discounts apply in sequence. Tax is then applied to the discounted amount. Amounts are rounded to cents for this illustrative calculator.',breakdown:'FROM TAG PRICE TO CHECKOUT',original:'Original price',after1:'After first discount',after2:'After second discount',taxAmount:'Estimated tax',final:'ESTIMATED AMOUNT TO PAY',saved:'Saved before tax',effective:'True discount',truth:'30% then 20% gives a 44% discount, not 50%.',dynamicTruth:'The second percentage is taken from the already reduced amount.',invalid:'Enter a valid price and percentages from 0 to 100; tax must be between 0 and 100.',footer:'Interactive LP example, not a price quotation. Local currency, coupons, shipping and retailer tax rules may change the actual total. No calculation history is saved.'},
    ja:{brand:'DISCOUNT STACK / 2段階の割引',over:'割引の順番で、答えが変わる',title:'30%引きのあと20%引き。50%引きじゃないの？',lead:'2回目の割引は、元値ではなく1回目を引いた残額にかかります。数字を変えて、支払見込み額を確かめてください。',try:'買い物の例を選ぶ',sneakers:'スニーカー',tech:'家電',grocery:'日用品',price:'元の価格',first:'1回目の割引',second:'2回目の割引',tax:'割引後の税率',note:'割引は順番に計算し、最後に税率を掛けます。端数は各段階でセントに丸める説明用の計算です。',breakdown:'値札から支払額まで',original:'元値',after1:'1回目の割引後',after2:'2回目の割引後',taxAmount:'税額の目安',final:'支払見込み額',saved:'税引前の節約額',effective:'実際の割引率',truth:'30%引きのあと20%引きは、合計44%引き。50%ではありません。',dynamicTruth:'2回目の割引率は、1回目の割引後の残額に適用します。',invalid:'価格と割引率を正しく入力してください。割引率と税率は0〜100です。',footer:'LP専用の説明用計算です。通貨・クーポン・送料・店舗の税ルールにより実際の支払額は異なります。計算履歴は保存しません。'},
    ar:{brand:'DISCOUNT STACK / خصمان متتاليان',over:'ما وراء أرقام التخفيضات',title:'خصم 30% ثم 20%… لماذا لا يصبح 50%؟',lead:'يُطبَّق الخصم الثاني على السعر المتبقي بعد الخصم الأول، لا على السعر الأصلي. عدّل القيم وشاهد تقدير المبلغ النهائي.',try:'اختر مثالًا للشراء',sneakers:'أحذية رياضية',tech:'إلكترونيات',grocery:'منتجات منزلية',price:'السعر الأصلي',first:'الخصم الأول',second:'الخصم الثاني',tax:'الضريبة بعد الخصمين',note:'تُطبَّق الخصومات بالتتابع، ثم تُضاف الضريبة إلى السعر المخفّض. تُقرَّب المبالغ إلى السنت في هذا المثال التوضيحي.',breakdown:'من السعر الأصلي إلى الدفع',original:'السعر الأصلي',after1:'بعد الخصم الأول',after2:'بعد الخصم الثاني',taxAmount:'الضريبة التقديرية',final:'المبلغ المتوقع للدفع',saved:'التوفير قبل الضريبة',effective:'الخصم الفعلي',truth:'خصم 30% ثم 20% يساوي خصمًا فعليًا 44%، وليس 50%.',dynamicTruth:'تُحسب النسبة الثانية من المبلغ المتبقي بعد الخصم الأول.',invalid:'أدخل سعرًا صالحًا ونسبًا بين 0 و100 للخصمين والضريبة.',footer:'مثال تفاعلي للصفحة فقط وليس عرض سعر. قد تختلف النتيجة بحسب العملة والقسائم والشحن والضرائب الفعلية. لا تُحفَظ الحسابات.'}
  };
  const SCENARIOS={sneakers:{price:100,first:30,second:20,tax:8},tech:{price:249.99,first:15,second:10,tax:6},grocery:{price:80,first:25,second:15,tax:0}};
  const state={lang:'en',scenario:'sneakers',values:{...SCENARIOS.sneakers}};
  let host;
  const q=s=>host.querySelector(s),all=s=>[...host.querySelectorAll(s)],tr=()=>T[state.lang];
  const amt=cents=>'$'+(cents/100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  const num=x=>Number.isFinite(x)?x.toFixed(1)+'%':'—';
  function compute(){
    const v=Object.fromEntries(Object.entries(state.values).map(([k,val])=>[k,Number(val)]));
    const raw=state.values;
    if(Object.values(raw).some(x=>String(x).trim()==='')||Object.values(v).some(x=>!Number.isFinite(x))||v.price<0||v.price>1000000||v.first<0||v.first>100||v.second<0||v.second>100||v.tax<0||v.tax>100)return null;
    const p=Math.round(v.price*100);
    const d1=Math.round(p*(1-v.first/100));
    const d2=Math.round(d1*(1-v.second/100));
    const total=Math.round(d2*(1+v.tax/100));
    return {p,d1,d2,tax:total-d2,total,saved:p-d2,effective:p>0?(p-d2)/p*100:0};
  }
  function mount(){
    if(document.getElementById(ROOT))return;
    const el=document.createElement('section');el.id=ROOT;el.setAttribute('aria-label','Discount Stack: two successive discounts and tax calculator');
    el.innerHTML=`<div class="ds-frame"><div class="ds-top"><div class="ds-brand"><svg width="29" height="29" viewBox="0 0 29 29" fill="none" aria-hidden="true"><path d="M4 7h10l11 11-7 7L7 14V4Z" stroke="#7CDDC5" stroke-width="2" stroke-linejoin="round"/><circle cx="10" cy="10" r="1.8" fill="#7CDDC5"/></svg><span data-t="brand"></span></div><div class="ds-langs" role="group" aria-label="Language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></div><div class="ds-hero"><p class="ds-over" data-t="over"></p><h2 data-t="title"></h2><p class="ds-lead" data-t="lead"></p></div><div class="ds-grid"><div class="ds-panel ds-controls"><p class="ds-kicker" data-t="try"></p><div class="ds-presets"><button type="button" data-scenario="sneakers" data-t="sneakers"></button><button type="button" data-scenario="tech" data-t="tech"></button><button type="button" data-scenario="grocery" data-t="grocery"></button></div><div class="ds-form"><label class="ds-field"><span data-t="price"></span><div class="ds-input-wrap"><b class="ds-prefix">$</b><input name="price" type="number" min="0" max="1000000" step="0.01" inputmode="decimal" value="100" aria-label="Original price"></div></label><label class="ds-field"><span data-t="first"></span><div class="ds-input-wrap"><input name="first" type="number" min="0" max="100" step="0.1" inputmode="decimal" value="30" aria-label="First discount"><b class="ds-suffix">%</b></div></label><label class="ds-field"><span data-t="second"></span><div class="ds-input-wrap"><input name="second" type="number" min="0" max="100" step="0.1" inputmode="decimal" value="20" aria-label="Second discount"><b class="ds-suffix">%</b></div></label><label class="ds-field"><span data-t="tax"></span><div class="ds-input-wrap"><input name="tax" type="number" min="0" max="100" step="0.1" inputmode="decimal" value="8" aria-label="Tax percentage"><b class="ds-suffix">%</b></div></label></div><p class="ds-caption" data-t="note"></p><p class="ds-invalid" data-out="error" role="status"></p></div><div class="ds-panel ds-results" aria-live="polite"><p class="ds-kicker" data-t="breakdown"></p><div class="ds-steps"><div class="ds-step"><span class="ds-step-label" data-t="original"></span><strong data-out="original"></strong></div><div class="ds-step"><span class="ds-step-label" data-t="after1"></span><strong data-out="after1"></strong></div><div class="ds-step"><span class="ds-step-label" data-t="after2"></span><strong data-out="after2"></strong></div><div class="ds-step"><span class="ds-step-label" data-t="taxAmount"></span><strong data-out="taxAmount"></strong></div></div><div class="ds-final"><p class="ds-final-label" data-t="final"></p><div class="ds-final-value" data-out="final"></div></div><div class="ds-metrics"><div class="ds-metric"><span data-t="saved"></span><strong data-out="saved"></strong></div><div class="ds-metric"><span data-t="effective"></span><strong data-out="effective"></strong></div></div><p class="ds-truth" data-t="truth"></p></div></div><p class="ds-bottom" data-t="footer"></p></div>`;
    (document.querySelector('main')||document.body).appendChild(el);host=el;
    all('[data-lang]').forEach(button=>button.addEventListener('click',()=>{state.lang=button.dataset.lang;render()}));
    all('[data-scenario]').forEach(button=>button.addEventListener('click',()=>{state.scenario=button.dataset.scenario;state.values={...SCENARIOS[state.scenario]};render()}));
    all('input').forEach(input=>input.addEventListener('input',()=>{state.values[input.name]=input.value;state.scenario='';render(false)}));
    render();
  }
  function render(setInputs=true){
    host.lang=state.lang;host.dir=state.lang==='ar'?'rtl':'ltr';
    all('[data-t]').forEach(el=>{el.textContent=tr()[el.dataset.t]||''});
    all('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===state.lang)));
    all('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scenario===state.scenario)));
    all('input').forEach(i=>{i.setAttribute('aria-label',tr()[({price:'price',first:'first',second:'second',tax:'tax'})[i.name]]);if(setInputs)i.value=state.values[i.name]});
    const r=compute();all('[data-out]').forEach(el=>el.textContent='—');
    q('[data-out="error"]').textContent=r?'':tr().invalid;
    q('.ds-truth').textContent=(+state.values.first===30&&+state.values.second===20)?tr().truth:tr().dynamicTruth;
    if(!r)return;
    for(const [key,c] of Object.entries({original:r.p,after1:r.d1,after2:r.d2,taxAmount:r.tax,final:r.total,saved:r.saved}))q(`[data-out="${key}"]`).textContent=amt(c);
    q('[data-out="effective"]').textContent=num(r.effective);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
