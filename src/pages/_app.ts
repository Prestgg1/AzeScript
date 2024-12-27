import type { App } from "vue";

import PrimeVue from "primevue/config";
import Button from "primevue/button";

import Menu from "primevue/menu";
import ToastService from "primevue/toastservice";
import Aura from "@primevue/themes/aura";

export default (app: App) => {
  app
    .use(PrimeVue, {
      theme: {
        preset: Aura,
      },
    })
    .use(ToastService);
  app.component("Button", Button);
  app.component("Menu", Menu);
};
