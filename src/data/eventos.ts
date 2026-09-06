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
 * SON CUATRO. NO SE AGREGAN MÁS SIN UNA RAZÓN
 * ─────────────────────────────────────────────────────────────────────────────
 * Cada evento que agregas es un evento que se puede romper, y la analítica rota
 * es peor que la ausente: te hace tomar decisiones con números que no
 * significan lo que crees. Estos cuatro se eligieron porque el sitio tiene dos
 * conversiones y una bifurcación; el resto es ruido.
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
      "La conversión del carril «aprender»: clic a eventos.ilhas.ai. Son tres " +
      "enlaces — el hero de /finanzas, su cierre, y el pie del sitio. El de " +
      "/finanzas ya lleva UTMs, así que HighLevel sabe de dónde vino; el evento " +
      "sirve para verlo de ESTE lado, junto con el resto del embudo.",
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
      "el webinar se muda de eventos.ilhas.ai. NO se rompe si cambia el texto " +
      "del botón, o si se agrega un tercero.",
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
];
