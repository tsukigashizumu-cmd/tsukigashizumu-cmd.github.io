/* R284 Nokunera: one-item stock preview. Isolated on-page state, no persistence or network calls. */
(()=>{'use strict';
const ID='tsz-nk284',APP='6826459096';
const dict={
 en:{brand:'NOKUNERA / ONE ITEM',lang:'LANGUAGE',store:'STORE',eyebrow:'THE SIXTH STORE WAS NOT THE PROBLEM',title:'You visited six stores. You got home. The tissues were gone.',lead:'You were so focused on finding the best price that you forgot what was already missing at home. Start with just one thing.',mode:'PICK THE ONE THING',tissue:'Tissues',paper:'Toilet paper',soap:'Detergent',place:'Where you keep it',stock:'How many are left?',minimum:'Keep at least',status:'RESTOCK SIGNAL',safe:'Enough for now',low:'Below your minimum',short:'Add {n} to reach your minimum',none:'You are at your minimum',extra:'{n} above your minimum',used:'Used one',buy:'Added one',reset:'Start over',how:'TRY IT',step:'Tap “Used one” to see what happens when you run low.',note:'This is a simplified interactive example, not a replica of the app. Counts are entered manually. No camera recognition, automatic counting, cloud sync or data saved on this page.',cta:'Track your one item in Nokunera',foot:'ONE ITEM IS ENOUGH TO BEGIN',locT:'Hall closet',locP:'Bathroom shelf',locS:'Laundry cupboard',zero:'No items left',units:'items',ctaSub:'Available on App Store'},
 ja:{brand:'NOKUNERA / 一品だけ',lang:'言語',store:'ストア',eyebrow:'6軒回った、その後に',title:'6軒回って買い物したのに、帰宅したらティッシュがない。',lead:'安く買えた。やっと帰宅した。その時、いつも使うものが切れていた。家じゅうを管理しなくていい。今日は一品だけ。',mode:'まず一品を選ぶ',tissue:'ティッシュ',paper:'トイレットペーパー',soap:'洗剤',place:'置き場所',stock:'残りの数',minimum:'最低限残したい数',status:'補充の目安',safe:'今は足りています',low:'最低数を下回っています',short:'あと{n}個で最低数に戻ります',none:'最低数ちょうどです',extra:'最低数より{n}個多くあります',used:'1個使った',buy:'1個補充した',reset:'最初から',how:'操作してみる',step:'「1個使った」を押して、在庫が減る感覚を試してください。',note:'これはLP独自の簡易体験で、実際のアプリ画面・計算規則を再現するものではありません。数は自分で記録します。自動認識・自動カウント・クラウド同期・ページ内保存は行いません。',cta:'App StoreでNokuneraを見る',foot:'最初の一品だけでいい',locT:'廊下の戸棚',locP:'洗面所の棚',locS:'洗濯機の横',zero:'残り0個',units:'個',ctaSub:'App Storeで公開中'},
 ar:{brand:'NOKUNERA / غرض واحد',lang:'اللغة',store:'المتجر',eyebrow:'بعد زيارة ستة متاجر',title:'تجوّلت بين ستة متاجر. ثم عدت إلى البيت، ولم تجد مناديل.',lead:'بحثت عن أفضل سعر، ثم اكتشفت أن شيئًا أساسيًا نفد في المنزل. لا تحتاج إلى تنظيم كل شيء. ابدأ بغرض واحد.',mode:'اختر غرضًا واحدًا',tissue:'مناديل',paper:'ورق الحمام',soap:'منظف',place:'مكان التخزين',stock:'الكمية المتبقية',minimum:'الحد الأدنى',status:'حالة إعادة التعبئة',safe:'الكمية كافية الآن',low:'أقل من الحد الأدنى',short:'أضف {n} للوصول إلى الحد الأدنى',none:'عند الحد الأدنى تمامًا',extra:'أعلى من الحد الأدنى بمقدار {n}',used:'استخدمت واحدة',buy:'أضفت واحدة',reset:'ابدأ من جديد',how:'جرّب بنفسك',step:'اضغط «استخدمت واحدة» لترى كيف تنخفض الكمية.',note:'هذا مثال تفاعلي مبسّط لصفحة التعريف وليس نسخة من التطبيق. تسجّل الكميات يدويًا. لا يوجد تعرّف تلقائي أو عدّ تلقائي أو مزامنة سحابية أو حفظ للبيانات على الصفحة.',cta:'تابع غرضك في Nokunera',foot:'غرض واحد يكفي للبدء',locT:'خزانة الممر',locP:'رف الحمام',locS:'خزانة الغسيل',zero:'لا شيء متبقٍ',units:'وحدات',ctaSub:'متوفر في App Store'}
};
const presets={tissue:{count:1,min:2,place:'locT',ico:'▤'},paper:{count:3,min:2,place:'locP',ico:'◫'},soap:{count:0,min:1,place:'locS',ico:'◈'}};
const state={lang:'en',store:'us',product:'tissue',count:1,min:2,place:'',customPlace:false};
function mount(){if(document.getElementById(ID)||!document.body)return;
 const root=document.createElement('section');root.id=ID;root.lang='en';root.dir='ltr';root.setAttribute('aria-label','Nokunera interactive inventory example');
 root.innerHTML=`<div class="nk-wrap"><div class="nk-top"><div class="nk-brand"><span class="nk-logo" aria-hidden="true">▦</span><span data-t="brand"></span></div><div class="nk-filters"><label><span data-t="lang"></span><select data-ui="lang"><option value="en">EN</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="store"></span><select data-ui="store"><option value="us">US</option><option value="jp">JP</option></select></label></div></div>
 <div class="nk-hero"><div class="nk-story"><div class="nk-eyebrow"><span class="nk-dot"></span><span data-t="eyebrow"></span></div><h1 data-t="title"></h1><p class="nk-lead" data-t="lead"></p><div class="nk-bottom-mark"><span>01</span><span data-t="foot"></span></div></div>
 <div class="nk-panel"><div class="nk-panel-top"><span class="nk-panel-tag" data-t="mode"></span><span class="nk-panel-serial">№ 001</span></div><div class="nk-products" role="group" aria-label="Item"><button data-product="tissue" class="selected" type="button"><span aria-hidden="true">▤</span><span data-t="tissue"></span></button><button data-product="paper" type="button"><span aria-hidden="true">◫</span><span data-t="paper"></span></button><button data-product="soap" type="button"><span aria-hidden="true">◈</span><span data-t="soap"></span></button></div>
 <div class="nk-item-card"><div class="nk-visual" aria-hidden="true"><div class="nk-visual-outline"><span data-ui="itemIcon">▤</span></div></div><div class="nk-item-copy"><span class="nk-item-overline" data-t="stock"></span><strong data-ui="bigCount" aria-live="polite">1</strong><span class="nk-item-name" data-ui="itemName"></span></div></div>
 <div class="nk-inputs"><label><span data-t="stock"></span><input type="number" data-ui="count" min="0" max="9999" step="1" value="1" inputmode="numeric"></label><label><span data-t="minimum"></span><input type="number" data-ui="minimum" min="0" max="9999" step="1" value="2" inputmode="numeric"></label><label class="nk-wide"><span data-t="place"></span><input type="text" data-ui="place" maxlength="60" autocomplete="off"></label></div>
 <div class="nk-signal" data-ui="signal"><div><div class="nk-signal-label" data-t="status"></div><strong data-ui="signalTitle" aria-live="polite"></strong><p data-ui="signalDesc"></p></div><span class="nk-signal-circle" aria-hidden="true"></span></div>
 <div class="nk-actions"><button type="button" data-ui="use" class="nk-button-use"><span aria-hidden="true">−</span><span data-t="used"></span></button><button type="button" data-ui="add" class="nk-button-add"><span aria-hidden="true">+</span><span data-t="buy"></span></button></div><button type="button" class="nk-reset" data-ui="reset" data-t="reset"></button></div></div>
 <div class="nk-tail"><div><strong data-t="how"></strong><p data-t="step"></p></div><div class="nk-cta-wrap"><a data-ui="cta" target="_blank" rel="noopener noreferrer"><span data-t="cta"></span><span aria-hidden="true">↗</span></a><small data-t="ctaSub"></small></div></div><p class="nk-disclaimer" data-t="note"></p></div>`;
 document.body.appendChild(root);
 const $=(q)=>root.querySelector(q);const $$=(q)=>Array.from(root.querySelectorAll(q));
 function tr(){return dict[state.lang];}
 function resetProduct(product){state.product=product;const p=presets[product];state.count=p.count;state.min=p.min;state.customPlace=false;state.place=tr()[p.place];}
 function translate(){root.lang=state.lang;root.dir=state.lang==='ar'?'rtl':'ltr';const t=tr();$$("[data-t]").forEach(el=>{el.textContent=t[el.getAttribute('data-t')]||'';});if(!state.customPlace)state.place=t[presets[state.product].place];render();}
 function validNumber(raw){if(!/^(?:0|[1-9]\d{0,3})$/.test(String(raw).trim()))return null;const v=Number(raw);return Number.isSafeInteger(v)&&v>=0&&v<=9999?v:null;}
 function render(){const t=tr();$('[data-ui="lang"]').value=state.lang;$('[data-ui="store"]').value=state.store;
 $$('[data-product]').forEach(b=>{const selected=b.dataset.product===state.product;b.classList.toggle('selected',selected);b.setAttribute('aria-pressed',String(selected));});
 $('[data-ui="count"]').value=state.count===null?'':String(state.count);$('[data-ui="minimum"]').value=state.min===null?'':String(state.min);$('[data-ui="place"]').value=state.place;
 $('[data-ui="itemIcon"]').textContent=presets[state.product].ico;$('[data-ui="itemName"]').textContent=t[state.product];
 const valid=state.count!==null&&state.min!==null;
 $('[data-ui="bigCount"]').textContent=valid?String(state.count):'—';
 const sig=$('[data-ui="signal"]');sig.classList.toggle('low',valid&&state.count<state.min);sig.classList.toggle('invalid',!valid);
 $('[data-ui="signalTitle"]').textContent=!valid?'—':state.count<state.min?t.low:t.safe;
 const n=valid?Math.abs(state.min-state.count):0;
 $('[data-ui="signalDesc"]').textContent=!valid?'0 – 9999':state.count<state.min?t.short.replace('{n}',n):state.count===state.min?t.none:t.extra.replace('{n}',n);
 $('[data-ui="use"]').disabled=!valid||state.count<=0;$('[data-ui="add"]').disabled=!valid||state.count>=9999;
 $('[data-ui="cta"]').href='https://apps.apple.com/'+state.store+'/app/id'+APP;}
 $('[data-ui="lang"]').addEventListener('change',e=>{if(dict[e.target.value]){state.lang=e.target.value;translate();}});
 $('[data-ui="store"]').addEventListener('change',e=>{if(['us','jp'].includes(e.target.value)){state.store=e.target.value;render();}});
 $$('[data-product]').forEach(btn=>btn.addEventListener('click',()=>{resetProduct(btn.dataset.product);render();}));
 $('[data-ui="count"]').addEventListener('input',e=>{state.count=validNumber(e.target.value);render();});
 $('[data-ui="minimum"]').addEventListener('input',e=>{state.min=validNumber(e.target.value);render();});
 $('[data-ui="place"]').addEventListener('input',e=>{state.customPlace=true;state.place=e.target.value.slice(0,60);});
 $('[data-ui="use"]').addEventListener('click',()=>{if(state.count!==null&&state.count>0){state.count--;render();}});
 $('[data-ui="add"]').addEventListener('click',()=>{if(state.count!==null&&state.count<9999){state.count++;render();}});
 $('[data-ui="reset"]').addEventListener('click',()=>{resetProduct('tissue');render();});
 resetProduct('tissue');translate();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
