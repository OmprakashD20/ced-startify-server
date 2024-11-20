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
CREATE TABLE IF NOT EXISTS "startup_cafe" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"startup_name" varchar(256) NOT NULL,
	"college_name" varchar(256) NOT NULL,
	"college_email" varchar(256) NOT NULL,
	"college_phone" varchar(15) NOT NULL,
	"same_institution" boolean NOT NULL,
	"member_count" varchar(5) NOT NULL,
	"sdg" varchar(256) NOT NULL,
	"problem_statement" text NOT NULL,
	"solution" text NOT NULL,
	"approved" boolean DEFAULT false,
	"payment_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "startup_mughavari" (
	"id" varchar(256) PRIMARY KEY NOT NULL,
	"company_id" integer,
	"approved" boolean DEFAULT false,
	"payment_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"degree" varchar(100) NOT NULL,
	"department" varchar(100) NOT NULL,
	"year_of_study" varchar(5) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "student_to_startup_cafe" (
	"student_id" uuid NOT NULL,
	"startup_cafe_id" varchar NOT NULL,
	CONSTRAINT "student_to_startup_cafe_startup_cafe_id_student_id_pk" PRIMARY KEY("startup_cafe_id","student_id")
);
--> statement-breakpoint
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_to_startup_cafe" ADD CONSTRAINT "student_to_startup_cafe_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "student_to_startup_cafe" ADD CONSTRAINT "student_to_startup_cafe_startup_cafe_id_startup_cafe_id_fk" FOREIGN KEY ("startup_cafe_id") REFERENCES "public"."startup_cafe"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
