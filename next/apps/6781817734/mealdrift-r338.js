/* TSZ LP R338 — MealDrift: illustrative in-memory dinner chooser. No storage or network. */
(()=>{
'use strict';
const ID='tsz-mealdrift-r338';
if(document.getElementById(ID))return;
const I={
 en:{brand:'MEALDRIFT / ONE LESS DECISION',eyebrow:'THE LAST DECISION OF THE DAY',title:'Too tired to decide dinner?',lead:'You made enough decisions today. Let the meals you chose on a better day come back when you need them.',hint:'YOUR EVENING, SIMPLIFIED',selected:'TONIGHT, YOU COULD HAVE',waiting:'One less thing to think about.',pick:'CHOOSE TONIGHT’S MEAL',again:'TRY ANOTHER',options:'YOUR SAVED OPTIONS',available:'AVAILABLE TONIGHT',skipped:'SKIPPED TONIGHT',skip:'Skip tonight',include:'Bring back',freq:'How often?',often:'Often',sometimes:'Sometimes',rarely:'Rarely',scene:'TRY A SITUATION',tired:'Exhausted evening',fridge:'Use what is there',family:'Dinner for everyone',add:'ADD A MEAL',placeholder:'e.g. Tomato soup',addBtn:'ADD TO THE LIST',empty:'Nothing is available. Bring an option back to continue.',validation:'Enter 1–40 characters, and avoid duplicates.',max:'This demo holds up to 10 meals.',reset:'RESET EXAMPLE',quick:'Quick',home:'Home',out:'Out',tag:'Type',freqHelp:'Three demonstration frequency levels. Picks here cycle through a weighted list; this is not the app’s algorithm.',legal:'Illustrative LP only. All options are examples; no actual MealDrift data is read. Results are a transparent, deterministic demonstration—not an app prediction. No meals or preferences are saved or sent.',note:'A choice from a list you already trust.',label:'MEAL PICKER',count:'options ready',notice:'This is an example, not an order or delivery service.',removed:'The option is skipped only for this preview.'},
 ja:{brand:'MEALDRIFT / 最後の決断を手放す',eyebrow:'今日の最後の決断',title:'もう、夕食を決める気力が残っていない。',lead:'今日は何度も選んだ。元気なときに考えた「食べたいもの」から、今夜の一品を決めよう。',hint:'今夜の選択を軽くする',selected:'今夜の候補',waiting:'もう一つ考えなくていい。',pick:'今夜の一品を選ぶ',again:'もう一度選ぶ',options:'登録しておいた候補',available:'今夜の対象',skipped:'今夜は除外',skip:'今夜は除外',include:'対象に戻す',freq:'選ばれやすさ',often:'多め',sometimes:'ふつう',rarely:'少なめ',scene:'場面を選ぶ',tired:'疲れた夜',fridge:'冷蔵庫を優先',family:'家族の夕食',add:'候補を追加',placeholder:'例：トマトスープ',addBtn:'候補に追加',empty:'対象の候補がありません。除外を解除してください。',validation:'1〜40文字で、重複しない名前を入力してください。',max:'このデモには最大10件まで追加できます。',reset:'例をリセット',quick:'手早く',home:'自炊',out:'外食',tag:'種類',freqHelp:'3段階の出現頻度は説明用です。デモは重みに応じて順番に選択します。実アプリの選び方そのものではありません。',legal:'LP専用の例です。MealDrift本体の登録内容は読み込みません。決定結果は説明用の再現可能な例であり、予測ではありません。保存・送信は行いません。',note:'自分で用意した候補から、今夜の一品を。',label:'献立の候補',count:'件の候補',notice:'注文や配達は行いません。',removed:'除外はこの画面内だけに反映されます。'},
 ar:{brand:'MEALDRIFT / قرار أقل',eyebrow:'القرار الأخير لهذا اليوم',title:'هل نفدت طاقتك لاختيار العشاء؟',lead:'اتخذت قرارات كثيرة اليوم. دع الوجبات التي اخترتها في يوم أفضل تساعدك هذه الليلة.',hint:'اجعل اختيار المساء أسهل',selected:'قد تختار الليلة',waiting:'قرار واحد أقل يشغل بالك.',pick:'اختر وجبة الليلة',again:'اختر مرة أخرى',options:'خياراتك المحفوظة',available:'متاحة الليلة',skipped:'مستبعدة الليلة',skip:'استبعد الليلة',include:'أعد الخيار',freq:'مدى تكرارها',often:'غالبًا',sometimes:'أحيانًا',rarely:'نادرًا',scene:'اختر موقفًا',tired:'مساء مرهق',fridge:'استخدم الموجود',family:'عشاء العائلة',add:'أضف وجبة',placeholder:'مثال: حساء الطماطم',addBtn:'أضف إلى القائمة',empty:'لا توجد خيارات متاحة. أعد أحد الخيارات للمتابعة.',validation:'أدخل اسمًا من 1 إلى 40 حرفًا دون تكرار.',max:'تتسع هذه التجربة لعشر وجبات.',reset:'أعد ضبط المثال',quick:'سريع',home:'منزلي',out:'مطعم',tag:'النوع',freqHelp:'المستويات الثلاثة للتوضيح فقط. تدور الخيارات هنا وفق أوزان ثابتة وليست خوارزمية التطبيق.',legal:'هذه تجربة توضيحية لصفحة العرض فقط. لا نقرأ بيانات MealDrift الحقيقية. النتائج أمثلة محددة قابلة للتكرار وليست تنبؤًا. لا يتم حفظ أي شيء أو إرساله.',note:'اختر من قائمة تثق بها مسبقًا.',label:'اختيار الوجبة',count:'خيارات جاهزة',notice:'هذه ليست خدمة طلب أو توصيل.',removed:'الاستبعاد يسري في هذه الصفحة فقط.'}
};
const MEALS={
 fried:{en:'Fried rice',ja:'チャーハン',ar:'أرز مقلي'},
 soup:{en:'Soup & toast',ja:'スープとトースト',ar:'حساء وخبز محمص'},
 pasta:{en:'Leftover pasta',ja:'残りのパスタ',ar:'بقايا المعكرونة'},
 eggs:{en:'Eggs & rice',ja:'卵かけご飯',ar:'بيض مع الأرز'},
 noodles:{en:'Noodles',ja:'麺料理',ar:'النودلز'},
 salad:{en:'Salad bowl',ja:'サラダボウル',ar:'طبق سلطة'},
 curry:{en:'Homemade curry',ja:'手作りカレー',ar:'كاري منزلي'},
 pizza:{en:'Pizza night',ja:'ピザ',ar:'بيتزا'},
 sandwich:{en:'Sandwiches',ja:'サンドイッチ',ar:'شطائر'},
 stew:{en:'Vegetable stew',ja:'野菜の煮込み',ar:'يخنة خضار'}
};
const PRESETS={
 tired:[['fried','quick',3],['soup','quick',2],['pasta','home',2],['eggs','quick',3],['noodles','home',1]],
 fridge:[['pasta','home',3],['eggs','quick',2],['stew','home',2],['salad','home',1]],
 family:[['curry','home',3],['pizza','out',2],['noodles','home',2],['sandwich','quick',1]]
};
const S={lang:'en',scene:'tired',items:[],round:0,winner:null,tag:'home'};
let root;
const q=s=>root.querySelector(s),all=s=>[...root.querySelectorAll(s)],t=()=>I[S.lang];
const name=m=>m.custom??MEALS[m.id]?.[S.lang]??m.id;
function seed(scene){S.scene=scene;S.round=0;S.winner=null;S.items=PRESETS[scene].map(([id,tag,weight])=>({id,tag,weight,skip:false}));q('[data-out="feedback"]').textContent='';q('[data-input="meal"]').value='';render();}
function eligible(){return S.items.filter(m=>!m.skip)}
function choose(){const list=eligible();if(!list.length){S.winner=null;render();return;}
 const weighted=list.flatMap(m=>Array.from({length:m.weight},()=>m.id));
 const pick=weighted[S.round%weighted.length];S.round+=1;S.winner=pick;render();}
function add(){const val=q('[data-input="meal"]').value.trim().replace(/\s+/g,' ');const l=Array.from(val).length;
 if(l<1||l>40||S.items.some(m=>name(m).toLocaleLowerCase()===val.toLocaleLowerCase())){q('[data-out="feedback"]').textContent=t().validation;return;}
 if(S.items.length>=10){q('[data-out="feedback"]').textContent=t().max;return;}
 const id='custom-'+Date.now()+'-'+S.items.length;
 S.items.push({id,custom:val,tag:S.tag,weight:2,skip:false});S.winner=null;q('[data-input="meal"]').value='';q('[data-out="feedback"]').textContent='';render();}
function mount(){if(document.getElementById(ID))return;
 root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','MealDrift interactive meal chooser');
 root.innerHTML=`<div class="md-shell"><div class="md-top"><span class="md-brand"><span aria-hidden="true" class="md-asterisk">✳</span><span data-t="brand"></span></span><div class="md-languages" role="group" aria-label="Language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></div><header class="md-hero"><p class="md-kicker" data-t="eyebrow"></p><h2 data-t="title"></h2><p class="md-lead" data-t="lead"></p></header><div class="md-main"><section class="md-resultpanel"><div class="md-paneltop"><span data-t="hint"></span><span class="md-statusline"><span class="md-statusdot"></span><span data-out="available">5</span> <span data-t="count"></span></span></div><div class="md-plate" aria-hidden="true"><div class="md-plateouter"><div class="md-plateinner"><span class="md-cutlery">✳</span><span class="md-dot md-dot-a"></span><span class="md-dot md-dot-b"></span><span class="md-dot md-dot-c"></span></div></div></div><p class="md-resultlabel" data-t="selected"></p><h3 class="md-winner" data-out="winner"></h3><p class="md-resultnote" data-t="note"></p><button type="button" class="md-pick" data-action="choose"><span data-t="pick"></span><span aria-hidden="true">↗</span></button><p class="md-plain" data-t="notice"></p></section><section class="md-controlpanel"><p class="md-sectionlabel" data-t="scene"></p><div class="md-scenes" role="group" aria-label="Sample list"><button type="button" data-scene="tired" data-t="tired"></button><button type="button" data-scene="fridge" data-t="fridge"></button><button type="button" data-scene="family" data-t="family"></button></div><div class="md-listtop"><span data-t="options"></span><button type="button" data-action="reset" data-t="reset"></button></div><ul class="md-list" data-out="list"></ul><div class="md-add"><label for="md338-meal" data-t="add"></label><div class="md-addrow"><input id="md338-meal" maxlength="80" data-input="meal" autocomplete="off"/><select aria-label="Type" data-input="tag"><option value="home" data-t="home"></option><option value="quick" data-t="quick"></option><option value="out" data-t="out"></option></select></div><button type="button" class="md-addbtn" data-action="add" data-t="addBtn"></button><p role="status" aria-live="polite" class="md-feedback" data-out="feedback"></p></div></section></div><footer class="md-footer"><p class="md-footerhead" data-t="freqHelp"></p><p class="md-legal" data-t="legal"></p></footer></div>`;
 (document.querySelector('main')||document.body).appendChild(root);
 all('[data-lang]').forEach(b=>b.addEventListener('click',()=>{S.lang=b.dataset.lang;render()}));
 all('[data-scene]').forEach(b=>b.addEventListener('click',()=>seed(b.dataset.scene)));
 q('[data-action="choose"]').addEventListener('click',choose);
 q('[data-action="reset"]').addEventListener('click',()=>seed(S.scene));
 q('[data-action="add"]').addEventListener('click',add);
 q('[data-input="tag"]').addEventListener('change',e=>{S.tag=e.target.value});
 q('[data-input="meal"]').addEventListener('keydown',e=>{if(e.key==='Enter')add()});
 q('[data-out="list"]').addEventListener('click',e=>{
  const b=e.target.closest('button[data-toggle]');if(!b)return;const m=S.items.find(x=>x.id===b.dataset.toggle);if(!m)return;m.skip=!m.skip;S.winner=null;S.round=0;render();
 });
 q('[data-out="list"]').addEventListener('change',e=>{
  if(!e.target.matches('select[data-weight]'))return;const m=S.items.find(x=>x.id===e.target.dataset.weight);if(!m)return;m.weight=Number(e.target.value);S.winner=null;S.round=0;render();
 });
 seed('tired');
}
function render(){root.lang=S.lang;root.dir=S.lang==='ar'?'rtl':'ltr';
 all('[data-t]').forEach(e=>{e.textContent=t()[e.dataset.t]||''});
 all('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===S.lang)));
 all('[data-scene]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scene===S.scene)));
 q('[data-input="meal"]').placeholder=t().placeholder;
 q('[data-out="available"]').textContent=String(eligible().length);
 q('[data-out="winner"]').textContent=S.winner?(name(S.items.find(m=>m.id===S.winner))):t().waiting;
 q('[data-action="choose"]').disabled=!eligible().length;
 q('[data-out="list"]').replaceChildren();
 S.items.forEach((m)=>{
  const li=document.createElement('li');li.className='md-item';li.dataset.skipped=String(m.skip);
  const left=document.createElement('div');left.className='md-itemleft';
  const dot=document.createElement('span');dot.className='md-categorydot';dot.dataset.tag=m.tag;dot.setAttribute('aria-hidden','true');
  const txt=document.createElement('div');txt.className='md-itemtext';
  const title=document.createElement('strong');title.textContent=name(m);
  const sub=document.createElement('span');sub.textContent=t()[m.tag];txt.append(title,sub);left.append(dot,txt);
  const select=document.createElement('select');select.className='md-weight';select.dataset.weight=m.id;select.setAttribute('aria-label',t().freq+' · '+name(m));
  for(const [w,key] of [[3,'often'],[2,'sometimes'],[1,'rarely']]){const opt=document.createElement('option');opt.value=w;opt.textContent=t()[key];opt.selected=m.weight===w;select.appendChild(opt)}
  const b=document.createElement('button');b.type='button';b.className='md-skip';b.dataset.toggle=m.id;b.textContent=m.skip?t().include:t().skip;b.setAttribute('aria-pressed',String(m.skip));
  li.append(left,select,b);q('[data-out="list"]').appendChild(li);
 });
 if(!eligible().length)q('[data-out="feedback"]').textContent=t().empty;
 else if(q('[data-out="feedback"]').textContent===I.en.empty||q('[data-out="feedback"]').textContent===I.ja.empty||q('[data-out="feedback"]').textContent===I.ar.empty)q('[data-out="feedback"]').textContent='';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
