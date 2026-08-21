# 01 · Arquitectura del sitio

De landing de un solo producto a la casa de la marca.

---

## El modelo

> **Ilhas no es una escuela con un curso de finanzas. Es un método, y hay dos maneras de recibirlo: te lo enseñamos, o te lo hacemos.**

El barco es el método — **I·L·H·A·S**. Las islas son las áreas donde se apunta. Finanzas es la primera. Todo lo que el sitio tiene que lograr es que el visitante entienda el barco y entre a su carril.

### Los dos carriles

| | **Carril A · Formación** | **Carril B · Servicio** |
|---|---|---|
| Qué es | Aprenderlo | Que te lo hagan |
| Quién compra | Persona, con su dinero o el de su empresa | Decisor de empresa, con presupuesto |
| Precio | Público | A cotizar |
| CTA | Reservar lugar en el webinar | Agendar un diagnóstico |
| Escala | Uno a muchos | Uno a uno, paga mejor |
| Hoy | **Ilhas Finanzas** | **Soluciones** (cualquier área) |

Son dos compradores distintos con recorridos distintos. Por eso **el menú se organiza por modo, no por isla**: si navegas por isla primero, metes a los dos a la misma página y luego los separas — y pierdes a los dos.

### Cómo se conectan los dos carriles

No son negocios separados. El carril B **es el techo de la escalera de valor del carril A**: el high ticket del NTPVS son exactamente dos caminos — implementación *done-for-you* (= `/soluciones`) y servicios financieros de alto nivel (= el bloque del papá en `/finanzas`). El webinar alimenta los dos. Ver `03-ntpvs.md`.

---

## El menú

```
ilhas    El Método · Ilhas Finanzas · Soluciones · Nosotros        [Hablemos]
```

- El wordmark es el link al home. Por convención no lleva pestaña de "Inicio".
- **No hay** `Cursos`, `Libros`, `Recursos` ni `Iniciar sesión`. Cada pestaña es una promesa de que hay algo detrás; hoy ninguna de esas tendría con qué llenarse.
- `[Hablemos]` es el botón lleno, con el gradiente de marca. Lleva a `/soluciones` o al agendador — decisión de implementación, ver `02-paginas.md`.

### Cómo crece

Cuando existan Ilhas Operaciones, Customer Success o Soporte, la pestaña **Ilhas Finanzas** se convierte en **Formación** y las islas viven adentro. La estructura aguanta sin rehacerse. Construye las rutas pensando en eso, pero **no crees las páginas vacías hoy**.

**Iniciar sesión** entra el día que exista el portal de alumnos, no antes. Un login que no lleva a ningún lado hace más daño que no tenerlo.

---

## El embudo de Ilhas Finanzas

El webinar y el programa son **un solo embudo**, no dos productos. El sitio solo participa en la primera mitad.

```
┌──────────── EL SITIO · ilhas.ai ────────────┐┊┌──── FUERA · Go High Level ────┐
                                              ┊
 01  Llega de redes o directo                 ┊  04  Webinar
     tráfico frío                             ┊      registro · asistencia · oferta
                                              ┊      eventos.ilhas.ai
 02  Home — entiende Ilhas, elige carril      ┊
     /                                        ┊  05  Programa
                                              ┊      paga y entra al portal
 03  Ilhas Finanzas — un solo botón           ┊      cursos + agentes + el Radar
     /finanzas                                ┊
└──────────────────────────────────────────────┘┊└───────────────────────────────┘
                                     ↑
                          LA COSTURA ESTÁ AQUÍ
```

**La costura está entre el 03 y el 04.** El sitio manda con un clic y ya: no explica el webinar, ni el temario, ni el precio, ni los bonos, ni la oferta. Si lo explica de los dos lados, acabas manteniendo dos copies que se desincronizan en tres semanas.

Implicaciones técnicas:

- `eventos.ilhas.ai` es un subdominio servido por Go High Level. La marca aguanta la costura; el analytics no, salvo que se configure. Ver `06-stack-y-seguridad.md`.
- Todos los enlaces al webinar salen con parámetros UTM consistentes para saber de qué página vino el registro.
- **Ningún formulario del sitio captura leads del webinar.** Ese formulario es de GHL y vive allá.

---

## Reglas que no se rompen

1. **El sitio nunca explica el webinar ni el programa.** Manda a GHL con un clic.
2. **Nada de la oferta del webinar sale gratis.** El Radar y su scoring se quedan del otro lado del pago. Si el sitio lo regala, el webinar deja de tener razón de existir.
3. **No se anuncian islas futuras.** Ni con etiqueta de "próximamente". Cinco islas vacías se leen como promesa; una isla completa sobre un método sólido se lee como prueba.
4. **Los números se atribuyen, no se suman.** Salvo en `/finanzas`, donde la fusión padre-hijo es el pitch.
5. **Cada pestaña del menú es una promesa de que hay algo atrás.**
6. **Cero placeholders en producción.**

---

## Orden de construcción

| # | Qué | Por qué en ese lugar |
|---|---|---|
| 00 | **Bajar los placeholders del sitio actual** | Testimoniales inventados, `[Nombre de tu papá]`, logos "Empresa 1–8", videos "Próximamente". Están públicos ahorita y el riesgo es independiente de todo lo demás |
| 01 | Scaffold del stack | Astro estático con rutas. Ver `06-stack-y-seguridad.md` |
| 02 | `/metodo` | Va primero porque define la voz de todo lo demás, y es la que más material ya escrito tiene |
| 03 | `/` el home | Depende de que el método esté escrito: el home lo resume |
| 04 | `/finanzas` | Corta y con un botón. Rápida una vez que el resto tiene tono |
| 05 | `/soluciones` | Abre el carril de dinero mientras el webinar madura |
| 06 | `/nosotros` | Bloqueada hasta que haya fotos y la bio del papá |
| 07 | Borrar el `index.html` viejo | Solo cuando las cinco páginas estén arriba |
