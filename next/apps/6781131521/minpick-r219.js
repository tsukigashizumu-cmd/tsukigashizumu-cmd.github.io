/* TSZ LP R219 Minpick — website-only finite task-fitting demo. No user task storage. */
(() => {
  'use strict';
  const APP='6781131521', ROOT_ID='tsz-minpick-r219';
  const body=document.body;
  if(!body || (body.dataset.p199Id||body.dataset.p19AppId)!==APP || document.getElementById(ROOT_ID))return;
  const main=document.querySelector('main'); if(!main)return;
  const text={
    en:{brand:'MINPICK  /  A SMALL WINDOW OF TIME',eyebrow:'MAKE ROOM FOR THE MOMENT',title:'You have five minutes. Spend them doing, not deciding.',lede:'Pick the time you actually have. See up to three small things that could fit. The choice is still yours.',step1:'01  HOW MUCH TIME?',minute:'min',step2:'02  FILTER IF YOU WANT',category:'Category',all:'Everything',work:'Work',home:'Home',personal:'Personal',priority:'Priority',any:'Any priority',important:'High priority',step3:'03  PICK ONE — OR NONE',match:'TASKS THAT COULD FIT',matches:'matches',limit:'Up to 3 shown',none:'Nothing in the sample fits this time and filter. Try another duration or category.',rest:'Choose rest instead',back:'Show the options',restTitle:'Rest is also a choice.',restText:'You don’t have to fill every free minute. Come back when a little time opens up.',done:'Mark done',doneNotice:'Nice. That item is out of this demo list.',reset:'Reset sample',note:'Illustrative website demo with sample tasks only. No account, reminders, task records or device data are created here. The real app can keep your own tasks on your device.',app:'Explore Minpick on the App Store',language:'Language',region:'App Store region',footer:'Less time choosing. More freedom to choose.',empty:'Nothing has to be done right now.',tasks:['Reply to one message','Water the plants','Clear the desk','Review a few notes','Stretch for a moment','Sort receipts','Plan tomorrow','Refill a water bottle']},
    ja:{brand:'MINPICK  /  ちょっと空いた時間',eyebrow:'選ぶだけで時間を失わない',title:'5分あった。決めている間に、終わってしまった。',lede:'いま使える時間を選ぶと、収まりそうな用事を最大3つだけ表示。選ぶのは、いつもあなた。',step1:'01  いま何分ある？',minute:'分',step2:'02  必要な時だけ絞る',category:'カテゴリ',all:'すべて',work:'仕事',home:'家のこと',personal:'自分のこと',priority:'優先度',any:'指定なし',important:'高いものだけ',step3:'03  ひとつ選ぶ。選ばなくてもいい。',match:'今の時間に収まりそうな用事',matches:'件が候補',limit:'最大3件を表示',none:'この条件に合うサンプル用事はありません。時間やカテゴリを変えてください。',rest:'今日は休む',back:'候補をもう一度見る',restTitle:'休むことも、ひとつの選択。',restText:'空いた時間を全部、何かで埋めなくていい。また時間ができた時に選べばいい。',done:'完了にする',doneNotice:'このデモの候補から外しました。',reset:'サンプルを戻す',note:'Web上のサンプル用事だけを使う体験デモです。ここではアカウント、通知、記録、端末データを作成・保存しません。実際のアプリでは自分の用事を端末内に保存できます。',app:'App StoreでMinpickを見る',language:'言語',region:'App Store地域',footer:'決める時間を短く。選ぶ自由はそのまま。',empty:'今、何もしなくたっていい。',tasks:['ひとつ返信する','植物に水をやる','机を片づける','ノートを見返す','少しストレッチ','レシートを整理','明日の予定を考える','水を補充する']},
    ar:{brand:'MINPICK  /  وقت صغير لك',eyebrow:'اترك مساحة للحظة',title:'لديك خمس دقائق. لا تستهلكها كلها في الاختيار.',lede:'اختر الوقت المتاح لك. شاهد حتى ثلاث مهام قد تناسبه. القرار يبقى لك.',step1:'01  كم دقيقة لديك؟',minute:'د',step2:'02  صفِّ المهام عند الحاجة',category:'الفئة',all:'الكل',work:'العمل',home:'المنزل',personal:'شخصي',priority:'الأولوية',any:'أي أولوية',important:'عالية فقط',step3:'03  اختر واحدة أو لا شيء',match:'مهام قد تناسب وقتك',matches:'مهام مناسبة',limit:'نعرض حتى ثلاث',none:'لا توجد مهمة تجريبية توافق هذه الشروط. غيّر الوقت أو الفئة.',rest:'أفضّل الراحة',back:'عرض الخيارات مجددًا',restTitle:'الراحة خيار أيضًا.',restText:'لست مضطرًا إلى ملء كل دقيقة بشيء. عد عندما يتوفر لك وقت آخر.',done:'تمت',doneNotice:'أُزيلت المهمة من قائمة العرض التجريبي.',reset:'إعادة المثال',note:'تجربة توضيحية بمهام نموذجية فقط. لا تُنشئ هذه الصفحة حسابًا أو تذكيرات أو سجلات أو بيانات على جهازك. يمكن للتطبيق الفعلي حفظ مهامك على الجهاز.',app:'استكشف Minpick على App Store',language:'اللغة',region:'منطقة App Store',footer:'وقت أقل في الحيرة. وحرية أكبر في الاختيار.',empty:'ليس عليك فعل أي شيء الآن.',tasks:['الرد على رسالة واحدة','سقي النباتات','ترتيب المكتب','مراجعة ملاحظات','تمدد قليلًا','ترتيب الإيصالات','التخطيط للغد','ملء زجاجة ماء']}
  };
  // The array is purposefully small and local. The app does not retrieve user tasks.
  const sample=[
    {id:0,minutes:3,cat:'work',priority:'medium'},
    {id:1,minutes:4,cat:'home',priority:'low'},
    {id:2,minutes:5,cat:'home',priority:'medium'},
    {id:3,minutes:8,cat:'work',priority:'high'},
    {id:4,minutes:3,cat:'personal',priority:'low'},
    {id:5,minutes:10,cat:'home',priority:'high'},
    {id:6,minutes:12,cat:'work',priority:'high'},
    {id:7,minutes:2,cat:'personal',priority:'low'}
  ];
  const normLang=v=>/^ar(?:$|[-_])/i.test(v||'')?'ar':/^ja(?:$|[-_])/i.test(v||'')?'ja':'en';
  const normRegion=v=>/^(jp|japan|ja-jp)$/i.test(v||'')?'jp':'us';
  const selections={language:'#p199-language,#p19-language,#minpick-language,#mp195-language,#mp159-language,#mp131-language,#mp97-language,#mp56-language',region:'#p199-country,#p19-country,#minpick-country,#mp195-country,#mp159-country,#mp131-country,#mp97-country,#mp56-country'};
  let root;
  function host(kind){for(const sel of selections[kind].split(',')){const el=document.querySelector(sel);if(el&&(!root||!root.contains(el))&&el.tagName==='SELECT')return el;}return null;}
  const getLanguage=()=>host('language')?normLang(host('language').value):'en';
  const getRegion=()=>host('region')?normRegion(host('region').value):'us';
  let lang=getLanguage(),region=getRegion(),minutes=5,cat='all',priority='any',resting=false,done=new Set(),syncing=false;
  root=document.createElement('section');root.id=ROOT_ID;root.setAttribute('aria-label','Minpick time-based sample task selection');
  root.innerHTML=`<div class="mp219-shell">
   <div class="mp219-top"><span class="mp219-mark" aria-hidden="true">✳</span><span data-t="brand"></span><span class="mp219-r">R219 / 2026</span></div>
   <div class="mp219-hero"><span class="mp219-eyebrow" data-t="eyebrow"></span><h2 data-t="title"></h2><p data-t="lede"></p></div>
   <div class="mp219-grid">
    <div class="mp219-control">
     <div class="mp219-step" data-t="step1"></div><div class="mp219-times" role="group" aria-label="Available minutes"><button type="button" data-min="3">03 <small>MIN</small></button><button type="button" data-min="5">05 <small>MIN</small></button><button type="button" data-min="10">10 <small>MIN</small></button><button type="button" data-min="15">15 <small>MIN</small></button></div>
     <div class="mp219-step mp219-step2" data-t="step2"></div>
     <label class="mp219-select"><span data-t="category"></span><select id="mp219-category"><option value="all" data-t="all"></option><option value="work" data-t="work"></option><option value="home" data-t="home"></option><option value="personal" data-t="personal"></option></select></label>
     <label class="mp219-select"><span data-t="priority"></span><select id="mp219-priority"><option value="any" data-t="any"></option><option value="high" data-t="important"></option></select></label>
     <div class="mp219-tiny">◌ <span data-t="limit"></span></div>
     <div class="mp219-control-bottom"><button type="button" id="mp219-reset" data-t="reset"></button><button type="button" id="mp219-rest" data-t="rest"></button></div>
    </div>
    <div class="mp219-result" aria-live="polite">
     <div class="mp219-result-header"><span class="mp219-step" data-t="step3"></span><span class="mp219-count" id="mp219-count"></span></div>
     <div class="mp219-time-orb"><div class="mp219-orb-glow"></div><div class="mp219-time-main"><strong id="mp219-orb-value">05</strong><span data-t="minute"></span></div><span class="mp219-orb-ring"></span></div>
     <div class="mp219-tasks-title"><span data-t="match"></span><span id="mp219-cap" data-t="limit"></span></div>
     <div id="mp219-results" class="mp219-task-list"></div>
     <div id="mp219-rest-panel" class="mp219-rest-panel" hidden><span class="mp219-rest-icon" aria-hidden="true">☾</span><h3 data-t="restTitle"></h3><p data-t="restText"></p><button type="button" id="mp219-back" data-t="back"></button></div>
     <p id="mp219-empty" class="mp219-empty" data-t="none" hidden></p>
     <p id="mp219-notice" class="mp219-notice" data-t="doneNotice" hidden></p>
    </div>
   </div>
   <div class="mp219-foot"><div><h3 data-t="footer"></h3><p data-t="note"></p></div><div class="mp219-foot-right"><div class="mp219-locales"><label><span data-t="language"></span><select id="mp219-language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="mp219-region"><option value="us">US</option><option value="jp">JP</option></select></label></div><a id="mp219-store" target="_blank" rel="noopener noreferrer"><span data-t="app"></span><span aria-hidden="true">↗</span></a></div></div>
  </div>`;
  main.prepend(root);
  const $=s=>root.querySelector(s);
  function candidates(){const weights={high:3,medium:2,low:1};return sample.filter(t=>!done.has(t.id)&&t.minutes<=minutes&&(cat==='all'||cat===t.cat)&&(priority!=='high'||t.priority==='high')).sort((a,b)=>weights[b.priority]-weights[a.priority]||a.minutes-b.minutes||a.id-b.id);}
  function render(){
    const t=text[lang];root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.dataset.t]||'';});
    $('#mp219-language').value=lang;$('#mp219-region').value=region;$('#mp219-category').value=cat;$('#mp219-priority').value=priority;
    $('#mp219-store').href='https://apps.apple.com/'+(region==='jp'?'jp':'us')+'/app/minpick/id6781131521';
    root.querySelectorAll('[data-min]').forEach(btn=>{const chosen=Number(btn.dataset.min)===minutes;btn.setAttribute('aria-pressed',String(chosen));});
    $('#mp219-orb-value').textContent=String(minutes).padStart(2,'0');
    const list=$('#mp219-results');list.replaceChildren();const filtered=candidates();const shown=filtered.slice(0,3);
    $('#mp219-count').textContent=String(filtered.length)+' '+t.matches;
    $('#mp219-empty').hidden=resting||filtered.length>0;$('#mp219-rest-panel').hidden=!resting;
    $('#mp219-notice').hidden=true;$('#mp219-cap').hidden=resting;
    $('.mp219-time-orb').classList.toggle('mp219-orb-rest',resting);
    if(!resting){for(const task of shown){const item=document.createElement('div');item.className='mp219-task';item.dataset.taskId=String(task.id);
       const label=document.createElement('div');label.className='mp219-task-main';const name=document.createElement('strong');name.textContent=t.tasks[task.id];const meta=document.createElement('span');meta.textContent=t[task.cat]+' · '+task.minutes+' '+t.minute;label.append(name,meta);
       const doneButton=document.createElement('button');doneButton.type='button';doneButton.className='mp219-done';doneButton.dataset.done=String(task.id);doneButton.setAttribute('aria-label',t.done+': '+t.tasks[task.id]);doneButton.textContent='✓';
       item.append(label,doneButton);list.append(item);
    }}
    list.hidden=resting;
    $('#mp219-rest').textContent=resting?t.back:t.rest;
  }
  function syncHost(kind){if(syncing)return;const el=host(kind);if(!el)return;const value=kind==='language'?lang:region;const option=[...el.options].find(o=>(kind==='language'?normLang(o.value):normRegion(o.value))===value);if(!option||el.value===option.value)return;syncing=true;try{el.value=option.value;el.dispatchEvent(new Event('change',{bubbles:true}));}finally{syncing=false;}}
  function wireHost(kind){const el=host(kind);if(!el)return;el.addEventListener('change',()=>{if(syncing)return;if(kind==='language')lang=normLang(el.value);else region=normRegion(el.value);render();});}
  root.querySelectorAll('[data-min]').forEach(btn=>btn.addEventListener('click',()=>{minutes=Number(btn.dataset.min);resting=false;render();}));
  $('#mp219-category').addEventListener('change',()=>{cat=$('#mp219-category').value;resting=false;render();});
  $('#mp219-priority').addEventListener('change',()=>{priority=$('#mp219-priority').value;resting=false;render();});
  $('#mp219-reset').addEventListener('click',()=>{minutes=5;cat='all';priority='any';done.clear();resting=false;render();});
  $('#mp219-rest').addEventListener('click',()=>{resting=!resting;render();});
  $('#mp219-back').addEventListener('click',()=>{resting=false;render();});
  $('#mp219-results').addEventListener('click',e=>{const btn=e.target.closest('[data-done]');if(!btn)return;done.add(Number(btn.dataset.done));render();$('#mp219-notice').hidden=false;});
  $('#mp219-language').addEventListener('change',()=>{lang=normLang($('#mp219-language').value);syncHost('language');render();});
  $('#mp219-region').addEventListener('change',()=>{region=normRegion($('#mp219-region').value);syncHost('region');render();});
  wireHost('language');wireHost('region');render();
})();
