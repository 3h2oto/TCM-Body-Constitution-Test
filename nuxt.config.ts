// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    target: "static",
    router: {},

    nitro: { // 👈 添加 nitro 配置块
        preset: 'static' // 👈 显式设置 preset 为 'static'
    },

    app: {
        baseURL: "/",
    },

    meta: {
        title: "中医体质自测",
        link: [
            {
                rel: "icon",
                type: "image/png",
                href: "/logo.svg",
            },
        ],
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
        transpile: ["vant", "echarts"],
        postcss: {
            postcssOptions: require("./postcss.config.js"),
        },
    },

    compatibilityDate: "2024-10-31",
});
