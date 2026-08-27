# public/assets/video/ — loops, clips, pósters y subtítulos

Aquí van los archivos de video **ya exportados y optimizados**. No pasan por `astro:assets`: se sirven tal cual, así que el peso que dejes aquí es el peso que descarga el visitante.

## Nombre

El nombre del archivo sin extensión **es** el id de la ranura. Minúsculas, guiones medios, sin acentos, sin espacios, sin guiones bajos.

## Qué archivos lleva cada ranura

**Loop mudo** (los "GIFs" — agentes corriendo, dashboards):
```
<id>.webm    ≤ 800 KB    8-15 s, sin audio
<id>.mp4     ≤ 1.5 MB    respaldo
<id>.jpg     ≤ 200 KB    póster (obligatorio: sin él hay salto de layout)
```

**Clip con voz** (radio, historia, testimonios, edificación):
```
<id>.mp4     ≤ 12 MB     45-90 s
<id>.jpg     ≤ 200 KB    póster
<id>.es.vtt              subtítulos — OBLIGATORIO
```

## Reglas

1. **Ningún video pasa de 90 segundos.** Los completos van a YouTube y se enlazan; aquí solo van cortes.
2. **Nada de `.gif`.** Un GIF de 10 s pesa 8-15 MB; el mismo clip en WebM/AV1 pesa 300-800 KB.
3. **Subtítulos obligatorios en todo clip con voz.** La mayoría del tráfico de redes ve sin sonido.
4. Exporta siempre con `-movflags +faststart` y `-pix_fmt yuv420p`, o no reproduce bien.

Comandos listos en `medios/recetas.md`. Lista completa de archivos en `medios/CHECKLIST.md`.
