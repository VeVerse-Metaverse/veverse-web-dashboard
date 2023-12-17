import { createApp } from "vue";
import VueMyToasts from "vue-my-toasts";
import TailwindComponent from "vue-my-toasts/dist/toasts/TailwindComponent.vue";
import vSelect from "vue-select";
import FloatingVue from "floating-vue";

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Plugins
import ethers from "./plugins/ethers";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .use(ethers)
  .use(FloatingVue)
  .use(VueMyToasts, {
    component: TailwindComponent,
    options: {
      width: "500px",
      position: "top-right",
      padding: "1rem",
      background: "#fff",
      class: "bg-red",
    },
  });

app.component("v-select", vSelect);

app.mount("#app");
