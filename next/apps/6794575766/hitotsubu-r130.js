/* Hitotsubu R130: website-only one-grain demonstration. No persistence, networking, or edits/deletions of individual grains. */
(() => {
  'use strict';
  const APP_ID = '6794575766';
  const L = {
    en: {
      eyebrow:'HITOTSUBU · ONE SMALL GRAIN', badge:'INTERACTIVE WEBSITE EXAMPLE',
      title:'Even on a day that felt empty, one thing remained.',
      intro:'Something tasted good. A small smile. Someone helped. You made it through today. Tap what stayed with you. It does not have to be an achievement.',
      choose:'Keep one small moment', tasty:'Something tasted good', smile:'I smiled a little', helped:'Someone helped', through:'I made it through today',
      total:'GRAINS IN THIS WEBSITE EXAMPLE', grain:'grain', grains:'grains', saved:'Little moments kept',
      bottle:'One grain at a time', timeline:'Your grains (newest last)',
      starter:'A little relief', starter2:'Made it through the day',
      restart:'Restart website example only', notdelete:'These grains have no edit or delete button.',
      steps:'One grain → a bottle → a crate → a container → a warehouse.',
      note:'LP-only illustration; this is not the real Hitotsubu screen or the app’s actual grouping rules. In the app, recorded grains cannot be edited or deleted, even if entered by mistake. “Restart” clears only this temporary website example; it does not remove any app record. Nothing here is saved, uploaded or sent.',
      added:'One more grain was kept.', resetdone:'This website example was restarted.'
    },
    ja: {
      eyebrow:'ひとつぶ · 小さく残ったもの', badge:'LP専用・操作デモ',
      title:'何もなかったと思う日にも、一粒は残っている。',
      intro:'おいしかった。少し笑えた。助けてもらった。今日も何とか終わった。大きな成果ではなくても、その瞬間に一度だけ押してみる。',
      choose:'残したい、小さな瞬間', tasty:'おいしかった', smile:'ちょっと笑えた', helped:'助けてもらった', through:'今日も何とか過ごした',
      total:'このLPデモに残した粒', grain:'粒', grains:'粒', saved:'残してきた小さな瞬間',
      bottle:'一粒ずつ、瓶にたまる', timeline:'粒の記録（新しいものが下）',
      starter:'少しほっとした', starter2:'一日を終えられた',
      restart:'LPデモだけ最初から', notdelete:'個々の粒には編集・削除ボタンがありません。',
      steps:'一粒 → 瓶 → 木箱 → コンテナ → 倉庫。',
      note:'LP専用の模式的なデモです。実アプリの画面や各容器に入る粒数は再現していません。Hitotsubu本体では、誤って押した粒も編集・削除できません。「LPデモだけ最初から」はこのページ上の一時サンプルだけを戻し、アプリの記録は消しません。入力内容は保存・送信されません。',
      added:'新しい一粒を残しました。', resetdone:'このLPデモを最初に戻しました。'
    },
    ar: {
      eyebrow:'هيتوتسوبو · حبة صغيرة بقيت', badge:'مثال تفاعلي على الموقع',
      title:'حتى في اليوم الذي بدا فارغًا، بقي شيء صغير.',
      intro:'كان شيئًا لذيذًا. ابتسمت قليلاً. ساعدك أحدهم. وصلت إلى نهاية اليوم. اضغط على اللحظة التي بقيت معك؛ لا يلزم أن تكون إنجازًا.',
      choose:'احتفظ بلحظة صغيرة', tasty:'كان الطعام لذيذًا', smile:'ابتسمت قليلاً', helped:'ساعدني أحدهم', through:'وصلت إلى نهاية اليوم',
      total:'الحبات في مثال الموقع هذا', grain:'حبة', grains:'حبات', saved:'اللحظات الصغيرة المحفوظة',
      bottle:'حبة واحدة في كل مرة', timeline:'حباتك (الأحدث في النهاية)',
      starter:'شعرت ببعض الراحة', starter2:'أكملت يومي',
      restart:'إعادة مثال الموقع فقط', notdelete:'لا توجد أزرار لتعديل الحبات أو حذفها.',
      steps:'حبة ← زجاجة ← صندوق خشبي ← حاوية ← مستودع.',
      note:'هذا توضيح على الموقع فقط، وليس شاشة التطبيق الحقيقية أو قواعد تجميعه الفعلية. لا يمكن تعديل الحبات أو حذفها في تطبيق Hitotsubu حتى عند الضغط بالخطأ. إعادة المثال تعيد بيانات هذه الصفحة المؤقتة فقط ولا تحذف أي سجل في التطبيق. لا تُحفَظ المعلومات هنا ولا تُرفَع أو تُرسَل.',
      added:'أُضيفت حبة أخرى.', resetdone:'أُعيد مثال الموقع إلى بدايته.'
    }
  };
  const options=['tasty','smile','helped','through'];
  const seed=[{type:'starter'},{type:'starter2'}];
  const preferredLanguage=()=>{
    const raw=String(document.getElementById('p199-language')?.value || document.documentElement.lang || 'en').toLowerCase().split(/[-_]/)[0];
    return L[raw]?raw:'en';
  };
  function mount(){
    if(document.getElementById('tsz-ht130')||!document.body)return;
    const id=document.body.dataset.p199Id || document.body.dataset.p19AppId || '';
    if(id && id!==APP_ID)return;
    if(!id && !document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor=document.getElementById('tsz-ht96') || document.getElementById('tsz-hitotsubu-r96') || document.getElementById('tsz-ht55') || document.getElementById('overview');
    const main=document.querySelector('main');if(!anchor&&!main)return;
    const root=document.createElement('section');root.id='tsz-ht130';root.dataset.demo='hitotsubu-one-grain-website-only';
    root.innerHTML=`<div class="ht130-top"><span data-t="eyebrow"></span><span class="ht130-tag" data-t="badge"></span></div>
      <h2 data-t="title"></h2><p class="ht130-intro" data-t="intro"></p>
      <div class="ht130-cols"><div class="ht130-main"><h3 data-t="choose"></h3><div class="ht130-choices" data-choices></div>
        <p class="ht130-status" aria-live="polite" data-status></p>
        <div class="ht130-metric"><span data-t="total"></span><strong data-count></strong><span data-t="saved"></span></div>
        <p class="ht130-locked" data-t="notdelete"></p>
        <button class="ht130-reset" type="button" data-reset data-t="restart"></button></div>
        <div class="ht130-visual"><div class="ht130-visual-head" data-t="bottle"></div><div class="ht130-bottle" aria-hidden="true"><div class="ht130-neck"></div><div class="ht130-glass"><div class="ht130-grains" data-grains></div></div></div>
        <div class="ht130-list-title" data-t="timeline"></div><ol data-list class="ht130-list"></ol></div></div>
        <p class="ht130-journey" data-t="steps"></p><p class="ht130-footnote" data-t="note"></p>`;
    if(anchor)anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    let grains=seed.map(x=>({...x}));let langSeen='';
    const announce=root.querySelector('[data-status]');
    function render(){
      const lang=preferredLanguage(),t=L[lang];langSeen=lang;
      root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.dataset.t]||''});
      const choices=root.querySelector('[data-choices]');choices.replaceChildren();
      options.forEach(k=>{const button=document.createElement('button');button.type='button';button.dataset.add=k;button.className='ht130-choice';button.textContent=t[k];choices.append(button)});
      root.querySelector('[data-count]').textContent=String(grains.length)+' '+(grains.length===1?t.grain:t.grains);
      const visual=root.querySelector('[data-grains]');visual.replaceChildren();
      grains.slice(-30).forEach((item,i)=>{const g=document.createElement('span');g.className='ht130-grain';g.style.setProperty('--delay',String(i*10)+'ms');visual.append(g)});
      const list=root.querySelector('[data-list]');list.replaceChildren();
      grains.forEach((item,i)=>{const li=document.createElement('li');li.textContent=t[item.type]||'';list.append(li)});
      root.dataset.count=String(grains.length);
      root.dataset.last=grains[grains.length-1]?.type||'';
    }
    root.querySelector('[data-choices]').addEventListener('click',event=>{
      const btn=event.target.closest('button[data-add]');if(!btn||!root.contains(btn))return;
      const kind=btn.dataset.add;if(!options.includes(kind))return;
      grains.push({type:kind});render();announce.textContent=L[langSeen].added;
    });
    root.querySelector('[data-reset]').addEventListener('click',()=>{
      grains=seed.map(x=>({...x}));render();announce.textContent=L[langSeen].resetdone;
    });
    render();
    const selector=document.getElementById('p199-language');selector?.addEventListener('change',()=>{render();announce.textContent='' });
    new MutationObserver(()=>{if(langSeen!==preferredLanguage()){render();announce.textContent=''}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
