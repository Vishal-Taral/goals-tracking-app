import { useMutation } from "@tanstack/react-query"
import { apiClient } from "../api-client"
import { apiUrlObject } from "../api-end-points"

const postLogin = async(payload : any) => {
    const response = await apiClient.post(apiUrlObject.getLogin, payload)
    return response
}

const QUERY_KEY = ['todos']
export const usePostLogin = (payload : any) => {
    return useMutation({mutationKey: QUERY_KEY, mutationFn: ()=>postLogin(payload), onSuccess: ()=>payload.success()})
}
