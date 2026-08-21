# 04 · Logo

## Versiones

La marca tiene dos versiones. Los archivos viven en `ilhas-landing/assets/logo/`.

| Versión | Archivo | Tamaño | Cuándo usarla |
|---|---|---|---|
| **Logo completo** (marca + wordmark) | `logo.svg`, `logo.png` (236×72), `logo@2x.png` (472×144) | Proporción 236×72 (~3.28:1) | Uso por defecto: headers, portadas, firmas, one-pagers. |
| **Isotipo / mark** (solo círculo) | `logo-mark.svg`, `logo-mark.png` (72×72), `logo-mark@2x.png` (144×144) | Cuadrado 1:1 | Avatar, favicon, redes, sellos, espacios pequeños o cuadrados. |

Prefiere siempre **SVG** cuando el medio lo permita (escala sin perder nitidez). Usa PNG `@2x` para pantallas de alta densidad.

## Anatomía

1. **El isotipo (mark):** un **círculo con el gradiente de marca** (cian→morado→violeta, dirección abajo-izq → arriba-der) con un **punto/círculo blanco al centro** (blanco al 92% de opacidad). El punto interior mide ~44% del radio del círculo exterior. Evoca una "isla" / un foco de claridad — coherente con el nombre Ilhas (islas en portugués).
2. **El wordmark:** la palabra **"ilhas"** en **Space Grotesk 600**, **siempre en minúsculas**, color `ilhas-dark` (#0E0E0F), con letter-spacing -0.8. El isotipo va a la izquierda del wordmark, centrados verticalmente.

### Especificaciones del isotipo (para reconstruirlo)

- Lienzo 72×72. Círculo exterior centrado, radio 33, relleno = gradiente de marca.
- Círculo interior centrado, radio 14.5, blanco `#FFFFFF` al 92%.
- Gradiente: `linear-gradient(to top right, #55E8FF 0%, #8E5BFF 50%, #A14BFF 100%)`.

## Área de protección (clear space)

Deja como mínimo un margen libre igual al **radio del punto blanco interior** (~½ de la altura de la "i" del wordmark) alrededor de todo el logo. Más espacio siempre es mejor: la marca es premium y respira. Nada de texto, íconos o bordes dentro de esa zona.

## Tamaño mínimo

- Logo completo: no menor a **120px** de ancho (digital) para mantener legible el wordmark.
- Isotipo: no menor a **24px**; por debajo de eso, el punto interior se pierde.

## Uso sobre fondos

- **Preferido:** logo con wordmark oscuro sobre fondo claro (`ilhas-light` o blanco).
- **Fondo oscuro:** usa una versión con wordmark en **blanco** (el isotipo conserva su gradiente, que resalta bien sobre oscuro). _(Si aún no existe el archivo en blanco, generarlo a partir del SVG cambiando el `fill` del texto a `#FFFFFF`.)_
- **Sobre gradiente o foto:** usa el isotipo solo, o el logo en una sola tinta (blanco), nunca el wordmark oscuro sobre fondo oscuro.
- Asegura contraste suficiente; si el fondo compite, coloca el logo sobre una superficie sólida.

## Usos incorrectos (no hacer)

- No cambiar los colores del isotipo ni alterar las paradas/dirección del gradiente.
- No poner "ilhas" en MAYÚSCULAS ni con otra tipografía.
- No deformar, rotar ni estirar (mantén la proporción).
- No agregar sombras duras, contornos, relieve ni efectos al logo.
- No reorganizar la relación isotipo–wordmark ni separar el punto del círculo.
- No colocar el logo sobre fondos de bajo contraste o muy ocupados.
- No reconstruir el wordmark con kerning distinto; respeta el tracking -0.8.

## Nombre escrito

En texto corrido la marca se escribe **"Ilhas"** (mayúscula inicial). El **logotipo** estiliza el wordmark en minúsculas ("ilhas"): esa minúscula es decisión de diseño del logo, no la forma de escribir el nombre en una frase.
