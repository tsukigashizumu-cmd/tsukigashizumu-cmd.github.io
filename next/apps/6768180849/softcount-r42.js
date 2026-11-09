/* TSZ_SOFTCOUNT_R42_BREATH_RHYTHM — editorial representation, NOT an actual app screenshot or medical guidance. */
(()=>{
 'use strict';
 const ID='6768180849', ROOT_ID='tsz-softcount-r42';
 const pinned=document.body?.getAttribute('data-p199-id');
 const urlID=location.pathname.match(/\/apps\/(\d+)(?:\/|$)/)?.[1];
 if((pinned&&pinned!==ID)||(urlID&&urlID!==ID)||(!pinned&&!urlID))return;
 const terms={
   en:{tag:'A QUIETER KIND OF TIMER',title:'A rhythm that follows your choice.',intro:'Select a session length, choose a breathing rhythm, and follow a visual guide. You can change rhythms during a session.',choice:'CHOOSE A DURATION',session:'5 MINUTE SESSION',modes:'CHOOSE A RHYTHM',mode:'Relaxation',pace:'VISUAL BREATHING GUIDE',in:'INHALE',hold:'HOLD',out:'EXHALE',rest:'REST',ongoing:'CHANGE RHYTHM WHILE RUNNING',note:'Editorial illustration of supported features, not a live timer, exact preset timing, or an actual app screenshot. No prescribed breathing rate, medical advice, treatment, or outcome is implied.'},
   ja:{tag:'自分のペースで選べるタイマー',title:'自分で選んだリズムに、表示が寄り添う。',intro:'時間を選び、呼吸リズムを選び、視覚的な案内を確認。セッション中でもリズムを切り替えられます。',choice:'時間を選ぶ',session:'5分のセッション',modes:'リズムを選ぶ',mode:'Relaxation',pace:'呼吸フェーズの表示',in:'吸う',hold:'保持',out:'吐く',rest:'休む',ongoing:'セッション中もリズム変更可能',note:'公開機能に基づくLP独自の概念図。実際のアプリ画面、稼働するタイマー、各モードの厳密な秒数を示すものではありません。医療上の助言や効果を保証しません。'}
 };
 const labels={
   en:{language:'Language',country:'App Store country',all:'All apps',eyebrow:'WELLNESS / GENTLE RHYTHM',hero:'Make the next few minutes your own.',description:'A breathing rhythm timer with adjustable sessions, five named modes, visual layers and haptics. Built around the pace you choose.',store:'View on App Store',catalog:'Explore all apps',price:'Latest availability and price are shown on the App Store.',section:'01 / SEE THE RHYTHM',sectionTitle:'Choose a time. Follow a visual flow.',sectionLead:'This original LP diagram explains the workflow; it is not a capture of the app screen.',features:'02 / PERSONAL CONTROL',featuresTitle:'Change the guide, not your day.',f1:'Choose the duration',f1b:'Start a 1, 3, 5 or 10 minute session, including from the home screen widget.',f2:'Change the rhythm',f2b:'Select from Natural, Relaxation, Zen, Resonant or Calming—even mid-session.',f3:'Tune the look and feel',f3b:'Focus Studio adjusts rings, markers and display layers; haptics can guide breathing phases.',limit:'03 / IMPORTANT CONTEXT',limitTitle:'A timer, not a medical intervention.',limitBody:'Soft Count is a general breathing rhythm guide, not a medical device, diagnosis or treatment. The illustrated sequence is conceptual, not a prescribed breathing pattern.',fallback:'This LP editorial copy is in English and Japanese. Other locales fall back to English; consult the App Store for the official localized listing.',ctaTitle:'Find a rhythm that feels yours.',ctaBody:'See actual screenshots, latest features and App Store details.',footer:'Tsukigashizumu Studio · Independent editorial page'},
   ja:{language:'言語',country:'App Storeの国',all:'アプリ一覧',eyebrow:'呼吸 / 自分のリズム',hero:'次の数分を、自分で選ぶ。',description:'セッション時間、5つの呼吸リズム、表示のレイヤーやハプティクス。自分に合うペースを選ぶための呼吸タイマーです。',store:'App Storeで見る',catalog:'アプリ一覧を見る',price:'価格と提供状況はApp Storeの最新表示をご確認ください。',section:'01 / リズムを確認',sectionTitle:'時間を選ぶ。表示に沿って進める。',sectionLead:'アプリの実画面ではなく、操作の流れを説明するLP独自の図です。',features:'02 / 自分で調整',featuresTitle:'そのときの自分に合わせる。',f1:'時間を選ぶ',f1b:'1・3・5・10分。ホーム画面Widgetからも開始できます。',f2:'リズムを切り替える',f2b:'Natural、Relaxation、Zen、Resonant、Calmingから選択。セッション中も変更できます。',f3:'見た目と案内を整える',f3b:'Focus Studioでリング・マーカー・表示レイヤーを調整。ハプティクスでも案内できます。',limit:'03 / 注意事項',limitTitle:'呼吸の補助タイマーであり、医療機器ではありません。',limitBody:'Soft Countは一般的な呼吸リズムの補助アプリです。診断・治療を行わず、効果を保証しません。この図は概念図で、呼吸の秒数を指定するものではありません。',fallback:'LP独自の紹介文は日英で表示し、その他のロケールでは英語になります。公式の翻訳はApp Storeをご確認ください。',ctaTitle:'自分のリズムを選んでみよう。',ctaBody:'アプリの実画面や最新機能はApp Storeでご確認ください。',footer:'Tsukigashizumu Studio · LP独自の紹介ページ'}
 };
 let mapping={'en-US':'us','ja':'jp'},manualStore=false;
 const langSelect=()=>document.getElementById('p199-language');
 const countrySelect=()=>document.getElementById('p199-country');
 const isStandalone=()=>document.body?.classList.contains('sc42-page');
 const chosenLang=()=>/^ja(?:-|$)/i.test(langSelect()?.value||document.documentElement.lang||'en')?'ja':'en';
 function translate(){
   const l=chosenLang();const el=document.getElementById(ROOT_ID);
   if(el){el.lang=l;el.querySelectorAll('[data-sc42-term]').forEach(e=>{const k=e.dataset.sc42Term;if(Object.hasOwn(terms[l],k))e.textContent=terms[l][k];});}
   if(isStandalone()){
     document.documentElement.lang=l;document.documentElement.dir='ltr';
     document.querySelectorAll('[data-sc42-label]').forEach(e=>{const k=e.dataset.sc42Label;if(Object.hasOwn(labels[l],k))e.textContent=labels[l][k];});
   }
 }
 function insertDiagram(){
   if(document.getElementById(ROOT_ID))return;
   const anchor=document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
   const el=document.createElement('section');el.id=ROOT_ID;el.dataset.tszSource='illustrative-breathing-rhythm';
   el.setAttribute('aria-label','Illustrative workflow: choose five minutes, choose Relaxation, follow visible inhale, hold, exhale and rest phases. Not real app UI.');
   el.innerHTML=`<div class="sc42-head"><p class="sc42-kicker" data-sc42-term="tag"></p><h3 data-sc42-term="title"></h3><p class="sc42-lead" data-sc42-term="intro"></p></div><div class="sc42-stage"><div class="sc42-step"><span class="sc42-step-no">01</span><span class="sc42-step-name" data-sc42-term="choice"></span><strong data-sc42-term="session"></strong><div class="sc42-pills" aria-hidden="true"><i>1</i><i>3</i><i class="sc42-active">5</i><i>10</i><span>min</span></div></div><div class="sc42-step"><span class="sc42-step-no">02</span><span class="sc42-step-name" data-sc42-term="modes"></span><strong data-sc42-term="mode"></strong><div class="sc42-mode-dots" aria-hidden="true"><i></i><i></i><i class="selected"></i><i></i><i></i></div></div><div class="sc42-focus"><div class="sc42-ring"><div class="sc42-ring-inside"><span>05:00</span><small data-sc42-term="pace"></small></div></div></div></div><div class="sc42-phases"><div><span>01</span><strong data-sc42-term="in"></strong></div><div><span>02</span><strong data-sc42-term="hold"></strong></div><div><span>03</span><strong data-sc42-term="out"></strong></div><div><span>04</span><strong data-sc42-term="rest"></strong></div></div><p class="sc42-message" data-sc42-term="ongoing"></p><p class="sc42-note" data-sc42-term="note"></p>`;
   if(anchor.id==='overview')anchor.append(el);else anchor.insertBefore(el,anchor.firstElementChild);
   translate();
 }
 function updateStore(){const c=countrySelect()?.value||'us';if(!/^[a-z]{2}$/.test(c))return;document.querySelectorAll('[data-sc42-store]').forEach(a=>a.href=`https://apps.apple.com/${c}/app/id${ID}`);}
 async function loadOptions(){
   if(!isStandalone())return;
   try{
     const response=await fetch('../../data/locale-storefronts.json',{cache:'no-store'});if(!response.ok)return;
     const data=await response.json();const entries=data?.storefrontByLocale;
     if(data?.developerId!==1817908735||!entries||Object.keys(entries).length!==50||!Object.values(entries).every(v=>/^[a-z]{2}$/.test(v)))return;
     mapping=entries;const a=langSelect(),b=countrySelect();if(!a||!b)return;
     const old=a.value;const keys=Object.keys(entries).sort((x,y)=>x.localeCompare(y));
     keys.sort((x,y)=>(x==='en-US'?-2:x==='ja'?-1:0)-(y==='en-US'?-2:y==='ja'?-1:0));
     a.replaceChildren();for(const k of keys){let opt=document.createElement('option');opt.value=k;opt.textContent=k;a.add(opt);}
     const preferred=(navigator.languages||[navigator.language]).filter(Boolean).map(v=>keys.find(k=>k.toLowerCase()===v.toLowerCase())||keys.find(k=>k.split('-')[0]===v.split('-')[0])).find(Boolean);
     a.value=Object.hasOwn(entries,old)&&old!=='en-US'?old:preferred||'en-US';
     const prior=b.value;b.replaceChildren();for(const v of [...new Set(['us','jp',...Object.values(entries)])].sort()){const opt=document.createElement('option');opt.value=v;opt.textContent=v.toUpperCase();b.add(opt);}
     b.value=manualStore?prior:entries[a.value]||'us';if(!b.value)b.value='us';translate();updateStore();
   }catch(_){/* Safe fallback to en-US/ja, US/JP if map unavailable. */}
 }
 function init(){insertDiagram();const a=langSelect(),b=countrySelect();if(a)a.addEventListener('change',()=>{if(b&&!manualStore&&mapping[a.value]&&Array.from(b.options).some(o=>o.value===mapping[a.value]))b.value=mapping[a.value];translate();updateStore();});if(b)b.addEventListener('change',()=>{manualStore=true;updateStore();});translate();updateStore();void loadOptions();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
