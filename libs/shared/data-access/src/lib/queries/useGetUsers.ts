import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';

const getAllUsers = async (): Promise<any> => {
  const response = await apiClient.get(apiUrlObject.getAllUsers);
  return response.data;
};

const QUERY_KEY = ['users'];

export const useGetUsers = (config?: any) => {
  console.log(config);
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getAllUsers(),
    ...config,
  });
};

