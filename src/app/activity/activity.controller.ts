import { Request, Response } from "express";
import { getRecentActivityService } from "./activity.service";

export const getRecentActivity = async (req: Request, res: Response) => {
  try {
    const data = await getRecentActivityService();

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch activity",
    });
  }
};
