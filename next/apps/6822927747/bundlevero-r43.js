/* TSZ_BUNDLEVERO_R43_OWNED_BUNDLE_DECISION — editorial illustration, no live prices or guaranteed optimization. */
(()=>{
 'use strict';
 const APP='6822927747', DIAGRAM='tsz-bundlevero-r43';
 const pinned=document.body?.getAttribute('data-p199-id');
 const pathID=location.pathname.match(/\/apps\/(\d+)(?:\/|$)/)?.[1];
 if((pinned&&pinned!==APP)||(pathID&&pathID!==APP)||(!pinned&&!pathID))return;
 const texts={
  en:{tag:'THE PRICE OF BUYING TWICE',title:'You already own A. Do you still need the bundle?',lead:'A looks familiar because you already bought it. Compare the cost of buying only what is missing with buying the bundle again.',owned:'ALREADY OWNED',own:'A',missing:'STILL WANTED',b:'B',c:'C',single:'BUY ONLY WHAT IS MISSING',s1:'B',s2:'C',bundle:'BUY THE FULL BUNDLE',bundleItems:'A + B + C',total:'TOTAL TO PAY',choice:'LOWER COST IN THIS EXAMPLE',delta:'Save $5',note:'Fictional prices, editorial illustration only. Singles: B $9 + C $11 = $20. Bundle A+B+C = $25. Existing ownership of A is treated as already paid. No live store price lookup, real bundle terms, guaranteed lowest price, or actual app screenshot is implied.'},
  ja:{tag:'持っている商品まで、もう一度買う？',title:'Aは購入済み。それでもセットを買う？',lead:'セットの中に所有済みのAがある。足りないBとCだけ買う場合と、セットを買う場合の支払額を比べます。',owned:'すでに持っている',own:'A',missing:'これから欲しい',b:'B',c:'C',single:'足りないものだけ購入',s1:'B',s2:'C',bundle:'セットを購入',bundleItems:'A + B + C',total:'これから支払う合計',choice:'この例で安い方',delta:'$5節約',note:'架空の価格を使ったLP独自の説明図。単品B $9＋C $11＝$20、セットA+B+C＝$25。所有済みAは支払い済みとして扱います。実際の販売価格、セット条件、最安保証、アプリの実画面を示すものではありません。'}
 };
 const labels={
  en:{language:'Language',country:'App Store country',all:'All apps',eyebrow:'SHOPPING / KNOW WHAT YOU OWN',hero:'Choose a buying plan you understand.',description:'Before purchasing another bundle, compare the items you already own, the ones you want and the conditions of each offer.',store:'View on App Store',catalog:'Explore all apps',price:'Check the App Store for current price and availability.',section:'01 / BUY WITH CONTEXT',sectionTitle:'Count the items you need—not just the bundle discount.',sectionLead:'This example is a conceptual price comparison. It is not an actual in-app screenshot or store quote.',features:'02 / HOW BUNDLEVERO HELPS',featuresTitle:'Make the conditions visible.',f1:'Mark owned and wanted items',f1b:'Record which products you already have and what is still missing.',f2:'Enter prices and bundle rules',f2b:'Compare individual prices, fixed-price bundles, complete-the-set discounts and must-buy-together offers.',f3:'Review the reasoning',f3b:'Results use your own entries. The app may indicate when the cheapest plan could not be proven.',limit:'03 / WHAT THIS DOES NOT CLAIM',limitTitle:'Not a live price checker.',limitBody:'Bundlevero does not retrieve live store prices. Entered details and recognized text should be checked against the source. Complex combinations may hit search limits; an absolute cheapest plan is not guaranteed.',fallback:'This LP-specific editorial text is available in English and Japanese; other language choices use English. Check the App Store for official localized descriptions.',ctaTitle:'Know what you need before you buy.',ctaBody:'See the real screenshots and the latest app details on the App Store.',footer:'Tsukigashizumu Studio · Independent editorial page'},
  ja:{language:'言語',country:'App Storeの国',all:'アプリ一覧',eyebrow:'買い物 / 所有済みの商品を考慮',hero:'納得できる買い方を選ぶ。',description:'またセットを買う前に、すでに持っている商品、欲しい商品、価格とセット条件を比較できます。',store:'App Storeで見る',catalog:'アプリ一覧',price:'最新の価格・提供状況はApp Storeで確認してください。',section:'01 / 所有を考慮して買う',sectionTitle:'割引率だけでなく、本当に必要な商品を見る。',sectionLead:'ここはLP独自の説明図です。実際のアプリ画面やストアの価格表示ではありません。',features:'02 / BUNDLEVEROでできること',featuresTitle:'比較条件を見えるように。',f1:'所有済み・購入したい商品を記録',f1b:'すでに持っている商品と、これから買いたい商品を分けます。',f2:'単品価格とセット条件を入力',f2b:'固定価格のセット、セット完成割引、まとめ買い条件などを比較できます。',f3:'判断の根拠を確認',f3b:'入力値をもとに計算し、複雑な条件で最安の証明ができない場合はその違いも示します。',limit:'03 / 比較の前提',limitTitle:'リアルタイム価格検索ではありません。',limitBody:'Bundleveroは最新のネット価格を自動取得しません。入力値・文字認識の結果は元情報で確認してください。複雑な条件では探索上限があり、絶対的な最安は保証されません。',fallback:'LP独自の紹介文は日本語・英語で表示。他の言語選択では英語にフォールバックします。App Storeの公式説明も確認してください。',ctaTitle:'購入ボタンを押す前に、一度確認。',ctaBody:'実際のアプリ画面や最新の説明はApp Storeで確認できます。',footer:'Tsukigashizumu Studio · LP独自の紹介ページ'}
 };
 let locales={'en-US':'us','ja':'jp'}, manualCountry=false;
 const languageEl=()=>document.getElementById('p199-language');
 const countryEl=()=>document.getElementById('p199-country');
 const standalone=()=>document.body?.classList.contains('bv43-page');
 const language=()=>/^ja(?:-|$)/i.test(languageEl()?.value||document.documentElement.lang||'en')?'ja':'en';
 function translate(){
  const lang=language(), r=document.getElementById(DIAGRAM);
  if(r){r.lang=lang;r.querySelectorAll('[data-bv43-term]').forEach(el=>{const key=el.dataset.bv43Term; if(Object.hasOwn(texts[lang],key))el.textContent=texts[lang][key];});}
  if(standalone()){document.documentElement.lang=lang;document.documentElement.dir='ltr';document.querySelectorAll('[data-bv43-label]').forEach(el=>{const key=el.dataset.bv43Label;if(Object.hasOwn(labels[lang],key))el.textContent=labels[lang][key];});}
 }
 function insert(){
  if(document.getElementById(DIAGRAM))return;
  const anchor=document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
  const section=document.createElement('section');section.id=DIAGRAM;
  section.dataset.tszSource='fictional-owned-item-bundle-comparison';
  section.setAttribute('aria-label','Illustrative comparison: already own A, want B and C. Singles $9 plus $11 equal $20; bundle A B C $25. Singles cost $5 less. Not a real offer.');
  section.innerHTML=`<div class="bv43-figure-head"><p class="bv43-kicker" data-bv43-term="tag"></p><h3 data-bv43-term="title"></h3><p class="bv43-intro" data-bv43-term="lead"></p></div><div class="bv43-items"><div class="bv43-item bv43-item-owned"><span data-bv43-term="owned"></span><strong data-bv43-term="own"></strong><small>✓</small></div><div class="bv43-item"><span data-bv43-term="missing"></span><strong data-bv43-term="b"></strong><small>$9</small></div><div class="bv43-item"><span data-bv43-term="missing"></span><strong data-bv43-term="c"></strong><small>$11</small></div></div><div class="bv43-compare"><div class="bv43-plan bv43-plan-win"><p data-bv43-term="single"></p><div class="bv43-formula"><span data-bv43-term="s1"></span><b>$9</b><em>+</em><span data-bv43-term="s2"></span><b>$11</b></div><small data-bv43-term="total"></small><strong class="bv43-sum">$20</strong></div><div class="bv43-plan"><p data-bv43-term="bundle"></p><div class="bv43-formula"><span data-bv43-term="bundleItems"></span></div><small data-bv43-term="total"></small><strong class="bv43-sum">$25</strong></div></div><div class="bv43-result"><span data-bv43-term="choice"></span><strong data-bv43-term="delta"></strong></div><p class="bv43-disclaimer" data-bv43-term="note"></p>`;
  if(anchor.id==='overview')anchor.append(section); else anchor.insertBefore(section,anchor.firstElementChild);
  translate();
 }
 function updateStore(){const region=countryEl()?.value||'us';if(!/^[a-z]{2}$/.test(region))return;document.querySelectorAll('[data-bv43-store]').forEach(el=>el.href=`https://apps.apple.com/${region}/app/id${APP}`);}
 async function loadLocales(){
  if(!standalone())return;
  try{
   const response=await fetch('../../data/locale-storefronts.json',{cache:'no-store'});if(!response.ok)return;
   const data=await response.json(), map=data?.storefrontByLocale;
   if(data?.developerId!==1817908735||!map||Object.keys(map).length!==50||!Object.values(map).every(v=>/^[a-z]{2}$/.test(v)))return;
   locales=map;const lang=languageEl(), region=countryEl();if(!lang||!region)return;
   const keys=Object.keys(map).sort((a,b)=>a.localeCompare(b));keys.sort((a,b)=>(a==='en-US'?-2:a==='ja'?-1:0)-(b==='en-US'?-2:b==='ja'?-1:0));
   lang.replaceChildren();for(const k of keys){const o=document.createElement('option');o.value=k;o.textContent=k;lang.add(o);}
   const preferred=(navigator.languages||[navigator.language]).filter(Boolean).map(v=>keys.find(k=>k.toLowerCase()===v.toLowerCase())||keys.find(k=>k.split('-')[0]===v.split('-')[0])).find(Boolean);
   lang.value=preferred||'en-US';const previous=region.value;
   region.replaceChildren();for(const k of [...new Set(['us','jp',...Object.values(map)])].sort()){const o=document.createElement('option');o.value=k;o.textContent=k.toUpperCase();region.add(o);}
   region.value=manualCountry?previous:map[lang.value]||'us';if(!region.value)region.value='us';translate();updateStore();
  }catch(_){/* Fallback to two default locales. */}
 }
 function init(){insert();const l=languageEl(),c=countryEl();if(l)l.addEventListener('change',()=>{if(c&&!manualCountry&&locales[l.value]&&Array.from(c.options).some(o=>o.value===locales[l.value]))c.value=locales[l.value];translate();updateStore();});if(c)c.addEventListener('change',()=>{manualCountry=true;updateStore();});translate();updateStore();void loadLocales();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
