(()=>{
 'use strict';
 const APP='6763169050', OWNER='r22r8r5r1';
 if(document.body?.dataset.p199Id!==APP)return;
 const GENRES={"ar-SA":"ألعاب","bn-BD":"গেম","ca":"Jocs","cs":"Hry","da":"Spil","de-DE":"Spiele","el":"Παιχνίδια","en-AU":"Games","en-CA":"Games","en-GB":"Games","en-US":"Games","es-ES":"Juegos","es-MX":"Juegos","fi":"Pelit","fr-CA":"Jeux","fr-FR":"Jeux","gu-IN":"રમતો","he":"משחקים","hi":"गेम","hr":"Igre","hu":"Játékok","id":"Permainan","it":"Giochi","ja":"ゲーム","kn-IN":"ಆಟಗಳು","ko":"게임","ml-IN":"ഗെയിമുകൾ","mr-IN":"खेळ","ms":"Permainan","nl-NL":"Spellen","no":"Spill","or-IN":"ଖେଳ","pa-IN":"ਖੇਡਾਂ","pl":"Gry","pt-BR":"Jogos","pt-PT":"Jogos","ro":"Jocuri","ru":"Игры","sk":"Hry","sl-SI":"Igre","sv":"Spel","ta-IN":"விளையாட்டுகள்","te-IN":"ఆటలు","th":"เกม","tr":"Oyunlar","uk":"Ігри","ur-PK":"کھیل","vi":"Trò chơi","zh-Hans":"游戏","zh-Hant":"遊戲"};
 const select=()=>document.getElementById('p199-language');
 let queued=false,applying=false;
 const expectedLocale=()=>select()?.value||'';
 function apply(){
  if(applying)return;
  applying=true;
  const state={locale:expectedLocale(),complete:false,cardCount:0,changed:0,errors:[],owner:OWNER};
  try{
   const target=document.getElementById('p199-related-list');
   const desired=GENRES[state.locale];
   if(!target||!desired){state.errors.push('MISSING_RELATED_TARGET_OR_LOCALE');return;}
   const cards=[...target.querySelectorAll(':scope > a.p199-related-card')];
   state.cardCount=cards.length;
   if(cards.length!==3){state.errors.push('UNEXPECTED_RELATED_CARD_COUNT');return;}
   for(const card of cards){
    const copy=card.querySelector(':scope > .p199-related-copy');
    const label=copy?.querySelector(':scope > span');
    if(!label||!card.getAttribute('href')||!copy?.querySelector(':scope > strong')){
      state.errors.push('MISSING_GENRE_OR_NAME_OR_HREF');continue;
    }
    // Only the known source category Games may be changed. Anything else is HOLD.
    let original=label.dataset.tszRelatedGenreOriginal;
    if(!original){
      // Production's Spanish common UI translates known 'Games' -> 'Juegos'
      // before this QA-only genre patch. Both are the same *verified* source category.
      const observed=(label.textContent||'').trim();
      const spanish=state.locale==='es-ES'||state.locale==='es-MX';
      if(observed!=='Games' && !(spanish&&observed==='Juegos')){
        state.errors.push('UNEXPECTED_GENRE_SOURCE:'+observed.slice(0,60));continue;
      }
      original='Games';label.dataset.tszRelatedGenreOriginal=original;
      label.dataset.tszRelatedGenreSourceProvenance=observed==='Games'?'en-Games':'es-Juegos';
    }
    if(original!=='Games'){state.errors.push('SOURCE_CATEGORY_MUTATED');continue;}
    if(label.textContent!==desired){label.textContent=desired;state.changed++;}
    label.dataset.tszRelatedGenreOwner=OWNER;
    label.dataset.tszRelatedGenreLocale=state.locale;
    if(label.textContent!==desired)state.errors.push('FINAL_GENRE_NOT_APPLIED');
   }
   state.complete=state.errors.length===0&&state.cardCount===3;
  }finally{window.__r22r8r5r1RelatedGenreQA=state;applying=false;}
 }
 function schedule(){if(queued)return;queued=true;setTimeout(()=>{queued=false;apply();},65);}
 function init(){
  const tgt=document.getElementById('p199-related-list');
  if(tgt){new MutationObserver(schedule).observe(tgt,{subtree:true,childList:true,characterData:true});}
  select()?.addEventListener('change',()=>{for(const ms of [45,170,400,880])setTimeout(schedule,ms)});
  document.getElementById('p199-country')?.addEventListener('change',()=>{for(const ms of [70,260,600])setTimeout(schedule,ms)});
  schedule();setTimeout(schedule,450);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
