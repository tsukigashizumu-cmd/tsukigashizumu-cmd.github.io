/* TSZ LP R210 — Buy or Wait Calculator. Fictional, non-persistent decision example. */
(() => {
  'use strict';
  if (!document.body || document.body.dataset.p199Id !== '6804757287') return;
  if (document.getElementById('tsz-buywait-r210')) return;
  const main = document.querySelector('main');
  if (!main) return;
  const root = document.createElement('section');
  root.id = 'tsz-buywait-r210';
  root.setAttribute('aria-labelledby','bw210-title');
  root.innerHTML = `
   <div class="bw210-shell">
    <div class="bw210-top"><span class="bw210-asterisk">✳</span><span data-bw210="eyebrow">THE PURCHASE DECISION, MADE VISIBLE</span><span class="bw210-tag" data-bw210="demo">INTERACTIVE SAMPLE · NOT SAVED</span></div>
    <div class="bw210-heading">
      <div><p class="bw210-issue">FIELD NOTE <span>210 — BUY OR WAIT</span></p><h2 id="bw210-title"><span data-bw210="h1">A lower price</span><em data-bw210="h2">isn't a reason yet.</em></h2><p class="bw210-lead" data-bw210="lead">Three signals. One clearer decision. Change the numbers to see why.</p></div>
      <div class="bw210-selects"><label><span data-bw210="language">LANGUAGE</span><select id="bw210-language" aria-label="Demo language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-bw210="region">APP STORE REGION</span><select id="bw210-country" aria-label="App Store region"><option value="us">US</option><option value="jp">JP</option></select></label></div>
    </div>
    <div class="bw210-dashboard">
     <div class="bw210-settings"><div class="bw210-panel-top"><span class="bw210-serial">01 / <span data-bw210="scenario">YOUR SCENARIO</span></span><span class="bw210-beacon">● <span data-bw210="live">LIVE EXAMPLE</span></span></div><h3 data-bw210="setTitle">Try the decision.</h3><p class="bw210-description" data-bw210="setDesc">Use fictional amounts. They never leave this page.</p>
      <div class="bw210-fields">
       <label><span data-bw210="current">Current price</span><span class="bw210-fieldwrap"><span class="bw210-symbol" data-bw210-currency>$</span><input id="bw210-price" type="number" min="0.01" step="any" inputmode="decimal" value="79" aria-label="Current price" /></span></label>
       <label><span data-bw210="usual">Usual price</span><span class="bw210-fieldwrap"><span class="bw210-symbol" data-bw210-currency>$</span><input id="bw210-usual" type="number" min="0.01" step="any" inputmode="decimal" value="100" aria-label="Usual price" /></span></label>
       <label><span data-bw210="limit">Your spending limit</span><span class="bw210-fieldwrap"><span class="bw210-symbol" data-bw210-currency>$</span><input id="bw210-limit" type="number" min="0.01" step="any" inputmode="decimal" value="85" aria-label="Your spending limit" /></span></label>
      </div>
      <div class="bw210-need"><span class="bw210-label" data-bw210="when">WHEN DO YOU NEED IT?</span><div id="bw210-need" class="bw210-need-buttons" role="group" aria-label="When do you need it?"><button type="button" data-need="soon" aria-pressed="true" data-bw210="soon">THIS WEEK</button><button type="button" data-need="later" aria-pressed="false" data-bw210="later">NO RUSH</button></div></div>
      <button type="button" class="bw210-reset" id="bw210-reset" data-bw210="reset">↺ Reset example</button>
     </div>
     <div class="bw210-result" id="bw210-result" data-state="buy"><div class="bw210-panel-top"><span class="bw210-serial">02 / <span data-bw210="decision">THE DECISION</span></span><span class="bw210-logic"><span class="bw210-dot"></span><span data-bw210="rule">3 SIGNALS</span></span></div>
      <p class="bw210-result-small" data-bw210="suggestion">SAMPLE RECOMMENDATION</p><div class="bw210-answer" id="bw210-answer" aria-live="polite">BUY NOW<span class="bw210-answer-mark">↗</span></div><p id="bw210-reason" class="bw210-reason" aria-live="polite">Below the usual price, within budget, and needed soon.</p>
      <div class="bw210-divider"></div><div class="bw210-evidence"><div><span data-bw210="discount">DISCOUNT VS. USUAL</span><strong id="bw210-discount">21%</strong><small id="bw210-discount-note">Saved $21</small></div><div><span data-bw210="headroom">ROOM IN BUDGET</span><strong id="bw210-headroom">$6</strong><small id="bw210-headroom-note">Within your limit</small></div></div>
      <div class="bw210-checks" id="bw210-checks" role="list" aria-label="Decision signals"></div>
     </div>
    </div>
    <div class="bw210-foot"><div><strong data-bw210="footTitle">Not a prediction. A transparent rule.</strong><p data-bw210="footDesc">BUY only if at least 15% below usual, within your limit, and needed this week. Otherwise WAIT. A demo, not financial advice.</p></div><a id="bw210-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/id6804757287" data-bw210="store">Explore Buy or Wait ↗</a></div>
   </div>`;
  main.insertBefore(root, main.firstChild);
  const $ = id => root.querySelector('#bw210-'+id);
  const copy = {
    en:{eyebrow:'THE PURCHASE DECISION, MADE VISIBLE',demo:'INTERACTIVE SAMPLE · NOT SAVED',h1:'A lower price',h2:"isn't a reason yet.",lead:'Three signals. One clearer decision. Change the numbers to see why.',language:'LANGUAGE',region:'APP STORE REGION',scenario:'YOUR SCENARIO',live:'LIVE EXAMPLE',setTitle:'Try the decision.',setDesc:'Use fictional amounts. They never leave this page.',current:'Current price',usual:'Usual price',limit:'Your spending limit',when:'WHEN DO YOU NEED IT?',soon:'THIS WEEK',later:'NO RUSH',reset:'↺ Reset example',decision:'THE DECISION',rule:'3 SIGNALS',suggestion:'SAMPLE RECOMMENDATION',discount:'DISCOUNT VS. USUAL',headroom:'ROOM IN BUDGET',footTitle:'Not a prediction. A transparent rule.',footDesc:'BUY only if at least 15% below usual, within your limit, and needed this week. Otherwise WAIT. A demo, not financial advice.',store:'Explore Buy or Wait ↗',buy:'BUY NOW',wait:'WAIT',invalid:'CHECK INPUT',reasonBuy:'All three signals agree: the timing and price make sense.',reasonWait:'At least one signal says holding off may be smarter.',reasonInvalid:'Enter positive amounts to see a sample decision.',saved:n=>`Difference: ${n} below usual`,under:'Within your limit',over:'Above your limit',valid:'Amounts look good',bad:'Please enter positive amounts',threshold:'At least 15% below usual',underThreshold:'Below the 15% threshold',needSoon:'Needed this week',needLater:'Not needed this week',signalDiscount:'MEANINGFUL DISCOUNT',signalLimit:'WITHIN YOUR LIMIT',signalTime:'NEEDED SOON'},
    ja:{eyebrow:'買い時の判断を、見える形に。',demo:'操作できるサンプル · 保存なし',h1:'値下がりだけでは、',h2:'買う理由にならない。',lead:'価格・予算・必要な時期。3つの条件を変えて、判断の理由を確かめる。',language:'言語',region:'APP STORE地域',scenario:'購入条件',live:'サンプル計算',setTitle:'条件を変えてみる。',setDesc:'架空の金額です。ページから送信・保存されません。',current:'現在の価格',usual:'普段の価格',limit:'購入予算',when:'いつ必要？',soon:'今週必要',later:'急がない',reset:'↺ 初期値に戻す',decision:'判断結果',rule:'3つの条件',suggestion:'サンプルの判断',discount:'普段の価格との差',headroom:'予算の余裕',footTitle:'予測ではなく、判断ルール。',footDesc:'普段より15%以上安く、予算内で、今週必要なら「買う」。それ以外は「待つ」。これは判断例であり、投資・金融助言ではありません。',store:'Buy or WaitをApp Storeで見る ↗',buy:'今、買う',wait:'いったん待つ',invalid:'入力を確認',reasonBuy:'値引き・予算・必要な時期が、すべて条件を満たしています。',reasonWait:'少なくとも1つの条件がそろっていません。',reasonInvalid:'すべてに0より大きい金額を入力してください。',saved:n=>`通常価格との差：${n}`,under:'予算の範囲内',over:'予算を超過',valid:'金額は有効',bad:'正の金額を入力',threshold:'通常より15%以上安い',underThreshold:'15%の基準に未達',needSoon:'今週必要',needLater:'今週は不要',signalDiscount:'15%以上の値引き',signalLimit:'予算内',signalTime:'今週必要'},
    ar:{eyebrow:'اجعل قرار الشراء واضحًا',demo:'مثال تفاعلي · دون حفظ',h1:'السعر الأقل',h2:'ليس سببًا كافيًا.',lead:'ثلاث إشارات لقرار أوضح. غيّر الأرقام لتعرف السبب.',language:'اللغة',region:'منطقة المتجر',scenario:'حالتك',live:'مثال مباشر',setTitle:'جرّب القرار.',setDesc:'أرقام افتراضية لا تُرسل ولا تُحفظ.',current:'السعر الحالي',usual:'السعر المعتاد',limit:'حدّ الإنفاق',when:'متى تحتاجه؟',soon:'هذا الأسبوع',later:'لا عجلة',reset:'↺ إعادة المثال',decision:'القرار',rule:'3 إشارات',suggestion:'اقتراح توضيحي',discount:'الخصم من السعر المعتاد',headroom:'المتبقي من الميزانية',footTitle:'قاعدة واضحة، وليست توقعًا.',footDesc:'اشترِ فقط إذا كان الخصم 15% أو أكثر، والسعر ضمن ميزانيتك، وتحتاجه هذا الأسبوع. وإلا انتظر. مثال توضيحي وليس نصيحة مالية.',store:'عرض Buy or Wait في App Store ↗',buy:'اشترِ الآن',wait:'انتظر',invalid:'تحقق من المدخلات',reasonBuy:'الخصم والميزانية والحاجة القريبة متوافقة.',reasonWait:'هناك شرط واحد على الأقل لا يتحقق.',reasonInvalid:'أدخل أرقامًا موجبة لكل الأسعار.',saved:n=>`الفرق عن المعتاد: ${n}`,under:'ضمن الميزانية',over:'فوق الميزانية',valid:'الأرقام صالحة',bad:'أدخل أرقامًا موجبة',threshold:'خصم 15% على الأقل',underThreshold:'أقل من خصم 15%',needSoon:'مطلوب هذا الأسبوع',needLater:'ليس مطلوبًا هذا الأسبوع',signalDiscount:'خصم مجدٍ',signalLimit:'ضمن الميزانية',signalTime:'مطلوب قريبًا'}
  };
  const state={lang:'en',region:'us',soon:true,price:79,usual:100,limit:85};
  const localLang=$('language'),localRegion=$('country'),globalLang=document.getElementById('p199-language'),globalRegion=document.getElementById('p199-country');
  const mapLang=v=>!v?null:String(v).toLowerCase().startsWith('ja')?'ja':String(v).toLowerCase().startsWith('ar')?'ar':'en';
  const mapRegion=v=>!v?null:String(v).toLowerCase()==='jp'?'jp':'us';
  function optionFor(select,wanted,mapper){if(!select)return null;const item=Array.from(select.options).find(o=>mapper(o.value)===wanted);return item?item.value:null;}
  function sync(select,wanted,mapper){const value=optionFor(select,wanted,mapper);if(value!==null && select.value!==value){select.value=value;select.dispatchEvent(new Event('change',{bubbles:true}));}}
  if(globalLang && globalLang.value)state.lang=mapLang(globalLang.value);
  if(globalRegion && globalRegion.value)state.region=mapRegion(globalRegion.value);
  const currencyFactor=()=>state.region==='jp'?100:1;
  function showValues(){const fac=currencyFactor();['price','usual','limit'].forEach(k=>{const val=state[k]*fac;$(k).value=Number.isFinite(val)?String(Math.round(val*100)/100):'';});}
  const locale=()=>state.lang==='ja'?'ja-JP':state.lang==='ar'?'ar':'en-US';
  function money(n){const v=n*currencyFactor();return new Intl.NumberFormat(locale(),{style:'currency',currency:state.region==='jp'?'JPY':'USD',maximumFractionDigits:state.region==='jp'?0:2}).format(v);}
  function plainPct(n){return new Intl.NumberFormat(locale(),{maximumFractionDigits:1}).format(n)+'%';}
  function render(){
    const t=copy[state.lang];root.lang=state.lang;root.dir=state.lang==='ar'?'rtl':'ltr';localLang.value=state.lang;localRegion.value=state.region;
    root.querySelectorAll('[data-bw210]').forEach(el=>{const s=t[el.dataset.bw210];if(typeof s==='string')el.textContent=s;});
    root.querySelectorAll('[data-bw210-currency]').forEach(el=>el.textContent=state.region==='jp'?'¥':'$');
    root.querySelectorAll('#bw210-need button').forEach(el=>el.setAttribute('aria-pressed',String((el.dataset.need==='soon')===state.soon)));
    const good=Number.isFinite(state.price)&&Number.isFinite(state.usual)&&Number.isFinite(state.limit)&&state.price>0&&state.usual>0&&state.limit>0;
    const off=good?(state.usual-state.price)/state.usual*100:0;
    const criteria=good?[off>=15-1e-9,state.price<=state.limit,state.soon]:[false,false,state.soon];
    const buy=good&&criteria.every(Boolean);
    $('result').dataset.state=!good?'invalid':buy?'buy':'wait';
    $('answer').firstChild.textContent=!good?t.invalid:buy?t.buy:t.wait;
    $('reason').textContent=!good?t.reasonInvalid:buy?t.reasonBuy:t.reasonWait;
    $('discount').textContent=good?plainPct(off):'—';
    $('discount-note').textContent=good?t.saved(money(state.usual-state.price)):t.bad;
    $('headroom').textContent=good?money(state.limit-state.price):'—';
    $('headroom-note').textContent=good?(state.price<=state.limit?t.under:t.over):t.bad;
    const checks=$('checks');checks.replaceChildren();
    [t.signalDiscount,t.signalLimit,t.signalTime].forEach((label,i)=>{
      const el=document.createElement('div');el.className='bw210-check';el.setAttribute('role','listitem');el.dataset.pass=String(criteria[i]);
      const symbol=document.createElement('span');symbol.className='bw210-checksymbol';symbol.textContent=criteria[i]?'✓':'−';
      const title=document.createElement('span');title.textContent=label;
      const status=document.createElement('b');status.textContent=i===0?(criteria[0]?t.threshold:t.underThreshold):i===1?(criteria[1]?t.under:t.over):(criteria[2]?t.needSoon:t.needLater);
      el.append(symbol,title,status);checks.append(el);
    });
    $('store').href=`https://apps.apple.com/${state.region}/app/id6804757287`;
    ['price','usual','limit'].forEach(k=>$(k).setAttribute('aria-label',t[k==='price'?'current':k]));
  }
  function reset(){state.price=79;state.usual=100;state.limit=85;state.soon=true;showValues();render();}
  for(const k of ['price','usual','limit'])$(k).addEventListener('input',()=>{const str=$(k).value.trim();state[k]=str===''?NaN:Number(str)/currencyFactor();render();});
  $('need').addEventListener('click',event=>{const button=event.target.closest('button[data-need]');if(!button)return;state.soon=button.dataset.need==='soon';render();});
  $('reset').addEventListener('click',reset);
  localLang.addEventListener('change',()=>{state.lang=mapLang(localLang.value);sync(globalLang,state.lang,mapLang);render();});
  localRegion.addEventListener('change',()=>{state.region=mapRegion(localRegion.value);sync(globalRegion,state.region,mapRegion);showValues();render();});
  if(globalLang)globalLang.addEventListener('change',()=>{if(globalLang.value){state.lang=mapLang(globalLang.value);render();}});
  if(globalRegion)globalRegion.addEventListener('change',()=>{if(globalRegion.value){state.region=mapRegion(globalRegion.value);showValues();render();}});
  showValues();render();
})();
