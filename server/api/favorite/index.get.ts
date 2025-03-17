
import { useDrizzle } from "~/server/utils/drizzle"
import { auth } from "~/utils/auth";
export default defineEventHandler(async (event) => {
    const session = await auth.api.getSession({
        headers: event.headers,
    });
    if (!session) {
        return { error: "Unauthorized" };
    }
    const favorites = await useDrizzle().query.favorites.findMany({
        where: (favorites, { eq }) => eq(favorites.userId, session.user.id)
    })
    return {
        data: favorites
    }
});