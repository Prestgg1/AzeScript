import { products } from "@/db/schema";
import { useDrizzle } from "~/server/utils/drizzle";
import { eq } from 'drizzle-orm'; // SQL eşleme için

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {
        userId,
        title,
        slug,
        image,
        description,
        content,
        price,
        keywords,
        requirements,
        features,
        demoLink,
        categoryId
    } = body;

    console.log(body);
    if (!userId || !title || !slug || !image || !description || !content || !keywords || !requirements || !features || !categoryId) {
        throw new Error("Gerekli tüm alanlar doldurulmalıdır!");
    }
    const existingProduct = await useDrizzle()
        .select()
        .from(products)
        .where(eq(products.slug, slug)) 
        .limit(1);

    if (existingProduct && existingProduct.length > 0) {
        const updatedProduct = await useDrizzle()
            .update(products)
            .set({
                userId,
                title,
                slug,
                image,
                description,
                content,
                price,
                keywords,
                requirements,
                features,
                demoLink,
                categoryId
            })
            .where(eq(products.slug, slug)) 
            .returning();

        return {
            message: "Ürün başarıyla güncellendi!",
            product: updatedProduct
        };
    } else {
        const newProduct = await useDrizzle()
            .insert(products)
            .values({
                userId,
                title,
                slug,
                image,
                description,
                content,
                price,
                keywords,
                requirements,
                features,
                demoLink,
                categoryId
            })
            .returning();

        return {
            message: "Ürün başarıyla eklendi!",
            product: newProduct
        };
    }
});
