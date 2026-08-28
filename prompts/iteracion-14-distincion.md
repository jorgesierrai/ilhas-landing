# Iteración 14 — Los alumnos y la distinción del papá

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 28 ago 2026.

> Corre **después** de la iteración 13, que ya está aplicada. Rama:
> **`distincion-papa`**.
>
> La referencia `medios/finanzas-referencia.html` **ya trae todo puesto y
> medido**. Cópiala.

---

## Qué falta hoy

A la tarjeta de Jorge Sierra (papá) le faltan dos credenciales, y la que más
importa en `/finanzas` es justo la que no está: la de **enseñar**. Sus dos
atribuciones de hoy —40 años, +200 empresas— lo describen como consultor. La
página lo presenta como maestro.

---

## Sobre la claim del Tec — léelo antes de escribirla

Jorge lo dijo primero como *«calificado como el mejor instructor del Tec de
Monterrey»*. Al preguntarle en qué se apoya, precisó: **es la evaluación de sus
alumnos, y es en Finanzas.**

Eso cambia lo que se publica:

| | |
|---|---|
| Como se dijo | «El mejor instructor del Tec de Monterrey» |
| Lo que se publica | **«Mejor evaluado por sus alumnos» · Finanzas · Tec de Monterrey** |

La segunda es más angosta y **es la que se puede sostener**. También es más
fuerte para esta página: acota al área de finanzas, que es exactamente lo que
`/finanzas` vende, y «evaluado por sus alumnos» es más creíble que un
superlativo suelto.

⚠️ **No la re-expandas.** Nada de «el mejor instructor», «el número uno», ni
quitarle el «en Finanzas». La precisión es el punto.

**Déjala anotada** en `docs/04-voz-del-cliente.md`: qué se publica, de dónde
sale (evaluación de alumnos, área de Finanzas, Tec de Monterrey) y quién lo
confirmó (Jorge, 28 ago 2026). Es el mismo trato que se le dio al 24 % de
Cisco.

---

## 1 · La atribución nueva

`+10,000 alumnos` **sí** es una atribución: es contable y va en la lista con
las otras.

**`src/pages/finanzas.astro`** (~línea 20):

```ts
    atribuciones: [
      { dato: "40 años", contexto: "de criterio financiero" },
      { dato: "+200 empresas", contexto: "asesoradas en LATAM" },
+     { dato: "+10,000 alumnos", contexto: "formados" },
    ],
```

**`src/pages/nosotros.astro`** (~línea 27):

```ts
    atribuciones: [
      { dato: "40 años", contexto: "asesorando empresas en LATAM" },
      { dato: "+200 empresas", contexto: "asesoradas" },
+     { dato: "+10,000 alumnos", contexto: "formados" },
    ],
```

⚠️ Los `contexto` de las dos páginas **son distintos a propósito** y así se
quedan. Solo se agrega el renglón nuevo.

⚠️ **Solo el papá.** No le inventes atribuciones al hijo para emparejar.

---

## 2 · La distinción — prop nueva en `TarjetaPersona.astro`

**El reconocimiento del Tec NO va en `atribuciones`.** Es de otra naturaleza:
las atribuciones son números contables, y meter un reconocimiento como cuarto
renglón de una lista de cifras rompe el ritmo y lo hace leer como
estadística. Va aparte, con su propia marca.

### 2.1 · La prop

```ts
interface Distincion {
  /** El reconocimiento. Va en negritas. */
  texto: string;
  /** Dónde y en qué. Va debajo, más chico. */
  fuente: string;
}

interface Props {
  …lo que ya tiene…
  /** Reconocimiento, cuando lo hay. Opcional: casi nadie trae uno. */
  distincion?: Distincion;
}
```

### 2.2 · El marcado — **después** de `<ul class="tarjeta-persona__atribuciones">`
y **antes** del bloque de `redes`

```jsx
{distincion && (
  <p class="distincion">
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
    >
      <circle cx="12" cy="9" r="6" />
      <path d="M8.6 14.2 7 22l5-2.6L17 22l-1.6-7.8" />
    </svg>
    <span>
      <b>{distincion.texto}</b>
      <em>{distincion.fuente}</em>
    </span>
  </p>
)}
```

La roseta es **literal**: marca un reconocimiento real, no una idea abstracta.
(Distinto del caso de los principios de `/metodo`, donde los íconos se
prohibieron justo por ser abstracciones.)

### 2.3 · El CSS

```css
  .distincion {
    display: flex; align-items: flex-start; gap: 0.55rem;
    margin: 0.85rem 0 0; padding: 0.7rem 0.8rem;
    border-radius: 10px; background: var(--ilhas-primary-10);
    font-size: 0.8125rem; line-height: 1.45; color: var(--ilhas-text);
  }
  .distincion svg {
    flex: 0 0 auto; width: 1rem; height: 1rem; margin-top: 0.1rem;
    color: var(--ilhas-primary);
  }
  .distincion b { display: block; font-weight: 600; color: var(--ilhas-dark); }
  .distincion em { display: block; font-style: normal; margin-top: 0.1rem; }
```

⚠️ `font-style: normal` en el `<em>`: se usa por semántica, no para
inclinarlo.

---

## 3 · El arreglo que hace falta: alinear las redes al fondo

Con la atribución y la distinción nuevas, **la tarjeta del papá crece y la del
hijo no.** El grid las estira a la misma altura, así que la fila de íconos de
cada una queda a distinta altura y se ve descuadrado. Se ve en la referencia
antes del arreglo.

`.tarjeta-persona__body` hoy es solo `padding`. Se vuelve columna flexible:

```css
  .tarjeta-persona__body {
    padding: 1.5rem;
    /* Columna flexible para poder empujar las redes al fondo: las dos
       tarjetas no miden lo mismo —el papá trae una atribución más y su
       distinción— y sin esto los íconos quedan a distinta altura. */
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .tarjeta-persona__body .redes { margin-top: auto; }
```

⚠️ `.tarjeta-persona` ya es `display: flex; flex-direction: column`, así que el
`flex: 1` del body funciona sin tocar nada más. **Revisa que los márgenes de
los hijos del body no se hayan movido** al pasar de bloque a flex: el flex
container no colapsa márgenes.

---

## 4 · Pasar la distinción desde las dos páginas

**Las dos** (`finanzas.astro` y `nosotros.astro`), en la entrada del papá:

```ts
    distincion: {
      texto: "Mejor evaluado por sus alumnos",
      fuente: "Finanzas · Tec de Monterrey",
    },
```

Y en los dos `.map`, pásala: `distincion={m.distincion}` / `distincion={p.distincion}`.

💡 **Considera subirla a `src/data/personas.ts`**, junto a `ENLACES`, por la
misma razón que los enlaces: es el mismo dato de la misma persona en dos
páginas. Si lo haces, expórtala como `DISTINCIONES` con la misma forma
`Record<"papa" | "hijo", Distincion | undefined>` y muévele el tipo ahí.

---

## Verificación

```bash
npm run build      # cero warnings
npm run medios     # sin ⚠ nuevos — esto no toca el manifiesto
```

Sobre `dist/`:

```bash
grep -c "+10,000 alumnos"                  dist/finanzas/index.html dist/nosotros/index.html  # 1 y 1
grep -c "Mejor evaluado por sus alumnos"   dist/finanzas/index.html dist/nosotros/index.html  # 1 y 1
grep -c "Finanzas · Tec de Monterrey"      dist/finanzas/index.html dist/nosotros/index.html  # 1 y 1

# La versión que NO se publica
grep -ci "mejor instructor"                dist/finanzas/index.html dist/nosotros/index.html  # 0 y 0

# Nada se le agregó al hijo
grep -c "distincion"                       dist/finanzas/index.html                            # 1, no 2

grep -c "<script" dist/finanzas/index.html dist/nosotros/index.html   # 0 y 0
```

### Con el navegador

- [ ] **Las filas de íconos de las dos tarjetas quedan a la misma altura**, al
      fondo. Éste es el punto del arreglo del punto 3 — captura las dos
      tarjetas juntas.
- [ ] La distinción **se lee como reconocimiento, no como un cuarto dato**.
- [ ] La roseta se ve como roseta a 16 px, no como una mancha.
- [ ] En 390 px la distinción no desborda ni parte «Monterrey» a la mitad.
- [ ] La tarjeta del hijo, sin distinción, **no deja hueco raro** donde iría.
- [ ] 1440 × 900 y 390 × 844, en las dos páginas.

### Alturas — repórtalas

| | Antes (medido) | Referencia | Después |
|---|---|---|---|
| `/finanzas` §04 · 1440 | 1,519 px | 1,683 px | |
| `/finanzas` §04 · 390 | 1,942 px | 2,192 px | |
| `/nosotros` §01 · 1440 | | | |

La sección crece ~165 px en escritorio y ~250 px en móvil. Es el costo de dos
credenciales que sí valen; si te parece que se pasó, dilo con la medida.

---

## Qué NO hacer

- **No publiques «el mejor instructor del Tec de Monterrey».** Lo que se
  publica es «Mejor evaluado por sus alumnos · Finanzas · Tec de Monterrey».
- No le quites el «en Finanzas» ni el «por sus alumnos»: ahí está la precisión.
- No metas la distinción como cuarta atribución.
- No le inventes atribuciones ni distinción al hijo para emparejar las
  tarjetas.
- No cambies los `contexto` que ya existen en cada página: son distintos a
  propósito.
- No pongas la roseta a color de marca sólido ni le hagas fondo circular: es
  una marca discreta al lado de un texto.

---

## Al terminar, reporta

1. Archivos tocados.
2. `npm run build` y `npm run medios`.
3. Todos los greps, incluido el de «mejor instructor» en 0.
4. Captura de las dos tarjetas juntas, en las dos páginas, 1440 y 390.
5. La tabla de alturas.
6. Confirma que dejaste la claim anotada en `docs/04-voz-del-cliente.md`.
