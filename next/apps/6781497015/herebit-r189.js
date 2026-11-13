/* Herebit R189 · Point at a sample website · browser-only; no actual image editing or AI transfer */
(() => {
  'use strict';
  const APP='6781497015', ROOT='tsz-herebit-r189';
  if (!document.body || document.getElementById(ROOT)) return;
  const appId=document.body.dataset.p199Id || document.body.dataset.p19AppId || '';
  if (appId && appId!==APP) return;
  if (!appId && !String(document.body.innerHTML).includes('Herebit')) return;
  const copy={
    en:{top:'POINT IT OUT',first:'Stop describing.',second:'Start pointing.',sub:'Show exactly where you mean.',step:'02 · Mark the spot',title:'Point to the change.',field:'Your feedback',hint:'Tap anywhere on the sample to move your pin. Use arrow keys when focused.',button:'Copy note and position',reset:'Reset example',steps:'01 Choose an image  ·  02 Tap the spot  ·  03 Share the marked image',store:'View on the App Store',note:'Illustrative browser-only demo. No image editing, photo upload, or AI transmission.',copied:'Copied the sample note and coordinates.',copyFail:'Copy is unavailable in this browser. Select the note instead.',value:'Make this spacing wider.'},
    ja:{top:'ここを直して、と伝える',first:'言葉だけで説明しない。',second:'場所を指して伝える。',sub:'修正してほしい位置を、ひと目で。',step:'02 · 場所を指定',title:'直したい場所を指そう。',field:'伝えたいこと',hint:'サンプル画像の好きな場所をタップ。キーボードの矢印キーでも移動できます。',button:'指示と位置をコピー',reset:'サンプルに戻す',steps:'01 画像を選ぶ  ·  02 場所をタップ  ·  03 印を付けて共有',store:'App Storeで見る',note:'ブラウザ内の説明用デモです。画像編集・写真アップロード・AIへの送信は行いません。',copied:'指示と位置をコピーしました。',copyFail:'コピーできません。テキスト欄から選択してください。',value:'この余白を広げて。'},
    ar:{top:'أشر إلى المكان',first:'بدلاً من الوصف،',second:'أشر إلى المكان.',sub:'أظهر بالضبط موضع التعديل.',step:'02 · تحديد الموضع',title:'حدد المكان المقصود.',field:'ملاحظتك',hint:'انقر على المثال لتحريك الدبوس. أو استخدم أسهم لوحة المفاتيح.',button:'نسخ الملاحظة والموقع',reset:'إعادة المثال',steps:'01 اختر صورة · 02 أشر إلى الموضع · 03 شارك الصورة المعلّمة',store:'عرض في App Store',note:'عرض توضيحي داخل المتصفح فقط. لا تعديل أو رفع للصور أو إرسال إلى الذكاء الاصطناعي.',copied:'تم نسخ الملاحظة والإحداثيات.',copyFail:'النسخ غير متاح هنا. حدد الملاحظة يدويًا.',value:'اجعل هذه المسافة أوسع.'}
  };
  const root=document.createElement('section');root.id=ROOT;root.className='hb189';root.setAttribute('aria-labelledby','hb189-title');
  root.innerHTML=`<div class="hb189-wrap">
   <div class="hb189-mast"><span class="hb189-mark" aria-hidden="true"></span><strong class="hb189-brand">Herebit</strong><span class="hb189-mastsmall" data-hb-i="top"></span></div>
   <div class="hb189-intro"><p class="hb189-eyebrow" data-hb-i="top"></p><h2 id="hb189-title"><span data-hb-i="first"></span><em class="hb189-head-em" data-hb-i="second"></em></h2><p class="hb189-sub" data-hb-i="sub"></p></div>
   <div class="hb189-columns"><div class="hb189-editor">
    <div class="hb189-window"><div class="hb189-browser" aria-hidden="true"><i class="hb189-dot"></i><i class="hb189-dot"></i><i class="hb189-dot"></i></div>
     <div class="hb189-screen" id="hb189-screen" role="button" tabindex="0" aria-label="Sample image: click to relocate the position marker">
      <div class="hb189-screen-top"><strong class="hb189-screen-brand">Studio Line</strong><span class="hb189-screen-nav">Home &nbsp; Collection &nbsp; About</span><span aria-hidden="true">☰</span></div>
      <div class="hb189-product"><div class="hb189-product-content"><h3>Ceramic<br>Vase</h3><p>A simple form for<br>everyday spaces.</p><span class="hb189-product-cta">Explore collection ›</span></div>
       <div class="hb189-vase-scene" aria-hidden="true"><div class="hb189-leaf"></div><div class="hb189-leaf"></div><div class="hb189-leaf"></div><div class="hb189-stem"></div><div class="hb189-vase"></div></div></div>
      <span class="hb189-target" aria-hidden="true"></span><span class="hb189-pin" aria-hidden="true"><i class="hb189-pin-shape"></i></span>
     </div></div><p class="hb189-instruction" data-hb-i="hint"></p>
    </div><aside class="hb189-panel"><p class="hb189-step" data-hb-i="step"></p><h3 data-hb-i="title"></h3><label class="hb189-note-label" for="hb189-note" data-hb-i="field"></label><textarea id="hb189-note" maxlength="180" spellcheck="true"></textarea>
    <div class="hb189-coordinates" id="hb189-position" aria-live="polite">X 35% · Y 79%</div><button type="button" class="hb189-command" id="hb189-copy" data-hb-i="button"></button><button type="button" class="hb189-reset" id="hb189-reset" data-hb-i="reset"></button><p class="hb189-summary" id="hb189-feedback" role="status"></p></aside>
   </div><div class="hb189-bottom"><span class="hb189-steps" data-hb-i="steps"></span><a class="hb189-store" id="hb189-store" href="https://apps.apple.com/us/app/id6781497015" rel="noopener noreferrer" target="_blank" data-hb-i="store"></a></div>
   <p class="hb189-disclaimer" data-hb-i="note"></p>
  </div>`;
  const anchor=document.querySelector('.p19-breadcrumb')||document.querySelector('[class*="breadcrumb"]');
  if(anchor && anchor.parentNode) anchor.insertAdjacentElement('afterend',root);
  else {const main=document.querySelector('#p199-content')||document.querySelector('main');if(main)main.insertAdjacentElement('beforebegin',root);else document.body.insertBefore(root,document.body.firstChild);}
  if(!root.isConnected)return;
  const $=s=>root.querySelector(s);const $$=s=>Array.from(root.querySelectorAll(s));
  const stage=$('#hb189-screen'),note=$('#hb189-note');let x=35,y=79,lastLocale='';
  function findSelect(kind){const variants=kind==='language'?['#p199-language','#p19-language','select[id*="language"]','select[id*="locale"]','select[id*="lang"]']:['#p199-country','#p19-country','select[id*="country"]','select[id*="region"]','select[id*="storefront"]'];for(const q of variants){const s=document.querySelector(q);if(s&&s.tagName==='SELECT')return s;}return null;}
  function lang(){const s=findSelect('language');const v=(s?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en';}
  function region(){const s=findSelect('country');let v=(s?.value||new URLSearchParams(location.search).get('country')||'us').toLowerCase();return /^[a-z]{2}$/.test(v)?v:'us';}
  const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
  function setPin(a,b){x=clamp(Math.round(a*10)/10,6,94);y=clamp(Math.round(b*10)/10,14,94);for(const e of $$('.hb189-target,.hb189-pin')){e.style.left=x+'%';e.style.top=y+'%';}$('#hb189-position').textContent=`X ${x}% · Y ${y}%`;$('#hb189-feedback').textContent='';}
  function reset(){setPin(35,79);note.value=copy[lang()].value;}
  function relocalize(){const l=lang();root.lang=l;root.dir=l==='ar'?'rtl':'ltr';root.classList.toggle('hb189-rtl',l==='ar');$$('[data-hb-i]').forEach(e=>e.textContent=copy[l][e.dataset.hbI]);if(l!==lastLocale){if(!note.dataset.edited || note.value===copy[lastLocale]?.value)note.value=copy[l].value;lastLocale=l;}$('#hb189-store').href='https://apps.apple.com/'+region()+'/app/id'+APP;}
  stage.addEventListener('click',e=>{const rect=stage.getBoundingClientRect();setPin((e.clientX-rect.left)/rect.width*100,(e.clientY-rect.top)/rect.height*100);});
  stage.addEventListener('keydown',e=>{const steps={ArrowLeft:[-2,0],ArrowRight:[2,0],ArrowUp:[0,-2],ArrowDown:[0,2]};if(steps[e.key]){e.preventDefault();setPin(x+steps[e.key][0],y+steps[e.key][1]);}else if(e.key==='Enter'||e.key===' '){e.preventDefault();setPin(35,79);}});
  note.addEventListener('input',()=>{note.dataset.edited='true';$('#hb189-feedback').textContent='';});
  $('#hb189-reset').addEventListener('click',()=>{delete note.dataset.edited;reset();});
  function copyFallback(s){const temp=document.createElement('textarea');temp.value=s;temp.setAttribute('readonly','');temp.style.position='fixed';temp.style.left='-10000px';document.body.appendChild(temp);temp.focus();temp.select();let copied=false;try{copied=Boolean(document.execCommand('copy'));}catch(e){copied=false;}temp.remove();return copied;}
  $('#hb189-copy').addEventListener('click',()=>{const l=lang(),s=`${note.value.trim()}\nX: ${x}% / Y: ${y}%`;
    const done=ok=>{$('#hb189-feedback').textContent=ok?copy[l].copied:copy[l].copyFail;};
    if(navigator.clipboard&&typeof navigator.clipboard.writeText==='function')navigator.clipboard.writeText(s).then(()=>done(true)).catch(()=>done(copyFallback(s)));
    else done(copyFallback(s));
  });
  document.addEventListener('change',e=>{if(e.target===findSelect('language')||e.target===findSelect('country'))relocalize();},true);
  window.addEventListener('popstate',relocalize);
  setPin(x,y);relocalize();
})();
