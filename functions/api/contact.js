// Cloudflare Pages Function: POST /api/contact
// Envía el formulario por API HTTP (Resend). Variables de entorno:
//   RESEND_API_KEY (obligatoria para envío real)
//   CONTACT_TO     (opcional, por defecto andreumatic@gmail.com)
//   CONTACT_FROM   (opcional; sin dominio verificado en Resend usa 'onboarding@resend.dev')
//
// En local: `npx wrangler pages dev .` + fichero `.dev.vars` con las mismas variables.
// Sin RESEND_API_KEY responde ok pero sin enviar (modo prueba, igual que server.js sin Gmail).

const TO_DEFAULT = 'andreumatic@gmail.com';
const FROM_DEFAULT = 'onboarding@resend.dev';
const MAX_LEN = 2000;

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

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: cors() });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, message: 'JSON inválido.' }, 400);
  }

  const nombre = String(body.nombre || '').trim().slice(0, 120);
  const telefono = String(body.telefono || '').trim().slice(0, 40);
  const mensaje = String(body.mensaje || '').trim().slice(0, MAX_LEN);
  const canal = String(body.canal || 'email').trim().slice(0, 20);

  if (!nombre || !mensaje) {
    return json({ ok: false, message: 'Faltan el nombre o el detalle del problema.' }, 400);
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
