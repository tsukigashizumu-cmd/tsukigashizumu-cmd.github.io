/* R230 Buy or Wait: conditional price-savings-per-day demonstration; no forecasts or persistence. */
(() => {
  'use strict';
  const APP = '6804757287';
  if (!document.body) return;
  const identities=[document.body.dataset.p199Id,document.body.dataset.p19AppId].filter(Boolean);
  if (!identities.length || identities.some(id=>id!==APP)) return;
  if (document.getElementById('tsz-buywait-r230')) return;
  const main=document.querySelector('main');if(!main)return;
  const root=document.createElement('section');root.id='tsz-buywait-r230';root.setAttribute('aria-labelledby','bw230-title');
  root.innerHTML=`
    <div class="bw230-cap"><span>THE PRICE OF PATIENCE <span aria-hidden="true">✳</span>  /  FIELD NOTE 230</span><mark data-bw230="badge">INTERACTIVE EXAMPLE · NOT SAVED</mark></div>
    <div class="bw230-head">
      <div class="bw230-copy"><h2 id="bw230-title"><span data-bw230="h1">The savings are clear.</span><br><em data-bw230="h2">The wait is yours.</em></h2><p class="bw230-lead" data-bw230="lead">$25 saved over 14 days is $1.79 per day. Would that wait be worthwhile to you?</p></div>
      <div class="bw230-selects"><label><span data-bw230="language">LANGUAGE</span><select id="bw230-language" aria-label="Demo language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-bw230="region">APP STORE REGION</span><select id="bw230-country" aria-label="App Store region"><option value="us">US</option><option value="jp">JP</option></select></label></div>
    </div>
    <div class="bw230-content"><div class="bw230-panel bw230-control">
      <div class="bw230-panel-head"><span class="bw230-number">01 / <span data-bw230="inputs">YOUR NUMBERS</span></span><span class="bw230-live" data-bw230="fiction">FICTIONAL SCENARIO</span></div>
      <h3 data-bw230="settings">What would you wait for?</h3><p class="bw230-intro" data-bw230="settingsNote">Change the prices and the days. Nothing is stored.</p>
      <div class="bw230-prices"><label class="bw230-field"><span data-bw230="today">Price today</span><span class="bw230-currency"><span>$</span><input id="bw230-today" aria-label="Price today" type="number" inputmode="decimal" min="0.01" max="1000000" step="0.01" value="120"></span></label><label class="bw230-field"><span data-bw230="target">Your target price</span><span class="bw230-currency"><span>$</span><input id="bw230-target" aria-label="Your target price" type="number" inputmode="decimal" min="0.01" max="1000000" step="0.01" value="95"></span></label></div>
      <div class="bw230-days-head"><label for="bw230-days" data-bw230="days">Days you could wait</label><div class="bw230-days"><strong id="bw230-days-value">14</strong><span data-bw230="dayUnit">days</span></div></div>
      <input id="bw230-days" type="range" min="1" max="60" step="1" value="14" aria-label="Days you could wait"><div class="bw230-ticks"><span data-bw230="oneDay">1 DAY</span><span data-bw230="sixtyDays">60 DAYS</span></div>
      <div class="bw230-presets" role="group" aria-label="Example scenarios"><button type="button" data-bw230-preset="standard" aria-pressed="true" data-bw230="standard">14-DAY WAIT</button><button type="button" data-bw230-preset="short" aria-pressed="false" data-bw230="short">2-DAY WAIT</button><button type="button" data-bw230-preset="long" aria-pressed="false" data-bw230="long">30-DAY WAIT</button></div>
      <button type="button" class="bw230-reset" id="bw230-reset" data-bw230="reset">↺ Restore example</button>
    </div><div class="bw230-panel bw230-result">
      <div><div class="bw230-panel-head"><span class="bw230-number">02 / <span data-bw230="tradeoff">THE TRADE-OFF</span></span><span class="bw230-live" data-bw230="live">LIVE MATH</span></div><p class="bw230-overline" data-bw230="eachDay">POTENTIAL SAVINGS PER DAY OF WAITING</p><div class="bw230-hero-number" id="bw230-per-day" aria-live="polite">$1.79</div><div class="bw230-per" data-bw230="perDay">per day of waiting</div>
      <div class="bw230-bars"><div><div class="bw230-bar-head"><span data-bw230="todayLabel">Today's price</span><strong id="bw230-price-now">$120.00</strong></div><div class="bw230-rail"><span class="bw230-fill" id="bw230-now-bar" style="width:100%"></span></div></div><div><div class="bw230-bar-head"><span data-bw230="targetLabel">Your hoped-for price</span><strong id="bw230-price-target">$95.00</strong></div><div class="bw230-rail"><span class="bw230-fill saving" id="bw230-target-bar" style="width:79.167%"></span></div></div></div>
      <div class="bw230-callout" id="bw230-callout" role="status" aria-live="polite">If your target price happens, you could save <strong id="bw230-saving">$25.00</strong> over 14 days.</div><p class="bw230-summary" data-bw230="disclaimer">This is conditional math, not a forecast. The target price may never happen.</p></div>
    </div></div><div class="bw230-fine"><span data-bw230="fine">Illustrative USD only. No future prices, purchase advice, account or saved data.</span><a id="bw230-store" class="bw230-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/buy-or-wait-calculator/id6804757287" data-bw230="store">See Buy or Wait on the App Store</a></div>
  `;
  main.insertBefore(root,main.firstChild);
  const $=id=>root.querySelector('#'+id);
  const i18n={
    en:{badge:'INTERACTIVE EXAMPLE · NOT SAVED',h1:'The savings are clear.',h2:'The wait is yours.',lead:'$25 saved over 14 days is $1.79 per day. Would that wait be worthwhile to you?',language:'LANGUAGE',region:'APP STORE REGION',inputs:'YOUR NUMBERS',fiction:'FICTIONAL SCENARIO',settings:'What would you wait for?',settingsNote:'Change the prices and the days. Nothing is stored.',today:'Price today',target:'Your target price',days:'Days you could wait',dayUnit:'days',oneDay:'1 DAY',sixtyDays:'60 DAYS',standard:'14-DAY WAIT',short:'2-DAY WAIT',long:'30-DAY WAIT',reset:'↺ Restore example',tradeoff:'THE TRADE-OFF',live:'LIVE MATH',eachDay:'POTENTIAL SAVINGS PER DAY OF WAITING',perDay:'per day of waiting',todayLabel:"Today's price",targetLabel:'Your hoped-for price',disclaimer:'This is conditional math, not a forecast. The target price may never happen.',fine:'Illustrative USD only. No future prices, purchase advice, account or saved data.',store:'See Buy or Wait on the App Store',conditional:(amount,days)=>`If your target price happens, you could save ${amount} over ${days} days.`,higher:'Your target is not below today’s price; there is no hypothetical saving.',invalid:'Enter valid positive amounts (up to $1,000,000).',waiting:'No saving per day is implied.'},
    ja:{badge:'操作サンプル・保存しません',h1:'節約額は見える。',h2:'待つ価値は、自分で決める。',lead:'14日待って$25の節約なら、1日あたり$1.79。あなたなら待ちますか？',language:'言語',region:'App Store地域',inputs:'金額を入力',fiction:'架空の例',settings:'いくらなら待てる？',settingsNote:'価格と日数を変えて比較できます。入力は保存しません。',today:'今日の価格',target:'希望する価格',days:'待てる日数',dayUnit:'日',oneDay:'1日',sixtyDays:'60日',standard:'14日待つ',short:'2日待つ',long:'30日待つ',reset:'↺ 初期値に戻す',tradeoff:'金額と時間の比較',live:'即時計算',eachDay:'待つ1日あたりの仮の節約額',perDay:'待つ1日あたり',todayLabel:'今日の価格',targetLabel:'希望する価格',disclaimer:'将来の価格予測ではありません。希望価格になる保証はありません。',fine:'架空のUSD例です。購入の推奨・予測・保存は行いません。',store:'App StoreでBuy or Waitを見る',conditional:(amount,days)=>`希望価格になった場合、${days}日待って${amount}節約する計算です。`,higher:'希望価格が今日の価格以上のため、仮の節約額はありません。',invalid:'0より大きい有効な金額（上限$1,000,000）を入力してください。',waiting:'1日あたりの節約額は計算できません。'},
    ar:{badge:'مثال تفاعلي · دون حفظ',h1:'التوفير واضح.',h2:'وقيمة الانتظار قرارك.',lead:'توفير 25 دولارًا خلال 14 يومًا يعادل 1.79 دولار يوميًا. هل يستحق الانتظار؟',language:'اللغة',region:'منطقة App Store',inputs:'أرقامك',fiction:'مثال افتراضي',settings:'كم يستحق الانتظار؟',settingsNote:'غيّر الأسعار والأيام. لا تُحفظ المدخلات.',today:'السعر اليوم',target:'السعر الذي تأمله',days:'الأيام التي يمكنك انتظارها',dayUnit:'يومًا',oneDay:'يوم واحد',sixtyDays:'60 يومًا',standard:'انتظار 14 يومًا',short:'انتظار يومين',long:'انتظار 30 يومًا',reset:'↺ استعادة المثال',tradeoff:'المقارنة',live:'حساب فوري',eachDay:'التوفير المحتمل لكل يوم انتظار',perDay:'لكل يوم انتظار',todayLabel:'السعر اليوم',targetLabel:'السعر الذي تأمله',disclaimer:'هذا حساب مشروط وليس توقعًا. قد لا يصل السعر إلى هدفك.',fine:'أرقام افتراضية بالدولار الأمريكي. لا تنبؤ أو توصية شراء أو حفظ بيانات.',store:'شاهد Buy or Wait في App Store',conditional:(amount,days)=>`إذا تحقق السعر المستهدف، فقد توفر ${amount} خلال ${days} يومًا.`,higher:'السعر المستهدف ليس أقل من سعر اليوم، فلا يوجد توفير افتراضي.',invalid:'أدخل مبالغ موجبة وصحيحة لا تتجاوز 1,000,000 دولار.',waiting:'لا يمكن حساب توفير لكل يوم.'}
  };
  const state={lang:'en',country:'us'};
  const hostLang=document.getElementById('p199-language')||document.getElementById('p19-language');
  const hostRegion=document.getElementById('p199-country')||document.getElementById('p19-country');
  const supported={en:true,ja:true,ar:true};
  const locale=v=>supported[v]?v:'en';
  const country=v=>String(v||'us').toLowerCase()==='jp'?'jp':'us';
  const pullHost=(node,fallback)=>node&&node.value?node.value:fallback;
  function sync(host,value){if(!host)return;let has=Array.from(host.options||[]).some(o=>o.value===value);if(has&&host.value!==value){host.value=value;host.dispatchEvent(new Event('change',{bubbles:true}));}}
  function tr(){return i18n[state.lang];}
  function usd(value){return '$'+value.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}
  const presetValues={standard:[120,95,14],short:[120,95,2],long:[120,95,30]};
  function render(){
    const t=tr();root.lang=state.lang;root.dir=state.lang==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-bw230]').forEach(n=>{const k=n.dataset.bw230;if(k in t&&typeof t[k]==='string')n.textContent=t[k];});
    $('bw230-language').value=state.lang;$('bw230-country').value=state.country;
    $('bw230-today').setAttribute('aria-label',t.today);$('bw230-target').setAttribute('aria-label',t.target);$('bw230-days').setAttribute('aria-label',t.days);
    const today=Number($('bw230-today').value),target=Number($('bw230-target').value),days=Number($('bw230-days').value);
    const valid=$('bw230-today').value.trim()!==''&&$('bw230-target').value.trim()!==''&&Number.isFinite(today)&&Number.isFinite(target)&&today>0&&target>0&&today<=1000000&&target<=1000000;
    const diff=valid?Math.max(0,Math.round((today-target)*100))/100:0;
    $('bw230-days-value').textContent=String(days);
    $('bw230-price-now').textContent=valid?usd(today):'—';$('bw230-price-target').textContent=valid?usd(target):'—';
    $('bw230-per-day').textContent=valid?usd(Math.round(diff*100/days)/100):'—';
    $('bw230-target-bar').style.width=valid?(Math.max(0,Math.min(100,target/today*100)).toFixed(3)+'%'):'0%';
    $('bw230-now-bar').style.width='100%';
    const callout=$('bw230-callout');callout.setAttribute('aria-invalid',(!valid).toString());
    callout.textContent=!valid?t.invalid:diff<=0?t.higher:t.conditional(usd(diff),days);
    $('bw230-store').href=`https://apps.apple.com/${state.country}/app/buy-or-wait-calculator/id${APP}`;
    root.querySelectorAll('[data-bw230-preset]').forEach(btn=>{const v=presetValues[btn.dataset.bw230Preset];btn.setAttribute('aria-pressed',String(v[0]===today&&v[1]===target&&v[2]===days));});
    $('bw230-today').setAttribute('aria-invalid',String(!valid));$('bw230-target').setAttribute('aria-invalid',String(!valid));
  }
  function setLang(v,updateHost=true){state.lang=locale(v);render();if(updateHost)sync(hostLang,state.lang);}
  function setCountry(v,updateHost=true){state.country=country(v);render();if(updateHost)sync(hostRegion,state.country);}
  $('bw230-language').addEventListener('change',e=>setLang(e.target.value));
  $('bw230-country').addEventListener('change',e=>setCountry(e.target.value));
  if(hostLang)hostLang.addEventListener('change',()=>setLang(hostLang.value,false));
  if(hostRegion)hostRegion.addEventListener('change',()=>setCountry(hostRegion.value,false));
  ['bw230-today','bw230-target','bw230-days'].forEach(id=>$(id).addEventListener('input',render));
  root.querySelectorAll('[data-bw230-preset]').forEach(btn=>btn.addEventListener('click',()=>{const [p,t,d]=presetValues[btn.dataset.bw230Preset];$('bw230-today').value=p;$('bw230-target').value=t;$('bw230-days').value=d;render();}));
  $('bw230-reset').addEventListener('click',()=>{const [p,t,d]=presetValues.standard;$('bw230-today').value=p;$('bw230-target').value=t;$('bw230-days').value=d;render();});
  state.lang=locale(pullHost(hostLang,'en'));state.country=country(pullHost(hostRegion,'us'));render();
})();
