import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { apiUrlObject } from "../api-end-points";

const deleteRoles = async(data: any) => {
    try{
    const response = await apiClient.delete(`http://localhost:8001/data/${data}`)
    console.log('response', response)
    return response.data
    } catch(error){
        console.log('error', error)
        throw error
    }
}

const QUERY_KEY = ['deleteRoles']
export const useDeleteRoles = (data: any) => {
    return useMutation({mutationKey: QUERY_KEY, mutationFn: ()=>deleteRoles(data)})
}


