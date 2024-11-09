import {
  integer,
  pgTable,
  varchar,
  uuid,
  text,
  primaryKey,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const UserTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  college: varchar({ length: 255 }).notNull(),
  countryCode: varchar("country_code", { length: 5 }).notNull(),
  phone: varchar({ length: 15 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const ProjectTable = pgTable("projects", {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  pptLink: varchar("ppt_link", { length: 255 }).notNull(),
  approved: boolean().notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const UserToProjectTable = pgTable(
  "user_to_project",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => UserTable.id),
    projectId: integer("project_id")
      .notNull()
      .references(() => ProjectTable.id),
  },
  ({ projectId, userId }) => ({
    pk: primaryKey({
      columns: [projectId, userId],
    }),
  })
);

export const UserRelations = relations(UserTable, ({ many }) => ({
  projects: many(ProjectTable),
}));

export const ProjectRelations = relations(ProjectTable, ({ many }) => ({
  users: many(UserTable),
}));
