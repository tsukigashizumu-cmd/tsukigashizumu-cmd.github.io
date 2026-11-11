/* Unit Choice R150: LP-only illustrative price/quantity comparison. No persistence or network. */
(() => {
  'use strict';
  const ID='tsz-unitchoice-r150';
  if(document.getElementById(ID))return;
  const language=x=>/^ja/i.test(x||'')?'ja':/^ar/i.test(x||'')?'ar':'en';
  const q=new URLSearchParams(location.search);
  const text={
    ja:{eyebrow:'UNIT CHOICE / TOTAL VS UNIT',title:'高い買い物が、安い選択になる。',lead:'レジで払う金額と、同じ量あたりの値段。どちらも見れば、安さの理由がわかる。',language:'言語',step:'比較例を選ぶ',default:'大袋が単価で勝つ',small:'小袋が単価で勝つ',tie:'同じ単価になる',a:'01 / 小袋',b:'02 / 大袋',price:'支払う価格',amount:'内容量',unit:'単位',each:'1kgあたり',total:'実際の支払額',winner:'単価でお得なのは',winnerA:'小袋',winnerB:'大袋',winnerTie:'同じ単価',difference:'1kgあたりの差',upfront:'支払額の差',extra:'ただし、レジの支払額は',more:'高くなります',less:'安くなります',equal:'同じです',invalid:'価格は0以上、内容量は0より大きい数を入力してください。',reset:'見本に戻す',note:'これはLP用の架空の2商品比較です。金額は通貨未指定の共通単位で、内容量をkgに換算した単価のみを比べます。購入には袋単位での支払いが必要で、1kg単価は実際にその量だけ買えることを意味しません。入力は保存・送信されません。',direct:'合計金額だけで判断しない。',compare:'単価の比較',scale:'安い方の単価を基準にした相対バー',noValue:'—'},
    en:{eyebrow:'UNIT CHOICE / TOTAL VS UNIT',title:'A higher total. A better unit price.',lead:'The checkout total and the price for the same amount tell different stories. Compare both before choosing.',language:'Language',step:'Choose an example',default:'Large pack wins per kg',small:'Small pack wins per kg',tie:'Equal unit price',a:'01 / Small pack',b:'02 / Large pack',price:'Pack price',amount:'Pack quantity',unit:'Unit',each:'Price per kg',total:'Checkout total',winner:'Better unit price',winnerA:'Small pack',winnerB:'Large pack',winnerTie:'Both equal',difference:'Difference per kg',upfront:'Checkout total difference',extra:'But at the register, that option costs',more:'more',less:'less',equal:'the same',invalid:'Enter a non-negative price and a quantity greater than zero.',reset:'Reset example',note:'LP-only example with fictional products. Prices use a currency-neutral unit; quantities are converted to kilograms. Packs are sold whole, not by the fraction used to compare per kg. No data is saved or sent.',direct:'A bigger total is not the whole story.',compare:'Unit-price comparison',scale:'Relative bar based on lower unit price',noValue:'—'},
    ar:{eyebrow:'UNIT CHOICE / TOTAL VS UNIT',title:'سعر إجمالي أعلى، ولكن سعر وحدة أفضل.',lead:'المبلغ الذي تدفعه والسعر لنفس الكمية يرويان قصتين مختلفتين. قارن الاثنين قبل الاختيار.',language:'اللغة',step:'اختر مثالاً',default:'العبوة الكبيرة أوفر للكيلوغرام',small:'العبوة الصغيرة أوفر للكيلوغرام',tie:'سعر الوحدة متساوٍ',a:'01 / عبوة صغيرة',b:'02 / عبوة كبيرة',price:'سعر العبوة',amount:'الكمية',unit:'الوحدة',each:'السعر لكل كغ',total:'إجمالي الدفع',winner:'الأوفر لكل كغ',winnerA:'العبوة الصغيرة',winnerB:'العبوة الكبيرة',winnerTie:'السعر متساوٍ',difference:'الفارق لكل كغ',upfront:'فارق سعر الشراء',extra:'لكن عند الدفع سيكون ثمن الخيار الأوفر',more:'أعلى',less:'أقل',equal:'مساوياً',invalid:'أدخل سعراً غير سالب وكمية أكبر من صفر.',reset:'إعادة المثال',note:'مثال توضيحي بمنتجين افتراضيين، وبوحدة نقدية غير محددة. نحول الكميات إلى كغ للمقارنة فقط، لكن شراء العبوة يتطلب دفع سعرها الكامل. لا تُحفظ البيانات ولا تُرسل.',direct:'لا تحكم من الإجمالي وحده.',compare:'مقارنة سعر الوحدة',scale:'شريط نسبي حسب سعر الوحدة الأقل',noValue:'—'}
  };
  const scenarios={bulk:[{price:'348',qty:'450',unit:'g'},{price:'828',qty:'1.2',unit:'kg'}],small:[{price:'348',qty:'450',unit:'g'},{price:'1050',qty:'1.2',unit:'kg'}],tie:[{price:'450',qty:'450',unit:'g'},{price:'1200',qty:'1.2',unit:'kg'}]};
  const clone=x=>JSON.parse(JSON.stringify(x));
  let lang=language(q.get('lang')||document.documentElement.lang||navigator.language),sample='bulk',rows=clone(scenarios.bulk);
  const host=document.querySelector('#p199-content .p199-body')||document.querySelector('#p199-content')||document.querySelector('main')||document.body;
  const root=document.createElement('section'); root.id=ID; host.appendChild(root);
  const num=v=>{const s=String(v).trim();return s===''?NaN:Number(s);};
  const money=n=>Number.isFinite(n)?new Intl.NumberFormat(lang==='ja'?'ja-JP':lang==='ar'?'ar-EG':'en-US',{minimumFractionDigits:2,maximumFractionDigits:2,useGrouping:true}).format(n):'—';
  const perKg=row=>{const p=num(row.price),v=num(row.qty);if(!Number.isFinite(p)||p<0||!Number.isFinite(v)||v<=0)return NaN;const kg=row.unit==='g'?v/1000:v;const result=p/kg;return Number.isFinite(result)&&result<=1e12?result:NaN;};
  const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render(){const t=text[lang];root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';root.innerHTML=`<div class="uc150-shell">
    <header class="uc150-heading"><div class="uc150-headingcopy"><div class="uc150-eyebrow">${t.eyebrow}</div><h2>${t.title}</h2><p>${t.lead}</p></div><label class="uc150-lang">${t.language}<select id="uc150-lang" aria-label="${t.language}"><option value="ja" ${lang==='ja'?'selected':''}>日本語</option><option value="en" ${lang==='en'?'selected':''}>English</option><option value="ar" ${lang==='ar'?'selected':''}>العربية</option></select></label></header>
    <div class="uc150-story"><span class="uc150-storyindex">01 / ${t.direct}</span><strong>${t.compare}</strong></div>
    <div class="uc150-scenarios" aria-label="${t.step}">${[['bulk',t.default],['small',t.small],['tie',t.tie]].map(([key,val])=>`<button type="button" data-uc150-example="${key}" aria-pressed="${sample===key}">${val}</button>`).join('')}</div>
    <div class="uc150-items">${rows.map((item,i)=>`<div class="uc150-item" data-uc150-card="${i}"><div class="uc150-cardhead"><span>${i===0?t.a:t.b}</span><div class="uc150-mark">${i===0?'A':'B'}</div></div><div class="uc150-inputs"><label>${t.price}<input type="number" inputmode="decimal" min="0" step="any" data-uc150-price="${i}" value="${esc(item.price)}" aria-label="${t.price} ${i===0?t.a:t.b}" /></label><label>${t.amount}<div class="uc150-quantity"><input type="number" inputmode="decimal" min="0.000001" step="any" data-uc150-qty="${i}" value="${esc(item.qty)}" aria-label="${t.amount} ${i===0?t.a:t.b}"/><select data-uc150-unit="${i}" aria-label="${t.unit} ${i===0?t.a:t.b}"><option value="g" ${item.unit==='g'?'selected':''}>g</option><option value="kg" ${item.unit==='kg'?'selected':''}>kg</option></select></div></label></div><div class="uc150-priceline"><span>${t.each}</span><strong id="uc150-per-${i}" dir="ltr">—</strong></div><div class="uc150-bar"><span id="uc150-bar-${i}"></span></div><div class="uc150-total">${t.total}<strong id="uc150-total-${i}" dir="ltr">—</strong></div></div>`).join('')}</div>
    <div class="uc150-judgement" aria-live="polite"><div><span class="uc150-jlabel">${t.winner}</span><strong id="uc150-winner">—</strong><p id="uc150-context"></p></div><div class="uc150-differences"><div><small>${t.difference}</small><strong id="uc150-diff" dir="ltr">—</strong></div><div><small>${t.upfront}</small><strong id="uc150-upfront" dir="ltr">—</strong></div></div></div>
    <div id="uc150-error" class="uc150-error" role="status" hidden></div><div class="uc150-footer"><small>${t.scale}</small><button id="uc150-reset" type="button">${t.reset}</button></div><p class="uc150-note">${t.note}</p></div>`;
    root.querySelector('#uc150-lang').addEventListener('change',e=>{lang=language(e.target.value);render();});
    root.querySelectorAll('[data-uc150-example]').forEach(b=>b.addEventListener('click',()=>{sample=b.dataset.uc150Example;rows=clone(scenarios[sample]);render();}));
    for(const [attr,key] of [['data-uc150-price','price'],['data-uc150-qty','qty'],['data-uc150-unit','unit']])root.querySelectorAll('['+attr+']').forEach(el=>el.addEventListener(el.tagName==='SELECT'?'change':'input',()=>{rows[Number(el.getAttribute(attr))][key]=el.value;refresh();}));
    root.querySelector('#uc150-reset').addEventListener('click',()=>{sample='bulk';rows=clone(scenarios.bulk);render();});
    refresh();
  }
  function refresh(){const t=text[lang],a=perKg(rows[0]),b=perKg(rows[1]),ok=Number.isFinite(a)&&Number.isFinite(b),error=root.querySelector('#uc150-error');error.hidden=ok;error.textContent=ok?'':t.invalid;
    root.querySelectorAll('[data-uc150-card]').forEach(card=>card.classList.remove('is-better'));
    for(let i=0;i<2;i++){
      const p=perKg(rows[i]),cost=num(rows[i].price);
      root.querySelector('#uc150-per-'+i).textContent=money(p);
      root.querySelector('#uc150-total-'+i).textContent=Number.isFinite(cost)&&cost>=0?money(cost):t.noValue;
      const bar=root.querySelector('#uc150-bar-'+i);const max=Math.max(a,b);let size=ok?(max===0?100:100*(p/max)):0;bar.style.width=Math.max(0,Math.min(100,size))+'%';
    }
    const winner=root.querySelector('#uc150-winner'),context=root.querySelector('#uc150-context');
    if(!ok){winner.textContent=t.noValue;context.textContent='';root.querySelector('#uc150-diff').textContent=t.noValue;root.querySelector('#uc150-upfront').textContent=t.noValue;return;}
    const equal=Math.abs(a-b)<0.0000001,idx=equal?-1:a<b?0:1,costA=num(rows[0].price),costB=num(rows[1].price);
    winner.textContent=idx===-1?t.winnerTie:idx===0?t.winnerA:t.winnerB;
    if(idx!==-1)root.querySelector('[data-uc150-card="'+idx+'"]').classList.add('is-better');
    const paymentDiff=Math.abs(costA-costB),bestCost=idx===1?costB:costA,otherCost=idx===1?costA:costB;
    context.textContent=idx===-1?'':`${t.extra} ${money(paymentDiff)} ${bestCost>otherCost?t.more:bestCost<otherCost?t.less:t.equal}`;
    root.querySelector('#uc150-diff').textContent=money(Math.abs(a-b));
    root.querySelector('#uc150-upfront').textContent=money(paymentDiff);
  }
  render();
})();
