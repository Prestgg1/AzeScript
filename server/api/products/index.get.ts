import { products } from "@/db/schema"
import { useDrizzle } from "~/server/utils/drizzle"
export default defineEventHandler(async (event) => {
    const scriptler = await useDrizzle().select().from(products)
    return {
        scriptler
    }
})
