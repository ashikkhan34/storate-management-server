import express from "express";
import {
  createFileController,
  deleteFileController,
  getAFileController,
  getAllFileController,
  updateFileController,
} from "./file.controller";

const router = express.Router();

router.post("/create-file", createFileController);
router.get("/", getAllFileController);
(router.get("/:id", getAFileController),
  router.put("/:id", updateFileController));
router.delete("/:id", deleteFileController);

export const fileRouter = router;
