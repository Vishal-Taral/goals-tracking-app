import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, apiUrlObject } from '@goal-tracker/data-access';

const createCategory: any = async (categoryName: string): Promise<any> => {
  const url = `${apiUrlObject.addCategory}`;
  const createdCategory = await apiClient.post(url, { categoryName: categoryName });

  return createdCategory;
};

const QUERY_KEY = ['createCategory'];

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({ mutationKey: QUERY_KEY, mutationFn: (categoryName: string) => createCategory(categoryName) , onSuccess: ()=>queryClient.invalidateQueries(['createCategory']) });
};
