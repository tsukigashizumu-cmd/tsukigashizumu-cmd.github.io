/* TSZ LP R190 — PuddingScoop · illustrative local-only game interaction. */
(() => {
  'use strict';
  const APP = '6763169050', ROOT = 'tsz-puddingscoop-r190';
  if (!document.body || document.getElementById(ROOT)) return;
  const appId = document.body.dataset.p199Id || document.body.dataset.p19AppId || '';
  if (appId && appId !== APP) return;
  if (!appId && !/Pudding\s*Scoop|PuddingScoop|プリンすくい/i.test(document.body.textContent || '')) return;
  const messages = {
    en:{eyebrow:'THE SWEETEST LITTLE RISK',line1:'One more',line2:'scoop?',subtitle:'Stop before the caramel.',score:'YOUR SCORE',scoop:'Scoop again',stop:'Stop here',reset:'Play again',progress:'Scoop progress',instruction:'Drag over the pudding, or choose Scoop again.',steps:'DRAG · SCORE · DECIDE',store:'View on the App Store',disclaimer:'Illustrative gameplay concept. No real-game score rules, saved data, or purchases.',ready:'The next scoop could be the last.',more:'A little more pudding. Do you keep going?',last:'The caramel is close. Stop or risk another scoop.',ended:'Caramel appeared. This sample round is over.',stopped:'You stopped in time. Your sample score is safe.',status:'Sample round status',caramel:'CARAMEL!',guide:'Four additional scoops reveal the caramel in this demo.'},
    ja:{eyebrow:'甘くて小さな駆け引き',line1:'もう一口、',line2:'いく？',subtitle:'カラメルが出る前に、止められる？',score:'スコア',scoop:'もう一口すくう',stop:'ここで止める',reset:'もう一度遊ぶ',progress:'すくった量',instruction:'プリンの上をドラッグ、またはボタンを押してください。',steps:'すくう · 得点 · 決断',store:'App Storeで見る',disclaimer:'説明用デモです。実ゲームの得点・確率・保存機能とは連動しません。',ready:'次の一口で終わるかもしれない。',more:'少しずつすくえた。もう一口いく？',last:'カラメルが近い。ここで止める？',ended:'カラメルが出ました。このデモは終了です。',stopped:'ここで終了。サンプル得点を確定しました。',status:'サンプルの状態',caramel:'カラメル！',guide:'このデモでは追加で4回すくうと終了します。'},
    ar:{eyebrow:'مغامرة حلوة وصغيرة',line1:'ملعقة',line2:'أخرى؟',subtitle:'توقف قبل ظهور الكراميل.',score:'النتيجة',scoop:'ملعقة أخرى',stop:'توقف الآن',reset:'العب مجددًا',progress:'تقدم اللعب',instruction:'اسحب على الحلوى أو اضغط الزر.',steps:'اغرف · اجمع · قرّر',store:'عرض في App Store',disclaimer:'تجربة توضيحية فقط. ليست قواعد التسجيل الحقيقية ولا تحفظ البيانات.',ready:'قد تكون الملعقة التالية الأخيرة.',more:'ملعقة إضافية. هل تواصل؟',last:'الكراميل قريب. هل تتوقف؟',ended:'ظهر الكراميل. انتهت الجولة التجريبية.',stopped:'توقفت في الوقت المناسب. انتهت الجولة.',status:'حالة الجولة التجريبية',caramel:'كراميل!',guide:'تظهر طبقة الكراميل بعد أربع ملاعق إضافية في هذا العرض.'}
  };
  const root = document.createElement('section');
  root.id = ROOT; root.className = 'ps190'; root.setAttribute('aria-labelledby','ps190-heading');
  root.innerHTML = `<div class="ps190-wrap">
    <div class="ps190-mast"><span class="ps190-logo" aria-hidden="true">♜</span><strong>PuddingScoop</strong><span class="ps190-mast-small" data-ps190-i="eyebrow"></span></div>
    <div class="ps190-hero"><div class="ps190-head"><p class="ps190-kicker" data-ps190-i="eyebrow"></p><h2 id="ps190-heading"><span data-ps190-i="line1"></span> <em data-ps190-i="line2"></em></h2><p class="ps190-sub" data-ps190-i="subtitle"></p>
      <div class="ps190-guide"><span aria-hidden="true">✦</span><span data-ps190-i="instruction"></span></div></div>
      <div class="ps190-dessert" id="ps190-dessert" role="button" tabindex="0" aria-label="Sample pudding: drag or press Enter to scoop">
       <div class="ps190-halo" aria-hidden="true"></div><div class="ps190-plate" aria-hidden="true"></div><div class="ps190-pudding" aria-hidden="true"><div class="ps190-caramel-top"></div><div class="ps190-scoop-cut"></div><div class="ps190-caramel-reveal"></div><div class="ps190-pudding-shine"></div></div><div class="ps190-spoon" aria-hidden="true">✦</div>
       <div class="ps190-finish-tag" id="ps190-finish-tag" data-ps190-i="caramel" hidden></div>
      </div>
      <aside class="ps190-panel"><span class="ps190-panel-label" data-ps190-i="score"></span><output id="ps190-score" class="ps190-score" aria-live="polite">240</output><div class="ps190-progress-caption"><span data-ps190-i="progress"></span><strong id="ps190-scoops">6</strong></div><div class="ps190-track"><div id="ps190-fill"></div></div><p class="ps190-status" id="ps190-status" role="status"></p><div class="ps190-actions"><button type="button" id="ps190-scoop" class="ps190-scoop" data-ps190-i="scoop"></button><button type="button" id="ps190-stop" class="ps190-stop" data-ps190-i="stop"></button><button type="button" id="ps190-reset" class="ps190-reset" data-ps190-i="reset"></button></div><small data-ps190-i="guide"></small></aside>
    </div><div class="ps190-bottom"><span class="ps190-steps" data-ps190-i="steps"></span><a id="ps190-store" href="https://apps.apple.com/us/app/id6763169050" rel="noopener noreferrer" target="_blank" data-ps190-i="store"></a></div><p class="ps190-disclaimer" data-ps190-i="disclaimer"></p>
  </div>`;
  const anchor = document.querySelector('.p19-breadcrumb') || document.querySelector('[class*="breadcrumb"]');
  if (anchor && anchor.parentNode) anchor.insertAdjacentElement('afterend',root);
  else {const main=document.querySelector('#p199-content')||document.querySelector('main');if(main)main.insertAdjacentElement('beforebegin',root);else document.body.insertBefore(root,document.body.firstChild);}
  if (!root.isConnected) return;
  const $=s=>root.querySelector(s), $$=s=>Array.from(root.querySelectorAll(s));
  const stage=$('#ps190-dessert'); let count=0, score=240, finished=false, outcome='', pointerStart=null;
  function findSelect(kind) {const list=kind==='language'?['#p199-language','#p19-language','select[id*="language"]','select[id*="locale"]']:['#p199-country','#p19-country','select[id*="country"]','select[id*="region"]'];for(const q of list){const el=document.querySelector(q);if(el?.tagName==='SELECT')return el;}return null;}
  function language(){const select=findSelect('language');const value=String(select?.value || new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en').toLowerCase();return value.startsWith('ja')?'ja':value.startsWith('ar')?'ar':'en';}
  function country(){let value=String(findSelect('country')?.value || new URLSearchParams(location.search).get('country') || 'us').toLowerCase();return /^[a-z]{2}$/.test(value)?value:'us';}
  function render(){const t=messages[language()];root.lang=language();root.dir=language()==='ar'?'rtl':'ltr';$$('[data-ps190-i]').forEach(el=>{el.textContent=t[el.dataset.ps190I];});$('#ps190-score').textContent=String(score);$('#ps190-scoops').textContent=String(6+count);$('#ps190-fill').style.width=String((count/4)*100)+'%';root.style.setProperty('--ps190-consumed',String(Math.min(count,4)));
   root.classList.toggle('ps190-carameled',outcome==='caramel');root.classList.toggle('ps190-done',finished);$('#ps190-finish-tag').hidden=outcome!=='caramel';
   $('#ps190-status').textContent=finished?(outcome==='stop'?t.stopped:t.ended):(count===0?t.ready:count>=3?t.last:t.more);
   $('#ps190-scoop').disabled=finished;$('#ps190-stop').disabled=finished;stage.setAttribute('aria-disabled',String(finished));
   $('#ps190-store').href='https://apps.apple.com/'+country()+'/app/id'+APP;
  }
  function scoop(){if(finished)return;count++;score+=10;if(count>=4){finished=true;outcome='caramel';}render();}
  function stop(){if(finished)return;finished=true;outcome='stop';render();}
  function reset(){count=0;score=240;finished=false;outcome='';render();}
  $('#ps190-scoop').addEventListener('click',scoop);$('#ps190-stop').addEventListener('click',stop);$('#ps190-reset').addEventListener('click',reset);
  stage.addEventListener('pointerdown',e=>{if(finished)return;pointerStart={x:e.clientX,y:e.clientY,id:e.pointerId};});
  stage.addEventListener('pointerup',e=>{if(!pointerStart||finished)return;const start=pointerStart;pointerStart=null;if(start.id!==e.pointerId)return;if(Math.hypot(e.clientX-start.x,e.clientY-start.y)>=16)scoop();});
  stage.addEventListener('pointercancel',()=>{pointerStart=null;});
  stage.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();scoop();}});
  document.addEventListener('change',e=>{if(e.target===findSelect('language')||e.target===findSelect('country'))render();},true);
  window.addEventListener('popstate',render);
  render();
})();
