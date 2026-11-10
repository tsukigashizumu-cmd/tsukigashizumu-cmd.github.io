/* TSZ R89 / TwelveOath: fictional cancellation reply sequence, no contact or notification sent. */
(()=>{
  'use strict';
  const ID='tsz-twelveoath-r89';
  const COPY={
    en:{eyebrow:'CANCELLATION FOLLOW-UP · INTERACTIVE EXAMPLE',headline:'When a slot opens, know who comes next.',sub:'Try a one-at-a-time reply plan. Choose the slot time and how long you will wait before trying the next person.',slot:'Open slot time',wait:'Time to await a reply',mins:'min',plan:'Example follow-up plan',queue:'One person at a time',person:'Candidate',why:'Reason to reach out',deadline:'Example reply deadline',start:'Start with',after:'Then',third:'If needed',public:'Public notice is the next option',accepted:'The open slot is filled in this example',waiting:'Waiting for this person’s reply',notYet:'On standby',passed:'No reply in time',yes:'Simulate an accepted offer',no:'Simulate no reply → next',reset:'Reset example',done:'Confirmed',reasons:['Asked about a nearby time','Previously preferred this time','Requested an opening'],candidates:['Guest A','Guest B','Guest C'],foot:'Illustrative flow only, not the real app interface. These are fictional people. No messages are sent, no replies are received, and nothing is saved or transmitted. Actual outreach and response deadlines are your decisions.',nextDay:'next day',hours:'reply window'},
    ja:{eyebrow:'キャンセル対応 · 体験サンプル',headline:'空き枠が出たら、次に案内する一人を決めておく。',sub:'一斉連絡ではなく、一人ずつ返事を待つ流れを試せます。案内時刻と返事を待つ長さを変えてください。',slot:'空いた枠の時刻',wait:'返事を待つ時間',mins:'分',plan:'案内の手順サンプル',queue:'一人ずつ案内',person:'候補',why:'声をかける理由',deadline:'仮の返事期限',start:'まず',after:'その次',third:'必要なら',public:'次は公開案内を検討',accepted:'この例では空き枠が埋まりました',waiting:'この人の返事を待つ',notYet:'待機中',passed:'期限までに返事なし',yes:'承諾された例にする',no:'返事なし → 次の一人へ',reset:'初期値に戻す',done:'承諾済み',reasons:['近い時間帯を問い合わせていた','以前この時間帯を希望した','空きが出たら連絡を希望した'],candidates:['候補A','候補B','候補C'],foot:'説明用の架空デモです。実際のアプリ画面ではありません。登場人物は架空で、連絡・通知・回答受信は一切行いません。入力は保存・送信されません。実際の案内方法と期限は利用者が判断してください。',nextDay:'翌日',hours:'返信猶予'},
    ar:{eyebrow:'متابعة الإلغاء · مثال تفاعلي',headline:'عندما يتاح موعد، اعرف من تتواصل معه تالياً.',sub:'جرّب خطة للانتظار والانتقال إلى شخص واحد في كل مرة بدلاً من إرسال رسالة جماعية.',slot:'وقت الموعد المتاح',wait:'مدة انتظار الرد',mins:'دقيقة',plan:'خطة متابعة تجريبية',queue:'شخص واحد كل مرة',person:'المرشح',why:'سبب التواصل',deadline:'مهلة الرد التجريبية',start:'أولاً',after:'ثم',third:'عند الحاجة',public:'الخطوة التالية هي التفكير في إعلان عام',accepted:'تم شغل الموعد في هذا المثال',waiting:'بانتظار رد هذا الشخص',notYet:'في الانتظار',passed:'لم يصل رد في المهلة',yes:'محاكاة الموافقة',no:'محاكاة عدم الرد ← التالي',reset:'إعادة المثال',done:'مؤكد',reasons:['استفسر عن موعد قريب','فضّل هذا الوقت سابقاً','طلب التواصل عند وجود شاغر'],candidates:['الشخص أ','الشخص ب','الشخص ج'],foot:'هذا توضيح وليس واجهة التطبيق الفعلية. الأشخاص افتراضيون. لا تُرسل رسائل أو إشعارات، ولا تُستقبل ردود، ولا تُحفظ البيانات أو تُنقل. القرار الفعلي للتواصل ومهلة الانتظار يعود إليك.',nextDay:'اليوم التالي',hours:'مهلة الرد'}
  };
  const locale=()=>{const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en';};
  const initial=()=>({i:0,phase:'waiting'});
  const init=()=>{
    if(document.getElementById(ID))return;
    const host=document.querySelector('main')||document.body;if(!host)return;
    const sec=document.createElement('section');sec.id=ID;
    sec.innerHTML=`<div class="r89-shell"><header class="r89-head"><span class="r89-eyebrow" data-r89="eyebrow"></span><h2 data-r89="headline"></h2><p data-r89="sub"></p></header><div class="r89-layout"><div class="r89-controls"><label><span data-r89="slot"></span><input id="r89-slot" type="time" value="14:00"></label><label><span data-r89="wait"></span><select id="r89-wait"><option value="5">5</option><option value="10">10</option><option value="15" selected>15</option><option value="30">30</option></select></label><div class="r89-buttons"><button type="button" id="r89-no" data-r89="no"></button><button type="button" id="r89-yes" data-r89="yes"></button><button type="button" id="r89-reset" class="r89-outline" data-r89="reset"></button></div></div><div class="r89-preview" aria-live="polite"><div class="r89-preview-top"><h3 data-r89="plan"></h3><span data-r89="queue"></span></div><div class="r89-badge" id="r89-state"></div><div class="r89-feature"><small id="r89-who-label"></small><strong id="r89-who"></strong><span id="r89-reason"></span></div><div class="r89-time"><span data-r89="deadline"></span><strong id="r89-deadline"></strong></div><ol id="r89-steps" class="r89-steps"></ol></div></div><p class="r89-foot" data-r89="foot"></p></div>`;
    host.appendChild(sec);
    const get=id=>sec.querySelector('#r89-'+id);
    let state=initial();
    const timeMinutes=()=>{const v=get('slot').value;if(!/^\d{2}:\d{2}$/.test(v))return null;const [h,m]=v.split(':').map(Number);return h<24&&m<60?(h*60+m):null;};
    const deadline=(index,wait,t)=>{const min=t+(index+1)*wait;const h=String(Math.floor((min%1440)/60)).padStart(2,'0');const m=String(min%60).padStart(2,'0');return {text:`${h}:${m}`,plus:min>=1440};};
    function render(){
      const l=locale(),t=COPY[l],wait=Number(get('wait').value),start=timeMinutes();
      sec.lang=l;sec.dir=l==='ar'?'rtl':'ltr';
      sec.querySelectorAll('[data-r89]').forEach(n=>{const s=t[n.dataset.r89];if(typeof s==='string')n.textContent=s;});
      const i=state.i,phase=state.phase,publicStep=i>=3;
      const n=publicStep?null:t.candidates[i];
      get('state').textContent=phase==='accepted'?t.done:publicStep?t.public:t.waiting;
      get('who-label').textContent=publicStep?t.after:t.person;
      get('who').textContent=phase==='accepted'?t.accepted:publicStep?t.public:n;
      get('reason').textContent=publicStep?'':t.reasons[i];
      const d=start===null?null:deadline(Math.min(i,2),wait,start);
      get('deadline').textContent=(phase==='accepted'||publicStep||!d)?'—':`${d.text}${d.plus?' · '+t.nextDay:''}`;
      get('no').disabled=phase==='accepted'||publicStep;
      get('yes').disabled=phase==='accepted'||publicStep;
      get('steps').replaceChildren();
      for(let k=0;k<3;k++){
        const li=document.createElement('li');const active=phase!=='accepted'&&k===i;
        const mark=document.createElement('span');mark.className='r89-dot';mark.textContent=String(k+1);
        const body=document.createElement('div');const who=document.createElement('strong');who.textContent=t.candidates[k];
        const note=document.createElement('small');const kDeadline=start===null?null:deadline(k,wait,start);
        note.textContent=k<i?t.passed:(k===i?(phase==='accepted'?t.done:t.waiting):(t.notYet))+(kDeadline?` · ${kDeadline.text}${kDeadline.plus?' '+t.nextDay:''}`:'');
        body.append(who,note);li.append(mark,body);li.className=(active?'r89-active ': '')+(k<i?'r89-passed':'');get('steps').appendChild(li);
      }
      sec.classList.toggle('r89-finished',phase==='accepted'||publicStep);
    }
    get('no').addEventListener('click',()=>{if(state.phase==='waiting'&&state.i<3){state.i++;render();}});
    get('yes').addEventListener('click',()=>{if(state.phase==='waiting'&&state.i<3){state.phase='accepted';render();}});
    get('reset').addEventListener('click',()=>{get('slot').value='14:00';get('wait').value='15';state=initial();render();});
    ['slot','wait'].forEach(k=>get(k).addEventListener('input',render));
    new MutationObserver(changes=>{if(changes.some(x=>x.attributeName==='lang'))render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
