# Handoff — rediseño de la web de Oniria

> Para la próxima sesión de Claude (u otra cuenta) que retome este repo.
> Léelo completo antes de tocar nada. Última actualización: 2026-10-17.
> Complementa a [`brainstorm.md`](brainstorm.md), que tiene la visión y las referencias.

## 1. Contexto

- **Repo:** `Oniria-Dev/webpage` (GitHub). El `origin` local ya apunta ahí.
  El remoto viejo `Pietro3505/oniria-web` ya no existe.
- **Qué es:** el landing/portafolio de Oniria (oniriasolutions.com). Es Next.js 16 (App Router),
  TypeScript, Tailwind 4, shadcn y next-intl, con locales `es` y `en`.
- **Ambición del dueño:** "Oniria es la empresa de software con más gusto y más épica del mundo".
  La página es una tienda de diseñador estilo MoMA, pero para software: un mashup irreverente
  y cohesivo, multipágina (no single page).
- **Ojo:** el `CLAUDE.md` en `C:\Users\pablo\CLAUDE.md` es de **otro proyecto** (Oniric, el SaaS de
  video con IA), no de esta web. No apliques sus reglas aquí.

## 2. Reglas de trabajo (las más importantes)

1. **El usuario decide todo lo de diseño, copy y visión.** Claude implementa y ejecuta ideas
   menores. Ante cualquier decisión de diseño, ofrece opciones o referencias y pregunta.
   No inventes copy Gen Z: si lo pide, propone opciones y él elige.
2. **Se trabaja solo sobre `main`.** No crear ramas para esto.
3. **Commits pequeños en inglés y locales.** El usuario aprobó commits locales; **no hacer push**
   sin que lo pida.
4. **Cada cambio termina con** `pnpm typecheck` y `pnpm lint` sin errores (hoy hay 1 warning
   aceptado: `<img>` dentro de `works-wheel.tsx`) y **verificación visual en el navegador**.
   El usuario quiere ver el resultado apenas termina cada cambio.
5. **Itera rápido y en pequeño.** El usuario manda capturas con ajustes ("30% más chico",
   "a la derecha", "más grueso"). Haz exactamente eso, verifícalo y repórtalo en corto.
   Si algo es ambiguo y cambia el resultado, pregunta (por ejemplo, "¿toda pixelada o nítida?").
6. **Sé honesto en las evaluaciones.** El usuario pidió críticas "sin filtro".
7. **Responde en español.**

## 3. Cómo correrlo

```bash
pnpm install
pnpm dev          # http://localhost:3000/es  y  /en
pnpm typecheck
pnpm lint
pnpm check:messages   # es.json y en.json con las mismas claves
```

Si `typecheck` falla por rutas viejas en `.next/types`, borra `.next/types` (es caché).

## 4. Estado actual (commits locales en `main`, sin push)

```
beb3edb feat: show products in a Works Wheel after the hero title
c2d1e2b feat: add machine mode, a plain-text mirror of the site
d7df5ff feat: start landing redesign with halftone logo, Crucita hero and mode toggle
beeae36 chore: add taste-skill design skills and dev preview config
a90ad6c docs: add redesign brainstorm, references and component prompts
bcf12d9 (origin/main) Merge pull request #7 ...
```

También existe la rama `backup/local-wip-2026-10-15`, con cambios viejos que había sin
commitear antes de sincronizar con GitHub. No se usa; solo es respaldo.

### Rework en curso: spec #10, tickets #11–#20

El rework vive en GitHub Issues: el spec es el #10 y los tickets son sus sub-issues, con
dependencias nativas. Se trabaja bloque por bloque y el dueño da el visto bueno entre uno y otro.

- **#11 Bugs de la auditoría (hecho):**
  - Cédula del hero: en el móvil se queda a 16px del borde y va a 24px, para que el blanco sobre `#ED1C24` pase como texto grande.
  - `--dot` pasa a rojo `#ED1C24` en claro y oscuro; ya no hay cobre.
  - El footer reserva 96px abajo para el toggle.
  - El corte rojo/negro del título cae después de la primera línea (`1lh`), no a la mitad de la caja; en el móvil la primera línea es "Software".
  - El menú móvil cerrado es `inert` e `invisible`.
- **#12 Paridad es/en (hecho):** `pnpm check:messages` falla si una clave existe en un solo idioma y dice cuál y en qué archivo falta. Se corre junto a `typecheck` y `lint`.

### Lo que hay en la home (de arriba a abajo)

| Pieza | Dónde | Detalle |
|---|---|---|
| Header | `src/components/layout/site-header.tsx` | Lockup real de Oniria (isotipo + wordmark Geist SemiBold) impreso en **puntos halftone interactivos**, en blanco y con la bolita en rojo `#ED1C24`. Ancho `clamp(230px,25vw,420px)`. Menú arriba a la derecha en Instrument Serif con guiones en negrilla: `Productos - Qué hacemos¿ - Nosotros - “Filosofía”`. |
| Menú móvil | `src/components/layout/mobile-menu.tsx` | Hamburguesa por debajo de 768px y panel negro a pantalla completa. **Primera versión**: el diseño final está pendiente. |
| Hero | `src/app/[locale]/page.tsx` | Foto de Crucita (`public/images/crucita-hero.webp`, recorte de `crucita.webp`), nítida y con degradado oscuro arriba. h1 centrado en Inter Tight: "La IA es el océano. / Nosotros, el barco." Pie "Crucita, Ecuador. 2026" en una caja roja, alineada a la derecha bajo el barco (posicionada con unidades de container query según el `object-cover`). |
| Título | `src/components/scramble-title.tsx` | "La potencia latinoamericana de la tecnología cool y a lo grande." en Instrument Serif con negrita sintética. Va **montado sobre el borde de la foto**: la mitad de arriba en rojo y la de abajo en negro (`background-clip:text`). Está oculto arriba del todo; al hacer scroll sube y **baraja sus letras 0.5 s**, y al volver arriba desaparece. **El usuario quiere cambiar este copy** porque "no es tan profesional". |
| Productos | `src/components/products-wheel.tsx` + `src/components/ui/works-wheel.tsx` | **Works Wheel**: anillo que se abre en tambor 3D al hacer scroll. Hay 5 piezas: las 4 capturas de Argos Suite y Oniric con una portada provisional (`public/products/oniric/cover.svg`). |
| Footer | `src/components/layout/footer.tsx` | Fondo blanco. Isotipo + firma "Desde el centro del mundo, para todo el mundo" (en inglés "From the center of the world, for the rest of it."). Links crudos en Arial, azul `#0000EE` y minúsculas (estilo MSCHF / Google viejo). © sin "S.A.S". **Provisional**: el arte final del footer se está diseñando en otra sesión. |
| Toggle | `src/components/layout/mode-toggle.tsx` | Píldora negra fija abajo a la derecha: `human / machine`, en minúsculas, con la opción activa en rojo. "human" va en Helvetica bold y "machine" en VT323. Escribe `<html data-mode>`. |
| Modo machine | `src/components/layout/machine-view.tsx` | Índice del sitio en texto plano, blanco y en VT323 mayúsculas. Banner "ONIRIA" en bloques con **solo la O en rojo**. Incluye los textos actuales y los de la landing vieja (Sobre, Hoy, Qué hacemos, Productos, Cómo trabajamos, Origen). Está siempre en el HTML (para crawlers y agentes) y se muestra con la variante CSS `machine:` (`globals.css`). |

### Piezas técnicas reutilizables

- `src/components/ui/halftone-mark.tsx`: campo de puntos con resortes. Acepta
  `source: {kind:"svg"}` o `{kind:"text"}`, y `split` para pintar en otra tinta lo que queda
  sobre una línea. Se basa en los helpers de `halftone-wordmark-footer.tsx` (componente original
  integrado tal cual, salvo un fix de lint).
- `src/components/brand/lockup-markup.ts`: el lockup como SVG plano. Se **generó** desde
  `logo.tsx`; no redibujar el logo (regla del manual de marca).
- Fuentes (en `src/app/[locale]/layout.tsx` + `globals.css`):
  - `font-editorial`: Instrument Serif.
  - `font-grotesk`: Inter Tight, como sustituto de la letra de la mochila de Teenage Engineering, cuya fuente real no es pública.
  - `font-cli`: VT323.
  - `font-helvetica`.
- El tema está forzado en claro (`forcedTheme="light"`).
- Textos en `messages/{es,en}.json`, bajo `Home.Hero.*` y `Machine.*`.
- `.claude/skills/`: skills de taste-skill (`npx skills add Leonxlnx/taste-skill`). ESLint ignora `.claude/`.
- `.claude/launch.json`: config `web` → `pnpm dev` en el puerto 3000.

## 5. Pendientes y problemas conocidos (priorizados)

1. **Cambiar el título** "cool and big tech". El usuario lo pidió; el copy lo decide él.
2. **Links rotos:**
   - "Filosofía" apunta a `/philosophy`, que no existe.
   - "Qué hacemos¿" apunta a `/#que-hacemos`, que ya no existe.
   - `/products` y `/about` son las páginas viejas, y ahí el header blanco **no se ve**.
3. **Jerarquía:** el h1 del hero es pequeño y el título de abajo es más grande, así que no queda
   claro cuál es el mensaje principal. Además, el h1 tapa el barco.
4. **Sistema tipográfico:** hay unas 7 familias en uso. Hay que definir roles con un máximo de 3,
   más las dos del toggle.
5. **Racionar el rojo:** hoy está en la bolita, el toggle, la caja del pie de foto, el título y los
   puntos al empujarlos.
6. **Negrita falsa:** Instrument Serif solo tiene peso 400. Si se quiere grueso, buscar una serif
   condensada con bold real.
7. **Portadas reales** para cada producto y **más piezas** para la rueda (ideal 8 o más).
   Oniric no tiene imágenes.
8. ~~**El toggle tapa** "0° · Quito, Ecuador" en el footer~~ (arreglado en #11).
9. **La foto del hero mide 1067px:** se ve suave en pantallas grandes. Pedir el original en alta resolución.
10. **Ideas aún no implementadas** (están en `brainstorm.md`):
    - El clip del fundador editado con Higgsfield ("the future of video creation", en referencia a Oniric).
    - La visual de "¿y si tu empresa pudiera tener su propio cerebro digital?".
    - "The Secret Life of Things".
    - El sketchbook para contar la historia (`docs/component-prompts/meng-to-sketchbook-landing-page.txt`).
    - El glass AI button (`glass-ai-button.txt`).
    - `docs/component-prompts/works-wheel-ref/` sigue vacía: faltan las capturas de referencia.

## 6. Decisiones ya tomadas (no reabrir)

- **Logo:** halftone, con la bolita roja y no cobre. En el header va en blanco sobre la foto.
- **Toggle:** minúsculas, con slash y solo rojo. Abajo a la derecha. Sin ciclo de colores de Paint (se descartó).
- **Foto:** **nítida**. Se probó pixelada (completa y solo el barco) y se descartó.
- **Título:** en texto plano, no en puntos (se probó con puntos y se descartó). Con el split rojo/negro y la animación de aparición.
- **Pie de foto:** caja roja, alineada a la derecha bajo el barco.
- **Footer:** sin "Del sueño al sistema" (el usuario lo detesta) y sin "S.A.S".
- **Referencias:**
  - Sí: MSCHF, Teenage Engineering, Locomotive, Rauno Freiberg y basement.studio (por el modo machine).
  - A medias: Nothing (muy formal), Active Theory (sobresaturado) y Poolsuite.
  - No: Liquid Death ni Collins.
