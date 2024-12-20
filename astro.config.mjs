import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import vue from '@astrojs/vue';
import purgecss from 'astro-purgecss'
// https://astro.build/config
export default defineConfig({
  build:{
     inlineStylesheets: 'never'
  },
  integrations: [tailwind(), vue(), sitemap(),purgecss()],
  adapter: cloudflare({
    routes: {
      extend: {
        include: ["src/pages/**/*.astro"]
      }
    }
  })
});