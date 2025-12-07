// src/features/projects/hooks/useProjects.ts
import { useQuery } from "@tanstack/react-query";
import { fetchProjects, Project } from "@/api/projects";

export const useProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};
