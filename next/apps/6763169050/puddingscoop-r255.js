/* R255 PuddingScoop: illustrative, local-only push-your-luck demonstration. */
(function(){'use strict';
const WORDS={
 en:{eyebrow:'PUDDINGSCOOP / THE NEXT SCOOP',title:'One more scoop. Or walk away a winner.',intro:'A tiny game of knowing when to stop. Scoop slowly, bank your points, and discover how quickly one more try can change everything.',lang:'Language',region:'Store region',fake:'ILLUSTRATIVE MINI GAME',round:'ROUND',banked:'BANKED',best:'BEST THIS SESSION',now:'THIS ROUND',guide:'DRAG THE SPOON ACROSS THE PUDDING',guide2:'or press Scoop once for a single bite',pull:'Bank points',scoop:'Scoop again',replay:'New round',restart:'Reset all',tip:'You can stop any time. Reaching caramel loses only the current round’s points.',ready:'A fresh pudding. How far will you go?',bite:'Scoop {n}. Do you keep going?',warning:'The caramel is close. Do you risk another?',win:'You stopped just in time. {n} points saved!',lost:'Caramel! This round’s points are gone.',again:'Fresh pudding ready. Your banked score stays.',resetmsg:'Everything reset for this session.',risk:'DEPTH',safe:'SURFACE',danger:'CARAMEL',bottom:'The suspense is the point.',fine:'Interactive LP illustration, not the app’s real scoring or randomization. Thresholds are sample-only. No accounts, persistent scores, purchases, analytics, or data sent.',visit:'View on the App Store',againHint:'A new round starts without losing banked points.',score:'points',drag:'Drag on pudding',demo:'SAMPLE PLAY'},
 ja:{eyebrow:'PUDDINGSCOOP / あと、ひとすくい',title:'もうひとすくい。それとも、ここでやめる？',intro:'プリンを少しずつすくう。カラメルが見える前に引く。たったそれだけなのに、最後のひとすくいが難しい。',lang:'言語',region:'ストア地域',fake:'体験用ミニゲーム',round:'ラウンド',banked:'確保した点数',best:'このページの最高記録',now:'今回の点数',guide:'プリンの上でスプーンをドラッグ',guide2:'または「ひとすくい」を押してください',pull:'ここで確定',scoop:'ひとすくい',replay:'次のプリン',restart:'すべて初期化',tip:'いつでも引き返せます。カラメルが出ると、今回の点数だけが失われます。',ready:'新しいプリン。どこまで進む？',bite:'{n}回すくった。もう少しいく？',warning:'そろそろカラメル。次に進む？',win:'ここでやめて正解。{n}点を確保しました。',lost:'カラメルに到達！ 今回の点数は失われました。',again:'次のプリンです。確保した点数は残ります。',resetmsg:'このページの記録を初期化しました。',risk:'深さ',safe:'表面',danger:'カラメル',bottom:'やめどきが、いちばん難しい。',fine:'LP用の操作サンプルです。ゲーム本体の得点方式・抽選方式ではありません。すくえる回数は体験用に設定しています。アカウント・記録保存・購入・分析・送信は行いません。',visit:'App Storeで見る',againHint:'次のプリンに進んでも、確保した点数は残ります。',score:'点',drag:'プリン上でドラッグ',demo:'サンプルプレイ'},
 ar:{eyebrow:'PUDDINGSCOOP / الملعقة التالية',title:'ملعقة أخرى... أم تتوقف الآن؟',intro:'اغرف الحلوى شيئًا فشيئًا. احفظ نقاطك قبل ظهور الكراميل. قرار بسيط، لكن التوقف في الوقت المناسب ليس سهلًا.',lang:'اللغة',region:'منطقة المتجر',fake:'لعبة توضيحية',round:'الجولة',banked:'نقاط محفوظة',best:'أفضل نتيجة في الجلسة',now:'نقاط هذه الجولة',guide:'اسحب الملعقة فوق الحلوى',guide2:'أو اضغط زر «اغرف مرة»',pull:'احفظ النقاط',scoop:'اغرف مرة',replay:'جولة جديدة',restart:'إعادة ضبط الكل',tip:'يمكنك التوقف في أي وقت. ظهور الكراميل يمحو نقاط هذه الجولة فقط.',ready:'حلوى جديدة. إلى أي عمق ستصل؟',bite:'الملعقة {n}. هل تريد المتابعة؟',warning:'الكراميل قريب. هل تخاطر بمحاولة أخرى؟',win:'توقفت في الوقت المناسب! حفظت {n} نقطة.',lost:'ظهر الكراميل! ضاعت نقاط هذه الجولة.',again:'جولة جديدة. نقاطك المحفوظة باقية.',resetmsg:'تمت إعادة ضبط نتائج هذه الجلسة.',risk:'العمق',safe:'السطح',danger:'الكراميل',bottom:'المتعة في معرفة متى تتوقف.',fine:'هذه تجربة توضيحية لصفحة التطبيق وليست طريقة احتساب النقاط أو العشوائية الفعلية. حدود المحاولات تجريبية. لا حسابات أو حفظ دائم أو مشتريات أو تحليلات أو إرسال بيانات.',visit:'عرض على App Store',againHint:'يمكنك بدء جولة جديدة دون فقد النقاط المحفوظة.',score:'نقطة',drag:'اسحب فوق الحلوى',demo:'لعبة تجريبية'}
};
const ID='tsz-r255-root';
function init(){
 if(document.getElementById(ID))return;
 const host=document.querySelector('#p199-content .p199-body')||document.querySelector('.p199-body');let root;
 if(host){root=document.createElement('section');root.id=ID;root.className='tsz-r255';host.insertBefore(root,host.querySelector('#related')||null)}
 else{root=document.querySelector('[data-r255-standalone]');if(!root)return;root.id=ID;root.classList.add('tsz-r255')}
 const q=new URLSearchParams(location.search);const s={lang:WORDS[q.get('lang')]?q.get('lang'):'en',region:q.get('region')==='jp'?'jp':'us',round:1,scoops:0,roundScore:0,banked:0,best:0,phase:'playing'};
 const limits=[7,5,8,6,9,5];
 root.innerHTML=`<div class="p-shell"><div class="p-glow p-glow-a" aria-hidden="true"></div><div class="p-glow p-glow-b" aria-hidden="true"></div><header class="p-head"><div class="p-hero"><p class="p-eyebrow" data-t="eyebrow"></p><h2 data-t="title"></h2><p class="p-intro" data-t="intro"></p></div><div class="p-selectors"><label><span data-t="lang"></span><select id="p255-lang" aria-label="Language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="p255-region" aria-label="Region"><option value="us">US</option><option value="jp">JP</option></select></label></div></header><div class="p-board"><div class="p-play"><div class="p-playtop"><span class="p-label p-label-sample" data-t="fake"></span><span class="p-round"><span data-t="round"></span> <b id="p255-round">01</b></span></div><div class="p-stage"><div class="p-stageglow"></div><span class="p-star p-star-one">✦</span><span class="p-star p-star-two">✧</span><span class="p-star p-star-three">✦</span><div class="p-pudding" id="p255-pudding" role="button" tabindex="0" aria-label="Scoop the pudding in this illustrative game"><div class="p-pudding-shadow"></div><div class="p-pudding-base"><div class="p-pudding-rim"></div><div class="p-pudding-face"></div><div class="p-pudding-gloss"></div><div class="p-holes" id="p255-holes"></div><div class="p-caramel" id="p255-caramel" aria-hidden="true"></div></div><div class="p-plate"></div><span class="p-scoop-icon" aria-hidden="true"><span class="p-scoop-head"></span><span class="p-scoop-handle"></span></span></div></div><div class="p-instruction"><b data-t="guide"></b><span data-t="guide2"></span></div><div class="p-depth"><div class="p-depthhead"><span data-t="risk"></span><strong id="p255-depth">0 / 9</strong></div><div class="p-track"><span id="p255-track"></span></div><div class="p-trackends"><span data-t="safe"></span><span data-t="danger"></span></div></div></div><aside class="p-dashboard"><div class="p-topstats"><div class="p-stat"><span data-t="banked"></span><strong id="p255-banked">0</strong></div><div class="p-stat"><span data-t="best"></span><strong id="p255-best">0</strong></div></div><div class="p-focus"><p data-t="now"></p><div class="p-score"><b id="p255-score">0</b><small data-t="score"></small></div><p id="p255-message" class="p-message" role="status" aria-live="polite"></p><div class="p-controls"><button type="button" class="p-mainbutton" id="p255-scoop"><span data-t="scoop"></span><span aria-hidden="true">✦</span></button><button type="button" class="p-bankbutton" id="p255-bank" data-t="pull"></button></div><div class="p-again"><button type="button" id="p255-again" data-t="replay"></button><button type="button" id="p255-reset" data-t="restart"></button></div></div><p class="p-aside-note" data-t="tip"></p><a class="p-store" id="p255-store" rel="noopener noreferrer" target="_blank"><span data-t="visit"></span><span aria-hidden="true">↗</span></a></aside></div><footer class="p-footer"><p class="p-footerline" data-t="bottom"></p><p class="p-fine" data-t="fine"></p></footer></div>`;
 const $=q=>root.querySelector(q), $$=q=>Array.from(root.querySelectorAll(q));
 const t=()=>WORDS[s.lang], limit=()=>limits[(s.round-1)%limits.length];
 function phrase(key,n){return t()[key].replace('{n}',String(n))}
 function setStatus(key,n){s.messageKey=key;s.messageNum=n}
 function paint(){root.dir=s.lang==='ar'?'rtl':'ltr';root.lang=s.lang;
  $$('[data-t]').forEach(el=>{const v=t()[el.dataset.t];if(typeof v==='string')el.textContent=v});
  $('#p255-lang').value=s.lang;$('#p255-region').value=s.region;
  $('#p255-round').textContent=String(s.round).padStart(2,'0');
  $('#p255-banked').textContent=s.banked.toLocaleString(s.lang==='ar'?'ar':s.lang==='ja'?'ja-JP':'en-US');
  $('#p255-best').textContent=String(s.best);$('#p255-score').textContent=String(s.roundScore);
  $('#p255-depth').textContent=s.scoops+' / '+limit();
  $('#p255-track').style.width=(100*s.scoops/limit())+'%';
  $('#p255-message').textContent=phrase(s.messageKey||'ready',s.messageNum||0);
  $('#p255-holes').innerHTML=Array.from({length:Math.min(s.scoops,9)},(_,i)=>`<i class="p-hole p-hole-${i+1}" aria-hidden="true"></i>`).join('');
  $('#p255-pudding').classList.toggle('p-broken',s.phase==='lost');
  $('#p255-pudding').classList.toggle('p-banked',s.phase==='banked');
  $('#p255-scoop').disabled=s.phase!=='playing';$('#p255-bank').disabled=s.phase!=='playing'||s.roundScore===0;
  $('#p255-again').disabled=s.phase==='playing'&&s.scoops===0;
  $('#p255-store').href='https://apps.apple.com/'+s.region+'/app/puddingscoop/id6763169050';
 }
 function scoop(){if(s.phase!=='playing')return;s.scoops+=1;
   if(s.scoops>=limit()){s.roundScore=0;s.phase='lost';setStatus('lost',0)}
   else{s.roundScore+=10;setStatus(s.scoops>=limit()-2?'warning':'bite',s.scoops)}paint()}
 function bank(){if(s.phase!=='playing'||s.roundScore===0)return;s.banked+=s.roundScore;s.best=Math.max(s.best,s.banked);s.phase='banked';setStatus('win',s.roundScore);paint()}
 function next(){s.round+=1;s.scoops=0;s.roundScore=0;s.phase='playing';setStatus('again',0);paint()}
 function reset(){s.round=1;s.scoops=0;s.roundScore=0;s.banked=0;s.best=0;s.phase='playing';setStatus('resetmsg',0);paint()}
 $('#p255-scoop').addEventListener('click',scoop);$('#p255-bank').addEventListener('click',bank);$('#p255-again').addEventListener('click',next);$('#p255-reset').addEventListener('click',reset);
 const pud=$('#p255-pudding');let started=null;
 pud.addEventListener('pointerdown',e=>{started={x:e.clientX,y:e.clientY};try{pud.setPointerCapture(e.pointerId)}catch(_e){}});
 pud.addEventListener('pointerup',e=>{if(started){const d=Math.hypot(e.clientX-started.x,e.clientY-started.y);if(d>=16)scoop();}started=null;});
 pud.addEventListener('pointercancel',()=>{started=null});
 pud.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();scoop()}});
 $('#p255-lang').addEventListener('change',e=>{s.lang=WORDS[e.target.value]?e.target.value:'en';paint()});
 $('#p255-region').addEventListener('change',e=>{s.region=e.target.value==='jp'?'jp':'us';paint()});
 const pgLang=document.querySelector('#p199-language');if(pgLang)pgLang.addEventListener('change',()=>{const v=String(pgLang.value).toLowerCase();s.lang=v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en';paint()});
 const pgCountry=document.querySelector('#p199-country');if(pgCountry)pgCountry.addEventListener('change',()=>{s.region=String(pgCountry.value).toLowerCase().startsWith('jp')?'jp':'us';paint()});
 setStatus('ready',0);paint();
}
if(typeof document!=='undefined'){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init()}
})();
