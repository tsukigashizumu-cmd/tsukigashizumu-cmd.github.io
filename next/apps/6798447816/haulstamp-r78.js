/* TSZ LP R78 • HaulStamp: explanatory work record, never an actual app screen. */
(() => {
  'use strict';
  const APP_ID = '6798447816';
  const DEFAULT = Object.freeze({wait:90, handling:45, waitRate:1500, handlingRate:2400, count:18, unitWeight:12.5});
  const WORDS = {
    en: {
      eyebrow:'WORK WORTH REMEMBERING', tag:'INTERACTIVE ILLUSTRATION', title:'Make the invisible hours visible.',
      lead:'Waiting and handling are two different parts of the day. Give them their own time and rate, then see a sample work record come together.',
      heading:'One job, one clear record', segmentWait:'Waiting', segmentHandling:'Cargo handling',
      totalTime:'Total recorded time', totalWeight:'Total handled weight', estimated:'Reference amount',
      rowWait:'Waiting estimate', rowHandling:'Handling estimate', rowQuantity:'Handled items', rowWeight:'Weight per item',
      controls:'Try your own numbers', wait:'Waiting time · minutes', handling:'Handling time · minutes',
      waitRate:'Waiting rate · per hour', handlingRate:'Handling rate · per hour', count:'Handled quantity', unitWeight:'Weight per item · kg',
      reset:'Reset example', minute:'min', hour:'h', kg:'kg', units:'items', currency:'currency units',
      invalid:'Enter valid nonnegative numbers.',
      note:'This is an LP-only illustration, not a HaulStamp app screenshot or a saved record. The reference amount is simply (minutes ÷ 60 × hourly rate) for each phase; it is not an invoice, unpaid wage, legal entitlement, or guaranteed payment. Use the same currency for both rates. No input is saved.'
    },
    ja: {
      eyebrow:'見えなくなる仕事を、記録に', tag:'操作できる説明用サンプル', title:'荷待ちも荷役も、数字に残す。',
      lead:'荷待ちと荷役を別々の時間・単価で記録する。ひとつの仕事が、振り返れる明細に変わる様子を試せます。',
      heading:'一件の作業を、ひとつの記録に', segmentWait:'荷待ち', segmentHandling:'荷役',
      totalTime:'記録した合計時間', totalWeight:'取り扱った総重量', estimated:'参考額の合計',
      rowWait:'荷待ちの参考額', rowHandling:'荷役の参考額', rowQuantity:'取り扱い個数', rowWeight:'1個あたりの重量',
      controls:'数値を変更する', wait:'荷待ち時間（分）', handling:'荷役時間（分）',
      waitRate:'荷待ち時間単価（1時間）', handlingRate:'荷役時間単価（1時間）', count:'取り扱い個数', unitWeight:'1個の重量（kg）',
      reset:'最初の例に戻す', minute:'分', hour:'時間', kg:'kg', units:'個', currency:'通貨単位',
      invalid:'0以上の有効な数値を入力してください。',
      note:'LP専用の説明用サンプルです。HaulStampの実画面でも保存済みの作業記録でもありません。参考額は「各作業時間（分）÷60×設定時間単価」の単純計算で、請求額・未払賃金・法的に認められる金額を示しません。2つの単価は同一通貨で入力してください。入力値は保存されません。'
    },
    ar: {
      eyebrow:'وثّق العمل الذي يصعب تذكّره', tag:'مثال تفاعلي توضيحي', title:'كل دقيقة عمل تستحق سجلًا واضحًا.',
      lead:'افصل وقت الانتظار عن وقت مناولة الحمولة، ثم شاهد مثالًا لكيفية جمع المدة والوزن والمبلغ المرجعي في سجل واحد.',
      heading:'مهمة واحدة، سجل واضح', segmentWait:'الانتظار', segmentHandling:'المناولة',
      totalTime:'إجمالي الوقت', totalWeight:'الوزن الإجمالي', estimated:'المبلغ المرجعي',
      rowWait:'تقدير الانتظار', rowHandling:'تقدير المناولة', rowQuantity:'عدد القطع', rowWeight:'وزن القطعة',
      controls:'جرّب أرقامًا مختلفة', wait:'مدة الانتظار · دقائق', handling:'مدة المناولة · دقائق',
      waitRate:'معدل الانتظار · للساعة', handlingRate:'معدل المناولة · للساعة', count:'عدد القطع', unitWeight:'وزن القطعة · كغ',
      reset:'إعادة المثال', minute:'دقيقة', hour:'ساعة', kg:'كغ', units:'قطعة', currency:'وحدة نقدية',
      invalid:'أدخل أرقامًا صالحة غير سالبة.',
      note:'هذا مثال توضيحي لصفحة التعريف، وليس لقطة من HaulStamp أو سجلًا محفوظًا. يُحسب المبلغ المرجعي بضرب الدقائق ÷ 60 في سعر الساعة لكل مرحلة. لا يمثل فاتورة أو أجرًا مستحقًا أو حقًا قانونيًا أو دفعة مضمونة. استخدم العملة نفسها للمعدلين. لا تُحفظ المدخلات.'
    }
  };
  function langKey(){
    const chosen = document.getElementById('p199-language')?.value || document.documentElement.lang || 'en';
    const base = String(chosen).toLowerCase().split(/[-_]/)[0];
    return Object.prototype.hasOwnProperty.call(WORDS,base) ? base : 'en';
  }
  const fmt = (v, places=2) => Number(v).toLocaleString(langKey()==='ja'?'ja-JP':langKey()==='ar'?'ar-EG':'en-US',
    {maximumFractionDigits:places, minimumFractionDigits:0});
  function calc(v){
    const all = Object.values(v);
    if(!all.every(x => Number.isFinite(x) && x>=0 && x<=10000000) || !Number.isInteger(v.count)) return null;
    const waitValue = v.wait*v.waitRate/60;
    const handlingValue = v.handling*v.handlingRate/60;
    const total = waitValue+handlingValue;
    const totalWeight = v.count*v.unitWeight;
    if(![waitValue,handlingValue,total,totalWeight].every(Number.isFinite))return null;
    return {waitValue,handlingValue,total,time:v.wait+v.handling,totalWeight};
  }
  function mount(){
    const body=document.body;
    if(!body || (body.dataset.p199Id!==APP_ID && body.dataset.p19AppId!==APP_ID))return;
    const anchor=document.getElementById('overview');
    if(!anchor || document.getElementById('tsz-hs78'))return;
    const root=document.createElement('section');
    root.id='tsz-hs78';
    root.setAttribute('aria-label','HaulStamp work record illustrative calculator');
    root.setAttribute('data-illustration','not-an-app-screenshot');
    root.innerHTML=`
      <div class="hs78-top"><span class="hs78-eyebrow" data-copy="eyebrow"></span><span class="hs78-tag" data-copy="tag"></span></div>
      <div class="hs78-cols">
        <div class="hs78-story">
          <h2 data-copy="title"></h2><p class="hs78-lead" data-copy="lead"></p>
          <div class="hs78-slip" aria-live="polite" aria-atomic="true">
            <div class="hs78-sliphead"><span data-copy="heading"></span><span class="hs78-dot" aria-hidden="true"></span></div>
            <div class="hs78-timeline"><div class="hs78-timeline-row"><span data-copy="segmentWait"></span><b data-out="waitLabel"></b></div>
              <div class="hs78-track"><div class="hs78-fill wait" data-out="waitBar"></div></div>
              <div class="hs78-timeline-row"><span data-copy="segmentHandling"></span><b data-out="handlingLabel"></b></div>
              <div class="hs78-track"><div class="hs78-fill handling" data-out="handlingBar"></div></div>
            </div>
            <div class="hs78-hero"><div><span data-copy="estimated"></span><strong data-out="total"></strong><small data-copy="currency"></small></div>
            <div class="hs78-stats"><p><span data-copy="totalTime"></span><b data-out="time"></b></p><p><span data-copy="totalWeight"></span><b data-out="weight"></b></p></div></div>
            <div class="hs78-receipt"><p><span data-copy="rowWait"></span><b data-out="waitValue"></b></p>
            <p><span data-copy="rowHandling"></span><b data-out="handlingValue"></b></p>
            <p><span data-copy="rowQuantity"></span><b data-out="count"></b></p>
            <p><span data-copy="rowWeight"></span><b data-out="unitWeight"></b></p></div>
            <p class="hs78-error" data-out="error" role="status"></p>
          </div>
        </div>
        <div class="hs78-editor"><h3 data-copy="controls"></h3>
          <div class="hs78-fields">
            <label><span data-copy="wait"></span><input data-field="wait" type="number" min="0" max="10000000" step="any" inputmode="decimal" value="90"></label>
            <label><span data-copy="handling"></span><input data-field="handling" type="number" min="0" max="10000000" step="any" inputmode="decimal" value="45"></label>
            <label><span data-copy="waitRate"></span><input data-field="waitRate" type="number" min="0" max="10000000" step="any" inputmode="decimal" value="1500"></label>
            <label><span data-copy="handlingRate"></span><input data-field="handlingRate" type="number" min="0" max="10000000" step="any" inputmode="decimal" value="2400"></label>
            <label><span data-copy="count"></span><input data-field="count" type="number" min="0" max="10000000" step="1" inputmode="numeric" value="18"></label>
            <label><span data-copy="unitWeight"></span><input data-field="unitWeight" type="number" min="0" max="10000000" step="any" inputmode="decimal" value="12.5"></label>
          </div><button type="button" class="hs78-reset" data-act="reset" data-copy="reset"></button>
        </div>
      </div><p class="hs78-caveat" data-copy="note"></p>`;
    anchor.insertAdjacentElement('afterend',root);
    function set(key,value){root.querySelector(`[data-out="${key}"]`).textContent=value;}
    function render(){
      const t=WORDS[langKey()];root.dir=langKey()==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-copy]').forEach(node=>{const key=node.dataset.copy;if(t[key])node.textContent=t[key];});
      const values={};
      for(const key of Object.keys(DEFAULT)){
        const input=root.querySelector(`[data-field="${key}"]`);
        values[key]=input.value.trim()===''?NaN:Number(input.value);
      }
      const c=calc(values);
      root.dataset.valid=String(Boolean(c));
      set('error',c?'':t.invalid);
      if(!c){for(const key of ['total','time','weight','waitValue','handlingValue','count','unitWeight','waitLabel','handlingLabel'])set(key,'—');
        root.querySelectorAll('.hs78-fill').forEach(el=>el.style.width='0%');return;}
      set('total',fmt(c.total));set('time',fmt(c.time)+' '+t.minute);
      set('weight',fmt(c.totalWeight)+' '+t.kg);
      set('waitValue',fmt(c.waitValue));set('handlingValue',fmt(c.handlingValue));
      set('count',fmt(values.count,0)+' '+t.units);set('unitWeight',fmt(values.unitWeight)+' '+t.kg);
      set('waitLabel',fmt(values.wait)+' '+t.minute);set('handlingLabel',fmt(values.handling)+' '+t.minute);
      const max=Math.max(values.wait,values.handling,1);
      root.querySelector('[data-out="waitBar"]').style.width=(values.wait/max*100)+'%';
      root.querySelector('[data-out="handlingBar"]').style.width=(values.handling/max*100)+'%';
    }
    root.querySelectorAll('input').forEach(e=>e.addEventListener('input',render));
    root.querySelector('[data-act="reset"]').addEventListener('click',()=>{
      for(const [k,v] of Object.entries(DEFAULT))root.querySelector(`[data-field="${k}"]`).value=String(v);
      render();
    });
    document.getElementById('p199-language')?.addEventListener('change',render);
    let last=langKey();
    new MutationObserver(()=>{const current=langKey();if(current!==last){last=current;render();}})
      .observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
