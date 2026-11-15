/* R229 HaulStamp / two rates, one dock stop / illustrative interactive LP section */
(() => {
  'use strict';
  const APP='6798447816', ID='tsz-haulstamp-r229';
  if ((document.body?.dataset.p199Id || document.body?.dataset.p19AppId)!==APP || document.getElementById(ID)) return;
  const host=document.querySelector('main#p199-content') || document.querySelector('main');
  if (!host) return;
  const i18n={
    en:{eyebrow:'HAULSTAMP / A DOCK STOP, MADE VISIBLE',title:'Two clocks. Two rates. One record.',lead:'Waiting at a dock and handling freight are different parts of the job. Give each one its own time and reference rate.',demo:'INTERACTIVE EXAMPLE',fiction:'Illustrative example · no actual work logged',wait:'DOCK WAIT',handle:'CARGO HANDLING',minutes:'minutes',rate:'Hourly reference rate',perhour:'/ hour',waitamount:'Waiting reference',handleamount:'Handling reference',total:'TOTAL REFERENCE',totalhint:'Based on the minutes and hourly rates you choose',barwait:'Waiting',barhandle:'Handling',preset:'TRY A DOCK SCENARIO',quick:'Quick stop',long:'Long wait',heavy:'Heavy unload',reset:'Reset example',language:'Language',region:'Store region',store:'See HaulStamp on the App Store',note:'This is a fictional reference estimate, not an invoice, amount owed, wage calculation, or legal entitlement. Actual HaulStamp records are separate.',foot:'You cannot recover the details of a stop from memory as reliably as from a record.',units:'USD'},
    ja:{eyebrow:'HAULSTAMP / 消えてしまう時間を見える形に',title:'荷待ちと荷役。時間も単価も別々に。',lead:'ドックで待つ時間と、荷物を扱う時間。どちらも仕事だから、それぞれの時間と参考単価を分けて記録する。',demo:'操作できる参考例',fiction:'架空のWebデモ・記録は保存しません',wait:'荷待ち',handle:'荷役',minutes:'分',rate:'1時間あたりの参考単価',perhour:'/ 時間',waitamount:'荷待ちの参考額',handleamount:'荷役の参考額',total:'参考額の合計',totalhint:'選択した時間と時間単価による計算',barwait:'荷待ち',barhandle:'荷役',preset:'ドック作業の例を選ぶ',quick:'短い停車',long:'長い荷待ち',heavy:'荷役が長い',reset:'例を初期化',language:'言語',region:'ストア地域',store:'App StoreでHaulStampを見る',note:'架空の参考計算です。請求額・未払額・賃金・法的権利を示すものではありません。実際のHaulStampの保存記録とは連動しません。',foot:'後から思い出すより、その場で残した記録を。',units:'USD'},
    ar:{eyebrow:'HAULSTAMP / اجعل وقت التوقف مرئياً',title:'وقتان. معدلان. سجل واحد.',lead:'الانتظار عند الرصيف ومناولة الحمولة مرحلتان مختلفتان من العمل. حدّد مدة ومعدلاً مرجعياً لكل مرحلة.',demo:'مثال تفاعلي',fiction:'عرض توضيحي فقط · لا يتم حفظ سجل عمل',wait:'الانتظار عند الرصيف',handle:'مناولة الحمولة',minutes:'دقيقة',rate:'المعدل المرجعي للساعة',perhour:'/ ساعة',waitamount:'تقدير الانتظار',handleamount:'تقدير المناولة',total:'إجمالي التقدير المرجعي',totalhint:'يُحسب من المدد والمعدلات التي تختارها',barwait:'انتظار',barhandle:'مناولة',preset:'اختر سيناريو للتوقف',quick:'توقف قصير',long:'انتظار طويل',heavy:'تفريغ طويل',reset:'إعادة ضبط المثال',language:'اللغة',region:'منطقة المتجر',store:'عرض HaulStamp في App Store',note:'هذا تقدير توضيحي افتراضي، وليس فاتورة أو مبلغاً مستحقاً أو حساب أجور أو حقاً قانونياً. لا يرتبط بسجلات التطبيق المحفوظة.',foot:'سجل التفاصيل أثناء العمل بدلاً من الاعتماد على الذاكرة.',units:'USD'}
  };
  const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','HaulStamp illustrative two-rate calculator');
  root.innerHTML=`
    <div class="hs229-top"><div class="hs229-dockmark" aria-hidden="true"><i></i><i></i><i></i><i></i></div><span data-t="eyebrow"></span><span class="hs229-live" aria-hidden="true"></span></div>
    <div class="hs229-hero"><div><p class="hs229-kicker" data-t="demo"></p><h2 data-t="title"></h2><p class="hs229-lead" data-t="lead"></p></div><div class="hs229-emblem" aria-hidden="true"><span>01</span><div class="hs229-emblem-track"><b></b><b></b></div><span>02</span></div></div>
    <div class="hs229-dock"><div class="hs229-dockhead"><span class="hs229-dot"></span><span data-t="fiction"></span><span class="hs229-stamp" aria-hidden="true">DOCK / LOG</span></div>
      <div class="hs229-fields"><div class="hs229-field hs229-wait"><div class="hs229-fieldtop"><span class="hs229-fieldtitle"><span class="hs229-fieldicon" aria-hidden="true">◷</span><span data-t="wait"></span></span><strong><output id="hs229-wait-value">90</output><small data-t="minutes"></small></strong></div><input id="hs229-wait" type="range" min="0" max="240" step="5" value="90" aria-label="Waiting time in minutes"><div class="hs229-rangeends"><span>0</span><span>240</span></div><label class="hs229-rate"><span data-t="rate"></span><span class="hs229-rate-control"><b>$</b><input id="hs229-wrate" type="number" min="0" max="250" step="5" value="45" aria-label="Waiting hourly reference rate in USD"><small data-t="perhour"></small></span></label></div>
      <div class="hs229-field hs229-handle"><div class="hs229-fieldtop"><span class="hs229-fieldtitle"><span class="hs229-fieldicon" aria-hidden="true">▤</span><span data-t="handle"></span></span><strong><output id="hs229-handle-value">45</output><small data-t="minutes"></small></strong></div><input id="hs229-handle" type="range" min="0" max="240" step="5" value="45" aria-label="Handling time in minutes"><div class="hs229-rangeends"><span>0</span><span>240</span></div><label class="hs229-rate"><span data-t="rate"></span><span class="hs229-rate-control"><b>$</b><input id="hs229-hrate" type="number" min="0" max="250" step="5" value="65" aria-label="Handling hourly reference rate in USD"><small data-t="perhour"></small></span></label></div></div>
      <div class="hs229-chart"><div class="hs229-charthead"><span data-t="barwait"></span><span id="hs229-share">135 min</span><span data-t="barhandle"></span></div><div class="hs229-bars" role="img" aria-label="Proportional waiting and handling minutes"><div id="hs229-wbar"></div><div id="hs229-hbar"></div></div></div>
      <div class="hs229-results"><div class="hs229-line"><span data-t="waitamount"></span><strong id="hs229-wamount">$67.50</strong></div><div class="hs229-line"><span data-t="handleamount"></span><strong id="hs229-hamount">$48.75</strong></div><div class="hs229-grand"><span><small data-t="total"></small><em data-t="totalhint"></em></span><strong id="hs229-total" aria-live="polite">$116.25</strong></div></div></div>
    <div class="hs229-tools"><div class="hs229-choices"><p data-t="preset"></p><div class="hs229-btnrow"><button type="button" data-scenario="quick" data-t="quick"></button><button type="button" data-scenario="long" data-t="long"></button><button type="button" data-scenario="heavy" data-t="heavy"></button></div></div><button id="hs229-reset" type="button" data-t="reset"></button></div>
    <div class="hs229-bottom"><p data-t="foot"></p><div class="hs229-local"><label><span data-t="language"></span><select id="hs229-language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="hs229-country"><option value="us">US</option><option value="jp">JP</option></select></label><a id="hs229-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/haulstamp/id6798447816" data-t="store"></a></div><small data-t="note"></small></div>`;
  host.insertAdjacentElement('afterbegin',root);
  const el=id=>root.querySelector('#'+id);
  const hostLanguage=document.querySelector('#p199-language'),hostCountry=document.querySelector('#p199-country');
  const nlang=v=>v==='ja'||v==='ar'?v:'en',ncountry=v=>v==='jp'?'jp':'us';
  let lang=nlang(hostLanguage?.value||String(document.documentElement.lang||'en').slice(0,2)),country=ncountry(hostCountry?.value),syncing=false;
  const read=(id,lo,hi)=>{const raw=Number(el(id).value);return Number.isFinite(raw)?Math.max(lo,Math.min(hi,raw)):0};
  const dollars=v=>'$'+(Math.round((v+Number.EPSILON)*100)/100).toFixed(2);
  const syncHost=(select,v)=>{if(!select||select.value===v||!Array.from(select.options).some(o=>o.value===v))return;syncing=true;select.value=v;select.dispatchEvent(new Event('change',{bubbles:true}));syncing=false;};
  function render(){
    const w=read('hs229-wait',0,240),h=read('hs229-handle',0,240),wr=read('hs229-wrate',0,250),hr=read('hs229-hrate',0,250);
    el('hs229-wait-value').textContent=w;el('hs229-handle-value').textContent=h;
    const a=w*wr/60,b=h*hr/60;el('hs229-wamount').textContent=dollars(a);el('hs229-hamount').textContent=dollars(b);el('hs229-total').textContent=dollars(a+b);
    el('hs229-share').textContent=(w+h)+' min';
    const tot=w+h,share=tot>0?w/tot*100:50;
    el('hs229-wbar').style.width=share+'%';el('hs229-hbar').style.width=(100-share)+'%';
    root.querySelector('.hs229-bars').setAttribute('aria-label', `${i18n[lang].wait}: ${w} min; ${i18n[lang].handle}: ${h} min`);
    root.querySelectorAll('[data-scenario]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scenario===root.dataset.scenario)));
  }
  function locale(){const d=i18n[lang];root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';root.querySelectorAll('[data-t]').forEach(n=>{n.textContent=d[n.dataset.t]||n.dataset.t;});el('hs229-language').value=lang;el('hs229-country').value=country;el('hs229-store').href=`https://apps.apple.com/${country}/app/haulstamp/id6798447816`;render();}
  ['hs229-wait','hs229-handle','hs229-wrate','hs229-hrate'].forEach(id=>{el(id).addEventListener('input',()=>{root.dataset.scenario='';render();});el(id).addEventListener('change',()=>{const inp=el(id);inp.value=String(read(id,0,id.endsWith('rate')?250:240));render();});});
  const scenarios={quick:[15,25,45,65],long:[165,35,45,65],heavy:[35,150,45,65]};
  function values(a,key){['hs229-wait','hs229-handle','hs229-wrate','hs229-hrate'].forEach((id,i)=>{el(id).value=a[i];});root.dataset.scenario=key;render();}
  root.querySelectorAll('[data-scenario]').forEach(b=>b.addEventListener('click',()=>values(scenarios[b.dataset.scenario],b.dataset.scenario)));
  el('hs229-reset').addEventListener('click',()=>values([90,45,45,65],''));
  el('hs229-language').addEventListener('change',()=>{lang=nlang(el('hs229-language').value);syncHost(hostLanguage,lang);locale();});
  el('hs229-country').addEventListener('change',()=>{country=ncountry(el('hs229-country').value);syncHost(hostCountry,country);locale();});
  hostLanguage?.addEventListener('change',()=>{if(syncing)return;lang=nlang(hostLanguage.value);locale();});
  hostCountry?.addEventListener('change',()=>{if(syncing)return;country=ncountry(hostCountry.value);locale();});
  locale();
})();
