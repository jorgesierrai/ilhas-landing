/**
 * npm run eventos — el estado de los cuatro eventos de medición.
 *
 * Gemelo de `medios-check.mjs`, y existe por una razón que no es cosmética:
 * un medio que falta SE VE. Un evento que se rompió **no se ve**. La gráfica se
 * aplana y nadie se entera hasta tres meses después, cuando ya tomaste
 * decisiones con números que no significaban lo que creías.
 *
 * Grita —y sale con código 1— cuando:
 *
 *   1. un evento declarado NO aparece en `dist/`, o aparece menos veces que su
 *      `minimo`  → alguien borró o renombró el botón;
 *   2. aparece en `dist/` un `data-evento` que NO está en el registro
 *      → alguien se inventó uno;
 *   3. un evento aparece en una página donde NO estaba declarado
 *      → se copió un bloque de marcado sin pensar.
 *
 * El caso 3 es el más útil de los tres y el que nadie ve a ojo: duplica
 * conversiones y te hace creer que el sitio convierte el doble.
 *
 * ⚠️ VA DENTRO DE `npm run build`, para que no dependa de que alguien se
 * acuerde de correrlo. Si esto sale por warning en vez de por error, se vuelve
 * ruido y deja de servir.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(RAIZ, "dist");

const { EVENTOS } = await import(path.join(RAIZ, "src", "data", "eventos.ts"));

if (!fs.existsSync(DIST)) {
  console.error("\n  ⚠  No hay dist/. Corre `npm run build` primero.\n");
  process.exit(1);
}

/** Todos los .html del build, con su ruta pública. */
function paginas(dir = DIST, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) paginas(p, acc);
    else if (e.name.endsWith(".html")) {
      let ruta = "/" + path.relative(DIST, p).replace(/index\.html$/, "");
      ruta = ruta.replace(/\/$/, "") || "/";
      acc.push({ ruta, html: fs.readFileSync(p, "utf8") });
    }
  }
  return acc;
}

const PAGS = paginas();
const registro = new Map(EVENTOS.map((e) => [e.id, e]));

/** id → { total, porPagina: Map<ruta, n> } */
const encontrados = new Map();
for (const { ruta, html } of PAGS) {
  for (const m of html.matchAll(/data-evento="([^"]+)"/g)) {
    const id = m[1];
    if (!encontrados.has(id))
      encontrados.set(id, { total: 0, porPagina: new Map() });
    const reg = encontrados.get(id);
    reg.total += 1;
    reg.porPagina.set(ruta, (reg.porPagina.get(ruta) || 0) + 1);
  }
}

let problemas = 0;
console.log("");

for (const ev of EVENTOS) {
  const hallado = encontrados.get(ev.id);
  const total = hallado ? hallado.total : 0;
  const rutas = hallado ? [...hallado.porPagina.keys()].sort() : [];

  // ── 1 · ¿aparece las veces que debe?
  const suficiente = total >= ev.minimo;

  // ── 3 · ¿aparece donde NO se declaró?
  const intrusas = rutas.filter((r) => !ev.paginas.includes(r));

  const ok = suficiente && intrusas.length === 0;
  if (!ok) problemas += 1;

  const marca = ok ? "✓" : "✗";
  console.log(
    `  ${marca}  ${ev.id.padEnd(22)} ${String(total).padStart(2)} en ${
      rutas.join(", ") || "ninguna página"
    }   (esperados ${ev.minimo})`,
  );

  if (!suficiente) {
    console.log(`     ↳ FALTAN ${ev.minimo - total}. SE ROMPE SI: ${ev.seRompeSi}`);
  }
  if (intrusas.length) {
    console.log(
      `     ↳ APARECE DONDE NO SE DECLARÓ: ${intrusas.join(", ")}. ` +
        `O se copió un bloque sin pensar, o hay que declararlo en eventos.ts.`,
    );
  }
}

// ── 2 · ¿hay eventos inventados, fuera del registro?
const inventados = [...encontrados.keys()].filter((id) => !registro.has(id));
for (const id of inventados) {
  problemas += 1;
  console.log(
    `  ✗  ${id.padEnd(22)} NO ESTÁ EN EL REGISTRO. Declá­ralo en ` +
      `src/data/eventos.ts o quítalo del marcado.`,
  );
}

const totalEventos = EVENTOS.length;
console.log(
  `\n  ${totalEventos - problemas} de ${totalEventos} eventos correctos · ` +
    `${problemas} con problema\n`,
);

if (problemas > 0) process.exit(1);
