/* R303 Quiet Reserve — LP-only, ephemeral waterline entry. No storage, network or diagnosis. */
(function(){'use strict';
const APP='6775229100';
const I={
 en:{eyebrow:'QUIET RESERVE · A SMALL RECORD',title:'After the crowd, there was nothing left.',desc:'You do not have to explain the whole day. Choose what wore you down, and mark how much you have left.',demo:'INTERACTIVE LP EXAMPLE',one:'01 / WHAT WORE YOU DOWN?',two:'02 / HOW MUCH IS LEFT?',high:'Plenty left',low:'Almost empty',three:'03 / WHAT HELPED? (OPTIONAL)',save:'Record this moment',reset:'Start over',water:'YOUR CURRENT RESERVE',hist:'THIS PAGE ONLY · RECENT ENTRIES',empty:'No entries yet. One is enough.',saved:'Recorded here for this visit only.',none:'Nothing selected yet',fine:'A small interactive sample, not a diagnosis or assessment. Entries disappear when you leave or reload this page. No data is saved, transmitted or tracked.',store:'See Quiet Reserve in the App Store',tag:['Crowds','Notifications','Changed plans','Harsh tone','Loud sounds','Waiting for a reply'],cope:['Not recorded','Quiet time','Step outside','Put the phone away','Rest'],out:'left',record:'Record',level:'% left'},
 ja:{eyebrow:'QUIET RESERVE · 静かな記録',title:'人混みから帰ったら、もう何もできなかった。',desc:'一日のすべてを説明しなくていい。何で疲れたか、今どれくらい余力が残っているか。それだけ残す。',demo:'LP専用の操作体験',one:'01 / 何で疲れた？',two:'02 / 今の余力は？',high:'まだ余裕がある',low:'ほとんど残っていない',three:'03 / 少し楽になったこと（任意）',save:'この瞬間を記録',reset:'最初から',water:'今の余力',hist:'このページだけの記録',empty:'記録はまだありません。一件からでいい。',saved:'このページ内に記録しました。',none:'まだ選択していません',fine:'これはLP専用の簡易体験で、診断や評価ではありません。記録は再読み込み・移動で消え、保存・送信・追跡されません。',store:'App StoreでQuiet Reserveを見る',tag:['人混み','通知','予定変更','強い口調','大きな音','返事待ち'],cope:['記録しない','静かな時間','外へ出る','スマホを置く','休む'],out:'残っている',record:'記録',level:'%残り'},
 ar:{eyebrow:'QUIET RESERVE · ملاحظة هادئة',title:'بعد الزحام، لم تبقَ لدي طاقة.',desc:'لا تحتاج إلى شرح يومك كله. اختر ما أتعبك، وسجّل مقدار الطاقة المتبقية لديك.',demo:'تجربة تفاعلية للصفحة',one:'01 / ما الذي أتعبك؟',two:'02 / كم تبقّى لديك؟',high:'ما زالت لدي طاقة',low:'لم يتبقَّ الكثير',three:'03 / ما الذي ساعدك؟ (اختياري)',save:'سجّل هذه اللحظة',reset:'ابدأ من جديد',water:'طاقتك المتبقية الآن',hist:'سجلات هذه الصفحة فقط',empty:'لا توجد سجلات بعد. سجل واحد يكفي.',saved:'تم التسجيل في هذه الصفحة فقط.',none:'لم تختر شيئًا بعد',fine:'هذه تجربة مبسطة للصفحة، وليست تشخيصًا أو تقييمًا. تختفي السجلات عند إعادة تحميل الصفحة أو مغادرتها. لا تُحفظ البيانات ولا تُرسل ولا يتم تتبعها.',store:'شاهد Quiet Reserve في App Store',tag:['الزحام','الإشعارات','تغيّر الخطط','نبرة قاسية','أصوات عالية','انتظار الرد'],cope:['دون تسجيل','وقت هادئ','الخروج قليلًا','إبعاد الهاتف','الراحة'],out:'متبقية',record:'سجل',level:'% متبقية'}
};
const $=(root,s)=>root.querySelector(s);
function lang(){const select=document.getElementById('p199-language');const val=(select?.value||document.documentElement.lang||'en').toLowerCase();return val.startsWith('ar')?'ar':val.startsWith('ja')?'ja':'en';}
function store(){const el=document.getElementById('p199-country');return (el?.value||'US').toLowerCase().includes('jp')?'jp':'us';}
function init(){if(document.getElementById('tsz-r303'))return;
 const shell=document.querySelector('.p19-shell');if(!shell)return;
 const section=document.createElement('section');section.id='tsz-r303';section.setAttribute('aria-label','Quiet Reserve interactive LP sample');
 section.innerHTML=`<div class="r303-heading"><div><div class="r303-eyebrow"><span class="r303-dot"></span><span data-r303="eyebrow"></span></div><h2 data-r303="title"></h2><p class="r303-description" data-r303="desc"></p></div><span class="r303-chip" data-r303="demo"></span></div>
 <div class="r303-layout"><div class="r303-form"><h3 class="r303-step" data-r303="one"></h3><div class="r303-tag-grid" id="r303-tags"></div><h3 class="r303-step r303-step-second" data-r303="two"></h3><div class="r303-slider-wrap"><input id="r303-slider" type="range" min="0" max="100" step="5" value="35" aria-label="Current reserve level" /></div><div class="r303-ends"><span data-r303="low"></span><span data-r303="high"></span></div><h3 class="r303-step r303-step-second" data-r303="three"></h3><select id="r303-cope" aria-label="Optional coping action"></select><div class="r303-actions"><button type="button" class="r303-primary" id="r303-save" data-r303="save"></button><button type="button" class="r303-secondary" id="r303-reset" data-r303="reset"></button></div><p class="r303-message" role="status" aria-live="polite" id="r303-message"></p></div>
 <div class="r303-water-card"><div class="r303-overview"><span class="r303-overview-label" data-r303="water"></span><b id="r303-value" aria-live="polite">35%</b></div><div class="r303-water" role="img" aria-label="Current reserve as a water level"><div class="r303-water-fill" id="r303-fill"></div><span class="r303-water-text">QUIET RESERVE</span></div><div class="r303-history-header"><span data-r303="hist"></span><span class="r303-counter" id="r303-count">0</span></div><ul class="r303-history" id="r303-history"></ul></div></div>
 <p class="r303-disclaimer" data-r303="fine"></p><a class="r303-store" id="r303-store" href="https://apps.apple.com/us/app/id6775229100" target="_blank" rel="noopener noreferrer" data-r303="store"></a>`;
 const anchor=shell.querySelector('.p19-footer');if(anchor)anchor.parentNode.insertBefore(section,anchor);else shell.appendChild(section);
 let tag=0,level=35,cope=0,entries=[],message='';
 const slider=$(section,'#r303-slider');
 function render(){const locale=lang(),w=I[locale];section.lang=locale;section.dir=locale==='ar'?'rtl':'ltr';
  for(const el of section.querySelectorAll('[data-r303]'))el.textContent=w[el.dataset.r303];
  const tags=$(section,'#r303-tags');tags.replaceChildren();w.tag.forEach((name,i)=>{const button=document.createElement('button');button.type='button';button.className='r303-tag';button.textContent=name;button.setAttribute('aria-pressed',String(i===tag));button.addEventListener('click',()=>{tag=i;message='';render()});tags.append(button)});
  const choices=$(section,'#r303-cope');choices.replaceChildren();w.cope.forEach((n,i)=>{const option=document.createElement('option');option.value=String(i);option.textContent=n;choices.append(option)});choices.value=String(cope);
  const value=$(section,'#r303-value');value.textContent=level+'%';slider.value=String(level);slider.setAttribute('aria-label',w.water);$(section,'#r303-fill').style.height=level+'%';
  $(section,'.r303-water').setAttribute('aria-label',w.water+' '+level+'%');$(section,'#r303-message').textContent=message?w.saved:'';
  $(section,'#r303-count').textContent=String(entries.length);
  const hist=$(section,'#r303-history');hist.replaceChildren();if(entries.length===0){const empty=document.createElement('li');empty.className='r303-history-empty';empty.textContent=w.empty;hist.append(empty);}else{entries.slice(-3).reverse().forEach(e=>{const li=document.createElement('li');const name=document.createElement('span');name.textContent=w.tag[e.tag]+' · '+(e.cope?w.cope[e.cope]:'');const num=document.createElement('strong');num.textContent=e.level+'%';li.append(name,num);hist.append(li);});}
  $(section,'#r303-store').href='https://apps.apple.com/'+store()+'/app/id'+APP;
 }
 slider.addEventListener('input',()=>{level=Number(slider.value);message='';render()});
 $(section,'#r303-cope').addEventListener('change',e=>{cope=Number(e.target.value)||0;message='';render()});
 $(section,'#r303-save').addEventListener('click',()=>{entries.push({tag,level,cope});message='saved';render()});
 $(section,'#r303-reset').addEventListener('click',()=>{tag=0;level=35;cope=0;entries=[];message='';render()});
 for(const id of ['p199-language','p199-country'])document.getElementById(id)?.addEventListener('change',render);
 new MutationObserver(()=>{if(section.lang!==lang())render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 render();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
