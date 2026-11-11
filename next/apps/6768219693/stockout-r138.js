/* TSZ LP R138: tiny fixed illustrative progression, not real app formulas, no external state. */
(()=>{
'use strict';
const ID='tsz-stockout-r138';
if(document.getElementById(ID))return;
const params=new URLSearchParams(location.search);
const detected=(params.get('lang')||document.documentElement.lang||navigator.language||'en').toLowerCase();
const lang=detected.startsWith('ar')?'ar':detected.startsWith('ja')?'ja':'en';
const words={
 ja:{eyebrow:'STOCKOUT ZERO · 体験デモ',title:'手作業から、自動化へ。',intro:'最初はタップで在庫を確認。資金を貯め、効率を上げ、ついに自動化へ。3つの操作で成長の手触りを試してください。',sample:'説明用の固定サンプル',money:'資金',checks:'在庫確認',auto:'自動化',unit:'件',rate:'10秒ごとの確認',lv:'手動効率',step1:'在庫を確認',step1desc:'タップして資金を獲得。最初は1回につき3コイン。',checkbtn:'在庫チェック +',step2:'効率を上げる',step2desc:'9コインで手動チェックの獲得額を増やします。',upgrade:'効率アップ · 9',step3:'自動化を導入',step3desc:'18コインで自動チェックを解放。購入後は10秒進めてみましょう。',buyauto:'自動化を購入 · 18',advance:'10秒進める ▶',progress:'自動化までの資金',msg0:'まず「在庫チェック」を押して資金を貯めましょう。',msgCheck:'在庫確認完了。資金が増えました。',msgUpgrade:'効率アップ！ 次のチェックで獲得額が増えます。',msgAuto:'自動化を導入！「10秒進める」で効果を確認してください。',msgAdvance:'10秒進行。自動チェックで資金と確認件数が増えました。',msgNeed:'資金が足りません。チェックを続けましょう。',msgMax:'このデモでの効率アップは最大2回です。',msgReset:'デモを初期化しました。',reset:'デモを初期化',note:'これはWeb上だけの説明用シミュレーションです。実アプリの資金・速度・クリア条件とは異なります。データ保存・通信・Game Center接続はありません。',done:'導入済み',max:'最大',currency:'コイン'},
 en:{eyebrow:'STOCKOUT ZERO · INTERACTIVE EXAMPLE',title:'From manual checks to automation.',intro:'Tap to check stock. Earn funds, improve efficiency, and unlock automation. Try the progression in three steps.',sample:'Illustrative fixed sample',money:'Funds',checks:'Stock checks',auto:'Automation',unit:'checks',rate:'Checks / 10 sec',lv:'Manual efficiency',step1:'Check stock',step1desc:'Tap to earn funds. Begin with 3 coins for each check.',checkbtn:'Check stock +',step2:'Upgrade efficiency',step2desc:'Spend 9 coins to earn more on each manual check.',upgrade:'Upgrade · 9',step3:'Unlock automation',step3desc:'Spend 18 coins to enable auto-checks. Then advance the sample by 10 seconds.',buyauto:'Buy automation · 18',advance:'Advance 10 sec ▶',progress:'Funds toward automation',msg0:'Start by tapping Check stock to earn funds.',msgCheck:'Stock checked. Your funds increased.',msgUpgrade:'Efficiency upgraded! Your next checks earn more.',msgAuto:'Automation unlocked. Advance 10 seconds to see it work.',msgAdvance:'10 seconds later: automatic checks added funds and progress.',msgNeed:'Not enough funds yet. Keep checking stock.',msgMax:'This demo allows two efficiency upgrades.',msgReset:'Sample reset.',reset:'Reset demo',note:'Web-only illustrative simulation—not the actual app’s earnings, timing, or completion rules. No saved data, network calls, or Game Center connection.',done:'Unlocked',max:'Maxed',currency:'coins'},
 ar:{eyebrow:'STOCKOUT ZERO · مثال تفاعلي',title:'من الفحص اليدوي إلى الأتمتة.',intro:'افحص المخزون بالنقر، واجمع العملات، وحسّن الكفاءة، ثم افتح الأتمتة. جرّب التقدم في ثلاث خطوات.',sample:'مثال توضيحي ثابت',money:'الرصيد',checks:'فحوص المخزون',auto:'الأتمتة',unit:'فحص',rate:'فحوص لكل 10 ثوانٍ',lv:'كفاءة العمل اليدوي',step1:'افحص المخزون',step1desc:'انقر لجمع العملات. تحصل أولًا على 3 عملات لكل فحص.',checkbtn:'فحص المخزون +',step2:'حسّن الكفاءة',step2desc:'أنفق 9 عملات لزيادة العائد من كل فحص يدوي.',upgrade:'تحسين · 9',step3:'افتح الأتمتة',step3desc:'أنفق 18 عملة لتشغيل الفحص التلقائي ثم تقدّم 10 ثوانٍ.',buyauto:'شراء الأتمتة · 18',advance:'تقدّم 10 ثوانٍ ▶',progress:'الرصيد نحو الأتمتة',msg0:'ابدأ بفحص المخزون لجمع العملات.',msgCheck:'اكتمل الفحص وزاد رصيدك.',msgUpgrade:'تحسنت الكفاءة! الفحوص التالية تحقق عائدًا أكبر.',msgAuto:'تم فتح الأتمتة. تقدّم 10 ثوانٍ لترى أثرها.',msgAdvance:'بعد 10 ثوانٍ أضاف الفحص التلقائي عملات وفحوصًا.',msgNeed:'الرصيد غير كافٍ. واصل فحص المخزون.',msgMax:'يسمح هذا العرض بتحسين الكفاءة مرتين فقط.',msgReset:'أُعيد ضبط المثال.',reset:'إعادة ضبط العرض',note:'هذا مثال توضيحي على الويب فقط، وليس معادلات أرباح التطبيق أو سرعته أو شروط إنهائه. لا تخزين للبيانات ولا اتصال بالشبكة أو Game Center.',done:'مفعّلة',max:'الحد الأقصى',currency:'عملة'}
};
const t=words[lang];
const section=document.createElement('section');section.id=ID;section.dir=lang==='ar'?'rtl':'ltr';section.setAttribute('aria-label',t.title);
section.innerHTML=`<div class="s138-topline"><p class="s138-eyebrow">${t.eyebrow}</p><span class="s138-sample">${t.sample}</span></div><h2>${t.title}</h2><p class="s138-intro">${t.intro}</p>
<div class="s138-dashboard" aria-live="polite"><div class="s138-stat"><span>${t.money}</span><strong id="s138-money">0</strong><small>${t.currency}</small></div><div class="s138-stat"><span>${t.checks}</span><strong id="s138-checks">0</strong><small>${t.unit}</small></div><div class="s138-stat"><span>${t.auto}</span><strong id="s138-auto">0</strong><small>${t.rate}</small></div></div>
<div class="s138-steps"><article class="s138-step"><span class="s138-stepnumber">01</span><h3>${t.step1}</h3><p>${t.step1desc}</p><button type="button" id="s138-check">${t.checkbtn}</button></article>
<article class="s138-step"><span class="s138-stepnumber">02</span><h3>${t.step2}</h3><p>${t.step2desc}</p><div class="s138-sample" id="s138-level" aria-live="polite">${t.lv} 1×</div><button type="button" id="s138-upgrade" class="s138-secondary">${t.upgrade}</button></article>
<article class="s138-step"><span class="s138-stepnumber">03</span><h3>${t.step3}</h3><p>${t.step3desc}</p><button type="button" id="s138-automate" class="s138-secondary">${t.buyauto}</button><button type="button" id="s138-advance" class="s138-secondary" disabled>${t.advance}</button></article></div>
<div class="s138-meterrow"><span>${t.progress}</span><strong id="s138-progress-text">0 / 18</strong></div><div class="s138-progress" role="progressbar" aria-label="${t.progress}" aria-valuemin="0" aria-valuemax="18" aria-valuenow="0" id="s138-progress"><span id="s138-fill"></span></div><div class="s138-footer"><p class="s138-status" id="s138-status" role="status" aria-live="polite">${t.msg0}</p><button type="button" class="s138-tertiary" id="s138-reset">${t.reset}</button></div><p class="s138-note">${t.note}</p>`;
let money=0,checks=0,level=0,automation=false;
const by=id=>section.querySelector('#'+id);
const render=message=>{
 by('s138-money').textContent=String(money);by('s138-checks').textContent=String(checks);by('s138-auto').textContent=automation?'2':'0';
 by('s138-level').textContent=t.lv+' '+(level+1)+'×';
 by('s138-upgrade').disabled=level>=2;by('s138-upgrade').textContent=level>=2?t.max:t.upgrade;
 by('s138-automate').disabled=automation;by('s138-automate').textContent=automation?t.done:t.buyauto;
 by('s138-advance').disabled=!automation;
 const progress=automation?18:Math.min(money,18);by('s138-progress-text').textContent=automation?'18 / 18':progress+' / 18';by('s138-progress').setAttribute('aria-valuenow',String(progress));by('s138-fill').style.width=(progress/18*100)+'%';
 by('s138-status').textContent=message;
};
by('s138-check').addEventListener('click',()=>{money+=3*(level+1);checks++;render(t.msgCheck);});
by('s138-upgrade').addEventListener('click',()=>{if(level>=2){render(t.msgMax);return;}if(money<9){render(t.msgNeed);return;}money-=9;level++;render(t.msgUpgrade);});
by('s138-automate').addEventListener('click',()=>{if(automation)return;if(money<18){render(t.msgNeed);return;}money-=18;automation=true;render(t.msgAuto);});
by('s138-advance').addEventListener('click',()=>{if(!automation)return;checks+=2;money+=6;render(t.msgAdvance);});
by('s138-reset').addEventListener('click',()=>{money=0;checks=0;level=0;automation=false;render(t.msgReset);});
(document.querySelector('main')||document.querySelector('[role=main]')||document.body).appendChild(section);
render(t.msg0);
})();
