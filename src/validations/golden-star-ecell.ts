import { z } from "zod";

export const GoldenStarECellAwardsSchema = z.object({
  body: z.object({
    region: z.enum(["International", "Tamil Nadu", "Other State"]),
    state: z.string().optional(),
    district: z.string().optional(),
    country: z.string().optional(),
    institutionType: z.enum(["College", "University"]).optional(),
    participateInDistrictLevel: z.boolean().optional(),
    numberOfAwards: z.enum(["1", "8", "15", "16", "19"]),
    selectedAwards: z.array(z.string()),
    institutionName: z
      .string()
      .min(2, { message: "Institution name is required" }),
    institutionDistrict: z
      .string()
      .min(2, { message: "Institution district is required" }),
    phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
    email: z.string().email({ message: "Invalid email address" }),
    institutionCategory: z.enum([
      "Engineering",
      "Arts & Sciences",
      "Medical",
      "Management",
      "Polytechnic",
      "Others",
    ]),
    ecellCoordinator: z.object({
      name: z.string().min(2, { message: "Coordinator name is required" }),
      phoneNumber: z.string().min(10, { message: "Invalid phone number" }),
      email: z.string().email({ message: "Invalid email address" }),
    }),
    ecellStartYear: z.string({
      required_error: "E-Cell start year is required",
    }),
    entrepreneurshipFacilities: z.array(
      z.enum(["Makers Lab", "Incubator", "Others"])
    ),
    activities: z.object({
      awarenessPrograms: z.array(
        z.object({
          name: z.string().min(1, "Program name is required"),
          beneficiaryCount: z.string({
            required_error: "Beneficiary count is required",
          }),
          outcomes: z.string().min(1, "Outcomes are required"),
          proofUrl: z
            .string()
            .url({ message: "Invalid drive url" })
            .describe(
              "Make a document/PDF of geo-tagged photos and upload it in the drive. Paste the drive link here."
            ),
        })
      ),
      workshops: z.array(
        z.object({
          name: z.string().min(1, "Workshop name is required"),
          beneficiaryCount: z.string({
            required_error: "Beneficiary count is required",
          }),
          outcomes: z.string().min(1, "Outcomes are required"),
          proofUrl: z
            .string()
            .url({ message: "Invalid drive url" })
            .describe(
              "Make a document/PDF of geo-tagged photos and upload it in the drive. Paste the drive link here."
            ),
        })
      ),
      otherEvents: z.array(
        z.object({
          name: z.string().min(1, "Event name is required"),
          beneficiaryCount: z.string({
            required_error: "Beneficiary count is required",
          }),
          outcomes: z.string().min(1, "Outcomes are required"),
          proofUrl: z
            .string()
            .url({ message: "Invalid drive url" })
            .describe(
              "Make a document/PDF of geo-tagged photos and upload it in the drive. Paste the drive link here."
            ),
        })
      ),
    }),
    institutionalFunding: z.string({
      required_error: "Institutional Funding is required",
    }),
    payment: z.object({
      bankScreenshot: z.string().url({ message: "Invalid drive url" }),
      paymentId: z.string().min(1, "Payment ID is required"),
    }),
  }),
});

export type GoldenStarECellAwardsSchemaType = z.infer<
  typeof GoldenStarECellAwardsSchema
>;
