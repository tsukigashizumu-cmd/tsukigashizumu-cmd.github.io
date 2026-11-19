/* TSZ LP R408 — Hungarian AI draft; native review PENDING. No storage, analytics or network requests. */
window.TSZ_PD_R408_HU = {
  "additional_labels": {
    "hu": {
      "all": "Összes alkalmazás",
      "bottom": "Egyszer építsd fel. A szerkezetet használd újra.",
      "bottomBody": "Rendezd az ismétlődő utasításokat, hogy legközelebb kevesebbet kelljen gépelned.",
      "browse": "Összes alkalmazás böngészése",
      "country": "App Store-régió",
      "description": "Készíts strukturált promptokat újrahasználható sablonokból és mentett adatokból. Másold a szöveget az AI-asszisztensedbe.",
      "eyebrow": "ÚJRAHASZNÁLHATÓ PROMPT",
      "fallback": "A magyar fordítás még ellenőrzés alatt áll. Egyes részek továbbra is angolul jelenhetnek meg.",
      "featuresBody": "Ments sablonokat és adatokat későbbi használatra. Másold a promptot, vagy nyisd meg a ChatGPT-t. Az alkalmazás nem generál AI-választ.",
      "featuresTag": "02 / A TE SZÖVEGED, A TE ESZKÖZÖD",
      "featuresTitle": "Promptkészítő, nem AI-chatbot.",
      "hero": "A következő promptod itt kezdődik.",
      "introBody": "Válassz sablont, töltsd ki a változó részleteket, és kapj másolásra kész promptot. Ez illusztráció, nem az alkalmazás valódi képernyőképe.",
      "introTitle": "Alakítsd sablonná az ismétlődő feladatokat.",
      "language": "Nyelv",
      "price": "Az aktuális árért és elérhetőségért nézd meg az App Store-t.",
      "section": "01 / EGYSZERŰ ÚJRAHASZNÁLÁS",
      "store": "Megtekintés az App Store-ban"
    }
  },
  "locale": "hu",
  "modules": {
    "promptdock-r108": {
      "hu": {
        "context": "Hasznos háttérinformáció",
        "copied": "A vágólapra másolva.",
        "copy": "Prompt másolása",
        "copyFail": "A böngésző megtagadta a vágólap használatát. Jelöld ki és másold le a jobb oldali promptszöveget.",
        "defaults": [
          {
            "context": "Visszatérő vásárlóknak. A mentett tételek a következő vásárláskor is felhasználhatók.",
            "role": "Alkalmazásadatlap-szerkesztő",
            "task": "Írj egy egymondatos előnyt egy bevásárlólista-alkalmazásról"
          },
          {
            "context": "Nyelvváltás után a beviteli mező nem reagál. Különítsd el a lépéseket, az elvárt és a tapasztalt működést.",
            "role": "iOS-minőségbiztosítási mérnök",
            "task": "Írj reprodukálható hibajelentést"
          },
          {
            "context": "Köszönd meg a felhasználónak, hogy dicsérte a használhatóságot. Ne ígérj meg nem erősített funkciót.",
            "role": "Ügyfélszolgálati szövegíró",
            "task": "Fogalmazz rövid választ egy alkalmazásértékelésre"
          }
        ],
        "empty": "A folytatáshoz adj meg egy AI-szerepet és egy feladatot.",
        "lead": "Válassz sablont, add meg a mai részleteket, és nézd meg a strukturált promptot, mielőtt elküldöd bármelyik AI-nak.",
        "missing": "Még nincsenek megtartott bemeneti adatok.",
        "note": "Csak a céloldal szemléltető példája. Nem küld AI-kérést. A megtartott adatok csak az oldal memóriájában élnek, és újratöltéskor elvesznek.",
        "outBlank": "Nincs megadva",
        "outContext": "Háttérinformáció",
        "outRole": "Szerep",
        "outRuleText": "Ne találj ki tényeket; egyértelműen jelezd, amit nem lehet ellenőrizni.",
        "outRules": "Megkötések",
        "outTask": "Feladat",
        "outTone": "Hangnem",
        "pill": "CSAK SZÖVEG",
        "preview": "Összeállított promptod",
        "ready": "Bármely bemenet módosításával frissül a prompt.",
        "restore": "Megtartott adatok visszaállítása",
        "restored": "A megtartott adatok visszaállítva.",
        "role": "AI-szerep",
        "sample": "Példa visszaállítása",
        "save": "Adatok megtartása ezen a lapon",
        "saved": "A sablonhoz tartozó adatok ezen az oldalon maradnak meg.",
        "step1": "01 · Sablon választása",
        "step2": "02 · Mai részletek kitöltése",
        "tab0": "Alkalmazásadatlap",
        "tab1": "Hibajelentés",
        "tab2": "Értékelésre adott válasz",
        "tag": "PROMPTDOCK AI · INTERAKTÍV DEMÓ",
        "task": "Mi legyen a feladata?",
        "title": "Ne írd újra mindig ugyanazt a promptot.",
        "tone": "A szöveg hangneme",
        "tone0": "Világos és tömör",
        "tone1": "Barátságos és segítőkész",
        "tone2": "Konkrét és gyakorlatias"
      }
    },
    "promptdock-r145": {
      "hu": {
        "aExample": "Független alkalmazásfejlesztők",
        "aLabel": "Kinek szól?",
        "area": "Érintett terület",
        "bExample": "Mutass be egy új funkciót a meglévő felhasználóknak",
        "bLabel": "Mi történjen?",
        "bugA": "Érintett terület",
        "bugAEx": "Fizetési képernyő",
        "bugB": "Mi romlott el?",
        "bugBEx": "Kupon alkalmazása után eltűnik az összeg",
        "bugC": "Elvárt eredmény",
        "bugCEx": "A frissített végösszeg látható marad",
        "build": "02 / MEZŐK KITÖLTÉSE",
        "cExample": "Konkrét, kedves és tömör",
        "cLabel": "Milyen legyen a hangvétele?",
        "copied": "A vágólapra másolva",
        "copy": "Prompt másolása",
        "copyFail": "Jelöld ki és másold a létrehozott szöveget",
        "debug": "Hibajelentés",
        "expected": "Elvárt működés",
        "foot": "Csak az oldalon látható példa. Nem küld promptot AI-nak, nem kell fiók, semmi nem kerül mentésre, és az alkalmazás adatai nem változnak.",
        "goal": "Cél",
        "guide": "01 / VÁLASSZ MINTÁT",
        "instructionDebug": "Foglald össze a hibát, javasolj rövid reprodukálási ellenőrzőlistát, és sorold fel a vizsgálandó lehetséges okokat. Ne állítsd, hogy a javítás már bizonyított.",
        "instructionLaunch": "Készíts rövid címsort, egy világos előnyt és egy következő lépést. Ne találj ki funkciókat.",
        "launch": "Alkalmazásbevezető összefoglaló",
        "lead": "Válassz újrahasználható sablont, tölts ki néhány mezőt, és figyeld, ahogy összeáll az utasítás. Ez a weboldal interaktív példája, nem maga az alkalmazás.",
        "len": "szó a promptban",
        "loc": "Helyi weboldal-példa",
        "over": "PROMPTDOCK AI / HASZNÁLD ÚJRA A GONDOLATMENETET",
        "pDebug": "Egy szoftverhiba diagnosztizálásában segítesz.",
        "pLaunch": "Alkalmazásfrissítési bejelentést írsz.",
        "preview": "03 / HASZNÁLATRA KÉSZ PROMPTOD",
        "problem": "Tapasztalt probléma",
        "reset": "Példa alaphelyzetbe állítása",
        "style": "Stílus",
        "target": "Célközönség",
        "title": "Ne írd újra mindig ugyanazt a promptot."
      }
    },
    "promptdock-r265": {
      "hu": {
        "choose": "Ismétlődő feladataid",
        "copy": "Prompt másolása",
        "copyDone": "Másolva",
        "copyFail": "Jelöld ki és másold az alábbi promptot",
        "details": "Fontos részletek",
        "detailsPlace": "pl. A keresés már a mentett sablonokban is működik",
        "edit": "MEZŐK KITÖLTÉSE",
        "editTitle": "A részleteken változtass, ne a szerkezeten.",
        "extra": "Van még valami fontos részlet?",
        "extraPlace": "pl. Említsd meg, hogy a meglévő adatok megmaradnak",
        "eyebrow": "PROMPTDOCK AI / ÚJRAHASZNÁLHATÓ PROMPTKÉSZÍTŐ",
        "footer": "Egy ismételhető munkafolyamat élő előnézete. Csak példa — az adatok nem kerülnek továbbításra.",
        "hero": "Megint ugyanazt kérted az AI-tól. És megint mindent begépeltél.",
        "kind": [
          "Alkalmazás kiadási megjegyzése",
          "Ügyfélszolgálati válasz",
          "Termékadatlap-leírás"
        ],
        "lang": "Nyelv",
        "lead": "Válassz sablont, tölts ki néhány mezőt, és készíts újrahasználható, strukturált promptot. Legközelebb üres lap helyett egy űrlappal kezdhetsz.",
        "listing": "Termékadatlap",
        "nothing": "Még nincs semmi mentve",
        "notice": "Szemléltető sablonok; a bevitt adatok ezen az oldalon maradnak. Nincs AI-kérés, fiók, tartós tárolás vagy automatikus export.",
        "outFacts": "Részletek",
        "outFinish": "Csak a kész szöveget add vissza; ne találj ki tényeket.",
        "outMust": "Követelmények",
        "outTone": "Hangnem",
        "outTopic": "Téma",
        "outputIntro": "Írj szöveget a következő típushoz: {kind}.",
        "panel": "VÁLASSZ KIINDULÓPONTOT",
        "preview": "MÁSOLÁSRA KÉSZ",
        "previewSub": "Az eredmény gépelés közben változik. Helyben áll össze a mezőidből, nem AI-szolgáltatás készíti.",
        "previewTitle": "Az összeállított promptod.",
        "region": "Áruházrégió",
        "release": "Alkalmazásfrissítés",
        "reply": "Ügyfélszolgálati válasz",
        "reset": "Minta visszaállítása",
        "restore": "Mentett adatkészlet visszaállítása",
        "sample": "INTERAKTÍV PÉLDA",
        "save": "Bemeneti adatkészlet mentése",
        "saved": "Mentve ezen az oldalon",
        "seed": [
          [
            "Új keresési szűrők",
            "A felhasználók kategória szerint szűkíthetik a mentett promptokat, miközben a korábbi bemeneti adatkészleteik megmaradnak.",
            "Legfeljebb 100 szóból álljon."
          ],
          [
            "Válasz egy frissítéssel kapcsolatos kérdésre",
            "Magyarázd el, hogy a mentett bemeneti adatkészletek a legutóbbi frissítés után is az eszközön maradnak.",
            "Ne ígérj konkrét megjelenési dátumokat."
          ],
          [
            "Könnyű útinapló",
            "Zsebméretű notesz üres pontozott lapokkal és tartós borítóval.",
            "Ne állíts semmit környezetvédelmi tanúsítványokról."
          ]
        ],
        "step": "SABLON / BEMENET / KÉSZ",
        "store": "PromptDock AI megtekintése az App Store-ban",
        "subject": "Miről szól?",
        "subjectPlace": "pl. Gyors keresés hozzáadása az alkalmazáshoz",
        "templateLabels": [
          "Alkalmazásfrissítés",
          "Ügyfélszolgálati válasz",
          "Termékadatlap"
        ],
        "tone": "Hangnem",
        "toneOptions": [
          "Világos és tömör",
          "Barátságos és segítőkész",
          "Közvetlen és szakmai"
        ]
      }
    },
    "promptdock-r310": {
      "hu": {
        "audience": "Kinek szól?",
        "audiences": [
          "Elfoglalt vásárlóknak",
          "Egy alkalmazás felhasználójának",
          "Egy kis termékcsapatnak"
        ],
        "copy": "Prompt másolása",
        "desc": "Válassz sablont, változtass meg három bemenetet, és másold ki a használatra kész promptot. Hívd elő korábbi adataidat újragépelés nélkül.",
        "detail": [
          "Adj egy konkrét példát",
          "Ismerd el a problémát túlzó ígéretek nélkül",
          "Sorold fel a lépéseket fontossági sorrendben"
        ],
        "empty": "Még nincs mentett adatkészlet.",
        "fallback": "Ebben a böngészőben nem elérhető a másolás.",
        "feedbackCopy": "A vágólapra másolva.",
        "feedbackFallback": "Jelöld ki és másold a fenti promptot.",
        "feedbackRestore": "A bemeneti adatok visszaállítva.",
        "feedbackSave": "Mentve. Az előhíváshoz válassz egy adatkészletet alább.",
        "kicker": "AZ ÚJRA BEGÉPELÉSRE FORDÍTOTT IDŐ",
        "labels": [
          "Feladat",
          "Célközönség",
          "Hangnem",
          "Kötelező elem"
        ],
        "lang": "A demó nyelve",
        "note": "Ez egy céloldalon látható bemutató. Nem küldünk kérést AI-nak; az adatkészletek csak az oldal megnyitásáig léteznek.",
        "notes": "Egy feltétlenül szükséges részlet",
        "options": [
          "Alkalmazás bemutatása",
          "Válasz visszajelzésre",
          "Feladat megtervezése"
        ],
        "out": "02 / Másolásra kész",
        "result": [
          "Készíts tömör alkalmazásismertetőt.",
          "Írj rövid, tiszteletteljes választ.",
          "Készíts gyakorlatias cselekvési tervet."
        ],
        "save": "Bemeneti adatok mentése",
        "saved": "Mentett adatkészletek (csak ezen az oldalon)",
        "setup": "01 / Újrahasználható adataid",
        "subject": "Miről van szó?",
        "subjects": [
          "Egy kis alkalmazás, amely segít összehasonlítani az árakat",
          "Egy felhasználó, aki egy zavaró gombot jelzett",
          "Egy egyórás funkciófejlesztés"
        ],
        "template": "Sablon",
        "title": "Ne írd újra mindig ugyanazt a promptot.",
        "tone": "Hangnem",
        "tones": [
          "Világos és tömör",
          "Barátságos és emberi",
          "Közvetlen és pontos"
        ]
      }
    },
    "promptdock-r351": {
      "hu": {
        "brand": "PROMPTDOCK / ÚJRAHASZNÁLHATÓ GONDOLATMENET",
        "cases": [
          "Alkalmazásfrissítés",
          "Ügyfélszolgálati válasz",
          "Termékbemutató"
        ],
        "copied": "A vágólapra másolva",
        "copy": "Prompt másolása",
        "eyebrow": "UGYANAZ A FELADAT. EGY ÚJABB NAP.",
        "field1": "Mit kell elérnie?",
        "field2": "Kinek szól?",
        "field3": "Milyen feltételeket kell betartania?",
        "first": "Feladat",
        "last": "Adj világos, használható választ. Csak akkor tegyél fel rövid kérdést, ha nélkülözhetetlen információ hiányzik.",
        "lead": "Tudod, mire van szükséged az AI-tól. Mégis minden alkalommal újra begépeled a hátteret, a célközönséget és a szabályokat. Tartsd meg a szerkezetet. Csak azt változtasd, ami számít.",
        "localDemo": "PÉLDA AZ OLDALON",
        "manual": "Jelöld ki és másold a szöveget",
        "note": "Ez egy kitalált, helyben futó céloldali demó, amely az újrahasználható promptmezőket szemlélteti. A példasablonok nem a beépített előbeállítások ígéretei. Nincs ChatGPT-hívás, fiókhozzáférés, mentett bevitel, analitika, hálózati kérés vagy alkalmazáskapcsolat. A szöveg nem kerül tárolásra. A másolás kizárólag helyi böngészőművelet.",
        "panel": "02  TÖLTSD KI, MI VÁLTOZOTT MA",
        "phaseInput": "BEVITEL",
        "phaseReady": "KÉSZ",
        "phaseReuse": "ÚJRAHASZNÁLÁS",
        "preview": "03  HASZNÁLATRA KÉSZ PROMPT",
        "reset": "Példa alaphelyzetbe állítása",
        "second": "Célközönség",
        "select": "01  VÁLASSZ ISMÉTELHETŐ FELADATOT",
        "strap": "EGYSZER ÁLLÍTSD ÖSSZE. HASZNÁLD ÚJRA A SZERKEZETET.",
        "structure": "A forma marad. A részletek változnak.",
        "sub": "Válassz egy kitalált feladatot. Tölts ki három mezőt. Figyeld, ahogy a kész utasítás magától összeáll.",
        "tag": "A MUNKÁT ISMÉTELD, NE A GÉPELÉST",
        "third": "Megkötések",
        "title": "Ne írd újra mindig ugyanazt az utasítást.",
        "word": "szó",
        "words": "SZÓ"
      }
    },
    "promptdock-r67": {
      "hu": {
        "a": "01 / VÁLASSZ",
        "b": "02 / TÖLTSD KI",
        "c": "03 / MÁSOLÁS",
        "chosen": "ÜGYFÉLNEK SZÓLÓ VÁLASZ",
        "copy": "SZÖVEG MÁSOLÁSA",
        "field1": "Téma",
        "field2": "Hangnem",
        "fields": "BEVITELI MEZŐK",
        "h1": "Indulj ki egy sablonból",
        "h2": "Csak a részleteket add meg",
        "h3": "Másold ki a használatra kész promptot",
        "lead": "Válassz sablont egy visszatérő feladathoz, töltsd ki a részleteket, majd másold az elkészült szöveget a már használt AI-asszisztensedbe.",
        "note": "Szemléltető sablon és példaértékek; nem valódi alkalmazásképernyő, nem generált válasz, és nem kapcsolódik AI-szolgáltatáshoz.",
        "other": "KIADÁSI MEGJEGYZÉS",
        "p1": "Válassz egy beépített sablont vagy egy saját űrlapot az ismétlődő munkához.",
        "p2": "Töltsd ki az adott kérés mezőit. A gyakran használt adatkészleteket elmentheted későbbre.",
        "p3": "Hozz létre strukturált promptszöveget, majd másold a kedvenc AI-eszközödbe. Ez az illusztráció nem állít elő AI-választ.",
        "rail1": "SABLON",
        "rail2": "A RÉSZLETEID",
        "rail3": "MÁSOLÁS",
        "ready": "STRUKTURÁLT PROMPT",
        "tag": "01 / ÚJRAHASZNÁLHATÓ PROMPT",
        "template": "SABLON",
        "title": "Ne írd újra mindig ugyanazt a promptot.",
        "value1": "Szállítással kapcsolatos kérdés",
        "value2": "Rövid és segítőkész"
      }
    }
  },
  "r351_samples": {
    "hu": [
      [
        "Írj tömör kiadási megjegyzést egy ár-összehasonlító alkalmazás frissítéséhez.",
        "A mindennapi vásárláshoz hasznos alkalmazásokat használó emberek.",
        "Írj érthetően magyarul. Csak igazolt változásokat említs. Legfeljebb 120 szó."
      ],
      [
        "Válaszolj egy vásárlónak, aki még nem látja a megvett tételt.",
        "Új felhasználó, akinek nyugodt és segítőkész válaszra van szüksége.",
        "Kérj röviden elnézést. Javasolj konkrét lépéseket. Ne ígérj nem megerősített visszatérítést."
      ],
      [
        "Mutass be egy ár-összehasonlító eszközt egyetlen mondatban.",
        "Vásárlók, akik nagy és normál kiszerelésű termékeket hasonlítanak össze.",
        "Indíts a problémával. Kerüld a reklámszlogeneket. Legfeljebb 25 szó."
      ]
    ]
  },
  "round": "R408",
  "source_coverage": {
    "r351_sample_fields_per_locale": 9,
    "source_bound_module_rows_per_locale": 237,
    "source_catalog_nonempty": 303,
    "source_catalog_rows_per_locale": 304,
    "standalone_labels_per_locale": 18,
    "unresolved_source_mapping_per_locale": 1
  },
  "translation_quality": "AI_DRAFT_PENDING_NATIVE_REVIEW"
};
