/* CuePic R141 · website-only step annotation demo. No upload, sharing, storage or network. */
(()=>{
'use strict';
const ID='tsz-cuepic-r141';
if(document.getElementById(ID))return;
const params=new URLSearchParams(location.search);
const requested=(params.get('lang')||document.documentElement.lang||navigator.language||'en').toLowerCase();
const lang=requested.startsWith('ar')?'ar':requested.startsWith('ja')?'ja':'en';
const dict={
 ja:{kicker:'CUEPIC · 2ステップ体験',title:'説明するより、ここを囲む。',lead:'「右上のあれ」と言葉を重ねる代わりに、見てほしい場所を赤丸で伝える。2枚の見本画面で試してください。',sample:'LP専用サンプル',choice:'01 手順を選ぶ',step1:'1. 設定を開く',step2:'2. 通知を選ぶ',shapeTitle:'02 印の形を選ぶ',circle:'赤丸',rect:'赤い四角',preview:'ここを指して伝える',empty:'画面の中から一か所タップしてください。',tap:'この場所を押してください。',marked:'赤い印で場所を示しました。',clear:'この手順の印を外す',reset:'デモを最初から',cleared:'この手順の印を外しました。',resetMsg:'見本を最初に戻しました。',stepLabel:'見本画像（実アプリ画面ではありません）',note:'LP内だけの見本画面です。画像の読み込み・加工・共有は行いません。実際のアプリの描画手順を再現したものではなく、選択内容は保存も送信もされません。',screenTitle1:'設定を確認',screenTitle2:'通知を設定',settings:'設定',account:'アカウント',privacy:'プライバシー',help:'ヘルプ',notify:'通知',allow:'通知を許可',sound:'サウンド',time:'表示時刻',ready:'画面内の項目を押すと赤い印が付きます。',markLabel:'注目する場所',shapeStatus:'印の形を変えました。',steps:'手順',selected:'選択中'},
 en:{kicker:'CUEPIC · TWO-STEP DEMO',title:'Don’t explain the corner. Circle it.',lead:'Instead of saying “that thing at the top right,” show the exact place. Try marking two illustrated screens.',sample:'Website-only sample',choice:'01 Choose a step',step1:'1. Open Settings',step2:'2. Choose notifications',shapeTitle:'02 Choose a mark',circle:'Red circle',rect:'Red rectangle',preview:'A clearer instruction',empty:'Tap one place in the sample screen.',tap:'Tap here.',marked:'The red mark points to the spot.',clear:'Clear this step',reset:'Start sample over',cleared:'This step’s mark was cleared.',resetMsg:'The sample is back at the start.',stepLabel:'Illustrated sample (not the app screen)',note:'Illustration on this landing page only. No image upload, editing, sharing, saving, or transmission occurs. It does not reproduce the native annotation engine.',screenTitle1:'Check settings',screenTitle2:'Set notifications',settings:'Settings',account:'Account',privacy:'Privacy',help:'Help',notify:'Notifications',allow:'Allow alerts',sound:'Sounds',time:'Show time',ready:'Tap an item on the sample screen to place a red mark.',markLabel:'Highlighted spot',shapeStatus:'Mark shape changed.',steps:'Steps',selected:'Selected'},
 ar:{kicker:'CUEPIC · تجربة بخطوتين',title:'بدل شرح المكان، ضع دائرة حوله.',lead:'بدل قول «الزر في الزاوية العليا»، أشر إلى المكان المطلوب. جرّب وضع علامة على شاشتين توضيحيتين.',sample:'مثال على صفحة الويب',choice:'01 اختر الخطوة',step1:'1. فتح الإعدادات',step2:'2. اختيار الإشعارات',shapeTitle:'02 اختر نوع العلامة',circle:'دائرة حمراء',rect:'مستطيل أحمر',preview:'تعليمات أوضح',empty:'المس مكانًا في الشاشة النموذجية.',tap:'اضغط هنا.',marked:'العلامة الحمراء تحدد المكان.',clear:'مسح علامة هذه الخطوة',reset:'إعادة المثال من البداية',cleared:'تم مسح علامة هذه الخطوة.',resetMsg:'عاد المثال إلى البداية.',stepLabel:'شاشة توضيحية وليست شاشة التطبيق',note:'هذا مثال داخل صفحة الويب فقط. لا تُحمَّل صور ولا تُعدَّل أو تُشارك أو تُحفظ أو تُرسَل بيانات. ولا يحاكي محرك العلامات الحقيقي في التطبيق.',screenTitle1:'مراجعة الإعدادات',screenTitle2:'ضبط الإشعارات',settings:'الإعدادات',account:'الحساب',privacy:'الخصوصية',help:'مساعدة',notify:'الإشعارات',allow:'السماح بالتنبيهات',sound:'الأصوات',time:'وقت العرض',ready:'المس عنصرًا في الشاشة لوضع علامة حمراء.',markLabel:'المكان المحدد',shapeStatus:'تغيّر شكل العلامة.',steps:'الخطوات',selected:'تم الاختيار'}
};
const w=dict[lang];
const state={step:0,shape:'circle',marks:[{key:'settings',shape:'circle'},null]};
const screens=[['settings','account','privacy','help'],['notify','allow','sound','time']];
const section=document.createElement('section');
section.id=ID;section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';
section.setAttribute('aria-labelledby','cp141-title');
section.innerHTML=`
<p class="cp141-kicker">${w.kicker}</p><h2 class="cp141-title" id="cp141-title">${w.title}</h2><p class="cp141-lead">${w.lead}</p><span class="cp141-eyebrow">${w.sample}</span>
<div class="cp141-layout"><div class="cp141-mock"><div class="cp141-phone"><div class="cp141-screen" id="cp141-screen" aria-label="${w.stepLabel}"></div></div><p class="cp141-step-label">${w.stepLabel}</p></div>
<div class="cp141-controls"><h3 class="cp141-control-title">${w.preview}</h3><p class="cp141-control-note">${w.lead}</p>
<p class="cp141-group-label">${w.choice}</p><div class="cp141-tabs" role="group" aria-label="${w.steps}"><button type="button" class="cp141-option" data-cp141-step="0">${w.step1}</button><button type="button" class="cp141-option" data-cp141-step="1">${w.step2}</button></div>
<p class="cp141-group-label">${w.shapeTitle}</p><div class="cp141-shapes" role="group" aria-label="${w.shapeTitle}"><button type="button" class="cp141-option" data-cp141-shape="circle">◯ ${w.circle}</button><button type="button" class="cp141-option" data-cp141-shape="rect">▢ ${w.rect}</button></div>
<div class="cp141-selection"><p class="cp141-selection-label">${w.markLabel}</p><p class="cp141-instruction" id="cp141-instruction"></p><p class="cp141-caption" id="cp141-caption"></p></div>
<div class="cp141-actions"><button type="button" class="cp141-clear" id="cp141-clear">${w.clear}</button><button type="button" class="cp141-reset" id="cp141-reset">${w.reset}</button></div><p class="cp141-live" id="cp141-live" role="status" aria-live="polite">${w.ready}</p></div></div>
<p class="cp141-disclaimer">${w.note}</p>`;
const screen=section.querySelector('#cp141-screen');
const instruction=section.querySelector('#cp141-instruction');
const caption=section.querySelector('#cp141-caption');
const live=section.querySelector('#cp141-live');
function render(){
 section.querySelectorAll('[data-cp141-step]').forEach(btn=>btn.setAttribute('aria-pressed',String(Number(btn.dataset.cp141Step)===state.step)));
 section.querySelectorAll('[data-cp141-shape]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.cp141Shape===state.shape)));
 const mark=state.marks[state.step];
 const group=screens[state.step];
 let rows='';
 group.forEach((key,i)=>{
  const selected=mark&&mark.key===key;
  const marker=selected?`<span class="cp141-mark" data-shape="${mark.shape}" aria-hidden="true"></span>`:'';
  const label=w[key];
  if(i===0){
   rows+=`<div class="cp141-appbar"><span>${state.step===0?w.screenTitle1:w.screenTitle2}</span><button type="button" class="cp141-mock-control" data-key="${key}" aria-label="${label}"><span class="cp141-control-name" style="position:relative">${label}${marker}</span></button></div>`;
  }else{
   rows+=`<button type="button" class="cp141-mock-control" data-key="${key}"><span class="cp141-control-name" style="position:relative"><span class="cp141-dot"></span>${label}${marker}</span><span class="cp141-chevron" aria-hidden="true">›</span></button>`;
  }
 });
 screen.innerHTML=`<div class="cp141-statusbar"><span>9:41</span><span>●●● ▰</span></div>${rows}`;
 screen.querySelectorAll('[data-key]').forEach(btn=>btn.addEventListener('click',()=>{
  state.marks[state.step]={key:btn.dataset.key,shape:state.shape};
  render();live.textContent=w.marked;
 }));
 instruction.textContent=mark?w.tap:w.empty;
 caption.textContent=mark?`${w.selected}: ${w[mark.key]}`:w.empty;
}
section.querySelectorAll('[data-cp141-step]').forEach(btn=>btn.addEventListener('click',()=>{
 state.step=Number(btn.dataset.cp141Step);render();live.textContent=w.ready;
}));
section.querySelectorAll('[data-cp141-shape]').forEach(btn=>btn.addEventListener('click',()=>{
 state.shape=btn.dataset.cp141Shape;
 if(state.marks[state.step])state.marks[state.step].shape=state.shape;
 render();live.textContent=w.shapeStatus;
}));
section.querySelector('#cp141-clear').addEventListener('click',()=>{
 state.marks[state.step]=null;render();live.textContent=w.cleared;
});
section.querySelector('#cp141-reset').addEventListener('click',()=>{
 state.step=0;state.shape='circle';state.marks=[{key:'settings',shape:'circle'},null];render();live.textContent=w.resetMsg;
});
const mount=document.querySelector('#p199-content .p199-body')||document.querySelector('main')||document.body;
mount.appendChild(section);
render();
})();
