/* TSZ LP R93 | Quiet Reserve | illustrative only; no persistence, diagnosis, notifications or network. */
(()=>{
 'use strict';
 const ID='tsz-quietreserve-r93';
 const dict={
  ja:{kicker:'QUIET RESERVE · 静かな記録',title:'今日は、どれくらい残っている？',intro:'刺激をひとつ選び、いまの余力を水位で示してみる。長い日記も、前向きな結論も要りません。',stimulus:'今日、負担になったこと',tags:['人混み','通知','予定変更','言葉の強さ','音','返信待ち'],reserve:'いま残っている余力',low:'ほとんど残っていない',mid:'半分くらい',high:'まだ余裕がある',coping:'そのあと何をした？（任意）',actions:['静かな場所へ','通知を止めた','少し休んだ'],summary:'今日の記録イメージ',summaryIntro:'選択を変えると、下の内容も変わります。',summaryTag:'負担になったこと',summaryLevel:'余力',summaryAction:'そのあと',none:'未選択',skip:'記録なし',reset:'最初に戻す',footer:'これはLP内の体験用サンプルです。保存・送信・通知は行いません。実アプリ画面ではなく、医療的な診断や助言でもありません。',unit:'%',hint:'疲れているときは余力だけ選んでも構いません。'},
  en:{kicker:'QUIET RESERVE · A QUIET CHECK-IN',title:'How much do you have left today?',intro:'Choose one thing that wore you down, then show your remaining reserve like a water level. No long diary or forced silver lining.',stimulus:'What wore you down today?',tags:['Crowds','Notifications','Plan changes','Harsh tone','Sounds','Waiting for a reply'],reserve:'Your reserve right now',low:'Almost empty',mid:'About halfway',high:'Some room left',coping:'What helped afterward? (optional)',actions:['Found some quiet','Muted alerts','Rested a little'],summary:'Your example check-in',summaryIntro:'The preview changes with your selections.',summaryTag:'What wore you down',summaryLevel:'Remaining reserve',summaryAction:'Afterward',none:'Not selected',skip:'Nothing added',reset:'Reset example',footer:'Illustrative LP demo, not the real app screen. Nothing is saved or sent; no notifications, diagnosis or medical advice.',unit:'%',hint:'On hard days, choosing only a water level is enough.'},
  ar:{kicker:'QUIET RESERVE · تسجيل هادئ',title:'كم بقي من طاقتك اليوم؟',intro:'اختر ما أتعبك، ثم عبّر عن المتبقي لديك مثل مستوى الماء. لا حاجة إلى يوميات طويلة أو نتيجة إيجابية قسرية.',stimulus:'ما الذي أتعبك اليوم؟',tags:['الازدحام','الإشعارات','تغيّر الخطط','نبرة حادة','الأصوات','انتظار الرد'],reserve:'المتبقي لديك الآن',low:'قليل جدًا',mid:'نحو النصف',high:'ما زال هناك متسع',coping:'ماذا فعلت بعد ذلك؟ (اختياري)',actions:['ذهبت إلى مكان هادئ','أوقفت التنبيهات','استرحت قليلًا'],summary:'مثال لتسجيل اليوم',summaryIntro:'تتغير المعاينة حسب اختياراتك.',summaryTag:'ما أتعبك',summaryLevel:'المتبقي',summaryAction:'بعد ذلك',none:'لم يُحدد',skip:'لا شيء',reset:'إعادة المثال',footer:'هذه تجربة توضيحية للصفحة وليست واجهة التطبيق. لا تُحفظ البيانات أو تُرسل، ولا إشعارات أو تشخيص أو نصيحة طبية.',unit:'٪',hint:'يمكنك اختيار مستوى الماء فقط عندما يكون اليوم صعبًا.'}
 };
 const lng=()=>{const l=(document.documentElement.lang||'en').toLowerCase();return l.startsWith('ja')?'ja':l.startsWith('ar')?'ar':'en'};
 const el=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
 function mount(){
  if(document.getElementById(ID))return;
  const host=document.querySelector('main')||document.body;if(!host)return;
  const root=el('section');root.id=ID;
  root.innerHTML='<div class="qr93-panel"><header class="qr93-head"><span data-i="kicker" class="qr93-kicker"></span><h2 data-i="title"></h2><p data-i="intro"></p></header><div class="qr93-columns"><div class="qr93-input"><h3 data-i="stimulus"></h3><div id="qr93-tags" class="qr93-tags" role="group"></div><div class="qr93-level"><label for="qr93-slider" data-i="reserve"></label><div class="qr93-water-wrap"><div class="qr93-water" aria-hidden="true"><div class="qr93-fill" id="qr93-fill"></div><strong id="qr93-water-num">45%</strong></div><div class="qr93-level-info"><strong id="qr93-level-num">45%</strong><span id="qr93-level-word"></span></div></div><input type="range" id="qr93-slider" min="0" max="100" step="5" value="45"/><div class="qr93-range-label"><span>0%</span><span>100%</span></div><p data-i="hint" class="qr93-hint"></p></div><h3 data-i="coping"></h3><div id="qr93-actions" class="qr93-tags" role="group"></div></div><div class="qr93-output"><div class="qr93-caption" data-i="summary"></div><p data-i="summaryIntro" class="qr93-sub"></p><dl><div><dt data-i="summaryTag"></dt><dd id="qr93-summary-tag"></dd></div><div><dt data-i="summaryLevel"></dt><dd id="qr93-summary-level"></dd></div><div><dt data-i="summaryAction"></dt><dd id="qr93-summary-action"></dd></div></dl><button type="button" id="qr93-reset" data-i="reset" class="qr93-reset"></button><p data-i="footer" class="qr93-footer"></p></div></div></div>';
  host.appendChild(root);
  const $=id=>root.querySelector('#qr93-'+id);
  let tag=null, action=null, level=45;
  const key=()=>dict[lng()];
  function state(){
    const t=key();
    root.lang=lng();root.dir=lng()==='ar'?'rtl':'ltr';
    root.querySelectorAll('[data-i]').forEach(e=>{e.textContent=t[e.dataset.i]||''});
    const tagHost=$('tags');tagHost.replaceChildren();
    t.tags.forEach((txt,i)=>{let b=el('button','qr93-chip'+(tag===i?' selected':''),txt);b.type='button';b.setAttribute('aria-pressed',String(tag===i));b.addEventListener('click',()=>{tag=tag===i?null:i;state()});tagHost.append(b)});
    const actions=$('actions');actions.replaceChildren();
    t.actions.forEach((txt,i)=>{let b=el('button','qr93-chip'+(action===i?' selected':''),txt);b.type='button';b.setAttribute('aria-pressed',String(action===i));b.addEventListener('click',()=>{action=action===i?null:i;state()});actions.append(b)});
    $('slider').value=String(level);
    $('slider').setAttribute('aria-label',t.reserve);
    const word=level<=25?t.low:level<=60?t.mid:t.high;
    $('water-num').textContent=level+'%';$('level-num').textContent=level+'%';$('level-word').textContent=word;
    $('fill').style.height=level+'%';
    $('summary-tag').textContent=tag===null?t.none:t.tags[tag];
    $('summary-level').textContent=level+'% · '+word;
    $('summary-action').textContent=action===null?t.skip:t.actions[action];
  }
  $('slider').addEventListener('input',e=>{level=Math.min(100,Math.max(0,Number(e.target.value)||0));state()});
  $('reset').addEventListener('click',()=>{tag=null;action=null;level=45;state()});
  new MutationObserver(rows=>{if(rows.some(r=>r.attributeName==='lang'))state()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  state();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
