/* TSZ_BREAKTHREE_R38_72_HOURS_EXAMPLE: 24h + 24h + 24h. Illustrative only, no medical claim. */
/* TSZ_BREAKTHREE_R38_72_HOURS_EXAMPLE — 72-hour milestone illustration, not a medical result. */
(()=>{
  'use strict';
  const ID='6796486391';
  const pageId=document.body?.getAttribute('data-p199-id');
  const match=location.pathname.match(/\/apps\/(\d+)(?:\/|$)/);
  if(pageId && pageId!==ID)return;
  if(match && match[1]!==ID)return;
  if(!pageId&&!match)return;
  const mod={
    en:{kicker:'THE FIRST 72 HOURS / VISUAL EXAMPLE',heading:'Three days. Only the next step.',lede:'A simple way to see the first 72 hours after a chosen start time. Each candle represents one 24-hour period.',day1:'DAY ONE',day2:'DAY TWO',day3:'DAY THREE',detail:'24 + 24 + 24 = 72 hours. This is a diagram of milestones—not a live countdown or a record of someone quitting.',notes:'Illustration only; not an actual app screenshot, medical assessment, or promise of success. BreakThree does not replace cessation treatment. Seek medical advice for severe withdrawal symptoms or health concerns.'},
    ja:{kicker:'最初の72時間 / 説明用ビジュアル',heading:'3日間。まずは、次の一歩だけ。',lede:'自分で決めた開始時刻から、最初の72時間を見渡すための図。ろうそく1本が24時間を表します。',day1:'1日目',day2:'2日目',day3:'3日目',detail:'24 + 24 + 24 = 72時間。達成までの区切りを示す図で、実際のカウントダウンや禁煙記録ではありません。',notes:'説明用の図です。アプリの実画面、医学的評価、禁煙成功の保証ではありません。BreakThreeは治療の代替ではありません。強い離脱症状や健康上の不安がある場合は専門家へ相談してください。'}
  };
  const copy={
    en:{skip:'See the 72-hour example',language:'Language',region:'App Store region',allApps:'All apps',heroKicker:'QUIT SMOKING / THE FIRST THREE DAYS',heroTitle:'Not forever. Start with 72 hours.',heroBody:'A personal guide for the first three days: prepare alternatives, track your chosen start time, and use a 30-second breathing screen when cravings appear.',appStore:'View in App Store ↗',browse:'Browse apps',storeNote:'Current price and availability are shown on the App Store.',exampleKicker:'01 / MAKE THE FIRST THREE DAYS VISIBLE',exampleTitle:'Three candles. One day at a time.',exampleLead:'A symbolic timeline. These are not a person’s results or a live screenshot.',featureKicker:'02 / INSIDE THE APP',featureTitle:'A smaller next action to focus on.',feature1Title:'Prepare before the urge',feature1Body:'Choose actions you can try instead of the next cigarette, and reflect on what you want to regain.',feature2Title:'Track the first 72 hours',feature2Body:'View a time-based progress display represented by three candles, with a three-day record stored on the device.',feature3Title:'A 30-second pause',feature3Body:'When an urge appears, open a short breathing-support screen and focus on the moment.',contextKicker:'03 / AN IMPORTANT LIMIT',contextTitle:'A personal progress tool—not treatment.',contextBody:'BreakThree does not provide a diagnosis or medical treatment and cannot guarantee that someone will stop smoking. For severe symptoms or concerns, seek professional support.',translation:'This page’s independent editorial explanation is in English and Japanese. Other site locale selections fall back to English. Official localized product information is on the App Store.',endingTitle:'Start with the next cigarette—not a lifetime.',endingBody:'See the real app screens and current details on the App Store.',footer:'Editorial illustration. This web page does not track smoking behavior or provide medical care.'},
    ja:{skip:'72時間の図を見る',language:'言語',region:'App Storeの国',allApps:'アプリ一覧',heroKicker:'禁煙 / 最初の3日間',heroTitle:'一生ではなく、まず72時間から。',heroBody:'次の一本を遠ざけるための準備、選んだ開始時刻からの経過、吸いたい瞬間の30秒の呼吸サポート。最初の3日間に向き合うためのアプリ。',appStore:'App Storeで見る ↗',browse:'アプリ一覧',storeNote:'最新の価格と提供状況はApp Storeで確認してください。',exampleKicker:'01 / 最初の3日間を見える形に',exampleTitle:'3本のろうそく。1日ずつ。',exampleLead:'時間の進み方を示した概念図。実際のアプリ画面でも禁煙達成の実績でもありません。',featureKicker:'02 / アプリでできること',featureTitle:'次にできる行動を、小さくする。',feature1Title:'吸いたい瞬間の前に準備',feature1Body:'次の一本の代わりに試したい行動を決め、取り戻したいものを確かめる。',feature2Title:'最初の72時間を表示',feature2Body:'3本のろうそくによる経過表示。3日間の記録は端末内に保存される。',feature3Title:'30秒、いまに集中',feature3Body:'吸いたい気持ちが強くなったら、30秒の呼吸サポート画面を開く。',contextKicker:'03 / 大切なこと',contextTitle:'個人の進捗ツールであり、治療ではない。',contextBody:'BreakThreeは医学的な診断・治療を行わず、禁煙成功も保証しません。強い症状や健康上の不安がある場合は、医療機関や禁煙外来などに相談してください。',translation:'このLPの独自説明は日本語・英語で提供。ほかのロケールでは英語表示になります。正式な製品情報はApp Storeをご確認ください。',endingTitle:'一生分ではなく、次の一本から。',endingBody:'実際のアプリ画面と最新情報はApp Storeで確認してください。',footer:'独立した説明用ビジュアル。このWebページは喫煙行動を記録せず、医療行為も行いません。'}
  };
  let map={'en-US':'us',ja:'jp'},manualCountry=false;
  const langSelect=()=>document.getElementById('p199-language');
  const countrySelect=()=>document.getElementById('p199-country');
  const lang=()=>/^ja(?:-|$)/i.test(langSelect()?.value||document.documentElement.lang||'en')?'ja':'en';
  function translate(){
    const l=lang(),d=mod[l];const root=document.getElementById('tsz-breakthree-r38');
    if(root){root.lang=l;root.querySelectorAll('[data-bt38-module]').forEach(n=>{const k=n.dataset.bt38Module;if(Object.prototype.hasOwnProperty.call(d,k))n.textContent=d[k];});}
    if(document.body?.classList.contains('bt38-page')){
      document.documentElement.lang=l;document.documentElement.dir='ltr';
      document.querySelectorAll('[data-bt38-text]').forEach(n=>{const k=n.dataset.bt38Text;if(Object.prototype.hasOwnProperty.call(copy[l],k))n.textContent=copy[l][k];});
    }
  }
  function insertExample(){
    if(document.getElementById('tsz-breakthree-r38'))return;
    const anchor=document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
    const section=document.createElement('section');section.id='tsz-breakthree-r38';
    section.dataset.tszSource='fictional-72-hour-milestone-diagram';
    section.setAttribute('aria-label','Illustrative 72-hour milestones, not real outcomes or a live app screen');
    section.innerHTML=`<p class="bt38-kicker" data-bt38-module="kicker"></p><h3 data-bt38-module="heading"></h3><p class="bt38-lede" data-bt38-module="lede"></p><div class="bt38-days"><div class="bt38-day"><span class="bt38-flame" aria-hidden="true"></span><span data-bt38-module="day1"></span><strong>24 <small>h</small></strong></div><div class="bt38-day"><span class="bt38-flame" aria-hidden="true"></span><span data-bt38-module="day2"></span><strong>48 <small>h</small></strong></div><div class="bt38-day bt38-last"><span class="bt38-flame" aria-hidden="true"></span><span data-bt38-module="day3"></span><strong>72 <small>h</small></strong></div></div><div class="bt38-timeline" aria-hidden="true"><span></span><span></span><span></span></div><p class="bt38-detail" data-bt38-module="detail"></p><p class="bt38-disclaimer" data-bt38-module="notes"></p>`;
    if(anchor.id==='overview')anchor.append(section);else anchor.insertBefore(section,anchor.firstElementChild);
    translate();
  }
  function updateStores(){
    const code=countrySelect()?.value||'us';if(!/^[a-z]{2}$/.test(code))return;
    document.querySelectorAll('[data-bt38-store]').forEach(a=>a.href=`https://apps.apple.com/${code}/app/id6796486391`);
  }
  async function loadLocales(){
    if(!document.body?.classList.contains('bt38-page'))return;
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
