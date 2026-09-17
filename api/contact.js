const nodemailer = require('nodemailer');

const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

const transporter = gmailUser && gmailAppPassword
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword
      }
    })
  : null;

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Método no permitido.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const nombre = String(body.nombre || '').trim();
    const telefono = String(body.telefono || '').trim();
    const mensaje = String(body.mensaje || '').trim();
    const canal = String(body.canal || 'email').trim();

    if (!nombre || !mensaje) {
      return res.status(400).json({ ok: false, message: 'Faltan nombre o descripción del problema.' });
    }

    const subject = `Contacto web: ${nombre} (${canal})`;
    const text = [
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono || '-'}`,
      `Prefiere: ${canal}`,
      '',
      'Mensaje:',
      mensaje,
      '',
      `Generado: ${new Date().toISOString()}`
    ].join('\n');

    if (transporter) {
      await transporter.sendMail({
        from: `AndreuMatic <${gmailUser}>`,
        to: gmailUser,
        subject,
        text
      });

      return res.status(200).json({
        ok: true,
        message: 'Solicitud recibida y enviada por email.',
        delivery: 'email-enviado'
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Solicitud recibida. Faltan credenciales de Gmail para enviar el email real.',
      delivery: 'guardado-local'
    });
  } catch (error) {
    console.error('API contact error:', error);
    return res.status(500).json({
      ok: false,
      message: 'No se pudo procesar la solicitud.'
    });
  }
};
