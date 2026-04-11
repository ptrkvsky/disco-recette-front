// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
const site =
  process.env.PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'http://localhost:4321';

export default defineConfig({
  site,
  vite: {
    plugins: [
      tailwindcss({
        // Sans ceci, en dev les utilitaires peuvent ne pas être générés (Lightning CSS désactivé hors prod).
        optimize: true,
      }),
    ],
  }
});