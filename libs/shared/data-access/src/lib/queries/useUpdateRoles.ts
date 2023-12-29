import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../api-client"
import { apiUrlObject } from "../api-end-points"

const updateRoles = async(payload) => {
    try{
        const response = await apiClient.put(`${apiUrlObject.deleteRole}/${payload?.id}`,{name: payload?.name, description: payload?.description})
        return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}

const MUTATION_KEY = ['updateRoles']
export const useUpdateRoles = (payload) => {
    const queryClient = useQueryClient()
    return useMutation({mutationKey: MUTATION_KEY, mutationFn: ()=>updateRoles(payload),onSuccess: ()=>queryClient.invalidateQueries(['updateRoles'])})
}
