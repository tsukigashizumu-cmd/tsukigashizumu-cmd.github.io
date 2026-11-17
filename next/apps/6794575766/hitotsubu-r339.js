/* Hitotsubu R339 — LP-only illustration; memory only, no real records or external requests. */
(()=>{'use strict';
const ID='tsz-hitotsubu-r339';
const COLORS=['#E9B4A3','#DFBC77','#98B7B1','#C6A5C8'];
const I={
 en:{brand:'HITOTSUBU / ONE GRAIN',kicker:'A SMALL THING THAT REMAINED',title:'You did not do nothing today.',lead:'A meal tasted good. You smiled for a moment. Someone helped. Or you simply made it through. Even when a day felt empty, one small thing may still be there.',select:'What stayed with you today?',picks:['Something tasted good','I smiled a little','Someone helped me','I made it through today'],hint:'Choose a moment. See one grain fall into the bottle.',bottle:'TODAY, ONE GRAIN AT A TIME',count:'grains in this demonstration',final:'It does not have to be a perfect day.',disclosure:'This is an on-page illustration, not your Hitotsubu record. No grain or personal information is saved or sent. The real app keeps grains without editing or deleting them.',announcement:'One grain added. Your day has a place here.',none:'The bottle is ready for one small moment.'},
 ja:{brand:'HITOTSUBU / ひとつぶ',kicker:'今日、残った小さなもの',title:'何もできなかった日にも、残った一粒がある。',lead:'おいしかった。少し笑った。誰かに助けられた。あるいは、今日をなんとか生き抜いた。それだけでも、瓶に残しておきたい日があります。',select:'今日、残っていたのは？',picks:['おいしかった','少し笑った','誰かに助けられた','今日を乗り切った'],hint:'ひとつ選ぶと、瓶に一粒落ちます。',bottle:'今日の、小さな一粒',count:'この画面のサンプル粒数',final:'いい一日でなくても、残していい。',disclosure:'このページ内だけの体験です。Hitotsubu本体の記録には追加されず、内容の保存や送信も行いません。本体では一粒を後から編集・削除できません。',announcement:'一粒、瓶に残しました。',none:'瓶は、小さな出来事を待っています。'},
 ar:{brand:'HITOTSUBU / حبة واحدة',kicker:'شيء صغير بقي اليوم',title:'لم يكن يومك خاليًا تمامًا.',lead:'كان هناك طعام لذيذ. ابتسمت قليلًا. ساعدك أحدهم. أو ربما استطعت فقط أن تتجاوز هذا اليوم. حتى الأيام الثقيلة تترك شيئًا صغيرًا.',select:'ما الذي بقي معك اليوم؟',picks:['كان الطعام لذيذًا','ابتسمت قليلًا','ساعدني أحدهم','تجاوزت هذا اليوم'],hint:'اختر لحظة لتسقط حبة صغيرة داخل الزجاجة.',bottle:'اليوم، حبة بعد أخرى',count:'حبّات في هذه التجربة',final:'لا يجب أن يكون اليوم مثاليًا.',disclosure:'هذه تجربة توضيحية داخل الصفحة فقط، وليست سجلك في Hitotsubu. لا نحفظ الحبات أو المعلومات الشخصية ولا نرسلها. في التطبيق الفعلي، لا يمكن تعديل الحبات أو حذفها.',announcement:'أُضيفت حبة واحدة إلى الزجاجة.',none:'الزجاجة تنتظر لحظة صغيرة.'}
};
const S={lang:'en',grains:[]};let root;
const q=(s)=>root.querySelector(s),all=(s)=>[...root.querySelectorAll(s)],t=()=>I[S.lang];
function mount(){if(document.getElementById(ID))return;
 root=document.createElement('section');root.id=ID;root.setAttribute('aria-label','Hitotsubu one grain illustration');
 root.innerHTML=`<div class="ht-shell"><div class="ht-top"><div class="ht-brand"><span class="ht-brand-mark" aria-hidden="true">✦</span><span data-t="brand"></span></div><div class="ht-langs" role="group" aria-label="Language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></div><div class="ht-grid"><div class="ht-copy"><p class="ht-kicker" data-t="kicker"></p><h2 data-t="title"></h2><p class="ht-lead" data-t="lead"></p><div class="ht-choose"><p class="ht-label" data-t="select"></p><div class="ht-choices" role="group" aria-label="Choose a small moment"><button type="button" class="ht-choice" data-grain="0"><span class="ht-gem" style="--grain:#E9B4A3" aria-hidden="true"></span><span class="ht-choice-text"></span></button><button type="button" class="ht-choice" data-grain="1"><span class="ht-gem" style="--grain:#DFBC77" aria-hidden="true"></span><span class="ht-choice-text"></span></button><button type="button" class="ht-choice" data-grain="2"><span class="ht-gem" style="--grain:#98B7B1" aria-hidden="true"></span><span class="ht-choice-text"></span></button><button type="button" class="ht-choice" data-grain="3"><span class="ht-gem" style="--grain:#C6A5C8" aria-hidden="true"></span><span class="ht-choice-text"></span></button></div><p class="ht-note" data-t="hint"></p></div></div><div class="ht-visual"><span class="ht-visual-kicker" data-t="bottle"></span><div class="ht-bottle-stage"><div class="ht-bottle" role="img" aria-label="A glass bottle gathering illustrated grains"><div class="ht-neck"></div><div class="ht-rim"></div><div class="ht-jarshine"></div><div class="ht-grain-bed" data-out="bed"></div></div><div class="ht-stand"></div></div><div class="ht-count"><span class="ht-number" data-out="count">0</span><span class="ht-count-caption" data-t="count"></span></div></div></div><div class="ht-bottom"><p class="ht-final" data-t="final"></p><p class="ht-disclosure" data-t="disclosure"></p></div><p data-out="announcement" role="status" aria-live="polite" style="position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)"></p></div>`;
 (document.querySelector('main')||document.body).appendChild(root);
 all('[data-lang]').forEach(b=>b.addEventListener('click',()=>{S.lang=b.dataset.lang;render()}));
 all('[data-grain]').forEach(b=>b.addEventListener('click',()=>addGrain(Number(b.dataset.grain))));
 render();
}
function addGrain(type){if(!Number.isInteger(type)||type<0||type>3)return;
 // A quiet, illustrative limit protects rendering; this is not a real record.
 if(S.grains.length>=80){q('[data-out="announcement"]').textContent=t().announcement;return;}
 S.grains.push(type);drawLast();q('[data-out="count"]').textContent=String(S.grains.length);
 q('[data-out="announcement"]').textContent=t().announcement;
}
function drawLast(){let idx=S.grains.length-1,type=S.grains[idx];const grain=document.createElement('span');grain.className='ht-jar-grain';grain.setAttribute('aria-hidden','true');grain.style.setProperty('--g',COLORS[type]);
 const cols=12,col=idx%cols,row=Math.floor(idx/cols);const stagger=(idx*7)%5;grain.style.left=`${3+col*7.8+stagger*.32}%`;grain.style.bottom=`${Math.min(185,row*11+(idx%3)*2)}px`;grain.style.setProperty('--rot',`${(idx*47)%135-50}deg`);
 q('[data-out="bed"]').appendChild(grain);
}
function render(){root.lang=S.lang;root.dir=S.lang==='ar'?'rtl':'ltr';all('[data-t]').forEach(el=>{el.textContent=t()[el.dataset.t]||''});
 all('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===S.lang)));
 all('[data-grain]').forEach(b=>{let index=Number(b.dataset.grain);b.querySelector('.ht-choice-text').textContent=t().picks[index];b.setAttribute('aria-label',t().picks[index])});
 q('[data-out="count"]').textContent=String(S.grains.length);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
