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

Aparte del hub vive también **`/temario`** (16 oct 2026): el temario completo de Ilhas Academy, para mandarlo por WhatsApp, Instagram y en el webinar. **No va en el menú** —como `/jorgesierra`—, sí va en el sitemap, y es **la única página que explica el programa** (regla 1). Se genera de `src/data/temario.md`; ver `docs/02-paginas.md` § `/temario`.

## Las cinco reglas que no se rompen

1. **El sitio no vende el programa.** Manda a `eventos.ilhas.ai` con un clic: precio, oferta y compra viven allá. **Única excepción: `/temario`** (Jorge, 16 oct 2026): el temario completo, generado de `src/data/temario.md`, que es copia del doc maestro de Jorge. Sin costos de nada (ni del programa ni de herramientas, planes o licencias) y sin condiciones de compra. Ninguna otra página repite el temario: si lo necesita, enlaza a `/temario`.
2. **Nada de la oferta del webinar sale gratis.** El Radar de Oportunidades y su scoring (Tiempo × Dolor × Palanca) **no van en el sitio**. Se pueden nombrar; no se pueden enseñar.
3. **No se anuncian islas futuras.** Ilhas Operaciones / Customer Success / Soporte / Marketing **no aparecen**, ni como "próximamente". El método ya declara que es universal; el visitante extrapola solo.
4. **Los números se atribuyen, nunca se suman.** 40 años y +200 empresas son del papá. 12 años y +1B MXN/mes son de Jorge. El "40 + 12" junto solo se usa en `/finanzas`, que es donde los dos se juntan.
5. **Cero placeholders en producción.** Ningún testimonial inventado, ningún `[Nombre de…]`, ningún logo "Empresa 1". Si un dato no existe, el bloque no se publica.

## La regla de tono que manda sobre todas

**La carnita arriba.** Los clientes reales de Ilhas escribieron literalmente "vamos con la carnita, please", "¿a qué hora termina la introducción?" y "comenzamos la nueva era de vender humo". Llegan con prisa y con el detector de humo encendido. Cada página entrega sustancia en el primer scroll o no sirve. Ver `docs/04-voz-del-cliente.md`.

## Estado del repositorio

*Actualizado: 16 oct 2026 (iteración 22: `/temario`, en la rama `temario`).*

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

- Rama de trabajo: **`temario`**, que sale de `main` (16 oct 2026). Lleva la
  iteración 22 completa: `/temario`. **Sin subir**: Jorge decide cuándo.
- **Un PR abierto: #27 · `webinar-redirect-diagonal`** (3 oct 2026). Es una
  línea de `vercel.json` —el `source` pasa a `/webinar{/}?`— y una frase de este
  archivo. **Medido el 16 oct 2026: en producción `/webinar/` con diagonal
  todavía responde 200 con la lista de espera vieja** («En las próximas
  semanas»), aunque el registro ya abrió; sin diagonal sí redirige. Probado con
  `@vercel/routing-utils` 6.6.0 —el convertidor de Vercel—: el PR arregla
  `/webinar/` y no toca ninguna otra ruta. Falta mergearlo; después,
  `curl -sI https://www.ilhas.ai/webinar/` debe dar 307.
- **`main` ya trae las iteraciones 10 a 19** y el link in bio: el **#18 se
  mergeó** y el **#20** metió la presentación de la masterclass.
- El **#21** entró a `main` el 6 sep 2026
  con todo `/jorgesierra` —las ocho filas con piel de marca, YouTube y las dos
  guías—, más las cabeceras, el `sitemap.xml` y la migración a `www.ilhas.ai`.
  - **#17 · `cabeceras-vercel`** — **cerrado sin mergear**, su contenido está
    reescrito en `main`. Su `vercel.json` traía sólo `headers` y el de `main`
    sólo `redirects`: mergearlo mataba el redirect `/jorge` → `/jorgesierra`.
    Ahora es un solo archivo con las dos claves.
  - **#19 · `link-in-bio`** — **cerrado sin mergear**, llevaba semanas obsoleto:
    su contenido ya estaba en `main`.
- **Verificado contra el sitio vivo el 6 sep 2026, no contra ramas:** producción
  sirve las ocho filas y responde con CSP, HSTS, `X-Frame-Options: DENY`,
  `Referrer-Policy` y `nosniff`. `ilhas.ai/jorge` sigue redirigiendo, y la
  presentación de la masterclass recibe `style-src 'self' 'unsafe-inline'`, así
  que sus 494 estilos en línea siguen pintando.
- **MEDICIÓN: GA4 `G-ENCWN9XWT1`, y es la ÚNICA excepción a «cero JavaScript».**
  Hasta el 6 sep 2026 las nueve páginas servían 0 bytes de JS. GA4 entra porque
  sin medición no hay embudo; **nada más entra**. El menú, el desplegable de
  «Aprender» y la banda Ilhas→Hilas siguen siendo CSS puro.
  - El snippet va en **DOS lugares**: `src/layouts/Base.astro` (cubre las cinco
    del hub, las tres legales y `/temario`) y `src/pages/jorgesierra.astro`, que **no usa
    `Base.astro`** y si no se repite queda ciega — justo la del QR. Si cambia el
    ID, son los dos.
  - ⚠️ **El `gtag('config')` vive en `public/ga.js`, NO en línea.** El snippet
    que da Google es un `<script>` inline y admitirlo obligaría a poner
    `'unsafe-inline'` en `script-src`, que es la directiva que frena un XSS.
    Sacándolo a un archivo propio la CSP se queda en `script-src 'self'
    https://www.googletagmanager.com`. **No lo pegues en el `<head>`.**
  - Las etiquetas llevan **`is:inline`**, que en Astro significa «no lo
    empaquetes», no «vuélvelo código en línea»: siguen siendo `src` externos.
    Sin eso el build falla.
  - **La CSP se aflojó lo mínimo**, y está medido: `script-src` +
    `googletagmanager.com`, `connect-src` + los tres hosts de
    `google-analytics.com`/`analytics.google.com`, `img-src` + los dos de
    `google-analytics.com`. **0 violaciones** en `/`, `/jorgesierra`, `/cookies`
    y el deck, sirviendo con la política real.
  - **Pone dos cookies**: `_ga` (2 años) y `_ga_ENCWN9XWT1`. Por eso
    `/cookies` y `/privacidad` se reescribieron el 6 sep 2026 — la primera decía
    literalmente «Ilhas.ai no coloca cookies».
  - **El deck de la masterclass NO lleva GA4**: vive en `public/` como HTML
    estático, no pasa por `Base.astro`, lleva `noindex` y se proyecta en vivo.
  - **2 oct 2026: el registro abrió.** Los tres botones del webinar —los dos de
    `/finanzas` (con sus UTMs de vuelta) y el del pie— van a
    **`https://eventos.ilhas.ai/registro`**. Ya **ninguna página enlaza a
    `/webinar`**, y la URL **redirige (307) a `eventos.ilhas.ai/registro`**
    desde `vercel.json` (Jorge, 2 oct 2026), para los links viejos o
    compartidos. Salió del sitemap. `webinar.astro` sigue en el repo y se
    construye, pero el redirect de Vercel corre antes que el archivo y nadie
    la ve; no se borró porque `npm run eventos` cuenta
    `lista_espera_apuntarse` en ella. Lo de abajo es historia.
  - **`/webinar` — la lista de espera (6 sep 2026).** Los tres botones del
    webinar —los dos de `/finanzas` y el del pie— ya **NO van a
    `eventos.ilhas.ai`**: caen aquí, porque el registro todavía no abre. La
    página dice la verdad en el primer renglón y recoge la lista con un
    formulario de **Tally** (`GxGr82`), no de Google Forms.
    - ⚠️ **No suavices el titular.** Un «¡Ya casi!» es el humo que este sitio
      existe para no vender.
    - ⚠️ **No le quites el `?origen=sitio`** al enlace del formulario: cae en un
      campo oculto y sin él las respuestas llegan con el origen vacío.
    - ⚠️ **No enlaza de vuelta a `/finanzas`**, y es a propósito: dos de las
      tres puertas salen de ahí.
    - Va **suelta, sin `Base.astro`**, como `/jorgesierra`. Y con
      `<body class="espera-doc">`, porque Astro nunca scopea `body`.
    - Se llama `/webinar` **a secas**: el día que el registro abra, esta misma
      URL se vuelve la página de registro. Cambia el contenido, no la dirección.
    - **`eventos.ilhas.ai` quedó sin enlaces desde las páginas que venden**, y
      con ello se perdieron las UTMs que llevaba la constante `webinarUrl`. Los
      de `/terminos`, `/privacidad` y `/cookies` NO se tocaron: ahí son
      descriptivos y siguen siendo ciertos.
  - **LOS CINCO EVENTOS, desde el 6 sep 2026.** `carril_elegir` (los dos CTA
    del hero, con parámetro `carril`), `webinar_reservar`, `diagnostico_agendar`,
    `contacto_correo` y `lista_espera_apuntarse`. El registro es **`src/data/eventos.ts`** y el chequeo
    **`npm run eventos`**, que corre DENTRO de `npm run build`.
    - Se cuelgan de un atributo **`data-evento`** en el marcado, **nunca de un
      selector CSS ni del texto del botón**: así sobreviven a un cambio de copy,
      de clase, de color o de orden. Un solo listener delegado en `document`,
      en fase de captura, dentro de `public/ga.js`. No hay más JS.
    - ⚠️ **El pie sale en las NUEVE páginas de `Base.astro`** (desde el 16 oct
      2026 también `/temario`), así que `contacto_correo` aparece **13** veces
      (9 del pie + 4 en el cuerpo de las legales) y `webinar_reservar` **10**
      (8 del pie —el de `/temario` va SIN ese enlace, `sinWebinar`— + 2 en
      `/finanzas`).
      La propuesta hablaba de «tres enlaces» contando ubicaciones
      lógicas, no apariciones en el build — **`npm run eventos` cazó la
      diferencia en su primera corrida**. Si alguien cambia el pie, esos números
      se mueven.
    - **NO se agregan más eventos sin una razón.** Scroll, vistas de sección,
      clic por tarjeta y reproducción del hero ya se descartaron, con el motivo
      escrito en `eventos.ts`. Cada evento que agregas es uno que se puede
      romper, y la analítica rota es peor que la ausente.
    - ⚠️ **Hay que APAGAR el scroll de «medición mejorada» en la propiedad de
      GA4**: la página cambia de largo cada iteración, así que el 50% de hoy no
      es el del mes pasado y la serie histórica no significa nada. Los clics
      salientes se dejan.
  - ⚠️ **EL ID DE GA4 VIVE EN TRES LUGARES**: `Base.astro`, `jorgesierra.astro`
    y `webinar.astro`. Las dos páginas sueltas no heredan el `<head>` de Base.
    Si cambia, son los tres.
  - ⚠️ **El flujo de GA4 está declarado como `https://ilhas.ai` (apex) y el
    sitio canónico es `www.ilhas.ai`.** No rompe la medición —el ID es lo que
    manda— pero conviene alinearlo en la consola de GA4.

- **Los dos descargables de `/jorgesierra`:** `manual-ia-agentica.pdf` (24 pág,
  1.1 MB) y `numeros-que-pagan-la-nomina.pdf` (16 pág, **6.19 MB**). El segundo
  pesa de más porque **trae el texto trazado como curvas vectoriales, glifo por
  glifo**, sin fuentes ni imágenes incrustadas. Si se regenera desde la fuente
  incrustando Inter y Space Grotesk —las dos ya están en `public/assets/fonts/`—
  bajaría a unos cientos de KB. Es peso de descarga, no de página: sólo se baja
  al hacer clic.

### ⚠️ Las cabeceras de seguridad: lo que se aprendió

`public/_headers` **nunca aplicó**. Es formato Netlify / Cloudflare Pages y el
sitio corre en **Vercel**, que lo ignora sin decir nada. Durante meses el
repositorio creía tener CSP y producción respondía **sin una sola cabecera de
seguridad** — medido con `curl -I`. El archivo se borró; las cabeceras viven en
`vercel.json`. **Una cabecera que no se verificó contra producción no existe.**

**El dominio canónico es `www.ilhas.ai`** (Jorge, 6 sep 2026); el apex redirige.
`site` en `astro.config.mjs` decía el apex, así que todos los `canonical`
apuntaban a una URL que redirige. ⚠️ **`site` no cubre dos lugares** que llevan
la URL escrita a mano: `src/pages/jorgesierra.astro` (no usa `Base.astro`) y
`public/jorgesierra/ia-aplicada-masterclass/index.html` (no pasa por Astro, y
lleva también `og:image`). La prueba tras cada build:
`grep -rn "https://ilhas\.ai" dist/ | grep -v eventos.ilhas.ai` debe salir vacío.
- **El sitio nuevo en Astro está completo**: las cinco rutas del hub más las tres
  legales, con la auditoría visual (`AUDITORIA-VISUAL.md`) ya aplicada.
- **Iteraciones cerradas:** 1 (ranuras) · 2 (activar material) · 3 (hero del home)
  · 4 (el hueco y el mapa I·L·H·A·S) · 5 (bifurcación y `MapaEmpresa`) · 6
  (`/metodo` §01–§04) · 7 (banda Ilhas→Hilas y §05–§09) · 8 (el visor de §07) · 9
  (cirugía de copy) · 10 (productos) · 11 (capas y el experimento como figura) ·
  12 (`/finanzas`) · 13 (redes) · 14 (distinción del papá) · 15 (credenciales del
  hijo) · 16 (el mapa lleno) · 17 (el pie y las legales) · 18 (el aire de
  arriba y la § En público) · 19 (el hero corriendo) · **22 paso A (cabeceras en
  `vercel.json`, dominio canónico `www` y `sitemap.xml`)** · **22 · `/temario`**
  (16 oct 2026 — el brief se llama `iteracion-22-temario.md` y su número choca
  con el «22 paso A»: son dos iteraciones distintas). Los briefs viven en
  `prompts/iteracion-*.md`; el de medición es `prompts/PROPUESTA-medicion.md`.
- **`/temario` (iteración 22) — cómo está armado, antes de tocarlo:**
  - ⚠️ **DIRECTO AL TEMARIO** (Jorge, 16 oct 2026: «me quiero ir directamente
    al temario»). La entrada lleva al índice y al primer curso, sin nada en
    medio. **Se quitaron, y no vuelven
    sin que Jorge lo pida**: las tarjetas de «El programa en una mirada»,
    «Cómo se trabaja» con el diagrama de la ruta del Bootcamp, «Para quién es»
    y la banda de cierre con el botón y el correo. «Al terminar, tienes» no
    estaba en su lista y bajó a después de los cursos. El doc maestro sigue
    trayendo esas secciones: el parser las reconoce y las salta
    (`QUE_NO_SE_PINTAN` en `temario.ts`). La tabla de la mirada se sigue
    LEYENDO aunque no se pinte, porque de ella salen los totales que se revisan
    y la pregunta de «Te resuelve» de cada curso.
  - ⚠️ **SIN BOTONES Y SIN WEBINAR** (Jorge, 16 oct 2026: «ellos ya pasaron
    por el webinar»). Quien llega a `/temario` ya lo vio: la entrada no lleva
    «Reservar el webinar» ni «Ver el temario», y **el pie de esta página va sin
    «Reservar el webinar»** — prop `sinWebinar` de `Base.astro`, que la pasa a
    `Footer.astro`. Las otras ocho páginas siguen igual, byte a byte. No le
    pongas un CTA al webinar a esta página.
  - **«Curso 1», «Curso 2», «Bono»** van en píldora morada sólida, a 16 px en
    teléfono y 18 en escritorio (Jorge: «que sea más visible»), no como kicker.
  - ⚠️ **QUE SE DIGIERA EN EL TELÉFONO** (Jorge, 16 oct 2026: «está muy
    saturado… la mayoría lo van a leer en el celular… lo más importante son los
    módulos, las lecciones»). Cada curso es un ÍNDICE: «Curso N», nombre,
    pregunta, una línea de datos y sus módulos como filas que se abren (el
    primero, abierto); adentro, **una lección por renglón** —código y título—,
    y la descripción y el «Te llevas» salen al tocarla. El texto largo del
    curso («Cómo trabajas», «Antes de empezar», «Al terminar tienes» y las 5
    fases del Bootcamp) vive en un **«Sobre este curso» cerrado**. Todo va en
    UNA columna centrada de 46 rem, también en escritorio. La entrada se quedó
    en kicker, título, frase y «7 cursos · 106 lecciones»: las tres frases de
    introducción y la nota de los niveles avanzados ya no se pintan (siguen en
    el doc). «Lo que recibes» pasó de rejilla de tarjetas a lista. **No le
    vuelvas a meter tarjetas, cajas ni texto abierto al temario**: si algo es
    de lectura larga, va cerrado.
  - **Si Jorge quita una sección entera de su doc**, la página no deja un
    titular vacío: la sección y su chip del índice se van solos, y los fondos
    blanco/claro se recalculan para que dos vecinas no se fundan (`bandas` en
    la página).
  - **La página no escribe contenido.** Todo sale de `src/data/temario.md` —la
    exportación a Markdown del doc maestro de Jorge— a través de
    `src/lib/temario.ts`, que la página importa con `?raw`. Para cambiar el
    temario se reemplaza ese archivo; el código no se toca.
  - **`npm run temario`** (`scripts/temario-check.mjs`) corre **ANTES** de
    `astro build`, dentro de `npm run build`, y **detiene el build** si el
    temario no cuadra: lecciones declaradas contra listadas (la Masterclass
    cuenta módulos), la tabla «El programa en una mirada» contra cada sección,
    la suma contra el encabezado, lecciones/niveles/módulos mencionados que no
    existen, residuos de exportación, **cualquier costo** (`$`, `USD`, `MXN`,
    gratis, de pago, cuánto pagar, costo, licencia) y anclas repetidas. Usa el
    MISMO parser que la página. Acepta otra ruta para probar una exportación
    antes de reemplazar la buena: `npm run temario -- ~/Downloads/temario.md`.
  - **El total de lecciones no está escrito en ningún lado**: sale del
    encabezado del archivo (hoy «7 cursos · 106 lecciones»; el brief viejo
    decía 108 y Jorge lo cambió el mismo 16 oct al quitar una lección).
  - **Los ids de los cursos salen de una palabra clave, no del nombre**
    (`IDS_CURSO` en `temario.ts`): `#masterclass`, `#bootcamp`, `#ia`,
    `#datos`, `#reporte`, `#herramienta`. «IA de 0 a 100» se llamaba «Claude de
    0 a 100» hasta el 16 oct: con el nombre entero, ese cambio habría roto los
    enlaces que Jorge ya mandó. Lecciones: `#bootcamp-h2`, `#ia-4-10`,
    `#masterclass-3`; módulos: `#bootcamp-h`, `#ia-nivel-4`. **El id va DENTRO
    del `<details>`** (en el detalle de la lección, o en un `div` al arranque
    del módulo), no en él: así el navegador abre el módulo y la lección al
    llegar, y un `scroll-margin` de 7.5 rem extra deja ver el título. Medido:
    `#bootcamp-h2` a 390 px deja el título en y=164, debajo del índice. El
    código de la lección ya NO es enlace —estorbaba en el renglón—: Jorge arma
    la URL con el patrón.
  - `src/components/temario/` — `Curso.astro` (un curso como índice: módulos y
    lecciones en `<details>` anidados, y su «Sobre este curso») y `Texto.astro`
    (negritas y cursivas sin `set:html`). El diagrama de la ruta (`Ruta.astro`)
    existió y se borró con la decisión de arriba; está en el commit `7f7435a`
    si algún día vuelve.
  - **El índice fijo depende del alto del header**, que no vive en ningún
    token: `--alto-header` en `temario.astro` (74.4 px, medido). Si `Nav.astro`
    cambia de alto, cambia ahí o el índice deja una rendija.
  - **`MAESTROS` vive en `src/data/personas.ts`**: foto, atribuciones,
    distinción y redes de las dos personas, para `/finanzas` y `/temario`. En
    `/temario` el nombre y la trayectoria salen del temario, y **el rol de
    Jorge es «CEO de Ilhas»** (Jorge, 16 oct 2026). `/finanzas` quedó idéntico
    byte a byte salvo el ícono nuevo.
  - **YouTube entró a `ENLACES.hijo`**, al tipo `Red` y a `IconoSocial`, así
    que ahora sale también en `/finanzas` y `/nosotros` (el brief lo pidió).
    ⚠️ **La URL quedó DUPLICADA en `jorgesierra.astro`**, que arma sus filas
    aparte y no lee `personas.ts`. Si cambia el canal, son los dos.
  - **La hoja de estilos única creció 1.7 KB con gzip** (15.8 → 17.5 KB) y la
    descarga TODA página, porque `cssCodeSplit` está apagado a propósito. Si
    algún día pesa, el temario es el primer candidato a hoja propia.
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
| **`/temario` · lo que no cuadró en el temario** | Se publicó tal cual y **no se arregló adivinando** (brief, § 1). Se corrige en el doc maestro y se reexporta: ① **«¡Dudas de Supabase!»** al final de la lección 4.2 de Análisis de datos se lee como nota interna — sale publicada si no se quita; ② la misma 4.2 dice «Data Studio», que hoy se llama Looker Studio; ③ el módulo 6 de la Masterclass dice «qué te dice cada una» sin decir cada una de qué; ④ la descripción de R.0 («no importa que hasta mano haya información queda muy bien hecho…») está cortada; ⑤ I.1 («lo que te cuesta valor, no necesariamente en tiempo…») y la fase I de la tabla de fases se leen cortadas; ⑥ el perfil «Dueños de negocio» cierra con «para eficientizar que realmente muevan la aguja»; ⑦ «dueño de negocio» sale en el perfil de profesionales **y** como perfil propio — ⑥ y ⑦ ya **no se publican** («Para quién es» salió de la página), pero siguen en el doc; ⑧ el «94% de las hojas de cálculo tenía errores» (Análisis 2.2) no dice de qué estudio sale; ⑨ «¿De IA cuáles también?» en Tu herramienta correcta |
| **«Bootcamp» y «Skool» en `/temario`** | `docs/00-INDEX.md` dice que la palabra «bootcamp» no se escribe (25 ago 2026) y que el sitio no nombra la plataforma de entrega. El temario del 16 oct trae **«Bootcamp Ilhas»** como nombre de curso y **«Comunidad en Skool»**, y `/temario` lo publica tal cual porque el brief manda presentarlo sin editarlo. Falta que Jorge confirme las dos decisiones; si sí, se cierran esas líneas del INDEX |
| **«+1,000 MDP/mes» en la tarjeta de Jorge en `/temario`** | Es su atribución de siempre (sale de `MAESTROS`), no un costo. Pero el brief dice «ni montos de dinero»: si eso alcanza a las credenciales, se filtra sólo en `/temario`, sin tocar `/finanzas` |
| **PR #27 sin mergear** | `/webinar/` con diagonal sigue sirviendo la lista de espera vieja en producción. Ver arriba |
| **El punto huérfano del titular del home** | Desde que el titular es «…con agentes de IA.» (5 sep 2026), **a ≥1200 px el punto final cae solo en su propio renglón**. Medido: a 1440 el `<h1>` pasó de 4 a 5 renglones y el punto queda en `left=198`, al margen. A 390 y 768 se lee bien. Es la costura entre el `<span class="text-gradient">` —que es `inline-block` por el `background-clip:text`— y el punto que va fuera. **No se tocó: la decisión es de Jorge.** El arreglo es envolver span y punto en un `white-space:nowrap`, no cambiar el copy |
| **`<title>` y `og:title` dicen «con IA»** | `src/layouts/Base.astro:78` y `:92` siguen con «Ilhas — tu primer proceso corriendo con IA», mientras el `<h1>` ya dice «con agentes de IA». **No se tocó**: es copy de Jorge y son las dos cadenas que ve Google y ven las redes al compartir. Igual `medios/hero-b2-referencia.html:129`, que es otra referencia del hero |
| **`/finanzas` §07 · servicios del papá** | **Confirmado que va** (Jorge, 27 ago 2026). Faltan dos insumos suyos: el **copy de los servicios** y **a dónde apunta el botón de agenda** — hoy no hay ninguna URL de agenda en el repositorio, el único destino externo es `eventos.ilhas.ai` |
| **`/nosotros` § La historia** | Tres clips (`nosotros-historia-01/02/03`) sin material |
| **Párrafo de intro de la línea de tiempo** | Marcado como `TODO copy` en `src/pages/nosotros.astro`. Lo escribe Jorge |
| **Subtítulo del hero** | El de hoy —«Lo que hoy le toma horas a alguien de tu equipo…»— es una **propuesta mía, no copy aprobado**. El titular sí es de Jorge. Está puesto para que la página no quede coja; falta su visto bueno |
| **Revisión legal** | **Un abogado no ha visto `/terminos`, `/privacidad` ni `/cookies`.** Son borradores sólidos y honestos, escritos para México, pero sin revisar. Es un trámite de una sesión y hoy es un hueco abierto |
| **El domicilio fiscal** | Jorge lo pasó como *Zapopan* y el **C.P. 44690 es de Guadalajara**. Los documentos van con Guadalajara; **falta que lo confirme contra su constancia**, porque de ahí depende la cláusula de jurisdicción |
| **El redirect del apex es 307, no 308** | `ilhas.ai` → `www.ilhas.ai` responde **307 (temporal)**. Para canonicalizar un dominio debe ser **308**. Se cambia en el panel de Vercel, en los dominios del proyecto — **no en `vercel.json`**, porque el redirect de dominio corre antes del enrutado |
| **GA4 · el paso B de la medición** | Falta el `G-XXXXXXXXXX` de la propiedad (cuenta `jorge@ilhas.ai`). El sitio lo va a cargar desde **un archivo propio** `/assets/medicion.js`, no inline: así se mantiene la regla de cero `<script>` inline y la CSP sólo abre `googletagmanager.com` y `*.google-analytics.com`. **Cero píxeles de anuncios en el sitio** (Jorge, 6 sep 2026): el tráfico es orgánico de IG y TikTok, y lo de campañas se mide en GHL |
| **`/privacidad` manda al INAI, que ya no existe** | La página remite al **INAI** y enlaza `inai.org.mx`. La **nueva LFPDPPP entró en vigor el 21 mar 2025** y las funciones del INAI pasaron a la **Secretaría Anticorrupción y Buen Gobierno**. Detectado el 6 sep 2026. Se corrige en el mismo PR que actualiza las legales por GA4 — y es una razón más para la revisión del abogado que sigue pendiente |
| **Las legales, cuando entre GA4** | `/privacidad` dice que el sitio no recoge datos y `/cookies` dice que no hay cookies. **Con GA4 las dos dejan de ser ciertas** y se actualizan en el mismo PR que prende la medición, no después |
| **DNS · plataforma del programa** | El hosting ya está resuelto (**Vercel**, 6 sep 2026). Sigue abierto **quién controla el DNS de ilhas.ai** y la plataforma de entrega del programa. Ver `docs/00-INDEX.md` § "Lo que NO está resuelto" |

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
