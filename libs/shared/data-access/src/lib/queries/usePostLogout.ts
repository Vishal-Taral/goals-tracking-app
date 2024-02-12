import { useMutation } from "@tanstack/react-query"
import { apiClient } from "../api-client"
import { apiUrlObject } from "../api-end-points"

const postLogout = async() => {
    const response = await apiClient.post(apiUrlObject.postLogout,{})
    return response
}

const QUERY_KEY = ['logout']
export const usePostLogout = () => {
    return useMutation({mutationKey: QUERY_KEY, mutationFn: ()=>postLogout()})
}
