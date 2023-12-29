import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';
import { log } from 'console';
import { useEffect } from 'react';

const getAllUsers = async (): Promise<any> => {
  const response = await apiClient.get(apiUrlObject.getAllUsers);
  // console.log('filterResponseC=>', response);
  return response.data;
};

const QUERY_KEY = ['users'];

export const useGetAllUsers = (config?: any) => {
  console.log(config);
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getAllUsers(),
    ...config,
  });
};

