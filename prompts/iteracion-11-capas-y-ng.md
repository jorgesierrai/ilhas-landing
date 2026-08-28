# Iteración 11 — Las tres capas, y el experimento explicado de verdad

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 27 ago 2026. Todo pasa en **`/metodo` §02 El hueco**.

> Rama nueva: **`capas-y-experimento`**, salida de `productos-y-mapa`.

---

## Por qué existe esta corrida

El bloque del experimento suelta tres porcentajes y espera que el lector
confíe. Jorge lo leyó y dijo: *«ni yo te entiendo»*. Si el dueño del sitio no
lo entiende, un contador tampoco.

**El problema de fondo:** el bloque nunca dice *qué se midió*, ni *cuál es la
trampa del experimento* — que el primer renglón y el tercero son **el mismo
modelo**. Ese es todo el argumento, y estaba escondido.

---

## Reglas

1. **Los porcentajes van literales y sin redondear.** Ya es regla del archivo
   (`metodo.astro:46`).
2. **Nada de jerga sin traducir.** Si aparece «agéntico», tiene que venir
   explicado en palabras normales antes.
3. **No inventes datos sobre HumanEval.** Los verificados están abajo.
4. **Cero JavaScript de cliente.**

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
Es el mismo para ti y para tu competencia"*.

**Actualiza el comentario de arriba** (`metodo.astro:257-259`) si menciona el
titular viejo.

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
cierra la duda de golpe — y engancha con el experimento de abajo, que compara
justo dos de ellos.

⚠️ **Guiones como en el resto del archivo**: `GPT-3.5`, `GPT-4`, igual que en
el arreglo `humanEval`. Puntos suspensivos, no "etc.".

⚠️ **Mide la fila después.** Esa celda hoy dice dos palabras y va a decir
siete. Si en 390 px se parte feo o empuja la columna de la derecha, repórtalo
con la medida antes de inventar un arreglo.

---

## 3 · El experimento — el trabajo grande de esta corrida

### 3.1 · El renglón de la tabla deja la jerga

`src/pages/metodo.astro:47-56`, arreglo `humanEval`. **Solo cambia el tercer
`condicion`. Las tres cifras no se tocan.**

```ts
  {
-   condicion: "GPT-3.5 con un flujo de trabajo agéntico alrededor",
+   condicion: "GPT-3.5 revisando y corrigiendo su propio trabajo",
    resultado: "hasta 95.1 %",
    destacada: true,
  },
```

«Flujo de trabajo agéntico» no le dice nada a un contador. La versión nueva
dice **qué hizo**, y así la tabla se entiende sola sin bajar a leer el párrafo.
La palabra «agéntico» reaparece abajo, ya explicada.

### 3.2 · Lo que va ANTES de la tabla

`src/pages/metodo.astro:286-292`

```
- <p class="ng__intro">
-   Andrew Ng lo midió en la prueba de programación HumanEval:
- </p>
+ <p class="ng__intro">
+   <strong>Te dejamos el resultado de un experimento.</strong>
+ </p>
+ <p class="ng__que">
+   OpenAI armó un examen para calificar modelos: <strong>164 ejercicios de
+   programación</strong>, cada uno con la instrucción de qué debía hacer el
+   programa. No se califica a ojo: corren el programa y ven si de verdad
+   hace lo que se pidió. El porcentaje es cuántos de los 164 salieron bien
+   <strong>al primer intento</strong>, sin ayuda y sin segundo tiro.
+ </p>
```

### 3.3 · Lo que va DESPUÉS de la tabla

`src/pages/metodo.astro:302-310`. **Este es el arreglo que importa.** Sustituye
el `ng__remate` viejo por estos tres párrafos:

```
- <p class="ng__remate">
-   Un modelo peor con mejor sistema le ganó a un modelo mejor sin
-   sistema. Y no por poco:{" "}
-   <strong>
-     la diferencia que hace el andamiaje es más grande que la
-     diferencia entre las dos generaciones de modelo.
-   </strong>
- </p>
+ <p class="ng__flujo">
+   Fíjate en el primer renglón y en el tercero:{" "}
+   <strong>es el mismo modelo</strong>. Lo único que cambia es que en el
+   tercero, en vez de entregar lo primero que escribió, lo dejaron leerlo,
+   probarlo, encontrar sus errores y corregirlos antes de entregar. Como
+   cuando tú relees un reporte antes de mandarlo. A eso Andrew Ng le llama
+   un <em>flujo de trabajo agéntico</em>.
+ </p>
+ <p class="ng__remate">
+   <strong>
+     Ese repaso movió hasta 47 puntos. Cambiar de GPT-3.5 a GPT-4 movió
+     18.9.
+   </strong>{" "}
+   Dos veces y media más.
+ </p>
+ <p class="ng__cierre">
+   Se midió en programación porque ahí la calificación no se discute: el
+   programa corre o no corre. Lo que mide es cuánto rinde una misma
+   herramienta según el proceso que le pongas alrededor.{" "}
+   <strong>
+     Esperar al siguiente modelo te mueve menos que armar el proceso
+     alrededor del que ya tienes.
+   </strong>
+ </p>
```

**Por qué en ese orden.** Primero se dice qué se midió, luego se enseñan los
números, luego se revela la trampa (mismo modelo), luego la cuenta, y al final
por qué eso le importa a alguien que no programa. Cada párrafo hace un trabajo
y solo uno.

### 3.4 · De dónde salen los dos números

Resta directa sobre las cifras de la tabla, no un dato nuevo:

| | Cuenta | Resultado |
|---|---|---|
| Lo que movió el repaso | 95.1 − 48.1 | **47.0 puntos** |
| Lo que movió cambiar de modelo | 67.0 − 48.1 | **18.9 puntos** |
| Cuántas veces más | 47.0 ÷ 18.9 | **2.49 →** «dos veces y media» |

El *«hasta»* de los 47 puntos **no es opcional**: la tabla dice *"hasta
95.1 %"*, así que la diferencia también es un techo. Quitarlo convierte un dato
honesto en uno inflado.

### 3.5 · Los datos verificados — no los cambies

- **HumanEval es de OpenAI.** 164 problemas escritos a mano, cada uno con firma
  de función, descripción, cuerpo y pruebas unitarias. Promedio de **7.7**
  pruebas por problema.
- **La métrica es *pass@1***: la primera respuesta del modelo pasa **todas** las
  pruebas del problema.
- **Andrew Ng *publicó*, no midió.** Reportó y comparó estos números en *The
  Batch* (DeepLearning.AI, 20 mar 2024). Decir que él corrió el experimento es
  más de lo que se sostiene — hoy el sitio dice *"Andrew Ng lo midió"* y eso se
  cae con este cambio.
- No metas el 7.7 en el copy: se probó y alarga sin agregar. Se queda aquí como
  respaldo por si alguien pregunta.

### 3.6 · El CSS de las clases nuevas

`.ng__que`, `.ng__flujo` y `.ng__cierre` heredan el tamaño y color de
`.ng__intro` (~línea 1132):

```css
  .ng__intro,
  .ng__que,
  .ng__flujo,
  .ng__cierre {
    margin: 0;
    font-size: 0.9375rem;
    color: var(--ilhas-text);
  }

  .ng__que { margin-top: 0.65rem; }
  .ng__flujo { margin-top: 1rem; }
  .ng__cierre { margin-top: 0.65rem; }
```

Ajusta el margen que ya traiga `.ng__remate` para que no se encime con
`.ng__flujo`. **No metas colores nuevos, ni gradiente, ni ícono.**

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

Es la palabra que separa a Ilhas de todo lo demás que se vende en el mercado, y
hoy va suelta al final de un párrafo. Ahora se ve.

⚠️ Quedan **dos `<strong>` en el mismo párrafo**. Míralo: si los dos compiten y
ninguno gana, dilo con captura y lo decidimos — no lo arregles quitando uno por
tu cuenta.

⚠️ La frase **no** cambia a *«te enseñamos a empezar a quitar primero con
criterio»*. Jorge lo consideró y decidió dejarla neutral, porque `/metodo`
sirve a los dos carriles. La nota de `prompts/iteracion-9-copy.md` §3.2 sigue
vigente en cuanto a que esta frase se conserva.

---

## Verificación

```bash
npm run build      # cero warnings
npm run medios     # sin ⚠ nuevos
```

Sobre `dist/metodo/index.html`. Estos van en **0**:

```bash
grep -c "y solo una es el modelo"      # 0
grep -c "Andrew Ng lo midió"           # 0
grep -c "Y no por poco"                # 0
grep -c "flujo de trabajo agéntico alrededor"  # 0 — la jerga sale de la tabla
grep -c "<script"                      # 0
```

Estos van en **≥ 1**:

```bash
grep -c "Te dejamos el resultado de un experimento"   # 1
grep -c "164 ejercicios"                               # 1
grep -c "es el mismo modelo"                           # 1
grep -c "relees un reporte"                            # 1
grep -c "hasta 47 puntos"                              # 1
grep -c "18.9"                                         # 1
grep -c "Gemini"                                       # 1
grep -c "empezamos por"                                # 1
```

Y las tres cifras siguen intactas y sin redondear:

```bash
grep -o "48\.1 %\|67\.0 %\|95\.1 %" dist/metodo/index.html | sort | uniq -c
# una de cada una
```

### Con el navegador

- [ ] **Léelo completo, de corrido, como si no supieras de IA.** Si en algún
      renglón tienes que releer para entender, ése es el que está mal. Repórtalo
      textual — es literalmente el objetivo de esta corrida.
- [ ] La celda **«El motor (GPT-3.5, GPT-4, Gemini, Sonnet, Opus…)» en 390 px**:
      que no se parta feo ni empuje la columna de la derecha.
- [ ] El bloque `.ng` con cuatro párrafos + tabla **no se ve como muro de
      texto**. Si se ve apretado, sube el `padding` del `.ng`; no bajes el texto.
- [ ] Los **dos `<strong>` del párrafo del proceso** conviven o compiten.
      Captura.
- [ ] 1440 × 900 y 390 × 844.

### Alturas — repórtalas

| | Antes | Después |
|---|---|---|
| `/metodo` §02 | 1,438 px | |
| `/metodo` total | | |

El bloque crece a propósito: pasa de dos párrafos a cuatro. Si §02 se pasa de
**1,800 px**, dilo y no lo escondas — se decide entonces qué se recorta.

---

## Qué NO hacer

- No redondees ninguno de los porcentajes.
- No quites el «hasta» de «hasta 47 puntos» ni el de «hasta 95.1 %».
- No escribas que Andrew Ng «midió» el experimento. Lo publicó.
- No dejes «agéntico» en la tabla: ahí va sin jerga, y la palabra aparece ya
  explicada en el párrafo de abajo.
- No inventes datos sobre HumanEval. Solo van los del punto 3.5.
- No le pongas ícono, color nuevo ni gradiente al bloque.
- No toques la línea de fuentes del final de §02.
- No cambies «Nosotros empezamos por quitar» por otra cosa: solo se le agregan
  las negritas.

---

## Al terminar, reporta

1. Archivos tocados (debe ser solo `src/pages/metodo.astro`).
2. `npm run build` y `npm run medios`.
3. Los 5 greps en 0 y los 8 en ≥ 1, más el de las tres cifras.
4. Capturas de §02 completa en 1440 y en 390.
5. La tabla de alturas.
6. **Tu lectura honesta del bloque nuevo**: si algo se sigue sintiendo confuso,
   dilo con la frase exacta.
