/* TSZ LP R95 — Kizami: chosen-time mine shaft illustration. No storage, timers, telemetry or network. */
(()=>{
  'use strict';
  const ID='tsz-kizami-r95';
  const WORDS={
    ja:{kicker:'KIZAMI · YOUR CHOSEN TIME',title:'誰かのためじゃない、15分。',intro:'今日、自分で選んだ時間はありましたか。ほんの少しでも構いません。その時間を坑道の一本の線に足してみてください。',choose:'時間の種類',minutes:'何分、選びましたか',add:'この時間を刻む',reset:'最初の例に戻す',record:'自分で選んだ時間',total:'選んだ時間',unit:'分',count:'件の時間',shaft:'時間が下へ積み重なる模式図',zero:'まだ刻まれていません',read:'読書',walk:'散歩',rest:'休憩',play:'好きなこと',notice:'目標も連続記録もありません。',demo:'LPの説明用模式図です。実アプリの画面・距離換算・保存機能を再現したものではありません。入力内容はページを離れると消え、送信されません。',bottom:'あなたが選んだ時間だけ、下へ。',limit:'このデモでは最大12件まで追加できます。',insert:'時間を追加しました。',examples:'最初の2件はサンプルです。'},
    en:{kicker:'KIZAMI · YOUR CHOSEN TIME',title:'Fifteen minutes that were yours.',intro:'Was there a moment today you chose for yourself? Even a short one counts. Add that time to the single shaft below.',choose:'A moment you chose',minutes:'How many minutes?',add:'Keep this moment',reset:'Restore the example',record:'Your chosen moments',total:'Time you chose',unit:'min',count:'moments',shaft:'Illustration of time accumulating downward',zero:'Nothing added yet',read:'Reading',walk:'Walking',rest:'Resting',play:'Something you love',notice:'No goals. No streaks.',demo:'An LP-only illustration, not an actual app screen, distance conversion, or saved record. Your entries disappear when you leave and are not sent anywhere.',bottom:'Only the time you chose adds depth.',limit:'This demo shows up to 12 entries.',insert:'A moment was added.',examples:'The first two moments are examples.'},
    ar:{kicker:'KIZAMI · وقت اخترته أنت',title:'خمس عشرة دقيقة كانت لك.',intro:'هل كان لديك اليوم وقت اخترته لنفسك؟ حتى الدقائق القليلة تستحق أن تتذكرها. أضف تلك اللحظة إلى هذا الممر المتجه إلى الأسفل.',choose:'اللحظة التي اخترتها',minutes:'كم دقيقة؟',add:'أضف هذه اللحظة',reset:'استعادة المثال',record:'لحظات اخترتها',total:'الوقت الذي اخترته',unit:'دقيقة',count:'لحظات',shaft:'رسم توضيحي لوقت يتراكم إلى الأسفل',zero:'لم تتم إضافة شيء',read:'قراءة',walk:'مشي',rest:'راحة',play:'شيء تحبه',notice:'لا أهداف ولا سلاسل إنجاز.',demo:'هذه صورة تفاعلية توضيحية للصفحة فقط، وليست شاشة التطبيق أو تحويلًا حقيقيًا للمسافة أو سجلًا محفوظًا. لا يتم حفظ إدخالاتك أو إرسالها.',bottom:'وقتك المختار وحده يزيد العمق.',limit:'يمكن لهذا المثال عرض 12 لحظة كحد أقصى.',insert:'تمت إضافة اللحظة.',examples:'اللحظتان الأوليان مثالان فقط.'}
  };
  const KINDS=['read','walk','rest','play'];
  const TIMES=[5,15,30,60];
  const initial=()=>[{kind:'read',min:15},{kind:'walk',min:10}];
  const locale=()=>{const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en';};
  function mount(){
    if(document.getElementById(ID))return;
    const host=document.querySelector('main')||document.body;
    if(!host)return;
    const root=document.createElement('section');root.id=ID;
    root.innerHTML=`<div class="kz95-layout"><div class="kz95-copy"><p class="kz95-kicker" data-kz95="kicker"></p><h2 data-kz95="title"></h2><p class="kz95-intro" data-kz95="intro"></p><div class="kz95-controls"><p class="kz95-label" data-kz95="choose"></p><div class="kz95-kinds" id="kz95-kinds" role="group"></div><p class="kz95-label" data-kz95="minutes"></p><div class="kz95-times" id="kz95-times" role="group"></div><button class="kz95-add" id="kz95-add" type="button" data-kz95="add"></button></div><div class="kz95-actions"><button class="kz95-reset" id="kz95-reset" type="button" data-kz95="reset"></button><p class="kz95-notice" data-kz95="notice"></p></div><p class="kz95-disclaimer" data-kz95="demo"></p></div><div class="kz95-art"><div class="kz95-art-top"><span class="kz95-caption" data-kz95="total"></span><strong class="kz95-total" id="kz95-total" aria-live="polite"></strong><span class="kz95-counter" id="kz95-counter"></span></div><div class="kz95-ground"><span class="kz95-surface">◈</span><span class="kz95-horizon"></span><span class="kz95-earth-text" data-kz95="shaft"></span></div><div class="kz95-depth" id="kz95-depth" role="img"></div><div class="kz95-end" data-kz95="bottom"></div><h3 class="kz95-record-label" data-kz95="record"></h3><ol class="kz95-records" id="kz95-records"></ol><p class="kz95-examples" data-kz95="examples"></p><p id="kz95-live" class="kz95-sr" role="status" aria-live="polite"></p></div></div>`;
    host.append(root);
    let selectedKind='rest', selectedMin=15, records=initial();
    const words=()=>WORDS[locale()];
    const kinds=root.querySelector('#kz95-kinds'),times=root.querySelector('#kz95-times');
    const depth=root.querySelector('#kz95-depth'),recordList=root.querySelector('#kz95-records');
    const makeButton=(name,fn)=>{const b=document.createElement('button');b.type='button';b.className=name;b.addEventListener('click',fn);return b;};
    const kindButtons=KINDS.map(kind=>{const b=makeButton('kz95-kind',()=>{selectedKind=kind;paint();});b.dataset.kind=kind;kinds.append(b);return b;});
    const timeButtons=TIMES.map(n=>{const b=makeButton('kz95-time',()=>{selectedMin=n;paint();});b.dataset.time=String(n);times.append(b);return b;});
    function paint(){
      const lang=locale(),w=words();root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-kz95]').forEach(el=>el.textContent=w[el.dataset.kz95]||'');
      root.setAttribute('aria-label',w.shaft);
      kindButtons.forEach((b,i)=>{b.textContent=w[KINDS[i]];b.setAttribute('aria-pressed',String(KINDS[i]===selectedKind));});
      timeButtons.forEach((b,i)=>{b.textContent=`${TIMES[i]} ${w.unit}`;b.setAttribute('aria-pressed',String(TIMES[i]===selectedMin));});
      const total=records.reduce((a,r)=>a+r.min,0);
      root.querySelector('#kz95-total').textContent=`${total} ${w.unit}`;
      root.querySelector('#kz95-counter').textContent=`${records.length} ${w.count}`;
      depth.replaceChildren();recordList.replaceChildren();
      const visual=records.slice().reverse();
      if(!visual.length){const empty=document.createElement('p');empty.className='kz95-empty';empty.textContent=w.zero;depth.append(empty);}
      visual.forEach((r,i)=>{const bar=document.createElement('div');bar.className='kz95-stratum';bar.style.height=`${Math.min(100,Math.max(17,r.min*1.55))}px`;bar.style.setProperty('--kz95-shift',`${(i*37)%100}%`);const dot=document.createElement('span');dot.className='kz95-stratum-marker';dot.textContent='✦';bar.append(dot);const label=document.createElement('span');label.className='kz95-stratum-label';label.textContent=`${w[r.kind]} · ${r.min} ${w.unit}`;bar.append(label);depth.append(bar);});
      records.forEach(r=>{const li=document.createElement('li');const name=document.createElement('span');name.textContent=w[r.kind];const amount=document.createElement('strong');amount.textContent=`${r.min} ${w.unit}`;li.append(name,amount);recordList.append(li);});
      depth.setAttribute('aria-label',`${w.shaft}: ${total} ${w.unit}, ${records.length} ${w.count}`);
      const max=records.length>=12;root.querySelector('#kz95-add').disabled=max;
    }
    root.querySelector('#kz95-add').addEventListener('click',()=>{const w=words();if(records.length>=12){root.querySelector('#kz95-live').textContent=w.limit;return;}records.push({kind:selectedKind,min:selectedMin});paint();root.querySelector('#kz95-live').textContent=w.insert;});
    root.querySelector('#kz95-reset').addEventListener('click',()=>{records=initial();selectedKind='rest';selectedMin=15;paint();root.querySelector('#kz95-live').textContent='';});
    new MutationObserver(changes=>{if(changes.some(x=>x.attributeName==='lang'))paint();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    paint();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
