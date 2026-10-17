# Iteración 22 — `/temario`, el temario de Ilhas Academy

**Para Claude Code. Ejecuta esto tal cual.**

Página nueva: **www.ilhas.ai/temario**, con el temario completo de Ilhas Academy: 7 cursos, y el total de lecciones que diga el encabezado del temario. Jorge la va a mandar por WhatsApp, Instagram y en el webinar, y quiere saber cuánta gente la ve. Tiene que ser **sumamente digerible, fácil de navegar y convencer**, con la regla de tono de siempre: la carnita arriba, cero humo.

**Fuente única del contenido: `temario.md`**, que Jorge deja en la raíz del repo. Es la exportación de su doc maestro del temario (16 oct 2026). Si no está, pídeselo y no sigas.

---

## 0 · Antes de tocar nada

**0.1 · Rama desde `main`:** `git checkout main && git pull && git checkout -b temario`

**0.2 · Lee como siempre** `CLAUDE.md`, `docs/00-INDEX.md`, `docs/04-voz-del-cliente.md` y `docs/marca/`.

**0.3 · Esta iteración cambia la regla 1 de `CLAUDE.md`, por decisión de Jorge (16 oct 2026).** Hoy dice «nada de temario, precio, bonos ni oferta en este repositorio». Cámbiala a esto, sin aflojar lo demás:

> 1. **El sitio no vende el programa.** Manda a `eventos.ilhas.ai` con un clic: precio, oferta y compra viven allá. **Única excepción: `/temario`** (Jorge, 16 oct 2026): el temario completo, generado de `src/data/temario.md`, que es copia del doc maestro de Jorge. Sin costos de nada (ni del programa ni de herramientas, planes o licencias) y sin condiciones de compra. Ninguna otra página repite el temario: si lo necesita, enlaza a `/temario`.

Las reglas 2 a 5 no cambian. Ojo con la 2: el «Agente Radar» del temario no es el Radar de Oportunidades; el temario solo lo nombra, así que no choca. Y la 5 manda: cero placeholders, cero testimonios inventados.

## 1 · El contenido: una sola fuente, y no se reescribe

- Mueve `temario.md` a `src/data/temario.md`. La página lo lee **al compilar** (import `?raw` + un parser en `src/lib/temario.ts`). Así, cuando Jorge cambie el temario, solo reemplaza ese archivo y vuelve a publicar.
- **Tu trabajo es presentarlo, no editarlo.** No agregues cifras, promesas, testimonios, logos, urgencia («cupo limitado», contadores), precios ni fechas. Nada que no esté en el archivo.
- **Cero costos, de nada** (Jorge, 16 oct 2026): ni precio del programa, ni de herramientas, planes o licencias; ni «gratis», «de pago» o «cuánto pagar»; ni montos de dinero. El temario ya viene limpio: no lo metas en el microcopy, en el title, en la description ni en la tarjeta para redes.
- Sí puedes corregir acentos y erratas evidentes (CLAUDE.md: acentos correctos, siempre), directo en `src/data/temario.md`, y **enlistar cada corrección en tu mensaje final** para que Jorge la pase a su doc maestro. Y escribir microcopy de interfaz («Ver las 17 lecciones», «Índice», «Volver arriba») con el vocabulario de `docs/04-voz-del-cliente.md`.
- Si algo no cuadra (un conteo, una referencia a una lección que no existe, una frase cortada), **no lo arregles adivinando**: enlístalo y pregúntale a Jorge.
- Cómo viene el archivo, que es lo que el parser tiene que entender:
  - `## Título` = sección. Los cursos son `## N. Nombre`. Si la numeración salta (hoy pasa de 4 a 6), en la página numera por orden de aparición.
  - Cada curso abre con un párrafo que empieza en negritas (`**N lecciones…**`; la Masterclass, `**9 módulos · 37 lecciones…**`), y luego `**Cómo trabajas.**`, `**Antes de empezar.**` y `**Al terminar tienes:**` cuando existen.
  - `### Subtítulo` = módulo, nivel o fase. Un párrafo suelto debajo es su descripción.
  - Lección = `- **Código Título** — descripción.` y, sangrado debajo, `- Te llevas: …`. La Masterclass lista así sus **9 módulos** (no sus 37 lecciones).
  - `## 6. Bonos` trae dos cursos como `###`: Reporte en minutos y Tu herramienta correcta.
  - Tablas: «El programa en una mirada» (Curso · Te resuelve · Sales con · Lecciones) y «Las 5 fases» del Bootcamp.
  - Ignora el renglón de fecha y autor bajo el título, y el comentario HTML del diagrama (sus datos están en § 5).

## 2 · Un chequeo que no deja publicar un temario que no cuadra

Mismo patrón que `npm run eventos`: `scripts/temario-check.mjs` y `npm run temario`, dentro de `build`. Falla con un mensaje en español que diga qué no cuadra y dónde:

- Cada curso declara «N lecciones» y el parser cuenta N. En la Masterclass cuenta módulos: 9.
- Los números de la tabla «El programa en una mirada» coinciden con los de cada sección. El Playbook («1 video + fichas») cuenta como 1.
- La suma de la tabla coincide con el total del encabezado («7 cursos · N lecciones»). No escribas el total a mano en ningún lado: sale del archivo.
- Toda mención de una lección (por ejemplo, «la lección T.3») existe.
- No quedan residuos de exportación (`****`, `&#32;`, `&#91;`).
- No aparece ningún costo: ni `$`, `USD` o `MXN`, ni «gratis», «de pago», «cuánto pag…», «costo» o «licencia». «Precio, volumen o mezcla» y «compara precios contra un catálogo» son temas de análisis, no costos: no los marques.

## 3 · La página

`src/pages/temario.astro` con `Base.astro`: el header y el pie del sitio llevan a Ilhas. **No va en el menú**: es una URL para compartir, como `/jorgesierra`. Sí va en `public/sitemap.xml`. Title «Temario»; description con la frase de entrada del temario (160 caracteres como máximo); og:image, la portada por defecto.

De arriba abajo:

1. **Entrada.** «Finanzas + IA: de reportes a decisiones.» con su frase; una fila de datos (los cursos y las lecciones del encabezado · primero un caso práctico y luego tus números · cada lección deja un entregable · quién lo imparte), y dos botones: «Ver el temario» (ancla) y el CTA de § 4. Nada de hero vacío: a 390×844 ya se asoman las primeras tarjetas.
2. **El programa en una mirada.** Siete tarjetas, no una tabla: la pregunta de «Te resuelve» como línea grande, «Sales con» y el número de lecciones. Cada tarjeta lleva a su curso. El Playbook no tiene sección propia: su tarjeta lleva a «Lo que recibes».
3. **Índice fijo.** Barra de chips con `position: sticky` bajo el header, con scroll horizontal y `scroll-snap` en móvil: cada curso, Bonos, Lo que recibes, Quién lo imparte y Preguntas. `scroll-margin-top` en cada sección para que el header no tape el título.
4. **Al terminar, tienes**, como lista de logros, y **Cómo se trabaja**: los 4 pasos numerados y el diagrama de § 5.
5. **Para quién es.** Cuatro perfiles; cada uno enlaza al curso por donde empieza.
6. **Cada curso.** Encabezado con el nombre y su pregunta de «Te resuelve»; la entrada, «Cómo trabajas» y «Antes de empezar»; **«Al terminar tienes» destacado**. Módulos, niveles y fases en `<details>`, con el número de lecciones en el `<summary>`; el primero de cada curso va abierto. Cada lección: código (H.2), título, descripción y **«Te llevas» marcado para leerse de un vistazo**, porque es lo que vende. El Bootcamp abre con sus 5 fases I·L·H·A·S como pasos visuales con la letra grande, no como tabla. Al final de cada curso, «↑ Índice».
7. **Lo que recibes**, en rejilla.
8. **Quién lo imparte.** Reusa `TarjetaPersona` con los datos de `maestros` de `src/pages/finanzas.astro` (foto, atribuciones, distinción y `ENLACES`). Muévelos a `src/data/personas.ts` para que `/finanzas` y `/temario` lean lo mismo: no los dupliques. El texto de trayectoria sale del temario. **El rol de Jorge es «CEO de Ilhas»** (Jorge, 16 oct 2026). Sus redes: Instagram, TikTok, LinkedIn y su portafolio jorgesierra.io ya están en `ENLACES.hijo`. Agrega YouTube (`https://www.youtube.com/@soyjorgesierra`), que hoy solo vive en `jorgesierra.astro`: suma `youtube` al tipo `Red` y su ícono a `IconoSocial`. Eso también lo muestra en `/finanzas` y `/nosotros`, y está bien. No toques `/jorgesierra` en esta iteración; anota en el estado que su YouTube quedó duplicado. Debajo de las tarjetas, dos enlaces: «Conoce Ilhas» (`/`) y «Jorge en redes» (`/jorgesierra`).
9. **Preguntas frecuentes** en `<details>`.
10. **Cierre:** una sola banda con el CTA y el correo.

## 4 · Botones y medición: no se agrega ni un script

- **«Cuánta gente lo ve» ya se mide solo:** GA4 (G-ENCWN9XWT1) carga en `Base.astro`, y cada visita a `/temario` llega como `page_view`. **Cero píxeles y cero herramientas nuevas**; la CSP no se toca (CLAUDE.md).
- **CTA:** «Reservar el webinar» → `https://eventos.ilhas.ai/registro?utm_source=sitio&utm_medium=web&utm_campaign=webinar&utm_content=temario`, con `data-evento="webinar_reservar"`. Va en la entrada y en el cierre.
- **Correo:** `mailto:hola@ilhas.ai` con `data-evento="contacto_correo"`.
- **Registro de eventos:** agrega `/temario` a las `paginas` de `webinar_reservar` y `contacto_correo` en `src/data/eventos.ts` (el pie de `Base.astro` también sale aquí) y sube cada `minimo` a la cuenta real. `npm run eventos` falla si un evento aparece en una página que no está declarada.
- **No se mide** scroll, vistas de sección ni qué `<details>` se abren. `eventos.ts` explica por qué; no lo vuelvas a proponer.

## 5 · El diagrama «Qué curso ves en cada fase del Bootcamp»

Subtítulo: «Ruta sugerida. Los niveles 4 y 5 de IA de 0 a 100 van después, a tu ritmo.»

Columnas: **Antes · Durante el Bootcamp (tres tramos: I·L·H, A y S) · Después**. Filas:

- **Bootcamp Ilhas:** I·L·H en el tramo I·L·H, A en A y S en S. Es el eje: va resaltado.
- **Masterclass:** «9 módulos», en el tramo I·L·H.
- **IA de 0 a 100:** «Nivel 1» en Antes; «Nivel 2» en I·L·H; «Nivel 3» de A a S; «Niveles 4 y 5» en Después.
- **Análisis de datos:** «5 módulos», de A a S.
- **Bonos:** «Herramienta» en Antes; «Reporte» en S.

En escritorio, rejilla CSS (filas = cursos, columnas = tramos). En móvil, una lista por tramo, en orden (Antes → I·L·H → A → S → Después), con los cursos de cada uno.

## 6 · Diseño

- Tokens, colores y tipografías de `docs/marca/`. Las fuentes son propias (la CSP solo permite `font-src 'self'`): nada de Google Fonts.
- **Cero JavaScript fuera de GA4**, como el resto del sitio: anclas para navegar, `<details>` para abrir y CSS para lo fijo. Nada de buscador ni de «expandir todo».
- **Móvil primero:** casi todos llegan desde WhatsApp o Instagram en el teléfono. Objetivos de toque de 44 px como mínimo.
- Nivel Apple / Mindvalley / MasterClass: aire, jerarquía clara y renglones de unos 70 caracteres. Quien solo lea los encabezados debe entender el programa completo.
- Accesibilidad AA, foco visible y `alt` reales. Ids estables por curso y por lección (`#bootcamp`, `#bootcamp-h2`), para que Jorge pueda mandar el enlace directo a una lección.

## 7 · Antes de dar por terminado

- [ ] `npm run build` sin warnings (corre eventos y temario).
- [ ] Capturas a 390×844 y 1440×900 de la entrada, la mirada, un curso abierto, Quién lo imparte y el cierre. Nada cortado; el primer scroll ya tiene sustancia.
- [ ] El HTML de `/temario` solo trae los dos `<script>` de GA4, ninguno en línea.
- [ ] `CLAUDE.md`: la regla 1 y el «Estado del repositorio». `docs/01-arquitectura.md` y `docs/02-paginas.md` con `/temario`, incluido cómo se actualiza: Jorge cambia el doc maestro → exporta a Markdown → reemplaza `src/data/temario.md` → `npm run build` → PR.
- [ ] PR a `main`. En tu mensaje final: el enlace del preview de Vercel, la lista de correcciones que hiciste a `temario.md` y lo que no cuadró y dejaste para Jorge.
