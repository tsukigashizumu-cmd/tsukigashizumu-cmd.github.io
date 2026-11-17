/* R313 Bacchus Karma: local, self-contained interactive explanation. */
(() => {
  'use strict';
  const TEXT={
    en:{eyebrow:'BACCHUS KARMA / INTERACTIVE PREVIEW',title:'You choose what gets drawn next.',lead:'Build a board, change how often each shape appears, then draw the next block. The rules begin with your choices.',weight:'Choose appearance weights',hint:'These are relative weights, not guarantees. Try making straight pieces more common.',balanced:'Balanced',straight:'More straight',twisty:'More L pieces',draw:'Draw a piece',clear:'Reset board',board:'Set your starting board',boardHint:'Tap squares to place or remove starting blocks.',next:'NEXT PIECE',waiting:'Ready',names:['Straight','L shape','Square'],idle:'Adjust the odds, then draw.',drawn:'You drew: ',none:'Set at least one weight above zero.',cell:'Board square',note:'LP-only illustration. Drawing and board editing here do not reproduce the actual game’s full rules. No data is saved or sent.',store:'Explore on App Store'},
    ja:{eyebrow:'BACCHUS KARMA / 操作型プレビュー',title:'次に出るピースの運も、自分で決める。',lead:'まず盤面を作る。次にピースの出現しやすさを決める。自分で決めた条件から、一つ引いてみよう。',weight:'ピースの出現比率を決める',hint:'数字は相対的な重みです。必ずその割合で出るわけではありません。',balanced:'均等',straight:'棒を多め',twisty:'L字を多め',draw:'次のピースを引く',clear:'盤面を戻す',board:'最初の盤面を決める',boardHint:'マスを押すとブロックを置く・外すができます。',next:'次のピース',waiting:'準備完了',names:['棒','L字','四角'],idle:'比率を決めたら、ピースを引いてみよう。',drawn:'今回のピース：',none:'比率を一つ以上、0より大きくしてください。',cell:'盤面のマス',note:'LP専用の簡易デモです。ゲーム本体の落下・得点・時間制限は再現しません。保存・外部送信は行いません。',store:'App Storeで見る'},
    ar:{eyebrow:'BACCHUS KARMA / معاينة تفاعلية',title:'أنت من يحدد القطعة التالية.',lead:'كوّن اللوحة، وحدد مدى شيوع كل شكل، ثم اسحب القطعة التالية وفق اختيارك.',weight:'اختر أوزان ظهور القطع',hint:'الأرقام أوزان نسبية وليست ضمانًا للنتائج.',balanced:'متوازن',straight:'المستقيم أكثر',twisty:'حرف L أكثر',draw:'اسحب قطعة',clear:'إعادة اللوحة',board:'صمم لوحة البداية',boardHint:'اضغط المربعات لإضافة الكتل أو إزالتها.',next:'القطعة التالية',waiting:'جاهز',names:['مستقيم','شكل L','مربع'],idle:'اختر الأوزان ثم اسحب قطعة.',drawn:'القطعة المختارة: ',none:'اجعل وزنًا واحدًا على الأقل أكبر من الصفر.',cell:'مربع اللوحة',note:'هذه تجربة مبسطة داخل الصفحة، وليست قواعد اللعبة الكاملة. لا يوجد حفظ أو إرسال بيانات.',store:'شاهد التطبيق على App Store'}
  };
  const SHAPES=[[[0,1],[1,1],[2,1]],[[0,0],[1,0],[2,0],[2,1]],[[0,0],[0,1],[1,0],[1,1]]];
  const initial=[2,3,8,15,29];
  function setup(host){
    const section=document.createElement('section');section.id='bacchus-r313';section.setAttribute('aria-label','Bacchus Karma interactive preview');
    host.appendChild(section);
    let lang='en', weights=[3,3,3], preset='balanced', board=new Set(initial), picked=null, count=0;
    section.innerHTML=`<div class="bk313-shell"><div class="bk313-top"><div><div class="bk313-kicker" data-t="eyebrow"></div><h2 data-t="title"></h2><p class="bk313-lead" data-t="lead"></p></div><div class="bk313-languages" role="group" aria-label="Language"><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日本語</button><button type="button" data-lang="ar">العربية</button></div></div><div class="bk313-layout"><div class="bk313-panel"><h3 class="bk313-subhead" data-t="weight"></h3><p class="bk313-hint" data-t="hint"></p><div class="bk313-presets"><button type="button" data-preset="balanced" data-t="balanced"></button><button type="button" data-preset="straight" data-t="straight"></button><button type="button" data-preset="twisty" data-t="twisty"></button></div><div class="bk313-weight"><span class="bk313-symbol">I</span><input type="range" data-weight="0" min="0" max="8" step="1" value="3"><output data-share="0">33%</output></div><div class="bk313-weight"><span class="bk313-symbol">L</span><input type="range" data-weight="1" min="0" max="8" step="1" value="3"><output data-share="1">33%</output></div><div class="bk313-weight"><span class="bk313-symbol">▣</span><input type="range" data-weight="2" min="0" max="8" step="1" value="3"><output data-share="2">34%</output></div><div class="bk313-actions"><button type="button" class="bk313-primary" data-action="draw" data-t="draw"></button><button type="button" class="bk313-secondary" data-action="clear" data-t="clear"></button></div><div class="bk313-status" role="status" aria-live="polite" data-state="normal"></div></div><div class="bk313-panel"><h3 class="bk313-subhead" data-t="board"></h3><p class="bk313-hint" data-t="boardHint"></p><div class="bk313-boardwrap"><div class="bk313-board" role="group"></div><div class="bk313-next"><div class="bk313-nextlabel" data-t="next"></div><div class="bk313-shape" aria-hidden="true"></div><div class="bk313-nextname"></div></div></div></div></div><div class="bk313-bottom"><p class="bk313-note" data-t="note"></p><a class="bk313-store" href="https://apps.apple.com/us/app/id6761338604" target="_blank" rel="noopener noreferrer" data-t="store"></a></div></div>`;
    const $=sel=>section.querySelector(sel),$$=sel=>[...section.querySelectorAll(sel)];
    const cells=$('.bk313-board');
    for(let i=0;i<36;i++){const b=document.createElement('button');b.type='button';b.className='bk313-cell';b.dataset.cell=i;b.setAttribute('aria-pressed','false');cells.appendChild(b);}
    const preview=$('.bk313-shape');for(let i=0;i<9;i++){const d=document.createElement('span');d.className='bk313-square';preview.appendChild(d);}
    function render(){
      const t=TEXT[lang];section.setAttribute('dir',lang==='ar'?'rtl':'ltr');section.setAttribute('lang',lang);
      $$('[data-t]').forEach(el=>el.textContent=t[el.dataset.t]);
      $$('[data-lang]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.lang===lang)));
      $$('[data-preset]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.preset===preset)));
      $$('[data-weight]').forEach((el,i)=>{el.value=weights[i];el.setAttribute('aria-label',t.names[i]);});
      const total=weights.reduce((a,b)=>a+b,0);const percentages=total?weights.map(v=>Math.round(100*v/total)):[0,0,0];
      $$('[data-share]').forEach((el,i)=>el.textContent=percentages[i]+'%');
      $$('[data-cell]').forEach((el,i)=>{const filled=board.has(i);el.dataset.filled=String(filled);el.setAttribute('aria-pressed',String(filled));el.setAttribute('aria-label',t.cell+' '+(i+1));});
      $$('.bk313-square').forEach((el,i)=>{const on=picked!==null&&SHAPES[picked].some(([r,c])=>r*3+c===i);el.dataset.on=String(on);});
      $('.bk313-nextname').textContent=picked===null?t.waiting:t.names[picked];
      $('.bk313-status').textContent=total===0?t.none:picked===null?t.idle:t.drawn+t.names[picked]+' · #'+count;
      $('.bk313-status').dataset.state=total===0?'error':'normal';
      $('[data-action="draw"]').disabled=total===0;
    }
    section.addEventListener('click',e=>{
      const btn=e.target.closest('button');if(!btn||!section.contains(btn))return;
      if(btn.dataset.lang){lang=btn.dataset.lang;render();return;}
      if(btn.dataset.preset){preset=btn.dataset.preset;weights=({balanced:[3,3,3],straight:[7,1,1],twisty:[1,7,1]})[preset].slice();render();return;}
      if(btn.dataset.cell!==undefined){const k=Number(btn.dataset.cell);board.has(k)?board.delete(k):board.add(k);render();return;}
      if(btn.dataset.action==='clear'){board=new Set(initial);picked=null;count=0;render();return;}
      if(btn.dataset.action==='draw'){const sum=weights.reduce((a,b)=>a+b,0);if(sum<=0)return;let n=Math.random()*sum;let index=0;while(index<weights.length-1 && n>=weights[index]){n-=weights[index];index++;}picked=index;count++;render();}
    });
    section.addEventListener('input',e=>{const input=e.target.closest('[data-weight]');if(!input||!section.contains(input))return;weights[Number(input.dataset.weight)]=Number(input.value);preset='custom';render();});
    render();
  }
  function mount(){if(document.getElementById('bacchus-r313'))return;const stand=document.getElementById('bk313-preview-root');if(stand){setup(stand);return;}const related=document.getElementById('related');if(related&&related.parentElement){const div=document.createElement('div');div.id='bk313-integration';related.parentElement.insertBefore(div,related);setup(div);return;}const main=document.querySelector('main');if(main){setup(main);return;}setup(document.body);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
