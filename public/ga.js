/* Google Analytics 4 — G-ENCWN9XWT1 (propiedad «Ilhas ai sales»).
 *
 * ⚠️ ESTE ARCHIVO EXISTE PARA NO METER UN <script> EN LÍNEA, y esa es su primera
 * razón de ser. El snippet que da Google es un `<script>` inline, y admitirlo
 * obligaría a poner `'unsafe-inline'` en `script-src` — que es exactamente la
 * directiva que evita que un XSS ejecute lo que quiera. Sacándolo a un archivo
 * del mismo dominio, la CSP se queda en:
 *
 *     script-src 'self' https://www.googletagmanager.com
 *
 * y no se afloja nada más. Si algún día alguien "simplifica" pegando el snippet
 * de Google en el <head>, la página deja de cargar la analítica (la CSP la
 * bloquea) o, peor, alguien le agrega `'unsafe-inline'` para que funcione y el
 * sitio pierde su mejor defensa. No lo hagas.
 *
 * El patrón de `dataLayer` como cola es lo que permite que este archivo y
 * `gtag.js` carguen en cualquier orden: el que llegue primero crea el arreglo y
 * el otro lo encuentra hecho.
 */
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

/* `anonymize_ip` ya no es una opción en GA4 —la anonimización de IP es
   obligatoria y siempre está activa—, así que no se declara: ponerlo sería
   copiar una receta de Universal Analytics que hoy no hace nada. */
gtag("config", "G-ENCWN9XWT1");

/* ───────────────────────────────────────────────────────────────────────────
   LOS CUATRO EVENTOS — un solo listener, delegado en `document`
   ───────────────────────────────────────────────────────────────────────────
   NO conoce clases, ni orden, ni texto, ni selectores. Lee `data-evento` del
   marcado y ya. Por eso mover un botón, cambiarle el copy o repintarlo no
   rompe nada. El registro y el porqué de cada evento viven en
   `src/data/eventos.ts`; el chequeo que avisa si uno desapareció es
   `npm run eventos`, y corre dentro de `npm run build`.

   Va en la fase de CAPTURA (`true` como tercer argumento) para que dispare
   aunque algo más abajo detenga la propagación del clic.

   `closest()` y no `event.target` a secas: el clic casi siempre cae en un
   <span> de adentro —el texto o el ícono—, no en el <a> que lleva el atributo.
   ─────────────────────────────────────────────────────────────────────────── */
document.addEventListener(
  "click",
  function (e) {
    var el = e.target && e.target.closest && e.target.closest("[data-evento]");
    if (!el) return;

    var nombre = el.getAttribute("data-evento");
    if (!nombre) return;

    var datos = {};

    /* El único parámetro extra que existe hoy. Si algún evento necesita otro,
       se declara en `eventos.ts` y se lee aquí — no se inventan al vuelo. */
    var carril = el.getAttribute("data-carril");
    if (carril) datos.carril = carril;

    /* `link_url` ayuda a separar los tres `webinar_reservar` entre sí sin tener
       que declarar tres eventos distintos. Es el destino, no el texto: el texto
       cambia, el destino no. */
    var href = el.getAttribute("href");
    if (href) datos.link_url = href;

    gtag("event", nombre, datos);
  },
  true,
);
