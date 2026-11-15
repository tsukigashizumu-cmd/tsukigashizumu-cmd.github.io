/* R218 Discount Stack: illustrative two successive percentage discounts and optional tax. */
(() => {
 'use strict';
 const APP='6802308517',ID='tsz-discount-r218',P='ds218';
 const body=document.body;
 if(!body||(body.dataset.p199Id||body.dataset.p19AppId)!==APP||document.getElementById(ID))return;
 const main=document.querySelector('main');if(!main)return;
 const T={
  en:{kicker:'DISCOUNT STACK  /  TWO OFFERS, ONE REAL TOTAL',title:'30% off + 20% off ≠ 50% off.',subtitle:'The second discount applies to what remains. See every step before you reach checkout.',choose:'TRY A SHOPPING EXAMPLE',classic:'30% + 20%',mild:'20% + 10%',none:'No discounts',edit:'EDIT THE FOUR VALUES',original:'Original price',first:'First discount',second:'Second discount',tax:'Optional tax',pct:'%',preview:'THE PRICE, STEP BY STEP',start:'Original',step1:'After 1st discount',step2:'After 2nd discount',final:'With tax',wrong:'IF YOU SIMPLY ADD THE PERCENTAGES',wrongLabel:'Naïve sum of discounts (before tax)',real:'ACTUAL DISCOUNT BEFORE TAX',saving:'You save before tax',effective:'Effective discount',taxline:'Tax added after discounts',note:'Manual website example only. The second percentage is applied to the discounted balance, then illustrative tax is added. Tax rules and rounding vary by location and retailer. No real prices are fetched, and nothing is purchased or saved.',takeaway:'Two discounts. One price you can actually understand.',invalid:'Price: 0.01–1,000,000. Percentages: 0–100; tax: 0–30. Use at most two decimal places.',reset:'Reset example',language:'Language',region:'App Store region',app:'See Discount Stack on the App Store',unit:'Values shown in USD for comparison. Region changes only the App Store link.',compare:'Compare the claim against the actual math'},
  ja:{kicker:'DISCOUNT STACK  /  2段階割引の正体',title:'30%引き＋20%引き≠50%引き。',subtitle:'2回目の割引は「残った金額」にかかります。レジへ行く前に、金額の変化を確かめよう。',choose:'買い物の例を選ぶ',classic:'30%＋20%',mild:'20%＋10%',none:'割引なし',edit:'4つの数字を変える',original:'もとの価格',first:'1回目の割引',second:'2回目の割引',tax:'任意の税率',pct:'%',preview:'支払額までの4段階',start:'元の価格',step1:'1回目の割引後',step2:'2回目の割引後',final:'税を加えた合計',wrong:'割引率を足してしまうと',wrongLabel:'割引率を足しただけの計算（税抜）',real:'実際の割引率（税抜）',saving:'税抜きの節約額',effective:'実際の割引率',taxline:'割引後に加える税額',note:'手入力によるWeb上の計算例です。2回目の割引は1回目の割引後の金額に適用し、参考税率を最後に加えます。課税方法・端数処理は地域や店舗により異なります。価格取得・購入・保存は行いません。',takeaway:'割引率を足すより、最後の金額で納得する。',invalid:'価格は0.01〜1,000,000。割引率は0〜100%、税率は0〜30%。小数第2位まで入力できます。',reset:'初期値に戻す',language:'言語',region:'App Store地域',app:'App StoreでDiscount Stackを見る',unit:'表示は米ドルの計算例。地域切替はApp Storeリンクのみ変更します。',compare:'宣伝の数字より、計算の結果を見る'},
  ar:{kicker:'DISCOUNT STACK  /  خصمان وسعر واحد',title:'خصم 30٪ ثم 20٪ لا يساوي 50٪.',subtitle:'الخصم الثاني يُحسب من المبلغ المتبقي. شاهد كل خطوة قبل الدفع.',choose:'اختر مثالًا',classic:'30٪ ثم 20٪',mild:'20٪ ثم 10٪',none:'بدون خصم',edit:'عدّل القيم الأربع',original:'السعر الأصلي',first:'الخصم الأول',second:'الخصم الثاني',tax:'ضريبة اختيارية',pct:'٪',preview:'السعر خطوة بخطوة',start:'الأصل',step1:'بعد الخصم الأول',step2:'بعد الخصم الثاني',final:'الإجمالي مع الضريبة',wrong:'إذا جمعت النسب خطأً',wrongLabel:'مجرد جمع نسب الخصم (دون ضريبة)',real:'الخصم الفعلي قبل الضريبة',saving:'التوفير قبل الضريبة',effective:'نسبة الخصم الفعلية',taxline:'ضريبة مضافة بعد الخصم',note:'مثال حساب يدوي على الموقع فقط. يُطبق الخصم الثاني على المتبقي بعد الأول، ثم تُضاف ضريبة توضيحية. تختلف قواعد الضرائب والتقريب حسب المتجر والبلد. لا يتم جلب أسعار فعلية أو الشراء أو حفظ بيانات.',takeaway:'خصمان، لكن الأهم هو السعر النهائي.',invalid:'السعر من 0.01 إلى 1,000,000. الخصمان من 0 إلى 100٪ والضريبة من 0 إلى 30٪، وبحد منزلتين عشريتين.',reset:'إعادة المثال',language:'اللغة',region:'منطقة App Store',app:'شاهد Discount Stack على App Store',unit:'مثال بالدولار الأمريكي. المنطقة تغيّر رابط المتجر فقط.',compare:'قارن النسب المعلنة بالحساب الحقيقي'}
 };
 const presets={classic:{original:100,first:30,second:20,tax:8},mild:{original:100,first:20,second:10,tax:8},none:{original:100,first:0,second:0,tax:8}};
 const normLang=v=>/^ar(?:$|[-_])/i.test(v||'')?'ar':/^ja(?:$|[-_])/i.test(v||'')?'ja':'en';
 const normRegion=v=>/^(jp|japan|ja-jp)$/i.test(v||'')?'jp':'us';
 const hostSelectors={language:'#p199-language,#p19-language,#discount-stack-language,#ds48-language,#ds90-language,#ds126-language,#ds156-language,#ds178-language,#ds198-language',region:'#p199-country,#p19-country,#discount-stack-country,#ds48-country,#ds90-country,#ds126-country,#ds156-country,#ds178-country,#ds198-country'};
 let section;
 function host(kind){for(const selector of hostSelectors[kind].split(',')){const el=document.querySelector(selector);if(el&&!section.contains(el))return el;}return null;}
 const langFrom=()=>{const el=document.querySelector(hostSelectors.language);return el&&el.value?normLang(el.value):'en';};
 const regionFrom=()=>{const el=document.querySelector(hostSelectors.region);return el&&el.value?normRegion(el.value):'us';};
 let lang=langFrom(),region=regionFrom(),active='classic',syncing=false;
 section=document.createElement('section');section.id=ID;section.setAttribute('aria-label','Two successive percentage discounts and optional tax illustration');
 section.innerHTML=`<div class="ds218-shell">
 <div class="ds218-top"><span class="ds218-wordmark">◈ &nbsp; DISCOUNT STACK <small>/ R218</small></span><span class="ds218-topside">KNOW THE REAL TOTAL</span></div>
 <div class="ds218-hero"><span class="ds218-kicker" data-t="kicker"></span><h2 data-t="title"></h2><p data-t="subtitle"></p></div>
 <div class="ds218-grid"><div class="ds218-controls"><div class="ds218-step"><b>01</b><span data-t="choose"></span></div>
 <div class="ds218-presets"><button type="button" data-preset="classic" data-t="classic"></button><button type="button" data-preset="mild" data-t="mild"></button><button type="button" data-preset="none" data-t="none"></button></div>
 <div class="ds218-step ds218-second"><b>02</b><span data-t="edit"></span></div>
 <div class="ds218-fields"><label><span data-t="original"></span><div class="ds218-field"><i>$</i><input id="ds218-original" aria-label="Original price" inputmode="decimal" value="100"/></div></label>
 <label><span data-t="first"></span><div class="ds218-field"><input id="ds218-first" aria-label="First discount" inputmode="decimal" value="30"/><i>%</i></div></label>
 <label><span data-t="second"></span><div class="ds218-field"><input id="ds218-second" aria-label="Second discount" inputmode="decimal" value="20"/><i>%</i></div></label>
 <label><span data-t="tax"></span><div class="ds218-field"><input id="ds218-tax" aria-label="Optional tax" inputmode="decimal" value="8"/><i>%</i></div></label></div>
 <p class="ds218-error" id="ds218-error" data-t="invalid" role="alert" hidden></p><button type="button" class="ds218-reset" id="ds218-reset">↺ <span data-t="reset"></span></button>
 </div><div class="ds218-output" aria-live="polite"><div class="ds218-step"><b>03</b><span data-t="preview"></span></div>
 <div class="ds218-prices"><div class="ds218-price-row"><span class="ds218-num">01</span><span data-t="start"></span><strong id="ds218-start">$100.00</strong></div>
 <div class="ds218-price-row"><span class="ds218-num">02</span><span data-t="step1"></span><strong id="ds218-step1">$70.00</strong></div>
 <div class="ds218-price-row"><span class="ds218-num">03</span><span data-t="step2"></span><strong id="ds218-step2">$56.00</strong></div>
 <div class="ds218-price-row ds218-final"><span class="ds218-num">04</span><span data-t="final"></span><strong id="ds218-final">$60.48</strong></div></div>
 <div class="ds218-bars"><div class="ds218-bars-top"><span data-t="real"></span><strong id="ds218-effective">44%</strong></div><div class="ds218-bar"><span id="ds218-bar"></span></div><div class="ds218-bars-bottom"><span data-t="saving"></span><b id="ds218-saving">$44.00</b><span data-t="taxline"></span><b id="ds218-taxvalue">$4.48</b></div></div>
 <div class="ds218-mistake"><span class="ds218-mistake-label" data-t="wrong"></span><p data-t="compare"></p><div><span data-t="wrongLabel"></span><b id="ds218-incorrect">$50.00</b></div></div>
 </div></div>
 <div class="ds218-bottom"><h3 data-t="takeaway"></h3><p data-t="note"></p><p class="ds218-unit" data-t="unit"></p><div class="ds218-last"><div class="ds218-locale"><label><span data-t="language"></span><select id="ds218-lang"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select></label><label><span data-t="region"></span><select id="ds218-region"><option value="us">US</option><option value="jp">JP</option></select></label></div><a id="ds218-store" target="_blank" rel="noopener noreferrer"><span data-t="app"></span><span aria-hidden="true">↗</span></a></div></div></div>`;
 main.prepend(section);
 const $=s=>section.querySelector(s);
 const fmt=n=>new Intl.NumberFormat(lang==='ar'?'ar-EG':lang==='ja'?'ja-JP':'en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(n);
 const fmtPct=n=>new Intl.NumberFormat(lang==='ar'?'ar-EG':lang==='ja'?'ja-JP':'en-US',{maximumFractionDigits:2}).format(n)+'%';
 function number(k){const s=$('#ds218-'+k).value.trim();if(!/^(?:\d{1,7})(?:\.\d{1,2})?$/.test(s))return null;const v=Number(s);const max=k==='original'?1e6:k==='tax'?30:100;return Number.isFinite(v)&&v>=0&&v<=max&&(k!=='original'||v>0)?v:null;}
 function update(){
  const t=T[lang];section.lang=lang;section.dir=lang==='ar'?'rtl':'ltr';section.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t[el.dataset.t]||'';});
  $('#ds218-lang').value=lang;$('#ds218-region').value=region;
  $('#ds218-store').href='https://apps.apple.com/'+(region==='jp'?'jp':'us')+'/app/discount-stack/id6802308517';
  const values={};for(const k of ['original','first','second','tax'])values[k]=number(k);
  const invalid=Object.values(values).some(v=>v===null);$('#ds218-error').hidden=!invalid;
  $('.ds218-output').classList.toggle('ds218-invalid',invalid);
  if(invalid){for(const id of ['start','step1','step2','final','saving','taxvalue','incorrect','effective'])$('#ds218-'+id).textContent='—';$('#ds218-bar').style.width='0%';return;}
  const base=values.original,s1=base*(1-values.first/100),s2=s1*(1-values.second/100),taxvalue=s2*values.tax/100,final=s2+taxvalue;
  const eff=100*(1-s2/base);const naïve=base*(1-Math.min(100,values.first+values.second)/100);
  const outputs={start:base,step1:s1,step2:s2,final,saving:base-s2,taxvalue,incorrect:naïve};
  for(const [k,v] of Object.entries(outputs))$('#ds218-'+k).textContent=fmt(Math.round((v+Number.EPSILON)*100)/100);
  $('#ds218-effective').textContent=fmtPct(Math.round(eff*100)/100);
  $('#ds218-bar').style.width=Math.max(0,Math.min(100,eff))+'%';
 }
 function applyPreset(name){const set=presets[name];if(!set)return;active=name;for(const [k,v] of Object.entries(set))$('#ds218-'+k).value=String(v);section.querySelectorAll('[data-preset]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.preset===name)));update();}
 function syncHost(kind){if(syncing)return;const h=host(kind);const val=kind==='language'?lang:region;if(!h)return;const option=[...h.options].find(o=>(kind==='language'?normLang(o.value):normRegion(o.value))===val);if(option&&h.value!==option.value){syncing=true;h.value=option.value;h.dispatchEvent(new Event('change',{bubbles:true}));syncing=false;}}
 function selectHost(kind){const h=host(kind);if(!h)return;h.addEventListener('change',()=>{if(syncing)return;if(kind==='language')lang=normLang(h.value);else region=normRegion(h.value);update();});}
 section.querySelectorAll('[data-preset]').forEach(el=>el.addEventListener('click',()=>applyPreset(el.dataset.preset)));
 section.querySelectorAll('input').forEach(el=>el.addEventListener('input',()=>{active='';section.querySelectorAll('[data-preset]').forEach(b=>b.setAttribute('aria-pressed','false'));update();}));
 $('#ds218-reset').addEventListener('click',()=>applyPreset('classic'));
 $('#ds218-lang').addEventListener('change',()=>{lang=normLang($('#ds218-lang').value);syncHost('language');update();});
 $('#ds218-region').addEventListener('change',()=>{region=normRegion($('#ds218-region').value);syncHost('region');update();});
 selectHost('language');selectHost('region');applyPreset('classic');
})();
