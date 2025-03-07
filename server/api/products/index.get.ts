import { products, categories } from "@/db/schema"
import { useDrizzle } from "~/server/utils/drizzle"
import { eq, count } from 'drizzle-orm';
import { addRouteMiddleware } from "nuxt/app";
import { auth } from "~/utils/auth";

export default defineEventHandler(async (event) => {
    const session = await auth.api.getSession({
        headers: event.headers
      });
      if (!session) {
        return { error: "Unauthorized" };
      }
    // Ürünleri ve kategori adlarını çekmek için join kullanıyoruz
    const scriptler = await useDrizzle()
        .select({
            id:products.id,
            title:products.title,
      //      userId:products.userId,
               image:products.image,
       //     description:products.description,
       //     content:products.content,
       //     requirements:products.requirements,
       //     keywords:products.keywords,
            price:products.price,
            slug:products.slug,
       //     category:categories.name
        })
        .from(products)
        .leftJoin(categories, eq(categories.id,products.categoryId)) // Burada join işlemi
      

    return {
        data: scriptler // Bu şekilde kategori ismi de dahil olur
    }
})
