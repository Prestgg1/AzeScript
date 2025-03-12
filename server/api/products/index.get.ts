import { products, categories } from "@/db/schema"
import { useDrizzle } from "~/server/utils/drizzle"
import { eq, count } from 'drizzle-orm';
import { addRouteMiddleware } from "nuxt/app";
import { auth } from "~/utils/auth";

export default defineEventHandler(async (event) => {
 //   const session = await auth.api.getSession({
 //       headers: event.headers
  //    });
  //    if (!session) {
  //      return { error: "Unauthorized" };
  //    }
 const page = Number(getQuery(event).page || '1')
 const limit = 8
 const totalCount = await useDrizzle().select({ count: count() }).from(products).leftJoin(categories, eq(categories.id,products.categoryId)).then(res=>res[0].count)
 const totalPages = Math.ceil(totalCount / limit)
 const offset = (page - 1) * limit

    const scriptler = await useDrizzle()
        .select({
            id:products.id,
            title:products.title,
            image:products.image,
            description:products.description,
            price:products.price,
            slug:products.slug,
        })
        .from(products)
        .leftJoin(categories, eq(categories.id,products.categoryId)).limit(limit).offset(offset)
      

    return {
        data: scriptler,
        pagination:{
          currentPage: page,
          totalPages,
          totalCount
        }
    }
})
