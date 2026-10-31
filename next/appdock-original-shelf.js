/* APPDOCK_ORIGINAL_SHELF_P12: derived display from AppDock's published candidates and nomination feed. */
(function () {
  'use strict';
  const appID = value => typeof value === 'string' && /^[1-9][0-9]{5,19}$/.test(value);
  const safeText = value => typeof value === 'string' ? value.trim() : '';
  const getJSON = async path => {
    const r = await fetch(path, {cache:'no-store', credentials:'omit'});
    if (!r.ok) throw new Error('Missing AppDock feed: ' + path);
    return r.json();
  };
  const init = async () => {
    const shelf = document.getElementById('appdock-original-shelf');
    const list = document.getElementById('appdock-original-items');
    if (!shelf || !list) return;
    try {
      const [recommendations, candidates] = await Promise.all([
        getJSON('./appdock_original_nominations.json'),
        getJSON('./published_candidates.json')
      ]);
      if (recommendations?.schemaVersion !== 1 || !Array.isArray(recommendations.items) || !Array.isArray(candidates)) throw Error('Bad feed');
      const published = new Map();
      for (const c of candidates) {
        if (!appID(c.appleID) || c.appDockReleaseStatus !== 'published' ||
            c.rollout !== 'PUBLISHED_CANDIDATE' || !Array.isArray(c.issues) || c.issues.length) continue;
        if (published.has(c.appleID)) throw Error('Duplicate published app');
        published.set(c.appleID,c);
      }
      const seen = new Set();
      const cards = [];
      for (const n of recommendations.items) {
        if (!appID(n.appID) || n.requestedListing !== 'original_candidate' ||
            typeof n.reason !== 'string' || n.reason.length > 300 || seen.has(n.appID)) throw Error('Invalid nomination');
        seen.add(n.appID);
        const c = published.get(n.appID);
        if (!c) continue; // Do not reveal or link to an unpublished app.
        const title = safeText(c.displayName) || safeText(c.codeName);
        if (!title) continue;
        cards.push({id:n.appID,title,reason:safeText(n.reason)});
      }
      if (!cards.length) return; // Empty shelf is a valid, quiet state.
      cards.sort((a,b)=>a.id.localeCompare(b.id));
      const draw = () => {
        const ja = ((window.TSZ_I18N && window.TSZ_I18N.locale) || document.documentElement.lang || navigator.language || '').toLowerCase().startsWith('ja');
        const heading = document.getElementById('appdock-original-title');
        const subtitle = document.getElementById('appdock-original-subtitle');
        if (heading) heading.textContent = ja ? 'ちょっと変わった、でも役に立つ道具たち' : 'Small tools with a different perspective';
        if (subtitle) subtitle.textContent = ja ? '独自の着眼点から作ったアプリ。用途が違っても、どれも小さな不便から。' : 'Different uses, shared curiosity about everyday problems.';
        list.replaceChildren();
        for (const item of cards) {
          const card = document.createElement('article'); card.className='appdock-original-card';
          const titleEl = document.createElement('h3'); titleEl.textContent=item.title;
          card.appendChild(titleEl);
          if (item.reason) { const p=document.createElement('p'); p.textContent=item.reason; card.appendChild(p); }
          const link=document.createElement('a'); link.textContent=ja?'App Storeで見る ↗':'View on the App Store ↗';
          link.href='https://apps.apple.com/us/app/id'+item.id;
          link.target='_blank'; link.rel='noopener noreferrer';
          link.dataset.tszAppId=item.id; link.dataset.tszAppSlug='app_'+item.id;
          link.dataset.tszOfferType='unknown'; // Never infer current price/free state.
          card.appendChild(link); list.appendChild(card);
        }
        shelf.hidden=false;
      };
      draw();
      document.addEventListener('tsz-locale-changed',draw);
      if (typeof MutationObserver !== 'undefined') new MutationObserver(draw).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    } catch (error) { // A broken feed must not damage existing catalog, prices, or GA4.
      console.warn('AppDock original shelf unavailable:', error.message);
      shelf.hidden=true;
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
