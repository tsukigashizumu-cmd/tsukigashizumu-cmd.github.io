/* TSZ LP R228 | Stockout Zero | isolated illustrative incremental-play demo */
(() => {
  'use strict';
  const APP = '6768219693';
  const ID = 'tsz-stockout-r228';
  if ((document.body?.dataset.p199Id || document.body?.dataset.p19AppId) !== APP || document.getElementById(ID)) return;
  const host = document.querySelector('main#p199-content') || document.querySelector('main');
  if (!host) return;
  const dict = {
    en: {
      eyebrow:'STOCKOUT ZERO / A TINY PLAYABLE MOMENT',title:'Every system starts with a single check.',subtitle:'Tap to check a shelf. Earn credits. Buy your first automation. See the work change hands.',fiction:'Illustrative web demo · not actual gameplay or saved progress',manual:'MANUAL CHECKS',automatic:'AUTOMATED CHECKS',credits:'CREDITS',shift:'SHIFT',shelf:'STEP 01 — CHECK STOCK',shelfHint:'Choose a shelf to perform a manual check (+4 credits).',fruit:'Produce',drinks:'Drinks',snacks:'Snacks',checked:'checks',upgrade:'STEP 02 — INVEST IN AUTOMATION',upgradeHint:'Spend credits to unlock an automatic stock check on each shift.',buy:'Buy automation',max:'All three upgrades unlocked',nextCost:'Next upgrade',progress:'Progress to unlock',shiftTitle:'STEP 03 — LET IT RUN',shiftHint:'Once automation is installed, advance a shift to earn automatic checks and credits.',advance:'Advance one shift',locked:'Unlock automation first',active:'Active automations',messageStart:'Your first stock check is waiting.',messageManual:'Manual check complete. Your credits grew.',messageBuy:'Automation installed. Advance a shift to see it work.',messageShift:'The automated system handled the next shift.',messageMax:'Every automation is installed.',reset:'Reset sample',language:'Language',region:'Store region',store:'View Stockout Zero on the App Store',note:'Fictional simplified demo. The actual game has additional rules, ordering decisions and progression.',unit:'CR',of:'of'
    },
    ja: {
      eyebrow:'STOCKOUT ZERO / 触ってわかる小さな体験',title:'すべての自動化は、1回の確認から。',subtitle:'棚をチェックして資金を獲得。自動化を購入すると、次のシフトから仕事の進み方が変わる。',fiction:'説明用Webデモ・実際のゲーム画面や記録ではありません',manual:'手動チェック',automatic:'自動チェック',credits:'資金',shift:'シフト',shelf:'STEP 01 — 在庫を確認',shelfHint:'どれかの棚を選ぶと、手動チェックで資金が4増えます。',fruit:'青果',drinks:'飲料',snacks:'お菓子',checked:'回チェック',upgrade:'STEP 02 — 自動化へ投資',upgradeHint:'資金を使って、シフトごとに自動でチェックする仕組みを購入。',buy:'自動化を購入',max:'3段階の自動化を完了',nextCost:'次の購入費用',progress:'購入までの進捗',shiftTitle:'STEP 03 — シフトを進める',shiftHint:'自動化を導入したら、シフトを進めると資金と自動チェックが増えます。',advance:'次のシフトへ',locked:'先に自動化を購入',active:'稼働中の自動化',messageStart:'まずは棚を1回チェックしてみよう。',messageManual:'手動チェック完了。資金が増えました。',messageBuy:'自動化を導入。次のシフトで動きます。',messageShift:'自動化が次のシフトを進めました。',messageMax:'すべての自動化を導入しました。',reset:'デモを初期化',language:'言語',region:'ストア地域',store:'App StoreでStockout Zeroを見る',note:'架空の簡易デモです。実際のゲームには発注判断やより多くの成長要素があります。',unit:'CR',of:'/'
    },
    ar: {
      eyebrow:'STOCKOUT ZERO / تجربة صغيرة قابلة للتفاعل',title:'كل أتمتة تبدأ بفحص واحد.',subtitle:'افحص الرفوف واكسب الرصيد، ثم اشترِ أول ترقية تلقائية وشاهد كيف يتغير العمل.',fiction:'عرض توضيحي للويب فقط · ليس اللعب الفعلي أو تقدّمًا محفوظًا',manual:'فحوص يدوية',automatic:'فحوص تلقائية',credits:'رصيد',shift:'وردية',shelf:'الخطوة 01 — افحص المخزون',shelfHint:'اختر رفًا لفحصه يدويًا واكسب 4 أرصدة.',fruit:'الخضار والفاكهة',drinks:'المشروبات',snacks:'الوجبات الخفيفة',checked:'فحص',upgrade:'الخطوة 02 — استثمر في الأتمتة',upgradeHint:'أنفق الرصيد لتمكين فحص تلقائي مع كل وردية.',buy:'شراء الأتمتة',max:'اكتملت الترقيات الثلاث',nextCost:'تكلفة الترقية التالية',progress:'التقدم نحو الترقية',shiftTitle:'الخطوة 03 — شغّل النظام',shiftHint:'بعد تركيب الأتمتة، انتقل إلى الوردية التالية للحصول على فحوص ورصيد تلقائي.',advance:'الوردية التالية',locked:'اشترِ الأتمتة أولًا',active:'أنظمة أتمتة نشطة',messageStart:'ابدأ بفحص المخزون الأول.',messageManual:'اكتمل الفحص اليدوي. زاد رصيدك.',messageBuy:'تم تفعيل الأتمتة. جرّب الوردية التالية.',messageShift:'أكمل النظام التلقائي الوردية التالية.',messageMax:'تم تثبيت جميع أنظمة الأتمتة.',reset:'إعادة ضبط المثال',language:'اللغة',region:'منطقة المتجر',store:'عرض Stockout Zero في App Store',note:'تجربة مبسطة بخيارات افتراضية. تتضمن اللعبة الفعلية قرارات طلب ومراحل تطوير إضافية.',unit:'CR',of:'من'
    }
  };
  const root = document.createElement('section'); root.id=ID; root.setAttribute('aria-label','Stockout Zero interactive demonstration');
  root.className = 'sz228';
  root.innerHTML = `
    <div class="sz228-top"><span class="sz228-mark"><i></i><i></i><i></i></span><span data-t="eyebrow"></span><span class="sz228-live-dot" aria-hidden="true"></span></div>
    <div class="sz228-hero"><div class="sz228-headline"><h2 data-t="title"></h2><p data-t="subtitle"></p><small data-t="fiction"></small></div><div class="sz228-pulse" aria-hidden="true"><div class="sz228-pulse-rings"><b>0<span>1</span></b></div><span>STOCK<br>CHECK</span></div></div>
    <div class="sz228-stats" role="group" aria-label="Demo counters">
      <div><span data-t="manual"></span><strong id="sz228-manual">0</strong></div><div><span data-t="automatic"></span><strong id="sz228-auto">0</strong></div><div><span data-t="credits"></span><strong id="sz228-credits">0</strong></div><div><span data-t="shift"></span><strong id="sz228-shift">01</strong></div>
    </div>
    <div class="sz228-grid"><div class="sz228-part"><div class="sz228-step"><span data-t="shelf"></span><p data-t="shelfHint"></p></div><div class="sz228-shelves">
      <button class="sz228-shelf" type="button" data-shelf="fruit"><span class="sz228-shelf-icon" aria-hidden="true">◒</span><strong data-t="fruit"></strong><small><span id="sz228-fruit">0</span> <span data-t="checked"></span></small><span class="sz228-add" aria-hidden="true">+</span></button>
      <button class="sz228-shelf" type="button" data-shelf="drinks"><span class="sz228-shelf-icon" aria-hidden="true">◫</span><strong data-t="drinks"></strong><small><span id="sz228-drinks">0</span> <span data-t="checked"></span></small><span class="sz228-add" aria-hidden="true">+</span></button>
      <button class="sz228-shelf" type="button" data-shelf="snacks"><span class="sz228-shelf-icon" aria-hidden="true">▱</span><strong data-t="snacks"></strong><small><span id="sz228-snacks">0</span> <span data-t="checked"></span></small><span class="sz228-add" aria-hidden="true">+</span></button>
    </div></div>
    <div class="sz228-right"><div class="sz228-part sz228-invest"><div class="sz228-step"><span data-t="upgrade"></span><p data-t="upgradeHint"></p></div><div class="sz228-upgrade-meta"><span data-t="nextCost"></span><strong><span id="sz228-cost">12</span> <small>CR</small></strong></div><div class="sz228-track" role="progressbar" aria-label="Credits toward next automation" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div id="sz228-progress"></div></div><div class="sz228-upgrade-footer"><span data-t="progress"></span><output id="sz228-progress-text">0 / 12</output></div><button type="button" class="sz228-buy" id="sz228-buy" disabled><span data-t="buy"></span><span>↗</span></button></div>
    <div class="sz228-part sz228-run"><div class="sz228-step"><span data-t="shiftTitle"></span><p data-t="shiftHint"></p></div><div class="sz228-run-line"><span data-t="active"></span><strong><span id="sz228-level">0</span> / 3</strong></div><button type="button" id="sz228-next" disabled><span data-t="advance"></span><span>→</span></button></div></div></div>
    <div class="sz228-foot"><p id="sz228-message" role="status" aria-live="polite"></p><button type="button" id="sz228-reset" data-t="reset"></button></div>
    <div class="sz228-bottom"><div class="sz228-pickers"><label><span data-t="language"></span><select id="sz228-language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="sz228-country"><option value="us">US</option><option value="jp">JP</option></select></label></div><a id="sz228-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/stockout-zero/id6768219693" data-t="store"></a><p data-t="note"></p></div>`;
  host.insertAdjacentElement('afterbegin', root);
  const get = (id) => root.querySelector('#'+id);
  const hostLanguage=document.querySelector('#p199-language'); const hostCountry=document.querySelector('#p199-country');
  const normLang=x=>x==='ja'||x==='ar'?x:'en';
  const normCountry=x=>x==='jp'?'jp':'us';
  let language=normLang(hostLanguage?.value || document.documentElement.lang.slice(0,2));
  let country=normCountry(hostCountry?.value);
  let credits=0,manual=0,automatic=0,level=0,shift=1,counts={fruit:0,drinks:0,snacks:0},event='messageStart';
  const nextCost=()=>12+level*8;
  let syncing=false;
  const syncHost = (hostSelect,value) => {
    if (!hostSelect||hostSelect.value===value||!Array.from(hostSelect.options).some(o=>o.value===value)) return;
    syncing=true; hostSelect.value=value; hostSelect.dispatchEvent(new Event('change',{bubbles:true})); syncing=false;
  };
  function updateLocale(){
    const t=dict[language];root.lang=language;root.dir=language==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-t]').forEach(node=>{node.textContent=t[node.dataset.t]||node.dataset.t;});
    get('sz228-language').value=language;get('sz228-country').value=country;
    get('sz228-store').href=`https://apps.apple.com/${country}/app/stockout-zero/id6768219693`;
    render();
  }
  function render(){
    get('sz228-manual').textContent=manual; get('sz228-auto').textContent=automatic;get('sz228-credits').textContent=credits;get('sz228-shift').textContent=String(shift).padStart(2,'0');get('sz228-level').textContent=level;
    ['fruit','drinks','snacks'].forEach(x=>{get('sz228-'+x).textContent=counts[x];});
    const c=nextCost(), full=level===3, percent=full?100:Math.min(100,Math.round(credits/c*1000)/10);
    get('sz228-cost').textContent=full?'—':c;
    get('sz228-progress').style.width=percent+'%'; root.querySelector('.sz228-track').setAttribute('aria-valuenow',String(percent));
    get('sz228-progress-text').textContent=full?'3 / 3':credits+' / '+c;
    get('sz228-buy').disabled=full||credits<c; get('sz228-buy').querySelector('[data-t]').textContent=full?dict[language].max:dict[language].buy;
    get('sz228-next').disabled=level===0;
    get('sz228-message').textContent=dict[language][event];
    root.classList.toggle('sz228-has-auto',level>0);
  }
  root.querySelectorAll('[data-shelf]').forEach(btn=>btn.addEventListener('click',()=>{const x=btn.dataset.shelf;counts[x]++;manual++;credits+=4;event='messageManual';render();}));
  get('sz228-buy').addEventListener('click',()=>{if(level===3||credits<nextCost())return;credits-=nextCost();level++;event=level===3?'messageMax':'messageBuy';render();});
  get('sz228-next').addEventListener('click',()=>{if(!level)return;shift++;automatic+=level;credits+=level*4;event='messageShift';render();});
  get('sz228-reset').addEventListener('click',()=>{credits=0;manual=0;automatic=0;level=0;shift=1;counts={fruit:0,drinks:0,snacks:0};event='messageStart';render();});
  get('sz228-language').addEventListener('change',(e)=>{language=normLang(e.target.value);syncHost(hostLanguage,language);updateLocale();});
  get('sz228-country').addEventListener('change',(e)=>{country=normCountry(e.target.value);syncHost(hostCountry,country);updateLocale();});
  hostLanguage?.addEventListener('change',()=>{if(syncing)return;language=normLang(hostLanguage.value);updateLocale();});
  hostCountry?.addEventListener('change',()=>{if(syncing)return;country=normCountry(hostCountry.value);updateLocale();});
  updateLocale();
})();
