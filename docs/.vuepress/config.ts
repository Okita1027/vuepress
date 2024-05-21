import {defineUserConfig} from "vuepress";
import viteBundler from "@vuepress/bundler-vite";
import theme from "./theme.js";

export default defineUserConfig({

    port: 8080,

    // 在开发服务器启动后打开浏览器
    open: true,

    base: "/knowledge-database/",

    lang: "zh-CN",
    title: "沖田さんの知識ベース",
    description: "基于VuePress的知识库,主题是hope",

    bundler: viteBundler(),

    theme,


    // 和 PWA 一起启用
    // shouldPrefetch: false,
});
