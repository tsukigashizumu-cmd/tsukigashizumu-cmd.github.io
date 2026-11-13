/* R187 LabelAuditLab — 3-source comparison, manual demonstration only. No scan/OCR/network/storage. */
(() => {
  'use strict';
  const APP_ID = '6825565448';
  const ROOT_ID = 'tsz-labelauditlab-r187';
  if (!document.body || document.body.dataset.p199Id !== APP_ID || document.getElementById(ROOT_ID)) return;

  const dictionary = {
    en: {
      brand:'LabelAuditLab', eyebrow:'THREE SOURCES · ONE CLEARER REVIEW',
      title1:'The code scans.', title2:'But does the label match?',
      subtitle:'A readable code is not proof that the printed label agrees.',
      demo:'EXPLORE THE COMPARISON', barcode:'Barcode', ocr:'Printed OCR', reference:'Reference',
      barcodeSub:'Code value (sample)', ocrSub:'Printed text candidate', refSub:'Expected reference value',
      edit:'Edit the three sample values', bad:'Potential mismatch · Review needed',
      good:'Values agree · Review the source', missing:'Insufficient evidence · Enter all three',
      badDesc:'These entries do not all agree. OCR can be uncertain; check the original label.',
      goodDesc:'The three manually entered strings agree. This is not a certification.',
      missingDesc:'A blank source cannot establish agreement. Add its value to compare.',
      selected:'Source to review', allDifferent:'Multiple values differ', noSource:'Missing entry',
      result:'COMPARISON RESULT', reset:'Reset sample', store:'View on the App Store',
      badgeCode:'CODE', badgeOcr:'OCR CANDIDATE', badgeRef:'REFERENCE',
      note:'Illustrative, manually entered demo. No scanning or OCR on this page. Not a certification or compliance determination.',
      footer1:'Read the code', footer2:'Check the print', footer3:'Compare to reference',
      match:'MATCH', differs:'REVIEW', unknown:'NO VALUE', feature:'The middle value can change the conclusion.',
      sample:'Sample lot ID (up to 48 characters)', change:'Change the OCR value to L-042 to see an agreement.',
      comparison:'Compare three sources without assuming any one is correct.'
    },
    ja: {
      brand:'LabelAuditLab', eyebrow:'3つの情報を照合',
      title1:'コードは読めた。', title2:'印字も一致する？',
      subtitle:'コードが読み取れても、印字や参照値との一致は別の問題です。',
      demo:'3つの値を比較する', barcode:'コードの値', ocr:'印字OCR候補', reference:'参照値',
      barcodeSub:'コードで読み取った想定値', ocrSub:'印字認識の候補', refSub:'照合用に入力した値',
      edit:'3つのサンプル値を編集', bad:'不一致の可能性 · 要確認',
      good:'3つの入力値が一致 · 原本を確認', missing:'根拠不足 · 3つの値が必要',
      badDesc:'入力値に違いがあります。OCRには誤認識もあるため、ラベル原本を確認してください。',
      goodDesc:'手入力した3つの値が一致しました。品質認証や合否判定ではありません。',
      missingDesc:'空欄があるため一致を判断できません。3つの値を入力してください。',
      selected:'確認対象', allDifferent:'複数の値が異なります', noSource:'未入力の項目',
      result:'照合結果', reset:'サンプルに戻す', store:'App Storeで見る',
      badgeCode:'コード', badgeOcr:'OCR候補', badgeRef:'参照値',
      note:'手動入力による説明用デモです。このページはスキャン・OCRを実行しません。認証・適合性の判定には使えません。',
      footer1:'コードを読む', footer2:'印字を確認', footer3:'参照値と照合',
      match:'一致', differs:'要確認', unknown:'未入力', feature:'真ん中の値が違うだけで、確認結果は変わります。',
      sample:'サンプルロット番号（48文字まで）', change:'OCR候補を L-042 に変更すると一致します。',
      comparison:'3つのうち1つを無条件に正解と決めつけません。'
    },
    ar: {
      brand:'LabelAuditLab', eyebrow:'ثلاثة مصادر · مراجعة أوضح',
      title1:'تمت قراءة الرمز.', title2:'لكن هل تطابق الطباعة؟',
      subtitle:'قراءة الرمز لا تعني تطابق النص المطبوع مع القيمة المرجعية.',
      demo:'جرّب مقارنة المصادر', barcode:'الرمز', ocr:'نص الطباعة عبر OCR', reference:'القيمة المرجعية',
      barcodeSub:'قيمة الرمز في المثال', ocrSub:'نص مطبوع محتمل', refSub:'القيمة المتوقعة للمقارنة',
      edit:'عدّل القيم الثلاث التجريبية', bad:'اختلاف محتمل · يحتاج مراجعة',
      good:'القيم متطابقة · راجع الأصل', missing:'أدلة غير كافية · أدخل القيم الثلاث',
      badDesc:'القيم المدخلة ليست متطابقة. قد يخطئ OCR، فتحقق من الملصق الأصلي.',
      goodDesc:'تطابقت السلاسل الثلاث المدخلة يدوياً. هذا ليس اعتماداً رسمياً.',
      missingDesc:'لا يمكن إثبات التطابق مع وجود خانة فارغة. أدخل القيمة الناقصة.',
      selected:'المصدر الذي يحتاج مراجعة', allDifferent:'عدة قيم مختلفة', noSource:'قيمة مفقودة',
      result:'نتيجة المقارنة', reset:'إعادة المثال', store:'عرضه على App Store',
      badgeCode:'الرمز', badgeOcr:'مرشح OCR', badgeRef:'المرجع',
      note:'مثال يدوي للتوضيح فقط. لا يتم مسح الرموز أو التعرف على النص هنا. ليس شهادة أو حكماً على المطابقة.',
      footer1:'اقرأ الرمز', footer2:'راجع الطباعة', footer3:'قارن المرجع',
      match:'متطابق', differs:'مراجعة', unknown:'مفقود', feature:'قد تختلف القيمة الوسطى رغم تطابق القيمتين الأخريين.',
      sample:'رمز الدفعة للتجربة (48 حرفاً كحد أقصى)', change:'غيّر قيمة OCR إلى L-042 لتجربة التطابق.',
      comparison:'لا تفترض أن أحد المصادر هو الصحيح دائماً.'
    }
  };

  const root=document.createElement('section');
  root.id=ROOT_ID;
  root.className='lal187';
  root.setAttribute('aria-labelledby','lal187-heading');
  root.innerHTML=`
    <div class="lal187-header"><span class="lal187-mark" aria-hidden="true">▦</span><strong data-lal-text="brand"></strong><span class="lal187-headerline"></span><span data-lal-text="eyebrow"></span></div>
    <div class="lal187-hero">
      <div class="lal187-copy">
        <p class="lal187-kicker" data-lal-text="eyebrow"></p>
        <h2 id="lal187-heading"><span data-lal-text="title1"></span><em data-lal-text="title2"></em></h2>
        <p class="lal187-subtitle" data-lal-text="subtitle"></p>
        <div class="lal187-boxart" aria-hidden="true"><div class="lal187-carton"><div class="lal187-label"><span class="lal187-qr"></span><span class="lal187-lot"><b>LOT</b><strong>L-043</strong><small>GTIN 0123456789012</small></span></div></div><span class="lal187-magnifier"></span></div>
      </div>
      <div class="lal187-panel">
        <p class="lal187-paneltitle" data-lal-text="demo"></p>
        <div class="lal187-valuecards">
          <div class="lal187-valuecard" data-source="barcode"><span class="lal187-ic" aria-hidden="true">▥</span><span data-lal-text="barcode"></span><strong id="lal187-card-barcode" dir="ltr">L-042</strong><small data-lal-text="barcodeSub"></small><b id="lal187-state-barcode"></b></div>
          <div class="lal187-valuecard" data-source="ocr"><span class="lal187-ic" aria-hidden="true">⌗</span><span data-lal-text="ocr"></span><strong id="lal187-card-ocr" dir="ltr">L-043</strong><small data-lal-text="ocrSub"></small><b id="lal187-state-ocr"></b></div>
          <div class="lal187-valuecard" data-source="reference"><span class="lal187-ic" aria-hidden="true">◎</span><span data-lal-text="reference"></span><strong id="lal187-card-reference" dir="ltr">L-042</strong><small data-lal-text="refSub"></small><b id="lal187-state-reference"></b></div>
        </div>
        <div class="lal187-result" role="status" aria-live="polite" data-status="mismatch"><span class="lal187-warn" aria-hidden="true">!</span><div><small data-lal-text="result"></small><strong id="lal187-headline"></strong><p id="lal187-description"></p><p id="lal187-focus"></p></div></div>
        <div class="lal187-edit">
          <div class="lal187-editheading"><strong data-lal-text="edit"></strong><button type="button" id="lal187-reset" data-lal-text="reset"></button></div>
          <div class="lal187-fields">
            <label><span data-lal-text="barcode"></span><input type="text" id="lal187-barcode" dir="ltr" value="L-042" maxlength="48" spellcheck="false" autocomplete="off" aria-label="Barcode sample value"></label>
            <label><span data-lal-text="ocr"></span><input type="text" id="lal187-ocr" dir="ltr" value="L-043" maxlength="48" spellcheck="false" autocomplete="off" aria-label="Printed OCR sample value"></label>
            <label><span data-lal-text="reference"></span><input type="text" id="lal187-reference" dir="ltr" value="L-042" maxlength="48" spellcheck="false" autocomplete="off" aria-label="Reference sample value"></label>
          </div>
          <p class="lal187-hint" data-lal-text="change"></p>
        </div>
      </div>
    </div>
    <div class="lal187-footer"><div class="lal187-featureline"><span data-lal-text="footer1"></span><i aria-hidden="true">/</i><span data-lal-text="footer2"></span><i aria-hidden="true">/</i><span data-lal-text="footer3"></span></div>
      <a class="lal187-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/id6825565448"><span aria-hidden="true">●</span><span data-lal-text="store"></span><span aria-hidden="true">↗</span></a>
      <p class="lal187-disclaimer" data-lal-text="note"></p></div>`;
  const anchor=document.querySelector('.p19-breadcrumb');
  if (anchor && anchor.parentNode) anchor.insertAdjacentElement('afterend',root);
  else {
    const main=document.querySelector('#p199-content')||document.querySelector('main');
    if(main&&main.parentNode) main.parentNode.insertBefore(root,main);
  }
  if(!root.isConnected)return;
  const $=selector=>root.querySelector(selector);
  const $$=selector=>Array.from(root.querySelectorAll(selector));
  let lang='en';
  function detectLang(){
    const selector=document.querySelector('#p199-language');
    const x=String(selector?.value||new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'en').toLowerCase();
    return x.startsWith('ar')?'ar':x.startsWith('ja')?'ja':'en';
  }
  function country(){
    const x=String(document.querySelector('#p199-country')?.value||'us').toLowerCase();
    return /^[a-z]{2}$/.test(x)?x:'us';
  }
  function render(){
    const s=dictionary[lang];
    $$('.lal187-valuecard').forEach(el=>{el.dataset.state='normal'});
    const values=['barcode','ocr','reference'].map(k=>$('#lal187-'+k).value.trim());
    const labels=['barcode','ocr','reference'];
    let status='match',focus='';
    if(values.some(v=>!v)){
      status='missing';const blank=labels.filter((_,i)=>!values[i]);focus=s.noSource+': '+blank.map(k=>s[k]).join(' · ');
    } else if(!(values[0]===values[1]&&values[1]===values[2])){
      status='mismatch';
      const groups=new Map();values.forEach((v,i)=>groups.set(v,[...(groups.get(v)||[]),i]));
      const minority=[...groups.values()].filter(g=>g.length===1);
      if(minority.length===1&&groups.size===2){
        const index=minority[0][0];$('.lal187-valuecard[data-source="'+labels[index]+'"]').dataset.state='mismatch';
        focus=s.selected+': '+s[labels[index]];
      } else {
        $$('.lal187-valuecard').forEach(el=>el.dataset.state='mismatch');
        focus=s.allDifferent;
      }
    }
    labels.forEach((key,i)=>{
      $('#lal187-card-'+key).textContent=values[i]||'—';
      const state= !values[i] ? 'missing' : status==='match' ? 'match' : status==='missing' ? 'unknown' : $('.lal187-valuecard[data-source="'+key+'"]').dataset.state==='mismatch' ? 'differs' : 'match';
      $('#lal187-state-'+key).textContent=s[state==='missing'?'unknown':state];
    });
    const panel=$('.lal187-result');panel.dataset.status=status;
    $('#lal187-headline').textContent=s[status==='match'?'good':status==='missing'?'missing':'bad'];
    $('#lal187-description').textContent=s[status==='match'?'goodDesc':status==='missing'?'missingDesc':'badDesc'];
    $('#lal187-focus').textContent=status==='match'?s.comparison:focus;
  }
  function applyLanguage(){
    lang=detectLang();root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
    const s=dictionary[lang];
    $$('[data-lal-text]').forEach(el=>el.textContent=s[el.dataset.lalText]||'');
    $$('.lal187-fields label').forEach((el,i)=>el.querySelector('input').setAttribute('aria-label',s[['barcode','ocr','reference'][i]]));
    $('.lal187-store').href='https://apps.apple.com/'+country()+'/app/id'+APP_ID;
    render();
  }
  ['barcode','ocr','reference'].forEach(k=>$('#lal187-'+k).addEventListener('input',render));
  $('#lal187-reset').addEventListener('click',()=>{ $('#lal187-barcode').value='L-042';$('#lal187-ocr').value='L-043';$('#lal187-reference').value='L-042';render(); });
  document.querySelector('#p199-language')?.addEventListener('change',applyLanguage);
  document.querySelector('#p199-country')?.addEventListener('change',()=>{$('.lal187-store').href='https://apps.apple.com/'+country()+'/app/id'+APP_ID;});
  window.addEventListener('popstate',applyLanguage);
  applyLanguage();
})();
