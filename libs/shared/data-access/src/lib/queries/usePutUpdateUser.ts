import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';

const updateUser: any = async ({userId,updatedUserData}: {
  userId: string;
  updatedUserData: any;
}): Promise<any> => {
  const url = `${apiUrlObject.updateUser}/${userId}`;
  const updatedUser = await apiClient.put(url, updatedUserData);

  return updatedUser;
};

const QUERY_KEY = ['updateUser'];

export const usePutUpdateUser = (payload : any) => {
  return useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: (payload: { userId: string; updatedUserData: any }) =>
      updateUser(payload),
    onSuccess: () => payload.success()
  });
};
