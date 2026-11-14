/* R200 P2: approved return deadline calculator; no globals, storage, notifications, tracking or fetch. */
(()=>{'use strict';
const APP='6804756968', MOUNT='tsz-return-deadline-r200';
function findSelect(kind){
 const selectors=kind==='language'?['#p199-language','#p19-language','select[id*="language"]','select[id*="locale"]']:['#p199-country','#p19-country','select[id*="country"]','select[id*="region"]'];
 for(const selector of selectors){const node=document.querySelector(selector);if(node?.tagName==='SELECT'&&!document.getElementById(MOUNT)?.contains(node))return node;}
 return null;
}
function getLang(){const value=String(findSelect('language')?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();return value.startsWith('ja')?'ja':value.startsWith('ar')?'ar':'en';}
function getRegion(){const value=String(findSelect('country')?.value||new URLSearchParams(location.search).get('country')||'us').toLowerCase();return value==='jp'?'jp':'us';}
function init(){
 const target=String(document.body?.dataset.p199Id||document.body?.dataset.p19AppId||'');
 if(target!==APP||document.getElementById(MOUNT))return;
 const anchor=document.querySelector('.p19-breadcrumb');if(!anchor?.parentNode)return;
 const root=document.createElement('section');root.id=MOUNT;
 root.setAttribute('aria-label','Return Deadline Tracker interactive return-date demonstration');
 root.innerHTML="<div class=\"shell\">\n\n<div class=\"r200-main\">\n<section aria-labelledby=\"hero-title\" class=\"hero\">\n<div class=\"hero-copy\">\n<div class=\"eyebrow\"><span class=\"dash\"></span><span data-i18n=\"eyebrow\">THE DATE THAT MATTERS</span></div>\n<h1 id=\"hero-title\"><span data-i18n=\"headlineA\">Know the last day.</span><br/><em data-i18n=\"headlineB\">Before it's too late.</em></h1>\n<p class=\"hero-sub\" data-i18n=\"intro\">Your purchase date. Your store's return window. One clear deadline.</p><a class=\"store-button r200-hero-link\" data-store-link=\"\" href=\"https://apps.apple.com/us/app/return-deadline-tracker/id6804756968\" rel=\"noopener noreferrer\" target=\"_blank\"><span data-i18n=\"store\">View on App Store</span><span aria-hidden=\"true\">↗</span></a>\n<div aria-hidden=\"true\" class=\"scene\">\n<div class=\"scene-halo\"></div><div class=\"shopping-bag\"><div class=\"bag-handle\"></div><div class=\"bag-seam\"></div><div class=\"bag-glyph\">↶</div></div>\n<div class=\"receipt\"><div class=\"receipt-hole\"></div><div class=\"receipt-heading\"></div><div class=\"receipt-line w70\"></div><div class=\"receipt-line w92\"></div><div class=\"receipt-line w60\"></div><div class=\"receipt-line w80\"></div></div>\n<div class=\"calendar-art\"><div class=\"calendar-binding\"></div><div class=\"calendar-month\" data-i18n=\"sceneMonth\">DEC</div><div class=\"calendar-day\">01</div></div>\n</div>\n<div class=\"value-points\" id=\"features\">\n<div><span class=\"value-icon\">◷</span><span data-i18n=\"featOne\">See the last return day</span></div>\n<div><span class=\"value-icon\">▤</span><span data-i18n=\"featTwo\">Track multiple items in the app</span></div>\n<div><span class=\"value-icon\">♧</span><span data-i18n=\"featThree\">Choose reminders in the app</span></div>\n</div>\n</div>\n<div class=\"demo-wrap\" id=\"how\">\n<section aria-label=\"Return deadline calculator\" class=\"calc-panel\" id=\"calculator\">\n<div class=\"panel-head\"><span class=\"panel-eyebrow\" data-i18n=\"panelTitle\">TRY THE DEADLINE CALCULATOR</span><span class=\"demo-pill\" data-i18n=\"demoOnly\">LIVE DEMO</span></div>\n<div class=\"item-block\"><span aria-hidden=\"true\" class=\"item-emoji\" id=\"itemEmoji\">🎧</span><div class=\"item-text\"><span class=\"minor\" data-i18n=\"exampleItem\">EXAMPLE ITEM</span><strong id=\"itemName\">Wireless headphones</strong></div><label class=\"item-select\"><span class=\"sr-only\" data-i18n=\"selectItem\">Choose example item</span><select aria-label=\"Choose example item\" id=\"item\"><option value=\"headphones\">Wireless headphones</option><option value=\"jacket\">Jacket</option><option value=\"gift\">Gift</option></select></label></div>\n<form id=\"demoForm\" novalidate=\"\">\n<div class=\"field-row\"><label for=\"purchaseDate\"><span class=\"form-icon\">▦</span><span data-i18n=\"purchase\">Purchase date</span></label><input id=\"purchaseDate\" max=\"2100-12-31\" min=\"1900-01-01\" required=\"\" type=\"date\" value=\"2026-11-01\"/></div>\n<div class=\"field-row\"><label for=\"windowSize\"><span class=\"form-icon\">◷</span><span data-i18n=\"period\">Return period</span></label><div class=\"period-control\"><input aria-label=\"Return period length\" id=\"windowSize\" max=\"3650\" min=\"1\" required=\"\" step=\"1\" type=\"number\" value=\"30\"/><select aria-label=\"Return period unit\" id=\"windowUnit\"><option value=\"days\">Days</option><option value=\"weeks\">Weeks</option><option value=\"months\">Months</option></select></div></div>\n</form>\n<p class=\"form-error\" hidden=\"\" id=\"error\" role=\"alert\"></p>\n<div aria-atomic=\"true\" aria-live=\"polite\" class=\"result\" id=\"result\">\n<div class=\"dial\" id=\"dial\"><div class=\"dial-inner\"><span class=\"dial-number\" id=\"daysValue\">17</span><span class=\"dial-label\" id=\"daysLabel\">days left</span></div></div>\n<div class=\"result-copy\"><div class=\"result-kicker\" data-i18n=\"deadlineLabel\">LAST RETURN DAY</div><div class=\"deadline\" id=\"deadlineValue\">Dec 1, 2026</div><div class=\"status\"><span class=\"status-dot\"></span><span id=\"statusText\">17 days remain</span></div><button class=\"reset-button\" id=\"reset\" type=\"button\"><span aria-hidden=\"true\">↺</span> <span data-i18n=\"reset\">Reset example</span></button></div>\n</div>\n<div class=\"timeline\" id=\"timeline\"><div class=\"timeline-line\"><span class=\"elapsed-bar\" id=\"elapsedBar\"></span><span class=\"timeline-dot start\"></span><span class=\"timeline-dot today\" id=\"todayDot\"></span><span class=\"timeline-dot end\"></span></div><div class=\"timeline-labels\"><div><span data-i18n=\"tlPurchase\">PURCHASE</span><strong id=\"tlPurchaseDate\">Nov 1</strong></div><div class=\"today-label\"><span data-i18n=\"tlToday\">TODAY</span><strong id=\"tlTodayDate\">Nov 14</strong></div><div><span data-i18n=\"tlDeadline\">DEADLINE</span><strong id=\"tlDeadlineDate\">Dec 1</strong></div></div></div>\n<p class=\"disclaimer\"><span aria-hidden=\"true\">ⓘ</span><span data-i18n=\"disclaimer\">Illustration only. Enter the return period from your retailer's actual policy; return conditions may differ.</span></p>\n</section>\n</div>\n</section>\n<div class=\"bottom-cta\"><div><strong data-i18n=\"ctaHeading\">Don't discover the date after it's passed.</strong><span data-i18n=\"ctaSub\">Keep item deadlines and reminders together in the iPhone app.</span></div><a class=\"store-button store-bottom\" data-store-link=\"\" href=\"https://apps.apple.com/us/app/return-deadline-tracker/id6804756968\" rel=\"noopener noreferrer\" target=\"_blank\"><span data-i18n=\"store\">View on App Store</span><span aria-hidden=\"true\">↗</span></a></div>\n</div>\n<div class=\"r200-footer\"><span>© 2026 Return Deadline Tracker</span><span data-i18n=\"footerNote\">An illustrative web demo; no data is saved or notifications sent.</span></div>\n</div>";
 anchor.insertAdjacentElement('afterend',root);
  const COPY = {
    en: {
      navHow:'How it works', navFeatures:'Features', chooseLanguage:'Language', chooseStore:'App Store region',store:'View on App Store',
      eyebrow:'THE DATE THAT MATTERS',headlineA:'Know the last day.',headlineB:"Before it’s too late.",
      intro:"Your purchase date. Your store’s return window. One clear deadline.",
      sceneMonth:'DEC',featOne:'See the last return day',featTwo:'Track multiple items in the app',featThree:'Choose reminders in the app',
      panelTitle:'TRY THE DEADLINE CALCULATOR',demoOnly:'LIVE DEMO',exampleItem:'EXAMPLE ITEM',selectItem:'Choose example item',
      purchase:'Purchase date',period:'Return period',dayUnit:'Days',weekUnit:'Weeks',monthUnit:'Months',periodInput:'Return period length',periodUnits:'Return period unit',
      deadlineLabel:'LAST RETURN DAY',reset:'Reset example',tlPurchase:'PURCHASE',tlToday:'TODAY',tlDeadline:'DEADLINE',
      disclaimer:"Illustration only. Enter the return period from your retailer’s actual policy; return conditions may differ.",
      ctaHeading:"Don’t discover the date after it’s passed.",ctaSub:'Keep item deadlines and reminders together in the iPhone app.',
      footerNote:'An illustrative web demo; no data is saved or notifications sent.',
      items:{headphones:'Wireless headphones',jacket:'Jacket',gift:'Gift'},
      daysLeft:'days left',daysExpired:'days late',dayDue:'due today',notStarted:'not yet',remaining:n=>`${n} days remain`,
      expired:n=>`Expired ${n} days ago`,dueToday:'Last day to return',future:'Purchase date is in the future',invalidDate:'Enter a valid purchase date (1900–2100).',
      invalidPeriod:'Enter a whole-number return period within the allowed range.',valueError:'Correct the input to calculate a deadline.',
      dayLabel:'day',daysLabel:'days',weekLabel:'week',weeksLabel:'weeks',monthLabel:'month',monthsLabel:'months'
    },
    ja: {
      navHow:'使い方',navFeatures:'機能',chooseLanguage:'言語',chooseStore:'App Storeの地域',store:'App Storeで見る',
      eyebrow:'知っておきたい、最後の一日',headlineA:'返品の最終日を。',headlineB:'手遅れになる前に。',
      intro:'購入日と返品可能期間を入力。最終日と残り日数が、ひと目でわかります。',
      sceneMonth:'12月',featOne:'返品の最終日を計算',featTwo:'複数の商品をアプリで管理',featThree:'アプリで通知を設定',
      panelTitle:'返品期限を試しに計算',demoOnly:'操作デモ',exampleItem:'サンプル商品',selectItem:'商品サンプルを選ぶ',
      purchase:'購入日',period:'返品可能期間',dayUnit:'日',weekUnit:'週',monthUnit:'か月',periodInput:'返品期間の長さ',periodUnits:'期間の単位',
      deadlineLabel:'返品できる最終日',reset:'サンプルに戻す',tlPurchase:'購入日',tlToday:'今日',tlDeadline:'最終日',
      disclaimer:'計算結果はサンプルです。返品条件や日数の数え方は店舗ごとに異なるため、実際の規約をご確認ください。',
      ctaHeading:'期限が過ぎてから気づかないために。',ctaSub:'商品ごとの期限や通知はiPhoneアプリでまとめて管理。',
      footerNote:'このWebデモでは保存や通知を行いません。',
      items:{headphones:'ワイヤレスヘッドホン',jacket:'ジャケット',gift:'ギフト'},
      daysLeft:'日 残り',daysExpired:'日 超過',dayDue:'本日',notStarted:'開始前',remaining:n=>`残り${n}日`,
      expired:n=>`${n}日超過しています`,dueToday:'本日が最終日です',future:'購入日が未来の日付です',invalidDate:'1900〜2100年の有効な購入日を指定してください。',
      invalidPeriod:'指定範囲内の正の整数を入力してください。',valueError:'入力内容を修正すると期限が表示されます。',
      dayLabel:'日',daysLabel:'日',weekLabel:'週',weeksLabel:'週',monthLabel:'か月',monthsLabel:'か月'
    },
    ar: {
      navHow:'كيف يعمل',navFeatures:'المميزات',chooseLanguage:'اللغة',chooseStore:'منطقة App Store',store:'عرض في App Store',
      eyebrow:'اليوم الذي يجب أن تتذكره',headlineA:'اعرف آخر يوم للإرجاع.',headlineB:'قبل فوات الأوان.',
      intro:'تاريخ الشراء وفترة الإرجاع المعتمدة لدى المتجر. موعد نهائي واضح أمامك.',
      sceneMonth:'ديسمبر',featOne:'احسب آخر يوم للإرجاع',featTwo:'تابع عدة مشتريات في التطبيق',featThree:'اختر التذكيرات داخل التطبيق',
      panelTitle:'جرّب حاسبة موعد الإرجاع',demoOnly:'عرض تجريبي',exampleItem:'عنصر تجريبي',selectItem:'اختر المنتج التجريبي',
      purchase:'تاريخ الشراء',period:'فترة الإرجاع',dayUnit:'أيام',weekUnit:'أسابيع',monthUnit:'أشهر',periodInput:'مدة فترة الإرجاع',periodUnits:'وحدة الفترة',
      deadlineLabel:'آخر يوم للإرجاع',reset:'إعادة المثال',tlPurchase:'الشراء',tlToday:'اليوم',tlDeadline:'الموعد النهائي',
      disclaimer:'هذا مثال توضيحي فقط. أدخل الفترة حسب سياسة المتجر الفعلية؛ تختلف الشروط وطريقة احتساب الأيام.',
      ctaHeading:'لا تكتشف الموعد بعد فواته.',ctaSub:'تابع مواعيد المنتجات وتذكيراتها داخل تطبيق iPhone.',
      footerNote:'هذا عرض توضيحي؛ لا يحفظ بياناتك ولا يرسل إشعارات.',
      items:{headphones:'سماعات لاسلكية',jacket:'سترة',gift:'هدية'},
      daysLeft:'يوماً متبقياً',daysExpired:'يوماً متأخراً',dayDue:'اليوم',notStarted:'لم تبدأ',remaining:n=>`متبقٍ ${n} يوماً`,
      expired:n=>`انتهت المدة منذ ${n} يوماً`,dueToday:'اليوم هو آخر يوم للإرجاع',future:'تاريخ الشراء في المستقبل',
      invalidDate:'أدخل تاريخ شراء صحيحاً بين 1900 و2100.',invalidPeriod:'أدخل فترة إرجاع صحيحة كعدد صحيح ضمن الحد المسموح.',valueError:'صحّح الحقول لإظهار الموعد.',
      dayLabel:'يوم',daysLabel:'أيام',weekLabel:'أسبوع',weeksLabel:'أسابيع',monthLabel:'شهر',monthsLabel:'أشهر'
    }
  };
  const LIMITS = {days:3650,weeks:520,months:120};
  const STORE = {us:'https://apps.apple.com/us/app/return-deadline-tracker/id6804756968',jp:'https://apps.apple.com/jp/app/return-deadline-tracker/id6804756968'};
  const $ = id => root.querySelector('[id="'+id+'"]');
  const MS = 86400000;
  function dateUTC(y,m,d){return new Date(Date.UTC(y,m-1,d));}
  function parseDate(s){
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
    const [y,m,d] = s.split('-').map(Number);
    if(y<1900||y>2100||m<1||m>12||d<1||d>31)return null;
    const v=dateUTC(y,m,d);
    if(v.getUTCFullYear()!==y||v.getUTCMonth()!==m-1||v.getUTCDate()!==d)return null;
    return v;
  }
  function iso(d){return [d.getUTCFullYear(),String(d.getUTCMonth()+1).padStart(2,'0'),String(d.getUTCDate()).padStart(2,'0')].join('-');}
  function addDays(date,num){const out=new Date(date.getTime());out.setUTCDate(out.getUTCDate()+num);return out;}
  function addMonths(date,months){const year=date.getUTCFullYear(),month=date.getUTCMonth();const first=new Date(Date.UTC(year,month+months,1));const last=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0)).getUTCDate();return dateUTC(first.getUTCFullYear(),first.getUTCMonth()+1,Math.min(date.getUTCDate(),last));}
  function addPeriod(date,n,unit){return unit==='months'?addMonths(date,n):addDays(date,unit==='weeks'?n*7:n);}
  function todayUTC(){const now=new Date();return dateUTC(now.getFullYear(),now.getMonth()+1,now.getDate());}
  const today=todayUTC();
  const samples={headphones:{emoji:'🎧',date:iso(addDays(today,-13)),size:30,unit:'days'},jacket:{emoji:'🧥',date:iso(addDays(today,-31)),size:30,unit:'days'},gift:{emoji:'🎁',date:iso(addDays(today,-7)),size:7,unit:'days'}};
  let lang='en';
  function number(n){return new Intl.NumberFormat(lang==='ar'?'ar-EG':'en-US',{useGrouping:false}).format(n);}
  function formatted(date,short){
    const locale={en:'en-US',ja:'ja-JP',ar:'ar-EG-u-ca-gregory'}[lang];
    const opts=short?{month:'short',day:'numeric',timeZone:'UTC'}:{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'};
    return new Intl.DateTimeFormat(locale,opts).format(date);
  }
  function setText(id,txt){$(id).textContent=txt;}
  function translatedCopy(){
    root.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;if(typeof COPY[lang][key]==='string')el.textContent=COPY[lang][key];});
    root.lang=lang;
    root.dir=lang==='ar'?'rtl':'ltr';
    $('windowUnit').options[0].textContent=COPY[lang].dayUnit;
    $('windowUnit').options[1].textContent=COPY[lang].weekUnit;
    $('windowUnit').options[2].textContent=COPY[lang].monthUnit;
    ['headphones','jacket','gift'].forEach((key,i)=>{$('item').options[i].textContent=COPY[lang].items[key];});
    $('windowSize').setAttribute('aria-label',COPY[lang].periodInput);
    $('windowUnit').setAttribute('aria-label',COPY[lang].periodUnits);
    $('item').setAttribute('aria-label',COPY[lang].selectItem);

  }
  function showInvalid(message){$('error').hidden=false;setText('error',message);$('result').hidden=true;$('timeline').hidden=true;}
  function render(){
    const t=COPY[lang], item=$('item').value, entry=$('purchaseDate').value, sizeStr=$('windowSize').value.trim(),unit=$('windowUnit').value;
    setText('itemEmoji',samples[item].emoji);setText('itemName',t.items[item]);
    const purchase=parseDate(entry);
    if(!purchase){showInvalid(t.invalidDate);return;}
    const size=Number(sizeStr);
    if(!sizeStr||!Number.isSafeInteger(size)||size<1||size>LIMITS[unit]){showInvalid(t.invalidPeriod);return;}
    $('error').hidden=true;$('result').hidden=false;$('timeline').hidden=false;
    const deadline=addPeriod(purchase,size,unit),remain=Math.round((deadline.getTime()-today.getTime())/MS),daysSince=Math.round((today.getTime()-purchase.getTime())/MS);
    const total=Math.max(1,Math.round((deadline.getTime()-purchase.getTime())/MS));
    const progress=Math.max(0,Math.min(100,Math.round(daysSince/total*100)));
    setText('deadlineValue',formatted(deadline,false));
    setText('tlPurchaseDate',formatted(purchase,true));setText('tlTodayDate',formatted(today,true));setText('tlDeadlineDate',formatted(deadline,true));
    $('elapsedBar').style.width=progress+'%';$('todayDot').style.left=progress+'%';
    $('result').classList.remove('is-expired','is-future');
    if(daysSince<0){setText('daysValue','—');setText('daysLabel',t.notStarted);setText('statusText',t.future);$('result').classList.add('is-future');}
    else if(remain<0){setText('daysValue',number(Math.abs(remain)));setText('daysLabel',t.daysExpired);setText('statusText',t.expired(number(Math.abs(remain))));$('result').classList.add('is-expired');}
    else if(remain===0){setText('daysValue',number(0));setText('daysLabel',t.dayDue);setText('statusText',t.dueToday);}
    else{setText('daysValue',number(remain));setText('daysLabel',t.daysLeft);setText('statusText',t.remaining(number(remain)));}
    $('dial').style.setProperty('--fill',progress+'%');
    root.querySelectorAll('[data-store-link]').forEach(el=>{el.href=STORE[getRegion()];});
  }
  function reset(){const demo=samples[$('item').value];$('purchaseDate').value=demo.date;$('windowSize').value=demo.size;$('windowUnit').value=demo.unit;render();}

  function updateRegion(){root.querySelectorAll('[data-store-link]').forEach(el=>{el.href=STORE[getRegion()];});}
  function sync(){
    const selectedLang=getLang();
    if(selectedLang!==lang){lang=selectedLang;translatedCopy();render();}
    updateRegion();
  }
  $('item').addEventListener('change',reset);
  ['purchaseDate','windowSize','windowUnit'].forEach(id=>{['input','change'].forEach(ev=>$(id).addEventListener(ev,render));});
  $('reset').addEventListener('click',reset);
  $('demoForm').addEventListener('submit',ev=>ev.preventDefault());
  document.addEventListener('change',event=>{if(event.target===findSelect('language')||event.target===findSelect('country'))sync();},true);
  window.addEventListener('popstate',sync);
  for(const kind of ['language','country']){
    const node=findSelect(kind);
    if(node){const observer=new MutationObserver(sync);observer.observe(node,{attributes:true,childList:true,subtree:true});}
  }
  lang=getLang();translatedCopy();reset();updateRegion();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
