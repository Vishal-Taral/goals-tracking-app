import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';


const getAllCategories = async (): Promise<any> => {
    try {
      const response = await apiClient.get(apiUrlObject.getAllCategories);
      console.log('filterResponseC=>', response);
      return response.data;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  };

  const QUERY_KEY = ['categories']

export const useGetCategories = () => {
  return useQuery({ queryKey: QUERY_KEY, queryFn: () => getAllCategories() });
};
