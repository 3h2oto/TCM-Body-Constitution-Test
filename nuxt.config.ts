import { defineNuxtConfig } from "nuxt3";

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  meta: {
    charset: "utf-8",
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
    script: [
      {
        src: "/flexible.js",
        type: "text/javascript",
      },
    ],
  },

  build: {
    transpile: ["echarts"],
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
});
