import express from "express";
import { getRecentActivity } from "./activity.controller";

const router = express.Router();

router.get("/recent", getRecentActivity);

export const activityRouter = router;
