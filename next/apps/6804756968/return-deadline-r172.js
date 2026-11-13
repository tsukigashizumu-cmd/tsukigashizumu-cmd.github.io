/* TSZ R172 Return Deadline. Educational website-only date calculator.
 * No persistent storage, real notifications, tracking, network or iOS source changes.
 */
(() => {
  'use strict';
  const APP = '6804756968', ID = 'tsz-return-r172';
  if (document.body?.dataset.p199Id !== APP || document.getElementById(ID)) return;
  const words = {
    en: {brand:'RETURN DEADLINE', eyebrow:'A CLEAR DATE. A CALMER DECISION.', h1:'Know the last day.', h2:'Before it’s too late.',
      subtitle:'Enter the purchase date and return window. See your deadline instantly.', cta:'View on the App Store',
      left:'DAYS LEFT', single:'DAY LEFT', today:'DUE TODAY', overdue:'DAYS OVERDUE', invalid:'CHECK THE DATES',
      returnBy:'Return by', purchase:'Purchase date', window:'Return window (days)', days:'days',
      atPurchase:'Purchase', atToday:'Today', atDue:'Return by', items:'Illustrative items', reset:'Reset example',
      headphones:'Headphones', jacket:'Jacket', shoes:'Shoes', note:'Illustrative examples only. Check your retailer’s actual return policy. This website does not save items or send reminders.',
      foot:'Track multiple items · Choose reminders · Know the final day', sample:'A practical way to see when the return window closes.',
      dateError:'Choose a valid purchase date and a return window of 1–365 days.'},
    ja: {brand:'RETURN DEADLINE', eyebrow:'返品期限を、ひと目で。', h1:'返品できる最後の日を。', h2:'手遅れになる前に。',
      subtitle:'購入日と返品可能期間を入力。最終返品日がすぐにわかります。', cta:'App Storeで見る',
      left:'あと何日', single:'あと1日', today:'今日が期限', overdue:'期限から経過', invalid:'日付を確認',
      returnBy:'返品期限', purchase:'購入日', window:'返品可能期間（日）', days:'日',
      atPurchase:'購入日', atToday:'今日', atDue:'期限', items:'商品の例', reset:'初期化',
      headphones:'ヘッドホン', jacket:'ジャケット', shoes:'靴', note:'架空のサンプルです。必ず店舗の返品規約をご確認ください。このWebデモは商品を保存せず、通知も送信しません。',
      foot:'複数商品の管理 · リマインダー設定 · 最終日を把握', sample:'購入日を変えて、返品期限を試してみましょう。',
      dateError:'有効な購入日と1〜365日の返品可能期間を指定してください。'},
    ar: {brand:'RETURN DEADLINE', eyebrow:'موعد واضح. قرار أهدأ.', h1:'اعرف آخر يوم للإرجاع.', h2:'قبل فوات الأوان.',
      subtitle:'أدخل تاريخ الشراء والمدة المسموحة. اعرف الموعد النهائي فورًا.', cta:'عرضه على App Store',
      left:'أيام متبقية', single:'يوم واحد متبقٍ', today:'الموعد اليوم', overdue:'أيام بعد الموعد', invalid:'تحقق من التاريخ',
      returnBy:'آخر يوم للإرجاع', purchase:'تاريخ الشراء', window:'مدة الإرجاع (بالأيام)', days:'أيام',
      atPurchase:'الشراء', atToday:'اليوم', atDue:'الموعد النهائي', items:'منتجات توضيحية', reset:'إعادة المثال',
      headphones:'سماعات', jacket:'سترة', shoes:'أحذية', note:'أمثلة توضيحية فقط. تحقق من سياسة الإرجاع لدى المتجر. هذا العرض لا يحفظ المنتجات ولا يرسل تذكيرات.',
      foot:'تتبّع عدة منتجات · اختر التذكيرات · اعرف اليوم الأخير', sample:'غيّر التاريخ لمعرفة الموعد النهائي.',
      dateError:'اختر تاريخ شراء صحيحًا وفترة إرجاع من 1 إلى 365 يومًا.'}
  };
  const locale = () => {
    const raw = (document.getElementById('p199-language')?.value || new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en').toLowerCase();
    return raw.startsWith('ja') ? 'ja' : raw.startsWith('ar') ? 'ar' : 'en';
  };
  const region = () => {
    const code = (document.getElementById('p199-country')?.value || 'us').toLowerCase();
    return /^[a-z]{2}$/.test(code) ? code : 'us';
  };
  const addDays = (d, days) => new Date(d.getTime() + days * 86400000);
  const pureDay = d => new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const localToday = () => pureDay(new Date());
  const isoDay = d => d.toISOString().slice(0, 10);
  function parseDay(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    if (!match) return null;
    const y=Number(match[1]), m=Number(match[2]), day=Number(match[3]);
    if(y < 1900 || y > 2100) return null;
    const result = new Date(Date.UTC(y,m-1,day));
    return result.getUTCFullYear()===y && result.getUTCMonth()===m-1 && result.getUTCDate()===day ? result : null;
  }
  const dateText = (date, l) => new Intl.DateTimeFormat(l==='ja'?'ja-JP':l==='ar'?'ar-EG':'en-US', {
    month:'short', day:'numeric', year:'numeric', timeZone:'UTC'
  }).format(date);
  const d0=localToday();
  const initialPurchase=addDays(d0,-11);
  const panel=document.createElement('section');
  panel.id=ID; panel.className='rd172';panel.setAttribute('aria-labelledby','rd172-head');
  panel.innerHTML=`
    <div class="rd172-topbar"><span class="rd172-symbol" aria-hidden="true">↶</span><span class="rd172-brand" data-rd172="brand">RETURN DEADLINE</span><span class="rd172-nav-spacer"></span><a class="rd172-navlink" href="#rd172-demo" data-rd172="sample"></a></div>
    <div class="rd172-grid">
      <div class="rd172-story">
        <div class="rd172-eyebrow" data-rd172="eyebrow"></div>
        <h2 id="rd172-head"><span data-rd172="h1"></span><em data-rd172="h2"></em></h2>
        <p class="rd172-intro" data-rd172="subtitle"></p>
        <a id="rd172-store" class="rd172-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/id6804756968"><span class="rd172-apple" aria-hidden="true">●</span><span data-rd172="cta"></span><span aria-hidden="true">↗</span></a>
        <div class="rd172-paper" aria-hidden="true"><div class="rd172-paper-ring"></div><div class="rd172-paper-month" id="rd172-calendar-month">NOV 2026</div><div id="rd172-calendar-days" class="rd172-calendar-days"></div></div>
      </div>
      <div class="rd172-panel" id="rd172-demo">
        <div class="rd172-count" id="rd172-count-wrap">
          <div class="rd172-count-big"><span class="rd172-clock" aria-hidden="true">↶</span><strong id="rd172-count-number" dir="ltr" aria-live="polite">3</strong><span id="rd172-count-label" data-rd172="left"></span></div>
          <div class="rd172-return"><span data-rd172="returnBy"></span><strong id="rd172-due" dir="auto" aria-live="polite"></strong></div>
        </div>
        <div class="rd172-timeline" role="img" id="rd172-timeline" aria-label="Return period timeline"><span id="rd172-timeline-fill" class="rd172-timeline-fill"></span><i></i><i></i><i></i></div>
        <div class="rd172-milestones">
          <div><small data-rd172="atPurchase"></small><strong id="rd172-at-purchase" dir="auto"></strong></div>
          <div><small data-rd172="atToday"></small><strong id="rd172-at-today" dir="auto"></strong></div>
          <div><small data-rd172="atDue"></small><strong id="rd172-at-due" dir="auto"></strong></div>
        </div>
        <div class="rd172-controls">
          <label for="rd172-purchase"><span data-rd172="purchase"></span><input id="rd172-purchase" type="date" min="1900-01-01" max="2100-12-31" aria-label="Purchase date" required></label>
          <label for="rd172-window"><span data-rd172="window"></span><div class="rd172-windowbox"><input id="rd172-window" type="number" value="14" min="1" max="365" step="1" inputmode="numeric" aria-label="Return window days" required><small data-rd172="days"></small></div></label>
        </div>
        <p id="rd172-error" class="rd172-error" role="status" aria-live="polite"></p>
      </div>
    </div>
    <div class="rd172-list-header"><strong data-rd172="items"></strong><button type="button" id="rd172-reset" data-rd172="reset"></button></div>
    <div class="rd172-items" id="rd172-items"></div>
    <div class="rd172-foot"><strong data-rd172="foot"></strong><p data-rd172="note"></p></div>`;
  const $ = q => panel.querySelector(q);
  const lang = () => locale();
  const diffDays = (future,today) => Math.round((future.getTime()-today.getTime()) / 86400000);
  const cardItems = (purchase,windowDays,today) => [
    {name:'headphones',deadline:purchase&&Number.isFinite(windowDays)?addDays(purchase,windowDays):null, icon:'◉'},
    {name:'jacket',deadline:addDays(today,8),icon:'♧'},
    {name:'shoes',deadline:addDays(today,23),icon:'↗'}
  ];
  function renderCalendar(today,deadline) {
    // Calendar is editorial artwork, not a second data entry control.
    const year=today.getUTCFullYear(), month=today.getUTCMonth();
    const monthString=new Intl.DateTimeFormat('en-US',{month:'short',year:'numeric',timeZone:'UTC'}).format(today).toUpperCase();
    $('#rd172-calendar-month').textContent=monthString;
    const cells=$('#rd172-calendar-days');cells.replaceChildren();
    const first=new Date(Date.UTC(year,month,1)).getUTCDay();
    const days=new Date(Date.UTC(year,month+1,0)).getUTCDate();
    for(let i=0;i<first;i++){const c=document.createElement('span');c.setAttribute('aria-hidden','true');cells.append(c);}
    for(let d=1;d<=days;d++){
      const c=document.createElement('span');c.textContent=String(d);
      if(d===today.getUTCDate())c.classList.add('rd172-cal-today');
      if(deadline && deadline.getUTCFullYear()===year && deadline.getUTCMonth()===month && deadline.getUTCDate()===d)c.classList.add('rd172-cal-due');
      cells.append(c);
    }
  }
  function update(){
    const l=lang(),w=words[l],today=localToday(),purchase=parseDay($('#rd172-purchase').value),raw=$('#rd172-window').value.trim(),windowDays=raw===''?NaN:Number(raw);
    const valid=!!purchase && Number.isInteger(windowDays) && windowDays>=1 && windowDays<=365;
    const due=valid?addDays(purchase,windowDays):null;
    const left=valid?diffDays(due,today):NaN;
    $('#rd172-purchase').setAttribute('aria-invalid',String(!purchase));
    $('#rd172-window').setAttribute('aria-invalid',String(!Number.isInteger(windowDays)||windowDays<1||windowDays>365));
    $('#rd172-error').textContent=valid?'':w.dateError;
    $('#rd172-count-wrap').classList.toggle('rd172-expired',valid && left<0);
    $('#rd172-count-wrap').classList.toggle('rd172-today',valid && left===0);
    $('#rd172-count-number').textContent=valid?String(Math.abs(left)):'—';
    $('#rd172-count-label').textContent=!valid?w.invalid:left<0?w.overdue:left===0?w.today:left===1?w.single:w.left;
    $('#rd172-due').textContent=due?dateText(due,l):'—';
    $('#rd172-at-purchase').textContent=purchase?dateText(purchase,l):'—';
    $('#rd172-at-today').textContent=dateText(today,l);
    $('#rd172-at-due').textContent=due?dateText(due,l):'—';
    const progress=valid?Math.min(100,Math.max(0,(diffDays(today,purchase)/windowDays)*100)):0;
    $('#rd172-timeline-fill').style.width=progress+'%';
    $('#rd172-timeline').querySelector('i:nth-of-type(2)').style.left=progress+'%';
    $('#rd172-timeline').setAttribute('aria-label',`${w.purchase}: ${purchase?dateText(purchase,l):'—'}. ${w.returnBy}: ${due?dateText(due,l):'—'}.`);
    renderCalendar(today,due);
    const items=$('#rd172-items');items.replaceChildren();
    for(const item of cardItems(purchase,valid?windowDays:NaN,today)){
      const days=item.deadline?diffDays(item.deadline,today):NaN;
      const row=document.createElement('div');row.className='rd172-item';
      if(Number.isFinite(days)&&days<0)row.classList.add('rd172-item-late');
      const icon=document.createElement('span');icon.className='rd172-item-icon';icon.textContent=item.icon;icon.setAttribute('aria-hidden','true');
      const name=document.createElement('strong');name.textContent=w[item.name];
      const date=document.createElement('span');date.className='rd172-item-date';date.dir='auto';date.textContent=item.deadline?dateText(item.deadline,l):'—';
      const state=document.createElement('span');state.className='rd172-item-pill';state.dir='auto';state.textContent=Number.isFinite(days)?days<0?`${Math.abs(days)} ${w.overdue}`:days===0?w.today:days===1?w.single:`${days} ${w.days}`:'—';
      row.append(icon,name,date,state);items.append(row);
    }
  }
  function translate(){
    const l=lang();panel.lang=l;panel.dir=l==='ar'?'rtl':'ltr';
    const w=words[l];panel.querySelectorAll('[data-rd172]').forEach(x=>{x.textContent=w[x.dataset.rd172]||'';});
    $('#rd172-store').href='https://apps.apple.com/'+region()+'/app/id'+APP;
    $('#rd172-purchase').setAttribute('aria-label',w.purchase);
    $('#rd172-window').setAttribute('aria-label',w.window);
    update();
  }
  const anchor=document.querySelector('.p19-breadcrumb');
  if(anchor)anchor.insertAdjacentElement('afterend',panel);
  else {const main=document.getElementById('p199-content')||document.querySelector('main');main?.parentNode?.insertBefore(panel,main);}
  if(!panel.isConnected)return;
  $('#rd172-purchase').value=isoDay(initialPurchase);
  $('#rd172-window').value='14';
  $('#rd172-purchase').addEventListener('input',update);
  $('#rd172-window').addEventListener('input',update);
  $('#rd172-reset').addEventListener('click',()=>{$('#rd172-purchase').value=isoDay(addDays(localToday(),-11));$('#rd172-window').value='14';update();});
  document.getElementById('p199-language')?.addEventListener('change',translate);
  document.getElementById('p199-country')?.addEventListener('change',translate);
  translate();
})();
