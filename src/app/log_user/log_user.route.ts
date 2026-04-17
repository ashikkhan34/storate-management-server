// src/routes/auth.routes.ts
import express from "express";
import auth from "../../middleware/auth";
import { getMeController } from "./log_user.controller";

const router = express.Router();

// protected route
router.get("/me", auth, getMeController);

export const logUserRouter = router;