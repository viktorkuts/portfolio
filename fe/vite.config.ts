import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

const env = loadEnv("", "../", "");

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      include: resolve(__dirname, "./src/locales/**"),
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      },
    ],
  },
  define: {
    "import.meta.env.OKTA_ISSUER": JSON.stringify(env.OKTA_ISSUER),
    "import.meta.env.OKTA_CLIENT_ID": JSON.stringify(env.OKTA_CLIENT_ID),
    "import.meta.env.OKTA_REDIRECT_URI": JSON.stringify(env.OKTA_REDIRECT_URI),
    "import.meta.env.OKTA_AUDIENCE": JSON.stringify(env.OKTA_AUDIENCE),
    "import.meta.env.BACKEND_URL": JSON.stringify(env.BACKEND_URL),
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
      },
    },
  },
});
