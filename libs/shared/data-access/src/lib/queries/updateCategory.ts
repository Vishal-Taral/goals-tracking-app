import { useMutation } from '@tanstack/react-query';
import { apiClient, apiUrlObject } from '@goal-tracker/data-access';

const updateCategory = async (categoryId: string, categoryName: string) => {
  const url = `${apiUrlObject.updateCategory}/${categoryId}`;
  return apiClient.put(url, { categoryName });
};

const QUERY_KEY = ['updateCategory'];

export const useUpdateCategory = () => {
  return useMutation({
    mutationKey: QUERY_KEY, mutationFn: (categoryId : string, categoryName : string) =>
      updateCategory(categoryId, categoryName),
    });
};
