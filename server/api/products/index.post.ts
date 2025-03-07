import { products } from "@/db/schema"
import { useDrizzle } from "~/server/utils/drizzle"

export default defineEventHandler(async (event) => {
    // Gelen veriyi al
    const body = await readBody(event)

    // Gerekli alanları body'den çıkart
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
    } = body
    console.log(body)
    // Eksik alan kontrolü
    if (!userId || !title || !slug || !image || !description || !content || !keywords || !requirements || !features || !categoryId) {
        throw new Error("Gerekli tüm alanlar doldurulmalıdır!")
    }

    // Yeni ürünü veritabanına ekle
    const newProduct = await useDrizzle().insert(products).values({
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
    }).returning()

    return {
        message: "Ürün başarıyla eklendi!",
        product: newProduct
    }
})
