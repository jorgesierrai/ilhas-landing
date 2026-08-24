# Recetas de exportación

Todo se exporta a **1280 px de ancho** para video y **1600 px** para capturas. Más resolución no se nota en un bloque de 600 px y sí se nota en el peso.

Instala ffmpeg una vez: `brew install ffmpeg`

---

## Loop mudo (los "GIFs")

8-15 segundos, sin audio, en bucle. Objetivo: `.webm` ≤ 800 KB, `.mp4` ≤ 1.5 MB.

```bash
ID=home-hero-loop
ENTRADA=~/Desktop/grabacion.mov
INICIO=00:00:04     # dónde empieza el corte
DUR=12              # segundos

# WebM / AV1 — el que va a usar casi todo el mundo
ffmpeg -ss $INICIO -t $DUR -i "$ENTRADA" -an \
  -vf "scale=1280:-2,fps=24" \
  -c:v libsvtav1 -crf 40 -preset 6 \
  "public/assets/video/$ID.webm"

# MP4 / H.264 — respaldo para Safari viejo
ffmpeg -ss $INICIO -t $DUR -i "$ENTRADA" -an \
  -vf "scale=1280:-2,fps=24" \
  -c:v libx264 -crf 26 -preset slow -movflags +faststart -pix_fmt yuv420p \
  "public/assets/video/$ID.mp4"

# Póster
ffmpeg -ss $INICIO -i "$ENTRADA" -vf "scale=1280:-2" -vframes 1 -q:v 4 \
  "public/assets/video/$ID.jpg"
```

Si `libsvtav1` no está disponible, usa VP9: `-c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1`.

---

## Clip con audio

45-90 segundos. Objetivo: ≤ 12 MB.

```bash
ID=nosotros-radio-2018
ENTRADA=~/Desktop/entrevista-imagen.mp4
INICIO=00:12:30
DUR=55

ffmpeg -ss $INICIO -t $DUR -i "$ENTRADA" \
  -vf "scale=1280:-2" \
  -c:v libx264 -crf 24 -preset slow -movflags +faststart -pix_fmt yuv420p \
  -c:a aac -b:a 96k \
  "public/assets/video/$ID.mp4"

ffmpeg -ss $INICIO -i "$ENTRADA" -vf "scale=1280:-2" -vframes 1 -q:v 4 \
  "public/assets/video/$ID.jpg"

# ¿Cuánto pesó?
ls -lh "public/assets/video/$ID.mp4"
```

Si se pasa de 12 MB: sube el `-crf` a 26 o 28 antes de bajar la resolución. Perder nitidez se nota menos que perder tamaño.

**Las dos banderas que no son opcionales:**
- `-movflags +faststart` — sin esto el video no empieza hasta descargarse completo.
- `-pix_fmt yuv420p` — sin esto no reproduce en Safari ni en iOS.

---

## Subtítulos (`.es.vtt`)

Obligatorios en todo clip con voz. Son accesibilidad **y** son marketing: la mayoría del tráfico que viene de redes ve sin sonido.

La forma rápida: exporta el SRT desde tu editor (Premiere, DaVinci, CapCut, Descript) y conviértelo:

```bash
ffmpeg -i subs.srt "public/assets/video/$ID.es.vtt"
```

Un VTT a mano se ve así:

```
WEBVTT

00:00:00.000 --> 00:00:03.400
Lo que viene con la inteligencia artificial

00:00:03.400 --> 00:00:07.200
no es que las máquinas piensen por nosotros.
```

**Revísalos.** Un subtítulo automático mal transcrito en tu propio sitio hace más daño que no tenerlo.

---

## Capturas de pantalla

```bash
# macOS: captura de una región, a 2× de DPI (por defecto en pantalla Retina)
# Cmd + Shift + 4, arrastra la región
```

Después, optimiza. Objetivo: **≤ 400 KB**.

```bash
# Redimensiona a 1600 px de ancho y comprime
brew install imagemagick pngquant   # una sola vez

magick captura.png -resize 1600x -strip captura-1600.png
pngquant --quality=70-88 --force --output "src/assets/media/capturas/$ID.png" captura-1600.png

ls -lh "src/assets/media/capturas/$ID.png"
```

Para fotos (conferencias) usa JPG en vez de PNG:

```bash
magick foto.jpg -resize 2400x -quality 82 -strip \
  "src/assets/media/fotos/nosotros-conferencia.jpg"
```

### Reglas de captura

1. **Sube el tamaño de fuente antes de capturar.** Editor y terminal a 16-18 px como mínimo. Es la diferencia entre una captura que se lee y una que decora.
2. **Recorta al bloque que importa**, no a la ventana entera. Una ventana completa de VS Code escalada a 600 px de ancho no la lee nadie.
3. **No quemes texto en el PNG.** Las anotaciones (flechas, etiquetas, resaltados) se hacen con HTML y CSS encima de la imagen: se leen con lector de pantalla, se traducen y se corrigen sin reexportar.
4. **Revisa antes de guardar** que no salga: rutas con tu usuario, nombres de clientes, RFC, correos, API keys, tokens, cifras de un cliente identificable.

---

## Íconos SVG

Lienzo 24×24, trazo de 1.5-2, **sin `fill` ni `stroke` fijos** — que hereden `currentColor` para que funcionen sobre fondo claro y sobre `bg-dark` sin duplicar archivos.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
     stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
  <!-- trazos -->
</svg>
```

Antes de guardar, límpialo: quita `<title>`, metadatos del editor, `id` generados y capas vacías. Un SVG de ícono no debe pasar de **2 KB**.

---

## Verificación final

```bash
# Nada de GIF en el repo
find . -name "*.gif" -not -path "./node_modules/*"

# Los diez archivos más pesados de la biblioteca
du -ah public/assets/video src/assets/media | sort -rh | head -10

# El chequeo completo
npm run medios
```
