# 05 · Assets

## Regla general

Las imágenes viven **en este repositorio**, en `public/assets/`. Son pocas y así se controlan: sin CDN externo, sin dependencias de terceros, sin peticiones fuera del dominio. Eso también es parte de la política de seguridad — ver `06-stack-y-seguridad.md`.

Se sirven optimizadas con `astro:assets` (AVIF/WebP con fallback), con `width`/`height` explícitos para no provocar layout shift, y con `alt` real cuando la imagen aporta contenido.

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

## Lo que hace falta y todavía no existe

| Asset | Bloquea | Nota |
|---|---|---|
| **Logos de clientes reales** | `/soluciones` | Solo si hay permiso de usarlos. **Si no hay, el bloque no se publica** — nada de "Empresa 1…8" |
| **Testimoniales en video** | Prueba social, cualquier página | Jorge planeaba grabar entrevistas de 15 min a clientes de Ilhas y a asesorados de su papá. Hasta que existan, no hay bloque de testimoniales |

---

## Placeholders que hay que erradicar

Estos están **publicados hoy** en `index.html` y son lo primero que se borra:

- Testimoniales inventados: "María González, Fundadora, Estudio Creativo" y "Carlos Ramírez, Desarrollador Inmobiliario".
- `[Nombre de tu papá]` y `[Tu papá]` en la sección de fundadores.
- Ocho logos de clientes llamados "Empresa 1" a "Empresa 8".
- Dos videos marcados "Próximamente" y "En producción" con el play falso.
- El contador de "Quedan 7 cupos".

**Regla permanente: si un dato no existe, el bloque no se publica.** Un sitio que vende criterio con testimoniales inventados hace exactamente el daño contrario, y este público —ver `04-voz-del-cliente.md`— ya llega buscando humo.
