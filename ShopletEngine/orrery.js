/* SHOPLET_ORRERY_P1_V001 */
const ROOT=document.querySelector('[data-shoplet-orrery]');
if(ROOT&&!ROOT.dataset.initialized){
ROOT.dataset.initialized='true';
const canvas=ROOT.querySelector('.shoplet-orrery__canvas');
const fallback=ROOT.querySelector('.shoplet-orrery__fallback');
const status=ROOT.querySelector('.shoplet-orrery__status');
const localeSelect=document.querySelector('#lang');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');
let data=null,metadata=null,runtime=null,booted=false;

const hash32=value=>{let h=2166136261;for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const unit=(h,shift=0)=>((h>>>shift)&255)/255;
const locale=()=>{const v=localeSelect?.value;return v&&data?.locales?.some(x=>x.code===v)?v:'en-US'};
const appName=(app,loc=locale())=>metadata?.apps?.[app.key]?.locales?.[loc]?.name||metadata?.apps?.[app.key]?.locales?.['en-US']?.name||app.name||app.key;
const setStatus=v=>{if(status)status.textContent=v};

function scrollToApp(index){
 const target=document.querySelectorAll('#apps .app')[index];
 if(!target)return;
 target.scrollIntoView({behavior:reduceMotion.matches?'auto':'smooth',block:'start'});
 target.classList.remove('orrery-target-pulse');void target.offsetWidth;target.classList.add('orrery-target-pulse');
 setTimeout(()=>target.classList.remove('orrery-target-pulse'),1100);
}
function buildFallback(){
 if(!data?.apps||!fallback)return;
 fallback.innerHTML='';
 data.apps.forEach((app,i)=>{
  const h=hash32(`${app.key}:${app.id||''}`),angle=(i/data.apps.length)*Math.PI*2+unit(h,8)*.28,ring=i%2?37:29;
  const b=document.createElement('button');b.type='button';b.className='shoplet-orrery__planet';
  b.style.setProperty('--x',`${50+Math.cos(angle)*ring}%`);b.style.setProperty('--y',`${50+Math.sin(angle)*(ring*.72)}%`);b.style.setProperty('--s',String(.86+unit(h,16)*.2));
  b.setAttribute('aria-label',appName(app));b.innerHTML=`<img src="assets/${app.key}/icon.webp" alt="">`;b.addEventListener('click',()=>scrollToApp(i));fallback.appendChild(b);
 });
}
function refreshFallbackLabels(){[...fallback.querySelectorAll('button')].forEach((b,i)=>{if(data?.apps?.[i])b.setAttribute('aria-label',appName(data.apps[i]))})}
function canUseGPU(){if('gpu'in navigator)return true;try{return !!document.createElement('canvas').getContext('webgl2')}catch{return false}}

async function start3D(){
 if(booted||reduceMotion.matches||!canUseGPU())return;booted=true;setStatus('Initializing orbital system');
 let THREE;
 try{THREE=await import('./vendor/three-0.185.1/three.webgpu.min.js')}catch(e){console.warn('[Orrery] Three import fallback',e);setStatus('Static constellation');booted=false;return}
 const {Scene,PerspectiveCamera,Group,WebGPURenderer,TextureLoader,SRGBColorSpace,Shape,ShapeGeometry,ExtrudeGeometry,Mesh,MeshBasicMaterial,MeshStandardMaterial,LineBasicMaterial,BufferGeometry,LineLoop,Vector3,Raycaster,Vector2,AmbientLight,DirectionalLight,Color,MathUtils,DoubleSide}=THREE;
 const scene=new Scene(),world=new Group(),interaction=new Group();interaction.add(world);scene.add(interaction);
 const camera=new PerspectiveCamera(39,1,.1,100);
 const renderer=new WebGPURenderer({canvas,antialias:true,alpha:true});renderer.setClearColor(0x000000,0);
 try{await renderer.init()}catch(e){console.warn('[Orrery] renderer fallback',e);renderer.dispose?.();setStatus('Static constellation');booted=false;return}
 scene.add(new AmbientLight(0xffffff,1.35));const light=new DirectionalLight(0xffffff,2.2);light.position.set(2.5,4.5,6);scene.add(light);
 const loader=new TextureLoader(),planets=[],raycaster=new Raycaster(),ndc=new Vector2();

 const makeSquircleShape=(size=.92,n=4.6,segments=96)=>{
  const shape=new Shape(),pts=[];
  const half=size*.5;
  for(let i=0;i<=segments;i++){
   const a=(i/segments)*Math.PI*2;
   const c=Math.cos(a),q=Math.sin(a);
   const x=half*Math.sign(c)*Math.pow(Math.abs(c),2/n);
   const y=half*Math.sign(q)*Math.pow(Math.abs(q),2/n);
   pts.push([x,y]);
  }
  shape.moveTo(pts[0][0],pts[0][1]);
  for(let i=1;i<pts.length;i++)shape.lineTo(pts[i][0],pts[i][1]);
  shape.closePath();
  return shape;
 };
 const squircleShape=makeSquircleShape();
 const frontGeometry=new ShapeGeometry(squircleShape,12);
 frontGeometry.computeBoundingBox();
 {
  const box=frontGeometry.boundingBox;
  const pos=frontGeometry.attributes.position;
  const uv=frontGeometry.attributes.uv;
  const w=Math.max(1e-6,box.max.x-box.min.x);
  const h=Math.max(1e-6,box.max.y-box.min.y);
  for(let i=0;i<pos.count;i++){
   const u=(pos.getX(i)-box.min.x)/w;
   const v=(pos.getY(i)-box.min.y)/h;
   uv.setXY(i,u,v);
  }
  uv.needsUpdate=true;
 }
 const sideGeometry=new ExtrudeGeometry(squircleShape,{depth:.055,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.018,bevelThickness:.016,curveSegments:12});
 sideGeometry.center();
 const makeParams=(app,index)=>{const h=hash32(`${app.key}:${app.id||''}`);return{a:2.15+index*.34+unit(h)*.11,e:.035+unit(h,8)*.13,speed:.115+unit(h,16)*.105,phase:unit(h,24)*Math.PI*2,tiltX:MathUtils.degToRad(-38+unit(h,4)*76),tiltZ:MathUtils.degToRad(-22+unit(h,12)*44),bodyTilt:MathUtils.degToRad(-7+unit(h,20)*14),pulse:.8+unit(h,6)*1.2}};
 const loadTexture=url=>new Promise((resolve,reject)=>loader.load(url,t=>{t.colorSpace=SRGBColorSpace;resolve(t)},undefined,reject));
 for(let i=0;i<data.apps.length;i++){
  const app=data.apps[i],p=makeParams(app,i),orbitGroup=new Group();orbitGroup.rotation.x=p.tiltX;orbitGroup.rotation.z=p.tiltZ;world.add(orbitGroup);
  const b=p.a*Math.sqrt(1-p.e*p.e),shift=-p.a*p.e,pts=[];for(let s=0;s<128;s++){const t=s/128*Math.PI*2;pts.push(new Vector3(shift+Math.cos(t)*p.a,0,Math.sin(t)*b))}
  orbitGroup.add(new LineLoop(new BufferGeometry().setFromPoints(pts),new LineBasicMaterial({color:new Color(0xffffff),transparent:true,opacity:.105,depthWrite:false})));
  let texture;try{texture=await loadTexture(`assets/${app.key}/icon.webp`)}catch(e){console.warn('[Orrery] texture failed',app.key,e);continue}
  const body=new Group();body.userData={appKey:app.key,appIndex:i};
  const side=new Mesh(sideGeometry,new MeshStandardMaterial({color:0x172033,roughness:.27,metalness:.38}));side.scale.set(1.012,1.012,1);body.add(side);
  const front=new Mesh(frontGeometry,new MeshBasicMaterial({map:texture,transparent:true,side:DoubleSide}));front.position.z=.046;front.userData=body.userData;body.add(front);
  const back=front.clone();back.position.z=-.046;back.rotation.y=Math.PI;back.userData=body.userData;body.add(back);body.rotation.z=p.bodyTilt;orbitGroup.add(body);
  planets.push({params:p,body,front,b,shift});
 }
 const resize=()=>{const r=ROOT.getBoundingClientRect(),w=Math.max(1,r.width),h=Math.max(1,r.height),mobile=w<640;renderer.setPixelRatio(Math.min(devicePixelRatio||1,mobile?1.5:2));renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=mobile?48:39;camera.position.set(0,mobile?.35:.15,mobile?11.8:10.6);camera.updateProjectionMatrix()};resize();const ro=new ResizeObserver(resize);ro.observe(ROOT);
 let px=0,py=0,dragX=0,dragY=0,vx=0,vy=0,dragging=false,downX=0,downY=0,lastX=0,lastY=0;
 ROOT.addEventListener('pointermove',e=>{const r=ROOT.getBoundingClientRect();px=MathUtils.clamp((e.clientX-r.left)/r.width*2-1,-1,1);py=MathUtils.clamp((e.clientY-r.top)/r.height*2-1,-1,1);if(!dragging)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;dragY+=dx*.0046;dragX+=dy*.0035;vy=dx*.0009;vx=dy*.0007;lastX=e.clientX;lastY=e.clientY});
 ROOT.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;dragging=true;downX=lastX=e.clientX;downY=lastY=e.clientY;ROOT.setPointerCapture?.(e.pointerId)});
 ROOT.addEventListener('pointerup',e=>{if(!dragging)return;dragging=false;ROOT.releasePointerCapture?.(e.pointerId);if(Math.hypot(e.clientX-downX,e.clientY-downY)>8)return;const r=canvas.getBoundingClientRect();ndc.x=(e.clientX-r.left)/r.width*2-1;ndc.y=-((e.clientY-r.top)/r.height*2-1);raycaster.setFromCamera(ndc,camera);const hit=raycaster.intersectObjects(planets.map(p=>p.front),false)[0];if(hit&&Number.isInteger(hit.object.userData.appIndex))scrollToApp(hit.object.userData.appIndex)});
 ROOT.addEventListener('pointercancel',()=>{dragging=false});
 let visible=!document.hidden;document.addEventListener('visibilitychange',()=>{visible=!document.hidden});
 const start=performance.now();let last=start;
 renderer.setAnimationLoop(now=>{if(!visible||reduceMotion.matches)return;const elapsed=(now-start)/1000,dt=Math.min(.05,Math.max(0,(now-last)/1000));last=now;if(!dragging){dragX+=vx*dt*60;dragY+=vy*dt*60;vx*=Math.pow(.91,dt*60);vy*=Math.pow(.91,dt*60);dragX*=Math.pow(.997,dt*60);dragY*=Math.pow(.997,dt*60)}interaction.rotation.x+=((py*-.075+dragX)-interaction.rotation.x)*Math.min(1,dt*3.4);interaction.rotation.y+=((px*.105+dragY)-interaction.rotation.y)*Math.min(1,dt*3.4);planets.forEach(x=>{const p=x.params,t=p.phase+elapsed*p.speed;x.body.position.set(x.shift+Math.cos(t)*p.a,Math.sin(t*1.7+p.phase)*.035*p.pulse,Math.sin(t)*x.b);x.body.rotation.y=Math.sin(t*.73+p.phase)*.16;x.body.rotation.x=Math.cos(t*.61+p.phase)*.08;x.body.scale.setScalar(MathUtils.clamp(.90+x.body.position.z/12,.78,1.08))});renderer.render(scene,camera)});
 runtime={renderer,ro};ROOT.dataset.ready='true';setStatus(('gpu'in navigator)?'WebGPU orbital system':'WebGL2 orbital system');
}
function stop3D(){if(!runtime)return;runtime.renderer.setAnimationLoop(null);runtime.ro.disconnect();runtime.renderer.dispose();runtime=null;ROOT.dataset.ready='false';booted=false;setStatus('Reduced motion · static constellation')}
Promise.all([fetch('data.json').then(r=>{if(!r.ok)throw new Error(`data ${r.status}`);return r.json()}),fetch('metadata.json').then(r=>{if(!r.ok)throw new Error(`metadata ${r.status}`);return r.json()})]).then(([d,m])=>{data=d;metadata=m;buildFallback();if(reduceMotion.matches){setStatus('Reduced motion · static constellation');return}if(!canUseGPU()){setStatus('Static constellation');return}const observer=new IntersectionObserver(entries=>{if(entries.some(x=>x.isIntersecting)){observer.disconnect();start3D()}},{rootMargin:'180px'});observer.observe(ROOT)}).catch(e=>{console.warn('[Orrery] authority load failed',e);setStatus('Orbital system unavailable')});
localeSelect?.addEventListener('change',refreshFallbackLabels);
reduceMotion.addEventListener?.('change',e=>{if(e.matches)stop3D();else if(data&&canUseGPU())start3D()});
}
