/* TSZ_JIIYAROLL_R40_DICE_TO_TEAM — editorial diagram, not captured gameplay. */
(()=>{
  'use strict';
  const ID='6765972725';
  const pageId=document.body?.getAttribute('data-p199-id');
  const match=location.pathname.match(/\/apps\/(\d+)(?:\/|$)/);
  if(pageId && pageId!==ID)return;
  if(match && match[1]!==ID)return;
  if(!pageId&&!match)return;
  const content={
    en:{kick:'ROLL / EARN / HIRE / GROW',title:'Luck starts a roll. A team changes the rhythm.',intro:'Roll dice to gather in-game funds, hire unusual helpers, and upgrade the way you play. A small action can grow into a whole team.',step1:'ROLL DICE',step2:'COLLECT FUNDS',step3:'HIRE STAFF',step4:'GROW YOUR TEAM',time:'24-HOUR RUN',hint:'Gameplay is a sequence of choices, not an automatic promise of a particular score.',note:'Independent editorial diagram. Not a screenshot, a live game result, or a prediction. No real-money gambling, wagering, or cash-out.'},
    ja:{kick:'振る / 集める / 雇う / 育てる',title:'運だけでは終わらない、サイコロの先へ。',intro:'サイコロを振り、ゲーム内の資金を集め、個性的な仲間を雇う。少しずつチームを育てていく。',step1:'サイコロを振る',step2:'資金を集める',step3:'仲間を雇う',step4:'チームを育てる',time:'24時間の挑戦',hint:'選択と積み重ねを紹介した図です。特定の得点や結果を保証するものではありません。',note:'LP独自の説明用の図で、実際のゲーム画面・プレイ結果・予測ではありません。現金の賭博、賞金、換金はありません。'}
  };
  const copy={
    en:{skip:'See the game concept',language:'Language',region:'App Store region',allApps:'All apps',eyebrow:'CASUAL / DICE IDLE GAME',hero:'One more roll. Then build a team.',intro:'Roll dice, gather in-game funds, hire staff, and improve your system. A casual idle game that turns small actions into a growing team.',appStore:'View on App Store',catalog:'Browse all apps',price:'See the App Store for current price and availability.',first:'01 / THE LOOP',firstTitle:'Every roll is a beginning.',firstIntro:'An editorial concept diagram illustrating the core loop—not gameplay footage.',features:'02 / KEEP BUILDING',featuresTitle:'Play in small steps.',f1:'Dice and in-game funds',f1b:'Roll dice and collect game funds as you play.',f2:'Staff and upgrades',f2b:'Hire quirky staff and improve how your team operates.',f3:'Events and choices',f3b:'Face changing events and choose how to continue growing.',clarity:'03 / KNOW WHAT IT IS',clarityTitle:'A casual game, not gambling.',clarityBody:'Jiiya Roll does not involve real-money betting, prizes or cash-out. This landing page shows an illustrative concept, not a playable demo or recorded score.',fallback:'Editorial copy is available in Japanese and English. Other site locale selections use English; refer to the App Store for official localized information.',endTitle:'What will one more roll set in motion?',endBody:'Check real screenshots and the current app details on the App Store.',footer:'Tsukigashizumu Studio · independent editorial page'},
    ja:{skip:'ゲームの流れを見る',language:'言語',region:'App Storeの国',allApps:'アプリ一覧',eyebrow:'カジュアル / サイコロ放置ゲーム',hero:'もう一度振る。仲間を増やす。',intro:'サイコロを振り、ゲーム内の資金を集め、仲間を雇い、効率を上げる。小さな一手からチームが育つ放置系ゲーム。',appStore:'App Storeで見る',catalog:'アプリ一覧',price:'価格・提供状況はApp Storeの最新表示をご確認ください。',first:'01 / ゲームの流れ',firstTitle:'一回のサイコロから始まる。',firstIntro:'核となる流れを示したLP独自の図。実際のプレイ映像ではありません。',features:'02 / 続ける楽しさ',featuresTitle:'少しずつ、次の一手へ。',f1:'サイコロと資金',f1b:'サイコロを振ってゲーム内の資金を集める。',f2:'雇用とアップグレード',f2b:'個性的な仲間を雇い、チームの効率を高める。',f3:'イベントと選択',f3b:'さまざまなイベントを迎え、状況に合わせて次の行動を選ぶ。',clarity:'03 / 大切な区別',clarityTitle:'カジュアルゲーム。賭博ではない。',clarityBody:'Jiiya Rollには、現実のお金を賭ける行為・換金・賞金はありません。このページは説明用で、遊べるデモやプレイ結果ではありません。',fallback:'LP独自の説明は日英で表示し、その他ロケールでは英語になります。正式な翻訳と最新情報はApp Storeでご確認ください。',endTitle:'もう一度振ったら、何が変わる？',endBody:'実際の画面や製品情報はApp Storeへ。',footer:'Tsukigashizumu Studio · 独立した紹介ページ'}
  };
  let localeMap={'en-US':'us','ja':'jp'},manualCountry=false;
  const localeSelect=()=>document.getElementById('p199-language');
  const countrySelect=()=>document.getElementById('p199-country');
  const language=()=>/^ja(?:-|$)/i.test(localeSelect()?.value||document.documentElement.lang||'en')?'ja':'en';
  function translate(){
    const l=language();const diagram=document.getElementById('tsz-jiiyaroll-r40');
    if(diagram){diagram.lang=l;diagram.querySelectorAll('[data-jr40-mod]').forEach(el=>{const k=el.getAttribute('data-jr40-mod');if(Object.prototype.hasOwnProperty.call(content[l],k))el.textContent=content[l][k];});}
    if(document.body?.classList.contains('jr40-page')){
      document.documentElement.lang=l;document.documentElement.dir='ltr';
      document.querySelectorAll('[data-jr40-text]').forEach(el=>{const k=el.getAttribute('data-jr40-text');if(Object.prototype.hasOwnProperty.call(copy[l],k))el.textContent=copy[l][k];});
    }
  }
  function buildDiagram(){
    if(document.getElementById('tsz-jiiyaroll-r40'))return;
    const parent=document.getElementById('overview')||document.querySelector('main');
    if(!parent)return;
    const el=document.createElement('section');el.id='tsz-jiiyaroll-r40';el.dataset.tszSource='editorial-dice-team-concept';
    el.setAttribute('aria-label','Illustration of the Jiiya Roll game loop; not actual gameplay');
    el.innerHTML=`<p class="jr40-mod-kick" data-jr40-mod="kick"></p><h3 data-jr40-mod="title"></h3><p class="jr40-mod-intro" data-jr40-mod="intro"></p><div class="jr40-mod-flow"><div class="jr40-mod-phase"><span class="jr40-mod-die" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><b data-jr40-mod="step1"></b></div><span class="jr40-mod-arrow" aria-hidden="true">›</span><div class="jr40-mod-phase"><span class="jr40-mod-coin" aria-hidden="true">✦</span><b data-jr40-mod="step2"></b></div><span class="jr40-mod-arrow" aria-hidden="true">›</span><div class="jr40-mod-phase"><span class="jr40-mod-people" aria-hidden="true">●●●</span><b data-jr40-mod="step3"></b></div><span class="jr40-mod-arrow" aria-hidden="true">›</span><div class="jr40-mod-phase jr40-mod-last"><span class="jr40-mod-grow" aria-hidden="true">↗</span><b data-jr40-mod="step4"></b></div></div><div class="jr40-mod-bottom"><strong data-jr40-mod="time"></strong><span data-jr40-mod="hint"></span></div><p class="jr40-mod-note" data-jr40-mod="note"></p>`;
    if(parent.id==='overview')parent.append(el);else parent.insertBefore(el,parent.firstElementChild);
    translate();
  }
  function updateStores(){
    const code=countrySelect()?.value||'us';if(!/^[a-z]{2}$/.test(code))return;
    document.querySelectorAll('[data-jr40-store]').forEach(a=>{a.href=`https://apps.apple.com/${code}/app/id${ID}`;});
  }
  async function loadLocales(){
    if(!document.body?.classList.contains('jr40-page'))return;
    try{
      const res=await fetch('../../data/locale-storefronts.json',{cache:'no-store'});if(!res.ok)return;
      const data=await res.json();const list=data?.storefrontByLocale;
      if(data?.developerId!==1817908735||!list||Object.keys(list).length!==50||!Object.values(list).every(s=>/^[a-z]{2}$/.test(s)))return;
      localeMap=list;
      const s=localeSelect(),c=countrySelect();if(!s||!c)return;
      const old=s.value;
      const sorted=Object.keys(list).sort((a,b)=>a.localeCompare(b));sorted.sort((a,b)=>(a==='en-US'?-2:a==='ja'?-1:0)-(b==='en-US'?-2:b==='ja'?-1:0));
      s.replaceChildren();sorted.forEach(code=>{const o=document.createElement('option');o.value=code;o.textContent=code;s.append(o);});
      const found=(navigator.languages||[navigator.language]).filter(Boolean).map(t=>sorted.find(x=>x.toLowerCase()===t.toLowerCase())||sorted.find(x=>x.split('-')[0]===t.split('-')[0])).find(Boolean);
      s.value=Object.hasOwn(list,old)&&old!=='en-US'?old:found||'en-US';
      const previous=c.value;
      const countries=[...new Set(['us','jp',...Object.values(list)])].sort();c.replaceChildren();countries.forEach(code=>{const o=document.createElement('option');o.value=code;o.textContent=code.toUpperCase();c.append(o);});
      c.value=manualCountry?previous:(list[s.value]||'us');if(!c.value)c.value='us';
      translate();updateStores();
    }catch(_){/* Browser/network unavailable: keep en/ja + US/JP. */}
  }
  function init(){
    if(document.body?.getAttribute('data-p199-id')&&document.body.getAttribute('data-p199-id')!==ID)return;
    buildDiagram();
    const s=localeSelect(),c=countrySelect();
    if(s)s.addEventListener('change',()=>{if(c&&!manualCountry&&localeMap[s.value]&&Array.from(c.options).some(o=>o.value===localeMap[s.value]))c.value=localeMap[s.value];translate();updateStores();});
    if(c)c.addEventListener('change',()=>{manualCountry=true;updateStores();});
    translate();updateStores();void loadLocales();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
