/* R214 Palette Spin: tiny, isolated, manual palette demonstration. No storage, upload, tracking or remote fetch. */
(() => {
  'use strict';
  const APP='6767983547', ID='tsz-palette-r214', body=document.body;
  if (!body || (body.dataset.p199Id || body.dataset.p19AppId)!==APP || document.getElementById(ID)) return;
  const main=document.querySelector('main'); if(!main) return;
  const palettes={
    dawn:{colors:['#FFAB8F','#F9D6C2','#7B8DD8']},
    grove:{colors:['#244D43','#8DB99A','#E1DFB4']},
    violet:{colors:['#5F5AA4','#B39BDC','#F5BECB']}
  };
  const words={
    en:{eyebrow:'PALETTE SPIN · COLOR EXPERIMENT',headline:'The same colors. A different feeling.',intro:'Spin between three palettes, change the direction, and see a wallpaper mood appear.',try:'INTERACTIVE COLOR STUDY',choose:'Start with a feeling',dawn:'Soft sunrise',grove:'Quiet forest',violet:'Violet dusk',spin:'Spin the palette',direction:'Gradient direction',vertical:'Vertical',diagonal:'Diagonal',horizontal:'Horizontal',overlay:'Wallpaper text',showText:'Show text',message:'Your words',preview:'LIVE WALLPAPER STUDY',swatches:'Selected palette',codes:'Three colors that set the mood',note:'Website illustration only. This preview does not create or save a wallpaper, and does not access your photos.',cta:'Explore Palette Spin on the App Store',lang:'Language',region:'App Store region',reset:'Reset to sunrise',prompt:'Color changes the room.',phoneTop:'10:08',phoneBottom:'Your next wallpaper starts with color.',limit:'Up to 36 characters',subtitle:'A small change in color can change the entire mood.'},
    ja:{eyebrow:'PALETTE SPIN · 色の実験',headline:'同じ色でも、並べ方で気分が変わる。',intro:'3つの配色を回して、グラデーションの向きと文字を変えてみよう。',try:'操作できるカラーデモ',choose:'まず、気分を選ぶ',dawn:'やわらかな朝',grove:'静かな森',violet:'紫の夕暮れ',spin:'次の色へスピン',direction:'グラデーションの向き',vertical:'縦',diagonal:'斜め',horizontal:'横',overlay:'壁紙の文字',showText:'文字を表示',message:'入れたい言葉',preview:'壁紙のライブプレビュー',swatches:'選んだ配色',codes:'3色で生まれる雰囲気',note:'Webページ上の説明用サンプルです。壁紙の作成・保存や写真へのアクセスは行いません。',cta:'App StoreでPalette Spinを見る',lang:'言語',region:'App Store地域',reset:'朝の色に戻す',prompt:'色が、気分を変える。',phoneTop:'10:08',phoneBottom:'次の壁紙は、色から始まる。',limit:'36文字以内',subtitle:'色を少し動かすだけで、見える景色が変わる。'},
    ar:{eyebrow:'PALETTE SPIN · تجربة الألوان',headline:'الألوان نفسها، وإحساس مختلف.',intro:'تنقّل بين ثلاث لوحات، وغيّر اتجاه التدرّج والنص لترى المزاج يتبدّل.',try:'تجربة ألوان تفاعلية',choose:'اختر شعورًا',dawn:'صباح دافئ',grove:'غابة هادئة',violet:'مساء بنفسجي',spin:'تدوير الألوان',direction:'اتجاه التدرّج',vertical:'عمودي',diagonal:'قطري',horizontal:'أفقي',overlay:'نص الخلفية',showText:'عرض النص',message:'عبارتك',preview:'معاينة حية للخلفية',swatches:'لوحتك المختارة',codes:'ثلاثة ألوان تصنع الإحساس',note:'هذه معاينة توضيحية على الموقع فقط. لا تنشئ خلفية ولا تحفظها ولا تصل إلى صورك.',cta:'اكتشف Palette Spin في App Store',lang:'اللغة',region:'منطقة App Store',reset:'العودة إلى الصباح',prompt:'لون يصنع مزاجك',phoneTop:'١٠:٠٨',phoneBottom:'تبدأ الخلفية التالية بلون.',limit:'حتى ٣٦ حرفًا',subtitle:'تغيير صغير في اللون يغيّر المشهد كله.'}
  };
  const langFrom=v=>/^ar(?:\b|[-_])/i.test(v||'')?'ar':/^ja(?:\b|[-_])/i.test(v||'')?'ja':'en';
  const regionFrom=v=>/^(jp|japan|ja-jp)$/i.test(v||'')?'jp':'us';
  const hostLang=document.querySelector('#p199-language, #p19-language, #ps23-language, #palettespin-language');
  const hostRegion=document.querySelector('#p199-country, #p19-country, #ps23-country, #palettespin-country');
  let lang=hostLang&&hostLang.value?langFrom(hostLang.value):'en', region=hostRegion&&hostRegion.value?regionFrom(hostRegion.value):'us';
  let active='dawn', direction='diagonal', showText=true, customText='', customEdited=false, syncing=false;
  const keys=['dawn','grove','violet'];
  const root=document.createElement('section'); root.id=ID;root.setAttribute('aria-label','Palette Spin interactive color study');
  root.innerHTML=`
  <div class="ps214-shell">
    <div class="ps214-nav"><span class="ps214-brand"><span class="ps214-logo" aria-hidden="true">✳</span> PALETTE SPIN</span><span class="ps214-edition" data-t="try"></span></div>
    <div class="ps214-hero"><div class="ps214-eyebrow" data-t="eyebrow"></div><h2 data-t="headline"></h2><p data-t="intro"></p></div>
    <div class="ps214-workspace">
      <div class="ps214-studio">
        <div class="ps214-caption"><span>01 / <span data-t="choose"></span></span><span class="ps214-thinline"></span></div>
        <div class="ps214-presetlist" role="group" aria-label="Palette choices"><button type="button" data-palette="dawn"><span class="ps214-mini" data-mini="dawn"></span><span data-t="dawn"></span></button><button type="button" data-palette="grove"><span class="ps214-mini" data-mini="grove"></span><span data-t="grove"></span></button><button type="button" data-palette="violet"><span class="ps214-mini" data-mini="violet"></span><span data-t="violet"></span></button></div>
        <button class="ps214-spin" id="ps214-spin" type="button"><span aria-hidden="true">↻</span><span data-t="spin"></span></button>
        <div class="ps214-caption ps214-sep"><span>02 / <span data-t="direction"></span></span><span class="ps214-thinline"></span></div>
        <div class="ps214-direction" role="group" aria-label="Gradient direction"><button type="button" data-dir="vertical" data-t="vertical"></button><button type="button" data-dir="diagonal" data-t="diagonal"></button><button type="button" data-dir="horizontal" data-t="horizontal"></button></div>
        <div class="ps214-caption ps214-sep"><span>03 / <span data-t="overlay"></span></span><span class="ps214-thinline"></span></div>
        <label class="ps214-toggle"><input id="ps214-show" type="checkbox" checked><span class="ps214-slider" aria-hidden="true"></span><span data-t="showText"></span></label>
        <label class="ps214-inputlabel" for="ps214-word" data-t="message"></label><input id="ps214-word" type="text" maxlength="36" autocomplete="off" aria-label="Wallpaper text"/><div class="ps214-counter"><span data-t="limit"></span><output id="ps214-count">0/36</output></div>
        <button id="ps214-reset" class="ps214-reset" type="button" data-t="reset"></button>
      </div>
      <div class="ps214-previewpanel"><div class="ps214-previewtop"><span data-t="preview"></span><span class="ps214-live"><i></i> LIVE</span></div>
        <div class="ps214-phone" id="ps214-phone" role="img" aria-label="Illustrative wallpaper gradient"><div class="ps214-phoneglass"><div class="ps214-island"></div><div class="ps214-time" data-t="phoneTop"></div><div class="ps214-phonewords" id="ps214-phonewords"></div><div class="ps214-bottom" data-t="phoneBottom"></div></div></div>
        <div class="ps214-swatches"><div><strong data-t="swatches"></strong><small data-t="codes"></small></div><div class="ps214-colors" id="ps214-colors" aria-label="Palette color hexadecimal codes"></div></div>
      </div>
    </div>
    <div class="ps214-footer"><div class="ps214-footsub" data-t="subtitle"></div><p class="ps214-note" data-t="note"></p><div class="ps214-bottomrow"><div class="ps214-locales"><label><span data-t="lang"></span><select id="ps214-lang" aria-label="Language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="ps214-region" aria-label="App Store region"><option value="us">US</option><option value="jp">JP</option></select></label></div><a id="ps214-store" target="_blank" rel="noopener noreferrer"><span data-t="cta"></span> ↗</a></div></div>
  </div>`;
  main.prepend(root);
  const $=sel=>root.querySelector(sel), T=()=>words[lang];
  function setHeader(el,value,kind){
    if (!el||!el.options||!el.options.length)return;
    const matched=Array.from(el.options).find(o=>kind==='lang'?(langFrom(o.value)===value&&(value!=='en'||/^en/i.test(o.value))):(regionFrom(o.value)===value&&(value!=='us'||/^us/i.test(o.value))));
    if(matched&&el.value!==matched.value){el.value=matched.value;el.dispatchEvent(new Event('change',{bubbles:true}));}
  }
  function syncHeader(){if(syncing)return;syncing=true;try{setHeader(hostLang,lang,'lang');setHeader(hostRegion,region,'region');}finally{syncing=false;}}
  function update(){
    root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=T()[el.dataset.t]||'';});
    if(!customEdited)customText=T().prompt;
    $('#ps214-word').value=customText;
    $('#ps214-count').textContent=Array.from(customText).length+'/36';
    keys.forEach(k=>{const b=$(`[data-palette="${k}"]`);b.setAttribute('aria-pressed',String(k===active));});
    root.querySelectorAll('[data-dir]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.dir===direction)));
    $('#ps214-show').checked=showText;
    $('#ps214-word').disabled=!showText;
    $('#ps214-lang').value=lang;$('#ps214-region').value=region;
    const angles={vertical:'180deg',diagonal:'135deg',horizontal:'90deg'};
    const c=palettes[active].colors;
    $('#ps214-phone').style.background=`linear-gradient(${angles[direction]},${c[0]} 0%,${c[1]} 52%,${c[2]} 100%)`;
    $('#ps214-phonewords').textContent=showText?customText:'';
    $('#ps214-phonewords').hidden=!showText;
    const colors=$('#ps214-colors');colors.replaceChildren();
    c.forEach(hex=>{const item=document.createElement('div');item.className='ps214-chip'; const swatch=document.createElement('span');swatch.className='ps214-dot';swatch.style.backgroundColor=hex;const code=document.createElement('code');code.textContent=hex;item.append(swatch,code);colors.append(item);});
    $('#ps214-store').href=`https://apps.apple.com/${region}/app/id${APP}`;
  }
  root.querySelectorAll('[data-palette]').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.palette;update();}));
  $('#ps214-spin').addEventListener('click',()=>{active=keys[(keys.indexOf(active)+1)%keys.length];update();});
  root.querySelectorAll('[data-dir]').forEach(b=>b.addEventListener('click',()=>{direction=b.dataset.dir;update();}));
  $('#ps214-show').addEventListener('change',e=>{showText=e.currentTarget.checked;update();});
  $('#ps214-word').addEventListener('input',e=>{customEdited=true;customText=Array.from(e.currentTarget.value).slice(0,36).join('');update();});
  $('#ps214-lang').addEventListener('change',e=>{lang=langFrom(e.currentTarget.value);update();syncHeader();});
  $('#ps214-region').addEventListener('change',e=>{region=regionFrom(e.currentTarget.value);update();syncHeader();});
  if(hostLang)hostLang.addEventListener('change',()=>{if(syncing)return;lang=langFrom(hostLang.value);update();});
  if(hostRegion)hostRegion.addEventListener('change',()=>{if(syncing)return;region=regionFrom(hostRegion.value);update();});
  $('#ps214-reset').addEventListener('click',()=>{active='dawn';direction='diagonal';showText=true;customText=T().prompt;customEdited=false;update();});
  update();
})();
