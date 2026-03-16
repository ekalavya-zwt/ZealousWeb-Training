import { z } from "zod";

export const userSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must contain at least 2 characters")
      .max(50, "Name cannot exceed 50 characters"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email address")
      .endsWith("@zealousweb.com", "Must use company email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include one uppercase letter")
      .regex(/[a-z]/, "Must include one lowercase letter")
      .regex(/[0-9]/, "Must include one number")
      .regex(/[^A-Za-z0-9]/, "Must include one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
