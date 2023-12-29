import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../api-client"
import { apiUrlObject } from "../api-end-points"

const addRole = async(payload) => {
    return await apiClient.post(apiUrlObject.addUser,payload)
}

const QUERY_KEY = ['addUser']
export const useCreateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({mutationKey: QUERY_KEY, mutationFn: (payload)=> addRole(payload),onSuccess: ()=>queryClient.invalidateQueries(['addUser'])})
}