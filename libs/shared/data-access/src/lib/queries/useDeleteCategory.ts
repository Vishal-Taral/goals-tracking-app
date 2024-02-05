import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';

const deleteCategory: any = async (id: string): Promise<any> => {
  const url = `${apiUrlObject.deleteCategory}/${id}`;
  const deletedValue = await apiClient.delete(url);
  return deletedValue;
};

const QUERY_KEY = ['deleteCategory'];

export const useDeleteCategory = (payload : any) => {
  return useMutation({ mutationKey: QUERY_KEY, mutationFn: (id: string) => deleteCategory(id) ,  onSuccess: () => payload.success() });
};
