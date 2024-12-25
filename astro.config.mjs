import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import purgecss from 'astro-purgecss'
import react from '@astrojs/react';
// https://astro.build/config
export default defineConfig({
  output:'server',
  integrations: [tailwind(), vue(), sitemap(), purgecss({
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    safelist: ['class-name', 'other-class-name'],
    mode: 'purge',
    purgeOnly: ['src/components/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}']
  }), react()],
  
  adapter: cloudflare({
    routes: {
      extend: {
        include: ["src/pages/**/*.astro"]
      }
    }
  })
});