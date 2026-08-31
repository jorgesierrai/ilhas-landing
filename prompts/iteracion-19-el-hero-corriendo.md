# Iteración 19 — El hero se pone a correr

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 31 ago 2026.

> Rama: **`hero-corriendo`**, salida de donde quedó la 18.
>
> **Dos referencias, las dos construidas y medidas. Copia ese CSS, no lo
> reinventes:**
> `medios/hero-referencia.html` — el hero (579 px escritorio · 829 móvil ·
> 576 en 1024).
> `medios/cifras-referencia.html` — la banda de cifras (184 px escritorio ·
> 307 móvil).

Son siete cambios: cuatro del análisis de Jorge, la barra de stats, la banda
de cifras que baja del hero, y el `og:image`. El quinto punto del análisis —el `alt` de la
foto del hero— **no se hace**, y abajo está por qué.

---

## 1 · El hero del home: el loop de Kinzal, entero

`src/pages/index.astro`

> **ESTA SECCIÓN SE REESCRIBIÓ EL 31 AGO 2026, DESPUÉS DE QUE LA 19 YA SE
> CORRIÓ UNA VEZ.** Cambian el video y el tratamiento. Si ya ejecutaste la
> versión anterior, esto la sustituye.

### 1.1 · El video es otro: Kinzal, no Morgan

Jorge lo cambió y tiene razón. El de Morgan **necesitaba desenfoque para ser
publicable**, y un desenfoque visible en el hero anuncia que ahí había algo
escondido. Encima nombraba a la clínica en pantalla y enseñaba el total de un
ciclo de quimioterapia: material de un tercero, sobre un tema que no es de
nadie más.

El de Kinzal **no necesita taparse nada.** Se revisó cuadro por cuadro: los
campos de cliente del generador —«TADI», «Desarrolladora del Occidente S.A.»,
«Arq. Marco Torres», «Torre Topacio»— son **texto placeholder**, no valores
capturados; se distinguen por el gris apagado contra el blanco de los campos
llenos. La hoja de cálculo no enseña ningún correo. Y es empresa de Jorge, así
que el permiso no depende de nadie más.

⚠️ **Los tres archivos del repo ya son los nuevos.** No reutilices nada del
loop anterior.

### 1.2 · Va COMPLETO y va en mp4 solo

Nueve segundos y medio, sin recortes: los planos cargando, la solicitud
saliendo, el generador de KINZAL armando la cotización, y el cierre en el
bloque verde del **ahorro: $211,772.77, 6.14% contra base.**

**Se cae el `<source>` de webm.** El presupuesto de la ranura lo daba por
sentado, pero con este contenido —texto de UI y tablas densas— VP9 pierde
contra H.264: el webm salía en 996 KB *y peor de calidad* contra 842 KB del
mp4. Un formato más grande y más feo, servido primero, es peor que no
tenerlo. **Un solo `<source>`, mp4.**

```
public/assets/video/home-hero-loop.mp4   842 KB · 1280 × 604 · 9.4 s · sin audio
public/assets/video/home-hero-loop.jpg    88 KB · el ÚLTIMO cuadro, el del ahorro
```

⚠️ **El póster es el último cuadro, no el primero.** Con movimiento reducido
el video no se pinta y sólo queda el póster: quien nunca vea el loop tiene que
quedarse con el resultado, no con un formulario vacío.

### 1.3 · El cuadro ENTERO, sin recortar

Esto es lo que pidió Jorge: *«se tiene que ver todo… ponlo más pequeño, que se
vea que están cargando los planos y todo»*.

Antes la caja medía 56% × 100% del hero y el video la llenaba con
`object-fit: cover` — o sea recortando por los lados. Se veía la cotización y
se perdía la mitad de la demo.

**Ahora la caja lleva la relación de aspecto del video, así que no hay nada
que recortar.**

```css
.hero__medio{
  position:absolute; right:calc(-1 * var(--ilhas-gutter)); top:.5rem;
  z-index:1; width:58%; aspect-ratio:1280/604;
  border-radius:12px 0 0 12px; overflow:hidden;
  border:1px solid rgba(248,250,255,.14); border-right:0;
  box-shadow:0 40px 80px -30px rgba(0,0,0,.95);
}
.hero__medio video,.hero__medio img{
  width:100%; height:100%; object-fit:contain; display:block;
}
```

El `right` negativo compensa el gutter del contenedor: el canto derecho del
cuadro cae en el borde del navegador y no en el del contenedor. **Sangra, pero
no recorta** — que es lo que Jorge quería conservar del look anterior.

### 1.4 · El velo se va, y el hero deja de ser una sola capa

```css
- .hero__velo { … }          /* borrar la regla y el <div> */
```

El velo existía para que el texto se leyera **encima** de la foto. Ahora el
texto y el video no se tocan, así que lo único que hacía era apagar la
captura: en las pruebas dejaba la mitad izquierda del panel de KINZAL gris.

La sección pasa de `display:flex; align-items:center; min-height:620px` a un
bloque con padding, y por dentro:

```
.hero__inner   ← grid de dos columnas en escritorio
.hero__texto   ← columna izquierda
.hero__medio   ← columna derecha, sangrando por el canto
```

⚠️ **Los KPI ya NO van en el hero: bajan a la § «Esto ya está corriendo».**
Es el §7. Al sacarlos, el hero se queda con titular, párrafo y botones — y por
eso `.hero__inner` pasa a **grid de dos columnas** en vez del medio absoluto
con `min-height` a mano:

```css
@media (min-width:900px){
  .hero__inner{display:grid;grid-template-columns:minmax(0,38%) minmax(0,1fr);
    gap:clamp(2rem,4vw,3.5rem);align-items:center}
  .hero__medio{margin-right:calc(-1 * var(--ilhas-gutter))}
}
```

**Por qué el cambio y no sólo borrar el bloque:** con el medio `absolute`, la
altura del hero la daba el `min-height:21rem` de la columna de texto. Sin los
KPI el texto mide menos que el video (394 px a 1440), así que **el video se
salía por abajo de la sección.** En grid la fila mide lo que mida el más
alto de los dos, sola. El sangrado se conserva con `margin-right` negativo.

⚠️ **El titular baja a `clamp(2rem,3.6vw,2.9rem)` y `max-width:12ch`**, y el
lead a `30ch`. Con la columna al 38% y el tamaño anterior, el titular rompía
en cuatro líneas con «IA.» colgando sola.

### 1.5 · El orden del DOM importa, y no por lo que parece

```jsx
<div class="hero__texto"> … </div>
<div class="hero__medio" aria-hidden="true"> … </div>   ← DESPUÉS del texto
<div class="hero__kpis"> … </div>
```

En escritorio el medio es `position:absolute` y el orden da igual. **En móvil
pasa a `relative` y el orden es el que manda**: con el medio primero, el video
salía ARRIBA del titular. El padre no es flex, así que `order` no lo arregla —
tiene que ser el DOM.

En móvil queda: titular → subtítulo → botones → **video** → KPI.

### 1.6 · El marcado

```jsx
{mostrar("home-hero-loop") && (
  <div class="hero__medio" aria-hidden="true">
    <video
      poster="/assets/video/home-hero-loop.jpg"
      autoplay muted loop playsinline preload="metadata"
      width="1280" height="604">
      <source src="/assets/video/home-hero-loop.mp4" type="video/mp4" />
    </video>
    <img class="hero__poster" src="/assets/video/home-hero-loop.jpg"
         alt="" width="1280" height="604" />
  </div>
)}
```

⚠️ **Los cuatro atributos del `<video>` son obligatorios y ninguno sobra.**
`muted` sin `autoplay` no arranca; `autoplay` sin `muted` lo bloquea el
navegador; sin `playsinline` iOS lo abre a pantalla completa; sin `loop` se
congela a los nueve segundos.

⚠️ **`aria-hidden` va en el contenedor, no en el `<video>`.**

⚠️ **Ojo con la especificidad del póster.** `.hero__poster` a secas es (0,1,0)
y pierde contra `.hero__medio img` (0,2,0), así que el póster se pinta SIEMPRE
debajo del video. Va scopeado:

```css
.hero__medio .hero__poster{display:none}
@media (prefers-reduced-motion: reduce){
  .hero__medio video{display:none}
  .hero__medio .hero__poster{display:block}
}
```

Es la misma clase de bug que el del pie en la iteración 17. **No rompe el
build y no sale en ningún grep: sólo se ve mirando la página.**

### 1.7 · El pie de foto se va

```
- {fotoHero && <p class="hero__credito">Talent Land · abril 2018</p>}
```

Ese crédito describía la foto. **No lo sustituyas por un crédito del video.**

### 1.8 · La ranura, en `src/data/medios.ts`

`duracion` pasa a `"9.4 s"` y las `notas` se reescriben enteras — las que hay
hablan de Morgan, del recorte y de las tres cajas de desenfoque, y **todo eso
ya no aplica**:

```
CABLEADO el 31 ago 2026. Es el hero del home. Video de KINZAL, empresa de Jorge: los planos cargando, la solicitud, el generador armando la cotización, y el cierre en el bloque de ahorro ($211,772.77 · 6.14% vs base). 1280×604 · 9.4 s · sin audio · mp4 842 KB, SIN webm (con este contenido VP9 salía en 996 KB y peor: un formato más grande y más feo servido primero es peor que no tenerlo). NO LLEVA REDACCIÓN Y NO LA NECESITA: se revisó cuadro por cuadro y los campos de cliente del generador son texto placeholder, no valores. Sustituyó a un corte del video de Morgan que sí exigía tres cajas de desenfoque — se descartó el 31 ago porque nombraba a la clínica y enseñaba el total de un ciclo de quimioterapia. El póster es el ÚLTIMO cuadro, el del ahorro, no el primero: con prefers-reduced-motion es lo único que se ve. Decorativo: aria-hidden.
```

## 2 · El titular y el subtítulo

`src/pages/index.astro:105-116`

**El titular lo eligió Jorge el 31 ago 2026.** Va literal:

```jsx
<h1>
  Tu primer proceso corriendo <span class="text-gradient">con IA</span>.
</h1>
```

El subtítulo tiene que cambiar con él —el actual habla de infraestructura
crítica y empresas unicornio, que era el pie del titular viejo—:

> Lo que hoy le toma horas a alguien de tu equipo, hecho por un sistema que tú
> entiendes y que corre solo. Te lo enseñamos, o te lo dejamos corriendo.

⚠️ **Este subtítulo es una propuesta, no copy aprobado.** Jorge escribe el
copy del sitio. Déjalo puesto para que la página no quede coja, y repórtalo
como pendiente de su visto bueno.

El lead se acorta —se le cae la última oración— porque la columna de texto
ahora mide 38% y a 44ch rompía feo:

> Lo que hoy le toma horas a alguien de tu equipo, hecho por un sistema que tú
> entiendes y que corre solo.

`max-width` del lead: **30ch**. Del `<h1>`: **12ch**.

---

## 3 · La banda de autoridad sale del home

`src/pages/index.astro:141-159`

Borra el bloque completo —el comentario, el `<div class="container
banda-autoridad">` y el `<BandaAutoridad>` de adentro— más:

- el `import BandaAutoridad from "../components/medios/BandaAutoridad.astro"`
  de la línea 6,
- la regla `.banda-autoridad` del `<style>`, si queda sin usar.

⚠️ **NO borres `src/components/medios/BandaAutoridad.astro`.** El componente
se queda en el repo: solo el home lo usaba, pero el trabajo de construirlo ya
está hecho y puede volver en otra página.

**Por qué se va y no se pierde nada:** los tres hitos que resumía —nov 2017,
ene 2018, abr 2018— son exactamente los tres momentos que la iteración 18
desplegó completos en `/nosotros § En público`, con sus medios y sus pies. La
banda era el índice de una sección que entonces no existía. Ahora existe.

### 3.1 · La ranura de la foto vuelve a ser de `/nosotros`

`src/data/medios.ts`, ranura `home-hero-conferencia`:

```ts
- pagina: "compartido",
- seccion: "§01 Hero del home · /nosotros § En público",
+ pagina: "nosotros",
+ seccion: "§ En público · segunda foto de Talent Land",
```

Y en `notas`, agrega al final:

```
Desde el 31 ago 2026 ya NO es el hero del home —ahí va home-hero-loop— y vuelve a ser exclusiva de /nosotros. El recorte se conserva tal cual: en /nosotros es la foto que prueba de qué hablaba (se lee la pregunta en pantalla) al lado de nosotros-conferencia, que prueba la escala. Lo del enmascarado y el 26% izquierdo ya no aplica.
```

⚠️ **El archivo de imagen no se toca y el recorte no se rehace.** Sigue siendo
la foto que `/nosotros` usa desde la iteración 18.

⚠️ Verifica que `/nosotros` sigue mostrando las dos fotos de Talent Land
después del cambio de `pagina`. Si `mostrar()` deja de encontrarla, el cambio
de `pagina` está mal hecho — es una etiqueta de inventario, no un filtro de
render.

---

## 4 · La barra de stats

Va **pegada al hero**, arriba de la banda Hilas — o sea, exactamente en el
hueco que deja la banda de autoridad al salir en el §3. Por eso el home no
crece por meterla.

**El copy es de Jorge y va literal. No lo edites, no lo "mejores", no le
agregues asteriscos ni notas al pie.**

| Cifra | Pie |
|---|---|
| **12×** | más rápido |
| **8×** | menos costo que humanos |
| **6-12%** | más ingresos |

### 4.1 · El marcado

```jsx
<section class="stats" aria-label="Resultados del método">
  <div class="stats__reja">
    <div class="stats__uno">
      <span class="stats__cifra">12×</span>
      <span class="stats__pie">más rápido</span>
    </div>
    <div class="stats__uno">
      <span class="stats__cifra">8×</span>
      <span class="stats__pie">menos costo que humanos</span>
    </div>
    <div class="stats__uno">
      <span class="stats__cifra">6-12%</span>
      <span class="stats__pie">más ingresos</span>
    </div>
  </div>
</section>
```

⚠️ El signo de «12×» y «8×» es **× U+00D7**, el de multiplicación — no una
equis minúscula. En una tipografía de display la equis se ve torcida al lado
de la cifra.

⚠️ **Sin `section-y` y sin margen contra el hero.** Los dos bloques oscuros
tienen que leerse como uno solo; el corte a blanco pasa una vez, abajo.

⚠️ El `<section>` lleva `aria-label` porque no tiene encabezado. Sin eso es
una región anónima en el árbol de accesibilidad.

### 4.2 · El CSS va tal cual de la referencia

`medios/hero-referencia.html` lo trae completo y medido: **223 px en
escritorio, 403 px en móvil.** Cópialo. Dos cosas de ahí no son opcionales:

**`display:inline-block` en `.stats__cifra`, NO `block`.** Con `block` la caja
de la cifra mide toda la columna, y `background-clip:text` recorta sobre la
**caja**, no sobre el texto: «12×» alcanzaba nada más el arranque cian del
degradado mientras «6-12%» sí lo recorría entero. Los tres números salían de
colores distintos sin que nadie lo hubiera pedido. Con `inline-block` la caja
se ciñe al texto y los tres recorren el mismo degradado.

**`max-width:24ch` en `.stats__pie`, no 16ch.** «menos costo que humanos» mide
24 caracteres; a 16ch caía en dos líneas mientras las otras dos quedaban en
una, y el número de en medio se veía hundido.

### 4.3 · No las confundas con los KPI del hero

Son dos cosas distintas y por eso pesan distinto:

| | Tamaño | Qué dicen |
|---|---|---|
| KPI del hero | chicos, apagados | **quiénes son** — +1,000 MDP, 6+ startups, 2016 |
| Barra de stats | grandes, en degradado | **qué hace el método** |

⚠️ **Si igualas los tamaños se leen como seis números sueltos** y ninguno
pega. La jerarquía es lo que hace que funcionen los dos juntos.

⚠️ **No muevas los KPI del hero adentro de la barra** ni al revés.

---

### 4.4 · El hueco entre la barra y la banda Hilas

`src/components/BandaHilas.astro:78`

```
  .hilas {
-   margin-top: clamp(1.75rem, 3.5vw, 2.75rem);
+   margin-top: 0;
```

Ese margen deja **28 a 44 px del fondo claro de la página** asomando entre la
barra de stats —que es oscura y va a sangre— y la banda Hilas —que es blanca.
Se ve como una franja gris pálido pegada debajo de los números. Es lo que
Jorge llama «el huequito».

**Por qué estaba y por qué ya no aplica:** la banda Hilas venía después de la
banda de autoridad, que vivía dentro de un `.container` sobre el fondo claro,
y ahí el margen era el aire que la separaba. Ahora la precede una sección
oscura a sangre que termina en canto duro, y el margen se volvió una raya
suelta.

⚠️ Se toca en el componente y no con un selector hermano desde `index.astro`
porque **`BandaHilas` sólo se usa en el home** — se verificó. Si algún día se
usa en otra página, ahí sí habría que devolverle el margen desde fuera.

---

## 5 · El nav: «Ilhas Finanzas» → «Aprender»

Dos archivos, la misma línea:

`src/components/Nav.astro:16`
`src/components/Footer.astro:27`

```
- { href: "/finanzas", label: "Ilhas Finanzas" },
+ { href: "/finanzas", label: "Aprender" },
```

Y el comentario de `Nav.astro:3`, que dibuja el menú:

```
- // "ilhas    El Método · Ilhas Finanzas · Soluciones · Nosotros        [Hablemos]"
+ // "ilhas    El Método · Aprender · Soluciones · Nosotros        [Hablemos]"
```

**Por qué «Aprender» y no «Formación»,** que era lo que proponía el análisis:
pegado a «El Método», «Formación» suena a lo mismo y el visitante no sabe cuál
de las dos abrir. «Aprender» es un verbo y dice qué haces ahí, no cómo se
llama.

⚠️ **Solo cambia la etiqueta del menú.** El nombre del producto sigue siendo
Ilhas Finanzas en todos lados: el `<h1>` de `/finanzas`, el `<title>`, el
`og:title`, el copy. No hagas un buscar-y-reemplazar.

⚠️ El botón **«Hablemos» se queda apuntando a `/soluciones`.** Jorge lo
decidió el 31 ago. El sitio no tiene formulario —el aviso de privacidad dice
que Ilhas no recoge ningún dato— y meter uno era el cambio más caro de las
opciones. No lo toques.

---

## 6 · `og:image`

`src/layouts/Base.astro:57-64`

El archivo ya está en el repo: `public/assets/og/portada.jpg`, 1200 × 630,
75 KB.

### 6.1 · Las cuatro etiquetas

```jsx
    <meta property="og:url" content={canonicalURL} />
+   <meta property="og:image" content={new URL(imagen, Astro.site)} />
+   <meta property="og:image:width" content="1200" />
+   <meta property="og:image:height" content="630" />
+   <meta property="og:image:alt" content="Ilhas — tu primer proceso corriendo con IA" />
-   <meta name="twitter:card" content="summary" />
+   <meta name="twitter:card" content="summary_large_image" />
```

Con una prop nueva en `Props`, para que una página pueda poner la suya sin
rehacer esto después:

```ts
  /** Tarjeta para redes. Ruta absoluta desde la raíz del sitio. */
  imagen?: string;
```

```ts
const { title, description, heroOscuro = false, noindex = false,
        imagen = "/assets/og/portada.jpg" } = Astro.props;
```

⚠️ **`og:image` tiene que ser URL absoluta.** Con una ruta relativa
—`/assets/og/portada.jpg` a secas— ni Facebook ni LinkedIn ni WhatsApp
resuelven la imagen y la tarjeta sale sin nada. De ahí el `new URL(imagen,
Astro.site)`.

⚠️ **`twitter:card` pasa a `summary_large_image` y eso NO es opcional.** Con
`summary` la tarjeta sale cuadrada y recorta una imagen de 1200 × 630 por los
lados: se pierde la cotización, que es la mitad del diseño.

### 6.2 · El `og:url` NO se toca

El análisis proponía fijarlo a `https://ilhas.ai`. **Eso rompería lo que ya
funciona:** hoy `og:url` sale de `canonicalURL`, que es distinta en cada
página. Fijarlo haría que compartir `/finanzas` reportara la portada.

Lo mismo el `canonical`. Están bien. Déjalos.

### 6.3 · El `og:title` del home

`og:title` usa `title`, y el home pasa `title="Ilhas"` — o sea que compartir
la portada hoy diría, de titular, «Ilhas». En `src/pages/index.astro:78`:

```
  title="Ilhas"
```

Eso se queda (es lo que hace que el `<title>` del home no sea «Ilhas · Ilhas»),
pero el `og:title` merece la frase. En `Base.astro`:

```jsx
- <meta property="og:title" content={title} />
+ <meta property="og:title" content={pageTitle === "Ilhas" ? "Ilhas — tu primer proceso corriendo con IA" : pageTitle} />
```

## 7 · Las cifras bajan del hero a «Esto ya está corriendo»

Jorge: *«mételo abajo donde está eso… porque justo ahí está la prueba de lo
que causa que corra todo eso»*.

Tiene razón y es un ascenso, no una mudanza: en el hero las tres cifras
competían con el titular y por eso iban chiquitas. Abajo, pegadas a las
tarjetas de lo que ya está corriendo, **son el respaldo de lo que las
tarjetas enseñan** — y pueden mandar.

Van en **dos páginas**:

| Página | Sección | Archivo |
|---|---|---|
| Home | §05 · «De dónde sale el método / Esto ya está corriendo.» | `src/pages/index.astro:414` |
| `/soluciones` | §03 · «Casos / Esto ya lo construimos para empresas como la tuya.» | `src/pages/soluciones.astro:88` |

Las dos son `section-y bg-dark`, así que el tratamiento es el mismo.

### 7.1 · El dato se muda a su propio archivo

Hoy el array `kpis` vive dentro de `src/pages/index.astro:97`. Si `/soluciones`
lo copia, en tres meses habrá dos verdades. **Sale a `src/data/cifras.ts`:**

```ts
/**
 * Las tres cifras de respaldo. Copy de Jorge, va literal.
 *
 * Regla 4 de CLAUDE.md: los números se atribuyen, nunca se suman. El
 * `contexto` de cada una dice de qué es el número.
 *
 * Vive aquí y no dentro de una página porque la usan DOS: el home y
 * /soluciones. Copiarlas en cada una es cómo se acaba con dos verdades.
 */
export interface Cifra { dato: string; unidad?: string; contexto: string; }

export const CIFRAS: Cifra[] = [
  { dato: "+1,000", unidad: " MDP", contexto: "al mes, volumen respaldado" },
  { dato: "6",      unidad: "+",    contexto: "startups · infraestructura creada" },
  { dato: "2016",   unidad: "→",    contexto: "desarrollando IA" },
];
```

⚠️ **El copy no se toca.** Ni el orden.

### 7.2 · El marcado, igual en las dos páginas

Va **entre el `.section-head` y la lista de tarjetas**, nunca después:

```jsx
<div class="section-head reveal">
  <p class="kicker">De dónde sale el método</p>
  <h2>Esto ya está corriendo.</h2>
</div>

<div class="cifras reveal">
  {CIFRAS.map((c) => (
    <div class="cifras__uno">
      <span class="cifras__dato">
        {c.dato}{c.unidad && <i class="cifras__unidad">{c.unidad}</i>}
      </span>
      <span class="cifras__pie">{c.contexto}</span>
    </div>
  ))}
</div>

<ul class="linaje"> … </ul>
```

⚠️ **Arriba de las tarjetas, no abajo.** Las cifras son la causa y las
tarjetas el efecto; invertirlo convierte el respaldo en un pie de página.

⚠️ La unidad va **dentro** del `<span>` del dato, no como hermano: así no se
separa del número al envolver. Es el mismo patrón que ya usa `Stat.astro`.

### 7.3 · El CSS

Está completo en `medios/cifras-referencia.html`. Lo que no es negociable:

```css
.cifras{display:grid;gap:0;
  border-block:1px solid rgba(248,250,255,.13);
  padding-block:clamp(1.75rem,3vw,2.5rem)}
@media (min-width:760px){
  .cifras{grid-template-columns:repeat(3,1fr)}
  .cifras__uno{padding-inline:clamp(1.25rem,3vw,2.5rem)}
  .cifras__uno + .cifras__uno{border-left:1px solid rgba(248,250,255,.13)}
  .cifras__uno:first-child{padding-left:0}
  .cifras__uno:last-child{padding-right:0}
}
@media (max-width:759px){ .cifras{gap:1.5rem} }

.cifras__dato{display:block;font-family:var(--ilhas-font-display);
  font-weight:600;font-size:clamp(2.4rem,4.8vw,3.5rem);line-height:1;
  letter-spacing:-.035em;color:#fff;white-space:nowrap}
.cifras__unidad{font-style:normal;color:var(--ilhas-grad-end)}
.cifras__pie{display:block;margin-top:.7rem;font-size:.75rem;
  letter-spacing:.07em;text-transform:uppercase;line-height:1.45;
  color:rgba(248,250,255,.62)}
```

⚠️ **`white-space:nowrap` en el dato.** Sin eso «+1,000 MDP» se parte en dos
renglones en el rango 760-900 px y el número deja de leerse como número.

⚠️ **Nada de `max-width` en el pie.** La columna del grid ya lo limita; poner
un `ch` encima hace que las tres etiquetas rompan en sitios distintos.

### 7.4 · Los dos tratamientos que se probaron y se cayeron

Se construyeron los tres y se midieron. **No los vuelvas a proponer:**

- **Cada cifra en su tarjeta**, con el mismo fondo y radio que `TarjetaCaso`.
  Las cifras pesaban igual que las tarjetas de abajo y la sección se leía como
  **seis tarjetas**, tres de ellas con números. El respaldo se volvía otro
  caso más.
- **El número en degradado**, como la barra de stats. Repite el tratamiento
  de `12× / 8× / 6-12%`, y las dos filas de números de la misma página se
  ponen a competir. Encima el violeta de la unidad —« MDP», «+», «→»— se
  pierde adentro del degradado, y esa unidad en violeta es de la marca.

**Va en blanco, con reglas, y la unidad en violeta.** Así la banda se lee como
lo que es: el respaldo de las tarjetas, no otra fila de tarjetas.

### 7.5 · Lo que se borra del hero

`src/pages/index.astro`:

- el array `kpis` de la línea 97 — se va a `src/data/cifras.ts`,
- el `<div class="hero__kpis">` entero,
- las reglas `.hero__kpis` y `.kpi` del `<style>`,
- el `import Stat` **sólo si ya no queda ningún `<Stat>` en la página**.
  Revísalo: `/nosotros` también usa `Stat` y ése no se toca.

⚠️ **`Stat.astro` y su `variante="hero"` NO se borran.** La variante deja de
usarse en el home, pero el componente lo usan otras páginas. Si `variante`
queda sin ningún uso en todo el sitio, dilo en el reporte y que Jorge decida —
no lo quites por tu cuenta.

---

---

## Lo que NO se hace: el `alt` de la foto del hero

El análisis proponía cambiar el `alt` de `home-hero-conferencia` a *«Jorge
Sierra dando una conferencia sobre IA»*. **No se hace, por dos razones.**

La primera es que el `alt` que cita el análisis como «ANTES» no es el que
está en el repo. El real es:

> Jorge Sierra en el escenario de Talent Land, frente a una pantalla que
> pregunta «¿Quién sea puede crear inteligencia artificial?»

La segunda es que ese `alt` ya hace las dos cosas —describe la escena **y**
cita lo que se lee en pantalla— y el propuesto pierde la segunda, que es la
que carga el argumento. Cambiarlo sería un retroceso.

⚠️ Hay una errata real ahí: **«¿Quién sea puede crear…»** debería ser
**«¿Quién sí puede crear…»** o **«¿Quién puede crear…»**, según lo que diga
la pantalla. **No la corrijas a ciegas** — sale en la foto, hay que mirarla.
Repórtalo y que Jorge la lea.

---

## Verificación

```bash
npm run build      # cero warnings
npm run medios     # home-hero-loop deja de salir "(sin usar a propósito)"
```

⚠️ En `medios.ts`, la ranura `home-hero-loop` tiene `sinUsar: true`. **Quítalo
en esta iteración**, que es cuando por fin se usa. Si lo dejas,
`medios-check.mjs` avisa «marcada `sinUsar` pero SÍ aparece en dist/».

```bash
# El loop entra al hero — mp4 solo
grep -c "home-hero-loop.mp4"  dist/index.html      # 1
grep -c "home-hero-loop.webm" dist/index.html      # 0  — el webm se cayó a propósito
grep -c "home-hero-loop.jpg"  dist/index.html      # 2  — poster + <img> de respaldo
grep -c "autoplay"            dist/index.html      # 1
grep -c "playsinline"         dist/index.html      # 1

# El velo se fue
grep -c "hero__velo" dist/index.html               # 0

# El hueco antes de la banda Hilas
grep -c "margin-top: clamp(1.75rem" dist/_astro/*.css   # 0

# Las cifras salen del hero y entran en DOS páginas
grep -c "hero__kpis" dist/index.html                    # 0
grep -c 'class="cifras' dist/index.html                 # 4  — la banda + tres cifras
grep -c 'class="cifras' dist/soluciones/index.html      # 4
grep -c "volumen respaldado" dist/index.html            # 1
grep -c "volumen respaldado" dist/soluciones/index.html # 1
grep -c "volumen respaldado" dist/metodo/index.html     # 0 — sólo van en esas dos

# La foto sale del home y sigue en /nosotros
grep -c "home-hero-conferencia" dist/index.html    # 0
grep -c "home-hero-conferencia" dist/nosotros/index.html   # ≥1
grep -c "Talent Land · abril 2018" dist/index.html # 0 — el crédito se fue

# El titular nuevo
grep -c "Tu primer proceso corriendo" dist/index.html   # 1
grep -c "clase mundial" dist/index.html                 # 0

# La banda de autoridad se fue del home y en su hueco entran los stats
grep -c "banda-autoridad" dist/index.html          # 0
grep -c 'class="stats"' dist/index.html            # 1
grep -c "menos costo que humanos" dist/index.html  # 1
grep -c "más ingresos" dist/index.html             # 1
grep -c "12&#215;\|12×" dist/index.html             # 1  — el signo de multiplicar, no una equis
grep -c "Hablando de IA en público desde 2017" dist/index.html      # 0
grep -c "Hablando de IA en público desde 2017" dist/nosotros/index.html  # 1

# El nav, en las cinco páginas y en el pie
grep -c "Aprender" dist/index.html                 # 2  — menú + pie
grep -c ">Ilhas Finanzas<" dist/index.html         # 0
grep -c "Ilhas Finanzas" dist/finanzas/index.html  # ≥1 — el producto NO se renombra

# og:image, en las cinco
for p in index metodo/index finanzas/index soluciones/index nosotros/index; do
  echo -n "$p: "; grep -c 'og:image" content="https://' dist/$p.html
done                                                # 1 en cada una
grep -c "summary_large_image" dist/index.html      # 1
grep -c 'name="twitter:card" content="summary"' dist/index.html   # 0

# El og:url sigue siendo por página — esto es lo que NO se rompe
grep -o 'og:url" content="[^"]*"' dist/finanzas/index.html   # .../finanzas
```

### Con el navegador

- [ ] **El loop arranca solo, sin sonido, y da la vuelta.** Si se queda
      congelado a los 8 s, falta `loop`.
- [ ] **El cuadro se ve ENTERO en todo el loop.** Nada recortado por ningún
      lado: al segundo 1 tienen que verse los planos en la ventana de la
      izquierda, y al 9 el bloque verde del ahorro.
- [ ] **La barra de KINZAL se lee** — el logotipo y «Generador de
      Cotizaciones». Si no se lee, el cuadro quedó demasiado chico.
- [ ] **El titular rompe en TRES líneas**, no en cuatro con «IA.» sola.
- [ ] **El hero ya no trae la fila de cifras**, y el cuadro del video **no se
      sale por abajo** de la sección. Si se sale, falta el grid del §1.4.
- [ ] **La banda de cifras se ve en el home Y en `/soluciones`**, arriba de
      las tarjetas, con sus dos reglas verticales y las reglas de arriba y
      abajo.
- [ ] **«+1,000 MDP» no se parte en dos renglones** en ningún ancho. Prueba
      en 800 px, que es donde pasa.
- [ ] Las tres cifras alinean su base. Si una baja, es el pie que rompió en
      más líneas que las otras.
- [ ] **No queda franja clara entre los números y la banda Hilas.** Del negro
      de la barra al blanco de la banda, directo.
- [ ] **Solo hay UNA imagen o video en el hero.** Si ves el video y debajo el
      póster, es el bug de especificidad del §1.4.
- [ ] Con **movimiento reducido activado** (DevTools → Rendering →
      `prefers-reduced-motion: reduce`) el video desaparece y queda el póster
      con la cotización. No una pantalla negra.
- [ ] En 390 px el recorte se mantiene y no hay scroll horizontal.
- [ ] **Los tres números de la barra corren el mismo degradado**, de cian a
      morado, los tres. Si «12×» sale casi todo cian y «6-12%» sí llega al
      morado, falta el `inline-block` del §4.2.
- [ ] **Los tres pies de la barra van en una sola línea** cada uno.
- [ ] La barra de stats **se ve pegada al hero**, sin franja ni salto entre
      los dos bloques oscuros.
- [ ] El menú dice **Aprender** en las cinco páginas y en el pie.
- [ ] 1440 × 900 y 390 × 844.

### Alturas — repórtalas

| | Antes | Referencia | Después |
|---|---|---|---|
| Hero del home · 1440 | | 579 px | |
| Hero del home · 390 | | 829 px | |
| Hero del home · 1024 | | 576 px | |
| Banda de cifras · 1440 | — | 184 px | |
| Banda de cifras · 390 | — | 307 px | |
| Barra de stats · 1440 | — | 223 px | |
| Barra de stats · 390 | — | 403 px | |
| Home completo · 1440 | | | |

El home completo tiene que quedar **más o menos igual**: sale la banda de
autoridad (~230 px) y entra la barra de stats (223 px). Si crece mucho, la
barra quedó con `section-y` o con margen contra el hero.

---

## Qué NO hacer

- No recortes el cuadro. La caja lleva la relación de aspecto del video y
  `object-fit: contain` a propósito: si le pones `cover`, se pierden los
  planos, que es lo que Jorge pidió que se viera.
- No lo achiques más de 58%. A 52% el panel de KINZAL deja de leerse y la
  demo no prueba nada.
- No le devuelvas el velo: apaga la captura y ya no protege nada.
- No agregues un `<source>` de webm.
- No pongas el medio antes del texto en el DOM: en móvil el video se sube
  arriba del titular.
- No dejes las cifras en el hero «y además» abajo. Se mudan, no se duplican.
- No pongas la banda de cifras debajo de las tarjetas.
- No copies el array de cifras en las dos páginas: sale de `src/data/cifras.ts`.
- No pongas las cifras en `/metodo` ni en `/finanzas`: sólo home y
  `/soluciones`.
- No borres `Stat.astro`.
- No borres `BandaAutoridad.astro`, solo su uso.
- No cambies el `alt` de `home-hero-conferencia`.
- No corrijas la errata de la pantalla sin mirar la foto.
- No fijes `og:url` ni `canonical`: ya son correctos por página.
- No renombres el producto Ilhas Finanzas — solo la etiqueta del menú.
- No toques el botón «Hablemos».
- No pongas `loading="lazy"` ni `preload="none"` en el hero: es el LCP.
- No edites el copy de la barra de stats. Es de Jorge y va literal.
- No le pongas asterisco, nota al pie ni fuente a los stats sin decírselo
  antes a Jorge: es decisión suya, no tuya.
- No iguales el tamaño de los stats con los KPI del hero.

---

## Al terminar, reporta

1. Archivos tocados.
2. `npm run build` y `npm run medios`.
3. Todos los greps.
4. Captura del hero **más la barra de stats** a 1440, en **tres momentos**:
   segundo 1 (los planos), segundo 5.5 (la cotización) y segundo 9 (el ahorro).
5. Captura del hero a 390.
6. Captura con `prefers-reduced-motion: reduce`.
7. La tabla de alturas.
8. **La errata de la pantalla en la foto de Talent Land**: qué dice de verdad.
9. Captura de la banda de cifras en el home **y** en `/soluciones`, 1440 y 390.
10. Si `variante="hero"` de `Stat.astro` quedó sin usarse en todo el sitio,
    dilo — no la borres.
11. El subtítulo del §2 sigue **pendiente de Jorge**. Dilo.
