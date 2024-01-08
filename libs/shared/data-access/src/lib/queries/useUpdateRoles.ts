import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../api-client"
import { apiUrlObject } from "../api-end-points"

const updateRoles = (payload) => {
    try{
        return apiClient.put(`${apiUrlObject.updateRole}/${payload?.id}`,{roleName: payload?.name, roleDescription: payload?.description})
        // return response.data
    }catch(error){
        console.log(error)
        throw error
    }
}

const MUTATION_KEY = ['updateRoles']
export const useUpdateRoles = (payload : any) => {
    const queryClient = useQueryClient()
    return useMutation({mutationKey: MUTATION_KEY, mutationFn: ()=>updateRoles(payload), onSuccess: () => payload.success()});
}
