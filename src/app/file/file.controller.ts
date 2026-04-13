import { NextFunction, Request, Response } from "express";
import {
  createFileService,
  deleteFileService,
  getAFileService,
  getAllFileService,
  updateFileService,
} from "./file.service";
import createError from "http-errors";
import { log } from "node:console";

export const createFileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, name, size, url } = req.body;
    if (!userId || !name || !size || !url) {
      return next(createError.BadRequest("userid ,Title and content required"));
    }
    const file = await createFileService(userId, req.body);
    res.status(201).json({
      success: true,
      message: "file create Successful",
      data: file,
    });
  } catch (error: any) {
    console.log(error);
    next(createError(500, "file create filed"));
  }
};

export const getAllFileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = await getAllFileService();
    res.status(201).json({
      success: true,
      message: "get all files",
      data: file,
    });
  } catch (error: any) {
    console.log(error);
    next(createError.NotFound("file not found"));
  }
};

export const getAFileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      return next(createError.NotFound("id is required"));
    }
    const file = await getAFileService(id);
    res.status(201).json({
      success: true,
      message: "get a file",
      data: file,
    });
  } catch (error: any) {
    console.log(error);
    next(createError.NotFound("file not found"));
  }
};

export const updateFileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      return next(createError.NotFound("id is required"));
    }
    const file = await updateFileService(id, req.body);
    res.status(201).json({
      success: true,
      message: "update a file",
      data: file,
    });
  } catch (error: any) {
    console.log(error);
    next(createError.NotFound("file not found"));
  }
};

export const deleteFileController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      return next(createError.NotFound("id is required"));
    }
    const file = await deleteFileService(id);
    res.status(201).json({
      success: true,
      message: "delete a file",
      data: file,
    });
  } catch (error: any) {
    console.log(error);
    next(createError.NotFound("file not found"));
  }
};
