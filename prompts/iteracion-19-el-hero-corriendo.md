# Iteración 19 — El hero se pone a correr

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 31 ago 2026.

> Rama: **`hero-corriendo`**, salida de donde quedó la 18.
>
> **Referencia: `medios/hero-referencia.html`.** Ya está construida y medida
> (620 px en escritorio, 893 px en móvil). El CSS de esa referencia es el que
> va: cópialo, no lo reinventes.

Son cinco cambios, cuatro de ellos de los que Jorge levantó en su análisis. El
quinto punto de ese análisis —el `alt` de la foto del hero— **no se hace**, y
abajo está por qué.

---

## 1 · El hero del home: el loop en vez de la foto

`src/pages/index.astro:87-136`

### 1.1 · La ranura cambia de medio, no de estructura

El hero sigue siendo lo que ya es: una capa con el medio sangrando desde la
derecha, máscara de disolución y velo de contraste encima. **No lo conviertas
en dos columnas.** Se probó y se descartó (ver §1.4).

Lo que cambia es qué va en la ranura:

```
- home-hero-conferencia   (foto, Talent Land abr 2018)
+ home-hero-loop          (video, el proceso corriendo)
```

Los tres archivos ya están en el repo desde la iteración anterior:
`public/assets/video/home-hero-loop.{mp4,webm,jpg}`.

### 1.2 · El marcado

```jsx
{mostrar("home-hero-loop") && (
  <div class="hero__medio" aria-hidden="true">
    <video
      poster="/assets/video/home-hero-loop.jpg"
      autoplay muted loop playsinline preload="metadata"
      width="1600" height="754">
      <source src="/assets/video/home-hero-loop.webm" type="video/webm" />
      <source src="/assets/video/home-hero-loop.mp4" type="video/mp4" />
    </video>
    <img class="hero__poster" src="/assets/video/home-hero-loop.jpg"
         alt="" width="1600" height="754" />
  </div>
)}
```

⚠️ **Los cuatro atributos del `<video>` son obligatorios y ninguno sobra.**
`muted` sin `autoplay` no arranca; `autoplay` sin `muted` lo bloquea el
navegador; sin `playsinline` iOS lo abre a pantalla completa; sin `loop` se
queda congelado a los 8 segundos. Van los cuatro.

⚠️ **`aria-hidden` va en el contenedor, no en el `<video>`.** El loop es
decorativo —la ranura tiene `alt: ""`— y así el lector de pantalla se salta
también el póster de respaldo.

⚠️ Usa rutas absolutas de `public/`, **no `import`**. Los loops no pasan por
`astro:assets`; para eso existe `rutaVideo()` en `src/lib/medios.ts` si
prefieres resolverlas ahí.

### 1.3 · El `object-position` es lo que hace que funcione

```css
.hero__medio video,
.hero__medio img { width:100%; height:100%; object-fit:cover;
                   object-position:100% 50%; display:block }
```

**Al 100%, no al 18% que llevaba la foto.** El loop mide 2.12:1 y la ranura
del hero 1.30:1, así que `cover` recorta por los lados, y de qué lado recorte
decide dos cosas:

1. **Entra la cotización completa, con el «Total» dentro.** Se probó al 88% y
   el canto de la pantalla partía el Total en dos. El Total es lo único que la
   demo prueba; si se corta, el video no está haciendo nada.
2. **El bloque desenfocado sale de encuadre.** La ventana de Vista Previa
   —la que lleva la caja de desenfoque sobre la indicación médica— vive en el
   extremo izquierdo del cuadro. Anclado a la derecha nunca aparece.

⚠️ **El desenfoque del archivo NO se toca por esto.** Que en el hero no se vea
es una segunda línea de defensa, no un sustituto: el archivo se usa también
como póster y como og:image recortado.

### 1.4 · Dos bugs que la referencia ya trae resueltos

**El póster se pintaba siempre.** `.hero__poster` es (0,1,0) y
`.hero__medio img` es (0,2,0), así que la regla de esconderlo perdía por
especificidad y el póster salía debajo del video —en móvil, los dos apilados.
Va scopeado:

```css
.hero__medio .hero__poster { display: none }
@media (prefers-reduced-motion: reduce) {
  .hero__medio video { display: none }
  .hero__medio .hero__poster { display: block }
}
```

Es la misma clase de bug que el del pie en la iteración 17. **No rompe el
build y no sale en ningún grep: solo se ve mirando la página.**

**En móvil el recorte se mantiene, solo cambia de forma.** A ancho completo y
sin recortar, el screencast queda en una tira de 390 × 184 donde no se lee
nada, y el bloque desenfocado vuelve a entrar convertido en una mancha rosa.

```css
@media (max-width: 899px) {
  .hero__medio { position:relative; order:2; width:100%; height:auto;
                 aspect-ratio:4/3; margin-top:2.25rem;
                 -webkit-mask-image:none; mask-image:none;
                 border-radius:12px; overflow:hidden }
  .hero__medio video, .hero__medio img { height:100% }
}
```

### 1.5 · El pie de foto se va

```
- {fotoHero && <p class="hero__credito">Talent Land · abril 2018</p>}
```

Ese crédito describía la foto. Ya no hay foto. **No lo sustituyas por un
crédito del video**: el loop es material propio de Ilhas y no acredita a
nadie.

Si `.hero__credito` queda sin usar en el CSS, bórralo.

---

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

`max-width` del lead pasa de `46ch` a `44ch`: con el texto nuevo a 46ch la
tercera línea quedaba de tres palabras.

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

## 4 · El nav: «Ilhas Finanzas» → «Aprender»

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

## 5 · `og:image`

`src/layouts/Base.astro:57-64`

El archivo ya está en el repo: `public/assets/og/portada.jpg`, 1200 × 630,
75 KB.

### 5.1 · Las cuatro etiquetas

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

### 5.2 · El `og:url` NO se toca

El análisis proponía fijarlo a `https://ilhas.ai`. **Eso rompería lo que ya
funciona:** hoy `og:url` sale de `canonicalURL`, que es distinta en cada
página. Fijarlo haría que compartir `/finanzas` reportara la portada.

Lo mismo el `canonical`. Están bien. Déjalos.

### 5.3 · El `og:title` del home

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
# El loop entra al hero, en los dos formatos
grep -c "home-hero-loop.webm" dist/index.html      # 1
grep -c "home-hero-loop.mp4"  dist/index.html      # 1
grep -c "home-hero-loop.jpg"  dist/index.html      # 2  — poster + <img> de respaldo
grep -c "autoplay"            dist/index.html      # 1
grep -c "playsinline"         dist/index.html      # 1

# La foto sale del home y sigue en /nosotros
grep -c "home-hero-conferencia" dist/index.html    # 0
grep -c "home-hero-conferencia" dist/nosotros/index.html   # ≥1
grep -c "Talent Land · abril 2018" dist/index.html # 0 — el crédito se fue

# El titular nuevo
grep -c "Tu primer proceso corriendo" dist/index.html   # 1
grep -c "clase mundial" dist/index.html                 # 0

# La banda de autoridad se fue del home
grep -c "banda-autoridad" dist/index.html          # 0
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
- [ ] **A los ~4.5 s se ve la cotización COMPLETA**, con «Total: $253,559.62»
      dentro del encuadre. Si el Total sale partido por el canto derecho, el
      `object-position` está mal.
- [ ] **En ningún momento aparece un bloque rosa desenfocado**, ni en 1440 ni
      en 390. Si aparece, el `object-position` no está al 100%.
- [ ] **El H1 y el párrafo se leen sobre el video en todo el loop**, incluidos
      los segundos en que la cotización blanca está en pantalla. Mide el
      contraste en el cuadro más claro, no en el primero.
- [ ] **Solo hay UNA imagen o video en el hero.** Si ves el video y debajo el
      póster, es el bug de especificidad del §1.4.
- [ ] Con **movimiento reducido activado** (DevTools → Rendering →
      `prefers-reduced-motion: reduce`) el video desaparece y queda el póster
      con la cotización. No una pantalla negra.
- [ ] En 390 px el recorte se mantiene y no hay scroll horizontal.
- [ ] El menú dice **Aprender** en las cinco páginas y en el pie.
- [ ] 1440 × 900 y 390 × 844.

### Alturas — repórtalas

| | Antes | Referencia | Después |
|---|---|---|---|
| Hero del home · 1440 | | 620 px | |
| Hero del home · 390 | | 893 px | |
| Home completo · 1440 | | | |

El home completo tiene que **bajar** — sale la banda de autoridad. Si sube,
algo quedó de más.

---

## Qué NO hacer

- No conviertas el hero en dos columnas. Se probó con el video en su marco y
  se descartó: a 534 px no se lee, y el bloque desenfocado queda al centro
  del encuadre.
- No quites el desenfoque del archivo de video porque «en el hero no se ve».
- No borres `BandaAutoridad.astro`, solo su uso.
- No cambies el `alt` de `home-hero-conferencia`.
- No corrijas la errata de la pantalla sin mirar la foto.
- No fijes `og:url` ni `canonical`: ya son correctos por página.
- No renombres el producto Ilhas Finanzas — solo la etiqueta del menú.
- No toques el botón «Hablemos».
- No pongas `loading="lazy"` ni `preload="none"` en el hero: es el LCP.

---

## Al terminar, reporta

1. Archivos tocados.
2. `npm run build` y `npm run medios`.
3. Todos los greps.
4. Captura del hero a 1440 en **dos momentos**: el arranque y el segundo ~4.5,
   con la cotización.
5. Captura del hero a 390.
6. Captura con `prefers-reduced-motion: reduce`.
7. La tabla de alturas.
8. **La errata de la pantalla en la foto de Talent Land**: qué dice de verdad.
9. El subtítulo del §2 sigue **pendiente de Jorge**. Dilo.
