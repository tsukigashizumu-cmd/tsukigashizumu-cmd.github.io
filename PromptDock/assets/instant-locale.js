/* Pre-translated text replacement; no page reload and no translation requests. */
(function () {
  'use strict';
  var all=window.PD_LOCALES || {}, selector=document.getElementById('language-selector');
  if(!selector || !all.en) return;
  function activate(locale, addHistory){
    if(!Object.prototype.hasOwnProperty.call(all,locale)) return;
    var dict=all[locale];
    document.querySelectorAll('[data-i18n]').forEach(function(node){
      var key=node.getAttribute('data-i18n');
      if(typeof dict[key]==='string') node.textContent=dict[key];
    });
    document.documentElement.lang=locale;
    document.documentElement.dir=/^(ar|he|ur)$/.test(locale)?'rtl':'ltr';
    selector.value=locale;
    selector.setAttribute('aria-label',dict.localeLabel);
    var home=document.getElementById('brand-home');if(home)home.setAttribute('href','../'+locale+'/');
    document.title='PromptDock AI — '+dict.heroTitle;
    var meta=document.querySelector('meta[name="description"]');if(meta)meta.content=dict.heroLead;
    var canonical=document.querySelector('link[rel="canonical"]');
    var href='https://tsukigashizumu-cmd.github.io/PromptDock/'+locale+'/';
    if(canonical)canonical.href=href;
    if(addHistory && /^https?:$/.test(location.protocol)){
      var path=location.pathname.replace(/(\/PromptDock\/)[^/]+\/$/,'$1'+locale+'/');
      if(path!==location.pathname)history.pushState({locale:locale},'',path+location.search+location.hash);
    }
  }
  selector.addEventListener('change',function(){activate(selector.value,true);});
  window.addEventListener('popstate',function(){
    var m=location.pathname.match(/\/PromptDock\/([^/]+)\/$/);
    if(m && all[m[1]]) activate(m[1],false);
  });
}());
