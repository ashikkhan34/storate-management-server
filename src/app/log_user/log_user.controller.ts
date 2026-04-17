// src/controllers/auth.controller.ts
import { Response } from "express";
import { getMeService } from "./log_user.service";

export const getMeController = async (req: any, res: Response) => {
  try {
    const userId = req.user.id; // middleware থেকে আসবে

    const user = await getMeService(userId);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
