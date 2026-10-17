/**
 * npm run temario — ¿el temario cuadra?
 *
 * Gemelo de `eventos-check.mjs`, con una diferencia: corre ANTES de
 * `astro build`, no después. Si el temario no cuadra, no hay nada que construir:
 * el build se detiene aquí con un mensaje en español que dice qué y en qué
 * línea de `src/data/temario.md`.
 *
 * Usa el MISMO parser que la página (`src/lib/temario.ts`). Si aquí dice que
 * cuadra, es porque /temario va a pintar exactamente lo que se revisó.
 *
 * Grita —y sale con código 1— cuando:
 *
 *   1. el archivo trae algo que el parser no sabe leer (una sección nueva, una
 *      lección sin código…);
 *   2. un curso declara N lecciones y lista otra cantidad (la Masterclass
 *      cuenta módulos);
 *   3. la tabla «El programa en una mirada» no coincide con las secciones;
 *   4. la tabla no suma lo que dice el encabezado («7 cursos · N lecciones»);
 *   5. se menciona una lección, un nivel o un módulo que no existe;
 *   6. quedan residuos de la exportación (****, &#32;, &#91;);
 *   7. aparece un costo, de lo que sea (Jorge, 16 oct 2026);
 *   8. dos anclas se llaman igual;
 *   9. una persona de «Quién lo imparte» no tiene tarjeta en personas.ts;
 *  10. la descripción para buscadores pasa de 160 caracteres.
 *
 * ⚠️ VA DENTRO DE `npm run build`, igual que `eventos`: un chequeo que depende
 * de que alguien se acuerde de correrlo no se corre.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// Se le puede pasar otro archivo para probar una exportación nueva antes de
// reemplazar la buena: `npm run temario -- ~/Downloads/temario.md`.
const ARCHIVO = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(RAIZ, "src", "data", "temario.md");

const { leerTemario, revisar } = await import(path.join(RAIZ, "src", "lib", "temario.ts"));

if (!fs.existsSync(ARCHIVO)) {
  console.error(
    `\n  ⚠  No está ${path.relative(RAIZ, ARCHIVO)}. Es la exportación a Markdown ` +
      "del doc maestro del temario: pídesela a Jorge.\n",
  );
  process.exit(1);
}

const md = fs.readFileSync(ARCHIVO, "utf8");
const reglas = revisar(leerTemario(md), md);

let problemas = 0;
console.log(`\n  ${path.relative(RAIZ, ARCHIVO)}\n`);
for (const r of reglas) {
  const ok = r.fallas.length === 0;
  if (!ok) problemas += 1;
  console.log(`  ${ok ? "✓" : "✗"}  ${r.nombre.padEnd(36)} ${ok ? r.resumen : ""}`);
  for (const f of r.fallas) console.log(`     ↳ ${f}`);
}

console.log(
  `\n  ${reglas.length - problemas} de ${reglas.length} revisiones correctas · ` +
    `${problemas} con problema\n`,
);

if (problemas > 0) process.exit(1);
