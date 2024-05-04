import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";

import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export function configureVuetify() {
  return createVuetify({
    components,
    directives,
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
      },
    },
  });
}
