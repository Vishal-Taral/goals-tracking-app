import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api-client";
import { apiUrlObject } from "../api-end-points";

const deleteRoles = async(data: any) => {
    const response = await apiClient.delete(`${apiUrlObject.deleteRole}/${data}`)
    return response.data
}

const QUERY_KEY = ['deleteRoles']
export const useDeleteRole = (payload: any) => {
    return useMutation({mutationKey: QUERY_KEY, mutationFn: ()=>deleteRoles(payload),onSuccess: ()=>payload.success()})
}


