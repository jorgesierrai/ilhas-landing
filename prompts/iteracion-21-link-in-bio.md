# Iteración 21 — `/jorgesierra`, el link in bio

**Para Claude Code. Ejecuta esto tal cual.**
**URGENTE: tiene que estar vivo antes del mediodía.**

> **Referencia: `medios/bio-referencia.html`.** Construida y medida:
> **907 px en un iPhone de 390×844 · 900 px en escritorio.** El CSS de esa
> referencia es el que va: cópialo, no lo reinventes.

**La página es genérica.** Sin parámetros, sin variantes, sin saludos de
evento: la misma URL sirve para la slide de una masterclass, para el perfil de
Instagram y para el de TikTok. Una sola página que no caduca.

---

## 0 · LO PRIMERO, PORQUE SI NO, MAÑANA NO HAY URL

### 0.1 · Esta rama sale de `main`, NO de `hero-corriendo`

`main` está en el PR #16. **Todo lo de las iteraciones 10 a 20 está en ramas
sin mergear**, así que una página construida sobre `hero-corriendo` **no va a
estar en ilhas.ai** aunque el build pase.

```bash
git checkout main && git pull && git checkout -b link-in-bio
```

Esta página no depende de nada pendiente: ruta nueva, assets nuevos. Por eso
puede salir sola, hoy.

### 0.2 · El redirect `/jorge` necesita `vercel.json`

No existe `vercel.json` en `main`. El sitio corre en **Vercel** y
`public/_headers` **es formato de Netlify y nunca aplicó** (está en
`CLAUDE.md`). Crea:

```json
{
  "redirects": [
    { "source": "/jorge", "destination": "/jorgesierra", "permanent": false }
  ]
}
```

⚠️ **`permanent: false` (307), no 308.** Un permanente se cachea en el
navegador de por vida: si mañana cambias a dónde apunta `/jorge`, quien ya lo
abrió sigue yendo al viejo.

⚠️ **La rama `cabeceras-vercel` (PR #17) también crea `vercel.json`.** Cuando
se mergee habrá conflicto: hay que juntar `redirects` y `headers` en un solo
archivo. **Déjalo en el reporte** para que no se pierda uno de los dos.

---

## 1 · ⚠️ LA SLIDE DE JORGE TIENE EL TIKTOK MAL

La slide dice **`@jorgesierra`**. El real es **`@jorgesierrai`**, con i al
final — sale de `src/data/personas.ts`, que es la fuente.

**Hay que corregir la slide antes de la masterclass.** Como está, manda a los
asistentes a una cuenta que no es de Jorge. En la página ya va el correcto.

---

## 2 · La ruta

```
src/pages/jorgesierra.astro
```

**Una sola.** El QR apunta a `https://ilhas.ai/jorgesierra`, sin parámetros.

⚠️ **Cero JavaScript.** La versión anterior de este brief traía un saludo
condicional con `?src=atrato`; Jorge lo quitó para que la página sea genérica.
Sin eso, la página no necesita ni una línea de JS y sigue la regla del sitio.

`noindex`: **no.** Es la página personal de Jorge y debe ser encontrable.

---

## 3 · Los assets, ya listos en el repo

| Archivo | Qué es |
|---|---|
| `public/assets/bio/jorge-full.webp` | **44 KB · 609×1000.** El recorte de playera blanca que mandó Jorge, con las márgenes transparentes recortadas al contenido real y optimizado. Bajo el tope de 100 KB. |
| `public/manual-ia-agentica.pdf` | **1.1 MB · 24 páginas.** «Un agente no es un chatbot con esteroides», agosto 2026. |
| `public/assets/qr/qr-jorgesierra.svg` | El QR para la slide. |

⚠️ **No los regeneres.** Ya están procesados y verificados.

⚠️ **El QR se rasterizó y se volvió a decodificar con un lector real**, y
devuelve `https://ilhas.ai/jorgesierra` exacto. Si lo regeneras, repite esa
comprobación: un QR que no se lee se ve idéntico a uno que sí.

⚠️ En la slide va **oscuro sobre blanco**. Invertido para que combine con el
fondo negro, lo rechaza medio escáner, incluida la cámara de iOS.

---

## 4 · El diseño: dos composiciones, no una que se estira

**Teléfono** — la figura arriba, el nombre sobre el desvanecido, los botones
abajo. Es como se va a ver el 90% de las veces.

**Escritorio (≥860 px)** — la figura a la izquierda a toda altura y el
contenido a la derecha. **Es el encuadre de la slide que Jorge proyecta**, y
por eso la página se siente su continuación.

Lo que no es negociable:

**`object-fit: contain`, nunca `cover`.** Jorge pidió la foto **completa**.
Con `cover` se le corta la cabeza o las piernas según el alto disponible.

**El desvanecido de abajo se queda en los dos tamaños.** El recorte de origen
termina a medio muslo con un canto recto: sin degradado se ve como una foto
mal cortada, con degradado se lee como decisión.

```css
.figura::after{content:"";position:absolute;z-index:2;inset:auto 0 0 0;
  height:22%;pointer-events:none;
  background:linear-gradient(to top,var(--ilhas-dark) 12%,transparent)}
@media (min-width:860px){ .figura::after{height:14%} }
```

**El degradado de marca aparece UNA vez** — el resplandor detrás de la figura,
y el nombre. En los botones dejaría de ser acento y sería decoración.

**`display:inline-block` en el `<h1>`.** Con `block`, `background-clip:text`
recorta sobre una caja del ancho de la columna y el degradado del nombre sale
truncado. Es el mismo bug que ya salió en la barra de stats.

**`min-height:100svh`, no `100vh`.** En Safari de iOS `100vh` ignora la barra
del navegador y la página se corta justo donde están los botones.

**Botones de 58 px mínimo** — arriba del objetivo táctil de 44 de Apple y 48
de Android.

---

## 5 · Los cinco botones, en este orden

| # | Botón | Destino |
|---|---|---|
| 1 | Instagram | `https://www.instagram.com/soyjorgesierra` |
| 2 | TikTok | `https://www.tiktok.com/@jorgesierrai` |
| 3 | Mi portafolio | `https://www.jorgesierra.io/` |
| 4 | **Tu primer proceso corriendo con agentes de IA.** · sub: `ilhas.ai` | `/` |
| 5 | **Descarga el manual** | `/manual-ia-agentica.pdf` |

El del manual es **el único sólido en morado**. No es capricho: es lo único
que la página regala, y es lo que la hace valer la pena aunque no lo quieran
seguir.

```html
<a href="https://www.instagram.com/soyjorgesierra" target="_blank" rel="noopener">
```

⚠️ **Nada de `instagram://` ni `tiktok://`.** El teléfono abre la app solo si
la tiene; el esquema propio falla en medio parque de dispositivos.

⚠️ **`ilhas.ai` va sin `target`**: es el mismo sitio.

⚠️ El del manual lleva `download`.

### 5.1 · El pie es un enlace, no un rótulo

`ilhas · Fundador de Ilhas y Kinzal` va envuelto en `<a href="/">`, todo el
renglón. Copy de Jorge, no se toca:

```html
<a class="pie" href="/">
  <img src="/assets/logo/logo-mark.svg" alt="" width="17" height="17">
  <b>ilhas</b> · Fundador de Ilhas y Kinzal
</a>
```

⚠️ Lleva `:hover` y `:focus-visible`. Un enlace que no se ve como enlace ni
responde al teclado es un adorno.

⚠️ **Apunta al mismo sitio que el botón 4.** Es a propósito: el botón hace el
trabajo con su copy, el pie recoge a quien busca el logotipo. Pero no esperes
tráfico del pie — el que convierte es el botón.

---

## 6 · La medición

**El sitio no tiene analítica.** Para mañana, la vía rápida es **Vercel Web
Analytics**, que es donde ya está hosteado:

1. Vercel → el proyecto → Analytics → Enable.
2. `npm i @vercel/analytics` y el componente en la página.

**Por qué ésta y no GA4, para mañana:**

- El script se sirve **desde el mismo dominio** (`/_vercel/insights/…`) y
  reporta al mismo dominio, así que **debería pasar la CSP `script-src 'self'`
  sin tocar nada**. ⚠️ **Verifícalo con la consola abierta** y dilo en el
  reporte.
- **No pone cookies**, así que la política de cookies —que hoy dice que no
  hay— sigue siendo cierta. GA4 con cookies obliga a reescribir ese documento
  y el aviso de privacidad, y eso no se hace la noche antes de un evento.

⚠️ Aun así hay que **sumar un párrafo al aviso de privacidad** nombrando a
Vercel como encargado. Es corto, pero no es cero.

⚠️ El plan de GA4 de `prompts/PROPUESTA-medicion.md` sigue en pie para
después. Esto no lo sustituye: lo desbloquea para mañana.

---

## Verificación

```bash
npm run build      # cero warnings
```

```bash
test -f dist/jorgesierra/index.html && echo "ruta ok"

# Los handles, exactos
grep -c "tiktok.com/@jorgesierrai"   dist/jorgesierra/index.html   # 1
grep -c 'tiktok.com/@jorgesierra"'   dist/jorgesierra/index.html   # 0  ← el malo
grep -c "instagram.com/soyjorgesierra" dist/jorgesierra/index.html # 1
grep -c "jorgesierra.io"             dist/jorgesierra/index.html   # 1
grep -c "Tu primer proceso corriendo con agentes de IA" dist/jorgesierra/index.html  # 1
grep -c 'class="pie" href="/"'       dist/jorgesierra/index.html   # 1

# El manual existe de verdad
test -f public/manual-ia-agentica.pdf && echo "pdf ok"
grep -c "manual-ia-agentica.pdf"     dist/jorgesierra/index.html   # 1

# Nada de esquemas propios, y cero JS propio
grep -c "instagram://"               dist/jorgesierra/index.html   # 0

# La foto pesa poco
ls -l public/assets/bio/jorge-full.webp    # < 100 KB
```

### En un teléfono DE VERDAD, no en el simulador

- [ ] **Escanea el QR con un iPhone y con un Android.** Que caiga en
      `/jorgesierra` y cargue completa.
- [ ] **`ilhas.ai/jorge` redirige.** Pruébalo escribiéndolo a mano en el
      teléfono, que es como lo va a usar la gente.
- [ ] **La foto se ve COMPLETA**, de la cabeza al corte de abajo, sin
      recortes en la cabeza ni en los brazos.
- [ ] El botón del manual **descarga el PDF de 24 páginas**.
- [ ] Instagram y TikTok **abren la app** si está instalada.
- [ ] En 4G real, **menos de un segundo**.
- [ ] En escritorio, la figura queda a la izquierda y el contenido a la
      derecha, como la slide.

### Alturas — repórtalas

| | Referencia | Después |
|---|---|---|
| `/jorgesierra` · 390 | 907 px | |
| `/jorgesierra` · 1440 | 900 px | |

---

## Qué NO hacer

- No saques la rama de `hero-corriendo`: no llegaría a producción.
- No uses `100vh`: en iOS corta los botones.
- No uses `object-fit: cover` en la foto: le corta la cabeza.
- No quites el desvanecido de abajo.
- No escribas el TikTok de memoria: es `@jorgesierrai`.
- No metas el degradado en los botones.
- No uses `instagram://` ni `tiktok://`.
- No metas JavaScript propio: esta página no lo necesita.
- No pongas menú, pie del sitio, banner ni formulario.
- No inviertas el QR.

---

## Al terminar, reporta

1. Archivos tocados y **de qué rama saliste**.
2. `npm run build` y todos los greps.
3. Capturas a 390 y 1440.
4. **Que probaste el QR en un teléfono real** y a dónde cayó.
5. **Que `ilhas.ai/jorge` redirige**, probado a mano.
6. Que el PDF descarga.
7. Si Vercel Analytics pasó la CSP sin tocarla.
8. La tabla de alturas.
9. **Que la slide de Jorge sigue con el TikTok mal** — hasta que él la corrija.
