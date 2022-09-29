import { createApp } from "vue";
import App from "./App.vue";
import Keycloak, { KeycloakConfig } from "keycloak-js";
import { createPinia } from "pinia";
import { useKeycloak } from "./store/keycloak";
import router from "./router";

const initOptions = {
  url: "http://localhost:8080/",
  realm: "adem",
  clientId: "myclient",
};

let keycloak = Keycloak(initOptions);

keycloak
  .init({ onLoad: "login-required" })
  .then((auth) => {
    if (!auth) {
      window.location.reload();
      console.log(auth);
    } else {
      console.info("Authenticated");
      console.log(auth);
      const app = createApp(App);
      app.use(createPinia());
      app.use(router);

      app.mount("#app");

      const store = useKeycloak();

      store.addKeycloak(keycloak);
    }

    //Token Refresh
    setInterval(() => {
      keycloak
        .updateToken(1000)
        .then((refreshed) => {
          if (refreshed) {
            console.info("Token refreshed" + refreshed);
          } else {
            console.warn("Token not refreshed, valid for  seconds");
          }
        })
        .catch(() => {
          console.error("Failed to refresh token");
        });
    }, 5 * 60 * 1000);
  })
  .catch((e) => {
    console.error("Authenticated Failed", e);
  });

router.beforeEach((to, from, next) => {
  if (!keycloak.authenticated) {
    console.log(keycloak);
    keycloak.logout();
  } else next();
});
