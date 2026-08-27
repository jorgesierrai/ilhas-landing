# Iteración 6 — `/metodo`, secciones 01 a 04

**Para Claude Code. Ejecuta esto tal cual, de arriba a abajo.**
Dictado por Jorge el 27 ago 2026.

> **Lee `docs/07-metodo-detalle.md` antes de escribir una línea.** Es la
> definición canónica del método, dictada por Jorge. Todo lo de aquí sale de
> ahí. Si algo de este prompt se contradice con ese documento, **manda el
> documento**.

---

## Reglas que mandan sobre todo lo demás

1. **El copy es de Jorge.** Lo que hay aquí es su dictado, ordenado. No lo
   "mejores", no lo alargues, no le metas adjetivos. Si algo no cabe, ajustas
   CSS.
2. **Un solo gradiente por titular.** `tokens.css`: *«el gradiente… o UNA
   palabra clave del titular»*. Hoy el H1 del home trae dos y ya está mal; no
   repitas el error aquí.
3. **Cero JavaScript de cliente.**
4. **No inventes cifras.** Las únicas que van en `/metodo` son las tres que ya
   están en §02 (MIT, Cisco, Gartner) más la de Andrew Ng que se agrega en esta
   corrida — todas con su fuente y su liga.

---

## 0 · La rama

Parte de la rama actual, ya con los pendientes commiteados.
Rama nueva: **`metodo-01-04`**.

---

## 1 · §01 La tesis — se reescribe

Hoy dice *"El método no nació en las finanzas. Nació construyendo producto."*

**Se cae.** Jorge: *"está muy AI eso. Cómo que no nació en las finanzas, eso no
es genérico."* Definirse por lo que **no** eres es débil, y "producto" a secas no
lo decodifica un contador ni un dueño de empresa.

### Lo que dice ahora (andamio de Jorge, él lo ajusta)

**Kicker:** `El método`

**H2** — una sola palabra en gradiente:

> El método nació construyendo **tecnología**, a lo largo de más de 12 años.

**Cuerpo, tres ideas en este orden:**

1. Esa tecnología ha tenido un impacto enorme en sus usuarios.
2. Lo que te enseñamos es el sistema para producir soluciones que te ayuden a ti
   y a tus clientes a **mover la aguja** de lo que quieran mover — con tus
   procesos y las herramientas que ya tienes a la mano.
3. El método te ayuda a saber **cómo pensar**, a mejorar tus procesos y a crear
   más valor.

⚠️ **Borra** la frase *"Es un sistema para pensar y decidir, destilado de años
construyendo producto"*. La reemplaza el punto 3.

### La ayuda de «mover la aguja»

Es su **primera aparición en el sitio** y no está definida en ninguna parte.

Va con `<details>` nativo — **cero JavaScript**:

```astro
<details class="ayuda">
  <summary>¿qué es mover la aguja?</summary>
  <p>Cumplir el objetivo que te planteaste.</p>
</details>
```

- El `<summary>` va inline, del tamaño del cuerpo, con el marcador de flecha
  discreto — **no** un botón, **no** un ícono de "i" dibujado a mano.
- Sin `open`: arranca cerrado.
- Cuando se abre no debe empujar el resto de la página de golpe; dale al `<p>`
  su propio espacio para que el salto sea corto.
- **No uses `title=""`**: no lo lee un lector de pantalla ni existe en táctil.

---

## 2 · §02 El hueco — se rehace sobre material propio

Hoy es el 95% + el párrafo de GIGO². El dato y las fuentes **se quedan** (los
puso la iteración 4 y están verificados). Lo que cambia es el **argumento de
abajo**, que hoy es genérico.

### El eje, en dos golpes

**a) No es el modelo, es cómo se usa.** Todos tienen los mismos modelos y los
resultados son abismalmente distintos. Eso ya lo dice el H2 (*"y no es la
tecnología"*) — el cuerpo tiene que sostenerlo, no repetirlo.

**b) Automatizar un proceso roto solo lo rompe más rápido.** Se desarrolla abajo.

**El párrafo de GIGO² se queda** — *"métele basura a un modelo y no obtienes
basura: obtienes basura al cuadrado"* — es de Jorge y funciona.

### Las tres capas — esto es lo que hace que el argumento se sostenga

El H2 afirma *"y no es la tecnología"*. Hoy nada lo demuestra. Esto sí:

**Un resultado con IA tiene tres capas, y solo una es el modelo.**

| Capa | Qué es | ¿De quién es? |
|---|---|---|
| **El modelo** | El motor | De todos. Es el mismo para ti y para tu competencia |
| **El andamiaje** | El flujo, las herramientas, los pasos que lo rodean | **Tuyo** |
| **El conductor** | El contexto que le das, cómo lo corriges, cómo lo diriges | **Tuyo** |

De las tres, la que todos comparten es la única que no puedes mejorar. **Las dos
que sí deciden el resultado son las que nadie te va a dar hecho.** Por eso el
mismo modelo produce resultados abismalmente distintos según quién lo maneje.

### El dato que lo prueba — verificado, va literal

**Andrew Ng**, en su boletín *The Batch* de DeepLearning.AI, 20 de marzo de 2024,
sobre la prueba de programación **HumanEval**:

| Condición | Resultado |
|---|---|
| GPT-3.5 solo | 48.1 % |
| GPT-4 solo | 67.0 % |
| **GPT-3.5 con un flujo de trabajo agéntico alrededor** | **hasta 95.1 %** |

**Un modelo peor con mejor sistema le ganó a un modelo mejor sin sistema.** Y no
por poco: la diferencia que hace el andamiaje es más grande que la diferencia
entre las dos generaciones de modelo.

Liga (va en `<cite>`, mismo estilo discreto que las otras tres fuentes):
`https://www.deeplearning.ai/the-batch/how-agents-can-improve-llm-performance`

⚠️ Cita **a Andrew Ng**, que es de quien es el dato. No a terceros que lo
repiten. Y no redondees los porcentajes.

### Y la otra mitad: automatizar lo roto

Automatizar un proceso que está mal no lo arregla — **lo hace fallar más
rápido y a mayor escala.** De ahí sale la pregunta del paso I, que es de Jorge
y que hay que dejar visible:

> **¿Qué no debería existir en estos procesos?**

Todos venden automatizar más. Ilhas dice **quitar primero**. Ese contraste es el
punto entero de la sección.

---

### Sobre las fuentes de este bloque

Jorge mandó `nateherk.com/thoughts` como referencia y **autorizó usar las ideas
que apliquen** — son cosas que él ya piensa y que no se le ocurrieron al dictar.

La línea es ésta, y respétala:

- **Las ideas se usan.** Las tres capas, el proceso roto que se escala, saber el
  qué sin aprender el cómo: eso es criterio del oficio, no propiedad de nadie.
- **Las frases de Herk NO se copian ni se traducen.** Se dicen con el vocabulario
  de Ilhas y aterrizadas en los cinco pasos.
- **El dato de Ng se cita a Ng**, con liga a su boletín.

---

## 3 · §03 El ángulo correcto — mismo argumento, más vivo

El texto de hoy le gusta a Jorge. **No se reescribe: se pone dinámico.**

- Resaltar las palabras que cargan el argumento — `<strong>` sobre
  `--ilhas-dark`, no color nuevo, no gradiente.
- Que amarre con §02: §02 dice *por qué falla*, §03 dice *de dónde salió lo que
  no falla*. Hoy están sueltas.
- Menos párrafo corrido: donde haya tres ideas, que se vean tres.

**Una idea que le falta y que cierra la sección.** §03 ya dice *"sin volverte
técnico"*, pero no explica por qué eso es posible. La razón:

> **Saber el *qué* no te obliga a aprender el *cómo*.**

El agobio con la IA no es de capacidad, es de **filtro**: hay demasiadas
herramientas y demasiado ruido. El método es el filtro — te dice qué resolver y
en qué orden, y el *cómo* técnico se escoge después, en el paso **S**.

Eso convierte "sin volverte técnico" de promesa a explicación.

**No metas cifras nuevas aquí.**

---

## 4 · §04 Los cinco pasos — cambia de forma y crece

### Se invierten las columnas

Hoy la tabla va *"El oficio de producto"* → *"En tu trabajo"*. **Al revés.**

| | Peso |
|---|---|
| **En tu trabajo** | **Protagonista.** Primero y más grande |
| **El oficio de construir software y tecnología** | Secundario. Da origen, no vende |

La segunda columna **se renombra**: `El oficio de producto` →
**`El oficio de construir software y tecnología`**. "Producto" a secas no se
entiende fuera del gremio.

### Deja de ser tabla

Con el detalle largo, cinco celdas de ~80 palabras son ilegibles. **Cinco
bloques apilados**, uno por paso:

```
[I]  Identificar                        ← badge + nombre, grande
     En tu trabajo
     <el detalle largo de docs/07>      ← protagonista
     ─────
     El oficio de construir software y tecnología
     Discovery — instrumentar y hallar el dolor antes de construir   ← chico y gris
```

El badge de letra es el mismo de §02 del home (círculo `--ilhas-primary`, letra
blanca, Space Grotesk). **Reusa el tratamiento, no inventes otro.**

### El contenido de cada bloque

**Sale literal de `docs/07-metodo-detalle.md`.** No lo resumas ni lo reescribas:
ese documento ya es la versión editada del dictado de Jorge.

### Lo que hoy no está dicho y ahora sí

**1 · El método es un ciclo.** La **S** termina volviendo a la **I**. En ninguna
parte del sitio se dice, y es lo que separa un método de una lista. Después del
quinto bloque, un remate corto que lo cierre — andamio:

> Y con eso vuelves a empezar en **Identificar**. No es una lista de cinco
> pasos: es un ciclo que se mantiene.

**2 · La pregunta de Identificar.** *"¿Qué no debería existir en estos
procesos?"* va destacada dentro del bloque de la **I**, no diluida en el
párrafo.

**3 · Las dos jerarquías de Sistematizar.** Jorge marcó "lo más importante" y "lo
segundo más importante": el **nivel de tecnología** que le aplicas, y **cómo lo
vas a mantener**. Que se vea que son dos decisiones, no dos frases más.

**4 · La revisión, dentro de Sistematizar.** Autorizado por Jorge, no venía en el
dictado: lo que rompe la confianza en una solución con IA **no es que se
equivoque — es que nadie revisó**. Un error detectado es mantenimiento; un error
publicado es credibilidad perdida. Va pegado al punto de mantener, porque es la
misma idea: la solución no termina cuando funciona, termina cuando alguien la
está cuidando.

**5 · Comprar antes de construir, en Accionar.** También autorizado y tampoco
venía en el dictado: antes de construir a la medida, a veces la prueba más
barata es **usar algo que ya existe** para entender el proceso de verdad. No
siempre se compra — pero saltarse esa pregunta es cómo se acaba construyendo algo
caro para un proceso que no se entendía.

---

## 5 · Verificación

```bash
npm run build      # cero warnings
npm run medios     # sin ⚠ nuevos
```

Sobre `dist/`, no sobre `src/`:

1. `grep -c "no nació en las finanzas" dist/metodo/index.html` → **0**
2. `grep -c "Es un sistema para pensar y decidir" dist/metodo/index.html` → **0**
3. `grep -c "El oficio de producto" dist/metodo/index.html` → **0**
4. `grep -c "<details" dist/metodo/index.html` → **≥ 1**
5. `grep -o 'text-gradient' dist/metodo/index.html | wc -l` → **1 por titular**,
   no más. Si sale 2 en el mismo H2, está mal.
6. `grep -c "script" dist/metodo/index.html` → **0**. Cero JS de cliente.
7. Mide `/metodo` antes y después y **repórtalo**: ya son 9,680 px y ésta es la
   sección que más crece.

### Capturas

`/metodo` en **1440 × 900** y **390 × 844**, y además:

- [ ] El `<details>` cerrado y abierto — que al abrir el salto sea corto.
- [ ] Los cinco bloques con el mismo ritmo: ninguno debe verse el doble de alto
      que otro. Si uno se dispara, el detalle de ese paso hay que partirlo en
      dos párrafos, **no recortarlo**.
- [ ] "En tu trabajo" se lee **antes y más fuerte** que la columna del oficio.
- [ ] El remate del ciclo se ve como cierre, no como un sexto paso.

---

## Qué NO hacer

- No copiar ni traducir las FRASES de nateherk.com. Las ideas sí se usan
  (Jorge lo autorizó); su redacción no.
- No inventar cifras. Solo las tres de §02 con sus fuentes.
- No dos gradientes en un mismo titular.
- No `title=""` para la ayuda de "mover la aguja".
- No resumir el detalle de `docs/07-metodo-detalle.md`: va completo.
- No convertir §04 de vuelta a tabla "porque se ve más ordenado".
- No agregar JavaScript de cliente.
- No tocar §05 en adelante — esta corrida termina en §04.

---

## Al terminar, reporta

1. Archivos tocados.
2. Salida de `npm run build` y `npm run medios`.
3. Los siete greps de §5.
4. Las capturas.
5. Cuánto creció `/metodo`, en px, antes vs después.
