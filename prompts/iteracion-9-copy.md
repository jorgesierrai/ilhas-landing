# Iteración 9 — Quitarle el tic de IA al copy

**Para Claude Code. Ejecuta esto tal cual.**
Aprobado por Jorge el 27 ago 2026, línea por línea.

> Rama nueva: **`copy-sin-tic`**, salida de `visor-practica` (donde vive la 8).

---

## Qué es esto

Barrimos el copy de las cinco páginas construidas. Salieron **28 casos de la
misma forma de frase**: montar una negación y corregirla enseguida —
*«no es X, es Y»*, *«X — no Y, sino Z»*, *«no A: B»*.

Cualquiera de ellas, sola, se lee bien. Veintiocho seguidas se leen a máquina.
Jorge lo cachó leyendo `/metodo` §03 y tiene razón.

**Esto es cirugía de copy, no rediseño.** No se toca una sola línea de CSS, ni
una estructura, ni un componente. Solo texto.

---

## Reglas

1. **Reemplaza el texto exacto que se indica. Nada más.** Si un párrafo no está
   en esta lista, no lo toques aunque se te antoje.
2. **No inventes copy nuevo.** Cada reemplazo ya está escrito abajo.
3. **Respeta el `<strong>`, el `<em>` y el `{" "}` que ya existan** donde el
   reemplazo los conserve. Donde el reemplazo cambie la frase entera, rearma el
   marcado según lo que se indique.
4. **No toques nada de lo que está en la sección «Lo que NO se toca».** Ahí hay
   frases con la misma forma que se quedan a propósito.

---

## 1 · Los cuatro titulares

Cuatro `<h2>` en tres páginas con la misma plantilla. Es lo más ruidoso del
sitio.

### 1.1 · `src/pages/metodo.astro:363`

```
- <h2>No es una metáfora. Es de dónde salió el método.</h2>
+ <h2>¿Dónde nació el método?</h2>
```

### 1.2 · `src/pages/soluciones.astro:81`

```
- <h2>No es un catálogo. Es dónde ya lo hicimos.</h2>
+ <h2>Dónde ya lo hicimos.</h2>
```

### 1.3 · `src/pages/index.astro:291`

```
- <h2>No es teoría. Es lo que ya construimos.</h2>
+ <h2>Esto ya está corriendo.</h2>
```

### 1.4 · `src/pages/metodo.astro:562`

```
- <h2>No son prompts. Es reingeniería del trabajo.</h2>
+ <h2>Así se arma por dentro.</h2>
```

⚠️ El rótulo («Cómo se usa en la práctica») **no cambia**. El comentario de
`metodo.astro:11` y el de la línea 557 dicen *"§07 No son prompts"* — actualiza
esos dos comentarios para que no queden mintiendo.

---

## 2 · `/metodo` §03 completa

Es la sección que Jorge señaló. Cinco párrafos, cuatro se tocan.

### 2.1 · Se borra el párrafo entero — `metodo.astro:370-373`

```
- <p>
-   Arriba está por qué fallan los proyectos de IA. Esto es de dónde sale
-   lo que no falla.
- </p>
```

Es una frase espejo: existe solo para hacer contraste con §02. El rótulo y el
titular ya hacen ese trabajo. **Borra también el comentario de arriba** que
explica ese puente (`metodo.astro:365-369`), porque deja de aplicar.

### 2.2 · `metodo.astro:374-378`

```
- <p>
-   El Método Ilhas se parece al oficio de construir software y tecnología
-   porque <strong>nació ahí</strong> — no es una comparación, es el
-   origen.
- </p>
+ <p>
+   Salió de <strong>construir software y tecnología</strong>. Doce años
+   haciéndolo, y los cinco pasos son los mismos que se usan ahí.
+ </p>
```

### 2.3 · `metodo.astro:379-384`

```
- <p>
-   No te estamos comparando con nadie: te estamos entregando{" "}
-   <strong>el mismo sistema</strong> que usa quien construye tecnología,
-   apuntado a tu trabajo. Sin volverte técnico. Sin esperar a que entre
-   un equipo de ingeniería.
- </p>
+ <p>
+   Es <strong>el mismo sistema</strong> que usa quien construye tecnología,
+   apuntado a tu trabajo, sin que tengas que volverte técnico ni esperar a
+   que te den un equipo de ingeniería.
+ </p>
```

Se van dos tics: la corrección con dos puntos, y el *«Sin X. Sin Y.»* — ese
staccato de fragmentos paralelos delata igual que el otro.

### 2.4 · `metodo.astro:391-397`

```
- <p>
-   El agobio con la IA no es de capacidad, es de{" "}
-   <strong>filtro</strong>: hay demasiadas herramientas y demasiado
-   ruido. El método es el filtro — te dice qué resolver y en qué orden, y
-   el <em>cómo</em> técnico se escoge después, en el paso{" "}
-   <strong>Sistematizar</strong>.
- </p>
+ <p>
+   Hay <strong>demasiada herramienta y demasiado ruido</strong>. El método
+   te dice qué resolver y en qué orden; el <em>cómo</em> técnico se escoge
+   después, en{" "}
+   <strong>Sistematizar</strong>.
+ </p>
```

### 2.5 · No se toca

`metodo.astro:388-390` — *«Saber el qué no te obliga a aprender el cómo.»**
Tiene forma de dicho, no de corrección. Se queda idéntica.

---

## 3 · El resto de `/metodo`

### 3.1 · `metodo.astro:~253-255` — el fundamento

```
- ... obtienes basura al cuadrado — la IA no corrige un mal razonamiento,
-   lo amplifica. Por eso el fundamento importa más ahora que antes, no menos.
+ ... obtienes basura al cuadrado. La IA no corrige un mal razonamiento, lo
+   amplifica. Por eso el fundamento importa más ahora que antes.
```

Solo se borra **«, no menos»** y la raya se vuelve punto. *«Basura al
cuadrado»* se queda intacta: es de las mejores del sitio.

### 3.2 · `metodo.astro:~314-316` — automatizar

```
- Automatizar uno que está mal no lo arregla — lo hace fallar más rápido y a
-   mayor escala.
+ Automatizar un proceso que está mal solo lo hace fallar más rápido y a mayor
+   escala.
```

⚠️ Lo que sigue —*«Todos venden automatizar más. Nosotros empezamos por
quitar.»*— **se queda tal cual.** Eso es una postura, no un tic.

### 3.3 · `metodo.astro:278-280` — las tres capas

```
- De las tres, la que todos comparten es la única que no puedes mejorar. Las
-   dos que sí deciden el resultado son las que nadie te va a dar hecho. Por eso
-   el mismo modelo produce resultados abismalmente distintos según quién lo
-   maneje.
+ La capa que compartes con tu competencia es la única que no puedes mover. Las
+   otras dos las armas tú, y son las que deciden el resultado. Por eso el mismo
+   modelo produce resultados abismalmente distintos según quién lo maneje.
```

Aquí el tic eran dos frases perfectamente balanceadas, una tras otra. Conserva
el `<strong>` que ya traiga, ajustado a la frase nueva.

### 3.4 · `metodo.astro:408-410` — entrada del acrónimo

```
- I·L·H·A·S no es un acrónimo bonito: cada letra es un paso real, tomado del
-   oficio de construir software y tecnología y apuntado a tus números.
+ Cada letra es un paso real, tomado de construir software y tecnología,
+   apuntado a tus números.
```

### 3.5 · `metodo.astro:80` — se borra la línea completa

```
- "Identificar no es solo encontrar qué mejorar — es encontrar qué sobra.",
```

Esa línea la agregué yo. La de Jorge —*«¿Qué no debería existir en estos
procesos?»*— ya está justo arriba y es más filosa sola. **Verifica que al
borrarla el arreglo del dato no quede con un hueco** (coma colgada, array de
un solo elemento que ahora no necesita `map`, etc.).

### 3.6 · `metodo.astro:141` — el mantenimiento del paso S

```
- "Lo que rompe la confianza en una solución con IA no es que se equivoque: es
-   que nadie revisó. Un error detectado es mantenimiento; un error publicado es
-   credibilidad perdida. La solución no termina cuando funciona — termina
-   cuando alguien la está cuidando.",
+ "Lo que rompe la confianza en una solución con IA es que nadie la esté
+   revisando. Un error que agarras a tiempo es mantenimiento; uno que ya salió
+   te cuesta credibilidad. Por eso hay que decidir quién la cuida antes de
+   darla por terminada.",
```

Éste traía **tres tics en un solo párrafo**. Era el peor de la página.

### 3.7 · `metodo.astro:475-477` — el cierre del ciclo

```
- Y con eso vuelves a empezar en Identificar. No es una lista de cinco pasos:
-   es un ciclo que se mantiene.
+ Y con eso vuelves a empezar en Identificar. Es un ciclo, no una línea.
```

Ésas son **las palabras exactas de Jorge** en `docs/07-metodo-detalle.md`. Yo
las había "mejorado". El comentario de `metodo.astro:472` que dice *"lo que
separa un método de una lista de cinco pasos"* puede quedarse: es comentario de
código, no copy.

### 3.8 · `metodo.astro:490-492` — a dónde llegas

```
- Sales con el sistema armado — y con el criterio para decidir de qué tamaño
+ Sales con el sistema armado y con el criterio para decidir de qué tamaño
```

### 3.9 · `metodo.astro:517-518` — dónde entra el método

```
- El método no cambia de área a área. Lo que cambia es a dónde lo apuntas — y
-   con qué capa te conviene empezar.
+ El método no cambia de área a área. Cambia a dónde lo apuntas y con qué capa
+   te conviene empezar.
```

---

## 4 · `/` y `Bifurcacion.astro`

### 4.1 · `src/pages/index.astro:191-193`

```
- No fallaron los modelos — falló lo de antes. Sin línea base no hay con qué
-   comparar, y sin comparación no hay retorno que mostrar.
+ No fallaron los modelos, falló lo de antes. Si no mediste cómo estaba el
+   proceso al arrancar, no tienes contra qué comparar el resultado.
```

Aquí había dos cosas: la raya que corrige, y una cadena *«sin X no hay Y, y sin
Y no hay Z»*. Esa escalera es otro tic de los gordos.

### 4.2 · `src/pages/index.astro:239`

```
- Cinco pasos. Cinco letras: <em>I·L·H·A·S</em>.<br />
+ Cinco pasos, cinco letras: <em>I·L·H·A·S</em>.<br />
```

⚠️ Lo que sigue —*«El método es el barco; las islas son a dónde lo
apuntas.»*— **se queda.** Es la metáfora de la casa.

### 4.3 · `src/components/Bifurcacion.astro:152-153`

```
- <b>Hoy la puerta abierta está en el cimiento</b> — porque si abajo
+ <b>Hoy la puerta abierta está en el cimiento</b>, porque si abajo
```

### 4.4 · `src/components/Bifurcacion.astro:128` y `:253`

Las tres copias de esta frase tienen que quedar **idénticas**:

```
Sales con el sistema armado y con el criterio para decidir de qué tamaño
tenía que ser.
```

- La `:128` hoy trae la raya (`armado — y con`) → quítala.
- La `:253` hoy trae una coma antes de la «y» (`armado, y con`) → quítala
  también; en español esa coma sobra.

Con la 3.8 son **tres lugares** con la misma frase. Déjalas iguales.

---

## 5 · `/soluciones`

### 5.1 · `soluciones.astro:41-42`

```
- No somos una agencia de "implementación de IA". Es criterio de producto,
-   aplicado a un proceso que hoy se hace a mano.
+ No somos una agencia de "implementación de IA". Traemos criterio de producto
+   a un proceso que hoy se hace a mano.
```

La negación se queda: es una postura real. Lo que se cae es el *«Es Y»* que la
corrige.

### 5.2 · `soluciones.astro:63-64` — se borra la frase final

```
- ... apuntado a tu empresa en vez de a una persona. Mismo sistema, mismo rigor.
+ ... apuntado a tu empresa en vez de a una persona.
```

*«Mismo sistema, mismo rigor»* es relleno paralelo. No agrega nada que la frase
anterior no dijera.

### 5.3 · `soluciones.astro:137-138`

```
- Sin propuesta enlatada: un diagnóstico real de tu caso, antes de cualquier
-   conversación de precio.
+ Antes de hablar de precio hacemos un diagnóstico de tu caso.
```

---

## 6 · `/finanzas` y `/nosotros`

### 6.1 · `finanzas.astro:149`

```
- <h2>Se empieza abajo. Siempre.</h2>
+ <h2>Siempre se empieza abajo.</h2>
```

La palabra suelta al final como frase completa es de los tics más marcados que
hay. Se arregla moviéndola al frente.

### 6.2 · `finanzas.astro:80` — se borra la primera frase

```
- "La pregunta correcta no es cuál herramienta, es con qué criterio la usas. Te
-   enseñamos a evaluar cualquier IA con el mismo método, y en el programa usamos
-   las que mejor sirven para cada tarea financiera específica.",
+ "Te enseñamos a evaluar cualquier IA con el mismo método, y en el programa
+   usamos las que mejor sirven para cada tarea financiera específica.",
```

La respuesta se sostiene sola. Y en un FAQ, arrancar corrigiendo la pregunta
del cliente se siente condescendiente aparte de sonar a máquina.

### 6.3 · `nosotros.astro:69-70`

```
- Participantes de Ilhas, cada quien con su propia trayectoria — no un
-   dúo. El método se apunta a áreas distintas; así crece esta rejilla.
+ Participantes de Ilhas, cada quien con su propia trayectoria. No somos un
+   dúo. El método se apunta a áreas distintas; así crece esta rejilla.
```

---

## Lo que NO se toca

Estas tienen la misma forma y **se quedan a propósito**. La forma deja de ser
tic cuando es rara; si se van todas, el sitio queda plano.

- «Todos venden automatizar más. Nosotros empezamos por quitar.»
- «Once años metidos en esto, con recibos.» (`/nosotros`)
- «Escoger de más cuesta dinero; escoger de menos no resuelve.» (de Jorge)
- «El mismo método en los dos carriles. Lo único que cambia son las manos.»
- «Sé de finanzas. Pero sientes que te estás quedando atrás.» (`/finanzas` H1)
- «Saber el qué no te obliga a aprender el cómo.» (`/metodo` §03)
- «El método es el barco; las islas son a dónde lo apuntas.»
- «Métele basura a un modelo y no obtienes basura: obtienes basura al cuadrado.»
- **Las cinco líneas de la banda Hilas, completas.** Incluida *«Sabes por qué
  falló cada cargo, no nada más que falló.»* Jorge las aprobó palabra por
  palabra.
- El titular del 95 % —*«Y no es la tecnología.»*— en `/` y en `/metodo`.
- Todo testimonio, cita textual y transcripción.

---

## Verificación

```bash
npm run build      # cero warnings
npm run medios     # sin ⚠ nuevos
```

Sobre `dist/`, **no sobre `src/`**. Los 12 tienen que dar **0**:

```bash
grep -c "No es una metáfora"            dist/metodo/index.html
grep -c "No son prompts"                dist/metodo/index.html
grep -c "No es un catálogo"             dist/soluciones/index.html
grep -c "No es teoría"                  dist/index.html
grep -c "Se empieza abajo. Siempre"     dist/finanzas/index.html
grep -c "no es una comparación"         dist/metodo/index.html
grep -c "no es de capacidad"            dist/metodo/index.html
grep -c "acrónimo bonito"               dist/metodo/index.html
grep -c "no es que se equivoque"        dist/metodo/index.html
grep -c "Mismo sistema, mismo rigor"    dist/soluciones/index.html
grep -c "propuesta enlatada"            dist/soluciones/index.html
grep -c "La pregunta correcta no es"    dist/finanzas/index.html
```

Y estos tienen que **seguir apareciendo** (son los que se quedan):

```bash
grep -c "empezamos por quitar"          dist/metodo/index.html   # ≥ 1
grep -c "con recibos"                   dist/nosotros/index.html # ≥ 1
grep -c "basura al cuadrado"            dist/metodo/index.html   # ≥ 1
grep -c "no nada más que falló"         dist/index.html          # ≥ 1
grep -c "aprender el"                   dist/metodo/index.html   # ≥ 1
```

Y la frase repetida, idéntica en sus tres lugares:

```bash
grep -o "Sales con el sistema armado[^.]*\." dist/index.html dist/metodo/index.html | sort -u
# tiene que salir UNA sola variante
```

### Capturas

`/` y `/metodo` en **1440 × 900**, más `/metodo` §03 sola. Revisa a ojo:

- [ ] §03 quedó con cuatro párrafos, no cinco, y no se ve mocha.
- [ ] Ningún `<strong>` ni `<em>` quedó vacío o con espacio raro por el
      reemplazo.
- [ ] Ningún `{" "}` quedó pegado a un punto o duplicando espacio.
- [ ] Los cuatro titulares nuevos no se desbordan ni parten mal en móvil —
      «¿Dónde nació el método?» es mucho más corto que el que había, revisa que
      no se vea perdido en su renglón.

---

## Qué NO hacer

- No toques CSS, ni estructura, ni componentes. Esto es solo texto.
- No "mejores" ninguna frase que no esté en la lista.
- No borres las de la sección «Lo que NO se toca».
- No inventes copy: cada reemplazo ya viene escrito.
- No cambies testimonios, citas ni transcripciones.

---

## Al terminar, reporta

1. Archivos tocados y cuántos reemplazos en cada uno (deben sumar 28).
2. `npm run build` y `npm run medios`.
3. Los 12 greps que van en 0 y los 5 que van en ≥ 1.
4. La salida del grep de la frase repetida.
5. Las tres capturas.
