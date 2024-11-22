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
  id: varchar({ length: 256 }).primaryKey(),
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
    startupCafeId: varchar("startup_cafe_id")
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
  id: varchar({ length: 256 }).primaryKey(),
  companyId: integer("company_id").references(() => CompanyTable.id),
  approved: boolean().default(false),
  paymentId: text("payment_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const InternHuntStartupTable = pgTable("intern_hunt_startups", {
  id: varchar("id").primaryKey(),
  startupName: varchar("startup_name").notNull(),
  founderName: varchar("founder_name").notNull(),
  designation: varchar("designation").notNull(),
  email: varchar("email").notNull(),
  mobile: varchar("mobile").notNull(),
  website: varchar("website"),
  location: varchar("location").notNull(),
  industryDomain: varchar("industry_domain").notNull(),
  otherIndustryDomain: varchar("other_industry_domain"),
  internshipRoles: text("internship_roles").notNull(),
  otherInternshipRole: varchar("other_internship_role"),
  preferredSkills: text("preferred_skills").notNull(),
  internshipPositions: integer("internship_positions").notNull(),
  internshipDuration: varchar("internship_duration").notNull(),
  internshipMode: varchar("internship_mode").notNull(),
  stipendDetails: varchar("stipend_details"),
  isPaid: varchar("is_paid").notNull(),
  paymentId: varchar("payment_id").notNull(),
  approved: boolean().default(false),
});

export const InternHuntStudentTable = pgTable("intern_hunt_students", {
  id: varchar("id").primaryKey(),
  fullName: varchar("full_name").notNull(),
  email: varchar("email").notNull(),
  mobile: varchar("mobile").notNull(),
  gender: varchar("gender").notNull(),
  institutionName: varchar("institution_name").notNull(),
  course: varchar("course").notNull(),
  yearOfStudy: varchar("year_of_study").notNull(),
  dateOfBirth: varchar("date_of_birth").notNull(),
  preferredDomain: varchar("preferred_domain").notNull(),
  otherPreferredDomain: varchar("other_preferred_domain"),
  preferredInternshipType: varchar("preferred_internship_type").notNull(),
  availability: varchar("availability").notNull(),
  openToUnpaid: varchar("open_to_unpaid").notNull(),
  skills: text("skills").notNull(),
  otherSkills: varchar("other_skills"),
  previousExperience: text("previous_experience"),
  resume: varchar("resume"),
  participationReason: text("participation_reason").notNull(),
  preferredStartupType: varchar("preferred_startup_type").notNull(),
  otherPreferredStartupType: varchar("other_preferred_startup_type"),
  paymentId: varchar("payment_id").notNull(),
  approved: boolean().default(false),
});

export const StartupAtlasTable = pgTable("startup_atlas", {
  id: varchar("id").primaryKey(),
  isIndianStudent: varchar("is_indian_student").notNull(),
  nationality: varchar("nationality").notNull(),
  institutionName: varchar("institution_name").notNull(),
  institutionPocName: varchar("institution_poc_name").notNull(),
  institutionPocPhone: varchar("institution_poc_phone").notNull(),
  institutionPocEmail: varchar("institution_poc_email").notNull(),
  studentName: varchar("student_name").notNull(),
  studentPhone: varchar("student_phone").notNull(),
  studentEmail: varchar("student_email").notNull(),
  studentDegree: varchar("student_degree").notNull(),
  studentDepartment: varchar("student_department").notNull(),
  yearOfStudy: varchar("year_of_study").notNull(),
  institutionBonafide: varchar("institution_bonafide").notNull(),
  paymentId: varchar("payment_id").notNull(),
  approved: boolean().default(false),
});

export const ScholarSpinoffTable = pgTable("scholar_spinoff", {
  id: varchar("id").primaryKey(),
  scholarName: varchar("scholar_name").notNull(),
  scholarEmail: varchar("scholar_email").notNull(),
  scholarPhone: varchar("scholar_phone").notNull(),
  university: varchar("university").notNull(),
  institution: varchar("institution").notNull(),
  institutionDistrict: varchar("institution_district").notNull(),
  department: varchar("department").notNull(),
  areaOfResearch: varchar("area_of_research").notNull(),
  sdg: varchar("sdg").notNull(),
  researchProblem: text("research_problem").notNull(),
  solution: text("solution").notNull(),
  trlLevel: varchar("trl_level").notNull(),
  paymentId: varchar("payment_id").notNull(),
  approved: boolean().default(false),
});

export const StartupPathFinderTable = pgTable("startup_path_finder", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phoneNumber: varchar("phone_number").notNull(),
  role: varchar("role").notNull(),
  // Student fields
  collegeName: varchar("college_name"),
  degree: varchar("degree"),
  department: varchar("department"),
  yearOfStudy: varchar("year_of_study"),
  // Professional fields
  designation: varchar("designation"),
  // Entrepreneur fields
  startupType: varchar("startup_type"),
  // Common fields to Professional and Entrepreneur
  companyName: varchar("company_name"),
  sector: varchar("sector"),
  paymentId: varchar("payment_id").notNull(),
  approved: boolean().default(false),
});

export const PitchXMemberTable = pgTable("pitch_deck_members", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  pitchXId: varchar("pitch_deck_id").references(() => PitchXTable.id),
});

export const PitchXTable = pgTable("pitch_decks", {
  id: varchar("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }).notNull(),
  studentStatus: varchar("student_status", { length: 255 }).notNull(),
  collegeName: varchar("college_name", { length: 255 }),
  memberCount: varchar("member_count", { length: 255 }).notNull(),
  isStartupRegistered: varchar("is_startup_registered", {
    length: 255,
  }).notNull(),
  registrationDetails: text("registration_details"),
  sdg: varchar({ length: 255 }).notNull(),
  pitchDeck: varchar({ length: 255 }).notNull(),
  paymentId: varchar("payment_id").notNull(),
  approved: boolean().default(false),
});

export const GurusPitchTable = pgTable("gurus_pitch", {
  id: varchar("id").primaryKey(),
  collegeName: text("college_name").notNull(),
  collegeDistrict: text("college_district").notNull(),
  facultyName: text("faculty_name").notNull(),
  facultyPhone: varchar("faculty_phone").notNull(),
  facultyEmail: varchar("faculty_email").notNull(),
  startupName: varchar("startup_name").notNull(),
  isStartupRegistered: boolean("is_startup_registered").notNull(),
  yearsLeadingStartup: text("years_leading_startup").notNull(),
  sdg: text("sdg").notNull(),
  startupType: text("startup_type").notNull(),
  sector: text("sector").notNull(),
  pitchDeck: text("pitch_deck").notNull(),
  paymentId: varchar("payment_id").notNull(),
  approved: boolean().default(false),
});

export const GurusPitchMemberTable = pgTable("gurus_pitch_members", {
  id: serial("id").primaryKey(),
  gurusPitchId: varchar("gurus_pitch_id").references(() => GurusPitchTable.id),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone").notNull(),
});

export const StartupDistrictTable = pgTable("startup_district", {
  id: varchar("id").primaryKey(),
  startupName: text("startup_name").notNull(),
  registrationNumber: text("registration_number"),
  founderName: text("founder_name").notNull(),
  founderEmail: varchar("founder_email").notNull(),
  founderPhone: varchar("founder_phone").notNull(),
  aboutCompany: text("about_company").notNull(),
  sdg: text("sdg").notNull(),
  startupType: text("startup_type").notNull(),
  sector: text("sector").notNull(),
  productDetails: text("product_details").notNull(),
  paymentId: varchar("payment_id").notNull(),
  approved: boolean().default(false),
});

export const StartupDistrictMemberTable = pgTable("startup_district_members", {
  id: serial("id").primaryKey(),
  startupDistrictId: varchar("startup_district_id").references(
    () => StartupDistrictTable.id
  ),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone").notNull(),
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

export const PitchDeckMemberRelations = relations(
  PitchXMemberTable,
  ({ one }) => ({
    pitchDeck: one(PitchXTable, {
      fields: [PitchXMemberTable.pitchXId],
      references: [PitchXTable.id],
    }),
  })
);

export const PitchDeckRelations = relations(PitchXTable, ({ many }) => ({
  members: many(PitchXMemberTable),
}));
