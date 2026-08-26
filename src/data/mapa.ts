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
 */

export interface AreaMapa {
  id: string;
  nombre: string;
  /**
   * Sólo si Ilhas ya construyó ahí. Se muestra en la variante "prueba".
   *
   * Es el crédito, no la descripción del área: "cotizador · Morgan" dice qué
   * se construyó y para quién. Cobranza va deliberadamente SIN nombre de
   * producto ni de cliente — ver la nota de abajo.
   */
  prueba?: string;
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
      { id: "ventas", nombre: "Ventas y cierre", prueba: "cotizador · Morgan" },
      { id: "posventa", nombre: "Posventa y soporte" },
      // Sin nombre de producto ni de cliente: va bajo NDA. Se describe por la
      // clase de problema, que es experiencia de Jorge y no información del
      // cliente — el mismo criterio que en src/data/medios.ts y en
      // src/data/productos.ts. No la nombres.
      { id: "cobranza", nombre: "Cobranza", prueba: "cobranza automática" },
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
        prueba: "despiece · Extrusión de Aleaciones",
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
      { id: "finanzas", nombre: "Finanzas corporativas", prueba: "Cometa" },
      { id: "contabilidad", nombre: "Contabilidad e impuestos", prueba: "Stampay" },
      { id: "administracion", nombre: "Administración", prueba: "Paystand" },
      { id: "talento", nombre: "Talento humano", prueba: "Nomada" },
      { id: "tecnologia", nombre: "Tecnología" },
    ],
  },
];
