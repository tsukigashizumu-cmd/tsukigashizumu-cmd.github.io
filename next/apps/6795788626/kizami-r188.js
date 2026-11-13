/* TSZ Kizami R188. Website-only illustrative selection demo. No persistence/network. */
(() => {
  'use strict';
  const APP='6795788626', ROOT='tsz-kizami-r188';
  if (!document.body || document.getElementById(ROOT)) return;
  const bodyId=document.body.dataset.p199Id||document.body.dataset.appId||'';
  if (bodyId && bodyId!==APP) return;
  if (!bodyId && !String(document.body.innerHTML).includes('Kizami')) return;
  const t={
    en:{eyebrow:'YOUR TIME, YOUR CHOICE',first:'Not every hour has to be',second:'productive.',sub:'Keep the time you chose.',hint:'Try the moments below. Your choices shape the light underground.',panel:'A moment you chose',read:'Read',walk:'Walk',rest:'Rest',total:'min kept',depth:'THE LIGHT GOES DEEPER',surface:'SURFACE',layer1:'CLAY',layer2:'GREENSTONE',layer3:'IRON BED',layer4:'SANDSTONE',layer5:'GRANITE',reset:'Reset example',store:'View on the App Store',note:'Illustrative, browser-only demo. No actual time record is saved or changed.',subtitle:'There is no score to beat. Just moments that mattered to you.',small:'Pick a moment to see its place in your own time.'},
    ja:{eyebrow:'自分で選んだ時間',first:'すべての時間に',second:'生産性はいらない。',sub:'自分で選んだ時間を残そう。',hint:'下の時間を選ぶと、地層を貫く光が変わります。',panel:'あなたが選んだ時間',read:'読書',walk:'散歩',rest:'休息',total:'分を残した',depth:'時間の光が深くなる',surface:'地表',layer1:'粘土層',layer2:'緑色岩',layer3:'鉄鉱層',layer4:'砂岩',layer5:'花崗岩',reset:'サンプルに戻す',store:'App Storeで見る',note:'説明用のブラウザ内デモです。実際の記録を保存・変更しません。',subtitle:'達成率も競争もありません。自分のための時間だけ。',small:'選んだ時間が静かに積み重なります。'},
    ar:{eyebrow:'وقتك، اختيارك',first:'ليس من الضروري أن تكون كل ساعة',second:'منتجة.',sub:'احتفظ بالوقت الذي اخترته.',hint:'اختر اللحظات لترى الضوء يتعمق في طبقات الأرض.',panel:'لحظة اخترتها',read:'قراءة',walk:'مشي',rest:'راحة',total:'دقيقة احتفظت بها',depth:'الضوء يزداد عمقاً',surface:'السطح',layer1:'طين',layer2:'صخر أخضر',layer3:'طبقة الحديد',layer4:'حجر رملي',layer5:'جرانيت',reset:'إعادة المثال',store:'عرض في App Store',note:'عرض توضيحي داخل المتصفح فقط. لا يتم حفظ سجلات فعلية أو تعديلها.',subtitle:'لا نتيجة تتنافس عليها. فقط لحظات اخترتها لنفسك.',small:'تتراكم لحظاتك المختارة بهدوء.'}
  };
  const root=document.createElement('section');root.id=ROOT;root.className='kzm188';root.setAttribute('aria-labelledby','kzm188-title');
  root.innerHTML=`
  <div class="kzm188-inner">
   <div class="kzm188-top"><span class="kzm188-logo" aria-hidden="true">≋</span><strong>KIZAMI</strong><span class="kzm188-topline"></span><span data-kzm-i="eyebrow"></span></div>
   <div class="kzm188-head"><p data-kzm-i="eyebrow"></p><h2 id="kzm188-title"><span data-kzm-i="first"></span> <em data-kzm-i="second"></em></h2><p class="kzm188-lede" data-kzm-i="sub"></p></div>
   <div class="kzm188-layout">
    <div class="kzm188-earth" aria-label="Illustrative layered earth and a shaft of light">
      <div class="kzm188-reading" aria-hidden="true"><span>✦</span><div class="kzm188-book">▰ ▰</div></div>
      <div class="kzm188-ground"></div>
      <div class="kzm188-strata" aria-hidden="true"><span data-kzm-i="surface"></span><span data-kzm-i="layer1"></span><span data-kzm-i="layer2"></span><span data-kzm-i="layer3"></span><span data-kzm-i="layer4"></span><span data-kzm-i="layer5"></span></div>
      <div class="kzm188-shaftbase"><div class="kzm188-shaft" id="kzm188-shaft"></div></div>
      <div class="kzm188-marker" id="kzm188-depth" aria-hidden="true"><i></i><strong id="kzm188-depth-value">70</strong><small>min</small></div>
    </div>
    <div class="kzm188-card"><div class="kzm188-card-title"><span aria-hidden="true">✧</span><h3 data-kzm-i="panel"></h3></div>
       <div class="kzm188-options" role="group" aria-label="Choose moments to include">
         <button type="button" class="kzm188-option" data-kzm-activity="read" aria-pressed="true"><span class="kzm188-picto" aria-hidden="true">▤</span><span class="kzm188-opt-label" data-kzm-i="read"></span><strong>35 <small>min</small></strong><span class="kzm188-check" aria-hidden="true">✓</span></button>
         <button type="button" class="kzm188-option" data-kzm-activity="walk" aria-pressed="true"><span class="kzm188-picto" aria-hidden="true">♧</span><span class="kzm188-opt-label" data-kzm-i="walk"></span><strong>20 <small>min</small></strong><span class="kzm188-check" aria-hidden="true">✓</span></button>
         <button type="button" class="kzm188-option" data-kzm-activity="rest" aria-pressed="true"><span class="kzm188-picto" aria-hidden="true">☾</span><span class="kzm188-opt-label" data-kzm-i="rest"></span><strong>15 <small>min</small></strong><span class="kzm188-check" aria-hidden="true">✓</span></button>
       </div>
       <div class="kzm188-summary" aria-live="polite"><output id="kzm188-total" aria-label="Selected minutes">70</output><span data-kzm-i="total"></span></div>
       <p class="kzm188-card-small" data-kzm-i="small"></p><button class="kzm188-reset" id="kzm188-reset" type="button" data-kzm-i="reset"></button>
    </div>
   </div>
   <div class="kzm188-bottom"><p data-kzm-i="subtitle"></p><a class="kzm188-store" href="https://apps.apple.com/us/app/id6795788626" target="_blank" rel="noopener noreferrer" data-kzm-i="store"></a><p class="kzm188-note" data-kzm-i="note"></p></div>
  </div>`;
  const anchor=document.querySelector('.p19-breadcrumb')||document.querySelector('[class*="breadcrumb"]');
  if(anchor&&anchor.parentNode) anchor.insertAdjacentElement('afterend',root);
  else {const main=document.querySelector('#p199-content')||document.querySelector('main');if(main){main.insertBefore(root,main.firstChild);}else document.body.insertBefore(root,document.body.firstChild);}
  if(!root.isConnected)return;
  const $=s=>root.querySelector(s), $$=s=>Array.from(root.querySelectorAll(s));
  const selected=new Set(['read','walk','rest']);const mins={read:35,walk:20,rest:15};
  function findSelect(kind){
    const candidates=kind==='language' ? ['#p199-language','#p19-language','#kizami-language','select[id*="language"]','select[id*="locale"]','select[id*="lang"]'] : ['#p199-country','#p19-country','#kizami-country','select[id*="country"]','select[id*="region"]','select[id*="storefront"]'];
    for(const q of candidates){const s=document.querySelector(q);if(s&&s.tagName==='SELECT')return s;}
    const vals=kind==='language'?['ja','en','ar','ja-jp','en-us','ar-sa']:['us','jp','gb','ae'];
    return [...document.querySelectorAll('select')].find(s=>[...s.options].some(o=>vals.includes(o.value.toLowerCase())))||null;
  }
  function lang(){const q=findSelect('language');const v=(q?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();return v.startsWith('ar')?'ar':v.startsWith('ja')?'ja':'en';}
  function country(){const q=findSelect('country');let s=(q?.value||new URLSearchParams(location.search).get('country')||'us').toLowerCase();return /^[a-z]{2}$/.test(s)?s:'us';}
  function compute(){const sum=[...selected].reduce((n,k)=>n+mins[k],0);$('#kzm188-total').textContent=String(sum);$('#kzm188-depth-value').textContent=String(sum);root.style.setProperty('--kzm188-progress',(sum/70*100).toFixed(4)+'%');
    $$('.kzm188-option').forEach(b=>{const on=selected.has(b.dataset.kzmActivity);b.setAttribute('aria-pressed',String(on));b.querySelector('.kzm188-check').textContent=on?'✓':'○';});return sum;}
  function relocalize(){const l=lang();root.lang=l;root.dir=l==='ar'?'rtl':'ltr';$$('[data-kzm-i]').forEach(n=>{n.textContent=t[l][n.dataset.kzmI];});$('.kzm188-options').setAttribute('aria-label',t[l].panel);$('.kzm188-store').href='https://apps.apple.com/'+country()+'/app/id'+APP;compute();}
  $$('.kzm188-option').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.kzmActivity;selected.has(k)?selected.delete(k):selected.add(k);compute();}));
  $('#kzm188-reset').addEventListener('click',()=>{selected.clear();['read','walk','rest'].forEach(k=>selected.add(k));compute();});
  document.addEventListener('change',event=>{const target=event.target;if(target.tagName!=='SELECT')return;if(target===findSelect('language')||target===findSelect('country'))relocalize();},true);
  window.addEventListener('popstate',relocalize);
  relocalize();
})();
