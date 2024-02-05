import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';

const updateRoles = (payload: any) => {
  try {
    return apiClient.put(`${apiUrlObject.updateRole}/${payload?.id}`, {
      roleName: payload?.name,
      roleDescription: payload?.description,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const MUTATION_KEY = ['updateRoles'];
export const usePutUpdateRole = (payload: any) => {
  return useMutation({
    mutationKey: MUTATION_KEY,
    mutationFn: () => updateRoles(payload),
    onSuccess: () => payload.success(),
  });
};
