import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 8443,
    host: "tg-mini-app.local",
    https: {
      key: fs.readFileSync("./.cert/localhost-key.pem"),
      cert: fs.readFileSync("./.cert/localhost.pem"),
    },
    hmr: {
      host: "tg-mini-app.local",
      protocol: "wss",
    },
    proxy: {
      "/users": "http://localhost:3001",
      "/statistic": "http://localhost:3001",
      "/goal": "http://localhost:3001",
      "/products": "http://localhost:3001",
    },
  },
});
