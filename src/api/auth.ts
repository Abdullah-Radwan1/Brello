import api from "@/api/axios";
import {
  loginRequestSchema,
  loginResponseSchema,
  signupRequestSchema,
  signupResponseSchema,
} from "@/lib/zod/auth_schema";
export const signin = async (email: string, password: string) => {
  const validatedData = loginRequestSchema.parse({ email, password });

  const res = await api.post("/auth/signin", validatedData, {
    withCredentials: true, // ✅ important to store cookie
  });

  return loginResponseSchema.parse(res.data);
};

/** Signup user */
export const signup = async (name: string, email: string, password: string) => {
  const validatedData = signupRequestSchema.parse({ name, email, password });

  const res = await api.post("/auth/signup", validatedData, {
    withCredentials: true, // ✅ cookie is set automatically
  });

  return signupResponseSchema.parse(res.data);
};
