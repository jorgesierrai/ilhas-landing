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
  /**
   * Línea secundaria: el año. **Sin nombre de empresa** (decisión de Jorge,
   * 28 ago 2026): decía "Stampay · 2022", "Cometa · 2025". La tarjeta prueba
   * qué se construyó y cuándo; de quién era el proyecto no cambia esa prueba.
   * Las seis quedan parejas — dos ya iban solo con el año.
   */
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
    marca: "2022",
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
    titulo: "Herramienta de comunicación para avisos específicos",
    detalle:
      "Por notificación push y WhatsApp. Crea borradores de mensajes y tú decides por qué medio mandarlos a tus clientes y qué tipo de respuesta tendrían",
    marca: "2025",
    capturaId: "producto-cometa",
    // TODO recorte · Jorge va a subir una imagen nueva CON EL MISMO NOMBRE de
    // archivo. El `recorte: "50% 26%"` que vivía aquí estaba calculado para la
    // captura vieja (1320x2868, un teléfono vertical) y para el contenido
    // viejo, así que se fue con ella. Cuando llegue la nueva: si no es más o
    // menos 16:10, hay que volver a medir un `recorte`. Mientras tanto ancla
    // arriba, que es el valor por defecto de TarjetaCaso.
  },
  {
    titulo: "Cálculo de nómina, pago y conciliación contable",
    detalle:
      "Calcula la nómina de bases de cientos o miles de empleados al mismo tiempo, timbra y concilia los pagos contablemente",
    marca: "2018",
    capturaId: "producto-nomada",
  },
  {
    titulo: "Cuentas por cobrar y por pagar",
    detalle:
      "Automatización de pagos con cheque y tarjeta corporativa para administración de gastos corporativos",
    marca: "2020",
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
