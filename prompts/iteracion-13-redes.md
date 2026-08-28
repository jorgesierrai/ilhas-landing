# Iteración 13 — Las redes en las tarjetas de persona

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 28 ago 2026.

> Corre **después** de `prompts/iteracion-12-finanzas.md`, que rehace la
> sección «Quién lo enseña». Rama: **`redes-personas`**.
>
> La referencia `medios/finanzas-referencia.html` **ya trae la fila de redes
> puesta y medida**. Cópiala de ahí.

---

## Dónde va

Las mismas dos personas aparecen en **dos páginas**:

| Página | Sección |
|---|---|
| `/finanzas` | §04 Quién lo enseña |
| `/nosotros` | §01 Quiénes construyen Ilhas |

Las dos usan `TarjetaPersona.astro`, pero **cada página declara sus datos por
separado** (`maestros` en finanzas, `personas` en nosotros). Si los enlaces se
escriben dos veces, en seis meses van a estar desincronizados. **Van a un solo
archivo de datos.**

---

## 1 · Archivo nuevo: `src/data/personas.ts`

```ts
/**
 * Los enlaces públicos de cada persona.
 *
 * Vive aquí y no en cada página porque las dos —/finanzas §04 y /nosotros
 * §01— publican a las mismas dos personas con datos declarados por separado.
 * Duplicar las URLs es la forma más segura de que se desincronicen.
 *
 * URLs LIMPIAS: Jorge las pasó como salieron del botón de compartir de cada
 * app, con parámetros de rastreo (`igsi`, `_t`, `utm_source=share_via`…).
 * Esos parámetros son atribución de una sesión concreta, caducan, y no
 * cambian a dónde llega el enlace. Se guardan sin ellos.
 */

export type Red = "instagram" | "tiktok" | "linkedin" | "sitio";

export interface Enlace {
  red: Red;
  url: string;
  /** Va al `aria-label`. Un ícono sin nombre no existe para un lector de pantalla. */
  etiqueta: string;
}

export const ENLACES: Record<"papa" | "hijo", Enlace[]> = {
  papa: [
    {
      red: "linkedin",
      // OJO: el slug lleva «è» con acento grave, tal como lo pasó Jorge.
      // Va percent-encoded para que no dependa de cómo cada navegador
      // codifique el UTF-8 de la barra de direcciones.
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
```

⚠️ **No “arregles” el orden.** Instagram, TikTok, LinkedIn, portafolio: de la
red más personal a la más profesional, y el sitio propio al final como
destino.

---

## 2 · Componente nuevo: `src/components/IconoSocial.astro`

```astro
---
/**
 * Los glifos de las redes.
 *
 * Instagram, TikTok y LinkedIn van con su MARCA REAL, no con una versión de
 * línea "de la casa": un ícono de red que no se reconoce en el primer vistazo
 * no sirve de nada, y aquí el trabajo del ícono es que lo reconozcas sin leer.
 * El de portafolio no es marca de nadie, así que va como globo de línea del
 * mismo peso visual.
 *
 * Van inline y no por el manifiesto de medios: son marcas de terceros de peso
 * fijo, no ranuras que alguien vaya a fotografiar.
 */
import type { Red } from "../data/personas";
interface Props { red: Red }
const { red } = Astro.props;
---

{red === "instagram" && (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
    <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.4" stroke-width="1.8" />
    <circle cx="12" cy="12" r="4.2" stroke-width="1.8" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)}

{red === "tiktok" && (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
)}

{red === "linkedin" && (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
)}

{red === "sitio" && (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
    <circle cx="12" cy="12" r="9.1" />
    <path d="M2.9 12h18.2" />
    <path d="M12 2.9a13.6 13.6 0 0 1 0 18.2 13.6 13.6 0 0 1 0-18.2z" />
  </svg>
)}

<style>
  svg { width: 1.05rem; height: 1.05rem; display: block; }
</style>
```

---

## 3 · `TarjetaPersona.astro` — la fila

### 3.1 · Props

```ts
import { ENLACES, type Enlace } from "../data/personas";
import IconoSocial from "./IconoSocial.astro";

interface Props {
  …lo que ya tiene…
  /** Enlaces públicos. Sin ellos la tarjeta se ve igual que hoy. */
  redes?: Enlace[];
}
```

`redes` es **opcional**: una tarjeta sin enlaces no debe romperse ni dejar un
separador colgando.

### 3.2 · El marcado, al final de la tarjeta

Después de las atribuciones, **dentro** del cuerpo de la tarjeta:

```jsx
{redes && redes.length > 0 && (
  <div class="redes">
    {redes.map((e) => (
      <a
        href={e.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={e.etiqueta}
      >
        <IconoSocial red={e.red} />
      </a>
    ))}
  </div>
)}
```

⚠️ **`rel="noopener noreferrer"` en los cinco enlaces.** Salen del sitio.

⚠️ **`aria-label` obligatorio.** Un `<a>` cuyo único contenido es un `<svg>`
con `aria-hidden` no tiene nombre accesible: un lector de pantalla lo anuncia
como «enlace» y ya. Las etiquetas ya vienen escritas en `personas.ts`.

### 3.3 · El CSS

```css
  /* Círculos de 2.25 rem (36 px): cumplen el mínimo de área táctil sin
     competir con el CTA de la página. En reposo son gris y borde; el color
     de marca solo aparece al pasar el cursor o al llegar con teclado. */
  .redes {
    display: flex; flex-wrap: wrap; gap: 0.45rem;
    margin-top: 1rem; padding-top: 1rem;
    border-top: 1px solid var(--ilhas-gray);
  }
  .redes a {
    display: grid; place-items: center;
    width: 2.25rem; height: 2.25rem; border-radius: 50%;
    color: #6E6E7A; background: transparent;
    border: 1px solid var(--ilhas-gray);
    transition: color 0.18s ease, border-color 0.18s ease, background 0.18s ease;
  }
  .redes a:hover,
  .redes a:focus-visible {
    color: var(--ilhas-primary);
    border-color: rgba(122, 60, 255, 0.35);
    background: var(--ilhas-primary-10);
  }
  .redes a:focus-visible { outline: 2px solid var(--ilhas-primary); outline-offset: 2px; }
```

⚠️ **La regla `:focus-visible` va aparte del `:hover`,** con su `outline`.
Sin ella, alguien navegando con teclado ve el cambio de color pero no el
anillo, y en el círculo gris no se distingue bien dónde está parado.

⚠️ **`flex-wrap: wrap`.** Cuatro círculos caben de sobra a 640 px, pero la
tarjeta se angosta más en pantallas chicas y no deben desbordar.

---

## 4 · Las dos páginas

### 4.1 · `src/pages/finanzas.astro` — `maestros`

```ts
import { ENLACES } from "../data/personas";
…
const maestros = [
  { nombre: "Jorge Sierra (papá)", …, redes: ENLACES.papa },
  { nombre: "Jorge Sierra (hijo)", …, redes: ENLACES.hijo },
];
```

Y en el `.map`, pásalo: `redes={m.redes}`.

### 4.2 · `src/pages/nosotros.astro` — `personas`

Lo mismo. La primera entrada (finanzas corporativas) lleva `ENLACES.papa`; la
segunda (producto y tecnología), `ENLACES.hijo`.

⚠️ **Ojo con el orden.** En `/nosotros` las dos se llaman «Jorge Sierra» a
secas; se distinguen por el `rol`. **Amarra el enlace al rol, no a la
posición.**

---

## Verificación

```bash
npm run build      # cero warnings
npm run medios     # sin ⚠ nuevos — esto no toca el manifiesto
```

Sobre `dist/`:

```bash
# Los cinco enlaces existen, en las dos páginas
grep -c "instagram.com/soyjorgesierra"        dist/finanzas/index.html dist/nosotros/index.html   # 1 y 1
grep -c "tiktok.com/@jorgesierrai"            dist/finanzas/index.html dist/nosotros/index.html   # 1 y 1
grep -c "jorge-sierra-guerra-product-leader"  dist/finanzas/index.html dist/nosotros/index.html   # 1 y 1
grep -c "jorgesierra.io"                      dist/finanzas/index.html dist/nosotros/index.html   # 1 y 1
grep -c "jorge-sierra-herrera-55270417"       dist/finanzas/index.html dist/nosotros/index.html   # 1 y 1

# Nada de parámetros de rastreo
grep -cE "igsi=|utm_source=share_via|_t=ZS-"  dist/finanzas/index.html dist/nosotros/index.html   # 0 y 0

# Cada enlace externo sale protegido y con nombre
grep -o 'rel="noopener noreferrer"'  dist/finanzas/index.html | wc -l   # ≥ 5
grep -o 'aria-label="[^"]*Jorge'     dist/finanzas/index.html | wc -l   # ≥ 5

grep -c "<script" dist/finanzas/index.html dist/nosotros/index.html     # 0 y 0
```

⚠️ **El del papá tiene que dar 1, no 0.** Si da 0, es porque la `è` se rompió
al codificar. Reporta la cadena exacta que quedó en el HTML.

### Con el navegador

- [ ] Los cuatro glifos **se reconocen a tamaño real** (18 px). Si alguno se
      ve como una mancha, repórtalo con captura.
- [ ] **Abre los cinco enlaces** y confirma que cada uno llega al perfil
      correcto. Reporta cuál abrió qué.
- [ ] Con `Tab` se llega a cada círculo y **se ve el anillo de foco**.
- [ ] La tarjeta del papá, con un solo ícono, **no se ve incompleta** al lado
      de la del hijo con cuatro.
- [ ] En 390 px los cuatro círculos no desbordan la tarjeta.
- [ ] 1440 × 900 y 390 × 844, en las dos páginas.

---

## Qué NO hacer

- No metas las URLs directo en las páginas: viven en `src/data/personas.ts`.
- No devuelvas los parámetros de rastreo a las URLs.
- No cambies el handle de TikTok: la URL dice **`@jorgesierrai`** y esa manda.
- No dibujes versiones «de la casa» de Instagram, TikTok o LinkedIn: se tienen
  que reconocer.
- No pongas los íconos a color de marca en reposo. Cuatro logos a todo color
  en una tarjeta se comen la atención del CTA.
- No dejes ningún `<a>` sin `aria-label`.
- No pongas los enlaces arriba de la tarjeta: van al final, después de la
  trayectoria.

---

## Al terminar, reporta

1. Archivos tocados (dos nuevos + tres modificados).
2. `npm run build` y `npm run medios`.
3. Todos los greps, incluido el del papá.
4. **A dónde llegó cada uno de los cinco enlaces al abrirlos.**
5. Capturas de las dos tarjetas en las dos páginas, 1440 y 390.
