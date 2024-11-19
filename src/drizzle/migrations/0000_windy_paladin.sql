CREATE TABLE IF NOT EXISTS "startup_cafe" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "startup_cafe_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"startup_name" varchar(255) NOT NULL,
	"college_name" varchar(255) NOT NULL,
	"college_email" varchar(255) NOT NULL,
	"college_phone" varchar(15) NOT NULL,
	"same_institution" boolean NOT NULL,
	"member_count" varchar(5) NOT NULL,
	"sdg" varchar(255) NOT NULL,
	"problem_statement" text NOT NULL,
	"solution" text NOT NULL,
	"approved" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
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
	"startup_cafe_id" integer NOT NULL,
	CONSTRAINT "student_to_startup_cafe_startup_cafe_id_student_id_pk" PRIMARY KEY("startup_cafe_id","student_id")
);
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
