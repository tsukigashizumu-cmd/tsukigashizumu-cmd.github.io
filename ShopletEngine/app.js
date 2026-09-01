let DATA;
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
 const meta=DATA.locales.find(x=>x.code===loc)||DATA.locales[0];
 document.documentElement.dir=meta.rtl?'rtl':'ltr'; $('#lang').value=loc;
 const root=$('#apps');root.innerHTML='';
 for(const app of DATA.apps){
   const shots=(DATA.screenshots[app.key]&&DATA.screenshots[app.key][loc])||DATA.screenshots[app.key]['en-US']||[];
   const el=document.createElement('section');el.className='app';
   el.innerHTML=`<div class="head"><img src="assets/${app.key}/icon.webp" alt=""><div><h2>${esc(app.name)}</h2><p>${esc(app.tag)}</p></div><div class="actions"><a class="btn" href="https://apps.apple.com/app/id${app.id}" target="_blank" rel="noopener">App Store ↗</a></div></div><div class="media"><video controls playsinline preload="metadata" src="${DATA.videos[app.key]}"></video><div class="shots">${shots.map((s,i)=>`<img loading="lazy" src="${s}" alt="${esc(app.name)} screenshot ${i+1}">`).join('')}</div></div>`;
   root.appendChild(el);
 }
}
fetch('data.json').then(r=>r.json()).then(d=>{DATA=d;const sel=$('#lang');for(const l of DATA.locales){const o=document.createElement('option');o.value=l.code;o.textContent=l.label;sel.appendChild(o)}sel.addEventListener('change',()=>render(sel.value));render(bestLocale());});
