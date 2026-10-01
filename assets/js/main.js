
const body=document.body, html=document.documentElement;
const savedTheme=localStorage.getItem('examora-theme'); if(savedTheme==='dark') body.classList.add('dark');
function toggleTheme(){body.classList.toggle('dark');localStorage.setItem('examora-theme',body.classList.contains('dark')?'dark':'light');}
function toggleRTL(){const rtl=html.getAttribute('dir')==='rtl';html.setAttribute('dir',rtl?'ltr':'rtl');html.setAttribute('lang','en');localStorage.setItem('examora-dir',rtl?'ltr':'rtl');}
const savedDir=localStorage.getItem('examora-dir'); if(savedDir) html.setAttribute('dir',savedDir);
function toggleMenu(){const menu=document.querySelector('.mobile-menu');if(!menu)return;const isOpen=menu.classList.toggle('open');const button=document.querySelector('.menu-toggle');if(button)button.setAttribute('aria-expanded',String(isOpen));}
document.addEventListener('click',e=>{const fb=e.target.closest('[data-filter]');if(fb){document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));fb.classList.add('active');const f=fb.dataset.filter;document.querySelectorAll('[data-category]').forEach(c=>c.style.display=(f==='all'||c.dataset.category===f)?'':'none')}})
document.addEventListener('click',e=>{const a=e.target.closest('.answer');if(a){a.parentElement.querySelectorAll('.answer').forEach(x=>x.classList.remove('active'));a.classList.add('active')}})
document.addEventListener('click',e=>{const q=e.target.closest('.qnum');if(q){document.querySelectorAll('.qnum').forEach(x=>x.classList.remove('current'));q.classList.add('current')}})
function fakeSubmit(form){const msg=form.querySelector('.form-msg');if(msg){msg.textContent='Thanks! This demo form is ready to connect to your backend.';msg.style.color='var(--success)'}return false}
function countDown(){document.querySelectorAll('[data-countdown]').forEach(el=>{let sec=+el.dataset.countdown; setInterval(()=>{sec=Math.max(0,sec-1);let d=Math.floor(sec/86400),h=Math.floor(sec%86400/3600),m=Math.floor(sec%3600/60),s=sec%60;el.querySelector('[data-d]').textContent=d;el.querySelector('[data-h]').textContent=String(h).padStart(2,'0');el.querySelector('[data-m]').textContent=String(m).padStart(2,'0');el.querySelector('[data-s]').textContent=String(s).padStart(2,'0')},1000)})} countDown();

// Subtle section reveal; respects reduced-motion preferences.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const revealTargets=document.querySelectorAll('.section > .container, .section-sm > .container');
  revealTargets.forEach(el=>el.classList.add('section-reveal'));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});
  revealTargets.forEach(el=>observer.observe(el));
}

// Home dropdown: hover works on desktop; click/touch also toggles it.
document.addEventListener('click',e=>{
  const trigger=e.target.closest('.nav-drop-trigger');
  document.querySelectorAll('.nav-dropdown.open').forEach(d=>{if(!trigger || !d.contains(trigger)) d.classList.remove('open')});
  if(trigger){const dd=trigger.closest('.nav-dropdown');const willOpen=!dd.classList.contains('open');dd.classList.toggle('open',willOpen);trigger.setAttribute('aria-expanded',String(willOpen));}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('.nav-dropdown.open').forEach(d=>d.classList.remove('open'));document.querySelectorAll('.nav-drop-trigger[aria-expanded="true"]').forEach(b=>b.setAttribute('aria-expanded','false'));}});

// Future-Lab visual layer: mark device as active after first paint.
requestAnimationFrame(()=>document.body.classList.add('future-lab-ready'));

// Close the tablet/mobile navigation after choosing a destination, on outside click,
// or when the viewport returns to desktop navigation.
document.addEventListener('click',e=>{
  const menu=document.querySelector('.mobile-menu');
  const toggle=e.target.closest('.menu-toggle');
  if(!menu) return;
  if(e.target.closest('.mobile-menu a')){
    menu.classList.remove('open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
    return;
  }
  if(menu.classList.contains('open') && !e.target.closest('.mobile-menu') && !toggle){
    menu.classList.remove('open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
  }
});
window.addEventListener('resize',()=>{
  if(window.innerWidth>1050){
    document.querySelector('.mobile-menu')?.classList.remove('open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
  }
});

// Expanded results and journey interactions
document.addEventListener('click',function(e){
  const s=e.target.closest('.student-score'); if(s){const m=document.getElementById('resultModal'); if(!m)return; document.getElementById('rmName').textContent=s.dataset.name;document.getElementById('rmExam').textContent=s.dataset.exam;document.getElementById('rmScore').textContent=s.dataset.score;document.getElementById('rmRank').textContent=s.dataset.rank;document.getElementById('rmDetail').textContent=s.dataset.detail;m.classList.add('open');m.setAttribute('aria-hidden','false');}
  if(e.target.matches('.modal-close')||e.target.id==='resultModal'){const m=document.getElementById('resultModal');if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true')}}
  const j=e.target.closest('.journey-btn'); if(j){const m=document.getElementById('journeyModal');if(m){document.getElementById('journeyText').textContent=j.dataset.story;m.classList.add('open');m.setAttribute('aria-hidden','false')}}
  if(e.target.matches('.journey-close')||e.target.id==='journeyModal'){const m=document.getElementById('journeyModal');if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true')}}
});

// Close result/journey dialogs with Escape for keyboard accessibility.
document.addEventListener('keydown',e=>{
  if(e.key!=='Escape') return;
  ['resultModal','journeyModal'].forEach(id=>{
    const modal=document.getElementById(id);
    if(modal?.classList.contains('open')){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');}
  });
});


// Mobile/tablet menu: highlight the page currently being viewed.
(function syncMobileCurrentPage(){
  const normalizePath=value=>{
    if(!value) return '';
    const clean=value.split('#')[0].split('?')[0];
    const parts=clean.split('/').filter(Boolean);
    return parts[parts.length-1] || 'index.html';
  };

  const current=normalizePath(window.location.pathname);
  const mobileLinks=document.querySelectorAll('.mobile-menu a[href]');

  mobileLinks.forEach(link=>{
    link.classList.toggle('active',normalizePath(link.getAttribute('href'))===current);
  });
})();
