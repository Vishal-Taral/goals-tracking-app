import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';
import { log } from 'console';
import { useEffect } from 'react';

const getAllCategories = async (): Promise<any> => {
  const response = await apiClient.get(apiUrlObject.getAllCategories);
  return response.data;
};

const QUERY_KEY = ['categories'];

export const useGetCategories = (config?: any) => {
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getAllCategories(),
    ...config,
  });
};

