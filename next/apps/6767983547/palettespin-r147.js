/* Palette Spin R147 — interactive wallpaper palette study for the LP, not the export engine. */
(()=>{
'use strict';
const ID='tsz-palettespin-r147';
if(document.getElementById(ID))return;
const query=new URLSearchParams(window.location.search);
const detect=s=>String(s||'en').toLowerCase().startsWith('ja')?'ja':String(s||'en').toLowerCase().startsWith('ar')?'ar':'en';
const host=document.querySelector('#p199-content .p199-body')||document.querySelector('#p199-content')||document.querySelector('main')||document.body;
const translations={
 ja:{eyebrow:'PALETTE SPIN / COLOR PLAYGROUND',title:'色を回すだけで、壁紙が変わる。',lead:'気に入った色を選んで、スピン。文字も重ねて、あなたの一枚を試してみよう。',a:'01 / パレットを選ぶ',b:'02 / 色をスピン',c:'03 / 言葉を添える',sunset:'夕映え',sea:'海の光',forest:'深い森',spin:'色をスピンする',pattern:'配色パターン',word:'入れる言葉',textToggle:'文字を表示',typeHint:'最大28文字・ページ内だけの見本',reset:'最初に戻す',preview:'LIVE WALLPAPER PREVIEW',previewSub:'配色と文字がリアルタイムで変わります',spinN:'スピン回数',disclaimer:'このLP専用の操作見本では壁紙ファイルを保存しません。実アプリでは写真、文字、配色を組み合わせて保存できます。',language:'言語',sample:'今日も、いい色。',tip:'気に入るまで何度でも回せる。',textSize:'文字の大きさ',off:'非表示',on:'表示中'},
 en:{eyebrow:'PALETTE SPIN / COLOR PLAYGROUND',title:'Spin the colors. See a new wallpaper.',lead:'Pick a palette, spin the gradient, and layer a few words to discover a look that feels yours.',a:'01 / PICK A PALETTE',b:'02 / SPIN THE COLORS',c:'03 / ADD YOUR WORDS',sunset:'Golden hour',sea:'Coastal blue',forest:'Deep forest',spin:'Spin the colors',pattern:'Color arrangement',word:'Wallpaper text',textToggle:'Show text',typeHint:'Up to 28 characters · local preview only',reset:'Reset example',preview:'LIVE WALLPAPER PREVIEW',previewSub:'Colors and text update as you edit',spinN:'Spins',disclaimer:'This is a website illustration, not the wallpaper export tool. The app lets you combine photos, text, palettes and save your design.',language:'Language',sample:'Find your color.',tip:'There is no one right combination.',textSize:'Text size',off:'Hidden',on:'Visible'},
 ar:{eyebrow:'PALETTE SPIN / تجربة الألوان',title:'أدر الألوان. واصنع خلفية جديدة.',lead:'اختر لوحة ألوان وغيّر التدرج، ثم أضف كلماتك لمعاينة خلفية تعبر عنك.',a:'01 / اختر لوحة الألوان',b:'02 / أدر الألوان',c:'03 / أضف كلماتك',sunset:'ضوء الغروب',sea:'أزرق البحر',forest:'الغابة العميقة',spin:'تدوير الألوان',pattern:'تنسيق الألوان',word:'نص الخلفية',textToggle:'إظهار النص',typeHint:'حتى 28 حرفًا · معاينة داخل الصفحة فقط',reset:'إعادة المثال',preview:'معاينة الخلفية مباشرة',previewSub:'تتغير الألوان والكلمات أثناء التحرير',spinN:'عدد المرات',disclaimer:'هذا مثال تفاعلي على الموقع، وليس أداة تصدير الخلفيات. يمكنك في التطبيق دمج الصور والنصوص والألوان وحفظ التصميم.',language:'اللغة',sample:'لونك الجميل',tip:'جرّب حتى تجد ما يعجبك.',textSize:'حجم النص',off:'مخفي',on:'ظاهر'}
};
const palettes={
 sunset:{colors:['#f8ce8d','#ef8b83','#9953ab','#493878'],light:'#f9d6ba'},
 sea:{colors:['#b3eff3','#5acbcf','#4165c0','#1b376e'],light:'#d5fbfa'},
 forest:{colors:['#e2e2a8','#8dc6a7','#417f85','#184e60'],light:'#d6edd6'}
};
let lang=detect(query.get('lang')||document.documentElement.lang||navigator.language);
let palette='sunset',spins=0,words=translations[lang].sample,showText=true,size=48;
const root=document.createElement('section');root.id=ID;root.setAttribute('aria-labelledby','ps147-heading');host.appendChild(root);
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function gradient(){const c=palettes[palette].colors;const ordered=[0,1,2,3].map((_,i)=>c[(i+spins)%4]);const angles=[150,215,285,75,125,255];return `linear-gradient(${angles[spins%angles.length]}deg, ${ordered[0]} 1%, ${ordered[1]} 33%, ${ordered[2]} 69%, ${ordered[3]} 100%)`;}
function update(){
 const prev=root.querySelector('#ps147-wallpaper');if(!prev)return;
 prev.style.backgroundImage=gradient();prev.style.setProperty('--ps147-glow',palettes[palette].light);
 const overlay=root.querySelector('#ps147-overlay');overlay.textContent=showText?words:'';overlay.hidden=!showText;overlay.style.fontSize=`${size}px`;
 root.querySelector('#ps147-count').textContent=String(spins).padStart(2,'0');
 root.querySelector('#ps147-status').textContent=translations[lang][showText?'on':'off'];
 root.querySelectorAll('[data-ps147-palette]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.ps147Palette===palette)));
}
function render(){
 const t=translations[lang];root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
 root.innerHTML=`<div class="ps147-shell"><div class="ps147-header"><div class="ps147-overline">${t.eyebrow}</div><div class="ps147-header-row"><div><h2 id="ps147-heading">${t.title}</h2><p class="ps147-lead">${t.lead}</p></div><label class="ps147-lang">${t.language}<select id="ps147-language" aria-label="${t.language}"><option value="ja" ${lang==='ja'?'selected':''}>日本語</option><option value="en" ${lang==='en'?'selected':''}>English</option><option value="ar" ${lang==='ar'?'selected':''}>العربية</option></select></label></div></div><div class="ps147-board"><div class="ps147-controls"><p class="ps147-kicker">${t.a}</p><div class="ps147-palettes" role="group" aria-label="${t.a}">${[['sunset',t.sunset],['sea',t.sea],['forest',t.forest]].map(([id,label])=>`<button type="button" class="ps147-palette" data-ps147-palette="${id}" aria-pressed="${palette===id}"><i class="ps147-palette-dot is-${id}" aria-hidden="true"></i><span>${label}</span></button>`).join('')}</div><div class="ps147-divider"></div><p class="ps147-kicker">${t.b}</p><button id="ps147-spin" class="ps147-spin" type="button"><span aria-hidden="true">↻</span>${t.spin}</button><div class="ps147-spin-meta"><span>${t.pattern}</span><strong><span id="ps147-count">00</span> ${t.spinN}</strong></div><p class="ps147-tip">${t.tip}</p><div class="ps147-divider"></div><p class="ps147-kicker">${t.c}</p><label class="ps147-field" for="ps147-words">${t.word}</label><input type="text" id="ps147-words" maxlength="28" value="${esc(words)}" autocomplete="off" spellcheck="false" /><p class="ps147-help">${t.typeHint}</p><label class="ps147-toggle"><input type="checkbox" id="ps147-show" ${showText?'checked':''}/><span>${t.textToggle}</span><small id="ps147-status">${showText?t.on:t.off}</small></label><label class="ps147-field ps147-size" for="ps147-size">${t.textSize}</label><input type="range" id="ps147-size" min="28" max="66" step="2" value="${size}"/><button type="button" id="ps147-reset" class="ps147-reset">${t.reset}</button></div><div class="ps147-display"><div class="ps147-display-head"><span>${t.preview}</span><i class="ps147-live-dot" aria-hidden="true"></i></div><p class="ps147-display-note">${t.previewSub}</p><div class="ps147-phone"><div class="ps147-screen" id="ps147-wallpaper"><span class="ps147-island" aria-hidden="true"></span><span class="ps147-clock" aria-hidden="true">9:41</span><div class="ps147-overlay" id="ps147-overlay"></div><span class="ps147-screen-bottom" aria-hidden="true"></span></div></div><div class="ps147-display-footer"><span>PALETTE SPIN</span><span class="ps147-balls" aria-hidden="true">● ● ●</span></div></div></div><p class="ps147-disclaimer">${t.disclaimer}</p></div>`;
 root.querySelector('#ps147-language').addEventListener('change',e=>{const current=translations[lang].sample;const untouched=words===current;lang=detect(e.target.value);if(untouched)words=translations[lang].sample;render();});
 root.querySelectorAll('[data-ps147-palette]').forEach(btn=>btn.addEventListener('click',()=>{palette=btn.dataset.ps147Palette;update();}));
 root.querySelector('#ps147-spin').addEventListener('click',()=>{spins++;update();});
 root.querySelector('#ps147-words').addEventListener('input',e=>{words=e.target.value.slice(0,28);update();});
 root.querySelector('#ps147-show').addEventListener('change',e=>{showText=e.target.checked;update();});
 root.querySelector('#ps147-size').addEventListener('input',e=>{size=Math.min(66,Math.max(28,Number(e.target.value)||48));update();});
 root.querySelector('#ps147-reset').addEventListener('click',()=>{palette='sunset';spins=0;words=translations[lang].sample;showText=true;size=48;render();});
 update();
}
render();
})();
