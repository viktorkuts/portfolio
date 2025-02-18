import { createApp } from "vue";
import "@/style.css";
import App from "@/App.vue";
import router from "@/utils/router";
import { createAuth0 } from "@auth0/auth0-vue";
import i18n from "./plugins/i18n";

createApp(App)
  .use(
    createAuth0({
      domain: String(import.meta.env.OKTA_ISSUER)
        .replace("//", "")
        .replace("https:", "")
        .replace("/", ""),

      clientId: import.meta.env.OKTA_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: import.meta.env.OKTA_AUDIENCE,
      },
      cacheLocation: "localstorage",
    })
  )
  .use(router)
  .use(i18n)
  .mount("#app");
