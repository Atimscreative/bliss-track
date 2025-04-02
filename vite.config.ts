import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
// import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // VitePWA({
    //   registerType: "autoUpdate",
    //   injectRegister: "auto",
    //   // Web Manifest
    //   includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
    //   manifest: {
    //     name: "My PWA App",
    //     short_name: "PWA App",
    //     description: "A PWA with caching and offline support",
    //     theme_color: "#ffffff",
    //     background_color: "#ffffff",
    //     display: "standalone",
    //     icons: [
    //       {
    //         src: "pwa-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "pwa-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //     ],
    //   },

    //   workbox: {
    //     cleanupOutdatedCaches: false,
    //     globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
    //     runtimeCaching: [
    //       {
    //         urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/, // Image caching
    //         handler: "CacheFirst",
    //         options: {
    //           cacheName: "image-cache",
    //           expiration: {
    //             maxEntries: 100,
    //             maxAgeSeconds: 60 * 60 * 24 * 7, // 1 week
    //           },
    //         },
    //       },
    //       {
    //         urlPattern: /\.(?:js|css|html)$/, // Static assets caching
    //         handler: "StaleWhileRevalidate",
    //         options: {
    //           cacheName: "static-resources",
    //           expiration: {
    //             maxEntries: 100,
    //             maxAgeSeconds: 60 * 60 * 24 * 30, // 1 month
    //           },
    //         },
    //       },
    //     ],
    //   },
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
