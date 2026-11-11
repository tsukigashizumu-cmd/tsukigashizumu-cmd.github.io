/* Good Person Test R142: illustrative three-choice, forward-only LP demo. No storage, account, network or actual diagnosis. */
(()=>{
'use strict';
const ID='tsz-goodperson-r142';
if(document.getElementById(ID))return;
const params=new URLSearchParams(location.search);
const selector=document.getElementById('p199-language');
function locale(raw){const v=(raw||'en').toLowerCase();return v.startsWith('ar')?'ar':v.startsWith('ja')?'ja':'en';}
let lang=locale(params.get('lang')||(selector&&selector.value)||document.documentElement.lang||navigator.language);
const data={
 ja:{k:'GOOD PERSON TEST · 選択体験',title:'「いい人」の答えは、一つじゃない。',lead:'目の前の人を助ける？ ルールを守る？ 仕組みを変える？ 3つの見本問題で、戻れない選択を試してみよう。',sample:'LP専用・3問の見本',total:'実際のアプリは10問・各3択・20タイプ',q:'問題',of:'／',step:'選択は一度きり',lock:'確定すると前の問題には戻れません',finish:'3つの選択が確定しました',endLead:'正解探しではなく、自分が何を優先するかを見つめる体験です。',review:'選択の足跡',restart:'見本を最初から試す',note:'これはLP専用に作った架空の3問であり、実アプリの問題文・判定ロジック・20種類の診断結果を再現するものではありません。回答は保存・送信されず、再読み込み時に消えます。',chosen:'確定',locked:'前の回答は変更できません',next:'次の問題へ',start:'まだ回答はありません',prompt:[
 '列に並んでいた人が困っている。あなたなら？',
 '知り合いが順番を抜かした。あなたなら？',
 '話し合いから一人が取り残されている。あなたなら？'],
 choices:[['すぐ近くに行って手伝う','案内できる人を呼ぶ','困る人が減る仕組みを考える'],['本人にそっと伝える','周囲への影響を先に整える','順番を守れるルールを提案する'],['本人に声をかける','みんなに状況を共有する','参加できる進め方を考える']]},
 en:{k:'GOOD PERSON TEST · CHOICE PREVIEW',title:'There isn’t just one way to be “good.”',lead:'Help the person, follow the rules, or improve the system? Try three sample questions where every choice is final.',sample:'Website-only 3-question sample',total:'The actual app has 10 questions, 3 options each, and 20 types',q:'Question',of:'of',step:'One choice per question',lock:'Once chosen, you cannot go back to that question',finish:'Your three choices are final',endLead:'This is about what you prioritize, not finding the single correct answer.',review:'Your choice trail',restart:'Restart this website sample',note:'These three questions were invented for this landing page. They do not reproduce the app’s actual questions, scoring, or 20 result types. No answers are stored or transmitted; reloading clears them.',chosen:'Locked choice',locked:'Past answers cannot be changed',next:'Next question',start:'No answers yet',prompt:[
 'Someone in a line needs help. What do you do?',
 'A friend cuts the line. What do you do?',
 'One person is left out of a group discussion. What do you do?'],
 choices:[['Help the person right away','Find someone who can guide them','Think of a system that helps more people'],['Speak privately with your friend','Help reduce the disruption','Suggest a clearer queue rule'],['Invite the person to speak','Tell the group what you noticed','Improve how the discussion is run']]},
 ar:{k:'اختبار الشخص الطيب · تجربة الاختيار',title:'ليست هناك طريقة واحدة لتكون «طيبًا».',lead:'هل تساعد شخصًا، أم تحافظ على القواعد، أم تغيّر النظام؟ جرّب ثلاثة أسئلة توضيحية، وكل اختيار فيها نهائي.',sample:'مثال بثلاثة أسئلة على صفحة الويب',total:'التطبيق الفعلي: 10 أسئلة، 3 خيارات لكل سؤال، و20 نمطًا',q:'السؤال',of:'من',step:'اختيار واحد لكل سؤال',lock:'بعد الاختيار لا يمكنك العودة إلى السؤال السابق',finish:'تم تثبيت اختياراتك الثلاثة',endLead:'الفكرة ليست البحث عن إجابة واحدة صحيحة، بل معرفة ما تعطيه الأولوية.',review:'أثر اختياراتك',restart:'إعادة المثال من البداية',note:'الأسئلة الثلاثة من ابتكار صفحة الويب، ولا تعيد إنتاج أسئلة التطبيق أو طريقة التقييم أو أنماطه العشرين. لا تُحفظ الإجابات ولا تُرسل، وتُمسح عند إعادة تحميل الصفحة.',chosen:'اختيار مؤكد',locked:'لا يمكن تغيير الإجابات السابقة',next:'السؤال التالي',start:'لا توجد إجابات بعد',prompt:[
 'شخص في طابور يحتاج إلى مساعدة. ماذا تفعل؟',
 'تجاوز صديقك دوره في الطابور. ماذا تفعل؟',
 'استُبعد شخص من نقاش المجموعة. ماذا تفعل؟'],
 choices:[['أساعده فورًا','أطلب المساعدة ممن يستطيع إرشاده','أفكر في نظام يساعد أشخاصًا أكثر'],['أتحدث مع صديقي على انفراد','أخفف الارتباك في المكان','أقترح قاعدة أوضح للطابور'],['أدعوه للمشاركة','أنبه المجموعة لما لاحظته','أحسّن طريقة إدارة النقاش']]}
};
const state={answers:[],step:0};
const section=document.createElement('section');section.id=ID;section.setAttribute('aria-labelledby','gp142-title');
const mount=document.querySelector('#p199-content .p199-body')||document.querySelector('#p199-content')||document.querySelector('main')||document.body;
mount.appendChild(section);
function render(){
 const w=data[lang];const step=state.step;const done=step===3;
 section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';
 const trail=state.answers.map((choice,i)=>`<li class="gp142-trail-item"><span class="gp142-trail-index">${String(i+1).padStart(2,'0')}</span><span class="gp142-trail-copy"><small>${w.chosen}</small><strong>${w.choices[i][choice]}</strong></span><span class="gp142-padlock" aria-hidden="true">●</span></li>`).join('');
 const options=!done?w.choices[step].map((name,i)=>`<button type="button" class="gp142-choice" data-gp142-choice="${i}"><span class="gp142-letter">${'ABC'[i]}</span><span class="gp142-option-label">${name}</span><span class="gp142-arr" aria-hidden="true">›</span></button>`).join(''):'';
 section.innerHTML=`
 <div class="gp142-head"><p class="gp142-kicker">${w.k}</p><h2 id="gp142-title">${w.title}</h2><p class="gp142-lead">${w.lead}</p><p class="gp142-spec">${w.total}</p></div>
 <div class="gp142-grid"><div class="gp142-stage"><div class="gp142-stage-top"><span class="gp142-eyebrow">${w.sample}</span><span class="gp142-count">${w.q} <b>${done?'03':String(step+1).padStart(2,'0')}</b> ${w.of} 03</span></div>
 <div class="gp142-progress" role="progressbar" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${step}" aria-label="${w.q}"><span style="width:${step/3*100}%"></span></div>
 ${done?`<div class="gp142-finished"><span class="gp142-complete" aria-hidden="true">✓</span><h3>${w.finish}</h3><p>${w.endLead}</p></div>`:`<div class="gp142-question"><span class="gp142-overline">${w.step}</span><h3>${w.prompt[step]}</h3><div class="gp142-options">${options}</div></div>`}
 <div class="gp142-lockline"><span aria-hidden="true">⌁</span><span>${done?w.locked:w.lock}</span></div></div>
 <aside class="gp142-history" aria-label="${w.review}"><h3>${w.review}</h3>${trail?`<ol class="gp142-trail">${trail}</ol>`:`<p class="gp142-empty">${w.start}</p>`}<button type="button" class="gp142-restart" id="gp142-restart">${w.restart}</button></aside></div>
 <p class="gp142-disclaimer">${w.note}</p><p class="gp142-live" role="status" aria-live="polite" id="gp142-live"></p>`;
 section.querySelectorAll('[data-gp142-choice]').forEach(button=>button.addEventListener('click',()=>{
  if(state.step!==state.answers.length||state.step>=3)return;
  state.answers.push(Number(button.dataset.gp142Choice));state.step++;
  render();section.querySelector('#gp142-live').textContent=data[lang].locked;
 }));
 section.querySelector('#gp142-restart').addEventListener('click',()=>{state.answers=[];state.step=0;render();});
}
if(selector){selector.addEventListener('change',()=>{lang=locale(selector.value);render();});}
render();
})();
