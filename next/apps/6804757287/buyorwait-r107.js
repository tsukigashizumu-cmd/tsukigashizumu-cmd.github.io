/* TSZ LP R107 · Buy or Wait · browser-memory-only illustration. No price predictions. */
(()=>{'use strict';
const ID='tsz-buyorwait-r107';
if(document.getElementById(ID))return;
const words={
 ja:{eyebrow:'BUY OR WAIT · 体験デモ',title:'その20ドルを待つのに、14日かける？',intro:'「いま買う」と「希望価格まで待つ」を、金額と時間で並べてみる。値下がりを予測するものではありません。',before:'いまの価格',target:'買ってもいい価格',days:'待てる日数',unit:'日',today:'いま買う',later:'待つ場合の仮定',hypo:'希望価格になった場合に限る',saving:'節約できる金額',percent:'現在価格との差',daily:'1日待つあたりの節約額',question:'あなたなら、待つ？',reset:'初期値に戻す',notice:'このページは説明用シミュレーションです。値下がり・販売価格・セールの発生は予測しません。入力・選択は保存も送信もしません。',invalid:'0以上の有効な金額と、0〜365日の整数を入力してください。',noSaving:'希望価格が現在価格以上のため、節約額はありません。',sameDay:'待つ日数が0日なので、1日あたりの額は算出しません。',wait:'待つと思う',buy:'いま買うと思う',undecided:'まだ決めない',selectedWait:'「待つ」を仮に選びました。判断はあなた次第です。',selectedBuy:'「いま買う」を仮に選びました。判断はあなた次第です。',selectedNone:'判断は保留中です。',gain:'もし希望価格になれば',waitNote:'入力した日数は待てる時間であり、価格変動の予測ではありません。'},
 en:{eyebrow:'BUY OR WAIT · INTERACTIVE DEMO',title:'Would you wait 14 days to save $20?',intro:'See today’s price, your target, and the time you are willing to wait side by side. No sale forecast.',before:'Price today',target:'Your target price',days:'Days you would wait',unit:'days',today:'Buy today',later:'If you wait',hypo:'Only if the price reaches your target',saving:'Potential savings',percent:'Difference from today',daily:'Savings per day waited',question:'What would you choose?',reset:'Restore sample',notice:'This is a landing-page illustration. It does not predict a discount, future price, or sale. Inputs and choices are neither stored nor sent.',invalid:'Enter valid nonnegative prices and a whole number of days from 0 to 365.',noSaving:'Your target is not below today’s price, so there is no saving.',sameDay:'With zero waiting days, per-day savings are not calculated.',wait:'I might wait',buy:'I might buy now',undecided:'Undecided',selectedWait:'You tentatively chose to wait. The decision is yours.',selectedBuy:'You tentatively chose to buy now. The decision is yours.',selectedNone:'No choice made yet.',gain:'If your target price happens',waitNote:'The number of days is your tolerance, not a price prediction.'},
 ar:{eyebrow:'الشراء أم الانتظار · تجربة تفاعلية',title:'هل تنتظر 14 يوماً لتوفّر 20 دولاراً؟',intro:'قارن سعر اليوم والسعر الذي ترضى به والمدة التي يمكنك انتظارها. من دون توقع للتخفيضات.',before:'السعر اليوم',target:'السعر الذي تريده',days:'عدد أيام الانتظار',unit:'أيام',today:'الشراء الآن',later:'الانتظار على سبيل الافتراض',hypo:'فقط إذا وصل السعر إلى هدفك',saving:'التوفير المحتمل',percent:'الفرق عن سعر اليوم',daily:'التوفير لكل يوم انتظار',question:'ماذا ستختار؟',reset:'استعادة المثال',notice:'هذا مثال توضيحي فقط. لا يتنبأ بخصم أو سعر مستقبلي أو موعد تخفيض. لا يتم حفظ المدخلات أو إرسالها.',invalid:'أدخل سعراً صالحاً غير سالب وعدد أيام صحيحاً من 0 إلى 365.',noSaving:'السعر الذي تريده ليس أقل من سعر اليوم، لذا لا يوجد توفير.',sameDay:'عند انتظار صفر يوم لا نحسب التوفير لكل يوم.',wait:'ربما أنتظر',buy:'ربما أشتري الآن',undecided:'لم أقرر بعد',selectedWait:'اخترت الانتظار افتراضياً. القرار يعود إليك.',selectedBuy:'اخترت الشراء الآن افتراضياً. القرار يعود إليك.',selectedNone:'لم يتم الاختيار بعد.',gain:'إذا أصبح السعر كما تريد',waitNote:'المدة هي ما يمكنك الانتظاره، وليست توقعاً للسعر.'}
};
let decision='none';
const root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Buy or Wait interactive illustration');
root.innerHTML=`<header class="bw107-head"><p class="bw107-eyebrow"></p><h2></h2><p class="bw107-intro"></p></header>
<div class="bw107-layout"><div class="bw107-controls">
<div class="bw107-fields"><label class="bw107-field"><span class="bw107-label-today"></span><div class="bw107-input-wrap"><span aria-hidden="true">$</span><input class="bw107-current" type="number" min="0" max="100000" step="0.01" inputmode="decimal" value="120" data-testid="today"/></div></label>
<label class="bw107-field"><span class="bw107-label-target"></span><div class="bw107-input-wrap"><span aria-hidden="true">$</span><input class="bw107-target" type="number" min="0" max="100000" step="0.01" inputmode="decimal" value="100" data-testid="target"/></div></label></div>
<label class="bw107-day-head" for="bw107-days"><span class="bw107-label-days"></span><strong class="bw107-day-value"></strong></label><input id="bw107-days" class="bw107-days" type="range" min="0" max="60" step="1" value="14" data-testid="days" />
<div class="bw107-presets"><button type="button" data-days="3">3</button><button type="button" data-days="7">7</button><button type="button" data-days="14">14</button><button type="button" data-days="30">30</button></div>
<p class="bw107-hint"></p><p class="bw107-error" role="alert" aria-live="polite"></p><button type="button" class="bw107-reset"></button></div>
<div class="bw107-result" aria-live="polite"><div class="bw107-prices"><div><span class="bw107-title-now"></span><strong class="bw107-value-now"></strong></div><div><span class="bw107-title-later"></span><strong class="bw107-value-later"></strong><small class="bw107-hypo"></small></div></div>
<div class="bw107-delta"><span class="bw107-label-savings"></span><strong class="bw107-saving" data-testid="savings"></strong><p class="bw107-gain"></p></div>
<div class="bw107-stats"><div><span class="bw107-label-percent"></span><strong class="bw107-percent" data-testid="percent"></strong></div><div><span class="bw107-label-daily"></span><strong class="bw107-daily" data-testid="perday"></strong></div></div>
<div class="bw107-choices"><p class="bw107-question"></p><div class="bw107-buttons"><button type="button" data-choice="wait"></button><button type="button" data-choice="buy"></button><button type="button" data-choice="none"></button></div><p class="bw107-decision" role="status"></p></div></div></div>
<footer class="bw107-note"></footer>`;
const q=s=>root.querySelector(s),lang=()=>{const v=(document.documentElement.lang||'en').toLowerCase();return v.startsWith('ja')?'ja':v.startsWith('ar')?'ar':'en'},w=()=>words[lang()];
const amount=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
function render(){const t=w(),l=lang();root.lang=l;root.dir=l==='ar'?'rtl':'ltr';
 const labels={'.bw107-eyebrow':'eyebrow','h2':'title','.bw107-intro':'intro','.bw107-label-today':'before','.bw107-label-target':'target','.bw107-label-days':'days','.bw107-title-now':'today','.bw107-title-later':'later','.bw107-hypo':'hypo','.bw107-label-savings':'saving','.bw107-label-percent':'percent','.bw107-label-daily':'daily','.bw107-question':'question','.bw107-hint':'waitNote','.bw107-reset':'reset','.bw107-note':'notice'};
 for(const [sel,key]of Object.entries(labels))q(sel).textContent=t[key];
 for(const [choice,key]of [['wait','wait'],['buy','buy'],['none','undecided']]){const el=q('[data-choice="'+choice+'"]');el.textContent=t[key];el.setAttribute('aria-pressed',String(decision===choice));}
 const a=q('.bw107-current'),b=q('.bw107-target'),days=q('.bw107-days');let today=Number(a.value),target=Number(b.value),d=Number(days.value);
 q('.bw107-day-value').textContent=d+' '+t.unit;
 root.querySelectorAll('[data-days]').forEach(el=>el.setAttribute('aria-pressed',String(Number(el.dataset.days)===d)));
 const valid=a.value.trim()!==''&&b.value.trim()!==''&&Number.isFinite(today)&&Number.isFinite(target)&&today>=0&&target>=0&&today<=100000&&target<=100000&&Number.isInteger(d)&&d>=0&&d<=365;
 a.setAttribute('aria-invalid',String(!valid));b.setAttribute('aria-invalid',String(!valid));
 q('.bw107-error').textContent=valid?'':t.invalid;
 for(const el of root.querySelectorAll('.bw107-result strong'))el.textContent=valid?'':'—';
 q('.bw107-gain').textContent='';
 if(valid){const saving=Math.max(0,today-target),pct=today>0?100*saving/today:0;
 q('.bw107-value-now').textContent=amount(today);q('.bw107-value-later').textContent=amount(target);
 q('.bw107-saving').textContent=amount(saving);q('.bw107-percent').textContent=pct.toFixed(1)+'%';q('.bw107-daily').textContent=d>0?amount(saving/d):'—';
 q('.bw107-gain').textContent=saving<=0?t.noSaving:d===0?t.sameDay:t.gain;
 }
 q('.bw107-decision').textContent=decision==='wait'?t.selectedWait:decision==='buy'?t.selectedBuy:t.selectedNone;
}
for(const selector of ['.bw107-current','.bw107-target','.bw107-days'])q(selector).addEventListener('input',render);
root.querySelectorAll('[data-days]').forEach(b=>b.addEventListener('click',()=>{q('.bw107-days').value=b.dataset.days;render()}));
root.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{decision=b.dataset.choice;render()}));
q('.bw107-reset').addEventListener('click',()=>{q('.bw107-current').value='120';q('.bw107-target').value='100';q('.bw107-days').value='14';decision='none';render()});
function mount(){if(root.isConnected)return;const anchor=document.querySelector('#overview')||document.querySelector('main')||document.body;anchor.insertAdjacentElement('afterend',root);render()}
new MutationObserver(()=>{if(root.isConnected&&root.lang!==lang())render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
