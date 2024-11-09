import { z } from "zod";

export const UserSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .max(255, "Name cannot exceed 255 characters."),

  email: z
    .string({
      required_error: "Email is required.",
    })
    .email("Invalid email format. Please enter a valid email address.")
    .max(255, "Email cannot exceed 255 characters."),

  college: z.string().max(255, "College name cannot exceed 255 characters."),

  countryCode: z
    .string({
      required_error: "Country code is required.",
    })
    .min(2, "Country code must be atleast 2 characters.")
    .max(5, "Country code cannot exceed 5 characters."),

  phone: z
    .string()
    .min(10, "Phone number must be atleast 10 digits.")
    .max(15, "Phone number cannot exceed 15 digits.")
    .regex(/^\d+$/, "Phone number must contain only digits."),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
