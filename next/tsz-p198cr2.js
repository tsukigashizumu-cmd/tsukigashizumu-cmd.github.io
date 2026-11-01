/* TSZ P19-8CR2 — full localized product overviews, no observers and no network calls. */
(() => {
  'use strict';
  const LABELS = {
    'ar-SA':['اقرأ الوصف الكامل','إخفاء الوصف','وصف التطبيق الكامل'],
    'bn-BD':['সম্পূর্ণ বিবরণ পড়ুন','বিবরণ বন্ধ করুন','অ্যাপের সম্পূর্ণ বিবরণ'],
    'ca':['Llegeix la descripció completa','Tanca la descripció','Descripció completa de l’app'],
    'cs':['Přečíst celý popis','Zavřít popis','Úplný popis aplikace'],
    'da':['Læs hele beskrivelsen','Luk beskrivelsen','Fuld appbeskrivelse'],
    'de-DE':['Vollständige Beschreibung lesen','Beschreibung schließen','Vollständige App-Beschreibung'],
    'el':['Διαβάστε όλη την περιγραφή','Κλείσιμο περιγραφής','Πλήρης περιγραφή εφαρμογής'],
    'en-AU':['Read full description','Close description','Full app description'],
    'en-CA':['Read full description','Close description','Full app description'],
    'en-GB':['Read full description','Close description','Full app description'],
    'en-US':['Read full description','Close description','Full app description'],
    'es-ES':['Leer descripción completa','Cerrar descripción','Descripción completa de la app'],
    'es-MX':['Leer descripción completa','Cerrar descripción','Descripción completa de la app'],
    'fi':['Lue koko kuvaus','Sulje kuvaus','Sovelluksen koko kuvaus'],
    'fr-CA':['Lire la description complète','Fermer la description','Description complète de l’app'],
    'fr-FR':['Lire la description complète','Fermer la description','Description complète de l’application'],
    'gu-IN':['સંપૂર્ણ વર્ણન વાંચો','વર્ણન બંધ કરો','ઍપનું સંપૂર્ણ વર્ણન'],
    'he':['קריאת התיאור המלא','סגירת התיאור','תיאור האפליקציה המלא'],
    'hi':['पूरा विवरण पढ़ें','विवरण बंद करें','ऐप का पूरा विवरण'],
    'hr':['Pročitaj cijeli opis','Zatvori opis','Cijeli opis aplikacije'],
    'hu':['Teljes leírás megnyitása','Leírás bezárása','Teljes alkalmazásleírás'],
    'id':['Baca deskripsi lengkap','Tutup deskripsi','Deskripsi aplikasi lengkap'],
    'it':['Leggi la descrizione completa','Chiudi descrizione','Descrizione completa dell’app'],
    'ja':['概要をすべて読む','概要を閉じる','アプリの概要全文'],
    'kn-IN':['ಸಂಪೂರ್ಣ ವಿವರಣೆ ಓದಿ','ವಿವರಣೆ ಮುಚ್ಚಿ','ಆ್ಯಪ್‌ನ ಸಂಪೂರ್ಣ ವಿವರಣೆ'],
    'ko':['전체 설명 읽기','설명 닫기','앱 전체 설명'],
    'ml-IN':['പൂർണ്ണ വിവരണം വായിക്കുക','വിവരണം അടയ്ക്കുക','ആപ്പിന്റെ പൂർണ്ണ വിവരണം'],
    'mr-IN':['संपूर्ण वर्णन वाचा','वर्णन बंद करा','अ‍ॅपचे संपूर्ण वर्णन'],
    'ms':['Baca penerangan penuh','Tutup penerangan','Penerangan aplikasi penuh'],
    'nl-NL':['Volledige beschrijving lezen','Beschrijving sluiten','Volledige appbeschrijving'],
    'no':['Les hele beskrivelsen','Lukk beskrivelsen','Full appbeskrivelse'],
    'or-IN':['ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ ପଢ଼ନ୍ତୁ','ବିବରଣୀ ବନ୍ଦ କରନ୍ତୁ','ଆପ୍‌ର ସମ୍ପୂର୍ଣ୍ଣ ବିବରଣୀ'],
    'pa-IN':['ਪੂਰਾ ਵੇਰਵਾ ਪੜ੍ਹੋ','ਵੇਰਵਾ ਬੰਦ ਕਰੋ','ਐਪ ਦਾ ਪੂਰਾ ਵੇਰਵਾ'],
    'pl':['Przeczytaj pełny opis','Zamknij opis','Pełny opis aplikacji'],
    'pt-BR':['Ler descrição completa','Fechar descrição','Descrição completa do app'],
    'pt-PT':['Ler descrição completa','Fechar descrição','Descrição completa da aplicação'],
    'ro':['Citește descrierea completă','Închide descrierea','Descrierea completă a aplicației'],
    'ru':['Читать полное описание','Закрыть описание','Полное описание приложения'],
    'sk':['Prečítať celý popis','Zavrieť popis','Úplný popis aplikácie'],
    'sl-SI':['Preberi celoten opis','Zapri opis','Celoten opis aplikacije'],
    'sv':['Läs hela beskrivningen','Stäng beskrivningen','Fullständig appbeskrivning'],
    'ta-IN':['முழு விளக்கத்தையும் படிக்கவும்','விளக்கத்தை மூடு','செயலியின் முழு விளக்கம்'],
    'te-IN':['పూర్తి వివరణ చదవండి','వివరణ మూసివేయండి','యాప్ పూర్తి వివరణ'],
    'th':['อ่านคำอธิบายทั้งหมด','ปิดคำอธิบาย','คำอธิบายแอปฉบับเต็ม'],
    'tr':['Açıklamanın tamamını oku','Açıklamayı kapat','Uygulamanın tam açıklaması'],
    'uk':['Читати повний опис','Закрити опис','Повний опис застосунку'],
    'ur-PK':['مکمل تفصیل پڑھیں','تفصیل بند کریں','ایپ کی مکمل تفصیل'],
    'vi':['Đọc mô tả đầy đủ','Đóng mô tả','Mô tả đầy đủ ứng dụng'],
    'zh-Hans':['阅读完整介绍','收起介绍','应用完整介绍'],
    'zh-Hant':['閱讀完整介紹','收起介紹','應用完整介紹']
  };
  const openIds = new Set();
  function paragraphBlocks(raw) {
    const clean = String(raw || '').replace(/\r\n?/g,'\n').trim();
    return clean ? clean.split(/\n[ \t]*\n+/).map(x=>x.trim()).filter(Boolean) : [];
  }
  function introText(block, locale) {
    if (block.length <= 210) return block;
    try {
      const sentences = [...new Intl.Segmenter(locale || 'en-US', {granularity:'sentence'}).segment(block)].map(x=>x.segment);
      const first = sentences[0] || block;
      let result = first;
      if (sentences[1] && result.length + sentences[1].length <= 225) result += sentences[1];
      // Sentence boundaries only. Never cut a word/sentence in the middle.
      return result.trim();
    } catch (_) { return block; }
  }
  function node(tag, cls, text) {
    const element=document.createElement(tag);
    if(cls)element.className=cls;
    if(text!==undefined)element.textContent=text;
    return element;
  }
  function create(app, locale) {
    const blocks=paragraphBlocks(app.description);
    if (!blocks.length) return null;
    const id=String(app.id || '');
    const full=blocks.join('\n\n');
    // Short one-paragraph overviews are already visible in full; no redundant accordion.
    if (full.length <= 210 && blocks.length===1) {
      const plain=node('p','app-description tsz-description-short',full);
      plain.dir='auto'; return plain;
    }
    const labels=LABELS[locale] || LABELS['en-US'];
    const wrapper=node('div','tsz-description-wrapper');
    const preview=node('p','app-description tsz-description-intro',introText(blocks[0],locale));
    preview.dir='auto';
    const details=node('details','tsz-description-details');
    details.dataset.tszAppId=id;
    const summary=node('summary','tsz-description-trigger');
    summary.setAttribute('aria-label',labels[2]);
    const label=node('span','tsz-description-label',labels[0]);
    label.dir='auto';
    const chevron=node('span','tsz-description-chevron');chevron.setAttribute('aria-hidden','true');
    summary.append(label,chevron);
    const body=node('div','tsz-description-content');
    body.setAttribute('role','region');
    body.setAttribute('aria-label',labels[2]);
    details.append(summary,body);
    function loadParagraphs(){
      if (body.dataset.loaded==='true') return;
      const frag=document.createDocumentFragment();
      for(const paragraph of blocks){
        const p=node('p','tsz-description-paragraph',paragraph);
        p.dir='auto';frag.append(p);
      }
      body.append(frag);body.dataset.loaded='true';
    }
    if(openIds.has(id)){details.open=true;loadParagraphs();label.textContent=labels[1];}
    details.addEventListener('toggle',()=>{
      if(!details.isConnected)return;
      if(details.open){openIds.add(id);loadParagraphs();label.textContent=labels[1];}
      else {openIds.delete(id);label.textContent=labels[0];}
    });
    wrapper.append(preview,details);
    return wrapper;
  }
  // app.js directly calls create() while constructing each card. No MutationObserver,
  // polling, interception, or network calls are introduced by this module.
  Object.defineProperty(window,'TSZ_FULL_DESCRIPTION',{value:Object.freeze({create}),writable:false,configurable:false});
})();
