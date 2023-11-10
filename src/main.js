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

// css
import "./assets/css/main.css";

library.add(
  faUserSecret,
  faHouse,
  faMagnifyingGlass,
  faUser,
  faBookmark,
  faHeart
);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());
app.use(router);

app.mount("#app");
