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
 * **El mapa se llenó el 28 ago 2026** (`prompts/iteracion-16-mapa-lleno.md`).
 * Antes marcaba 6 áreas de 13 y las otras siete iban vacías; ahora las trece
 * traen lo que se construye en ellas.
 *
 * **Sin niveles ni marcas desde el 30 ago 2026.** La versión del 28 distinguía
 * con punto lo que "ya estaba corriendo con un cliente" y dejaba el resto como
 * capacidad. Jorge lo corrigió: todo lo listado ya se ha implementado y
 * corrido con clientes, así que esa distinción era falsa. Los 38 renglones
 * valen lo mismo y la leyenda que los separaba se fue.
 *
 * Los chips ya no llevan nombre de empresa (28 ago 2026): el sitio prueba qué
 * se construyó, no de quién era el proyecto.
 */

export interface AreaMapa {
  id: string;
  nombre: string;
  /**
   * Lo que Ilhas construye en esta área. Todo lo listado ya se ha implementado
   * y corrido con clientes — no hay niveles ni marcas: los 38 renglones valen
   * lo mismo (Jorge, 30 ago 2026).
   *
   * Las seis "plataformas" que el sitio muestra como casos no son una
   * categoría aparte: una plataforma es un conjunto de varias de estas cosas.
   * Lo de aquí es el inventario de lo que se ha podido hacer.
   *
   * Se muestra COMPLETO solo en la variante "prueba" (/soluciones). Las otras
   * —"limpio" en /metodo y "cimiento" en /finanzas— siguen pintando nada más
   * el nombre del área: si las listas se colaran ahí, /metodo, que ya es la
   * página más alta del sitio, se volvería inmanejable.
   */
  construye?: string[];
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
      {
        id: "marketing",
        nombre: "Marketing",
        construye: [
          "Agentes de generación de contenido",
          "Automatización de CRM",
          "Creación de CRM",
        ],
      },
      {
        id: "ventas",
        nombre: "Ventas y cierre",
        construye: [
          "Cotizador",
          "Bots para llamadas de ventas",
        ],
      },
      {
        id: "posventa",
        nombre: "Posventa y soporte",
        construye: [
          "Reportes automatizados",
          "Agentes de WhatsApp de soporte",
          "Agentes de análisis de quejas",
        ],
      },
      {
        id: "cobranza",
        nombre: "Cobranza",
        construye: [
          "Cobranza automática",
          "Avisos a clientes",
          "Recordatorios por WhatsApp",
          "Recordatorios por push y correo",
          "Pagos B2B",
        ],
      },
    ],
  },
  {
    id: "motor",
    nombre: "Motor de valor",
    que: "Donde se construye lo que se vendió",
    resumen: "producción, suministro, entrega",
    areas: [
      {
        id: "ingenieria",
        nombre: "Ingeniería y desarrollo",
        construye: [
          "Programación agéntica",
          "Harness engineering",
          "Spec driven development",
          "Orquestador on call",
          "Bug bot",
        ],
      },
      {
        id: "suministro",
        nombre: "Cadena de suministro",
        // Uno solo, y así se queda. No se inventan ítems para rellenar.
        construye: ["Agente de optimización de rutas"],
      },
      {
        id: "produccion",
        nombre: "Producción y manufactura",
        construye: [
          "Despiece",
          "Planeación de la producción",
        ],
      },
      {
        id: "entrega",
        nombre: "Ejecución y entrega",
        construye: ["Agentes orquestadores que actualizan el ERP"],
      },
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
        construye: [
          "Cuentas por cobrar y por pagar",
          "Agentes financieros",
        ],
      },
      {
        id: "contabilidad",
        nombre: "Contabilidad e impuestos",
        construye: [
          "Conciliación bancaria",
          "Conciliación fiscal",
        ],
      },
      {
        id: "administracion",
        nombre: "Administración",
        construye: [
          "Infraestructura bancaria",
          "Infraestructura de pagos",
          "Automatización de reportes",
          "Agentes recomendadores de inversión",
          "Facturación electrónica",
        ],
      },
      {
        id: "talento",
        nombre: "Talento humano",
        construye: [
          "Suite de nómina y timbrado",
          "Agentes clasificadores de perfiles",
          "Analizadores de CV",
        ],
      },
      {
        id: "tecnologia",
        nombre: "Tecnología",
        construye: [
          "Algoritmos de machine learning",
          "Data science",
          "Bases de datos y data lakes",
          "Apps",
        ],
      },
    ],
  },
];
