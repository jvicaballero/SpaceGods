import { defineConfig } from "vite";

export default defineConfig({
  root: "./public",
  // Needed so I can get the catchall to work
  appType: "mpa",
  build: {
    outDir: "../server/public",
    emptyOutDir: true,
  },
  server: {
    proxy: {
      "/comps": {
        target: "http://localhost:3001",
      },
    },
  },
  plugins: [
    {
      name: "comp-detail-rewrite",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const parts = req.url.split("?")[0].split("/").filter(Boolean);
          if (parts.length >= 1 && /^\d+$/.test(parts[0])) {
            req.url = "/compDetails.html";
          }
          next();
        });
      },
    },
  ],
});
