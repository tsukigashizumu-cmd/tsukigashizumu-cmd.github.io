/* R311 Jiiya Roll — isolated LP-only funds and team demo. No network, money or persistent data. */
(() => {
  'use strict';
  const ID = 'tsz-jiiya-r311';
  if (document.getElementById(ID)) return;
  const main = document.querySelector('main');
  if (!main) return;
  const dictionary = {
    en: {
      eyebrow: 'ONE ROLL, ONE STEP FORWARD', title: 'Your next teammate is one roll away.',
      lead: 'Roll the die, collect practice funds, hire a teammate, and make your next roll stronger.',
      language:'Demo language', stage:'01 / Roll the die', funds:'Practice funds', power:'Extra funds / roll', ready:'Ready to roll', after:'Rolled a',
      initial:'Every roll moves your team forward.', rolled:'You gained {n} funds.', hired:'{name} joined your team.', short:'Not enough funds yet. Roll again.',
      roll:'Roll the die', reset:'Start over', staff:'02 / Build your team', hire:'Hire · {n}', done:'Joined',
      staffnames:['Scout','Runner','Mechanic'], skills:['Adds +16 funds per roll','Adds +28 funds per roll','Adds +45 funds per roll'],
      summary:'You have {n} teammates. Each hire improves future rolls.', note:'LP-only mini experience. Values and staff are illustrative; no real-money betting or rewards. Data stays in this page until you leave.',
      earnings:'Roll {n} · total +{gain}',
    },
    ja: {
      eyebrow:'一振りから、チームが育つ',title:'次の仲間は、あと一振りかも。',
      lead:'サイコロを振って模擬資金を集める。仲間を雇うと、次の一振りが少し強くなる。',
      language:'デモの言語',stage:'01 / サイコロを振る',funds:'模擬資金',power:'1回あたりの追加資金',ready:'次の一振りを',after:'出た目',
      initial:'一振りずつ、仲間を増やそう。',rolled:'資金 +{n} を獲得。',hired:'{name} が仲間になりました。',short:'資金が足りません。もう一度振ろう。',
      roll:'サイコロを振る',reset:'最初から',staff:'02 / 仲間を雇う',hire:'雇う · {n}',done:'加入済み',
      staffnames:['偵察係','走り屋','整備士'],skills:['以後の一振りが +16','以後の一振りが +28','以後の一振りが +45'],
      summary:'現在の仲間は {n} 人。雇うほど次の一振りが強くなります。',note:'LP専用の簡易体験。資金・仲間の能力は説明用の仮設定です。現金・賭博・換金はありません。ページを閉じると消えます。',
      earnings:'{n} 回目の一振り · +{gain}',
    },
    ar: {
      eyebrow:'رميـة واحدة، وخطوة جديدة',title:'زميل جديد بعد رمية أخرى.',
      lead:'ارمِ النرد واجمع رصيدًا افتراضيًا، ثم عيّن زميلًا لتقوية الرميات التالية.',
      language:'لغة التجربة',stage:'01 / ارمِ النرد',funds:'رصيد تجريبي',power:'مكافأة لكل رمية',ready:'جاهز للرمي',after:'نتيجة الرمية',
      initial:'كل رمية تقرّبك من بناء فريقك.',rolled:'حصلت على {n} نقطة.',hired:'انضم {name} إلى الفريق.',short:'الرصيد غير كافٍ. ارمِ مرة أخرى.',
      roll:'ارمِ النرد',reset:'ابدأ من جديد',staff:'02 / كوّن فريقك',hire:'تعيين · {n}',done:'انضم',
      staffnames:['الكشاف','العدّاء','الميكانيكي'],skills:['يزيد العائد +16 لكل رمية','يزيد العائد +28 لكل رمية','يزيد العائد +45 لكل رمية'],
      summary:'لديك {n} من أعضاء الفريق. كل زميل يزيد عائد الرمية التالية.',
      note:'تجربة توضيحية للصفحة فقط. الأرقام والشخصيات افتراضية، ولا توجد مراهنات أو جوائز أو أموال حقيقية. لا تُحفظ البيانات بعد إغلاق الصفحة.',
      earnings:'الرمية {n} · زيادة {gain}',
    },
  };
  const STAFF = [{cost:75,boost:16},{cost:160,boost:28},{cost:280,boost:45}];
  const DOTS = [[4], [0,8], [0,4,8], [0,2,6,8], [0,2,4,6,8], [0,2,3,5,6,8]];
  const escapeHtml = v => String(v).replace(/[&<>"']/g, x => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
  const replace = (text, vars) => text.replace(/\{(\w+)\}/g, (_,key)=>String(vars[key] ?? ''));
  function initialLocale(){
    const q = new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en';
    return /^ar/i.test(q) ? 'ar' : /^ja/i.test(q) ? 'ja' : 'en';
  }
  let locale=initialLocale(), funds=0, bonus=0, last=1, lastGain=0, rolls=0, crew=[false,false,false], message='initial', messageVars={};
  const section=document.createElement('section'); section.id=ID;section.setAttribute('aria-label','Jiiya Roll demo');
  if(main.parentNode) main.insertAdjacentElement('afterend',section);
  else document.body.append(section);
  const $=sel=>section.querySelector(sel);
  function stageText(d){
    if(message==='rolled')return replace(d.rolled,messageVars);
    if(message==='hired')return replace(d.hired,{name:d.staffnames[messageVars.index]});
    return d[message]||d.initial;
  }
  function update(){
    const d=dictionary[locale];
    $('#jr-funds').textContent=String(funds);
    $('#jr-power').textContent='+'+bonus;
    $('#jr-die').replaceChildren(...Array.from({length:9},(_,i)=>{
      const p=document.createElement('span');p.className='jr-pip'+(DOTS[last-1].includes(i)?' on':'');return p;
    }));
    $('#jr-stage-title').textContent=rolls?`${d.after}: ${last}`:d.ready;
    $('#jr-stage-caption').textContent=rolls?replace(d.earnings,{n:rolls,gain:lastGain}):d.initial;
    $('#jr-status').textContent=stageText(d);
    $('#jr-summary').textContent=replace(d.summary,{n:crew.filter(Boolean).length});
    STAFF.forEach((s,i)=>{
      const b=$('#jr-hire-'+i);
      b.disabled=crew[i]||funds<s.cost;
      b.classList.toggle('jr-done',crew[i]);
      b.textContent=crew[i]?d.done:replace(d.hire,{n:s.cost});
    });
  }
  function render(){
    const d=dictionary[locale];
    section.setAttribute('dir',locale==='ar'?'rtl':'ltr');section.setAttribute('lang',locale);
    section.innerHTML=`<div class="jr-head"><div><p class="jr-eyebrow">${escapeHtml(d.eyebrow)}</p><h2>${escapeHtml(d.title)}</h2><p class="jr-lead">${escapeHtml(d.lead)}</p></div><label class="jr-langwrap">${escapeHtml(d.language)}<select id="jr-lang" aria-label="${escapeHtml(d.language)}"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label></div><div class="jr-layout"><div class="jr-panel"><p class="jr-caption">${escapeHtml(d.stage)}</p><div class="jr-statrow"><div class="jr-stat"><span>${escapeHtml(d.funds)}</span><strong id="jr-funds">0</strong></div><div class="jr-stat"><span>${escapeHtml(d.power)}</span><strong id="jr-power">+0</strong></div></div><div class="jr-stage"><div class="jr-die" id="jr-die" role="img" aria-label="Dice"></div><div class="jr-stagecopy"><strong id="jr-stage-title"></strong><span id="jr-stage-caption"></span></div></div><div class="jr-action"><button id="jr-roll" type="button">${escapeHtml(d.roll)}</button><button id="jr-reset" type="button">${escapeHtml(d.reset)}</button></div><p class="jr-status" id="jr-status" role="status" aria-live="polite"></p></div><div class="jr-panel"><p class="jr-caption">${escapeHtml(d.staff)}</p><div class="jr-hirelist">${STAFF.map((s,i)=>`<div class="jr-hire"><div><h3>${escapeHtml(d.staffnames[i])}</h3><p>${escapeHtml(d.skills[i])}</p></div><button id="jr-hire-${i}" type="button">${escapeHtml(replace(d.hire,{n:s.cost}))}</button></div>`).join('')}</div><p class="jr-hint" id="jr-summary"></p></div></div><p class="jr-note">${escapeHtml(d.note)}</p>`;
    $('#jr-lang').value=locale;
    $('#jr-lang').addEventListener('change',e=>{locale=e.target.value;render();});
    $('#jr-roll').addEventListener('click',()=>{
      last=1+Math.floor(Math.random()*6);rolls++;
      lastGain=20+last*18+bonus;funds+=lastGain;
      message='rolled';messageVars={n:lastGain};
      $('#jr-die').classList.toggle('jr-rolled',rolls%2===1);
      update();
    });
    $('#jr-reset').addEventListener('click',()=>{funds=bonus=rolls=lastGain=0;last=1;crew=[false,false,false];message='initial';messageVars={};update();});
    STAFF.forEach((s,i)=>$('#jr-hire-'+i).addEventListener('click',()=>{
      if(crew[i]||funds<s.cost){message='short';update();return;}
      funds-=s.cost;bonus+=s.boost;crew[i]=true;message='hired';messageVars={index:i};update();
    }));
    update();
  }
  render();
  const pageLang=document.getElementById('p199-language')||document.getElementById('p19-language');
  if(pageLang){pageLang.addEventListener('change',()=>{
    const v=pageLang.value||'';const next=/^ar/i.test(v)?'ar':/^ja/i.test(v)?'ja':/^en/i.test(v)?'en':null;
    if(next&&next!==locale){locale=next;render();}
  });}
})();
