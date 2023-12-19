import { useMutation } from '@tanstack/react-query';
import { apiClient, apiUrlObject } from '@goal-tracker/data-access';

const deleteCategory: any = async (id: string): Promise<any> => {
  const url = `${apiUrlObject.getAllCategories}/${id}`;
  console.log('URL:', url);
  const deletedValue = await apiClient.delete(url);
  console.log('Deleted Value:', deletedValue);
  return deletedValue;
};

const QUERY_KEY = ['deleteCategory'];

export const useDeleteCategory = () => {
  return useMutation({ mutationKey: QUERY_KEY, mutationFn: (id: string) => deleteCategory(id) });
};
