import { pgTable, integer, serial, varchar, text, timestamp, boolean,pgEnum } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
export const activeEnum = pgEnum("active", ["active", "passive", "pending"]);

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean('email_verified').default(false).notNull(), // Default ekleyin
    image: text('image'),
    username: varchar("username", { length: 255 }).unique(),
    about: text("about"),
    website: varchar("website", { length: 255 }),
    address: varchar("address", { length: 255 }),
    duty: varchar("duty", { length: 50 }).default("user").notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    image: text("image"),
    description: text("description"),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    userId: text("user_id")
        .references(() => user.id, { onDelete: "cascade" })
        .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    image: text("image").notNull(),
    description: text("description").notNull(),
    content: text("content").notNull(),
    price: integer("price").notNull(),
    active: activeEnum().default('active'),
    keywords: text("keywords").notNull(),
    requirements: text("requirements").array().notNull(),
    features: text("features").array().notNull(),
    demoLink: text("demo_link"),
    categoryId: integer("category_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const productsRelations = relations(products, ({ one }) => ({
    category: one(categories)
}))
export const categoriesRelations = relations(categories, ({ many }) => ({
    products: many(products)
}))

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(() => user.id)
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(() => user.id),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at')
});

