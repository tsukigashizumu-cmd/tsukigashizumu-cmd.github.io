/* R174 Buy or Wait — interactive website-only illustrative comparison.
 * Does NOT predict prices, monitor sales, send alerts, store data, track or access the network.
 */
(() => {
  'use strict';
  const APP='6804757287', ID='tsz-buy-or-wait-r174';
  if (document.body?.dataset.p199Id !== APP || document.getElementById(ID)) return;
  const I18N={
    en:{brand:'BUY OR WAIT',subbrand:'Buy or Wait Calculator',nav:'Try the comparison',eyebrow:'THE VALUE OF WAITING',
      titleA:'Is saving ',titleB:' worth waiting ',titleC:'?',
      lead:'Some savings cost time. You decide what it’s worth.',cta:'View on the App Store',
      today:'Buy today',target:'Your target price',days:'Willing to wait',day:'day',daysUnit:'days',
      saving:'Your savings goal',question:'A comparison, not a price forecast.',
      foot:'No predictions. No pressure. Just perspective.',
      reset:'Reset example',note:'Illustrative values only. The target is your own price goal, not a prediction of a future sale. This web demo does not store data or monitor prices.',
      invalid:'Enter valid non-negative prices up to $1,000,000. Your target must not exceed today’s price.',zero:'No savings goal',tooHigh:'Target above today’s price',
      step1:'1 day',step30:'30 days'},
    ja:{brand:'BUY OR WAIT',subbrand:'購入と待ち時間を比べる',nav:'比較を試す',eyebrow:'待つことの価値を見える化',
      titleA:'',titleB:'節約するために、',titleC:'待てる？',
      lead:'安く買うための待ち時間。その価値を決めるのはあなたです。',cta:'App Storeで見る',
      today:'今買う価格',target:'希望する価格',days:'待てる日数',day:'日',daysUnit:'日',
      saving:'あなたの節約目標',question:'価格予測ではなく、条件の比較です。',
      foot:'予測しない。急がせない。判断材料をひとつ。',reset:'初期化',
      note:'金額と日数はデモ例です。希望価格はご自身の目標で、将来の値下がりを予測するものではありません。Webデモは保存や価格監視を行いません。',
      invalid:'0以上100万以下の有効な金額を入力してください。希望価格は現在価格以下にしてください。',zero:'節約額は0',tooHigh:'希望価格が現在価格を超えています',step1:'1日',step30:'30日'},
    ar:{brand:'BUY OR WAIT',subbrand:'حاسبة الشراء أو الانتظار',nav:'جرّب المقارنة',eyebrow:'قيمة الانتظار',
      titleA:'هل يستحق توفير ',titleB:' انتظار ',titleC:'؟',
      lead:'بعض الوفورات تستلزم وقتاً. أنت تقرر ما يستحق الانتظار.',cta:'عرضه على App Store',
      today:'سعر الشراء اليوم',target:'السعر المستهدف',days:'مدة الانتظار المقبولة',day:'يوم',daysUnit:'يوماً',
      saving:'هدف التوفير',question:'مقارنة وليست توقعاً للأسعار.',
      foot:'لا توقعات. لا ضغط. فقط رؤية أوضح.',reset:'إعادة المثال',
      note:'القيم توضيحية. السعر المستهدف هو هدفك وليس توقعاً لتخفيض مستقبلي. هذا العرض لا يحفظ البيانات ولا يراقب الأسعار.',
      invalid:'أدخل أسعاراً صحيحة بين صفر ومليون دولار، ويجب ألا يتجاوز السعر المستهدف سعر اليوم.',zero:'لا يوجد هدف للتوفير',tooHigh:'السعر المستهدف أعلى من سعر اليوم',step1:'يوم واحد',step30:'30 يوماً'}
  };
  function currentLang(){
    const raw=(document.getElementById('p199-language')?.value || new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en').toLowerCase();
    return raw.startsWith('ja')?'ja':raw.startsWith('ar')?'ar':'en';
  }
  function region(){const r=(document.getElementById('p199-country')?.value || 'us').toLowerCase();return /^[a-z]{2}$/.test(r)?r:'us';}
  const root=document.createElement('section'); root.id=ID;root.className='bw174';root.setAttribute('aria-labelledby','bw174-main-title');
  root.innerHTML=`
    <header class="bw174-header"><div class="bw174-brand"><span class="bw174-mark" aria-hidden="true">⌛</span><div><strong data-bw="brand"></strong><small data-bw="subbrand"></small></div></div><a class="bw174-nav" href="#bw174-demo" data-bw="nav"></a></header>
    <div class="bw174-layout">
      <div class="bw174-copy"><p class="bw174-overline" data-bw="eyebrow"></p><h2 id="bw174-main-title" aria-live="polite"><span data-bw-part="a"></span><em id="bw174-title-money" dir="ltr">$20</em><span data-bw-part="b"></span><em class="bw174-day-em" id="bw174-title-days" dir="auto">14 days</em><span data-bw-part="c"></span></h2><p class="bw174-lead" data-bw="lead"></p><a id="bw174-store" class="bw174-cta" href="https://apps.apple.com/us/app/id6804757287" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">●</span><span data-bw="cta"></span><span aria-hidden="true">↗</span></a></div>
      <div class="bw174-right"><div class="bw174-hourglass" aria-hidden="true"><div class="bw174-sand bw174-sand-up"></div><div class="bw174-sand bw174-sand-down"></div></div>
      <div id="bw174-demo" class="bw174-card"><div class="bw174-tiles">
        <label><span data-bw="today"></span><span class="bw174-value"><b aria-hidden="true">$</b><input id="bw174-today" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="120"></span></label>
        <label><span data-bw="target"></span><span class="bw174-value"><b aria-hidden="true">$</b><input id="bw174-target" type="number" inputmode="decimal" min="0" max="1000000" step="0.01" value="100"></span></label>
        <label><span data-bw="days"></span><span class="bw174-day-value"><strong id="bw174-day-value">14</strong><small data-bw="daysUnit"></small></span></label>
      </div><div class="bw174-slider"><input id="bw174-days" aria-label="Willing to wait" type="range" min="1" max="30" step="1" value="14"><div class="bw174-range-label"><span data-bw="step1"></span><strong id="bw174-range-value">14 days</strong><span data-bw="step30"></span></div></div>
      <div class="bw174-result"><span class="bw174-tag" aria-hidden="true">◇</span><strong data-bw="saving"></strong><output id="bw174-saving" for="bw174-today bw174-target" aria-live="polite" dir="ltr">$20</output></div><p id="bw174-note" data-bw="question"></p><p class="bw174-error" id="bw174-error" role="status" aria-live="polite"></p><button type="button" id="bw174-reset" data-bw="reset"></button></div></div>
    </div>
    <footer class="bw174-footer"><strong data-bw="foot"></strong><p data-bw="note"></p></footer>`;
  const anchor=document.querySelector('.p19-breadcrumb');
  if(anchor)anchor.insertAdjacentElement('afterend',root);
  else {const main=document.getElementById('p199-content') || document.querySelector('main');main?.parentNode?.insertBefore(root,main);}
  if(!root.isConnected)return;
  const $=s=>root.querySelector(s);
  const cash=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:0,maximumFractionDigits:2}).format(n);
  function compute(){
    const l=currentLang(),w=I18N[l],a=$('#bw174-today'),b=$('#bw174-target'),days=Number($('#bw174-days').value);
    const v=Number(a.value),t=Number(b.value),valid=a.value.trim()!==''&&b.value.trim()!==''&&Number.isFinite(v)&&Number.isFinite(t)&&v>=0&&t>=0&&v<=1000000&&t<=1000000&&t<=v;
    a.setAttribute('aria-invalid',String(a.value.trim()===''||!Number.isFinite(v)||v<0||v>1000000));
    b.setAttribute('aria-invalid',String(b.value.trim()===''||!Number.isFinite(t)||t<0||t>1000000||t>v));
    const diff=valid?Math.round((v-t)*100)/100:null;
    const money=valid?cash(diff):'—';
    const dayText=l==='ja'?`${days}日`:l==='ar'?`${days} ${days===1?w.day:w.daysUnit}`:`${days} ${days===1?w.day:w.daysUnit}`;
    $('#bw174-title-money').textContent=money;$('#bw174-title-days').textContent=dayText;
    $('#bw174-saving').textContent=money;$('#bw174-day-value').textContent=days;
    $('#bw174-range-value').textContent=dayText;
    $('#bw174-days').style.setProperty('--bw174-pct',((days-1)/29*100)+'%');
    $('#bw174-error').textContent=valid?'':w.invalid;
    root.classList.toggle('bw174-invalid',!valid);
    $('#bw174-note').textContent=!valid?w.question:diff===0?w.zero:w.question;
  }
  function translate(){
    const l=currentLang(),w=I18N[l];root.lang=l;root.dir=l==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-bw]').forEach(el=>{el.textContent=w[el.dataset.bw]||'';});
    for(const [part,key] of [['a','titleA'],['b','titleB'],['c','titleC']])root.querySelector(`[data-bw-part="${part}"]`).textContent=w[key];
    $('#bw174-store').href=`https://apps.apple.com/${region()}/app/id${APP}`;
    $('#bw174-today').setAttribute('aria-label',w.today);
    $('#bw174-target').setAttribute('aria-label',w.target);
    $('#bw174-days').setAttribute('aria-label',w.days);
    compute();
  }
  ['#bw174-today','#bw174-target','#bw174-days'].forEach(s=>$(s).addEventListener('input',compute));
  $('#bw174-reset').addEventListener('click',()=>{$('#bw174-today').value='120';$('#bw174-target').value='100';$('#bw174-days').value='14';compute();});
  document.getElementById('p199-language')?.addEventListener('change',translate);
  document.getElementById('p199-country')?.addEventListener('change',translate);
  translate();
})();
