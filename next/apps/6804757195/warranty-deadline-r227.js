/* TSZ LP R227 / Warranty Deadline Tracker. Fictional calendar-only warranty check. No storage, network, claims, reminders or notifications. */
(() => {
  'use strict';
  if (!document.body || (document.body.dataset.p199Id !== '6804757195' && document.body.dataset.p19AppId !== '6804757195')) return;
  if (document.getElementById('tsz-warranty-r227')) return;
  const host = document.querySelector('main');
  if (!host) return;
  const root = document.createElement('section');
  root.id = 'tsz-warranty-r227';
  root.setAttribute('aria-labelledby', 'wd227-title');
  root.innerHTML = `
    <div class="wd227-shell">
      <div class="wd227-topbar"><span class="wd227-brand"><span class="wd227-glyph">✳</span> <span data-wd227="brand">WARRANTY / THE DECISION WINDOW</span></span><span class="wd227-tag" data-wd227="demo">INTERACTIVE CALENDAR EXAMPLE · NOTHING SAVED</span></div>
      <div class="wd227-heading"><div class="wd227-heading-copy"><div class="wd227-round">227 <span>— WARRANTY DEADLINE TRACKER</span></div><h2 id="wd227-title"><span data-wd227="heading1">Before you pay for the repair,</span><em data-wd227="heading2">check one date.</em></h2><p data-wd227="intro">Choose a warranty term and a day something broke. See how much calendar time was left, without guessing.</p></div><div class="wd227-local-controls"><label><span data-wd227="language">LANGUAGE</span><select id="wd227-language" aria-label="Demo language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-wd227="region">APP STORE</span><select id="wd227-country" aria-label="App Store region"><option value="us">US</option><option value="jp">JP</option></select></label></div></div>
      <div class="wd227-layout">
        <section class="wd227-visual" aria-labelledby="wd227-panel-head"><div class="wd227-visual-top"><span class="wd227-overline" data-wd227="visualHead">THE WARRANTY WINDOW</span><span class="wd227-dot">● <span data-wd227="fiction">FICTIONAL EXAMPLE</span></span></div>
          <div class="wd227-status" id="wd227-status" data-state="inside"><div class="wd227-status-glyph" id="wd227-status-glyph">✓</div><div><p class="wd227-status-label" id="wd227-status-label">WITHIN THE ENTERED PERIOD</p><strong id="wd227-days">11</strong><span id="wd227-days-unit">days before the end</span></div></div>
          <div class="wd227-calendar"><div><span data-wd227="bought">PURCHASED</span><strong id="wd227-purchase-date">Dec 1, 2025</strong></div><div class="wd227-calendar-end"><span data-wd227="end">CALCULATED END DATE</span><strong id="wd227-end-date">Dec 1, 2026</strong></div></div>
          <div class="wd227-timeline"><span class="wd227-rail"><span class="wd227-rail-fill" id="wd227-rail-fill"></span><span class="wd227-rail-pin" id="wd227-rail-pin"></span></span><div class="wd227-timeline-labels"><span data-wd227="start">PURCHASE</span><span data-wd227="deadline">DEADLINE</span></div></div>
          <div class="wd227-bottom-note"><span class="wd227-note-icon">i</span><p id="wd227-reading">For this sample, the fault date is 11 days before the estimated warranty end.</p></div>
        </section>
        <section class="wd227-editor" aria-labelledby="wd227-editor-heading"><div class="wd227-editor-top"><span class="wd227-editor-index">01 / 02</span><span data-wd227="scenario">THE SCENARIO</span></div><h3 id="wd227-editor-heading" data-wd227="editorHeading">Change the dates. Watch the answer change.</h3>
          <div class="wd227-product"><span class="wd227-product-icon" aria-hidden="true">▤</span><div><span data-wd227="itemLabel">SAMPLE PRODUCT</span><strong data-wd227="item">Kitchen blender</strong></div><span class="wd227-fake" data-wd227="sample">SAMPLE</span></div>
          <div class="wd227-input-block"><div class="wd227-input-label"><span data-wd227="term">WARRANTY PERIOD ENTERED</span><span id="wd227-term-value">12 MONTHS</span></div><div class="wd227-term" role="group" aria-label="Warranty length"><button type="button" data-months="12" aria-pressed="true">12 <span data-wd227="monthsUnit">MO</span></button><button type="button" data-months="24" aria-pressed="false">24 <span data-wd227="monthsUnit">MO</span></button><button type="button" data-months="36" aria-pressed="false">36 <span data-wd227="monthsUnit">MO</span></button></div></div>
          <div class="wd227-input-block wd227-when"><label for="wd227-incident" data-wd227="incident">DATE THE ITEM BROKE</label><input type="date" id="wd227-incident" value="2026-11-20" min="2025-12-01" max="2035-12-31"><div class="wd227-presets" role="group" aria-label="Example fault dates"><button type="button" data-preset="before" aria-pressed="false" data-wd227="dayBefore">DAY BEFORE</button><button type="button" data-preset="due" aria-pressed="false" data-wd227="onDeadline">DEADLINE DAY</button><button type="button" data-preset="after" aria-pressed="false" data-wd227="dayAfter">DAY AFTER</button></div></div>
          <div class="wd227-editor-footer"><button type="button" id="wd227-reset" data-wd227="reset">↺ Reset example</button><span data-wd227="notSaved">NO RECORD CREATED</span></div>
        </section>
      </div>
      <div class="wd227-footer"><div><strong data-wd227="footerHeading">A date to check. Not a promise of coverage.</strong><p data-wd227="disclaimer">This demo only calculates an illustrative calendar period. Actual coverage, exclusions and repair eligibility depend on the seller or manufacturer's terms. Verify those before paying.</p></div><a id="wd227-store" href="https://apps.apple.com/us/app/warranty-deadline-tracker/id6804757195" target="_blank" rel="noopener noreferrer" data-wd227="store">Open Warranty Deadline Tracker ↗</a></div>
    </div>`;
  host.insertBefore(root, host.firstChild);
  const $ = id => root.querySelector('#wd227-' + id);
  const translations = {
    en: {brand:'WARRANTY / THE DECISION WINDOW',demo:'INTERACTIVE CALENDAR EXAMPLE · NOTHING SAVED',heading1:'Before you pay for the repair,',heading2:'check one date.',intro:'Choose a warranty term and a day something broke. See how much calendar time was left, without guessing.',language:'LANGUAGE',region:'APP STORE',visualHead:'THE WARRANTY WINDOW',fiction:'FICTIONAL EXAMPLE',bought:'PURCHASED',end:'CALCULATED END DATE',start:'PURCHASE',deadline:'DEADLINE',scenario:'THE SCENARIO',editorHeading:'Change the dates. Watch the answer change.',itemLabel:'SAMPLE PRODUCT',item:'Kitchen blender',sample:'SAMPLE',term:'WARRANTY PERIOD ENTERED',monthsUnit:'MO',monthLabel:n=>`${n} MONTHS`,incident:'DATE THE ITEM BROKE',dayBefore:'DAY BEFORE',onDeadline:'DEADLINE DAY',dayAfter:'DAY AFTER',reset:'↺ Reset example',notSaved:'NO RECORD CREATED',footerHeading:'A date to check. Not a promise of coverage.',disclaimer:'This demo only calculates an illustrative calendar period. Actual coverage, exclusions and repair eligibility depend on the seller or manufacturer’s terms. Verify those before paying.',store:'Open Warranty Deadline Tracker ↗',inside:'WITHIN THE ENTERED PERIOD',outside:'PAST THE ENTERED PERIOD',today:'ON THE CALCULATED END DATE',daysBefore:n=>`${n} ${n===1?'day':'days'} before the end`,daysAfter:n=>`${n} ${n===1?'day':'days'} past the end`,onDate:'on the calculated deadline',readingBefore:n=>`For this example, the fault date is ${n} ${n===1?'day':'days'} before the estimated warranty end.`,readingAfter:n=>`For this example, the fault date is ${n} ${n===1?'day':'days'} after the estimated warranty end.`,readingOn:'For this example, the fault date is exactly the estimated warranty end date.',dateError:'Choose a valid fault date.'},
    ja: {brand:'保証期限 / 判断できる日付',demo:'操作できる日付サンプル · 保存なし',heading1:'修理代を払う前に、',heading2:'確認したい日付がある。',intro:'保証期間と故障した日を変えるだけ。期限まで何日あったのかを、その場で確認できます。',language:'言語',region:'APP STORE地域',visualHead:'保証期間の見える化',fiction:'架空の例',bought:'購入日',end:'計算上の保証終了日',start:'購入',deadline:'期限',scenario:'試してみる',editorHeading:'日付を変えると、結果が変わる。',itemLabel:'サンプル商品',item:'キッチンミキサー',sample:'サンプル',term:'入力した保証期間',monthsUnit:'か月',monthLabel:n=>`${n}か月`,incident:'故障した日',dayBefore:'前日',onDeadline:'期限当日',dayAfter:'翌日',reset:'↺ 初期状態に戻す',notSaved:'記録は保存されません',footerHeading:'確認すべき日付。保証適用を約束するものではありません。',disclaimer:'このデモは架空の保証期間をカレンダー上で計算するだけです。実際の保証範囲、免責事項、修理対象かどうかは販売店やメーカーの規約によります。修理代の支払い前にご確認ください。',store:'App Storeでアプリを見る ↗',inside:'入力した保証期間内',outside:'入力した保証期間を経過',today:'計算上の保証終了日',daysBefore:n=>`終了まであと${n}日`,daysAfter:n=>`終了から${n}日経過`,onDate:'計算上の期限当日',readingBefore:n=>`この架空の例では、故障日は計算上の保証終了日の${n}日前です。`,readingAfter:n=>`この架空の例では、故障日は計算上の保証終了日から${n}日後です。`,readingOn:'この架空の例では、故障日が計算上の保証終了日と同じです。',dateError:'正しい故障日を選んでください。'},
    ar: {brand:'الضمان / نافذة القرار',demo:'مثال تفاعلي للتواريخ · دون حفظ',heading1:'قبل أن تدفع مقابل الإصلاح،',heading2:'تحقق من تاريخ واحد.',intro:'غيّر مدة الضمان وتاريخ العطل، واعرف كم بقي من الوقت وفقًا لهذا المثال.',language:'اللغة',region:'متجر التطبيقات',visualHead:'فترة الضمان',fiction:'مثال افتراضي',bought:'تاريخ الشراء',end:'نهاية الضمان المحسوبة',start:'الشراء',deadline:'النهاية',scenario:'السيناريو',editorHeading:'غيّر التواريخ، وشاهد الفرق.',itemLabel:'منتج تجريبي',item:'خلاط المطبخ',sample:'مثال',term:'مدة الضمان المدخلة',monthsUnit:'شهر',monthLabel:n=>`${n} شهرًا`,incident:'تاريخ تعطل المنتج',dayBefore:'اليوم السابق',onDeadline:'يوم النهاية',dayAfter:'اليوم التالي',reset:'↺ إعادة المثال',notSaved:'لا يتم حفظ أي سجل',footerHeading:'تاريخ للمراجعة، وليس وعدًا بالتغطية.',disclaimer:'يحسب هذا المثال فترة تقويمية افتراضية فقط. تعتمد التغطية الفعلية والاستثناءات وأهلية الإصلاح على شروط البائع أو الشركة المصنّعة. تحقق منها قبل الدفع.',store:'عرض التطبيق في App Store ↗',inside:'ضمن الفترة المدخلة',outside:'بعد الفترة المدخلة',today:'في يوم نهاية الضمان المحسوبة',daysBefore:n=>`باقي ${n} يومًا`,daysAfter:n=>`انقضى ${n} يومًا`,onDate:'في يوم النهاية المحسوبة',readingBefore:n=>`في هذا المثال، وقع العطل قبل نهاية الضمان المحسوبة بـ ${n} يومًا.`,readingAfter:n=>`في هذا المثال، وقع العطل بعد نهاية الضمان المحسوبة بـ ${n} يومًا.`,readingOn:'في هذا المثال، وقع العطل في يوم نهاية الضمان المحسوبة.',dateError:'اختر تاريخ عطل صالحًا.'}
  };
  const PURCHASE='2025-12-01';
  const state={lang:'en',region:'us',months:12,incident:'2026-11-20',preset:'manual'};
  const globalLang=document.getElementById('p199-language');
  const globalRegion=document.getElementById('p199-country');
  const localLang=$('language'),localRegion=$('country');
  const normLang=v=>String(v||'').toLowerCase().startsWith('ja')?'ja':String(v||'').toLowerCase().startsWith('ar')?'ar':'en';
  const normRegion=v=>String(v||'').toLowerCase()==='jp'?'jp':'us';
  function matched(control,want,map){return control?Array.from(control.options).find(o=>map(o.value)===want)?.value:null;}
  if (globalLang && globalLang.value) state.lang=normLang(globalLang.value);
  if (globalRegion && globalRegion.value) state.region=normRegion(globalRegion.value);
  function syncGlobal(control,want,map){const val=matched(control,want,map);if(val!=null&&control.value!==val){control.value=val;control.dispatchEvent(new Event('change',{bubbles:true}));}}
  function parseISO(v){if(!/^\d{4}-\d\d-\d\d$/.test(String(v||'')))return null;const d=new Date(v+'T12:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(0,10)===v?d:null;}
  function iso(d){return d.toISOString().slice(0,10);}
  function endFor(months){const d=parseISO(PURCHASE);d.setUTCMonth(d.getUTCMonth()+months);return d;}
  function shift(d,n){return new Date(d.getTime()+n*86400000);}
  function calendarDays(a,b){return Math.round((Date.UTC(b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate())-Date.UTC(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate()))/86400000);}
  function pretty(d){return new Intl.DateTimeFormat(state.lang==='ja'?'ja-JP':state.lang==='ar'?'ar-EG':'en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(d);}
  function setPreset(preset){state.preset=preset;const end=endFor(state.months);state.incident=iso(shift(end,preset==='before'?-1:preset==='after'?1:0));render();}
  function render(){
    const t=translations[state.lang];root.lang=state.lang;root.dir=state.lang==='ar'?'rtl':'ltr';
    localLang.value=state.lang;localRegion.value=state.region;
    root.querySelectorAll('[data-wd227]').forEach(node=>{const k=node.dataset.wd227;if(typeof t[k]==='string')node.textContent=t[k];});
    $('term-value').textContent=t.monthLabel(state.months);
    root.querySelectorAll('[data-months]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.months===state.months)));
    root.querySelectorAll('[data-preset]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.preset===state.preset)));
    const term=endFor(state.months);const fault=parseISO(state.incident);
    $('purchase-date').textContent=pretty(parseISO(PURCHASE));$('end-date').textContent=pretty(term);
    $('incident').value=state.incident;
    const valid=!!fault;
    const days=valid?calendarDays(fault,term):null;
    const status=valid?(days<0?'outside':days===0?'today':'inside'):'invalid';
    $('status').dataset.state=status;
    $('status-glyph').textContent=status==='outside'?'!':status==='invalid'?'?':status==='today'?'◷':'✓';
    $('status-label').textContent=status==='outside'?t.outside:status==='today'?t.today:status==='invalid'?t.dateError:t.inside;
    $('days').textContent=days==null?'—':String(Math.abs(days));
    $('days-unit').textContent=days==null?'':days<0?t.daysAfter(Math.abs(days)):days===0?t.onDate:t.daysBefore(days);
    $('reading').textContent=days==null?t.dateError:days<0?t.readingAfter(Math.abs(days)):days===0?t.readingOn:t.readingBefore(days);
    const elapsed=valid?calendarDays(parseISO(PURCHASE),fault):0;
    const total=calendarDays(parseISO(PURCHASE),term);
    const percent=Math.max(0,Math.min(100,100*elapsed/total));
    $('rail-fill').style.width=percent+'%';$('rail-pin').style.insetInlineStart=percent+'%';
    $('store').href='https://apps.apple.com/'+state.region+'/app/warranty-deadline-tracker/id6804757195';
  }
  localLang.addEventListener('change',()=>{state.lang=normLang(localLang.value);syncGlobal(globalLang,state.lang,normLang);render();});
  localRegion.addEventListener('change',()=>{state.region=normRegion(localRegion.value);syncGlobal(globalRegion,state.region,normRegion);render();});
  if(globalLang)globalLang.addEventListener('change',()=>{const value=normLang(globalLang.value);if(state.lang!==value){state.lang=value;render();}});
  if(globalRegion)globalRegion.addEventListener('change',()=>{const value=normRegion(globalRegion.value);if(state.region!==value){state.region=value;render();}});
  root.querySelectorAll('[data-months]').forEach(b=>b.addEventListener('click',()=>{state.months=+b.dataset.months;if(state.preset!=='manual'){setPreset(state.preset);}else render();}));
  root.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>setPreset(b.dataset.preset)));
  $('incident').addEventListener('input',()=>{state.incident=$('incident').value;state.preset='manual';render();});
  $('reset').addEventListener('click',()=>{state.months=12;state.incident='2026-11-20';state.preset='manual';render();});
  render();
})();
