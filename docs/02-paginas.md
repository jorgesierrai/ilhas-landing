# 02 · Especificación de páginas

Página por página: su único trabajo, quién llega, los bloques en orden, el CTA y de dónde sale el copy.

**Regla que aplica a las cinco:** la carnita arriba. Sustancia en el primer scroll. Sin intro larga, sin hype, sin relleno. Ver `04-voz-del-cliente.md`.

---

## `/` — Home

**Su único trabajo:** que quien cae de un reel entienda qué es Ilhas en ocho segundos y entre al carril correcto. **No vende: ramifica.**

**Quién llega:** tráfico frío de redes, sin saber qué es Ilhas ni qué necesita. También gente que buscó el nombre después de ver un video.

### Bloques, en orden

**01 · Hero — la línea de identidad**
Frase de poder de 12–16 palabras + subfrase de una línea + los dos carriles como CTA doble.
Sin imagen de stock. Si hay algo visual, que sea el gradiente de marca o el isotipo a escala grande.

> **Resuelto el 25–26 ago 2026.** La línea de identidad está escrita y en producción:
> *"Tecnología y experiencia de **clase mundial**. Accesible para tu empresa **con IA**."*
> El hero además dejó de ser abstracto: lleva la foto de Jorge en Talent Land, el
> riel de tres cifras atribuidas y la banda de "hablando de IA en público desde
> 2017". Ver `prompts/iteracion-3-hero.md`. **No lo reabras**: las tres candidatas
> que vivían aquí ya se descartaron.

**02 · El hueco**
El 95% de los proyectos de IA empresarial fracasan — no por la tecnología, por falta de criterio. GIGO²: si le metes basura al modelo, sale basura al cuadrado. La IA amplifica el input, así que el fundamento importa **más**, no menos.
Este bloque establece el problema que Ilhas resuelve. Va temprano porque es lo que hace que el visitante siga leyendo.

**03 · ~~El método en cinco pasos, versión corta~~ — absorbido por §02**
> **Fusionado el 26 ago 2026** (`prompts/iteracion-4-hueco.md`). Era una lista de
> cinco líneas justo debajo del bloque que planteaba el problema, y repetía el
> mismo movimiento dos veces. Ahora §02 es **un solo mapa a dos columnas**: a la
> izquierda la falla que reportan MIT, Cisco y Gartner con su fuente; a la
> derecha el paso del método que la cubre. La lista suelta ya no existe, y el
> acrónimo se deletrea en el remate del mapa. Los cinco pasos salen del mismo
> array que usa `/metodo`: no pueden desincronizarse.

> **Actualizado el 25 ago 2026.** El trabajo con datos estaba repartido implícito
> entre I, L y H, y nombrado en ninguno. Decisión de Jorge: **la línea base es de
> I, los datos son de L.** «Levantamiento» en español de México ya se lee como
> *levantamiento de información*, así que la palabra ya hacía ese trabajo; ahora
> carga las dos cosas. **S** suma el mantenimiento, porque el modo de falla que
> reportan MIT y Gartner es el abandono después del piloto.

**04 · La bifurcación — el bloque más importante del sitio**
Dos tarjetas grandes, iguales en peso visual:
- **Lo aprendes tú** → Aprende el método → `/metodo`, con la isla abierta (`/finanzas`) adentro
- **Lo hacemos nosotros** → Soluciones → `/soluciones`

Este bloque *es* el conector. Todo lo demás del home existe para darle permiso de funcionar. No lo entierres abajo y no lo hagas chiquito.

> **Reescrito el 26 ago 2026** (`prompts/iteracion-5-bifurcacion-mapa.md`). Tres cosas cambiaron y ninguna es cosmética:
>
> - **El carril de aprender es genérico.** Antes se titulaba «Ilhas Finanzas», como si el producto fuera finanzas. El producto es el **método**; Finanzas es la primera isla, y por eso vive en su propio recuadro `● Abierto hoy` dentro de la tarjeta. Así los chips de finanzas dejan de contradecir la promesa universal y pasan a ser la prueba de que la puerta es real. Regla 3 de `CLAUDE.md` intacta: «abierto hoy» es un hecho del presente, no un anuncio de islas futuras.
> - **Las tarjetas dicen qué te llevas, no cómo se entrega.** «El método, enseñado» describía logística. Nadie compra logística.
> - **El H2 depende de §02.** «Ya sabes qué tiene que pasar» solo es verdad porque el hueco y el mapa I·L·H·A·S acaban de explicarlo arriba. Si §02 se recorta, esta frase se queda sin piso.
>
> La sección va con **lavado de marca** (`.bg-lavado`), no en blanco ni en oscuro: `.bg-white + .bg-white` colapsa contra §02 y `.bg-dark + .bg-dark` la fundiría con §05.

**05 · Prueba — el linaje**
Los productos que Jorge ya construyó, presentados como evidencia de que el método salió de algún lado real: Stampay, Nomcont, el Data Concierge de Cometa, Nomada, Paystand, Factumizer. Una línea cada uno: qué dolor resuelve.
Fuente: la Biblia de Producto, §2.

**06 · ~~Quiénes somos, corto~~ — NO VA. Decisión de Jorge, 27 ago 2026.**

> El home **no lleva tarjetas de equipo**. La autoridad ya está resuelta arriba y
> tres veces: el riel de cifras del hero (+1,000 MDP al mes · 6+ startups · 2016
> desarrollando IA), la foto de Jorge en Talent Land detrás del titular, y la
> banda de "hablando de IA en público desde 2017", que además liga a
> `/nosotros`. Repetir las caras a 4,800 px de scroll no agrega prueba: agrega
> largo. Quien quiera cara y trayectoria entra a `/nosotros`, que es la página
> cuyo trabajo es exactamente ese.
>
> **No lo reabras** sin una razón nueva. Si el bloque vuelve, vuelve porque el
> hero dejó de cargar la autoridad, no porque este documento lo pedía antes.

**07 · Cierre**
Repetición de la bifurcación o un CTA único a `/metodo` si no compró ninguno de los dos carriles. Sin popup, sin exit modal.

### CTA
Ninguno propio. **El bloque 04 es el CTA de esta página.**

### Fuente del copy
Biblia de Producto §0 (tesis), §2 (linaje), §9 (finanzas primero, universal de fondo) + el Deck del Método. Falta escribir de cero: la línea de identidad.

---

## `/metodo` — El Método

**Su único trabajo:** probar cómo pensamos. No vende nada. Es lo que hace que Ilhas no se lea como catálogo, y es lo único que nadie puede copiar.

**Quién llega:** el que quiere saber si vale la pena antes de comprometerse. También el que viene de `/soluciones` a verificar que sí sabemos.

### Bloques, en orden

1. **La tesis** — Ilhas no nació de las finanzas. Nació de construir producto. El Método Ilhas es el sistema operativo de un Product Architect, destilado y apuntado a tus números. *Finanzas es por dónde entras; el método es lo que te llevas.*
2. **El hueco** — el 95%, GIGO², la IA amplifica el input.
3. **El ángulo correcto** — esto **NO** es "el financiero atrapado en reportes es un PM malo". Esa analogía está prohibida. Es al revés: el método se parece al oficio de un arquitecto de producto **porque salió de ahí**. No comparamos a nadie con un product manager; le entregamos el sistema del arquitecto apuntado a su trabajo. Sin volverse técnico, sin esperar a ingeniería.
4. **I·L·H·A·S paso por paso**, con el mapeo al oficio de producto:

   | Paso | El oficio de producto | En tu trabajo |
   |---|---|---|
   | **I — Identificar** | Discovery — instrumentar y hallar el dolor antes de construir | Cómo se mueve el dinero, dónde se fuga, y desde qué número vas a medir |
   | **L — Levantamiento** | Continuous Discovery — levantar la información y el estándar | Dejas tus datos limpios y en un solo lugar, y traes el estándar de los mejores |
   | **H — Hilar** | Opportunity Solution Tree — enhebrar piezas en un resultado | Costos, precios y márgenes en un solo criterio |
   | **A — Accionar** | Assumption testing + POC — decidir con datos | Decides con números: precio, contratar, invertir |
   | **S — Sistematizar** | Delivery + automation — el motor que corre solo | La IA como tu equipo, con alertas y mantenimiento |

4b. **Dónde entra el método — el mapa de la empresa** (variante `limpio`, nada resaltado: la universalidad *es* el argumento). Va **después** del acrónimo, no antes: primero el método, luego dónde aplica. Al revés el visitante ve trece áreas sin saber todavía qué se les hace.

> **El mapa de la empresa — añadido el 26 ago 2026.** Un solo componente
> (`src/components/MapaEmpresa.astro`, datos en `src/data/mapa.ts`) con la
> clasificación de Jorge: toda empresa son trece áreas en tres capas —cadena de
> ingresos, motor de valor, cimiento— y el método no cambia de capa a capa. Se
> reusa en cuatro lugares con tres variantes y una versión mini. Los rótulos
> salen del mismo archivo en los cuatro: no pueden desincronizarse.

5. **Hilar = Opportunity Solution Tree — el paso joya.** "Hilar" es enhebrar piezas sueltas en una sola línea, y eso es exactamente el trabajo de un OST: tomar oportunidades regadas y anclarlas a un solo resultado. Mismo verbo, mismo trabajo. Nadie en el espacio de "finanzas con IA" está contando esto.
6. **Los cinco principios** — fundamento antes que automatización · la IA es infraestructura, no un feature · workflows sobre roles · outcomes sobre outputs · builder mindset.
7. **No son prompts: es reingeniería del trabajo.** El organigrama ha muerto. No organizas humanos haciendo tareas: organizas procesos lineales de inputs → outputs que generan dinero.
8. **BYOS → BYOA** — a dónde llega el que aprende esto: llega a su empresa con su propio ecosistema de agentes, no a pedir herramientas.
9. **El barco y las islas** — *"El método es el barco. Finanzas es la primera isla. Por eso se llama Ilhas."*
10. **Bifurcación** a `/finanzas` y a `/soluciones`.

### CTA
La bifurcación, no una venta.

### Fuente del copy
Casi toda la Biblia de Producto y el Deck del Método — **traducidos de "documento interno para Jorge" a "lo que lee un desconocido"**. Los originales dicen "tu cliente", "tu webinar", "guárdate esta distinción": eso no puede aparecer.

### ⛔ Lo que NO va aquí
**El Radar de Oportunidades completo.** Puedes decir que el método empieza cazando dónde duele. **No publiques** los tres ejes de scoring (Tiempo · Dolor · Palanca), ni el procedimiento de los 4 pasos, ni el cuadrante alto-alto-alto. Eso se vende dentro de la oferta del webinar.

---

## `/finanzas` — Ilhas Finanzas

**Su único trabajo:** mandar al webinar. Es la página más corta del sitio y la que menos dice.

**Quién llega:** profesionales de finanzas, contabilidad y análisis — analista, contador, controller, consultor, auditor, tesorero, FP&A. Empleados o independientes. **No** dueños de negocio: esos son expansión, no el núcleo. Ver `03-ntpvs.md`.

### Bloques, en orden

**01 · El dolor, en sus palabras**
Sabe de finanzas pero se le va la vida operando: reportes, cierres, conciliaciones, y nunca se acaba. Probó ChatGPT y le salió genérico. Sabe que la IA avanza y siente que se está quedando atrás.
Frase típica que se dice a sí mismo: *"Sé de finanzas, pero siento que me estoy quedando atrás."*
Fuente literal: `03-ntpvs.md` (Nicho) y `04-voz-del-cliente.md`.

**02 · Esto es lo que vas a poder hacer**
Rejilla con las tareas reales, **en las palabras que el cliente usa**: análisis de estados financieros con razones · flujo de efectivo · modelos y proyecciones · presupuesto y control de gestión · conciliaciones · dashboard sin licencias caras · valuación, TIR y VAN · reportes que se actualizan solos.
No es un temario y no es una FAQ. Es el espejo: el visitante se ve. Fuente: `04-voz-del-cliente.md`.

**02b · Por dónde se empieza — el mapa con el cimiento resaltado**
El mismo mapa, variante `cimiento`. Contesta la pregunta que `/finanzas` nunca contestaba: *«¿por qué finanzas primero?»* — si el cimiento está flojo, automatizar arriba solo amplifica el desorden. Las dos capas de arriba se **apagan pero no se ocultan**: el argumento necesita verlas sosteniéndose sobre la que sí importa.

**03 · Para quién es · para quién no**
El filtro sube el valor percibido y ahorra soporte. Corto, dos columnas.

**04 · Quién lo enseña**
**Aquí sí va el "40 + 12" junto**, porque aquí es donde padre e hijo se juntan. 40 años de criterio financiero + 12 años construyendo productos que mueven +1B MXN al mes. Atribuidos, no sumados en un solo número.

**05 · CTA único**
Un solo botón: **Reservar mi lugar en el webinar** → `eventos.ilhas.ai` con UTM.
Nombre del webinar: *"Finanzas con IA: de Reportes a Decisiones."*

**06 · Preguntas que bloquean la compra**
FAQ corto y quirúrgico. **Solo estos cuatro temas** — son los que el cliente repite en todos los webinars en vivo:
- **Seguridad y confidencialidad.** "En mi empresa los temas de seguridad bloquean las integraciones." "¿Cómo se trata la confidencialidad de los datos?"
- **Licencias.** "¿Necesito licencia de Office? Soy usuario de Gmail."
- **Qué herramienta.** "¿Para finanzas cuál es mejor, Claude, ChatGPT o Gemini?"
- **Formatos.** "¿Puede analizar PDF o solo Excel?"

No agregues más preguntas. Un FAQ largo baja la energía de la página.

**07 · Bloque secundario — servicios financieros y consejería — ⚠️ NO CONSTRUIDO**
Los 40 años del papá, aplicados directo a la empresa del cliente: diagnósticos financieros, valuaciones, precios de transferencia, modelos de inversión, reestructuras.
**Con su propio botón de agenda.** Es otro comprador; no compite por el mismo clic que el webinar. Va abajo, visualmente subordinado.

> **Hueco abierto, verificado el 27 ago 2026:** cero coincidencias en
> `dist/finanzas/index.html`. Faltan dos cosas que solo Jorge tiene: **el copy de
> los servicios** y **a dónde apunta el botón de agenda** (hoy no hay ninguna URL
> de agenda en el repositorio; el único destino externo es `eventos.ilhas.ai`).
> Sin esas dos, construirlo sería inventar oferta.

### ⛔ Lo que NO va aquí
Temario, precio, bonos, garantía, cupos, contador regresivo, la oferta. **Todo eso vive en Go High Level.** Esta página no es la página de ventas: es la puerta.

---

## `/soluciones` — Soluciones

**Su único trabajo:** **calificar, no vender.** Sin precio. Es la que puede traer dinero grande mientras el webinar madura, y hoy no existe en ningún lado.

**Quién llega:** decisor de empresa con un problema concreto y presupuesto. No quiere aprender: quiere que se resuelva.

### Bloques, en orden

1. **Qué resolvemos** — soluciones de IA que ahorran tiempo y mueven la aguja, en cualquier área. No es una agencia de "implementación de IA": es criterio de producto aplicado a un proceso que hoy se hace a mano.
2. **Cómo trabajamos** — el mismo I·L·H·A·S, apuntado a la empresa en vez de a una persona. Conecta con `/metodo`.
2b. **Dónde ya entramos — el mapa con la prueba encima** (variante `prueba`). El punto morado marca las siete áreas de trece donde Ilhas ya construyó: convierte el diagrama de promesa en historial sin una línea de copy, y prepara los casos de abajo, que son esos mismos puntos contados largo. **Va con su leyenda**: sin ella los puntos no significan nada. **Cobranza va sin nombre de producto ni de cliente** — está bajo NDA y se describe por la clase de problema, igual que en `src/data/productos.ts`.
3. **Casos** — las seis tarjetas de construcción, presentadas como portafolio. **Se titulan por lo que RESUELVEN, no por el nombre del producto**: "Stampay" no le dice nada a un visitante, "Conciliación bancaria automática" le dice todo. La marca y el año van de línea secundaria.

   | Lo que resuelve | Marca · año |
   |---|---|
   | Conciliación bancaria automática | Stampay · 2022 |
   | Cobranza automática con reglas | 2026 |
   | Consultas en lenguaje natural sobre la base financiera | Cometa · 2025 |
   | HRIS y nómina desde cero | Nomada · 2018 |
   | AR/AP en pagos B2B | Paystand · 2020 |
   | Clasificación de pagos internacionales con agentes | 2026 |

   > **Actualizado el 27 ago 2026.** La tabla que vivía aquí listaba **Nomcont** y
   > **Factumizer**, que ya no están, y titulaba por producto. La fuente única es
   > **`src/data/productos.ts`** — el home §05 y `/soluciones` §03 leen de ahí, así
   > que no se puede desincronizar. Si esta tabla y ese archivo difieren, manda el
   > archivo. Los dos de 2026 van sin marca por acuerdo con el cliente.

4. **CTA de diagnóstico.** Sin precio en la página.

### Fuente del copy
**Ya existe.** Es la tabla de linaje de la Biblia de Producto §2, que se escribió como credibilidad del webinar de finanzas. Leída sin ese marco, es literalmente un portafolio de soluciones de IA construidas para empresas.

### Nota
En el NTPVS, este carril aparece como el *high ticket por llamada*: "implementación done-for-you / inteligencia empresarial". No es un negocio nuevo — es el techo de la escalera que el webinar ya alimenta.

---

## `/nosotros` — Nosotros

**Su único trabajo:** poner cara y trayectoria a Ilhas. Sirve a los dos carriles por igual.

### Formato
**Tarjetas individuales, una por persona**, presentadas como **participantes de Ilhas** — no como dúo. Foto, nombre, su propia trayectoria. Rejilla que crece cuando entre gente para las otras islas.

### Por qué separados aquí y juntos en `/finanzas`
A nivel marca, cada quien trae lo suyo y la rejilla tiene que poder crecer. El **40 + 12** es el relato específico del webinar de Ilhas Finanzas, porque ahí es donde los dos se juntan. Aquí no.

### Regla de números
**Atribuidos, nunca sumados.**

| Dato | Qué es realmente | Cómo se escribe |
|---|---|---|
| +40 años | Trayectoria del papá en finanzas | "40 años asesorando empresas en LATAM" |
| +200 empresas | Carrera del papá | "+200 empresas asesoradas" |
| +1B MXN/mes | Productos fintech que Jorge ha liderado | "Productos que ha liderado procesan +1B MXN al mes" |
| 12 años | Carrera de Jorge en tech y producto | "12 años construyendo productos digitales" |

Nunca se presentan como resultados de alumnos. Cuando existan resultados reales de alumnos, van en sección aparte y claramente separados.

### ✅ Desbloqueada
Nombre, bio y foto de los dos ya están confirmados y en el sitio (`src/assets/equipo/`). La página está de vuelta en el menú.
