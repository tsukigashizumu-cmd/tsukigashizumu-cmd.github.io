/* Minpick R131 — website-only sample: time / category / priority, max three suggestions. No persistence or network calls. */
(() => {
  'use strict';
  const APP_ID='6781131521';
  const L={
    en:{eyebrow:'MINPICK · THE NEXT FEW MINUTES',badge:'INTERACTIVE WEBSITE EXAMPLE',title:'You have five minutes. Spend less of them deciding.',
      intro:'Pick the time you have. See at most three small things that fit. Filter further only when you want to. You decide whether to begin—or rest.',
      time:'How much time is available?',min:'min',category:'Category',all:'Everything',work:'Work',life:'Everyday',priority:'Priority',any:'Any priority',high:'High priority',
      suggestions:'Things that fit right now',count:'suggestions',choose:'Choose this',selected:'Your next small step',rest:'Not now. Rest instead',none:'No matching sample tasks. Try another filter.',
      picked:'You chose:',resting:'Rest is a valid choice. You do not have to fill every minute.',reset:'Reset website example',resetDone:'Website example restarted.',
      note:'Website-only example with fictional tasks and a simplified filter. This is not Minpick’s actual recommendation algorithm or app screen. Selecting a task here does not create, complete, or save a task. No account, network request or storage is used.',
      a:'Send a quick thank-you',b:'Drink some water',c:'Tidy one corner of your desk',d:'Write one sentence of a draft',e:'Take a short walk',f:'Sort a few receipts',g:'Check one pending issue'},
    ja:{eyebrow:'MINPICK · いま空いた数分',badge:'LP専用・操作デモ',title:'5分ある。何をするか迷う時間を減らそう。',
      intro:'今使える時間を選ぶだけ。収まりそうな用事を最大3つ表示します。必要なときだけカテゴリと優先度で絞る。始めるか、休むかは自分で決められます。',
      time:'今使える時間は？',min:'分',category:'カテゴリ',all:'すべて',work:'仕事',life:'日常',priority:'優先度',any:'指定なし',high:'高いものだけ',
      suggestions:'今できそうな候補',count:'件の候補',choose:'これを選ぶ',selected:'今日の小さな一歩',rest:'今は休む',none:'この条件に合うサンプルはありません。条件を変えてください。',
      picked:'選んだ用事：',resting:'休むのも一つの選択。空いた時間を全部埋めなくても大丈夫。',reset:'LPデモだけ最初に戻す',resetDone:'LPデモを初期化しました。',
      note:'架空の用事を使うLP専用の簡易デモです。Minpick本体の画面や候補の選定アルゴリズムを再現したものではありません。ここで選んでも実際の用事は登録・完了・保存されません。外部通信や個人情報の収集もありません。',
      a:'短いお礼を送る',b:'水を一杯飲む',c:'机の一角を片付ける',d:'下書きを一文だけ書く',e:'少し散歩する',f:'レシートを整理する',g:'気になっていたことを一件確認する'},
    ar:{eyebrow:'MINPICK · بضع دقائق متاحة',badge:'تجربة تفاعلية على الموقع',title:'لديك خمس دقائق. اقضِ وقتًا أقل في الاختيار.',
      intro:'اختر الوقت المتاح لترى حتى ثلاث مهام صغيرة تناسبه. يمكنك تضييق القائمة حسب الفئة والأولوية إذا أردت. أنت من يقرر البدء أو الراحة.',
      time:'كم دقيقة لديك؟',min:'دقائق',category:'الفئة',all:'الكل',work:'العمل',life:'الحياة اليومية',priority:'الأولوية',any:'جميع الأولويات',high:'الأولوية العالية فقط',
      suggestions:'مهام قد تناسب وقتك',count:'اقتراحات',choose:'اختر هذه',selected:'خطوتك الصغيرة التالية',rest:'ليس الآن، سأرتاح',none:'لا توجد مهام تجريبية تطابق الخيارات. غيّر المرشحات.',
      picked:'لقد اخترت:',resting:'الراحة اختيار صحيح أيضًا. لا يلزم ملء كل دقيقة.',reset:'إعادة المثال على الموقع فقط',resetDone:'أعيد المثال إلى البداية.',
      note:'هذا مثال توضيحي على الموقع بمهام خيالية وترشيح مبسط، وليس واجهة Minpick الحقيقية أو خوارزمية الاقتراحات فيه. لا يسجل الاختيار مهمة ولا يكملها ولا يحفظها. لا توجد اتصالات خارجية أو تخزين للبيانات.',
      a:'أرسل كلمة شكر قصيرة',b:'اشرب بعض الماء',c:'رتّب زاوية من المكتب',d:'اكتب جملة واحدة',e:'تمشَّ قليلاً',f:'رتّب بضعة إيصالات',g:'راجع أمرًا معلقًا واحدًا'}
  };
  const TASKS=[
    {key:'a',duration:3,category:'work',priority:'medium'},
    {key:'b',duration:3,category:'life',priority:'low'},
    {key:'c',duration:5,category:'work',priority:'high'},
    {key:'d',duration:5,category:'work',priority:'high'},
    {key:'e',duration:10,category:'life',priority:'medium'},
    {key:'f',duration:10,category:'life',priority:'high'},
    {key:'g',duration:10,category:'work',priority:'high'}
  ];
  function language(){
    const value=String(document.getElementById('p199-language')?.value||document.documentElement.lang||'en').toLowerCase().split(/[-_]/)[0];
    return L[value]?value:'en';
  }
  function mount(){
    if(document.getElementById('tsz-mp131')||!document.body)return;
    const appId=document.body.dataset.p199Id||document.body.dataset.p19AppId||'';
    if(appId&&appId!==APP_ID)return;
    if(!appId&&!document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor=document.getElementById('tsz-mp97')||document.querySelector('[id*="minpick-r97"]')||document.getElementById('tsz-mp56')||document.getElementById('overview');
    const main=document.querySelector('main');if(!anchor&&!main)return;
    const root=document.createElement('section');root.id='tsz-mp131';root.dataset.demo='minpick-website-only-task-filter';
    root.innerHTML=`<header class="mp131-top"><span data-label="eyebrow"></span><span class="mp131-badge" data-label="badge"></span></header>
    <h2 data-label="title"></h2><p class="mp131-intro" data-label="intro"></p>
    <div class="mp131-layout"><div class="mp131-controls">
      <fieldset class="mp131-field"><legend data-label="time"></legend><div class="mp131-toggle" data-times></div></fieldset>
      <fieldset class="mp131-field"><legend data-label="category"></legend><div class="mp131-toggle" data-categories></div></fieldset>
      <fieldset class="mp131-field"><legend data-label="priority"></legend><div class="mp131-toggle" data-priorities></div></fieldset>
      <button type="button" class="mp131-rest" data-rest data-label="rest"></button>
    </div><div class="mp131-results"><div class="mp131-result-head"><h3 data-label="suggestions"></h3><span class="mp131-count" data-count></span></div>
      <div data-cards class="mp131-cards"></div><div class="mp131-selected" data-selection aria-live="polite"></div>
      <button type="button" class="mp131-reset" data-reset data-label="reset"></button>
    </div></div><p class="mp131-footnote" data-label="note"></p>`;
    if(anchor)anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    let duration=5, category='all', priority='any', selected=null, resting=false, languageUsed='';
    const times=root.querySelector('[data-times]'),cats=root.querySelector('[data-categories]'),priorities=root.querySelector('[data-priorities]');
    const cards=root.querySelector('[data-cards]'),selection=root.querySelector('[data-selection]');
    function group(host,items,current,name,labels){
      host.replaceChildren();items.forEach(([value,label])=>{
        const button=document.createElement('button');button.type='button';button.dataset[name]=value;
        button.setAttribute('aria-pressed',String(value===current));button.className='mp131-option';button.textContent=labels[label]||label;
        host.append(button);
      });
    }
    function render(){
      const lang=language(),t=L[lang];languageUsed=lang;
      root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-label]').forEach(el=>{el.textContent=t[el.dataset.label]||''});
      group(times,[[3,'3'],[5,'5'],[10,'10']].map(([n,label])=>[n,label+' '+t.min]),duration,'minutes',{});
      group(cats,[['all','all'],['work','work'],['life','life']],category,'category',t);
      group(priorities,[['any','any'],['high','high']],priority,'priority',t);
      const filtered=TASKS.filter(x=>x.duration<=duration && (category==='all'||x.category===category) && (priority==='any'||x.priority==='high')).slice(0,3);
      root.dataset.duration=String(duration);root.dataset.category=category;root.dataset.priority=priority;root.dataset.count=String(filtered.length);
      cards.replaceChildren();
      if(!filtered.length){const msg=document.createElement('p');msg.className='mp131-empty';msg.textContent=t.none;cards.append(msg)}
      for(const task of filtered){
        const article=document.createElement('article');article.className='mp131-card';
        const detail=document.createElement('div');const name=document.createElement('strong');name.textContent=t[task.key];
        const meta=document.createElement('span');meta.textContent=task.duration+' '+t.min+' · '+t[task.category];detail.append(name,meta);
        const button=document.createElement('button');button.type='button';button.dataset.pick=task.key;button.textContent=t.choose;
        article.append(detail,button);cards.append(article);
      }
      root.querySelector('[data-count]').textContent=filtered.length+' '+t.count;
      root.dataset.selected=selected||'';root.dataset.resting=String(resting);
      selection.replaceChildren();
      if(resting){selection.textContent=t.resting;selection.classList.add('mp131-is-resting')}
      else if(selected){selection.textContent=t.picked+' '+t[selected];selection.classList.remove('mp131-is-resting')}
      else{selection.textContent='';selection.classList.remove('mp131-is-resting')}
    }
    root.addEventListener('click',event=>{
      const btn=event.target.closest('button');if(!btn||!root.contains(btn))return;
      if(btn.hasAttribute('data-minutes')){duration=Number(btn.dataset.minutes);selected=null;resting=false}
      else if(btn.hasAttribute('data-category')){category=btn.dataset.category;selected=null;resting=false}
      else if(btn.hasAttribute('data-priority')){priority=btn.dataset.priority;selected=null;resting=false}
      else if(btn.hasAttribute('data-pick')){selected=btn.dataset.pick;resting=false}
      else if(btn.hasAttribute('data-rest')){resting=true;selected=null}
      else if(btn.hasAttribute('data-reset')){duration=5;category='all';priority='any';selected=null;resting=false}
      else return;
      render();
    });
    render();
    document.getElementById('p199-language')?.addEventListener('change',()=>render());
    new MutationObserver(()=>{if(languageUsed!==language())render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
