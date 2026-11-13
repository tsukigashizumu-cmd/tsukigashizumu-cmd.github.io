/* TSZ LP R192 | Good Person Test: one illustrative irreversible choice, no diagnosis. */
(() => {
  'use strict';
  const APP = '6769388691', ID = 'tsz-goodperson-r192';
  if (!document.body || document.getElementById(ID)) return;
  const bodyApp = document.body.dataset.p199Id || document.body.dataset.p19AppId || '';
  if (bodyApp && bodyApp !== APP) return;
  if (!bodyApp && !/Good\s*Person\s*Test/i.test(document.body.textContent || '')) return;
  const locales = {
    en: {
      kicker: 'ONE CHOICE CHANGES THE STORY', heading: 'Being good gets', headingEm: 'complicated.',
      lead: 'Ten choices. No going back.', questionIndex: 'QUESTION 01 / 10',
      question: 'Someone takes credit for your work. What do you do?',
      choices: ['Let it go', 'Talk to them privately', 'Correct the record'],
      supporting: 'Different choices. Different reasons.', questionFoot: 'Choose once. This sample answer cannot be changed.',
      confirmed: 'CHOICE LOCKED', confirmation: 'You chose:', locked: 'Your choice is final for this demo.',
      next: 'In the real game, ten decisions lead to one of twenty types.',
      stats: ['10 questions', '3 choices each', '20 possible types'],
      store: 'View on the App Store', note: 'Illustrative one-question browser demo · Not a clinical personality assessment · Reload to start over.',
      frame: 'ONE QUESTION. THREE REASONS.', type: 'An illustrative dilemma, not an actual diagnosis.',
      maskOne: 'The face we show', maskTwo: 'The choice we make'
    },
    ja: {
      kicker: 'ひとつの選択で、物語が変わる', heading: '善人でいるって、', headingEm: '案外むずかしい。',
      lead: '10の質問。選んだら戻れない。', questionIndex: '質問 01 / 10',
      question: '同僚があなたの仕事の手柄を横取りした。どうする？',
      choices: ['その場では見逃す', '本人に直接伝える', 'みんなの前で訂正する'],
      supporting: 'どの選択にも、理由がある。', questionFoot: '一度選ぶと、このデモでは変更できません。',
      confirmed: '回答を確定しました', confirmation: 'あなたの選択：', locked: 'このデモでは選び直せません。',
      next: '実際のゲームでは10問の回答から20種類のタイプのいずれかが現れます。',
      stats: ['10の質問', '各3つの選択肢', '20種類のタイプ'],
      store: 'App Storeで見る', note: '1問だけの説明用デモです。臨床的な性格診断ではありません。ページを再読み込みすると初期状態になります。',
      frame: '1問。3つの理由。', type: '実際の診断結果を再現するものではありません。',
      maskOne: '外から見える顔', maskTwo: '選んだ行動'
    },
    ar: {
      kicker: 'قرار واحد يغير الحكاية', heading: 'أن تكون شخصًا طيبًا', headingEm: 'ليس أمرًا بسيطًا.',
      lead: 'عشرة أسئلة. لا رجوع بعد الاختيار.', questionIndex: 'السؤال 01 / 10',
      question: 'نسب زميل لنفسه الفضل في عملك. ماذا تفعل؟',
      choices: ['أتجاهل الأمر', 'أتحدث إليه على انفراد', 'أصحح الأمر أمام الآخرين'],
      supporting: 'لكل خيار أسبابه.', questionFoot: 'اختر مرة واحدة؛ لا يمكن تغيير الإجابة في هذا العرض.',
      confirmed: 'تم تثبيت الاختيار', confirmation: 'اخترت:', locked: 'اختيارك نهائي في هذا العرض.',
      next: 'في اللعبة الكاملة تؤدي عشرة اختيارات إلى واحد من عشرين نمطًا.',
      stats: ['10 أسئلة', '3 اختيارات لكل سؤال', '20 نمطًا ممكنًا'],
      store: 'عرض في App Store', note: 'عرض توضيحي لسؤال واحد فقط، وليس تقييمًا سريريًا للشخصية. أعد تحميل الصفحة للبدء من جديد.',
      frame: 'سؤال واحد. ثلاثة دوافع.', type: 'موقف توضيحي وليس تشخيصًا فعليًا.',
      maskOne: 'الوجه الذي نُظهره', maskTwo: 'الفعل الذي نختاره'
    }
  };
  const root = document.createElement('section');
  root.id=ID; root.className='gp192'; root.setAttribute('aria-labelledby','gp192-title');
  root.innerHTML = `<div class="gp192-shell">
    <header class="gp192-top"><span class="gp192-crest" aria-hidden="true">✥</span><strong>Good Person Test</strong><span class="gp192-top-note" data-gp192="kicker"></span></header>
    <div class="gp192-grid">
      <div class="gp192-story"><p class="gp192-eyebrow" data-gp192="kicker"></p><h2 id="gp192-title"><span data-gp192="heading"></span> <em data-gp192="headingEm"></em></h2><p class="gp192-lead" data-gp192="lead"></p>
        <div class="gp192-scene" aria-hidden="true"><div class="gp192-masks"><div class="gp192-mask gp192-mask-ivory"><span class="gp192-eye gp192-left-eye"></span><span class="gp192-eye gp192-right-eye"></span><span class="gp192-mouth"></span></div><div class="gp192-mask gp192-mask-wine"><span class="gp192-eye gp192-left-eye"></span><span class="gp192-eye gp192-right-eye"></span><span class="gp192-mouth"></span></div></div><div class="gp192-scale"><span></span><span></span><span></span></div></div>
        <p class="gp192-story-caption" data-gp192="supporting"></p>
      </div>
      <div class="gp192-card"><div class="gp192-card-head"><span class="gp192-ornament">❧</span><span data-gp192="questionIndex"></span><span class="gp192-ornament">❧</span></div><h3 id="gp192-question" data-gp192="question"></h3><div class="gp192-options" role="group" aria-labelledby="gp192-question"><button type="button" class="gp192-choice" data-gp192-answer="0"></button><button type="button" class="gp192-choice" data-gp192-answer="1"></button><button type="button" class="gp192-choice" data-gp192-answer="2"></button></div><p class="gp192-question-foot" data-gp192="questionFoot"></p>
        <div id="gp192-result" class="gp192-result" role="status" aria-live="polite" hidden><span class="gp192-result-flag" data-gp192="confirmed"></span><strong><span data-gp192="confirmation"></span> <span id="gp192-answer-text"></span></strong><p data-gp192="locked"></p><small data-gp192="next"></small></div>
      </div>
    </div>
    <div class="gp192-statline"><span data-gp192-stat="0"></span><span data-gp192-stat="1"></span><span data-gp192-stat="2"></span></div>
    <footer class="gp192-footer"><a id="gp192-store" href="https://apps.apple.com/us/app/id6769388691" rel="noopener noreferrer" target="_blank" data-gp192="store"></a><span data-gp192="type"></span></footer><p class="gp192-fine" data-gp192="note"></p>
  </div>`;
  const anchor=document.querySelector('.p19-breadcrumb')||document.querySelector('[class*="breadcrumb"]');
  if (anchor && anchor.parentNode) anchor.insertAdjacentElement('afterend',root);
  else {const main=document.querySelector('#p199-content')||document.querySelector('main');if(main)main.insertAdjacentElement('beforebegin',root);else document.body.insertBefore(root,document.body.firstChild);}
  if (!root.isConnected) return;
  const $ = selector => root.querySelector(selector), $$ = selector => Array.from(root.querySelectorAll(selector));
  const findSelect = kind => {
    const candidates=kind==='language'?['#p199-language','#p19-language','select[id*="language"]','select[id*="locale"]']:['#p199-country','#p19-country','select[id*="country"]','select[id*="region"]'];
    for (const candidate of candidates){const el=document.querySelector(candidate);if(el?.tagName==='SELECT')return el;}
    return null;
  };
  const lang=()=>{const v=String(findSelect('language')?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en';};
  const country=()=>{const v=String(findSelect('country')?.value||new URLSearchParams(location.search).get('country')||'us').toLowerCase();return /^[a-z]{2}$/.test(v)?v:'us';};
  let answer = null;
  function render(){
    const locale=lang(),t=locales[locale];root.lang=locale;root.dir=locale==='ar'?'rtl':'ltr';
    $$('[data-gp192]').forEach(el=>{el.textContent=t[el.dataset.gp192]||'';});
    $$('[data-gp192-stat]').forEach((el,i)=>{el.textContent=t.stats[i];});
    $$('[data-gp192-answer]').forEach(button=>{
      const idx=Number(button.dataset.gp192Answer);button.textContent=t.choices[idx];
      button.classList.toggle('is-selected',answer===idx);button.disabled=answer!==null;
      button.setAttribute('aria-pressed',String(answer===idx));
    });
    $('#gp192-result').hidden=answer===null;
    $('#gp192-answer-text').textContent=answer===null?'':t.choices[answer];
    $('#gp192-store').href='https://apps.apple.com/'+country()+'/app/id'+APP;
  }
  $$('[data-gp192-answer]').forEach(button=>button.addEventListener('click',()=>{
    if(answer!==null)return;
    const idx=Number(button.dataset.gp192Answer);
    if(!Number.isInteger(idx)||idx<0||idx>2)return;
    answer=idx;render();
  }));
  document.addEventListener('change',event=>{if(event.target===findSelect('language')||event.target===findSelect('country'))render();},true);
  window.addEventListener('popstate',render);
  render();
})();
