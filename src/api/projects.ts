// src/api/projects.ts
import api from "@/api/axios";
import { z } from "zod";

// Zod schema for a single project
export const projectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(), // ✅ make optional
});

// Schema for an array of projects
export const projectsResponseSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;

/** Fetch all projects */
export const fetchProjects = async (): Promise<Project[]> => {
  const res = await api.get("/projects", {
    withCredentials: true, // send cookie for protected routes
  });

  return projectsResponseSchema.parse(res.data); // validate response
};
