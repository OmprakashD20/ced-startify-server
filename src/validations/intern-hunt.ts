import * as z from "zod";

export const InternHuntStartupSchema = z.object({
  startupName: z.string().min(1, "Startup name is required"),
  founderName: z.string().min(1, "Founder name is required"),
  designation: z.string().min(1, "Designation is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Invalid mobile number"),
  website: z.string().url().optional(),
  location: z.string().min(1, "Location is required"),
  industryDomain: z.enum([
    "Technology",
    "Healthcare",
    "Education",
    "E-commerce",
    "Fintech",
    "Social Impact",
    "Manufacturing",
    "Other",
  ]),
  otherIndustryDomain: z.string().optional(),
  internshipRoles: z.enum([
    "Business Development",
    "Marketing & Social Media",
    "Web Development & UI/UX Design",
    "Data Science & Analytics",
    "Finance & Accounting",
    "Operations & Supply Chain",
    "HR & Talent Management",
    "Product Management",
    "Other",
  ]),
  otherInternshipRole: z.string().optional(),
  preferredSkills: z.string().min(1, "Preferred skills are required"),
  internshipPositions: z.string().min(1, "Number of positions is required"),
  internshipDuration: z.enum([
    "Less than 1 month",
    "1-3 months",
    "3-6 months",
    "More than 6 months",
  ]),
  internshipMode: z.enum(["On-site", "Remote", "Hybrid"]),
  stipendDetails: z.string().optional(),
  isPaid: z.enum(["Paid", "Unpaid"]),
});

export const InternHuntStudentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Invalid mobile number"),
  gender: z.enum(["Male", "Female", "Other"]),
  institutionName: z.string().min(1, "Institution name is required"),
  course: z.string().min(1, "Course/Program is required"),
  yearOfStudy: z.enum([
    "1st Year",
    "2nd Year",
    "3rd Year",
    "4th Year",
    "Other",
  ]),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  preferredDomain: z.enum([
    "Business Development",
    "Marketing & Social Media",
    "Web Development & UI/UX Design",
    "Data Science & Analytics",
    "Finance & Accounting",
    "Operations & Supply Chain",
    "HR & Talent Management",
    "Product Management",
    "Other",
  ]),
  otherPreferredDomain: z.string().optional(),
  preferredInternshipType: z.enum([
    "Virtual Internship",
    "On-site Internship",
    "Both Virtual and On-site",
  ]),
  availability: z.enum([
    "Full-time (3 months or more)",
    "Part-time (3-6 months)",
    "Short-term (1-3 months)",
    "Long Term (More than 6 Months)",
  ]),
  openToUnpaid: z.enum([
    "Yes",
    "No",
    "Open to both paid and unpaid internships",
  ]),
  skills: z.string().min(1, "At least one skill is required"),
  otherSkills: z.string().optional(),
  previousExperience: z.string().optional(),
  resume: z.string().url().optional(),
  participationReason: z.string().min(1, "Participation reason is required"),
  preferredStartupType: z.enum([
    "Technology",
    "Healthcare",
    "E-commerce",
    "Fintech",
    "Social Impact",
    "Manufacturing",
    "Education",
    "Other",
  ]),
  otherPreferredStartupType: z.string().optional(),
});

export const InternHuntSchema = z.object({
  body: z.discriminatedUnion("userType", [
    z.object({
      userType: z.literal("startup"),
      ...InternHuntStartupSchema.shape,
    }),
    z.object({
      userType: z.literal("student"),
      ...InternHuntStudentSchema.shape,
    }),
  ]),
});

export type InternHuntStartupSchemaType = z.infer<
  typeof InternHuntStartupSchema
>;
export type InternHuntStudentSchemaType = z.infer<
  typeof InternHuntStudentSchema
>;

export type InternHuntSchemaType = z.infer<typeof InternHuntSchema>;
