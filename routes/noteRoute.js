// In noteRoute.js
import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  searchNotes,
} from "../controllers/noteController.js";

const noteRoute = (db) => {
  const router = express.Router();

  // Apply authenticateToken to all note routes
  router.use(authenticateToken);

  router.get("/", getNotes(db));
  router.post("/", createNote(db));
  router.put("/", updateNote(db));
  router.delete("/", deleteNote(db));
  router.get("/search", searchNotes(db));

  return router;
};

export default noteRoute;
