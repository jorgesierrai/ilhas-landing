/**
 * El mapa de la empresa — la clasificación de Jorge (26 ago 2026).
 *
 * Toda empresa son las mismas trece áreas en tres capas. El método I·L·H·A·S
 * no cambia de capa a capa; lo que cambia es a dónde se apunta. Ese es el
 * argumento que sostiene por qué Ilhas es un método y no un curso de finanzas.
 *
 * Vive aquí y no dentro de `MapaEmpresa.astro` porque cuatro lugares del sitio
 * pintan estos mismos rótulos —/metodo, /soluciones, /finanzas y la versión
 * mini del home— y duplicarlos es la forma más segura de que se desincronicen.
 *
 * Fuente: `prompts/iteracion-5-bifurcacion-mapa.md` §2. El contenido es de
 * Jorge y va literal.
 *
 * **Chips revisados el 27 ago 2026** (`prompts/iteracion-10-productos.md`).
 * Cometa dejó de ser una herramienta de consultas financieras: es de
 * comunicación con clientes, así que su chip se movió de Finanzas corporativas
 * a Cobranza, donde ahora conviven dos builds. Paystand subió a Finanzas
 * corporativas.
 *
 * **Administración quedó SIN prueba, y está bien.** Paystand era la única que
 * la cubría y se movió; no hay otro build ahí. Una ficha vacía dice la verdad
 * — inventarle una prueba con tal de no dejar hueco sería justo lo contrario
 * de para qué existe la variante "prueba".
 */

export interface AreaMapa {
  id: string;
  nombre: string;
  /**
   * Los builds de Ilhas en esa área. Se muestran en la variante "prueba".
   *
   * Es el crédito, no la descripción del área: "cotizador · Morgan" dice qué
   * se construyó y para quién. Un área puede tener más de uno —Cobranza tiene
   * dos— y eso es señal, no ruido: significa que Ilhas construyó ahí más de
   * una vez.
   *
   * Todos van en el formato «qué · para quién». Antes había tres sueltos
   * ("Cometa", "Stampay", "Paystand") que no decían qué se construyó, y con
   * dos chips apilados en Cobranza un "Cometa" solo se leería como si fuera el
   * cliente de la cobranza automática, que es falso.
   *
   * Cuando el cliente va bajo NDA se nombra solo la clase de problema
   * ("cobranza automática"), que es experiencia de Jorge y no información del
   * cliente. Es el mismo criterio de src/data/medios.ts y productos.ts.
   */
  pruebas?: string[];
}

export interface CapaMapa {
  id: "externa" | "motor" | "base";
  nombre: string;
  que: string;
  /**
   * Tres áreas de ejemplo, en minúscula, para la versión mini del home.
   *
   * No se derivan de `areas` porque no son las tres primeras: son las tres que
   * un visitante reconoce de inmediato ("producción, suministro, entrega"), y
   * esa elección es editorial. Vive junto al resto de la capa para que un
   * cambio de rótulo se haga en un solo lugar (iteración 5 §1: «es la misma
   * idea en chico, no otro componente»).
   */
  resumen: string;
  areas: AreaMapa[];
}

export const CAPAS: CapaMapa[] = [
  {
    id: "externa",
    nombre: "Cadena de ingresos",
    que: "Lo que el cliente ve",
    resumen: "marketing, ventas, cobranza",
    areas: [
      { id: "marketing", nombre: "Marketing" },
      { id: "ventas", nombre: "Ventas y cierre", pruebas: ["cotizador · Morgan"] },
      { id: "posventa", nombre: "Posventa y soporte" },
      {
        id: "cobranza",
        nombre: "Cobranza",
        // Dos builds. El PRIMERO va bajo NDA: sin nombre de producto ni de
        // cliente, se describe por la clase de problema, que es experiencia de
        // Jorge y no información del cliente — el mismo criterio que en
        // src/data/medios.ts y en src/data/productos.ts. No lo nombres.
        pruebas: ["cobranza automática", "avisos a clientes · Cometa"],
      },
    ],
  },
  {
    id: "motor",
    nombre: "Motor de valor",
    que: "Donde se construye lo que se vendió",
    resumen: "producción, suministro, entrega",
    areas: [
      { id: "ingenieria", nombre: "Ingeniería y desarrollo" },
      { id: "suministro", nombre: "Cadena de suministro" },
      {
        id: "produccion",
        nombre: "Producción y manufactura",
        pruebas: ["despiece · Extrusión de Aleaciones"],
      },
      { id: "entrega", nombre: "Ejecución y entrega" },
    ],
  },
  {
    id: "base",
    nombre: "Cimiento",
    que: "Lo que sostiene a las otras dos",
    resumen: "finanzas, contabilidad, administración",
    areas: [
      {
        id: "finanzas",
        nombre: "Finanzas corporativas",
        pruebas: ["cuentas por cobrar y por pagar · Paystand"],
      },
      {
        id: "contabilidad",
        nombre: "Contabilidad e impuestos",
        pruebas: ["conciliación bancaria · Stampay"],
      },
      // SIN prueba a propósito: Paystand se movió a Finanzas corporativas y no
      // hay otro build que cubra esta área. Vacía es correcto.
      { id: "administracion", nombre: "Administración" },
      { id: "talento", nombre: "Talento humano", pruebas: ["nómina y timbrado · Nomada"] },
      { id: "tecnologia", nombre: "Tecnología" },
    ],
  },
];
