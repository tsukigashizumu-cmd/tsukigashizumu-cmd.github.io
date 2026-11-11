/* TSZ LP R170 / Buy Price / website-only illustrative calculator.
   No app source changes. No network requests, tracking, storage, or dependencies. */
(()=>{
  'use strict';
  const APP='6804756267', ID='tsz-buyprice-r170';
  if(document.body?.dataset.p199Id!==APP || document.getElementById(ID))return;
  const words={
    en:{brand:'BUY PRICE',top:'THE PRICE IS YOURS TO CHOOSE',how:'How it works',title:'Know your number before the sale.',sub:'Choose what you\u2019d pay. See the discount worth waiting for.',regular:'REGULAR PRICE',target:'YOUR BUY PRICE',needed:'DISCOUNT NEEDED',off:'OFF',tag:'Your target, not the store\u2019s hype.',store:'View on the App Store',a:'Set your threshold',ad:'Enter the price you\u2019re willing to pay.',b:'Save comparisons',bd:'Keep your calculations for later in the app.',c:'Explore tax & stacked discounts',cd:'Work through more complex price choices in the app.',offer:'TRY A SALE DISCOUNT',try:'Store discount',out:'Price after discount',gap:'Compared with your buy price',meet:'Meets your target',above:'above target',below:'below target',equal:'exactly on target',invalid:'Enter a regular price above zero and a valid buy price.',warning:'Illustrative USD values. Prices are not monitored and no alerts are sent. Nothing here is stored or transmitted.',reset:'Reset sample',example:'Interactive example',hint:'Change either price to calculate the discount you would need.',labelRegular:'Regular price in US dollars',labelTarget:'Your target buy price in US dollars',labelOffer:'Sample sale discount percentage',ready:'Sample values restored.'},
    ja:{brand:'BUY PRICE',top:'買う値段は、自分で決める',how:'使い方',title:'セールの前に、買う値段を決めておく。',sub:'希望価格を決めれば、必要な割引率がわかる。',regular:'通常価格',target:'希望購入価格',needed:'必要な割引率',off:'OFF',tag:'お店の宣伝ではなく、自分の判断基準で。',store:'App Storeで見る',a:'希望価格を決める',ad:'払ってもいい金額を入力。',b:'比較を保存',bd:'アプリで計算結果をあとから見返せます。',c:'税金・重ねがけ割引',cd:'複雑な価格条件もアプリで検討。',offer:'セール価格を試す',try:'店頭の割引率',out:'割引後の金額',gap:'希望価格との差',meet:'希望価格を達成',above:'希望価格より高い',below:'希望価格より安い',equal:'希望価格と同じ',invalid:'通常価格は0より大きく、希望価格は0以上で入力してください。',warning:'金額は米ドルの架空例です。価格監視や通知は行いません。この操作は保存・送信されません。',reset:'初期値に戻す',example:'操作できる計算例',hint:'2つの金額を変えると、必要な割引率を再計算します。',labelRegular:'通常価格（米ドル）',labelTarget:'希望購入価格（米ドル）',labelOffer:'店頭割引率（例）',ready:'初期値に戻しました。'},
    ar:{brand:'BUY PRICE',top:'أنت من يحدد السعر المناسب',how:'كيف يعمل',title:'اعرف سعرك قبل بدء التخفيضات.',sub:'حدّد ما ترغب في دفعه، واعرف الخصم الذي يستحق الانتظار.',regular:'السعر العادي',target:'سعر الشراء الذي تريده',needed:'الخصم المطلوب',off:'خصم',tag:'هدفك أنت، لا حماس المتجر.',store:'عرضه على App Store',a:'حدّد هدفك',ad:'أدخل السعر الذي ترغب في دفعه.',b:'احتفظ بالمقارنات',bd:'ارجع إلى حساباتك لاحقًا داخل التطبيق.',c:'الضرائب والخصومات المتراكبة',cd:'قارن الخيارات الأكثر تعقيدًا داخل التطبيق.',offer:'جرّب خصمًا',try:'نسبة خصم المتجر',out:'السعر بعد الخصم',gap:'مقارنة بسعرك المستهدف',meet:'وصلت إلى السعر المستهدف',above:'أعلى من الهدف',below:'أقل من الهدف',equal:'يساوي السعر المستهدف',invalid:'أدخل سعرًا عاديًا أكبر من الصفر وسعر شراء صالحًا.',warning:'المبالغ أمثلة افتراضية بالدولار الأمريكي. لا تتم مراقبة الأسعار أو إرسال تنبيهات أو حفظ بياناتك أو نقلها.',reset:'إعادة المثال',example:'مثال تفاعلي',hint:'غيّر أيًّا من السعرين لحساب نسبة الخصم المطلوبة.',labelRegular:'السعر العادي بالدولار الأمريكي',labelTarget:'سعر الشراء المستهدف بالدولار الأمريكي',labelOffer:'نسبة خصم تجريبية',ready:'عادت القيم الأولى.'}
  };
  const section=document.createElement('section');
  section.id=ID;section.className='bp170';section.setAttribute('aria-labelledby','bp170-title');
  section.innerHTML=`
    <div class="bp170-top"><span class="bp170-brand"><span class="bp170-mark" aria-hidden="true">+<b>−</b><i>×</i><em>=</em></span><span data-bp170="brand"></span></span><span class="bp170-topline" data-bp170="top"></span><a href="#bp170-calculator" data-bp170="how"></a></div>
    <div class="bp170-heading"><div class="bp170-kicker">BUY PRICE / SMARTER PURCHASE DECISIONS</div><h2 id="bp170-title" data-bp170="title"></h2><p data-bp170="sub" class="bp170-sub"></p></div>
    <div class="bp170-calculator" id="bp170-calculator" aria-label="Interactive discount calculator">
       <label class="bp170-number bp170-regular"><span data-bp170="regular"></span><span class="bp170-field"><span aria-hidden="true">$</span><input id="bp170-regular" type="number" min="0.01" max="99999999" step="0.01" inputmode="decimal" value="120"></span></label>
       <label class="bp170-number bp170-target"><span data-bp170="target"></span><span class="bp170-field"><span aria-hidden="true">$</span><input id="bp170-target" type="number" min="0" max="99999999" step="0.01" inputmode="decimal" value="90"></span></label>
       <div class="bp170-result"><span data-bp170="needed"></span><strong id="bp170-needed" dir="ltr" aria-live="polite">25% <small>OFF</small></strong></div>
    </div>
    <div class="bp170-hint" data-bp170="hint"></div>
    <div class="bp170-strap"><span data-bp170="tag"></span></div>
    <div class="bp170-cta"><a id="bp170-store" href="https://apps.apple.com/us/app/id6804756267" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">●</span><span data-bp170="store"></span><span aria-hidden="true">›</span></a></div>
    <div class="bp170-features">
      <article><div class="bp170-feature-icon" aria-hidden="true">◎</div><div><h3 data-bp170="a"></h3><p data-bp170="ad"></p></div></article>
      <article><div class="bp170-feature-icon" aria-hidden="true">▱</div><div><h3 data-bp170="b"></h3><p data-bp170="bd"></p></div></article>
      <article><div class="bp170-feature-icon" aria-hidden="true">▱</div><div><h3 data-bp170="c"></h3><p data-bp170="cd"></p></div></article>
    </div>
    <div class="bp170-offer"><div class="bp170-offer-head"><span data-bp170="offer"></span><button type="button" id="bp170-reset" data-bp170="reset"></button></div>
      <label for="bp170-offer"><span data-bp170="try"></span> <strong id="bp170-offer-label" dir="ltr">20%</strong></label>
      <input id="bp170-offer" type="range" min="0" max="70" step="1" value="20">
      <div class="bp170-offer-metrics"><div><span data-bp170="out"></span><strong id="bp170-after" dir="ltr">$96.00</strong></div><div><span data-bp170="gap"></span><strong id="bp170-gap" dir="ltr">+$6.00</strong></div></div>
      <p id="bp170-feedback" role="status" aria-live="polite"></p>
    </div>
    <p class="bp170-note" data-bp170="warning"></p>`;
  const $=sel=>section.querySelector(sel);
  const reg=$('#bp170-regular'), target=$('#bp170-target'), slider=$('#bp170-offer');
  const money=n=>'$'+new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
  const valid=n=>Number.isFinite(n)&&n>=0&&n<=99999999;
  function language(){const selected=document.getElementById('p199-language');const raw=(selected?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();return raw.startsWith('ja')?'ja':raw.startsWith('ar')?'ar':'en';}
  function storeHref(){const raw=(document.getElementById('p199-country')?.value||'us').toLowerCase();const region=/^[a-z]{2}$/.test(raw)?raw:'us';return `https://apps.apple.com/${region}/app/id${APP}`;}
  function update(){const w=words[language()], r=reg.value.trim()===''?NaN:Number(reg.value), t=target.value.trim()===''?NaN:Number(target.value), p=Number(slider.value);
    $('#bp170-offer-label').textContent=p+'%';
    if(!valid(r)||r<=0||!valid(t)){
      $('#bp170-needed').textContent='—';$('#bp170-after').textContent='—';$('#bp170-gap').textContent='—';$('#bp170-feedback').textContent=w.invalid;section.classList.add('bp170-invalid');return;
    }
    section.classList.remove('bp170-invalid');
    const need=Math.max(0,(1-t/r)*100), result=r*(1-p/100), difference=result-t;
    const rounded=Math.round(need*10)/10, pct=Number.isInteger(rounded)?String(rounded):rounded.toFixed(1);
    $('#bp170-needed').innerHTML=pct+'% <small></small>';$('#bp170-needed small').textContent=w.off;
    $('#bp170-after').textContent=money(result);
    $('#bp170-gap').textContent=(difference>0.004?'+':difference<-.004?'−':'')+money(Math.abs(difference));
    $('#bp170-feedback').textContent=difference<-.004?w.below:difference>.004?w.above:w.equal;
    section.classList.toggle('bp170-met',difference<=.004);
  }
  function translate(){const code=language(),w=words[code];section.lang=code;section.dir=code==='ar'?'rtl':'ltr';
    section.querySelectorAll('[data-bp170]').forEach(el=>el.textContent=w[el.dataset.bp170]||'');
    reg.setAttribute('aria-label',w.labelRegular);target.setAttribute('aria-label',w.labelTarget);slider.setAttribute('aria-label',w.labelOffer);
    $('#bp170-store').href=storeHref();update();
  }
  for(const el of [reg,target,slider])el.addEventListener('input',update);
  $('#bp170-reset').addEventListener('click',()=>{reg.value='120';target.value='90';slider.value='20';update();});
  const anchor=document.querySelector('.p19-breadcrumb');
  if(anchor)anchor.insertAdjacentElement('afterend',section);
  else{const main=document.querySelector('#p199-content')||document.querySelector('main');main?.parentNode?.insertBefore(section,main);}
  if(!section.isConnected)return;
  document.body.classList.add('bp170-ready');
  translate();
  document.getElementById('p199-language')?.addEventListener('change',translate);
  document.getElementById('p199-country')?.addEventListener('change',()=>{$('#bp170-store').href=storeHref();});
  new MutationObserver(ch=>{if(ch.some(v=>v.attributeName==='lang'))translate();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
