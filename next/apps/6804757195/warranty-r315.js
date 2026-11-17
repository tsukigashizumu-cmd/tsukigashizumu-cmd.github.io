/* R315 Warranty Deadline Tracker: temporary LP demo; no storage, tracking or network. */
(() => {
  'use strict';
  const I18N={
    en:{eyebrow:'WARRANTY DEADLINE / LIVE PREVIEW',title:'The warranty expires in 13 days. Where is the receipt?',lead:'The purchase is already in your home. But the proof of purchase, serial number and warranty deadline are easy to forget.',panel:'Enter one warranty',name:'Item name',namePlace:'Headphones',deadline:'Warranty end date',today:'Reference date',apply:'Check the deadline',reset:'Reset example',soon:'Deadline approaching',future:'Time remaining',expired:'Past the entered date',due:'Deadline is today',invalid:'Enter a valid item name and both dates.',unit:'days left',unitPast:'days past',end:'Entered end date',todayLabel:'Reference date',hint:'Check the terms and proof of purchase before contacting support.',hintPast:'This date has passed. Actual coverage depends on the warranty terms.',hintToday:'The entered end date is today. Confirm the conditions with the provider.',ready:'Can you find these now?',check:['Receipt / purchase proof','Serial or model number','Support contact'],note:'This checklist is only for this page. It does not save information or decide warranty eligibility.',store:'View the iPhone app',foot:'LP demo · Dates are counted in calendar days. Warranty coverage depends on the seller/manufacturer and contract terms.',prod:'Headphones'},
    ja:{eyebrow:'WARRANTY DEADLINE / 操作型プレビュー',title:'保証期限まで13日。レシートはどこだろう。',lead:'買ったものは手元にある。でも購入証明や型番、保証の期限は、いざというとき思い出せない。',panel:'保証を1つ確認',name:'品物の名前',namePlace:'ヘッドホン',deadline:'保証終了日',today:'確認する日',apply:'期限を確認',reset:'初期例に戻す',soon:'期限が近づいています',future:'期限までの残り',expired:'入力した期限を過ぎました',due:'入力した期限は今日',invalid:'品物と2つの日付を正しく入力してください。',unit:'日',unitPast:'日経過',end:'入力した保証終了日',todayLabel:'確認する日',hint:'購入証明と保証条件を、問い合わせ前に確認しておきましょう。',hintPast:'入力した日付は過ぎています。実際の保証対象かどうかは条件次第です。',hintToday:'終了日が今日です。保証条件と問い合わせ方法を確認してください。',ready:'今すぐ見つかりますか？',check:['レシート・購入証明','型番・シリアル番号','サポートの連絡先'],note:'このチェックはページ内だけの体験です。保存も保証可否の判定もしません。',store:'iPhoneアプリを見る',foot:'LP専用デモ · 日数は暦日で計算。実際の保証適用は販売店・メーカーの条件によります。',prod:'ヘッドホン'},
    ar:{eyebrow:'WARRANTY DEADLINE / تجربة تفاعلية',title:'بقي 13 يومًا على انتهاء الضمان. أين الإيصال؟',lead:'المنتج في منزلك. لكن إثبات الشراء ورقم الطراز وتاريخ انتهاء الضمان قد يصعب العثور عليها عند الحاجة.',panel:'تحقق من ضمان واحد',name:'اسم المنتج',namePlace:'سماعات الرأس',deadline:'تاريخ نهاية الضمان',today:'تاريخ التحقق',apply:'تحقق من الموعد',reset:'إعادة المثال',soon:'موعد الانتهاء يقترب',future:'الوقت المتبقي',expired:'التاريخ المدخل قد مضى',due:'الموعد هو اليوم',invalid:'أدخل اسم المنتج وتاريخين صحيحين.',unit:'يوم متبقٍ',unitPast:'يوم مضى',end:'تاريخ الانتهاء المدخل',todayLabel:'تاريخ التحقق',hint:'تحقق من إثبات الشراء وشروط الضمان قبل التواصل مع الدعم.',hintPast:'انقضى التاريخ المدخل. تعتمد التغطية الفعلية على شروط الضمان.',hintToday:'اليوم هو تاريخ الانتهاء المدخل. تحقق من الشروط وخيارات التواصل.',ready:'هل تستطيع العثور على هذه الآن؟',check:['الإيصال أو إثبات الشراء','رقم الطراز أو الرقم التسلسلي','وسيلة التواصل مع الدعم'],note:'هذه تجربة داخل الصفحة فقط. لا حفظ ولا تحديد لأهلية الضمان.',store:'عرض تطبيق iPhone',foot:'تجربة توضيحية · يتم الحساب بالأيام التقويمية. يخضع الضمان لشروط البائع أو الشركة المصنّعة.',prod:'سماعات الرأس'}
  };
  const day=(v)=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(v))return null;const [y,m,d]=v.split('-').map(Number);const u=Date.UTC(y,m-1,d);const date=new Date(u);return date.getUTCFullYear()===y&&date.getUTCMonth()===m-1&&date.getUTCDate()===d?u:null;};
  function setup(host){
    if(document.getElementById('wd315'))return;
    const section=document.createElement('section');section.id='wd315';section.setAttribute('aria-label','Warranty deadline interactive demo');
    section.innerHTML=`<div class="wd-shell"><div class="wd-content"><div class="wd-topline"><div class="wd-eyebrow" data-t="eyebrow"></div><div class="wd-langs" role="group" aria-label="Language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></div><h2 data-t="title"></h2><p class="wd-lead" data-t="lead"></p><div class="wd-grid"><div class="wd-panel"><div class="wd-panelhead" data-t="panel"></div><div class="wd-field"><label for="wd315-name" data-t="name"></label><input id="wd315-name" type="text" maxlength="60" autocomplete="off"></div><div class="wd-field"><label for="wd315-end" data-t="deadline"></label><input id="wd315-end" type="date"></div><div class="wd-field"><label for="wd315-now" data-t="today"></label><input id="wd315-now" type="date"></div><div class="wd-actions"><button type="button" class="wd-action" data-action="apply" data-t="apply"></button><button type="button" class="wd-action wd-action-secondary" data-action="reset" data-t="reset"></button></div></div><div class="wd-panel wd-result" aria-live="polite"><span class="wd-status" data-status></span><div class="wd-big" data-count>13</div><div class="wd-unit" data-unit></div><p class="wd-meta" data-meta></p><div class="wd-track"><div class="wd-fill" data-fill></div></div><p class="wd-hint" data-hint></p></div></div><div class="wd-checks"><h3 class="wd-checktitle" data-t="ready"></h3><div class="wd-checklist"></div><p class="wd-note" data-t="note"></p></div><div class="wd-bottom"><div class="wd-footnote" data-t="foot"></div><a class="wd-store" target="_blank" rel="noopener noreferrer" data-t="store" href="https://apps.apple.com/us/app/id6804757195"></a></div></div></div>`;
    host.appendChild(section);
    const $=s=>section.querySelector(s);let lang='en'; const navlang=(document.documentElement.lang||'').toLowerCase();if(navlang.startsWith('ja'))lang='ja';else if(navlang.startsWith('ar'))lang='ar';
    let checks=[false,false,false];let dates={item:'',end:'2026-11-30',now:'2026-11-17'};let message='';
    const name=$('#wd315-name'),end=$('#wd315-end'),now=$('#wd315-now');
    function render(){
      const t=I18N[lang];section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';
      section.querySelectorAll('[data-t]').forEach(n=>{n.textContent=t[n.dataset.t]});
      section.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
      if(!dates.item){name.value=t.prod;name.dataset.auto='1';}else if(name.dataset.auto==='1'){name.value=t.prod;}
      name.placeholder=t.namePlace;end.value=dates.end;now.value=dates.now;
      const e=day(end.value),n=day(now.value),valid=e!==null&&n!==null&&name.value.trim().length>0;
      const diff=valid?Math.round((e-n)/86400000):null;
      $('[data-count]').textContent=valid?String(Math.abs(diff)):'—';
      $('[data-status]').textContent=!valid?t.invalid:diff<0?t.expired:diff===0?t.due:diff<=30?t.soon:t.future;
      $('[data-unit]').textContent=valid?(diff<0?t.unitPast:t.unit):'';
      $('[data-meta]').textContent=valid?`${t.end}: ${end.value} · ${t.todayLabel}: ${now.value}`:'';
      $('[data-hint]').textContent=!valid?t.invalid:diff<0?t.hintPast:diff===0?t.hintToday:t.hint;
      $('[data-fill]').style.width=valid?`${Math.min(100,Math.max(0,100-(diff/90*100)))}%`:'0%';
      $('.wd-checklist').replaceChildren();t.check.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.className='wd-check';b.dataset.check=String(i);b.setAttribute('aria-pressed',String(checks[i]));const x=document.createElement('span');x.className='wd-dot';x.setAttribute('aria-hidden','true');x.textContent=checks[i]?'✓':'';const c=document.createElement('span');c.textContent=s;b.append(x,c);$('.wd-checklist').append(b)});
      const inJP=(document.location.pathname.includes('/jp/')||new URLSearchParams(document.location.search).get('store')==='jp');$('.wd-store').href=`https://apps.apple.com/${inJP?'jp':'us'}/app/id6804757195`;
    }
    section.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||!section.contains(b))return;
      if(b.dataset.lang){lang=b.dataset.lang;render();return;}
      if(b.dataset.check!==undefined){const i=Number(b.dataset.check);checks[i]=!checks[i];render();return;}
      if(b.dataset.action==='reset'){checks=[false,false,false];dates={item:'',end:'2026-11-30',now:'2026-11-17'};name.dataset.auto='1';render();return;}
      if(b.dataset.action==='apply'){dates={item:name.value.trim(),end:end.value,now:now.value};name.dataset.auto='0';render();return;}
    });
    name.addEventListener('input',()=>{name.dataset.auto='0';dates.item=name.value;});
    end.addEventListener('change',()=>{dates.end=end.value;render();});
    now.addEventListener('change',()=>{dates.now=now.value;render();});
    render();
  }
  function mount(){const existing=document.getElementById('wd315-preview-root');if(existing){setup(existing);return;}
    const related=document.getElementById('related');if(related&&related.parentElement){const el=document.createElement('div');related.parentElement.insertBefore(el,related);setup(el);return;}
    setup(document.querySelector('main')||document.body);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
