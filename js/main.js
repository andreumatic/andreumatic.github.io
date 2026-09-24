document.getElementById('burger')?.addEventListener('click',()=>document.getElementById('nav')?.classList.toggle('open'));
/* Mejoras v1.12 (aditivo): huecos de hoy + formulario mailto */
(function(){
  var el=document.getElementById('huecos');
  function paintHuecos(){
    if(!el)return;
    var now=new Date(),day=now.getDay(),h=now.getHours()+now.getMinutes()/60,lab=day>=1&&day<=5;
    var msg,cls;
    var T=(window.amT||function(k,fb){return fb;});
    if(lab&&h>=9&&h<15){msg=T('h.day2','● Hoy: quedan 2 huecos — escríbenos y te confirmamos hora');cls='ok';}
    else if(lab&&h>=15&&h<18.5){msg=T('h.day1','● Hoy: queda 1 hueco de tarde — ¿lo reservamos?');cls='ok';}
    else if(lab&&h>=18.5){msg=T('h.full','● Hoy completo — te agendo para mañana a primera hora');cls='manana';}
    else if(lab){msg=T('h.open','● Abrimos a las 9:00 — déjanos tu mensaje y eres el primero');cls='manana';}
    else{msg=T('h.weekend','● Finde cerrado — escríbenos y el lunes a primera te contestamos');cls='manana';}
    el.textContent=msg;el.classList.add(cls);
  }
  window.amRefreshDynamic=function(){paintHuecos();};
  paintHuecos();
  /* Anclas cross-page (p.ej. cita→#contacto en móvil): recoloca tras carga completa */
  (function(){function go(){var h=location.hash;if(!h||h.length<2)return;try{var t=document.querySelector(h);if(t)t.scrollIntoView({block:'start'});}catch(_){}}window.addEventListener('load',function(){setTimeout(go,350);});})();
  var f=document.getElementById('contact-form');
  if(f){
  /* Anti-spam: marca de tiempo para trampa de tiempo (>=3s humano) */
  var tsField=f.querySelector('input[name="ts"]');
  var msgEl=document.getElementById('contact-msg');
  var showMsg=function(text,ok){if(!msgEl)return;msgEl.hidden=false;msgEl.textContent=text;msgEl.classList.toggle('ok',!!ok);msgEl.classList.toggle('err',!ok);};
  var hideMsg=function(){if(msgEl){msgEl.hidden=true;msgEl.textContent='';}};
  /* Email solo visible/obligatorio si prefiere contacto por email */
  var canalSel=f.canal, emailRow=document.getElementById('email-row');
  var syncEmailRow=function(){var need=canalSel&&canalSel.value==='email';if(emailRow)emailRow.hidden=!need;if(f.email)f.email.required=!!need;if(!need&&f.email)f.email.value='';};
  if(canalSel)canalSel.addEventListener('change',syncEmailRow);
  syncEmailRow();
  var validEmail=function(e){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(e||'').trim());};
  var validPhone=function(t){var d=String(t||'').replace(/[\s.\-()]/g,'');if(/^0034/.test(d))d='+34'+d.slice(4);if(/^34[6789]\d{8}$/.test(d))d='+'+d;return /^\+34[6789]\d{8}$/.test(d)||/^[6789]\d{8}$/.test(d)||/^\+[1-9]\d{7,14}$/.test(d);};
  if(tsField)tsField.value=String(Date.now());
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=f.nombre.value.trim(),t=f.telefono.value.trim(),m=f.mensaje.value.trim(),c=f.canal.value;
    var em=f.email?f.email.value.trim():'';
    var hp=f.empresa?f.empresa.value.trim():''; /* honeypot: bots lo rellenan */
    var ts=tsField?parseInt(tsField.value||'0',10):0;
    if(hp){return;} /* silencio ante bots */
    if(Date.now()-ts<3000){showMsg(T('f.wait','Espera unos segundos antes de enviar.'),false);return;}
    if(!n||!t||!m){
      showMsg(T('f.required','Rellena tu nombre, tu teléfono y tu caso antes de enviar.'),false);
      return;
    }
    if(!validPhone(t)){
      showMsg(T('f.phone','Revisa el teléfono: usa 9 dígitos (ej. 600 123 123) o con prefijo +34.'),false);
      return;
    }
    if(c==='email'&&!validEmail(em)){
      showMsg(T('f.email','Para contactarte por email, indícanos un email válido.'),false);
      return;
    }
    var mailto=function(){
      var subject=encodeURIComponent('Contacto web: '+n+' ('+c+')');
      var body=encodeURIComponent('Nombre: '+n+'\nTeléfono: '+(t||'-')+'\nEmail: '+(em||'-')+'\nPrefiere: '+c+'\n\nCuéntanos:\n'+m);
      window.location.href='mailto:andreumatic@gmail.com?subject='+subject+'&body='+body;
    };
    var submitButton=f.querySelector('button[type="submit"]');
    if(submitButton){submitButton.disabled=true;submitButton.textContent=T('f.sending','Enviando...');}
    hideMsg();
    var fetchFailed=false;
    /* Turnstile token (si el widget está configurado; si no hay sitekey, va vacío y el server lo gestiona) */
    var tsToken='';
    try{tsToken=(window.turnstile&&f.querySelector('.cf-turnstile'))?window.turnstile.getResponse():'';}catch(_){tsToken='';}
    fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nombre:n,telefono:t,email:em,mensaje:m,canal:c,empresa:hp,ts:tsToken?undefined:ts,'cf-turnstile-response':tsToken})})
      .then(function(r){return r.json().then(function(j){return {ok:r.ok,status:r.status,json:j};});},function(){fetchFailed=true;throw new Error('red');})
      .then(function(result){
        if(!result.ok || !result.json.ok){
          /* El servidor responde pero rechaza: avisar, no abrir mailto */
          throw new Error(result.json&&result.json.message ? result.json.message : 'No se pudo enviar la solicitud.');
        }
        showMsg(T('f.ok','Gracias por enviar su consulta, se contactará en la mayor brevedad posible.'),true);
        f.classList.add('sent');
        f.reset();
        if(tsField)tsField.value=String(Date.now());
        try{if(window.turnstile)window.turnstile.reset();}catch(_){}
      })
      .catch(function(err){
        if(fetchFailed){
          /* Sin backend/red (p. ej. GitHub Pages): fallback a email */
          mailto();
        }else{
          showMsg(err.message || T('f.err','No se pudo enviar la solicitud.'),false);
        }
      })
      .finally(function(){
        if(submitButton){submitButton.disabled=false;submitButton.textContent=T('f.submit','Enviar solicitud →');}
      });
  });
  }
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
