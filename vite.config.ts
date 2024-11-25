import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // Automatically update the service worker
      devOptions: {
        enabled: true, // Enable PWA support in development mode
      },
      manifest: {
        name: "סטיגמא",
        short_name: "סטיגמא",
        description: "Company management system",
        theme_color: "#ffffff", // The background color for the splash screen
        icons: [
          {
            src: "./src/assets/icons/icon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "./src/assets/icons/icon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "./src/assets/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "./src/assets/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
      },
    }),
  ],
});
