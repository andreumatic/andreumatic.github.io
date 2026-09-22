// Cloudflare Pages Function: POST /api/contact
// Anti-spam por capas (SEO-safe: nada cambia en el HTML indexable):
//  1) Honeypot "empresa" (bots lo rellenan) -> descartado silencioso
//  2) Trampa de tiempo: el front envía ts (ms). <3s = bot
//  3) Cloudflare Turnstile: verifica token contra siteverify (si hay SECRET)
//  4) Validación longitudes + rate-limit en memoria por IP
// Variables de entorno:
//   RESEND_API_KEY, CONTACT_TO, CONTACT_FROM,
//   TURNSTILE_SECRET_KEY (obligatoria en prod), TURNSTILE_SITE_KEY (pública, va en HTML)
// En local: `npx wrangler pages dev .` + `.dev.vars` con las mismas variables.

const TO_DEFAULT = 'andreumatic@gmail.com';
const FROM_DEFAULT = 'onboarding@resend.dev';
const MAX_LEN = 2000;

// Rate-limit best-effort por isolate (5 envíos / 10 min por IP). Complementar
// con regla WAF en Cloudflare: Security > WAF > Rate limiting, /api/contact.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter(t => now - t < 10 * 60 * 1000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 5;
}

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(payload, status = 200) {
  return Response.json(payload, { status, headers: cors() });
}

async function verifyTurnstile(token, secret, ip) {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  return data.success === true;
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: cors() });
}

export async function onRequestPost({ request, env }) {
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  if (rateLimited(ip)) {
    return json({ ok: false, message: 'Demasiados intentos. Prueba en unos minutos.' }, 429);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: 'JSON inválido.' }, 400);
  }

  // 1) Honeypot: si viene relleno es bot -> éxito falso para no dar pistas
  if (String(body.empresa || '').trim()) {
    return json({ ok: true, message: 'Solicitud enviada correctamente.', delivery: 'honeypot' });
  }

  // 2) Trampa de tiempo (solo si el front la envía sin Turnstile)
  if (body.ts && Number(body.ts)) {
    if (Date.now() - Number(body.ts) < 3000) {
      return json({ ok: false, message: 'Espera unos segundos antes de enviar.' }, 400);
    }
  }

  // 3) Turnstile
  const secret = env.TURNSTILE_SECRET_KEY;
  const token = String(body['cf-turnstile-response'] || '');
  if (secret) {
    if (!token) {
      return json({ ok: false, message: 'Verifica que no eres un robot e inténtalo de nuevo.' }, 400);
    }
    try {
      const ok = await verifyTurnstile(token, secret, ip);
      if (!ok) return json({ ok: false, message: 'Verificación anti-spam fallida.' }, 403);
    } catch (e) {
      console.error('Turnstile error:', e);
      return json({ ok: false, message: 'No se pudo verificar la solicitud.' }, 500);
    }
  }

  const nombre = String(body.nombre || '').trim().slice(0, 120);
  const telefono = String(body.telefono || '').trim().slice(0, 40);
  const email = String(body.email || '').trim().slice(0, 120);
  const mensaje = String(body.mensaje || '').trim().slice(0, MAX_LEN);
  const canal = String(body.canal || 'email').trim().slice(0, 20);
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  if (canal === 'email' && !emailOk) {
    return json({ ok: false, message: 'Para contactarte por email, indícanos un email válido.' }, 400);
  }
  if (email && !emailOk) {
    return json({ ok: false, message: 'Revisa el email indicado.' }, 400);
  }

  if (!nombre || !telefono || !mensaje) {
    return json({ ok: false, message: 'Rellena tu nombre, tu teléfono y tu caso antes de enviar.' }, 400);
  }
  var digits = telefono.replace(/[\s.\-()]/g, '');
  if (/^0034/.test(digits)) digits = '+34' + digits.slice(4);
  if (/^34[6789]\d{8}$/.test(digits)) digits = '+' + digits;
  var phoneOk = /^\+34[6789]\d{8}$/.test(digits) || /^[6789]\d{8}$/.test(digits) || /^\+[1-9]\d{7,14}$/.test(digits);
  if (!phoneOk) {
    return json({ ok: false, message: 'Revisa el teléfono: usa 9 dígitos (ej. 600 123 123) o con prefijo +34.' }, 400);
  }
  if (nombre.length < 2 || mensaje.length < 10) {
    return json({ ok: false, message: 'Cuéntanos un poco más para poder ayudarte.' }, 400);
  }
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-.]{2,120}$/.test(nombre)) {
    return json({ ok: false, message: 'Revisa el nombre indicado.' }, 400);
  }
  if (/(https?:\/\/|www\.)/i.test(mensaje) && mensaje.length < 40) {
    return json({ ok: false, message: 'Describe tu caso con tus palabras, sin enlaces.' }, 400);
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ ok: true, message: 'Solicitud recibida (modo prueba: sin RESEND_API_KEY no se envía email).', delivery: 'modo-prueba' });
  }

  const to = env.CONTACT_TO || TO_DEFAULT;
  const from = env.CONTACT_FROM || FROM_DEFAULT;
  const subject = `Contacto web: ${nombre} (${canal})`;
  const text = [
    `Nombre: ${nombre}`,
    `Teléfono: ${telefono || '-'}`,
    `Email: ${email || '-'}`,
    `Prefiere: ${canal}`,
    '',
    'Mensaje:',
    mensaje,
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], subject, text }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', res.status, err);
      return json({ ok: false, message: 'No se pudo enviar la solicitud.' }, 502);
    }
    return json({ ok: true, message: 'Solicitud enviada correctamente.', delivery: 'email-enviado' });
  } catch (e) {
    console.error('Contact error:', e);
    return json({ ok: false, message: 'No se pudo enviar la solicitud.' }, 500);
  }
}
