# Prompts para Claude Code

Cinco prompts, en orden. **No los pegues todos juntos.** Cada uno termina en un commit revisable; si algo se tuerce, se tuerce en una etapa y no en el sitio entero.

Abre Claude Code en la raíz de este repositorio y confirma que estás en la rama `revision-landing`.

---

## ETAPA 0 — Bajar los placeholders (hazla hoy, no depende de nada)

```
Lee CLAUDE.md y docs/06-stack-y-seguridad.md.

El index.html de la raíz está publicado en ilhas.ai ahorita mismo y contiene prueba
social inventada. Quítala. Solo eso: no rediseñes, no reestructures, no toques nada más.

Elimina del index.html:
1. Los dos testimoniales inventados: "María González, Fundadora, Estudio Creativo" y
   "Carlos Ramírez, Desarrollador Inmobiliario", con todo y su sección contenedora
   ("Resultados que hablan por sí solos") si queda vacía.
2. La marquesina de logos "Empresa 1" a "Empresa 8" y su título
   "Han confiado en nuestra metodología".
3. Los dos bloques de video con play falso marcados "Próximamente" y "En producción".
4. El contador de escasez "Solo para los primeros 10 | Quedan 7 cupos" y la barra
   superior que lo contiene.

Deja en su lugar, por ahora, los placeholders "[Nombre de tu papá]" y "[Tu papá]":
avísame cuáles son las líneas exactas para que yo te pase el nombre real.

Al terminar, muéstrame un diff resumido y haz commit con el mensaje:
"fix: quitar prueba social inventada del sitio en producción"
```

---

## ETAPA 1 — Scaffold

```
Lee CLAUDE.md, docs/00-INDEX.md y docs/06-stack-y-seguridad.md completos antes de tocar
nada. El docs/00-INDEX.md declara qué fuente gana cuando dos se contradicen: respétalo.

Monta el proyecto Astro estático que describe docs/06-stack-y-seguridad.md, dentro de
este mismo repositorio, sin borrar el index.html viejo (se queda como referencia hasta
que las cinco páginas estén listas).

Entregables de esta etapa:
- Proyecto Astro con salida estática y las cinco rutas creadas pero vacías:
  /, /metodo, /finanzas, /soluciones, /nosotros
- src/styles/tokens.css copiado tal cual de docs/marca/tokens.css, más un base.css
  con reset, tipografía base y utilidades mínimas. Nada de Tailwind.
- Space Grotesk (600) e Inter (400,500,600) descargadas como .woff2 a
  public/assets/fonts/ y declaradas con @font-face y font-display:swap.
  NO uses Google Fonts por CDN.
- Layout base con <head> completo (meta, Open Graph, favicon del isotipo), skip link,
  header con el menú de docs/01-arquitectura.md, y footer.
- El set completo de favicon generado desde public/assets/logo/logo-mark.svg.
- public/_headers con las cabeceras de seguridad exactas del doc.
- robots.txt y .well-known/security.txt.

Restricciones: cero JavaScript de cliente. Cero <script> inline (la CSP no lleva
'unsafe-inline'). Cero dependencias más allá de Astro.

Cuando termines: corre npm run build, enséñame la salida, y confírmame que el header
renderiza igual en las cinco rutas antes de hacer commit.
```

---

## ETAPA 2 — `/metodo`

```
Lee docs/02-paginas.md (sección /metodo), docs/04-voz-del-cliente.md y
docs/marca/00-LEEME-PRIMERO.md.

Construye /metodo con los diez bloques en el orden especificado.

Esta página define la voz de todo el sitio, así que trabájala con cuidado:
- El copy sale de la Biblia de Producto y el Deck del Método, pero TRADUCIDO. Los
  originales están escritos para Jorge ("tu cliente", "tu webinar", "guárdate esta
  distinción"). Nada de eso puede aparecer. Escribe para un desconocido.
- Prohibido el ángulo "el financiero atrapado en reportes es un PM malo". Lee el
  bloque 3 del spec: la conexión es al revés.
- NO publiques el Radar de Oportunidades. Puedes decir que el método empieza cazando
  dónde duele; el scoring Tiempo × Dolor × Palanca y el procedimiento se quedan fuera.
- La tabla del mapeo I·L·H·A·S ↔ oficio de producto es el corazón de la página.
  Que se vea bien y que scrollee horizontal en móvil sin romper el body.
- Termina bifurcando a /finanzas y /soluciones. No vendas nada aquí.

Antes de escribir el copy final, enséñame los titulares de los diez bloques para
aprobarlos. Después ya redacta todo.
```

---

## ETAPA 3 — `/` el home

```
Lee docs/02-paginas.md (sección /), docs/01-arquitectura.md y docs/04-voz-del-cliente.md.

Construye el home con los siete bloques del spec.

Dos cosas mandan sobre todo lo demás:
- El bloque 04 (la bifurcación: "¿quieres aprenderlo?" vs "¿quieres que lo
  implementemos?") es el CTA de esta página y el corazón del sitio. Dos tarjetas
  del mismo peso visual, arriba del pliegue en escritorio si se puede. No lo
  entierres ni lo hagas chiquito.
- Este home no vende. Ramifica. Si un bloque se siente a página de ventas, quítalo.

La línea de identidad del hero (bloque 01) NO está decidida. El spec tiene tres
candidatas. NO elijas tú: enséñamelas, dime cuál recomiendas y por qué, y espera
a que yo decida antes de escribir el hero.
```

---

## ETAPA 4 — `/finanzas`

```
Lee docs/02-paginas.md (sección /finanzas), docs/03-ntpvs.md completo y
docs/04-voz-del-cliente.md completo.

Construye /finanzas con los siete bloques del spec. Es la página más corta del sitio.

Lo crítico:
- Le habla a PROFESIONALES DE FINANZAS —analista, contador, controller, auditor,
  tesorero, FP&A— no a dueños de negocio. El index.html viejo se equivoca en esto.
- Un solo CTA principal: "Reservar mi lugar en el webinar" → https://eventos.ilhas.ai
  con UTM: ?utm_source=sitio&utm_medium=web&utm_campaign=webinar&utm_content=finanzas
- CERO temario, precio, bonos, garantía, cupos o contador. Todo eso vive en Go High
  Level. Esta página es la puerta, no la página de ventas.
- El bloque 02 ("esto es lo que vas a poder hacer") se escribe con las palabras
  literales de docs/04-voz-del-cliente.md. No las mejores, no las hagas más elegantes.
- El FAQ del bloque 06 lleva EXACTAMENTE cuatro temas: seguridad y confidencialidad,
  licencias, qué herramienta, formatos. Ni uno más.
- El bloque 07 (servicios financieros del papá) va abajo, visualmente subordinado,
  con su propio botón de agenda. Es otro comprador y no compite por el mismo clic.
- Aquí SÍ va el "40 + 12" de padre e hijo juntos. Es la única página donde va.
```

---

## ETAPA 5 — `/soluciones` y `/nosotros`

```
Lee docs/02-paginas.md (secciones /soluciones y /nosotros) y docs/05-assets.md.

/soluciones — cuatro bloques del spec. Califica, no vende. Sin precio en la página.
El contenido ya existe: es la tabla de linaje (Stampay, Nomcont, Cometa AI Data
Concierge, Nomada, Paystand, Factumizer) reencuadrada como portafolio de soluciones
de IA para empresas, no como credibilidad de un curso de finanzas.
Si no hay logos de clientes con permiso, no pongas bloque de logos. Nada de "Empresa 1".

/nosotros — tarjetas individuales, una por persona, como participantes de Ilhas.
NO como dúo padre-hijo: ese relato es de /finanzas.
Números atribuidos, nunca sumados.
Esta página está BLOQUEADA: falta el nombre real del papá, su bio y las fotos.
Constrúyela con la estructura lista y déjame marcado exactamente qué datos faltan.
No la publiques con placeholders y no la pongas en el menú hasta que esté completa.

Al terminar las dos: corre el checklist completo de docs/06-stack-y-seguridad.md,
enséñame los resultados de Lighthouse, y solo entonces borra el index.html viejo.
```

---

## Cómo dar feedback entre etapas

Si algo no te gusta, sé específico sobre **qué regla se rompió**, no sobre el gusto. Por ejemplo:

- *"El bloque 3 está explicando el webinar. Regla 1 de CLAUDE.md."*
- *"Ese número está sumado. Regla 4."*
- *"Esto suena a intro larga. Lee docs/04-voz-del-cliente.md otra vez."*

Claude Code corrige mucho mejor contra una regla escrita que contra "no me convence".
