/* R39R6P21R5 — Hitotsubu editorial copy only (es-MX / es-ES).
 * Source-locked to the approved English Hitotsubu text; does not alter the
 * separately sourced App Store full description, gallery, imagery or video.
 * Loaded solely by the Hitotsubu app page. No external I/O.
 */
(() => {
  'use strict';
  const APP_ID = '6794575766';
  if (!/^\/next\/apps\/6794575766\/?$/.test(location.pathname)) return;
  if (document.body?.dataset.p199Id !== APP_ID) return;

  const source = {
    heroLead: 'Keep one small moment from today.',
    heroIntro: 'Something good, a little help, or simply getting through the day. Save a grain with a tap and watch your collection grow.',
    overviewLead: 'Save small moments and feelings as grains with a single tap. Grains fill jars; jars become crates, then larger stores of the time you have lived.',
    features: [
      'Mark a moment worth remembering with a tap. No long journal entry is needed.',
      'Grains gather in jars, then in crates, containers, and eventually a warehouse.',
      'Saved grains cannot be edited or deleted. Each one stays as part of the day you lived.'
    ]
  };
  const localized = {
    'es-MX': {
      heroLead: 'Guarda un pequeño momento de hoy.',
      heroIntro: 'Algo bueno, una pequeña ayuda o simplemente haber llegado al final del día. Guarda un grano con un toque y mira cómo crece tu colección.',
      overviewLead: 'Guarda pequeños momentos y sentimientos como granos con un solo toque. Los granos se acumulan en botellas; las botellas pasan a cajas y, después, a depósitos cada vez más grandes del tiempo que has vivido.',
      features: [
        'Guarda con un toque un momento que quieras recordar. No necesitas escribir una entrada larga en un diario.',
        'Los granos se reúnen en botellas, luego en cajas de madera, contenedores y, finalmente, en un almacén.',
        'Los granos guardados no se pueden editar ni borrar. Cada uno permanece como parte del día que viviste.'
      ]
    },
    'es-ES': {
      heroLead: 'Conserva un pequeño momento de hoy.',
      heroIntro: 'Algo bueno, una pequeña ayuda o simplemente haber llegado al final del día. Guarda un grano con un toque y observa cómo crece tu colección.',
      overviewLead: 'Conserva pequeños momentos y emociones en forma de granos con un solo toque. Los granos se acumulan en botellas; las botellas pasan a cajas y, después, a espacios cada vez mayores donde guardar el tiempo vivido.',
      features: [
        'Conserva con un toque un momento que quieras recordar. No hace falta escribir una entrada larga en un diario.',
        'Los granos se acumulan en botellas, después en cajas de madera y contenedores, hasta llenar un almacén.',
        'Los granos guardados no se pueden editar ni eliminar. Cada uno permanece como parte del día que has vivido.'
      ]
    }
  };
  const approved = {
    heroLead: new Set([source.heroLead, localized['es-MX'].heroLead, localized['es-ES'].heroLead]),
    heroIntro: new Set([source.heroIntro, localized['es-MX'].heroIntro, localized['es-ES'].heroIntro]),
    overviewLead: new Set([source.overviewLead, localized['es-MX'].overviewLead, localized['es-ES'].overviewLead]),
    features: source.features.map((s,i) => new Set([s,localized['es-MX'].features[i],localized['es-ES'].features[i]]))
  };
  const select = document.getElementById('p199-language');
  const locale = () => {
    const v = String(select?.value || new URLSearchParams(location.search).get('language') || '');
    return v === 'es-MX' || v === 'es-ES' ? v : null;
  };
  let scheduled = false;
  let updating = false;
  let observer;
  const result = {appId:APP_ID,revision:'R39R6P21R5',lastLocale:null,lastFieldCount:0,unknownSource:[],descriptionTouched:false};
  Object.defineProperty(window,'__r21r5HitotsubuCopyQA',{configurable:false,get:()=>({
    ...result,unknownSource:result.unknownSource.slice()
  })});
  function replaceKnown(node,allowed,wanted,english,key) {
    if (!node) return false;
    const current = node.textContent.trim();
    if (!allowed.has(current)) {
      if (result.lastLocale && current && !result.unknownSource.includes(key)) result.unknownSource.push(key);
      return false;
    }
    const next = wanted === null ? english : wanted;
    if (current !== next) node.textContent = next;
    return true;
  }
  function apply() {
    if (updating) return;
    updating = true;
    try {
      result.unknownSource = [];
      result.lastLocale=locale();
      const copy = result.lastLocale ? localized[result.lastLocale] : null;
      const rows = [
        ['heroLead','#p199-lead'],['heroIntro','#p199-intro'],['overviewLead','#p199-section-lead']
      ];
      let valid = 0;
      for (const [key,selector] of rows) {
        const node = document.querySelector(selector);
        if (replaceKnown(node,approved[key],copy?.[key] ?? null,source[key],key)) valid++;
      }
      const points = Array.from(document.querySelectorAll('#p199-points .p199-point > p'));
      if (points.length === 3) {
        points.forEach((node,i)=>{
          if(replaceKnown(node,approved.features[i],copy?.features[i] ?? null,source.features[i],'feature'+(i+1)))valid++;
        });
      } else if (points.length) result.unknownSource.push('featureCount='+points.length);
      result.lastFieldCount=valid;
      // Never query or write #p199-full: its existing Spanish text comes from
      // a different App Store metadata source and must be byte-for-byte preserved.
    } finally {updating=false;}
  }
  function schedule() {
    if(scheduled) return;
    scheduled=true;
    setTimeout(()=>{scheduled=false;apply();},35);
  }
  function init(){
    if(!select) return;
    apply();
    select.addEventListener('change',()=>{schedule();setTimeout(schedule,180);setTimeout(schedule,700);});
    observer=new MutationObserver(schedule);
    for(const selector of ['#p199-lead','#p199-intro','#p199-section-lead','#p199-points']){
      const el=document.querySelector(selector);if(el)observer.observe(el,{childList:true,subtree:true,characterData:true});
    }
    setTimeout(schedule,250);setTimeout(schedule,900);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
