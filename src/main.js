import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUserSecret,
  faHouse,
  faMagnifyingGlass,
  faUser,
  faBookmark,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faUserSecret,
  faHouse,
  faMagnifyingGlass,
  faUser,
  faBookmark,
  faHeart
);

// css
import "./assets/css/main.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
