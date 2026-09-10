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

## Publicar (cPanel / cualquier hosting)
1. Comprime o sube por FTP todo tal cual a `public_html/`.
2. Comprueba: `/`, `/servicios.html`, `/precios.html` cargan y el botón WhatsApp abre `wa.me/34654225831`.
3. En Google Search Console: añade propiedad, sube `sitemap.xml`.
4. Crea ficha Google Business (Manises-Valencia) enlazando a la web. Pide reseñas y sustituye los 3 testimonios de ejemplo.
5. Sustituye fotos/logo: pon tus PNG del logo en `assets/` y cámbialos en el header si quieres (ahora uso “A” vectorial para ir rápido).

## Próximos pasos recomendados
- Añadir página `blog/` con 3 posts (“PC lento Windows 11”, “qué portátil comprar 2026”, “copia de seguridad autónomos”) para captar búsquedas.
- Medir: añade Google Analytics o Umami + evento clic WhatsApp.
- Dominio sugerido: andreumatic.es
