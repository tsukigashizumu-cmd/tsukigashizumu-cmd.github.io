/* TSZ_HAULSTAMP_R36_WORK_LOG_ESTIMATE - illustrative numbers, not a verified invoice. */
(() => {
  'use strict';
  const APP='6798447816';
  const pageId=document.body?.getAttribute('data-p199-id');
  const route=location.pathname.match(/\/apps\/(\d+)(?:\/|$)/);
  if (pageId && pageId!==APP) return;
  if (route && route[1]!==APP) return;
  if (!pageId && !route) return;
  const strings={
    en:{
      kicker:'WORK LOG / FICTIONAL EXAMPLE',heading:'A clear reference, not a claim.',
      lede:'Keep waiting and cargo handling separate. Multiply the recorded hours by rates entered by the user.',
      waiting:'WAITING',handling:'CARGO HANDLING',formulaW:'45 min × ¥2,000/hour',formulaH:'30 min × ¥2,400/hour',total:'REFERENCE TOTAL',
      weight:'EXAMPLE LOAD', note:'Fictional numbers for explaining the calculation: waiting 45 minutes at ¥2,000/hour = ¥1,500; handling 30 minutes at ¥2,400/hour = ¥1,200; total ¥2,700. Twelve items × 2.5 kg = 30 kg. These are not actual work records or an app screenshot. A reference amount is not an invoice, unpaid balance, or legally recognized sum.'
    },
    ja:{
      kicker:'作業の記録 / 説明用の例',heading:'時間を分けると、内訳が見える。',
      lede:'荷待ちと荷役を分けて記録。自分で設定した時間単価を使い、参考額を計算する。',
      waiting:'荷待ち',handling:'荷役',formulaW:'45分 × 時間単価 ¥2,000',formulaH:'30分 × 時間単価 ¥2,400',total:'参考額の合計',
      weight:'荷物の記録例',note:'説明用の架空の数値です。荷待ち45分 × 時間単価2,000円＝1,500円。荷役30分 × 時間単価2,400円＝1,200円。合計2,700円。個数12 × 1個2.5kg＝30kg。実際の作業記録やアプリ画面ではありません。参考額は請求額、未払額、法的に認められる金額を示しません。'
    }
  };
  const page={
    en:{skip:'Skip to the example',language:'Language',region:'App Store region',allApps:'All apps',heroKicker:'WORK JOURNAL / WAITING & HANDLING',heroTitle:'Keep the hours that disappear.',heroBody:'Log waiting and cargo-handling time as the work happens. Keep quantity, weight and corrections in the same record, so you can revisit the details later.',appStore:'View in App Store ↗',browse:'Browse apps',storeNote:'Current price and availability are shown on the App Store.',exampleKicker:'01 / WORKED EXAMPLE',exampleTitle:'Two kinds of time. One clear record.',exampleLead:'Fictional values entered by a user; not a live session or a screenshot.',featureKicker:'02 / ONE RECORD',featureTitle:'More than a timer.',feature1Title:'Track both phases',feature1Body:'Keep waiting time and cargo-handling time separately, with your own hourly rates.',feature2Title:'Count the load',feature2Body:'Record item count and weight per item; check the calculated total weight.',feature3Title:'Preserve the history',feature3Body:'Review saved work, record the reason for an edit and export as PDF, CSV or text.',contextKicker:'03 / IMPORTANT CONTEXT',contextTitle:'A reference amount, not a bill.',contextBody:'The estimate is calculated only from the time recorded and the hourly rates the user enters. It is not a verified invoice, unpaid balance, or legally recognized entitlement. The initial release does not offer deletion of saved records.',translation:'This LP is editorial text in English and Japanese. Other supported site locale selections display English editorial copy; they do not imply an official App Store translation.',endingTitle:'Record it while you remember.',endingBody:'For genuine app screens and the official feature list, visit the App Store.',footer:'Independent editorial illustration based on published features.'},
    ja:{skip:'説明用の例へ',language:'言語',region:'App Storeの国',allApps:'アプリ一覧',heroKicker:'作業の記録 / 荷待ち・荷役',heroTitle:'消えてしまう作業を、記録に残す。',heroBody:'荷待ちと荷役を分けて計測。個数・重量・修正履歴も、あとで確かめられる形に残す。',appStore:'App Storeで見る ↗',browse:'アプリ一覧',storeNote:'現在の価格・提供状況はApp Storeでご確認ください。',exampleKicker:'01 / 説明用の計算例',exampleTitle:'荷待ちと荷役。内訳を一目で。',exampleLead:'架空の入力値です。実際の作業記録でもアプリのスクリーンショットでもありません。',featureKicker:'02 / ひとつの記録',featureTitle:'時間を測るだけでは終わらない。',feature1Title:'荷待ち・荷役',feature1Body:'2つの作業時間を分けて記録し、それぞれの時間単価を自分で設定する。',feature2Title:'個数と重量',feature2Body:'個数と1個あたり重量から、合計重量を確認する。',feature3Title:'履歴を残す',feature3Body:'修正前の値・修正日時・理由を残し、PDF・CSV・テキストで出力できる。',contextKicker:'03 / 大切な注意',contextTitle:'参考額は、請求額ではない。',contextBody:'参考額は自分で設定した時間単価と記録した作業時間から算出する目安です。請求額・未払額・法的に認められる金額を示しません。初版には保存記録の削除機能がありません。',translation:'このLPの説明は日本語・英語の独自編集です。ほかのロケールでは英語の編集文を表示し、App Store公式の翻訳があることを意味しません。',endingTitle:'作業を忘れる前に、記録へ。',endingBody:'アプリの実画面・正式な機能説明はApp Storeで確認してください。',footer:'公開機能に基づく独立した編集紹介です。'}
  };
  let countryByLocale={'en-US':'us',ja:'jp'};let countryManuallySet=false;
  const languageSelect=()=>document.getElementById('p199-language');
  const countrySelect=()=>document.getElementById('p199-country');
  const currentLanguage=()=>/^ja(?:-|$)/i.test(languageSelect()?.value||document.documentElement.lang||'en')?'ja':'en';
  function translate(){
    const loc=currentLanguage(),d=strings[loc];
    const root=document.getElementById('tsz-haulstamp-r36');
    if(root){root.lang=loc;root.querySelectorAll('[data-hs36-module]').forEach(e=>{const key=e.getAttribute('data-hs36-module');if(Object.prototype.hasOwnProperty.call(d,key))e.textContent=d[key];});}
    if(document.body?.classList.contains('hs36-page')){
      document.documentElement.lang=loc;document.documentElement.dir='ltr';
      document.querySelectorAll('[data-hs36-text]').forEach(e=>{const key=e.getAttribute('data-hs36-text');if(Object.prototype.hasOwnProperty.call(page[loc],key))e.textContent=page[loc][key];});
    }
  }
  function installExample(){
    let anchor=document.getElementById('overview');
    if(!anchor){anchor=document.querySelector('main');}
    if(!anchor||document.getElementById('tsz-haulstamp-r36'))return;
    const block=document.createElement('section');block.id='tsz-haulstamp-r36';block.dataset.tszSource='illustrative-user-entered-example';block.setAttribute('aria-label','Illustrative waiting and cargo-handling times and reference amounts');
    block.innerHTML=`<p class="hs36-kicker" data-hs36-module="kicker"></p><h3 data-hs36-module="heading"></h3><p class="hs36-lede" data-hs36-module="lede"></p><div class="hs36-work-row"><div class="hs36-work-item"><span data-hs36-module="waiting"></span><strong>00:45</strong><p class="hs36-formula" data-hs36-module="formulaW"></p><p class="hs36-line-cost">¥1,500</p></div><div class="hs36-work-item"><span data-hs36-module="handling"></span><strong>00:30</strong><p class="hs36-formula" data-hs36-module="formulaH"></p><p class="hs36-line-cost">¥1,200</p></div></div><div class="hs36-total"><span data-hs36-module="total"></span><strong>¥2,700</strong></div><div class="hs36-weight"><span data-hs36-module="weight"></span><strong>12 × 2.5 kg = 30 kg</strong></div><p class="hs36-disclaimer" data-hs36-module="note"></p>`;
    if(anchor.id==='overview')anchor.append(block);else anchor.insertBefore(block,anchor.firstElementChild);
    translate();
  }
  function storeUpdate(){const c=countrySelect()?.value||'us';if(!/^[a-z]{2}$/.test(c))return;document.querySelectorAll('[data-hs36-store]').forEach(a=>a.href='https://apps.apple.com/'+c+'/app/id6798447816');}
  async function localeOptions(){
    if(!document.body?.classList.contains('hs36-page'))return;
    try{
      const response=await fetch('../../data/locale-storefronts.json',{cache:'no-store'});if(!response.ok)return;
      const data=await response.json();const map=data?.storefrontByLocale;
      if(data?.developerId!==1817908735||!map||Object.keys(map).length!==50||!Object.values(map).every(c=>/^[a-z]{2}$/.test(c)))return;
      countryByLocale=map;const ls=languageSelect(),cs=countrySelect();if(!ls||!cs)return;
      const codes=Object.keys(map).sort((a,b)=>a.localeCompare(b));codes.sort((a,b)=>(a==='en-US'?-1:a==='ja'?0:1)-(b==='en-US'?-1:b==='ja'?0:1));
      const chosen=ls.value;ls.replaceChildren();for(const code of codes){const option=document.createElement('option');option.value=code;option.textContent=code;ls.append(option);}
      const browser=(navigator.languages||[navigator.language]).filter(Boolean);const browserChoice=browser.map(l=>codes.find(x=>x.toLowerCase()===l.toLowerCase())||codes.find(x=>x.split('-')[0]===l.split('-')[0])).find(Boolean);
      ls.value=Object.hasOwn(map,chosen)&&chosen!=='en-US'?chosen:browserChoice||'en-US';
      const currentCountry=cs.value;cs.replaceChildren();for(const country of [...new Set(['us','jp',...Object.values(map)])].sort()){const option=document.createElement('option');option.value=country;option.textContent=country.toUpperCase();cs.append(option);}
      cs.value=countryManuallySet?currentCountry:(map[ls.value]||'us');if(!cs.value)cs.value='us';storeUpdate();translate();
    }catch(_){/* Offline fallback retains English, Japanese, US and JP. */}
  }
  function init(){
    if(document.body?.getAttribute('data-p199-id')&&document.body.getAttribute('data-p199-id')!==APP)return;
    installExample();const l=languageSelect(),c=countrySelect();
    if(l)l.addEventListener('change',()=>{if(c&&!countryManuallySet&&countryByLocale[l.value]&&Array.from(c.options).some(o=>o.value===countryByLocale[l.value]))c.value=countryByLocale[l.value];translate();storeUpdate();});
    if(c)c.addEventListener('change',()=>{countryManuallySet=true;storeUpdate();});
    translate();storeUpdate();void localeOptions();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
