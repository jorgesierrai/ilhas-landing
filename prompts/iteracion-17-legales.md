# Iteración 17 — El pie nuevo y las tres páginas legales

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 28 ago 2026.

> Rama: **`pie-y-legales`**, salida de donde quedó la 16.
>
> **Referencia del pie: `medios/footer-referencia.html`.** Ya está construida
> y medida (345 px en escritorio, 664 px en móvil).

---

## ⚠️ Lee esto antes de empezar

Jorge pidió tomar los tres documentos de `atonom.ai` «tal cual pero adaptados
a Ilhas». **No se hizo así, y hay dos razones:**

1. **Son texto de otra empresa.** Un aviso de privacidad y unos términos son
   obra escrita, normalmente redactada por un despacho. Copiarlos cambiándoles
   el nombre es copiar.

2. **La razón que de verdad importa: no le servirían a Ilhas.** Atonom es una
   empresa estadounidense —su pie trae SOC 2 y un enlace de *«Your Privacy
   Choices»*, que es CCPA de California—. **Ilhas es mexicana y vende en
   LATAM.** La ley que aplica es la **LFPDPPP**, que exige un *aviso de
   privacidad* con contenido obligatorio que una política gringa traducida
   simplemente no trae: identidad y domicilio del responsable, finalidades,
   medios para ejercer los **derechos ARCO**, cómo revocar el consentimiento,
   transferencias, y cómo se comunican los cambios.

Copiar el de Atonom dejaría a Ilhas con un documento prestado **y** fuera de
norma donde de verdad opera.

**Lo que sí se hizo:** escribir los tres desde cero, para México, con la voz
del sitio y con los hechos reales de lo que el sitio hace. Están abajo,
completos.

⚠️ **Yo no soy abogado y esto no es asesoría legal.** Los tres son borradores
sólidos y honestos; **antes de publicarlos tienen que pasar por un abogado.**
Déjalo escrito en `docs/` cuando termines.

---

## 0 · Los datos de la empresa — ya los dio Jorge

Van **literales** en los tres documentos:

| Dato | Valor |
|---|---|
| Responsable | **José Jorge Sierra Guerra**, persona física |
| Domicilio | **Golfo de Cortés 2869, Guadalajara, Jalisco, C.P. 44690** |
| Correo ARCO | **hola@ilhas.ai** |
| Plataforma de eventos | **HighLevel** (`eventos.ilhas.ai`) |
| Última actualización | **1 de agosto de 2026** |

⚠️ **El domicilio trae una contradicción que Jorge tiene que resolver.** Él lo
pasó como *«Zapopan»*, pero **el C.P. 44690 corresponde a Guadalajara**, no a
Zapopan (verificado en tres fuentes de códigos postales). Los documentos van
con **Guadalajara**, que es lo que dice el código postal.

**Esto no es un detalle:** el domicilio fiscal tiene que coincidir con la
constancia de situación fiscal, y de él depende la cláusula de jurisdicción de
los términos. **Repórtalo para que Jorge lo confirme contra su constancia.**

⚠️ **Es persona física, no sociedad.** No escribas «S.A. de C.V.», «Ilhas S.C.»
ni nada parecido. La LFPDPPP admite perfectamente a una persona física como
responsable; se escribe con su nombre y su domicilio, y ya.

⚠️ **HighLevel es una empresa estadounidense.** Eso significa que **sí hay
transferencia internacional de datos**, y el aviso tiene que decirlo. Está
escrito abajo; no lo quites.

---

## 1 · El pie

Reemplaza `src/components/Footer.astro` con la estructura de la referencia.

### Lo que se toma del footer que le gustó a Jorge

- Marca a la izquierda, columnas de enlaces a la derecha.
- **El logotipo grande de marca de agua** detrás de la barra final.
- **Barra final** separada por una regla: copyright a un lado, lo legal al
  otro.

### Lo que NO se copió, a propósito

- **La suscripción al boletín.** Ilhas no tiene boletín. Un campo de correo que
  no manda a ningún lado es una promesa falsa.
- **El sello de certificación.** Ilhas no está certificada en nada. Ese sello
  es el activo más caro de ese footer y el más fácil de fingir.
- **Los íconos de redes.** No sé si Ilhas tiene cuentas propias —las de Jorge
  ya viven en su tarjeta de persona. **Si existen, Jorge las pasa y se
  agregan.**

### Dos cosas técnicas

⚠️ **La marca de agua va con texto CSS, no con `logo-wordmark-blanco.svg`.**
Ese SVG trae su tipografía embebida por `@font-face`, y a 13 rem cualquier
fallo de carga se ve enorme. Aquí es decoración pura: se dibuja con
`--ilhas-font-display`, que la página ya carga. Va con `aria-hidden` y
`pointer-events:none`.

⚠️ **La regla de la lista va scopeada a `.pie__inner`, no a `.pie`.**
Con `.pie ul` (especificidad 0,1,1) le gana a `.pie__legal` (0,1,0) y los tres
enlaces legales **se apilan en columna** en vez de ir en fila. Se probó y pasó.
Es el tipo de colisión que no truena el build y solo se ve mirando.

---

## 2 · Las tres páginas

Tres archivos nuevos en `src/pages/`, con el `Base` layout que ya usan las
demás:

| Archivo | Ruta | `<title>` |
|---|---|---|
| `terminos.astro` | `/terminos` | Términos y condiciones · Ilhas |
| `privacidad.astro` | `/privacidad` | Aviso de privacidad · Ilhas |
| `cookies.astro` | `/cookies` | Política de cookies · Ilhas |

**Maquetación:** una sola columna de lectura. `.container.prose` con
`max-width: var(--ilhas-measure)`, `h1` arriba, la fecha de actualización
debajo en `--ilhas-fs-small`, y `h2` para cada apartado. **Sin hero, sin
gradiente, sin ilustración.** Son documentos, se leen.

⚠️ **Los tres llevan `<meta name="robots" content="noindex">`.** No compiten
por búsquedas y no deben salir en resultados por encima de las páginas que sí
venden.

---

## 3 · `/terminos` — Términos y condiciones

```
# Términos y condiciones

Última actualización: 1 de agosto de 2026

Este sitio (ilhas.ai) es operado por José Jorge Sierra Guerra, persona física
con domicilio en Golfo de Cortés 2869, Guadalajara, Jalisco, C.P. 44690
(«Ilhas», «nosotros»). Al usar el sitio aceptas estos términos. Si no estás de
acuerdo con ellos, te pedimos que no lo uses.

## Qué es este sitio

Ilhas.ai es un sitio informativo. Presenta el Método Ilhas, el trabajo que
hemos hecho y las formas de trabajar con nosotros. No es una plataforma
transaccional: aquí no se compra nada ni se crea ninguna cuenta.

Las inscripciones a eventos y programas se hacen fuera de este sitio, en
eventos.ilhas.ai, que corre sobre HighLevel y tiene sus propios términos.

## Esto no es asesoría profesional

El contenido de este sitio es informativo y educativo. **No constituye
asesoría financiera, contable, fiscal, legal ni de inversión**, y no sustituye
el criterio de un profesional que conozca tu caso concreto.

Las decisiones que tomes con base en este contenido son tuyas. Antes de
aplicar cualquier método, herramienta o recomendación a tu operación real,
consulta con quien corresponda.

## Los resultados que se muestran

Los casos, cifras y testimonios describen trabajo realizado con clientes
concretos, en sus circunstancias. **No son una promesa de resultado**: lo que
funcionó en una empresa no garantiza lo mismo en otra.

Cuando una cifra viene de una fuente pública, la fuente se cita en la misma
página.

## Propiedad intelectual

El Método Ilhas, sus contenidos, textos, materiales, marcas y el diseño de
este sitio son propiedad de José Jorge Sierra Guerra o se usan con
autorización.

Puedes leer, citar y compartir el contenido dando crédito y enlazando a la
fuente. **No puedes** reproducirlo íntegro, revenderlo, ni usarlo como
material propio de formación o consultoría sin nuestro permiso por escrito.

## Enlaces a terceros

El sitio enlaza a plataformas y páginas que no controlamos. No respondemos por
su contenido, sus prácticas de privacidad ni su disponibilidad.

## Límite de responsabilidad

El sitio se ofrece «tal cual». Hacemos un esfuerzo razonable por mantener la
información correcta y actualizada, pero no garantizamos que esté libre de
errores ni que esté disponible sin interrupciones.

En la medida que la ley lo permita, Ilhas no será responsable por daños
derivados del uso o la imposibilidad de uso del sitio.

## Cambios

Podemos actualizar estos términos. La versión vigente es siempre la publicada
en esta página, con su fecha. Si el cambio es de fondo, lo señalaremos aquí
mismo.

## Ley aplicable

Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para
cualquier controversia, las partes se someten a los tribunales competentes de
Guadalajara, Jalisco, renunciando a cualquier otro fuero.

## Contacto

hola@ilhas.ai
```

---

## 4 · `/privacidad` — Aviso de privacidad

⚠️ **Se llama «Aviso de privacidad», no «Política de privacidad».** Es el
término que usa la LFPDPPP y el que un usuario mexicano reconoce. Los seis
apartados de abajo son los que la ley pide; **no los reordenes ni elimines
ninguno.**

```
# Aviso de privacidad

Última actualización: 1 de agosto de 2026

## Quién es responsable de tus datos

José Jorge Sierra Guerra, persona física con domicilio en Golfo de Cortés
2869, Guadalajara, Jalisco, C.P. 44690, es responsable del tratamiento de tus
datos personales, conforme a la Ley Federal de Protección de Datos Personales
en Posesión de los Particulares (LFPDPPP).

## Qué datos recabamos, y cuáles no

**Este sitio no recaba datos personales.** Ilhas.ai es un sitio estático: no
tiene formularios, no crea cuentas, no usa analítica y no coloca cookies. Ver
la política de cookies.

Recabamos datos personales solo cuando tú nos los das, y en dos casos:

- **Cuando te inscribes a un evento o programa.** El registro ocurre en
  eventos.ilhas.ai, no en este sitio. Esa página corre sobre HighLevel, y ahí
  se recaban tu nombre y tu correo electrónico, más los datos que el formulario
  del evento pida en cada caso.
- **Cuando nos escribes.** A hola@ilhas.ai, o por los canales que publicamos.
  Recibimos lo que decidas incluir en tu mensaje.

**No recabamos datos personales sensibles**, ni datos financieros o
patrimoniales tuyos a través de este sitio.

## Para qué los usamos

Las finalidades **necesarias** son:

1. Registrarte y darte acceso al evento o programa que solicitaste.
2. Responder tu mensaje y darle seguimiento.
3. Enviarte la información logística de lo que contrataste (fechas, accesos,
   materiales).

Las finalidades **no necesarias** —que puedes rechazar sin que afecte lo
anterior— son:

4. Enviarte contenido, avisos de nuevos programas e invitaciones.

Si no quieres que usemos tus datos para el punto 4, escríbenos a
hola@ilhas.ai con el asunto «Limitar uso». Lo aplicamos sin más trámite.

## Con quién los compartimos

No vendemos tus datos. Los compartimos únicamente con los proveedores que
necesitamos para operar, que los tratan por nuestra cuenta y bajo nuestras
instrucciones. Hoy son:

- **HighLevel**, donde corre eventos.ilhas.ai: registros y comunicaciones de
  los eventos y programas.

**Transferencia internacional.** HighLevel es una empresa estadounidense, así
que tus datos se almacenan y procesan en servidores fuera de México. Al
inscribirte aceptas esa transferencia, limitada a las finalidades de este
aviso.

Fuera de eso, solo compartimos datos cuando una autoridad competente lo
requiera legalmente.

## Tus derechos ARCO

Tienes derecho a **Acceder** a tus datos, **Rectificarlos** si son incorrectos,
**Cancelarlos** cuando consideres que no se requieren, y **Oponerte** a su uso
para fines específicos. También puedes **revocar tu consentimiento** en
cualquier momento.

Para ejercerlos, escribe a **hola@ilhas.ai** e incluye:

- Tu nombre y un correo donde podamos contestarte.
- Copia de una identificación oficial, para confirmar que eres tú.
- Qué derecho quieres ejercer y sobre qué datos.

Te contestamos en un máximo de **20 días hábiles**, y si procede lo aplicamos
dentro de los **15 días hábiles** siguientes.

Si consideras que tu derecho no fue atendido, puedes acudir al **INAI**
(inai.org.mx).

## Cuánto tiempo los guardamos

Conservamos tus datos mientras dure la relación y por el plazo que las
obligaciones fiscales y legales exijan. Después los eliminamos o los
anonimizamos.

## Cambios a este aviso

Podemos actualizar este aviso. La versión vigente siempre es la publicada en
esta página, con su fecha. Si un cambio afecta de fondo cómo tratamos tus
datos, te lo avisaremos por correo antes de aplicarlo.
```

---

## 5 · `/cookies` — Política de cookies

⚠️ **Hoy el sitio no pone ninguna cookie** —se verificó: no hay analítica ni
scripts de terceros—. Este documento describe eso, y deja preparado el
apartado para cuando se agreguen. **No inventes cookies que no existen.**

```
# Política de cookies

Última actualización: 1 de agosto de 2026

## Qué es una cookie

Un archivo pequeño que un sitio guarda en tu navegador para recordar algo:
que ya lo visitaste, qué idioma prefieres, o para contar cuánta gente entró.

## Qué usa este sitio hoy

**Ilhas.ai no coloca cookies.** El sitio es estático: no tiene sesión, no
guarda preferencias y no lleva analítica propia. Puedes navegarlo entero sin
que quede nada en tu navegador de nuestra parte.

Si eso cambia, lo actualizamos aquí antes de activarlo, y verás un aviso la
primera vez que entres.

## Cookies de terceros

Cuando sales de este sitio hacia **eventos.ilhas.ai** —que corre sobre
HighLevel— o hacia redes sociales, esas plataformas sí colocan sus propias
cookies, bajo sus propias políticas. No las controlamos y no nos dan acceso a
lo que guardan ahí.

## Cómo desactivarlas

Todos los navegadores permiten bloquear o borrar cookies desde su
configuración de privacidad. Bloquearlas puede hacer que algunos sitios dejen
de funcionar bien — este no, porque no las usa.

## Contacto

hola@ilhas.ai
```

---

## 6 · Enlazar el pie con las páginas

En `Footer.astro`, la barra final. **Rutas literales**, no de un arreglo con
un `map`: son tres y no van a crecer.

```jsx
<ul class="pie__legal">
  <li><a href="/terminos">Términos y condiciones</a></li>
  <li><a href="/privacidad">Aviso de privacidad</a></li>
  <li><a href="/cookies">Política de cookies</a></li>
</ul>
```

El comentario de cabecera de `Footer.astro` dice hoy *«no enlaza nada que no
exista todavía (nada de "Términos"/"Privacidad" placeholder)»*. **Actualízalo:**
ahora sí existen.

---

## Verificación

```bash
npm run build      # cero warnings
npm run medios     # sin ⚠ nuevos
```

```bash
# Las tres páginas se generan
ls dist/terminos/index.html dist/privacidad/index.html dist/cookies/index.html

# Y no se indexan
grep -c 'name="robots"' dist/terminos/index.html dist/privacidad/index.html dist/cookies/index.html  # 1 cada una

# El pie enlaza a las tres, en TODAS las páginas
for f in dist/index.html dist/metodo/index.html dist/finanzas/index.html dist/soluciones/index.html dist/nosotros/index.html; do
  echo "$f: $(grep -o 'href="/\(terminos\|privacidad\|cookies\)"' $f | wc -l)"   # 3 cada una
done

# Los apartados obligatorios del aviso están
grep -c "LFPDPPP"   dist/privacidad/index.html   # ≥ 1
grep -c "ARCO"      dist/privacidad/index.html   # ≥ 1
grep -c "INAI"      dist/privacidad/index.html   # ≥ 1
grep -c "20 días hábiles" dist/privacidad/index.html  # 1

# NO debe quedar ningún marcador: los datos ya están todos
grep -c "\[\[" dist/terminos/index.html dist/privacidad/index.html dist/cookies/index.html   # 0 en las tres

# Los datos de la empresa, literales
grep -c "José Jorge Sierra Guerra"  dist/terminos/index.html dist/privacidad/index.html   # 1 y 1
grep -c "Golfo de Cortés 2869"      dist/terminos/index.html dist/privacidad/index.html   # 1 y 1
grep -c "C.P. 44690"                dist/terminos/index.html dist/privacidad/index.html   # 1 y 1
grep -c "HighLevel"                 dist/privacidad/index.html dist/cookies/index.html    # ≥1 y 1
grep -c "Transferencia internacional" dist/privacidad/index.html                          # 1

# Persona física, NO sociedad
grep -ci "S.A. de C.V.\|S. de R.L.\|Sociedad Anónima"  dist/terminos/index.html dist/privacidad/index.html  # 0 y 0

# El domicilio va con Guadalajara, no Zapopan (ver punto 0)
grep -ci "zapopan"  dist/terminos/index.html dist/privacidad/index.html   # 0 y 0

# Y no se coló nada de Atonom
grep -ci "atonom\|Your Privacy Choices\|SOC 2" dist/*/index.html dist/index.html   # 0

grep -c "<script" dist/terminos/index.html   # 0
```

### Con el navegador

- [ ] **Los tres enlaces legales van en FILA en la barra final, no apilados.**
      Es el bug de especificidad del punto 1 — si los ves en columna, la regla
      quedó en `.pie ul` en vez de `.pie__inner ul`.
- [ ] La marca de agua se ve detrás y **no estorba la lectura** del copyright.
- [ ] Las tres páginas se leen cómodas: una columna, sin líneas larguísimas.
- [ ] **No queda ningún `[[MARCADOR]]` en las tres páginas.** Los datos ya
      están completos.
- [ ] En 390 px el pie apila y la barra final no desborda.
- [ ] 1440 × 900 y 390 × 844.

### Alturas

| | Referencia | Después |
|---|---|---|
| Pie · 1440 | 345 px | |
| Pie · 390 | 664 px | |

---

## Qué NO hacer

- **No copies texto de atonom.ai ni de ningún otro sitio.** Los tres
  documentos de arriba son los que van.
- **No conviertas a Jorge en sociedad.** Es persona física: nada de «S.A. de
  C.V.», «S.C.» ni «Ilhas Technologies». Va su nombre y su domicilio.
- **No cambies «Guadalajara» por «Zapopan».** El C.P. 44690 es de Guadalajara;
  la contradicción está anotada en el punto 0 para que Jorge la confirme.
- **No quites la transferencia internacional del aviso.** HighLevel es
  estadounidense y omitirlo sería la falla más común de un aviso mexicano.
- No inventes cookies: hoy el sitio no pone ninguna.
- No le pongas boletín, sello de certificación ni redes al pie.
- No le quites el `noindex` a las tres páginas.
- No traduzcas «aviso de privacidad» a «política de privacidad».
- No metas los tres documentos en una sola página con pestañas.

---

## Al terminar, reporta

1. Archivos tocados (tres nuevos + `Footer.astro`).
2. `npm run build` y `npm run medios`.
3. Todos los greps.
4. **La contradicción del domicilio**, textual, para que Jorge la confirme
   contra su constancia de situación fiscal: pasó «Zapopan» pero el C.P. 44690
   es de Guadalajara. De ahí depende también la cláusula de jurisdicción.
5. Capturas del pie y de las tres páginas, 1440 y 390.
6. Confirma que dejaste anotado en `docs/` que los tres documentos **no han
   sido revisados por un abogado**.
