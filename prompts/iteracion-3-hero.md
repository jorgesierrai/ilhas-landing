# Iteración 3 — El hero del home

**Para Claude Code. Ejecuta esto tal cual, de arriba a abajo.**
Aprobado por Jorge el 25 ago 2026. Reemplaza el hero de `/` por la opción **B2**.

---

## Regla que manda sobre todo lo demás

**El copy de este documento es de Jorge y va literal.** No lo acortes, no lo
"mejores", no le cambies una coma, no lo partas distinto. Si algo no cabe,
ajustas el CSS — nunca el texto. Esta es la instrucción explícita de Jorge:
*"nada más deja este texto"*.

Lo mismo con la foto: es la que va. No la sustituyas, no la recortes distinto,
no propongas otra.

---

## 0 · La rama

Estás en `fix-comentarios-2-de-assets` (verifícalo). Antes de tocar nada:

1. Si hay cambios sin commitear, **commítealos en la rama actual** con un
   mensaje que diga qué eran. No los arrastres a la rama nueva.
2. Crea y cámbiate a `hero-conferencia`, partiendo de
   `fix-comentarios-2-de-assets` — **no de `main`**. Todo el sistema de medios
   vive en la rama de assets y este trabajo depende de él.
3. Al final, `CLAUDE.md` → sección *Estado del repositorio* dice
   `Rama de trabajo: **`fix-comentarios`**`, que ya no es cierto. Actualízalo a
   la rama real y pon la fecha de hoy.

---

## 1 · La foto (ya está en el repo)

`src/assets/media/fotos/home-hero-conferencia.jpg` — 1440 × 1148, ~226 KB.

Es un recorte de `nosotros-conferencia-detalle.jpg` hecho a propósito para el
hero: deja fuera el logo de "talent startup" que estorbaba a la izquierda y
conserva las cuatro cosas que hacen que la foto valga — Jorge, el podio, la
pantalla con su pregunta, y el branding de Talent Land al fondo.

**No la reproceses.** 1440 px es la extensión real de esa región en el
original de 2400 px; cualquier "upscale" solo inventa pixeles.

### Regístrala en el manifiesto

En `src/data/medios.ts`, en el bloque de **prioridad 1**, agrega:

```ts
{
  id: "home-hero-conferencia",
  tipo: "foto",
  pagina: "home",
  seccion: "§01 Hero",
  prioridad: 1,
  objecion: "«¿Quién eres tú?» · «¿Esto es real o es una landing más?»",
  alt: "Jorge Sierra en el escenario de Talent Land, frente a una pantalla que pregunta «¿Quién sea puede crear inteligencia artificial?»",
  caption: "Talent Land · abril 2018",
  pesoMaxKB: 400,
  notas:
    "Recorte propio para el hero, no reutilices el de /nosotros: aquí la foto se enmascara y sangra desde la derecha, así que el encuadre tiene que aguantar que el 26% izquierdo desaparezca. Es el LCP del home — nunca lazy.",
},
```

El `id` es el nombre del archivo sin extensión, como manda la regla del
manifiesto. Ya coincide.

---

## 2 · El hero

**Referencia visual: `medios/hero-b2-referencia.html`.** Ábrela con doble clic
antes de escribir una línea — las rutas son relativas, resuelve sola. Los
tokens de su `:root` están copiados de `src/styles/tokens.css`, así que lo que
veas ahí es lo que debe verse en el sitio.

Ese archivo trae **cuatro decisiones numeradas en los comentarios del CSS**.
Pórtalas tal cual. Si algo se ve distinto al terminar, la causa está en una de
esas cuatro.

### El copy, literal

**H1** — `con IA` va envuelto en `<span class="text-gradient">`, que ya existe
en `base.css`:

> Tecnología de clase mundial. Accesible para tu empresa **con IA**.

**Subtítulo:**

> Convertimos años de experiencia creando infraestructura crítica en un método
> probado. Todo lo que aprendimos escalando productos de millones de dólares y
> empresas unicornio, ahora adaptado para potenciar tus ventas, finanzas y
> operaciones.

**Botones** (sin cambio): `Quiero aprenderlo` → `/finanzas` ·
`Quiero implementarlo` → `/soluciones`.

**Métricas**, en fila, con la unidad en morado (`--ilhas-grad-end`):

| Número | Unidad | Etiqueta |
|---|---|---|
| `+1,000` | ` MDP` | al mes, volumen respaldado |
| `6` | `+` | startups · infraestructura creada |
| `2016` | `→` | desarrollando IA |

**Crédito**, abajo a la izquierda: `Talent Land · abril 2018`.

### Cómo se sirve la imagen

Va por el sistema de ranuras, pero **no con `Captura.astro`**: ese componente
mete un `<figure>` + `<figcaption>` y `loading="lazy"`, y las tres cosas pelean
con un hero absoluto que además es el LCP. En el frontmatter de
`index.astro`:

```ts
import { buscarImagen } from "../lib/medios";
const fotoHero = buscarImagen("home-hero-conferencia");
```

y en el marcado, dentro de `.hero__foto`:

```astro
<Image
  src={fotoHero}
  alt={porId("home-hero-conferencia")!.alt}
  widths={[900, 1440]}
  sizes="(max-width: 899px) 100vw, 56vw"
  loading="eager"
  fetchpriority="high"
/>
```

Tres cosas que **no** se negocian aquí:

- **`width` y `height` juntos no.** Ese es el bug que decapitó las fotos de
  `/nosotros`: `astro:assets` recorta en build cuando le das las dos, y el
  `object-position` del CSS llega demasiado tarde. Aquí recorta el CSS.
- **`loading="eager"` + `fetchpriority="high"`.** Esta foto es el LCP del home.
  Con `lazy` el home mide peor de lo que medía sin foto.
- **El `alt` sale del manifiesto**, no escrito a mano en la página. Una sola
  fuente de verdad.

Si `fotoHero` es `null` (la ranura vacía), el hero debe seguir viéndose bien:
fondo `--ilhas-dark`, texto, botones y métricas. Que no explote y que no deje
un hueco.

### Lo que se va

- `.hero__glow` — el resplandor morado. La foto ocupa ese lugar ahora. Borra el
  `<div>` y su bloque de CSS.
- `.hero-split` en el home y la columna `.hero-split__visual`. **Solo en
  `index.astro`** — `/finanzas` y `/soluciones` siguen usando `.hero-split`
  desde `base.css`. No toques esa regla compartida.
- `<Loop id="home-hero-loop">` y el `import dashboardIcon`. Si `Loop` o `Image`
  quedan sin usar en el archivo, quita también sus imports.
- El array `stats` viejo con los tres `<Stat>` del hero. Ojo: `Stat.astro`
  **se sigue usando en `/nosotros`**, no lo borres.

### Y `home-hero-loop` qué

Esa ranura queda sin página que la use, así que `npm run medios` la va a
reportar como ⚠. Márcala en el manifiesto:

```ts
sinUsar: true,
```

y en `notas`, agrega la razón: el hero del home lo ocupa desde el 25 ago 2026
la foto de Talent Land, y la ranura se conserva por si el loop vuelve en otra
sección.

---

## 3 · Las métricas: extiende `Stat.astro`, no dupliques

Las métricas del hero necesitan tres cosas que `Stat.astro` hoy no hace: la
unidad en morado, la etiqueta en versalitas con tracking, y la regla vertical
a la izquierda.

Agrégale **dos props opcionales** y no cambies nada más:

- `unidad?: string` — se pinta dentro del número, en un `<i>` con
  `font-style: normal` y `color: var(--ilhas-grad-end)`.
- `variante?: "hero"` — activa versalitas + `letter-spacing` en el contexto y
  el `border-left`.

**Sin props nuevas, el render tiene que salir byte por byte igual que hoy** —
`/nosotros` depende de eso. Verifícalo con un diff del HTML generado de
`/nosotros` antes y después.

---

## 4 · Dos cosas que hay que mirar, no arreglar a ciegas

**El nav sobre el hero oscuro.** `Nav.astro` es `position: sticky` con fondo
claro (`rgba(248,250,255,.97)`) y `border-bottom: 1px solid var(--ilhas-gray)`.
Sobre un hero oscuro esa hairline puede leerse como una costura. **No conviertas
el nav en transparente**: hacerlo bien pide estado de scroll, y este sitio no
manda JS al cliente. Toma la captura, mírala, y **repórtalo** — la decisión es
de Jorge.

**`mask-image` en el CSS de producción.** El minificador de este proyecto ya
se comió un `backdrop-filter` una vez y dejó solo la variante `-webkit-`. La
máscara es *toda* la ilusión de este hero: si se cae, la foto aparece como un
rectángulo con borde duro. Compruébalo en el CSS construido, no en el fuente
(instrucciones en §5).

---

## 5 · Verificación — obligatoria, no opcional

```bash
npm run medios     # cero ⚠. La ranura nueva tiene que salir verde y en uso.
npm run build      # cero warnings.
```

Y además, **sobre `dist/`, no sobre `src/`** (esta es la lección de la regresión
de `producto-cometa`: el checker decía verde y la imagen no estaba en la
página):

1. `grep -o 'home-hero-conferencia[^"]*' dist/index.html` → tiene que aparecer.
2. `grep -c 'mask-image' dist/_astro/*.css` → tienen que estar **las dos**
   declaraciones, la prefijada y la limpia. Si solo sobrevive una, ancla la
   regla (`@supports`, o mueve la máscara a un `style` scopeado que el
   minificador no toque) y vuelve a comprobar.
3. `grep 'loading=' dist/index.html | head` → la foto del hero **no** debe
   decir `lazy`.
4. Diff del `<section>` del hero de `/nosotros` antes y después: sin cambios.

### Capturas

Sirve `dist/` y captura `/` en **1440 × 900** y **390 × 844**. En cada una
comprueba, una por una:

- [ ] `con IA` en morado y **en una sola línea**, sin partirse.
- [ ] El H1 completo sobre zona oscura — ninguna letra encima de la cara de
      Jorge ni de la pantalla.
- [ ] La pregunta de la pantalla (`¿Quién sea puede crear inteligencia
      artificial?`) **se lee**. Es la mitad del argumento de la foto.
- [ ] Las tres métricas en fila, y la tercera **no** choca con el hombro de
      Jorge.
- [ ] El borde izquierdo de la foto se **disuelve**; no hay canto recto.
- [ ] En 390 px: foto arriba como banda de 240 px, texto abajo, cero texto
      encima de la foto.
- [ ] El nav no deja costura rara contra el hero (§4).

Manda las dos capturas en el reporte.

---

## Qué NO hacer

- No tocar el copy. Ni una palabra. (Ver la regla de arriba.)
- No cambiar el hero de `/finanzas`, `/soluciones`, `/metodo` ni `/nosotros`.
  Solo el home.
- No mover la banda de autoridad ni ninguna sección de abajo. Este cambio
  empieza y termina en `<section class="hero">`.
- No agregar JavaScript de cliente. Ninguno.
- No inventar colores: `--ilhas-grad-end`, `--ilhas-primary` y opacidades del
  blanco. El cian no entra a este hero.
- No borrar `nosotros-conferencia-detalle.jpg`: sigue siendo la foto de
  `/nosotros`. La del hero es un archivo aparte, a propósito.
- No decidir tú lo del nav. Repórtalo.

---

## Al terminar, reporta

1. Qué archivos tocaste y por qué.
2. Salida de `npm run medios` y `npm run build`.
3. Los cuatro greps de §5 con su resultado.
4. Las dos capturas.
5. El tema del nav, con tu recomendación — pero sin aplicarla.
