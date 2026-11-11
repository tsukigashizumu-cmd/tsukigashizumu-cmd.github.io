/* CartBudget R161: LP-only illustrative 'put one item back' budget exercise. */
(() => {
  'use strict';
  const APP_ID='6802814389';
  const ITEMS=[{id:'rice',price:480},{id:'fruit',price:360},{id:'tea',price:280}];
  const LANG={
    ja:{eyebrow:'THE CART IS A CHOICE.',chip:'LP専用・体験デモ',title:'予算を超えそう。どれを戻す？',lead:'レジに行く前に、いまの残り予算を確認する。商品を一つ戻すと、数字がすぐに変わる。',budget:'今日の予算（見本の単位）',contents:'カートに入れる商品',remaining:'残っている予算',over:'予算を超えています',within:'予算内に収まっています',total:'カート合計',limit:'予算上限',count:'カート内の商品数',remove:'いったん戻す',add:'また入れる',restore:'最初の見本に戻す',unit:'単位',items:{rice:'お米',fruit:'果物',tea:'お茶'},note:'この品目・価格・商品を戻す操作は、この紹介ページだけの架空の例です。Cart Budget Calculatorの実画面や削除操作を再現するものではありません。購入、保存、通知、外部送信は行いません。価格は説明用の単位です。'},
    en:{eyebrow:'THE CART IS A CHOICE.',chip:'INTERACTIVE LP EXAMPLE',title:'Over budget? What would you put back?',lead:'See the amount left before checkout. Put an item back and the balance changes immediately.',budget:'Sample budget (illustrative units)',contents:'Items in the cart',remaining:'Budget remaining',over:'Over the budget',within:'Within your budget',total:'Cart total',limit:'Budget cap',count:'Items in cart',remove:'Put back',add:'Add again',restore:'Restore example',unit:'units',items:{rice:'Rice',fruit:'Fruit',tea:'Tea'},note:'These items, prices, and put-back controls are hypothetical examples for this landing page only. They are not the real Cart Budget Calculator interface or a reproduction of its removal feature. No purchases, storage, notifications, or data transmission. Amounts are illustrative units.'},
    ar:{eyebrow:'السلة تعني الاختيار.',chip:'مثال تفاعلي للموقع',title:'تجاوزت الميزانية؟ ماذا ستعيد؟',lead:'اعرف ما تبقى من ميزانيتك قبل الدفع. أعد منتجاً واحداً لتتغير القيمة فوراً.',budget:'الميزانية التجريبية (وحدات توضيحية)',contents:'المنتجات في السلة',remaining:'المتبقي من الميزانية',over:'تجاوزت الميزانية',within:'ضمن حدود الميزانية',total:'إجمالي السلة',limit:'حد الميزانية',count:'عدد المنتجات في السلة',remove:'إعادة المنتج',add:'أضف مجدداً',restore:'استعادة المثال',unit:'وحدة',items:{rice:'الأرز',fruit:'الفاكهة',tea:'الشاي'},note:'المنتجات والأسعار وأزرار الإعادة هنا أمثلة افتراضية لهذه الصفحة فقط، ولا تمثل واجهة التطبيق الفعلية أو وظيفة حذف المنتجات فيه. لا توجد عمليات شراء أو حفظ أو إشعارات أو إرسال بيانات. المبالغ وحدات توضيحية فقط.'}
  };
  const language=()=>{const v=String(document.getElementById('p199-language')?.value||document.documentElement.lang||'en').toLowerCase().split(/[-_]/)[0];return LANG[v]?v:'en'};
  function mount(){
    if(document.getElementById('tsz-cb161'))return;
    const app=document.body?.dataset.p199Id||document.body?.dataset.p19AppId||'';
    if(app&&app!==APP_ID)return;
    if(!app&&!document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor=document.getElementById('tsz-cb135')||document.getElementById('tsz-cartbudget-r135')||document.getElementById('overview');
    const main=document.querySelector('main');if(!anchor&&!main)return;
    const root=document.createElement('section');root.id='tsz-cb161';root.setAttribute('aria-label','Illustrative cart budget put-back example');root.dataset.demo='cartbudget-putback-lp-only';
    root.innerHTML=`<div class="cb161-overline"><span class="cb161-eyebrow" data-t="eyebrow"></span><span class="cb161-chip" data-t="chip"></span></div><h2 data-t="title"></h2><p class="cb161-lead" data-t="lead"></p><div class="cb161-layout"><div class="cb161-panel"><p class="cb161-label" data-t="budget"></p><div class="cb161-budgetopts" data-budget-opts></div><p class="cb161-label" data-t="contents"></p><div class="cb161-list" data-item-list></div></div><div class="cb161-panel cb161-panel-right"><div class="cb161-balance" data-balance><div class="cb161-kpi" data-t="remaining"></div><div class="cb161-value" data-remaining aria-live="polite"></div><div class="cb161-status" data-status></div><div class="cb161-meter" role="progressbar" aria-label="Sample budget used" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" data-meter><span class="cb161-fill" data-fill></span></div></div><div class="cb161-statline"><span data-t="total"></span><strong data-total></strong></div><div class="cb161-statline"><span data-t="limit"></span><strong data-limit></strong></div><div class="cb161-statline"><span data-t="count"></span><strong data-count></strong></div><button type="button" class="cb161-restore" data-restore></button></div></div><p class="cb161-note" data-t="note"></p>`;
    if(anchor)anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    let budget=1000;const active=new Set(ITEMS.map(i=>i.id));let lastLang='';
    function formatted(n){return new Intl.NumberFormat(language()==='ar'?'ar-EG':language()==='ja'?'ja-JP':'en-US',{maximumFractionDigits:0}).format(n)}
    function render(){
      const lang=language(),t=LANG[lang];lastLang=lang;root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.dataset.t]||''});
      const opts=root.querySelector('[data-budget-opts]');opts.replaceChildren();
      [800,1000,1500].forEach(v=>{const btn=document.createElement('button');btn.type='button';btn.className='cb161-budget';btn.dataset.budget=String(v);btn.setAttribute('aria-pressed',String(budget===v));btn.textContent=formatted(v);btn.addEventListener('click',()=>{budget=v;render()});opts.append(btn)});
      const list=root.querySelector('[data-item-list]');list.replaceChildren();
      ITEMS.forEach(item=>{
        const chosen=active.has(item.id),box=document.createElement('div');box.className='cb161-item';box.dataset.id=item.id;box.dataset.in=String(chosen);
        const label=document.createElement('div');label.className='cb161-itemlabel';
        const name=document.createElement('strong');name.textContent=t.items[item.id];
        const price=document.createElement('span');price.textContent=`${formatted(item.price)} ${t.unit}`;
        label.append(name,price);
        const btn=document.createElement('button');btn.type='button';btn.className='cb161-toggle';btn.dataset.toggle=item.id;btn.setAttribute('aria-pressed',String(chosen));btn.textContent=chosen?t.remove:t.add;
        btn.addEventListener('click',()=>{if(active.has(item.id))active.delete(item.id);else active.add(item.id);render()});
        box.append(label,btn);list.append(box);
      });
      const total=ITEMS.reduce((s,item)=>s+(active.has(item.id)?item.price:0),0),remaining=budget-total,over=remaining<0;
      root.dataset.budget=String(budget);root.dataset.total=String(total);root.dataset.remaining=String(remaining);root.dataset.count=String(active.size);root.dataset.over=String(over);
      root.querySelector('[data-remaining]').textContent=`${remaining<0?'−':''}${formatted(Math.abs(remaining))} ${t.unit}`;
      root.querySelector('[data-status]').textContent=over?t.over:t.within;
      root.querySelector('[data-total]').textContent=`${formatted(total)} ${t.unit}`;
      root.querySelector('[data-limit]').textContent=`${formatted(budget)} ${t.unit}`;
      root.querySelector('[data-count]').textContent=formatted(active.size);
      root.querySelector('[data-balance]').dataset.over=String(over);
      const pct=Math.min(100,Math.max(0,Math.round(100*total/budget)));
      root.querySelector('[data-fill]').style.width=`${pct}%`;
      root.querySelector('[data-meter]').setAttribute('aria-valuenow',String(pct));
      root.querySelector('[data-restore]').textContent=t.restore;
    }
    root.querySelector('[data-restore]').addEventListener('click',()=>{budget=1000;active.clear();ITEMS.forEach(i=>active.add(i.id));render()});
    document.getElementById('p199-language')?.addEventListener('change',render);
    new MutationObserver(()=>{if(lastLang!==language())render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
