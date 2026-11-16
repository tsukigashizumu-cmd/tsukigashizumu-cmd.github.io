/* R244 Quiet Reserve — illustrative in-memory demo; no diagnosis, persistence, analytics or transmission. */
(function () {
  'use strict';
  const ID = 'qr244';
  if (document.getElementById(ID)) return;
  const DICT = {
    en: {
      eyebrow: 'A QUIET CHECK-IN', title: 'After the crowd, how much is left?',
      intro: 'A few small things can take more out of you than you expected. Name what happened. Record what remains. No explanation needed.',
      labels: 'WHAT WORE YOU DOWN', level: 'YOUR RESERVE RIGHT NOW', levelCaption: 'A water-level feeling, not a score to improve.',
      tags: ['Crowds', 'Notifications', 'Plan changes', 'Sharp tone', 'Noise', 'Waiting for a reply'],
      scaleLow: 'Empty', scaleHigh: 'Full', after: 'OPTIONAL · WHAT HELPED?', helpers: ['Time alone', 'Quiet room', 'Short walk'],
      save: 'Record this moment', simple: 'Record level only', latest: 'RECENT MOMENTS · DEMO', records: 'Your moments in this demo',
      empty: 'Nothing recorded yet. You can begin with just one level.', last:'Just now',
      levelOnly:'Level only', reset: 'Reset demo', note:'Demo only. Entries live in this page until you leave or reset. No diagnosis, accounts, notifications, analytics, upload or persistent saving.',
      lang:'Language', region:'Example region', pulse: 'No judgment. Just a clearer picture.', saved: 'Added to the demo list.',
      select: 'Pick at least one tag, or use “Record level only”.', detail:'You never have to record every day.',
      segments: ['Low reserve', 'Some reserve', 'More reserve']
    },
    ja: {
      eyebrow: '静かな記録を体験', title: '人混みのあと、あとどれくらい残っている？',
      intro: '小さな刺激が重なって、あとから動けなくなる日もある。何が負担だったか、今どれくらい余力があるか。短く記録しておくだけ。',
      labels: '何で疲れた？', level: '今の余力', levelCaption: '頑張りを測る点数ではなく、水位のような感覚です。',
      tags: ['人混み', '通知', '予定変更', '強い口調', '音', '返信待ち'],
      scaleLow: '少ない', scaleHigh: '多い', after: '任意 · 少し助けになったこと', helpers: ['一人の時間', '静かな場所', '短い散歩'],
      save: 'この瞬間を記録', simple: '余力だけ記録', latest: '最近の記録 · デモ', records: 'このページの記録',
      empty: 'まだ記録はありません。余力だけでも始められます。', last:'たった今',
      levelOnly:'余力のみ', reset: 'デモを初期化', note:'説明用のデモです。記録はページを閉じるか初期化すると消えます。診断・通知・分析・送信・永続保存は行いません。',
      lang:'言語', region:'例示地域', pulse: '評価しない。今日の状態を残すだけ。', saved:'このページの記録に追加しました。',
      select:'刺激のタグを選ぶか、「余力だけ記録」を選んでください。', detail:'毎日記録する必要はありません。',
      segments: ['余力が少ない', '余力が残っている', '余力が多い']
    },
    ar: {
      eyebrow: 'تسجيل هادئ للحظة', title: 'كم بقي لديك بعد الازدحام؟',
      intro: 'قد تستنزفك أحداث صغيرة أكثر مما توقعت. اختر ما أتعبك، وسجل ما تبقى لديك الآن. دون الحاجة إلى شرح طويل.',
      labels: 'ما الذي أتعبك؟', level: 'طَاقَتُكَ المُتَبَقِّيَةُ الآن', levelCaption: 'مستوى يشبه الماء، وليس درجة عليك تحسينها.',
      tags: ['الازدحام', 'الإشعارات', 'تغيّر الخطط', 'نبرة قاسية', 'الضوضاء', 'انتظار الرد'],
      scaleLow: 'قليل', scaleHigh: 'كثير', after: 'اختياري · ما الذي ساعدك؟', helpers: ['وقت بمفردك', 'مكان هادئ', 'نزهة قصيرة'],
      save: 'سجّل هذه اللحظة', simple: 'سجّل المستوى فقط', latest: 'لحظات أخيرة · تجربة', records: 'سجلات هذه التجربة',
      empty: 'لا توجد سجلات بعد. يمكنك البدء بتسجيل المستوى فقط.', last:'الآن',
      levelOnly:'المستوى فقط', reset: 'إعادة التجربة', note:'عرض توضيحي فقط. تُحذف المدخلات عند مغادرة الصفحة أو إعادة الضبط. لا تشخيص أو حسابات أو إشعارات أو تحليلات أو إرسال أو حفظ دائم.',
      lang:'اللغة', region:'المنطقة', pulse: 'دون أحكام. مجرد صورة أوضح للحظة.', saved: 'أُضيف السجل إلى القائمة التجريبية.',
      select: 'اختر سببًا واحدًا على الأقل، أو سجّل المستوى فقط.', detail:'لست مضطرًا للتسجيل كل يوم.',
      segments: ['طاقة قليلة', 'بعض الطاقة', 'طاقة أكبر']
    }
  };
  const demoEvents = [
    {level:32, tags:[0,4], helpers:[0]},
    {level:67, tags:[1], helpers:[1]},
    {level:16, tags:[2,3], helpers:[]}
  ];
  let lang = (document.documentElement.lang || 'en').slice(0,2).toLowerCase();
  if (!DICT[lang]) lang='en';
  let region = lang==='ja' ? 'JP' : 'US';
  let selected = new Set([0]);
  let helped = new Set();
  let level = 32;
  let entries = [];
  let status = '';
  const root = document.createElement('section');
  root.id = ID;
  root.setAttribute('aria-label','Quiet Reserve interactive illustrative check-in');
  (document.querySelector('main') || document.body).appendChild(root);
  const t = key => DICT[lang][key];
  function ratioText(n) {return `${Math.max(0,Math.min(100,n))}%`;}
  function tier(n) {return DICT[lang].segments[n<35?0:n<70?1:2];}
  function eventsHtml() {
    return entries.map((entry,i)=>`<li class="qr244-entry"><span class="qr244-entry-water" style="--q-level:${entry.level}%"><i></i></span><span class="qr244-entry-body"><b>${entry.level}% · ${tier(entry.level)}</b><small>${entry.tags.length?entry.tags.map(id=>t('tags')[id]).join(' · '):t('levelOnly')}</small></span><em>${t('last')}</em></li>`).join('');
  }
  function render() {
    const d=DICT[lang];root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
    root.innerHTML=`<div class="qr244-frame">
      <header class="qr244-top"><div class="qr244-ident"><span class="qr244-mark" aria-hidden="true">◒</span><span>QUIET RESERVE <small>· INTERACTIVE DEMO</small></span></div>
        <div class="qr244-selects"><label><span>${d.lang}</span><select data-qr-select="lang"><option value="en" ${lang==='en'?'selected':''}>English</option><option value="ja" ${lang==='ja'?'selected':''}>日本語</option><option value="ar" ${lang==='ar'?'selected':''}>العربية</option></select></label><label><span>${d.region}</span><select data-qr-select="region"><option value="US" ${region==='US'?'selected':''}>US</option><option value="JP" ${region==='JP'?'selected':''}>JP</option></select></label></div>
      </header>
      <div class="qr244-hero"><p class="qr244-eyebrow">${d.eyebrow}</p><h2>${d.title}</h2><p>${d.intro}</p></div>
      <div class="qr244-layout"><div class="qr244-card qr244-choices"><div class="qr244-title"><span>01</span><h3>${d.labels}</h3></div>
      <div class="qr244-tags">${d.tags.map((label,i)=>`<button type="button" data-qr-tag="${i}" aria-pressed="${selected.has(i)}"><span aria-hidden="true">${selected.has(i)?'✓':'+'}</span>${label}</button>`).join('')}</div>
      <div class="qr244-subhead">${d.after}</div><div class="qr244-helpers">${d.helpers.map((label,i)=>`<button type="button" data-qr-help="${i}" aria-pressed="${helped.has(i)}">${label}</button>`).join('')}</div>
      <p class="qr244-detail">${d.detail}</p></div>
      <div class="qr244-card qr244-water-card"><div class="qr244-title"><span>02</span><h3>${d.level}</h3></div>
      <div class="qr244-level-grid"><div class="qr244-glass" style="--q-level:${level}%" aria-hidden="true"><div class="qr244-liquid"><div class="qr244-ripple"></div></div><div class="qr244-glass-highlights"></div></div>
      <div class="qr244-level-reading"><span class="qr244-big" data-qr-out="level">${level}<small>%</small></span><span class="qr244-tier" data-qr-out="tier">${tier(level)}</span><div class="qr244-mini-rule"></div><p>${d.levelCaption}</p></div></div>
      <div class="qr244-slider-line"><span>${d.scaleLow}</span><span>${d.scaleHigh}</span></div><input class="qr244-slider" data-qr-slider aria-label="${d.level}" type="range" min="0" max="100" step="1" value="${level}" style="--q-progress:${level}%"/>
      <div class="qr244-actions"><button class="qr244-record" type="button" data-qr-action="save">${d.save}</button><button class="qr244-simple" type="button" data-qr-action="simple">${d.simple}</button></div><p class="qr244-feedback" role="status" aria-live="polite">${status || d.pulse}</p></div></div>
      <div class="qr244-recent"><div class="qr244-recent-heading"><div><p>${d.latest}</p><h3>${d.records}</h3></div><button type="button" data-qr-action="reset">${d.reset}</button></div>${entries.length?`<ol class="qr244-entries">${eventsHtml()}</ol>`:`<p class="qr244-empty">${d.empty}</p>`}</div>
      <footer class="qr244-note">${d.note}</footer>
      </div>`;
  }
  function reset() {selected=new Set([0]);helped=new Set();level=32;entries=[];status='';render();}
  root.addEventListener('click',e=>{
    const button=e.target.closest('button');if(!button || !root.contains(button))return;
    if(button.hasAttribute('data-qr-tag')) {const i=Number(button.dataset.qrTag);selected.has(i)?selected.delete(i):selected.add(i);status='';render();return;}
    if(button.hasAttribute('data-qr-help')) {const i=Number(button.dataset.qrHelp);helped.has(i)?helped.delete(i):helped.add(i);status='';render();return;}
    const action=button.dataset.qrAction;if(!action)return;
    if(action==='reset') {reset();return;}
    if(action==='save'&&!selected.size){status=t('select');render();return;}
    if(action==='simple'||action==='save') {entries.unshift({level,tags:action==='simple'?[]:[...selected],helpers:action==='simple'?[]:[...helped]});entries=entries.slice(0,4);status=t('saved');render();}
  });
  root.addEventListener('input',e=>{
    if(!e.target.matches('[data-qr-slider]'))return;
    level=Number(e.target.value);root.querySelector('[data-qr-out="level"]').innerHTML=level+'<small>%</small>';
    root.querySelector('[data-qr-out="tier"]').textContent=tier(level);
    root.querySelector('.qr244-glass').style.setProperty('--q-level',level+'%');
    e.target.style.setProperty('--q-progress',level+'%');
  });
  root.addEventListener('change',e=>{
    if(!e.target.matches('[data-qr-select]'))return;
    if(e.target.dataset.qrSelect==='lang'&&DICT[e.target.value])lang=e.target.value;
    if(e.target.dataset.qrSelect==='region'&&['US','JP'].includes(e.target.value))region=e.target.value;
    render();
  });
  // Use a predictable reproducible first view with no browser or local storage.
  render();
})();
