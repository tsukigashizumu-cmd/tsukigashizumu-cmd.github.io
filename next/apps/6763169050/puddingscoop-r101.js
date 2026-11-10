/* TSZ LP R101 — interactive, nonpersistent illustration. No actual in-app odds. */
(()=>{'use strict';
const ID='tsz-puddingscoop-r101';
const copy={
 ja:{eyebrow:'PUDDINGSCOOP · LP体験デモ',title:'もうひとすくい。それとも、ここでやめる？',intro:'指でプリンをなぞるか、ボタンで一口ずつすくう。点数を確保するか、カラメルが出る前にもう一度挑むか。',stage:'プリンをドラッグして、ひとすくい',score:'今回の得点',scoops:'すくった回数',risk:'次のひとすくいは、どうなる？',ready:'さあ、ひとすくい。最初は安全です。',playing:'ここで確保してもいいし、もう一度すくってもいい。',banked:'ここでストップ！ この回は得点を確保しました。',burnt:'カラメル！ この回の点数はゼロに。',scoop:'ひとすくい',bank:'ここでやめる',again:'もう一度遊ぶ',found:'カラメル！',caption:'このページだけの説明用ゲームです。得点・カラメルの出現順はデモ独自で、実際のアプリの確率や記録ではありません。保存・送信はしません。'},
 en:{eyebrow:'PUDDINGSCOOP · LP PLAY DEMO',title:'One more scoop. Or stop right here?',intro:'Drag across the pudding or press Scoop. Bank your points, or try your luck once more before the caramel appears.',stage:'Drag over the pudding to scoop',score:'This round',scoops:'Scoops',risk:'What will the next scoop bring?',ready:'Give it a scoop. Your first scoop is safe.',playing:'Bank what you have—or risk one more scoop.',banked:'You stopped in time! Points banked for this round.',burnt:'Caramel! This round ends with zero points.',scoop:'Scoop',bank:'Bank points',again:'Play again',found:'CARAMEL!',caption:'Illustrative LP-only game. Points and caramel sequence do not represent the real app’s odds or history. Nothing is saved or transmitted.'},
 ar:{eyebrow:'PUDDINGSCOOP · تجربة توضيحية',title:'مغرفة أخرى؟ أم تتوقف الآن؟',intro:'اسحب على الحلوى أو اضغط زر المغرفة. احتفظ بنقاطك أو جرّب حظك مرة أخرى قبل ظهور الكراميل.',stage:'اسحب على الحلوى لتأخذ مغرفة',score:'نقاط الجولة',scoops:'عدد المغارف',risk:'ماذا تخبئ المغرفة التالية؟',ready:'ابدأ بمغرفة. الأولى آمنة.',playing:'يمكنك الاحتفاظ بالنقاط أو المخاطرة بمغرفة أخرى.',banked:'توقفت في الوقت المناسب! احتفظت بنقاط هذه الجولة.',burnt:'كراميل! انتهت الجولة دون نقاط.',scoop:'مغرفة',bank:'احتفظ بالنقاط',again:'العب مجددًا',found:'كراميل!',caption:'هذه لعبة توضيحية داخل الصفحة فقط. النقاط وترتيب ظهور الكراميل ليسا احتمالات التطبيق الفعلية أو سجله. لا يتم حفظ أي شيء أو إرساله.'}
};
const state={round:0,scoops:0,score:0,phase:'ready',holes:[]};
const caramelAt=[5,4,6]; // Demonstration-only sequence, not actual app probabilities.
let host=null,lang='ja',pointer=null;
function locale(){const s=(document.documentElement.lang||'en').toLowerCase();return s.startsWith('ja')?'ja':s.startsWith('ar')?'ar':'en';}
function escapeText(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function mount(){if(document.getElementById(ID))return;const parent=document.querySelector('main')||document.querySelector('.p19-shell')||document.body;if(!parent)return;
 const section=document.createElement('section');section.id=ID;section.setAttribute('aria-label','PuddingScoop interactive LP demo');section.innerHTML=`<p class="ps101-eyebrow" data-t="eyebrow"></p><h2 data-t="title"></h2><p class="ps101-intro" data-t="intro"></p><div class="ps101-board"><div class="ps101-stage"><div class="ps101-stage-note" data-t="stage"></div><div class="ps101-plate"><div class="ps101-pudding" role="img" aria-label="Pudding play surface" tabindex="0"><div class="ps101-caramel" data-t="found"></div></div></div></div><div class="ps101-control"><div class="ps101-stats"><div class="ps101-stat"><span class="ps101-stat-label" data-t="score"></span><strong class="ps101-score" aria-live="polite">0</strong></div><div class="ps101-stat"><span class="ps101-stat-label" data-t="scoops"></span><strong class="ps101-count">0</strong></div></div><div class="ps101-risk" role="presentation"><span></span></div><span class="ps101-risklabel" data-t="risk"></span><p class="ps101-status" role="status" aria-live="polite"></p><div class="ps101-actions"><button type="button" class="ps101-scoop" data-action="scoop"></button><button type="button" class="ps101-bank" data-action="bank"></button><button type="button" class="ps101-again" data-action="again" hidden></button></div><p class="ps101-caption" data-t="caption"></p></div></div>`;
 parent.appendChild(section);host=section;
 host.addEventListener('click',e=>{const btn=e.target.closest('button[data-action]');if(!btn||!host.contains(btn))return;if(btn.dataset.action==='scoop')scoop();else if(btn.dataset.action==='bank')bank();else if(btn.dataset.action==='again')reset();});
 const pudding=host.querySelector('.ps101-pudding');
 pudding.addEventListener('pointerdown',e=>{if(state.phase==='banked'||state.phase==='burnt')return;pointer={id:e.pointerId,x:e.clientX,y:e.clientY};try{pudding.setPointerCapture(e.pointerId);}catch(_){}});
 pudding.addEventListener('pointerup',e=>{if(!pointer||pointer.id!==e.pointerId)return;const distance=Math.hypot(e.clientX-pointer.x,e.clientY-pointer.y);pointer=null;if(distance>=22)scoop();});
 pudding.addEventListener('pointercancel',()=>{pointer=null;});
 pudding.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();scoop();}});
 render();}
function translate(){if(!host)return;lang=locale();const t=copy[lang];host.dir=lang==='ar'?'rtl':'ltr';host.lang=lang;
 host.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.dataset.t]||'';});
 host.querySelector('.ps101-scoop').textContent=t.scoop;host.querySelector('.ps101-bank').textContent=t.bank;host.querySelector('.ps101-again').textContent=t.again;
 host.querySelector('.ps101-pudding').setAttribute('aria-label',t.stage);
 host.querySelector('.ps101-status').textContent=t[state.phase];}
function render(){if(!host)return;translate();host.querySelector('.ps101-score').textContent=state.score.toLocaleString(lang==='ar'?'ar':lang==='ja'?'ja-JP':'en-US');host.querySelector('.ps101-count').textContent=state.scoops.toLocaleString(lang==='ar'?'ar':lang==='ja'?'ja-JP':'en-US');
 const ended=state.phase==='banked'||state.phase==='burnt';host.querySelector('.ps101-scoop').disabled=ended;host.querySelector('.ps101-bank').disabled=ended||state.scoops===0;
 const again=host.querySelector('.ps101-again');again.hidden=!ended;host.querySelector('.ps101-scoop').hidden=ended;host.querySelector('.ps101-bank').hidden=ended;
 host.querySelector('.ps101-risk span').style.width=Math.min(100,state.scoops*19)+'%';
 const pudding=host.querySelector('.ps101-pudding');pudding.classList.toggle('ps101-ended',ended);pudding.classList.toggle('ps101-burnt',state.phase==='burnt');pudding.querySelectorAll('.ps101-scoop-hole').forEach(el=>el.remove());
 state.holes.forEach((h,i)=>{const dot=document.createElement('span');dot.className='ps101-scoop-hole';dot.style.left=h.x+'%';dot.style.top=h.y+'%';dot.style.setProperty('--twist',(i*35-25)+'deg');pudding.appendChild(dot);});
}
function scoop(){if(!host||state.phase==='banked'||state.phase==='burnt')return;state.scoops++;
 if(state.scoops>=caramelAt[state.round%caramelAt.length]){state.phase='burnt';state.score=0;}else{state.score+=10;state.phase='playing';state.holes.push({x:15+((state.scoops*29)%55),y:32+((state.scoops*17)%42)});}
 render();}
function bank(){if(!host||state.scoops===0||state.phase==='banked'||state.phase==='burnt')return;state.phase='banked';render();}
function reset(){state.round++;state.scoops=0;state.score=0;state.phase='ready';state.holes=[];pointer=null;render();}
function ready(){mount();if(!host)return;const obs=new MutationObserver(()=>{if(locale()!==lang)translate();});obs.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
