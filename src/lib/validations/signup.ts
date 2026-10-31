import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),

  image: z.string().url("Invalid image URL"),

  email: z.string().email("Invalid email"),

  password: z
    .string()
    .min(6, "At least 6 characters required")
    .regex(/[A-Z]/, "At least one uppercase letter required")
    .regex(/[a-z]/, "At least one lowercase letter required")
    .regex(/[0-9]/, "At least one number required"),
});