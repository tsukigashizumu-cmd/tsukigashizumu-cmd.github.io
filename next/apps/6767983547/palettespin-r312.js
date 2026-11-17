/* R312 Palette Spin. Pure local demo; no export, upload or persistence. */
(() => {
  'use strict';
  const COPY = {
    en:{eyebrow:'PALETTE SPIN / INTERACTIVE PREVIEW',title:'The wallpaper starts with one color.',desc:'Tap Spin to find a fresh color mood. See it on a phone before you decide.',choice:'CURRENT PALETTE',spin:'Spin colors',soft:'Soft',bold:'Vivid',vertical:'Portrait',horizontal:'Landscape',text:'A line on your wallpaper (optional)',keep:'Save this choice',kept:'Saved for this visit',count:'Saved: ',phone:'Wallpaper preview',note:'A page-only visual sample. No wallpaper file is created or saved to Photos. Your choices disappear when you leave this page.',date:'TUESDAY',placeholder:'Your words', names:['Lavender hour','Tangerine tide','Ocean glass','Rose afterglow','Midnight glow'], descriptions:['Lavender and blue in quiet balance.','A warm start with a coral accent.','Clear green with a cooling blue edge.','A pink light fading toward violet.','Inky blues with a sudden bright spark.']},
    ja:{eyebrow:'PALETTE SPIN / 操作型プレビュー',title:'壁紙の色、まだ決まらない？',desc:'スピンするたびに、次の色の組み合わせへ。スマホ画面で見比べよう。',choice:'いまのパレット',spin:'色をスピン',soft:'やわらかく',bold:'鮮やかに',vertical:'縦向き',horizontal:'横向き',text:'壁紙に入れる言葉（任意）',keep:'この色を残す',kept:'このページに保存済み',count:'保存中: ',phone:'壁紙プレビュー',note:'LP専用の表示例です。壁紙ファイルの生成・写真アプリへの保存は行いません。保存状態はページを閉じると消えます。',date:'火曜日',placeholder:'好きな言葉を',names:['ラベンダーの夕刻','オレンジの波','海のガラス','バラ色の余韻','夜のきらめき'],descriptions:['ラベンダーと青の静かな重なり。','温かいオレンジに珊瑚色を少し。','澄んだ緑から青へつながる色。','淡いピンクが紫へ溶けていく。','深い青にひとすじの光。']},
    ar:{eyebrow:'PALETTE SPIN / معاينة تفاعلية',title:'لون واحد، وبداية خلفية جديدة.',desc:'اضغط تدوير الألوان لاستكشاف مجموعة جديدة، وشاهدها على شاشة الهاتف.',choice:'لوحة الألوان الحالية',spin:'تدوير الألوان',soft:'هادئ',bold:'زاهٍ',vertical:'عمودي',horizontal:'أفقي',text:'عبارة على الخلفية (اختياري)',keep:'الاحتفاظ بهذه الألوان',kept:'محفوظ خلال هذه الزيارة',count:'المحفوظ: ',phone:'معاينة الخلفية',note:'هذه تجربة بصرية داخل الصفحة فقط. لا يتم إنشاء صورة أو حفظها في الصور. تختفي الاختيارات عند إغلاق الصفحة.',date:'الثلاثاء',placeholder:'كلماتك هنا',names:['ساعة اللافندر','موجة البرتقال','زجاج البحر','توهّج الورود','بريق الليل'],descriptions:['توازن هادئ بين الأرجواني والأزرق.','دفء برتقالي مع لمسة مرجانية.','أخضر صافٍ مع حافة زرقاء.','وردي ناعم يذوب في البنفسجي.','أزرق داكن ولمعة مضيئة.']}
  };
  const PAL=[['#7369e8','#b9a5f8','#78c8f3','#b7f6de'],['#ff7a5c','#ffc46e','#f9e4b7','#e99a99'],['#0a9c96','#65dcc7','#a1eee0','#438bd4'],['#ed82a9','#f7bdd3','#e4a0ed','#816fe3'],['#151b47','#384e96','#8193ff','#e8aaff']];
  const esc=(s)=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
  function setup(root){
    if(root.querySelector('.ps312'))return;
    const section=document.createElement('section');section.className='ps312';section.id='palette-spin-r312';section.setAttribute('aria-label','Palette Spin interactive preview');
    section.innerHTML=`<div class="ps312-top"><div><p class="ps312-kicker" data-pst="eyebrow"></p><h2 data-pst="title"></h2><p class="ps312-desc" data-pst="desc"></p></div><div class="ps312-langs" role="group" aria-label="Language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></div><div class="ps312-body"><div class="ps312-controls"><span class="ps312-small-label" data-pst="choice"></span><p class="ps312-palette-name" data-psname></p><p class="ps312-palette-note" data-psnote></p><div class="ps312-swatches" aria-label="Palette colors"><span class="ps312-swatch"></span><span class="ps312-swatch"></span><span class="ps312-swatch"></span><span class="ps312-swatch"></span></div><button class="ps312-spin" type="button" data-action="spin"><span class="ps312-spin-icon" aria-hidden="true">↻</span><span data-pst="spin"></span></button><div class="ps312-options" role="group"><button type="button" data-mode="soft"></button><button type="button" data-mode="vivid"></button></div><div class="ps312-options" role="group"><button type="button" data-layout="portrait"></button><button type="button" data-layout="landscape"></button></div><label class="ps312-text-label" data-pst="text" for="ps312-text-input"></label><input id="ps312-text-input" class="ps312-headline-input" type="text" maxlength="34" autocomplete="off" data-psinput><div class="ps312-bottom"><button class="ps312-keep" type="button" data-action="keep"></button><span class="ps312-count" aria-live="polite"></span></div></div><div class="ps312-preview-wrap"><div class="ps312-phone" role="img"><div class="ps312-wallpaper"></div><div class="ps312-notch"></div><div class="ps312-phone-ui"><div class="ps312-clock">9:41</div><div class="ps312-lockdate" data-pst="date"></div><div class="ps312-walltext" data-pswalltext></div><div class="ps312-homebar"></div></div></div><p class="ps312-preview-caption" data-pst="phone"></p></div></div><p class="ps312-fineprint" data-pst="note"></p>`;
    root.appendChild(section);
    let lang=(document.documentElement.lang||'en').toLowerCase().startsWith('ja')?'ja':(document.documentElement.lang||'').toLowerCase().startsWith('ar')?'ar':'en';
    let index=0, mode='vivid', layout='portrait', kept=new Set();
    const q=s=>section.querySelector(s),qa=s=>Array.from(section.querySelectorAll(s));
    const render=()=>{
      const t=COPY[lang];section.dir=lang==='ar'?'rtl':'ltr';
      qa('[data-pst]').forEach(el=>{el.textContent=t[el.dataset.pst]||''});
      qa('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===lang)));
      q('[data-psname]').textContent=t.names[index];q('[data-psnote]').textContent=t.descriptions[index];
      const wallpaper=q('.ps312-wallpaper');PAL[index].forEach((c,i)=>{wallpaper.style.setProperty('--ps-c'+(i+1),c);qa('.ps312-swatch')[i].style.background=c;});
      wallpaper.classList.toggle('ps312-soft',mode==='soft');
      q('.ps312-phone').classList.toggle('ps312-landscape',layout==='landscape');
      q('.ps312-phone').setAttribute('aria-label',t.phone+' '+t.names[index]);
      q('[data-pswalltext]').textContent=q('[data-psinput]').value.trim();
      q('[data-psinput]').placeholder=t.placeholder;
      qa('[data-mode]').forEach(el=>{el.textContent=t[el.dataset.mode==='soft'?'soft':'bold'];el.setAttribute('aria-pressed',String(el.dataset.mode===mode))});
      qa('[data-layout]').forEach(el=>{el.textContent=t[el.dataset.layout==='portrait'?'vertical':'horizontal'];el.setAttribute('aria-pressed',String(el.dataset.layout===layout))});
      q('[data-action="keep"]').textContent=t[kept.has(index)?'kept':'keep'];q('[data-action="keep"]').setAttribute('aria-pressed',String(kept.has(index)));
      q('.ps312-count').textContent=t.count+kept.size;
    };
    section.addEventListener('click',ev=>{
      const btn=ev.target.closest('button');if(!btn||!section.contains(btn))return;
      if(btn.dataset.lang){lang=btn.dataset.lang;render();return;}
      if(btn.dataset.mode){mode=btn.dataset.mode;render();return;}
      if(btn.dataset.layout){layout=btn.dataset.layout;render();return;}
      if(btn.dataset.action==='spin'){index=(index+1)%PAL.length;const i=q('.ps312-spin-icon');i.classList.remove('ps312-turned');void i.offsetWidth;i.classList.add('ps312-turned');render();return;}
      if(btn.dataset.action==='keep'){kept.has(index)?kept.delete(index):kept.add(index);render();}
    });
    q('[data-psinput]').addEventListener('input',render);
    render();
  }
  function mount(){
    if(document.getElementById('palette-spin-r312'))return;
    const standalone=document.getElementById('ps312-preview-root');
    if(standalone){setup(standalone);return;}
    const related=document.getElementById('related');
    if(related&&related.parentElement){const host=document.createElement('div');host.id='ps312-container';related.parentElement.insertBefore(host,related);setup(host);return;}
    const main=document.querySelector('main');if(main){setup(main);}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
