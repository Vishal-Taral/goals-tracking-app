import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../api-client"
import { apiUrlObject } from "../api-end-points"

const addRole = async(payload: any) => {
    return await apiClient.post(apiUrlObject.addRole,payload)
}

const QUERY_KEY = ['addRole']
export const usePostAddRole = (payload : any) => {
    const queryClient = useQueryClient()
    return useMutation({mutationKey: QUERY_KEY, mutationFn: (payload)=> addRole(payload),onSuccess: () => payload.success()})
}