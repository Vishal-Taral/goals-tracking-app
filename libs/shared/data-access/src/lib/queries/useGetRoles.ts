/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';


const getAllRoles = async (): Promise<any> => {
    try {
      const response = await apiClient.get(apiUrlObject.getAllRoles);
      console.log('filterResponse=>', response);
      return response.data;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  };

  const QUERY_KEY = ['roles']
export const useGetRoles = () => {
  return useQuery({ queryKey: QUERY_KEY, queryFn: () => getAllRoles() });
};
