/* TSZ_PACKQUANTITY_R39_PACK_MATH_EXAMPLE: 2.5 kg / 700 g = 4 packs, 300 g left. */
/* TSZ_PACKQUANTITY_R39_PACK_MATH_EXAMPLE — fictional user-set reminder, not vehicle diagnostics. */
(()=>{
  'use strict';
  const ID='6804756043';
  const pageId=document.body?.getAttribute('data-p199-id');
  const match=location.pathname.match(/\/apps\/(\d+)(?:\/|$)/);
  if(pageId && pageId!==ID)return;
  if(match && match[1]!==ID)return;
  if(!pageId&&!match)return;
  const mod={
    en:{kicker:'PACK QUANTITY / ILLUSTRATIVE CALCULATION',heading:'Buy enough. Know what remains.',lede:'When a product is sold only in whole packs, convert the amount you need into a clear shopping quantity.',need:'AMOUNT NEEDED',pack:'EACH PACK',buy:'WHOLE PACKS TO BUY',left:'LEFT OVER',packsUnit:'packs',detail:'2.5 kg = 2,500 g. 2,500 ÷ 700 = 3.57…, so round up to 4 whole packs. 4 × 700 − 2,500 = 300 g left over.',notes:'Illustrative example using made-up shopping quantities. This is not an actual app screenshot or inventory measurement. All calculations assume the same compatible unit and whole packs.'},
    ja:{kicker:'パック数 / 説明用の計算',heading:'足りる数を買う。余りもわかる。',lede:'必要量と1袋あたりの内容量から、買うべき袋数と余る量を確認する。',need:'必要な量',pack:'1袋あたり',buy:'購入する袋数',left:'余る量',packsUnit:'袋',detail:'2.5kg＝2,500g。2,500÷700＝約3.57なので、切り上げて4袋。4×700−2,500＝300g余ります。',notes:'架空の数量を用いた説明用の図です。実際のアプリ画面や在庫計測ではありません。単位を揃え、袋単位で購入する想定です。'}
  };
  const copy={
    en:{skip:'See the pack calculation',language:'Language',region:'App Store region',allApps:'All apps',heroKicker:'SHOPPING / WHOLE PACKS',heroTitle:'How many packs do you really need?',heroBody:'Enter how much you need and how much each pack holds. See the number of whole packs to buy, the total purchased and the amount left over.',appStore:'View in App Store ↗',browse:'Browse apps',storeNote:'Current price and availability are shown on the App Store.',exampleKicker:'01 / MAKE THE MATH VISIBLE',exampleTitle:'Four packs. Three hundred grams left.',exampleLead:'An editorial calculation based on the published example, not a live screenshot.',featureKicker:'02 / USE THE RESULT',featureTitle:'A plan you can check and reuse.',feature1Title:'Quantity by whole packs',feature1Body:'Calculate whole packs, total purchased and leftover amount from the required quantity and pack size.',feature2Title:'Compatible units',feature2Body:'Plan by weight, volume, length or item count. Compatible units can be converted in the calculation.',feature3Title:'Estimate and save',feature3Body:'Optionally add a price per pack for an estimated total. Save, search, edit, reuse and copy plans.',contextKicker:'03 / AN IMPORTANT DISTINCTION',contextTitle:'A calculation—not a store stock check.',contextBody:'These numbers demonstrate whole-pack math. The web page does not check store inventory, measure packages or make a purchase.',translation:'The independent editorial copy on this page is English and Japanese; other locale selections fall back to English. See the App Store for official product information.',endingTitle:'Know the pack count before you buy.',endingBody:'See the real app screenshots and up-to-date information in the App Store.',footer:'Independent editorial example. No purchase, order, or inventory check is performed here.'},
    ja:{skip:'袋数の計算を見る',language:'言語',region:'App Storeの国',allApps:'アプリ一覧',heroKicker:'買い物 / 袋数の計算',heroTitle:'何袋買えば、足りる？',heroBody:'必要な量と1袋の内容量を入力。必要な袋数と購入する総量、余る量を確認できる。',appStore:'App Storeで見る ↗',browse:'アプリ一覧',storeNote:'価格と提供状況はApp Storeで確認してください。',exampleKicker:'01 / 数字で理解する',exampleTitle:'4袋買って、300g余る。',exampleLead:'公開されている計算例に基づく独自の図です。実際のアプリ画面ではありません。',featureKicker:'02 / 計算を使う',featureTitle:'買い物の計画を残せる。',feature1Title:'袋数と余る量',feature1Body:'必要な量と1袋の内容量から、整数の袋数・購入総量・余る量を計算する。',feature2Title:'対応する単位',feature2Body:'重さ・体積・長さ・個数の計画に対応し、互換性のある単位は換算できる。',feature3Title:'価格と保存',feature3Body:'必要なら1袋の価格から見積合計を確認。計画の保存・検索・編集・再利用・コピーにも対応。',contextKicker:'03 / 大切な区別',contextTitle:'袋数の計算であって、在庫照会ではない。',contextBody:'数値は袋単位で購入する場合の計算例です。このWebページは店舗の在庫確認や商品購入を行いません。',translation:'LP独自の説明は日英で表示し、その他ロケールでは英語になります。正式な製品情報はApp Storeへ。',endingTitle:'買う前に、必要な袋数を。',endingBody:'実際のアプリ画面と最新の製品情報はApp Storeで確認できます。',footer:'独立した説明用の図。このWebページでは注文や在庫確認を行いません。'}
  };
  let map={'en-US':'us',ja:'jp'},manualCountry=false;
  const langSelect=()=>document.getElementById('p199-language');
  const countrySelect=()=>document.getElementById('p199-country');
  const lang=()=>/^ja(?:-|$)/i.test(langSelect()?.value||document.documentElement.lang||'en')?'ja':'en';
  function translate(){
    const l=lang(),d=mod[l];const root=document.getElementById('tsz-packquantity-r39');
    if(root){root.lang=l;root.querySelectorAll('[data-pq39-module]').forEach(n=>{const k=n.dataset.pq39Module;if(Object.prototype.hasOwnProperty.call(d,k))n.textContent=d[k];});}
    if(document.body?.classList.contains('pq39-page')){
      document.documentElement.lang=l;document.documentElement.dir='ltr';
      document.querySelectorAll('[data-pq39-text]').forEach(n=>{const k=n.dataset.pq39Text;if(Object.prototype.hasOwnProperty.call(copy[l],k))n.textContent=copy[l][k];});
    }
  }
  function insertExample(){
    if(document.getElementById('tsz-packquantity-r39'))return;
    const anchor=document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
    const box=document.createElement('section');box.id='tsz-packquantity-r39';box.dataset.tszSource='illustrative-whole-pack-math';
    box.setAttribute('aria-label','Illustrative pack quantity math, not an app screenshot or a store stock check');
    box.innerHTML=`<p class="pq39-kicker" data-pq39-module="kicker"></p><h3 data-pq39-module="heading"></h3><p class="pq39-lede" data-pq39-module="lede"></p><div class="pq39-inputs"><div class="pq39-step"><span data-pq39-module="need"></span><strong>2.5 <small>kg</small></strong></div><span class="pq39-math" aria-hidden="true">÷</span><div class="pq39-step"><span data-pq39-module="pack"></span><strong>700 <small>g</small></strong></div><span class="pq39-math" aria-hidden="true">→</span><div class="pq39-step pq39-result"><span data-pq39-module="buy"></span><strong>4 <small data-pq39-module="packsUnit">packs</small></strong></div></div><div class="pq39-remainder"><span data-pq39-module="left"></span><strong>300 <small>g</small></strong><div class="pq39-bar" aria-hidden="true"><i></i><i></i><i></i><i></i></div></div><p class="pq39-detail" data-pq39-module="detail"></p><p class="pq39-disclaimer" data-pq39-module="notes"></p>`;
    if(anchor.id==='overview')anchor.append(box);else anchor.insertBefore(box,anchor.firstElementChild);
    translate();
  }
  function updateStores(){
    const code=countrySelect()?.value||'us';if(!/^[a-z]{2}$/.test(code))return;
    document.querySelectorAll('[data-pq39-store]').forEach(a=>a.href=`https://apps.apple.com/${code}/app/id6804756043`);
  }
  async function loadLocales(){
    if(!document.body?.classList.contains('pq39-page'))return;
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
