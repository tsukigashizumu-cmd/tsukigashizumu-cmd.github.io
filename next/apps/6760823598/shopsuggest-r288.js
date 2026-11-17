/* R288 ShopSuggest — one-page interactive demonstration, no persistence, tracking, or fetch. */
(() => {
  'use strict';
  const ROOT_ID='shopsuggest-r288';
  if(document.getElementById(ROOT_ID)) return;
  const i18n={
    en:{brand:'ShopSuggest',studio:'STORE-BY-STORE LIST STUDIO',language:'Language',region:'App Store',eyebrow:'YOUR LISTS, BACK IN THE RIGHT STORE',h1:'Two stores. Two lists. No forgotten items.',sub:'You go to the supermarket, then the drugstore. Keep each list separate—and add the things you buy often without typing them again.',live:'LIVE DEMO · ON THIS PAGE',stores:'Your stores',supermarket:'Supermarket',drugstore:'Drugstore',view:'Store checklist',addLabel:'Add an item to this store',placeholder:'Try typing “mi”',add:'Add item',suggest:'Previously used · tap to add',noSuggest:'Start typing to find an item you already use.',checked:'Done',remaining:'Left',count:'items',empty:'No items here. Add one above.',reset:'Uncheck all',startAgain:'Restore sample',sample:'SAMPLE LIST',status:'Done for this store',detail:'Checked items stay on this list. Switch stores without losing your page progress.',cta:'View ShopSuggest in the App Store',fine:'Interactive example only. This page does not store, sync, export or import lists. The app offers more features, including JSON backup.',added:'Item added',exists:'Already on this store’s list',invalid:'Enter 1–60 characters.',allDone:'All done at this store.',last:'One item left.',storeSwap:'Switch stores without mixing lists.',completed:'complete',tip:'Tip: type “mi”, “ti”, or “sh” to try suggestions.',undo:'Remove item',milk:'Milk',eggs:'Eggs',bread:'Bread',apples:'Apples',tissues:'Tissues',detergent:'Detergent',shampoo:'Shampoo',soap:'Soap',water:'Water',rice:'Rice'},
    ja:{brand:'ShopSuggest',studio:'お店ごとの買い物リスト',language:'言語',region:'App Store',eyebrow:'店ごとに、買い忘れを減らす',h1:'スーパーのリストに、薬局の買い物を混ぜない。',sub:'スーパーに寄って、次はドラッグストア。リストを店ごとに分ければ、いつも買うものも候補からすぐ追加できます。',live:'このページで操作できます',stores:'お店を選ぶ',supermarket:'スーパー',drugstore:'ドラッグストア',view:'この店で買うもの',addLabel:'この店に商品を追加',placeholder:'「牛」などを入力',add:'追加',suggest:'以前の入力候補 · タップで追加',noSuggest:'文字を入力すると候補が表示されます。',checked:'購入済み',remaining:'残り',count:'品',empty:'まだ商品がありません。上から追加してください。',reset:'チェックを戻す',startAgain:'見本を復元',sample:'見本リスト',status:'この店の進捗',detail:'チェックしても商品は消えません。店を切り替えても、ページを開いている間は状態を保持します。',cta:'ShopSuggestをApp Storeで見る',fine:'操作見本です。このページでは保存・同期・JSONの入出力は行いません。実際のアプリにはJSONバックアップ等があります。',added:'商品を追加しました',exists:'この店のリストにあります',invalid:'1〜60文字で入力してください。',allDone:'この店の買い物が終わりました。',last:'あと1品です。',storeSwap:'店を切り替えても、リストは混ざりません。',completed:'完了',tip:'ヒント：「牛」「ティ」「シャン」で候補を試せます。',undo:'商品を削除',milk:'牛乳',eggs:'卵',bread:'パン',apples:'りんご',tissues:'ティッシュ',detergent:'洗剤',shampoo:'シャンプー',soap:'石けん',water:'水',rice:'米'},
    ar:{brand:'ShopSuggest',studio:'قوائم منفصلة لكل متجر',language:'اللغة',region:'متجر التطبيقات',eyebrow:'كل قائمة في متجرها الصحيح',h1:'متجران. قائمتان. لا تختلط المشتريات.',sub:'تتسوق في السوبرماركت ثم الصيدلية. أبقِ لكل متجر قائمته وأضف مشترياتك المعتادة من الاقتراحات دون إعادة كتابتها.',live:'تجربة تفاعلية على هذه الصفحة',stores:'اختر المتجر',supermarket:'السوبرماركت',drugstore:'متجر المستلزمات',view:'مشتريات هذا المتجر',addLabel:'أضف عنصرًا لهذا المتجر',placeholder:'اكتب «حلـ» مثلًا',add:'إضافة',suggest:'اقتراحات سابقة · اضغط للإضافة',noSuggest:'ابدأ الكتابة لعرض العناصر المتكررة.',checked:'تم',remaining:'متبقٍ',count:'عناصر',empty:'لا توجد عناصر. أضف عنصرًا أعلاه.',reset:'إلغاء العلامات',startAgain:'استعادة المثال',sample:'قائمة تجريبية',status:'تقدم هذا المتجر',detail:'تبقى العناصر في قائمتها بعد تحديدها. يمكنك تبديل المتاجر دون فقدان تقدمك خلال هذه الزيارة.',cta:'عرض ShopSuggest في App Store',fine:'هذا مثال تفاعلي فقط. لا تحفظ الصفحة القوائم ولا تزامنها ولا تستورد أو تصدر JSON. يدعم التطبيق الحقيقي نسخ JSON احتياطيًا.',added:'تمت الإضافة',exists:'موجود بالفعل في قائمة هذا المتجر',invalid:'أدخل من 1 إلى 60 حرفًا.',allDone:'انتهيت من مشتريات هذا المتجر.',last:'بقي عنصر واحد.',storeSwap:'يمكنك التبديل دون خلط القوائم.',completed:'مكتمل',tip:'نصيحة: جرّب «حل» أو «شا» لعرض الاقتراحات.',undo:'حذف العنصر',milk:'حليب',eggs:'بيض',bread:'خبز',apples:'تفاح',tissues:'مناديل',detergent:'منظف',shampoo:'شامبو',soap:'صابون',water:'ماء',rice:'أرز'}
  };
  const defaults={supermarket:[['milk',false],['eggs',true],['bread',false],['apples',false]],drugstore:[['tissues',false],['detergent',true],['shampoo',false],['soap',false]]};
  const stock=['milk','eggs','bread','apples','tissues','detergent','shampoo','soap','water','rice'];
  const state={lang:'en',region:'us',store:'supermarket',items:null,filter:'',message:''};
  function restore(){state.items={};Object.entries(defaults).forEach(([store,arr])=>{state.items[store]=arr.map(([key,done])=>({key,done,id:key}));});}
  restore();
  const markup=`<div class="ss288-shell"><header class="ss288-top"><div class="ss288-brand"><span class="ss288-brand-icon">S.</span><span><strong>ShopSuggest</strong><small data-t="studio"></small></span></div><div class="ss288-selects"><label><span data-t="language"></span><select data-select="lang"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select data-select="region"><option value="us">US</option><option value="jp">JP</option></select></label></div></header><div class="ss288-hero"><div><p class="ss288-eyebrow" data-t="eyebrow"></p><h2 data-t="h1"></h2><p class="ss288-lede" data-t="sub"></p><div class="ss288-hero-rule"><span data-t="live"></span><span class="ss288-dot"></span></div></div><div class="ss288-hero-art" aria-hidden="true"><div class="ss288-mini"><span>01</span><span data-t="supermarket"></span><b>4</b></div><div class="ss288-mini ss288-mini-two"><span>02</span><span data-t="drugstore"></span><b>4</b></div><div class="ss288-arc"></div></div></div><div class="ss288-grid"><aside class="ss288-sidebar"><p class="ss288-overline" data-t="stores"></p><div class="ss288-store-tabs" role="group" aria-label="Select store"><button type="button" data-store="supermarket"><span class="ss288-store-em">◉</span><span data-t="supermarket"></span><span data-store-counter="supermarket"></span></button><button type="button" data-store="drugstore"><span class="ss288-store-em">✦</span><span data-t="drugstore"></span><span data-store-counter="drugstore"></span></button></div><div class="ss288-sidebar-foot"><p>01 / 02</p><p data-t="storeSwap"></p></div></aside><div class="ss288-work"><div class="ss288-work-heading"><div><p class="ss288-overline" data-t="sample"></p><h3 data-store-title></h3></div><div class="ss288-chip" data-progress-compact></div></div><form data-add-form><label data-t="addLabel" for="ss288-new"></label><div class="ss288-input-row"><input id="ss288-new" data-input autocomplete="off" maxlength="60" type="text" placeholder=""><button type="submit" data-t="add"></button></div><div class="ss288-suggestion-group"><p class="ss288-overline" data-t="suggest"></p><div class="ss288-suggestions" data-suggestions></div></div><p class="ss288-notice" role="status" data-message></p></form><div class="ss288-list-head"><span data-t="view"></span><span data-count></span></div><ul class="ss288-list" data-list></ul><div class="ss288-bottom"><button type="button" class="ss288-secondary" data-reset-check data-t="reset"></button><button type="button" class="ss288-ghost" data-restore data-t="startAgain"></button></div></div><aside class="ss288-summary"><p class="ss288-overline" data-t="status"></p><div class="ss288-big" data-big></div><div class="ss288-track"><span data-fill></span></div><div class="ss288-progress-legend"><span data-progress-text></span><b data-percent></b></div><p data-t="detail"></p><div class="ss288-summary-rule"></div><p class="ss288-tip" data-t="tip"></p><a data-cta target="_blank" rel="noopener noreferrer" data-t="cta" href="https://apps.apple.com/us/app/id6760823598"></a><p class="ss288-disclaimer" data-t="fine"></p></aside></div></div>`;
  function translate(key){return i18n[state.lang][key]||key;}
  function label(item){return item.key in i18n.en ? translate(item.key) : item.key;}
  function counts(store){const arr=state.items[store];return {all:arr.length,done:arr.filter(x=>x.done).length,left:arr.filter(x=>!x.done).length};}
  function init(){
    if(document.getElementById(ROOT_ID)||!document.body)return;
    const root=document.createElement('section');root.id=ROOT_ID;root.setAttribute('aria-label','ShopSuggest store-based checklist demo');root.innerHTML=markup;document.body.insertBefore(root,document.body.firstChild);
    const query=(sel)=>root.querySelector(sel);
    const itemList=query('[data-list]');
    function renderSuggestions(){
      const host=query('[data-suggestions]');host.replaceChildren();
      const needle=state.filter.trim().toLocaleLowerCase();
      const candidates=stock.filter(key=>!state.items[state.store].some(i=>i.key===key)).filter(key=>!needle || translate(key).toLocaleLowerCase().includes(needle) || key.includes(needle)).slice(0,5);
      if(!candidates.length){const p=document.createElement('span');p.className='ss288-muted';p.textContent=translate('noSuggest');host.append(p);return;}
      for(const key of candidates){const button=document.createElement('button');button.type='button';button.dataset.suggestion=key;button.textContent='+ '+translate(key);host.append(button);}
    }
    function renderList(){
      itemList.replaceChildren();const items=state.items[state.store];
      if(!items.length){const li=document.createElement('li');li.className='ss288-empty';li.textContent=translate('empty');itemList.append(li);return;}
      for(const item of items){
        const li=document.createElement('li');li.className='ss288-item';if(item.done)li.classList.add('ss288-isdone');
        const l=document.createElement('label');l.className='ss288-checkbox-wrap';const cb=document.createElement('input');cb.type='checkbox';cb.checked=item.done;cb.dataset.toggle=item.id;cb.setAttribute('aria-label',label(item));const title=document.createElement('span');title.textContent=label(item);l.append(cb,title);li.append(l);
        const remove=document.createElement('button');remove.type='button';remove.className='ss288-remove';remove.textContent='×';remove.dataset.remove=item.id;remove.setAttribute('aria-label',translate('undo')+': '+label(item));li.append(remove);itemList.append(li);
      }
    }
    function render(){
      const t=i18n[state.lang];root.lang=state.lang;root.dir=state.lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.dataset.t]||'';});
      root.querySelectorAll('[data-select]').forEach(el=>el.value=state[el.dataset.select]);
      query('[data-input]').placeholder=t.placeholder;
      root.querySelectorAll('[data-store]').forEach(b=>{const active=b.dataset.store===state.store;b.classList.toggle('ss288-active',active);b.setAttribute('aria-pressed',String(active));});
      for(const store of ['supermarket','drugstore']){const c=counts(store);query(`[data-store-counter="${store}"]`).textContent=`${c.done}/${c.all}`;}
      query('[data-store-title]').textContent=t[state.store];
      const c=counts(state.store);const pct=c.all===0?0:Math.round(c.done/c.all*100);
      query('[data-progress-compact]').textContent=`${c.done} / ${c.all} ${t.checked}`;
      query('[data-big]').textContent=String(c.left).padStart(2,'0');
      query('[data-fill]').style.width=pct+'%';query('[data-progress-text]').textContent=t.remaining+' / '+c.all+' '+t.count;query('[data-percent]').textContent=pct+'% '+t.completed;
      query('[data-count]').textContent=c.all+' '+t.count;
      query('[data-message]').textContent=state.message;
      query('[data-cta]').href=`https://apps.apple.com/${state.region}/app/shopsuggest/id6760823598`;
      renderList();renderSuggestions();
    }
    function add(key){const value=key.trim();if(value.length<1||value.length>60){state.message=translate('invalid');render();return;}
      if(state.items[state.store].some(i=>label(i).toLocaleLowerCase()===value.toLocaleLowerCase() || i.key.toLocaleLowerCase()===value.toLocaleLowerCase())){state.message=translate('exists');render();return;}
      state.items[state.store].push({key:value,done:false,id:'user-'+Math.random().toString(36).slice(2)});state.filter='';query('[data-input]').value='';state.message=translate('added');render();
    }
    root.addEventListener('click',e=>{
      const store=e.target.closest('[data-store]');if(store&&root.contains(store)){state.store=store.dataset.store;state.message='';state.filter='';query('[data-input]').value='';render();return;}
      const sug=e.target.closest('[data-suggestion]');if(sug&&root.contains(sug)){const key=sug.dataset.suggestion;state.items[state.store].push({key,done:false,id:key});state.filter='';query('[data-input]').value='';state.message=translate('added');render();return;}
      const rm=e.target.closest('[data-remove]');if(rm&&root.contains(rm)){state.items[state.store]=state.items[state.store].filter(i=>i.id!==rm.dataset.remove);state.message='';render();return;}
      if(e.target.closest('[data-reset-check]')){state.items[state.store].forEach(i=>i.done=false);state.message='';render();return;}
      if(e.target.closest('[data-restore]')){restore();state.store='supermarket';state.filter='';state.message='';query('[data-input]').value='';render();return;}
    });
    root.addEventListener('change',e=>{
      if(e.target.matches('[data-select]')){state[e.target.dataset.select]=e.target.value;state.message='';render();return;}
      if(e.target.matches('[data-toggle]')){const item=state.items[state.store].find(i=>i.id===e.target.dataset.toggle);if(item){item.done=e.target.checked;state.message='';render();}}
    });
    query('[data-input]').addEventListener('input',e=>{state.filter=e.target.value;state.message='';renderSuggestions();query('[data-message]').textContent='';});
    query('[data-add-form]').addEventListener('submit',e=>{e.preventDefault();add(query('[data-input]').value);});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
