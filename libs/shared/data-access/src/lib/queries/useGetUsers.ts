import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';

const getAllUsers = async (queryparams: any): Promise<any> => {
  const response = await apiClient.get(apiUrlObject.getAllUsers, {
    params: queryparams,
  });
  return response.data;
};

const QUERY_KEY = ['users'];

export const useGetUsers = (queryparams?: any, config?: any) => {
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getAllUsers(queryparams),
    retry: false,
    ...config,
  });
};
