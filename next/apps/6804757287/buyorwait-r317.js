/* TSZ LP R317 Buy or Wait. Self-contained demonstration, no network or persistence. */
(() => {
  'use strict';
  const strings = {
    en: {tag:'DECIDE ON YOUR OWN TERMS',title:'Would you wait {days} days to save {saved}?',deck:'Not a sale prediction. Just the tradeoff between the money you could save and the time you would wait.',now:'Price today',goal:'Price you hope to pay',days:'Days willing to wait',nowHint:'The price you can pay today',goalHint:'Your own target—not a forecast',daysHint:'Your personal waiting limit',presets:'Try another wait',day:'days',saved:'Potential savings',savedSubtitle:'Only if the target price becomes available.',wait:'Time you choose to wait',perDay:'Savings per day of waiting',note:'Is this amount worth the wait for you? No app can make that personal choice for you.',reset:'Reset example',invalid:'Enter a valid current price and target price (0 or higher), and 1–365 whole days. The target must be no higher than today’s price.',noPredict:'Illustrative comparison only. No future price is predicted. Switching currency changes the symbol, not the numeric amounts.',language:'Language',currency:'Currency',label:'Example, not a recommendation'},
    ja: {tag:'自分の基準で決める',title:'{saved}のために、{days}日待つ？',deck:'値下がりを予測するのではなく、節約できる額と待つ時間を並べてみる。',now:'今日の価格',goal:'自分の希望価格',days:'待てる日数',nowHint:'今日買える価格',goalHint:'予測ではなく自分の目標',daysHint:'自分が待てる限界',presets:'待ち日数の例',day:'日',saved:'目標達成時の節約額',savedSubtitle:'希望価格で買えた場合の差額',wait:'自分が待つ時間',perDay:'待つ1日あたりの節約額',note:'この節約額は、待つ時間に見合うだろうか。決めるのは自分。',reset:'初期値へ戻す',invalid:'価格は0以上、待ち日数は1～365の整数で入力してください。希望価格は今日の価格以下にしてください。',noPredict:'比較用の例であり、将来の価格は予測しません。通貨の切替は記号のみで、為替換算ではありません。',language:'言語',currency:'通貨',label:'比較例・推奨ではありません'},
    ar: {tag:'اختر وفق معيارك',title:'هل تنتظر {days} يومًا لتوفير {saved}؟',deck:'لسنا نتنبأ بالتخفيضات. نعرض الفرق بين المبلغ الذي قد توفره والوقت الذي تختار انتظاره.',now:'سعر اليوم',goal:'السعر الذي تتمناه',days:'أيام الانتظار',nowHint:'السعر المتاح اليوم',goalHint:'هدفك الشخصي وليس توقعًا',daysHint:'المدة التي تقبل انتظارها',presets:'جرّب مدة أخرى',day:'يومًا',saved:'التوفير المحتمل',savedSubtitle:'إذا توفر السعر المستهدف فقط',wait:'مدة الانتظار',perDay:'التوفير لكل يوم انتظار',note:'هل يستحق هذا التوفير الانتظار بالنسبة لك؟ القرار لك.',reset:'إعادة المثال',invalid:'أدخل سعرًا غير سالب ومدة صحيحة من ١ إلى ٣٦٥ يومًا. يجب ألا يتجاوز سعر الهدف السعر الحالي.',noPredict:'هذا مجرد مثال للمقارنة وليس توقعًا لسعر مستقبلي. تغيير العملة يغيّر الرمز فقط دون تحويل.',language:'اللغة',currency:'العملة',label:'مثال، لا توصية'}
  };
  const escape = s => String(s).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
  const state = {now:120,goal:100,days:14,lang:'en',currency:'USD'};
  const host = () => document.querySelector('.p199-body') || document.querySelector('main') || document.body;
  const languageFromGlobal = () => {
    const value = (document.getElementById('p199-language')?.value || document.documentElement.lang || 'en').toLowerCase();
    return value.startsWith('ar') ? 'ar' : value.startsWith('ja') ? 'ja' : 'en';
  };
  let root;
  function mount() {
    if(document.getElementById('bw317')) return;
    state.lang = languageFromGlobal();
    root = document.createElement('section'); root.id='bw317'; root.className='bw317'; root.setAttribute('aria-label','Buy or Wait interactive comparison');
    const a = host(); const before = a.querySelector('#features') || a.querySelector('#related');
    if(before) before.parentNode.insertBefore(root,before); else a.appendChild(root);
    render();
    const globalLang = document.getElementById('p199-language');
    if (globalLang) globalLang.addEventListener('change', () => {state.lang=languageFromGlobal();render();});
  }
  function money(value) {
    const locale=state.lang==='ja'?'ja-JP':state.lang==='ar'?'ar-EG':'en-US';
    const digits = new Intl.NumberFormat(locale,{minimumFractionDigits:2,maximumFractionDigits:2}).format(value);
    return (state.currency==='JPY'?'¥':'$')+digits;
  }
  function num(value){return Number.isFinite(value)?new Intl.NumberFormat(state.lang==='ja'?'ja-JP':state.lang==='ar'?'ar-EG':'en-US',{maximumFractionDigits:0}).format(value):'—';}
  function render(){
    if(!root)return; const t=strings[state.lang];root.dir=state.lang==='ar'?'rtl':'ltr';root.lang=state.lang;
    root.innerHTML=`<div class="bw317-head"><div><p class="bw317-overline">${escape(t.tag)}</p><h2 class="bw317-h2">${escape(t.title)}</h2></div><div class="bw317-language"><label>${escape(t.language)} <select data-field="lang"><option value="en" ${state.lang==='en'?'selected':''}>English</option><option value="ja" ${state.lang==='ja'?'selected':''}>日本語</option><option value="ar" ${state.lang==='ar'?'selected':''}>العربية</option></select></label><label>${escape(t.currency)} <select data-field="currency"><option value="USD" ${state.currency==='USD'?'selected':''}>USD</option><option value="JPY" ${state.currency==='JPY'?'selected':''}>JPY</option></select></label></div></div>
    <p class="bw317-deck">${escape(t.deck)}</p>
    <div class="bw317-fields">
      <label class="bw317-field"><span>${escape(t.now)}</span><input data-field="now" type="number" min="0" max="10000000" step="0.01" inputmode="decimal" value="${escape(state.now)}"><small>${escape(t.nowHint)}</small></label>
      <label class="bw317-field"><span>${escape(t.goal)}</span><input data-field="goal" type="number" min="0" max="10000000" step="0.01" inputmode="decimal" value="${escape(state.goal)}"><small>${escape(t.goalHint)}</small></label>
      <label class="bw317-field"><span>${escape(t.days)}</span><input data-field="days" type="number" min="1" max="365" step="1" inputmode="numeric" value="${escape(state.days)}"><small>${escape(t.daysHint)}</small></label>
    </div>
    <div class="bw317-presets"><span>${escape(t.presets)}</span>${[7,14,30].map(d=>`<button type="button" data-days="${d}" aria-pressed="${state.days===d}">${d} ${escape(t.day)}</button>`).join('')}</div>
    <div class="bw317-results" aria-live="polite"><div class="bw317-primary"><p class="bw317-kicker">${escape(t.saved)}</p><strong data-result="savings" class="bw317-big">—</strong><p class="bw317-secondary">${escape(t.savedSubtitle)}</p></div><div class="bw317-side"><div class="bw317-stat"><span>${escape(t.wait)}</span><strong data-result="days">—</strong></div><div class="bw317-stat"><span>${escape(t.perDay)}</span><strong data-result="perDay">—</strong></div></div></div>
    <div class="bw317-warning" data-error role="alert" hidden></div><p class="bw317-note">${escape(t.note)}</p><div class="bw317-actions"><p class="bw317-disclaimer">${escape(t.noPredict)}</p><button class="bw317-plain" data-reset type="button">${escape(t.reset)}</button></div>`;
    root.querySelectorAll('[data-field]').forEach(el=>el.addEventListener('change', e=>{
      const key=e.target.dataset.field;
      if(key==='lang'||key==='currency'){state[key]=e.target.value;render();}
      else{state[key]=e.target.value;update();}
    }));
    root.querySelectorAll('[data-field="now"],[data-field="goal"],[data-field="days"]').forEach(el=>el.addEventListener('input',e=>{state[e.target.dataset.field]=e.target.value;update();}));
    root.querySelectorAll('[data-days]').forEach(el=>el.addEventListener('click',()=>{state.days=Number(el.dataset.days);render();}));
    root.querySelector('[data-reset]').addEventListener('click',()=>{Object.assign(state,{now:120,goal:100,days:14});render();});
    update();
  }
  function update(){
    const t=strings[state.lang], now=Number(state.now),goal=Number(state.goal),days=Number(state.days);
    const valid=String(state.now).trim()!==''&&String(state.goal).trim()!==''&&String(state.days).trim()!==''&&[now,goal,days].every(Number.isFinite)&&now>=0&&goal>=0&&now<=10000000&&goal<=now&&Number.isInteger(days)&&days>=1&&days<=365;
    root.querySelector('.bw317-h2').textContent=valid?t.title.replace('{days}',num(days)).replace('{saved}',money(now-goal)):t.title.replace('{days}','—').replace('{saved}','—');
    const err=root.querySelector('[data-error]');err.hidden=valid;err.textContent=valid?'':t.invalid;
    root.querySelectorAll('.bw317-field input').forEach(el=>el.setAttribute('aria-invalid',String(!valid)));
    root.querySelector('[data-result="savings"]').textContent=valid?money(now-goal):'—';
    root.querySelector('[data-result="days"]').textContent=valid?num(days)+' '+t.day:'—';
    root.querySelector('[data-result="perDay"]').textContent=valid?money((now-goal)/days):'—';
    root.querySelectorAll('[data-days]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.days)===days)));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
