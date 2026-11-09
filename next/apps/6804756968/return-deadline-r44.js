/* TSZ_RETURNDEADLINE_R44_RETURN_WINDOW_TIMELINE — fictional, store policy dependent; not a screen capture. */
(()=>{
 'use strict';
 const APP='6804756968', DIAGRAM='tsz-return-deadline-r44';
 const pinned=document.body?.getAttribute('data-p199-id');
 const pathID=location.pathname.match(/\/apps\/(\d+)(?:\/|$)/)?.[1];
 if((pinned&&pinned!==APP)||(pathID&&pathID!==APP)||(!pinned&&!pathID))return;
 // A hypothetical November 1, 2026 purchase, a user-entered 14-day period, and an illustrative November 15 deadline.
 const texts={
  en:{tag:'THE LAST DAY MATTERS',title:'A date you can act on.',lead:'Keep the purchase date, the return window you were given, and a reminder in one clear timeline.',purchase:'PURCHASE',window:'ENTERED PERIOD',end:'ILLUSTRATIVE LAST DAY',alert:'OPTIONAL REMINDER',alertDate:'NOV 12',alertDetail:'3 days before this example deadline',timeline:'YOUR ENTERED RETURN WINDOW',days:'14 DAYS',note:'Fictional calendar illustration: Nov 01, 2026 + 14 days = Nov 15, 2026; reminder example Nov 12. This does not establish a retailer’s return policy, refund eligibility or guaranteed notification. Confirm the actual deadline and conditions with the retailer. Notifications require permission. Not an app screenshot.'},
  ja:{tag:'返品できる最終日を、見落とさない。',title:'購入日から、期限の目安を整理。',lead:'購入日と店舗から案内された返品期間を記録し、必要なら通知日も設定する。',purchase:'購入日',window:'入力した期間',end:'期限の計算例',alert:'通知の設定例',alertDate:'11月12日',alertDetail:'この例の期限3日前',timeline:'入力した返品可能期間',days:'14日',note:'架空の暦日計算例：2026年11月1日＋14日＝11月15日、通知例は11月12日。店舗の正式な返品期限・返金可否・通知の到達を保証するものではありません。実際の返品条件を店舗で確認してください。通知には許可が必要です。アプリの実画面ではありません。'}
 };
 const labels={
 en:{language:'Language',country:'App Store country',all:'All apps',eyebrow:'SHOPPING / KEEP THE LAST DAY VISIBLE',hero:'A deadline is easier to remember when you can see it.',description:'Track individual purchases, enter the return period supplied by the retailer and choose reminder days and times before the window ends.',store:'View on App Store',catalog:'Explore all apps',price:'Check the App Store for the current price and availability.',section:'01 / A CLEAR EXAMPLE',sectionTitle:'The day you bought it. The day to check.',sectionLead:'This calendar example is an independent illustration, not a claim about an actual retailer.',features:'02 / WHAT THE APP HELPS YOU DO',featuresTitle:'One item, one visible date.',f1:'Enter the return rule',f1b:'Record a purchase date and the return period provided by the store, in days, weeks or months.',f2:'Keep multiple items',f2b:'Save different purchases and find the deadline you need without relying on memory.',f3:'Choose notification timing',f3b:'Set reminder days and a notification time for individual items, subject to device permission.',limit:'03 / WHAT TO VERIFY',limitTitle:'Your retailer decides what can be returned.',limitBody:'Return Deadline Tracker does not infer store policies, inspect your email or promise that a refund will be accepted. Confirm exclusions, cut-off times and the official policy with the seller.',fallback:'This LP-specific explanation is written in English and Japanese; other locale selections use English editorial copy. Refer to the App Store for its official localized description.',ctaTitle:'Know when to check—before it is too late.',ctaBody:'See the real screenshots and current app details on the App Store.',footer:'Tsukigashizumu Studio · Independent editorial page'},
 ja:{language:'言語',country:'App Storeの国',all:'アプリ一覧',eyebrow:'買い物 / 返品期限を見えるように',hero:'返品期限を、記憶だけに頼らない。',description:'購入日と店舗から案内された返品期間を記録し、商品ごとに通知日や時刻を設定できます。',store:'App Storeで見る',catalog:'アプリ一覧',price:'最新の価格・提供状況はApp Storeで確認してください。',section:'01 / 日付が見える',sectionTitle:'購入日から、確認すべき期限まで。',sectionLead:'ここはLP独自の説明用カレンダーです。実店舗の返品ルールを示すものではありません。',features:'02 / できること',featuresTitle:'商品ごとの期限を管理。',f1:'返品期間を入力',f1b:'店舗で確認した期間を日・週・月で入力し、購入日と組み合わせて確認します。',f2:'複数の商品を保存',f2b:'購入した商品を分けて記録し、あとから必要な期限を探せます。',f3:'通知日と時刻を選ぶ',f3b:'商品ごとに通知のタイミングを選択できます。通知には端末の許可が必要です。',limit:'03 / 注意したいこと',limitTitle:'返品の可否は、店舗の規約で決まります。',limitBody:'このアプリが店舗の返品規則を自動判定したり、返金を保証したりするわけではありません。対象外商品、時刻、店舗ごとの条件は販売元で確認してください。',fallback:'LP独自の説明文は日本語と英語で表示。他の言語は英語にフォールバックします。公式のローカライズ説明はApp Storeで確認してください。',ctaTitle:'期限を忘れる前に、記録しておく。',ctaBody:'実際のアプリ画面と最新情報はApp Storeで確認できます。',footer:'Tsukigashizumu Studio · LP独自の紹介ページ'}
 };
 let locales={'en-US':'us','ja':'jp'},manualCountry=false;
 const languageEl=()=>document.getElementById('p199-language');
 const countryEl=()=>document.getElementById('p199-country');
 const standalone=()=>document.body?.classList.contains('rd44-page');
 const language=()=>/^ja(?:-|$)/i.test(languageEl()?.value||document.documentElement.lang||'en')?'ja':'en';
 function translate(){
  const lang=language(),root=document.getElementById(DIAGRAM);
  if(root){root.lang=lang;root.querySelectorAll('[data-rd44-term]').forEach(el=>{const key=el.dataset.rd44Term;if(Object.hasOwn(texts[lang],key))el.textContent=texts[lang][key];});}
  if(standalone()){document.documentElement.lang=lang;document.documentElement.dir='ltr';document.querySelectorAll('[data-rd44-label]').forEach(el=>{const key=el.dataset.rd44Label;if(Object.hasOwn(labels[lang],key))el.textContent=labels[lang][key];});}
 }
 function insert(){
  if(document.getElementById(DIAGRAM))return;
  const anchor=document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
  const section=document.createElement('section');section.id=DIAGRAM;
  section.dataset.tszSource='fictional-user-entered-return-window';
  section.setAttribute('aria-label','Illustration: purchase Nov 1, 2026, entered 14-day period, calculated date Nov 15, optional reminder Nov 12. Retailer terms govern.');
  section.innerHTML=`<div class="rd44-head"><p class="rd44-kicker" data-rd44-term="tag"></p><h3 data-rd44-term="title"></h3><p class="rd44-intro" data-rd44-term="lead"></p></div><div class="rd44-grid"><div class="rd44-milestone"><span class="rd44-index">01</span><small data-rd44-term="purchase"></small><strong>NOV 01</strong><em>2026</em></div><div class="rd44-connector" aria-hidden="true"><span>→</span><strong data-rd44-term="days"></strong></div><div class="rd44-milestone rd44-milestone-end"><span class="rd44-index">02</span><small data-rd44-term="end"></small><strong>NOV 15</strong><em>2026</em></div></div><div class="rd44-footer-row"><span class="rd44-duration"><span class="rd44-dot"></span><span data-rd44-term="timeline"></span><b data-rd44-term="days"></b></span><span class="rd44-reminder"><span class="rd44-bell" aria-hidden="true">◷</span><span><small data-rd44-term="alert"></small><strong data-rd44-term="alertDate"></strong><em data-rd44-term="alertDetail"></em></span></span></div><p class="rd44-note" data-rd44-term="note"></p>`;
  if(anchor.id==='overview')anchor.append(section); else anchor.insertBefore(section,anchor.firstElementChild);
  translate();
 }
 function updateStore(){const region=countryEl()?.value||'us';if(!/^[a-z]{2}$/.test(region))return;document.querySelectorAll('[data-rd44-store]').forEach(el=>el.href=`https://apps.apple.com/${region}/app/id${APP}`);}
 async function loadLocales(){
  if(!standalone())return;
  try{const response=await fetch('../../data/locale-storefronts.json',{cache:'no-store'});if(!response.ok)return;
   const data=await response.json(),map=data?.storefrontByLocale;
   if(data?.developerId!==1817908735||!map||Object.keys(map).length!==50||!Object.values(map).every(v=>/^[a-z]{2}$/.test(v)))return;
   locales=map;const lang=languageEl(),region=countryEl();if(!lang||!region)return;
   const keys=Object.keys(map).sort((a,b)=>a.localeCompare(b));keys.sort((a,b)=>(a==='en-US'?-2:a==='ja'?-1:0)-(b==='en-US'?-2:b==='ja'?-1:0));
   lang.replaceChildren();for(const k of keys){const o=document.createElement('option');o.value=k;o.textContent=k;lang.add(o);}
   const preferred=(navigator.languages||[navigator.language]).filter(Boolean).map(v=>keys.find(k=>k.toLowerCase()===v.toLowerCase())||keys.find(k=>k.split('-')[0]===v.split('-')[0])).find(Boolean);
   lang.value=preferred||'en-US';const previous=region.value;region.replaceChildren();for(const k of [...new Set(['us','jp',...Object.values(map)])].sort()){const o=document.createElement('option');o.value=k;o.textContent=k.toUpperCase();region.add(o);}
   region.value=manualCountry?previous:map[lang.value]||'us';if(!region.value)region.value='us';translate();updateStore();
  }catch(_){/* Two-locale fallback. */}
 }
 function init(){insert();const l=languageEl(),c=countryEl();if(l)l.addEventListener('change',()=>{if(c&&!manualCountry&&locales[l.value]&&Array.from(c.options).some(o=>o.value===locales[l.value]))c.value=locales[l.value];translate();updateStore();});if(c)c.addEventListener('change',()=>{manualCountry=true;updateStore();});translate();updateStore();void loadLocales();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
