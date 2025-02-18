import { createI18n } from "vue-i18n";
import { type App } from "vue";
import messages from "@intlify/unplugin-vue-i18n/messages";
import { useStorage } from "@vueuse/core";

export default (app: App) => {
  const defaultLocale = useStorage("locale", "en");
  const i18n = createI18n({
    locale: defaultLocale.value,
    messages,
  });
  app.use(i18n);
};
