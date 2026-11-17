/* R335 Unit Choice: text-only, local-only LP demonstration. No persistence or network. */
(()=>{
  'use strict';
  const ROOT='tsz-uc335';
  const T={
    en:{brand:'UNIT CHOICE / COST PER UNIT',over:'MORE IN THE PACK ≠ MORE VALUE',title:'Is the biggest bottle actually the cheapest?',lead:'The shelf price hides the part that matters: cost for the same amount. Compare three sizes, then change any number to see the best choice move.',try:'PICK A SHELF',shampoo:'Shampoo',oats:'Oats',pods:'Laundry pods',a:'Small',b:'Regular',c:'Large',price:'Shelf price (USD)',quantity:'Amount in pack',per:'Price per',best:'LOWEST COST PER UNIT',winner:'Option',mean:'Average unit price',median:'Median unit price',gap:'Difference from highest',compare:'THE SAME AMOUNT, THREE PRICES',why:'The largest pack does not automatically win.',note:'Enter comparable products of the same kind. Average and median use the three unit prices without weighting by pack size.',invalid:'Enter valid shelf prices (0–1,000,000) and amounts greater than 0 and up to 1,000,000.',footer:'Interactive example for this landing page, not store pricing. Tax, coupons, item quality, and incompatible units can change a real decision. No data is saved.'},
    ja:{brand:'UNIT CHOICE / 単価比較',over:'大容量が、いつも最安とは限らない',title:'一番大きいボトルが、一番お得とは限らない。',lead:'値札ではなく、同じ量あたりの値段で比べてみる。3商品の価格と容量を変えると、最安の選択肢がその場で入れ替わります。',try:'比較する商品の例を選ぶ',shampoo:'シャンプー',oats:'オートミール',pods:'洗濯用カプセル',a:'小サイズ',b:'標準サイズ',c:'大サイズ',price:'販売価格（USD）',quantity:'内容量・個数',per:'比較単位',best:'単価が一番安い選択肢',winner:'商品',mean:'単価の平均値',median:'単価の中央値',gap:'最高単価との差',compare:'同じ量あたりの価格を比較',why:'大容量が必ずしも最安になるとは限りません。',note:'同じ種類の比較可能な商品を入力してください。平均値・中央値は3商品の単価から計算し、内容量での加重平均ではありません。',invalid:'価格は0〜1,000,000、内容量は0より大きく1,000,000以下で入力してください。',footer:'LP専用の説明用計算です。税金・クーポン・品質・比較できない単位は考慮していません。入力内容は保存しません。'},
    ar:{brand:'UNIT CHOICE / مقارنة سعر الوحدة',over:'الحجم الأكبر لا يعني دائمًا أفضل قيمة',title:'هل العبوة الأكبر هي الأقل تكلفة فعلًا؟',lead:'سعر الملصق لا يخبرك بكل شيء. قارن السعر للكمية نفسها بين ثلاث عبوات وعدّل الأرقام لتعرف الخيار الأقل تكلفة.',try:'اختر مثالًا للمقارنة',shampoo:'شامبو',oats:'شوفان',pods:'كبسولات غسيل',a:'صغيرة',b:'متوسطة',c:'كبيرة',price:'سعر العبوة (USD)',quantity:'الكمية في العبوة',per:'السعر لكل',best:'أقل سعر للوحدة',winner:'الخيار',mean:'متوسط سعر الوحدة',median:'وسيط سعر الوحدة',gap:'الفرق عن أعلى سعر',compare:'الكمية نفسها، ثلاث أسعار',why:'العبوة الأكبر ليست دائمًا الأقل تكلفة.',note:'أدخل منتجات من النوع نفسه بوحدات قابلة للمقارنة. يُحسب المتوسط والوسيط من أسعار الوحدات الثلاث دون وزن بحسب حجم العبوة.',invalid:'أدخل سعرًا من 0 إلى 1,000,000 وكمية أكبر من صفر ولا تتجاوز 1,000,000.',footer:'مثال تفاعلي خاص بهذه الصفحة وليس أسعار متجر فعلية. قد تؤثر الضرائب والقسائم والجودة والوحدات غير المتوافقة في القرار. لا تُحفَظ البيانات.'}
  };
  const EXAMPLES={
    shampoo:{unit:'mL',basis:100,options:[{price:'4.99',qty:'250'},{price:'8.49',qty:'500'},{price:'14.25',qty:'750'}]},
    oats:{unit:'g',basis:100,options:[{price:'2.89',qty:'500'},{price:'5.59',qty:'1000'},{price:'12.49',qty:'2000'}]},
    pods:{unit:'pcs',basis:1,options:[{price:'4.99',qty:'12'},{price:'8.99',qty:'24'},{price:'16.49',qty:'40'}]}
  };
  const state={lang:'en',example:'shampoo',unit:'mL',basis:100,options:EXAMPLES.shampoo.options.map(x=>({...x}))};
  let host;
  const q=s=>host.querySelector(s),all=s=>[...host.querySelectorAll(s)],tr=()=>T[state.lang];
  const money=n=>'$'+n.toLocaleString('en-US',{minimumFractionDigits:3,maximumFractionDigits:3});
  const count=n=>Number(n).toLocaleString('en-US',{maximumFractionDigits:0});
  const basisLabel=()=>`${state.basis} ${state.unit==='pcs'?(state.lang==='ja'?'個':state.lang==='ar'?'قطعة':'pc'):state.unit}`;
  function calc(){
    const values=[];
    for(const item of state.options){
      if(item.price.trim()===''||item.qty.trim()==='')return null;
      const price=Number(item.price),qty=Number(item.qty);
      if(!Number.isFinite(price)||!Number.isFinite(qty)||price<0||price>1000000||qty<=0||qty>1000000)return null;
      values.push(price/qty*state.basis);
    }
    const min=Math.min(...values),max=Math.max(...values),sorted=[...values].sort((a,b)=>a-b);
    return {values,low:values.indexOf(min),min,max,mean:values.reduce((a,b)=>a+b,0)/3,median:sorted[1],gap:max===0?0:(max-min)/max*100};
  }
  function mount(){
    if(document.getElementById(ROOT))return;
    host=document.createElement('section');host.id=ROOT;host.setAttribute('aria-label','Unit Choice unit price comparison demonstration');
    host.innerHTML=`<div class="uc-frame"><div class="uc-top"><div class="uc-brand"><span class="uc-symbol" aria-hidden="true">≋</span><span data-t="brand"></span></div><div class="uc-langs" role="group" aria-label="Language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></div><header class="uc-hero"><p class="uc-over" data-t="over"></p><h2 data-t="title"></h2><p class="uc-lead" data-t="lead"></p></header><div class="uc-layout"><div class="uc-panel uc-edit"><p class="uc-kicker" data-t="try"></p><div class="uc-presets" role="group" aria-label="Choose a sample"><button type="button" data-example="shampoo" data-t="shampoo"></button><button type="button" data-example="oats" data-t="oats"></button><button type="button" data-example="pods" data-t="pods"></button></div><div class="uc-products"><div class="uc-product" data-product="0"><p class="uc-product-title"><span class="uc-letter">A</span><span data-t="a"></span></p><div class="uc-fields"><label><span data-t="price"></span><span class="uc-input"><b>$</b><input type="number" name="price0" step="0.01" inputmode="decimal" min="0" aria-label="A price"></span></label><label><span data-t="quantity"></span><span class="uc-input"><input type="number" name="qty0" step="any" inputmode="decimal" min="0.01" aria-label="A quantity"><b class="uc-unit"></b></span></label></div></div><div class="uc-product" data-product="1"><p class="uc-product-title"><span class="uc-letter">B</span><span data-t="b"></span></p><div class="uc-fields"><label><span data-t="price"></span><span class="uc-input"><b>$</b><input type="number" name="price1" step="0.01" inputmode="decimal" min="0" aria-label="B price"></span></label><label><span data-t="quantity"></span><span class="uc-input"><input type="number" name="qty1" step="any" inputmode="decimal" min="0.01" aria-label="B quantity"><b class="uc-unit"></b></span></label></div></div><div class="uc-product" data-product="2"><p class="uc-product-title"><span class="uc-letter">C</span><span data-t="c"></span></p><div class="uc-fields"><label><span data-t="price"></span><span class="uc-input"><b>$</b><input type="number" name="price2" step="0.01" inputmode="decimal" min="0" aria-label="C price"></span></label><label><span data-t="quantity"></span><span class="uc-input"><input type="number" name="qty2" step="any" inputmode="decimal" min="0.01" aria-label="C quantity"><b class="uc-unit"></b></span></label></div></div></div><p class="uc-invalid" data-out="error" role="status"></p><p class="uc-note" data-t="note"></p></div><div class="uc-panel uc-results" aria-live="polite"><p class="uc-kicker" data-t="compare"></p><div class="uc-best"><p data-t="best"></p><strong data-out="winner"></strong><div class="uc-best-amount" data-out="minimum"></div><span><span data-t="per"></span> <b data-out="basis"></b></span></div><div class="uc-bars"><div class="uc-baritem" data-bar="0"><div class="uc-barlabels"><span data-out="label0"></span><strong data-out="value0"></strong></div><div class="uc-track"><div class="uc-barfill" data-fill="0"></div></div></div><div class="uc-baritem" data-bar="1"><div class="uc-barlabels"><span data-out="label1"></span><strong data-out="value1"></strong></div><div class="uc-track"><div class="uc-barfill" data-fill="1"></div></div></div><div class="uc-baritem" data-bar="2"><div class="uc-barlabels"><span data-out="label2"></span><strong data-out="value2"></strong></div><div class="uc-track"><div class="uc-barfill" data-fill="2"></div></div></div></div><div class="uc-stats"><div><span data-t="mean"></span><strong data-out="mean"></strong></div><div><span data-t="median"></span><strong data-out="median"></strong></div><div><span data-t="gap"></span><strong data-out="gap"></strong></div></div><p class="uc-insight" data-t="why"></p></div></div><p class="uc-footer" data-t="footer"></p></div>`;
    (document.querySelector('main')||document.body).appendChild(host);
    all('[data-lang]').forEach(b=>b.addEventListener('click',()=>{state.lang=b.dataset.lang;render(false)}));
    all('[data-example]').forEach(b=>b.addEventListener('click',()=>{const e=EXAMPLES[b.dataset.example];state.example=b.dataset.example;state.unit=e.unit;state.basis=e.basis;state.options=e.options.map(x=>({...x}));render(true)}));
    all('input').forEach(i=>i.addEventListener('input',()=>{const m=i.name.match(/^(price|qty)([012])$/);if(!m)return;state.options[+m[2]][m[1]]=i.value;state.example='';render(false)}));
    render(true);
  }
  function render(setInputs){
    host.lang=state.lang;host.dir=state.lang==='ar'?'rtl':'ltr';
    all('[data-t]').forEach(el=>{el.textContent=tr()[el.dataset.t]||''});
    all('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===state.lang)));
    all('[data-example]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.example===state.example)));
    all('.uc-unit').forEach(b=>b.textContent=state.unit);
    all('input').forEach(i=>{const m=i.name.match(/^(price|qty)([012])$/);if(m){if(setInputs)i.value=state.options[+m[2]][m[1]];i.setAttribute('aria-label',`${'ABC'[+m[2]]}: ${tr()[m[1]==='price'?'price':'quantity']}`)}});
    const r=calc();
    q('[data-out="error"]').textContent=r?'':tr().invalid;
    q('[data-out="basis"]').textContent=basisLabel();
    q('[data-out="winner"]').textContent=r?`${'ABC'[r.low]} · ${tr()[['a','b','c'][r.low]]}`:'—';
    q('[data-out="minimum"]').textContent=r?money(r.min):'—';
    q('[data-out="mean"]').textContent=r?money(r.mean):'—';
    q('[data-out="median"]').textContent=r?money(r.median):'—';
    q('[data-out="gap"]').textContent=r?`${r.gap.toFixed(1)}%`:'—';
    for(let n=0;n<3;n++){
      const item=q(`[data-bar="${n}"]`);
      item.classList.toggle('uc-lowest',!!r&&r.low===n);
      q(`[data-out="label${n}"]`).textContent=`${'ABC'[n]} · ${tr()[['a','b','c'][n]]}`;
      q(`[data-out="value${n}"]`).textContent=r?money(r.values[n]):'—';
      q(`[data-fill="${n}"]`).style.width=r&&r.max>0?`${Math.max(2,r.values[n]/r.max*100)}%`:(r?'2%':'0%');
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
