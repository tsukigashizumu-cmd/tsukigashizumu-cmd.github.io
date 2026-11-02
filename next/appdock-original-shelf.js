/* APPDOCK_ORIGINAL_SHELF_P19_8D: editorial presentation, unchanged published-only nomination rule. */
(function () {
  'use strict';
  const appID = value => typeof value === 'string' && /^[1-9][0-9]{5,19}$/.test(value);
  const safeText = value => typeof value === 'string' ? value.trim() : '';
  const getJSON = async (path, cache='no-store') => {
    const r = await fetch(path, {cache, credentials:'omit'});
    if (!r.ok) throw new Error('Missing LP feed: ' + path);
    return r.json();
  };
  const artwork = value => {
    if (typeof value !== 'string') return '';
    try {
      const u = new URL(value);
      if (u.protocol !== 'https:' || u.username || u.password || u.port ||
          (u.hostname !== 'mzstatic.com' && !u.hostname.endsWith('.mzstatic.com'))) return '';
      return u.href;
    } catch (_) { return ''; }
  };
  function node(tag, className, text) {
    const el=document.createElement(tag);
    if(className) el.className=className;
    if(text!==undefined)el.textContent=text;
    return el;
  }
  // The storefront selector is owned by app.js. Read only its validated country.
  // Links never change product IDs or their GA4 measurement attributes.
  let shelfCountry='us';
  function validCountry(value){return typeof value==='string' && /^[a-z]{2}$/.test(value);}
  function selectedCountry(){
    const selector=document.getElementById('tsz-storefront-select');
    return (selector && validCountry(selector.value)) ? selector.value : shelfCountry;
  }
  function linkTo(id){return 'https://apps.apple.com/'+selectedCountry()+'/app/id'+id;}
  function markedAnchor(id, className){
    const a=node('a',className);
    a.href=linkTo(id);a.target='_blank';a.rel='noopener noreferrer';
    a.dataset.tszAppId=id;a.dataset.tszAppSlug='app_'+id;a.dataset.tszOfferType='unknown';
    return a;
  }
  function createIcon(item){
    const icon=node('span','p198d-icon');
    if(item.icon){const img=document.createElement('img');img.src=item.icon;img.alt='';img.loading='lazy';img.decoding='async';img.width=56;img.height=56;img.addEventListener('error',()=>{icon.replaceChildren(document.createTextNode(item.title.trim().slice(0,1).toLocaleUpperCase()));},{once:true});icon.appendChild(img);}
    else icon.textContent=item.title.trim().slice(0,1).toLocaleUpperCase();
    return icon;
  }
  const init=async()=>{
    const shelf=document.getElementById('appdock-original-shelf');
    const list=document.getElementById('appdock-original-items');
    if(!shelf || !list)return;
    try {
      const [recommendations,candidates]=await Promise.all([
        getJSON('./appdock_original_nominations.json'),
        getJSON('./published_candidates.json')
      ]);
      if(recommendations?.schemaVersion!==1 || !Array.isArray(recommendations.items) ||
          !Array.isArray(candidates))throw Error('Bad recommendation feed');
      const published=new Map();
      for(const c of candidates){
        if(!appID(c.appleID) || c.appDockReleaseStatus!=='published' ||
           c.rollout!=='PUBLISHED_CANDIDATE' || !Array.isArray(c.issues) || c.issues.length)continue;
        if(published.has(c.appleID))throw Error('Duplicate published app');
        published.set(c.appleID,c);
      }
      const seen=new Set();const cards=[];
      for(const n of recommendations.items){
        if(!appID(n.appID) || n.requestedListing!=='original_candidate' ||
           typeof n.reason!=='string' || n.reason.length>300 || seen.has(n.appID))throw Error('Invalid nomination');
        seen.add(n.appID);
        const c=published.get(n.appID);if(!c)continue;
        const title=safeText(c.displayName)||safeText(c.codeName);if(!title)continue;
        cards.push({id:n.appID,title,reason:safeText(n.reason),category:'',icon:''});
      }
      if(!cards.length)return;
      cards.sort((a,b)=>a.id.localeCompare(b.id));
      // Optional decorative metadata ONLY. Never source price, link availability, or publication from this file.
      try {
        const catalog=await getJSON('./data/apps.json','force-cache');
        if(catalog?.developerId===1817908735 && Array.isArray(catalog.apps) && catalog.apps.length===34){
          const byId=new Map(catalog.apps.map(x=>[String(x.id),x]));
          for(const c of cards){
            const a=byId.get(c.id);if(!a)continue;
            c.icon=artwork(a.artworkUrl);c.category=safeText(a.category);
          }
        }
      }catch(_){/* No image is a valid quiet fallback. */}
      const draw=()=>{
        const ja=((window.TSZ_I18N && window.TSZ_I18N.locale) || document.documentElement.lang || navigator.language || '').toLowerCase().startsWith('ja');
        const heading=document.getElementById('appdock-original-title');
        const subtitle=document.getElementById('appdock-original-subtitle');
        if(heading)heading.textContent=ja?'ちょっと変わった、でも役に立つ道具たち':'Small tools with a different perspective';
        if(subtitle)subtitle.textContent=ja?'独自の着眼点から作ったアプリ。ひとつずつ、使い道を探してみてください。':'Independent tools, each with its own point of view. Discover them one by one.';
        const wrap=node('div','p198d-layout');
        const titleRow=node('div','p198d-top');
        titleRow.append(node('span','p198d-kicker','STUDIO SELECTION / '+String(cards.length).padStart(2,'0')));
        titleRow.append(node('span','p198d-count',String(cards.length).padStart(2,'0')+' '+(ja?'本のアプリ':'APPS')));
        wrap.append(titleRow);
        const leads=node('div','p198d-feature-grid');
        for(const [i,item] of cards.slice(0,3).entries()){
          const a=markedAnchor(item.id,'p198d-feature');
          const top=node('div','p198d-feature-top');
          top.append(node('span','p198d-serial',String(i+1).padStart(2,'0')));
          top.append(node('span','p198d-open','↗'));
          const identity=node('div','p198d-identity');
          identity.append(createIcon(item));
          const copy=node('div','p198d-feature-copy');
          if(item.category)copy.append(node('span','p198d-category',item.category));
          copy.append(node('h3','p198d-name',item.title));
          if(item.reason)copy.append(node('p','p198d-reason',item.reason));
          identity.append(copy);
          const foot=node('div','p198d-feature-foot',ja?'App Storeで見る':'View on App Store');
          a.append(top,identity,foot);leads.append(a);
        }
        wrap.append(leads);
        if(cards.length>3){
          const more=document.createElement('details');more.className='p198d-more';
          const summary=node('summary','p198d-more-trigger');
          const rest=cards.length-3;
          summary.append(node('span','p198d-more-label',ja?`ほかの${rest}本を見る`:`Explore ${rest} more tools`));
          summary.append(node('span','p198d-chevron','⌄'));
          more.append(summary);
          const rows=node('div','p198d-more-grid');
          for(const [i,item] of cards.slice(3).entries()){
            const a=markedAnchor(item.id,'p198d-row');
            a.append(node('span','p198d-row-no',String(i+4).padStart(2,'0')));
            a.append(createIcon(item));
            const info=node('span','p198d-row-name');
            info.append(node('strong','',item.title));
            if(item.category)info.append(node('span','',item.category));
            a.append(info,node('span','p198d-row-arrow','↗'));
            rows.append(a);
          }
          more.append(rows);wrap.append(more);
        }
        list.replaceChildren(wrap);shelf.hidden=false;
      };
      // Keep links current without rebuilding open detail panels or editing
      // the owner nomination data. Country and language are independent.
      const updateStoreLinks=()=>{
        const chosen=selectedCountry();
        for(const a of list.querySelectorAll('a[data-tsz-app-id]')){
          const id=a.dataset.tszAppId;
          if(appID(id))a.href='https://apps.apple.com/'+chosen+'/app/id'+id;
        }
      };
      document.addEventListener('tsz-storefront-changed',event=>{
        const country=event?.detail?.country;
        if(validCountry(country)){
          shelfCountry=country;
          updateStoreLinks();
        }
      });
      draw();
      document.addEventListener('tsz-locale-changed',draw);
      // Listen only for the language value; never observe the shelf's children.
      if(typeof MutationObserver!=='undefined'){
        let lastLang=document.documentElement.lang;
        new MutationObserver(()=>{
          const current=document.documentElement.lang;
          if(current!==lastLang){lastLang=current;draw();}
        }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
      }
    }catch(error){
      console.warn('AppDock original shelf unavailable:',error.message);
      shelf.hidden=true;
    }
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
