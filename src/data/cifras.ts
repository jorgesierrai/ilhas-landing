/**
 * Las tres cifras de respaldo. Copy de Jorge, va literal — ni el texto ni el
 * orden se tocan.
 *
 * Vive aquí y no dentro de una página porque la usan DOS: el home §05 «Esto ya
 * está corriendo» y /soluciones §03 «Esto ya lo construimos para empresas como
 * la tuya». Copiarlas en cada una es exactamente cómo se acaba con dos
 * verdades: se corrige una y la otra se queda mintiendo tres meses.
 *
 * REGLA 4 DE CLAUDE.md: los números se atribuyen, NUNCA se suman. El `contexto`
 * de cada una dice de qué es el número, y por eso no es opcional.
 *
 * Hasta el 31 ago 2026 vivían en el hero del home, chiquitas, porque ahí
 * competían con el titular. Bajaron a donde están las tarjetas —que es donde
 * está la prueba de lo que las causa— y ahí sí pueden mandar.
 */
export interface Cifra {
  dato: string;
  /**
   * Va en violeta y DENTRO del mismo <span> que el dato, no como hermano: así
   * no se separa del número al envolver. Mismo patrón que `Stat.astro`.
   */
  unidad?: string;
  contexto: string;
}

export const CIFRAS: Cifra[] = [
  { dato: "+1,000", unidad: " MDP", contexto: "al mes, volumen respaldado" },
  { dato: "6", unidad: "+", contexto: "startups · infraestructura creada" },
  { dato: "2016", unidad: "→", contexto: "desarrollando IA" },
];
