/* TSZ LP R372 — PromptDock AI scoped locale bridge. No storage, analytics, or external requests.
   Navigation uses existing publisher-owned common translations. Module R351 is
   synchronized to the page language; unsupported module languages are explicitly
   identified as English fallbacks. NOT a claim of complete 50-locale translation. */
(()=>{'use strict';
  const APP='6772130038';
  if(document.body?.dataset?.p19AppId!==APP)return;
  const $=id=>document.getElementById(id);
  const EL={
    'p19-language-label':'language', 'p19-region-label':'region',
    'p19-all-apps':'all','p19-back-link':'back','p19-related-back':'back',
    'p19-store-link':'store','p19-bottom-store':'store',
    'p19-contents-heading':'toc','p19-price-note':'note',
    'p19-related-copy':'relatedText','p19-description-heading':'full',
    'p196-disclosure-title':'fullToggle'
  };
  const RTL=new Set(['ar-SA','he','ur-PK']);
  const FALLBACK_MESSAGE='The article overview and some interactive examples are not translated into this language. English text may still appear. The App Store description uses an available listing language.';
  const JA_MESSAGE='ページ本文の一部と操作型デモには未翻訳の英語が残っています。App Storeの説明文は掲載済みの言語で表示します。';
  const ES_MESSAGE='Traducción editorial al español en revisión. Algunas partes de la página pueden seguir en inglés; la descripción de App Store utiliza los datos disponibles.';
  const FR_MESSAGE='Traduction française provisoire. Certaines sections de la page restent en anglais ; la description App Store dépend des données disponibles.';
  const DE_MESSAGE='Deutsche Übersetzung als Entwurf. Einige Bereiche dieser Seite können weiterhin Englisch enthalten; App-Store-Angaben hängen von verfügbaren Sprachdaten ab.';
  const IT_MESSAGE='Traduzione italiana provvisoria. Alcune sezioni possono essere ancora in inglese; la descrizione dell’App Store dipende dai dati disponibili.';
  const PT_BR_MESSAGE='Tradução provisória para português do Brasil. Algumas seções ainda podem estar em inglês; os dados da App Store dependem do idioma disponível.';
  const PT_PT_MESSAGE='Tradução provisória para português de Portugal. Algumas secções podem ainda estar em inglês; os dados da App Store dependem do idioma disponível.';
  const ZH_HANS_MESSAGE='简体中文翻译仍是草案。页面部分内容可能仍为英文，App Store 描述取决于可用的商店语言。';
  const ZH_HANT_MESSAGE='繁體中文翻譯仍為草案。部分頁面內容可能仍以英文顯示；App Store 說明取決於商店所提供的語言。';
  const KO_MESSAGE='한국어 번역은 아직 초안입니다. 일부 페이지 내용은 영어로 표시될 수 있으며, App Store 설명은 제공되는 스토어 언어에 따라 달라집니다.';
  const NL_MESSAGE='De Nederlandse vertaling is een concept. Delen van deze pagina kunnen in het Engels staan; de App Store-beschrijving hangt af van de beschikbare winkeltaal.';
  const ID_MESSAGE='Terjemahan bahasa Indonesia masih berupa draf. Sebagian teks halaman mungkin tetap berbahasa Inggris; deskripsi App Store bergantung pada bahasa daftar yang tersedia.';
  const MS_MESSAGE='Terjemahan bahasa Melayu masih draf. Sesetengah teks halaman mungkin kekal dalam bahasa Inggeris; penerangan App Store bergantung pada bahasa penyenaraian yang tersedia.';
  const TH_MESSAGE='คำแปลภาษาไทยยังเป็นฉบับร่าง บางส่วนของหน้าอาจยังเป็นภาษาอังกฤษ และคำอธิบายบน App Store ขึ้นอยู่กับภาษาที่มีให้';
  const VI_MESSAGE='Bản dịch tiếng Việt vẫn là bản nháp. Một số phần của trang có thể còn bằng tiếng Anh; mô tả App Store phụ thuộc vào ngôn ngữ đăng bán hiện có.';
  const FIL_MESSAGE='Draft pa ang pagsasaling Filipino. Maaaring may ilang bahagi ng pahina na nasa English; nakadepende sa available na wika ng App Store ang paglalarawan.';
  const HI_MESSAGE='हिंदी अनुवाद अभी मसौदा है। पेज के कुछ हिस्से अंग्रेज़ी में हो सकते हैं; App Store का विवरण उपलब्ध लिस्टिंग भाषा पर निर्भर करता है।';
  const BN_MESSAGE='বাংলা অনুবাদটি এখনো খসড়া। পাতার কিছু অংশ ইংরেজিতে থাকতে পারে; App Store-এর বিবরণ উপলব্ধ তালিকার ভাষার উপর নির্ভর করে।';
  const TR_MESSAGE='Türkçe çeviri hâlâ taslak aşamasında. Sayfanın bazı bölümleri İngilizce olabilir; App Store açıklaması mevcut listeleme diline bağlıdır.';
  const PL_MESSAGE='Polskie tłumaczenie jest nadal wersją roboczą. Niektóre części strony mogą być po angielsku; opis w App Store zależy od dostępnego języka oferty.';
  const UK_MESSAGE='Переклад українською ще перевіряється. Деякі розділи сторінки можуть залишатися англійською; опис в App Store залежить від доступної мови каталогу.';
  const SR_CYRL_MESSAGE='Превод на српски (ћирилица) се још проверава. Делови странице могу остати на енглеском; опис у App Store-у зависи од доступних локализација.';
  const SR_LATN_MESSAGE='Prevod na srpski (latinica) se još proverava. Pojedini delovi mogu ostati na engleskom; opis u App Store-u zavisi od dostupnih lokalizacija.';
  const BS_MESSAGE='Bosanski prijevod se još provjerava. Dio teksta može ostati na engleskom; jezik opisa u App Storeu zavisi od dostupnih lokalizacija.';
  const HR_MESSAGE='Hrvatski prijevod još se provjerava. Dio teksta može ostati na engleskom; jezik opisa u App Storeu ovisi o dostupnim lokalizacijama.';
  const HU_MESSAGE='A magyar fordítás még ellenőrzés alatt áll. Egyes szövegek angolul maradhatnak; az App Store leírásának nyelve a rendelkezésre álló adatlapnyelvektől függ.';
  const SK_MESSAGE='Slovenský preklad sa ešte kontroluje. Časť textu môže zostať v angličtine; opis v App Store závisí od dostupných jazykov záznamu.';
  const CS_MESSAGE='Český překlad se ještě kontroluje. Část textu může zůstat anglicky; popis v App Storu závisí na dostupných jazycích nabídky.';
  const EL_MESSAGE='Η ελληνική μετάφραση βρίσκεται υπό έλεγχο. Κάποιο κείμενο μπορεί να παραμένει στα αγγλικά· η περιγραφή App Store εξαρτάται από τις διαθέσιμες γλώσσες.';
  const RO_MESSAGE='Traducerea în română este în curs de verificare. Unele texte pot apărea în engleză, iar limba descrierii App Store depinde de limbile disponibile.';
  const FI_MESSAGE='Suomenkielinen käännös on vielä tarkistettavana. Osa tekstistä saattaa olla englanniksi, ja App Store -kuvauksen kieli riippuu saatavilla olevista kielistä.';
  const NB_MESSAGE='Den norske oversettelsen er fortsatt til gjennomgang. Noe tekst kan være på engelsk, og språket i App Store-beskrivelsen avhenger av tilgjengelige språk.';
  const DA_MESSAGE='Den danske oversættelse er stadig under gennemgang. Dele af siden kan være på engelsk, og sproget i App Store-beskrivelsen afhænger af, hvilke sprog der er tilgængelige.';
  const SV_MESSAGE='Den svenska översättningen granskas fortfarande. Vissa delar av sidan kan vara på engelska; App Store-beskrivningen beror på vilka språk som finns tillgängliga.';
  const DEMO_MESSAGE='This interactive example is displayed in English because a translation for the selected page language is not available.';
  let common=null, serial=0;
  const language=()=>$('p19-language')?.value||'en-US';
  const set=(id,v)=>{const node=$(id);if(node&&typeof v==='string'&&v.trim())node.textContent=v;};
  function notice(id,parent,after){
    let node=$(id);
    if(!node){node=document.createElement('p');node.id=id;node.setAttribute('role','status');
      node.style.cssText='max-width:70rem;margin:1rem auto;padding:0.75rem 1rem;border:1px solid currentColor;border-radius:10px;font:500 0.85rem/1.5 system-ui;opacity:.84;';
      if(after)parent?.insertAdjacentElement('afterbegin',node);else parent?.append(node);
    }
    return node;
  }
  function synchronizeDemo(loc){
    const root=$('tsz-promptdock-r351');if(!root)return;
    const supported=/^en-IE$/i.test(loc)?'en-IE':/^en-NZ$/i.test(loc)?'en-NZ':/^en-CA$/i.test(loc)?'en-CA':/^en-AU$/i.test(loc)?'en-AU':/^en-GB$/i.test(loc)?'en-GB':/^(?:sr|sr-Cyrl(?:-RS)?)$/i.test(loc)?'sr-Cyrl':/^sr-Latn(?:-RS)?$/i.test(loc)?'sr-Latn':/^bs(?:-BA)?$/i.test(loc)?'bs':/^hr(?:-HR)?$/i.test(loc)?'hr':/^hu(?:-HU)?$/i.test(loc)?'hu':/^sk(?:-SK)?$/i.test(loc)?'sk':/^cs(?:-CZ)?$/i.test(loc)?'cs':/^el(?:-GR)?$/i.test(loc)?'el':/^ro(?:-RO)?$/i.test(loc)?'ro':/^fi(?:-FI)?$/i.test(loc)?'fi':/^nb(?:-NO)?$/i.test(loc)?'nb':/^da(?:-DK)?$/i.test(loc)?'da':/^sv(?:-SE)?$/i.test(loc)?'sv':/^uk(?:-UA)?$/i.test(loc)?'uk':/^pl(?:-PL)?$/i.test(loc)?'pl':/^tr(?:-TR)?$/i.test(loc)?'tr':/^bn(?:-BD)?$/i.test(loc)?'bn':/^hi(?:-IN)?$/i.test(loc)?'hi':/^fil(?:-PH)?$/i.test(loc)?'fil':/^vi(?:-VN)?$/i.test(loc)?'vi':/^th(?:-TH)?$/i.test(loc)?'th':/^ms(?:-MY)?$/i.test(loc)?'ms':/^id(?:-ID)?$/i.test(loc)?'id':/^nl(?:-NL)?$/i.test(loc)?'nl-NL':/^ko(?:-KR)?$/i.test(loc)?'ko':/^zh-Hant$/i.test(loc)?'zh-Hant':/^zh-Hans$/i.test(loc)?'zh-Hans':/^pt-PT$/i.test(loc)?'pt-PT':/^pt(?:-BR)?$/i.test(loc)?'pt-BR':/^it(?:-IT)?$/i.test(loc)?'it':/^de(?:-DE)?$/i.test(loc)?'de-DE':/^fr-CA$/i.test(loc)?'fr-CA':/^fr/i.test(loc)?'fr-FR':/^es-MX$/i.test(loc)?'es-MX':/^es/i.test(loc)?'es-ES':loc.startsWith('ja')?'ja':(loc.startsWith('ar')?'ar':'en');
    const button=root.querySelector('[data-lang="'+supported+'"]');
    if(button&&button.getAttribute('aria-pressed')!=='true')button.click();
    else if(typeof window.TSZ_PD_R351_RENDER==='function')window.TSZ_PD_R351_RENDER();
    if(window.TSZ_PD_R374&&!/^(?:es(?:-(?:ES|MX))?|fr(?:-(?:FR|CA))?|de(?:-DE)?|it(?:-IT)?|pt(?:-(?:BR|PT))?|th(?:-TH)?|vi(?:-VN)?|fil(?:-PH)?|hi(?:-IN)?|bn(?:-BD)?|tr(?:-TR)?|pl(?:-PL)?|uk(?:-UA)?|sv(?:-SE)?|da(?:-DK)?|nb(?:-NO)?|fi(?:-FI)?|ro(?:-RO)?|el(?:-GR)?|cs(?:-CZ)?|sk(?:-SK)?|hu(?:-HU)?|hr(?:-HR)?|bs(?:-BA)?|en-GB|en-AU|en-CA|en-NZ|en-IE|sr-Latn(?:-RS)?|sr(?:-Cyrl(?:-RS)?)?)$/i.test(loc))window.TSZ_PD_R374.apply(root,loc);
    const nav=root.querySelector('.pd-langs');
    if(nav){nav.style.display='none';nav.setAttribute('aria-hidden','true');}
    root.dataset.tszR372SelectedLocale=loc;
    root.dataset.tszR372Fallback=String(!(
      (supported==='ja'&&loc.startsWith('ja'))||
      (supported==='ar'&&loc.startsWith('ar'))||
      (supported==='en-AU'&&loc==='en-AU')||(supported==='en-CA'&&loc==='en-CA')||(supported==='en-NZ'&&loc==='en-NZ')||(supported==='en-IE'&&loc==='en-IE')||(supported==='en-GB'&&loc==='en-GB')||(supported==='en'&&loc.startsWith('en'))||(/^es(?:-(?:ES|MX))?$/i.test(loc)&&supported.startsWith('es'))||(/^fr(?:-(?:FR|CA))?$/i.test(loc)&&supported.startsWith('fr'))||(/^de(?:-DE)?$/i.test(loc)&&supported==='de-DE')||(/^it(?:-IT)?$/i.test(loc)&&supported==='it')||(/^pt(?:-(?:BR|PT))?$/i.test(loc)&&supported.startsWith('pt'))||(/^zh-Hans$/i.test(loc)&&supported==='zh-Hans')||(/^zh-Hant$/i.test(loc)&&supported==='zh-Hant')||(/^ko(?:-KR)?$/i.test(loc)&&supported==='ko')||(/^nl(?:-NL)?$/i.test(loc)&&supported==='nl-NL')||(/^id(?:-ID)?$/i.test(loc)&&supported==='id')||(/^ms(?:-MY)?$/i.test(loc)&&supported==='ms')||(/^th(?:-TH)?$/i.test(loc)&&supported==='th')||(/^vi(?:-VN)?$/i.test(loc)&&supported==='vi')||(/^fil(?:-PH)?$/i.test(loc)&&supported==='fil')||(/^hi(?:-IN)?$/i.test(loc)&&supported==='hi')||(/^bn(?:-BD)?$/i.test(loc)&&supported==='bn')||(/^tr(?:-TR)?$/i.test(loc)&&supported==='tr')||(/^pl(?:-PL)?$/i.test(loc)&&supported==='pl')||(/^uk(?:-UA)?$/i.test(loc)&&supported==='uk')||(/^sv(?:-SE)?$/i.test(loc)&&supported==='sv')||(/^da(?:-DK)?$/i.test(loc)&&supported==='da')||(/^nb(?:-NO)?$/i.test(loc)&&supported==='nb')||(/^fi(?:-FI)?$/i.test(loc)&&supported==='fi')||(/^ro(?:-RO)?$/i.test(loc)&&supported==='ro')||(/^el(?:-GR)?$/i.test(loc)&&supported==='el')||(/^cs(?:-CZ)?$/i.test(loc)&&supported==='cs')||(/^sk(?:-SK)?$/i.test(loc)&&supported==='sk')||(/^hu(?:-HU)?$/i.test(loc)&&supported==='hu')||(/^hr(?:-HR)?$/i.test(loc)&&supported==='hr')||(/^bs(?:-BA)?$/i.test(loc)&&supported==='bs')||(/^sr-Latn(?:-RS)?$/i.test(loc)&&supported==='sr-Latn')||(/^(?:sr|sr-Cyrl(?:-RS)?)$/i.test(loc)&&supported==='sr-Cyrl')
    ));
    const warning=notice('tsz-promptdock-r372-demo-notice',root.querySelector('.pd-shell')||root,true);
    const needFallback=root.dataset.tszR372Fallback==='true';
    warning.hidden=!needFallback;
    const translated=window.TSZ_PD_R374?.notice?.(loc);
    warning.textContent=needFallback?(translated||DEMO_MESSAGE):'';
    warning.lang=translated?loc:'en';warning.dir=RTL.has(loc)?'rtl':'ltr';
    // Keep original user input: the R351 module uses its own dirty-state guard.
  }
  function synchronizeChrome(loc){
    if($('p19-detail')?.hidden){synchronizeDemo(loc);return;}
    const rows=common?.locales?.[loc];
    if(rows){
      for(const [id,key] of Object.entries(EL))set(id,rows[key]);
      const lang=$('p19-language');if(lang)lang.setAttribute('aria-label',rows.language||'Language');
      const region=$('p19-region');if(region)region.setAttribute('aria-label',rows.region||'App Store region');
      const footer=document.querySelector('.p19-footer span');if(footer&&rows.footer)footer.textContent=rows.footer;
      const prev=$('p193-prev');if(prev&&rows.prev)prev.setAttribute('aria-label',rows.prev);
      const next=$('p193-next');if(next&&rows.next)next.setAttribute('aria-label',rows.next);
      const close=$('p19-zoom-close');if(close&&rows.close)close.setAttribute('aria-label',rows.close);
      const fit=$('p193-zoom-fit');if(fit&&rows.fit)fit.textContent=rows.fit;
    }
    document.documentElement.lang=loc;
    document.documentElement.dir=RTL.has(loc)?'rtl':'ltr';
    const n=notice('tsz-promptdock-r372-translation-notice',$('p19-detail'),true);
    n.hidden=loc==='en-US'||loc==='en-GB'||loc==='en-AU'||loc==='en-CA'||loc==='en-NZ'||loc==='en-IE';
    n.textContent=loc.startsWith('ja')?JA_MESSAGE:loc.startsWith('es')?ES_MESSAGE:loc.startsWith('fr')?FR_MESSAGE:loc.startsWith('de')?DE_MESSAGE:loc.startsWith('it')?IT_MESSAGE:loc==='pt-PT'?PT_PT_MESSAGE:loc.startsWith('pt')?PT_BR_MESSAGE:loc==='zh-Hans'?ZH_HANS_MESSAGE:loc==='zh-Hant'?ZH_HANT_MESSAGE:loc==='ko'?KO_MESSAGE:loc.startsWith('nl')?NL_MESSAGE:loc.startsWith('id')?ID_MESSAGE:(/^(?:sr|sr-cyrl(?:-rs)?)$/i.test(loc))?SR_CYRL_MESSAGE:loc.toLowerCase().startsWith('sr-latn')?SR_LATN_MESSAGE:loc.startsWith('bs')?BS_MESSAGE:loc.startsWith('hr')?HR_MESSAGE:loc.startsWith('hu')?HU_MESSAGE:loc.startsWith('sk')?SK_MESSAGE:loc.startsWith('cs')?CS_MESSAGE:loc.startsWith('el')?EL_MESSAGE:loc.startsWith('ro')?RO_MESSAGE:loc.startsWith('fi')?FI_MESSAGE:loc.startsWith('nb')?NB_MESSAGE:loc.startsWith('da')?DA_MESSAGE:loc.startsWith('sv')?SV_MESSAGE:loc.startsWith('uk')?UK_MESSAGE:loc.startsWith('pl')?PL_MESSAGE:loc.startsWith('tr')?TR_MESSAGE:loc.startsWith('bn')?BN_MESSAGE:loc.startsWith('hi')?HI_MESSAGE:loc.startsWith('fil')?FIL_MESSAGE:loc.startsWith('vi')?VI_MESSAGE:loc.startsWith('th')?TH_MESSAGE:loc.startsWith('ms')?MS_MESSAGE:FALLBACK_MESSAGE;
    n.lang=loc==='en-IE'?'en-IE':loc==='en-NZ'?'en-NZ':loc==='en-CA'?'en-CA':loc==='en-AU'?'en-AU':loc==='en-GB'?'en-GB':loc.startsWith('ja')?'ja':loc.startsWith('es')?'es':loc.startsWith('fr')?'fr':loc.startsWith('de')?'de':loc.startsWith('it')?'it':loc.startsWith('pt')?'pt':loc==='zh-Hans'?'zh-Hans':loc==='zh-Hant'?'zh-Hant':loc==='ko'?'ko':loc.startsWith('nl')?'nl':loc.startsWith('id')?'id':(/^(?:sr|sr-cyrl(?:-rs)?)$/i.test(loc))?'sr-Cyrl':loc.toLowerCase().startsWith('sr-latn')?'sr-Latn':loc.startsWith('bs')?'bs':loc.startsWith('hr')?'hr':loc.startsWith('hu')?'hu':loc.startsWith('sk')?'sk':loc.startsWith('cs')?'cs':loc.startsWith('el')?'el':loc.startsWith('ro')?'ro':loc.startsWith('fi')?'fi':loc.startsWith('nb')?'nb':loc.startsWith('da')?'da':loc.startsWith('sv')?'sv':loc.startsWith('uk')?'uk':loc.startsWith('pl')?'pl':loc.startsWith('tr')?'tr':loc.startsWith('bn')?'bn':loc.startsWith('hi')?'hi':loc.startsWith('fil')?'fil':loc.startsWith('vi')?'vi':loc.startsWith('th')?'th':loc.startsWith('ms')?'ms':'en';
    n.dir=loc.startsWith('ja')?'ltr':'ltr';
    n.dataset.tszR372TranslationStatus='PARTIAL_NOT_NATIVE_REVIEWED';
    synchronizeDemo(loc);
  }
  function notify(source){
    const loc=language();
    window.dispatchEvent(new CustomEvent('tsz:locale-change',{detail:{locale:loc,source:'promptdock-r372',originalEvent:source}}));
  }
  function schedule(source){
    const s=++serial;
    // app-detail.js renders synchronously on change; defer until after its listener.
    Promise.resolve().then(()=>{if(s!==serial)return;synchronizeChrome(language());notify(source);});
  }
  async function loadCommon(){
    try{
      const r=await fetch('../../data/tsz-r39r4-common-ui.json',{cache:'no-store'});
      if(!r.ok)throw Error('LOCAL_DICTIONARY_'+r.status);
      const value=await r.json();
      if(value?.kind!=='tsz-common-article-ui-exact-reuse'||Object.keys(value.locales||{}).length!==50)throw Error('INVALID_COMMON_DICTIONARY');
      common=value;
    }catch(_){common=null;}
    schedule('dictionary-ready');
  }
  function init(){
    const select=$('p19-language');if(!select)return;
    select.addEventListener('change',()=>schedule('user-selection'));
    const detail=$('p19-detail');
    if(detail){const ob=new MutationObserver(()=>{if(!detail.hidden)schedule('article-ready');});ob.observe(detail,{attributes:true,attributeFilter:['hidden']});}
    const main=document.querySelector('main')||document.body;
    const ob=new MutationObserver(list=>{
      if(list.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.id==='tsz-promptdock-r351'||n.querySelector?.('#tsz-promptdock-r351')))))schedule('demo-ready');
    });
    ob.observe(main,{subtree:true,childList:true});
    void loadCommon();schedule('initial');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
