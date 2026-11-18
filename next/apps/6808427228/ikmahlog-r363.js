/* R363: IkmahLog LP-only repair-record details illustration. No storage, tracking or network. */
(() => {
  'use strict';
  const ID = 'tsz-r363-ikmahlog';
  if (document.getElementById(ID)) return;
  const dict = {
    en: {
      eyebrow: 'IkmahLog / A record you can explain', lang: 'Language', title: 'Six months later, can you explain this repair?',
      intro: 'You remember paying the shop. The date, mileage and receipt are another story. Give those details a place before they disappear.',
      quote: 'The app records maintenance, costs, mileage, notes and attachments. This is only an illustration of the details worth keeping.',
      panel: 'Illustrative service record', sample: 'Sample only', oil: 'Oil & filter', tire: 'Tire repair', battery: 'Battery', date: 'Service date',
      mileage: 'Odometer (mi)', cost: 'Paid (USD)', note: 'What was done', receipt: 'I kept the receipt / attachment',
      score: 'Details filled in', missing: 'Still missing: ', complete: 'All five illustrative details are present.',
      invalid: 'Enter a valid date, mileage (0–9,999,999), and amount (0–999,999.99).',
      dateMissing: 'service date', mileageMissing: 'odometer', costMissing: 'amount', noteMissing: 'work note', receiptMissing: 'receipt',
      reset: 'Restore sample', cta: 'View IkmahLog on the App Store', disclaimer: 'Fictional LP-only demo. The receipt switch is not an upload. No saving, file handling, reminders, iCloud, diagnostics, analytics or external requests are performed by this demo.'
    },
    ja: {
      eyebrow: 'IkmahLog / 説明できる整備記録', lang: '言語', title: '半年後、その修理を説明できますか。',
      intro: 'お店に代金を払ったことは覚えている。では、日付・走行距離・領収書は？　記憶が薄れる前に、残したい情報を見える形に。',
      quote: 'アプリは整備・費用・走行距離・メモ・添付資料を記録できます。ここでは残しておきたい情報を例示します。',
      panel: '架空の整備記録', sample: 'サンプルのみ', oil: 'オイル交換', tire: 'タイヤ修理', battery: 'バッテリー', date: '整備日',
      mileage: '走行距離（mi）', cost: '支払額（USD）', note: '作業内容', receipt: '領収書・添付資料を保管した',
      score: '記入済みの項目', missing: '未記入：', complete: '例示した5項目がすべてそろっています。',
      invalid: '有効な日付、走行距離（0～9,999,999）、金額（0～999,999.99）を入力してください。',
      dateMissing: '整備日', mileageMissing: '走行距離', costMissing: '支払額', noteMissing: '作業メモ', receiptMissing: '領収書',
      reset: 'サンプルに戻す', cta: 'App StoreでIkmahLogを見る', disclaimer: '架空のLP専用デモです。領収書のチェックはアップロードではありません。このデモは保存・ファイル処理・通知・iCloud・車両診断・アクセス解析・外部通信を行いません。'
    },
    ar: {
      eyebrow: 'IkmahLog / سجل يمكنك شرحه', lang: 'اللغة', title: 'بعد ستة أشهر، هل يمكنك شرح هذا الإصلاح؟',
      intro: 'تتذكر أنك دفعت للورشة. ولكن ماذا عن التاريخ والعداد والإيصال؟ احتفظ بالتفاصيل قبل أن تنساها.',
      quote: 'يتيح التطبيق تسجيل الصيانة والتكاليف والعداد والملاحظات والمرفقات. هذا مثال توضيحي فقط.',
      panel: 'سجل صيانة توضيحي', sample: 'مثال فقط', oil: 'زيت وفلتر', tire: 'إصلاح إطار', battery: 'بطارية', date: 'تاريخ الخدمة',
      mileage: 'عداد المسافة (ميل)', cost: 'المبلغ المدفوع (دولار)', note: 'وصف العمل', receipt: 'احتفظت بالإيصال أو المرفق',
      score: 'تفاصيل مكتملة', missing: 'لا يزال ينقص: ', complete: 'التفاصيل الخمسة التوضيحية مكتملة.',
      invalid: 'أدخل تاريخًا وعدادًا (0–9,999,999) ومبلغًا (0–999,999.99) صالحًا.',
      dateMissing: 'التاريخ', mileageMissing: 'العداد', costMissing: 'المبلغ', noteMissing: 'الملاحظة', receiptMissing: 'الإيصال',
      reset: 'استعادة المثال', cta: 'عرض IkmahLog في App Store', disclaimer: 'مثال تفاعلي خاص بالصفحة فقط. خيار الإيصال ليس رفع ملف. لا يحفظ هذا المثال البيانات ولا يرسلها أو يجري تشخيصًا أو إشعارات أو تحليلات.'
    }
  };
  // R366: source-faithful AI translation drafts for 8 additional language groups.
  Object.assign(dict,{"es":{"eyebrow":"IkmahLog / Un registro que puedes explicar","lang":"Idioma","title":"Seis meses después, ¿podrás explicar esta reparación?","intro":"Recuerdas el pago, pero ¿la fecha, los kilómetros y el recibo? Guarda los detalles antes de olvidarlos.","quote":"La aplicación permite registrar mantenimiento, costes, kilometraje, notas y adjuntos. Esto solo ilustra qué conviene conservar.","panel":"Registro de mantenimiento ficticio","sample":"Solo muestra","oil":"Aceite y filtro","tire":"Reparación de neumático","battery":"Batería","date":"Fecha del servicio","mileage":"Odómetro (mi)","cost":"Importe pagado (USD)","note":"Trabajo realizado","receipt":"Conservé el recibo o adjunto","score":"Detalles completados","missing":"Falta:","complete":"Los cinco detalles ficticios están presentes.","invalid":"Introduce una fecha, un kilometraje (0–9.999.999) y un importe (0–999.999,99) válidos.","dateMissing":"fecha","mileageMissing":"kilometraje","costMissing":"importe","noteMissing":"nota del trabajo","receiptMissing":"recibo","reset":"Restaurar ejemplo","cta":"Ver IkmahLog en App Store","disclaimer":"Demostración ficticia solo para esta página. Marcar el recibo no lo sube. Sin guardado, archivos, avisos, iCloud, diagnóstico, analítica ni solicitudes externas."},"de":{"eyebrow":"IkmahLog / Wartung nachvollziehbar","lang":"Sprache","title":"Kannst du diese Reparatur in sechs Monaten noch erklären?","intro":"Die Rechnung wurde bezahlt. Aber wann war das, wie hoch war der Kilometerstand und wo ist der Beleg?","quote":"Die App dokumentiert Wartung, Kosten, Kilometerstände, Notizen und Anhänge. Dies ist nur ein Beispiel.","panel":"Fiktiver Wartungseintrag","sample":"Nur Beispiel","oil":"Öl und Filter","tire":"Reifenreparatur","battery":"Batterie","date":"Wartungsdatum","mileage":"Kilometerstand (mi)","cost":"Betrag (USD)","note":"Erledigte Arbeiten","receipt":"Beleg oder Anhang aufbewahrt","score":"Erfasste Angaben","missing":"Es fehlt:","complete":"Alle fünf Beispielangaben sind vorhanden.","invalid":"Gültiges Datum, Kilometerstand (0–9.999.999) und Betrag (0–999.999,99) eingeben.","dateMissing":"Datum","mileageMissing":"Kilometerstand","costMissing":"Betrag","noteMissing":"Arbeitsnotiz","receiptMissing":"Beleg","reset":"Beispiel wiederherstellen","cta":"IkmahLog im App Store ansehen","disclaimer":"Reine fiktive LP-Demo. Der Belegschalter lädt keine Datei hoch. Keine Speicherung, Dateiverarbeitung, Erinnerungen, iCloud, Diagnose, Analyse oder externen Anfragen."},"fr":{"eyebrow":"IkmahLog / Une réparation documentée","lang":"Langue","title":"Six mois plus tard, saurez-vous expliquer cette réparation ?","intro":"Vous vous souvenez d’avoir payé. Mais connaissez-vous la date, le kilométrage et l’emplacement du reçu ?","quote":"L’application permet de noter l’entretien, les coûts, le kilométrage, les notes et les pièces jointes. Exemple uniquement.","panel":"Fiche d’entretien fictive","sample":"Exemple uniquement","oil":"Huile et filtre","tire":"Réparation de pneu","battery":"Batterie","date":"Date d’entretien","mileage":"Compteur (mi)","cost":"Somme payée (USD)","note":"Travaux effectués","receipt":"J’ai conservé le reçu ou la pièce jointe","score":"Détails renseignés","missing":"Il manque :","complete":"Les cinq détails fictifs sont présents.","invalid":"Saisissez une date, un compteur (0–9 999 999) et un montant (0–999 999,99) valides.","dateMissing":"date","mileageMissing":"compteur","costMissing":"montant","noteMissing":"note de réparation","receiptMissing":"reçu","reset":"Rétablir l’exemple","cta":"Voir IkmahLog sur l’App Store","disclaimer":"Démo fictive réservée à cette page. Cocher le reçu ne le téléverse pas. Aucun enregistrement, fichier, rappel, iCloud, diagnostic, analyse ni requête externe."},"pt":{"eyebrow":"IkmahLog / Um registo que pode explicar","lang":"Idioma","title":"Daqui a seis meses, consegue explicar esta reparação?","intro":"Lembra-se de ter pago. Mas e a data, a quilometragem e o recibo? Guarde os detalhes antes de se esquecer.","quote":"A aplicação regista manutenção, custos, quilometragem, notas e anexos. Isto é apenas um exemplo.","panel":"Registo de manutenção fictício","sample":"Apenas exemplo","oil":"Óleo e filtro","tire":"Reparação de pneu","battery":"Bateria","date":"Data da manutenção","mileage":"Odómetro (mi)","cost":"Valor pago (USD)","note":"Trabalho efetuado","receipt":"Guardei o recibo ou anexo","score":"Detalhes preenchidos","missing":"Em falta:","complete":"Os cinco detalhes fictícios estão presentes.","invalid":"Introduza data, quilometragem (0–9.999.999) e valor (0–999.999,99) válidos.","dateMissing":"data","mileageMissing":"quilometragem","costMissing":"valor","noteMissing":"nota de serviço","receiptMissing":"recibo","reset":"Repor exemplo","cta":"Ver IkmahLog na App Store","disclaimer":"Demonstração fictícia desta página. O botão de recibo não envia ficheiros. Sem gravação, ficheiros, lembretes, iCloud, diagnóstico, análise ou pedidos externos."},"it":{"eyebrow":"IkmahLog / Manutenzione documentata","lang":"Lingua","title":"Tra sei mesi saprai spiegare questa riparazione?","intro":"Ricordi di aver pagato l’officina, ma data, chilometraggio e ricevuta? Conserva i dettagli prima di dimenticarli.","quote":"L’app registra manutenzioni, costi, chilometraggio, note e allegati. Questo è solo un esempio.","panel":"Scheda di manutenzione fittizia","sample":"Solo esempio","oil":"Olio e filtro","tire":"Riparazione pneumatico","battery":"Batteria","date":"Data intervento","mileage":"Contachilometri (mi)","cost":"Importo pagato (USD)","note":"Lavoro svolto","receipt":"Ho conservato ricevuta o allegato","score":"Dettagli compilati","missing":"Manca:","complete":"Tutti e cinque i dettagli fittizi sono presenti.","invalid":"Inserisci una data, un chilometraggio (0–9.999.999) e un importo (0–999.999,99) validi.","dateMissing":"data","mileageMissing":"chilometraggio","costMissing":"importo","noteMissing":"nota del lavoro","receiptMissing":"ricevuta","reset":"Ripristina esempio","cta":"Vedi IkmahLog sull’App Store","disclaimer":"Demo fittizia solo per questa pagina. La spunta non carica ricevute. Nessun salvataggio, file, promemoria, iCloud, diagnostica, analisi o richiesta esterna."},"zh-Hans":{"eyebrow":"IkmahLog / 有据可查的维修记录","lang":"语言","title":"半年后，你还能说清这次维修吗？","intro":"你记得付过修理费，但日期、里程和收据呢？别等细节消失才想起记录。","quote":"应用可记录保养、费用、里程、备注和附件。这里仅演示值得保留的信息。","panel":"虚构维修记录","sample":"仅为示例","oil":"机油与滤芯","tire":"轮胎维修","battery":"电池","date":"维修日期","mileage":"里程表（英里）","cost":"支付金额（美元）","note":"维修内容","receipt":"已保留收据或附件","score":"已填写项目","missing":"仍缺少：","complete":"五项示例信息已经齐全。","invalid":"请输入有效的日期、里程（0–9,999,999）和金额（0–999,999.99）。","dateMissing":"日期","mileageMissing":"里程","costMissing":"金额","noteMissing":"维修备注","receiptMissing":"收据","reset":"恢复示例","cta":"前往 App Store 查看 IkmahLog","disclaimer":"仅用于此页面的虚构演示。勾选收据并不会上传文件。不保存数据、不处理文件、不发送提醒、不使用 iCloud、不诊断车辆、不分析或联网。"},"zh-Hant":{"eyebrow":"IkmahLog / 有據可查的維修紀錄","lang":"語言","title":"半年後，你還能說清這次維修嗎？","intro":"你記得付過維修費，但日期、里程和收據呢？別等細節消失才想起記錄。","quote":"應用程式可記錄保養、費用、里程、備註及附件。此處僅示範值得保留的資訊。","panel":"虛構維修紀錄","sample":"僅供示範","oil":"機油與濾芯","tire":"輪胎維修","battery":"電池","date":"維修日期","mileage":"里程錶（英里）","cost":"支付金額（美元）","note":"維修內容","receipt":"已保留收據或附件","score":"已填寫項目","missing":"仍缺少：","complete":"五項示範資訊均已齊全。","invalid":"請輸入有效日期、里程（0–9,999,999）與金額（0–999,999.99）。","dateMissing":"日期","mileageMissing":"里程","costMissing":"金額","noteMissing":"維修備註","receiptMissing":"收據","reset":"還原範例","cta":"前往 App Store 查看 IkmahLog","disclaimer":"僅供此頁使用的虛構示範。勾選收據不會上傳檔案。不儲存資料、不處理檔案、不發送提醒、不使用 iCloud、不診斷車輛、不分析或連網。"},"ko":{"eyebrow":"IkmahLog / 설명할 수 있는 정비 기록","lang":"언어","title":"6개월 뒤에도 이 수리를 설명할 수 있나요?","intro":"수리비를 낸 건 기억납니다. 날짜, 주행거리, 영수증은요? 잊기 전에 세부 내용을 남겨 두세요.","quote":"앱은 정비, 비용, 주행거리, 메모, 첨부 자료를 기록합니다. 여기서는 기록할 만한 항목만 예시로 보여 줍니다.","panel":"가상의 정비 기록","sample":"예시 전용","oil":"엔진오일과 필터","tire":"타이어 수리","battery":"배터리","date":"정비 날짜","mileage":"주행거리(마일)","cost":"지불 금액(USD)","note":"작업 내용","receipt":"영수증 또는 첨부 자료 보관","score":"입력한 항목","missing":"미입력:","complete":"가상의 5개 항목이 모두 입력되었습니다.","invalid":"올바른 날짜, 주행거리(0–9,999,999), 금액(0–999,999.99)을 입력하세요.","dateMissing":"날짜","mileageMissing":"주행거리","costMissing":"금액","noteMissing":"정비 메모","receiptMissing":"영수증","reset":"예시 복원","cta":"App Store에서 IkmahLog 보기","disclaimer":"이 페이지 전용 가상 데모입니다. 영수증 체크는 업로드가 아닙니다. 저장, 파일 처리, 알림, iCloud, 차량 진단, 분석, 외부 통신은 하지 않습니다."}});
  const examples = {
    oil: { date: '2026-05-12', mileage: '41860', cost: '89.50', note: 'Oil and filter replaced', receipt: false },
    tire: { date: '2026-08-03', mileage: '45520', cost: '138.00', note: 'Rear tire puncture repaired', receipt: true },
    battery: { date: '2026-10-09', mileage: '49650', cost: '192.00', note: '', receipt: true }
  };
  const sampleNotes = {
    en: { oil:'Oil and filter replaced', tire:'Rear tire puncture repaired', battery:'' },
    ja: { oil:'エンジンオイルとフィルターを交換', tire:'後輪のパンクを修理', battery:'' },
    ar: { oil:'استبدال زيت المحرك والفلتر', tire:'إصلاح ثقب الإطار الخلفي', battery:'' }
  };
  Object.assign(sampleNotes,{"es":{"oil":"Aceite y filtro reemplazados","tire":"Pinchazo del neumático trasero reparado","battery":""},"de":{"oil":"Öl und Filter gewechselt","tire":"Hinterreifen repariert","battery":""},"fr":{"oil":"Huile et filtre remplacés","tire":"Pneu arrière réparé","battery":""},"pt":{"oil":"Óleo e filtro substituídos","tire":"Furo no pneu traseiro reparado","battery":""},"it":{"oil":"Olio e filtro sostituiti","tire":"Foratura posteriore riparata","battery":""},"zh-Hans":{"oil":"更换机油和滤芯","tire":"修补后轮破损","battery":""},"zh-Hant":{"oil":"更換機油與濾芯","tire":"修補後輪破損","battery":""},"ko":{"oil":"엔진오일 및 필터 교체","tire":"뒷바퀴 펑크 수리","battery":""}});
  const root = document.createElement('section');
  root.id = ID; root.setAttribute('aria-label','IkmahLog example service record'); root.setAttribute('dir','ltr');
  root.innerHTML = `
    <div class="r363-head">
      <div class="r363-eyebrow"><span class="r363-beacon" aria-hidden="true"></span><span data-r363-t="eyebrow"></span></div>
      <span class="r363-language" data-r363-translation-pending hidden role="status"></span>
    </div>
    <div class="r363-layout">
      <div class="r363-intro"><h2 data-r363-t="title"></h2><p data-r363-t="intro"></p><div class="r363-line"></div><div class="r363-quote" data-r363-t="quote"></div></div>
      <div class="r363-demo">
        <div class="r363-demo-top"><strong data-r363-t="panel"></strong><small data-r363-t="sample"></small></div>
        <div class="r363-presets" role="group" aria-label="Sample records">
          <button type="button" data-r363-preset="oil" aria-pressed="true" data-r363-t="oil"></button>
          <button type="button" data-r363-preset="tire" aria-pressed="false" data-r363-t="tire"></button>
          <button type="button" data-r363-preset="battery" aria-pressed="false" data-r363-t="battery"></button>
        </div>
        <div class="r363-fields">
          <label class="r363-field"><span data-r363-t="date"></span><input data-r363-field="date" type="date"></label>
          <label class="r363-field"><span data-r363-t="mileage"></span><input data-r363-field="mileage" type="number" min="0" max="9999999" step="1" inputmode="numeric"></label>
          <label class="r363-field r363-field-wide"><span data-r363-t="cost"></span><input data-r363-field="cost" type="number" min="0" max="999999.99" step="0.01" inputmode="decimal"></label>
          <label class="r363-field r363-field-wide"><span data-r363-t="note"></span><textarea data-r363-field="note" maxlength="180"></textarea></label>
          <label class="r363-receipt r363-field-wide"><input data-r363-field="receipt" type="checkbox"><span data-r363-t="receipt"></span></label>
        </div>
        <div class="r363-score"><div class="r363-score-top"><span data-r363-t="score"></span><strong data-r363-score aria-live="polite"></strong></div><div class="r363-meter" aria-hidden="true"><div data-r363-meter></div></div><div class="r363-status" data-r363-status role="status" aria-live="polite"></div></div>
        <div class="r363-actions"><button type="button" class="r363-reset" data-r363-reset data-r363-t="reset"></button><a href="https://apps.apple.com/us/app/ikmahlog-vehicle-records/id6808427228" target="_blank" rel="noopener noreferrer" data-r363-t="cta"></a></div>
        <p class="r363-disclaimer" data-r363-t="disclaimer"></p>
      </div>
    </div>`;
  const nav = document.querySelector('nav.p19-breadcrumb');
  const main = document.querySelector('main');
  if (nav) nav.insertAdjacentElement('afterend', root);
  else if (main) main.insertAdjacentElement('afterbegin', root);
  else if (document.body) document.body.appendChild(root);
  else return;
  const $ = name => root.querySelector(`[data-r363-field="${name}"]`);
  const score = root.querySelector('[data-r363-score]');
  const status = root.querySelector('[data-r363-status]');
  const meter = root.querySelector('[data-r363-meter]');
  const pendingNotice = root.querySelector('[data-r363-translation-pending]');
  let current = 'oil';
  let language = 'en';
  const isDate = v => /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v)) && new Date(v + 'T00:00:00Z').toISOString().slice(0,10) === v;
  const isMileage = v => v.trim() !== '' && /^(0|[1-9]\d*)$/.test(v) && Number(v) <= 9999999;
  const isMoney = v => v.trim() !== '' && /^\d+(?:\.\d{1,2})?$/.test(v) && Number(v) <= 999999.99;
  function redraw() {
    const t = dict[language];
    const dateOK = isDate($('date').value);
    const mileageOK = isMileage($('mileage').value);
    const costOK = isMoney($('cost').value);
    const noteOK = $('note').value.trim().length > 0;
    const receiptOK = $('receipt').checked;
    const entries = [['dateMissing',dateOK],['mileageMissing',mileageOK],['costMissing',costOK],['noteMissing',noteOK],['receiptMissing',receiptOK]];
    const count = entries.filter(([,ok]) => ok).length;
    score.textContent = `${count} / 5`;
    meter.style.width = `${count*20}%`;
    const invalid = !dateOK || !mileageOK || !costOK;
    const missing = entries.filter(([,ok]) => !ok).map(([key]) => t[key]);
    status.textContent = invalid ? t.invalid : (missing.length ? t.missing + missing.join(' · ') : t.complete);
    status.classList.toggle('r363-error', invalid);
    root.setAttribute('data-r363-valid', String(!invalid));
  }
  function translate(l, code) {
    if (!dict[l]) l = 'en';
    const pending = !(Object.hasOwn(dict,code) || Object.hasOwn(dict,code.split('-')[0].toLowerCase()));
    root.dataset.tszLocale = code; root.dataset.tszLocaleFallback = String(pending);
    pendingNotice.hidden = !pending;
    pendingNotice.textContent = pending ? code + ': translation pending · showing English demo' : '';
    const oldLanguage = language;
    if ($('note') && $('note').value === sampleNotes[oldLanguage][current]) {
      $('note').value = sampleNotes[l][current];
    }
    language = l; root.dir = ['ar-SA','he','ur-PK'].includes(code) ? 'rtl' : 'ltr'; root.lang = l;
    root.querySelectorAll('[data-r363-t]').forEach(el => {el.textContent = dict[l][el.getAttribute('data-r363-t')];});
    redraw();
  }
  function preset(key) {
    const x = examples[key]; if (!x) return;
    current = key;
    ['date','mileage','cost'].forEach(k => {$(k).value=x[k];});
    $('note').value=sampleNotes[language][key];
    $('receipt').checked = x.receipt;
    root.querySelectorAll('[data-r363-preset]').forEach(el => el.setAttribute('aria-pressed', String(el.getAttribute('data-r363-preset')===key)));
    redraw();
  }
  root.querySelectorAll('[data-r363-preset]').forEach(el => el.addEventListener('click',() => preset(el.getAttribute('data-r363-preset'))));
  root.querySelectorAll('[data-r363-field]').forEach(el => el.addEventListener('input',redraw));
  root.querySelector('[data-r363-reset]').addEventListener('click',() => preset('oil'));
  function syncLocale(code){
    if(typeof code!=='string'||!/^([a-z]{2,3})(?:-[a-zA-Z]{2,5})?$/.test(code))return;
    const base=code.split('-')[0].toLowerCase();
    translate(Object.hasOwn(dict,code)?code:Object.hasOwn(dict,base)?base:'en',code);
  }
  // R365: listen to the page's 50-code locale contract, not an independent 3-way select.
  window.addEventListener('tsz:locale-change',event=>{if(event.detail?.version===1)syncLocale(event.detail.locale)});
  const siteLang = document.getElementById('p199-language')?.value || document.documentElement.lang || 'en-US';
  syncLocale(siteLang);
  preset('oil');
})();
