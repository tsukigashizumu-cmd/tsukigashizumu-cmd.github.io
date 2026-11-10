/* TSZ LP R114 / Nokarvo: manually entered loss-estimate ranges; illustrative, not an app screen. */
(() => {
  'use strict';
  const ID='tsz-nokarvo-r114';
  const APP='6820674560';
  const COPY={
    en:{kicker:'WHEN ESTIMATES OVERLAP',heading:'Sometimes the right answer is “too close to call.”',lead:'A usable-price estimate is a range—not a promise. Adjust the loss estimate and its uncertainty for two products, then see whether one is clearly cheaper.',example:'ILLUSTRATIVE COMPARISON',shelf:'Package price',weight:'Package amount (g)',loss:'Estimated unused portion (%)',margin:'Uncertainty (± percentage points)',usable:'Usable cost / 100 g',range:'Estimated cost range',a:'Option A',b:'Option B',tooClose:'Too close to call',awins:'A is clearly cheaper',bwins:'B is clearly cheaper',gap:'The estimates overlap. Consider measuring the usable part before deciding.',clear:'Even at the edges of the estimates, this option is cheaper.',invalid:'Enter positive prices and amounts, a loss from 0–75%, and uncertainty from 0–20 points.',labelA:'A',labelB:'B',overlap:'Overlapping estimates',certainA:'Clear A',certainB:'Clear B',reset:'Reset example',note:'These values are hypothetical. The range assumes only the unused percentage is uncertain. This is an LP illustration, not the real Nokarvo UI or a guarantee. No camera, saving, network or purchase data is used.',unit:'per 100 g',none:'—',rangeLegend:'Lower to upper estimated unit price'},
    ja:{kicker:'概算が重なったら、勝者を作らない',heading:'「まだ決めきれない」も、ちゃんとした答え。',lead:'使える量が概算なら、単価もひとつの数値ではなく範囲になります。AとBの使わない割合・誤差幅を変え、確実に安いと言えるか試してください。',example:'操作できる比較例',shelf:'購入価格',weight:'購入量（g）',loss:'使わない割合の見積もり（%）',margin:'見積もり誤差幅（±ポイント）',usable:'使える量100gあたり',range:'概算単価の範囲',a:'商品 A',b:'商品 B',tooClose:'まだ決めきれない',awins:'Aが確実に安い',bwins:'Bが確実に安い',gap:'概算の範囲が重なっています。実測できるなら、その後に比べましょう。',clear:'概算の上限・下限を考えても、この商品が安いと判断できます。',invalid:'価格・購入量は正の数、使わない割合は0〜75%、誤差幅は0〜20ポイントで入力してください。',labelA:'A',labelB:'B',overlap:'範囲が重なる例',certainA:'Aが安い例',certainB:'Bが安い例',reset:'初期例に戻す',note:'数値はすべて架空の例です。誤差幅は「使わない割合」だけにあると仮定した簡易計算です。実アプリの画面・価格保証ではありません。撮影・保存・通信・商品取得は行いません。',unit:'100gあたり',none:'—',rangeLegend:'概算単価の下限〜上限'},
    ar:{kicker:'عندما تتداخل التقديرات',heading:'أحيانًا تكون الإجابة: لا يمكن الحسم بعد.',lead:'عندما يكون الجزء القابل للاستخدام تقديريًا، يكون سعره نطاقًا لا رقمًا واحدًا. عدّل نسبة الفاقد وعدم اليقين ثم قارن.',example:'مقارنة توضيحية تفاعلية',shelf:'سعر العبوة',weight:'الكمية (غرام)',loss:'تقدير الجزء غير المستخدم (%)',margin:'هامش عدم اليقين (± نقطة)',usable:'التكلفة لكل 100 غ قابل للاستخدام',range:'نطاق التكلفة المقدّرة',a:'الخيار A',b:'الخيار B',tooClose:'متقاربان جدًا للحسم',awins:'A أرخص بوضوح',bwins:'B أرخص بوضوح',gap:'تتداخل نطاقات التقدير. يمكن قياس الكمية المستخدمة قبل اتخاذ القرار.',clear:'حتى مع تفاوت التقديرات، يبقى هذا الخيار أقل تكلفة.',invalid:'أدخل أسعارًا وكميات موجبة، ونسبة فاقد بين 0 و75%، وهامشًا بين 0 و20 نقطة.',labelA:'A',labelB:'B',overlap:'تقديرات متداخلة',certainA:'A أرخص',certainB:'B أرخص',reset:'إعادة المثال',note:'الأرقام افتراضية. يفترض هذا الحساب البسيط أن عدم اليقين يتعلق بنسبة الفاقد فقط. هذه تجربة على صفحة التعريف وليست واجهة Nokarvo الحقيقية أو ضمانًا للسعر. لا تُستخدم الكاميرا ولا يتم حفظ البيانات أو إرسالها.',unit:'لكل 100 غ',none:'—',rangeLegend:'أدنى إلى أعلى تكلفة تقديرية'}
  };
  const SAMPLES={
    overlap:[[300,1000,20,10],[340,1000,10,5]],
    a:[[280,1000,10,3],[390,1000,20,5]],
    b:[[390,1000,30,5],[270,1000,10,3]]
  };
  const $=(r,q)=>r.querySelector(q);
  const $$=(r,q)=>Array.from(r.querySelectorAll(q));
  const valid=(n,lo,hi)=>Number.isFinite(n)&&n>=lo&&n<=hi;
  function i18n(){const lang=String(document.getElementById('p199-language')?.value||document.documentElement.lang||'en').toLowerCase().split(/[-_]/)[0];return COPY[lang]?lang:'en';}
  function number(n,d=2){return n.toLocaleString(i18n()==='ja'?'ja-JP':i18n()==='ar'?'ar-EG':'en-US',{minimumFractionDigits:d,maximumFractionDigits:d});}
  function mount(){
    const body=document.body;
    if(!body||(body.dataset.p199Id!==APP&&body.dataset.p19AppId!==APP)||document.getElementById(ID))return;
    const overview=document.getElementById('overview');if(!overview)return;
    const root=document.createElement('section');root.id=ID;root.className='nk114';root.setAttribute('aria-labelledby','nk114-title');root.setAttribute('data-illustration','true');
    root.innerHTML=`
      <div class="nk114-top"><span data-i="kicker" class="nk114-kicker"></span><span data-i="example" class="nk114-chip"></span></div>
      <div class="nk114-head"><h2 id="nk114-title" data-i="heading"></h2><p data-i="lead"></p></div>
      <div class="nk114-actions" role="group" aria-label="Scenarios">
        <button type="button" data-preset="overlap" data-i="overlap"></button>
        <button type="button" data-preset="a" data-i="certainA"></button>
        <button type="button" data-preset="b" data-i="certainB"></button>
      </div>
      <div class="nk114-cards">
        ${[0,1].map((i)=>`<article class="nk114-card" data-side="${i}"><h3 data-i="${i===0?'a':'b'}"></h3>
          <div class="nk114-fields">
          ${[['price','shelf','300','0.01','1000000','0.01'],['amount','weight','1000','1','1000000','1'],['loss','loss','20','0','75','1'],['spread','margin','10','0','20','1']].map(([field,label,value,min,max,step])=>`<label><span data-i="${label}"></span><input data-field="${field}" inputmode="decimal" type="number" value="${value}" min="${min}" max="${max}" step="${step}" aria-label="${field} ${i===0?'A':'B'}"/></label>`).join('')}
          </div>
          <div class="nk114-range-heading" data-i="usable"></div><div class="nk114-range-value" data-out="price-range"></div>
          <div class="nk114-bar" role="img" aria-label="Price range"><span class="nk114-track"></span><span class="nk114-segment" data-out="bar"></span></div>
        </article>`).join('')}
      </div>
      <div class="nk114-result" aria-live="polite" aria-atomic="true"><div class="nk114-result-label" data-i="range"></div><strong data-out="verdict"></strong><p data-out="explanation"></p></div>
      <div class="nk114-bottom"><span data-i="rangeLegend"></span><button type="button" data-action="reset" data-i="reset"></button></div>
      <p class="nk114-note" data-i="note"></p>`;
    overview.insertAdjacentElement('afterend',root);
    const loc=()=>COPY[i18n()];
    const inputs=$$(root,'[data-side]');
    function paintCopy(){const copy=loc();$$(root,'[data-i]').forEach(el=>{el.textContent=copy[el.dataset.i]||''});root.setAttribute('dir',i18n()==='ar'?'rtl':'ltr');}
    function readCard(card){const vals={};for(const input of $$(card,'input')){if(input.value.trim()==='')return null;vals[input.dataset.field]=Number(input.value)};if(!valid(vals.price,0.01,1000000)||!valid(vals.amount,1,1000000)||!valid(vals.loss,0,75)||!valid(vals.spread,0,20))return null;
      const small=Math.max(0,vals.loss-vals.spread),large=Math.min(95,vals.loss+vals.spread);
      return {low:100*vals.price/(vals.amount*(1-small/100)),high:100*vals.price/(vals.amount*(1-large/100))};
    }
    function update(){paintCopy();const results=inputs.map(readCard),copy=loc();
      if(results.some(v=>!v)){$(root,'[data-out="verdict"]').textContent=copy.invalid;$(root,'[data-out="explanation"]').textContent='';inputs.forEach(card=>{$(card,'[data-out="price-range"]').textContent=copy.none;$(card,'[data-out="bar"]').style.width='0%'});return}
      const max=Math.max(...results.map(r=>r.high))*1.05;
      results.forEach((v,i)=>{
        $(inputs[i],'[data-out="price-range"]').textContent=`${number(v.low)} – ${number(v.high)} (${copy.unit})`;
        const bar=$(inputs[i],'[data-out="bar"]');bar.style.left=`${100*v.low/max}%`;bar.style.width=`${100*(v.high-v.low)/max}%`;
        bar.setAttribute('aria-label',`${copy[i===0?'a':'b']}: ${number(v.low)} – ${number(v.high)} ${copy.unit}`);
      });
      const eps=1e-9;const outcome=results[0].high+eps<results[1].low?'awins':results[1].high+eps<results[0].low?'bwins':'tooClose';
      const verdict=$(root,'[data-out="verdict"]');verdict.textContent=copy[outcome];verdict.dataset.state=outcome;
      $(root,'[data-out="explanation"]').textContent=copy[outcome==='tooClose'?'gap':'clear'];
    }
    function preset(key){const arr=SAMPLES[key];if(!arr)return;inputs.forEach((card,i)=>{['price','amount','loss','spread'].forEach((field,j)=>{$(card,`[data-field="${field}"]`).value=String(arr[i][j])})});$$(root,'[data-preset]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.preset===key)));update();}
    root.addEventListener('input',e=>{if(e.target.matches('input')){$$(root,'[data-preset]').forEach(b=>b.setAttribute('aria-pressed','false'));update()}});
    root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.preset)preset(b.dataset.preset);else if(b.dataset.action==='reset')preset('overlap')});
    const languageControl=document.getElementById('p199-language');languageControl?.addEventListener('change',update);
    const observer=new MutationObserver(()=>{if(document.getElementById(ID))update();else observer.disconnect()});observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
    preset('overlap');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
