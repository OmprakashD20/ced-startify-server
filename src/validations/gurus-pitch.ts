import { z } from "zod";

export const GurusPitchMemberSchema = z.object({
  name: z.string().min(2, { message: "Co-founder name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Invalid phone number." }),
});

export const GurusPitchSchema = z.object({
  body: z.object({
    collegeName: z.string().min(2, { message: "College name is required." }),
    collegeDistrict: z
      .string()
      .min(2, { message: "College district is required." }),
    facultyName: z.string().min(2, { message: "Faculty name is required." }),
    facultyPhone: z.string().min(10, { message: "Invalid phone number." }),
    facultyEmail: z.string().email({ message: "Invalid email address." }),
    coFounders: z.array(GurusPitchMemberSchema),
    startupName: z.string().min(2, { message: "Startup name is required." }),
    isStartupRegistered: z.enum(["yes", "no"], {
      required_error: "Please specify if the startup is registered.",
    }),
    yearsLeadingStartup: z
      .string()
      .min(1, { message: "Please specify the number of years." }),
    sdg: z.array(z.string()).length(3, {
      message: "Please specify 3 SDGs that your startup idea applies to.",
    }),
    startupType: z.enum(["Manufacturing", "Services"], {
      required_error: "Startup type is required.",
    }),
    sector: z.enum(
      [
        "Agriculture",
        "Mining and Extraction",
        "Manufacturing",
        "Construction & Real Estate",
        "Transportation and Logistics",
        "Retail and Wholesale",
        "Information Technology & Telecom",
        "Financial Services & Tech",
        "Healthcare & Tech",
        "Education & Tech",
        "Hospitality and Tourism",
        "Media and Entertainment",
        "Energy & Sustainability",
        "Aerospace and Defense",
        "Deep Tech",
        "Others",
      ],
      {
        required_error: "Sector is required.",
      }
    ),
    pitchDeck: z.string().url({ message: "Upload your pitch deck." }),
    paymentId: z.string().min(2, { message: "Payment ID is required." }),
  }),
});

export type GurusPitchMemberSchemaType = z.infer<typeof GurusPitchMemberSchema>;

export type GurusPitchSchemaType = z.infer<typeof GurusPitchSchema>;
