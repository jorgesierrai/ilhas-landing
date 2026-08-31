/**
 * Manifiesto de medios — la lista de todas las ranuras del sitio.
 *
 * Fuente de verdad: `medios/CHECKLIST.md` (qué archivo, qué peso, qué carpeta)
 * y `PLAN-MEDIOS.md` Parte 1 (qué objeción mata cada activo) + Parte 2 (dónde va).
 *
 * Cómo se llega a 41 ranuras desde las 36 casillas de material del checklist:
 * un clip es UNA ranura aunque sean tres archivos (`.mp4` + `.jpg` + `.es.vtt`),
 * y las tres líneas de íconos traen 13 casillas en línea. 40 ranuras salen de
 * las casillas; la 41 es `metodo-timeline`, que el checklist lista aparte en
 * "ya existen en el repo" porque su archivo fuente ya estaba aquí.
 *
 * REGLA DEL NOMBRE: el `id` es el nombre del archivo sin extensión.
 * Minúsculas, guiones medios, sin acentos, sin guiones bajos.
 */

export type TipoMedio = "loop" | "clip" | "captura" | "foto" | "icono";
export type Pagina =
  | "home"
  | "metodo"
  | "soluciones"
  | "finanzas"
  | "nosotros"
  | "compartido";

export interface Atribucion {
  nombre: string;
  rol: string;
  empresa?: string;
}

export interface SlotMedio {
  /** = nombre del archivo sin extensión. Minúsculas, guiones medios, sin acentos. */
  id: string;
  tipo: TipoMedio;
  pagina: Pagina;
  /** Etiqueta legible de la sección, p. ej. "§07 No son prompts" */
  seccion: string;
  prioridad: 1 | 2 | 3;
  /** La objeción que mata, tomada de PLAN-MEDIOS.md. Documenta por qué existe la ranura. */
  objecion: string;
  /** alt real. Cadena vacía SOLO si el medio es puramente decorativo. */
  alt: string;
  caption?: string;
  duracion?: string;
  /** Máximo en KB. Lo usa scripts/medios-check.mjs. */
  pesoMaxKB: number;
  notas?: string;
  /** Obligatorio cuando tipo === "clip" y la sección es de testimonios. */
  atribucion?: Atribucion;
  /** Alternativa al video en un testimonio: cita en texto. */
  texto?: string;
  /**
   * `true` cuando la ranura tiene archivo pero NINGUNA página la usa a
   * propósito. Sin esto `npm run medios` la reporta como ⚠, que es justo lo
   * que queremos: el archivo está, se ve verde, y no sale en el sitio.
   * Ponlo solo con la razón escrita en `notas`.
   */
  sinUsar?: boolean;
  /**
   * `true` cuando el video trae los subtítulos **quemados en la imagen**.
   *
   * El `.es.vtt` se queda igual —hace falta para accesibilidad y para que el
   * texto sea indexable—, pero el `<track>` deja de llevar `default`: si se
   * autoenciende, el navegador pinta su capa encima de la que ya está en el
   * pixel y se leen dobles. El visitante puede prenderlo desde los controles.
   *
   * Es una propiedad del ARCHIVO, no de la página, y por eso vive aquí y no
   * dentro de VideoClip.astro: si mañana llega otro clip con subtítulos
   * quemados, se le pone la bandera y ya.
   */
  subtitulosQuemados?: boolean;
}

/**
 * Los `alt` y `caption` de aquí son BORRADOR (restricción 5 del brief de la
 * iteración 1: el copy lo escribe Jorge). Describen lo que se espera ver para
 * que la ranura sea usable el día que llegue el archivo — no son copy final.
 */
export const MEDIOS: SlotMedio[] = [
  // ===================================================================
  // PRIORIDAD 1 — ya existe el material, solo hay que exportarlo
  // ===================================================================

  // --- Capturas de producto (B/H) · se usan DOS veces: home §05 y /soluciones §03
  {
    id: "producto-stampay",
    tipo: "captura",
    pagina: "compartido",
    seccion: "home §05 Linaje · /soluciones §03 Casos",
    prioridad: 1,
    objecion: "«¿Y tú qué has construido?» · «¿Tienes track record real?»",
    alt: "Pantalla de conciliación bancaria automática",
    caption: "Conciliación bancaria automática",
    pesoMaxKB: 400,
    notas:
      "1600 px de ancho, ratio 16:10. Tapa nombres de clientes, RFC y montos reales antes de exportar.",
  },
  {
    id: "producto-cobranza",
    tipo: "captura",
    pagina: "compartido",
    seccion: "home §05 Linaje · /soluciones §03 Casos",
    prioridad: 1,
    objecion: "«¿Y tú qué has construido?» · «¿Tienes track record real?»",
    alt: "Tablero de cobranza automática con la razón por la que falló cada cargo",
    caption: "Cobranza automática con reglas · 2026",
    pesoMaxKB: 400,
    notas:
      "Renombrada desde su id anterior: la etiqueta vieja no correspondía a lo que muestra la captura. Jorge tiene los derechos de la imagen (confirmado 24 ago 2026). El alt describe la pantalla por su función, igual que el título de la tarjeta.",
  },
  {
    id: "producto-cometa",
    tipo: "captura",
    pagina: "compartido",
    seccion: "home §05 Linaje · /soluciones §03 Casos",
    prioridad: 1,
    objecion: "«¿Y tú qué has construido?» · «¿Tienes track record real?»",
    alt: "Pantalla de avisos a clientes por notificación push y WhatsApp",
    caption: "Avisos a clientes",
    pesoMaxKB: 400,
    notas:
      "Datos dummy inventados por Jorge, no de un cliente (confirmado 24 ago 2026). Imagen REEMPLAZADA el 27 ago 2026: la anterior era la interfaz de consultas; la nueva muestra los avisos a clientes. Mismo nombre de archivo. Si la nueva no es ~16:10, hay que volver a calcular el `recorte` en productos.ts.",
  },
  {
    id: "producto-nomada",
    tipo: "captura",
    pagina: "compartido",
    seccion: "home §05 Linaje · /soluciones §03 Casos",
    prioridad: 1,
    objecion: "«¿Y tú qué has construido?» · «¿Tienes track record real?»",
    alt: "Pantalla de cálculo de nómina",
    caption: "Nómina y timbrado",
    pesoMaxKB: 400,
    notas: "1600 px de ancho, ratio 16:10.",
  },
  {
    id: "producto-paystand",
    tipo: "captura",
    pagina: "compartido",
    seccion: "home §05 Linaje · /soluciones §03 Casos",
    prioridad: 1,
    objecion: "«¿Y tú qué has construido?» · «¿Tienes track record real?»",
    alt: "Pantalla de cuentas por cobrar y por pagar",
    caption: "Cuentas por cobrar y por pagar",
    pesoMaxKB: 400,
    notas: "Smart Lockbox o Spend Card. 1600 px de ancho.",
  },
  {
    id: "producto-pagos-intl",
    tipo: "captura",
    pagina: "compartido",
    seccion: "home §05 Linaje · /soluciones §03 Casos",
    prioridad: 1,
    objecion: "«¿Y tú qué has construido?» · «¿Tienes track record real?»",
    alt: "Tablero de operaciones de pago con el estado de cada cobro internacional",
    caption: "Clasificación de pagos internacionales con agentes · 2026",
    pesoMaxKB: 400,
    notas:
      "Renombrada desde su id anterior: la etiqueta vieja no correspondía a lo que muestra la captura. Jorge tiene los derechos de la imagen (confirmado 24 ago 2026). El alt describe la pantalla por su función, igual que el título de la tarjeta.",
  },

  // --- La foto del hero del home (D) · aprobada 25 ago 2026
  {
    id: "home-hero-conferencia",
    tipo: "foto",
    pagina: "nosotros",
    seccion: "§ En público · segunda foto de Talent Land",
    prioridad: 1,
    objecion: "«¿Quién eres tú?» · «¿Esto es real o es una landing más?»",
    alt: "Jorge Sierra en el escenario de Talent Land, frente a una pantalla que pregunta «¿Quién sea puede crear inteligencia artificial?»",
    caption: "Talent Land · abril 2018",
    pesoMaxKB: 400,
    notas:
      "Recorte propio: NO es el mismo archivo que nosotros-conferencia. En el hero del home la foto se enmascara y sangra desde la derecha, así que el encuadre tiene que aguantar que el 26% izquierdo desaparezca. Es el LCP del home — nunca lazy. Rehecho el 25 ago desde nosotros-conferencia-detalle.jpg (extract 300,180,1300x1060) porque el recorte anterior cortaba la palabra «crear» de la pregunta; lleva linear(1,+28) para levantar sombras sin quemar la pantalla, que es la parte más clara. En /nosotros va al lado de nosotros-conferencia (la sala llena): ésa prueba la escala, ésta prueba de qué hablaba — se lee la pregunta en pantalla. Ahí el caption va apagado, porque el pie es compartido por las dos. Desde el 31 ago 2026 ya NO es el hero del home —ahí va home-hero-loop— y vuelve a ser exclusiva de /nosotros. El recorte se conserva TAL CUAL: en /nosotros es la foto que prueba de qué hablaba (se lee la pregunta en pantalla) al lado de nosotros-conferencia, que prueba la escala. Lo del enmascarado y el 26% izquierdo ya no aplica.",
  },

  // --- El sistema de agentes (A) · el bloque más importante de la lista
  {
    id: "metodo-prompts-01",
    tipo: "captura",
    pagina: "metodo",
    seccion: "§07 No son prompts",
    prioridad: 1,
    objecion: "«Esto es teoría» · «Es puro prompt copiado»",
    alt: "Estructura de carpetas de Claude con agentes, skills y comandos",
    caption: "La estructura: agentes, skills y comandos",
    pesoMaxKB: 400,
    notas:
      "Súbele el tamaño de fuente ANTES de capturar. Recorta al bloque que importa, no a la ventana entera.",
  },
  {
    id: "metodo-prompts-02",
    tipo: "captura",
    pagina: "metodo",
    seccion: "§07 No son prompts",
    prioridad: 1,
    objecion: "«Esto es teoría» · «Es puro prompt copiado»",
    alt: "Flujo de trabajo completo de un agente, de entrada a salida",
    caption: "El flujo completo, de entrada a salida",
    pesoMaxKB: 400,
    notas: "Súbele el tamaño de fuente antes de capturar.",
  },
  {
    id: "metodo-prompts-03",
    tipo: "captura",
    pagina: "metodo",
    seccion: "§07 No son prompts",
    prioridad: 1,
    objecion: "«Esto es teoría» · «Es puro prompt copiado»",
    alt: "Terminal con una herramienta del agente ejecutándose",
    caption: "La herramienta corriendo",
    pesoMaxKB: 400,
    notas: "Marco 'terminal'. Súbele el tamaño de fuente antes de capturar.",
  },
  {
    id: "metodo-prompts-04",
    tipo: "captura",
    pagina: "metodo",
    seccion: "§07 No son prompts",
    prioridad: 1,
    objecion: "«Esto es teoría» · «Es puro prompt copiado»",
    alt: "Reporte generado automáticamente por el sistema de agentes",
    caption: "El resultado que salió solo",
    pesoMaxKB: 400,
    notas: "1600 px de ancho.",
  },

  // --- La entrevista de radio 2018 (E) · el activo más fuerte del inventario
  {
    id: "nosotros-radio-2018",
    tipo: "clip",
    pagina: "nosotros",
    seccion: "§ Autoridad",
    prioridad: 1,
    objecion: "«Llegaste con la ola» ← la objeción más cara",
    alt: "Entrevista en Radio Imagen, 2018, hablando de inteligencia artificial",
    caption: "Radio Imagen · 2018",
    duracion: "45-60 s",
    pesoMaxKB: 8192,
    notas:
      "Elige el tramo donde hablas de hacia dónde va la IA, no donde te presentan. El año va en el diseño, no quemado en el video. 1280 px de ancho.",
  },

  // ===================================================================
  // PRIORIDAD 2 — hay que grabar, cortar o pedir permiso
  // ===================================================================

  // --- Los dos testimonios (I) · sección nueva en /soluciones
  {
    id: "soluciones-testimonio-oncologia",
    tipo: "clip",
    pagina: "soluciones",
    seccion: "§ Testimonios",
    prioridad: 2,
    objecion: "«¿Le funcionó a alguien más?»",
    alt: "Testimonio en video sobre el cotizador construido para una empresa de oncología",
    duracion: "60-90 s",
    pesoMaxKB: 12288,
    notas:
      "Atribución tomada de lo que ella misma dice en cámara (segundo 0-5). Nombre de empresa confirmado por Jorge el 24 ago 2026.",
    atribucion: {
      nombre: "Irlanda Morgan",
      rol: "Directora de operaciones",
      empresa: "Morgan Centro de Alta Especialidad",
    },
  },
  {
    id: "soluciones-testimonio-despiece",
    tipo: "clip",
    pagina: "soluciones",
    seccion: "§ Testimonios",
    prioridad: 2,
    objecion: "«¿Le funcionó a alguien más?»",
    alt: "Testimonio en video sobre los agentes de despiece, optimización y cotización",
    duracion: "60-90 s",
    pesoMaxKB: 12288,
    notas:
      "Atribución dada y verificada por Jorge (24 ago 2026).",
    atribucion: {
      nombre: "Jesús Flores",
      rol: "Gerente de Operaciones",
      empresa: "Extrusión de Aleaciones",
    },
  },

  // --- Tu historia (G) · sección nueva en /nosotros
  {
    id: "nosotros-historia-01",
    tipo: "clip",
    pagina: "nosotros",
    seccion: "§ La historia",
    prioridad: 2,
    objecion: "«¿Por qué padre e hijo?» · «¿Por qué finanzas?»",
    alt: "Jorge Sierra contando cómo tomó el camino de la tecnología y el producto",
    caption: "Quién eres",
    duracion: "60-90 s",
    pesoMaxKB: 12288,
    notas: "Corte del podcast: «Yo tomé otro camino: 12 años construyendo tecnología y productos».",
  },
  {
    id: "nosotros-historia-02",
    tipo: "clip",
    pagina: "nosotros",
    seccion: "§ La historia",
    prioridad: 2,
    objecion: "«¿Por qué padre e hijo?» · «¿Por qué finanzas?»",
    alt: "Jorge Sierra contando que arrancó una empresa de inteligencia artificial en 2016",
    caption: "El ancla de años",
    duracion: "60-90 s",
    pesoMaxKB: 12288,
    notas: "Corte del podcast: «En 2016 arranqué una empresa de inteligencia artificial».",
  },
  {
    id: "nosotros-historia-03",
    tipo: "clip",
    pagina: "nosotros",
    seccion: "§ La historia",
    prioridad: 2,
    objecion: "«¿Por qué padre e hijo?» · «¿Por qué finanzas?»",
    alt: "Jorge Sierra contando cómo le propuso a su papá automatizar su conocimiento con IA",
    caption: "El origen de Ilhas",
    duracion: "60-90 s",
    pesoMaxKB: 12288,
    notas:
      "El más importante de los tres: es la razón de existir del negocio y hoy no está escrita en ninguna página.",
  },

  // --- Conferencia (D)
  {
    id: "nosotros-conferencia",
    tipo: "foto",
    pagina: "nosotros",
    seccion: "§ Autoridad",
    prioridad: 2,
    objecion: "«¿Quién eres tú para enseñar?»",
    alt: "Sala llena en la conferencia de Jorge Sierra sobre inteligencia artificial en Talent Land",
    caption: "Talent Land · abril 2018",
    pesoMaxKB: 500,
    notas:
      "2400 px de ancho. Es la que prueba escala: se ve el público, no solo el ponente. Va más grande que el clip — no inviertas ese orden de peso.",
  },
  {
    id: "nosotros-conferencia-clip",
    tipo: "clip",
    pagina: "nosotros",
    seccion: "§ Autoridad",
    prioridad: 2,
    objecion: "«¿Quién eres tú para enseñar?»",
    alt: "Jorge Sierra en el escenario presentando su empresa de inteligencia artificial",
    caption: "Escenario · noviembre 2017",
    duracion: "20.8 s",
    pesoMaxKB: 12288,
    notas:
      "RESUELTO POR JORGE EL 28 AGO 2026: es la conferencia de NOVIEMBRE 2017, no Talent Land. Los dos briefs del 24 ago se contradecían —BRIEF-historial lo daba como nov 2017 sin nombre de evento, el addendum de BRIEF-autoridad-radio como Talent Land— y por eso la ranura estuvo sin caption. Talent Land (abr 2018) son las FOTOS, no este clip: no vuelvas a etiquetarlo así. En /nosotros § En público el caption NO se pinta (mostrarPie={false}) porque la cabecera del momento ya dice «Noviembre 2017 · Escenario» y el pie sería un eco; vive aquí para que la ranura cargue su propia etiqueta si se usa en otro lado.",
  },

  // ===================================================================
  // PRIORIDAD 3 — cuando el resto esté arriba
  // ===================================================================

  // --- Loops mudos (A)
  {
    id: "home-hero-loop",
    tipo: "loop",
    pagina: "home",
    seccion: "§01 Hero",
    prioridad: 3,
    objecion: "«Esto es teoría» · «Es puro prompt copiado»",
    alt: "",
    duracion: "9.4 s",
    pesoMaxKB: 1536,
    notas:
      "CABLEADO el 31 ago 2026. Es el hero del home. Video de KINZAL, empresa de Jorge: los planos cargando, la solicitud, el generador armando la cotización, y el cierre en el bloque de ahorro ($211,772.77 · 6.14% vs base). 1280×604 · 9.4 s · sin audio · mp4 842 KB, SIN webm (con este contenido VP9 salía en 996 KB y peor de calidad: un formato más grande y más feo servido primero es peor que no tenerlo). NO LLEVA REDACCIÓN Y NO LA NECESITA: se revisó cuadro por cuadro y los campos de cliente del generador son texto placeholder, no valores capturados. Sustituyó a un corte del video de Morgan que sí exigía tres cajas de desenfoque — se descartó el 31 ago porque nombraba a la clínica en pantalla y enseñaba el total de un ciclo de quimioterapia. El póster es el ÚLTIMO cuadro, el del ahorro, no el primero: con prefers-reduced-motion es lo único que se ve. El cuadro va ENTERO —la caja lleva la relación de aspecto del video y object-fit contain—: recortarlo pierde los planos, que es la mitad de lo que la demo cuenta. Decorativo: aria-hidden.",
  },
  {
    id: "soluciones-hero-loop",
    tipo: "loop",
    pagina: "soluciones",
    seccion: "§01 Qué resolvemos",
    prioridad: 3,
    objecion: "«Esto es teoría» · «Es puro prompt copiado»",
    alt: "",
    duracion: "8-15 s",
    pesoMaxKB: 1536,
    notas: "El producto en movimiento. webm ≤ 800 KB · mp4 ≤ 1.5 MB · póster .jpg obligatorio.",
  },
  {
    id: "finanzas-plantilla",
    tipo: "captura",
    pagina: "finanzas",
    seccion: "§01 El dolor",
    prioridad: 1,
    objecion: "«¿Esto qué me va a dejar en concreto?»",
    alt: "Modelo financiero en hoja de cálculo con un panel de copiloto de IA que señala el margen EBITDA y alerta sobre el crecimiento de gastos",
    caption: "La plantilla maestra, con IA encima",
    pesoMaxKB: 150,
    notas:
      "ILUSTRACIÓN, no captura de un producto real: es una maqueta de lo que se arma en el programa, con cifras inventadas. Es la ÚNICA ranura del sitio que no retrata algo que exista — si algún día alguien la reemplaza pensando que es un screenshot, esta nota es la advertencia. Entregada por Jorge el 28 ago 2026. 1600x952 con transparencia, cuantizada a 200 colores (58 KB): la UI es plana y no se degrada. Reemplazó a finanzas-hero-loop, que era un reloj decorativo y no probaba nada.",
  },
  {
    id: "metodo-agentes-loop",
    tipo: "loop",
    pagina: "metodo",
    seccion: "§08 A dónde llegas",
    prioridad: 3,
    objecion: "«Esto es teoría» · «Es puro prompt copiado»",
    alt: "",
    duracion: "8-15 s",
    pesoMaxKB: 1536,
    notas:
      "Varios agentes trabajando en paralelo. La frase de la sección es abstracta hasta que se ve. webm ≤ 800 KB · mp4 ≤ 1.5 MB.",
  },

  // --- El paso joya en video (A)
  {
    id: "metodo-hilar-clip",
    tipo: "clip",
    pagina: "metodo",
    seccion: "§05 Hilar, el paso joya",
    prioridad: 3,
    objecion: "«Esto es teoría»",
    alt: "Jorge Sierra explicando el paso Hilar del método I·L·H·A·S",
    duracion: "60-90 s",
    pesoMaxKB: 12288,
    notas:
      "Es el punto de mayor densidad conceptual del sitio: merece cara y voz. Sale del podcast o se graba a propósito.",
  },

  // --- Edificación papá-hijo (J)
  {
    id: "finanzas-edificacion",
    tipo: "clip",
    pagina: "finanzas",
    seccion: "§04 Quién lo enseña",
    prioridad: 3,
    objecion: "«¿Los dos de verdad trabajan juntos?»",
    alt: "Jorge Sierra papá y Jorge Sierra hijo hablando de su trabajo en conjunto",
    duracion: "60-90 s",
    pesoMaxKB: 12288,
    subtitulosQuemados: true,
    notas:
      "IDENTIDAD, NO OFERTA: que no mencione temario, precio ni bonos. El VSL no va en el sitio (regla 1 de CLAUDE.md). El archivo trae los subtítulos quemados en la imagen, así que su <track> NO se autoenciende: se veían dobles. El .es.vtt se queda por accesibilidad e indexado.",
  },

  // --- Íconos de las ocho capacidades (F) · /finanzas §02
  ...(
    [
      ["estados", "Análisis de estados financieros con razones"],
      ["flujo", "Flujo de efectivo"],
      ["modelos", "Modelos y proyecciones"],
      ["presupuesto", "Presupuesto y control de gestión"],
      ["conciliaciones", "Conciliaciones"],
      ["dashboard", "Dashboard sin licencias caras"],
      ["valuacion", "Valuación, TIR y VAN"],
      ["reportes", "Reportes que se actualizan solos"],
    ] as const
  ).map(
    ([clave, capacidad]): SlotMedio => ({
      id: `icono-cap-${clave}`,
      tipo: "icono",
      pagina: "finanzas",
      seccion: "§02 Las ocho capacidades",
      prioridad: 3,
      objecion: "(no mata objeción — es sistema visual)",
      // Decorativo: la capacidad ya va como texto en el chip.
      alt: "",
      pesoMaxKB: 8,
      notas: `${capacidad}. SVG monocromo, stroke="currentColor", lienzo 24×24, sin fill fijo.`,
    }),
  ),

  // ===================================================================
  // Ranura 41 — su archivo fuente ya vivía en el repo
  // ===================================================================
  {
    id: "metodo-timeline",
    tipo: "captura",
    pagina: "metodo",
    seccion: "§04 I·L·H·A·S paso por paso",
    prioridad: 1,
    objecion: "«Esto es teoría»",
    alt: "Diagrama del proceso completo del método I·L·H·A·S, de Identificar a Sistematizar",
    caption: "El método completo, de principio a fin",
    pesoMaxKB: 400,
    sinUsar: true,
    notas:
      "SIN USAR a propósito: salió de /metodo §04 porque era furniture de video (medios/BRIEF-historial.md §1). La reemplazó la línea vertical de /nosotros. La ranura se queda por si vuelve.",
  },
];

// --- Helpers de consulta ---------------------------------------------------

/**
 * Ranuras de una página. OJO: no incluye las de `pagina: "compartido"`
 * (las capturas de producto y las del mercado laboral), que por diseño viven
 * en dos páginas a la vez. Pídelas por id con `porId`.
 */
export function porPagina(p: Pagina): SlotMedio[] {
  return MEDIOS.filter((m) => m.pagina === p);
}

export function porId(id: string): SlotMedio | undefined {
  return MEDIOS.find((m) => m.id === id);
}

export function porPrioridad(n: 1 | 2 | 3): SlotMedio[] {
  return MEDIOS.filter((m) => m.prioridad === n);
}
