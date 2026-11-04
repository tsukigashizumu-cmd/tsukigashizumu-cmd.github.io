/* Good Person Test P19_9R6R9R28R2. Ten actual Apple screenshots per region. No preview video was available; none is invented. Only this application's DOM is affected. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6769388691') return;
  const holder=document.getElementById('p199-gallery');
  if (!holder) return;
  const APP=6769388691;
  const MANIFEST='./tsz-goodperson-images.json?v=p19-r28r2';
  const COPY={"jp":{"ja":[["あなたの「善人ぶり」は、どのタイプ？","10問の選択で、自分の「いい人」の振る舞いを振り返る診断。20種類のタイプから結果が表示されます。"],["答え方に、価値観が出る。","1日パスを買ったお客様への対応を考える設問。選択肢によって、優先することが見えてきます。"],["公平性クラッシャー","一人を助けるために、見えない誰かへ負担が回る。善意と公平性のずれを描く結果カード。"],["善意の感染源","責任を抱え込まずに広がっていく親切。気持ちの連鎖を描いた結果カード。"],["仕組み化の鬼","個人の努力よりも、再現できるルールを重視する。仕組みで優しさを回すタイプ。"],["沈黙の店長","衝突を避けて静かにやり過ごすことも、選択のひとつ。その影響を考えさせるカード。"],["優しいスタッフ依存症","優しさが特定の人に集中すると、そこに負担が生まれる。チームの関係を描くタイプ。"],["感情労働の王","人の気持ちを受け止め続ける優しさ。無理のない距離感を問いかける結果。"],["隠れコスト職人","その場をきれいに収める裏側で、誰かの手間が増える。見えないコストに目を向ける。"],["正論で刺す人","ルールは守れても、言葉が相手を傷つけることがある。正しさと温かさの違いを描く。"]],"en":[["Your “good-person” type","The Japanese start screen introduces the 10-choice diagnosis and the different types it can reveal."],["What would you do?","A day-pass scenario presents three different responses. Your choices reflect how you handle fairness and compassion."],["Fairness Crusher","A good deed helps one person but quietly shifts the burden to someone else."],["Source of Goodwill","Kindness can spread when responsibility does not stay with one individual."],["The System Builder","Let a dependable process support people instead of expecting endless personal sacrifice."],["Silent Manager","Keeping quiet avoids conflict, but does it resolve what matters?"],["Dependence on Kind Staff","Everyone looks to the kindest person, until they become the one doing all the work."],["King of Emotional Labor","Carrying other people’s feelings can become its own burden."],["Hidden Cost Maker","A neat solution may shift the work to someone who gets no credit."],["The Blunt Rule Follower","Being correct does not always mean being kind."]]},"us":{"ja":[["「いい人」の選択を、10問で。","英語版の開始画面。10問に答えると、20種類の善人ぶりタイプから結果が現れます。"],["その場でどう対応する？","1日パスを購入したお客さんが早く帰るとき、どうするか。価値観が表れる設問です。"],["Fairness Crusher｜公平性の代償","目の前の一人を助ける選択が、別の誰かに負担を移すことも。"],["Goodwill Source｜広がる善意","気持ちよい親切が、ひとりの負担にならずに周囲へ伝わっていく。"],["Policy Demon｜仕組みで決める","善意を個人の犠牲に頼らず、仕組みやルールで実現する。"],["Silent Manager｜静かな管理者","争いを避けて静かにすることが、いつも解決とは限らない。"],["Kind Staff Dependency｜優しさへの依存","親切な人に仕事が集まり続けると、やがてその人が疲れてしまう。"],["Emotional Labor King｜感情労働","他人の気持ちを抱え込みすぎないための距離感を問いかける。"],["Hidden Cost Crafter｜見えない負担","問題が解消したように見えても、どこかにしわ寄せが残る。"],["Blunt Rule Keeper｜正しさと優しさ","決まりを守ることと、人を傷つけないことは同じではない。"]],"en":[["What kind of “good person” are you?","Make 10 choices and discover a result among 20 good-person archetypes, each with a slightly sharp sense of humor."],["A small choice can say a lot.","A day-pass scenario asks what to do when a customer leaves early. Compare the possible responses before you choose."],["Fairness Crusher","A helpful act for one person may leave an unseen cost for someone else. This result explores that tension."],["Goodwill Source","Kindness spreads beyond one person, without requiring them to carry every responsibility alone."],["Policy Demon","Let the system carry decisions instead of relying on personal sacrifice or pressure."],["Silent Manager","Avoiding conflict may keep things quiet for now. This result asks what silence really accomplishes."],["Kind Staff Dependency","When everyone depends on one kind colleague, that person may bear the hidden cost."],["Emotional Labor King","Holding other people’s feelings takes work. Kindness should not turn into a cage."],["Hidden Cost Crafter","The problem looks solved, but the burden may have moved somewhere less visible."],["Blunt Rule Keeper","Following the rule can still leave someone hurt. The result questions whether being right is enough."]]}};
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
  const lang=()=>/^ja(?:[-_]|$)/i.test(document.getElementById('p199-language')?.value||document.documentElement.lang||'')?'ja':'en';
  const country=()=>/^jp$/i.test(document.getElementById('p199-country')?.value||'')?'jp':'us';
  const state={manifest:null,selected:0,lang:'',region:'',stage:null,scheduled:false,drawing:false};
  function validateManifest(value){
    if(!value||value.apple_id!==APP||!value.regions)throw Error('MANIFEST_APP_ID_MISMATCH');
    for(const region of ['us','jp']){
      const arr=value.regions[region];
      if(!Array.isArray(arr)||arr.length!==10||new Set(arr).size!==10)throw Error('TEN_UNIQUE_SCREENSHOTS_REQUIRED_'+region);
      if(!arr.every(url=>/^\.\/tsz-goodperson-assets\/(JP|US)\/[0-9]{2}\.jpg$/.test(url) && url.includes('/'+region.toUpperCase()+'/')))throw Error('INVALID_LOCAL_IMAGE_PATH_'+region);
    }
    return value;
  }
  function createStage(images,language,region){
    const japanese=language==='ja', count=images.length, copy=COPY[region][language];
    const stage=make('section','tsz-goodperson-stage');stage.id='tsz-goodperson-r28r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(count);
    stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-goodperson-top');
    top.append(make('span','tsz-goodperson-kicker','APP / SCREEN COLLECTION'),make('span','tsz-goodperson-total',japanese?`実画面 ${String(count).padStart(2,'0')}`:`${String(count).padStart(2,'0')} SCREENS`));
    const layout=make('div','tsz-goodperson-layout');
    const visual=make('div','tsz-goodperson-visual');
    const picture=make('img','tsz-goodperson-image');picture.loading='eager';
    const error=make('p','tsz-goodperson-image-error',japanese?'画像を表示できませんでした。':'Screenshot could not be displayed.');error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});
    picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(picture,error);
    const side=make('div','tsz-goodperson-side');side.append(top);
    const editorial=make('div','tsz-goodperson-editorial');
    const issue=make('span','tsz-goodperson-issue');const headline=make('h3','tsz-goodperson-headline');const body=make('p','tsz-goodperson-body');
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-goodperson-controls');
    const nav=make('div','tsz-goodperson-nav');const expand=make('button','tsz-goodperson-expand',japanese?'画面を拡大':'Enlarge screenshot');expand.type='button';
    const prev=make('button','tsz-goodperson-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-goodperson-counter');
    const next=make('button','tsz-goodperson-arrow','›');next.type='button';
    prev.setAttribute('aria-label',japanese?'前の画像':'Previous screenshot');next.setAttribute('aria-label',japanese?'次の画像':'Next screenshot');
    const navRight=make('div','tsz-goodperson-nav-right');navRight.append(prev,counter,next);
    nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-goodperson-thumbs');const buttons=[];
    for(let n=0;n<count;n++){
      const button=make('button','tsz-goodperson-thumb');button.type='button';
      button.title=`${japanese?'画像':'Screenshot'} ${String(n+1).padStart(2,'0')}`;button.setAttribute('aria-label',button.title);
      const thumb=make('img','');thumb.src=images[n];thumb.loading='lazy';thumb.alt='';
      button.append(thumb,make('span','',String(n+1).padStart(2,'0')));
      button.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===button)button.blur();});
      buttons.push(button);thumbs.append(button);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-goodperson-dialog');
    const close=make('button','tsz-goodperson-dialog-close',japanese?'閉じる':'Close');close.type='button';
    const full=make('img','tsz-goodperson-dialog-image');full.alt='';
    dialog.append(close,full);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(index){
      selected=(index+count)%count;state.selected=selected;
      picture.src=images[selected];picture.alt=`Good Person Test ${japanese?'実画面':'screenshot'} ${String(selected+1).padStart(2,'0')}`;
      issue.textContent=`${japanese?'実画面':'SCREEN'} ${String(selected+1).padStart(2,'0')}`;
      headline.textContent=copy[selected][0];body.textContent=copy[selected][1];
      counter.textContent=`${String(selected+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
      buttons.forEach((button,n)=>{const active=n===selected;button.classList.toggle('is-selected',active);button.setAttribute('aria-pressed',String(active));});
      stage.dataset.selected=String(selected);
      if(document.activeElement===prev||document.activeElement===next||buttons.includes(document.activeElement))buttons[selected].scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'});
    }
    expand.addEventListener('click',()=>{full.src=images[selected];full.alt=picture.alt;dialog.showModal();});
    prev.addEventListener('click',()=>show(selected-1));next.addEventListener('click',()=>show(selected+1));
    stage.addEventListener('keydown',e=>{
      if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement)return;
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
        e.preventDefault();show(selected+(e.key==='ArrowRight'?1:-1));
        if(buttons.includes(e.target))buttons[selected].focus({preventScroll:true});
      }
    });
    show(selected);return stage;
  }
  function redraw(){state.scheduled=false;if(state.drawing||!state.manifest)return;
    const l=lang(),r=country();if(state.stage?.isConnected&&l===state.lang&&r===state.region)return;
    state.lang=l;state.region=r;state.drawing=true;
    try{state.stage=createStage(state.manifest.regions[r],l,r);holder.replaceChildren(state.stage);}finally{state.drawing=false;}
  }
  function queue(){if(state.scheduled)return;state.scheduled=true;requestAnimationFrame(redraw);}
  new MutationObserver(queue).observe(holder,{childList:true});
  for(const id of ['p199-language','p199-country'])document.getElementById(id)?.addEventListener('change',queue);
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'}).then(r=>{if(!r.ok)throw Error('MANIFEST_HTTP_'+r.status);return r.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.goodpersonGalleryError=String(err?.message||'MANIFEST_FAILED');console.error('GOODPERSONTEST_R28R2_LOAD_HOLD',err);});
})();
