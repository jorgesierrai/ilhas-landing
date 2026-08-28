/**
 * Los enlaces públicos de cada persona.
 *
 * Vive aquí y no en cada página porque las dos —/finanzas §04 y /nosotros §01—
 * publican a las mismas dos personas con datos declarados por separado
 * (`maestros` allá, `personas` acá). Duplicar las URLs es la forma más segura
 * de que se desincronicen.
 *
 * URLs LIMPIAS: Jorge las pasó como salieron del botón de compartir de cada
 * app, con parámetros de rastreo (`igsi`, `_t`, `utm_source=share_via`…). Esos
 * parámetros son atribución de una sesión concreta, caducan, y no cambian a
 * dónde llega el enlace. Se guardan sin ellos.
 */

export type Red = "instagram" | "tiktok" | "linkedin" | "sitio";

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
