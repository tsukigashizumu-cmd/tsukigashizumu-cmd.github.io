/* R306 Minpick: LP-only quick activity picker; no analytics, persistence or external calls. */
(function(){'use strict';
  const ID='tsz-minpick-r306';
  if(document.getElementById(ID))return;
  const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Minpick quick choice demo');
  const parent=document.querySelector('main#p199-content')||document.querySelector('main')||document.body;
  const hero=parent.querySelector('section#top');
  if(hero && hero.parentNode===parent){hero.insertAdjacentElement('afterend',root);}else{parent.appendChild(root);}
  root.innerHTML=`<div class="mp-shell"><div class="mp-top"><div><p class="mp-eyebrow">MINPICK / ONE SMALL START</p><h2 data-mp="title"></h2><p class="mp-sub" data-mp="subtitle"></p></div><div class="mp-lang" aria-label="Demo language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></div><p class="mp-step-label" data-mp="timeLabel"></p><div class="mp-times"><button class="mp-pill" type="button" data-min="3">3 min</button><button class="mp-pill" type="button" data-min="5">5 min</button><button class="mp-pill" type="button" data-min="10">10 min</button></div><p class="mp-step-label" data-mp="typeLabel"></p><div class="mp-types"><button type="button" class="mp-pill" data-type="any"></button><button type="button" class="mp-pill" data-type="body"></button><button type="button" class="mp-pill" data-type="desk"></button><button type="button" class="mp-pill" data-type="mind"></button></div><div class="mp-grid"><div class="mp-panel"><p class="mp-card-caption" data-mp="suggested"></p><h3 class="mp-task" data-mp="task"></h3><p class="mp-first" data-mp="first"></p><div class="mp-actions"><button type="button" class="mp-primary" data-action="start"></button><button type="button" class="mp-secondary" data-action="another"></button></div></div><div class="mp-panel"><p class="mp-card-caption" data-mp="timerLabel"></p><div class="mp-meter" data-mp="clock" aria-live="off">05:00</div><div class="mp-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span class="mp-fill"></span></div><p class="mp-state" data-mp="state" aria-live="polite"></p><div class="mp-actions"><button type="button" class="mp-secondary" data-action="pause"></button><button type="button" class="mp-secondary" data-action="reset"></button></div></div></div><div class="mp-foot"><span data-mp="disclaimer"></span><a href="https://apps.apple.com/us/app/id6781131521" target="_blank" rel="noopener noreferrer" data-mp="store"></a></div></div>`;
  const phrases={
    en:{title:'Five minutes. One small start.',subtitle:'Stop using the time deciding. Choose your free minutes, find something small, and begin.',timeLabel:'01 / How much time do you have?',typeLabel:'02 / What feels doable?',types:{any:'Anything',body:'Move',desk:'Tidy',mind:'Reset'},suggested:'A SMALL NEXT STEP',timerLabel:'YOUR TIME',start:'Start now',another:'Another idea',pause:'Pause',resume:'Resume',reset:'Reset',ready:'Nothing to finish. Just choose a start.',running:'You have already begun.',paused:'Paused. Take your time.',finished:'Your time is yours. Nicely done.',first:'First step: ',disclaimer:'LP demo only. Nothing is saved or sent.',store:'View Minpick in the App Store'},
    ja:{title:'5分あれば、小さく始められる。',subtitle:'何をするか迷っているうちに終わる5分。今できることを一つ選んで、始めよう。',timeLabel:'01 / いま何分ある？',typeLabel:'02 / 何ならできそう？',types:{any:'おまかせ',body:'体を動かす',desk:'片づけ',mind:'ひと息'},suggested:'いまの小さな一歩',timerLabel:'残り時間',start:'これを始める',another:'別の候補',pause:'一時停止',resume:'再開',reset:'最初から',ready:'終わらせなくてもいい。まず一つ。',running:'もう始められた。',paused:'一時停止中。ゆっくりでいい。',finished:'自分で選んだ時間になった。',first:'最初の一歩：',disclaimer:'LP専用の体験。入力や結果は保存・送信しません。',store:'App StoreでMinpickを見る'},
    ar:{title:'خمس دقائق. بداية صغيرة.',subtitle:'لا تُضِع وقتك في الاختيار. اختر الدقائق المتاحة وابدأ بخطوة بسيطة.',timeLabel:'01 / كم دقيقة لديك؟',typeLabel:'02 / ماذا يناسبك الآن؟',types:{any:'أي شيء',body:'حركة',desk:'ترتيب',mind:'استراحة'},suggested:'خطوتك التالية',timerLabel:'الوقت المتبقي',start:'ابدأ الآن',another:'فكرة أخرى',pause:'إيقاف مؤقت',resume:'متابعة',reset:'إعادة',ready:'ليس عليك إنجاز كل شيء. فقط ابدأ.',running:'لقد بدأت بالفعل.',paused:'متوقف مؤقتًا.',finished:'هذا وقت اخترته لنفسك.',first:'الخطوة الأولى: ',disclaimer:'تجربة للصفحة فقط. لا يتم حفظ أو إرسال البيانات.',store:'عرض Minpick في App Store'}
  };
  const tasks=[
    {id:'stretch',type:'body',min:3,t:{en:['Stretch your shoulders','Roll your shoulders three times.'],ja:['肩をゆっくり伸ばす','肩を3回、ゆっくり回す。'],ar:['مدّد كتفيك','حرّك كتفيك ثلاث مرات.']}},
    {id:'water',type:'body',min:3,t:{en:['Drink a glass of water','Stand up and fill a glass.'],ja:['水を一杯飲む','立って、コップに水を注ぐ。'],ar:['اشرب كوب ماء','قف واملأ كوبًا بالماء.']}},
    {id:'breathe',type:'mind',min:3,t:{en:['Rest your eyes','Look away from the screen.'],ja:['画面から目を離す','窓の外をひと目見る。'],ar:['أرح عينيك','انظر بعيدًا عن الشاشة.']}},
    {id:'desk',type:'desk',min:3,t:{en:['Clear one corner','Put away just three things.'],ja:['机のすみを片づける','目につくものを3つだけ戻す。'],ar:['رتّب زاوية واحدة','أعِد ثلاثة أشياء فقط.']}},
    {id:'walk',type:'body',min:5,t:{en:['Take a tiny walk','Put your shoes on.'],ja:['少しだけ歩く','まず靴を履く。'],ar:['امشِ قليلًا','ابدأ بارتداء الحذاء.']}},
    {id:'message',type:'desk',min:5,t:{en:['Answer one message','Open just one conversation.'],ja:['返事を一件だけ書く','返信する相手を一人開く。'],ar:['أجب عن رسالة واحدة','افتح محادثة واحدة فقط.']}},
    {id:'note',type:'mind',min:5,t:{en:['Write one thought','Start with a single sentence.'],ja:['今の気持ちを一行書く','最初の一文だけ書く。'],ar:['اكتب فكرة واحدة','ابدأ بجملة واحدة.']}},
    {id:'shelf',type:'desk',min:10,t:{en:['Tidy a small shelf','Pick one shelf, not the room.'],ja:['棚の一段だけ整える','部屋全部でなく、一段だけ。'],ar:['رتّب رفًا صغيرًا','اختر رفًا واحدًا فقط.']}},
    {id:'reading',type:'mind',min:10,t:{en:['Read a few pages','Open a book to any page.'],ja:['本を数ページ読む','読みたい本を開く。'],ar:['اقرأ بضع صفحات','افتح كتابًا على أي صفحة.']}}
  ];
  const state={lang:'en',minutes:5,type:'any',index:0,id:null,remaining:300,active:false,paused:false,deadline:0};
  const text=(key,value)=>{const el=root.querySelector('[data-mp="'+key+'"]');if(el)el.textContent=value;};
  const strings=()=>phrases[state.lang];
  const choices=()=>tasks.filter(t=>t.min<=state.minutes&&(state.type==='any'||t.type===state.type));
  const current=()=>{const c=choices();return c.length?c[state.index%c.length]:tasks[0];};
  function cleanTimer(){if(state.id!==null){clearInterval(state.id);state.id=null;}state.active=false;state.paused=false;state.remaining=state.minutes*60;}
  function seconds(){return String(Math.floor(state.remaining/60)).padStart(2,'0')+':'+String(state.remaining%60).padStart(2,'0');}
  function render(){const p=strings(),task=current(),data=task.t[state.lang];
    root.lang=state.lang;root.dir=state.lang==='ar'?'rtl':'ltr';
    for(const key of ['title','subtitle','timeLabel','typeLabel','suggested','timerLabel','disclaimer','store'])text(key,p[key]);
    for(const action of ['start','another','pause','reset'])root.querySelector('[data-action="'+action+'"]').textContent=(action==='pause'&&state.paused)?p.resume:p[action];
    for(const [type,label] of Object.entries(p.types)){const el=root.querySelector('[data-type="'+type+'"]');if(el)el.textContent=label;}
    text('task',data[0]);text('first',p.first+data[1]);text('clock',seconds());
    text('state',!state.active?p.ready:state.paused?p.paused:p.running);
    
    root.querySelector('[data-action="pause"]').disabled=!state.active;
    root.querySelector('[data-action="start"]').disabled=state.active;
    root.querySelector('[data-action="another"]').disabled=state.active;
    root.querySelectorAll('[data-min]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.min)===state.minutes)));
    root.querySelectorAll('[data-type]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.type===state.type)));
    root.querySelectorAll('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===state.lang)));
    const percent=Math.round((1-state.remaining/(state.minutes*60))*100);root.querySelector('.mp-fill').style.width=percent+'%';root.querySelector('.mp-track').setAttribute('aria-valuenow',String(percent));
  }
  function tick(){if(!state.active||state.paused)return;state.remaining=Math.max(0,Math.ceil((state.deadline-Date.now())/1000));render();if(state.remaining===0){cleanTimer();state.remaining=0;render();text('state',strings().finished);}}
  root.addEventListener('click',event=>{
    const b=event.target.closest('button');if(!b||!root.contains(b))return;
    if(b.dataset.lang){state.lang=b.dataset.lang;render();return;}
    if(b.dataset.min){cleanTimer();state.minutes=Number(b.dataset.min);state.index=0;state.remaining=state.minutes*60;render();return;}
    if(b.dataset.type){cleanTimer();state.type=b.dataset.type;state.index=0;render();return;}
    switch(b.dataset.action){
      case 'another':if(!state.active){state.index++;render();}break;
      case 'start':if(!state.active){state.active=true;state.paused=false;state.deadline=Date.now()+state.remaining*1000;state.id=setInterval(tick,300);render();}break;
      case 'pause':if(state.active){if(state.paused){state.paused=false;state.deadline=Date.now()+state.remaining*1000;}else{state.paused=true;}render();}break;
      case 'reset':cleanTimer();render();break;
    }
  });
  render();
})();
