/* Minpick R159: LP-only category and priority filters for tasks fitting available minutes. */
(() => {
  'use strict';
  const APP_ID='6781131521';
  const TASKS=[
    {id:'reply',minute:3,cat:'work',priority:'high'},
    {id:'read',minute:5,cat:'work',priority:'medium'},
    {id:'schedule',minute:5,cat:'life',priority:'medium'},
    {id:'tidy',minute:5,cat:'life',priority:'low'},
    {id:'organize',minute:10,cat:'work',priority:'medium'},
    {id:'stretch',minute:3,cat:'life',priority:'low'}
  ];
  const LANG={
    ja:{eyebrow:'A FEW MINUTES. ONE CHOICE.',tag:'LP専用・操作デモ',title:'5分ある。何をするか、もう迷わない。',lead:'時間に合う用事を見つける。必要な時だけ、カテゴリーや優先度で候補を絞る。',minute:'いま使える時間',category:'カテゴリー',priority:'優先度',all:'すべて',work:'仕事',life:'暮らし',medium:'中以上',high:'高のみ',options:'見つかった候補',upTo:'表示は最大3件',found:'該当する用事',selected:'選んだ用事',nothing:'該当する用事はありません。時間や絞り込みを変えてください。',choose:'これを選ぶ',picked:'選びました',reset:'見本に戻す',min:'分',priorities:{high:'高',medium:'中',low:'低'},tasks:{reply:'短い返信を送る',read:'資料の冒頭を読む',schedule:'明日の予定を確認',tidy:'机を片づける',organize:'メモを整理する',stretch:'軽くストレッチ'},note:'この画面の用事と優先度は架空の見本です。Minpick本体の保存内容や候補順位を再現するものではありません。時間・カテゴリー・優先度で絞る操作だけを体験できます。保存、通知、送信は行いません。休むことを選んでもかまいません。'},
    en:{eyebrow:'A FEW MINUTES. ONE CHOICE.',tag:'INTERACTIVE LP EXAMPLE',title:'Five spare minutes. Less time spent deciding.',lead:'See what fits the minutes you have. Narrow the list by category or priority only if you want to.',minute:'Time available now',category:'Category',priority:'Priority',all:'All',work:'Work',life:'Everyday',medium:'Medium +',high:'High only',options:'Tasks that fit',upTo:'Up to 3 shown',found:'Matching tasks',selected:'Your choice',nothing:'No tasks match. Try more time or a different filter.',choose:'Choose this',picked:'Chosen',reset:'Restore sample',min:'min',priorities:{high:'High',medium:'Medium',low:'Low'},tasks:{reply:'Send a short reply',read:'Read the opening page',schedule:'Check tomorrow’s plan',tidy:'Tidy the desk',organize:'Sort my notes',stretch:'Take a short stretch'},note:'These tasks and priorities are invented for this LP. This is not Minpick’s actual stored list or task-ranking algorithm. It demonstrates filtering by available time, category, and priority. Nothing is saved, sent, or scheduled. Choosing to rest is also fine.'},
    ar:{eyebrow:'دقائق قليلة. اختيار واحد.',tag:'مثال تفاعلي للموقع',title:'لديك خمس دقائق. قلّل وقت الاختيار.',lead:'اعرض المهام التي تناسب وقتك، ثم صفِّها حسب الفئة أو الأولوية إذا احتجت.',minute:'الوقت المتاح الآن',category:'الفئة',priority:'الأولوية',all:'الكل',work:'العمل',life:'الحياة اليومية',medium:'متوسطة فأعلى',high:'مرتفعة فقط',options:'المهام المناسبة',upTo:'عرض ٣ كحد أقصى',found:'المهام المطابقة',selected:'اختيارك',nothing:'لا توجد مهام مطابقة. غيّر المدة أو المرشحات.',choose:'اختر هذه',picked:'تم الاختيار',reset:'إعادة المثال',min:'دقائق',priorities:{high:'مرتفعة',medium:'متوسطة',low:'منخفضة'},tasks:{reply:'إرسال رد قصير',read:'قراءة الصفحة الأولى',schedule:'مراجعة خطة الغد',tidy:'ترتيب المكتب',organize:'تنظيم الملاحظات',stretch:'تمدد قصير'},note:'هذه مهام وأولويات افتراضية لهذا الموقع فقط. لا تمثل قوائم تطبيق Minpick الفعلية أو خوارزمية ترتيب المهام. الهدف هو تجربة تصفية المهام بالوقت والفئة والأولوية. لا يتم حفظ أو إرسال أي شيء أو جدولة إشعارات. يمكنك اختيار الراحة أيضاً.'}
  };
  const langNow=()=>{const raw=String(document.getElementById('p199-language')?.value||document.documentElement.lang||'en').toLowerCase().split(/[-_]/)[0];return LANG[raw]?raw:'en'};
  function mount(){
    if(document.getElementById('tsz-mp159'))return;
    const body=document.body;if(!body)return;
    const appId=body.dataset.p199Id||body.dataset.p19AppId||'';
    if(appId&&appId!==APP_ID)return;
    if(!appId&&!document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor=document.getElementById('tsz-mp131')||document.getElementById('tsz-minpick-r131')||document.getElementById('overview');
    const main=document.querySelector('main');if(!anchor&&!main)return;
    const root=document.createElement('section');root.id='tsz-mp159';root.dataset.demo='minpick-filter-lp-only';root.setAttribute('aria-label','Minpick category and priority example');
    root.innerHTML=`<div class="mp159-head"><span data-t="eyebrow" class="mp159-eyebrow"></span><span data-t="tag" class="mp159-tag"></span></div><h2 data-t="title"></h2><p class="mp159-lead" data-t="lead"></p><div class="mp159-grid"><div class="mp159-panel"><div class="mp159-field"><span class="mp159-label" data-t="minute"></span><div class="mp159-buttons" data-minutes></div></div><div class="mp159-field"><span class="mp159-label" data-t="category"></span><div class="mp159-buttons" data-categories></div></div><div class="mp159-field"><span class="mp159-label" data-t="priority"></span><div class="mp159-buttons" data-priorities></div></div><div class="mp159-snapshot"><span data-t="found"></span><strong data-matches></strong></div><button type="button" class="mp159-reset" data-reset></button></div><div class="mp159-panel mp159-results"><div class="mp159-results-top"><div><p class="mp159-label" data-t="options"></p><span class="mp159-cap" data-t="upTo"></span></div><strong class="mp159-count" data-count></strong></div><div class="mp159-cards" data-cards aria-live="polite"></div><p class="mp159-picked" data-selected aria-live="polite"></p></div></div><p class="mp159-note" data-t="note"></p>`;
    if(anchor)anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    let minutes=5,cat='all',pri='all',picked='',seen='';
    function options(key,values,labels,current){
      const c=root.querySelector(`[data-${key}]`);c.replaceChildren();
      values.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.className='mp159-opt';b.dataset[{minutes:'minute',categories:'cat',priorities:'pri'}[key]]=String(v);b.setAttribute('aria-pressed',String(v===current));b.textContent=labels[i];b.addEventListener('click',()=>{if(key==='minutes')minutes=Number(v);if(key==='categories')cat=v;if(key==='priorities')pri=v;picked='';render()});c.appendChild(b)});
    }
    function matching(){const rank={low:1,medium:2,high:3};return TASKS.filter(task=>task.minute<=minutes&&(cat==='all'||task.cat===cat)&&(pri==='all'||(pri==='medium'&&rank[task.priority]>=2)||(pri==='high'&&task.priority==='high')))}
    function render(){
      const lang=langNow(),t=LANG[lang];seen=lang;root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.dataset.t]||''});
      options('minutes',[3,5,10],[`3 ${t.min}`,`5 ${t.min}`,`10 ${t.min}`],minutes);
      options('categories',['all','work','life'],[t.all,t.work,t.life],cat);
      options('priorities',['all','medium','high'],[t.all,t.medium,t.high],pri);
      const found=matching();const shown=found.slice(0,3);
      root.dataset.matches=String(found.length);root.dataset.shown=String(shown.length);root.dataset.minutes=String(minutes);root.dataset.cat=cat;root.dataset.pri=pri;root.dataset.picked=picked;
      root.querySelector('[data-matches]').textContent=String(found.length);root.querySelector('[data-count]').textContent=`${shown.length}/3`;
      const cards=root.querySelector('[data-cards]');cards.replaceChildren();
      if(!shown.length){const empty=document.createElement('p');empty.className='mp159-empty';empty.textContent=t.nothing;cards.appendChild(empty)}
      shown.forEach(task=>{const card=document.createElement('article');card.className='mp159-card';card.dataset.task=task.id;
        const top=document.createElement('div');top.className='mp159-card-top';
        const name=document.createElement('strong');name.className='mp159-task';name.textContent=t.tasks[task.id];
        const meta=document.createElement('span');meta.className='mp159-meta';meta.textContent=`${task.minute} ${t.min} · ${task.cat==='work'?t.work:t.life} · ${t.priorities[task.priority]}`;
        top.append(name,meta);const b=document.createElement('button');b.type='button';b.className='mp159-choose';b.dataset.choose=task.id;b.setAttribute('aria-pressed',String(picked===task.id));b.textContent=picked===task.id?t.picked:t.choose;b.addEventListener('click',()=>{picked=task.id;render()});
        card.append(top,b);cards.appendChild(card)});
      root.querySelector('[data-selected]').textContent=picked?`${t.selected}: ${t.tasks[picked]}`:'';
      root.querySelector('[data-reset]').textContent=t.reset;
    }
    root.querySelector('[data-reset]').addEventListener('click',()=>{minutes=5;cat='all';pri='all';picked='';render()});
    document.getElementById('p199-language')?.addEventListener('change',render);
    new MutationObserver(()=>{if(seen!==langNow())render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
