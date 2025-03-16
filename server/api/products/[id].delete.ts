// server/api/categories/[id].delete.ts
import { defineEventHandler, getRouterParam } from 'h3';
import { useDrizzle } from "~/server/utils/drizzle"
import { products } from '~/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from '~/utils/auth';


export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const session = await auth.api.getSession({
        headers: event.headers,
    });
    if (!session) {
        return { error: "Unauthorized" };
    }
    if (!id) {
        return { status: 400, message: 'Script ID belirtilmelidir' };
    }

    try {
        const deletedScript = await useDrizzle().delete(products).where(
            and(
                eq(products.id, Number(id)),
                eq(products.userId, session.user.id)
            )
        ).returning();

        if (!deletedScript) {
            return { status: 404, message: 'Script Tapilmadı' };
        }

        return { status: 200, message: 'Script uğurla silindi', deletedScript };
    } catch (error) {
        return { status: 500, message: 'Script  silinəndə problem yarandı', error };
    }
});
