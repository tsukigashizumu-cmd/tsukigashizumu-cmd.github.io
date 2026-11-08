/* R39R6P22R8R5R6 — QA-only PuddingScoop Spanish caption deduplication.
 * The existing legacy #r21r6-editorial-source is the authoritative first line; #p199-full-caption is an empty anchor.
 * The extra, second line is #r22r8-independent-editorial (NOT #r22r2-editorial-source).
 * On es-ES and es-MX only, a locale-scoped CSS rule suppresses the extra line.
 * The source/caption validator remains strict and fails QA if either differs. Other locales, textContent, metadata, links, images stay unchanged.
 */
(()=>{'use strict';
 if(!/^\/next\/apps\/6763169050\/?$/.test(location.pathname)||document.body?.dataset.p199Id!=='6763169050')return;
 const FLAG='tszPuddingEsNoteDedup';
 const expectedPrimary={"es-ES":"Traducción editorial al español de la descripción mostrada originalmente en inglés. Consulta la App Store para consultar el texto oficial.","es-MX":"Traducción editorial al español de la descripción mostrada originalmente en inglés. Consulta la App Store para ver el texto oficial."};
 const expected={
  'es-ES':'Traducción editorial independiente basada en la descripción en inglés. No se ha modificado el texto oficial de App Store.',
  'es-MX':'Traducción editorial independiente basada en la descripción en inglés. No se modificó la descripción oficial de App Store.'
 };
 const state={revision:'R39R6P22R8R5R6',locale:null,active:false,reason:'NOT_READY',sourceModified:false,validatedExtra:false,validatedPrimary:false,primaryExists:false,primaryVisible:false,primaryLength:0,extraLength:0};
 Object.defineProperty(window,'__r22r8r5r6SpanishNoteQA',{configurable:false,get:()=>({...state})});
 const style=document.createElement('style');style.id='r22r8r5r6-note-style';
 style.textContent='body[data-tsz-pudding-es-note-dedup="1"] #r22r8-independent-editorial, html[lang="es-ES"] #r22r8-independent-editorial, html[lang="es-MX"] #r22r8-independent-editorial { display: none !important; }';
 document.head.appendChild(style);
 const lang=document.getElementById('p199-language');let pending=false;
 function apply(){
  const locale=lang?.value||'';
  const primaryNode=document.getElementById('r21r6-editorial-source');
  const primary=String(primaryNode?.textContent||'').normalize('NFC').trim();
  const primaryVisible=Boolean(primaryNode&&!primaryNode.hidden);
  const secondary=String(document.getElementById('r22r8-independent-editorial')?.textContent||'').normalize('NFC').trim();
  const inScope=Object.prototype.hasOwnProperty.call(expected,locale);
  const validPrimary=Boolean(inScope&&primaryVisible&&primary===expectedPrimary[locale]);
  const validSecondary=inScope&&secondary===expected[locale];
  const active=Boolean(inScope&&validPrimary&&validSecondary);
  const desired=active?'1':'0';
  if(document.body.dataset[FLAG]!==desired)document.body.dataset[FLAG]=desired;
  state.locale=locale;state.active=active;state.primaryExists=!!primaryNode;state.primaryVisible=primaryVisible;state.validatedExtra=!!validSecondary;state.validatedPrimary=!!validPrimary;state.primaryLength=primary.length;state.extraLength=secondary.length;
  state.reason=active?'DUPLICATE_R22R8_HIDDEN':!inScope?'OTHER_LOCALE':!validPrimary?'PRIMARY_CAPTION_NOT_APPROVED':'SECONDARY_NOTE_MISSING_OR_UNEXPECTED';
 }
 function schedule(){if(pending)return;pending=true;setTimeout(()=>{pending=false;apply();},40)}
 function init(){if(!lang)return;
  lang.addEventListener('change',()=>{apply();for(const ms of [70,250,600,1050])setTimeout(schedule,ms)});
  const area=document.getElementById('full-description');
  if(area)new MutationObserver(schedule).observe(area,{childList:true,characterData:true,subtree:true});
  apply();for(const ms of [120,450,1000])setTimeout(schedule,ms);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
