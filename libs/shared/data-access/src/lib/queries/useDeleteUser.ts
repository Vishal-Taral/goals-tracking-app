import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { apiUrlObject } from "../api-end-points";

const deleteUsers = async(data: any) => {
    const response = await apiClient.delete(`${apiUrlObject.deleteUser}/${data}`)
    return response.data;
}

const QUERY_KEY = ['deleteUser']
export const useDeleteUser = (data: any , payload : any) => {
    return useMutation({mutationKey: QUERY_KEY, mutationFn: ()=>deleteUsers(data),onSuccess: ()=> payload.success()})
}
