import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Landing statis + island React untuk demo interaktif.
export default defineConfig({
  site: 'https://alvamitra.com',
  integrations: [react()],
});
