# 03 · Tipografía

Dos tipografías, una regla simple:

- **Space Grotesk** → titulares, logo y números grandes (la voz "display").
- **Inter** → todo el cuerpo, etiquetas e interfaz.

Ambas son gratuitas (Google Fonts) y se cargan así:

```
https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap
```

## Familias y pesos

| Uso | Fuente | Pesos disponibles | Fallback |
|---|---|---|---|
| Display / titulares | **Space Grotesk** | 500, 600, 700 | `system-ui, sans-serif` |
| Cuerpo / interfaz | **Inter** | 300, 400, 500, 600, 700 | `system-ui, -apple-system, sans-serif` |

Peso preferido de titulares: **600** (semibold). El wordmark del logo es Space Grotesk **600**.

## Principios

- **Titulares grandes y con aire.** La marca respira: tamaños XL, mucho interlineado y márgenes amplios.
- **Tracking ajustado en display.** Los titulares van con letter-spacing negativo (`tracking-tight`, ~ -0.02em). El wordmark usa -0.8.
- **Una idea por titular.** Frases de poder cortas (ver `05-voz-y-copy.md`).
- **Cuerpo cómodo.** Interlineado relajado (~1.6) y medida de línea controlada (máx ~65–75 caracteres).

## Escala tipográfica de referencia

Pensada para web/presentaciones. Ajusta proporciones según el medio, manteniendo el contraste grande entre titular y cuerpo.

| Nivel | Fuente / peso | Tamaño objetivo | Notas |
|---|---|---|---|
| Display / H1 (hero) | Space Grotesk 600 | 3–3.75rem (48–60px); hasta 5rem en piezas grandes | `tracking-tight`. Frase de poder. |
| H2 (sección) | Space Grotesk 600 | 1.875–2.25rem (30–36px) | Encabezado de bloque. |
| H3 (subsección) | Space Grotesk 600 / Inter 600 | 1.125–1.25rem (18–20px) | Títulos de tarjeta. |
| Lead / subtítulo | Inter 400 | 1.125–1.25rem (18–20px) | Texto bajo el H1, color `ilhas-text/80`. |
| Cuerpo | Inter 400 | 1rem–1.125rem (16–18px) | Mínimo 1rem; en piezas premium apunta a 1.25rem. |
| Small / etiquetas | Inter 500 | 0.75–0.875rem (12–14px) | Mayúsculas + `tracking-wider` para kickers. |
| Número destacado | Space Grotesk 600 | 1.875–3rem | Stats y métricas. |

## Jerarquía y combinaciones

- **Kicker + Titular + Lead:** etiqueta pequeña en mayúsculas (Inter 500, tracking amplio, color primary) → titular grande (Space Grotesk) → lead (Inter, gris 80%).
- **Palabra clave en gradiente:** dentro de un H1 oscuro, una sola palabra o frase corta puede ir con el gradiente de marca aplicado al texto. Una por titular, no más.
- **Números:** las métricas grandes van en Space Grotesk para sentir "producto/tablero".

## Reglas

**Do**
- Solo Space Grotesk + Inter. Nada más.
- Titulares en 600, cuerpo en 400, énfasis en 500/600.
- Contraste grande de tamaño entre titular y cuerpo.

**Don't**
- No uses Space Grotesk para párrafos largos.
- No mezcles otras tipografías (Arial, Montserrat, etc.).
- No abuses de negritas dentro del cuerpo; resalta con intención.
- No uses titulares en MAYÚSCULAS completas salvo kickers/etiquetas cortas.
- No aprietes el interlineado del cuerpo.

## Si Space Grotesk o Inter no están disponibles

Orden de reemplazo: `system-ui` → `-apple-system` → `Segoe UI` → `sans-serif`. En documentos de oficina (sin las fuentes instaladas), usa una grotesca/geométrica para titulares (p. ej. **Poppins** o **Montserrat**) e Inter o **Arial** para cuerpo, manteniendo la misma jerarquía.
