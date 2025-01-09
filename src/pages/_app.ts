import type { App } from "vue";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Menu from "primevue/menu";
import ToastService from "primevue/toastservice";
import Aura from "@primevue/themes/aura";
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'

const pinia = createPinia()
const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
          refetchOnWindowFocus: false, // Pencere odağı değiştiğinde yeniden sorgulama yapılmaz
      },
      
      mutations: {
          // Varsayılan mutation seçenekleri buraya eklenebilir
          retry:1
      },
  },
});

export default (app: App) => {
  
  app
    .use(PrimeVue,{
      theme: {preset:Aura}
    })
    .use(ToastService).use(VueQueryPlugin,{queryClient}).use(pinia);
  app.component("Button", Button);
  app.component("Menu", Menu);

};
