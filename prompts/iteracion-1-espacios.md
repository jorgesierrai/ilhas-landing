# Iteración 1 — Construir el sistema de medios y las ranuras

> **Cómo usar este archivo:** ábrelo en Claude Code y pega el bloque de abajo completo. No hace falta tener ningún asset todavía.

---

## Contexto (léelo antes de escribir código)

Lee, en este orden:

1. `CLAUDE.md` — las cinco reglas que no se rompen
2. `docs/00-INDEX.md` y el orden de precedencia que define
3. `PLAN-MEDIOS.md` — qué activo va en qué sección y qué objeción mata cada uno
4. `medios/LEEME.md` — cómo opera este sistema
5. `medios/CHECKLIST.md` — **la lista literal de las 41 ranuras.** Es la fuente de verdad del manifiesto
6. `docs/06-stack-y-seguridad.md` — CSP, cero JS de cliente, checklist de publicación

---

## Objetivo de esta iteración

Dejar el sitio **listo para recibir material**, sin agregar un solo archivo de material.

Al terminar:

- `npm run build` compila limpio y **el sitio en producción se ve exactamente igual que ahora** (ninguna ranura tiene archivo todavía, así que ninguna pinta nada).
- `npm run dev` muestra un marcador punteado por cada ranura, con su id, la ruta exacta del archivo que espera y sus specs.
- `npm run medios` imprime el estado de las 41 ranuras.
- Cuando yo copie un archivo con el nombre correcto en la carpeta correcta, **aparece solo**, sin tocar código.

---

## Entregable 1 · El manifiesto

**Archivo:** `src/data/medios.ts`

```ts
export type TipoMedio = "loop" | "clip" | "captura" | "foto" | "icono";
export type Pagina = "home" | "metodo" | "soluciones" | "finanzas" | "nosotros" | "compartido";

export interface Atribucion {
  nombre: string;
  rol: string;
  empresa?: string;
}

export interface SlotMedio {
  /** = nombre del archivo sin extensión. Minúsculas, guiones medios, sin acentos. */
  id: string;
  tipo: TipoMedio;
  pagina: Pagina;
  /** Etiqueta legible de la sección, p. ej. "§07 No son prompts" */
  seccion: string;
  prioridad: 1 | 2 | 3;
  /** La objeción que mata, tomada de PLAN-MEDIOS.md. Documenta por qué existe la ranura. */
  objecion: string;
  /** alt real. Cadena vacía SOLO si el medio es puramente decorativo. */
  alt: string;
  caption?: string;
  duracion?: string;
  /** Máximo en KB. Lo usa scripts/medios-check.mjs. */
  pesoMaxKB: number;
  notas?: string;
  /** Obligatorio cuando tipo === "clip" y la sección es de testimonios. */
  atribucion?: Atribucion;
  /** Alternativa al video en un testimonio: cita en texto. */
  texto?: string;
}

export const MEDIOS: SlotMedio[] = [ /* … */ ];
```

**Genera una entrada por cada casilla de `medios/CHECKLIST.md`** — son 41. Toma `objecion` de la tabla de la Parte 1 de `PLAN-MEDIOS.md`. Escribe `alt` y `caption` como borrador razonable; yo los ajusto después.

Exporta también helpers de consulta: `porPagina(p)`, `porId(id)`, `porPrioridad(n)`.

---

## Entregable 2 · El detector

**Archivo:** `src/lib/medios.ts`

Resuelve si el archivo de una ranura existe. Dos mecanismos distintos según dónde vive:

```ts
import fs from "node:fs";
import type { ImageMetadata } from "astro";

// Imágenes: pasan por astro:assets. import.meta.glob solo devuelve lo que EXISTE,
// así que una ranura vacía simplemente no aparece en el mapa — no rompe el build.
const IMAGENES = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/media/**/*.{png,jpg,jpeg,webp,avif}",
  { eager: true },
);

// Íconos: se inlinean para que hereden currentColor y sirvan sobre claro y sobre bg-dark.
const ICONOS = import.meta.glob<string>(
  "/src/assets/iconos/*.svg",
  { eager: true, query: "?raw", import: "default" },
);

// Video: vive en public/, no pasa por Vite. Se comprueba en disco durante el build (SSG).
const DIR_VIDEO = new URL("../../public/assets/video/", import.meta.url);

export function rutaVideo(id: string, ext: string): string | null {
  return fs.existsSync(new URL(`${id}.${ext}`, DIR_VIDEO))
    ? `/assets/video/${id}.${ext}`
    : null;
}

export function buscarImagen(id: string): ImageMetadata | null { /* … */ }
export function buscarIcono(id: string): string | null { /* … */ }
/** true si la ranura tiene al menos su archivo principal. Úsalo para decidir si una sección se renderiza. */
export function hayMedio(id: string): boolean { /* … */ }
```

`hayMedio` es la pieza clave: las secciones nuevas la consultan para no renderizarse mientras estén vacías.

---

## Entregable 3 · Los componentes

**Carpeta:** `src/components/medios/`

| Componente | Props | Comportamiento |
|---|---|---|
| `Ranura.astro` | `slot: SlotMedio` | El marcador. **Solo pinta si `import.meta.env.DEV`.** En producción devuelve `null`. Muestra: id, tipo, ruta esperada, peso máximo, prioridad y la objeción. Caja punteada, sin usar colores fuera de `tokens.css` |
| `Loop.astro` | `id`, `ratio?` | `<video autoplay muted loop playsinline preload="metadata" poster>` con `<source>` webm + mp4. **`aria-hidden="true"`** (es decorativo). Ver la regla de movimiento abajo |
| `VideoClip.astro` | `id`, `titulo?` | `<video controls preload="none" poster>` + `<track kind="captions" srclang="es" label="Español" default>` si existe el `.es.vtt`. **Nunca autoplay.** Máximo 90 s |
| `Captura.astro` | `id`, `marco?: "navegador" \| "terminal" \| "ninguno"` | `<Image>` de `astro:assets` + `<figcaption>`. **El marco es CSS**, no parte del PNG |
| `TarjetaCaso.astro` | `producto`, `resolvio`, `capturaId?`, `sector?` | Reemplaza el marcado de `.casos li` en `/soluciones` y `.linaje li` en el home. Usa `.card` de `base.css`. Si no hay captura, la tarjeta se ve como hoy |
| `Testimonio.astro` | `id` | Video o cita en texto + atribución. **Lanza un error de build si el slot no trae `atribucion`.** Es a propósito: hace imposible repetir el error del `index.html` viejo |
| `BandaAutoridad.astro` | `items: {etiqueta, año?, href?}[]` | Tira delgada, ≤ 80 px de alto, sin fondo propio. No es una sección |
| `Stat.astro` | `dato`, `contexto` | Usa `--ilhas-fs-stat`, el token de métricas grandes que hoy no se usa en ninguna parte |

### La regla de movimiento (sin JavaScript)

`docs/06-stack-y-seguridad.md` exige cero JS de cliente y la CSP no permite `<script>` inline. Así que `prefers-reduced-motion` se resuelve **solo con CSS**: `Loop.astro` renderiza el `<video>` **y** un `<img>` con el póster, y el CSS decide cuál se ve.

```css
.loop__poster { display: none; }
@media (prefers-reduced-motion: reduce) {
  .loop__video  { display: none; }
  .loop__poster { display: block; }
}
```

### Sobre `set:html` en los íconos

`docs/06-stack-y-seguridad.md` prohíbe `set:html` con contenido que no sea literal del repo. Los SVG de `src/assets/iconos/` **sí** son literales del repo, así que el uso está permitido — pero deja un comentario en `buscarIcono` explicando por qué es la excepción y que ningún SVG entra sin revisarse a mano.

---

## Entregable 4 · El verificador

**Archivo:** `scripts/medios-check.mjs` · **Script:** `"medios": "node scripts/medios-check.mjs"` en `package.json`

Recorre `MEDIOS`, agrupa por prioridad y por cada ranura imprime:

- `✓` archivo presente y dentro del peso
- `✗` archivo ausente
- `⚠` presente pero **excede `pesoMaxKB`**, o clip con voz **sin `.es.vtt`**, o testimonio **sin `atribucion`**

Termina con `18 de 41 listas · 3 con problema` y **sale con código 1 si hay algún `⚠`** (para poder engancharlo a CI después). Un `✗` no debe fallar: faltar material es el estado normal entre las dos iteraciones.

---

## Entregable 5 · Las ranuras en las páginas

Coloca las ranuras según la Parte 2 de `PLAN-MEDIOS.md`. Resumen de dónde va cada cosa:

**`/` (`src/pages/index.astro`)**
- §01 Hero → `Loop` con `home-hero-loop`, sustituyendo el ícono 3D actual (que además hoy se oculta en móvil)
- **Banda nueva** justo debajo del hero → `BandaAutoridad` con: `Radio Imagen · 2018`, `Conferencias de IA`, `6 productos financieros construidos de cero a uno`
- §02 El hueco → tres `Captura` (`home-mercado-01..03`)
- §03 Cinco pasos → un ícono por paso (`icono-paso-i` … `icono-paso-s`)
- §05 Linaje → `TarjetaCaso` con `producto-stampay` … `producto-factumizer`

**`/metodo`**
- §04 La tabla → `Captura` con `metodo-timeline`
- §05 El paso joya → `VideoClip` con `metodo-hilar-clip`
- §07 No son prompts → rejilla de cuatro `Captura` (`metodo-prompts-01..04`), marco `"terminal"` donde aplique. **Es el bloque más importante de esta iteración**
- §08 A dónde llegas → `Loop` con `metodo-agentes-loop`

**`/soluciones`**
- §01 Hero → `Loop` con `soluciones-hero-loop`
- §03 Casos → `TarjetaCaso` reusando las mismas seis capturas `producto-*`
- **Sección nueva entre §03 y el CTA** → Testimonios. Envuélvela en `hayMedio()` para que no exista mientras no haya material

**`/finanzas`**
- §01 Hero → `Loop` con `finanzas-hero-loop`
- §02 Las ocho capacidades → un ícono por chip (`icono-cap-*`)
- §03 Es para ti si → las mismas `home-mercado-*` como respaldo
- §04 Quién lo enseña → reusa `src/assets/equipo/jorge-papa.png` y `jorge-hijo.png` (hoy esta página no tiene ni una cara) + `VideoClip` con `finanzas-edificacion`
- §05 CTA del webinar → **ningún medio.** El VSL no va en el sitio (regla 1 de `CLAUDE.md`)

**`/nosotros`**
- **Sección nueva · La historia** → tres `VideoClip` (`nosotros-historia-01..03`), envuelta en `hayMedio()`
- **Sección nueva · Autoridad** → `nosotros-conferencia` a ancho completo + `VideoClip` con `nosotros-radio-2018`, con el año en tratamiento gráfico. Envuelta en `hayMedio()`

Copia `public/assets/ilhas-iconografia/full-timeline.png` a `src/assets/media/capturas/metodo-timeline.png` (optimizada, ≤ 400 KB) para que pase por `astro:assets`. **Ojo:** `public/assets/ilhas-iconografia/` está en `.gitignore` — el original existe solo en la máquina de Jorge; la copia optimizada en `src/assets/media/capturas/` sí se commitea.

---

## Entregable 6 · Carpetas y documentación

- Crea `src/assets/media/capturas/`, `src/assets/media/fotos/`, `src/assets/iconos/`, `public/assets/video/`, cada una con su `LEEME.md` (ya están escritos; solo verifica que existan y que las rutas coincidan).
- Verifica que `.gitignore` **no** esté ignorando `*.mp4`, `*.webm`, `*.vtt` ni `public/assets/video/`.
- Actualiza `docs/05-assets.md`: la sección *"Lo que hace falta"* dice que no hay testimoniales y que por eso no hay bloque. **Ya existen dos.** Documenta la regla de atribución en su lugar, y extiende la regla general de assets al video con los pesos de `PLAN-MEDIOS.md` Parte 3.
- Actualiza `docs/06-stack-y-seguridad.md`: deja documentado que el video propio funciona hoy por herencia de `default-src 'self'`, y escribe el diff de CSP para el día que la biblioteca se mude a `media.ilhas.ai`.

---

## Restricciones

1. **Cero JS de cliente.** La CSP es `script-src 'self'` sin `unsafe-inline`. Nada de `<script>` inline, nada de `on*=`.
2. **No toques la CSP** en esta iteración. Todo el video es del mismo origen y ya está permitido.
3. **Cero placeholders en producción.** Los marcadores solo existen bajo `import.meta.env.DEV`.
4. **Ningún color ni tipografía fuera de `src/styles/tokens.css`.**
5. **No escribas copy nuevo de marketing.** Los `alt` y `caption` del manifiesto son borrador; los titulares y párrafos de las secciones nuevas los escribo yo.
6. **No agregues dependencias.** Todo se resuelve con Astro, `astro:assets` y `node:fs`.
7. **No cambies la arquitectura de cinco páginas.** No crees rutas nuevas.
8. Todo `<video>` con `preload` explícito, `poster`, y `width`/`height` o `aspect-ratio` para no provocar salto de layout.

---

## Criterios de aceptación

- [ ] `npm run build` sin errores ni warnings
- [ ] El HTML generado **no contiene ni un marcador** ni una ranura vacía visible
- [ ] Comparar `dist/` antes y después: el sitio en producción se ve igual que hoy
- [ ] `npm run dev` muestra los marcadores con id, ruta esperada y specs
- [ ] `npm run medios` lista las 41 ranuras y reporta 0 listas
- [ ] Copiar un archivo de prueba con el nombre de una ranura la enciende sin tocar código; borrarlo la apaga
- [ ] Cero `<script>` y cero `on*=` en el HTML generado
- [ ] Las secciones nuevas de `/soluciones` y `/nosotros` no existen en el HTML mientras no haya material
- [ ] Lighthouse: 100 en accesibilidad y buenas prácticas, performance > 95

---

## Al terminar, dime

1. Qué ranuras quedaron colocadas y en qué archivo de página vive cada una.
2. Qué decisiones tomaste que no estaban en este brief.
3. La salida de `npm run medios`.
