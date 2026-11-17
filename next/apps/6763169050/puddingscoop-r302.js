/* R302 PuddingScoop: isolated, deterministic push-your-luck LP sample. No app game logic / persistence. */
(function(){'use strict';
const APP='6763169050';
const words={
 en:{tag:'ONE MORE SCOOP?',head:'One more scoop. Or stop here?',sub:'Every bite adds points. Stop before you touch the caramel. The next scoop might be the one that ends your round.',chip:'INTERACTIVE LP DEMO',label:'DRAG OR TAP TO SCOOP',hint:'Try a short swipe across the pudding — or tap it.',current:'This round',best:'Best banked',progress:'SCOOPS THIS ROUND',msg:'Your points are safe only if you stop in time.',scoop:'Scoop again',bank:'Keep the points',again:'Try another round',start:'Scoop to test your luck.',won:'You stopped in time. Points banked!',lost:'Caramel! This round ends without banking those points.',saved:'Round saved. Try again or visit the full game.',more:'Try one more scoop — or bank what you have.',fine:'A short illustrative LP game, not the app’s exact rules. No score is saved or sent. The actual game and its history are in PuddingScoop.',store:'Play PuddingScoop in the App Store',unit:'pt'},
 ja:{tag:'あとひとすくい？',head:'もう一口。いや、ここでやめる？',sub:'すくうたびに点数は増える。でもカラメルに触れたら、その回は終了。あと一口が、いちばん悩ましい。',chip:'LP専用ミニ体験',label:'ドラッグまたはタップですくう',hint:'プリンを短くなぞるか、タップしてください。',current:'今回の得点',best:'確定した最高点',progress:'今回すくった回数',msg:'得点を残すには、カラメルに触れる前にやめよう。',scoop:'もう一口',bank:'ここでやめる',again:'もう一度',start:'まずはひとすくい。',won:'ちょうどよいところでストップ！得点を確定しました。',lost:'カラメル！今回の得点は確定できませんでした。',saved:'得点を確定しました。もう一回挑戦できます。',more:'もう一口すくう？ それとも今の点数を確定する？',fine:'これはLP専用の簡易体験です。実際のゲームの判定とは異なります。得点の保存・送信は行いません。',store:'App StoreでPuddingScoopを見る',unit:'点'},
 ar:{tag:'ملعقة أخرى؟',head:'ملعقة أخرى… أم تتوقف الآن؟',sub:'تزيد نقاطك مع كل ملعقة. توقف قبل الوصول إلى الكراميل، فقد تكون الملعقة التالية هي الأخيرة.',chip:'تجربة تفاعلية للصفحة',label:'اسحب أو اضغط لأخذ ملعقة',hint:'اسحب لمسافة قصيرة فوق الحلوى أو اضغط عليها.',current:'نقاط الجولة',best:'أفضل نقاط محفوظة',progress:'عدد الملاعق في الجولة',msg:'احتفظ بنقاطك قبل الوصول إلى الكراميل.',scoop:'ملعقة أخرى',bank:'احتفظ بالنقاط',again:'جولة جديدة',start:'ابدأ بملعقة واحدة.',won:'توقفت في الوقت المناسب وحفظت النقاط!',lost:'وصلت إلى الكراميل! انتهت الجولة دون حفظ النقاط.',saved:'تم حفظ نقاط الجولة. جرّب مرة أخرى.',more:'هل تجرّب ملعقة أخرى أم تحتفظ بالنقاط؟',fine:'هذه تجربة مبسطة للصفحة وليست قواعد اللعبة الأصلية. لا تُخزن النقاط أو تُرسل. اللعبة الفعلية وسجلها داخل التطبيق.',store:'شاهد PuddingScoop في App Store',unit:'نقطة'}
};
function el(t,c,text){const n=document.createElement(t);if(c)n.className=c;if(text!==undefined)n.textContent=text;return n;}
function init(){if(document.getElementById('tsz-r302'))return;
 const shell=document.querySelector('.p19-shell');const main=document.querySelector('#p199-content');if(!shell)return;
 const section=el('section');section.id='tsz-r302';section.setAttribute('aria-label','PuddingScoop interactive demonstration');
 section.innerHTML='<div class="r302-top"><div><div class="r302-kicker" data-r302="tag"></div><h2 data-r302="head"></h2><p class="r302-sub" data-r302="sub"></p></div><div class="r302-chip" data-r302="chip"></div></div><div class="r302-grid"><div class="r302-stage"><div class="r302-stage-label" data-r302="label"></div><button type="button" class="r302-pudding" id="r302-scoop" aria-label="Scoop pudding"><span class="r302-plate"></span><span class="r302-custard"></span><span class="r302-bite"></span><span class="r302-spoon" aria-hidden="true">🥄</span></button><div class="r302-caption" data-r302="hint"></div></div><div class="r302-panel"><div class="r302-stats"><div class="r302-stat"><span class="r302-stat-label" data-r302="current"></span><strong id="r302-score" aria-live="polite">0</strong></div><div class="r302-stat"><span class="r302-stat-label" data-r302="best"></span><strong id="r302-best">0</strong></div></div><div class="r302-progress" aria-hidden="true"><span id="r302-meter"></span></div><p class="r302-progress-label"><span data-r302="progress"></span> · <b id="r302-count">0</b></p><div class="r302-status" id="r302-status" role="status" aria-live="polite"></div><div class="r302-actions"><button type="button" id="r302-scoop-small" class="r302-action r302-action-primary" data-r302="scoop"></button><button type="button" id="r302-bank" class="r302-action" data-r302="bank"></button></div><button type="button" id="r302-again" class="r302-action" style="width:100%;margin-top:10px" data-r302="again" hidden></button><a id="r302-store" class="r302-link" href="https://apps.apple.com/us/app/id6763169050" target="_blank" rel="noopener noreferrer" data-r302="store"></a></div></div><p class="r302-fine" data-r302="fine"></p>';
 if(main&&main.parentNode===shell){main.insertAdjacentElement('afterend',section);}else{const foot=shell.querySelector('footer');if(foot)foot.before(section);else shell.append(section);}
 const lookup=k=>section.querySelector('[data-r302="'+k+'"]');let round=0,count=0,score=0,best=0,done=false,message='start';const limits=[5,7,4,6,8];
 function lang(){const select=document.querySelector('#p199-language');const selected=select&&select.value || document.documentElement.lang||'en';return /^ja/i.test(selected)?'ja':/^ar/i.test(selected)?'ar':'en';}
 function store(){const select=document.querySelector('#p199-country');const v=String(select?.value||'us');return /^(jp|ja|japan)/i.test(v)?'jp':'us';}
 function render(){const l=lang(),w=words[l];section.setAttribute('lang',l);section.setAttribute('dir',l==='ar'?'rtl':'ltr');for(const k of Object.keys(w)){const n=lookup(k);if(n)n.textContent=w[k];}
 section.querySelector('#r302-score').textContent=score.toLocaleString(l==='ar'?'ar-EG':l==='ja'?'ja-JP':'en-US')+' '+w.unit;
 section.querySelector('#r302-best').textContent=best.toLocaleString(l==='ar'?'ar-EG':l==='ja'?'ja-JP':'en-US')+' '+w.unit;
 section.querySelector('#r302-count').textContent=String(count);
 section.querySelector('#r302-meter').style.setProperty('--progress',Math.min(100,Math.round(count/limits[round%limits.length]*100))+'%');
 section.querySelector('.r302-pudding').style.setProperty('--eaten',String(count));section.querySelector('.r302-pudding').style.setProperty('--bite',String(count?Math.min(.9,.2+count*.12):0));
 section.querySelector('#r302-status').textContent=w[message];section.querySelector('#r302-scoop').disabled=done;
 section.querySelector('#r302-scoop-small').disabled=done;section.querySelector('#r302-bank').disabled=done||count===0;
 section.querySelector('#r302-again').hidden=!done;section.querySelector('#r302-store').href='https://apps.apple.com/'+store()+'/app/id'+APP;
 section.querySelector('#r302-scoop').setAttribute('aria-label',w.label);
 }
 function scoop(){if(done)return;count++;if(count>=limits[round%limits.length]){score=0;done=true;message='lost';}else{score+=10+count*5;message='more';}render();}
 function bank(){if(done||count===0)return;best=Math.max(best,score);done=true;message='won';render();}
 function again(){round++;count=0;score=0;done=false;message='start';render();}
 const surface=section.querySelector('#r302-scoop');let start=null,suppress=false;
 surface.addEventListener('pointerdown',e=>{start={x:e.clientX,y:e.clientY};});
 surface.addEventListener('pointerup',e=>{if(start&&Math.hypot(e.clientX-start.x,e.clientY-start.y)>=14){suppress=true;scoop();}start=null;});
 surface.addEventListener('click',()=>{if(suppress){suppress=false;return;}scoop();});
 section.querySelector('#r302-scoop-small').addEventListener('click',scoop);section.querySelector('#r302-bank').addEventListener('click',bank);section.querySelector('#r302-again').addEventListener('click',again);
 for(const id of ['p199-language','p199-country'])document.getElementById(id)?.addEventListener('change',render);
 new MutationObserver(()=>{const next=lang();if(section.lang!==next)render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 render();
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init,{once:true});}else init();
})();
