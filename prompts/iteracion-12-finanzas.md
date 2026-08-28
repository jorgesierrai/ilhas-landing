# Iteración 12 — `/finanzas`: el hero, el filtro y quién lo enseña

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 28 ago 2026.

> Rama nueva: **`finanzas-arriba`**, salida de donde viva la iteración 11.
>
> **Referencia visual: `medios/finanzas-referencia.html`.** Trae las tres
> secciones ya resueltas y medidas. **Ábrela y cópiala** en vez de reinventar.
>
> La sección «Un webinar, un lugar» y todo lo que va abajo **no se toca**.

---

## Reglas

1. **El copy nuevo es de Jorge.** Va literal.
2. **No inventes copy.** Si un lugar queda sin texto, se queda sin texto.
3. **Cero JavaScript de cliente.**
4. **Nada de colores nuevos**: todo sale de `tokens.css`. Los dos grises
   auxiliares del filtro están indicados abajo y son los únicos literales.

---

## 1 · El hero — copy nuevo

`src/pages/finanzas.astro:98-108`

### 1.1 · El titular

```
- <h1>
-   Sé de finanzas. Pero sientes que te estás{" "}
-   <span class="text-gradient">quedando atrás</span>.
- </h1>
+ <h1>
+   <span class="hero-fin__pregunta">Sabes de finanzas, ¿no?</span>
+   Pero sientes que te estás{" "}
+   <span class="text-gradient">quedando atrás</span>.
+ </h1>
```

**Por qué en dos pesos.** «Sabes de finanzas, ¿no?» es el gancho y va en voz
baja; el golpe es la segunda mitad. Con las dos del mismo tamaño el titular se
va a cuatro renglones y la pregunta queda huérfana en el suyo — se probó y se
ve mal. Las dos siguen dentro del **mismo `<h1>`**: es una sola frase.

### 1.2 · El párrafo, y la línea que define «genérico»

```
- <p class="lead">
-   Trabajas muchísimas horas en lo mismo de siempre —reportes,
-   cierres, conciliaciones— y nunca se acaba. Ya probaste ChatGPT y
-   te salió genérico.
- </p>
+ <p class="lead">
+   Trabajas muchísimas horas en lo mismo de siempre —reportes,
+   cierres, conciliaciones— y nunca se acaba. Ya probaste ChatGPT y
+   te salió genérico: lo que cualquier persona te hubiera dicho o
+   hecho.
+ </p>
+ <p class="hero-fin__filo">Y ni siquiera sabes si está bien o mal.</p>
```

⚠️ **«Y ni siquiera sabes si está bien o mal» va en su propio párrafo**, no
dentro del anterior. Es la línea más filosa de la página: metida al final de un
párrafo largo se pierde, y sola pega. Va un punto más oscura y en peso 500.

### 1.3 · La imagen — se cae el reloj, entra la plantilla maestra

El reloj flotante de 280 px era decoración: no probaba nada. La plantilla
maestra **es la promesa de la página hecha imagen**, así que necesita tamaño
para leerse.

**El archivo ya está en el repo:** `src/assets/media/capturas/finanzas-plantilla.png`
(1600 × 952, 58 KB, con transparencia).

```
- <div class="hero-split__visual" aria-hidden="true">
-   <Loop id="finanzas-hero-loop" ratio="1 / 1">
-     <Image src={relojIcon} alt="" width="280" height="280" />
-   </Loop>
- </div>
+ <div class="hero-fin__visual" aria-hidden="true">
+   <Image src={plantillaImg} alt="" width={1600} height={952} loading="eager" />
+ </div>
```

- **Importa** `import plantillaImg from "../assets/media/capturas/finanzas-plantilla.png";`
- **Borra** el import de `relojIcon` y el de `Loop` si ya no se usan en el archivo.
- `loading="eager"`: es el LCP de la página.
- **`.hero-split` se cambia por `.hero-fin`** en esta página: el grid de
  `hero-split` da 18 rem a la columna visual y ahí la laptop sería ilegible.

### 1.4 · El CSS del hero — cópialo de la referencia

```css
  .hero-fin { position: relative; overflow: hidden; }
  .hero-fin__inner { display: grid; gap: 2rem; align-items: center; }
  .hero-fin h1 {
    max-width: 19ch;
    font-size: clamp(2rem, 3.5vw, 2.75rem);
    line-height: 1.12;
  }
  .hero-fin__pregunta {
    display: block; font-size: 0.6em; font-weight: 500;
    letter-spacing: -0.01em; color: var(--ilhas-text); margin-bottom: 0.5rem;
  }
  .hero-fin__filo {
    margin-top: 0.9rem; font-size: 1.0625rem; font-weight: 500;
    color: var(--ilhas-dark); max-width: 34ch;
  }
  .hero-fin .btn { margin-top: 1.75rem; }
  .hero-fin__visual img { display: block; width: 100%; height: auto; }

  @media (min-width: 1000px) {
    .hero-fin__inner {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.08fr);
      gap: 2.5rem;
    }
    /* La laptop se sale por la derecha; el section recorta. Es el mismo
       recurso del hero del home, donde la foto sangra desde ese lado. */
    .hero-fin__visual { margin-right: calc(var(--ilhas-gutter) * -1); }
    .hero-fin__visual img { width: 122%; max-width: none; }
  }
  @media (max-width: 999px) {
    .hero-fin__visual { margin-inline: calc(var(--ilhas-gutter) * -0.5); }
  }
```

⚠️ **`overflow: hidden` en `.hero-fin` no es opcional.** Sin él la laptop
provoca scroll horizontal en toda la página. Se midió: con él,
`scrollWidth === clientWidth` en 1440 y en 390.

### 1.5 · El manifiesto

En `src/data/medios.ts`:

- **Se retira la ranura `finanzas-hero-loop`** (línea ~389). Ya no existe ese
  hueco.
- **Se agrega la ranura nueva.** El archivo **ya está entregado**, así que la
  ranura nace llena:

```ts
  {
    id: "finanzas-plantilla",
    tipo: "captura",
    pagina: "finanzas",
    seccion: "§01 El dolor",
    prioridad: 1,
    objecion: "«¿Esto qué me va a dejar en concreto?»",
    alt: "Modelo financiero en hoja de cálculo con un panel de copiloto de IA que señala el margen EBITDA y alerta sobre el crecimiento de gastos",
    caption: "La plantilla maestra, con IA encima",
    pesoMaxKB: 150,
    notas:
      "ILUSTRACIÓN, no captura de un producto real: es una maqueta de lo que se arma en el programa, con cifras inventadas. Entregada por Jorge el 28 ago 2026. 1600x952 con transparencia, cuantizada a 200 colores (58 KB) — la UI es plana y no se degrada.",
  },
```

⚠️ **Es la única ranura del sitio que NO es una captura de algo real**, y por
eso las `notas` lo dicen con todas sus letras. Si algún día alguien la
reemplaza pensando que es un screenshot, ahí está la advertencia.

---

## 2 · El filtro — dos puertas, no dos listas

`src/pages/finanzas.astro:161-186` y su CSS

**El problema no era el espaciado.** Las dos columnas se veían **iguales**:
mismo bullet morado en las dos, mismo peso de texto, sin superficie. Un filtro
que no distingue la puerta que se abre de la que se cierra no filtra nada.

### 2.1 · El marcado

```jsx
<div class="filtro">
  <div class="filtro__col filtro__col--si">
    <div class="filtro__cabeza">
      <span class="marca marca--si" aria-hidden="true" />
      <h3>Es para ti si…</h3>
    </div>
    <ul>{esParaTi.map((item) => <li>{item}</li>)}</ul>
  </div>
  <div class="filtro__col filtro__col--no">
    <div class="filtro__cabeza">
      <span class="marca marca--no" aria-hidden="true" />
      <h3>No es para ti si…</h3>
    </div>
    <ul>{noEsParaTi.map((item) => <li>{item}</li>)}</ul>
  </div>
</div>
```

**El copy de las dos listas no cambia.** Salen igual de `esParaTi` y
`noEsParaTi`.

### 2.2 · El CSS

```css
  .filtro { display: grid; gap: 1rem; }
  .filtro__col { padding: 1.5rem 1.5rem 1.65rem; border-radius: var(--ilhas-radius-card); }

  .filtro__col--si {
    background: var(--ilhas-white);
    border: 1px solid rgba(122, 60, 255, 0.22);
    box-shadow: 0 1px 2px rgba(14, 14, 15, 0.03), 0 12px 32px rgba(122, 60, 255, 0.07);
  }
  .filtro__col--no { background: transparent; border: 1px dashed #D5D8E0; }

  .filtro__cabeza { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 1.1rem; }
  .filtro__cabeza h3 { font-size: 1.0625rem; }
  .filtro__col--no .filtro__cabeza h3 { color: #6E6E7A; }

  /* Las marcas van dibujadas en CSS, no con glifos: un ✓ de fuente cambia de
     forma según el sistema y aquí tiene que verse idéntico siempre. */
  .marca {
    flex: 0 0 auto; width: 1.5rem; height: 1.5rem; border-radius: 50%;
    display: grid; place-items: center; position: relative;
  }
  .marca--si { background: var(--ilhas-primary); }
  .marca--si::before {
    content: ""; width: 0.44rem; height: 0.72rem;
    border: solid #fff; border-width: 0 2px 2px 0;
    transform: rotate(45deg) translate(-1px, -2px);
  }
  .marca--no { background: #E4E6ED; }
  .marca--no::before {
    content: ""; width: 0.6rem; height: 2px; border-radius: 1px; background: #8A8A97;
  }

  .filtro__col ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.85rem; }
  .filtro__col li {
    position: relative; padding-left: 1.5rem;
    font-size: 0.9375rem; line-height: 1.55;
  }
  .filtro__col li::before {
    content: ""; position: absolute; left: 0; top: 0.62em;
    width: 0.5rem; height: 0.5rem; border-radius: 50%;
  }
  .filtro__col--si li { color: var(--ilhas-text); }
  .filtro__col--si li::before { background: var(--ilhas-primary); }
  .filtro__col--no li { color: #75757F; }
  .filtro__col--no li::before {
    background: #AFAFBB; left: 1px; top: 0.72em;
    width: 0.62rem; height: 1.5px; border-radius: 1px;
  }

  @media (min-width: 768px) {
    .filtro { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; }
  }
```

**Las tres decisiones que hacen que funcione:**

1. **La de sí es una tarjeta sólida; la de no es un borde punteado.** El
   punteado dice «esta puerta no está cerrada, simplemente no es la tuya» sin
   ponerse feo ni agresivo.
2. **Marca distinta en cada una**: palomita morada contra guion gris. Antes las
   dos traían el mismo bullet morado.
3. **El texto del «no» va un tono más claro.** Es información, no una oferta.

⚠️ Los cuatro literales (`#D5D8E0`, `#E4E6ED`, `#8A8A97`, `#75757F`,
`#AFAFBB`, `#6E6E7A`) son grises auxiliares que `tokens.css` no tiene. Si el
proyecto prefiere que vivan como variables, súbelos a `tokens.css` como
`--ilhas-gris-*` y úsalos desde ahí — pero **no los cambies de valor**, están
elegidos contra el `--ilhas-light` del fondo.

---

## 3 · Quién lo enseña — centrar y armar la suma

`src/pages/finanzas.astro:188-227` y su CSS

**El bug:** `.maestros` tenía `max-width: 44rem` **sin `margin-inline: auto`**,
así que las dos tarjetas se pegaban a la izquierda de un contenedor de 1140 px
y sobraba medio ancho vacío a la derecha. Eso es lo que se ve en la captura de
Jorge.

### 3.1 · La estructura

Todo el contenido de la sección se envuelve en un bloque centrado, y el
encabezado se centra con él:

```jsx
<div class="container">
  <div class="maestros-bloque">
    <div class="prose reveal">
      <p class="kicker">Quién lo enseña</p>
      <h2>De padre e hijo a tu consejo financiero-tecnológico.</h2>
    </div>

    <div class="maestros">
      {maestros.map((m) => <TarjetaPersona … />)}
    </div>

    <div class="suma">
      <div class="suma__parte"><b>40 años</b><span>de fundamento financiero</span></div>
      <div class="suma__mas" aria-hidden="true">+</div>
      <div class="suma__parte"><b>12 años</b><span>construyendo con IA</span></div>
    </div>

    {mostrar("finanzas-edificacion") && (
      <div class="clip">
        <div class="clip__marco"><VideoClip id="finanzas-edificacion" /></div>
      </div>
    )}
  </div>
</div>
```

### 3.2 · La suma sustituye al párrafo suelto

```
- <p class="maestros__resumen">
-   40 años de fundamento financiero, más 12 años construyendo con IA.
- </p>
```

Ese párrafo decía lo correcto pero colgaba como cita al pie, con su borde
izquierdo, sin relación visual con las dos personas de arriba.

**Ahora es el puente:** «40 años» cae bajo el papá, «12 años» bajo el hijo, y
el `+` en el canal de en medio. La suma se ve antes de leerse — que es
exactamente lo que dice el H2. **El texto es el mismo**, solo cambia de forma.

### 3.3 · El CSS

```css
  .maestros-bloque { max-width: 52rem; margin-inline: auto; }
  .maestros-bloque .prose { text-align: center; }
  .maestros-bloque .kicker,
  .maestros-bloque h2 { margin-inline: auto; }
  .maestros-bloque h2 { max-width: 24ch; }

  .maestros { display: grid; gap: 1.25rem; margin-top: 2rem; }

  .suma {
    margin-top: 1.25rem; display: grid; gap: 0.75rem;
    padding: 1.35rem 1.5rem; border-radius: var(--ilhas-radius-card);
    background: var(--ilhas-primary-10); text-align: center;
  }
  .suma__parte b {
    display: block; font-family: var(--ilhas-font-display); font-weight: 600;
    font-size: 1.75rem; line-height: 1; color: var(--ilhas-primary);
  }
  .suma__parte span {
    display: block; margin-top: 0.35rem; font-size: 0.9375rem; color: var(--ilhas-text);
  }
  .suma__mas {
    display: grid; place-items: center; font-family: var(--ilhas-font-display);
    font-weight: 600; font-size: 1.25rem; color: rgba(122, 60, 255, 0.45);
  }

  .clip { max-width: 52rem; margin: 2.25rem auto 0; }
  .clip__marco {
    border-radius: var(--ilhas-radius-card); overflow: hidden;
    border: 1px solid var(--ilhas-gray); background: var(--ilhas-dark);
    box-shadow: 0 2px 4px rgba(14, 14, 15, 0.04), 0 20px 48px rgba(14, 14, 15, 0.10);
  }

  @media (min-width: 640px) {
    .maestros { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .suma {
      grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
      align-items: center; gap: 1.5rem;
    }
  }
```

⚠️ **`max-width: 24ch` en el H2 no es capricho.** Con 20ch el titular parte
«financiero-tecnológico» a la mitad por el guion y queda «financiero- /
tecnológico». Se probó.

⚠️ **`.maestros__resumen` y `.maestros__clip` salen del CSS**, ya no se usan.

⚠️ **El clip no lleva pie de foto.** Se probó ponerle uno y lo escribí yo, que
es justo lo que no debe pasar. **Si Jorge quiere una línea ahí, la escribe él.**

---

## Verificación

```bash
npm run build      # cero warnings
npm run medios     # la ranura nueva debe salir LLENA, la vieja ya no existe
```

Sobre `dist/finanzas/index.html`:

```bash
grep -c "Sé de finanzas"                          # 0
grep -c "Sabes de finanzas"                       # 1
grep -c "ni siquiera sabes si está bien o mal"    # 1
grep -c "cualquier persona te hubiera dicho"      # 1
grep -c "finanzas-hero-loop"                      # 0
grep -c "reloj"                                   # 0
grep -c "maestros__resumen"                       # 0
grep -c "<script"                                 # 0
```

### Con el navegador — esto es lo que de verdad hay que probar

- [ ] **`scrollWidth === clientWidth`** en 1440 y en 390. La laptop se sale del
      contenedor a propósito; si falta el `overflow: hidden` la página entera
      scrollea de lado. **Reporta los dos números.**
- [ ] La laptop se lee: se distingue «Copiloto IA» y las filas del estado de
      resultados. Si a 1440 no se lee, sube el `1.08fr` de la columna.
- [ ] El titular **no** deja «¿no?» huérfano en su renglón.
- [ ] Las dos tarjetas del filtro quedan **de la misma altura** y se distinguen
      a simple vista sin leerlas.
- [ ] El bloque de «Quién lo enseña» está **centrado** en el contenedor, no
      pegado a la izquierda.
- [ ] «financiero-tecnológico» **no se parte** por el guion.
- [ ] El `+` de la suma cae en el canal entre las dos tarjetas.
- [ ] En 390 px todo apila y nada se desborda.

### Alturas — repórtalas

| | Antes | Referencia medida | Después |
|---|---|---|---|
| §01 hero · 1440 | | 532 px | |
| §01 hero · 390 | | 758 px | |
| §03 filtro · 1440 | | 321 px | |
| §04 maestros · 1440 | | 1,450 px | |
| `/finanzas` total | | | |

---

## Qué NO hacer

- No toques «Un webinar, un lugar» ni nada debajo. Jorge dijo que ya está bien.
- No toques «Esto es lo que vas a poder hacer» ni «Siempre se empieza abajo».
- No le escribas pie de foto al video.
- No cambies el copy de las dos listas del filtro.
- No uses `hero-split` en esta página: su columna visual de 18 rem hace
  ilegible la laptop.
- No quites el `overflow: hidden` de `.hero-fin`.
- No metas colores fuera de `tokens.css` más allá de los grises auxiliares
  listados, y no cambies sus valores.
- No conviertas la plantilla a JPG: tiene transparencia y se apoya en el fondo
  de la sección.

---

## Al terminar, reporta

1. Archivos tocados.
2. `npm run build` y `npm run medios`.
3. Los 8 greps.
4. **`scrollWidth` y `clientWidth` en 1440 y 390.**
5. Capturas de las tres secciones en 1440 y de la página completa en 390.
6. La tabla de alturas.
