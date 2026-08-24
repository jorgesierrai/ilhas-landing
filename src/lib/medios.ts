/**
 * El detector — resuelve si el archivo de una ranura ya existe en el repo.
 *
 * Dos mecanismos distintos, según dónde vive el archivo:
 *
 *   src/assets/…  → lo procesa Vite/astro:assets. `import.meta.glob` solo
 *                   devuelve lo que EXISTE, así que una ranura vacía
 *                   simplemente no aparece en el mapa y no rompe el build.
 *   public/…      → no pasa por Vite. Se comprueba en disco con node:fs
 *                   durante el build (SSG) y en cada request de `astro dev`.
 *
 * Este módulo importa `node:fs` y por eso NUNCA debe llegar a un bundle de
 * cliente. Hoy es imposible: el sitio no manda un solo byte de JS al navegador
 * (docs/06-stack-y-seguridad.md).
 */

import fs from "node:fs";
import path from "node:path";
import type { ImageMetadata } from "astro";
import { porId, type SlotMedio } from "../data/medios";

// --- Imágenes (capturas y fotos) -------------------------------------------
const IMAGENES = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/media/**/*.{png,jpg,jpeg,webp,avif}",
  { eager: true },
);

// --- Íconos ----------------------------------------------------------------
// Se inlinean como SVG para que hereden `currentColor` y sirvan igual sobre
// fondo claro y sobre .bg-dark. Un <img> no puede heredar color.
const ICONOS = import.meta.glob<string>("/src/assets/iconos/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
});

// --- Video -----------------------------------------------------------------
// process.cwd() en vez de import.meta.url: Astro siempre corre desde la raíz
// del proyecto, y así la ruta no depende de dónde acabe este módulo después
// de que Vite lo empaquete para el render de SSG.
const DIR_VIDEO = path.join(process.cwd(), "public", "assets", "video");

/** Índice id → ImageMetadata, construido una sola vez. */
const IMAGENES_POR_ID = new Map<string, ImageMetadata>(
  Object.entries(IMAGENES).map(([ruta, mod]) => [
    path.basename(ruta, path.extname(ruta)),
    mod.default,
  ]),
);

/** Índice id → SVG crudo, construido una sola vez. */
const ICONOS_POR_ID = new Map<string, string>(
  Object.entries(ICONOS).map(([ruta, svg]) => [
    path.basename(ruta, ".svg"),
    svg,
  ]),
);

/** La captura o foto de una ranura, lista para `<Image>`. `null` si no existe. */
export function buscarImagen(id: string): ImageMetadata | null {
  return IMAGENES_POR_ID.get(id) ?? null;
}

/**
 * El SVG crudo de un ícono, para inlinearlo con `set:html`.
 *
 * `docs/06-stack-y-seguridad.md` dice: «Nada de `set:html` con contenido que
 * no sea literal escrito en el repo». Estos SVG SON literales del repo — viven
 * en `src/assets/iconos/`, se leen en build time, nunca vienen de una red ni
 * de input de usuario. Por eso el uso está permitido y esta es la única
 * excepción del sitio.
 *
 * A cambio: ningún SVG entra a esa carpeta sin revisarse a mano. Un SVG puede
 * traer `<script>` o `on*=` adentro; revísalo abriéndolo en un editor antes de
 * copiarlo, no confíes en que "es solo un ícono".
 */
export function buscarIcono(id: string): string | null {
  return ICONOS_POR_ID.get(id) ?? null;
}

/** Ruta pública de un archivo de video, o `null` si no está en disco. */
export function rutaVideo(id: string, ext: string): string | null {
  return fs.existsSync(path.join(DIR_VIDEO, `${id}.${ext}`))
    ? `/assets/video/${id}.${ext}`
    : null;
}

/** El póster de un loop o clip (obligatorio para no provocar salto de layout). */
export function rutaPoster(id: string): string | null {
  return rutaVideo(id, "jpg");
}

/** Los subtítulos en español de un clip con voz. */
export function rutaSubtitulos(id: string): string | null {
  return rutaVideo(id, "es.vtt");
}

/**
 * `true` si la ranura tiene al menos su archivo principal.
 *
 * Es la pieza clave del sistema: las secciones nuevas la consultan para no
 * renderizarse mientras estén vacías, y cada componente la consulta para
 * decidir entre pintar el medio real o el marcador de `Ranura.astro`.
 */
export function hayMedio(id: string): boolean {
  const slot = porId(id);
  if (!slot) return false;

  switch (slot.tipo) {
    case "captura":
    case "foto":
      return buscarImagen(id) !== null;
    case "icono":
      return buscarIcono(id) !== null;
    case "loop":
      // Basta con uno de los dos formatos; el otro es respaldo.
      return rutaVideo(id, "webm") !== null || rutaVideo(id, "mp4") !== null;
    case "clip":
      // Un testimonio puede resolverse con cita en texto en vez de video.
      return rutaVideo(id, "mp4") !== null || Boolean(slot.texto);
  }
}

/** `true` si alguna de las ranuras existe. Para decidir si una sección entera se renderiza. */
export function hayAlguno(...ids: string[]): boolean {
  return ids.some(hayMedio);
}

/**
 * `true` si hay que renderizar el contenedor de estas ranuras: porque ya hay
 * material, o porque estamos en dev y queremos ver los marcadores.
 *
 * ÚSALO EN TODO CONTENEDOR DE MEDIOS. Un div vacío no mide nada de alto, pero
 * su `margin-top` sí se aplica igual — sin esta guardia, cada ranura vacía
 * empujaba el resto de la página unos 32 px hacia abajo y el sitio en
 * producción dejaba de verse igual que antes.
 */
export function mostrar(...ids: string[]): boolean {
  return hayAlguno(...ids) || import.meta.env.DEV;
}

/**
 * La ruta que la ranura ESPERA, para que el marcador de dev diga exactamente
 * qué archivo hay que dejar caer y dónde.
 */
export function rutaEsperada(slot: SlotMedio): string {
  switch (slot.tipo) {
    case "captura":
      return `src/assets/media/capturas/${slot.id}.png`;
    case "foto":
      return `src/assets/media/fotos/${slot.id}.jpg`;
    case "icono":
      return `src/assets/iconos/${slot.id}.svg`;
    case "loop":
      return `public/assets/video/${slot.id}.{webm,mp4} + .jpg`;
    case "clip":
      return `public/assets/video/${slot.id}.mp4 + .jpg + .es.vtt`;
  }
}
