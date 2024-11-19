CREATE TABLE IF NOT EXISTS "co_founders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone" varchar(256) NOT NULL,
	"company_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"address" text NOT NULL,
	"type" varchar(256) NOT NULL,
	"sector" varchar(256) NOT NULL,
	"founder_id" integer,
	"has_co_founders" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "founders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "startup_mughavari" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "startup_mughavari_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"company_id" integer,
	"approved" boolean DEFAULT false,
	"payment_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "startup_cafe" ALTER COLUMN "startup_name" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "startup_cafe" ALTER COLUMN "college_name" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "startup_cafe" ALTER COLUMN "college_email" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "startup_cafe" ALTER COLUMN "sdg" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "name" SET DATA TYPE varchar(256);--> statement-breakpoint
ALTER TABLE "students" ALTER COLUMN "email" SET DATA TYPE varchar(256);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "co_founders" ADD CONSTRAINT "co_founders_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "companies" ADD CONSTRAINT "companies_founder_id_founders_id_fk" FOREIGN KEY ("founder_id") REFERENCES "public"."founders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "startup_mughavari" ADD CONSTRAINT "startup_mughavari_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
