/* Good Person Test R100: LP-only three-question sampler. No storage, network or actual diagnosis. */
(()=>{
'use strict';
const ID='tsz-goodperson-r100';
if(document.getElementById(ID)) return;
const mount=document.querySelector('main')||document.querySelector('[role="main"]')||document.body;
const root=document.createElement('section');
root.id=ID;
root.className='gp100';
root.setAttribute('aria-label','Good Person Test — three-question preview');
mount.appendChild(root);

const copy={
 ja:{
  eyebrow:'GOOD PERSON TEST · 3問の体験版', title:'その「いい人」は、誰のため？',
  intro:'選択に正解はありません。でも、選び直しはできません。ほんの3問で、自分の判断の癖を覗いてみてください。',
  badge:'質問',of:'／',label:'どれを選ぶ？',next:'次の質問へ',result:'この3問から見えた傾向',again:'最初から体験する',
  note:'LP専用の3問デモです。本編は10問・20タイプ。ここで表示する傾向は本編の正式な診断結果ではありません。データは保存・送信しません。',
  progress:'進行状況',your:'あなたが大切にしたもの',selected:'選び直しはできません。',
  end:'選んだのは、正しさではなく、あなたの優先順位。',
  things:['目の前の人','決まりごと','周りとの折り合い'],
  types:['まず助ける視点','原則を守る視点','折り合いを探す視点'],
  typeText:['困っている相手を見たら、先に動く。優しさの届く範囲を意識したくなる選び方です。','全員に同じルールを適用する。誰かだけが不利にならないかを考える選び方です。','ひとつの正しさを押しつけず、関係者が納得できる道を探す選び方です。'],
  questions:[
   {q:'急いでいる人に「列へ入れて」と頼まれた。',o:[['すぐに場所を譲る','その人の困りごと'],['列の順番を守ってもらう','並んでいる人の公平さ'],['前後の人に声をかけてみる','みんなの納得']]},
   {q:'同僚の小さなミスに、あなただけが気づいた。',o:[['そっと直しておく','今すぐ助ける'],['本人に事実を伝える','責任と透明性'],['一緒に直す方法を探す','続けやすい関係']]},
   {q:'友人が「応募の締切を特別に延ばせない？」と頼んできた。',o:[['友人の事情を優先する','目の前の友情'],['同じ締切だと伝える','参加者の平等'],['別の参加方法を一緒に探す','双方の折り合い']]}
  ]
 },
 en:{
  eyebrow:'GOOD PERSON TEST · 3-QUESTION PREVIEW',title:'Good for whom?',
  intro:'There is no right answer. But you cannot change your choice. Take a tiny look at the values guiding your decisions.',
  badge:'Question',of:'of',label:'What would you do?',next:'Next question',result:'Your tendency in these 3 questions',again:'Try again',
  note:'This is a 3-question LP demo, not the official result. The app has 10 questions and 20 possible types. Nothing is saved or sent.',
  progress:'Progress',your:'What you prioritized',selected:'Your choice cannot be changed.',
  end:'Your choices reflect priorities, not a verdict on goodness.',
  things:['The person nearby','A consistent rule','A workable compromise'],
  types:['Help-first lens','Principle-first lens','Compromise-first lens'],
  typeText:['You respond to someone in need before anything else. It may help to consider how far your kindness reaches.','You apply rules consistently and look out for anyone who might otherwise be treated unfairly.','You search for a path that different people can live with, rather than insisting on one answer.'],
  questions:[
   {q:'Someone in a queue asks to cut in because they are in a rush.',o:[['Let them go ahead','Their immediate need'],['Ask them to keep their place','Fairness to the queue'],['Check with the people nearby','A shared agreement']]},
   {q:'You notice a small mistake a coworker has made.',o:[['Fix it quietly','Immediate help'],['Tell them directly','Responsibility and clarity'],['Work on a fix together','An ongoing relationship']]},
   {q:'A friend asks you to extend a deadline just for them.',o:[['Make an exception','Your friend’s situation'],['Keep the same deadline','Equal treatment'],['Look for another option together','A workable alternative']]}
  ]
 },
 ar:{
  eyebrow:'GOOD PERSON TEST · تجربة من ٣ أسئلة',title:'لمن تكون لطيفًا؟',
  intro:'لا توجد إجابة صحيحة واحدة. لكن لا يمكنك تغيير اختيارك. جرّب ثلاثة مواقف لترى ما الذي تعطيه الأولوية.',
  badge:'السؤال',of:'من',label:'ماذا ستختار؟',next:'السؤال التالي',result:'ميولك في هذه الأسئلة الثلاثة',again:'ابدأ من جديد',
  note:'هذه تجربة توضيحية من ٣ أسئلة للصفحة فقط، وليست نتيجة رسمية. التطبيق الكامل يضم ١٠ أسئلة و٢٠ نمطًا. لا نحفظ أي بيانات ولا نرسلها.',
  progress:'التقدم',your:'ما أعطيته الأولوية',selected:'لا يمكن تغيير هذا الاختيار.',
  end:'تعكس اختياراتك أولوياتك، لا حكمًا على أخلاقك.',
  things:['الشخص أمامك','القواعد العادلة','التفاهم المشترك'],
  types:['مساعدة الآخرين أولًا','المبدأ أولًا','التفاهم أولًا'],
  typeText:['تبدأ بمساعدة المحتاج قبل أي شيء. وقد يكون من المفيد التفكير في أثر هذا القرار على الآخرين.','تحرص على تطبيق القواعد على الجميع حتى لا يُظلَم أحد.','تبحث عن حل يمكن للأطراف المختلفة قبوله بدل فرض إجابة واحدة.'],
  questions:[
   {q:'طلب منك شخص مستعجل أن يدخل أمامك في الطابور.',o:[['اسمح له بالتقدم','حاجته الآن'],['اطلب منه انتظار دوره','الإنصاف للجميع'],['اسأل الآخرين في الطابور','اتفاق مشترك']]},
   {q:'لاحظت خطأ صغيرًا ارتكبه زميلك.',o:[['أصلح الخطأ بهدوء','المساعدة الفورية'],['أخبره بالخطأ مباشرة','المسؤولية والوضوح'],['ابحثا عن حل معًا','الحفاظ على العلاقة']]},
   {q:'طلب منك صديق تمديد الموعد النهائي له وحده.',o:[['امنحه استثناءً','ظروف الصديق'],['التزم بالموعد للجميع','المساواة'],['ابحثا عن بديل معًا','حل يناسب الجميع']]}
  ]
 }
};
const state={index:0,choices:[],phase:'question'};
const esc=(s)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function language(){const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en';}
function render(){
 const lang=language(),t=copy[lang],rtl=lang==='ar';
 root.dir=rtl?'rtl':'ltr';root.lang=lang;
 const completed=state.choices.length;
 const pct=state.phase==='result'?100:Math.round((state.index/3)*100);
 let body='';
 if(state.phase==='result'){
   const totals=[0,0,0];state.choices.forEach(i=>{totals[i]++});
   // Tie-breaking uses the last choice in the tie, deterministically.
   const strongest=Math.max(...totals);
   const winner=[...state.choices].reverse().find(i=>totals[i]===strongest);
   body=`<div class="gp100-result" aria-live="polite"><span class="gp100-stamp">03 / 03</span><p class="gp100-mini">${esc(t.result)}</p><h3>${esc(t.types[winner])}</h3><p>${esc(t.typeText[winner])}</p><div class="gp100-summary" role="list">${state.choices.map((a,i)=>`<div role="listitem"><small>0${i+1}</small><strong>${esc(t.things[a])}</strong></div>`).join('')}</div><p class="gp100-end">${esc(t.end)}</p><button type="button" class="gp100-reset" data-action="reset">${esc(t.again)}</button></div>`;
 }else{
   const q=t.questions[state.index];const chosen=state.choices[state.index];
   body=`<div class="gp100-question"><div class="gp100-qtop"><span>${esc(t.badge)} <b>${state.index+1}</b> ${esc(t.of)} 3</span><span>${esc(t.label)}</span></div><h3>${esc(q.q)}</h3><div class="gp100-options" role="group" aria-label="${esc(t.label)}">${q.o.map(([answer,hint],i)=>`<button type="button" class="gp100-option${chosen===i?' is-chosen':''}" data-choice="${i}" ${chosen!==undefined?'disabled':''}><span class="gp100-letter">${'ABC'[i]}</span><span class="gp100-option-text"><strong>${esc(answer)}</strong><small>${esc(hint)}</small></span><span class="gp100-option-arrow" aria-hidden="true">↗</span></button>`).join('')}</div>${chosen!==undefined?`<div class="gp100-confirm" aria-live="polite"><span>✓ ${esc(t.your)}：${esc(t.things[chosen])}</span><small>${esc(t.selected)}</small><button type="button" class="gp100-next" data-action="next">${esc(t.next)} <span aria-hidden="true">→</span></button></div>`:''}</div>`;
 }
 root.innerHTML=`<div class="gp100-shell"><header class="gp100-head"><div class="gp100-identity"><span class="gp100-seal" aria-hidden="true">?</span><div><p class="gp100-eyebrow">${esc(t.eyebrow)}</p><h2>${esc(t.title)}</h2></div></div><p class="gp100-intro">${esc(t.intro)}</p></header><div class="gp100-meter"><span>${esc(t.progress)}</span><div class="gp100-meter-track" role="progressbar" aria-valuemin="0" aria-valuemax="3" aria-valuenow="${state.phase==='result'?3:state.index}" aria-label="${esc(t.progress)}"><span style="width:${pct}%"></span></div><span class="gp100-count">${state.phase==='result'?3:state.index+1} / 3</span></div>${body}<footer class="gp100-foot"><span class="gp100-foot-mark" aria-hidden="true">◇</span><p>${esc(t.note)}</p></footer></div>`;
}
root.addEventListener('click',event=>{
 const target=event.target.closest('button');if(!target||!root.contains(target))return;
 if(target.hasAttribute('data-choice')){
  if(state.phase!=='question'||state.choices[state.index]!==undefined)return;
  const n=Number(target.getAttribute('data-choice'));if(!Number.isInteger(n)||n<0||n>2)return;
  state.choices.push(n);render();return;
 }
 const action=target.getAttribute('data-action');
 if(action==='next'){
  if(state.phase!=='question'||state.choices[state.index]===undefined)return;
  if(state.index===2){state.phase='result';}else{state.index++;}
  render();root.querySelector('.gp100-result h3,.gp100-question h3')?.setAttribute('tabindex','-1');root.querySelector('.gp100-result h3,.gp100-question h3')?.focus({preventScroll:true});
 }else if(action==='reset'){state.index=0;state.choices=[];state.phase='question';render();}
});
const observer=new MutationObserver(muts=>{if(muts.some(m=>m.attributeName==='lang'||m.attributeName==='dir'))render();});
observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
render();
})();
