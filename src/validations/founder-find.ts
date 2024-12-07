import { z } from "zod";

export const FounderFindSchema = z.object({
  body: z.object({
    founderType: z.enum(["founder", "cofounder", "both"], {
      required_error: "Please select your role.",
    }),
    name: z.string().min(2, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Invalid phone number." }),
    currentStatus: z.enum(
      [
        "student",
        "studentEntrepreneur",
        "workingProfessional",
        "faculty",
        "fullTimeEntrepreneur",
      ],
      { required_error: "Please select your current status." }
    ),
    startupStatus: z.enum(["registered", "inProcess", "notApplicable"], {
      required_error: "Please select your startup status.",
    }),
    startupName: z.string().optional(),
    designation: z.string().optional(),
    cityOfOperation: z
      .string()
      .min(2, { message: "City of operation is required." }),
    startupKeyVertical: z
      .string()
      .min(2, { message: "Startup key vertical is required." }),
    interestedStartupAreas: z.array(z.string()).min(1, {
      message: "Please select at least one interested startup area.",
    }),
    cofounderCount: z.string().optional(),
    interestedRoles: z
      .array(z.string())
      .min(1, { message: "Please select at least one interested role." }),
    paymentId: z.string().min(1, "Payment ID is required"),
  }),
});

export type FounderFindSchemaType = z.infer<typeof FounderFindSchema>;
