import type { APIContext, MiddlewareNext } from "astro";
import { API_URL } from "../lib/consts";
import axios, { AxiosError } from "axios";

/**
 * @type {import("astro").MiddlewareHandler}
 */
export async function auth(context: APIContext, next: MiddlewareNext) {
  const token = context.cookies.get("token");

  try {
    const response = await axios.get(`${API_URL}/users/user`, {
      headers: { Authorization: `Bearer ${token?.value}` },
    });

    const user = response.data?.data;
    context.locals.user = user;
    if (/^\/auth(\/.*)?$/.test(context.url.pathname)) {
      return next("/");
    }
    return next();
  } catch (error: any) {
    console.error("Auth Middleware Error:", error.message || error);
    if (/^\/dashboard(\/.*)?$/.test(context.url.pathname)) {
      return next("/auth/login");
    }
    return next();
  }
}
