// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    'nuxt-booster',
    '@nuxt/fonts',
    '@vesp/nuxt-fontawesome',
    'nuxt-swiper',
    "@nuxtjs/cloudinary"
  ],
  fontawesome: {
    icons: {
      solid: ['search', 'sign-out-alt ', 'redo', 'plus', 'list', 'chevron-down', 'coins', 'home', 'code', 'download', 'plus-circle', 'times', 'bars', 'circle', 'heart', 'chevron-left', 'chevron-right', 'lightbulb', 'shield-alt', 'hands-helping', 'rocket', 'eye', 'envelope', 'location-dot', 'comments', 'edit', 'trash', 'phone', 'arrow-left', 'arrow-up', 'check', 'star', 'image'],
      brands: ['github', 'linkedin', 'twitter', 'facebook', 'instagram', 'linkedin-in', 'google']
    }
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    uploadPreset: "my-custom-preset",
    apiKey: process.env.ClOUDINARY_API_KEY,
    analytics: true,
    cloud: {},
    url: {},
  }


})