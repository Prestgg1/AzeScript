import * as schema from "../../db/schema";

import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";

const sql = postgres(process.env.SUPABASE_URL as string);

export const useDrizzle = () => {
    return drizzle(sql, {
        schema
    });
}

export const tables = schema;

export const UserInsert = schema.user.$inferInsert;
export type UserRegisterType = Omit<typeof UserInsert, "createdAt" | "updatedAt" | "id" | "emailVerified">;