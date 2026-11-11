/* Kizami R158: LP-only no-streak week example, not app record storage/depth algorithm. */
(() => {
  'use strict';
  const APP_ID='6795788626';
  const SAMPLE=[15,0,35,0,20,0,10];
  const LANG={
    ja:{eyebrow:'THE DAYS YOU CHOSE',badge:'LP専用・操作デモ',title:'空白の日があっても、積み重ねた時間は消えない。',lead:'記録がない日を、失敗にしない。好きなことを選んだ時間だけ、静かに積み重なっていく。',week:'この1週間の見本',days:['月','火','水','木','金','土','日'],empty:'空白',recorded:'記録あり',choose:'選んだ日の時間を変更',zero:'記録なし',min:'分',undo:'直前の変更を戻す',reset:'見本に戻す',total:'選んだ時間の合計',active:'時間を残した日',blank:'空白の日',quiet:'空白の日があっても、合計はゼロに戻りません。',trace:'時間の軌跡（説明用）',symbol:'積み重ねのイメージ',status:'この週に残った時間',note:'LP専用の架空の1週間です。縦の表示は累積時間のイメージであり、Kizami本体の坑道の深さ換算・実画面とは異なります。記録の変更・UndoはこのWeb見本だけの操作です。保存・送信は行いません。連続記録の達成も求めません。'},
    en:{eyebrow:'THE DAYS YOU CHOSE',badge:'INTERACTIVE LP EXAMPLE',title:'A blank day does not erase the time you chose.',lead:'A day without a record is not a failure. The moments you chose for yourself still add up, quietly.',week:'An example week',days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],empty:'Blank',recorded:'Kept',choose:'Change time on the selected day',zero:'No entry',min:'min',undo:'Undo last change',reset:'Restore sample',total:'Time you chose',active:'Days with moments',blank:'Days left blank',quiet:'Even with blank days, your total never resets to zero.',trace:'A visual trace (example only)',symbol:'An illustration of time kept',status:'Time kept in this sample week',note:'An invented week for this LP. The line is a visual illustration, not Kizami’s actual mine-shaft depth conversion or screen. Editing a day and undoing are website demo actions only. Nothing is stored or sent. No streak or goal is required.'},
    ar:{eyebrow:'الأيام التي اخترتها',badge:'مثال تفاعلي للموقع',title:'اليوم الفارغ لا يمحو الوقت الذي اخترته.',lead:'عدم تسجيل يوم ليس فشلاً. تظل اللحظات التي اخترتها لنفسك متراكمة بهدوء.',week:'أسبوع توضيحي',days:['الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت','الأحد'],empty:'فارغ',recorded:'مسجّل',choose:'غيّر وقت اليوم المحدد',zero:'بلا تسجيل',min:'دقيقة',undo:'تراجع عن التغيير',reset:'استعادة المثال',total:'وقتك الذي اخترته',active:'أيام بها وقت',blank:'أيام فارغة',quiet:'حتى مع الأيام الفارغة لا يعود مجموع وقتك إلى الصفر.',trace:'أثر الوقت (توضيحي)',symbol:'صورة رمزية للوقت المتراكم',status:'الوقت المحفوظ في هذا الأسبوع',note:'أسبوع افتراضي مخصص لهذه الصفحة. الخط رسم توضيحي ولا يمثل تحويل عمق المنجم أو واجهة تطبيق Kizami الفعلية. تعديل اليوم والتراجع عمليتان في هذا المثال فقط. لا تحفظ البيانات ولا ترسل. لا توجد سلسلة أيام أو أهداف مفروضة.'}
  };
  const langNow=()=>{
    const raw=String(document.getElementById('p199-language')?.value||document.documentElement.lang||'en').toLowerCase().split(/[-_]/)[0];
    return LANG[raw]?raw:'en';
  };
  function mount(){
    if(document.getElementById('tsz-kz158'))return;
    const b=document.body;if(!b)return;
    const id=b.dataset.p199Id||b.dataset.p19AppId||'';
    if(id&&id!==APP_ID)return;
    if(!id&&!document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor=document.getElementById('tsz-kz129')||document.getElementById('tsz-kz95')||document.getElementById('overview');
    const main=document.querySelector('main');if(!anchor&&!main)return;
    const root=document.createElement('section');root.id='tsz-kz158';root.dataset.demo='kizami-no-streak-lp-only';
    root.setAttribute('aria-label','Kizami no-streak week example');
    root.innerHTML=`<div class="kz158-head"><span class="kz158-eyebrow" data-t="eyebrow"></span><span class="kz158-pill" data-t="badge"></span></div><h2 data-t="title"></h2><p class="kz158-lead" data-t="lead"></p><div class="kz158-columns"><div class="kz158-card"><p class="kz158-card-title" data-t="week"></p><div class="kz158-week" data-week aria-label="Days of sample week"></div><div class="kz158-actions"><span class="kz158-action-label" data-t="choose"></span><div class="kz158-options" data-choices></div><div class="kz158-actions-bottom"><button type="button" class="kz158-secondary" data-undo></button><button type="button" class="kz158-secondary" data-reset></button></div></div></div><div class="kz158-card kz158-right"><div><p class="kz158-card-title" data-t="status"></p><div class="kz158-meta"><div><strong class="kz158-number" data-total></strong><span class="kz158-sub" data-t="total"></span></div><div><strong class="kz158-number" data-active></strong><span class="kz158-sub" data-t="active"></span></div></div><div class="kz158-quiet" data-t="quiet" role="status"></div></div><div><div class="kz158-trace"><div class="kz158-track" aria-hidden="true"><div class="kz158-fill" data-fill></div></div><div class="kz158-trace-labels"><span data-t="trace"></span><strong data-depth></strong><span data-t="symbol"></span></div></div></div></div></div><p class="kz158-note" data-t="note"></p>`;
    if(anchor)anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    let times=[...SAMPLE],selected=3,history=[],seen='';
    const total=()=>times.reduce((sum,n)=>sum+n,0);
    function render(){
      const lang=langNow(),t=LANG[lang];seen=lang;root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(el=>el.textContent=t[el.dataset.t]||'');
      const days=root.querySelector('[data-week]');days.replaceChildren();
      times.forEach((n,i)=>{
        const button=document.createElement('button');button.type='button';button.className='kz158-day';button.dataset.day=String(i);button.dataset.empty=String(n===0);button.setAttribute('aria-pressed',String(i===selected));button.setAttribute('aria-label',`${t.days[i]}: ${n===0?t.empty:n+' '+t.min}`);
        const day=document.createElement('span');day.className='kz158-day-name';day.textContent=t.days[i];
        const value=document.createElement('span');value.className='kz158-day-value';value.textContent=n?`${n}`:'—';
        const caption=document.createElement('span');caption.className='kz158-day-caption';caption.textContent=n?t.min:t.empty;
        button.append(day,value,caption);button.addEventListener('click',()=>{selected=i;render()});days.append(button);
      });
      const choices=root.querySelector('[data-choices]');choices.replaceChildren();
      [0,10,25,45].forEach(n=>{
        const button=document.createElement('button');button.type='button';button.className='kz158-choice';button.dataset.setMinute=String(n);button.setAttribute('aria-pressed',String(times[selected]===n));button.textContent=n===0?t.zero:`${n} ${t.min}`;
        button.addEventListener('click',()=>{if(times[selected]!==n){history.push([...times]);times[selected]=n}render()});choices.append(button);
      });
      const sum=total(),active=times.filter(n=>n>0).length;
      root.querySelector('[data-total]').textContent=`${sum} ${t.min}`;
      root.querySelector('[data-active]').textContent=`${active} / 7`;
      root.querySelector('[data-depth]').textContent=`${sum} ${t.min}`;
      root.querySelector('[data-fill]').style.height=`${Math.min(100,sum/180*100)}%`;
      root.querySelector('[data-undo]').textContent=t.undo;root.querySelector('[data-undo]').disabled=!history.length;
      root.querySelector('[data-reset]').textContent=t.reset;
      root.dataset.total=String(sum);root.dataset.active=String(active);root.dataset.blank=String(7-active);root.dataset.selected=String(selected);
    }
    root.querySelector('[data-undo]').addEventListener('click',()=>{if(history.length){times=history.pop();render()}});
    root.querySelector('[data-reset]').addEventListener('click',()=>{times=[...SAMPLE];selected=3;history=[];render()});
    document.getElementById('p199-language')?.addEventListener('change',render);
    new MutationObserver(()=>{if(seen!==langNow())render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
