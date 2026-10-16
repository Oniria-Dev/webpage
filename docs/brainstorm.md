# Oniria web — brainstorm de dirección

> Notas del brainstorm inicial (2026-10-15). Esto **guía** pero no define: el diseño
> final se construye desde cero sobre lo que el dueño de la visión decida.
> Regla: toda decisión de diseño, copy y visión la toma el usuario. Claude solo
> implementa y ejecuta ideas menores.

## Ambición
Oniria = la empresa de creación de software con más gusto y más épica del mundo.
La web es el landing/portafolio de todo lo que hacemos. No single page.

## Concepto rector
- **Mashup irreverente y cohesivo.**
- **Cada producto es una pieza** (tienda de diseñador estilo MoMA, pero para software).
  Irreverente, pero con un diseño coherente por producto.
- **"The Secret Life of Things"** — idea que gustó mucho.
- **"¿Y si tu empresa pudiera tener su propio cerebro digital?"** — pregunta central
  del brainstorm; merece una visual impactante.
- Copy con mucho carácter Gen Z (lo escribe el usuario, no Claude).

## Ideas concretas
- **Toggle HUMAN / MACHINE**: la página está lista para ser leída por un agente.
  Al pulsar MACHINE, el contenido cambia a una vista retro tipo terminal naranja,
  con alusión a la historia de la computación. Ref: basement.studio (ver imágenes).
- **Clip de video** del fundador editado con Higgsfield, haciendo algo performativo
  con tech, con un mensaje tipo "the future of video creation" → referencia a Oniric.
- **Footer**: "From the center of the world for the whole of it" — su imagen se está
  trabajando en otra sesión.
- **Links tipo MSCHF**: links crudos, azules, estilo HTML por defecto (al menos en el footer).
- **Tipografía de la mochila de Teenage Engineering** para algunos elementos.

## Referencias
| Referencia | Veredicto | Qué tomar |
|---|---|---|
| MSCHF (mschf.com) | ✅ buena | Productos como drops, irreverencia, links crudos del footer |
| Teenage Engineering (teenage.engineering) | ✅ encantó | Producto como objeto; tipografía de la mochila |
| Rauno Freiberg (rauno.me) | ✅ inspiración | Micro-interacciones con gusto |
| Locomotive (locomotive.ca) | ✅ encantó | Tono del manifiesto: las herramientas son solo expresión, lo que importa es la gente |
| basement.studio | ✅ | Toggle human/machine y modo terminal naranja |
| Nothing (nothing.tech) | 🟡 gusta | Demasiado formal para el objetivo |
| Active Theory (activetheory.net) | 🟡 gusta | Se siente sobresaturado |
| Poolsuite (poolsuite.net) | 🟡 cool | Su locura es demasiado del pasado |
| Liquid Death | ❌ no | — |
| Collins | ❌ no | — |

Imágenes en [`references/`](references/):
- `mschf-footer-links.png` — links del footer de MSCHF
- `teenage-engineering-bag-font.png` — tipografía de la mochila TE
- `basement-human-machine-toggle.png` — toggle HUMAN / MACHINE
- `basement-machine-mode-terminal.png` — vista MACHINE en terminal naranja

## Componentes guardados
Están en [`component-prompts/`](component-prompts/):
- `works-wheel` — índice de portafolio en rueda (referencias en `works-wheel-ref/`)
- `halftone-wordmark-footer` — footer con wordmark en puntos halftone
- `glass-ai-button` — botón de IA de vidrio con orbe (Three.js)
- `meng-to-sketchbook-landing-page` — sketchbook para contar nuestra historia
