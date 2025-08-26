import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content", "@nuxt/image"],
  css: ["@/assets/css/main.css"],
  components: true,
  runtimeConfig: {
    public: {
      antboxUrl: process.env.ANTBOX_URL || "",
      antboxTenant: process.env.ANTBOX_TENANT || "",
    },
  },
  app: {
    head: {
      link: [
        { rel: "icon", href: "/favicon/favicon.ico" },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon/favicon-32x32.png",
        },
        {
          rel: "apple-touch-icon",
          href: "/favicon/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/favicon/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/favicon/android-chrome-512x512.png",
        },
        { rel: "manifest", href: "/favicon/site.webmanifest" },
      ],
    },
  },
});
