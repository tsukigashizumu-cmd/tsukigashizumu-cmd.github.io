/* TSZ_TWELVEOATH_R47_ONE_BY_ONE_CANCELLATION — fictional editorial contact sequence, not an automation. */
(()=>{
 'use strict';
 const APP='6786129971', DIAGRAM='tsz-twelveoath-r47';
 const pinned=document.body?.getAttribute('data-p199-id');
 const pathID=location.pathname.match(/\/apps\/(\d+)(?:\/|$)/)?.[1];
 if((pinned&&pinned!==APP)||(pathID&&pathID!==APP)||(!pinned&&!pathID))return;
 // Fictional illustrative sequence: no contacts, messaging, bookings or dates are actually processed.
 const sample={cancel:'16:00',first:'16:05',reply:'16:20',next:'16:20'};
 if((16*60+5)-(16*60)!==5||(16*60+20)-(16*60+5)!==15)return;
 const texts={
  en:{tag:'AN ILLUSTRATIVE ONE-BY-ONE CONTACT PLAN',title:'One open slot. One next step.',lead:'Prepare who to contact and when to move to the next option instead of improvising after a cancellation.',s1:'OPEN SLOT',s2:'CONTACT ONE',s3:'REPLY DEADLINE',s4:'NEXT OPTION',p1:'A last-minute cancellation',p2:'A personal invitation',p3:'Give one person time to answer',p4:'Move on if no reply',n1:'01 / CHANGE',n2:'02 / INVITE',n3:'03 / WAIT',n4:'04 / DECIDE',nextTitle:'Then, choose the next person or a public notice.',nextBody:'An invitation is not a confirmed booking. The next action remains your decision.',badge:'ONE AT A TIME',note:'Fictional example only: a 16:00 opening, a planned personal contact at 16:05, and a user-set reply deadline at 16:20. No real reservation, real client, message, automated outreach, app screenshot, guaranteed response, or revenue result is represented.'},
  ja:{tag:'説明用：一人ずつ案内する流れ',title:'空き枠が出ても、次の一手を迷わない。',lead:'キャンセル後に慌てないため、誰に案内して、いつ次の候補へ進むかを先に決めておく例です。',s1:'空き枠の発生',s2:'最初の一人へ',s3:'返事を待つ期限',s4:'次の選択肢',p1:'直前キャンセルの想定',p2:'個別に声をかける',p3:'相手の返事を待つ',p4:'返事がなければ次へ',n1:'01 / 発生',n2:'02 / 案内',n3:'03 / 待機',n4:'04 / 判断',nextTitle:'次の一人へ。必要なら公開募集へ。',nextBody:'案内することと予約成立は別です。次の行動は利用者自身が判断します。',badge:'一人ずつ',note:'架空の例です。16:00に空き枠が出て、16:05に一人へ案内し、返事の期限を16:20とする想定です。実際の予約、顧客、送信、アプリ実画面、自動配信、返信・売上の保証を示すものではありません。'}
 };
 const labels={
  en:{language:'Language',country:'App Store country',all:'All apps',eyebrow:'BUSINESS / CANCELLATION RESPONSE',hero:'A cancellation is sudden. Your next step can be ready.',description:'Prepare who to contact next, why you are reaching out, and how long to wait for a reply. Approach one person at a time, instead of treating an empty slot as a reason to mass-message or discount.',store:'View on App Store',catalog:'Explore all apps',price:'Current price and availability are shown on the App Store.',section:'01 / PREPARE THE NEXT PERSON',sectionTitle:'A clear sequence when a slot opens.',sectionLead:'An illustrative workflow, not an actual reservation, message, or app screenshot.',features:'02 / THE THREE THINGS TO PREPARE',featuresTitle:'A person. A reason. A reply deadline.',f1:'Choose whom to approach',f1b:'Plan the next person to invite if time becomes available.',f2:'Know why you are reaching out',f2b:'Keep the reason for a personal invitation clear before sending it.',f3:'Decide when to move on',f3b:'Set how long to wait for a reply, then consider the next person or a public notice.',limit:'03 / WHAT THIS DOES NOT PROMISE',limitTitle:'A thoughtful plan, not a booked slot.',limitBody:'An invitation is not a confirmation. The example shows a user-planned sequence, not automatic messages, guaranteed replies, a successful booking, or recovered revenue. Follow your own booking and privacy practices.',fallback:'This editorial LP is written in English and Japanese. Other locale selections use English LP text; the App Store holds official localized app information.',ctaTitle:'Prepare the next step before the next cancellation.',ctaBody:'See actual app screens and current details on the App Store.',footer:'Tsukigashizumu Studio · Independent editorial page'},
  ja:{language:'言語',country:'App Storeの国',all:'アプリ一覧',eyebrow:'ビジネス / キャンセル後の案内',hero:'キャンセルは突然でも、次の一手は準備できる。',description:'次に案内する人、声をかける理由、返事を待つ期限を事前に整理。一斉送信や安易な値下げに頼らず、一人ずつ案内するためのアプリです。',store:'App Storeで見る',catalog:'アプリ一覧',price:'最新の価格・提供状況はApp Storeで確認してください。',section:'01 / 次の案内を準備する',sectionTitle:'空き枠ができたときの順序を明確に。',sectionLead:'実在する予約・送信やアプリ実画面ではなく、説明用の例です。',features:'02 / 事前に整える3つ',featuresTitle:'誰に、なぜ、いつまで待つか。',f1:'案内する相手を決める',f1b:'空いた枠を案内する候補を先に整理しておきます。',f2:'案内する理由を準備',f2b:'一斉配信ではなく、一人に声をかける理由を整えます。',f3:'次に進む期限を決める',f3b:'返信を待つ期限を設け、次の相手や公開募集を検討できます。',limit:'03 / 大切な注意',limitTitle:'計画は予約成立を保証しません。',limitBody:'案内することと予約の確約は別です。例は利用者が考える順序であり、自動送信・返信・予約成立・売上回復を保証するものではありません。ご自身の予約運用と個人情報の取り扱い方針に沿って利用してください。',fallback:'このLPの独自紹介文は日英のみ。他のロケール選択時は英語にフォールバックします。公式の多言語説明はApp Storeで確認してください。',ctaTitle:'次のキャンセル前に、次の一手を。',ctaBody:'アプリの実画面や最新情報はApp Storeで確認してください。',footer:'Tsukigashizumu Studio · LP独自の紹介ページ'}
 };
 let locales={'en-US':'us','ja':'jp'},manualCountry=false;
 const langEl=()=>document.getElementById('p199-language');
 const countryEl=()=>document.getElementById('p199-country');
 const standalone=()=>document.body?.classList.contains('to47-page');
 const language=()=>/^ja(?:-|$)/i.test(langEl()?.value||document.documentElement.lang||'en')?'ja':'en';
 function translate(){const l=language(),section=document.getElementById(DIAGRAM);
  if(section){section.lang=l;section.querySelectorAll('[data-to47-term]').forEach(el=>{const k=el.dataset.to47Term;if(Object.prototype.hasOwnProperty.call(texts[l],k))el.textContent=texts[l][k];});}
  if(standalone()){document.documentElement.lang=l;document.documentElement.dir='ltr';document.querySelectorAll('[data-to47-label]').forEach(el=>{const k=el.dataset.to47Label;if(Object.prototype.hasOwnProperty.call(labels[l],k))el.textContent=labels[l][k];});}
 }
 function insert(){if(document.getElementById(DIAGRAM))return;
  const anchor=document.getElementById('overview')||document.querySelector('main');if(!anchor)return;
  const s=document.createElement('section');s.id=DIAGRAM;s.dataset.tszSource='fictional-cancellation-contact-plan';
  s.setAttribute('aria-label','Illustrative, non-automated contact plan: open slot 16:00; invite one person 16:05; wait for reply until 16:20; then decide next step.');
  s.innerHTML=`<p class="to47-eyebrow" data-to47-term="tag"></p><h3 data-to47-term="title"></h3><p class="to47-description" data-to47-term="lead"></p><div class="to47-steps"><article class="to47-step"><span class="to47-number" data-to47-term="n1"></span><small data-to47-term="s1"></small><strong>${sample.cancel}</strong><p data-to47-term="p1"></p></article><article class="to47-step"><span class="to47-number" data-to47-term="n2"></span><small data-to47-term="s2"></small><strong>${sample.first}</strong><p data-to47-term="p2"></p></article><article class="to47-step"><span class="to47-number" data-to47-term="n3"></span><small data-to47-term="s3"></small><strong>${sample.reply}</strong><p data-to47-term="p3"></p></article><article class="to47-step"><span class="to47-number" data-to47-term="n4"></span><small data-to47-term="s4"></small><strong>${sample.next} →</strong><p data-to47-term="p4"></p></article></div><div class="to47-next"><div><strong data-to47-term="nextTitle"></strong><p data-to47-term="nextBody"></p></div><span class="to47-next-badge" data-to47-term="badge"></span></div><p class="to47-note" data-to47-term="note"></p>`;
  if(anchor.id==='overview')anchor.append(s);else anchor.insertBefore(s,anchor.firstElementChild);
  translate();
 }
 function updateStore(){const region=countryEl()?.value||'us';if(!/^[a-z]{2}$/.test(region))return;document.querySelectorAll('[data-to47-store]').forEach(el=>{el.href=`https://apps.apple.com/${region}/app/id${APP}`;});}
 async function loadLocales(){if(!standalone())return;try{
  const response=await fetch('../../data/locale-storefronts.json',{cache:'no-store'});if(!response.ok)return;
  const data=await response.json(),map=data?.storefrontByLocale;
  if(data?.developerId!==1817908735||!map||Object.keys(map).length!==50||!Object.values(map).every(v=>/^[a-z]{2}$/.test(v)))return;
  locales=map;const l=langEl(),c=countryEl();if(!l||!c)return;
  const keys=Object.keys(map).sort((a,b)=>a.localeCompare(b));keys.sort((a,b)=>(a==='en-US'?-2:a==='ja'?-1:0)-(b==='en-US'?-2:b==='ja'?-1:0));
  l.replaceChildren();for(const k of keys){const o=document.createElement('option');o.value=k;o.textContent=k;l.add(o);}
  const preferred=(navigator.languages||[navigator.language]).filter(Boolean).map(v=>keys.find(k=>k.toLowerCase()===v.toLowerCase())||keys.find(k=>k.split('-')[0]===v.split('-')[0])).find(Boolean);
  l.value=preferred||'en-US';const previous=c.value;c.replaceChildren();for(const k of [...new Set(['us','jp',...Object.values(map)])].sort()){const o=document.createElement('option');o.value=k;o.textContent=k.toUpperCase();c.add(o);}
  c.value=manualCountry?previous:map[l.value]||'us';if(!c.value)c.value='us';translate();updateStore();
 }catch(_){/* Keep English/Japanese fallback. */}}
 function init(){insert();const l=langEl(),c=countryEl();if(l)l.addEventListener('change',()=>{if(c&&!manualCountry&&locales[l.value]&&Array.from(c.options).some(o=>o.value===locales[l.value]))c.value=locales[l.value];translate();updateStore();});if(c)c.addEventListener('change',()=>{manualCountry=true;updateStore();});translate();updateStore();void loadLocales();}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
