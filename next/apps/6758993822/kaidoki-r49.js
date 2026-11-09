/* TSZ_KAIDOKI_R49_RECORDED_PRICE_MEDIAN: fictional stored-price illustration, not live prices or app screenshot. */
(()=>{
 'use strict';
 const APP='6758993822',DIAGRAM='tsz-kaidoki-r49';
 const pinned=document.body?.getAttribute('data-p199-id');
 const pathID=location.pathname.match(/\/apps\/(\d+)(?:\/|$)/)?.[1];
 if((pinned&&pinned!==APP)||(pathID&&pathID!==APP)||(!pinned&&!pathID))return;
 const prices=[398,450,425],sizeGram=500;
 const ordered=[...prices].sort((a,b)=>a-b),minimum=ordered[0],median=ordered[1];
 const diff=median-minimum;
 if(ordered.join(',')!=='398,425,450'||median!==425||diff!==27||Math.abs(minimum/sizeGram-.796)>1e-9)return;
 const sample=['¥398','¥450','¥425'];
 const texts={
  en:{tag:'A SIMPLE EXAMPLE · THREE RECORDED SHOP PRICES',title:'A reference price you can check.',lead:'The same fictional 500g product, recorded at three shops. The median of three records is ¥425; the lowest entry is ¥398.',n1:'01 / SHOP A',n2:'02 / SHOP B',n3:'03 / SHOP C',s1:'500g / SAME PRODUCT',s2:'500g / SAME PRODUCT',s3:'500g / SAME PRODUCT',p1:'¥0.796 per g · lowest entry',p2:'¥0.900 per g',p3:'¥0.850 per g',truth:'MEDIAN OF YOUR THREE RECORDS: ¥425',truthDetail:'The lowest recorded price, ¥398, is ¥27 below the median of these three entries.',badge:'¥27',note:'Illustrative user-entered records only. Not live store prices, a statistically representative market price, a guarantee of savings, a price forecast or an actual app screenshot.'},
  ja:{tag:'説明用の記録例 · 3店舗の価格',title:'自分が記録した価格で、比べる。',lead:'架空の同一商品500gの記録。3件の中央値は425円、最安値は398円です。',n1:'01 / 店舗A',n2:'02 / 店舗B',n3:'03 / 店舗C',s1:'同じ商品 / 500g',s2:'同じ商品 / 500g',s3:'同じ商品 / 500g',p1:'1gあたり0.796円 · 最安',p2:'1gあたり0.900円',p3:'1gあたり0.850円',truth:'記録した3件の中央値：425円',truthDetail:'最安値398円は、3件の中央値425円より27円安い。',badge:'−¥27',note:'架空の手入力記録です。店舗のリアルタイム価格・市場全体の相場・節約保証・価格予測・アプリ実画面を示すものではありません。'}
 };
 const labels={
  en:{language:'Language',country:'App Store country',all:'All apps',eyebrow:'SHOPPING / RECORDED PRICES',name:'Kaidoki Log / カイドキ帳',hero:'Is it really the better buy?',description:'Record prices and quantities by product and shop. Review unit prices and your recorded average, median and range before buying.',store:'View on App Store',catalog:'Explore all apps',price:'Current price and availability are shown on the App Store.',section:'01 / A SMALL DIFFERENCE YOU CAN SEE',sectionTitle:'Compare your shop records, not just the sticker.',sectionLead:'Three fictional shop prices for the same 500g product show how the median provides a reference.',features:'02 / KEEP YOUR SHOPPING REFERENCES',featuresTitle:'Use the records you already made.',f1:'Unit-price comparison',f1b:'Compare amounts across weights, volumes or item counts instead of judging only the package price.',f2:'Price range at a glance',f2b:'Review the minimum, maximum, average and median of prices you have recorded.',f3:'Shopping notes and history',f3b:'Save products and stores, then revisit their entries when you shop again.',limit:'03 / IMPORTANT CONTEXT',limitTitle:'A record, not a live market quote.',limitBody:'All amounts on this page are fictional examples for an identical 500g product. They are not live store prices, a market survey, a price forecast, an official app screenshot or a promised saving. Median is calculated from only three sample entries, not a real market-wide benchmark.',fallback:'This editorial LP has English and Japanese copy. Other selected locales use English LP text. Refer to the App Store for official localized details.',ctaTitle:'Keep your own prices close at hand.',ctaBody:'See actual app screens and current details on the App Store.',footer:'Tsukigashizumu Studio · Independent editorial page'},
  ja:{language:'言語',country:'App Storeの国',all:'アプリ一覧',eyebrow:'買い物 / 記録した価格',name:'カイドキ帳',hero:'「安い気がする」を「比べてわかる」に。',description:'価格と数量を商品・店舗ごとに記録。単価、平均、中央値、最小・最大を見ながら、自分の買いどきを整理できます。',store:'App Storeで見る',catalog:'アプリ一覧',price:'最新の価格・提供状況はApp Storeで確認してください。',section:'01 / 記録があると差が見える',sectionTitle:'値札だけでなく、自分の記録で比較。',sectionLead:'同じ500gの商品について、架空の3店舗の記録を並べます。',features:'02 / 買い物の記録を役立てる',featuresTitle:'記録した情報を、次の買い物に。',f1:'単価で比較',f1b:'重量・容量・個数をそろえ、パッケージの値段だけで判断しない。',f2:'価格の分布を確認',f2b:'自分が記録した価格の最小・最大・平均・中央値を見返せます。',f3:'買い物メモと履歴',f3b:'よく買う商品や店舗を記録し、次の買い物で入力を再利用できます。',limit:'03 / 大切な注意',limitTitle:'記録例であり、実際の店頭価格ではありません。',limitBody:'同一商品500gの価格はすべて架空の例です。店舗のリアルタイム価格・市場調査・価格予測・アプリ実画面・節約保証ではありません。中央値も架空の3件に限った計算で、市場全体の相場を表しません。',fallback:'このLP独自の紹介文は日英のみ。その他のロケールは英語で表示します。正式な説明はApp Storeで確認してください。',ctaTitle:'自分の記録から、納得して買う。',ctaBody:'実際のアプリ画面や最新情報はApp Storeでご確認ください。',footer:'Tsukigashizumu Studio · LP独自の紹介ページ'}
 };
 let locales={'en-US':'us','ja':'jp'},manualCountry=false;
 const langEl=()=>document.getElementById('p199-language');
 const countryEl=()=>document.getElementById('p199-country');
 const standalone=()=>document.body?.classList.contains('kd49-page');
 const language=()=>/^ja(?:-|$)/i.test(langEl()?.value||document.documentElement.lang||'en')?'ja':'en';
 function translate(){const l=language(),section=document.getElementById(DIAGRAM);
  if(section){section.lang=l;section.querySelectorAll('[data-kd49-term]').forEach(el=>{const k=el.dataset.kd49Term;if(Object.prototype.hasOwnProperty.call(texts[l],k))el.textContent=texts[l][k];});}
  if(standalone()){document.documentElement.lang=l;document.documentElement.dir='ltr';document.querySelectorAll('[data-kd49-label]').forEach(el=>{const k=el.dataset.kd49Label;if(Object.prototype.hasOwnProperty.call(labels[l],k))el.textContent=labels[l][k];});}
 }
 function insert(){if(document.getElementById(DIAGRAM))return;
  const anchor=document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
  const s=document.createElement('section');s.id=DIAGRAM;s.dataset.tszSource='fictional-recorded-price-median';
  s.setAttribute('aria-label','Illustrative three user-entered prices for one 500g product: ¥398, ¥450, ¥425. Median ¥425, minimum ¥398, difference ¥27. No live prices.');
  s.innerHTML=`<p class="kd49-eyebrow" data-kd49-term="tag"></p><h3 data-kd49-term="title"></h3><p class="kd49-description" data-kd49-term="lead"></p><div class="kd49-steps">${sample.map((v,i)=>`<article class="kd49-step"><span class="kd49-number" data-kd49-term="n${i+1}"></span><small data-kd49-term="s${i+1}"></small><strong>${v}</strong><p data-kd49-term="p${i+1}"></p></article>`).join('')}</div><div class="kd49-truth"><div><strong data-kd49-term="truth"></strong><p data-kd49-term="truthDetail"></p></div><span class="kd49-truth-badge" data-kd49-term="badge"></span></div><p class="kd49-note" data-kd49-term="note"></p>`;
  if(anchor.id==='overview')anchor.append(s);else anchor.insertBefore(s,anchor.firstElementChild);
  translate();
 }
 function updateStore(){const region=countryEl()?.value||'jp';if(!/^[a-z]{2}$/.test(region))return;document.querySelectorAll('[data-kd49-store]').forEach(el=>{el.href=`https://apps.apple.com/${region}/app/id${APP}`;});}
 async function loadLocales(){if(!standalone())return;try{
  const response=await fetch('../../data/locale-storefronts.json',{cache:'no-store'});if(!response.ok)return;
  const data=await response.json(),map=data?.storefrontByLocale;
  if(data?.developerId!==1817908735||!map||Object.keys(map).length!==50||!Object.values(map).every(v=>/^[a-z]{2}$/.test(v)))return;
  locales=map;const l=langEl(),c=countryEl();if(!l||!c)return;
  const keys=Object.keys(map).sort((a,b)=>a.localeCompare(b));keys.sort((a,b)=>(a==='en-US'?-2:a==='ja'?-1:0)-(b==='en-US'?-2:b==='ja'?-1:0));
  l.replaceChildren();for(const k of keys){const o=document.createElement('option');o.value=k;o.textContent=k;l.add(o);}
  const preferred=(navigator.languages||[navigator.language]).filter(Boolean).map(v=>keys.find(k=>k.toLowerCase()===v.toLowerCase())||keys.find(k=>k.split('-')[0]===v.split('-')[0])).find(Boolean);
  l.value=preferred||'ja';const previous=c.value;c.replaceChildren();for(const k of [...new Set(['jp','us',...Object.values(map)])].sort()){const o=document.createElement('option');o.value=k;o.textContent=k.toUpperCase();c.add(o);}
  c.value=manualCountry?previous:map[l.value]||'jp';if(!c.value)c.value='jp';translate();updateStore();
 }catch(_){/* Keep English/Japanese fallback. */}}
 function init(){insert();const l=langEl(),c=countryEl();if(l)l.addEventListener('change',()=>{if(c&&!manualCountry&&locales[l.value]&&Array.from(c.options).some(o=>o.value===locales[l.value]))c.value=locales[l.value];translate();updateStore();});if(c)c.addEventListener('change',()=>{manualCountry=true;updateStore();});translate();updateStore();void loadLocales();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
