import { Request, Response } from "express";
import { toggleFavoriteService } from "./favorite.service";

export const toggleFavorite = async (req: any, res: Response) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { itemId, itemType } = req.body;

    if (!itemId || !itemType) {
      return res.status(400).json({
        success: false,
        message: "itemId and itemType are required",
      });
    }

    const result = await toggleFavoriteService(userId, itemId, itemType);

    res.status(200).json({
      success: true,
      message: `Item ${result.status}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
