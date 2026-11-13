/* R176 Unit Choice — illustrative website-only unit-price comparison.
 * No price forecasting, persistent storage, requests, trackers or real product data.
 */
(() => {
  'use strict';
  const APP='6762347699', ID='tsz-unit-choice-r176';
  if (document.body?.dataset.p199Id!==APP || document.getElementById(ID)) return;
  const TEXT={
    en:{brand:'UNIT CHOICE',eyebrow:'THE NUMBER THAT MATTERS',a:'Bigger isn’t',b:'always cheaper.',lead:'Compare the number that matters.',small:'SMALL PACK',large:'LARGE PACK',cost:'Price',size:'Amount (oz)',per:'Price per oz',win:'BETTER VALUE',tie:'SAME VALUE',save:'Lower unit price by',unit:'per oz',smaller:'The smaller pack wins.',larger:'The larger pack wins.',equal:'Both packs cost the same per oz.',average:'Average unit price',median:'Median unit price',cta:'View on the App Store',reset:'Reset example',notice:'Illustrative web demo, not store prices. Both amounts use the same unit (oz). Results do not include tax. Nothing is saved.',error:'Enter a price and an amount greater than zero for both packs.'},
    ja:{brand:'UNIT CHOICE',eyebrow:'比べるべきは、単価',a:'大容量が、',b:'安いとは限らない。',lead:'違いは、1 ozあたりの価格に。',small:'小サイズ',large:'大サイズ',cost:'価格',size:'内容量（oz）',per:'1 ozあたり',win:'こちらがお得',tie:'単価は同じ',save:'単価の差',unit:'／oz',smaller:'小サイズの単価が安い。',larger:'大サイズの単価が安い。',equal:'両方とも同じ単価です。',average:'平均単価',median:'中央値',cta:'App Storeで見る',reset:'初期値に戻す',notice:'架空のWebデモです。内容量の単位は両方ともoz。税金は含まず、入力は保存されません。',error:'両方の価格と内容量に、0より大きい数値を入力してください。'},
    ar:{brand:'UNIT CHOICE',eyebrow:'قارن السعر لكل وحدة',a:'الحجم الأكبر',b:'ليس دائماً أوفر.',lead:'قارن الرقم الذي يهمك.',small:'العبوة الصغيرة',large:'العبوة الكبيرة',cost:'السعر',size:'الكمية (أونصة)',per:'السعر لكل أونصة',win:'القيمة الأفضل',tie:'نفس القيمة',save:'فرق سعر الوحدة',unit:'لكل أونصة',smaller:'العبوة الصغيرة أقل سعراً للوحدة.',larger:'العبوة الكبيرة أقل سعراً للوحدة.',equal:'سعر الوحدة متساوٍ في العبوتين.',average:'متوسط سعر الوحدة',median:'الوسيط',cta:'عرضه على App Store',reset:'إعادة المثال',notice:'عرض توضيحي بأسعار افتراضية. الوحدة موحدة (أونصة)، دون ضريبة. لا يتم حفظ البيانات.',error:'أدخل سعراً وكمية أكبر من الصفر لكل عبوة.'}
  };
  const locale=()=>{const v=(document.querySelector('#p199-language')?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en';};
  const region=()=>{const v=(document.querySelector('#p199-country')?.value||'us').toLowerCase();return /^[a-z]{2}$/.test(v)?v:'us';};
  const root=document.createElement('section');root.id=ID;root.className='uc176';root.setAttribute('aria-labelledby','uc176-title');
  root.innerHTML=`
    <header class="uc176-head"><div class="uc176-logo"><span class="uc176-logo-icon" aria-hidden="true">⚖</span><strong data-w="brand"></strong></div><small data-w="eyebrow"></small></header>
    <div class="uc176-hero"><div class="uc176-headline"><h2 id="uc176-title"><span data-w="a"></span><em data-w="b"></em></h2><p data-w="lead"></p><a id="uc176-store" class="uc176-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/id6762347699"><span aria-hidden="true">●</span><span data-w="cta"></span><span aria-hidden="true">↗</span></a></div><div class="uc176-art" aria-hidden="true"><div class="uc176-jar uc176-jar-small"><div class="uc176-lid"></div><div class="uc176-grain"></div></div><div class="uc176-jar uc176-jar-large"><div class="uc176-lid"></div><div class="uc176-grain"></div></div><div class="uc176-lines"><i></i><i></i><i></i></div></div></div>
    <div class="uc176-pair" role="group" aria-label="Unit price comparison"><article id="uc176-small-card" class="uc176-card uc176-winner"><div class="uc176-cardhead"><span data-w="small"></span><b id="uc176-small-badge" data-w="win"></b></div><div class="uc176-fields"><label><span data-w="cost"></span><div class="uc176-money"><span aria-hidden="true">$</span><input id="uc176-small-price" inputmode="decimal" type="number" min="0.01" max="1000000" step="0.01" value="4.80" aria-label="Small pack price"></div></label><label><span data-w="size"></span><input id="uc176-small-qty" type="number" inputmode="decimal" min="0.01" max="1000000" step="0.01" value="16" aria-label="Small pack quantity in oz"></label></div><div class="uc176-per"><span data-w="per"></span><strong id="uc176-small-unit">$0.30</strong><small>/ oz</small></div></article>
    <article id="uc176-large-card" class="uc176-card"><div class="uc176-cardhead"><span data-w="large"></span><b id="uc176-large-badge" data-w="win" hidden></b></div><div class="uc176-fields"><label><span data-w="cost"></span><div class="uc176-money"><span aria-hidden="true">$</span><input id="uc176-large-price" inputmode="decimal" type="number" min="0.01" max="1000000" step="0.01" value="10.50" aria-label="Large pack price"></div></label><label><span data-w="size"></span><input id="uc176-large-qty" type="number" inputmode="decimal" min="0.01" max="1000000" step="0.01" value="30" aria-label="Large pack quantity in oz"></label></div><div class="uc176-per"><span data-w="per"></span><strong id="uc176-large-unit">$0.35</strong><small>/ oz</small></div></article></div>
    <div id="uc176-result" class="uc176-result" role="status" aria-live="polite"><div><strong id="uc176-message"></strong><span id="uc176-explain"></span></div><strong id="uc176-difference">$0.05 <small>/ oz</small></strong></div>
    <p id="uc176-error" class="uc176-error" role="alert" hidden></p><div class="uc176-stats"><span><span data-w="average"></span><b id="uc176-average">$0.325</b></span><span><span data-w="median"></span><b id="uc176-median">$0.325</b></span><button type="button" id="uc176-reset" data-w="reset"></button></div>
    <footer class="uc176-foot" data-w="notice"></footer>`;
  const crumb=document.querySelector('.p19-breadcrumb');
  if(crumb)crumb.insertAdjacentElement('afterend',root);
  else{const main=document.querySelector('#p199-content')||document.querySelector('main');main?.parentNode?.insertBefore(root,main);}
  if(!root.isConnected)return;
  const $=sel=>root.querySelector(sel);
  const priceFmt=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:4});
  const fmt3=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:4});
  const valid=id=>{const e=$(id);const raw=e.value.trim();if(!raw||!/^\d+(?:\.\d+)?$/.test(raw))return NaN;const n=Number(raw);return Number.isFinite(n)&&n>0&&n<=1000000?n:NaN;};
  function calculate(){
    const w=TEXT[locale()];const p1=valid('#uc176-small-price'),q1=valid('#uc176-small-qty'),p2=valid('#uc176-large-price'),q2=valid('#uc176-large-qty');
    const good=[p1,q1,p2,q2].every(Number.isFinite);
    $('#uc176-error').hidden=good;$('#uc176-error').textContent=good?'':w.error;
    $('#uc176-result').hidden=!good;$('#uc176-small-unit').textContent=good?priceFmt(p1/q1):'—';$('#uc176-large-unit').textContent=good?priceFmt(p2/q2):'—';
    if(!good){$('#uc176-average').textContent='—';$('#uc176-median').textContent='—';['small','large'].forEach(k=>{$(`#uc176-${k}-card`).classList.remove('uc176-winner');$(`#uc176-${k}-badge`).hidden=true;});return;}
    const a=p1/q1,b=p2/q2,d=Math.abs(a-b),eq=Math.abs(a-b)<1e-9;
    const winner=eq?'tie':a<b?'small':'large';
    ['small','large'].forEach(k=>{$(`#uc176-${k}-card`).classList.toggle('uc176-winner',!eq&&winner===k);$(`#uc176-${k}-badge`).hidden=eq||winner!==k;});
    $('#uc176-message').textContent=eq?w.tie:w.save;
    $('#uc176-explain').textContent=eq?w.equal:w[winner==='small'?'smaller':'larger'];
    $('#uc176-difference').replaceChildren(document.createTextNode(priceFmt(d)+' '));const per=document.createElement('small');per.textContent=w.unit;$('#uc176-difference').append(per);
    $('#uc176-average').textContent=fmt3((a+b)/2);$('#uc176-median').textContent=fmt3((a+b)/2);
  }
  function translate(){const code=locale(),w=TEXT[code];root.lang=code;root.dir=code==='ar'?'rtl':'ltr';root.querySelectorAll('[data-w]').forEach(e=>{e.textContent=w[e.dataset.w]||'';});$('#uc176-store').href=`https://apps.apple.com/${region()}/app/id${APP}`;calculate();}
  ['#uc176-small-price','#uc176-small-qty','#uc176-large-price','#uc176-large-qty'].forEach(selector=>$(selector).addEventListener('input',calculate));
  $('#uc176-reset').addEventListener('click',()=>{[['#uc176-small-price','4.80'],['#uc176-small-qty','16'],['#uc176-large-price','10.50'],['#uc176-large-qty','30']].forEach(([sel,value])=>$(sel).value=value);calculate();});
  document.getElementById('p199-language')?.addEventListener('change',translate);
  document.getElementById('p199-country')?.addEventListener('change',translate);
  translate();
})();
