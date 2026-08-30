# ilhas.ai — instrucciones del repositorio

Este repositorio es el sitio de **Ilhas**. No es una landing page de un producto.

Antes de escribir una línea de código o de copy, lee **`docs/00-INDEX.md`**. Ahí está el orden de precedencia entre las fuentes, que se contradicen entre sí a propósito (son de épocas distintas del negocio). Si construyes sin leer eso, vas a mezclar tres versiones de Ilhas y ninguna va a ser la correcta.

---

## Qué es Ilhas (una frase)

Ilhas es un **método** —I·L·H·A·S— y hay dos maneras de recibirlo: **te lo enseñamos** (formación) o **te lo hacemos** (consultoría). El método es el barco; las áreas donde se apunta son las islas. Finanzas es la primera.

## Qué es este sitio

Un **hub de marca con cinco páginas**, no un scroll de ventas:

| Ruta | Su único trabajo |
|---|---|
| `/` | Que quien cae de un reel entienda Ilhas en 8 segundos y entre a su carril. Ramifica, no vende. |
| `/metodo` | Probar cómo pensamos. La página madre. No vende. |
| `/finanzas` | Mandar al webinar. Un solo botón. |
| `/soluciones` | Calificar para consultoría. Sin precio. |
| `/nosotros` | Poner cara y trayectoria. |

Aparte del hub viven `/terminos`, `/privacidad` y `/cookies`. **No cuentan como páginas del sitio**: no van en el menú, solo en la barra final del pie, y llevan `noindex`. Son documentos. Ver `docs/06-stack-y-seguridad.md` § "Las tres páginas legales" — incluida la advertencia de que **todavía no las revisa un abogado**.

## Las cinco reglas que no se rompen

1. **El sitio nunca explica el webinar ni el programa.** Manda a `eventos.ilhas.ai` (Go High Level) con un clic. Nada de temario, precio, bonos ni oferta en este repositorio. Dos explicaciones = dos verdades que se desincronizan.
2. **Nada de la oferta del webinar sale gratis.** El Radar de Oportunidades y su scoring (Tiempo × Dolor × Palanca) **no van en el sitio**. Se pueden nombrar; no se pueden enseñar.
3. **No se anuncian islas futuras.** Ilhas Operaciones / Customer Success / Soporte / Marketing **no aparecen**, ni como "próximamente". El método ya declara que es universal; el visitante extrapola solo.
4. **Los números se atribuyen, nunca se suman.** 40 años y +200 empresas son del papá. 12 años y +1B MXN/mes son de Jorge. El "40 + 12" junto solo se usa en `/finanzas`, que es donde los dos se juntan.
5. **Cero placeholders en producción.** Ningún testimonial inventado, ningún `[Nombre de…]`, ningún logo "Empresa 1". Si un dato no existe, el bloque no se publica.

## La regla de tono que manda sobre todas

**La carnita arriba.** Los clientes reales de Ilhas escribieron literalmente "vamos con la carnita, please", "¿a qué hora termina la introducción?" y "comenzamos la nueva era de vender humo". Llegan con prisa y con el detector de humo encendido. Cada página entrega sustancia en el primer scroll o no sirve. Ver `docs/04-voz-del-cliente.md`.

## Estado del repositorio

*Actualizado: 30 ago 2026.*

> **Este bloque se actualiza en cada iteración, no al final.** Es lo primero que
> lee una sesión nueva; si miente, la sesión construye sobre una foto vieja. Lo
> mismo aplica a `medios/ESTADO.md`. Ver el checklist de abajo.

- Rama de trabajo: **`pie-y-legales`**, que sale de `credenciales-hijo`.
- **Dos PRs abiertos sin mergear.** Hasta que entren, `main` no tiene nada de las
  iteraciones 10 a 17:
  - **#17 · `cabeceras-vercel`** — las cabeceras de seguridad. **`public/_headers`
    nunca aplicó: es formato de Netlify y el sitio está en Vercel**, así que hoy
    producción corre sin CSP, sin `X-Frame-Options` y sin `Referrer-Policy`. Van
    en `vercel.json`. Es lo más urgente de la lista.
  - **#18 · `credenciales-hijo`** — iteraciones 10 a 16.
- **El sitio nuevo en Astro está completo**: las cinco rutas del hub más las tres
  legales, con la auditoría visual (`AUDITORIA-VISUAL.md`) ya aplicada.
- **Iteraciones cerradas:** 1 (ranuras) · 2 (activar material) · 3 (hero del home)
  · 4 (el hueco y el mapa I·L·H·A·S) · 5 (bifurcación y `MapaEmpresa`) · 6
  (`/metodo` §01–§04) · 7 (banda Ilhas→Hilas y §05–§09) · 8 (el visor de §07) · 9
  (cirugía de copy) · 10 (productos) · 11 (capas y el experimento como figura) ·
  12 (`/finanzas`) · 13 (redes) · 14 (distinción del papá) · 15 (credenciales del
  hijo) · 16 (el mapa lleno) · 17 (el pie y las legales). Los briefs viven en
  `prompts/iteracion-*.md`.
- **Piezas nuevas que conviene conocer antes de tocar nada:**
  - `src/data/mapa.ts` + `src/components/MapaEmpresa.astro` — las trece áreas en
    tres capas, con **38 renglones de lo que se construye en cada una**. Un
    componente, tres variantes (`limpio` / `prueba` / `cimiento`) y una mini
    dentro de la bifurcación. **Las listas salen SOLO en la variante `prueba`**
    (`/soluciones`): si se cuelan a las otras, `/metodo` se vuelve inmanejable.
    Los 38 valen lo mismo — sin niveles y sin leyenda (Jorge, 30 ago 2026).
  - `src/components/Bifurcacion.astro` — prominente (home §04) y compacta
    (`/metodo` §10).
  - `src/data/productos.ts` — las seis tarjetas, **sin nombres de empresa**: solo
    el tipo o la descripción (Jorge, 28 ago 2026). Coophi es la excepción, es suya.
  - `src/data/personas.ts` — `ENLACES` (redes) y `DISTINCIONES` (la roseta del
    papá, el birrete del hijo). Fuente única para `/finanzas` §04 y `/nosotros` §01.
  - `src/components/BandaHilas.astro` — Ilhas→Hilas, ciclo de 15s, cero JS.
  - `src/layouts/Legal.astro` — capa delgada sobre `Base` para las tres legales:
    agrega el `noindex`, el titular con fecha y la maquetación de documento.
  - `src/components/Footer.astro` — reescrito en la 17: marca, dos columnas,
    logotipo de marca de agua y barra final con lo legal. **La regla de la lista
    va scopeada a `.pie__inner`, no a `.pie`** — con `.pie ul` los tres enlaces
    legales se apilan en columna en vez de ir en fila.
  - `.bg-lavado` en `src/styles/base.css` — la tercera superficie clara.
- El `index.html` de la raíz es el sitio viejo (landing de bootcamp, sin rutas).
  **No lo borres**: Jorge lo conserva para revisar qué rescatar. Le queda un
  `[Nombre de tu papá]`, que ya no importa porque esa página no se publica.
- **Sistema de medios: montado, prioridad 1 completa.** El sitio declara **34
  ranuras** con nombre; dejas caer un archivo con el nombre exacto y aparece
  solo, sin tocar código. Una ranura vacía no pinta nada en producción. Hoy:
  **19 de 34 listas, 0 con problema**.
  - **Si vas a trabajar en medios, lee `medios/ESTADO.md` primero.**
  - `npm run medios` te dice qué falta, qué pesa de más y qué no tiene atribución.

### Lo que sigue abierto (no lo inventes: pregúntale a Jorge)

| Tema | Qué falta |
|---|---|
| **`/finanzas` §07 · servicios del papá** | **Confirmado que va** (Jorge, 27 ago 2026). Faltan dos insumos suyos: el **copy de los servicios** y **a dónde apunta el botón de agenda** — hoy no hay ninguna URL de agenda en el repositorio, el único destino externo es `eventos.ilhas.ai` |
| **`/nosotros` § La historia** | Tres clips (`nosotros-historia-01/02/03`) sin material |
| **Caption de `nosotros-conferencia`** | Dos briefs del 24 ago se contradicen: conferencia de nov 2017 sin evento, o Talent Land. Va sin caption hasta que se resuelva |
| **Párrafo de intro de la línea de tiempo** | Marcado como `TODO copy` en `src/pages/nosotros.astro`. Lo escribe Jorge |
| **Revisión legal** | **Un abogado no ha visto `/terminos`, `/privacidad` ni `/cookies`.** Son borradores sólidos y honestos, escritos para México, pero sin revisar. Es un trámite de una sesión y hoy es un hueco abierto |
| **El domicilio fiscal** | Jorge lo pasó como *Zapopan* y el **C.P. 44690 es de Guadalajara**. Los documentos van con Guadalajara; **falta que lo confirme contra su constancia**, porque de ahí depende la cláusula de jurisdicción |
| **Redes propias de Ilhas** | El pie no lleva íconos de redes: no se sabe si Ilhas tiene cuentas propias. Las de Jorge ya viven en su tarjeta de persona. Si existen, las pasa y se agregan |
| **`sitemap.xml`** | Decidido que va, pero **hasta el final**: se genera cuando las rutas y el contenido estén cerrados, como archivo estático en `public/` (sin instalar la integración). **Las tres legales NO entran**: llevan `noindex` |
| **Hosting y DNS · plataforma del programa** | Ver `docs/00-INDEX.md` § "Lo que NO está resuelto" |

## Convenciones de código

- Stack: **Astro** con salida estática. Sin framework de UI, sin JS de cliente salvo donde sea imprescindible.
- Estilos: CSS propio con los tokens de `docs/marca/tokens.css`. Nada de inventar colores.
- Español de LATAM, trato de "tú". Acentos correctos, siempre.
- Imágenes: viven en el repositorio, en `public/assets/`. Se sirven optimizadas (`astro:assets`), en AVIF/WebP con fallback.
- Accesibilidad: contraste AA mínimo, foco visible, `alt` real en toda imagen con contenido.
- Sin dependencias que no sean necesarias. Cada `npm install` se justifica.

## Antes de dar por terminado cualquier cambio

- [ ] ¿Respeta las cinco reglas de arriba?
- [ ] ¿El copy usa el vocabulario de `docs/04-voz-del-cliente.md` y no invenciones?
- [ ] ¿Los colores y tipografías salen de `docs/marca/`?
- [ ] ¿Corre `npm run build` sin warnings?
- [ ] Si tocaste medios: ¿`npm run medios` sin ningún ⚠?
- [ ] ¿Pasa el checklist de seguridad de `docs/06-stack-y-seguridad.md`?
- [ ] ¿Se ve premium, claro y sin humo? ¿Podría vivir junto a Apple, Mindvalley o MasterClass?
- [ ] **¿Actualizaste el "Estado del repositorio" de arriba?** Rama, iteración cerrada, piezas nuevas y lo que quedó abierto. Si tocaste medios, también `medios/ESTADO.md`. **No es opcional y no se deja para el final**: es lo primero que lee la siguiente sesión, y un estado viejo hace que construya sobre una foto que ya no existe. Ya pasó: llegó a estar cuatro iteraciones atrasado.
- [ ] ¿Los `docs/` siguen describiendo el sitio que existe? Si moviste un bloque, `docs/02-paginas.md` cambia con él — y si un bloque que el doc promete **no** está construido, márcalo como hueco en vez de borrarlo.
