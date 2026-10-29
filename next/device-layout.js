/* P9 four responsive presentations. No fingerprinting, tracking IDs or cookies.
   Layout follows viewport + available device hints. Measurement class is frozen
   for this page view, so resizing mid-visit does not mix rates across classes. */
(() => {
  'use strict';
  const CLASSES = Object.freeze(['iphone','ipad','pc-portrait','pc-landscape']);
  const query = new URLSearchParams(location.search);
  const localhost = ['127.0.0.1','localhost','[::1]'].includes(location.hostname);
  // Local QA only; never allow a query parameter to falsify production metrics.
  const override = localhost && CLASSES.includes(query.get('qaLayout')) ? query.get('qaLayout') : null;
  const detect = () => {
    if (override) return override;
    const ua = navigator.userAgent || '';
    const touchPoints = Number(navigator.maxTouchPoints || 0);
    const width = Math.max(1, document.documentElement.clientWidth || innerWidth);
    if (/iPhone|iPod/i.test(ua)) return 'iphone';
    if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && touchPoints > 1)) return 'ipad';
    const coarse = matchMedia('(pointer:coarse)').matches;
    if (coarse) return width <= 680 ? 'iphone' : 'ipad';
    return innerHeight > width ? 'pc-portrait' : 'pc-landscape';
  };
  const initial = detect();
  const set = () => {document.documentElement.dataset.deviceLayout = detect();};
  set();
  let pending = false;
  const update = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {pending = false;set();});
  };
  addEventListener('resize',update,{passive:true});
  addEventListener('orientationchange',update,{passive:true});
  window.TSZ_LAYOUT = Object.freeze({
    get current(){return document.documentElement.dataset.deviceLayout;},
    measurementClass: initial,
    classes: CLASSES
  });
})();
