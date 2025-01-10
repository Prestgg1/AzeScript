import { sequence } from "astro/middleware";
import { auth } from "./auth.ts";

export const onRequest = sequence(auth);
