// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ilhas.ai',
  output: 'static',
  trailingSlash: 'never',
  build: {
    // La CSP de public/_headers es style-src 'self' sin 'unsafe-inline':
    // un <style> inline en el <head> (lo que Astro hace por defecto con
    // hojas de estilo chicas) el navegador lo bloquea en producción, aunque
    // en `astro preview` local no se note porque no manda esas cabeceras.
    inlineStylesheets: 'never',
  },
});
