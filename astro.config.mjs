import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import purgecss from "astro-purgecss";
// https://astro.build/config
export default defineConfig({
  output: "server",
  prefetch: {
    defaultStrategy: 'viewport',
    prefetchAll: true
  },
  integrations: [
    tailwind(),
    vue({ appEntrypoint: "/src/pages/_app" }),
    sitemap(),

    purgecss({
      content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
      safelist: ["class-name", "other-class-name"],
      mode: "purge",
      purgeOnly: [
        "src/components/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
      ],
    }),
  ],

  adapter: cloudflare({
    routes: {
      extend: {
        include: ["src/pages/**/*.astro"],
      },
    },
  }),
});
