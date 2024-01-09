import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { apiUrlObject } from "../api-end-points";

const getUserByID = async (id: string) => {
  try {
    const response = await apiClient.get(`${apiUrlObject.getUserByID}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching role by ID", error);
    throw error;
  }
};

const QUERY_KEY = ["getUserByID"];

export const useGetUserByID = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getUserByID(id),
    enabled: false
  });
};