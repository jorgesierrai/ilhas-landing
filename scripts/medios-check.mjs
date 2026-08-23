/**
 * npm run medios — el estado de las 41 ranuras.
 *
 *   ✓  el archivo está y cabe en su peso
 *   ✗  falta el archivo         → NO falla: faltar material es lo normal
 *   ⚠  hay un problema real     → sale con código 1, para poder engancharlo a CI
 *
 * Un ⚠ es una de tres cosas:
 *   - el archivo pesa más que su `pesoMaxKB`
 *   - un clip con voz no trae su `.es.vtt`, o un video no trae póster
 *   - un testimonio tiene material pero no tiene `atribucion`
 *
 * Córrelo antes de cada commit. Es el que evita que se publique un video de
 * 40 MB o un testimonio sin atribuir.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const { MEDIOS } = await import(path.join(RAIZ, "src", "data", "medios.ts"));

// Topes que el manifiesto no puede expresar en un solo `pesoMaxKB`, tomados de
// medios/CHECKLIST.md: en un loop, `pesoMaxKB` es el tope del .mp4.
const MAX_WEBM_KB = 800;
const MAX_POSTER_KB = 200;

const DIR_VIDEO = path.join(RAIZ, "public", "assets", "video");
const DIR_CAPTURAS = path.join(RAIZ, "src", "assets", "media", "capturas");
const DIR_FOTOS = path.join(RAIZ, "src", "assets", "media", "fotos");
const DIR_ICONOS = path.join(RAIZ, "src", "assets", "iconos");

const EXT_IMAGEN = [".png", ".jpg", ".jpeg", ".webp", ".avif"];

const kb = (ruta) => fs.statSync(ruta).size / 1024;
const fmt = (n) => (n >= 1024 ? `${(n / 1024).toFixed(1)} MB` : `${Math.round(n)} KB`);

/** Busca `id.<ext>` entre varias extensiones en un directorio. */
function buscarImagen(dir, id) {
  for (const ext of EXT_IMAGEN) {
    const ruta = path.join(dir, id + ext);
    if (fs.existsSync(ruta)) return ruta;
  }
  return null;
}

const existe = (ruta) => (fs.existsSync(ruta) ? ruta : null);

/**
 * Revisa una ranura. Devuelve { estado: "ok" | "falta" | "problema", detalle }.
 */
function revisar(slot) {
  const avisos = [];
  const partes = [];

  /** Registra un archivo encontrado y verifica su peso contra un tope. */
  const registrar = (ruta, topeKB, etiqueta) => {
    const peso = kb(ruta);
    partes.push(`${etiqueta} ${fmt(peso)}`);
    if (peso > topeKB) {
      avisos.push(`${etiqueta} pesa ${fmt(peso)} (máx ${fmt(topeKB)})`);
    }
  };

  if (slot.tipo === "captura" || slot.tipo === "foto") {
    const dir = slot.tipo === "captura" ? DIR_CAPTURAS : DIR_FOTOS;
    const ruta = buscarImagen(dir, slot.id);
    if (!ruta) return { estado: "falta", detalle: "" };
    registrar(ruta, slot.pesoMaxKB, path.extname(ruta).slice(1));
  } else if (slot.tipo === "icono") {
    const ruta = existe(path.join(DIR_ICONOS, `${slot.id}.svg`));
    if (!ruta) return { estado: "falta", detalle: "" };
    registrar(ruta, slot.pesoMaxKB, "svg");
    const svg = fs.readFileSync(ruta, "utf8");
    // Un SVG puede traer script adentro. No entra sin revisarse.
    if (/<script|\son\w+\s*=/i.test(svg)) {
      avisos.push("el SVG trae <script> o un atributo on*= — revísalo a mano");
    }
    if (!/currentColor/.test(svg)) {
      avisos.push('no usa stroke="currentColor": no va a heredar color sobre .bg-dark');
    }
  } else if (slot.tipo === "loop") {
    const webm = existe(path.join(DIR_VIDEO, `${slot.id}.webm`));
    const mp4 = existe(path.join(DIR_VIDEO, `${slot.id}.mp4`));
    if (!webm && !mp4) return { estado: "falta", detalle: "" };
    if (webm) registrar(webm, MAX_WEBM_KB, "webm");
    if (mp4) registrar(mp4, slot.pesoMaxKB, "mp4");
    const poster = existe(path.join(DIR_VIDEO, `${slot.id}.jpg`));
    if (!poster) avisos.push("falta el póster .jpg (sin él hay salto de layout)");
    else registrar(poster, MAX_POSTER_KB, "póster");
  } else if (slot.tipo === "clip") {
    const mp4 = existe(path.join(DIR_VIDEO, `${slot.id}.mp4`));
    const hayTexto = Boolean(slot.texto);
    if (!mp4 && !hayTexto) return { estado: "falta", detalle: "" };

    if (mp4) {
      registrar(mp4, slot.pesoMaxKB, "mp4");
      const poster = existe(path.join(DIR_VIDEO, `${slot.id}.jpg`));
      if (!poster) avisos.push("falta el póster .jpg");
      else registrar(poster, MAX_POSTER_KB, "póster");
      // Todo clip de este sitio lleva voz; los mudos son tipo "loop".
      if (!existe(path.join(DIR_VIDEO, `${slot.id}.es.vtt`))) {
        avisos.push("falta el .es.vtt (obligatorio: hay voz)");
      }
    } else {
      partes.push("cita en texto");
    }

    if (slot.seccion.includes("Testimonios") && !slot.atribucion) {
      avisos.push("FALTA atribución en el manifiesto — sin nombre y rol no se publica");
    }
  }

  return {
    estado: avisos.length ? "problema" : "ok",
    detalle: avisos.length ? avisos.join(" · ") : partes.join(" · "),
  };
}

// --- Salida ----------------------------------------------------------------

const ICONO = { ok: "✓", falta: "✗", problema: "⚠" };

let listas = 0;
let problemas = 0;

for (const prioridad of [1, 2, 3]) {
  const grupo = MEDIOS.filter((m) => m.prioridad === prioridad);
  if (!grupo.length) continue;

  console.log(`\nPRIORIDAD ${prioridad}`);
  for (const slot of grupo) {
    const { estado, detalle } = revisar(slot);
    if (estado === "ok") listas++;
    if (estado === "problema") problemas++;

    const linea = `  ${ICONO[estado]}  ${slot.id.padEnd(34)}`;
    if (estado === "falta") console.log(`${linea}FALTA`);
    else console.log(`${linea}${detalle}`);
  }
}

console.log(
  `\n${listas} de ${MEDIOS.length} listas · ${problemas} con problema\n`,
);

// Un ✗ es el estado normal entre las dos iteraciones y no debe fallar.
// Un ⚠ sí: es material que ya está pero que no se puede publicar como está.
process.exit(problemas > 0 ? 1 : 0);
