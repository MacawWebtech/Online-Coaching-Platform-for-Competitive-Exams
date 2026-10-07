document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.rtl-toggle').forEach(b=>{b.innerHTML='RTL';b.setAttribute('aria-label','Toggle RTL layout');b.title='Toggle RTL layout'});
  const targets=document.querySelectorAll('main section, .course-card, .faculty-card, .bento-card, .price-card, .result-card, .vip-card, .return-card');
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){targets.forEach(el=>el.classList.add('qc-visible'));return;}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('qc-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -30px 0px'});
  targets.forEach((el,i)=>{el.classList.add('qc-reveal');el.style.transitionDelay=`${Math.min(i%4,3)*55}ms`;io.observe(el)});
});

// Final QA: use an RTL text control consistently instead of an icon.
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.rtl-toggle').forEach(btn=>{
    btn.innerHTML='RTL';
    btn.setAttribute('aria-label','Toggle right-to-left layout');
    btn.setAttribute('title','Toggle RTL');
  });
});
// Consolidated RTL label safeguard for auth + dashboards.
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.rtl-toggle').forEach(btn=>{btn.textContent='RTL';btn.setAttribute('aria-label','Toggle RTL layout');});
});

// Issue 5: mark the current page in desktop and mobile navigation.
(function () {
  function syncNavigation() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const leaf = path => path.split('/').filter(Boolean).pop() || 'index.html';
    const page = leaf(location.pathname);
    const parentPages = {'course-details.html':'courses.html','instructor-details.html':'instructors.html','blog-details.html':'blog.html'};
    header.querySelectorAll('.navlinks a[href], .mobile-menu a[href], .nav-actions a[href]').forEach(link => {
      const target = leaf(new URL(link.getAttribute('href'), location.href).pathname);
      const exact = target === page;
      link.classList.toggle('active', exact || target === parentPages[page]);
      link.removeAttribute('aria-current');
      if (exact) link.setAttribute('aria-current', 'page');
    });
    const home = header.querySelector('.nav-drop-trigger');
    if (home) {
      const current = page === 'index.html' || page === 'home-2.html';
      home.classList.toggle('active', current);
      if (current) home.setAttribute('aria-current', 'page');
      else home.removeAttribute('aria-current');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncNavigation);
  else syncNavigation();
})();
