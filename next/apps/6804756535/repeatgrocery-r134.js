/* TSZ R134: Repeat Grocery List, website-only interactive illustration. No persistent storage, tracking or requests. */
(()=>{
 'use strict';
 const APP_ID='6804756535', ID='tsz-rg134';
 const initial=['milk','eggs','bread','water'];
 const I18N={
  en:{eyebrow:'REPEAT GROCERY LIST / SAME LIST, NEXT TRIP',tag:'LIVE WEBSITE DEMO',title:'Finish the trip. Keep the list.',lead:'Check items as you shop. When you are done, clear the checkmarks—not the groceries. Your familiar list is ready again.',trip:'Shopping trip',next:'Next trip',ready:'Still on your list',bought:'Checked off',progress:'Shopping progress',intro:'Your everyday essentials',milk:'Milk',eggs:'Eggs',bread:'Bread',water:'Water',all:'Check all items',add:'Add to this list',addPlaceholder:'Another regular item',addBtn:'Add item',complete:'Next shopping trip · clear checks only',reset:'Reset website demo',foot:'Website example only. Nothing is stored, sent, or changed in your app.',onlyChecks:'The items stay. Only their checkmarks reset.',readyText:'Use the list you already made.',afterText:'The same {n} items are ready for trip {trip}. No retyping.',success:'All {n} items are checked. Start your next trip whenever you like.',error:'Check at least one item first, then start the next trip.',badItem:'Enter 1–40 characters for your item.',dupItem:'That item is already on your list.',maxItem:'This example supports up to 20 items.',noDeletion:'Demo reset clears temporary changes; it does not delete anything in the app.',status:'Items checked',newTrip:'Started the next trip',countUnit:'items',buy:'Not bought yet'},
  ja:{eyebrow:'REPEAT GROCERY LIST / また使える買い物リスト',tag:'LP専用・操作デモ',title:'買い物が終わっても、リストは消さない。',lead:'買った商品にチェック。買い物が終わったら、チェックだけ元に戻す。いつもの商品はそのまま、次の買い物へ。',trip:'今回の買い物',next:'次の買い物',ready:'未購入',bought:'チェック済み',progress:'買い物の進み具合',intro:'いつもの4品',milk:'牛乳',eggs:'卵',bread:'パン',water:'水',all:'全品にチェック',add:'いつもの商品を追加',addPlaceholder:'例：ヨーグルト',addBtn:'追加する',complete:'次の買い物へ・チェックだけ解除',reset:'LPデモを初期化',foot:'LP専用サンプルです。保存・送信・アプリへの反映はありません。',onlyChecks:'商品名は残す。チェックだけ戻す。',readyText:'前回のリストをそのまま使えます。',afterText:'{n}品のリストを残したまま、{trip}回目の買い物を始めました。再入力は不要です。',success:'{n}品すべてにチェックしました。次の買い物へ進めます。',error:'まず1品以上にチェックしてください。',badItem:'商品名は1〜40文字で入力してください。',dupItem:'その商品はすでに登録されています。',maxItem:'このデモで追加できるのは最大20品です。',noDeletion:'LPデモの初期化はサンプルだけです。アプリのリストは削除しません。',status:'チェック済み',newTrip:'次の買い物を開始',countUnit:'品',buy:'未購入'},
  ar:{eyebrow:'REPEAT GROCERY LIST / نفس القائمة للرحلة التالية',tag:'تجربة تفاعلية على الموقع فقط',title:'تنتهي رحلة التسوق، لكن قائمتك تبقى.',lead:'حدّد ما اشتريته. ثم امسح علامات الاختيار فقط، لا أسماء المنتجات. قائمتك المعتادة جاهزة للتسوق مجددًا.',trip:'رحلة التسوق',next:'الرحلة التالية',ready:'عناصر لم تُشترَ بعد',bought:'تم تحديدها',progress:'تقدّم التسوق',intro:'احتياجاتك المعتادة',milk:'حليب',eggs:'بيض',bread:'خبز',water:'ماء',all:'تحديد كل العناصر',add:'أضف عنصرًا معتادًا',addPlaceholder:'مثال: زبادي',addBtn:'إضافة',complete:'رحلة جديدة · إزالة العلامات فقط',reset:'إعادة ضبط مثال الموقع',foot:'تجربة على الموقع فقط، لا نحفظ أو نرسل البيانات ولا نغيّر التطبيق.',onlyChecks:'تبقى العناصر، وتُمسح العلامات فقط.',readyText:'استخدم القائمة التي أعددتها سابقًا.',afterText:'بقيت العناصر وعددها {n}، وبدأت رحلة التسوق رقم {trip} بلا إعادة كتابة.',success:'تم تحديد العناصر {n} كلها. يمكنك بدء الرحلة التالية.',error:'حدّد عنصرًا واحدًا على الأقل أولًا.',badItem:'أدخل اسم عنصر بين 1 و40 حرفًا.',dupItem:'هذا العنصر موجود بالفعل.',maxItem:'يدعم هذا المثال حتى 20 عنصرًا.',noDeletion:'إعادة ضبط التجربة لا تحذف قائمة التطبيق.',status:'المحدد',newTrip:'بدأت رحلة جديدة',countUnit:'عناصر',buy:'لم يُشترَ بعد'}
 };
 const fmt=(s,vars)=>String(s).replace(/\{(\w+)\}/g,(_,k)=>String(vars[k]??''));
 const query=(el,sel)=>el.querySelector(sel);
 function lang(){
  const sel=document.getElementById('p199-language');
  const raw=(sel?.value||document.documentElement.lang||navigator.language||'en').toLowerCase();
  return raw.startsWith('ar')?'ar':raw.startsWith('ja')?'ja':'en';
 }
 function mount(){
  if(document.getElementById(ID)||!document.body)return;
  const id=document.body.dataset.p199Id||document.body.dataset.p19AppId||'';
  if(id&&id!==APP_ID)return;
  if(!id&&!document.querySelector(`a[href*="${APP_ID}"]`)&&!document.querySelector(`link[rel="canonical"][href*="${APP_ID}"]`))return;
  const host=document.getElementById('overview')||document.querySelector('main');if(!host)return;
  const root=document.createElement('section'); root.id=ID; root.dataset.websiteOnly='true';root.setAttribute('aria-labelledby','rg134-title');
  root.innerHTML=`<div class="rg134-top"><span data-t="eyebrow"></span><span class="rg134-tag" data-t="tag"></span></div>
    <header class="rg134-head"><h2 id="rg134-title" data-t="title"></h2><p data-t="lead"></p></header>
    <div class="rg134-grid"><div class="rg134-paper"><div class="rg134-sheethead"><div><small data-t="intro"></small><strong data-t="trip"></strong> <strong data-out="trip"></strong></div><span class="rg134-serial">RG / 134</span></div>
      <ul data-list class="rg134-list"></ul><div class="rg134-add"><label for="rg134-new" data-t="add"></label><div class="rg134-addrow"><input id="rg134-new" data-field="new" maxlength="40" autocomplete="off" enterkeyhint="done"><button type="button" data-action="add" data-t="addBtn"></button></div></div>
      <button type="button" class="rg134-checkall" data-action="all" data-t="all"></button></div>
      <div class="rg134-side"><div class="rg134-tick"><span class="rg134-mini" data-t="progress"></span><div class="rg134-value"><strong data-out="done">0</strong><span>/</span><strong data-out="total">4</strong></div><div class="rg134-rail" aria-hidden="true"><span data-out="bar"></span></div></div>
      <div class="rg134-two"><div><small data-t="ready"></small><strong data-out="left">4</strong></div><div><small data-t="bought"></small><strong data-out="bought">0</strong></div></div>
      <p class="rg134-message" data-out="message" role="status" aria-live="polite"></p><p class="rg134-note" data-t="onlyChecks"></p>
      <button class="rg134-primary" type="button" data-action="next" data-t="complete"></button><button class="rg134-reset" type="button" data-action="reset" data-t="reset"></button></div></div>
      <p class="rg134-error" data-out="error" role="alert" hidden></p><footer><span data-t="foot"></span><span data-t="noDeletion"></span></footer>`;
  if(host.id==='overview')host.insertAdjacentElement('afterend',root);else host.prepend(root);
  let items=initial.map((name,i)=>({id:'fixed'+i,name,custom:false,done:false}));
  let trip=1,notice='',errorKey='',lastLanguage='';
  const t=()=>I18N[lang()];
  const labelFor=(item,txt)=>item.custom?item.name:txt[item.name];
  function render(){
   const locale=lang(),txt=I18N[locale];lastLanguage=locale;root.lang=locale;root.dir=locale==='ar'?'rtl':'ltr';
   root.querySelectorAll('[data-t]').forEach(e=>{e.textContent=txt[e.dataset.t]||''});
   query(root,'[data-field="new"]').placeholder=txt.addPlaceholder;
   const list=query(root,'[data-list]');list.replaceChildren();
   for(const item of items){
    const li=document.createElement('li');li.className=item.done?'rg134-done':'';
    const label=document.createElement('label');const input=document.createElement('input');input.type='checkbox';input.checked=item.done;input.dataset.item=item.id;
    input.setAttribute('aria-label',labelFor(item,txt));
    const box=document.createElement('span');box.className='rg134-box';box.setAttribute('aria-hidden','true');box.textContent='✓';
    const name=document.createElement('span');name.className='rg134-name';name.textContent=labelFor(item,txt);
    const stamp=document.createElement('span');stamp.className='rg134-status';stamp.textContent=item.done?'✓':txt.buy;
    label.append(input,box,name,stamp);li.append(label);list.append(li);
   }
   const done=items.filter(x=>x.done).length,total=items.length;
   root.dataset.total=String(total);root.dataset.done=String(done);root.dataset.trip=String(trip);root.dataset.ready=String(total-done);
   query(root,'[data-out="trip"]').textContent=String(trip);
   for(const [k,v] of Object.entries({done,total,left:total-done,bought:done}))query(root,`[data-out="${k}"]`).textContent=String(v);
   query(root,'[data-out="bar"]').style.width=(total?Math.round(done/total*100):0)+'%';
   query(root,'[data-out="message"]').textContent=notice?fmt(txt[notice],{n:total,trip}):(done===total?fmt(txt.success,{n:total}):txt.readyText);
   const err=query(root,'[data-out="error"]');err.hidden=!errorKey;err.textContent=errorKey?txt[errorKey]:'';
   root.dataset.error=errorKey;
  }
  function add(){
   const input=query(root,'[data-field="new"]');const name=input.value.normalize('NFC').trim();
   if(name.length<1||name.length>40){errorKey='badItem';render();return;}
   if(items.length>=20){errorKey='maxItem';render();return;}
   if(items.some(item=>labelFor(item,t()).toLocaleLowerCase()===name.toLocaleLowerCase())){errorKey='dupItem';render();return;}
   const id='custom'+(Date.now())+'_'+items.length;items.push({id,name,custom:true,done:false});input.value='';errorKey='';notice='';render();input.focus();
  }
  root.addEventListener('change',e=>{if(e.target.matches('input[data-item]')){
   const item=items.find(x=>x.id===e.target.dataset.item);if(item)item.done=e.target.checked;
   errorKey='';notice='';render();
  }});
  root.addEventListener('click',e=>{const btn=e.target.closest('button[data-action]');if(!btn||!root.contains(btn))return;
   const action=btn.dataset.action;
   if(action==='add'){add();return;}
   if(action==='all'){items.forEach(x=>x.done=true);errorKey='';notice='';}
   if(action==='next'){if(!items.some(x=>x.done)){errorKey='error';notice='';render();return;}
    items.forEach(x=>x.done=false);trip++;errorKey='';notice='afterText';}
   if(action==='reset'){items=initial.map((name,i)=>({id:'fixed'+i,name,custom:false,done:false}));trip=1;query(root,'[data-field="new"]').value='';notice='';errorKey='';}
   render();
  });
  query(root,'[data-field="new"]').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();add()}});
  document.getElementById('p199-language')?.addEventListener('change',render);
  new MutationObserver(()=>{if(lastLanguage!==lang())render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  render();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
