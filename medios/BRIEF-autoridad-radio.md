# Brief de layout — `/nosotros` § Autoridad (Imagen Radio 2018)

**Estado:** los tres archivos ya están en `public/assets/video/` y `npm run medios` los da en verde.
Este brief es para la **Iteración 2**: cómo se arma la sección.

---

## El layout aprobado

```
NOSOTROS · § Autoridad                       fondo: .bg-dark

IMAGEN RADIO · ENERO 2018                    ← kicker

┌──────────┐    2018                         ← Stat.astro
│          │    hablando de IA en radio nacional
│  video   │
│ vertical │    ─────────────────────────────
│          │
│  ▸ 0:11  │    «Nosotros lo que estamos haciendo
└──────────┘     es diseñar una plataforma que
                 introduzca inteligencia artificial,
                 lenguaje natural y análisis de datos.»

                 ─────────────────────────────

                 «Creemos en el rediseño de la dinámica
                  en la que la gente puede hacer proyectos.»

                 Jorge Sierra · Imagen Radio · enero 2018

                 Nota original en rmx.com.mx →
```

En móvil: video arriba, citas abajo. Una sola columna.

---

## Los archivos

| Archivo | Qué es |
|---|---|
| `public/assets/video/nosotros-radio-2018.mp4` | 1080×1816 · **10.8 s** · 464 KB · H.264, `+faststart`, `yuv420p` |
| `public/assets/video/nosotros-radio-2018.jpg` | Póster — el frame que ya muestra titular, firma y fecha |
| `public/assets/video/nosotros-radio-2018.es.vtt` | Subtítulos del corte, 4 líneas |

---

## Specs que no se negocian

1. **Ancho de display: 360–420 px, tope 440.** La fuente es de 1080 px de ancho; a 420 CSS va a ~2.6× de densidad y se ve nítida. Arriba de 440 empieza a verse suave y barata. **Este número es el que hace que parezca decisión y no limitación.**
2. **`aspect-ratio: 1080 / 1816`** declarado en CSS, para que no haya salto de layout mientras carga el póster.
3. **Ratio nativo, sin recortar.** Cropear el vertical a horizontal destruye la captura.
4. **`controls preload="none" poster`** — nunca autoplay: tiene voz.
5. **`<track kind="captions" srclang="es" label="Español" default>`** apuntando al `.es.vtt`.
6. **Marco de navegador**, el mismo de `Captura.astro` con `marco="navegador"`. Es literalmente la grabación de una página web: darle chrome es honesto y se ve deliberado.
7. **Fondo `.bg-dark`.** El video trae header azul marino y cuerpo blanco; sobre oscuro y en marco redondeado lee como documento de archivo. Sobre blanco lee como screenshot suelto.
8. **El año con `--ilhas-fs-stat`** vía `Stat.astro` — el token de métricas grandes que sigue sin usarse en ninguna parte del sitio.

---

## Textos

**Kicker:** `IMAGEN RADIO · ENERO 2018`

**Stat:** dato `2018` · contexto `hablando de IA en radio nacional`

**Cita 1** — *sí es audible en el clip:*
> «Nosotros lo que estamos haciendo es diseñar una plataforma que introduzca inteligencia artificial, lenguaje natural y análisis de datos.»

**Cita 2** — *de la misma entrevista, pero **no** está en este corte de 10.8 s:*
> «Creemos en el rediseño de la dinámica en la que la gente puede hacer proyectos.»

**Atribución:** `Jorge Sierra · Imagen Radio · enero de 2018`

**Enlace:** `https://www.rmx.com.mx/entrevistas/buscas-un-asistente-virtual-conoce-coophi`
Texto: `Nota original en rmx.com.mx →` · con `rel="noopener noreferrer"` (`docs/06-stack-y-seguridad.md`).
Usa **https**: el sitio redirige solo y la CSP trae `upgrade-insecure-requests`.

> ⚠️ **Decisión pendiente sobre la cita 2.** No se escucha en el clip publicado. Un visitante que le dé play y no la oiga puede dudar. Dos salidas limpias: (a) atribuirla explícitamente a la entrevista completa —*"en la misma entrevista, minuto 1:45"*— apoyándose en el enlace, o (b) que Jorge extienda el corte con el tramo **1:44–1:50** del reproductor de la nota, que ya está dentro de lo que grabó. La opción (b) es ~6 segundos más de video y deja las dos citas audibles.

---

## Por qué esta sección importa

`/metodo` §07 se titula **"No son prompts. Es reingeniería del trabajo."**
La cita 2 dice, en enero de 2018 y en radio nacional, **"creemos en el rediseño de la dinámica"**.

Es el mismo argumento, ocho años antes. Esa es la razón de existir de todo el bloque, y es lo que mata la objeción más cara que enfrenta Ilhas hoy: *"llegaste con la ola de la IA"*. Si el diseño tiene que sacrificar algo, que no sea la relación entre el año y la cita.

---

# Addendum · 24 ago 2026 — la sección de Autoridad ya tiene tres piezas

La sección dejó de ser solo el bloque de radio. Ahora hay tres activos, y **los tres cuentan la misma historia**.

| Ranura | Qué es | Peso |
|---|---|---|
| `nosotros-radio-2018` | Entrevista en Imagen Radio / RMX, enero 2018 | 464 KB · 10.8 s |
| `nosotros-conferencia` | Foto de Talent Land, **sala llena** | 431 KB · 2400 px |
| `nosotros-conferencia-clip` | Jorge en el escenario de Talent Land | 3.0 MB · 20.8 s |

## El hilo que las une: Coophi

Los dos videos son de **la misma empresa**, con años de diferencia:

- **Radio, enero 2018** — la nota se titula *"¿Buscas un asistente virtual?, conoce a 'Coophi'"*.
- **Conferencia, Talent Land** — en cámara dice: *"Yo soy Jorge Sierra, CEO y cofundador de Coophi… una plataforma con inteligencia artificial que ayuda a las pequeñas empresas a planear y administrar sus recursos y proyectos como las grandes."*

Eso **no es un detalle de archivo, es el argumento**: en 2018 no opinaba sobre IA — tenía una empresa de IA, la presentaba en radio nacional y la defendía en un escenario grande. La sección tiene que dejar leer eso sin explicarlo.

**Sugerencia de estructura** (el copy lo ajusta Jorge):

1. Kicker + el `2018` grande (`Stat.astro`) — ya especificado arriba.
2. El bloque de radio con sus dos citas — ya especificado arriba.
3. Debajo, la conferencia: la **foto de sala llena a ancho completo** y, encima o al lado, el clip de 20 s.

La foto de sala llena es la que prueba escala; el clip es el que prueba que hablaba. **No inviertas el orden de peso**: la foto es más grande que el clip.

## Assets extra disponibles

- `src/assets/media/fotos/nosotros-conferencia-detalle.jpg` (464 KB) — el escenario de Talent Land con la pantalla legible: **"¿Quién sea puede crear inteligencia artificial?"**. Hoy **no tiene ranura**. Si se quiere publicar, hay que agregarla al manifiesto. La frase de la pantalla también funciona como **texto** en la sección, que es más legible y accesible que dentro de la foto.

## Atribuciones ya escritas en `src/data/medios.ts`

- `soluciones-testimonio-oncologia` → Irlanda Morgan · Directora de operaciones · Morgan Central de Especialidad. **Verificar «Centro» vs «Central»**.
- `soluciones-testimonio-despiece` → Jesús Flores · Gerente de Operaciones · Extrusión de Aleaciones. **Verificar si «Extrusión de Aleaciones» es la empresa o el área.**
