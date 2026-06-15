import express from "express";
import "./config/dotenv.js";
import path from "path";
import { fileURLToPath } from "url";

import compsRouter from "./routes/compsRoutes.js";

// This file returns the HTMLS for the client and serves the API routes for comps data.

// __dirname isn't defined in ES modules, so we rebuild it from the file URL.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// API routes: GET /comps and GET /comps/:id
app.use("/comps", compsRouter);

// Serve static frontend assets from the built client output in production.
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get(/^\/\d+$/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "compDetails.html"));
});

// Catchall for other non-API routes.
app.use((req, res) => {
  res.status(404).send("<h1>404 No Page Found</h1>");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
