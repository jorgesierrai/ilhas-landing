/**
 * Las seis tarjetas de construcción — home §05 Linaje y /soluciones §03 Casos.
 *
 * Fuente: `medios/BRIEF-historial.md` §2. **Los textos son andamio de Jorge**,
 * no copy final.
 *
 * Se titulan por **lo que resuelven**, no por el nombre del producto: "Stampay"
 * no le dice nada a un visitante, "Conciliación bancaria automática" le dice
 * todo. La marca y el año van como línea secundaria.
 *
 * Los dos de 2026 van sin marca, solo con el año. El brief los traía como
 * "bajo NDA", pero Jorge confirmó el 24 ago 2026 que **tiene los derechos**;
 * quedan titulados por función igual que los otros cuatro, que es lo que pide
 * §2 del brief, no por una restricción legal.
 *
 * Vive aquí y no en cada página porque las dos publican exactamente la misma
 * tabla: duplicarla es la forma más segura de que se desincronicen.
 */

export interface Producto {
  /** Lo que resuelve. Es el titular de la tarjeta. */
  titulo: string;
  /** Qué hizo, en concreto. Opcional: no todos lo necesitan. */
  detalle?: string;
  /** Línea secundaria: marca y año. Solo el año cuando hay NDA. */
  marca: string;
  /** Ranura de la captura, en src/data/medios.ts. */
  capturaId: string;
  /**
   * Desde dónde recortar la captura al 16/10 de la tarjeta. Las seis fuentes
   * van de 0.46 a 2.24 de proporción, así que sin normalizar la reja queda
   * rasgada (Trabajo 2, punto 1 de prompts/iteracion-2-activar.md).
   * Por defecto ancla arriba, que es donde vive lo que se lee de una UI.
   */
  recorte?: string;
}

export const PRODUCTOS: Producto[] = [
  {
    titulo: "Conciliación bancaria automática",
    detalle:
      "SAT/CFDI contra movimientos. Eliminó dos a tres días de trabajo manual por cierre",
    marca: "Stampay · 2022",
    capturaId: "producto-stampay",
  },
  {
    titulo: "Cobranza automática con reglas",
    detalle:
      "Diagnostica por qué falló el cargo; el agente decide cuándo reintentar, a qué cuenta y con qué método",
    marca: "2026",
    capturaId: "producto-cobranza",
  },
  {
    titulo: "Consultas en lenguaje natural sobre la base financiera",
    detalle: "«¿Cuánto entró hoy?» → respuesta al instante",
    marca: "Cometa · 2025",
    capturaId: "producto-cometa",
    // 1320x2868, la más vertical de las seis. El recorte 16/10 salta la
    // barra de estado del teléfono y cae en el bloque de pagos, que es la
    // parte que se lee como producto.
    recorte: "50% 26%",
  },
  {
    titulo: "HRIS y nómina desde cero",
    marca: "Nomada · 2018",
    capturaId: "producto-nomada",
  },
  {
    titulo: "AR/AP en pagos B2B",
    detalle: "Smart Lockbox y Spend Card: dos productos de cero a uno",
    marca: "Paystand · 2020",
    capturaId: "producto-paystand",
  },
  {
    titulo: "Clasificación de pagos internacionales con agentes",
    detalle:
      "Mide la tasa de aprobación real y detecta en qué paso se atoran los cobros",
    marca: "2026",
    capturaId: "producto-pagos-intl",
  },
];
