// src/features/auth/schemas/auth.schema.ts
import { z } from "zod";

// Login request payload
export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Signup request payload
export const signupRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});
