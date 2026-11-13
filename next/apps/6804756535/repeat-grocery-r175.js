/* R175 Repeat Grocery List — website-only illustrative reusable checklist.
 * No persistent storage, tracking, notifications, network requests or account data.
 */
(() => {
  'use strict';
  const APP='6804756535', ID='tsz-repeat-grocery-r175';
  if (document.body?.dataset.p199Id !== APP || document.getElementById(ID)) return;

  const WORDS={
    en:{brand:'REPEAT GROCERY LIST',eyebrow:'YOUR LIST, READY FOR NEXT TIME',title1:'Write it once.',title2:'Shop it again.',sub:'Check off what you buy. Reset the list. Keep your favorites.',cta:'View on the App Store',thisTrip:'THIS TRIP',nextTrip:'NEXT TRIP',resetShort:'RESET',reset:'Reset checkmarks',add:'Add item',newItem:'New grocery item',placeholder:'e.g. Oat milk',status:'Items checked',more:'Keep the list. Start fresh.',removed:'Remove',resetExplainer:'Checkmarks clear. Your items stay.',example:'Illustrative web demo. Changes are not saved. Reset clears checkmarks, not items.',nameTooLong:'Use 1–40 characters.',maxItems:'Up to 20 items in this demo.',duplicate:'This item is already listed.',initial:['Milk','Eggs','Bread','Bananas','Coffee']},
    ja:{brand:'REPEAT GROCERY LIST',eyebrow:'次の買い物でも同じリスト',title1:'一度書けば、',title2:'何度でも使える。',sub:'買ったものにチェック。終わったらリセット。いつもの商品は残ります。',cta:'App Storeで見る',thisTrip:'今回の買い物',nextTrip:'次回の買い物',resetShort:'リセット',reset:'チェックをリセット',add:'追加',newItem:'商品名',placeholder:'例：牛乳',status:'チェック済み',more:'商品名は残して、次の買い物へ。',removed:'削除',resetExplainer:'チェックだけ消えます。商品は消えません。',example:'Webデモの入力は保存されません。リセットしても商品名は残ります。',nameTooLong:'商品名は1〜40文字で入力してください。',maxItems:'このデモは20商品までです。',duplicate:'同じ商品が登録されています。',initial:['牛乳','卵','食パン','バナナ','コーヒー']},
    ar:{brand:'REPEAT GROCERY LIST',eyebrow:'قائمتك جاهزة للمرة القادمة',title1:'اكتبها مرة.',title2:'وتسوّق بها مجدداً.',sub:'ضع علامة على ما اشتريته. أعد ضبط القائمة. احتفظ بأصنافك المفضلة.',cta:'عرضه على App Store',thisTrip:'هذه الجولة',nextTrip:'الجولة القادمة',resetShort:'إعادة',reset:'إزالة علامات الاختيار',add:'إضافة',newItem:'اسم الصنف',placeholder:'مثلاً: حليب',status:'عناصر تم شراؤها',more:'احتفظ بالأصناف وابدأ من جديد.',removed:'حذف',resetExplainer:'تختفي العلامات وتبقى الأصناف.',example:'عرض تجريبي: لا تُحفظ التغييرات. إعادة الضبط تمسح العلامات فقط.',nameTooLong:'أدخل اسماً من 1 إلى 40 حرفاً.',maxItems:'الحد الأقصى 20 صنفاً في هذا العرض.',duplicate:'هذا الصنف موجود في القائمة.',initial:['حليب','بيض','خبز','موز','قهوة']}
  };
  function getLang(){
    const val=(document.getElementById('p199-language')?.value || new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en').toLowerCase();
    return val.startsWith('ja')?'ja':val.startsWith('ar')?'ar':'en';
  }
  function region(){const r=(document.getElementById('p199-country')?.value||'us').toLowerCase();return /^[a-z]{2}$/.test(r)?r:'us';}
  const root=document.createElement('section');root.id=ID;root.className='rg175';root.setAttribute('aria-labelledby','rg175-title');
  root.innerHTML=`
    <div class="rg175-top"><div class="rg175-brand"><span class="rg175-cart" aria-hidden="true">↻</span><strong data-rg="brand"></strong></div><span class="rg175-eyebrow" data-rg="eyebrow"></span></div>
    <div class="rg175-lead"><div class="rg175-copy"><h2 id="rg175-title"><span data-rg="title1"></span><em data-rg="title2"></em></h2><p data-rg="sub"></p><a class="rg175-cta" id="rg175-store" href="https://apps.apple.com/us/app/id6804756535" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">●</span><span data-rg="cta"></span><span aria-hidden="true">↗</span></a></div><div class="rg175-food" aria-hidden="true"><span class="rg175-bag"></span><span class="rg175-grocery rg175-leaf"></span><span class="rg175-grocery rg175-tomato"></span><span class="rg175-grocery rg175-lemon"></span><span class="rg175-grocery rg175-bread"></span></div></div>
    <div class="rg175-demo" id="rg175-demo"><div class="rg175-card rg175-current"><div class="rg175-cardhead"><span aria-hidden="true">◉</span><strong data-rg="thisTrip"></strong><span id="rg175-counter" aria-live="polite"></span></div><ul id="rg175-current-items" aria-label="Current shopping list"></ul></div>
      <div class="rg175-arrow" aria-hidden="true"><span>↻</span><b data-rg="resetShort"></b></div>
      <div class="rg175-card rg175-next"><div class="rg175-cardhead"><span aria-hidden="true">○</span><strong data-rg="nextTrip"></strong></div><ul id="rg175-next-items" aria-label="Next shopping list"></ul></div></div>
    <div class="rg175-actions"><button id="rg175-reset" type="button"><span aria-hidden="true">↻</span><span data-rg="reset"></span></button><form id="rg175-form" novalidate><label class="rg175-sr" for="rg175-name" data-rg="newItem"></label><input id="rg175-name" type="text" maxlength="40" autocomplete="off" spellcheck="false" placeholder="e.g. Oat milk"><button type="submit"><span aria-hidden="true">＋</span><span data-rg="add"></span></button></form><p class="rg175-message" id="rg175-error" role="status" aria-live="polite"></p></div>
    <footer class="rg175-foot"><strong data-rg="more"></strong><p data-rg="resetExplainer"></p><small data-rg="example"></small></footer>`;
  const crumb=document.querySelector('.p19-breadcrumb');
  if(crumb)crumb.insertAdjacentElement('afterend',root);
  else {const main=document.getElementById('p199-content')||document.querySelector('main');main?.parentNode?.insertBefore(root,main);}
  if(!root.isConnected)return;
  const $=s=>root.querySelector(s), own=(label,cls)=>{const e=document.createElement(label);if(cls)e.className=cls;return e;};
  let locale=getLang();
  let items=WORDS[locale].initial.map((label,i)=>({id:i+1,label,done:i<3}));
  let nextId=6;
  function render(){
    const w=WORDS[locale],ul=$('#rg175-current-items'),next=$('#rg175-next-items');
    ul.replaceChildren();next.replaceChildren();
    for(const item of items){
      const li=own('li',item.done?'rg175-done':'');
      const check=own('label','rg175-row');const cb=own('input');cb.type='checkbox';cb.checked=item.done;cb.dataset.id=String(item.id);cb.setAttribute('aria-label',item.label);
      const mark=own('span','rg175-check');mark.setAttribute('aria-hidden','true');mark.textContent='✓';
      const name=own('span','rg175-name');name.textContent=item.label;
      check.append(cb,mark,name);li.append(check);
      const del=own('button','rg175-del');del.type='button';del.textContent='×';del.dataset.delete=String(item.id);del.setAttribute('aria-label',w.removed+': '+item.label);li.append(del);ul.append(li);
      const nextLi=own('li');const nextMark=own('span','rg175-uncheck');nextMark.setAttribute('aria-hidden','true');const nextName=own('span');nextName.textContent=item.label;nextLi.append(nextMark,nextName);next.append(nextLi);
    }
    $('#rg175-counter').textContent=`${items.filter(x=>x.done).length}/${items.length}`;
    $('#rg175-reset').disabled=items.every(x=>!x.done);
  }
  function translate(){
    const nextLocale=getLang(), old=locale;locale=nextLocale;
    // Initial example names follow language until the visitor edits the list.
    if(!root.dataset.edited && old!==locale){items=WORDS[locale].initial.map((label,i)=>({id:i+1,label,done:items[i]?.done??(i<3)}));nextId=6;}
    const w=WORDS[locale];root.lang=locale;root.dir=locale==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-rg]').forEach(el=>{el.textContent=w[el.dataset.rg]||'';});
    $('#rg175-name').placeholder=w.placeholder;
    $('#rg175-store').href=`https://apps.apple.com/${region()}/app/id${APP}`;
    $('#rg175-error').textContent='';render();
  }
  $('#rg175-current-items').addEventListener('change',ev=>{const cb=ev.target.closest('input[type="checkbox"]');if(!cb)return;const entry=items.find(x=>String(x.id)===cb.dataset.id);if(!entry)return;entry.done=cb.checked;root.dataset.edited='yes';render();});
  $('#rg175-current-items').addEventListener('click',ev=>{const btn=ev.target.closest('button[data-delete]');if(!btn)return;items=items.filter(x=>String(x.id)!==btn.dataset.delete);root.dataset.edited='yes';render();});
  $('#rg175-reset').addEventListener('click',()=>{items.forEach(item=>item.done=false);root.dataset.edited='yes';$('#rg175-error').textContent='';render();});
  $('#rg175-form').addEventListener('submit',event=>{
    event.preventDefault();const el=$('#rg175-name'), value=el.value.trim(),w=WORDS[locale];
    if(!value || [...value].length>40){$('#rg175-error').textContent=w.nameTooLong;return;}
    if(items.length>=20){$('#rg175-error').textContent=w.maxItems;return;}
    if(items.some(x=>x.label.toLocaleLowerCase()===value.toLocaleLowerCase())){$('#rg175-error').textContent=w.duplicate;return;}
    items.push({id:nextId++,label:value,done:false});root.dataset.edited='yes';el.value='';$('#rg175-error').textContent='';render();el.focus();
  });
  document.getElementById('p199-language')?.addEventListener('change',translate);
  document.getElementById('p199-country')?.addEventListener('change',translate);
  translate();
})();
