/* TSZ LP R351 — PromptDock AI: fictional reusable prompt builder, no storage, analytics or network. */
(()=>{'use strict';
const ID='tsz-promptdock-r351';if(document.getElementById(ID))return;
const T={
 en:{brand:'PROMPTDOCK / REUSABLE THINKING',eyebrow:'THE SAME TASK. A NEW DAY.',title:'Stop rewriting the same instruction.',lead:'You know what you need from AI. But every time, you type the context, the audience and the rules again. Keep the structure. Change only what matters.',tag:'REPEAT THE WORK, NOT THE TYPING',sub:'Choose a fictional task. Fill three fields. Watch the finished instruction assemble itself.',select:'01  CHOOSE A REUSABLE TASK',cases:['App update','Support reply','Product pitch'],panel:'02  FILL WHAT CHANGED TODAY',field1:'What should it accomplish?',field2:'Who is it for?',field3:'What must it respect?',preview:'03  READY-TO-USE PROMPT',words:'WORDS',copy:'Copy this prompt',copied:'Copied to clipboard',manual:'Select and copy the text',reset:'Reset this example',structure:'The format stays. The details change.',note:'This is a fictional, local landing-page demo illustrating reusable prompt fields. These example templates are not a claim about built-in presets. No ChatGPT call, account access, saved inputs, analytics, network requests or app connection. Text is not stored. Copy uses a local browser action only.',first:'Task',second:'Audience',third:'Constraints',last:'Return a clear, usable answer. Ask a brief question only if essential information is missing.',strap:'BUILD ONCE. REUSE THE STRUCTURE.',word:'words'},
 ja:{brand:'PROMPTDOCK / 指示文を再利用',eyebrow:'同じ仕事を、また一から？',title:'同じAIへの指示を、毎回書き直さない。',lead:'やりたいことは分かっている。それでも毎回、背景、対象者、守ってほしい条件を入力している。型は残して、今日違う部分だけを書き換えよう。',tag:'繰り返すのは仕事。入力ではない。',sub:'架空の仕事を選び、3項目を入力すると、完成した指示文がその場で組み上がります。',select:'01  再利用する仕事を選ぶ',cases:['アプリ更新','顧客への返信','商品の紹介'],panel:'02  今日変わった部分だけ入力',field1:'何を達成したい？',field2:'誰に向けた内容？',field3:'守ってほしい条件は？',preview:'03  完成した指示文',words:'語数',copy:'この指示文をコピー',copied:'クリップボードにコピーしました',manual:'テキストを選択してコピーしてください',reset:'この例を初期化',structure:'型は変えず、内容だけ変える。',note:'再利用できる入力欄を示すLP専用の架空デモです。例のテンプレートがアプリに標準搭載されているという意味ではありません。AIへの送信・保存・分析・外部通信・アプリ連携はありません。コピーはブラウザ内の操作だけです。',first:'依頼',second:'対象者',third:'条件',last:'すぐ使える明確な回答を作成してください。重要な情報が不足する場合だけ、簡潔に確認してください。',strap:'毎回、ゼロから始めない。',word:'語'},
 ar:{brand:'PROMPTDOCK / تعليمات قابلة لإعادة الاستخدام',eyebrow:'المهمة نفسها، يوم مختلف',title:'لا تكتب التعليمات نفسها كل مرة.',lead:'أنت تعرف ما تريده من الذكاء الاصطناعي، لكنك تعيد إدخال السياق والجمهور والشروط في كل مرة. احتفظ بالهيكل وغيّر ما يلزم فقط.',tag:'كرّر المهمة، لا الكتابة',sub:'اختر مهمة افتراضية وأكمل ثلاثة حقول لترى التعليمات تتكوّن فورًا.',select:'٠١  اختر مهمة قابلة لإعادة الاستخدام',cases:['تحديث التطبيق','رد على عميل','وصف المنتج'],panel:'٠٢  اكتب ما تغيّر اليوم',field1:'ما المطلوب إنجازه؟',field2:'لمن هذه الرسالة؟',field3:'ما القيود التي يجب مراعاتها؟',preview:'٠٣  نص التعليمات الجاهز',words:'كلمات',copy:'نسخ التعليمات',copied:'تم النسخ إلى الحافظة',manual:'حدّد النص وانسخه يدويًا',reset:'استعادة المثال',structure:'الهيكل ثابت، والتفاصيل تتغير.',note:'عرض توضيحي افتراضي لحقول التعليمات القابلة لإعادة الاستخدام. الأمثلة ليست وعدًا بقوالب مضمنة في التطبيق. لا يوجد اتصال بالذكاء الاصطناعي أو حساب أو حفظ أو تحليلات أو طلبات شبكة أو ربط بالتطبيق. لا يُحفظ النص. النسخ إجراء محلي في المتصفح فقط.',first:'المهمة',second:'الجمهور',third:'الشروط',last:'قدّم إجابة واضحة وقابلة للاستخدام. اسأل سؤالًا مختصرًا فقط إذا نقصت معلومات ضرورية.',strap:'أنشئ الهيكل مرة، واستخدمه مجددًا.',word:'كلمة'}
};
/* TSZ R381: Spanish es-ES/es-MX dictionaries; AI drafts / source-checked R379. */
Object.assign(T,window.TSZ_PD_R381_ES?.modules?.["promptdock-r351"]||{});
/* R382: source-mapped French drafts, fr-FR/fr-CA. */
Object.assign(T,window.TSZ_PD_R382_FR?.modules?.["promptdock-r351"]||{});
/* R383: de-DE translation drafts from R380 source + R383 completion. */
Object.assign(T,window.TSZ_PD_R383_DE?.modules?.["promptdock-r351"]||{});
/* R384: Italian drafts, all source-bound module strings. */
Object.assign(T,window.TSZ_PD_R384_IT?.modules?.["promptdock-r351"]||{});
Object.assign(T,window.TSZ_PD_R385_PT?.modules?.["promptdock-r351"]||{});
Object.assign(T,window.TSZ_PD_R386_ZH_HANS?.modules?.["promptdock-r351"]||{});
Object.assign(T,window.TSZ_PD_R387_ZH_HANT?.modules?.["promptdock-r351"]||{});
Object.assign(T,window.TSZ_PD_R388_KO?.modules?.["promptdock-r351"]||{});
Object.assign(T,window.TSZ_PD_R389_NL?.modules?.["promptdock-r351"]||{});
Object.assign(T,window.TSZ_PD_R390_ID?.modules?.["promptdock-r351"]||{});
Object.assign(T,window.TSZ_PD_R391_MS?.modules?.["promptdock-r351"]||{});
Object.assign(T,window.TSZ_PD_R392_TH?.modules?.["promptdock-r351"]||{});
Object.assign(T,window.TSZ_PD_R393_VI?.modules?.["promptdock-r351"]||{});
Object.assign(T.en,{phaseInput:'INPUT',phaseReuse:'REUSE',phaseReady:'READY',localDemo:'LOCAL DEMO'});
Object.assign(T.ja,{phaseInput:'入力',phaseReuse:'再利用',phaseReady:'完成',localDemo:'ページ内デモ'});
Object.assign(T.ar,{phaseInput:'الإدخال',phaseReuse:'إعادة الاستخدام',phaseReady:'جاهز',localDemo:'عرض تجريبي محلي'});
const sample={
 en:[['Write concise release notes for a shopping comparison app.','People who download utility apps for everyday errands.','Use plain English. Mention only verified changes. Under 120 words.'],['Reply to a customer whose purchase is not showing yet.','A first-time user who needs a calm, helpful answer.','Apologize briefly. Offer specific steps. Never promise an unverified refund.'],['Explain a price comparison tool in one sentence.','Shoppers comparing bulk and regular packages.','Lead with the problem. Avoid buzzwords. Under 25 words.']],
 ja:[['買い物比較アプリの更新内容を短くまとめる。','日々の買い物に使えるツールを探している人。','確認済みの変更だけを書く。平易な日本語で120文字程度。'],['購入が反映されないお客様への返信を作る。','初めてアプリを利用したお客様。','最初に短くお詫び。具体的な確認方法を書く。返金を断言しない。'],['単価比較ツールを一文で説明する。','通常サイズと大容量を比較している買い物客。','困りごとから始める。難しい用語を避ける。25語以内。']],
 ar:[['اكتب ملاحظات إصدار موجزة لتطبيق يقارن أسعار التسوق.','أشخاص يستخدمون أدوات مفيدة للمشتريات اليومية.','اكتب بلغة بسيطة. اذكر التغييرات المؤكدة فقط. أقل من 120 كلمة.'],['اكتب ردًا على عميل لم تظهر عملية شرائه بعد.','مستخدم جديد يحتاج إلى إرشادات واضحة وهادئة.','اعتذر بإيجاز. قدّم خطوات محددة. لا تعد باسترداد غير مؤكد.'],['اشرح أداة مقارنة سعر الوحدة في جملة واحدة.','متسوقون يقارنون العبوات العادية والكبيرة.','ابدأ بالمشكلة. تجنب المصطلحات الرنانة. أقل من 25 كلمة.']]
};
Object.assign(sample,window.TSZ_PD_R381_ES?.r351_samples||{});
Object.assign(sample,window.TSZ_PD_R382_FR?.r351_samples||{});
Object.assign(sample,window.TSZ_PD_R383_DE?.r351_samples||{});
Object.assign(sample,window.TSZ_PD_R384_IT?.r351_samples||{});
Object.assign(sample,window.TSZ_PD_R385_PT?.r351_samples||{});
Object.assign(sample,window.TSZ_PD_R386_ZH_HANS?.r351_samples||{});
Object.assign(sample,window.TSZ_PD_R387_ZH_HANT?.r351_samples||{});
Object.assign(sample,window.TSZ_PD_R388_KO?.r351_samples||{});
Object.assign(sample,window.TSZ_PD_R389_NL?.r351_samples||{});
Object.assign(sample,window.TSZ_PD_R390_ID?.r351_samples||{});
Object.assign(sample,window.TSZ_PD_R391_MS?.r351_samples||{});
Object.assign(sample,window.TSZ_PD_R392_TH?.r351_samples||{});
Object.assign(sample,window.TSZ_PD_R393_VI?.r351_samples||{});
let lang='en',scenario=0,values=[...sample.en[0]],dirty=false,root;
const $=s=>root.querySelector(s);const $$=s=>Array.from(root.querySelectorAll(s));
function makePrompt(){const t=T[lang];return [t.first+': '+values[0],t.second+': '+values[1],t.third+': '+values[2],t.last].join('\n\n')}
function countWords(s){return s.trim()?s.trim().split(/\s+/u).length:0}
function render(keepFocus=false){let focus=document.activeElement&&document.activeElement.dataset?document.activeElement.dataset.field:null;
 root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';const t=T[lang];
 $$('[data-i]').forEach(n=>n.textContent=t[n.dataset.i]);
 $$('[data-lang]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.lang===lang)));
 const row=$('[data-out="cases"]');row.replaceChildren();t.cases.forEach((v,i)=>{let b=document.createElement('button');b.type='button';b.className='pd-case';b.dataset.case=String(i);b.textContent=(i+1).toString().padStart(2,'0')+'  '+v;b.setAttribute('aria-pressed',String(i===scenario));b.addEventListener('click',()=>{scenario=i;values=[...sample[lang][i]];dirty=false;render()});row.append(b)});
 for(let i=0;i<3;i++){$('[data-field="'+i+'"]').value=values[i];}
 update();if(keepFocus&&focus!==undefined&&focus!==null){const n=$('[data-field="'+focus+'"]');if(n)n.focus()}
 if(window.TSZ_PD_R374&&!/^(?:es(?:-(?:ES|MX))?|fr(?:-(?:FR|CA))?|de(?:-DE)?|it(?:-IT)?|pt(?:-(?:BR|PT))?|zh-Hans|zh-Hant|ko(?:-KR)?|nl(?:-NL)?|id(?:-ID)?|ms(?:-MY)?|th(?:-TH)?|vi(?:-VN)?)$/i.test(document.getElementById('p19-language')?.value||''))window.TSZ_PD_R374.apply(root,document.getElementById('p19-language')?.value||'en-US');
}
window.TSZ_PD_R351_RENDER=()=>render();
function update(){const output=makePrompt();$('[data-out="prompt"]').value=output;$('[data-out="count"]').textContent=String(countWords(output));$('[data-out="copy-state"]').textContent='';}
function init(){root=document.createElement('section');root.id=ID;root.lang=lang;
 root.setAttribute('aria-label','PromptDock AI editable reusable prompt demo');
 root.innerHTML=`<div class="pd-shell"><header class="pd-head"><div class="pd-logo"><span class="pd-emblem" aria-hidden="true"><i></i><i></i><i></i></span><strong data-i="brand"></strong></div><nav class="pd-langs" aria-label="Language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button><button type="button" data-lang="es-ES">Español (ES)</button><button type="button" data-lang="es-MX">Español (MX)</button><button type="button" data-lang="fr-FR">Français (FR)</button><button type="button" data-lang="fr-CA">Français (CA)</button><button type="button" data-lang="de-DE">Deutsch</button><button type="button" data-lang="it">Italiano</button><button type="button" data-lang="pt-BR">Português (BR)</button><button type="button" data-lang="pt-PT">Português (PT)</button><button type="button" data-lang="zh-Hans">简体中文</button><button type="button" data-lang="zh-Hant">繁體中文</button><button type="button" data-lang="ko">한국어</button><button type="button" data-lang="nl-NL">Nederlands</button><button type="button" data-lang="id">Bahasa Indonesia</button><button type="button" data-lang="ms">Bahasa Melayu</button><button type="button" data-lang="th">ไทย</button><button type="button" data-lang="vi">Tiếng Việt</button></nav></header><div class="pd-grid"><div class="pd-story"><div class="pd-eyebrow" data-i="eyebrow"></div><h2 data-i="title"></h2><p class="pd-lead" data-i="lead"></p><div class="pd-metaphor"><div class="pd-stacks" aria-hidden="true"><span>01<span class="pd-small-line"></span><span data-i="phaseInput">INPUT</span></span><span>02<span class="pd-small-line"></span><span data-i="phaseReuse">REUSE</span></span><span>03<span class="pd-small-line"></span><span data-i="phaseReady">READY</span></span></div><strong data-i="tag"></strong><p data-i="sub"></p></div><div class="pd-selector"><b data-i="select"></b><div data-out="cases" class="pd-cases"></div></div><p class="pd-strap" data-i="strap"></p></div><div class="pd-editor"><div class="pd-editor-title"><span data-i="panel"></span><span class="pd-status"><i></i> <span data-i="localDemo">LOCAL DEMO</span></span></div><div class="pd-fields"><label><span data-i="field1"></span><textarea data-field="0" rows="2" maxlength="500"></textarea></label><label><span data-i="field2"></span><textarea data-field="1" rows="2" maxlength="500"></textarea></label><label><span data-i="field3"></span><textarea data-field="2" rows="2" maxlength="500"></textarea></label></div><div class="pd-result"><header><span data-i="preview"></span><span class="pd-words"><b data-out="count">0</b> <span data-i="words"></span></span></header><textarea data-out="prompt" readonly rows="8" aria-label="Generated prompt preview"></textarea><button type="button" class="pd-copy" data-copy><span data-i="copy"></span><span>↗</span></button><div class="pd-copy-feedback" data-out="copy-state" role="status" aria-live="polite"></div></div><button type="button" class="pd-reset" data-reset><span data-i="reset"></span><b>↺</b></button></div></div><footer class="pd-footer"><strong data-i="structure"></strong><p data-i="note"></p></footer></div>`;
 (document.querySelector('main')||document.body).append(root);
 $$('[data-lang]').forEach(b=>b.addEventListener('click',()=>{const next=b.dataset.lang;if(next===lang)return;const wasDirty=dirty;lang=next;if(!wasDirty){values=[...sample[lang][scenario]]}render()}));
 $$('[data-field]').forEach(n=>n.addEventListener('input',()=>{values[Number(n.dataset.field)]=n.value;dirty=true;update()}));
 $('[data-reset]').addEventListener('click',()=>{values=[...sample[lang][scenario]];dirty=false;render()});
 $('[data-copy]').addEventListener('click',()=>{const box=$('[data-out="prompt"]');box.focus();box.select();let ok=false;try{ok=document.execCommand('copy')}catch(e){ok=false}const feedback=$('[data-out="copy-state"]');feedback.textContent=ok?T[lang].copied:T[lang].manual});
 render();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
