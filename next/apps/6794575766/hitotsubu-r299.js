/* R299 Hitotsubu LP only: one click adds a visual grain to a session-only jar. */
(() => {
  "use strict";
  const ROOT_ID = "tsz-r299";
  if (document.getElementById(ROOT_ID)) return;
  const strings = {
    en: {
      brow:"HITOTSUBU · A PLACE FOR SMALL MOMENTS",
      title:"An ordinary day still leaves one grain.",
      lead:"Something tasted good. I smiled. Someone helped me. I made it through today.",
      detail:"No grand achievement. No long diary. Choose one small moment and watch it settle in the bottle.",
      prompt:"What would you leave from today?",
      kinds:["Tasted good","Looked beautiful","I smiled","I felt relieved","Someone helped","I made it through"],
      bottle:"GRAINS IN THIS DEMO", unit:" grains", empty:"One tap is enough.",
      one:"One small grain, kept for today.", many:"Every grain is a moment you lived.",
      latest:"Added: ", footer:"In the app, grains cannot be edited or deleted. This page is a temporary, illustrative demo; refreshing clears it. The bottle graphic and arrangement are not the app's actual storage layout.",
      store:"See Hitotsubu on the App Store", language:"Language", region:"App Store", countSuffix:" grains", initial:"Choose a moment to place your first grain."
    },
    ja: {
      brow:"HITOTSUBU · 小さな出来事の保存場所",
      title:"何もなかった一日にも、一粒を。",
      lead:"おいしかった。少し笑えた。助かった。今日を乗り切った。",
      detail:"大きな達成も、長い日記もいらない。残しておきたい瞬間をひとつ選ぶだけ。",
      prompt:"今日、残しておきたいのは？",
      kinds:["おいしかった","きれいだった","少し笑えた","ほっとした","助けてもらった","今日を乗り切った"],
      bottle:"このデモの粒", unit:"粒", empty:"一回のタップで、十分。",
      one:"今日の小さな一粒が残りました。", many:"どの一粒も、生きてきた時間。",
      latest:"追加：", footer:"アプリ内の粒は編集・削除できません。このページは一時的な体験用デモです。ページを再読み込みすると消えます。瓶の見た目や粒の配置はアプリ本体とは異なります。",
      store:"App StoreでHitotsubuを見る", language:"言語", region:"App Store", countSuffix:"粒", initial:"ひとつ選んで、最初の一粒を残してみよう。"
    },
    ar: {
      brow:"HITOTSUBU · مكان للحظات الصغيرة",
      title:"حتى اليوم العادي يترك حبة صغيرة.",
      lead:"كان الطعام لذيذاً. ابتسمت قليلاً. ساعدني أحدهم. تجاوزت هذا اليوم.",
      detail:"لا حاجة إلى إنجاز كبير أو مذكرات طويلة. اختر لحظة صغيرة وشاهدها تستقر في الزجاجة.",
      prompt:"ما اللحظة التي تريد الاحتفاظ بها اليوم؟",
      kinds:["كان لذيذاً","كان جميلاً","ابتسمت","شعرت بالراحة","ساعدني أحد","تجاوزت اليوم"],
      bottle:"حبات في هذا العرض", unit:" حبات", empty:"لمسة واحدة تكفي.",
      one:"حبة صغيرة من هذا اليوم.", many:"كل حبة تذكير بلحظة عشتها.",
      latest:"أُضيفت: ", footer:"لا يمكن تعديل الحبات أو حذفها في التطبيق. هذا عرض توضيحي مؤقت؛ تُمسح الحبات عند تحديث الصفحة. شكل الزجاجة وترتيب الحبات هنا للتوضيح فقط.",
      store:"شاهد Hitotsubu على App Store", language:"اللغة", region:"متجر التطبيقات", countSuffix:" حبات", initial:"اختر لحظة لتضع أول حبة."
    }
  };
  const params = new URLSearchParams(location.search);
  const languageGuess = (params.get("r299lang") || params.get("lang") || document.documentElement.lang || "en").toLowerCase();
  const state = {lang:languageGuess.startsWith("ar") ? "ar" : languageGuess.startsWith("ja") ? "ja" : "en", country:(params.get("r299country") || params.get("country") || "us").toLowerCase()==="jp" ? "jp" : "us",entries:[]};
  const mount = document.createElement("section");
  mount.id=ROOT_ID;
  mount.setAttribute("aria-label","Hitotsubu small moments demo");
  mount.innerHTML=`<div class="r299-shell">
     <div class="r299-head"><span class="r299-eyebrow" id="r299-brow"></span>
       <div class="r299-selects">
        <select id="r299-language" aria-label="Language"><option value="en">English</option><option value="ja">日本語</option><option value="ar">العربية</option></select>
        <select id="r299-country" aria-label="App Store region"><option value="us">US App Store</option><option value="jp">JP App Store</option></select>
       </div></div>
     <div class="r299-columns"><div class="r299-copy"><h2 id="r299-title"></h2><p class="r299-lead" id="r299-lead"></p><p class="r299-detail" id="r299-detail"></p><div class="r299-prompt" id="r299-prompt"></div><div class="r299-actions" id="r299-actions"></div><p class="r299-note" id="r299-note"></p></div>
     <div class="r299-vessel"><div class="r299-vessel-head"><span class="r299-vessel-label" id="r299-vessel-label"></span><strong class="r299-count" id="r299-count">0</strong></div>
       <div class="r299-bottle-wrap" aria-hidden="true"><div class="r299-bottle-lip"></div><div class="r299-bottle-neck"></div><div class="r299-glass" id="r299-glass"></div></div>
       <p class="r299-vessel-sub" id="r299-vessel-sub"></p><div class="r299-last" id="r299-last" role="status" aria-live="polite"></div></div></div>
     <div class="r299-foot"><p class="r299-footnote" id="r299-footer"></p><a class="r299-store" id="r299-store" target="_blank" rel="noopener noreferrer"></a></div>
   </div>`;
  const target = document.getElementById("tsz-hitotsubu-host") || document.querySelector(".p19-footer");
  if (target) target.parentNode.insertBefore(mount,target);
  else (document.querySelector(".p19-shell") || document.body).appendChild(mount);
  const $=(id)=>mount.querySelector("#"+id);
  const tones=["#e7c28a","#dc9d84","#d0c49a","#b3c5a9","#c0b6dc","#d1d8ce"];
  const setText=(id,value)=>{$(id).textContent=value;};
  function renderGrains() {
    const glass=$("r299-glass"); glass.replaceChildren();
    const entries=state.entries.slice(-36);
    entries.forEach((kind,i)=>{
      const grain=document.createElement("span"); grain.className="r299-grain";
      const x=15 + (i%6)*14 + (Math.floor(i/6)%2)*3;
      const y=7 + Math.floor(i/6)*13;
      grain.style.left=x+"%";grain.style.bottom=y+"%";
      grain.style.setProperty("--grain-color",tones[kind]);
      grain.style.setProperty("--grain-rotation",(((i*41)%65)-32)+"deg");
      glass.appendChild(grain);
    });
  }
  function paint(){
    const t=strings[state.lang]; mount.dir=state.lang==="ar"?"rtl":"ltr";mount.lang=state.lang;
    $("r299-language").value=state.lang;$("r299-country").value=state.country;
    for(const [id,key] of [["r299-brow","brow"],["r299-title","title"],["r299-lead","lead"],["r299-detail","detail"],["r299-prompt","prompt"],["r299-vessel-label","bottle"],["r299-footer","footer"],["r299-store","store"]])setText(id,t[key]);
    setText("r299-note",t.empty);
    const actions=$("r299-actions");actions.replaceChildren();
    t.kinds.forEach((label,index)=>{
      const button=document.createElement("button");button.type="button";button.dataset.grain=String(index);button.setAttribute("aria-label",label);
      const caption=document.createElement("span");caption.textContent=label;
      const plus=document.createElement("span");plus.className="r299-plus";plus.textContent="+";plus.setAttribute("aria-hidden","true");
      button.append(caption,plus);button.addEventListener("click",()=>{
        state.entries.push(index);renderGrains();paintCount(index);
      });actions.appendChild(button);
    });
    $("r299-store").href=`https://apps.apple.com/${state.country}/app/id6794575766`;
    paintCount();
  }
  function paintCount(last=null){
    const t=strings[state.lang];setText("r299-count",String(state.entries.length)+t.countSuffix);
    setText("r299-vessel-sub",state.entries.length===0?t.empty:(state.entries.length===1?t.one:t.many));
    const kind=last===null ? state.entries[state.entries.length-1] : last;
    setText("r299-last",kind===undefined?t.initial:t.latest+t.kinds[kind]);
  }
  $("r299-language").addEventListener("change",e=>{state.lang=e.target.value;paint();});
  $("r299-country").addEventListener("change",e=>{state.country=e.target.value;paint();});
  paint();renderGrains();
})();
