# Infraestructura AndreuMatic — dominio, hosting, email y backend

> Última actualización: 2026-09-17. Ver decisiones en el ADR del proyecto (`codebase-memory-mcp`, proyecto `D-ANDREUMATIC-ANDREUMATIC-WEB-PUB`).

## Mapa rápido

| Pieza | Dónde | Notas |
|---|---|---|
| Dominio | `andreumatic.com` (registrado en IONOS) | DNS en Cloudflare (nameservers cambiados en IONOS) |
| Web | Cloudflare Pages, proyecto `andreumatic` | Repo `andreumatic/andreumatic.github.io`, rama `main`, auto-deploy |
| URLs públicas | `https://andreumatic.com` + `https://www.andreumatic.com` | Temporal: `andreumatic-github-io.pages.dev` |
| Espejo viejo | `https://andreumatic.github.io/` | Sigue vivo; canonical apunta a `.com` |
| Formulario | `POST /api/contact` → `functions/api/contact.js` | Envío por Resend; sin backend hace fallback a `mailto` |
| Email envío | Resend (`RESEND_API_KEY`) | `CONTACT_TO`, `CONTACT_FROM` como variables |
| Email recepción | Cloudflare Email Routing → `andreumatic@gmail.com` | Direcciones: `info@`, ampliable (`andreu@`, `administracion@`…) |
| Email respuesta | Gmail “enviar como” vía SMTP Resend | `smtp.resend.com:465`, usuario `resend` |

## Hosting — Cloudflare Pages (plan Free, uso comercial OK)

- Proyecto `andreumatic` conectado al repo GitHub. Build: framework None, sin comando, output `/`.
- Dominios personalizados: apex + `www` (Cloudflare crea los registros solo).
- Variables de entorno (Production): `RESEND_API_KEY`, `CONTACT_TO=info@andreumatic.com`, `CONTACT_FROM=onboarding@resend.dev` (cambiar a `web@andreumatic.com` al verificar dominio en Resend).
- Tras cambiar variables: *Deployments → Retry deployment*.

## DNS — Cloudflare (migrado desde IONOS)

- Nameservers del dominio cambiados en panel IONOS → `*.ns.cloudflare.com`.
- Al migrar se importaron registros viejos: se eliminaron A/AAAA a `217.160.0.56` (hosting IONOS obsoleto) y los MX de IONOS (`mx00/mx01.ionos.es`) al activar Email Routing.
- NO activar Email Routing de Cloudflare si algún día se usa buzón IONOS (incompatibles).

## Backend formulario — `functions/api/contact.js`

- Runtime Workers (Pages Functions). Validación nombre/mensaje + topes de longitud, CORS abierto, `OPTIONS → 204`.
- Sin `RESEND_API_KEY` responde `modo-prueba` (no envía). Con clave: envía y responde `email-enviado`.
- Frontal (`js/main.js`): `fetch('/api/contact')` relativo; si falla (p. ej. GitHub Pages sin backend) abre `mailto` con los datos.
- Legado eliminado: `api/contact.js` (Vercel) y `vercel.json` borrados en v1.17.

## Desarrollo local

- Solo web: `node server.js` → http://localhost:3000 (guarda borrador en `mail-drafts/`, envía por Gmail si hay `.env`). `.env` nunca se commitea.
- Web + Function real: `npx wrangler pages dev . --port 8788` (+ `.dev.vars`). Genera `.wrangler/` (ignorado en git).
- Puertos usados: 3000 (server.js), 8788 (wrangler).

## Decisiones (resumen; detalle en ADR)

1. **Cloudflare Pages en vez de Vercel**: plan gratis con uso comercial permitido (Vercel Hobby lo restringe).
2. **Sin servidor de correo propio**: deliverabilidad y mantenimiento no compensan. Email Routing + Gmail + Resend cubre recibir/responder/avisos gratis.
3. **Sin buzón IONOS de pago**: reenvío + SMTP es funcionalmente equivalente a este volumen.
4. **Favicon final**: letra A ultra-ajustada sin bordes, fondo transparente + triángulo interior vaciado (`v1.15`–`v1.16`). `apple-touch-icon` con fondo blanco (iOS pinta transparencia en negro).

## Pendiente

- [ ] Verificar dominio en Resend → `CONTACT_FROM=web@andreumatic.com`.
- [ ] Alta en Google Search Console (`andreumatic.com` + sitemap).
- [ ] Enlace perfil Google Business + reseñas reales (schema `sameAs`/`aggregateRating` con TODO).
- [ ] Fotos reales (hero, casos) — TODOs marcados en `index.html`.
