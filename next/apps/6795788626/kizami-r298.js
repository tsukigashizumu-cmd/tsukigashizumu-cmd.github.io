/* R298 / Kizami LP demo. Session-only, no network, persistence or tracking. */
(()=>{
 'use strict';
 const ID='kzr298';
 const appId='6795788626';
 const words={
  en:{brand:'KIZAMI / A SMALL MOMENT',eyebrow:'YOUR CHOSEN TIME',headline:'Not every minute needs to be productive.',lede:'Work, errands, sleep. Somewhere inside the day, there were minutes that belonged to you. Keep one of them here. No goals. No streaks.',choose:'01 / What did you choose?',read:'Reading',walk:'Walking',rest:'Simply resting',make:'Making something',minutes:'02 / How long was yours?',custom:'Other minutes',add:'Keep these minutes',record:'WHAT YOU KEPT',total:'Minutes chosen',moments:'Moments kept',shaft:'A small visual metaphor for the path your time makes',items:'Your moments',undo:'Undo last',reset:'Start again',note:'This is an interactive LP example. The shaft is illustrative, not the app’s depth-conversion algorithm. Nothing is saved when you leave this page.',store:'See Kizami in the App Store',invalid:'Enter a whole number from 1 to 480.',empty:'There are no moments yet.',unit:'min',added:'One more moment was yours.'},
  ja:{brand:'KIZAMI / 自分で選んだ時間',eyebrow:'今日、自分で選んだ時間',headline:'役に立たなかった15分も、自分の時間だった。',lede:'仕事、家のこと、睡眠。その間に、誰にも決められなかった時間があった。立派な目標も連続記録もいらない。ここに、ひとつ刻んでみよう。',choose:'01 / 何を選んだ？',read:'本を読んだ',walk:'少し歩いた',rest:'何もせず休んだ',make:'好きなものを作った',minutes:'02 / 何分だった？',custom:'自由入力（分）',add:'この時間を刻む',record:'自分で選んだ時間',total:'選んだ合計',moments:'残した記録',shaft:'選んだ時間が積み重なる、坑道のイメージ',items:'刻んだ時間',undo:'直前を戻す',reset:'最初に戻す',note:'LP専用の操作例です。坑道はイメージであり、アプリ本体の深さ換算方式を再現していません。ページを閉じると記録は消えます。',store:'App StoreでKizamiを見る',invalid:'1〜480の整数を入力してください。',empty:'記録はまだありません。',unit:'分',added:'自分の時間が、ひとつ残った。'},
  ar:{brand:'KIZAMI / وقت اخترته',eyebrow:'وقتك الذي اخترته',headline:'ليست كل دقيقة بحاجة إلى إنجاز.',lede:'العمل، شؤون المنزل، ثم النوم. وبين ذلك لحظات اخترتها لنفسك. احتفظ بإحداها هنا، بلا أهداف ولا سلاسل يومية.',choose:'01 / ماذا اخترت؟',read:'القراءة',walk:'المشي',rest:'الراحة',make:'صنع شيء تحبه',minutes:'02 / كم دقيقة؟',custom:'دقائق أخرى',add:'احتفظ بهذه الدقائق',record:'الوقت الذي اخترته',total:'مجموع الدقائق',moments:'لحظات محفوظة',shaft:'تصوّر بصري للوقت الذي يتراكم',items:'لحظاتك',undo:'تراجع عن الأخيرة',reset:'ابدأ من جديد',note:'هذه تجربة تفاعلية للصفحة فقط. الرسم توضيحي ولا يمثل معادلة العمق داخل التطبيق. لا تُحفَظ بياناتك بعد مغادرة الصفحة.',store:'عرض Kizami على App Store',invalid:'أدخل عددًا صحيحًا بين 1 و480.',empty:'لا توجد لحظات بعد.',unit:'دقيقة',added:'لحظة أخرى أصبحت لك.'}
 };
 const activities=[['read','📖'],['walk','🚶'],['rest','☁'],['make','✦']];
 const original=[{kind:'read',minutes:20},{kind:'walk',minutes:15}];
 const state={lang:((document.documentElement.lang||'').toLowerCase().startsWith('ja')?'ja':'en'),country:'us',kind:'rest',preset:15,items:original.map(x=>({...x}))};
 function el(tag,cls,text){const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;}
 function mount(){
  if(document.getElementById(ID))return;
  const root=el('section');root.id=ID;root.setAttribute('aria-label','Kizami interactive chosen time example');
  root.innerHTML=`<div class="kz-wrap">
    <div class="kz-top"><strong class="kz-brand" data-kz="brand"></strong><div class="kz-selects"><select id="kzr298-lang" aria-label="Language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select><select id="kzr298-country" aria-label="App Store country"><option value="us">US App Store</option><option value="jp">JP App Store</option></select></div></div>
    <p class="kz-eyebrow" data-kz="eyebrow"></p><h2 data-kz="headline"></h2><p class="kz-lede" data-kz="lede"></p>
    <div class="kz-grid"><div class="kz-panel"><p class="kz-panel-head" data-kz="choose"></p><div id="kzr298-activities" class="kz-activities" role="group" aria-label="Activity"></div><label class="kz-label" data-kz="minutes" for="kzr298-custom"></label><div id="kzr298-minutes" class="kz-mins" role="group" aria-label="Minutes"><button type="button" class="kz-pill" data-minutes="10">10</button><button type="button" class="kz-pill" data-minutes="15">15</button><button type="button" class="kz-pill" data-minutes="30">30</button><input id="kzr298-custom" type="number" inputmode="numeric" min="1" max="480" step="1" placeholder="…" aria-label="Custom minutes"></div><button id="kzr298-add" class="kz-action" type="button" data-kz="add"></button><p class="kz-msg" id="kzr298-msg" role="status"></p></div>
    <div class="kz-panel"><p class="kz-panel-head" data-kz="record"></p><div class="kz-summary"><div class="kz-stat"><small data-kz="total"></small><strong id="kzr298-total"></strong></div><div class="kz-stat"><small data-kz="moments"></small><strong id="kzr298-count"></strong></div></div><div class="kz-shaft"><div class="kz-depth" id="kzr298-depth" aria-hidden="true"></div><div class="kz-shaft-label" data-kz="shaft"></div></div><ul class="kz-entries" id="kzr298-entries" aria-label="Recorded moments"></ul><div class="kz-actions"><button id="kzr298-undo" type="button" class="kz-secondary" data-kz="undo"></button><button id="kzr298-reset" type="button" class="kz-secondary" data-kz="reset"></button></div></div></div>
    <div class="kz-foot"><p class="kz-note" data-kz="note"></p><a id="kzr298-store" class="kz-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/id6795788626" data-kz="store"></a></div>
    </div>`;
  const footer=document.querySelector('footer.p19-footer')||document.querySelector('footer');
  if(footer)footer.parentNode.insertBefore(root,footer);else document.body.appendChild(root);
  const lang=root.querySelector('#kzr298-lang'),country=root.querySelector('#kzr298-country'),acts=root.querySelector('#kzr298-activities'),custom=root.querySelector('#kzr298-custom');
  lang.value=state.lang;
  const countryQuery=new URLSearchParams(location.search).get('store');if(countryQuery==='jp')state.country='jp';country.value=state.country;
  function t(k){return words[state.lang][k]}
  function render(){
   root.lang=state.lang;root.dir=state.lang==='ar'?'rtl':'ltr';
   root.querySelectorAll('[data-kz]').forEach(n=>{n.textContent=t(n.dataset.kz)});
   acts.replaceChildren();
   activities.forEach(([id,sym])=>{const b=el('button','kz-chip');b.type='button';b.setAttribute('aria-pressed',String(id===state.kind));b.dataset.activity=id;const ico=el('span',null,sym);ico.setAttribute('aria-hidden','true');b.append(ico,document.createTextNode(t(id)));acts.append(b)});
   root.querySelectorAll('[data-minutes]').forEach(n=>n.setAttribute('aria-pressed',String(!custom.value && Number(n.dataset.minutes)===state.preset)));
   const total=state.items.reduce((s,x)=>s+x.minutes,0);
   root.querySelector('#kzr298-total').textContent=`${total} ${t('unit')}`;
   root.querySelector('#kzr298-count').textContent=String(state.items.length);
   const depth=root.querySelector('#kzr298-depth');depth.replaceChildren();
   state.items.forEach((item)=>{const stratum=el('div','kz-strata');stratum.style.height=`${Math.max(25,Math.min(53,item.minutes*.9))}px`;depth.appendChild(stratum)});
   const entries=root.querySelector('#kzr298-entries');entries.replaceChildren();
   state.items.slice().reverse().forEach(item=>{const li=el('li');li.append(el('span',null,activities.find(a=>a[0]===item.kind)[1]+' '+t(item.kind)),el('span','kz-entry-min',`${item.minutes} ${t('unit')}`));entries.append(li)});
   if(!state.items.length)entries.append(el('li',null,t('empty')));
   root.querySelector('#kzr298-undo').disabled=!state.items.length;
   root.querySelector('#kzr298-store').href=`https://apps.apple.com/${state.country}/app/id${appId}`;
   root.querySelector('#kzr298-msg').textContent='';
  }
  lang.addEventListener('change',()=>{state.lang=lang.value;render()});
  country.addEventListener('change',()=>{state.country=country.value;render()});
  acts.addEventListener('click',e=>{const b=e.target.closest('button[data-activity]');if(!b)return;state.kind=b.dataset.activity;render()});
  root.querySelector('#kzr298-minutes').addEventListener('click',e=>{const b=e.target.closest('button[data-minutes]');if(!b)return;state.preset=Number(b.dataset.minutes);custom.value='';render()});
  custom.addEventListener('input',()=>root.querySelectorAll('[data-minutes]').forEach(n=>n.setAttribute('aria-pressed','false')));
  root.querySelector('#kzr298-add').addEventListener('click',()=>{const raw=custom.value.trim();const value=raw===''?state.preset:Number(raw);if(!Number.isInteger(value)||value<1||value>480){root.querySelector('#kzr298-msg').textContent=t('invalid');return}state.items.push({kind:state.kind,minutes:value});custom.value='';render();root.querySelector('#kzr298-msg').textContent=t('added')});
  root.querySelector('#kzr298-undo').addEventListener('click',()=>{state.items.pop();render()});
  root.querySelector('#kzr298-reset').addEventListener('click',()=>{state.items=original.map(x=>({...x}));state.kind='rest';state.preset=15;custom.value='';render()});
  render();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
