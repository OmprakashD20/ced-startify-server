import { z } from "zod";

export const StartupAtlasSchema = z.object({
  body: z.object({
    isIndianStudent: z
      .enum(["yes", "no"], {
        required_error: "Please select if you are an Indian student.",
      })
      .refine((val) => val === "yes" || val === "no", {
        message: "Please select a valid option (yes or no).",
      }),

    nationality: z.string().min(2, {
      message:
        "Nationality is required and must be at least 2 characters long.",
    }),

    institution: z.object({
      name: z.string().min(2, {
        message:
          "Institution name is required and must be at least 2 characters long.",
      }),

      pocName: z.string().min(2, {
        message:
          "Point of contact name is required and must be at least 2 characters long.",
      }),

      pocPhone: z.string().min(10, {
        message:
          "Point of contact phone number must be at least 10 characters long.",
      }),

      pocEmail: z.string().email({
        message: "Please enter a valid email address for the point of contact.",
      }),
    }),

    student: z.object({
      name: z.string().min(2, {
        message:
          "Student name is required and must be at least 2 characters long.",
      }),

      phone: z.string().min(10, {
        message: "Student phone number must be at least 10 characters long.",
      }),

      email: z.string().email({
        message: "Please enter a valid email address for the student.",
      }),

      degree: z.string().min(2, {
        message: "Degree is required and must be at least 2 characters long.",
      }),

      department: z.string().min(2, {
        message:
          "Department is required and must be at least 2 characters long.",
      }),

      yearOfStudy: z.enum(["1", "2", "3", "4", "5"], {
        message: "Year of study must be a valid number between 1 and 5.",
      }),
    }),

    institutionBonafide: z
      .string()
      .url({ message: "Institution bonafide must be a valid URL." }),

    paymentId: z.string().min(2, {
      message: "Payment ID is required and must be at least 2 characters long.",
    }),
  }),
});

export type StartupAtlasSchemaType = z.infer<typeof StartupAtlasSchema>;
