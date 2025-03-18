import { useDrizzle } from "~/server/utils/drizzle";
import { comments } from "@/db/schema";
import { auth } from "~/utils/auth";

export default defineEventHandler(async (event) => {
  const user = await auth.api.getSession({ headers: event.headers });
  const productId: number = Number(getRouterParam(event, "id"));
  
  // Request body'yi okuma
  const body = await readBody(event);
  const { rating, content } = body;

  // Kullanıcı doğrulama
  if (!user || !user.user?.id) {
    return { statusCode: 401, statusMessage: "Unauthorized" };
  }

  const userId = user.user.id;

  // Yorum ekleme
  try {
    const result = await useDrizzle().insert(comments).values({
      userId,
      productId,
      rating,
      content,
    }).returning();  

    if (result.length === 0) {
      return { statusCode: 400, statusMessage: "Failed to create comment" };
    }

    return { success: true };
  } catch (error) {
    // Hata durumunda düzgün bir hata mesajı döndürme
    console.error(error);
    return { statusCode: 500, statusMessage: "Internal Server Error" };
  }
});
