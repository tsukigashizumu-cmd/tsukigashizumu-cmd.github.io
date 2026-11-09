/* TSZ_NOKUNERA_R35_MINIMUM_STOCK: editorial illustration, NOT live inventory or an app screenshot. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6826459096') return;
  const id = 'tsz-nokunera-r35';
  const copy = {
    en: {
      kicker:'HOUSEHOLD INVENTORY / WORKED EXAMPLE',
      heading:'One item. One thing to remember.',
      lede:'Start with tissues. Record what remains and the minimum you want to keep.',
      product:'Tissues', remaining:'Recorded remaining', minimum:'Minimum reserve', shortage:'Below your minimum by',
      low:'Below minimum', unit:'boxes', need:'1 box',
      recorded:'CURRENT RECORD', target:'YOUR MINIMUM', result:'TO REPLENISH',
      takeaway:'You can see what needs attention before the next shopping trip.',
      note:'Illustrative user-entered record: 2 boxes remaining, minimum 3 boxes, shortfall 1 box. This is not a live inventory reading or an app screenshot. Nokunera does not automatically count items, identify products from photos, place orders or sync inventory to the cloud. Any consumption forecast relies on recorded usage.'
    },
    ja: {
      kicker:'家の在庫 / 説明用の記録',
      heading:'まずは、いつも切らす一品から。',
      lede:'ティッシュの残りと「最低いくつ置きたいか」を記録してみる。',
      product:'ティッシュ', remaining:'記録した残数', minimum:'最低在庫', shortage:'最低在庫まであと',
      low:'最低在庫を下回っています', unit:'箱', need:'1箱',
      recorded:'いまの記録', target:'自分で決めた下限', result:'補充の目安',
      takeaway:'次の買い物前に、補充したいものを見つけやすくなる。',
      note:'説明用に作成した入力例です。残り2箱、最低在庫3箱、不足1箱。実際の在庫の自動検出やアプリのスクリーンショットではありません。品目の自動認識・自動カウント・注文・クラウド同期は行いません。消費予測は記録した使用履歴をもとにした目安です。'
    }
  };
  function language() {
    const el = document.getElementById('p199-language');
    const value = String(el?.value || document.documentElement.lang || 'en-US');
    return /^ja(?:-|$)/i.test(value) ? 'ja' : 'en';
  }
  function update() {
    const root = document.getElementById(id);
    if (!root) return;
    const loc = language();
    root.lang = loc;
    const dict = copy[loc];
    root.querySelectorAll('[data-nn35]').forEach(el => {
      const key = el.getAttribute('data-nn35');
      if (Object.prototype.hasOwnProperty.call(dict, key)) el.textContent = dict[key];
    });
  }
  function install() {
    const overview = document.getElementById('overview');
    if (!overview || document.getElementById(id)) return;
    const root = document.createElement('section');
    root.id = id;
    root.dataset.tszSource = 'independent-editorial-example';
    root.setAttribute('aria-label', 'Illustrative household stock minimum review');
    root.innerHTML = `
      <p class="nn35-kicker" data-nn35="kicker"></p>
      <h3 data-nn35="heading"></h3>
      <p class="nn35-lede" data-nn35="lede"></p>
      <div class="nn35-board">
        <div class="nn35-product-row">
          <span class="nn35-icon" aria-hidden="true"><span class="nn35-tissue"></span></span>
          <div class="nn35-product-copy">
            <strong data-nn35="product"></strong>
            <small>01 / HOME</small>
          </div>
          <span class="nn35-status" data-nn35="low"></span>
        </div>
        <div class="nn35-stats">
          <div class="nn35-stat"><span data-nn35="recorded" class="nn35-stat-kicker"></span>
            <span class="nn35-number">02</span><span data-nn35="unit" class="nn35-unit"></span>
            <small data-nn35="remaining"></small>
          </div>
          <div class="nn35-divider" aria-hidden="true">/</div>
          <div class="nn35-stat"><span data-nn35="target" class="nn35-stat-kicker"></span>
            <span class="nn35-number">03</span><span data-nn35="unit" class="nn35-unit"></span>
            <small data-nn35="minimum"></small>
          </div>
        </div>
        <div class="nn35-gauge" role="img" aria-label="2 of 3 boxes recorded, one box below minimum">
          <span class="nn35-gauge-filled"></span><span class="nn35-gauge-filled"></span><span class="nn35-gauge-empty"></span>
        </div>
        <div class="nn35-result">
          <div><span class="nn35-stat-kicker" data-nn35="result"></span><strong data-nn35="shortage"></strong></div>
          <strong class="nn35-need" data-nn35="need"></strong>
        </div>
      </div>
      <p class="nn35-takeaway" data-nn35="takeaway"></p>
      <p class="nn35-note" data-nn35="note"></p>`;
    overview.append(root);
    update();
    const selection = document.getElementById('p199-language');
    if (selection) selection.addEventListener('change', update);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, {once:true});
  else install();
})();

/* NN35R1: page-only UI translation + 50-locale selector from existing locale-storefront map. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6826459096') return;
  const translations = {
    en: {
      skip:'Skip to example', languageLabel:'Language', storeLabel:'App Store region', allApps:'All apps',
      eyebrow:'APP STORIES / HOUSEHOLD INVENTORY', hero:"Know what's left before the next shopping trip.",
      intro:'Start with one item. Record how many are left, where they are kept, and the minimum amount you would like on hand.',
      storeButton:'View in App Store ↗', browseButton:'Browse apps', price:'See the App Store for the current price and availability.',
      exampleKicker:'01 / ILLUSTRATIVE EXAMPLE', exampleTitle:'Make your minimum visible.',
      exampleIntro:'A fictional record, not live inventory and not a screenshot from the app.',
      featureKicker:'02 / EVERYDAY INVENTORY',featuresTitle:'A small record that makes the next decision easier.',
      feature1Title:'Count and locate',feature1Body:'Enter remaining quantities and storage locations yourself, including multiple storage spots for one item.',
      feature2Title:'Set a minimum',feature2Body:'Compare your current recorded quantity with the minimum stock you choose.',
      feature3Title:'Check the trend',feature3Body:'Use your recorded history as the basis for an estimated consumption rate and a restocking reference.',
      contextKicker:'03 / IMPORTANT CONTEXT',contextTitle:'It is a notebook, not an automatic stock sensor.',
      contextBody:'Inventory and usage must be entered and updated by you. The app does not automatically count items, identify objects in photos, place orders, or synchronize inventory to the cloud. Forecasts are estimates based on recorded usage.',
      translation:'This LP illustration is independently written in English and Japanese. Other locale selections display English editorial text; they do not imply a localized App Store description.',
      endingTitle:'Begin with the one thing you always run out of.',endingBody:'Find official app details and real screenshots on the App Store.',
      footer:"An independent explanation of the app's published features."
    },
    ja: {
      skip:'説明例に移動',languageLabel:'言語',storeLabel:'App Storeの国',allApps:'アプリ一覧',
      eyebrow:'APP STORIES / 家の在庫管理',hero:'買い物の前に、残りがわかる。',
      intro:'まずは一品から。残りの数、置き場所、最低いくつ残しておきたいかを、自分で記録する。',
      storeButton:'App Storeで見る ↗',browseButton:'アプリ一覧に戻る',price:'現在の価格・提供状況はApp Storeをご覧ください。',
      exampleKicker:'01 / 説明用の例',exampleTitle:'最低在庫までの差を、一目で。',
      exampleIntro:'架空の入力記録です。リアルタイムの在庫情報でも、アプリの実画面でもありません。',
      featureKicker:'02 / 日用品の在庫',featuresTitle:'小さな記録が、次の買い物の判断を助ける。',
      feature1Title:'残数と場所',feature1Body:'品目の残りの数と保管場所を自分で入力。同じ品目を複数の場所に置いていても記録できる。',
      feature2Title:'最低在庫',feature2Body:'自分で決めた最低在庫と、いま記録している残数を比べられる。',
      feature3Title:'消費の目安',feature3Body:'記録した使用履歴をもとに消費量を推定し、補充を考える目安にする。',
      contextKicker:'03 / 大切な注意',contextTitle:'自動検知ではなく、自分で使う在庫帳。',
      contextBody:'在庫・使用量の登録と更新は手動です。写真から品目を自動認識したり、在庫を自動計数・注文・クラウド同期する機能はありません。消費予測は記録に基づく目安です。',
      translation:'このLPの図と説明は英語・日本語で独自編集したものです。その他のロケール選択では英語の説明を表示し、App Store公式の翻訳があることを意味しません。',
      endingTitle:'何度も切らしてしまう一品から。',endingBody:'公式の説明と実際のスクリーンショットはApp Storeでご確認ください。',
      footer:'公開機能に基づく独立した編集紹介です。'
    }
  };
  let localeMap={ 'en-US':'us', ja:'jp' };
  let manuallyPickedCountry=false;
  const langSelect=()=>document.getElementById('p199-language');
  const countrySelect=()=>document.getElementById('p199-country');
  function update(){
    const locale=langSelect()?.value || 'en-US';
    const ja=/^ja(?:-|$)/i.test(locale);
    const dict=translations[ja?'ja':'en'];
    document.documentElement.lang=ja?'ja':'en';
    document.documentElement.dir='ltr'; // Editorial fallback is English, even for RTL locale selections.
    document.querySelectorAll('[data-nn35-site]').forEach(node=>{
      const key=node.getAttribute('data-nn35-site');
      if (Object.prototype.hasOwnProperty.call(dict,key)) node.textContent=dict[key];
    });
  }
  function updateStore(){
    const country=countrySelect()?.value||'us';
    if(!/^[a-z]{2}$/.test(country)) return;
    document.querySelectorAll('[data-nn35-store]').forEach(a=>{a.href='https://apps.apple.com/'+country+'/app/id6826459096';});
  }
  async function populateLocales(){
    try {
      const res=await fetch('../../data/locale-storefronts.json',{cache:'no-store'});
      if(!res.ok) return;
      const data=await res.json();
      const map=data?.storefrontByLocale;
      if(data?.developerId!==1817908735 || !map || Object.keys(map).length!==50) return;
      if(!Object.values(map).every(s=>/^[a-z]{2}$/.test(s))) return;
      localeMap=map;
      const selector=langSelect(), store=countrySelect();
      if(!selector||!store) return;
      const chosen=selector.value;
      selector.replaceChildren();
      const locales=Object.keys(map).sort((a,b)=>a.localeCompare(b));
      locales.sort((a,b)=> (a==='en-US'?-1:a==='ja'?0:1)-(b==='en-US'?-1:b==='ja'?0:1));
      locales.forEach(code=>{const option=document.createElement('option');option.value=code;option.textContent=code;selector.append(option);});
      let chosenLocale=chosen;
      if(chosen==='en-US'){
        const browser=(navigator.languages||[navigator.language]).filter(Boolean);
        const picked=browser.map(l=>locales.find(x=>x.toLowerCase()===l.toLowerCase())||locales.find(x=>x.split('-')[0]===l.split('-')[0])).find(Boolean);
        chosenLocale=picked||'en-US';
      }
      selector.value=Object.prototype.hasOwnProperty.call(map,chosenLocale)?chosenLocale:'en-US';
      const selectedCountry=store.value;
      store.replaceChildren();
      const countries=[...new Set(['us','jp',...Object.values(map)])].sort();
      countries.forEach(code=>{const option=document.createElement('option');option.value=code;option.textContent=code.toUpperCase();store.append(option);});
      store.value=manuallyPickedCountry ? selectedCountry : (map[selector.value]||'us');
      if(!store.value) store.value='us';
      updateStore(); update();
      selector.dispatchEvent(new Event('change')); // Inform R35 example module of selected language.
    } catch(_) { /* Offline mode keeps English/Japanese and US/JP selectors usable. */ }
  }
  function install(){
    const l=langSelect(),c=countrySelect();if(!l||!c)return;
    l.addEventListener('change',()=>{if(!manuallyPickedCountry){const mapped=localeMap[l.value];if(mapped&&[...c.options].some(o=>o.value===mapped))c.value=mapped;}update();updateStore();});
    c.addEventListener('change',()=>{manuallyPickedCountry=true;updateStore();});
    updateStore();update();void populateLocales();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
