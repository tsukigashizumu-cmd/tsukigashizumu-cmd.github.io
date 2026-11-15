(() => {
  'use strict';
  const APP = '6798447816';
  const ID = 'tsz-haulstamp-r212';
  if (!document.body || document.body.dataset.p199Id !== APP || document.getElementById(ID)) return;

  const words = {
    en: {
      eyebrow: 'HAULSTAMP · DOCK TIME LOG', headline: 'Wait time is not load time.',
      intro: 'One dock stop. Two different parts of your day. Keep them separate so you can remember what happened.',
      sample: 'INTERACTIVE EXAMPLE', scenario: 'Choose a dock-stop example',
      normal: 'Typical stop', slow: 'Long wait', fast: 'Quick dock',
      wait: 'Waiting at the dock', handle: 'Loading / unloading', unit: 'min',
      elapsed: 'Total time on site', together: 'Your stop, in three timestamps',
      arrived: 'Arrived at dock', began: 'Handling began', finished: 'Stop finished',
      waitShare: 'Waiting', handleShare: 'Handling', timeSplit: 'How the stop was spent',
      hours: 'h', minutes: 'm', note: 'This is a manual sample, not an automatic tracker.',
      disclosure: 'Personal reference only. Not legal evidence, a detention-pay determination, or a substitute for ELD/BOL records. Only use the app while safely parked.',
      reset: 'Reset example', cta: 'Explore HaulStamp on the App Store',
      locale: 'Language', region: 'App Store region', precision: 'Adjust each phase to see the timeline change.',
      error: 'Enter a duration between 0 and 1,440 minutes.',
      totalPrefix: 'Recorded example', minNote: 'Sample start: 08:20 · times are illustrative',
      timeline: 'DOCK STOP TIMELINE',
    },
    ja: {
      eyebrow: 'HAULSTAMP · ドック作業時間の記録', headline: '待機時間と、荷役時間は別物だ。',
      intro: '1回の搬入で、待機と積み降ろしを分けて記録。あとから「何に何分かかったか」が見える。',
      sample: '操作できるサンプル', scenario: '搬入例を選ぶ',
      normal: '通常の搬入', slow: '長い待機', fast: 'すぐに荷役',
      wait: 'ドックでの待機', handle: '積み込み・荷降ろし', unit: '分',
      elapsed: '現場にいた合計時間', together: '3つの時刻で見える1回の搬入',
      arrived: 'ドックに到着', began: '荷役を開始', finished: '搬入を終了',
      waitShare: '待機', handleShare: '荷役', timeSplit: '時間の内訳',
      hours: '時間', minutes: '分', note: 'これは手入力のサンプルです。自動で計測するものではありません。',
      disclosure: '個人用の参考記録です。法的証拠や拘束料の支払資格を保証せず、ELD・BOLに代わるものではありません。アプリ操作は安全に停車してから。',
      reset: 'サンプルを戻す', cta: 'App StoreでHaulStampを見る',
      locale: '言語', region: 'App Store地域', precision: '待機・荷役の分数を変えると時刻が更新されます。',
      error: '0〜1,440分の範囲で入力してください。',
      totalPrefix: 'このサンプルの合計', minNote: '開始例：08:20 · 時刻は説明用です',
      timeline: 'ドック滞在のタイムライン',
    },
    ar: {
      eyebrow: 'HAULSTAMP · سجل وقت الرصيف', headline: 'وقت الانتظار ليس وقت التحميل.',
      intro: 'توقف واحد عند الرصيف، ومرحلتان مختلفتان. سجّل الانتظار والمناولة كلًا على حدة لتتذكر ما حدث.',
      sample: 'مثال تفاعلي', scenario: 'اختر مثالاً للتوقف',
      normal: 'توقف عادي', slow: 'انتظار طويل', fast: 'رصيف سريع',
      wait: 'الانتظار عند الرصيف', handle: 'التحميل أو التفريغ', unit: 'دقيقة',
      elapsed: 'إجمالي الوقت في الموقع', together: 'ثلاث لحظات لتوقف واحد',
      arrived: 'الوصول إلى الرصيف', began: 'بدء المناولة', finished: 'انتهاء التوقف',
      waitShare: 'انتظار', handleShare: 'مناولة', timeSplit: 'توزيع الوقت',
      hours: 'س', minutes: 'د', note: 'هذا مثال يدوي، وليس تتبعًا تلقائيًا.',
      disclosure: 'سجل مرجعي شخصي فقط. ليس دليلاً قانونيًا أو تحديدًا لاستحقاق رسوم التأخير، ولا بديلاً عن سجلات ELD أو BOL. استخدم التطبيق بعد التوقف الآمن فقط.',
      reset: 'إعادة المثال', cta: 'استكشف HaulStamp في App Store',
      locale: 'اللغة', region: 'منطقة App Store', precision: 'غيّر مدة كل مرحلة وشاهد الخط الزمني يتحدث.',
      error: 'أدخل مدة من 0 إلى ١٤٤٠ دقيقة.',
      totalPrefix: 'إجمالي المثال', minNote: 'بداية المثال: 08:20 · الأوقات للتوضيح فقط',
      timeline: 'الخط الزمني لتوقف الرصيف',
    }
  };
  let lang = 'en';
  let region = 'us';
  let waiting = 60;
  let handling = 45;
  const presets = {normal: [60, 45], slow: [145, 40], fast: [15, 55]};
  let active = 'normal';
  let inSync = false;
  const hostLanguage = document.querySelector('#p199-language, #p19-language, #hs36-language, #haulstamp-language');
  const hostCountry = document.querySelector('#p199-country, #p19-country, #hs36-country, #haulstamp-country');
  const toLang = v => (/^ar\b|^ar[-_]/i.test(v || '') ? 'ar' : /^ja\b|^ja[-_]/i.test(v || '') ? 'ja' : 'en');
  const toRegion = v => (/^(jp|japan|ja-jp)$/i.test(v || '') ? 'jp' : 'us');
  if (hostLanguage && hostLanguage.value) lang = toLang(hostLanguage.value);
  if (hostCountry && hostCountry.value) region = toRegion(hostCountry.value);

  const root = document.createElement('section');
  root.id = ID;
  root.setAttribute('aria-label', 'HaulStamp dock time example');
  root.innerHTML = `
    <div class="hs212-wrap">
      <div class="hs212-top"><span class="hs212-mark"><span class="hs212-markdot"></span> HAULSTAMP</span><span class="hs212-chip" id="hs212-top-chip"></span></div>
      <div class="hs212-hero">
        <div class="hs212-copy"><div class="hs212-eyebrow" data-t="eyebrow"></div><h2 data-t="headline"></h2><p data-t="intro"></p></div>
        <div class="hs212-total"><span class="hs212-total-top" data-t="elapsed"></span><strong id="hs212-total"></strong><span id="hs212-total-sub"></span></div>
      </div>
      <div class="hs212-stage">
        <div class="hs212-controls">
          <div class="hs212-smallheading"><span class="hs212-sample" data-t="sample"></span><span data-t="scenario"></span></div>
          <div class="hs212-presets"><button type="button" data-preset="normal"></button><button type="button" data-preset="slow"></button><button type="button" data-preset="fast"></button></div>
          <div class="hs212-phase hs212-wait">
            <div class="hs212-phase-head"><span class="hs212-phase-icon">01</span><label for="hs212-wait-range" data-t="wait"></label></div>
            <div class="hs212-inputs"><input id="hs212-wait-range" type="range" min="0" max="240" step="5" value="60" aria-label="Waiting duration slider"><div class="hs212-number"><input id="hs212-wait-value" type="number" min="0" max="1440" step="1" value="60" aria-label="Waiting duration minutes"><span data-t="unit"></span></div></div>
          </div>
          <div class="hs212-phase hs212-load">
            <div class="hs212-phase-head"><span class="hs212-phase-icon">02</span><label for="hs212-load-range" data-t="handle"></label></div>
            <div class="hs212-inputs"><input id="hs212-load-range" type="range" min="0" max="240" step="5" value="45" aria-label="Loading duration slider"><div class="hs212-number"><input id="hs212-load-value" type="number" min="0" max="1440" step="1" value="45" aria-label="Loading duration minutes"><span data-t="unit"></span></div></div>
          </div>
          <div id="hs212-error" class="hs212-error" role="status" hidden></div>
          <p class="hs212-hint" data-t="precision"></p>
          <button type="button" class="hs212-reset" id="hs212-reset" data-t="reset"></button>
        </div>
        <div class="hs212-ledger">
          <div class="hs212-ledgerhead"><span class="hs212-ledgerbadge" data-t="timeline"></span><span class="hs212-ref">08:20 →</span></div>
          <div class="hs212-timelist">
            <div class="hs212-timepoint"><i class="hs212-point"></i><div><span data-t="arrived"></span><strong id="hs212-arrival">08:20</strong></div></div>
            <div class="hs212-timepoint"><i class="hs212-point waitpoint"></i><div><span data-t="began"></span><strong id="hs212-began">09:20</strong></div></div>
            <div class="hs212-timepoint"><i class="hs212-point loadpoint"></i><div><span data-t="finished"></span><strong id="hs212-finished">10:05</strong></div></div>
          </div>
          <div class="hs212-ratiotitle" data-t="timeSplit"></div><div class="hs212-ratio" aria-hidden="true"><span id="hs212-waitbar"></span><span id="hs212-loadbar"></span></div>
          <div class="hs212-split"><span><i class="hs212-dot waitdot"></i> <span data-t="waitShare"></span> <b id="hs212-wait-label"></b></span><span><i class="hs212-dot loaddot"></i> <span data-t="handleShare"></span> <b id="hs212-load-label"></b></span></div>
          <div class="hs212-method"><strong data-t="together"></strong><span data-t="minNote"></span></div>
        </div>
      </div>
      <div class="hs212-foot"><p data-t="note"></p><p class="hs212-disclosure" data-t="disclosure"></p><div class="hs212-bottom">
        <div class="hs212-selects"><label><span data-t="locale"></span><select id="hs212-language" aria-label="Language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="hs212-country" aria-label="App Store region"><option value="us">US</option><option value="jp">JP</option></select></label></div>
        <a id="hs212-store" target="_blank" rel="noopener noreferrer"><span data-t="cta"></span><span aria-hidden="true"> ↗</span></a>
      </div></div>
    </div>`;
  const main = document.querySelector('main');
  if (!main) return;
  main.prepend(root);
  const $ = selector => root.querySelector(selector);
  const T = () => words[lang];
  const langSelect = $('#hs212-language');
  const countrySelect = $('#hs212-country');
  const timeFmt = n => {
    const day = Math.floor((8 * 60 + 20 + n) / 1440);
    const minute = (8 * 60 + 20 + n) % 1440;
    return String(Math.floor(minute / 60)).padStart(2,'0') + ':' + String(minute % 60).padStart(2,'0') + (day ? ' (+' + day + 'd)' : '');
  };
  const duration = n => {
    const h = Math.floor(n / 60), m = n % 60;
    if (!h) return `${n} ${T().minutes}`;
    return `${h} ${T().hours}${m ? ' ' + m + ' ' + T().minutes : ''}`;
  };
  const setHeader = (element, value, kind) => {
    if (!element || !element.options || !element.options.length) return;
    const option = Array.from(element.options).find(o => kind === 'lang' ? toLang(o.value) === value && (value !== 'en' || /^en/i.test(o.value)) : toRegion(o.value) === value && (value !== 'us' || /^us/i.test(o.value)));
    if (option && element.value !== option.value) { element.value = option.value; element.dispatchEvent(new Event('change', {bubbles:true})); }
  };
  function syncHeader() {
    if (inSync) return;
    inSync = true;
    try { setHeader(hostLanguage,lang,'lang'); setHeader(hostCountry,region,'region'); } finally { inSync = false; }
  }
  function renderText() {
    root.lang=lang; root.dir=lang==='ar' ? 'rtl' : 'ltr';
    root.querySelectorAll('[data-t]').forEach(el => { const k=el.dataset.t; el.textContent=T()[k] || ''; });
    ['normal','slow','fast'].forEach(key => { const b=$(`[data-preset="${key}"]`); b.textContent=T()[key]; b.setAttribute('aria-pressed',active===key?'true':'false'); });
    $('#hs212-top-chip').textContent=T().sample;
    langSelect.value=lang;countrySelect.value=region;
    $('#hs212-store').href=`https://apps.apple.com/${region}/app/id${APP}`;
  }
  function update() {
    const w = Number($('#hs212-wait-value').value);
    const h = Number($('#hs212-load-value').value);
    const valid = [w,h].every(n => Number.isInteger(n) && n >= 0 && n <= 1440) && $('#hs212-wait-value').value.trim() !== '' && $('#hs212-load-value').value.trim() !== '';
    $('#hs212-error').hidden=valid;
    $('#hs212-error').textContent=T().error;
    $('.hs212-ledger').hidden=!valid;
    $('.hs212-total').hidden=!valid;
    if(!valid) return;
    waiting=w;handling=h;
    $('#hs212-wait-range').value=Math.min(w,240);
    $('#hs212-load-range').value=Math.min(h,240);
    $('#hs212-total').textContent=duration(w+h);
    $('#hs212-total-sub').textContent=T().totalPrefix;
    $('#hs212-began').textContent=timeFmt(w);
    $('#hs212-finished').textContent=timeFmt(w+h);
    $('#hs212-wait-label').textContent=duration(w);
    $('#hs212-load-label').textContent=duration(h);
    const total=w+h;
    $('#hs212-waitbar').style.width=(total? 100*w/total:50)+'%';
    $('#hs212-loadbar').style.width=(total? 100*h/total:50)+'%';
    root.querySelector('.hs212-ratio').setAttribute('aria-label',T().waitShare+' '+duration(w)+', '+T().handleShare+' '+duration(h));
    ['normal','slow','fast'].forEach(key => { const b=$(`[data-preset="${key}"]`); b.setAttribute('aria-pressed',active===key?'true':'false'); });
  }
  function preset(key) {
    active=key;
    $('#hs212-wait-value').value=presets[key][0];
    $('#hs212-load-value').value=presets[key][1];
    update();
  }
  for (const key of Object.keys(presets)) $(`[data-preset="${key}"]`).addEventListener('click',()=>preset(key));
  for (const kind of ['wait','load']) {
    const range=$(`#hs212-${kind}-range`), number=$(`#hs212-${kind}-value`);
    range.addEventListener('input',()=>{ number.value=range.value;active='';update(); });
    number.addEventListener('input',()=>{active='';update();});
  }
  $('#hs212-reset').addEventListener('click',()=>preset('normal'));
  langSelect.addEventListener('change',()=>{lang=langSelect.value;renderText();update();syncHeader();});
  countrySelect.addEventListener('change',()=>{region=countrySelect.value;renderText();update();syncHeader();});
  if(hostLanguage) hostLanguage.addEventListener('change',()=>{if(inSync)return;lang=toLang(hostLanguage.value);renderText();update();});
  if(hostCountry) hostCountry.addEventListener('change',()=>{if(inSync)return;region=toRegion(hostCountry.value);renderText();update();});
  renderText();update();syncHeader();
})();
