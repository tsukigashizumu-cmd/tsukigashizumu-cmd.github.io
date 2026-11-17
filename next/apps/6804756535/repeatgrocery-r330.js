/* R330 Repeat Grocery List · standalone LP demo, no network or persistence. */
(()=>{
 'use strict';
 const ID='tsz-rg330';
 const words={
  en:{over:'REPEAT THE LIST · NOT THE WORK',title:'Still writing milk and eggs again every week?',lead:'Your usual groceries should not become a new task every Saturday. Check items as you shop. Reset the checks next trip — keep the list.',examples:'TRY A SHOPPING TRIP',weekly:'Weekly',breakfast:'Breakfast',quick:'Quick run',ready:'THIS TRIP',items:'items',done:'checked off',left:'STILL TO PICK UP',all:'All picked up.',some:'Keep going — your list stays here.',none:'A familiar list, ready for today.',empty:'Your list is empty.',explain:'The reset button removes the checks, not your groceries. A new trip starts with the same items.',reset:'Reset checks for next trip',add:'Add item',placeholder:'One more regular item',count:'items on your list',hint:'Try checking milk and eggs, then reset for the next trip.',errorBlank:'Enter an item name first.',errorLong:'Use 36 characters or fewer.',errorDuplicate:'This item is already on the list.',errorLimit:'This demo holds up to 14 items.',added:'Added to this demo list.',removed:'Removed from this demo list.',resetDone:'Checks reset. Same items, new trip.',dismiss:'Remove',toggle:'Toggle checked item',note:'LP-only interactive illustration. Items you add or check here exist only in the open page; nothing is saved or sent. The app supports reusing your grocery list between trips.'},
  ja:{over:'同じ買い物リストを、何度でも',title:'毎週、牛乳と卵をまた書き直していない？',lead:'いつもの買い物なのに、リストだけ毎回最初から。買ったらチェック、次回はチェックを外すだけ。リストはそのまま。',examples:'買い物の例を選ぶ',weekly:'毎週の定番',breakfast:'朝食用',quick:'ちょっと買い足し',ready:'今回の買い物',items:'品目',done:'チェック済み',left:'これから買う品目',all:'すべてチェックできました。',some:'あと少し。リストはそのまま残ります。',none:'いつものリストで買い物を開始。',empty:'リストが空です。',explain:'リセットで消えるのはチェックだけ。品目はそのまま、次の買い物に使えます。',reset:'次回のためにチェックをリセット',add:'追加',placeholder:'いつもの品目を追加',count:'リスト内の品目',hint:'牛乳と卵をチェックして、次回用にリセットしてみてください。',errorBlank:'品目名を入力してください。',errorLong:'品目名は36文字以内にしてください。',errorDuplicate:'その品目はリストにあります。',errorLimit:'この体験版は最大14品目です。',added:'この体験用リストに追加しました。',removed:'この体験用リストから削除しました。',resetDone:'チェックを解除。同じリストで次の買い物へ。',dismiss:'削除',toggle:'チェック切替',note:'LP限定の操作体験です。入力・チェックした品目はこのページを開いている間だけ存在し、保存・送信されません。アプリ本体では同じリストを次回も使えます。'},
  ar:{over:'نفس القائمة · دون تكرار الكتابة',title:'هل تكتب الحليب والبيض من جديد كل أسبوع؟',lead:'مشترياتك المعتادة لا تحتاج إلى قائمة جديدة كل مرة. ضع علامة على ما اشتريته، ثم أزل العلامات في رحلتك التالية واحتفظ بالقائمة نفسها.',examples:'جرّب قائمة مشتريات',weekly:'كل أسبوع',breakfast:'الفطور',quick:'مشتريات سريعة',ready:'هذه الرحلة',items:'عناصر',done:'تم شراؤها',left:'ما زال عليك شراؤه',all:'اكتملت القائمة.',some:'تابع التسوق — قائمتك باقية.',none:'قائمتك المعتادة جاهزة.',empty:'القائمة فارغة.',explain:'إعادة الضبط تزيل علامات الاختيار فقط، ولا تحذف العناصر. القائمة نفسها لرحلة تسوق جديدة.',reset:'إعادة ضبط العلامات للرحلة التالية',add:'إضافة',placeholder:'أضف عنصراً متكرراً',count:'عناصر في القائمة',hint:'ضع علامة على الحليب والبيض، ثم أعد الضبط.',errorBlank:'أدخل اسم العنصر أولاً.',errorLong:'استخدم ٣٦ حرفاً أو أقل.',errorDuplicate:'هذا العنصر موجود في القائمة.',errorLimit:'يسمح هذا العرض بما يصل إلى ١٤ عنصراً.',added:'أُضيف العنصر إلى القائمة التجريبية.',removed:'أُزيل العنصر من القائمة التجريبية.',resetDone:'أُزيلت العلامات. نفس القائمة لرحلة جديدة.',dismiss:'حذف',toggle:'تغيير علامة الاختيار',note:'عرض تفاعلي للصفحة فقط. لا تُحفظ العناصر التي تضيفها أو تختارها هنا ولا تُرسل إلى أي جهة. يتيح التطبيق إعادة استخدام قائمة مشترياتك.'}
 };
 const sample={weekly:['milk','eggs','bread','rice','bananas'],breakfast:['milk','eggs','bread','coffee'],quick:['milk','bread','water','apples']};
 const names={
  en:{milk:'Milk',eggs:'Eggs',bread:'Bread',rice:'Rice',bananas:'Bananas',coffee:'Coffee',water:'Water',apples:'Apples'},
  ja:{milk:'牛乳',eggs:'卵',bread:'パン',rice:'お米',bananas:'バナナ',coffee:'コーヒー',water:'水',apples:'りんご'},
  ar:{milk:'الحليب',eggs:'البيض',bread:'الخبز',rice:'الأرز',bananas:'الموز',coffee:'القهوة',water:'الماء',apples:'التفاح'}
 };
 const state={lang:'en',preset:'weekly',items:sample.weekly.map((key,id)=>({id:id+1,key,checked:false})),next:10,message:'hint'};
 const t=()=>words[state.lang];
 function mount(){
  let host=document.getElementById(ID);
  if(!host){host=document.createElement('section');host.id=ID;const at=document.getElementById('related');if(at&&at.parentNode)at.parentNode.insertBefore(host,at);else(document.querySelector('main')||document.body).appendChild(host)}
  if(host.dataset.ready==='yes')return;
  host.dataset.ready='yes';host.setAttribute('lang','en');host.setAttribute('dir','ltr');
  host.innerHTML='<div class="rg-wrap"><header class="rg-hero"><div class="rg-eyebrow"><span class="rg-signet" aria-hidden="true"></span><span data-t="over"></span></div><h2 data-t="title"></h2><p class="rg-sub" data-t="lead"></p><div class="rg-lang" role="group" aria-label="Language"><button type="button" data-lang="en">English</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></header><div class="rg-columns"><section class="rg-listbox"><div class="rg-case-title"><p class="rg-cap" data-t="examples"></p><span class="rg-smallcount" data-out="count"></span></div><div class="rg-presets" role="group" aria-label="Demo shopping lists"><button type="button" data-preset="weekly"></button><button type="button" data-preset="breakfast"></button><button type="button" data-preset="quick"></button></div><ul class="rg-items" data-items></ul><form class="rg-form" novalidate><input id="rg330-name" type="text" maxlength="80" autocomplete="off" aria-label="Add an item" data-placeholder="placeholder"><button class="rg-add" type="submit" data-t="add"></button></form><p class="rg-hint" data-out="message" aria-live="polite"></p></section><section class="rg-summary" aria-live="polite"><span class="rg-pill" data-t="ready"></span><div class="rg-big" data-out="remaining">5</div><p class="rg-biglabel" data-t="left"></p><div class="rg-meter"><div class="rg-meterfill" data-meter></div></div><p class="rg-progress" data-out="progress"></p><div class="rg-divider"></div><p class="rg-message" data-out="status"></p><p class="rg-explain" data-t="explain"></p><button class="rg-reset" type="button" data-action="reset" data-t="reset"></button></section></div><footer class="rg-notice" data-t="note"></footer></div>';
  const q=s=>host.querySelector(s),all=s=>Array.from(host.querySelectorAll(s));
  function render(){
   host.setAttribute('lang',state.lang);host.setAttribute('dir',state.lang==='ar'?'rtl':'ltr');
   all('[data-t]').forEach(el=>el.textContent=t()[el.dataset.t]||'');
   all('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===state.lang)));
   all('[data-preset]').forEach(b=>{b.textContent=t()[b.dataset.preset];b.setAttribute('aria-pressed',String(b.dataset.preset===state.preset))});
   const input=q('#rg330-name');input.placeholder=t().placeholder;input.setAttribute('aria-label',t().placeholder);
   q('[data-out="message"]').textContent=t()[state.message]||t().hint;
   const list=q('[data-items]');list.replaceChildren();
   for(const item of state.items){
    const li=document.createElement('li');li.className='rg-item'+(item.checked?' rg-checked':'');
    const toggle=document.createElement('button');toggle.type='button';toggle.className='rg-tick';toggle.dataset.action='toggle';toggle.dataset.id=String(item.id);toggle.setAttribute('aria-pressed',String(item.checked));
    const name=item.key?names[state.lang][item.key]:item.label;
    toggle.setAttribute('aria-label',t().toggle+': '+name);
    const check=document.createElement('span');check.className='rg-checkmark';check.textContent=item.checked?'✓':'';check.setAttribute('aria-hidden','true');
    const label=document.createElement('span');label.className='rg-itemname';label.textContent=name;toggle.append(check,label);
    const remove=document.createElement('button');remove.type='button';remove.className='rg-remove';remove.dataset.action='remove';remove.dataset.id=String(item.id);remove.setAttribute('aria-label',t().dismiss+': '+name);remove.textContent='×';
    li.append(toggle,remove);list.appendChild(li);
   }
   const total=state.items.length,checked=state.items.filter(i=>i.checked).length,remaining=total-checked;
   q('[data-out="count"]').textContent=total+' '+t().items;
   q('[data-out="remaining"]').textContent=String(remaining);
   q('[data-out="progress"]').textContent=checked+' / '+total+' '+t().done;
   q('[data-out="status"]').textContent=total===0?t().empty:remaining===0?t().all:checked>0?t().some:t().none;
   q('[data-meter]').style.width=(total?100*checked/total:0)+'%';
   q('[data-action="reset"]').disabled=checked===0;
  }
  all('[data-lang]').forEach(b=>b.addEventListener('click',()=>{state.lang=b.dataset.lang;render()}));
  all('[data-preset]').forEach(b=>b.addEventListener('click',()=>{state.preset=b.dataset.preset;state.items=sample[state.preset].map((key,id)=>({id:id+1,key,checked:false}));state.next=10;state.message='hint';q('#rg330-name').value='';render()}));
  q('[data-items]').addEventListener('click',e=>{const b=e.target.closest('button[data-action]');if(!b)return;const id=Number(b.dataset.id),idx=state.items.findIndex(i=>i.id===id);if(idx<0)return;if(b.dataset.action==='toggle')state.items[idx].checked=!state.items[idx].checked;else {state.items.splice(idx,1);state.message='removed'}render()});
  q('.rg-form').addEventListener('submit',e=>{e.preventDefault();const input=q('#rg330-name'),name=input.value.trim().replace(/\s+/g,' ');if(!name){state.message='errorBlank'}else if(Array.from(name).length>36){state.message='errorLong'}else if(state.items.length>=14){state.message='errorLimit'}else if(state.items.some(item=>(item.key?names[state.lang][item.key]:item.label).toLocaleLowerCase()===name.toLocaleLowerCase())){state.message='errorDuplicate'}else{state.items.push({id:state.next++,label:name,checked:false});input.value='';state.message='added'}render()});
  q('[data-action="reset"]').addEventListener('click',()=>{state.items.forEach(item=>item.checked=false);state.message='resetDone';render()});
  render();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
