import * as z from "zod";

export const ScholarSpinoffSchema = z.object({
  body: z.object({
    scholarName: z.string().min(2, { message: "Scholar name is required." }),
    scholarEmail: z.string().email({ message: "Invalid email address." }),
    scholarPhone: z.string().min(10, { message: "Invalid phone number." }),
    university: z.string().min(2, { message: "University name is required." }),
    institution: z
      .string()
      .min(2, { message: "Institution name is required." }),
    institutionDistrict: z
      .string()
      .min(2, { message: "District is required." }),
    department: z.string().min(2, { message: "Department is required." }),
    areaOfResearch: z
      .string()
      .min(2, { message: "Area of research is required." }),
    sdg: z
      .string()
      .min(2, { message: "Sustainable Development Goal is required." }),
    researchProblem: z
      .string()
      .max(1000, { message: "Research problem should not exceed 100 words." }),
    solution: z
      .string()
      .max(1000, { message: "Solution should not exceed 100 words." }),
    trlLevel: z.string().min(1, { message: "TRL level is required." }),
    paymentId: z.string().min(2, { message: "Payment ID is required." }),
  }),
});

export type ScholarSpinoffSchemaType = z.infer<typeof ScholarSpinoffSchema>;
