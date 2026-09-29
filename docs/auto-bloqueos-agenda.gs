/* AndreuMatic — Bloqueos automáticos v2 (SEGURO: jamás borra nada)
 *
 * CAMBIO CLAVE: esta versión NO borra ningún evento. Solo crea bloqueos en
 * el día nuevo que entra en el horizonte y salta los días que ya tienen
 * bloqueos. Un evento real no se puede borrar ni chafar por accidente.
 *
 * INSTALACIÓN: sustituye TODO el contenido del proyecto por este fichero,
 * guarda y ejecuta main una vez para comprobar. El trigger diario sigue igual.
 * (doGet no cambia: NO hace falta nueva versión del despliegue web.)
 */
const CFG = {
  CALENDAR_NAME: '',
  DAYS_AHEAD: 14,
  WORK_START_H: 9,
  WORK_END_H: 19,
  MAX_BLOCKS_PER_DAY: 6,
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
  // Solo el día nuevo que entra en el horizonte. Lo ya existente no se toca.
  const target = new Date(today.getTime() + (CFG.DAYS_AHEAD - 1) * 864e5);
  if (target.getDay() === 0 || target.getDay() === 6) return;
  const start = new Date(target); start.setHours(CFG.WORK_START_H, 0, 0, 0);
  const end = new Date(target); end.setHours(CFG.WORK_END_H, 0, 0, 0);
  const busy = cal.getEvents(start, end);
  const ranges = busy.map(function (e) { return [e.getStartTime().getTime(), e.getEndTime().getTime()]; });
  // Los bloqueos ya existentes (propios, modificados o citas reales) cuentan
  // como ocupados: se evita su hora y se completa hasta el máximo en otras.
  const own = busy.filter(function (e) { return (e.getDescription() || '').indexOf(CFG.MARK) !== -1; }).length;
  const need = Math.max(0, CFG.MAX_BLOCKS_PER_DAY - Math.min(own, CFG.MAX_BLOCKS_PER_DAY));
  if (need === 0) return;
  const free = [];
  for (let h = CFG.WORK_START_H; h < CFG.WORK_END_H; h++) {
    const s = new Date(target); s.setHours(h, 0, 0, 0);
    const t = s.getTime();
    if (!ranges.some(function (b) { return t < b[1] && (t + 36e5) > b[0]; })) free.push(s);
  }
  for (let i = free.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = free[i]; free[i] = free[j]; free[j] = tmp;
  }
  let n = 0;
  while (free.length - n > CFG.MIN_FREE_PER_DAY && n < need && n < free.length) {
    const s = free[n];
    // Re-comprobación justo antes de crear (por si entró una reserva real)
    const clash = cal.getEvents(s, new Date(s.getTime() + 36e5));
    if (clash.length === 0) {
      const ev = cal.createEvent(CFG.TITLE + ' (no mover: se borra solo al pasar)', s, new Date(s.getTime() + 36e5),
        { description: CFG.MARK + ' buffer de agenda. NO reutilizar para citas reales: crear evento nuevo.' });
      try { ev.setVisibility(CalendarApp.Visibility.PRIVATE); ev.setColor(CalendarApp.EventColor.GRAY); } catch (ign) {}
    }
    n++;
  }
}

/* Huecos reales para la web (sin cambios) */
function doGet() {
  const out = [];
  const today = new Date(); today.setHours(0, 0, 0, 0);
  for (let n = 0; n < 14 && out.length < 7; n++) {
    const dd = new Date(today.getTime() + n * 864e5);
    const wd = dd.getDay();
    if (wd === 0 || wd === 6) continue;
    const wb = +CFG.WORK_START_H, we = +CFG.WORK_END_H;
    const s = new Date(dd); s.setHours(wb, 0, 0, 0);
    const e = new Date(dd); e.setHours(we, 0, 0, 0);
    const busy = cal_().getEvents(s, e).map(function (ev) {
      return [ev.getStartTime().getTime(), ev.getEndTime().getTime()];
    });
    const slots = [];
    for (let h = wb; h < we; h++) {
      const t = new Date(dd); t.setHours(h, 0, 0, 0);
      const ms = t.getTime();
      if (ms < Date.now()) continue;
      if (!busy.some(function (b) { return ms < b[1] && (ms + 36e5) > b[0]; }))
        slots.push(('0' + h).slice(-2) + ':00');
    }
    out.push({ y: dd.getFullYear(), m: dd.getMonth(), day: dd.getDate(), wd: wd, slots: slots });
  }
  return ContentService.createTextOutput(JSON.stringify({ days: out }))
    .setMimeType(ContentService.MimeType.JSON);
}
