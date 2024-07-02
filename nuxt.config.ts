// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  serverMiddleware: [
    { path: "/api", handler: "~/server/middleware/word-of-the-day.ts" },
  ],
});
