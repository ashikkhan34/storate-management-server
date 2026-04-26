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

// ✅ Get all favorites of a user
export const getAllFavoritesService = async (userId: string) => {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return favorites;
};

// ✅ Delete specific favorite
export const deleteFavoriteService = async (
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

  if (!existing) {
    throw new Error("Favorite not found");
  }

  await prisma.favorite.delete({
    where: {
      userId_itemId_itemType: {
        userId,
        itemId,
        itemType,
      },
    },
  });

  return { message: "Favorite deleted" };
};
