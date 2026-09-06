// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.ilhas.ai',
  output: 'static',
  trailingSlash: 'never',
  build: {
    // La CSP de public/_headers es style-src 'self' sin 'unsafe-inline':
    // un <style> inline en el <head> (lo que Astro hace por defecto con
    // hojas de estilo chicas) el navegador lo bloquea en producción, aunque
    // en `astro preview` local no se note porque no manda esas cabeceras.
    inlineStylesheets: 'never',
  },
  vite: {
    build: {
      // Una sola hoja de estilos para todo el sitio, en vez de una por
      // componente. Como el CSS no se puede inlinear (ver arriba), cada
      // archivo extra es una petición que bloquea el render: con los
      // componentes de medios /nosotros llegó a cargar cuatro y /finanzas
      // seis, y el "render delay" se comió el 57% del LCP.
      // Todo el CSS del sitio pesa ~64 KB sin comprimir; una petición de eso
      // sale más barata que seis viajes de ida y vuelta.
      cssCodeSplit: false,
    },
  },
});
