import { and, eq } from "drizzle-orm";
import { favorites, products } from "~/db/schema";
import { useDrizzle } from "~/server/utils/drizzle";
import { auth } from "~/utils/auth";

export default defineEventHandler(async (event) => {
    const session = await auth.api.getSession({
        headers: event.headers,
    });

    const productId: number = Number(getRouterParam(event, 'id'));

    if (!session) {
        return { error: "Unauthorized" };
    }

    const userId = session.user.id;
    const existingFavorite = await useDrizzle().query.favorites.findFirst({
        where: (favorites, { eq }) => eq(favorites.userId, userId) && eq(favorites.productId, productId),
    });

    if (existingFavorite) {
        await useDrizzle().delete(favorites).where(
            and(
                eq(favorites.userId, userId),
                eq(favorites.productId, productId)
            )
        );
        return { message: "Product removed from favorites" };
    } else {
        // Eğer ürün favorilerde değilse, favorilere ekle
        await useDrizzle().insert(favorites).values({
            userId,
            productId
        });
        return { message: "Product added to favorites" };
    }
});
