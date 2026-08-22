import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  companyName: z
    .string()
    .min(2, { message: "Company / Project Name is required" }),
  location: z.string().optional(),
  requirement: z.string().optional(),
  source: z.string().optional(),
  status: z.string().optional(),
  assignedTo: z.string().optional(),
  remarks: z.string().optional(),
});
