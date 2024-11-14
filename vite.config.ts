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
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/icon-1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone", // Ensures it runs like a native app, not in a browser tab
      },
    }),
  ],
});
