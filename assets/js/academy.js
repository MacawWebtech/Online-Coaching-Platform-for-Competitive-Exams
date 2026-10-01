// These controls improve local/static UI; no simulated successful backend authentication.
function refreshToggleIcons(){const dark=document.body.classList.contains('dark');document.querySelectorAll('.theme-toggle').forEach(b=>{b.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');b.setAttribute('title',dark?'Switch to light mode':'Switch to dark mode');const svg=b.querySelector('svg');if(svg)svg.innerHTML=dark?'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>':'<path d="M20.985 12.486A9 9 0 0 1 11.514 3.015 9 9 0 1 0 20.985 12.486Z"/>';});}
const _oldTheme=window.toggleTheme;window.toggleTheme=function(){_oldTheme?.();refreshToggleIcons()};
function authDemo(event,form){event.preventDefault();const status=form.querySelector('.auth-status');if(status)status.textContent='Frontend demonstration only — the form has been validated. No account was created and no credentials were sent.';return false}
function authProviderUnavailable(button){const status=button.closest('form')?.querySelector('.auth-status');if(status)status.textContent='Social sign-in is a visual demo only. No external sign-in was attempted.';}
function toggleNotifications(button){let panel=document.querySelector('.notification-panel');if(panel){panel.remove();return}panel=document.createElement('div');panel.className='notification-panel';panel.role='status';panel.textContent='You are viewing a frontend dashboard preview. No live notifications are connected.';Object.assign(panel.style,{position:'fixed',right:'25px',top:'85px',background:'var(--surface)',color:'var(--ink)',border:'1px solid var(--line)',padding:'18px',borderRadius:'12px',zIndex:'140',maxWidth:'300px',boxShadow:'var(--shadow)'});document.body.append(panel)}
function toggleDashboardMenu(){document.body.classList.toggle('sidebar-open')}
document.addEventListener('DOMContentLoaded',()=>{refreshToggleIcons();document.querySelectorAll('button[onclick*="toggleTheme"]').forEach(b=>b.classList.add('theme-toggle'));document.querySelectorAll('form.auth-card').forEach(form=>{form.addEventListener('submit',e=>{e.preventDefault();authDemo(e,form)});});document.querySelectorAll('.app-sidebar .side-nav a').forEach(a=>{a.addEventListener('click',()=>document.body.classList.remove('sidebar-open'))});document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelector('.notification-panel')?.remove();document.body.classList.remove('sidebar-open');}});});

// Local-only course discovery: filtering, searching and price ordering, without network requests.
document.addEventListener('DOMContentLoaded',()=>{
 const grid=document.querySelector('.course-grid');if(!grid)return;
 const cards=[...grid.querySelectorAll('.course-card')];
 const search=document.querySelector('.filter-panel input.search');
 const sort=document.querySelector('.filters + select.search');
 const count=document.createElement('p');count.className='course-result-count';count.setAttribute('role','status');count.setAttribute('aria-live','polite');grid.before(count);
 const empty=document.createElement('div');empty.className='course-empty';empty.hidden=true;empty.innerHTML='<h3>No matching courses</h3><p>Try another keyword or select All categories.</p>';grid.after(empty);
 function update(){
  const category=document.querySelector('.filter-btn.active')?.dataset.filter||'all';
  const query=(search?.value||'').trim().toLocaleLowerCase();
  let shown=0;cards.forEach(card=>{const match=(category==='all'||card.dataset.category===category)&&card.textContent.toLocaleLowerCase().includes(query);card.hidden=!match;card.style.display=match?'':'none';if(match)shown++});
  if(sort?.selectedIndex===2){cards.slice().sort((a,b)=>{const price=x=>Number((x.querySelector('.price')?.textContent||'').replace(/[^0-9.]/g,''))||0;return price(a)-price(b)}).forEach(c=>grid.append(c));}
  else if(sort?.selectedIndex===1){cards.slice().reverse().forEach(c=>grid.append(c));}
  else cards.forEach(c=>grid.append(c));
  count.textContent=shown+' course'+(shown===1?'':'s')+' found';empty.hidden=shown!==0;
 }
 search?.addEventListener('input',update);sort?.addEventListener('change',update);document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',update));update();
});

// Homepage sample quiz: entirely local UI, not a live exam result.
document.addEventListener('click', function(event) {
  const option = event.target.closest('.daily-question [data-answer]');
  if (!option) return;
  const question = option.closest('.daily-question');
  const correct = option.dataset.answer === 'true';
  question.querySelectorAll('[data-answer]').forEach(button => { button.disabled = true; button.classList.toggle('selected', button === option); });
  const feedback = question.querySelector('.question-feedback');
  feedback.dataset.result = correct ? 'correct' : 'review';
  feedback.textContent = correct ? 'Correct — UPSC conducts the Civil Services Examination.' : 'Review: the correct answer is UPSC. Keep practising!';
});
