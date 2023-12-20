import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../api-client"

const addRole = async(payload) => {
    console.log('payload', payload)
    return await apiClient.post('http://localhost:8001/data',payload)
}

const QUERY_KEY = ['addRole']
export const useAddRole = () => {
    const queryClient = useQueryClient()
    return useMutation({mutationKey: QUERY_KEY, mutationFn: (payload)=> addRole(payload),onSuccess: ()=>queryClient.invalidateQueries(['deleteRoles'])})
}