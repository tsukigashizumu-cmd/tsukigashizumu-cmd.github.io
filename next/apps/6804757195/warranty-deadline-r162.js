/* Warranty Deadline R162 — LP-only illustrative multi-item warranty board. No storage, network, reminders. */
(() => {
  'use strict';
  const APP_ID = '6804757195';
  const EXAMPLES = [
    {id:'headphones', purchased:'2025-12-01', months:12},
    {id:'lamp', purchased:'2025-10-15', months:12},
    {id:'blender', purchased:'2026-04-01', months:24}
  ];
  const TEXT = {
    ja:{kicker:'A CALMER WARRANTY CHECK',chip:'LP専用・操作できる見本',title:'保証期限は、ひとつずつ違う。',lead:'3つの品物を並べると、「まだ大丈夫」と「そろそろ確認」が見えてくる。確認日とお知らせのタイミングを変えてみてください。',date:'確認する日（見本）',leadTime:'確認するタイミング',time:'予定時刻',days:'日前',soon:'選択した品物',due:'保証期限の見込み',reminder:'確認予定の日時',daysLeft:'残り',expired:'期限を過ぎています',today:'今日が期限です',active:'期間内の見込み',dayUnit:'日',sample:'3品の保証カレンダー',purchased:'購入日',period:'入力した保証期間',months:'か月',restore:'最初の見本に戻す',show:'詳細を見る',headphones:'ワイヤレスイヤホン',lamp:'デスクライト',blender:'ミキサー',none:'現在、期限内の品物はありません',note:'この3品・購入日・保証期間・通知予定は紹介ページだけの説明用データです。通知は送信されません。保証の適用範囲や修理の可否はメーカー・販売店の条件によります。実際の保証内容を確認してください。保存・外部送信は行いません。',invalid:'有効な確認日を指定してください。'},
    en:{kicker:'A CALMER WARRANTY CHECK',chip:'INTERACTIVE LP EXAMPLE',title:'Every product has its own deadline.',lead:'Put three items side by side and see which coverage to check first. Change the reference date and when you would like to be reminded.',date:'Date to check (example)',leadTime:'Check ahead of expiry',time:'Planned time',days:'days early',soon:'Selected warranty',due:'Estimated warranty expiry',reminder:'Planned check',daysLeft:'Days left',expired:'Past the entered expiry',today:'Expires on this date',active:'Within entered term',dayUnit:'days',sample:'Three warranty timelines',purchased:'Purchase date',period:'Entered warranty term',months:'months',restore:'Restore example',show:'View detail',headphones:'Wireless earbuds',lamp:'Desk lamp',blender:'Blender',none:'No item is within its entered term',note:'These products, dates, terms and check plans are illustrative data for this landing page only. No notifications are scheduled. Actual coverage and repair eligibility depend on the manufacturer or seller terms. Check your real warranty documentation. Nothing is stored or transmitted.',invalid:'Please enter a valid reference date.'},
    ar:{kicker:'راجع الضمان بهدوء',chip:'مثال تفاعلي لصفحة التعريف',title:'لكل منتج تاريخ انتهاء مختلف.',lead:'قارن ثلاثة منتجات لتعرف أي ضمان يستحق المراجعة أولاً. غيّر تاريخ الفحص وموعد التذكير الافتراضي.',date:'تاريخ الفحص (تجريبي)',leadTime:'المراجعة قبل الانتهاء',time:'وقت الفحص المخطط',days:'يوماً قبل الموعد',soon:'المنتج المحدد',due:'انتهاء الضمان المتوقع',reminder:'موعد المراجعة المخطط',daysLeft:'الأيام المتبقية',expired:'انتهت المدة المدخلة',today:'ينتهي في هذا اليوم',active:'ضمن المدة المدخلة',dayUnit:'يوماً',sample:'ثلاثة جداول للضمان',purchased:'تاريخ الشراء',period:'مدة الضمان المدخلة',months:'شهراً',restore:'استعادة المثال',show:'عرض التفاصيل',headphones:'سماعات لاسلكية',lamp:'مصباح مكتبي',blender:'خلاط',none:'لا يوجد ضمان ضمن المدة المدخلة',note:'هذه المنتجات والتواريخ والمدد ومواعيد المراجعة بيانات افتراضية لصفحة التعريف فقط. لا تُرسل إشعارات. تعتمد التغطية الفعلية وأهلية الإصلاح على شروط الشركة أو البائع؛ تحقق من مستندات الضمان الأصلية. لا يتم حفظ البيانات أو إرسالها.',invalid:'اختر تاريخاً صحيحاً للفحص.'}
  };
  const language=()=>{const value=String(document.getElementById('p199-language')?.value||document.documentElement.lang||'en').toLowerCase().split(/[-_]/)[0];return TEXT[value]?value:'en';};
  const utc=(s)=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return NaN;const d=Date.parse(s+'T00:00:00Z');return Number.isFinite(d)&&new Date(d).toISOString().slice(0,10)===s?d:NaN;};
  const endDate=(purchase,months)=>{const d=new Date(utc(purchase));const day=d.getUTCDate();const y=d.getUTCFullYear(),m=d.getUTCMonth()+months;const last=new Date(Date.UTC(y,m+1,0)).getUTCDate();return Date.UTC(y,m,Math.min(day,last));};
  const dayDiff=(a,b)=>Math.round((a-b)/86400000);
  function mount(){
    if(document.getElementById('tsz-wd162'))return;
    const id=document.body?.dataset.p199Id||document.body?.dataset.p19AppId||'';
    if(id&&id!==APP_ID)return;
    if(!id&&!document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor=document.getElementById('tsz-wd132')||document.getElementById('tsz-wd-r132')||document.getElementById('overview');
    const main=document.querySelector('main');if(!anchor&&!main)return;
    const root=document.createElement('section');root.id='tsz-wd162';root.dataset.lpOnly='true';root.setAttribute('aria-label','Illustrative three-item warranty timeline');
    root.innerHTML=`<div class="wd162-heading"><div><div class="wd162-kicker" data-copy="kicker"></div><h2 data-copy="title"></h2><p class="wd162-lead" data-copy="lead"></p></div><span class="wd162-chip" data-copy="chip"></span></div><div class="wd162-layout"><div class="wd162-panel wd162-controls"><div class="wd162-field"><label data-copy="date" for="wd162-date"></label><input type="date" id="wd162-date" value="2026-11-11" min="2000-01-01" max="2099-12-31"></div><div class="wd162-field"><span data-copy="leadTime"></span><div class="wd162-options" data-lead-options></div></div><div class="wd162-field"><label data-copy="time" for="wd162-time"></label><input type="time" id="wd162-time" value="09:00"></div><button class="wd162-reset" type="button" data-reset></button><p class="wd162-error" data-error role="alert" hidden></p></div><div class="wd162-panel wd162-highlight"><div class="wd162-highlight-crest"><span class="wd162-orbit" aria-hidden="true">◎</span><span data-copy="soon"></span></div><strong class="wd162-next" data-next-name></strong><div class="wd162-big-date" data-next-date></div><div class="wd162-minor" data-next-days></div><div class="wd162-divider"></div><div class="wd162-micro-label" data-copy="reminder"></div><strong data-next-reminder></strong><div class="wd162-explainer" data-copy="note"></div></div></div><div class="wd162-cards-heading"><h3 data-copy="sample"></h3><span data-count></span></div><div class="wd162-cards" data-cards></div>`;
    if(anchor)anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    let ahead=14,selected='headphones',lastLang='';
    const dateField=root.querySelector('#wd162-date'),timeField=root.querySelector('#wd162-time');
    const formatDate=(ms,lang)=>Number.isFinite(ms)?new Intl.DateTimeFormat(lang==='ja'?'ja-JP':lang==='ar'?'ar-EG':'en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(new Date(ms)):'—';
    const formatted=(n,lang)=>new Intl.NumberFormat(lang==='ar'?'ar-EG':lang==='ja'?'ja-JP':'en-US').format(n);
    function draw(){
      const lang=language(),t=TEXT[lang];lastLang=lang;root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-copy]').forEach(el=>{el.textContent=t[el.dataset.copy]||'';});
      root.querySelector('[data-reset]').textContent=t.restore;
      const opts=root.querySelector('[data-lead-options]');opts.replaceChildren();
      [7,14,30].forEach(d=>{const b=document.createElement('button');b.type='button';b.dataset.days=String(d);b.setAttribute('aria-pressed',String(d===ahead));b.textContent=`${formatted(d,lang)} ${t.days}`;b.addEventListener('click',()=>{ahead=d;draw();});opts.append(b);});
      const checking=utc(dateField.value),valid=Number.isFinite(checking)&&dateField.value>='2000-01-01'&&dateField.value<='2099-12-31';
      const error=root.querySelector('[data-error]');error.hidden=valid;error.textContent=valid?'':t.invalid;
      const cards=root.querySelector('[data-cards]');cards.replaceChildren();
      const rows=EXAMPLES.map(item=>({...item,exp:endDate(item.purchased,item.months)})).sort((a,b)=>a.exp-b.exp);
      let next=rows.find(item=>valid&&dayDiff(item.exp,checking)>=0)||null;
      root.dataset.next=next?.id||'';root.dataset.ahead=String(ahead);root.dataset.valid=String(valid);root.dataset.selected=selected;
      rows.forEach(item=>{
        const remaining=valid?dayDiff(item.exp,checking):null;const past=remaining!==null&&remaining<0;
        const card=document.createElement('article');card.className='wd162-card';card.dataset.product=item.id;card.dataset.past=String(past);card.dataset.selected=String(selected===item.id);
        const top=document.createElement('div');top.className='wd162-cardtop';
        const name=document.createElement('strong');name.textContent=t[item.id];
        const pill=document.createElement('span');pill.className='wd162-pill';pill.textContent=!valid?'—':past?t.expired:remaining===0?t.today:t.active;
        top.append(name,pill);
        const due=document.createElement('div');due.className='wd162-expire';due.textContent=formatDate(item.exp,lang);
        const aside=document.createElement('div');aside.className='wd162-cardremaining';aside.textContent=valid?`${t.daysLeft} ${formatted(remaining,lang)} ${t.dayUnit}`:'—';
        const details=document.createElement('div');details.className='wd162-carddetails';details.textContent=`${t.purchased}: ${formatDate(utc(item.purchased),lang)} · ${t.period}: ${formatted(item.months,lang)} ${t.months}`;
        const remind=document.createElement('div');remind.className='wd162-cardremind';remind.textContent=`${t.reminder}: ${formatDate(item.exp-ahead*86400000,lang)} · ${timeField.value||'09:00'}`;
        const button=document.createElement('button');button.type='button';button.textContent=t.show;button.setAttribute('aria-pressed',String(selected===item.id));button.addEventListener('click',()=>{selected=item.id;draw();});
        card.append(top,due,aside,details,remind,button);cards.append(card);
      });
      const chosen=rows.find(row=>row.id===selected)||next||rows[0];const use=chosen||next;
      root.dataset.earliest=next?.id||'';
      root.querySelector('[data-next-name]').textContent=use?t[use.id]:t.none;
      root.querySelector('[data-next-date]').textContent=use?formatDate(use.exp,lang):'—';
      root.querySelector('[data-next-days]').textContent=use&&valid?`${t.daysLeft} ${formatted(dayDiff(use.exp,checking),lang)} ${t.dayUnit}`:'—';
      root.querySelector('[data-next-reminder]').textContent=use?`${formatDate(use.exp-ahead*86400000,lang)} · ${timeField.value||'09:00'}`:'—';
      root.querySelector('[data-count]').textContent=`${formatted(rows.length,lang)}`;
    }
    dateField.addEventListener('input',draw);timeField.addEventListener('change',draw);
    root.querySelector('[data-reset]').addEventListener('click',()=>{dateField.value='2026-11-11';timeField.value='09:00';ahead=14;selected='headphones';draw();});
    document.getElementById('p199-language')?.addEventListener('change',draw);
    new MutationObserver(()=>{if(lastLang!==language())draw();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    draw();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
