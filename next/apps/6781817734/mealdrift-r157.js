/* R157 MealDrift seasonal/tag filtering: LP-only illustration, deterministic selection, no API/storage. */
(() => {
  'use strict';
  const APP_ID='6781817734';
  const M=[
    {id:0,icon:'🍲',months:[11,12,1,2],tag:'home'},
    {id:1,icon:'🥗',months:[6,7,8],tag:'quick'},
    {id:2,icon:'🍛',months:[],tag:'quick'},
    {id:3,icon:'🥘',months:[],tag:'home'},
    {id:4,icon:'🍜',months:[],tag:'weekend'}
  ];
  const T={
    ja:{eyebrow:'FUTURE YOU, A BETTER SHORTLIST',badge:'LP専用・操作デモ',title:'冬に食べたいもの。急ぐ日に食べたいもの。',lead:'季節とタグを合わせるだけで、今日の候補が変わる。「何を食べる？」の前に、選べるものを絞っておこう。',panel:'候補をしぼる',month:'食べたい月',tag:'今日の気分',all:'すべて',quick:'手早く',home:'家にある',weekend:'週末向け',months:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],meal:['鍋','冷やし麺','カレー','残り物のスープ','週末ラーメン'],season:'季節の対象外',tagmiss:'タグが違う',ok:'候補に残る',anytime:'通年',seasonal:'季節限定',choose:'今日の一つを選ぶ',again:'もう一度選ぶ',reset:'初期状態に戻す',available:'いま選べる候補',picked:'今夜の候補',notyet:'条件を選んでみてください',empty:'条件に合う候補がありません。月かタグを変更してください。',chosen:'この候補が残りました。',note:'LP専用の見本です。季節・タグの設定、献立、選択順は説明用の架空データで、アプリの実際の抽選方式は再現していません。入力の保存・通信・通知は行いません。'},
    en:{eyebrow:'FUTURE YOU, A BETTER SHORTLIST',badge:'INTERACTIVE LP EXAMPLE',title:'A winter meal. A quick-night meal. Different shortlists.',lead:'Change the month or a tag. The options you could eat tonight narrow down before you have to choose.',panel:'NARROW YOUR OPTIONS',month:'Month to eat it',tag:'What fits today?',all:'Any tag',quick:'Quick',home:'At home',weekend:'Weekend',months:['January','February','March','April','May','June','July','August','September','October','November','December'],meal:['Hot pot','Cold noodles','Curry','Leftover soup','Weekend ramen'],season:'Out of season',tagmiss:'Different tag',ok:'Available',anytime:'Year-round',seasonal:'Seasonal',choose:'Choose one tonight',again:'Choose again',reset:'Restore sample',available:'options left tonight',picked:'TONIGHT’S OPTION',notyet:'Try choosing a month and tag.',empty:'No options match. Change the month or tag.',chosen:'This option remains.',note:'LP-only illustration. Meals, seasonal settings, tags and selection order are invented examples; this is not MealDrift’s real selection algorithm. No information is stored, sent, or shared.'},
    ar:{eyebrow:'قائمة أفضل لك غدًا',badge:'تجربة توضيحية للموقع',title:'وجبة للشتاء. ووجبة ليوم مزدحم.',lead:'غيّر الشهر أو الوسم لتضييق الخيارات المتاحة لك قبل اختيار وجبة الليلة.',panel:'تصفية الخيارات',month:'شهر الوجبة',tag:'ما يناسب اليوم؟',all:'كل الوسوم',quick:'سريع',home:'في البيت',weekend:'عطلة الأسبوع',months:['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],meal:['طبق ساخن','نودلز باردة','كاري','حساء البقايا','رامن العطلة'],season:'خارج الموسم',tagmiss:'وسم مختلف',ok:'متاح',anytime:'طوال العام',seasonal:'موسمي',choose:'اختر وجبة الليلة',again:'اختر مرة أخرى',reset:'إعادة المثال',available:'خيارات متاحة الليلة',picked:'خيار الليلة',notyet:'اختر الشهر والوسم.',empty:'لا توجد خيارات مطابقة. غيّر الشهر أو الوسم.',chosen:'هذا أحد الخيارات المتبقية.',note:'هذا مثال توضيحي للموقع. الأطباق والمواسم والوسوم وترتيب الاختيار افتراضية ولا تمثل خوارزمية التطبيق الحقيقية. لا يتم تخزين أي بيانات أو إرسالها.'}
  };
  const langNow=()=>{
    const selected=document.getElementById('p199-language')?.value||'';
    const hint=(selected||document.documentElement.lang||'en').toLowerCase();
    return hint.startsWith('ja')?'ja':hint.startsWith('ar')?'ar':'en';
  };
  function mount(){
    if(document.getElementById('tsz-md157'))return;
    const body=document.body;if(!body)return;
    const id=body.dataset.p199Id||body.dataset.p19AppId||'';
    if(id&&id!==APP_ID)return;
    if(!id&&!document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor=document.getElementById('tsz-md128')||document.getElementById('tsz-mealdrift-r92')||document.getElementById('overview');
    const main=document.querySelector('main');if(!anchor&&!main)return;
    const root=document.createElement('section');root.id='tsz-md157';root.dataset.demo='season-and-tag';root.setAttribute('aria-label','MealDrift seasonal and tag shortlist example');
    root.innerHTML=`<div class="md157-top"><span class="md157-eyebrow" data-t="eyebrow"></span><span class="md157-badge" data-t="badge"></span></div><h2 data-t="title"></h2><p class="md157-lead" data-t="lead"></p><div class="md157-layout"><div class="md157-panel"><p class="md157-panel-title" data-t="panel"></p><div class="md157-fields"><label><span data-t="month"></span><select data-month aria-label="Month"><\/select></label><label><span data-t="tag"></span><select data-tag aria-label="Tag"><\/select></label></div><div data-meals></div><div class="md157-actions"><button type="button" class="md157-primary" data-choose></button><button type="button" class="md157-reset" data-reset></button></div></div><div class="md157-preview" aria-live="polite"><span class="md157-preview-kicker" data-t="available"></span><strong class="md157-count" data-count></strong><span class="md157-count-label" data-label></span><div class="md157-pick"><span class="md157-pick-label" data-t="picked"></span><strong data-pick></strong></div><p class="md157-status" data-status></p></div></div><p class="md157-note" data-t="note"></p>`;
    if(anchor)anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    let month=11,tag='all',chosen=null,roll=0,seen='';
    const option=(v,label,selected)=>{const o=document.createElement('option');o.value=String(v);o.textContent=label;o.selected=selected;return o};
    const eligible=()=>M.filter(m=>(!m.months.length||m.months.includes(month))&&(tag==='all'||m.tag===tag));
    function render(){
      const lang=langNow(),t=T[lang];seen=lang;root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      for(const el of root.querySelectorAll('[data-t]'))el.textContent=t[el.dataset.t]||'';
      const mon=root.querySelector('[data-month]');mon.replaceChildren(...t.months.map((s,i)=>option(i+1,s,i+1===month)));
      const tags=root.querySelector('[data-tag]');tags.replaceChildren(...['all','quick','home','weekend'].map(v=>option(v,t[v],v===tag)));
      const list=root.querySelector('[data-meals]');list.replaceChildren();
      M.forEach(m=>{
        const within=!m.months.length||m.months.includes(month);
        const match=tag==='all'||m.tag===tag;
        const avail=within&&match;
        const line=document.createElement('div');line.className='md157-row';line.dataset.id=String(m.id);line.dataset.eligible=String(avail);
        const main=document.createElement('div');main.className='md157-meal-main';
        const emoji=document.createElement('span');emoji.className='md157-emoji';emoji.textContent=m.icon;emoji.setAttribute('aria-hidden','true');
        const info=document.createElement('div');const name=document.createElement('div');name.className='md157-name';name.textContent=t.meal[m.id];
        const sub=document.createElement('div');sub.className='md157-sub';sub.textContent=(m.months.length?t.seasonal:t.anytime)+' · '+t[m.tag];info.append(name,sub);main.append(emoji,info);
        const state=document.createElement('span');state.className='md157-state'+(avail?'':' off');state.textContent=avail?t.ok:within?t.tagmiss:t.season;
        line.append(main,state);list.append(line);
      });
      const opts=eligible();root.querySelector('[data-count]').textContent=String(opts.length)+' / '+String(M.length);
      root.querySelector('[data-label]').textContent=t.available;
      root.querySelector('[data-pick]').textContent=chosen===null?'—':t.meal[chosen];
      root.querySelector('[data-status]').textContent=opts.length===0?t.empty:chosen===null?t.notyet:t.chosen;
      root.querySelector('[data-choose]').textContent=chosen===null?t.choose:t.again;
      root.querySelector('[data-choose]').disabled=!opts.length;
      root.querySelector('[data-reset]').textContent=t.reset;
      root.dataset.eligible=String(opts.length);root.dataset.chosen=chosen===null?'none':String(chosen);
      root.dataset.month=String(month);root.dataset.tag=tag;
    }
    root.querySelector('[data-month]').addEventListener('change',e=>{month=Number(e.target.value);chosen=null;render()});
    root.querySelector('[data-tag]').addEventListener('change',e=>{tag=e.target.value;chosen=null;render()});
    root.querySelector('[data-choose]').addEventListener('click',()=>{const opts=eligible();if(!opts.length)return;chosen=opts[roll%opts.length].id;roll++;render()});
    root.querySelector('[data-reset]').addEventListener('click',()=>{month=11;tag='all';chosen=null;roll=0;render()});
    document.getElementById('p199-language')?.addEventListener('change',render);
    new MutationObserver(()=>{if(seen!==langNow())render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
