/* R136: ShopSuggest web-only demonstration; no network, persistence, or app data access. */
(()=>{
'use strict';
const ROOT_ID='tsz-shopsuggest-r136';
if(document.getElementById(ROOT_ID)) return;
const translations={
 ja:{eyebrow:'SHOPSUGGEST · 使ってみる',title:'前に買ったものを、また一から打たなくていい。',desc:'店舗を選び、以前入力した商品をサジェストから戻してみよう。チェックすると進捗も変わります。',added:'サジェストから追加',items:'この店舗の商品',stores:'店舗',suggestions:'過去の項目をもう一度',sub:'＋を押すだけで追加。買い物リストの一例です。',list:'今回の買い物リスト',progress:'購入済み',market:'スーパー',drug:'ドラッグストア',already:'追加済み',addedMsg:'「{name}」を追加しました',checkedMsg:'進捗を更新しました',reset:'デモを最初から',resetMsg:'デモを初期化しました',note:'LP専用のサンプルです。実際のアプリの記録を保存・変更しません。ページを再読み込みすると初期状態に戻ります。',suggestionsCount:'候補の再利用',done:'チェック済み',names:{bread:'パン',soap:'ハンドソープ',milk:'牛乳',eggs:'卵',rice:'お米',banana:'バナナ',detergent:'洗剤',tissues:'ティッシュ',sun:'日焼け止め'}},
 en:{eyebrow:'SHOPSUGGEST · TRY IT',title:'Bought it before? Don’t type it again.',desc:'Choose a store, reuse past items from suggestions, and check them off to see your progress.',added:'Added from suggestions',items:'Items in this store',stores:'Store',suggestions:'Bring back a previous item',sub:'Tap + to add. This is a sample shopping list.',list:'Today’s shopping list',progress:'Completed',market:'Supermarket',drug:'Drugstore',already:'Added',addedMsg:'Added {name}',checkedMsg:'Progress updated',reset:'Reset this demo',resetMsg:'Demo reset',note:'Website-only sample. No real app data is read or changed. Reloading clears these example changes.',suggestionsCount:'Reusable suggestions',done:'Checked off',names:{bread:'Bread',soap:'Hand soap',milk:'Milk',eggs:'Eggs',rice:'Rice',banana:'Bananas',detergent:'Detergent',tissues:'Tissues',sun:'Sunscreen'}},
 ar:{eyebrow:'SHOPSUGGEST · جرّبها',title:'اشتريته من قبل؟ لا تكتبه مرة أخرى.',desc:'اختر المتجر وأعد العناصر السابقة من الاقتراحات، ثم حدّد ما أتممته لمتابعة التقدم.',added:'أُضيفت من الاقتراحات',items:'عناصر هذا المتجر',stores:'المتجر',suggestions:'أضف عنصرًا سابقًا',sub:'اضغط + للإضافة. هذه قائمة تجريبية.',list:'قائمة التسوق اليوم',progress:'المكتمل',market:'سوبرماركت',drug:'صيدلية ومتجر',already:'مضاف',addedMsg:'أُضيف {name}',checkedMsg:'تم تحديث التقدم',reset:'إعادة ضبط العرض',resetMsg:'أُعيد ضبط العرض',note:'نموذج توضيحي في الموقع فقط. لا يقرأ بيانات التطبيق أو يغيّرها. تؤدي إعادة تحميل الصفحة إلى مسح التغييرات.',suggestionsCount:'اقتراحات قابلة لإعادة الاستخدام',done:'تم تحديدها',names:{bread:'خبز',soap:'صابون اليدين',milk:'حليب',eggs:'بيض',rice:'أرز',banana:'موز',detergent:'منظف',tissues:'مناديل',sun:'واقي الشمس'}}
};
const queryLang=(new URLSearchParams(location.search)).get('lang')||'';
const detected=(queryLang||document.documentElement.lang||navigator.language||'en').toLowerCase();
const locale=detected.startsWith('ar')?'ar':detected.startsWith('ja')?'ja':'en';
const t=translations[locale];
const storeDefs=[{id:'market',suggest:['milk','eggs','rice','banana'],initial:['bread']},{id:'drug',suggest:['detergent','tissues','sun'],initial:['soap']}];
let storeId='market';let added=0;let seq=0;let data={};
function resetData(){data={market:[{id:'initial-bread',key:'bread',done:false}],drug:[{id:'initial-soap',key:'soap',done:false}]};added=0;seq=0;storeId='market';}
resetData();
const escapeHTML=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const el=document.createElement('section');el.id=ROOT_ID;el.dir=locale==='ar'?'rtl':'ltr';el.setAttribute('aria-label',t.title);
el.innerHTML=`<p class="ss-eyebrow">${escapeHTML(t.eyebrow)}</p><h2>${escapeHTML(t.title)}</h2><p class="ss-description">${escapeHTML(t.desc)}</p>
<div class="ss-stats" aria-live="polite"><div class="ss-stat"><b id="ss136-added">0</b><span>${escapeHTML(t.added)}</span></div><div class="ss-stat"><b id="ss136-count">1</b><span>${escapeHTML(t.items)}</span></div><div class="ss-stat"><b id="ss136-done">0/1</b><span>${escapeHTML(t.done)}</span></div></div>
<div class="ss-grid"><div class="ss-panel"><h3>${escapeHTML(t.suggestions)}</h3><p class="ss-small">${escapeHTML(t.sub)}</p><div class="ss-stores" role="group" aria-label="${escapeHTML(t.stores)}" id="ss136-stores"></div><div class="ss-suggestions" id="ss136-suggestions"></div><p class="ss-status" id="ss136-status" role="status" aria-live="polite"></p></div>
<div class="ss-panel"><h3>${escapeHTML(t.list)}</h3><p class="ss-small" id="ss136-current-store"></p><div class="ss-list" id="ss136-list"></div><div class="ss-progress-track" role="progressbar" aria-label="${escapeHTML(t.progress)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="ss136-progress"><div class="ss-progress-bar" id="ss136-bar"></div></div><p class="ss-progress-label" id="ss136-progress-label"></p></div></div>
<div class="ss-footer"><button class="ss-reset" type="button" id="ss136-reset">${escapeHTML(t.reset)}</button><p class="ss-note">${escapeHTML(t.note)}</p></div>`;
function current(){return storeDefs.find(x=>x.id===storeId);}
function byId(id){return el.querySelector('#'+id);}
function render(status){
 const chosen=current();const items=data[storeId];const done=items.filter(x=>x.done).length;
 byId('ss136-added').textContent=String(added);
 byId('ss136-count').textContent=String(items.length);
 byId('ss136-done').textContent=done+'/'+items.length;
 byId('ss136-current-store').textContent=t[storeId];
 byId('ss136-stores').innerHTML=storeDefs.map(s=>`<button type="button" class="ss-store" aria-pressed="${s.id===storeId}" data-store="${s.id}">${escapeHTML(t[s.id])}</button>`).join('');
 byId('ss136-suggestions').innerHTML=chosen.suggest.map(key=>{
  const exists=items.some(x=>x.key===key);
  return `<button type="button" class="ss-suggest" data-add="${key}" ${exists?'disabled':''} aria-label="${escapeHTML(t.names[key])}"><span>${escapeHTML(t.names[key])}</span><span class="ss-plus" aria-hidden="true">${exists?'✓':'+'}</span></button>`;
 }).join('');
 byId('ss136-list').innerHTML=items.map(item=>`<div class="ss-item"><button type="button" class="ss-check" data-check="${escapeHTML(item.id)}" aria-pressed="${item.done}" aria-label="${escapeHTML(t.names[item.key])}" title="${escapeHTML(t.names[item.key])}">${item.done?'✓':' '}</button><span class="ss-name ${item.done?'ss-done':''}">${escapeHTML(t.names[item.key])}</span></div>`).join('');
 const pct=items.length?Math.round(done/items.length*100):0;
 byId('ss136-progress').setAttribute('aria-valuenow',String(pct));
 byId('ss136-bar').style.width=pct+'%';
 byId('ss136-progress-label').textContent=`${t.progress}: ${done}/${items.length} · ${pct}%`;
 byId('ss136-status').textContent=status||'';
}
el.addEventListener('click',event=>{
 const btn=event.target.closest('button');if(!btn||!el.contains(btn))return;
 if(btn.dataset.store){storeId=btn.dataset.store;render('');return;}
 if(btn.dataset.add){const key=btn.dataset.add;if(!current().suggest.includes(key))return;if(data[storeId].some(x=>x.key===key))return;data[storeId].push({id:'added-'+(++seq),key,done:false});added++;render(t.addedMsg.replace('{name}',t.names[key]));return;}
 if(btn.dataset.check){const item=data[storeId].find(x=>x.id===btn.dataset.check);if(!item)return;item.done=!item.done;render(t.checkedMsg);return;}
 if(btn.id==='ss136-reset'){resetData();render(t.resetMsg);}
});
const insertTarget=document.querySelector('main')||document.querySelector('[role=main]')||document.body;
insertTarget.appendChild(el);render('');
})();
