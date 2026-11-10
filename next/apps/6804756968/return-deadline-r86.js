/* R86 public-site educational demo. No network, storage, or real seller-policy lookup. */
(() => {
  'use strict';
  const ID = 'tsz-return-r86';
  const DAY = 86400000;
  const TXT = {
    en: {
      eyebrow:'RETURN READINESS · INTERACTIVE EXAMPLE', title:'Will you be ready before the return date?',
      sub:'Try an estimated return window and mark the things you have checked. A simple example—not the actual app screen.',
      dates:'1 · Choose the dates', purchase:'Purchase date', window:'Example return window (days)',
      ready:'2 · Prepare to return', proof:'Receipt or order number ready', box:'Item and accessories gathered',
      policy:'Actual store policy checked', shipping:'Return method / handoff checked',
      remaining:'Estimated time remaining', due:'Example deadline', done:'Preparation checked',
      urgent:'The estimated deadline is close. Check the seller’s actual rules now.',
      late:'The illustrative deadline has passed. Ask the seller about your options.',
      normal:'Check the seller’s rules before relying on this date.',
      invalid:'Please select a valid purchase date that is not in the future.',
      soon:'Show 2-day example', reset:'Reset example',
      warning:'Illustration only. The date is calculated as purchase date + selected calendar days. Real return eligibility, start dates, holidays, handoff deadlines and exceptions depend on the seller’s policy. Nothing is saved or sent.',
      days:'days left', today:'Due today', passed:'days past', checked:'of 4 checked'
    },
    ja: {
      eyebrow:'返品の準備 · 体験サンプル',title:'返品期限までに、準備できる？',
      sub:'期限の日数を仮定し、返品前に確認したことをチェック。実際のアプリ画面ではない説明用デモです。',
      dates:'1 · 日付を決める',purchase:'購入日',window:'仮の返品可能期間（日）',
      ready:'2 · 準備を確認',proof:'レシート・注文番号を確認',box:'商品・付属品を揃えた',
      policy:'販売店の返品条件を確認',shipping:'返品方法・引き渡し期限を確認',
      remaining:'期限までの残り（概算）',due:'仮の返品期限',done:'準備チェック',
      urgent:'仮の期限が近づいています。販売店の条件を確認してください。',
      late:'仮の期限を過ぎています。販売店へ対応可能か確認してください。',
      normal:'この日付を信じる前に、販売店の条件を確認してください。',
      invalid:'未来の日付ではない、有効な購入日を選んでください。',
      soon:'残り2日の例',reset:'初期状態に戻す',
      warning:'説明用の試算です。「購入日＋指定日数」で計算します。実際の起算日、返品可否、祝日、発送・店舗持込期限などは販売店の条件に従います。入力は保存・送信されません。',
      days:'日残り',today:'今日が期限',passed:'日超過',checked:'／4 項目確認済み'
    },
    ar: {
      eyebrow:'الاستعداد للإرجاع · مثال تفاعلي',title:'هل أنت جاهز قبل موعد الإرجاع؟',
      sub:'جرّب مدة افتراضية وحدّد ما تحققت منه. هذا مثال توضيحي وليس شاشة التطبيق الفعلية.',
      dates:'١ · حدّد التواريخ',purchase:'تاريخ الشراء',window:'مدة الإرجاع الافتراضية (بالأيام)',
      ready:'٢ · راجع الاستعدادات',proof:'الإيصال أو رقم الطلب جاهز',box:'المنتج وملحقاته جاهزة',
      policy:'تم التأكد من سياسة المتجر',shipping:'تم التأكد من طريقة وتسليم الإرجاع',
      remaining:'الوقت المتبقي تقديريًا',due:'الموعد الافتراضي',done:'الخطوات المكتملة',
      urgent:'الموعد الافتراضي قريب. تحقق من قواعد البائع الآن.',
      late:'انقضى الموعد الافتراضي. اسأل البائع عن الخيارات المتاحة.',
      normal:'تحقق من سياسة البائع قبل الاعتماد على هذا التاريخ.',
      invalid:'اختر تاريخ شراء صالحًا لا يقع في المستقبل.',
      soon:'مثال: يومان متبقيان',reset:'إعادة تعيين',
      warning:'هذا مثال فقط. يُحسب التاريخ بإضافة الأيام المختارة إلى تاريخ الشراء. تعتمد الأهلية والتواريخ والعطلات ومواعيد التسليم على سياسة البائع. لا تُحفظ المدخلات ولا تُرسل.',
      days:'أيام متبقية',today:'الموعد اليوم',passed:'أيام بعد الموعد',checked:'من ٤ مكتملة'
    }
  };
  const iso = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  const utcDay = (value) => {
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    const d = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(d.getTime()) && d.toISOString().slice(0,10)===value ? Math.floor(d.getTime()/DAY) : null;
  };
  const fromDay = (n) => new Date(n*DAY).toISOString().slice(0,10);
  const language = () => {const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en';};
  const init = () => {
    if(document.getElementById(ID)) return;
    const host = document.querySelector('main') || document.body;
    if(!host) return;
    const section = document.createElement('section');section.id=ID;
    section.innerHTML = `<div class="r86-shell">
      <p class="r86-eyebrow" data-r86="eyebrow"></p><h2 data-r86="title"></h2><p class="r86-sub" data-r86="sub"></p>
      <div class="r86-grid"><div class="r86-pane"><h3 data-r86="dates"></h3>
        <label class="r86-control"><span data-r86="purchase"></span><input id="r86-purchase" type="date"></label>
        <label class="r86-control"><span data-r86="window"></span><select id="r86-window"><option value="7">7</option><option value="14">14</option><option value="30">30</option><option value="60">60</option></select></label>
        <div class="r86-result" aria-live="polite" aria-atomic="true"><div class="r86-label" data-r86="remaining"></div><div class="r86-big" id="r86-count"></div><div class="r86-date" id="r86-date"></div><div class="r86-status" id="r86-status"></div></div>
      </div><div class="r86-pane"><h3 data-r86="ready"></h3>
        <label class="r86-check"><input type="checkbox" data-r86-check="proof"><span data-r86="proof"></span></label>
        <label class="r86-check"><input type="checkbox" data-r86-check="box"><span data-r86="box"></span></label>
        <label class="r86-check"><input type="checkbox" data-r86-check="policy"><span data-r86="policy"></span></label>
        <label class="r86-check"><input type="checkbox" data-r86-check="shipping"><span data-r86="shipping"></span></label>
        <div class="r86-result" aria-live="polite"><div class="r86-label" data-r86="done"></div><div class="r86-big" id="r86-progress"></div></div>
        <div class="r86-actions"><button id="r86-soon" type="button" data-r86="soon"></button><button id="r86-reset" class="r86-secondary" type="button" data-r86="reset"></button></div>
      </div></div><p class="r86-warning" data-r86="warning"></p></div>`;
    host.appendChild(section);
    const date=section.querySelector('#r86-purchase'); const win=section.querySelector('#r86-window');
    const checks=[...section.querySelectorAll('input[data-r86-check]')];
    const days=section.querySelector('#r86-count'), due=section.querySelector('#r86-date');
    const status=section.querySelector('#r86-status'), progress=section.querySelector('#r86-progress');
    const reset=() => {const today=utcDay(iso(new Date()));date.value=fromDay(today-5);win.value='14';checks.forEach(c=>c.checked=false);render();};
    const render=() => {
      const lang=language(), t=TXT[lang];section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';
      section.querySelectorAll('[data-r86]').forEach(node=>{const k=node.getAttribute('data-r86');if(t[k])node.textContent=t[k];});
      const now=utcDay(iso(new Date())), start=utcDay(date.value), period=Number(win.value);
      progress.textContent = lang==='ar' ? `${checks.filter(c=>c.checked).length} ${t.checked}` : lang==='ja' ? `${checks.filter(c=>c.checked).length}${t.checked}` : `${checks.filter(c=>c.checked).length} ${t.checked}`;
      if(start===null || start>now || ![7,14,30,60].includes(period)){
        days.textContent='—';due.textContent='';status.textContent=t.invalid;status.dataset.tone='expired';return;
      }
      const end=start+period, delta=end-now;
      days.textContent=delta>0?`${delta} ${t.days}`:delta===0?t.today:`${-delta} ${t.passed}`;
      const dateFmt=new Intl.DateTimeFormat(lang==='ja'?'ja-JP':lang==='ar'?'ar':'en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'});
      due.textContent=`${t.due}: ${dateFmt.format(new Date(end*DAY))}`;
      status.textContent=delta<0?t.late:delta<=3?t.urgent:t.normal;
      status.dataset.tone=delta<0?'expired':delta<=3?'urgent':'ok';
    };
    date.addEventListener('input',render);win.addEventListener('change',render);
    checks.forEach(c=>c.addEventListener('change',render));
    section.querySelector('#r86-soon').addEventListener('click',()=>{date.value=fromDay(utcDay(iso(new Date()))-12);win.value='14';render();});
    section.querySelector('#r86-reset').addEventListener('click',reset);
    new MutationObserver(m=>{if(m.some(x=>x.attributeName==='lang'))render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    reset();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
