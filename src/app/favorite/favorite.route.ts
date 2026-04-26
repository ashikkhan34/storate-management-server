import express from "express";
import {
  deleteFavorite,
  getAllFavorites,
  toggleFavorite,
} from "./favorite.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/toggle", auth, toggleFavorite);
router.get("/", auth, getAllFavorites);
router.delete("/", auth, deleteFavorite);

export const favoriteRouter = router;
