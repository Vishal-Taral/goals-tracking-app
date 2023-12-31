import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { apiUrlObject } from "../api-end-points";

const deleteUsers = async(data: any) => {
    try{
    const response = await apiClient.delete(`${apiUrlObject.deleteUser}/${data}`)
    console.log('response', response)
    return response.data
    } catch(error){
        console.log('error', error)
        throw error;
    }
}

const QUERY_KEY = ['deleteUser']
export const useDeleteUser = (data: any) => {
    const queryClient = useQueryClient()
    return useMutation({mutationKey: QUERY_KEY, mutationFn: ()=>deleteUsers(data),onSuccess: ()=>queryClient.invalidateQueries(['deleteUser'])})
}
