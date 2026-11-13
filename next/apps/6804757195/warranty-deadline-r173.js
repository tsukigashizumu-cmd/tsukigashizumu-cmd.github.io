/* R173 Warranty Deadline: website-only interactive illustration.
 * No persistent storage, analytics, network calls, reminders, or warranty eligibility verification.
 */
(() => {
  'use strict';
  const APP='6804757195', ID='tsz-warranty-r173';
  if (document.body?.dataset.p199Id!==APP || document.getElementById(ID)) return;
  const STR={
    en:{brand:'WARRANTY DEADLINE TRACKER',nav:'Try the calculator',eyebrow:'KNOW THE DATE. KEEP THE OPTION.',
      title:'Still under warranty?',em:'Check before you pay.',subtitle:'Save the purchase date. See the expected warranty end date.',
      cta:'View on the App Store',product:'Wireless headphones',bought:'Purchased',term:'Warranty',ends:'Estimated end',
      left:'DAYS LEFT',leftOne:'DAY LEFT',dueToday:'ENDS TODAY',expired:'DAYS PAST END',invalid:'CHECK THE DATES',
      start:'Purchase date',months:'Warranty period (months)',monthUnit:'months',timelineStart:'Purchased',timelineToday:'Today',timelineEnd:'Expected end',
      other:'More illustrative items',laptop:'Laptop',speaker:'Bluetooth speaker',remaining:'days left',oneRemaining:'day left',
      reset:'Reset example',note:'Dates are illustrative. Actual warranty coverage depends on the manufacturer’s or seller’s terms. This website does not save items or send reminders.',
      footer:'Track items · Check end dates · Set reminders in the app',error:'Choose a valid purchase date and a warranty period from 1 to 120 whole months.'},
    ja:{brand:'WARRANTY DEADLINE TRACKER',nav:'期限を計算する',eyebrow:'保証期限を、支払う前に確認。',
      title:'まだ保証期間内？',em:'払う前に、確認。',subtitle:'購入日と保証期間から、保証終了予定日を確認できます。',
      cta:'App Storeで見る',product:'ワイヤレスヘッドホン',bought:'購入日',term:'保証期間',ends:'終了予定日',
      left:'残り日数',leftOne:'残り1日',dueToday:'今日が終了日',expired:'終了から経過',invalid:'日付を確認',
      start:'購入日',months:'保証期間（月）',monthUnit:'か月',timelineStart:'購入日',timelineToday:'今日',timelineEnd:'終了予定日',
      other:'登録商品の例',laptop:'ノートパソコン',speaker:'Bluetoothスピーカー',remaining:'日残り',oneRemaining:'日残り',
      reset:'初期化',note:'日付はデモ用の例です。実際の保証適用はメーカー・販売者の規約によります。このWebデモは保存や通知を行いません。',
      footer:'商品を記録 · 期限を確認 · アプリで通知を設定',error:'有効な購入日と1〜120か月の整数の保証期間を入力してください。'},
    ar:{brand:'WARRANTY DEADLINE TRACKER',nav:'جرّب الحاسبة',eyebrow:'تحقق من التاريخ قبل الدفع.',
      title:'هل ما زال الضمان سارياً؟',em:'تحقق قبل أن تدفع.',subtitle:'أدخل تاريخ الشراء ومدة الضمان لمعرفة تاريخ انتهائه المتوقع.',
      cta:'عرضه على App Store',product:'سماعات لاسلكية',bought:'تاريخ الشراء',term:'مدة الضمان',ends:'الانتهاء المتوقع',
      left:'يوماً متبقياً',leftOne:'يوم واحد متبقٍ',dueToday:'ينتهي اليوم',expired:'أيام بعد الانتهاء',invalid:'تحقق من التاريخ',
      start:'تاريخ الشراء',months:'مدة الضمان (بالأشهر)',monthUnit:'شهراً',timelineStart:'الشراء',timelineToday:'اليوم',timelineEnd:'الانتهاء المتوقع',
      other:'أجهزة توضيحية',laptop:'حاسوب محمول',speaker:'مكبر صوت بلوتوث',remaining:'يوماً متبقياً',oneRemaining:'يوم واحد متبقٍ',
      reset:'إعادة المثال',note:'التواريخ للتوضيح فقط. تعتمد التغطية الفعلية على شروط الشركة المصنّعة أو البائع. هذا العرض لا يحفظ المنتجات ولا يرسل تذكيرات.',
      footer:'تتبّع المنتجات · تحقق من المواعيد · اضبط التذكيرات في التطبيق',error:'اختر تاريخ شراء صحيحاً ومدة ضمان من شهر واحد إلى 120 شهراً كاملة.'}
  };
  function currentLanguage(){
    const raw=(document.getElementById('p199-language')?.value || new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en').toLowerCase();
    return raw.startsWith('ja')?'ja':raw.startsWith('ar')?'ar':'en';
  }
  function storeRegion(){const v=(document.getElementById('p199-country')?.value||'us').toLowerCase();return /^[a-z]{2}$/.test(v)?v:'us';}
  const $=s=>root.querySelector(s);
  const z=n=>String(n).padStart(2,'0');
  function utc(y,m,d){return new Date(Date.UTC(y,m-1,d));}
  function parseISO(v){
    const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
    if(!match)return null;
    const [y,m,d]=match.slice(1).map(Number);
    if(y<1900||y>2100)return null;
    const date=utc(y,m,d);
    return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d?date:null;
  }
  function iso(d){return `${d.getUTCFullYear()}-${z(d.getUTCMonth()+1)}-${z(d.getUTCDate())}`;}
  function today(){const d=new Date();return utc(d.getFullYear(),d.getMonth()+1,d.getDate());}
  function addMonths(date,n){
    // Clamp Jan 31 + 1 month to Feb 28/29 instead of overflowing into March.
    const y=date.getUTCFullYear(),m=date.getUTCMonth(),day=date.getUTCDate();
    const first=new Date(Date.UTC(y,m+n,1));
    const last=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0)).getUTCDate();
    return new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth(),Math.min(day,last)));
  }
  const daysBetween=(a,b)=>Math.round((a.getTime()-b.getTime())/86400000);
  function dateLabel(date,l){return new Intl.DateTimeFormat(l==='ja'?'ja-JP':l==='ar'?'ar-EG':'en-US', {year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(date);}
  const root=document.createElement('section');root.id=ID;root.className='wd173';root.setAttribute('aria-labelledby','wd173-title');
  root.innerHTML=`
    <header class="wd173-header"><div class="wd173-mark" aria-hidden="true">◇</div><div class="wd173-brand" data-wd="brand"></div><a class="wd173-nav" data-wd="nav" href="#wd173-demo"></a></header>
    <div class="wd173-main">
      <div class="wd173-copy"><p class="wd173-eyebrow" data-wd="eyebrow"></p>
        <h2 id="wd173-title"><span data-wd="title"></span><em data-wd="em"></em></h2>
        <p class="wd173-subtitle" data-wd="subtitle"></p>
        <a class="wd173-store" id="wd173-store" href="https://apps.apple.com/us/app/id6804757195" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">●</span><span data-wd="cta"></span><span aria-hidden="true">↗</span></a>
      </div>
      <div class="wd173-right">
        <div class="wd173-abstract" aria-hidden="true"><div class="wd173-headband"></div><div class="wd173-ear wd173-ear-l"></div><div class="wd173-ear wd173-ear-r"></div><div class="wd173-glow"></div></div>
        <div class="wd173-card" id="wd173-demo">
          <div class="wd173-product"><span class="wd173-product-icon" aria-hidden="true">♫</span><strong data-wd="product"></strong></div>
          <div class="wd173-overview">
            <div><small data-wd="bought"></small><strong id="wd173-purchased" dir="auto"></strong></div>
            <div><small data-wd="term"></small><strong id="wd173-term" dir="auto"></strong></div>
            <div><small data-wd="ends"></small><strong id="wd173-ends" dir="auto" aria-live="polite"></strong></div>
            <div class="wd173-count" id="wd173-count-wrap"><strong id="wd173-count" dir="ltr" aria-live="polite"></strong><small id="wd173-count-label"></small></div>
          </div>
          <div class="wd173-progress" role="img" id="wd173-progress" aria-label="Warranty timeline"><span id="wd173-progress-fill"></span><i></i><i></i><i id="wd173-position"></i></div>
          <div class="wd173-times"><div><small data-wd="timelineStart"></small><strong id="wd173-t0" dir="auto"></strong></div><div><small data-wd="timelineToday"></small><strong id="wd173-t1" dir="auto"></strong></div><div><small data-wd="timelineEnd"></small><strong id="wd173-t2" dir="auto"></strong></div></div>
          <div class="wd173-form">
            <label for="wd173-date"><span data-wd="start"></span><input type="date" id="wd173-date" min="1900-01-01" max="2100-12-31" value="2026-01-20" required></label>
            <label for="wd173-months"><span data-wd="months"></span><div class="wd173-month-input"><input type="number" id="wd173-months" min="1" max="120" step="1" inputmode="numeric" value="12" required><span data-wd="monthUnit"></span></div></label>
          </div>
          <p class="wd173-error" id="wd173-error" role="status" aria-live="polite"></p>
        </div>
      </div>
    </div>
    <div class="wd173-section-label"><strong data-wd="other"></strong><button type="button" id="wd173-reset" data-wd="reset"></button></div>
    <div class="wd173-examples" id="wd173-examples"></div>
    <footer class="wd173-footer"><strong data-wd="footer"></strong><p data-wd="note"></p></footer>`;
  const anchor=document.querySelector('.p19-breadcrumb');
  if(anchor)anchor.insertAdjacentElement('afterend',root);
  else {const main=document.getElementById('p199-content')||document.querySelector('main');main?.parentNode?.insertBefore(root,main);}
  if(!root.isConnected)return;
  function examples(l,now){
    const w=STR[l],list=$('#wd173-examples');list.replaceChildren();
    const entries=[{name:w.laptop,icon:'▣',purchase:utc(2026,1,5),months:24},{name:w.speaker,icon:'◉',purchase:utc(2026,8,10),months:12}];
    for(const entry of entries){
      const end=addMonths(entry.purchase,entry.months),left=daysBetween(end,now);
      const row=document.createElement('div');row.className='wd173-example';
      const sym=document.createElement('span');sym.className='wd173-example-icon';sym.setAttribute('aria-hidden','true');sym.textContent=entry.icon;
      const name=document.createElement('strong');name.textContent=entry.name;
      const term=document.createElement('span');term.className='wd173-example-term';term.textContent=`${entry.months} ${w.monthUnit}`;
      const date=document.createElement('span');date.className='wd173-example-date';date.textContent=dateLabel(end,l);date.dir='auto';
      const badge=document.createElement('span');badge.className='wd173-example-badge';
      badge.classList.toggle('wd173-example-expired',left<0);
      badge.textContent=left<0?`${Math.abs(left)} ${w.expired}`:left===0?w.dueToday:left===1?w.oneRemaining:`${left} ${w.remaining}`;
      row.append(sym,name,term,date,badge);list.append(row);
    }
  }
  function update(){
    const l=currentLanguage(),w=STR[l],start=parseISO($('#wd173-date').value);
    const raw=$('#wd173-months').value.trim(),months=raw===''?NaN:Number(raw);
    const ok=!!start&&Number.isInteger(months)&&months>=1&&months<=120;
    const end=ok?addMonths(start,months):null,now=today(),left=end?daysBetween(end,now):null;
    $('#wd173-date').setAttribute('aria-invalid',String(!start));
    $('#wd173-months').setAttribute('aria-invalid',String(!Number.isInteger(months)||months<1||months>120));
    $('#wd173-error').textContent=ok?'':w.error;
    $('#wd173-purchased').textContent=start?dateLabel(start,l):'—';
    $('#wd173-term').textContent=ok?`${months} ${w.monthUnit}`:'—';
    $('#wd173-ends').textContent=end?dateLabel(end,l):'—';
    $('#wd173-count').textContent=end?String(Math.abs(left)):'—';
    $('#wd173-count-label').textContent=!end?w.invalid:left<0?w.expired:left===0?w.dueToday:left===1?w.leftOne:w.left;
    $('#wd173-count-wrap').classList.toggle('wd173-expired',ok&&left<0);
    $('#wd173-count-wrap').classList.toggle('wd173-due-today',ok&&left===0);
    const pct=ok?Math.max(0,Math.min(100,daysBetween(now,start)/Math.max(1,daysBetween(end,start))*100)):0;
    $('#wd173-progress-fill').style.width=pct+'%';$('#wd173-position').style.left=(l==='ar'?100-pct:pct)+'%';
    $('#wd173-t0').textContent=start?dateLabel(start,l):'—';
    $('#wd173-t1').textContent=dateLabel(now,l);$('#wd173-t2').textContent=end?dateLabel(end,l):'—';
    $('#wd173-progress').setAttribute('aria-label',`${w.timelineStart}: ${start?dateLabel(start,l):'—'}; ${w.timelineToday}: ${dateLabel(now,l)}; ${w.timelineEnd}: ${end?dateLabel(end,l):'—'}`);
    examples(l,now);
  }
  function translate(){
    const l=currentLanguage(),w=STR[l];root.lang=l;root.dir=l==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-wd]').forEach(el=>{el.textContent=w[el.dataset.wd]||'';});
    $('#wd173-store').href=`https://apps.apple.com/${storeRegion()}/app/id${APP}`;
    $('#wd173-date').setAttribute('aria-label',w.start);
    $('#wd173-months').setAttribute('aria-label',w.months);
    update();
  }
  $('#wd173-date').addEventListener('input',update);
  $('#wd173-months').addEventListener('input',update);
  $('#wd173-reset').addEventListener('click',()=>{$('#wd173-date').value='2026-01-20';$('#wd173-months').value='12';update();});
  document.getElementById('p199-language')?.addEventListener('change',translate);
  document.getElementById('p199-country')?.addEventListener('change',translate);
  translate();
})();
