/**
 * Los enlaces públicos de cada persona.
 *
 * Vive aquí y no en cada página porque tres —/finanzas §04, /nosotros §01 y
 * /temario— publican a las mismas dos personas (/finanzas y /temario leen
 * `MAESTROS`, al final de este archivo; /nosotros arma su propio `personas`).
 * Duplicar las URLs es la forma más segura de que se desincronicen.
 *
 * URLs LIMPIAS: Jorge las pasó como salieron del botón de compartir de cada
 * app, con parámetros de rastreo (`igsi`, `_t`, `utm_source=share_via`…). Esos
 * parámetros son atribución de una sesión concreta, caducan, y no cambian a
 * dónde llega el enlace. Se guardan sin ellos.
 */

import type { ImageMetadata } from "astro";
import fotoPapa from "../assets/equipo/jorge-papa.png";
import fotoHijo from "../assets/equipo/jorge-hijo.png";

export type Red = "instagram" | "tiktok" | "youtube" | "linkedin" | "sitio";

export interface Enlace {
  red: Red;
  url: string;
  /** Va al `aria-label`. Un ícono sin nombre no existe para un lector de pantalla. */
  etiqueta: string;
}

/**
 * El orden NO es alfabético ni casual: va de la red más personal a la más
 * profesional, y el sitio propio al final como destino. No lo "arregles".
 */
export const ENLACES: Record<"papa" | "hijo", Enlace[]> = {
  papa: [
    {
      red: "linkedin",
      // OJO: el slug lleva «è» con acento grave, tal como lo pasó Jorge. Va
      // percent-encoded para que no dependa de cómo cada navegador codifique
      // el UTF-8 de la barra de direcciones.
      url: "https://www.linkedin.com/in/jos%C3%A8-jorge-sierra-herrera-55270417",
      etiqueta: "LinkedIn de Jorge Sierra (papá)",
    },
  ],
  hijo: [
    {
      red: "instagram",
      url: "https://www.instagram.com/soyjorgesierra",
      etiqueta: "Instagram de Jorge Sierra: @soyjorgesierra",
    },
    {
      red: "tiktok",
      url: "https://www.tiktok.com/@jorgesierrai",
      etiqueta: "TikTok de Jorge Sierra: @jorgesierrai",
    },
    {
      // Entró el 16 oct 2026 (iteración 22). La misma URL vive también en
      // `jorgesierra.astro`, que arma sus filas aparte y NO lee de aquí: si
      // cambia el canal, son los dos lugares.
      red: "youtube",
      url: "https://www.youtube.com/@soyjorgesierra",
      etiqueta: "YouTube de Jorge Sierra: @soyjorgesierra",
    },
    {
      red: "linkedin",
      url: "https://www.linkedin.com/in/jorge-sierra-guerra-product-leader",
      etiqueta: "LinkedIn de Jorge Sierra",
    },
    {
      red: "sitio",
      url: "https://www.jorgesierra.io/",
      etiqueta: "Portafolio de Jorge Sierra: jorgesierra.io",
    },
  ],
};

/**
 * Las redes de la MARCA, no de una persona. Van en el pie.
 *
 * Viven en este archivo y no en `Footer.astro` por la misma razón que ENLACES:
 * el tipo `Enlace`, el `IconoSocial` que lo pinta y la regla de limpiar las URLs
 * ya están aquí. Un segundo archivo para un solo renglón partiría la convención
 * en dos.
 *
 * HOY SOLO HAY INSTAGRAM (Jorge, 30 ago 2026). No inventes las demás: si el pie
 * enseña un ícono de TikTok o de LinkedIn que lleva a una cuenta que no existe,
 * es exactamente el tipo de promesa vacía que el resto del pie evita —por eso no
 * tiene boletín ni sello de certificación—. Cuando Jorge abra otra, se agrega
 * aquí y el pie la pinta solo.
 */
export const REDES_ILHAS: Enlace[] = [
  {
    red: "instagram",
    // Jorge la pasó desde el botón de compartir, con `utm_source` e `igsi`
    // pegados. Se guardan sin ellos: son atribución de una sesión concreta,
    // caducan, y no cambian a dónde llega el enlace.
    url: "https://www.instagram.com/ilhas.ai",
    etiqueta: "Instagram de Ilhas: @ilhas.ai",
  },
];

/**
 * Reconocimientos. Van APARTE de las atribuciones: éstas son números
 * contables y aquélla no, y meterla como cuarto renglón de una lista de cifras
 * la haría leer como estadística.
 *
 * ⚠️ LA CLAIM DEL TEC VA EXACTAMENTE ASÍ. Jorge la dijo primero como «el mejor
 * instructor del Tec de Monterrey»; al preguntarle en qué se apoya, precisó
 * que es la evaluación de sus alumnos y que es en Finanzas. Lo que se publica
 * es esa versión, más angosta, porque es la que se sostiene — y encima es más
 * fuerte para /finanzas, que es justo lo que esa página vende.
 *
 * NO la re-expandas: nada de "el mejor instructor", "el número uno", ni
 * quitarle el "en Finanzas" o el "por sus alumnos". Ahí está la precisión.
 * Anotada en docs/04-voz-del-cliente.md con su procedencia.
 *
 * Vive aquí y no en cada página por lo mismo que ENLACES: es el mismo dato de
 * la misma persona en /finanzas §04 y en /nosotros §01.
 */
export interface Distincion {
  /** El reconocimiento. Va en negritas. */
  texto: string;
  /**
   * Dónde y en qué. Va debajo, más chico.
   *
   * OPCIONAL: no toda distinción nombra una institución. Cuando falta, el
   * componente NO pinta el <em> — si lo pintara vacío igual ocuparía su
   * margin-top y dejaría un renglón fantasma.
   */
  fuente?: string;
  /**
   * Qué marca la acompaña. Una roseta es un reconocimiento —alguien te lo
   * dio—; un birrete es un grado —tú lo estudiaste—. No son lo mismo y no
   * comparten glifo.
   */
  icono: "roseta" | "birrete";
}

export const DISTINCIONES: Record<"papa" | "hijo", Distincion | undefined> = {
  papa: {
    texto: "Mejor evaluado por sus alumnos",
    fuente: "Finanzas · Tec de Monterrey",
    icono: "roseta",
  },
  hijo: {
    // "Estudió" va porque así lo escribió Jorge. NO lo quites para que suene
    // más fuerte: si el grado no está titulado, quitarlo publica una
    // credencial que no es. Solo Jorge puede cambiar esa palabra.
    texto: "Estudió Maestría en Algoritmos de Optimización y Machine Learning",
    // SIN `fuente`: Jorge no dijo en qué institución. No la inventes ni la
    // deduzcas.
    icono: "birrete",
  },
};

/**
 * Las dos personas que enseñan, completas: lo que pinta `TarjetaPersona`.
 *
 * Vivían como `maestros` dentro de /finanzas. Se mudaron aquí en la iteración
 * 22 porque /temario publica las mismas dos tarjetas, y dos copias de las
 * mismas cifras son dos cifras que se desincronizan.
 *
 * /temario NO usa `nombre`, `trayectoria` ni el `rol` de Jorge tal cual: el
 * nombre y la trayectoria salen del propio temario, y el rol de Jorge ahí es
 * «CEO de Ilhas» (Jorge, 16 oct 2026). Todo lo demás —foto, atribuciones,
 * distinción y redes— es esto.
 *
 * Los números van ATRIBUIDOS a cada quien y nunca sumados entre los dos
 * (regla 4 de CLAUDE.md). El «40 + 12» junto es sólo de /finanzas, y lo arma
 * esa página, no este archivo.
 */
export interface Atribucion {
  dato: string;
  contexto: string;
}

export interface Maestro {
  nombre: string;
  rol: string;
  trayectoria: string;
  atribuciones: Atribucion[];
  distincion?: Distincion;
  foto: ImageMetadata;
  redes: Enlace[];
}

export const MAESTROS: Record<"papa" | "hijo", Maestro> = {
  papa: {
    nombre: "Jorge Sierra (papá)",
    rol: "Finanzas corporativas",
    trayectoria:
      "40 años de criterio financiero, asesorando empresas en América Latina.",
    atribuciones: [
      { dato: "40 años", contexto: "de criterio financiero" },
      { dato: "+200 empresas", contexto: "asesoradas en LATAM" },
      { dato: "+10,000 alumnos", contexto: "formados" },
    ],
    distincion: DISTINCIONES.papa,
    foto: fotoPapa,
    redes: ENLACES.papa,
  },
  hijo: {
    nombre: "Jorge Sierra (hijo)",
    rol: "Producto y tecnología",
    trayectoria:
      "12 años construyendo productos digitales sobre bases financieras reales.",
    atribuciones: [
      { dato: "12 años", contexto: "construyendo productos digitales" },
      { dato: "+1,000 MDP/mes", contexto: "procesados por productos que ha liderado" },
      // Al final, no al principio: la lista no es cronológica sino de lo más
      // general a lo más específico, y esto acota los dos renglones de arriba.
      // No es claim suelta: la línea de /nosotros ya documenta 2016 con
      // investigación de algoritmos y 2017 con PLN.
      { dato: "Desde 2016", contexto: "construyendo IA, y con IA" },
    ],
    distincion: DISTINCIONES.hijo,
    foto: fotoHijo,
    redes: ENLACES.hijo,
  },
};
