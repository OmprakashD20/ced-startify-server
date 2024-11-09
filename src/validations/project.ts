import { z } from "zod";

import { UserSchema } from "@/validations/user";

export const ProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, "Project name cannot be empty.")
      .max(255, "Project name cannot exceed 255 characters."),

    description: z
      .string()
      .min(1, "Description cannot be empty.")
      .max(2000, "Description cannot exceed 2000 characters."),

    pptLink: z
      .string()
      .url("PPT link must be a valid URL.")
      .min(1, "PPT link cannot be empty.")
      .max(255, "PPT link cannot exceed 255 characters."),

    users: z.array(UserSchema).min(1, "Complete your details to proceed."),
  }),
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;

export const ApproveProjectSchema = z.object({
  query: z.object({
    id: z.string({
      message: "Select a project to update.",
    }),
  }),
  body: z.object({
    approved: z.boolean({
      required_error: "Specify if the project is approved or not.",
    }),
  }),
});

export type ApproveProjectSchemaType = z.infer<typeof ApproveProjectSchema>;
