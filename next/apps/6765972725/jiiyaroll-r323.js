/* TSZ LP R323 — Jiiya Roll / dice-to-crew fictional demonstration. No external I/O. */
(function () {
  'use strict';
  const ID = 'jr323';
  if (document.getElementById(ID)) return;
  const copy = {
    en: {
      kicker:'A 24-HOUR GAME OF MOMENTUM', title:'One more roll. One more person on your team.',
      intro:'The first die roll looks small. Then you collect, recruit and see how far a growing team can take you. Try a tiny illustrative version below.',
      demo:'INTERACTIVE DEMO', mock:'Illustration only · not the game engine', roll:'Roll the die', hire:'Hire a helper', reset:'Start again',
      funds:'Demo funds', crew:'Crew size', rolls:'Rolls made', last:'Latest roll', available:'A helper costs 12 demo funds',
      note:'In this demonstration, a roll earns double the die value plus 2 for each helper. These invented numbers are not official game rules.',
      example:'Try a starting point', scenarios:['First roll','Ready to recruit','Team growing'],
      eventInitial:'Give the die a roll to begin.', eventRoll:'You rolled {n}: +{gain} demo funds.',
      eventHire:'A new helper joined. Future rolls earn a demo bonus.', eventPoor:'Not enough demo funds yet. Roll again.',
      gainLabel:'EXAMPLE REWARD', math:'Die {n} × 2 + crew bonus {bonus} = {gain}',
      timeline:'24-hour run', session:'The app has a 24-hour run. This short LP demo does not simulate time, saved progress or the full game.',
      caveat:'Jiiya Roll is a casual dice-and-staff game. No real money, betting, cash prizes, or cash-out. This page shows illustrative toy rules and saves nothing.',
      currency:'demo funds', ready:'Ready', blocked:'Need {need} more', hired:'Hire available'
    },
    ja: {
      kicker:'24時間の成長ゲーム', title:'あと一振り。それが仲間を増やす。',
      intro:'はじめは小さなサイコロの一振り。資金を集め、スタッフを迎え、チームが育っていく楽しさを、LP用の小さな例で体験できます。',
      demo:'操作できる体験例', mock:'説明用の例・実ゲームの計算とは異なります', roll:'サイコロを振る', hire:'スタッフを雇う', reset:'最初から',
      funds:'例の資金', crew:'スタッフ人数', rolls:'振った回数', last:'直前の目', available:'スタッフ採用には例の資金12が必要',
      note:'この例では「サイコロの目×2＋スタッフ1人につき2」を獲得します。実際のゲームの計算ルールではありません。',
      example:'開始状態を選ぶ', scenarios:['最初の一振り','採用できる状態','チーム成長中'],
      eventInitial:'まずサイコロを振ってみましょう。', eventRoll:'{n}が出ました。例の資金が{gain}増加。',
      eventHire:'スタッフが1人増えました。次から例の加算があります。', eventPoor:'まだ資金が足りません。もう一度振ってみましょう。',
      gainLabel:'例の獲得額', math:'出目{n}×2＋仲間ボーナス{bonus}＝{gain}',
      timeline:'24時間のプレイ', session:'本体は24時間の進行が特徴です。このLP体験は時間や進捗の保存、実際のゲーム全体を再現しません。',
      caveat:'Jiiya Rollはサイコロとスタッフ採用を楽しむカジュアルゲームです。実際のお金を賭けたり、現金の賞品・換金を得る機能はありません。ここは架空の例で、情報を保存しません。',
      currency:'例の資金', ready:'準備OK', blocked:'あと{need}必要', hired:'採用できます'
    },
    ar: {
      kicker:'لعبة تقدم خلال 24 ساعة', title:'رمية أخرى. ومساعد جديد في فريقك.',
      intro:'تبدأ برمية نرد صغيرة، ثم تجمع الموارد وتضم مساعدين لترى كيف ينمو فريقك. جرّب مثالاً مصغّراً توضيحياً هنا.',
      demo:'مثال تفاعلي', mock:'للتوضيح فقط · ليست آلية اللعبة الأصلية', roll:'ارمِ النرد', hire:'وظّف مساعداً', reset:'ابدأ من جديد',
      funds:'رصيد تجريبي', crew:'عدد المساعدين', rolls:'عدد الرميات', last:'نتيجة الرمية', available:'تكلفة المساعد 12 نقطة تجريبية',
      note:'في هذا المثال المبتكر فقط: قيمة النرد × 2 مع نقطتين إضافيتين لكل مساعد. هذه ليست قواعد اللعبة الرسمية.',
      example:'اختر نقطة البداية', scenarios:['أول رمية','مستعد للتوظيف','الفريق ينمو'],
      eventInitial:'ارمِ النرد لبدء المثال.', eventRoll:'ظهرت {n}، وحصلت على {gain} نقطة تجريبية.',
      eventHire:'انضم مساعد جديد. ستزيد المكافأة التوضيحية للرميات التالية.', eventPoor:'الرصيد التجريبي غير كافٍ. حاول رمية أخرى.',
      gainLabel:'المكافأة التوضيحية', math:'النرد {n} × 2 + مكافأة الفريق {bonus} = {gain}',
      timeline:'جلسة 24 ساعة', session:'تتضمن اللعبة دورة تستمر 24 ساعة. هذا العرض الموجز لا يحاكي الوقت أو حفظ التقدم أو اللعبة الكاملة.',
      caveat:'Jiiya Roll لعبة نرد وتوظيف مساعدين بسيطة، من دون مراهنات أو أموال حقيقية أو جوائز نقدية أو سحب أموال. القواعد هنا افتراضية ولا تُحفظ البيانات.',
      currency:'نقاط تجريبية', ready:'جاهز', blocked:'تحتاج {need} إضافية', hired:'يمكن التوظيف'
    }
  };
  let lang = 'en';
  let funds=0, crew=0, rolls=0, die=1, gain=0, selected=0, eventType='eventInitial';
  const sample=[{funds:0,crew:0,rolls:0,die:1,gain:0},{funds:16,crew:0,rolls:3,die:4,gain:8},{funds:20,crew:2,rolls:9,die:6,gain:16}];
  const el=document.createElement('section');
  el.id=ID;
  el.setAttribute('aria-label','Jiiya Roll interactive landing page example');
  el.innerHTML=`
    <div class="jr-head">
      <div class="jr-headcopy"><p class="jr-kicker" data-t="kicker"></p><h2 data-t="title"></h2><p class="jr-intro" data-t="intro"></p></div>
      <div class="jr-lang" role="group" aria-label="Demo language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div>
    </div>
    <div class="jr-stage">
      <div class="jr-game">
        <div class="jr-gamebar"><span class="jr-demo" data-t="demo"></span><span class="jr-24" data-t="timeline"></span></div>
        <div class="jr-dice-shell"><div class="jr-die" data-face="1" role="img" aria-label="Die face 1"><span class="jr-pip"></span><span class="jr-pip"></span><span class="jr-pip"></span><span class="jr-pip"></span><span class="jr-pip"></span><span class="jr-pip"></span><span class="jr-pip"></span><span class="jr-pip"></span><span class="jr-pip"></span></div></div>
        <div class="jr-last"><span data-t="last"></span><strong data-val="face">1</strong></div>
        <div class="jr-equation"><span data-t="gainLabel"></span><strong data-val="gain">—</strong><p data-val="math"></p></div>
        <div class="jr-scoregrid">
          <div class="jr-stat"><span data-t="funds"></span><strong data-val="funds">0</strong></div>
          <div class="jr-stat"><span data-t="crew"></span><strong data-val="crew">0</strong></div>
          <div class="jr-stat"><span data-t="rolls"></span><strong data-val="rolls">0</strong></div>
        </div>
        <div class="jr-crewvisual" data-crew aria-label="Crew icons"></div>
      </div>
      <div class="jr-panel">
        <p class="jr-micro" data-t="example"></p>
        <div class="jr-samples" role="group" aria-label="Example positions"><button type="button" data-sample="0"></button><button type="button" data-sample="1"></button><button type="button" data-sample="2"></button></div>
        <div class="jr-controlbox"><button type="button" class="jr-roll" data-action="roll"><span class="jr-rollsymbol" aria-hidden="true">⚄</span><span data-t="roll"></span></button><button type="button" class="jr-hire" data-action="hire"><span data-t="hire"></span><span class="jr-cost">12</span></button><p class="jr-status" data-status aria-live="polite"></p><p class="jr-afford" data-afford></p></div>
        <p class="jr-annotation" data-t="note"></p>
        <button class="jr-reset" type="button" data-action="reset"></button>
      </div>
    </div>
    <div class="jr-footer"><span data-t="mock"></span><p data-t="session"></p><p data-t="caveat"></p></div>`;
  const anchor=document.querySelector('#related');
  if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(el,anchor);
  else (document.querySelector('#overview')||document.querySelector('main')||document.body).appendChild(el);
  const one=s=>el.querySelector(s), all=s=>Array.from(el.querySelectorAll(s));
  const t=()=>copy[lang];
  const fmt=n=>new Intl.NumberFormat(lang==='ar'?'ar-EG':lang==='ja'?'ja-JP':'en-US').format(n);
  function interpolate(s,vars){return s.replace(/\{(\w+)\}/g,(m,k)=>String(vars[k]??''));}
  function repaint(){
    el.setAttribute('dir',lang==='ar'?'rtl':'ltr');
    all('[data-t]').forEach(n=>n.textContent=t()[n.dataset.t]);
    all('[data-lang]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.lang===lang)));
    all('[data-sample]').forEach(n=>{let j=Number(n.dataset.sample);n.textContent=t().scenarios[j];n.setAttribute('aria-pressed',String(j===selected));});
    one('.jr-die').dataset.face=String(die);
    one('.jr-die').setAttribute('aria-label','Die face '+die);
    ['funds','crew','rolls'].forEach(k=>one('[data-val="'+k+'"]').textContent=fmt(({funds,crew,rolls})[k]));
    one('[data-val="face"]').textContent=fmt(die);
    one('[data-val="gain"]').textContent=rolls?('+'+fmt(gain)):'—';
    one('[data-val="math"]').textContent=rolls?interpolate(t().math,{n:fmt(die),bonus:fmt(gain-die*2),gain:fmt(gain)}):'—';
    one('[data-status]').textContent=interpolate(t()[eventType],{n:fmt(die),gain:fmt(gain)});
    let available=funds>=12;
    one('[data-afford]').textContent=available?t().hired:interpolate(t().blocked,{need:fmt(12-funds)});
    one('[data-action="hire"]').disabled=!available;
    one('[data-action="hire"]').setAttribute('aria-label',t().hire+' 12 '+t().currency);
    one('.jr-reset').textContent=t().reset;
    const icons=one('[data-crew]');
    icons.replaceChildren();
    for(let j=0;j<Math.min(crew,12);j++){
      const i=document.createElement('span');i.className='jr-person';i.textContent='●';i.setAttribute('aria-hidden','true');icons.appendChild(i);
    }
    icons.setAttribute('aria-label',fmt(crew)+' '+t().crew);
  }
  function setSample(j){const s=sample[j]; funds=s.funds;crew=s.crew;rolls=s.rolls;die=s.die;gain=s.gain;selected=j;eventType='eventInitial';repaint();}
  all('[data-lang]').forEach(b=>b.addEventListener('click',()=>{lang=b.dataset.lang;repaint();}));
  all('[data-sample]').forEach(b=>b.addEventListener('click',()=>setSample(Number(b.dataset.sample))));
  one('[data-action="roll"]').addEventListener('click',()=>{
    die=Math.min(6,Math.max(1,Math.floor(Math.random()*6)+1));
    gain=die*2+crew*2; funds+=gain; rolls+=1; selected=-1;eventType='eventRoll';repaint();
  });
  one('[data-action="hire"]').addEventListener('click',()=>{
    if(funds<12){eventType='eventPoor';repaint();return;}
    funds-=12;crew+=1;selected=-1;eventType='eventHire';repaint();
  });
  one('[data-action="reset"]').addEventListener('click',()=>setSample(0));
  repaint();
})();
