import type { APIContext, MiddlewareHandler, MiddlewareNext } from "astro";
import { API_URL } from "../lib/consts";
import axios, { AxiosError } from "axios";

/**
 * @type {import("astro").MiddlewareHandler}
 */
export async function auth(context:APIContext, next:MiddlewareNext) {
  const token = context.cookies.get("token");

  if (!token) {
    // Kullanıcı giriş yapmadıysa login sayfasına yönlendir
    return next("/auth/login");
  }

  try {
    const response = await axios.get(`${API_URL}/users/user`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });

    const user = response.data?.data;
    if (!user) {
      // Kullanıcı doğrulama başarısızsa login sayfasına yönlendir
      return context.redirect("/auth/login");
    }

    // Kullanıcıyı `locals` içine kaydet
    context.locals.user = user;

    // Sonraki middleware'e devam et
    return next();
  } catch (error: any) {
    console.error("Auth Middleware Error:", error.message || error);
    return context.redirect("/auth/login");
  }
}
