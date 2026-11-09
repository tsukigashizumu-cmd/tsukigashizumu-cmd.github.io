/* TSZ_PACKSIZE_R41_BULK_PRICE_REVERSAL — fictional editorial arithmetic, never store pricing. */
(()=>{
  'use strict';
  const ID='6803001339',ROOT_ID='tsz-packsize-r41';
  const pinned=document.body?.getAttribute('data-p199-id');
  const urlId=location.pathname.match(/\/apps\/(\d+)(?:\/|$)/)?.[1];
  if((pinned&&pinned!==ID)||(urlId&&urlId!==ID)||(!pinned&&!urlId))return;
  const terms={
    en:{tag:'BIGGER IS NOT ALWAYS BETTER',title:'Check the price per kilo — not the box.',intro:'A large package may look economical. Compare what you actually get for the money before choosing.',small:'SMALL PACK',large:'BULK PACK',unit:'PER 1 kg',win:'LOWER UNIT PRICE',difference:'$1.00 less per kg',formula:'2.40 ÷ 0.4 = 6.00 / kg   ·   7.00 ÷ 1 = 7.00 / kg',note:'Independent editorial calculation with fictional products and USD amounts. Not real store prices, a live scan, an actual app screenshot, a recommendation for every purchase, or currency conversion.'},
    ja:{tag:'大容量が必ずしもお得とは限らない',title:'箱の大きさより、同じ量の価格を見る。',intro:'大きいパックがお得に見えても、1kgあたりでは逆転することがあります。',small:'小さいパック',large:'大容量パック',unit:'1kgあたり',win:'単価が低い',difference:'1kgにつき $1.00 安い',formula:'2.40 ÷ 0.4 = 6.00 / kg   ·   7.00 ÷ 1 = 7.00 / kg',note:'架空の商品・米ドル金額によるLP独自の計算例。実店舗の価格、リアルタイムの比較、アプリ実画面、すべての購入での推奨、通貨換算ではありません。'}
  };
  const labels={
    en:{language:'Language',country:'App Store country',all:'All apps',eyebrow:'SHOPPING / UNIT COST',hero:'Is the bigger pack really cheaper?',description:'Put different package sizes on the same basis. A quick unit-price check can reveal a better deal hidden behind a smaller box.',store:'View on App Store',catalog:'Explore all apps',price:'Current price and availability are shown on the App Store.',section:'01 / THE COMPARISON',sectionTitle:'Equal units. Clearer choices.',sectionLead:'These are invented example numbers, not prices captured from a shop.',features:'02 / HOW IT HELPS',featuresTitle:'Know what the shelf label does not tell you.',f1:'Enter each pack',f1b:'Use price and contents to compare different package sizes.',f2:'Compare per unit',f2b:'See options on an equal quantity basis instead of only the total price.',f3:'Choose deliberately',f3b:'Use the calculation as one factor in your shopping decision.',limit:'03 / IMPORTANT CONTEXT',limitTitle:'A tool for comparing, not for promising savings.',limitBody:'Actual availability, suitability, use-by dates, and needs still matter. The example is illustrative and does not track retailer prices, perform purchases, or convert currencies.',fallback:'This independent LP uses Japanese and English editorial text. Other locale selections fall back to English; official descriptions are on the App Store.',ctaTitle:'Before buying more, compare what you pay per unit.',ctaBody:'See real app screenshots and the latest product information on the App Store.',footer:'Tsukigashizumu Studio · Independent editorial page'},
    ja:{language:'言語',country:'App Storeの国',all:'アプリ一覧',eyebrow:'買い物 / 単位価格',hero:'大きいパックは、本当に安い？',description:'容量が違う商品も同じ単位で比べる。合計金額だけでは気づかない差を、単価で確認します。',store:'App Storeで見る',catalog:'アプリ一覧を見る',price:'価格と提供状況はApp Storeの最新表示をご確認ください。',section:'01 / 単価の比較',sectionTitle:'同じ単位で、納得して選ぶ。',sectionLead:'実際の店舗価格ではなく、説明のために用意した架空の数値です。',features:'02 / 何が変わるか',featuresTitle:'値札だけでは見えないこと。',f1:'価格と容量を入力',f1b:'容量の異なるパックを、価格と内容量で比べられます。',f2:'単位を揃える',f2b:'合計金額だけでなく、同じ量あたりの単価を確認します。',f3:'自分で選ぶ',f3b:'計算結果を、購入の判断材料のひとつにできます。',limit:'03 / 注意事項',limitTitle:'計算は手助け。節約を保証しません。',limitBody:'在庫、鮮度、必要量、商品の適合性も重要です。この図は説明用で、店舗価格の追跡・購入手続き・為替換算は行いません。',fallback:'LP独自の説明は日英で表示し、その他のロケールでは英語になります。正式な翻訳はApp Storeをご確認ください。',ctaTitle:'量より、単価を確かめよう。',ctaBody:'実際のアプリ画面や最新情報はApp Storeでご確認ください。',footer:'Tsukigashizumu Studio · LP独自の紹介ページ'}
  };
  let mapping={'en-US':'us','ja':'jp'},manualStore=false;
  const languageSelect=()=>document.getElementById('p199-language');
  const countrySelect=()=>document.getElementById('p199-country');
  const chosenLang=()=>/^ja(?:-|$)/i.test(languageSelect()?.value||document.documentElement.lang||'en')?'ja':'en';
  const isStandalone=()=>document.body?.classList.contains('ps41-page');
  function translate(){
    const l=chosenLang();
    const diagram=document.getElementById(ROOT_ID);
    if(diagram){diagram.lang=l;diagram.querySelectorAll('[data-ps41-term]').forEach(el=>{const k=el.dataset.ps41Term;if(Object.hasOwn(terms[l],k))el.textContent=terms[l][k];});}
    if(isStandalone()){
      document.documentElement.lang=l;document.documentElement.dir='ltr';
      document.querySelectorAll('[data-ps41-label]').forEach(el=>{const k=el.dataset.ps41Label;if(Object.hasOwn(labels[l],k))el.textContent=labels[l][k];});
    }
  }
  function diagram(){
    if(document.getElementById(ROOT_ID))return;
    const section=document.getElementById('overview')||document.querySelector('main');
    if(!section)return;
    const el=document.createElement('section');el.id=ROOT_ID;el.dataset.tszSource='fictional-pack-size-unit-price';
    el.setAttribute('aria-label','Illustrative unit-price comparison: smaller pack costs six dollars per kilogram; bulk pack seven dollars per kilogram');
    el.innerHTML=`<p class="ps41-kicker" data-ps41-term="tag"></p><h3 data-ps41-term="title"></h3><p class="ps41-lead" data-ps41-term="intro"></p><div class="ps41-options"><article class="ps41-option ps41-best"><span class="ps41-option-name" data-ps41-term="small"></span><strong class="ps41-weight">400g</strong><div class="ps41-total">$2.40</div><div class="ps41-sep"></div><span class="ps41-per" data-ps41-term="unit"></span><strong class="ps41-unit-cost">$6.00<small>/kg</small></strong><span class="ps41-best-tag" data-ps41-term="win"></span></article><article class="ps41-option"><span class="ps41-option-name" data-ps41-term="large"></span><strong class="ps41-weight">1kg</strong><div class="ps41-total">$7.00</div><div class="ps41-sep"></div><span class="ps41-per" data-ps41-term="unit"></span><strong class="ps41-unit-cost">$7.00<small>/kg</small></strong><span class="ps41-placeholder" aria-hidden="true">&nbsp;</span></article></div><div class="ps41-summary"><span class="ps41-difference" data-ps41-term="difference"></span><code data-ps41-term="formula"></code></div><p class="ps41-disclaimer" data-ps41-term="note"></p>`;
    if(section.id==='overview')section.append(el);else section.insertBefore(el,section.firstElementChild);
    translate();
  }
  function updateStore(){
    const code=countrySelect()?.value||'us';if(!/^[a-z]{2}$/.test(code))return;
    document.querySelectorAll('[data-ps41-store]').forEach(a=>{a.href=`https://apps.apple.com/${code}/app/id${ID}`;});
  }
  async function loadLocaleOptions(){
    if(!isStandalone())return;
    try{
      const response=await fetch('../../data/locale-storefronts.json',{cache:'no-store'});if(!response.ok)return;
      const data=await response.json();const list=data?.storefrontByLocale;
      if(data?.developerId!==1817908735||!list||Object.keys(list).length!==50||!Object.values(list).every(x=>/^[a-z]{2}$/.test(x)))return;
      mapping=list;
      const select=languageSelect(),country=countrySelect();if(!select||!country)return;
      const old=select.value;
      const sorted=Object.keys(list).sort((a,b)=>a.localeCompare(b));
      sorted.sort((a,b)=>(a==='en-US'?-2:a==='ja'?-1:0)-(b==='en-US'?-2:b==='ja'?-1:0));
      select.replaceChildren();for(const code of sorted){const opt=document.createElement('option');opt.value=code;opt.textContent=code;select.add(opt);}
      const preferred=(navigator.languages||[navigator.language]).filter(Boolean).map(v=>sorted.find(x=>x.toLowerCase()===v.toLowerCase())||sorted.find(x=>x.split('-')[0]===v.split('-')[0])).find(Boolean);
      select.value=Object.hasOwn(list,old)&&old!=='en-US'?old:preferred||'en-US';
      const prior=country.value;country.replaceChildren();for(const code of [...new Set(['us','jp',...Object.values(list)])].sort()){const opt=document.createElement('option');opt.value=code;opt.textContent=code.toUpperCase();country.add(opt);}
      country.value=manualStore?prior:list[select.value]||'us';if(!country.value)country.value='us';
      translate();updateStore();
    }catch(_){/* Standalone keeps US/JP and en/ja when locale map is missing. */}
  }
  function init(){
    const id=document.body?.getAttribute('data-p199-id');if(id&&id!==ID)return;
    diagram();const a=languageSelect(),b=countrySelect();
    if(a)a.addEventListener('change',()=>{if(b&&!manualStore&&mapping[a.value]&&Array.from(b.options).some(o=>o.value===mapping[a.value]))b.value=mapping[a.value];translate();updateStore();});
    if(b)b.addEventListener('change',()=>{manualStore=true;updateStore();});
    translate();updateStore();void loadLocaleOptions();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
