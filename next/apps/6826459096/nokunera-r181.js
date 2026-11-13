/* Nokunera R181 — single-item inventory threshold demo. Text-only, no storage or network. */
(() => {
  'use strict';
  const APP='6826459096', ID='tsz-nokunera-r181';
  if (!document.body || document.body.dataset.p199Id!==APP || document.getElementById(ID)) return;
  const dict={
    en:{brand:'Nokunera',subhead:'A SIMPLE STOCK SNAPSHOT',title1:'Start with one.',title2:'Know what’s left.',lead:'One everyday essential. One less unpleasant surprise.',item:'Tissues',box:'boxes',boxOne:'box',remaining:'CURRENT QUANTITY',min:'MINIMUM RESERVE',need:'TO REACH YOUR MINIMUM',restock:'Time to restock',healthy:'At or above your minimum',out:'Out of stock',location:'Stored',place:'Hall closet',purchased:'Last purchase',purchasedDate:'Nov 8',used:'Last use',usedDate:'Nov 12',quantity:'Current quantity (boxes)',threshold:'Minimum reserve (boxes)',purchase:'Record purchase +1',use:'Record use −1',reset:'Reset example',progress:'Current vs. minimum',store:'View on the App Store',tagline:'Record what you use. Know what remains.',notice:'Illustrative local-only demo. Quantities update only in this page; nothing is saved or synchronized. Update your actual inventory in the app.',validation:'Enter whole numbers from 0 to 9,999.',full:'Maximum quantity reached',empty:'Quantity is already zero.',unitsNeeded:'{n} more boxes',unitsNeededOne:'1 more box',unitsDone:'No restock needed',sample:'Example values · You update quantities yourself'},
    ja:{brand:'Nokunera',subhead:'ひとつから始める在庫管理',title1:'まず一品から。',title2:'残りがわかる。',lead:'日用品ひとつの「うっかり」を減らす。',item:'ティッシュ',box:'箱',boxOne:'箱',remaining:'現在の在庫',min:'最低備蓄',need:'最低備蓄まで',restock:'補充の目安',healthy:'最低備蓄を確保',out:'在庫がありません',location:'保管場所',place:'廊下の収納棚',purchased:'最終購入',purchasedDate:'11月8日',used:'最終使用',usedDate:'11月12日',quantity:'現在の在庫（箱）',threshold:'最低備蓄（箱）',purchase:'購入を記録 +1',use:'使用を記録 −1',reset:'初期値に戻す',progress:'現在の在庫と最低備蓄',store:'App Storeで見る',tagline:'使ったら記録。残りを把握。',notice:'数値は架空のローカルデモです。操作内容は保存・同期されません。実際の在庫はアプリで更新してください。',validation:'0〜9,999の整数を入力してください。',full:'在庫の上限です',empty:'在庫はすでに0です',unitsNeeded:'あと{n}箱',unitsNeededOne:'あと1箱',unitsDone:'補充は不要',sample:'サンプル値 · 数は手動で更新します'},
    ar:{brand:'Nokunera',subhead:'ابدأ بصنف واحد',title1:'ابدأ بصنف واحد.',title2:'واعرف ما تبقّى.',lead:'احتياج يومي واحد. مفاجآت أقل.',item:'المناديل',box:'علب',boxOne:'علبة',remaining:'الكمية الحالية',min:'الحد الأدنى',need:'المطلوب للوصول إلى الحد الأدنى',restock:'حان وقت إعادة التزويد',healthy:'الكمية تكفي الحد الأدنى',out:'نفدت الكمية',location:'مكان التخزين',place:'خزانة الممر',purchased:'آخر شراء',purchasedDate:'8 نوفمبر',used:'آخر استخدام',usedDate:'12 نوفمبر',quantity:'الكمية الحالية (علب)',threshold:'الحد الأدنى (علب)',purchase:'تسجيل شراء +1',use:'تسجيل استخدام −1',reset:'إعادة المثال',progress:'الكمية الحالية مقابل الحد الأدنى',store:'عرضه على App Store',tagline:'سجّل ما تستخدمه. واعرف ما تبقّى.',notice:'هذه بيانات توضيحية محلية فقط؛ لا تحفظ الصفحة التغييرات أو تزامنها. حدّث مخزونك الحقيقي في التطبيق.',validation:'استخدم عدداً صحيحاً من 0 إلى 9,999.',full:'تم بلوغ الحد الأقصى',empty:'الكمية صفر بالفعل',unitsNeeded:'تحتاج {n} علب إضافية',unitsNeededOne:'تحتاج علبة إضافية',unitsDone:'لا حاجة إلى التزويد',sample:'قيم توضيحية · تحدّث الكميات يدوياً'}
  };
  const root=document.createElement('section');root.id=ID;root.className='nu181';root.setAttribute('aria-labelledby','nu181-title');
  root.innerHTML=`
    <header class="nu181-header"><span class="nu181-logo" aria-hidden="true">⌂</span><strong data-t="brand">Nokunera</strong><small data-t="subhead">A SIMPLE STOCK SNAPSHOT</small></header>
    <div class="nu181-hero"><div class="nu181-hero-copy"><h2 id="nu181-title"><span data-t="title1">Start with one.</span><em data-t="title2">Know what’s left.</em></h2><p data-t="lead">One everyday essential. One less unpleasant surprise.</p></div>
      <div class="nu181-still" aria-hidden="true"><div class="nu181-shelf"></div><div class="nu181-basket"></div><div class="nu181-towels"><i></i><i></i><i></i></div><div class="nu181-tissue"><i></i></div><div class="nu181-leaf">✣</div></div>
    </div>
    <div class="nu181-stock"><div class="nu181-stock-head"><div class="nu181-item-icon" aria-hidden="true">▱</div><h3 data-t="item">Tissues</h3><span class="nu181-pill" id="nu181-state" role="status" aria-live="polite">Time to restock</span></div>
      <div class="nu181-overview"><div class="nu181-current"><span class="nu181-kicker" data-t="remaining">CURRENT QUANTITY</span><div class="nu181-big"><strong id="nu181-current-value">1</strong><span id="nu181-current-unit">box</span></div></div><div class="nu181-minimum"><span class="nu181-kicker" data-t="min">MINIMUM RESERVE</span><div class="nu181-min-value"><strong id="nu181-minimum-value">2</strong><span id="nu181-minimum-unit">boxes</span></div><span id="nu181-needed" class="nu181-shortfall" aria-live="polite">1 more box</span></div></div>
      <div class="nu181-metadata"><span>⌖ <span data-t="location">Stored</span>: <strong data-t="place">Hall closet</strong></span><span>▣ <span data-t="purchased">Last purchase</span>: <strong data-t="purchasedDate">Nov 8</strong></span><span>◷ <span data-t="used">Last use</span>: <strong data-t="usedDate">Nov 12</strong></span></div>
      <div class="nu181-quantity-chart"><label data-t="progress">Current vs. minimum</label><div class="nu181-meter" aria-hidden="true"><span id="nu181-meter-fill"></span><i id="nu181-meter-marker"></i></div><div class="nu181-meter-numbers"><span id="nu181-meter-caption">1 box</span><span id="nu181-marker-caption">Minimum: 2 boxes</span></div></div>
      <form id="nu181-form" class="nu181-controls" novalidate><label><span data-t="quantity">Current quantity (boxes)</span><input id="nu181-quantity" type="number" inputmode="numeric" min="0" max="9999" step="1" value="1" /></label><label><span data-t="threshold">Minimum reserve (boxes)</span><input id="nu181-threshold" type="number" inputmode="numeric" min="0" max="9999" step="1" value="2" /></label></form>
      <p id="nu181-error" class="nu181-error" role="alert" hidden></p><p id="nu181-feedback" class="nu181-feedback" role="status" hidden></p>
      <div class="nu181-actions"><button type="button" id="nu181-purchase"><span aria-hidden="true">＋</span> <span data-t="purchase">Record purchase +1</span></button><button type="button" id="nu181-use"><span aria-hidden="true">−</span> <span data-t="use">Record use −1</span></button><button type="button" id="nu181-reset" data-t="reset">Reset example</button></div>
    </div>
    <footer class="nu181-footer"><a id="nu181-store" href="https://apps.apple.com/us/app/id6826459096" rel="noopener noreferrer" target="_blank"><span data-t="store">View on the App Store</span><span aria-hidden="true">↗</span></a><p class="nu181-tagline" data-t="tagline">Record what you use. Know what remains.</p><p class="nu181-note" data-t="notice">Illustrative local-only demo. Quantities update only in this page; nothing is saved or synchronized.</p><small data-t="sample">Example values · You update quantities yourself</small></footer>`;
  const anchor=document.querySelector('.p19-breadcrumb');
  if(anchor&&anchor.parentNode)anchor.insertAdjacentElement('afterend',root);
  else {const point=document.querySelector('#p199-content')||document.querySelector('main');if(point&&point.parentNode)point.parentNode.insertBefore(root,point);}
  if(!root.isConnected)return;
  const $=sel=>root.querySelector(sel);
  const pickLang=()=>{const v=String(document.querySelector('#p199-language')?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en';};
  const pickCountry=()=>{const v=String(document.querySelector('#p199-country')?.value||'us').toLowerCase();return /^[a-z]{2}$/.test(v)?v:'us';};
  let lang='en';
  const format=n=>n.toLocaleString('en-US',{maximumFractionDigits:0});
  function number(id){const s=$(id).value.trim();return /^\d{1,4}$/.test(s)&&Number(s)<=9999?Number(s):NaN;}
  function unit(n){return lang==='en'?(n===1?dict.en.boxOne:dict.en.box):dict[lang].box;}
  function recalc(){
    const t=dict[lang],stock=number('#nu181-quantity'),min=number('#nu181-threshold');
    const valid=Number.isFinite(stock)&&Number.isFinite(min);
    $('#nu181-error').hidden=valid;
    $('#nu181-error').textContent=valid?'':t.validation;
    $('#nu181-stock-shield')?.removeAttribute('data-valid');
    root.classList.toggle('nu181-invalid',!valid);
    if(!valid){$('#nu181-feedback').hidden=true;return;}
    const deficit=Math.max(0,min-stock),low=stock<min;
    $('#nu181-current-value').textContent=format(stock);
    $('#nu181-current-unit').textContent=unit(stock);
    $('#nu181-minimum-value').textContent=format(min);
    $('#nu181-minimum-unit').textContent=unit(min);
    $('#nu181-needed').textContent=low?(deficit===1?t.unitsNeededOne:t.unitsNeeded.replace('{n}',format(deficit))):t.unitsDone;
    $('#nu181-state').textContent=stock===0?t.out:low?t.restock:t.healthy;
    root.dataset.stockState=stock===0?'out':low?'low':'ok';
    const denom=Math.max(stock,min,1);
    $('#nu181-meter-fill').style.width=(100*stock/denom)+'%';
    $('#nu181-meter-marker').style.left=(100*min/denom)+'%';
    $('#nu181-meter-caption').textContent=format(stock)+' '+unit(stock);
    $('#nu181-marker-caption').textContent=t.min+': '+format(min)+' '+unit(min);
  }
  function translate(){
    lang=pickLang();const t=dict[lang];root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-t]').forEach(el=>{const label=t[el.dataset.t];if(label!==undefined)el.textContent=label;});
    $('#nu181-quantity').setAttribute('aria-label',t.quantity);
    $('#nu181-threshold').setAttribute('aria-label',t.threshold);
    $('#nu181-store').href='https://apps.apple.com/'+pickCountry()+'/app/id'+APP;
    $('#nu181-feedback').hidden=true;recalc();
  }
  function change(delta){
    const stock=number('#nu181-quantity'),min=number('#nu181-threshold');
    if(!Number.isFinite(stock)||!Number.isFinite(min)){recalc();return;}
    const t=dict[lang];if(delta<0&&stock===0){$('#nu181-feedback').textContent=t.empty;$('#nu181-feedback').hidden=false;return;}
    if(delta>0&&stock===9999){$('#nu181-feedback').textContent=t.full;$('#nu181-feedback').hidden=false;return;}
    $('#nu181-feedback').hidden=true;$('#nu181-quantity').value=String(stock+delta);recalc();
  }
  $('#nu181-form').addEventListener('submit',ev=>ev.preventDefault());
  ['#nu181-quantity','#nu181-threshold'].forEach(id=>$(id).addEventListener('input',()=>{$('#nu181-feedback').hidden=true;recalc();}));
  $('#nu181-purchase').addEventListener('click',()=>change(1));
  $('#nu181-use').addEventListener('click',()=>change(-1));
  $('#nu181-reset').addEventListener('click',()=>{$('#nu181-quantity').value='1';$('#nu181-threshold').value='2';$('#nu181-feedback').hidden=true;recalc();});
  document.querySelector('#p199-language')?.addEventListener('change',translate);
  document.querySelector('#p199-country')?.addEventListener('change',translate);
  translate();
})();
