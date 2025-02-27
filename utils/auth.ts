import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema";
import { createAuthClient } from "better-auth/vue";
import { useDrizzle } from "@/server/utils/drizzle";


export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: true
    },
    basePath: "/api/auth",
    user: {
        additionalFields: {
            website: {
                type: "string",
                required: false,
                defaultValue: null,
            },
            address: {
                type: "string",
                required: false,
                defaultValue: null,
            },
            about: {
                type: "string",
                required: false,
                defaultValue: null,
            },
            duty: {
                type: "string",
                required: false,
                defaultValue: "user",
            },
            username: {
                type: "string",
                required: true,
                unique: true,
            }
        },
        input: true,
        modelName: "user",
        fields: {
            email: "email",
            name: "name",
            image: "image",
            address: "address",
            website: "website",
            about: "about",
            username: "username",
            duty: "duty",
        },
    },
    database: drizzleAdapter(useDrizzle(), {
        provider: "pg",
        schema: {
            ...schema,
            user: schema.user,
        },
    })
})

export const { signIn, signUp, useSession } = createAuthClient()