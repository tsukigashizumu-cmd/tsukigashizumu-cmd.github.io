/* R411 Serbian Latin / Ekavian AI draft adapted from R410 Bosnian. Native review PENDING; no telemetry. */
window.TSZ_PD_R411_SR_LATN = {
  "additional_labels": {
    "sr-Latn": {
      "all": "Sve aplikacije",
      "bottom": "Sastavi jednom. Ponovo koristi strukturu.",
      "bottomBody": "Organizuj instrukcije koje se ponavljaju kako bi sledeći put manje kucao.",
      "browse": "Pregledaj sve aplikacije",
      "country": "Region App Store-a",
      "description": "Sastavljaj strukturirane upite pomoću šablona za ponovnu upotrebu i sačuvanih podataka. Kopiraj tekst u svoj AI asistent.",
      "eyebrow": "UPIT ZA PONOVNU UPOTREBU",
      "fallback": "Prevod na srpski (latinica) se još proverava. Neki delovi mogu ostati na engleskom.",
      "featuresBody": "Sačuvaj šablone i podatke za buduću upotrebu. Kopiraj upit ili otvori ChatGPT. Aplikacija ne generiše AI odgovor.",
      "featuresTag": "02 / TVOJ TEKST, TVOJ ALAT",
      "featuresTitle": "Alat za upite, a ne AI chatbot.",
      "hero": "Tvoj sledeći upit počinje ovdje.",
      "introBody": "Izaberi šablon, popuni promenjive detalje i dobij upit spreman za kopiranje. Ovo je ilustracija, a ne stvarni snimak ekrana aplikacije.",
      "introTitle": "Pretvori zadatke koji se ponavljaju u šablone.",
      "language": "Jezik",
      "price": "Trenutnu cenu i dostupnost proveri u App Storeu.",
      "section": "01 / JEDNOSTAVNA PONOVNA UPOTREBA",
      "store": "Pogledaj u App Storeu"
    }
  },
  "locale": "sr-Latn",
  "modules": {
    "promptdock-r108": {
      "sr-Latn": {
        "context": "Koristan kontekst",
        "copied": "Kopirano u međuspremnik.",
        "copy": "Kopiraj upit",
        "copyFail": "Pristup međuspremniku je odbijen. Označi i kopiraj tekst upita s desne strane.",
        "defaults": [
          {
            "context": "Za kupce koji se vraćaju. Sačuvane stavke mogu se ponovo koristiti pri sledećoj kupovini.",
            "role": "Urednik opisa aplikacije",
            "task": "Napiši jednu rečenicu o prednosti aplikacije za spisak namirnica"
          },
          {
            "context": "Polje za unos prestaje reagovati nakon promene jezika. Odvoji korake, očekivano i stvarno ponašanje.",
            "role": "Inženjer za kvalitet iOS aplikacija",
            "task": "Napiši izveštaj o grešci koji se može ponoviti"
          },
          {
            "context": "Zahvali korisniku na pohvali jednostavnosti upotrebe. Ne obećavaj nepotvrđenu funkciju.",
            "role": "Autor odgovora korisničke podrške",
            "task": "Sastavi kratak odgovor na recenziju aplikacije"
          }
        ],
        "empty": "Za nastavak unesi AI ulogu i zadatak.",
        "lead": "Izaberi šablon, dodaj današnje detalje i pregledaj strukturirani upit pre slanja bilo kojem AI alatu.",
        "missing": "Još nema sačuvanih unosa.",
        "note": "Samo ilustracija na veb-stranici. Ne šalje se AI zahtev. Sačuvani unosi postoje samo u memoriji ove stranice i nestaju nakon ponovog učitavanja.",
        "outBlank": "Nije navedeno",
        "outContext": "Kontekst",
        "outRole": "Uloga",
        "outRuleText": "Ne izmišljaj činjenice; jasno označi sve što nije moguće proveriti.",
        "outRules": "Ograničenja",
        "outTask": "Zadatak",
        "outTone": "Ton",
        "pill": "SAMO TEKST",
        "preview": "Tvoj sastavljeni upit",
        "ready": "Uredi bilo koji unos kako bi se upit ažurirao.",
        "restore": "Vrati sačuvane unose",
        "restored": "Sačuvani unosi su vraćeni.",
        "role": "AI uloga",
        "sample": "Vrati primer",
        "save": "Sačuvaj unose u ovoj kartici",
        "saved": "Unosi za ovaj šablon sačuvani su na ovoj stranici.",
        "step1": "01 · Izaberi šablon",
        "step2": "02 · Unesi današnje detalje",
        "tab0": "Opis aplikacije",
        "tab1": "Prijava greške",
        "tab2": "Odgovor na recenziju",
        "tag": "PROMPTDOCK AI · INTERAKTIVNI PRIMER",
        "task": "Što treba učiniti?",
        "title": "Prestani iznova pisati isti upit.",
        "tone": "Ton pisanja",
        "tone0": "Jasno i sažeto",
        "tone1": "Toplo i susretljivo",
        "tone2": "Konkretno i praktično"
      }
    },
    "promptdock-r145": {
      "sr-Latn": {
        "aExample": "Nezavisni autori aplikacija",
        "aLabel": "Kome je namenjeno?",
        "area": "Zahvaćeni dio",
        "bExample": "Predstavi novu funkciju postojećim korisnicima",
        "bLabel": "Što bi se trebalo dogoditi?",
        "bugA": "Zahvaćeni dio",
        "bugAEx": "Ekran za plaćanje",
        "bugB": "Što je pošlo po zlu?",
        "bugBEx": "Iznos nestaje nakon primene kupona",
        "bugC": "Očekivani rezultat",
        "bugCEx": "Ažurirani ukupni iznos ostaje vidljiv",
        "build": "02 / ISPUNI POLJA",
        "cExample": "Konkretno, srdačno i sažeto",
        "cLabel": "Kako treba zvučati?",
        "copied": "Kopirano u međuspremnik",
        "copy": "Kopiraj upit",
        "copyFail": "Označi i kopiraj generirani tekst",
        "debug": "Prijava greške",
        "expected": "Očekivano ponašanje",
        "foot": "Samo primer na stranici. Upiti se ne šalju AI sistemu, račun nije potreban, ništa se ne sprema i podaci aplikacije ostaju nepromenjeni.",
        "goal": "Cilj",
        "guide": "01 / IZABERI ŠABLON",
        "instructionDebug": "Sažmi grešku, predloži kratak spisak koraka za njeno ponavljanje i navedi moguće uzroke koje treba istražiti. Nemoj tvrditi da je popravak potvrđen.",
        "instructionLaunch": "Napiši kratak naslov, jednu jasnu korist i jedan sledeći korak. Ne izmišljaj funkcije.",
        "launch": "Sažetak predstavljanja aplikacije",
        "lead": "Izaberi šablon koji možeš ponovo koristiti, popuni nekoliko polja i pogledaj kako nastaju gotove instrukcije. Ovo je interaktivni primer na veb-stranici, a ne sama aplikacija.",
        "len": "reči u upitu",
        "loc": "Lokalni primer na veb-stranici",
        "over": "PROMPTDOCK AI / PONOVO ISKORISTI IDEJU",
        "pDebug": "Pomažeš dijagnosticirati softverski problem.",
        "pLaunch": "Pišeš najavu ažuriranja aplikacije.",
        "preview": "03 / TVOJ UPIT SPREMAN ZA UPOTREBU",
        "problem": "Uočeni problem",
        "reset": "Vrati primer na početak",
        "style": "Stil",
        "target": "Publika",
        "title": "Prestani iznova pisati isti upit."
      }
    },
    "promptdock-r265": {
      "sr-Latn": {
        "choose": "Tvoji zadaci koji se ponavljaju",
        "copy": "Kopiraj upit",
        "copyDone": "Kopirano",
        "copyFail": "Označi i kopiraj upit u nastavku",
        "details": "Ključne detalje",
        "detailsPlace": "npr. Pretraživanje sada radi i u sačuvanim šablonima",
        "edit": "ISPUNI POLJA",
        "editTitle": "Menjaj detalje, a ne strukturu.",
        "extra": "Postoji li nešto što mora biti uključeno?",
        "extraPlace": "npr. Napomeni da postojeći podaci ostaju sačuvani",
        "eyebrow": "PROMPTDOCK AI / ALAT ZA VIŠEKRATNE UPITE",
        "footer": "Pregled uživo tijeka rada koji se može ponavljati. Samo primer — podaci se nikamo ne šalju.",
        "hero": "Opet si pitao AI isto. I opet sve ispisao.",
        "kind": [
          "Napomena o izdanju aplikacije",
          "Odgovor korisničke podrške",
          "Opis proizvoda za oglas"
        ],
        "lang": "Jezik",
        "lead": "Izaberi šablon, ispuni nekoliko polja i dobij strukturirani upit koji možeš ponovo koristiti. Sledeći put krećeš od obrasca, a ne od prazne stranice.",
        "listing": "Opis proizvoda",
        "nothing": "Još ništa nije sačuvano",
        "notice": "Ilustrativni šabloni; unos ostaje na ovoj stranici. Nema AI zahteva, računa, trajnog spremanja ni automatskog izvoza.",
        "outFacts": "Detalji",
        "outFinish": "Vrati samo gotov tekst; ne izmišljaj činjenice.",
        "outMust": "Zahtevi",
        "outTone": "Ton",
        "outTopic": "Tema",
        "outputIntro": "Napiši {kind}.",
        "panel": "IZABERI POLAZIŠTE",
        "preview": "SPREMNO ZA KOPIRANJE",
        "previewSub": "Rezultat se menja dok pišeš. Sastavlja se lokalno iz tvojih polja, a ne putem AI usluge.",
        "previewTitle": "Tvoj sastavljeni upit.",
        "region": "Regija trgovine",
        "release": "Ažuriranje aplikacije",
        "reply": "Odgovor podrške",
        "reset": "Vrati primer na početak",
        "restore": "Vrati sačuvani skup",
        "sample": "INTERAKTIVNI PRIMER",
        "save": "Spremi ovu skupinu unosa",
        "saved": "Sačuvano na ovoj stranici",
        "seed": [
          [
            "Novi filtri pretraživanja",
            "Korisnici mogu suziti sačuvane upite po kategoriji bez gubitka postojećih skupova unosa.",
            "Najviše 100 reči."
          ],
          [
            "Odgovori na pitanje o ažuriranju",
            "Objasni da sačuvani skupovi unosa ostaju na uređaju nakon najnovijeg ažuriranja.",
            "Izbjegavaj obećanja o određenim datumima isporuke."
          ],
          [
            "Lagana putna bilježnica",
            "Džepna bilježnica s praznim točkastim stranicama i izdržljivim koricama.",
            "Nemoj navoditi nepotvrđene tvrdnje o ekološkim certifikatima."
          ]
        ],
        "step": "ŠABLON / UNOS / SPREMNO",
        "store": "Pogledaj PromptDock AI u App Storeu",
        "subject": "O čemu je reč?",
        "subjectPlace": "npr. Dodaj brzo pretraživanje u aplikaciju",
        "templateLabels": [
          "Ažuriranje aplikacije",
          "Odgovor podrške",
          "Opis proizvoda"
        ],
        "tone": "Ton",
        "toneOptions": [
          "Jasno i sažeto",
          "Toplo i susretljivo",
          "Izravno i profesionalno"
        ]
      }
    },
    "promptdock-r310": {
      "sr-Latn": {
        "audience": "Kome je namenjeno?",
        "audiences": [
          "Zaposleni kupci",
          "Korisnik aplikacije",
          "Mali produktni tim"
        ],
        "copy": "Kopiraj upit",
        "desc": "Izaberi šablon, promijeni tri unosa i kopiraj upit spreman za upotrebu. Vrati sačuvanu skupinu unosa bez ponovog tipkanja.",
        "detail": [
          "Navedi jedan konkretan primer",
          "Priznaj problem bez pretjeranih obećanja",
          "Navedi korake prema redoslijedu prioriteta"
        ],
        "empty": "Još nema sačuvanih skupova.",
        "fallback": "Kopiranje nije dostupno u ovom pregledniku.",
        "feedbackCopy": "Kopirano u međuspremnik.",
        "feedbackFallback": "Označi i kopiraj gornji upit.",
        "feedbackRestore": "Unosi su vraćeni.",
        "feedbackSave": "Sačuvano. Za ponovo korišćenje izaberi skup u nastavku.",
        "kicker": "VREME KOJE OPET TROŠIŠ NA KUCANJE",
        "labels": [
          "Zadatak",
          "Publika",
          "Ton",
          "Obavezno uključiti"
        ],
        "lang": "Jezik primera",
        "note": "Ovo je primer na odredišnoj stranici. Zahtevi se ne šalju AI sistemu; skupovi postoje samo dok je stranica otvorena.",
        "notes": "Jedan detalj koji moraš uključiti",
        "options": [
          "Objasni aplikaciju",
          "Odgovori na povratne informacije",
          "Isplaniraj zadatak"
        ],
        "out": "02 / Spremno za kopiranje",
        "result": [
          "Napiši sažeto objašnjenje aplikacije.",
          "Napiši kratak odgovor pun poštovanja.",
          "Sastavi praktičan plan djelovanja."
        ],
        "save": "Spremi ove unose",
        "saved": "Sačuvani skupovi (samo na ovoj stranici)",
        "setup": "01 / Tvoji unosi za ponovnu upotrebu",
        "subject": "O čemu je reč?",
        "subjects": [
          "Mala aplikacija koja pomaže upoređivati cene",
          "Korisnik koji je prijavio zbunjujući gumb",
          "Poboljšanje funkcije u jednom satu"
        ],
        "template": "Šablon",
        "title": "Prestani iznova pisati isti upit.",
        "tone": "Ton",
        "tones": [
          "Jasno i sažeto",
          "Toplo i ljudski",
          "Izravno i precizno"
        ]
      }
    },
    "promptdock-r351": {
      "sr-Latn": {
        "brand": "PROMPTDOCK / IDEJE ZA PONOVNU UPOTREBU",
        "cases": [
          "Ažuriranje aplikacije",
          "Odgovor podrške",
          "Predstavljanje proizvoda"
        ],
        "copied": "Kopirano u međuspremnik",
        "copy": "Kopiraj ovaj upit",
        "eyebrow": "ISTI ZADATAK. NOVI DAN.",
        "field1": "Šta treba postići?",
        "field2": "Kome je namenjeno?",
        "field3": "Koja pravila treba poštovati?",
        "first": "Zadatak",
        "last": "Vrati jasan, upotrebljiv odgovor. Postavi kratko pitanje samo ako nedostaje ključna informacija.",
        "lead": "Znaš šta želiš od AI alata. Ali svaki put ponovo upisuješ kontekst, publiku i pravila. Zadrži strukturu. Promijeni samo ono što je važno.",
        "localDemo": "PRIMER NA STRANICI",
        "manual": "Označi i kopiraj tekst",
        "note": "Ovo je izmišljeni, lokalni primer na veb-stranici koji prikazuje polja upita za ponovnu upotrebu. Primeri šablona ne znače da su ugrađeni u aplikaciju. Nema poziva ChatGPT-u, pristupa računu, sačuvanih unosa, analitike, mrežnih zahteva niti povezivanja s aplikacijom. Tekst se ne čuvuje. Kopiranje je isključivo lokalna radnja preglednika.",
        "panel": "02  POPUNI ŠTA SE DANAS PROMIJENILO",
        "phaseInput": "UNOS",
        "phaseReady": "SPREMNO",
        "phaseReuse": "PONOVNA UPOTREBA",
        "preview": "03  UPIT SPREMAN ZA UPOTREBU",
        "reset": "Vrati ovaj primer na početak",
        "second": "Publika",
        "select": "01  IZABERI ZADATAK ZA PONOVNU UPOTREBU",
        "strap": "NAPRAVI JEDNOM. PONOVO KORISTI STRUKTURU.",
        "structure": "Oblik ostaje. Detalji se menjaju.",
        "sub": "Izaberi izmišljeni zadatak. Popuni tri polja. Prati kako se gotova instrukcija sama sastavlja.",
        "tag": "PONAVLJAJ POSAO, A NE KUCANJE",
        "third": "Ograničenja",
        "title": "Prestani iznova pisati istu instrukciju.",
        "word": "reči",
        "words": "REČI"
      }
    },
    "promptdock-r67": {
      "sr-Latn": {
        "a": "01 / IZABERI",
        "b": "02 / ISPUNI",
        "c": "03 / KOPIRAJ",
        "chosen": "ODGOVOR KUPCU",
        "copy": "KOPIRAJ TEKST",
        "field1": "Tema",
        "field2": "Ton",
        "fields": "POLJA ZA UNOS",
        "h1": "Počni s šablonom",
        "h2": "Dodaj samo detalje",
        "h3": "Kopiraj upit spreman za upotrebu",
        "lead": "Izaberi šablon za zadatak koji se ponavlja, unesi detalje i kopiraj dobijeni tekst u AI asistenta kojeg već koristiš.",
        "note": "Ilustrativni šablon i primeri vrednosti; ovo nije stvarni snimak ekrana aplikacije, generisani odgovor niti veza s AI uslugom.",
        "other": "NAPOMENA O IZDANJU",
        "p1": "Izaberi ugrađeni šablon ili vlastiti obrazac za zadatke koje ponavljaš.",
        "p2": "Popuni polja za ovaj zahtev. Često korišćene skupove unosa sačuvaj za kasnije.",
        "p3": "Sastavi strukturirani tekst upita, pa ga kopiraj u željeni AI alat. Ova ilustracija ne generiše AI odgovor.",
        "rail1": "ŠABLON",
        "rail2": "TVOJI PODACI",
        "rail3": "KOPIRAJ",
        "ready": "STRUKTURIRANI UPIT",
        "tag": "01 / UPIT ZA VIŠEKRATNU UPOTREBU",
        "template": "ŠABLON",
        "title": "Prestani iznova pisati isti upit.",
        "value1": "Pitanje o dostavi",
        "value2": "Kratko i susretljivo"
      }
    }
  },
  "r351_samples": {
    "sr-Latn": [
      [
        "Napiši sažete napomene o izdanju za ažuriranje aplikacije za poređenje cena.",
        "Osobe koje koriste praktične aplikacije za svakodnevnu kupovinu.",
        "Piši jasno na bosanskom jeziku. Navedi samo potvrđene promene. Najviše 120 reči."
      ],
      [
        "Odgovori kupcu koji još ne vidi kupljenu stavku.",
        "Novi korisnik kojem je potreban smiren i koristan odgovor.",
        "Kratko se izvini. Predloži konkretne korake. Ne obećavaj nepotvrđen povrat novca."
      ],
      [
        "Predstavi alat za poređenje cena u jednoj rečenici.",
        "Kupci koji porede velika i uobičajena pakovanja.",
        "Počni s problemom. Izbjegavaj reklamne slogane. Najviše 25 reči."
      ]
    ]
  },
  "round": "R411",
  "source_coverage": {
    "r351_sample_fields_per_locale": 9,
    "source_bound_module_rows_per_locale": 237,
    "source_catalog_nonempty": 303,
    "source_catalog_rows_per_locale": 304,
    "standalone_labels_per_locale": 18,
    "unresolved_source_mapping_per_locale": 1
  },
  "translation_quality": "AI_DRAFT_ADAPTED_FROM_BOSNIAN_EKAVIAN_LATIN_PENDING_NATIVE_REVIEW"
};
