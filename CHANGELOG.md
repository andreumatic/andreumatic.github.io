# CHANGELOG — WEB Andreumatic REORIENTACION

Cada cambio es una versión nueva (commit + tag). Base: copia de
`ANDREUMATIC-WEB-PUB` sin `.git`/`node_modules`.

## v1.17 — 2026-10-06
- Header móvil: texto de marca oculto ≤560px (queda logo-icono).
  Rev CSS unificado a `v=1.43` en las 14 páginas.

## v1.18 — 2026-10-06
- Servicios móvil (≤900px): badge-logo del hero oculto (era el
  caption "AndreuMatic" flotando sobre las tarjetas). Escritorio
  intacto. `servicios.html` en rev `1.44`.

## v1.19 — 2026-10-06
- Pills móvil uniformes (≤560px): 12.5px, min-height 52px y texto
  centrado → 12 globos idénticos en 6×2. Sin tocar textos.

## v1.20 — 2026-10-06
- Hero móvil reequilibrado: globos discretos (11.5px, 44px, borde
  fino, sombra suave) y H1 a 30px para que mande el titular.
- Marca visible en móvil a 13px; oculta solo ≤340px (medido: cabe
  a 360px). `index.html` en rev `1.44`.

## v1.16 — 2026-10-05
- Lote SEO: "mantenimiento informático" (meta, quiénes somos, FAQ,
  servicios, precios, 4 landings), "técnico informático en [ciudad]"
  y "empresa informática en [ciudad]" (landings + FAQs + JSON-LD),
  "ciberseguridad" (artículo 7, meta, knowsAbout), canonicals en 5
  legales, alt de marca con keywords. ES+VA.

## v1.15 — 2026-10-05
- Servicios hero: texto estira (`flex:1`) y logo a la derecha
  (`margin-left:auto`), centrado vertical ya existente. CSS rev a
  `v=1.42` en servicios (el resto sigue en 1.36: sin cambios para
  esas páginas).

## v1.14 — 2026-10-05
- Servicios hero: fuera botón "Ir a precios"; subtítulo directo sin
  dubitativas ES+VA. "Puntuales"→`#particulares` (id real),
  "Empresas"→`#empresas`, scroll suave verificado.

## v1.13 — 2026-10-05
- Servicios hero: subtítulo nuevo (necesidad concreta + "consúltanos
  sin compromiso"→formulario) ES+VA (`sv_lead` en `lang-va2.js`).

## v1.12 — 2026-10-05
- 4 H2 de ancho completo (d_t, v_t, c_t, o_t) a 800px vía
  `h2[data-i18n]`; `q_t` (Quiénes Somos, 2 columnas) intacto.
  `styles.css?v=1.41`.

## v1.11 — 2026-10-05
- Cajas de dolor: tras el dibujado inicial, pausa de 3s y redibujado
  secuencial en orden (0→1→2→3→4…, una caja cada 3s) en vez de
  aleatorio cada 4s.

## v1.10 — 2026-10-05
- Dolor H2 a 750px (2 líneas) vía `h2[data-i18n="d_t"]`, sin tocar
  otros H2. Tarjetas `.pain` siempre blancas (incl. `.ok`/`.typing`).
  `styles.css?v=1.40`.

## v1.9 — 2026-10-05
- Auditoría CTAs: WhatsApp solo en botones WhatsApp y flotante.
  "Pedir urgencia"→`tel:`, resto a formulario (`?servicio=` con
  preselección) o `cita.html`. ES+VA. Sin `onclick`/`data-action`.

## v1.8 — 2026-10-05
- Dolor: descripción acotada a 600px (`p[data-i18n="d_lead"]`, sin tocar
  HTML) y respiro grid 24→28px. Verificado: cabecera y tarjetas ya
  compartían `.wrap` a 94px exactos; el desfase era óptico (borde
  lateral de las tarjetas). `styles.css?v=1.39`.

## v1.7 — 2026-10-05
- Equilibrio de columnas del hero (695 vs 643px, 4×3 verificado):
  H1 a 44px máx., ritmos eyebrow/pills/CTAs/trust recortados.
  `styles.css?v=1.38`.

## v1.6 — 2026-10-05
- Pill M365 acortada a "Microsoft 365 / Google" (1 línea) ES+VA.

## v1.5 — 2026-10-05
- Hero con solo 2 CTAs (se eliminan "Qué resolvemos" y
  "Cuéntanos tu caso" del hero).

## v1.4 — 2026-10-05
- Hero sub único: solo el lema "Paz mental en tu mundo digital" ES+VA.

## v1.3 — 2026-10-05
- Hero: `min-height:190px` en `.pain-card ul` (la caja derecha ya no
  colapsa al borrar/escribir el rotador; cero layout shift).

## v1.2 — 2026-10-05
- Hero compacto: padding 58/42→40/30, ritmos h1/sub/pills/CTAs/trust
  reducidos, línea scope contenida (`max-height:64px`).

## v1.1 — 2026-10-05
- Pills del hero en cuadrícula estricta 3×1fr (2× en móvil), padding y
  fuente compactos. `styles.css?v=1.37`.

## v1.0 — 2026-10-05
- Línea base: reorientación B2B completa (fases 1–7 + mejoras).
- `index`, `servicios`, `precios`, `cita`, 4 landings locales, ES+VA,
  JSON-LD, `llms.txt`, legales. Sin tocar la web original.
