/* Kizami R129 — local LP demonstration only; no storage, accounts, or networking. */
(() => {
  'use strict';
  const APP_ID = '6795788626';
  const L = {
    en: {
      eyebrow:'TIME YOU CHOSE',badge:'INTERACTIVE LP EXAMPLE',title:'Not every meaningful minute needs a goal.',
      intro:'Choose what you spent time on, add the minutes, and watch your own time become a quiet record. No streak. No score.',
      prompt:'What did you choose?',duration:'Time (minutes)',add:'Keep this time',undo:'Undo last',reset:'Restore sample',
      summary:'TIME KEPT ON THIS PAGE',records:'moments',minutes:'min',shaft:'A visual trace of your chosen time',
      empty:'Your next moment can begin here.',error:'Enter a whole number of minutes from 1 to 600.',
      read:'Reading',walk:'Taking a walk',rest:'Resting',make:'Making something',
      opening:'A little time belongs to you.',note:'Website-only example. The downward line is a visual metaphor, not Kizami’s actual depth conversion or screen. Nothing is saved or sent; reloading clears this demonstration. Kizami does not require streaks or goals.'
    },
    ja: {
      eyebrow:'自分で選んだ時間',badge:'LP専用・操作デモ',title:'役に立たない時間でも、自分で選んだなら。',
      intro:'何をして過ごしたかと分数を選んで、静かに残してみる。連続記録も、達成すべき目標もありません。',
      prompt:'どんな時間を選んだ？',duration:'時間（分）',add:'この時間を残す',undo:'直前の記録を戻す',reset:'サンプルに戻す',
      summary:'このページで残した時間',records:'個の時間',minutes:'分',shaft:'自分で選んだ時間の軌跡',
      empty:'次のひとときは、ここから。',error:'1〜600の整数（分）を入力してください。',
      read:'読書',walk:'散歩',rest:'休息',make:'好きなことを作る',
      opening:'少しの時間でも、自分のもの。',note:'LP専用の説明用デモです。縦に伸びる線は比喩であり、Kizami本体の深さ換算や実画面を再現するものではありません。入力は保存・送信されず、再読み込みで消えます。Kizamiは目標や連続記録を求めません。'
    },
    ar: {
      eyebrow:'وقتك الذي اخترته',badge:'مثال تفاعلي على الموقع',title:'ليس كل وقت مهم بحاجة إلى هدف.',
      intro:'اختر ما فعلته وعدد الدقائق، ثم شاهد لحظاتك تتراكم بهدوء. بلا سلسلة أيام، وبلا نقاط.',
      prompt:'كيف اخترت قضاء وقتك؟',duration:'الوقت (بالدقائق)',add:'احتفظ بهذا الوقت',undo:'تراجع عن آخر إضافة',reset:'استعادة المثال',
      summary:'الوقت المسجل في هذه الصفحة',records:'لحظات',minutes:'دقيقة',shaft:'أثر بصري لوقتك الذي اخترته',
      empty:'يمكن أن تبدأ لحظتك التالية من هنا.',error:'أدخل عدداً صحيحاً من 1 إلى 600 دقيقة.',
      read:'القراءة',walk:'المشي',rest:'الاستراحة',make:'صنع شيء تحبه',
      opening:'قليل من الوقت يخصّك أنت.',note:'هذا مثال على صفحة الويب فقط. الخط الممتد إلى الأسفل رمز بصري، ولا يعكس معادلة العمق أو واجهة Kizami الفعلية. لا يتم حفظ المدخلات أو إرسالها، وتختفي عند إعادة تحميل الصفحة. لا يتطلب Kizami أهدافاً أو سلاسل متواصلة.'
    }
  };
  const sample = [{kind:'read', minutes:15},{kind:'walk',minutes:20}];
  const kinds=['read','walk','rest','make'];
  const langNow=()=>{
    const raw=String(document.getElementById('p199-language')?.value || document.documentElement.lang || 'en').toLowerCase().split(/[-_]/)[0];
    return L[raw] ? raw:'en';
  };
  function mount(){
    if(document.getElementById('tsz-kz129'))return;
    if(!document.body)return;
    const b=document.body;const id=b.dataset.p199Id || b.dataset.p19AppId || '';
    if(id && id!==APP_ID)return;
    if(!id && !document.querySelector(`a[href*="${APP_ID}"]`))return;
    const anchor=document.getElementById('tsz-kz95') || document.getElementById('tsz-kizami-r95') || document.getElementById('tsz-kz54') || document.getElementById('overview');
    const main=document.querySelector('main');if(!anchor && !main)return;
    const root=document.createElement('section');root.id='tsz-kz129';root.dataset.demo='kizami-chosen-time-lp-only';
    root.innerHTML=`<div class="kz129-top"><span data-t="eyebrow"></span><span class="kz129-pill" data-t="badge"></span></div>
      <h2 data-t="title"></h2><p class="kz129-intro" data-t="intro"></p>
      <div class="kz129-grid"><div class="kz129-inputpanel"><div class="kz129-fields"><label><span data-t="prompt"></span><select data-kind></select></label>
      <label><span data-t="duration"></span><input data-minutes type="number" min="1" max="600" step="1" inputmode="numeric" value="25"></label></div>
      <p class="kz129-error" role="alert" data-error hidden></p><div class="kz129-actions"><button type="button" class="kz129-primary" data-add data-t="add"></button>
      <button type="button" class="kz129-secondary" data-undo data-t="undo"></button><button type="button" class="kz129-secondary" data-reset data-t="reset"></button></div>
      <div class="kz129-summary" aria-live="polite"><span data-t="summary"></span><strong data-total></strong><span data-count></span></div>
      <p class="kz129-quiet" data-t="opening"></p></div>
      <div class="kz129-mine"><span class="kz129-mine-label" data-t="shaft"></span><div class="kz129-shaft"><div class="kz129-trace" data-trace></div><div class="kz129-moments" data-moments></div></div><p data-empty class="kz129-empty"></p></div></div>
      <p class="kz129-note" data-t="note"></p>`;
    if(anchor)anchor.insertAdjacentElement('afterend',root);else main.appendChild(root);
    let moments=sample.map(x=>({...x}));let langSeen='';
    const kindInput=root.querySelector('[data-kind]'),minutesInput=root.querySelector('[data-minutes]');
    const error=root.querySelector('[data-error]');
    function render(){
      const lang=langNow(),t=L[lang];langSeen=lang;root.lang=lang;root.dir=lang==='ar'?'rtl':'ltr';
      for(const n of root.querySelectorAll('[data-t]'))n.textContent=t[n.dataset.t]||'';
      const selected=kindInput.value || 'read';kindInput.replaceChildren();
      kinds.forEach(k=>{const opt=document.createElement('option');opt.value=k;opt.textContent=t[k];kindInput.appendChild(opt)});kindInput.value=selected;
      const sum=moments.reduce((acc,m)=>acc+m.minutes,0);
      root.querySelector('[data-total]').textContent=String(sum)+' '+t.minutes;
      root.querySelector('[data-count]').textContent=String(moments.length)+' '+t.records;
      root.querySelector('[data-undo]').disabled=moments.length===0;
      const list=root.querySelector('[data-moments]');list.replaceChildren();
      moments.forEach((m,i)=>{const el=document.createElement('div');el.className='kz129-moment';
        const name=document.createElement('span');name.textContent=t[m.kind];
        const v=document.createElement('strong');v.textContent=String(m.minutes)+' '+t.minutes;
        el.append(name,v);el.style.setProperty('--layer',String(i));list.append(el);
      });
      root.querySelector('[data-trace]').style.height=(moments.length?Math.min(96,18+moments.length*13):0)+'%';
      root.querySelector('[data-empty]').textContent=moments.length?'':t.empty;
      root.dataset.total=String(sum);root.dataset.count=String(moments.length);
      error.textContent=t.error;
    }
    root.querySelector('[data-add]').addEventListener('click',()=>{
      const raw=minutesInput.value.trim(),v=Number(raw);
      if(!/^\d+$/.test(raw) || !Number.isSafeInteger(v) || v<1 || v>600){error.hidden=false;minutesInput.setAttribute('aria-invalid','true');return;}
      error.hidden=true;minutesInput.removeAttribute('aria-invalid');moments.push({kind:kindInput.value,minutes:v});render();
    });
    root.querySelector('[data-undo]').addEventListener('click',()=>{if(moments.length)moments.pop();error.hidden=true;render();});
    root.querySelector('[data-reset]').addEventListener('click',()=>{moments=sample.map(x=>({...x}));minutesInput.value='25';kindInput.value='read';error.hidden=true;minutesInput.removeAttribute('aria-invalid');render();});
    minutesInput.addEventListener('input',()=>{error.hidden=true;minutesInput.removeAttribute('aria-invalid')});
    render();
    const selector=document.getElementById('p199-language');selector?.addEventListener('change',render);
    new MutationObserver(()=>{if(langSeen!==langNow())render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
