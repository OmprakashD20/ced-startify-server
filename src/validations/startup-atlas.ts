import { z } from "zod";

export const StartupAtlasSchema = z.object({
  body: z.object({
    isIndianStudent: z.enum(["yes", "no"], {
      required_error: "Please select if you are an Indian student.",
    }),
    nationality: z.string().min(2),
    institution: z.object({
      name: z.string().min(2),
      pocName: z.string().min(2),
      pocPhone: z.string().min(10),
      pocEmail: z.string().email(),
    }),
    student: z.object({
      name: z.string().min(2),
      phone: z.string().min(10),
      email: z.string().email(),
      degree: z.string().min(2),
      department: z.string().min(2),
      yearOfStudy: z.enum(["1", "2", "3", "4", "5"]),
    }),
    institutionBonafide: z.string().url(),
  }),
});

export type StartupAtlasSchemaType = z.infer<typeof StartupAtlasSchema>;
