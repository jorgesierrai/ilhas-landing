/**
 * Los hitos de la línea de tiempo — `medios/BRIEF-historial.md` §1.
 *
 * Fuente: `medios/timeline-preview.html`, portado a datos.
 * **Para agregar un año se edita este archivo, nunca el HTML del componente.**
 *
 * Dos carriles, que son las dos pruebas que Ilhas tiene y que el sitio contaba
 * a medias:
 *   fundamento  → "estos entienden la IA desde antes de que fuera negocio"
 *   construcción → "estos saben construir cosas que funcionan"
 *
 * REGLA DE EXACTITUD (§ del brief): cada hito se describe **con el vocabulario
 * de su año**. El trabajo de 2016 no se llama "agentes de IA" — se llamaba
 * investigación de algoritmos. Una línea que suena retrofiteada mata el
 * argumento entero.
 *
 * REGLA DE TONO: el sitio nunca dice "no somos hype" ni "no somos humo". Las
 * fechas hacen ese trabajo solas.
 */

export type Carril = "fundamento" | "construccion";

export interface Hito {
  /** Como se muestra: "2014", "nov 2017", "ene 2018". */
  anio: string;
  carril: Carril;
  titulo: string;
  detalle?: string;
  /** La marca bajo la que ocurrió, cuando se puede nombrar. */
  marca?: string;
  /**
   * Ranura de `src/data/medios.ts` con el video o la foto que prueba el hito.
   * Hoy NO se renderiza en la línea: los tres activos viven en la § Autoridad
   * de /nosotros y saldrían duplicados en la misma página (decisión de Jorge,
   * 24 ago 2026). El dato se queda porque marca cuáles son los hitos con
   * prueba —que la línea destaca con nodo brillante— y porque el día que se
   * quieran ahí es encender `conPrueba` en el componente.
   */
  pruebaId?: string;
  /** El hito más reciente: cierra la línea con nodo blanco. */
  hoy?: boolean;
}

export const HISTORIAL: Hito[] = [
  {
    anio: "2014",
    carril: "fundamento",
    titulo: "Especialidad en optimización y algoritmos ML",
  },
  {
    anio: "2016",
    carril: "fundamento",
    titulo: "Investigación y desarrollo de algoritmos",
    detalle: "Organización de recursos y estimaciones.",
    marca: "Coophi",
  },
  {
    anio: "2017",
    carril: "fundamento",
    titulo: "Procesamiento de lenguaje natural",
    marca: "Coophi",
  },
  {
    anio: "nov 2017",
    carril: "fundamento",
    titulo: "Lo cuenta en un escenario",
    detalle: "Presenta Coophi y hacia dónde ve que va la IA.",
    pruebaId: "nosotros-conferencia-clip",
  },
  {
    anio: "ene 2018",
    carril: "fundamento",
    titulo: "Lo cuenta en radio nacional",
    detalle:
      "Imagen Radio · RMX. La nota se titula «¿Buscas un asistente virtual?, conoce a Coophi».",
    pruebaId: "nosotros-radio-2018",
  },
  {
    anio: "abr 2018",
    carril: "fundamento",
    titulo: "Talent Land",
    detalle: "Sala llena, hablando de cómo se construye IA.",
    pruebaId: "nosotros-conferencia",
  },
  {
    anio: "2018",
    carril: "construccion",
    titulo: "Cálculo de nómina, pago y conciliación contable",
    detalle:
      "Calcula nóminas de cientos o miles de empleados, timbra y concilia los pagos contablemente.",
    marca: "Nomada",
  },
  {
    anio: "2020",
    carril: "construccion",
    titulo: "Cuentas por cobrar y por pagar",
    detalle:
      "Automatización de pagos con cheque y tarjeta corporativa para gastos corporativos.",
    marca: "Paystand",
  },
  {
    anio: "2022",
    carril: "construccion",
    titulo: "Conciliación bancaria automática",
    detalle:
      "SAT/CFDI contra movimientos. Eliminó dos a tres días de trabajo manual por cierre.",
    marca: "Stampay",
  },
  {
    anio: "2023",
    carril: "fundamento",
    titulo: "ChatGPT 3 para contenido y product marketing",
  },
  {
    anio: "2025",
    carril: "construccion",
    titulo: "Herramienta de comunicación para avisos específicos",
    detalle:
      "Push y WhatsApp: borradores de mensajes, y tú decides el medio y la respuesta que esperas.",
    marca: "Cometa",
  },
  {
    anio: "2026",
    carril: "construccion",
    titulo: "Clasificación de pagos internacionales con agentes",
    detalle:
      "Mide la tasa de aprobación real y detecta en qué paso se atoran los cobros.",
  },
  {
    anio: "2026",
    carril: "construccion",
    titulo: "Cobranza automática con reglas",
    detalle:
      "Diagnostica por qué falló el cargo; el agente decide cuándo reintentar, a qué cuenta y con qué método.",
  },
  {
    anio: "2026",
    carril: "fundamento",
    titulo: "Ilhas",
    detalle: "El método, destilado y apuntado al trabajo de otros.",
    hoy: true,
  },
];
