import { defineConfig } from "vite";
import vitePluginPug from "./ plugins/vite-plugin-pug";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  root: "src",
  //scssの変数を全てのファイルへ適用する設定ができる！？
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       // additionalData: `@use "./fundation/_variable.scss";`,
  //     },
  //   },
  // },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: ["src/index1.pug", "src/index.pug"],
      //今のところindex2.pugをブラウザで見たかったらindex2.pugをindex.pugにしないといけない。
      output: {
        entryFileNames: `assets/js/[name].js`,
        chunkFileNames: `assets/js/[name].js`,
        assetFileNames: (assetInfo) => {
          if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(assetInfo.name)) {
            return "assets/images/[name].[ext]";
          }
          if (/\.css$/.test(assetInfo.name)) {
            return "assets/css/[name].[ext]";
          }
          return "assets/[name].[ext]";
        },
      },
    },
  },

  plugins: [
    vitePluginPug(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
    }),
  ],
});
