/* TSZ LP R96 — Hitotsubu. Illustrative ephemeral demo. No storage, network or deletion of individual grains. */
(()=>{
  'use strict';
  const ID='tsz-hitotsubu-r96';
  const CATEGORIES=['tasty','beautiful','smile','relief','finished','helped','through'];
  const COLORS=['#b16b45','#9f7cba','#e5b866','#75a89b','#d47f72','#a19d67','#a78c7d'];
  const COPY={
    ja:{kicker:'HITOTSUBU · ONE SMALL THING',title:'何もなかった日にも、一粒。',intro:'おいしかった。少し笑えた。今日も何とか過ごせた。大きな出来事じゃなくていい。ひとつ選んで、瓶の中へ。',choose:'今、残したい小さなこと',add:'この一粒を残す',reset:'説明用の最初の瓶に戻す',count:'粒',bottle:'今日までの一粒',path:'一粒から、時間の倉庫へ',jar:'瓶',crate:'木箱',container:'コンテナ',hint:'瓶 → 木箱 → コンテナはアプリの構想を表す模式図です。',demo:'これはLP専用の操作サンプルです。実アプリでは粒の編集・削除はできません。ここで押した粒は保存・送信されず、上の「戻す」はこのデモの再体験だけに使います。',limit:'このデモでは最大24粒まで表示します。',added:'瓶に一粒増えました。',restored:'説明用の瓶に戻しました。',tasty:'おいしかった',beautiful:'きれいだった',smile:'少し笑えた',relief:'ほっとした',finished:'ひとつ終えた',helped:'助けてもらった',through:'今日を乗り切った'},
    en:{kicker:'HITOTSUBU · ONE SMALL THING',title:'Even on an empty day, one grain.',intro:'Something tasted good. You smiled. You made it through today. It need not be a big event. Choose one small thing and place it in the bottle.',choose:'A small thing worth keeping',add:'Keep this one grain',reset:'Restore the sample bottle',count:'grains',bottle:'One small thing, kept',path:'From a single grain to a warehouse of time',jar:'Bottle',crate:'Crate',container:'Container',hint:'Bottle → crate → container is an illustration of the app concept.',demo:'This is an LP-only sample, not the app UI. In the actual app, grains cannot be edited or deleted. Demo grains are not saved or sent. “Restore” only restarts this sample.',limit:'This sample displays up to 24 grains.',added:'One grain was added.',restored:'The sample bottle was restored.',tasty:'It tasted good',beautiful:'Something beautiful',smile:'I smiled',relief:'I felt relieved',finished:'I finished something',helped:'Someone helped',through:'I made it through'},
    ar:{kicker:'HITOTSUBU · شيء صغير بقي',title:'حتى في يومٍ بدا فارغًا، بقيت حبّة.',intro:'كان شيئًا لذيذًا. ابتسمت قليلًا. تجاوزت اليوم. لا حاجة إلى حدث كبير. اختر شيئًا صغيرًا وضعه في الزجاجة.',choose:'شيء صغير تريد الاحتفاظ به',add:'احتفظ بهذه الحبّة',reset:'العودة إلى الزجاجة التوضيحية',count:'حبّات',bottle:'شيء صغير محفوظ',path:'من حبّة واحدة إلى مخزن للوقت',jar:'زجاجة',crate:'صندوق',container:'حاوية',hint:'الزجاجة ثم الصندوق ثم الحاوية: رسم يوضح فكرة التطبيق.',demo:'هذه تجربة توضيحية للصفحة فقط وليست شاشة التطبيق. في التطبيق الحقيقي لا يمكن تعديل الحبّات أو حذفها. لا تُحفظ حبّات المثال أو تُرسل. زر العودة يعيد المثال فقط.',limit:'يعرض هذا المثال حتى 24 حبّة.',added:'أُضيفت حبّة إلى الزجاجة.',restored:'عادت الزجاجة التوضيحية إلى البداية.',tasty:'كان لذيذًا',beautiful:'رأيت شيئًا جميلًا',smile:'ابتسمت قليلًا',relief:'شعرت بالراحة',finished:'أنهيت شيئًا',helped:'ساعدني أحد',through:'تجاوزت اليوم'}
  };
  const locale=()=>{const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en';};
  const sample=()=>['tasty','smile','through','relief'];
  function mount(){
    if(document.getElementById(ID))return;
    const host=document.querySelector('main')||document.body;
    if(!host)return;
    const root=document.createElement('section');root.id=ID;
    root.innerHTML=`<div class="ht96-layout"><div class="ht96-copy"><p class="ht96-kicker" data-ht96="kicker"></p><h2 data-ht96="title"></h2><p class="ht96-intro" data-ht96="intro"></p><p class="ht96-field-label" data-ht96="choose"></p><div class="ht96-kinds" id="ht96-kinds" role="group"></div><button class="ht96-save" id="ht96-add" type="button" data-ht96="add"></button><div class="ht96-actions"><button class="ht96-reset" id="ht96-reset" type="button" data-ht96="reset"></button><span class="ht96-max" id="ht96-max"></span></div><p class="ht96-disclaimer" data-ht96="demo"></p></div><div class="ht96-art"><div class="ht96-art-top"><span class="ht96-art-title" data-ht96="bottle"></span><div class="ht96-counter"><strong id="ht96-count" aria-live="polite">4</strong><span class="ht96-count-label" data-ht96="count"></span></div></div><div class="ht96-vessel-area"><div class="ht96-vessel-shadow"></div><div class="ht96-bottle"><div class="ht96-grains" id="ht96-grains" role="img"></div><div class="ht96-bottle-shine"></div><span class="ht96-bottle-label">HITOTSUBU</span></div></div><p class="ht96-path-label" data-ht96="path"></p><div class="ht96-path"><div class="ht96-path-step"><span class="ht96-path-symbol" aria-hidden="true">◉</span><span data-ht96="jar"></span></div><span class="ht96-path-arrow" aria-hidden="true">→</span><div class="ht96-path-step"><span class="ht96-path-symbol" aria-hidden="true">▤</span><span data-ht96="crate"></span></div><span class="ht96-path-arrow" aria-hidden="true">→</span><div class="ht96-path-step"><span class="ht96-path-symbol" aria-hidden="true">▥</span><span data-ht96="container"></span></div></div><p class="ht96-path-hint" data-ht96="hint"></p><p id="ht96-live" class="ht96-sr" role="status" aria-live="polite"></p></div></div>`;
    host.append(root);
    let chosen='smile', grains=sample();
    const holder=root.querySelector('#ht96-kinds');
    const buttons=CATEGORIES.map((category,i)=>{
      const button=document.createElement('button');button.type='button';button.className='ht96-kind';button.dataset.kind=category;
      const dot=document.createElement('span');dot.className='ht96-kind-dot';dot.style.setProperty('--kind-color',COLORS[i]);dot.setAttribute('aria-hidden','true');
      const label=document.createElement('span');label.className='ht96-kind-text';button.append(dot,label);button.addEventListener('click',()=>{chosen=category;render();});holder.append(button);return button;
    });
    function render(){
      const l=locale(),words=COPY[l];root.lang=l;root.dir=l==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-ht96]').forEach(el=>el.textContent=words[el.dataset.ht96]||'');
      buttons.forEach((b,i)=>{b.querySelector('.ht96-kind-text').textContent=words[CATEGORIES[i]];b.setAttribute('aria-pressed',String(chosen===CATEGORIES[i]));});
      root.querySelector('#ht96-count').textContent=String(grains.length);
      const grainsEl=root.querySelector('#ht96-grains');grainsEl.replaceChildren();
      grains.forEach((category,i)=>{const dot=document.createElement('span');dot.className='ht96-grain';dot.dataset.grain=String(i+1);dot.style.setProperty('--ht96-color',COLORS[CATEGORIES.indexOf(category)]);dot.style.setProperty('--ht96-rotate',`${(i*43+29)%160-80}deg`);
        // Golden-angle distribution within the bottom half; decorative positions are not real app coordinates.
        const col=(i*7+Math.floor(i/4)*3)%10;const row=Math.floor(i/10);
        dot.style.left=`${10+col*8.8}%`;dot.style.bottom=`${10+row*15+((i*3)%5)*4}%`;dot.setAttribute('aria-hidden','true');grainsEl.append(dot);
      });
      grainsEl.setAttribute('aria-label',`${grains.length} ${words.count}`);
      const full=grains.length>=24;root.querySelector('#ht96-add').disabled=full;
      root.querySelector('#ht96-max').textContent=full?words.limit:'';
    }
    root.querySelector('#ht96-add').addEventListener('click',()=>{if(grains.length>=24)return;grains.push(chosen);render();root.querySelector('#ht96-live').textContent=COPY[locale()].added;});
    root.querySelector('#ht96-reset').addEventListener('click',()=>{grains=sample();chosen='smile';render();root.querySelector('#ht96-live').textContent=COPY[locale()].restored;});
    new MutationObserver(list=>{if(list.some(x=>x.attributeName==='lang'))render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
