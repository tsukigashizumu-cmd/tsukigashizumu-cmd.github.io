/* TSZ LP R325 — Bundlevero: a deliberately simplified fixed-price comparison demo.
   Local-only; not the complete Bundlevero optimization engine. */
(function () {
  'use strict';
  const MOUNT_ID = 'tsz-bv325';
  const PRESETS = {
    owned: {owned:[true,false,true,false],prices:[14,18,22,25],bundle:48},
    none:  {owned:[false,false,false,false],prices:[14,18,22,25],bundle:48},
    close: {owned:[true,true,false,false],prices:[14,18,22,25],bundle:48}
  };
  const DICT = {
    en: {
      eyebrow:'BUNDLEVERO · INTERACTIVE EXAMPLE',title:'You already own half the bundle. Is it still a deal?',
      lead:'A bundle price can look smaller—until you count the things you already bought. Change the ownership switches and see the answer move.',
      scenario:'Try a scenario',owned:'Already own two',none:'Own nothing',close:'Already own A and B',items:'What is in the set?',
      hint:'Tap “Already owned” to include or exclude each item from what you still need.',own:'Already owned',need:'Still needed',
      offer:'One fixed-price bundle',offerNote:'Illustrative price for all four items',bundlePrice:'Bundle price',
      result:'Lower estimated cost',singleWins:'Buy the missing items separately',bundleWins:'The fixed-price bundle costs less',
      tied:'Either option costs the same',allOwned:'You already own every item',singles:'Only the items you need',bundle:'Full bundle',
      saved:'Difference',difference0:'Same cost',explanationSingles:'Buying separately avoids paying again for things you already own.',
      explanationBundle:'At these example prices, the bundle costs less than the missing items together.',
      explanationTie:'Both plans cost the same under these example conditions.',explanationAll:'You do not need to buy anything in this example.',
      note:'Illustrative fixed-price example only. Real offers may have eligibility, taxes, ownership or activation restrictions. Bundlevero supports more rule types; the app uses prices you enter and does not fetch live prices.',
      invalid:'Enter a valid price from $0 to $999,999 for each item.',products:['Item A','Item B','Item C','Item D']
    },
    ja: {
      eyebrow:'BUNDLEVERO · 操作できる比較例',title:'セットの半分はもう持っている。それでも買う？',
      lead:'セット価格だけを見るとお得に思えても、すでに買った商品が含まれているかもしれません。所有済みを切り替えて比較できます。',
      scenario:'比較する場面',owned:'2つ所有済み',none:'何も持っていない',close:'AとBを所有済み',items:'セットに含まれる商品',
      hint:'「所有済み」を押すと、これから必要な商品から除外できます。',own:'所有済み',need:'まだ必要',
      offer:'固定価格のセット',offerNote:'4商品すべてを含む説明用の価格',bundlePrice:'セット価格',
      result:'安い方の参考額',singleWins:'足りないものだけを単品購入',bundleWins:'セットの方が安い',
      tied:'どちらも同じ金額',allOwned:'すべて所有済み',singles:'必要な商品の単品合計',bundle:'セットを一式購入',
      saved:'差額',difference0:'差額なし',explanationSingles:'所有済みの商品を再購入せずに済むため、単品の方が安くなります。',
      explanationBundle:'この例の価格では、足りない商品の単品合計よりもセットが安くなります。',
      explanationTie:'この例の条件では、どちらも同じ支払額です。',explanationAll:'この例では追加購入するものはありません。',
      note:'固定価格セットだけを扱う説明用デモです。実際の販売には税・所有条件・利用資格・有効化条件などがあります。Bundleveroは他のセット条件にも対応しますが、リアルタイムの価格取得は行いません。',
      invalid:'各商品の価格を0～999,999の範囲で入力してください。',products:['商品 A','商品 B','商品 C','商品 D']
    },
    ar: {
      eyebrow:'BUNDLEVERO · مثال تفاعلي',title:'تملك نصف محتويات الحزمة بالفعل. هل لا تزال صفقة جيدة؟',
      lead:'قد يبدو سعر الحزمة أفضل، لكن بعض العناصر لديك مسبقًا. غيّر حالة الملكية وشاهد كيف يتغير الاختيار.',
      scenario:'اختر مثالاً',owned:'أملك عنصرين',none:'لا أملك شيئًا',close:'أملك A وB',items:'محتويات الحزمة',
      hint:'اضغط على «أملكه بالفعل» لاستبعاد العنصر من مشترياتك المطلوبة.',own:'أملكه بالفعل',need:'ما زلت أحتاجه',
      offer:'حزمة بسعر ثابت',offerNote:'سعر توضيحي للعناصر الأربعة',bundlePrice:'سعر الحزمة',
      result:'التكلفة الأقل المقدّرة',singleWins:'اشترِ العناصر الناقصة فقط',bundleWins:'الحزمة ذات السعر الثابت أرخص',
      tied:'الخياران بالتكلفة نفسها',allOwned:'تملك جميع العناصر بالفعل',singles:'العناصر المطلوبة فقط',bundle:'الحزمة كاملة',
      saved:'الفرق',difference0:'لا فرق',explanationSingles:'الشراء المنفصل يتجنب دفع ثمن العناصر التي تملكها مرة ثانية.',
      explanationBundle:'في هذا المثال، سعر الحزمة أقل من مجموع العناصر الناقصة.',
      explanationTie:'الخياران لهما السعر نفسه وفق شروط هذا المثال.',explanationAll:'لا تحتاج إلى شراء أي شيء إضافي في هذا المثال.',
      note:'مثال توضيحي لحزمة بسعر ثابت فقط. قد تنطبق في الواقع ضرائب وشروط ملكية وأهلية. يدعم Bundlevero قواعد أخرى، لكنه يستخدم الأسعار التي تدخلها ولا يجلب الأسعار المباشرة.',
      invalid:'أدخل أسعارًا صحيحة بين 0 و999999 لكل عنصر.',products:['العنصر A','العنصر B','العنصر C','العنصر D']
    }
  };
  function mount() {
    let host=document.getElementById(MOUNT_ID);
    if(!host){
      host=document.createElement('section');host.id=MOUNT_ID;
      const anchor=document.querySelector('#related');
      if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(host,anchor);
      else (document.querySelector('#overview')||document.querySelector('main')||document.body).appendChild(host);
    }
    if(host.dataset.ready==='yes')return;
    host.dataset.ready='yes';
    const state={lang:'en',preset:'owned',owned:PRESETS.owned.owned.slice(),prices:PRESETS.owned.prices.slice(),bundle:PRESETS.owned.bundle};
    const money=n=>'$'+n.toFixed(2);
    const dollar=n=>Number.isFinite(n)&&n>=0&&n<=999999;
    host.innerHTML=`<div class="bv-shell"><div class="bv-top">
      <p class="bv-eyebrow" data-t="eyebrow"></p><h2 data-t="title"></h2><p class="bv-lead" data-t="lead"></p>
      <div class="bv-lang-row" role="group" aria-label="Language"><button class="bv-lang" data-lang="en" type="button">English</button><button class="bv-lang" data-lang="ja" type="button">日本語</button><button class="bv-lang" data-lang="ar" type="button">العربية</button></div>
    </div><div class="bv-layout"><section class="bv-section" aria-label="Bundle comparison inputs">
      <h3 data-t="scenario"></h3><div class="bv-presets" role="group" aria-label="Scenario"><button class="bv-preset" data-preset="owned" type="button"></button><button class="bv-preset" data-preset="none" type="button"></button><button class="bv-preset" data-preset="close" type="button"></button></div>
      <h3 data-t="items"></h3><p class="bv-hint" data-t="hint"></p><div class="bv-item-list"></div>
      <div class="bv-offer"><div class="bv-offer-head"><div class="bv-offer-icon" aria-hidden="true">◈</div><div><p class="bv-offer-title" data-t="offer"></p><p class="bv-offer-note" data-t="offerNote"></p></div></div>
      <label class="bv-hint" for="bv325-bundle-price" data-t="bundlePrice"></label><div class="bv-price-wrap bv-bundle-input"><span class="bv-currency">$</span><input id="bv325-bundle-price" type="number" min="0" max="999999" step="0.01" inputmode="decimal" value="48"></div></div>
    </section><section class="bv-section bv-result"><div class="bv-result-inner" aria-live="polite" aria-atomic="true">
      <p class="bv-kicker" data-t="result"></p><p class="bv-big" data-output="best"></p><p class="bv-advice" data-output="advice"></p>
      <div class="bv-compare"><div class="bv-compare-row" data-win="singles"><span data-t="singles"></span><strong data-output="singles"></strong></div><div class="bv-compare-row" data-win="bundle"><span data-t="bundle"></span><strong data-output="bundle"></strong></div><div class="bv-compare-row"><span data-t="saved"></span><strong data-output="difference"></strong></div></div><p class="bv-explain" data-output="explain"></p>
    </div></section></div><div class="bv-footer"><span aria-hidden="true">ⓘ</span><span data-t="note"></span></div></div>`;
    const list=host.querySelector('.bv-item-list');
    for(let i=0;i<4;i++){
      const card=document.createElement('div');card.className='bv-item';card.dataset.index=i;
      const left=document.createElement('div');
      const name=document.createElement('p');name.className='bv-item-name';name.dataset.product=i;
      const own=document.createElement('button');own.className='bv-own';own.type='button';own.dataset.own=i;
      own.setAttribute('aria-pressed','false');
      const dot=document.createElement('span');dot.className='bv-dot';dot.setAttribute('aria-hidden','true');dot.textContent='✓';
      const label=document.createElement('span');label.dataset.ownLabel=i;own.append(dot,label);left.append(name,own);
      const wrapper=document.createElement('label');wrapper.className='bv-price-wrap';
      const currency=document.createElement('span');currency.className='bv-currency';currency.textContent='$';
      const input=document.createElement('input');input.type='number';input.min='0';input.max='999999';input.step='0.01';input.inputMode='decimal';input.dataset.price=i;
      wrapper.append(currency,input);card.append(left,wrapper);list.append(card);
    }
    const t=()=>DICT[state.lang];
    function translate(){
      host.setAttribute('dir',state.lang==='ar'?'rtl':'ltr');host.setAttribute('lang',state.lang);
      host.querySelectorAll('[data-t]').forEach(el=>el.textContent=t()[el.dataset.t]);
      host.querySelectorAll('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===state.lang)));
      for(let i=0;i<4;i++){
        host.querySelector(`[data-product="${i}"]`).textContent=t().products[i];
        const label=host.querySelector(`[data-own-label="${i}"]`);
        label.textContent=state.owned[i]?t().own:t().need;
        const own=host.querySelector(`[data-own="${i}"]`);own.setAttribute('aria-label',`${t().products[i]}: ${label.textContent}`);
      }
      host.querySelector('[data-preset="owned"]').textContent=t().owned;
      host.querySelector('[data-preset="none"]').textContent=t().none;
      host.querySelector('[data-preset="close"]').textContent=t().close;
      host.querySelectorAll('[data-preset]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.preset===state.preset)));
      render();
    }
    function render(){
      host.querySelectorAll('[data-preset]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.preset===state.preset)));
      for(let i=0;i<4;i++){
        const card=host.querySelector(`[data-index="${i}"]`), own=card.querySelector('[data-own]');
        card.classList.toggle('is-owned',state.owned[i]);
        own.setAttribute('aria-pressed',String(state.owned[i]));
        own.querySelector('[data-own-label]').textContent=state.owned[i]?t().own:t().need;
      }
      const prices=state.prices; const valid=prices.every(dollar)&&dollar(state.bundle);
      const el=name=>host.querySelector(`[data-output="${name}"]`);
      host.querySelectorAll('[data-win]').forEach(node=>node.classList.remove('is-winner'));
      if(!valid){['best','advice','singles','bundle','difference'].forEach(k=>el(k).textContent='—');el('explain').textContent=t().invalid;return;}
      // Integer cents avoid floating-point disagreement. Both options are user-supplied illustrative prices.
      const cents=x=>Math.round(x*100);
      const singlesC=prices.reduce((sum,price,i)=>sum+(state.owned[i]?0:cents(price)),0);
      const bundleC=cents(state.bundle),bestC=Math.min(singlesC,bundleC),diffC=Math.abs(singlesC-bundleC);
      const price=c=>money(c/100);
      el('best').textContent=price(bestC);el('singles').textContent=price(singlesC);el('bundle').textContent=price(bundleC);
      el('difference').textContent=diffC===0?t().difference0:price(diffC);
      const allOwned=state.owned.every(Boolean);
      const win=allOwned?'all':singlesC<bundleC?'singles':bundleC<singlesC?'bundle':'tie';
      el('advice').textContent=t()[win==='singles'?'singleWins':win==='bundle'?'bundleWins':win==='all'?'allOwned':'tied'];
      el('explain').textContent=t()[win==='singles'?'explanationSingles':win==='bundle'?'explanationBundle':win==='all'?'explanationAll':'explanationTie'];
      if(win==='singles'||win==='all')host.querySelector('[data-win="singles"]').classList.add('is-winner');
      if(win==='bundle')host.querySelector('[data-win="bundle"]').classList.add('is-winner');
      if(win==='tie')host.querySelectorAll('[data-win]').forEach(n=>n.classList.add('is-winner'));
    }
    host.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>{state.lang=btn.dataset.lang;translate();}));
    host.querySelectorAll('[data-preset]').forEach(btn=>btn.addEventListener('click',()=>{
      const id=btn.dataset.preset, preset=PRESETS[id]; state.preset=id;
      state.owned=preset.owned.slice();state.prices=preset.prices.slice();state.bundle=preset.bundle;
      host.querySelectorAll('[data-price]').forEach(input=>input.value=String(state.prices[Number(input.dataset.price)]));
      host.querySelector('#bv325-bundle-price').value=String(state.bundle);translate();
    }));
    host.querySelectorAll('[data-own]').forEach(btn=>btn.addEventListener('click',()=>{
      const i=Number(btn.dataset.own);state.owned[i]=!state.owned[i];state.preset='custom';translate();
    }));
    host.querySelectorAll('[data-price]').forEach(input=>{
      input.value=String(state.prices[Number(input.dataset.price)]);
      input.setAttribute('aria-label',`Price: ${DICT.en.products[Number(input.dataset.price)]}`);
      input.addEventListener('input',()=>{state.prices[Number(input.dataset.price)]=input.value.trim()===''?NaN:Number(input.value);state.preset='custom';render();});
    });
    const bundle=host.querySelector('#bv325-bundle-price');
    bundle.addEventListener('input',()=>{state.bundle=bundle.value.trim()===''?NaN:Number(bundle.value);state.preset='custom';render();});
    translate();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});
  else mount();
})();
