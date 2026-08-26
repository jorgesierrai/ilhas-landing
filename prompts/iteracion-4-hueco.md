# Iteración 4 — El hueco, y la data dentro del método

**Para Claude Code. Ejecuta esto tal cual, de arriba a abajo.**
Decidido con Jorge el 25 ago 2026. Son dos cambios que van juntos porque
sostienen el mismo argumento: **§02 del home dice que la causa #1 del fracaso
son los datos sin preparar, y el método tiene que responder eso visiblemente.**

---

## Reglas que mandan sobre todo lo demás

1. **Las cifras y las fuentes van literales o no van.** Están verificadas contra
   la fuente primaria. No las redondees, no las parafrasees, no las "mejores",
   y **no agregues ninguna que no esté en este documento**.
2. **El copy de marketing lo escribe Jorge.** Lo que hay aquí es andamio, salvo
   las cifras. Si algo no cabe, ajustas CSS.
3. **La palabra "bootcamp" no se escribe.** Ilhas no es un bootcamp: es acceso a
   una comunidad, y la plataforma (Skool u Hotmart) aún no se decide. La guía de
   marca en `docs/marca/` usa "bootcamp" en todos lados — está vieja, ver
   `docs/00-INDEX.md`. **No copies esa palabra de ahí a ninguna parte.**

---

## 0 · La rama

Parte de `hero-conferencia` si ya está mergeada a `fix-comentarios-2-de-assets`;
si no, parte de `fix-comentarios-2-de-assets`. Commitea lo pendiente antes de
cambiarte. Rama nueva: **`hueco-y-data`**.

---

## 1 · La data entra al método (esto va primero)

Hoy el trabajo con datos está repartido implícito entre I, L y H, y **nombrado en
ninguno**. `A · Accionar` dice "decidir con datos", pero eso es *usar* datos, no
prepararlos. Con la §02 nueva apuntando a los datos como causa raíz, el método
queda debiéndole al lector.

**La decisión de Jorge:** la línea base es de **I**, los datos son de **L**.

`Levantamiento` en español de México ya se lee como *levantamiento de
información* — la palabra ya hacía ese trabajo y el sitio la estaba usando solo
para benchmark. Ahora carga las dos cosas: levantas tu información **y** traes
el estándar de afuera.

### Los cuatro lugares que tienen que decir lo mismo

**a) `src/pages/metodo.astro` — el array `pasos`:**

```ts
{
  letra: "I",
  paso: "Identificar",
  oficio: "Discovery — instrumentar y hallar el dolor antes de construir",
  trabajo: "Cómo se mueve el dinero, dónde se fuga, y desde qué número vas a medir",
},
{
  letra: "L",
  paso: "Levantamiento",
  oficio: "Continuous Discovery — levantar la información y el estándar",
  trabajo: "Dejas tus datos limpios y en un solo lugar, y traes el estándar de los mejores",
},
```

Los otros tres pasos **no se tocan**, con una excepción: `S · Sistematizar`
suma el mantenimiento — `"La IA como tu equipo, con alertas y mantenimiento"`.
El modo de falla que reportan MIT y Gartner es el abandono después del piloto;
si la S no dice que alguien lo mantiene, la fila del mapa no tiene a dónde
apuntar.

**b) `src/pages/index.astro` — el array `pasos`,** que usa `linea` (más corta):

- **I** → `"Cómo se mueve el dinero, dónde se fuga y desde qué número mides."`
- **L** → `"Tus datos en un solo lugar, y el estándar de los mejores."`
- **S** → `"La IA como tu equipo, con alertas y mantenimiento."`

**c) `docs/02-paginas.md`** — la tabla de `/metodo` punto 4. Es la fuente de
verdad del método; si no la actualizas, la próxima corrida revierte esto.

**d) El mapa de §02** (abajo). Sus filas 1 y 2 son literalmente I y L.

`docs/03-ntpvs.md` y `src/pages/soluciones.astro` solo listan los nombres de los
pasos, no las definiciones. **No los toques.**

---

## 2 · §02 «El hueco» — se rehace, y se come a §03

**Referencia visual: `medios/hueco-referencia.html`.** Ábrela con doble clic
antes de escribir código. Trae **tres opciones**; se implementa la **Opción 3
(`#sinbanda`)**, la última del archivo. Las otras dos quedan de registro.

### Por qué se come a §03

Si el mapa muestra las cinco letras y §03 las vuelve a mostrar 400 px abajo, el
visitante ve I·L·H·A·S dos veces y la segunda no aporta. Es la salida (a) que ya
pedía `AUDITORIA-VISUAL.md`: *«el hueco es el setup del método, no una sección
aparte»*. **`<!-- 03 · El método en cinco pasos, versión corta -->` desaparece
del home**, y su contenido vive dentro de la nueva §02.

Medido: hoy §02+§03 = 537 px (desktop) / 887 px (móvil). La sección nueva mide
1,637 px / 2,205 px. La bifurcación se recorre de 1,279 px a 2,379 px. **Es un
intercambio consciente y ya está aprobado** — anótalo en un comentario junto a
la sección para que nadie lo "arregle" después.

### La estructura, en orden

1. `kicker` "El hueco" + H2
2. Un párrafo de causa
3. El mapa: cinco filas, *lo que falló* → *el paso que lo cubre*
4. `Conoce el método completo →` a `/metodo`
5. La cita de Irlanda Morgan con liga a `/soluciones`

### Las cifras y sus fuentes — verificadas, van literales

| Cifra | Qué dice exactamente | Fuente | Liga |
|---|---|---|---|
| **300 / 95%** | 300 proyectos de IA empresarial analizados; el 95% no mostró retorno financiero medible en seis meses | MIT · *The GenAI Divide: State of AI in Business*, 2025 | **ninguna** (ver abajo) |
| **24%** | tiene datos limpios, centralizados y con integración en tiempo real para agentes de IA | Cisco · AI Readiness Index 2025 (8,039 líderes, 30 mercados) | `https://www.cisco.com/c/m/en_us/solutions/ai/readiness-index.html` |
| **30%** | de los proyectos de IA generativa se abandonaría después del piloto | Gartner · pronóstico publicado en 2024 | `https://www.gartner.com/en/newsroom/press-releases/2024-07-29-gartner-predicts-30-percent-of-generative-ai-projects-will-be-abandoned-after-proof-of-concept-by-end-of-2025` |

**MIT va sin liga a propósito.** El reporte circuló como PDF de MIT NANDA y no
tiene URL pública estable en `mit.edu`; lo que hay en línea son copias en sitios
de terceros. Se cita por nombre. **No inventes una URL ni ligues un re-host.**

⚠️ **Nunca escribas que el 95% "fracasa".** El estudio midió *retorno financiero
medible en seis meses*, que no es lo mismo. La redacción precisa además pega más
fuerte, y es la que aguanta que alguien la vaya a checar.

### Las ligas de fuente

Van dentro de `<cite>`, con `target="_blank" rel="noopener"`, y con el estilo
discreto que ya trae la referencia (subrayado gris fino, morado solo en hover).
**No las hagas ver como CTA:** compiten con las ligas de conversión que están
30 px abajo.

### La cita — bloqueante

`atribucion` de `soluciones-testimonio-oncologia` en `src/data/medios.ts` dice
hoy *"Morgan Centro de Especialidad"*, y `medios/CORTES-testimonios.md` marca ese
nombre como **por verificar**. **Jorge tiene que confirmar el nombre exacto de la
empresa antes de publicar.**

Si al llegar aquí no está confirmado: **no publiques la cita**. Deja la sección
sin el bloque de prueba y repórtalo. Regla 5 de `CLAUDE.md` — si un dato no
existe, el bloque no se publica. No inventes, no pongas "una empresa del sector
salud", no lo dejes en placeholder.

**En el home va la cita en TEXTO, no el video.** El video completo vive en
`/soluciones`, que es a donde manda la liga. El home tiene ocho segundos.

---

## 3 · `/metodo` §02 — la misma corrección, sin el mapa

`src/pages/metodo.astro` línea ~103 tiene el mismo H2 con "fracasa". Corrígelo
igual y agrégale las tres fuentes con sus ligas.

**El mapa NO se duplica ahí.** `/metodo` §04 ya desarma los cinco pasos en
profundidad; meterle el mapa arriba es decir lo mismo dos veces en la misma
página. El párrafo de GIGO² que ya está se queda: es de Jorge y funciona.

---

## 4 · Las capturas de vacantes salen del home

`home-mercado-01/02/03` estaban destinadas a §02. **Ya no encajan**: prueban
*demanda* del mercado, no *fracaso* de proyectos, y la sección nueva es sobre lo
segundo.

En el manifiesto, cambia su `seccion` a `/finanzas §03 Es para ti si` — su
segunda casa, que `PLAN-MEDIOS.md` ya les tenía asignada. **No las marques
`sinUsar`**: siguen teniendo página, solo que otra.

Y anota en `notas` de las tres que **los puestos van a cambiar**: hoy son Data
Scientist, Product Manager y Diseñador, y ninguno es el comprador de Ilhas. Los
que reconoce la audiencia son Controller, Gerente de Finanzas y Director de
Operaciones. **Decisión de Jorge, no la tomes por él** — solo deja la nota para
que nadie capture las viejas.

---

## 5 · Verificación — obligatoria

```bash
npm run medios     # cero ⚠
npm run build      # cero warnings
```

Y sobre `dist/`, **no sobre `src/`**:

1. `grep -c "bootcamp" dist/*.html` → tiene que dar **0** en todas.
2. `grep -o "95%[^<]*" dist/index.html dist/metodo/index.html` → en ninguna debe
   aparecer la palabra "fracasa" junto al 95%.
3. `grep -c "cisco.com\|gartner.com" dist/index.html` → las dos ligas presentes.
4. `grep -o 'rel="noopener"' dist/index.html | wc -l` → una por liga externa.
5. `grep -c "pasos-corto" dist/index.html` → **0**. §03 ya no existe en el home.
6. Que "Levantamiento" y su nueva línea salgan igual en `dist/index.html` y en
   `dist/metodo/index.html`. Si difieren, se rompió la congruencia.

### Capturas

Sirve `dist/` y captura `/` y `/metodo` en **1440 × 900** y **390 × 844**.
Comprueba una por una:

- [ ] Las cinco filas del mapa caen en **una sola línea** cada una en desktop.
      Si alguna se parte, ensancha la columna derecha — no acortes el copy.
- [ ] Los encabezados de columna (*Lo que reportan que falló* / *El paso que lo
      cubre*) se ven en desktop y se ocultan en móvil.
- [ ] En 390 px cada fila lee falla → paso, en ese orden, sin cruzarse.
- [ ] Las ligas de fuente **no** se ven como botones ni compiten con
      "Conoce el método completo →".
- [ ] La cita de Irlanda tiene nombre, cargo y empresa — o no está.
- [ ] Mide la sección y confirma: ~1,637 px desktop, ~2,205 px móvil. Si sale
      muy por encima, algo se duplicó.

---

## Qué NO hacer

- No escribir "bootcamp". En ningún archivo, ni en un comentario.
- No agregar cifras que no estén en la tabla de §2, ni de otras fuentes.
- No decir que el 95% "fracasa".
- No inventar URL para MIT.
- No meter el mapa en `/metodo`.
- No tocar los pasos H y A. Solo I, L y S.
- No publicar la cita sin el nombre exacto de la empresa confirmado.
- No borrar `Stat.astro` ni `pasos-corto` de `base.css` sin comprobar antes que
  ninguna otra página los usa (`/nosotros` usa `Stat`).
- No agregar JavaScript de cliente.

---

## Al terminar, reporta

1. Archivos tocados y por qué.
2. Salida de `npm run medios` y `npm run build`.
3. Los seis greps de §5 con su resultado.
4. Las cuatro capturas.
5. Si la cita se publicó o se quedó fuera, y por qué.
