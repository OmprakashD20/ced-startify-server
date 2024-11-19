import { z } from "zod";

export const StudentSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Invalid phone number." }),
  degree: z.string().min(2, { message: "Degree is required." }),
  department: z.string().min(2, { message: "Department is required." }),
  yearOfStudy: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "Year of study is required.",
  }),
});

export type StudentSchemaType = z.infer<typeof StudentSchema>;
