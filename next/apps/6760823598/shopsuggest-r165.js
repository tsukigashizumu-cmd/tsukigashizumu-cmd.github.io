/* TSZ LP R165 ShopSuggest — illustrative store-specific priority and progress demo. No storage, network or external dependencies. */
(()=>{'use strict';
const APP='6760823598',ID='tsz-ss165';
const I={
 ja:{kicker:'SHOPSUGGEST · STORE BY STORE',badge:'LP専用・操作できる見本',title:'スーパーと薬局。買う順番も、進み具合も混ぜない。',lead:'いつもの買い物は、お店ごとに。購入済みをチェックし、↑↓で優先する順番を整える。切り替えても、それぞれの進捗はそのまま残ります。',super:'スーパー',drug:'ドラッグストア',stores:'お店を切り替える',completed:'購入済み',remaining:'残り',items:'商品',priority:'このお店の買う順番',instruction:'チェックは買った印。上下ボタンでその店だけの順番を変更します。',undo:'ひとつ戻す',reset:'見本を最初から',note:'画面内だけの固定サンプルです。実アプリのデータは読み込まず、保存も送信もしません。再読み込みで初期状態に戻ります。',up:'上へ',down:'下へ',check:'購入済みにする',uncheck:'未購入に戻す',done:'購入済み',todo:'未購入',names:{milk:'牛乳',eggs:'卵',bread:'パン',apples:'りんご',soap:'ハンドソープ',tissues:'ティッシュ',paste:'歯磨き粉'}},
 en:{kicker:'SHOPSUGGEST · STORE BY STORE',badge:'INTERACTIVE WEB EXAMPLE',title:'Two stores. Two lists. Nothing gets mixed up.',lead:'Keep supermarket and drugstore shopping separate. Check items off, move what matters up the list, and switch stores without losing each list’s progress.',super:'Supermarket',drug:'Drugstore',stores:'Switch stores',completed:'Checked off',remaining:'Remaining',items:'Items',priority:'Shopping order for this store',instruction:'Check off what you bought. Move items up or down without changing the other store.',undo:'Undo last change',reset:'Reset example',note:'Fixed illustrative items only. No real app data is read. Nothing is saved or transmitted; reload to reset.',up:'Move up',down:'Move down',check:'Mark bought',uncheck:'Mark unbought',done:'Bought',todo:'To buy',names:{milk:'Milk',eggs:'Eggs',bread:'Bread',apples:'Apples',soap:'Hand soap',tissues:'Tissues',paste:'Toothpaste'}},
 ar:{kicker:'SHOPSUGGEST · قوائم منفصلة',badge:'مثال تفاعلي داخل الموقع',title:'متجران، قائمتان، دون خلط.',lead:'اجعل قائمة السوبرماركت منفصلة عن متجر المستلزمات. حدّد ما اشتريته، وغيّر ترتيب الأولويات، ثم بدّل المتجر دون أن يضيع تقدّم أي قائمة.',super:'السوبرماركت',drug:'متجر المستلزمات',stores:'تبديل المتجر',completed:'تم شراؤه',remaining:'المتبقي',items:'الأصناف',priority:'ترتيب الشراء في هذا المتجر',instruction:'حدّد ما اشتريته وحرّك العناصر للأعلى أو الأسفل داخل المتجر المختار فقط.',undo:'تراجع عن آخر تغيير',reset:'إعادة ضبط المثال',note:'عناصر ثابتة للتوضيح فقط. لا تُقرأ بيانات التطبيق الحقيقية، ولا يتم حفظ أي شيء أو إرساله.',up:'تحريك للأعلى',down:'تحريك للأسفل',check:'تحديد كمشترى',uncheck:'إلغاء حالة الشراء',done:'تم شراؤه',todo:'لم يُشترَ',names:{milk:'حليب',eggs:'بيض',bread:'خبز',apples:'تفاح',soap:'صابون اليدين',tissues:'مناديل',paste:'معجون الأسنان'}}
};
const initial=()=>({super:[{key:'milk',done:true},{key:'eggs',done:false},{key:'bread',done:false},{key:'apples',done:false}],drug:[{key:'soap',done:false},{key:'tissues',done:true},{key:'paste',done:false}]});
function locale(){const raw=document.getElementById('p199-language')?.value||document.documentElement.lang||'en';return /^ar/i.test(raw)?'ar':/^ja/i.test(raw)?'ja':'en';}
function mount(){
 if(document.getElementById(ID))return;
 const owner=document.querySelector('[data-p199-id="'+APP+'"]');if(!owner)return;
 const anchor=document.getElementById('tsz-shopsuggest-r136')||document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
 const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','ShopSuggest store-specific lists interactive example');
 root.innerHTML=`<div class="ss165-hero"><div class="ss165-meta"><strong data-text="kicker"></strong><span class="ss165-badge" data-text="badge"></span></div><h2 data-text="title"></h2><p data-text="lead"></p></div>
 <div class="ss165-body"><div class="ss165-switch-title" data-text="stores"></div><div class="ss165-tabs" role="group" aria-label="Store selection"><button type="button" data-store="super" aria-pressed="true"><span class="ss165-store-icon" aria-hidden="true">◈</span><span data-text="super"></span><small data-counter="super"></small></button><button type="button" data-store="drug" aria-pressed="false"><span class="ss165-store-icon" aria-hidden="true">✳</span><span data-text="drug"></span><small data-counter="drug"></small></button></div>
 <div class="ss165-summary" aria-live="polite"><div class="ss165-summary-item"><span data-text="items"></span><strong data-out="total"></strong></div><div class="ss165-summary-item"><span data-text="completed"></span><strong data-out="done"></strong></div><div class="ss165-summary-item ss165-summary-focus"><span data-text="remaining"></span><strong data-out="left"></strong></div></div>
 <div class="ss165-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="25" aria-label="Store progress"><span class="ss165-progress-fill"></span></div>
 <div class="ss165-list-top"><h3 data-text="priority"></h3><p data-text="instruction"></p></div><ol class="ss165-list" data-list></ol></div>
 <div class="ss165-footer"><p data-text="note"></p><div class="ss165-actions"><button type="button" data-action="undo" data-text="undo"></button><button type="button" data-action="reset" data-text="reset"></button></div></div>`;
 if(anchor.id==='overview'||anchor.id==='tsz-shopsuggest-r136')anchor.insertAdjacentElement('afterend',root);else anchor.prepend(root);
 const $=s=>root.querySelector(s);
 let lists=initial(),active='super',history=[];
 const save=()=>{history.push({lists:JSON.parse(JSON.stringify(lists)),active});if(history.length>40)history.shift()};
 function update(){
  const lc=locale(),t=I[lc],items=lists[active],done=items.filter(x=>x.done).length,total=items.length;
  root.lang=lc;root.dir=lc==='ar'?'rtl':'ltr';root.dataset.store=active;root.dataset.done=String(done);root.dataset.total=String(total);root.dataset.order=items.map(x=>x.key).join(',');
  root.querySelectorAll('[data-text]').forEach(el=>{el.textContent=t[el.dataset.text]||''});
  for(const store of ['super','drug']){
   const el=$('[data-store="'+store+'"]');el.setAttribute('aria-pressed',String(active===store));
   const d=lists[store].filter(x=>x.done).length;
   $('[data-counter="'+store+'"]').textContent=d+'/'+lists[store].length;
  }
  $('[data-out="total"]').textContent=String(total);$('[data-out="done"]').textContent=String(done);$('[data-out="left"]').textContent=String(total-done);
  $('.ss165-progress-fill').style.width=(100*done/total)+'%';$('.ss165-progress').setAttribute('aria-valuenow',String(Math.round(100*done/total)));
  $('[data-action="undo"]').disabled=history.length===0;
  const ol=$('[data-list]');ol.replaceChildren();
  items.forEach((item,index)=>{
   const li=document.createElement('li');li.className='ss165-item'+(item.done?' ss165-isdone':'');li.dataset.key=item.key;
   const count=document.createElement('span');count.className='ss165-rank';count.textContent=String(index+1).padStart(2,'0');
   const check=document.createElement('button');check.type='button';check.className='ss165-check';check.dataset.check=String(index);check.setAttribute('aria-pressed',String(item.done));check.setAttribute('aria-label',(item.done?t.uncheck:t.check)+' '+t.names[item.key]);check.textContent=item.done?'✓':'';
   const name=document.createElement('span');name.className='ss165-name';name.textContent=t.names[item.key];
   const state=document.createElement('span');state.className='ss165-state';state.textContent=item.done?t.done:t.todo;
   const controls=document.createElement('div');controls.className='ss165-move';
   for(const [dir,label,disabled] of [['up',t.up,index===0],['down',t.down,index===total-1]]){
    const b=document.createElement('button');b.type='button';b.dataset.move=dir;b.dataset.index=String(index);b.disabled=disabled;b.textContent=dir==='up'?'↑':'↓';b.setAttribute('aria-label',label+' '+t.names[item.key]);controls.append(b);
   }
   li.append(count,check,name,state,controls);ol.append(li);
  });
 }
 root.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||!root.contains(b)||b.disabled)return;
  if(b.dataset.store){active=b.dataset.store;}
  else if(b.dataset.check!==undefined){const i=Number(b.dataset.check);if(!lists[active][i])return;save();lists[active][i].done=!lists[active][i].done;}
  else if(b.dataset.move){const i=Number(b.dataset.index),j=i+(b.dataset.move==='up'?-1:1);if(j<0||j>=lists[active].length||!Number.isInteger(i))return;save();[lists[active][i],lists[active][j]]=[lists[active][j],lists[active][i]];}
  else if(b.dataset.action==='undo'){const prev=history.pop();if(!prev)return;lists=prev.lists;active=prev.active;}
  else if(b.dataset.action==='reset'){save();lists=initial();active='super';}
  else return;
  update();
 });
 document.getElementById('p199-language')?.addEventListener('change',update);
 let old=locale();new MutationObserver(()=>{if(old!==locale()){old=locale();update()}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 update();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
