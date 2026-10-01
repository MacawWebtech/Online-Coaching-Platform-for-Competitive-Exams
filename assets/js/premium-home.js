(()=>{
  const days=[
    ['MONDAY / CONCEPTS','Build your foundation','Study a focused Quantitative Aptitude topic, then work through a short set of examples.','Quantitative Aptitude','60 minutes','assets/images/resources/study-material.jpg','Student study materials for a focused concept session',['20 concept questions','10 timed practice questions','5-minute mistake review']],
    ['TUESDAY / PRACTICE','Improve accuracy','Solve a timed Reasoning question set and check explanations after each attempt.','Reasoning','45 minutes','assets/images/heading-backgrounds/courses.jpg','Student practising exam questions during a focused study session',['25 practice questions','15-minute timed set','Review every incorrect answer']],
    ['WEDNESDAY / REVISION','Make learning stick','Review notes and retry questions you missed earlier in the week.','English and general revision','50 minutes','assets/images/about/classroom.jpg','Students reviewing learning material in a classroom',['Review key notes','Retry missed questions','Update revision list']],
    ['THURSDAY / MOCK TEST','Practise under exam conditions','Complete a sample timed test, then note which sections took longer than expected.','Mixed exam pattern','90 minutes','assets/images/heading-backgrounds/mock-tests.jpg','Exam preparation setup for a timed mock test',['Complete one full mock','Track slow sections','Review accuracy and timing']],
    ['FRIDAY / REVIEW','Plan your next move','Sort mistakes by topic and choose the priorities for next week.','Performance review','40 minutes','assets/images/heading-backgrounds/results.jpg','Student reviewing progress and planning the next study week',['Group mistakes by topic','Choose 3 weak areas','Plan next week’s revision']]
  ];
  const image=document.getElementById('pv-day-image');
  const goals=document.querySelector('.pv-day-goals');
  document.querySelectorAll('.pv-day').forEach(b=>b.addEventListener('click',()=>{
    const d=days[Number(b.dataset.day)];
    document.querySelectorAll('.pv-day').forEach(x=>{
      x.classList.toggle('active',x===b);
      x.setAttribute('aria-pressed',String(x===b));
    });
    ['pv-day-label','pv-day-title','pv-day-desc','pv-day-subject','pv-day-duration'].forEach((id,i)=>{
      const el=document.getElementById(id);
      if(el) el.textContent=i===3?'Subject: '+d[i]:i===4?'Suggested time: '+d[i]:d[i];
    });
    if(goals){
      const strong=goals.querySelector('strong');
      goals.innerHTML='';
      goals.appendChild(strong || Object.assign(document.createElement('strong'),{textContent:'What to complete'}));
      d[7].forEach(item=>{const s=document.createElement('span');s.textContent=item;goals.appendChild(s)});
    }
    if(image){
      image.classList.remove('pv-image-refresh');
      void image.offsetWidth;
      image.src=d[5];
      image.alt=d[6];
      image.classList.add('pv-image-refresh');
    }
  }));
})();
