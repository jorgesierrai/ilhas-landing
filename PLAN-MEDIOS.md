# Plan de medios — ilhas.ai

**Fecha:** 22 ago 2026
**Decisiones que lo enmarcan** (tomadas por Jorge, 22 ago):
1. **Marca primero, autor visible.** Ilhas es el sujeto; Jorge aparece como el autor del método, con su prueba.
2. **Sigue siendo un sitio de cinco páginas.** No hay `/portafolio` ni `/autoridad`. Todo se acomoda dentro de `/`, `/metodo`, `/finanzas`, `/soluciones`, `/nosotros`.
3. **Video propio, sin pagarle a nadie.** Ver Parte 3 — la respuesta es más simple de lo que parece.

Este documento no toca el copy. Define **qué activo va en qué bloque, en qué formato y por qué**.

---

## La idea que ordena todo

Tienes nueve tipos de material y la tentación natural es repartirlos como decoración: "aquí falta una imagen, pongo una". Eso es lo que hace que un sitio se vea *lleno pero vacío*.

**El principio:** un activo entra al sitio si y solo si **mata una objeción nombrable**. Si no puedes decir en voz alta qué duda específica resuelve, no entra — por bonito que se vea.

Y hay una jerarquía. No toda la prueba pesa igual:

| Nivel | Tipo de prueba | Qué material tuyo es | Por qué pesa |
|---|---|---|---|
| **1** | **Trabajo en bruto** — el sistema corriendo | Código de agentes, configs de Claude, flujos, herramientas | Es lo más difícil de fingir. Nadie que venda humo tiene esto |
| **2** | **Reconocimiento de terceros** | Radio Imagen 2018, conferencias de IA | No lo dices tú, lo dice alguien más |
| **3** | **Track record** | Portafolio de plataformas, capturas de producto | Prueba que ya lo hiciste, no que lo sabes |
| **4** | **Voz del cliente** | Los 2 testimonios (cotizador oncología, agentes de despiece) | Prueba que le funcionó a alguien que no eres tú |
| **5** | **Contexto de mercado** | Lo que el mercado le pide a Data Scientists / PM / Diseñadores | Crea urgencia sin que tú tengas que empujar |
| **6** | **Historia** | El video podcast, el video de edificación papá-hijo | Da razón de existir. No convence solo, pero pega lo demás |

**El activo más subvalorado que tienes es la entrevista de radio de 2018.** Nadie más en tu categoría puede probar que hablaba de IA en radio nacional **ocho años antes** de que se pusiera de moda. Eso mata de un golpe la objeción más cara que enfrentas hoy —*"llegaste con la ola"*— y hoy no está en ninguna parte del sitio. Ese clip vale más que cualquier sección de diseño.

**El segundo más subvalorado:** las capturas de tus configuraciones de agentes. Tu audiencia (`docs/04-voz-del-cliente.md`: llegan con el detector de humo encendido) no puede evaluar si tu método es bueno leyendo un párrafo. Pero **sí puede reconocer trabajo real cuando lo ve**. Una captura anotada de un flujo de agentes hace en 2 segundos lo que tres párrafos no logran.

---

# PARTE 1 · Mapa: cada activo, su lugar y su objeción

| # | Lo que tienes | Objeción que mata | Página · Sección | Formato |
|---|---|---|---|---|
| **A** | Videos y capturas de agentes trabajando solos, configs de carpetas de Claude, flujos, herramientas | *"Esto es teoría"* · *"Es puro prompt copiado"* | `/metodo` §07 "No son prompts" · `/soluciones` hero · `/` hero | Loops mudos 8-15 s + capturas anotadas |
| **B** | Capturas de las plataformas que has hecho | *"¿Y tú qué has construido?"* | `/soluciones` §Casos · `/` §Linaje | Capturas en marco de UI |
| **C** | Lo que el mercado le pide hoy a Data Scientists, PM, Diseñadores | *"¿De verdad lo necesito?"* · *"¿No es moda?"* | `/` §02 "El hueco" · `/finanzas` §¿Es para ti? | Capturas reales + dato |
| **D** | Fotos y videos dando conferencias de IA | *"¿Quién eres tú para enseñar?"* | `/nosotros` §Autoridad | 1 foto grande + clip 45-60 s |
| **E** | **Entrevista en Radio Imagen, 2018, sobre IA** | *"Llegaste con la ola"* ← **la más cara** | `/nosotros` §Autoridad · banda del home | Clip 45-60 s + sello "2018" |
| **F** | Puedes crear cualquier ícono | *(no mata objeciones — es sistema visual)* | `/` §Los 5 pasos · `/finanzas` §8 capacidades | SVG, monocromo, 24-32 px |
| **G** | Video de tu historia, tipo podcast (guión ya grabado) | *"¿Por qué padre e hijo?"* · *"¿Por qué finanzas?"* | `/nosotros` §La historia | 3 clips de 60-90 s, no el video entero |
| **H** | Portafolio completo de productos | *"¿Tienes track record real?"* | `/soluciones` §Casos (ampliada) · `/nosotros` | Rejilla de capturas |
| **I** | **2 testimonios reales**: cotizador en empresa de oncología · agentes de despiece, optimización y cotización | *"¿Le funcionó a alguien más?"* | `/soluciones` §Testimonios **(bloque nuevo)** | Video 60-90 s o texto atribuido |
| **J** | VSL, podcasts del papá, video de edificación papá-hijo | *"¿Los dos de verdad trabajan juntos?"* | `/finanzas` §Quién lo enseña — **con una excepción, ver abajo** | Clip 60-90 s |

### ⚠️ El VSL **no** va en el sitio

Regla 1 de `CLAUDE.md` y de `docs/01-arquitectura.md`: *"El sitio nunca explica el webinar ni el programa."* Un VSL **es** la explicación del webinar. Si lo pones en `/finanzas`, tienes la misma oferta contada en dos lugares que se van a desincronizar en tres semanas, y le quitas al webinar su razón de existir.

**El VSL vive en `eventos.ilhas.ai`.** De los activos del bloque J, al sitio solo entra:
- el **video de edificación papá-hijo** (es identidad, no oferta), y
- **un clip del podcast del papá** que hable de criterio financiero, nunca del programa.

Misma lógica para el bloque G: del podcast de tu historia entran **clips**, no el episodio.

---

# PARTE 2 · Página por página: dónde va cada cosa

## `/` — Home
*Su trabajo: que quien cae de un reel entienda Ilhas en 8 segundos y entre a su carril.*

| Sección | Qué tiene hoy | Qué media entra | Por qué |
|---|---|---|---|
| §01 Hero | Ícono 3D flotante que **se oculta en móvil** | **Loop mudo (A):** un agente corriendo — terminal + dashboard actualizándose. Con `poster` para que no haya salto | Desde redes el primer scroll es 100% texto hoy. El loop dice "esto es real" antes de que lean una palabra |
| **§ nueva · Banda de autoridad** | — | Tira delgada: `Radio Imagen · 2018` · `Conferencias de IA` · `6 productos financieros construidos` | **Va justo debajo del hero.** Es la traducción de "apenas estamos empezando a ofrecer Ilhas" a "pero no apenas empezamos". 80 px de alto, no una sección |
| §02 "El hueco" | **Solo un H2, sin cuerpo** — la sección más débil del sitio | **Las capturas del mercado laboral (C):** 3 tarjetas con lo que hoy piden para operar empresas de miles de millones | Convierte el bloque más vacío en el más concreto, y el 95% deja de ser una estadística suelta: se vuelve *"mira lo que están pidiendo"* |
| §03 Los 5 pasos | Bolitas de 28 px, lee como índice | **Un ícono por paso (F)** — monocromo, mismo peso visual | Es lo que los convierte de lista a método |
| §04 Bifurcación | Dos tarjetas | **Nada.** | Es un momento de decisión, no de prueba. Media aquí distrae del clic |
| §05 Linaje | 6 tarjetas de texto (hoy invisibles) | **Captura de producto por tarjeta (B)** | Seis nombres no prueban nada. Seis pantallas sí |
| §06 Cierre | H2 + botón | **Nada.** | |

## `/metodo` — La página madre
*Hoy: 10 secciones, casi todas kicker + H2 + un párrafo. Es un ensayo maquetado.*

| Sección | Qué media entra | Por qué |
|---|---|---|
| §01 Hero | Nada, o `full-timeline.png` (**ya está en el repo y nunca se usó**) | Es la página del pensamiento; el texto es el protagonista |
| §04 La tabla I·L·H·A·S | **Una captura por paso**, revelada al pasar el cursor o en acordeón | La tabla es el mejor bloque de la página y hoy es texto plano |
| §05 "Hilar: el paso joya" | **Clip de 60-90 s tuyo explicándolo** (sale del podcast G, o lo grabas a propósito) | Es el punto de mayor densidad conceptual de todo el sitio. Merece cara y voz |
| §07 "No son prompts. Es reingeniería" | **Aquí va lo más fuerte que tienes (A):** 4 capturas anotadas — la estructura de carpetas de Claude, un flujo de agentes, una herramienta corriendo, el resultado | La afirmación literal de la sección es *"esto no son prompts"*. Las capturas son la única forma de probarlo. **Si solo haces un bloque de esta lista, haz este** |
| §08 "Sales con tu propio equipo de agentes" | **Loop mudo (A):** varios agentes ejecutando en paralelo | La frase es abstracta hasta que se ve |
| §09 "El barco y las islas" | Nada. Momento de marca | |

## `/soluciones` — El carril que paga
*Hoy es la página más corta del sitio (2,116 px) y la que más peso tiene que cargar.*

| Sección | Qué media entra | Por qué |
|---|---|---|
| §01 Hero | **Loop de producto (A)** + el botón que hoy no existe | Es la página que califica consultoría y no tiene ni CTA ni prueba |
| §03 Casos | **Captura real por caso (B/H)** en marco de UI | Convierte una lista de nombres en un portafolio. **Regla: la captura del producto es tuya; el logo del cliente no.** Sin permiso escrito, no va el logo — pero la pantalla sí |
| **§ nueva · Testimonios (I)** | Los **dos casos reales**: el cotizador en la empresa de oncología y los agentes de despiece / optimización / cotización | `docs/05-assets.md` tenía este bloque bloqueado por falta de material. **Ya no lo está.** Actualiza ese doc |
| §04 CTA diagnóstico | Nada | |

> **Sobre los dos testimonios.** Son los activos más caros que tienes en este carril y también los más delicados: son clientes con nombre. Si tienes permiso, van con nombre, rol y empresa. Si solo tienes permiso parcial, van con rol y sector (*"Director de operaciones, empresa de manufactura"*). **Lo que nunca va es un testimonio sin atribución** — regla 5 de `CLAUDE.md`, y este público lo huele.

## `/finanzas` — Mandar al webinar, un solo botón

| Sección | Qué media entra | Por qué |
|---|---|---|
| §01 Hero | **Loop de análisis financiero con IA corriendo.** **NO el VSL** | El VSL es del otro lado de la costura |
| §02 Las 8 capacidades | **Un ícono por chip (F)** + loop en 2 o 3 de ellas | Ocho tarjetas de texto gris no le dicen nada a nadie |
| §03 "Es para ti si / No es para ti" | **Las capturas del mercado (C)** como respaldo del "es para ti" | Es tu mejor bloque de calificación y el peor presentado |
| §04 "Quién lo enseña" | **El video de edificación papá-hijo (J)** + las fotos reales (que ya están en el repo y hoy solo se usan en `/nosotros`) | Es la página donde la autoridad importa más y **hoy no hay ni una cara** |
| §05 CTA webinar | Solo el botón | |
| §06 FAQ | Nada | |

## `/nosotros` — Poner cara y trayectoria
*Hoy: dos secciones y se acaba. Es la página que más crece con este material.*

| Sección | Qué media entra |
|---|---|
| §01 Hero | Las dos fotos, arregladas (ver `AUDITORIA-VISUAL.md` R8) |
| §02 Las dos tarjetas | Igual, con el recorte corregido |
| **§ nueva · La historia (G)** | **3 clips de 60-90 s** del podcast, no el episodio. Sugerencia de corte, según el guión que grabaste: (1) *"Yo tomé otro camino: 12 años construyendo tecnología y productos"* → quién eres; (2) *"En 2016 arranqué una empresa de inteligencia artificial"* → **el ancla de años**; (3) *"Los cursos de mi papá siempre estaban a reventar. Le propuse automatizar su conocimiento con IA"* → **el origen de Ilhas**. Ese tercero es la razón de existir de todo el negocio y hoy no está escrita en ninguna página |
| **§ nueva · Autoridad (D + E)** | **La radio de 2018 con el año en grande**, más una foto de conferencia a ancho completo. Titular sugerido para que tú lo ajustes: *hablando de IA en radio nacional desde 2018* |

---

# PARTE 3 · La respuesta a "propio pero que no cobren"

## El problema hoy

Tu CSP (`public/_headers`) es `default-src 'self'` y **no declara `media-src` ni `frame-src`**. Consecuencias exactas:

- ✅ Un `<video>` servido **desde tu propio dominio** funciona hoy mismo, sin tocar nada.
- ❌ Un iframe de **YouTube o Vimeo está bloqueado por completo**. No es que se vea mal: no carga.
- ❌ Un `<video>` apuntando a **cualquier dominio externo** también está bloqueado.

O sea: el sitio ya está configurado para servir tu propio video y para rechazar el de todos los demás. Eso juega a tu favor.

## La respuesta: **córtalo corto y sírvelo tú**

**Nadie ve un podcast de 20 minutos en tu landing.** Ese no es un problema de hosting, es un problema de formato. La solución técnica y la de marketing son la misma:

> **Ningún video de la página pasa de 90 segundos.** Los completos viven en YouTube como canal —para SEO y descubrimiento— y desde el sitio se **enlazan**, no se incrustan.

Con esa regla, el hosting deja de ser un problema:

| Tipo | Duración | Peso objetivo | Dónde vive | Costo |
|---|---|---|---|---|
| **Loop mudo** (los "GIFs") | 8-15 s | **≤ 1.5 MB** | `public/assets/video/` en el repo | $0 |
| **Clip con audio** | 60-90 s | **≤ 12 MB** | `public/assets/video/` en el repo | $0 |
| **Video completo** | 5-40 min | — | YouTube, **enlazado** | $0 |

Una biblioteca realista —10 loops + 8 clips— pesa **~110 MB**. Tu `.git` hoy pesa 14 MB. GitHub bloquea archivos de más de 100 MB y avisa a partir de 50; ningún archivo tuyo se acerca. **Cero cuentas nuevas, cero facturas, cero cambios de CSP, cero dependencias de terceros, y el video se ve sin la interfaz de nadie más.**

## Cuando esto se quede corto

El día que la biblioteca pase de ~250 MB, sácala del repo a **Cloudflare R2** con un subdominio propio (`media.ilhas.ai`). Es la opción correcta porque **el egress de R2 siempre cuesta $0** —que es justo lo que normalmente te cobran con video— y el free tier cubre 10 GB de almacenamiento al mes. Arriba de eso son centavos por GB. Verifica el número vigente antes de decidir en la [página de precios de R2](https://developers.cloudflare.com/r2/pricing/).

Cambio de CSP el día que pase:

```
media-src 'self' https://media.ilhas.ai;
img-src 'self' data: https://media.ilhas.ai;
```

Sigue sin haber player de terceros: es tu `<video>` nativo apuntando a tu subdominio.

**Lo que NO recomiendo:** YouTube o Vimeo incrustados. Te obligan a abrir `frame-src`, meten su interfaz y sus recomendados dentro de tu página, y tiran el Lighthouse que `docs/06-stack-y-seguridad.md` pone como requisito (>95 en performance).

## Regla de oro del formato: **nada de `.gif`**

Un GIF de 10 s a 720p pesa **8-15 MB**. El mismo clip en WebM/AV1 pesa **300-800 KB**. Es **20 veces menos** por el mismo resultado visual, con mejor color y sin el borde sucio del GIF. Cuando digas "GIF", produce `<video autoplay muted loop playsinline>`.

## Recetas de exportación

```bash
# LOOP MUDO — 12 s, 1280 px de ancho. WebM/AV1 (~600 KB) + MP4 de respaldo (~1.2 MB)
ffmpeg -i entrada.mov -an -vf "scale=1280:-2,fps=24" \
  -c:v libsvtav1 -crf 40 -preset 6 loop.webm

ffmpeg -i entrada.mov -an -vf "scale=1280:-2,fps=24" \
  -c:v libx264 -crf 26 -preset slow -movflags +faststart -pix_fmt yuv420p loop.mp4

# CLIP CON AUDIO — 90 s, 1280 px (~10 MB)
ffmpeg -i entrada.mov -vf "scale=1280:-2" \
  -c:v libx264 -crf 24 -preset slow -movflags +faststart -pix_fmt yuv420p \
  -c:a aac -b:a 96k clip.mp4

# POSTER — el primer fotograma legible, para que no haya salto de layout
ffmpeg -ss 00:00:01 -i entrada.mov -vf "scale=1280:-2" -vframes 1 -q:v 4 poster.jpg
```

- `-movflags +faststart` es obligatorio: sin eso el video no empieza hasta descargarse completo.
- `-pix_fmt yuv420p` es obligatorio para que reproduzca en Safari/iOS.
- Toda la biblioteca a **1280 px de ancho**. Más resolución no se nota en un bloque de 600 px y sí se nota en el peso.

## Capturas de pantalla

- Van en **`src/assets/`**, nunca en `public/` — así `astro:assets` genera AVIF/WebP en el build (`docs/05-assets.md`).
- **Captura a 2× de DPI y recorta a la parte que importa.** Una ventana completa de VS Code escalada a 600 px de ancho es ilegible; el bloque de 20 líneas que importa, no.
- Anota sobre la captura con **HTML y CSS**, no quemando texto en el PNG: se puede leer con lector de pantalla, se traduce y se puede corregir sin reexportar.
- Las capturas de terminal y de código son las que más se degradan al escalar. Súbeles el tamaño de fuente **antes** de capturar.
- **Antes de publicar cualquier captura, revisa que no traiga:** rutas con tu usuario, nombres de clientes, API keys, correos, cifras de un cliente identificable. Es la misma disciplina de `docs/06-stack-y-seguridad.md` aplicada a los píxeles.

---

# PARTE 4 · Componentes nuevos que hay que construir

Siete componentes cubren todo lo de arriba. Con esto no vuelves a maquetar media a mano.

| Componente | Props | Regla |
|---|---|---|
| `Loop.astro` | `src`, `poster`, `alt`, `ratio` | `autoplay muted loop playsinline preload="metadata"`. **Obligatorio:** pausar bajo `prefers-reduced-motion` (el media query ya existe en `base.css`). Nunca lleva controles |
| `VideoClip.astro` | `src`, `poster`, `titulo`, `duracion` | `controls preload="none"` + poster. **Nunca autoplay con audio.** Máximo 90 s |
| `Captura.astro` | `src`, `alt`, `caption`, `marco` ("navegador" \| "terminal" \| "ninguno") | El marco es CSS, no parte del PNG. `caption` obligatorio: una captura sin pie no explica nada |
| `TarjetaCaso.astro` | `producto`, `resolvio`, `captura`, `sector` | Reemplaza `.casos li` y `.linaje li`. Fondo blanco sobre sección clara (ver `AUDITORIA-VISUAL.md` R6) |
| `Testimonio.astro` | `nombre`, `rol`, `empresa`, `texto`, `video?`, `foto?` | **Falla el build si falta la atribución.** Es la manera de hacer imposible el error del `index.html` viejo |
| `BandaAutoridad.astro` | `items[]` (`{ etiqueta, año?, href? }`) | Tira delgada, ≤ 80 px, sin fondo propio. No es una sección |
| `Stat.astro` | `dato`, `contexto` | Usa `--ilhas-fs-stat`, el token de métricas grandes que **hoy no se usa en ninguna parte** |

---

# PARTE 5 · Las seis reglas de curaduría

Esto es el "cómo ponemos qué". Cuando dudes, aplica en orden:

1. **Un activo por bloque.** Si dos compiten por el mismo lugar, gana el que mata la objeción más cara.
2. **Cada activo responde una objeción que puedas nombrar en voz alta.** Si no puedes, es decoración y no entra.
3. **La prueba va después de la afirmación, nunca antes.** Primero la frase, luego el video que la sostiene. Al revés, el visitante no sabe qué está viendo.
4. **Nada sin atribución.** Captura de plataforma → di cuál. Testimonio → nombre y rol, o no va. Conferencia → dónde y cuándo. La fecha es parte de la prueba: *"Radio Imagen"* vale la mitad de *"Radio Imagen, 2018"*.
5. **Ningún video de más de 90 segundos en la página.**
6. **El loop nunca le gana al titular.** Si tu ojo se va al video antes que al texto, el video está mal puesto: bájale el tamaño, quítale movimiento o muévelo abajo.

---

# PARTE 6 · Orden de producción

Ordenado por **prueba entregada ÷ esfuerzo**, no por página.

### Tanda 1 — Esta semana (lo que más autoridad da por lo que menos cuesta)
1. **Cortar el clip de Radio Imagen 2018** a 45-60 s. Es un archivo que ya existe y es tu activo más fuerte. → banda del home + `/nosotros`
2. **4 capturas anotadas del sistema de agentes** (estructura de carpetas de Claude, un flujo, una herramienta corriendo, el resultado). → `/metodo` §07
3. **6 capturas de producto** para el linaje del home y los casos de `/soluciones`. Ya las tienes.
4. **Los 2 testimonios**, con permiso de atribución por escrito. → `/soluciones` §nueva

### Tanda 2 — Siguientes dos semanas
5. Construir los 7 componentes de la Parte 4.
6. **3 clips del podcast** de tu historia (60-90 s cada uno). → `/nosotros`
7. **3 loops mudos**: agente corriendo, agentes en paralelo, análisis financiero. → heroes de `/`, `/soluciones`, `/finanzas`
8. **Foto de conferencia** a ancho completo + clip de 45 s. → `/nosotros` §Autoridad

### Tanda 3 — Cuando el resto esté arriba
9. **Íconos de los 5 pasos** y de las 8 capacidades de `/finanzas` (F).
10. **Clip de edificación papá-hijo**. → `/finanzas` §Quién lo enseña
11. **Capturas del mercado laboral** (C) curadas y anotadas. → `/` §02 y `/finanzas` §03
12. Abrir el canal de YouTube con los videos completos y enlazarlos.

---

# PARTE 7 · Lo que hay que actualizar en los docs

Este material cambia tres cosas que hoy están escritas como restricción:

| Doc | Qué dice hoy | Qué hay que cambiar |
|---|---|---|
| `docs/05-assets.md` §"Lo que hace falta" | *"Testimoniales en video → hasta que existan, no hay bloque de testimoniales"* | **Ya existen dos.** Desbloquear el bloque, con la regla de atribución |
| `docs/05-assets.md` §"Regla general" | *"Las imágenes viven en este repositorio… sin CDN externo"* | Extender la regla al video: mismos criterios, con los pesos objetivo de la Parte 3 |
| `docs/06-stack-y-seguridad.md` §CSP | No contempla `media-src` | Documentar que hoy el video propio funciona por herencia de `default-src`, y dejar escrito el diff de CSP del día que entre `media.ilhas.ai` |

---

## Una advertencia, porque va a pasar

Tienes mucho más material del que caben en cinco páginas, y el material es bueno. La tentación va a ser meterlo todo *"porque ya lo tengo"*.

El sitio no mejora por tener más pruebas. Mejora por tener **la prueba correcta en el momento en que aparece la duda**. Cuatro capturas bien puestas en `/metodo` §07 hacen más que cuarenta repartidas por todo el sitio — y cuarenta convierten un sitio de autoridad en un álbum de fotos.

Lo que sobre, guárdalo: es el contenido de tus redes durante los próximos seis meses, que es de donde va a venir el tráfico que caiga en estas cinco páginas.

---

**Fuentes consultadas:** [precios de Cloudflare R2](https://developers.cloudflare.com/r2/pricing/) · [Cloudflare Developer Platform pricing](https://www.cloudflare.com/pricing/)
