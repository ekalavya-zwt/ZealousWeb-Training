import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must not exceed 20 characters")
    .regex(/[a-z]/, "Must include a lowercase character")
    .regex(/\d/, "Must include a digit")
    .regex(/[@.$!%*?&]/, "Must include a special character"),
});

export default loginSchema;
