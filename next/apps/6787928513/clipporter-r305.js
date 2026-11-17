/* R305 — App Preview range planner. Does not read, process, or upload media. */
(()=>{'use strict';
 const APP='6787928513', ID='tsz-r305';
 const words={
 en:{kicker:'CLIPPORTER / APP PREVIEW PLANNER',title:'One second short. One upload blocked.',lead:'Your recording is 14 seconds. The preview needs 15–30 seconds. See what a trim or a final-frame hold could change.',short:'14s · short',long:'37s · long',ready:'22s · ready',length:'Recording (seconds)',start:'Trim start',end:'Trim end',selected:'Selected duration',seconds:'seconds',readyState:'Ready-range example',shortState:'Extend final frame',longState:'Shorten the range',invalid:'Check your time range',readyDetail:'Your selected range already fits 15–30 seconds.',shortDetail:(n)=>`Hold the last frame for ${fmt(n)} seconds to reach 15. No video is exported here.`,longDetail:(n)=>`Shorten the selected range by ${fmt(n)} seconds to reach 30. No video is exported here.`,invalidDetail:'Enter a valid recording duration (1–600), a start at or after 0, and an end after start and within the recording.',noHold:'The selected range is too short to extend using a hold of up to 15 seconds.',source:'Selected',result:'Planned length',reset:'Reset',store:'View on the Mac App Store',note:'This is a planning demo, not a video converter. It does not inspect or export files. Any real App Store acceptance depends on Apple’s current rules.',
 },
 ja:{kicker:'CLIPPORTER / プレビュー時間チェック',title:'14秒しかない。それだけで登録が止まる。',lead:'App Previewの動画は15〜30秒が目安。短い動画を延ばすか、長い動画を切るか。ここで考えられます。',short:'14秒・短い',long:'37秒・長い',ready:'22秒・範囲内',length:'録画全体（秒）',start:'開始位置',end:'終了位置',selected:'選択した長さ',seconds:'秒',readyState:'時間条件の範囲内',shortState:'末尾の静止で延長',longState:'範囲を短くする',invalid:'時間設定を確認',readyDetail:'この範囲は15〜30秒に収まっています。',shortDetail:(n)=>`最後のフレームを${fmt(n)}秒保持すると15秒になります。ここでは動画を書き出しません。`,longDetail:(n)=>`選択範囲を${fmt(n)}秒短くすると30秒になります。ここでは動画を書き出しません。`,invalidDetail:'録画は1〜600秒、開始は0以上、終了は開始より後で録画時間以内にしてください。',noHold:'この短さは、末尾を最大15秒保持するだけでは15秒にできません。',source:'選択範囲',result:'調整後の目安',reset:'初期化',store:'Mac App Storeで見る',note:'LP専用の計画用デモです。動画の読み込み・変換・書き出しは行いません。実際の審査条件はAppleの最新要件を確認してください。',
 },
 ar:{kicker:'CLIPPORTER / فحص مدة المعاينة',title:'ثانية واحدة ناقصة. خطوة إضافية قبل الرفع.',lead:'خطط لمدة معاينة التطبيق بين 15 و30 ثانية. شاهد أثر القص أو تثبيت الإطار الأخير، دون معالجة ملف فيديو.',short:'١٤ ثانية · قصير',long:'٣٧ ثانية · طويل',ready:'٢٢ ثانية · مناسب',length:'مدة التسجيل (ثانية)',start:'بداية المقطع',end:'نهاية المقطع',selected:'المدة المختارة',seconds:'ثانية',readyState:'ضمن المدة المقترحة',shortState:'تمديد الإطار الأخير',longState:'تقليل المدة',invalid:'راجع نطاق الوقت',readyDetail:'المدة المختارة تقع بين 15 و30 ثانية.',shortDetail:(n)=>`يمكن تثبيت الإطار الأخير لمدة ${fmt(n)} ثانية للوصول إلى 15 ثانية. لا يتم تصدير الفيديو هنا.`,longDetail:(n)=>`اختصر النطاق بمقدار ${fmt(n)} ثانية للوصول إلى 30 ثانية. لا يتم تصدير الفيديو هنا.`,invalidDetail:'أدخل مدة بين 1 و600 ثانية، وبداية غير سالبة، ونهاية أكبر من البداية ولا تتجاوز مدة التسجيل.',noHold:'المدة قصيرة جدًا، ولا يكفي تثبيت الإطار الأخير لمدة لا تزيد عن 15 ثانية.',source:'المدة المختارة',result:'المدة المقترحة',reset:'إعادة ضبط',store:'العرض في Mac App Store',note:'هذه تجربة تخطيط فقط: لا تقرأ ملفات الفيديو ولا تحوّلها أو تصدّرها. ارجع إلى أحدث شروط Apple للإرسال.',
 }};
 function fmt(n){return Number.isInteger(n)?String(n):n.toFixed(1)}
 const source=[14,37,22];const presets=[[14,0,14],[37,0,37],[22,0,22]];
 function detect(){const x=(document.documentElement.lang||'en').toLowerCase();return x.startsWith('ja')?'ja':x.startsWith('ar')?'ar':'en'}
 function mount(){if(document.getElementById(ID))return;
  const node=document.createElement('section');node.id=ID;node.setAttribute('aria-label','ClipPorter App Preview duration planning demo');
  const host=document.querySelector('main')||document.querySelector('article')||document.querySelector('.p19-shell')||document.body;
  host.append(node);
  let locale=detect(),current=0,mode='US';let vals=[14,0,14];
  function label(){return words[locale]||words.en}
  function storeUrl(){return `https://apps.apple.com/${mode.toLowerCase()}/app/clipporter/id6787928513?mt=12`}
  function render(){const t=label();node.dir=locale==='ar'?'rtl':'ltr';node.lang=locale;
   node.innerHTML=`<div class="r305-kicker"></div><h2></h2><p class="r305-lede"></p>
   <div class="r305-toolbar"><div class="r305-chips"><button class="r305-preset" type="button" data-preset="0"></button><button class="r305-preset" type="button" data-preset="1"></button><button class="r305-preset" type="button" data-preset="2"></button></div><div class="r305-chips"><select class="r305-lang" aria-label="Language"><option value="en">EN</option><option value="ja">日本語</option><option value="ar">العربية</option></select><select class="r305-lang r305-country" aria-label="App Store"><option value="US">US</option><option value="JP">JP</option></select></div></div>
   <div class="r305-layout"><div class="r305-fields"><span class="r305-sectionlabel" data-word="selected"></span><div class="r305-inputgrid"><label><span data-word="length"></span><input data-input="0" type="number" inputmode="decimal" min="1" max="600" step="0.1"/></label><label><span data-word="start"></span><input data-input="1" type="number" inputmode="decimal" min="0" step="0.1"/></label><label><span data-word="end"></span><input data-input="2" type="number" inputmode="decimal" min="0.1" step="0.1"/></label></div><div class="r305-line" aria-hidden="true"><div class="r305-linefill"></div></div><div class="r305-lineline"><span data-word="source"></span><span class="r305-selected-number" aria-live="polite"></span></div></div>
   <div class="r305-result"><span class="r305-sectionlabel" data-word="result"></span><div class="r305-big"><strong class="r305-num" aria-live="polite"></strong><span class="r305-unit" data-word="seconds"></span></div><div class="r305-state" role="status"></div><p class="r305-detail" aria-live="polite"></p><div class="r305-actions"><button type="button" class="r305-reset"></button><a class="r305-store" target="_blank" rel="noopener noreferrer"></a></div></div></div><p class="r305-footnote"></p>`;
   node.querySelector('.r305-kicker').textContent=t.kicker;node.querySelector('h2').textContent=t.title;node.querySelector('.r305-lede').textContent=t.lead;
   for(let key of ['length','start','end','selected','source','result','seconds'])node.querySelector(`[data-word="${key}"]`).textContent=t[key];
   node.querySelectorAll('[data-preset]').forEach((b,i)=>{b.textContent=[t.short,t.long,t.ready][i];b.setAttribute('aria-pressed',i===current?'true':'false');b.addEventListener('click',()=>{current=i;vals=presets[i].slice();render()})});
   const langs=node.querySelector('.r305-lang');langs.value=locale;langs.addEventListener('change',()=>{locale=langs.value;render()});
   const country=node.querySelector('.r305-country');country.value=mode;country.addEventListener('change',()=>{mode=country.value;node.querySelector('.r305-store').href=storeUrl()});
   node.querySelectorAll('[data-input]').forEach((input,i)=>{input.value=vals[i];input.addEventListener('input',()=>{vals[i]=input.value;refresh()})});
   node.querySelector('.r305-reset').textContent=t.reset;node.querySelector('.r305-reset').addEventListener('click',()=>{current=0;vals=presets[0].slice();render()});
   node.querySelector('.r305-store').textContent=t.store;node.querySelector('.r305-store').href=storeUrl();node.querySelector('.r305-footnote').textContent=t.note;
   refresh();
  }
  function refresh(){const t=label();const [len,begin,end]=vals.map(v=>Number(v));const valid=vals.every(v=>String(v).trim()!=='')&&[len,begin,end].every(Number.isFinite)&&len>=1&&len<=600&&begin>=0&&begin<end&&end<=len;
   const selected=end-begin;
   const output=node.querySelector('.r305-num'),stat=node.querySelector('.r305-state'),detail=node.querySelector('.r305-detail');const text=node.querySelector('.r305-selected-number');const fill=node.querySelector('.r305-linefill');
   node.querySelectorAll('[data-input]').forEach((x,i)=>x.setAttribute('aria-invalid',String(!valid)));
   if(!valid){output.textContent='—';stat.textContent=t.invalid;stat.className='r305-state error';detail.textContent=t.invalidDetail;text.textContent='—';fill.style.width='0%';return}
   const safe=Math.max(0,selected);text.textContent=fmt(safe)+' '+t.seconds;fill.style.width=Math.min(100,Math.max(0,safe/len*100))+'%';
   if(safe<15){if(15-safe>15){output.textContent='—';stat.textContent=t.invalid;stat.className='r305-state error';detail.textContent=t.noHold;return}output.textContent='15';stat.textContent=t.shortState;stat.className='r305-state warn';detail.textContent=t.shortDetail(15-safe)}
   else if(safe>30){output.textContent='30';stat.textContent=t.longState;stat.className='r305-state warn';detail.textContent=t.longDetail(safe-30)}
   else{output.textContent=fmt(safe);stat.textContent=t.readyState;stat.className='r305-state';detail.textContent=t.readyDetail}
  }
  render();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
