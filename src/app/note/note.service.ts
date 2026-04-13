import { INote } from "./note.interface";
import { prisma } from "../../lib/prisma";

// CREATE
export const createNoteService = async (
  userId: string,
  payload: { title: string; content: string },
) => {
  return await prisma.note.create({
    data: {
      ...payload,
      userId,
    },
  });
};

// GET ALL
export const getAllNoteService = async () => {
  return await prisma.note.findMany();
};

// GET ONE
export const getANoteService = async (id: string) => {
  return await prisma.note.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
};

// UPDATE
export const updateNoteService = async (
  id: string,
  payload: Partial<{ title: string; content: string }>,
) => {
  return await prisma.note.update({
    where: { id },
    data: payload,
  });
};

// DELETE (add this 🔥)
export const deleteNoteService = async (id: string) => {
  return await prisma.note.delete({
    where: { id },
  });
};
