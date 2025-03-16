import { products, productsRelations, categories } from "@/db/schema";
import { useDrizzle } from "~/server/utils/drizzle";
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {

    const slug: any = getRouterParam(event, 'slug');

    const product = await useDrizzle().query.products.findFirst({
        columns: {
            id: true,
            title: true,
            image: true,
            keywords: true,
            content: true,
            description: true,
            averageRating: true,
            price: true,
            features: true,
            requirements: true,
            demoLink: true,
            slug: true,
        },
        with: {
            category: {
                columns: {
                    name: true
                }
            },
            favorites: {
                columns: {
                    id: true
                }
            },
            comments: {
                columns: {
                    id: true,
                }
            }
        },
        where: eq(products.slug, slug)
    })



    return {
        data: product,
    };
});
