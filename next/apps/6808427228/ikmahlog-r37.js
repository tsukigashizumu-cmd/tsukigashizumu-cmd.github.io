/* TSZ_IKMAHLOG_R37_NEXT_SERVICE_EXAMPLE — fictional user-set reminder, not vehicle diagnostics. */
(()=>{
  'use strict';
  const ID='6808427228';
  const pageId=document.body?.getAttribute('data-p199-id');
  const match=location.pathname.match(/\/apps\/(\d+)(?:\/|$)/);
  if(pageId && pageId!==ID)return;
  if(match && match[1]!==ID)return;
  if(!pageId&&!match)return;
  const mod={
    en:{kicker:'VEHICLE JOURNAL / USER-SET EXAMPLE',heading:'What comes next should not live in your head.',lede:'Keep each car’s history together, and decide the next check by date, mileage or both.',now:'RECORDED ODOMETER',step:'INTERVAL YOU SET',next:'NEXT CHECK YOU SET',detail:'Example: 42,000 km recorded, plus a user-chosen 5,000 km interval, gives 47,000 km. This is not a manufacturer recommendation.',notes:'Illustrative values only. Not an actual vehicle, app screenshot, diagnosis, manufacturer service interval, or automatically determined maintenance schedule. You choose when and what to check.'},
    ja:{kicker:'愛車の記録 / 自分で設定する例',heading:'次に何をするか、頭で覚えておかない。',lede:'車ごとの履歴をまとめ、次に確認する時期を日付・走行距離、または両方で設定する。',now:'記録した走行距離',step:'自分で決めた間隔',next:'自分で設定した次回の目安',detail:'説明用の例：記録時42,000kmに、自分で設定した5,000kmを加えると47,000km。メーカー推奨の点検間隔ではありません。',notes:'架空の数値です。実際の車両・アプリ画面・故障診断・メーカー指定の整備間隔ではありません。次の点検内容と時期は利用者が判断します。'}
  };
  const copy={
    en:{skip:'Skip to example',language:'Language',region:'App Store region',allApps:'All apps',heroKicker:'YOUR CAR / ONE PLACE FOR ITS HISTORY',heroTitle:'Remember the car. Not every detail.',heroBody:'Mileage, maintenance, parts, fuel, insurance and expenses stay with the vehicle they belong to. Make a record now. Find it when you need it.',appStore:'View in App Store ↗',browse:'Browse apps',storeNote:'Current price and availability are shown on the App Store.',exampleKicker:'01 / ONE CLEAR EXAMPLE',exampleTitle:'Next time, without the guesswork.',exampleLead:'An illustration of a reminder interval entered by a person—not a live app screen.',featureKicker:'02 / WHAT YOU CAN KEEP',featureTitle:'One garage. Many kinds of records.',feature1Title:'A history for every vehicle',feature1Body:'Keep multiple vehicles in one garage, with service, parts, fuel, insurance and other expenses recorded separately.',feature2Title:'Details that matter later',feature2Body:'Save dates, mileage, costs and notes, with optional photos or file attachments for context.',feature3Title:'Your next step, your choice',feature3Body:'Set the next check by date, mileage or both. Repeat reminders and local notifications can help you revisit it.',contextKicker:'03 / IMPORTANT DISTINCTION',contextTitle:'A record keeper—not a mechanic.',contextBody:'You decide the interval and what should be inspected. IkmahLog does not diagnose vehicles or select maintenance schedules for you. The diagram is an editorial example, not an actual app screenshot.',translation:'Editorial content is available here in English and Japanese; other site locale selections use English. The App Store listing is the source of official app information.',endingTitle:'Your vehicle history, ready when needed.',endingBody:'See the official App Store page for real screens and the current feature description.',footer:'Independent editorial illustration. No vehicle data or reminders are created on this page.'},
    ja:{skip:'例を見る',language:'言語',region:'App Storeの国',allApps:'アプリ一覧',heroKicker:'車の履歴を、ひとつの場所に',heroTitle:'車のことを、全部覚えていなくていい。',heroBody:'整備、部品、給油、保険、費用を車ごとに記録。必要なとき、前回いつ何をしたかを見返せる。',appStore:'App Storeで見る ↗',browse:'アプリ一覧',storeNote:'現在の価格と提供状況はApp Storeで確認してください。',exampleKicker:'01 / 説明用の例',exampleTitle:'次の確認時期を、記録しておく。',exampleLead:'ユーザーが決めた間隔を示した概念図です。実際のアプリ画面ではありません。',featureKicker:'02 / 残せる記録',featureTitle:'車ごとに、いろんな記録。',feature1Title:'車ごとの履歴',feature1Body:'複数車両を管理し、整備、部品、給油、保険、そのほかの出費を分けて記録する。',feature2Title:'あとで必要になる情報',feature2Body:'日付・走行距離・費用・メモに加え、写真やファイルを関連付けて残せる。',feature3Title:'次にやることを設定',feature3Body:'日付・走行距離、または両方で次の確認時期を設定。繰り返しリマインダーやローカル通知にも対応する。',contextKicker:'03 / 大切な区別',contextTitle:'整備の判断は、利用者自身で。',contextBody:'点検の内容や間隔は自分で決めます。IkmahLogは故障の診断やメーカー指定の整備スケジュールの判定をしません。図は独自の説明用で、実際のアプリ画面ではありません。',translation:'LPの独自説明は日本語・英語です。ほかのロケールでは英語表示になります。正式な製品情報はApp Storeで確認してください。',endingTitle:'必要なとき、車の記録を見返せる。',endingBody:'実際のアプリ画面と最新の機能説明はApp Storeへ。',footer:'公開機能に基づく独立した説明用図。このページは車両データや通知を作成しません。'}
  };
  let map={'en-US':'us',ja:'jp'},manualCountry=false;
  const langSelect=()=>document.getElementById('p199-language');
  const countrySelect=()=>document.getElementById('p199-country');
  const lang=()=>/^ja(?:-|$)/i.test(langSelect()?.value||document.documentElement.lang||'en')?'ja':'en';
  function translate(){
    const l=lang(),d=mod[l];const root=document.getElementById('tsz-ikmahlog-r37');
    if(root){root.lang=l;root.querySelectorAll('[data-il37-module]').forEach(n=>{const k=n.dataset.il37Module;if(Object.prototype.hasOwnProperty.call(d,k))n.textContent=d[k];});}
    if(document.body?.classList.contains('il37-page')){
      document.documentElement.lang=l;document.documentElement.dir='ltr';
      document.querySelectorAll('[data-il37-text]').forEach(n=>{const k=n.dataset.il37Text;if(Object.prototype.hasOwnProperty.call(copy[l],k))n.textContent=copy[l][k];});
    }
  }
  function insertExample(){
    if(document.getElementById('tsz-ikmahlog-r37'))return;
    const anchor=document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
    const box=document.createElement('section');box.id='tsz-ikmahlog-r37';box.dataset.tszSource='fictional-user-set-mileage-reminder';
    box.setAttribute('aria-label','Illustration of a user-set mileage reminder, not a diagnostic result');
    box.innerHTML=`<p class="il37-kicker" data-il37-module="kicker"></p><h3 data-il37-module="heading"></h3><p class="il37-lede" data-il37-module="lede"></p><div class="il37-journey"><div class="il37-stage"><span data-il37-module="now"></span><strong>42,000 <small>km</small></strong></div><span class="il37-plus" aria-hidden="true">+</span><div class="il37-stage il37-offset"><span data-il37-module="step"></span><strong>5,000 <small>km</small></strong></div><span class="il37-equal" aria-hidden="true">=</span><div class="il37-stage il37-result"><span data-il37-module="next"></span><strong>47,000 <small>km</small></strong></div></div><p class="il37-detail" data-il37-module="detail"></p><p class="il37-disclaimer" data-il37-module="notes"></p>`;
    if(anchor.id==='overview')anchor.append(box);else anchor.insertBefore(box,anchor.firstElementChild);
    translate();
  }
  function updateStores(){
    const code=countrySelect()?.value||'us';if(!/^[a-z]{2}$/.test(code))return;
    document.querySelectorAll('[data-il37-store]').forEach(a=>a.href=`https://apps.apple.com/${code}/app/id6808427228`);
  }
  async function loadLocales(){
    if(!document.body?.classList.contains('il37-page'))return;
    try{
      const res=await fetch('../../data/locale-storefronts.json',{cache:'no-store'});if(!res.ok)return;
      const data=await res.json();const parsed=data?.storefrontByLocale;
      if(data?.developerId!==1817908735||!parsed||Object.keys(parsed).length!==50||!Object.values(parsed).every(s=>/^[a-z]{2}$/.test(s)))return;
      map=parsed;const l=langSelect(),c=countrySelect();if(!l||!c)return;
      const options=Object.keys(map).sort((a,b)=>a.localeCompare(b));options.sort((a,b)=>(a==='en-US'?-1:a==='ja'?0:1)-(b==='en-US'?-1:b==='ja'?0:1));
      const wanted=l.value;l.replaceChildren();for(const code of options){const o=document.createElement('option');o.value=code;o.textContent=code;l.append(o);}
      const detected=(navigator.languages||[navigator.language]).filter(Boolean).map(tag=>options.find(x=>x.toLowerCase()===tag.toLowerCase())||options.find(x=>x.split('-')[0]===tag.split('-')[0])).find(Boolean);
      l.value=Object.hasOwn(map,wanted)&&wanted!=='en-US'?wanted:detected||'en-US';
      const prev=c.value;c.replaceChildren();for(const country of [...new Set(['us','jp',...Object.values(map)])].sort()){const o=document.createElement('option');o.value=country;o.textContent=country.toUpperCase();c.append(o);}
      c.value=manualCountry?prev:map[l.value]||'us';if(!c.value)c.value='us';translate();updateStores();
    }catch(_){/* Offline retains en/ja and us/jp. */}
  }
  function init(){
    if(document.body?.getAttribute('data-p199-id')&&document.body.getAttribute('data-p199-id')!==ID)return;
    insertExample();const l=langSelect(),c=countrySelect();
    if(l)l.addEventListener('change',()=>{if(c&&!manualCountry&&map[l.value]&&Array.from(c.options).some(o=>o.value===map[l.value]))c.value=map[l.value];translate();updateStores();});
    if(c)c.addEventListener('change',()=>{manualCountry=true;updateStores();});
    translate();updateStores();void loadLocales();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
