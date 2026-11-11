/* ClipPorter R143: website-only App Preview duration calculator; no video, upload, storage or encoding. */
(()=>{
'use strict';
const ID='tsz-clipporter-r143';if(document.getElementById(ID))return;
const params=new URLSearchParams(location.search);
const selector=document.getElementById('p199-language');
function locale(value){const v=String(value||'en').toLowerCase();return v.startsWith('ar')?'ar':v.startsWith('ja')?'ja':'en';}
let lang=locale(params.get('lang')||(selector&&selector.value)||document.documentElement.lang||navigator.language);
const t={
 ja:{k:'CLIPPORTER · APP PREVIEW',title:'短くても、長くても。15〜30秒に整える。',lead:'短い動画は最後のフレームを保ち、長い動画はトリミング。尺を変えて完成時間を先に確認できます。',sub:'Mac用アプリの機能を題材にしたLP専用シミュレーション',source:'元の動画',target:'目標 15〜30秒',result:'出力の長さ',ready:'そのままの長さでOK',hold:'最後のフレームを延長',trim:'30秒にトリミング',invalid:'範囲を確認してください',holdcopy:'選択した映像の末尾を {n}秒間保持する想定です。',trimcopy:'選択した映像の末尾 {n}秒を省いて30秒に整える想定です。',readycopy:'映像は15〜30秒の範囲に収まっています。',base:'選択した映像',extension:'静止フレーム',removed:'取り除く部分',choose:'例から試す',short:'8秒の短い動画',normal:'22秒の動画',long:'44秒の長い動画',duration:'素材の長さ（秒）',start:'開始（秒）',end:'終了（秒）',size:'出力画面の例',sizes:['iPhone縦','iPad横','カスタム'],reset:'サンプルを最初に戻す',error:'終了は開始より後、素材の長さ以内にしてください（素材1〜600秒）。',footer:'LP上の数値計算のみ。動画ファイルの読み込み・エンコード・書き出し・アップロードはしません。実際の書き出しはMacアプリで行ってください。',seconds:'秒'},
 en:{k:'CLIPPORTER · APP PREVIEW',title:'Too short or too long? Make it 15–30 seconds.',lead:'Hold the last frame of a short clip or trim a long one. Change the timing and preview the output length.',sub:'Website-only simulation of the Mac app’s features',source:'Original clip',target:'Target 15–30 sec',result:'Preview output',ready:'Already in range',hold:'Hold the final frame',trim:'Trim to 30 seconds',invalid:'Check the selected range',holdcopy:'The last frame would be held for {n} seconds.',trimcopy:'The final {n} seconds would be trimmed to make a 30-second preview.',readycopy:'The selected clip already fits the 15–30 second range.',base:'Selected footage',extension:'Held frame',removed:'Excluded part',choose:'Try a sample',short:'Short · 8 sec',normal:'Ready · 22 sec',long:'Long · 44 sec',duration:'Recording length (sec)',start:'Trim start (sec)',end:'Trim end (sec)',size:'Output format example',sizes:['iPhone portrait','iPad landscape','Custom'],reset:'Reset website sample',error:'End must be after start and within a 1–600-second recording.',footer:'This is only an on-page duration simulation. No actual video is imported, encoded, exported, saved, or uploaded. Use the Mac app to process a recording.',seconds:'sec'},
 ar:{k:'كليب بورتر · معاينة التطبيق',title:'قصير جدًا أم طويل جدًا؟ اجعله بين 15 و30 ثانية.',lead:'يمكن تمديد آخر إطار من المقطع القصير أو قصّ المقطع الطويل. غيّر المدة وشاهد طول الناتج.',sub:'محاكاة توضيحية على صفحة الويب لميزات تطبيق Mac',source:'المقطع الأصلي',target:'المدة المطلوبة: 15–30 ثانية',result:'طول الناتج المتوقع',ready:'المدة مناسبة بالفعل',hold:'تمديد الإطار الأخير',trim:'قصّ المقطع إلى 30 ثانية',invalid:'تحقق من نطاق الاختيار',holdcopy:'سيُعرض الإطار الأخير لمدة {n} ثانية إضافية.',trimcopy:'سيُحذف آخر {n} ثانية ليصبح المقطع 30 ثانية.',readycopy:'المدة المختارة تقع بالفعل ضمن 15–30 ثانية.',base:'الجزء المحدد',extension:'الإطار المثبّت',removed:'الجزء المستبعد',choose:'جرّب مثالًا',short:'قصير · 8 ثوانٍ',normal:'مناسب · 22 ثانية',long:'طويل · 44 ثانية',duration:'طول التسجيل (ثانية)',start:'بداية القص (ثانية)',end:'نهاية القص (ثانية)',size:'مثال على حجم الإخراج',sizes:['iPhone عمودي','iPad أفقي','مخصص'],reset:'إعادة ضبط المثال',error:'يجب أن تكون النهاية بعد البداية وضمن تسجيل من 1 إلى 600 ثانية.',footer:'هذه محاكاة لحساب المدة فقط. لا يتم استيراد فيديو أو ترميزه أو تصديره أو حفظه أو رفعه. استخدم تطبيق Mac لمعالجة التسجيل.',seconds:'ثانية'}
};
let state={duration:8,start:0,end:8,format:0,preset:8};
const section=document.createElement('section');section.id=ID;section.setAttribute('aria-labelledby','cp143-title');
const mount=document.querySelector('#p199-content .p199-body')||document.querySelector('#p199-content')||document.querySelector('main')||document.body;
mount.appendChild(section);
function calc(){const d=state.duration,s=state.start,e=state.end;
 if(![d,s,e].every(Number.isFinite)||d<1||d>600||s<0||e>d||e<=s)return {error:true};
 const chosen=e-s,hold=chosen<15?15-chosen:0,trim=chosen>30?chosen-30:0,out=chosen+hold-trim;
 return {error:false,chosen,hold,trim,out,mode:hold?'hold':trim?'trim':'ready'};
}
function fixed(n){return (Math.round(n*10)/10).toLocaleString('en-US',{maximumFractionDigits:1});}
function pct(n,base){return Math.max(0,Math.min(100,n/base*100));}
function textWithN(raw,n){return raw.replace('{n}',fixed(n));}
function render(){const w=t[lang],c=calc();section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';
 const status=c.error?w.invalid:w[c.mode];
 const desc=c.error?w.error:c.mode==='hold'?textWithN(w.holdcopy,c.hold):c.mode==='trim'?textWithN(w.trimcopy,c.trim):w.readycopy;
 const total=c.error?30:Math.max(30,c.chosen+c.hold);
 const used=c.error?0:Math.min(c.chosen,c.out);
 const kept=c.error?0:Math.min(c.hold,c.out-used);
 const removed=c.error?0:c.trim;
 const preset=(n,label)=>`<button type="button" data-cp143-preset="${n}" aria-pressed="${state.preset===n?'true':'false'}">${label}</button>`;
 section.innerHTML=`<header><p class="cp143-eyebrow">${w.k}</p><h2 id="cp143-title">${w.title}</h2><p class="cp143-lead">${w.lead}</p><p class="cp143-spec">${w.sub}</p></header>
 <div class="cp143-grid"><div class="cp143-stage"><div class="cp143-stage-top"><span class="cp143-overline">${w.result}</span><span class="cp143-target">${w.target}</span></div>
 <div class="cp143-bigtime" data-cp143-output="${c.error?'error':fixed(c.out)}">${c.error?'—':fixed(c.out)}<small>${w.seconds}</small></div>
 <div class="cp143-status" data-cp143-mode="${c.error?'error':c.mode}">${status}</div><p class="cp143-substatus">${desc}</p>
 <div class="cp143-track-title"><span>${w.source}</span><span>${c.error?'—':fixed(c.chosen)+' '+w.seconds}</span></div>
 <div class="cp143-track" aria-hidden="true"><div class="cp143-bar-main" style="width:${pct(used,total)}%"></div><div class="cp143-bar-hold" style="width:${pct(kept,total)}%"></div><div class="cp143-bar-trim" style="width:${pct(removed,total)}%"></div></div>
 <div class="cp143-track-legend"><span><i class="cp143-legend-dot"></i>${w.base}</span><span><i class="cp143-legend-dot hold"></i>${w.extension}</span><span><i class="cp143-legend-dot trim"></i>${w.removed}</span></div></div>
 <div class="cp143-controls"><h3>${w.choose}</h3><div class="cp143-preset">${preset(8,w.short)}${preset(22,w.normal)}${preset(44,w.long)}</div>
 <div class="cp143-fieldset"><label class="cp143-field full"><span>${w.duration}</span><input type="number" id="cp143-duration" inputmode="decimal" min="1" max="600" step="1" value="${state.duration}"></label>
 <label class="cp143-field"><span>${w.start}</span><input type="number" id="cp143-start" inputmode="decimal" min="0" step="1" value="${state.start}"></label>
 <label class="cp143-field"><span>${w.end}</span><input type="number" id="cp143-end" inputmode="decimal" min="1" step="1" value="${state.end}"></label>
 <label class="cp143-field full"><span>${w.size}</span><select id="cp143-format">${w.sizes.map((s,i)=>`<option value="${i}" ${state.format===i?'selected':''}>${s}</option>`).join('')}</select></label></div>
 <p class="cp143-error" data-cp143-error role="status">${c.error?w.error:''}</p><button type="button" class="cp143-reset" id="cp143-reset">${w.reset}</button></div></div>
 <p class="cp143-footer">${w.footer}</p>`;
 section.querySelectorAll('[data-cp143-preset]').forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.cp143Preset);state={duration:n,start:0,end:n,format:state.format,preset:n};render();}));
 for(const key of ['duration','start','end']){section.querySelector('#cp143-'+key).addEventListener('change',(ev)=>{state[key]=ev.target.value.trim()===''?NaN:Number(ev.target.value);state.preset=null;render();});}
 section.querySelector('#cp143-format').addEventListener('change',(ev)=>{state.format=Number(ev.target.value);render();});
 section.querySelector('#cp143-reset').addEventListener('click',()=>{state={duration:8,start:0,end:8,format:0,preset:8};render();});
}
if(selector)selector.addEventListener('change',()=>{lang=locale(selector.value);render();});
render();
})();
