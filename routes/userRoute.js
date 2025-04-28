import express from "express";
import { signup, login } from "../controllers/userController.js";

const userRoute = (db) => {
  const router = express.Router();

  router.post("/signup", (req, res) => signup(req, res, db));
  router.post("/login", (req, res) => login(req, res, db));

  return router;
};

export default userRoute;
