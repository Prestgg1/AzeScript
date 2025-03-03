// server/api/categories/[id].delete.ts
import { defineEventHandler, getRouterParam } from 'h3';
import { useDrizzle } from "~/server/utils/drizzle"
import { categories } from '~/db/schema';
import { eq } from 'drizzle-orm';


export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (!id) {
        return { status: 400, message: 'Kategori ID belirtilmelidir' };
    }

    try {
        const deletedCategory = await useDrizzle().delete(categories).where(eq(categories.id, Number(id))).returning();

        if (!deletedCategory) {
            return { status: 404, message: 'Kategori bulunamadı' };
        }

        return { status: 200, message: 'Kategori başarıyla silindi', deletedCategory };
    } catch (error) {
        return { status: 500, message: 'Kategori silinirken hata oluştu', error };
    }
});
