/* TSZ LP R191 — MealDrift illustrative local-only meal picker. */
(() => {
  'use strict';
  const APP = '6781817734', ROOT = 'tsz-mealdrift-r191';
  if (!document.body || document.getElementById(ROOT)) return;
  const appId = document.body.dataset.p199Id || document.body.dataset.p19AppId || '';
  if (appId && appId !== APP) return;
  if (!appId && !/Meal\s*Drift|ミールドリフト/i.test(document.body.textContent || '')) return;
  const meals = [
    {id:'curry',badge:'🥘',name:{en:'Leftover curry',ja:'残り物カレー',ar:'كاري متبقٍ'},desc:{en:'Comfort, already in the fridge.',ja:'冷蔵庫にある、おいしい一皿。',ar:'وجبة جاهزة في الثلاجة.'}},
    {id:'pasta',badge:'🍅',name:{en:'Tomato pasta',ja:'トマトパスタ',ar:'معكرونة بالطماطم'},desc:{en:'A favorite worth returning to.',ja:'何度でも食べたい定番。',ar:'طبق مفضل يستحق التكرار.'}},
    {id:'bowl',badge:'🥗',name:{en:'Veggie bowl',ja:'野菜ボウル',ar:'طبق خضار'},desc:{en:'Bright and simple tonight.',ja:'彩り豊かで、気軽な一皿。',ar:'خيار بسيط ومليء بالألوان.'}}
  ];
  const messages = {
    en: {eyebrow:'YOUR OWN MEAL LIST · ONE LESS DECISION',headline1:"You've made enough",headline2:'decisions today.',subtitle:'The meals you saved. One less choice tonight.',cardTitle:"TONIGHT'S PICK",cardNote:'Chosen from your own list',options:'YOUR SAMPLE OPTIONS',pick:'Pick for me',again:'Choose again',store:'View on the App Store',steps:'SAVE YOUR OPTIONS  →  LET IT PICK  →  ENJOY DINNER',note:'Illustrative browser demo. Three sample meals, not your real saved choices. No account, search or AI generation.',selected:'Selected meal',selectHint:'Choose a dish or let the picker decide.',resultNote:'No need to decide everything yourself.',artCaption:'A little comfort on the table',randomHint:'Tap to select, or let the demo choose another one.'},
    ja: {eyebrow:'自分の候補から、今日の一皿を',headline1:'今日はもう、',headline2:'十分決めた。',subtitle:'保存した料理から、今夜の一食を選ぼう。',cardTitle:'今夜の一皿',cardNote:'自分のリストから選ぶ',options:'サンプルの候補',pick:'おまかせで選ぶ',again:'もう一度選ぶ',store:'App Storeで見る',steps:'候補を登録  →  おまかせで選ぶ  →  夕食を楽しむ',note:'説明用のブラウザデモです。3つの料理は架空の候補で、実際の記録・検索・AI生成は行いません。',selected:'選ばれた料理',selectHint:'料理を直接選ぶか、おまかせボタンを押してください。',resultNote:'今夜は、もう迷わなくていい。',artCaption:'食卓に、ちょっとした余裕を',randomHint:'料理を選ぶか、もう一度おまかせ。'},
    ar: {eyebrow:'وجباتك المفضلة · قرار أقل',headline1:'لقد اتخذت ما يكفي',headline2:'من القرارات اليوم.',subtitle:'الوجبات التي حفظتها. قرار أقل هذا المساء.',cardTitle:'اختيار الليلة',cardNote:'اختيار من قائمتك',options:'خيارات توضيحية',pick:'اختر لي',again:'اختر مرة أخرى',store:'عرض في App Store',steps:'احفظ خياراتك ← دع التطبيق يختار ← استمتع بالعشاء',note:'عرض توضيحي في المتصفح. ثلاث وجبات افتراضية؛ لا يستخدم بياناتك ولا يبحث أو يولّد وجبات بالذكاء الاصطناعي.',selected:'الوجبة المختارة',selectHint:'اختر وجبة أو دع العرض يختار لك.',resultNote:'دع قرار العشاء يصبح أسهل.',artCaption:'لحظة هادئة على مائدة الطعام',randomHint:'اختر طبقًا أو اطلب اختيارًا آخر.'}
  };
  const root = document.createElement('section');
  root.id=ROOT; root.className='md191'; root.setAttribute('aria-labelledby','md191-heading');
  root.innerHTML = `<div class="md191-inner">
    <header class="md191-mast"><span class="md191-brand-icon" aria-hidden="true">♨</span><strong>MealDrift</strong><span class="md191-mast-note" data-md191-i="eyebrow"></span></header>
    <div class="md191-grid">
      <div class="md191-story"><p class="md191-overline" data-md191-i="eyebrow"></p><h2 id="md191-heading"><span data-md191-i="headline1"></span> <em data-md191-i="headline2"></em></h2><p class="md191-subtitle" data-md191-i="subtitle"></p>
        <div class="md191-scene" aria-hidden="true"><div class="md191-lamp"></div><div class="md191-scene-table"></div><div class="md191-plate"><div class="md191-dish md191-dish-pasta" id="md191-illustration"><div class="md191-pasta-ring"></div><span class="md191-dish-top">✦</span><span class="md191-dish-leaf md191-dish-leaf-a"></span><span class="md191-dish-leaf md191-dish-leaf-b"></span><span class="md191-dish-leaf md191-dish-leaf-c"></span></div></div><div class="md191-fork"></div></div>
        <p class="md191-image-note" data-md191-i="artCaption"></p>
      </div>
      <div class="md191-card"><div class="md191-card-top"><span data-md191-i="cardTitle"></span><span class="md191-sun" aria-hidden="true">✧</span></div><output id="md191-choice" class="md191-choice" aria-live="polite"></output><p class="md191-card-note" data-md191-i="cardNote"></p>
        <div class="md191-card-illustration" aria-hidden="true"><div class="md191-mini-plate"><span id="md191-emoji">🍅</span></div><span id="md191-description"></span></div>
        <fieldset class="md191-options"><legend data-md191-i="options"></legend><div class="md191-option-grid" id="md191-option-grid"></div></fieldset>
        <button type="button" id="md191-pick" class="md191-pick"><span aria-hidden="true">⤨</span><span data-md191-i="again"></span></button>
        <p class="md191-hint" id="md191-result-note" role="status"></p>
      </div>
    </div>
    <footer class="md191-footer"><p data-md191-i="steps"></p><a id="md191-store" rel="noopener noreferrer" target="_blank" href="https://apps.apple.com/us/app/id6781817734" data-md191-i="store"></a></footer>
    <p class="md191-legal" data-md191-i="note"></p>
  </div>`;
  const anchor=document.querySelector('.p19-breadcrumb')||document.querySelector('[class*="breadcrumb"]');
  if(anchor&&anchor.parentNode)anchor.insertAdjacentElement('afterend',root);
  else {const main=document.querySelector('#p199-content')||document.querySelector('main');if(main)main.insertAdjacentElement('beforebegin',root);else document.body.insertBefore(root,document.body.firstChild);}
  if(!root.isConnected)return;
  const $=s=>root.querySelector(s), $$=s=>Array.from(root.querySelectorAll(s));
  let selected=1, picks=0;
  function findSelect(kind){const selectors=kind==='language'?['#p199-language','#p19-language','select[id*="language"]','select[id*="locale"]']:['#p199-country','#p19-country','select[id*="country"]','select[id*="region"]'];for(const sel of selectors){const el=document.querySelector(sel);if(el?.tagName==='SELECT')return el;}return null;}
  function language(){const el=findSelect('language');const v=String(el?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en';}
  function country(){let v=String(findSelect('country')?.value||new URLSearchParams(location.search).get('country')||'us').toLowerCase();return /^[a-z]{2}$/.test(v)?v:'us';}
  function choose(index){if(index<0||index>=meals.length)return;selected=index;render();}
  function pickAnother(){if(meals.length<2)return;const available=meals.map((_,i)=>i).filter(i=>i!==selected);selected=available[Math.floor(Math.random()*available.length)];picks++;render();}
  function render(){const lang=language(),t=messages[lang],meal=meals[selected];root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';$$('[data-md191-i]').forEach(el=>{el.textContent=t[el.dataset.md191I]||'';});
    $('#md191-choice').textContent=meal.name[lang];$('#md191-description').textContent=meal.desc[lang];$('#md191-emoji').textContent=meal.badge;
    $('#md191-illustration').className='md191-dish md191-dish-'+meal.id;
    $('#md191-option-grid').replaceChildren(...meals.map((m,i)=>{const b=document.createElement('button');b.type='button';b.className='md191-option'+(i===selected?' is-active':'');b.setAttribute('aria-pressed',String(i===selected));b.dataset.meal=m.id;const icon=document.createElement('span');icon.className='md191-option-icon';icon.setAttribute('aria-hidden','true');icon.textContent=m.badge;const title=document.createElement('span');title.textContent=m.name[lang];b.append(icon,title);b.addEventListener('click',()=>choose(i));return b;}));
    $('#md191-pick [data-md191-i]').textContent=picks===0?t.pick:t.again;
    $('#md191-result-note').textContent=t.randomHint;
    $('#md191-store').href='https://apps.apple.com/'+country()+'/app/id'+APP;
    root.setAttribute('aria-label',t.selected+': '+meal.name[lang]);
  }
  $('#md191-pick').addEventListener('click',pickAnother);
  document.addEventListener('change',e=>{if(e.target===findSelect('language')||e.target===findSelect('country'))render();},true);
  window.addEventListener('popstate',render);
  render();
})();
