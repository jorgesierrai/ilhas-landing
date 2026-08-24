# Cortes de los dos testimonios — comandos para correr en tu Mac

Los originales están en `_material-crudo/` (fuera de `public/`, y ya en `.gitignore`).
Corre esto desde la raíz del repo. Ambos dejan el archivo directo en su ranura.

---

## 1 · Despiece — va completo, no hay que cortarlo

Dura 1:05 y **ya está dentro del rango** (60-90 s). Solo hay que bajarlo de 4K60 a formato web.

```bash
cd ~/Documents/Ilhas/ilhas-landing

ffmpeg -i _material-crudo/soluciones-testimonio-despiece.mov \
  -vf "scale=1280:-2,fps=30" \
  -c:v libx264 -crf 25 -preset slow -movflags +faststart -pix_fmt yuv420p \
  -c:a aac -b:a 96k \
  public/assets/video/soluciones-testimonio-despiece.mp4

ffmpeg -ss 2 -i _material-crudo/soluciones-testimonio-despiece.mov \
  -vf "scale=1280:-2" -vframes 1 -q:v 3 \
  public/assets/video/soluciones-testimonio-despiece.jpg
```

Debe quedar en **8-11 MB**. Si se pasa de 12, sube el `-crf` a 27.

---

## 2 · Oncología — dos tramos pegados, 85.6 s

El original dura 2:46. Mi propuesta deja el arco completo y tira lo que se repite:

| Tramo | Del original | Qué trae |
|---|---|---|
| **A** | `0:00 – 0:16.2` | Irlanda se presenta con nombre, cargo y empresa, y nombra el problema |
| **B** | `0:44.4 – 1:53.8` | El cuello de botella → **3-4 horas, hasta un día entero** → **20 minutos** → cierra en *"algo que hacíamos en tres, cuatro horas, o hasta días"* |

Ese cierre es el mejor punto para cortar: termina en el contraste, no en una explicación.

```bash
ffmpeg -i _material-crudo/soluciones-testimonio-oncologia.mov -filter_complex \
"[0:v]trim=0:16.2,setpts=PTS-STARTPTS,scale=1280:-2,fps=30[v0]; \
 [0:a]atrim=0:16.2,asetpts=PTS-STARTPTS[a0]; \
 [0:v]trim=44.4:113.8,setpts=PTS-STARTPTS,scale=1280:-2,fps=30[v1]; \
 [0:a]atrim=44.4:113.8,asetpts=PTS-STARTPTS[a1]; \
 [v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]" \
 -map "[v]" -map "[a]" \
 -c:v libx264 -crf 25 -preset slow -movflags +faststart -pix_fmt yuv420p \
 -c:a aac -b:a 96k \
 public/assets/video/soluciones-testimonio-oncologia.mp4

ffmpeg -ss 3 -i _material-crudo/soluciones-testimonio-oncologia.mov \
  -vf "scale=1280:-2" -vframes 1 -q:v 3 \
  public/assets/video/soluciones-testimonio-oncologia.jpg
```

Queda un corte seco entre A y B. Si prefieres suavizarlo, mételo a tu editor: los tiempos ya están decididos.

---

## 3 · Los subtítulos

Los dos `.es.vtt` ya están hechos y cuadran con estos cortes exactos. Cópialos a `public/assets/video/`.
**Si cambias los tiempos del corte de oncología, avísame y los vuelvo a sincronizar** — un subtítulo desfasado se nota más que no tenerlo.

---

## 4 · La atribución — sin esto el build truena

En `src/data/medios.ts`:

```ts
// soluciones-testimonio-oncologia
atribucion: {
  nombre: "Irlanda Morgan",
  rol: "Directora de operaciones",
  empresa: "Morgan Centro de Especialidad",   // ⚠️ verifica el nombre exacto
},

// soluciones-testimonio-despiece
atribucion: {
  nombre: "…",        // ⚠️ falta: en el video no se identifica
  rol: "…",
  empresa: "…",       // o quítalo y deja rol + sector
},
```

- **Oncología:** Irlanda se presenta sola en cámara, así que la atribución coincide con lo que el visitante escucha. Solo verifica si la empresa es *"Morgan Centro de Especialidad"* o *"Morgan Central de Especialidad"* — la transcripción automática no distingue.
- **Despiece:** en el video **nunca dice quién es**. Necesitas nombre y cargo, o cargo y sector (*"Director de operaciones, empresa de cancelería de aluminio"*). Sin eso el build falla a propósito.

---

## 5 · Verificar

```bash
npm run medios     # deben salir los dos en ✓
npm run build      # en tu Mac; aquí no corre por node_modules de macOS
```

---

## Nota de marketing

Los dos testimonios traen **la estructura correcta sin que se la pidieras**: antes con número, después con número.

- **Despiece:** *"tardaba cinco, seis días… ahora en minutos"* + *"ventaja competitiva"* + *"aprovechar demasiado el material"*
- **Oncología:** *"tres, cuatro horas, hasta un día entero… ahora veinte minutos"* + el ángulo humano — *"el paciente viene con ese agobio… no tenerlo en incertidumbre"*

Ese último es el más fuerte de los dos y no es sobre eficiencia: es sobre lo que se siente del otro lado. Vale la pena que aparezca como cita en texto junto al video, no solo dentro de él.
