/* TSZ LP R326 · Return Deadline Tracker. Interactive illustration only.
   This script does not use storage, external requests or actual notifications. */
(function(){
  'use strict';
  const ID='tsz-rd326';
  const MS=86400000;
  const words={
    en:{eyebrow:'RETURN DEADLINE · INTERACTIVE EXAMPLE',title:'Still wearing the tags—just in case you return it?',lead:'A decision feels harder when the last possible return day is uncertain. Enter the store’s policy and see the date before the window disappears.',scenarios:'Start with an example',jacket:'Jacket · getting close',gift:'Gift · room to decide',headphones:'Headphones · too late',purchase:'Purchase date',reference:'Date to check',period:'Return window (days)',quick:'Quick return windows',policy:'You supply the rule',policyBody:'Return periods and start dates vary by store, item and region. The example treats the purchase day as day 0; confirm your actual policy before relying on any date.',deadline:'Last return date',daysLeft:'Days left',daysPast:'Days past',lastDay:'Last day',safe:'Time left to decide',soon:'Deadline is close',today:'Final day under this example',expired:'This example window has passed',bad:'Enter valid dates and a period of 1–365 days.',remind:'Example advance reminder',remindCopy:'A date illustration only. This LP does not schedule a notification.',notify:'Remind me',ahead:'days before',note:'Illustrative countdown only. Enter the policy the retailer actually gave you. No guarantee of eligibility, refunds or notification delivery. Nothing is stored or transmitted.',pastNotice:'The illustrated reminder date is already past.',unused:'No scheduled reminders on this page.',count:'of the example window elapsed',day:'day',days:'days',invalid:'Please check both dates and the return period.',statusGood:'IN WINDOW',statusSoon:'SOON',statusToday:'TODAY',statusLate:'EXPIRED',check:'Set reference date to today',none:'—'},
    ja:{eyebrow:'返品期限 · 操作できる例',title:'返品するかもしれないから、タグを外せない。',lead:'迷っている間にも、返品できる日数は減っていきます。購入日とお店の返品条件を入力して、最後の日を確認できます。',scenarios:'場面を選ぶ',jacket:'服 · 期限が近い',gift:'贈り物 · まだ余裕',headphones:'ヘッドホン · 期限超過',purchase:'購入日',reference:'確認する日',period:'返品可能日数',quick:'日数を選ぶ',policy:'お店の条件を入力',policyBody:'返品開始日・対象商品・日数の数え方は店舗や地域により異なります。この例では購入日を0日目として計算します。必ず実際の返品規約を確認してください。',deadline:'返品できる最終日',daysLeft:'残り日数',daysPast:'超過日数',lastDay:'最終日',safe:'まだ判断できる時間',soon:'期限が近づいています',today:'この例では今日が最終日',expired:'この例では期限切れ',bad:'日付と1〜365日の日数を確認してください。',remind:'通知日の参考例',remindCopy:'日付の表示だけです。このLPでは通知は設定されません。',notify:'期限の',ahead:'日前',note:'入力した条件だけで計算する説明用デモです。返品可能・返金・通知を保証しません。データ保存や外部送信も行いません。',pastNotice:'例示した通知日はすでに過ぎています。',unused:'このページでは通知を登録しません。',count:'例の日数が経過',day:'日',days:'日',invalid:'日付と返品可能日数を確認してください。',statusGood:'期限内',statusSoon:'期限間近',statusToday:'最終日',statusLate:'期限超過',check:'確認日を今日にする',none:'—'},
    ar:{eyebrow:'مهلة الإرجاع · مثال تفاعلي',title:'أتبقي البطاقة على القطعة لأنك قد تعيدها؟',lead:'قد ينتهي وقت الإرجاع وأنت ما زلت مترددًا. أدخل تاريخ الشراء والمهلة التي أعطاك إياها المتجر لتعرف آخر يوم في هذا المثال.',scenarios:'اختر مثالاً',jacket:'سترة · الموعد قريب',gift:'هدية · ما زال الوقت متاحًا',headphones:'سماعات · انتهت المهلة',purchase:'تاريخ الشراء',reference:'تاريخ التحقق',period:'مهلة الإرجاع بالأيام',quick:'مهل سريعة',policy:'أدخل قاعدة المتجر بنفسك',policyBody:'تختلف بداية المهلة وطريقة العد والاستثناءات حسب المتجر والبلد. يحتسب هذا المثال يوم الشراء كيوم صفر. تحقق من سياسة المتجر الفعلية.',deadline:'آخر يوم للإرجاع',daysLeft:'الأيام المتبقية',daysPast:'أيام بعد الموعد',lastDay:'اليوم الأخير',safe:'ما زال لديك وقت',soon:'اقترب الموعد النهائي',today:'اليوم هو الأخير في هذا المثال',expired:'انتهت المهلة في هذا المثال',bad:'أدخل تاريخين صحيحين وفترة بين 1 و365 يومًا.',remind:'مثال لتاريخ التنبيه المبكر',remindCopy:'هذا عرض لتاريخ فقط ولا يُنشئ إشعارًا.',notify:'التنبيه قبل',ahead:'أيام',note:'مثال توضيحي يحسب المدة التي تدخلها فقط. لا يضمن حق الإرجاع أو استرداد المبلغ أو وصول تنبيه. لا تُحفظ البيانات ولا تُرسل.',pastNotice:'مر تاريخ التنبيه المعروض.',unused:'لا يتم جدولة إشعارات هنا.',count:'من المهلة التوضيحية مضى',day:'يوم',days:'أيام',invalid:'تحقق من التواريخ والمدة المدخلة.',statusGood:'ضمن المهلة',statusSoon:'اقترب الموعد',statusToday:'اليوم الأخير',statusLate:'انتهت المهلة',check:'استخدم تاريخ اليوم',none:'—'}
  };
  const isoToday=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
  function serial(iso){
    if(typeof iso!=='string'||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(iso))return NaN;
    const x=new Date(iso+'T00:00:00.000Z');
    if(!Number.isFinite(x.getTime())||x.toISOString().slice(0,10)!==iso)return NaN;
    return Math.floor(x.getTime()/MS);
  }
  function fromSerial(n){return new Date(n*MS).toISOString().slice(0,10)}
  function offset(iso,days){return fromSerial(serial(iso)+days)}
  const presets={
    jacket:{daysBack:12,window:14,remind:3},
    gift:{daysBack:9,window:30,remind:7},
    headphones:{daysBack:35,window:30,remind:1}
  };
  function mount(){
    let host=document.getElementById(ID);
    if(!host){host=document.createElement('section');host.id=ID;
      const anchor=document.querySelector('#related');
      if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(host,anchor);
      else (document.querySelector('main')||document.body).appendChild(host);
    }
    if(host.dataset.ready==='yes')return;
    host.dataset.ready='yes';
    const today=isoToday();
    const state={lang:'en',preset:'jacket',purchase:offset(today,-12),reference:today,window:14,remind:3};
    const L=()=>words[state.lang];
    host.innerHTML=`<div class="rd-shell"><header class="rd-hero"><p class="rd-eyebrow" data-t="eyebrow"></p><h2 data-t="title"></h2><p class="rd-lead" data-t="lead"></p><div class="rd-langs" role="group" aria-label="Language"><button type="button" class="rd-lang" data-lang="en">English</button><button type="button" class="rd-lang" data-lang="ja">日本語</button><button type="button" class="rd-lang" data-lang="ar">العربية</button></div></header>
      <div class="rd-grid"><div class="rd-controls"><h3 data-t="scenarios"></h3><div class="rd-presets" role="group" aria-label="Scenario"><button type="button" class="rd-preset" data-preset="jacket"></button><button type="button" class="rd-preset" data-preset="gift"></button><button type="button" class="rd-preset" data-preset="headphones"></button></div>
      <div class="rd-field-grid"><div class="rd-field"><label class="rd-label" data-t="purchase" for="rd326-purchase"></label><input class="rd-input" id="rd326-purchase" type="date" required></div><div class="rd-field"><label class="rd-label" data-t="reference" for="rd326-reference"></label><input class="rd-input" id="rd326-reference" type="date" required></div></div>
      <label class="rd-label" data-t="period" for="rd326-window"></label><div class="rd-field" style="margin-bottom:12px"><input class="rd-input" id="rd326-window" type="number" inputmode="numeric" min="1" max="365" step="1" value="14"></div>
      <div class="rd-windows" role="group" aria-label="Return window"><button type="button" class="rd-window" data-window="14">14</button><button type="button" class="rd-window" data-window="30">30</button><button type="button" class="rd-window" data-window="60">60</button></div>
      <button type="button" class="rd-window" data-now="true" data-t="check"></button>
      <p class="rd-subnote" data-t="remindCopy"></p><div class="rd-note-card"><strong data-t="policy"></strong><p data-t="policyBody"></p></div>
      </div><div class="rd-result" aria-live="polite"><p class="rd-result-label" data-t="deadline"></p><p class="rd-date" data-out="deadline"></p><div class="rd-metric"><div class="rd-ring" data-ring="true"><div class="rd-ring-inner"><strong data-out="number"></strong><small data-out="unit"></small></div></div><div class="rd-metric-copy"><div class="rd-state" data-out="status"></div><strong data-out="message"></strong><p data-out="percent"></p></div></div>
      <div class="rd-reminder"><p class="rd-reminder-label" data-t="remind"></p><p class="rd-reminder-date" data-out="reminder"></p><p class="rd-reminder-copy" data-out="reminderCopy"></p><div class="rd-windows" style="margin-top:10px"><button type="button" class="rd-window" data-remind="1">1</button><button type="button" class="rd-window" data-remind="3">3</button><button type="button" class="rd-window" data-remind="7">7</button></div></div><p class="rd-mini" data-t="unused"></p></div></div>
      <footer class="rd-footer"><span class="rd-footer-mark" aria-hidden="true">ⓘ</span><span data-t="note"></span></footer></div>`;
    const q=s=>host.querySelector(s),qa=s=>host.querySelectorAll(s);
    const put=(key,value)=>{q(`[data-out="${key}"]`).textContent=String(value)};
    const fields={purchase:q('#rd326-purchase'),reference:q('#rd326-reference'),window:q('#rd326-window')};
    function dateText(iso){
      const d=new Date(iso+'T00:00:00Z');
      return new Intl.DateTimeFormat(state.lang==='ja'?'ja-JP':state.lang==='ar'?'ar-EG':'en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(d);
    }
    function translate(){
      host.lang=state.lang;host.dir=state.lang==='ar'?'rtl':'ltr';
      qa('[data-t]').forEach(node=>node.textContent=L()[node.dataset.t]);
      qa('[data-lang]').forEach(node=>node.setAttribute('aria-pressed',String(node.dataset.lang===state.lang)));
      qa('[data-preset]').forEach(node=>{node.textContent=L()[node.dataset.preset];node.setAttribute('aria-pressed',String(node.dataset.preset===state.preset))});
      render();
    }
    function render(){
      const purchased=serial(state.purchase),checked=serial(state.reference),period=Number(state.window);
      qa('[data-window]').forEach(node=>node.setAttribute('aria-pressed',String(Number(node.dataset.window)===period)));
      qa('[data-remind]').forEach(node=>{node.textContent=(state.lang==='ja'?`${node.dataset.remind}日前`:state.lang==='ar'?`${node.dataset.remind} ${L().ahead}`:`${node.dataset.remind} days`);node.setAttribute('aria-pressed',String(Number(node.dataset.remind)===state.remind))});
      if(!Number.isInteger(purchased)||!Number.isInteger(checked)||!Number.isInteger(period)||period<1||period>365){
        host.dataset.state='invalid';['deadline','number','unit','percent','reminder','reminderCopy'].forEach(k=>put(k,L().none));put('message',L().invalid);put('status','');return;
      }
      const last=purchased+period,remaining=last-checked,reminder=last-state.remind;
      const elapsed=checked-purchased;
      const percent=Math.round(Math.max(0,Math.min(1,elapsed/period))*100);
      q('[data-ring]').style.setProperty('--progress',percent+'%');
      host.dataset.state=remaining<0?'late':remaining<=3?'urgent':'normal';
      put('deadline',dateText(fromSerial(last)));
      put('number',Math.abs(remaining));
      put('unit',remaining<0?L().daysPast:remaining===0?L().lastDay:L().daysLeft);
      put('message',remaining<0?L().expired:remaining===0?L().today:remaining<=3?L().soon:L().safe);
      put('status',remaining<0?L().statusLate:remaining===0?L().statusToday:remaining<=3?L().statusSoon:L().statusGood);
      put('percent',`${percent}% ${L().count}`);
      put('reminder',dateText(fromSerial(reminder)));
      put('reminderCopy',`${L().notify} ${state.remind} ${L().ahead}. ${reminder<checked?L().pastNotice:L().remindCopy}`);
    }
    function refreshFields(){fields.purchase.value=state.purchase;fields.reference.value=state.reference;fields.window.value=String(state.window)}
    function applyPreset(id){const p=presets[id];if(!p)return;state.preset=id;state.reference=isoToday();state.purchase=offset(state.reference,-p.daysBack);state.window=p.window;state.remind=p.remind;refreshFields();translate()}
    qa('[data-lang]').forEach(node=>node.addEventListener('click',()=>{state.lang=node.dataset.lang;translate()}));
    qa('[data-preset]').forEach(node=>node.addEventListener('click',()=>applyPreset(node.dataset.preset)));
    qa('[data-window]').forEach(node=>node.addEventListener('click',()=>{state.window=Number(node.dataset.window);state.preset='custom';fields.window.value=String(state.window);translate()}));
    qa('[data-remind]').forEach(node=>node.addEventListener('click',()=>{state.remind=Number(node.dataset.remind);render()}));
    qa('[data-now]').forEach(node=>node.addEventListener('click',()=>{state.reference=isoToday();fields.reference.value=state.reference;state.preset='custom';translate()}));
    for(const key of ['purchase','reference','window'])fields[key].addEventListener('input',()=>{state[key]=key==='window'?(fields.window.value===''?NaN:Number(fields.window.value)):fields[key].value;state.preset='custom';translate()});
    refreshFields();translate();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
