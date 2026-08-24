# src/assets/iconos/ — íconos SVG

Se **inlinean** en el HTML para que hereden `currentColor` y funcionen igual sobre fondo claro y sobre `bg-dark`, sin duplicar archivos.

## Specs

```
SVG, lienzo 24×24
stroke="currentColor", stroke-width 1.5-2
sin fill ni stroke con color fijo
≤ 2 KB por archivo
```

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
  <!-- trazos -->
</svg>
```

## Reglas

1. **Límpialo antes de guardar:** fuera `<title>`, metadatos del editor, `id` generados y capas vacías.
2. **Revisa cada SVG a mano antes de commitear.** Se inlinean con `set:html`, que `docs/06-stack-y-seguridad.md` solo permite para contenido literal del repo. Ningún SVG entra sin leerse.
3. **No uses los PNG de `public/assets/ilhas-iconografia/`.** Pesan 0.5-1.8 MB, no heredan color, y `docs/05-assets.md` dice que esa carpeta es furniture de video, no material de web.
4. Un solo estilo para todo el set: mismo grosor de trazo, mismas terminaciones, mismo nivel de detalle.

Lista completa en `medios/CHECKLIST.md`.
