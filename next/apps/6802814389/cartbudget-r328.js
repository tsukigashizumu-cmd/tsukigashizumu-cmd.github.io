(()=>{
  'use strict';
  const ROOT_ID='tsz-cb328';
  const words={
    en:{eyebrow:'BEFORE THE CHECKOUT',headline:'Only $9.40 left. Does one more item fit?',intro:'Every item changes one number: how much of your shopping budget is still free.',examples:'CHOOSE A SHOPPING TRIP',grocery:'Groceries',home:'Household',gifts:'Gifts',limit:'Your cart budget · USD',items:'IN THE CART',remove:'Remove',addHeading:'ADD ONE MORE ITEM',itemName:'Item name',namePlaceholder:'e.g. Chocolate',itemPrice:'Price · USD',add:'Add to cart',total:'CART TOTAL',left:'LEFT TO SPEND',over:'OVER BUDGET',statusSafe:'The next item must fit within the remaining amount.',statusOver:'Your selected items exceed the budget. Remove something or raise the limit.',statusEven:'Your cart uses the whole budget.',itemsCount:'items added',note:'Illustrative, local-only demo. No bank connection, price lookup, purchase, tracking or saved history. Entered amounts are not tax-inclusive unless you choose to include tax yourself.',wrong:'Enter a budget of $0–$1,000,000 and nonnegative item prices.',invalidItem:'Enter an item name and a valid price ($0–$1,000,000).',empty:'Your cart is empty.',reset:'Reset this example',rice:'Rice',eggs:'Eggs',milk:'Milk',vegetables:'Vegetables',soap:'Laundry detergent',paper:'Paper towels',cleaner:'Surface cleaner',scarf:'Scarf',book:'Book'},
    ja:{eyebrow:'レジに行く前に',headline:'残り9.40ドル。あと1品入る？',intro:'商品をカゴに入れるたびに、使える残額がひと目で変わります。',examples:'買い物の例',grocery:'食料品',home:'日用品',gifts:'贈り物',limit:'今回の予算 · USD',items:'カゴの中身',remove:'削除',addHeading:'あと1品追加する',itemName:'商品名',namePlaceholder:'例：チョコレート',itemPrice:'価格 · USD',add:'カゴに追加',total:'カゴの合計',left:'あと使える金額',over:'予算オーバー',statusSafe:'残額の範囲なら、もう1品追加できます。',statusOver:'予算を超えています。商品を減らすか上限を見直してください。',statusEven:'予算をちょうど使い切りました。',itemsCount:'件を追加済み',note:'LP専用の架空デモです。銀行連携・価格取得・購入・追跡・履歴保存は行いません。税金を含める場合は税込価格を入力してください。',wrong:'予算は0〜1,000,000ドル、商品価格は0以上で入力してください。',invalidItem:'商品名と0〜1,000,000ドルの有効な価格を入力してください。',empty:'カゴは空です。',reset:'この例を初期化',rice:'お米',eggs:'卵',milk:'牛乳',vegetables:'野菜',soap:'洗濯洗剤',paper:'ペーパータオル',cleaner:'掃除用洗剤',scarf:'マフラー',book:'本'},
    ar:{eyebrow:'قبل الدفع',headline:'بقي ٩٫٤٠ دولارات. هل تكفي لمنتج آخر؟',intro:'كل منتج تضيفه يغيّر رقماً واحداً: ما تبقى من ميزانية التسوق.',examples:'اختر رحلة تسوّق',grocery:'بقالة',home:'مستلزمات المنزل',gifts:'هدايا',limit:'ميزانية السلة · USD',items:'محتويات السلة',remove:'إزالة',addHeading:'أضف منتجاً آخر',itemName:'اسم المنتج',namePlaceholder:'مثال: شوكولاتة',itemPrice:'السعر · USD',add:'أضف للسلة',total:'إجمالي السلة',left:'المبلغ المتبقي',over:'تجاوزت الميزانية',statusSafe:'يمكنك إضافة منتج آخر إذا كان سعره ضمن المتبقي.',statusOver:'تجاوز مجموع المنتجات الميزانية. أزل منتجاً أو ارفع الحد.',statusEven:'استهلكت السلة الميزانية كاملة.',itemsCount:'منتجات في السلة',note:'عرض توضيحي محلي فقط. لا اتصال ببنك، ولا تتبع للأسعار، ولا شراء، ولا تخزين للتاريخ. أدخل سعراً يشمل الضريبة إذا أردت احتسابها.',wrong:'أدخل ميزانية بين ٠ و١٬٠٠٠٬٠٠٠ وأسعاراً غير سالبة.',invalidItem:'أدخل اسم المنتج وسعراً صالحاً بين ٠ و١٬٠٠٠٬٠٠٠.',empty:'السلة فارغة.',reset:'إعادة ضبط المثال',rice:'أرز',eggs:'بيض',milk:'حليب',vegetables:'خضراوات',soap:'منظف غسيل',paper:'مناشف ورقية',cleaner:'منظف أسطح',scarf:'وشاح',book:'كتاب'}
  };
  const scenarios={
    grocery:{budget:55,items:[{key:'rice',price:18.9},{key:'eggs',price:7.5},{key:'milk',price:6.2},{key:'vegetables',price:13}]},
    home:{budget:80,items:[{key:'soap',price:18},{key:'paper',price:25},{key:'cleaner',price:12.75}]},
    gifts:{budget:100,items:[{key:'scarf',price:54.95},{key:'book',price:31.50}]}
  };
  const usd=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
  const isPrice=n=>Number.isFinite(n)&&n>=0&&n<=1000000;
  function mount(){
    let host=document.getElementById(ROOT_ID);
    if(!host){host=document.createElement('section');host.id=ROOT_ID;const related=document.querySelector('#related');if(related?.parentNode)related.parentNode.insertBefore(host,related);else(document.querySelector('main')||document.body).appendChild(host)}
    if(host.dataset.ready==='yes')return;
    host.dataset.ready='yes';
    let counter=0;
    const initial=key=>({budget:scenarios[key].budget,items:scenarios[key].items.map(it=>({...it,id:++counter}))});
    const state={lang:'en',example:'grocery',...initial('grocery'),error:''};
    host.innerHTML=`<section class="cb-shell"><header class="cb-hero"><div class="cb-eyebrow"><span class="cb-pulse"></span><span data-t="eyebrow"></span></div><h2 data-t="headline"></h2><p class="cb-intro" data-t="intro"></p><div class="cb-languages" role="group" aria-label="Language"><button type="button" data-lang="en">English</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></header><div class="cb-grid"><div class="cb-controls"><p class="cb-labelcap" data-t="examples"></p><div class="cb-presets" role="group" aria-label="Examples"><button type="button" data-example="grocery"></button><button type="button" data-example="home"></button><button type="button" data-example="gifts"></button></div><label class="cb-caption" for="cb328-budget" data-t="limit"></label><div class="cb-inputunit"><span aria-hidden="true">$</span><input type="number" id="cb328-budget" inputmode="decimal" min="0" max="1000000" step="0.01" value="55"></div><div class="cb-carthead"><span class="cb-labelcap" data-t="items"></span><span class="cb-count" data-out="count"></span></div><ul class="cb-itemlist" data-list="items"></ul><div class="cb-form"><h3 data-t="addHeading"></h3><div class="cb-fields"><div><label for="cb328-name" data-t="itemName"></label><input id="cb328-name" type="text" maxlength="72" autocomplete="off"></div><div><label for="cb328-price" data-t="itemPrice"></label><input id="cb328-price" type="number" inputmode="decimal" step="0.01" min="0" max="1000000" value="10"></div></div><button type="button" id="cb328-add" class="cb-add" data-t="add"></button><p class="cb-error" data-out="error" aria-live="polite"></p></div><button type="button" class="cb-reset" id="cb328-reset" data-t="reset"></button></div><div class="cb-summary" aria-live="polite"><div class="cb-summarycap" data-t="left"></div><div class="cb-amount" data-out="remaining">$9.40</div><div class="cb-stat"><span data-t="total"></span><strong data-out="total">$45.60</strong></div><div class="cb-meter"><div class="cb-meterfill" data-meter="fill"></div></div><p class="cb-percentage" data-out="fraction">82.9%</p><p class="cb-message" data-out="message"></p><div class="cb-outline"><span class="cb-outline-dot"></span><span data-t="note"></span></div></div></div></section>`;
    const q=s=>host.querySelector(s),qa=s=>Array.from(host.querySelectorAll(s));
    const t=()=>words[state.lang];
    const out=(key,val)=>{const el=q(`[data-out="${key}"]`);if(el)el.textContent=val};
    function render(){
      host.lang=state.lang;host.dir=state.lang==='ar'?'rtl':'ltr';
      qa('[data-t]').forEach(el=>el.textContent=t()[el.dataset.t]);
      q('#cb328-name').placeholder=t().namePlaceholder;
      qa('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===state.lang)));
      qa('[data-example]').forEach(b=>{b.textContent=t()[b.dataset.example];b.setAttribute('aria-pressed',String(b.dataset.example===state.example))});
      const list=q('[data-list="items"]');list.replaceChildren();
      for(const item of state.items){const li=document.createElement('li');li.className='cb-item';const nm=document.createElement('span');nm.className='cb-name';nm.textContent=item.key?t()[item.key]:item.name;const price=document.createElement('strong');price.textContent=usd(item.price);const remove=document.createElement('button');remove.type='button';remove.dataset.remove=String(item.id);remove.textContent=t().remove;remove.setAttribute('aria-label',t().remove+' '+nm.textContent);li.append(nm,price,remove);list.appendChild(li)}
      if(!state.items.length){const empty=document.createElement('li');empty.className='cb-empty';empty.textContent=t().empty;list.appendChild(empty)}
      out('count',state.items.length+' '+t().itemsCount);
      const total=state.items.reduce((acc,it)=>acc+it.price,0);
      const valid=isPrice(state.budget)&&isPrice(total)&&Number.isFinite(total);
      if(!valid){host.dataset.state='invalid';out('remaining','—');out('total','—');out('fraction','—');out('message',t().wrong);q('[data-meter="fill"]').style.width='0%'}
      else{const diff=Math.round((state.budget-total)*100)/100;const over=diff<0;host.dataset.state=over?'over':diff===0?'exact':'ok';out('remaining',over?'-'+usd(-diff):usd(diff));out('total',usd(total));const pct=state.budget>0?100*total/state.budget:(total===0?0:100);out('fraction',(pct).toFixed(1)+'% '+t().total);q('[data-meter="fill"]').style.width=Math.max(0,Math.min(100,pct))+'%';out('message',over?t().statusOver:diff===0?t().statusEven:t().statusSafe)}
      out('error',state.error?(t()[state.error]||state.error):'');
    }
    qa('[data-lang]').forEach(b=>b.addEventListener('click',()=>{state.lang=b.dataset.lang;render()}));
    qa('[data-example]').forEach(b=>b.addEventListener('click',()=>{state.example=b.dataset.example;Object.assign(state,initial(state.example));state.error='';q('#cb328-budget').value=state.budget;q('#cb328-name').value='';q('#cb328-price').value='10';render()}));
    q('#cb328-budget').addEventListener('input',()=>{const value=q('#cb328-budget').value;state.budget=value===''?NaN:Number(value);state.error='';render()});
    q('#cb328-add').addEventListener('click',()=>{const name=q('#cb328-name').value.trim();const val=q('#cb328-price').value;const price=val===''?NaN:Number(val);if(!name||!isPrice(price)||state.items.length>=40){state.error='invalidItem';render();return}state.items.push({id:++counter,name,price});state.error='';q('#cb328-name').value='';render()});
    q('[data-list="items"]').addEventListener('click',e=>{const btn=e.target.closest('button[data-remove]');if(!btn)return;state.items=state.items.filter(it=>String(it.id)!==btn.dataset.remove);state.error='';render()});
    q('#cb328-reset').addEventListener('click',()=>{Object.assign(state,initial(state.example));state.error='';q('#cb328-budget').value=state.budget;q('#cb328-name').value='';q('#cb328-price').value='10';render()});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
