import { App } from "vue";
import { ethers } from "ethers";

export default {
  install(app: App) {
    app.config.globalProperties.ethers = ethers;
    Object.defineProperties(app.config.globalProperties, {
      $ethers: {
        get() {
          return ethers;
        },
      },
    });
  },
};
