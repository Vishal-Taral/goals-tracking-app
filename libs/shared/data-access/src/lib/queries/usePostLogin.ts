import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../api-client"
import { apiUrlObject } from "../api-end-points"

const postLogin = async(payload : any) => {
    // const getResponse = await apiClient.get(apiUrlObject.getLogin)
    // console.log('getResponse', getResponse)
    const response = await apiClient.post(apiUrlObject.getLogin, payload)
    return response
}

const QUERY_KEY = ['todos']
export const usePostLogin = (payload : any) => {
    const queryClient = useQueryClient()
    return useMutation({mutationKey: QUERY_KEY, mutationFn: ()=>postLogin(payload), onSuccess: ()=>queryClient.invalidateQueries(QUERY_KEY)})
}
