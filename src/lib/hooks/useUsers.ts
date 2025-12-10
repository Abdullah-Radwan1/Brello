import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";

export const useGetUsers = (page: number, limit = 6, search = "") => {
  return useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await api.get(`/users`, {
        params: {
          page,
          limit,
          search,
        },
        withCredentials: true,
      });
      return res.data; // return normalized response
    },
    enabled: true, // always fetch
  });
};
