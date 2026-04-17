import { prisma } from "../../lib/prisma";

export const toggleFavoriteService = async (
  userId: string,
  itemId: string,
  itemType: string,
) => {
  const existing = await prisma.favorite.findUnique({
    where: {
      userId_itemId_itemType: {
        userId,
        itemId,
        itemType,
      },
    },
  });

  // 👉 if already favorite → remove (unfavorite)
  if (existing) {
    await prisma.favorite.delete({
      where: {
        userId_itemId_itemType: {
          userId,
          itemId,
          itemType,
        },
      },
    });

    return { status: "unfavorited" };
  }

  // 👉 if not → create favorite
  await prisma.favorite.create({
    data: {
      userId,
      itemId,
      itemType,
    },
  });

  return { status: "favorited" };
};
