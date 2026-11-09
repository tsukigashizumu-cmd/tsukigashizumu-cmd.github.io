/* TSZ_DISCOUNT_STACK_R48_STACKED_DISCOUNT_TRUTH: fictional editorial math, not a receipt or app screenshot. */
(()=>{
 'use strict';
 const APP='6802308517', DIAGRAM='tsz-discount-stack-r48';
 const pinned=document.body?.getAttribute('data-p199-id');
 const pathID=location.pathname.match(/\/apps\/(\d+)(?:\/|$)/)?.[1];
 if((pinned&&pinned!==APP)||(pathID&&pathID!==APP)||(!pinned&&!pathID))return;
 const original=100,afterFirst=original*(1-30/100),afterSecond=afterFirst*(1-20/100),taxed=afterSecond*1.10;
 if(Math.abs(afterFirst-70)>1e-9||Math.abs(afterSecond-56)>1e-9||Math.abs(taxed-61.6)>1e-9)return;
 const sample=['$100.00','$70.00','$56.00','$61.60'];
 const texts={
  en:{tag:'A SIMPLE EXAMPLE · 30% THEN 20% THEN 10% TAX',title:'Two discounts. Not their sum.',lead:'The second discount is applied to what remains after the first. Tax is then applied in this fictional checkout example.',n1:'01 / ORIGINAL',n2:'02 / FIRST',n3:'03 / SECOND',n4:'04 / TAX',s1:'BEFORE DISCOUNTS',s2:'30% OFF',s3:'ANOTHER 20% OFF',s4:'+10% TAX',p1:'Starting price',p2:'$100 × 0.70',p3:'$70 × 0.80',p4:'$56 × 1.10',truth:'ACTUAL DISCOUNT BEFORE TAX',truthDetail:'30% followed by 20% means 44% off the original, not 50%.',badge:'44% ≠ 50%',note:'Illustrative numbers only. The order of discounts and tax treatment depends on each store. This is not a live offer, a purchase receipt, an app screenshot or an exchange-rate conversion.'},
  ja:{tag:'説明用の計算例 · 30% → 20% → 税率10%',title:'割引は、足し算ではない。',lead:'2回目の割引は、1回目の割引後の価格に適用。最後に税率10%を加える架空の例です。',n1:'01 / 元価格',n2:'02 / 1回目',n3:'03 / 2回目',n4:'04 / 税金',s1:'割引前',s2:'30%引き',s3:'さらに20%引き',s4:'税率10%を加算',p1:'もとの価格',p2:'$100 × 0.70',p3:'$70 × 0.80',p4:'$56 × 1.10',truth:'税引前の実際の割引率',truthDetail:'30%のあとに20%引くと、合計50%ではなく実質44%引きです。',badge:'44% ≠ 50%',note:'架空の計算例です。割引や税率を適用する順序は店舗により異なります。実際の購入価格・レシート・アプリ実画面・為替換算を示すものではありません。'}
 };
 const labels={
  en:{language:'Language',country:'App Store country',all:'All apps',eyebrow:'SHOPPING / STACKED DISCOUNTS',hero:'30% off, then 20% off. Not 50% off.',description:'Find out what two successive percentage discounts really leave you to pay. Add optional tax and keep named calculations to reuse later.',store:'View on App Store',catalog:'Explore all apps',price:'Current price and availability are shown on the App Store.',section:'01 / THE DISCOUNT DIFFERENCE',sectionTitle:'The second discount applies to what remains.',sectionLead:'A fictional $100 example makes the arithmetic easy to check.',features:'02 / USEFUL BEYOND A SINGLE CALCULATION',featuresTitle:'Calculate, save and compare again.',f1:'Two successive discounts',f1b:'Apply each percentage to the price remaining after the previous discount.',f2:'Optional tax',f2b:'Add a specified tax rate after discounts to see an estimated checkout price.',f3:'Saved calculations',f3b:'Save a calculation by name, search your history and change its inputs later.',limit:'03 / IMPORTANT CONTEXT',limitTitle:'An illustration, not a store receipt.',limitBody:'Retailers may apply coupons and taxes differently. The example is fictional; it is not an actual purchase, an app screenshot or a promise of savings. Changing currency displays a different currency symbol, not an exchange-rate conversion.',fallback:'This editorial LP has English and Japanese copy. Other selected locales use English LP text. See the App Store for official localized details.',ctaTitle:'See the real amount left to pay.',ctaBody:'See actual app screens and current details on the App Store.',footer:'Tsukigashizumu Studio · Independent editorial page'},
  ja:{language:'言語',country:'App Storeの国',all:'アプリ一覧',eyebrow:'ショッピング / 重ね割引',hero:'30%引きのあと20%引き。それは50%引きではない。',description:'2回の割引を順番に適用し、必要なら税金も加算して支払見込み額を計算。条件に名前を付けて保存し、再利用できます。',store:'App Storeで見る',catalog:'アプリ一覧',price:'最新の価格・提供状況はApp Storeで確認してください。',section:'01 / 連続割引の本当の結果',sectionTitle:'2回目の割引は、残った金額に適用。',sectionLead:'元価格$100の架空の例で、計算の違いを確認します。',features:'02 / 1回限りの計算で終わらない',featuresTitle:'計算、保存、再利用。',f1:'2回の割合割引',f1b:'直前の割引後の残額に次の割引率を適用します。',f2:'必要なら税を追加',f2b:'設定した税率を割引後に加え、支払見込み額を確認します。',f3:'計算を名前付きで保存',f3b:'履歴を検索し、以前の条件を開いて再計算できます。',limit:'03 / 大切な注意',limitTitle:'説明図は実際のレシートではありません。',limitBody:'割引や税率の適用順序は店舗によって異なります。架空の例であり、実際の決済、アプリ画面、節約額の保証を示しません。通貨変更は記号の切替であり為替換算ではありません。',fallback:'このLPの独自紹介文は日英のみ。他のロケールでは英語を表示します。公式説明はApp Storeで確認してください。',ctaTitle:'支払い前に、本当の割引後価格を。',ctaBody:'アプリの実画面や最新情報はApp Storeで確認してください。',footer:'Tsukigashizumu Studio · LP独自の紹介ページ'}
 };
 let locales={'en-US':'us','ja':'jp'},manualCountry=false;
 const langEl=()=>document.getElementById('p199-language');
 const countryEl=()=>document.getElementById('p199-country');
 const standalone=()=>document.body?.classList.contains('ds48-page');
 const language=()=>/^ja(?:-|$)/i.test(langEl()?.value||document.documentElement.lang||'en')?'ja':'en';
 function translate(){const l=language(),section=document.getElementById(DIAGRAM);
  if(section){section.lang=l;section.querySelectorAll('[data-ds48-term]').forEach(el=>{const k=el.dataset.ds48Term;if(Object.prototype.hasOwnProperty.call(texts[l],k))el.textContent=texts[l][k];});}
  if(standalone()){document.documentElement.lang=l;document.documentElement.dir='ltr';document.querySelectorAll('[data-ds48-label]').forEach(el=>{const k=el.dataset.ds48Label;if(Object.prototype.hasOwnProperty.call(labels[l],k))el.textContent=labels[l][k];});}
 }
 function insert(){if(document.getElementById(DIAGRAM))return;
  const anchor=document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
  const s=document.createElement('section');s.id=DIAGRAM;s.dataset.tszSource='fictional-stacked-discount-calculation';
  s.setAttribute('aria-label','Illustrative $100 checkout: 30% off leaves $70; another 20% leaves $56; 10% illustrative tax leaves $61.60. Effective pre-tax discount is 44%, not 50%.');
  s.innerHTML=`<p class="ds48-eyebrow" data-ds48-term="tag"></p><h3 data-ds48-term="title"></h3><p class="ds48-description" data-ds48-term="lead"></p><div class="ds48-steps">${sample.map((v,i)=>`<article class="ds48-step"><span class="ds48-number" data-ds48-term="n${i+1}"></span><small data-ds48-term="s${i+1}"></small><strong>${v}</strong><p data-ds48-term="p${i+1}"></p></article>`).join('')}</div><div class="ds48-truth"><div><strong data-ds48-term="truth"></strong><p data-ds48-term="truthDetail"></p></div><span class="ds48-truth-badge" data-ds48-term="badge"></span></div><p class="ds48-note" data-ds48-term="note"></p>`;
  if(anchor.id==='overview')anchor.append(s);else anchor.insertBefore(s,anchor.firstElementChild);
  translate();
 }
 function updateStore(){const region=countryEl()?.value||'us';if(!/^[a-z]{2}$/.test(region))return;document.querySelectorAll('[data-ds48-store]').forEach(el=>{el.href=`https://apps.apple.com/${region}/app/id${APP}`;});}
 async function loadLocales(){if(!standalone())return;try{
  const response=await fetch('../../data/locale-storefronts.json',{cache:'no-store'});if(!response.ok)return;
  const data=await response.json(),map=data?.storefrontByLocale;
  if(data?.developerId!==1817908735||!map||Object.keys(map).length!==50||!Object.values(map).every(v=>/^[a-z]{2}$/.test(v)))return;
  locales=map;const l=langEl(),c=countryEl();if(!l||!c)return;
  const keys=Object.keys(map).sort((a,b)=>a.localeCompare(b));keys.sort((a,b)=>(a==='en-US'?-2:a==='ja'?-1:0)-(b==='en-US'?-2:b==='ja'?-1:0));
  l.replaceChildren();for(const k of keys){const o=document.createElement('option');o.value=k;o.textContent=k;l.add(o);}
  const preferred=(navigator.languages||[navigator.language]).filter(Boolean).map(v=>keys.find(k=>k.toLowerCase()===v.toLowerCase())||keys.find(k=>k.split('-')[0]===v.split('-')[0])).find(Boolean);
  l.value=preferred||'en-US';const previous=c.value;c.replaceChildren();for(const k of [...new Set(['us','jp',...Object.values(map)])].sort()){const o=document.createElement('option');o.value=k;o.textContent=k.toUpperCase();c.add(o);}
  c.value=manualCountry?previous:map[l.value]||'us';if(!c.value)c.value='us';translate();updateStore();
 }catch(_){/* Keep English/Japanese fallback. */}}
 function init(){insert();const l=langEl(),c=countryEl();if(l)l.addEventListener('change',()=>{if(c&&!manualCountry&&locales[l.value]&&Array.from(c.options).some(o=>o.value===locales[l.value]))c.value=locales[l.value];translate();updateStore();});if(c)c.addEventListener('change',()=>{manualCountry=true;updateStore();});translate();updateStore();void loadLocales();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
