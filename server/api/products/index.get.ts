import { products, favorites } from "@/db/schema";
import { useDrizzle } from "~/server/utils/drizzle";
import { and, count, eq, sql } from "drizzle-orm";
import { auth } from "~/utils/auth";

export default defineEventHandler(async (event) => {
    const page = Number(getQuery(event).page || "1");
    const limit = 8;
    const offset = (page - 1) * limit;
    const session = await auth.api.getSession({
        headers: event.headers,
    });
    console.log(session)

    const totalCount = await useDrizzle()
        .select({ count: count() })
        .from(products)
        .then((res) => res[0].count);

    const totalPages = Math.ceil(totalCount / limit);

    // Kullanıcı ID'sini al
    const userId = session?.user?.id ?? null;

    // Eğer kullanıcı oturum açmamışsa favori durumunu kontrol etmemize gerek yok
    const query = useDrizzle()
        .query.products
        .findMany({
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
            },
            limit,
            offset,
        });

    let scriptler = await query;

    // Favori durumu için, veritabanında bir "LEFT JOIN" ile favoriler sorgusu yapılır
    if (userId) {
        // Ürünlere, kullanıcının favori olup olmadığını eklemek için favoriler ile JOIN yapalım
        const favoriteStatusQuery = useDrizzle()
            .select({
                productId: products.id,
                has_favorited: sql`CASE WHEN ${eq(favorites.userId, userId)} AND ${eq(favorites.productId, products.id)} THEN TRUE ELSE FALSE END`,
            })
            .from(products)
            .leftJoin(favorites, eq(products.id, favorites.productId))
            .where(eq(favorites.userId, userId));

        // Gelen favori durumu ile ürünleri birleştiriyoruz
        const favoritesData = await favoriteStatusQuery;

        // Favori durumu ile ürünleri eşleştiriyoruz
        scriptler = scriptler.map((script) => {
            // `favoritesData` içinde her ürün için favori durumu var mı diye kontrol ediyoruz
            const isFavorited = favoritesData.some((fav) => fav.productId === script.id);
            return {
                ...script,
                has_favorited: isFavorited, // Favori durumu ekleniyor
            };
        });
    }

    return {
        data: scriptler,
        pagination: {
            currentPage: page,
            totalPages,
        },
    };
});
