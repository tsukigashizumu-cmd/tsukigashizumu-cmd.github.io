/* IkmahLog R184 — isolated vehicle-service mileage illustration; no tracking/storage/network. */
(() => {
  'use strict';
  const APP_ID = '6808427228';
  const ROOT_ID = 'tsz-ikmahlog-r184';
  if (!document.body || document.body.dataset.p199Id !== APP_ID || document.getElementById(ROOT_ID)) return;
  const i18n = {
    en: {
      brand:'IkmahLog', subbrand:'VEHICLE RECORDS', eyebrow:'KEEP THE ROAD AHEAD IN SIGHT',
      h1:'Remember the last.', h2:'See what’s next.', tagline:'Your car’s story, ready when you need it.',
      current:'CURRENT ODOMETER', next:'NEXT SERVICE SET FOR', left:'TO GO', overdue:'PAST YOUR PLAN', due:'SERVICE MILEAGE REACHED',
      last:'LAST SERVICE AT', service:'Oil change', inputs:'CHANGE THE EXAMPLE',
      curInput:'Current odometer (km)', nextInput:'Next service (km)', lastInput:'Last service (km)',
      ref:'Service distance shown from the figures you enter.', manual:'You set the intervals. IkmahLog keeps the record.',
      maintenance:'Maintenance', fuel:'Fuel & parts', insurance:'Insurance', store:'View on the App Store', reset:'Reset example',
      note:'Website illustration only. Dates and mileage are examples. No diagnostics, manufacturer schedule, automatic vehicle reading, or service advice.',
      invalid:'Use whole, nonnegative km values up to 9,999,999. The next service must be after the last service, and current mileage cannot precede the last service.',
      complete:'Plan reached — review your service record.', progressive:'Progress between the previous and next planned service.'
    },
    ja: {
      brand:'IkmahLog',subbrand:'車両の記録',eyebrow:'走行履歴から次の予定を確認',
      h1:'前回を記録する。',h2:'次回が見えてくる。',tagline:'車の履歴を、必要なときに確認。',
      current:'現在の走行距離',next:'次回整備予定',left:'残り',overdue:'予定から超過',due:'設定距離に到達',
      last:'前回整備',service:'オイル交換',inputs:'数値を変更して試す',
      curInput:'現在の走行距離（km）',nextInput:'次回整備距離（km）',lastInput:'前回整備距離（km）',
      ref:'入力した数値から整備予定までの距離を表示します。',manual:'整備間隔は自分で設定。記録はIkmahLogに。',
      maintenance:'整備',fuel:'給油・部品',insurance:'保険',store:'App Storeで見る',reset:'初期値に戻す',
      note:'LPの説明用サンプルです。車両の自動読取、故障診断、メーカー指定の整備時期判定や整備推奨を行うものではありません。',
      invalid:'走行距離は0〜9,999,999の整数で入力してください。次回整備距離は前回より大きく、現在の距離は前回以上にしてください。',
      complete:'設定した距離に達しました。整備記録を確認してください。',progressive:'前回から次回予定までの進捗'
    },
    ar: {
      brand:'IkmahLog',subbrand:'سجلات المركبة',eyebrow:'احتفظ بسجل الطريق القادم',
      h1:'سجّل آخر صيانة.',h2:'واعرف موعد التالية.',tagline:'سجل مركبتك عندما تحتاج إليه.',
      current:'قراءة العداد الحالية',next:'الصيانة القادمة عند',left:'المتبقي',overdue:'تجاوزت المسافة المحددة',due:'وصلت للمسافة المحددة',
      last:'آخر صيانة عند',service:'تغيير الزيت',inputs:'جرّب تغيير الأرقام',
      curInput:'عداد المسافة الحالي (كم)',nextInput:'الصيانة التالية (كم)',lastInput:'آخر صيانة (كم)',
      ref:'المسافة محسوبة من الأرقام التي تدخلها.',manual:'أنت تحدد الفترات. وIkmahLog يحتفظ بالسجل.',
      maintenance:'الصيانة',fuel:'الوقود والقطع',insurance:'التأمين',store:'عرضه على App Store',reset:'إعادة ضبط المثال',
      note:'هذا مثال توضيحي للموقع فقط. لا يقرأ عداد السيارة تلقائياً ولا يشخص الأعطال أو يحدد جدول الشركة المصنعة أو يقدم نصيحة صيانة.',
      invalid:'استخدم أرقاماً صحيحة بين 0 و9,999,999. يجب أن تكون الصيانة القادمة بعد السابقة وأن لا تقل القراءة الحالية عن السابقة.',
      complete:'بلغت المسافة المحددة؛ راجع سجل الصيانة.',progressive:'التقدم بين الصيانة السابقة والمخططة'
    }
  };
  const root = document.createElement('section');
  root.id = ROOT_ID; root.className = 'ik184'; root.setAttribute('aria-labelledby','ik184-heading');
  root.innerHTML = `
  <div class="ik184-top"><span class="ik184-brand"><span class="ik184-gauge" aria-hidden="true"><span></span></span><span data-ik-t="brand"></span></span><span class="ik184-top-sub" data-ik-t="subbrand"></span></div>
  <div class="ik184-scene" aria-hidden="true"><div class="ik184-garage"><div class="ik184-car"><span class="ik184-roof"></span><span class="ik184-window"></span><span class="ik184-wheel ik184-wheel-a"></span><span class="ik184-wheel ik184-wheel-b"></span></div></div></div>
  <div class="ik184-content">
    <div class="ik184-copy"><p class="ik184-eyebrow" data-ik-t="eyebrow"></p><h2 id="ik184-heading"><span data-ik-t="h1"></span><em data-ik-t="h2"></em></h2><p class="ik184-tagline" data-ik-t="tagline"></p></div>
    <div class="ik184-dashboard">
      <div class="ik184-overview"><div class="ik184-stat"><small data-ik-t="current"></small><output dir="ltr" id="ik184-current">47,250 km</output></div><div class="ik184-stat"><small data-ik-t="next"></small><output dir="ltr" id="ik184-next">50,000 km</output></div><div class="ik184-result" id="ik184-result" aria-live="polite"><output id="ik184-remaining" dir="ltr">2,750 km</output><span data-ik-t="left">TO GO</span></div></div>
      <div class="ik184-trackarea"><div class="ik184-track" role="progressbar" aria-label="Service mileage progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="55" id="ik184-progress"><div id="ik184-fill"></div></div><div class="ik184-tracklabels"><span id="ik184-start" dir="ltr">45,000 km</span><span id="ik184-end" dir="ltr">50,000 km</span></div></div>
      <div class="ik184-record"><div><span class="ik184-icon" aria-hidden="true">◈</span><span data-ik-t="last"></span><strong id="ik184-last-display" dir="ltr">45,000 km</strong><span class="ik184-service" data-ik-t="service"></span></div><p data-ik-t="manual"></p></div>
      <div class="ik184-editor"><div class="ik184-editor-title"><strong data-ik-t="inputs"></strong><button type="button" id="ik184-reset" data-ik-t="reset"></button></div><div class="ik184-inputs">
        <label><span data-ik-t="curInput"></span><input data-ik-field="current" type="number" inputmode="numeric" min="0" max="9999999" step="1" value="47250" dir="ltr" /></label>
        <label><span data-ik-t="nextInput"></span><input data-ik-field="next" type="number" inputmode="numeric" min="0" max="9999999" step="1" value="50000" dir="ltr" /></label>
        <label><span data-ik-t="lastInput"></span><input data-ik-field="last" type="number" inputmode="numeric" min="0" max="9999999" step="1" value="45000" dir="ltr" /></label>
      </div><p class="ik184-err" id="ik184-error" role="status" hidden></p><p class="ik184-detail" data-ik-t="ref"></p></div>
    </div>
    <a class="ik184-store" data-ik-store target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/id6808427228"><span class="ik184-apple" aria-hidden="true">●</span><span data-ik-t="store"></span><span aria-hidden="true">↗</span></a>
    <div class="ik184-features"><span>⚒ <span data-ik-t="maintenance"></span></span><span>◈ <span data-ik-t="fuel"></span></span><span>♧ <span data-ik-t="insurance"></span></span></div>
    <p class="ik184-note" data-ik-t="note"></p>
  </div>`;
  const anchor = document.querySelector('.p19-breadcrumb');
  if (anchor && anchor.parentNode) anchor.insertAdjacentElement('afterend',root);
  else {const main=document.querySelector('#p199-content') || document.querySelector('main'); if(main && main.parentNode) main.parentNode.insertBefore(root,main);}
  if (!root.isConnected) return;
  const $ = q => root.querySelector(q), $$=q=>Array.from(root.querySelectorAll(q));
  const fields = Object.fromEntries($$('[data-ik-field]').map(x=>[x.dataset.ikField,x]));
  const defaults = {current:'47250',next:'50000',last:'45000'};
  const number = n => n.toLocaleString('en-US',{maximumFractionDigits:0});
  let locale = 'en';
  const language = () => {const raw=String(document.querySelector('#p199-language')?.value || new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en').toLowerCase();return raw.startsWith('ar')?'ar':raw.startsWith('ja')?'ja':'en';};
  const country = () => {const v=String(document.querySelector('#p199-country')?.value||'us').toLowerCase();return /^[a-z]{2}$/.test(v)?v:'us';};
  const read = key => {const f=fields[key],s=f.value.trim();const n=Number(s);const ok=/^\d+$/.test(s) && Number.isSafeInteger(n) && n<=9999999;f.setAttribute('aria-invalid',String(!ok));return ok?n:null;};
  function render(){
    const v={current:read('current'),next:read('next'),last:read('last')};
    const ok=Object.values(v).every(x=>x!==null)&&v.next>v.last&&v.current>=v.last;
    const err=$('#ik184-error'),result=$('#ik184-result'),progress=$('#ik184-progress');
    err.hidden=ok;err.textContent=ok?'':i18n[locale].invalid;
    if(!ok){['#ik184-current','#ik184-next','#ik184-remaining','#ik184-last-display','#ik184-start','#ik184-end'].forEach(s=>$(s).textContent='—');$('#ik184-fill').style.width='0%';result.classList.remove('ik184-due','ik184-overdue');progress.setAttribute('aria-valuenow','0');return;}
    const remain=v.next-v.current;
    $('#ik184-current').textContent=number(v.current)+' km';$('#ik184-next').textContent=number(v.next)+' km';$('#ik184-last-display').textContent=number(v.last)+' km';
    $('#ik184-start').textContent=number(v.last)+' km';$('#ik184-end').textContent=number(v.next)+' km';
    $('#ik184-remaining').textContent=number(Math.abs(remain))+' km';
    const state=remain<0?'overdue':remain===0?'due':'left';
    result.classList.toggle('ik184-due',state==='due');result.classList.toggle('ik184-overdue',state==='overdue');
    result.querySelector('span').textContent=i18n[locale][state];
    const pct=Math.max(0,Math.min(100,(v.current-v.last)/(v.next-v.last)*100));
    $('#ik184-fill').style.width=pct.toFixed(2)+'%';progress.setAttribute('aria-valuenow',String(Math.round(pct)));
    progress.setAttribute('aria-valuetext',i18n[locale].progressive+' '+pct.toFixed(1)+'%');
  }
  function translate(){locale=language();root.lang=locale;root.dir=locale==='ar'?'rtl':'ltr';$$('[data-ik-t]').forEach(el=>el.textContent=i18n[locale][el.dataset.ikT]||'');$$('[data-ik-store]').forEach(el=>el.href=`https://apps.apple.com/${country()}/app/id${APP_ID}`);render();}
  Object.values(fields).forEach(f=>{f.addEventListener('input',render);f.addEventListener('change',render);});
  $('#ik184-reset').addEventListener('click',()=>{Object.entries(defaults).forEach(([k,v])=>fields[k].value=v);render();});
  document.addEventListener('change',e=>{if(e.target && (e.target.id==='p199-language'||e.target.id==='p199-country'))translate();});
  new MutationObserver(()=>{if(language()!==locale)translate();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  translate();
})();
