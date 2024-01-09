import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { apiUrlObject } from "../api-end-points";

const getCategoryByID = async (id: string) => {
  try {
    const response = await apiClient.get(`${apiUrlObject.getCategoryByID}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching role by ID", error);
    throw error;
  }
};

const QUERY_KEY = ["getCategoryByID"];

export const useGetCategoryByID = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getCategoryByID(id),
    enabled: false
  });
};