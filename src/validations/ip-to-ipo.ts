import * as z from "zod";

const IpoMemberSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Invalid phone number." }),
  role: z.string().min(2, { message: "Role is required." }),
});

export const IpToIpoSchema = z.object({
  body: z.object({
    // Section 1: Basic Information
    fullName: z.string().min(2, { message: "Full name is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    mobileNumber: z
      .string()
      .regex(/^\d{10}$/, { message: "Mobile number must be 10 digits." }),
    alternateContact: z.string().optional(),
    address: z.string().min(10, { message: "Address is required." }),

    // Section 2: Team Details
    applicationType: z.enum(["individual", "team"], {
      required_error: "Please specify if applying as individual or team.",
    }),
    memberCount: z
      .string()
      .refine(
        (val) =>
          ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].includes(val),
        {
          message: "Please select the number of team members.",
        }
      ),
    teamMembers: z
      .array(IpoMemberSchema)
      .min(1, { message: "At least 1 team member is required." })
      .max(10, { message: "Maximum 10 team members allowed." }),

    // Section 3: Educational/Professional Background
    educationalQualification: z
      .string()
      .min(2, { message: "Educational qualification is required." }),
    currentAffiliation: z
      .string()
      .min(2, { message: "Current affiliation is required." }),
    state: z.string({ required_error: "State is required." }),
    city: z.string({ required_error: "City is required." }),

    // Section 4: Idea/Project/Patent Details
    projectTitle: z.string().min(2, { message: "Project title is required." }),
    innovationCategory: z
      .string()
      .min(1, { message: "Innovation category is required." }),
    projectDescription: z
      .string()
      .min(50, {
        message: "Project description must be at least 50 characters.",
      })
      .describe("textarea"),
    iprStatus: z.enum(
      ["patent-granted", "patent-filed", "copyright-trademark", "no"],
      {
        required_error: "Please specify IPR status.",
      }
    ),
    iprProof: z.string().url({ message: "Upload your IPR Proof" }),

    // Section 5: Market & Impact
    problemStatement: z
      .string()
      .min(10, { message: "Problem statement is required." }),
    targetMarket: z
      .string()
      .min(10, { message: "Target market details are required." }),
    developmentStage: z.enum(["idea", "prototype", "pilot", "revenue"], {
      required_error: "Please specify development stage.",
    }),
    expectedImpact: z
      .string()
      .min(10, { message: "Expected impact is required." }),

    // Section 6: Funding & Business Potential
    priorFunding: z.enum(["yes", "no"], {
      required_error: "Please specify if you received prior funding.",
    }),
    fundingDetails: z.string().optional(),
    estimatedFunding: z
      .string()
      .min(1, { message: "Estimated funding requirement is required." }),
      revenueModel: z.string().min(10, { message: "Revenue model is required." }),
    
      // payment
    paymentId: z.string().min(1, { message: "Payment ID is required." }),
  }),
});

export type IpoMemberSchemaType = z.infer<typeof IpoMemberSchema>;
export type IpToIpoSchemaType = z.infer<typeof IpToIpoSchema>;
