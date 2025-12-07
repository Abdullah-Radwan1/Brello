// src/features/auth/schemas/auth.schema.ts
import { z } from "zod";

// Login request payload
export const loginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Login response (from backend)
export const loginResponseSchema = z.object({
  message: z.string(),
});

// Signup request payload
export const signupRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

// Signup response
export const signupResponseSchema = z.object({
  message: z.string(),
});
