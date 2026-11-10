/* Repeat Grocery List / R106: landing-page simulation; memory-only; no network or storage. */
(()=>{'use strict';
const ID='tsz-repeatgrocery-r106'; if(document.getElementById(ID))return;
const words={
 ja:{eyebrow:'REPEAT GROCERY LIST · 体験デモ',title:'毎回、同じ買い物を書き直さない。',intro:'いつもの品物を一度並べる。買ったらチェック。次の買い物では、そのまま全部未チェックに戻して使います。',trip:'今回の買い物',checked:'買ったもの',total:'いつもの品物',still:'まだ買うもの',ready:'全部買いました。次回もこのリストを使えます。',today:'買い物リスト',addTitle:'いつもの品物を増やす',placeholder:'例：コーヒー',add:'追加',next:'次の買い物へ',nextInfo:'品物は残したまま、チェックだけ外します。',restore:'デモを初期状態に戻す',milk:'牛乳',eggs:'たまご',bread:'食パン',water:'水',note:'LP内の説明用サンプルです。端末への保存、送信、実際の買い物履歴の管理は行いません。',empty:'品物がありません。',duplicate:'同じ品物がすでにあります。',invalid:'品物を入力してください。',limit:'デモは最大12品までです。',resetDone:'次の買い物の準備ができました。',sampleDone:'初期サンプルに戻しました。',added:'品物を追加しました。',count:'件',remove:'品物を取り除く',done:'購入済み',unchecked:'未購入'},
 en:{eyebrow:'REPEAT GROCERY LIST · INTERACTIVE DEMO',title:'Same groceries. No rewriting.',intro:'Keep your usual list. Check things off as you shop. Next time, clear the ticks—not the items—and use the same list again.',trip:'This shopping trip',checked:'Picked up',total:'Usual items',still:'Still to buy',ready:'All done. The same list will be ready next time.',today:'Your familiar list',addTitle:'Add a usual item',placeholder:'e.g. Coffee',add:'Add item',next:'Start the next trip',nextInfo:'All item names stay. Only the checkmarks reset.',restore:'Restore sample',milk:'Milk',eggs:'Eggs',bread:'Bread',water:'Water',note:'A landing-page simulation only. It does not store or transmit data or manage real shopping history.',empty:'No items yet.',duplicate:'This item is already on the list.',invalid:'Enter an item name.',limit:'The demo holds up to 12 items.',resetDone:'Ready for the next trip.',sampleDone:'Sample restored.',added:'Item added.',count:'items',remove:'Remove item',done:'Purchased',unchecked:'Not yet'},
 ar:{eyebrow:'قائمة التسوق المتكررة · تجربة تفاعلية',title:'نفس المشتريات. من دون كتابة من جديد.',intro:'احتفظ بقائمتك المعتادة. ضع علامة على ما اشتريته، وفي المرة القادمة امسح العلامات فقط وأعد استخدام القائمة نفسها.',trip:'جولة التسوق الحالية',checked:'تم شراؤه',total:'العناصر المعتادة',still:'المتبقي للشراء',ready:'اكتمل التسوق. القائمة نفسها جاهزة للمرة القادمة.',today:'قائمتك المعتادة',addTitle:'أضف عنصراً معتاداً',placeholder:'مثال: قهوة',add:'إضافة',next:'بدء جولة جديدة',nextInfo:'تبقى أسماء العناصر كما هي؛ تُمسح علامات الشراء فقط.',restore:'استعادة المثال',milk:'حليب',eggs:'بيض',bread:'خبز',water:'ماء',note:'هذا نموذج توضيحي داخل الصفحة فقط. لا يحفظ البيانات ولا يرسلها ولا يسجّل مشتريات حقيقية.',empty:'لا توجد عناصر.',duplicate:'هذا العنصر موجود مسبقاً.',invalid:'أدخل اسم العنصر.',limit:'يقبل هذا المثال 12 عنصراً كحد أقصى.',resetDone:'القائمة جاهزة للتسوق مرة أخرى.',sampleDone:'تمت استعادة المثال.',added:'تمت إضافة العنصر.',count:'عناصر',remove:'إزالة العنصر',done:'تم شراؤه',unchecked:'لم يُشتر بعد'}
};
const initial=()=>[{key:'milk',done:true},{key:'eggs',done:false},{key:'bread',done:true},{key:'water',done:false}];
let items=initial(),message='';
const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Repeat Grocery List interactive next-trip demo');
root.innerHTML=`<div class="rg106-head"><p class="rg106-eyebrow"></p><h2></h2><p class="rg106-intro"></p></div>
<div class="rg106-layout"><div class="rg106-phone"><div class="rg106-phone-bar"><span class="rg106-mini-dot"></span><span class="rg106-phone-label"></span><span class="rg106-count"></span></div><div class="rg106-meters"><div><span class="rg106-meters-caption rg106-checked-title"></span><strong class="rg106-checked-count"></strong></div><div><span class="rg106-meters-caption rg106-remaining-title"></span><strong class="rg106-remaining-count"></strong></div></div><div class="rg106-progress" role="progressbar" aria-valuemin="0" aria-valuemax="4" aria-valuenow="2"><span class="rg106-progress-fill"></span></div><ul class="rg106-items"></ul><p class="rg106-ready" aria-live="polite"></p></div>
<div class="rg106-controls"><p class="rg106-trip-label"></p><p class="rg106-subtle rg106-next-info"></p><button type="button" class="rg106-next"></button><form class="rg106-form"><label class="rg106-form-label" for="rg106-add-input"></label><div class="rg106-add-row"><input id="rg106-add-input" class="rg106-input" type="text" maxlength="36" autocomplete="off"><button type="submit" class="rg106-add"></button></div></form><p class="rg106-feedback" role="status" aria-live="polite"></p><button type="button" class="rg106-restore"></button><p class="rg106-note"></p></div></div>`;
const q=s=>root.querySelector(s), lang=()=>{const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en'}, w=()=>words[lang()];
const itemName=item=>item.key&&w()[item.key]?w()[item.key]:item.name;
function render(){const t=w(),n=items.filter(x=>x.done).length;
 root.lang=lang();root.dir=lang()==='ar'?'rtl':'ltr';
 const labels={'.rg106-eyebrow':'eyebrow','h2':'title','.rg106-intro':'intro','.rg106-phone-label':'today','.rg106-checked-title':'checked','.rg106-remaining-title':'still','.rg106-trip-label':'trip','.rg106-next-info':'nextInfo','.rg106-next':'next','.rg106-form-label':'addTitle','.rg106-add':'add','.rg106-restore':'restore','.rg106-note':'note'};
 Object.entries(labels).forEach(([s,k])=>q(s).textContent=t[k]);
 q('.rg106-input').placeholder=t.placeholder;q('.rg106-input').setAttribute('aria-label',t.addTitle);
 q('.rg106-count').textContent=`${items.length} ${t.count}`;q('.rg106-checked-count').textContent=String(n);q('.rg106-remaining-count').textContent=String(items.length-n);
 q('.rg106-progress').setAttribute('aria-valuemax',String(Math.max(items.length,1)));q('.rg106-progress').setAttribute('aria-valuenow',String(n));q('.rg106-progress-fill').style.width=(items.length?100*n/items.length:0)+'%';
 const list=q('.rg106-items');list.replaceChildren();items.forEach((item,i)=>{
 const li=document.createElement('li');li.className=item.done?'rg106-item rg106-done':'rg106-item';
 const label=document.createElement('label');label.className='rg106-item-label';
 const box=document.createElement('input');box.type='checkbox';box.checked=item.done;box.dataset.index=String(i);box.setAttribute('aria-label',itemName(item));
 const txt=document.createElement('span');txt.textContent=itemName(item);label.append(box,txt);
 const remove=document.createElement('button');remove.type='button';remove.className='rg106-remove';remove.dataset.remove=String(i);remove.setAttribute('aria-label',`${t.remove}: ${itemName(item)}`);remove.textContent='×';
 li.append(label,remove);list.append(li);
 });
 if(!items.length){const e=document.createElement('li');e.className='rg106-empty';e.textContent=t.empty;list.append(e)}
 q('.rg106-ready').textContent=items.length&&n===items.length?t.ready:'';
 q('.rg106-feedback').textContent=message?t[message]||message:'';
}
root.addEventListener('change',event=>{const el=event.target;if(!el.matches('.rg106-item input[type="checkbox"]'))return;const i=Number(el.dataset.index);if(Number.isInteger(i)&&items[i]){items[i].done=el.checked;message='';render()}});
root.addEventListener('click',event=>{const b=event.target.closest('button');if(!b)return;
 if(b.matches('.rg106-next')){items.forEach(x=>x.done=false);message='resetDone';render()}
 else if(b.matches('.rg106-restore')){items=initial();message='sampleDone';q('.rg106-input').value='';render()}
 else if(b.matches('.rg106-remove')){const i=Number(b.dataset.remove);if(Number.isInteger(i)&&items[i]){items.splice(i,1);message='';render()}}
});
q('.rg106-form').addEventListener('submit',e=>{e.preventDefault();const v=q('.rg106-input').value.trim().slice(0,36);
 if(!v){message='invalid';render();return}
 if(items.length>=12){message='limit';render();return}
 if(items.some(x=>itemName(x).toLocaleLowerCase()===v.toLocaleLowerCase())){message='duplicate';render();return}
 items.push({name:v,done:false});q('.rg106-input').value='';message='added';render();
});
function mount(){if(root.isConnected)return;const host=document.querySelector('#overview')||document.querySelector('main')||document.body;host.insertAdjacentElement('afterend',root);render()}
new MutationObserver(()=>{if(root.isConnected&&root.lang!==lang())render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
