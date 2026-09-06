# `/webinar` — la lista de espera

**Para Claude Code.**

⚠️ **Rama base: `eventos-ga4` (o `main` una vez que ése se mergee).** No salgas
de `kinzal-en-bio` ni de `main` de antes: esta página necesita que ya exista el
sistema de eventos (`src/data/eventos.ts`, `public/ga.js`,
`scripts/eventos-check.mjs`), y si sales de antes, el `npm run build` de esta
rama va a fallar por razones que no tienen nada que ver con tu trabajo.

Cuatro archivos, los cuatro **ya en el disco**. Verifica los md5 antes de nada:

```bash
md5 -q medios/webinar-referencia.html               # 3c4564e6e736816a20facf8a9c020c0b
md5 -q medios/prompt-webinar.md                     # este archivo
md5 -q public/assets/webinar/master-course.webp     # 91a696555026e0d122f746f4dbf90f51
md5 -q public/assets/webinar/bootcamp.webp          # 0da7a0ae2849d14e9d216df7b2f7fe64
```

`medios/webinar-referencia.html` es la fuente: su CSS y su marcado son los que
van. Las dos imágenes son los mockups de Jorge, con el alfa recortado al
contenido y a 1120 px de ancho — **31 y 27 KB, desde PNG de ~1 MB. No las
regeneres.**

> Medido sobre la referencia, que ya va suelta (sin menú ni pie del sitio):
> **1,413 px en 390×844 · 1,753 px en 768 · 1,148 px en 1440**.
> La página hace scroll a propósito —no es un link in bio, es una landing—
> pero **el CTA queda arriba del pliegue en los tres tamaños**: 313, 280 y
> 333 px desde arriba. Cero peticiones fallidas.

---

## 0 · El formulario YA EXISTE — y es de Tally, no de Google

El CTA de la referencia apunta a:

```
https://tally.so/r/GxGr82?origen=sitio
```

Está **publicado y funcionando**. `GxGr82` es el id del formulario; el
workspace es `mKGkM7`.

⚠️ **Se cambió de Google Forms a Tally.** El plan de septiembre decía Google
Form; se hizo en Tally porque acepta **campos ocultos de verdad** (Google sólo
tiene «respuestas prellenadas», que el usuario ve y puede borrar) y porque se
pudo dejar con el fondo oscuro de la marca en vez de blanco corporativo.

**El `?origen=sitio` no es decorado.** Cae en un campo oculto y te dice de
dónde llegó cada persona **sin preguntárselo** — más exacto que un «¿cómo nos
conociste?», que nadie recuerda bien y todos contestan «Instagram». Hay tres
campos ocultos listos: `origen`, `utm_source` y `utm_campaign`. Si algún día
el enlace va en la bio de TikTok o en un correo, se cambia el valor y ya:
mismo formulario, origen distinto.

⚠️ **No le quites el parámetro** «porque se ve más limpio». Sin él las
respuestas llegan con el origen vacío.

### Lo que trae el formulario, para que no lo adivines

| # | Pregunta | Tipo | |
|---|---|---|---|
| 1 | ¿Cómo te llamas? | texto corto | obligatoria |
| 2 | Tu correo | correo | obligatoria |
| 3 | Tu WhatsApp | teléfono, lada MX por defecto | obligatoria |
| 4 | ¿Qué describe mejor lo que haces? | opción múltiple, 5 opciones con «Otra» | obligatoria |
| 5 | ¿Cuál es el número de tu negocio que hoy no puedes contestar? | párrafo | **opcional** |
| 6 | ¿Qué te llama más? | opción múltiple, 3 opciones | **opcional** |

Más: el aviso de privacidad simplificado al pie, con liga a `/privacidad`;
página de gracias propia; idioma `es-MX`; aviso por correo a `jorge@ilhas.ai`
en cada respuesta; y los colores de la marca (fondo `#0E0E0F`, texto
`#F8FAFF`, acento `#55E8FF`, botón `#7A3CFF`, Inter).

---

## 1 · El problema de diseño, porque no es obvio

Quien llega aquí **venía de apretar «Reservar mi lugar en el webinar»**.
Esperaba un formulario de registro y no hay ninguno.

**Esa expectativa rota es todo el problema**, y no se arregla adornando la
página: se arregla **diciendo la verdad en el primer renglón** y dándole algo
que sí puede hacer hoy —dejar por dónde avisarle— en lugar de un premio de
consolación.

⚠️ **No suavices el titular.** Un «¡Ya casi!» o un «Estamos preparando algo
increíble» es exactamente el humo que este sitio existe para no vender
(`docs/04-voz-del-cliente.md`).

⚠️ **Cambió respecto al plan de septiembre.** Entonces la salida era «síguenos
en estas tres cuentas» con tres QR. **Se descartó**: una lista de espera
captura y te deja avisar; seguir en redes le delega el aviso al algoritmo. Los
QR de `public/assets/qr/` que eran para esto —`qr-instagram-jorge.svg`,
`qr-tiktok-jorge.svg`, `qr-instagram-ilhas.svg`— quedan sin usar. **No los
borres todavía**: pregúntale a Jorge, puede quererlos para slides.

---

## 2 · La ruta: `/webinar`, y va SUELTA — sin `Base.astro`

Página nueva: **`src/pages/webinar.astro`**, **sin `Base.astro`**, igual que
`/jorgesierra`. **Sin menú y sin pie del sitio.**

⚠️ **Esto no es descuido y no lo "arregles".** Esta página tiene UN trabajo
—que aprieten el botón— y todo lo que se le ponga alrededor es una salida que
compite con él. Copia el patrón de `jorgesierra.astro`: su propio `<html>`,
su propio `<style>` scopeado, `tokens.css` y `base.css` importados para las
variables y las `@font-face`, y nada heredado.

**Se llega aquí por TRES puertas**, y por eso la página no enlaza de vuelta a
`/finanzas`:

| Puerta | Dónde |
|---|---|
| «Reservar mi lugar en el webinar» (hero) | `/finanzas:129` |
| «Reservar mi lugar en el webinar» (cierre) | `/finanzas:298` |
| «Reservar el webinar» | `Footer.astro:93`, en las **ocho** páginas con `Base.astro` |

Dos de las tres salen de `/finanzas`, así que devolver ahí regresaría a la
mayoría al lugar de donde acaban de salir. Se quitó el «Mientras tanto, esto
es lo que vas a ver en la clase» por eso (Jorge, 6 sep 2026). **No lo
repongas.**

⚠️ **Se llama `/webinar` y no `/lista-de-espera` ni nada con fecha adentro.**
El día que el registro abra, **esta misma URL se convierte en la página de
registro**: cambia el contenido, no la dirección. Así lo que la gente guarde o
comparta hoy sigue sirviendo mañana.

`noindex`: **NO.** Es una página real y honesta, y es la que debe salir si
alguien busca «webinar Ilhas». **Agrégala al `public/sitemap.xml`** — son seis
URLs hoy y pasan a siete. Ese sitemap es estático y a mano; si no lo tocas, se
queda desfasado.

---

## 3 · ⚠️ LA MEDICIÓN — esto es lo que cambió desde que se escribió el brief

Cuando se diseñó esta página el sitio no tenía analítica. Ahora sí, y **eso
mete tres requisitos que no estaban y que el `npm run build` va a cazar.**

### 3.1 · GA4 va REPETIDO en esta página

`/webinar` no usa `Base.astro`, así que **no hereda su `<head>`** — y sin el
snippet propio, la página que existe para convertir sería la única del sitio
que no se mide. Es exactamente el mismo caso que `/jorgesierra`, que ya lo
resuelve así (ver `src/pages/jorgesierra.astro:117-127`):

```astro
<script
  is:inline
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-ENCWN9XWT1"></script>
<script is:inline src="/ga.js"></script>
```

⚠️ **El comentario de `jorgesierra.astro` dice «son DOS lugares» si cambia el
ID. Con esto son TRES.** Actualiza esa nota **y** la de `Base.astro`, o el
siguiente que cambie el ID va a dejar una página fuera.

⚠️ **`is:inline` NO vuelve el script código en línea** — le dice a Astro que no
lo empaquete. Sin él el build falla. Y **no pegues el snippet de Google tal
cual**: es inline y la CSP (`script-src 'self' https://www.googletagmanager.com`)
lo bloquea. La explicación larga está arriba de `public/ga.js`. No la aflojes.

### 3.2 · El CTA necesita su propio evento — y hay que DECLARARLO

Sin evento, el embudo queda: home → `/finanzas` → [clic medido] → `/webinar`
→ **ciego**. El número más importante de esta página —cuántos de los que
llegan sí abren el formulario— no existiría.

Al `<a class="cta">` de la referencia hay que agregarle:

```
data-evento="lista_espera_apuntarse"
```

**y** darlo de alta en `src/data/eventos.ts`:

```ts
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
}
```

⚠️ **Los dos pasos o ninguno.** `scripts/eventos-check.mjs` corre **dentro de
`npm run build`** y sale con código 1 si encuentra en `dist/` un `data-evento`
que no está en el registro, o si un evento aparece en una página que no
declaró. Si pones el atributo sin declararlo, no compila. Si lo declaras sin
ponerlo, tampoco.

⚠️ **`eventos.ts` dice «SON CUATRO. NO SE AGREGAN MÁS SIN UNA RAZÓN», y eso se
respeta.** La razón aquí es que apareció un paso de conversión que no existía
cuando se eligieron los cuatro. **Escríbela en el archivo**, no la dejes
implícita — ése es el punto de ese registro.

*(Nota: la «medición mejorada» de GA4 ya captura clics salientes, así que algo
llegaría aunque no hagas esto. Pero llegaría como un `click` genérico
revuelto con todos los demás enlaces externos del sitio, imposible de separar
en el embudo. No sirve como conversión.)*

### 3.3 · `webinar_reservar` deja de significar lo que dice

Su ficha en `eventos.ts` dice hoy «clic a **eventos.ilhas.ai**» y su
`seRompeSi` dice «se rompe si el webinar se muda de eventos.ilhas.ai» — que es
justo lo que hace el §4. **El chequeo no lo va a cazar** (cuenta apariciones,
no destinos) y por eso hay que corregirlo a mano.

Reescribe esa `descripcion` y ese `seRompeSi` para que digan la verdad: el
evento ahora mide el clic **hacia `/webinar`**, y el destino final se
distingue con el parámetro `link_url` que `ga.js` ya manda. **Su `minimo` de
10 no cambia** —el pie sigue en ocho páginas y `/finanzas` sigue con dos, y
`/webinar` no lleva pie— así que el conteo sigue cuadrando.

---

## 4 · Los tres enlaces que cambian

Hay que cambiar los tres o el sitio se contradice:

`src/pages/finanzas.astro:72` — la constante que alimenta los dos botones:

```ts
- const webinarUrl =
-   "https://eventos.ilhas.ai/?utm_source=sitio&utm_medium=web&utm_campaign=webinar&utm_content=finanzas";
+ // Mientras el registro no abra, los dos botones del webinar caen en /webinar,
+ // que dice la verdad y recoge la lista de espera. Cuando abra, esta constante
+ // vuelve a apuntar a donde corra el registro.
+ const webinarUrl = "/webinar";
```

⚠️ **Los `data-evento="webinar_reservar"` de las líneas 130 y 299 se quedan
tal cual.** Es el mismo evento, sólo cambia el destino.

`src/components/Footer.astro:93`:

```
- <a href="https://eventos.ilhas.ai/" data-evento="webinar_reservar"
+ <a href="/webinar" data-evento="webinar_reservar"
    >Reservar el webinar</a
```

⚠️ **Los `eventos.ilhas.ai` de `/terminos`, `/privacidad` y `/cookies` NO se
tocan.** Ahí son descriptivos: explican qué pasa cuando alguien se registra en
HighLevel, y siguen siendo ciertos.

⚠️ **Consecuencia que hay que decir en voz alta:** con esto `eventos.ilhas.ai`
deja de estar enlazado desde cualquier página que venda, y las UTMs que
llevaba la constante se pierden. Es correcto —el registro no está abierto— y
el `?origen=sitio` de Tally cumple ahora esa función. Pero si HighLevel tenía
tráfico desde el sitio, se va a cero.

---

## 5 · El texto del botón — decisión de Jorge, no la tomes tú

Hoy los dos botones de `/finanzas` dicen **«Reservar mi lugar en el webinar»**
y van a caer en una página que dice que **no se puede reservar**. Es una
promesa rota de dos segundos.

Propuestas para que él escoja:

- «Avísenme cuando abra»
- «Quiero mi lugar en el webinar»
- dejarlo igual

⚠️ **No lo cambies por tu cuenta, es copy.** Pero repórtalo: es la única
costura que queda floja.

---

## 6 · Detalles que se rompen si los tocas

- **`display:inline-block` en el `<b>` del `<h1>`.** Con `block`,
  `background-clip:text` recorta sobre una caja del ancho de la columna y el
  degradado sale truncado. **Es el mismo bug que ya salió tres veces en este
  proyecto.**
- **El resplandor va una sola vez**, detrás del titular. Si además lo pones en
  las tarjetas deja de ser acento y es decoración.
- **`min-height:100svh`, no `100vh`.** En Safari de iOS `100vh` ignora la barra
  del navegador y la página se corta justo donde está el botón.
- **El pie chico** («ilhas · Volver al inicio») es el ÚNICO enlace de salida, y
  es a `/`. No es el pie del sitio.
- **Las dos imágenes llevan `alt=""`** a propósito: son mockups decorativos y
  el texto de al lado ya dice qué son. Un `alt` descriptivo lo leería dos veces.
- **`loading="lazy"`** en las dos: están debajo del pliegue en los dos tamaños.
- **El CTA lleva `target="_blank" rel="noopener"`.** El formulario abre en
  pestaña nueva a propósito: quien no lo termine no pierde la página.
- **JavaScript propio: CERO.** Lo único que carga es GA4 (§3.1). Los botones,
  el foco y los estados son CSS.

---

## 7 · ⚠️ LO LEGAL, Y NO ES OPCIONAL

El formulario recoge **nombre, correo y WhatsApp** de personas en México.

**`/privacidad` dice hoy** que la captura de datos «ocurre en
eventos.ilhas.ai, no en este sitio», y sólo nombra a **HighLevel** con su
transferencia internacional. **Tally es un encargado nuevo que hoy no está
declarado.** Hay que nombrarlo, o el aviso deja de ser cierto el día que se
publique el botón.

⚠️ **Tally no es Google y no es estadounidense** —es europea— así que el
párrafo NO se puede copiar tal cual del de HighLevel. **Antes de escribir una
sola línea, lee el aviso de privacidad y el DPA del propio Tally** y saca de
ahí el domicilio, los subencargados y dónde se alojan los datos. No lo
supongas.

Y de paso: **`/privacidad` línea 131 sigue mandando al INAI**, que desapareció
—la LFPDPPP nueva rige desde el 21 de marzo de 2025 y sus funciones pasaron a
la Secretaría Anticorrupción y Buen Gobierno—.

⚠️ **Ninguna de las dos las escribas tú por tu cuenta.** Repórtalas como
bloqueantes de publicación y que las revise quien sepa. El propio formulario
lleva ya su aviso simplificado con liga a `/privacidad`.

---

## Verificación

```bash
npm run build      # cero warnings — y `npm run eventos` corre aquí dentro
npm run medios     # sin avisos nuevos
```

```bash
D=dist/webinar/index.html
test -f $D && echo "ruta ok"
grep -c "master-course.webp"  $D   # 1
grep -c "bootcamp.webp"       $D   # 1
grep -c 'href="/finanzas"'    $D   # 0  ← la página NO devuelve ahí
grep -c "Mientras tanto"      $D   # 0  ← se quitó
grep -c "noindex"             $D   # 0  ← esta página SÍ se indexa
grep -c "Footer\|<nav"        $D   # 0  ← va suelta, sin menú ni pie del sitio

# el formulario
grep -c "tally.so/r/GxGr82"   $D   # 1
grep -c "origen=sitio"        $D   # 1  ← si sale 0, se perdió el origen
grep -c "forms.gle"           $D   # 0  ← ya no es Google

# la medición
grep -c "googletagmanager"    $D   # 1  ← GA4 repetido aquí, §3.1
grep -c "/ga.js"              $D   # 1
grep -c "lista_espera_apuntarse" $D                     # 1
grep -c "lista_espera_apuntarse" src/data/eventos.ts    # 1  ← los dos o ninguno
grep -c "<script"             $D   # 2  ← SÓLO los dos de GA4, ni uno más

# los enlaces que cambian
grep -c 'href="/webinar"' dist/finanzas/index.html   # 2
grep -c "eventos.ilhas.ai" dist/finanzas/index.html  # 0
grep -c 'href="/webinar"' dist/index.html            # 1  — el del pie
grep -c "eventos.ilhas.ai" dist/terminos/index.html  # ≥1 — ésos SÍ se quedan

# el sitemap crece
grep -c "<loc>" public/sitemap.xml                   # 7
grep -c "/webinar" public/sitemap.xml                # 1
```

### Con el navegador

- [ ] **El CTA se ve sin hacer scroll**, a 390×844 y a 1440×900.
- [ ] El botón **abre el formulario de Tally** en pestaña nueva, y el
      formulario carga **con fondo oscuro**, no blanco.
- [ ] **Manda una respuesta de prueba** y comprueba tres cosas: que llega el
      correo a `jorge@ilhas.ai`; que el campo `origen` trae **`sitio`** y no
      viene vacío; y que en GA4 (DebugView) aparece
      **`lista_espera_apuntarse`**. Borra la respuesta después.
- [ ] En la consola, **cero errores de CSP** al cargar `/webinar`.
- [ ] Desde `/finanzas`, los dos botones del webinar caen aquí.
- [ ] Con el teclado, el CTA recibe foco y se ve el anillo.
- [ ] Las dos tarjetas se leen bien en 390 px, apiladas.
- [ ] **Las otras páginas siguen con fondo claro** — el chequeo del `is:global`.

### Alturas — repórtalas

| | Referencia | Después |
|---|---|---|
| `/webinar` · 390×844 | **1,413 px** | |
| `/webinar` · 768 | **1,753 px** | |
| `/webinar` · 1440 | **1,148 px** | |
| el CTA, desde arriba · 390 / 768 / 1440 | **313 / 280 / 333 px** | |

---

## Qué NO hacer

- No salgas de una rama anterior a `eventos-ga4`.
- No cambies la URL del formulario ni le quites el `?origen=sitio`.
- No pongas el `data-evento` sin declararlo en `eventos.ts`, ni al revés.
- No toques el `minimo` de `webinar_reservar`: sigue siendo 10.
- No pegues el snippet inline de Google ni le agregues `'unsafe-inline'` a la CSP.
- No suavices el titular: que no abre es el dato, y va primero.
- No le pongas `noindex` a `/webinar`.
- No olvides el sitemap.
- No toques los `eventos.ilhas.ai` de las tres páginas legales.
- No cambies el texto de los botones de `/finanzas`: es copy de Jorge.
- No pongas contador regresivo ni fecha: no hay fecha.
- No vuelvas a poner el enlace a `/finanzas` dentro de la página.
- No le pongas `Base.astro`, ni menú, ni pie del sitio.
- No borres los QR viejos sin preguntar.
- No escribas tú las legales, y no copies el párrafo de HighLevel para Tally.
- No metas más JavaScript que los dos `<script>` de GA4.

---

## Al terminar, reporta

1. Los md5, y de qué rama y commit saliste.
2. `npm run build`, `npm run medios` y todos los greps.
3. Capturas a 390 y 1440.
4. La tabla de alturas.
5. **El resultado de la respuesta de prueba**: si llegó el correo, si el
   campo `origen` trajo `sitio`, y si el evento salió en DebugView.
6. **Qué quedó escrito en `eventos.ts`**: el evento nuevo y la ficha corregida
   de `webinar_reservar`. Pégalas.
7. Que el ID de GA4 ahora vive en **TRES** lugares, y que actualizaste las dos
   notas que decían «dos».
8. El texto de los botones del §5 sigue **pendiente de Jorge**. Dilo.
9. **Las dos cosas legales del §7**, como bloqueantes de publicación — y que
   ahora el encargado es **Tally**, no Google.
10. Que `eventos.ilhas.ai` quedó sin enlaces desde las páginas que venden, y
    que sus UTMs se perdieron.
