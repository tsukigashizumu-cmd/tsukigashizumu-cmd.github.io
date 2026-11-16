/* R248 Nokunera. Illustrative one-item stock demo; no persistent storage, network or automatic sensing. */
(()=>{
'use strict';
const ID='nkn248';if(document.getElementById(ID))return;
const messages={
 en:{brand:'NOKUNERA',brandSub:'ONE THING IS ENOUGH',strap:'THE ONE-ITEM METHOD',title:'Stop running out of the one thing you always need.',lead:'Tissues in the living room. A spare box in the cupboard. Start by knowing just one item, where it is and how many are left.',example:'TRY A STOCK MOMENT',samples:['A few left','Running low','Already empty'],panel:'YOUR ONE ITEM',item:'Paper tissues',living:'Living room',storage:'Cupboard',minimum:'Refill threshold',boxes:'boxes',box:'box',totalTitle:'AT HOME, IN TOTAL',remaining:'boxes left',statusOK:'You have more than your minimum.',statusSoon:'At your minimum. Plan a refill.',statusLow:'Below your minimum. Add it to your next shopping list.',statusEmpty:'None left. It is time to restock.',use:'Use one box',add:'Add two boxes',undo:'Undo',reset:'Start over',unavailable:'No box left to use.',invalid:'Enter whole numbers from 0 to 999. The minimum must also be a whole number.',noUndo:'No action to undo.',locations:'WHERE IT IS',memory:'One item. Two locations. No more searching room to room.',last:'Last action',none:'No changes yet',doneUse:'Used one box',doneAdd:'Added two boxes',doneEdit:'Updated your inventory',doneSample:'Loaded a sample',doneUndo:'Undid the last change',lang:'Language',region:'Example',note:'Interactive illustration only. Quantities change only when you enter them. Nothing is saved, scanned, counted automatically or synchronized. No forecast is shown.',app:'See Nokunera on the App Store'},
 ja:{brand:'NOKUNERA',brandSub:'まずは一品だけ',strap:'一品から始める在庫管理',title:'ティッシュがない。また買いに行く前に。',lead:'リビングに何箱、収納棚に何箱。家中を管理しなくても、よく切らす一品の残りが分かるだけで違います。',example:'在庫の場面を試す',samples:['まだ余裕がある','補充が近い','もう在庫がない'],panel:'まずはこの一品',item:'ティッシュ',living:'リビング',storage:'収納棚',minimum:'補充の目安',boxes:'箱',box:'箱',totalTitle:'家にある合計',remaining:'箱残っています',statusOK:'補充の目安より多く残っています。',statusSoon:'補充の目安と同じ数です。買い足しを考えましょう。',statusLow:'補充の目安を下回りました。次の買い物で確認しましょう。',statusEmpty:'在庫は0箱です。買い足す時期です。',use:'1箱使う',add:'2箱買い足す',undo:'元に戻す',reset:'最初から',unavailable:'使える在庫がありません。',invalid:'個数と補充の目安には0〜999の整数を入力してください。',noUndo:'戻せる操作はありません。',locations:'保管場所ごとの残数',memory:'一品だけ。場所は二つ。探し回る時間を少なく。',last:'直前の操作',none:'まだ変更はありません',doneUse:'1箱使いました',doneAdd:'2箱買い足しました',doneEdit:'在庫を変更しました',doneSample:'例を切り替えました',doneUndo:'操作を戻しました',lang:'表示言語',region:'例の地域',note:'このページは操作デモです。数量は手入力でのみ変わり、保存・写真自動認識・自動在庫計測・クラウド同期・消費予測は行いません。',app:'App StoreでNokuneraを見る'},
 ar:{brand:'NOKUNERA',brandSub:'ابدأ بشيء واحد',strap:'ابدأ بصنف واحد فقط',title:'لا تكتشف نفاد المناديل بعد فوات الأوان.',lead:'علبة في غرفة المعيشة وأخرى في الخزانة. ليس عليك تسجيل كل شيء؛ ابدأ بصنف واحد تعرف مكانه والكمية المتبقية منه.',example:'جرّب حالة المخزون',samples:['كمية متوفرة','المخزون منخفض','المخزون نفد'],panel:'صنفك الأول',item:'علب المناديل',living:'غرفة المعيشة',storage:'الخزانة',minimum:'حد إعادة الشراء',boxes:'علب',box:'علبة',totalTitle:'الإجمالي في المنزل',remaining:'علب متبقية',statusOK:'الكمية أعلى من حد إعادة الشراء.',statusSoon:'وصلت إلى حد إعادة الشراء. خطط للتزوّد.',statusLow:'الكمية أقل من الحد. أضفها إلى قائمة التسوق التالية.',statusEmpty:'لا توجد علب متبقية. حان وقت الشراء.',use:'استخدم علبة',add:'أضف علبتين',undo:'تراجع',reset:'إعادة البداية',unavailable:'لا توجد علبة للاستخدام.',invalid:'أدخل أعداداً صحيحة بين 0 و999 للكمية والحد.',noUndo:'لا يوجد إجراء للتراجع عنه.',locations:'أماكن التخزين',memory:'صنف واحد، مكانان، بحث أقل.',last:'آخر إجراء',none:'لم تحدث تغييرات بعد',doneUse:'استُخدمت علبة',doneAdd:'أُضيفت علبتان',doneEdit:'تم تحديث الكمية',doneSample:'تم تحميل مثال',doneUndo:'تم التراجع',lang:'اللغة',region:'المثال',note:'هذا عرض تفاعلي فقط. تتغيّر الكمية بإدخالك فقط. لا حفظ ولا تعرّف تلقائي على الصور أو عدّ تلقائي أو مزامنة أو توقع للاستهلاك.',app:'شاهد Nokunera في App Store'}
};
const params=new URLSearchParams(location.search);
let lang=(params.get('lang')||document.documentElement.lang||'en').slice(0,2).toLowerCase(); if(!messages[lang])lang='en';
let region=(params.get('region')||(lang==='ja'?'JP':'US')).toUpperCase();if(!['US','JP'].includes(region))region='US';
const presets={US:[[3,1,2],[1,0,2],[0,0,2]],JP:[[2,1,2],[1,0,2],[0,0,2]]};
let current=[...presets[region][0]],history=[],active=0,last='none',error='';
const host=document.createElement('section');host.id=ID;host.setAttribute('aria-label','Nokunera one-item inventory demonstration');
(document.querySelector('main')||document.body).appendChild(host);
const tr=()=>messages[lang],q=(s)=>host.querySelector(s),qa=s=>Array.from(host.querySelectorAll(s));
const int=n=>new Intl.NumberFormat(lang==='ar'?'en-US':lang==='ja'?'ja-JP':'en-US').format(n);
function valid(values){return values.length===3&&values.every(v=>Number.isInteger(v)&&v>=0&&v<=999)}
function read(){return qa('[data-nkn-value]').map(el=>el.value.trim()===''?NaN:Number(el.value))}
function remember(){history.push([...current]);if(history.length>50)history.shift()}
function result(){const t=tr();const values=read();if(!valid(values)){error=t.invalid;current=values;paint();return}error='';current=values;paint()}
function paint(){const t=tr(),ok=valid(current),total=ok?current[0]+current[1]:0,minimum=ok?current[2]:0;
 const kind=!ok?'invalid':total===0?'empty':total<minimum?'low':total===minimum?'soon':'ok';
 q('[data-nkn-total]').textContent=ok?int(total):'—';q('[data-nkn-rem]').textContent=t.remaining;
 q('[data-nkn-status]').textContent=!ok?error:({empty:t.statusEmpty,low:t.statusLow,soon:t.statusSoon,ok:t.statusOK})[kind];
 q('[data-nkn-count-living]').textContent=ok?int(current[0]):'—';q('[data-nkn-count-storage]').textContent=ok?int(current[1]):'—';
 q('[data-nkn-scale]').style.width=ok?Math.min(100,total/Math.max(minimum+3,5)*100)+'%':'0%';
 q('[data-nkn-panel]').dataset.state=kind;q('[data-nkn-last]').textContent=t[last]||t.none;
 q('[data-nkn-undo]').disabled=!history.length;
 q('[data-nkn-use]').disabled=!ok||total===0;
 q('[data-nkn-add]').disabled=!ok||current[1]>997;
 qa('[data-nkn-sample]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.nknSample)===active)));
}
function build(){const t=tr();host.lang=lang;host.dir=lang==='ar'?'rtl':'ltr';
 host.innerHTML=`<div class="nkn248-wrap"><header class="nkn248-nav"><div class="nkn248-brand"><span class="nkn248-brandmark" aria-hidden="true"><b></b><b></b><b></b></span><div><strong>NOKUNERA</strong><span>${t.brandSub}</span></div></div><div class="nkn248-switch"><label>${t.lang}<select data-nkn-lang><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label>${t.region}<select data-nkn-region><option value="US">US</option><option value="JP">JP</option></select></label></div></header>
 <div class="nkn248-hero"><div class="nkn248-glow" aria-hidden="true"></div><p class="nkn248-kicker"><i></i>${t.strap}</p><h2>${t.title}</h2><p class="nkn248-lead">${t.lead}</p><div class="nkn248-presets"><small>${t.example}</small><div>${t.samples.map((s,i)=>`<button type="button" data-nkn-sample="${i}" aria-pressed="${active===i}">${s}</button>`).join('')}</div></div></div>
 <div class="nkn248-layout"><div class="nkn248-editor"><div class="nkn248-paneltitle"><span>01</span>${t.panel}</div><div class="nkn248-object"><span class="nkn248-objecticon" aria-hidden="true">▤</span><div><strong>${t.item}</strong><small>01 / HOME ESSENTIAL</small></div></div>
 <div class="nkn248-fields">${[t.living,t.storage,t.minimum].map((s,i)=>`<label class="nkn248-field"><span>${s}</span><div><input data-nkn-value="${i}" type="number" inputmode="numeric" min="0" max="999" step="1" value="${Number.isFinite(current[i])?current[i]:''}" aria-label="${s}"><small>${t.boxes}</small></div></label>`).join('')}</div>
 <div class="nkn248-actions"><button type="button" data-nkn-use class="nkn248-primary">− ${t.use}</button><button type="button" data-nkn-add class="nkn248-secondary">＋ ${t.add}</button></div><div class="nkn248-utilities"><button type="button" data-nkn-undo>${t.undo} ↶</button><button type="button" data-nkn-reset>${t.reset} ↺</button></div></div>
 <div class="nkn248-summary" data-nkn-panel><div class="nkn248-paneltitle"><span>02</span>${t.totalTitle}</div><div class="nkn248-big"><strong data-nkn-total>—</strong><span data-nkn-rem></span></div><div class="nkn248-track"><span data-nkn-scale></span></div><div class="nkn248-status" role="status" aria-live="polite"><span class="nkn248-statusdot"></span><span data-nkn-status></span></div><div class="nkn248-locationhead">${t.locations}</div><div class="nkn248-place"><span>${t.living}</span><b dir="ltr" data-nkn-count-living>—</b></div><div class="nkn248-place"><span>${t.storage}</span><b dir="ltr" data-nkn-count-storage>—</b></div><div class="nkn248-last"><span>${t.last}</span><strong data-nkn-last>${t.none}</strong></div></div></div>
 <footer class="nkn248-footer"><div><b>${t.memory}</b><p>${t.note}</p></div><a href="https://apps.apple.com/us/app/nokunera/id6826459096" rel="noopener noreferrer" target="_blank">${t.app} <span aria-hidden="true">↗</span></a></footer></div>`;
 q('[data-nkn-lang]').value=lang;q('[data-nkn-region]').value=region;
 qa('[data-nkn-value]').forEach(el=>{el.addEventListener('focus',()=>{el.dataset.old=JSON.stringify(current)});el.addEventListener('input',()=>{const v=read();if(valid(v)&&valid(current)&&JSON.stringify(v)!==JSON.stringify(current)){remember();last='doneEdit'}active=-1;result()})});
 qa('[data-nkn-sample]').forEach(el=>el.addEventListener('click',()=>{remember();active=Number(el.dataset.nknSample);current=[...presets[region][active]];last='doneSample';build()}));
 q('[data-nkn-use]').addEventListener('click',()=>{if(!valid(current)||current[0]+current[1]===0)return;remember();if(current[0]>0)current[0]--;else current[1]--;active=-1;last='doneUse';build()});
 q('[data-nkn-add]').addEventListener('click',()=>{if(!valid(current)||current[1]>997)return;remember();current[1]+=2;active=-1;last='doneAdd';build()});
 q('[data-nkn-undo]').addEventListener('click',()=>{if(!history.length)return;current=history.pop();active=-1;last='doneUndo';build()});
 q('[data-nkn-reset]').addEventListener('click',()=>{history=[];active=0;current=[...presets[region][0]];last='none';build()});
 q('[data-nkn-lang]').addEventListener('change',e=>{const v=read();current=v;lang=e.target.value;build()});
 q('[data-nkn-region]').addEventListener('change',e=>{region=e.target.value;history=[];active=0;current=[...presets[region][0]];last='none';build()});
 paint();}
build();
})();
