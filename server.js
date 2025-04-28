import express from "express";
import cors from "cors";
import NeDB from "nedb";
import dotenv from "dotenv";
import noteRoute from "./routes/noteRoute.js";
import userRoute from "./routes/userRoute.js";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config(); // Ladda miljövariabler
const app = express(); // Definiera app här, innan användning

// Middleware
app.use(express.json());
app.use(cors());

// Databas
const db = {
  users: new NeDB({ filename: "./db/users.db", autoload: true }),
  notes: new NeDB({ filename: "./db/notes.db", autoload: true }),
};

// Routes
app.use("/api/user", userRoute(db));
app.use("/api/notes", noteRoute(db));

// Swagger setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerDocument = YAML.load(
  path.join(__dirname, "./swagger/swagger.yaml")
);

// Definiera swagger-routen korrekt
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
