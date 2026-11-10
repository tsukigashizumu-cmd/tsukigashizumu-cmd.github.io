/* TSZ LP R92 | MealDrift - illustrative meal-picker; no persistence or network. */
(()=>{
  'use strict';
  const ID='tsz-mealdrift-r92';
  const TRANSLATIONS={
    ja:{kicker:'MEALDRIFT · 夕食の決断を預ける',title:'今日のごはん、もう迷わない。',intro:'食べてもいい候補だけを並べて、出やすさを決める。疲れた夜は「今日の一食」を選んでもらおう。',options:'食べたい候補',chance:'出やすさ',exclusion:'今日は除外',include:'候補に戻す',add:'候補を追加',placeholder:'例：冷蔵庫の残り物',pick:'今日の一食を決める',again:'もう一度選ぶ',reset:'最初に戻す',result:'今日の一食',empty:'まず候補を1つ以上有効にしてください。',ready:'まだ決めていません',picked:'今日は、これにしよう。',hint:'出やすさは「低・中・高」の3段階。候補から除外したものは選ばれません。',levels:['低','中','高'],sample:['冷蔵庫の残り物','パスタ','野菜炒め','おにぎり'],note:'これはLP用の説明デモです。実アプリの画面ではなく、候補はページを閉じると消えます。食事の履歴記録、月・季節設定、データ保存や送信は行いません。',limit:'候補は最大7件、名前は24文字まで。',none:'全ての候補を除外しています。'},
    en:{kicker:'MEALDRIFT · LET GO OF ONE DECISION',title:'Dinner, without another decision.',intro:'Keep only meals you would happily eat. Adjust how often they appear, then let the demo suggest one meal for tonight.',options:'Your meal options',chance:'Appearance',exclusion:'Skip today',include:'Include again',add:'Add meal',placeholder:'e.g. Leftovers',pick:'Choose tonight’s meal',again:'Choose again',reset:'Reset example',result:'Tonight’s choice',empty:'Include at least one meal to choose.',ready:'No meal chosen yet',picked:'This is what we’re having.',hint:'Three appearance levels: low, medium, high. Skipped options are never selected.',levels:['Low','Medium','High'],sample:['Leftovers','Pasta','Vegetable stir-fry','Rice bowl'],note:'Illustration only; not the real MealDrift interface. Entries disappear when the page is closed. No meal history, monthly settings, storage or network transmission.',limit:'Up to 7 meals, 24 characters each.',none:'All options are skipped.'},
    ar:{kicker:'MEALDRIFT · قرار أقل هذا المساء',title:'دع اختيار العشاء يصبح أسهل.',intro:'أضف وجبات ترضى بها وحدد احتمال ظهورها، ثم دع المثال يقترح وجبة واحدة لليوم.',options:'خيارات الوجبات',chance:'معدل الظهور',exclusion:'استبعاد اليوم',include:'إعادة إلى الخيارات',add:'إضافة وجبة',placeholder:'مثال: طعام متبقٍ',pick:'اختر وجبة اليوم',again:'اختر مرة أخرى',reset:'إعادة المثال',result:'اختيار اليوم',empty:'فعّل وجبة واحدة على الأقل.',ready:'لم يتم اختيار وجبة بعد',picked:'هذا ما سنتناوله اليوم.',hint:'ثلاثة مستويات للظهور: منخفض ومتوسط وعالٍ. الوجبات المستبعدة لا تُختار.',levels:['منخفض','متوسط','عالٍ'],sample:['بقايا الطعام','معكرونة','خضار مقلية','أرز'],note:'هذا مثال توضيحي وليس واجهة التطبيق الحقيقية. تختفي الخيارات عند إغلاق الصفحة. لا يسجل الوجبات أو المواسم ولا يحفظ أو يرسل البيانات.',limit:'سبع وجبات كحد أقصى، و24 حرفاً للاسم.',none:'تم استبعاد جميع الخيارات.'}
  };
  const language=()=>{const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en';};
  const mk=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
  function init(){
    if(document.getElementById(ID))return;
    const host=document.querySelector('main')||document.body;if(!host)return;
    const root=mk('section');root.id=ID;
    root.innerHTML='<div class="md92-panel"><header class="md92-head"><span class="md92-kicker" data-t="kicker"></span><h2 data-t="title"></h2><p data-t="intro"></p></header><div class="md92-grid"><div class="md92-left"><div class="md92-list-header"><h3 data-t="options"></h3><span class="md92-help" data-t="hint"></span></div><div id="md92-options" class="md92-options"></div><div class="md92-add"><label for="md92-new" data-t="add"></label><div class="md92-addrow"><input id="md92-new" type="text" maxlength="24" autocomplete="off"/><button type="button" id="md92-add-btn" data-t="add"></button></div><small data-t="limit"></small></div></div><div class="md92-right"><div class="md92-result" role="status" aria-live="polite"><span data-t="result"></span><div class="md92-choice" id="md92-choice"></div><p id="md92-feedback"></p></div><button type="button" class="md92-pick" id="md92-pick" data-t="pick"></button><button type="button" class="md92-reset" id="md92-reset" data-t="reset"></button><p class="md92-foot" data-t="note"></p></div></div></div>';
    host.appendChild(root);
    const $=id=>root.querySelector('#md92-'+id);
    const entries=[{key:0,w:3,skip:false},{key:1,w:2,skip:false},{key:2,w:1,skip:false},{key:3,w:2,skip:false}];
    let selected=null, chosenCount=0, warning='';
    const l10n=()=>TRANSLATIONS[language()];
    const mealName=(e)=> e.key===undefined ? e.name : l10n().sample[e.key];
    function render(){
      const lang=language(),t=l10n();root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      root.querySelectorAll('[data-t]').forEach(e=>{e.textContent=t[e.dataset.t]||'';});
      $('new').placeholder=t.placeholder;
      const list=$('options');list.replaceChildren();
      entries.forEach((item,index)=>{
        const card=mk('div','md92-meal'+(item.skip?' is-skipped':''));
        const label=mk('span','md92-name',mealName(item));
        const control=mk('div','md92-controls');
        const weight=mk('button','md92-weight',`${t.chance}: ${t.levels[item.w-1]}`);
        weight.type='button';weight.setAttribute('aria-label',`${mealName(item)} — ${t.chance}: ${t.levels[item.w-1]}`);
        weight.addEventListener('click',()=>{item.w=item.w%3+1;selected=null;warning='';render();});
        const skip=mk('button','md92-skip',item.skip?t.include:t.exclusion);skip.type='button';skip.setAttribute('aria-pressed',String(item.skip));
        skip.setAttribute('aria-label',`${mealName(item)} — ${item.skip?t.include:t.exclusion}`);
        skip.addEventListener('click',()=>{item.skip=!item.skip;selected=null;warning='';render();});
        control.append(weight,skip);card.append(label,control);list.appendChild(card);
      });
      $('choice').textContent=selected===null?t.ready:mealName(entries[selected]);
      $('choice').classList.toggle('has-choice',selected!==null);
      $('feedback').textContent=warning||(selected!==null?t.picked:'');
      $('pick').textContent=chosenCount?t.again:t.pick;
    }
    $('add-btn').addEventListener('click',()=>{
      const name=$('new').value.trim();if(!name){$('new').focus();return;}
      if(entries.length>=7){warning=l10n().limit;render();return;}
      entries.push({name:name.slice(0,24),w:2,skip:false});$('new').value='';selected=null;warning='';render();
    });
    $('new').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('add-btn').click();}});
    $('pick').addEventListener('click',()=>{
      const active=entries.map((e,i)=>({e,i})).filter(({e})=>!e.skip);
      const total=active.reduce((n,{e})=>n+e.w,0);
      if(!total){selected=null;warning=l10n().none;render();return;}
      let draw=Math.random()*total;let pick=active[active.length-1].i;
      for(const {e,i} of active){draw-=e.w;if(draw<0){pick=i;break;}}
      selected=pick;chosenCount++;warning='';render();
    });
    $('reset').addEventListener('click',()=>{entries.splice(0,entries.length,{key:0,w:3,skip:false},{key:1,w:2,skip:false},{key:2,w:1,skip:false},{key:3,w:2,skip:false});$('new').value='';selected=null;chosenCount=0;warning='';render();});
    new MutationObserver(ms=>{if(ms.some(m=>m.attributeName==='lang'))render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
