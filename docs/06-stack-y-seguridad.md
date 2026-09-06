# 06 · Stack y seguridad

## La decisión de stack

**Astro, con salida 100% estática.**

Por qué, en orden de importancia para este proyecto:

1. **Superficie de ataque casi nula.** Sin servidor, sin runtime, sin base de datos, sin sesiones. Lo que se publica son archivos HTML, CSS e imágenes. No hay nada que inyectar ni endpoint que abusar. Es el requisito de "que sea segura", resuelto por arquitectura y no por parches.
2. **Rutas reales.** Cinco páginas necesitan cinco URLs. El `index.html` actual —1,293 líneas en un archivo— no da eso, y crecerlo a cinco páginas sería copiar y pegar el header cinco veces.
3. **Cero JavaScript de cliente por defecto.** Astro no manda JS al navegador salvo que se pida explícitamente. Un sitio de marketing no lo necesita, y cada KB de JS es peso y riesgo.
4. **Pipeline de imágenes integrado.** `astro:assets` genera AVIF/WebP con las dimensiones correctas. Las imágenes viven en el repo y salen optimizadas.
5. **Componentes sin framework.** Header, footer y tarjetas se escriben una vez. Sin React, sin hidratación, sin bundle.

**Lo que NO se usa y por qué:** nada de React/Vue/Svelte (no hay estado que manejar), nada de CMS (cinco páginas que cambian poco), nada de librería de componentes (la marca ya tiene su sistema), nada de CDN de terceros (todo self-hosted, ver CSP abajo).

### Cómo arrancarlo

```bash
npm create astro@latest -- --template minimal --typescript strict --no-install --no-git .
npm install
```

Estructura objetivo:

```
src/
  layouts/Base.astro          # <head>, header, footer, skip link
  components/                 # Nav, Bifurcacion, TarjetaPersona, Metodo, FAQ…
  pages/
    index.astro               # /
    metodo.astro              # /metodo
    finanzas.astro            # /finanzas
    soluciones.astro          # /soluciones
    nosotros.astro            # /nosotros
  styles/tokens.css           # copiado de docs/marca/tokens.css
  styles/base.css
public/
  assets/logo/
  robots.txt                  # con la línea Sitemap:
  sitemap.xml                 # estático, a mano (ver abajo)
```

### Tipografías

**Self-hosted, no desde Google Fonts.** Descarga los archivos `.woff2` de **Space Grotesk** (600) e **Inter** (400, 500, 600), ponlos en `public/assets/fonts/` y decláralos con `@font-face` y `font-display: swap`. Esto quita una dependencia externa, cierra un vector de CSP y hace la página más rápida.

Solo los pesos que se usan. Nada de cargar la familia completa.

---

## Seguridad

### Cabeceras (archivo `vercel.json`)

> ### ⚠️ `public/_headers` NUNCA aplicó. Se borró el 6 sep 2026.
>
> Ese archivo es formato **Netlify / Cloudflare Pages** y **el sitio corre en
> Vercel**, que lo ignora en silencio: no falla el build, no avisa nadie, el
> archivo se publica como un archivo más. Durante meses el repositorio decía
> tener una CSP y producción respondía **sin ninguna cabecera de seguridad**.
> Medido con `curl -I https://www.ilhas.ai/`: sólo volvía el
> `Strict-Transport-Security` que Vercel pone por su cuenta.
>
> **La lección, que vale más que el arreglo:** una cabecera que no se verifica
> contra producción es una cabecera que no existe. `curl -I` está en el
> checklist de abajo por esto.

Las cabeceras van en **`vercel.json`**, en la clave `headers`, junto a la clave
`redirects`. **Las dos claves viven en el mismo archivo** — si alguna vez llegan
por ramas distintas, hay que unirlas a mano antes de mergear o una borra a la
otra. (Pasó: el PR #17 traía sólo `headers` y `main` sólo `redirects`. Se cerró
sin mergear y el archivo se escribió de una pieza.)

```json
{
  "headers": [
    { "source": "/(.*)", "headers": [
      { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self' https://eventos.ilhas.ai; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests" },
      { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains" },
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }
    ]}
  ]
}
```

**`style-src` lleva `'unsafe-inline'` y no es descuido:** es lo único que
mantiene viva la presentación de la masterclass (494 atributos `style=`). Ver la
sección de esa página más abajo, con la medición.

**`preload` se quitó del HSTS.** El PR original lo traía. Enviar la palabra no
hace nada por sí sola —hay que darse de alta en `hstspreload.org`— pero es un
camino de una sola dirección: una vez en la lista, **todo** subdominio de
`ilhas.ai` queda obligado a HTTPS en navegadores que ya la traen embebida, y
salirse tarda versiones. `includeSubDomains` ya da la protección real. Cuando
`media.ilhas.ai` exista y esté estable, se puede reconsiderar.

**Las cabeceras no son opcionales:** son lo que hace que "estático" también
signifique "seguro".

> ⚠️ La CSP de arriba es estricta a propósito: **`script-src 'self'` sin `unsafe-inline`**. Eso significa **cero `<script>` inline y cero `onclick=` en el HTML**. Si algo necesita JS, va en un archivo `.js` propio. Si más adelante entra un pixel de Meta o Google Analytics, hay que añadir su dominio explícitamente y documentar por qué — no aflojar la política entera.

### El dominio canónico es `www.ilhas.ai`

Decisión de Jorge, 6 sep 2026. **El apex `ilhas.ai` redirige a `www`**, no al
revés: es lo que ya servía Vercel y moverlo arriesgaba el certificado sin ganar
nada.

Lo que se corrigió ese día: `astro.config.mjs` decía `site: 'https://ilhas.ai'`,
así que **cada `<link rel="canonical">` del sitio apuntaba a una URL que
redirige** (307 al `www`). Un sitio que se declara canónico en un host y se
sirve en otro parte su señal en dos.

⚠️ **`site` no cubre todo el sitio.** Hay dos lugares con la URL escrita a mano,
y una sesión que sólo cambie el config los deja atrás:

- `src/pages/jorgesierra.astro` — no usa `Base.astro`, trae su propio `<head>`.
- `public/jorgesierra/ia-aplicada-masterclass/index.html` — vive en `public/`,
  no pasa por Astro. Lleva `canonical`, `og:url` **y `og:image`**.

La comprobación, después de cada build:

```bash
grep -rn "https://ilhas\.ai" dist/ | grep -v "eventos.ilhas.ai"   # debe salir vacío
```

⚠️ **Sin verificar: el redirect del apex es 307 (temporal).** Para una
canonicalización de dominio debería ser **308**. Se cambia en el panel de Vercel,
en la configuración de dominios del proyecto — no en `vercel.json`, porque el
redirect de dominio se resuelve antes del enrutado y una regla del archivo nunca
llegaría a correr.

### El sitemap

**Archivo estático en `public/sitemap.xml`**, escrito a mano. No se instala
`@astrojs/sitemap`: seis URLs no justifican una dependencia.

Van las cinco del hub más `/jorgesierra`. **No van** las tres legales ni la
presentación de la masterclass: las cuatro llevan `noindex`, y un sitemap que
proponga a Google lo que la etiqueta le prohíbe es el sitio contradiciéndose.

**Sin `<lastmod>`, `<changefreq>` ni `<priority>`.** Google ignora los dos
últimos, y un `lastmod` escrito a mano se vuelve mentira en la primera
iteración — una fecha falsa es peor que ninguna.

`robots.txt` lo anuncia con `Sitemap: https://www.ilhas.ai/sitemap.xml`.

⚠️ **Es un archivo a mano y por eso puede pudrirse:** el día que nazca una
página, nadie va a acordarse. El guardián va en `scripts/eventos-check.mjs`
(ver la medición): compara las páginas de `dist/` sin `noindex` contra los
`<loc>` del sitemap y grita si sobran o faltan.

### El video y la CSP

La CSP **no declara `media-src`**, así que el video hereda de `default-src 'self'`. Las consecuencias exactas, hoy:

- ✅ Un `<video>` servido **desde nuestro propio dominio** funciona sin tocar nada. Es lo que hace `public/assets/video/`.
- ❌ Un iframe de **YouTube o Vimeo está bloqueado por completo** — no es que se vea mal: no carga. Tampoco hay `frame-src`, y `frame-ancestors 'none'` + `X-Frame-Options: DENY` van en la misma dirección.
- ❌ Un `<video>` apuntando a **cualquier dominio externo** también está bloqueado.

O sea: el sitio ya está configurado para servir nuestro propio video y para rechazar el de todos los demás. **No hay que tocar la CSP para agregar video propio.**

**El día que la biblioteca se mude a `media.ilhas.ai`** (Cloudflare R2, cuando pase de ~250 MB — ver `PLAN-MEDIOS.md` Parte 3), el diff es exactamente este:

```diff
- default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; …
+ default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https://media.ilhas.ai; media-src 'self' https://media.ilhas.ai; …
```

Sigue sin haber player de terceros: es nuestro `<video>` nativo apuntando a nuestro subdominio. **Lo que no se hace es incrustar YouTube o Vimeo**: obliga a abrir `frame-src`, mete su interfaz y sus recomendados dentro de la página, y tira el Lighthouse que este documento pone como requisito.

### Reglas de código

- **Nada de `set:html`** con contenido que no sea literal escrito en el repo. La única excepción viva son los SVG de `src/assets/iconos/`, que se inlinean para heredar `currentColor`: son literales del repo, leídos en build time, nunca de red ni de input de usuario. A cambio, **ningún SVG entra a esa carpeta sin abrirse en un editor y revisarse a mano** — un SVG puede traer `<script>` o `on*=` adentro. `npm run medios` avisa si detecta alguno, pero la revisión es humana.
- Todo enlace externo: `rel="noopener noreferrer"`. Los enlaces a `eventos.ilhas.ai` también.
- **Ningún formulario en este sitio captura leads.** El registro al webinar es de Go High Level y vive allá. Si algún día se agrega un formulario, no se procesa aquí.
- Sin `eval`, sin `new Function`, sin `innerHTML` dinámico.
- Sin secretos, tokens ni claves en el repositorio. Ni siquiera de analytics. Revisa antes de cada commit.
- Dependencias: las mínimas. `npm audit` limpio antes de publicar. Activa Dependabot.
- `robots.txt` permisivo para el sitio, `security.txt` en `/.well-known/` con un correo de contacto.

### Analytics y el cruce a GHL

El punto de fuga está en la costura: el visitante sale de `ilhas.ai` hacia `eventos.ilhas.ai` y ahí lo recoge GHL. Para no perder la atribución:

- Todos los enlaces al webinar llevan UTM consistentes: `?utm_source=sitio&utm_medium=web&utm_campaign=webinar&utm_content=<pagina>`.
- Decidir **una sola** fuente de verdad para el pixel. Recomendación: que GHL sea el dueño de la conversión y el sitio solo mida tráfico.
- Si se instala analytics en el sitio, que sea sin cookies y self-hosted o de dominio propio, para no tener que abrir la CSP ni poner banner de cookies.

---

## Deuda urgente — hacer antes que nada

El `index.html` publicado hoy en ilhas.ai contiene:

- Testimoniales inventados ("María González", "Carlos Ramírez") presentados como reales.
- `[Nombre de tu papá]` y `[Tu papá]` sin rellenar.
- Ocho logos de clientes falsos, "Empresa 1" a "Empresa 8", bajo el título "Han confiado en nuestra metodología".
- Dos videos "Próximamente" con controles de reproducción falsos.
- Un contador de escasez ("Quedan 7 cupos") sin respaldo.
- Un precio desactualizado ($497 contra los $697 vigentes).
- Audiencia equivocada: le habla a dueños de negocio, no a profesionales de finanzas.

**El primer commit del trabajo baja los cuatro primeros.** No espera al sitio nuevo, no espera a decisiones de diseño. Un sitio que vende criterio con prueba social inventada es un riesgo de reputación mientras esté arriba, y este público llega específicamente buscando detectar humo.

---

## Las tres páginas legales

`/terminos`, `/privacidad` y `/cookies`. Entraron el 30 ago 2026 (iteración 17).

### ⚠️ NO LAS HA REVISADO UN ABOGADO

**Los tres documentos son borradores.** Los escribió Claude Code, que no es
abogado y no da asesoría legal. Están redactados de buena fe, con los hechos
reales de lo que el sitio hace y con los apartados que la ley mexicana pide,
pero **antes de que el sitio se anuncie en serio tienen que pasar por un
abogado.** Es un trámite de una sesión y cierra un hueco que hoy está abierto.

Lo que un abogado tiene que revisar en particular:

- La cláusula de **jurisdicción** de `/terminos` (depende del domicilio fiscal
  real — ver abajo).
- El **límite de responsabilidad**: qué se puede excluir y qué no bajo ley
  mexicana.
- Si la operación necesita además **registro ante el INAI** o algún trámite que
  el aviso no contempla.
- Si el tratamiento de datos de HighLevel requiere una **cláusula de encargado**
  más específica que la que trae hoy el aviso.

### ⚠️ El domicilio tiene una contradicción sin resolver

Jorge pasó el domicilio como **Zapopan**, pero el **C.P. 44690 es de
Guadalajara** — verificado en fuentes de códigos postales, y las cinco colonias
de ese código (Vallarta Norte, Vallarta San Jorge, Vallarta San Lucas,
Rinconada Santa Rita, Villa Santa Rita) son todas de Guadalajara.

**Los tres documentos van con Guadalajara**, que es lo que dice el código
postal. **Jorge tiene que confirmarlo contra su constancia de situación
fiscal**, porque de ahí depende también a qué tribunales se someten los
términos.

### Por qué NO se copiaron los de otra empresa

Jorge pidió tomar los tres de `atonom.ai` «tal cual pero adaptados». No se hizo,
por dos razones:

1. Un aviso de privacidad y unos términos son obra escrita, normalmente de un
   despacho. Copiarlos cambiándoles el nombre es copiar.
2. **La que de verdad importa: no le servirían a Ilhas.** Atonom es
   estadounidense — su pie trae SOC 2 y *«Your Privacy Choices»*, que es CCPA de
   California. **Ilhas es mexicana y vende en LATAM.** La ley que aplica es la
   **LFPDPPP**, que exige un *aviso de privacidad* con contenido obligatorio que
   una política gringa traducida no trae: identidad y domicilio del responsable,
   finalidades, medios para ejercer los **derechos ARCO**, cómo revocar el
   consentimiento, transferencias y cómo se comunican los cambios.

### Los hechos que los tres documentos afirman

Si alguno deja de ser cierto, **el documento se actualiza el mismo día.**

| Afirmación | Dónde | Sigue siendo cierta mientras… |
|---|---|---|
| «Este sitio no recaba datos personales» | `/privacidad` | no haya formularios en este repositorio |
| «Ilhas.ai no coloca cookies» | `/cookies` | no entre analítica ni scripts de terceros |
| «No usa analítica» | `/privacidad` | ídem |
| HighLevel es el único proveedor | `/privacidad` | no entre otro que trate datos |
| Responsable: persona física | los dos | Jorge no constituya sociedad |

El día que entre analítica hay que tocar **tres** cosas a la vez: el aviso, la
política de cookies y la CSP. Y si esa analítica pone cookies, además el banner
de consentimiento — que hoy el sitio no necesita, y ése es justo el motivo por
el que conviene que la analítica sea sin cookies (ver «Analytics y el cruce a
GHL» arriba).

### Notas de implementación

- Las tres llevan **`<meta name="robots" content="noindex">`**. No compiten por
  búsquedas y no deben posicionarse por encima de las páginas que sí venden.
  **Lighthouse les da SEO 69 por eso**, y está bien: la única auditoría que
  falla es *«Page is blocked from indexing»*, que es exactamente lo que se pidió.
  Accesibilidad y buenas prácticas van en 100.
- Viven bajo `src/layouts/Legal.astro`, que es una capa delgada sobre `Base` —
  la que agrega el `noindex`, el titular con su fecha y la maquetación de
  documento.
- La fecha de «Última actualización» es **una prop por página**, no la fecha de
  build. Un documento legal no se «actualiza» porque recompiles el sitio.

---

## La presentación de la masterclass y la CSP

`/jorgesierra/ia-aplicada-masterclass` trae **494 atributos `style="…"` en
línea más un `<style>`** —así exporta Claude Design— y por eso es la página del
sitio más sensible a la política de seguridad.

Medido sirviéndola con cada política y contando eventos
`securitypolicyviolation`:

| CSP | Violaciones |
|---|---|
| La de `cabeceras-vercel`, con `style-src 'self' 'unsafe-inline'` | **0** |
| `style-src 'self'` a secas | **495** (`style-src-attr` y `style-src-elem`) |

**Hoy no hace falta excepción.** El `'unsafe-inline'` que ya trae la política la
cubre. La trampa es endurecer la CSP quitando ese `'unsafe-inline'` —que es
exactamente lo que uno querría hacer algún día— sin acordarse de esta ruta.

Si eso pasa, la ruta necesita su propia entrada en `vercel.json` repitiendo la
política con `'unsafe-inline'` en `style-src`. Y hay que verificar en qué orden
aplica Vercel dos `source` que coinciden, cosa que **no se puede comprobar hasta
que las cabeceras estén desplegadas**:

```bash
curl -sI https://ilhas.ai/jorgesierra/ia-aplicada-masterclass/ | grep -i content-security
```

Debe devolver la política CON `'unsafe-inline'`. Si devuelve la global, la regla
específica tiene que ir **antes** que la de `/(.*)`.

`script-src 'self'` no estorba: `deck.js` es del mismo dominio, no hay ningún
`<script>` inline ni ningún `on*=`, y no se carga nada de CDN.

---

## Checklist antes de publicar

- [ ] `npm run build` sin errores ni warnings
- [ ] `npm audit` sin vulnerabilidades altas o críticas
- [ ] Las cabeceras de seguridad responden en producción (verifícalo con `curl -I`)
- [ ] Cero `<script>` inline y cero handlers `on*=` en el HTML generado
- [ ] Ningún placeholder, ningún dato inventado, ninguna cifra sin atribuir
- [ ] Todas las imágenes con `width`, `height` y `alt`
- [ ] Contraste AA en texto y controles, en claro y en oscuro si hay tema oscuro
- [ ] Navegación completa con teclado y foco visible
- [ ] Cada enlace al webinar lleva sus UTM
- [ ] Lighthouse: 100 en accesibilidad y buenas prácticas; performance arriba de 95
- [ ] Sin secretos en el repositorio ni en el historial de git
- [ ] **Un abogado revisó `/terminos`, `/privacidad` y `/cookies`** — hoy no, y
      el domicilio sigue sin confirmarse contra la constancia fiscal
- [ ] Si entró analítica: el aviso de privacidad, la política de cookies y la
      CSP dicen lo mismo que hace el sitio
