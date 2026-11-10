/* TSZ LP R116 / HaulStamp: LP-only correction trail simulation. No persistent record or invoice. */
(() => {
  'use strict';
  const ID='tsz-haulstamp-r116';
  const APP_ID='6798447816';
  const INITIAL=Object.freeze({wait:90,count:18});
  const WORDS={
    en:{eyebrow:'ACCOUNTABLE WORK RECORDS',tag:'INTERACTIVE ILLUSTRATION',headline:'Correct the record. Keep what changed.',lead:'An incorrect number should be corrected, not quietly overwritten. Try changing the waiting time and handled quantity, then save a reason in a visible revision trail.',before:'Recorded values',wait:'Waiting time',count:'Handled quantity',minutes:'min',items:'items',edit:'Correct this record',newWait:'Corrected waiting time · min',newCount:'Corrected quantity · items',reason:'Reason for correction',reasonPlaceholder:'e.g. Verified the loading slip',save:'Apply correction',reset:'Restart example',trail:'Revision history',trailEmpty:'No revisions yet. Original: 90 min and 18 items.',revision:'Revision',from:'Before',to:'After',reasonLabel:'Reason',saved:'Correction recorded in this page only.',unchanged:'Change at least one number before applying a correction.',invalid:'Enter waiting time from 0–1,440 minutes, quantity from 0–999,999, and a correction reason (1–120 characters).',limit:'This illustration allows up to 20 revisions; restart to try again.',note:'This is a simulated landing-page example—not a HaulStamp screenshot, actual work log, audit record, legal proof, or billing document. Entries exist in memory only and are lost on reload. The app itself may save real records and revision information.'},
    ja:{eyebrow:'後で説明できる作業記録',tag:'操作できる説明用サンプル',headline:'修正しても、前の記録は消さない。',lead:'数字が違っていたら、黙って上書きするのではなく、変更前・変更後・理由を残す。その流れを体験できます。',before:'現在の作業記録',wait:'荷待ち時間',count:'取扱個数',minutes:'分',items:'個',edit:'記録を訂正する',newWait:'訂正後の荷待ち時間・分',newCount:'訂正後の取扱個数・個',reason:'修正理由',reasonPlaceholder:'例：伝票と実数を再確認した',save:'訂正を反映する',reset:'初期サンプルに戻す',trail:'修正履歴',trailEmpty:'修正はまだありません。初期記録：90分・18個。',revision:'修正',from:'変更前',to:'変更後',reasonLabel:'修正理由',saved:'このページ内の履歴に記録しました。',unchanged:'変更する数値を少なくとも1つ入力してください。',invalid:'荷待ち0〜1,440分、取扱個数0〜999,999個、修正理由1〜120文字を入力してください。',limit:'デモの修正は最大20回です。もう一度試す場合は初期化してください。',note:'これはLP上の説明用シミュレーションで、HaulStampの実画面・実際の作業記録・正式な監査証跡・請求書ではありません。入力内容は保存されず、再読み込みで消えます。実アプリには記録と修正履歴の保存機能があります。'},
    ar:{eyebrow:'سجلات عمل يمكن مراجعتها',tag:'مثال تفاعلي توضيحي',headline:'صحّح السجل، واحتفظ بما تغيّر.',lead:'عندما يكون الرقم غير صحيح، لا تكتفِ باستبداله. جرّب توثيق القيم السابقة والجديدة وسبب التصحيح.',before:'السجل الحالي',wait:'وقت الانتظار',count:'عدد القطع',minutes:'دقيقة',items:'قطعة',edit:'تصحيح السجل',newWait:'وقت الانتظار المصحح · دقيقة',newCount:'العدد المصحح · قطعة',reason:'سبب التصحيح',reasonPlaceholder:'مثال: مطابقة البيانات مع المستند',save:'تطبيق التصحيح',reset:'استعادة المثال',trail:'سجل التعديلات',trailEmpty:'لا توجد تعديلات بعد. الأصل: 90 دقيقة و18 قطعة.',revision:'تعديل',from:'قبل',to:'بعد',reasonLabel:'السبب',saved:'سُجّل التصحيح داخل هذه الصفحة فقط.',unchanged:'غيّر رقمًا واحدًا على الأقل قبل حفظ التصحيح.',invalid:'أدخل 0–1440 دقيقة و0–999999 قطعة وسببًا للتصحيح من 1 إلى 120 حرفًا.',limit:'يسمح هذا المثال بعشرين تعديلًا كحد أقصى. أعد البدء للمحاولة مجددًا.',note:'هذا مثال توضيحي في صفحة التعريف وليس صورة فعلية من التطبيق أو سجل عمل حقيقيًا أو دليلًا قانونيًا أو فاتورة. لا تُحفظ البيانات وتُمسح عند إعادة تحميل الصفحة. يمكن للتطبيق الأصلي حفظ السجلات وسجل تصحيحاتها.'}
  };
  const pickLang=()=>{
    const menu=document.getElementById('p199-language');
    const raw=String(menu?.value||document.documentElement.lang||'en').toLowerCase().split(/[-_]/)[0];
    return Object.hasOwn(WORDS,raw)?raw:'en';
  };
  const fmt=(n,lang)=>new Intl.NumberFormat(lang==='ja'?'ja-JP':lang==='ar'?'ar-EG':'en-US',{maximumFractionDigits:0}).format(n);
  function mount(){
    const body=document.body;
    if(!body||(body.dataset.p199Id!==APP_ID&&body.dataset.p19AppId!==APP_ID))return;
    const anchor=document.getElementById('overview');
    if(!anchor||document.getElementById(ID))return;
    const root=document.createElement('section');root.id=ID;root.setAttribute('data-illustration','not-an-app-screenshot');
    root.innerHTML=`
      <div class="hs116-heading"><span class="hs116-eyebrow" data-copy="eyebrow"></span><span class="hs116-chip" data-copy="tag"></span></div>
      <h2 data-copy="headline"></h2><p class="hs116-intro" data-copy="lead"></p>
      <div class="hs116-grid">
        <div class="hs116-main">
          <div class="hs116-current"><span class="hs116-section-label" data-copy="before"></span>
            <div class="hs116-stats"><div><span data-copy="wait"></span><strong><b data-out="wait">90</b><small data-copy="minutes"></small></strong></div><div><span data-copy="count"></span><strong><b data-out="count">18</b><small data-copy="items"></small></strong></div></div>
          </div>
          <form class="hs116-form" novalidate><h3 data-copy="edit"></h3><div class="hs116-fields">
             <label><span data-copy="newWait"></span><input data-field="wait" type="number" inputmode="numeric" min="0" max="1440" step="1" value="105"></label>
             <label><span data-copy="newCount"></span><input data-field="count" type="number" inputmode="numeric" min="0" max="999999" step="1" value="20"></label>
          </div><label class="hs116-reason"><span data-copy="reason"></span><input data-field="reason" type="text" maxlength="120" value="" autocomplete="off"></label>
          <div class="hs116-actions"><button type="submit" data-action="save" data-copy="save"></button><button type="button" data-action="reset" data-copy="reset"></button></div>
          <p class="hs116-message" data-message role="status" aria-live="polite"></p></form>
        </div>
        <div class="hs116-trail"><div class="hs116-trail-title"><h3 data-copy="trail"></h3><span data-counter>0</span></div><p class="hs116-empty" data-empty></p><ol data-history aria-live="polite"></ol></div>
      </div><p class="hs116-note" data-copy="note"></p>`;
    anchor.insertAdjacentElement('afterend',root);
    let current={...INITIAL};let history=[];let messageKey='';
    const get=s=>root.querySelector(s);
    const value=k=>get(`[data-field="${k}"]`).value;
    function render(){
      const lang=pickLang(),t=WORDS[lang];root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-copy]').forEach(el=>{if(Object.hasOwn(t,el.dataset.copy))el.textContent=t[el.dataset.copy];});
      get('[data-out="wait"]').textContent=fmt(current.wait,lang);get('[data-out="count"]').textContent=fmt(current.count,lang);
      get('[data-counter]').textContent=fmt(history.length,lang);
      get('[data-field="reason"]').placeholder=t.reasonPlaceholder;
      get('[data-empty]').textContent=history.length?'':t.trailEmpty;
      get('[data-message]').textContent=messageKey?t[messageKey]:'';
      get('[data-message]').dataset.error=['invalid','unchanged','limit'].includes(messageKey)?'true':'false';
      const list=get('[data-history]');list.replaceChildren();
      [...history].reverse().forEach((entry)=>{
        const item=document.createElement('li');item.className='hs116-revision';
        const title=document.createElement('strong');title.textContent=t.revision+' #'+fmt(entry.index,lang);item.appendChild(title);
        const detail=document.createElement('div');detail.className='hs116-revision-numbers';
        const before=document.createElement('span');before.textContent=t.from+': '+fmt(entry.before.wait,lang)+t.minutes+' / '+fmt(entry.before.count,lang)+t.items;
        const after=document.createElement('span');after.textContent=t.to+': '+fmt(entry.after.wait,lang)+t.minutes+' / '+fmt(entry.after.count,lang)+t.items;
        detail.append(before,after);item.appendChild(detail);
        const reason=document.createElement('p');reason.textContent=t.reasonLabel+': '+entry.reason;item.appendChild(reason);list.appendChild(item);
      });
    }
    root.querySelector('form').addEventListener('submit',e=>{
      e.preventDefault();
      const waitRaw=value('wait').trim(),countRaw=value('count').trim(),reason=value('reason').trim();
      const wait=Number(waitRaw),count=Number(countRaw);
      if(!waitRaw||!countRaw||!Number.isInteger(wait)||!Number.isInteger(count)||wait<0||wait>1440||count<0||count>999999||reason.length<1||reason.length>120){messageKey='invalid';render();return;}
      if(history.length>=20){messageKey='limit';render();return;}
      if(wait===current.wait&&count===current.count){messageKey='unchanged';render();return;}
      const next={wait,count};history.push({index:history.length+1,before:{...current},after:{...next},reason});current=next;
      get('[data-field="reason"]').value='';messageKey='saved';render();
    });
    get('[data-action="reset"]').addEventListener('click',()=>{
      current={...INITIAL};history=[];get('[data-field="wait"]').value='105';get('[data-field="count"]').value='20';get('[data-field="reason"]').value='';messageKey='';render();
    });
    document.getElementById('p199-language')?.addEventListener('change',render);
    let lastLang=pickLang();new MutationObserver(()=>{const now=pickLang();if(now!==lastLang){lastLang=now;render();}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
