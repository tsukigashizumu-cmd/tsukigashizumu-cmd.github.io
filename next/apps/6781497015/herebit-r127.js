/* Herebit LP R127 — illustrative point-to-explain demo. Ephemeral, zero network/storage. */
(() => {
  'use strict';
  const APP_ID = '6781497015';
  const L = {
    en: {
      kicker: 'POINT, DON\'T DESCRIBE', badge: 'INTERACTIVE WEBSITE DEMO',
      title: '“Not there.” Again? Point to the exact spot.',
      intro: 'Tap a place in the example screen. See how a visual marker replaces a long location explanation.',
      stageTitle: 'TRY POINTING AT THIS EXAMPLE SCREEN',stageHint:'Tap anywhere on the example screen, or use a shortcut below.',
      mockApp: 'Example layout',mockTop: 'A page in progress',mockHead:'Make the next idea real.',mockSub:'You know exactly what needs changing.',
      mockButton:'Continue',mockLabel:'An empty space',
      presetTitle:'Point to', presetButton:'The button',presetHeading:'The heading',presetGap:'The empty space',
      beforeTitle:'BEFORE · DESCRIBING THE LOCATION',before:'Please adjust the element near the lower portion of this sample screen, below the heading but above the bottom of the card. Not the surrounding panel.',
      afterTitle:'AFTER · POINTING AT THE PLACE',after:'Please fix the spot marked ① in the attached image.',
      location:'Marker position on sample',marked:'Marked',unset:'Not marked yet',select:'Tap a location to mark it.',reset:'Clear the marker',
      note:'Illustrative LP-only interaction. This is not the Herebit app UI. No actual image is uploaded, copied, exported or shared. Herebit lets you choose an image, tap a location and share the marked image. This website example does not store data.'
    },
    ja: {
      kicker:'詠唱するな。指せ。',badge:'LP専用・操作デモ',title:'「そこじゃない」を、もう繰り返さない。',
      intro:'架空の画面で直したい場所をタップ。長い位置説明が、短い修正指示に変わる体験を試せます。',
      stageTitle:'この架空の画面で指してみる',stageHint:'画面内を自由にタップ。または下の候補から選んでください。',
      mockApp:'サンプル画面',mockTop:'作りかけのページ',mockHead:'次のアイデアを形に。',mockSub:'直したい場所は、もう見えている。',
      mockButton:'続ける',mockLabel:'ここの余白',
      presetTitle:'場所を選ぶ',presetButton:'ボタン',presetHeading:'見出し',presetGap:'余白',
      beforeTitle:'変更前・場所を言葉で説明',before:'画面の下の方、見出しより下で、カードの一番下より少し上にある部分です。周りのパネルではなく、その内側です。',
      afterTitle:'変更後・場所を指す',after:'添付画像の①の場所を直してください。',
      location:'サンプル内の印の位置',marked:'指定済み',unset:'指定前',select:'場所をタップして指定してください。',reset:'印を消す',
      note:'LPだけの説明用デモです。Herebitの実画面ではありません。画像のアップロード・コピー・書き出し・共有は行いません。Herebit本体は画像選択・場所指定・印を付けた画像の共有に対応します。このページはデータを保存しません。'
    },
    ar: {
      kicker:'أشِر، ولا تشرح المكان بكلمات كثيرة',badge:'عرض تفاعلي للموقع فقط',title:'لا تكرر «ليس هناك». حدّد المكان مباشرة.',
      intro:'انقر نقطة في الشاشة التوضيحية وشاهد كيف يمكن للعلامة المرئية أن تختصر وصف الموقع.',
      stageTitle:'جرّب الإشارة على شاشة توضيحية',stageHint:'انقر أي نقطة أو اختر مكاناً من الخيارات أدناه.',
      mockApp:'واجهة توضيحية',mockTop:'صفحة قيد الإنشاء',mockHead:'حوّل فكرتك التالية إلى واقع.',mockSub:'أنت تعرف بالفعل ما تريد تغييره.',
      mockButton:'متابعة',mockLabel:'المساحة الفارغة هنا',
      presetTitle:'حدّد المكان',presetButton:'الزر',presetHeading:'العنوان',presetGap:'المساحة الفارغة',
      beforeTitle:'قبل · وصف الموقع بالكلمات',before:'غيّر العنصر في الجزء السفلي من هذه الشاشة، أسفل العنوان وفوق نهاية البطاقة، وليس الإطار المحيط.',
      afterTitle:'بعد · الإشارة إلى المكان',after:'يرجى تعديل الموقع المحدد بالعلامة ① في الصورة المرفقة.',
      location:'موضع العلامة في المثال',marked:'تم التحديد',unset:'غير محدد',select:'انقر موقعاً لإضافة العلامة.',reset:'إزالة العلامة',
      note:'هذه تجربة توضيحية على الموقع فقط وليست واجهة التطبيق الفعلية. لا يتم رفع الصور أو نسخها أو تصديرها أو مشاركتها هنا. يتيح Herebit اختيار صورة وتحديد مكان فيها ومشاركة الصورة المعلّمة. لا تُخزّن هذه الصفحة البيانات.'
    }
  };
  const marker = {x:50,y:60};
  const positions = {button:{x:50,y:77},heading:{x:49,y:29},gap:{x:79,y:57}};
  const langNow = () => {
    const raw = String(document.getElementById('p199-language')?.value || document.documentElement.lang || 'en').toLowerCase().split(/[-_]/)[0];
    return L[raw] ? raw : 'en';
  };
  function mount() {
    if (document.getElementById('tsz-hb127')) return;
    const b = document.body;if (!b) return;
    const id=b.dataset.p199Id || b.dataset.p19AppId || '';
    if(id && id!==APP_ID) return;
    if(!id && !document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor = document.getElementById('tsz-hb91') || document.getElementById('tsz-herebit-r91') || document.getElementById('tsz-hb50') || document.getElementById('overview');
    const main=document.querySelector('main');if(!anchor && !main)return;
    const root=document.createElement('section');root.id='tsz-hb127';root.dataset.demo='herebit-illustrative-point-only';
    root.setAttribute('aria-label','Herebit website example: point to a place on a sample screen');
    root.innerHTML=`<div class="hb127-heading"><span data-t="kicker"></span><span class="hb127-tag" data-t="badge"></span></div>
      <h2 data-t="title"></h2><p class="hb127-intro" data-t="intro"></p>
      <div class="hb127-stage"><div class="hb127-stage-head"><strong data-t="stageTitle"></strong><span data-t="stageHint"></span></div>
      <div class="hb127-canvas" role="button" tabindex="0" aria-label="Point to a part of the example screen">
        <div class="hb127-app"><span class="hb127-brand" data-t="mockApp"></span><span class="hb127-dots">● ● ●</span></div>
        <div class="hb127-mock"><span class="hb127-eyebrow" data-t="mockTop"></span><h3 data-t="mockHead"></h3><p data-t="mockSub"></p><span class="hb127-samplebtn" data-t="mockButton"></span><span class="hb127-empty" data-t="mockLabel"></span></div>
        <span class="hb127-marker" aria-hidden="true" hidden>①</span></div>
      <div class="hb127-select"><div data-t="presetTitle" class="hb127-select-label"></div><div class="hb127-buttons">
        <button type="button" data-spot="button" data-t="presetButton"></button><button type="button" data-spot="heading" data-t="presetHeading"></button><button type="button" data-spot="gap" data-t="presetGap"></button><button type="button" data-clear data-t="reset"></button>
      </div></div></div>
      <div class="hb127-compare"><article><span class="hb127-before" data-t="beforeTitle"></span><p data-t="before"></p></article>
      <article><span class="hb127-after" data-t="afterTitle"></span><p data-t="after"></p><div class="hb127-state" aria-live="polite"><b data-out="state"></b><span data-out="position"></span></div></article></div>
      <p class="hb127-note" data-t="note"></p>`;
    if(anchor) anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    const canvas=root.querySelector('.hb127-canvas');const dot=root.querySelector('.hb127-marker');let active=false;let seen='';
    const out=(k,s)=>{root.querySelector(`[data-out="${k}"]`).textContent=s;};
    function render(){const lang=langNow();const t=L[lang];root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(n=>{n.textContent=t[n.dataset.t]||'';});
      dot.hidden=!active;dot.style.left=marker.x+'%';dot.style.top=marker.y+'%';
      out('state',active?t.marked:t.unset);out('position',active?`${Math.round(marker.x)}% × ${Math.round(marker.y)}%`:t.select);
      for(const btn of root.querySelectorAll('[data-spot]')) btn.setAttribute('aria-pressed',String(btn.dataset.spot===activeSpot));
      root.dataset.marked=String(active);seen=lang;
    }
    let activeSpot='';
    function place(x,y,spot=''){marker.x=Math.min(96,Math.max(4,x));marker.y=Math.min(94,Math.max(6,y));active=true;activeSpot=spot;render();}
    canvas.addEventListener('click',ev=>{const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;place((ev.clientX-r.left)/r.width*100,(ev.clientY-r.top)/r.height*100);});
    canvas.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();place(50,50);}});
    root.querySelectorAll('[data-spot]').forEach(btn=>btn.addEventListener('click',()=>{const where=positions[btn.dataset.spot];place(where.x,where.y,btn.dataset.spot);}));
    root.querySelector('[data-clear]').addEventListener('click',()=>{active=false;activeSpot='';render();});
    render();
    const selector=document.getElementById('p199-language');selector?.addEventListener('change',render);
    // Some LP language selectors update the DOM without emitting a change on this selector.
    const observer=new MutationObserver(()=>{if(seen!==langNow())render();});
    observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
