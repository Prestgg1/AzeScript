import { categories } from "@/db/schema"
import { useDrizzle } from "~/server/utils/drizzle"
export default defineEventHandler(async (event) => {
    const categoriler = await useDrizzle().select().from(categories)
    return {
        categoriler
    }
})
