document.getElementById('burger')?.addEventListener('click',()=>document.getElementById('nav')?.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav')?.classList.remove('open')));
const y=document.getElementById('y'); if(y) y.textContent=new Date().getFullYear();

/* Efectos provisionales fx/efectos (reversible: borrar este bloque + bloque CSS) */
(function(){
  document.body.classList.add('js');
  var header=document.querySelector('.site-header');
  var onScroll=function(){if(header)header.classList.toggle('scrolled',window.scrollY>8);};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var sel=['.hero .eyebrow','.hero h1','.hero .sub','.hero .scope','.hero .scope-label','.hero .hero-points','.hero .hero-ctas','.hero .hero-trust','.hero .hero-logo','.hero .pain-card','.trustbar > div','.block .eyebrow','.block h2.title','.block p.lead','.block .card','.block .pain','.block .testi','.block .step','.block .part','.block .biz','.svc article','.price-table','.callout','.faq details','.cta-final .wrap > *','.svc-hero > div','.svc-hero .svc-badge'];
  var els=[];document.querySelectorAll(sel.join(',')).forEach(function(el){el.classList.add('reveal');els.push(el);});
  var byParent=new Map();
  els.forEach(function(el){var p=el.parentNode;if(!byParent.has(p))byParent.set(p,[]);byParent.get(p).push(el);});
  byParent.forEach(function(group){if(group.length>1)group.forEach(function(el,i){el.dataset.d=Math.min(i*70,280);});});
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('in');});return;}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;if(t.dataset.d)t.style.transitionDelay=t.dataset.d+'ms';t.classList.add('in');io.unobserve(t);setTimeout(function(){t.style.transitionDelay='';},750);}});},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  els.forEach(function(el){io.observe(el);});
})();
