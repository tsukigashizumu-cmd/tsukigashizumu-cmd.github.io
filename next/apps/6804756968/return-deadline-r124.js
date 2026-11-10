/* TSZ LP R124 / Return Deadline Tracker — reminder planning preview.
 * Website-only illustration. No stored data, actual notifications, or network requests. */
(() => {
  'use strict';
  const APP_ID = '6804756968';
  const TEXT = {
    en: {
      eyebrow:'PLAN BEFORE THE WINDOW CLOSES', badge:'WEBSITE-ONLY INTERACTIVE EXAMPLE',
      title:'Know your last return day. Choose when to remember it.',
      lead:'Your deadline and your reminder are two different dates. Try a store return period, then choose how many days ahead you would like a reminder.',
      settings:'BUILD A SAMPLE REMINDER', purchase:'Purchase date', window:'Return period', days:'days', ahead:'Remind me before the deadline', onday:'On the last day', one:'1 day before', three:'3 days before', seven:'7 days before', time:'Reminder time', reset:'Reset sample',
      timeline:'YOUR RETURN WINDOW', purchased:'Purchased', remind:'Reminder preview', deadline:'Last return day',
      remaining:'Days until deadline', future:'days left', today:'Last day today', expired:'Example window has ended',
      earlier:'The chosen reminder date is already past.', same:'The reminder falls today.', later:'This is when you could choose to be reminded.',
      invalid:'Enter a valid purchase date to see a preview.',
      note:'This is an illustrative website calculator, not an app screen. No alerts are scheduled, no notification permission is requested, and nothing is saved or transmitted. The app can manage multiple items and reminder dates/times, but actual notifications require permission. Retailer rules and cut-off times differ: confirm the seller’s policy before relying on any date.'
    },
    ja: {
      eyebrow:'期限が過ぎる、その前に',badge:'LP専用・操作デモ',
      title:'返品できる最終日と、思い出す日を決める。',
      lead:'返品期限が分かっていても、忘れてしまうことがあります。購入日と返品可能期間を選び、何日前の何時に気づきたいかを試してください。',
      settings:'通知タイミングを試す',purchase:'購入日',window:'返品可能期間',days:'日間',ahead:'期限の何日前に知らせる？',onday:'期限当日',one:'1日前',three:'3日前',seven:'7日前',time:'通知する時刻',reset:'サンプルに戻す',
      timeline:'返品までのタイムライン',purchased:'購入日',remind:'通知予定日のプレビュー',deadline:'返品期限の最終日',
      remaining:'期限までの日数',future:'日残り',today:'今日が最終日',expired:'この例では期限切れ',
      earlier:'選択した通知日はすでに過ぎています。',same:'通知予定日は今日です。',later:'この日時に思い出す設定の例です。',
      invalid:'有効な購入日を入力してください。',
      note:'これはWebページ専用の説明用計算機で、アプリの実画面ではありません。通知は実際には予約されず、権限要求・保存・送信もありません。アプリは複数の商品と通知日・時刻に対応していますが、実際の通知には許可が必要です。店舗ごとに返品条件や締切時刻が異なるため、必ず販売店の規約を確認してください。'
    },
    ar: {
      eyebrow:'خطّط قبل انتهاء مهلة الإرجاع',badge:'مثال تفاعلي على الموقع فقط',
      title:'اعرف آخر يوم للإرجاع، وحدد متى تريد التذكير.',
      lead:'تاريخ انتهاء مهلة الإرجاع ليس هو تاريخ التذكير. جرّب تاريخ الشراء والمهلة، ثم اختر قبل كم يوم تريد تذكيراً.',
      settings:'خطّط لتذكير تجريبي',purchase:'تاريخ الشراء',window:'مهلة الإرجاع',days:'يوماً',ahead:'التذكير قبل الموعد',onday:'في اليوم الأخير',one:'قبل يوم واحد',three:'قبل 3 أيام',seven:'قبل 7 أيام',time:'وقت التذكير',reset:'إعادة المثال',
      timeline:'الجدول الزمني للإرجاع',purchased:'الشراء',remind:'معاينة موعد التذكير',deadline:'آخر يوم للإرجاع',
      remaining:'الأيام حتى انتهاء المهلة',future:'أيام متبقية',today:'اليوم هو الأخير',expired:'انتهت المهلة في هذا المثال',
      earlier:'موعد التذكير المختار قد مضى.',same:'موعد التذكير اليوم.',later:'هذا موعد تذكير يمكنك اختياره.',
      invalid:'أدخل تاريخ شراء صالحاً لعرض المعاينة.',
      note:'هذه حاسبة توضيحية على الموقع، وليست شاشة التطبيق. لا تُجدول إشعارات فعلية ولا تُطلب أذونات ولا تُحفظ البيانات أو تُرسل. يدعم التطبيق عناصر متعددة وأيام التذكير وأوقاته، لكن الإشعارات الفعلية تتطلب الإذن. تختلف شروط الإرجاع وساعات الإغلاق حسب المتجر؛ تحقق من سياسة البائع.'
    }
  };
  function language(){
    const selector=document.getElementById('p199-language');
    const raw=selector?.value || document.documentElement.lang || 'en';
    const candidate=String(raw).toLowerCase().split(/[-_]/)[0];
    return TEXT[candidate] ? candidate : 'en';
  }
  const MS=86400000;
  function today(){const d=new Date();return Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/MS);}
  function parseDay(s){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(s))return null;
    const [y,m,d]=s.split('-').map(Number);
    if(y<2000||y>2100||m<1||m>12||d<1||d>31)return null;
    const ms=Date.UTC(y,m-1,d), check=new Date(ms);
    return check.getUTCFullYear()===y && check.getUTCMonth()===m-1 && check.getUTCDate()===d ? ms/MS : null;
  }
  function ymd(day){return new Date(day*MS).toISOString().slice(0,10);}
  function display(day,lang){
    return new Intl.DateTimeFormat(lang==='ja'?'ja-JP':lang==='ar'?'ar-EG':'en-US',{
      timeZone:'UTC',year:'numeric',month:'short',day:'numeric'
    }).format(new Date(day*MS));
  }
  function mount(){
    const body=document.body;
    if(!body||document.getElementById('tsz-rd124'))return;
    const id=body.dataset.p199Id||body.dataset.p19AppId||'';
    if(id && id!==APP_ID)return;
    if(!id&&!document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor=document.getElementById('tsz-rd86')||document.getElementById('tsz-rd44')||document.getElementById('overview');
    const main=document.querySelector('main');
    if(!anchor&&!main)return;
    const root=document.createElement('section');root.id='tsz-rd124';
    root.dataset.illustration='website-only-reminder-planning';
    root.setAttribute('aria-label','Return deadline and reminder timing illustrative planner');
    root.innerHTML=`
      <div class="rd124-meta"><span data-i="eyebrow"></span><span data-i="badge"></span></div>
      <h2 data-i="title"></h2><p class="rd124-lead" data-i="lead"></p>
      <div class="rd124-grid">
        <div class="rd124-card">
          <div class="rd124-kicker" data-i="settings"></div>
          <label class="rd124-field"><span data-i="purchase"></span><input type="date" data-input="purchase" min="2000-01-01" max="2100-12-31" required></label>
          <label class="rd124-field"><span data-i="window"></span><select data-input="window">
            <option value="7">7</option><option value="14">14</option><option value="30" selected>30</option><option value="60">60</option><option value="90">90</option>
          </select></label>
          <label class="rd124-field"><span data-i="ahead"></span><select data-input="ahead">
            <option value="0" data-option="onday"></option><option value="1" data-option="one"></option>
            <option value="3" data-option="three"></option><option value="7" data-option="seven" selected></option>
          </select></label>
          <label class="rd124-field"><span data-i="time"></span><select data-input="time">
            <option value="09:00">09:00</option><option value="12:00">12:00</option><option value="18:00" selected>18:00</option>
          </select></label>
          <button type="button" class="rd124-reset" data-reset data-i="reset"></button>
        </div>
        <div class="rd124-card rd124-dark" aria-live="polite">
          <div class="rd124-kicker" data-i="timeline"></div>
          <div class="rd124-remaining"><span data-i="remaining"></span><strong data-out="remaining"></strong></div>
          <div class="rd124-steps">
            <div class="rd124-step"><span class="rd124-dot"></span><span data-i="purchased"></span><strong data-out="purchased"></strong></div>
            <div class="rd124-step rd124-highlight"><span class="rd124-dot"></span><span data-i="remind"></span><strong data-out="remind"></strong></div>
            <div class="rd124-step"><span class="rd124-dot"></span><span data-i="deadline"></span><strong data-out="deadline"></strong></div>
          </div>
          <p class="rd124-message" data-out="message"></p>
        </div>
      </div>
      <p class="rd124-note" data-i="note"></p>`;
    if(anchor)anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    const get=(key)=>root.querySelector(`[data-input="${key}"]`);
    const output=(key,value)=>{root.querySelector(`[data-out="${key}"]`).textContent=String(value);};
    const initialDay=today()-8;
    function reset(){get('purchase').value=ymd(today()-8);get('window').value='30';get('ahead').value='7';get('time').value='18:00';render();}
    let lastLanguage='';
    function render(){
      const lang=language(),t=TEXT[lang];root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-i]').forEach(el=>{el.textContent=t[el.dataset.i];});
      root.querySelectorAll('[data-option]').forEach(el=>{el.textContent=t[el.dataset.option];});
      root.querySelectorAll('[data-input="window"] option').forEach(opt=>{opt.textContent=opt.value+' '+t.days;});
      const purchase=parseDay(get('purchase').value);
      if(purchase===null){output('remaining','—');output('purchased','—');output('remind','—');output('deadline','—');output('message',t.invalid);lastLanguage=lang;return;}
      const deadline=purchase+Number(get('window').value);
      const remind=deadline-Number(get('ahead').value);
      const remaining=deadline-today();
      output('remaining',remaining>0?remaining+' '+t.future:remaining===0?t.today:t.expired);
      output('purchased',display(purchase,lang));
      output('remind',display(remind,lang)+' · '+get('time').value);
      output('deadline',display(deadline,lang));
      output('message',remind<today()?t.earlier:remind===today()?t.same:t.later);
      lastLanguage=lang;
    }
    root.querySelectorAll('[data-input]').forEach(el=>el.addEventListener('change',render));
    root.querySelector('[data-reset]').addEventListener('click',reset);
    document.getElementById('p199-language')?.addEventListener('change',render);
    if(typeof MutationObserver==='function')new MutationObserver(()=>{if(language()!==lastLanguage)render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    reset();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
