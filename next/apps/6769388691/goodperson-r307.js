/* R307 — Good Person Test: a one-question LP sample, NOT the application's 20-type scoring. */
(function(){'use strict';
  const ID='tsz-goodperson-r307';
  if(document.getElementById(ID))return;
  const root=document.createElement('section'); root.id=ID;root.setAttribute('aria-label','Good Person Test, one-question sample');
  const parent=document.querySelector('main#p199-content')||document.querySelector('main')||document.body;
  const hero=parent.querySelector('section#top');
  if(hero && hero.parentNode===parent)hero.insertAdjacentElement('afterend',root);else parent.appendChild(root);
  root.innerHTML=`<div class="gp-shell"><div class="gp-head"><div><p class="gp-kicker">GOOD PERSON TEST / ONE QUESTION</p><h2 data-gp="title"></h2><p class="gp-sub" data-gp="sub"></p></div><div class="gp-langs" aria-label="Demo language"><button type="button" data-gp-lang="en">EN</button><button type="button" data-gp-lang="ja">日本語</button><button type="button" data-gp-lang="ar">العربية</button></div></div><div class="gp-story" data-gp="story"><p class="gp-step" data-gp="step"></p><h3 data-gp="question"></h3><div class="gp-answers" role="group" aria-label="Three choices"><button type="button" class="gp-answer" data-choice="0"><span class="gp-letter">A</span><span class="gp-answer-text"></span></button><button type="button" class="gp-answer" data-choice="1"><span class="gp-letter">B</span><span class="gp-answer-text"></span></button><button type="button" class="gp-answer" data-choice="2"><span class="gp-letter">C</span><span class="gp-answer-text"></span></button></div><div class="gp-result" data-gp="result" role="status" aria-live="polite"><p class="gp-result-label" data-gp="resultLabel"></p><h4 data-gp="resultTitle"></h4><p data-gp="resultBody"></p></div><div class="gp-bottom"><button type="button" class="gp-again" data-gp="again"></button><a class="gp-store" href="https://apps.apple.com/us/app/id6769388691" target="_blank" rel="noopener noreferrer" data-gp="store"></a></div></div><p class="gp-footnote" data-gp="note"></p></div>`;
  const content={
    en:{title:'When kindness has a cost.',sub:'You have three choices. What would a “good person” do? Choose one—then consider who benefits.',step:'01 / A SAMPLE DILEMMA',question:'A coworker is missing a deadline. They ask you to finish their work. What do you do?',choices:['Stay late and finish it for them.','Ask what they need and split the work fairly.','Talk to the team about changing the impossible deadline.'],results:[['The rescuer','You helped tonight. But who carries tomorrow’s extra work?'],['The negotiator','You helped while leaving room for their responsibility. Is that always enough?'],['The system fixer','You looked beyond one person. But a solution for everyone may take longer.']],resultLabel:'ONE POSSIBLE READING — NOT A DIAGNOSIS',again:'Try the sample again',store:'Explore all 10 questions in the app',note:'An original LP example, not an official quiz question or the app’s 20-type diagnosis. No answers are saved or sent.'},
    ja:{title:'その親切は、誰のため？',sub:'「良い人」ならどう答える？ 3つの選択肢から、一つだけ選んでみよう。',step:'01 / ひとつの問い',question:'同僚が締切に間に合いません。「代わりに仕上げて」と頼まれました。どうする？',choices:['残業して、自分が代わりに仕上げる。','必要なことを聞いて、負担を公平に分ける。','なぜ無理な締切になったのか、チームに相談する。'],results:[['引き受ける人','今夜は助けられた。でも、明日も同じ負担を抱えないだろうか。'],['分け合う人','相手の責任も尊重しながら助けた。ただ、それで本当に解決する？'],['仕組みを変える人','一人ではなく全体を見た。でも、今日の締切には間に合うだろうか。']],resultLabel:'ひとつの見方・診断結果ではありません',again:'もう一度、試す',store:'App Storeで10問の診断を見る',note:'LP専用のオリジナル例題です。実アプリの設問・20タイプ診断とは異なります。回答は保存・送信しません。'},
    ar:{title:'لمن تكون هذه المساعدة؟',sub:'ثلاثة اختيارات. ماذا سيفعل «الشخص الجيد»؟ اختر واحدًا وفكّر في أثره.',step:'01 / سؤال تجريبي',question:'زميلك لن ينهي عمله في الموعد، ويطلب منك إكماله بدلًا منه. ماذا تفعل؟',choices:['أبقى بعد الدوام وأنهي عمله.','أسأل عن حاجته ونقسم العمل بعدل.','أناقش مع الفريق سبب الموعد غير الواقعي.'],results:[['المنقذ','ساعدت الليلة، ولكن من سيتحمّل العمل الإضافي غدًا؟'],['المتعاون','ساعدت مع الحفاظ على مسؤولية الطرف الآخر. هل يكفي ذلك؟'],['مغيّر النظام','فكرت في الفريق كله، لكن تغيير النظام قد يتطلب وقتًا.']],resultLabel:'قراءة محتملة — وليست تشخيصًا',again:'جرّب المثال مجددًا',store:'اكتشف الأسئلة العشرة في App Store',note:'هذا مثال أصلي للصفحة، وليس سؤالًا من التطبيق أو نتيجة أنواعه العشرين. لا تُحفظ الإجابات ولا تُرسل.'}
  };
  let lang='en',choice=null;
  function defaultLang(){const selected=document.getElementById('p199-language');const v=(selected&&selected.value||document.documentElement.lang||'en').toLowerCase();return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en';}
  function render(){const t=content[lang];root.setAttribute('lang',lang);root.querySelector('.gp-shell').setAttribute('dir',lang==='ar'?'rtl':'ltr');
    ['title','sub','step','question','resultLabel','again','store','note'].forEach(k=>{root.querySelector('[data-gp="'+k+'"]').textContent=t[k]});
    const buttons=Array.from(root.querySelectorAll('[data-choice]'));
    buttons.forEach((btn,i)=>{btn.querySelector('.gp-answer-text').textContent=t.choices[i];btn.disabled=choice!==null;btn.setAttribute('aria-pressed',String(choice===i));});
    const result=root.querySelector('[data-gp="result"]');result.dataset.visible=String(choice!==null);
    if(choice!==null){root.querySelector('[data-gp="resultTitle"]').textContent=t.results[choice][0];root.querySelector('[data-gp="resultBody"]').textContent=t.results[choice][1];}
    root.querySelector('[data-gp="again"]').disabled=choice===null;
    root.querySelectorAll('[data-gp-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gpLang===lang)));
  }
  root.addEventListener('click',event=>{const t=event.target.closest('button');if(!t||!root.contains(t))return;
    if(t.hasAttribute('data-gp-lang')){lang=t.dataset.gpLang;render();return;}
    if(t.hasAttribute('data-choice')&&choice===null){choice=Number(t.dataset.choice);render();return;}
    if(t.hasAttribute('data-gp')&&t.dataset.gp==='again'){choice=null;render();}
  });
  lang=defaultLang();render();
})();
