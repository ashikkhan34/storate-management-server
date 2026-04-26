import { prisma } from "../../lib/prisma";

export const createFileService = async (
  userId: string,
  payload: { name: string },
) => {
  return await prisma.file.create({
    data: {
      ...payload,
      userId,
    },
  });
};

export const getAllFileService = async () => {
  return await prisma.file.findMany();
};

export const getAFileService = async (id: string) => {
  return await prisma.file.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
};

export const updateFileService = async (
  id: string,
  payload: Partial<{ name: string; size: number; url: string }>,
) => {
  return await prisma.file.update({
    where: { id },
    data: payload,
  });
};

export const deleteFileService = async (id: string) => {
  return await prisma.file.delete({
    where: { id },
  });
};
