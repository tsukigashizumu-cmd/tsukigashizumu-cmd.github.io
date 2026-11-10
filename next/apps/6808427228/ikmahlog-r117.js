/* TSZ LP R117 / IkmahLog: educational example, not the native UI, no storage or requests. */
(() => {
  'use strict';
  const APP='6808427228', ID='tsz-ikmahlog-r117', DAY=86400000;
  const MESSAGES={
    en:{tag:'INTERACTIVE EXAMPLE · DATE + DISTANCE',headline:'A service reminder has two clocks.',lead:'A planned service can be due by calendar date, odometer reading, or both. Edit the numbers to see which threshold is reached. No predictions about how far you will drive.',form:'Try your own scenario',now:'Date to check',odometer:'Current odometer · km',next:'Next service thresholds',dueDate:'Due date',dueKm:'Due at · km',apply:'Check thresholds',reset:'Reset example',result:'What this means',clear:'Neither threshold reached yet',reachDate:'Date threshold reached',reachKm:'Distance threshold reached',reachBoth:'Both thresholds reached',subtitle:'Check each threshold independently. You choose the service schedule.',days:'Calendar',miles:'Odometer',daysLeft:'days remaining',daysLate:'days past due',kmLeft:'km remaining',kmLate:'km past threshold',onDate:'due today',onKm:'threshold reached',invalid:'Enter valid dates (2000–2100) and whole kilometers from 0 to 3,000,000.',updated:'Example updated.',note:'Landing-page illustration only. Not an actual IkmahLog screen, maintenance diagnosis, forecast, saved reminder, or notification. No information is stored or sent; reload clears this example. Follow your vehicle maker’s service guidance.'},
    ja:{tag:'操作できる説明用サンプル · 日付 × 距離',headline:'次の整備は、日付と距離の二つで考える。',lead:'整備の目安は「何月何日」だけでも「何km」だけでもありません。数値を変えると、どちらの条件に達したか確認できます。走行ペースの予測はしません。',form:'条件を変更して試す',now:'確認する日付',odometer:'現在の走行距離・km',next:'次回整備の目安',dueDate:'整備予定日',dueKm:'整備予定距離・km',apply:'目安を確認する',reset:'初期サンプルに戻す',result:'判定結果',clear:'どちらの目安にも未到達',reachDate:'日付の目安に到達',reachKm:'距離の目安に到達',reachBoth:'日付・距離の両方に到達',subtitle:'日付と距離をそれぞれ判定。整備間隔を決めるのは利用者です。',days:'日付の目安',miles:'走行距離の目安',daysLeft:'日後が予定日',daysLate:'日超過',kmLeft:'km残り',kmLate:'km超過',onDate:'本日が予定日',onKm:'目安に到達',invalid:'2000〜2100年の日付、0〜3,000,000kmの整数を入力してください。',updated:'サンプルを更新しました。',note:'これはLP上の説明用シミュレーションで、IkmahLogの実画面・整備診断・走行予測・保存済み通知ではありません。入力は送信・保存されず、再読み込みで消えます。整備時期は車両メーカーの推奨を確認してください。'},
    ar:{tag:'مثال تفاعلي · التاريخ والمسافة',headline:'موعد الصيانة له معياران.',lead:'قد يحين موعد الصيانة بالتاريخ أو بعداد المسافة أو بكليهما. غيّر القيم لترى أي شرط تحقق. لا يتنبأ المثال بمسافة قيادتك.',form:'جرّب مثالاً',now:'تاريخ الفحص',odometer:'قراءة العداد الحالية · كم',next:'حدود الصيانة التالية',dueDate:'تاريخ الاستحقاق',dueKm:'عند مسافة · كم',apply:'فحص الحدود',reset:'إعادة المثال',result:'ماذا تعني النتيجة',clear:'لم يتحقق أي حد بعد',reachDate:'حان موعد التاريخ',reachKm:'وصل حد المسافة',reachBoth:'تحقق الحدّان معاً',subtitle:'يُفحص التاريخ والمسافة بشكل مستقل. أنت تحدد جدول الصيانة.',days:'التاريخ',miles:'المسافة',daysLeft:'يوم متبقٍ',daysLate:'يوم بعد الموعد',kmLeft:'كم متبقية',kmLate:'كم بعد الحد',onDate:'الموعد اليوم',onKm:'تم الوصول إلى الحد',invalid:'أدخل تاريخاً صحيحاً بين 2000 و2100 ومسافة صحيحة من 0 إلى 3000000 كم.',updated:'تم تحديث المثال.',note:'مثال توضيحي لصفحة التعريف فقط، وليس شاشة فعلية من IkmahLog أو تشخيصاً للصيانة أو تنبؤاً بالقيادة أو تنبيهاً محفوظاً. لا تُحفظ البيانات ولا تُرسل. اتبع إرشادات صيانة الشركة المصنّعة.'}
  };
  const byDate=(iso)=>{
    if(!/^\d{4}-\d{2}-\d{2}$/.test(iso))return NaN;
    const x=Date.parse(iso+'T00:00:00Z');
    return Number.isFinite(x)&&new Date(x).toISOString().slice(0,10)===iso&&iso>='2000-01-01'&&iso<='2100-12-31'?x:NaN;
  };
  const iso=(d)=>d.toISOString().slice(0,10);
  const addDays=(s,n)=>iso(new Date(byDate(s)+n*DAY));
  const language=()=>{
    const m=document.getElementById('p199-language');
    const v=String(m?.value||document.documentElement.lang||'en').toLowerCase().split(/[-_]/)[0];
    return Object.hasOwn(MESSAGES,v)?v:'en';
  };
  const fmt=(value,lang)=>new Intl.NumberFormat(lang==='ja'?'ja-JP':lang==='ar'?'ar-EG':'en-US',{maximumFractionDigits:0}).format(value);
  const validKm=(s)=>/^\d{1,7}$/.test(s)&&Number(s)<=3000000;
  const markup=`
    <span class="ik117-tag" data-copy="tag"></span>
    <h2 data-copy="headline"></h2><p class="ik117-lead" data-copy="lead"></p>
    <div class="ik117-columns"><div class="ik117-card">
      <h3 data-copy="form"></h3><form class="ik117-form" novalidate>
      <div class="ik117-fields"><label><span data-copy="now"></span><input type="date" data-field="date" min="2000-01-01" max="2100-12-31" required></label>
      <label><span data-copy="odometer"></span><input type="number" inputmode="numeric" step="1" min="0" max="3000000" data-field="km" required></label></div>
      <div class="ik117-section-divider"></div><h3 data-copy="next"></h3>
      <div class="ik117-fields"><label><span data-copy="dueDate"></span><input type="date" data-field="dueDate" min="2000-01-01" max="2100-12-31" required></label>
      <label><span data-copy="dueKm"></span><input type="number" inputmode="numeric" step="1" min="0" max="3000000" data-field="dueKm" required></label></div>
      <div class="ik117-actions"><button class="ik117-apply" data-copy="apply" type="submit"></button><button class="ik117-reset" data-copy="reset" type="button" data-action="reset"></button></div>
      <p class="ik117-message" role="status" aria-live="polite" data-message></p></form></div>
      <div class="ik117-card"><h3 data-copy="result"></h3>
      <div class="ik117-result-status" data-status-box><strong data-status></strong><small data-copy="subtitle"></small></div>
      <div class="ik117-metrics"><div class="ik117-metric"><span class="ik117-metric-label" data-copy="days"></span><strong class="ik117-big" data-out="days"></strong><small class="ik117-small" data-out="daysUnit"></small></div>
      <div class="ik117-metric"><span class="ik117-metric-label" data-copy="miles"></span><strong class="ik117-big" data-out="km"></strong><small class="ik117-small" data-out="kmUnit"></small></div></div></div></div>
      <p class="ik117-note" data-copy="note"></p>`;
  const todayLocal=()=>{
    const d=new Date(); const pad=x=>String(x).padStart(2,'0');
    return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
  };
  function mount(){
    const body=document.body;
    if(!body||(body.dataset.p199Id!==APP&&body.dataset.p19AppId!==APP))return;
    const anchor=document.getElementById('overview');
    if(!anchor||document.getElementById(ID))return;
    const root=document.createElement('section');root.id=ID;root.dataset.illustration='not-native-app-ui';root.innerHTML=markup;
    anchor.insertAdjacentElement('afterend',root);
    const el=(s)=>root.querySelector(s);const input=(k)=>el(`[data-field="${k}"]`);
    const original=()=>{const d=todayLocal();return {date:d,dueDate:addDays(d,20),km:'45600',dueKm:'47000'};};
    let state=null, notice='';
    function fill(data){for(const [k,v] of Object.entries(data))input(k).value=v;}
    function render(){
      const lang=language(),t=MESSAGES[lang];root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-copy]').forEach(e=>{if(Object.hasOwn(t,e.dataset.copy))e.textContent=t[e.dataset.copy];});
      if(!state)return;
      const d=Math.round((byDate(state.dueDate)-byDate(state.date))/DAY), km=state.dueKm-state.km;
      const dueDay=d<=0,dueKm=km<=0;
      el('[data-status]').textContent=t[dueDay&&dueKm?'reachBoth':dueDay?'reachDate':dueKm?'reachKm':'clear'];
      el('[data-status-box]').dataset.due=String(dueDay||dueKm);
      el('[data-out="days"]').textContent=fmt(Math.abs(d),lang);
      el('[data-out="km"]').textContent=fmt(Math.abs(km),lang);
      el('[data-out="days"]').dataset.due=String(dueDay);
      el('[data-out="km"]').dataset.due=String(dueKm);
      el('[data-out="daysUnit"]').textContent=d===0?t.onDate:(d<0?t.daysLate:t.daysLeft);
      el('[data-out="kmUnit"]').textContent=km===0?t.onKm:(km<0?t.kmLate:t.kmLeft);
      el('[data-message]').textContent=notice?t[notice]:'';
      el('[data-message]').dataset.error=String(notice==='invalid');
    }
    el('form').addEventListener('submit',event=>{
      event.preventDefault();const date=input('date').value,dueDate=input('dueDate').value,km=input('km').value.trim(),dueKm=input('dueKm').value.trim();
      if(!Number.isFinite(byDate(date))||!Number.isFinite(byDate(dueDate))||!validKm(km)||!validKm(dueKm)){
        notice='invalid';render();return;
      }
      state={date,dueDate,km:Number(km),dueKm:Number(dueKm)};notice='updated';render();
    });
    el('[data-action="reset"]').addEventListener('click',()=>{fill(original());state={date:input('date').value,dueDate:input('dueDate').value,km:45600,dueKm:47000};notice='';render();});
    document.getElementById('p199-language')?.addEventListener('change',render);
    let prev=language();new MutationObserver(()=>{const next=language();if(prev!==next){prev=next;render();}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    fill(original());state={date:input('date').value,dueDate:input('dueDate').value,km:45600,dueKm:47000};render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
