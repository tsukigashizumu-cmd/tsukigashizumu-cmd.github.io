/* R132 — website-only warranty deadline preview; illustrative dates, no real notifications or data storage. */
(() => {
  'use strict';
  const APP_ID='6804757195';
  const I18N={
    en:{eyebrow:'WARRANTY DEADLINE · A REPAIR CHECK',tag:'INTERACTIVE WEBSITE EXAMPLE',title:'Before paying for a repair, check the warranty date.',intro:'Change the purchase date, warranty length or check date. See the expected expiry and a sample reminder—then check the actual coverage terms.',product:'Example item',item:'Headphones',purchase:'Purchase date',months:'Warranty length',monthUnit:'months',check:'Date you want to check',lead:'Remind ahead',days:'days',clock:'Reminder time',update:'Calculate dates',expiredPreset:'Try a date after expiry',reset:'Reset website example',summary:'Your example dates',expiry:'Estimated expiry date',reminder:'Sample reminder date',status:'Calendar status',remaining:'days remaining',overdue:'days past the estimated deadline',due:'estimated deadline is today',onTime:'Before the estimated deadline',past:'After the estimated deadline',today:'On the estimated deadline',error:'Enter valid dates, a warranty of 1–120 months, and a reminder of 0–365 days.',noNotify:'This website does not schedule notifications.',warning:'A calendar estimate is not a warranty-coverage decision. Manufacturer or seller terms, exclusions and proof of purchase determine actual eligibility. No records, notifications or account data are created by this website example.',asOf:'As checked on',noEarlier:'The sample reminder date can be before the purchase date; confirm the real reminder timing in the app.',footer:'Illustrative example only · No external requests or persistent storage.'},
    ja:{eyebrow:'WARRANTY DEADLINE · 修理前の確認',tag:'LP専用・操作デモ',title:'修理代を払う前に、保証期限を確認する。',intro:'購入日・保証期間・確認したい日付を変更。予想される保証終了日と通知予定日を並べて確認します。実際の保証条件は別途確認してください。',product:'サンプル商品',item:'ヘッドホン',purchase:'購入日',months:'保証期間',monthUnit:'か月',check:'確認する日',lead:'何日前に知らせる？',days:'日前',clock:'通知時刻',update:'日付を計算する',expiredPreset:'期限後の日付を試す',reset:'LPデモを初期化',summary:'サンプルの確認結果',expiry:'保証終了予定日',reminder:'通知予定日（見本）',status:'日付上の状態',remaining:'日残っています',overdue:'日過ぎています',due:'今日が終了予定日です',onTime:'予定の終了日前です',past:'予定の終了日を過ぎています',today:'予定の終了日当日です',error:'有効な日付と、1〜120か月の保証期間、0〜365日前の通知日数を入力してください。',noNotify:'このLPでは通知予約を行いません。',warning:'日付の計算結果は保証適用の判定ではありません。実際の保証対象・除外条件・購入証明はメーカーや販売店の規約でご確認ください。このLPでは記録・通知・アカウント情報を作成しません。',asOf:'確認日',noEarlier:'通知予定日が購入日より前になる場合もあります。実際の通知設定を確認してください。',footer:'説明用サンプル · 外部通信・永続保存なし'},
    ar:{eyebrow:'WARRANTY DEADLINE · قبل الإصلاح',tag:'مثال تفاعلي على الموقع',title:'تحقق من انتهاء الضمان قبل دفع تكلفة الإصلاح.',intro:'غيّر تاريخ الشراء ومدة الضمان وتاريخ التحقق لمشاهدة انتهاء الضمان المتوقع وموعد تذكير توضيحي. تحقق من شروط التغطية الفعلية دائمًا.',product:'منتج توضيحي',item:'سماعات الرأس',purchase:'تاريخ الشراء',months:'مدة الضمان',monthUnit:'شهرًا',check:'تاريخ التحقق',lead:'التذكير قبل',days:'يومًا',clock:'وقت التذكير',update:'حساب التواريخ',expiredPreset:'جرّب تاريخًا بعد الانتهاء',reset:'إعادة المثال على الموقع',summary:'نتيجة المثال',expiry:'تاريخ الانتهاء المتوقع',reminder:'موعد تذكير توضيحي',status:'حالة التاريخ',remaining:'يومًا متبقيًا',overdue:'يومًا بعد الموعد المتوقع',due:'اليوم موعد الانتهاء المتوقع',onTime:'قبل الموعد المتوقع',past:'بعد الموعد المتوقع',today:'في يوم الانتهاء المتوقع',error:'أدخل تواريخ صالحة، ومدة ضمان من 1 إلى 120 شهرًا، وتذكيرًا من 0 إلى 365 يومًا.',noNotify:'لا تُجدول تنبيهات من هذا الموقع.',warning:'حساب التاريخ لا يثبت سريان الضمان. تعتمد الأهلية الفعلية والاستثناءات وإثبات الشراء على شروط الشركة المصنعة أو البائع. لا ينشئ الموقع سجلات أو إشعارات أو حسابات.',asOf:'تاريخ التحقق',noEarlier:'قد يسبق تاريخ التذكير تاريخ الشراء. تحقق من توقيت التنبيه الفعلي داخل التطبيق.',footer:'مثال توضيحي فقط · دون اتصال خارجي أو تخزين دائم'}
  };
  const INIT={purchase:'2025-04-10',months:'24',check:'2026-11-11',lead:'30',clock:'18:00'};
  function lang(){const v=String(document.getElementById('p199-language')?.value||document.documentElement.lang||navigator.language||'en').toLowerCase().split(/[-_]/)[0];return I18N[v]?v:'en'}
  const pad=n=>String(n).padStart(2,'0');
  function utcDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return null;const [y,m,d]=value.split('-').map(Number);const dt=new Date(Date.UTC(y,m-1,d));if(dt.getUTCFullYear()!==y||dt.getUTCMonth()!==m-1||dt.getUTCDate()!==d)return null;return dt}
  function iso(d){return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`}
  function monthsAfter(date,n){const y=date.getUTCFullYear(),m=date.getUTCMonth(),d=date.getUTCDate();const first=new Date(Date.UTC(y,m+n,1));const lastDay=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0)).getUTCDate();first.setUTCDate(Math.min(d,lastDay));return first}
  function daysBetween(a,b){return Math.round((b.getTime()-a.getTime())/86400000)}
  function fmt(d,l){return new Intl.DateTimeFormat(l==='ja'?'ja-JP':l==='ar'?'ar-EG':'en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(d)}
  function mount(){
    if(document.getElementById('tsz-wd132')||!document.body)return;
    const bodyId=document.body.dataset.p199Id||document.body.dataset.p19AppId||'';
    if(bodyId&&bodyId!==APP_ID)return;
    if(!bodyId&&!document.querySelector(`a[href*="${APP_ID}"]`)&&!document.querySelector(`link[rel="canonical"][href*="${APP_ID}"]`))return;
    const target=document.getElementById('overview')||document.querySelector('main');
    if(!target)return;
    const root=document.createElement('section');root.id='tsz-wd132';root.dataset.websiteOnly='true';
    root.innerHTML=`<div class="wd132-top"><span data-t="eyebrow"></span><span class="wd132-pill" data-t="tag"></span></div>
      <div class="wd132-head"><h2 data-t="title"></h2><p data-t="intro"></p></div>
      <div class="wd132-grid"><div class="wd132-inputs">
        <div class="wd132-product"><span class="wd132-label" data-t="product"></span><strong data-t="item"></strong></div>
        <div class="wd132-fields">
          <label><span data-t="purchase"></span><input data-field="purchase" type="date" required></label>
          <label><span data-t="months"></span><div class="wd132-number"><input data-field="months" type="number" inputmode="numeric" min="1" max="120" step="1" required><span data-t="monthUnit"></span></div></label>
          <label><span data-t="check"></span><input data-field="check" type="date" required></label>
          <label><span data-t="lead"></span><div class="wd132-number"><input data-field="lead" type="number" inputmode="numeric" min="0" max="365" step="1" required><span data-t="days"></span></div></label>
          <label class="wd132-span2"><span data-t="clock"></span><input data-field="clock" type="time" required></label>
        </div><div class="wd132-actions"><button type="button" data-action="calculate" class="wd132-primary" data-t="update"></button><button type="button" data-action="expired" class="wd132-alt" data-t="expiredPreset"></button></div>
      </div><div class="wd132-results"><div class="wd132-result-title"><span data-t="summary"></span><span class="wd132-mark">◷</span></div>
        <div class="wd132-output"><span data-t="expiry"></span><strong data-output="expiry"></strong></div>
        <div class="wd132-output"><span data-t="reminder"></span><strong data-output="reminder"></strong></div>
        <div class="wd132-status" data-status="active" aria-live="polite"><span data-t="status"></span><strong data-output="status"></strong><small data-output="days"></small></div>
        <p class="wd132-nonotify" data-t="noNotify"></p><p class="wd132-asof" data-output="asof"></p>
      </div></div><p class="wd132-error" data-output="error" role="alert" hidden></p>
      <p class="wd132-warning" data-t="warning"></p><div class="wd132-bottom"><span data-t="footer"></span><button type="button" data-action="reset" data-t="reset"></button></div>`;
    if(target.id==='overview')target.insertAdjacentElement('afterend',root);else target.prepend(root);
    for(const [field,value] of Object.entries(INIT))root.querySelector(`[data-field="${field}"]`).value=value;
    let lastLanguage='';
    const el=(name)=>root.querySelector(`[data-field="${name}"]`);
    function renderLanguage(){const l=lang(),t=I18N[l];lastLanguage=l;root.lang=l;root.dir=l==='ar'?'rtl':'ltr';root.querySelectorAll('[data-t]').forEach(n=>n.textContent=t[n.dataset.t]||'');return [l,t]}
    function calculate(){const [l,t]=renderLanguage();const p=utcDate(el('purchase').value),c=utcDate(el('check').value);const mo=Number(el('months').value),lead=Number(el('lead').value),clock=el('clock').value;const valid=p&&c&&Number.isInteger(mo)&&mo>=1&&mo<=120&&Number.isInteger(lead)&&lead>=0&&lead<=365&&/^([01]\d|2[0-3]):[0-5]\d$/.test(clock);
      const error=root.querySelector('[data-output="error"]');root.dataset.valid=String(Boolean(valid));error.hidden=Boolean(valid);error.textContent=valid?'':t.error;
      const out=name=>root.querySelector(`[data-output="${name}"]`);
      if(!valid){['expiry','reminder','status','days','asof'].forEach(x=>out(x).textContent='—');return}
      const expiry=monthsAfter(p,mo),reminder=new Date(expiry.getTime()-lead*86400000),delta=daysBetween(c,expiry);
      out('expiry').textContent=fmt(expiry,l);out('reminder').textContent=fmt(reminder,l)+' · '+clock;
      const status=delta<0?'past':delta===0?'today':'onTime';root.dataset.status=status;root.querySelector('.wd132-status').dataset.status=status;
      out('status').textContent=t[status];out('days').textContent=delta<0?String(Math.abs(delta))+' '+t.overdue:delta===0?t.due:String(delta)+' '+t.remaining;
      out('asof').textContent=t.asOf+' · '+fmt(c,l);
      root.dataset.expiry=iso(expiry);root.dataset.reminder=iso(reminder);root.dataset.days=String(delta);
    }
    root.addEventListener('click',e=>{const b=e.target.closest('button[data-action]');if(!b||!root.contains(b))return;
      if(b.dataset.action==='expired'){el('check').value='2027-04-25'}
      if(b.dataset.action==='reset')for(const [k,v] of Object.entries(INIT))el(k).value=v;
      calculate();});
    root.addEventListener('input',e=>{if(e.target.matches('[data-field]'))calculate()});
    document.getElementById('p199-language')?.addEventListener('change',calculate);
    new MutationObserver(()=>{if(lastLanguage!==lang())calculate()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    calculate();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
