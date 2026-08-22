# Auditoría visual — ilhas.ai

**Fecha:** 22 ago 2026 · **Build auditado:** `dist/` (commit actual de `revision-landing`)
**Cómo se hizo:** las 5 rutas renderizadas en Chromium a 1440×900 y 390×844, con medición programática de cajas, paddings, anchos y tipografías. Cada hallazgo de abajo está medido, no opinado. Donde digo "medido: X px", ese número salió del DOM.

**Cómo usar este documento:** cada hallazgo trae `Archivo → selector → qué hacer`. La Parte 1 son causas raíz (transversales, arreglan varias páginas de un jalón). La Parte 2 es sección por sección. La Parte 4 es el orden de ejecución. No arregles la Parte 2 antes que la Parte 1: la mitad de la Parte 2 se resuelve sola.

> Nada de lo que propongo aquí rompe las cinco reglas de `CLAUDE.md`: no invento testimoniales, no explico el webinar, no anuncio islas futuras, no sumo los números, no meto placeholders. Todo el contenido que propongo agregar **ya existe** en el repo o en los docs de marca.

---

## Veredicto en 60 segundos

El sitio no está mal diseñado. Está **sub-diseñado**: tiene el esqueleto correcto (tokens buenos, jerarquía correcta, copy con carnita) pero le faltan las decisiones de composición que separan "página de Astro bien hecha" de "sitio que se ve caro".

Lo que sientes tiene tres nombres técnicos:

1. **El espacio en blanco no es aire, es hueco.** En `/metodo`, **el 40% de la altura total de la página es padding vertical vacío** (2,400 px de padding en 5,969 px de secciones). Dos secciones seguidas con `.section-y` producen **240 px de nada** entre un párrafo y el siguiente. No lee como respiración, lee como que falta contenido.

2. **El texto brinca de carril.** En la misma página el borde izquierdo del contenido se alterna entre **x=198** y **x=394** sección tras sección, porque unas usan `.container` (1,140 px) y otras `.container.prose` (748 px). Eso es exactamente el "a veces muy ancho, a veces muy angosto". No es tu percepción: son 196 px de brinco, 8 veces, en `/metodo`.

3. **No hay contraste de superficie.** Todo el sitio alterna entre `#FFFFFF` y `#F8FAFF`. Son dos blancos separados por ~2% de luminosidad — a un metro de la pantalla es **una sola superficie plana de 6,000 px de largo**. Kinzal alterna claro → foto full-bleed → navy oscuro → azul saturado. Por eso se ve más chingón: tiene ritmo. Ilhas tiene `--ilhas-dark: #0E0E0F` en los tokens y **no lo usa como fondo de sección ni una sola vez**.

Súmale cuatro bugs reales (header roto, fotos decapitadas, tarjetas invisibles, bordes cuadrados) y ya está explicado el "no me termina de gustar".

**La buena noticia:** ninguno de los nueve problemas raíz es un rediseño. Son entre 15 y 30 líneas de CSS cada uno.

---

# PARTE 1 — Las 9 causas raíz

## R1 · El header translúcido está roto en Chrome (bug real, no gusto)

**Archivo:** `src/components/Nav.astro` L60-68

El header es `background: rgba(248,250,255,0.85)` + `backdrop-filter: blur(16px)`. En el CSS **compilado** (`dist/_astro/Base.CPd0Jf-I.css`) quedó así:

```css
.site-header[data-astro-cid-wpvy4v7s]{z-index:40;-webkit-backdrop-filter:blur(16px);border-bottom:1px solid var(--ilhas-gray);background:#f8faffd9;position:sticky;top:0}
```

El minificador del build se quedó **solo con la versión `-webkit-`** y tiró la propiedad estándar. Chrome moderno **no** honra `-webkit-backdrop-filter` (verificado en Chromium 141: `getComputedStyle(header).backdropFilter === "none"`). Resultado: el header es un velo plano al 85% **sin blur**, y todo el contenido se lee a través de él al hacer scroll. Se ve clarísimo en `/soluciones`: el H2 "El mismo método, apuntado a tu empresa" aparece encima del menú.

**Qué hacer** — no dependas del blur para la legibilidad:

```css
.site-header {
  background: rgba(248, 250, 255, 0.96);  /* era 0.85 */
  border-bottom: 1px solid var(--ilhas-gray);
}
/* El blur se vuelve mejora opcional, no requisito */
@supports (backdrop-filter: blur(1px)) {
  .site-header {
    background: rgba(248, 250, 255, 0.82);
    backdrop-filter: saturate(180%) blur(16px);
  }
}
```

`@supports` sobrevive a la minificación porque la condición fuerza al minificador a conservar la propiedad estándar.

**Extra (barato, se siente caro):** sombra que aparece al hacer scroll. Es la única excepción de JS de cliente que vale la pena en todo el sitio — 6 líneas:

```html
<script>
  const h = document.querySelector('.site-header');
  const io = new IntersectionObserver(([e]) => h.classList.toggle('is-scrolled', !e.isIntersecting));
  io.observe(document.querySelector('#top-sentinel'));
</script>
```
```css
.site-header.is-scrolled { box-shadow: 0 1px 24px rgba(15,23,42,.08); }
```

---

## R2 · Dos anchos de contenido peleándose (el brinco de 196 px)

**Archivos:** `src/styles/base.css` L143-148 + L200-206, y las 5 páginas.

Medido a 1440 px:

| Envoltorio | Ancho de caja | Borde izq. del texto |
|---|---|---|
| `.container` | 1,140 px | **x = 198** |
| `.container.prose` | 748 px (68ch) | **x = 394** |

Y así queda el borde izquierdo de los H2, en orden de scroll:

- `/metodo`: 394 → 394 → 394 → **198** → 394 → **198** → 394 → 394 → 394 → **329**
- `/soluciones`: 198 → **394** → 198 → **394**
- `/finanzas`: 198 → 198 → 198 → **394** → **394**
- `/` : 198 → 198 → **398** → 198 → **394**

Cada brinco es visible. El ojo se ancla al borde izquierdo y lo pierde 8 veces en `/metodo`.

**La causa concreta:** `.section-head` (que existe en `base.css` L275 y mantiene todo a 198) se usa **solo en `/` y `/soluciones`**. `/metodo`, `/finanzas` y `/nosotros` usan `.container.prose` como encabezado de sección, que arrastra el `max-width: 68ch` al bloque completo — kicker, H2 y párrafo.

**Qué hacer** — un solo carril. El contenedor manda el ancho; la *medida de lectura* la controla el párrafo, no el bloque:

```css
/* base.css — reemplaza .prose */
.prose > p,
.prose > .lead,
.prose > ul,
.prose > ol { max-width: var(--ilhas-measure); }
.prose { max-width: none; }        /* el bloque ya NO se angosta */
.prose h2, .prose h1 { max-width: 24ch; }   /* titular corto, a propósito */
```

Y en `/metodo`, `/finanzas`, `/nosotros`: cambia todos los `<div class="container prose reveal">` de encabezado por `<div class="container"><div class="section-head reveal">`. **Un solo borde izquierdo en x=198 en las cinco páginas, siempre.**

`p { max-width: 68ch }` global (base.css L123-125) puede quedarse: es el que garantiza que la línea no se pase de 68 caracteres aunque el contenedor sea de 1,140.

---

## R3 · El ritmo vertical: 240 px de nada entre secciones

**Archivo:** `src/styles/tokens.css` L79 + `base.css` L150-159.

`--ilhas-section-y: clamp(4rem, 9vw, 7.5rem)` = **120 px** a 1440. Como es `padding-block`, dos secciones seguidas suman **240 px**. Medido:

| Página | Secciones | Padding vertical total | % de la página |
|---|---|---|---|
| `/metodo` | 10 | **2,400 px** | **40%** |
| `/` | 6 | 800 px | 31% |
| `/soluciones` | 4 | 400 px | 19% |

Y encima el ritmo cambia a media página: en `/` las secciones 1-3 usan `.section-y-sm` (40 px) y las 4-6 usan `.section-y` (120 px). El scroll acelera y luego frena. Eso es literalmente el "no tiene secuencia".

**Qué hacer** — tres cosas:

**a) Baja el tope y hazlo colapsable.** El padding entre dos secciones debe ser *uno*, no dos:

```css
/* tokens.css */
--ilhas-section-y: clamp(3.5rem, 6vw, 5.5rem);   /* 88px máx, era 120 */

/* base.css */
.section-y { padding-block: var(--ilhas-section-y); }
/* Dos secciones del MISMO fondo no necesitan doble aire */
.section-y + .section-y { padding-top: 0; }
.bg-white + .bg-white  { padding-top: 0; }
```

**b) Mata `.section-y-sm` como default.** Hoy se usa en **11 de las 28 secciones del sitio** (2 en `/`, 3 en `/soluciones`, 5 en `/finanzas`, 1 en `/nosotros`, 0 en `/metodo`) y es lo que crea el ritmo esquizofrénico: `/finanzas` corre casi entera a 40 px y de pronto abre a 120 px justo en el CTA. Déjalo únicamente donde el comentario del código lo justifica (la bifurcación del home) y renómbralo `.section-y-tight` para que no se use por accidente.

**c) El aire va *dentro* del bloque, no entre bloques.** El error de composición es que las secciones tienen mucho colchón afuera y sus elementos internos están apretados (`.section-head { gap: 1.5rem }` y luego `margin-top: 1.75rem` a la reja). Invierte la proporción: menos entre secciones, más entre encabezado y contenido.

Solo con R3, `/metodo` pasa de 6,138 px a ~4,700 px **sin quitar una sola palabra**, y se siente el doble de densa.

---

## R4 · La jerarquía de H1 está invertida

Medido:

| Página | H1 | Debería ser |
|---|---|---|
| `/` (home) | **48 px** | el más grande del sitio |
| `/metodo` | **80 px** | ↓ |
| `/soluciones` | **80 px** | ↓ |
| `/finanzas` | **80 px** | ↓ |
| `/nosotros` | **80 px** | ↓ |

El home —la página que recibe el tráfico de redes— tiene el titular **más chico** del sitio. Las interiores usan `--ilhas-fs-display` (clamp 3rem→5rem) y el home lo pisa con un override local (`index.astro` L183-185: `clamp(2.125rem, 3.5vw, 3rem)`).

A 80 px, además, los titulares de `/soluciones` y `/finanzas` ocupan **6 y 4 líneas**. Un H1 de 6 líneas no es un titular, es un párrafo en negritas.

**Qué hacer:**

```css
/* tokens.css — dos escalones, no uno */
--ilhas-fs-display:    clamp(2.5rem, 5.2vw, 4.25rem);  /* 68px — HOME */
--ilhas-fs-display-sm: clamp(2.125rem, 3.6vw, 3rem);   /* 48px — interiores */
```

- `/` usa `--ilhas-fs-display` (borra el override de `index.astro` L183-185).
- `/metodo`, `/soluciones`, `/finanzas`, `/nosotros` usan `--ilhas-fs-display-sm`.
- Y pon `max-width: 16ch` a los H1 de hero: **ningún H1 debe pasar de 3 líneas en desktop**. Hoy `/soluciones` tiene 6.

**Mientras estás ahí — el gradiente.** `docs/marca/03-tipografia.md` (citado en `tokens.css` L91-93) dice: gradiente en **UNA palabra clave** del titular. Hoy:

- `/metodo`: "Nació construyendo producto." → **3 palabras, 2 líneas completas**
- `/soluciones`: "mueven la aguja" → 3 palabras que rompen a 2 líneas
- `/finanzas`: "te estás quedando atrás" → **4 palabras, 2.5 líneas**

A ese tamaño ya no lee como gradiente, lee como medio titular pintado de morado. Redúcelo a una o dos palabras y que quepa en **una sola línea**.

---

## R5 · La paleta no tiene contraste de superficie (esta es la grande)

`#FFFFFF` vs `#F8FAFF`. Diferencia de luminosidad: **~2%**. En pantalla, las 26 secciones del sitio son una sola superficie.

Compara con las referencias que mandaste:
- **Kinzal:** foto full-bleed con overlay oscuro → claro → **navy #1E2A6E con patrón de rejilla** → azul saturado → footer oscuro. Cinco superficies distintas.
- **MPF:** blanco → banner oscuro morado → gris claro → blanco → foto real.

**Qué hacer** — mete **una y solo una sección oscura por página**, con el token que ya tienes (`--ilhas-dark: #0E0E0F`). No hace falta inventar colores:

```css
/* base.css */
.bg-dark {
  background: var(--ilhas-dark);
  color: rgba(255,255,255,.72);
}
.bg-dark h2, .bg-dark h3, .bg-dark .stat { color: var(--ilhas-white); }
.bg-dark .kicker { color: var(--ilhas-grad-start); }   /* cian sobre oscuro: sí pasa AA */
.bg-dark .card { background: rgba(255,255,255,.04); border-color: rgba(255,255,255,.10); }
```

Dónde ponerla (una por página, la más "prueba"):

| Página | Sección que se va a oscuro |
|---|---|
| `/` | §05 "No es teoría. Es lo que ya construimos." (el linaje) |
| `/metodo` | §04 la tabla I·L·H·A·S |
| `/soluciones` | §03 "Casos" |
| `/finanzas` | §05 el CTA del webinar |
| `/nosotros` | el hero |

Esto solo, sin tocar nada más, cambia radicalmente la percepción de "sitio caro".

---

## R6 · Tarjetas fantasma: `--ilhas-light` sobre `--ilhas-light`

Hay tarjetas cuyo fondo es exactamente el mismo que el de su sección. Se ven como contornos vacíos, no como tarjetas:

| Archivo | Selector | Fondo tarjeta | Fondo sección | Resultado |
|---|---|---|---|---|
| `index.astro` L296-301 | `.linaje li` | `--ilhas-light` | `.section-y` = `--ilhas-light` | **invisible** |
| `finanzas.astro` L190-198 | `.puedes li` | `--ilhas-light` | `.bg-white` | apenas visible |
| `finanzas.astro` L261-266 | `.maestros__card` | `--ilhas-light` | `.bg-white` | apenas visible |
| `metodo.astro` L358-360 | `.principios__item:hover` | `--ilhas-light` | `.bg-white` | hover casi imperceptible |

Compara con `soluciones.astro` L144-150 (`.casos li`), que **sí** usa `--ilhas-white` + `--ilhas-shadow-soft` sobre fondo `--ilhas-light` y por eso se ve bien. Ese es el patrón correcto y no está aplicado consistentemente.

**Qué hacer** — una sola regla de tarjeta en `base.css`, y que las páginas la usen:

```css
.card {
  background: var(--ilhas-white);
  border: 1px solid var(--ilhas-gray);
  border-radius: var(--ilhas-radius-card);
  box-shadow: var(--ilhas-shadow-soft);
  padding: 1.5rem;
}
/* En secciones que ya son blancas, la tarjeta se invierte */
.bg-white .card { background: var(--ilhas-light); box-shadow: none; }
```

Regla de oro: **la tarjeta nunca comparte fondo con su sección.**

---

## R7 · La bifurcación: `border-image` rompe las esquinas redondeadas

**Archivo:** `src/components/Bifurcacion.astro` L130-134

```css
.bifurcacion--prominent .bifurcacion__card {
  border-top: 4px solid transparent;
  border-image: var(--ilhas-gradient-h) 1;
}
```

Dos bugs en tres líneas:

1. `border-image: … 1` aplica la imagen a **los cuatro bordes**, no solo al superior. Por eso las tarjetas del home tienen el borde izquierdo cian y el derecho magenta. La intención era una barra arriba.
2. `border-image` **desactiva el `border-radius`**. Verificado: el `border-radius: 20px` está en el computed style pero las esquinas se pintan **cuadradas**. Son las dos únicas tarjetas cuadradas de todo el sitio, y están en el bloque que tu propio doc llama "el más importante del sitio".

**Qué hacer:**

```css
.bifurcacion--prominent .bifurcacion__card {
  position: relative;
  overflow: hidden;               /* recorta la barra al radius */
  border: 1px solid var(--ilhas-gray);
  border-radius: var(--ilhas-radius-card);
}
.bifurcacion--prominent .bifurcacion__card::before {
  content: "";
  position: absolute; inset: 0 0 auto 0;
  height: 4px;
  background: var(--ilhas-gradient-h);
}
```

---

## R8 · Las fotos de `/nosotros` salen decapitadas — y es culpa del build, no del CSS

**Archivos:** `src/components/TarjetaPersona.astro` L37-43 y L78-83

Los originales son recortes de cuerpo completo, muy verticales:

| Archivo | Tamaño real | Ratio |
|---|---|---|
| `jorge-papa.png` | 1576 × 2600 | 0.61 |
| `jorge-hijo.png` | 1291 × 2600 | 0.50 |

El componente pide `<Image width={480} height={640} />` = ratio 0.75. Astro (sharp) hace un **cover crop centrado** en build time:

- `jorge-papa`: recorta 499 px de alto → ~250 px arriba → **corona de la cabeza cortada**.
- `jorge-hijo`: recorta 879 px de alto → ~440 px arriba → **la cara entera desaparece**. En `/nosotros` hoy se ve una camisa azul sin cabeza. En móvil, un torso.

El `object-position: top` del CSS (L82) **no puede arreglarlo**: llega tarde, el .webp generado ya viene recortado a 480×640.

**Qué hacer** — deja que el crop lo haga el CSS, no el build:

```astro
<!-- TarjetaPersona.astro: quita height, deja que conserve el ratio original -->
<Image src={foto} alt={fotoAlt ?? nombre} width={640} class="tarjeta-persona__foto" />
```
```css
.tarjeta-persona__foto {
  width: 100%;
  aspect-ratio: 4 / 5;          /* menos vertical que 3/4: mejor para retrato */
  object-fit: cover;
  object-position: 50% 8%;      /* ancla en la cabeza, no al centro */
  background: var(--ilhas-light);   /* los PNG son transparentes */
}
```

Ajusta `8%` a ojo por persona si hace falta (los dos encuadres de origen son distintos).

**Nota de marketing, no de CSS:** son recortes de cuerpo completo sobre fondo transparente. Para una sección de "quiénes somos" de nivel MPF necesitas **retrato de medio cuerpo, cabeza y hombros**, no figura completa. Los assets actuales dan para eso si los recortas arriba. Si no, un retrato cuadrado grande (`1/1`, `object-position: top`) siempre se ve mejor que un cuerpo entero encogido.

---

## R9 · Los heroes no tienen botones ni prueba

Ninguno de los 5 heroes tiene un `.btn`:

| Página | CTA del hero | Problema |
|---|---|---|
| `/` | 2 links de texto morado a 14 px | **no parecen botones** |
| `/metodo` | ninguno | ok (es la página madre) |
| `/soluciones` | **ninguno** | la página que califica consultoría, sin CTA |
| `/finanzas` | **ninguno** | la página cuyo único trabajo es mandar al webinar |
| `/nosotros` | ninguno | ok |

En `/finanzas` el botón "Reservar mi lugar" aparece hasta **2,000 px de scroll**. La regla de tu propio `CLAUDE.md` es *"la carnita arriba"* y *"un solo botón"* — pero el botón está enterrado.

Compara con Kinzal: hero con **dos botones reales** (primario relleno + secundario delineado) y un riel de tres estadísticas (15+ / 10+ / 100%) a la derecha, arriba del pliegue.

**Qué hacer:**

**a)** Falta un `.btn-ghost` en el sistema. Agrégalo a `base.css`:

```css
.btn-ghost {
  background: transparent;
  color: var(--ilhas-dark);
  border: 1px solid var(--ilhas-gray);
}
.btn-ghost:hover { border-color: var(--ilhas-primary); color: var(--ilhas-primary); }
```

**b)** Sube los CTAs. `/` → `.btn-primary` "Quiero aprenderlo" + `.btn-ghost` "Quiero implementarlo" (hoy son `<a>` pelones, `index.astro` L66-69). `/finanzas` → `.btn-primary` al webinar en el hero. `/soluciones` → `.btn-primary` "Agendar un diagnóstico" en el hero.

**c)** Riel de datos en el hero del home. Con los números que **ya tienes y ya están atribuidos** (regla 4 de `CLAUDE.md` respetada: no se suman, se listan):

```
6 productos financieros construidos de cero a uno
+1,000 MDP/mes procesados por productos que Jorge ha liderado
+2,000 empresas asesoradas en LATAM
```

Eso es prueba dura arriba del pliegue, sin inventar nada.

---

# PARTE 2 — Sección por sección

## `/` — Home
*Trabajo de la página (CLAUDE.md): que quien cae de un reel entienda Ilhas en 8 segundos y entre a su carril.*
*Altura actual: 2,727 px. Objetivo: ~2,400 px con el doble de sustancia.*

### §01 Hero
**Archivo:** `index.astro` L52-75

- **El hero mide 380 px de alto.** `padding-block` medido: **0 arriba, 0 abajo** (`.hero-split` aporta 40 px). Bajo un header de 74 px, el hero ocupa el 42% de la pantalla y luego corta en seco con una línea horizontal dura a los 455 px. Un hero de home debería ocupar 70-85 vh. → Dale `padding-block: clamp(4rem, 8vw, 7rem)` a `.hero-split`.
- **El `.hero__glow` se ve como un rectángulo lavanda, no como un glow.** `index.astro` L161-172: un círculo de 32 rem con `blur(90px)` dentro de un `.hero` de 380 px con `overflow: hidden`. Se recorta en los cuatro lados → mancha rectangular con borde recto abajo. → O el hero crece a ~600 px y el glow queda contenido, o mueve el glow a `top: -60%` y bájale a `opacity: .12`.
- **Los CTAs no son botones** (L66-69, `.hero__ctas a` a 14 px sin fondo). → R9.
- **La ilustración (dashboard 380 px) está desconectada.** Flota a la derecha, centrada verticalmente contra un H1 de 4 líneas, y **se oculta por completo en móvil** (`base.css` L308-311, `display: none` bajo 900 px). Es decir: el 60% de tu tráfico (redes) no ve ninguna imagen en el hero. → O la haces responsiva y significativa, o la cambias por el riel de datos de R9, que funciona en las dos pantallas.
- **Falta la promesa de qué gana el visitante.** El H1 dice qué es Ilhas; el lead dice cómo se entrega. Nada dice qué se lleva la persona. Un tercer renglón de 8 palabras arriba del pliegue.

### §02 "El hueco"
**Archivo:** `index.astro` L77-85

- **Es un H2 solo, sin cuerpo.** Medido: 164 px de alto, de los cuales 80 son padding → **84 px de contenido**. Una sección de una línea.
- **Y el titular está duplicado literal** con `/metodo` §02 (`metodo.astro` L89), donde sí trae párrafo explicativo. Repetir el titular más fuerte del sitio en su versión más débil lo desgasta.
- → **Dos salidas.** (a) Fusiónala con §03: el hueco es el setup del método, no una sección aparte. (b) O dale la carnita: el dato del 95% pide una cifra de contraste al lado. Ahora mismo es un titular al aire.

### §03 "Cinco pasos: I·L·H·A·S"
**Archivo:** `index.astro` L87-111

- La tira de 5 columnas **se ve como un índice, no como una sección**. Cinco textos de largo desigual (Identificar = 1 línea, Hilar = 3) con los fondos rasgados abajo. Sin fondo, sin tarjeta, sin ícono.
- Las bolitas I·L·H·A·S de 28 px son el único elemento gráfico y quedan sueltas.
- → Convierte cada paso en `.card` (R6) con la letra grande arriba (`--ilhas-fs-stat`), el nombre y la línea. Cinco tarjetas iguales, con `align-content: start` para que el texto no se estire. O, si quieres que se vea de verdad como un método: **una línea de conexión horizontal** entre las cinco bolitas (`::before` con 1 px de `--ilhas-gray`). Un método se dibuja como secuencia, no como lista.

### §04 La bifurcación
**Archivo:** `index.astro` L113-121 + `Bifurcacion.astro`

- Esquinas cuadradas y bordes de colores en los 4 lados → **R7**.
- **Las tarjetas tienen hueco muerto adentro.** `.bifurcacion__link` usa `margin-top: auto`, así que en la tarjeta corta ("Soluciones", 1 línea de desc) quedan ~40 px de nada entre la descripción y el link. Contenido asimétrico en tarjetas gemelas.
- **Falta la carnita.** Cada tarjeta tiene label + título + una línea + link. En el bloque que tu doc llama el más importante del sitio, eso son 14 palabras por carril. → Mete **3 bullets por tarjeta** con lo que ya está documentado (a quién es, qué se lleva, en qué formato). Eso equilibra las alturas *y* califica al visitante antes de que haga clic.
- Después de las tarjetas hay **120 px de padding + 120 px de la siguiente sección = 240 px de vacío** antes de "DE DÓNDE SALE EL MÉTODO" → **R3**.

### §05 El linaje
**Archivo:** `index.astro` L123-142

- **Las 6 tarjetas son invisibles** (fondo `--ilhas-light` sobre sección `--ilhas-light`) → **R6**. Es el bloque de prueba dura del home y es el que peor se ve.
- Alturas desiguales: "Nomada" (2 líneas) contra "Stampay" (3) deja ~30 px de aire abajo en la mitad de las tarjetas.
- **Falta el remate.** Seis nombres de producto sin contexto de escala. Cierra la sección con una línea de datos (R9) o con un link a `/soluciones`. Hoy la sección termina y cae al vacío.
- → **Candidata número uno para el fondo oscuro (R5).** Seis tarjetas de producto sobre `#0E0E0F` con el nombre en blanco: ese es el bloque que hace que el sitio se vea caro.

### §06 Cierre
**Archivo:** `index.astro` L144-151

- H2 + una línea + botón, centrado en 652 px. Correcto pero anémico: es el tercer CTA de la página que dice esencialmente lo mismo que §04.
- → O lo matas (§04 ya bifurca) o lo conviertes en el cierre de marca de verdad: una franja con `--ilhas-gradient` a todo lo ancho, texto blanco y el botón. `tokens.css` L91 autoriza el gradiente exactamente para eso: *"el CTA de cierre"*. Hoy el gradiente solo aparece en 2 px del footer.

### Footer (todas las páginas)
**Archivo:** `Footer.astro`

- Es **una sola fila de 95 px**: logo, copyright, 4 links. Los sitios que se ven serios tienen footer de 3-4 columnas.
- No hay contacto, ni correo, ni redes, ni LinkedIn. `hola@ilhas.ai` existe (se usa en `soluciones.astro` L42) y no aparece en el footer.
- → Footer de 3 columnas: marca + una línea de posicionamiento / navegación / contacto. Y **fondo `--ilhas-dark`** — es el cierre natural del sitio y cuesta 4 líneas de CSS.

---

## `/metodo` — La página madre
*Altura actual: 6,138 px, de los cuales **2,400 px (40%) son padding vacío**.*

### El problema estructural de esta página
**9 de sus 10 secciones tienen la misma forma exacta:** kicker → H2 → un párrafo. Sin tarjetas, sin imagen, sin dato, sin cita, sin diagrama. Es un ensayo maquetado, no una página. Y el copy es bueno — ese es el desperdicio.

Además, 8 de 10 usan `.container.prose` (652 px) y 2 usan `.container` (1,044 px), lo que produce el brinco de R2 **ocho veces**.

### §01 Hero — L69-83
- H1 a **80 px**, con "Nació construyendo producto." en morado ocupando **2 líneas completas**. Es el elemento más pesado del sitio y está en una página interior → **R4**.
- Sin CTA, sin visual. 810 px de alto para 3 bloques de texto.

### §02 "El hueco" — L85-97 · §03 "El ángulo correcto" — L99-112
- Idénticas en forma: 456 px y 514 px de los cuales 240 son padding. **Más padding que contenido.**
- → Fusiónalas. Son el mismo argumento en dos actos y juntas hacen una sección con peso.

### §04 La tabla I·L·H·A·S — L114-152
- **Es el mejor bloque de la página** y está enterrado en el 40% del scroll.
- **Tres alineaciones en una pantalla:** el kicker y el H2 van centrados (`#pasos .prose { text-align: center }`, L267-270), el lead centrado, y la tabla alineada a la izquierda en x=198. Ese salto es de los más feos del sitio.
- La tabla es funcional pero seca: `<thead>` gris, filas separadas por línea. Sin jerarquía visual entre "el oficio de producto" y "en tu trabajo", que es justo el argumento.
- → (a) Alinea todo a la izquierda como el resto. (b) **Súbela**: debería ser §02, no §04 — es la prueba del método. (c) Dale la columna "En tu trabajo" con fondo `--ilhas-primary-10`: es la columna que le importa al visitante. (d) Candidata al fondo oscuro (R5).

### §05 "Hilar: el paso joya" — L154-167
- Es un párrafo suelto. El "paso joya" del método merece tratamiento de destaque: card, cita, o diagrama del Opportunity Solution Tree.
- → Como mínimo: `.card` grande con borde izquierdo `4px solid var(--ilhas-primary)`.

### §06 Los cinco principios — L169-191
- **Reja de 2 columnas con 5 elementos** → el quinto queda huérfano y deja un **hueco de ~400 × 150 px** abajo a la derecha. Se ve como un error de maquetación, y lo es.
- El bloque de texto empieza en x=252 mientras el kicker está en x=198. Sangría inconsistente dentro de la misma sección.
- → `grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr))` para que 5 se acomoden en una tira, o 3+2 centrado. Y `.principios__item` a `.card` para que el hover (`--ilhas-light`, hoy invisible sobre blanco) se note.

### §07 / §08 / §09 — L193-237
- Tres secciones más de kicker + H2 + párrafo, con 240 px entre cada una.
- §09 "El método es el barco. Finanzas es la primera isla." es la sección de **marca** de todo el negocio y es un párrafo de 4 líneas en gris a 652 px de ancho. Merece ser el momento visual de la página (fondo oscuro, gradiente, el isotipo grande).

### §10 Bifurcación — L239-247
- Aquí sí trae `lead`, aquí sí las esquinas están redondeadas (no lleva `prominent`) — **y se ve mejor que la del home**. Ese contraste es el argumento definitivo de R7.

**Resumen de `/metodo`:** de 10 secciones deberían quedar **6**, con la tabla arriba, dos fusiones, y tres de las secciones de puro texto convertidas en algo visual. La página baja a ~4,200 px y gana densidad.

---

## `/soluciones`
*Trabajo de la página: calificar para consultoría. Altura: 2,116 px — la más corta del sitio.*

### §01 Hero — L50-68
- **H1 de 80 px en 6 líneas.** Es el peor titular del sitio: ocupa 504 px de alto y empuja todo abajo del pliegue. → R4 + `max-width: 16ch`.
- **El lead está pegado al H1, sin margen.** `index.astro` L187-189 define `.hero .lead { margin-top: 1rem }` pero está *scopeado a `.hero`*, y esta página usa `.hero-split` **sin** la clase `.hero`. Mismo bug en `/finanzas`. → Mueve la regla a `base.css`: `.hero-split .lead { margin-top: 1rem }`.
- **Sin CTA** → R9. Es la página que califica consultoría.
- La ilustración de 280 px flota centrada contra un H1 de 504 px → queda **184 px de aire muerto** debajo de ella (medido). → `align-items: start` en `.hero-split` a partir de 900 px, o que la ilustración crezca.

### §02 "Cómo trabajamos" — L70-84
- `.container.prose` → borde izquierdo salta a x=394 mientras el hero de arriba está en x=198 → **R2**, y aquí se ve especialmente mal porque son secciones consecutivas.
- **Kicker, H2 y párrafo están pegados entre sí.** El reset pone `margin: 0` a todo, y `soluciones.astro` nunca define los `margin-top` que `metodo.astro` sí trae (L252-261: `0.75rem` al H2, `1.25rem` al párrafo). El párrafo arranca sobre la línea base del titular. Es un bloque sin respiración interna dentro de una página que sobra espacio por fuera — la inversión exacta de lo que describe R3c.
- 3 líneas de texto para explicar cómo trabajan. Es la sección que debería vender el método aplicado a empresa y es la más corta.

### §03 Casos — L86-105
- **Aquí las tarjetas sí están bien hechas** (`--ilhas-white` + sombra sobre fondo light). Este es el patrón que debe copiarse a todo el sitio (R6).
- Faltan los nombres reales de empresa. Entiendo la regla de cero placeholders — pero si Stampay, Nomcont, Paystand son productos reales, el logo o al menos la categoría de industria daría un salto de credibilidad. Sin inventar nada.
- → Candidata al fondo oscuro (R5).

### §04 CTA de diagnóstico — L107-119
- Centrado a 652 px, con `mailto:`. Funciona.
- **Un `mailto:` en el CTA principal de consultoría es fricción alta.** Abre un cliente de correo con asunto prellenado y ahí muere el 60% de los intentos. → Aunque no haya agendador propio todavía, un formulario estático de 3 campos (o un link a un Calendly/GHL, que ya usas para eventos) convierte varias veces más.

---

## `/finanzas`
*Trabajo de la página: mandar al webinar. Un solo botón. Altura: 2,795 px.*

### §01 Hero — L62-80
- Mismo patrón que `/soluciones`: H1 de 80 px, gradiente en 4 palabras a 2.5 líneas, lead pegado sin margen, ilustración de 280 px flotando con **116 px de aire muerto** abajo, **y ningún botón**.
- **Esto es lo más caro del sitio en dinero:** el único trabajo de esta página es mandar al webinar, y el botón está a 2,000 px de scroll. → `.btn-primary` "Reservar mi lugar" en el hero, sin discusión.

### §02 "Esto es lo que vas a poder hacer" — L82-90
- **Arranca sin kicker**, a diferencia de casi todas las demás secciones del sitio. El H2 aparece en seco y el bloque pierde el nivel de entrada. (Pasa igual en §03 y §06 de esta misma página: `/finanzas` es la página con la jerarquía de encabezados más inconsistente del sitio.)
- Las 8 tarjetas son casi invisibles (`--ilhas-light` sobre `.bg-white`) → R6.
- **Alturas desiguales feas:** la reja de 4 columnas estira todas las tarjetas al alto de la más larga ("Análisis de estados financieros con razones", 3 líneas), dejando "Flujo de efectivo" con **2 líneas de vacío**. Se ve como una tabla rota.
- → Tarjetas más compactas (`padding: .875rem 1rem`), texto en una o dos líneas, `align-items: start`, y un ícono chico. Tienes 8 íconos 3D en `public/assets/ilhas-iconografia/` que hoy **no se usan en ninguna página**.

### §03 "Es para ti si… / No es para ti si…" — L92-110
- **La sección está flotando en medio de la página.** `.filtro` tiene `max-width: var(--ilhas-measure)` + `margin-inline: auto` (L213-218) → el bloque queda en x=345, ni alineado al contenedor ni centrado en la pantalla. Se ve como si se hubiera caído.
- Sin kicker, sin H2 — usa dos `<h3>` de 20 px como encabezados de sección. Jerarquía rota.
- **Es un bloque de calificación excelente en copy y el peor presentado.** → Dale kicker + H2 ("¿Es para ti?"), llévalo a ancho completo del contenedor, y hazlo **dos tarjetas contrastadas** (la de "sí" con acento morado, la de "no" en gris). Ese contraste visual hace el trabajo de calificación solo.

### §04 "Quién lo enseña" — L112-142
- **Las tarjetas de los dos Jorges no tienen foto**, mientras `/nosotros` sí las tiene. En la página que vende, donde la autoridad importa más, no hay caras. → Reusa `TarjetaPersona` (arreglado con R8). Las fotos ya están en el repo.
- Tarjetas casi invisibles → R6.
- **El párrafo resumen (L137-140) queda huérfano** debajo de la reja, alineado a la izquierda, sin relación visual con las tarjetas. Es el "40 + 12" — la única página donde la regla lo permite — y está tirado ahí. → Súbelo como lead debajo del H2, o conviértelo en una franja destacada.

### §05 CTA del webinar — L144-160
- **Este es el bloque que produce el dinero de esta página y es el más débil del sitio.** H2 a 36 px, dos líneas de texto y un botón, centrado en 652 px, sobre fondo `--ilhas-light`. Ocupa 416 px de los cuales **240 son padding**.
- Respetando la regla 1 de `CLAUDE.md` (el sitio no explica el webinar), todavía puedes darle peso **sin decir nada nuevo**: fondo oscuro o gradiente a todo lo ancho, H2 más grande, el nombre del webinar en display en vez de en cursiva dentro del párrafo, y el botón más grande (`padding: 1rem 2rem`).
- → El único bloque de todo el sitio que justifica ancho completo y color de marca. Hoy es el que menos destaca.

### §06 FAQ — L162-177
- `.container.prose` → x=394. Salta respecto a §05 (centrado) y §04 (x=198). → R2.
- Sin kicker. Y **es la única sección con interacción real del sitio** (`<details>`) — eso está bien.
- El `+` del summary usa `float: right`, que en preguntas de 2 líneas queda alineado a la primera línea en vez de centrado verticalmente. Cámbialo a `display: flex; justify-content: space-between` en el summary.
- **Las 4 preguntas son buenísimas** (confidencialidad, licencias, cuál IA, formatos). Da para 6-8. Es contenido que ya existe en tu cabeza y es exactamente el "se ve lleno de buen contenido" que quieres.

---

## `/nosotros`
*Altura: 1,645 px. La página más corta y la que más rápido se puede arreglar.*

### §01 Hero — L42-51
- `.container.prose` → x=394, H1 a 80 px, lead pegado. → R2 + R4.
- 334 px de alto para 3 líneas de texto sobre fondo plano.
- → Candidata a fondo oscuro (R5): un hero oscuro con las dos fotos ya lo resuelve visualmente.

### §02 Las dos tarjetas — L53-69
- **Las fotos salen decapitadas** → R8. Es el problema visual más grave del sitio: en la página de "quiénes somos", uno de los dos no tiene cara.
- **Las dos tarjetas dicen "Jorge Sierra"** sin diferenciador visible más que el rol en morado. Entiendo la decisión de `docs/02-paginas.md` (no leerse como dúo), pero al ojo lee como un error de copiar y pegar. → El rol tiene que pesar más: súbelo a `1rem`, ponlo como chip con fondo `--ilhas-primary-10`, o pon el rol arriba del nombre.
- En móvil, la lista de atribuciones rompe con sangría colgante fea ("asesorando empresas en / LATAM" indentado). → `flex-wrap: wrap` con `gap: .25rem` o pasarlo a `display: block` bajo 480 px.
- **La página tiene dos secciones y se acaba.** Falta una tercera: de dónde salió Ilhas, por qué padre e hijo, qué los junta. Es la página de confianza del sitio y hoy son dos tarjetas.

---

## Móvil (390 px) — transversal

- **No hay menú hamburguesa.** `Nav.astro` L128-147 hace que los 4 links bajen a su propia fila. Resultado medido: **header de 171 px de alto** (contra 74 en desktop) — el 20% de la pantalla del iPhone se lo come el menú, en todas las páginas, siempre pegado arriba. → Hamburguesa con `<details>` (cero JS, consistente con la regla del stack).
- **H1 a 48 px en 390 px de ancho:** `/soluciones` ocupa **7 líneas**, más de una pantalla completa solo el titular. → Baja el mínimo del clamp a `2.25rem` (36 px).
- **La ilustración del hero desaparece en móvil** (`base.css` L308-311). Desde redes, el primer scroll es 100% texto. → Muéstrala más chica (160-200 px) arriba del H1, o cámbiala por el riel de datos.
- Los `gutters` de 20 px a 390 px están bien; el problema es solo la tipografía.

---

# PARTE 3 — Lo que falta para que se vea "lleno" (sin romper ninguna regla del repo)

Tu instinto de "mispropiasfinanzas se ve más llena de buen contenido y no parece inventada" es correcto y **no es cuestión de escribir más copy**. Es que ahí cada sección entrega **algo además de texto**. Inventario de lo que Ilhas ya tiene y no usa:

| Activo | Dónde vive | Uso actual (verificado con grep) |
|---|---|---|
| Íconos 3D en `src/assets/icons/` | 6 archivos | **3 usados** (dashboard, ia-camino, reloj), y solo como adorno flotante en heroes. `analisis`, `calendario`, `calendario-reloj`: 0 referencias |
| Librería completa `public/assets/ilhas-iconografia/` | 8 familias de íconos + sellos + logos | **0 referencias desde `src/`.** El sitio no toca ni un archivo de esa carpeta |
| `full-timeline.png` | `public/assets/ilhas-iconografia/` | **0 referencias** — es un diagrama de proceso, justo lo que le falta a `/metodo` |
| `end-card-ilhas jorge y jorge.png` | `public/assets/ilhas-iconografia/` | **0 referencias** — es la imagen de los dos juntos |
| `sello-generico.png` | `public/assets/ilhas-iconografia/` | **0 referencias** |
| Fotos de los dos Jorges | `src/assets/equipo/` | usadas solo en `/nosotros`, y recortadas mal |
| `.section-head--split` | `base.css` L282-292 | **definido y nunca usado** — es exactamente el patrón kicker+H2 izquierda / lead derecha que usa Kinzal |
| `.blob` | `base.css` L365-379 | **definido y nunca usado** |
| `--ilhas-dark` como fondo | `tokens.css` L14 | **nunca usado como fondo de sección** |
| `--ilhas-gradient` (el vertical, el del logo) | `tokens.css` L27 | solo en `.blob` (sin usar) y en el avatar de respaldo de `TarjetaPersona` (nunca visible, porque siempre hay foto). **En la práctica: no se ve en ninguna parte del sitio** |
| `--ilhas-gradient-h` | `tokens.css` L35 | 2 px del footer + el borde roto de la bifurcación (R7) |
| `--ilhas-fs-stat` | `tokens.css` L68 | **nunca usado** — el token de métricas grandes, y no hay una sola métrica grande en el sitio |

**Traducción:** el sistema de diseño ya trae las piezas para que el sitio se vea denso y caro. Las páginas usan como el 40% de él.

Y las tres cosas que Kinzal/MPF tienen y Ilhas no, en orden de impacto:

1. **Números grandes.** Kinzal pone 15+ / 10+ / 100% arriba del pliegue. Ilhas tiene 40 años, +2,000 empresas, +1,000 MDP/mes, 6 productos — y los entierra en texto corrido de 15 px. Con `--ilhas-fs-stat` (48 px) esos números cambian la percepción del sitio completo.
2. **Caras reales.** MPF pone una foto de comunidad de 40 personas en la sección 2. Ilhas tiene dos fotos y las recorta mal.
3. **Superficies distintas.** Ya cubierto en R5.

---

# PARTE 4 — Orden de ejecución

### P0 — Bugs (medio día, y el sitio deja de verse roto)
1. **R1** header translúcido → `Nav.astro`
2. **R8** fotos decapitadas → `TarjetaPersona.astro`
3. **R7** bordes de la bifurcación → `Bifurcacion.astro`
4. **R6** tarjetas fantasma → `index.astro`, `finanzas.astro`
5. Lead pegado al H1 en `/soluciones` y `/finanzas` → mover `.hero .lead` a `base.css`

### P1 — Composición (un día, y aquí se va el 70% de lo que no te gusta)
6. **R2** un solo carril de contenido → `base.css` + las 5 páginas
7. **R3** ritmo vertical → `tokens.css` + `base.css`
8. **R4** jerarquía de H1 y gradiente de una palabra → `tokens.css` + páginas
9. **R9** botones y riel de datos en los heroes

### P2 — Se ve caro (un día)
10. **R5** una sección oscura por página
11. Footer de 3 columnas con fondo oscuro
12. CTA del webinar a ancho completo con color de marca
13. Menú hamburguesa en móvil
14. Sacar del cajón lo de la Parte 3: `full-timeline`, los íconos, `.section-head--split`, `--ilhas-fs-stat`

### P3 — Contenido (cuando quieras)
15. Fusionar secciones de `/metodo` (de 10 a 6) y subir la tabla
16. Bullets en las tarjetas de la bifurcación
17. FAQ de 4 a 8 preguntas
18. Tercera sección en `/nosotros`
19. Cambiar el `mailto:` de `/soluciones` por algo con menos fricción

---

# PARTE 5 — Checklist de verificación

Después de cada tanda, corre esto. Son comprobaciones binarias, no de gusto:

- [ ] Todos los H2 de una misma página arrancan en **el mismo x**. (Consola: `[...document.querySelectorAll('h2')].map(h=>h.getBoundingClientRect().left)` → un solo valor.)
- [ ] Ningún par de secciones consecutivas suma más de **~120 px** de padding vertical.
- [ ] El H1 del home es el más grande del sitio, y ningún H1 pasa de **3 líneas** en desktop ni de **4** en móvil.
- [ ] Ninguna tarjeta tiene el mismo `background-color` que su sección padre.
- [ ] `getComputedStyle(document.querySelector('.site-header')).backdropFilter !== 'none'` **o** el alpha del fondo es ≥ 0.95.
- [ ] En `/nosotros`, las dos personas tienen **cabeza completa** en desktop y en móvil.
- [ ] Cada página tiene **exactamente una** superficie que no es blanco/casi-blanco.
- [ ] Cada página tiene un `.btn` **arriba del pliegue** (excepto `/metodo` y `/nosotros`).
- [ ] El gradiente de cada H1 cabe en **una sola línea**.
- [ ] `npm run build` sin warnings y las 5 rutas revisadas a 390, 768 y 1440 px.
