# Iteración 16 — El mapa se llena: las trece áreas, con lo que se construye en cada una

**Para Claude Code. Ejecuta esto tal cual.**
Decidido con Jorge el 28 ago 2026.

> Rama: **`mapa-lleno`**, salida de donde quedó la 15.
>
> **Referencia: `medios/mapa-lleno-referencia.html`.** Ya está construida y
> medida. Ábrela y cópiala.

---

## Qué cambia, y por qué es más que agregar texto

Hoy el mapa marca **6 áreas de 13** y las otras siete van vacías. Jorge pasó la
lista completa: **38 cosas repartidas en las trece áreas.**

Eso cambia lo que el mapa afirma:

| | Hoy | Después |
|---|---|---|
| Qué muestra | Las áreas donde Ilhas ya entró | Lo que se construye en **cada** área |
| Qué prueba | Track record: 6 de 13 | Alcance del método: 13 de 13 |
| Riesgo | Se ve corto | **Se puede leer como «hacemos todo»** |

⚠️ **Ahí está el problema que esta corrida tiene que resolver.** La leyenda de
hoy dice *«Las áreas marcadas son donde Ilhas ya construyó y dejó corriendo un
sistema»*. Con 38 renglones, esa frase deja de ser cierta: varios de la lista
son **prácticas o disciplinas**, no sistemas entregados a un cliente —
*Harness engineering*, *Spec driven development*, *Data science*, *Apps*.
Publicarlos bajo esa leyenda sería una claim falsa.

**La salida es que el mapa hable en dos niveles**, no en uno:

1. **Todo lo listado** = lo que se construye en esa área con el método.
2. **Lo marcado con punto morado** = lo que **ya está corriendo con un
   cliente.**

Así el mapa gana el alcance que Jorge quiere **sin perder** la credibilidad que
hoy tiene, que es lo único que lo hace valer.

---

## 2 · Qué está marcado, y qué falta por confirmar

De los 38, **solo se marcan los 7 que el mapa ya reconocía como entregas
reales** (vienen de `productos.ts` y de los casos con cliente):

| Área | Marcado |
|---|---|
| Ventas y cierre | Cotizador |
| Cobranza | Cobranza automática · Avisos a clientes |
| Producción y manufactura | Despiece |
| Finanzas corporativas | Cuentas por cobrar y por pagar |
| Contabilidad e impuestos | Conciliación bancaria |
| Talento humano | Suite de nómina y timbrado |

⚠️ **No marques ninguno más por tu cuenta.** Hay varios que *parecen*
entregados —«Pagos B2B», «Infraestructura de pagos», «Apps»— y probablemente lo
estén, pero **eso lo confirma Jorge, no tú.** Un punto de más en este mapa es
exactamente el tipo de claim que el sitio no hace.

**Deja esa pregunta anotada en el reporte final:** cuáles de los otros 31 ya
están corriendo con un cliente.

---

## 3 · `src/data/mapa.ts` — la estructura

`pruebas?: string[]` se queda corto: ahora cada área tiene una lista donde
**cada renglón sabe si ya está entregado o no.**

```ts
export interface ItemArea {
  nombre: string;
  /** true solo si YA está corriendo con un cliente. Se marca con punto. */
  hecho?: boolean;
}

export interface AreaMapa {
  id: string;
  nombre: string;
  /**
   * Lo que se construye en esta área con el método. Se muestra completo en la
   * variante "prueba" (/soluciones); las otras variantes solo pintan el
   * nombre del área.
   *
   * `hecho: true` marca lo que ya está corriendo con un cliente. Esa marca es
   * lo único que separa este mapa de un catálogo de servicios, así que NO se
   * pone sin que Jorge lo confirme.
   */
  construye?: ItemArea[];
}
```

**El contenido completo** (copia literal, respetando orden — lo hecho va
primero en su área):

```ts
// Cadena de ingresos
marketing:   ["Agentes de generación de contenido", "Automatización de CRM", "Creación de CRM"]
ventas:      [{Cotizador, hecho}, "Bots para llamadas de ventas"]
posventa:    ["Reportes automatizados", "Agentes de WhatsApp de soporte", "Agentes de análisis de quejas"]
cobranza:    [{Cobranza automática, hecho}, {Avisos a clientes, hecho},
              "Recordatorios por WhatsApp", "Recordatorios por push y correo", "Pagos B2B"]

// Motor de valor
ingenieria:  ["Programación agéntica", "Harness engineering", "Spec driven development",
              "Orquestador on call", "Bug bot"]
suministro:  ["Agente de optimización de rutas"]
produccion:  [{Despiece, hecho}, "Planeación de la producción"]
entrega:     ["Agentes orquestadores que actualizan el ERP"]

// Cimiento
finanzas:      [{Cuentas por cobrar y por pagar, hecho}, "Agentes financieros"]
contabilidad:  [{Conciliación bancaria, hecho}, "Conciliación fiscal"]
administracion:["Infraestructura bancaria", "Infraestructura de pagos",
                "Automatización de reportes", "Agentes recomendadores de inversión",
                "Facturación electrónica"]
talento:       [{Suite de nómina y timbrado, hecho}, "Agentes clasificadores de perfiles",
                "Analizadores de CV"]
tecnologia:    ["Algoritmos de machine learning", "Data science",
                "Bases de datos y data lakes", "Apps"]
```

⚠️ **Mayúscula de oración**, no Title Case: «Bots para llamadas de ventas», no
«Bots para Llamadas de Ventas». Todo el sitio va así.

⚠️ **Dos ajustes de redacción sobre lo que pasó Jorge**, para que quepan y
lean parejo: *«Montado de bases de datos y data lakes»* → **«Bases de datos y
data lakes»**; *«Agentes orquestadores que actualizan ERP»* → **«…que
actualizan el ERP»**. Nada más.

⚠️ **Se cae `pruebas`.** Actualiza el comentario de cabecera de `mapa.ts`: ya
no describe «los builds de Ilhas», describe «lo que se construye en cada área,
con marca en lo que ya está corriendo».

---

## 4 · `src/components/MapaEmpresa.astro`

### 4.1 · Solo cambia la variante `prueba`

**Las otras tres variantes no se tocan.** `limpio` (`/metodo`) y `cimiento`
(`/finanzas`) siguen pintando solo el nombre del área; el resumen mini del home
tampoco cambia. Si las listas aparecen en `/metodo`, esa página —que ya es la
más alta del sitio— se vuelve inmanejable.

### 4.2 · El área deja de ser una píldora

En la variante `prueba`, cada área pasa de píldora a **columna con título y
lista**. Cópialo de la referencia.

⚠️ **Sin tarjeta ni borde alrededor del área.** Se probó con tarjeta: las
áreas de un solo ítem («Cadena de suministro», «Ejecución y entrega») quedaban
como cajas altas medio vacías al lado de las de cinco, y el vacío se veía más
que el contenido. Una regla de 2 px arriba basta para separar una columna de
otra, y le quita 100 px al mapa.

⚠️ **`align-items: start` en la rejilla de áreas.** Sin eso las columnas se
estiran a la más alta y vuelve el problema del hueco.

### 4.3 · El CSS

```css
  .capa__areas {
    list-style: none; margin: 0; padding: 0;
    display: grid; gap: 1.15rem; align-items: start;
  }

  .area { padding-top: 0.6rem; border-top: 2px solid var(--ilhas-gray); }
  .capa--base .area { border-top-color: rgba(248, 250, 255, 0.18); }

  .area__nombre { font-weight: 600; font-size: 0.875rem; line-height: 1.3; color: var(--ilhas-dark); }
  .capa--base .area__nombre { color: #fff; }

  .area ul { list-style: none; margin: 0.6rem 0 0; padding: 0; display: grid; gap: 0.3rem; }
  .area li {
    position: relative; padding-left: 0.85rem;
    font-size: 0.8125rem; line-height: 1.4; color: #6E6E7A;
  }
  .capa--base .area li { color: rgba(248, 250, 255, 0.62); }
  .area li::before {
    content: ""; position: absolute; left: 0; top: 0.55em;
    width: 0.3rem; height: 1.5px; border-radius: 1px; background: #C3C3CE;
  }
  .capa--base .area li::before { background: rgba(248, 250, 255, 0.3); }

  /* Lo que YA está corriendo con un cliente: punto morado lleno y tinta
     plena. Es la única distinción del mapa y la que carga toda la
     credibilidad — sin ella esto sería un catálogo de servicios. */
  .area li.hecho { color: var(--ilhas-dark); font-weight: 500; }
  .capa--base .area li.hecho { color: #fff; }
  .area li.hecho::before {
    width: 0.4rem; height: 0.4rem; border-radius: 50%; top: 0.5em;
    background: var(--ilhas-primary);
  }
  .capa--base .area li.hecho::before { background: #B487FF; }

  @media (min-width: 720px) {
    .capa__areas { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (min-width: 1000px) {
    .capa__areas { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .capa--base .capa__areas { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  }
```

⚠️ **El cimiento va a 5 columnas, no a 4:** tiene cinco áreas y con cuatro
columnas la quinta se cae sola a un segundo renglón y se ve rota.

⚠️ **El punto del cimiento es `#B487FF`, no `--ilhas-primary`.** El morado de
marca sobre `--ilhas-dark` no alcanza contraste; ese lila sí. Es el mismo
criterio que ya usa el componente para el texto de esa capa.

---

## 5 · La leyenda — el cambio que hace honesta la corrida

`MapaEmpresa.astro:~69`

```
- Las áreas marcadas son donde Ilhas ya construyó y dejó corriendo un
- sistema.
+ Lo marcado con punto es lo que <b>Ilhas ya construyó y dejó corriendo</b>
+ con un cliente. El resto es lo que se construye en cada área con el mismo
+ método.
```

Sin ese segundo enunciado, las 38 líneas quedan todas bajo una afirmación que
no las cubre. **Esta frase no es opcional.**

---

## Verificación

```bash
npm run build      # cero warnings
npm run medios     # sin ⚠ nuevos
```

Sobre `dist/`:

```bash
# Las 36 están, y solo en /soluciones
grep -o "Harness engineering"        dist/soluciones/index.html | wc -l   # 1
grep -c "Harness engineering"        dist/metodo/index.html               # 0
grep -c "Harness engineering"        dist/finanzas/index.html             # 0
grep -c "Harness engineering"        dist/index.html                      # 0

# Exactamente 7 marcados, ni uno más — son 7 ítems en 6 áreas: Cobranza trae dos
grep -o 'class="[^"]*hecho[^"]*"'    dist/soluciones/index.html | wc -l   # 7

# La leyenda nueva
grep -c "lo que se construye en cada área" dist/soluciones/index.html     # 1
grep -c "Las áreas marcadas son donde"     dist/soluciones/index.html     # 0

# Nada de Title Case colado
grep -c "Llamadas de Ventas\|Optimización de Rutas\|Bases de Datos" dist/soluciones/index.html  # 0

grep -c "<script" dist/soluciones/index.html   # 0
```

### Con el navegador

- [ ] **Cuenta los puntos morados: tienen que ser exactamente 7.** (Siete
      ítems en seis áreas — Cobranza trae dos.) Si hay más, alguien marcó de más.
- [ ] Las trece áreas están y ninguna quedó vacía.
- [ ] **`/metodo` y `/finanzas` NO crecieron.** Mide sus mapas antes y después:
      deben dar lo mismo. Si crecieron, las listas se colaron a una variante
      que no debía.
- [ ] En el cimiento oscuro, los puntos lilas y el texto se leen bien.
- [ ] Ninguna columna se estira dejando hueco abajo.
- [ ] En 390 px no hay scroll horizontal y las áreas apilan legibles.
- [ ] 1440 × 900 y 390 × 844.

### Alturas — repórtalas

| | Antes | Referencia | Después |
|---|---|---|---|
| Mapa en `/soluciones` · 1440 | | 771 px | |
| Mapa en `/soluciones` · 390 | | 1,972 px | |
| Mapa en `/metodo` · 1440 | | *(sin cambio)* | |
| Mapa en `/finanzas` · 1440 | | *(sin cambio)* | |
| `/soluciones` total | | | |

En móvil el mapa mide 1,972 px. Es mucho, y es el costo de 38 renglones — pero
si se pasa de **2,100 px**, dilo con la medida y lo revisamos.

---

## Qué NO hacer

- **No marques como «hecho» nada fuera de los 7 listados.** Ni «Pagos B2B», ni
  «Infraestructura de pagos», ni «Apps». Eso lo confirma Jorge.
- **No dejes la leyenda vieja.** Con 38 renglones se vuelve falsa.
- No metas las listas en las variantes `limpio` ni `cimiento`.
- No conviertas las áreas en tarjetas con borde.
- No pases los textos a Title Case.
- No inventes ítems para rellenar áreas que traen uno solo: «Cadena de
  suministro» tiene uno y así se queda.
- No uses `--ilhas-primary` para el punto sobre el cimiento oscuro.

---

## Al terminar, reporta

1. Archivos tocados.
2. `npm run build` y `npm run medios`.
3. Todos los greps, en especial **el conteo de puntos morados = 7**.
4. Capturas del mapa en `/soluciones` (1440 y 390) y de `/metodo` y
   `/finanzas` para probar que no crecieron.
5. La tabla de alturas.
6. **La pregunta abierta para Jorge:** cuáles de los otros 31 ítems ya están
   corriendo con un cliente y deberían llevar punto.
