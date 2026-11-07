/* R39R6P21R7 — ClipPorter es-MX/es-ES editorial display only.
 * App Store English metadata, the 17 approved gallery assets, other locales,
 * and all site source data remain unchanged. This script rewrites only
 * displayed ClipPorter editorial DOM elements. No network/file writes.
 */
(() => {
  'use strict';
  const APP_ID = '6787928513';
  if (!/^\/next\/apps\/6787928513\/?$/.test(location.pathname)) return;
  if (document.body?.dataset.p199Id !== APP_ID) return;
  const SOURCE={"overview":"App Preview MP4 is a focused macOS utility for preparing App Store app preview videos.","features":["Import a MOV or MP4 recording, choose the start and end points, check the selected range, choose an output size, and create an MP4 that is ready to upload.","The app helps keep preview videos within the required 15 to 30 second duration. If a video is too short, the last image can be held for up to 15 seconds. If a video is too long, it can be shortened to 30 seconds.","Prepared output sizes make it easier to create preview videos for iPhone and iPad in portrait or landscape orientation. Custom sizes are also available when you need direct control."],"full":"App Preview MP4 is a focused macOS utility for preparing App Store app preview videos.Import a MOV or MP4 recording, choose the start and end points, check the selected range, choose an output size, and create an MP4 that is ready to upload.The app helps keep preview videos within the required 15 to 30 second duration. If a video is too short, the last image can be held for up to 15 seconds. If a video is too long, it can be shortened to 30 seconds.Prepared output sizes make it easier to create preview videos for iPhone and iPad in portrait or landscape orientation. Custom sizes are also available when you need direct control.Recordings can be imported with the file picker or by drag and drop. The app can also save copies of original files from Simulator or other temporary drag sources.It is designed for developers who already have a Simulator, QuickTime, or screen recording and want to reduce video upload errors in App Store Connect.All processing happens locally on your Mac. No account, server, cloud upload, analytics, or AI service is required.","heroLead":"App Preview MP4","heroIntro":{"es-MX":"Recorta grabaciones en tu Mac y exporta videos MP4 para las vistas previas de apps en App Store.","es-ES":"Recorta grabaciones en tu Mac y exporta vídeos MP4 para las vistas previas del App Store."}};
  const LOCALIZED={"es-MX":{"overview":"App Preview MP4 es una herramienta especializada para macOS que ayuda a preparar videos de vista previa de apps para App Store.","features":["Importa una grabación MOV o MP4, elige los puntos de inicio y fin, revisa el fragmento seleccionado, selecciona el tamaño de salida y crea un MP4 listo para subir.","La app ayuda a que los videos de vista previa tengan la duración requerida de 15 a 30 segundos. Si un video es demasiado corto, puedes mantener el último fotograma hasta por 15 segundos. Si es demasiado largo, puedes recortarlo a 30 segundos.","Los tamaños de salida predefinidos facilitan la creación de videos de vista previa para iPhone y iPad en orientación vertical u horizontal. También puedes usar tamaños personalizados cuando necesites un control directo."],"full":"App Preview MP4 es una herramienta especializada para macOS que ayuda a preparar videos de vista previa de apps para App Store.\n\nImporta una grabación MOV o MP4, elige los puntos de inicio y fin, revisa el fragmento seleccionado, selecciona el tamaño de salida y crea un MP4 listo para subir.\n\nLa app ayuda a que los videos de vista previa tengan la duración requerida de 15 a 30 segundos. Si un video es demasiado corto, puedes mantener el último fotograma hasta por 15 segundos. Si es demasiado largo, puedes recortarlo a 30 segundos.\n\nLos tamaños de salida predefinidos facilitan la creación de videos de vista previa para iPhone y iPad en orientación vertical u horizontal. También puedes usar tamaños personalizados cuando necesites un control directo.\n\nPuedes importar grabaciones con el selector de archivos o arrastrándolas y soltándolas. La app también puede guardar copias de los archivos originales provenientes de Simulator u otras fuentes temporales de arrastrar y soltar.\n\nEstá pensada para desarrolladores que ya tienen una grabación de Simulator, QuickTime o la pantalla y quieren reducir los errores al subir videos a App Store Connect.\n\nTodo el procesamiento se realiza de forma local en tu Mac. No necesitas una cuenta, un servidor, subir archivos a la nube, herramientas de análisis ni servicios de inteligencia artificial.","notice":"Traducción editorial al español de la descripción mostrada originalmente en inglés. Consulta la App Store para ver el texto oficial."},"es-ES":{"overview":"App Preview MP4 es una utilidad especializada para macOS que ayuda a preparar vídeos de vista previa de aplicaciones para el App Store.","features":["Importa una grabación MOV o MP4, elige los puntos de inicio y final, revisa el tramo seleccionado, escoge el tamaño de salida y crea un MP4 listo para subir.","La aplicación ayuda a mantener los vídeos de vista previa dentro de la duración requerida de 15 a 30 segundos. Si el vídeo es demasiado corto, puedes mantener el último fotograma hasta 15 segundos. Si es demasiado largo, puedes acortarlo a 30 segundos.","Los tamaños de salida predefinidos facilitan crear vídeos de vista previa para iPhone y iPad en orientación vertical u horizontal. También puedes utilizar tamaños personalizados cuando necesites un control preciso."],"full":"App Preview MP4 es una utilidad especializada para macOS que ayuda a preparar vídeos de vista previa de aplicaciones para el App Store.\n\nImporta una grabación MOV o MP4, elige los puntos de inicio y final, revisa el tramo seleccionado, escoge el tamaño de salida y crea un MP4 listo para subir.\n\nLa aplicación ayuda a mantener los vídeos de vista previa dentro de la duración requerida de 15 a 30 segundos. Si el vídeo es demasiado corto, puedes mantener el último fotograma hasta 15 segundos. Si es demasiado largo, puedes acortarlo a 30 segundos.\n\nLos tamaños de salida predefinidos facilitan crear vídeos de vista previa para iPhone y iPad en orientación vertical u horizontal. También puedes utilizar tamaños personalizados cuando necesites un control preciso.\n\nPuedes importar grabaciones con el selector de archivos o arrastrándolas y soltándolas. La aplicación también puede guardar copias de los archivos originales procedentes de Simulator o de otras fuentes temporales de arrastrar y soltar.\n\nEstá pensada para desarrolladores que ya disponen de una grabación de Simulator, QuickTime o la pantalla y quieren reducir los errores al subir vídeos a App Store Connect.\n\nTodo el procesamiento se realiza de forma local en tu Mac. No necesitas ninguna cuenta, servidor, subida a la nube, herramienta de análisis ni servicio de inteligencia artificial.","notice":"Traducción editorial al español de la descripción mostrada originalmente en inglés. Consulta la App Store para consultar el texto oficial."}};
  const canon = s => String(s||'').normalize('NFC').replace(/\s+/gu,' ').trim();
  const ok = (text,field) => {
    const allowed=[SOURCE[field],LOCALIZED['es-MX'][field],LOCALIZED['es-ES'][field]];
    return allowed.some(t=>canon(t)===canon(text));
  };
  const select=document.getElementById('p199-language');
  const chosen=()=> {
    const s=String(select?.value||new URLSearchParams(location.search).get('language')||'');
    return s==='es-MX'||s==='es-ES'?s:null;
  };
  const result={revision:'R39R6P21R7',appId:APP_ID,locale:null,appliedFields:0,
    unknownSource:[],sourceEnglishObserved:false,sourceDescriptionProtected:true,
    descriptionIsEditorialTranslation:false};
  Object.defineProperty(window,'__r21r7ClipPorterCopyQA',{configurable:false,
    get:()=>({...result,unknownSource:result.unknownSource.slice()})});
  let updating=false,scheduled=false;
  function noticeElement(){
    let note=document.getElementById('r21r7-editorial-source');
    if(!note){
      const anchor=document.querySelector('#p199-full-caption');
      if(!anchor)return null;
      note=document.createElement('p');note.id='r21r7-editorial-source';
      note.className='p199-caption';note.setAttribute('data-r21r7-generated','1');
      anchor.insertAdjacentElement('afterend',note);
    }
    return note;
  }
  function write(node,value,source,field){
    if(!node)return false;
    const now=canon(node.textContent);
    const accepted=[source,LOCALIZED['es-MX'][field],LOCALIZED['es-ES'][field]];
    if(!accepted.some(x=>canon(x)===now)){
      if(now&&!result.unknownSource.includes(field))result.unknownSource.push(field);
      return false;
    }
    if(canon(node.textContent)!==canon(value))node.textContent=value;
    return true;
  }
  function apply(){
    if(updating)return;updating=true;
    try{
      const lang=chosen();result.locale=lang;result.appliedFields=0;
      result.unknownSource=[];
      const full=document.querySelector('#p199-full');
      if(full&&canon(full.textContent)===canon(SOURCE.full))result.sourceEnglishObserved=true;
      const note=document.getElementById('r21r7-editorial-source');
      if(!lang){
        // Only if switching back to en-US from a known Spanish editorial value,
        // restore the archived English source. For ja/de/ar or unknown source
        // strings, the native app-story renderer owns the display exclusively.
        if(select?.value==='en-US'){
          const restore=(node,original,spanishValues)=>{
            if(!node)return;
            const current=canon(node.textContent);
            if(spanishValues.some(value=>canon(value)===current))node.textContent=original;
          };
          restore(document.querySelector('#p199-section-lead'),SOURCE.overview,
            [LOCALIZED['es-MX'].overview,LOCALIZED['es-ES'].overview]);
          const points=Array.from(document.querySelectorAll('#p199-points .p199-point > p'));
          if(points.length===3)points.forEach((node,i)=>restore(node,SOURCE.features[i],
            [LOCALIZED['es-MX'].features[i],LOCALIZED['es-ES'].features[i]]));
          restore(full,SOURCE.full,[LOCALIZED['es-MX'].full,LOCALIZED['es-ES'].full]);
        }
        if(note)note.hidden=true;
        result.descriptionIsEditorialTranslation=false;
        return;
      }
      const t=LOCALIZED[lang];
      if(write(document.querySelector('#p199-section-lead'),t.overview,SOURCE.overview,'overview'))result.appliedFields++;
      const rows=Array.from(document.querySelectorAll('#p199-points .p199-point > p'));
      if(rows.length===3){
        rows.forEach((row,i)=>{
          const allowed=[SOURCE.features[i],LOCALIZED['es-MX'].features[i],LOCALIZED['es-ES'].features[i]];
          const cur=canon(row.textContent);
          if(allowed.some(s=>canon(s)===cur)){
            if(cur!==canon(t.features[i]))row.textContent=t.features[i];
            result.appliedFields++;
          }else if(cur&&!result.unknownSource.includes('feature'+(i+1)))result.unknownSource.push('feature'+(i+1));
        });
      }else if(rows.length)result.unknownSource.push('featureCount='+rows.length);
      if(full){
        const cur=canon(full.textContent);
        const allowed=[SOURCE.full,LOCALIZED['es-MX'].full,LOCALIZED['es-ES'].full];
        if(allowed.some(s=>canon(s)===cur)){
          if(cur!==canon(t.full))full.textContent=t.full;
          result.appliedFields++;
          result.descriptionIsEditorialTranslation=true;
        }else if(cur)result.unknownSource.push('full_description');
      }
      if(result.descriptionIsEditorialTranslation){
        const n=noticeElement();if(n){n.textContent=t.notice;n.hidden=false;}
      }
      // #p199-lead, #p199-intro, original App Store data source and
      // the existing fallback notice are intentionally untouched.
    }finally{updating=false;}
  }
  function schedule(){if(scheduled)return;scheduled=true;setTimeout(()=>{scheduled=false;apply();},40);}
  function init(){
    if(!select)return;
    apply();
    select.addEventListener('change',()=>{schedule();setTimeout(schedule,180);setTimeout(schedule,700);});
    const observer=new MutationObserver(schedule);
    for(const s of ['#p199-section-lead','#p199-points','#p199-full']){
      const node=document.querySelector(s);if(node)observer.observe(node,{childList:true,subtree:true,characterData:true});
    }
    setTimeout(schedule,260);setTimeout(schedule,950);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
