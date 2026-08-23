# Iteración 2 — Activar el material y ajustar con el contenido real puesto

> **Cuándo usar este prompt:** cuando `npm run medios` reporte al menos toda la **prioridad 1** en verde. No hace falta tener el 100%.

---

## Contexto

Lee primero: `medios/LEEME.md`, `medios/CHECKLIST.md`, `PLAN-MEDIOS.md` (Partes 2 y 5) y `CLAUDE.md`.

La Iteración 1 dejó el sistema montado y las ranuras colocadas. Ahora hay material real adentro. **El trabajo de esta iteración no es agregar ranuras: es que el sitio se vea bien con el contenido real puesto.**

Un layout que se veía correcto con marcadores punteados casi nunca se ve igual con una captura de 16:10 y un video de 90 segundos adentro. Eso es lo que hay que arreglar aquí.

---

## Trabajo 1 · Encender lo que ya tiene material

Corre `npm run medios` y trabaja solo sobre lo que está en verde.

- Las secciones nuevas envueltas en `hayMedio()` ya se encienden solas. Verifica que **cada una tenga su encabezado escrito** — kicker, H2 y, donde aplique, un párrafo. Si el copy todavía no existe, déjalo con un TODO visible en el código, **nunca en el HTML generado**.
- Las secciones que sigan sin material se quedan apagadas. No las fuerces ni las llenes con otra cosa.

---

## Trabajo 2 · Ajustar el layout con el contenido real

Revisa a **1440, 768 y 390 px** y corrige:

1. **Alturas desiguales.** Las capturas de producto no van a tener todas el mismo alto real. Fija `aspect-ratio` en la tarjeta y `object-fit: cover` para que la rejilla no quede rasgada.
2. **El peso visual del loop del hero.** Si el ojo se va al video antes que al titular, el loop está mal puesto: bájale el tamaño, quítale contraste o muévelo abajo del pliegue. **Regla 6 de la Parte 5 de `PLAN-MEDIOS.md`.**
3. **La rejilla de `/metodo` §07.** Cuatro capturas de terminal juntas se convierten en ruido gris si se escalan mucho. Considera 2×2 con `figcaption` visible en vez de 4 en fila.
4. **Los pósters de video.** Verifica que ninguno cause salto de layout: todo `<video>` con `aspect-ratio` declarado.
5. **`bg-dark`.** Comprueba que las capturas con fondo blanco no exploten sobre las secciones oscuras. Si pasa, dales un borde sutil con `--ilhas-gray` a baja opacidad o un contenedor claro.
6. **Móvil.** Ningún loop debe autoplay a pantalla completa ni empujar el CTA fuera del primer scroll.

---

## Trabajo 3 · Contenido y accesibilidad

- **Revisa cada `alt` del manifiesto** con la imagen real delante. Un `alt` de borrador escrito sin ver la imagen casi siempre está mal. Los loops decorativos van con `alt=""` y `aria-hidden="true"`; las capturas que aportan información van con `alt` real.
- **Verifica que todo clip con voz tenga su `<track>` de subtítulos** y que el archivo `.es.vtt` cargue (revisa la pestaña Network, no solo que exista el archivo).
- **Los testimonios muestran atribución visible**: nombre y rol, o rol y sector. Si alguno no la trae, el build ya debería estar fallando — no lo desactives, consigue el permiso.
- **Contraste AA** en cualquier texto que quede encima de una imagen o de un video.

---

## Trabajo 4 · Peso y rendimiento

```bash
npm run medios          # ningún ⚠ de peso
npm run build
du -sh dist/            # ¿cuánto creció?
```

- Ninguna página debe pasar de **~2.5 MB** de transferencia inicial.
- Si un loop below-the-fold está pesando de más en la carga inicial, bájale el `preload` a `none` y déjalo arrancar con el póster.
- **Lighthouse en las cinco rutas:** 100 en accesibilidad y buenas prácticas, performance > 95. Es requisito de `docs/06-stack-y-seguridad.md`, no una meta.

---

## Trabajo 5 · La revisión que ninguna máquina hace

Antes de dar por terminado, revisa a ojo **cada captura publicada**:

- [ ] Ninguna trae nombres de clientes, RFC, correos, API keys, tokens ni rutas con el usuario de Jorge
- [ ] Ninguna trae cifras que identifiquen a un cliente concreto sin permiso
- [ ] Ningún video de la página pasa de 90 segundos
- [ ] Ningún `.gif` en el repo: `find . -name "*.gif" -not -path "./node_modules/*"`
- [ ] El VSL del webinar **no** está en ninguna página (regla 1 de `CLAUDE.md`)
- [ ] Ningún testimonio sin atribución
- [ ] Ninguna isla futura anunciada (regla 3)
- [ ] Los números siguen atribuidos, no sumados — el "40 + 12" solo en `/finanzas` (regla 4)

---

## Trabajo 6 · Cerrar

- Corre el checklist completo de publicación de `docs/06-stack-y-seguridad.md`.
- Actualiza `medios/CHECKLIST.md` marcando lo que ya está listo.
- Si quedó material en prioridad 2 o 3 sin producir, déjalo listado en el resumen final para la siguiente tanda.

---

## Al terminar, dime

1. Qué secciones se encendieron y cuáles siguen apagadas por falta de material.
2. Qué ajustes de layout hiciste que no estaban previstos, y por qué.
3. El resultado de Lighthouse por ruta y el peso de cada página.
4. Qué falta para cerrar el plan completo.
