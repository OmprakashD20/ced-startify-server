import { z } from "zod";

export const BaseSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
  paymentId: z
    .string()
    .min(5, { message: "Payment ID must be at least 5 characters" }),
});

export const StudentSchema = z.object({
  collegeName: z.string().min(2, { message: "College name is required" }),
  degree: z.string().min(2, { message: "Degree is required" }),
  department: z.string().min(2, { message: "Department is required" }),
  yearOfStudy: z.string().min(1, { message: "Year of study is required" }),
});

export const ProfessionalSchema = z.object({
  designation: z.string().min(2, { message: "Designation is required" }),
  companyName: z.string().min(2, { message: "Company name is required" }),
  sector: z.string().min(2, { message: "Sector is required" }),
});

export const EntrepreneurSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  startupType: z.enum(["Manufacturing", "Services"]),
  sector: z.string().min(2, { message: "Sector is required" }),
});

export const StartupPathFinderSchema = z.object({
  body: z.discriminatedUnion("role", [
    z.object({
      ...BaseSchema.shape,
      role: z.literal("Student"),
      ...StudentSchema.shape,
    }),
    z.object({
      ...BaseSchema.shape,
      role: z.literal("Professional"),
      ...ProfessionalSchema.shape,
    }),
    z.object({
      ...BaseSchema.shape,
      role: z.literal("Entrepreneur"),
      ...EntrepreneurSchema.shape,
    }),
  ]),
});

export type StartupPathFinderSchemaType = z.infer<
  typeof StartupPathFinderSchema
>;

export type StudentSchemaType = z.infer<typeof StudentSchema>;
export type ProfessionalSchemaType = z.infer<typeof ProfessionalSchema>;
export type EntrepreneurSchemaType = z.infer<typeof EntrepreneurSchema>;
