import createError from "http-errors";

import { NextFunction, Request, Response } from "express";

import {
  createNoteService,
  deleteNoteService,
  getAllNoteService,
  getANoteService,
  updateNoteService,
} from "./note.service";

export const createNoteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, title, content } = req.body || {};

    if (!userId || !title || !content) {
      return next(createError.BadRequest("userid ,Title and content required"));
    }

    const note = await createNoteService(userId, {
      title,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      data: note,
    });
  } catch (error: any) {
    console.log("CREATE NOTE ERROR:", error);

    return next(
      createError(
        error.status || 500,
        error.message || "Failed to create note",
      ),
    );
  }
};
export const getANoteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    // validation
    if (!id) {
      return next(createError.NotFound("id is required"));
    }

    const note = await getANoteService(id);

    // not found
    if (!note) {
      return next(createError.NotFound("Note not found"));
    }

    res.status(200).json({
      success: true,
      message: "Get note successfully",
      data: note,
    });
  } catch (error) {
    next(createError(500, "Internal server error"));
  }
};

export const getAllNoteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const notes = await getAllNoteService();

    res.status(200).json({
      success: true,
      message: "Notes retrieved successfully",
      data: notes,
    });
  } catch (error) {
    next(createError(500, "Failed to retrieve notes"));
  }
};

export const updateNoteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const payload = req.body;

    // validation
    if (!id) {
      return next(createError.NotFound("id is required"));
    }

    const updatedNote = await updateNoteService(id, payload);
    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error: any) {
    // Prisma error (record not found)
    if (error.code === "P2025") {
      return next(createError.NotFound("Note not found"));
    }

    next(createError(500, "Failed to update note"));
  }
};

export const deleteNoteController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      return next(createError.NotFound("id is required"));
    }

    await deleteNoteService(id);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error: any) {
    if (error.code === "P2025") {
      return next(createError.NotFound("Note not found"));
    }

    next(createError(500, "Failed to delete note"));
  }
};
