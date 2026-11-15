/* TSZ LP R211 — Pack Quantity Calculator. Isolated, non-persistent fictional demo. */
(() => {
  'use strict';
  if (!document.body || document.body.dataset.p199Id !== '6804756043') return;
  if (document.getElementById('tsz-packquantity-r211')) return;
  const main = document.querySelector('main');
  if (!main) return;
  const root = document.createElement('section');
  root.id = 'tsz-packquantity-r211';
  root.setAttribute('aria-labelledby','pq211-title');
  root.innerHTML = `
    <div class="pq211-shell">
      <div class="pq211-overline"><span class="pq211-spark">✳</span><span data-pq211="brand">THE EXTRA PACK QUESTION</span><span class="pq211-pill" data-pq211="demo">LIVE DEMO · NOTHING SAVED</span></div>
      <div class="pq211-header">
        <div class="pq211-intro"><p class="pq211-edition">FIELD NOTE <b>211 / PACK QUANTITY</b></p><h2 id="pq211-title"><span data-pq211="headlineA">One more pack.</span><em data-pq211="headlineB">How much more left over?</em></h2><p class="pq211-lede" data-pq211="lede">See the real difference between buying enough and adding one extra pack.</p></div>
        <div class="pq211-opts"><label><span data-pq211="langLabel">LANGUAGE</span><select id="pq211-language" aria-label="Demo language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-pq211="regionLabel">STORE REGION</span><select id="pq211-country" aria-label="App Store region"><option value="us">US</option><option value="jp">JP</option></select></label></div>
      </div>
      <div class="pq211-grid">
        <div class="pq211-editor"><div class="pq211-cardtop"><span>01 / <span data-pq211="yourNumbers">YOUR NUMBERS</span></span><span class="pq211-online" data-pq211="tryIt">● CHANGE ANY VALUE</span></div><h3 data-pq211="setTitle">A shopping trip, in numbers.</h3><p class="pq211-muted" data-pq211="desc">An illustrative example, not your saved shopping list.</p>
          <div class="pq211-presets" role="group" aria-label="Example presets"><button type="button" data-preset="groceries" aria-pressed="true" data-pq211="presetGroceries">GROCERIES</button><button type="button" data-preset="party" aria-pressed="false" data-pq211="presetParty">PARTY</button><button type="button" data-preset="snacks" aria-pressed="false" data-pq211="presetSnacks">SNACKS</button></div>
          <div class="pq211-fields">
            <label><span data-pq211="needed">AMOUNT NEEDED</span><span class="pq211-field"><input id="pq211-needed" aria-label="Amount needed in grams" type="number" inputmode="numeric" min="1" max="50000" step="1" value="2300"/><span>g</span></span></label>
            <label><span data-pq211="pack">GRAMS PER PACK</span><span class="pq211-field"><input id="pq211-pack" aria-label="Grams per pack" type="number" inputmode="numeric" min="1" max="10000" step="1" value="650"/><span>g</span></span></label>
            <label><span data-pq211="price">PRICE PER PACK</span><span class="pq211-field"><span id="pq211-symbol">$</span><input id="pq211-price" aria-label="Price per pack" type="number" inputmode="decimal" min="0.01" max="10000" step="any" value="3.50"/></span></label>
          </div>
          <button id="pq211-reset" type="button" class="pq211-reset" data-pq211="reset">↺ Reset this example</button>
          <div class="pq211-context"><span class="pq211-context-icon">↗</span><p data-pq211="context">Buying one extra pack always adds one full pack of surplus — and its entire price.</p></div>
        </div>
        <div class="pq211-results"><div class="pq211-cardtop"><span>02 / <span data-pq211="comparison">THE COMPARISON</span></span><span class="pq211-online" data-pq211="instant">INSTANT CALCULATION</span></div>
          <div id="pq211-error" class="pq211-error" role="status" aria-live="polite" hidden></div>
          <div id="pq211-resultarea">
            <div class="pq211-choice pq211-choice-good"><div class="pq211-choicehead"><span class="pq211-number">A / <span data-pq211="enough">JUST ENOUGH</span></span><span class="pq211-status" data-pq211="recommended">MINIMUM PURCHASE</span></div><div class="pq211-choicebody"><div><strong id="pq211-min-packs">4</strong><small data-pq211="packs">PACKS</small></div><div class="pq211-choice-meta"><p><span data-pq211="cost">COST</span><b id="pq211-min-cost">$14.00</b></p><p><span data-pq211="left">LEFT OVER</span><b id="pq211-min-left">300 g</b></p></div></div><div class="pq211-track"><span id="pq211-min-track"></span></div><p class="pq211-tracklegend" data-pq211="track">Filled portion shows the amount you actually need.</p></div>
            <div class="pq211-choice pq211-choice-extra"><div class="pq211-choicehead"><span class="pq211-number">B / <span data-pq211="extra">ONE EXTRA PACK</span></span><span class="pq211-status pq211-status-alt" data-pq211="extraLabel">+1 PACK</span></div><div class="pq211-choicebody"><div><strong id="pq211-extra-packs">5</strong><small data-pq211="packs">PACKS</small></div><div class="pq211-choice-meta"><p><span data-pq211="cost">COST</span><b id="pq211-extra-cost">$17.50</b></p><p><span data-pq211="left">LEFT OVER</span><b id="pq211-extra-left">950 g</b></p></div></div><div class="pq211-track"><span id="pq211-extra-track"></span></div></div>
            <div class="pq211-delta"><div><span data-pq211="moreSpend">EXTRA SPEND</span><b id="pq211-delta-cost">+$3.50</b></div><span class="pq211-delta-rule">+</span><div><span data-pq211="moreLeft">EXTRA LEFT OVER</span><b id="pq211-delta-left">+650 g</b></div></div>
          </div>
        </div>
      </div>
      <div class="pq211-foot"><div><b data-pq211="footTitle">The quantity matters after checkout, too.</b><p data-pq211="footNote">Only a sample. No account, no storage, no inventory updates or purchasing.</p></div><a id="pq211-store" href="https://apps.apple.com/us/app/id6804756043" rel="noopener noreferrer" target="_blank" data-pq211="store">Explore Pack Quantity ↗</a></div>
    </div>`;
  main.insertBefore(root,main.firstChild);
  const $ = name => root.querySelector('#pq211-'+name);
  const strings = {
    en:{brand:'THE EXTRA PACK QUESTION',demo:'LIVE DEMO · NOTHING SAVED',headlineA:'One more pack.',headlineB:'How much more left over?',lede:'See the difference between buying enough and adding one extra pack.',langLabel:'LANGUAGE',regionLabel:'STORE REGION',yourNumbers:'YOUR NUMBERS',tryIt:'● CHANGE ANY VALUE',setTitle:'A shopping trip, in numbers.',desc:'An illustrative example, not your saved shopping list.',presetGroceries:'GROCERIES',presetParty:'PARTY',presetSnacks:'SNACKS',needed:'AMOUNT NEEDED',pack:'GRAMS PER PACK',price:'PRICE PER PACK',reset:'↺ Reset this example',context:'Buying one extra pack adds one full pack of surplus — and its entire price.',comparison:'THE COMPARISON',instant:'INSTANT CALCULATION',enough:'JUST ENOUGH',recommended:'MINIMUM PURCHASE',packs:'PACKS',cost:'COST',left:'LEFT OVER',track:'The highlighted bar is the amount you actually need.',extra:'ONE EXTRA PACK',extraLabel:'+1 PACK',moreSpend:'EXTRA SPEND',moreLeft:'EXTRA LEFT OVER',footTitle:'The quantity matters after checkout, too.',footNote:'Only a sample. No account, no storage, no inventory updates or purchasing.',store:'Explore Pack Quantity ↗',invalid:'Enter positive whole numbers for grams (up to 50,000 needed / 10,000 per pack), and a valid pack price.'},
    ja:{brand:'「あと1パック」の差を見える化',demo:'操作できるサンプル · 保存なし',headlineA:'あと1パック。',headlineB:'どれだけ余る？',lede:'必要な分だけ買う場合と、念のため1パック追加する場合を比べてみよう。',langLabel:'言語',regionLabel:'APP STORE地域',yourNumbers:'買い物の条件',tryIt:'● 数値を変更できます',setTitle:'必要量から考えてみる。',desc:'架空の買い物例です。入力内容は保存されません。',presetGroceries:'食材',presetParty:'パーティー',presetSnacks:'おやつ',needed:'必要な量',pack:'1パックの内容量',price:'1パックの価格',reset:'↺ 初期値に戻す',context:'1パック多く買うと、余る量も1パック分増え、支払いもその分増えます。',comparison:'2つの買い方',instant:'リアルタイム計算',enough:'必要な分だけ',recommended:'必要最小限',packs:'パック',cost:'購入金額',left:'余る量',track:'バーの色がついた部分は、実際に必要な量です。',extra:'もう1パック',extraLabel:'＋1パック',moreSpend:'追加の支出',moreLeft:'追加の余り',footTitle:'買ったあとまで、見えるように。',footNote:'操作サンプルです。アカウント・保存・在庫更新・購入処理はありません。',store:'Pack QuantityをApp Storeで見る ↗',invalid:'必要量と内容量は正の整数（最大50,000g・10,000g）、価格は0より大きい有効な数値を入力してください。'},
    ar:{brand:'سؤال العبوة الإضافية',demo:'تجربة تفاعلية · بلا حفظ',headlineA:'عبوة إضافية.',headlineB:'كم سيتبقى؟',lede:'قارن بين شراء الكمية الكافية وإضافة عبوة أخرى.',langLabel:'اللغة',regionLabel:'منطقة المتجر',yourNumbers:'قيم التجربة',tryIt:'● غيّر أي قيمة',setTitle:'تسوّق بالأرقام.',desc:'مثال افتراضي لا يُحفظ.',presetGroceries:'مشتريات',presetParty:'حفلة',presetSnacks:'وجبات خفيفة',needed:'الكمية المطلوبة',pack:'غرام في العبوة',price:'سعر العبوة',reset:'↺ إعادة المثال',context:'عبوة إضافية تعني فائضًا بحجم عبوة كاملة وتكلفتها.',comparison:'المقارنة',instant:'حساب فوري',enough:'الكمية الكافية',recommended:'الحد الأدنى',packs:'عبوات',cost:'التكلفة',left:'المتبقي',track:'الجزء الملون يوضح الكمية المطلوبة.',extra:'عبوة إضافية',extraLabel:'+1 عبوة',moreSpend:'تكلفة إضافية',moreLeft:'فائض إضافي',footTitle:'الكمية مهمة حتى بعد الدفع.',footNote:'مثال فقط، دون حساب أو تخزين أو تحديث مخزون أو شراء.',store:'عرض Pack Quantity في App Store ↗',invalid:'أدخل أعدادًا صحيحة موجبة للغرامات (حتى 50000 و10000)، وسعرًا صالحًا للعبوة.'}
  };
  const examples={groceries:{needed:2300,pack:650,price:3.5},party:{needed:3000,pack:500,price:2.4},snacks:{needed:1200,pack:350,price:1.8}};
  const state={...examples.groceries,lang:'en',region:'us',preset:'groceries'};
  const localLang=$('language'),localRegion=$('country'),globalLang=document.getElementById('p199-language'),globalRegion=document.getElementById('p199-country');
  const langMap=v=>!v?null:String(v).toLowerCase().startsWith('ja')?'ja':String(v).toLowerCase().startsWith('ar')?'ar':String(v).toLowerCase().startsWith('en')?'en':null;
  const regionMap=v=>!v?null:String(v).toLowerCase()==='jp'?'jp':String(v).toLowerCase()==='us'?'us':null;
  const optionFor=(select,wanted,mapper)=>select?Array.from(select.options).find(x=>mapper(x.value)===wanted)?.value:null;
  function sync(select,wanted,mapper){const match=optionFor(select,wanted,mapper);if(match!=null&&select.value!==match){select.value=match;select.dispatchEvent(new Event('change',{bubbles:true}));}}
  if(globalLang && langMap(globalLang.value))state.lang=langMap(globalLang.value);
  if(globalRegion && regionMap(globalRegion.value))state.region=regionMap(globalRegion.value);
  const factor=()=>state.region==='jp'?100:1;
  const text=(key,v)=>{root.querySelectorAll('[data-pq211="'+key+'"]').forEach(e=>e.textContent=v)};
  function money(v){return new Intl.NumberFormat(state.lang==='ja'?'ja-JP':state.lang==='ar'?'ar-EG':'en-US',{style:'currency',currency:state.region==='jp'?'JPY':'USD',maximumFractionDigits:state.region==='jp'?0:2,minimumFractionDigits:state.region==='jp'?0:2}).format(v*factor());}
  function count(n){return new Intl.NumberFormat(state.lang==='ar'?'ar-EG':state.lang==='ja'?'ja-JP':'en-US',{maximumFractionDigits:0}).format(n);}
  function read(){['needed','pack','price'].forEach(k=>{const raw=$(k).value.trim(),val=Number(raw);state[k]=raw===''?NaN:(k==='price'?val/factor():val);});state.preset=null;}
  function put(){['needed','pack','price'].forEach(k=>{$(k).value=k==='price'?String(Number((state[k]*factor()).toFixed(state.region==='jp'?0:2))):String(state[k]);});$('symbol').textContent=state.region==='jp'?'¥':'$';}
  function valid(){return Number.isSafeInteger(state.needed)&&state.needed>=1&&state.needed<=50000&&Number.isSafeInteger(state.pack)&&state.pack>=1&&state.pack<=10000&&Number.isFinite(state.price)&&state.price>0&&state.price<=10000&&Math.ceil(state.needed/state.pack)<=500;}
  function render(){
    const t=strings[state.lang];root.lang=state.lang;root.dir=state.lang==='ar'?'rtl':'ltr';localLang.value=state.lang;localRegion.value=state.region;$('store').href='https://apps.apple.com/'+state.region+'/app/id6804756043';
    Object.keys(t).forEach(k=>{if(k!=='invalid')text(k,t[k]);});
    root.querySelectorAll('[data-preset]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.preset===state.preset)));
    const ok=valid();$('error').hidden=ok;$('resultarea').hidden=!ok;if(!ok){$('error').textContent=t.invalid;return;}
    const min=Math.ceil(state.needed/state.pack),extra=min+1,left=min*state.pack-state.needed,extraLeft=left+state.pack;
    $('min-packs').textContent=count(min);$('extra-packs').textContent=count(extra);
    $('min-cost').textContent=money(min*state.price);$('extra-cost').textContent=money(extra*state.price);
    $('min-left').textContent=count(left)+' g';$('extra-left').textContent=count(extraLeft)+' g';
    $('delta-cost').textContent='+'+money(state.price);$('delta-left').textContent='+'+count(state.pack)+' g';
    $('min-track').style.width=Math.max(0,Math.min(100,100*state.needed/(min*state.pack)))+'%';
    $('extra-track').style.width=Math.max(0,Math.min(100,100*state.needed/(extra*state.pack)))+'%';
  }
  ['needed','pack','price'].forEach(k=>$(k).addEventListener('input',()=>{read();render();}));
  root.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{Object.assign(state,examples[b.dataset.preset]);state.preset=b.dataset.preset;put();render();}));
  $('reset').addEventListener('click',()=>{Object.assign(state,examples.groceries);state.preset='groceries';put();render();});
  localLang.addEventListener('change',()=>{state.lang=langMap(localLang.value)||'en';sync(globalLang,state.lang,langMap);render();});
  localRegion.addEventListener('change',()=>{state.region=regionMap(localRegion.value)||'us';sync(globalRegion,state.region,regionMap);put();render();});
  if(globalLang)globalLang.addEventListener('change',()=>{const v=langMap(globalLang.value);if(v){state.lang=v;render();}});
  if(globalRegion)globalRegion.addEventListener('change',()=>{const v=regionMap(globalRegion.value);if(v){state.region=v;put();render();}});
  put();render();
})();
