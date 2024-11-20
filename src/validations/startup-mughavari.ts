import * as z from "zod";

export const CoFounderSchema = z.object({
  name: z.string().min(2, { message: "Co-founder name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Invalid phone number." }),
});

export const StartupMughavariSchema = z.object({
  body: z.object({
    founder: z.object({
      name: z.string().min(2, { message: "Founder name is required." }),
      email: z.string().email({ message: "Invalid email address." }),
      phone: z.string().min(10, { message: "Invalid phone number." }),
    }),
    hasCoFounders: z.boolean(),
    coFounders: z.array(CoFounderSchema).optional(),
    company: z.object({
      name: z.string().min(2, { message: "Company name is required." }),
      address: z.string().min(5, { message: "Company address is required." }),
      type: z.enum(["Manufacturing", "Services"], {
        required_error: "Please select a company type.",
      }),
      sector: z.string().min(2, { message: "Company sector is required." }),
    }),
    paymentId: z
      .string()
      .min(2, { message: "Complete your payment to submit our application." }),
  }),
});

export type StartupMughavariSchemaType = z.infer<typeof StartupMughavariSchema>;
