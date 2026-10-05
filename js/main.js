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
      window.location.href='mailto:info@andreumatic.com?subject='+subject+'&body='+body;
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
  function fr(ts){var p=(((ts||0)/5200)%1+1)%1;try{var pt=line.getPointAtLength(p*len);dot.setAttribute('cx',pt.x.toFixed(1));dot.setAttribute('cy',pt.y.toFixed(1));}catch(_){}
  var zone=p<0.34?0:(p<0.67?1:2);for(var i=0;i<labs.length;i++){labs[i].classList.toggle('lit',i===zone);}
  window.requestAnimationFrame(fr);}
  window.requestAnimationFrame(fr);
}catch(_){}})();
/* Terminal hero (ejemplo local): escribe diagnósticos en bucle + final con logo */
(function(){try{
  var t=document.getElementById('term-text');if(!t)return;
  var ES=[['$ optimizar --red-servidor','✓ cuello de botella localizado','✓ latencia: 900ms → 12ms','✓ informe entregado'],['$ monitorizar --empresa','✓ 24 equipos vigilados','✓ 0 parones esta semana','✓ backups inmutables activos'],['$ backup --verificado','✓ copia inmutable OK','✓ última: hoy 03:00','✓ restauración probada'],['$ remoto --urgencia','✓ conectado en 2 min','✓ servidor de vuelta','✓ todo produciendo'],['$ automatizar --facturas','✓ 6h manuales → 0','✓ 0 errores de copiado','✓ Excel jubilado'],['$ web --empresa','✓ hosting OK','✓ correo restaurado','✓ SSL activo'],['$ alta --empleado','✓ puesto listo en 1h','✓ correo y accesos OK','✓ produciendo día 1'],['$ blindar --empresa','✓ 2FA activado','✓ accesos por roles','✓ 0 accesos raros'],['$ seo --captacion','✓ auditoría completa','✓ +38 posiciones','✓ leads x3']];
  var VA=[['$ optimitzar --xarxa-servidor','✓ coll de botella localitzat','✓ latència: 900ms → 12ms','✓ informe entregat'],['$ monitoritzar --empresa','✓ 24 equips vigilats','✓ 0 parades esta setmana','✓ backups immutables actius'],['$ backup --verificat','✓ còpia immutable OK','✓ última: hui 03:00','✓ restauració provada'],['$ remot --urgència','✓ connectat en 2 min','✓ servidor de volta','✓ tot produint'],['$ automatitzar --factures','✓ 6h manuals → 0','✓ 0 errors de copiat','✓ Excel jubilat'],['$ web --empresa','✓ hosting OK','✓ correu restaurat','✓ SSL actiu'],['$ alta --empleat','✓ lloc llest en 1h','✓ correu i accessos OK','✓ produint dia 1'],['$ blindar --empresa','✓ 2FA activat','✓ accessos per rols','✓ 0 accessos estranys'],['$ seo --captacio','✓ auditoria completa','✓ +38 posicions','✓ leads x3']];
  var TAG_ES='Paz mental en tu mundo digital',TAG_VA='Pau mental al teu món digital';
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches){t.textContent=ES[0].join('\n');return;}
  var bi=0,ci=0,del=false;
  function isVa(){return document.documentElement.lang==='ca';}
  function finale(){
    t.innerHTML='<div class="term-finale"><img src="assets/logo-a.jpg" alt="" style="width:130px;display:block;margin:4px auto;border-radius:10px"><div class="term-tag" id="term-tag"></div></div>';
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
  var ES=['El servidor va lento y nadie da con la causa','“No tengo copia comprobada y temo perderlo todo”','Cada alta de empleado es un caos de accesos','Perdemos horas con Excels manuales','La red se satura a primera hora','El programa de gestión se congela a diario','Un borrado accidental paraliza facturación','Pagamos licencias que nadie usa','El wifi de la oficina no llega a la nave','La web no trae ni un cliente','El correo corporativo falla sin aviso','Copiamos datos a mano entre programas','El backup nadie lo revisa nunca','Sin informe: nadie sabe qué arreglar primero'];
  var VA=['El servidor va lent i ningú dona amb la causa','“No tinc còpia comprovada i tem perdre-ho tot”','Cada alta d’empleat és un caos d’accessos','Perdem hores amb Excels manuals','La xarxa es satura a primera hora','El programa de gestió es congela a diari','Un esborrat accidental paralitza facturació','Paguem llicències que ningú usa','El wifi de l’oficina no arriba a la nau','La web no porta ni un client','El correu corporatiu falla sense avís','Copiem dades a mà entre programes','El backup ningú el revisa mai','Sense informe: ningú sap què arreglar primer'];
  var shown=[0,1,2,3],next=0;
  function rotate(){
    var P=document.documentElement.lang==='ca'?VA:ES;
    var slot=next%items.length;next++;
    var opts=[],i;
    for(i=0;i<P.length;i++){if(shown.indexOf(i)===-1)opts.push(i);}
    if(!opts.length)return;
    var pick=opts[Math.floor(Math.random()*opts.length)];
    shown[slot]=pick;
    for(i=0;i<items.length;i++){items[i].classList.remove('typing');}
    var li=items[slot],lg=document.documentElement.lang;
    li.classList.add('swap');
    setTimeout(function(){
      li.classList.remove('swap');li.classList.add('typing');
      var txt=P[pick],j=0;li.textContent='';
      (function type(){
        if(document.documentElement.lang!==lg){li.classList.remove('typing');return;}
        j++;li.textContent=txt.slice(0,j);
        if(j<txt.length){setTimeout(type,18);}else{setTimeout(function(){li.classList.remove('typing');},600);}
      })();
    },420);
  }
  setInterval(rotate,3000);
}catch(_){}})();
/* Casos rotativos: las cajitas cambian con el mismo fundido, cada 7s */
(function(){try{
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  var cards=document.querySelectorAll('.pain-grid .pain');if(!cards||cards.length<2)return;
  var ES=[{t:'“La red o el servidor van lentísimos”',b:'Abrir el programa de gestión o facturar es un suplicio. Cada minuto parado cuesta dinero.'},{t:'“Temo perder los datos de la empresa”',b:'Copias que nadie comprueba, discos que fallan, un borrado accidental. Cada hora cuenta.'},{t:'“Nuestros datos están en la nube, pero nadie revisa las copias”',b:'Creer que Microsoft 365 o Google Workspace hacen backup automático es el error nº1. Hacemos copias inmutables de tu nube.'},{t:'“Nadie supervisa las copias de seguridad. Miedo a perder datos”',b:'Copias que nadie revisa ni prueba. Si fallan, te enteras cuando ya es tarde.'},{t:'“Procesos manuales y Excels que hacen perder horas a los empleados”',b:'Copiar datos a mano entre programas: lento y con errores. Lo automatizamos y se hace solo.'},{t:'“Quiero un socio tecnológico, no un 902”',b:'Hablas con quien lo resuelve: viene, mira, lo arregla y te lo explica con calma. Tu IT externo.'},{t:'“La red y los equipos van muy lentos. Encontramos el cuello de botella”',b:'Otros técnicos no dieron con la causa. La auditoría la encuentra y la deja documentada.'},{t:'“Cada empleado nuevo es un caos”',b:'Cuentas, correo, permisos… ¿Y si algo se queda a medias el primer día?'},{t:'“El programa de gestión se arrastra cada mañana”',b:'A las 9 en punto todo se congela. Medimos, encontramos la causa y lo dejamos estable.'},{t:'“Heredamos un caos de cables y claves”',b:'Oficina con todo mezclado y nada documentado. Lo ordenamos y te lo dejamos por escrito.'}];
  var VA=[{t:'“La xarxa o el servidor van lentíssims”',b:'Obrir el programa de gestió o facturar és un suplici. Cada minut parat costa diners.'},{t:'“Tem perdre les dades de l’empresa”',b:'Còpies que ningú comprova, discos que fallen, un esborrat accidental. Cada hora compta.'},{t:'“Les nostres dades estan al núvol, però ningú revisa les còpies”',b:'Creure que Microsoft 365 o Google Workspace fan backup automàtic és l’error núm. 1. Fem còpies immutables del teu núvol.'},{t:'“Ningú supervisa les còpies de seguretat. Por de perdre dades”',b:'Còpies que ningú revisa ni prova. Si fallen, t’enteres quan ja és tard.'},{t:'“Processos manuals i Excels que fan perdre hores als empleats”',b:'Copiar dades a mà entre programes: lent i amb errors. Ho automatitzem i es fa sol.'},{t:'“Vull un soci tecnològic, no un 902”',b:'Parles amb qui ho resol: ve, mira, ho arregla i t’ho explica amb calma. El teu IT extern.'},{t:'“La xarxa i els equips van molt lents. Trobem el coll de botella”',b:'Altres tècnics no donaren amb la causa. L’auditoria la troba i la deixa documentada.'},{t:'“Cada empleat nou és un caos”',b:'Comptes, correu, permisos… I si alguna cosa es queda a mitges el primer dia?'},{t:'“El programa de gestió s’arrossega cada matí”',b:'A les 9 en punt tot es congela. Medim, trobem la causa i ho deixem estable.'},{t:'“Heretàrem un caos de cables i claus”',b:'Oficina amb tot mesclat i res documentat. Ho ordenem i t’ho deixem per escrit.'}];
  var shown=[0,1,2,3,4],busy={};
  function typeInto(cd,title,body,done){
    cd.innerHTML='<strong></strong><span></span>';
    var st=cd.querySelector('strong'),sb=cd.querySelector('span'),ph=0,ct=0,cb=0,lg=document.documentElement.lang;
    cd.classList.add('typing');
    (function type(){
      if(!st||document.documentElement.lang!==lg){cd.classList.remove('typing');if(done)done();return;}
      if(ph===0){ct++;st.textContent=title.slice(0,ct);if(ct>=title.length){ph=1;}}
      else{cb++;sb.textContent=body.slice(0,cb);if(cb>=body.length){setTimeout(function(){cd.classList.remove('typing');if(done)done();},400);return;}}
        setTimeout(type,28);
    })();
  }
  /* Redibujado en orden: cada 3s se redibuja la siguiente caja (0→1→2→3→4→0…) */
  var orderSlot=0,orderPick=6;
  function redrawNext(){
    var slot=orderSlot,pick=orderPick;
    orderSlot=(orderSlot+1)%(cards.length-1);
    orderPick++;if(orderPick>9)orderPick=0;if(orderPick===5)orderPick=6;
    shown[slot]=pick;busy[slot]=true;
    var cd=cards[slot];
    cd.classList.add('swap');
    setTimeout(function(){
      cd.classList.remove('swap');
      var Q=document.documentElement.lang==='ca'?VA:ES;
      typeInto(cd,Q[pick].t,Q[pick].b,function(){busy[slot]=false;});
    },420);
  }
  /* Primer dibujado también animado, escalonado */
  (function initC(){
    var P0=document.documentElement.lang==='ca'?VA:ES;
    for(var i=0;i<cards.length-1;i++){
      (function(slot){
        busy[slot]=true;
        setTimeout(function(){
          var Q=document.documentElement.lang==='ca'?VA:ES;
          var cd=cards[slot];
          cd.classList.add('swap');
          setTimeout(function(){cd.classList.remove('swap');typeInto(cd,Q[shown[slot]].t,Q[shown[slot]].b,function(){busy[slot]=false;});},420);
        },400+slot*350);
      })(i);
    }
  })();
  /* Las cajas se dibujan al cargar; 3s después empieza el redibujado en orden */
  setTimeout(function(){redrawNext();setInterval(redrawNext,3000);},4800);
}catch(_){}})();
/* Scroll corto con easing para anclas internas (evita el arrastre largo del nativo) */
(function(){try{
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function go(t){var y=t.getBoundingClientRect().top+window.scrollY-88;if(reduce||!window.requestAnimationFrame){window.scrollTo(0,y);return;}var s=window.scrollY,d=y-s,t0=null,D=750;function fr(ts){if(t0===null)t0=ts;var p=Math.min((ts-t0)/D,1),e=p<0.5?4*p*p*p:1-Math.pow(-2*p+2,3)/2;window.scrollTo(0,s+d*e);if(p<1)window.requestAnimationFrame(fr);}window.requestAnimationFrame(fr);}
  document.addEventListener('click',function(e){try{var a=e.target&&e.target.closest?e.target.closest('a[href^="#"]'):null;if(!a)return;var h=a.getAttribute('href');if(!h||h.length<2)return;var t=document.querySelector(h);if(!t)return;e.preventDefault();try{history.pushState(null,'',h);}catch(_){}go(t);}catch(_){}});
}catch(_){}})();
