/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';

const getAllRoles = async (queryparams:any): Promise<any> => {
  const response = await apiClient.get(apiUrlObject.getAllRoles , {params:queryparams});
  return response.data;
};

const QUERY_KEY = ['roles'];
export const useGetRoles = (queryparams?: any) => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getAllRoles(queryparams),
  });
};