import express from "express";
import { toggleFavorite } from "./favorite.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/toggle", auth, toggleFavorite);

export const favoriteRouter = router;
