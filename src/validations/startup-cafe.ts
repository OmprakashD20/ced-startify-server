import * as z from "zod";

import { StudentSchema } from "./student";

export const StartUpCafeSchema = z.object({
  body: z.object({
    paymentId: z.string({
      required_error: "Complete your payment to submit our application.",
    }),
    startupName: z
      .string({
        required_error: "Startup name is required.",
      })
      .min(2, { message: "Startup name must be at least 2 characters." }),
    collegeName: z
      .string({
        required_error: "College name is required.",
      })
      .min(2, { message: "College name is required." }),
    collegeEmail: z
      .string({
        required_error: "College email is required.",
      })
      .email({ message: "Invalid email address." }),
    collegePhone: z
      .string({
        required_error: "College phone number is required.",
      })
      .min(10, { message: "Invalid phone number." }),
    sameInstitution: z.enum(["yes", "no"], {
      required_error:
        "Please select if all team members are from the same institution.",
    }),
    memberCount: z
      .string({
        required_error: "Please select the number of team members.",
      })
      .refine((val) => ["1", "2", "3", "4"].includes(val), {
        message: "Please select the no. of team members.",
      }),
    teamMembers: z
      .array(StudentSchema)
      .min(1, { message: "At least 1 team member is required." })
      .max(4, { message: "Maximum 4 team members allowed." }),
    sdg: z
      .string({
        required_error: "Sustainable Development Goal is required.",
      })
      .min(2, { message: "Sustainable Development Goal is required." }),
    problemStatement: z
      .string({
        required_error: "Your problem statement is required.",
      })
      .max(1000, { message: "Problem statement should not exceed 100 words." }),
    solution: z
      .string({
        required_error: "Your solution is required.",
      })
      .max(1000, { message: "Solution should not exceed 100 words." }),
  }),
});

export type StartUpCafeSchemaType = z.infer<typeof StartUpCafeSchema>;
