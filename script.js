/* ====== EDIT HERE ======
   whatsapp: her reply goes to YOUR number. Country code, digits only (Bangladesh example: 8801XXXXXXXXX).
   Leave it empty to hide the reply button. */
const CONFIG={whatsapp:"",message:"Yes, I will. ❤️"};

document.documentElement.classList.add('js');

/* scroll progress */
const bar=document.getElementById('progress');
addEventListener('scroll',()=>{const h=document.documentElement;bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true});

/* reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* lightbox with swipe */
const imgs=[...document.querySelectorAll('#grid img')],lb=document.getElementById('lb'),lbi=lb.querySelector('img');
let cur=0,sx=0;
function show(i){cur=(i+imgs.length)%imgs.length;lbi.src=imgs[cur].src;lbi.alt=imgs[cur].alt;lb.classList.add('on')}
imgs.forEach((im,i)=>im.parentElement.addEventListener('click',()=>show(i)));
lb.querySelector('.x').onclick=()=>lb.classList.remove('on');
lb.querySelector('.p').onclick=()=>show(cur-1);
lb.querySelector('.n').onclick=()=>show(cur+1);
lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('on')});
lb.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
lb.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50)show(cur+(d<0?1:-1))});
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;
  if(e.key==='Escape')lb.classList.remove('on');
  if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});

/* the question */
const note=document.getElementById('note'),done=document.getElementById('done'),wa=document.getElementById('wa');
const replies=["Of course. Take all the time you need.","No pressure at all. I will be here.","Whenever you are ready."];
let r=0;
document.getElementById('maybe').onclick=()=>{note.textContent=replies[r++%replies.length]};
document.getElementById('yes').onclick=()=>{done.classList.add('on');document.getElementById('close').focus();burst()};
document.getElementById('close').onclick=()=>done.classList.remove('on');
if(CONFIG.whatsapp){wa.hidden=false;wa.href='https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(CONFIG.message)}

/* petals */
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const cols=['#fff6e4','#ffb3c7','#f0cb94','#ff6b93'];
function field(canvas,n,speed,loop){
  const x=canvas.getContext('2d');canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight;
  const ps=Array.from({length:n},()=>({x:Math.random()*canvas.width,y:loop?Math.random()*canvas.height:-Math.random()*canvas.height,s:4+Math.random()*8,v:speed*(.5+Math.random()),w:Math.random()*6,a:Math.random()*6,c:cols[Math.random()*4|0]}));
  let t=0;
  (function f(){
    x.clearRect(0,0,canvas.width,canvas.height);
    ps.forEach(p=>{p.y+=p.v;p.a+=.03;p.x+=Math.sin(p.a+p.w)*.9;
      if(loop&&p.y>canvas.height+20){p.y=-20;p.x=Math.random()*canvas.width}
      x.save();x.globalAlpha=loop?.55:1;x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.beginPath();x.ellipse(0,0,p.s,p.s/2,0,0,7);x.fill();x.restore()});
    if(loop||++t<700)requestAnimationFrame(f);else x.clearRect(0,0,canvas.width,canvas.height);
  })();
}
function burst(){if(!reduce)field(document.getElementById('petals'),110,2.2,false)}
if(!reduce)field(document.getElementById('amb'),22,.5,true);
