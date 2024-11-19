import {
  integer,
  pgTable,
  varchar,
  uuid,
  text,
  primaryKey,
  boolean,
  timestamp,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { start } from "repl";

export const StudentTable = pgTable("students", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 256 }).notNull(),
  email: varchar({ length: 256 }).notNull().unique(),
  phone: varchar({ length: 15 }).notNull(),
  degree: varchar({ length: 100 }).notNull(),
  department: varchar({ length: 100 }).notNull(),
  yearOfStudy: varchar("year_of_study", { length: 5 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const StartUpCafeTable = pgTable("startup_cafe", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  startupName: varchar("startup_name", { length: 256 }).notNull(),
  collegeName: varchar("college_name", { length: 256 }).notNull(),
  collegeEmail: varchar("college_email", { length: 256 }).notNull(),
  collegePhone: varchar("college_phone", { length: 15 }).notNull(),
  sameInstitution: boolean("same_institution").notNull(),
  memberCount: varchar("member_count", { length: 5 }).notNull(),
  sdg: varchar("sdg", { length: 256 }).notNull(),
  problemStatement: text("problem_statement").notNull(),
  solution: text("solution").notNull(),
  approved: boolean().default(false),
  paymentId: text("payment_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const StudentToStartUpCafeTable = pgTable(
  "student_to_startup_cafe",
  {
    studentId: uuid("student_id")
      .notNull()
      .references(() => StudentTable.id),
    startupCafeId: integer("startup_cafe_id")
      .notNull()
      .references(() => StartUpCafeTable.id),
  },
  ({ startupCafeId, studentId }) => ({
    pk: primaryKey({
      columns: [startupCafeId, studentId],
    }),
  })
);

export const FounderTable = pgTable("founders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 256 }).notNull(),
});

export const CompanyTable = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  address: text("address").notNull(),
  type: varchar("type", { length: 256 }).notNull(),
  sector: varchar("sector", { length: 256 }).notNull(),
  founderId: integer("founder_id").references(() => FounderTable.id),
  hasCoFounders: boolean("has_co_founders").default(false),
});

export const CoFounderTable = pgTable("co_founders", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 256 }).notNull(),
  companyId: integer("company_id").references(() => CompanyTable.id),
});

export const StartupMughavariTable = pgTable("startup_mughavari", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  companyId: integer("company_id").references(() => CompanyTable.id),
  approved: boolean().default(false),
  paymentId: text("payment_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const StudentRelations = relations(StudentTable, ({ many }) => ({
  startupCafe: many(StartUpCafeTable),
}));

export const StartUpCafeRelations = relations(StartUpCafeTable, ({ many }) => ({
  students: many(StudentTable),
}));

export const FounderRelations = relations(FounderTable, ({ one }) => ({
  company: one(CompanyTable),
}));

export const CompanyRelations = relations(CompanyTable, ({ one, many }) => ({
  founder: one(FounderTable, {
    fields: [CompanyTable.founderId],
    references: [FounderTable.id],
  }),
  coFounders: many(CoFounderTable),
  startupMughavari: one(StartupMughavariTable, {
    fields: [CompanyTable.id],
    references: [StartupMughavariTable.companyId],
  }),
}));

export const CoFounderRelations = relations(CoFounderTable, ({ one }) => ({
  company: one(CompanyTable, {
    fields: [CoFounderTable.companyId],
    references: [CompanyTable.id],
  }),
}));

export const StartupMughavariRelations = relations(
  StartupMughavariTable,
  ({ one }) => ({
    company: one(CompanyTable),
  })
);
