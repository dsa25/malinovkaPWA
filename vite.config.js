import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import { VitePWA } from "vite-plugin-pwa"

const vitePwa = VitePWA({
  registerType: "autoUpdate",
  outDir: "dist",
  // publicDir: "assets",
  // includeAssets: ["favicon.ico", "apple-touch-icon.png"],
  manifest: {
    name: 'Показания СНТ "Малиновка"',
    short_name: "Малиновка",
    theme_color: "#2196f3",
    background_color: "#ffffff",
    display: "standalone",
    orientation: "portrait",
    // id: "https://dsa25.github.io/malinovkaPWA/",
    // start_url: "https://dsa25.github.io/malinovkaPWA/",
    id: "http://localhost:4173/",
    start_url: "http://localhost:4173/",
    scope: ".",
    description:
      'Приложение для съема показаний СНТ "Малиновка" (malinovka presents)',
    icons: [
      {
        src: "./icons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "./icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "./icons/android-48-48.png",
        sizes: "48x48",
        type: "image/png"
      },
      {
        src: "./icons/android-72-72.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        src: "./icons/android-96-96.png",
        sizes: "96x96",
        type: "image/png"
      },
      {
        src: "./icons/android-144-144.png",
        sizes: "144x144",
        type: "image/png"
      },
      {
        src: "./icons/32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "./icons/64.png",
        sizes: "64x64",
        type: "image/png"
      },
      {
        src: "./icons/120.png",
        sizes: "120x120",
        type: "image/png"
      },
      {
        src: "./icons/256.png",
        sizes: "256x256",
        type: "image/png"
      },

      {
        src: "./favicon.ico",
        sizes: "48x48",
        type: "image/x-icon"
      },
      {
        src: "./assets/logo-07148493.png",
        // sizes: "120x120",
        type: "image/png"
      },
      {
        src: "./assets/sprite-b3562787.svg",
        // sizes: "0x0",
        type: "image/svg+xml"
      },
      {
        src: "./assets/vue-5532db34.svg",
        // sizes: "37x36",
        type: "image/svg"
      }
    ]
  }
})

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist"
  },
  server: {
    host: true
    // port: 3000,
    // hmr: true
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  plugins: [
    vue()
    //  vitePwa
  ]
})
