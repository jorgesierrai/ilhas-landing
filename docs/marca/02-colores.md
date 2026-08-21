# 02 · Color

La paleta Ilhas es **fondo claro, tinta casi negra y un morado vibrante** que se despliega en un gradiente cian→morado→violeta. El morado es la firma; el gradiente es el momento "premium". Úsalos con disciplina: mucho aire blanco, acento morado puntual, gradiente como protagonista solo en momentos clave.

## Paleta principal

| Token | HEX | RGB | Rol |
|---|---|---|---|
| `ilhas-primary` | `#7A3CFF` | 122, 60, 255 | **Color de marca.** Botones, links, acentos, íconos. |
| `ilhas-primaryDark` | `#622ECC` | 98, 46, 204 | Hover/estado activo del primary. |
| `ilhas-dark` | `#0E0E0F` | 14, 14, 15 | Tinta principal: titulares y fondos oscuros. |
| `ilhas-text` | `#3C3C44` | 60, 60, 68 | Texto de cuerpo sobre fondo claro. |
| `ilhas-light` | `#F8FAFF` | 248, 250, 255 | Fondo por defecto (blanco azulado). |
| `ilhas-gray` | `#E8ECF2` | 232, 236, 242 | Bordes, divisores, superficies sutiles. |
| Blanco | `#FFFFFF` | 255, 255, 255 | Tarjetas y superficies sobre el fondo claro. |

## Gradiente de marca (la firma visual)

Tres paradas, en este orden exacto:

| Parada | HEX | RGB |
|---|---|---|
| Inicio | `#55E8FF` (cian) | 85, 232, 255 |
| Medio | `#8E5BFF` (morado) | 142, 91, 255 |
| Fin | `#A14BFF` (violeta) | 161, 75, 255 |

**Dirección canónica:** diagonal de abajo-izquierda → arriba-derecha (la del logo).

```css
/* Gradiente canónico (logo, marca, círculo) */
background: linear-gradient(to top right, #55E8FF 0%, #8E5BFF 50%, #A14BFF 100%);

/* Variante horizontal (barras, banners full-width) — pasa por el primary */
background: linear-gradient(to right, #55E8FF 0%, #7A3CFF 50%, #A14BFF 100%);

/* Texto con gradiente (palabras clave en titulares) */
background: linear-gradient(to right, #55E8FF, #8E5BFF, #A14BFF);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

> Si animas el gradiente, usa `background-size: 200% 200%` y desplaza la posición lentamente (~8s). Sutil, nunca estridente.

## Cómo se usa el color (roles)

- **Fondo:** `ilhas-light` (#F8FAFF) por defecto. Secciones alternas en blanco puro. Mucho espacio negativo.
- **Texto:** titulares en `ilhas-dark`; cuerpo en `ilhas-text`. Sobre fondo oscuro, texto blanco.
- **Acento:** `ilhas-primary` para botones, links, íconos y números destacados.
- **Momento premium:** gradiente en el logo, en una palabra clave del titular, en el círculo de marca, o como fondo de una sección hero/CTA.
- **Superficies:** tarjetas blancas con borde `ilhas-gray` y sombra suave.

### Patrones de opacidad (muy usados en la marca)

- Chips / fondos de ícono: `primary` al **10%** (`rgba(122,60,255,0.1)`).
- Halos / blobs decorativos: `primary` o `gradientStart` al **20%** con blur fuerte.
- Texto secundario: `ilhas-text` al **80%**; texto terciario al **60–70%** (ver accesibilidad).
- Bordes: `ilhas-gray` al **40–70%**.

## Sombras (elevación)

| Token | Valor | Uso |
|---|---|---|
| `soft` | `0 18px 45px rgba(15, 23, 42, 0.06)` | Tarjetas, header, elevación por defecto. |
| `glow` | `0 0 40px rgba(122, 60, 255, 0.3)` | Resplandor morado en elementos destacados. |
| Hover botón | `0 0 40px rgba(122, 60, 255, 0.5)` | Glow al pasar el cursor sobre el CTA. |

## Accesibilidad (contraste)

- Para **texto pequeño**, usa `ilhas-text` (#3C3C44) sólido o `ilhas-dark`. **Evita** grises a 60–70% de opacidad en cuerpos largos: quedan al límite de WCAG AA sobre blanco.
- Botón primary `#7A3CFF` con texto **blanco**: contraste suficiente para texto de botón.
- No pongas texto morado claro del gradiente (cian/violeta) sobre fondo blanco para texto funcional: solo para acentos grandes o decorativos.
- En fondos con gradiente, usa **texto blanco** y verifica que el área bajo el texto no sea la zona más clara (cian).

## Do / Don't

**Do**
- Mucho blanco + un acento morado por bloque.
- Gradiente reservado para momentos de marca (logo, hero, CTA, una palabra clave).
- Mantén el orden cian→morado→violeta del gradiente.

**Don't**
- No inventes colores nuevos (verdes, naranjas, etc.) fuera de esta paleta.
- No llenes una composición de gradiente: pierde el efecto premium.
- No uses el morado primary como fondo de bloques grandes de texto largo.
- No alteres las paradas ni la dirección del gradiente del logo.
- No uses negro puro `#000`; la tinta de marca es `#0E0E0F`.
