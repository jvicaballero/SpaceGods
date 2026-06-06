import express from "express";
import cors from "cors";
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

app.use("/public", express.static("./public"));
app.use("/scripts", express.static("./public/scripts"));

// My Catchall route for any unmatched requests (e.g. /foo, /comps/999).
// Apparently More recent Express doesn't allow * in the path for app.use, so we have to do this instead.
app.use((req, res) => {
  res.status(404).send("<h1>404 No Page Found</h1>");
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
