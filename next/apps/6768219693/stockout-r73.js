/* TSZ LP R73 — Stockout Zero / illustrative interactive progression, not actual gameplay. */
(() => {
  'use strict';
  const APP = '6768219693';
  const COPY = {
    en: {
      tag:'TRY THE IDEA', title:'One tap. Then a whole operation.', intro:'Check stock, earn coins, buy upgrades, and let automation take over.',
      checking:'STOCK CHECKS', coins:'COINS', checks:'CHECKS', automation:'AUTOMATION', manual:'CHECK STOCK',
      upgrade:'UPGRADE TAP', upgradeDesc:'More coins per check', auto:'UNLOCK AUTOMATION', autoDesc:'Automatic stock checks',
      reset:'RESET DEMO', locked:'Need', perTap:'per tap', on:'ACTIVE', off:'LOCKED', end:'From tiny checks to a self-running operation.',
      note:'Independent interactive illustration · Not actual app gameplay or an in-app screenshot',
      complete:'Automation unlocked — keep the operation moving!', progress:'PROGRESS'
    },
    ja: {
      tag:'遊び方のイメージ', title:'小さなタップから、自動化へ。', intro:'在庫チェックでコインを稼ぎ、強化を購入して作業を自動化。',
      checking:'在庫チェック', coins:'コイン', checks:'チェック数', automation:'自動化', manual:'在庫をチェック',
      upgrade:'タップを強化', upgradeDesc:'1回の獲得コイン増加', auto:'自動化を解放', autoDesc:'自動で在庫をチェック',
      reset:'デモをリセット', locked:'必要', perTap:'1回あたり', on:'稼働中', off:'未解放', end:'小さなチェックが、動き続ける仕組みに。',
      note:'独立した操作イメージです · 実際のゲーム画面・内部仕様ではありません',
      complete:'自動化を解放しました。店舗が動き始めます！', progress:'進捗'
    },
    ar: {
      tag:'جرّب الفكرة', title:'نقرة واحدة. ثم عملية كاملة.', intro:'افحص المخزون، واكسب عملات، واشترِ ترقيات، ثم فعّل الأتمتة.',
      checking:'فحص المخزون', coins:'العملات', checks:'مرات الفحص', automation:'الأتمتة', manual:'افحص المخزون',
      upgrade:'ترقية النقرة', upgradeDesc:'عملات أكثر لكل فحص', auto:'فتح الأتمتة', autoDesc:'فحص تلقائي للمخزون',
      reset:'إعادة التجربة', locked:'تحتاج', perTap:'لكل نقرة', on:'نشطة', off:'مقفلة', end:'من فحوصات بسيطة إلى عملية لا تتوقف.',
      note:'مثال تفاعلي مستقل · ليس أسلوب اللعب الفعلي أو لقطة من التطبيق',
      complete:'تم فتح الأتمتة — العملية تستمر!', progress:'التقدم'
    }
  };
  const sourceLang = () => {
    const s = document.getElementById('p199-language');
    return String((s && s.value) || document.documentElement.lang || 'en').toLowerCase().split(/[-_]/)[0];
  };
  function mount(){
    const body=document.body;
    if(!body || (body.dataset.p199Id!==APP && body.dataset.p19AppId!==APP)) return;
    const target=document.getElementById('overview');
    if(!target || document.getElementById('tsz-sz73')) return;
    const section=document.createElement('section');
    section.id='tsz-sz73'; section.className='tsz-sz73';
    section.dataset.tszIllustration='conceptual-game-loop-not-actual-gameplay';
    section.setAttribute('aria-label','Stockout Zero interactive illustration');
    section.innerHTML=`
      <header class="tsz-sz73__header"><span class="tsz-sz73__tag" data-t="tag"></span><span class="tsz-sz73__chip">STOCKOUT<span class="tsz-sz73__zero"> ZERO</span></span></header>
      <h2 data-t="title"></h2><p class="tsz-sz73__lead" data-t="intro"></p>
      <div class="tsz-sz73__console">
        <div class="tsz-sz73__metrics">
          <div><span data-t="coins"></span><output data-o="coins">0</output></div>
          <div><span data-t="checks"></span><output data-o="checks">0</output></div>
          <div><span data-t="automation"></span><strong data-o="auto">—</strong></div>
        </div>
        <div class="tsz-sz73__progress-label"><span data-t="progress"></span><output data-o="progress">0%</output></div>
        <div class="tsz-sz73__track" role="progressbar" aria-label="Automation unlock progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div>
        <button class="tsz-sz73__check" type="button" data-action="check"><span aria-hidden="true">◎</span><span data-t="manual"></span><small data-o="tapgain">+1</small></button>
        <div class="tsz-sz73__upgrades">
          <button type="button" class="tsz-sz73__buy" data-action="upgrade"><span><strong data-t="upgrade"></strong><small data-t="upgradeDesc"></small></span><b data-o="upgradeCost">8</b></button>
          <button type="button" class="tsz-sz73__buy" data-action="automate"><span><strong data-t="automation"></strong><small data-t="autoDesc"></small></span><b data-o="autoCost">24</b></button>
        </div>
      </div>
      <div class="tsz-sz73__lower"><p class="tsz-sz73__status" data-o="status" role="status" aria-live="polite"></p><button type="button" class="tsz-sz73__reset" data-action="reset" data-t="reset"></button></div>
      <p class="tsz-sz73__note" data-t="note"></p>`;
    target.insertAdjacentElement('afterend',section);
    let coins=0,checks=0,tapGain=1,auto=false,autoTimer=null;
    const get=(key)=>section.querySelector(`[data-o="${key}"]`);
    const button=(action)=>section.querySelector(`[data-action="${action}"]`);
    const cost=()=>tapGain===1?8:tapGain===2?16:Infinity;
    const txt=()=>COPY[sourceLang()]||COPY.en;
    function draw(){
      const t=txt(); const lang=sourceLang();section.lang=(lang==='ja'||lang==='ar')?lang:'en';section.dir=lang==='ar'?'rtl':'ltr';
      section.querySelectorAll('[data-t]').forEach(e=>{e.textContent=t[e.dataset.t]||'';});
      get('coins').textContent=String(coins);get('checks').textContent=String(checks);
      get('auto').textContent=auto?t.on:t.off;
      get('tapgain').textContent=`+${tapGain}`;
      get('upgradeCost').textContent=tapGain>=3?'✓':String(cost());
      get('autoCost').textContent=auto?'✓':'24';
      button('upgrade').disabled=tapGain>=3||coins<cost();
      button('automate').disabled=auto||coins<24;
      const progress=auto?100:Math.min(100,Math.round(coins/24*100));
      get('progress').textContent=progress+'%';
      const bar=section.querySelector('[role="progressbar"]');bar.setAttribute('aria-valuenow',String(progress));bar.querySelector('span').style.width=progress+'%';
      get('status').textContent=auto?t.complete:t.end;
      section.dataset.automated=auto?'true':'false';
    }
    button('check').addEventListener('click',()=>{coins=Math.min(99999,coins+tapGain);checks=Math.min(99999,checks+1);draw();});
    button('upgrade').addEventListener('click',()=>{const c=cost();if(coins>=c&&tapGain<3){coins-=c;tapGain++;draw();}});
    button('automate').addEventListener('click',()=>{
      if(coins<24||auto)return;coins-=24;auto=true;draw();
      // Automated animation is demonstrative, limited to the lifetime of this page.
      autoTimer=window.setInterval(()=>{if(!document.contains(section)){window.clearInterval(autoTimer);return;}coins=Math.min(99999,coins+tapGain);checks=Math.min(99999,checks+1);draw();},1500);
    });
    button('reset').addEventListener('click',()=>{if(autoTimer!==null)window.clearInterval(autoTimer);autoTimer=null;coins=0;checks=0;tapGain=1;auto=false;draw();});
    const language=document.getElementById('p199-language');if(language)language.addEventListener('change',draw);
    draw();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
