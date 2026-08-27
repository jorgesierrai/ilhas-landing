# Iteración 8 — `/metodo` §07 se vuelve un visor

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 27 ago 2026.

> Corre **después** de `prompts/iteracion-7-banda-y-metodo.md`, que ya está
> aplicada. Rama nueva: **`visor-practica`**, salida de la rama donde vive la 7.

---

## Reglas

1. **El copy es de Jorge.** Los cuatro nombres de la lista son los `caption` que
   ya están en `src/data/medios.ts`. **No inventes textos nuevos.**
2. **Cero JavaScript de cliente.** Esto es lo que define la iteración. Lee la
   sección 3 antes de escribir nada.
3. **No toques la imagen ni el `alt` de ninguna captura.**

---

## 1 · Qué pidió Jorge

Textual:

> «Esta sección hazla mejor, que se vean las imágenes de alguna manera, y que le
> puedas dar para abajo. Lo veo como una sección donde del lado izquierdo estén
> los pasitos o las partes —como la estructura, la herramienta corriendo— y
> cuando le des click, del lado derecho aparezca la imagen.»

Un visor. Izquierda: los cuatro pasos, apilados, se baja por ellos. Derecha: la
captura del que está seleccionado.

**Referencia: `medios/practica-referencia.html`.** Ábrela, dale clic a los
cuatro, y **cópiala**. Está medida y resuelta; no la reinventes.

---

## 2 · Lo que arregla, además de lo que pidió

Hoy §07 mide **3,115 px** — es la sección más alta del sitio, en la página más
alta del sitio, y son cuatro capturas apiladas que nadie baja a ver.

Con el visor: **857 px en escritorio, 1,102 px en móvil.** Medido en la
referencia. Las cuatro capturas siguen ahí, siguen en el DOM, y ahora sí se ven
al tamaño en que se leen.

---

## 3 · Cómo se hace sin JavaScript

Cuatro `<input type="radio" name="visor">` con el mismo `name`, cuatro
`<label for>` en la lista, y `:checked ~` para prender la vista que toca. Es el
patrón nativo de pestañas sin JS.

```html
<div class="visor">
  <input class="visor__radio" type="radio" name="visor" id="v1" checked>
  <input class="visor__radio" type="radio" name="visor" id="v2">
  <input class="visor__radio" type="radio" name="visor" id="v3">
  <input class="visor__radio" type="radio" name="visor" id="v4">
  <div class="visor__grid">
    <ul class="visor__lista">…cuatro <label for="vN">…</ul>
    <div class="visor__panel">…cuatro <figure class="visor__vista">…</div>
  </div>
</div>
```

Los cuatro `input` van **antes** del `.visor__grid` y como hermanos suyos: sin
eso el combinador `~` no alcanza ni la lista ni el panel.

⚠️ **Los radios se ocultan con `clip-path`, nunca con `display:none` ni
`visibility:hidden`.** Con esos dos salen del orden de tabulación y el visor deja
de funcionar con teclado. La referencia trae la clase correcta — cópiala tal cual.

Lo que sale gratis por usar radios de verdad: el lector de pantalla lo anuncia
como grupo de opciones (que es lo que es), las flechas del teclado ya navegan
entre ellas, y las cuatro capturas siguen en el DOM para Google. **No le pongas
`role="tablist"` ni `aria-selected`**: eso pide manejo de foco con JS y aquí
mentiría.

---

## 4 · Las tres decisiones de diseño — cópialas, no las reinventes

**1 · El panel reserva altura fija (`min-height`), y el marco se centra dentro.**

Las cuatro capturas tienen proporciones muy distintas:

| | proporción |
|---|---|
| `metodo-prompts-01` | 1.37 |
| `metodo-prompts-02` | 2.00 |
| `metodo-prompts-03` | **4.81** — una tira ancha de terminal |
| `metodo-prompts-04` | **0.95** — casi cuadrada, alta |

Si el panel se ajusta a cada una, la sección **brinca de alto** en cada clic. Si
se les mete a todas en una caja del mismo tamaño, dos se deforman o quedan
flotando en un rectángulo vacío.

La solución de la referencia: el panel reserva la altura, las cuatro vistas
comparten la misma celda de grid (`grid-area:1/1`), y **el marco abraza su
imagen** y se centra. Lo que sobra es el fondo de la sección, no una caja vacía.
Ninguna se deforma y la sección nunca brinca.

**2 · Las cuatro fichas llevan borde desde el reposo.** Sin borde se leen como
párrafos y nadie adivina que se les da clic. Con borde se leen como un selector.
La activa es la única que se llena de blanco, levanta con sombra y prende su
barra morada.

**3 · La punta de la ficha activa apunta a la imagen.** Es un triángulo de CSS,
sin asset. Explica la sección sin una sola palabra de instrucciones. Solo en
escritorio: en móvil la imagen va arriba y no apuntaría a nada.

---

## 5 · Los cuatro nombres — ya están escritos, no los cambies

Salen de los `caption` del manifiesto:

| | `id` | Nombre en la lista | `marco` |
|---|---|---|---|
| 01 | `metodo-prompts-01` | La estructura: agentes, skills y comandos | `navegador` |
| 02 | `metodo-prompts-02` | El flujo completo, de entrada a salida | `navegador` |
| 03 | `metodo-prompts-03` | La herramienta corriendo | `terminal` |
| 04 | `metodo-prompts-04` | El resultado que salió solo | `navegador` |

Leídos en orden cuentan una historia: **estructura → flujo → corriendo →
resultado.** Por eso van numerados y por eso el orden no se cambia.

**El `figcaption` de cada captura se apaga** (`mostrarPie={false}`): la lista de
la izquierda ya nombra lo que estás viendo, y repetirlo abajo de la imagen es
decir lo mismo dos veces.

---

## 6 · Cómo encaja con lo que ya existe

- **`Captura.astro` se reutiliza tal cual**, con `mostrarPie={false}` y un
  `ancho` mayor que el de hoy (hoy sirve a 560; en el visor la imagen se ve a
  ~730 px, así que **sube a 900**).
- **`.marco` y `.marco--terminal` ya viven en `src/styles/base.css`.** No los
  dupliques: la referencia los trae copiados solo para poder verse suelta.
- **La ranura del manifiesto no cambia.** Ni `id`, ni `alt`, ni `pesoMaxKB`. Esto
  es un cambio de presentación, no de medios — `npm run medios` no debe reportar
  nada nuevo.
- **El `mostrar(...)` que ya envuelve el bloque se queda.** Si algún día falta
  una captura, el visor no debe romperse: si falta una, `Captura.astro` ya pinta
  su `Ranura`, y eso está bien — se ve el hueco con su ficha, no un panel vacío.
- **Se cae `.prompts`** (la rejilla 2×2 de la iteración 7) y su CSS con ella.

---

## 7 · Móvil

Debajo de 900 px el visor se apila: **la imagen arriba, la lista abajo.** La
imagen es la prueba; la lista es el índice de la prueba. La punta desaparece.

El orden del DOM **no cambia** — solo el visual, con `order`. Así el teclado y el
lector de pantalla siguen leyendo lista → panel en los dos tamaños.

---

## 8 · Verificación

```bash
npm run build      # cero warnings
npm run medios     # sin ⚠ nuevos
```

Sobre `dist/`, **no sobre `src/`**:

1. `grep -c "<script" dist/metodo/index.html` → **0**. Si el visor trajo JS, está
   mal hecho.
2. `grep -c 'type="radio"' dist/metodo/index.html` → **4**.
3. `grep -c "display:none" dist/_astro/*.css | grep -i visor` → que **no** haya
   `display:none` ni `visibility:hidden` sobre `.visor__radio`.
4. `grep -c "metodo-prompts" dist/metodo/index.html` → **≥ 4**. Las cuatro
   capturas siguen en el DOM.
5. `grep -c "role=\"tablist\"" dist/metodo/index.html` → **0**.

### Con el navegador — esto es lo que de verdad hay que probar

- [ ] Clic en los cuatro: cambia la imagen y cambia la ficha activa.
- [ ] **La sección no brinca de alto.** Mide `offsetHeight` de la `<section>` en
      los cuatro estados: **los cuatro tienen que dar el mismo número.**
- [ ] Con `Tab` llegas al grupo y con **las flechas** cambias de vista.
- [ ] El anillo de foco se ve en la ficha, no en un input invisible.
- [ ] Ninguna de las cuatro capturas sale deformada ni cortada.
- [ ] En 390 px la imagen va arriba y la lista abajo.

### Alturas — repórtalas

| | Antes | Después | Meta |
|---|---|---|---|
| `/metodo` §07 | 3,115 px | | ~857 px |
| `/metodo` total | | | |

---

## Qué NO hacer

- No uses JavaScript. Ni un `<script>`, ni `client:load`, ni `onclick`.
- No escondas los radios con `display:none` ni `visibility:hidden`.
- No le pongas `role="tablist"` / `aria-selected` a un patrón sin JS.
- No dejes que el panel se ajuste a cada imagen: la sección brincaría.
- No recortes ni deformes ninguna captura para que "cuadren" entre sí.
- No inventes nombres nuevos para los cuatro pasos.
- No dupliques `.marco` — ya vive en `base.css`.

---

## Al terminar, reporta

1. Archivos tocados.
2. `npm run build` y `npm run medios`.
3. Los cinco greps.
4. Las cuatro capturas de pantalla del visor (una por vista) en 1440 y una en 390.
5. Los cuatro `offsetHeight` de la sección — tienen que ser idénticos.
6. La tabla de alturas.
