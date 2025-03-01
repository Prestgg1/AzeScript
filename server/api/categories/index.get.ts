import { categories, products } from "@/db/schema"
import { useDrizzle } from "~/server/utils/drizzle"
import { eq, count } from 'drizzle-orm';
export default defineEventHandler(async (event) => {
    const categoriesWithProductCount = await useDrizzle().select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        image: categories.image,
        description: categories.description,
        productCount: count(products.id)
    }).from(categories).leftJoin(products, eq(categories.id, products.categoryId)).groupBy(categories.id)
    return {
        data: categoriesWithProductCount
    }
})
