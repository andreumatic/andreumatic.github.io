# AndreuMatic – Web lista para hosting

Web estática (sin base de datos ni PHP). Sube todo el contenido de esta carpeta a `public_html/` de tu hosting y funcionará.

## Archivos
- `index.html` → Home B2B (dolor empresarial, propuesta de valor IT externo, 3 core, opiniones PYME, FAQ, contacto). Objetivo: que entiendan qué haces y te escriban.
- `servicios.html` → Detalle de servicios: 12 intervenciones puntuales + 8 de empresas (auditoría Nivel 3, iguala, automatización IA, web/SEO). Sin precios, enlaza a precios.
- `precios.html` → APARTADO APARTE de precios B2B (Soluciones Estratégicas: auditoría 250€, iguala 35€/equipo y 80€/servidor, SEO 300€/mes, automatización/web con presupuesto a medida + Intervenciones Puntuales desde 60€/h, precios antes de IVA, garantía 15 días, iguala explicada).
- `cita.html` → Agenda tu llamada de diagnóstico (15 min + plan de acción).
- `informatico-valencia/manises/mislata/quart-de-poblet.html` → Landings SEO local B2B (área servida por ciudad).
- `js/lang.js` + `js/lang-va2.js` → diccionarios ES (HTML) / VA. OJO: hay claves compartidas entre páginas (`cta_agenda`, `pt_t`→`pr_top_t`/`pr_bot_t` ya separadas en precios); al añadir textos nuevos usa claves únicas por página.
- `css/styles.css` + `js/main.js` → diseño y menú/FAQ + terminal y dolores rotativos (arrays ES/VA en main.js).
- `robots.txt`, `sitemap.xml`, `404.html`, `llms.txt`, `assets/favicon.svg`

## Técnica comercial aplicada (B2B)
- PAS + AIDA: Hero con dolor empresarial → agitación (“si te suena alguna”) → solución (departamento IT externo) → acción (llamada de diagnóstico + WhatsApp).
- Precios separados a propósito para no frenar la lectura de servicios; en home solo referencias en trustbar y CTA a /precios.
- Prueba social PYME (testimonios temporales de gerentes: sustituir por reales), garantía 15 días, presupuesto cerrado, urgencia mismo día laborable como ancla.
- CTAs: "Agenda tu llamada" (cita.html) + WhatsApp 654 225 831 con mensajes pre-rellenados por servicio (mide qué piden).
- Tel `tel:+34654225831` + `mailto:info@andreumatic.com` para clic directo en móvil.

## SEO aplicado
- Titles/descripciones únicos por página + keywords locales B2B: “soporte informático empresas Valencia, mantenimiento servidores Manises, auditoría IT Mislata, automatización PYME Quart de Poblet…”. Slugs `informatico-*` conservados a propósito (no romper posicionamiento).
- H1 único por página, semántica HTML5, FAQ con schema FAQPage, LocalBusiness/ProfessionalService con área servida.
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
- Sustituir los 4 testimonios temporales por casos reales de empresas (mantener estructura avatar/nombre/estrellas).
- Añadir página `blog/` con 3 posts B2B (“cómo auditar la red de tu PYME”, “cuánto cuesta no tener backups”, “automatizar facturación con IA”) para captar búsquedas.
- Medir: añade Google Analytics o Umami + evento clic WhatsApp.
- Dominio sugerido: andreumatic.es
