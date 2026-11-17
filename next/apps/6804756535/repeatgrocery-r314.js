/* R314 Repeat Grocery List — LP-only reusable checklist, no network/storage. */
(() => {
  'use strict';
  const TEXT={
    en:{kicker:'REPEAT GROCERY LIST / LIVE PREVIEW',title:'The same groceries. Not another list from scratch.',lead:'Milk, eggs, bread, water. Check them off this trip, then bring the same list back next time — without retyping.',list:'Your everyday list',complete:'bought',addPlace:'Add a regular item',add:'Add',tip:'Tip: tap an item to mark it bought. Your list stays available for the next trip.',trip:'ONE LIST. MANY TRIPS.',done:'Shopping done.',active:'Ready for the store.',left:'Still to pick up',next:'Prepare the next trip',nextTip:'Reset the checkmarks, keep your items.',newTrip:'New trip ready. Your items are still here.',itemLimit:'You can add up to 12 items in this preview.',empty:'Enter an item name.',duplicate:'That item is already on your list.',note:'LP demo only. The list lives in this browser page and is not saved or sent. The iPhone app saves your regular items.',store:'View on App Store',items:['Milk','Eggs','Bread','Water'],tripCount:'Trip',resetConfirm:'All checkmarks cleared. Your list is ready again.'},
    ja:{kicker:'REPEAT GROCERY LIST / 操作型プレビュー',title:'毎週同じ買い物。リストまで毎回作り直さない。',lead:'牛乳、卵、パン、水。買ったらチェック。次の買い物では、同じリストをもう一度使おう。',list:'いつもの買い物リスト',complete:'購入済み',addPlace:'いつもの品物を追加',add:'追加',tip:'品物を押すと購入済みになります。次回はチェックだけ解除して再利用。',trip:'一つのリストを、何度でも。',done:'買い物、完了。',active:'いつものリストで、出発。',left:'まだ買っていない',next:'次の買い物を始める',nextTip:'品物を残して、チェックだけ解除します。',newTrip:'次の買い物の準備ができました。',itemLimit:'このプレビューでは12品まで追加できます。',empty:'品物の名前を入力してください。',duplicate:'その品物はすでにあります。',note:'LP専用デモです。入力はこのページ内だけに残り、保存・外部送信はしません。実際のアプリはリストを保存できます。',store:'App Storeで見る',items:['牛乳','卵','パン','水'],tripCount:'買い物',resetConfirm:'購入チェックを解除しました。同じリストを再利用できます。'},
    ar:{kicker:'REPEAT GROCERY LIST / تجربة تفاعلية',title:'مشترياتك المعتادة. دون كتابة القائمة كل مرة.',lead:'الحليب والبيض والخبز والماء. ضع علامة على ما اشتريته ثم استخدم القائمة نفسها في الزيارة القادمة.',list:'قائمة مشترياتك المعتادة',complete:'تم شراؤها',addPlace:'أضف منتجًا معتادًا',add:'إضافة',tip:'اضغط العنصر عند شرائه. في المرة المقبلة أعد تعيين العلامات واحتفظ بالعناصر.',trip:'قائمة واحدة. رحلات كثيرة.',done:'انتهى التسوق.',active:'القائمة جاهزة للتسوق.',left:'ما زال عليك شراء',next:'استعد للرحلة التالية',nextTip:'أزل علامات الشراء واحتفظ بعناصرك.',newTrip:'القائمة جاهزة من جديد.',itemLimit:'يمكن إضافة 12 عنصرًا في هذه التجربة.',empty:'أدخل اسم المنتج.',duplicate:'هذا المنتج موجود بالفعل.',note:'تجربة داخل صفحة العرض فقط. لا تُحفظ البيانات ولا تُرسل. التطبيق الأصلي يحفظ قائمتك المعتادة.',store:'عرضه في App Store',items:['حليب','بيض','خبز','ماء'],tripCount:'رحلة',resetConfirm:'أُزيلت العلامات وبقيت القائمة جاهزة.'}
  };
  function setup(host){
    const section=document.createElement('section');section.id='repeatgrocery-r314';section.setAttribute('aria-label','Repeat Grocery List interactive preview');host.appendChild(section);
    let lang='en',items=TEXT.en.items.map((name,id)=>({id,name,done:false,transKey:id})), trip=1, message='',nextId=4;
    section.innerHTML=`<div class="rg314-shell"><div class="rg314-top"><div><div class="rg314-kicker" data-t="kicker"></div><h2 data-t="title"></h2><p class="rg314-lead" data-t="lead"></p></div><div class="rg314-langs" role="group" aria-label="Language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></div><div class="rg314-grid"><div class="rg314-panel"><div class="rg314-panelhead"><h3 data-t="list"></h3><div class="rg314-count"></div></div><div class="rg314-progress"><div class="rg314-progressfill"></div></div><div class="rg314-items" role="group"></div><form class="rg314-add"><input name="newItem" type="text" maxlength="46" autocomplete="off" aria-label="Add item"><button type="submit" data-t="add"></button></form><p class="rg314-hint" data-t="tip"></p></div><div class="rg314-panel rg314-visual"><div><div class="rg314-triplabel" data-t="trip"></div><div class="rg314-status" role="status"></div><div class="rg314-pulse"><i aria-hidden="true"></i><span class="rg314-tripcount"></span></div><p class="rg314-caption" data-t="nextTip"></p></div><div class="rg314-reuse"><button type="button" data-action="next" data-t="next"></button><div class="rg314-caption" role="alert" aria-live="polite" data-message></div></div></div></div><div class="rg314-bottom"><p class="rg314-note" data-t="note"></p><a class="rg314-store" href="https://apps.apple.com/us/app/id6804756535" target="_blank" rel="noopener noreferrer" data-t="store"></a></div></div>`;
    const $=s=>section.querySelector(s),$$=s=>[...section.querySelectorAll(s)];
    function render(){
      const t=TEXT[lang];section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';
      $$('[data-t]').forEach(el=>el.textContent=t[el.dataset.t]);
      $$('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===lang)));
      const done=items.filter(x=>x.done).length;
      $('.rg314-count').textContent=`${done} / ${items.length} ${t.complete}`;
      $('.rg314-progressfill').style.width=(items.length?(100*done/items.length):0)+'%';
      $('.rg314-items').replaceChildren();
      for(const item of items){
        const btn=document.createElement('button');btn.type='button';btn.className='rg314-item';btn.dataset.id=String(item.id);btn.dataset.done=String(item.done);btn.setAttribute('aria-pressed',String(item.done));
        const check=document.createElement('span');check.className='rg314-check';check.textContent=item.done?'✓':'';check.setAttribute('aria-hidden','true');
        const name=document.createElement('span');name.className='rg314-itemname';name.textContent=item.transKey===null?item.name:t.items[item.transKey];
        btn.append(check,name);$('.rg314-items').appendChild(btn);
      }
      $('.rg314-status').textContent=items.length && done===items.length?t.done:t.active;
      $('.rg314-tripcount').textContent=`${t.tripCount} ${trip} · ${items.length-done} ${t.left}`;
      $('.rg314-add input').placeholder=t.addPlace;
      $('[data-message]').textContent=message;
      $('[data-action="next"]').disabled=done===0;
    }
    section.addEventListener('click',e=>{
      const b=e.target.closest('button');if(!b||!section.contains(b))return;
      if(b.dataset.lang){lang=b.dataset.lang;message='';render();return;}
      if(b.dataset.id!==undefined){const item=items.find(x=>x.id===Number(b.dataset.id));if(item)item.done=!item.done;message='';render();return;}
      if(b.dataset.action==='next'){if(items.some(x=>x.done)){items.forEach(x=>x.done=false);trip++;message=TEXT[lang].resetConfirm;render();}}
    });
    $('.rg314-add').addEventListener('submit',e=>{
      e.preventDefault();const input=$('.rg314-add input'),name=input.value.trim().replace(/\s+/g,' '),t=TEXT[lang];
      if(!name){message=t.empty;render();return;}
      if(items.length>=12){message=t.itemLimit;render();return;}
      if(items.some(x=>(x.transKey===null?x.name:t.items[x.transKey]).toLocaleLowerCase()===name.toLocaleLowerCase())){message=t.duplicate;render();return;}
      items.push({id:nextId++,name,done:false,transKey:null});input.value='';message='';render();
    });
    render();
  }
  function mount(){if(document.getElementById('repeatgrocery-r314'))return;const preview=document.getElementById('rg314-preview-root');if(preview){setup(preview);return;}const related=document.getElementById('related');if(related?.parentElement){const container=document.createElement('div');related.parentElement.insertBefore(container,related);setup(container);return;}setup(document.querySelector('main')||document.body);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
