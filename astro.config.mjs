import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
// https://astro.build/config
export default defineConfig({
  output: 'server',
  
  integrations: [tailwind(), vue(),sitemap()],
  adapter: cloudflare({
    routes:{
      extend:{
        include: ["src/pages/**/*.astro"]
      }
    }
  })
});