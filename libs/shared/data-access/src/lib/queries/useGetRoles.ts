/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';

// const getAllRoles = async (page, pageSize): Promise<any> => {
  // const response = await apiClient.get(`${apiUrlObject.getAllRoles}?page=${page}&pageSize=${pageSize}`);
  // return response.data;
  const getAllRoles = async (): Promise<any> => {
  const response = await apiClient.get(`${apiUrlObject.getAllRoles}`);
  return response.data;
};

const QUERY_KEY = ['roles'];
// export const useGetRoles = (page, pageSize) => {
//   return useQuery({
//     queryKey: QUERY_KEY,
//     queryFn: () => getAllRoles(page, pageSize),
//   });
// };
export const useGetRoles = () => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getAllRoles(),
  });
};
