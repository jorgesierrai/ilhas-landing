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

- Rama de trabajo: **`revision-landing`**.
- El `index.html` de la raíz es el sitio viejo (una landing de bootcamp de 1,293 líneas, sin rutas). Se conserva como referencia hasta que el sitio nuevo esté completo, luego se borra.
- **Deuda urgente e independiente de todo lo demás:** ese `index.html` está publicado hoy con testimoniales inventados (María González, Carlos Ramírez), `[Nombre de tu papá]`, logos "Empresa 1–8" y videos "Próximamente". Es lo primero que se corrige. Ver `docs/06-stack-y-seguridad.md`.

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
- [ ] ¿Pasa el checklist de seguridad de `docs/06-stack-y-seguridad.md`?
- [ ] ¿Se ve premium, claro y sin humo? ¿Podría vivir junto a Apple, Mindvalley o MasterClass?
