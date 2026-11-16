(()=>{'use strict';
const ID='cb278';if(document.getElementById(ID)||window.__TSZ_CB278__)return;window.__TSZ_CB278__=true;
const T={
 en:{eyebrow:'CART BUDGET / THE NEXT ITEM',head:'Before the next item goes in.',lead:'You can want it. The question is whether the money left in your cart can cover it.',budget:'Shopping limit',used:'Already in your cart',left:'Still available',yourCart:'01 / What is already in your cart',decision:'02 / The next item is in your hand',pick:'Try the next item',next:'Price of this item',yes:'IT FITS',no:'OVER BUDGET',within:'You could add this item and still have',over:'Adding this item would take you over by',add:'Add to cart',skip:'Leave it for now',undo:'Undo last addition',reset:'Reset the example',items:'items in cart',status:'What changed',added:'Added to this example cart',skipped:'Not added. Your budget stays the same.',resetDone:'Example restored.',undoDone:'Last addition removed.',cannotUndo:'Nothing to undo yet.',note:'An illustrative budget check, not a purchase. No checkout, price lookup, account, history or saved data.',app:'View Cart Budget on the App Store',c1:'Groceries',c2:'Household supplies',c3:'Breakfast',p1:'Coffee beans',p2:'Fruit',p3:'Small treat',p4:'Custom price',unit:'of budget left',below:'The existing cart is already over the limit.',edit:'Change your limit and the next price to see the difference.',days:'One number before checkout.'},
 ja:{eyebrow:'CART BUDGET / 次の一品',head:'次の商品を入れる、その前に。',lead:'欲しいかどうかとは別に。いま残っている予算で、その一品を買えるか。',budget:'今回の買い物予算',used:'いまカゴにある金額',left:'あと使える金額',yourCart:'01 / いまカゴにあるもの',decision:'02 / 手に取った次の一品',pick:'次に買うものを選ぶ',next:'この商品の値段',yes:'予算内に収まる',no:'予算を超える',within:'この商品を追加しても、あと',over:'この商品を入れると、予算より',add:'カゴに入れる',skip:'今回は見送る',undo:'最後の追加を戻す',reset:'例を初期化',items:'品がカゴにあります',status:'今回の判断',added:'例のカゴに追加しました。',skipped:'追加しませんでした。残額はそのままです。',resetDone:'例を初期化しました。',undoDone:'最後の追加を取り消しました。',cannotUndo:'取り消す追加はまだありません。',note:'説明用の予算確認です。購入・価格検索・アカウント・履歴・永続保存はありません。',app:'App StoreでCart Budgetを見る',c1:'食料品',c2:'日用品',c3:'朝食',p1:'コーヒー豆',p2:'フルーツ',p3:'小さなご褒美',p4:'自由入力',unit:'の予算が残っています',below:'すでにカゴの合計が予算を超えています。',edit:'予算と商品の価格を変えて、差を確かめてください。',days:'レジの前に、ひとつの数字。'},
 ar:{eyebrow:'CART BUDGET / القطعة التالية',head:'قبل أن تضيف القطعة التالية.',lead:'ربما تريدها. لكن هل يكفي المبلغ المتبقي في ميزانيتك لشرائها؟',budget:'ميزانية التسوق',used:'الموجود في السلة',left:'المبلغ المتبقي',yourCart:'01 / الموجود في السلة',decision:'02 / القطعة التالية',pick:'اختر القطعة التالية',next:'سعر هذه القطعة',yes:'ضمن الميزانية',no:'تتجاوز الميزانية',within:'يمكنك إضافتها وسيتبقى',over:'ستتجاوز الميزانية بمقدار',add:'أضف إلى السلة',skip:'اتركها الآن',undo:'تراجع عن آخر إضافة',reset:'إعادة المثال',items:'قطع في السلة',status:'القرار الحالي',added:'أُضيفت إلى سلة المثال.',skipped:'لم تُضف؛ الميزانية كما هي.',resetDone:'أُعيد المثال.',undoDone:'أُزيلت آخر إضافة.',cannotUndo:'لا توجد إضافة للتراجع عنها.',note:'مثال توضيحي فقط؛ لا شراء أو بحث عن أسعار أو حساب أو سجل أو حفظ.',app:'شاهد Cart Budget في App Store',c1:'مشتريات',c2:'لوازم المنزل',c3:'فطور',p1:'قهوة',p2:'فاكهة',p3:'متعة صغيرة',p4:'سعر مخصص',unit:'من الميزانية متبقٍ',below:'مشترياتك الحالية تتجاوز الميزانية.',edit:'غيّر الميزانية وسعر القطعة لمقارنة النتيجة.',days:'رقم واحد قبل الدفع.'}}
;
const c=document.createElement('section');c.id=ID;c.setAttribute('aria-label','Cart Budget interactive next-item demo');
const old=document.body.firstChild;document.body.insertBefore(c,old);
let lang='en',region='us',budget=60,items=[],choice=0,custom=10,notice='';let nextid=1;
const palettes={jp:{budget:6000,items:[['c1',2100],['c2',950],['c3',700]],offers:[1900,1500,2700]},us:{budget:60,items:[['c1',21],['c2',9.5],['c3',7]],offers:[19,15,27]}};
function resetData(){let p=palettes[region];budget=p.budget;items=p.items.map(x=>({id:nextid++,name:x[0],price:x[1],seed:true}));choice=0;custom=region==='jp'?1000:10;notice='';}
resetData();
function t(k){return T[lang][k]||k}
function num(v){return Number.isFinite(v)?v:0}
function cash(v){const n=num(v),f=new Intl.NumberFormat(lang==='ja'?'ja-JP':lang==='ar'?'ar-EG':'en-US',{style:'currency',currency:region==='jp'?'JPY':'USD',maximumFractionDigits:region==='jp'?0:2});return f.format(n)}
function sums(){return items.reduce((acc,a)=>acc+a.price,0)}
function chosen(){return choice===3?custom:palettes[region].offers[choice]}
function name(k){return t(k)}
function isValid(){return Number.isFinite(budget)&&budget>=0&&budget<=100000000&&Number.isFinite(chosen())&&chosen()>0&&chosen()<=100000000}
function esc(x){return String(x).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
function render(){const current=sums(),remaining=budget-current,price=chosen(),after=remaining-price,ok=after>=0;
 c.setAttribute('dir',lang==='ar'?'rtl':'ltr');c.innerHTML=`<div class="cb278-wrap">
 <div class="cb278-nav"><span class="cb278-logo">◈</span><span>${esc(t('eyebrow'))}</span><div class="cb278-navtools"><label><span class="cb278-sr">Language</span><select data-select="lang"><option value="en" ${lang==='en'?'selected':''}>EN</option><option value="ja" ${lang==='ja'?'selected':''}>日本語</option><option value="ar" ${lang==='ar'?'selected':''}>العربية</option></select></label><label><span class="cb278-sr">App Store region</span><select data-select="region"><option value="us" ${region==='us'?'selected':''}>US</option><option value="jp" ${region==='jp'?'selected':''}>JP</option></select></label></div></div>
 <header class="cb278-hero"><p class="cb278-hero-tag">/ 278 — CART BUDGET</p><h2>${esc(t('head'))}</h2><p>${esc(t('lead'))}</p><div class="cb278-hero-mark" aria-hidden="true">¥ / $</div></header>
 <div class="cb278-dashboard"><div class="cb278-budget-field"><label for="cb278-budget">${esc(t('budget'))}</label><div class="cb278-input-row"><span>${region==='jp'?'¥':'$'}</span><input id="cb278-budget" data-input="budget" type="number" min="0" max="100000000" step="${region==='jp'?'1':'0.01'}" value="${budget}" inputmode="decimal"></div></div><div class="cb278-tally"><small>${esc(t('used'))}</small><strong data-value="used">${cash(current)}</strong></div><div class="cb278-left ${remaining<0?'cb278-danger':''}"><small>${esc(t('left'))}</small><strong data-value="left">${cash(remaining)}</strong></div></div>
 <div class="cb278-progress"><span data-progress style="width:${Math.min(100,Math.max(0,budget>0?current/budget*100:100))}%"></span></div>
 <div class="cb278-section-title"><span>${esc(t('yourCart'))}</span><i>${items.length} ${esc(t('items'))}</i></div><div class="cb278-items">${items.map((x,i)=>`<div class="cb278-item"><span class="cb278-itemnum">${String(i+1).padStart(2,'0')}</span><span class="cb278-itemname">${esc(name(x.name))}</span><b>${cash(x.price)}</b></div>`).join('')}</div>
 <div class="cb278-section-title"><span>${esc(t('decision'))}</span><i>${esc(t('days'))}</i></div>
 <div class="cb278-decision"><div class="cb278-picks"><p>${esc(t('pick'))}</p><div class="cb278-options">${[0,1,2,3].map(i=>`<button type="button" data-pick="${i}" aria-pressed="${i===choice}" class="${i===choice?'is-active':''}">${esc(t('p'+(i+1)))}<small>${i===3?'±':cash(palettes[region].offers[i])}</small></button>`).join('')}</div></div>
 <div class="cb278-check"><label for="cb278-price">${esc(t('next'))}</label><div class="cb278-input-row"><span>${region==='jp'?'¥':'$'}</span><input id="cb278-price" data-input="price" type="number" min="0.01" max="100000000" step="${region==='jp'?'1':'0.01'}" value="${price}" inputmode="decimal"></div><div class="cb278-test ${ok?'cb278-yes':'cb278-no'}" data-status><span class="cb278-sign">${ok?'✓':'!'}</span><div><b data-result>${esc(t(ok?'yes':'no'))}</b><p><span data-result-desc>${esc(t(ok?'within':'over'))}</span> <strong data-result-amount>${cash(Math.abs(after))}</strong></p></div></div><div class="cb278-actions"><button type="button" data-act="add" class="cb278-primary">${esc(t('add'))}</button><button type="button" data-act="skip" class="cb278-secondary">${esc(t('skip'))}</button></div></div></div>
 <div class="cb278-footactions"><button type="button" data-act="undo">↶ ${esc(t('undo'))}</button><button type="button" data-act="reset">↺ ${esc(t('reset'))}</button></div><p class="cb278-notice" role="status" aria-live="polite">${esc(notice)}</p>
 <footer><p>${esc(t('note'))}</p><a href="https://apps.apple.com/${region}/app/id6802814389" target="_blank" rel="noopener noreferrer">${esc(t('app'))} <span aria-hidden="true">↗</span></a></footer></div>`;
}
function update(){const remaining=budget-sums(),after=remaining-chosen(),ok=after>=0;const bad=!isValid();
 const ss=(key,txt)=>{const node=c.querySelector(key);if(node)node.textContent=txt};
 ss('[data-value=used]',cash(sums()));ss('[data-value=left]',cash(remaining));ss('[data-result]',bad?'—':t(ok?'yes':'no'));ss('[data-result-desc]',bad?t('edit'):t(ok?'within':'over'));ss('[data-result-amount]',bad?'':cash(Math.abs(after)));
 c.querySelector('[data-value=left]').parentElement.classList.toggle('cb278-danger',remaining<0);
 c.querySelector('[data-status]').classList.toggle('cb278-yes',ok&&!bad);c.querySelector('[data-status]').classList.toggle('cb278-no',!ok||bad);
 c.querySelector('.cb278-sign').textContent=bad?'?':ok?'✓':'!';c.querySelector('[data-progress]').style.width=Math.min(100,Math.max(0,budget>0?sums()/budget*100:100))+'%';
 const a=c.querySelector('[data-act=add]');a.disabled=bad;
}
c.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!c.contains(b))return;
 if(b.dataset.pick!==undefined){choice=+b.dataset.pick;notice='';render();return;}
 if(!b.dataset.act)return;
 if(b.dataset.act==='add'&&isValid()){items.push({id:nextid++,name:'p'+(choice+1),price:chosen(),seed:false});notice=t('added');render();}
 if(b.dataset.act==='skip'){notice=t('skipped');render();}
 if(b.dataset.act==='reset'){resetData();notice=t('resetDone');render();}
 if(b.dataset.act==='undo'){let idx=items.findLastIndex(x=>!x.seed);if(idx>=0){items.splice(idx,1);notice=t('undoDone')}else notice=t('cannotUndo');render();}
});
c.addEventListener('change',e=>{const field=e.target.closest('[data-select]');if(!field)return;
 if(field.dataset.select==='lang'){lang=field.value;render()}
 else if(field.dataset.select==='region'){region=field.value;resetData();render()}
});
c.addEventListener('input',e=>{const k=e.target.dataset.input;if(!k)return;let v=e.target.value===''?NaN:Number(e.target.value);if(k==='budget')budget=v;else if(k==='price'){custom=v;choice=3;c.querySelectorAll('[data-pick]').forEach(b=>{const on=b.dataset.pick==='3';b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on));});}notice='';c.querySelector('.cb278-notice').textContent='';update();});
render();
})();
