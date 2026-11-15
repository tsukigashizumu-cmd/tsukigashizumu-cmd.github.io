/* TSZ LP R209 / Warranty Deadline Tracker. Fictional visual countdown; no storage, alerts or network. */
(() => {
  'use strict';
  if (!document.body || document.body.dataset.p199Id !== '6804757195') return;
  if (document.getElementById('tsz-warranty-r209')) return;
  const host = document.querySelector('main');
  if (!host) return;
  const root = document.createElement('section');
  root.id = 'tsz-warranty-r209';
  root.setAttribute('aria-labelledby', 'wr209-title');
  root.innerHTML = `
    <div class="wr209-hero">
      <div class="wr209-kicker"><span class="wr209-mark">◈</span> <span data-wr209="overline">A clearer view of your warranties</span><span class="wr209-demo-pill" data-wr209="demo">INTERACTIVE SAMPLE · NOT SAVED</span></div>
      <div class="wr209-heading-line"><div><p class="wr209-number">209 <span>/ WARRANTY DEADLINE</span></p>
        <h2 id="wr209-title"><span data-wr209="title1">The date isn't hidden.</span><em data-wr209="title2">It's just easy to forget.</em></h2>
        <p class="wr209-lead" data-wr209="lead">See what needs attention before an ordinary warranty quietly runs out.</p></div>
        <div class="wr209-selects"><label><span data-wr209="language">LANGUAGE</span><select id="wr209-language" aria-label="Demo language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label>
        <label><span data-wr209="region">APP STORE REGION</span><select id="wr209-country" aria-label="App Store region"><option value="us">US</option><option value="jp">JP</option></select></label></div></div>
      <div class="wr209-content"><div class="wr209-focus" id="wr209-focus">
        <div class="wr209-focus-top"><span data-wr209="nextUp">NEXT WARRANTY TO WATCH</span><span class="wr209-live"><span class="wr209-live-dot"></span><span data-wr209="relative">RELATIVE TO SELECTED DAY</span></span></div>
        <div class="wr209-focus-main"><span class="wr209-big-num" id="wr209-big-num">12</span><span class="wr209-big-label" id="wr209-big-label">DAYS LEFT</span></div>
        <div class="wr209-focus-item" id="wr209-focus-name">Camera</div>
        <p class="wr209-focus-note" id="wr209-focus-note" aria-live="polite">Only 12 days remain.</p>
        <div class="wr209-rule"></div>
        <div class="wr209-clock-top"><span data-wr209="moveTime">MOVE THE DEMO DATE</span><span id="wr209-current-date"></span></div>
        <div class="wr209-clock" id="wr209-clock" role="group" aria-label="Preview different dates"><button data-days="0" type="button" aria-pressed="true" data-wr209="today">TODAY</button><button data-days="14" type="button" aria-pressed="false" data-wr209="plus14">+14 DAYS</button><button data-days="60" type="button" aria-pressed="false" data-wr209="plus60">+60 DAYS</button></div>
      </div><div class="wr209-listpanel"><div class="wr209-list-head"><div><p class="wr209-serial">LIVE STATUS / 003</p><h3 data-wr209="listTitle">The deadlines in view.</h3></div><div class="wr209-filter" id="wr209-filter" role="group" aria-label="Warranty status filter"><button data-filter="all" aria-pressed="true" type="button" data-wr209="all">ALL</button><button data-filter="attention" aria-pressed="false" type="button" data-wr209="attention">ATTENTION</button></div></div>
        <div class="wr209-list" id="wr209-list" aria-live="polite"></div><p class="wr209-list-foot" id="wr209-summary">2 warranties need attention.</p>
      </div></div>
      <div class="wr209-bottom"><div><strong data-wr209="bottomTitle">A visible deadline beats a forgotten one.</strong><p data-wr209="bottomBody">Three fictional examples. No actual records, reminders or notifications are created here.</p></div><a id="wr209-store" href="https://apps.apple.com/us/app/id6804757195" target="_blank" rel="noopener noreferrer" data-wr209="store">View Warranty Deadline Tracker ↗</a></div>
    </div>`;
  host.insertBefore(root, host.firstChild);
  const $ = id => root.querySelector('#wr209-' + id);
  const translations = {
    en: {overline:'A clearer view of your warranties',demo:'INTERACTIVE SAMPLE · NOT SAVED',title1:"The date isn't hidden.",title2:"It's just easy to forget.",lead:'See what needs attention before an ordinary warranty quietly runs out.',language:'LANGUAGE',region:'APP STORE REGION',nextUp:'NEXT WARRANTY TO WATCH',relative:'RELATIVE TO SELECTED DAY',days:'DAYS LEFT',expiredDays:'DAYS EXPIRED',dueToday:'DUE TODAY',moveTime:'MOVE THE DEMO DATE',today:'TODAY',plus14:'+14 DAYS',plus60:'+60 DAYS',listTitle:'The deadlines in view.',all:'ALL',attention:'ATTENTION',bottomTitle:'A visible deadline beats a forgotten one.',bottomBody:'Three fictional examples. No actual records, reminders or notifications are created here.',store:'View Warranty Deadline Tracker ↗',soon:'SOON',expired:'EXPIRED',safe:'LATER',empty:'Nothing needs attention on this date.',focusNote:n=>n>0?`Only ${n} days remain.`:n===0?'The warranty ends today.':`${Math.abs(n)} days past the deadline.`,summary:n=>`${n} ${n===1?'warranty needs':'warranties need'} attention.`,items:['Camera','Headphones','Blender'],ariaItem:(name,n)=>`${name}, ${n===0?'ends today':n>0?`${n} days remaining`:`expired ${Math.abs(n)} days ago`}`},
    ja: {overline:'保証期限を、見える場所に。',demo:'操作できるサンプル · 保存なし',title1:'期限が消えたわけじゃない。',title2:'忘れやすいだけ。',lead:'何気ない保証期限が過ぎる前に、気にかけるべきものをひと目で。',language:'言語',region:'APP STORE地域',nextUp:'次に確認したい保証',relative:'選択した日付を基準に表示',days:'日後に終了',expiredDays:'日前に終了',dueToday:'今日まで',moveTime:'サンプルの日付を進める',today:'今日',plus14:'14日後',plus60:'60日後',listTitle:'保証期限を、一覧に。',all:'すべて',attention:'要確認',bottomTitle:'見える期限は、忘れにくい。',bottomBody:'架空の3件による操作例です。実際の記録保存・通知・リマインダーは行いません。',store:'App StoreでWarranty Deadline Trackerを見る ↗',soon:'まもなく',expired:'期限切れ',safe:'まだ先',empty:'この日付で確認が必要なものはありません。',focusNote:n=>n>0?`残り${n}日です。`:n===0?'保証期限は今日です。':`期限から${Math.abs(n)}日経過しています。`,summary:n=>`要確認の保証：${n}件`,items:['カメラ','ヘッドホン','ミキサー'],ariaItem:(name,n)=>`${name}、${n===0?'本日期限':n>0?`あと${n}日`:`${Math.abs(n)}日前に期限切れ`}`},
    ar: {overline:'اجعل مواعيد الضمان واضحة',demo:'مثال تفاعلي · بلا حفظ',title1:'التاريخ لم يختفِ.',title2:'لكن من السهل نسيانه.',lead:'اعرف ما يحتاج إلى انتباهك قبل أن تنتهي مدة الضمان دون أن تلاحظ.',language:'اللغة',region:'منطقة المتجر',nextUp:'الضمان التالي للمراجعة',relative:'بحسب اليوم المحدد',days:'يومًا متبقيًا',expiredDays:'يومًا منذ الانتهاء',dueToday:'ينتهي اليوم',moveTime:'حرّك تاريخ المثال',today:'اليوم',plus14:'بعد 14 يومًا',plus60:'بعد 60 يومًا',listTitle:'مواعيد الضمان أمامك.',all:'الكل',attention:'تحتاج انتباهًا',bottomTitle:'الموعد الواضح أصعب نسيانًا.',bottomBody:'ثلاثة أمثلة خيالية فقط. لا يتم حفظ سجلات أو إنشاء تنبيهات أو إشعارات.',store:'عرض Warranty Deadline Tracker في App Store ↗',soon:'قريبًا',expired:'منتهي',safe:'لاحقًا',empty:'لا توجد ضمانات تحتاج الانتباه في هذا التاريخ.',focusNote:n=>n>0?`باقي ${n} يومًا.`:n===0?'ينتهي الضمان اليوم.':`انتهى الضمان قبل ${Math.abs(n)} يومًا.`,summary:n=>`${n} ضمانات تحتاج الانتباه.`,items:['كاميرا','سماعات','خلاط'],ariaItem:(name,n)=>`${name}، ${n===0?'ينتهي اليوم':n>0?`متبقي ${n} يومًا`:`انتهى منذ ${Math.abs(n)} يومًا`}`}
  };
  const state = {lang:'en',region:'us',offset:0,filter:'all'};
  const items = [{i:0,base:12,icon:'◌'},{i:1,base:45,icon:'⌁'},{i:2,base:-6,icon:'◈'}];
  const localLang=$('language'),localRegion=$('country');
  const globalLang=document.getElementById('p199-language'),globalRegion=document.getElementById('p199-country');
  function lang(v){const s=String(v||'').toLowerCase();return s.startsWith('ja')?'ja':s.startsWith('ar')?'ar':'en';}
  function region(v){return String(v||'').toLowerCase()==='jp'?'jp':'us';}
  function hasOption(control, value){return !!control && Array.from(control.options).some(o=>o.value===value);}
  function matchOption(control, desired, mapper){if(!control)return null;return Array.from(control.options).find(o=>mapper(o.value)===desired)?.value || null;}
  if(globalLang && globalLang.selectedOptions.length && globalLang.value)state.lang=lang(globalLang.value);
  if(globalRegion && globalRegion.selectedOptions.length && globalRegion.value)state.region=region(globalRegion.value);
  function syncGlobal(control,wanted,mapper){const actual=matchOption(control,wanted,mapper);if(actual!==null&&control.value!==actual){control.value=actual;control.dispatchEvent(new Event('change',{bubbles:true}));}}
  function locale(){return state.lang==='ja'?'ja-JP':state.lang==='ar'?'ar':'en-US';}
  function todayUTC(){const d=new Date();return new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));}
  function demoDate(){return new Date(todayUTC().getTime()+state.offset*86400000);}
  function fmtDate(d){return new Intl.DateTimeFormat(locale(),{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'}).format(d);}
  function expiryDate(n){return new Date(todayUTC().getTime()+n*86400000);}
  function t(){return translations[state.lang];}
  function render(){
    const x=t();root.lang=state.lang;root.dir=state.lang==='ar'?'rtl':'ltr';
    localLang.value=state.lang;localRegion.value=state.region;
    root.querySelectorAll('[data-wr209]').forEach(node=>{const key=node.dataset.wr209;if(typeof x[key]==='string')node.textContent=x[key];});
    $('current-date').textContent=fmtDate(demoDate());
    root.querySelectorAll('#wr209-clock button').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.days===state.offset)));
    root.querySelectorAll('#wr209-filter button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===state.filter)));
    const sorted=items.map(item=>({...item,left:item.base-state.offset})).sort((a,b)=>a.left-b.left);
    const upcoming=sorted.filter(v=>v.left>=0),focus=upcoming[0] || sorted[sorted.length-1];
    $('big-num').textContent=Math.abs(focus.left);
    $('big-label').textContent=focus.left===0?x.dueToday:focus.left>0?x.days:x.expiredDays;
    $('focus-name').textContent=x.items[focus.i];
    $('focus-note').textContent=x.focusNote(focus.left);
    $('focus').dataset.status=focus.left<=0?'expired':focus.left<=30?'soon':'safe';
    const attention=sorted.filter(v=>v.left<=30),visible=state.filter==='attention'?attention:sorted;
    const list=$('list');list.replaceChildren();
    for(const item of visible){
      const row=document.createElement('div');row.className='wr209-record';row.dataset.status=item.left<0?'expired':item.left<=30?'soon':'safe';
      row.setAttribute('aria-label',x.ariaItem(x.items[item.i],item.left));
      const glyph=document.createElement('span');glyph.className='wr209-glyph';glyph.setAttribute('aria-hidden','true');glyph.textContent=item.icon;
      const desc=document.createElement('div');desc.className='wr209-desc';
      const title=document.createElement('strong');title.textContent=x.items[item.i];
      const date=document.createElement('span');date.textContent=fmtDate(expiryDate(item.base));desc.append(title,date);
      const status=document.createElement('div');status.className='wr209-status';
      const tag=document.createElement('b');tag.textContent=item.left<0?x.expired:item.left<=30?x.soon:x.safe;
      const left=document.createElement('span');left.textContent=item.left===0?x.dueToday:item.left>0?`${item.left} ${x.days}`:`${Math.abs(item.left)} ${x.expiredDays}`;
      status.append(tag,left);row.append(glyph,desc,status);list.appendChild(row);
    }
    if(visible.length===0){const empty=document.createElement('p');empty.className='wr209-empty';empty.textContent=x.empty;list.appendChild(empty);}
    $('summary').textContent=x.summary(attention.length);
    $('store').href=`https://apps.apple.com/${state.region==='jp'?'jp':'us'}/app/id6804757195`;
  }
  localLang.addEventListener('change',()=>{state.lang=lang(localLang.value);syncGlobal(globalLang,state.lang,lang);render();});
  localRegion.addEventListener('change',()=>{state.region=region(localRegion.value);syncGlobal(globalRegion,state.region,region);render();});
  if(globalLang)globalLang.addEventListener('change',()=>{if(globalLang.value){state.lang=lang(globalLang.value);render();}});
  if(globalRegion)globalRegion.addEventListener('change',()=>{if(globalRegion.value){state.region=region(globalRegion.value);render();}});
  $('clock').addEventListener('click',event=>{const button=event.target.closest('button[data-days]');if(!button)return;state.offset=Number(button.dataset.days);render();});
  $('filter').addEventListener('click',event=>{const button=event.target.closest('button[data-filter]');if(!button)return;state.filter=button.dataset.filter;render();});
  render();
})();
