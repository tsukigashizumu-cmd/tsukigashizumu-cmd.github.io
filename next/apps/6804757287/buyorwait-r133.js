/* TSZ R133 — standalone LP illustration of the money/time tradeoff. No price prediction, network, storage, or real purchase. */
(()=>{
  'use strict';
  const APP_ID='6804757287', ROOT_ID='tsz-bw133';
  const INIT={price:'120',target:'100',days:'14'};
  const DICT={
    en:{eyebrow:'BUY OR WAIT · THE VALUE OF WAITING',tag:'INTERACTIVE WEBSITE EXAMPLE',title:'Would you wait 14 days to save $20?',intro:'Put a price on your own patience. Change today’s price, the price you hope for, and how long you are willing to wait.',price:'Price today',target:'Your target price',days:'Days you could wait',unit:'days',story:'Your hypothetical tradeoff',now:'Buy now',then:'If target price is reached',savings:'Potential savings',perDay:'Savings per day of waiting',prompt:'Would this saving be worth the wait to you?',preset:'Try waiting only 7 days',reset:'Reset website example',foot:'Illustration only · Nothing is stored or sent',noPredict:'This is not a price forecast. We do not know whether the price will fall, when it might fall, or whether the item will still be available. The target is your own preference.',error:'Enter a current price greater than 0, a target from 0 to today’s price, and a whole number of days from 1 to 365.',currency:'Illustrative USD amounts, not live prices',noSaving:'At the target you entered, there would be no price saving.',note:'Potential savings assume you can actually buy at the target price.'},
    ja:{eyebrow:'BUY OR WAIT · 待つ価値を見える化',tag:'LP専用・操作デモ',title:'14日待って20ドル安くなるなら、待つ価値はある？',intro:'待つかどうかは、自分で決める。今日の価格、希望価格、待てる日数を変えて、お金と時間の交換条件を確かめましょう。',price:'今日の価格',target:'買いたい価格',days:'待てる日数',unit:'日',story:'仮定の比較結果',now:'今買うなら',then:'希望価格で買えたら',savings:'節約できる金額',perDay:'待つ1日あたりの節約額',prompt:'あなたなら、この金額のために待ちますか？',preset:'7日待つ場合を試す',reset:'LPデモを初期化',foot:'LP専用サンプル · 保存・送信はしません',noPredict:'値下がりの予測ではありません。価格が下がるか、いつ下がるか、在庫が残るかは分かりません。希望価格は自分で決めるものです。',error:'今日の価格は0より大きく、希望価格は0〜今日の価格、待てる日数は1〜365の整数で入力してください。',currency:'米ドル建ての架空サンプル。実売価格ではありません',noSaving:'入力した希望価格では、価格差はありません。',note:'節約額は、希望価格で購入できた場合だけの仮定です。'},
    ar:{eyebrow:'BUY OR WAIT · قيمة الانتظار',tag:'مثال تفاعلي على الموقع فقط',title:'هل تنتظر 14 يومًا لتوفّر 20 دولارًا؟',intro:'القرار لك. غيّر سعر اليوم، والسعر الذي تتمناه، وعدد الأيام التي يمكنك الانتظار فيها لترى المقايضة بين الوقت والمال.',price:'السعر اليوم',target:'السعر الذي تتمناه',days:'أيام يمكنك الانتظار',unit:'يومًا',story:'مقارنة افتراضية',now:'الشراء الآن',then:'إذا وصلت إلى السعر المطلوب',savings:'التوفير المحتمل',perDay:'التوفير لكل يوم انتظار',prompt:'هل يستحق هذا التوفير الانتظار بالنسبة لك؟',preset:'جرّب انتظار 7 أيام',reset:'إعادة ضبط المثال',foot:'مثال على الموقع فقط · لا يتم حفظ البيانات أو إرسالها',noPredict:'هذا ليس توقعًا للأسعار. لا نعرف هل سينخفض السعر أو متى، ولا إن كان المنتج سيبقى متاحًا. السعر المستهدف تفضيلك الشخصي.',error:'أدخل سعرًا حاليًا أكبر من صفر، وسعرًا مستهدفًا بين صفر والسعر الحالي، وعدد أيام صحيحًا من 1 إلى 365.',currency:'المبالغ بالدولار الأمريكي للتوضيح فقط وليست أسعارًا حية',noSaving:'عند السعر المستهدف الذي اخترته، لا يوجد توفير في السعر.',note:'التوفير افتراضي ويتطلب إمكانية الشراء بالسعر المستهدف.'}
  };
  const $=(root,selector)=>root.querySelector(selector);
  const determineLanguage=()=>{
    const input=document.getElementById('p199-language');
    const raw=(input?.value||document.documentElement.lang||navigator.language||'en').toLowerCase();
    if(raw.startsWith('ar'))return 'ar';
    if(raw.startsWith('ja'))return 'ja';
    return 'en';
  };
  function mount(){
    if(document.getElementById(ROOT_ID)||!document.body)return;
    const bodyId=document.body.dataset.p199Id||document.body.dataset.p19AppId||'';
    if(bodyId&&bodyId!==APP_ID)return;
    if(!bodyId&&!document.querySelector(`a[href*="${APP_ID}"]`)&&!document.querySelector(`link[rel="canonical"][href*="${APP_ID}"]`))return;
    const target=document.getElementById('overview')||document.querySelector('main');
    if(!target)return;
    const root=document.createElement('section');root.id=ROOT_ID;root.dataset.websiteOnly='true';root.setAttribute('aria-labelledby','bw133-title');
    root.innerHTML=`<div class="bw133-meta"><span data-t="eyebrow"></span><span class="bw133-chip" data-t="tag"></span></div>
    <header class="bw133-header"><h2 id="bw133-title" data-t="title"></h2><p data-t="intro"></p></header>
    <div class="bw133-layout"><div class="bw133-form"><div class="bw133-fieldset">
      <label><span data-t="price"></span><div class="bw133-money"><span aria-hidden="true">$</span><input data-field="price" type="number" min="0.01" max="10000000" step="0.01" inputmode="decimal" required></div></label>
      <label><span data-t="target"></span><div class="bw133-money"><span aria-hidden="true">$</span><input data-field="target" type="number" min="0" max="10000000" step="0.01" inputmode="decimal" required></div></label>
      <label class="bw133-days"><span data-t="days"></span><div class="bw133-money"><input data-field="days" type="number" min="1" max="365" step="1" inputmode="numeric" required><span data-t="unit" aria-hidden="true"></span></div></label>
    </div><div class="bw133-action"><button type="button" data-action="week" data-t="preset"></button></div><p class="bw133-currency" data-t="currency"></p></div>
    <div class="bw133-result" aria-live="polite"><div class="bw133-small" data-t="story"></div><div class="bw133-prices">
      <div class="bw133-price"><span data-t="now"></span><strong data-out="now"></strong></div><div class="bw133-arrow" aria-hidden="true">→</div><div class="bw133-price"><span data-t="then"></span><strong data-out="then"></strong></div>
    </div><div class="bw133-graph" aria-hidden="true"><span class="bw133-progress"></span></div>
    <div class="bw133-metrics"><div><span data-t="savings"></span><strong data-out="savings"></strong></div><div><span data-t="perDay"></span><strong data-out="perDay"></strong></div></div>
    <p class="bw133-question" data-t="prompt"></p><p class="bw133-footnote" data-t="note"></p><p class="bw133-zero" data-t="noSaving" hidden></p></div></div>
    <p class="bw133-error" data-out="error" role="alert" hidden></p><p class="bw133-disclaimer" data-t="noPredict"></p>
    <div class="bw133-bottom"><span data-t="foot"></span><button type="button" data-action="reset" data-t="reset"></button></div>`;
    if(target.id==='overview')target.insertAdjacentElement('afterend',root);else target.prepend(root);
    for(const [k,v] of Object.entries(INIT))$(root,`[data-field="${k}"]`).value=v;
    let last='';
    function render(){
      const lang=determineLanguage(),t=DICT[lang];last=lang;root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(n=>{n.textContent=t[n.dataset.t]||''});
      return {lang,t};
    }
    function calculate(){
      const {lang,t}=render(),read=k=>$(root,`[data-field="${k}"]`).value;
      const price=Number(read('price')),targetPrice=Number(read('target')),days=Number(read('days'));
      const valid=read('price').trim()!==''&&read('target').trim()!==''&&read('days').trim()!==''&&Number.isFinite(price)&&price>0&&price<=10000000&&Number.isFinite(targetPrice)&&targetPrice>=0&&targetPrice<=price&&Number.isInteger(days)&&days>=1&&days<=365;
      root.dataset.valid=String(valid);
      const error=$(root,'[data-out="error"]');error.hidden=valid;error.textContent=valid?'':t.error;
      const money=n=>new Intl.NumberFormat(lang==='ja'?'ja-JP':lang==='ar'?'ar-SA':'en-US',{style:'currency',currency:'USD',currencyDisplay:'symbol',maximumFractionDigits:2,minimumFractionDigits:2}).format(n);
      if(!valid){root.dataset.savings='';root.dataset.perDay='';for(const k of ['now','then','savings','perDay'])$(root,`[data-out="${k}"]`).textContent='—';$(root,'.bw133-progress').style.width='0%';$(root,'.bw133-zero').hidden=true;return}
      const saved=Math.max(0,Math.round((price-targetPrice)*100)/100),perDay=saved/days;
      root.dataset.savings=saved.toFixed(2);root.dataset.perDay=perDay.toFixed(2);root.dataset.days=String(days);
      $(root,'[data-out="now"]').textContent=money(price);$(root,'[data-out="then"]').textContent=money(targetPrice);
      $(root,'[data-out="savings"]').textContent=money(saved);$(root,'[data-out="perDay"]').textContent=money(perDay);
      $(root,'.bw133-progress').style.width=(Math.max(0,Math.min(100,100*targetPrice/price)))+'%';
      $(root,'.bw133-zero').hidden=saved>0;
    }
    root.addEventListener('input',e=>{if(e.target.matches('[data-field]'))calculate()});
    root.addEventListener('click',e=>{const button=e.target.closest('button[data-action]');if(!button||!root.contains(button))return;
      if(button.dataset.action==='week')$(root,'[data-field="days"]').value='7';
      if(button.dataset.action==='reset')for(const [k,v] of Object.entries(INIT))$(root,`[data-field="${k}"]`).value=v;
      calculate();
    });
    document.getElementById('p199-language')?.addEventListener('change',calculate);
    new MutationObserver(()=>{if(last!==determineLanguage())calculate()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    calculate();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
