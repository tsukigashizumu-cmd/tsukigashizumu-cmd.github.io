/* MealDrift R128 — website-only interactive example; no persistence or network. */
(() => {
  'use strict';
  const APP_ID = '6781817734';
  const L = {
    en: {
      kicker:'TONIGHT, ONE LESS DECISION', badge:'INTERACTIVE LP EXAMPLE',
      title:'You choose the options. Let one meal rise to the top.',
      intro:'Try three likelihood levels and “skip today.” Then let this page pick a meal from the remaining options.',
      choose:'CHOOSE FROM YOUR OWN SHORTLIST',nudge:'Change the likelihood or exclude a meal for today.',
      likelihood:'How often it appears',skip:'Skip today',low:'Less often',mid:'Regular',high:'More often',
      button:'Choose tonight’s meal',again:'Choose again',reset:'Restore sample',
      picked:'TONIGHT’S PICK',ready:'Your options are ready.',none:'All options are excluded. Bring one back before choosing.',
      eligible:'available options',excluded:'excluded today',note:'LP-only illustration with sample meals and a separate, simplified weighted example. Not the real MealDrift interface or selection algorithm. No data is saved, sent, or shared; reloading the page restores the sample.',
      meal0:'Curry',meal1:'Pasta',meal2:'Fridge leftovers',meal3:'Set meal',tip:'Decide from what already sounds good to you.',
      reason:'Only meals not excluded today are eligible. Higher likelihood gives a meal more places in the example selection cycle.'
    },
    ja: {
      kicker:'今日の最後の決断を、手放そう',badge:'LP専用・操作デモ',
      title:'候補は自分で。今日の一つは任せよう。',
      intro:'出やすさを3段階で調整し、「今日は出さない」を選ぶ。残った候補から、今夜の一つを決めてみます。',
      choose:'自分で残した候補',nudge:'出やすさを変えるか、今日は候補から外せます。',
      likelihood:'出やすさ',skip:'今日は出さない',low:'控えめ',mid:'ふつう',high:'よく出す',
      button:'今夜の一つを決める',again:'もう一度決める',reset:'サンプルに戻す',
      picked:'今夜の一つ',ready:'準備はできています。',none:'候補がすべて除外されています。一つ戻してから選んでください。',
      eligible:'選べる候補',excluded:'今日だけ除外',note:'LP専用の説明用デモです。食事名も抽選の仕組みもサンプルであり、MealDrift本体の画面・選択アルゴリズムの再現ではありません。入力は保存・送信・共有されず、再読み込みすると初期状態に戻ります。',
      meal0:'カレー',meal1:'パスタ',meal2:'冷蔵庫の残り物',meal3:'定食',tip:'まず、自分が食べてもいいものだけ。',
      reason:'「今日は出さない」の候補は抽選対象外です。出やすさが高い候補ほど、このデモの選択順に多く登場します。'
    },
    ar: {
      kicker:'قرار أقل هذا المساء',badge:'تجربة توضيحية على الموقع',
      title:'أنت تختار الخيارات، ودع قرار الوجبة يأتي بعد ذلك.',
      intro:'جرّب ثلاثة مستويات لاحتمال الظهور وخيار «استبعد اليوم»، ثم اختر وجبة من الخيارات المتبقية.',
      choose:'قائمتك المختصرة',nudge:'غيّر مستوى الظهور أو استبعد وجبة اليوم.',
      likelihood:'معدل الظهور',skip:'استبعد اليوم',low:'أقل',mid:'عادي',high:'أكثر',
      button:'اختر وجبة الليلة',again:'اختر مرة أخرى',reset:'استعادة المثال',
      picked:'اختيار الليلة',ready:'خياراتك جاهزة.',none:'كل الخيارات مستبعدة. أعد خياراً واحداً قبل الاختيار.',
      eligible:'خيارات متاحة',excluded:'مستبعدة اليوم',note:'هذا مثال تفاعلي على الموقع فقط، بقائمة وجبات وطريقة اختيار مبسطة لا تطابق واجهة MealDrift أو خوارزميته الفعلية. لا تُحفظ البيانات أو تُرسل أو تُشارك؛ تعود الخيارات إلى البداية عند إعادة تحميل الصفحة.',
      meal0:'كاري',meal1:'معكرونة',meal2:'بقايا الثلاجة',meal3:'وجبة متكاملة',tip:'احتفظ فقط بما تودّ تناوله فعلاً.',
      reason:'الخيارات المستبعدة اليوم لا تدخل الاختيار. المستوى الأعلى يظهر مرات أكثر في دورة الاختيار التوضيحية.'
    }
  };
  const initial = [
    {id:0, weight:2, skip:false, icon:'🍛'},
    {id:1, weight:1, skip:false, icon:'🍝'},
    {id:2, weight:2, skip:false, icon:'🥘'},
    {id:3, weight:3, skip:false, icon:'🍱'}
  ];
  const weightOptions = [1,2,3];
  const langNow = () => {
    const raw = String(document.getElementById('p199-language')?.value || document.documentElement.lang || 'en').toLowerCase().split(/[-_]/)[0];
    return L[raw] ? raw : 'en';
  };
  function mount(){
    if(document.getElementById('tsz-md128')) return;
    const b=document.body; if(!b) return;
    const id=b.dataset.p199Id || b.dataset.p19AppId || '';
    if(id && id!==APP_ID) return;
    if(!id && !document.querySelector(`a[href*="${APP_ID}"]`)) return;
    const anchor=document.getElementById('tsz-md92') || document.getElementById('tsz-mealdrift-r92') || document.getElementById('tsz-md51') || document.getElementById('overview');
    const main=document.querySelector('main'); if(!anchor && !main) return;
    const root=document.createElement('section');root.id='tsz-md128';root.dataset.demo='mealdrift-illustrative-shortlist';
    root.setAttribute('aria-label','MealDrift website-only shortlist example');
    root.innerHTML=`<div class="md128-header"><span data-t="kicker"></span><span class="md128-chip" data-t="badge"></span></div>
      <h2 data-t="title"></h2><p class="md128-lead" data-t="intro"></p>
      <div class="md128-panel"><div class="md128-panel-top"><div><span class="md128-label" data-t="choose"></span><p data-t="nudge"></p></div><span class="md128-tip" data-t="tip"></span></div>
      <div class="md128-meals" data-meals></div>
      <div class="md128-actions"><button type="button" class="md128-primary" data-choose data-t="button"></button><button type="button" class="md128-secondary" data-reset data-t="reset"></button></div></div>
      <div class="md128-result" aria-live="polite"><div class="md128-result-copy"><span class="md128-label" data-t="picked"></span><strong data-pick></strong><p data-status></p></div><div class="md128-eligible"><span data-count></span><span data-excluded></span></div></div>
      <p class="md128-reason" data-t="reason"></p><p class="md128-note" data-t="note"></p>`;
    if(anchor) anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    let meals=initial.map(x=>({...x}));let chosen=null;let pickCount=0;let langSeen='';
    const mealLabel=(m,t)=>t['meal'+m.id];
    function render(){
      const lang=langNow(),t=L[lang];root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';langSeen=lang;
      for(const n of root.querySelectorAll('[data-t]'))n.textContent=t[n.dataset.t] || '';
      const wrap=root.querySelector('[data-meals]');wrap.replaceChildren();
      meals.forEach(m=>{
        const row=document.createElement('div');row.className='md128-meal';row.dataset.id=String(m.id);
        if(m.skip)row.classList.add('md128-disabled');
        const front=document.createElement('div');front.className='md128-meal-name';
        const emoji=document.createElement('span');emoji.className='md128-emoji';emoji.textContent=m.icon;emoji.setAttribute('aria-hidden','true');
        const name=document.createElement('b');name.textContent=mealLabel(m,t);
        front.append(emoji,name);
        const control=document.createElement('div');control.className='md128-controls';
        const label=document.createElement('label');label.className='md128-weight';
        const span=document.createElement('span');span.textContent=t.likelihood;
        const select=document.createElement('select');select.dataset.weight=String(m.id);select.setAttribute('aria-label',t.likelihood+' · '+mealLabel(m,t));
        weightOptions.forEach((w,i)=>{const opt=document.createElement('option');opt.value=String(w);opt.textContent=[t.low,t.mid,t.high][i];opt.selected=m.weight===w;select.appendChild(opt);});
        label.append(span,select);
        const exclude=document.createElement('label');exclude.className='md128-skip';
        const check=document.createElement('input');check.type='checkbox';check.dataset.skip=String(m.id);check.checked=m.skip;
        const skipText=document.createElement('span');skipText.textContent=t.skip;
        exclude.append(check,skipText);control.append(label,exclude);row.append(front,control);wrap.appendChild(row);
      });
      const eligible=meals.filter(m=>!m.skip);
      root.querySelector('[data-pick]').textContent=chosen===null?'—':mealLabel(meals[chosen],t);
      root.querySelector('[data-status]').textContent=eligible.length===0?t.none:chosen===null?t.ready:t.tip;
      root.querySelector('[data-count]').textContent=eligible.length+' / 4 '+t.eligible;
      root.querySelector('[data-excluded]').textContent=meals.filter(m=>m.skip).length+' '+t.excluded;
      root.querySelector('[data-choose]').textContent=chosen===null?t.button:t.again;
      root.querySelector('[data-choose]').disabled=!eligible.length;
      root.dataset.choice=chosen===null?'none':String(chosen);
      root.dataset.eligible=String(eligible.length);
      root.dataset.rolls=String(pickCount);
    }
    root.addEventListener('change',ev=>{
      const target=ev.target;
      if(!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement))return;
      if(target.dataset.weight!==undefined){const m=meals[Number(target.dataset.weight)];if(m){m.weight=Number(target.value);chosen=null;render();}}
      else if(target.dataset.skip!==undefined){const m=meals[Number(target.dataset.skip)];if(m){m.skip=target.checked;chosen=null;render();}}
    });
    root.querySelector('[data-choose]').addEventListener('click',()=>{
      const bag=meals.filter(m=>!m.skip).flatMap(m=>Array(m.weight).fill(m.id));
      if(!bag.length){chosen=null;render();return;}
      // Simple reproducible round-robin example, not MealDrift's selection logic.
      chosen=bag[(pickCount*3+1)%bag.length];pickCount+=1;render();
    });
    root.querySelector('[data-reset]').addEventListener('click',()=>{meals=initial.map(x=>({...x}));chosen=null;pickCount=0;render();});
    render();
    const selector=document.getElementById('p199-language');selector?.addEventListener('change',render);
    new MutationObserver(()=>{if(langSeen!==langNow())render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
