// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { apiClient, apiUrlObject } from '@goal-tracker/data-access';

// const updateUser: any = async ({ userId, updatedUserData }: { userId: string; updatedUserData: any }): Promise<any> => {
//   const url = `${apiUrlObject.updateUser}/${userId}`;
//   const updatedUser = await apiClient.put(url, updatedUserData);

//   return updatedUser;
// };

// const QUERY_KEY = ['updateUser'];

// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: QUERY_KEY,
//     mutationFn: (payload: { userId: string; updatedUserData: any }) => updateUser(payload),
//     onSuccess: () => queryClient.invalidateQueries(['updateUser']),
//   });
// };


import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, apiUrlObject } from '@goal-tracker/data-access';

const updateUser: any = async ({ userId, updatedUserData }: { userId: string; updatedUserData: any }): Promise<any> => {
  const url = `${apiUrlObject.updateUser}/${userId}`;
  const updatedUser = await apiClient.put(url, updatedUserData);

  return updatedUser;
};

const QUERY_KEY = ['updateUser'];

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: (payload: { userId: string; updatedUserData: any }) => updateUser(payload),
    onSuccess: () => queryClient.invalidateQueries(['updateUser']),
  });
};