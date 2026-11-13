/* R177 Pack Quantity: an illustrative LP-only calculator, not an iOS app.
 * No network requests, tracking, persistence, product images or price predictions.
 */
(() => {
  'use strict';
  const APP = '6804756043', ID = 'tsz-pack-quantity-r177';
  if (document.body?.dataset.p199Id !== APP || document.getElementById(ID)) return;
  const T = {
    en: {
      brand:'PACK QUANTITY',tag:'BUY JUST ENOUGH',h1:'Buy enough.',h2:'Know what’s left.',lead:'From what you need to how many packs to buy.',
      need:'Total amount needed',per:'Each pack contains',price:'Price per pack (optional)',pack:'packs',buy:'BUY',total:'Total purchased',left:'Left over',cost:'Estimated total cost',
      calc:'Pack count always rounds up.',convert:'Convert g / kg / oz / lb',reset:'Reset example',store:'View on the App Store',
      note:'Illustrative website demo. All values are examples. Confirm pack labels and prices before buying; no values are saved.',
      err:'Enter valid positive quantities. A pack count must be between 1 and 10,000. The optional price must be zero or greater.',
      count:'Calculation',usd:'USD'
    },
    ja: {
      brand:'PACK QUANTITY',tag:'必要な数がすぐわかる',h1:'必要な数だけ。',h2:'余りも見える。',lead:'必要量から購入パック数と余りを計算。',
      need:'必要な総量',per:'1パックの内容量',price:'1パックの価格（任意）',pack:'パック',buy:'購入数',total:'購入総量',left:'余り',cost:'合計金額の目安',
      calc:'必要数は切り上げ計算',convert:'g・kg・oz・lbを換算',reset:'初期値に戻す',store:'App Storeで見る',
      note:'架空のWebデモです。購入前に実際の内容量・価格をご確認ください。入力内容は保存されません。',
      err:'必要量と内容量には0より大きい数を入力してください。パック数は最大10,000、価格は0以上です。',
      count:'計算結果',usd:'米ドル'
    },
    ar: {
      brand:'PACK QUANTITY',tag:'اشترِ الكمية الكافية',h1:'اشترِ ما يكفي.',h2:'واعرف ما يتبقى.',lead:'احسب عدد العبوات والكمية المتبقية بسهولة.',
      need:'الكمية المطلوبة',per:'كمية العبوة الواحدة',price:'سعر العبوة (اختياري)',pack:'عبوات',buy:'اشترِ',total:'إجمالي المشتريات',left:'الكمية المتبقية',cost:'التكلفة الإجمالية التقديرية',
      calc:'نقرّب عدد العبوات إلى الأعلى',convert:'تحويل g / kg / oz / lb',reset:'إعادة القيم',store:'عرضه على App Store',
      note:'تجربة توضيحية بأرقام افتراضية. تحقق من الكمية والسعر الفعليين قبل الشراء. لا تُحفظ المدخلات.',
      err:'أدخل كميات موجبة وصحيحة. عدد العبوات من 1 إلى 10000، والسعر الاختياري غير سالب.',
      count:'النتيجة',usd:'دولار أمريكي'
    }
  };
  const FACTOR = {g:1,kg:1000,oz:28.349523125,lb:453.59237};
  const loc = () => {
    const v=(document.querySelector('#p199-language')?.value || new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en').toLowerCase();
    return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en';
  };
  const region=()=>{
    const v=(document.querySelector('#p199-country')?.value || 'us').toLowerCase();
    return /^[a-z]{2}$/.test(v)?v:'us';
  };
  const root=document.createElement('section');root.id=ID;root.className='pq177';root.setAttribute('aria-labelledby','pq177-title');
  root.innerHTML=`
    <div class="pq177-top"><div class="pq177-brand"><span class="pq177-mark" aria-hidden="true">⬡</span><strong data-t="brand"></strong></div><span class="pq177-tag" data-t="tag"></span></div>
    <div class="pq177-hero"><div class="pq177-head"><h2 id="pq177-title"><span data-t="h1"></span><em data-t="h2"></em></h2><p data-t="lead"></p></div>
      <div class="pq177-art" aria-hidden="true"><div class="pq177-bags"><span class="pq177-bag"><b>700 g</b></span><span class="pq177-bag"><b>700 g</b></span><span class="pq177-bag"><b>700 g</b></span><span class="pq177-bag"><b>700 g</b></span></div></div></div>
    <div class="pq177-main"><form class="pq177-form" id="pq177-form" novalidate>
      <div class="pq177-field"><label for="pq177-need" data-t="need"></label><div class="pq177-fieldline"><input id="pq177-need" type="number" inputmode="decimal" min="0.0001" max="1000000" step="any" value="2.5" aria-label="Needed quantity"><select id="pq177-need-unit" aria-label="Needed quantity unit"><option value="kg" selected>kg</option><option value="g">g</option><option value="oz">oz</option><option value="lb">lb</option></select></div></div>
      <div class="pq177-field"><label for="pq177-per" data-t="per"></label><div class="pq177-fieldline"><input id="pq177-per" type="number" inputmode="decimal" min="0.0001" max="1000000" step="any" value="700" aria-label="Quantity per pack"><select id="pq177-per-unit" aria-label="Quantity per pack unit"><option value="g" selected>g</option><option value="kg">kg</option><option value="oz">oz</option><option value="lb">lb</option></select></div></div>
      <div class="pq177-field"><label for="pq177-price" data-t="price"></label><div class="pq177-fieldline pq177-money"><span aria-hidden="true">$</span><input id="pq177-price" type="number" inputmode="decimal" min="0" max="1000000" step="any" value="3.20" aria-label="Optional price per pack"><span class="pq177-usd">USD</span></div></div>
      <div class="pq177-form-actions"><button type="button" id="pq177-reset" data-t="reset"></button></div>
    </form>
    <div class="pq177-results"><p id="pq177-error" class="pq177-error" role="alert" hidden></p><div id="pq177-good">
      <div class="pq177-primary" role="status" aria-live="polite"><div class="pq177-bigline"><span data-t="buy"></span><strong id="pq177-count">4</strong><span data-t="pack"></span></div><div class="pq177-mini"><div><small data-t="total"></small><strong id="pq177-total">2.8 kg</strong></div><div><small data-t="left"></small><strong id="pq177-leftover">300 g</strong></div></div><p id="pq177-equation" class="pq177-equation">4 × 700 g = 2.8 kg</p></div>
      <div class="pq177-estimate" id="pq177-estimate"><span data-t="cost"></span><strong id="pq177-cost">$12.80</strong><small id="pq177-cost-detail">4 × $3.20</small></div>
    </div></div></div>
    <div class="pq177-footer"><div class="pq177-features"><span data-t="calc"></span><span data-t="convert"></span></div><a class="pq177-store" id="pq177-store" href="https://apps.apple.com/us/app/id6804756043" target="_blank" rel="noopener noreferrer"><span data-t="store"></span><span aria-hidden="true">↗</span></a><p data-t="note"></p></div>`;
  const crumb=document.querySelector('.p19-breadcrumb');
  if(crumb) crumb.insertAdjacentElement('afterend',root);
  else {const m=document.querySelector('#p199-content')||document.querySelector('main');m?.parentNode?.insertBefore(root,m);}
  if(!root.isConnected) return;
  const $=id=>root.querySelector(id);
  const fmt=(value,dec=3)=>Number(value).toLocaleString('en-US',{minimumFractionDigits:0,maximumFractionDigits:dec});
  const money=value=>'$'+Number(value).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  const read=(id,zero=false)=>{
    const v=$(id).value.trim();
    if(!v||!/^\d+(?:\.\d+)?$/.test(v))return NaN;
    const n=Number(v);return Number.isFinite(n)&&n<=(zero?1000000:1000000)&&(zero?n>=0:n>0)?n:NaN;
  };
  function calc(){
    const n=read('#pq177-need'),p=read('#pq177-per'),priceRaw=$('#pq177-price').value.trim(),price=priceRaw===''?null:read('#pq177-price',true);
    const needUnit=$('#pq177-need-unit').value,packUnit=$('#pq177-per-unit').value;
    const need=n*FACTOR[needUnit],per=p*FACTOR[packUnit];
    const ratio=need/per;
    // Tolerance absorbs IEEE-754 artifacts for exactly matching converted units.
    let count=Math.ceil(ratio-1e-12);
    if(Number.isFinite(count)&&count*per+1e-9<need)count+=1;
    const good=Number.isFinite(n)&&Number.isFinite(p)&&Number.isFinite(need)&&Number.isFinite(per)&&need>0&&per>0&&Number.isFinite(count)&&count>=1&&count<=10000&&(price===null||Number.isFinite(price))&&Number.isFinite(count*per);
    $('#pq177-error').hidden=good;$('#pq177-good').hidden=!good;
    $('#pq177-error').textContent=good?'':T[loc()].err;
    if(!good)return;
    const bought=count*per, leftover=Math.max(0,bought-need);
    const purchasedAmount=bought/FACTOR[needUnit],leftoverAmount=leftover/FACTOR[packUnit];
    $('#pq177-count').textContent=fmt(count,0);
    $('#pq177-total').textContent=fmt(purchasedAmount,4)+' '+needUnit;
    $('#pq177-leftover').textContent=fmt(leftoverAmount,4)+' '+packUnit;
    $('#pq177-equation').textContent=fmt(count,0)+' × '+fmt(p,4)+' '+packUnit+' = '+fmt(purchasedAmount,4)+' '+needUnit;
    $('#pq177-estimate').hidden=price===null;
    if(price!==null){$('#pq177-cost').textContent=money(count*price);$('#pq177-cost-detail').textContent=fmt(count,0)+' × '+money(price);}
    const boxes=root.querySelectorAll('.pq177-bag'); boxes.forEach((box,i)=>{box.hidden=i>=Math.min(count,4);box.querySelector('b').textContent=fmt(p,2)+' '+packUnit;});
  }
  function translate(){
    const l=loc(),w=T[l];root.lang=l;root.dir=l==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=w[el.dataset.t]||'';});
    $('#pq177-store').href=`https://apps.apple.com/${region()}/app/id${APP}`;
    calc();
  }
  ['#pq177-need','#pq177-need-unit','#pq177-per','#pq177-per-unit','#pq177-price'].forEach(s=>$(s).addEventListener('input',calc));
  ['#pq177-need-unit','#pq177-per-unit'].forEach(s=>$(s).addEventListener('change',calc));
  $('#pq177-reset').addEventListener('click',()=>{
    [['#pq177-need','2.5'],['#pq177-per','700'],['#pq177-price','3.20'],['#pq177-need-unit','kg'],['#pq177-per-unit','g']].forEach(([id,v])=>$(id).value=v);
    calc();
  });
  document.getElementById('p199-language')?.addEventListener('change',translate);
  document.getElementById('p199-country')?.addEventListener('change',translate);
  translate();
})();
