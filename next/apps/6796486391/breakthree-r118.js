/* TSZ LP R118 / BreakThree: website-only preparation choices, not native UI.
   No text entry, storage, telemetry, network, medical claims, or success tracking. */
(() => {
  'use strict';
  const APP_ID = '6796486391';
  const DICT = {
    en: {
      eyebrow:'THE NEXT MOVE / A PREPARATION EXAMPLE', title:'When the urge comes, know your next move.',
      intro:'Before you need it, choose one small alternative and a reason worth keeping in sight.',
      badge:'INTERACTIVE WEBSITE EXAMPLE', questionAction:'01 / What could you do instead?',
      questionReason:'02 / What do you want to regain?', previewLabel:'YOUR NEXT-MOVE CARD',
      before:'First, move the next cigarette out of reach.',
      choose:'Select an action and a reason to build a simple example.',
      actionText:'Instead, I can', reasonText:'I am making space for',
      water:'Drink a glass of water', walk:'Take a short walk', contact:'Message someone I trust',
      morning:'Clearer mornings', freedom:'More freedom in my day', promise:'A promise to myself',
      reveal:'Show the next move', reset:'Reset example', error:'Choose one action and one reason first.',
      ready:'A next move is ready in this example.',
      note:'This card is a website-only illustration, not an actual BreakThree screen or a personal smoking-cessation record. Choices remain only in this page’s memory, are never saved or sent, and disappear on reload. No outcome is guaranteed. BreakThree is not medical treatment; seek professional support for severe withdrawal symptoms or if you feel unwell.'
    },
    ja: {
      eyebrow:'次の一手 / 準備の説明例', title:'吸いたくなったとき、次にすることを決めておく。',
      intro:'その瞬間が来る前に、代わりの小さな行動と、取り戻したいものを一つずつ選ぶ。',
      badge:'LP専用・操作できる説明例', questionAction:'01 / 代わりに何をする？',
      questionReason:'02 / 何を取り戻したい？', previewLabel:'次の一手カード',
      before:'まず、次の一本を手の届かない場所に置く。',
      choose:'行動と理由を選ぶと、説明用カードを作れます。',
      actionText:'代わりにできること', reasonText:'取り戻したいもの',
      water:'水を一杯飲む', walk:'少し歩く', contact:'信頼できる人に連絡する',
      morning:'すっきりした朝', freedom:'自分の時間', promise:'自分との約束',
      reveal:'次の一手を見る', reset:'最初から選び直す', error:'行動と理由を一つずつ選んでください。',
      ready:'次の一手を、説明例として用意しました。',
      note:'これはLP専用の説明例で、BreakThreeアプリの実画面でも禁煙の記録でもありません。選択内容はページ内の一時的な状態のみで、保存・送信せず、再読み込みで消えます。禁煙の成果を保証するものではありません。BreakThreeは医療行為の代替ではありません。強い離脱症状や体調不良がある場合は専門家に相談してください。'
    },
    ar: {
      eyebrow:'الخطوة التالية / مثال للتحضير', title:'عندما تأتي الرغبة، اعرف خطوتك التالية.',
      intro:'اختر مسبقًا فعلًا صغيرًا بديلًا وسببًا تريد أن تتذكره.',
      badge:'مثال تفاعلي خاص بالموقع', questionAction:'٠١ / ماذا يمكنك أن تفعل بدلًا من ذلك؟',
      questionReason:'٠٢ / ما الذي تريد استعادته؟', previewLabel:'بطاقة خطوتك التالية',
      before:'أولًا، أبعد السيجارة التالية عن متناول يدك.',
      choose:'اختر فعلًا وسببًا لعرض بطاقة توضيحية بسيطة.',
      actionText:'بدلًا من ذلك، يمكنني', reasonText:'أريد أن أستعيد',
      water:'شرب كوب من الماء', walk:'المشي قليلًا', contact:'مراسلة شخص أثق به',
      morning:'صباحات أكثر صفاءً', freedom:'مزيدًا من الحرية في يومي', promise:'وعدي لنفسي',
      reveal:'اعرض الخطوة التالية', reset:'إعادة المثال', error:'اختر فعلًا واحدًا وسببًا واحدًا أولًا.',
      ready:'خطوتك التالية جاهزة في هذا المثال.',
      note:'هذه بطاقة توضيحية خاصة بالموقع، وليست شاشة فعلية من تطبيق BreakThree أو سجلًا شخصيًا للإقلاع عن التدخين. تبقى الخيارات في ذاكرة الصفحة فقط ولا تُحفظ أو تُرسل، وتختفي عند إعادة التحميل. لا يوجد ضمان للنتائج. التطبيق ليس علاجًا طبيًا؛ اطلب المساعدة المختصة عند ظهور أعراض انسحاب شديدة أو الشعور بتوعك.'
    }
  };
  const actions = ['water', 'walk', 'contact'];
  const reasons = ['morning', 'freedom', 'promise'];
  const lang = () => {
    const v = String(document.getElementById('p199-language')?.value || document.documentElement.lang || 'en').toLowerCase().split(/[-_]/)[0];
    return Object.prototype.hasOwnProperty.call(DICT,v) ? v : 'en';
  };
  function mount() {
    const body = document.body;
    if (!body || (body.dataset.p199Id !== APP_ID && body.dataset.p19AppId !== APP_ID)) return;
    const anchor = document.getElementById('overview');
    if (!anchor || document.getElementById('tsz-bt118')) return;
    const root = document.createElement('section');
    root.id = 'tsz-bt118';
    root.className = 'bt118';
    root.dataset.illustration = 'website-only-not-app-screen';
    root.innerHTML = `<div class="bt118-top"><div><p class="bt118-kicker" data-copy="eyebrow"></p><h2 data-copy="title"></h2><p class="bt118-intro" data-copy="intro"></p></div><span class="bt118-badge" data-copy="badge"></span></div>
      <div class="bt118-flow"><span>01 <i aria-hidden="true"></i> 02</span><span aria-hidden="true" class="bt118-flow-line"></span><span>03</span></div>
      <div class="bt118-grid"><div class="bt118-choices">
        <div class="bt118-picker" role="group" data-group="action" aria-label="Alternative action"><p data-copy="questionAction"></p><div class="bt118-buttons" data-buttons="action"></div></div>
        <div class="bt118-picker" role="group" data-group="reason" aria-label="Reason to remember"><p data-copy="questionReason"></p><div class="bt118-buttons" data-buttons="reason"></div></div>
        <div class="bt118-controls"><button type="button" class="bt118-primary" data-action="reveal" data-copy="reveal"></button><button type="button" class="bt118-reset" data-action="reset" data-copy="reset"></button></div>
      </div><div class="bt118-card" aria-live="polite"><span class="bt118-card-eyebrow" data-copy="previewLabel"></span><p class="bt118-card-first" data-copy="before"></p><div class="bt118-card-result" data-result hidden><span data-copy="actionText"></span><strong data-selected="action"></strong><span data-copy="reasonText"></span><strong data-selected="reason"></strong></div><p class="bt118-card-empty" data-copy="choose" data-empty></p><p class="bt118-status" role="status" data-status></p></div></div>
      <p class="bt118-note" data-copy="note"></p>`;
    const after = document.getElementById('tsz-bt80');
    (after || anchor).insertAdjacentElement('afterend',root);
    let chosenAction = null, chosenReason = null, revealed = false, error = false;
    const selectedNode = (type) => root.querySelector(`[data-selected="${type}"]`);
    const translate = () => {
      const l=lang(), t=DICT[l];
      root.dir=l==='ar'?'rtl':'ltr';
      root.lang=l;
      root.querySelectorAll('[data-copy]').forEach(el=>{if(Object.prototype.hasOwnProperty.call(t,el.dataset.copy))el.textContent=t[el.dataset.copy];});
      for (const [group,values,choice] of [['action',actions,chosenAction],['reason',reasons,chosenReason]]) {
        const container=root.querySelector(`[data-buttons="${group}"]`);
        container.replaceChildren();
        for (const value of values) {
          const b=document.createElement('button');b.type='button';b.className='bt118-option';
          b.dataset.group=group;b.dataset.value=value;b.textContent=t[value];
          b.setAttribute('aria-pressed',String(choice===value));
          b.addEventListener('click',()=>{if(group==='action')chosenAction=value;else chosenReason=value;revealed=false;error=false;translate();});
          container.appendChild(b);
        }
      }
      root.querySelector('[data-result]').hidden=!revealed;
      root.querySelector('[data-empty]').hidden=revealed;
      selectedNode('action').textContent=chosenAction?t[chosenAction]:'';
      selectedNode('reason').textContent=chosenReason?t[chosenReason]:'';
      root.querySelector('[data-status]').textContent=error?t.error:revealed?t.ready:'';
      root.querySelector('[data-status]').dataset.error=String(error);
    };
    root.querySelector('[data-action="reveal"]').addEventListener('click',()=>{
      error=!chosenAction||!chosenReason;revealed=!error;translate();
    });
    root.querySelector('[data-action="reset"]').addEventListener('click',()=>{
      chosenAction=null;chosenReason=null;revealed=false;error=false;translate();
    });
    document.getElementById('p199-language')?.addEventListener('change',translate);
    let previous=lang();
    new MutationObserver(()=>{const next=lang();if(next!==previous){previous=next;translate();}})
      .observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    translate();
  }
  if (document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
