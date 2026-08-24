# Checklist de material — archivo por archivo

**41 archivos en total.** Ordenados por prioridad, no por página: la prioridad 1 es lo que ya tienes grabado y solo hay que cortar o exportar.

Marca la casilla cuando el archivo esté en su carpeta con el nombre exacto. Verifica con `npm run medios`.

> **Regla del nombre:** el nombre del archivo sin extensión **es** el id de la ranura. Minúsculas, guiones medios, sin acentos, sin espacios, sin guiones bajos.
> **Regla del peso:** si un archivo pasa el máximo, `npm run medios` lo marca y no se commitea. Las recetas de exportación están en `medios/recetas.md`.

---

# PRIORIDAD 1 — Ya lo tienes, solo hay que exportarlo
*Con esto solo, el sitio gana el 70% de la prueba. 13 archivos.*

## Capturas de producto — 6 archivos
📁 `src/assets/media/capturas/` · PNG o JPG · **máx 400 KB c/u** · ancho 1600 px · ratio 16:10

Se usan **dos veces cada una**: en el linaje del home (§05) y en los casos de `/soluciones` (§03). Un archivo, dos lugares.

- [x] `producto-stampay.png` — la pantalla de conciliación bancaria
- [x] `producto-cobranza.png` — el tablero de reintentos de cobro *(antes `producto-nomcont`)*
- [x] `producto-cometa.png` — la interfaz de lenguaje natural, con una pregunta real escrita
- [x] `producto-nomada.png` — el HRIS / nómina
- [x] `producto-paystand.png` — Smart Lockbox o Spend Card
- [x] `producto-pagos-intl.png` — estados de pago internacionales *(antes `producto-factumizer`)*

> **Antes de exportar:** tapa nombres de clientes, RFC, montos reales y correos. Si una pantalla no se puede despersonalizar, no va — mejor cinco capturas limpias que seis con un dato que no debía salir.

## El sistema de agentes — 4 archivos
📁 `src/assets/media/capturas/` · PNG · **máx 400 KB c/u** · ancho 1600 px

Van juntas en `/metodo` §07 *"No son prompts. Es reingeniería del trabajo."* — **es el bloque más importante de toda esta lista.** Es la única prueba de la afirmación que da título a la sección.

- [x] `metodo-prompts-01.png` — la estructura de carpetas de Claude (agentes, skills, comandos)
- [x] `metodo-prompts-02.png` — un flujo de trabajo completo, de entrada a salida
- [x] `metodo-prompts-03.png` — una herramienta corriendo (terminal o log del agente ejecutando)
- [x] `metodo-prompts-04.png` — el resultado: el archivo, el reporte o el dashboard que salió solo

> **Súbele el tamaño de fuente antes de capturar.** Una ventana completa de VS Code escalada a 600 px es ilegible. Recorta al bloque que importa, no a la ventana entera.

## La entrevista de radio, 2018 — 3 archivos
📁 `public/assets/video/` · **el activo más fuerte que tienes**

- [x] `nosotros-radio-2018.mp4` — corte de **45-60 s**, máx **8 MB**, 1280 px de ancho
- [x] `nosotros-radio-2018.jpg` — póster, máx 200 KB
- [x] `nosotros-radio-2018.es.vtt` — subtítulos (obligatorio: hay voz)

> Elige el tramo donde hablas de **hacia dónde va la IA**, no donde te presentan. El año va en el diseño, no en el video.

---

# PRIORIDAD 2 — Hay que grabar, cortar o pedir permiso
*17 archivos.*

## Los dos testimonios — 6 archivos
📁 `public/assets/video/` · sección **nueva** en `/soluciones`

- [x] `soluciones-testimonio-oncologia.mp4` — 60-90 s, máx 12 MB
- [x] `soluciones-testimonio-oncologia.jpg` — póster
- [x] `soluciones-testimonio-oncologia.es.vtt` — subtítulos
- [x] `soluciones-testimonio-despiece.mp4` — 60-90 s, máx 12 MB
- [x] `soluciones-testimonio-despiece.jpg` — póster
- [x] `soluciones-testimonio-despiece.es.vtt` — subtítulos

> ⚠️ **Sin atribución no se publican.** Antes de exportar, consigue por escrito el permiso de usar nombre, rol y empresa. Si el permiso es parcial, va rol y sector (*"Director de operaciones, empresa de manufactura"*). Los datos se escriben en `src/data/medios.ts`, campo `atribucion` — **el build falla si un testimonio no lo trae**, a propósito.
>
> Si por ahora solo hay testimonio en texto, también sirve: se llena `atribucion` + `texto` en el manifiesto y no hace falta video.

## Tu historia — 9 archivos
📁 `public/assets/video/` · sección **nueva** en `/nosotros`

Del podcast que ya grabaste. **Tres cortes de 60-90 s, no el episodio.** Sugerencia según tu guión (BEAT 3), ajústala:

- [ ] `nosotros-historia-01.mp4` + `.jpg` + `.es.vtt` — *"Yo tomé otro camino: 12 años construyendo tecnología y productos"* → quién eres
- [ ] `nosotros-historia-02.mp4` + `.jpg` + `.es.vtt` — *"En 2016 arranqué una empresa de inteligencia artificial"* → el ancla de años
- [ ] `nosotros-historia-03.mp4` + `.jpg` + `.es.vtt` — *"Los cursos de mi papá siempre estaban a reventar. Le propuse automatizar su conocimiento con IA"* → **el origen de Ilhas**

> El tercero es la razón de existir del negocio y hoy no está escrita en ninguna página del sitio.

## Conferencia — 2 archivos
📁 `src/assets/media/fotos/` y `public/assets/video/`

- [x] `nosotros-conferencia.jpg` — foto a ancho completo, 2400 px, máx 500 KB. Que se vea el público, no solo tú
- [x] `nosotros-conferencia-clip.mp4` + `.jpg` + `.es.vtt` — 45 s (opcional si la foto es buena)

---

# PRIORIDAD 3 — Cuando el resto esté arriba
*11 archivos + los íconos.*

## Loops mudos — 4 × 3 archivos
📁 `public/assets/video/` · **8-15 s** · `.webm` **máx 800 KB** + `.mp4` **máx 1.5 MB** + `.jpg` póster
Sin audio, sin subtítulos. Son los "GIFs".

- [ ] `home-hero-loop` — un agente corriendo: terminal + dashboard actualizándose
- [ ] `soluciones-hero-loop` — el producto en movimiento
- [ ] `finanzas-hero-loop` — un análisis financiero ejecutándose
- [ ] `metodo-agentes-loop` — varios agentes trabajando en paralelo → `/metodo` §08

> El loop **nunca** le gana al titular. Si tu ojo se va al video antes que al texto, está mal puesto.

## El paso joya en video — 3 archivos
📁 `public/assets/video/`

- [ ] `metodo-hilar-clip.mp4` + `.jpg` + `.es.vtt` — 60-90 s tú explicando *Hilar / Opportunity Solution Tree*. Sale del podcast o lo grabas a propósito

## El mercado laboral — 3 archivos
📁 `src/assets/media/capturas/` · máx 400 KB c/u · **arregla el bloque más débil del home** (§02, que hoy es un H2 solo)

- [ ] `home-mercado-01.png` — lo que se le pide hoy a un Data Scientist
- [ ] `home-mercado-02.png` — lo que se le pide a un Product Manager
- [ ] `home-mercado-03.png` — lo que se le pide a un Diseñador

> Recorta a la lista de skills, no a la vacante completa. Tapa el nombre de la empresa salvo que sea pública y relevante.

## Edificación papá-hijo — 3 archivos
📁 `public/assets/video/` · `/finanzas` §04

- [ ] `finanzas-edificacion.mp4` + `.jpg` + `.es.vtt` — 60-90 s

> ⚠️ **El VSL no va aquí ni en ninguna parte del sitio.** Regla 1 de `CLAUDE.md`. Este clip es identidad, no oferta: que no mencione temario, precio ni bonos.

## Íconos — 13 archivos
📁 `src/assets/iconos/` · **SVG, monocromo, `stroke="currentColor"`, 24×24 de lienzo, sin `fill` fijo**

Los cinco pasos → `/` §03:
- [ ] `icono-paso-i.svg` · [ ] `icono-paso-l.svg` · [ ] `icono-paso-h.svg` · [ ] `icono-paso-a.svg` · [ ] `icono-paso-s.svg`

Las ocho capacidades → `/finanzas` §02:
- [ ] `icono-cap-estados.svg` · [ ] `icono-cap-flujo.svg` · [ ] `icono-cap-modelos.svg` · [ ] `icono-cap-presupuesto.svg`
- [ ] `icono-cap-conciliaciones.svg` · [ ] `icono-cap-dashboard.svg` · [ ] `icono-cap-valuacion.svg` · [ ] `icono-cap-reportes.svg`

> **No uses los PNG 3D de `public/assets/ilhas-iconografia/`.** Pesan 0.5-1.8 MB cada uno, no heredan color y `docs/05-assets.md` explícitamente dice que esa carpeta es furniture de video, no material de web. SVG monocromo que herede `currentColor`: pesa 1 KB y se ve bien sobre claro y sobre oscuro.

---

# Ya existen en el repo, no hay que hacer nada

- `src/assets/equipo/jorge-papa.png` y `jorge-hijo.png` — se van a reusar en `/finanzas` §04, que hoy no tiene ninguna cara
- `public/assets/ilhas-iconografia/full-timeline.png` — el diagrama de proceso. Se va a copiar a `src/assets/media/capturas/metodo-timeline.png` para que pase por `astro:assets`

---

# Antes de cada commit

```bash
npm run medios     # ¿qué falta, qué pesa de más, qué no tiene atribución?
npm run build      # ¿compila limpio?
```

Y la revisión de contenido, que ninguna máquina puede hacer por ti:

- [ ] Ninguna captura tiene nombres de clientes, RFC, correos, API keys ni rutas con tu usuario
- [ ] Ningún testimonio va sin nombre y rol (o rol y sector con permiso parcial)
- [ ] Ningún video de la página pasa de 90 segundos
- [ ] Todo clip con voz tiene su `.es.vtt`
- [ ] Ningún `.gif` en todo el repo
