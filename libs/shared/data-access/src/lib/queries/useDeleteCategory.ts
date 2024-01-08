import { useMutation , useQueryClient } from '@tanstack/react-query';
import { apiClient, apiUrlObject } from '@goal-tracker/data-access';

const deleteCategory: any = async (id: string): Promise<any> => {
  const url = `${apiUrlObject.deleteCategory}/${id}`;
  const deletedValue = await apiClient.delete(url);
  return deletedValue;
};

const QUERY_KEY = ['deleteCategory'];

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationKey: QUERY_KEY, mutationFn: (id: string) => deleteCategory(id) ,  onSuccess: ()=>queryClient.invalidateQueries(['deleteCategory']) });
};
