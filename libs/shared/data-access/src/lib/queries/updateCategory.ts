import { useMutation } from '@tanstack/react-query';
import { apiClient, apiUrlObject } from '@goal-tracker/data-access';

const updateCategory : any = async (params : any) : Promise<any> => {
  const url = `${apiUrlObject.updateCategory}/${params.categoryId}`;
  return apiClient.put(url, params.categoryName);
};

const QUERY_KEY = ['updateCategory'];

export const useUpdateCategory = () => {
  return useMutation({ mutationKey: QUERY_KEY, mutationFn: (payload : any ) => updateCategory(payload)});
};
