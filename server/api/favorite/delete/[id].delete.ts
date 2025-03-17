import { and } from "drizzle-orm";
// Favori silme
import { useDrizzle } from "~/server/utils/drizzle";
import { favorites } from "@/db/schema";
import { auth } from "~/utils/auth";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const user = await auth.api.getSession({ headers: event.headers });
  const productId: number = Number(getRouterParam(event, "id"));

  if (!user || !user.user?.id) {
    return { statusCode: 401, statusMessage: "Unauthorized" };
  }

  const userId = user.user.id;

  // Favoriyi sil
  const result = await useDrizzle()
    .delete(favorites)
    .where(
      and(eq(favorites.userId, userId), eq(favorites.productId, productId))
    );

  if (result.count === 0) {
    return { statusCode: 400, statusMessage: "Favorite not found" };
  }

  return { success: true };
});
