import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../api-client"
import { apiUrlObject } from "../api-end-points"

const addRole = async(payload) => {
    console.log('payload', payload)
    return await apiClient.post(apiUrlObject.addRole,payload)
}

const QUERY_KEY = ['addRole']
export const useAddRole = () => {
    const queryClient = useQueryClient()
    return useMutation({mutationKey: QUERY_KEY, mutationFn: (payload)=> addRole(payload),onSuccess: ()=>queryClient.invalidateQueries(['addRole'])})
}