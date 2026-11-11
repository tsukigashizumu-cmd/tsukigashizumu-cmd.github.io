/* TSZ LP R135 — Cart Budget preview. Local website-only demonstration. No storage, analytics, network or app integration. */
(()=>{
  'use strict';
  const ID='tsz-cb135', APP_ID='6802814389';
  const COPY={
    en:{eyebrow:'CART BUDGET / KNOW BEFORE CHECKOUT',pill:'INTERACTIVE WEBSITE EXAMPLE',title:'Can the next item fit?',lead:'You have a limit and a few items already in the cart. Try another price before you add it. See what remains—or how far over budget you would go.',budget:'Shopping budget',already:'Already in your cart',food:'Groceries',home:'Household supplies',total:'Already spent',available:'Still available',candidate:'Next item to consider',price:'Item price',preview:'Check before adding',add:'Add this item to the sample cart',undo:'Undo last addition',reset:'Reset website example',wouldRemain:'Left after adding',wouldOver:'Over budget by',fits:'Within your budget',over:'Exceeds your budget',added:'Item added to the sample cart.',undone:'Last addition undone.',start:'Preview a price before placing one more item in the cart.',badBudget:'Enter a budget above 0 and up to 100,000.',badPrice:'Enter an item price above 0 and up to 100,000.',nothing:'Nothing to undo yet.',count:'Items in cart',foot:'Website-only example. Values are illustrative. No purchases, storage, tracking, or connection to the app.',info:'The amount left updates only when you add the item in this example.',unit:'USD example',edit:'Change the budget or next item price to try another decision.'},
    ja:{eyebrow:'CART BUDGET / レジ前の残額を知る',pill:'LP専用・操作デモ',title:'その1品、まだ予算に入る？',lead:'予算を決め、すでにカートに入れた金額から残りを計算。次の商品を入れる前に、残額か予算超過かを試せます。',budget:'今回の買い物予算',already:'カートに入れたもの',food:'食品',home:'日用品',total:'現在の合計',available:'あと使える金額',candidate:'次に入れたい商品',price:'追加する商品の価格',preview:'追加前に確認',add:'この商品をカートに追加',undo:'最後の追加を取り消す',reset:'LPデモを初期化',wouldRemain:'追加した後の残額',wouldOver:'予算オーバー',fits:'予算内に収まります',over:'予算を超えます',added:'LPデモのカートに追加しました。',undone:'最後の追加を取り消しました。',start:'次の商品の価格を入力して、追加する前に確認できます。',badBudget:'予算は0より大きく100,000以下で入力してください。',badPrice:'価格は0より大きく100,000以下で入力してください。',nothing:'まだ取り消す追加はありません。',count:'カートの商品数',foot:'LP内だけの説明用サンプルです。購入・保存・追跡・アプリ連携はありません。',info:'このデモでは、商品を追加したときだけ残額を更新します。',unit:'USDの架空サンプル',edit:'予算や商品価格を変えて試せます。'},
    ar:{eyebrow:'CART BUDGET / اعرف المتبقي قبل الدفع',pill:'مثال تفاعلي على الموقع فقط',title:'هل يتسع الباقي لمنتج آخر؟',lead:'ضع ميزانية للتسوق وشاهد ما تبقى بعد المنتجات الموجودة في السلة. جرّب سعر المنتج التالي قبل إضافته.',budget:'ميزانية التسوق',already:'موجود بالفعل في السلة',food:'مواد غذائية',home:'مستلزمات منزلية',total:'المصروف حتى الآن',available:'المبلغ المتبقي',candidate:'المنتج التالي',price:'سعر المنتج',preview:'تحقق قبل الإضافة',add:'أضف إلى سلة المثال',undo:'التراجع عن آخر إضافة',reset:'إعادة ضبط المثال',wouldRemain:'المتبقي بعد الإضافة',wouldOver:'تجاوز الميزانية بمقدار',fits:'ضمن الميزانية',over:'يتجاوز الميزانية',added:'أُضيف المنتج إلى سلة المثال.',undone:'تم التراجع عن آخر إضافة.',start:'تحقق من السعر قبل إضافة المنتج التالي.',badBudget:'أدخل ميزانية أكبر من صفر ولا تتجاوز 100,000.',badPrice:'أدخل سعرًا أكبر من صفر ولا يتجاوز 100,000.',nothing:'لا توجد إضافة للتراجع عنها بعد.',count:'عدد العناصر في السلة',foot:'مثال على الموقع فقط. لا شراء أو حفظ أو تتبع أو ربط بالتطبيق.',info:'يتغير المبلغ المتبقي عند إضافة المنتج في هذا المثال فقط.',unit:'مثال توضيحي بالدولار',edit:'جرّب تعديل الميزانية أو سعر المنتج.'}
  };
  function locale(){const picker=document.getElementById('p199-language');const raw=(picker?.value||document.documentElement.lang||navigator.language||'en').toLowerCase();return raw.startsWith('ar')?'ar':raw.startsWith('ja')?'ja':'en';}
  function money(value){const n=Number(value);return (n<0?'−':'')+'$'+Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});}
  function mount(){
    if(document.getElementById(ID)||!document.body)return;
    const current=document.body.dataset.p199Id||document.body.dataset.p19AppId||'';
    if(current&&current!==APP_ID)return;
    if(!current&&!document.querySelector(`a[href*="${APP_ID}"]`)&&!document.querySelector(`link[rel="canonical"][href*="${APP_ID}"]`))return;
    const host=document.getElementById('overview')||document.querySelector('main');if(!host)return;
    const root=document.createElement('section');root.id=ID;root.setAttribute('aria-labelledby','cb135-title');root.dataset.websiteOnly='true';
    root.innerHTML=`<div class="cb135-top"><span data-t="eyebrow"></span><span class="cb135-pill" data-t="pill"></span></div>
      <header class="cb135-head"><h2 id="cb135-title" data-t="title"></h2><p data-t="lead"></p></header>
      <div class="cb135-layout">
        <div class="cb135-left"><div class="cb135-inputrow"><label for="cb135-budget" data-t="budget"></label><input id="cb135-budget" type="number" inputmode="decimal" step="0.01" min="0.01" max="100000" value="100"></div>
          <div class="cb135-items"><h3 data-t="already"></h3><div class="cb135-item"><span data-t="food"></span><strong>$38.00</strong></div><div class="cb135-item"><span data-t="home"></span><strong>$27.00</strong></div><div data-added class="cb135-added" aria-live="polite"></div></div>
          <div class="cb135-total"><span data-t="total"></span><strong data-out="spent">$65.00</strong></div>
          <div class="cb135-inputrow cb135-next"><label for="cb135-price" data-t="price"></label><input id="cb135-price" type="number" inputmode="decimal" step="0.01" min="0.01" max="100000" value="28"></div>
          <button data-action="preview" type="button" class="cb135-preview" data-t="preview"></button><p class="cb135-hint" data-t="edit"></p></div>
        <div class="cb135-right"><div class="cb135-remaining"><span data-t="available"></span><strong data-out="remaining">$35.00</strong><div class="cb135-meter" aria-hidden="true"><span data-meter></span></div><small data-t="unit"></small></div>
          <div class="cb135-outcome" data-outcome><span data-out="heading"></span><strong data-out="forecast"></strong><p data-out="status" role="status" aria-live="polite"></p></div>
          <div class="cb135-actions"><button data-action="add" type="button" class="cb135-primary" data-t="add"></button><button data-action="undo" type="button" data-t="undo"></button><button data-action="reset" type="button" data-t="reset"></button></div><p class="cb135-error" data-error role="alert" hidden></p><p class="cb135-note" data-t="info"></p></div></div>
        <footer><span data-t="foot"></span><span class="cb135-serial">CB / R135</span></footer>`;
    if(host.id==='overview')host.insertAdjacentElement('afterend',root);else host.prepend(root);
    const get=s=>root.querySelector(s);
    let additions=[],previewed=false,noticeKey='start',errorKey='',prevLocale='';
    function inputs(){const b=Number(get('#cb135-budget').value),p=Number(get('#cb135-price').value);return {b,p,validBudget:Number.isFinite(b)&&b>0&&b<=100000,validPrice:Number.isFinite(p)&&p>0&&p<=100000};}
    function draw(){
      const lang=locale(),t=COPY[lang];prevLocale=lang;root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(el=>el.textContent=t[el.dataset.t]||'');
      const {b,p,validBudget,validPrice}=inputs(),spent=65+additions.reduce((sum,entry)=>sum+entry,0),remaining=validBudget?b-spent:NaN;
      get('[data-out="spent"]').textContent=money(spent);
      get('[data-out="remaining"]').textContent=validBudget?money(remaining):'—';
      get('[data-meter]').style.width=validBudget?(Math.max(0,Math.min(100,spent/b*100))+'%'):'0%';
      get('[data-added]').replaceChildren();
      for(let i=0;i<additions.length;i++){
        const el=document.createElement('div');el.className='cb135-item cb135-extra';
        const title=document.createElement('span');title.textContent=t.candidate+' '+(i+1);
        const value=document.createElement('strong');value.textContent=money(additions[i]);el.append(title,value);get('[data-added]').append(el);
      }
      get('[data-out="heading"]').textContent=previewed&&validBudget&&validPrice?((b-spent-p)<0?t.wouldOver:t.wouldRemain):t.candidate;
      get('[data-out="forecast"]').textContent=previewed&&validBudget&&validPrice?money(Math.abs(b-spent-p)):'—';
      const over=validBudget&&validPrice&&((b-spent-p)<-0.000001);
      get('[data-outcome]').dataset.state=previewed?(over?'over':'fits'):'idle';
      get('[data-out="status"]').textContent=previewed?(over?t.over:t.fits):(t[noticeKey]||t.start);
      get('[data-action="add"]').disabled=!previewed||!validBudget||!validPrice;
      get('[data-action="undo"]').disabled=additions.length===0;
      const err=get('[data-error]');err.hidden=!errorKey;err.textContent=errorKey?t[errorKey]:'';
      root.dataset.previewed=String(previewed);root.dataset.added=String(additions.length);root.dataset.over=String(previewed&&over);root.dataset.remaining=validBudget?remaining.toFixed(2):'';
    }
    function validation(){const v=inputs();if(!v.validBudget){errorKey='badBudget';previewed=false;draw();return false;}if(!v.validPrice){errorKey='badPrice';previewed=false;draw();return false;}errorKey='';return true;}
    root.addEventListener('click',event=>{
      const button=event.target.closest('[data-action]');if(!button||!root.contains(button))return;
      const action=button.dataset.action;
      if(action==='preview'){if(!validation())return;previewed=true;noticeKey='start';}
      if(action==='add'){if(!validation()||!previewed)return;additions.push(inputs().p);previewed=false;noticeKey='added';}
      if(action==='undo'){if(additions.length){additions.pop();noticeKey='undone';errorKey='';previewed=false;}else{errorKey='nothing';}}
      if(action==='reset'){additions=[];get('#cb135-budget').value='100';get('#cb135-price').value='28';previewed=false;noticeKey='start';errorKey='';}
      draw();
    });
    for(const selector of ['#cb135-budget','#cb135-price'])get(selector).addEventListener('input',()=>{previewed=false;errorKey='';noticeKey='start';draw();});
    document.getElementById('p199-language')?.addEventListener('change',draw);
    new MutationObserver(()=>{if(prevLocale!==locale())draw()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    draw();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
