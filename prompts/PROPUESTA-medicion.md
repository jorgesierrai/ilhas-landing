# Propuesta — medición y sitemap

**Para revisión de Jorge. Todavía NO es una iteración.**
31 ago 2026.

Jorge pidió el orden correcto: **primero dónde van los eventos, y que sean
eventos que no se rompan cuando cambiemos el sitio.** Este documento es eso.
Al final está lo que rompe cada uno, y cómo el sitio te avisa solo cuando se
rompa.

---

## 1 · El principio: el evento nombra la INTENCIÓN, no el elemento

Casi toda la analítica que se rompe es analítica atada a cosas que cambian:

| Anclaje | Vida útil aquí |
|---|---|
| Un selector CSS (`.hero__ctas .btn-primary`) | Murió dos veces **este mes**: el hero pasó de foto a video y de flex a grid. |
| El texto del botón | Jorge reescribe copy cada semana. |
| La posición («la 3ª tarjeta») | Las tarjetas se renombraron dos veces y el §02 se comió al §03. |
| El % de scroll | La página cambió de largo cuatro veces: salió la banda de autoridad, entró la barra de stats, entró la banda de cifras. |

Lo que **no** cambia en este sitio es la escalera de valor: o **aprendes** el
método, o te lo **implementamos**, y cada carril tiene exactamente una
conversión. Eso está en `docs/01-arquitectura.md`, es arquitectura, no diseño.

**Por eso los eventos se cuelgan de ahí.**

---

## 2 · Los cuatro eventos. Nada más.

Se inventariaron todos los enlaces del sitio. Hay **dos conversiones reales**
y **una bifurcación**. Eso son los eventos; el resto es ruido.

### 2.1 · `carril_elegir` — la pregunta estratégica

**Dónde:** los dos botones del hero del home.

| Botón | Parámetro |
|---|---|
| Quiero aprenderlo → `/finanzas` | `carril: "aprender"` |
| Quiero implementarlo → `/soluciones` | `carril: "implementar"` |

**Por qué es el más valioso del sitio:** todo el home está construido sobre
esa bifurcación. Si resulta que el 90% se va por un carril, el sitio tiene que
cambiar. Hoy no lo sabes.

⚠️ Ojo: los dos botones son enlaces internos, así que **las vistas de
`/finanzas` y `/soluciones` ya te dan casi lo mismo**. El evento agrega una
cosa que las vistas no: separa a quien llegó por el hero de quien llegó por el
menú, por el pie o por Google directo.

### 2.2 · `webinar_reservar` — la conversión del carril «aprender»

**Dónde:** los tres enlaces que salen a `eventos.ilhas.ai`.

- `/finanzas` hero — «Reservar mi lugar en el webinar»
- `/finanzas` cierre — el mismo botón abajo
- el pie del sitio — «Reservar el webinar»

⚠️ **La URL de `/finanzas` ya lleva UTMs**
(`utm_source=sitio&utm_medium=web&utm_campaign=webinar&utm_content=finanzas`),
así que del otro lado Highlevel ya sabe de dónde vino. El evento sirve para
verlo **de este lado**, junto con el resto del embudo.

⚠️ Los enlaces del pie y de las páginas legales **no** llevan UTM. Vale
ponérselos con `utm_content=pie` para poder separarlos. Es un cambio de una
línea y te dice si el pie sirve de algo.

### 2.3 · `diagnostico_agendar` — la conversión del carril «implementar»

**Dónde:** los dos botones «Agendar un diagnóstico» de `/soluciones`.

Hoy es `mailto:hola@ilhas.ai?subject=Quiero un diagnóstico`.

⚠️ **Éste es el que va a romperse, y ya sabemos cuándo:** el día que el
diagnóstico deje de ser un mailto y pase a un formulario. Es exactamente lo
que hablamos con el botón «Hablemos». Está marcado abajo.

### 2.4 · `contacto_correo` — la intención suelta

**Dónde:** los `mailto:hola@ilhas.ai` **sin** subject — el del pie y los de
las páginas legales.

Se separa del anterior a propósito: «quiero un diagnóstico» es una venta,
«te escribo» es una pregunta. Mezclarlos infla la conversión.

---

## 3 · Lo que NO se mide, y por qué

Esto es tan importante como la lista de arriba. **Cada evento que agregas es
un evento que se puede romper**, y la analítica rota es peor que la ausente
porque la crees.

| No se mide | Por qué |
|---|---|
| Profundidad de scroll | La página cambia de largo cada iteración. El 50% de hoy no es el 50% del mes pasado, así que la serie histórica no significa nada. |
| Vistas de sección | Las secciones se renombran y se fusionan. El §02 se comió al §03 en agosto. |
| Clic por tarjeta de producto | Las seis tarjetas se renombraron dos veces este mes. |
| Reproducción del video del hero | Es `autoplay`. Dispara al 100% siempre y no significa nada. |
| Clic en el menú | Ya lo dice la vista de página de destino. |

⚠️ **GA4 trae «medición mejorada» prendida por defecto** y ahí viene el scroll
al 90% y los clics salientes. El scroll hay que **apagarlo** en la propiedad,
por lo de arriba. Los clics salientes déjalos: no estorban y cubren los
enlaces a Cisco, Gartner y RMX sin declarar nada.

---

## 4 · Cómo se cuelga sin que se rompa

**Nada de selectores CSS.** Un atributo declarado en el marcado:

```html
<a href="/finanzas" class="btn btn-primary" data-evento="carril_elegir" data-carril="aprender">
```

Y un solo script chico que escucha **un** clic en `document` y lee el
atributo. No conoce clases, ni orden, ni texto. Si mueves el botón, cambias su
copy o lo pintas de otro color, el evento sigue.

### 4.1 · El registro, igual que el de medios

Los eventos viven en **`src/data/eventos.ts`**, no sueltos en las páginas — el
mismo patrón que `medios.ts`, que ya funciona:

```ts
export interface Evento {
  id: string;
  descripcion: string;
  paginas: string[];      // en qué rutas debe aparecer
  minimo: number;         // cuántas veces, mínimo, en el build
  seRompeSi: string;      // ← el aviso, en español, para el que lo lea después
}
```

### 4.2 · El chequeo que te avisa cuando algo lo rompe

Esto contesta directo lo que preguntaste. **`scripts/eventos-check.mjs`**,
gemelo de `medios-check.mjs`, que corre después del build y grita si:

1. un evento declarado **no aparece** en `dist/` → alguien borró o renombró el
   botón,
2. aparece en `dist/` un `data-evento` **que no está en el registro** →
   alguien se inventó uno,
3. un evento aparece en una página **donde no estaba declarado**.

```
$ npm run eventos

  ✓  carril_elegir          2 en /                      (esperados 2)
  ✓  webinar_reservar       3 en /finanzas, /*          (esperados 3)
  ✗  diagnostico_agendar    0 en /soluciones            (esperados 2)
     ↳ SE ROMPE SI: el diagnóstico deja de ser mailto y pasa a formulario.
```

**Y se mete al `build`**, para que no dependa de que alguien se acuerde de
correrlo.

---

## 5 · Qué rompe cada evento

| Evento | Se rompe si… | NO se rompe si… |
|---|---|---|
| `carril_elegir` | los dos CTA del hero se vuelven uno solo, o desaparecen | cambia el copy, el color, el orden, el layout o el video |
| `webinar_reservar` | el webinar se muda de `eventos.ilhas.ai` | cambia el texto del botón, o se agrega un tercero |
| `diagnostico_agendar` | **el diagnóstico pasa de `mailto` a formulario** ← ya está en el horizonte | cambia el asunto del correo o el copy del botón |
| `contacto_correo` | cambia `hola@ilhas.ai` | se mueve de sección o se agrega en otra página |

Los cuatro los detecta el chequeo del §4.2 **en el mismo build en que se
rompen**, no tres meses después cuando notes que la gráfica está plana.

---

## 6 · Lo que GA4 cuesta, dicho completo

Jorge decidió GA4 y va GA4. Pero hay tres consecuencias que tienen que quedar
por escrito antes, no después:

**1 · Es el primer JavaScript del sitio.** Hoy el sitio manda **cero** bytes
de JS al navegador; es decisión de arquitectura documentada en
`docs/06-stack-y-seguridad.md`. `gtag.js` pesa ~90 KB. Cargado `async` y
después del render no se lleva el LCP entre las patas, pero deja de ser cierto
que el sitio no manda JS.

**2 · Hay que abrir la CSP.** Hoy es `script-src 'self'`. Queda:

```
script-src 'self' https://www.googletagmanager.com;
connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com;
img-src 'self' data: https://*.google-analytics.com;
```

**3 · Los dos documentos legales dejan de ser ciertos.** El aviso de
privacidad dice que Ilhas no recoge datos y la política de cookies dice que no
hay cookies. GA4 normal pone `_ga` y `_ga_XXXXX`. **Bajo LFPDPPP un aviso que
miente es peor problema que no tener analítica.**

### 6.1 · La salida, y es buena

**GA4 en modo sin cookies**, con `client_storage: 'none'` y
`anonymize_ip: true`:

- **no pone una sola cookie** → la política de cookies se queda casi igual y
  **no necesitas banner de consentimiento**, que es lo que ensucia todos los
  sitios,
- el aviso de privacidad necesita **un párrafo**, no una reescritura: Google
  como encargado, datos agregados, sin identificar personas.

**Lo que pierdes:** sin cookie no hay identidad entre sesiones, así que
«usuarios» pasa a ser efectivamente «sesiones» y no puedes ver retorno. Para
un sitio de cinco páginas que arranca, es un precio bajo. El día que te
importe el retorno, se prende la cookie y ese día sí entra el banner.

⚠️ **Recomiendo arrancar sin cookies.** Se puede cambiar después; lo que no se
puede es des-publicar un aviso que estuvo mal seis meses.

---

## 7 · El sitemap

No existe ninguno hoy — verificado. `robots.txt` son dos líneas y no lo
menciona. `astro.config.mjs` ya trae `site: 'https://ilhas.ai'`, que es el
único requisito.

- `@astrojs/sitemap`, una línea en el config.
- `Sitemap: https://ilhas.ai/sitemap-index.xml` en `robots.txt`.
- `trailingSlash: 'never'` ya está puesto y el sitemap tiene que respetarlo, o
  reportas URLs que redirigen.

### 7.1 · Un detalle que sí importa

Hay **ocho** páginas y tres son legales: `/terminos`, `/privacidad`,
`/cookies`. `Base.astro` ya tiene una prop `noindex` construida exactamente
para eso —el comentario lo dice— **pero ninguna página la usa.**

Entonces: `noindex` en las tres, y excluirlas del sitemap con el `filter` de
la integración. Si sólo haces una de las dos, el sitio se contradice: le dices
a Google «indexa esto» en el sitemap y «no indexes» en la etiqueta.

Quedan **cinco** URLs en el sitemap, que son las cinco que venden.

### 7.2 · De pilón, ya que se toca el `<head>`

Un JSON-LD de `Organization` en `Base.astro`: nombre, logo, URL, redes.
Es el bloque que alimenta el panel de marca de Google. Cuesta quince líneas y
no toca la CSP porque va inline como `application/ld+json`.

---

## 8 · Lo que hace falta de ti antes de escribir la iteración

1. **Dónde está hosteado.** El `_headers` es formato Netlify o Cloudflare
   Pages. Cambia cómo se aplican las cabeceras nuevas de la CSP.
2. **El ID de medición de GA4** (`G-XXXXXXXXXX`). Si todavía no creas la
   propiedad, se puede dejar en variable de entorno y prenderlo después.
3. **Confirmar el modo sin cookies** del §6.1.
4. **Si le ponemos UTM a los enlaces del pie** hacia el webinar (§2.2).
