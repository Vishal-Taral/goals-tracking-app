import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';
import { QueryParamsObj } from '@goal-tracker/data-access';

const getAllUsers = async (page, pageSize, sortBy, sortOrder): Promise<any> => {
  const response = await apiClient.get(
    `${apiUrlObject.getAllUsers}?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`
  );
  console.log('in api page check', page, pageSize);
  return response.data;
};

const QUERY_KEY = ['users'];

export const useGetUsers = (page, pageSize, sortBy, sortOrder) => {
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getAllUsers(page, pageSize, sortBy, sortOrder),
  });
};
