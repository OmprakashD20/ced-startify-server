import { z } from "zod";

export const StartupDistrictMemberSchema = z.object({
  name: z.string().min(2, { message: "Co-founder name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Invalid phone number." }),
});

export const StartupDistrictSchema = z.object({
  body: z.object({
    startupName: z.string().min(2, { message: "Startup name is required." }),
    registrationNumber: z.string().optional(),
    founderName: z.string().min(2, { message: "Founder name is required." }),
    founderEmail: z.string().email({ message: "Invalid email address." }),
    founderPhone: z.string().min(10, { message: "Invalid phone number." }),
    coFounders: z.array(StartupDistrictMemberSchema),
    aboutCompany: z.string().min(10, {
      message: "Please provide some information about your company.",
    }),
    sdg: z.string().min(2, { message: "SDG selection is required." }),
    startupType: z.enum(["Manufacturing", "Services"], {
      required_error: "Startup type is required.",
    }),
    sector: z.string().min(2, { message: "Sector is required." }),
    productDetails: z
      .string()
      .min(10, { message: "Please provide some details about your product." }),
    paymentId: z.string().min(2, { message: "Payment ID is required." }),
  }),
});

export type StartupDistrictMemberSchemaType = z.infer<
  typeof StartupDistrictMemberSchema
>;

export type StartupDistrictSchemaType = z.infer<typeof StartupDistrictSchema>;
