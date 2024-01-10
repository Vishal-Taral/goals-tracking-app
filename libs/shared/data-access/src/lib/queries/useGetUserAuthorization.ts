import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';

const userAuthorization = async () => {
  const response = await apiClient.get(apiUrlObject.getUserAuthorization);
  return response.data;
};

const QUERY_KEY = ['userAuthorization'];

export const useGetUserAuthorization = () => {
  return useQuery({ queryKey: QUERY_KEY, queryFn: () => userAuthorization(), enabled: false });
};
