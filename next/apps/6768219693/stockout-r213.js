(() => {
  'use strict';
  const APP = '6768219693', ID = 'tsz-stockout-r213';
  const body = document.body;
  if (!body || (body.dataset.p199Id || body.dataset.p19AppId) !== APP || document.getElementById(ID)) return;
  const main = document.querySelector('main');
  if (!main) return;
  const words = {
    en: {
      eyebrow:'STOCKOUT ZERO · INVENTORY CLARITY', headline:'Zero should not be the reminder.',
      intro:'Your reorder line matters before the shelf is empty. Move the numbers and see the difference.',
      interactive:'LIVE EXAMPLE', cases:'Three views of the same shelf', plenty:'Enough in stock', near:'Reorder point', empty:'Already empty',
      onhand:'Units on hand', line:'Reorder at or below', scale:'Shelf level', stocked:'Stock on shelf', threshold:'Reorder line',
      verdict:'CURRENT STATUS', good:'Stock is above your line', warning:'The reorder line is reached', bad:'Out of stock',
      goodText:'You still have room before the reorder line.', warningText:'The current count is at or below the line you set.',
      badText:'There are no units left. This is the moment you wanted to avoid.',
      difference:'Difference to reorder line', above:'above the line', below:'below the line', at:'right on the line',
      units:'units', count:'Current count', level:'Your chosen reorder line', hint:'Choose the shelf count and the level where you want to check replenishment.',
      reset:'Reset example', note:'Illustrative manual inputs only. This web demo does not check live inventory, place orders or save entries.',
      cta:'View Stockout Zero on the App Store', locale:'Language', region:'App Store region', invalid:'Enter whole numbers between 0 and 100.',
      second:'Know where the line is.', secondText:'A clear reorder point is easier to act on than an empty shelf.',
    },
    ja: {
      eyebrow:'STOCKOUT ZERO · 在庫の見える化', headline:'「ゼロになった」が、合図では遅い。',
      intro:'在庫切れの前に、補充の目安がある。数字を動かして、その違いを確かめよう。',
      interactive:'操作できるサンプル', cases:'同じ棚の3つの状態', plenty:'在庫に余裕', near:'補充の目安', empty:'すでに在庫0',
      onhand:'いまある個数', line:'補充確認の目安', scale:'棚の状態', stocked:'現在庫', threshold:'補充ライン',
      verdict:'いまの状態', good:'補充ラインより上', warning:'補充ラインに到達', bad:'在庫切れ',
      goodText:'設定した補充ラインより、まだ余裕があります。', warningText:'現在庫が補充ライン以下になりました。確認するタイミングです。',
      badText:'在庫が0になりました。そうなる前に気づきたい。',
      difference:'補充ラインとの差', above:'個 上', below:'個 下', at:'ちょうど',
      units:'個', count:'現在庫', level:'自分で決めた補充ライン', hint:'現在庫と、補充を確認したい個数を変えてみてください。',
      reset:'例を最初に戻す', note:'手入力による説明用サンプルです。実在庫の自動取得・発注・保存は行いません。',
      cta:'App StoreでStockout Zeroを見る', locale:'言語', region:'App Store地域', invalid:'0〜100の整数を入力してください。',
      second:'補充の目安を、見えるところに。', secondText:'棚が空になる前に確認できれば、次の行動を決めやすい。',
    },
    ar: {
      eyebrow:'STOCKOUT ZERO · وضوح المخزون', headline:'لا تنتظر حتى يصبح المخزون صفرًا.',
      intro:'هناك حدّ لإعادة التزويد قبل نفاد الرف. غيّر الأرقام لترى الفرق.',
      interactive:'مثال تفاعلي', cases:'ثلاث حالات للرف نفسه', plenty:'مخزون كافٍ', near:'حد إعادة التزويد', empty:'المخزون نفد',
      onhand:'الوحدات المتاحة', line:'حد مراجعة التزويد', scale:'حالة الرف', stocked:'المخزون الحالي', threshold:'حد التزويد',
      verdict:'الحالة الحالية', good:'المخزون أعلى من الحد', warning:'تم بلوغ حد التزويد', bad:'نفاد المخزون',
      goodText:'لا يزال المخزون أعلى من الحد الذي حددته.', warningText:'وصل المخزون إلى الحد المحدد أو انخفض دونه. حان وقت المراجعة.',
      badText:'لم تتبقّ وحدات. من الأفضل اكتشاف ذلك قبل حدوثه.',
      difference:'الفرق عن حد التزويد', above:'فوق الحد', below:'تحت الحد', at:'عند الحد',
      units:'وحدات', count:'العدد الحالي', level:'حد التزويد الذي اخترته', hint:'غيّر عدد الوحدات وحد التزويد الذي تريد المراجعة عنده.',
      reset:'إعادة المثال', note:'هذا مثال يدوي توضيحي فقط. لا يتحقق من المخزون الفعلي ولا يقدّم طلبات شراء ولا يحفظ البيانات.',
      cta:'شاهد Stockout Zero في App Store', locale:'اللغة', region:'منطقة App Store', invalid:'أدخل عددًا صحيحًا بين ٠ و١٠٠.',
      second:'حد واضح يعني قرارًا أوضح.', secondText:'مراجعة نقطة التزويد أسهل من اكتشاف رف فارغ.',
    }
  };
  const langFrom = v => /^ar(?:\b|[_-])/i.test(v || '') ? 'ar' : /^ja(?:\b|[_-])/i.test(v || '') ? 'ja' : 'en';
  const regionFrom = v => /^(jp|japan|ja-jp)$/i.test(v || '') ? 'jp' : 'us';
  const hostLang = document.querySelector('#p199-language, #p19-language, #sz35-language, #stockout-language');
  const hostRegion = document.querySelector('#p199-country, #p19-country, #sz35-country, #stockout-country');
  let lang = hostLang && hostLang.value ? langFrom(hostLang.value) : 'en';
  let region = hostRegion && hostRegion.value ? regionFrom(hostRegion.value) : 'us';
  let active = 'near', inSync = false;
  const cases = {plenty:[18,8], near:[6,8], empty:[0,8]};
  const root = document.createElement('section');
  root.id=ID;
  root.setAttribute('aria-label','Stockout Zero interactive inventory example');
  root.innerHTML = `
    <div class="sz213-frame">
      <div class="sz213-top"><span class="sz213-brand"><span class="sz213-brandmark">◫</span> STOCKOUT ZERO</span><span class="sz213-topstatus" data-t="interactive"></span></div>
      <div class="sz213-hero"><div class="sz213-eyebrow" data-t="eyebrow"></div><h2 data-t="headline"></h2><p data-t="intro"></p></div>
      <div class="sz213-main">
        <div class="sz213-controls">
          <div class="sz213-blocktitle"><span class="sz213-kicker" data-t="interactive"></span><h3 data-t="cases"></h3></div>
          <div class="sz213-presets"><button type="button" data-case="plenty"></button><button type="button" data-case="near"></button><button type="button" data-case="empty"></button></div>
          <div class="sz213-field"><div class="sz213-fieldtop"><label for="sz213-stock" data-t="onhand"></label><span data-t="count"></span></div>
            <div class="sz213-numberrow"><input id="sz213-stock-range" type="range" min="0" max="100" step="1" value="6" aria-label="Units on hand slider"><div class="sz213-num"><input id="sz213-stock" type="number" min="0" max="100" step="1" value="6" aria-label="Units on hand"><span data-t="units"></span></div></div>
          </div>
          <div class="sz213-field"><div class="sz213-fieldtop"><label for="sz213-limit" data-t="line"></label><span data-t="level"></span></div>
            <div class="sz213-numberrow"><input id="sz213-limit-range" type="range" min="0" max="100" step="1" value="8" aria-label="Reorder threshold slider"><div class="sz213-num"><input id="sz213-limit" type="number" min="0" max="100" step="1" value="8" aria-label="Reorder threshold"><span data-t="units"></span></div></div>
          </div>
          <div class="sz213-error" id="sz213-error" role="status" hidden></div><p class="sz213-hint" data-t="hint"></p><button type="button" class="sz213-reset" id="sz213-reset" data-t="reset"></button>
        </div>
        <div class="sz213-outcome" id="sz213-outcome">
          <div class="sz213-outtop"><span data-t="verdict"></span><span class="sz213-state" id="sz213-state"></span></div>
          <div class="sz213-shelfwrap"><div class="sz213-shelftop"><span data-t="scale"></span><span class="sz213-counter" id="sz213-counter"></span></div>
            <div class="sz213-shelf" id="sz213-shelf" aria-label="Sample stock level visualization"></div>
            <div class="sz213-track"><div class="sz213-fill" id="sz213-fill"></div><div class="sz213-limit" id="sz213-line"><i></i></div></div>
            <div class="sz213-legend"><span><i class="sz213-dot stock"></i><span data-t="stocked"></span></span><span><i class="sz213-dot line"></i><span data-t="threshold"></span></span></div>
          </div>
          <h3 class="sz213-judgment" id="sz213-judgment"></h3><p class="sz213-explain" id="sz213-explain"></p>
          <div class="sz213-difference"><div><span data-t="difference"></span><strong id="sz213-diff"></strong></div><div class="sz213-rule"><span data-t="second"></span><small data-t="secondText"></small></div></div>
        </div>
      </div>
      <div class="sz213-footer"><p class="sz213-disclaimer" data-t="note"></p><div class="sz213-bottom">
        <div class="sz213-selects"><label><span data-t="locale"></span><select id="sz213-language" aria-label="Language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="sz213-region" aria-label="App Store region"><option value="us">US</option><option value="jp">JP</option></select></label></div>
        <a id="sz213-store" target="_blank" rel="noopener noreferrer"><span data-t="cta"></span> <span aria-hidden="true">↗</span></a>
      </div></div>
    </div>`;
  main.prepend(root);
  const $=s=>root.querySelector(s), T=()=>words[lang], format=n=>new Intl.NumberFormat(lang==='ar'?'ar':lang==='ja'?'ja-JP':'en-US').format(n);
  function setHeader(select,value,kind){
    if(!select || !select.options || !select.options.length)return;
    const found=Array.from(select.options).find(o=>kind==='lang' ? langFrom(o.value)===value && (value!=='en'||/^en/i.test(o.value)) : regionFrom(o.value)===value && (value!=='us'||/^us/i.test(o.value)));
    if(found && found.value!==select.value){select.value=found.value;select.dispatchEvent(new Event('change',{bubbles:true}));}
  }
  function syncHeader(){if(inSync)return;inSync=true;try{setHeader(hostLang,lang,'lang');setHeader(hostRegion,region,'region');}finally{inSync=false;}}
  function translate(){
    root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=T()[el.dataset.t]||'';});
    for(const key of Object.keys(cases)){
      const button=$(`[data-case="${key}"]`);button.textContent=T()[key];button.setAttribute('aria-pressed',String(key===active));
    }
    $('#sz213-language').value=lang;$('#sz213-region').value=region;
    $('#sz213-store').href=`https://apps.apple.com/${region}/app/id${APP}`;
  }
  function drawShelf(stock){
    const shelf=$('#sz213-shelf');shelf.replaceChildren();
    for(let i=0;i<20;i++){
      const block=document.createElement('span');block.className='sz213-box'+(i<Math.min(stock,20)?' is-full':'');
      block.setAttribute('aria-hidden','true');shelf.append(block);
    }
  }
  function update(){
    const stockInput=$('#sz213-stock'),limitInput=$('#sz213-limit');
    const s=Number(stockInput.value),limit=Number(limitInput.value);
    const valid=[s,limit].every(n=>Number.isInteger(n)&&n>=0&&n<=100)&&stockInput.value.trim()!==''&&limitInput.value.trim()!=='';
    $('#sz213-error').hidden=valid;$('#sz213-error').textContent=T().invalid;
    $('#sz213-outcome').hidden=!valid;
    if(!valid)return;
    $('#sz213-stock-range').value=s;$('#sz213-limit-range').value=limit;
    const status=s===0?'bad':s<=limit?'warning':'good';
    const delta=s-limit;
    $('#sz213-outcome').dataset.status=status;
    $('#sz213-state').textContent=T()[status];
    $('#sz213-judgment').textContent=T()[status];
    $('#sz213-explain').textContent=T()[status+'Text'];
    $('#sz213-counter').textContent=format(s)+' / 100';
    $('#sz213-diff').textContent=delta===0?T().at:(format(Math.abs(delta))+' '+T()[delta>0?'above':'below']);
    $('#sz213-fill').style.width=s+'%';
    $('#sz213-line').style.left=limit+'%';
    drawShelf(s);
    for(const key of Object.keys(cases))$(`[data-case="${key}"]`).setAttribute('aria-pressed',String(key===active));
  }
  function preset(key){active=key;$('#sz213-stock').value=cases[key][0];$('#sz213-limit').value=cases[key][1];update();}
  for(const key of Object.keys(cases))$(`[data-case="${key}"]`).addEventListener('click',()=>preset(key));
  for(const field of ['stock','limit']){
    $(`#sz213-${field}`).addEventListener('input',()=>{active='';update();});
    $(`#sz213-${field}-range`).addEventListener('input',e=>{active='';$(`#sz213-${field}`).value=e.target.value;update();});
  }
  $('#sz213-reset').addEventListener('click',()=>preset('near'));
  $('#sz213-language').addEventListener('change',e=>{lang=e.target.value;translate();update();syncHeader();});
  $('#sz213-region').addEventListener('change',e=>{region=e.target.value;translate();update();syncHeader();});
  if(hostLang)hostLang.addEventListener('change',()=>{if(inSync)return;lang=langFrom(hostLang.value);translate();update();});
  if(hostRegion)hostRegion.addEventListener('change',()=>{if(inSync)return;region=regionFrom(hostRegion.value);translate();update();});
  translate();update();syncHeader();
})();
