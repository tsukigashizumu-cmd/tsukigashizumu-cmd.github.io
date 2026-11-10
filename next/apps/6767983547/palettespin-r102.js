/* Palette Spin R102: explanatory, self-contained wallpaper preview. No uploads, save or network. */
(()=>{'use strict';
const ID='tsz-palettespin-r102';
if(document.getElementById(ID))return;
const copy={
 ja:{eyebrow:'PALETTE SPIN · 体験デモ',title:'色を回して、壁紙を変える。',lede:'好きな色を選び、スピンするだけ。スマホの壁紙がどんな表情になるか試せます。',choose:'色の組み合わせ',dusk:'夕暮れ',citrus:'シトラス',sea:'海辺',label:'壁紙に入れる言葉（任意）',placeholder:'今日を、いい日に。',spin:'↻ 色をスピン',reset:'最初に戻す',status:'パターン {n} / 4',fine:'これはLP専用の模擬プレビューです。実際のアプリの壁紙生成・写真合成・保存機能はここでは実行されません。',preview:'壁紙プレビュー',date:'11月10日 火曜日',lock:'上にスワイプして開く'},
 en:{eyebrow:'PALETTE SPIN · LIVE DEMO',title:'Spin colors into a wallpaper.',lede:'Choose a palette and spin. See how a wallpaper could look on a phone.',choose:'Color palette',dusk:'Dusk',citrus:'Citrus',sea:'Coast',label:'Optional wallpaper text',placeholder:'Make today yours.',spin:'↻ Spin the colors',reset:'Start over',status:'Pattern {n} of 4',fine:'This is a simulated LP preview. Actual wallpaper creation, photo blending and saving are available in the app, not on this page.',preview:'Wallpaper preview',date:'Tuesday, November 10',lock:'Swipe up to open'},
 ar:{eyebrow:'PALETTE SPIN · تجربة توضيحية',title:'دوّر الألوان وغيّر خلفيتك.',lede:'اختر لوحة ألوان وجرّب التدوير لترى شكلاً جديداً للخلفية.',choose:'لوحة الألوان',dusk:'الغروب',citrus:'الحمضيات',sea:'البحر',label:'كلمة على الخلفية (اختياري)',placeholder:'اجعل يومك أجمل',spin:'↻ تدوير الألوان',reset:'إعادة البدء',status:'النمط {n} من 4',fine:'هذه معاينة توضيحية ضمن الصفحة فقط. إنشاء الخلفيات الحقيقية ودمج الصور وحفظها من وظائف التطبيق.',preview:'معاينة الخلفية',date:'الثلاثاء 10 نوفمبر',lock:'اسحب للأعلى للفتح'}
};
const palettes={dusk:['#f2d3d9','#a09ee8','#403978'],citrus:['#ffe49c','#f29c97','#c8438a'],sea:['#bdece0','#7dbadf','#306da8']};
const state={palette:'dusk',pattern:0,text:''};
const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Palette Spin simulated wallpaper demo');
root.innerHTML=`<p class="ps102-eyebrow"></p><h2></h2><p class="ps102-lede"></p><div class="ps102-layout"><div class="ps102-controls"><span class="ps102-label ps102-choose"></span><div class="ps102-presets" role="group" aria-label="Palette"><button type="button" class="ps102-swatch" data-palette="dusk" aria-pressed="true"><span class="ps102-swatch-dot" aria-hidden="true"></span><span class="ps102-swatch-name"></span></button><button type="button" class="ps102-swatch" data-palette="citrus" aria-pressed="false"><span class="ps102-swatch-dot" aria-hidden="true"></span><span class="ps102-swatch-name"></span></button><button type="button" class="ps102-swatch" data-palette="sea" aria-pressed="false"><span class="ps102-swatch-dot" aria-hidden="true"></span><span class="ps102-swatch-name"></span></button></div><label class="ps102-label ps102-text-label" for="ps102-word"></label><input class="ps102-input" id="ps102-word" type="text" maxlength="48" autocomplete="off"><div class="ps102-buttons"><button class="ps102-spin" type="button"></button><button class="ps102-reset" type="button"></button></div><p class="ps102-status" role="status" aria-live="polite"></p><p class="ps102-fine"></p></div><div class="ps102-stage"><div><div class="ps102-device" role="img" aria-label="Wallpaper preview"><div class="ps102-screen"><div class="ps102-island"></div><div class="ps102-date"></div><div class="ps102-clock">9:41</div><div class="ps102-custom"></div><div class="ps102-lock"></div></div></div><div class="ps102-footer"></div></div></div></div>`;
const lang=()=>{let p=(document.documentElement.lang||'en').toLowerCase();return p.startsWith('ar')?'ar':p.startsWith('ja')?'ja':'en'};
const q=(s)=>root.querySelector(s);
const gradient=()=>{const c=palettes[state.palette];switch(state.pattern){
 case 0:return `linear-gradient(153deg,${c[0]} 0%,${c[1]} 53%,${c[2]} 100%)`;
 case 1:return `radial-gradient(ellipse at 18% 24%,${c[0]} 0%,transparent 55%),linear-gradient(38deg,${c[2]},${c[1]})`;
 case 2:return `radial-gradient(ellipse at 80% 88%,${c[0]} 3%,transparent 53%),linear-gradient(125deg,${c[1]} 5%,${c[2]} 95%)`;
 default:return `conic-gradient(from 160deg at 40% 48%,${c[0]},${c[1]},${c[2]},${c[1]},${c[0]})`;
}};
function render(){let l=lang(),c=copy[l];root.lang=l;root.dir=l==='ar'?'rtl':'ltr';
 q('.ps102-eyebrow').textContent=c.eyebrow;q('h2').textContent=c.title;q('.ps102-lede').textContent=c.lede;
 q('.ps102-choose').textContent=c.choose;q('.ps102-text-label').textContent=c.label;q('.ps102-input').placeholder=c.placeholder;
 q('.ps102-spin').textContent=c.spin;q('.ps102-reset').textContent=c.reset;q('.ps102-status').textContent=c.status.replace('{n}',String(state.pattern+1));q('.ps102-fine').textContent=c.fine;
 q('.ps102-date').textContent=c.date;q('.ps102-lock').textContent=c.lock;q('.ps102-footer').textContent=c.preview;
 q('.ps102-custom').textContent=state.text;q('.ps102-screen').style.background=gradient();
 root.querySelectorAll('.ps102-swatch').forEach(b=>{const selected=b.dataset.palette===state.palette;b.setAttribute('aria-pressed',String(selected));b.querySelector('.ps102-swatch-name').textContent=c[b.dataset.palette]});
}
root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.matches('.ps102-swatch')){state.palette=b.dataset.palette;state.pattern=0;render()}
 if(b.matches('.ps102-spin')){state.pattern=(state.pattern+1)%4;render()}
 if(b.matches('.ps102-reset')){state.palette='dusk';state.pattern=0;state.text='';q('.ps102-input').value='';render()}
});
root.addEventListener('input',e=>{if(e.target.matches('.ps102-input')){state.text=e.target.value.slice(0,48);render()}});
function mount(){if(root.isConnected)return;const target=document.querySelector('#overview')||document.querySelector('main')||document.body;target.insertAdjacentElement('afterend',root);render()}
const observer=new MutationObserver(()=>{if(root.isConnected && root.lang!==lang())render()});
observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
