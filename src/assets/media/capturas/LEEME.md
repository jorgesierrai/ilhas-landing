# src/assets/media/capturas/ — capturas de pantalla

Van aquí y **no** en `public/`: así `astro:assets` genera AVIF/WebP y calcula `width`/`height` en el build.

## Nombre

El nombre del archivo sin extensión **es** el id de la ranura. Minúsculas, guiones medios, sin acentos.

## Specs

```
PNG (interfaces, código) o JPG (fotos)
1600 px de ancho
≤ 400 KB por archivo
```

## Las cuatro reglas de captura

1. **Sube el tamaño de fuente antes de capturar.** Editor y terminal a 16-18 px mínimo. Es la diferencia entre una captura que se lee y una que solo decora.
2. **Recorta al bloque que importa**, no a la ventana entera. Una ventana completa de VS Code escalada a 600 px no la lee nadie.
3. **No quemes texto en el PNG.** Flechas, etiquetas y resaltados se hacen con HTML y CSS encima: se leen con lector de pantalla, se traducen y se corrigen sin reexportar.
4. **Revisa antes de guardar** que no salga: rutas con tu usuario, nombres de clientes, RFC, correos, API keys, tokens, cifras de un cliente identificable.

> Si una pantalla no se puede despersonalizar, no va. Mejor cinco capturas limpias que seis con un dato que no debía salir.

Comandos de optimización en `medios/recetas.md`. Lista completa en `medios/CHECKLIST.md`.
