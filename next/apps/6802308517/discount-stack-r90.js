/* TSZ LP R90 | Discount Stack | In-page named scenario preview; no persistent storage. */
(()=>{
  'use strict';
  const ROOT='tsz-discount-stack-r90';
  const COPY={
    en:{eyebrow:'DISCOUNT STACK · INTERACTIVE EXAMPLE',headline:'Keep a calculation you can revisit.',sub:'Name a discount scenario, change the numbers, then open an earlier example to compare. All data disappears when you leave this page.',name:'Scenario name',price:'Original price',first:'First discount (%)',second:'Second discount (%)',tax:'Optional tax (%)',preview:'Estimated checkout amount',effective:'Actual combined discount',math:'Calculated in order',save:'Keep in this demo',search:'Find an example',saved:'Temporary examples',none:'No matching examples',reset:'Reset demonstration',edit:'Open',total:'After tax',after1:'After first discount',after2:'After second discount',bad:'Enter a name and valid nonnegative numbers. Discounts and tax must be 0–100%.',kept:'Saved temporarily in this page',opened:'Opened example',example1:'Weekend basket',example2:'Household essentials',foot:'Illustration only; not the app interface. Nothing is sent or stored outside this browser page. Refreshing clears this demonstration. The actual app can save and search calculations on your device. Currency changes in the actual app are not exchange-rate conversions.',money:'illustrative units',hint:'Try changing 30% then 20% to see why the combined discount is 44%, not 50%.',count:'Example count'},
    ja:{eyebrow:'Discount Stack · 操作サンプル',headline:'計算条件に名前を付けて、あとから比べる。',sub:'割引条件を保存したつもりで、名前から探して開き直す流れを試せます。ページを離れるとデモの内容は消えます。',name:'計算条件の名前',price:'割引前の価格',first:'1回目の割引（%）',second:'2回目の割引（%）',tax:'仮の税率（%）',preview:'参考支払額',effective:'実際の連続割引率',math:'計算の順番',save:'このデモ内で一時保存',search:'名前で探す',saved:'一時的な計算例',none:'一致する例はありません',reset:'デモを初期化',edit:'開く',total:'税計算後',after1:'1回目の割引後',after2:'2回目の割引後',bad:'名前と正しい金額を入力してください。割引・税率は0〜100%です。',kept:'このページ内だけで一時保存しました',opened:'計算例を開きました',example1:'週末の買い物',example2:'日用品のまとめ買い',foot:'説明用デモであり、実アプリ画面ではありません。入力は送信されず、このページを再読み込みすると消えます。実アプリには端末内で計算条件を保存・検索する機能があります。通貨切替は為替換算ではありません。',money:'説明用の金額単位',hint:'30%引きの後に20%引きなら、合計50%引きではなく44%引きになります。',count:'保存例'},
    ar:{eyebrow:'Discount Stack · مثال تفاعلي',headline:'سمِّ حساب الخصم وارجع إليه للمقارنة.',sub:'جرّب تسمية الحساب والبحث عنه وإعادة فتحه. تختفي بيانات المثال عند مغادرة الصفحة.',name:'اسم الحساب',price:'السعر الأصلي',first:'الخصم الأول (%)',second:'الخصم الثاني (%)',tax:'الضريبة الافتراضية (%)',preview:'المبلغ المتوقع للدفع',effective:'الخصم المركب الفعلي',math:'النتائج بالترتيب',save:'حفظ مؤقت في المثال',search:'البحث بالاسم',saved:'أمثلة مؤقتة',none:'لا توجد نتائج مطابقة',reset:'إعادة ضبط المثال',edit:'فتح',total:'بعد الضريبة',after1:'بعد الخصم الأول',after2:'بعد الخصم الثاني',bad:'أدخل اسماً وأرقاماً صحيحة. الخصومات والضريبة من 0 إلى 100%.',kept:'تم الحفظ مؤقتاً في هذه الصفحة',opened:'تم فتح المثال',example1:'سلة نهاية الأسبوع',example2:'مستلزمات المنزل',foot:'هذا مثال توضيحي وليس واجهة التطبيق. لا تُرسل البيانات ولا تُحفظ خارج الصفحة، وتختفي عند التحديث. يمكن للتطبيق الفعلي حفظ الحسابات والبحث عنها على جهازك. تغيير العملة ليس تحويلاً لسعر الصرف.',money:'وحدات افتراضية',hint:'خصم 30% ثم 20% يساوي خصماً مركباً 44% وليس 50%.',count:'عدد الأمثلة'}
  };
  const lang=()=>{const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en';};
  function start(){
    if(document.getElementById(ROOT))return;
    const host=document.querySelector('main')||document.body;
    if(!host)return;
    const s=document.createElement('section');s.id=ROOT;
    s.innerHTML=`<div class="r90-wrap"><header><span class="r90-kicker" data-i="eyebrow"></span><h2 data-i="headline"></h2><p data-i="sub"></p></header><div class="r90-layout"><div class="r90-panel"><div class="r90-inputs"><label><span data-i="name"></span><input id="r90-name" maxlength="56" autocomplete="off"></label><label><span data-i="price"></span><input id="r90-price" type="number" min="0" max="99999999" step="any" inputmode="decimal"></label><label><span data-i="first"></span><input id="r90-first" type="number" min="0" max="100" step="any" inputmode="decimal"></label><label><span data-i="second"></span><input id="r90-second" type="number" min="0" max="100" step="any" inputmode="decimal"></label><label><span data-i="tax"></span><input id="r90-tax" type="number" min="0" max="100" step="any" inputmode="decimal"></label></div><div class="r90-result" aria-live="polite"><small data-i="preview"></small><strong id="r90-total"></strong><div><span data-i="effective"></span><b id="r90-effective"></b></div><ol id="r90-math"></ol><p id="r90-error" role="status"></p></div><div class="r90-actions"><button id="r90-save" type="button" data-i="save"></button><button id="r90-reset" type="button" class="r90-secondary" data-i="reset"></button></div><p class="r90-feedback" id="r90-feedback" role="status" aria-live="polite"></p></div><aside class="r90-panel r90-history"><div class="r90-historytop"><h3 data-i="saved"></h3><span id="r90-count"></span></div><label><span data-i="search"></span><input id="r90-search" autocomplete="off" type="search"></label><div id="r90-items" class="r90-items"></div></aside></div><p class="r90-hint" data-i="hint"></p><p class="r90-foot" data-i="foot"></p></div>`;
    host.appendChild(s);
    const el=id=>s.querySelector('#r90-'+id);
    let entries=[{id:1,kind:1,data:{name:'',price:100,first:30,second:20,tax:8}},{id:2,kind:2,data:{name:'',price:80,first:10,second:5,tax:0}}];
    let serial=2;
    const initial=()=>({name:'',price:100,first:30,second:20,tax:8});
    const fmt=(n,l)=>new Intl.NumberFormat(l==='ja'?'ja-JP':l==='ar'?'ar':'en-US',{maximumFractionDigits:2,minimumFractionDigits:2}).format(n);
    const value=()=>({name:el('name').value.trim(),price:Number(el('price').value),first:Number(el('first').value),second:Number(el('second').value),tax:Number(el('tax').value)});
    const valid=()=>{const v=value();return v.name.length>0&&['price','first','second','tax'].every(k=>el(k).value.trim()!==''&&Number.isFinite(v[k]))&&v.price>=0&&v.price<=99999999&&['first','second','tax'].every(k=>v[k]>=0&&v[k]<=100);};
    const fill=v=>{Object.keys(v).forEach(k=>{const input=el(k);if(input)input.value=v[k];});};
    function render(){
      const l=lang(),t=COPY[l];s.lang=l;s.dir=l==='ar'?'rtl':'ltr';
      s.querySelectorAll('[data-i]').forEach(n=>{const x=t[n.dataset.i];if(typeof x==='string')n.textContent=x;});
      const v=value();const ok=valid();el('save').disabled=!ok;
      el('error').textContent=ok?'':t.bad;
      if(ok){const a=v.price*(1-v.first/100),b=a*(1-v.second/100),c=b*(1+v.tax/100),d=100*(1-(1-v.first/100)*(1-v.second/100));
        el('total').textContent=fmt(c,l);el('effective').textContent=fmt(d,l)+'%';
        el('math').replaceChildren();[[t.after1,a],[t.after2,b],[t.total,c]].forEach(pair=>{const li=document.createElement('li'),span=document.createElement('span'),strong=document.createElement('strong');span.textContent=pair[0];strong.textContent=fmt(pair[1],l);li.append(span,strong);el('math').appendChild(li);});
      }else{el('total').textContent='—';el('effective').textContent='—';el('math').replaceChildren();}
      el('count').textContent=String(entries.length);
      const q=el('search').value.trim().toLocaleLowerCase();el('items').replaceChildren();
      let found=0;
      for(const entry of entries.slice().reverse()){
        const label=entry.kind?t['example'+entry.kind]:entry.data.name;
        if(q&&!label.toLocaleLowerCase().includes(q))continue;
        found++;
        const item=document.createElement('div');item.className='r90-item';
        const text=document.createElement('div');const name=document.createElement('strong'),desc=document.createElement('small');name.textContent=label;
        const d=entry.data,c=d.price*(1-d.first/100)*(1-d.second/100)*(1+d.tax/100);
        desc.textContent=`${fmt(d.price,l)} · ${fmt(d.first,l)}% + ${fmt(d.second,l)}% → ${fmt(c,l)}`;
        text.append(name,desc);const open=document.createElement('button');open.type='button';open.textContent=t.edit;
        open.addEventListener('click',()=>{fill({...entry.data,name:label});el('feedback').textContent=t.opened;render();});
        item.append(text,open);el('items').appendChild(item);
      }
      if(!found){const empty=document.createElement('p');empty.className='r90-empty';empty.textContent=t.none;el('items').appendChild(empty);}
    }
    fill({...initial(),name:COPY[lang()].example1});
    ['name','price','first','second','tax','search'].forEach(k=>el(k).addEventListener('input',()=>{el('feedback').textContent='';render();}));
    el('save').addEventListener('click',()=>{if(!valid())return;const v=value();entries.push({id:++serial,kind:0,data:v});if(entries.length>8)entries.shift();el('feedback').textContent=COPY[lang()].kept;el('search').value='';render();});
    el('reset').addEventListener('click',()=>{entries=[{id:1,kind:1,data:initial()},{id:2,kind:2,data:{name:'',price:80,first:10,second:5,tax:0}}];serial=2;fill({...initial(),name:COPY[lang()].example1});el('search').value='';el('feedback').textContent='';render();});
    new MutationObserver(list=>{if(list.some(r=>r.attributeName==='lang'))render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
