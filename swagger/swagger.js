// swagger/swagger.js
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

export default function (app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
