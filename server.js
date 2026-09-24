const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const nodemailer = require('nodemailer');

const rootDir = __dirname;
const mailDir = path.join(rootDir, 'mail-drafts');
fs.mkdirSync(mailDir, { recursive: true });

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

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webp': 'image/webp'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload demasiado grande'));
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

async function handleApiContact(req, res) {
  try {
    const body = await readBody(req);
    let payload;

    try {
      payload = body ? JSON.parse(body) : {};
    } catch (error) {
      return sendJson(res, 400, { ok: false, message: 'JSON inválido.' });
    }

    const nombre = String(payload.nombre || '').trim().replace(/[\r\n]+/g, ' ').slice(0, 120);
    const telefono = String(payload.telefono || '').trim().slice(0, 40);
    const email = String(payload.email || '').trim().slice(0, 120);
    const mensaje = String(payload.mensaje || '').trim().slice(0, 2000);
    const canal = String(payload.canal || 'email').trim().replace(/[\r\n]+/g, ' ').slice(0, 20);
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    const SERVICIOS = {'pc-lento':'PC lento','datos':'Recuperar datos','mudanza':'Equipo nuevo','compras':'Asesoría de compra','cabecera':'Técnico de cabecera','remoto':'Soporte remoto','seguridad':'Seguridad digital','hogar':'Smart home / wifi','mantenimiento':'Mantenimiento','web':'Web / correo','software':'Software a medida','integracion':'Integración','empresa':'Empresa / negocio','otro':'Otro tema'};
    const servicio = SERVICIOS[String(payload.servicio || '')] || '';

    // Honeypot + trampa de tiempo (misma lógica que Cloudflare Function)
    if (String(payload.empresa || '').trim()) {
      return sendJson(res, 200, { ok: true, message: 'Solicitud enviada correctamente.', delivery: 'honeypot' });
    }
    if (payload.ts && Number(payload.ts) && Date.now() - Number(payload.ts) < 3000) {
      return sendJson(res, 400, { ok: false, message: 'Espera unos segundos antes de enviar.' });
    }

    // Turnstile en local: si hay TURNSTILE_SECRET_KEY se verifica, si no se omite (dev)
    const tsSecret = process.env.TURNSTILE_SECRET_KEY;
    const tsToken = String(payload['cf-turnstile-response'] || '');
    if (tsSecret) {
      if (!tsToken) return sendJson(res, 400, { ok: false, message: 'Falta verificación anti-spam.' });
      try {
        const params = new URLSearchParams({ secret: tsSecret, response: tsToken });
        const vr = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: params });
        const vd = await vr.json().catch(() => ({}));
        if (!vd.success) return sendJson(res, 403, { ok: false, message: 'Verificación anti-spam fallida.' });
      } catch (e) {
        console.error('Turnstile local error:', e);
        return sendJson(res, 500, { ok: false, message: 'No se pudo verificar la solicitud.' });
      }
    }

    if (!nombre || !telefono || !mensaje) {
      return sendJson(res, 400, {
        ok: false,
        message: 'Rellena tu nombre, tu teléfono y tu caso antes de enviar.'
      });
    }
    var digits = telefono.replace(/[\s.\-()]/g, '');
    if (/^0034/.test(digits)) digits = '+34' + digits.slice(4);
    if (/^34[6789]\d{8}$/.test(digits)) digits = '+' + digits;
    var phoneOk = /^\+34[6789]\d{8}$/.test(digits) || /^[6789]\d{8}$/.test(digits) || /^\+[1-9]\d{7,14}$/.test(digits);
    if (!phoneOk) {
      return sendJson(res, 400, { ok: false, message: 'Revisa el teléfono: usa 9 dígitos (ej. 600 123 123) o con prefijo +34.' });
    }
    if (canal === 'email' && !emailOk) {
      return sendJson(res, 400, { ok: false, message: 'Para contactarte por email, indícanos un email válido.' });
    }
    if (email && !emailOk) {
      return sendJson(res, 400, { ok: false, message: 'Revisa el email indicado.' });
    }
    if (nombre.length < 2 || mensaje.length < 10) {
      return sendJson(res, 400, { ok: false, message: 'Cuéntanos un poco más para poder ayudarte.' });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const subject = `Contacto web: ${nombre} (${canal})`;
    const emailText = [
      'From: Sistema AndreuMatic <noreply@localhost>',
      'To: andreumatic@gmail.com',
      `Subject: ${subject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset="UTF-8"',
      '',
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono || '-'}`,
      `Email: ${email || '-'}`,
      `Servicio: ${servicio || '-'}`,
      `Prefiere: ${canal}`,
      '',
      'Mensaje:',
      mensaje,
      '',
      `Generado: ${new Date().toISOString()}`
    ].join('\r\n');

    const fileName = `contacto-${timestamp}.eml`;
    const filePath = path.join(mailDir, fileName);
    fs.writeFileSync(filePath, emailText, 'utf8');

    let sendStatus = 'copiado-localmente';
    if (transporter) {
      try {
        await transporter.sendMail({
          from: `AndreuMatic <${gmailUser}>`,
          to: gmailUser,
          subject: `Contacto web: ${nombre} (${canal})`,
          text: [
            `Nombre: ${nombre}`,
            `Teléfono: ${telefono || '-'}`,
            `Email: ${email || '-'}`,
            `Servicio: ${servicio || '-'}`,
            `Prefiere: ${canal}`,
            '',
            'Mensaje:',
            mensaje,
            '',
            `Generado: ${new Date().toISOString()}`
          ].join('\n')
        });
        sendStatus = 'email-enviado';
      } catch (smtpError) {
        console.error('Error al enviar SMTP:', smtpError);
        sendStatus = 'email-fallido';
      }
    }

    return sendJson(res, 200, {
      ok: true,
      message: sendStatus === 'email-enviado'
        ? 'Solicitud recibida y enviada por email.'
        : 'Solicitud recibida y guardada en el servidor.',
      file: fileName,
      delivery: sendStatus
    });
  } catch (error) {
    console.error('Error en /api/contact:', error);
    return sendJson(res, 500, {
      ok: false,
      message: 'No se pudo guardar la solicitud.'
    });
  }
}

function serveStaticFile(res, reqPath) {
  const safePath = path.normalize(reqPath).replace(/\\/g, '/').replace(/^\/+/, '').replace(/\/+$/, '');
  const blocked = ['mail-drafts', 'api', 'node_modules', '.git', '.env', 'server.js', 'package.json', 'package-lock.json', 'vercel.json'];
  const first = safePath.split('/')[0].toLowerCase();
  if (blocked.includes(first) || safePath.toLowerCase().endsWith('.eml')) {
    res.writeHead(404); res.end('Not found');
    return;
  }
  const filePath = path.join(rootDir, safePath);

  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403); res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      const fallback = path.join(rootDir, 'index.html');
      fs.readFile(fallback, (readErr, content) => {
        if (readErr) {
          res.writeHead(404); res.end('Not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500); res.end('Error loading file');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (req.method === 'POST' && url.pathname === '/api/contact') {
    await handleApiContact(req, res);
    return;
  }

  const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
  serveStaticFile(res, pathname);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`AndreuMatic server running at http://localhost:${port}`);
  console.log(`Draft emails stored in: ${mailDir}`);
});
