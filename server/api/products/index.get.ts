import { products, favorites } from "@/db/schema";
import { useDrizzle } from "~/server/utils/drizzle";
import { count, eq } from "drizzle-orm";
import { auth } from "~/utils/auth";

export default defineEventHandler(async (event) => {
    const page = Number(getQuery(event).page || "1");
    const limit = 8;
    const offset = (page - 1) * limit;
    const session = await auth.api.getSession({
        headers: event.headers,
    });

    const totalCount = await useDrizzle()
        .select({ count: count() })
        .from(products)
        .then((res) => res[0].count);

    const totalPages = Math.ceil(totalCount / limit);

    // Kullanıcı ID'sini al
    const userId = session?.user?.id ?? null;

    // Tüm ürünleri al
    const scriptler = await useDrizzle()
        .query.products.findMany({
            columns: {
                id: true,
                title: true,
                image: true,
                averageRating: true,
                description: true,
                price: true,
                slug: true,
            },
            with: {
                category: {
                    columns: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
                favorites: userId ? {
                    columns: { id: true },
                    where: (fav: typeof favorites) => eq(fav.userId, userId),
                } : [],
            },
            limit,
            offset,
        });

    return {
        data: scriptler,
        pagination: {
            currentPage: page,
            totalPages,
        },
    };
});
