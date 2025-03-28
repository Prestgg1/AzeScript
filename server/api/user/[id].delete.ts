import { defineEventHandler, getRouterParam } from 'h3';
import { useDrizzle } from "~/server/utils/drizzle"
import { user, account,session } from '~/db/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    if (!id) {
        return { status: 400, message: 'User ID Yazilmalıdır' };
    }

    try {
 
             await useDrizzle().delete(account).where(eq(account.userId, id))
             await useDrizzle().delete(session).where(eq(session.userId, id));

        // Then delete the user
        const deletedUser = await useDrizzle().delete(user).where(eq(user.id, id)).returning();

        if (!deletedUser) {
            return { status: 404, message: 'User tapılmadı' };
        }

        return { status: 200, message: 'User uğurla silindi', deletedUser };
    } catch (error) {
        return { status: 500, message: 'User silinərkən problem yarandı', error };
    }  
});
