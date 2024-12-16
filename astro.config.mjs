import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import swup from '@swup/astro';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [tailwind(), vue(),swup({
    preload:{
      hover: true,
      visible: false
    }
  }),sitemap()],
  adapter: cloudflare({
    routes:{
      extend:{
        include: ["src/pages/**/*.astro"]
      }
    }
  })
});