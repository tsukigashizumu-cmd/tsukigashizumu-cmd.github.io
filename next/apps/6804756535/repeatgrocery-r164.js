/* TSZ LP R164 — Repeat Grocery remaining-only focus illustration. No storage, network, analytics, or background actions. */
(()=>{'use strict';
const APP='6804756535',ID='tsz-rg164';
const LABEL={
 ja:{title:'買い終えたものを、いったん視界から。',kicker:'REPEAT GROCERY LIST · FOCUS MODE',badge:'LP専用の操作デモ',lead:'いつもの6品。買ったらチェック。終わったものを隠して、まだ買っていないものだけを見る。次の買い物では、同じリストを最初から使えます。',total:'いつもの商品',remaining:'まだ買うもの',done:'買ったもの',section:'買い物リスト',only:'残りだけ表示',showAll:'全部表示',todo:'買うもの',finished:'チェック済み',empty:'全部そろいました。次の買い物でも、同じ商品を使えます。',none:'まだチェックした商品はありません。',hint:'チェック済みを隠しても商品は消えません。次の買い物に戻すと、全品が未チェックに戻ります。',next:'次の買い物に戻す',undo:'ひとつ戻す',reset:'見本を初期化',foot:'説明用の固定商品です。チェックや表示切替は、このページ上だけ。データの保存・送信はしません。',mark:'チェックする',unmark:'チェックを外す',item:['牛乳','卵','パン','水','コーヒー','りんご']},
 en:{title:'Out of your sight. Not out of your list.',kicker:'REPEAT GROCERY LIST · FOCUS MODE',badge:'WEBSITE-ONLY DEMO',lead:'Your six usual groceries. Check each off as you shop. Hide what’s done to focus on what’s left—then bring back the same list for your next trip.',total:'Usual items',remaining:'Still to buy',done:'Checked off',section:'Your grocery list',only:'Only show remaining',showAll:'Show everything',todo:'Still to buy',finished:'Checked off',empty:'Everything is checked. Reuse this exact list on your next trip.',none:'Nothing has been checked yet.',hint:'Hiding checked items does not delete them. Starting a new trip unchecks everything without rebuilding the list.',next:'Start next trip',undo:'Undo last change',reset:'Reset example',foot:'Illustrative fixed items only. Checks and filters work in this page; nothing is stored or transmitted.',mark:'Check off',unmark:'Uncheck',item:['Milk','Eggs','Bread','Water','Coffee','Apples']},
 ar:{title:'أخفِ ما اشتريته، لا تمحُه من قائمتك.',kicker:'REPEAT GROCERY LIST · FOCUS MODE',badge:'تجربة تفاعلية داخل الموقع',lead:'ستة أصناف معتادة. ضع علامة على ما اشتريته، ثم أخفِه للتركيز على المتبقي. وفي الزيارة التالية أعد القائمة نفسها.',total:'الأصناف المعتادة',remaining:'المتبقي للشراء',done:'تم شراؤه',section:'قائمة التسوق',only:'عرض المتبقي فقط',showAll:'عرض القائمة كاملة',todo:'ما تبقى',finished:'تم شراؤه',empty:'اكتملت القائمة. يمكنك استعمال الأصناف نفسها في المرة القادمة.',none:'لم يتم تحديد أي صنف بعد.',hint:'إخفاء الأصناف المشتراة لا يحذفها. عند بدء زيارة جديدة تُزال علامات الشراء وتبقى القائمة كما هي.',next:'بدء زيارة جديدة',undo:'تراجع عن آخر تغيير',reset:'إعادة المثال',foot:'أصناف ثابتة للتوضيح فقط. لا تُحفظ التغييرات ولا تُرسل أي بيانات.',mark:'وضع علامة شراء',unmark:'إلغاء علامة الشراء',item:['حليب','بيض','خبز','ماء','قهوة','تفاح']}
};
const initial=()=>[false,false,true,true,false,false];
function detect(){const raw=document.getElementById('p199-language')?.value||document.documentElement.lang||'en';return /^ar/i.test(raw)?'ar':/^ja/i.test(raw)?'ja':'en'}
function mount(){
 if(document.getElementById(ID))return;
 const owner=document.querySelector('[data-p199-id="'+APP+'"]');if(!owner)return;
 const anchor=document.getElementById('tsz-rg134')||document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
 const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Repeat Grocery remaining items interactive illustration');
 root.innerHTML=`<div class="rg164-hero"><div class="rg164-meta"><strong data-t="kicker"></strong><span class="rg164-badge" data-t="badge"></span></div><h2 data-t="title"></h2><p class="rg164-lead" data-t="lead"></p></div>
 <div class="rg164-body"><div class="rg164-summary" aria-live="polite"><div class="rg164-stat"><span data-t="total"></span><strong data-out="total"></strong></div><div class="rg164-stat rg164-stat-focus"><span data-t="remaining"></span><strong data-out="remaining"></strong></div><div class="rg164-stat"><span data-t="done"></span><strong data-out="done"></strong></div></div>
 <div class="rg164-top"><h3 data-t="section"></h3><button type="button" class="rg164-visibility" data-action="only" aria-pressed="false"><span data-out="only-label"></span><span aria-hidden="true">◉</span></button></div>
 <div class="rg164-progress" aria-hidden="true"><span class="rg164-fill"></span></div>
 <div class="rg164-panels"><div class="rg164-panel"><div class="rg164-panel-head"><h4 data-t="todo"></h4><span data-out="todo-count"></span></div><ul class="rg164-items" data-list="pending"></ul><p class="rg164-blank" data-out="empty-pending" hidden></p></div>
 <div class="rg164-panel rg164-panel-done"><div class="rg164-panel-head"><h4 data-t="finished"></h4><span data-out="done-count"></span></div><ul class="rg164-items" data-list="done"></ul><p class="rg164-blank" data-out="empty-done" hidden></p></div></div>
 <div class="rg164-hint"><span class="rg164-hint-icon" aria-hidden="true">i</span><span data-t="hint"></span></div></div>
 <div class="rg164-bottom"><p class="rg164-small" data-t="foot"></p><div class="rg164-actions"><button type="button" class="rg164-secondary" data-action="undo" data-t="undo"></button><button type="button" class="rg164-primary" data-action="next" data-t="next"></button><button type="button" class="rg164-secondary" data-action="reset" data-t="reset"></button></div></div>`;
 if(anchor.id==='overview'||anchor.id==='tsz-rg134')anchor.insertAdjacentElement('afterend',root);else anchor.prepend(root);
 let checked=initial(),only=false,history=[];
 const $=s=>root.querySelector(s);
 const save=()=>{history.push({checked:[...checked],only});if(history.length>30)history.shift()};
 const update=()=>{
  const lc=detect(),t=LABEL[lc];root.lang=lc;root.dir=lc==='ar'?'rtl':'ltr';
  root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.dataset.t]||''});
  const done=checked.filter(Boolean).length,remaining=checked.length-done;
  root.dataset.remaining=String(remaining);root.dataset.done=String(done);root.dataset.only=String(only);
  $('[data-out="total"]').textContent=String(checked.length);
  $('[data-out="remaining"]').textContent=String(remaining);
  $('[data-out="done"]').textContent=String(done);
  $('[data-out="todo-count"]').textContent=String(remaining);
  $('[data-out="done-count"]').textContent=String(done);
  $('.rg164-fill').style.width=(100*done/checked.length)+'%';
  const vis=$('[data-action="only"]');vis.setAttribute('aria-pressed',String(only));$('[data-out="only-label"]').textContent=only?t.showAll:t.only;
  $('[data-action="undo"]').disabled=history.length===0;
  const render=(status,list)=>{
   list.replaceChildren();checked.forEach((isDone,i)=>{
    if(isDone!==status)return;
    const li=document.createElement('li'),button=document.createElement('button');button.type='button';button.className='rg164-item'+(isDone?' rg164-item-done':'');button.dataset.index=String(i);
    button.setAttribute('aria-label',(isDone?t.unmark:t.mark)+' — '+t.item[i]);
    const symbol=document.createElement('span');symbol.className='rg164-check';symbol.textContent=isDone?'✓':'';symbol.setAttribute('aria-hidden','true');
    const label=document.createElement('span');label.className='rg164-name';label.textContent=t.item[i];button.append(symbol,label);li.append(button);list.append(li);
   });
  };
  render(false,$('[data-list="pending"]'));render(true,$('[data-list="done"]'));
  $('[data-out="empty-pending"]').hidden=remaining!==0;$('[data-out="empty-pending"]').textContent=t.empty;
  $('[data-out="empty-done"]').hidden=done!==0;$('[data-out="empty-done"]').textContent=t.none;
 };
 root.addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b||!root.contains(b))return;
  if(b.dataset.index!==undefined){const i=Number(b.dataset.index);if(!Number.isInteger(i)||i<0||i>=checked.length)return;save();checked[i]=!checked[i];}
  else if(b.dataset.action==='only'){save();only=!only;}
  else if(b.dataset.action==='next'){save();checked=checked.map(()=>false);only=false;}
  else if(b.dataset.action==='reset'){save();checked=initial();only=false;}
  else if(b.dataset.action==='undo'){const last=history.pop();if(!last)return;checked=last.checked;only=last.only;}
  else return;
  update();
 });
 document.getElementById('p199-language')?.addEventListener('change',update);
 let previous=detect();new MutationObserver(()=>{if(previous!==detect()){previous=detect();update()}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 update();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
