/* UnitPrice R87: educational illustration; no persistent storage, network or claims about app UI. */
(() => {
  'use strict';
  const SECTION='tsz-unitprice-r87';
  const TXT={
    en:{eye:'STACKED DISCOUNTS · INTERACTIVE EXAMPLE',title:'20% off, then 10% off ≠ 30% off',sub:'Change the price, two successive discounts and an example tax rate to see what you would actually pay.',initial:'Original price',first:'First discount (%)',second:'Second discount (%)',tax:'Example tax rate (%)',stage:'Step-by-step price',start:'Original',after1:'After first discount',after2:'After second discount',afterTax:'After example tax',effective:'Combined discount',mistake:'Simply adding discounts gives',difference:'The correct successive discount is',valid:'Enter a nonnegative price, and rates from 0 to 100. Use up to two decimal places.',flip:'Try a different example',reset:'Reset',note:'Illustration only—not an actual app screen, quote, store policy or tax advice. Assumes first discount, then second discount, then a percentage tax applied to the discounted price. No data is saved or transmitted.',units:'example units',percent:'% effective discount'},
    ja:{eye:'二段階割引 · 体験サンプル',title:'20%引きの次に10%引き。合計30%引きではありません',sub:'元値・2回の割引率・仮の税率を変えて、最終支払額がどう決まるか確かめましょう。',initial:'元の価格',first:'1回目の割引（%）',second:'2回目の割引（%）',tax:'仮の税率（%）',stage:'価格の変化',start:'元値',after1:'1回目の割引後',after2:'2回目の割引後',afterTax:'仮の税込価格',effective:'実際の合計割引率',mistake:'割引率を単純に足すと',difference:'正しい連続割引では',valid:'価格は0以上、割引率・税率は0〜100で入力してください（小数2桁まで）。',flip:'別の例を試す',reset:'初期値に戻す',note:'説明用の試算であり、アプリ実画面・販売価格・税務上の判断ではありません。「割引1→割引2→仮の税」の順で計算します。入力は保存・送信しません。',units:'仮の単位',percent:'%引き'},
    ar:{eye:'خصومات متتالية · مثال تفاعلي',title:'خصم ٢٠٪ ثم ١٠٪ لا يساوي خصم ٣٠٪',sub:'غيّر السعر ونسبتي الخصم ومعدل ضريبة افتراضي لترى المبلغ النهائي.',initial:'السعر الأصلي',first:'الخصم الأول (٪)',second:'الخصم الثاني (٪)',tax:'ضريبة افتراضية (٪)',stage:'حساب السعر خطوة بخطوة',start:'السعر الأصلي',after1:'بعد الخصم الأول',after2:'بعد الخصم الثاني',afterTax:'بعد الضريبة الافتراضية',effective:'الخصم المجمع الفعلي',mistake:'جمع الخصمين مباشرة يعطي',difference:'الخصم المتتالي الصحيح هو',valid:'أدخل سعراً غير سالب ونسباً بين ٠ و١٠٠، وبحد أقصى منزلتين عشريتين.',flip:'جرّب مثالاً آخر',reset:'إعادة التعيين',note:'مثال توضيحي فقط، وليس شاشة التطبيق أو عرض سعر أو نصيحة ضريبية. الترتيب: الخصم الأول ثم الثاني ثم ضريبة افتراضية. لا يتم حفظ البيانات أو إرسالها.',units:'وحدات افتراضية',percent:'٪ خصم فعلي'}
  };
  const lang=()=>{const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en';};
  const num=(value,max)=>{
    const clean=String(value).trim().replace(/\s/g,'');
    if(!/^\d{1,7}(?:[.,]\d{0,2})?$/.test(clean)) return null;
    const n=Number(clean.replace(',','.'));
    return Number.isFinite(n) && n>=0 && n<=max ? n:null;
  };
  const init=()=>{
    if(document.getElementById(SECTION)) return;
    const host=document.querySelector('main')||document.body;if(!host)return;
    const section=document.createElement('section');section.id=SECTION;
    section.innerHTML=`<div class="r87-shell">
      <div class="r87-heading"><div class="r87-kicker" data-r87="eye"></div><h2 data-r87="title"></h2><p data-r87="sub"></p></div>
      <div class="r87-grid"><div class="r87-controls">
        <label><span data-r87="initial"></span><input data-r87-val="initial" type="text" inputmode="decimal" autocomplete="off" value="100"></label>
        <label><span data-r87="first"></span><input data-r87-val="first" type="text" inputmode="decimal" autocomplete="off" value="20"></label>
        <label><span data-r87="second"></span><input data-r87-val="second" type="text" inputmode="decimal" autocomplete="off" value="10"></label>
        <label><span data-r87="tax"></span><input data-r87-val="tax" type="text" inputmode="decimal" autocomplete="off" value="8"></label>
        <div class="r87-buttons"><button type="button" id="r87-flip" data-r87="flip"></button><button class="r87-plain" type="button" id="r87-reset" data-r87="reset"></button></div>
      </div><div class="r87-results"><h3 data-r87="stage"></h3><div class="r87-ladder" aria-live="polite" aria-atomic="true">
        <div><span data-r87="start"></span><strong id="r87-start"></strong></div>
        <div><span data-r87="after1"></span><strong id="r87-after1"></strong></div>
        <div><span data-r87="after2"></span><strong id="r87-after2"></strong></div>
        <div class="r87-final"><span data-r87="afterTax"></span><strong id="r87-total"></strong></div>
      </div><div class="r87-compare" aria-live="polite"><p><span data-r87="mistake"></span> <b id="r87-sum"></b></p><p><span data-r87="difference"></span> <b id="r87-effective"></b></p></div><p id="r87-error" class="r87-error" role="status" hidden></p></div></div>
      <p class="r87-note" data-r87="note"></p>
    </div>`;
    host.appendChild(section);
    const vals={};section.querySelectorAll('input[data-r87-val]').forEach(x=>vals[x.dataset.r87Val]=x);
    const set=(a,b,c,d)=>{vals.initial.value=a;vals.first.value=b;vals.second.value=c;vals.tax.value=d;render();};
    const el=id=>section.querySelector('#r87-'+id);
    const render=()=>{
      const l=lang(),t=TXT[l];section.lang=l;section.dir=l==='ar'?'rtl':'ltr';
      section.querySelectorAll('[data-r87]').forEach(x=>{const k=x.dataset.r87;if(t[k])x.textContent=t[k];});
      const v={};Object.keys(vals).forEach(k=>v[k]=num(vals[k].value,k==='initial'?1000000:100));
      const fail=Object.values(v).some(x=>x===null),error=el('error');error.hidden=!fail;error.textContent=fail?t.valid:'';
      const fmt=new Intl.NumberFormat(l==='ja'?'ja-JP':l==='ar'?'ar': 'en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
      const f=x=>`${fmt.format(x)} ${t.units}`;
      if(fail){['start','after1','after2','total','sum','effective'].forEach(id=>el(id).textContent='—');return;}
      const after1=v.initial*(1-v.first/100);
      const after2=after1*(1-v.second/100);
      const total=after2*(1+v.tax/100);
      const effective=100*(1-(1-v.first/100)*(1-v.second/100));
      el('start').textContent=f(v.initial);el('after1').textContent=f(after1);el('after2').textContent=f(after2);el('total').textContent=f(total);
      el('sum').textContent=`${fmt.format(v.first+v.second)}%`;
      el('effective').textContent=`${fmt.format(effective)}${t.percent.startsWith('%')?'':' '}${t.percent}`;
    };
    Object.values(vals).forEach(x=>x.addEventListener('input',render));
    el('reset').addEventListener('click',()=>set('100','20','10','8'));
    el('flip').addEventListener('click',()=>set('240','35','15','5'));
    new MutationObserver(ms=>{if(ms.some(m=>m.attributeName==='lang'))render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
