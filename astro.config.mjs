// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import swup from '@swup/astro';
import cloudflare from '@astrojs/cloudflare';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue(),swup({
    preload:{
      hover: true,
      visible: false
    }
  })],
  adapter: cloudflare()
});