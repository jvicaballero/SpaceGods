import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
// This file loads environment variables from a .env file into process.env, making them accessible throughout the application. It should be imported at the very beginning of the server setup to ensure all configurations are available when needed.

// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import path from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.join(__dirname, "../.env") });
