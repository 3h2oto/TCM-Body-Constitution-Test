// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    target: "static",
    router: {},

    app: {
        // baseURL: "/TCM-Body-Constitution-Test/",
        baseURL: "/TCM-Body-Assessment/",
    },

    meta: {
        title: "中医体质自测",
        link: [
            {
                rel: "icon",
                type: "image/png",
                href: "../public/logo.svg",
            },
        ],
        charset: "utf-8",
        viewport:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        script: [
            {
                src: "../public/flexible.js",
                type: "text/javascript",
            },
        ],
    },

    build: {
        transpile: ["vant", "echarts"],
        postcss: {
            postcssOptions: require("./postcss.config.js"),
        },
    },

    compatibilityDate: "2024-10-31",
});
