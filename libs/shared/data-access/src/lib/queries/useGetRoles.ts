/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';

const getAllRoles = async (page, pageSize, sortBy, sortOrder): Promise<any> => {
  const response = await apiClient.get(`${apiUrlObject.getAllRoles}?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
  console.log('api roles','sortBy', sortBy)
  return response.data;
};

const QUERY_KEY = ['roles'];
export const useGetRoles = (page, pageSize, sortBy, sortOrder) => {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getAllRoles(page, pageSize, sortBy, sortOrder),
  });
};