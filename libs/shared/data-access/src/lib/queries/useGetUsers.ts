import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api-client';
import { apiUrlObject } from '../api-end-points';

const getAllUsers = async (page,pageSize): Promise<any> => {
  const response = await apiClient.get(`${apiUrlObject.getAllUsers}?page=${page}&pageSize=${pageSize}`);
  console.log('in api page check',page,pageSize)
  // const response = await apiClient.get(`http://192.168.1.115:3333/api/users?page=${page}&pageSize=${pageSize}`);
  // const response = await apiClient.get(`http://192.168.1.115:3333/api/users`);
  return response.data;
};

const QUERY_KEY = ['users'];

export const useGetUsers = (page,pageSize) => {
  return useQuery<any>({
    queryKey: QUERY_KEY,
    queryFn: () => getAllUsers(page,pageSize),
    // onSuccess: pageSize.success()
  });
};

// export const useGetUsers = () => {
//   return useQuery<any>({
//     queryKey: QUERY_KEY,
//     queryFn: () => getAllUsers()
//   });
// };
