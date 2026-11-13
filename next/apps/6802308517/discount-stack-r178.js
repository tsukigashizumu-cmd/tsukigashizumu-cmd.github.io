/* R178 Discount Stack: website-only two sequential discounts + optional sales tax.
   No external requests, persistence, tracking, price forecasts, or iOS source changes. */
(() => {
  'use strict';
  const APP='6802308517', ID='tsz-discount-stack-r178';
  if (document.body?.dataset.p199Id !== APP || document.getElementById(ID)) return;
  const translations={
    en:{brand:'DISCOUNT STACK',tag:'THE MATH BEHIND THE SALE',heading:'30% + 20% ≠',heading2:'50% OFF.',intro:'The second discount applies to what’s left.',caption:'Two sequential discounts. One honest total.',original:'Original price',first:'First discount',second:'Second discount',tax:'Add sales tax',taxRate:'Sales tax rate',stepOriginal:'Original price',stepFirst:'After first discount',stepSecond:'After second discount',pay:'YOU PAY',effective:'Effective discount',notSum:'not the sum',withoutTax:'before tax',inclTax:'including tax',reset:'Reset example',store:'View on the App Store',example:'30% then 20% means 44% off, not 50%.',note:'Illustrative website calculator. Discounts apply in sequence; optional tax is added afterward. Actual store rules and rounding may differ. Inputs are not saved.',error:'Enter a valid price from $0.01 to $1,000,000, and discount/tax rates from 0% to 100%.',features1:'Two successive discounts',features2:'Optional sales tax',features3:'Understand your total',taxOff:'Off',taxOn:'On',discountUnit:'OFF',deal:'A clearer way to compare a deal.'},
    ja:{brand:'DISCOUNT STACK',tag:'割引の計算、思い違いをなくす',heading:'30%引き＋20%引き≠',heading2:'50%引き。',intro:'2回目の割引は、1回目の割引後の価格に適用されます。',caption:'2段階の割引と最終価格を確認。',original:'元の価格',first:'1回目の割引',second:'2回目の割引',tax:'消費税・売上税を加える',taxRate:'税率',stepOriginal:'元の価格',stepFirst:'1回目の割引後',stepSecond:'2回目の割引後',pay:'支払額',effective:'実際の割引率',notSum:'足し算ではない',withoutTax:'税抜き',inclTax:'税込み',reset:'初期値に戻す',store:'App Storeで見る',example:'30%引きのあと20%引きなら、実際は44%引き。',note:'架空のWeb計算デモです。割引は順番に適用し、税金はその後に加算します。店舗の規則や端数処理は異なる場合があります。入力は保存されません。',error:'価格は$0.01〜$1,000,000、割引率と税率は0〜100%で入力してください。',features1:'2段階の割引',features2:'任意の税率',features3:'最終金額がわかる',taxOff:'オフ',taxOn:'オン',discountUnit:'OFF',deal:'「安い」の根拠がわかる。'},
    ar:{brand:'DISCOUNT STACK',tag:'احسب الخصومات المتتالية',heading:'30% + 20% ≠',heading2:'خصم 50%.',intro:'يُطبق الخصم الثاني على المبلغ المتبقي بعد الخصم الأول.',caption:'خصمان متتاليان، ومبلغ نهائي واضح.',original:'السعر الأصلي',first:'الخصم الأول',second:'الخصم الثاني',tax:'إضافة ضريبة المبيعات',taxRate:'نسبة الضريبة',stepOriginal:'السعر الأصلي',stepFirst:'بعد الخصم الأول',stepSecond:'بعد الخصم الثاني',pay:'المبلغ النهائي',effective:'الخصم الفعلي',notSum:'وليس مجموع النسبتين',withoutTax:'قبل الضريبة',inclTax:'شامل الضريبة',reset:'إعادة القيم',store:'عرضه على App Store',example:'خصم 30% ثم 20% يساوي 44%، وليس 50%.',note:'آلة حاسبة توضيحية على الويب. تُطبّق الخصومات بالتتابع، ثم تُضاف الضريبة الاختيارية. قد تختلف قواعد المتاجر والتقريب. لا تُحفظ البيانات.',error:'أدخل سعراً من ‎$0.01 إلى ‎$1,000,000، ونسب خصم وضريبة من 0% إلى 100%.',features1:'خصمان متتابعان',features2:'ضريبة اختيارية',features3:'معرفة المبلغ النهائي',taxOff:'إيقاف',taxOn:'تشغيل',discountUnit:'خصم',deal:'افهم السعر الحقيقي للعرض.'}
  };
  const root=document.createElement('section'); root.id=ID;root.className='ds178';root.setAttribute('aria-labelledby','ds178-title');
  root.innerHTML=`
    <div class="ds178-header"><div class="ds178-brand"><span class="ds178-emblem" aria-hidden="true">◇</span><strong data-t="brand">DISCOUNT STACK</strong></div><span class="ds178-tag" data-t="tag"></span></div>
    <div class="ds178-hero"><div class="ds178-hero-copy"><h2 id="ds178-title"><span data-t="heading"></span><em data-t="heading2"></em></h2><p class="ds178-intro" data-t="intro"></p><p class="ds178-caption" data-t="caption"></p></div>
      <div class="ds178-hero-art" aria-hidden="true"><div class="ds178-paper ds178-paper-back"></div><div class="ds178-paper ds178-paper-front"><b>30%</b><span>OFF</span></div><div class="ds178-paper ds178-paper-top"><b>+20%</b><span>OFF</span></div><span class="ds178-spark">✳</span></div></div>
    <div class="ds178-workspace"><form class="ds178-controls" id="ds178-form" novalidate>
      <label class="ds178-field" for="ds178-price"><span data-t="original"></span><div class="ds178-field-input"><b aria-hidden="true">$</b><input id="ds178-price" type="number" inputmode="decimal" step="0.01" min="0.01" max="1000000" value="100.00" aria-label="Original price"></div></label>
      <label class="ds178-field" for="ds178-first"><span data-t="first"></span><div class="ds178-field-input"><input id="ds178-first" type="number" inputmode="decimal" step="0.01" min="0" max="100" value="30" aria-label="First discount"><b aria-hidden="true">%</b></div></label>
      <label class="ds178-field" for="ds178-second"><span data-t="second"></span><div class="ds178-field-input"><input id="ds178-second" type="number" inputmode="decimal" step="0.01" min="0" max="100" value="20" aria-label="Second discount"><b aria-hidden="true">%</b></div></label>
      <label class="ds178-tax-control"><span data-t="tax"></span><span class="ds178-tax-control-right"><input id="ds178-tax-toggle" type="checkbox" aria-label="Include sales tax"><span class="ds178-switch" aria-hidden="true"></span><span id="ds178-tax-state" data-t="taxOff"></span></span></label>
      <label class="ds178-field ds178-tax-field" id="ds178-tax-field" for="ds178-tax" hidden><span data-t="taxRate"></span><div class="ds178-field-input"><input id="ds178-tax" type="number" inputmode="decimal" step="0.01" min="0" max="100" value="8.5" aria-label="Sales tax rate"><b aria-hidden="true">%</b></div></label>
      <button class="ds178-reset" id="ds178-reset" type="button" data-t="reset"></button>
    </form>
    <div class="ds178-explain"><p class="ds178-error" id="ds178-error" role="alert" hidden></p><div id="ds178-valid">
      <ol class="ds178-steps" aria-label="Sequential price calculation">
        <li><span class="ds178-num">1</span><span class="ds178-step-label" data-t="stepOriginal"></span><strong id="ds178-original-output">$100.00</strong></li>
        <li><span class="ds178-num">2</span><span class="ds178-step-label" data-t="stepFirst"></span><strong id="ds178-first-output">$70.00</strong></li>
        <li><span class="ds178-num">3</span><span class="ds178-step-label" data-t="stepSecond"></span><strong id="ds178-second-output">$56.00</strong></li>
      </ol>
      <div class="ds178-answer" role="status" aria-live="polite"><div class="ds178-answer-title"><span data-t="pay"></span><small id="ds178-tax-label" data-t="withoutTax"></small></div><strong class="ds178-pay" id="ds178-pay">$56.00</strong><div class="ds178-highlight"><span id="ds178-percent">44%</span><span data-t="discountUnit"></span><small data-t="notSum"></small></div></div>
    </div></div></div>
    <div class="ds178-bottom"><p class="ds178-meaning" data-t="example"></p><div class="ds178-features"><span data-t="features1"></span><span data-t="features2"></span><span data-t="features3"></span></div><div class="ds178-cta"><span data-t="deal"></span><a id="ds178-store" href="https://apps.apple.com/us/app/id6802308517" target="_blank" rel="noopener noreferrer"><span data-t="store"></span><span aria-hidden="true">↗</span></a></div><p class="ds178-note" data-t="note"></p></div>`;
  const breadcrumb=document.querySelector('.p19-breadcrumb');
  if(breadcrumb) breadcrumb.insertAdjacentElement('afterend',root);
  else { const main=document.querySelector('#p199-content') || document.querySelector('main'); if(main?.parentNode) main.parentNode.insertBefore(root,main); }
  if(!root.isConnected) return;
  const $=id=>root.querySelector(id);
  const language=()=>{const v=(document.querySelector('#p199-language')?.value || new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en').toLowerCase();return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en';};
  const country=()=>{const c=(document.querySelector('#p199-country')?.value || 'us').toLowerCase();return /^[a-z]{2}$/.test(c)?c:'us';};
  const currency=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  const roundCents=n=>Math.round((n+Number.EPSILON)*100)/100;
  const parse=(id,min,max)=>{const raw=$(id).value.trim(); if(!/^\d+(?:\.\d+)?$/.test(raw))return NaN;const n=Number(raw);return Number.isFinite(n)&&n>=min&&n<=max?n:NaN;};
  function calculate(){
    const price=parse('#ds178-price',.01,1000000),d1=parse('#ds178-first',0,100),d2=parse('#ds178-second',0,100),withTax=$('#ds178-tax-toggle').checked,tax=withTax?parse('#ds178-tax',0,100):0;
    $('#ds178-tax-field').hidden=!withTax;
    $('#ds178-tax-state').textContent=translations[language()][withTax?'taxOn':'taxOff'];
    const ok=[price,d1,d2,tax].every(Number.isFinite);
    $('#ds178-error').hidden=ok;$('#ds178-valid').hidden=!ok;
    $('#ds178-error').textContent=ok?'':translations[language()].error;
    if(!ok) return;
    const first=roundCents(price*(1-d1/100)),second=roundCents(first*(1-d2/100));
    const pay=withTax?roundCents(second*(1+tax/100)):second;
    const effective=100*(1-(1-d1/100)*(1-d2/100));
    $('#ds178-original-output').textContent=currency(price);
    $('#ds178-first-output').textContent=currency(first);
    $('#ds178-second-output').textContent=currency(second);
    $('#ds178-pay').textContent=currency(pay);
    $('#ds178-percent').textContent=Number(effective.toFixed(2)).toLocaleString('en-US',{maximumFractionDigits:2})+'%';
    $('#ds178-tax-label').textContent=translations[language()][withTax?'inclTax':'withoutTax'];
    $('#ds178-valid').dataset.state=second===0?'free': 'normal';
  }
  function translate(){const l=language(),t=translations[l];root.lang=l;root.dir=l==='ar'?'rtl':'ltr';root.querySelectorAll('[data-t]').forEach(el=>{const key=el.dataset.t;if(t[key]!==undefined)el.textContent=t[key];});$('#ds178-store').href='https://apps.apple.com/'+country()+'/app/id'+APP;calculate();}
  ['#ds178-price','#ds178-first','#ds178-second','#ds178-tax'].forEach(id=>$(id).addEventListener('input',calculate));
  $('#ds178-tax-toggle').addEventListener('change',calculate);
  $('#ds178-reset').addEventListener('click',()=>{ [['#ds178-price','100.00'],['#ds178-first','30'],['#ds178-second','20'],['#ds178-tax','8.5']].forEach(([id,value])=>$(id).value=value);$('#ds178-tax-toggle').checked=false;calculate();});
  document.querySelector('#p199-language')?.addEventListener('change',translate);
  document.querySelector('#p199-country')?.addEventListener('change',translate);
  translate();
})();
