import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, apiUrlObject } from '@goal-tracker/data-access';

const createCategory: any = async (categoryName: string): Promise<any> => {
  const url = `${apiUrlObject.addCategory}`;
  return await apiClient.post(url, { categoryName: categoryName });
};

const QUERY_KEY = ['createCategory'];

export const usePostAddCategory = (payload : any) => {
  const queryClient = useQueryClient();
  return useMutation({ mutationKey: QUERY_KEY, mutationFn: (categoryName: string) => createCategory(categoryName) , onSuccess: () => payload.success() });
};
