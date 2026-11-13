/* Nokarvo LP R180 — illustrative usable-yield price comparison. No network, storage or telemetry. */
(() => {
  'use strict';
  const APP='6820674560', ID='tsz-nokarvo-r180';
  if(!document.body || document.body.dataset.p199Id!==APP || document.getElementById(ID))return;
  const labels={
    en:{brand:'Nokarvo',kicker:'THE USEFUL PRICE COMPARISON',title1:'The cheaper pack',title2:'can cost more.',lead:'Compare what you can actually use.',whole:'Whole pineapple',prepared:'Prepared pineapple',price:'Price ($)',amount:'Pack amount (g)',loss:'Unusable portion (%)',usable:'Usable amount',shelf:'Shelf price / kg',effective:'Usable price / kg',shelfBest:'On the shelf',usableBest:'After waste',diff:'Price advantage / kg',flips:'THE WINNER FLIPS',same:'Same winner',near:'Too close to call',a:'A is cheaper',b:'B is cheaper',tie:'Nearly equal',betterA:'A is better',betterB:'B is better',savings:'{amount} / kg',reset:'Reset example',try:'Try another loss rate',invalid:'Use positive pack amounts (up to 1,000,000 g), prices from $0 to $100,000, and waste rates from 0% to less than 100%. Use no more than two decimals.',caveat:'Illustrative values only. Actual loss varies with trimming and handling. This demo does not retrieve prices or verify product claims.',store:'View on the App Store',priceTip:'The price on the shelf can hide the cost of waste.',difference:'Difference after waste',per:'per kg'},
    ja:{brand:'Nokarvo',kicker:'使える量で本当の単価を比較',title1:'安いパックが、',title2:'結局高いことも。',lead:'実際に使える量で比べよう。',whole:'丸ごとパイナップル',prepared:'カットパイナップル',price:'購入価格（$）',amount:'内容量（g）',loss:'使わない割合（%）',usable:'使える量',shelf:'店頭単価 / kg',effective:'使える量の単価 / kg',shelfBest:'店頭価格では',usableBest:'使える量では',diff:'単価差 / kg',flips:'安い方が逆転！',same:'同じ商品が有利',near:'差が小さいため参考値',a:'Aが安い',b:'Bが安い',tie:'ほぼ同額',betterA:'Aがお得',betterB:'Bがお得',savings:'{amount} / kg',reset:'初期値に戻す',try:'廃棄率を変更',invalid:'内容量は0より大きく100万g以下、価格は0〜10万ドル、使わない割合は0%以上100%未満で入力してください。小数点以下は最大2桁です。',caveat:'数値は架空の計算例です。実際に使えない割合は切り方や使い方で変わります。価格取得・商品評価は行いません。',store:'App Storeで見る',priceTip:'店頭の安さと、使える部分の安さは別。',difference:'使える量での単価差',per:'1kgあたり'},
    ar:{brand:'Nokarvo',kicker:'قارن التكلفة حسب الكمية القابلة للاستخدام',title1:'العبوة الأرخص',title2:'قد تكلّف أكثر.',lead:'قارن ما يمكنك استخدامه فعلاً.',whole:'أناناس كامل',prepared:'أناناس مقطّع',price:'السعر ($)',amount:'وزن العبوة (غ)',loss:'الجزء غير القابل للاستخدام (%)',usable:'الكمية المفيدة',shelf:'سعر الرف / كغ',effective:'سعر الكمية المفيدة / كغ',shelfBest:'على الرف',usableBest:'بعد الفاقد',diff:'فرق السعر / كغ',flips:'تنقلب النتيجة',same:'الخيار نفسه أفضل',near:'الفارق ضئيل',a:'A أرخص',b:'B أرخص',tie:'متقاربان',betterA:'A أفضل',betterB:'B أفضل',savings:'{amount} / كغ',reset:'إعادة القيم',try:'جرّب نسبة فاقد أخرى',invalid:'أدخل وزن عبوة أكبر من صفر وبحد أقصى 1,000,000 غ، وسعراً من صفر إلى 100,000 دولار، وفاقداً أقل من 100%. منزلتان عشريتان كحد أقصى.',caveat:'الأرقام للتوضيح فقط. يختلف الفاقد حسب التقشير والتحضير. لا يتم جلب الأسعار أو تقييم المنتجات.',store:'عرضه على App Store',priceTip:'قد يخفي سعر الرف تكلفة الجزء غير المستخدم.',difference:'الفرق بعد الفاقد',per:'لكل كغ'}
  };
  const root=document.createElement('section');root.id=ID;root.className='nk180';root.setAttribute('aria-labelledby','nk180-title');
  root.innerHTML=`
   <div class="nk180-header"><span class="nk180-logo" aria-hidden="true">✳</span><strong data-t="brand">Nokarvo</strong><span class="nk180-header-tag" data-t="kicker"></span></div>
   <div class="nk180-hero"><div class="nk180-hero-copy"><span class="nk180-kicker" data-t="kicker"></span><h2 id="nk180-title"><span data-t="title1"></span><em data-t="title2"></em></h2><p data-t="lead"></p></div>
   <div class="nk180-art" aria-hidden="true"><div class="nk180-pine"><div class="nk180-leaves">♣</div><div class="nk180-fruit"></div></div><div class="nk180-cup"><span>▣</span><div class="nk180-cubes"><b></b><b></b><b></b><b></b><b></b><b></b></div></div></div></div>
   <form id="nk180-form" class="nk180-inputs" novalidate>
     <fieldset class="nk180-card" id="nk180-card-a"><legend><span class="nk180-letter">A</span> <span data-t="whole"></span></legend>
       <label><span data-t="price"></span><input id="nk180-a-price" value="4.50" type="number" inputmode="decimal" min="0" max="100000" step="0.01" /></label>
       <label><span data-t="amount"></span><input id="nk180-a-grams" value="1000" type="number" inputmode="decimal" min="0.01" max="1000000" step="0.01" /></label>
       <label><span data-t="loss"></span><input id="nk180-a-loss" value="40" type="number" inputmode="decimal" min="0" max="99.99" step="0.01" /></label>
       <div class="nk180-output"><div><span data-t="usable"></span><strong id="nk180-a-usable">600 g</strong></div><div><span data-t="shelf"></span><strong id="nk180-a-shelf">$4.50</strong></div><div class="nk180-price"><span data-t="effective"></span><strong id="nk180-a-unit">$7.50</strong></div></div>
     </fieldset>
     <fieldset class="nk180-card" id="nk180-card-b"><legend><span class="nk180-letter">B</span> <span data-t="prepared"></span></legend>
       <label><span data-t="price"></span><input id="nk180-b-price" value="5.40" type="number" inputmode="decimal" min="0" max="100000" step="0.01" /></label>
       <label><span data-t="amount"></span><input id="nk180-b-grams" value="900" type="number" inputmode="decimal" min="0.01" max="1000000" step="0.01" /></label>
       <label><span data-t="loss"></span><input id="nk180-b-loss" value="10" type="number" inputmode="decimal" min="0" max="99.99" step="0.01" /></label>
       <div class="nk180-output"><div><span data-t="usable"></span><strong id="nk180-b-usable">810 g</strong></div><div><span data-t="shelf"></span><strong id="nk180-b-shelf">$6.00</strong></div><div class="nk180-price"><span data-t="effective"></span><strong id="nk180-b-unit">$6.67</strong></div></div>
     </fieldset>
   </form>
   <p class="nk180-error" id="nk180-error" role="alert" hidden></p>
   <div id="nk180-verdict" class="nk180-verdict" aria-live="polite" role="status">
     <strong class="nk180-badge" id="nk180-badge" data-t="flips"></strong>
     <div class="nk180-summary"><div><small data-t="shelfBest"></small><strong id="nk180-shelf-winner">A is cheaper</strong></div><span class="nk180-arrow" aria-hidden="true">⇢</span><div><small data-t="usableBest"></small><strong id="nk180-usable-winner">B is better</strong></div><div><small data-t="diff"></small><strong id="nk180-difference">≈ $0.83/kg</strong></div></div>
   </div>
   <div class="nk180-bottom"><div class="nk180-actions"><button type="button" id="nk180-try" data-t="try"></button><button type="button" id="nk180-reset" data-t="reset"></button></div><p class="nk180-tip" data-t="priceTip"></p><a id="nk180-store" href="https://apps.apple.com/us/app/id6820674560" target="_blank" rel="noopener noreferrer"><span data-t="store"></span><span aria-hidden="true">↗</span></a><p class="nk180-caveat" data-t="caveat"></p></div>`;
  const anchor=document.querySelector('.p19-breadcrumb');
  if(anchor&&anchor.parentNode)anchor.insertAdjacentElement('afterend',root);
  else {const point=document.querySelector('#p199-content')||document.querySelector('main');if(point&&point.parentNode)point.parentNode.insertBefore(root,point);}
  if(!root.isConnected)return;
  const $=selector=>root.querySelector(selector);
  const lang=()=>{const v=((document.querySelector('#p199-language')?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en')+'').toLowerCase();return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en';};
  const country=()=>{const v=(document.querySelector('#p199-country')?.value||'us').toLowerCase();return /^[a-z]{2}$/.test(v)?v:'us';};
  const money=x=>'$'+x.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  const grams=x=>x.toLocaleString('en-US',{maximumFractionDigits:2})+' g';
  const ids=['a-price','a-grams','a-loss','b-price','b-grams','b-loss'];
  function parseNumber(id,max,zeroOK){
    const s=$('#nk180-'+id).value.trim();
    if(!/^\d+(?:\.\d{1,2})?$/.test(s))return NaN;
    const n=Number(s);return Number.isFinite(n)&&n<=max&&(zeroOK?n>=0:n>0)?n:NaN;
  }
  let language='en';
  function winning(a,b){const tol=0.005;return Math.abs(a-b)<=tol?'tie':a<b?'a':'b';}
  function recalc(){
    const t=labels[language];
    const a={p:parseNumber('a-price',100000,true),g:parseNumber('a-grams',1000000,false),loss:parseNumber('a-loss',99.99,true)};
    const b={p:parseNumber('b-price',100000,true),g:parseNumber('b-grams',1000000,false),loss:parseNumber('b-loss',99.99,true)};
    let valid=[a.p,a.g,a.loss,b.p,b.g,b.loss].every(Number.isFinite);
    for(const v of [a,b]){v.usable=v.g*(1-v.loss/100);v.shelf=1000*v.p/v.g;v.unit=1000*v.p/v.usable; if(!Number.isFinite(v.usable)||v.usable<=0||!Number.isFinite(v.unit))valid=false;}
    $('#nk180-error').hidden=valid;
    $('#nk180-error').textContent=valid?'':t.invalid;
    $('#nk180-verdict').hidden=!valid;
    root.querySelectorAll('.nk180-output').forEach(el=>el.hidden=!valid);
    if(!valid)return;
    for(const [key,v] of [['a',a],['b',b]]){
      $('#nk180-'+key+'-usable').textContent=grams(v.usable);
      $('#nk180-'+key+'-shelf').textContent=money(v.shelf)+'/kg';
      $('#nk180-'+key+'-unit').textContent=money(v.unit)+'/kg';
    }
    const sw=winning(a.shelf,b.shelf),uw=winning(a.unit,b.unit),difference=Math.abs(a.unit-b.unit);
    const flip=sw!=='tie'&&uw!=='tie'&&sw!==uw;
    $('#nk180-shelf-winner').textContent=t[sw];
    $('#nk180-usable-winner').textContent=t[uw==='a'?'betterA':uw==='b'?'betterB':'tie'];
    $('#nk180-difference').textContent='≈ '+money(difference)+'/kg';
    $('#nk180-badge').textContent=flip?t.flips:uw==='tie'?t.near:t.same;
    $('#nk180-verdict').dataset.state=flip?'flip':uw==='tie'?'near':'same';
    $('#nk180-card-a').dataset.winner=uw==='a'?'yes':'no';
    $('#nk180-card-b').dataset.winner=uw==='b'?'yes':'no';
  }
  function translate(){
    language=lang();root.lang=language;root.dir=language==='ar'?'rtl':'ltr';const t=labels[language];
    root.querySelectorAll('[data-t]').forEach(node=>{const value=t[node.dataset.t];if(value!==undefined)node.textContent=value;});
    for(const k of ['a','b'])for(const field of ['price','grams','loss']){
      const label=field==='grams'?'amount':field;$('#nk180-'+k+'-'+field).setAttribute('aria-label',(k.toUpperCase()+' '+t[label]));
    }
    $('#nk180-store').href='https://apps.apple.com/'+country()+'/app/id'+APP;
    recalc();
  }
  ids.forEach(id=>$('#nk180-'+id).addEventListener('input',recalc));
  $('#nk180-form').addEventListener('submit',ev=>ev.preventDefault());
  $('#nk180-reset').addEventListener('click',()=>{const reset=['4.50','1000','40','5.40','900','10'];ids.forEach((id,i)=>$('#nk180-'+id).value=reset[i]);recalc();});
  $('#nk180-try').addEventListener('click',()=>{$('#nk180-a-loss').value='5';recalc();});
  document.querySelector('#p199-language')?.addEventListener('change',translate);
  document.querySelector('#p199-country')?.addEventListener('change',translate);
  translate();
})();
