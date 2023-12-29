import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { apiUrlObject } from "../api-end-points";

const deleteRoles = async(data: any) => {
    try{
    const response = await apiClient.delete(`${apiUrlObject.deleteRole}/${data}`)
    console.log('response', response)
    return response.data
    } catch(error){
        console.log('error', error)
        throw error
    }
}

const QUERY_KEY = ['deleteRoles']
export const useDeleteRoles = (data: any) => {
    const queryClient = useQueryClient()
    return useMutation({mutationKey: QUERY_KEY, mutationFn: ()=>deleteRoles(data),onSuccess: ()=>queryClient.invalidateQueries(['deleteRoles'])})
}


