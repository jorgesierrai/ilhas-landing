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

## Las cinco reglas que no se rompen

1. **El sitio nunca explica el webinar ni el programa.** Manda a `eventos.ilhas.ai` (Go High Level) con un clic. Nada de temario, precio, bonos ni oferta en este repositorio. Dos explicaciones = dos verdades que se desincronizan.
2. **Nada de la oferta del webinar sale gratis.** El Radar de Oportunidades y su scoring (Tiempo × Dolor × Palanca) **no van en el sitio**. Se pueden nombrar; no se pueden enseñar.
3. **No se anuncian islas futuras.** Ilhas Operaciones / Customer Success / Soporte / Marketing **no aparecen**, ni como "próximamente". El método ya declara que es universal; el visitante extrapola solo.
4. **Los números se atribuyen, nunca se suman.** 40 años y +2,000 empresas son del papá. 12 años y +1B MXN/mes son de Jorge. El "40 + 12" junto solo se usa en `/finanzas`, que es donde los dos se juntan.
5. **Cero placeholders en producción.** Ningún testimonial inventado, ningún `[Nombre de…]`, ningún logo "Empresa 1". Si un dato no existe, el bloque no se publica.

## La regla de tono que manda sobre todas

**La carnita arriba.** Los clientes reales de Ilhas escribieron literalmente "vamos con la carnita, please", "¿a qué hora termina la introducción?" y "comenzamos la nueva era de vender humo". Llegan con prisa y con el detector de humo encendido. Cada página entrega sustancia en el primer scroll o no sirve. Ver `docs/04-voz-del-cliente.md`.

## Estado del repositorio

*Actualizado: 27 ago 2026.*

> **Este bloque se actualiza en cada iteración, no al final.** Es lo primero que
> lee una sesión nueva; si miente, la sesión construye sobre una foto vieja. Lo
> mismo aplica a `medios/ESTADO.md`. Ver el checklist de abajo.

- Rama de trabajo: **`bifurcacion-y-mapa`** (iteración 5), que sale de `hueco-y-data`.
- **El sitio nuevo en Astro está completo**: las cinco rutas existen en `src/pages/`, con la auditoría visual (`AUDITORIA-VISUAL.md`) ya aplicada.
- **Iteraciones cerradas:** 1 (sistema de ranuras) · 2 (activar material) · 3 (hero del home) · 4 (el hueco y el mapa I·L·H·A·S de §02) · 5 (la bifurcación y `MapaEmpresa`). Los briefs viven en `prompts/iteracion-*.md`.
- **Piezas nuevas que conviene conocer antes de tocar nada:**
  - `src/data/mapa.ts` + `src/components/MapaEmpresa.astro` — las trece áreas en tres capas. Un componente, tres variantes (`limpio` / `prueba` / `cimiento`) y una versión mini dentro de la bifurcación del home. **Los rótulos salen de un solo archivo**: no los dupliques.
  - `src/components/Bifurcacion.astro` — dos versiones: la **prominente** (home §04, con el recuadro "Abierto hoy") y la **compacta** (`/metodo` §10). Las dos dicen *qué te llevas*, y el carril de aprender es **el método**, no "Ilhas Finanzas".
  - `src/data/productos.ts` — las seis tarjetas de construcción, tituladas por lo que resuelven. Fuente única del home §05 y de `/soluciones` §03.
  - `src/data/historial.ts` + `Historial.astro` — la línea de tiempo de `/nosotros`.
  - `.bg-lavado` en `src/styles/base.css` — la tercera superficie clara, para cuando dos secciones del mismo fondo se pegarían.
- El `index.html` de la raíz es el sitio viejo (landing de bootcamp, sin rutas). **No lo borres**: Jorge lo conserva para revisar qué rescatar. Le queda un `[Nombre de tu papá]`, que ya no importa porque esa página no se publica.
- **Sistema de medios: montado, prioridad 1 completa.** El sitio declara **39 ranuras** con nombre; dejas caer un archivo con el nombre exacto y aparece solo, sin tocar código. Una ranura vacía no pinta nada en producción. Hoy: **17 de 39 listas, 0 con problema**.
  - **Si vas a trabajar en medios, lee `medios/ESTADO.md` primero.**
  - `npm run medios` te dice qué falta, qué pesa de más y qué no tiene atribución.

### Lo que sigue abierto (no lo inventes: pregúntale a Jorge)

| Tema | Qué falta |
|---|---|
| **Home §06 · quiénes somos** | El home no tiene cara. El material existe (`src/assets/equipo/`, `TarjetaPersona.astro`); falta la decisión de construirlo |
| **`/finanzas` §07 · servicios del papá** | Falta el copy y **a dónde apunta el botón de agenda**. Hoy no hay ninguna URL de agenda en el repositorio |
| **`/nosotros` § La historia** | Tres clips (`nosotros-historia-01/02/03`) sin material |
| **Caption de `nosotros-conferencia`** | Dos briefs del 24 ago se contradicen: conferencia de nov 2017 sin evento, o Talent Land. Va sin caption hasta que se resuelva |
| **Párrafo de intro de la línea de tiempo** | Marcado como `TODO copy` en `src/pages/nosotros.astro`. Lo escribe Jorge |
| **`sitemap.xml`** | Decidido que va, pero **hasta el final**: se genera cuando las rutas y el contenido estén cerrados, como archivo estático en `public/` (sin instalar la integración) |
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
