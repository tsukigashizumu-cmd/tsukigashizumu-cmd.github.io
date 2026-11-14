/* R199 P2: approved Warranty Deadline date demo; no storage, notifications, global DOM modifications or external fetch. */
(()=>{'use strict';
const APP='6804757195',MOUNT='tsz-warranty-deadline-r199';
function init(){
 const target=String(document.body?.dataset.p199Id||document.body?.dataset.p19AppId||'');
 if(target!==APP||document.getElementById(MOUNT))return;
 const anchor=document.querySelector('.p19-breadcrumb');if(!anchor?.parentNode)return;
 const mount=document.createElement('section');mount.id=MOUNT;
 mount.setAttribute('aria-label','Warranty Deadline Tracker interactive date preview');
 mount.innerHTML="<div class=\"site-shell\">\n<div aria-hidden=\"true\" class=\"aura aura-one\"></div><div aria-hidden=\"true\" class=\"aura aura-two\"></div>\n\n<main id=\"wd199-top\">\n<section aria-labelledby=\"wd199-headline\" class=\"hero\">\n<div class=\"hero-copy\">\n<div class=\"eyebrow\"><span class=\"eyebrow-rule\"></span><span data-i18n=\"eyebrow\">PEACE OF MIND, ON A DATE</span></div>\n<h1 data-i18n-html=\"headline\" id=\"wd199-headline\">Before you pay<br/>for a repair.<br/><em>Check the date.</em></h1>\n<p class=\"intro\" data-i18n=\"intro\">Enter the purchase date and warranty length to see the estimated expiry and time remaining, before you decide what to do next.</p>\n<a class=\"primary-link\" data-store-link=\"\" href=\"https://apps.apple.com/us/app/warranty-deadline-tracker/id6804757195\" rel=\"noopener noreferrer\" target=\"_blank\"><span aria-hidden=\"true\" class=\"mini-shield\">◇</span><span data-i18n=\"storeLong\">View on App Store</span><span aria-hidden=\"true\">→</span></a>\n<div class=\"feature-strip\" id=\"wd199-why\"><div><span aria-hidden=\"true\" class=\"feature-icon\">▣</span><span data-i18n=\"benefit1\">See the expiry date</span></div><div><span aria-hidden=\"true\" class=\"feature-icon\">◫</span><span data-i18n=\"benefit2\">Track several products</span></div><div><span aria-hidden=\"true\" class=\"feature-icon\">♧</span><span data-i18n=\"benefit3\">Set app reminders</span></div></div>\n</div>\n<div class=\"demo-column\" id=\"wd199-try\">\n<div class=\"glass-card\">\n<div class=\"card-topline\"><div><span class=\"micro-kicker\" data-i18n=\"demoLabel\">INTERACTIVE DATE PREVIEW</span><h2 data-i18n=\"cardTitle\">Check your warranty</h2></div><div class=\"demo-pill\" data-i18n=\"demoPill\">DEMO</div></div>\n<div aria-label=\"Product examples\" class=\"sample-controls\"><button aria-pressed=\"true\" class=\"sample-button active\" data-sample=\"headphones\" type=\"button\"><span aria-hidden=\"true\" class=\"sample-icon\">♫</span><span data-i18n=\"sampleHeadphones\">Headphones</span></button><button aria-pressed=\"false\" class=\"sample-button\" data-sample=\"coffee\" type=\"button\"><span aria-hidden=\"true\" class=\"sample-icon\">◈</span><span data-i18n=\"sampleCoffee\">Coffee maker</span></button><button aria-pressed=\"false\" class=\"sample-button\" data-sample=\"camera\" type=\"button\"><span aria-hidden=\"true\" class=\"sample-icon\">▣</span><span data-i18n=\"sampleCamera\">Camera</span></button></div>\n<div class=\"input-row\"><label data-i18n=\"purchase\" for=\"wd199-purchase-date\">Purchase date</label><input id=\"wd199-purchase-date\" max=\"2100-12-31\" min=\"2000-01-01\" required=\"\" type=\"date\" value=\"2025-11-20\"/></div>\n<div class=\"input-row\"><label data-i18n=\"length\" for=\"wd199-warranty-months\">Warranty length</label><div class=\"months-input\"><select id=\"wd199-warranty-months\"><option value=\"6\">6 months</option><option value=\"12\">12 months</option><option value=\"18\">18 months</option><option selected=\"\" value=\"24\">24 months</option><option value=\"36\">36 months</option><option value=\"48\">48 months</option><option value=\"60\">60 months</option></select></div></div>\n<div aria-atomic=\"true\" aria-live=\"polite\" class=\"result-surface\">\n<div class=\"donut\" id=\"wd199-ring\" style=\"--pct:52\"><div class=\"donut-inner\"><span class=\"donut-label\" data-i18n=\"remaining\">DAYS LEFT</span><strong class=\"days-number\" id=\"wd199-days-left\">371</strong><span class=\"donut-unit\" data-i18n=\"days\" id=\"wd199-days-unit\">days</span></div></div>\n<div class=\"date-data\"><div class=\"small-label\" data-i18n=\"estimated\">ESTIMATED EXPIRY</div><div class=\"expiry-date\" id=\"wd199-expiry-date\">Nov 20, 2027</div><div class=\"status\" id=\"wd199-coverage-status\"><span class=\"status-light\"></span><span id=\"wd199-status-text\">Estimated warranty time remaining</span></div></div>\n</div>\n<div aria-hidden=\"true\" class=\"timeline\"><div class=\"timeline-track\"><div class=\"timeline-fill\" id=\"wd199-timeline-fill\" style=\"width:48%\"></div><span class=\"timeline-point start\"></span><span class=\"timeline-point today\" id=\"wd199-today-pin\" style=\"inset-inline-start:48%\"></span><span class=\"timeline-point end\"></span></div><div class=\"timeline-labels\"><span data-i18n=\"timelinePurchase\">PURCHASE</span><span data-i18n=\"timelineToday\">TODAY</span><span data-i18n=\"timelineExpiry\">EXPIRY</span></div></div>\n<p class=\"demo-note\" data-i18n=\"demoNote\">Illustrative dates only · This preview does not save items or schedule notifications.</p>\n<div class=\"card-footer\"><span data-i18n=\"terms\">Actual coverage depends on the manufacturer's or seller's terms.</span><button class=\"reset-button\" id=\"wd199-reset-demo\" type=\"button\"><span aria-hidden=\"true\">↺</span><span data-i18n=\"reset\">Reset demo</span></button></div>\n</div>\n</div>\n</section>\n<div aria-hidden=\"true\" class=\"ambient-wave wave-one\"></div><div aria-hidden=\"true\" class=\"ambient-wave wave-two\"></div>\n</main>\n\n</div>";
 anchor.insertAdjacentElement('afterend',mount);
 const root=mount.querySelector('.site-shell');if(!root)return;
 const $=id=>root.querySelector('#wd199-'+id);
 const state={lang:'en',region:'us',sample:'headphones'};
const sampleData={
  headphones:{date:'2025-11-20',months:24},
  coffee:{date:'2026-01-15',months:12},
  camera:{date:'2024-02-29',months:36}
};
const dictionary={
 en:{navTry:'Try the date',navWhy:'Why it matters',store:'App Store',storeLong:'View on App Store',eyebrow:'PEACE OF MIND, ON A DATE',headline:'Before you pay<br>for a repair.<br><em>Check the date.</em>',intro:'Enter the purchase date and warranty length to see the estimated expiry and time remaining, before you decide what to do next.',benefit1:'See the expiry date',benefit2:'Track several products',benefit3:'Set app reminders',demoLabel:'INTERACTIVE DATE PREVIEW',cardTitle:'Check your warranty',demoPill:'DEMO',sampleHeadphones:'Headphones',sampleCoffee:'Coffee maker',sampleCamera:'Camera',purchase:'Purchase date',length:'Warranty length',remaining:'DAYS LEFT',days:'days',estimated:'ESTIMATED EXPIRY',statusActive:'Estimated warranty time remaining',statusExpired:'Estimated warranty date has passed',statusFuture:'Purchase date is in the future',statusInvalid:'Enter a valid purchase date',timelinePurchase:'PURCHASE',timelineToday:'TODAY',timelineExpiry:'EXPIRY',demoNote:'Illustrative dates only · This preview does not save items or schedule notifications.',terms:"Actual coverage depends on the manufacturer's or seller's terms.",reset:'Reset demo',footer:'A small check before a bigger expense.',months:'months',expiredShort:'Expired',invalidShort:'—'},
 ja:{navTry:'日付を試す',navWhy:'使いどころ',store:'App Store',storeLong:'App Storeで見る',eyebrow:'修理の前に、日付を確認',headline:'修理代を払う前に。<br><em>保証期限を確認。</em>',intro:'購入日と保証期間を入力するだけ。保証の満了予定日と残り日数を確認してから、次の行動を考えられます。',benefit1:'満了予定日を確認',benefit2:'複数の商品を管理',benefit3:'アプリで通知設定',demoLabel:'期限を試せるデモ',cardTitle:'保証期限を確認',demoPill:'デモ',sampleHeadphones:'ヘッドホン',sampleCoffee:'コーヒーメーカー',sampleCamera:'カメラ',purchase:'購入日',length:'保証期間',remaining:'残り日数',days:'日',estimated:'保証満了の予定日',statusActive:'保証期間内の見込み',statusExpired:'保証の予定日を経過',statusFuture:'購入日が未来です',statusInvalid:'正しい購入日を入力してください',timelinePurchase:'購入',timelineToday:'今日',timelineExpiry:'満了',demoNote:'例示用のデモです。Web上では保存や通知設定は行いません。',terms:'実際の保証条件はメーカー・販売店の規約をご確認ください。',reset:'デモを戻す',footer:'大きな出費の前に、小さな確認を。',months:'か月',expiredShort:'期限経過',invalidShort:'—'},
 ar:{navTry:'جرّب التاريخ',navWhy:'لماذا يفيد؟',store:'App Store',storeLong:'عرض في App Store',eyebrow:'اطمئنان يبدأ بتاريخ',headline:'قبل أن تدفع للإصلاح،<br><em>تحقّق من تاريخ الضمان.</em>',intro:'أدخل تاريخ الشراء ومدة الضمان لرؤية تاريخ الانتهاء المتوقع والوقت المتبقي قبل اتخاذ قرارك.',benefit1:'اعرف تاريخ الانتهاء',benefit2:'تابع عدة منتجات',benefit3:'اضبط تذكيرات التطبيق',demoLabel:'تجربة تفاعلية للتاريخ',cardTitle:'تحقّق من ضمانك',demoPill:'تجربة',sampleHeadphones:'سماعات',sampleCoffee:'آلة قهوة',sampleCamera:'كاميرا',purchase:'تاريخ الشراء',length:'مدة الضمان',remaining:'الأيام المتبقية',days:'يومًا',estimated:'تاريخ الانتهاء المتوقع',statusActive:'الضمان ساري وفق الحساب التقريبي',statusExpired:'انقضى تاريخ الضمان المتوقع',statusFuture:'تاريخ الشراء في المستقبل',statusInvalid:'أدخل تاريخ شراء صحيحًا',timelinePurchase:'الشراء',timelineToday:'اليوم',timelineExpiry:'الانتهاء',demoNote:'تواريخ توضيحية فقط · لا تحفظ هذه المعاينة العناصر ولا ترسل تذكيرات.',terms:'تعتمد التغطية الفعلية على شروط الشركة المصنعة أو البائع.',reset:'إعادة التجربة',footer:'فحص صغير قبل نفقات أكبر.',months:'شهرًا',expiredShort:'انتهى',invalidShort:'—'}
};
const MS_PER_DAY=86400000;
function parseDate(value){
 const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(value||''); if(!m)return null;
 const y=Number(m[1]),mo=Number(m[2]),d=Number(m[3]); if(y<2000||y>2100)return null;
 const ms=Date.UTC(y,mo-1,d),obj=new Date(ms);
 return obj.getUTCFullYear()===y&&obj.getUTCMonth()===mo-1&&obj.getUTCDate()===d?obj:null;
}
function addMonthsClamped(date,months){
 const y=date.getUTCFullYear(),m=date.getUTCMonth(),d=date.getUTCDate();
 const first=new Date(Date.UTC(y,m+months,1));
 const lastOfMonth=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0)).getUTCDate();
 return new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth(),Math.min(d,lastOfMonth)));
}
function todayUTC(){const x=new Date();return new Date(Date.UTC(x.getFullYear(),x.getMonth(),x.getDate()));}
function text(key){return dictionary[state.lang][key];}
function dateLabel(date){return new Intl.DateTimeFormat(({en:'en-US',ja:'ja-JP',ar:'ar'})[state.lang],{day:'numeric',month:state.lang==='ja'?'long':'short',year:'numeric',timeZone:'UTC',calendar:'gregory'}).format(date);}
function renderResult(){
 const start=parseDate($('purchase-date').value),months=Number($('warranty-months').value),ring=$('ring'),status=$('coverage-status');
 if(!start||!Number.isInteger(months)||months<1||months>120){
  $('expiry-date').textContent=text('invalidShort');$('days-left').textContent='—';
  $('status-text').textContent=text('statusInvalid');status.className='status expired';
  ring.style.setProperty('--p','0%');$('timeline-fill').style.width='0%';$('today-pin').style.insetInlineStart='0%';return;
 }
 const expiry=addMonthsClamped(start,months),today=todayUTC();
 const duration=Math.max(1,Math.round((expiry-start)/MS_PER_DAY));
 const elapsed=Math.round((today-start)/MS_PER_DAY),remaining=Math.round((expiry-today)/MS_PER_DAY);
 const percentRemaining=Math.max(0,Math.min(100,remaining/duration*100));
 const percentElapsed=Math.max(0,Math.min(100,elapsed/duration*100));
 $('expiry-date').textContent=dateLabel(expiry);
 $('days-left').textContent=new Intl.NumberFormat(state.lang==='ar'?'ar':state.lang==='ja'?'ja-JP':'en-US').format(Math.max(0,remaining));
 $('days-unit').textContent=remaining<=0?text('expiredShort'):text('days');
 status.className='status'+(remaining<0?' expired':elapsed<0?' future':'');
 $('status-text').textContent=remaining<0?text('statusExpired'):elapsed<0?text('statusFuture'):text('statusActive');
 ring.style.setProperty('--p',percentRemaining.toFixed(2)+'%');
 $('timeline-fill').style.width=percentElapsed.toFixed(2)+'%';
 $('today-pin').style.insetInlineStart=percentElapsed.toFixed(2)+'%';
}

function renderLocale(){
 mount.lang=state.lang;mount.dir=state.lang==='ar'?'rtl':'ltr';
 for(const node of root.querySelectorAll('[data-i18n]'))node.textContent=text(node.dataset.i18n);
 for(const node of root.querySelectorAll('[data-i18n-html]'))node.innerHTML=text(node.dataset.i18nHtml);
 for(const option of $('warranty-months').options)option.textContent=option.value+' '+text('months');
 renderResult();
}
function setSample(name){
 if(!sampleData[name])return;
 state.sample=name;
 $('purchase-date').value=sampleData[name].date;
 $('warranty-months').value=String(sampleData[name].months);
 for(const button of root.querySelectorAll('.sample-button')){
  const active=button.dataset.sample===name;
  button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));
 }
 renderResult();
}
function updateRegion(){
 const region=state.region;
 for(const a of root.querySelectorAll('[data-store-link]'))a.href=`https://apps.apple.com/${region}/app/warranty-deadline-tracker/id${APP}`;
}
function findSelect(kind){
 const selectors=kind==='language'?['#p199-language','#p19-language','select[id*="language"]','select[id*="locale"]']:['#p199-country','#p19-country','select[id*="country"]','select[id*="region"]'];
 for(const selector of selectors){const node=document.querySelector(selector);if(node?.tagName==='SELECT'&&!mount.contains(node))return node;}
 return null;
}
function getLang(){
 const value=String(findSelect('language')?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();
 return value.startsWith('ja')?'ja':value.startsWith('ar')?'ar':'en';
}
function getRegion(){
 const value=String(findSelect('country')?.value||new URLSearchParams(location.search).get('country')||'us').toLowerCase();
 return value==='jp'?'jp':'us';
}
function sync(){
 const lang=getLang(),region=getRegion();
 if(state.lang===lang&&state.region===region)return;
 state.lang=lang;state.region=region;
 renderLocale();updateRegion();
}
$('purchase-date').addEventListener('change',renderResult);
$('purchase-date').addEventListener('input',renderResult);
$('warranty-months').addEventListener('change',renderResult);
for(const b of root.querySelectorAll('.sample-button'))b.addEventListener('click',()=>setSample(b.dataset.sample));
$('reset-demo').addEventListener('click',()=>setSample('headphones'));
document.addEventListener('change',event=>{
 if(event.target===findSelect('language')||event.target===findSelect('country'))sync();
},true);
window.addEventListener('popstate',sync);
for(const kind of ['language','country']){
 const node=findSelect(kind);
 if(node){const observer=new MutationObserver(sync);observer.observe(node,{attributes:true,childList:true,subtree:true});}
}
renderLocale();updateRegion();sync();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
