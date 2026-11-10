/* TSZ R88 warranty reminder date preview: illustration only; no notification scheduling. */
(() => {
  'use strict';
  const ID='tsz-warranty-r88';
  const COPY={
    en:{eyebrow:'WARRANTY REMINDER · INTERACTIVE EXAMPLE',headline:'Know when to check—before the warranty ends.',subtitle:'Try a purchase date, a warranty length, and a reminder lead time. The preview shows the estimated date to revisit your warranty.',product:'Example product',purchase:'Purchase date',months:'Warranty length (months)',lead:'Remind me before (days)',asOf:'Reference date',preview:'Your warranty plan',expiry:'Estimated expiry',reminder:'Example reminder date',remaining:'Time until expiry',days:'days',elapsed:'Expired',today:'Today',later:'Reminder is still ahead',due:'Reminder date has arrived',expiredReminder:'Expiry date has passed',reset:'Reset example',soon:'Try close to expiry',bad:'Use valid dates and a warranty length from 1 to 120 months.',foot:'Illustration only—not the real app screen or a scheduled notification. No reminders are sent, and no data is saved or transmitted. Actual warranty coverage and start/end dates depend on seller or manufacturer terms.',item:'Wireless headphones'},
    ja:{eyebrow:'保証期限の通知 · 体験サンプル',headline:'保証が切れる前に、確認する日を決めておく。',subtitle:'購入日・保証月数・何日前に知らせるかを変えて、確認予定日を試せます。',product:'品目例',purchase:'購入日',months:'保証期間（月）',lead:'何日前に確認する？',asOf:'基準日',preview:'保証の確認予定',expiry:'仮の保証終了日',reminder:'仮の確認予定日',remaining:'保証終了まで',days:'日',elapsed:'期限超過',today:'当日',later:'確認予定日はこれから',due:'確認予定日を迎えています',expiredReminder:'仮の保証期限を過ぎました',reset:'初期値に戻す',soon:'期限が近い例',bad:'有効な日付と1〜120か月の保証期間を入力してください。',foot:'説明用の試算です。実際のアプリ画面や通知設定ではありません。通知は送信されず、入力は保存・送信されません。保証の適用条件や起算日は販売店・メーカーの規約でご確認ください。',item:'ワイヤレスイヤホン'},
    ar:{eyebrow:'تذكير الضمان · مثال تفاعلي',headline:'اعرف موعد المراجعة قبل انتهاء الضمان.',subtitle:'غيّر تاريخ الشراء ومدة الضمان وعدد الأيام السابقة للتذكير لترى موعد مراجعة الضمان التقريبي.',product:'منتج تجريبي',purchase:'تاريخ الشراء',months:'مدة الضمان (بالأشهر)',lead:'التذكير قبل (أيام)',asOf:'التاريخ المرجعي',preview:'خطة مراجعة الضمان',expiry:'تاريخ انتهاء تقديري',reminder:'موعد التذكير التجريبي',remaining:'الوقت المتبقي',days:'يوم',elapsed:'انتهت المدة',today:'اليوم',later:'موعد التذكير لم يأت بعد',due:'حان موعد المراجعة',expiredReminder:'انتهى تاريخ الضمان التقديري',reset:'إعادة التعيين',soon:'جرّب انتهاء قريباً',bad:'أدخل تاريخاً صحيحاً ومدة ضمان بين شهر و١٢٠ شهراً.',foot:'مثال توضيحي فقط؛ ليس شاشة التطبيق أو تذكيراً مجدولاً. لن تُرسل إشعارات ولن تُحفظ البيانات أو تُنقل. تختلف التغطية الحقيقية بحسب شروط البائع أو الشركة المصنعة.',item:'سماعات لاسلكية'}
  };
  const currentLang=()=>{const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en';};
  const pad=n=>String(n).padStart(2,'0');
  const iso=d=>`${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())}`;
  const parseDate=s=>{
    if(!/^\d{4}-\d{2}-\d{2}$/.test(s||''))return null;
    const [y,m,d]=s.split('-').map(Number);
    if(y<1900||y>2100)return null;
    const x=new Date(Date.UTC(y,m-1,d));
    if(x.getUTCFullYear()!==y||x.getUTCMonth()!==m-1||x.getUTCDate()!==d)return null;
    return x;
  };
  const addDays=(date,days)=>new Date(date.getTime()+days*86400000);
  const addMonths=(date,months)=>{
    const y=date.getUTCFullYear(),m=date.getUTCMonth(),d=date.getUTCDate();
    const start=new Date(Date.UTC(y,m+months,1));
    const last=new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth()+1,0)).getUTCDate();
    return new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth(),Math.min(d,last)));
  };
  const midnight=()=>{const d=new Date();return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;};
  const init=()=>{
    if(document.getElementById(ID))return;
    const host=document.querySelector('main')||document.body;if(!host)return;
    const sec=document.createElement('section');sec.id=ID;
    sec.innerHTML=`<div class="r88-shell"><div class="r88-top"><span class="r88-eyebrow" data-r88="eyebrow"></span><h2 data-r88="headline"></h2><p data-r88="subtitle"></p></div><div class="r88-grid"><div class="r88-controls">
      <label><span data-r88="product"></span><input id="r88-product" type="text" maxlength="36" autocomplete="off"></label>
      <label><span data-r88="purchase"></span><input id="r88-purchase" type="date" value="2025-11-28"></label>
      <label><span data-r88="months"></span><input id="r88-months" type="number" min="1" max="120" step="1" value="12"></label>
      <label><span data-r88="lead"></span><select id="r88-lead"><option value="1">1</option><option value="7" selected>7</option><option value="14">14</option><option value="30">30</option></select></label>
      <label><span data-r88="asOf"></span><input id="r88-asof" type="date"></label>
      <div class="r88-buttons"><button id="r88-soon" type="button" data-r88="soon"></button><button id="r88-reset" class="r88-secondary" type="button" data-r88="reset"></button></div>
    </div><div class="r88-preview"><h3 data-r88="preview"></h3><p id="r88-product-name" class="r88-product-name"></p><div class="r88-timeline"><div class="r88-datebox"><span data-r88="reminder"></span><strong id="r88-remind-date"></strong></div><div class="r88-line" aria-hidden="true"><i></i><i></i></div><div class="r88-datebox r88-expiry"><span data-r88="expiry"></span><strong id="r88-expire-date"></strong></div></div><div class="r88-count" aria-live="polite"><small data-r88="remaining"></small><div><strong id="r88-days"></strong><span id="r88-unit"></span></div><p id="r88-status"></p></div><p id="r88-error" role="status" hidden></p></div></div><p class="r88-foot" data-r88="foot"></p></div>`;
    host.appendChild(sec);
    const el=id=>sec.querySelector('#r88-'+id);
    const inputs=['product','purchase','months','lead','asof'].map(el);
    el('asof').value=midnight();
    const format=(date,l)=>new Intl.DateTimeFormat(l==='ja'?'ja-JP':l==='ar'?'ar': 'en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(date);
    const render=()=>{
      const l=currentLang(),t=COPY[l];sec.lang=l;sec.dir=l==='ar'?'rtl':'ltr';
      sec.querySelectorAll('[data-r88]').forEach(n=>{const k=n.dataset.r88;if(t[k])n.textContent=t[k];});
      if(el('product').dataset.auto==='yes')el('product').value=t.item;
      el('product-name').textContent=el('product').value.trim()||'—';
      const purchase=parseDate(el('purchase').value),asof=parseDate(el('asof').value);
      const mm=Number(el('months').value),lead=Number(el('lead').value);
      const valid=purchase&&asof&&/^\d+$/.test(el('months').value)&&Number.isInteger(mm)&&mm>=1&&mm<=120&&[1,7,14,30].includes(lead);
      el('error').hidden=!!valid;el('error').textContent=valid?'':t.bad;
      if(!valid){for(const key of ['remind-date','expire-date','days','unit','status'])el(key).textContent='—';return;}
      const expiry=addMonths(purchase,mm),remind=addDays(expiry,-lead);
      const days=Math.round((expiry.getTime()-asof.getTime())/86400000);
      el('remind-date').textContent=format(remind,l);el('expire-date').textContent=format(expiry,l);
      el('days').textContent=new Intl.NumberFormat(l==='ja'?'ja-JP':l==='ar'?'ar':'en-US').format(Math.abs(days));
      el('unit').textContent=days===0?t.today:(days<0?t.elapsed:t.days);
      el('status').textContent=days<0?t.expiredReminder:(asof.getTime()>=remind.getTime()?t.due:t.later);
      sec.classList.toggle('r88-overdue',days<0);
    };
    el('product').value=COPY[currentLang()].item;el('product').dataset.auto='yes';
    el('product').addEventListener('input',()=>{el('product').dataset.auto='no';});
    inputs.forEach(input=>input.addEventListener('input',render));
    el('reset').addEventListener('click',()=>{el('product').dataset.auto='yes';el('purchase').value='2025-11-28';el('months').value='12';el('lead').value='7';el('asof').value=midnight();render();});
    el('soon').addEventListener('click',()=>{const ref=parseDate(el('asof').value)||parseDate(midnight());const target=addDays(ref,-354);el('purchase').value=iso(target);el('months').value='12';el('lead').value='14';render();});
    new MutationObserver(changes=>{if(changes.some(x=>x.attributeName==='lang'))render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
