
import { eq } from 'drizzle-orm';
import { products, comments, user } from "~/db/schema";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineEventHandler(async (event) => {
    const id = Number(getRouterParam(event, 'id'));

    // Veritabanı sorgusunu yapıyoruz, ürün id'sine bağlı yorumları alıyoruz
    const commentsWithUserInfo = await useDrizzle().query.comments.findMany({
        where: eq(comments.productId, id), // product_id ile ilişkili yorumları alıyoruz
        columns: {
            id: true,
            content: true,
            userId: true, // Kullanıcı ID'si
            rating: true, // Puan bilgisi (isteğe bağlı ekleyebilirsiniz)
            createdAt: true,
        },
        with: {
            // Kullanıcı bilgilerini de alıyoruz
            user: {
                columns: {
                    name: true,
                    image: true
                },
            },
        },
    });


    return { ...commentsWithUserInfo };
});
