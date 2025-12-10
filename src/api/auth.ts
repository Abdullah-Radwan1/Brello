import api from "@/api/axios";

import { loginRequestSchema, signupRequestSchema } from "@/lib/zod/auth_schema";
export const signin = async (email: string, password: string) => {
  const validatedData = loginRequestSchema.parse({ email, password });

  const res = await api.post("/auth/signin", validatedData, {});
  console.log(res.data);
  return res.data;
};

/** Signup user */
export const signup = async (name: string, email: string, password: string) => {
  const validatedData = signupRequestSchema.parse({ name, email, password });

  const res = await api.post("/auth/signup", validatedData, {});

  return res.data;
};
export const signout = async () => {
  const res = await api.post("/auth/signout");
  return res.data;
};
