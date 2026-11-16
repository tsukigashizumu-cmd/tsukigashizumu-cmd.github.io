/* R236 — Repeat Grocery List, fictional no-storage landing-page demo.
   No fetch, cookies, localStorage, analytics, checkout, or mutation of existing modules. */
(()=>{
  'use strict';
  const ID='6804756535', MARK='tsz-rgl-r236';
  const body=document.body;
  if(!body||body.getAttribute('data-p199-id')!==ID||body.getAttribute('data-p19-app-id')!==ID||document.getElementById(MARK))return;
  const main=document.getElementById('p199-content');
  if(!main||!main.parentElement)return;
  const root=document.createElement('section');root.id=MARK;root.setAttribute('aria-labelledby','rgl236-title');
  root.innerHTML=`
<div class="rgl236-top"><div class="rgl236-wordmark"><span class="rgl236-logo">↻</span><span>REPEAT GROCERY <small>/ THE ONE-LIST DEMO</small></span></div><div class="rgl236-settings"><label><span data-rgl="language">Language</span><select id="rgl236-language" aria-label="Demo language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-rgl="region">App Store region</span><select id="rgl236-region" aria-label="App Store region"><option value="us">US</option><option value="jp">JP</option></select></label></div></div>
<div class="rgl236-hero"><div class="rgl236-lead"><span class="rgl236-kicker" data-rgl="eyebrow">YOUR USUAL LIST. READY AGAIN.</span><h2 id="rgl236-title"><span data-rgl="title1">The same groceries.</span><br><em data-rgl="title2">Not the same typing.</em></h2><p data-rgl="lead">Milk. Eggs. Bread. Water. Check them off today. Bring back the very same list next time.</p><div class="rgl236-hero-note"><span class="rgl236-dot"></span><span data-rgl="note">One list. Every trip.</span></div></div><div class="rgl236-meter"><span data-rgl="leftlabel">STILL TO PICK UP</span><strong id="rgl236-left-hero">4</strong><div class="rgl236-ticks" id="rgl236-ticks" aria-hidden="true"></div><small id="rgl236-meter-caption">0 of 4 picked up</small></div></div>
<div class="rgl236-body"><div class="rgl236-list-panel"><div class="rgl236-section-top"><span class="rgl236-step" data-rgl="step1">01 / CHECK YOUR USUAL ITEMS</span><span id="rgl236-trip-count" class="rgl236-trip">TRIP 01</span></div><h3 data-rgl="listtitle">Your familiar shopping list.</h3><p class="rgl236-description" data-rgl="listlead">Tap an item when it goes into your basket.</p><div id="rgl236-items" class="rgl236-items" aria-live="polite"></div><form id="rgl236-form" class="rgl236-add"><label for="rgl236-new" data-rgl="addlabel">Add one more usual item</label><div class="rgl236-add-row"><input id="rgl236-new" type="text" maxlength="48" autocomplete="off" placeholder="e.g. Coffee" aria-label="New usual item"><button type="submit" id="rgl236-addbtn" data-rgl="add">+ Add</button></div><p id="rgl236-error" role="status" class="rgl236-error"></p></form></div>
<div class="rgl236-next-panel"><span class="rgl236-step" data-rgl="step2">02 / READY FOR THE NEXT TRIP</span><h3 data-rgl="nexttitle">Done shopping?</h3><p class="rgl236-description" data-rgl="nextlead">Keep your list. Clear only the checkmarks. The same items are ready again.</p><div class="rgl236-summary"><span data-rgl="remaining">STILL ON THE LIST</span><strong id="rgl236-remaining">4 / 4</strong><div class="rgl236-progress"><div id="rgl236-progress-fill"></div></div><p id="rgl236-status" role="status">Your familiar list is ready.</p></div><button type="button" id="rgl236-next" class="rgl236-primary" data-rgl="nextbtn">↻ Start next shopping trip</button><button type="button" id="rgl236-restore" class="rgl236-secondary" data-rgl="restore">Restore original example</button><div class="rgl236-fact"><span>✓</span><p data-rgl="norescribble">No rewriting milk, eggs, and bread every week.</p></div></div></div>
<div class="rgl236-bottom"><div><strong data-rgl="bottomtitle">A list you don't have to rebuild.</strong><p data-rgl="disclaimer">Interactive illustration using fictional items. Changes are temporary and not saved. No account, purchase, or real shopping-list synchronization happens in this page.</p></div><a id="rgl236-appstore" href="https://apps.apple.com/us/app/repeat-grocery-list/id6804756535" target="_blank" rel="noopener noreferrer" data-rgl="appstore">See Repeat Grocery List on the App Store</a></div>`;
  main.parentElement.insertBefore(root,main);
  const $=id=>root.querySelector('#'+id);
  const W={
   en:{language:'Language',region:'App Store region',eyebrow:'YOUR USUAL LIST. READY AGAIN.',title1:'The same groceries.',title2:'Not the same typing.',lead:'Milk. Eggs. Bread. Water. Check them off today. Bring back the very same list next time.',note:'One list. Every trip.',leftlabel:'STILL TO PICK UP',step1:'01 / CHECK YOUR USUAL ITEMS',listtitle:'Your familiar shopping list.',listlead:'Tap an item when it goes into your basket.',addlabel:'Add one more usual item',add:'+ Add',step2:'02 / READY FOR THE NEXT TRIP',nexttitle:'Done shopping?',nextlead:'Keep your list. Clear only the checkmarks. The same items are ready again.',remaining:'STILL ON THE LIST',nextbtn:'↻ Start next shopping trip',restore:'Restore original example',norescribble:'No rewriting milk, eggs, and bread every week.',bottomtitle:"A list you don't have to rebuild.",disclaimer:'Interactive illustration using fictional items. Changes are temporary and not saved. No account, purchase, or real shopping-list synchronization happens in this page.',appstore:'See Repeat Grocery List on the App Store',picked:'picked up',trip:'TRIP',ready:'Your familiar list is ready.',progress:(d,t)=>`${d} of ${t} picked up`,all:'Everything checked. Ready for the next trip.',some:'Keep checking items as you shop.',empty:'Nothing to buy. Add your usual items.',bad:'Enter an item name (1–48 characters).',duplicate:'That item is already on the list.',newplaceholder:'e.g. Coffee',remove:'Remove',items:['Milk','Eggs','Bread','Water']},
   ja:{language:'言語',region:'App Storeの地域',eyebrow:'いつものリストを、次の買い物にも。',title1:'買うものは、いつも同じ。',title2:'毎回、書き直さない。',lead:'牛乳、卵、パン、水。買ったらチェック。次の買い物では、同じリストをそのまま使えます。',note:'いつものリスト、何度でも。',leftlabel:'まだ買っていない品目',step1:'01 / いつもの品目をチェック',listtitle:'書き慣れたいつものリスト。',listlead:'カゴに入れたら品目をタップ。',addlabel:'いつもの品目を追加する',add:'＋ 追加',step2:'02 / 次の買い物も、このリスト',nexttitle:'買い物が終わったら。',nextlead:'品目はそのまま、チェックだけ戻します。次の買い物でも一から書く必要はありません。',remaining:'残っている品目',nextbtn:'↻ 次の買い物を始める',restore:'最初の例に戻す',norescribble:'牛乳も卵もパンも、来週また入力しなくていい。',bottomtitle:'毎回、同じリストを作らなくていい。',disclaimer:'架空の品目を使った操作デモです。変更内容は保存されません。このページからの購入、アカウント連携、買い物リストの同期は行いません。',appstore:'Repeat Grocery ListをApp Storeで見る',picked:'購入済み',trip:'買い物',ready:'いつものリストが準備できました。',progress:(d,t)=>`${t}品目中${d}品目チェック済み`,all:'すべてチェック済み。次の買い物でも同じ品目を使えます。',some:'買った品目をチェックしてください。',empty:'品目がありません。追加してください。',bad:'1〜48文字の品目名を入力してください。',duplicate:'その品目はリストにあります。',newplaceholder:'例：コーヒー',remove:'削除',items:['牛乳','卵','パン','水']},
   ar:{language:'اللغة',region:'منطقة App Store',eyebrow:'قائمتك المعتادة جاهزة من جديد',title1:'نفس المشتريات.',title2:'دون إعادة كتابتها.',lead:'الحليب والبيض والخبز والماء. ضع علامة عند الشراء، ثم أعد استخدام القائمة نفسها في المرة القادمة.',note:'قائمة واحدة. في كل مرة.',leftlabel:'المتبقي للشراء',step1:'01 / حدّد مشترياتك المعتادة',listtitle:'قائمة التسوق المألوفة.',listlead:'اضغط على العنصر بعد وضعه في السلة.',addlabel:'أضف عنصراً معتاداً',add:'+ إضافة',step2:'02 / استعد للتسوق القادم',nexttitle:'انتهيت من التسوق؟',nextlead:'احتفظ بالعناصر نفسها وأزل علامات الاختيار فقط لتكون جاهزة في المرة القادمة.',remaining:'المتبقي في القائمة',nextbtn:'↻ ابدأ رحلة التسوق التالية',restore:'استعادة المثال الأصلي',norescribble:'لا حاجة لكتابة الحليب والبيض والخبز كل أسبوع.',bottomtitle:'قائمة لا تحتاج إلى بنائها كل مرة.',disclaimer:'عرض تفاعلي بعناصر افتراضية. التغييرات مؤقتة وغير محفوظة. لا تتم أي عملية شراء أو مزامنة أو إنشاء حساب من هذه الصفحة.',appstore:'عرض Repeat Grocery List في App Store',picked:'تم شراؤه',trip:'الرحلة',ready:'قائمتك المعتادة جاهزة.',progress:(d,t)=>`تم اختيار ${d} من ${t}`,all:'اكتملت جميع العناصر. القائمة جاهزة للرحلة التالية.',some:'واصل تحديد العناصر أثناء التسوق.',empty:'القائمة فارغة. أضف عناصر معتادة.',bad:'أدخل اسماً صالحاً من ١ إلى ٤٨ حرفاً.',duplicate:'هذا العنصر موجود في القائمة.',newplaceholder:'مثلاً: قهوة',remove:'إزالة',items:['حليب','بيض','خبز','ماء']}
  };
  const S={lang:'en',region:'us',trip:1,serial:5,items:[{id:1,label:0,done:false},{id:2,label:1,done:false},{id:3,label:2,done:false},{id:4,label:3,done:false}]};
  const hostLang=document.getElementById('p199-language'), hostRegion=document.getElementById('p199-country');
  const languageOf=v=>/^ja\b/i.test(v||'')?'ja':/^ar\b/i.test(v||'')?'ar':'en';
  const regionOf=v=>/^(jp|ja|japan)$/i.test(v||'')?'jp':'us';
  const labelOf=item=>typeof item.label==='number'?W[S.lang].items[item.label]:item.label;
  function draw(){
    const t=W[S.lang];root.lang=S.lang;root.dir=S.lang==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-rgl]').forEach(el=>{const v=t[el.dataset.rgl];if(typeof v==='string')el.textContent=v;});
    $('rgl236-language').value=S.lang;$('rgl236-region').value=S.region;
    $('rgl236-appstore').href=`https://apps.apple.com/${S.region}/app/repeat-grocery-list/id6804756535`;
    $('rgl236-new').placeholder=t.newplaceholder;
    $('rgl236-trip-count').textContent=`${t.trip} ${String(S.trip).padStart(2,'0')}`;
    const box=$('rgl236-items');box.replaceChildren();
    for(const item of S.items){
      const line=document.createElement('div');line.className='rgl236-item';line.dataset.done=String(item.done);
      const toggle=document.createElement('button');toggle.type='button';toggle.className='rgl236-toggle';toggle.setAttribute('aria-pressed',String(item.done));toggle.setAttribute('aria-label',`${labelOf(item)}: ${item.done?t.picked:t.remaining}`);
      const check=document.createElement('span');check.className='rgl236-check';check.setAttribute('aria-hidden','true');check.textContent=item.done?'✓':'';
      const name=document.createElement('span');name.className='rgl236-item-name';name.textContent=labelOf(item);
      toggle.append(check,name);toggle.addEventListener('click',()=>{item.done=!item.done;draw();});
      const remove=document.createElement('button');remove.type='button';remove.className='rgl236-remove';remove.setAttribute('aria-label',`${t.remove}: ${labelOf(item)}`);remove.textContent='×';
      remove.addEventListener('click',()=>{S.items=S.items.filter(x=>x.id!==item.id);draw();});
      line.append(toggle,remove);box.appendChild(line);
    }
    if(!S.items.length){const p=document.createElement('p');p.className='rgl236-empty';p.textContent=t.empty;box.append(p);}
    const total=S.items.length,done=S.items.filter(x=>x.done).length,left=total-done;
    $('rgl236-left-hero').textContent=String(left);$('rgl236-remaining').textContent=`${left} / ${total}`;
    $('rgl236-meter-caption').textContent=t.progress(done,total);
    $('rgl236-progress-fill').style.width=total?`${Math.round(done/total*100)}%`:'0%';
    const ticks=$('rgl236-ticks');ticks.replaceChildren();
    for(let i=0;i<Math.min(12,total);i++){const bar=document.createElement('span');bar.className=i<done?'rgl236-tick-done':'';ticks.appendChild(bar);}
    $('rgl236-status').textContent=total===0?t.empty:done===0?t.ready:left===0?t.all:t.some;
    $('rgl236-error').textContent='';
  }
  function setLanguage(v,sync){S.lang=languageOf(v);if(sync&&hostLang){const opt=Array.from(hostLang.options).find(o=>languageOf(o.value)===S.lang);if(opt){hostLang.value=opt.value;hostLang.dispatchEvent(new Event('change',{bubbles:true}));}}draw();}
  function setRegion(v,sync){S.region=regionOf(v);if(sync&&hostRegion){const opt=Array.from(hostRegion.options).find(o=>regionOf(o.value)===S.region);if(opt){hostRegion.value=opt.value;hostRegion.dispatchEvent(new Event('change',{bubbles:true}));}}draw();}
  $('rgl236-language').addEventListener('change',e=>setLanguage(e.target.value,true));
  $('rgl236-region').addEventListener('change',e=>setRegion(e.target.value,true));
  if(hostLang)hostLang.addEventListener('change',()=>setLanguage(hostLang.value,false));
  if(hostRegion)hostRegion.addEventListener('change',()=>setRegion(hostRegion.value,false));
  $('rgl236-form').addEventListener('submit',e=>{e.preventDefault();const input=$('rgl236-new');const val=input.value.trim().replace(/\s+/g,' ');if(!val||val.length>48){$('rgl236-error').textContent=W[S.lang].bad;return;}
    if(S.items.some(x=>labelOf(x).toLocaleLowerCase()===val.toLocaleLowerCase())){$('rgl236-error').textContent=W[S.lang].duplicate;return;}
    if(S.items.length>=40){$('rgl236-error').textContent=W[S.lang].bad;return;}
    S.items.push({id:S.serial++,label:val,done:false});input.value='';draw();input.focus();
  });
  $('rgl236-next').addEventListener('click',()=>{S.items.forEach(x=>x.done=false);S.trip+=1;draw();});
  $('rgl236-restore').addEventListener('click',()=>{S.items=[0,1,2,3].map((label,i)=>({id:i+1,label,done:false}));S.trip=1;S.serial=5;$('rgl236-new').value='';draw();});
  if(hostLang)S.lang=languageOf(hostLang.value);
  else S.lang=languageOf(document.documentElement.lang);
  if(hostRegion)S.region=regionOf(hostRegion.value);
  draw();
})();
