import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import configureApp, { vuetify } from "@/config";

import App from "./App.vue";
import router from "./router";

configureApp().then(() => {
  const app = createApp(App).use(createPinia()).use(router).use(vuetify);

  app.mount("#app");
});
