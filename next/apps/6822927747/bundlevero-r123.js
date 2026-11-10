/* TSZ LP R123 — Bundlevero ownership changes the purchase comparison.
 * LP-only in-memory educational scenario; no app integration, scraping, storage or network. */
(() => {
  'use strict';
  const APP_ID = '6822927747';
  const SINGLE_PRICES = Object.freeze([12, 9, 8]);
  const FIXED_BUNDLE = 22;
  const LABELS = {
    en: {eyebrow:'BEFORE YOU BUY THE BUNDLE',badge:'INTERACTIVE WEBSITE EXAMPLE',title:'Already own one? The better deal can change.',lead:'Mark the titles already in your library. Compare the remaining singles with the full bundle price, without paying twice for items you do not need.',choose:'WHAT DO YOU ALREADY OWN?',itemA:'Title A',itemB:'Title B',itemC:'Title C',owned:'Already owned',needed:'Still needed',help:'Select a title to toggle owned / not owned.',reset:'Start with nothing owned',compare:'YOUR PURCHASE COMPARISON',singles:'Buy missing titles individually',bundle:'Buy the complete bundle',bestBundle:'Bundle wins',bestSingles:'Singles win',tie:'Same total price',none:'Nothing to buy',bodyBundle:'This example bundle costs less than the remaining singles.',bodySingles:'Buying just the missing titles costs less than the full bundle.',bodyTie:'Both choices cost the same in this example.',bodyNone:'All three example titles are already owned. No extra purchase is needed.',saving:'Difference',ownedCount:'Titles already owned',note:'LP-only example, not the actual app screen or its optimization algorithm. Fictional item prices and fixed bundle price; no live store prices. Actual results depend on your entered conditions, and complex cases may not prove a minimum. Nothing is saved or sent.'},
    ja: {eyebrow:'セットを買う、その前に',badge:'LP専用・操作デモ',title:'もう持っているなら、安い買い方は変わる。',lead:'すでに所有している商品を選んでください。まだ必要なものだけを単品で買う場合と、セットを丸ごと買う場合を比較します。',choose:'もう持っているものは？',itemA:'作品A',itemB:'作品B',itemC:'作品C',owned:'所有済み',needed:'未所有',help:'各作品を押すと、所有済み／未所有が切り替わります。',reset:'所有なしに戻す',compare:'購入方法を比較',singles:'足りない作品を単品購入',bundle:'セットをまとめて購入',bestBundle:'今回はセットが有利',bestSingles:'今回は単品が有利',tie:'支払額は同じ',none:'追加購入は不要',bodyBundle:'この例では、未所有作品の単品合計よりセットの方が安くなります。',bodySingles:'この例では、持っていない作品だけを買う方が安くなります。',bodyTie:'この例では、どちらも同じ支払額です。',bodyNone:'例の3作品はすべて所有済み。新しく買う必要はありません。',saving:'支払額の差',ownedCount:'所有済みの作品',note:'アプリの実画面・最適化アルゴリズムではなく、LP専用の説明用デモです。価格・セット条件は架空で、オンライン販売価格は取得しません。実際の結果は入力条件によって変わり、複雑な条件では最安を証明できない場合があります。保存・送信はありません。'},
    ar: {eyebrow:'قبل شراء الحزمة',badge:'مثال تفاعلي على الموقع',title:'تملك أحد العناصر بالفعل؟ قد يتغير الخيار الأوفر.',lead:'حدّد العناصر الموجودة في مكتبتك، ثم قارن شراء الناقص منفرداً بسعر الحزمة الكاملة.',choose:'ما العناصر التي تملكها؟',itemA:'العنصر أ',itemB:'العنصر ب',itemC:'العنصر ج',owned:'مملوك بالفعل',needed:'غير مملوك',help:'اضغط على عنصر للتبديل بين مملوك وغير مملوك.',reset:'إعادة المثال بلا ملكية',compare:'مقارنة خيارات الشراء',singles:'شراء العناصر الناقصة منفردة',bundle:'شراء الحزمة الكاملة',bestBundle:'الحزمة أوفر هنا',bestSingles:'الشراء المنفرد أوفر',tie:'التكلفة متساوية',none:'لا حاجة للشراء',bodyBundle:'في هذا المثال، سعر الحزمة أقل من مجموع العناصر الناقصة.',bodySingles:'في هذا المثال، شراء العناصر الناقصة فقط أقل تكلفة.',bodyTie:'في هذا المثال، المبلغ نفسه في الخيارين.',bodyNone:'تملك العناصر الثلاثة بالفعل، فلا حاجة لشراء جديد.',saving:'فرق التكلفة',ownedCount:'العناصر المملوكة',note:'هذا مثال توضيحي خاص بالموقع، وليس واجهة التطبيق أو خوارزميته الفعلية. الأسعار وشروط الحزمة افتراضية ولا تُجلب أسعار المتاجر مباشرة. النتائج الفعلية تعتمد على الشروط المُدخلة، وقد لا يمكن إثبات الحد الأدنى في الحالات المعقدة. لا يجري حفظ البيانات أو إرسالها.'}
  };
  function language(){
    const selector=document.getElementById('p199-language');
    const value=selector?.value || document.documentElement.lang || 'en';
    const normalized=String(value).toLowerCase().split(/[-_]/)[0];
    return LABELS[normalized] ? normalized : 'en';
  }
  function mount(){
    const body=document.body;
    if(!body || document.getElementById('tsz-bv123')) return;
    const pageId=body.dataset.p199Id || body.dataset.p19AppId || '';
    if(pageId && pageId!==APP_ID) return;
    if(!pageId && !document.querySelector(`a[href*="${APP_ID}"]`)) return;
    const anchor=document.getElementById('tsz-bv85') || document.getElementById('overview');
    const main=document.querySelector('main');
    if(!anchor && !main) return;
    const root=document.createElement('section');
    root.id='tsz-bv123';
    root.dataset.illustration='website-only-ownership-and-bundle-prices';
    root.setAttribute('aria-label','Illustrative bundle ownership cost comparison');
    root.innerHTML=`
      <div class="bv123-meta"><span data-i="eyebrow"></span><span data-i="badge"></span></div>
      <h2 data-i="title"></h2><p class="bv123-lead" data-i="lead"></p>
      <div class="bv123-grid">
        <div class="bv123-box"><div class="bv123-kicker" data-i="choose"></div><div class="bv123-items" role="group" aria-label="Owned items">
          <button class="bv123-item" type="button" data-item="0" aria-pressed="false"><span class="bv123-symbol">A</span><span><strong class="bv123-itemname" data-i="itemA"></strong><small class="bv123-itemstate" data-state="0"></small></span><span class="bv123-price">$12</span></button>
          <button class="bv123-item" type="button" data-item="1" aria-pressed="false"><span class="bv123-symbol">B</span><span><strong class="bv123-itemname" data-i="itemB"></strong><small class="bv123-itemstate" data-state="1"></small></span><span class="bv123-price">$9</span></button>
          <button class="bv123-item" type="button" data-item="2" aria-pressed="false"><span class="bv123-symbol">C</span><span><strong class="bv123-itemname" data-i="itemC"></strong><small class="bv123-itemstate" data-state="2"></small></span><span class="bv123-price">$8</span></button>
        </div><p class="bv123-helper" data-i="help"></p><div class="bv123-actions"><button class="bv123-reset" type="button" data-reset data-i="reset"></button></div></div>
        <div class="bv123-box result"><div class="bv123-kicker" data-i="compare"></div>
          <div class="bv123-totals"><div class="bv123-total" data-kind="singles"><span data-i="singles"></span><strong data-out="singles"></strong></div><div class="bv123-total" data-kind="bundle"><span data-i="bundle"></span><strong data-out="bundle"></strong></div></div>
          <div class="bv123-result" aria-live="polite" role="status"><strong data-out="verdict"></strong><p data-out="explanation"></p></div>
          <p class="bv123-counter"><span data-i="ownedCount"></span>: <strong data-out="count"></strong> / 3 · <span data-i="saving"></span>: <strong data-out="difference"></strong></p>
        </div>
      </div><p class="bv123-footnote" data-i="note"></p>`;
    if(anchor) anchor.insertAdjacentElement('afterend',root); else main.appendChild(root);
    const owned=[false,false,false];
    const out=(k,text)=>{root.querySelector(`[data-out="${k}"]`).textContent=String(text);};
    let lastLanguage='';
    function render(){
      const lang=language(), t=LABELS[lang];
      root.lang=lang; root.dir=lang==='ar' ? 'rtl' : 'ltr';
      root.querySelectorAll('[data-i]').forEach(el=>{el.textContent=t[el.dataset.i];});
      owned.forEach((state,i)=>{
        root.querySelector(`[data-item="${i}"]`).setAttribute('aria-pressed',String(state));
        root.querySelector(`[data-state="${i}"]`).textContent=state?t.owned:t.needed;
      });
      const count=owned.filter(Boolean).length;
      const singles=SINGLE_PRICES.reduce((total,price,i)=>total+(owned[i]?0:price),0);
      const noPurchase=count===3;
      const bundle=noPurchase?0:FIXED_BUNDLE;
      const winner=noPurchase?'none':singles<bundle?'singles':singles>bundle?'bundle':'tie';
      out('singles',`$${singles}`);out('bundle',noPurchase?'—':`$${FIXED_BUNDLE}`);
      out('count',count);out('difference',`$${Math.abs(singles-bundle)}`);
      out('verdict',t[{singles:'bestSingles',bundle:'bestBundle',tie:'tie',none:'none'}[winner]]);
      out('explanation',t[{singles:'bodySingles',bundle:'bodyBundle',tie:'bodyTie',none:'bodyNone'}[winner]]);
      root.querySelectorAll('.bv123-total').forEach(el=>el.classList.toggle('winner',winner!=='none' && winner!=='tie' && el.dataset.kind===winner));
      lastLanguage=lang;
    }
    root.querySelectorAll('[data-item]').forEach(el=>el.addEventListener('click',()=>{const i=Number(el.dataset.item);owned[i]=!owned[i];render();}));
    root.querySelector('[data-reset]').addEventListener('click',()=>{owned.fill(false);render();});
    document.getElementById('p199-language')?.addEventListener('change',render);
    new MutationObserver(()=>{if(language()!==lastLanguage)render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true}); else mount();
})();
