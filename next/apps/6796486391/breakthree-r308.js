/* R308 BreakThree LP micro-demo: no external requests, no persistence, no tracking. */
(()=>{'use strict';
const ID='tsz-bt308';if(document.getElementById(ID))return;
const T={
 en:{tag:'A 72-HOUR START · INTERACTIVE DEMO',title:'Not forever. Just the next cigarette.',lead:'A big promise can feel impossible. Prepare one small alternative, then give yourself just 30 seconds. This demonstration does not track real quit time.',progress:'Three candles, one step at a time',day:'Day',prep:'Move the next cigarette out of reach',prepInfo:'A small preparation can create space for a different choice.',ready:'I moved it away',readyDone:'Preparation marked',choose:'Choose something else to do',water:'Drink water',window:'Open a window',walk:'Take a short walk',chosen:'Your alternative',calm:'30 seconds, right now',calmInfo:'A quiet pause. Start when you want. This is not a treatment or medical breathing prescription.',begin:'Start 30 seconds',pause:'Pause',resume:'Resume',again:'Reset',idle:'Ready when you are',running:'One moment at a time',paused:'Paused',done:'30 seconds completed',remaining:'seconds left',none:'Choose an option above',demo:'LP-only demonstration. No account, saving or notifications. The actual app supports preparing alternatives, a 72-hour progress display and a 30-second support screen. For severe withdrawal or illness, seek professional care.'},
 ja:{tag:'最初の72時間 · 操作デモ',title:'一生ではなく、まず次の一本から。',lead:'大きな決意を繰り返すより、次の一本を遠ざける。代わりの行動を決め、吸いたくなった瞬間に30秒だけ立ち止まる体験です。',progress:'3本のろうそく・72時間のイメージ',day:'日目',prep:'次の一本を手の届かない場所へ',prepInfo:'まず、目の前の一本を遠ざける準備から。',ready:'遠ざけた',readyDone:'準備を選択しました',choose:'代わりにできること',water:'水を飲む',window:'窓を開ける',walk:'短く散歩する',chosen:'選んだ行動',calm:'今ここで、30秒。',calmInfo:'静かな休止のデモ。禁煙治療や医学的な呼吸指導ではありません。',begin:'30秒を始める',pause:'一時停止',resume:'再開',again:'最初に戻す',idle:'開始できます',running:'今の30秒に集中',paused:'一時停止中',done:'30秒が終わりました',remaining:'秒',none:'上から一つ選んでください',demo:'LP専用の体験です。記録は保存されず、通知も送信しません。実アプリには72時間表示・準備・30秒サポートがあります。強い離脱症状や体調不良は専門家へご相談ください。'},
 ar:{tag:'أول ٧٢ ساعة · تجربة تفاعلية',title:'ليس إلى الأبد. ابدأ بالسيجارة التالية.',lead:'ابدأ بخطوة صغيرة: أبعد السيجارة التالية، اختر بديلاً، وخذ استراحة لمدة ٣٠ ثانية عند الحاجة.',progress:'ثلاث شمعات · خطوة تلو الأخرى',day:'اليوم',prep:'أبعد السيجارة التالية عن متناولك',prepInfo:'ابدأ بخطوة تحضيرية بسيطة.',ready:'أبعدتها',readyDone:'تم تحديد خطوة التحضير',choose:'اختر بديلاً',water:'اشرب ماءً',window:'افتح نافذة',walk:'امشِ قليلاً',chosen:'خيارك',calm:'٣٠ ثانية الآن',calmInfo:'توقف هادئ فقط، وليس علاجاً أو إرشاداً طبياً للتنفس.',begin:'ابدأ ٣٠ ثانية',pause:'إيقاف مؤقت',resume:'متابعة',again:'إعادة الضبط',idle:'جاهز للبدء',running:'لحظة واحدة كل مرة',paused:'متوقف مؤقتاً',done:'اكتملت ٣٠ ثانية',remaining:'ثانية متبقية',none:'اختر من الأعلى',demo:'هذه تجربة للصفحة فقط. لا تحفظ بيانات ولا ترسل إشعارات. يحتوي التطبيق على التحضير وتقدم ٧٢ ساعة ودعم ٣٠ ثانية. استشر مختصاً عند أعراض الانسحاب الشديدة أو المرض.'}
};
let lang='en',prepared=false,choice='',elapsed=0,startStamp=0,ticker=null,running=false;
const detect=()=>{const el=document.querySelector('#p199-language');const v=(el?.value||document.documentElement.lang||'en').toLowerCase();return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en'};
const n=document.createElement('section');n.id=ID;n.setAttribute('aria-label','BreakThree 72-hour starting steps');
const host=document.querySelector('#overview')||document.querySelector('main')||document.body;host.insertAdjacentElement('afterend',n);
function tr(k){return(T[lang]||T.en)[k]}
function buttons(){return ['water','window','walk'].map(k=>`<button type="button" data-choose="${k}" aria-pressed="${choice===k}">${tr(k)}</button>`).join('')}
function render(){lang=detect();n.dir=lang==='ar'?'rtl':'ltr';n.lang=lang;
 n.innerHTML=`<p class="bt-eyebrow">${tr('tag')}</p><h2>${tr('title')}</h2><p class="bt-lead">${tr('lead')}</p>
 <div class="bt-step"><strong>${tr('progress')}</strong><span class="bt-progress">72h · 3 days</span></div>
 <div class="bt-timeline" aria-label="72-hour symbolic candles">${[1,2,3].map(i=>`<div class="bt-candle" data-lit="${prepared&&i===1}"><span class="bt-wax" aria-hidden="true"></span><span>${tr('day')} ${i}</span></div>`).join('')}</div>
 <div class="bt-grid"><div class="bt-panel"><h3>${tr('prep')}</h3><p class="bt-info">${tr('prepInfo')}</p><button type="button" class="bt-primary" data-ready aria-pressed="${prepared}">${prepared?tr('readyDone'):tr('ready')}</button>
 <h3 style="margin-top:22px">${tr('choose')}</h3><div class="bt-buttons">${buttons()}</div><p class="bt-status" aria-live="polite">${tr('chosen')}: ${choice?tr(choice):tr('none')}</p></div>
 <div class="bt-panel"><h3>${tr('calm')}</h3><p class="bt-info">${tr('calmInfo')}</p><div class="bt-breath" data-active="${running}" aria-hidden="true"><span class="bt-counter" data-count>30</span></div><span class="bt-label">${tr('remaining')}</span><div class="bt-start-row"><button type="button" class="bt-primary" data-start>${running?tr('pause'):elapsed>=30?tr('again'):elapsed>0?tr('resume'):tr('begin')}</button><button type="button" data-reset>${tr('again')}</button></div><p class="bt-status" data-state aria-live="polite">${elapsed>=30?tr('done'):running?tr('running'):elapsed>0?tr('paused'):tr('idle')}</p></div></div>
 <p class="bt-disclaimer">${tr('demo')}</p>`;
 n.querySelector('[data-ready]').addEventListener('click',()=>{prepared=!prepared;render()});
 n.querySelectorAll('[data-choose]').forEach(b=>b.addEventListener('click',()=>{choice=b.dataset.choose;render()}));
 n.querySelector('[data-start]').addEventListener('click',()=>{if(running)pause();else if(elapsed>=30)reset();else resume();render()});
 n.querySelector('[data-reset]').addEventListener('click',()=>{reset();render()}); update();
}
function update(){if(running){elapsed=Math.min(30,(Date.now()-startStamp)/1000);if(elapsed>=30){running=false;clearInterval(ticker);ticker=null;render();return}}const out=n.querySelector('[data-count]');if(out)out.textContent=String(Math.max(0,Math.ceil(30-elapsed)));}
function resume(){if(running)return;running=true;startStamp=Date.now()-elapsed*1000;clearInterval(ticker);ticker=setInterval(update,120)}
function pause(){if(!running)return;elapsed=Math.min(30,(Date.now()-startStamp)/1000);running=false;clearInterval(ticker);ticker=null}
function reset(){running=false;elapsed=0;clearInterval(ticker);ticker=null}
const sel=document.querySelector('#p199-language');if(sel)sel.addEventListener('change',()=>{if(running){update()}render()});
const mo=new MutationObserver(()=>{if(detect()!==lang)render()});mo.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
})();
