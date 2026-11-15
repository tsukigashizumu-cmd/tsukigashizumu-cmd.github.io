/* R217 Cart Budget Calculator: illustrative cart-budget comparison. No storage, payments or product feeds. */
(() => {
  'use strict';
  const APP='6802814389', ID='tsz-cart-r217', P='cb217';
  const body=document.body;
  if(!body || (body.dataset.p199Id || body.dataset.p19AppId)!==APP || document.getElementById(ID))return;
  const main=document.querySelector('main');if(!main)return;
  const translations={
    en:{eyebrow:'CART BUDGET / THE NEXT ITEM',title:'One more item. Still within budget?',lead:'That last item looks small—until you see what it does to the full cart. Compare the total before and after.',choose:'CHOOSE AN EXAMPLE',over:'Over budget',under:'Within budget',exact:'Right on budget',edit:'ADJUST THE AMOUNTS',budget:'Your budget',cart:'Current cart total',item:'One more item',unit:'Illustrative USD amounts · enter manually',before:'BEFORE ADDING',after:'AFTER ADDING',remaining:'Budget remaining',total:'Projected cart total',impact:'THE DIFFERENCE',overTitle:'This item goes over budget',underTitle:'This item fits your budget',exactTitle:'Exactly at your budget',alreadyTitle:'The cart is already over budget',overBody:'Your projected cart total is above your entered budget.',underBody:'There is still some room in your budget after adding this item.',exactBody:'Adding this item uses the entire remaining budget.',alreadyBody:'The cart already exceeds your budget before the extra item.',overLabel:'over',leftLabel:'left',exactLabel:'exactly',invalid:'Enter valid USD amounts between 0 and 1,000,000, with up to two decimal places. Budget must be above zero.',reset:'Reset example',language:'Language',region:'App Store region',cta:'See Cart Budget Calculator',note:'This is a website-only manual arithmetic example, not your saved cart. It does not scan products, include automatic tax or shipping, track prices, charge cards, or save data. Add any tax and delivery costs to your own totals.',takeaway:'See the whole cart, not just the price tag.',beforeTag:'CURRENT SPEND',afterTag:'WITH ONE MORE',ratio:'Portion of budget used',finePrint:'USD example — App Store region only changes the destination link.'},
    ja:{eyebrow:'CART BUDGET / あと1品の判断',title:'あと1品、予算に入る？',lead:'小さな買い物でも、カート全体で見ると答えが変わります。追加前と追加後の合計を比べましょう。',choose:'例を選ぶ',over:'予算オーバー',under:'予算内に収まる',exact:'予算ぴったり',edit:'金額を調整する',budget:'買い物の予算',cart:'現在のカート合計',item:'追加したい1品',unit:'米ドルの計算例 · 手入力',before:'追加する前',after:'追加した後',remaining:'予算の残り',total:'追加後のカート合計',impact:'追加するとどうなる？',overTitle:'この1品で予算オーバー',underTitle:'追加しても予算内',exactTitle:'追加すると予算ぴったり',alreadyTitle:'追加前から予算オーバー',overBody:'追加後の合計が、入力した予算を超えます。',underBody:'追加後も、まだ予算に余裕があります。',exactBody:'追加すると、残っていた予算をちょうど使い切ります。',alreadyBody:'1品を追加する前から、合計が予算を超えています。',overLabel:'超過',leftLabel:'残り',exactLabel:'一致',invalid:'金額は0〜1,000,000の範囲で小数第2位まで入力してください。予算は0より大きくしてください。',reset:'初期値に戻す',language:'言語',region:'App Store地域',cta:'App StoreでCart Budgetを見る',note:'手入力によるWeb上の計算例です。実際の保存済みカートではありません。商品情報の自動取得・税や送料の自動加算・価格追跡・決済・データ保存は行いません。税や送料がある場合は、ご自身で合計に含めてください。',takeaway:'値札ではなく、カートの合計で決める。',beforeTag:'いまの合計',afterTag:'1品追加した合計',ratio:'予算に対する使用割合',finePrint:'米ドルの計算例。地域切替はApp Storeのリンク先のみ変更します。'},
    ar:{eyebrow:'ميزانية السلة / إضافة أخيرة',title:'منتج إضافي... هل يبقى ضمن الميزانية؟',lead:'قد يبدو سعر المنتج صغيرًا، لكن المهم هو إجمالي السلة. قارن المبلغ قبل الإضافة وبعدها.',choose:'اختر مثالاً',over:'فوق الميزانية',under:'ضمن الميزانية',exact:'الميزانية تمامًا',edit:'غيّر المبالغ',budget:'ميزانيتك',cart:'السلة الحالية',item:'المنتج الإضافي',unit:'مثال بالدولار الأمريكي · إدخال يدوي',before:'قبل الإضافة',after:'بعد الإضافة',remaining:'المتبقي من الميزانية',total:'إجمالي السلة المتوقع',impact:'ما الذي تغيّر؟',overTitle:'هذه الإضافة تتجاوز الميزانية',underTitle:'هذه الإضافة تناسب ميزانيتك',exactTitle:'تصل للميزانية بالضبط',alreadyTitle:'السلة فوق الميزانية من قبل',overBody:'الإجمالي بعد الإضافة أكبر من الميزانية المدخلة.',underBody:'يبقى مبلغ متاح بعد إضافة المنتج.',exactBody:'تستخدم الإضافة كل المبلغ المتبقي.',alreadyBody:'الإجمالي الحالي يتجاوز الميزانية قبل الإضافة.',overLabel:'فوق',leftLabel:'متبقٍ',exactLabel:'بالضبط',invalid:'أدخل مبالغ بين 0 و 1,000,000 بدقتين عشريتين كحد أقصى. يجب أن تكون الميزانية أكبر من صفر.',reset:'إعادة المثال',language:'اللغة',region:'منطقة App Store',cta:'شاهد Cart Budget على App Store',note:'مثال حساب يدوي على هذا الموقع فقط، وليس سلة محفوظة. لا يجلب بيانات المنتجات ولا يضيف الضرائب أو الشحن تلقائيًا ولا يتتبع الأسعار ولا يدفع أو يحفظ البيانات. أضف الضرائب والتوصيل إلى الإجمالي بنفسك.',takeaway:'انظر إلى مجموع السلة، لا إلى سعر المنتج وحده.',beforeTag:'السلة الآن',afterTag:'بعد إضافة منتج',ratio:'النسبة المستخدمة من الميزانية',finePrint:'مثال بالدولار الأمريكي. المنطقة تغيّر رابط المتجر فقط.'}
  };
  const scenarios={over:{budget:60,cart:46,item:19},under:{budget:60,cart:46,item:8},exact:{budget:60,cart:46,item:14}};
  const normLang=v=>/^ar(?:$|[-_])/i.test(v||'')?'ar':/^ja(?:$|[-_])/i.test(v||'')?'ja':'en';
  const normRegion=v=>/^(jp|japan|ja-jp)$/i.test(v||'')?'jp':'us';
  function host(kind){const choices=kind==='language'?'#p199-language,#p19-language,#cartbudget-language,#cb29-language,#cb64-language,#cb105-language':'#p199-country,#p19-country,#cartbudget-country,#cb29-country,#cb64-country,#cb105-country';for(const s of choices.split(',')){const e=document.querySelector(s);if(e&&!section.contains(e))return e;}return null;}
  const starterLang=document.querySelector('#p199-language,#p19-language,#cartbudget-language,#cb29-language');
  const starterRegion=document.querySelector('#p199-country,#p19-country,#cartbudget-country,#cb29-country');
  let lang=starterLang&&starterLang.value?normLang(starterLang.value):'en';
  let region=starterRegion&&starterRegion.value?normRegion(starterRegion.value):'us';
  let active='over',syncing=false;
  const section=document.createElement('section');section.id=ID;section.setAttribute('aria-label','Cart Budget manual comparison example');
  section.innerHTML=`<div class="cb217-shell">
  <div class="cb217-top"><span class="cb217-logo"><span class="cb217-icon" aria-hidden="true">▧</span> CART BUDGET <small>/ R217</small></span><span class="cb217-topright">SPEND WITH CLARITY</span></div>
  <header class="cb217-hero"><div class="cb217-eyebrow" data-t="eyebrow"></div><h2 data-t="title"></h2><p data-t="lead"></p></header>
  <div class="cb217-layout">
    <div class="cb217-entry"><div class="cb217-step"><b>01</b><span data-t="choose"></span></div><div class="cb217-presets"><button type="button" data-scenario="over" data-t="over"></button><button type="button" data-scenario="under" data-t="under"></button><button type="button" data-scenario="exact" data-t="exact"></button></div>
    <div class="cb217-step cb217-step2"><b>02</b><span data-t="edit"></span></div><p class="cb217-hint" data-t="unit"></p>
    <div class="cb217-fields"><label><span data-t="budget"></span><span class="cb217-input"><em>$</em><input id="cb217-budget" inputmode="decimal" aria-label="Budget" value="60"/></span></label><label><span data-t="cart"></span><span class="cb217-input"><em>$</em><input id="cb217-cart" inputmode="decimal" aria-label="Current cart" value="46"/></span></label><label><span data-t="item"></span><span class="cb217-input"><em>$</em><input id="cb217-item" inputmode="decimal" aria-label="Extra item" value="19"/></span></label></div>
    <p id="cb217-error" role="alert" data-t="invalid" class="cb217-error" hidden></p><button type="button" id="cb217-reset" class="cb217-reset">↺ <span data-t="reset"></span></button></div>
    <div class="cb217-result" aria-live="polite"><div class="cb217-step"><b>03</b><span data-t="impact"></span></div>
      <div class="cb217-compare"><div class="cb217-card"><span data-t="before"></span><strong id="cb217-before">$14.00</strong><small data-t="remaining"></small><div class="cb217-cap" data-t="beforeTag"></div></div><div class="cb217-card cb217-card-next"><span data-t="after"></span><strong id="cb217-after">$65.00</strong><small data-t="total"></small><div class="cb217-cap" data-t="afterTag"></div></div></div>
      <div class="cb217-track-header"><span data-t="ratio"></span><strong id="cb217-percent">108%</strong></div><div class="cb217-track"><div id="cb217-fill"></div><i aria-hidden="true"></i></div><div class="cb217-track-labels"><span>$0</span><span id="cb217-budget-cap">$60.00</span></div>
      <div class="cb217-verdict" id="cb217-verdict" data-state="over"><span class="cb217-dot" aria-hidden="true">●</span><div><strong id="cb217-verdict-title"></strong><p id="cb217-verdict-body"></p></div><b id="cb217-diff">$5.00</b></div>
    </div>
  </div>
  <footer class="cb217-foot"><p class="cb217-closer" data-t="takeaway"></p><p class="cb217-note" data-t="note"></p><p class="cb217-small" data-t="finePrint"></p><div class="cb217-actions"><div class="cb217-locale"><label><span data-t="language"></span><select id="cb217-lang"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="cb217-region"><option value="us">US</option><option value="jp">JP</option></select></label></div><a id="cb217-store" target="_blank" rel="noopener noreferrer"><span data-t="cta"></span><span aria-hidden="true">↗</span></a></div></footer>
  </div>`;
  main.prepend(section);
  const $=selector=>section.querySelector(selector);
  const fmt=n=>new Intl.NumberFormat(lang==='ar'?'ar-EG':lang==='ja'?'ja-JP':'en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
  const percent=n=>new Intl.NumberFormat(lang==='ar'?'ar-EG':'en-US',{maximumFractionDigits:0}).format(n)+'%';
  function amount(key){const s=$('#cb217-'+key).value.trim();if(!/^(?:\d{1,7})(?:\.\d{1,2})?$/.test(s))return null;const v=Number(s);return Number.isFinite(v)&&v>=0&&v<=1000000?v:null;}
  function paint(){
    const t=translations[lang];section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';
    section.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.dataset.t]||'';});
    $('#cb217-lang').value=lang;$('#cb217-region').value=region;
    $('#cb217-store').href=`https://apps.apple.com/${region}/app/cart-budget-calculator/id${APP}`;
    section.querySelectorAll('[data-scenario]').forEach(el=>el.setAttribute('aria-pressed',String(active===el.dataset.scenario)));
    const budget=amount('budget'),cart=amount('cart'),item=amount('item');
    const valid=budget!==null&&budget>0&&cart!==null&&item!==null&&cart+item<=2000000;
    $('#cb217-error').hidden=valid;$('.cb217-result').classList.toggle('cb217-invalid',!valid);
    if(!valid){$('#cb217-before').textContent='—';$('#cb217-after').textContent='—';$('#cb217-percent').textContent='—';$('#cb217-budget-cap').textContent='—';$('#cb217-diff').textContent='—';$('#cb217-verdict-title').textContent='—';$('#cb217-verdict-body').textContent='';$('#cb217-fill').style.width='0%';return;}
    const total=Math.round((cart+item)*100)/100,delta=Math.round((total-budget)*100)/100,before=Math.round((budget-cart)*100)/100;
    const status=cart>budget?'already':delta>0?'over':delta<0?'under':'exact';
    $('#cb217-before').textContent=fmt(before);$('#cb217-after').textContent=fmt(total);
    $('#cb217-percent').textContent=percent(Math.round(total/budget*100));
    $('#cb217-fill').style.width=(Math.min(100,Math.max(0,total/budget*100)))+'%';
    $('#cb217-budget-cap').textContent=fmt(budget);$('#cb217-verdict').dataset.state=status;
    $('#cb217-verdict-title').textContent=t[status+'Title'];$('#cb217-verdict-body').textContent=t[status+'Body'];
    $('#cb217-diff').textContent=fmt(Math.abs(delta))+' '+(delta>0?t.overLabel:delta<0?t.leftLabel:t.exactLabel);
  }
  function setScenario(name){const values=scenarios[name];if(!values)return;active=name;Object.keys(values).forEach(key=>{$('#cb217-'+key).value=String(values[key]);});paint();}
  section.querySelectorAll('[data-scenario]').forEach(button=>button.addEventListener('click',()=>setScenario(button.dataset.scenario)));
  section.querySelectorAll('.cb217-input input').forEach(el=>el.addEventListener('input',()=>{active='';paint();}));
  $('#cb217-reset').addEventListener('click',()=>setScenario('over'));
  function syncHost(kind,value){const el=host(kind);if(!el||!el.options||!el.options.length)return;const norm=kind==='language'?normLang:normRegion;const option=Array.from(el.options).find(o=>norm(o.value)===value&&(value!=='en'||/^en/i.test(o.value))&&(value!=='us'||/^us/i.test(o.value)));if(option&&el.value!==option.value){el.value=option.value;el.dispatchEvent(new Event('change',{bubbles:true}));}}
  function sync(){if(syncing)return;syncing=true;try{syncHost('language',lang);syncHost('region',region);}finally{syncing=false;}}
  $('#cb217-lang').addEventListener('change',event=>{lang=normLang(event.target.value);paint();sync();});
  $('#cb217-region').addEventListener('change',event=>{region=normRegion(event.target.value);paint();sync();});
  document.addEventListener('change',event=>{if(syncing||section.contains(event.target))return;if(event.target===host('language')){lang=normLang(event.target.value);paint();}else if(event.target===host('region')){region=normRegion(event.target.value);paint();}});
  setScenario('over');
})();
