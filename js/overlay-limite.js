/* AndreuMatic — overlay de límite operativo + formulario en popup (v3c)
   Superpone un aviso sobre la web SIN tocar su contenido.
   No modifica texto, meta, canonical, schema, sitemap ni robots:
   la indexación queda exactamente igual.

   - Al entrar: aviso a pantalla completa, opaco (la web NO se ve detrás).
   - "Escríbenos": el formulario aparece dentro del mismo popup.
   - Entrar por index.html#contacto: el popup abre directamente con el formulario.
   - El formulario es el de la propia página: se mueve al popup, no se duplica
     (asi hay un solo widget de Turnstile y un solo envio).

   Configuracion:
     window.AM_LIMITE.ACTIVO           activa o desactiva todo
     window.AM_LIMITE.REVISAR_DIAS     cada cuanto se recuerda (0 = no recordar)
     window.AM_LIMITE.FONDO_TRANSLUCIDO  deja ver la web detras (false = opaco)
     window.AM_LIMITE.CERRABLE_PULSANDO_FONDO  cerrar con clic fuera (true por defecto)
*/
window.AM_LIMITE = {
  ACTIVO: true,
  REVISAR_DIAS: 30,
  CLAVE: 'am-limite-operativo',
  FONDO_TRANSLUCIDO: false,
  CERRABLE_PULSANDO_FONDO: true
};

(function () {
  var cfg = window.AM_LIMITE;
  if (!cfg || !cfg.ACTIVO) return;

  var T = {
    es: {
      badge: 'AndreuMatic · límite operativo',
      h: 'Seguimos trabajando. Con un límite.',
      p: 'Por el momento <b>no aceptamos nuevas contrataciones ni servicios nuevos</b>. Los clientes que ya estaban con nosotros siguen atendidos por sus canales habituales.',
      p2: 'Si te has equivocado de sitio, escríbenos y te derivamos.',
      cta: 'Escríbenos',
      foot: 'Aviso superpuesto a la web. El contenido no ha cambiado.'
    },
    va: {
      badge: 'AndreuMatic · límit operatiu',
      h: 'Continuem treballant. Amb un límit.',
      p: 'De moment <b>no acceptem noves contractacions ni serveis nous</b>. Els clients que ja hi eren amb nosaltres segueixen atesos pels seus canals habituals.',
      p2: 'Si t\'has equivocat de lloc, escriu-nos i et derivem.',
      cta: 'Escriu-nos',
      foot: 'Avís superposat al web. El contingut no ha canviat.'
    }
  };

  var lang = (function () { try { return localStorage.getItem('am-lang') === 'va' ? 'va' : 'es'; } catch (e) { return 'es'; } })();
  var t = T[lang] || T.es;

  /* ¿Hace falta mostrarlo? (salvo que entremos por el ancla del formulario) */
  var porAnclaFormulario = (location.hash || '').toLowerCase() === '#contacto';
  if (!porAnclaFormulario && cfg.REVISAR_DIAS > 0) {
    try {
      var visto = parseInt(localStorage.getItem(cfg.CLAVE) || '0', 10);
      if (visto && (Date.now() - visto) < cfg.REVISAR_DIAS * 86400000) return;
    } catch (e) { /* sin localStorage: se muestra siempre */ }
  }

  var fondo = cfg.FONDO_TRANSLUCIDO
    ? 'background:rgba(9,28,25,.94);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px)'
    : 'background:#0F2E29';   /* opaco: la web de detras no se ve */

  var st = document.createElement('style');
  st.textContent =
    '.am-limite{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:flex-start;' +
    'justify-content:center;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:26px 20px;' +
    fondo + ';color:#F4EEDD;font:16px/1.55 "Work Sans",system-ui,-apple-system,sans-serif;text-align:center;' +
    'opacity:0;animation:amLimiteIn .45s ease forwards}' +
    '@keyframes amLimiteIn{to{opacity:1}}' +
    '.am-limite-box{margin:auto;width:100%;max-width:640px;animation:amLimiteUp .5s .08s cubic-bezier(.2,.7,.2,1) both}' +
    '@keyframes amLimiteUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}' +
    '.am-limite-badge{display:inline-block;font:600 12px/1 "Space Mono",ui-monospace,monospace;letter-spacing:.14em;' +
    'text-transform:uppercase;color:#E8A33D;border:1px solid rgba(232,163,61,.45);border-radius:999px;padding:8px 14px;margin-bottom:20px}' +
    '.am-limite h1{margin:0 0 16px;font-size:clamp(26px,4.6vw,40px);line-height:1.15;color:#F4EEDD;font-weight:800}' +
    '.am-limite h1 b,.am-limite p b{color:#E8A33D}' +
    '.am-limite p{margin:0 0 12px;font-size:16.5px;color:#E9E4D6}' +
    '.am-limite-acc{display:flex;justify-content:center;margin-top:26px}' +
    '.am-limite-btn{display:inline-block;padding:15px 30px;border-radius:10px;text-decoration:none;cursor:pointer;' +
    'font-family:inherit;font-weight:700;font-size:15.5px;background:#E8A33D;color:#0F2E29;border:2px solid #E8A33D}' +
    '.am-limite-btn:focus-visible{outline:3px solid #8FD9C4;outline-offset:3px}' +
    '.am-limite-foot{margin:24px 0 0;font:400 11.5px/1.4 "Space Mono",ui-monospace,monospace;color:rgba(244,238,223,.45)}' +
    /* formulario de la propia web, alojado en el popup */
    '.am-limite-formwrap{max-width:560px;margin:22px auto 0;text-align:left}' +
    '.am-limite .form-card{margin:0;max-width:100%;box-shadow:0 22px 60px rgba(0,0,0,.45)}' +
    '.am-limite .form-msg{border-radius:10px}' +
    '@media (max-width:560px){.am-limite{padding:18px 14px}.am-limite h1{font-size:26px}}';
  document.head.appendChild(st);

  /* Solo nos interesa un formulario real. En servicios.html el id="contacto"
     es la banda de CTA (con telefono y email): si nos la llevaramos al popup,
     teachamos justo los datos de contacto que queremos ocultar. */
  var form = document.getElementById('contacto');
  if (form && form.tagName !== 'FORM') form = form.querySelector('form') || null;

  var el = document.createElement('div');
  el.className = 'am-limite';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', t.h);
  el.innerHTML =
    '<div class="am-limite-box">' +
    '<div class="am-limite-cab">' +
    '<span class="am-limite-badge">' + t.badge + '</span>' +
    '<h1>' + t.h + '</h1>' +
    '</div>' +
    '<div class="am-limite-msj">' +
    '<p>' + t.p + '</p>' +
    '<p>' + t.p2 + '</p>' +
    '<div class="am-limite-acc">' +
    (form
      ? '<button type="button" class="am-limite-btn">' + t.cta + '</button>'
      : '<a class="am-limite-btn" href="index.html#contacto">' + t.cta + '</a>') +
    '</div>' +
    '<p class="am-limite-foot">' + t.foot + '</p>' +
    '</div>' +
    '<div class="am-limite-formwrap" hidden></div>' +
    '</div>';
  document.body.appendChild(el);

  var msj = el.querySelector('.am-limite-msj');
  var host = el.querySelector('.am-limite-formwrap');
  var scrollPrevio = window.scrollY;

  /* El popup es opaco: bloqueamos el scroll del fondo mientras esta abierto */
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';

  /* El formulario se MUDA al popup (no se duplica: 1 Turnstile, 1 envio) */
  function mostrarFormulario() {
    if (!form) { location.href = 'index.html#contacto'; return; }
    msj.innerHTML = '';
    host.hidden = false;
    host.appendChild(form);
    form.classList.add('am-limite-form');
    var primero = form.querySelector('input:not([type="hidden"]), select, textarea');
    if (primero) { try { primero.focus({ preventScroll: true }); } catch (e) { primero.focus(); } }
    guardar();
  }

  function guardar() {
    try { localStorage.setItem(cfg.CLAVE, String(Date.now())); } catch (e) { }
  }

  var btn = el.querySelector('.am-limite-btn');
  if (btn && btn.tagName === 'BUTTON') btn.addEventListener('click', mostrarFormulario);

  function cerrar() {
    if (!document.body.contains(el)) return;
    el.style.transition = 'opacity .25s ease';
    el.style.opacity = '0';
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
      if (form && form.parentNode === host) document.body.appendChild(form);
      window.scrollTo(0, scrollPrevio);
    }, 260);
    guardar();
  }

  /* Cerrar con clic en la zona oscura. El cierre se decide por el elemento exacto
     pulsado, no por "fuera del popup": al abrir el formulario el boton desaparece
     del DOM, y una comprobacion contains() daria false y cerraria el popup. */
  if (cfg.CERRABLE_PULSANDO_FONDO) {
    el.addEventListener('click', function (e) {
      if (e.target === el) cerrar();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrar();
  });

  /* Si han cambiado de idioma con el selector, el aviso se refresca */
  var sel = document.getElementById('lang-select');
  if (sel) sel.addEventListener('change', function () {
    try { localStorage.removeItem(cfg.CLAVE); } catch (e) { }
    cerrar();
  });

  /* Entrada directa al formulario: popup con el formulario, sin mensaje */
  if (porAnclaFormulario && form) mostrarFormulario();
})();
