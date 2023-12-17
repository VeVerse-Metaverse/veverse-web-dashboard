/* eslint-disable no-console */

import { register } from "register-service-worker";

register(`${process.env.BASE_URL}service-worker.js`, {
  ready() {
    caches.delete("veverse-web-precache-v2-https://test.web.veverse.com/");
    caches.delete("veverse-web-precache-v2-https://dev.web.veverse.com/");
  },
  registered() {
    console.log("Service worker has been registered.");
  },
  cached() {
    console.log("Content has been cached for offline use.");
  },
  updatefound() {
    console.log("New content is downloading.");
  },
  updated() {
    console.log("New content is available; please refresh.");
  },
  offline() {
    console.log(
      "No internet connection found. App is running in offline mode."
    );
  },
  error(error) {
    console.error("Error during service worker registration:", error);
  },
});
