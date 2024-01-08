import { useMutation ,useQueryClient } from '@tanstack/react-query';
import { apiClient, apiUrlObject } from '@goal-tracker/data-access';

const updateCategory: any = async (params: any): Promise<any> => {
  const url = `${apiUrlObject.updateCategory}/${params.categoryId}`;
  const updatedValue = await apiClient.put(url, { categoryName: params.categoryName });
  return updatedValue;
};

const MUTATION_KEY = ['updateCategory'];

export const usePutUpdateCategory = (payload: any) => {
  const queryClient = useQueryClient();
  return useMutation({ mutationKey: MUTATION_KEY, mutationFn: () => updateCategory(payload) ,onSuccess: () => payload.success() });
};

