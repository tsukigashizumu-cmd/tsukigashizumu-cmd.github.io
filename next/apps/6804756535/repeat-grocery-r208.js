/* TSZ LP R208 / Repeat Grocery List. Illustrative one-list loop. No storage, network, or app mutation. */
(() => {
  'use strict';
  if (!document.body || document.body.dataset.p199Id !== '6804756535') return;
  if (document.getElementById('tsz-repeat-r208')) return;
  const host = document.querySelector('main') || document.body;
  const root = document.createElement('section');
  root.id = 'tsz-repeat-r208';
  root.setAttribute('aria-labelledby','tsz-r208-heading');
  root.innerHTML = `
  <div class="rg208-eyebrow"><span class="rg208-star" aria-hidden="true">✳</span><span data-r208-t="eyebrow">THE LIST YOU DON'T HAVE TO REWRITE</span><span class="rg208-pill" data-r208-t="sample">LIVE EXAMPLE / NO SAVING</span></div>
  <div class="rg208-heading-row"><div class="rg208-headcopy"><div class="rg208-kicker" data-r208-t="kicker">ONE LIST · EVERY TRIP</div>
    <h2 id="tsz-r208-heading"><span data-r208-t="titleA">The groceries return.</span><em data-r208-t="titleB">The typing doesn't.</em></h2>
    <p class="rg208-intro" data-r208-t="intro">Check your usual groceries off. When you shop again, bring the very same list back with one tap.</p></div>
    <div class="rg208-selects"><label><span data-r208-t="language">LANGUAGE</span><select id="tsz-r208-language" aria-label="Demo language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label>
    <label><span data-r208-t="region">APP STORE REGION</span><select id="tsz-r208-country" aria-label="App Store region"><option value="us">US</option><option value="jp">JP</option></select></label></div></div>
  <div class="rg208-grid"><div class="rg208-board">
    <div class="rg208-board-top"><div><p class="rg208-board-small" data-r208-t="boardSmall">YOUR EVERYDAY BASICS</p><h3 data-r208-t="boardTitle">The usual five</h3></div><span class="rg208-trip"><span data-r208-t="trip">TRIP</span> <b id="tsz-r208-trip">01</b></span></div>
    <div class="rg208-progress"><span id="tsz-r208-count" aria-live="polite">2 of 5 packed</span><strong id="tsz-r208-percent">40%</strong></div>
    <div class="rg208-meter" role="progressbar" aria-label="Grocery checklist progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="40" id="tsz-r208-meter"><span id="tsz-r208-meter-fill" style="width:40%"></span></div>
    <ul id="tsz-r208-items" class="rg208-items" aria-label="Reusable grocery checklist"></ul>
    <form class="rg208-add" id="tsz-r208-form"><label for="tsz-r208-input" data-r208-t="addLabel">ADD TO THIS LIST</label><div><input maxlength="40" id="tsz-r208-input" autocomplete="off" placeholder="e.g. Coffee"><button type="submit" data-r208-t="add">Add item</button></div><p class="rg208-message" id="tsz-r208-message" role="status" aria-live="polite"></p></form>
  </div><aside class="rg208-side"><div class="rg208-cyclemark" aria-hidden="true"><span class="rg208-orbit">↻</span><span class="rg208-cycletext">AGAIN</span></div>
    <p class="rg208-aside-tag" data-r208-t="sideTag">THE SIMPLE PART</p><h3 data-r208-t="sideTitle">Done today. Ready next time.</h3><p data-r208-t="sideBody">Completing a trip clears the checkmarks, not your list. The next trip starts with the same essentials.</p>
    <div class="rg208-cyclesteps"><span data-r208-t="step1">01 · Make your list</span><span data-r208-t="step2">02 · Check off</span><span data-r208-t="step3">03 · Use it again</span></div>
    <button id="tsz-r208-next" class="rg208-next" type="button"><span data-r208-t="next">Start next trip</span><span aria-hidden="true">↻</span></button>
    <button id="tsz-r208-restore" class="rg208-restore" type="button" data-r208-t="restore">Restore sample</button>
    <p class="rg208-notice" data-r208-t="notice">Demo only. No list is stored here; reloading returns to the sample.</p></aside></div>
    <div class="rg208-bottom"><p data-r208-t="footer">No recipes. No complicated setup. Just your familiar groceries.</p><a id="tsz-r208-store" href="https://apps.apple.com/us/app/id6804756535" target="_blank" rel="noopener noreferrer" data-r208-t="store">View Repeat Grocery List on App Store ↗</a></div>`;
  if (host === document.body) host.appendChild(root);
  else host.insertBefore(root, host.firstChild);
  const el = id => root.querySelector('#tsz-r208-' + id);
  const tr = {
    en: {eyebrow:"THE LIST YOU DON'T HAVE TO REWRITE",sample:'INTERACTIVE EXAMPLE / NOT SAVED',kicker:'ONE LIST · EVERY TRIP',titleA:'The groceries return.',titleB:"The typing doesn't.",intro:'Check your usual groceries off. When you shop again, bring the very same list back with one tap.',language:'LANGUAGE',region:'APP STORE REGION',boardSmall:'YOUR EVERYDAY BASICS',boardTitle:'The usual five',trip:'TRIP',count:(n,total)=>`${n} of ${total} checked`,addLabel:'ADD TO THIS LIST',add:'Add item',placeholder:'e.g. Coffee',sideTag:'THE SIMPLE PART',sideTitle:'Done today. Ready next time.',sideBody:'Starting the next trip clears the checkmarks, not your list. Those same essentials are ready again.',step1:'01 · Make your list',step2:'02 · Check off',step3:'03 · Use it again',next:'Start next trip',restore:'Restore sample',notice:'Illustrative demo only. Nothing is saved; reloading restores the sample.',footer:'No recipes. No complicated setup. Just your familiar groceries.',store:'View Repeat Grocery List on App Store ↗',remove:'Remove',done:'All checked. Your next trip is ready.',again:'The same list is ready for another trip.',added:'Added to your list.',duplicate:'This item is already on the list.',empty:'Enter an item name first.',full:'The demo list is full (12 items).',allRemoved:'Add an item to get started.',items:['Milk','Eggs','Bread','Rice','Apples']},
    ja: {eyebrow:'何度も書き直さない買い物リスト',sample:'操作できる例 / 保存なし',kicker:'ひとつのリストを、何度でも。',titleA:'品目はまた必要になる。',titleB:'書き直しは必要ない。',intro:'いつもの商品を買ったらチェック。次の買い物では、同じリストをワンタップで復活させよう。',language:'言語',region:'APP STORE地域',boardSmall:'いつもの買い物',boardTitle:'定番の5品',trip:'買い物',count:(n,total)=>`${total}品中${n}品チェック済み`,addLabel:'商品を追加',add:'追加する',placeholder:'例：コーヒー',sideTag:'これだけで十分',sideTitle:'今日の買い物を終えたら、次回へ。',sideBody:'次の買い物を始めても、品目は消えません。チェックだけ外して、いつものリストを再利用できます。',step1:'01 · 品目を登録',step2:'02 · 買ったらチェック',step3:'03 · 次も同じリスト',next:'次の買い物を始める',restore:'サンプルに戻す',notice:'これは操作例です。入力内容は保存されず、再読み込みで初期状態に戻ります。',footer:'レシピも複雑な設定もなし。いつもの買い物リストだけ。',store:'App StoreでRepeat Grocery Listを見る ↗',remove:'削除',done:'全部チェック完了。次の買い物の準備ができました。',again:'同じ品目で次の買い物を始めました。',added:'リストに追加しました。',duplicate:'その商品は既にあります。',empty:'商品名を入力してください。',full:'デモの上限は12品です。',allRemoved:'まず商品を追加してください。',items:['牛乳','卵','パン','お米','りんご']},
    ar: {eyebrow:'قائمة لا تكتبها من جديد',sample:'مثال تفاعلي / بدون حفظ',kicker:'قائمة واحدة · في كل زيارة',titleA:'تعود المشتريات.',titleB:'ولا تعود الكتابة.',intro:'ضع علامة على مشترياتك المعتادة. وفي الزيارة التالية استعد نفس القائمة بنقرة واحدة.',language:'اللغة',region:'منطقة المتجر',boardSmall:'احتياجاتك المعتادة',boardTitle:'الخمسة الأساسية',trip:'زيارة',count:(n,total)=>`${n} من ${total} مكتمل`,addLabel:'أضف إلى القائمة',add:'إضافة',placeholder:'مثل القهوة',sideTag:'الفكرة البسيطة',sideTitle:'انتهيت اليوم. وجاهز للزيارة القادمة.',sideBody:'عند بدء زيارة جديدة تُمسح علامات الاختيار فقط، وتبقى أصناف القائمة نفسها.',step1:'01 · أنشئ قائمتك',step2:'02 · ضع علامة',step3:'03 · استخدمها مجدداً',next:'ابدأ زيارة جديدة',restore:'استعادة المثال',notice:'هذا مثال فقط، لا يتم حفظ أي شيء. تعيد إعادة التحميل القائمة الأولى.',footer:'بلا وصفات ولا إعداد معقد. فقط مشترياتك المعتادة.',store:'عرض Repeat Grocery List في App Store ↗',remove:'حذف',done:'اكتملت القائمة. جاهز للزيارة القادمة.',again:'القائمة نفسها جاهزة لزيارة أخرى.',added:'تمت الإضافة إلى قائمتك.',duplicate:'هذا العنصر موجود بالفعل.',empty:'أدخل اسم العنصر أولاً.',full:'الحد الأقصى لهذا المثال هو 12 عنصراً.',allRemoved:'أضف عنصراً للبدء.',items:['حليب','بيض','خبز','أرز','تفاح']}
  };
  let uid=0;
  const makeItem = (key, label, checked) => ({key:key||('custom-'+(++uid)),label,checked});
  const seed = () => tr.en.items.map((label,i)=>makeItem('basic-'+i, null, i<2));
  const state = {items:seed(),trip:1,language:'en',region:'us',message:''};
  const langSelect=el('language'),regionSelect=el('country');
  const sharedLang=document.getElementById('p199-language'),sharedRegion=document.getElementById('p199-country');
  const normLang=s=>{const x=String(s||'').toLowerCase();return x.startsWith('ja')?'ja':x.startsWith('ar')?'ar':'en';};
  const normRegion=s=>String(s||'').toLowerCase()==='jp'?'jp':'us';
  const hasChoice=(control,value,normalizer)=>control&&Array.from(control.options).some(option=>normalizer(option.value)===value);
  if(hasChoice(sharedLang,'ja',normLang) || hasChoice(sharedLang,'en',normLang)) state.language=normLang(sharedLang.value);
  if(hasChoice(sharedRegion,'us',normRegion) || hasChoice(sharedRegion,'jp',normRegion)) state.region=normRegion(sharedRegion.value);
  function translateItem(item){if(item.key.startsWith('basic-')) return tr[state.language].items[Number(item.key.slice(6))];return item.label;}
  function render(){
    const t=tr[state.language];root.lang=state.language;root.dir=state.language==='ar'?'rtl':'ltr';
    langSelect.value=state.language;regionSelect.value=state.region;
    root.querySelectorAll('[data-r208-t]').forEach(node=>{const key=node.dataset.r208T;if(typeof t[key]==='string')node.textContent=t[key];});
    el('input').placeholder=t.placeholder;
    const ul=el('items');ul.replaceChildren();
    state.items.forEach(item=>{
      const li=document.createElement('li');li.className='rg208-item';li.dataset.key=item.key;li.dataset.checked=String(item.checked);
      const label=document.createElement('label');label.className='rg208-item-check';
      const cb=document.createElement('input');cb.type='checkbox';cb.checked=item.checked;cb.dataset.key=item.key;
      const span=document.createElement('span');span.className='rg208-item-name';span.textContent=translateItem(item);
      label.append(cb,span);
      const del=document.createElement('button');del.type='button';del.className='rg208-delete';del.textContent='×';del.dataset.remove=item.key;del.setAttribute('aria-label',t.remove+' '+translateItem(item));
      li.append(label,del);ul.append(li);
    });
    const count=state.items.filter(x=>x.checked).length, total=state.items.length;
    const pct=total?Math.round(count*100/total):0;
    el('count').textContent=t.count(count,total);el('percent').textContent=pct+'%';
    el('meter').setAttribute('aria-valuenow',String(pct));el('meter-fill').style.width=pct+'%';
    el('trip').textContent=String(state.trip).padStart(2,'0');
    el('message').textContent=state.message || (total===0?t.allRemoved:(count===total?t.done:''));
    el('store').href='https://apps.apple.com/'+state.region+'/app/id6804756535';
  }
  function syncToShared(ctl,value,normalizer){if(!ctl)return;const found=Array.from(ctl.options).find(o=>normalizer(o.value)===value);if(found&&ctl.value!==found.value){ctl.value=found.value;ctl.dispatchEvent(new Event('change',{bubbles:true}));}}
  langSelect.addEventListener('change',()=>{state.language=normLang(langSelect.value);syncToShared(sharedLang,state.language,normLang);render();});
  regionSelect.addEventListener('change',()=>{state.region=normRegion(regionSelect.value);syncToShared(sharedRegion,state.region,normRegion);render();});
  if(sharedLang)sharedLang.addEventListener('change',()=>{if(!sharedLang.selectedOptions.length)return;state.language=normLang(sharedLang.value);render();});
  if(sharedRegion)sharedRegion.addEventListener('change',()=>{if(!sharedRegion.selectedOptions.length)return;state.region=normRegion(sharedRegion.value);render();});
  el('items').addEventListener('change',evt=>{const cb=evt.target.closest('input[data-key]');if(!cb)return;const item=state.items.find(x=>x.key===cb.dataset.key);if(item){item.checked=cb.checked;state.message='';render();}});
  el('items').addEventListener('click',evt=>{const del=evt.target.closest('button[data-remove]');if(!del)return;state.items=state.items.filter(x=>x.key!==del.dataset.remove);state.message='';render();});
  el('form').addEventListener('submit',evt=>{evt.preventDefault();const raw=el('input').value.trim().replace(/\s+/g,' ').slice(0,40),t=tr[state.language];
    if(!raw){state.message=t.empty;render();return;}
    if(state.items.length>=12){state.message=t.full;render();return;}
    if(state.items.some(x=>translateItem(x).normalize('NFKC').toLocaleLowerCase()===raw.normalize('NFKC').toLocaleLowerCase())){state.message=t.duplicate;render();return;}
    state.items.push(makeItem(null,raw,false));state.message=t.added;el('input').value='';render();
  });
  el('next').addEventListener('click',()=>{state.items.forEach(item=>{item.checked=false;});state.trip=state.trip===99?1:state.trip+1;state.message=tr[state.language].again;render();});
  el('restore').addEventListener('click',()=>{state.items=seed();state.trip=1;state.message='';el('input').value='';render();});
  render();
})();
