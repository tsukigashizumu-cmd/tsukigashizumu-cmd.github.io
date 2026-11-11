/* TSZ R171 Cart Budget. Illustrative in-browser cart calculation only.
   No telemetry, persistence, network, or modifications to the iOS app. */
(()=>{
  'use strict';
  const APP='6802814389', ROOT='tsz-cartbudget-r171';
  if(document.body?.dataset.p199Id!==APP || document.getElementById(ROOT)) return;
  const dict={
    en:{brand:'CART BUDGET',heading:'See what’s left before checkout.',sub:'Set a limit. Add prices. Know what remains.',left:'LEFT TO SPEND',over:'OVER BUDGET',budget:'BUDGET',inCart:'IN CART',add:'Add',item:'Item name (optional)',price:'Price ($)',budgetInput:'Shopping budget ($)',sample:'Your cart',clear:'Reset example',rice:'Rice',produce:'Produce',essentials:'Essentials',store:'View on the App Store',tip:'Try the example: add a price, edit your budget, or remove a row.',invalid:'Enter a valid price greater than zero.',badBudget:'Enter a budget greater than zero.',empty:'Cart is empty.',fallback:'New item',remove:'Remove',note:'Illustrative USD amounts. This website demo does not store your shopping details or connect to a bank.',remaining:'remaining',total:'of budget used'},
    ja:{brand:'CART BUDGET',heading:'レジに行く前に、残りがわかる。',sub:'予算を決めて、金額を追加。残額がすぐわかる。',left:'あと使える金額',over:'予算オーバー',budget:'予算',inCart:'カート合計',add:'追加',item:'商品名（省略可）',price:'金額（$）',budgetInput:'買い物予算（$）',sample:'カートの商品',clear:'初期化',rice:'お米',produce:'野菜',essentials:'日用品',store:'App Storeで見る',tip:'金額を追加したり、予算を変更したり、商品を削除できます。',invalid:'0より大きい正しい金額を入力してください。',badBudget:'0より大きい予算を入力してください。',empty:'カートに商品はありません。',fallback:'新しい商品',remove:'削除',note:'米ドルの架空例です。このWebデモは買い物内容を保存せず、銀行にも接続しません。',remaining:'残額',total:'予算の使用率'},
    ar:{brand:'CART BUDGET',heading:'اعرف ما تبقّى قبل الدفع.',sub:'حدّد ميزانيتك. أضف الأسعار. واعرف ما تبقّى.',left:'المتبقي للإنفاق',over:'تجاوزت الميزانية',budget:'الميزانية',inCart:'في السلة',add:'إضافة',item:'اسم المنتج (اختياري)',price:'السعر ($)',budgetInput:'ميزانية التسوق ($)',sample:'سلتك',clear:'إعادة المثال',rice:'أرز',produce:'خضار',essentials:'مستلزمات',store:'عرضه على App Store',tip:'جرّب إضافة سعر أو تغيير الميزانية أو حذف منتج.',invalid:'أدخل سعرًا صحيحًا أكبر من صفر.',badBudget:'أدخل ميزانية صحيحة أكبر من صفر.',empty:'السلة فارغة.',fallback:'منتج جديد',remove:'حذف',note:'القيم بالدولار الأمريكي لأغراض التوضيح فقط. لا يحفظ هذا العرض أي تفاصيل ولا يتصل بحسابات مصرفية.',remaining:'المتبقي',total:'المستخدم من الميزانية'}
  };
  const startItems=[{id:1,key:'rice',value:14.80,glyph:'◈'},{id:2,key:'produce',value:22.65,glyph:'✿'},{id:3,key:'essentials',value:42.00,glyph:'▣'}];
  let items=startItems.map(x=>({...x})), nextId=4;
  const el=document.createElement('section');
  el.id=ROOT;el.className='cb171';el.setAttribute('aria-labelledby','cb171-title');
  el.innerHTML=`
  <div class="cb171-nav"><span class="cb171-logo" aria-hidden="true">▰</span><strong data-cb171="brand">CART BUDGET</strong><span class="cb171-navline"></span><a href="#cb171-demo" data-cb171="sample">Your cart</a></div>
  <div class="cb171-cols">
   <div class="cb171-intro"><div class="cb171-kicker">SMARTER SHOPPING · LESS GUESSWORK</div><h2 id="cb171-title" data-cb171="heading"></h2><p class="cb171-sub" data-cb171="sub"></p><a id="cb171-store" class="cb171-cta" href="https://apps.apple.com/us/app/id6802814389" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">●</span><span data-cb171="store"></span><span aria-hidden="true">›</span></a><div class="cb171-art" aria-hidden="true"><span class="cb171-loaf">◖</span><span class="cb171-leaf">❧</span><span class="cb171-orange">●</span><div class="cb171-bag"></div></div></div>
   <div class="cb171-panel" id="cb171-demo">
    <div class="cb171-remaining" id="cb171-remaining-wrap"><span id="cb171-remaining-label" data-cb171="left"></span><strong id="cb171-remaining" aria-live="polite" dir="ltr">$40.55</strong><span class="cb171-sparks" aria-hidden="true">✧</span></div>
    <div class="cb171-ticket"><div class="cb171-totals"><label><span data-cb171="budget"></span><span class="cb171-budget-input"><span aria-hidden="true">$</span><input id="cb171-budget" type="number" inputmode="decimal" min="0.01" max="99999999" step="0.01" value="120" aria-label="Shopping budget ($)"></span></label><div><span data-cb171="inCart"></span><strong id="cb171-total" dir="ltr">$79.45</strong></div></div>
    <div class="cb171-progress" role="progressbar" id="cb171-progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="66" aria-label="Budget used"><span id="cb171-progress-fill"></span></div><div id="cb171-percent" class="cb171-percent" dir="ltr">66%</div>
    <div class="cb171-listtitle"><strong data-cb171="sample"></strong><button type="button" id="cb171-reset" data-cb171="clear"></button></div>
    <ul class="cb171-list" id="cb171-list"></ul>
    <form id="cb171-add-form" class="cb171-form" novalidate><label class="cb171-sr" for="cb171-item" data-cb171="item"></label><input id="cb171-item" type="text" maxlength="40" autocomplete="off" placeholder="Item name (optional)"><label class="cb171-sr" for="cb171-price" data-cb171="price"></label><input id="cb171-price" type="number" inputmode="decimal" min="0.01" max="99999999" step="0.01" placeholder="Price ($)" required><button type="submit" id="cb171-add" data-cb171="add">Add</button></form>
    <p class="cb171-msg" id="cb171-message" role="status" aria-live="polite"></p>
    </div>
   </div>
  </div>
  <p class="cb171-note" data-cb171="note"></p>`;
  const $=s=>el.querySelector(s);
  const money=n=>(n<0?'−':'')+'$'+new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}).format(Math.abs(n));
  const lang=()=>{const raw=(document.getElementById('p199-language')?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();return raw.startsWith('ja')?'ja':raw.startsWith('ar')?'ar':'en';};
  const region=()=>{const raw=(document.getElementById('p199-country')?.value||'us').toLowerCase();return /^[a-z]{2}$/.test(raw)?raw:'us';};
  const isValid=n=>Number.isFinite(n)&&n>0&&n<=99999999;
  function render(){
    const w=dict[lang()], b=$('#cb171-budget').value.trim()===''?NaN:Number($('#cb171-budget').value), total=items.reduce((n,x)=>n+x.value,0);
    const valid=isValid(b),remaining=valid?b-total:NaN, percent=valid?total/b*100:0;
    $('#cb171-remaining-wrap').classList.toggle('cb171-over',valid&&remaining<-.005);
    $('#cb171-remaining-label').textContent=valid&&remaining<-.005?w.over:w.left;
    $('#cb171-remaining').textContent=valid?money(remaining):'—';
    $('#cb171-total').textContent=money(total);
    $('#cb171-percent').textContent=valid?Math.round(percent)+'%':'—';
    $('#cb171-progress-fill').style.width=(valid?Math.min(100,Math.max(0,percent)):0)+'%';
    $('#cb171-progress').setAttribute('aria-valuenow',String(valid?Math.min(100,Math.round(percent)):0));
    $('#cb171-progress').setAttribute('aria-label',w.total);
    $('#cb171-budget').setAttribute('aria-invalid',String(!valid));
    const list=$('#cb171-list');list.replaceChildren();
    if(!items.length){const empty=document.createElement('li');empty.className='cb171-empty';empty.textContent=w.empty;list.append(empty);}
    for(const item of items){const row=document.createElement('li');row.className='cb171-listrow';
      const glyph=document.createElement('span');glyph.className='cb171-rowicon';glyph.textContent=item.glyph;
      const name=document.createElement('span');name.className='cb171-rowname';name.textContent=item.key?w[item.key]:item.label;
      const val=document.createElement('strong');val.className='cb171-rowprice';val.dir='ltr';val.textContent=money(item.value);
      const remove=document.createElement('button');remove.type='button';remove.className='cb171-remove';remove.textContent='×';remove.setAttribute('aria-label',w.remove+': '+name.textContent);
      remove.addEventListener('click',()=>{items=items.filter(x=>x.id!==item.id);render();});row.append(glyph,name,val,remove);list.append(row);}
    if(!valid)$('#cb171-message').textContent=w.badBudget;
    else if($('#cb171-message').dataset.kind==='budget')$('#cb171-message').textContent='';
  }
  function translate(){const w=dict[lang()];el.lang=lang();el.dir=lang()==='ar'?'rtl':'ltr';
    el.querySelectorAll('[data-cb171]').forEach(x=>{x.textContent=w[x.dataset.cb171]||'';});
    $('#cb171-item').placeholder=w.item;$('#cb171-price').placeholder=w.price;
    $('#cb171-budget').setAttribute('aria-label',w.budgetInput);
    $('#cb171-store').href='https://apps.apple.com/'+region()+'/app/id'+APP;
    render();
  }
  $('#cb171-budget').addEventListener('input',()=>{$('#cb171-message').dataset.kind='budget';render();});
  $('#cb171-add-form').addEventListener('submit',event=>{event.preventDefault();const p=$('#cb171-price');const n=p.value.trim()===''?NaN:Number(p.value);const w=dict[lang()];
    if(!isValid(n)){$('#cb171-message').textContent=w.invalid;$('#cb171-message').dataset.kind='price';p.focus();return;}
    const label=$('#cb171-item').value.trim().slice(0,40)||w.fallback;items.push({id:nextId++,label,value:Math.round(n*100)/100,glyph:'✦'});
    $('#cb171-item').value='';p.value='';$('#cb171-message').textContent='';$('#cb171-message').dataset.kind='';render();$('#cb171-item').focus();
  });
  $('#cb171-reset').addEventListener('click',()=>{items=startItems.map(x=>({...x}));nextId=4;$('#cb171-budget').value='120';$('#cb171-item').value='';$('#cb171-price').value='';$('#cb171-message').textContent='';$('#cb171-message').dataset.kind='';render();});
  const anchor=document.querySelector('.p19-breadcrumb');if(anchor)anchor.insertAdjacentElement('afterend',el);
  else{const main=document.querySelector('#p199-content')||document.querySelector('main');main?.parentNode?.insertBefore(el,main);}
  if(!el.isConnected)return;
  document.body.classList.add('cb171-ready');translate();
  document.getElementById('p199-language')?.addEventListener('change',translate);
  document.getElementById('p199-country')?.addEventListener('change',()=>{$('#cb171-store').href='https://apps.apple.com/'+region()+'/app/id'+APP;});
  new MutationObserver(ch=>{if(ch.some(x=>x.attributeName==='lang'))translate();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
