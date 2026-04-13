import express from "express";
import {
  createNoteController,
  deleteNoteController,
  getAllNoteController,
  getANoteController,
  updateNoteController,
} from "./note.controller";

const router = express.Router();

router.post("/create-note", createNoteController);
(router.get("/", getAllNoteController), router.get("/:id", getANoteController));
router.put("/:id", updateNoteController);
router.delete("/:id", deleteNoteController);

export const noteRouter = router;
