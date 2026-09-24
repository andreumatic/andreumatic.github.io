/* AndreuMatic — Bloqueos automáticos de agenda (Google Apps Script)
 *
 * QUÉ HACE: cada noche borra sus bloqueos futuros y crea otros nuevos al azar
 * (máx. 3/día, dejando siempre ≥2 huecos libres). El horario de citas de Google
 * los ve como ocupado y los oculta. Las reservas reales no se tocan nunca.
 * Es tiempo de buffer real (desplazamientos, admin): toda agenda lo tiene.
 *
 * INSTALACIÓN (5 min, una sola vez):
 *  1. https://script.google.com → Proyecto nuevo → pega este código → Guardar.
 *  2. Ejecutar → main → autoriza con tu cuenta (aviso "no verificado": es tu
 *     propio script → Configuración avanzada → Ir (seguro)).
 *  3. Desencadenadores (reloj, izq.) → Añadir → main / Según tiempo /
 *     Temporizador diario / 2:00-3:00 → Guardar.
 *  4. Comprueba que el calendario del horario de citas es este mismo
 *     (si no, pon su nombre exacto en CALENDAR_NAME).
 */
const CFG = {
  CALENDAR_NAME: '', // vacío = calendario por defecto
  DAYS_AHEAD: 14, // horizonte de bloqueo (igual que la ventana del horario)
  WORK_START_H: 9,
  WORK_END_H: 19, // fin exclusivo
  MAX_BLOCKS_PER_DAY: 3,
  MIN_FREE_PER_DAY: 2,
  MARK: '#auto-bloqueo',
  TITLE: 'Bloqueo agenda'
};

function cal_() {
  if (CFG.CALENDAR_NAME) {
    const cals = CalendarApp.getCalendarsByName(CFG.CALENDAR_NAME);
    if (!cals.length) throw new Error('Calendario no encontrado: ' + CFG.CALENDAR_NAME);
    return cals[0];
  }
  return CalendarApp.getDefaultCalendar();
}
function main() {
  const cal = cal_();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const horizon = new Date(today.getTime() + CFG.DAYS_AHEAD * 864e5);
  // 1) Limpia bloqueos propios futuros (el patrón se regenera cada noche)
  cal.getEvents(today, horizon).forEach(function (e) {
    if ((e.getDescription() || '').indexOf(CFG.MARK) !== -1) e.deleteEvent();
  });
  // 2) Genera bloqueos nuevos Lun-Vie
  for (let dd = new Date(today); dd < horizon; dd = new Date(dd.getTime() + 864e5)) {
    const wd = dd.getDay();
    if (wd === 0 || wd === 6) continue;
    const start = new Date(dd); start.setHours(CFG.WORK_START_H, 0, 0, 0);
    const end = new Date(dd); end.setHours(CFG.WORK_END_H, 0, 0, 0);
    const busy = cal.getEvents(start, end).map(function (e) {
      return [e.getStartTime().getTime(), e.getEndTime().getTime()];
    });
    const free = [];
    for (let h = CFG.WORK_START_H; h < CFG.WORK_END_H; h++) {
      const s = new Date(dd); s.setHours(h, 0, 0, 0);
      const t = s.getTime();
      if (!busy.some(function (b) { return t < b[1] && (t + 36e5) > b[0]; })) free.push(s);
    }
    for (let i = free.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = free[i]; free[i] = free[j]; free[j] = tmp;
    }
    let n = 0;
    while (free.length - n > CFG.MIN_FREE_PER_DAY && n < CFG.MAX_BLOCKS_PER_DAY && n < free.length) {
      const s = free[n];
      const ev = cal.createEvent(CFG.TITLE, s, new Date(s.getTime() + 36e5),
        { description: CFG.MARK + ' buffer de agenda; se regenera solo cada noche' });
      try { ev.setVisibility(CalendarApp.Visibility.PRIVATE); ev.setColor(CalendarApp.EventColor.GRAY); } catch (ign) {}
      n++;
    }
  }
}
