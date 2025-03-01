import { categories } from "@/db/schema"
import { useDrizzle } from "~/server/utils/drizzle"

export default defineEventHandler(async (event) => {
    // Gelen veriyi almak
    const body = await readBody(event)


    // Verilerin doğrulamasını yapma (isteğe bağlı ama güvenlik için öneli)
    const { name, slug, description, image } = body

    if (!name || !slug || !description || !image) {
        throw new Error("Tüm alanlar gereklidir!")
    }

    // Veritabanına yeni kategori eklemek
    await useDrizzle().insert(categories).values({
        name,
        slug,
        description,
        image
    })
    return {
        message: "Kategori başarıyla eklendi."
    }
})