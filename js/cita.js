/* PRUEBA LOCAL híbrida: muestra huecos con diseño propio.
   Intenta /api/slots (backend real con clave API, aún no existe) y si falla
   usa datos de ejemplo. Al elegir hueco abre tu Google para confirmar. */
(function(){
  var box = document.getElementById('slots');
  if (!box) return;
  var G = 'https://calendar.app.google/tRn4sTjoqf515veK6';
  var isVa = function(){ return document.documentElement.lang === 'ca'; };
  var DN_ES = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  var DN_VA = ['dg', 'dl', 'dt', 'dc', 'dj', 'dv', 'ds'];
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
  function render(days){
    var DN = isVa() ? DN_VA : DN_ES;
    box.innerHTML = '';
    days.forEach(function (dd, idx){
      var h = document.createElement('h3');
      h.style.margin = '14px 0 8px';
      h.textContent = DN[dd.wd] + ' ' + dd.day;
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
      if (idx === 0){
        var note = document.createElement('p');
        note.style.cssText = 'font-size:12.5px;color:var(--muted);margin:10px 0 0';
        note.textContent = isVa() ? 'Vista prèvia amb dades d’exemple. Amb la clau API mostrarà els teus espais reals.' : 'Vista previa con datos de ejemplo. Con la clave API mostrará tus huecos reales.';
        box.appendChild(note);
      }
    });
    if (window.amRefreshDynamic) { /* nada dinámico con claves aquí */ }
  }
  fetch('/api/slots')
    .then(function (r){ if (!r.ok) throw 0; return r.json(); })
    .then(function (d){ render(d.days && d.days.length ? d.days : sample()); })
    .catch(function (){ render(sample()); });
})();
