/* TSZ LP R195 P2 / Minpick. P1-approved copy & task samples; no storage or network. */
(()=>{'use strict';
const APP='6781131521';
const ROOT='tsz-minpick-r195';
const MARK='TSZ_MINPICK_R195_P2';
function init(){
 const appId=String(document.body?.dataset.p199Id||document.body?.dataset.p19AppId||'');
 if(appId!==APP||document.getElementById(ROOT))return;
 const anchor=document.querySelector('.p19-breadcrumb');if(!anchor?.parentNode)return;
 const root=document.createElement('section');root.id=ROOT;root.className='tsz-minpick-integration';root.setAttribute('aria-label','Minpick interactive preview');
 root.innerHTML="<div class=\"mp195-shell\">\n<div aria-hidden=\"true\" class=\"mp195-ambient\"></div>\n<header class=\"mp195-header\">\n<a aria-label=\"Minpick interactive experience\" class=\"mp195-brand\" href=\"#tsz-minpick-r195\">minpick<span>.</span></a>\n<div class=\"mp195-header-right\">\n\n<a class=\"mp195-store\" href=\"https://apps.apple.com/us/app/minpick/id6781131521\" id=\"mp195-store-top\" rel=\"noopener noreferrer\" target=\"_blank\">App Store <span aria-hidden=\"true\">↗</span></a>\n</div>\n</header>\n<div class=\"mp195-main\">\n<section aria-labelledby=\"mp195-title\" class=\"mp195-copy\">\n<div class=\"mp195-eyebrow\" id=\"mp195-eyebrow\">TIME YOU ALREADY HAVE</div>\n<h2 class=\"mp195-title\" id=\"mp195-title\">Five minutes.<br/>One clear start.</h2>\n<p class=\"mp195-lede\" id=\"mp195-lede\">Choose the minutes you have.<br/>See up to three things that fit.<br/>You still decide.</p>\n<div class=\"mp195-small-rule\"></div>\n<p class=\"mp195-reassurance\" id=\"mp195-reassurance\">Not a streak. Not a score.<br/>Just a little less deciding.</p>\n</section>\n<section aria-labelledby=\"mp195-demo-title\" class=\"mp195-demo\" id=\"mp195-demo\">\n<div class=\"mp195-demo-top\">\n<span class=\"mp195-demo-kicker\" id=\"mp195-demo-title\">TRY A MOMENT</span>\n<span aria-hidden=\"true\" class=\"mp195-big-digit\" id=\"mp195-digit\">05</span>\n<span class=\"mp195-demotag\" id=\"mp195-demotag\">INTERACTIVE PREVIEW</span>\n</div>\n<div aria-label=\"Minutes available\" class=\"mp195-durations\" role=\"group\">\n<button aria-pressed=\"false\" class=\"mp195-time\" data-duration=\"3\" type=\"button\">3 MIN</button>\n<button aria-pressed=\"true\" class=\"mp195-time is-active\" data-duration=\"5\" type=\"button\">5 MIN</button>\n<button aria-pressed=\"false\" class=\"mp195-time\" data-duration=\"10\" type=\"button\">10 MIN</button>\n</div>\n<div class=\"mp195-list-heading\"><span id=\"mp195-list-title\">Small things that fit</span><span id=\"mp195-up-to\">UP TO 3</span></div>\n<div aria-live=\"polite\" class=\"mp195-tasks\" id=\"mp195-tasks\"></div>\n<div class=\"mp195-demo-foot\">\n<p id=\"mp195-demo-footnote\">Tap a suggestion. Nothing is saved here.</p>\n<button class=\"mp195-reset\" id=\"mp195-reset\" type=\"button\">Reset ↺</button>\n</div>\n</section>\n</div>\n<footer class=\"mp195-footer\">\n<span id=\"mp195-footer-copy\">A quiet tool, not a productivity score.</span>\n<a href=\"https://apps.apple.com/us/app/minpick/id6781131521\" id=\"mp195-footer-store\" rel=\"noopener noreferrer\" target=\"_blank\">See Minpick on the App Store <span aria-hidden=\"true\">↗</span></a>\n</footer>\n</div>";
 anchor.insertAdjacentElement('afterend',root);
 const $=id=>root.querySelector('#'+id);
 const $$=selector=>Array.from(root.querySelectorAll(selector));
const durations=[3,5,10];
const byTime={3:['water','stretch','space'],5:['space','message','stretch'],10:['review','idea','message']};
const minutes={water:1,stretch:2,space:3,message:5,review:10,idea:8};
const svgs={
 water:'<path d="M12 3c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11Z"/><path d="M8.5 16a4 4 0 0 0 4 3"/>',
 stretch:'<circle cx="12" cy="5" r="2"/><path d="m12 8-1 6 4 3 3 4M11 14l-5 3-2 4M8 10l-4 4M14 10l6 2"/>',
 space:'<path d="m7 11 6-9 2 1-4 10M6 12l7 3-3 7H3l-1-3zM5 17l4 2M7 15l4 2"/>',
 message:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
 review:'<path d="M6 3h10l3 3v15H6zM16 3v4h3M9 12h7M9 16h7"/>',
 idea:'<circle cx="12" cy="10" r="6"/><path d="M10 16v2h4v-2M10 20h4M12 4V2M4 10H2M22 10h-2"/>'};
const i18n={
 en:{eyebrow:'TIME YOU ALREADY HAVE',head:{3:'Three minutes.<br>One clear start.',5:'Five minutes.<br>One clear start.',10:'Ten minutes.<br>One clear start.'},lede:'Choose the minutes you have.<br>See up to three things that fit.<br>You still decide.',reassurance:'Not a streak. Not a score.<br>Just a little less deciding.',demo:'TRY A MOMENT',demotag:'INTERACTIVE PREVIEW',list:'Small things that fit',upto:'UP TO 3',foot:'Tap a suggestion. Nothing is saved here.',chosen:'Your choice: {task}. Just a demonstration.',reset:'Reset ↺',footer:'A quiet tool, not a productivity score.',footerStore:'See Minpick on the App Store',store:'App Store',times:{3:'3 MIN',5:'5 MIN',10:'10 MIN'},names:{water:'Drink a glass of water',stretch:'Stretch for a moment',space:'Clear a small space',message:'Reply to one message',review:'Review your notes',idea:'Sketch one idea'},minutes:'m'},
 ja:{eyebrow:'いま、手元にある時間',head:{3:'3分から。<br>ひとつ始める。',5:'5分から。<br>ひとつ始める。',10:'10分から。<br>ひとつ始める。'},lede:'今ある時間を選ぶ。<br>収まりそうなことが最大3つ。<br>決めるのは、あなた。',reassurance:'連続記録も点数もいらない。<br>「選ぶ時間」を少し短く。',demo:'時間を選んで試す',demotag:'操作できる見本',list:'今できそうなこと',upto:'最大3件',foot:'候補を押してみてください。記録は保存されません。',chosen:'選んだこと：{task}。これは見本です。',reset:'最初から ↺',footer:'頑張らせるためではなく、迷う時間を減らすために。',footerStore:'App StoreでMinpickを見る',store:'App Store',times:{3:'3分',5:'5分',10:'10分'},names:{water:'水を一杯飲む',stretch:'少し体を伸ばす',space:'小さな場所を片づける',message:'メッセージを1件返す',review:'メモを見直す',idea:'アイデアを一つ描く'},minutes:'分'},
 ar:{eyebrow:'الوقت الذي تملكه الآن',head:{3:'ثلاث دقائق.<br>بداية واضحة.',5:'خمس دقائق.<br>بداية واضحة.',10:'عشر دقائق.<br>بداية واضحة.'},lede:'اختر الدقائق المتاحة لديك.<br>شاهد حتى ثلاثة أشياء تناسبها.<br>القرار لك.',reassurance:'لا سلسلة إنجازات ولا نقاط.<br>فقط وقت أقل في الحيرة.',demo:'جرّب لحظة',demotag:'معاينة تفاعلية',list:'أشياء صغيرة تناسب وقتك',upto:'حتى ٣',foot:'اضغط على اقتراح. لن يُحفظ أي شيء هنا.',chosen:'اخترت: {task}. هذه مجرد تجربة.',reset:'إعادة ↺',footer:'أداة هادئة، لا مقياس للإنتاجية.',footerStore:'شاهد Minpick في App Store',store:'App Store',times:{3:'٣ دقائق',5:'٥ دقائق',10:'١٠ دقائق'},names:{water:'اشرب كوب ماء',stretch:'تمدد قليلًا',space:'رتّب مساحة صغيرة',message:'رد على رسالة واحدة',review:'راجع ملاحظاتك',idea:'ارسم فكرة واحدة'},minutes:'د'}
};

const state={language:'en',region:'us',duration:5,selected:null};
const storeUrl=()=>`https://apps.apple.com/${state.region}/app/id${APP}`;
function findSelect(kind){
 const names=kind==='language'?['#p199-language','#p19-language','select[id*="language"]','select[id*="locale"]']:['#p199-country','#p19-country','select[id*="country"]','select[id*="region"]'];
 for(const name of names){const el=document.querySelector(name);if(el?.tagName==='SELECT'&&!root.contains(el))return el;}
 return null;
}
function currentLocale(){
 const raw=String(findSelect('language')?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();
 return raw.startsWith('ja')?'ja':raw.startsWith('ar')?'ar':'en';
}
function currentRegion(){
 const raw=String(findSelect('country')?.value||new URLSearchParams(location.search).get('country')||'us').toLowerCase();
 return /^[a-z]{2}$/.test(raw)?raw:'us';
}
function update(){
 const t=i18n[state.language];root.lang=state.language;root.dir=state.language==='ar'?'rtl':'ltr';
 $('mp195-eyebrow').textContent=t.eyebrow;$('mp195-title').innerHTML=t.head[state.duration];$('mp195-lede').innerHTML=t.lede;$('mp195-reassurance').innerHTML=t.reassurance;
 $('mp195-demo-title').textContent=t.demo;$('mp195-demotag').textContent=t.demotag;$('mp195-digit').textContent=String(state.duration).padStart(2,'0');
 $('mp195-list-title').textContent=t.list;$('mp195-up-to').textContent=t.upto;
 $('mp195-demo-footnote').textContent=state.selected?t.chosen.replace('{task}',t.names[state.selected]):t.foot;
 $('mp195-reset').textContent=t.reset;$('mp195-footer-copy').textContent=t.footer;
 $('mp195-footer-store').innerHTML=t.footerStore+' <span aria-hidden="true">↗</span>';
 $$('[data-duration]').forEach(button=>{const duration=Number(button.dataset.duration),active=duration===state.duration;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));button.textContent=t.times[duration];});
 const taskBox=$('mp195-tasks');taskBox.replaceChildren();
 byTime[state.duration].forEach(id=>{const button=document.createElement('button');button.type='button';button.className='mp195-task';button.dataset.task=id;button.setAttribute('aria-pressed',String(state.selected===id));
 const icon=document.createElement('span');icon.className='mp195-task-icon';icon.setAttribute('aria-hidden','true');icon.innerHTML=`<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">${svgs[id]}</svg>`;
 const name=document.createElement('span');name.className='mp195-task-name';name.textContent=t.names[id];
 const mins=document.createElement('span');mins.className='mp195-task-duration';mins.textContent=(state.language==='ar'?String(minutes[id]).replace(/[0-9]/g,d=>'٠١٢٣٤٥٦٧٨٩'[Number(d)]):String(minutes[id]))+t.minutes;
 button.append(icon,name,mins);button.addEventListener('click',()=>{state.selected=id;update()});taskBox.append(button);
 });
 ['mp195-store-top','mp195-footer-store'].forEach(id=>{$(id).href=storeUrl()});
}
function sync(){const lang=currentLocale(),region=currentRegion();if(lang!==state.language||region!==state.region){state.language=lang;state.region=region;update();}}
$$('[data-duration]').forEach(el=>el.addEventListener('click',()=>{const n=Number(el.dataset.duration);if(durations.includes(n)){state.duration=n;state.selected=null;update();}}));
$('mp195-reset').addEventListener('click',()=>{state.duration=5;state.selected=null;update()});
document.addEventListener('change',e=>{if(e.target===findSelect('language')||e.target===findSelect('country'))sync();},true);
window.addEventListener('popstate',sync);
const langSelect=findSelect('language');if(langSelect){const observer=new MutationObserver(sync);observer.observe(langSelect,{attributes:true,childList:true,subtree:true});}
state.language=currentLocale();state.region=currentRegion();update();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
