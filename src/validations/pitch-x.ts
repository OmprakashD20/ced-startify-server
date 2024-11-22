import { z } from "zod";

export const PitchXMemberSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Invalid phone number." }),
});

export const PitchXSchema = z.object({
  body: z.object({
    name: z.string().min(2, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Invalid phone number." }),
    studentStatus: z.enum(["student", "alumni"], {
      required_error: "Please specify if you're a student or alumni.",
    }),
    collegeName: z
      .string()
      .min(2, { message: "College name is required." })
      .optional(),
    memberCount: z
      .string()
      .refine((val) => ["1", "2", "3", "4"].includes(val), {
        message: "Please select the no. of team members.",
      }),
    teamMembers: z
      .array(PitchXMemberSchema)
      .min(1, { message: "At least 1 team member is required." })
      .max(4, { message: "Maximum 4 team members allowed." }),
    isStartupRegistered: z.enum(["yes", "no"], {
      required_error: "Please specify if your startup is registered.",
    }),
    registrationDetails: z.string().optional(),
    sdg: z.string().min(2, { message: "SDG selection is required." }),
    pitchDeck: z.string().url({ message: "Upload your Pitch Deck" }),
    paymentId: z.string().min(2, { message: "Payment ID is required." }),
  }),
});

export type PitchXMemberSchemaType = z.infer<typeof PitchXMemberSchema>;
export type PitchXSchemaType = z.infer<typeof PitchXSchema>;
