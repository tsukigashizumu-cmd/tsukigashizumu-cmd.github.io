/* TSZ LP R163: personal saving threshold, explanatory demo only. No price forecast, storage, network, notification, purchase action, or analytics. */
(()=>{
'use strict';
const APP_ID='6804757287',ID='tsz-bw163',INIT={price:'120',target:'100',days:'14',minimum:'25'};
const DICT={
 ja:{eyebrow:'BUY OR WAIT · 自分の納得ライン',tag:'LP専用・操作デモ',title:'待つなら、いくら安ければ納得できる？',dek:'同じ20ドルの節約でも、待つ価値は人によって違う。自分の「これだけ安くなれば待つ」という基準と比べてみましょう。',inputs:'まず、買い物の条件を決める',price:'今日の価格',target:'希望する価格',days:'待つ日数',dayUnit:'日',minimum:'この日数を待つなら、最低いくら節約したい？',min10:'$10',min20:'$20',min30:'$30',result:'もし希望価格で買えたなら',saved:'仮定の節約額',coverage:'自分の最低条件に対する充足率',minLabel:'自分の最低条件',gap:'あと必要な節約額',surplus:'基準を上回る額',yes:'あなたの条件は満たしています',no:'あなたの条件には、もう少し届きません',yesBody:'希望価格で実際に購入できるなら、設定した最低節約額以上になります。最終判断はあなた次第です。',noBody:'もう少し値下がりを待つか、いま必要なものとして購入するか。数字を見て自分で決めましょう。',invalid:'今日の価格は0より大きく、希望価格は0〜今日の価格、日数は1〜365の整数、最低節約額は0〜10,000,000で入力してください。',explain:'重要：これは値下がりの予測でも購入の推奨でもありません。希望価格で買えることを仮定した計算です。',foot:'LP用の仮定の数字です。実売価格・相場・通知とは連動せず、入力は保存・送信されません。',reset:'見本を初期化',money:'架空の米ドル額',gapNone:'追加の節約は不要です'},
 en:{eyebrow:'BUY OR WAIT · YOUR OWN THRESHOLD',tag:'INTERACTIVE WEBSITE EXAMPLE',title:'How much saving would make waiting worthwhile?',dek:'A $20 saving can mean different things to different people. Compare the possible savings with the minimum saving that would make the wait worthwhile for you.',inputs:'Start with your purchase scenario',price:'Price today',target:'Your target price',days:'Days you could wait',dayUnit:'days',minimum:'Minimum saving that would make this wait worthwhile',min10:'$10',min20:'$20',min30:'$30',result:'If your target price is reached',saved:'Hypothetical savings',coverage:'Share of your minimum saving met',minLabel:'Your minimum saving',gap:'More savings needed',surplus:'Amount above your threshold',yes:'Your saving threshold is met',no:'This falls short of your threshold',yesBody:'If you can actually buy at your target price, the saving clears the minimum you chose. The decision is still yours.',noBody:'You might wait for a lower price—or decide the item is worth having today. Use the numbers to make your own call.',invalid:'Enter a price above zero, a target between zero and today’s price, 1–365 whole days, and a minimum saving between 0 and 10,000,000.',explain:'Important: this is neither a price forecast nor a recommendation to buy. It assumes the target price can be reached.',foot:'Illustrative USD values only. Not connected to live prices or notifications. Nothing is stored or sent.',reset:'Reset the example',money:'Hypothetical USD amounts',gapNone:'No additional savings needed'},
 ar:{eyebrow:'BUY OR WAIT · حدّك الشخصي',tag:'تجربة تفاعلية على الموقع فقط',title:'كم يجب أن توفّر ليكون الانتظار مجديًا؟',dek:'توفير 20 دولارًا ليس له القيمة نفسها لدى الجميع. قارن التوفير المفترض بالحد الأدنى الذي يجعلك مستعدًا للانتظار.',inputs:'اختر شروط الشراء',price:'السعر اليوم',target:'السعر الذي تتمناه',days:'عدد أيام الانتظار',dayUnit:'أيام',minimum:'ما الحد الأدنى للتوفير الذي يستحق الانتظار؟',min10:'10 دولارات',min20:'20 دولارًا',min30:'30 دولارًا',result:'إذا وصلت إلى السعر المستهدف',saved:'التوفير المفترض',coverage:'نسبة تحقيق الحد الأدنى',minLabel:'الحد الأدنى الذي اخترته',gap:'التوفير الإضافي المطلوب',surplus:'التوفير فوق الحد المطلوب',yes:'التوفير يحقق شرطك',no:'التوفير أقل من شرطك',yesBody:'إذا أمكن الشراء بالسعر المستهدف، فإن التوفير يحقق الحد الذي حددته. القرار النهائي لك.',noBody:'يمكنك انتظار سعر أقل أو الشراء اليوم إن كنت تحتاج المنتج. الأرقام تساعدك على اتخاذ القرار بنفسك.',invalid:'أدخل سعرًا أكبر من صفر، وسعرًا مستهدفًا بين صفر والسعر الحالي، وعدد أيام صحيحًا بين 1 و365، وحدًا أدنى بين 0 و10,000,000.',explain:'مهم: هذا ليس توقعًا للسعر ولا توصية بالشراء. نفترض فقط إمكان الوصول إلى السعر الذي اخترته.',foot:'قيم توضيحية بالدولار الأمريكي. لا أسعار حية ولا إشعارات. لا يتم حفظ أي بيانات أو إرسالها.',reset:'إعادة المثال',money:'مبالغ افتراضية بالدولار',gapNone:'لا تحتاج إلى توفير إضافي'}
};
const q=(root,sel)=>root.querySelector(sel);
function lang(){const value=document.getElementById('p199-language')?.value||document.documentElement.lang||'en';return /^(ar)/i.test(value)?'ar':/^(ja)/i.test(value)?'ja':'en'}
function mount(){
 if(document.getElementById(ID))return;
 const existing=document.querySelector('[data-p199-id="'+APP_ID+'"]');if(!existing)return;
 const anchor=document.getElementById('tsz-bw133')||document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
 const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Buy or Wait threshold interactive illustration');
 root.innerHTML=`<div class="bw163-hero"><div class="bw163-topline"><span class="bw163-logo" data-t="eyebrow"></span><span class="bw163-tag" data-t="tag"></span></div><h2 data-t="title"></h2><p class="bw163-dek" data-t="dek"></p></div>
 <div class="bw163-body"><div class="bw163-main"><div class="bw163-controls"><h3 class="bw163-section-title" data-t="inputs"></h3>
 <div class="bw163-field-grid"><label><span class="bw163-label" data-t="price"></span><span class="bw163-field"><span class="bw163-unit">$</span><input type="number" inputmode="decimal" min="0.01" max="10000000" step="0.01" data-field="price"></span></label>
 <label><span class="bw163-label" data-t="target"></span><span class="bw163-field"><span class="bw163-unit">$</span><input type="number" inputmode="decimal" min="0" max="10000000" step="0.01" data-field="target"></span></label>
 <label><span class="bw163-label" data-t="days"></span><span class="bw163-field"><input type="number" inputmode="numeric" min="1" max="365" step="1" data-field="days"><span class="bw163-unit" data-t="dayUnit"></span></span></label>
 <label><span class="bw163-label" data-t="minimum"></span><span class="bw163-field"><span class="bw163-unit">$</span><input type="number" inputmode="decimal" min="0" max="10000000" step="0.01" data-field="minimum"></span></label></div>
 <div class="bw163-criterion"><span class="bw163-label" data-t="minimum"></span><div class="bw163-pills" role="group" aria-label="Personal minimum saving presets"><button type="button" data-min="10" data-t="min10"></button><button type="button" data-min="20" data-t="min20"></button><button type="button" data-min="30" data-t="min30"></button></div></div></div>
 <div class="bw163-results" aria-live="polite"><h3 class="bw163-section-title" data-t="result"></h3><span class="bw163-result-label" data-t="saved"></span><div class="bw163-saved" data-out="saving"></div>
 <div class="bw163-row"><span class="bw163-result-label" data-t="coverage"></span><span class="bw163-pct" data-out="pct"></span></div><div class="bw163-bar" aria-hidden="true"><span class="bw163-fill"></span></div>
 <div class="bw163-delta"><span><span data-t="minLabel"></span>: <strong data-out="minimum"></strong></span><span><span data-out="delta-label"></span>: <strong data-out="delta"></strong></span></div>
 <div class="bw163-decision"><div class="bw163-decision-head" data-out="headline"></div><p class="bw163-decision-text" data-out="story"></p></div></div></div>
 <p class="bw163-error" role="alert" data-out="error" hidden></p><p class="bw163-story"><span class="bw163-story-icon" aria-hidden="true">i</span><span data-t="explain"></span></p></div>
 <div class="bw163-foot"><p class="bw163-footnote" data-t="foot"></p><button type="button" class="bw163-reset" data-action="reset" data-t="reset"></button></div>`;
 if(anchor.id==='tsz-bw133'||anchor.id==='overview')anchor.insertAdjacentElement('afterend',root);else anchor.prepend(root);
 for(const [key,value] of Object.entries(INIT))q(root,'[data-field="'+key+'"]').value=value;
 const update=()=>{
  const lc=lang(),t=DICT[lc];root.lang=lc;root.dir=lc==='ar'?'rtl':'ltr';
  root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.dataset.t]||''});
  const val=k=>q(root,'[data-field="'+k+'"]').value.trim(),num=k=>Number(val(k));
  const p=num('price'),target=num('target'),days=num('days'),minimum=num('minimum');
  const valid=Object.keys(INIT).every(k=>val(k)!=='')&&[p,target,days,minimum].every(Number.isFinite)&&p>0&&p<=10000000&&target>=0&&target<=p&&Number.isInteger(days)&&days>=1&&days<=365&&minimum>=0&&minimum<=10000000;
  root.dataset.valid=String(valid);
  const error=q(root,'[data-out="error"]');error.hidden=valid;error.textContent=valid?'':t.invalid;
  root.querySelectorAll('[data-min]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.min)===minimum)));
  if(!valid){root.dataset.pass='';root.dataset.saving='';q(root,'[data-out="saving"]').textContent='—';q(root,'[data-out="minimum"]').textContent='—';q(root,'[data-out="delta"]').textContent='—';q(root,'[data-out="pct"]').textContent='—';q(root,'[data-out="headline"]').textContent='—';q(root,'[data-out="story"]').textContent='';q(root,'[data-out="delta-label"]').textContent='';q(root,'.bw163-fill').style.width='0%';return}
  const saving=Math.max(0,Math.round((p-target)*100)/100),pass=saving>=minimum,gap=Math.max(0,minimum-saving),surplus=Math.max(0,saving-minimum),pct=minimum===0?100:100*saving/minimum;
  const money=x=>new Intl.NumberFormat(lc==='ja'?'ja-JP':lc==='ar'?'ar-SA':'en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(x);
  root.dataset.pass=String(pass);root.dataset.saving=saving.toFixed(2);root.dataset.gap=gap.toFixed(2);root.dataset.days=String(days);
  q(root,'[data-out="saving"]').textContent=money(saving);q(root,'[data-out="minimum"]').textContent=money(minimum);
  q(root,'[data-out="pct"]').textContent=Math.round(pct)+'%';q(root,'.bw163-fill').style.width=Math.min(100,pct)+'%';
  q(root,'[data-out="delta-label"]').textContent=pass?t.surplus:t.gap;q(root,'[data-out="delta"]').textContent=money(pass?surplus:gap);
  q(root,'[data-out="headline"]').textContent=pass?t.yes:t.no;q(root,'[data-out="story"]').textContent=pass?t.yesBody:t.noBody;
 };
 root.addEventListener('input',e=>{if(e.target.matches('[data-field]'))update()});
 root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!root.contains(b))return;
  if(b.dataset.min)q(root,'[data-field="minimum"]').value=b.dataset.min;
  if(b.dataset.action==='reset')for(const [k,v] of Object.entries(INIT))q(root,'[data-field="'+k+'"]').value=v;
  update();
 });
 document.getElementById('p199-language')?.addEventListener('change',update);
 let last=lang();new MutationObserver(()=>{if(last!==lang()){last=lang();update()}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 update();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
