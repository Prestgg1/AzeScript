import { categories } from "@/db/schema";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineEventHandler(async (event) => {
    const categoriesWithProductCount = await useDrizzle().query.categories.findMany({
        columns: {
            id: true,
            name: true,
            slug: true,
            image: true,
            description: true,
        },
        with: {
            products: {
                columns: {
                    id: true,  // Sadece sayım için gerekli
                },
            },
        },
    });

    // Her kategori için ürün sayısını hesapla
    const formattedData = categoriesWithProductCount.map(category => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        image: category.image,
        description: category.description,
        productCount: category.products.length,  // Ürün sayısını hesapla
    }));

    return {
        data: formattedData
    };
});

