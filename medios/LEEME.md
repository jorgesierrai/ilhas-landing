# Sistema de medios de ilhas.ai — cómo opera

Este archivo explica **cómo se implementa** el `PLAN-MEDIOS.md` sin romper el sitio y sin esperar a tener todo el material.

---

## La idea en una frase

> El sitio declara **ranuras** (espacios con nombre). Tú dejas caer archivos con el nombre exacto de la ranura. El sitio los detecta solo.

No hay que editar código cada vez que llega un asset. Editas código **una vez** (Iteración 1) y después solo copias archivos.

---

## Cómo funciona por dentro

Tres piezas:

| Pieza | Archivo | Qué hace |
|---|---|---|
| **El manifiesto** | `src/data/medios.ts` | La lista de todas las ranuras: id, tipo, página, alt, caption, prioridad, objeción que mata |
| **El detector** | `src/lib/medios.ts` | Revisa si el archivo de una ranura ya existe en el repo |
| **Los componentes** | `src/components/medios/` | Pintan el asset si existe; si no existe, un marcador **solo visible en `npm run dev`** |

**En producción, una ranura vacía no pinta nada.** Nunca sale un marcador al aire — regla 6 de `docs/01-arquitectura.md`: cero placeholders en producción. Las secciones nuevas (testimonios, autoridad, historia) simplemente no se renderizan hasta que su material exista.

Eso es lo que permite hacer esto en dos iteraciones sin que el sitio se vea a medias en ningún momento.

---

> **¿Retomando el trabajo?** `ESTADO.md` dice en qué quedó todo, qué decisiones
> se tomaron y qué trampas técnicas ya costaron tiempo. Empieza por ahí.

---

## Las dos iteraciones

### Iteración 1 · Los espacios *(código, sin un solo asset)*
Prompt: **`prompts/iteracion-1-espacios.md`** → pégalo en Claude Code.

Construye el manifiesto, el detector, los ocho componentes y coloca las ranuras en las cinco páginas. Al terminar:
- `npm run build` pasa limpio.
- El sitio en producción se ve **exactamente igual que hoy** (ninguna ranura tiene archivo todavía).
- `npm run dev` muestra los marcadores punteados con el nombre y las specs de cada ranura.
- `npm run medios` te imprime la lista de lo que falta.

### Entre las dos · Tú produces el material
Sigue **`medios/CHECKLIST.md`**: te dice archivo por archivo el **nombre exacto**, la **carpeta exacta** y el **peso máximo**. Cada carpeta destino tiene su propio `LEEME.md` con las reglas de ese tipo de archivo.

No hace falta terminar todo. Cada archivo que dejes caer aparece solo la próxima vez que compiles.

### Iteración 2 · Activar *(con el material adentro)*
Prompt: **`prompts/iteracion-2-activar.md`** → pégalo en Claude Code cuando tengas al menos la prioridad 1.

Enciende las secciones nuevas, ajusta el layout con el contenido real puesto, verifica pesos y accesibilidad, y corre el checklist de `docs/06-stack-y-seguridad.md`.

---

## Las carpetas

```
src/assets/media/capturas/   ← capturas de pantalla   (pasan por astro:assets)
src/assets/media/fotos/      ← fotos de conferencias  (pasan por astro:assets)
src/assets/iconos/           ← SVG                    (se inlinean, heredan color)
public/assets/video/         ← loops, clips, pósters y subtítulos
```

**Por qué unas van en `src/` y otras en `public/`:** todo lo que va en `src/assets/` lo optimiza `astro:assets` en el build (genera AVIF/WebP, calcula `width`/`height`, evita el salto de layout). El video no pasa por ahí — se sirve tal cual, por eso vive en `public/` y por eso **tú** lo exportas ya optimizado con las recetas de `medios/recetas.md`.

---

## La regla del nombre

> **El nombre del archivo, sin extensión, es el id de la ranura.**

La ranura `nosotros-radio-2018` busca:

```
public/assets/video/nosotros-radio-2018.webm   (o .mp4)
public/assets/video/nosotros-radio-2018.mp4
public/assets/video/nosotros-radio-2018.jpg    ← póster, obligatorio
public/assets/video/nosotros-radio-2018.es.vtt ← subtítulos, obligatorio si hay voz
```

Sin guiones bajos, sin mayúsculas, sin acentos, sin espacios. Si el nombre no coincide exacto, la ranura sigue vacía y `npm run medios` te lo dice.

---

## El comando que te va a decir qué falta

```bash
npm run medios
```

Imprime algo así:

```
PRIORIDAD 1
  ✓  producto-stampay              capturas/producto-stampay.png          148 KB
  ✗  nosotros-radio-2018           video/nosotros-radio-2018.mp4          FALTA
  ⚠  metodo-prompts-01             capturas/metodo-prompts-01.png         2.4 MB  (máx 400 KB)
  ✗  soluciones-testimonio-oncologia                                      FALTA atribución en el manifiesto

18 de 41 listas · 3 con problema
```

Córrelo antes de cada commit. Es el que evita que se publique un video de 40 MB o un testimonio sin atribuir.

---

## Lo que este sistema NO hace

- **No escribe copy.** Los `alt` y `caption` del manifiesto son un punto de partida; tú los ajustas.
- **No corta video.** Las recetas de `medios/recetas.md` son comandos que corres tú.
- **No decide qué activo va dónde.** Eso ya está decidido en `PLAN-MEDIOS.md` y transcrito al manifiesto.
- **No sube nada a ningún lado.** Todo vive en este repo, en tu dominio. Ver Parte 3 de `PLAN-MEDIOS.md`.
