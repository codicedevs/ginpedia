import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as fs from "fs";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
    //   key: fs.readFileSync(
    //     path.resolve(
    //       __dirname,
    //       "/etc/letsencrypt/live/www.codice.dev/privkey.pem",
    //     ),
    //   ),
    //   cert: fs.readFileSync(
    //     path.resolve(
    //       __dirname,
    //       "/etc/letsencrypt/live/www.codice.dev/fullchain.pem",
    //     ),
    //   ),
    // },
    port: parseInt(process.env.VITE_PORT || "3021"),
    proxy: {
      "/uploads": {
        target: "https://www.codice.dev:3020",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, "/uploads"),
      },
    },
    host: true,
  },
  base: "./",
});
