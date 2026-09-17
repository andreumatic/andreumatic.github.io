# AndreuMatic – Web lista para hosting

Web estática (sin base de datos ni PHP). Sube todo el contenido de esta carpeta a `public_html/` de tu hosting y funcionará.

## Archivos
- `index.html` → Home (dolor, propuesta de valor, servicios sin precios, opiniones, FAQ, contacto). Objetivo: que entiendan qué haces y te escriban.
- `servicios.html` → Detalle de todos los servicios particulares + empresas. Sin precios, enlaza a precios.
- `precios.html` → APARTADO APARTE de precios cerrados (particulares + empresas, mismo día +15€, garantía 15 días, iguala explicada).
- `css/styles.css` + `js/main.js` → diseño y menú/FAQ.
- `robots.txt`, `sitemap.xml`, `404.html`, `assets/favicon.svg`

## Técnica comercial aplicada
- PAS + AIDA: Hero con dolor → agitación (“¿te suena?”) → solución (Técnico de Cabecera) → acción (WhatsApp).
- Precios separados a propósito para no frenar la lectura de servicios; en home solo “desde” en trustbar y CTA a /precios.
- Prueba social, garantía 15 días, presupuesto cerrado, urgencia mismo día +15€ como ancla.
- Un solo CTA principal: WhatsApp 654 225 831 con mensajes pre-rellenados por servicio (mide qué piden).
- Tel `tel:+34654225831` + `mailto:andreumatic@gmail.com` para clic directo en móvil.

## SEO aplicado
- Titles/descripciones únicos por página + keywords locales: “técnico informático Valencia, reparar ordenador a domicilio Manises, recuperar datos Valencia…”.
- H1 único por página, semántica HTML5, FAQ con schema FAQPage, LocalBusiness ComputerRepair con área servida.
- `sitemap.xml` + `robots.txt`. Cambia `https://andreumatic.es/` por tu dominio real en: canonical, OG:url, JSON-LD y sitemap.
- Rendimiento: sin frameworks, 1 CSS + 1 JS, fuentes con preconnect. Ideal Core Web Vitals.
- Accesibilidad: skip-link, labels, contraste.

## Publicar (Cloudflare Pages + andreumatic.com)
1. Sube el repo a GitHub y conecta el repositorio en Cloudflare Pages (framework: None, build: sin comando, output: `/`).
2. En Pages → Settings → Environment variables: `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` (ver `.env.example`).
3. En Pages → Custom domains: añade `andreumatic.com` y `www.andreumatic.com`. Cloudflare te da los registros DNS.
4. En IONOS cambia los nameservers a los de Cloudflare (o crea los registros A/CNAME que te indique). HTTPS automático.
5. Comprueba: `/`, `/servicios.html`, `/precios.html` y un envío del formulario de prueba.
6. En Google Search Console: añade la propiedad `andreumatic.com` y sube `sitemap.xml`.

## Probar en local
- Solo web: `node server.js` → http://localhost:3000 (el formulario guarda borrador en `mail-drafts/` y envía por Gmail si hay `.env`).
- Web + Function Cloudflare: `npx wrangler pages dev .` (+ `.dev.vars` con `RESEND_API_KEY`). Sin clave responde en modo prueba.

## Próximos pasos recomendados
- Añadir página `blog/` con 3 posts (“PC lento Windows 11”, “qué portátil comprar 2026”, “copia de seguridad autónomos”) para captar búsquedas.
- Medir: añade Google Analytics o Umami + evento clic WhatsApp.
- Dominio sugerido: andreumatic.es
