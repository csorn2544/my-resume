import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@fontsource-variable/manrope";
import "./App.css";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .use(router)
  .mount("#vue-app");
