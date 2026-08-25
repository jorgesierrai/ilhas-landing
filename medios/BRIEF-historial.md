# Brief — El historial: línea de tiempo, tarjetas y banda del home

**Fecha:** 24 ago 2026 · Decidido con Jorge en Cowork.
Este brief cubre tres cambios que van juntos porque cuentan **el mismo argumento**.

---

## El argumento (leer esto antes de tocar código)

Ilhas tiene dos pruebas distintas y hoy el sitio solo muestra una:

| | La prueba | Qué le compra al visitante |
|---|---|---|
| **Fundamento** | Radio 2018, conferencias nov 2017 y abr 2018, la formación desde 2014 | *"Estos entienden la IA desde antes de que fuera negocio"* |
| **Construcción** | Nomada, Paystand, Stampay, Cometa y dos productos bajo NDA | *"Estos saben construir cosas que funcionan"* |

Casi toda la construcción es **infraestructura financiera para fintechs**. Eso no es una lista de proyectos: es una especialidad, y es lo que justifica que la primera isla sea finanzas.

**La regla de tono que manda aquí:** el sitio **nunca dice** "no somos hype" ni "no somos humo". Las fechas hacen ese trabajo solas. Decirlo suena defensivo y mete la palabra en la página. El visitante llega a la conclusión por su cuenta, y esa pesa diez veces más.

**La regla de exactitud:** cada hito se describe con **el vocabulario de su año**. El trabajo de 2016 no se llama "agentes de IA" — se llamaba investigación de algoritmos. Una línea que suena retrofiteada mata el argumento entero.

---

## 1 · La línea de tiempo

**Ya está escrita:** `medios/timeline-preview.html`. Ábrela desde `medios/` para que resuelvan las fuentes y los videos.

Es un archivo autónomo pensado para portarse a un componente de Astro casi tal cual: los tokens de arriba están copiados de `src/styles/tokens.css`, el marcado es semántico (`<ol>` / `<li>`), y no hay una línea de JavaScript.

### Por qué es vertical y no horizontal

La línea que existía (`metodo-timeline.png`) es **furniture de video**: horizontal, con un solo nodo destacado y variante con glow. En video funciona porque **el tiempo revela los nodos uno por uno**. Una página no tiene eje de tiempo — todo aterriza de golpe, y catorce hitos horizontales a 1140 px dan 80 px por hito. Ilegible, y en móvil imposible.

La versión vertical conserva el mismo lenguaje visual (spine con gradiente, nodos con glow y anillo, años en Space Grotesk, fondo tinta) y además:
- aguanta cualquier número de hitos
- funciona en móvil sin cambiar el marcado
- deja colgar el video o la foto de su año

### Al portarlo a Astro

- Los hitos salen a `src/data/historial.ts` como array. **Nadie debería editar HTML para agregar un año.**
- Los tres hitos con prueba (`.hito--prueba`) leen su media del sistema de ranuras — no rutas a mano. Reusa `VideoClip.astro` y `Captura.astro`.
- Los `<video>` van con `preload="none"` y póster, como ya están.
- El párrafo de intro trae un `<!-- TODO copy -->`: **Jorge lo escribe**, no lo inventes.
- `metodo-timeline.png` deja de usarse en `/metodo` §04. Sácalo de la página; la ranura puede quedarse en el manifiesto por si vuelve.

---

## 2 · Las seis tarjetas, tituladas por lo que resuelven

Hoy las tarjetas de `/` §05 y `/soluciones` §03 se titulan con el nombre del producto. *"Stampay"* no le dice nada a un visitante; *"Conciliación bancaria automática"* le dice todo. Y dos de los seis **ya no pueden llevar nombre** (NDA), así que titular por función además empareja.

| Título | Detalle | Marca · año |
|---|---|---|
| Conciliación bancaria automática | SAT/CFDI contra movimientos. Eliminó dos a tres días de trabajo manual por cierre | Stampay · 2022 |
| AR/AP en pagos B2B | Smart Lockbox y Spend Card: dos productos de cero a uno | Paystand · 2020 |
| HRIS y nómina desde cero | | Nomada · 2018 |
| Consultas en lenguaje natural sobre la base financiera | «¿Cuánto entró hoy?» → respuesta al instante | Cometa · 2025 |
| Clasificación de pagos internacionales con agentes | Mide la tasa de aprobación real y detecta en qué paso se atoran los cobros | 2026 |
| Cobranza automática con reglas | Diagnostica por qué falló el cargo; el agente decide cuándo reintentar, a qué cuenta y con qué método | 2026 |

### ~~⚠️ Los dos últimos están bajo NDA~~ · CORREGIDO 24 ago 2026

> **Jorge tiene los derechos de los dos.** Lo de abajo se escribió sobre el
> supuesto de un NDA que no aplica. Las capturas **se publican**, y los ids
> neutros (`producto-pagos-intl`, `producto-cobranza`) se quedan porque la
> etiqueta vieja no correspondía a lo que muestra la pantalla — no por una
> restricción legal. El titulado por función es de §2 y sigue vigente.

**No llevan nombre de producto ni de cliente. Ninguno de los dos.** Se describen por la clase de problema, que es experiencia de Jorge, no información del cliente.

Las capturas correspondientes (`producto-factumizer.png` y `producto-nomcont.png`) muestran **la interfaz del cliente**. Una descripción es de Jorge; una pantalla es de ellos. **Decisión pendiente de Jorge, no la tomes por él:** publicar el texto sin la captura es la opción segura.

### Renombres

Dos ids del manifiesto ya no corresponden. Renombrar es un cambio en **cinco lugares** cada uno — id de ranura, archivo `.png`, entrada del manifiesto, copy del home §05 y copy de `/soluciones` §03 — y tiene que quedar parejo:

- `producto-factumizer` → algo neutral tipo `producto-pagos-intl`
- `producto-nomcont` → algo neutral tipo `producto-cobranza`

**Las capturas actuales sí son las correctas** — lo que estaba mal era la etiqueta. `producto-nomcont.png` muestra un tablero de *Smart Retry* con razones de fallo, que empata con cobranza automática. `producto-factumizer.png` muestra *Payment Operations* con estados de pago, que empata con clasificación de pagos. No hay que volver a capturar nada.

### El titular de la sección

`/` §05 dice hoy *"No es teoría. Es lo que ya construimos."* con seis nombres sueltos. Con la especialidad identificada puede decir algo mucho más filoso: **años construyendo infraestructura financiera para fintechs**. Eso deja de ser una lista y se vuelve un posicionamiento — y de paso explica por qué la primera isla es finanzas.

**Copy final: Jorge.** Aquí solo va la dirección.

---

## 3 · La banda del home

Debajo del hero, antes de §02. Delgada, ≤ 80 px, sin fondo propio. **No es una sección.**

Tres fechas y una línea:

> **Hablando de IA en público desde 2017.**
> nov 2017 conferencia · ene 2018 radio nacional · abr 2018 Talent Land

Enlaza a `/nosotros`. **Nada más.** El home tiene ocho segundos: meterle los tres videos mata el home y hace que no se vea ninguno. La banda vende en dos segundos y manda al carril de quien quiera la prueba completa.

---

## Datos confirmados por Jorge (24 ago 2026)

- **Radio:** enero 2018, Imagen Radio / RMX. Liga: `https://www.rmx.com.mx/entrevistas/buscas-un-asistente-virtual-conoce-coophi`
- **Conferencia en video:** noviembre 2017. **Sin nombre de evento** — no se acuerda; no inventar uno.
- **Fotos de conferencia:** Talent Land, **abril 2018**. (Se verificó: Talent Land nació en 2018, no existía en 2017.)
- **Atribuciones:** Irlanda Morgan · Directora de operaciones · Morgan Centro de Alta Especialidad. Jesús Flores · Gerente de Operaciones · Extrusión de Aleaciones. Las dos ya están en `src/data/medios.ts`.
- **Años de construcción:** Nomada 2018 · Paystand 2020 · Stampay 2022 · Cometa 2025 · pagos internacionales 2026 · cobranza 2026.
- **Hito 2023:** se queda como está — *ChatGPT 3 para contenido y product marketing*. Decisión de Jorge, no reabrir.

---

## Qué NO hacer

- No escribir copy de marketing nuevo. Los textos de este brief son andamio; Jorge los ajusta.
- No nombrar los dos productos bajo NDA, ni siquiera "un cliente del sector X".
- No meter la línea de tiempo completa en el home.
- No decir "no somos hype" ni ninguna variante.
- No convertir la línea vertical en imagen. Si se exporta a PNG, vuelve el problema que se está resolviendo.
