# Iteración 11 — Las tres capas, y el experimento explicado

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 27 ago 2026. Todo pasa en **`/metodo` §02 El hueco**.

> Rama nueva: **`capas-y-experimento`**, salida de donde viva la iteración 10.
>
> ⚠️ **Esto reemplaza una instrucción de la iteración 9.** La 9 decía que
> *«Todos venden automatizar más. Nosotros empezamos por quitar.»* se quedaba
> tal cual. Jorge cambió de opinión: ver el punto 4.

---

## Reglas

1. **El copy es de Jorge.** Lo que él escribió va literal; lo que yo escribí
   está marcado y él ya lo aprobó.
2. **Los porcentajes de HumanEval van literales y sin redondear.** Ya es regla
   del archivo (`metodo.astro:46`) y sigue siéndolo.
3. **No toques el bloque de fuentes** al final de §02. Sigue citando bien.
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
el arreglo `humanEval`. Y puntos suspensivos, no "etc." — es más corto y la
celda es angosta.

⚠️ **Mide la fila después.** Esa celda hoy dice dos palabras y va a decir
siete. Si en 390 px se parte feo o empuja la columna de la derecha, repórtalo
con la medida antes de inventar un arreglo.

---

## 3 · El experimento — lo más importante de esta corrida

Jorge quiere que se entienda **qué es HumanEval y qué miden esos porcentajes.**
Hoy el sitio suelta tres cifras y espera que el lector confíe. Un contador o un
dueño de empresa no sabe qué es HumanEval, así que las cifras no le prueban
nada.

### 3.1 · Lo que va antes de la tabla

`src/pages/metodo.astro:286-292`

```
- <p class="ng__intro">
-   Andrew Ng lo midió en la prueba de programación HumanEval:
- </p>
+ <p class="ng__intro">
+   <strong>Te dejamos el resultado de un experimento.</strong>
+ </p>
+ <p class="ng__que">
+   HumanEval es un examen de programación que armó OpenAI: 164 problemas,
+   cada uno con la descripción de lo que el programa debe hacer y las
+   pruebas que tiene que pasar —casi ocho pruebas por problema—. El
+   porcentaje es cuántos resolvió el modelo <strong>a la primera</strong>:
+   código que pasa todas las pruebas, sin ayuda y sin segundo intento.
+   Andrew Ng publicó estos resultados en marzo de 2024.
+ </p>
```

⚠️ **«Publicó», no «midió».** Hoy dice *"Andrew Ng lo midió"* y eso es más de
lo que se puede sostener: Ng reportó y comparó estos números en *The Batch*, no
corrió el experimento. La corrección es chica y evita un reclamo que no
aguanta.

**Los datos verificados** (no los cambies): HumanEval es de OpenAI, son **164**
problemas escritos a mano, cada uno con firma de función, descripción, cuerpo y
pruebas unitarias, con un promedio de **7.7** pruebas por problema. La métrica
es *pass@1*: la primera respuesta del modelo pasa **todas** las pruebas.

### 3.2 · La tabla no cambia

`humanEval` en `metodo.astro:47-56` se queda igual. Los tres renglones, las
tres cifras, el destacado en el tercero.

### 3.3 · Lo que va después de la tabla

`src/pages/metodo.astro:302-310`

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
+   Ese «flujo de trabajo» quiere decir algo que ya conoces: dejarlo
+   escribir un borrador, revisar su propio trabajo, encontrar sus errores
+   y corregirlos antes de entregar.
+ </p>
+ <p class="ng__remate">
+   <strong>
+     El proceso movió hasta 47 puntos. Cambiar de generación de modelo
+     movió 18.9.
+   </strong>{" "}
+   Dos veces y media más.
+ </p>
+ <p class="ng__cierre">
+   Esperar al siguiente modelo te mueve menos que armar el proceso
+   alrededor del que ya tienes hoy.
+ </p>
```

**De dónde salen los dos números.** Son resta directa sobre las cifras de la
tabla, no un dato nuevo:

| | Cuenta | Resultado |
|---|---|---|
| Lo que movió el proceso | 95.1 − 48.1 | **47.0 puntos** |
| Lo que movió el cambio de modelo | 67.0 − 48.1 | **18.9 puntos** |
| Cuántas veces más | 47.0 ÷ 18.9 | **2.49 →** «dos veces y media» |

El *«hasta»* de los 47 puntos **no es opcional**: la tabla dice *"hasta
95.1 %"*, así que la diferencia también es un techo. Quitarlo convierte un dato
honesto en uno inflado.

Esto es lo que le faltaba a la sección: antes decía *"más grande que"* y no
decía cuánto. Ahora dice cuánto, y se puede verificar con una resta.

### 3.4 · El CSS de las dos clases nuevas

`.ng__que` y `.ng__flujo` y `.ng__cierre` heredan el mismo tamaño y color que
`.ng__intro` (línea ~1132). Súmalas al mismo selector y dales su separación:

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

## 4 · El párrafo del proceso — copy nuevo de Jorge

`src/pages/metodo.astro:312-318`

```
- La otra mitad del problema es el proceso. Automatizar un proceso que
- está mal solo{" "}
- <strong>lo hace fallar más rápido y a mayor escala.</strong> Todos
- venden automatizar más. Nosotros empezamos por quitar.
+ La otra mitad del problema es el proceso. Automatizar un proceso que
+ está mal solo{" "}
+ <strong>lo hace fallar más rápido y a mayor escala.</strong> Todos
+ venden automatizar más. Nosotros te enseñamos a empezar a quitar
+ primero con criterio.
```

Solo cambia la última frase. **Va literal como la escribió Jorge.**

⚠️ Esto **contradice a propósito** la nota de `prompts/iteracion-9-copy.md`
§3.2, que decía que esa frase se quedaba tal cual. Manda ésta.

---

## Verificación

```bash
npm run build      # cero warnings
npm run medios     # sin ⚠ nuevos
```

Sobre `dist/metodo/index.html`. Estos van en **0**:

```bash
grep -c "y solo una es el modelo"     # 0
grep -c "Andrew Ng lo midió"          # 0
grep -c "Y no por poco"               # 0
grep -c "Nosotros empezamos por quitar" # 0
grep -c "<script"                     # 0
```

Estos van en **≥ 1**:

```bash
grep -c "Te dejamos el resultado de un experimento"   # 1
grep -c "164 problemas"                                # 1
grep -c "Andrew Ng publicó"                            # 1
grep -c "hasta 47 puntos"                              # 1
grep -c "18.9"                                         # 1
grep -c "empezar a quitar primero con criterio"        # 1
grep -c "Gemini"                                       # 1
```

Y las tres cifras originales siguen intactas y sin redondear:

```bash
grep -o "48\.1 %\|67\.0 %\|95\.1 %" dist/metodo/index.html | sort | uniq -c
# tiene que salir una de cada una
```

### Con el navegador

- [ ] **La celda «El motor (GPT-3.5, GPT-4, Gemini, Sonnet, Opus…)» en 390 px.**
      Que no se parta feo ni empuje la columna de la derecha fuera de la
      tarjeta. Si se rompe, reporta la medida — no la arregles a ojo.
- [ ] El bloque `.ng` con cuatro párrafos + tabla **no se ve como muro de
      texto**. Si se ve apretado, sube el `padding` del `.ng`, no bajes el
      texto.
- [ ] El titular corto no queda huérfano ni desbalanceado sin su segunda mitad.
- [ ] 1440 × 900 y 390 × 844.

### Alturas — repórtalas

| | Antes | Después |
|---|---|---|
| `/metodo` §02 | 1,438 px | |
| `/metodo` total | | |

El bloque crece a propósito: pasa de dos párrafos a cuatro. Si §02 se pasa de
**1,750 px**, dilo y no lo escondas — se decide entonces qué se recorta.

---

## Qué NO hacer

- No redondees ninguno de los porcentajes de HumanEval.
- No quites el «hasta» de «hasta 47 puntos» ni el de «hasta 95.1 %».
- No escribas que Andrew Ng «midió» el experimento. Lo publicó.
- No inventes datos sobre HumanEval: los que van son 164 problemas, 7.7 pruebas
  por problema, OpenAI, y *pass@1*. Nada más.
- No le pongas ícono, color nuevo ni gradiente al bloque del experimento.
- No toques la línea de fuentes del final de §02.

---

## Al terminar, reporta

1. Archivos tocados (debe ser solo `src/pages/metodo.astro`).
2. `npm run build` y `npm run medios`.
3. Los 5 greps en 0 y los 7 en ≥ 1, más el de las tres cifras.
4. Capturas de §02 completa en 1440 y en 390.
5. La tabla de alturas.
