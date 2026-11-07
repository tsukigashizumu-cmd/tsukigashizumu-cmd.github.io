/* R39R6P21R6 — PuddingScoop es-MX/es-ES editorial display only.
 * App Store English metadata, the 17 approved gallery assets, other locales,
 * and all site source data remain unchanged. This script rewrites only
 * displayed PuddingScoop editorial DOM elements. No network/file writes.
 */
(() => {
  'use strict';
  const APP_ID = '6763169050';
  if (!/^\/next\/apps\/6763169050\/?$/.test(location.pathname)) return;
  if (document.body?.dataset.p199Id !== APP_ID) return;
  const SOURCE={"overview":"Pudding is a simple mini game where you scoop pudding little by little with a drag gesture.","features":["The rules are easy.\nKeep scooping to raise your score, then pull back before the caramel appears.","Maybe you can go a little further.\nBut the next scoop might end it.","Enjoy that small push-your-luck moment in short, quick sessions."],"full":"Pudding is a simple mini game where you scoop pudding little by little with a drag gesture.The rules are easy.\nKeep scooping to raise your score, then pull back before the caramel appears.Maybe you can go a little further.\nBut the next scoop might end it.Enjoy that small push-your-luck moment in short, quick sessions.Aim for a new high score, or play it like a tiny daily test of luck.\nThere are no complicated controls, so it is easy to play during a short break.You can also check your play history and try to beat your past records.Ads have been removed so the flow of play is easier to enjoy.\nIf you like the app, you can support development through the coffee item.","heroLead":"PuddingScoop","heroIntro":{"es-MX":"Arrastra para sacar cucharadas de pudín y ganar puntos, pero detente antes de que aparezca el caramelo.","es-ES":"Arrastra para sacar cucharadas de pudin y sumar puntos, pero detente antes de que aparezca el caramelo."}};
  const LOCALIZED={"es-MX":{"overview":"PuddingScoop es un minijuego sencillo en el que vas sacando cucharadas de pudín poco a poco con un gesto de arrastre.","features":["Las reglas son fáciles. Sigue sacando cucharadas para aumentar tu puntuación, pero detente antes de que aparezca el caramelo.","Quizá puedas avanzar un poco más. Pero la siguiente cucharada podría terminar la partida.","Disfruta de ese pequeño momento de tentar a la suerte en partidas cortas y rápidas."],"full":"El pudín es un minijuego sencillo en el que vas sacando cucharadas poco a poco con un gesto de arrastre.\n\nLas reglas son fáciles. Sigue sacando cucharadas para aumentar tu puntuación y detente antes de que aparezca el caramelo.\n\nQuizá puedas avanzar un poco más. Pero la siguiente cucharada podría terminar la partida.\n\nDisfruta de ese pequeño momento de tentar a la suerte en partidas cortas y rápidas. Intenta conseguir un nuevo récord o juega como si fuera una pequeña prueba de suerte de cada día.\n\nNo hay controles complicados, así que es fácil jugar durante un descanso breve. También puedes consultar tu historial de partidas e intentar superar tus marcas anteriores.\n\nSe eliminaron los anuncios para que puedas disfrutar mejor del ritmo del juego.\n\nSi te gusta la app, puedes apoyar su desarrollo a través del artículo de café.","notice":"Traducción editorial al español de la descripción mostrada originalmente en inglés. Consulta la App Store para ver el texto oficial."},"es-ES":{"overview":"PuddingScoop es un minijuego sencillo en el que vas sacando cucharadas de pudin poco a poco mediante un gesto de arrastre.","features":["Las reglas son sencillas. Sigue sacando cucharadas para sumar puntos, pero detente antes de que aparezca el caramelo.","Puede que consigas llegar un poco más lejos. Pero la siguiente cucharada podría acabar con la partida.","Disfruta de ese instante de tentar a la suerte en partidas breves y rápidas."],"full":"El pudin es un minijuego sencillo en el que vas sacando cucharadas poco a poco mediante un gesto de arrastre.\n\nLas reglas son sencillas. Sigue sacando cucharadas para aumentar tu puntuación y detente antes de que aparezca el caramelo.\n\nPuede que consigas llegar un poco más lejos. Pero la siguiente cucharada podría acabar con la partida.\n\nDisfruta de ese instante de tentar a la suerte en partidas breves y rápidas. Intenta conseguir una nueva puntuación máxima o juega como si fuera una pequeña prueba de suerte diaria.\n\nNo hay controles complicados, así que es fácil jugar durante un breve descanso. También puedes consultar tu historial de partidas e intentar superar tus marcas anteriores.\n\nSe han eliminado los anuncios para disfrutar mejor del ritmo del juego.\n\nSi te gusta la aplicación, puedes apoyar su desarrollo mediante el artículo de café.","notice":"Traducción editorial al español de la descripción mostrada originalmente en inglés. Consulta la App Store para consultar el texto oficial."}};
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
  const result={revision:'R39R6P21R6',appId:APP_ID,locale:null,appliedFields:0,
    unknownSource:[],sourceEnglishObserved:false,sourceDescriptionProtected:true,
    descriptionIsEditorialTranslation:false};
  Object.defineProperty(window,'__r21r6PuddingCopyQA',{configurable:false,
    get:()=>({...result,unknownSource:result.unknownSource.slice()})});
  let updating=false,scheduled=false;
  function noticeElement(){
    let note=document.getElementById('r21r6-editorial-source');
    if(!note){
      const anchor=document.querySelector('#p199-full-caption');
      if(!anchor)return null;
      note=document.createElement('p');note.id='r21r6-editorial-source';
      note.className='p199-caption';note.setAttribute('data-r21r6-generated','1');
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
      const note=document.getElementById('r21r6-editorial-source');
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
