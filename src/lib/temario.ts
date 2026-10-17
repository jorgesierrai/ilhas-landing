/**
 * El temario de Ilhas Academy, leído de `src/data/temario.md` AL COMPILAR.
 *
 * Ese archivo es la exportación a Markdown del doc maestro de Jorge. Lo leen
 * dos cosas, y las dos pasan por ESTE parser:
 *
 *   · la página `/temario`, que lo pinta;
 *   · `npm run temario` (scripts/temario-check.mjs), que corre ANTES de
 *     `astro build` y no deja publicar un temario que no cuadra.
 *
 * Si el chequeo dice que cuadra es porque la página va a pintar exactamente lo
 * que el chequeo revisó: no hay un segundo parser que se desincronice.
 *
 * CUANDO JORGE CAMBIA EL TEMARIO no se toca código: exporta su doc a Markdown,
 * reemplaza `src/data/temario.md` y corre `npm run build`. Si algo no cuadra,
 * el build se detiene y dice qué y en qué línea.
 *
 * ⚠️ ESTE ARCHIVO LO CARGA NODE A SECAS (`--experimental-strip-types`), no sólo
 * Vite. Por eso: nada de `enum` ni `namespace`, sólo `import type`, y NO
 * importa el .md — la página lo trae con `?raw` y se lo pasa a `leerTemario()`;
 * el chequeo lo lee con `fs`.
 *
 * ⚠️ LA PÁGINA PRESENTA, NO REESCRIBE (brief de la iteración 22). Aquí no se
 * corrige ni se completa ningún texto: lo que no venga en el archivo no existe.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────────────────────

export interface Leccion {
  /** «H.2», «1.3», «R.0». En la Masterclass, el número del módulo: «1». */
  codigo: string;
  titulo: string;
  descripcion: string;
  /** El renglón «Te llevas: …», sin la etiqueta. Es lo que vende. */
  teLlevas: string | null;
  /** Ancla estable: `bootcamp-h2`. Ver `idLeccion()`. */
  id: string;
  linea: number;
}

/** Un `###` dentro de un curso: módulo, nivel o fase. */
export interface Grupo {
  titulo: string;
  /** Lo de antes del «·»: «Nivel 1», «I», «Módulo 2», «Introducción». */
  etiqueta: string;
  /** Lo de después del «·», si lo hay: «Pedir bien y saber cuánto creerle». */
  nombre: string | null;
  descripcion: string | null;
  lecciones: Leccion[];
  id: string;
  linea: number;
}

/** Un renglón de la tabla «Las 5 fases» del Bootcamp. */
export interface Fase {
  /** «I», «L», «H», «A», «S». `null` en el renglón de cierre. */
  letra: string | null;
  nombre: string;
  queHaces: string;
  conQueSales: string;
  /** El `###` de esa fase, para enlazar el paso con sus lecciones. */
  grupoId: string | null;
}

export interface Curso {
  id: string;
  /** Orden de aparición. La numeración del archivo salta (4 → 6) y la página
   *  numera por orden, no por lo que diga el `##`. */
  orden: number;
  nombre: string;
  subtitulo: string | null;
  esBono: boolean;
  /** Lo que viene en negritas al abrir el curso: «9 módulos · 37 lecciones · 100% finanzas.» */
  destacado: string;
  /** El resto de ese primer párrafo. */
  entrada: string;
  comoTrabajas: string | null;
  antesDeEmpezar: string | null;
  alTerminar: string | null;
  /** Párrafos sueltos que no son ninguno de los de arriba. */
  notas: string[];
  declaradas: {
    lecciones: number | null;
    modulos: number | null;
    niveles: number | null;
  };
  /** Lecciones sin `###` encima: los 9 módulos de la Masterclass, las de los bonos. */
  lecciones: Leccion[];
  grupos: Grupo[];
  fases: { titulo: string; filas: Fase[] } | null;
  /** De la tabla «El programa en una mirada». */
  teResuelve: string | null;
  salesCon: string | null;
  linea: number;
}

export interface FilaMirada {
  /** Como viene en la tabla: «Bono · Reporte en minutos». */
  curso: string;
  /** Sin el «Bono ·». */
  nombre: string;
  teResuelve: string;
  salesCon: string;
  /** Como viene: «37», «1 video + fichas». */
  lecciones: string;
  /** El número que cuenta para el total. «1 video + fichas» cuenta 1. */
  cuenta: number | null;
  esBono: boolean;
  /** El curso con sección propia, si lo tiene. El Playbook no. */
  cursoId: string | null;
  linea: number;
}

export interface Persona {
  nombre: string;
  parrafos: string[];
  linea: number;
}

export interface Temario {
  titulo: string;
  frase: { destacado: string; resto: string };
  totales: { cursos: number; lecciones: number; nota: string; linea: number } | null;
  /** «Todo se trabaja primero con un caso práctico…», partido en oraciones. */
  intro: string[];
  mirada: { titulo: string; nota: string | null; filas: FilaMirada[] };
  alTerminar: { titulo: string; items: string[] };
  /** Los cursos con `##` propio. Los bonos van aparte. */
  cursos: Curso[];
  bonos: { titulo: string; orden: number; intro: string[]; cursos: Curso[] } | null;
  recibes: { titulo: string; items: { titulo: string; texto: string; id: string }[] };
  imparten: { titulo: string; personas: Persona[] };
  preguntas: { titulo: string; items: { pregunta: string; respuesta: string }[] };
  /** Lo que el parser no supo leer. El chequeo lo reporta y falla. */
  problemas: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilidades de texto
// ─────────────────────────────────────────────────────────────────────────────

/** Minúsculas, sin acentos y con un solo espacio: para comparar, nunca para pintar. */
export function norm(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function slug(s: string): string {
  return norm(s)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** `**Negritas** resto` → { destacado, resto }. El resto sin la raya inicial. */
function partirNegritas(texto: string): { destacado: string; resto: string } | null {
  const m = texto.match(/^\*\*(.+?)\*\*\s*(.*)$/);
  if (!m) return null;
  return {
    destacado: m[1].trim(),
    resto: m[2].replace(/^[—–-]\s*/, "").trim(),
  };
}

/** Abreviaturas que terminan en punto sin terminar la oración. */
const ABREVIATURAS = /\b(?:Ing|Lic|Dr|Dra|Sr|Sra|Mtro|Mtra|Arq|Prof)\.$/;

/** Parte un párrafo en oraciones, sin cortar en «Ing.» ni en «Lic.». */
export function oraciones(parrafo: string): string[] {
  const trozos = parrafo.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/);
  const out: string[] = [];
  for (const t of trozos) {
    if (out.length && ABREVIATURAS.test(out[out.length - 1])) {
      out[out.length - 1] += " " + t;
    } else {
      out.push(t);
    }
  }
  return out.map((o) => o.trim()).filter(Boolean);
}

/** «1 lección», «17 lecciones». */
export function lecciones(n: number): string {
  return n === 1 ? "1 lección" : `${n} lecciones`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Ids estables
// ─────────────────────────────────────────────────────────────────────────────

/**
 * El id de cada curso sale de una PALABRA CLAVE de su nombre, no del nombre
 * entero. Jorge manda enlaces directos (`/temario#bootcamp-h2`) por WhatsApp,
 * y un nombre cambia: «IA de 0 a 100» se llamaba «Claude de 0 a 100» hasta el
 * 16 oct 2026. Con el nombre entero, ese cambio de copy habría roto todos los
 * enlaces que ya andaban circulando. Con la palabra clave, el id sobrevive.
 *
 * Un curso que no esté aquí recibe el slug de su nombre: funciona, pero su id
 * cambia si cambia el nombre. Si entra un curso nuevo, agrégalo.
 */
const IDS_CURSO: [RegExp, string][] = [
  [/masterclass/, "masterclass"],
  [/bootcamp/, "bootcamp"],
  [/0 a 100/, "ia"],
  [/analisis de datos/, "datos"],
  [/reporte/, "reporte"],
  [/herramienta/, "herramienta"],
];

export function idCurso(nombre: string): string {
  const n = norm(nombre);
  for (const [re, id] of IDS_CURSO) if (re.test(n)) return id;
  return slug(nombre);
}

/**
 * Cómo se llama el curso en los chips del índice. Microcopy de
 * interfaz: el nombre completo vive en el encabezado de cada curso.
 */
const CORTOS: Record<string, string> = {
  masterclass: "Masterclass",
  bootcamp: "Bootcamp",
  datos: "Análisis de datos",
};

export function nombreCorto(c: Curso): string {
  return CORTOS[c.id] ?? c.nombre;
}

/** «H.2» → «h2» (como pide el brief: `#bootcamp-h2`); «1.3» → «1-3»; «4.10» → «4-10». */
function idCodigo(codigo: string): string {
  return /^[a-z]\./i.test(codigo)
    ? codigo.replace(".", "").toLowerCase()
    : codigo.replace(/\./g, "-");
}

export function idLeccion(cursoId: string, codigo: string): string {
  return `${cursoId}-${idCodigo(codigo)}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Del Markdown a bloques
// ─────────────────────────────────────────────────────────────────────────────

interface Item {
  texto: string;
  linea: number;
  ordenada: boolean;
  hijos: Item[];
}

type Bloque =
  | { tipo: "titulo"; nivel: number; texto: string; linea: number }
  | { tipo: "parrafo"; texto: string; linea: number }
  | { tipo: "lista"; items: Item[]; linea: number }
  | { tipo: "tabla"; filas: string[][]; linea: number };

function aBloques(md: string): Bloque[] {
  // Los comentarios HTML se van, pero dejando sus saltos de línea: así los
  // números de línea de los mensajes siguen apuntando al archivo real.
  const limpio = md
    .replace(/\r\n?/g, "\n")
    .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ""));

  const out: Bloque[] = [];
  let parrafo: Extract<Bloque, { tipo: "parrafo" }> | null = null;
  let lista: Extract<Bloque, { tipo: "lista" }> | null = null;
  let tabla: Extract<Bloque, { tipo: "tabla" }> | null = null;

  const lineas = limpio.split("\n");
  for (let i = 0; i < lineas.length; i++) {
    const n = i + 1;
    const cruda = lineas[i];
    const linea = cruda.replace(/\s+$/, "");

    if (!linea.trim()) {
      parrafo = null;
      lista = null;
      tabla = null;
      continue;
    }

    const h = linea.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      parrafo = lista = tabla = null;
      out.push({ tipo: "titulo", nivel: h[1].length, texto: h[2].trim(), linea: n });
      continue;
    }

    if (/^\s*\|/.test(linea)) {
      parrafo = lista = null;
      if (/^\s*\|?\s*:?-{3,}/.test(linea)) continue; // el renglón de guiones
      const celdas = linea
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim());
      if (!tabla) {
        tabla = { tipo: "tabla", filas: [], linea: n };
        out.push(tabla);
      }
      tabla.filas.push(celdas);
      continue;
    }

    const li = linea.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/);
    if (li) {
      parrafo = tabla = null;
      const sangria = li[1].replace(/\t/g, "    ").length;
      const item: Item = {
        texto: li[3].trim(),
        linea: n,
        ordenada: /\d/.test(li[2]),
        hijos: [],
      };
      if (sangria >= 2 && lista && lista.items.length) {
        lista.items[lista.items.length - 1].hijos.push(item);
      } else {
        if (!lista) {
          lista = { tipo: "lista", items: [], linea: n };
          out.push(lista);
        }
        lista.items.push(item);
      }
      continue;
    }

    // Renglón sangrado debajo de un elemento de lista: es su continuación.
    if (lista && /^\s+/.test(cruda) && lista.items.length) {
      const ultimo = lista.items[lista.items.length - 1];
      const destino = ultimo.hijos.length ? ultimo.hijos[ultimo.hijos.length - 1] : ultimo;
      destino.texto += " " + linea.trim();
      continue;
    }

    lista = tabla = null;
    if (!parrafo) {
      parrafo = { tipo: "parrafo", texto: linea.trim(), linea: n };
      out.push(parrafo);
    } else {
      parrafo.texto += " " + linea.trim();
    }
  }
  return out;
}

/** Los bloques de antes del primer título de ese nivel (todos, si no hay ninguno). */
function hastaElPrimero(bloques: Bloque[], nivel: number): Bloque[] {
  const i = bloques.findIndex((b) => b.tipo === "titulo" && b.nivel === nivel);
  return i < 0 ? bloques : bloques.slice(0, i);
}

/** Parte los bloques en secciones por un nivel de título. */
function seccionesPor(
  bloques: Bloque[],
  nivel: number,
): { titulo: string; linea: number; bloques: Bloque[] }[] {
  const out: { titulo: string; linea: number; bloques: Bloque[] }[] = [];
  for (const b of bloques) {
    if (b.tipo === "titulo" && b.nivel === nivel) {
      out.push({ titulo: b.texto, linea: b.linea, bloques: [] });
    } else if (out.length) {
      out[out.length - 1].bloques.push(b);
    }
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────────
// Lecciones, grupos y cursos
// ─────────────────────────────────────────────────────────────────────────────

function leerLeccion(item: Item, cursoId: string, problemas: string[]): Leccion | null {
  const p = partirNegritas(item.texto);
  if (!p) {
    problemas.push(
      `Línea ${item.linea}: esta lección no viene como «- **Código Título** — descripción».`,
    );
    return null;
  }
  const m = p.destacado.match(/^((?:[A-Za-zÁÉÍÓÚ]\.)?\d+(?:\.\d+)*)\.?\s+(.+)$/);
  if (!m) {
    problemas.push(
      `Línea ${item.linea}: «${p.destacado}» no empieza con su código (H.2, 1.3…).`,
    );
    return null;
  }

  let teLlevas: string | null = null;
  for (const h of item.hijos) {
    const t = h.texto.match(/^te llevas:\s*(.*)$/i);
    if (t) teLlevas = t[1].trim();
    else
      problemas.push(
        `Línea ${h.linea}: debajo de la lección ${m[1]} sólo se espera «Te llevas: …».`,
      );
  }

  return {
    codigo: m[1],
    titulo: m[2].trim(),
    descripcion: p.resto,
    teLlevas,
    id: idLeccion(cursoId, m[1]),
    linea: item.linea,
  };
}

function numero(re: RegExp, texto: string): number | null {
  const m = texto.match(re);
  return m ? Number(m[1]) : null;
}

/** Un `## N. Nombre` (o un `###` dentro de Bonos) hecho curso. */
function leerCurso(
  titulo: string,
  linea: number,
  bloques: Bloque[],
  orden: number,
  esBono: boolean,
  problemas: string[],
): Curso {
  const partes = titulo.split(/\s+·\s+/);
  const nombre = partes[0].trim();
  const id = idCurso(nombre);

  const c: Curso = {
    id,
    orden,
    nombre,
    subtitulo: partes.length > 1 ? partes.slice(1).join(" · ") : null,
    esBono,
    destacado: "",
    entrada: "",
    comoTrabajas: null,
    antesDeEmpezar: null,
    alTerminar: null,
    notas: [],
    declaradas: { lecciones: null, modulos: null, niveles: null },
    lecciones: [],
    grupos: [],
    fases: null,
    teResuelve: null,
    salesCon: null,
    linea,
  };

  const grupos = seccionesPor(bloques, 3);

  for (const b of hastaElPrimero(bloques, 3)) {
    if (b.tipo === "parrafo") {
      const p = partirNegritas(b.texto);
      const etiqueta = p ? norm(p.destacado) : "";
      if (p && etiqueta.startsWith("como trabajas")) c.comoTrabajas = p.resto;
      else if (p && etiqueta.startsWith("antes de empezar")) c.antesDeEmpezar = p.resto;
      else if (p && etiqueta.startsWith("al terminar")) c.alTerminar = p.resto;
      else if (p && !c.destacado) {
        c.destacado = p.destacado;
        c.entrada = p.resto;
        c.declaradas = {
          lecciones: numero(/(\d+)\s+lecci/i, p.destacado),
          modulos: numero(/(\d+)\s+m[oó]dulos/i, p.destacado),
          niveles: numero(/(\d+)\s+niveles/i, p.destacado),
        };
      } else c.notas.push(b.texto);
    } else if (b.tipo === "lista") {
      for (const it of b.items) {
        const l = leerLeccion(it, id, problemas);
        if (l) c.lecciones.push(l);
      }
    } else if (b.tipo === "tabla") {
      problemas.push(`Línea ${b.linea}: una tabla suelta en «${nombre}», fuera de un «###».`);
    }
  }

  for (const g of grupos) {
    const tabla = g.bloques.find((b) => b.tipo === "tabla");
    const tieneLista = g.bloques.some((b) => b.tipo === "lista");

    // Un `###` que sólo trae tabla es «Las 5 fases» del Bootcamp.
    if (tabla && tabla.tipo === "tabla" && !tieneLista) {
      c.fases = { titulo: g.titulo, filas: leerFases(tabla.filas) };
      continue;
    }

    const [etiqueta, ...resto] = g.titulo.split(/\s+·\s+/);
    const grupo: Grupo = {
      titulo: g.titulo,
      etiqueta: etiqueta.trim(),
      nombre: resto.length ? resto.join(" · ").trim() : null,
      descripcion: null,
      lecciones: [],
      id: `${id}-${slug(etiqueta)}`,
      linea: g.linea,
    };
    for (const b of g.bloques) {
      if (b.tipo === "parrafo" && !grupo.descripcion) grupo.descripcion = b.texto;
      else if (b.tipo === "parrafo")
        problemas.push(`Línea ${b.linea}: un segundo párrafo suelto en «${g.titulo}».`);
      else if (b.tipo === "lista")
        for (const it of b.items) {
          const l = leerLeccion(it, id, problemas);
          if (l) grupo.lecciones.push(l);
        }
    }
    c.grupos.push(grupo);
  }

  // Cada fase sabe a qué `###` lleva: la letra contra la etiqueta, o el nombre
  // («Cierre») contra la etiqueta.
  if (c.fases) {
    for (const f of c.fases.filas) {
      const g = c.grupos.find(
        (x) => (f.letra && x.etiqueta === f.letra) || norm(x.etiqueta) === norm(f.nombre),
      );
      f.grupoId = g ? g.id : null;
    }
  }

  if (!c.destacado)
    problemas.push(
      `Línea ${linea}: «${nombre}» no abre con su párrafo en negritas («**N lecciones…**»).`,
    );
  return c;
}

function leerFases(filas: string[][]): Fase[] {
  return filas.slice(1).map((celdas) => {
    const [fase = "", queHaces = "", conQueSales = ""] = celdas;
    const m = fase.match(/^([A-Z])\s+·\s+(.+)$/);
    return {
      letra: m ? m[1] : null,
      nombre: m ? m[2].trim() : fase.trim(),
      queHaces,
      conQueSales,
      grupoId: null,
    };
  });
}

export function contarLecciones(c: Curso): number {
  return c.lecciones.length + c.grupos.reduce((s, g) => s + g.lecciones.length, 0);
}

// ─────────────────────────────────────────────────────────────────────────────
// El temario completo
// ─────────────────────────────────────────────────────────────────────────────

export function leerTemario(md: string): Temario {
  const problemas: string[] = [];
  const bloques = aBloques(md);

  const t: Temario = {
    titulo: "",
    frase: { destacado: "", resto: "" },
    totales: null,
    intro: [],
    mirada: { titulo: "", nota: null, filas: [] },
    alTerminar: { titulo: "", items: [] },
    cursos: [],
    bonos: null,
    recibes: { titulo: "", items: [] },
    imparten: { titulo: "", personas: [] },
    preguntas: { titulo: "", items: [] },
    problemas,
  };

  // ── Lo de antes del primer `##`: título, frase, totales e introducción.
  for (const b of hastaElPrimero(bloques, 2)) {
    if (b.tipo === "titulo" && b.nivel === 1) t.titulo = b.texto;
    if (b.tipo !== "parrafo") continue;
    // El renglón de fecha y autor («Oct 16, 2026 · @Jorge») se ignora.
    if (/@\w/.test(b.texto) || /^[A-Za-z]{3,9}\.? \d{1,2}, \d{4}/.test(b.texto)) continue;
    const p = partirNegritas(b.texto);
    const totales = p?.destacado.match(/(\d+)\s+cursos\s*·\s*(\d+)\s+lecciones/i);
    if (p && totales)
      t.totales = {
        cursos: Number(totales[1]),
        lecciones: Number(totales[2]),
        nota: p.resto,
        linea: b.linea,
      };
    else if (p && !t.frase.destacado) t.frase = p;
    else t.intro.push(...oraciones(b.texto));
  }
  if (!t.totales)
    problemas.push("El encabezado no trae «**N cursos · N lecciones.**».");
  if (!t.frase.destacado)
    problemas.push("El encabezado no trae la frase de entrada en negritas.");

  // ── Las secciones `##`.
  let orden = 0;
  for (const s of seccionesPor(bloques, 2)) {
    const n = norm(s.titulo);
    const numerado = s.titulo.match(/^\d+\.\s+(.+)$/);

    if (n.startsWith("el programa en una mirada")) {
      t.mirada.titulo = s.titulo;
      for (const b of s.bloques) {
        if (b.tipo === "parrafo") t.mirada.nota = b.texto;
        if (b.tipo === "tabla") t.mirada.filas = leerMirada(b.filas, b.linea, problemas);
      }
    } else if (n.startsWith("al terminar")) {
      t.alTerminar.titulo = s.titulo;
      for (const b of s.bloques)
        if (b.tipo === "lista") t.alTerminar.items.push(...b.items.map((i) => i.texto));
    } else if (QUE_NO_SE_PINTAN.some((x) => n.startsWith(x))) {
      // Viene en el doc, pero la página no la pinta. Ver QUE_NO_SE_PINTAN.
    } else if (numerado && norm(numerado[1]).startsWith("bonos")) {
      orden += 1;
      const intro: string[] = [];
      const cursos: Curso[] = [];
      for (const b of hastaElPrimero(s.bloques, 3)) if (b.tipo === "parrafo") intro.push(b.texto);
      for (const sub of seccionesPor(s.bloques, 3))
        cursos.push(leerCurso(sub.titulo, sub.linea, sub.bloques, orden, true, problemas));
      t.bonos = { titulo: numerado[1].trim(), orden, intro, cursos };
    } else if (numerado) {
      orden += 1;
      t.cursos.push(leerCurso(numerado[1], s.linea, s.bloques, orden, false, problemas));
    } else if (n.startsWith("lo que recibes")) {
      t.recibes.titulo = s.titulo;
      for (const b of s.bloques) {
        if (b.tipo !== "lista") continue;
        for (const it of b.items) {
          const p = partirNegritas(it.texto);
          if (p) t.recibes.items.push({ titulo: p.destacado, texto: p.resto, id: `recibes-${slug(p.destacado)}` });
          else problemas.push(`Línea ${it.linea}: lo que recibes va como «- **Nombre** — texto».`);
        }
      }
    } else if (n.startsWith("quien lo imparte")) {
      t.imparten.titulo = s.titulo;
      for (const b of s.bloques) {
        if (b.tipo !== "parrafo") continue;
        const p = partirNegritas(b.texto);
        if (p) t.imparten.personas.push({ nombre: p.destacado, parrafos: [p.resto], linea: b.linea });
        else if (t.imparten.personas.length)
          t.imparten.personas[t.imparten.personas.length - 1].parrafos.push(b.texto);
        else problemas.push(`Línea ${b.linea}: un párrafo de «Quién lo imparte» antes del primer nombre.`);
      }
    } else if (n.startsWith("preguntas")) {
      t.preguntas.titulo = s.titulo;
      for (const b of s.bloques) {
        if (b.tipo !== "parrafo") continue;
        const p = partirNegritas(b.texto);
        if (p) t.preguntas.items.push({ pregunta: p.destacado, respuesta: p.resto });
        else problemas.push(`Línea ${b.linea}: una respuesta sin su pregunta en negritas.`);
      }
    } else {
      problemas.push(
        `Línea ${s.linea}: la sección «${s.titulo}» no la sabe pintar la página. ` +
          `Si es nueva, hay que agregarla a src/lib/temario.ts y a src/pages/temario.astro.`,
      );
    }
  }

  // ── Cruce: cada fila de la tabla con su curso. De ahí sale la pregunta de
  // «Te resuelve» que encabeza cada curso.
  const todos = todosLosCursos(t);
  for (const f of t.mirada.filas) {
    const curso = todos.find(
      (c) => norm(c.nombre).startsWith(norm(f.nombre)) || norm(f.nombre).startsWith(norm(c.nombre)),
    );
    if (curso) {
      f.cursoId = curso.id;
      curso.teResuelve = f.teResuelve;
      curso.salesCon = f.salesCon;
    }
  }

  return t;
}

function leerMirada(filas: string[][], linea: number, problemas: string[]): FilaMirada[] {
  const [cabeza, ...resto] = filas;
  const col = (nombre: string) => (cabeza ?? []).findIndex((c) => norm(c).startsWith(nombre));
  const iCurso = col("curso");
  const iResuelve = col("te resuelve");
  const iSales = col("sales con");
  const iLecciones = col("lecciones");
  if ([iCurso, iResuelve, iSales, iLecciones].some((i) => i < 0)) {
    problemas.push(
      `Línea ${linea}: la tabla «El programa en una mirada» debe traer las columnas ` +
        `Curso · Te resuelve · Sales con · Lecciones.`,
    );
    return [];
  }
  return resto.map((celdas, i) => {
    const curso = celdas[iCurso] ?? "";
    const lecciones = celdas[iLecciones] ?? "";
    const n = lecciones.match(/^(\d+)\b/);
    return {
      curso,
      nombre: curso.replace(/^bono\s*·\s*/i, "").trim(),
      teResuelve: celdas[iResuelve] ?? "",
      salesCon: celdas[iSales] ?? "",
      lecciones,
      cuenta: n ? Number(n[1]) : null,
      esBono: /^bono\b/i.test(curso),
      cursoId: null,
      // +1 por la cabeza: el renglón de guiones no cuenta como línea de datos
      // pero sí como línea del archivo.
      linea: linea + i + 2,
    };
  });
}

export function todosLosCursos(t: Temario): Curso[] {
  return [...t.cursos, ...(t.bonos ? t.bonos.cursos : [])];
}

/** De quién es cada tarjeta de «Quién lo imparte». La foto y los datos viven en personas.ts. */
export function quienEs(nombre: string): "papa" | "hijo" | null {
  const n = norm(nombre);
  if (/herrera|\bing\.|\(papa\)/.test(n)) return "papa";
  if (/^jorge sierra( guerra)?$|\(hijo\)/.test(n)) return "hijo";
  return null;
}

/**
 * La descripción para buscadores y para la tarjeta de redes: la frase de
 * entrada del temario, completa si cabe en 160 caracteres.
 */
export function descripcion(t: Temario): string {
  const completa = t.frase.resto || t.frase.destacado;
  if (completa.length <= 160) return completa;
  const corte = completa.slice(0, 159);
  return corte.slice(0, corte.lastIndexOf(" ")) + "…";
}

// ─────────────────────────────────────────────────────────────────────────────
// El chequeo
// ─────────────────────────────────────────────────────────────────────────────

export interface Regla {
  nombre: string;
  /** Qué se revisó, en una línea, cuando sale bien. */
  resumen: string;
  fallas: string[];
}

/**
 * Costos: el sitio no publica ninguno (Jorge, 16 oct 2026) — ni del programa,
 * ni de herramientas, planes o licencias. «Precio, volumen o mezcla» y
 * «compara precios contra un catálogo» son temas de análisis, no costos, y por
 * eso «precio» no está en la lista. «de pago» va con frontera para no cazar
 * «productos de pagos».
 */
const COSTOS: [RegExp, string][] = [
  [/\$/, "$"],
  [/\bUSD\b/, "USD"],
  [/\bMXN\b/, "MXN"],
  [/\bgratis\b/i, "gratis"],
  [/\bde pago(?![a-záéíóúñ])/i, "de pago"],
  [/cu[aá]nto(?:s)? pag/i, "cuánto pag…"],
  [/\bcostos?\b/i, "costo"],
  [/\blicencias?\b/i, "licencia"],
];

const RESIDUOS: [RegExp, string][] = [
  [/\*\*\*\*/, "****"],
  [/&#\d+;/, "una entidad HTML (&#32;, &#91;…)"],
];

export function revisar(t: Temario, md: string): Regla[] {
  const reglas: Regla[] = [];
  const cursos = todosLosCursos(t);
  const lineas = md
    .replace(/\r\n?/g, "\n")
    .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ""))
    .split("\n");

  // 1 · Lo que el parser no supo leer.
  reglas.push({
    nombre: "El archivo se lee completo",
    resumen: `${t.cursos.length} cursos con sección, ${t.bonos?.cursos.length ?? 0} bonos, ${t.mirada.filas.length} filas en la tabla`,
    fallas: [...t.problemas],
  });

  // 2 · Cada curso trae las lecciones que declara.
  {
    const fallas: string[] = [];
    for (const c of cursos) {
      const contadas = contarLecciones(c);
      if (c.declaradas.modulos !== null && c.grupos.length === 0) {
        // La Masterclass lista sus módulos, no sus lecciones: se cuentan módulos.
        if (contadas !== c.declaradas.modulos)
          fallas.push(
            `Línea ${c.linea}: «${c.nombre}» declara ${c.declaradas.modulos} módulos y lista ${contadas}.`,
          );
      } else if (c.declaradas.lecciones === null) {
        fallas.push(`Línea ${c.linea}: «${c.nombre}» no dice cuántas lecciones trae («**N lecciones…**»).`);
      } else if (contadas !== c.declaradas.lecciones) {
        fallas.push(
          `Línea ${c.linea}: «${c.nombre}» declara ${lecciones(c.declaradas.lecciones)} y lista ${contadas}.`,
        );
      }
      if (c.declaradas.niveles !== null && c.grupos.length !== c.declaradas.niveles)
        fallas.push(
          `Línea ${c.linea}: «${c.nombre}» declara ${c.declaradas.niveles} niveles y trae ${c.grupos.length}.`,
        );
    }
    reglas.push({
      nombre: "Cada curso trae lo que declara",
      resumen: cursos
        .map((c) => `${c.id} ${contarLecciones(c)}${c.grupos.length === 0 && c.declaradas.modulos !== null ? " módulos" : ""}`)
        .join(" · "),
      fallas,
    });
  }

  // 3 · La tabla contra las secciones.
  {
    const fallas: string[] = [];
    for (const f of t.mirada.filas) {
      const c = cursos.find((x) => x.id === f.cursoId);
      if (f.cuenta === null)
        fallas.push(`Línea ${f.linea}: «${f.curso}» dice «${f.lecciones}» lecciones y no sé contarlo.`);
      if (c && c.declaradas.lecciones !== null && f.cuenta !== c.declaradas.lecciones)
        fallas.push(
          `Línea ${f.linea}: la tabla le da ${f.lecciones} a «${f.curso}» y su sección declara ${c.declaradas.lecciones} (línea ${c.linea}).`,
        );
    }
    for (const c of cursos)
      if (!t.mirada.filas.some((f) => f.cursoId === c.id))
        fallas.push(`Línea ${c.linea}: «${c.nombre}» tiene sección pero no renglón en la tabla.`);
    reglas.push({
      nombre: "La tabla coincide con cada curso",
      resumen: `${t.mirada.filas.length} filas, cada curso con su renglón`,
      fallas,
    });
  }

  // 4 · La suma contra el encabezado.
  {
    const fallas: string[] = [];
    const suma = t.mirada.filas.reduce((s, f) => s + (f.cuenta ?? 0), 0);
    if (t.totales) {
      if (t.mirada.filas.length !== t.totales.cursos)
        fallas.push(
          `Línea ${t.totales.linea}: el encabezado dice ${t.totales.cursos} cursos y la tabla trae ${t.mirada.filas.length}.`,
        );
      if (suma !== t.totales.lecciones)
        fallas.push(
          `Línea ${t.totales.linea}: el encabezado dice ${t.totales.lecciones} lecciones y la tabla suma ${suma}.`,
        );
    }
    reglas.push({
      nombre: "La suma coincide con el encabezado",
      resumen: t.totales ? `${t.totales.cursos} cursos · ${t.totales.lecciones} lecciones` : "sin encabezado",
      fallas: t.totales ? fallas : ["El encabezado no trae «**N cursos · N lecciones.**»."],
    });
  }

  // 5 · Toda lección, módulo o nivel que se menciona existe.
  {
    const fallas: string[] = [];
    const codigos = new Set(cursos.flatMap((c) => [...c.lecciones, ...c.grupos.flatMap((g) => g.lecciones)]).map((l) => l.codigo));
    const prefijos = new Set([...codigos].map((c) => c.match(/^([A-Z])\./)?.[1]).filter(Boolean));
    const niveles = new Set(
      cursos.flatMap((c) => c.grupos.map((g) => norm(g.etiqueta).match(/^nivel (\d+)$/)?.[1])).filter(Boolean),
    );
    const modulos = new Set<string>();
    for (const c of cursos) {
      for (const g of c.grupos) {
        const m = norm(g.etiqueta).match(/^modulo (\d+)$/);
        if (m) modulos.add(m[1]);
      }
      if (c.declaradas.modulos !== null && c.grupos.length === 0)
        for (const l of c.lecciones) modulos.add(l.codigo);
    }
    let menciones = 0;
    lineas.forEach((cruda, i) => {
      if (/^\s*#/.test(cruda)) return; // los títulos definen, no mencionan
      // La negrita de una lección es su definición, no una mención.
      const texto = cruda.replace(/^\s*[-*+]\s+\*\*[^*]+\*\*/, "");
      const vistas = new Set<string>();
      for (const m of texto.matchAll(/lecci[oó]n(?:es)? ((?:[A-Z]\.)?\d+(?:\.\d+)?)/gi)) vistas.add(m[1]);
      for (const m of texto.matchAll(/\b([A-Z])\.(\d+)\b/g)) if (prefijos.has(m[1])) vistas.add(`${m[1]}.${m[2]}`);
      for (const codigo of vistas) {
        menciones += 1;
        if (!codigos.has(codigo)) fallas.push(`Línea ${i + 1}: menciona la lección ${codigo}, que no existe.`);
      }
      for (const m of texto.matchAll(/\bnivel(?:es)? (\d+)(?: (y|a) (\d+))?/gi)) {
        const desde = Number(m[1]);
        const hasta = m[3] ? Number(m[3]) : desde;
        const lista = m[2] === "a" ? Array.from({ length: hasta - desde + 1 }, (_, k) => desde + k) : [desde, hasta];
        for (const nv of lista) {
          menciones += 1;
          if (!niveles.has(String(nv))) fallas.push(`Línea ${i + 1}: menciona el nivel ${nv}, que ningún curso trae.`);
        }
      }
      for (const m of texto.matchAll(/\bm[oó]dulos? (\d+)\b/gi)) {
        menciones += 1;
        if (!modulos.has(m[1])) fallas.push(`Línea ${i + 1}: menciona el módulo ${m[1]}, que ningún curso trae.`);
      }
    });
    reglas.push({
      nombre: "Lo que se menciona existe",
      resumen: `${menciones} menciones a lecciones, niveles y módulos`,
      fallas,
    });
  }

  // 6 · Residuos de la exportación.
  {
    const fallas: string[] = [];
    lineas.forEach((l, i) => {
      for (const [re, que] of RESIDUOS) if (re.test(l)) fallas.push(`Línea ${i + 1}: quedó ${que}.`);
    });
    reglas.push({ nombre: "Sin residuos de la exportación", resumen: "ni ****, ni &#32;, ni &#91;", fallas });
  }

  // 7 · Ningún costo.
  {
    const fallas: string[] = [];
    const revisarTexto = (texto: string, donde: string) => {
      for (const [re, que] of COSTOS) if (re.test(texto)) fallas.push(`${donde}: dice «${que}».`);
    };
    lineas.forEach((l, i) => revisarTexto(l, `Línea ${i + 1}`));
    revisarTexto(descripcion(t), "La descripción para buscadores");
    reglas.push({
      nombre: "Ningún costo",
      resumen: "ni $, USD o MXN, ni gratis, de pago, cuánto pagar, costo o licencia",
      fallas,
    });
  }

  // 8 · Ids únicos: si dos anclas se llaman igual, un enlace lleva al lugar equivocado.
  {
    const fallas: string[] = [];
    const ids = [
      ...cursos.map((c) => c.id),
      ...cursos.flatMap((c) => c.grupos.map((g) => g.id)),
      ...cursos.flatMap((c) => [...c.lecciones, ...c.grupos.flatMap((g) => g.lecciones)].map((l) => l.id)),
      ...t.recibes.items.map((r) => r.id),
      ...SECCIONES,
    ];
    const vistos = new Set<string>();
    for (const id of ids) {
      if (vistos.has(id)) fallas.push(`El ancla #${id} sale dos veces.`);
      vistos.add(id);
    }
    reglas.push({ nombre: "Cada ancla es única", resumen: `${ids.length} anclas`, fallas });
  }

  // 9 · Cada persona tiene su tarjeta.
  {
    const fallas: string[] = [];
    const vistos = new Set<string>();
    for (const p of t.imparten.personas) {
      const quien = quienEs(p.nombre);
      if (!quien)
        fallas.push(
          `Línea ${p.linea}: no sé de quién es la tarjeta «${p.nombre}». Su foto y sus datos viven en src/data/personas.ts (MAESTROS).`,
        );
      else if (vistos.has(quien)) fallas.push(`Línea ${p.linea}: «${p.nombre}» sale dos veces.`);
      else vistos.add(quien);
    }
    reglas.push({
      nombre: "Quién lo imparte",
      resumen: `${t.imparten.personas.length} personas, cada una con su tarjeta`,
      fallas,
    });
  }

  // 10 · La descripción para buscadores y redes.
  {
    const d = descripcion(t);
    reglas.push({
      nombre: "Descripción para buscadores",
      resumen: `${d.length} caracteres`,
      fallas: d.length > 160 ? [`La descripción mide ${d.length} caracteres; el máximo es 160.`] : [],
    });
  }

  return reglas;
}

/** Las anclas fijas de la página. `npm run temario` verifica que ningún curso las pise. */
export const SECCIONES = ["indice", "bonos", "al-terminar", "recibes", "imparten", "preguntas"];

/**
 * Secciones que vienen en el doc maestro y que la página NO pinta, a propósito
 * (Jorge, 16 oct 2026: «me quiero ir directamente al temario»). Se reconocen y
 * se saltan; sin esta lista el parser las tomaría por secciones nuevas y
 * detendría el build. «El programa en una mirada» también se quitó de la
 * página, pero se sigue LEYENDO: su tabla da los totales que se revisan y la
 * pregunta de «Te resuelve» de cada curso.
 */
const QUE_NO_SE_PINTAN = ["como se trabaja", "para quien"];
