# Estado del sistema de medios

**Última actualización:** 22 ago 2026, al terminar la Iteración 1.

> Este archivo es el **traspaso**. Si retomas el trabajo en otra sesión o en otra
> máquina, léelo antes que nada: dice qué quedó hecho, qué decisiones se tomaron
> y por qué, qué falta, y qué trampas técnicas ya costaron tiempo una vez.
>
> Para *cómo opera* el sistema → `LEEME.md`.
> Para *qué archivo producir* → `CHECKLIST.md`.
> Para *qué activo va dónde y por qué* → `../PLAN-MEDIOS.md`.

---

## Dónde estamos

| | |
|---|---|
| **Iteración 1 — los espacios** | ✅ Hecha (`../prompts/iteracion-1-espacios.md`) |
| **Producir el material** | ⬜ Pendiente — es tu turno, sigue `CHECKLIST.md` |
| **Iteración 2 — activar** | ⬜ Pendiente (`../prompts/iteracion-2-activar.md`), cuando prioridad 1 esté en verde |

`npm run medios` → **1 de 41 listas · 0 con problema**

La única llena es `metodo-timeline`, porque su archivo fuente ya estaba en el repo.

---

## Cómo se llega a 41 ranuras

`CHECKLIST.md` tiene 36 casillas de material (más 5 de revisión de contenido, que no son ranuras). De esas 36:

- un clip es **una** ranura aunque sean tres archivos (`.mp4` + `.jpg` + `.es.vtt`),
- las 3 líneas de íconos traen **13** casillas en línea.

36 − (líneas que agrupan archivos) + (íconos expandidos) = **40**, más `metodo-timeline` = **41**.

---

## Qué se construyó

| Pieza | Archivo |
|---|---|
| Manifiesto de las 41 ranuras | `src/data/medios.ts` |
| Detector (¿existe el archivo?) | `src/lib/medios.ts` |
| Componentes | `src/components/medios/` — `Ranura`, `Loop`, `VideoClip`, `Captura`, `TarjetaCaso`, `Testimonio`, `BandaAutoridad`, `Stat`, `Icono` |
| Verificador | `scripts/medios-check.mjs` → `npm run medios` |

**Dos servidores, dos cosas distintas:**

```bash
npm run dev       # los marcadores punteados de las 41 ranuras. Tiene "brinco"
                  # de estilos: es Vite inyectando el CSS por JS, no existe en producción
npm run build && npm run preview    # el sitio real, sin marcadores y sin brinco
```

---

## Decisiones que se tomaron y no estaban en el brief

Las tres primeras cambian lo que se ve en producción. Revísalas.

1. **`/metodo` §04 ahora muestra el timeline.** El brief pedía copiar `full-timeline.png` a `src/assets/media/capturas/metodo-timeline.png`, pero eso choca con sus propios criterios de aceptación ("0 listas", "dist se ve igual"). Se eligió la instrucción explícita. Revertir: `rm src/assets/media/capturas/metodo-timeline.png`.

2. **Las tarjetas de `/soluciones` §03 pasaron de blanco opaco a la tarjeta oscura de `.card`.** Sale de la instrucción "usa `.card` de `base.css`". Efecto lateral bueno: las **mismas seis tarjetas** ahora se ven igual en el home y en `/soluciones`; antes eran blancas en una página y oscuras en la otra.

3. **La banda de autoridad del home está condicionada al clip de radio.** Se enciende sola cuando exista `nosotros-radio-2018`. Se hizo así porque su tercer ítem ("6 productos financieros construidos de cero a uno") **duplica el stat rail del hero** — hay que decidir si conviven o si uno reemplaza al otro. Para encenderla ya: quita `hayMedio("nosotros-radio-2018") ||` en `src/pages/index.astro`.

4. **Un noveno componente, `Icono.astro`.** El brief lista ocho; las 13 ranuras de íconos necesitaban dónde vivir.

5. **`Ranura` tiene modo compacto.** 13 cajas completas dentro de la tira de cinco pasos hacían ilegible el dev. Los íconos usan un chip con las specs en el `title`.

6. **Los loops de hero llevan respaldo vía `<slot>`.** Si el loop sustituía al ícono 3D directamente, producción se quedaba con una columna hueca. Ahora se queda el ícono y el loop lo sustituye solo cuando exista.

7. **Las secciones nuevas sí se renderizan en dev** (`mostrar()` = `hay material || DEV`), o sus ranuras no tendrían marcador en ninguna parte. En producción siguen sin existir.

8. **`npm run medios` usa el type-stripping nativo de Node 22** (`--experimental-strip-types`) para leer el manifiesto en TypeScript sin agregar dependencias. Requiere Node ≥ 22.12, que ya es lo que pide `package.json`.

---

## Lo que necesita tu ojo

### 1. Los títulos de las secciones nuevas son provisionales

No se escribió copy de marketing nuevo (restricción del brief), pero algo tenía que ir. Ajústalos:

| Dónde | Kicker · H2 provisional |
|---|---|
| `src/pages/soluciones.astro` | `Testimonios` · «Lo que dicen los que ya lo hicieron.» |
| `src/pages/nosotros.astro` | `La historia` · «De dónde sale Ilhas.» |
| `src/pages/nosotros.astro` | `Autoridad` · «Hablando de IA en radio nacional desde 2018.» |

Ninguno se publica todavía: las tres secciones están apagadas hasta que llegue su material. Pero cuando llegue, se publican con estas palabras.

### 2. Los `alt` y `caption` del manifiesto son borrador

Están escritos **sin haber visto las imágenes**, que es la peor manera de escribir un `alt`. La Iteración 2 los revisa con el material delante (Trabajo 3 de `../prompts/iteracion-2-activar.md`).

---

## Trampas que ya costaron tiempo

Si algo se rompe de forma rara, revisa esto antes de investigar de cero:

- **Un contenedor de medios vacío no mide alto, pero su `margin-top` sí se aplica.** Cada ranura vacía empujaba la página ~32 px. Por eso **todo contenedor de medios va envuelto en `mostrar(...ids)`** de `src/lib/medios.ts`. Si agregas uno nuevo, envuélvelo igual.

- **Astro publica los comentarios `<!-- -->` en el HTML final.** Las notas internas van en `{/* … */}`, que no se emiten. Ya se coló una vez ("los activos más caros de este carril" salió al HTML público).

- **Astro deduplica imágenes por hash de contenido.** Si copias un archivo idéntico a otro con distinto nombre, el `<img>` sale con el nombre del original. Puede parecer que la ranura no se encendió cuando sí lo hizo — usa un archivo genuinamente distinto para probar.

- **El atributo `height` que genera `<Image>` le gana al `aspect-ratio` del CSS.** Si una foto sale altísima, es esto: hay que declarar `height: auto` explícito en el CSS (ver `TarjetaPersona.astro`).

- **Las capturas de Chrome headless no son deterministas.** Dos renders del mismo URL difieren en ~227 filas de píxeles. Cualquier comparación visual automática tiene que medir ese ruido primero, o vas a "encontrar" cambios que no existen.

- **`--ilhas-text` sobre `.bg-dark` mide 1.76:1 y falla AA.** Todo texto que pueda caer en una sección oscura necesita su override `:global(.bg-dark)`. Ya pasó con el pie de `Captura` y de `VideoClip`.

- **El video propio ya funciona con la CSP actual**, por herencia de `default-src 'self'`. No hay que tocar nada. YouTube/Vimeo incrustados están bloqueados por completo, a propósito. El diff de CSP para el día que entre `media.ilhas.ai` está escrito en `../docs/06-stack-y-seguridad.md`.

---

## Verificación al cerrar la Iteración 1

- `npm run build` limpio, sin warnings
- **0** `<script>`, **0** `on*=`, **0** marcadores en el HTML de producción
- Las secciones nuevas de `/soluciones` y `/nosotros` no existen en el HTML
- Lighthouse en las cinco rutas: **100** accesibilidad · **100** buenas prácticas · **100** SEO · **99** performance
- Home, `/finanzas` y `/nosotros`: píxel-idénticos al build anterior (medido contra el ruido del headless)
- Prueba del sistema: se copió un `producto-stampay.png` → apareció en el home **y** en `/soluciones` con su `alt` real, sin tocar una línea de código; se borró → se apagó
