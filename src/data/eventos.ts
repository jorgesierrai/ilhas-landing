/**
 * Los eventos de medición del sitio. Registro único.
 *
 * Mismo patrón que `medios.ts`: el dato vive aquí, no suelto en las páginas, y
 * un script lo verifica contra el build. La diferencia con los medios es que un
 * medio que falta se ve; un evento que se rompió **no se ve** — la gráfica
 * simplemente se aplana y nadie se entera hasta tres meses después.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * EL PRINCIPIO: EL EVENTO NOMBRA LA INTENCIÓN, NO EL ELEMENTO
 * ─────────────────────────────────────────────────────────────────────────────
 * Por eso se cuelgan de un atributo `data-evento` en el marcado y NUNCA de un
 * selector CSS, de una clase, del texto del botón ni de su posición. Si mueves
 * el botón, le cambias el copy o lo pintas de otro color, el evento sigue
 * funcionando. Si lo enganchas a `.btn-primary`, se rompe el día que alguien
 * renombre la clase — y no te avisa nadie.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SON CINCO. NO SE AGREGAN MÁS SIN UNA RAZÓN
 * ─────────────────────────────────────────────────────────────────────────────
 * Cada evento que agregas es un evento que se puede romper, y la analítica rota
 * es peor que la ausente: te hace tomar decisiones con números que no
 * significan lo que crees. Estos cuatro se eligieron porque el sitio tiene dos
 * conversiones y una bifurcación; el resto es ruido.
 *
 * El quinto, `lista_espera_apuntarse`, entró el 6 sep 2026 y la razón queda
 * escrita aquí y no implícita, que es justo el punto de este registro: apareció
 * un paso del embudo que NO existía cuando se eligieron los cuatro. /webinar no
 * existía. Sin él, el embudo era home → /finanzas → [clic medido] → /webinar →
 * ciego, y el número más importante de esa página —cuántos de los que llegan sí
 * abren el formulario— no se podría contestar.
 *
 * Lo que se descartó a propósito, y no se vuelve a proponer:
 *   · profundidad de scroll — la página cambia de largo cada iteración, así que
 *     el 50% de hoy no es el del mes pasado y la serie histórica no dice nada;
 *   · vistas de sección — las secciones se renombran y se fusionan;
 *   · clic por tarjeta de producto — se renombraron dos veces en un mes;
 *   · reproducción del video del hero — es `autoplay`, dispara siempre;
 *   · clic en el menú — ya lo dice la vista de página de destino.
 *
 * ⚠️ GA4 TRAE «MEDICIÓN MEJORADA» PRENDIDA y ahí vienen el scroll al 90% y los
 * clics salientes. **El scroll hay que APAGARLO en la propiedad**, por lo de
 * arriba. Los clics salientes déjalos: no estorban.
 */

export interface Evento {
  /** El nombre que llega a GA4. Es también el valor de `data-evento`. */
  id: string;
  descripcion: string;
  /** En qué rutas del build debe aparecer. */
  paginas: string[];
  /** Cuántas veces, como mínimo, en total en el build. */
  minimo: number;
  /** El aviso, en español, para quien lea esto dentro de seis meses. */
  seRompeSi: string;
}

export const EVENTOS: Evento[] = [
  {
    id: "carril_elegir",
    descripcion:
      "Cuál de los dos carriles elige quien cae al home: aprender o implementar. " +
      "Es el evento más valioso del sitio, porque todo el home está construido " +
      "sobre esa bifurcación y hoy no hay forma de saber cómo se reparte. " +
      "Lleva un segundo atributo, `data-carril`, con «aprender» o «implementar».",
    paginas: ["/"],
    minimo: 2,
    seRompeSi:
      "los dos CTA del hero se vuelven uno solo, o desaparecen. NO se rompe si " +
      "cambia el copy, el color, el orden, el layout o el video.",
  },
  {
    id: "webinar_reservar",
    descripcion:
      "La conversión del carril «aprender»: el clic en «Reservar el webinar». " +
      "Son los dos botones de /finanzas y el del pie del sitio. " +
      "⚠️ DESDE EL 6 SEP 2026 ESE CLIC LLEVA A /webinar, la lista de espera, y " +
      "ya NO a eventos.ilhas.ai: el registro todavía no abre. El evento sigue " +
      "midiendo lo mismo —querer el webinar— y el destino final se distingue " +
      "con el parámetro `link_url` que `ga.js` ya manda. El día que el registro " +
      "abra, la constante `webinarUrl` de /finanzas vuelve a apuntar afuera y " +
      "este evento no se entera: mide la intención, no la dirección.",
    // ⚠️ EL PIE SALE EN LAS OCHO PÁGINAS que usan `Base.astro`, así que este
    // evento aparece 8 veces por el pie MÁS 2 en el cuerpo de /finanzas. La
    // propuesta hablaba de «tres enlaces» contando ubicaciones lógicas, no
    // apariciones en el build — y `npm run eventos` lo cazó a la primera.
    // `/jorgesierra` no cuenta: no lleva el pie del sitio.
    paginas: [
      "/",
      "/metodo",
      "/finanzas",
      "/soluciones",
      "/nosotros",
      "/terminos",
      "/privacidad",
      "/cookies",
    ],
    minimo: 10,
    seRompeSi:
      "desaparece alguno de los tres enlaces, o el pie deja de salir en las " +
      "ocho páginas. NO se rompe si cambia el texto del botón, si se agrega un " +
      "cuarto, ni si cambia el DESTINO — eso ya pasó una vez y el chequeo no " +
      "lo caza, porque cuenta apariciones y no direcciones. Si vuelves a mover " +
      "el destino, corrige esta ficha a mano.",
  },
  {
    id: "diagnostico_agendar",
    descripcion:
      "La conversión del carril «implementar»: los dos botones «Agendar un " +
      "diagnóstico» de /soluciones. Se separa de `contacto_correo` a propósito: " +
      "«quiero un diagnóstico» es una venta, «te escribo» es una pregunta. " +
      "Mezclarlos infla la conversión.",
    paginas: ["/soluciones"],
    minimo: 2,
    seRompeSi:
      "el diagnóstico pasa de mailto a formulario — y eso YA está en el " +
      "horizonte. NO se rompe si cambia el asunto del correo o el copy.",
  },
  {
    id: "contacto_correo",
    descripcion:
      "La intención suelta: los mailto a hola@ilhas.ai SIN asunto — el del pie " +
      "y los de las tres páginas legales. No es una venta, es una pregunta.",
    // Mismo caso que el anterior: 8 del pie, más 4 en el cuerpo de las legales
    // —uno en /terminos, uno en /cookies y dos en /privacidad—. El de
    // /privacidad con asunto «Limitar uso» queda FUERA a propósito: ése no es
    // una pregunta suelta, es el ejercicio de un derecho.
    paginas: [
      "/",
      "/metodo",
      "/finanzas",
      "/soluciones",
      "/nosotros",
      "/terminos",
      "/privacidad",
      "/cookies",
    ],
    minimo: 12,
    seRompeSi:
      "cambia hola@ilhas.ai. NO se rompe si se mueve de sección o se agrega en " +
      "otra página.",
  },
  {
    id: "lista_espera_apuntarse",
    descripcion:
      "El clic al formulario de Tally desde /webinar. Es el paso que hoy " +
      "falta en el embudo: `webinar_reservar` mide que alguien quiso el " +
      "webinar, éste mide que además dejó sus datos cuando se le dijo que " +
      "todavía no abre. La caída entre los dos es el costo real de la espera.",
    paginas: ["/webinar"],
    minimo: 1,
    seRompeSi:
      "el registro abre y /webinar deja de ser lista de espera para volverse " +
      "la página de registro. NO se rompe si cambia el copy del botón ni la " +
      "URL del formulario.",
  },
];
