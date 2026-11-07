/* TSZ R39R6P21R8 | PromptDock AI: Spanish editorial copy only.
 * SOURCE DATA: R21R4 original DOM evidence. No App Store metadata writes.
 * APP_ID gated; all non-Spanish locale content is owned by the native renderer.
 */
(()=>{'use strict';
const APP_ID='6772130038';
if(document.body?.dataset?.p19AppId!==APP_ID)return;
const SOURCE={"hero_lead":"Build a reusable AI prompt instead of rewriting the same request.","overview_problem":"Repeatedly writing a similar AI request can mean repeating the same instructions and details.","constraints":"PromptDock creates prompts; it does not automatically produce or guarantee an AI answer. The ChatGPT shortcut is optional.","workflow":["Choose a template","Fill in the fields","Generate and copy your prompt"],"use_cases":[["Repeat a familiar task","Start from a built-in template instead of a blank prompt."],["Reuse your input","Save an input set and return to it when the task comes up again."],["Maintain your own formats","Create custom prompt templates and import or export their definitions as JSON."]],"full_description":"PromptDock AI is a lightweight prompt builder for people who repeatedly write similar AI prompts.Choose a built-in template, fill in the fields, and generate a structured prompt in seconds. You can copy the result, open ChatGPT, save repeated input sets, restore prompt history, and create your own custom templates.PromptDock AI is designed for indie developers, creators, app makers, and anyone who wants a faster, more reusable AI workflow.Features:Built-in prompt templatesCustom prompt templatesSaved input setsField suggestionsPrompt historyFavorite templatesJSON export and import for custom templatesOne-tap copyOptional ChatGPT shortcutYour data stays on your device. PromptDock AI does not require an account and does not collect personal information.","source_mx":"This description is shown in en-US because a es-MX description is not available in the current metadata.","source_es":"This description is shown in en-US because a es-ES description is not available in the current metadata."};
const LOCALIZED={"es-MX":{"hero_lead":"Crea un prompt de IA reutilizable en vez de escribir la misma solicitud una y otra vez.","overview_problem":"Escribir solicitudes parecidas para una IA puede obligarte a repetir las mismas instrucciones y datos.","constraints":"PromptDock crea prompts; no genera ni garantiza automáticamente una respuesta de IA. El acceso directo a ChatGPT es opcional.","workflow":["Elige una plantilla","Llena los campos","Genera y copia tu prompt"],"use_cases":[["Repite una tarea conocida","Empieza con una plantilla incluida en lugar de escribir un prompt desde cero."],["Reutiliza tus datos","Guarda un conjunto de datos y recupéralo cuando vuelvas a realizar esa tarea."],["Mantén tus propios formatos","Crea plantillas personalizadas e importa o exporta sus definiciones en JSON."]],"full_parts":["PromptDock AI es una herramienta ligera para crear prompts, pensada para quienes escriben solicitudes parecidas a una IA una y otra vez.","Elige una plantilla incluida, llena los campos y genera en segundos un prompt estructurado. Puedes copiarlo, abrir ChatGPT, guardar conjuntos de datos que usas con frecuencia, recuperar el historial de prompts y crear tus propias plantillas.","PromptDock AI está diseñada para desarrolladores independientes, creadores, personas que hacen apps y cualquiera que busque una forma más rápida y reutilizable de trabajar con IA.","Funciones:","Plantillas de prompts incluidas","Plantillas personalizadas","Conjuntos de datos guardados","Sugerencias para completar campos","Historial de prompts","Plantillas favoritas","Exportación e importación JSON de plantillas personalizadas","Copia con un toque","Acceso directo opcional a ChatGPT","Tus datos permanecen en tu dispositivo. PromptDock AI no requiere una cuenta ni recopila información personal."],"description_source":"Traducción editorial al español basada en la descripción en inglés (en-US). Los metadatos actuales no incluyen una descripción oficial en es-MX; consulta App Store para ver el texto oficial."},"es-ES":{"hero_lead":"Crea un prompt de IA reutilizable en lugar de redactar la misma solicitud una y otra vez.","overview_problem":"Escribir solicitudes similares para una IA puede obligarte a repetir las mismas instrucciones y datos.","constraints":"PromptDock crea prompts; no genera ni garantiza automáticamente una respuesta de IA. El acceso directo a ChatGPT es opcional.","workflow":["Elige una plantilla","Rellena los campos","Genera y copia tu prompt"],"use_cases":[["Repite una tarea habitual","Empieza con una plantilla incorporada en lugar de escribir un prompt desde cero."],["Reutiliza tus datos","Guarda un conjunto de datos y recupéralo cuando vuelvas a realizar esa tarea."],["Mantén tus propios formatos","Crea plantillas personalizadas e importa o exporta sus definiciones en JSON."]],"full_parts":["PromptDock AI es una herramienta ligera para crear prompts, dirigida a quienes redactan solicitudes similares para una IA una y otra vez.","Elige una plantilla incorporada, rellena los campos y genera en segundos un prompt estructurado. Puedes copiarlo, abrir ChatGPT, guardar conjuntos de datos que reutilizas, recuperar el historial de prompts y crear tus propias plantillas.","PromptDock AI está diseñada para desarrolladores independientes, creadores, desarrolladores de aplicaciones y cualquier persona que busque una forma de trabajar con IA más rápida y reutilizable.","Funciones:","Plantillas de prompts incorporadas","Plantillas personalizadas","Conjuntos de datos guardados","Sugerencias para los campos","Historial de prompts","Plantillas favoritas","Exportación e importación de plantillas personalizadas en JSON","Copia con un toque","Acceso directo opcional a ChatGPT","Tus datos permanecen en tu dispositivo. PromptDock AI no requiere una cuenta ni recopila información personal."],"description_source":"Traducción editorial al español basada en la descripción en inglés (en-US). Los metadatos actuales no incluyen una descripción oficial en es-ES; consulta el App Store para ver el texto oficial."}};
const canon=t=>String(t||'').normalize('NFC').replace(/\s+/gu,' ').trim();
const find=id=>document.getElementById(id);
const select=find('p19-language');
const chosen=()=>{
  const s=String(select?.value||new URLSearchParams(location.search).get('language')||'');
  return s==='es-MX'||s==='es-ES'?s:null;
};
const allLocalized=key=>Object.values(LOCALIZED).map(x=>x[key]);
const record={revision:'R39R6P21R8',appId:APP_ID,locale:null,appliedGroups:0,unknownSource:[],
  sourceEnglishObserved:false,descriptionIsEditorialTranslation:false,originalAppStoreMetadataChanged:false};
Object.defineProperty(window,'__r21r8PromptDockCopyQA',{configurable:false,get:()=>({
 ...record,unknownSource:record.unknownSource.slice()
})});
let applying=false,scheduled=false,originalFullNodes=null;
function markUnknown(key){if(!record.unknownSource.includes(key))record.unknownSource.push(key);}
function replaceText(el,original,esValue,key){
 if(!el){markUnknown(key+':MISSING');return false;}
 const c=canon(el.textContent);
 const allowed=[original,...allLocalized(key)].map(canon);
 if(!allowed.includes(c)){if(c)markUnknown(key+':SOURCE_CHANGED');return false;}
 if(c!==canon(esValue))el.textContent=esValue;
 return true;
}
function restoreText(el,original,key){
 if(!el)return;
 if(allLocalized(key).some(s=>canon(s)===canon(el.textContent)))el.textContent=original;
}
function workflow(t){
 const els=Array.from(document.querySelectorAll('#p19-workflow li > span:last-child'));
 if(els.length!==3){markUnknown('workflow:COUNT_'+els.length);return false;}
 if(!els.every((e,i)=>[SOURCE.workflow[i],...allLocalized('workflow').map(a=>a[i])].map(canon).includes(canon(e.textContent)))){
   markUnknown('workflow:SOURCE_CHANGED');return false;
 }
 els.forEach((e,i)=>{if(canon(e.textContent)!==canon(t.workflow[i]))e.textContent=t.workflow[i]});return true;
}
function restoreWorkflow(){
 Array.from(document.querySelectorAll('#p19-workflow li > span:last-child')).forEach((e,i)=>{
   if(i<3&&allLocalized('workflow').some(x=>canon(x[i])===canon(e.textContent)))e.textContent=SOURCE.workflow[i];
 });
}
function cases(t){
 const rows=Array.from(document.querySelectorAll('#p19-usecases .p19-case'));
 if(rows.length!==3){markUnknown('use_cases:COUNT_'+rows.length);return false;}
 for(let i=0;i<3;i++){
  const h=rows[i].querySelector('h3'),p=rows[i].querySelector('p');
  if(!h||!p||![SOURCE.use_cases[i][0],...allLocalized('use_cases').map(a=>a[i][0])].map(canon).includes(canon(h.textContent)) ||
    ![SOURCE.use_cases[i][1],...allLocalized('use_cases').map(a=>a[i][1])].map(canon).includes(canon(p.textContent))){
    markUnknown('use_cases:SOURCE_CHANGED_'+(i+1));return false;
  }
 }
 rows.forEach((r,i)=>{
  const h=r.querySelector('h3'),p=r.querySelector('p');
  if(canon(h.textContent)!==canon(t.use_cases[i][0]))h.textContent=t.use_cases[i][0];
  if(canon(p.textContent)!==canon(t.use_cases[i][1]))p.textContent=t.use_cases[i][1];
 });return true;
}
function restoreCases(){
 const rows=Array.from(document.querySelectorAll('#p19-usecases .p19-case'));
 rows.forEach((r,i)=>{if(i>=3)return;
  for(let k=0;k<2;k++){
   const el=r.querySelector(k===0?'h3':'p');
   if(el&&allLocalized('use_cases').some(a=>canon(a[i][k])===canon(el.textContent)))el.textContent=SOURCE.use_cases[i][k];
  }
 });
}
function renderedFull(t){
 const frag=document.createDocumentFragment();
 t.full_parts.slice(0,3).forEach(txt=>{const p=document.createElement('p');p.textContent=txt;frag.appendChild(p)});
 const head=document.createElement('p');head.className='p19-description-subhead';head.textContent=t.full_parts[3];frag.appendChild(head);
 const ul=document.createElement('ul');ul.className='p19-description-list';
 t.full_parts.slice(4,13).forEach(txt=>{const li=document.createElement('li');li.textContent=txt;ul.appendChild(li)});
 frag.appendChild(ul);
 const last=document.createElement('p');last.textContent=t.full_parts[13];frag.appendChild(last);
 return frag;
}
function full(t){
 const el=find('p19-description');if(!el){markUnknown('full_description:MISSING');return false;}
 const current=canon(el.textContent);
 const base=canon(SOURCE.full_description);
 const spanish=Object.values(LOCALIZED).map(x=>canon(x.full_parts.join('')));
 if(![base,...spanish].includes(current)){if(current)markUnknown('full_description:SOURCE_CHANGED');return false;}
 if(current===base){record.sourceEnglishObserved=true;originalFullNodes=Array.from(el.childNodes).map(n=>n.cloneNode(true));}
 if(current!==canon(t.full_parts.join('')))el.replaceChildren(renderedFull(t));
 record.descriptionIsEditorialTranslation=true;
 return true;
}
function restoreFull(){
 const el=find('p19-description');if(!el||!originalFullNodes)return;
 if(Object.values(LOCALIZED).some(x=>canon(x.full_parts.join(''))===canon(el.textContent))){
  el.replaceChildren(...originalFullNodes.map(x=>x.cloneNode(true)));
 }
}
function sourceCaption(t){
 const el=find('p19-description-source');if(!el){markUnknown('description_source:MISSING');return false;}
 const allowed=[SOURCE.source_mx,SOURCE.source_es,...allLocalized('description_source'),
  'Source: App Store description, locale en-US; not an invented testimonial.'].map(canon);
 const current=canon(el.textContent);
 if(!allowed.includes(current)){if(current)markUnknown('description_source:SOURCE_CHANGED');return false;}
 if(current!==canon(t.description_source))el.textContent=t.description_source;
 el.dataset.r21r8Editorial='true';return true;
}
function apply(){
 if(applying)return;applying=true;
 try{
  const lang=chosen(), ready=!find('p19-detail')?.hidden;
  record.locale=lang;record.appliedGroups=0;record.unknownSource=[];
  record.descriptionIsEditorialTranslation=false;
  if(!lang){
    if(select?.value==='en-US'){
      restoreText(find('p19-oneline'),SOURCE.hero_lead,'hero_lead');
      restoreText(find('p19-problem'),SOURCE.overview_problem,'overview_problem');
      restoreText(find('p19-constraints'),SOURCE.constraints,'constraints');
      restoreWorkflow();restoreCases();restoreFull();
      const caption=find('p19-description-source');
      if(caption&&allLocalized('description_source').some(x=>canon(x)===canon(caption.textContent))){
        caption.textContent='Source: App Store description, locale en-US; not an invented testimonial.';
      }
    }
    const caption=find('p19-description-source');if(caption)delete caption.dataset.r21r8Editorial;
    return;
  }
  if(!ready)return;
  const t=LOCALIZED[lang];
  const ok=[
   replaceText(find('p19-oneline'),SOURCE.hero_lead,t.hero_lead,'hero_lead'),
   replaceText(find('p19-problem'),SOURCE.overview_problem,t.overview_problem,'overview_problem'),
   replaceText(find('p19-constraints'),SOURCE.constraints,t.constraints,'constraints'),
   workflow(t),cases(t),full(t),sourceCaption(t)
  ];
  record.appliedGroups=ok.filter(Boolean).length;
 }finally{applying=false;}
}
function schedule(){if(scheduled)return;scheduled=true;setTimeout(()=>{scheduled=false;apply()},60)}
function init(){
 if(!select)return;
 apply();select.addEventListener('change',()=>{schedule();setTimeout(schedule,210);setTimeout(schedule,740)});
 const obs=new MutationObserver(schedule);
 for(const id of ['p19-detail','p19-oneline','p19-problem','p19-constraints','p19-workflow','p19-usecases','p19-description','p19-description-source']){
  const el=find(id);if(el)obs.observe(el,{childList:true,subtree:true,characterData:true,attributes:false});
 }
 setTimeout(schedule,280);setTimeout(schedule,1100);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
