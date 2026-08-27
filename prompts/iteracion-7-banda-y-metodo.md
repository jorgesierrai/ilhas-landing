# Iteración 7 — La banda Ilhas→Hilas, y `/metodo` 05 a 09

**Para Claude Code. Ejecuta esto tal cual, de arriba a abajo.**
Decidido con Jorge el 27 ago 2026.

> Corre **después** de `prompts/iteracion-6-metodo.md`. La 6 rehace §01–§04 de
> `/metodo`; ésta se apoya en eso — §05 y §08 se **meten dentro** de §04.
>
> **De dónde sale la rama.** La 6 ya está corrida y vive en `metodo-01-04`, que
> todavía **no está en `main`**. Así que esta rama sale de **`metodo-01-04`**, no
> de `main`. Si para cuando corras esto ya se hizo el merge, sale de `main`
> actualizada — verifícalo antes con `git log --oneline main..metodo-01-04`.

---

## Reglas

1. **El copy es de Jorge.** Andamio se ajusta, sustancia no se inventa.
2. **Cero JavaScript de cliente.** La rotación de la banda es `@keyframes` puro.
3. **Un gradiente por titular.**
4. **No se anuncian islas futuras** (regla 3 de `CLAUDE.md`).

Rama nueva: **`banda-hilas-y-metodo`**, salida de `metodo-01-04` (ver arriba).

---

## 1 · La banda «Ilhas → Hilas» — sección nueva en el home

**Referencia: `medios/hilas-referencia.html`.** Ábrela y déjala correr un ciclo
completo (25 s) antes de escribir código.

### Dónde va

Pegada **debajo del hero**, a sangre completa. **El hero no se toca. Nada.**

Y **la banda de autoridad se baja**: hoy está justo debajo del hero; se mueve a
**justo antes de §02**. Dos tiras delgadas pegadas compiten y ninguna gana. Y
abajo funciona mejor: §02 abre con el 95 % que fracasa, y llegar a ese reclamo
venido de *"llevamos hablando de esto desde 2017"* le da autoridad al dato.

Orden final del home:

```
hero (oscuro)
└─ banda Ilhas→Hilas        ← NUEVA
   banda de autoridad        ← BAJA hasta aquí
   §02 El hueco
   §04 La bifurcación
   …
```

### Qué es

El nombre de la casa volviéndose su propio verbo. **I·L·H·A·S** con la H movida
al frente da **H·I·L·A·S** — y "hilar" es el paso H del método, el que Jorge
llama el más importante. Las mismas cinco letras.

No se explica en la banda. Se explica en `/metodo` §09. Aquí solo se ve.

### Las cinco líneas — copy de Jorge, va literal

| Línea | Resultado |
|---|---|
| **Hilas** tus finanzas. | Dejas de armar el número y empiezas a decidir con él. |
| **Hilas** tus ventas. | La cotización sale en veinte minutos, no en cuatro horas. |
| **Hilas** tu cobranza. | Sabes por qué falló cada cargo, no nada más que falló. |
| **Hilas** tu contabilidad. | El cierre deja de costar dos o tres días de captura. |
| **Hilas** tu soporte. | Cada ticket llega con contexto, no en blanco. |

⚠️ **Dos traen cifras reales, no las toques:** *veinte minutos vs cuatro horas*
es el testimonio de Morgan; *dos o tres días de captura* es Stampay, está en
`medios/BRIEF-historial.md`. Las otras tres no llevan cifra a propósito.

⚠️ **Rota el ÁREA, nunca el producto.** Se escribe *"Hilas tus ventas"*. **Nunca**
*"Ilhas Ventas"*, *"Ilhas Soporte"* ni nada por el estilo: eso sería anunciar una
isla que no existe. Un área es una capacidad del método hoy.

### Las decisiones de diseño — cópialas, no las reinventes

1. **Superficie blanca** contra el `--ilhas-light` de la página. Con
   `--ilhas-light` se leía como espacio vacío con texto encima; en blanco se lee
   como un objeto.
2. **Filete de 3 px con `--ilhas-gradient-h` en el borde SUPERIOR**, justo en la
   frontera con el hero oscuro. La tinta del hero termina apoyada en una línea de
   marca. Es el mismo recurso de las tarjetas de la bifurcación — no es adorno
   nuevo, es el marcador de "momento de marca" que el sitio ya tiene, y
   `tokens.css` lo licencia aquí porque esta banda **es** la marca.
3. **El isotipo (`/assets/logo/logo-mark.svg`) junto a «Ilhas».** Es el único
   lugar del home donde el nombre se escribe suelto: va firmado.
4. **«Hilas» en `--ilhas-primary`, «Ilhas» en `--ilhas-dark`.** El ojo agarra las
   mismas cinco letras en dos colores y resuelve el juego solo.
5. **Altura fija en el contenedor del carrusel.** Los cinco ítems van absolutos y
   apilados; sin altura fija la banda brinca en cada cambio.

### La rotación

`@keyframes` puro, ciclo de **25 s**, **5 s por línea**, con `animation-delay`
escalonado de 5 en 5. **Cero JavaScript.**

Los cinco `<li>` viven en el DOM siempre: un lector de pantalla los lee todos y
Google los indexa todos. Con `prefers-reduced-motion: reduce` se congela en el
primero y los otros cuatro se ocultan.

**Medido en la referencia:** 117 px en desktop, ~197 px en móvil.

---

## 2 · §05 «El paso joya» — se renombra y se disuelve

Se llama **«El paso más importante»**, no "el paso joya".

Y **la sección suelta desaparece**. Su contenido se mete **dentro del bloque
H · Hilar** de §04, que es donde vive el método completo desde la iteración 6.

Dentro del bloque de la H, después del detalle largo:

> **El paso más importante.** Hilar es enhebrar piezas sueltas en una sola línea.
> En construir software y tecnología eso tiene nombre — *Opportunity Solution
> Tree*: tomar oportunidades dispersas y anclarlas a un solo resultado. Mismo
> verbo, mismo trabajo. Aplicado a tus números, es lo que convierte costos,
> precios y márgenes sueltos en un solo criterio de decisión.

`/metodo` pierde una sección. Bien: es la página más alta del sitio.

---

## 3 · §06 Los principios — el diseño sale del contenido

A Jorge le gusta lo que dicen. Lo que falta es cómo se presentan.

⚠️ **NO les pongas iconitos.** Son ideas abstractas —*fundamento antes que
automatización*, *la IA es infraestructura*— y los íconos para abstracciones
acaban siempre en engranes y focos genéricos. Abaratan, no elevan. Además
serían cinco ranuras nuevas en el manifiesto y ya hay ocho pendientes.

**Lo que sí los levanta, y sale de ellos mismos:** cuatro de los cinco **son
oposiciones**.

| # | Gana | Pierde |
|---|---|---|
| 1 | Fundamento | **antes que** automatización |
| 2 | Infraestructura | **no** un feature |
| 3 | Workflows | **sobre** roles |
| 4 | Outcomes | **sobre** outputs |
| 5 | *Builder mindset* — **no es oposición** | |

Preséntalos como lo que son: **A contra B**, con el lado que gana en
`--ilhas-dark` y el que pierde apagado (gris, menor peso). Se escanean en dos
segundos y el argumento se ve sin leerlo.

**El quinto va aparte.** No es una oposición: es la consecuencia de los otros
cuatro. Dale su propio remate al final del bloque, con otro peso.

No inventes copy: los textos que ya están son de Jorge.

---

## 4 · §07 «Cómo se usa en la práctica» — hay que bajarla de peso

**Mide 3,115 px. Es la sección más alta de todo el sitio**, y `/metodo` ya es la
página más alta.

El contenido está bien; el problema es la forma. Las cuatro capturas del sistema
de agentes van apiladas a ancho completo, y cada una cuesta ~700 px.

- **Las cuatro capturas pasan a rejilla de 2 × 2** en desktop, una columna en
  móvil. Se leen como un set —que es lo que son— en vez de como cuatro cosas
  distintas.
- El texto de intro se aprieta: la idea es una sola y hoy toma un párrafo largo.
- Las anotaciones siguen en HTML, **nunca quemadas en el PNG**
  (`PLAN-MEDIOS.md` parte 3).

**Mide la sección antes y después y repórtalo.** Meta: por debajo de 1,800 px.

---

## 5 · §08 «A dónde llegas» — la palabra "agentes" está mal, y se disuelve

Hoy dice *"Sales con tu propio equipo de agentes"*.

**Jorge:** no necesariamente son agentes. Puede ser una automatización
determinista, un bot, una app, o solo alertas y correos. Decir "agentes" promete
una forma específica y encima la de moda.

El arreglo sale del propio método, paso **S**: *"entender qué nivel de tecnología
le vas a aplicar: si con una automatización, un bot, un agente, skills, una
aplicación completa, o solo alertas"*. **El nivel lo decides tú** — eso es lo que
hay que decir.

Andamio:

> Llegas con una idea de dónde estás perdiendo tiempo y dinero. Sales con el
> sistema armado — y con el criterio para decidir de qué tamaño tenía que ser.

Y **la sección suelta desaparece**: esto es el cierre del método, así que va
**al final de §04**, después del bloque de la S y junto al remate del ciclo
(«y con eso vuelves a empezar en Identificar»).

`/metodo` pierde su segunda sección en esta corrida.

---

## 6 · §09 «Por qué se llama Ilhas» — se cae finanzas, entra Hilas

Hoy dice *"El método es el barco. **Finanzas es la primera isla.**"*

**Se cae la segunda mitad.** El método es genérico y así quedó la bifurcación;
esta sección no puede volver a atar el nombre a una sola isla.

Lo que se queda: **el método es el barco, las islas son a dónde lo apuntas.**

Y entra lo nuevo, que es la explicación que la banda del home no da:

> **Ilhas** son islas, en portugués — a dónde apuntas el método.
> Y si mueves la **H** de lugar, las mismas cinco letras dicen **Hilas**:
> hilas tus procesos, hilas tus números, hilas tu criterio en una sola línea.
> El nombre y el paso más importante están hechos de las mismas letras.

Esta sección es **la que le da sentido a la banda del home**. Si alguien vio la
banda y le picó la curiosidad, aquí es donde cae. Que se note que es el remate,
no un dato de trivia.

---

## 7 · Verificación

```bash
npm run build      # cero warnings
npm run medios     # sin ⚠ nuevos
```

Sobre `dist/`, **no sobre `src/`**:

1. `grep -c "script" dist/index.html dist/metodo/index.html` → **0** en las dos.
   Cero JS de cliente; si la banda trajo JS, está mal hecha.
2. `grep -c "Hilas" dist/index.html` → **≥ 5** (las cinco líneas en el DOM).
3. `grep -iE "Ilhas (Ventas|Soporte|Cobranza|Operaciones|Marketing)" dist/*.html dist/*/index.html`
   → **nada**. Ninguna isla anunciada.
4. `grep -c "paso joya" dist/metodo/index.html` → **0**.
5. `grep -c "equipo de agentes" dist/metodo/index.html` → **0**.
6. `grep -c "Finanzas es la primera isla" dist/metodo/index.html` → **0**.
7. `grep -c "prefers-reduced-motion" dist/_astro/*.css` → **≥ 1** y que cubra
   la banda.

### Capturas

`/` y `/metodo` en **1440 × 900** y **390 × 844**. Y además:

- [ ] La banda: el filete de gradiente se ve **arriba**, pegado al hero oscuro.
- [ ] «Ilhas» y «Hilas» se leen en la misma línea y se nota que son las mismas
      letras.
- [ ] La banda **no brinca de alto** al cambiar de línea. Grábalo o mide el
      `offsetHeight` en tres momentos distintos del ciclo — tienen que dar igual.
- [ ] La banda de autoridad quedó **antes de §02**, no debajo del hero.
- [ ] Los principios se escanean como oposiciones, y el quinto se ve distinto.
- [ ] §07 bajó de 3,115 px.

### Alturas — repórtalas todas

| | Antes | Después |
|---|---|---|
| `/` total | | |
| `/metodo` total | | |
| `/metodo` §07 | 3,115 px | |

---

## Qué NO hacer

- No tocar el hero del home. Nada.
- No escribir «Ilhas Ventas» ni ninguna isla que no exista.
- No ponerle iconitos a los principios.
- No dejar la palabra "agentes" como la única salida del método.
- No usar JavaScript para la rotación.
- No quemar anotaciones dentro de los PNG de §07.
- No inventar cifras. Las dos de la banda son reales y ya están verificadas.
- No dejar §05 ni §08 como secciones sueltas: se disuelven dentro de §04.

---

## Al terminar, reporta

1. Archivos tocados.
2. `npm run build` y `npm run medios`.
3. Los siete greps.
4. Las cuatro capturas.
5. La tabla de alturas completa.
6. Las tres mediciones de `offsetHeight` de la banda.
