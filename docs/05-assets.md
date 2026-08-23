# 05 · Assets

## Regla general

Las imágenes viven **en este repositorio**. Son pocas y así se controlan: sin CDN externo, sin dependencias de terceros, sin peticiones fuera del dominio. Eso también es parte de la política de seguridad — ver `06-stack-y-seguridad.md`.

Se sirven optimizadas con `astro:assets` (AVIF/WebP con fallback), con `width`/`height` explícitos para no provocar layout shift, y con `alt` real cuando la imagen aporta contenido.

**Dónde va cada cosa:**

| Carpeta | Qué | Por qué ahí |
|---|---|---|
| `src/assets/media/capturas/` | Capturas de pantalla | Pasa por `astro:assets`: genera AVIF/WebP y calcula dimensiones |
| `src/assets/media/fotos/` | Fotos de conferencias | Igual |
| `src/assets/equipo/` | Recortes del equipo | Igual |
| `src/assets/iconos/` | SVG monocromos | Se inlinean para heredar `currentColor` |
| `public/assets/video/` | Loops, clips, pósters y `.vtt` | El video **no** pasa por Vite: se sirve tal cual, ya exportado |
| `public/assets/logo/` | Logo y favicon | Se referencian por ruta fija |

### La misma regla, extendida al video

Mismos criterios que las imágenes —en el repo, en tu dominio, sin terceros—, con estos topes (`PLAN-MEDIOS.md` Parte 3):

| Tipo | Duración | Peso | Formato |
|---|---|---|---|
| **Loop mudo** (los "GIFs") | 8-15 s | `.webm` ≤ 800 KB · `.mp4` ≤ 1.5 MB | `<video autoplay muted loop playsinline>` |
| **Clip con voz** | 60-90 s | ≤ 12 MB | `<video controls preload="none">` + `.es.vtt` |
| **Video completo** | 5-40 min | — | YouTube, **enlazado**, nunca incrustado |

Reglas que no se rompen:

- **Ningún video de la página pasa de 90 segundos.** Los completos viven en YouTube y desde el sitio se enlazan. Eso es lo que hace que hospedar el video propio sea gratis y no un problema.
- **Nada de `.gif`.** Un GIF de 10 s pesa 8-15 MB; el mismo clip en WebM pesa 300-800 KB. Cuando alguien diga "GIF", produce un `<video>`.
- **Todo clip con voz lleva su `.es.vtt`.** Sin subtítulos no se publica.
- **Todo video lleva póster** (`.jpg`, ≤ 200 KB) y dimensiones o `aspect-ratio`, para no provocar salto de layout.
- Exporta con `-movflags +faststart` y `-pix_fmt yuv420p`, o no reproduce bien. Las recetas están en `medios/recetas.md`.

**Antes de publicar cualquier captura**, revisa que no traiga rutas con tu usuario, nombres de clientes, RFC, API keys, correos ni cifras de un cliente identificable. Es la misma disciplina de `06-stack-y-seguridad.md` aplicada a los píxeles.

### El sistema de ranuras

El sitio declara **ranuras** con nombre en `src/data/medios.ts`; tú dejas caer el archivo con ese nombre exacto en la carpeta que le toca y aparece solo, sin tocar código. Una ranura vacía **no pinta nada en producción**.

```bash
npm run medios     # qué falta, qué pesa de más, qué no tiene atribución
```

Ver `medios/LEEME.md` para cómo opera y `medios/CHECKLIST.md` para el archivo, la carpeta y el peso de cada uno.

---

## Logo — lo que sí se usa en el sitio

Los archivos autoritativos están en `public/assets/logo/`, copiados de la guía de marca:

| Archivo | Uso |
|---|---|
| `logo.svg` | Logo completo (isotipo + wordmark oscuro). **Uso por defecto**: header sobre fondo claro |
| `logo-mark.svg` | Solo el isotipo. Favicon, espacios cuadrados, footer compacto |
| `logo-blanco.svg` | Wordmark en blanco. Header sobre fondo oscuro o sobre el gradiente |

**Reconstrucción del isotipo** (por si hay que generarlo en otro tamaño): lienzo 72×72, círculo exterior centrado radio 33 con el gradiente de marca (`linear-gradient(to top right, #55E8FF 0%, #8E5BFF 50%, #A14BFF 100%)`), círculo interior centrado radio 14.5 en `#FFFFFF` al 92%.

**El wordmark del logo va en minúsculas** ("ilhas") — es decisión de diseño del logo. En texto corrido la marca se escribe **"Ilhas"**, con mayúscula inicial.

### Favicon
Del isotipo. Genera el set completo: `favicon.svg`, `favicon.ico` (32×32), `apple-touch-icon.png` (180×180), y un `site.webmanifest` con los tamaños 192 y 512. El isotipo no baja de 24px o se pierde el punto interior.

---

## `ilhas-iconografia/` — ojo con esta carpeta

La carpeta `~/Documents/Ilhas/ilhas-iconografia/` tiene ~170 archivos. **La gran mayoría no es material de web.**

**Qué es realmente:** furniture de producción de video para el webinar — lower thirds con nombres de invitados, badges de "EN VIVO", chips de rol, title cards, end cards, sellos de ciudades, barras de progreso, botones rasterizados ("Reservar mi lugar", "Unirme al WhatsApp", "Agendar en mi calendario").

**No se copian al repositorio.** Razones:
- Son pesados (varios PNG de 0.7–1.8 MB) y bloatearían el repo y el build.
- Los botones son **imágenes de botones**. En web, un botón es HTML y CSS: accesible, seleccionable, escalable, traducible. Un PNG de un botón no es ninguna de esas cosas.
- Los lower thirds y badges de "en vivo" pertenecen al video, no a la página.

**Lo único de esa carpeta que sí sirve para el sitio** (y ya está copiado o hay que copiarlo cuando se necesite):

| Archivo | Para qué |
|---|---|
| `logo-ilhas-blanco.svg` | Header sobre fondo oscuro |
| `logo-ilhas-isotipo.svg` | Favicon y usos cuadrados |
| `logo-ilhas-oscuro.svg` | Alternativa al `logo.svg` |
| `ilhas-simbolo-transparente.png` | Solo si se necesita el isotipo rasterizado a gran escala; primero intenta con el SVG |

Si más adelante hace falta una imagen de esa carpeta, se copia **ese archivo**, optimizado, no la carpeta.

---

## Fotos del equipo — ya existen

Recortes con fondo transparente, en `src/assets/equipo/`:

| Archivo | Quién | Tamaño |
|---|---|---|
| `jorge-hijo.png` | Jorge (hijo) — camisa azul claro | 1291 × 2600, PNG con alfa |
| `jorge-papa.png` | Jorge (papá) — camisa azul | 1576 × 2600, PNG con alfa |

Van en **`src/assets/`**, no en `public/`: así `astro:assets` genera las variantes AVIF/WebP en el build. Nunca las referencies desde `public/`.

Notas de uso:

- Son **recortes de cuerpo completo, sangrados por abajo**. El sujeto llega al borde inferior de la imagen. Diseña las tarjetas para que se apoyen en el borde de abajo, como las tarjetas de equipo de mispropiasfinanzas.com — no las centres con aire abajo, se ven flotando.
- Sobre el fondo `--ilhas-light` funcionan tal cual. Si van sobre el gradiente de marca, verifica que la camisa azul claro de Jorge no se pierda contra la parada cian.
- No les pongas sombra dura ni contorno. Si necesitas separarlos del fondo, usa una superficie detrás (tarjeta blanca con `--ilhas-shadow-soft`), no un efecto sobre la persona.
- El `alt` describe a la persona, no la foto: `alt="Jorge Sierra"`.

## Testimoniales — desbloqueados, con condición

**Ya existen dos casos reales** (`PLAN-MEDIOS.md` Parte 1, bloque I): el cotizador de una empresa de oncología y los agentes de despiece, optimización y cotización. El bloque de testimoniales de `/soluciones` **ya no está bloqueado por falta de material** — está condicionado a la atribución.

**La regla:** un testimonio va con **nombre y rol**, o con **rol y sector** si el permiso es parcial (*"Director de operaciones, empresa de manufactura"*). Lo que nunca va es un testimonio sin nadie detrás. Regla 5 de `CLAUDE.md`, y este público lo huele.

Está forzado en código, no solo escrito aquí: los datos se llenan en el campo `atribucion` de `src/data/medios.ts`, y **`Testimonio.astro` lanza un error de build si hay material sin atribución**. Es a propósito — hace estructuralmente imposible repetir el error del `index.html` viejo.

Si por ahora solo hay testimonio en texto, también sirve: se llenan `atribucion` + `texto` y no hace falta video.

## Lo que hace falta y todavía no existe

| Asset | Bloquea | Nota |
|---|---|---|
| **Logos de clientes reales** | `/soluciones` | Solo si hay permiso de usarlos. **Si no hay, el bloque no se publica** — nada de "Empresa 1…8". La captura del producto es tuya; el logo del cliente no |
| **Permiso escrito de los dos testimonios** | `/soluciones` §Testimonios | El material existe; falta el permiso de usar nombre, rol y empresa |

---

## Placeholders que hay que erradicar

Estos están **publicados hoy** en `index.html` y son lo primero que se borra:

- Testimoniales inventados: "María González, Fundadora, Estudio Creativo" y "Carlos Ramírez, Desarrollador Inmobiliario".
- `[Nombre de tu papá]` y `[Tu papá]` en la sección de fundadores.
- Ocho logos de clientes llamados "Empresa 1" a "Empresa 8".
- Dos videos marcados "Próximamente" y "En producción" con el play falso.
- El contador de "Quedan 7 cupos".

**Regla permanente: si un dato no existe, el bloque no se publica.** Un sitio que vende criterio con testimoniales inventados hace exactamente el daño contrario, y este público —ver `04-voz-del-cliente.md`— ya llega buscando humo.
