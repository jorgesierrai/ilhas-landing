/* Google Analytics 4 — G-ENCWN9XWT1 (propiedad «Ilhas ai sales»).
 *
 * ⚠️ ESTE ARCHIVO EXISTE PARA NO METER UN <script> EN LÍNEA, y esa es toda su
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
