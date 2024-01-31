import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';

const createCategory: any = async (categoryName: string): Promise<any> => {
  const url = `${apiUrlObject.addCategory}`;
  return await apiClient.post(url, { categoryName: categoryName });
};

const QUERY_KEY = ['createCategory'];

export const usePostAddCategory = (payload : any) => {
  return useMutation({ mutationKey: QUERY_KEY, mutationFn: (categoryName: string) => createCategory(categoryName) , onSuccess: () => payload.success() });
};
