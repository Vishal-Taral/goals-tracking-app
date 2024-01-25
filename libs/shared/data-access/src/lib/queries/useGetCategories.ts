import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';
import { useEffect } from 'react';

const sortBy = 'name'

const getAllCategories = async (page, pageSize, sortOrder): Promise<any> => {
  const response = await apiClient.get(`${apiUrlObject.getAllCategories}?page=${page}&pageSize=${pageSize}&sortBy=name&sortOrder=${sortOrder}`);
  return response.data;
};

const QUERY_KEY = ['categories'];

export const useGetCategories = (page, pageSize, sortOrder) => {
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getAllCategories(page, pageSize, sortOrder),
  });
};

