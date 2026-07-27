import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/icon-192.png", "icons/icon-512.png"],
      manifest: {
        name: "TreinoApp",
        short_name: "Treino",
        description: "Registre seus treinos e séries de academia",
        theme_color: "#14171C",
        background_color: "#14171C",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
      workbox: {
        // cacheia chamadas GET da API (domínio separado em produção) pra funcionar offline.
        runtimeCaching: [
          {
            urlPattern: ({ url }) =>
              ["/login", "/usuarios", "/workouts", "/sessions", "/exercises"].some((prefix) =>
                url.pathname.startsWith(prefix)
              ),
            handler: "NetworkFirst",
            options: { cacheName: "api-cache" },
          },
        ],
      },
    }),
  ],
});
