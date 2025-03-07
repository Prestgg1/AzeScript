// server/api/categories/[id].delete.ts
import { defineEventHandler, getRouterParam } from 'h3';
import { useDrizzle } from "~/server/utils/drizzle"
import { products } from '~/db/schema';
import { eq } from 'drizzle-orm';


export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (!id) {
        return { status: 400, message: 'Kategori ID belirtilmelidir' };
    }

    try {
        const deletedScript = await useDrizzle().delete(products).where(eq(products.id, Number(id))).returning();

        if (!deletedScript) {
            return { status: 404, message: 'Script Tapilmadı' };
        }

        return { status: 200, message: 'Script uğurla silindi', deletedScript };
    } catch (error) {
        return { status: 500, message: 'Script  silinəndə problem yarandı', error };
    }
});
