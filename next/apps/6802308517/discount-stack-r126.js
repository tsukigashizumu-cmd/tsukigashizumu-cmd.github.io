/* TSZ LP R126 — Discount Stack / two named scenarios to recall and compare.
   LP-only demonstration: memory-only, no requests, no storage, no app emulation. */
(() => {
  'use strict';
  const APP_ID = '6802308517';
  const L10N = {
    en: {
      kicker:'WHAT A SAVED DISCOUNT REALLY MEANS', pill:'INTERACTIVE LP EXAMPLE', title:'Same shelf price. Two offers. One better checkout.',
      lead:'Recall either named example, change the second discount, then compare estimated totals. A 30% discount followed by 20% is 44% off—not 50%.',
      sample:'SAVED EXAMPLES (THIS PAGE ONLY)', chooseA:'Recall offer A', chooseB:'Recall offer B', nameA:'Store A · two offers', nameB:'Store B · two offers',
      editor:'EDIT THE SELECTED OFFER', label:'Offer name', price:'Shelf price', first:'First discount (%)', second:'Second discount (%)', tax:'Tax (%)',
      save:'Update this example', quick:'Set B’s second discount to 10%', reset:'Reset examples', result:'COMPARE THE PAYMENT', a:'Store A', b:'Store B',
      effective:'Equivalent discount', after:'Final price incl. tax', win:'Lower estimated payment', aWin:'Offer A costs less',bWin:'Offer B costs less',tie:'Both cost the same',
      delta:'Difference', error:'Enter a name and valid amounts: price above 0, discounts from 0–100%, tax from 0–100%.',
      pending:'You are editing a draft. Select “Update this example” to compare the new numbers.', saved:'Example updated. No data was stored on your device.',
      formula:'Successive discounts: price × (1−discount 1) × (1−discount 2), then × (1+tax).',
      note:'Website-only, illustrative numbers. The app supports named saves, search and reuse; this page does not store a history, issue a tax quote or send data. Real coupons and tax rules vary.'
    },
    ja: {
      kicker:'保存した割引条件を、もう一度試す', pill:'LP専用・操作デモ', title:'同じ定価。2つの割引条件。会計額で比べる。',
      lead:'名前付きの計算例を呼び出し、2回目の割引を編集し、支払見込み額を比べます。30%引きの後に20%引きは、50%引きではなく44%引きです。',
      sample:'保存例（このページ内だけ）', chooseA:'条件Aを呼び出す', chooseB:'条件Bを呼び出す', nameA:'店舗A・重ね割引', nameB:'店舗B・重ね割引',
      editor:'選んだ条件を編集', label:'条件の名前', price:'定価', first:'1回目の割引（%）', second:'2回目の割引（%）',tax:'税率（%）',
      save:'この条件を更新', quick:'Bの2回目を10%にする', reset:'初期値に戻す', result:'支払見込み額で比較', a:'店舗A',b:'店舗B',
      effective:'実質割引率',after:'割引・税込みの金額',win:'支払額が低い方',aWin:'条件Aの方が安い',bWin:'条件Bの方が安い',tie:'支払額は同じ',
      delta:'差額',error:'条件名と数値を確認してください。定価は0より大きく、割引率・税率は0〜100%で入力してください。',
      pending:'編集中です。「この条件を更新」を押すと比較結果に反映されます。',saved:'条件を更新しました。端末への保存は行っていません。',
      formula:'計算：定価 ×（1−割引①）×（1−割引②）×（1＋税率）。割引率は単純に足しません。',
      note:'これはLP専用の説明用デモです。アプリは計算に名前を付けて保存・検索・再利用できますが、このページに保存履歴はなく、端末への永続保存・データ送信もありません。税金やクーポン適用条件は店舗により異なります。'
    },
    ar: {
      kicker:'استرجع عروض الخصم وقارنها',pill:'تجربة تفاعلية على الموقع فقط',title:'السعر الأصلي نفسه. عرضان. المبلغ النهائي يحدد الأفضل.',
      lead:'استرجع مثالاً مسمى، وعدّل الخصم الثاني، ثم قارن الإجمالي. خصم 30% ثم 20% يساوي 44% وليس 50%.',
      sample:'أمثلة محفوظة في هذه الصفحة فقط',chooseA:'استرجاع العرض أ',chooseB:'استرجاع العرض ب',nameA:'المتجر أ · خصمان',nameB:'المتجر ب · خصمان',
      editor:'تعديل العرض المختار',label:'اسم العرض',price:'السعر الأساسي',first:'الخصم الأول (%)',second:'الخصم الثاني (%)',tax:'الضريبة (%)',
      save:'تحديث هذا المثال',quick:'اجعل الخصم الثاني للعرض ب 10%',reset:'إعادة الأمثلة',result:'قارن المبلغ النهائي',a:'المتجر أ',b:'المتجر ب',
      effective:'الخصم الفعلي',after:'المبلغ بعد الخصمين والضريبة',win:'الأقل تكلفة',aWin:'العرض أ أوفر',bWin:'العرض ب أوفر',tie:'التكلفة متساوية',
      delta:'الفرق',error:'أدخل اسماً وأرقاماً صحيحة: السعر أكبر من صفر والخصومات والضريبة بين 0 و100%.',
      pending:'أنت تعدّل مسودة. اضغط «تحديث هذا المثال» لتطبيق التعديل.',saved:'تم تحديث المثال. لا يتم حفظ أي بيانات على الجهاز.',
      formula:'الحساب: السعر × (1−الخصم الأول) × (1−الخصم الثاني) × (1+الضريبة). لا تُجمع نسب الخصم.',
      note:'مثال توضيحي على الموقع فقط، وليس شاشة التطبيق أو فاتورة. يدعم التطبيق حفظ الحسابات بأسماء والبحث عنها وإعادة استخدامها. لا تُحفظ بيانات الصفحة ولا تُرسل. شروط الضريبة والقسائم تختلف.'
    }
  };
  const INITIAL = [
    { label:'Store A · two offers', price:100, first:30, second:20, tax:8 },
    { label:'Store B · two offers', price:100, first:40, second:5, tax:8 }
  ];
  function getLanguage(){
    const lang=String(document.getElementById('p199-language')?.value || document.documentElement.lang || 'en').toLowerCase().split(/[-_]/)[0];
    return L10N[lang]?lang:'en';
  }
  function format(n,lang,places=2){
    return new Intl.NumberFormat(lang==='ja'?'ja-JP':lang==='ar'?'ar-EG':'en-US',
      {minimumFractionDigits:places,maximumFractionDigits:places}).format(n);
  }
  function mount(){
    if(document.getElementById('tsz-ds126'))return;
    const body=document.body;if(!body)return;
    const id=body.dataset.p199Id||body.dataset.p19AppId||'';
    if(id&&id!==APP_ID)return;
    if(!id&&!document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor=document.getElementById('tsz-ds90')||document.getElementById('tsz-ds48')||document.getElementById('overview');
    const main=document.querySelector('main');if(!anchor&&!main)return;
    const root=document.createElement('section');root.id='tsz-ds126';
    root.dataset.illustration='website-only-named-discount-compare';
    root.setAttribute('aria-label','Compare two named stacked discount examples');
    root.innerHTML=`<div class="ds126-top"><span data-t="kicker"></span><span class="ds126-pill" data-t="pill"></span></div>
      <h2 data-t="title"></h2><p class="ds126-lead" data-t="lead"></p>
      <div class="ds126-chooser"><div class="ds126-small" data-t="sample"></div><div class="ds126-choices">
        <button type="button" data-select="0" data-t="chooseA" aria-pressed="true"></button>
        <button type="button" data-select="1" data-t="chooseB" aria-pressed="false"></button></div></div>
      <div class="ds126-editor"><h3 data-t="editor"></h3><div class="ds126-fields">
        <label class="ds126-wide"><span data-t="label"></span><input data-field="label" type="text" maxlength="64" autocomplete="off"></label>
        <label><span data-t="price"></span><input data-field="price" type="number" inputmode="decimal" min="0.01" max="10000000" step="any"></label>
        <label><span data-t="first"></span><input data-field="first" type="number" inputmode="decimal" min="0" max="100" step="any"></label>
        <label><span data-t="second"></span><input data-field="second" type="number" inputmode="decimal" min="0" max="100" step="any"></label>
        <label><span data-t="tax"></span><input data-field="tax" type="number" inputmode="decimal" min="0" max="100" step="any"></label>
      </div><div class="ds126-actions"><button type="button" data-save data-t="save"></button><button type="button" data-quick data-t="quick"></button><button type="button" data-reset data-t="reset"></button></div>
      <p class="ds126-message" data-out="status" aria-live="polite"></p><p class="ds126-error" data-out="error" role="status" hidden></p></div>
      <div class="ds126-result"><div class="ds126-small" data-t="result"></div><div class="ds126-columns">
       <article data-option="0"><div class="ds126-opt-name" data-out="name-a"></div><span data-t="effective"></span><b data-out="discount-a"></b><span data-t="after"></span><strong data-out="total-a"></strong></article>
       <article data-option="1"><div class="ds126-opt-name" data-out="name-b"></div><span data-t="effective"></span><b data-out="discount-b"></b><span data-t="after"></span><strong data-out="total-b"></strong></article>
      </div><div class="ds126-win"><span data-t="win"></span><strong data-out="winner"></strong><span data-t="delta"></span><b data-out="delta"></b></div></div>
      <p class="ds126-formula" data-t="formula"></p><p class="ds126-note" data-t="note"></p>`;
    if(anchor)anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    const input=(k)=>root.querySelector(`[data-field="${k}"]`);
    const out=(k,v)=>{root.querySelector(`[data-out="${k}"]`).textContent=String(v);};
    const copy=(x)=>({...x});let saved=INITIAL.map(copy);let selected=0;let langSeen='';let dirty=false;let notice='';
    function localizedName(idx,lang){return saved[idx].label===INITIAL[idx].label ? L10N[lang][idx===0?'nameA':'nameB'] : saved[idx].label;}
    function setDraft(){const x=saved[selected];for(const k of ['label','price','first','second','tax'])input(k).value=k==='label'?localizedName(selected,getLanguage()):String(x[k]);dirty=false;notice='';}
    function valid(x){return typeof x.label==='string'&&x.label.trim().length>0&&x.label.trim().length<=64&&
      Number.isFinite(x.price)&&x.price>0&&x.price<=1e7&&
      ['first','second','tax'].every(k=>Number.isFinite(x[k])&&x[k]>=0&&x[k]<=100);}
    function fromForm(){const x={label:input('label').value.trim()};for(const k of ['price','first','second','tax']){
      const node=input(k);if(node.value.trim()==='')return null;x[k]=Number(node.value);
    }return valid(x)?x:null;}
    function calc(x){if(!valid(x))return null;
      const actual=x.price*(1-x.first/100)*(1-x.second/100)*(1+x.tax/100);
      const discount=(1-(1-x.first/100)*(1-x.second/100))*100;
      return Number.isFinite(actual)&&Number.isFinite(discount)?{actual,discount}:null;}
    function render(){
      const lang=getLanguage(),t=L10N[lang];root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(node=>{node.textContent=t[node.dataset.t]||'';});
      for(const b of root.querySelectorAll('[data-select]'))b.setAttribute('aria-pressed',String(+b.dataset.select===selected));
      const a=calc(saved[0]),b=calc(saved[1]);
      out('name-a',localizedName(0,lang));out('name-b',localizedName(1,lang));
      out('discount-a',a?format(a.discount,lang,1)+'%':'—');out('discount-b',b?format(b.discount,lang,1)+'%':'—');
      out('total-a',a?format(a.actual,lang):'—');out('total-b',b?format(b.actual,lang):'—');
      const which=a&&b?(Math.abs(a.actual-b.actual)<1e-8?'tie':a.actual<b.actual?'a':'b'):'invalid';
      root.dataset.winner=which;
      out('winner',which==='a'?t.aWin:which==='b'?t.bWin:which==='tie'?t.tie:'—');
      out('delta',a&&b?format(Math.abs(a.actual-b.actual),lang):'—');
      const err=root.querySelector('[data-out="error"]');err.hidden=notice!=='error';err.textContent=notice==='error'?t.error:'';
      out('status',notice==='saved'?t.saved:dirty?t.pending:'');langSeen=lang;
    }
    root.querySelectorAll('[data-field]').forEach(el=>el.addEventListener('input',()=>{dirty=true;notice='';render();}));
    root.querySelectorAll('[data-select]').forEach(el=>el.addEventListener('click',()=>{selected=Number(el.dataset.select);setDraft();render();}));
    root.querySelector('[data-save]').addEventListener('click',()=>{const x=fromForm();if(!x){notice='error';render();return;}saved[selected]=copy(x);dirty=false;notice='saved';render();});
    root.querySelector('[data-quick]').addEventListener('click',()=>{selected=1;setDraft();input('second').value='10';dirty=true;notice='';render();});
    root.querySelector('[data-reset]').addEventListener('click',()=>{saved=INITIAL.map(copy);selected=0;setDraft();render();});
    document.getElementById('p199-language')?.addEventListener('change',render);
    if(typeof MutationObserver==='function')new MutationObserver(()=>{if(getLanguage()!==langSeen)render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    setDraft();render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
