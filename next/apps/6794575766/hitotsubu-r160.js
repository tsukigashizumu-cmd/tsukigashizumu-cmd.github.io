/* Hitotsubu R160 — LP-only visual explanation of grains growing into a collection. */
(() => {
  'use strict';
  const APP_ID = '6794575766';
  const INITIAL = 3;
  const MAX = 80;
  // Illustrative website thresholds only. Never claim to reproduce app thresholds.
  const DEMO_GROUP = {bottle:5,crate:10,container:20,warehouse:40};
  const TEXT = {
    ja:{eyebrow:'A SMALL GRAIN, KEPT.',tag:'LP専用・体験デモ',title:'ひと粒は、消えていかない。',lead:'おいしかった。少し笑った。なんとか今日を越えた。小さな出来事が集まって、瓶になり、箱になり、ひとつの風景になっていく。',today:'いま残したひと粒',moment:'小さな出来事を選ぶ',moments:['おいしかった','少し笑った','助けられた','今日も過ごした'],add:'ひと粒を残す',more5:'5粒を追加',more10:'10粒を追加',reset:'説明用の見本に戻す',grains:'見本のひと粒',visual:'瓶の中の粒',bottle:'瓶',crate:'木箱',container:'コンテナ',warehouse:'倉庫',packed:'集まった数',toNext:'次の瓶まで',complete:'いっぱい',note:'このページの粒数・箱へのまとまり方・階層は、理解しやすく縮小した架空の例です。Hitotsubu本体の実際の収容量や保存仕様を再現するものではありません。ここで「見本に戻す」を押しても、アプリに記録された粒を削除することはありません。データは保存・送信されません。',todayLabel:'選んだ言葉',legend:'ひと粒ずつ残る、積み重なるイメージ',resetNote:'※リセットされるのはこのサイトの見本のみ。',bottleUnit:'瓶',crateUnit:'箱',containerUnit:'個',warehouseUnit:'棟',chosen:'選んだ言葉'},
    en:{eyebrow:'A SMALL GRAIN, KEPT.',tag:'INTERACTIVE LP EXAMPLE',title:'One small grain does not disappear.',lead:'Something tasted good. You smiled a little. You made it through the day. Tiny moments collect into bottles, crates, containers, and eventually a place full of days lived.',today:'A grain from today',moment:'Choose a small moment',moments:['It tasted good','I smiled a little','Someone helped','I got through today'],add:'Keep one grain',more5:'Add 5 grains',more10:'Add 10 grains',reset:'Restore website sample',grains:'Example grains',visual:'Grains in the bottle',bottle:'Bottle',crate:'Wooden crate',container:'Container',warehouse:'Warehouse',packed:'Collected',toNext:'Until next bottle',complete:'Filled',note:'All grain counts, grouping thresholds, and stages here are reduced, invented examples for this website. They do not represent the app’s actual storage limits or implementation. Resetting this website sample never deletes a real grain in Hitotsubu. Nothing is stored or sent.',todayLabel:'Chosen moment',legend:'An illustration of moments being kept, one by one',resetNote:'Only this website sample can be reset.',bottleUnit:'bottles',crateUnit:'crates',containerUnit:'containers',warehouseUnit:'warehouses',chosen:'Chosen moment'},
    ar:{eyebrow:'حبّة صغيرة محفوظة',tag:'تجربة توضيحية للموقع',title:'الحبّة الصغيرة لا تختفي.',lead:'كان الطعام لذيذاً. ابتسمت قليلاً. تجاوزت هذا اليوم. تتجمع اللحظات الصغيرة في زجاجات وصناديق وحاويات حتى تصبح مخزناً من الأيام التي عشتها.',today:'حبّة من اليوم',moment:'اختر لحظة صغيرة',moments:['كان الطعام لذيذاً','ابتسمت قليلاً','ساعدني أحدهم','تجاوزت هذا اليوم'],add:'احتفظ بحبّة',more5:'أضف ٥ حبّات',more10:'أضف ١٠ حبّات',reset:'إعادة المثال',grains:'حبّات توضيحية',visual:'الحبّات داخل الزجاجة',bottle:'زجاجة',crate:'صندوق خشبي',container:'حاوية',warehouse:'مستودع',packed:'المجموع',toNext:'المتبقي للزجاجة التالية',complete:'ممتلئة',note:'جميع الأعداد وحدود تجميع الحبات والمراحل هنا أمثلة مبسطة وخيالية لهذا الموقع، ولا تمثل سعة التطبيق الحقيقية أو طريقة حفظه. إعادة هذا المثال لا تحذف أي حبّة حقيقية في Hitotsubu. لا يتم حفظ البيانات أو إرسالها.',todayLabel:'اللحظة المختارة',legend:'صورة توضيحية للحظات التي تتراكم واحدة تلو الأخرى',resetNote:'إعادة المثال تخص هذا الموقع فقط.',bottleUnit:'زجاجات',crateUnit:'صناديق',containerUnit:'حاويات',warehouseUnit:'مستودعات',chosen:'اللحظة المختارة'}
  };
  const langNow=()=>{
    const raw=String(document.getElementById('p199-language')?.value||document.documentElement.lang||'en').toLowerCase().split(/[-_]/)[0];
    return Object.hasOwn(TEXT,raw)?raw:'en';
  };
  const number=(n,lang)=>new Intl.NumberFormat(lang==='ar'?'ar':lang==='ja'?'ja-JP':'en-US',{maximumFractionDigits:0}).format(n);
  function mount(){
    if(document.getElementById('tsz-ht160')||!document.body)return;
    const id=document.body.dataset.p199Id||document.body.dataset.p19AppId||'';
    if(id && id!==APP_ID)return;
    if(!id && !document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor=document.getElementById('tsz-ht130')||document.getElementById('overview');
    const main=document.querySelector('main');if(!anchor&&!main)return;
    const root=document.createElement('section');root.id='tsz-ht160';root.dataset.demo='hitotsubu-grain-journey-illustrative';root.setAttribute('aria-label','Hitotsubu illustrative grain journey');
    root.innerHTML=`
      <div class="ht160-head"><span class="ht160-eyebrow" data-t="eyebrow"></span><span class="ht160-tag" data-t="tag"></span></div>
      <h2 data-t="title"></h2><p class="ht160-lead" data-t="lead"></p>
      <div class="ht160-grid">
        <div class="ht160-panel ht160-controls">
          <p class="ht160-label" data-t="moment"></p><div class="ht160-moments" data-moments></div>
          <div class="ht160-current"><span data-t="todayLabel"></span><strong data-picked></strong></div>
          <button type="button" class="ht160-add" data-add="1"></button>
          <div class="ht160-shortcuts"><button type="button" data-add="5"></button><button type="button" data-add="10"></button></div>
          <div class="ht160-total"><span data-t="grains"></span><strong data-total aria-live="polite"></strong></div>
          <button type="button" class="ht160-reset" data-reset></button><p class="ht160-reset-note" data-t="resetNote"></p>
        </div>
        <div class="ht160-panel ht160-display">
          <div class="ht160-bottle-top"><span class="ht160-label" data-t="visual"></span><span class="ht160-bottle-caption" data-t="legend"></span></div>
          <div class="ht160-jar-scene" role="img" aria-label="Illustrative glass jar containing small grains"><div class="ht160-jar"><div class="ht160-jar-neck"></div><div class="ht160-jar-body"><div class="ht160-jar-grains" data-grains></div><div class="ht160-glass"></div></div></div></div>
          <div class="ht160-jar-progress"><span data-t="toNext"></span><strong data-next></strong></div>
          <div class="ht160-progress-track" aria-hidden="true"><span data-progress></span></div>
        </div>
      </div>
      <div class="ht160-stages" data-stages></div>
      <p class="ht160-note" data-t="note"></p>`;
    if(anchor)anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    let count=INITIAL,selected=0,seenLang='';
    const grains=root.querySelector('[data-grains]');
    function render(){
      const lang=langNow(),t=TEXT[lang];seenLang=lang;root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.dataset.t]||''});
      const moments=root.querySelector('[data-moments]');moments.replaceChildren();
      t.moments.forEach((phrase,index)=>{
        const button=document.createElement('button');button.type='button';button.className='ht160-moment';button.dataset.moment=String(index);button.setAttribute('aria-pressed',String(index===selected));button.textContent=phrase;
        button.addEventListener('click',()=>{selected=index;render()});moments.appendChild(button);
      });
      root.querySelector('[data-picked]').textContent=t.moments[selected];
      root.querySelectorAll('[data-add]').forEach(el=>{
        const n=Number(el.dataset.add);el.textContent=n===1?t.add:n===5?t.more5:t.more10;
        el.disabled=count+n>MAX;
      });
      root.querySelector('[data-reset]').textContent=t.reset;
      root.querySelector('[data-total]').textContent=number(count,lang);
      const inside=count%5|| (count&&count%5===0?5:0);
      grains.replaceChildren();
      for(let i=0;i<inside;i++){
        const dot=document.createElement('span');dot.className='ht160-grain';dot.setAttribute('aria-hidden','true');grains.appendChild(dot);
      }
      const progress=count%5;
      root.querySelector('[data-next]').textContent=progress===0?t.complete:`${number(5-progress,lang)} / ${number(5,lang)}`;
      root.querySelector('[data-progress]').style.width=`${(progress===0?100:progress*20)}%`;
      root.dataset.count=String(count);root.dataset.bottles=String(Math.floor(count/DEMO_GROUP.bottle));
      root.dataset.crates=String(Math.floor(count/DEMO_GROUP.crate));root.dataset.containers=String(Math.floor(count/DEMO_GROUP.container));root.dataset.warehouses=String(Math.floor(count/DEMO_GROUP.warehouse));
      root.dataset.selected=String(selected);
      const stages=root.querySelector('[data-stages]');stages.replaceChildren();
      [['bottle','bottleUnit'],['crate','crateUnit'],['container','containerUnit'],['warehouse','warehouseUnit']].forEach(([stage,unit],i)=>{
        const value=Math.floor(count/DEMO_GROUP[stage]);
        const panel=document.createElement('div');panel.className='ht160-stage';panel.dataset.stage=stage;panel.dataset.active=value>0?'true':'false';
        const symbol=document.createElement('span');symbol.className='ht160-stage-icon';symbol.textContent=['◌','▤','▣','▥'][i];symbol.setAttribute('aria-hidden','true');
        const content=document.createElement('div');content.className='ht160-stage-text';
        const name=document.createElement('span');name.textContent=t[stage];
        const total=document.createElement('strong');total.textContent=number(value,lang);
        content.append(name,total);panel.append(symbol,content);stages.appendChild(panel);
      });
    }
    root.querySelectorAll('[data-add]').forEach(button=>button.addEventListener('click',()=>{
      const n=Number(button.dataset.add);count=Math.min(MAX,count+n);render();
    }));
    root.querySelector('[data-reset]').addEventListener('click',()=>{count=INITIAL;selected=0;render()});
    document.getElementById('p199-language')?.addEventListener('change',render);
    new MutationObserver(()=>{if(seenLang!==langNow())render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
