# Iteración 5 — La bifurcación y el mapa de la empresa

**Para Claude Code. Ejecuta esto tal cual, de arriba a abajo.**
Decidido con Jorge el 26 ago 2026.

> ⚠️ **Corre la iteración 4 primero** (`prompts/iteracion-4-hueco.md`) y déjala
> revisada. Esta depende de ella: el encabezado de la bifurcación dice *«ya
> sabes qué tiene que pasar»*, y eso solo es verdad si §02 ya existe arriba.
> Si §02 no está, esta frase se queda sin piso.

---

## Reglas que mandan sobre todo lo demás

1. **El copy de marketing lo escribe Jorge.** Lo que hay aquí es andamio. Si
   algo no cabe, ajustas CSS — nunca el texto.
2. **Cero colores nuevos.** Todo sale de `src/styles/tokens.css`: la marca en
   opacidades, `--ilhas-dark`, `--ilhas-light`, `--ilhas-gray`. Nada de verdes,
   naranjas ni azules.
3. **No se anuncian islas futuras** (regla 3 de `CLAUDE.md`), ni con
   «próximamente». «Abierto hoy» es un hecho del presente, no un anuncio.
4. **La palabra "bootcamp" no se escribe.** Ver `docs/00-INDEX.md`.
5. **Cero JavaScript de cliente.**

---

## 0 · La rama

Parte de `hueco-y-data` ya mergeada (o de la rama donde quedó la iteración 4).
Rama nueva: **`bifurcacion-y-mapa`**.

---
## 1 · §04 La bifurcación — se rehace entera

**Referencia: `medios/bifurcacion-referencia.html`.** Ábrela antes de tocar
`src/components/Bifurcacion.astro`.

El diagnóstico de Jorge: las dos tarjetas describen **cómo se entrega** («el
método, enseñado» / «aplicado en tu empresa»), no **qué te llevas**. Nadie
compra logística. Y no se conectan con nada de lo de arriba.

### El encabezado hace de puente con §02

```
kicker: La bifurcación
H2:     Ya sabes qué tiene que pasar. Falta decidir quién lo hace.
lead:   El mismo método en los dos carriles. Lo único que cambia son las manos.
```

Ese H2 **solo funciona porque §02 ya explicó qué tiene que pasar**. Las dos
secciones se sostienen mutuamente — si alguien recorta §02, esta frase se queda
sin piso. Déjalo escrito en un comentario.

### Carril 1 — GENÉRICO, con las tres capas adentro

**Este es el cambio de fondo.** El carril de aprender es el **método**, que
sirve para cualquier área. «Ilhas Finanzas» **no es el producto: es la primera
isla**, y por eso vive en su propio recuadro dentro de la tarjeta.

Así se resuelve la contradicción que traía: prometía genérico y listaba
finanzas. Ahora la promesa universal va arriba y la puerta que existe hoy va
abajo, separada — y los chips de finanzas dejan de pelearse con la promesa: se
vuelven la prueba de que la puerta es real.

**El orden dentro de la tarjeta, exacto:**

1. `Lo aprendes tú` · `Aprende el método`
2. El resultado, en display:
   > Llegas con una idea de dónde estás perdiendo tiempo y dinero. Sales con tu
   > propio equipo de agentes trabajando en tu área.
3. **Las tres capas en mini** — la cuarta variante de
   `medios/mapa-empresa-referencia.html`. Tres renglones, **85 px medidos**:

   | | |
   |---|---|
   | **Cadena de ingresos** | · marketing, ventas, cobranza |
   | **Motor de valor** | · producción, suministro, entrega |
   | **Cimiento** | · finanzas, contabilidad, administración |

   Con la misma barra de peso creciente (`.28` → `.55` → `1`) que el mapa
   grande. **Es la misma idea en chico, no otro componente:** si el mapa grande
   cambia de rótulos, este cambia con él.

4. El remate, que es el que amarra todo:
   > Los cinco pasos son los mismos en las tres. **Hoy la puerta abierta está
   > en el cimiento** — porque si abajo está flojo, automatizar arriba solo
   > amplifica el desorden.

   Eso justifica que Finanzas sea la primera isla **como decisión de método**,
   no como «es lo único que tenemos». Es la diferencia entre sonar chico y
   sonar deliberado.

5. El recuadro `● Abierto hoy` con **Ilhas Finanzas**, para quién es, los
   cuatro chips y la línea de respaldo del papá.
6. Los dos CTAs.

⚠️ **El home NO lleva el mapa completo.** Trece fichas ahí matan la tarjeta y
duplican lo que ya viven `/metodo` y `/soluciones`. Tres renglones y la liga.

⚠️ **Regla 3 de `CLAUDE.md`: no se anuncian islas futuras, ni con
«próximamente».** «Abierto hoy» **no** anuncia nada: es un hecho del presente.
**No agregues** nombres de islas futuras, ni «pronto», ni «y más áreas». El
visitante extrapola solo, que es lo que la regla quiere.

⚠️ **La tarjeta ya NO puede ser un `<a>`.** Lleva dos puertas —
`Conocer Ilhas Finanzas` (`/finanzas`, botón primario) y `Conocer el método`
(`/metodo`, enlace) — y anidar dos `<a>` es HTML inválido y un desastre con
lector de pantalla. Es un `<div>` con dos `<a>` adentro.

### Carril 2 — menos IA, más trabajo

Se cae **«no somos una agencia de implementación de IA»**: negar algo obliga a
nombrarlo, y mete la palabra en la página. En su lugar se describe el trabajo —
levantar, construir, dejar funcionando, mantener.

Y entra un recuadro **«Cómo empieza»** con los tres tiempos: diagnóstico →
construcción → queda corriendo con quien lo mantenga. Es la respuesta directa a
*«¿lo implementan en la empresa y qué? no entiendo»*, y además equilibra la
altura contra el recuadro de la isla. Sin él, esta tarjeta quedaba con 450 px de
hueco blanco — lo medí.

El tercer tiempo dice **«ahí es donde se cae la mayoría»**, que amarra con la
fila de Sistematizar del mapa y con el 30% de Gartner. Es la misma idea tres
veces en la página, a propósito.

### El fondo — y por qué NO puede ser oscuro

Hoy la sección es `bg-white`, igual que §02 arriba, y `.bg-white + .bg-white`
colapsa el padding: se lee como continuación, no como sección nueva.

**Va con lavado de marca** (el `.f-lavado` de la referencia): `--ilhas-light`
con el gradiente al 13 % en dos esquinas, en `radial-gradient`, nunca de pared a
pared — `tokens.css` dice que el gradiente es momento de marca, no superficie.

**Oscuro NO**, aunque se vea más fuerte: §05 (el linaje) ya es `.bg-dark`, y
`.bg-dark + .bg-dark` colapsa el padding entre las dos. La bifurcación quedaría
fundida con el linaje en un solo bloque negro de ~2,100 px y perdería su
identidad justo el bloque que `docs/02-paginas.md` llama «el más importante del
sitio».

### Los respaldos — cada carril con el suyo, atribuido

- **Aprender:** `40 años` de criterio financiero y `+2,000` empresas asesoradas
  en LATAM — **Jorge Sierra (papá)**. Va **dentro** del recuadro de la isla, no
  a nivel tarjeta: es la prueba de Finanzas, no del método genérico. Regla 4 de
  `CLAUDE.md` — los números se atribuyen.
- **Soluciones:** `3–4 h → 20 min` (Morgan) y `5–6 días → minutos` (Extrusión de
  Aleaciones), de los dos testimonios.

⚠️ Los dos de Soluciones **dependen de la misma confirmación** que la cita de
§02: nombre exacto de las empresas. Si no está confirmado, **no publiques esa
fila**, y deja el resto de la tarjeta.

### `/metodo` también usa este componente

`Bifurcacion.astro` es compartido. Todo lo nuevo —recuadros, respaldos, segundo
CTA— va **detrás de la prop `prominent`**, que hoy solo usa el home. `/metodo`
§10 se queda con la versión compacta y **no debe cambiar de alto**. Compruébalo
con un diff del HTML generado.

---

---

## 2 · `MapaEmpresa.astro` — el componente nuevo

**Referencia: `medios/mapa-empresa-referencia.html`.** Ábrela con doble clic
antes de escribir una línea. Trae las **cuatro variantes** ya resueltas.

Es la clasificación de Jorge: toda empresa son doce áreas en tres capas. Se
construye **una vez** y se reusa en cuatro lugares con props distintas — igual
que `Bifurcacion.astro` hoy.

### Los datos van a `src/data/mapa.ts`, no al componente

```ts
export interface AreaMapa {
  id: string;
  nombre: string;
  /** Sólo si Ilhas ya construyó ahí. Se muestra en la variante "prueba". */
  prueba?: string;
}
export interface CapaMapa {
  id: "externa" | "motor" | "base";
  nombre: string;
  que: string;
  areas: AreaMapa[];
}
```

Contenido exacto (no lo edites, es de Jorge):

| Capa | `nombre` | `que` | Áreas |
|---|---|---|---|
| `externa` | Cadena de ingresos | Lo que el cliente ve | Marketing · Ventas y cierre · Posventa y soporte · Cobranza |
| `motor` | Motor de valor | Donde se construye lo que se vendió | Ingeniería y desarrollo · Cadena de suministro · Producción y manufactura · Ejecución y entrega |
| `base` | Cimiento | Lo que sostiene a las otras dos | Finanzas corporativas · Contabilidad e impuestos · Administración · Talento humano · Tecnología |

Las `prueba` (dónde Ilhas ya construyó) — **siete de trece**:

| Área | `prueba` |
|---|---|
| Ventas y cierre | `cotizador · Morgan` |
| Cobranza | `cobranza automática` |
| Producción y manufactura | `despiece · Extrusión de Aleaciones` |
| Finanzas corporativas | `Cometa` |
| Contabilidad e impuestos | `Stampay` |
| Administración | `Paystand` |
| Talento humano | `Nomada` |

⚠️ **Cobranza va SIN nombre de producto ni de cliente: está bajo NDA.** Se
describe por la clase de problema, que es experiencia de Jorge, no información
del cliente. Igual que en `src/data/medios.ts`. **No la nombres.**

⚠️ **Los dos nombres de cliente dependen de la misma confirmación** que la cita
de §02. Si Jorge no confirmó el nombre exacto de las empresas, publica esas dos
fichas **sin la línea de prueba** — la ficha del área se queda, el crédito no.

### Las props

```ts
interface Props {
  /** "limpio" | "prueba" | "cimiento" */
  variante?: "limpio" | "prueba" | "cimiento";
}
```

### Las tres decisiones de diseño que hacen el argumento

Estas no son estética. Si las cambias, el diagrama deja de argumentar y se
vuelve una lista con marcos. Cópialas de la referencia tal cual:

1. **Es UN objeto con tres estratos, no tres tarjetas.** `border-radius` solo
   en las esquinas exteriores (`overflow:hidden` en el contenedor) y bordes
   internos a hueso. Tres cajas separadas se leen como categorías; un bloque
   estratificado se lee como estructura.

2. **La barra izquierda gana peso hacia abajo:** opacidad `.28` → `.55` → `1`
   sobre `--ilhas-primary`. Es el gradiente de carga. Nadie lo lee
   conscientemente y todos lo sienten.

3. **El cimiento es `--ilhas-dark` y con más `padding-block`** que las otras
   dos. Se ve más denso y con más pisada — que es lo que hace un cimiento. El
   argumento «el fundamento sostiene» **no se escribe: se dibuja**. No le
   quites el fondo oscuro «para que combine».

En la variante `cimiento`, las dos capas de arriba bajan a `opacity:.42` —
**pero no se ocultan**: el argumento necesita verlas apagadas sosteniéndose
sobre la que sí importa.

### Dónde se usa

| Página | Variante | Kicker + H2 de andamio |
|---|---|---|
| `/metodo` | `limpio` | *Dónde entra el método* · «Toda empresa es lo mismo en tres capas.» |
| `/soluciones` | `prueba` | *Dónde ya entramos* · «No es un catálogo. Es dónde ya lo hicimos.» |
| `/finanzas` | `cimiento` | *Por dónde se empieza* · «Se empieza abajo. Siempre.» |
| **Home** | ninguna — versión mini, ver §1 | — |

En `/soluciones` la variante `prueba` va **con su leyenda debajo**: *«Las áreas
marcadas son donde Ilhas ya construyó y dejó corriendo un sistema.»* Sin la
leyenda, los puntos morados no significan nada.

En `/metodo`, el mapa entra como sección nueva **después de §04 (I·L·H·A·S paso
por paso)**: primero el método, luego dónde aplica. `/metodo` ya es la página
más alta del sitio (8,797 px) — mete el mapa y **repórtalo**, no fusiones otras
secciones en esta corrida.

---

## 3 · Verificación — obligatoria

```bash
npm run medios     # cero ⚠
npm run build      # cero warnings
```

Y sobre `dist/`, **no sobre `src/`** (la lección de la regresión de
`producto-cometa`: el checker decía verde y la imagen no estaba en la página):

1. `grep -c "implementación de IA" dist/index.html` → **0**.
2. `grep -o 'class="[^"]*bifurcacion__card[^"]*"' dist/index.html | wc -l` → las
   tarjetas ya **no** son `<a>`. Confirma que no quedó ninguna liga anidada:
   `grep -c "<a[^>]*>[^<]*<a" dist/index.html` → **0**.
3. `grep -c "Cimiento" dist/index.html dist/metodo/index.html dist/soluciones/index.html dist/finanzas/index.html`
   → las cuatro con al menos 1.
4. `grep -c "Cometa\|Stampay\|Paystand\|Nomada" dist/soluciones/index.html`
   → ≥ 4. Si da 0, la variante `prueba` no se aplicó.
5. `grep -i "próximamente\|customer success\|ilhas operaciones" dist/*.html`
   → **nada**. Ninguna isla futura se coló.
6. Que el mapa **no** aparezca completo en `dist/index.html`: el home lleva solo
   los tres nombres de capa. `grep -c "Cadena de suministro" dist/index.html`
   → **0**.

### Capturas

Sirve `dist/` y captura `/`, `/metodo`, `/soluciones` y `/finanzas` en
**1440 × 900** y **390 × 844**. Comprueba una por una:

- [ ] Las tres capas se leen como **un** bloque estratificado, no como tres
      tarjetas sueltas. Si ves tres marcos separados, se perdió el
      `overflow:hidden`.
- [ ] La barra izquierda se ve más fuerte abajo que arriba.
- [ ] El cimiento sigue oscuro en las cuatro páginas.
- [ ] **Contraste:** el texto chico de las fichas con prueba sobre el cimiento
      oscuro (`Cometa`, `Stampay`, `Paystand`, `Nomada`) tiene que pasar AA.
      Mídelo, no lo supongas — es texto pequeño sobre morado sobre oscuro.
- [ ] **En 390 px el cimiento no se convierte en una torre.** Cinco fichas
      apiladas de una en una lo hacen crecer de más. Si pasa, deja que las
      fichas envuelvan en dos por renglón antes de reducir tipografía.
- [ ] Las dos tarjetas de la bifurcación terminan a la MISMA altura y sus
      botones quedan alineados. Si una tiene un hueco blanco grande, falta
      contenido — **no lo rellenes con paja, repórtalo**.
- [ ] La bifurcación se distingue de §02 a simple vista (el lavado se ve).
- [ ] `/metodo` §10 (su propia bifurcación) **no cambió de alto**.

---

## Qué NO hacer

- No tocar el copy. Ni una palabra.
- No nombrar islas futuras, ni con "próximamente". Solo "abierto hoy".
- No nombrar el producto ni el cliente de **Cobranza**: está bajo NDA.
- No anidar `<a>` dentro de `<a>` en las tarjetas de la bifurcación.
- No poner la bifurcación en `.bg-dark`.
- No quitarle el fondo oscuro al cimiento.
- No convertir el mapa en imagen. Si se exporta a PNG, deja de ser accesible y
  de responder en móvil.
- No meter el mapa completo en el home.
- No rellenar la tarjeta corta con texto de relleno para emparejar alturas.
- No agregar JavaScript de cliente.

---

## Al terminar, reporta

1. Archivos tocados y por qué.
2. Salida de `npm run medios` y `npm run build`.
3. Los seis greps de §3 con su resultado.
4. Las ocho capturas.
5. La medición de contraste de las fichas con prueba sobre el cimiento.
6. Cuánto creció `/metodo`.
7. Si las líneas de crédito de Morgan y Extrusión se publicaron o no, y por qué.
