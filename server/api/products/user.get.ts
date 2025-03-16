import { favorites, products } from "@/db/schema";
import { useDrizzle } from "~/server/utils/drizzle";
import { count } from "drizzle-orm";
import { auth } from "~/utils/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  if (!session) {
    return { error: "Unauthorized" };
  }

  const page = Number(getQuery(event).page || "1");
  const limit = 8;
  const offset = (page - 1) * limit;

  // Toplam ürün sayısını al
  const totalCount = await useDrizzle()
    .query.products.findMany({
      where: (products, { eq }) => eq(products.userId, session.user.id),
      columns: {
        id: true,
      },
    })
    .then((res) => res.length);

  const totalPages = Math.ceil(totalCount / limit);

  // Ürünleri çekiyoruz (Kategori bilgisi ile)
  const scriptler = await useDrizzle().query.products.findMany({
    where: (products, { eq }) => eq(products.userId, session.user.id),
    columns: {
      id: true,
      title: true,
      image: true,
      active: true,
      description: true,
      price: true,
      slug: true,
    },
    with: {
      category: {
        columns: {
          name: true,
        },
      },
      favorites: { id: true }
    },
    limit,
    offset,
  });

  return {
    data: scriptler,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
    },
  };
});
