/* R39R6P21R9: PromptDock AI only — limited Spanish UI labels. No App Store metadata changes, media edits, or deploy. */
(()=>{
'use strict';
if(document.body?.dataset?.p19AppId!=='6772130038')return;
const ROUND='R39R6P21R9';
const L={
 'es-MX':{
  editorial:'Esta página ofrece una traducción editorial al español. La descripción oficial de App Store no se ha modificado.',
  usecases:'Ejemplos de uso basados en funciones publicadas; no son testimonios de usuarios.',
  media:'Imágenes publicadas en App Store',category:'PRODUCTIVIDAD / App Store',
  caption:(country,num,suffix)=>`Apple App Store · tienda ${country} · imagen publicada ${num}${suffix?' · vista previa reducida':''}`
 },
 'es-ES':{
  editorial:'Esta página muestra una traducción editorial al español. La descripción oficial del App Store no se ha modificado.',
  usecases:'Ejemplos de uso basados en funciones publicadas; no son opiniones de usuarios.',
  media:'Capturas publicadas en el App Store',category:'PRODUCTIVIDAD / App Store',
  caption:(country,num,suffix)=>`Apple App Store · tienda ${country} · captura publicada ${num}${suffix?' · vista previa reducida':''}`
 }
};
const SOURCE={
 editorial:['This page’s editorial explanation is in English. The App Store description below uses the available listing language.','This page\'s editorial explanation is in English. The App Store description below uses the available listing language.'],
 usecases:['Usage examples based on published features—not user testimonials.'],
 media:['Published App Store images'],
 category:['Productivity / App Store','PRODUCTIVITY / App Store','PRODUCTIVITY / APP STORE']
};
const SEL={editorial:'p19-editorial-source',usecases:'p19-usecase-source',media:'p196-media-foot',category:'p19-category',caption:'p19-hero-img-caption'};
const norm=x=>String(x??'').normalize('NFC').replace(/[’‘]/gu,"'").replace(/\s+/gu,' ').trim();
const get=id=>document.getElementById(id);
const loc=()=>{const s=get('p19-language')?.value;return s==='es-MX'||s==='es-ES'?s:null};
const QA={round:ROUND,appId:'6772130038',locale:null,appliedGroups:0,unknownSource:[],originalAppStoreMetadataModified:false,mediaModified:false};
Object.defineProperty(window,'__r21r9PromptDockLabelsQA',{configurable:false,get:()=>({...QA,unknownSource:[...QA.unknownSource]})});
const originalCaption=/^Apple App Store · ([A-Z]{2}) storefront · published image ([1-9]\d*)(?: · (reduced-size preview))?$/u;
const newCaption=/^Apple App Store · tienda ([A-Z]{2}) · (?:imagen|captura) publicada ([1-9]\d*)(?: · (vista previa reducida))?$/u;
const sourceCaption=t=>{let m=originalCaption.exec(t);if(m)return {country:m[1],num:m[2],suffix:!!m[3]};m=newCaption.exec(t);return m?{country:m[1],num:m[2],suffix:!!m[3]}:null};
let applying=false,pending=false;
function write(id,txt){const e=get(id);if(e&&e.textContent!==txt)e.textContent=txt}
function apply(){if(applying)return;applying=true;
 try{
  const s=loc();QA.locale=s;QA.appliedGroups=0;QA.unknownSource=[];
  const ready=!get('p19-detail')?.hidden;if(!ready)return;
  for(const key of ['editorial','usecases','media','category','caption']){
   const e=get(SEL[key]);if(!e){QA.unknownSource.push(key+':MISSING');continue}
   const current=norm(e.textContent);if(!current){QA.unknownSource.push(key+':EMPTY');continue}
   if(key==='caption'){
    const data=sourceCaption(current);
    if(!data){QA.unknownSource.push(key+':SOURCE_CHANGED');continue}
    if(s){write(SEL[key],L[s].caption(data.country,data.num,data.suffix));QA.appliedGroups++}
    else if(Object.values(L).some(l=>norm(l.caption(data.country,data.num,data.suffix))===current)){
     write(SEL[key],`Apple App Store · ${data.country} storefront · published image ${data.num}${data.suffix?' · reduced-size preview':''}`)
    }
    continue;
   }
   const accepted=[...SOURCE[key],...Object.values(L).map(l=>l[key])].map(norm);
   if(!accepted.includes(current)){QA.unknownSource.push(key+':SOURCE_CHANGED');continue}
   if(s){write(SEL[key],L[s][key]);QA.appliedGroups++}
   else if(Object.values(L).some(l=>norm(l[key])===current))write(SEL[key],SOURCE[key][0]);
  }
 }finally{applying=false}
}
function schedule(){if(pending)return;pending=true;setTimeout(()=>{pending=false;apply()},65)}
function init(){
 const select=get('p19-language');if(!select)return;
 apply();select.addEventListener('change',()=>{schedule();setTimeout(schedule,260);setTimeout(schedule,850)});
 const ob=new MutationObserver(schedule);
 const detail=get('p19-detail');if(detail)ob.observe(detail,{childList:true,subtree:true,characterData:true,attributes:false});
 setTimeout(schedule,250);setTimeout(schedule,1100);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
