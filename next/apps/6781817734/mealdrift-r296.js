/* MealDrift R296 — one night's choice. No persistence, tracking or network calls. */
(()=>{
'use strict';
const ROOT_ID='mealdrift-r296';
const strings={
 en:{eyebrow:'THE LAST DECISION OF YOUR DAY',headline:'“Anything is fine.” Until you suggest something.',intro:'You have already made enough decisions today. Keep the meals you actually like, then let one of them be tonight’s answer.',say1:'“What should we eat tonight?”',say2:'“Anything is fine… not that.”',live:'TONIGHT’S PICK',ready:'One less decision.',pick:'Choose tonight’s meal',again:'Choose again',skip:'Not tonight',reset:'Start over',hint:'Only meals you have not hidden can be selected. Set how often they appear below.',list:'Your own options',sub:'Set appearance frequency or remove an option for tonight. These examples exist only on this page.',freq:'Frequency',low:'Rarely',med:'Sometimes',high:'Often',hide:'Hide tonight',restore:'Include tonight',add:'Add a meal',placeholder:'A meal you would happily eat…',tagHome:'At home',tagOut:'Eating out',tagLeft:'Leftovers',addFail:'Type a name to add a meal.',empty:'No meals are available. Include at least one option.',chosen:'Tonight: {meal}. One less decision to make.',hidden:'Hidden for tonight: {meal}.',added:'Added to the choices: {meal}.',store:'Get MealDrift',disclaimer:'LP demo only. No account, prediction, server connection or saved data. Refreshing clears your choices.',count:'{n} choices available',initial:'Press the button. Your future tired self already made the list.'},
 ja:{eyebrow:'一日の最後の決断を手放す',headline:'「何でもいい」って言ったのに。「それは違う」。',intro:'今日も、もう十分に考えた。元気なときに登録した「食べてもいい候補」から、今夜の一品だけを決めよう。',say1:'「今日、何食べる？」',say2:'「何でもいい。……それ以外で」',live:'今夜の一品',ready:'最後のひとつは、任せていい。',pick:'今夜のごはんを決める',again:'もう一度選ぶ',skip:'今夜は出さない',reset:'最初に戻す',hint:'選ばれたくない候補は今夜だけ除外できます。出やすさは3段階で調整できます。',list:'自分の候補だけ',sub:'出やすさを変えたり、今夜だけ除外したり。ここでの操作は保存されません。',freq:'出やすさ',low:'たまに',med:'普通',high:'よく出す',hide:'今夜は除外',restore:'候補に戻す',add:'候補を追加',placeholder:'食べたい料理を入力…',tagHome:'自炊',tagOut:'外食',tagLeft:'残り物',addFail:'料理名を入力してください。',empty:'選べる候補がありません。少なくとも1つ戻してください。',chosen:'今夜は「{meal}」。もう悩まなくていい。',hidden:'今夜の候補から「{meal}」を外しました。',added:'「{meal}」を候補に追加しました。',store:'MealDriftをApp Storeで見る',disclaimer:'LP用の体験です。保存・AI接続・外部送信は行いません。再読み込みで初期化されます。',count:'選べる候補：{n}件',initial:'ボタンを押すだけ。元気なときの自分が候補を残してくれた。'},
 ar:{eyebrow:'القرار الأخير في يومك',headline:'«أي شيء مناسب»… ثم «ليس هذا».',intro:'لقد اتخذت ما يكفي من القرارات اليوم. احتفظ بالأكلات التي تحبها، ودع الاختيار الأخير لهذه الليلة.',say1:'«ماذا نأكل الليلة؟»',say2:'«أي شيء… لكن ليس هذا»',live:'اختيار الليلة',ready:'قرار أقل هذا المساء.',pick:'اختر وجبة الليلة',again:'اختر مرة أخرى',skip:'ليس الليلة',reset:'ابدأ من جديد',hint:'يمكنك استبعاد وجبة لهذه الليلة وتحديد مدى ظهورها بثلاث درجات.',list:'خياراتك المفضلة',sub:'غيّر تكرار الظهور أو استبعد خيارًا لهذه الليلة. لا يتم حفظ بيانات التجربة.',freq:'معدل الظهور',low:'نادرًا',med:'أحيانًا',high:'غالبًا',hide:'استبعد الليلة',restore:'أعد إلى القائمة',add:'أضف وجبة',placeholder:'وجبة تحب تناولها…',tagHome:'منزلي',tagOut:'مطعم',tagLeft:'بقايا طعام',addFail:'أدخل اسم وجبة أولاً.',empty:'لا توجد خيارات متاحة. أعد خيارًا واحدًا على الأقل.',chosen:'اختيار الليلة: {meal}. قرار أقل.',hidden:'تم استبعاد {meal} لهذه الليلة.',added:'تمت إضافة {meal} إلى الخيارات.',store:'افتح MealDrift',disclaimer:'تجربة على صفحة الويب فقط. لا حفظ للبيانات ولا اتصال بالخادم. إعادة التحميل تعيد البداية.',count:'الخيارات المتاحة: {n}',initial:'اضغط الزر. اختياراتك المفضلة جاهزة.'}
};
const seeds=[
 {id:1,en:'Curry rice',ja:'カレーライス',ar:'أرز بالكاري',tag:'Home',weight:3,hidden:false},
 {id:2,en:'Leftover soup',ja:'昨日のスープ',ar:'حساء متبقٍ',tag:'Left',weight:2,hidden:false},
 {id:3,en:'Pasta',ja:'パスタ',ar:'معكرونة',tag:'Home',weight:2,hidden:false},
 {id:4,en:'Favorite diner',ja:'いつもの定食屋',ar:'المطعم المفضل',tag:'Out',weight:1,hidden:false},
 {id:5,en:'Rice bowl',ja:'親子丼',ar:'طبق أرز',tag:'Home',weight:2,hidden:false}
];
let lang='en',country='us',items=[],selected=null,notice='',seq=10;
const $=(sel,scope=document)=>scope.querySelector(sel);
const t=(key)=>strings[lang][key];
const human=(item)=>item?.[lang]||item?.en||'';
const fmt=(templ,data)=>templ.replace(/\{(\w+)\}/g,(_,key)=>String(data[key]??''));
const resetState=()=>{items=seeds.map(x=>({...x}));selected=null;notice='';seq=10;};
const avail=()=>items.filter(x=>!x.hidden);
const weighted=()=>{const available=avail();const total=available.reduce((n,x)=>n+x.weight,0);if(total<=0)return null;let index=Math.random()*total;for(const x of available){index-=x.weight;if(index<0)return x;}return available.at(-1);};
function create(){
 const root=document.createElement('section'); root.id=ROOT_ID;
 root.innerHTML=`<div class="m-top"><div class="m-brand"><span class="m-brandicon" aria-hidden="true">◒</span><span>MealDrift <span style="color:#91a9ac;font-size:11px;font-weight:600">/ LP EXPERIENCE</span></span></div><div class="m-actions"><select class="m-select" id="mdr296-lang" aria-label="Language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select><select class="m-select" id="mdr296-country" aria-label="App Store region"><option value="us">US App Store</option><option value="jp">JP App Store</option></select></div></div>
 <div class="m-hero"><div><div class="m-eyebrow" data-t="eyebrow"></div><h2 data-t="headline"></h2><p class="m-intro" data-t="intro"></p><div class="m-dialogue"><div class="m-line1" data-t="say1"></div><div class="m-line2" data-t="say2"></div></div><p class="m-note" data-t="hint"></p></div><div class="m-panel"><div class="m-paneltop"><span class="m-live" data-t="live"></span><span id="mdr296-count"></span></div><div class="m-choice" aria-live="polite"><div><span id="mdr296-choice"></span><small id="mdr296-hint"></small></div></div><button type="button" class="m-primary" id="mdr296-pick" data-t="pick"></button><div class="m-results"><button type="button" class="m-secondary" id="mdr296-again" data-t="again"></button><button type="button" class="m-secondary" id="mdr296-skip" data-t="skip"></button></div><div class="m-help" id="mdr296-notice" role="status" aria-live="polite"></div></div></div>
 <div class="m-detail"><h3 data-t="list"></h3><p class="m-sub" data-t="sub"></p><div class="m-items" id="mdr296-items"></div><form class="m-add" id="mdr296-add"><input class="m-input" id="mdr296-input" maxlength="55" autocomplete="off" aria-label="Add a meal"/><button class="m-secondary" type="submit" data-t="add"></button><button class="m-secondary" type="button" id="mdr296-reset" data-t="reset"></button></form></div><div class="m-bottom"><span class="m-disclaimer" data-t="disclaimer"></span><a class="m-store" id="mdr296-store" target="_blank" rel="noopener noreferrer" href="https://apps.apple.com/us/app/mealdrift/id6781817734" data-t="store"></a></div>`;
 const body=document.body;
 // Preserve legacy LP content and prepend a separate, fully-scoped experience.
 body.insertBefore(root,body.firstChild);
 $('#mdr296-lang',root).addEventListener('change',e=>{lang=e.target.value;render(root);});
 $('#mdr296-country',root).addEventListener('change',e=>{country=e.target.value;render(root);});
 $('#mdr296-pick',root).addEventListener('click',()=>{selected=weighted()?.id??null;notice=selected?fmt(t('chosen'),{meal:human(items.find(x=>x.id===selected))}):t('empty');render(root);});
 $('#mdr296-again',root).addEventListener('click',()=>{selected=weighted()?.id??null;notice=selected?fmt(t('chosen'),{meal:human(items.find(x=>x.id===selected))}):t('empty');render(root);});
 $('#mdr296-skip',root).addEventListener('click',()=>{const choice=items.find(x=>x.id===selected);if(!choice){notice=t('initial');render(root);return;}choice.hidden=true;selected=null;notice=fmt(t('hidden'),{meal:human(choice)});render(root);});
 $('#mdr296-reset',root).addEventListener('click',()=>{resetState();render(root);});
 $('#mdr296-add',root).addEventListener('submit',e=>{e.preventDefault();const input=$('#mdr296-input',root);const name=input.value.trim();if(!name){notice=t('addFail');render(root);return;}items.push({id:++seq,en:name,ja:name,ar:name,tag:'Home',weight:2,hidden:false});selected=null;notice=fmt(t('added'),{meal:name});input.value='';render(root);});
 $('#mdr296-items',root).addEventListener('change',e=>{if(e.target.matches('[data-weight]')){const obj=items.find(x=>x.id===Number(e.target.dataset.weight));if(obj){obj.weight=Number(e.target.value);render(root);}}});
 $('#mdr296-items',root).addEventListener('click',e=>{const btn=e.target.closest('[data-toggle]');if(!btn)return;const obj=items.find(x=>x.id===Number(btn.dataset.toggle));if(obj){obj.hidden=!obj.hidden;if(obj.hidden&&selected===obj.id)selected=null;render(root);}});
 resetState();render(root);
}
function render(root){
 root.setAttribute('lang',lang);root.setAttribute('dir',lang==='ar'?'rtl':'ltr');
 $('#mdr296-lang',root).value=lang;$('#mdr296-country',root).value=country;
 root.querySelectorAll('[data-t]').forEach(el=>{el.textContent=t(el.dataset.t);});
 $('#mdr296-store',root).href=`https://apps.apple.com/${country}/app/mealdrift/id6781817734`;
 $('#mdr296-count',root).textContent=fmt(t('count'),{n:avail().length});
 const choice=items.find(x=>x.id===selected);
 $('#mdr296-choice',root).textContent=choice?human(choice):t('ready');
 $('#mdr296-hint',root).textContent=choice?'MealDrift / TONIGHT':'MealDrift / YOUR LIST';
 $('#mdr296-notice',root).textContent=notice||t('initial');
 $('#mdr296-input',root).placeholder=t('placeholder');
 $('#mdr296-skip',root).disabled=!choice;
 const grid=$('#mdr296-items',root);grid.replaceChildren();
 for(const item of items){
  const card=document.createElement('div');card.className='m-item'+(item.hidden?' off':'');
  const label=document.createElement('div');label.className='m-itemname';label.textContent=human(item);
  const tag=document.createElement('div');tag.className='m-tag';tag.textContent=item.tag==='Home'?t('tagHome'):item.tag==='Left'?t('tagLeft'):t('tagOut');
  const row=document.createElement('div');row.className='m-row';
  const l=document.createElement('label');l.textContent=t('freq');l.htmlFor='mdr296-weight-'+item.id;
  const select=document.createElement('select');select.id=l.htmlFor;select.className='m-weight';select.dataset.weight=String(item.id);select.setAttribute('aria-label',human(item)+' '+t('freq'));
  for(const [n,key] of [[1,'low'],[2,'med'],[3,'high']]){const option=document.createElement('option');option.value=n;option.textContent=t(key);option.selected=item.weight===n;select.append(option);}
  row.append(l,select);
  const toggle=document.createElement('button');toggle.type='button';toggle.className='m-toggle';toggle.dataset.toggle=String(item.id);toggle.textContent=t(item.hidden?'restore':'hide');toggle.setAttribute('aria-pressed',String(item.hidden));
  card.append(label,tag,row,toggle);grid.append(card);
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{if(!document.getElementById(ROOT_ID))create();},{once:true});
else if(!document.getElementById(ROOT_ID))create();
})();
