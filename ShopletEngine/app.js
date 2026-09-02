let DATA;
let META;
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
function bestLocale(){
 const saved=localStorage.getItem('shoplet-locale'); if(saved&&DATA.locales.some(x=>x.code===saved))return saved;
 const langs=navigator.languages||[navigator.language||'en-US'];
 for(const l of langs){const low=l.toLowerCase();let hit=DATA.locales.find(x=>x.code.toLowerCase()===low);if(hit)return hit.code;hit=DATA.locales.find(x=>x.code.split('-')[0].toLowerCase()===low.split('-')[0]);if(hit)return hit.code}
 return 'en-US';
}
function render(loc){
 localStorage.setItem('shoplet-locale',loc);
 const localeMeta=DATA.locales.find(x=>x.code===loc)||DATA.locales[0];
 document.documentElement.dir=localeMeta.rtl?'rtl':'ltr'; $('#lang').value=loc;
 const root=$('#apps');root.innerHTML='';
 for(const app of DATA.apps){
   const shots=(DATA.screenshots[app.key]&&DATA.screenshots[app.key][loc])||DATA.screenshots[app.key]['en-US']||[];
   const videoSet=DATA.videos[app.key]||{};
   const videoSrc=(typeof videoSet==='string')?videoSet:(videoSet[loc]||videoSet['en-US']||Object.values(videoSet)[0]||'');
   const metaLocales=(META.apps[app.key]&&META.apps[app.key].locales)||{};
   const meta=metaLocales[loc]||metaLocales['en-US']||Object.values(metaLocales)[0]||{};
   const displayName=meta.name||app.name||app.key;
   const subtitle=meta.subtitle||app.tag||'';
   const promo=meta.promotionalText||'';
   const description=meta.description||'';
   const supportURL=meta.supportURL||'#';
   const privacyURL=meta.privacyPolicyURL||'#';
   const el=document.createElement('section');el.className='app';
   el.innerHTML=`<div class="head"><img src="assets/${app.key}/icon.webp" alt=""><div class="copy"><h2>${esc(displayName)}</h2><p class="subtitle">${esc(subtitle)}</p>${promo?`<p class="promo">${esc(promo)}</p>`:''}</div><div class="actions"><a class="btn" href="https://apps.apple.com/app/id${app.id}" target="_blank" rel="noopener">App Store ↗</a></div></div><div class="media"><video controls playsinline preload="metadata" src="${videoSrc}"></video><div class="shots">${shots.map((s,i)=>`<img loading="lazy" src="${s}" alt="${esc(displayName)} screenshot ${i+1}">`).join('')}</div></div><div class="meta-links">${description?`<details><summary>More</summary><p class="description">${esc(description)}</p></details>`:''}<div class="secondary-links"><a href="${supportURL}" target="_blank" rel="noopener">Support</a><a href="${privacyURL}" target="_blank" rel="noopener">Privacy</a></div></div>`;
   root.appendChild(el);
 }
}
Promise.all([
 fetch('data.json').then(r=>r.json()),
 fetch('metadata.json').then(r=>r.json())
]).then(([d,m])=>{
 DATA=d;
 META=m;
 const sel=$('#lang');
 for(const l of DATA.locales){const o=document.createElement('option');o.value=l.code;o.textContent=l.label;sel.appendChild(o)}
 sel.addEventListener('change',()=>render(sel.value));
 render(bestLocale());
});
