# Iteración 11 — Las tres capas, y el experimento como figura

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 27 ago 2026. Todo pasa en **`/metodo` §02 El hueco**.

> Rama nueva: **`capas-y-experimento`**, salida de `productos-y-mapa`.
>
> **Referencia visual: `medios/experimento-referencia.html`.** Trae las dos
> versiones que se midieron, una encima de otra. **La buena es la B.** Ábrela
> antes de escribir código y copia la figura de ahí.

---

## Por qué existe esta corrida

El bloque del experimento suelta tres porcentajes y espera que el lector
confíe. Jorge lo leyó y dijo *«ni yo te entiendo»*. Si el dueño del sitio no le
entiende, un contador tampoco.

Dos problemas, no uno:

1. **Nunca dice qué se midió**, ni cuál es la trampa del experimento — que dos
   de los tres renglones son **el mismo modelo**. Ese es todo el argumento y
   estaba escondido detrás de la palabra «agéntico».
2. **Explicarlo en prosa lo hace larguísimo.** Se midió: la versión en prosa
   deja el bloque en 675 px de escritorio y **1,091 px de móvil**. Eso empuja
   §02 a casi 2,900 px en teléfono.

La salida no es esconder texto en un desplegable — es **cambiar de medio**. La
relación entre tres números se dibuja; describirla con palabras es la forma más
larga de decirla.

| | Bloque hoy | En prosa | **Como figura** |
|---|---|---|---|
| 1440 px | 307 px | 675 px | **492 px** |
| 390 px | 455 px | 1,091 px | **758 px** |

---

## Reglas

1. **Los porcentajes van literales y sin redondear.** Ya es regla del archivo
   (`metodo.astro:46`).
2. **Nada de jerga sin traducir.** «Agéntico» no aparece en la figura.
3. **No inventes datos sobre HumanEval.** Los verificados están en el punto 3.5.
4. **Cero JavaScript de cliente.** La figura son tres `<div>` con un `width`
   en porcentaje. Nada de librerías de gráficas.

---

## 1 · El titular de las tres capas

`src/pages/metodo.astro:260-262`

```
- <h3 class="capas__titulo">
-   Un resultado con IA tiene tres capas, y solo una es el modelo.
- </h3>
+ <h3 class="capas__titulo">Un resultado con IA tiene tres capas.</h3>
```

La segunda mitad la dice la tabla sola: la fila del modelo ya trae *"De todos.
Es el mismo para ti y para tu competencia"*. **Actualiza el comentario de
arriba** (`metodo.astro:257-259`) si menciona el titular viejo.

---

## 2 · La fila del modelo, con nombres

`src/pages/metodo.astro:25-30`, dentro de `capasIA`

```ts
  {
    nombre: "El modelo",
-   que: "El motor",
+   que: "El motor (GPT-3.5, GPT-4, Gemini, Sonnet, Opus…)",
    dueno: "De todos. Es el mismo para ti y para tu competencia",
    tuya: false,
  },
```

Jorge preguntó si «el modelo» es eso, y sí: es exactamente eso. Nombrarlos
cierra la duda de golpe — y engancha con la figura de abajo, que compara justo
dos de ellos.

⚠️ **Guiones como en el resto del archivo**: `GPT-3.5`, `GPT-4`. Puntos
suspensivos, no "etc.".

⚠️ **Mide la fila después.** Esa celda hoy dice dos palabras y va a decir
siete. Si en 390 px se parte feo o empuja la columna de la derecha, repórtalo
con la medida antes de inventar un arreglo.

---

## 3 · El experimento se vuelve figura

### 3.1 · El arreglo de datos

`src/pages/metodo.astro:47-56`. **Se reordena y se le agrega el ancho de la
barra.** Las tres cifras no cambian.

```ts
// Andrew Ng, The Batch (DeepLearning.AI), 20 mar 2024, sobre HumanEval.
// Los porcentajes van literales y SIN redondear.
//
// Van AGRUPADOS POR MODELO, no por resultado: así las dos de GPT-3.5 quedan
// pegadas y se ve de un vistazo que el salto de 48.1 a 95.1 pasó sin cambiar
// de modelo. Ese es el argumento entero de la sección.
const humanEval = [
  { modelo: "GPT-3.5", condicion: "tal cual",
    resultado: "48.1 %", ancho: 48.1, nuestro: true },
  { modelo: "GPT-3.5", condicion: "revisando y corrigiendo su propio trabajo",
    resultado: "hasta 95.1 %", ancho: 95.1, nuestro: true },
  { modelo: "GPT-4", condicion: "tal cual — el modelo de la siguiente generación",
    resultado: "67.0 %", ancho: 67.0, nuestro: false },
];
```

`nuestro: true` marca las dos de GPT-3.5, que van del mismo color.

### 3.2 · El marcado

Sustituye todo el `<div class="ng">` (`metodo.astro:~285-310`) por esto:

```jsx
<div class="ng">
  <p class="ng__intro">
    <strong>Te dejamos el resultado de un experimento.</strong>
  </p>
  <p class="ng__que">
    OpenAI armó un examen para calificar modelos de IA:{" "}
    <strong>164 ejercicios de programación</strong>. No se califica a ojo —
    corren el programa y ven si hace lo que se pidió. Esto es cuántos
    salieron bien <strong>al primer intento</strong>.
  </p>

  <div class="fig">
    <div class="fig__llave" aria-hidden="true"><span>el mismo modelo</span></div>
    <ul class="fig__barras">
      {humanEval.map((f) => (
        <li class:list={["barra", f.nuestro && "barra--nuestro"]}>
          <span class="barra__rotulo"><b>{f.modelo}</b> {f.condicion}</span>
          <span class="barra__cifra">{f.resultado}</span>
          <span class="barra__via">
            <span class="barra__marca" style={`width:${f.ancho}%`} />
          </span>
        </li>
      ))}
    </ul>
  </div>

  <p class="ng__remate">
    Las dos primeras son <strong>el mismo modelo</strong>. Lo único que
    cambia es que a la segunda la dejaron leer lo que escribió, probarlo y
    corregirlo antes de entregar — como cuando tú relees un reporte antes de
    mandarlo.{" "}
    <strong>
      Ese repaso movió 47 puntos; comprar el modelo nuevo movió 18.9.
    </strong>
  </p>
  <p class="ng__cierre">
    Esperar al siguiente modelo te mueve menos que armar el proceso alrededor
    del que ya tienes.
  </p>
</div>
```

**Se cae `.ng__filas` y `.ng__fila` del CSS**, que ya no se usan.

### 3.3 · El CSS — cópialo de la referencia, no lo reinventes

```css
  .ng__intro,
  .ng__que,
  .ng__remate,
  .ng__cierre {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--ilhas-text);
  }
  .ng__que { margin-top: 0.65rem; }
  .ng__remate { margin-top: 1rem; }
  .ng__cierre { margin-top: 0.65rem; }

  .fig { margin-top: 1.1rem; }
  .fig__barras { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.9rem; }

  .barra {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 0.15rem 0.75rem;
    align-items: baseline;
  }
  .barra__rotulo { grid-column: 1; font-size: 0.875rem; line-height: 1.35; }
  .barra__rotulo b { font-weight: 600; color: var(--ilhas-dark); }
  .barra__cifra {
    grid-column: 2; grid-row: 1;
    font-family: var(--ilhas-font-display); font-weight: 600;
    font-size: 1.0625rem; color: var(--ilhas-text);
    font-variant-numeric: tabular-nums; white-space: nowrap;
  }
  .barra__via {
    grid-column: 1 / -1; grid-row: 2;
    height: 10px; border-radius: 5px; background: rgba(14, 14, 15, 0.06);
  }
  .barra__marca { display: block; height: 100%; border-radius: 5px; background: #8C8AA8; }

  /* Mismo modelo, mismo color. Lo que cambia entre las dos es el LARGO,
     que es justo el argumento. */
  .barra--nuestro .barra__marca { background: var(--ilhas-primary); }
  .barra--nuestro .barra__cifra { color: var(--ilhas-primary); }

  /* La llave que agrupa las dos de GPT-3.5. Solo en escritorio: en móvil el
     color y los rótulos ya lo dicen, y una llave vertical de 20 px estorba. */
  .fig__llave { display: none; }

  @media (min-width: 720px) {
    .fig { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 1rem; }
    .fig__llave { display: block; position: relative; width: 1.25rem; margin-block: 0.15rem 0; }
    .fig__llave::before {
      content: ""; position: absolute; inset: 0.55rem auto auto 0;
      width: 9px; height: calc(50% + 0.1rem);
      border: 1.5px solid rgba(122, 60, 255, 0.4); border-right: 0;
      border-radius: 5px 0 0 5px;
    }
    .fig__llave span {
      position: absolute; top: calc(25% + 0.3rem); left: 0.7rem;
      transform: translateY(-50%) rotate(180deg); writing-mode: vertical-rl;
      font-size: 0.6875rem; letter-spacing: 0.04em;
      color: var(--ilhas-primary); white-space: nowrap;
    }
  }
```

**Sobre el `#8C8AA8` de la barra de GPT-4.** Es pizarra fría, deliberadamente
recesiva: no compite con el morado. Se corrió el validador de paletas — separa
del morado con ΔE 20 en protanopia y 26 en visión normal, muy por encima del
piso — y **no cumple el piso de croma a propósito**, porque no es una categoría
que pelee por atención, es el punto de referencia. La identidad nunca va sola en
el color: **cada barra trae su modelo escrito**.

### 3.4 · De dónde salen los dos números del remate

Resta directa sobre las cifras de la figura, no un dato nuevo:

| | Cuenta | Resultado |
|---|---|---|
| Lo que movió el repaso | 95.1 − 48.1 | **47.0 puntos** |
| Lo que movió cambiar de modelo | 67.0 − 48.1 | **18.9 puntos** |

⚠️ El **«hasta 95.1 %»** de la barra **no se toca**: es como lo publicó Ng y
quitarlo infla el dato.

### 3.5 · Los datos verificados — no los cambies

- **HumanEval es de OpenAI.** 164 problemas escritos a mano, cada uno con firma
  de función, descripción, cuerpo y pruebas unitarias. Promedio de 7.7 pruebas
  por problema. *(El 7.7 no va en el copy: alarga y no agrega. Queda aquí de
  respaldo.)*
- **La métrica es *pass@1***: la primera respuesta pasa **todas** las pruebas.
- **Andrew Ng *publicó*, no midió.** Reportó y comparó estos números en *The
  Batch* (DeepLearning.AI, 20 mar 2024). Hoy el sitio dice *"Andrew Ng lo
  midió"* y eso se cae con este cambio — la cita formal ya vive en la línea de
  fuentes del final de §02, que **no se toca**.
- **La palabra «agéntico» sale del bloque.** No le dice nada a un contador y la
  figura ya muestra qué es. La cita de Ng en las fuentes conserva el rigor.

---

## 4 · El párrafo del proceso — «quitar» en negritas

`src/pages/metodo.astro:312-318`

La frase se queda **como está hoy**. Lo único que cambia es que **«quitar» va
en `<strong>`**:

```
  La otra mitad del problema es el proceso. Automatizar un proceso que
  está mal solo{" "}
  <strong>lo hace fallar más rápido y a mayor escala.</strong> Todos
- venden automatizar más. Nosotros empezamos por quitar.
+ venden automatizar más. Nosotros empezamos por{" "}
+ <strong>quitar</strong>.
```

Es la palabra que separa a Ilhas de todo lo demás que se vende, y hoy va suelta
al final de un párrafo.

⚠️ Quedan **dos `<strong>` en el mismo párrafo**. Míralo: si compiten y ninguno
gana, dilo con captura y se decide — no lo arregles quitando uno por tu cuenta.

⚠️ La frase **no** cambia a *«te enseñamos a empezar a quitar primero con
criterio»*. Jorge lo consideró y decidió dejarla neutral, porque `/metodo`
sirve a los dos carriles.

---

## Verificación

```bash
npm run build      # cero warnings
npm run medios     # sin ⚠ nuevos
```

Sobre `dist/metodo/index.html`. Estos van en **0**:

```bash
grep -c "y solo una es el modelo"   # 0
grep -c "Andrew Ng lo midió"        # 0
grep -c "Y no por poco"             # 0
grep -c "agéntico"                  # 0 — la jerga sale del bloque
grep -c "<script"                   # 0 — la figura es CSS, no una librería
```

Estos van en **≥ 1**:

```bash
grep -c "Te dejamos el resultado de un experimento"  # 1
grep -c "164 ejercicios"                              # 1
grep -c "el mismo modelo"                             # ≥ 1
grep -c "relees un reporte"                           # 1
grep -c "movió 47 puntos"                             # 1
grep -c "18.9"                                        # 1
grep -c "Gemini"                                      # 1
grep -c "empezamos por"                               # 1
```

Y las tres cifras siguen intactas y sin redondear:

```bash
grep -o "48\.1 %\|67\.0 %\|95\.1 %" dist/metodo/index.html | sort | uniq -c
# una de cada una
```

### Con el navegador

- [ ] **Léelo de corrido como si no supieras de IA.** Si en algún renglón hay
      que releer, ése está mal. Repórtalo textual — es el objetivo de la corrida.
- [ ] **Las tres barras miden lo que dicen.** Comprueba el `width` calculado:
      48.1 %, 95.1 % y 67.0 % del ancho de la vía. Una barra que miente sobre su
      propio número es peor que no tener figura.
- [ ] **La llave de «el mismo modelo»** abarca las dos primeras barras y ninguna
      más. En menos de 720 px desaparece.
- [ ] La celda **«El motor (GPT-3.5, GPT-4, Gemini, Sonnet, Opus…)» en 390 px**:
      que no se parta feo ni empuje la columna de la derecha.
- [ ] Los **dos `<strong>` del párrafo del proceso** conviven o compiten. Captura.
- [ ] 1440 × 900 y 390 × 844.

### Alturas — repórtalas

| | Antes | Meta | Después |
|---|---|---|---|
| bloque `.ng` · 1440 | 307 px | ~492 px | |
| bloque `.ng` · 390 | 455 px | ~758 px | |
| `/metodo` §02 · 1440 | 1,438 px | < 1,700 px | |
| `/metodo` §02 · 390 | 2,190 px | < 2,600 px | |
| `/metodo` total | | | |

Si §02 se pasa de la meta, dilo y no lo escondas.

---

## Qué NO hacer

- **No metas una librería de gráficas.** Son tres divs con `width` en
  porcentaje. Cargar Chart.js para esto rompe la regla de cero JS.
- No redondees ninguno de los porcentajes.
- No quites el «hasta» de «hasta 95.1 %».
- No escribas que Andrew Ng «midió» el experimento. Lo publicó.
- No metas ejes, cuadrícula, leyenda ni tooltip. Cada barra ya trae su rótulo
  y su cifra escritos: una leyenda repetiría lo que ya está en la barra.
- No cambies el orden de los tres renglones: van agrupados por modelo a
  propósito.
- No le pongas ícono ni gradiente a la figura.
- No toques la línea de fuentes del final de §02.
- No cambies «Nosotros empezamos por quitar»: solo se le agregan las negritas.

---

## Al terminar, reporta

1. Archivos tocados (debe ser solo `src/pages/metodo.astro`).
2. `npm run build` y `npm run medios`.
3. Los 5 greps en 0 y los 8 en ≥ 1, más el de las tres cifras.
4. **El ancho calculado de las tres barras**, para probar que no mienten.
5. Capturas de §02 completa en 1440 y en 390.
6. La tabla de alturas.
7. Tu lectura honesta del bloque: si algo se sigue sintiendo confuso, dilo con
   la frase exacta.
