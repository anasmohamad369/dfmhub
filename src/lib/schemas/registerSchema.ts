import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^[0-9+\s-]{10,15}$/, { message: "Please enter a valid phone number" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  companyName: z
    .string()
    .min(2, { message: "Project Name is required" }),
  remarks: z.string().optional(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
