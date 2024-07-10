import million from "million/compiler";
import path, { resolve } from "path";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    million.vite({ auto: true, mute: true }),
    react(),
    viteSingleFile(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        // installer: resolve(__dirname, 'installer.html'),
      },
    },
  },
});
