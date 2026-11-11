/* R137 PuddingScoop: website-only, deterministic illustrative push-your-luck demo. */
(()=>{
'use strict';
const ID='tsz-puddingscoop-r137';
if(document.getElementById(ID))return;
const params=new URLSearchParams(window.location.search);
const detected=(params.get('lang')||document.documentElement.lang||navigator.language||'en').toLowerCase();
const lang=detected.startsWith('ar')?'ar':detected.startsWith('ja')?'ja':'en';
const dict={
 ja:{eyebrow:'PUDDINGSCOOP · 選択を体験',title:'もう一さじ？ それとも、ここでやめる？',intro:'すくうたびに得点が増えます。でも、深追いするとカラメルに当たるかもしれません。',score:'今回の得点',best:'今回のベスト',spoons:'すくった回数',label:'プリンの中へ',hint:'スプーンを右へドラッグ。または「もう一さじ」を押してください。',scoop:'もう一さじ',bank:'ここでやめる',restart:'デモを最初から',prompt:'一さじ目をどうぞ。',got:'＋10点！ ここでやめる？ もう一さじ？',stopped:'ここで終了。得点を確定しました。もう一度遊べます。',caramel:'カラメル！ 今回の得点は0に。次の一回を試しましょう。',reset:'サンプルを初期化しました。',note:'このWebデモは説明用の固定パターンです。実際のゲームの確率・点数・演出とは異なります。記録は保存されず、通信もしません。',again:'もう一回',drag:'すくう範囲',current:'現在のプリン',round:'今回の挑戦'},
 en:{eyebrow:'PUDDINGSCOOP · TRY THE CHOICE',title:'One more scoop—or stop while you can?',intro:'Every scoop earns points, but pushing deeper may hit the caramel. How far will you go?',score:'Round score',best:'Demo best',spoons:'Scoops',label:'Into the pudding',hint:'Drag the spoon to the right, or tap “One more scoop.”',scoop:'One more scoop',bank:'Stop and keep it',restart:'Reset the demo',prompt:'Ready for the first scoop?',got:'+10 points! Stop now—or try another?',stopped:'You stopped and kept your score. Try another round.',caramel:'Caramel! This round drops to zero. Try again.',reset:'Sample reset.',note:'Illustrative fixed pattern only—not the actual app’s odds, scoring or animation. No saved data or network requests.',again:'New round',drag:'Scoop zone',current:'Pudding now',round:'This round'},
 ar:{eyebrow:'PUDDINGSCOOP · جرّب القرار',title:'ملعقة أخرى أم تتوقف الآن؟',intro:'تزداد النقاط مع كل ملعقة، لكن التعمق قد يوصلك إلى الكراميل. هل تواصل؟',score:'نقاط الجولة',best:'أفضل نتيجة في العرض',spoons:'عدد الملاعق',label:'داخل البودينغ',hint:'اسحب الملعقة إلى اليمين، أو اضغط «ملعقة أخرى».',scoop:'ملعقة أخرى',bank:'توقف واحتفظ بالنقاط',restart:'إعادة ضبط العرض',prompt:'هل أنت جاهز للملعقة الأولى؟',got:'10 نقاط إضافية! هل تتوقف أم تواصل؟',stopped:'توقفت واحتفظت بالنقاط. يمكنك تجربة جولة جديدة.',caramel:'الكراميل! خسرت نقاط هذه الجولة. جرّب مجددًا.',reset:'أُعيد ضبط النموذج.',note:'هذا عرض توضيحي بنمط ثابت، وليس احتمالات التطبيق أو نقاطه أو حركته الفعلية. لا يحفظ بيانات ولا يتصل بالشبكة.',again:'جولة جديدة',drag:'منطقة الملعقة',current:'البودينغ الآن',round:'هذه الجولة'}
};
const t=dict[lang];
const el=document.createElement('section'); el.id=ID;el.dir=lang==='ar'?'rtl':'ltr';el.setAttribute('aria-label',t.title);
el.innerHTML=`<header class="ps137-head"><p class="ps137-eyebrow">${t.eyebrow}</p><h2>${t.title}</h2><p class="ps137-intro">${t.intro}</p></header>
<div class="ps137-grid"><div class="ps137-play"><div class="ps137-scene" aria-hidden="true"><div class="ps137-pudding"><div class="ps137-top"></div><div class="ps137-cream"></div><div class="ps137-caramel"></div></div><div class="ps137-spoon" id="ps137-spoon">🥄</div></div>
<div class="ps137-meter"><span>${t.label}</span><strong id="ps137-count">0 / 5</strong></div>
<div class="ps137-track" role="progressbar" aria-label="${t.label}" aria-valuemin="0" aria-valuemax="5" aria-valuenow="0" id="ps137-progress"><span id="ps137-progress-fill"></span></div>
<div class="ps137-swipe" id="ps137-swipe" tabindex="0" role="button" aria-label="${t.drag}"><span>🥄</span><b>${t.hint}</b><span class="ps137-arrow">→</span></div>
</div><div class="ps137-info"><div class="ps137-stats" aria-live="polite"><div class="ps137-stat"><span>${t.score}</span><strong id="ps137-score">0</strong></div><div class="ps137-stat"><span>${t.best}</span><strong id="ps137-best">0</strong></div><div class="ps137-stat"><span>${t.spoons}</span><strong id="ps137-scoops">0</strong></div></div>
<p class="ps137-status" role="status" aria-live="polite" id="ps137-status">${t.prompt}</p><div class="ps137-actions"><button type="button" id="ps137-scoop">${t.scoop}</button><button type="button" id="ps137-bank">${t.bank}</button></div><button type="button" class="ps137-reset" id="ps137-reset">${t.restart}</button></div></div><p class="ps137-note">${t.note}</p>`;
let score=0,best=0,scoops=0,ended=false,round=1;let pointerStart=null;
const by=id=>el.querySelector('#'+id);
const render=message=>{
 by('ps137-score').textContent=String(score);by('ps137-best').textContent=String(best);by('ps137-scoops').textContent=String(scoops);
 by('ps137-count').textContent=scoops+' / 5';by('ps137-progress').setAttribute('aria-valuenow',String(scoops));
 by('ps137-progress-fill').style.width=(scoops/5*100)+'%';
 by('ps137-status').textContent=message||t.prompt;
 by('ps137-scoop').textContent=ended?t.again:t.scoop;
 by('ps137-bank').disabled=ended||score===0;
 el.classList.toggle('ps137-ended',ended);
};
function newRound(){score=0;scoops=0;ended=false;round++;render(t.prompt);}
function scoop(){if(ended){newRound();return;}scoops++;
 if(scoops===5){score=0;ended=true;render(t.caramel);return;}
 score+=10;render(t.got);
}
function bank(){if(ended||score===0)return;best=Math.max(best,score);ended=true;render(t.stopped);}
function reset(){score=0;best=0;scoops=0;ended=false;round=1;render(t.reset);}
by('ps137-scoop').addEventListener('click',scoop);by('ps137-bank').addEventListener('click',bank);by('ps137-reset').addEventListener('click',reset);
const swipe=by('ps137-swipe');
swipe.addEventListener('pointerdown',ev=>{pointerStart={x:ev.clientX,id:ev.pointerId};if(swipe.setPointerCapture)swipe.setPointerCapture(ev.pointerId);});
swipe.addEventListener('pointerup',ev=>{if(pointerStart&&pointerStart.id===ev.pointerId&&Math.abs(ev.clientX-pointerStart.x)>=35)scoop();pointerStart=null;});
swipe.addEventListener('pointercancel',()=>{pointerStart=null;});
swipe.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();scoop();}});
(document.querySelector('main')||document.querySelector('[role=main]')||document.body).appendChild(el);
render(t.prompt);
})();
