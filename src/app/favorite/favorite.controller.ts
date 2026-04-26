import { Request, Response } from "express";
import {
  deleteFavoriteService,
  getAllFavoritesService,
  toggleFavoriteService,
} from "./favorite.service";

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

// ✅ Get all favorites
export const getAllFavorites = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const data = await getAllFavoritesService(userId);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch favorites",
      error,
    });
  }
};

// ✅ Delete favorite
export const deleteFavorite = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const { itemId, itemType } = req.body;

    if (!itemId || !itemType) {
      return res.status(400).json({
        success: false,
        message: "itemId and itemType are required",
      });
    }

    const result = await deleteFavoriteService(userId, itemId, itemType);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
