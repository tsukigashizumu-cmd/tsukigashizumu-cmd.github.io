/* TwelveOath P19-9R6R9R34R2: JP/US regional Apple preview MP4 + 10 real Apple screenshots. App-scoped, common files unchanged. */
(() => {
  'use strict';
  if (document.body?.dataset.p199Id !== '6786129971') return;
  const host=document.getElementById('tsz-twelveoath-host');
  const holder=document.getElementById('tsz-twelveoath-gallery');
  if (!host || !holder) return;
  const APP=6786129971;
  const MANIFEST='./tsz-twelveoath-images.json?v=p19-r34r2';
  const COPY={"jp":{"ja":[["空いた時間を、次の一人へ。","日本語版の実操作映像。空き時間を探し、優先するお客様を選び、封蝋付きの案内状を作成して予約成立まで進みます。"],["予約金額と管理を、一つのホームに。","今月の予約金額、予約時間、予約管理、First Circle、メニューなどの入口を確認できます。"],["空き枠の案内状を、美しく届ける。","封筒を開くように表示される、空き枠のお知らせ。封蝋のあるメッセージを確認できます。"],["優先案内するお客様を登録する。","First Circleの円形一覧で、空き枠を最初に案内するお客様を管理します。"],["予約成立を、その場で記録。","予約成立の画面にサービス名、金額、時間がまとまって表示されます。"],["一日の予定と空き枠を確認。","時刻の並ぶ予約スケジュールから、空いている枠や既存の予約を見渡します。"],["空き枠の案内方法を選ぶ。","枠の時間を調整し、個別案内・公開共有・あとで決めるなどの方法を選択できます。"],["次に案内する一人を選ぶ。","希望サービスや曜日、連絡までの時間などの条件を見ながら、お客様を選択します。"],["この人に声をかける理由を整える。","希望するメニューや、空き枠ができたことなど、案内する理由を選んで文章へつなげます。"],["返事を待つ期限を管理する。","案内の送信時刻・待機期限を確認し、予約成立、辞退、次の案内などの状態を進めます。"],["連絡方法と希望曜日を登録。","お客様の名前、LINEやInstagramなどの連絡方法、希望曜日を設定できます。"]],"en":[["Turn an opening into a personal offer.","Watch the Japanese-language app select a client, create a sealed offer for an open slot, and record a confirmed booking."],["A home for bookings and value.","View booking value, booked time, reservation management, the First Circle, and service settings in one place."],["Make a personal invitation.","A wax-sealed invitation presents the available opening with its date, time, and a message for one client."],["Choose who hears about an opening first.","The First Circle shows clients who can be contacted before an open slot is offered more widely."],["Record a confirmed booking.","The booking record displays the confirmed service, price, date, and duration."],["See the day at a glance.","A timed schedule shows existing reservations alongside the open slot to fill."],["Decide how to offer a slot.","Adjust the opening and choose to contact one person privately, share publicly, or decide later."],["Pick the next person to contact.","Browse clients and match them using short notice, preferred service, or weekday criteria."],["Give the invitation a reason.","Choose why a client is a good match, such as their preferred service or a newly available opening."],["Track a reply without losing the slot.","See when an offer was sent, when the hold ends, and whether the booking is confirmed or declined."],["Keep each client’s preferences handy.","Edit the client name, contact method, and preferred days before sending an invitation."]]},"us":{"ja":[["空いた時間を、次の一人へ。","英語版の実操作映像。空き時間を探し、連絡するお客様を選び、案内状を作成して予約成立を記録します。"],["予約金額と管理を、一つのホームに。","今月の予約金額、予約時間、予約管理、First Circle、メニューなどの入口を確認できます。"],["空き枠の案内状を、美しく届ける。","封筒を開くように表示される、空き枠のお知らせ。封蝋のあるメッセージを確認できます。"],["優先案内するお客様を登録する。","First Circleの円形一覧で、空き枠を最初に案内するお客様を管理します。"],["予約成立を、その場で記録。","予約成立の画面にサービス名、金額、時間がまとまって表示されます。"],["一日の予定と空き枠を確認。","時刻の並ぶ予約スケジュールから、空いている枠や既存の予約を見渡します。"],["空き枠の案内方法を選ぶ。","枠の時間を調整し、個別案内・公開共有・あとで決めるなどの方法を選択できます。"],["次に案内する一人を選ぶ。","希望サービスや曜日、連絡までの時間などの条件を見ながら、お客様を選択します。"],["この人に声をかける理由を整える。","希望するメニューや、空き枠ができたことなど、案内する理由を選んで文章へつなげます。"],["返事を待つ期限を管理する。","案内の送信時刻・待機期限を確認し、予約成立、辞退、次の案内などの状態を進めます。"],["連絡方法と希望曜日を登録。","お客様の名前、LINEやInstagramなどの連絡方法、希望曜日を設定できます。"]],"en":[["Turn an opening into a personal offer.","Watch the English-language app select a client, prepare an offer for an opening, and record a confirmed booking."],["A home for bookings and value.","View booking value, booked time, reservation management, the First Circle, and service settings in one place."],["Make a personal invitation.","A wax-sealed invitation presents the available opening with its date, time, and a message for one client."],["Choose who hears about an opening first.","The First Circle shows clients who can be contacted before an open slot is offered more widely."],["Record a confirmed booking.","The booking record displays the confirmed service, price, date, and duration."],["See the day at a glance.","A timed schedule shows existing reservations alongside the open slot to fill."],["Decide how to offer a slot.","Adjust the opening and choose to contact one person privately, share publicly, or decide later."],["Pick the next person to contact.","Browse clients and match them using short notice, preferred service, or weekday criteria."],["Give the invitation a reason.","Choose why a client is a good match, such as their preferred service or a newly available opening."],["Track a reply without losing the slot.","See when an offer was sent, when the hold ends, and whether the booking is confirmed or declined."],["Keep each client’s preferences handy.","Edit the client name, contact method, and preferred days before sending an invitation."]]}};
  const make=(tag,cls,value)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(value!==undefined)el.textContent=value;return el;};
  const language=()=>{const p=document.getElementById('p199-language');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-twelveoath-language')?.value||navigator.language||'en';return /^ja(?:[-_]|$)/i.test(v)?'ja':'en';};
  const country=()=>{const p=document.getElementById('p199-country');const v=(host.dataset.legacyLoaded==='true'?p?.selectedOptions?.[0]?.value:null)||document.getElementById('tsz-twelveoath-country')?.value||(/ja/i.test(navigator.language||'')?'jp':'us');return /^jp$/i.test(v)?'jp':'us';};
  const state={manifest:null,selected:0,lang:'',region:'',stage:null,scheduled:false,drawing:false};
  function validateManifest(m){
    if(!m||m.apple_id!==APP||m.version!=='P19_9R6R9R34R2'||!m.regions||!m.videos)throw Error('MANIFEST_ID_MISMATCH');
    for(const r of ['us','jp']){
      const a=m.regions[r],v=m.videos[r];
      if(!Array.isArray(a)||a.length!==10||new Set(a).size!==10)throw Error('TEN_UNIQUE_SCREENSHOTS_REQUIRED_'+r);
      if(!a.every(u=>new RegExp('^\\./tsz-twelveoath-assets/'+r.toUpperCase()+'/[0-9]{2}\\.jpg$').test(u)))throw Error('INVALID_IMAGE_PATH_'+r);
      if(v!==`./tsz-twelveoath-preview-${r.toUpperCase()}.mp4`)throw Error('WRONG_REGION_VIDEO_'+r);
    }
    return m;
  }
  function createStage(images,videoUrl,lang,region){
    const japanese=lang==='ja', count=images.length+1, copy=COPY[region][lang];
    if(copy.length!==count)throw Error('COPY_MEDIA_MISMATCH');
    const stage=make('section','tsz-twelveoath-stage');stage.id='tsz-twelveoath-r34r2';
    stage.dataset.mediaCount=String(count);stage.dataset.screenshotCount=String(images.length);
    stage.dataset.region=region;stage.dataset.inputMode='pointer';
    stage.addEventListener('pointerdown',()=>{stage.dataset.inputMode='pointer';},true);
    stage.addEventListener('keydown',()=>{stage.dataset.inputMode='keyboard';},true);
    const top=make('div','tsz-twelveoath-top');
    top.append(make('span','tsz-twelveoath-kicker','APP / SCREEN COLLECTION'),make('span','tsz-twelveoath-total',japanese?'動画 01 ＋ 実画面 10':'01 VIDEO + 10 SCREENS'));
    const layout=make('div','tsz-twelveoath-layout');
    const visual=make('div','tsz-twelveoath-visual');
    const video=make('video','tsz-twelveoath-video');
    video.controls=true;video.playsInline=true;video.preload='metadata';video.src=videoUrl;video.poster=images[0];
    video.setAttribute('playsinline','');video.setAttribute('aria-label',japanese?'TwelveOath 動画':'TwelveOath preview video');
    const picture=make('img','tsz-twelveoath-image');picture.loading='eager';picture.hidden=true;
    const error=make('p','tsz-twelveoath-image-error',japanese?'画像を表示できませんでした。':'Screenshot could not be displayed.');error.hidden=true;
    picture.addEventListener('load',()=>{error.hidden=true;});picture.addEventListener('error',()=>{error.hidden=false;});
    visual.append(video,picture,error);
    const side=make('div','tsz-twelveoath-side');side.append(top);
    const editorial=make('div','tsz-twelveoath-editorial');
    const issue=make('span','tsz-twelveoath-issue'),headline=make('h3','tsz-twelveoath-headline'),body=make('p','tsz-twelveoath-body');
    editorial.append(issue,headline,body);
    const controls=make('div','tsz-twelveoath-controls'),nav=make('div','tsz-twelveoath-nav');
    const expand=make('button','tsz-twelveoath-expand');expand.type='button';
    const prev=make('button','tsz-twelveoath-arrow','‹');prev.type='button';
    const counter=make('strong','tsz-twelveoath-counter');
    const next=make('button','tsz-twelveoath-arrow','›');next.type='button';
    prev.setAttribute('aria-label',japanese?'前の項目':'Previous item');next.setAttribute('aria-label',japanese?'次の項目':'Next item');
    const navRight=make('div','tsz-twelveoath-nav-right');navRight.append(prev,counter,next);nav.append(expand,navRight);controls.append(nav);
    const thumbs=make('div','tsz-twelveoath-thumbs'),buttons=[];
    for(let n=0;n<count;n++){
      const btn=make('button','tsz-twelveoath-thumb'+(n===0?' tsz-twelveoath-thumb-video':''));btn.type='button';
      btn.title=n===0?(japanese?'動画':'Video'):`${japanese?'画面':'Screen'} ${String(n).padStart(2,'0')}`;
      btn.setAttribute('aria-label',btn.title);
      const img=make('img','');img.src=images[Math.max(0,n-1)];img.loading='lazy';img.alt='';
      btn.append(img,make('span','',n===0?(japanese?'動画':'VIDEO'):String(n).padStart(2,'0')));
      btn.addEventListener('click',event=>{show(n);if(event.detail>0&&document.activeElement===btn)btn.blur();});
      buttons.push(btn);thumbs.append(btn);
    }
    controls.append(thumbs);side.append(editorial,controls);layout.append(visual,side);stage.append(layout);
    const dialog=make('dialog','tsz-twelveoath-dialog');
    const close=make('button','tsz-twelveoath-dialog-close',japanese?'閉じる':'Close');close.type='button';
    const large=make('img','tsz-twelveoath-dialog-image');large.alt='';dialog.append(close,large);stage.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
    let selected=Math.max(0,Math.min(count-1,state.selected));
    function show(i){
      const n=(i+count)%count;
      if(selected===0&&n!==0)video.pause();
      selected=n;state.selected=n;
      const isVideo=n===0;video.hidden=!isVideo;picture.hidden=isVideo;error.hidden=true;
      if(!isVideo){picture.src=images[n-1];picture.alt=`TwelveOath ${japanese?'実画面':'screenshot'} ${String(n).padStart(2,'0')}`;}
      issue.textContent=isVideo?'VIDEO':`${japanese?'実画面':'SCREEN'} ${String(n).padStart(2,'0')}`;
      headline.textContent=copy[n][0];body.textContent=copy[n][1];
      expand.textContent=isVideo?(japanese?'動画を全画面で見る':'Watch fullscreen'):(japanese?'画面を拡大':'Enlarge screenshot');
      counter.textContent=`${String(n+1).padStart(2,'0')} / ${String(count).padStart(2,'0')}`;
      buttons.forEach((b,k)=>{const active=k===n;b.classList.toggle('is-selected',active);b.setAttribute('aria-pressed',String(active));});
      stage.dataset.selected=String(n);
      if(document.activeElement===prev||document.activeElement===next||buttons.includes(document.activeElement))buttons[n].scrollIntoView({block:'nearest',inline:'nearest'});
    }
    expand.addEventListener('click',()=>{
      if(selected===0){
        if(typeof video.requestFullscreen==='function')video.requestFullscreen().catch(()=>{});
        else if(typeof video.webkitEnterFullscreen==='function')video.webkitEnterFullscreen();
      } else {large.src=images[selected-1];large.alt=picture.alt;dialog.showModal();}
    });
    prev.addEventListener('click',()=>show(selected-1));next.addEventListener('click',()=>show(selected+1));
    stage.addEventListener('keydown',e=>{
      if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement||e.target instanceof HTMLVideoElement||dialog.open)return;
      if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
        e.preventDefault();show(selected+(e.key==='ArrowRight'?1:-1));
        if(buttons.includes(e.target))buttons[selected].focus({preventScroll:true});
      }
    });
    show(selected);
    stage._stopVideo=()=>video.pause();
    return stage;
  }
  function redraw(){state.scheduled=false;if(state.drawing||!state.manifest)return;
    const l=language(),r=country();if(state.stage?.isConnected&&l===state.lang&&r===state.region)return;
    if(state.stage)state.stage._stopVideo?.();
    state.lang=l;state.region=r;state.drawing=true;
    try{state.stage=createStage(state.manifest.regions[r],state.manifest.videos[r],l,r);holder.replaceChildren(state.stage);}finally{state.drawing=false;}
  }
  function queue(){if(state.scheduled)return;state.scheduled=true;requestAnimationFrame(redraw);}
  const main=document.getElementById('p199-content'),shell=document.querySelector('.p19-shell'),footer=shell?.querySelector('footer.p19-footer');
  function positionHost(){
    const loaded=!!main&&!main.hidden;
    host.dataset.legacyLoaded=String(loaded);
    if(loaded){const target=main.querySelector('.p199-layout');if(target&&host.parentNode!==main)main.insertBefore(host,target);}
    else if(shell&&footer&&host.parentNode!==shell)shell.insertBefore(host,footer);
  }
  if(main)new MutationObserver(()=>{positionHost();queue();}).observe(main,{attributes:true,attributeFilter:['hidden']});
  positionHost();
  if(host.dataset.legacyLoaded!=='true'){
    const nativeJa=/^ja(?:[-_]|$)/i.test(navigator.language||'');
    const l=document.getElementById('tsz-twelveoath-language'),c=document.getElementById('tsz-twelveoath-country');
    if(l)l.value=nativeJa?'ja':'en';if(c)c.value=nativeJa?'jp':'us';
  }
  for(const id of ['p199-language','p199-country','tsz-twelveoath-language','tsz-twelveoath-country'])document.getElementById(id)?.addEventListener('change',queue);
  fetch(MANIFEST,{cache:'no-store',credentials:'same-origin'})
    .then(res=>{if(!res.ok)throw Error('MANIFEST_HTTP_'+res.status);return res.json();})
    .then(j=>{state.manifest=validateManifest(j);queue();})
    .catch(err=>{holder.dataset.twelveoathGalleryError=String(err?.message||'MANIFEST_FAILED');holder.replaceChildren(make('p','tsz-twelveoath-load-error',language()==='ja'?'画像と動画を読み込めませんでした。':'Gallery media could not be loaded.'));console.error('TWELVEOATH_R34R2_LOAD_HOLD',err);});
})();
