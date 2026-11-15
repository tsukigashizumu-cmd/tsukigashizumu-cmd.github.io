/* R216 IkmahLog: illustrative odometer service-window check. No tracking, storage, remote calls or automatic vehicle readings. */
(() => {
  'use strict';
  const APP='6808427228', ID='tsz-ikmah-r216';
  const b=document.body;
  if(!b || (b.dataset.p199Id || b.dataset.p19AppId)!==APP || document.getElementById(ID)) return;
  const main=document.querySelector('main'); if(!main) return;
  const i18n={
    en:{
      kicker:'IKMAHLOG / THE ROAD AHEAD', headline:'Will your next drive pass your service point?',
      desc:'Your next service may look far away—until you include the distance you are about to drive. Compare before and after.',
      label:'CHOOSE A DRIVE', normal:'Short run', crossing:'Long road trip', overdue:'Already overdue', edit:'YOUR THREE NUMBERS',
      current:'Odometer now', due:'Next service at', planned:'Planned driving', noteUnit:'Example in kilometers · manual inputs',
      before:'BEFORE THE DRIVE', after:'AFTER THE DRIVE', remain:'Until next service', projected:'Projected odometer',
      result:'WHAT THE PLAN REVEALS', safe:'Service point stays ahead', cross:'Trip goes past the service point', late:'Service point already passed',
      safeDesc:'The planned drive ends before the service point.',crossDesc:'The drive reaches the service point before you finish.',lateDesc:'The current odometer is already at or beyond the service point.',
      milesLeft:'remaining', milesBeyond:'past the point', now:'right at the point',
      invalid:'Enter whole non-negative numbers up to 9,999,999. The service point must be greater than zero.',
      reset:'Reset example', language:'Language',region:'App Store region',cta:'Explore IkmahLog on the App Store',
      fine:'Illustrative website calculation only. Readings and trip length are entered manually; no GPS, live vehicle data, reminders, service advice, or automatic updates. Check your vehicle maker’s maintenance schedule.',
      footer:'A service date is easier to plan when the whole trip is visible.', unit:'km'
    },
    ja:{
      kicker:'IKMAHLOG / 次の走行を見通す',headline:'次のドライブで、整備の目安を越える？',
      desc:'整備までまだ距離があっても、次に走る分を足すと状況は変わります。出発前と走行後を比べてみましょう。',
      label:'走行例を選ぶ',normal:'近距離',crossing:'長距離ドライブ',overdue:'すでに超過',edit:'入力する3つの数値',
      current:'現在の走行距離',due:'次回整備の目安',planned:'これから走る距離',noteUnit:'単位：km · 手入力の例',
      before:'出発前',after:'予定の走行後',remain:'整備の目安まで',projected:'走行後の距離',
      result:'この予定で分かること',safe:'整備の目安より手前',cross:'走行中に整備の目安を越える',late:'整備の目安をすでに超過',
      safeDesc:'予定の走行を終えても、整備の目安より手前です。',crossDesc:'予定の走行を終える前に、整備の目安に達します。',lateDesc:'出発時点ですでに整備の目安に到達しています。',
      milesLeft:'残り',milesBeyond:'超過',now:'目安に到達',
      invalid:'0以上9,999,999以下の整数を入力してください。整備の目安は1以上にしてください。',
      reset:'例を初期化',language:'言語',region:'App Store地域',cta:'App StoreでIkmahLogを見る',
      fine:'Web上の説明用計算です。走行距離と予定距離は手入力で、GPS・車両情報の自動取得・リマインダー・整備判断・自動更新は行いません。実際の整備は車両メーカーの推奨に従ってください。',
      footer:'出発前に、次の走行距離まで見ておこう。',unit:'km'
    },
    ar:{
      kicker:'IKMAHLOG / الطريق القادم',headline:'هل تتجاوز رحلتك موعد الصيانة بالكيلومترات؟',
      desc:'قد تبدو الصيانة بعيدة، لكن إضافة مسافة رحلتك القادمة توضح الصورة. قارن قبل القيادة وبعدها.',
      label:'اختر رحلة',normal:'مشوار قصير',crossing:'رحلة طويلة',overdue:'تجاوز الموعد',edit:'الأرقام الثلاثة',
      current:'عداد المسافة الآن',due:'الصيانة عند',planned:'مسافة الرحلة المخططة',noteUnit:'مثال بالكيلومترات · إدخال يدوي',
      before:'قبل الرحلة',after:'بعد الرحلة المتوقعة',remain:'المتبقي للصيانة',projected:'قراءة العداد المتوقعة',
      result:'ماذا تكشف الخطة؟',safe:'موعد الصيانة ما زال أمامك',cross:'الرحلة تتجاوز نقطة الصيانة',late:'تم تجاوز نقطة الصيانة بالفعل',
      safeDesc:'تنتهي الرحلة قبل الوصول إلى نقطة الصيانة.',crossDesc:'ستصل إلى نقطة الصيانة قبل نهاية الرحلة.',lateDesc:'وصل العداد بالفعل إلى نقطة الصيانة أو تجاوزها.',
      milesLeft:'متبقي',milesBeyond:'بعد نقطة الصيانة',now:'عند نقطة الصيانة',
      invalid:'أدخل أعدادًا صحيحة من 0 إلى 9,999,999. يجب أن تكون نقطة الصيانة أكبر من صفر.',
      reset:'إعادة المثال',language:'اللغة',region:'منطقة App Store',cta:'شاهد IkmahLog على App Store',
      fine:'حساب توضيحي على هذا الموقع فقط. تُدخل القراءات والمسافة يدويًا؛ لا GPS أو بيانات مركبة مباشرة أو تذكيرات أو نصائح صيانة أو تحديثات تلقائية. اتبع جدول الصيانة من الشركة المصنعة.',
      footer:'اعرف كامل مسار الرحلة قبل الانطلاق.',unit:'كم'
    }
  };
  const scenarios={normal:{current:47250,due:50000,planned:250},crossing:{current:47250,due:50000,planned:3000},overdue:{current:50250,due:50000,planned:800}};
  const getLang=v=>/^ar(?:$|[-_])/i.test(v||'')?'ar':/^ja(?:$|[-_])/i.test(v||'')?'ja':'en';
  const getRegion=v=>/^(jp|japan|ja-jp)$/i.test(v||'')?'jp':'us';
  const initialLang=document.querySelector('#p199-language,#p19-language,#ikmahlog-language,#ik37-language');
  const initialRegion=document.querySelector('#p199-country,#p19-country,#ikmahlog-country,#ik37-country');
  let lang=initialLang&&initialLang.value?getLang(initialLang.value):'en';
  let region=initialRegion&&initialRegion.value?getRegion(initialRegion.value):'us';
  let active='crossing',syncing=false;
  const section=document.createElement('section');section.id=ID;section.setAttribute('aria-label','IkmahLog planned trip and service comparison');
  section.innerHTML=`<div class="ik216-shell">
    <header class="ik216-head"><span class="ik216-brand"><b class="ik216-brandmark" aria-hidden="true">↗</b> IKMAHLOG <em>/ R216</em></span><span class="ik216-km">DISTANCE / SERVICE</span></header>
    <div class="ik216-hero"><p class="ik216-eyebrow" data-t="kicker"></p><h2 data-t="headline"></h2><p data-t="desc"></p></div>
    <div class="ik216-grid">
      <div class="ik216-control"><div class="ik216-step"><i>01</i><span data-t="label"></span></div><div class="ik216-presets"><button type="button" data-scenario="normal" data-t="normal"></button><button type="button" data-scenario="crossing" data-t="crossing"></button><button type="button" data-scenario="overdue" data-t="overdue"></button></div>
      <div class="ik216-step ik216-step2"><i>02</i><span data-t="edit"></span></div><p class="ik216-hint" data-t="noteUnit"></p>
      <div class="ik216-fields"><label><span data-t="current"></span><div class="ik216-field"><input id="ik216-current" type="number" min="0" max="9999999" step="1" inputmode="numeric" value="47250"/><small data-unit>km</small></div></label><label><span data-t="due"></span><div class="ik216-field"><input id="ik216-due" type="number" min="1" max="9999999" step="1" inputmode="numeric" value="50000"/><small data-unit>km</small></div></label><label><span data-t="planned"></span><div class="ik216-field"><input id="ik216-planned" type="number" min="0" max="9999999" step="1" inputmode="numeric" value="3000"/><small data-unit>km</small></div></label></div>
      <p id="ik216-error" class="ik216-error" role="alert" data-t="invalid" hidden></p><button class="ik216-reset" id="ik216-reset" type="button">↺ <span data-t="reset"></span></button></div>
      <div class="ik216-results" aria-live="polite"><div class="ik216-step"><i>03</i><span data-t="result"></span></div>
        <div class="ik216-panels"><div class="ik216-panel"><small data-t="before"></small><strong id="ik216-before-value">2,750</strong><span data-t="remain"></span></div><div class="ik216-panel ik216-panel-after"><small data-t="after"></small><strong id="ik216-after-value">50,250</strong><span data-t="projected"></span></div></div>
        <div class="ik216-track"><div class="ik216-trackline"><div id="ik216-track-progress"></div><span id="ik216-track-flag" aria-hidden="true">◆</span></div><div class="ik216-track-ends"><span id="ik216-start-label">47,250 km</span><span id="ik216-end-label">50,000 km</span></div></div>
        <div class="ik216-verdict" id="ik216-verdict" data-state="cross"><span class="ik216-indicator" aria-hidden="true">●</span><div><strong id="ik216-verdict-title"></strong><p id="ik216-verdict-desc"></p></div><b id="ik216-verdict-diff"></b></div>
      </div>
    </div>
    <div class="ik216-foot"><p class="ik216-takeaway" data-t="footer"></p><p class="ik216-disclaimer" data-t="fine"></p><div class="ik216-footerline"><div class="ik216-choices"><label><span data-t="language"></span><select id="ik216-lang"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="ik216-region"><option value="us">US</option><option value="jp">JP</option></select></label></div><a id="ik216-store" target="_blank" rel="noopener noreferrer"><span data-t="cta"></span> <span aria-hidden="true">↗</span></a></div></div>
  </div>`;
  main.prepend(section);
  const $=s=>section.querySelector(s), units=()=> 'km';
  const shown=n=>new Intl.NumberFormat(lang==='ar'?'ar':lang==='ja'?'ja-JP':'en-US',{maximumFractionDigits:0}).format(n);
  // Kilometers are displayed for every language. Switching language must never silently reinterpret or convert odometer readings.
  function value(key){const raw=$('#ik216-'+key).value.trim();if(!/^\d{1,7}$/.test(raw))return null;const n=Number(raw);return Number.isSafeInteger(n)&&n<=9999999?n:null;}
  function render(){
    const t=i18n[lang];section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';
    section.querySelectorAll('[data-t]').forEach(el=>el.textContent=t[el.dataset.t]||'');
    section.querySelectorAll('[data-unit]').forEach(el=>el.textContent=units());
    $('#ik216-lang').value=lang;$('#ik216-region').value=region;
    $('#ik216-store').href=`https://apps.apple.com/${region}/app/ikmahlog/id${APP}`;
    section.querySelectorAll('[data-scenario]').forEach(el=>el.setAttribute('aria-pressed',String(active===el.dataset.scenario)));
    const cur=value('current'),due=value('due'),trip=value('planned');const valid=cur!==null&&due!==null&&due>0&&trip!==null&&cur+trip<=9999999;
    $('#ik216-error').hidden=valid;$('.ik216-results').classList.toggle('ik216-invalid',!valid);
    if(!valid){$('#ik216-before-value').textContent='—';$('#ik216-after-value').textContent='—';$('#ik216-verdict-title').textContent='—';$('#ik216-verdict-desc').textContent='';$('#ik216-verdict-diff').textContent='';return;}
    const after=cur+trip,remaining=due-cur,post=due-after,state=remaining<=0?'late':post<=0?'cross':'safe';
    $('#ik216-before-value').textContent=(remaining>=0?shown(remaining):'−'+shown(-remaining))+' '+units();
    $('#ik216-after-value').textContent=shown(after)+' '+units();
    $('#ik216-start-label').textContent=shown(cur)+' '+units();$('#ik216-end-label').textContent=shown(due)+' '+units();
    $('#ik216-verdict').dataset.state=state;
    $('#ik216-verdict-title').textContent=t[state];
    $('#ik216-verdict-desc').textContent=t[state+'Desc'];
    $('#ik216-verdict-diff').textContent=(post>0?'':post===0?t.now:'+'+shown(-post)+' '+units()+' '+t.milesBeyond);
    if(post>0)$('#ik216-verdict-diff').textContent=shown(post)+' '+units()+' '+t.milesLeft;
    const span=Math.max(1,due-cur,trip);const progress=Math.max(0,Math.min(100,100*trip/span));
    $('#ik216-track-progress').style.width=progress+'%';$('#ik216-track-flag').style.insetInlineStart=Math.max(0,Math.min(98,100*(due-cur)/span))+'%';
  }
  function preset(key){active=key;for(const [k,v] of Object.entries(scenarios[key]))$('#ik216-'+k).value=String(v);render();}
  section.querySelectorAll('[data-scenario]').forEach(el=>el.addEventListener('click',()=>preset(el.dataset.scenario)));
  ['current','due','planned'].forEach(k=>$('#ik216-'+k).addEventListener('input',()=>{active='';render();}));
  $('#ik216-reset').addEventListener('click',()=>preset('crossing'));
  const hostSel={lang:['#p199-language','#p19-language','#ikmahlog-language','#ik37-language','header select[id*="language"]'],region:['#p199-country','#p19-country','#ikmahlog-country','#ik37-country','header select[id*="country"]','header select[id*="region"]']};
  function host(k){for(const s of hostSel[k]){const el=document.querySelector(s);if(el&&!section.contains(el))return el;}return null;}
  function syncHost(k,v){const el=host(k);if(!el||!el.options||!el.options.length)return;const norm=k==='lang'?getLang:getRegion;
    const opt=Array.from(el.options).find(o=>norm(o.value)===v&&(v!=='en'||/^en/i.test(o.value))&&(v!=='us'||/^us/i.test(o.value)));
    if(opt&&el.value!==opt.value){el.value=opt.value;el.dispatchEvent(new Event('change',{bubbles:true}));}}
  function sync(){if(syncing)return;syncing=true;try{syncHost('lang',lang);syncHost('region',region);}finally{syncing=false;}}
  $('#ik216-lang').addEventListener('change',e=>{lang=getLang(e.target.value);render();sync();});
  $('#ik216-region').addEventListener('change',e=>{region=getRegion(e.target.value);render();sync();});
  document.addEventListener('change',event=>{if(syncing||section.contains(event.target))return;if(event.target===host('lang')){lang=getLang(event.target.value);render();}if(event.target===host('region')){region=getRegion(event.target.value);render();}});
  render();
})();
