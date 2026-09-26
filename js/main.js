document.getElementById('burger')?.addEventListener('click',()=>document.getElementById('nav')?.classList.toggle('open'));
/* Mejoras v1.12 (aditivo): huecos de hoy + formulario mailto */
(function(){
  var el=document.getElementById('huecos');
  var T=(window.amT||function(k,fb){return fb;});
  function paintHuecos(){
    if(!el)return;
    var now=new Date(),day=now.getDay(),h=now.getHours()+now.getMinutes()/60,lab=day>=1&&day<=5;
    var msg,cls;
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
  var f=document.getElementById('contacto')||document.getElementById('contact-form');
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
  /* Preselección de servicio vía ?servicio= (enlaces desde servicios.html) */
  try{var qv=new URLSearchParams(location.search).get('servicio');if(qv&&/^[a-z-]+$/.test(qv)&&f.servicio&&f.servicio.querySelector('option[value="'+qv+'"]'))f.servicio.value=qv;}catch(_){}
  var validEmail=function(e){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(e||'').trim());};
  var validPhone=function(t){var d=String(t||'').replace(/[\s.\-()]/g,'');if(/^0034/.test(d))d='+34'+d.slice(4);if(/^34[6789]\d{8}$/.test(d))d='+'+d;return /^\+34[6789]\d{8}$/.test(d)||/^[6789]\d{8}$/.test(d)||/^\+[1-9]\d{7,14}$/.test(d);};
  if(tsField)tsField.value=String(Date.now());
  f.addEventListener('submit',function(e){
    e.preventDefault();
    var n=f.nombre.value.trim(),t=f.telefono.value.trim(),m=f.mensaje.value.trim(),c=f.canal.value;
    var em=f.email?f.email.value.trim():'';
    var sv=f.servicio?f.servicio.value:'';
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
      var body=encodeURIComponent('Nombre: '+n+'\nTeléfono: '+(t||'-')+'\nEmail: '+(em||'-')+'\nServicio: '+(sv||'-')+'\nPrefiere: '+c+'\n\nCuéntanos:\n'+m);
      window.location.href='mailto:andreumatic@gmail.com?subject='+subject+'&body='+body;
    };
    var submitButton=f.querySelector('button[type="submit"]');
    if(submitButton){submitButton.disabled=true;submitButton.textContent=T('f.sending','Enviando...');}
    hideMsg();
    var fetchFailed=false;
    /* Turnstile token (si el widget está configurado; si no hay sitekey, va vacío y el server lo gestiona) */
    var tsToken='';
    try{tsToken=(window.turnstile&&f.querySelector('.cf-turnstile'))?window.turnstile.getResponse():'';}catch(_){tsToken='';}
    fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nombre:n,telefono:t,email:em,servicio:sv,mensaje:m,canal:c,empresa:hp,ts:tsToken?undefined:ts,'cf-turnstile-response':tsToken})})
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
/* Hero vivo: el logo responde al ratón y al scroll (solo puntero fino, sin reduced-motion) */
(function(){try{
  if(!window.matchMedia||!window.matchMedia('(pointer:fine)').matches)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var logo=document.querySelector('.hero-logo');if(!logo)return;
  var hero=logo.closest('.hero');if(!hero)return;
  var tx=0,ty=0,sy=0,raf=0;
  logo.style.transition='transform .18s ease-out, box-shadow .18s ease-out';
  function paint(){raf=0;
    if(tx===0&&ty===0){logo.style.transform=sy?('translateY('+(sy*0.05).toFixed(1)+'px)') :'';logo.style.boxShadow='';return;}
    logo.style.transform='perspective(900px) rotateX('+(-ty*7).toFixed(2)+'deg) rotateY('+(tx*10).toFixed(2)+'deg)';
    logo.style.boxShadow=(-tx*26).toFixed(1)+'px '+(18-ty*26).toFixed(1)+'px 52px rgba(0,0,0,.42)';
  }
  function sched(){if(!raf&&window.requestAnimationFrame)raf=window.requestAnimationFrame(paint);else paint();}
  hero.addEventListener('mousemove',function(e){var r=hero.getBoundingClientRect();tx=(e.clientX-r.left)/r.width-0.5;ty=(e.clientY-r.top)/r.height-0.5;sched();});
  hero.addEventListener('mouseleave',function(){tx=0;ty=0;sched();});
  window.addEventListener('scroll',function(){sy=window.scrollY||0;sched();},{passive:true});
}catch(_){}})();
/* Pulso ECG: punto guiado por getPointAtLength (a prueba de todo) */
(function(){try{
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  if(!window.requestAnimationFrame)return;
  var line=document.querySelector('.scope-base'),dot=document.querySelector('.scope-dot');
  if(!line||!dot||!line.getTotalLength)return;
  var len=line.getTotalLength();
  var labs=document.querySelectorAll('.scope-label span');
  function fr(ts){var p=(((ts||0)/3200)%1+1)%1;try{var pt=line.getPointAtLength(p*len);dot.setAttribute('cx',pt.x.toFixed(1));dot.setAttribute('cy',pt.y.toFixed(1));}catch(_){}
  var zone=p<0.34?0:(p<0.67?1:2);for(var i=0;i<labs.length;i++){labs[i].classList.toggle('lit',i===zone);}
  window.requestAnimationFrame(fr);}
  window.requestAnimationFrame(fr);
}catch(_){}})();
/* Terminal hero (ejemplo local): escribe diagnósticos en bucle + final con logo */
(function(){try{
  var t=document.getElementById('term-text');if(!t)return;
  var ES=[['$ diagnosticar --pc-lento','✓ 3 virus eliminados','✓ arranque: 10min → 40s','✓ copia verificada','✓ listo, a lo tuyo'],['$ estado --wifi-hogar','✓ cobertura 100%','✓ 0 cortes esta semana','✓ cámaras en línea'],['$ recuperar --fotos','✓ 1.240 fotos a salvo','✓ copia en la nube OK'],['$ revisar --copias','✓ copia diaria OK','✓ última: hoy 03:00','✓ disco externo sano'],['$ remoto --urgencia','✓ conectado en 2 min','✓ impresora configurada','✓ todo funcionando'],['$ web --caida','✓ hosting OK','✓ correo restaurado','✓ SSL activo'],['$ optimizar --arranque','✓ 27 programas al inicio','✓ solo 4 necesarios','✓ arranca en 40s'],['$ blindar --cuentas','✓ 2FA activado','✓ contraseñas únicas','✓ 0 accesos raros'],['$ domotica --casa','✓ 12 dispositivos','✓ una sola app','✓ todo responde']];
  var VA=[['$ diagnosticar --pc-lent','✓ 3 virus eliminats','✓ arranc: 10min → 40s','✓ còpia verificada','✓ llest, a la teua'],['$ estat --wifi-llar','✓ cobertura 100%','✓ 0 talls esta setmana','✓ càmeres en línia'],['$ recuperar --fotos','✓ 1.240 fotos a salvo','✓ còpia al núvol OK'],['$ revisar --còpies','✓ còpia diària OK','✓ última: hui 03:00','✓ disc extern sa'],['$ remot --urgència','✓ connectat en 2 min','✓ impressora configurada','✓ tot funcionant'],['$ web --caiguda','✓ hosting OK','✓ correu restaurat','✓ SSL actiu'],['$ optimitzar --arranc','✓ 27 programes a l’inici','✓ només 4 necessaris','✓ arranca en 40s'],['$ blindar --comptes','✓ 2FA activat','✓ contrasenyes úniques','✓ 0 accessos estranys'],['$ domotica --casa','✓ 12 dispositius','✓ una sola app','✓ tot respon']];
  var TAG_ES='Paz mental en tu mundo digital',TAG_VA='Pau mental al teu món digital';
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){t.textContent=ES[0].join('\n');return;}
  var bi=0,ci=0,del=false;
  function isVa(){return document.documentElement.lang==='ca';}
  function finale(){
    t.innerHTML='<div class="term-finale"><img src="assets/logo-a.png" alt="" style="width:130px;display:block;margin:4px auto;border-radius:10px"><div class="term-tag" id="term-tag"></div></div>';
    var tag=document.getElementById('term-tag'),tt=isVa()?TAG_VA:TAG_ES,ti=0;
    (function typeTag(){ti++;tag.textContent=tt.slice(0,ti);if(ti<tt.length){setTimeout(typeTag,55);}else{setTimeout(function(){t.textContent='';bi=0;ci=0;del=false;setTimeout(tick,700);},4000);}})();
  }
  function tick(){
    var B=isVa()?VA:ES;
    if(bi>=B.length){finale();return;}
    var block=B[bi],full=block.join('\n');
    if(!del){
      ci++;t.textContent=full.slice(0,ci);
      if(ci>=full.length){del=true;setTimeout(tick,2800);return;}
      setTimeout(tick,45);
    }else{
      t.textContent='';del=false;bi++;ci=0;setTimeout(tick,700);return;
    }
  }
  tick();
}catch(_){}})();
/* Dolores rotativos: cada ~5s una frase cambia por otra del pool, con fundido */
(function(){try{
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var items=document.querySelectorAll('.pain-card ul li');if(!items||items.length<2)return;
  var ES=['El PC tarda 10 minutos en arrancar','“No he hecho copia y tengo miedo de perderlo todo”','Compraste un portátil y no era lo que necesitabas','Tienes 40 contraseñas y no recuerdas ninguna','El móvil no tiene espacio ni para una foto más','Te llaman del "banco" y no sabes si es un timo','El correo no llega y nadie te explica por qué','El disco hace un ruido raro que da mal rollo','Me han hackeado la cuenta y no puedo entrar','La tele no se conecta al wifi desde el domingo'];
  var VA=['El PC tarda 10 minuts en arrancar','“No he fet còpia i tinc por de perdre-ho tot”','Vas comprar un portàtil i no era lo que necessitaves','Tens 40 contrasenyes i no recordes cap','El mòbil no té espai ni per a una foto més','Et telefonen del "banc" i no saps si és un timo','El correu no arriba i ningú t’explica per què','El disc fa un soroll estrany que fa mala espina','M’han hackejat el compte i no puc entrar','La tele no es connecta al wifi des de diumenge'];
  var shown=[0,1,2,3],next=0;
  function rotate(){
    var P=document.documentElement.lang==='ca'?VA:ES;
    var slot=next%items.length;next++;
    var opts=[],i;
    for(i=0;i<P.length;i++){if(shown.indexOf(i)===-1)opts.push(i);}
    if(!opts.length)return;
    var pick=opts[Math.floor(Math.random()*opts.length)];
    shown[slot]=pick;
    items[slot].classList.add('swap');
    setTimeout(function(){items[slot].textContent=P[pick];items[slot].classList.remove('swap');},420);
  }
  setInterval(rotate,3000);
}catch(_){}})();
/* Scroll corto con easing para anclas internas (evita el arrastre largo del nativo) */
(function(){try{
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go(t){var y=t.getBoundingClientRect().top+window.scrollY-88;if(reduce||!window.requestAnimationFrame){window.scrollTo(0,y);return;}var s=window.scrollY,d=y-s,t0=null,D=750;function fr(ts){if(t0===null)t0=ts;var p=Math.min((ts-t0)/D,1),e=p<0.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;window.scrollTo(0,s+d*e);if(p<1)window.requestAnimationFrame(fr);}window.requestAnimationFrame(fr);}
  document.addEventListener('click',function(e){try{var a=e.target&&e.target.closest?e.target.closest('a[href^="#"]'):null;if(!a)return;var h=a.getAttribute('href');if(!h||h.length<2)return;var t=document.querySelector(h);if(!t)return;e.preventDefault();try{history.pushState(null,'',h);}catch(_){}go(t);}catch(_){}});
}catch(_){}})();
