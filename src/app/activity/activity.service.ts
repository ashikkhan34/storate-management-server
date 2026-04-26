import { prisma } from "../../lib/prisma";

export const getRecentActivityService = async () => {
  const [files, notes, favorites, users] = await Promise.all([
    prisma.file.findMany({
      select: { id: true, name: true, size: true, createdAt: true },
    }),

    prisma.note.findMany({
      select: { id: true, title: true, createdAt: true },
    }),

    prisma.favorite.findMany({
      select: { id: true, itemId: true, createdAt: true },
    }),

    prisma.user.findMany({
      select: { id: true, name: true, createdAt: true },
    }),
  ]);

  const activity = [
    ...files.map((f) => ({
      type: "file",
      name: f.name,
      size: f.size,
      createdAt: f.createdAt,
    })),

    ...notes.map((n) => ({
      type: "note",
      name: n.title,
      createdAt: n.createdAt,
    })),

    ...favorites.map((f) => ({
      type: "favorite",
      name: f.itemId,
      createdAt: f.createdAt,
    })),

    ...users.map((u) => ({
      type: "user",
      name: u.name,
      createdAt: u.createdAt,
    })),
  ];

  activity.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return activity.slice(0, 10);
};
