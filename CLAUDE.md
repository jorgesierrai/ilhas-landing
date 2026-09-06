# ilhas.ai — instrucciones del repositorio

Este repositorio es el sitio de **Ilhas**. No es una landing page de un producto.

Antes de escribir una línea de código o de copy, lee **`docs/00-INDEX.md`**. Ahí está el orden de precedencia entre las fuentes, que se contradicen entre sí a propósito (son de épocas distintas del negocio). Si construyes sin leer eso, vas a mezclar tres versiones de Ilhas y ninguna va a ser la correcta.

---

## Qué es Ilhas (una frase)

Ilhas es un **método** —I·L·H·A·S— y hay dos maneras de recibirlo: **te lo enseñamos** (formación) o **te lo hacemos** (consultoría). El método es el barco; las áreas donde se apunta son las islas. Finanzas es la primera.

## Qué es este sitio

Un **hub de marca con cinco páginas**, no un scroll de ventas:

| Ruta | Su único trabajo |
|---|---|
| `/` | Que quien cae de un reel entienda Ilhas en 8 segundos y entre a su carril. Ramifica, no vende. |
| `/metodo` | Probar cómo pensamos. La página madre. No vende. |
| `/finanzas` | Mandar al webinar. Un solo botón. |
| `/soluciones` | Calificar para consultoría. Sin precio. |
| `/nosotros` | Poner cara y trayectoria. |

Aparte del hub viven `/terminos`, `/privacidad` y `/cookies`. **No cuentan como páginas del sitio**: no van en el menú, solo en la barra final del pie, y llevan `noindex`. Son documentos. Ver `docs/06-stack-y-seguridad.md` § "Las tres páginas legales" — incluida la advertencia de que **todavía no las revisa un abogado**.

## Las cinco reglas que no se rompen

1. **El sitio nunca explica el webinar ni el programa.** Manda a `eventos.ilhas.ai` (Go High Level) con un clic. Nada de temario, precio, bonos ni oferta en este repositorio. Dos explicaciones = dos verdades que se desincronizan.
2. **Nada de la oferta del webinar sale gratis.** El Radar de Oportunidades y su scoring (Tiempo × Dolor × Palanca) **no van en el sitio**. Se pueden nombrar; no se pueden enseñar.
3. **No se anuncian islas futuras.** Ilhas Operaciones / Customer Success / Soporte / Marketing **no aparecen**, ni como "próximamente". El método ya declara que es universal; el visitante extrapola solo.
4. **Los números se atribuyen, nunca se suman.** 40 años y +200 empresas son del papá. 12 años y +1B MXN/mes son de Jorge. El "40 + 12" junto solo se usa en `/finanzas`, que es donde los dos se juntan.
5. **Cero placeholders en producción.** Ningún testimonial inventado, ningún `[Nombre de…]`, ningún logo "Empresa 1". Si un dato no existe, el bloque no se publica.

## La regla de tono que manda sobre todas

**La carnita arriba.** Los clientes reales de Ilhas escribieron literalmente "vamos con la carnita, please", "¿a qué hora termina la introducción?" y "comenzamos la nueva era de vender humo". Llegan con prisa y con el detector de humo encendido. Cada página entrega sustancia en el primer scroll o no sirve. Ver `docs/04-voz-del-cliente.md`.

## Estado del repositorio

*Actualizado: 5 sep 2026 (las filas con piel de marca en `/jorgesierra`, v5).*

> **Este bloque se actualiza en cada iteración, no al final.** Es lo primero que
> lee una sesión nueva; si miente, la sesión construye sobre una foto vieja. Lo
> mismo aplica a `medios/ESTADO.md`. Ver el checklist de abajo.

> ### ⚠️ Las referencias de `medios/` NO son la fuente de los tokens
>
> Son páginas sueltas: traen su propio `:root` con nombres que **el sitio no
> tiene**. `medios/kinzal-referencia.html` define `--ilhas-gradient-d`, que no
> existe en `docs/marca/tokens.css`. Copiar su CSS tal cual dejó el nombre de
> Jorge y el resplandor de la figura pintados con un token vacío: **no falla el
> build, no falla ningún grep, simplemente no se ve nada**. Sólo salió en una
> captura.
>
> Al traer CSS de una referencia: pasa cada `var(--…)` contra la hoja compilada
> (`dist/_astro/*.css`) y **compara la captura contra la de la referencia**, no
> sólo las alturas. Las alturas cuadraban al píxel con el degradado roto.
>
> Lo mismo al revés: la referencia **no** trae `prefers-reduced-motion` ni la
> mitad `img` de `.enlace__icono svg, .enlace__icono img`, y la página sí las
> necesita. Reconstruir un `<style>` desde la referencia las borra en silencio.

- Rama de trabajo: **`kinzal-en-bio`**, que sale de `main`.
- **Dos PRs abiertos sin mergear.** Hasta que entren, `main` no tiene nada de las
  iteraciones 10 a 17:
  - **#17 · `cabeceras-vercel`** — las cabeceras de seguridad. **`public/_headers`
    nunca aplicó: es formato de Netlify y el sitio está en Vercel**, así que hoy
    producción corre sin CSP, sin `X-Frame-Options` y sin `Referrer-Policy`. Van
    en `vercel.json`. Es lo más urgente de la lista.
  - **#18 · `credenciales-hijo`** — iteraciones 10 a 16.
- **El sitio nuevo en Astro está completo**: las cinco rutas del hub más las tres
  legales, con la auditoría visual (`AUDITORIA-VISUAL.md`) ya aplicada.
- **Iteraciones cerradas:** 1 (ranuras) · 2 (activar material) · 3 (hero del home)
  · 4 (el hueco y el mapa I·L·H·A·S) · 5 (bifurcación y `MapaEmpresa`) · 6
  (`/metodo` §01–§04) · 7 (banda Ilhas→Hilas y §05–§09) · 8 (el visor de §07) · 9
  (cirugía de copy) · 10 (productos) · 11 (capas y el experimento como figura) ·
  12 (`/finanzas`) · 13 (redes) · 14 (distinción del papá) · 15 (credenciales del
  hijo) · 16 (el mapa lleno) · 17 (el pie y las legales) · 18 (el aire de
  arriba y la § En público) · 19 (el hero corriendo). Los briefs viven en
  `prompts/iteracion-*.md`.
- **Piezas nuevas que conviene conocer antes de tocar nada:**
  - `src/data/mapa.ts` + `src/components/MapaEmpresa.astro` — las trece áreas en
    tres capas, con **38 renglones de lo que se construye en cada una**. Un
    componente, tres variantes (`limpio` / `prueba` / `cimiento`) y una mini
    dentro de la bifurcación. **Las listas salen SOLO en la variante `prueba`**
    (`/soluciones`): si se cuelan a las otras, `/metodo` se vuelve inmanejable.
    Los 38 valen lo mismo — sin niveles y sin leyenda (Jorge, 30 ago 2026).
  - `src/components/Bifurcacion.astro` — prominente (home §04) y compacta
    (`/metodo` §10).
  - `src/data/productos.ts` — las seis tarjetas, **sin nombres de empresa**: solo
    el tipo o la descripción (Jorge, 28 ago 2026). Coophi es la excepción, es suya.
  - `src/data/personas.ts` — `ENLACES` (redes) y `DISTINCIONES` (la roseta del
    papá, el birrete del hijo). Fuente única para `/finanzas` §04 y `/nosotros` §01.
  - `src/components/BandaHilas.astro` — Ilhas→Hilas, ciclo de 15s, cero JS.
  - `src/layouts/Legal.astro` — capa delgada sobre `Base` para las tres legales:
    agrega el `noindex`, el titular con fecha y la maquetación de documento.
  - `src/components/Footer.astro` — reescrito en la 17: marca, dos columnas,
    logotipo de marca de agua y barra final con lo legal. **La regla de la lista
    va scopeada a `.pie__inner`, no a `.pie`** — con `.pie ul` los tres enlaces
    legales se apilan en columna en vez de ir en fila. Lleva **una sola red**,
    el Instagram de la marca (`REDES_ILHAS` en `personas.ts`, Jorge 30 ago 2026):
    no le inventes TikTok ni LinkedIn — un ícono que lleva a una cuenta que no
    existe es la misma promesa vacía que el boletín que este pie no tiene.
  - `/nosotros` § **En público** — tres momentos en orden cronológico (nov 2017
    escenario · ene 2018 Imagen Radio · abr 2018 Talent Land). **El orden ES el
    argumento: no lo reordenes.** El clip quedó fechado en **noviembre 2017, NO
    Talent Land** (Jorge, 28 ago 2026) — era la contradicción de los dos briefs
    del 24 ago. Talent Land son las dos fotos.
  - **El hero del home es un LOOP, no una foto** (31 ago 2026): `home-hero-loop`,
    video de **Kinzal** —empresa de Jorge— con el proceso entero: los planos
    cargando, la solicitud, el generador armando la cotización y el cierre en el
    bloque de ahorro. **Va SIN RECORTAR**: la caja lleva la relación de aspecto
    del video y `object-fit: contain`. Si le pones `cover` se pierden los planos,
    que es lo que Jorge pidió que se viera. **Un solo `<source>`, mp4** — con
    este contenido VP9 salía más grande y peor. **El velo se fue**: existía para
    que el texto se leyera encima de la foto y ahora no se tocan.
    `home-hero-conferencia` volvió a ser exclusiva de `/nosotros`.
  - **La barra de stats** del home (12× · 8× · 6-12%) va PEGADA al hero, sin
    `section-y`, ocupando el hueco que dejó la banda de autoridad. El copy es de
    Jorge y va literal: sin asteriscos, sin nota al pie y sin fuente.
  - **La banda de cifras** (+1,000 MDP · 6+ · 2016→) vive en
    `src/components/Cifras.astro` y su dato en `src/data/cifras.ts`. La pintan
    DOS secciones —home §05 y `/soluciones` §03— y siempre **arriba de las
    tarjetas**: son la causa, las tarjetas el efecto. Bajaron del hero el 31 ago
    2026. **No la confundas con la barra de stats**: aquélla dice qué hace el
    método y va en degradado; ésta dice quiénes son y va en blanco con reglas.
    Si les das el mismo tratamiento, las dos filas de números de la misma página
    compiten.
  - ⚠️ **`.hero__inner` es un GRID de dos columnas a partir de 900px**, y no por
    gusto: con el medio `absolute` la altura del hero la daba el `min-height` de
    la columna de texto, y al bajar las cifras el texto quedó más corto que el
    video — el cuadro se salía por abajo de la sección. En grid la fila mide lo
    que mida el más alto de los dos.
  - **La banda de autoridad salió del home.** El componente
    `BandaAutoridad.astro` SIGUE en el repo — solo se quitó su uso. Los tres
    hitos que resumía viven completos en `/nosotros` § En público desde la 18.
  - **`/jorgesierra` son SEIS FILAS, no tarjetas (v5, 5 sep 2026).** El array
    lleva `grupo: "redes" | "tec"` y hay **tres `<ul class="enlaces">`** —redes,
    tecnológica, tradicional— separados por los rótulos `.bio__sep`. **No se
    parte con `.slice(0,3)`**: el índice se rompe callado el día que alguien
    reordene un enlace.

    **Se probaron tarjetas con foto y video y NO se quedaron.** Kinzal llegó a
    ser una tarjeta de 227 px con la foto de IU Life, e Ilhas otra de 260 px con
    un video del agente trabajando. Daban jerarquía, pero la página pasaba de
    **1,069 a 1,428 px** en teléfono y dejaba de verse de un vistazo. La versión
    que quedó da la jerarquía por **superficie, no por tamaño**: `.enlace--ilhas`
    lleva un lavado del degradado de marca y `.enlace--kinzal` una piel de
    aluminio —cepillado diagonal, reflejo especular que barre al hover y el canto
    del gradiente del logo a la izquierda—, las dos con tres gradientes CSS, cero
    imágenes y cero JS. Las seis filas miden lo mismo: **58 px en escritorio**.
    El trabajo de las tarjetas vive en la rama **`respaldo-tarjetas`** por si
    alguna vez se quiere recuperar.

    ⚠️ **El reflejo del aluminio va en `.05` y no se sube.** A `.085` el fondo
    bajo el subtítulo se aclara y el lavanda `#C084FC` cae a 3.99:1 — reprueba AA
    para 13 px. Con `.05` mide **5.05:1** en reposo y **5.05:1** con el cursor
    encima (medido sobre el píxel más claro de la caja del texto, no sobre la
    fila: medir la fila entera muestrea la barra decorativa del canto y miente).

    ⚠️ **Todas las flechas van en ↗, incluida la de Ilhas, que apunta a `/`.**
    Rompe la convención del sitio —↗ = pestaña nueva, → = interno— y es decisión
    de Jorge por simetría con Kinzal. `fuera` sigue mandando en `target`/`rel`.

    ⚠️ **`kz-obra.webp` se borró** al quitar la tarjeta: un archivo en `public/`
    que nadie referencia se publica igual. **`kinzal-mark.svg` SÍ se sigue
    usando** — es el ícono de la fila de Kinzal.

    ⚠️ **El `<style>` de esta página es scopeado y NUNCA `is:global`** — la
    advertencia larga vive arriba del `<style>` en el archivo. Y el titular del
    home lo lee `src/pages/index.astro`, no esta página.

  - ⚠️ **`home-hero-loop.mp4` LLEVA LA MARCA DE KINZAL DENTRO, y no sólo el
    logotipo.** Si algún día se reutiliza fuera del hero, hay que recortarlo en
    el ENCODE (taparlo con `object-position` deja la marca dentro del archivo).
    Medido sobre el original de 1280×604: la barra `▣ KINZAL` en y≈15–35, el
    logo y el folio en y≈55–110, «Innovando en Aluminio» en y≈118, el **bloque
    de domicilio fiscal con `Tel: +52 33 1360 7178` y `Email: jorge@kinzal.ai`
    en y≈208–234**, y «Descargar brochure Kinzal» en y≈583–595. La banda limpia
    es **y=240…556**. El bloque de contacto es el que casi se cuela: es letra
    muy chica y **el OCR no la ve** — la comprobación buena es extraer los
    fotogramas a 4 fps y mirarlos. Y ojo: **el documento del video hace scroll**,
    así que revisar un solo fotograma no prueba nada.
  - **`/jorgesierra/ia-aplicada-masterclass` — la presentación de la masterclass.**
    Vive en `public/`, lleva `noindex`, no va al sitemap y **no se enlaza desde
    ninguna página**: se llega por la URL, que es la que Jorge proyecta. Comparte
    carpeta de salida con `/jorgesierra` (el link in bio) y conviven —verificado
    en cada build—: son `dist/jorgesierra/index.html` y
    `dist/jorgesierra/ia-aplicada-masterclass/index.html`.

    ⚠️ **Y ES LA PÁGINA MÁS FRÁGIL DEL SITIO ANTE UNA CSP.** Trae **494
    atributos `style="…"` en línea más un `<style>`** — así exporta Claude
    Design, y reescribirlos no es opción. **Medido sirviéndola con cada
    política:**

    | CSP | Violaciones |
    |---|---|
    | La de `cabeceras-vercel` tal cual, con `'unsafe-inline'` | **0** — corre entera |
    | `style-src 'self'` a secas | **495** — `style-src-attr` y `style-src-elem` |

    O sea: **hoy NO hace falta ninguna excepción.** La CSP del PR #17 ya trae
    `style-src 'self' 'unsafe-inline'` y eso la cubre. Lo que hay que cuidar es
    **el día que alguien le quite el `'unsafe-inline'`** para endurecerla: ese
    día la presentación se queda sin un solo estilo. Si pasa, la ruta necesita
    su propia regla en `vercel.json`:

    ```json
    { "source": "/jorgesierra/ia-aplicada-masterclass/(.*)",
      "headers": [{ "key": "Content-Security-Policy",
        "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none'" }] }
    ```

    ⚠️ **Sin verificar: en qué orden aplica Vercel dos `source` que coinciden.**
    No se puede comprobar hasta que las cabeceras estén desplegadas. El día que
    entren, la prueba es una línea —debe devolver la CSP con `'unsafe-inline'`,
    no la global:
    `curl -sI https://ilhas.ai/jorgesierra/ia-aplicada-masterclass/ | grep -i content-security`
    Si devolviera la global, la regla específica va **antes** que la de `/(.*)`.

    `script-src 'self'` no es problema: `deck.js` es del mismo dominio y no hay
    ni un `<script>` inline ni un `on*=`. Tampoco carga nada de CDN — cero
    `unpkg`, `googleapis` ni `gstatic`.
  - **El menú dice «Aprender», y abre un desplegable con «Ilhas Finanzas»
    dentro** (Jorge, 31 ago 2026). «Aprender» es el carril; el producto sigue
    llamándose Ilhas Finanzas en el `<h1>`, el `<title>`, el `og:title` y el
    copy — no hagas buscar-y-reemplazar. El desplegable va **sin JavaScript**,
    con `:hover` Y `:focus-within`. ⚠️ **No le pongas `visibility:hidden` ni
    `display:none` al panel cerrado**: los dos sacan al enlace del orden de
    tabulación, `:focus-within` no puede dispararse nunca y el submenú queda
    inalcanzable sin ratón. Va con `opacity` + `pointer-events`.
  - **El ritmo entre secciones es UNO SOLO en todo el sitio: 144 px a 1440**
    (88 en móvil). Sale de `--ilhas-section-y` en `tokens.css`, que bajó de
    `clamp(4rem, 9vw, 7.5rem)` a `clamp(2.75rem, 5.5vw, 4.5rem)` el 30 ago
    2026. Se probó primero solo en el home y Jorge lo pidió parejo en todas.
    Dos excepciones, las dos a propósito: **`.section-y-sm`** abre cada página
    interior y es asimétrica —40px arriba, el ritmo completo abajo—, porque
    arriba está el header sticky y ése es el aire que se ajustó en la
    iteración 18; y la **regla de colapso** de `base.css` deja 72 px cuando dos
    secciones seguidas comparten fondo, para no meter una banda vacía del
    mismo color. Si el ritmo vuelve a cambiar, se cambia en `tokens.css` y
    ninguna página necesita override.
  - `.bg-lavado` en `src/styles/base.css` — la tercera superficie clara.
- El `index.html` de la raíz es el sitio viejo (landing de bootcamp, sin rutas).
  **No lo borres**: Jorge lo conserva para revisar qué rescatar. Le queda un
  `[Nombre de tu papá]`, que ya no importa porque esa página no se publica.
- **Sistema de medios: montado, prioridad 1 completa.** El sitio declara **34
  ranuras** con nombre; dejas caer un archivo con el nombre exacto y aparece
  solo, sin tocar código. Una ranura vacía no pinta nada en producción. Hoy:
  **20 de 34 listas, 0 con problema**.
  - **Si vas a trabajar en medios, lee `medios/ESTADO.md` primero.**
  - `npm run medios` te dice qué falta, qué pesa de más y qué no tiene atribución.

### Lo que sigue abierto (no lo inventes: pregúntale a Jorge)

| Tema | Qué falta |
|---|---|
| **El punto huérfano del titular del home** | Desde que el titular es «…con agentes de IA.» (5 sep 2026), **a ≥1200 px el punto final cae solo en su propio renglón**. Medido: a 1440 el `<h1>` pasó de 4 a 5 renglones y el punto queda en `left=198`, al margen. A 390 y 768 se lee bien. Es la costura entre el `<span class="text-gradient">` —que es `inline-block` por el `background-clip:text`— y el punto que va fuera. **No se tocó: la decisión es de Jorge.** El arreglo es envolver span y punto en un `white-space:nowrap`, no cambiar el copy |
| **`<title>` y `og:title` dicen «con IA»** | `src/layouts/Base.astro:78` y `:92` siguen con «Ilhas — tu primer proceso corriendo con IA», mientras el `<h1>` ya dice «con agentes de IA». **No se tocó**: es copy de Jorge y son las dos cadenas que ve Google y ven las redes al compartir. Igual `medios/hero-b2-referencia.html:129`, que es otra referencia del hero |
| **`/finanzas` §07 · servicios del papá** | **Confirmado que va** (Jorge, 27 ago 2026). Faltan dos insumos suyos: el **copy de los servicios** y **a dónde apunta el botón de agenda** — hoy no hay ninguna URL de agenda en el repositorio, el único destino externo es `eventos.ilhas.ai` |
| **`/nosotros` § La historia** | Tres clips (`nosotros-historia-01/02/03`) sin material |
| **Párrafo de intro de la línea de tiempo** | Marcado como `TODO copy` en `src/pages/nosotros.astro`. Lo escribe Jorge |
| **Subtítulo del hero** | El de hoy —«Lo que hoy le toma horas a alguien de tu equipo…»— es una **propuesta mía, no copy aprobado**. El titular sí es de Jorge. Está puesto para que la página no quede coja; falta su visto bueno |
| **Revisión legal** | **Un abogado no ha visto `/terminos`, `/privacidad` ni `/cookies`.** Son borradores sólidos y honestos, escritos para México, pero sin revisar. Es un trámite de una sesión y hoy es un hueco abierto |
| **El domicilio fiscal** | Jorge lo pasó como *Zapopan* y el **C.P. 44690 es de Guadalajara**. Los documentos van con Guadalajara; **falta que lo confirme contra su constancia**, porque de ahí depende la cláusula de jurisdicción |
| **`sitemap.xml`** | Decidido que va, pero **hasta el final**: se genera cuando las rutas y el contenido estén cerrados, como archivo estático en `public/` (sin instalar la integración). **Las tres legales NO entran**: llevan `noindex` |
| **Hosting y DNS · plataforma del programa** | Ver `docs/00-INDEX.md` § "Lo que NO está resuelto" |

## Convenciones de código

- Stack: **Astro** con salida estática. Sin framework de UI, sin JS de cliente salvo donde sea imprescindible.
- Estilos: CSS propio con los tokens de `docs/marca/tokens.css`. Nada de inventar colores.
- Español de LATAM, trato de "tú". Acentos correctos, siempre.
- Imágenes: viven en el repositorio, en `public/assets/`. Se sirven optimizadas (`astro:assets`), en AVIF/WebP con fallback.
- Accesibilidad: contraste AA mínimo, foco visible, `alt` real en toda imagen con contenido.
- Sin dependencias que no sean necesarias. Cada `npm install` se justifica.

## Antes de dar por terminado cualquier cambio

- [ ] ¿Respeta las cinco reglas de arriba?
- [ ] ¿El copy usa el vocabulario de `docs/04-voz-del-cliente.md` y no invenciones?
- [ ] ¿Los colores y tipografías salen de `docs/marca/`?
- [ ] ¿Corre `npm run build` sin warnings?
- [ ] Si tocaste medios: ¿`npm run medios` sin ningún ⚠?
- [ ] ¿Pasa el checklist de seguridad de `docs/06-stack-y-seguridad.md`?
- [ ] ¿Se ve premium, claro y sin humo? ¿Podría vivir junto a Apple, Mindvalley o MasterClass?
- [ ] **¿Actualizaste el "Estado del repositorio" de arriba?** Rama, iteración cerrada, piezas nuevas y lo que quedó abierto. Si tocaste medios, también `medios/ESTADO.md`. **No es opcional y no se deja para el final**: es lo primero que lee la siguiente sesión, y un estado viejo hace que construya sobre una foto que ya no existe. Ya pasó: llegó a estar cuatro iteraciones atrasado.
- [ ] ¿Los `docs/` siguen describiendo el sitio que existe? Si moviste un bloque, `docs/02-paginas.md` cambia con él — y si un bloque que el doc promete **no** está construido, márcalo como hueco en vez de borrarlo.
