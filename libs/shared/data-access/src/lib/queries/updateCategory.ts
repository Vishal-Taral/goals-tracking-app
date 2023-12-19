import { useMutation } from '@tanstack/react-query';
import { apiClient, apiUrlObject } from '@goal-tracker/data-access';

const updateCategory: any = async (params: any): Promise<any> => {
  const url = `${apiUrlObject.getAllCategories}/${params.id}`;
  console.log('URL:', url);

  // Assuming the API expects data in the format { name: updatedName }
  const updatedValue = await apiClient.put(url, { name: params.name });
  console.log('Updated Value:', updatedValue);

  return updatedValue;
};

const QUERY_KEY = ['updateCategory'];

export const useUpdateCategory = () => {
  return useMutation({ mutationKey: QUERY_KEY, mutationFn: (payload: any) => updateCategory(payload) });
};

