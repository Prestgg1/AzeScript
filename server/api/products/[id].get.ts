import { products,productsRelations, categories } from "@/db/schema";
import { useDrizzle } from "~/server/utils/drizzle";
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const  id = Number(getRouterParam(event,'id')) ;
    const product = await useDrizzle()
        .select({
            id: products.id,
            title: products.title,
            image: products.image,
            description: products.description,
            price: products.price,
            slug: products.slug,
           
        })
        .from(products)
        .leftJoin(categories, eq(categories.id, products.categoryId))
        .where(eq(products.id, id))  
        .limit(1);  

    if (!product || product.length === 0) {
        return { error: "Product not found" };
    }

    return {
        data: product[0],
    };
});
