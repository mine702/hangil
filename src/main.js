import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";

// css
import "./assets/css/main.css";
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
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

// app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount("#app");
