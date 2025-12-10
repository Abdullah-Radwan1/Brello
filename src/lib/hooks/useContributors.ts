import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

// -----------------------------
// Types for the API response
// -----------------------------
interface Contributor {
  id: string;
  name: string;
  email: string;
}

interface ContributorsResponse {
  data: Contributor[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// -----------------------------
// React Query Hook
// -----------------------------
export const useContributors = (projectId: string, page: number, limit = 6) => {
  return useQuery({
    // 🔑 Unique query key so React Query caches differently per project + page
    queryKey: ["contributors", projectId, page],

    // 📌 Function that performs the API request
    queryFn: async () => {
      const res = await api.get<ContributorsResponse>("/contributors", {
        params: {
          project_id: projectId, // backend expects this
          page,
          limit,
        },
      });
      return res.data; // return normalized response
    },
    // 🚨 Only run query if we have projectId
    enabled: !!projectId,
  });
};
