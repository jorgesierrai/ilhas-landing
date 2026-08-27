# 00 · Índice y orden de precedencia

**Léeme primero. Siempre.**

Este repositorio tiene tres cuerpos de documentación escritos en momentos distintos del negocio, y **se contradicen a propósito**. La guía de marca es de cuando Ilhas era un bootcamp de finanzas. El NTPVS es la definición comercial vigente. La arquitectura es la decisión de convertir ilhas.ai en el sitio de la marca completa.

Si tratas los tres como si fueran igual de vigentes, vas a producir una mezcla incoherente. Este archivo declara quién gana.

---

## Los documentos

| Archivo | Qué manda | Vigencia |
|---|---|---|
| `01-arquitectura.md` | La **estructura** del sitio: qué páginas existen, cómo se navegan, dónde está la costura con GHL | Vigente · agosto 2026 |
| `02-paginas.md` | El **contenido** de cada página: bloques, orden, CTA, fuente del copy | Vigente · agosto 2026 |
| `03-ntpvs.md` | El **negocio**: a quién le vendemos, qué, a qué precio, con qué escalera de valor | Vigente · junio 2026 |
| `04-voz-del-cliente.md` | Las **palabras reales** del cliente y sus objeciones de compra | Vigente · evidencia de campo |
| `05-assets.md` | Qué imágenes existen, cuáles son de web y cuáles no | Vigente |
| `06-stack-y-seguridad.md` | Cómo se construye y cómo se protege | Vigente |
| `marca/` | Cómo se **ve** Ilhas: color, tipografía, logo, layout | Sistema visual vigente · mensajería parcialmente superada |

## Medios (video, capturas, íconos) — fuera de `docs/`

El material visual tiene su propio cuerpo de documentación, en la raíz:

| Archivo | Qué |
|---|---|
| `PLAN-MEDIOS.md` | Qué activo va en qué bloque y **qué objeción mata**. La decisión de fondo |
| `medios/ESTADO.md` | **En qué quedó el trabajo**, qué decisiones se tomaron, qué falta. **Léelo si retomas el tema** |
| `medios/LEEME.md` | Cómo opera el sistema de ranuras |
| `medios/CHECKLIST.md` | Archivo por archivo: nombre exacto, carpeta, peso máximo |
| `medios/recetas.md` | Los comandos de `ffmpeg` para exportar |
| `prompts/iteracion-*.md` | Los briefs de cada iteración |

## Orden de precedencia

Cuando dos documentos se contradigan, gana el de arriba:

1. **`03-ntpvs.md`** — en todo lo que sea *a quién le vendemos, qué y a cuánto*.
2. **`01-arquitectura.md`** y **`02-paginas.md`** — en todo lo que sea *estructura del sitio y trabajo de cada página*.
3. **`04-voz-del-cliente.md`** — en todo lo que sea *vocabulario y qué objeciones responder*.
4. **`marca/`** — en todo lo que sea *color, tipografía, logo, layout, tono*.

La regla corta: **la marca manda en cómo se ve. El NTPVS manda en qué se dice. La arquitectura manda en dónde se dice.**

---

## Conflictos declarados (resueltos)

Estos son los choques concretos. No hay que deliberarlos: ya están resueltos.

| Tema | La guía de marca dice | Lo vigente es | Gana |
|---|---|---|---|
| **Audiencia** | Mezcla "dueños de negocio y emprendedores" con profesionales de finanzas | Profesionales de finanzas, contabilidad y análisis: analista, contador, controller, consultor, auditor, tesorero, FP&A. Los dueños de negocio son audiencia de **expansión**, no el núcleo | NTPVS |
| **Precio del programa** | $497 USD (en el `index.html` viejo) | **$697 USD** | NTPVS |
| **CTA principal** | "Aplicar a la primera cohorte" | **"Reservar mi lugar en el webinar"** → `eventos.ilhas.ai`. El embudo entra por el webinar, no por una aplicación directa | Arquitectura |
| **Qué es Ilhas** | "Un bootcamp premium de finanzas con IA" | Ilhas es el **método**; el programa de finanzas es la primera isla | Arquitectura |
| **Tagline del home** | "Domina las finanzas de tu negocio con tecnología y AI" | Eso es el tagline de **`/finanzas`**, no del home. El home habla del método, no de finanzas | Arquitectura |
| **Programa vs webinar** | Aparecen como cosas separadas | Son **un solo embudo**: el webinar es donde se comparte la entrada al programa | NTPVS |
| **La palabra "bootcamp"** | Toda la guía de marca y el NTPVS lo llaman bootcamp | **No es un bootcamp.** Es acceso a una comunidad — Skool u Hotmart, sin decidir. La palabra "bootcamp" no se escribe en el sitio ni en copy nuevo | Jorge, 25 ago 2026 |
| **"AI" vs "IA"** | Ambas formas conviven | **"IA"** en todo el sitio. Sin excepciones | Este documento |
| **Color, tipografía, logo, layout** | — | — | **Marca** (sin discusión) |

## Lo que NO está resuelto todavía

No inventes estos. Si el trabajo los necesita, para y pregunta:

- **Casos y logos de clientes reales** para `/soluciones`. La tabla de linaje de productos sí está y sí se usa.
- **Dónde vive el hosting hoy y quién controla el DNS de ilhas.ai.**
- **La plataforma de entrega del programa** — Skool u Hotmart. Jorge no ha decidido (25 ago 2026). Hasta entonces, el sitio no nombra ninguna.
- ~~**Si "6 semanas" sigue siendo cierto.**~~ **Resuelto el 27 ago 2026: fuera.** Era herencia del formato bootcamp, que este mismo documento ya declaró muerto, y además dependía de una plataforma sin decidir. **El sitio no publica duración.** El formato lo explica el webinar, no este repositorio (regla 1 de `CLAUDE.md`).

## Fuentes upstream (fuera de este repo)

- Guía de marca original: `~/Documents/Ilhas/marcailhas/`. `docs/marca/` es una copia. Si cambias la marca, cámbiala allá también.
- Assets de producción: `~/Documents/Ilhas/ilhas-iconografia/`. Casi todo es material de video, no de web. Ver `05-assets.md`.
- Documentos de estrategia: la Biblia de Producto y el Deck del Método (fuente del contenido de `/metodo`).
- El webinar y el programa: Go High Level, en `eventos.ilhas.ai`. **Fuera de este repositorio, siempre.**
