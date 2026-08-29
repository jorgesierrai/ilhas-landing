# Iteración 15 — Las dos credenciales que le faltan a Jorge hijo

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 28 ago 2026.

> Corre **después** de la iteración 14, que ya está aplicada. Rama:
> **`credenciales-hijo`**.
>
> `medios/finanzas-referencia.html` ya lo trae puesto y medido.

---

## Qué falta y por qué importa

La tarjeta de Jorge hijo hoy prueba que **construye**: 12 años, +1,000 MDP/mes.
No prueba nada sobre **IA**, que es el tema del sitio entero — y la sección se
llama «Quién lo enseña».

Faltan dos cosas, y son de naturaleza distinta, así que van en lugares
distintos:

| Dato | Qué es | Dónde va |
|---|---|---|
| Construyendo IA y con IA desde 2016 | Un dato contable de tiempo | **Atribución**, con las otras dos |
| Maestría en Algoritmos de Optimización y ML | Una credencial académica | **Distinción**, como la del papá |

Con esto, las dos tarjetas quedan parejas: **tres atribuciones y una distinción
cada una.** Hoy la del hijo tiene dos y ninguna, y por eso se le veía el hueco
abajo.

---

## 1 · La atribución de 2016

**`src/pages/finanzas.astro`** y **`src/pages/nosotros.astro`**, en la entrada
del hijo:

```ts
    atribuciones: [
      { dato: "12 años", contexto: "construyendo productos digitales" },
      { dato: "+1,000 MDP/mes", contexto: "procesados por productos que ha liderado" },
+     { dato: "Desde 2016", contexto: "construyendo IA, y con IA" },
    ],
```

**Va al final, no al principio.** La lista no es cronológica: es de lo más
general a lo más específico, y «desde 2016 con IA» acota lo que dicen los dos
renglones de arriba.

⚠️ **Los `contexto` de `/nosotros` son distintos a los de `/finanzas`** y así
se quedan. Solo se agrega el renglón nuevo, con el mismo texto en las dos.

💡 **Este dato no es una claim suelta: el sitio ya lo prueba.** La línea de
tiempo de `/nosotros` (`src/data/historial.ts`) trae **2016 · Investigación y
desarrollo de algoritmos · Coophi**, y luego 2017 con PLN y la conferencia de
nov 2017. La atribución resume hitos que ya están documentados.

---

## 2 · La distinción — dos cambios al tipo

La `Distincion` de la iteración 14 asume que siempre hay un «dónde» y que la
marca siempre es una roseta. Las dos cosas dejan de ser ciertas.

### 2.1 · `src/data/personas.ts`

```ts
export interface Distincion {
  /** El reconocimiento. Va en negritas. */
  texto: string;
  /**
   * Dónde y en qué. Va debajo, más chico.
   * OPCIONAL: no toda distinción nombra una institución.
   */
  fuente?: string;
  /**
   * Qué marca la acompaña. Una roseta es un reconocimiento —alguien te lo
   * dio—; un birrete es un grado —tú lo estudiaste—. No son lo mismo y no
   * comparten glifo.
   */
  icono: "roseta" | "birrete";
}

export const DISTINCIONES: Record<"papa" | "hijo", Distincion | undefined> = {
  papa: {
    texto: "Mejor evaluado por sus alumnos",
    fuente: "Finanzas · Tec de Monterrey",
    icono: "roseta",
  },
  hijo: {
    texto: "Estudió Maestría en Algoritmos de Optimización y Machine Learning",
    icono: "birrete",
  },
};
```

⚠️ **«Estudió» va porque así lo escribió Jorge.** No lo quites por tu cuenta
para que suene más fuerte: si el grado no está titulado, quitarlo publica una
credencial que no es. Solo Jorge puede cambiar esa palabra.

⚠️ **El hijo no lleva `fuente`.** Jorge no dijo en qué institución. **No la
inventes ni la deduzcas.**

### 2.2 · `src/components/TarjetaPersona.astro`

El `<svg>` de la roseta se vuelve condicional, y entra el birrete:

```jsx
<p class="distincion">
  {distincion.icono === "roseta" && (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="9" r="6" />
      <path d="M8.6 14.2 7 22l5-2.6L17 22l-1.6-7.8" />
    </svg>
  )}
  {distincion.icono === "birrete" && (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M2.4 8.6 12 4.4l9.6 4.2-9.6 4.2z" />
      <path d="M6.6 10.5V15c0 1.5 2.4 2.7 5.4 2.7s5.4-1.2 5.4-2.7v-4.5" />
      <path d="M21.6 8.6v5" />
    </svg>
  )}
  <span>
    <b>{distincion.texto}</b>
    {distincion.fuente && <em>{distincion.fuente}</em>}
  </span>
</p>
```

⚠️ **El `<em>` va condicionado.** Sin eso, la tarjeta del hijo renderiza un
`<em>` vacío que igual ocupa su `margin-top` y deja un renglón fantasma
debajo del texto.

⚠️ **El CSS de `.distincion` no cambia.** Los dos glifos están dibujados al
mismo peso (`stroke-width: 1.7`) y en la misma caja de 24, así que ocupan lo
mismo.

### 2.3 · Pasarla desde las dos páginas

En la entrada del hijo, en `finanzas.astro` y en `nosotros.astro`:

```ts
    distincion: DISTINCIONES.hijo,
```

El `.map` ya la pasa; no hay que tocarlo.

---

## Verificación

```bash
npm run build      # cero warnings
npm run medios     # sin ⚠ nuevos
```

Sobre `dist/`:

```bash
grep -c "Desde 2016"                          dist/finanzas/index.html dist/nosotros/index.html  # 1 y 1
grep -c "construyendo IA, y con IA"           dist/finanzas/index.html dist/nosotros/index.html  # 1 y 1
grep -c "Estudió Maestría en Algoritmos"      dist/finanzas/index.html dist/nosotros/index.html  # 1 y 1
grep -c "Machine Learning"                    dist/finanzas/index.html dist/nosotros/index.html  # 1 y 1

# Las dos distinciones conviven, cada una con su glifo
grep -c 'class="distincion"'                  dist/finanzas/index.html   # 2
grep -o "M2.4 8.6"                            dist/finanzas/index.html | wc -l   # 1 — birrete, solo el hijo
grep -o "M8.6 14.2"                           dist/finanzas/index.html | wc -l   # 1 — roseta, solo el papá

# Nada inventado
grep -ci "tec de monterrey"                   dist/finanzas/index.html   # 1, solo la del papá
grep -c "<em></em>"                           dist/finanzas/index.html   # 0
```

### Con el navegador

- [ ] **Las dos tarjetas quedan parejas**: tres atribuciones y una distinción
      cada una, y las filas de íconos alineadas al fondo. Captura las dos
      juntas — es el punto de esta corrida.
- [ ] **El birrete se ve como birrete** a 16 px, no como una mancha ni como la
      roseta. Compáralos lado a lado.
- [ ] La distinción del hijo, sin `fuente`, **no deja renglón vacío debajo**.
- [ ] «Machine Learning» **no se parte a la mitad** en 390 px.
- [ ] La distinción del hijo es de dos renglones y la del papá también, así
      que las dos tarjetas deben cerrar casi a la misma altura.
- [ ] 1440 × 900 y 390 × 844, en las dos páginas.

### Alturas — repórtalas

| | Antes de la 15 | Referencia | Después |
|---|---|---|---|
| `/finanzas` §04 · 1440 | 1,683 px | 1,705 px | |
| `/finanzas` §04 · 390 | 2,192 px | 2,293 px | |
| `/nosotros` §01 · 1440 | | | |

Solo crece 22 px en escritorio: la tarjeta del hijo estaba llenando hueco que
ya existía. Ese era el punto.

---

## Qué NO hacer

- **No le quites el «Estudió»** al texto de la maestría.
- No le inventes institución, año ni ciudad a la maestría.
- No uses la roseta para el grado ni el birrete para el reconocimiento.
- No pongas «Desde 2016» arriba de las otras atribuciones.
- No toques las atribuciones ni la distinción del papá.
- No cambies el CSS de `.distincion`.
- No conviertas la maestría en atribución: no es un dato contable.

---

## Al terminar, reporta

1. Archivos tocados.
2. `npm run build` y `npm run medios`.
3. Todos los greps, incluido el del `<em>` vacío en 0.
4. Captura de las dos tarjetas juntas, en las dos páginas, 1440 y 390.
5. Un recorte de los dos glifos a tamaño real, lado a lado.
6. La tabla de alturas.
