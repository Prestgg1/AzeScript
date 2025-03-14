CREATE TYPE "public"."active" AS ENUM('active', 'passive', 'pending');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "active" "active" DEFAULT 'active';