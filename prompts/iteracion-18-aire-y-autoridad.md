# Iteración 18 — El aire de arriba, y la § autoridad de `/nosotros`

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 28 ago 2026.

> Rama: **`aire-y-autoridad`**, salida de donde quedó la 17.
>
> **Referencia: `medios/autoridad-referencia.html`.** Ya está construida y
> medida (2,265 px en escritorio, 2,712 px en móvil).

---

## 1 · El aire de arriba en `/metodo` y `/soluciones`

Jorge: *«en la parte de hasta arriba hay mucho espacio, redúcelo y déjalo como
en el Home o como en Ilhas Finanzas»*.

**Son dos causas distintas, una por página.** Se revisó el código de las cuatro
y no es el mismo problema.

### 1.1 · `/metodo` — usa el espaciado grande

`src/pages/metodo.astro:231`

```
- <section class="section-y">
+ <section class="section-y-sm">
```

`/soluciones`, `/finanzas` y `/nosotros` ya abren con `section-y-sm`;
`/metodo` era la única con `section-y`. Eso son **120 px arriba en escritorio
contra 40** — exactamente el aire que Jorge está viendo.

### 1.2 · `/soluciones` — el hueco es una ranura vacía

Aquí el `section-y-sm` ya estaba bien. **El espacio lo mete un placeholder:**
`soluciones-hero-loop` sale `FALTA` en `npm run medios`, y el `<Loop>` del
hero no está envuelto en `mostrar()`, así que renderiza la tarjeta `Ranura`
—con su padding— dentro del `hero-split`.

`src/pages/soluciones.astro`, la columna visual del hero:

```jsx
{mostrar("soluciones-hero-loop") && (
  <div class="hero-split__visual" aria-hidden="true">
    <Loop id="soluciones-hero-loop" ratio="1 / 1">…</Loop>
  </div>
)}
```

⚠️ **Envuelve el `<div class="hero-split__visual">` completo, no solo el
`<Loop>`.** Si dejas el div, el grid conserva la columna vacía y el hero sigue
descentrado.

⚠️ **La ranura NO se borra del manifiesto.** El activo sigue pendiente; lo que
cambia es que deja de ocupar espacio hasta que llegue. Es el mismo patrón que
ya usan las otras páginas.

**Mide `/metodo` y `/soluciones` antes y después y repórtalo.**

---

## 2 · La § autoridad de `/nosotros`

`src/pages/nosotros.astro:152-230`

### 2.1 · El problema

Hoy son **tres bloques apilados sin relación**: el de radio, una foto suelta y
un clip suelto. Y el rótulo de la sección dice *«Imagen Radio · enero 2018»*,
que **solo describe la primera pieza** — las otras dos son de otro evento y
otra fecha.

### 2.2 · La idea: tres momentos, en orden

Al preguntarle, Jorge cerró una duda que el manifiesto traía abierta desde el
24 de agosto: **el clip es de noviembre de 2017, no de Talent Land.** Con eso
las tres piezas tienen fecha, y ordenadas dan una línea:

| | Fecha | Qué es |
|---|---|---|
| 1 | **Noviembre 2017** | Escenario — el clip |
| 2 | **Enero 2018** | Imagen Radio · RMX — el video vertical y las citas |
| 3 | **Abril 2018** | Talent Land — las dos fotos |

**Eso hace dos cosas que el apilado no hacía.** El titular dice *«desde 2017»*
y ahora el primer momento **es** de 2017, así que la afirmación se prueba
sola. Y las tres dejan de ser medios sueltos: se recorren hacia adelante.

⚠️ **No las reordenes.** El orden cronológico es el argumento.

### 2.3 · El rótulo de la sección

```
- <p class="kicker">Imagen Radio · enero 2018</p>
+ <p class="kicker">En público</p>
```

Esa fecha **baja** a la cabecera del momento 2, que es a lo que de verdad se
refiere.

### 2.4 · El texto de entrada — copy de Jorge, va literal

Debajo del `<h2>`, como `.lead`:

> Desde 2017 que comenzamos a comunicar lo que estábamos haciendo, teníamos la
> visión de que la IA iba a ser accesible para todos, tanto en la vida diaria
> como en sus trabajos. Comunicábamos cómo estaba siendo creada, entrenada y
> facilitada para que cualquier persona pudiera utilizarla.

⚠️ Único ajuste sobre lo que escribió Jorge: *«teníamos la visión **que** la IA
iba a ser»* → *«la visión **de que** la IA iba a ser»*. Concordancia, nada más.

Jorge dijo que este texto cubre **tanto el clip del escenario como Talent
Land**, por eso va de entrada a toda la sección y no repetido en cada uno.

### 2.5 · La cabecera de cada momento

```jsx
<div class="momento__cabeza">
  <span class="momento__fecha">Noviembre 2017</span>
  <span class="momento__que">Escenario</span>
</div>
```

Fecha en `--ilhas-grad-start` (cian, que sobre el fondo oscuro sí pasa
contraste), el qué en gris, y una regla de 1 px debajo.

### 2.6 · Los pies de foto — el contexto que pidió Jorge

Salen de `src/data/historial.ts`, que ya trae **el copy aprobado de Jorge**
para esos mismos hitos. No se inventa nada:

| Momento | Pie |
|---|---|
| Escenario, nov 2017 | **Presenta Coophi y hacia dónde ve que va la IA.** |
| Talent Land, abr 2018 | **Sala llena, hablando de cómo se construye IA.** La misma charla en dos encuadres: cuánta gente había, y la pregunta que estaba en pantalla. |

El bloque de radio ya traía su firma y su enlace; se quedan.

### 2.7 · Las dos fotos de Talent Land

Jorge pidió meter **la que está en el Home** junto a la de sala llena.

- Izquierda: `nosotros-conferencia` — la sala llena. **Prueba la escala.**
- Derecha: `home-hero-conferencia` — el recorte del Home. **Prueba de qué
  estaba hablando**: se lee la pregunta en pantalla.

```css
@media (min-width: 820px) {
  /* Las columnas van en proporción a la relación de aspecto de cada foto
     (1.93 y 1.29) para que las dos midan lo mismo de alto sin recortar
     ninguna. */
  .talent { grid-template-columns: 1.93fr 1.29fr; align-items: start; }
}
```

⚠️ **Usa `home-hero-conferencia`, NO `nosotros-conferencia-detalle`.** Se
probaron las dos: el `detalle` en crudo es **otra toma de sala desde un
costado**, y junto a la de sala llena se ven redundantes. El recorte del Home
es el que se acerca a Jorge y deja legible la pantalla — y es literalmente el
que Jorge pidió.

⚠️ En `src/data/medios.ts`, la ranura `home-hero-conferencia` pasa de
`pagina: "home"` a **`pagina: "compartido"`**, y su `seccion` nombra los dos
lugares. Es el mismo trato que las capturas de producto.

### 2.8 · El clip, y la duda que se cierra

`src/data/medios.ts`, ranura `nosotros-conferencia-clip`. Sus `notas` dicen
hoy:

> *PENDIENTE DE JORGE: los dos briefs del 24 ago se contradicen sobre este
> clip. BRIEF-historial lo da como conferencia de noviembre 2017 sin nombre de
> evento; el addendum de BRIEF-autoridad-radio lo da como Talent Land. Por eso
> va SIN caption.*

**Jorge lo resolvió: es noviembre de 2017.** Actualiza la ranura:

```ts
+ caption: "Escenario · noviembre 2017",
  notas:
-   "PENDIENTE DE JORGE: los dos briefs del 24 ago se contradicen…",
+   "Resuelto por Jorge el 28 ago 2026: es la conferencia de NOVIEMBRE 2017, no Talent Land. Los dos briefs del 24 ago se contradecían y por eso la ranura estuvo sin caption. Talent Land (abr 2018) son las FOTOS, no este clip.",
```

⚠️ **No vuelvas a poner «Talent Land» en este clip.** Es la confusión que
acaba de cerrarse.

---

## Verificación

```bash
npm run build      # cero warnings
npm run medios     # soluciones-hero-loop sigue como FALTA — es correcto
```

```bash
# El aire de arriba
grep -c 'class="section-y">' dist/metodo/index.html   # el H1 ya no cuelga de section-y

# La ranura vacía deja de renderizar en el hero de soluciones
grep -c "ranura\|Ranura" dist/soluciones/index.html   # 0 en el hero

# Los tres momentos, con sus fechas
grep -c "Noviembre 2017"  dist/nosotros/index.html    # 1
grep -c "Enero 2018"      dist/nosotros/index.html    # 1
grep -c "Abril 2018"      dist/nosotros/index.html    # 1
grep -c "En público"      dist/nosotros/index.html    # 1
grep -c "Imagen Radio · enero 2018" dist/nosotros/index.html   # 0 — ya no es el rótulo

# El copy de Jorge
grep -c "accesible para todos"  dist/nosotros/index.html   # 1
grep -c "entrenada y facilitada" dist/nosotros/index.html  # 1

# Las dos fotos de Talent Land
grep -c "nosotros-conferencia"   dist/nosotros/index.html  # ≥1
grep -c "home-hero-conferencia"  dist/nosotros/index.html  # ≥1

# El clip ya no está sin caption, y NO dice Talent Land
grep -c "Escenario · noviembre 2017" dist/nosotros/index.html  # 1
```

### Con el navegador

- [ ] **`/metodo` y `/soluciones` arrancan con el mismo aire que el Home y
      `/finanzas`.** Compara las cuatro con captura, no de memoria.
- [ ] En `/soluciones` el hero **no deja columna vacía** a la derecha: el texto
      debe ocupar el ancho o quedar centrado, no descuadrado.
- [ ] Los tres momentos se leen **en orden y con su fecha**.
- [ ] Las dos fotos de Talent Land **miden lo mismo de alto** y ninguna sale
      recortada ni deformada.
- [ ] En la foto derecha **se lee la pregunta de la pantalla**. Si no se lee,
      la foto no está haciendo su trabajo — repórtalo.
- [ ] En 390 px todo apila y no hay scroll horizontal.
- [ ] 1440 × 900 y 390 × 844.

### Alturas — repórtalas

| | Antes | Referencia | Después |
|---|---|---|---|
| `/metodo` §01 · 1440 | | | |
| `/soluciones` §01 · 1440 | | | |
| `/nosotros` § autoridad · 1440 | | 2,265 px | |
| `/nosotros` § autoridad · 390 | | 2,712 px | |

---

## Qué NO hacer

- No reordenes los tres momentos: el orden cronológico es el argumento.
- No vuelvas a etiquetar el clip como Talent Land.
- No uses `nosotros-conferencia-detalle` para la segunda foto; va el recorte
  del Home.
- No borres `soluciones-hero-loop` del manifiesto: sigue pendiente.
- No inventes pies de foto: los dos salen de `historial.ts`.
- No le quites el `.lead` a la sección para «ahorrar espacio» — es la única
  parte donde Jorge explica la visión de 2017.
- No cambies el `<h2>`.

---

## Al terminar, reporta

1. Archivos tocados.
2. `npm run build` y `npm run medios`.
3. Todos los greps.
4. Capturas del arranque de las cuatro páginas (Home, `/metodo`,
   `/soluciones`, `/finanzas`) **lado a lado**, para probar que el aire quedó
   parejo.
5. Captura de la § autoridad completa, 1440 y 390.
6. La tabla de alturas.
