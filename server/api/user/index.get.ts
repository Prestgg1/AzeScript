import { user } from "@/db/schema"
import { useDrizzle } from "~/server/utils/drizzle"
export default defineEventHandler(async (event) => {
    const istifadeciler = await useDrizzle().select().from(user)
    return {
        istifadeciler
    }
})
