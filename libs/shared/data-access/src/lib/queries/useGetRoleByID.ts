import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { apiUrlObject } from "../api-end-points";

const getRoleByID = async (id: string) => {
  try {
    const response = await apiClient.get(`${apiUrlObject.getRoleByID}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching role by ID", error);
    throw error;
  }
};

const QUERY_KEY = ["getRoleByID"];

export const useGetRoleByID = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getRoleByID(id),
    enabled: false,
  });
};