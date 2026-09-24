/* PRUEBA LOCAL híbrida: muestra huecos con diseño propio.
   Intenta /api/slots (backend real con clave API, aún no existe) y si falla
   usa datos de ejemplo. Al elegir hueco abre tu Google para confirmar. */
(function(){
  var box = document.getElementById('slots');
  if (!box) return;
  var G = 'https://calendar.app.google/tRn4sTjoqf515veK6';
  var isVa = function(){ return document.documentElement.lang === 'ca'; };
  var DN_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var DN_VA = ['diumenge', 'dilluns', 'dimarts', 'dimecres', 'dijous', 'divendres', 'dissabte'];
  var ALL = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  function sample(){
    var days = [], d = new Date(), n = 0;
    while (days.length < 4 && n < 14){
      d = new Date(d.getTime() + (days.length === 0 && n === 0 ? 0 : 864e5)); n++;
      var wd = d.getDay();
      if (wd === 0 || wd === 6) continue;
      var seed = d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate();
      var slots = ALL.filter(function (_, i){ return ((seed * (i + 3)) % 5) < 3; });
      days.push({ y: d.getFullYear(), m: d.getMonth(), day: d.getDate(), wd: wd, slots: slots });
    }
    return days;
  }
  function render(days, live){
    var DN = isVa() ? DN_VA : DN_ES;
    box.innerHTML = '';
    days.forEach(function (dd, idx){
      var h = document.createElement('h3');
      h.style.margin = '14px 0 8px';
      var dn = DN[dd.wd];
      h.textContent = dn.charAt(0).toUpperCase() + dn.slice(1) + ' ' + dd.day;
      box.appendChild(h);
      var row = document.createElement('p');
      row.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;margin:0 0 4px';
      if (!dd.slots.length){
        var em = document.createElement('span');
        em.textContent = isVa() ? 'Complet — prova un altre dia' : 'Completo — prueba otro día';
        row.appendChild(em);
      }
      dd.slots.forEach(function (s){
        var a = document.createElement('a');
        a.className = 'btn btn-line btn-sm';
        a.href = G;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = s;
        row.appendChild(a);
      });
      box.appendChild(row);
      if (idx === 0 && !live){
        var note = document.createElement('p');
        note.style.cssText = 'font-size:12.5px;color:var(--muted);margin:10px 0 0';
        note.textContent = isVa() ? 'No s’ha pogut carregar la disponibilitat en directe. Prova de nou o reserva per WhatsApp.' : 'No se pudo cargar la disponibilidad en directo. Prueba de nuevo o reserva por WhatsApp.';
        box.appendChild(note);
      }
    });
    if (window.amRefreshDynamic) { /* nada dinámico con claves aquí */ }
  }
  var SLOTS_URL = 'https://script.google.com/macros/s/AKfycbxHHfAiR6tih5LFGH9QDTeQ0L7b7YJlOed6cXB9C4z-YQ-QBpUY1WV_Sr00w2dDmSi-/exec';
  fetch(SLOTS_URL)
    .then(function (r){ if (!r.ok) throw 0; return r.json(); })
    .then(function (d){ var ok = !!(d.days && d.days.length); render(ok ? d.days : sample(), ok); })
    .catch(function (){ render(sample(), false); });
})();
