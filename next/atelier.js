/* P10 / PAINTED MATTER — original seeded abstract pigments, never external assets.
 * Preview only: ?atelier=1. No cookies, API calls, analytics or image downloads.
 * Canvas is purely decorative and disappears without Canvas2D support.
 */
(() => {
  'use strict';
  const root = document.documentElement;
  const enabled = root.dataset.artDirection === 'painted-matter';
  const local = ['127.0.0.1','localhost','::1'].includes(location.hostname);
  const artPhase = new URLSearchParams(location.search).get('atelier') ?? '11';
  const softLimb = enabled && artPhase === '7';
  const trueLimb = enabled && artPhase === '8';
  const naturalLimb = enabled && (artPhase === '9' || artPhase === '10' || artPhase === '11');
  const lunarGallery = enabled && (artPhase === '10' || artPhase === '11');
  const salonFinish = enabled && artPhase === '11';
  const chroma = enabled && (artPhase === '6' || softLimb || trueLimb || naturalLimb);
  const serene = enabled && (artPhase === '5' || chroma);
  const lunar = enabled && (artPhase === '4' || serene);
  const royale = enabled && (artPhase === '3' || lunar);
  const nocturne = enabled && (artPhase === '2' || royale);
  const paintMode = salonFinish ? 'LUNAR SALON · POLISHED' : lunarGallery ? 'LUNAR SALON · P18 MOON LOCKED' : naturalLimb ? 'NATURAL LUNAR EDGE · NASA' : trueLimb ? 'TRUE LUNAR LIMB · NASA' : softLimb ? 'SOFT LIMB · LUNAR CHROMA' : chroma ? 'LUNAR CHROMA' : serene ? 'SERENE MOONLIGHT' : lunar ? 'LUNAR ATELIER' : royale ? 'ROYALE CONTINUUM' : nocturne ? 'NOCTURNE ATELIER' : enabled ? 'PAINTED MATTER' : 'ORIGINAL';
  if (!local && !enabled) return;
  if (enabled || local) root.dataset.showArtSwitch='1';
  const makeLink=(label, phase)=>{
    const url=new URL(location.href);
    if(phase)url.searchParams.set('atelier',phase);
    else url.searchParams.delete('atelier');
    const a=document.createElement('a');a.href=url.pathname+url.search+url.hash;
    a.textContent=label;a.setAttribute('aria-current',((phase==='11'&&salonFinish)||(phase==='10'&&artPhase==='10')||(phase==='9'&&artPhase==='9')||(phase==='8'&&trueLimb)||(phase==='7'&&softLimb)||(phase==='6'&&chroma&&!softLimb&&!trueLimb&&!naturalLimb)||(phase==='5'&&serene&&!chroma)||(phase==='4'&&lunar&&!serene)||(phase==='3'&&royale&&!lunar)||(phase==='2'&&nocturne&&!royale)||(phase==='1'&&enabled&&!nocturne)||(!phase&&!enabled))?'page':'false');
    return a;
  };
  document.addEventListener('DOMContentLoaded',()=>{
    const switcher=document.createElement('nav');switcher.className='art-mode-preview';
    switcher.setAttribute('aria-label','Local art direction comparison');
    switcher.append(makeLink('ORIGINAL',null),makeLink('PAINTED', '1'),makeLink('NOCTURNE', '2'),makeLink('ROYALE','3'),makeLink('LUNAR','4'),makeLink('SERENE','5'),makeLink('CHROMA','6'),makeLink('SOFT LIMB','7'),makeLink('TRUE LIMB','8'),makeLink('NATURAL EDGE','9'),makeLink('LUNAR SALON','10'),makeLink('SALON POLISH','11'));
    document.body.append(switcher);
    if(lunar){
      const foot=document.querySelector('footer');
      if(foot){
        const credit=document.createElement('small');credit.className='lunar-credit';
        credit.append('Moon surface: ');
        const source=document.createElement('a');
        source.href='https://science.nasa.gov/resource/lunar-near-side/';
        source.textContent='NASA / GSFC / Arizona State University (LRO)';
        source.target='_blank';source.rel='noopener noreferrer';
        credit.append(source);foot.append(credit);
      }
    }
  },{once:true});
  if (!enabled) return;
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content=royale?'#110c14':nocturne?'#140f18':'#171315';
  root.dataset.artVisualVersion=royale?'p12-royale':nocturne?'p11-nocturne':'p10-v1';
  if(lunar)root.dataset.lunarReal='1';
  if(serene)root.dataset.moonSerene='1';
  if(chroma)root.dataset.lunarChroma='1';
  if(softLimb)root.dataset.softLimb='1';
  if(trueLimb || naturalLimb)root.dataset.trueLimb='1';
  if(naturalLimb)root.dataset.naturalLimb='1';
  if(lunarGallery)root.dataset.lunarGallery='1';
  if(salonFinish)root.dataset.salonFinish='1';
  function rng(seed) {
    return () => {seed |= 0;seed = seed + 0x6D2B79F5 | 0;let t=Math.imul(seed ^ seed >>> 15,1 | seed);t=t+Math.imul(t ^ t >>> 7,61 | t) ^ t;return ((t ^ t >>> 14) >>> 0) / 4294967296;};
  }
  /* P11 — text-only procedural nocturne. Every mark is created locally with Canvas2D.
     No downloads, external artwork, or DOM interference with product content. */
  function makeNocturne(canvas, useRealMoon=false) {
    const host=canvas.parentElement;
    const rect=host.getBoundingClientRect();
    const w=Math.max(280,Math.round(rect.width)), h=Math.max(320,Math.round(rect.height));
    const scale=Math.min(window.devicePixelRatio||1,1.65,1550/w,1050/h);
    canvas.width=Math.round(w*scale);canvas.height=Math.round(h*scale);
    const c=canvas.getContext('2d',{alpha:false}); if(!c)return;
    c.setTransform(scale,0,0,scale,0,0);
    const R=rng(116827);const rand=(a,b)=>a+(b-a)*R();
    const P=Math.PI;
    function ellipse(x,y,rx,ry,color,alpha=1,rotation=0){
      c.save();c.globalAlpha=alpha;c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,rotation,0,2*P);c.fill();c.restore();
    }
    function gradientCircle(x,y,r,stops){const g=c.createRadialGradient(x,y,1,x,y,r);for(const [stop,color] of stops)g.addColorStop(stop,color);c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
    function bezier(points,stroke,width,alpha=1,blur=0){
      c.save();c.strokeStyle=stroke;c.lineWidth=width;c.lineCap='round';c.globalAlpha=alpha;c.shadowColor=stroke;c.shadowBlur=blur;
      c.beginPath();c.moveTo(points[0],points[1]);c.bezierCurveTo(...points.slice(2));c.stroke();c.restore();
    }
    const bg=c.createLinearGradient(0,0,w,h);
    bg.addColorStop(0,'#140e17');bg.addColorStop(.31,'#291824');bg.addColorStop(.66,'#4a2836');bg.addColorStop(1,'#170f17');
    c.fillStyle=bg;c.fillRect(0,0,w,h);
    // Wine-dark sky, never flat black: glassy ambient light on the right.
    gradientCircle(w*.89,h*.28,Math.max(w*.74,h*.85),[[0,'#94606c88'],[.26,'#63374690'],[.64,'#3b213e66'],[1,'#130d17']]);
    gradientCircle(w*.81,h*.86,w*.53,[[0,'#b96d657a'],[.17,'#8a4b5266'],[.64,'#42273922'],[1,'#1a121a00']]);
    // Atmospheric silk: thin veils with translucent overlap, not a flat illustration.
    for(let j=0;j<18;j++){
      c.save();c.globalAlpha=rand(.024,.10);c.fillStyle=j%3===0?'#f6b9bd':j%3===1?'#b884a6':'#e6b48d';
      const y=h*(.02+j*.045);c.beginPath();c.moveTo(w*.26,y);c.bezierCurveTo(w*.43,y-rand(25,80),w*.72,y+rand(15,110),w*1.12,y-rand(60,190));
      c.bezierCurveTo(w*.91,y+rand(55,150),w*.56,y+rand(15,70),w*.26,y+rand(30,70));c.closePath();c.fill();c.restore();
    }
    // A luminous orb with shadowed craters and a warm gilded limb.
    const mr=Math.min(w*.245,h*.35,172), mx=w*.78,my=h*.34;
    gradientCircle(mx,my,mr*2.05,[[0,'#f8d4b654'],[.26,'#eaa9a340'],[.49,'#a36b7638'],[.75,'#73485616'],[1,'#4c2b4400']]);
    if(!useRealMoon){
    c.save();c.shadowColor='#ffb98c';c.shadowBlur=28;c.beginPath();c.arc(mx,my,mr,0,2*P);
    const moon=c.createLinearGradient(mx-mr,my-mr,mx+mr,my+mr);
    moon.addColorStop(0,'#f8dbbe');moon.addColorStop(.3,'#d9ab9e');moon.addColorStop(.64,'#af7b82');moon.addColorStop(1,'#724c62');c.fillStyle=moon;c.fill();c.restore();
    c.save();c.beginPath();c.arc(mx,my,mr*.98,0,2*P);c.clip();
    for(let i=0;i<190;i++){
      const a=rand(0,2*P),distance=Math.sqrt(R())*mr*.97;
      const x=mx+Math.cos(a)*distance,y=my+Math.sin(a)*distance;
      const r=rand(mr*.012,mr*.145);
      ellipse(x,y,r*rand(.7,1.8),r*rand(.5,1.25),R()>.5?'#f9d4ba':'#754d60',rand(.015,.13),rand(0,P));
      if(i%7===0)ellipse(x-r*.15,y-r*.2,r*.7,r*.18,'#fff2d2',rand(.025,.12));
    }
    const moonShade=c.createLinearGradient(mx-mr,my,mx+mr,my);
    moonShade.addColorStop(0,'#fff0cc25');moonShade.addColorStop(.56,'#6c435000');moonShade.addColorStop(1,'#2c1a3459');c.fillStyle=moonShade;c.fillRect(mx-mr,my-mr,mr*2,mr*2);
    c.restore();
    c.save();c.beginPath();c.arc(mx,my,mr*1.013,-2.4,.96*P);c.strokeStyle='#f4caa9';c.lineWidth=1.2;c.globalAlpha=.6;c.shadowBlur=14;c.shadowColor='#ffd1a6';c.stroke();c.restore();
    }
    // Fine orbit engravings. They follow curves behind the text and never carry semantics.
    const orbit=c.createLinearGradient(w*.25,0,w,h);
    orbit.addColorStop(0,'#eb9e9f00');orbit.addColorStop(.48,'#d7a78c73');orbit.addColorStop(.8,'#fce3ad');orbit.addColorStop(1,'#e3a38b22');
    for(let i=0;i<26;i++){
      const dy=i*3.5, off=(i-13)*1.3;
      bezier([w*.28,h*(.94+off*.004),w*.58,h*(.64+off*.002),w*.63,h*(.14+off*.007),w*1.09,h*(.55+off*.002)],orbit,i===13?1.25:rand(.25,.68),rand(.09,.29),i===13?6:0);
    }
    // Flowering copper branches cluster on the far right, with individual sculpted petals.
    function blossom(x,y,size,tilt=0){
      c.save();c.translate(x,y);c.rotate(tilt);
      for(let petal=0;petal<5;petal++){
        const a=petal*2*P/5+rand(-.1,.1),len=size*rand(.51,.81);
        c.save();c.rotate(a);const petGrad=c.createLinearGradient(0,-len,0,0);
        petGrad.addColorStop(0,'#f8d5c8');petGrad.addColorStop(.45,'#d995a8');petGrad.addColorStop(1,'#82495d');
        ellipse(0,-len*.63,size*.27,len*.47,petGrad,rand(.48,.82),rand(-.19,.19));
        c.restore();
      }
      ellipse(0,0,size*.15,size*.15,'#f9d69c',.9);
      ellipse(-size*.04,-size*.05,size*.04,size*.04,'#fff2cd',.9);c.restore();
    }
    function sprig(x,y,size,angle,depth){
      if(depth<0)return;
      const xx=x+Math.cos(angle)*size, yy=y+Math.sin(angle)*size;
      bezier([x,y,x+size*.16,y-size*.28,xx-size*.1,yy+size*.11,xx,yy],'#ce9b83',Math.max(.55,depth*.58),.56);
      for(let i=0;i<3;i++){
        const t=(i+1)/4,bx=x+(xx-x)*t,by=y+(yy-y)*t-size*.09*Math.sin(t*P);
        const dir=(i%2===0?1:-1);
        ellipse(bx+dir*size*.09,by-size*.11,size*.12,size*.038,'#af8590',.4,dir*.7);
      }
      if(depth===0||R()>.27)blossom(xx,yy,size*.17,angle+P*.4);
      if(depth>0){
        sprig(xx,yy,size*rand(.54,.7),angle-rand(.5,.91),depth-1);
        sprig(xx,yy,size*rand(.46,.62),angle+rand(.4,.85),depth-1);
      }
    }
    sprig(w*.95,h*.88,Math.min(w*.16,110),-2.06,3);
    sprig(w*1.06,h*.62,Math.min(w*.17,100),-2.3,3);
    sprig(w*.88,h*.91,Math.min(w*.12,92),-1.86,2);
    // Floating, slow-flowing rose gold ribbons — rendered once for a calm experience.
    for(let i=0;i<8;i++){
      const y=h*(.57+i*.039),p=[w*.33,y+h*.27,w*.66,y-h*.24,w*.81,y+h*.10,w*1.08,y-h*.23];
      bezier(p,'#c47e9380',rand(7,28),rand(.025,.09),14);
    }
    for(let i=0;i<11;i++){
      const y=h*(.74+i*.015),p=[w*.23,y,w*.5,y-h*.08,w*.8,y+h*.08,w*1.05,y-h*.19];
      bezier(p,i%2?'#ffdeb5':'#e49c97',i%3===0?1.1:.4,rand(.24,.62),i%3===0?10:0);
    }
    // Glints around the orbital crossing, focused outside the text column.
    for(let i=0;i<500;i++){
      const x=rand(w*.22,w*1.01),y=rand(0,h),r=rand(.18,1.5);
      ellipse(x,y,r,r,R()>.68?'#fff1d8':'#e0a49c',rand(.10,.48));
    }
    for(let i=0;i<13;i++){
      const x=rand(w*.53,w*.99),y=rand(h*.06,h*.94),rad=rand(2,7);
      gradientCircle(x,y,rad*10,[[0,'#fff8de88'],[.09,'#ffcf9b55'],[.34,'#e8ad8750'],[1,'#b6737700']]);
      bezier([x-rad*2.7,y,x-rad*.8,y,x+rad*.8,y,x+rad*2.7,y],'#fff2d4',.65,.49,6);
      bezier([x,y-rad*2.7,x,y-rad*.8,x,y+rad*.8,x,y+rad*2.7],'#fff2d4',.65,.49,6);
    }
    // Fine deterministic film grain, avoid paint looking like a generic gradient.
    for(let i=0;i<Math.min(8200,Math.floor(w*h*.009));i++){
      c.globalAlpha=rand(.02,.10);c.fillStyle=R()>.5?'#f6ccbc':'#1b111e';c.fillRect(rand(0,w),rand(0,h),.55,.55);
    }
    c.globalAlpha=1;
  }


  /* P12: a measured, brightest-only-where-needed second pass over the P11 painting.
     No network assets, animation, text mutation, or dependency on the product data. */
  function makeRoyale(canvas, moonImage=null) {
    const authenticMoon=!!(moonImage && moonImage.complete && moonImage.naturalWidth>=1000);
    makeNocturne(canvas,authenticMoon);
    const rect=canvas.parentElement.getBoundingClientRect();
    const w=Math.max(280,Math.round(rect.width)),h=Math.max(320,Math.round(rect.height));
    const ctx=canvas.getContext('2d');if(!ctx)return;
    const scale=canvas.width/w;
    ctx.save();ctx.setTransform(scale,0,0,scale,0,0);
    const R=rng(198077);const rand=(a,b)=>a+(b-a)*R();
    const P=Math.PI;
    function curve(p,width,alpha,glow=0,color='#fbd4a7'){
      ctx.save();ctx.strokeStyle=color;ctx.lineWidth=width;ctx.globalAlpha=alpha;
      ctx.lineCap='round';ctx.shadowColor=color;ctx.shadowBlur=glow;
      ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.bezierCurveTo(...p.slice(2));ctx.stroke();ctx.restore();
    }
    // The gilded crescents: deep-field composition occupying the rightmost 38%.
    const mx=w*.78,my=h*.34,mr=Math.min(w*.245,h*.35,172);
    if(authenticMoon){
      // NASA LRO near-side image stored locally. No fictional maria/craters and no remote page requests.
      ctx.save();
      ctx.beginPath();ctx.arc(mx,my,mr*1.012,0,2*P);
      ctx.shadowColor='#efb994';ctx.shadowBlur=23;ctx.fillStyle='#f2c9a7';ctx.fill();ctx.restore();
      ctx.save();ctx.beginPath();ctx.arc(mx,my,mr*.998,0,2*P);ctx.clip();
      // Crop the black JPEG backdrop with a circular alpha clip, retaining NASA surface details.
      const size=mr*2.105;
      ctx.filter='sepia(.12) brightness(1.02) contrast(1.045)';
      ctx.drawImage(moonImage,mx-size/2,my-size/2,size,size);
      ctx.filter='none';
      const shade=ctx.createLinearGradient(mx-mr,my-mr,mx+mr,my+mr);
      shade.addColorStop(0,'#ffe8bd24');shade.addColorStop(.50,'#f5bdaf00');shade.addColorStop(1,'#20152524');
      ctx.fillStyle=shade;ctx.fillRect(mx-mr,my-mr,mr*2,mr*2);ctx.restore();
      ctx.save();ctx.beginPath();ctx.arc(mx,my,mr*1.012,0,2*P);
      ctx.strokeStyle='#ffe4bc85';ctx.lineWidth=1.2;ctx.shadowColor='#ffd2ac';ctx.shadowBlur=15;ctx.stroke();ctx.restore();
    }

    ctx.save();ctx.beginPath();ctx.arc(mx,my,mr*1.015,-2.25,.66*P);
    ctx.lineWidth=2.1;ctx.strokeStyle='#ffe6b7';ctx.shadowColor='#ffd5a3';ctx.shadowBlur=18;ctx.globalAlpha=.8;ctx.stroke();ctx.restore();
    for(let i=0;i<21;i++){
      const j=i-10;
      const p=[w*.51,h*(.89+j*.004),w*.69,h*(.70+j*.002),w*.81,h*(.36+j*.008),w*1.08,h*(.45+j*.012)];
      curve(p,i===10?1.9:.5,i===10?.88:.12+rand(0,.14),i===10?17:0,i%3===0?'#ffe6ba':'#e7a0ad');
    }
    // The lower streak is the counterweight to the large headline on the left.
    for(let i=0;i<18;i++){
      const j=(i-8.5)*.006;
      const p=[w*.31,h*(.84+j),w*.57,h*(.59+j),w*.77,h*(.98+j),w*1.16,h*(.72+j)];
      curve(p,i===9?2:.62,i===9?.78:.075+rand(0,.16),i===9?20:0,i%3===0?'#ffe5b7':'#efa5a2');
    }
    // Polished reflection beneath the orbit, spatially distinct from the content.
    const reflection=ctx.createRadialGradient(w*.88,h*.87,4,w*.88,h*.87,w*.35);
    reflection.addColorStop(0,'#ffdeb050');reflection.addColorStop(.24,'#faab8b21');reflection.addColorStop(1,'#b06a7600');
    ctx.save();ctx.fillStyle=reflection;ctx.fillRect(w*.50,h*.58,w*.55,h*.41);ctx.restore();
    for(let i=0;i<35;i++){
      const yy=h*(.78+i*.0042),xx=w*rand(.56,.85),length=w*rand(.025,.26);
      curve([xx,yy,xx+length*.33,yy+rand(-1,1),xx+length*.66,yy+rand(-1,1),xx+length,yy],rand(.2,1.1),rand(.06,.29),rand(0,7),'#ffd3ad');
    }
    // Artisanal floral branch / handmade metallic glints at the very right edge.
    function bloom(x,y,size){
      ctx.save();ctx.translate(x,y);ctx.rotate(rand(-1,1));
      for(let k=0;k<5;k++){
        ctx.save();ctx.rotate(k*P*2/5);const g=ctx.createLinearGradient(0,-size,0,0);
        g.addColorStop(0,'#fbe5d0');g.addColorStop(.42,'#e9a6aa');g.addColorStop(1,'#89506c');
        ctx.globalAlpha=rand(.54,.85);ctx.fillStyle=g;
        ctx.beginPath();ctx.ellipse(0,-size*.5,size*.25,size*.49,rand(-.12,.12),0,2*P);ctx.fill();ctx.restore();
      }
      ctx.beginPath();ctx.arc(0,0,size*.13,0,2*P);ctx.fillStyle='#ffe6a6';ctx.fill();ctx.restore();
    }
    const branches=[[.96,.83,-.17],[.93,.71,.4],[1.00,.58,-.25]];
    branches.forEach(([rx,ry,dir],j)=>{
      const x=w*rx,y=h*ry;
      curve([w*1.08,h*.95,x+w*.02,y+h*.09,x-w*.04,y-h*.07,x-w*.16,y-h*.2],j===0?1.4:.9,.64,5,'#e8b091');
      for(let i=0;i<5;i++){
        const t=(i+.5)/5;
        const bx=x-w*(.03+.13*t),by=y-h*(.035+.16*t);
        if((i+j)%2===0)bloom(bx,by,rand(4,10)*(w/730)**.28);
        curve([bx,by,bx+w*.01,by-h*.02,bx+w*.02,by-h*.04,bx+w*.032,by-h*.049],.5,.42,0,'#ffceb2');
      }
    });
    // Concentrated stars with two light axes, no scattered confetti or motion.
    for(let i=0;i<15;i++){
      const x=w*rand(.57,1),y=h*rand(.09,.91),len=rand(1.8,7);
      curve([x-len,y,x-len*.3,y,x+len*.3,y,x+len,y],.6,.5,9,'#fff0d1');
      curve([x,y-len,x,y-len*.3,x,y+len*.3,x,y+len],.6,.49,9,'#fff0d1');
    }
    ctx.restore();
  }


  /* P18: The NASA JPEG has DARK SKY AROUND the photographed lunar disc.
   * The old "center square + circle" crop can draw black JPEG pixels at the rim.
   * Measure the real photographed disk boundaries once, on the same-origin JPEG.
   * This is geometric source-window selection, NOT alpha feather or image retouch.
   * A failed or suspicious scan falls back to P17 unchanged. */
  const edgeGeometryCache = new WeakMap();
  function detectNaturalLimb(image) {
    if(edgeGeometryCache.has(image))return edgeGeometryCache.get(image);
    let result=null;
    try {
      const w=320,h=Math.max(200,Math.round(w*image.naturalHeight/image.naturalWidth));
      const probe=document.createElement('canvas');probe.width=w;probe.height=h;
      const c=probe.getContext('2d',{willReadFrequently:true});
      c.drawImage(image,0,0,w,h);
      const a=c.getImageData(0,0,w,h).data;
      const lum=(x,y)=>{const i=(y*w+x)*4;return .2126*a[i]+.7152*a[i+1]+.0722*a[i+2];};
      // Dark JPEG sky is estimated at the corners; the Moon must be far brighter.
      const corners=[lum(1,1),lum(w-2,1),lum(1,h-2),lum(w-2,h-2)].sort((a,b)=>a-b);
      const bg=(corners[1]+corners[2])*.5;
      const threshold=Math.max(35,Math.min(75,bg+24));
      const rows=new Uint16Array(h),cols=new Uint16Array(w);
      for(let y=0;y<h;y++)for(let x=0;x<w;x++){
        if(lum(x,y)>threshold){rows[y]++;cols[x]++;}
      }
      // Require a substantial bright footprint. Ignore JPEG noise and tiny spots.
      const minCol=Math.max(8,Math.floor(h*.035)),minRow=Math.max(8,Math.floor(w*.035));
      let xl=0,xr=w-1,yt=0,yb=h-1;
      while(xl<w&&cols[xl]<minCol)xl++;
      while(xr>xl&&cols[xr]<minCol)xr--;
      while(yt<h&&rows[yt]<minRow)yt++;
      while(yb>yt&&rows[yb]<minRow)yb--;
      const diameterX=xr-xl+1,diameterY=yb-yt+1;
      const ratio=diameterX/(diameterY || 1);
      const coverage=Math.min(diameterX/w,diameterY/h);
      // NASA near-side disc should occupy most of this source image.
      if(coverage>.83 && coverage<=1 && ratio>.94 && ratio<1.06){
        const cx=(xl+xr)*.5/w*image.naturalWidth;
        const cy=(yt+yb)*.5/h*image.naturalHeight;
        const dx=diameterX/w*image.naturalWidth;
        const dy=diameterY/h*image.naturalHeight;
        // Trim <1% only to exclude the dark JPEG matte, not the lunar geology.
        const size=Math.min(dx,dy)*.989;
        if(cx-size/2>=0&&cy-size/2>=0&&cx+size/2<=image.naturalWidth&&cy+size/2<=image.naturalHeight){
          result={sx:cx-size/2,sy:cy-size/2,side:size};
        }
      }
    } catch(_){/* Conservative, no source edits; P17 fallback. */}
    edgeGeometryCache.set(image,result);
    return result;
  }

  /* P14 — SERENE MOONLIGHT: authentic NASA near-side image, warmer reflected light,
     physically quiet limb; smaller separated disc, never a horror-like black plate.
     Original P13 (?atelier=4) is unchanged. Only preview=5 calls this function. */
  function makeSerene(canvas, image, feathered=false, truePhotographicLimb=false, naturalSourceCrop=false) {
    // P11 already paints delicate branches and silk; omit its procedural orb.
    makeNocturne(canvas,true);
    const rect=canvas.parentElement.getBoundingClientRect();
    const w=Math.max(280,Math.round(rect.width)),h=Math.max(320,Math.round(rect.height));
    const ctx=canvas.getContext('2d');if(!ctx)return;
    const scale=canvas.width/w;
    ctx.save();ctx.setTransform(scale,0,0,scale,0,0);
    const mobile=w<610;
    // Desktop: the entire lunar disc sits to the RIGHT of a measured, bounded title column.
    // Phone: the moon occupies its own visual tier ABOVE the text, never behind glyphs.
    const x=mobile?w*.73:w*.80;
    const y=mobile?Math.min(137,h*.23):h*.305;
    const r=mobile?Math.min(w*.218,84):Math.min(w*.16,h*.235,132);
    const glow=ctx.createRadialGradient(x,y,r*.75,x,y,r*1.73);
    glow.addColorStop(0,'#ffe6c300');
    glow.addColorStop(.57,'#f9d7b82b');
    glow.addColorStop(.83,'#e7b6a020');
    glow.addColorStop(1,'#d299aa00');
    ctx.fillStyle=glow;ctx.fillRect(x-r*1.75,y-r*1.75,r*3.5,r*3.5);
    // Only the actual NASA asset is used for maria / crater morphology.
    const ready=!!(image&&image.complete&&image.naturalWidth>=1000);
    if(ready){
      const side=Math.min(image.naturalWidth,image.naturalHeight);
      const sx=(image.naturalWidth-side)*.5,sy=(image.naturalHeight-side)*.5;
      const physical = naturalSourceCrop ? detectNaturalLimb(image) : null;
      if(naturalSourceCrop) root.dataset.lunarEdgeDetection=physical ? 'PASS' : 'FALLBACK';
      const drawSx=physical?physical.sx:sx,drawSy=physical?physical.sy:sy,drawSide=physical?physical.side:side;
      if(feathered){
        // The Moon has no drawn border. This offscreen disk receives an alpha
        // falloff confined to its final ~4% radius (the maria stay razor sharp).
        const disk=document.createElement('canvas');
        const d=768;disk.width=d;disk.height=d;
        const dc=disk.getContext('2d',{alpha:true});
        if(dc){
          dc.save();dc.beginPath();dc.arc(d/2,d/2,d/2,0,Math.PI*2);dc.clip();
          dc.filter='grayscale(.13) sepia(.25) brightness(1.31) contrast(.76) saturate(.84)';
          dc.drawImage(image,sx,sy,side,side,0,0,d,d);dc.filter='none';
          dc.globalCompositeOperation='screen';dc.globalAlpha=.23;dc.fillStyle='#edd7c1';dc.fillRect(0,0,d,d);
          dc.globalCompositeOperation='source-over';dc.globalAlpha=1;
          const veil=dc.createLinearGradient(0,0,d,d);
          veil.addColorStop(0,'#fff2db35');veil.addColorStop(.55,'#eac3b00c');veil.addColorStop(1,'#24152827');
          dc.fillStyle=veil;dc.fillRect(0,0,d,d);
          dc.restore();
          // Feather only the photographic edge, not the background canvas.
          dc.globalCompositeOperation='destination-in';
          const alpha=dc.createRadialGradient(d/2,d/2,d*.445,d/2,d/2,d*.5);
          alpha.addColorStop(0,'rgba(0,0,0,1)');
          alpha.addColorStop(.2,'rgba(0,0,0,.98)');
          alpha.addColorStop(1,'rgba(0,0,0,0)');
          dc.fillStyle=alpha;dc.fillRect(0,0,d,d);
          dc.globalCompositeOperation='source-over';
          ctx.drawImage(disk,x-r,y-r,r*2,r*2);
        }
      } else {
      ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();
      ctx.filter='grayscale(.13) sepia(.25) brightness(1.31) contrast(.76) saturate(.84)';
      ctx.drawImage(image,drawSx,drawSy,drawSide,drawSide,x-r,y-r,r*2,r*2);
      ctx.filter='none';
      // Gentle reflected ivory light: opens deep maria WITHOUT inventing fake craters.
      ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=.23;
      ctx.fillStyle='#edd7c1';ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore();
      const veil=ctx.createLinearGradient(x-r,y-r,x+r,y+r);
      veil.addColorStop(0,'#fff2db35');veil.addColorStop(.55,'#eac3b00c');veil.addColorStop(1,'#24152827');
      ctx.fillStyle=veil;ctx.fillRect(x-r,y-r,r*2,r*2);
      ctx.restore();
      // P17 is true to the airless Moon: no graphic outline and no feather.
      // The Canvas circle clip is a sharp, anti-aliased photographic silhouette.
      if(!truePhotographicLimb){
        ctx.save();ctx.beginPath();ctx.arc(x,y,r+.6,0,Math.PI*2);
        ctx.strokeStyle='#fce8d6';ctx.globalAlpha=.45;ctx.lineWidth=.95;
        ctx.shadowColor='#e8b6a7';ctx.shadowBlur=10;ctx.stroke();ctx.restore();
      }
      } // /P14-P15 original hard photographic limb
    } else {
      // No fictional replacement moon: a calm empty glow until the locally verified
      // photograph loads. The other art modes remain selectable.
      if(!feathered && !truePhotographicLimb){
      ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);
      ctx.strokeStyle='#e3b9a0';ctx.globalAlpha=.19;ctx.lineWidth=.8;ctx.stroke();ctx.restore();
      }
    }
    // A single graceful foreground stroke and tiny blossoms; no orbit cage or strobe.
    ctx.save();ctx.beginPath();
    ctx.moveTo(mobile?w*.48:w*.54, mobile?h*.27:h*.79);
    ctx.bezierCurveTo(w*.68,mobile?h*.24:h*.66,w*.85,mobile?h*.17:h*.81,w*1.06,mobile?h*.24:h*.53);
    ctx.strokeStyle='#f4c7b5';ctx.globalAlpha=.3;ctx.lineWidth=.9;
    ctx.shadowColor='#dfaba2';ctx.shadowBlur=5;ctx.stroke();ctx.restore();
    ctx.restore();
  }

  function makePigment(canvas) {
    const hero = canvas.parentElement;
    const rect = hero.getBoundingClientRect();
    const w = Math.max(280,Math.round(rect.width));
    const h = Math.max(320,Math.round(rect.height));
    // Cap pixel count for battery/performance; draw with CSS scaling on high DPI.
    const scale=Math.min(1.45, 1450/w, 950/h, window.devicePixelRatio || 1);
    canvas.width=Math.round(w*scale);canvas.height=Math.round(h*scale);
    const c=canvas.getContext('2d', {alpha:false}); if (!c) return;
    c.setTransform(scale,0,0,scale,0,0);
    const R=rng(107492);const rand=(a,b)=>a+(b-a)*R();
    const bg=c.createLinearGradient(0,0,w,h);
    bg.addColorStop(0,'#241b22');bg.addColorStop(.32,'#4c323c');bg.addColorStop(.7,'#74535b');bg.addColorStop(1,'#251b20');
    c.fillStyle=bg;c.fillRect(0,0,w,h);
    const x0=w*.69, y0=h*.44, radius=Math.max(w,h)*.65;
    const glow=c.createRadialGradient(x0,y0,10,x0,y0,radius);
    glow.addColorStop(0,'#d1a29b');glow.addColorStop(.24,'#a5757d');glow.addColorStop(.61,'#653e4e');glow.addColorStop(1,'#2d1d28');
    c.globalAlpha=.78;c.fillStyle=glow;c.fillRect(0,0,w,h);c.globalAlpha=1;
    // Broad, deliberately imperfect ribbons simulate layered pigment dragged with a knife.
    const colors=['#d4a396','#bb8582','#e8c5ac','#734959','#8d5f69','#392832','#b87b71','#e9b4a1','#b6aaa4','#5c3c49'];
    for(let i=0;i<94;i++){
      const x=w*rand(.29,1.23), y=h*rand(-.2,1.12);
      const length=rand(w*.06,w*.45),width=rand(9,65);
      c.beginPath(); c.moveTo(x,y);
      c.bezierCurveTo(x-length*.28,y+rand(-45,45),x-length*.68,y+rand(-80,80),x-length,y+rand(-62,62));
      c.lineWidth=width;c.lineCap=R()>.45?'round':'butt';c.lineJoin='round';
      c.strokeStyle=colors[Math.floor(R()*colors.length)];c.globalAlpha=rand(.065,.39);
      c.stroke();
      if(R()>.62) {c.lineWidth=rand(.5,3);c.strokeStyle='#ffe4cb';c.globalAlpha=rand(.02,.17);c.stroke();}
    }
    // Edges of torn glaze: finer dry scratches cut across the soft pigment.
    const scratches=['#f0d0c1','#321f29','#8e6d75','#ffffff'];
    for(let i=0;i<430;i++) {
      const x=rand(w*.34,w*1.04),y=rand(0,h),len=rand(6,74);
      c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x-len*.55,y+rand(-15,15),x-len,y+rand(-12,12));
      c.strokeStyle=scratches[Math.floor(R()*scratches.length)];c.lineWidth=rand(.4,2.4);
      c.globalAlpha=rand(.025,.15);c.stroke();
    }
    // Fine particulate grain; deterministic so the art does not shimmer or distract.
    for(let i=0;i<Math.min(12500,Math.round(w*h*.016));i++) {
      const x=rand(0,w),y=rand(0,h),sz=rand(.3,1.5);
      c.fillStyle=R()>.47?'#f4d9c2':'#24151d';c.globalAlpha=rand(.025,.14);
      c.fillRect(x,y,sz,sz);
    }
    c.globalAlpha=1;
    // An original abstract ink contour: suggestive of mass, not a person or Saville composition.
    c.save();c.globalCompositeOperation='multiply';c.lineWidth=Math.max(11,w*.038);
    c.strokeStyle='#4c3645';c.globalAlpha=.35;c.beginPath();
    c.moveTo(w*.91,h*-.06);c.bezierCurveTo(w*.54,h*.21,w*.92,h*.4,w*.67,h*.67);
    c.bezierCurveTo(w*.54,h*.86,w*.81,h*1.08,w*.84,h*1.13);c.stroke();c.restore();
  }
  function init() {
    const hero=document.querySelector('.hero'); if (!hero) return;
    const canvas=document.createElement('canvas');canvas.className='hero-art';canvas.setAttribute('aria-hidden','true');
    hero.prepend(canvas);
    // P15: a very thin color-only layer over the verified lunar photograph.
    // No extra network/file loads, no alteration of the NASA JPEG pixels.
    const lunarTint=(chroma && !trueLimb && !naturalLimb)?document.createElement('div'):null;
    if(lunarTint){
      lunarTint.className='chroma-lunar-tint';
      lunarTint.setAttribute('aria-hidden','true');
      hero.prepend(lunarTint);
    }
    let lastWidth=0,lastHeight=0,frame=0;
    const moonImage=lunar?new Image():null;
    if(moonImage){
      moonImage.decoding='async';
      moonImage.onload=()=>{lastWidth=0;request();root.dataset.lunarAsset='ready';};
      moonImage.onerror=()=>{root.dataset.lunarAsset='unavailable';};
    }
    const draw=()=>{
      const r=hero.getBoundingClientRect();
      if(Math.abs(r.width-lastWidth)<2 && Math.abs(r.height-lastHeight)<2) return;
      lastWidth=r.width;lastHeight=r.height;
      if(lunarTint){
        // Same geometry used by P14 makeSerene, including its separate mobile tier.
        const w=Math.max(280,Math.round(r.width)),h=Math.max(320,Math.round(r.height));
        const mobile=w<610,x=mobile?w*.73:w*.80;
        const y=mobile?Math.min(137,h*.23):h*.305;
        const rad=mobile?Math.min(w*.218,84):Math.min(w*.16,h*.235,132);
        lunarTint.style.left=(x-rad)+'px';lunarTint.style.top=(y-rad)+'px';
        lunarTint.style.width=(rad*2)+'px';lunarTint.style.height=(rad*2)+'px';
      }
      if(serene)makeSerene(canvas,moonImage,softLimb,trueLimb||naturalLimb,naturalLimb);
      else if(royale)makeRoyale(canvas,lunar?moonImage:null);
      else (nocturne ? makeNocturne : makePigment)(canvas);
    };
    const request=()=>{if(frame)cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{frame=0;draw();});};
    request();
    if(moonImage)moonImage.src='./lunar-nearside.jpg';
    if('ResizeObserver' in window) new ResizeObserver(request).observe(hero);
    else window.addEventListener('resize',request,{passive:true});
    document.fonts?.ready?.then(request).catch(()=>{});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  window.TSZ_ART_PREVIEW=Object.freeze({mode:paintMode,visualVersion:salonFinish?'p20-salon-polish':lunarGallery?'p19-lunar-salon':naturalLimb?'p18-natural-lunar-edge':trueLimb?'p17-true-lunar-limb':softLimb?'p16-soft-limb':chroma?'p15-chroma':serene?'p14-serene':lunar?'p13-lunar':royale?'p12-royale':nocturne?'p11-nocturne':'p10-v1',telemetry:false});
})();
