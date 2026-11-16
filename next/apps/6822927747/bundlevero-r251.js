/* R251 Bundlevero demo: in-memory, no network, no pricing API */
(function(){
'use strict';
const SCRIPT_ID='tsz-r251-demo';
const locale={
 en:{kicker:'BUNDLEVERO  /  INTERACTIVE EXAMPLE',title:'Own it already? The cheapest plan can change.',lead:'A bundle may look cheaper. Check what you already own before paying for the same item twice.',language:'Language',region:'Example',items:'01 / Your collection',owned:'Already owned',notOwned:'Need to buy',bundle:'Fixed-price bundle',bundleHint:'Includes all three items, even ones you own.',comparison:'02 / Compare the total',singles:'Missing items separately',package:'Full bundle',reasonSingles:'Because you already own some items, buying only the missing ones costs less.',reasonBundle:'With these prices, the bundle costs less, even though some items are already yours.',reasonEqual:'Both options cost the same with these numbers.',save:'Difference',reset:'Reset',ownedSample:'Own 1 item',moreOwned:'Own 2 items',noneOwned:'Own none',currency:'$',item:'Volume',note:'Illustrative input-only demo. No store prices, live offers, purchase, account link, OCR, or saved records. Bundle rules are simplified to one fixed-price set; real discounts and eligibility may differ.',invalid:'Enter prices of 0 or more (up to 1,000,000).',allOwned:'You already own everything. No new purchase is needed.',outcome:'Cheaper option',noPurchase:'Nothing to buy.'},
 ja:{kicker:'BUNDLEVERO  /  操作できる比較例',title:'もう持っている。その1点に、また払う？',lead:'セット価格が安く見えても、所有済みを除くと答えは変わる。購入前に、必要な分だけ比較。',language:'言語',region:'表示例',items:'01 / 所持状況と価格',owned:'すでに所有',notOwned:'これから購入',bundle:'セットの固定価格',bundleHint:'所持済みの商品も含む3点セット',comparison:'02 / 支払総額を比較',singles:'未所持品を単品購入',package:'3点セットを購入',reasonSingles:'すでに所有している品を除くと、足りない品だけ買うほうが安くなります。',reasonBundle:'所有済みの品が含まれていても、この条件ではセット購入のほうが安くなります。',reasonEqual:'この条件では2通りの支払額は同じです。',save:'差額',reset:'初期化',ownedSample:'1点所有',moreOwned:'2点所有',noneOwned:'すべて未所持',currency:'¥',item:'作品',note:'入力値による架空の比較例です。実店舗の価格取得、購入、アカウント連携、OCR、保存は行いません。固定価格セットのみを簡略化しており、実際の割引条件は異なります。',invalid:'価格は0〜1,000,000で入力してください。',allOwned:'すべて所有済みです。新たに購入する必要はありません。',outcome:'安い買い方',noPurchase:'購入するものはありません。'},
 ar:{kicker:'BUNDLEVERO  /  مثال تفاعلي',title:'تملكه بالفعل؟ لا تدفع ثمنه مرة أخرى.',lead:'قد تبدو الحزمة أوفر، لكن استبعاد ما تملكه قد يغيّر النتيجة.',language:'اللغة',region:'مثال العملة',items:'01 / العناصر التي تملكها',owned:'مملوك بالفعل',notOwned:'غير مملوك',bundle:'سعر الحزمة الثابت',bundleHint:'تشمل العناصر الثلاثة حتى ما تملكه',comparison:'02 / قارن التكلفة',singles:'شراء العناصر الناقصة',package:'شراء الحزمة',reasonSingles:'شراء العناصر التي لا تملكها فقط أقل تكلفة.',reasonBundle:'الحزمة أقل تكلفة بهذه الأسعار حتى مع تكرار عنصر مملوك.',reasonEqual:'الخياران بنفس التكلفة في هذا المثال.',save:'الفرق',reset:'إعادة ضبط',ownedSample:'أملك واحدًا',moreOwned:'أملك اثنين',noneOwned:'لا أملك شيئًا',currency:'$',item:'العنصر',note:'مثال توضيحي فقط. لا أسعار مباشرة ولا شراء أو ربط حسابات أو حفظ بيانات. يقارن حزمة ثابتة السعر فقط وقد تختلف شروط المتجر.',invalid:'أدخل سعرًا بين 0 و1,000,000.',allOwned:'تملك كل العناصر، لا حاجة للشراء.',outcome:'الخيار الأرخص',noPurchase:'لا حاجة للشراء.'}
};
const rootId='tsz-r251-root';
function init(){
  if(document.getElementById(rootId))return;
  const target=document.querySelector('#p199-content .p199-body')||document.querySelector('.p199-body');
  let node;
  if(target){node=document.createElement('section');node.id=rootId;node.className='tsz-r251';const ref=target.querySelector('#related');target.insertBefore(node,ref||null)}
  else {node=document.querySelector('[data-r251-standalone]');if(!node)return;node.id=rootId;node.classList.add('tsz-r251')}
  const params=new URLSearchParams(location.search),p=params.get('lang')||'en',region=params.get('region')||'us';
  const state={lang:locale[p]?p:'en',region:region==='jp'?'jp':'us',owned:[false,true,false],prices:[16,10,14],bundle:24};
  node.innerHTML='<div class="bv-shell"><div class="bv-top"><p class="bv-kicker" data-t="kicker"></p><h2 data-t="title"></h2><p class="bv-lead" data-t="lead"></p><div class="bv-toolbar"><label><span data-t="language"></span><select id="bv251-lang" aria-label="Language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="bv251-region" aria-label="Currency example"><option value="us">USD example</option><option value="jp">JPY example</option></select></label></div></div><div class="bv-grid"><div class="bv-panel"><p class="bv-label" data-t="items"></p><div id="bv251-items"></div><div class="bv-bundle"><div><strong data-t="bundle"></strong><span class="bv-help" data-t="bundleHint"></span></div><label class="bv-price"><span class="bv-cur" data-symbol></span><input id="bv251-bundle" type="number" step="0.01" min="0" max="1000000" aria-label="Bundle fixed price"></label></div><div class="bv-error" id="bv251-error" role="status"></div><div class="bv-actions"><button type="button" data-preset="one" data-t="ownedSample"></button><button type="button" data-preset="two" data-t="moreOwned"></button><button type="button" data-preset="zero" data-t="noneOwned"></button><button type="button" data-preset="reset" data-t="reset"></button></div></div><div class="bv-panel"><p class="bv-label" data-t="comparison"></p><div class="bv-results"><div class="bv-option" id="bv251-single-card"><span data-t="singles"></span><strong id="bv251-singles"></strong></div><div class="bv-option" id="bv251-bundle-card"><span data-t="package"></span><strong id="bv251-total-bundle"></strong></div><div class="bv-reason" id="bv251-reason" role="status"></div></div></div></div><p class="bv-note" data-t="note"></p></div>';
  const $=s=>node.querySelector(s),$$=s=>node.querySelectorAll(s);
  const good=x=>Number.isFinite(x)&&x>=0&&x<=1e6;
  const loc=()=>locale[state.lang], fmt=x=>new Intl.NumberFormat(state.lang==='ja'?'ja-JP':'en-US',{maximumFractionDigits:2,minimumFractionDigits:state.region==='us'?2:0}).format(x),money=x=> (state.region==='jp'?'¥':'$')+fmt(x);
  const v=(label,n)=>'<label class="bv-price"><span class="bv-cur">'+(state.region==='jp'?'¥':'$')+'</span><input type="number" min="0" max="1000000" step="0.01" aria-label="'+label+'" value="'+n+'"></label>';
  function drawItems(){const t=loc();$('#bv251-items').innerHTML=['A','B','C'].map((c,i)=>'<div class="bv-item"><label><input type="checkbox" data-owned="'+i+'" '+(state.owned[i]?'checked':'')+'><span class="bv-item-name">'+t.item+' '+c+'<small>'+(state.owned[i]?t.owned:t.notOwned)+'</small></span></label>'+v(t.item+' '+c+' price',state.prices[i])+'</div>').join('');
    $$('[data-owned]').forEach(x=>x.addEventListener('change',()=>{state.owned[Number(x.dataset.owned)]=x.checked;drawItems();drawResult()}));
    $$('.bv-item .bv-price input').forEach((x,i)=>x.addEventListener('input',()=>{state.prices[i]=x.value.trim()===''?NaN:Number(x.value);drawResult()}));
  }
  function translate(){const t=loc();node.dir=state.lang==='ar'?'rtl':'ltr';$$('[data-t]').forEach(e=>{const k=e.dataset.t;if(t[k])e.textContent=t[k]});$('#bv251-lang').value=state.lang;$('#bv251-region').value=state.region;$$('[data-symbol]').forEach(x=>x.textContent=state.region==='jp'?'¥':'$');drawItems();$('#bv251-bundle').value=state.bundle;drawResult()}
  function drawResult(){const t=loc(),valid=[...state.prices,state.bundle].every(good);$('#bv251-error').textContent=valid?'':t.invalid;
    $('#bv251-single-card').classList.remove('bv-winner');$('#bv251-bundle-card').classList.remove('bv-winner');
    if(!valid){$('#bv251-singles').textContent='—';$('#bv251-total-bundle').textContent='—';$('#bv251-reason').textContent=t.invalid;return}
    const singles=state.prices.reduce((sum,x,i)=>sum+(state.owned[i]?0:x),0),bundle=state.bundle,all=state.owned.every(Boolean);
    $('#bv251-singles').textContent=money(singles);$('#bv251-total-bundle').textContent=money(bundle);
    if(all){$('#bv251-single-card').classList.add('bv-winner');$('#bv251-reason').textContent=t.allOwned;return}
    const best=singles<bundle?'singles':singles>bundle?'bundle':'equal';
    if(best==='singles')$('#bv251-single-card').classList.add('bv-winner');
    if(best==='bundle')$('#bv251-bundle-card').classList.add('bv-winner');
    const sentence=best==='singles'?t.reasonSingles:best==='bundle'?t.reasonBundle:t.reasonEqual;
    $('#bv251-reason').textContent=sentence+' '+t.save+': '+money(Math.abs(singles-bundle));
  }
  function reset(amount){state.owned=amount==='two'?[true,true,false]:amount==='zero'?[false,false,false]:[false,true,false];state.prices=state.region==='jp'?[1600,1000,1400]:[16,10,14];state.bundle=state.region==='jp'?2400:24;translate()}
  $('#bv251-lang').addEventListener('change',e=>{state.lang=e.target.value;translate()});
  $('#bv251-region').addEventListener('change',e=>{state.region=e.target.value;reset('one')});
  $('#bv251-bundle').addEventListener('input',e=>{state.bundle=e.target.value.trim()===''?NaN:Number(e.target.value);drawResult()});
  $$('[data-preset]').forEach(x=>x.addEventListener('click',()=>reset(x.dataset.preset==='reset'?'one':x.dataset.preset)));
  reset('one');
  const pageLang=document.querySelector('#p199-language');
  if(pageLang)pageLang.addEventListener('change',()=>{
    const l=String(pageLang.value).toLowerCase();const next=l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en';
    if(state.lang!==next){state.lang=next;translate()}
  });
  const pageCountry=document.querySelector('#p199-country');
  if(pageCountry)pageCountry.addEventListener('change',()=>{
    const next=String(pageCountry.value).toLowerCase().startsWith('jp')?'jp':'us';
    if(state.region!==next){state.region=next;reset('one')}
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
