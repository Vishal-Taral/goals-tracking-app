import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';

const updateCategory: any = async (params: any): Promise<any> => {
  const url = `${apiUrlObject.updateCategory}/${params.categoryId}`;
  const updatedValue = await apiClient.put(url, { categoryName: params.categoryName });
  return updatedValue;
};

const MUTATION_KEY = ['updateCategory'];

export const usePutUpdateCategory = (payload: any) => {
  return useMutation({ mutationKey: MUTATION_KEY, mutationFn: () => updateCategory(payload) ,onSuccess: () => payload.success() });
};

