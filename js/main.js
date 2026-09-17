document.getElementById('burger')?.addEventListener('click',()=>document.getElementById('nav')?.classList.toggle('open'));
/* Mejoras v1.12 (aditivo): huecos de hoy + formulario mailto */
(function(){
  var el=document.getElementById('huecos');
  if(el){
    var now=new Date(),day=now.getDay(),h=now.getHours()+now.getMinutes()/60,lab=day>=1&&day<=5;
    var msg,cls;
    if(lab&&h>=9&&h<15){msg='● Hoy: quedan 2 huecos — escríbenos y te confirmamos hora';cls='ok';}
    else if(lab&&h>=15&&h<18.5){msg='● Hoy: queda 1 hueco de tarde — ¿lo reservamos?';cls='ok';}
    else if(lab&&h>=18.5){msg='● Hoy completo — te agendo para mañana a primera hora';cls='manana';}
    else if(lab){msg='● Abrimos a las 9:00 — déjanos tu mensaje y eres el primero';cls='manana';}
    else{msg='● Finde cerrado — escríbenos y el lunes a primera te contestamos';cls='manana';}
    el.textContent=msg;el.classList.add(cls);
  }
  var f=document.getElementById('contact-form');
  if(f)f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=f.nombre.value.trim(),t=f.telefono.value.trim(),m=f.mensaje.value.trim(),c=f.canal.value;
    if(!n||!m){
      alert('Rellena tu nombre y describe tu caso antes de enviar.');
      return;
    }
    var mailto=function(){
      var subject=encodeURIComponent('Contacto web: '+n+' ('+c+')');
      var body=encodeURIComponent('Nombre: '+n+'\nTeléfono: '+(t||'-')+'\nPrefiere: '+c+'\n\nCuéntanos:\n'+m);
      window.location.href='mailto:andreumatic@gmail.com?subject='+subject+'&body='+body;
    };
    var submitButton=f.querySelector('button[type="submit"]');
    if(submitButton){submitButton.disabled=true;submitButton.textContent='Enviando...';}
    var fetchFailed=false;
    fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nombre:n,telefono:t,mensaje:m,canal:c})})
      .then(function(r){return r.json().then(function(j){return {ok:r.ok,status:r.status,json:j};});},function(){fetchFailed=true;throw new Error('red');})
      .then(function(result){
        if(!result.ok || !result.json.ok){
          /* El servidor responde pero rechaza: avisar, no abrir mailto */
          throw new Error(result.json&&result.json.message ? result.json.message : 'No se pudo enviar la solicitud.');
        }
        alert(result.json.message || 'Solicitud enviada correctamente.');
        f.reset();
      })
      .catch(function(err){
        if(fetchFailed){
          /* Sin backend/red (p. ej. GitHub Pages): fallback a email */
          mailto();
        }else{
          alert(err.message || 'No se pudo enviar la solicitud.');
        }
      })
      .finally(function(){
        if(submitButton){submitButton.disabled=false;submitButton.textContent='Enviar solicitud →';}
      });
  });
})();
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
