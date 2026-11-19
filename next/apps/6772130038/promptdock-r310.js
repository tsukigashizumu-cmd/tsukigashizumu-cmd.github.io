/* PromptDock AI R310 — no network, no persistence, no tracker */
(() => {
  'use strict';
  const KEY = 'tsz-pd-r310';
  if (document.getElementById(KEY)) return;
  const mount = document.getElementById('p19-main') || document.querySelector('main');
  if (!mount) return;
  const dict = {
    en: {
      kicker:'THE TIME YOU TYPE AGAIN', title:'Stop rewriting the same prompt.', desc:'Pick a template, change three inputs, and copy a ready-to-use prompt. Recall an input set without typing it again.', lang:'Demo language', setup:'01 / Your reusable inputs', template:'Template', subject:'What is it about?', audience:'Who is it for?', tone:'Tone', notes:'One non-negotiable detail', out:'02 / Ready to copy', copy:'Copy prompt', save:'Save these inputs', saved:'Saved sets (this page only)', empty:'No sets saved yet.', note:'This is an LP demonstration. No requests are sent to AI; sets exist only while this page is open.', feedbackSave:'Saved. Select a set below to recall it.', feedbackCopy:'Copied to clipboard.', feedbackFallback:'Select and copy the prompt above.', feedbackRestore:'Inputs restored.', fallback:'Copy is not available in this browser.', options:['Explain an app','Reply to feedback','Plan a task'], tones:['Clear and concise','Warm and human','Direct and precise'], labels:['Task','Audience','Tone','Must include'], subjects:['A small app that helps compare prices','A user who reported a confusing button','A one-hour feature improvement'], audiences:['Busy shoppers','An app user','A small product team'], detail:['Give one concrete example','Acknowledge the issue without overpromising','List steps in priority order'], result:['Create a concise app explanation.','Write a short, respectful response.','Make a practical action plan.']
    },
    ja: {
      kicker:'同じ指示を、また打っていない？',title:'いつものプロンプトを、書き直さない。',desc:'テンプレートを選び、3つの項目を変えるだけ。できた文章をコピーし、同じ入力セットを呼び戻せます。',lang:'デモの言語',setup:'01 / よく使う入力',template:'テンプレート',subject:'何について？',audience:'誰に向けて？',tone:'文体',notes:'必ず入れたい条件',out:'02 / コピーする文章',copy:'プロンプトをコピー',save:'この入力を保存',saved:'保存した入力（このページ内のみ）',empty:'保存した入力はまだありません。',note:'LP専用の体験です。AIに送信せず、入力セットはページを閉じると消えます。',feedbackSave:'保存しました。下の名前を選ぶと呼び戻せます。',feedbackCopy:'コピーしました。',feedbackFallback:'上の文章を選択してコピーしてください。',feedbackRestore:'入力を呼び戻しました。',fallback:'このブラウザではコピーできません。',options:['アプリを説明する','感想に返信する','作業を計画する'],tones:['簡潔で分かりやすく','温かく自然に','正確ではっきり'],labels:['依頼','対象','文体','必須条件'],subjects:['買い物の比較を助ける小さなアプリ','ボタンが分かりにくいという報告','1時間で改善する機能'],audiences:['忙しい買い物客','アプリの利用者','少人数の開発チーム'],detail:['具体例を一つ入れる','約束しすぎず問題を受け止める','優先順に手順を並べる'],result:['短いアプリ紹介文を作成してください。','簡潔で丁寧な返信を作成してください。','実行できる作業計画を作成してください。']
    },
    ar: {
      kicker:'لا تكتب التعليمات نفسها كل مرة',title:'تعليمات جاهزة دون إعادة الكتابة.',desc:'اختر قالبًا، وعدّل المدخلات، ثم انسخ النص الناتج. استرجع مجموعة مدخلات في هذه الصفحة.',lang:'لغة العرض',setup:'01 / المدخلات',template:'القالب',subject:'ما الموضوع؟',audience:'لمن؟',tone:'الأسلوب',notes:'شرط مهم',out:'02 / النص الجاهز',copy:'نسخ التعليمات',save:'حفظ المدخلات',saved:'مجموعات محفوظة (في هذه الصفحة)',empty:'لا توجد مجموعات محفوظة بعد.',note:'تجربة توضيحية فقط، دون اتصال بخدمات الذكاء الاصطناعي. تُحذف البيانات عند إغلاق الصفحة.',feedbackSave:'تم الحفظ. اختر مجموعة لاستعادتها.',feedbackCopy:'تم النسخ.',feedbackFallback:'حدد النص أعلاه وانسخه.',feedbackRestore:'تمت استعادة المدخلات.',fallback:'النسخ غير متاح في هذا المتصفح.',options:['شرح تطبيق','الرد على تعليق','تخطيط مهمة'],tones:['واضح ومختصر','ودود وطبيعي','مباشر ودقيق'],labels:['المهمة','الجمهور','الأسلوب','شرط أساسي'],subjects:['تطبيق صغير لمقارنة الأسعار','ملاحظة عن زر غير واضح','تحسين ميزة خلال ساعة'],audiences:['المتسوقون المشغولون','مستخدم التطبيق','فريق تطوير صغير'],detail:['أضف مثالًا عمليًا واحدًا','اعترف بالمشكلة دون وعود زائدة','رتب الخطوات حسب الأولوية'],result:['اكتب وصفًا قصيرًا للتطبيق.','اكتب ردًا محترمًا ومختصرًا.','ضع خطة عملية قابلة للتنفيذ.']
    }
  };
/* TSZ R381: Spanish es-ES/es-MX dictionaries; AI drafts / source-checked R379. */
  Object.assign(dict,window.TSZ_PD_R381_ES?.modules?.["promptdock-r310"]||{});
/* R382: source-mapped French drafts, fr-FR/fr-CA. */
Object.assign(dict,window.TSZ_PD_R382_FR?.modules?.["promptdock-r310"]||{});
/* R383: de-DE translation drafts from R380 source + R383 completion. */
Object.assign(dict,window.TSZ_PD_R383_DE?.modules?.["promptdock-r310"]||{});
/* R384: Italian source-mapped draft */
Object.assign(dict,window.TSZ_PD_R384_IT?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R385_PT?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R386_ZH_HANS?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R387_ZH_HANT?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R388_KO?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R389_NL?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R390_ID?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R391_MS?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R392_TH?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R393_VI?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R394_FIL?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R395_HI?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R396_BN?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R397_TR?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R398_PL?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R399_UK?.modules?.["promptdock-r310"]||{});
Object.assign(dict,window.TSZ_PD_R400_SV?.modules?.["promptdock-r310"]||{});
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let locale = (() => { const value = new URLSearchParams(location.search).get('lang') || document.documentElement.lang || 'en'; return /^sv(?:-SE)?$/i.test(value)?'sv':/^uk(?:-UA)?$/i.test(value)?'uk':/^pl(?:-PL)?$/i.test(value)?'pl':/^tr(?:-TR)?$/i.test(value)?'tr':/^bn(?:-BD)?$/i.test(value)?'bn':/^hi(?:-IN)?$/i.test(value)?'hi':/^fil(?:-PH)?$/i.test(value)?'fil':/^vi(?:-VN)?$/i.test(value)?'vi':/^th(?:-TH)?$/i.test(value)?'th':/^ms(?:-MY)?$/i.test(value)?'ms':/^id(?:-ID)?$/i.test(value)?'id':/^nl(?:-NL)?$/i.test(value)?'nl-NL':/^ko(?:-KR)?$/i.test(value)?'ko':/^zh-Hant$/i.test(value)?'zh-Hant':/^zh-Hans$/i.test(value)?'zh-Hans':/^pt-PT$/i.test(value)?'pt-PT':/^pt(?:-BR)?$/i.test(value)?'pt-BR':/^it(?:-IT)?$/i.test(value)?'it':/^de(?:-DE)?$/i.test(value)?'de-DE':/^fr-CA$/i.test(value)?'fr-CA':/^fr/i.test(value)?'fr-FR':/^es-MX$/i.test(value)?'es-MX':/^es/i.test(value)?'es-ES':/^ar/i.test(value)?'ar':/^ja/i.test(value)?'ja':'en'; })();
  let template = 0, tone = 0, saved = [], current = null;
  const section = document.createElement('section'); section.id=KEY; section.setAttribute('aria-label','Reusable prompt demonstration');
  const anchor = document.getElementById('tsz-promptdock-safe-hero');
  if (anchor && anchor.parentNode === mount) anchor.insertAdjacentElement('afterend', section);
  else mount.prepend(section);
  const $ = (sel) => section.querySelector(sel);
  function state(){return {template, tone,subject:$('#pd-subject').value,audience:$('#pd-audience').value,detail:$('#pd-detail').value};}
  function prompt(){
    const d=dict[locale], s=state();
    return [d.result[s.template], '',`${d.labels[0]}: ${s.subject}`,`${d.labels[1]}: ${s.audience}`,`${d.labels[2]}: ${d.tones[s.tone]}`,`${d.labels[3]}: ${s.detail}`].join('\n').trim();
  }
  function refresh(){const t=$('#pd-output');t.textContent=prompt();}
  function savedRender(){ const ul=$('#pd-saved');ul.replaceChildren();if(!saved.length){const li=document.createElement('li');li.textContent=dict[locale].empty;ul.append(li);return;}
    saved.forEach((s,i)=>{const li=document.createElement('li'),b=document.createElement('button');b.type='button';b.textContent=`${i+1}. ${s.subject.slice(0,23)}`;b.addEventListener('click',()=>{current=i;template=s.template;tone=s.tone;render(true);$('#pd-subject').value=s.subject;$('#pd-audience').value=s.audience;$('#pd-detail').value=s.detail;refresh();$('#pd-status').textContent=dict[locale].feedbackRestore;});li.append(b);ul.append(li);});}
  function formValues(){return {template,tone,subject:$('#pd-subject')?.value,audience:$('#pd-audience')?.value,detail:$('#pd-detail')?.value};}
  function render(keep){const d=dict[locale];const old=keep&&$('#pd-subject')?formValues():null;
    section.setAttribute('dir',locale==='ar'?'rtl':'ltr');section.setAttribute('lang',locale);
    section.innerHTML=`<div class="pd-head"><div><div class="pd-kicker">${escapeHtml(d.kicker)}</div><h2>${escapeHtml(d.title)}</h2><p class="pd-desc">${escapeHtml(d.desc)}</p></div><label class="pd-field" style="min-width:120px;max-width:180px"><span>${escapeHtml(d.lang)}</span><select id="pd-lang" aria-label="${escapeHtml(d.lang)}"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option><option value="es-ES">Español (España)</option><option value="es-MX">Español (México)</option><option value="fr-FR">Français (France)</option><option value="fr-CA">Français (Canada)</option><option value="de-DE">Deutsch (Deutschland)</option><option value="it">Italiano</option><option value="pt-BR">Português (Brasil)</option><option value="pt-PT">Português (Portugal)</option><option value="zh-Hans">简体中文</option><option value="zh-Hant">繁體中文</option><option value="ko">한국어</option><option value="nl-NL">Nederlands</option><option value="id">Bahasa Indonesia</option><option value="ms">Bahasa Melayu</option><option value="th">ไทย</option><option value="vi">Tiếng Việt</option><option value="fil">Filipino</option><option value="hi">हिन्दी</option><option value="bn">বাংলা</option><option value="tr">Türkçe</option><option value="pl">Polski</option></select></label></div><div class="pd-layout"><div class="pd-panel"><p class="pd-panel-heading">${escapeHtml(d.setup)}</p><label class="pd-field"><span>${escapeHtml(d.template)}</span><select id="pd-template">${d.options.map((v,i)=>`<option value="${i}">${escapeHtml(v)}</option>`).join('')}</select></label><label class="pd-field"><span>${escapeHtml(d.subject)}</span><input id="pd-subject" maxlength="130"></label><label class="pd-field"><span>${escapeHtml(d.audience)}</span><input id="pd-audience" maxlength="130"></label><label class="pd-field"><span>${escapeHtml(d.tone)}</span><select id="pd-tone">${d.tones.map((v,i)=>`<option value="${i}">${escapeHtml(v)}</option>`).join('')}</select></label><label class="pd-field"><span>${escapeHtml(d.notes)}</span><textarea id="pd-detail" maxlength="250"></textarea></label></div><div class="pd-panel"><p class="pd-panel-heading">${escapeHtml(d.out)}</p><pre class="pd-output" id="pd-output" aria-live="polite"></pre><div class="pd-buttons"><button type="button" class="pd-primary" id="pd-copy">${escapeHtml(d.copy)}</button><button type="button" id="pd-save">${escapeHtml(d.save)}</button></div><p class="pd-feedback" id="pd-status" role="status" aria-live="polite"></p><div class="pd-saved"><div class="pd-saved-title">${escapeHtml(d.saved)}</div><ul class="pd-saved-list" id="pd-saved"></ul></div></div></div><p class="pd-fine">${escapeHtml(d.note)}</p>`;
    $('#pd-lang').value=locale;$('#pd-template').value=String(template);$('#pd-tone').value=String(tone);
    $('#pd-subject').value=old?.subject ?? d.subjects[template];$('#pd-audience').value=old?.audience ?? d.audiences[template];$('#pd-detail').value=old?.detail ?? d.detail[template];
    $('#pd-lang').addEventListener('change',e=>{locale=e.target.value;render(true);});
    $('#pd-template').addEventListener('change',e=>{template=Number(e.target.value);render(false);});
    $('#pd-tone').addEventListener('change',e=>{tone=Number(e.target.value);refresh();});
    ['pd-subject','pd-audience','pd-detail'].forEach(id=>$('#'+id).addEventListener('input',refresh));
    $('#pd-save').addEventListener('click',()=>{saved.unshift(state());saved=saved.slice(0,5);savedRender();$('#pd-status').textContent=d.feedbackSave;});
    $('#pd-copy').addEventListener('click',async()=>{const s=prompt();try{if(!navigator.clipboard?.writeText)throw Error('clipboard');await navigator.clipboard.writeText(s);$('#pd-status').textContent=d.feedbackCopy;}catch(e){$('#pd-status').textContent=d.feedbackFallback;$('#pd-output').focus();}});
    refresh();savedRender();
  }
  render(false);
  // TSZ R373: use a single page-level language selector, including explicit en fallback.
  const pageLang=document.getElementById('p19-language');
  if(pageLang){const sync=()=>{const value=pageLang.value||'';const next=/^sv(?:-SE)?$/i.test(value)?'sv':/^uk(?:-UA)?$/i.test(value)?'uk':/^pl(?:-PL)?$/i.test(value)?'pl':/^tr(?:-TR)?$/i.test(value)?'tr':/^bn(?:-BD)?$/i.test(value)?'bn':/^hi(?:-IN)?$/i.test(value)?'hi':/^fil(?:-PH)?$/i.test(value)?'fil':/^vi(?:-VN)?$/i.test(value)?'vi':/^th(?:-TH)?$/i.test(value)?'th':/^ms(?:-MY)?$/i.test(value)?'ms':/^id(?:-ID)?$/i.test(value)?'id':/^nl(?:-NL)?$/i.test(value)?'nl-NL':/^ko(?:-KR)?$/i.test(value)?'ko':/^zh-Hant$/i.test(value)?'zh-Hant':/^zh-Hans$/i.test(value)?'zh-Hans':/^pt-PT$/i.test(value)?'pt-PT':/^pt(?:-BR)?$/i.test(value)?'pt-BR':/^it(?:-IT)?$/i.test(value)?'it':/^de(?:-DE)?$/i.test(value)?'de-DE':/^fr-CA$/i.test(value)?'fr-CA':/^fr/i.test(value)?'fr-FR':/^es-MX$/i.test(value)?'es-MX':/^es/i.test(value)?'es-ES':/^ar(?:-|$)/i.test(value)?'ar':/^ja(?:-|$)/i.test(value)?'ja':'en';if(locale!==next){locale=next;render(true);}section.dataset.tszR373SelectedLocale=value;section.dataset.tszR373Fallback=String(!/^(?:en|ja|ar|es|fr|de|it|pt|zh|ko|nl|id|ms|th|vi|fil|hi|bn|tr|pl|uk|sv)(?:-|$)/i.test(value));const own=section.querySelector('#pd-lang');if(own?.closest('label'))own.closest('label').hidden=true;};pageLang.addEventListener('change',sync);window.addEventListener('tsz:locale-change',sync);sync();}
})();
