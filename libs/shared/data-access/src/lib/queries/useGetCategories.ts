import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';
import { useEffect } from 'react';

const sortBy = 'name'

const getAllCategories = async (queryparams:any): Promise<any> => {
  const response = await apiClient.get(apiUrlObject.getAllCategories, {params:queryparams});
  return response.data;
};

const QUERY_KEY = ['categories'];

export const useGetCategories = (queryparams?: any , config?: any) => {
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getAllCategories(queryparams),
    ...config,
  });
};

